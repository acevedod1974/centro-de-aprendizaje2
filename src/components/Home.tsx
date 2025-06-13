import React from 'react';
import { Wrench, Calculator, BookOpen, Award, TrendingUp, Users } from 'lucide-react';

interface HomeProps {
  setActiveSection: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Procesos de Fabricación',
      description: 'Aprende sobre procesos primarios, secundarios y de acabado',
      action: () => setActiveSection('procesos'),
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calculator,
      title: 'Herramientas Interactivas',
      description: 'Calculadoras y simuladores para aplicar conocimientos',
      action: () => setActiveSection('herramientas'),
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: Award,
      title: 'Evaluación',
      description: 'Pon a prueba tus conocimientos con cuestionarios',
      action: () => setActiveSection('evaluacion'),
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  const stats = [
    { icon: BookOpen, value: '15+', label: 'Procesos de Fabricación' },
    { icon: Calculator, value: '8', label: 'Herramientas Interactivas' },
    { icon: Users, value: '1000+', label: 'Estudiantes Activos' },
    { icon: TrendingUp, value: '95%', label: 'Tasa de Éxito' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <span className="text-6xl">🏭</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Centro de Aprendizaje de
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {' '}Ingeniería Mecánica
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Domina los procesos de fabricación industrial con contenido técnico actualizado, 
          herramientas interactivas y recursos multimedia especializados.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              onClick={feature.action}
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                Explorar →
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon size={32} className="text-blue-200 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🚀 Acceso Rápido
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setActiveSection('herramientas')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center space-x-4"
          >
            <Wrench size={24} />
            <div className="text-left">
              <div className="font-bold">Calculadora de Velocidad de Corte</div>
              <div className="text-sm opacity-90">Optimiza tus parámetros de mecanizado</div>
            </div>
          </button>
          <button
            onClick={() => setActiveSection('evaluacion')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all flex items-center space-x-4"
          >
            <Award size={24} />
            <div className="text-left">
              <div className="font-bold">Quiz de Soldadura</div>
              <div className="text-sm opacity-90">Evalúa tus conocimientos técnicos</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;