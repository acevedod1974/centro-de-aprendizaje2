import React, { useState } from "react";
import { Settings, Calculator, Info, RotateCcw, Cog } from "lucide-react";

const EngranajCalculator: React.FC = () => {
  const [module, setModule] = useState<number>(2);
  const [teethPinion, setTeethPinion] = useState<number>(20);
  const [teethGear, setTeethGear] = useState<number>(60);
  const [pressureAngle, setPressureAngle] = useState<number>(20);
  const [faceWidth, setFaceWidth] = useState<number>(25);
  const [material, setMaterial] = useState<string>("acero");
  const [application, setApplication] = useState<string>("general");

  const materials = {
    acero: { name: "Acero al Carbono", allowableStress: 200, density: 7.85 },
    aleado: { name: "Acero Aleado", allowableStress: 300, density: 7.85 },
    fundicion: { name: "Hierro Fundido", allowableStress: 120, density: 7.2 },
    bronce: { name: "Bronce", allowableStress: 80, density: 8.9 },
    plastico: { name: "Plástico Técnico", allowableStress: 40, density: 1.4 },
  };

  const applications = {
    general: {
      name: "Uso General",
      serviceFactor: 1.0,
      description: "Aplicaciones estándar",
    },
    pesado: {
      name: "Servicio Pesado",
      serviceFactor: 1.5,
      description: "Cargas altas continuas",
    },
    intermitente: {
      name: "Servicio Intermitente",
      serviceFactor: 0.8,
      description: "Operación ocasional",
    },
    precision: {
      name: "Alta Precisión",
      serviceFactor: 1.2,
      description: "Tolerancias estrechas",
    },
  };

  // Cálculos básicos
  const gearRatio = teethGear / teethPinion;
  const pitchDiameterPinion = module * teethPinion;
  const pitchDiameterGear = module * teethGear;
  const outsideDiameterPinion = pitchDiameterPinion + 2 * module;
  const outsideDiameterGear = pitchDiameterGear + 2 * module;
  const rootDiameterPinion = pitchDiameterPinion - 2.5 * module;
  const rootDiameterGear = pitchDiameterGear - 2.5 * module;
  const centerDistance = (pitchDiameterPinion + pitchDiameterGear) / 2;
  const circularPitch = Math.PI * module;

  // Cálculos de resistencia
  const materialData = materials[material as keyof typeof materials];
  const appData = applications[application as keyof typeof applications];
  const lewisFormFactor = 0.154 - 0.912 / teethPinion; // Aproximación para ángulo de 20°
  const allowableLoad =
    (materialData.allowableStress * faceWidth * module * lewisFormFactor) /
    appData.serviceFactor;

  // Velocidad tangencial (asumiendo 1000 RPM para el piñón)
  const assumedRPM = 1000;
  const tangentialVelocity =
    (Math.PI * pitchDiameterPinion * assumedRPM) / (60 * 1000); // m/s

  // Volumen y peso aproximado
  // --- Fix unit conversion for volume/weight ---
  // Use mm^3 to m^3: divide by 1_000_000_000 (not 1_000_000)
  const volumePinion =
    (Math.PI * Math.pow(outsideDiameterPinion / 2, 2) * faceWidth) /
    1_000_000_000; // m³
  const volumeGear =
    (Math.PI * Math.pow(outsideDiameterGear / 2, 2) * faceWidth) /
    1_000_000_000; // m³
  const weightPinion = volumePinion * materialData.density * 1000; // kg (density in g/cm³, so *1000 for kg/m³)
  const weightGear = volumeGear * materialData.density * 1000; // kg

  const resetCalculator = () => {
    setModule(2);
    setTeethPinion(20);
    setTeethGear(60);
    setPressureAngle(20);
    setFaceWidth(25);
    setMaterial("acero");
    setApplication("general");
  };

  const getApplicationColor = (app: string) => {
    switch (app) {
      case "general":
        return "text-blue-600";
      case "pesado":
        return "text-red-600";
      case "intermitente":
        return "text-green-600";
      case "precision":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  // --- Input validation helpers ---
  const validateInputs = () => {
    if (module < 0.5 || module > 10)
      return "El módulo debe estar entre 0.5 y 10 mm.";
    if (teethPinion < 12 || teethPinion > 100)
      return "El piñón debe tener entre 12 y 100 dientes.";
    if (teethGear < 15 || teethGear > 200)
      return "El engranaje debe tener entre 15 y 200 dientes.";
    if (faceWidth < 5 || faceWidth > 100)
      return "El ancho de cara debe estar entre 5 y 100 mm.";
    if (pressureAngle !== 14.5 && pressureAngle !== 20 && pressureAngle !== 25)
      return "Ángulo de presión no válido.";
    if (teethGear <= teethPinion)
      return "El engranaje debe tener más dientes que el piñón.";
    return null;
  };
  const inputError = validateInputs();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300 text-center text-sm">
        ⚠️ Esta herramienta es solo para fines educativos y de referencia. Los
        resultados no deben usarse para diseño industrial real sin validación
        profesional.
      </div>

      {inputError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300 text-center">
          {inputError}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <Cog size={28} />
            <div>
              <h2 className="text-2xl font-bold">
                Calculadora de Engranajes Cilíndricos
              </h2>
              <p className="opacity-90">
                Diseño y análisis de transmisiones por engranajes
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
                  ⚙️ Parámetros Geométricos
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Módulo (mm)
                    </label>
                    <input
                      type="number"
                      value={module}
                      onChange={(e) => setModule(Number(e.target.value))}
                      step="0.5"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
                      min="0.5"
                      max="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dientes del Piñón
                    </label>
                    <input
                      type="number"
                      value={teethPinion}
                      onChange={(e) => setTeethPinion(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
                      min="12"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dientes del Engranaje
                    </label>
                    <input
                      type="number"
                      value={teethGear}
                      onChange={(e) => setTeethGear(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
                      min="15"
                      max="200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ángulo de Presión (°)
                    </label>
                    <select
                      value={pressureAngle}
                      onChange={(e) => setPressureAngle(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
                    >
                      <option value={14.5}>14.5° - Estándar antiguo</option>
                      <option value={20}>20° - Estándar moderno</option>
                      <option value={25}>25° - Alta resistencia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ancho de Cara (mm)
                    </label>
                    <input
                      type="number"
                      value={faceWidth}
                      onChange={(e) => setFaceWidth(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
                      min="5"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  🔧 Material y Aplicación
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Material
                    </label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(materials).map(([key, mat]) => (
                        <option key={key} value={key}>
                          {mat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tipo de Aplicación
                    </label>
                    <select
                      value={application}
                      onChange={(e) => setApplication(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(applications).map(([key, app]) => (
                        <option key={key} value={key}>
                          {app.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={resetCalculator}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCcw size={18} />
                <span>Reiniciar</span>
              </button>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Calculations */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                  <Calculator size={20} className="mr-2" />
                  Cálculos Fundamentales
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Piñón
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Diámetro Primitivo:</span>
                        <span className="font-bold">
                          {pitchDiameterPinion.toFixed(2)} mm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diámetro Exterior:</span>
                        <span className="font-bold">
                          {outsideDiameterPinion.toFixed(2)} mm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diámetro Interior:</span>
                        <span className="font-bold">
                          {rootDiameterPinion.toFixed(2)} mm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peso Aproximado:</span>
                        <span className="font-bold">
                          {weightPinion.toFixed(2)} kg
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Engranaje
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Diámetro Primitivo:</span>
                        <span className="font-bold">
                          {pitchDiameterGear.toFixed(2)} mm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diámetro Exterior:</span>
                        <span className="font-bold">
                          {outsideDiameterGear.toFixed(2)} mm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diámetro Interior:</span>
                        <span className="font-bold">
                          {rootDiameterGear.toFixed(2)} mm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peso Aproximado:</span>
                        <span className="font-bold">
                          {weightGear.toFixed(2)} kg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transmission Parameters */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                  <Settings size={20} className="mr-2" />
                  Parámetros de Transmisión
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {gearRatio.toFixed(2)}:1
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Relación de Transmisión
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {centerDistance.toFixed(2)} mm
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Distancia entre Centros (mm)
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {circularPitch.toFixed(2)} mm
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Paso Circular (mm)
                    </div>
                  </div>
                </div>
              </div>

              {/* Strength Analysis */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                  <Info size={20} className="mr-2" />
                  Análisis de Resistencia
                </h3>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Carga Admisible
                      </div>
                      <div className="text-xl font-bold text-green-600">
                        {allowableLoad.toFixed(0)} N
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Velocidad Tangencial
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        {tangentialVelocity.toFixed(2)} m/s
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Configuración Actual:
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span>
                        <strong>Material:</strong> {materialData.name}
                      </span>
                      <span>
                        <strong>Aplicación:</strong> {appData.name}
                      </span>
                      <span
                        className={`font-medium ${getApplicationColor(
                          application
                        )}`}
                      >
                        Factor de Servicio: {appData.serviceFactor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Representación Esquemática
                </h3>

                <div
                  className="relative mx-auto"
                  style={{ width: "400px", height: "200px" }}
                >
                  {/* Pinion */}
                  <div
                    className="absolute bg-purple-300 dark:bg-purple-600 rounded-full border-4 border-purple-500 flex items-center justify-center"
                    style={{
                      width: `${pitchDiameterPinion * 0.8}px`,
                      height: `${pitchDiameterPinion * 0.8}px`,
                      left: "50px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <span className="text-xs font-bold text-white">
                      {teethPinion}T
                    </span>
                  </div>

                  {/* Gear */}
                  <div
                    className="absolute bg-blue-300 dark:bg-blue-600 rounded-full border-4 border-blue-500 flex items-center justify-center"
                    style={{
                      width: `${pitchDiameterGear * 0.8}px`,
                      height: `${pitchDiameterGear * 0.8}px`,
                      right: "50px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <span className="text-xs font-bold text-white">
                      {teethGear}T
                    </span>
                  </div>

                  {/* Center distance line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs text-gray-600 dark:text-gray-400">
                    {centerDistance.toFixed(1)} mm
                  </div>
                </div>
              </div>

              {/* Design Recommendations */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                  💡 Recomendaciones de Diseño
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>
                    • Verificar que el número mínimo de dientes evite
                    interferencia
                  </li>
                  <li>
                    • Considerar lubricación adecuada para la velocidad
                    calculada
                  </li>
                  <li>
                    • Evaluar la necesidad de tratamiento térmico según la
                    aplicación
                  </li>
                  <li>• Verificar tolerancias de fabricación y montaje</li>
                  <li>
                    • Considerar factores dinámicos para altas velocidades
                  </li>
                  <li>
                    • Analizar deflexiones en ejes para anchos de cara grandes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngranajCalculator;
