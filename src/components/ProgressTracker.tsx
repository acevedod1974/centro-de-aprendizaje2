import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, TrendingUp, Award, Star, CheckCircle } from 'lucide-react';

interface ProgressData {
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  studyTime: number;
  achievements: Achievement[];
  currentStreak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

const ProgressTracker: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData>({
    totalLessons: 45,
    completedLessons: 28,
    totalQuizzes: 15,
    completedQuizzes: 8,
    averageScore: 87,
    studyTime: 24.5,
    currentStreak: 7,
    achievements: [
      {
        id: '1',
        title: 'Primer Paso',
        description: 'Completa tu primera lección',
        icon: '🎯',
        unlocked: true,
        date: '2024-01-15'
      },
      {
        id: '2',
        title: 'Experto en Soldadura',
        description: 'Obtén 90% o más en el quiz de soldadura',
        icon: '⚡',
        unlocked: true,
        date: '2024-01-18'
      },
      {
        id: '3',
        title: 'Calculador Maestro',
        description: 'Usa 5 herramientas diferentes',
        icon: '🧮',
        unlocked: true,
        date: '2024-01-20'
      },
      {
        id: '4',
        title: 'Estudiante Dedicado',
        description: 'Mantén una racha de 7 días',
        icon: '🔥',
        unlocked: true,
        date: '2024-01-22'
      },
      {
        id: '5',
        title: 'Perfeccionista',
        description: 'Obtén 100% en cualquier evaluación',
        icon: '💎',
        unlocked: false
      },
      {
        id: '6',
        title: 'Maratón de Estudio',
        description: 'Estudia por 50 horas en total',
        icon: '🏃‍♂️',
        unlocked: false
      }
    ]
  });

  const completionPercentage = Math.round((progressData.completedLessons / progressData.totalLessons) * 100);
  const quizPercentage = Math.round((progressData.completedQuizzes / progressData.totalQuizzes) * 100);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 80) return 'from-blue-500 to-indigo-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📊 Tu Progreso de Aprendizaje
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Sigue tu evolución y celebra tus logros académicos
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Target size={32} />
            <span className="text-3xl font-bold">{completionPercentage}%</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Progreso General</h3>
          <p className="text-sm opacity-90">{progressData.completedLessons} de {progressData.totalLessons} lecciones</p>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
        </motion.div>

        <motion.div
          className={`bg-gradient-to-br ${getScoreGradient(progressData.averageScore)} text-white p-6 rounded-2xl shadow-lg`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Trophy size={32} />
            <span className="text-3xl font-bold">{progressData.averageScore}%</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Puntuación Promedio</h3>
          <p className="text-sm opacity-90">{progressData.completedQuizzes} evaluaciones completadas</p>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${progressData.averageScore}%` }}
              transition={{ delay: 0.7, duration: 1 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Clock size={32} />
            <span className="text-3xl font-bold">{progressData.studyTime}h</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Tiempo de Estudio</h3>
          <p className="text-sm opacity-90">Esta semana: 8.5h</p>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp size={16} />
            <span className="text-sm">+15% vs semana anterior</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🔥</span>
            <span className="text-3xl font-bold">{progressData.currentStreak}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Racha Actual</h3>
          <p className="text-sm opacity-90">días consecutivos</p>
          <div className="mt-4 flex items-center space-x-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < progressData.currentStreak ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Learning Progress */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <CheckCircle className="mr-3 text-green-500" size={24} />
            Progreso por Módulo
          </h3>
          
          <div className="space-y-4">
            {[
              { name: 'Procesos de Remoción', progress: 85, color: 'bg-blue-500' },
              { name: 'Procesos de Conformado', progress: 72, color: 'bg-green-500' },
              { name: 'Procesos de Unión', progress: 90, color: 'bg-purple-500' },
              { name: 'Procesos de Moldeo', progress: 45, color: 'bg-orange-500' },
              { name: 'Control de Calidad', progress: 60, color: 'bg-red-500' }
            ].map((module, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{module.name}</span>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{module.progress}%</span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    className={`${module.color} rounded-full h-3`}
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Award className="mr-3 text-yellow-500" size={24} />
            Logros Desbloqueados
          </h3>
          
          <div className="space-y-4">
            {progressData.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800'
                    : 'bg-gray-50 dark:bg-gray-700 opacity-60'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    achievement.unlocked 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.unlocked 
                      ? 'text-gray-600 dark:text-gray-300' 
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.date && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      Desbloqueado: {achievement.date}
                    </p>
                  )}
                </div>
                {achievement.unlocked && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="text-yellow-500" size={20} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Activity Chart */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          📈 Actividad Semanal
        </h3>
        
        <div className="grid grid-cols-7 gap-2">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{day}</div>
              <motion.div
                className={`h-20 rounded-lg ${
                  index < 5 ? 'bg-gradient-to-t from-blue-400 to-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                initial={{ height: 0 }}
                animate={{ height: index < 5 ? `${60 + Math.random() * 40}px` : '20px' }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {index < 5 ? `${Math.floor(1 + Math.random() * 3)}h` : '0h'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;