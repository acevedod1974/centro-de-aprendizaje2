import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Home from './components/Home';
import ProcessSection from './components/ProcessSection';
import ToolsSection from './components/ToolsSection';
import ResourcesSection from './components/ResourcesSection';
import EvaluationSection from './components/EvaluationSection';
import StudyPlanner from './components/StudyPlanner';
import ProgressTracker from './components/ProgressTracker';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio':
        return <Home setActiveSection={setActiveSection} />;
      case 'procesos':
        return <ProcessSection />;
      case 'herramientas':
        return <ToolsSection />;
      case 'recursos':
        return <ResourcesSection />;
      case 'evaluacion':
        return <EvaluationSection />;
      case 'planificador':
        return <StudyPlanner />;
      case 'progreso':
        return <ProgressTracker />;
      default:
        return <Home setActiveSection={setActiveSection} />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 transition-colors">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={activeSection}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen"
          >
            {renderSection()}
          </motion.main>
        </AnimatePresence>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;