import React, { useState } from 'react';
import { Atom, Calculator, Info, RotateCcw, TrendingUp, Zap } from 'lucide-react';

interface MaterialProperty {
  name: string;
  value: number;
  unit: string;
  description: string;
}

interface Material {
  name: string;
  category: string;
  density: number;
  youngModulus: number;
  yieldStrength: number;
  ultimateStrength: number;
  elongation: number;
  hardness: number;
  thermalConductivity: number;
  specificHeat: number;
  meltingPoint: number;
  cost: number; // USD per kg
  applications: string[];
  advantages: string[];
  disadvantages: string[];
}

const MaterialesCalculator: React.FC = () => {
  const [selectedMaterial1, setSelectedMaterial1] = useState<string>('acero-1045');
  const [selectedMaterial2, setSelectedMaterial2] = useState<string>('aluminio-6061');
  const [volume, setVolume] = useState<number>(1000); // cm³
  const [temperature, setTemperature] = useState<number>(20); // °C
  const [loadType, setLoadType] = useState<string>('tension');

  const materials: Record<string, Material> = {
    'acero-1045': {
      name: 'Acero AISI 1045',
      category: 'Aceros al Carbono',
      density: 7.85,
      youngModulus: 200,
      yieldStrength: 310,
      ultimateStrength: 565,
      elongation: 16,
      hardness: 170,
      thermalConductivity: 49.8,
      specificHeat: 486,
      meltingPoint: 1470,
      cost: 0.8,
      applications: ['Ejes', 'Engranajes', 'Pernos', 'Herramientas'],
      advantages: ['Buena resistencia', 'Económico', 'Fácil mecanizado', 'Amplia disponibilidad'],
      disadvantages: ['Susceptible a corrosión', 'Peso elevado', 'Conductividad térmica baja']
    },
    'acero-304': {
      name: 'Acero Inoxidable 304',
      category: 'Aceros Inoxidables',
      density: 8.0,
      youngModulus: 193,
      yieldStrength: 215,
      ultimateStrength: 505,
      elongation: 40,
      hardness: 201,
      thermalConductivity: 16.2,
      specificHeat: 500,
      meltingPoint: 1400,
      cost: 4.2,
      applications: ['Equipos químicos', 'Utensilios', 'Arquitectura', 'Medicina'],
      advantages: ['Resistente a corrosión', 'Higiénico', 'Estético', 'Reciclable'],
      disadvantages: ['Costo elevado', 'Difícil soldadura', 'Baja conductividad térmica']
    },
    'aluminio-6061': {
      name: 'Aluminio 6061-T6',
      category: 'Aleaciones de Aluminio',
      density: 2.70,
      youngModulus: 68.9,
      yieldStrength: 276,
      ultimateStrength: 310,
      elongation: 12,
      hardness: 95,
      thermalConductivity: 167,
      specificHeat: 896,
      meltingPoint: 582,
      cost: 1.9,
      applications: ['Aeronáutica', 'Automotriz', 'Estructuras', 'Electrónica'],
      advantages: ['Ligero', 'Resistente a corrosión', 'Buena conductividad', 'Reciclable'],
      disadvantages: ['Menor resistencia que acero', 'Costo medio', 'Sensible a temperatura']
    },
    'titanio-gr2': {
      name: 'Titanio Grado 2',
      category: 'Aleaciones de Titanio',
      density: 4.51,
      youngModulus: 103,
      yieldStrength: 275,
      ultimateStrength: 345,
      elongation: 20,
      hardness: 80,
      thermalConductivity: 17,
      specificHeat: 523,
      meltingPoint: 1668,
      cost: 35.0,
      applications: ['Aeroespacial', 'Medicina', 'Química', 'Marina'],
      advantages: ['Excelente resistencia/peso', 'Biocompatible', 'Resistente a corrosión', 'Alta temperatura'],
      disadvantages: ['Muy costoso', 'Difícil mecanizado', 'Baja conductividad térmica']
    },
    'cobre-c101': {
      name: 'Cobre Electrolítico C101',
      category: 'Aleaciones de Cobre',
      density: 8.96,
      youngModulus: 110,
      yieldStrength: 70,
      ultimateStrength: 220,
      elongation: 45,
      hardness: 45,
      thermalConductivity: 391,
      specificHeat: 385,
      meltingPoint: 1085,
      cost: 6.8,
      applications: ['Eléctrica', 'Plomería', 'Intercambiadores', 'Electrónica'],
      advantages: ['Excelente conductividad', 'Antimicrobiano', 'Dúctil', 'Reciclable'],
      disadvantages: ['Costoso', 'Pesado', 'Susceptible a oxidación']
    },
    'magnesio-az31': {
      name: 'Magnesio AZ31B',
      category: 'Aleaciones de Magnesio',
      density: 1.77,
      youngModulus: 45,
      yieldStrength: 200,
      ultimateStrength: 260,
      elongation: 15,
      hardness: 73,
      thermalConductivity: 96,
      specificHeat: 1024,
      meltingPoint: 630,
      cost: 3.5,
      applications: ['Automotriz', 'Aeroespacial', 'Electrónica', 'Deportes'],
      advantages: ['Muy ligero', 'Buena resistencia específica', 'Amortiguación', 'Reciclable'],
      disadvantages: ['Corrosión galvánica', 'Inflamable', 'Limitada formabilidad']
    }
  };

  const material1 = materials[selectedMaterial1];
  const material2 = materials[selectedMaterial2];

  const calculateWeight = (material: Material) => {
    return (volume * material.density) / 1000; // kg
  };

  const calculateCost = (material: Material) => {
    return calculateWeight(material) * material.cost;
  };

  const calculateStiffness = (material: Material) => {
    return material.youngModulus * (volume / 1000000); // N/m for 1m length
  };

  const getStrengthToWeightRatio = (material: Material) => {
    return material.ultimateStrength / material.density;
  };

  const getCostEffectiveness = (material: Material) => {
    return material.ultimateStrength / material.cost;
  };

  const getThermalExpansion = (material: Material, deltaT: number) => {
    // Approximate thermal expansion coefficients (per °C)
    const expansionCoeffs: Record<string, number> = {
      'acero-1045': 11.7e-6,
      'acero-304': 17.3e-6,
      'aluminio-6061': 23.6e-6,
      'titanio-gr2': 8.6e-6,
      'cobre-c101': 16.5e-6,
      'magnesio-az31': 26.0e-6
    };
    
    const coeff = expansionCoeffs[selectedMaterial1] || 12e-6;
    return coeff * deltaT * 1000; // mm/m
  };

  const resetCalculator = () => {
    setSelectedMaterial1('acero-1045');
    setSelectedMaterial2('aluminio-6061');
    setVolume(1000);
    setTemperature(20);
    setLoadType('tension');
  };

  const getComparisonColor = (value1: number, value2: number, higherIsBetter: boolean = true) => {
    if (higherIsBetter) {
      return value1 > value2 ? 'text-green-600' : value1 < value2 ? 'text-red-600' : 'text-gray-600';
    } else {
      return value1 < value2 ? 'text-green-600' : value1 > value2 ? 'text-red-600' : 'text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <Atom size={28} />
            <div>
              <h2 className="text-2xl font-bold">Calculadora de Propiedades de Materiales</h2>
              <p className="opacity-90">Análisis comparativo y selección de materiales de ingeniería</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Panel */}
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
                      {Object.entries(materials).map(([key, material]) => (
                        <option key={key} value={key}>{material.name}</option>
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
                      {Object.entries(materials).map(([key, material]) => (
                        <option key={key} value={key}>{material.name}</option>
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

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Material Comparison */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                  <Calculator size={20} className="mr-2" />
                  Comparación de Materiales
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">{material1.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Peso:</span>
                        <span className={`font-bold ${getComparisonColor(calculateWeight(material2), calculateWeight(material1), false)}`}>
                          {calculateWeight(material1).toFixed(2)} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Costo:</span>
                        <span className={`font-bold ${getComparisonColor(calculateCost(material2), calculateCost(material1), false)}`}>
                          ${calculateCost(material1).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Resistencia/Peso:</span>
                        <span className={`font-bold ${getComparisonColor(getStrengthToWeightRatio(material1), getStrengthToWeightRatio(material2))}`}>
                          {getStrengthToWeightRatio(material1).toFixed(1)} MPa/(g/cm³)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Costo-Efectividad:</span>
                        <span className={`font-bold ${getComparisonColor(getCostEffectiveness(material1), getCostEffectiveness(material2))}`}>
                          {getCostEffectiveness(material1).toFixed(1)} MPa/USD
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">{material2.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Peso:</span>
                        <span className={`font-bold ${getComparisonColor(calculateWeight(material1), calculateWeight(material2), false)}`}>
                          {calculateWeight(material2).toFixed(2)} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Costo:</span>
                        <span className={`font-bold ${getComparisonColor(calculateCost(material1), calculateCost(material2), false)}`}>
                          ${calculateCost(material2).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Resistencia/Peso:</span>
                        <span className={`font-bold ${getComparisonColor(getStrengthToWeightRatio(material2), getStrengthToWeightRatio(material1))}`}>
                          {getStrengthToWeightRatio(material2).toFixed(1)} MPa/(g/cm³)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Costo-Efectividad:</span>
                        <span className={`font-bold ${getComparisonColor(getCostEffectiveness(material2), getCostEffectiveness(material1))}`}>
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
                  Propiedades Detalladas - {material1.name}
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Mecánicas</h4>
                    <div className="space-y-1 text-sm">
                      <div>Módulo de Young: {material1.youngModulus} GPa</div>
                      <div>Límite Elástico: {material1.yieldStrength} MPa</div>
                      <div>Resistencia Última: {material1.ultimateStrength} MPa</div>
                      <div>Elongación: {material1.elongation}%</div>
                      <div>Dureza: {material1.hardness} HB</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Térmicas</h4>
                    <div className="space-y-1 text-sm">
                      <div>Conductividad: {material1.thermalConductivity} W/m·K</div>
                      <div>Calor Específico: {material1.specificHeat} J/kg·K</div>
                      <div>Punto de Fusión: {material1.meltingPoint}°C</div>
                      <div>Expansión Térmica: {getThermalExpansion(material1, temperature - 20).toFixed(3)} mm/m</div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Físicas</h4>
                    <div className="space-y-1 text-sm">
                      <div>Densidad: {material1.density} g/cm³</div>
                      <div>Categoría: {material1.category}</div>
                      <div>Costo: ${material1.cost}/kg</div>
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
                    {material1.applications.map((app, index) => (
                      <li key={index}>• {app}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    💡 Recomendación de Selección
                  </h4>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    {getStrengthToWeightRatio(material1) > getStrengthToWeightRatio(material2) ? (
                      <p>✅ {material1.name} ofrece mejor relación resistencia/peso</p>
                    ) : (
                      <p>⚠️ {material2.name} tiene mejor relación resistencia/peso</p>
                    )}
                    {getCostEffectiveness(material1) > getCostEffectiveness(material2) ? (
                      <p>✅ {material1.name} es más costo-efectivo</p>
                    ) : (
                      <p>⚠️ {material2.name} es más costo-efectivo</p>
                    )}
                    <p className="mt-2 font-medium">
                      Para {loadType}: {material1.name} {material1.ultimateStrength > material2.ultimateStrength ? 'recomendado' : 'evaluar alternativas'}
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
                    {material1.advantages.map((advantage, index) => (
                      <li key={index}>• {advantage}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">
                    👎 Desventajas
                  </h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    {material1.disadvantages.map((disadvantage, index) => (
                      <li key={index}>• {disadvantage}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialesCalculator;