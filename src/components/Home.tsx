import React from "react";
import { Calculator, BookOpen, Award, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Feature Cards
  const features = [
    {
      icon: BookOpen,
      title: "Procesos de Fabricación Avanzados",
      description:
        "Aprende sobre procesos primarios, secundarios y de acabado con contenido interactivo actualizado para la Industria 4.0.",
      action: () => navigate("/procesos"),
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      particles: "✨",
      stats: "16+ Procesos",
      newFeature: "Simulaciones 3D",
    },
    {
      icon: Calculator,
      title: "Herramientas Interactivas de Última Generación",
      description:
        "Calculadoras avanzadas, simuladores CNC con IA y herramientas de control de calidad con normas ISO 2025.",
      action: () => navigate("/herramientas"),
      gradient: "from-emerald-500 via-green-600 to-teal-700",
      particles: "⚡",
      stats: "7 Herramientas",
      newFeature: "IA Integrada",
    },
    {
      icon: Award,
      title: "Centro de Evaluación Inteligente",
      description:
        "Sistema de evaluación adaptativo con 12 módulos especializados, retroalimentación personalizada y analytics avanzado.",
      action: () => navigate("/evaluacion"),
      gradient: "from-purple-500 via-violet-600 to-purple-700",
      particles: "🏆",
      stats: "12 Evaluaciones",
      newFeature: "Sistema Adaptativo",
    },
  ];

  // Quick Stats
  const stats = [
    {
      icon: Users,
      value: "8,450+",
      label: "Estudiantes Activos",
      color: "text-blue-500",
      trend: "+18% trimestre",
    },
    {
      icon: Calculator,
      value: "7",
      label: "Herramientas Interactivas",
      color: "text-green-500",
      trend: "+2 este mes",
    },
    {
      icon: BookOpen,
      value: "16+",
      label: "Procesos de Fabricación",
      color: "text-indigo-500",
      trend: "+3 nuevos",
    },
    {
      icon: TrendingUp,
      value: "97.2%",
      label: "Tasa de Éxito",
      color: "text-orange-500",
      trend: "+2.1% mejora",
    },
  ];

  // Achievements
  const achievements = [
    {
      icon: "🌟",
      title: "Premio Innovación Educativa",
      description: "Mejor plataforma STEM 2024",
    },
    {
      icon: "🏆",
      title: "Certificación ISO 9001:2025",
      description: "Calidad educativa internacional",
    },
    {
      icon: "🚀",
      title: "Tecnología de Vanguardia",
      description: "IA y simulaciones avanzadas",
    },
    {
      icon: "🌍",
      title: "Alcance Global",
      description: "Estudiantes en 25+ países",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Section */}
      <motion.div
        className="text-center py-6 md:py-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
          Centro de Aprendizaje en Ingeniería Mecánica
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
          Plataforma educativa interactiva con simuladores, recursos multimedia
          y herramientas de última generación para la Industria 4.0
        </p>
        <button
          onClick={() => navigate("/procesos")}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:from-purple-600 hover:to-pink-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Explora los Procesos
        </button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <stat.icon size={32} className={`mb-2 ${stat.color}`} />
            <span className="text-2xl font-bold mb-1">{stat.value}</span>
            <span className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              {stat.label}
            </span>
            <span className="text-xs text-green-600 dark:text-green-400">
              {stat.trend}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            className={`bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg p-8 flex flex-col items-center text-center min-h-[340px] hover:scale-105 transition-transform duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <div className="text-5xl mb-4">{feature.particles}</div>
            <feature.icon size={56} className="mb-2" />
            <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
              {feature.title}
            </h3>
            <p className="text-white/90 mb-4 text-base">
              {feature.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2">
              <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold text-white">
                {feature.stats}
              </span>
              <span className="bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-white">
                {feature.newFeature}
              </span>
            </div>
            <button
              onClick={feature.action}
              className="mt-auto px-6 py-2 bg-white/90 text-gray-900 font-semibold rounded-lg shadow hover:bg-white transition-colors w-full sm:w-auto"
            >
              Explorar
            </button>
          </motion.div>
        ))}
      </div>

      {/* Achievements Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {achievements.map((ach, idx) => (
          <motion.div
            key={ach.title}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <div className="text-3xl mb-2">{ach.icon}</div>
            <h4 className="font-bold text-lg mb-1 text-yellow-800 dark:text-yellow-200">
              {ach.title}
            </h4>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              {ach.description}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
