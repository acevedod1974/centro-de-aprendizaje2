import React, { useState } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  BookOpen,
  Calculator,
  Award,
  Image,
  BarChart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { path: "/", label: "Inicio", icon: BookOpen, color: "text-blue-500" },
  {
    path: "/procesos",
    label: "Procesos",
    icon: BookOpen,
    color: "text-indigo-500",
  },
  {
    path: "/herramientas",
    label: "Herramientas",
    icon: Calculator,
    color: "text-green-500",
  },
  {
    path: "/recursos",
    label: "Recursos",
    icon: Image,
    color: "text-orange-500",
  },
  {
    path: "/evaluacion",
    label: "Evaluación",
    icon: Award,
    color: "text-purple-500",
  },
  // {
  //   path: "/planificador",
  //   label: "Planificador",
  //   icon: Calendar,
  //   color: "text-pink-500",
  // },
  {
    path: "/progreso",
    label: "Progreso",
    icon: BarChart,
    color: "text-cyan-500",
  },
];

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <motion.header
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-blue-200/50 dark:border-blue-800/50 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">⚙️</span>
          <span className="font-bold text-lg hidden sm:inline">
            Centro de Aprendizaje
          </span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-800"
              } ${item.color}`}
            >
              <item.icon size={20} className="mr-2" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
        {/* Theme toggle and mobile menu button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-blue-200/50 dark:border-blue-800/50 px-4 py-2"
          >
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors w-full ${
                  location.pathname === item.path
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-800"
                } ${item.color}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} className="mr-2" />
                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
