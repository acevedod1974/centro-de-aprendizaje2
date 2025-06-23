import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, Gauge, Timer } from "lucide-react";
import { supabase } from "../../supabaseClient";

interface MachiningMaterial {
  id: string;
  name: string;
  hardness: number;
  machinability: number;
}

interface ToolMaterial {
  id: string;
  name: string;
  durability: number;
  speed: number;
}

interface MachineType {
  id: string;
  name: string;
  efficiency: number;
  precision: number;
}

const MecanizadoSimulator: React.FC = () => {
  // --- Dynamic Data State ---
  const [materials, setMaterials] = useState<MachiningMaterial[]>([]);
  const [toolMaterials, setToolMaterials] = useState<ToolMaterial[]>([]);
  const [machineTypes, setMachineTypes] = useState<MachineType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- UI State ---
  const [isRunning, setIsRunning] = useState(false);
  const [spindleSpeed, setSpindleSpeed] = useState(1000);
  const [feedRate, setFeedRate] = useState(100);
  const [depthOfCut, setDepthOfCut] = useState(1);
  const [time, setTime] = useState(0);
  const [materialRemoved, setMaterialRemoved] = useState(0);
  const [toolWear, setToolWear] = useState(0);
  const [machineType, setMachineType] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [toolMaterial, setToolMaterial] = useState<string>("");

  // --- Fetch all data from Supabase ---
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Connecting to Supabase to fetch machining materials...");
        const { data: matData, error: matError } = await supabase
          .from("materials")
          .select("*");
        if (matError) {
          console.error("Supabase materials fetch error:", matError);
          throw new Error(
            "No se pudieron cargar los materiales de pieza. Detalle: " +
              matError.message
          );
        }
        setMaterials(matData || []);
        console.log("Materials:", matData);

        console.log("Connecting to Supabase to fetch tool materials...");
        const { data: toolData, error: toolError } = await supabase
          .from("machining_tools")
          .select("*");
        if (toolError)
          throw new Error(
            "No se pudieron cargar los materiales de herramienta. Detalle: " +
              toolError.message
          );
        setToolMaterials(toolData || []);
        console.log("Tool Materials:", toolData);

        console.log("Connecting to Supabase to fetch machine types...");
        const { data: machineData, error: machineError } = await supabase
          .from("machining_machines")
          .select("*");
        if (machineError)
          throw new Error("No se pudieron cargar los tipos de máquina.");
        setMachineTypes(machineData || []);
        console.log("Machine Types:", machineData);

        // Set defaults if not already set
        setMaterial((prev) => prev || (matData && matData[0]?.id) || "");
        setToolMaterial((prev) => prev || (toolData && toolData[0]?.id) || "");
        setMachineType(
          (prev) => prev || (machineData && machineData[0]?.id) || ""
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Error al cargar los datos de Supabase.");
          console.error("Supabase fetch error:", err);
        } else {
          setError("Error desconocido al cargar los datos de Supabase.");
          console.error("Supabase fetch error:", err);
        }
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  // --- Input validation helpers ---
  const validateInputs = () => {
    if (spindleSpeed < 100 || spindleSpeed > 5000)
      return "La velocidad del husillo debe estar entre 100 y 5000 RPM.";
    if (feedRate < 10 || feedRate > 1000)
      return "El avance debe estar entre 10 y 1000 mm/min.";
    if (depthOfCut < 0.1 || depthOfCut > 5)
      return "La profundidad de corte debe estar entre 0.1 y 5 mm.";
    if (!materials.find((m) => m.id === material))
      return "Selecciona un material de pieza válido.";
    if (!toolMaterials.find((t) => t.id === toolMaterial))
      return "Selecciona un material de herramienta válido.";
    if (!machineTypes.find((m) => m.id === machineType))
      return "Selecciona un tipo de máquina válido.";
    return null;
  };
  const inputError = validateInputs();

  // --- Simulation Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
        const materialData = materials.find((m) => m.id === material);
        const toolData = toolMaterials.find((t) => t.id === toolMaterial);
        if (!materialData || !toolData) return;
        // Calculate material removal rate (cm³ per 0.1s)
        const mrr = (spindleSpeed * feedRate * depthOfCut) / 600000; // cm³ per 0.1s
        setMaterialRemoved((prev) => Math.max(prev + mrr, 0));
        // Calculate tool wear
        const wearRate =
          ((spindleSpeed / 10000) * materialData.hardness) /
          toolData.durability;
        setToolWear((prev) => Math.min(Math.max(prev + wearRate, 0), 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [
    isRunning,
    spindleSpeed,
    feedRate,
    depthOfCut,
    material,
    toolMaterial,
    machineType,
    materials,
    toolMaterials,
    machineTypes,
  ]);

  const resetSimulation = () => {
    setIsRunning(false);
    setTime(0);
    setMaterialRemoved(0);
    setToolWear(0);
  };

  const getToolWearColor = () => {
    if (toolWear < 30) return "text-green-500";
    if (toolWear < 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getEfficiencyRating = () => {
    const materialData = materials.find((m) => m.id === material);
    const toolData = toolMaterials.find((t) => t.id === toolMaterial);
    if (!materialData || !toolData)
      return { rating: "-", color: "text-gray-400" };
    const efficiency = materialData.machinability * toolData.speed;
    if (efficiency > 1.2)
      return { rating: "Excelente", color: "text-green-600" };
    if (efficiency > 0.8) return { rating: "Buena", color: "text-blue-600" };
    if (efficiency > 0.5)
      return { rating: "Regular", color: "text-yellow-600" };
    return { rating: "Deficiente", color: "text-red-600" };
  };

  const efficiency = getEfficiencyRating();

  if (loading) return <div>Cargando datos de mecanizado...</div>;
  if (error) return <div>{error}</div>;
  if (!materials.length || !toolMaterials.length || !machineTypes.length)
    return <div>No hay datos de mecanizado disponibles.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300 text-center text-sm">
        ⚠️ Este simulador es solo para fines educativos y de referencia. Los
        resultados no deben usarse para procesos industriales reales sin
        validación profesional.
      </div>
      {inputError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300 text-center">
          {inputError}
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🔧</span>
            <div>
              <h2 className="text-2xl font-bold">
                Simulador de Mecanizado CNC
              </h2>
              <p className="opacity-90">
                Optimiza parámetros de corte para diferentes materiales
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Control Panel */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Máquina
                </label>
                <select
                  value={machineType}
                  onChange={(e) => setMachineType(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  {machineTypes.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Material de la Pieza
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  {materials.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Material de Herramienta
                </label>
                <select
                  value={toolMaterial}
                  onChange={(e) => setToolMaterial(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  {toolMaterials.map((tool) => (
                    <option key={tool.id} value={tool.id}>
                      {tool.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Velocidad del Husillo (RPM): {spindleSpeed}
                </label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  value={spindleSpeed}
                  onChange={(e) => setSpindleSpeed(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avance (mm/min): {feedRate}
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={feedRate}
                  onChange={(e) => setFeedRate(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profundidad de Corte (mm): {depthOfCut}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={depthOfCut}
                  onChange={(e) => setDepthOfCut(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isRunning
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {isRunning ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isRunning ? "Pausar" : "Iniciar"}</span>
                </button>

                <button
                  onClick={resetSimulation}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <RotateCcw size={18} />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>

            {/* Simulation Display */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gauge size={20} className="text-blue-600" />
                    <span className="font-medium">Velocidad</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {spindleSpeed} RPM
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Timer size={20} className="text-green-600" />
                    <span className="font-medium">Tiempo</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(time / 10)}s
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Settings size={20} className={getToolWearColor()} />
                    <span className="font-medium">Desgaste</span>
                  </div>
                  <div className={`text-2xl font-bold ${getToolWearColor()}`}>
                    {Math.round(toolWear)}%
                  </div>
                </div>
              </div>

              {/* Visual Simulation */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
                <h3 className="text-lg font-semibold mb-6 text-center">
                  Estado del Proceso
                </h3>

                {/* Machine Representation */}
                <div
                  className="relative mx-auto mb-6"
                  style={{ width: "300px", height: "200px" }}
                >
                  <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-lg">
                    {/* Machine Base */}
                  </div>

                  {/* Workpiece */}
                  <div
                    className="absolute top-1/2 left-1/4 transform -translate-y-1/2 bg-blue-500 rounded transition-all duration-300"
                    style={{
                      width: `${Math.max(60 - materialRemoved * 2, 20)}px`,
                      height: "40px",
                    }}
                  ></div>

                  {/* Tool */}
                  <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
                    <div
                      className={`w-8 h-2 ${
                        toolWear > 70 ? "bg-red-500" : "bg-yellow-500"
                      } transition-colors`}
                    ></div>
                  </div>

                  {/* Cutting Animation */}
                  {isRunning && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="text-2xl animate-spin">⚡</div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Material Removido:
                    </span>
                    <span className="font-medium ml-2">
                      {materialRemoved.toFixed(2)} cm³
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Eficiencia:
                    </span>
                    <span className={`font-medium ml-2 ${efficiency.color}`}>
                      {efficiency.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Process Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  📊 Parámetros del Proceso
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Máquina:
                    </span>
                    <span className="font-medium ml-2">
                      {machineTypes.find((m) => m.id === machineType)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Material:
                    </span>
                    <span className="font-medium ml-2">
                      {materials.find((m) => m.id === material)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Herramienta:
                    </span>
                    <span className="font-medium ml-2">
                      {toolMaterials.find((t) => t.id === toolMaterial)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Velocidad de Corte:
                    </span>
                    <span className="font-medium ml-2">
                      {Math.round((spindleSpeed * Math.PI * 50) / 1000)} m/min
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                  💡 Recomendaciones
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  {toolWear > 80 && (
                    <li>• ⚠️ Cambiar herramienta - desgaste crítico</li>
                  )}
                  {spindleSpeed > 3000 && material === "acero" && (
                    <li>• Reducir velocidad para acero</li>
                  )}
                  {feedRate < 50 && (
                    <li>• Aumentar avance para mayor productividad</li>
                  )}
                  <li>• Usar refrigeración adecuada para el material</li>
                  <li>• Verificar rigidez del sistema máquina-pieza</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MecanizadoSimulator;
