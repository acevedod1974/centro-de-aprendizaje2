import React from 'react';
import { Wrench, Calculator, BookOpen, Award, TrendingUp, Users, Sparkles, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeProps {
  setActiveSection: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Procesos de Fabricación',
      description: 'Aprende sobre procesos primarios, secundarios y de acabado con contenido interactivo actualizado',
      action: () => setActiveSection('procesos'),
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
      particles: '✨',
      stats: '16+ Procesos'
    },
    {
      icon: Calculator,
      title: 'Herramientas Interactivas',
      description: 'Calculadoras avanzadas, simuladores CNC y herramientas de control de calidad',
      action: () => setActiveSection('herramientas'),
      gradient: 'from-emerald-500 via-green-600 to-teal-700',
      particles: '⚡',
      stats: '5 Herramientas'
    },
    {
      icon: Award,
      title: 'Centro de Evaluación',
      description: 'Sistema de evaluación inteligente con 9 módulos especializados y retroalimentación',
      action: () => setActiveSection('evaluacion'),
      gradient: 'from-purple-500 via-violet-600 to-purple-700',
      particles: '🏆',
      stats: '9 Evaluaciones'
    },
  ];

  const stats = [
    { icon: BookOpen, value: '16+', label: 'Procesos de Fabricación', color: 'text-blue-400' },
    { icon: Calculator, value: '5', label: 'Herramientas Interactivas', color: 'text-green-400' },
    { icon: Users, value: '7,200+', label: 'Estudiantes Activos', color: 'text-purple-400' },
    { icon: TrendingUp, value: '97%', label: 'Tasa de Éxito', color: 'text-orange-400' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-8 relative"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="text-8xl mb-4 relative">
              🏭
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-tight"
            variants={itemVariants}
          >
            Centro de Aprendizaje de
            <motion.span 
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ingeniería Mecánica
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            variants={itemVariants}
          >
            Domina los procesos de fabricación industrial con contenido técnico de vanguardia, 
            herramientas interactivas de última generación y recursos multimedia especializados para el año 2025.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700">
              <Sparkles className="text-blue-500" size={16} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Contenido Actualizado 2025</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 dark:border-green-700">
              <Zap className="text-green-500" size={16} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Simuladores Avanzados</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 dark:border-purple-700">
              <Target className="text-purple-500" size={16} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Evaluación Inteligente</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Features Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                onClick={feature.action}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 dark:border-gray-700/50 overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Floating Particles */}
                <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-300">
                  {feature.particles}
                </div>

                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <Icon size={32} className="text-white" />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {feature.stats}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Explorar <span className="ml-2">→</span>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div 
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 mb-20 overflow-hidden"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10">
            <motion.h2 
              className="text-3xl font-bold text-white text-center mb-8"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀 Impacto Educativo en Números - 2025
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Icon size={40} className={`${stat.color} mx-auto mb-4`} />
                    <motion.div 
                      className="text-4xl font-black text-white mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Quick Access */}
        <motion.div 
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🚀 Acceso Rápido a Herramientas Populares
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.button
              onClick={() => setActiveSection('herramientas')}
              className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center space-x-6 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center space-x-6">
                <div className="bg-white/20 p-4 rounded-xl">
                  <Wrench size={32} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold mb-2">Simuladores CNC Avanzados</div>
                  <div className="text-sm opacity-90">Mecanizado, forjado y control de calidad con IA</div>
                  <div className="text-xs mt-2 bg-white/20 px-3 py-1 rounded-full inline-block">
                    ⚡ Más Popular
                  </div>
                </div>
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveSection('evaluacion')}
              className="group relative bg-gradient-to-r from-purple-500 to-violet-600 text-white p-8 rounded-2xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 flex items-center space-x-6 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center space-x-6">
                <div className="bg-white/20 p-4 rounded-xl">
                  <Award size={32} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold mb-2">Sistema de Evaluación 2025</div>
                  <div className="text-sm opacity-90">9 módulos especializados con retroalimentación IA</div>
                  <div className="text-xs mt-2 bg-white/20 px-3 py-1 rounded-full inline-block">
                    🎯 Recomendado
                  </div>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;