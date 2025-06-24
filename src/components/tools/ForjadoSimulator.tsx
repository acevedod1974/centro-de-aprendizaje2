import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Thermometer,
  Gauge,
  Timer,
} from "lucide-react";
import { supabase } from "../../supabaseClient";
import { Line } from "react-chartjs-2"; // If chart.js is available, otherwise fallback to SVG

interface ForgingMaterial {
  id: number;
  name: string;
  key: string;
  temp_min: number;
  temp_max: number;
  resistance: number;
}

interface ForgingProcess {
  id: number;
  name: string;
  key: string;
  efficiency: number;
  uniformity: number;
}

const ForjadoSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [temperature, setTemperature] = useState(1200);
  const [force, setForce] = useState(500);
  const [time, setTime] = useState(0);
  const [deformation, setDeformation] = useState(0);
  const [materialType, setMaterialType] = useState<string>("acero");
  const [forgeType, setForgeType] = useState<string>("libre");
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [materials, setMaterials] = useState<ForgingMaterial[]>([]);
  const [forgeTypes, setForgeTypes] = useState<ForgingProcess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<
    {
      time: number;
      deformation: number;
      temperature: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: matData, error: matError } = await supabase
          .from("materials")
          .select("*");
        const { data: procData, error: procError } = await supabase
          .from("forging_processes")
          .select("*");
        if (matError || !matData) throw matError;
        if (procError || !procData) throw procError;
        setMaterials(matData);
        setForgeTypes(procData);
        // Set defaults if not set
        if (!materialType && matData.length > 0)
          setMaterialType(matData[0].key);
        if (!forgeType && procData.length > 0) setForgeType(procData[0].key);
      } catch (err) {
        setError("Error al cargar datos de Supabase.");
        console.error("Supabase fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isRunning && materials.length > 0 && forgeTypes.length > 0) {
      const interval = setInterval(() => {
        setTime((prev) => prev + simulationSpeed);
        const material = materials.find((m) => m.key === materialType);
        const forge = forgeTypes.find((f) => f.key === forgeType);
        if (!material || !forge) return;
        const tempFactor = Math.max(
          0,
          Math.min(
            1,
            (temperature - material.temp_min) /
              (material.temp_max - material.temp_min)
          )
        );
        const effectiveForce =
          (force * tempFactor * forge.efficiency) / material.resistance;
        setDeformation((prev) => {
          const newDeformation = prev + effectiveForce * simulationSpeed * 0.01;
          return Math.min(newDeformation, 100);
        });
        setTemperature((prev) => Math.max(20, prev - simulationSpeed * 2));
        setHistory((prev) => [
          ...prev,
          {
            time: time + simulationSpeed,
            deformation: Math.min(
              deformation + effectiveForce * simulationSpeed * 0.01,
              100
            ),
            temperature: Math.max(20, temperature - simulationSpeed * 2),
          },
        ]);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [
    isRunning,
    temperature,
    force,
    materialType,
    forgeType,
    simulationSpeed,
    materials,
    forgeTypes,
    time,
    deformation,
  ]);

  const resetSimulation = () => {
    setIsRunning(false);
    setTime(0);
    setDeformation(0);
    setTemperature(1200);
  };

  const getTemperatureColor = () => {
    if (temperature > 1000) return "text-red-500";
    if (temperature > 700) return "text-orange-500";
    if (temperature > 400) return "text-yellow-500";
    return "text-blue-500";
  };

  const getDeformationStage = () => {
    if (deformation < 20) return { stage: "Inicio", color: "bg-blue-500" };
    if (deformation < 50)
      return { stage: "Deformación", color: "bg-yellow-500" };
    if (deformation < 80)
      return { stage: "Conformado", color: "bg-orange-500" };
    return { stage: "Terminado", color: "bg-green-500" };
  };

  const deformationStage = getDeformationStage();

  // Warnings
  const material = materials.find((m) => m.key === materialType);
  let warning = "";
  if (material) {
    if (temperature < material.temp_min)
      warning = "¡Temperatura demasiado baja para forjar este material!";
    if (temperature > material.temp_max)
      warning = "¡Temperatura demasiado alta para forjar este material!";
    if (force < 200) warning = "¡Fuerza aplicada muy baja!";
    if (force > 1800) warning = "¡Fuerza aplicada muy alta!";
  }

  // At the end of simulation, show summary analysis
  let summary = "";
  if (deformation >= 100) {
    if (
      material &&
      temperature >= material.temp_min &&
      temperature <= material.temp_max &&
      force >= 200 &&
      force <= 1800
    ) {
      summary = "Forjado exitoso: Parámetros dentro de rango recomendado.";
    } else {
      summary =
        "Forjado completado, pero algunos parámetros estaban fuera de rango recomendado.";
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-600 dark:text-gray-300">
          Cargando datos de forjado...
        </span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-red-600 dark:text-red-400">{error}</span>
      </div>
    );
  }
  if (materials.length === 0 || forgeTypes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-600 dark:text-gray-300">
          No hay materiales o procesos disponibles.
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🔨</span>
            <div>
              <h2 className="text-2xl font-bold">Simulador de Forjado</h2>
              <p className="opacity-90">
                Experimenta con diferentes parámetros de forjado
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
                  Material
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-red-500"
                >
                  {materials.map((material) => (
                    <option key={material.key} value={material.key}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Forjado
                </label>
                <select
                  value={forgeType}
                  onChange={(e) => setForgeType(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-red-500"
                >
                  {forgeTypes.map((forge) => (
                    <option key={forge.key} value={forge.key}>
                      {forge.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temperatura Inicial (°C): {temperature}
                </label>
                <input
                  type="range"
                  min="20"
                  max="1500"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fuerza Aplicada (kN): {force}
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  value={force}
                  onChange={(e) => setForce(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Velocidad de Simulación: {simulationSpeed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={simulationSpeed}
                  onChange={(e) => setSimulationSpeed(Number(e.target.value))}
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
                <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer size={20} className={getTemperatureColor()} />
                    <span className="font-medium">Temperatura</span>
                  </div>
                  <div
                    className={`text-2xl font-bold ${getTemperatureColor()}`}
                  >
                    {Math.round(temperature)}°C
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gauge size={20} className="text-blue-600" />
                    <span className="font-medium">Fuerza</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {force} kN
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Timer size={20} className="text-green-600" />
                    <span className="font-medium">Tiempo</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(time)}s
                  </div>
                </div>
              </div>

              {/* Visual Simulation */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold mb-6">
                  Estado del Material
                </h3>

                {/* Material Representation */}
                <div
                  className="relative mx-auto mb-6"
                  style={{ width: "200px", height: "120px" }}
                >
                  <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${deformationStage.color} rounded-lg transition-all duration-500`}
                    style={{
                      width: `${80 + deformation * 0.4}px`,
                      height: `${120 - deformation * 0.8}px`,
                      borderRadius: `${Math.max(8, 20 - deformation * 0.2)}px`,
                    }}
                  ></div>

                  {/* Force arrows */}
                  {isRunning && (
                    <>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
                        <div className="text-2xl animate-bounce">⬇️</div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
                        <div className="text-2xl animate-bounce">⬆️</div>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Estado:{" "}
                    <span className="font-medium">
                      {deformationStage.stage}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Deformación:{" "}
                    <span className="font-medium">
                      {Math.round(deformation)}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                    <div
                      className={`${deformationStage.color} h-3 rounded-full transition-all duration-300`}
                      style={{ width: `${deformation}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Process Information */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  📊 Información del Proceso
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Material:
                    </span>
                    <span className="font-medium ml-2">
                      {materials.find((m) => m.key === materialType)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Proceso:
                    </span>
                    <span className="font-medium ml-2">
                      {forgeTypes.find((f) => f.key === forgeType)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Eficiencia:
                    </span>
                    <span className="font-medium ml-2">
                      {Math.round(
                        (forgeTypes.find((f) => f.key === forgeType)
                          ?.efficiency ?? 0) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Uniformidad:
                    </span>
                    <span className="font-medium ml-2">
                      {Math.round(
                        (forgeTypes.find((f) => f.key === forgeType)
                          ?.uniformity ?? 0) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* History Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  📈 Historial de Deformación y Temperatura
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <Line
                      data={{
                        labels: history.map((h) => `${h.time}s`),
                        datasets: [
                          {
                            label: "Deformación (%)",
                            data: history.map((h) => h.deformation),
                            borderColor: "rgb(34, 197, 94)",
                            backgroundColor: "rgba(34, 197, 94, 0.2)",
                            fill: true,
                          },
                          {
                            label: "Temperatura (°C)",
                            data: history.map((h) => h.temperature),
                            borderColor: "rgb(239, 68, 68)",
                            backgroundColor: "rgba(239, 68, 68, 0.2)",
                            fill: true,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "top" as const,
                          },
                          tooltip: {
                            mode: "index" as const,
                            intersect: false,
                          },
                        },
                        interaction: {
                          mode: "index" as const,
                          intersect: false,
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: "Tiempo (s)",
                              color: "rgb(156, 163, 175)",
                              font: {
                                family: "Inter",
                                size: 14,
                                weight: "medium",
                              },
                            },
                            y: {
                              title: {
                                display: true,
                                text: "Valor",
                                color: "rgb(156, 163, 175)",
                                font: {
                                  family: "Inter",
                                  size: 14,
                                  weight: "medium",
                                },
                              },
                              min: 0,
                              max: 100,
                              ticks: {
                                stepSize: 10,
                                color: "rgb(156, 163, 175)",
                                font: {
                                  family: "Inter",
                                  size: 12,
                                },
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Real-time Graphs */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">
                  Gráfica de Deformación y Temperatura
                </h4>
                <svg width="100%" height="120" viewBox="0 0 400 120">
                  {/* Deformation Line */}
                  <polyline
                    fill="none"
                    stroke="#f59e42"
                    strokeWidth="2"
                    points={history
                      .map((h, i) => `${i * 4},${120 - h.deformation}`)
                      .join(" ")}
                  />
                  {/* Temperature Line */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    points={history
                      .map((h, i) => `${i * 4},${120 - h.temperature / 15}`)
                      .join(" ")}
                  />
                </svg>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-orange-600">Deformación</span>
                  <span className="text-blue-600">Temperatura</span>
                </div>
              </div>
            </div>
          </div>

          {warning && (
            <div
              className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded"
              role="alert"
            >
              <strong>Advertencia:</strong> {warning}
            </div>
          )}

          {summary && (
            <div
              className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded"
              role="status"
            >
              <strong>Resumen:</strong> {summary}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForjadoSimulator;
