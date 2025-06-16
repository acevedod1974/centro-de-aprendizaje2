import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, Ruler } from 'lucide-react';

const CalidadInspector: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string>('eje');
  const [measurements, setMeasurements] = useState({
    diameter: 25.02,
    length: 100.15,
    roughness: 1.6,
    roundness: 0.008
  });
  const [tolerances, setTolerances] = useState({
    diameter: { nominal: 25, upper: 0.05, lower: -0.05 },
    length: { nominal: 100, upper: 0.2, lower: -0.2 },
    roughness: { max: 3.2 },
    roundness: { max: 0.01 }
  });

  const parts = {
    eje: { name: 'Eje de Transmisión', icon: '🔧' },
    engranaje: { name: 'Engranaje Cilíndrico', icon: '⚙️' },
    rodamiento: { name: 'Rodamiento de Bolas', icon: '🔵' },
    brida: { name: 'Brida de Conexión', icon: '🔗' }
  };

  const checkTolerance = (measurement: number, tolerance: any) => {
    if (tolerance.max) {
      return measurement <= tolerance.max;
    }
    const upperLimit = tolerance.nominal + tolerance.upper;
    const lowerLimit = tolerance.nominal + tolerance.lower;
    return measurement >= lowerLimit && measurement <= upperLimit;
  };

  const getStatusIcon = (measurement: number, tolerance: any) => {
    const isWithinTolerance = checkTolerance(measurement, tolerance);
    if (isWithinTolerance) {
      return <CheckCircle className="text-green-500" size={20} />;
    }
    return <XCircle className="text-red-500" size={20} />;
  };

  const getStatusColor = (measurement: number, tolerance: any) => {
    const isWithinTolerance = checkTolerance(measurement, tolerance);
    return isWithinTolerance ? 'text-green-600' : 'text-red-600';
  };

  const generateReport = () => {
    const results = [
      { param: 'Diámetro', value: measurements.diameter, tolerance: tolerances.diameter, unit: 'mm' },
      { param: 'Longitud', value: measurements.length, tolerance: tolerances.length, unit: 'mm' },
      { param: 'Rugosidad', value: measurements.roughness, tolerance: tolerances.roughness, unit: 'μm' },
      { param: 'Redondez', value: measurements.roundness, tolerance: tolerances.roundness, unit: 'mm' }
    ];

    const passedTests = results.filter(r => checkTolerance(r.value, r.tolerance)).length;
    const totalTests = results.length;
    const passRate = (passedTests / totalTests) * 100;

    return { results, passedTests, totalTests, passRate };
  };

  const report = generateReport();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🔍</span>
            <div>
              <h2 className="text-2xl font-bold">Inspector de Control de Calidad</h2>
              <p className="opacity-90">Verificación dimensional y geométrica de componentes</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Part Selection */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Componente a Inspeccionar
                </label>
                <select
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                >
                  {Object.entries(parts).map(([key, part]) => (
                    <option key={key} value={key}>{part.name}</option>
                  ))}
                </select>
              </div>

              {/* Measurement Inputs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Mediciones</h3>
                
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Diámetro (mm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={measurements.diameter}
                    onChange={(e) => setMeasurements({...measurements, diameter: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Longitud (mm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={measurements.length}
                    onChange={(e) => setMeasurements({...measurements, length: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Rugosidad Ra (μm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.roughness}
                    onChange={(e) => setMeasurements({...measurements, roughness: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Redondez (mm)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={measurements.roundness}
                    onChange={(e) => setMeasurements({...measurements, roundness: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Inspection Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Card */}
              <div className={`p-6 rounded-lg ${
                report.passRate === 100 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : report.passRate >= 75
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Resultado de Inspección</h3>
                  <div className="flex items-center space-x-2">
                    {report.passRate === 100 ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : report.passRate >= 75 ? (
                      <AlertTriangle className="text-yellow-500" size={24} />
                    ) : (
                      <XCircle className="text-red-500" size={24} />
                    )}
                    <span className={`text-2xl font-bold ${
                      report.passRate === 100 ? 'text-green-600' :
                      report.passRate >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {Math.round(report.passRate)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {report.passedTests} de {report.totalTests} parámetros dentro de tolerancia
                </p>
              </div>

              {/* Detailed Results */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Ruler className="mr-2" size={20} />
                  Análisis Dimensional
                </h3>
                
                <div className="space-y-4">
                  {report.results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(result.value, result.tolerance)}
                        <div>
                          <div className="font-medium">{result.param}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {result.tolerance.max ? 
                              `Máximo: ${result.tolerance.max} ${result.unit}` :
                              `${result.tolerance.nominal}${result.tolerance.upper > 0 ? '+' : ''}${result.tolerance.upper}/${result.tolerance.lower} ${result.unit}`
                            }
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getStatusColor(result.value, result.tolerance)}`}>
                          {result.value} {result.unit}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {checkTolerance(result.value, result.tolerance) ? 'PASA' : 'FALLA'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Representation */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Representación Visual</h3>
                
                <div className="relative mx-auto mb-6" style={{ width: '300px', height: '150px' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">
                      {parts[selectedPart as keyof typeof parts].icon}
                    </div>
                  </div>
                  
                  {/* Measurement indicators */}
                  <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-2 rounded text-xs">
                    ⌀ {measurements.diameter}mm
                  </div>
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded text-xs">
                    L: {measurements.length}mm
                  </div>
                  <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 p-2 rounded text-xs">
                    Ra: {measurements.roughness}μm
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded text-xs">
                    ○: {measurements.roundness}mm
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  📋 Recomendaciones
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  {report.passRate < 100 && (
                    <>
                      <li>• Revisar proceso de fabricación</li>
                      <li>• Verificar calibración de instrumentos</li>
                      <li>• Analizar causas de variación dimensional</li>
                    </>
                  )}
                  {measurements.roughness > tolerances.roughness.max && (
                    <li>• Mejorar acabado superficial - ajustar parámetros de corte</li>
                  )}
                  {!checkTolerance(measurements.roundness, tolerances.roundness) && (
                    <li>• Verificar rigidez del sistema de sujeción</li>
                  )}
                  <li>• Documentar resultados en registro de calidad</li>
                  <li>• Realizar seguimiento estadístico del proceso</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalidadInspector;