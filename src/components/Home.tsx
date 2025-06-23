import React from "react";
import { Calculator, BookOpen, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: BookOpen,
      title: "Procesos de Fabricación Avanzados",
      description:
        "Aprende sobre procesos primarios, secundarios y de acabado con contenido interactivo actualizado para la Industria 4.0",
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
        "Calculadoras avanzadas, simuladores CNC con IA y herramientas de control de calidad con normas ISO 2025",
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
        "Sistema de evaluación adaptativo con 12 módulos especializados, retroalimentación personalizada y analytics avanzado",
      action: () => navigate("/evaluacion"),
      gradient: "from-purple-500 via-violet-600 to-purple-700",
      particles: "🏆",
      stats: "12 Evaluaciones",
      newFeature: "Sistema Adaptativo",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            className={`bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg p-6 flex flex-col items-center text-center min-h-[320px] hover:scale-105 transition-transform duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <div className="text-5xl mb-4">{feature.particles}</div>
            <feature.icon size={48} className="mb-2" />
            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
              {feature.title}
            </h3>
            <p className="text-white/90 mb-4 text-sm sm:text-base">
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
    </div>
  );
};

export default Home;
