import React, { useState } from 'react';
import { Ruler, Calculator, Info, RotateCcw, AlertTriangle } from 'lucide-react';

const ToleranciaCalculator: React.FC = () => {
  const [nominalDimension, setNominalDimension] = useState<number>(50);
  const [toleranceGrade, setToleranceGrade] = useState<string>('IT7');
  const [fundamentalDeviation, setFundamentalDeviation] = useState<string>('h');
  const [shaftDimension, setShaftDimension] = useState<number>(50);
  const [shaftTolerance, setShaftTolerance] = useState<string>('g6');

  const toleranceGrades = {
    'IT5': { factor: 7, description: 'Precisión muy alta' },
    'IT6': { factor: 10, description: 'Precisión alta' },
    'IT7': { factor: 16, description: 'Precisión media' },
    'IT8': { factor: 25, description: 'Precisión normal' },
    'IT9': { factor: 40, description: 'Precisión baja' },
    'IT10': { factor: 64, description: 'Precisión muy baja' },
    'IT11': { factor: 100, description: 'Trabajo en bruto' }
  };

  const fundamentalDeviations = {
    'H': { upper: 0, description: 'Agujero base superior' },
    'h': { upper: 0, description: 'Eje base superior' },
    'G': { upper: -5, description: 'Agujero con interferencia' },
    'g': { upper: -5, description: 'Eje con holgura' },
    'F': { upper: -10, description: 'Agujero con holgura' },
    'f': { upper: -10, description: 'Eje con holgura media' },
    'E': { upper: -20, description: 'Agujero con holgura grande' },
    'e': { upper: -20, description: 'Eje con holgura grande' }
  };

  const calculateToleranceUnit = (dimension: number): number => {
    if (dimension <= 3) return 0.55;
    if (dimension <= 6) return 0.73;
    if (dimension <= 10) return 0.90;
    if (dimension <= 18) return 1.08;
    if (dimension <= 30) return 1.31;
    if (dimension <= 50) return 1.56;
    if (dimension <= 80) return 1.86;
    if (dimension <= 120) return 2.17;
    if (dimension <= 180) return 2.52;
    if (dimension <= 250) return 2.89;
    if (dimension <= 315) return 3.22;
    if (dimension <= 400) return 3.54;
    return 3.89;
  };

  const calculateTolerance = (dimension: number, grade: string): number => {
    const toleranceUnit = calculateToleranceUnit(dimension);
    const gradeFactor = toleranceGrades[grade as keyof typeof toleranceGrades]?.factor || 16;
    return (toleranceUnit * gradeFactor) / 1000; // Convert to mm
  };

  const calculateLimits = (dimension: number, grade: string, deviation: string) => {
    const tolerance = calculateTolerance(dimension, grade);
    const deviationValue = (fundamentalDeviations[deviation as keyof typeof fundamentalDeviations]?.upper || 0) / 1000;
    
    const upperLimit = dimension + deviationValue;
    const lowerLimit = upperLimit - tolerance;
    
    return { upperLimit, lowerLimit, tolerance };
  };

  const holeLimits = calculateLimits(nominalDimension, toleranceGrade, fundamentalDeviation);
  const shaftLimits = calculateLimits(shaftDimension, shaftTolerance.slice(1), shaftTolerance.charAt(0));

  const calculateFit = () => {
    const maxClearance = holeLimits.upperLimit - shaftLimits.lowerLimit;
    const minClearance = holeLimits.lowerLimit - shaftLimits.upperLimit;
    
    let fitType = '';
    if (minClearance > 0) {
      fitType = 'Ajuste con holgura';
    } else if (maxClearance < 0) {
      fitType = 'Ajuste con interferencia';
    } else {
      fitType = 'Ajuste de transición';
    }
    
    return { maxClearance, minClearance, fitType };
  };

  const fit = calculateFit();

  const resetCalculator = () => {
    setNominalDimension(50);
    setToleranceGrade('IT7');
    setFundamentalDeviation('h');
    setShaftDimension(50);
    setShaftTolerance('g6');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <Ruler size={28} />
            <div>
              <h2 className="text-2xl font-bold">Calculadora de Tolerancias ISO</h2>
              <p className="opacity-90">Sistema de tolerancias y ajustes según norma ISO 286</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  🔧 Configuración del Agujero
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dimensión Nominal (mm)
                    </label>
                    <input
                      type="number"
                      value={nominalDimension}
                      onChange={(e) => setNominalDimension(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
                      min="1"
                      max="500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Grado de Tolerancia
                    </label>
                    <select
                      value={toleranceGrade}
                      onChange={(e) => setToleranceGrade(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
                    >
                      {Object.entries(toleranceGrades).map(([grade, info]) => (
                        <option key={grade} value={grade}>
                          {grade} - {info.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Desviación Fundamental
                    </label>
                    <select
                      value={fundamentalDeviation}
                      onChange={(e) => setFundamentalDeviation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
                    >
                      {Object.entries(fundamentalDeviations).map(([dev, info]) => (
                        <option key={dev} value={dev}>
                          {dev} - {info.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                  ⚙️ Configuración del Eje
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dimensión Nominal (mm)
                    </label>
                    <input
                      type="number"
                      value={shaftDimension}
                      onChange={(e) => setShaftDimension(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                      min="1"
                      max="500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tolerancia del Eje
                    </label>
                    <select
                      value={shaftTolerance}
                      onChange={(e) => setShaftTolerance(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                    >
                      <option value="h6">h6 - Eje base, precisión alta</option>
                      <option value="g6">g6 - Eje con holgura pequeña</option>
                      <option value="f7">f7 - Eje con holgura media</option>
                      <option value="e8">e8 - Eje con holgura grande</option>
                      <option value="d9">d9 - Eje con holgura muy grande</option>
                      <option value="s6">s6 - Eje con interferencia pequeña</option>
                      <option value="r6">r6 - Eje con interferencia media</option>
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
            <div className="space-y-6">
              {/* Hole Results */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                  <Calculator size={20} className="mr-2" />
                  Resultados del Agujero
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium">Límite Superior:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {holeLimits.upperLimit.toFixed(4)} mm
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium">Límite Inferior:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {holeLimits.lowerLimit.toFixed(4)} mm
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium">Tolerancia:</span>
                    <span className="text-lg font-bold text-blue-600">
                      ±{(holeLimits.tolerance / 2).toFixed(4)} mm
                    </span>
                  </div>
                </div>
              </div>

              {/* Shaft Results */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                  <Calculator size={20} className="mr-2" />
                  Resultados del Eje
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">Límite Superior:</span>
                    <span className="text-lg font-bold text-green-600">
                      {shaftLimits.upperLimit.toFixed(4)} mm
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">Límite Inferior:</span>
                    <span className="text-lg font-bold text-green-600">
                      {shaftLimits.lowerLimit.toFixed(4)} mm
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">Tolerancia:</span>
                    <span className="text-lg font-bold text-green-600">
                      ±{(shaftLimits.tolerance / 2).toFixed(4)} mm
                    </span>
                  </div>
                </div>
              </div>

              {/* Fit Analysis */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                  <Info size={20} className="mr-2" />
                  Análisis del Ajuste
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-center mb-3">
                      <span className="text-2xl font-bold text-purple-600">
                        {fit.fitType}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Holgura Máxima:</span>
                        <div className="font-bold text-purple-600">
                          {fit.maxClearance > 0 ? '+' : ''}{fit.maxClearance.toFixed(4)} mm
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Holgura Mínima:</span>
                        <div className="font-bold text-purple-600">
                          {fit.minClearance > 0 ? '+' : ''}{fit.minClearance.toFixed(4)} mm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Representación Visual</h3>
                
                <div className="space-y-4">
                  {/* Hole visualization */}
                  <div className="relative">
                    <div className="text-sm text-blue-600 mb-2">Agujero</div>
                    <div className="h-8 bg-blue-200 dark:bg-blue-800 rounded relative">
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {nominalDimension} {fundamentalDeviation}{toleranceGrade}
                      </div>
                    </div>
                  </div>
                  
                  {/* Shaft visualization */}
                  <div className="relative">
                    <div className="text-sm text-green-600 mb-2">Eje</div>
                    <div className="h-8 bg-green-200 dark:bg-green-800 rounded relative">
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {shaftDimension} {shaftTolerance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle size={20} className="text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                      Recomendaciones de Aplicación
                    </h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
                      <li>• Verificar capacidad del proceso de fabricación</li>
                      <li>• Considerar el método de medición y calibración</li>
                      <li>• Evaluar el costo vs precisión requerida</li>
                      <li>• Documentar tolerancias en planos técnicos</li>
                      <li>• Realizar estudios de capacidad del proceso (Cp, Cpk)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToleranciaCalculator;