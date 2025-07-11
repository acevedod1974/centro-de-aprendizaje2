import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import Header from "./components/Header";
import Home from "./components/Home";
import ProcessSection from "./components/ProcessSection";
import ToolsSection from "./components/ToolsSection";
import ResourcesSection from "./components/ResourcesSection";
import EvaluationSection from "./components/EvaluationSection";
import ProgressTracker from "./components/ProgressTracker";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthTestPage from "./components/AuthTestPage";

function App() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <ToastProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 transition-colors overflow-x-hidden">
          <Header />
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen"
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/procesos" element={<ProcessSection />} />
                <Route path="/herramientas" element={<ToolsSection />} />
                <Route
                  path="/herramientas/:toolId"
                  element={<ToolsSection />}
                />
                <Route path="/recursos" element={<ResourcesSection />} />
                <Route path="/evaluacion" element={<EvaluationSection />} />
                <Route path="/progreso" element={<ProgressTracker />} />
                <Route path="/auth-test" element={<AuthTestPage />} />
                <Route
                  path="*"
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/30 rounded-2xl shadow-xl p-10 animate-fade-in">
                      <div className="mb-4">
                        <span className="inline-block text-7xl md:text-8xl text-pink-500 dark:text-pink-400 drop-shadow-lg">
                          🚫
                        </span>
                      </div>
                      <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight drop-shadow-sm">
                        404
                      </h2>
                      <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Sección no encontrada
                      </p>
                      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                        Lo sentimos, la sección que buscas no existe o ha sido
                        deshabilitada temporalmente.
                        <br />
                        Por favor, utiliza el menú superior para navegar a otra
                        sección.
                      </p>
                      <a
                        href="/"
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:from-pink-500 hover:to-yellow-500 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        Volver al Inicio
                      </a>
                    </div>
                  }
                />
              </Routes>
            </motion.main>
          </AnimatePresence>
          <Footer />
        </div>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
