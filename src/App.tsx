import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Home from './components/Home';
import ProcessSection from './components/ProcessSection';
import ToolsSection from './components/ToolsSection';
import ResourcesSection from './components/ResourcesSection';
import EvaluationSection from './components/EvaluationSection';
import Footer from './components/Footer';

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
      default:
        return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="min-h-screen">
          {renderSection()}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;