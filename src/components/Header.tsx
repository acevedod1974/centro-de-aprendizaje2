import React, { useState } from 'react';
import { Moon, Sun, Menu, X, BookOpen, Calculator, Award, Image, Sparkles, Calendar, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { id: 'inicio', label: 'Inicio', icon: BookOpen, color: 'text-blue-500' },
    { id: 'procesos', label: 'Procesos', icon: BookOpen, color: 'text-indigo-500' },
    { id: 'herramientas', label: 'Herramientas', icon: Calculator, color: 'text-green-500' },
    { id: 'recursos', label: 'Recursos', icon: Image, color: 'text-orange-500' },
    { id: 'evaluacion', label: 'Evaluación', icon: Award, color: 'text-purple-500' },
    { id: 'planificador', label: 'Planificador', icon: Calendar, color: 'text-pink-500' },
    { id: 'progreso', label: 'Progreso', icon: BarChart, color: 'text-cyan-500' },
  ];

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked, current isDark:', isDark);
    toggleTheme();
  };

  return (
    <motion.header 
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-blue-200/50 dark:border-blue-800/50 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <motion.div 
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => setActiveSection('inicio')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-3 rounded-2xl shadow-lg">
                <span className="text-3xl">⚙️</span>
              </div>
              <motion.div
                className="absolute -top-1 -right-1 text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Centro de Aprendizaje
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                Ingeniería Mecánica • 2025
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center space-x-2">
                    <Icon size={20} className={isActive ? 'text-white' : item.color} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute -top-1 -right-1 text-xs"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={handleThemeToggle}
              className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun size={22} className="text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={22} className="text-blue-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} className="text-gray-700 dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} className="text-gray-700 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="space-y-3">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-4 w-full px-6 py-4 rounded-2xl transition-all font-semibold ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={24} className={isActive ? 'text-white' : item.color} />
                      <span className="text-lg">{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto text-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ✨
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;