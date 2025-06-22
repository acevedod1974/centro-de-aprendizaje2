import React from "react";
import { CheckCircle, Users, Book } from "lucide-react";
import { motion } from "framer-motion";

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  difficulty: string;
  category: string;
  icon: string;
  color: string;
  completed: number;
  avgScore: number;
  available: boolean;
}

interface QuizCardProps {
  quiz: Quiz;
  onStart: (id: string) => void;
  userProgress?: { completed: boolean; bestScore?: number };
}

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case "Básico":
      return "🟢";
    case "Intermedio":
      return "🟡";
    case "Avanzado":
      return "🔴";
    default:
      return "⚪";
  }
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStart, userProgress }) => {
  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (quiz.available) onStart(quiz.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group focus-within:ring-2 focus-within:ring-blue-400"
      tabIndex={0}
      role="region"
      aria-label={`Quiz: ${quiz.title}`}
    >
      <div
        className={`bg-gradient-to-r ${quiz.color} p-6 text-white relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="text-4xl" aria-hidden>
            {quiz.icon}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs">
              {getDifficultyIcon(quiz.difficulty)}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
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
              <Users size={16} />
              <span>Completado</span>
            </div>
            <span className="font-medium">
              {quiz.completed.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>Puntuación promedio</span>
            </div>
            <span className="font-medium">{quiz.avgScore}%</span>
          </div>
          {userProgress && (
            <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400">
              <span>Tu mejor puntaje:</span>
              <span>{userProgress.bestScore ?? "-"}%</span>
            </div>
          )}
        </div>
        <button
          onClick={handleStart}
          disabled={!quiz.available}
          className={`w-full py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            quiz.available
              ? `bg-gradient-to-r ${quiz.color} text-white hover:shadow-lg transform hover:scale-105`
              : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
          aria-label={
            quiz.available
              ? `Comenzar evaluación de ${quiz.title}`
              : `${quiz.title} próximamente`
          }
          role="button"
        >
          {quiz.available ? "Comenzar Evaluación" : "Próximamente"}
        </button>
        {quiz.available && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 text-sm">
            <CheckCircle size={16} />
            <span>Disponible ahora</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizCard;
