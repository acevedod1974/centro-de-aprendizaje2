import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
} from "lucide-react";
import { useQuizProgress } from "../contexts/useQuizProgress";
import { useAchievements } from "../contexts/useAchievements";
import { useActivityLog } from "../contexts/ActivityLogContext";

const ProgressTracker: React.FC = () => {
  const { userProgress } = useQuizProgress();
  const { achievements } = useAchievements();
  const { activityLog } = useActivityLog();

  // Calculate stats from userProgress
  const quizIds = Object.keys(userProgress);
  const totalQuizzes = quizIds.length;
  const completedQuizzes = quizIds.filter(
    (id) => userProgress[id]?.completed
  ).length;
  const averageScore = (() => {
    const scores = quizIds
      .map((id) => userProgress[id]?.bestScore)
      .filter((score) => typeof score === "number" && !isNaN(score));
    if (scores.length === 0) return 0;
    return Math.round(
      scores.reduce((a, b) => a + (b as number), 0) / scores.length
    );
  })();

  // Safe guards for undefined/null/NaN values
  const completedLessons = completedQuizzes; // Alias for UI compatibility
  const totalLessons = totalQuizzes || 1;
  const studyTime = Number(userProgress.studyTime) || 0;
  const currentStreak = Number(userProgress.currentStreak) || 0;

  const completionPercentage =
    Math.round((completedLessons / totalLessons) * 100) || 0;
  const safeAverageScore = isNaN(averageScore) ? 0 : averageScore;

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-green-500 to-emerald-600";
    if (score >= 80) return "from-blue-500 to-indigo-600";
    if (score >= 70) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  // --- Dynamic Progreso por Módulo ---
  // Map module names to quiz IDs
  const moduleMap = [
    { name: "Procesos de Remoción", ids: ["mecanizado"] },
    { name: "Procesos de Conformado", ids: ["conformado"] },
    { name: "Procesos de Unión", ids: ["soldadura"] },
    { name: "Procesos de Moldeo", ids: ["fundicion"] },
    { name: "Control de Calidad", ids: ["calidad"] },
    { name: "Ciencia de Materiales", ids: ["materiales"] },
    { name: "Automatización", ids: ["automatizacion"] },
    { name: "Seguridad", ids: ["seguridad"] },
    { name: "Mantenimiento", ids: ["mantenimiento"] },
    { name: "Termodinámica", ids: ["termodinamica"] },
    { name: "Diseño Mecánico", ids: ["diseno"] },
    { name: "Mecánica de Fluidos", ids: ["fluidos"] },
  ];
  const moduleProgress = moduleMap.map((mod) => {
    const total = mod.ids.length;
    const completed = mod.ids.filter(
      (id) => userProgress[id]?.completed
    ).length;
    return {
      name: mod.name,
      progress: Math.round((completed / total) * 100),
      color:
        total && completed === total
          ? "bg-green-500"
          : completed > 0
          ? "bg-blue-500"
          : "bg-gray-400",
    };
  });

  // --- Weekly Activity ---
  // Get last 7 days (Mon-Sun)
  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];
  const today = new Date();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - ((today.getDay() + 6) % 7) + i); // Monday as first day
    return d.toISOString().split("T")[0];
  });
  const weekActivity = weekDates.map((date) => activityLog[date] || 0);

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
          <p className="text-sm opacity-90">
            {completedQuizzes} de {totalQuizzes} evaluaciones completadas
          </p>
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
          className={`bg-gradient-to-br ${getScoreGradient(
            userProgress.averageScore
          )} text-white p-6 rounded-2xl shadow-lg`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Trophy size={32} />
            <span className="text-3xl font-bold">{safeAverageScore}%</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Puntuación Promedio</h3>
          <p className="text-sm opacity-90">
            {completedQuizzes} evaluaciones completadas
          </p>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${safeAverageScore}%` }}
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
            <span className="text-3xl font-bold">{studyTime}h</span>
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
            <span className="text-3xl font-bold">{currentStreak}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Racha Actual</h3>
          <p className="text-sm opacity-90">días consecutivos</p>
          <div className="mt-4 flex items-center space-x-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < currentStreak ? "bg-white" : "bg-white/30"
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
            {moduleProgress.map((module, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {module.name}
                  </span>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    {module.progress}%
                  </span>
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
            {achievements.filter((a) => a.unlocked).length === 0 ? (
              <div className="text-center text-gray-400 dark:text-gray-500 py-8">
                <span className="text-4xl block mb-2">🔒</span>
                <span className="font-semibold">
                  Aún no has desbloqueado logros. ¡Sigue aprendiendo!
                </span>
              </div>
            ) : (
              achievements
                .filter((a) => a.unlocked)
                .map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </p>
                      {achievement.date && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                          Desbloqueado: {achievement.date}
                        </p>
                      )}
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="text-yellow-500" size={20} />
                    </motion.div>
                  </motion.div>
                ))
            )}
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
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {day}
              </div>
              <motion.div
                className={`rounded-lg ${
                  weekActivity[index] > 0
                    ? "bg-gradient-to-t from-blue-400 to-blue-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
                initial={{ height: 0 }}
                animate={{ height: `${20 + weekActivity[index] * 20}px` }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                style={{ minHeight: 20 }}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {weekActivity[index] > 0 ? `${weekActivity[index]} quiz` : "0"}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;
