import React, { useState, useEffect } from "react";
import { Target, TrendingUp, Users, Book, Brain } from "lucide-react";
import SoldaduraQuiz from "./tools/SoldaduraQuiz";
import QuizCard, { Quiz } from "./QuizCard";
import { useQuizProgress } from "../contexts/useQuizProgress";
import { useAchievements } from "../contexts/useAchievements";
import { useActivityLog } from "../contexts/ActivityLogContext";

const quizzes: Quiz[] = [
  {
    id: "soldadura",
    title: "Procesos de Soldadura",
    description:
      "Evalúa tus conocimientos sobre soldadura MIG, TIG, por arco eléctrico y soldadura fuerte",
    questions: 15,
    duration: 20,
    difficulty: "Intermedio",
    category: "Unión de Materiales",
    icon: "⚡",
    color: "from-orange-500 to-red-600",
    completed: 1250,
    avgScore: 78,
    available: true,
  },
  {
    id: "mecanizado",
    title: "Procesos de Mecanizado",
    description:
      "Torneado, fresado, taladrado, rectificado y parámetros de corte optimizados",
    questions: 25,
    duration: 30,
    difficulty: "Intermedio",
    category: "Remoción de Material",
    icon: "🔧",
    color: "from-blue-500 to-blue-600",
    completed: 980,
    avgScore: 82,
    available: true,
  },
  {
    id: "conformado",
    title: "Procesos de Conformado",
    description:
      "Forjado, estampado, laminado, extrusión y deformación plástica de metales",
    questions: 20,
    duration: 25,
    difficulty: "Avanzado",
    category: "Conformado de Metales",
    icon: "🔨",
    color: "from-purple-500 to-pink-600",
    completed: 675,
    avgScore: 75,
    available: true,
  },
  {
    id: "fundicion",
    title: "Procesos de Fundición",
    description:
      "Moldeo, colado, solidificación, defectos en fundición y metalurgia extractiva",
    questions: 18,
    duration: 22,
    difficulty: "Básico",
    category: "Moldeo y Fundición",
    icon: "🔥",
    color: "from-red-500 to-orange-600",
    completed: 540,
    avgScore: 71,
    available: true,
  },
  {
    id: "calidad",
    title: "Control de Calidad",
    description:
      "Inspección, tolerancias, metrología, SPC y aseguramiento de calidad ISO 9001",
    questions: 22,
    duration: 25,
    difficulty: "Intermedio",
    category: "Control de Calidad",
    icon: "🔍",
    color: "from-green-500 to-teal-600",
    completed: 890,
    avgScore: 85,
    available: true,
  },
  {
    id: "materiales",
    title: "Ciencia de Materiales",
    description:
      "Propiedades mecánicas, estructura cristalina, diagramas de fase y selección de materiales",
    questions: 28,
    duration: 35,
    difficulty: "Avanzado",
    category: "Materiales",
    icon: "⚗️",
    color: "from-indigo-500 to-purple-600",
    completed: 720,
    avgScore: 73,
    available: true,
  },
  {
    id: "automatizacion",
    title: "Automatización Industrial",
    description:
      "CNC, robótica, PLC, sistemas SCADA y manufactura automatizada Industry 4.0",
    questions: 24,
    duration: 30,
    difficulty: "Avanzado",
    category: "Automatización",
    icon: "🤖",
    color: "from-cyan-500 to-blue-600",
    completed: 450,
    avgScore: 79,
    available: true,
  },
  {
    id: "seguridad",
    title: "Seguridad Industrial",
    description:
      "Normas OSHA, prevención de riesgos, equipos de protección y análisis de peligros",
    questions: 20,
    duration: 22,
    difficulty: "Básico",
    category: "Seguridad",
    icon: "🛡️",
    color: "from-yellow-500 to-orange-600",
    completed: 1100,
    avgScore: 88,
    available: true,
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento Industrial",
    description:
      "Mantenimiento preventivo, predictivo, TPM y gestión de activos industriales",
    questions: 19,
    duration: 24,
    difficulty: "Intermedio",
    category: "Mantenimiento",
    icon: "🔧",
    color: "from-emerald-500 to-green-600",
    completed: 630,
    avgScore: 76,
    available: true,
  },
  {
    id: "termodinamica",
    title: "Termodinámica Aplicada",
    description:
      "Ciclos termodinámicos, transferencia de calor y sistemas energéticos industriales",
    questions: 26,
    duration: 32,
    difficulty: "Avanzado",
    category: "Energía",
    icon: "🌡️",
    color: "from-red-400 to-pink-500",
    completed: 385,
    avgScore: 74,
    available: true,
  },
  {
    id: "diseno",
    title: "Diseño Mecánico",
    description:
      "Elementos de máquinas, análisis de esfuerzos, fatiga y diseño asistido por computadora",
    questions: 30,
    duration: 40,
    difficulty: "Avanzado",
    category: "Diseño",
    icon: "📐",
    color: "from-violet-500 to-purple-600",
    completed: 295,
    avgScore: 81,
    available: true,
  },
  {
    id: "fluidos",
    title: "Mecánica de Fluidos",
    description:
      "Hidrostática, hidrodinámica, bombas, compresores y sistemas de tuberías",
    questions: 23,
    duration: 28,
    difficulty: "Intermedio",
    category: "Fluidos",
    icon: "💧",
    color: "from-blue-400 to-cyan-500",
    completed: 520,
    avgScore: 77,
    available: true,
  },
];

const LOCAL_STORAGE_KEY = "quizUserProgress";

const EvaluationSection: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const { userProgress, setUserProgress } = useQuizProgress();
  const { unlockAchievements } = useAchievements();
  const { logActivity } = useActivityLog();
  const [loading, setLoading] = useState(false); // For future backend integration
  const [error, setError] = useState<string | null>(null); // For future backend integration

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProgress));
  }, [userProgress]);

  // Example: If you fetch quizzes or user data from backend in the future
  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   fetchDataFromBackend()
  //     .then(() => setLoading(false))
  //     .catch(() => { setError('Error al cargar datos.'); setLoading(false); });
  // }, []);

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
    if (activeQuiz === "soldadura") {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🏆 Centro de Evaluación Avanzado
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Sistema integral de evaluación con 12 módulos especializados en
          ingeniería mecánica y tecnologías industriales modernas.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes
              .filter((quiz) =>
                ["soldadura", "mecanizado", "conformado", "fundicion"].includes(
                  quiz.id
                )
              )
              .map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onStart={setActiveQuiz}
                  userProgress={userProgress[quiz.id]}
                />
              ))}
          </div>
        </div>

        {/* Advanced Technology Modules */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">🚀</span>
            Tecnologías Avanzadas y Especialización
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes
              .filter((quiz) =>
                ["calidad", "materiales", "automatizacion", "diseno"].includes(
                  quiz.id
                )
              )
              .map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onStart={setActiveQuiz}
                  userProgress={userProgress[quiz.id]}
                />
              ))}
          </div>
        </div>

        {/* Applied Sciences Modules */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">🔬</span>
            Ciencias Aplicadas y Gestión Industrial
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes
              .filter((quiz) =>
                [
                  "seguridad",
                  "mantenimiento",
                  "termodinamica",
                  "fluidos",
                ].includes(quiz.id)
              )
              .map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onStart={setActiveQuiz}
                  userProgress={userProgress[quiz.id]}
                />
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
