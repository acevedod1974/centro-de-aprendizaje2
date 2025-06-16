import React, { useState } from 'react';
import { Award, Clock, Target, TrendingUp, CheckCircle, Users, Book } from 'lucide-react';
import SoldaduraQuiz from './tools/SoldaduraQuiz';

const EvaluationSection: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const quizzes = [
    {
      id: 'soldadura',
      title: 'Procesos de Soldadura',
      description: 'Evalúa tus conocimientos sobre soldadura MIG, TIG y por arco eléctrico',
      questions: 15,
      duration: 20,
      difficulty: 'Intermedio',
      category: 'Unión de Materiales',
      icon: '⚡',
      color: 'from-orange-500 to-red-600',
      completed: 1250,
      avgScore: 78
    },
    {
      id: 'mecanizado',
      title: 'Procesos de Mecanizado',
      description: 'Torneado, fresado, taladrado y parámetros de corte optimizados',
      questions: 20,
      duration: 25,
      difficulty: 'Intermedio',
      category: 'Remoción de Material',
      icon: '🔧',
      color: 'from-blue-500 to-blue-600',
      completed: 980,
      avgScore: 82
    },
    {
      id: 'conformado',
      title: 'Procesos de Conformado',
      description: 'Forjado, estampado, laminado y deformación plástica de metales',
      questions: 18,
      duration: 22,
      difficulty: 'Avanzado',
      category: 'Conformado de Metales',
      icon: '🔨',
      color: 'from-purple-500 to-pink-600',
      completed: 675,
      avgScore: 75
    },
    {
      id: 'fundicion',
      title: 'Procesos de Fundición',
      description: 'Moldeo, colado, solidificación y defectos en fundición',
      questions: 16,
      duration: 18,
      difficulty: 'Básico',
      category: 'Moldeo y Fundición',
      icon: '🔥',
      color: 'from-red-500 to-orange-600',
      completed: 540,
      avgScore: 71
    },
    {
      id: 'calidad',
      title: 'Control de Calidad',
      description: 'Inspección, tolerancias, metrología y aseguramiento de calidad',
      questions: 22,
      duration: 25,
      difficulty: 'Intermedio',
      category: 'Control de Calidad',
      icon: '🔍',
      color: 'from-green-500 to-teal-600',
      completed: 890,
      avgScore: 85
    },
    {
      id: 'materiales',
      title: 'Ciencia de Materiales',
      description: 'Propiedades, estructura cristalina y selección de materiales',
      questions: 25,
      duration: 30,
      difficulty: 'Avanzado',
      category: 'Materiales',
      icon: '⚗️',
      color: 'from-indigo-500 to-purple-600',
      completed: 720,
      avgScore: 73
    },
    {
      id: 'automatizacion',
      title: 'Automatización Industrial',
      description: 'CNC, robótica, PLC y sistemas de manufactura automatizada',
      questions: 20,
      duration: 28,
      difficulty: 'Avanzado',
      category: 'Automatización',
      icon: '🤖',
      color: 'from-cyan-500 to-blue-600',
      completed: 450,
      avgScore: 79
    },
    {
      id: 'seguridad',
      title: 'Seguridad Industrial',
      description: 'Normas de seguridad, prevención de riesgos y equipos de protección',
      questions: 18,
      duration: 20,
      difficulty: 'Básico',
      category: 'Seguridad',
      icon: '🛡️',
      color: 'from-yellow-500 to-orange-600',
      completed: 1100,
      avgScore: 88
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento Industrial',
      description: 'Mantenimiento preventivo, predictivo y gestión de activos',
      questions: 16,
      duration: 22,
      difficulty: 'Intermedio',
      category: 'Mantenimiento',
      icon: '🔧',
      color: 'from-emerald-500 to-green-600',
      completed: 630,
      avgScore: 76
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
          🏆 Centro de Evaluación
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Pon a prueba tus conocimientos con cuestionarios especializados en procesos de fabricación y tecnologías industriales.
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Book size={24} />
            <span className="text-2xl font-bold">9</span>
          </div>
          <div className="text-sm opacity-90">Evaluaciones Disponibles</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Users size={24} />
            <span className="text-2xl font-bold">7,235</span>
          </div>
          <div className="text-sm opacity-90">Estudiantes Evaluados</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Target size={24} />
            <span className="text-2xl font-bold">79%</span>
          </div>
          <div className="text-sm opacity-90">Puntuación Promedio</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={24} />
            <span className="text-2xl font-bold">+18%</span>
          </div>
          <div className="text-sm opacity-90">Mejora Mensual</div>
        </div>
      </div>

      {/* Quiz Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
          >
            <div className={`bg-gradient-to-r ${quiz.color} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{quiz.icon}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)} bg-white/20 text-white`}>
                  {quiz.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
              <p className="text-sm opacity-90">{quiz.category}</p>
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
                disabled={quiz.id !== 'soldadura'}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  quiz.id === 'soldadura'
                    ? `bg-gradient-to-r ${quiz.color} text-white hover:shadow-lg transform hover:scale-105`
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {quiz.id === 'soldadura' ? 'Comenzar Evaluación' : 'Próximamente'}
              </button>
              
              {quiz.id === 'soldadura' && (
                <div className="mt-3 flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 text-sm">
                  <CheckCircle size={16} />
                  <span>Disponible ahora</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Study Recommendations */}
      <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          📚 Recomendaciones de Estudio
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-3">🎯</div>
            <h4 className="font-semibold mb-2">Preparación Efectiva</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Revisa el material teórico antes de cada evaluación para obtener mejores resultados.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-3">⏱️</div>
            <h4 className="font-semibold mb-2">Gestión del Tiempo</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Administra tu tiempo durante las evaluaciones para completar todas las preguntas.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-3">🔄</div>
            <h4 className="font-semibold mb-2">Práctica Continua</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Repite las evaluaciones para reforzar conceptos y mejorar tu puntuación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationSection;