import React, { useEffect, useState } from "react";
import {
  Atom,
  Calculator,
  Info,
  RotateCcw,
  // Zap, // Removed unused import
} from "lucide-react";
import { supabase } from "../../supabaseClient";

interface Material {
  id: string;
  name: string;
  category: string;
  density?: number;
  young_modulus?: number;
  yield_strength?: number;
  ultimate_strength?: number;
  elongation?: number;
  hardness?: number;
  thermal_conductivity?: number;
  specific_heat?: number;
  melting_point?: number;
  cost?: number;
  applications?: string[];
  advantages?: string[];
  disadvantages?: string[];
}

const MaterialesCalculator: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterial1, setSelectedMaterial1] =
    useState<string>("acero-1045");
  const [selectedMaterial2, setSelectedMaterial2] =
    useState<string>("aluminio-6061");
  const [volume, setVolume] = useState<number>(1000); // cm³
  const [temperature, setTemperature] = useState<number>(20); // °C
  const [loadType, setLoadType] = useState<string>("tension");

  useEffect(() => {
    const fetchMaterials = async () => {
      console.log("Connecting to Supabase to fetch materials...");
      const { data, error } = await supabase.from("materials").select("*");
      if (error) {
        console.error("Supabase materials fetch error:", error);
      } else {
        console.log("Supabase connection OK. Materials:", data);
        setMaterials(data || []);
      }
    };
    fetchMaterials();
  }, []);

  const material1 = materials.find(
    (material) => material.id === selectedMaterial1
  );
  const material2 = materials.find(
    (material) => material.id === selectedMaterial2
  );

  // Prevent calculations if materials are not loaded yet
  if (!material1 || !material2) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-200">
            {materials.length === 0
              ? "Cargando materiales desde la base de datos..."
              : "Selecciona materiales válidos para comparar."}
          </p>
        </div>
      </div>
    );
  }

  const calculateWeight = (material: Material) => {
    return (volume * (material.density || 0)) / 1000; // kg
  };

  const calculateCost = (material: Material) => {
    return calculateWeight(material) * (material.cost || 0);
  };

  const getStrengthToWeightRatio = (material: Material) => {
    return (material.ultimate_strength || 0) / (material.density || 1);
  };

  const getCostEffectiveness = (material: Material) => {
    return (material.ultimate_strength || 0) / (material.cost || 1);
  };

  const getThermalExpansion = (material: Material, deltaT: number) => {
    // Approximate thermal expansion coefficients (per °C)
    const expansionCoeffs: Record<string, number> = {
      "acero-1045": 11.7e-6,
      "acero-304": 17.3e-6,
      "aluminio-6061": 23.6e-6,
      "titanio-gr2": 8.6e-6,
      "cobre-c101": 16.5e-6,
      "magnesio-az31": 26.0e-6,
    };

    const coeff = expansionCoeffs[selectedMaterial1] || 12e-6;
    return coeff * deltaT * 1000; // mm/m
  };

  const resetCalculator = () => {
    setSelectedMaterial1("acero-1045");
    setSelectedMaterial2("aluminio-6061");
    setVolume(1000);
    setTemperature(20);
    setLoadType("tension");
  };

  const getComparisonColor = (
    value1: number,
    value2: number,
    higherIsBetter: boolean = true
  ) => {
    if (higherIsBetter) {
      return value1 > value2
        ? "text-green-600"
        : value1 < value2
        ? "text-red-600"
        : "text-gray-600";
    } else {
      return value1 < value2
        ? "text-green-600"
        : value1 > value2
        ? "text-red-600"
        : "text-gray-600";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <Atom size={28} className="text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white">
              Calculadora de Propiedades de Materiales
            </h2>
            <p className="opacity-90 text-white">
              Análisis comparativo y selección de materiales de ingeniería
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Material selection and input form */}
          <div className="col-span-1">
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  🔧 Parámetros de Análisis
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Material Principal
                    </label>
                    <select
                      value={selectedMaterial1}
                      onChange={(e) => setSelectedMaterial1(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      {materials.map((material) => (
                        <option key={material.id} value={material.id}>
                          {material.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Material de Comparación
                    </label>
                    <select
                      value={selectedMaterial2}
                      onChange={(e) => setSelectedMaterial2(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      {materials.map((material) => (
                        <option key={material.id} value={material.id}>
                          {material.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Volumen de la Pieza (cm³): {volume}
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Temperatura de Trabajo (°C): {temperature}
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="500"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tipo de Carga
                    </label>
                    <select
                      value={loadType}
                      onChange={(e) => setLoadType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="tension">Tracción</option>
                      <option value="compression">Compresión</option>
                      <option value="bending">Flexión</option>
                      <option value="torsion">Torsión</option>
                      <option value="fatigue">Fatiga</option>
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
          </div>

          {/* Results/Comparison */}
          <div className="col-span-1">
            {/* Material Comparison */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                <Calculator size={20} className="mr-2" />
                Comparación de Materiales
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {material1?.name}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Peso:</span>
                      <span
                        className={`font-bold ${getComparisonColor(
                          calculateWeight(material2),
                          calculateWeight(material1),
                          false
                        )}`}
                      >
                        {calculateWeight(material1).toFixed(2)} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Costo:</span>
                      <span
                        className={`font-bold ${getComparisonColor(
                          calculateCost(material2),
                          calculateCost(material1),
                          false
                        )}`}
                      >
                        ${calculateCost(material1).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resistencia/Peso:</span>
                      <span
                        className={`font-bold ${getComparisonColor(
                          getStrengthToWeightRatio(material1),
                          getStrengthToWeightRatio(material2)
                        )}`}
                      >
                        {getStrengthToWeightRatio(material1).toFixed(1)}{" "}
                        MPa/(g/cm³)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Costo-Efectividad:</span>
                      <span
                        className={`font-bold ${getComparisonColor(
                          getCostEffectiveness(material1),
                          getCostEffectiveness(material2)
                        )}`}
                      >
                        {getCostEffectiveness(material1).toFixed(1)} MPa/USD
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {material2?.name}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Peso:</span>
                      <span
                        className={`font-bold ${getComparisonColor(
                          calculateWeight(material1),
                          calculateWeight(material2),
                          false
                        )}`}
                      >
                        {calculateWeight(material2).toFixed(2)} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Costo:</span>
                      <span
                        className={`font-bold ${getComparisonColor(
                          calculateCost(material1),
                          calculateCost(material2),
                          false
                        )}`}
                      >
                        ${calculateCost(material2).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resistencia/Peso:</span>
                      <span
                        className={`font-bold ${getComparisonColor(
                          getStrengthToWeightRatio(material2),
                          getStrengthToWeightRatio(material1)
                        )}`}
                      >
                        {getStrengthToWeightRatio(material2).toFixed(1)}{" "}
                        MPa/(g/cm³)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Costo-Efectividad:</span>
                      <span
                        className={`font-bold ${getComparisonColor(
                          getCostEffectiveness(material2),
                          getCostEffectiveness(material1)
                        )}`}
                      >
                        {getCostEffectiveness(material2).toFixed(1)} MPa/USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Properties */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                <Info size={20} className="mr-2" />
                Propiedades Detalladas - {material1?.name}
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Mecánicas
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div>Módulo de Young: {material1?.young_modulus} GPa</div>
                    <div>Límite Elástico: {material1?.yield_strength} MPa</div>
                    <div>
                      Resistencia Última: {material1?.ultimate_strength} MPa
                    </div>
                    <div>Elongación: {material1?.elongation}%</div>
                    <div>Dureza: {material1?.hardness} HB</div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Térmicas
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      Conductividad: {material1?.thermal_conductivity} W/m·K
                    </div>
                    <div>
                      Calor Específico: {material1?.specific_heat} J/kg·K
                    </div>
                    <div>Punto de Fusión: {material1?.melting_point}°C</div>
                    <div>
                      Expansión Térmica:{" "}
                      {getThermalExpansion(material1, temperature - 20).toFixed(
                        3
                      )}{" "}
                      mm/m
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                    Físicas
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div>Densidad: {material1?.density} g/cm³</div>
                    <div>Categoría: {material1?.category}</div>
                    <div>Costo: ${material1?.cost}/kg</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications and Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                  ✅ Aplicaciones Típicas
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  {material1?.applications?.map((app, index) => (
                    <li key={index}>• {app}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                  💡 Recomendación de Selección
                </h4>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  {getStrengthToWeightRatio(material1) >
                  getStrengthToWeightRatio(material2) ? (
                    <p>
                      ✅ {material1?.name} ofrece mejor relación
                      resistencia/peso
                    </p>
                  ) : (
                    <p>
                      ⚠️ {material2?.name} tiene mejor relación resistencia/peso
                    </p>
                  )}
                  {getCostEffectiveness(material1) >
                  getCostEffectiveness(material2) ? (
                    <p>✅ {material1?.name} es más costo-efectivo</p>
                  ) : (
                    <p>⚠️ {material2?.name} es más costo-efectivo</p>
                  )}
                  <p className="mt-2 font-medium">
                    Para {loadType}: {material1?.name}{" "}
                    {(material1?.ultimate_strength ?? 0) >
                    (material2?.ultimate_strength ?? 0)
                      ? "recomendado"
                      : "evaluar alternativas"}
                  </p>
                </div>
              </div>
            </div>

            {/* Advantages and Disadvantages */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  👍 Ventajas
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  {material1?.advantages?.map((advantage, index) => (
                    <li key={index}>• {advantage}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">
                  👎 Desventajas
                </h4>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  {material1?.disadvantages?.map((disadvantage, index) => (
                    <li key={index}>• {disadvantage}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialesCalculator;
