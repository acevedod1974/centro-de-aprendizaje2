import React, { useEffect, useState } from "react";
import {
  FileText,
  Image,
  Video,
  Download,
  ExternalLink,
  Search,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { Resource } from "./resourcesData";

const ResourcesSection: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<
    { id: string; name: string; icon: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResources() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        setError(
          "No se pudieron cargar los recursos. Intenta de nuevo más tarde."
        );
        setResources([]);
      } else {
        const mapped = (data || []).map(
          (r: Resource & { downloadUrl?: string; viewUrl?: string }) => ({
            ...r,
            download_url: r.download_url || r.downloadUrl,
            view_url: r.view_url || r.viewUrl,
          })
        ) as Resource[];
        console.log("Supabase connection OK. Resources:", mapped);
        setResources(mapped);
      }
      setLoading(false);
    }
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("resource_categories")
        .select("id, name, icon")
        .order("id", { ascending: true });
      if (error) {
        console.error(
          "No se pudieron cargar las categorías de recursos.",
          error
        );
        setCategories([]);
      } else {
        setCategories(data || []);
        console.log("Supabase connection OK. Resource categories:", data);
      }
    }
    fetchResources();
    fetchCategories();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText size={24} className="text-red-500" />;
      case "gallery":
        return <Image size={24} className="text-blue-500" />;
      case "video":
        return <Video size={24} className="text-green-500" />;
      default:
        return <FileText size={24} className="text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "gallery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "video":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
        <span className="text-lg text-gray-700 dark:text-gray-200">
          Cargando recursos...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
          {error}
        </h3>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Category Sidebar */}
        <aside className="w-full md:w-1/4 mb-4 md:mb-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              📚 Recursos Multimedia
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Accede a manuales técnicos, galerías de imágenes y recursos
              especializados.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                key="all"
                onClick={() => setSelectedCategory("all")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span>📚</span>
                <span className="font-medium">Todos los Recursos</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
        {/* Resource List */}
        <section className="w-full md:w-3/4">
          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(resource.type)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          resource.type
                        )}`}
                      >
                        {resource.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(resource.updated).toLocaleDateString("es-ES")}
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
                      <span>
                        📄 {resource.pages} páginas • {resource.size}
                      </span>
                    )}
                    {resource.items && (
                      <span>🖼️ {resource.items} imágenes</span>
                    )}
                    {resource.duration && <span>🎥 {resource.duration}</span>}
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={resource.download_url || resource.view_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                      aria-label={`Descargar ${resource.title}`}
                      tabIndex={0}
                    >
                      <Download size={16} />
                      <span>Descargar</span>
                    </a>
                    <a
                      href={resource.view_url || resource.download_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                      aria-label={`Ver ${resource.title}`}
                      tabIndex={0}
                    >
                      <ExternalLink size={16} />
                      <span>Ver</span>
                    </a>
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
        </section>
      </div>
    </div>
  );
};

export default ResourcesSection;
