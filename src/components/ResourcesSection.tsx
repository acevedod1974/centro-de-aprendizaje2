import React, { useState } from 'react';
import { FileText, Image, Video, Download, ExternalLink, Search } from 'lucide-react';

const ResourcesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Manual Técnico de Procesos de Fabricación',
      description: 'Guía completa con especificaciones técnicas, parámetros y mejores prácticas',
      type: 'pdf',
      category: 'manual',
      size: '15.2 MB',
      pages: 324,
      updated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Galería de Procesos de Mecanizado',
      description: 'Imágenes técnicas detalladas de operaciones de torneado, fresado y taladrado',
      type: 'gallery',
      category: 'images',
      items: 45,
      updated: '2024-01-20'
    },
    {
      id: 3,
      title: 'Procesos de Soldadura Industrial',
      description: 'Documentación especializada en soldadura MIG, TIG y por arco',
      type: 'pdf',
      category: 'soldadura',
      size: '8.7 MB',
      pages: 156,
      updated: '2024-01-18'
    },
    {
      id: 4,
      title: 'Videos Demostrativos de Forjado',
      description: 'Serie de videos educativos sobre técnicas de forjado libre y en matriz',
      type: 'video',
      category: 'forjado',
      duration: '2h 15min',
      updated: '2024-01-22'
    },
    {
      id: 5,
      title: 'Tablas de Velocidades de Corte',
      description: 'Referencias rápidas para diferentes materiales y herramientas',
      type: 'pdf',
      category: 'referencias',
      size: '2.1 MB',
      pages: 28,
      updated: '2024-01-10'
    },
    {
      id: 6,
      title: 'Procesos de Conformado de Metales',
      description: 'Imágenes y diagramas de procesos de laminado, estampado y trefilado',
      type: 'gallery',
      category: 'images',
      items: 32,
      updated: '2024-01-25'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos los Recursos', icon: '📚' },
    { id: 'manual', name: 'Manuales Técnicos', icon: '📖' },
    { id: 'images', name: 'Galerías de Imágenes', icon: '🖼️' },
    { id: 'soldadura', name: 'Soldadura', icon: '⚡' },
    { id: 'forjado', name: 'Forjado', icon: '🔨' },
    { id: 'referencias', name: 'Referencias', icon: '📋' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText size={24} className="text-red-500" />;
      case 'gallery': return <Image size={24} className="text-blue-500" />;
      case 'video': return <Video size={24} className="text-green-500" />;
      default: return <FileText size={24} className="text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'gallery': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'video': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          📚 Recursos Multimedia
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Accede a manuales técnicos, galerías de imágenes y recursos especializados.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar recursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(resource.type)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(resource.updated).toLocaleDateString('es-ES')}
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {resource.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                {resource.size && (
                  <span>📄 {resource.pages} páginas • {resource.size}</span>
                )}
                {resource.items && (
                  <span>🖼️ {resource.items} imágenes</span>
                )}
                {resource.duration && (
                  <span>🎥 {resource.duration}</span>
                )}
              </div>

              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 justify-center">
                  <Download size={16} />
                  <span>Descargar</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <ExternalLink size={16} />
                  <span>Ver</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No se encontraron recursos
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Intenta con diferentes términos de búsqueda o categorías.
          </p>
        </div>
      )}

      {/* Quick Access Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🚀 Acceso Rápido a Recursos Populares
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl mb-3">📖</div>
            <h4 className="font-semibold mb-2">Manual Principal</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Guía completa de procesos de fabricación
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Abrir Manual
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl mb-3">📋</div>
            <h4 className="font-semibold mb-2">Tablas de Referencia</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Velocidades de corte y parámetros
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Ver Tablas
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl mb-3">🖼️</div>
            <h4 className="font-semibold mb-2">Galería Técnica</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Imágenes de procesos industriales
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Ver Galería
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;