import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Info, Play, BookOpen } from 'lucide-react';

const ProcessSection: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('remocion');
  const [selectedProcess, setSelectedProcess] = useState<string | null>('torneado');

  const processCategories = {
    remocion: {
      title: 'Procesos de Remoción de Material',
      icon: '🔧',
      color: 'bg-red-500',
      processes: {
        torneado: {
          name: 'Torneado',
          description: 'Proceso de mecanizado que utiliza una herramienta de corte para remover material de una pieza en rotación.',
          applications: ['Ejes', 'Cilindros', 'Conos', 'Roscas'],
          parameters: ['Velocidad de corte', 'Avance', 'Profundidad de pasada'],
          advantages: ['Alta precisión', 'Buen acabado superficial', 'Versatilidad'],
          image: '🔄'
        },
        fresado: {
          name: 'Fresado',
          description: 'Proceso de mecanizado con herramienta rotativa multifilosa que remueve material.',
          applications: ['Superficies planas', 'Ranuras', 'Perfiles complejos'],
          parameters: ['Velocidad de husillo', 'Avance por diente', 'Profundidad axial'],
          advantages: ['Formas complejas', 'Alta productividad', 'Precisión dimensional'],
          image: '⚙️'
        },
        taladrado: {
          name: 'Taladrado',
          description: 'Proceso para crear agujeros cilíndricos mediante una herramienta rotativa.',
          applications: ['Agujeros pasantes', 'Agujeros ciegos', 'Avellanados'],
          parameters: ['Velocidad de corte', 'Avance', 'Refrigeración'],
          advantages: ['Simplicidad', 'Rapidez', 'Precisión en diámetros'],
          image: '🕳️'
        }
      }
    },
    conformado: {
      title: 'Procesos de Conformado',
      icon: '🔨',
      color: 'bg-blue-500',
      processes: {
        forjado: {
          name: 'Forjado',
          description: 'Proceso de deformación plástica que mejora las propiedades mecánicas del material.',
          applications: ['Bielas', 'Cigüeñales', 'Herramientas', 'Componentes estructurales'],
          parameters: ['Temperatura', 'Fuerza aplicada', 'Velocidad de deformación'],
          advantages: ['Resistencia superior', 'Fibra continua', 'Propiedades isotrópicas'],
          image: '🔨'
        },
        estampado: {
          name: 'Estampado',
          description: 'Proceso de conformado de láminas metálicas mediante matriz y punzón.',
          applications: ['Carrocerías', 'Envases', 'Componentes electrónicos'],
          parameters: ['Fuerza de prensado', 'Velocidad', 'Lubricación'],
          advantages: ['Alta productividad', 'Precisión dimensional', 'Acabado superficial'],
          image: '📋'
        },
        laminado: {
          name: 'Laminado',
          description: 'Reducción de espesor mediante compresión entre rodillos.',
          applications: ['Láminas', 'Perfiles', 'Barras', 'Alambre'],
          parameters: ['Reducción por pasada', 'Temperatura', 'Velocidad de laminado'],
          advantages: ['Producción continua', 'Control dimensional', 'Propiedades mejoradas'],
          image: '📏'
        }
      }
    },
    union: {
      title: 'Procesos de Unión',
      icon: '🔗',
      color: 'bg-green-500',
      processes: {
        soldadura: {
          name: 'Soldadura',
          description: 'Proceso de unión permanente mediante fusión localizada de materiales.',
          applications: ['Estructuras', 'Tuberías', 'Recipientes a presión'],
          parameters: ['Corriente', 'Voltaje', 'Velocidad de soldeo'],
          advantages: ['Unión permanente', 'Resistencia estructural', 'Versatilidad'],
          image: '⚡'
        },
        remachado: {
          name: 'Remachado',
          description: 'Unión mecánica mediante elementos de fijación deformables.',
          applications: ['Estructuras aeronáuticas', 'Puentes', 'Calderas'],
          parameters: ['Diámetro del remache', 'Longitud', 'Espaciamiento'],
          advantages: ['Unión confiable', 'Resistencia a vibración', 'Inspección visual'],
          image: '🔩'
        },
        pegado: {
          name: 'Adhesivos Estructurales',
          description: 'Unión mediante adhesivos de alta resistencia.',
          applications: ['Aeroespacial', 'Automotriz', 'Electrónica'],
          parameters: ['Tipo de adhesivo', 'Tiempo de curado', 'Presión'],
          advantages: ['Distribución uniforme', 'Peso reducido', 'Sellado'],
          image: '🧪'
        }
      }
    },
    moldeo: {
      title: 'Procesos de Moldeo',
      icon: '🏺',
      color: 'bg-purple-500',
      processes: {
        fundicion: {
          name: 'Fundición',
          description: 'Proceso de obtención de piezas mediante colado de metal líquido en moldes.',
          applications: ['Blocks de motor', 'Válvulas', 'Engranajes', 'Arte decorativo'],
          parameters: ['Temperatura de colado', 'Velocidad de llenado', 'Tiempo de solidificación'],
          advantages: ['Formas complejas', 'Tamaños grandes', 'Economía para series'],
          image: '🔥'
        },
        inyeccion: {
          name: 'Inyección de Polímeros',
          description: 'Moldeo de termoplásticos mediante inyección a presión.',
          applications: ['Carcasas', 'Componentes automotrices', 'Envases', 'Juguetes'],
          parameters: ['Temperatura de fusión', 'Presión de inyección', 'Tiempo de ciclo'],
          advantages: ['Alta precisión', 'Ciclos rápidos', 'Acabado excelente'],
          image: '💉'
        },
        sinterizado: {
          name: 'Pulvimetalurgia',
          description: 'Fabricación mediante compactación y sinterizado de polvos metálicos.',
          applications: ['Engranajes', 'Filtros', 'Imanes', 'Contactos eléctricos'],
          parameters: ['Presión de compactación', 'Temperatura de sinterizado', 'Atmósfera'],
          advantages: ['Tolerancias estrechas', 'Propiedades controladas', 'Desperdicio mínimo'],
          image: '⚱️'
        }
      }
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const selectProcess = (process: string) => {
    setSelectedProcess(process);
  };

  const selectedProcessData = Object.values(processCategories)
    .flatMap(category => Object.entries(category.processes))
    .find(([key]) => key === selectedProcess)?.[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          📚 Procesos de Fabricación Industrial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explora los principales procesos manufactureros clasificados por tipo de operación.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Categories Panel */}
        <div className="space-y-4">
          {Object.entries(processCategories).map(([categoryId, category]) => (
            <div key={categoryId} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleCategory(categoryId)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between ${category.color} text-white hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-semibold">{category.title}</span>
                </div>
                {expandedCategory === categoryId ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              
              {expandedCategory === categoryId && (
                <div className="p-4 space-y-2">
                  {Object.entries(category.processes).map(([processId, process]) => (
                    <button
                      key={processId}
                      onClick={() => selectProcess(processId)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedProcess === processId
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{process.image}</span>
                        <span className="font-medium">{process.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Process Detail Panel */}
        <div className="lg:col-span-2">
          {selectedProcessData ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl">{selectedProcessData.image}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProcessData.name}
                  </h2>
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <Info size={16} />
                    <span>Proceso Industrial</span>
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
                        <li key={index} className="text-blue-700 dark:text-blue-300">• {app}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                      ⚙️ Parámetros Clave
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.parameters.map((param, index) => (
                        <li key={index} className="text-green-700 dark:text-green-300">• {param}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    ✅ Ventajas Principales
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedProcessData.advantages.map((advantage, index) => (
                      <li key={index} className="text-yellow-700 dark:text-yellow-300 flex items-center space-x-2">
                        <span>•</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Play size={18} />
                  <span>Ver Simulación</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <BookOpen size={18} />
                  <span>Manual Técnico</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Selecciona un Proceso
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Elige un proceso de fabricación de la lista para ver información detallada.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;