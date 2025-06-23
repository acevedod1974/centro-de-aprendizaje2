import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calculator,
  Zap,
  Hammer,
  ChevronRight,
  Search,
  Settings,
  Ruler,
  Cog,
  Thermometer,
  Code,
  Atom,
} from "lucide-react";
import VelocidadCorteCalculator from "./tools/VelocidadCorteCalculator";
import SoldaduraQuiz from "./tools/SoldaduraQuiz";
import ForjadoSimulator from "./tools/ForjadoSimulator";
import MecanizadoSimulator from "./tools/MecanizadoSimulator";
import CalidadInspector from "./tools/CalidadInspector";
import ToleranciaCalculator from "./tools/ToleranciaCalculator";
import EngranajCalculator from "./tools/EngranajCalculator";
import MaterialesCalculator from "./tools/MaterialesCalculator";

const ToolsSection: React.FC = () => {
  const { toolId } = useParams<{ toolId?: string }>();
  const navigate = useNavigate();

  const tools = [
    {
      id: "velocidad-corte",
      name: "Calculadora de Velocidad de Corte",
      description:
        "Optimiza tus parámetros de mecanizado para diferentes materiales y herramientas",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
      emoji: "🔧",
      category: "Cálculo",
      available: true,
    },
    {
      id: "tolerancia-calculator",
      name: "Calculadora de Tolerancias ISO",
      description:
        "Sistema completo de tolerancias y ajustes según norma ISO 286",
      icon: Ruler,
      color: "from-indigo-500 to-purple-600",
      emoji: "📐",
      category: "Cálculo",
      available: true,
    },
    {
      id: "engranaj-calculator",
      name: "Calculadora de Engranajes",
      description:
        "Diseño y análisis de transmisiones por engranajes cilíndricos",
      icon: Cog,
      color: "from-purple-500 to-pink-600",
      emoji: "⚙️",
      category: "Cálculo",
      available: true,
    },
    {
      id: "materiales-calculator",
      name: "Calculadora de Propiedades de Materiales",
      description:
        "Análisis comparativo y selección de materiales de ingeniería",
      icon: Atom,
      color: "from-cyan-500 to-blue-500",
      emoji: "🧪",
      category: "Cálculo",
      available: true,
    },
    {
      id: "soldadura-quiz",
      name: "Quiz de Soldadura",
      description:
        "Evalúa tus conocimientos sobre procesos de soldadura industrial",
      icon: Zap,
      color: "from-orange-500 to-red-600",
      emoji: "⚡",
      category: "Evaluación",
      available: true,
    },
    {
      id: "forjado-simulator",
      name: "Simulador de Forjado",
      description:
        "Experimenta con diferentes parámetros de forjado en tiempo real",
      icon: Hammer,
      color: "from-red-500 to-pink-600",
      emoji: "🔨",
      category: "Simulación",
      available: true,
    },
    {
      id: "mecanizado-simulator",
      name: "Simulador de Mecanizado CNC",
      description:
        "Simula procesos de torneado y fresado con diferentes materiales",
      icon: Settings,
      color: "from-indigo-500 to-purple-600",
      emoji: "⚙️",
      category: "Simulación",
      available: true,
    },
    {
      id: "calidad-inspector",
      name: "Inspector de Control de Calidad",
      description:
        "Herramienta de verificación dimensional y análisis de tolerancias",
      icon: Search,
      color: "from-green-500 to-teal-600",
      emoji: "🔍",
      category: "Inspección",
      available: true,
    },
    {
      id: "tratamiento-termico",
      name: "Simulador de Tratamientos Térmicos",
      description:
        "Simula procesos de temple, revenido y normalizado de aceros",
      icon: Thermometer,
      color: "from-red-400 to-orange-500",
      emoji: "🌡️",
      category: "Simulación",
      available: false,
    },
    {
      id: "cnc-programmer",
      name: "Programador CNC Virtual",
      description: "Entorno de programación CNC con simulación de trayectorias",
      icon: Code,
      color: "from-cyan-500 to-blue-500",
      emoji: "🤖",
      category: "Simulación",
      available: false,
    },
  ];

  if (toolId) {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate("/herramientas")}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
          >
            <span>←</span>
            <span>Volver a Herramientas</span>
          </button>
        </div>

        {toolId === "velocidad-corte" && <VelocidadCorteCalculator />}
        {toolId === "tolerancia-calculator" && <ToleranciaCalculator />}
        {toolId === "engranaj-calculator" && <EngranajCalculator />}
        {toolId === "materiales-calculator" && <MaterialesCalculator />}
        {toolId === "soldadura-quiz" && <SoldaduraQuiz />}
        {toolId === "forjado-simulator" && <ForjadoSimulator />}
        {toolId === "mecanizado-simulator" && <MecanizadoSimulator />}
        {toolId === "calidad-inspector" && <CalidadInspector />}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🛠️ Herramientas Interactivas Avanzadas
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Suite completa de herramientas especializadas para aplicar
          conocimientos teóricos en situaciones prácticas de ingeniería mecánica
          moderna.
        </p>
      </div>

      {/* Enhanced Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Calculator size={24} />
            <span className="text-2xl font-bold">8</span>
          </div>
          <div className="text-sm opacity-90">Herramientas Disponibles</div>
          <div className="text-xs opacity-75 mt-1">+1 nueva este mes</div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Settings size={24} />
            <span className="text-2xl font-bold">3</span>
          </div>
          <div className="text-sm opacity-90">Simuladores Avanzados</div>
          <div className="text-xs opacity-75 mt-1">Con física realista</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Ruler size={24} />
            <span className="text-2xl font-bold">4</span>
          </div>
          <div className="text-sm opacity-90">Calculadoras Técnicas</div>
          <div className="text-xs opacity-75 mt-1">Normas internacionales</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Search size={24} />
            <span className="text-2xl font-bold">1</span>
          </div>
          <div className="text-sm opacity-90">Herramientas de Calidad</div>
          <div className="text-xs opacity-75 mt-1">Control dimensional</div>
        </div>
      </div>

      {/* Tools by Category */}
      <div className="space-y-8">
        {/* Calculation Tools */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">🧮</span>
            Herramientas de Cálculo Avanzado
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools
              .filter((tool) => tool.category === "Cálculo")
              .map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    onClick={() =>
                      tool.available
                        ? navigate(`/herramientas/${tool.id}`)
                        : null
                    }
                    className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden ${
                      tool.available
                        ? "cursor-pointer hover:border-blue-200 dark:hover:border-blue-600"
                        : "opacity-75"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${tool.color} p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-4xl">{tool.emoji}</span>
                        <Icon size={28} className="opacity-80" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 relative z-10">
                        {tool.name}
                      </h3>
                      <div className="text-xs opacity-75 relative z-10">
                        {tool.available ? "Disponible" : "En desarrollo"}
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {tool.category}
                        </span>
                        <div
                          className={`flex items-center font-medium transition-transform ${
                            tool.available
                              ? "text-blue-600 dark:text-blue-400 group-hover:translate-x-2"
                              : "text-gray-400"
                          }`}
                        >
                          <span>
                            {tool.available ? "Abrir" : "Próximamente"}
                          </span>
                          {tool.available && (
                            <ChevronRight size={16} className="ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Simulation Tools */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">🎮</span>
            Simuladores Interactivos de Última Generación
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools
              .filter((tool) => tool.category === "Simulación")
              .map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    onClick={() =>
                      tool.available
                        ? navigate(`/herramientas/${tool.id}`)
                        : null
                    }
                    className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden ${
                      tool.available
                        ? "cursor-pointer hover:border-blue-200 dark:hover:border-blue-600"
                        : "opacity-75"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${tool.color} p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-4xl">{tool.emoji}</span>
                        <Icon size={28} className="opacity-80" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 relative z-10">
                        {tool.name}
                      </h3>
                      <div className="text-xs opacity-75 relative z-10">
                        {tool.available ? "Disponible" : "En desarrollo"}
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {tool.category}
                        </span>
                        <div
                          className={`flex items-center font-medium transition-transform ${
                            tool.available
                              ? "text-blue-600 dark:text-blue-400 group-hover:translate-x-2"
                              : "text-gray-400"
                          }`}
                        >
                          <span>
                            {tool.available ? "Abrir" : "Próximamente"}
                          </span>
                          {tool.available && (
                            <ChevronRight size={16} className="ml-1" />
                          )}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">📊</span>
            Evaluación y Control de Calidad Industrial
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools
              .filter(
                (tool) =>
                  tool.category === "Evaluación" ||
                  tool.category === "Inspección"
              )
              .map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    onClick={() =>
                      tool.available
                        ? navigate(`/herramientas/${tool.id}`)
                        : null
                    }
                    className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden ${
                      tool.available
                        ? "cursor-pointer hover:border-blue-200 dark:hover:border-blue-600"
                        : "opacity-75"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${tool.color} p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-4xl">{tool.emoji}</span>
                        <Icon size={28} className="opacity-80" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 relative z-10">
                        {tool.name}
                      </h3>
                      <div className="text-xs opacity-75 relative z-10">
                        {tool.available ? "Disponible" : "En desarrollo"}
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {tool.category}
                        </span>
                        <div
                          className={`flex items-center font-medium transition-transform ${
                            tool.available
                              ? "text-blue-600 dark:text-blue-400 group-hover:translate-x-2"
                              : "text-gray-400"
                          }`}
                        >
                          <span>
                            {tool.available ? "Abrir" : "Próximamente"}
                          </span>
                          {tool.available && (
                            <ChevronRight size={16} className="ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Enhanced Development Roadmap */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Roadmap de Desarrollo 2025
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Estamos desarrollando herramientas de vanguardia con inteligencia
            artificial y realidad aumentada para revolucionar el aprendizaje en
            ingeniería mecánica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-red-500">
            <div className="text-2xl mb-3">🌡️</div>
            <h4 className="font-semibold mb-2">
              Simulador de Tratamientos Térmicos
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Simulación completa de procesos de temple, revenido y normalizado
            </p>
            <div className="text-xs text-red-600 font-medium">Q2 2025</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
            <div className="text-2xl mb-3">🤖</div>
            <h4 className="font-semibold mb-2">Programador CNC Virtual</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Entorno completo de programación CNC con simulación 3D
            </p>
            <div className="text-xs text-blue-600 font-medium">Q3 2025</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
            <div className="text-2xl mb-3">🔬</div>
            <h4 className="font-semibold mb-2">
              Laboratorio Virtual de Materiales
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Ensayos virtuales de tracción, dureza y fatiga
            </p>
            <div className="text-xs text-green-600 font-medium">Q4 2025</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
            <div className="text-2xl mb-3">🥽</div>
            <h4 className="font-semibold mb-2">
              Realidad Aumentada Industrial
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Visualización AR de procesos y mantenimiento
            </p>
            <div className="text-xs text-purple-600 font-medium">2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;
