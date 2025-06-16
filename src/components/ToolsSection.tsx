import React, { useState } from 'react';
import { Calculator, Zap, Hammer, ChevronRight, Search, Settings } from 'lucide-react';
import VelocidadCorteCalculator from './tools/VelocidadCorteCalculator';
import SoldaduraQuiz from './tools/SoldaduraQuiz';
import ForjadoSimulator from './tools/ForjadoSimulator';
import MecanizadoSimulator from './tools/MecanizadoSimulator';
import CalidadInspector from './tools/CalidadInspector';

const ToolsSection: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'velocidad-corte',
      name: 'Calculadora de Velocidad de Corte',
      description: 'Optimiza tus parámetros de mecanizado para diferentes materiales y herramientas',
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      emoji: '🔧',
      category: 'Cálculo'
    },
    {
      id: 'soldadura-quiz',
      name: 'Quiz de Soldadura',
      description: 'Evalúa tus conocimientos sobre procesos de soldadura industrial',
      icon: Zap,
      color: 'from-orange-500 to-red-600',
      emoji: '⚡',
      category: 'Evaluación'
    },
    {
      id: 'forjado-simulator',
      name: 'Simulador de Forjado',
      description: 'Experimenta con diferentes parámetros de forjado en tiempo real',
      icon: Hammer,
      color: 'from-red-500 to-pink-600',
      emoji: '🔨',
      category: 'Simulación'
    },
    {
      id: 'mecanizado-simulator',
      name: 'Simulador de Mecanizado CNC',
      description: 'Simula procesos de torneado y fresado con diferentes materiales',
      icon: Settings,
      color: 'from-indigo-500 to-purple-600',
      emoji: '⚙️',
      category: 'Simulación'
    },
    {
      id: 'calidad-inspector',
      name: 'Inspector de Control de Calidad',
      description: 'Herramienta de verificación dimensional y análisis de tolerancias',
      icon: Search,
      color: 'from-green-500 to-teal-600',
      emoji: '🔍',
      category: 'Inspección'
    }
  ];

  if (activeTool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setActiveTool(null)}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
          >
            <span>←</span>
            <span>Volver a Herramientas</span>
          </button>
        </div>
        
        {activeTool === 'velocidad-corte' && <VelocidadCorteCalculator />}
        {activeTool === 'soldadura-quiz' && <SoldaduraQuiz />}
        {activeTool === 'forjado-simulator' && <ForjadoSimulator />}
        {activeTool === 'mecanizado-simulator' && <MecanizadoSimulator />}
        {activeTool === 'calidad-inspector' && <CalidadInspector />}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🛠️ Herramientas Interactivas
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Utiliza estas herramientas especializadas para aplicar conocimientos teóricos en situaciones prácticas de ingeniería mecánica.
        </p>
      </div>

      {/* Tools by Category */}
      <div className="space-y-8">
        {/* Simulation Tools */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-2">🎮</span>
            Simuladores Interactivos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.filter(tool => tool.category === 'Simulación').map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{tool.emoji}</span>
                      <Icon size={28} className="opacity-80" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {tool.category}
                      </span>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                        <span>Abrir</span>
                        <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calculation Tools */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-2">🧮</span>
            Herramientas de Cálculo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.filter(tool => tool.category === 'Cálculo').map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{tool.emoji}</span>
                      <Icon size={28} className="opacity-80" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {tool.category}
                      </span>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                        <span>Abrir</span>
                        <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality & Evaluation Tools */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-2">📊</span>
            Evaluación y Control de Calidad
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.filter(tool => tool.category === 'Evaluación' || tool.category === 'Inspección').map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${tool.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{tool.emoji}</span>
                      <Icon size={28} className="opacity-80" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {tool.category}
                      </span>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                        <span>Abrir</span>
                        <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Tools Coming Soon */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Más Herramientas en Desarrollo
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Estamos trabajando en nuevas herramientas interactivas para mejorar tu experiencia de aprendizaje en ingeniería mecánica.
        </p>
        
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl mb-2">📐</div>
            <h4 className="font-semibold">Calculadora de Tolerancias</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Próximamente</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl mb-2">🔩</div>
            <h4 className="font-semibold">Calculadora de Engranajes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">En desarrollo</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl mb-2">🌡️</div>
            <h4 className="font-semibold">Simulador de Tratamientos Térmicos</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Planificado</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="font-semibold">Programador CNC Virtual</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">En diseño</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;