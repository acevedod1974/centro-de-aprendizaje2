import React, { useState, useEffect } from "react";
import { Target, TrendingUp, Users, Book, Brain } from "lucide-react";
import SoldaduraQuiz from "./tools/SoldaduraQuiz";
import QuizCard, { Quiz } from "./QuizCard";
import { useQuizProgress } from "../contexts/useQuizProgress";
import { useAchievements } from "../contexts/useAchievements";
import { useActivityLog } from "../contexts/ActivityLogContext";
import { supabase } from "../supabaseClient";
import { fallbackQuizzes } from "./fallbackQuizzes";

const LOCAL_STORAGE_KEY = "quizUserProgress";

const EvaluationSection: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const { userProgress, setUserProgress } = useQuizProgress();
  const { unlockAchievements } = useAchievements();
  const { logActivity } = useActivityLog();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    async function fetchQuizzes() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("quizzes")
        .select("id, title, description, process_id, created_at")
        .order("id");
      if (error) {
        setError(
          "No se pudieron cargar las evaluaciones. Intenta de nuevo más tarde."
        );
        setQuizzes(fallbackQuizzes); // Show all fallback quizzes if error
      } else {
        // Merge Supabase quizzes with fallback quizzes (avoid duplicates by id)
        const supabaseIds = new Set((data || []).map((q) => q.id));
        const merged = [
          ...(data || []),
          ...fallbackQuizzes.filter((q) => !supabaseIds.has(q.id)),
        ];
        setQuizzes(merged);
        console.log("Supabase connection OK. Quizzes:", data);
      }
      setLoading(false);
    }
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
        <span className="text-lg text-gray-700 dark:text-gray-200">
          Cargando evaluaciones...
        </span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
          {error}
        </h3>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (activeQuiz) {
    // Find the quiz object for the activeQuiz id
    const quizObj = quizzes.find((q) => q.id.toString() === activeQuiz);
    if (activeQuiz === "soldadura" && quizObj && quizObj.available !== false) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={() => setActiveQuiz(null)}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Volver a Evaluaciones"
            >
              <span>←</span>
              <span>Volver a Evaluaciones</span>
            </button>
          </div>
          <SoldaduraQuiz
            onComplete={(score: number) => {
              setUserProgress((prev) => ({
                ...prev,
                [activeQuiz]: {
                  completed: true,
                  bestScore:
                    typeof prev[activeQuiz]?.bestScore === "number"
                      ? Math.max(prev[activeQuiz].bestScore || 0, score)
                      : score,
                },
              }));
              unlockAchievements(activeQuiz, score, {
                ...userProgress,
                [activeQuiz]: {
                  completed: true,
                  bestScore:
                    typeof userProgress[activeQuiz]?.bestScore === "number"
                      ? Math.max(userProgress[activeQuiz].bestScore || 0, score)
                      : score,
                },
              });
              logActivity();
            }}
          />
        </div>
      );
    }
    // Not available quiz fallback
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-10 relative overflow-hidden animate-fade-in">
        {/* Animated SVG Illustration */}
        <div className="mb-6 animate-bounce-slow">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="54" fill="url(#grad1)" opacity="0.15" />
            <ellipse
              cx="60"
              cy="60"
              rx="38"
              ry="38"
              fill="url(#grad2)"
              opacity="0.25"
            />
            <g>
              <rect
                x="35"
                y="50"
                width="50"
                height="30"
                rx="8"
                fill="#fff"
                stroke="#a78bfa"
                strokeWidth="2"
              />
              <rect
                x="45"
                y="60"
                width="30"
                height="6"
                rx="3"
                fill="#a78bfa"
                opacity="0.7"
              />
              <circle cx="60" cy="65" r="2.5" fill="#6366f1" />
            </g>
            <defs>
              <linearGradient
                id="grad1"
                x1="0"
                y1="0"
                x2="120"
                y2="120"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient
                id="grad2"
                x1="22"
                y1="22"
                x2="98"
                y2="98"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2 drop-shadow-lg animate-fade-in-up">
          Próximamente
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 animate-fade-in-up delay-100 text-center max-w-md">
          El módulo de evaluación para este tema estará disponible pronto.
          <br />
          ¡Estamos trabajando para traerte nuevos desafíos!
        </p>
        <button
          onClick={() => setActiveQuiz(null)}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:from-purple-600 hover:to-pink-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in-up delay-200"
          aria-label="Volver a Evaluaciones"
        >
          ← Volver a Evaluaciones
        </button>
        {/* Subtle floating shapes for extra flair */}
        <div className="absolute top-4 left-8 w-8 h-8 bg-pink-400 opacity-20 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-8 right-10 w-12 h-12 bg-purple-400 opacity-20 rounded-full blur-2xl animate-float-slower" />
      </div>
    );
  }

  // Group quizzes by process_id for card layout
  const groupedQuizzes: { [key: number]: Quiz[] } = {};
  quizzes.forEach((quiz) => {
    if (quiz.process_id) {
      if (!groupedQuizzes[quiz.process_id])
        groupedQuizzes[quiz.process_id] = [];
      groupedQuizzes[quiz.process_id].push(quiz);
    } else {
      if (!groupedQuizzes[0]) groupedQuizzes[0] = [];
      groupedQuizzes[0].push(quiz);
    }
  });

  // Example process_id to section mapping (customize as needed)
  const processSections = [
    { id: 1, label: "Módulos de Ingeniería Fundamental", icon: "🔧" },
    { id: 2, label: "Tecnologías Avanzadas y Especialización", icon: "🚀" },
    { id: 3, label: "Ciencias Aplicadas y Gestión Industrial", icon: "🔬" },
    { id: 0, label: "Otros", icon: "📝" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🏆 Centro de Evaluación Avanzado
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Sistema integral de evaluación con {quizzes.length} módulos
          especializados en ingeniería mecánica y tecnologías industriales
          modernas.
        </p>
      </div>

      {/* Enhanced Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Book size={24} />
            <span className="text-2xl font-bold">{quizzes.length}</span>
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

      {/* Quiz Sections by process_id */}
      <div className="space-y-8">
        {processSections.map((section) =>
          groupedQuizzes[section.id] &&
          groupedQuizzes[section.id].length > 0 ? (
            <div key={section.id}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">{section.icon}</span>
                {section.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedQuizzes[section.id].map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onStart={setActiveQuiz}
                    userProgress={userProgress[quiz.id]}
                  />
                ))}
              </div>
            </div>
          ) : null
        )}
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
              El sistema analiza tu rendimiento y sugiere áreas de mejora
              específicas.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl mb-3">⏱️</div>
            <h4 className="font-semibold mb-2">Gestión Inteligente</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Optimiza tu tiempo de estudio con intervalos personalizados y
              descansos programados.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="font-semibold mb-2">Aprendizaje Continuo</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Repaso espaciado y refuerzo de conceptos basado en curvas de
              olvido.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="font-semibold mb-2">Analytics Avanzado</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Métricas detalladas de progreso y comparación con estándares
              industriales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationSection;
