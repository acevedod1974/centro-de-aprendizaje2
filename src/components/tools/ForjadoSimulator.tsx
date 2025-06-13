import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Thermometer, Gauge, Timer } from 'lucide-react';

const ForjadoSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [temperature, setTemperature] = useState(1200);
  const [force, setForce] = useState(500);
  const [time, setTime] = useState(0);
  const [deformation, setDeformation] = useState(0);
  const [materialType, setMaterialType] = useState('acero');
  const [forgeType, setForgeType] = useState('libre');
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const materials = {
    acero: { name: 'Acero al Carbono', tempMin: 1000, tempMax: 1300, resistance: 1.0 },
    aluminio: { name: 'Aluminio', tempMin: 400, tempMax: 600, resistance: 0.3 },
    cobre: { name: 'Cobre', tempMin: 700, tempMax: 1000, resistance: 0.5 },
    titanio: { name: 'Titanio', tempMin: 900, tempMax: 1200, resistance: 1.5 },
  };

  const forgeTypes = {
    libre: { name: 'Forjado Libre', efficiency: 0.7, uniformity: 0.6 },
    matriz: { name: 'Forjado en Matriz', efficiency: 0.9, uniformity: 0.9 },
    estampado: { name: 'Estampado', efficiency: 0.95, uniformity: 0.95 },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + simulationSpeed);
        
        // Simulate deformation based on force, temperature, and material
        const material = materials[materialType as keyof typeof materials];
        const forge = forgeTypes[forgeType as keyof typeof forgeTypes];
        
        const tempFactor = Math.max(0, Math.min(1, (temperature - material.tempMin) / (material.tempMax - material.tempMin)));
        const effectiveForce = force * tempFactor * forge.efficiency / material.resistance;
        
        setDeformation(prev => {
          const newDeformation = prev + (effectiveForce * simulationSpeed * 0.01);
          return Math.min(newDeformation, 100);
        });
        
        // Temperature loss over time
        setTemperature(prev => Math.max(20, prev - (simulationSpeed * 2)));
        
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, temperature, force, materialType, forgeType, simulationSpeed]);

  const resetSimulation = () => {
    setIsRunning(false);
    setTime(0);
    setDeformation(0);
    setTemperature(1200);
  };

  const getTemperatureColor = () => {
    if (temperature > 1000) return 'text-red-500';
    if (temperature > 700) return 'text-orange-500';
    if (temperature > 400) return 'text-yellow-500';
    return 'text-blue-500';
  };

  const getDeformationStage = () => {
    if (deformation < 20) return { stage: 'Inicio', color: 'bg-blue-500' };
    if (deformation < 50) return { stage: 'Deformación', color: 'bg-yellow-500' };
    if (deformation < 80) return { stage: 'Conformado', color: 'bg-orange-500' };
    return { stage: 'Terminado', color: 'bg-green-500' };
  };

  const deformationStage = getDeformationStage();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🔨</span>
            <div>
              <h2 className="text-2xl font-bold">Simulador de Forjado</h2>
              <p className="opacity-90">Experimenta con diferentes parámetros de forjado</p>
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
                  {Object.entries(materials).map(([key, material]) => (
                    <option key={key} value={key}>{material.name}</option>
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
                  {Object.entries(forgeTypes).map(([key, forge]) => (
                    <option key={key} value={key}>{forge.name}</option>
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
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isRunning ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isRunning ? 'Pausar' : 'Iniciar'}</span>
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
                  <div className={`text-2xl font-bold ${getTemperatureColor()}`}>
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
                <h3 className="text-lg font-semibold mb-6">Estado del Material</h3>
                
                {/* Material Representation */}
                <div className="relative mx-auto mb-6" style={{ width: '200px', height: '120px' }}>
                  <div 
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${deformationStage.color} rounded-lg transition-all duration-500`}
                    style={{ 
                      width: `${80 + (deformation * 0.4)}px`, 
                      height: `${120 - (deformation * 0.8)}px`,
                      borderRadius: `${Math.max(8, 20 - deformation * 0.2)}px`
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
                    Estado: <span className="font-medium">{deformationStage.stage}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Deformación: <span className="font-medium">{Math.round(deformation)}%</span>
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
                    <span className="text-gray-600 dark:text-gray-400">Material:</span>
                    <span className="font-medium ml-2">{materials[materialType as keyof typeof materials].name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Proceso:</span>
                    <span className="font-medium ml-2">{forgeTypes[forgeType as keyof typeof forgeTypes].name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Eficiencia:</span>
                    <span className="font-medium ml-2">{Math.round(forgeTypes[forgeType as keyof typeof forgeTypes].efficiency * 100)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Uniformidad:</span>
                    <span className="font-medium ml-2">{Math.round(forgeTypes[forgeType as keyof typeof forgeTypes].uniformity * 100)}%</span>
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

export default ForjadoSimulator;