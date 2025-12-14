import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  Info,
  Play,
  BookOpen,
  Settings,
  Zap,
} from "lucide-react";
import { supabase } from "../supabaseClient";

// Define types for process and category
interface ProcessData {
  id: number;
  category: string;
  name: string;
  description: string;
  applications: string[];
  parameters: string[];
  advantages: string[];
  disadvantages: string[];
  materials: string[];
  tools: string[];
  image: string;
  simulator: string | null;
}
interface ResourceManual {
  id: number;
  title: string;
  download_url?: string;
  view_url?: string;
  process_name?: string;
}
interface Category {
  title: string;
  icon: string;
  color: string;
  processes: Record<string, ProcessData>;
}
interface ToolResource {
  id: number;
  title: string;
  type: string; // 'calculator' or 'simulator'
  process_name: string;
  url: string;
  icon?: string;
  available?: boolean;
}

const ProcessSection: React.FC = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "remocion"
  );
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [processCategories, setProcessCategories] = useState<
    Record<string, Category>
  >({});
  const [manualResource, setManualResource] = useState<ResourceManual | null>(
    null
  );
  const [toolResources, setToolResources] = useState<ToolResource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to parse string fields to array
  const parseList = (str: string | null) =>
    str
      ? str
          .split(";")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  useEffect(() => {
    async function fetchProcessesAndCategories() {
      setLoading(true);
      setError(null);
      // Fetch categories from Supabase
      const { data: catData, error: catError } = await supabase
        .from("resource_categories")
        .select("id, name, icon")
        .order("id");
      if (catError) {
        setError(
          "No se pudieron cargar las categorías. Intenta de nuevo más tarde."
        );
        setProcessCategories({});
        setLoading(false);
        return;
      }
      // Fetch processes from Supabase
      const { data, error } = await supabase
        .from("processes")
        .select("*")
        .order("id");
      if (error) {
        setError(
          "No se pudieron cargar los procesos. Intenta de nuevo más tarde."
        );
        setProcessCategories({});
        setLoading(false);
        return;
      }
      // Log para verificar conexión y datos
      console.log("Supabase connection OK. Data:", data);
      // Build a map of category metadata from DB
      const categoryMeta: Record<
        string,
        { title: string; icon: string; color: string }
      > = {};
      (catData || []).forEach((cat) => {
        categoryMeta[cat.id] = {
          title: cat.name,
          icon: cat.icon,
          color: "bg-blue-500", // Default color, can be extended with a color field in DB
        };
      });
      // Agrupa por categoría y estructura igual que antes
      const grouped: Record<string, Category> = {};
      data.forEach((proc: ProcessData) => {
        if (!grouped[proc.category]) {
          const cat = categoryMeta[proc.category] || {
            title: proc.category,
            icon: "❓",
            color: "bg-gray-400",
          };
          grouped[proc.category] = {
            title: cat.title,
            icon: cat.icon,
            color: cat.color,
            processes: {},
          };
        }
        grouped[proc.category].processes[proc.name.toLowerCase()] = {
          ...proc,
          applications: parseList(proc.applications as unknown as string),
          parameters: parseList(proc.parameters as unknown as string),
          advantages: parseList(proc.advantages as unknown as string),
          disadvantages: parseList(proc.disadvantages as unknown as string),
          materials: parseList(proc.materials as unknown as string),
          tools: parseList(proc.tools as unknown as string),
        };
      });
      setProcessCategories(grouped);
      // Selecciona el primer proceso por defecto
      if (!selectedProcess) {
        const firstCat = Object.keys(grouped)[0];
        if (firstCat) {
          const firstProc = Object.keys(grouped[firstCat].processes)[0];
          setSelectedProcess(firstProc);
        }
      }
      setLoading(false);
    }
    fetchProcessesAndCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function fetchManual() {
      if (!selectedProcess) {
        setManualResource(null);
        return;
      }
      const processName = (selectedProcess || "").trim();
      console.log("Fetching manual for process:", processName);
      const { data, error } = await supabase
        .from("resources")
        .select("id, title, download_url, view_url")
        .eq("type", "pdf")
        .limit(1)
        .maybeSingle();
      if (error) {
        setManualResource(null);
        console.log("No manual found for process:", processName, error);
      } else {
        setManualResource(data);
        console.log("Manual resource for process:", processName, data);
      }
    }
    async function fetchTools() {
      if (!selectedProcess) {
        setToolResources([]);
        return;
      }
      const { data, error } = await supabase
        .from("tools")
        .select("id, title, type, url, icon, available")
        .eq("available", true);
      if (error) {
        setToolResources([]);
        console.log("No tools found for process:", selectedProcess);
      } else {
        setToolResources(data || []);
        console.log("Tools for process:", selectedProcess, data);
      }
    }
    fetchManual();
    fetchTools();
  }, [selectedProcess]);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const selectProcess = (process: string) => {
    setSelectedProcess(process);
  };

  const selectedProcessData = Object.values(processCategories)
    .flatMap((category) => Object.entries(category.processes))
    .find(([key]) => key === selectedProcess)?.[1];

  // SVG diagram mapping for each process
  const processSVGs: Record<string, JSX.Element> = {
    torneado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Torneado"
        role="img"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="#e5e7eb"
          stroke="#1e293b"
          strokeWidth="2"
        />
        <rect x="20" y="10" width="8" height="28" rx="2" fill="#3b82f6" />
        <rect x="28" y="22" width="10" height="4" rx="2" fill="#f59e42" />
      </svg>
    ),
    fresado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Fresado"
        role="img"
      >
        <rect x="8" y="32" width="32" height="8" rx="2" fill="#eab308" />
        <circle cx="24" cy="24" r="10" fill="#3b82f6" />
        <rect x="22" y="10" width="4" height="14" fill="#1e293b" />
      </svg>
    ),
    taladrado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Taladrado"
        role="img"
      >
        <rect x="20" y="8" width="8" height="32" rx="4" fill="#6366f1" />
        <circle cx="24" cy="40" r="4" fill="#f59e42" />
      </svg>
    ),
    rectificado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Rectificado"
        role="img"
      >
        <rect x="10" y="20" width="28" height="8" rx="4" fill="#a21caf" />
        <circle cx="14" cy="24" r="4" fill="#f59e42" />
        <circle cx="34" cy="24" r="4" fill="#f59e42" />
      </svg>
    ),
    forjado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Forjado"
        role="img"
      >
        <rect x="18" y="10" width="12" height="28" rx="4" fill="#2563eb" />
        <rect x="10" y="36" width="28" height="4" fill="#f59e42" />
      </svg>
    ),
    estampado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Estampado"
        role="img"
      >
        <rect x="12" y="12" width="24" height="24" rx="4" fill="#22c55e" />
        <rect x="20" y="8" width="8" height="8" fill="#f59e42" />
      </svg>
    ),
    laminado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Laminado"
        role="img"
      >
        <rect x="8" y="20" width="32" height="8" rx="4" fill="#f59e42" />
        <rect x="8" y="28" width="32" height="4" fill="#a21caf" />
      </svg>
    ),
    extrusión: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Extrusión"
        role="img"
      >
        <rect x="10" y="20" width="28" height="8" rx="4" fill="#f59e42" />
        <rect x="36" y="16" width="4" height="16" fill="#2563eb" />
      </svg>
    ),
    soldadura: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Soldadura"
        role="img"
      >
        <rect x="12" y="28" width="24" height="8" rx="4" fill="#f59e42" />
        <rect x="22" y="12" width="4" height="16" fill="#2563eb" />
        <polygon points="24,8 28,16 20,16" fill="#fbbf24" />
      </svg>
    ),
    remachado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Remachado"
        role="img"
      >
        <circle cx="24" cy="24" r="8" fill="#f59e42" />
        <rect x="20" y="8" width="8" height="16" fill="#a21caf" />
      </svg>
    ),
    pegado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Adhesivos"
        role="img"
      >
        <rect x="12" y="20" width="24" height="8" rx="4" fill="#22c55e" />
        <rect x="20" y="28" width="8" height="8" fill="#f59e42" />
      </svg>
    ),
    brazing: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Brazing"
        role="img"
      >
        <rect x="16" y="28" width="16" height="8" rx="4" fill="#f59e42" />
        <ellipse cx="24" cy="24" rx="8" ry="4" fill="#a21caf" />
      </svg>
    ),
    fundicion: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Fundición"
        role="img"
      >
        <rect x="14" y="28" width="20" height="8" rx="4" fill="#f59e42" />
        <ellipse cx="24" cy="24" rx="10" ry="6" fill="#a21caf" />
      </svg>
    ),
    inyeccion: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Inyección"
        role="img"
      >
        <rect x="18" y="12" width="12" height="24" rx="4" fill="#6366f1" />
        <rect x="14" y="36" width="20" height="4" fill="#f59e42" />
      </svg>
    ),
    sinterizado: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Pulvimetalurgia"
        role="img"
      >
        <circle cx="24" cy="24" r="10" fill="#a21caf" />
        <circle cx="24" cy="24" r="6" fill="#f59e42" />
      </svg>
    ),
    moldeo_arena: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-label="Diagrama de Moldeo en Arena"
        role="img"
      >
        <rect x="10" y="28" width="28" height="8" rx="4" fill="#f59e42" />
        <ellipse cx="24" cy="24" rx="12" ry="6" fill="#a21caf" />
      </svg>
    ),
  };

  // Helper for accessible tooltips and SVG diagrams
  const getProcessImage = (process: ProcessData, processId?: string) => (
    <span
      className="text-2xl flex items-center justify-center"
      title={process.name + " (diagrama)"}
      aria-label={process.name + " (diagrama)"}
      tabIndex={0}
    >
      {processSVGs[processId || ""] || process.image}
    </span>
  );

  // Loading and error UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
        <span className="text-lg text-gray-700 dark:text-gray-200">
          Cargando procesos...
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category List (sidebar on desktop, top on mobile) */}
        <div className="col-span-1">
          {Object.entries(processCategories).map(([categoryId, category]) => (
            <div
              key={categoryId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(categoryId)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between ${category.color} text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-400 focus:z-10 shadow-sm hover:shadow-lg active:scale-[0.98]`}
                aria-label={`Expandir/cerrar categoría ${category.title}`}
                tabIndex={0}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" aria-hidden="true">
                    {category.icon}
                  </span>
                  <span className="font-semibold">{category.title}</span>
                </div>
                {expandedCategory === categoryId ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </button>
              {/* Animate expand/collapse */}
              <div
                style={{
                  transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  maxHeight: expandedCategory === categoryId ? 1000 : 0,
                  overflow: "hidden",
                }}
              >
                {expandedCategory === categoryId && (
                  <div className="p-4 space-y-2">
                    {Object.entries(category.processes).map(
                      ([processId, process]) => (
                        <button
                          key={processId}
                          onClick={() => selectProcess(processId)}
                          className={`w-full text-left p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:z-10 shadow-sm hover:shadow-lg active:scale-[0.98] ${
                            selectedProcess === processId
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          aria-label={`Seleccionar proceso ${process.name}`}
                          tabIndex={0}
                        >
                          <div className="flex items-center space-x-3">
                            {getProcessImage(process)}
                            <span className="font-medium">{process.name}</span>
                            {process.simulator && (
                              <Zap
                                size={16}
                                className="text-blue-500"
                                title="Simulador disponible"
                              />
                            )}
                          </div>
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Process List */}
        <div className="col-span-2">
          {selectedProcessData ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-fade-in-up border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center space-x-4 mb-6">
                {getProcessImage(selectedProcessData, selectedProcess)}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProcessData.name}
                  </h2>
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <Info size={16} />
                    <span>Proceso Industrial</span>
                    {selectedProcessData.simulator && (
                      <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-xs">
                        Simulador disponible
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  <BookOpen size={20} />
                  <span>Descripción</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedProcessData.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                      🎯 Aplicaciones Principales
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.applications.map((app, index) => (
                        <li
                          key={index}
                          className="text-blue-700 dark:text-blue-300"
                        >
                          • {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                      ⚙️ Parámetros Clave
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.parameters.map((param, index) => (
                        <li
                          key={index}
                          className="text-green-700 dark:text-green-300"
                        >
                          • {param}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                      ✅ Ventajas
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.advantages.map(
                        (advantage, index) => (
                          <li
                            key={index}
                            className="text-yellow-700 dark:text-yellow-300"
                          >
                            • {advantage}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">
                      ⚠️ Limitaciones
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.disadvantages.map(
                        (disadvantage, index) => (
                          <li
                            key={index}
                            className="text-red-700 dark:text-red-300"
                          >
                            • {disadvantage}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                      🔧 Materiales Típicos
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.materials.map((material, index) => (
                        <li
                          key={index}
                          className="text-purple-700 dark:text-purple-300"
                        >
                          • {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                      🛠️ Herramientas y Equipos
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.tools.map((tool, index) => (
                        <li
                          key={index}
                          className="text-indigo-700 dark:text-indigo-300"
                        >
                          • {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {toolResources
                  .filter((tool) => tool.type === "simulator")
                  .map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        navigate(tool.url);
                      }}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:z-10 shadow-sm hover:shadow-lg active:scale-[0.98]"
                      aria-label={`Abrir ${tool.title}`}
                      tabIndex={0}
                    >
                      <Play size={18} />
                      <span>{tool.title}</span>
                    </button>
                  ))}
                {manualResource ? (
                  <a
                    href={
                      manualResource.download_url ||
                      manualResource.view_url ||
                      "#"
                    }
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:z-10 shadow-sm hover:shadow-lg active:scale-[0.98]"
                    aria-label="Abrir manual técnico"
                    tabIndex={0}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen size={18} />
                    <span>{manualResource.title || "Manual Técnico"}</span>
                  </a>
                ) : (
                  <a
                    href={`/manuales/${selectedProcess}.pdf`}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:z-10 shadow-sm hover:shadow-lg active:scale-[0.98]"
                    aria-label="Abrir manual técnico"
                    tabIndex={0}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen size={18} />
                    <span>Manual Técnico</span>
                  </a>
                )}
                {toolResources
                  .filter((tool) => tool.type === "calculator")
                  .map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.url}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:z-10 shadow-sm hover:shadow-lg active:scale-[0.98]"
                      aria-label={`Abrir ${tool.title}`}
                      tabIndex={0}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Settings size={18} />
                      <span>{tool.title}</span>
                    </a>
                  ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center animate-fade-in-up">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Selecciona un Proceso
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Elige un proceso de fabricación de la lista para ver información
                técnica detallada, aplicaciones industriales y herramientas
                disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
