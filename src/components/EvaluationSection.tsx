import React, { useState } from 'react';
import { Award, Clock, Target, TrendingUp, CheckCircle, Users, Book, Star, Brain, Zap } from 'lucide-react';
import SoldaduraQuiz from './tools/SoldaduraQuiz';

const EvaluationSection: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const quizzes = [
    {
      id: 'soldadura',
      title: 'Procesos de Soldadura',
      description: 'Evalúa tus conocimientos sobre soldadura MIG, TIG, por arco eléctrico y soldadura fuerte',
      questions: 15,
      duration: 20,
      difficulty: 'Intermedio',
      category: 'Unión de Materiales',
      icon: '⚡',
      color: 'from-orange-500 to-red-600',
      completed: 1250,
      avgScore: 78,
      available: true
    },
    {
      id: 'mecanizado',
      title: 'Procesos de Mecanizado',
      description: 'Torneado, fresado, taladrado, rectificado y parámetros de corte optimizados',
      questions: 25,
      duration: 30,
      difficulty: 'Intermedio',
      category: 'Remoción de Material',
      icon: '🔧',
      color: 'from-blue-500 to-blue-600',
      completed: 980,
      avgScore: 82,
      available: true
    },
    {
      id: 'conformado',
      title: 'Procesos de Conformado',
      description: 'Forjado, estampado, laminado, extrusión y deformación plástica de metales',
      questions: 20,
      duration: 25,
      difficulty: 'Avanzado',
      category: 'Conformado de Metales',
      icon: '🔨',
      color: 'from-purple-500 to-pink-600',
      completed: 675,
      avgScore: 75,
      available: true
    },
    {
      id: 'fundicion',
      title: 'Procesos de Fundición',
      description: 'Moldeo, colado, solidificación, defectos en fundición y metalurgia extractiva',
      questions: 18,
      duration: 22,
      difficulty: 'Básico',
      category: 'Moldeo y Fundición',
      icon: '🔥',
      color: 'from-red-500 to-orange-600',
      completed: 540,
      avgScore: 71,
      available: true
    },
    {
      id: 'calidad',
      title: 'Control de Calidad',
      description: 'Inspección, tolerancias, metrología, SPC y aseguramiento de calidad ISO 9001',
      questions: 22,
      duration: 25,
      difficulty: 'Intermedio',
      category: 'Control de Calidad',
      icon: '🔍',
      color: 'from-green-500 to-teal-600',
      completed: 890,
      avgScore: 85,
      available: true
    },
    {
      id: 'materiales',
      title: 'Ciencia de Materiales',
      description: 'Propiedades mecánicas, estructura cristalina, diagramas de fase y selección de materiales',
      questions: 28,
      duration: 35,
      difficulty: 'Avanzado',
      category: 'Materiales',
      icon: '⚗️',
      color: 'from-indigo-500 to-purple-600',
      completed: 720,
      avgScore: 73,
      available: true
    },
    {
      id: 'automatizacion',
      title: 'Automatización Industrial',
      description: 'CNC, robótica, PLC, sistemas SCADA y manufactura automatizada Industry 4.0',
      questions: 24,
      duration: 30,
      difficulty: 'Avanzado',
      category: 'Automatización',
      icon: '🤖',
      color: 'from-cyan-500 to-blue-600',
      completed: 450,
      avgScore: 79,
      available: true
    },
    {
      id: 'seguridad',
      title: 'Seguridad Industrial',
      description: 'Normas OSHA, prevención de riesgos, equipos de protección y análisis de peligros',
      questions: 20,
      duration: 22,
      difficulty: 'Básico',
      category: 'Seguridad',
      icon: '🛡️',
      color: 'from-yellow-500 to-orange-600',
      completed: 1100,
      avgScore: 88,
      available: true
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento Industrial',
      description: 'Mantenimiento preventivo, predictivo, TPM y gestión de activos industriales',
      questions: 19,
      duration: 24,
      difficulty: 'Intermedio',
      category: 'Mantenimiento',
      icon: '🔧',
      color: 'from-emerald-500 to-green-600',
      completed: 630,
      avgScore: 76,
      available: true
    },
    {
      id: 'termodinamica',
      title: 'Termodinámica Aplicada',
      description: 'Ciclos termodinámicos, transferencia de calor y sistemas energéticos industriales',
      questions: 26,
      duration: 32,
      difficulty: 'Avanzado',
      category: 'Energía',
      icon: '🌡️',
      color: 'from-red-400 to-pink-500',
      completed: 385,
      avgScore: 74,
      available: true
    },
    {
      id: 'diseno',
      title: 'Diseño Mecánico',
      description: 'Elementos de máquinas, análisis de esfuerzos, fatiga y diseño asistido por computadora',
      questions: 30,
      duration: 40,
      difficulty: 'Avanzado',
      category: 'Diseño',
      icon: '📐',
      color: 'from-violet-500 to-purple-600',
      completed: 295,
      avgScore: 81,
      available: true
    },
    {
      id: 'fluidos',
      title: 'Mecánica de Fluidos',
      description: 'Hidrostática, hidrodinámica, bombas, compresores y sistemas de tuberías',
      questions: 23,
      duration: 28,
      difficulty: 'Intermedio',
      category: 'Fluidos',
      icon: '💧',
      color: 'from-blue-400 to-cyan-500',
      completed: 520,
      avgScore: 77,
      available: true
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Avanzado': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return '🟢';
      case 'Intermedio': return '🟡';
      case 'Avanzado': return '🔴';
      default: return '⚪';
    }
  };

  if (activeQuiz === 'soldadura') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setActiveQuiz(null)}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
          >
            <span>←</span>
            <span>Volver a Evaluaciones</span>
          </button>
        </div>
        <SoldaduraQuiz />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🏆 Centro de Evaluación Avanzado
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Sistema integral de evaluación con 12 módulos especializados en ingeniería mecánica y tecnologías industriales modernas.
        </p>
      </div>

      {/* Enhanced Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Book size={24} />
            <span className="text-2xl font-bold">12</span>
          </div>
          <div className="text-sm opacity-90">Evaluaciones Disponibles</div>
          <div className="text-xs opacity-75 mt-1">+3 nuevas este mes</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Users size={24} />
            <span className="text-2xl font-bold">8,450</span>
          </div>
          <div className="text-sm opacity-90">Estudiantes Evaluados</div>
          <div className="text-xs opacity-75 mt-1">+15% este trimestre</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Target size={24} />
            <span className="text-2xl font-bold">79.2%</span>
          </div>
          <div className="text-sm opacity-90">Puntuación Promedio</div>
          <div className="text-xs opacity-75 mt-1">+2.1% vs mes anterior</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={24} />
            <span className="text-2xl font-bold">+22%</span>
          </div>
          <div className="text-sm opacity-90">Mejora Mensual</div>
          <div className="text-xs opacity-75 mt-1">Tendencia positiva</div>
        </div>
      </div>

      {/* Quiz Categories */}
      <div className="space-y-8">
        {/* Core Engineering Modules */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">🔧</span>
            Módulos de Ingeniería Fundamental
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.filter(quiz => ['soldadura', 'mecanizado', 'conformado', 'fundicion'].includes(quiz.id)).map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <div className={`bg-gradient-to-r ${quiz.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="text-4xl">{quiz.icon}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">{getDifficultyIcon(quiz.difficulty)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 relative z-10">{quiz.title}</h3>
                  <p className="text-sm opacity-90 relative z-10">{quiz.category}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {quiz.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Book size={16} />
                        <span>Preguntas</span>
                      </div>
                      <span className="font-medium">{quiz.questions}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Clock size={16} />
                        <span>Duración</span>
                      </div>
                      <span className="font-medium">{quiz.duration} min</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Users size={16} />
                        <span>Completado</span>
                      </div>
                      <span className="font-medium">{quiz.completed.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Award size={16} />
                        <span>Puntuación promedio</span>
                      </div>
                      <span className="font-medium">{quiz.avgScore}%</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => quiz.id === 'soldadura' ? setActiveQuiz(quiz.id) : null}
                    disabled={!quiz.available}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      quiz.available
                        ? `bg-gradient-to-r ${quiz.color} text-white hover:shadow-lg transform hover:scale-105`
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {quiz.available ? 'Comenzar Evaluación' : 'Próximamente'}
                  </button>
                  
                  {quiz.available && (
                    <div className="mt-3 flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle size={16} />
                      <span>Disponible ahora</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Technology Modules */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">🚀</span>
            Tecnologías Avanzadas y Especialización
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.filter(quiz => ['calidad', 'materiales', 'automatizacion', 'diseno'].includes(quiz.id)).map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <div className={`bg-gradient-to-r ${quiz.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="text-4xl">{quiz.icon}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">{getDifficultyIcon(quiz.difficulty)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 relative z-10">{quiz.title}</h3>
                  <p className="text-sm opacity-90 relative z-10">{quiz.category}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {quiz.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Book size={16} />
                        <span>Preguntas</span>
                      </div>
                      <span className="font-medium">{quiz.questions}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Clock size={16} />
                        <span>Duración</span>
                      </div>
                      <span className="font-medium">{quiz.duration} min</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Users size={16} />
                        <span>Completado</span>
                      </div>
                      <span className="font-medium">{quiz.completed.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Award size={16} />
                        <span>Puntuación promedio</span>
                      </div>
                      <span className="font-medium">{quiz.avgScore}%</span>
                    </div>
                  </div>
                  
                  <button
                    disabled={!quiz.available}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      quiz.available
                        ? `bg-gradient-to-r ${quiz.color} text-white hover:shadow-lg transform hover:scale-105`
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {quiz.available ? 'Comenzar Evaluación' : 'Próximamente'}
                  </button>
                  
                  {quiz.available && (
                    <div className="mt-3 flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle size={16} />
                      <span>Disponible ahora</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applied Sciences Modules */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">🔬</span>
            Ciencias Aplicadas y Gestión Industrial
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.filter(quiz => ['seguridad', 'mantenimiento', 'termodinamica', 'fluidos'].includes(quiz.id)).map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <div className={`bg-gradient-to-r ${quiz.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="text-4xl">{quiz.icon}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">{getDifficultyIcon(quiz.difficulty)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 relative z-10">{quiz.title}</h3>
                  <p className="text-sm opacity-90 relative z-10">{quiz.category}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {quiz.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Book size={16} />
                        <span>Preguntas</span>
                      </div>
                      <span className="font-medium">{quiz.questions}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Clock size={16} />
                        <span>Duración</span>
                      </div>
                      <span className="font-medium">{quiz.duration} min</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Users size={16} />
                        <span>Completado</span>
                      </div>
                      <span className="font-medium">{quiz.completed.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Award size={16} />
                        <span>Puntuación promedio</span>
                      </div>
                      <span className="font-medium">{quiz.avgScore}%</span>
                    </div>
                  </div>
                  
                  <button
                    disabled={!quiz.available}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      quiz.available
                        ? `bg-gradient-to-r ${quiz.color} text-white hover:shadow-lg transform hover:scale-105`
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {quiz.available ? 'Comenzar Evaluación' : 'Próximamente'}
                  </button>
                  
                  {quiz.available && (
                    <div className="mt-3 flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle size={16} />
                      <span>Disponible ahora</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Study Recommendations */}
      <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
          <Brain className="mr-3" size={28} />
          Sistema de Recomendaciones Inteligente
        </h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-semibold mb-2">Preparación Adaptativa</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              El sistema analiza tu rendimiento y sugiere áreas de mejora específicas.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl mb-3">⏱️</div>
            <h4 className="font-semibold mb-2">Gestión Inteligente</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Optimiza tu tiempo de estudio con intervalos personalizados y descansos programados.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="font-semibold mb-2">Aprendizaje Continuo</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Repaso espaciado y refuerzo de conceptos basado en curvas de olvido.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="font-semibold mb-2">Analytics Avanzado</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Métricas detalladas de progreso y comparación con estándares industriales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationSection;