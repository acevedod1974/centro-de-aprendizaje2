import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Info, Play, BookOpen, Settings, Zap } from 'lucide-react';

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
          description: 'Proceso de mecanizado que utiliza una herramienta de corte para remover material de una pieza en rotación, creando superficies cilíndricas, cónicas y planas.',
          applications: ['Ejes de transmisión', 'Cilindros hidráulicos', 'Conos de precisión', 'Roscas métricas y especiales'],
          parameters: ['Velocidad de corte (Vc)', 'Avance por revolución (f)', 'Profundidad de pasada (ap)', 'Ángulo de ataque'],
          advantages: ['Alta precisión dimensional (±0.01mm)', 'Excelente acabado superficial (Ra 0.8-3.2μm)', 'Versatilidad en geometrías', 'Productividad elevada'],
          disadvantages: ['Limitado a piezas de revolución', 'Requiere sujeción rígida', 'Desgaste de herramientas'],
          materials: ['Aceros al carbono', 'Aceros inoxidables', 'Aleaciones de aluminio', 'Latón y bronce'],
          tools: ['Plaquitas de carburo', 'Herramientas de acero rápido', 'Cerámicas', 'Diamante PCD'],
          image: '🔄',
          simulator: 'mecanizado-simulator'
        },
        fresado: {
          name: 'Fresado',
          description: 'Proceso de mecanizado con herramienta rotativa multifilosa que remueve material mediante movimientos de avance, permitiendo crear formas complejas.',
          applications: ['Superficies planas y perfiladas', 'Ranuras y chaveteros', 'Engranajes', 'Moldes y matrices'],
          parameters: ['Velocidad de husillo (n)', 'Avance por diente (fz)', 'Profundidad axial (ap)', 'Profundidad radial (ae)'],
          advantages: ['Formas geométricas complejas', 'Alta productividad', 'Precisión dimensional excelente', 'Acabados diversos'],
          disadvantages: ['Mayor complejidad de sujeción', 'Vibraciones en voladizo', 'Costo de herramientas'],
          materials: ['Aceros templados', 'Aleaciones ligeras', 'Materiales compuestos', 'Polímeros técnicos'],
          tools: ['Fresas de carburo', 'Fresas de acero rápido', 'Fresas de diamante', 'Fresas cerámicas'],
          image: '⚙️',
          simulator: 'mecanizado-simulator'
        },
        taladrado: {
          name: 'Taladrado',
          description: 'Proceso para crear agujeros cilíndricos mediante una herramienta rotativa con movimiento de avance axial.',
          applications: ['Agujeros pasantes y ciegos', 'Avellanados y escariados', 'Roscado interior', 'Perforaciones de precisión'],
          parameters: ['Velocidad de corte', 'Avance por revolución', 'Refrigeración', 'Ángulo de punta'],
          advantages: ['Simplicidad operativa', 'Rapidez de ejecución', 'Precisión en diámetros', 'Bajo costo'],
          disadvantages: ['Limitado a geometrías circulares', 'Evacuación de viruta', 'Desgaste en punta'],
          materials: ['Aceros de construcción', 'Fundiciones', 'Aleaciones no ferrosas', 'Materiales compuestos'],
          tools: ['Brocas helicoidales', 'Brocas de centrar', 'Escariadores', 'Machos de roscar'],
          image: '🕳️',
          simulator: null
        },
        rectificado: {
          name: 'Rectificado',
          description: 'Proceso de acabado que utiliza granos abrasivos para obtener tolerancias muy estrechas y acabados superficiales excepcionales.',
          applications: ['Superficies de precisión', 'Rodamientos', 'Herramientas de corte', 'Calibres y patrones'],
          parameters: ['Velocidad de muela', 'Avance de mesa', 'Profundidad de pasada', 'Refrigeración'],
          advantages: ['Tolerancias muy estrechas (±0.002mm)', 'Acabado superficial superior (Ra 0.1-0.8μm)', 'Materiales duros', 'Corrección geométrica'],
          disadvantages: ['Baja velocidad de remoción', 'Costo elevado', 'Requiere balanceado', 'Desgaste de muela'],
          materials: ['Aceros templados', 'Carburos cementados', 'Cerámicas técnicas', 'Materiales endurecidos'],
          tools: ['Muelas de óxido de aluminio', 'Muelas de carburo de silicio', 'Muelas de diamante', 'Muelas CBN'],
          image: '💎',
          simulator: null
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
          description: 'Proceso de deformación plástica que mejora las propiedades mecánicas del material mediante aplicación de fuerzas compresivas.',
          applications: ['Bielas de motor', 'Cigüeñales', 'Herramientas manuales', 'Componentes aeroespaciales'],
          parameters: ['Temperatura de forja', 'Fuerza aplicada', 'Velocidad de deformación', 'Reducción por pasada'],
          advantages: ['Resistencia mecánica superior', 'Fibra metálica continua', 'Propiedades isotrópicas', 'Eliminación de porosidad'],
          disadvantages: ['Requiere altas temperaturas', 'Equipos de gran potencia', 'Limitaciones geométricas', 'Oxidación superficial'],
          materials: ['Aceros al carbono', 'Aceros aleados', 'Aleaciones de aluminio', 'Superaleaciones'],
          tools: ['Matrices cerradas', 'Estampas', 'Yunques', 'Prensas hidráulicas'],
          image: '🔨',
          simulator: 'forjado-simulator'
        },
        estampado: {
          name: 'Estampado',
          description: 'Proceso de conformado de láminas metálicas mediante matriz y punzón para obtener formas tridimensionales.',
          applications: ['Carrocerías automotrices', 'Envases metálicos', 'Componentes electrónicos', 'Utensilios domésticos'],
          parameters: ['Fuerza de prensado', 'Velocidad de conformado', 'Lubricación', 'Radio de curvatura'],
          advantages: ['Alta productividad', 'Precisión dimensional', 'Acabado superficial', 'Automatización'],
          disadvantages: ['Costo de herramental', 'Limitaciones de espesor', 'Retorno elástico', 'Defectos superficiales'],
          materials: ['Aceros de bajo carbono', 'Aleaciones de aluminio', 'Latón', 'Aceros inoxidables'],
          tools: ['Matrices progresivas', 'Punzones', 'Prensas mecánicas', 'Sistemas de alimentación'],
          image: '📋',
          simulator: null
        },
        laminado: {
          name: 'Laminado',
          description: 'Reducción de espesor mediante compresión entre rodillos, proceso fundamental en la industria siderúrgica.',
          applications: ['Láminas y chapas', 'Perfiles estructurales', 'Barras y varillas', 'Alambre'],
          parameters: ['Reducción por pasada', 'Temperatura de laminado', 'Velocidad de laminado', 'Tensión de bobinado'],
          advantages: ['Producción continua', 'Control dimensional', 'Propiedades mejoradas', 'Economía de escala'],
          disadvantages: ['Inversión inicial alta', 'Limitaciones geométricas', 'Defectos superficiales', 'Tensiones residuales'],
          materials: ['Aceros al carbono', 'Aceros inoxidables', 'Aleaciones de aluminio', 'Cobre y aleaciones'],
          tools: ['Rodillos de trabajo', 'Rodillos de apoyo', 'Guías laterales', 'Sistemas de refrigeración'],
          image: '📏',
          simulator: null
        },
        extrusión: {
          name: 'Extrusión',
          description: 'Proceso de conformado que fuerza el material a través de una matriz para obtener perfiles de sección constante.',
          applications: ['Perfiles arquitectónicos', 'Tubos y conductos', 'Barras de sección especial', 'Componentes automotrices'],
          parameters: ['Presión de extrusión', 'Temperatura del tocho', 'Velocidad de extrusión', 'Relación de extrusión'],
          advantages: ['Perfiles complejos', 'Tolerancias estrechas', 'Acabado superficial', 'Propiedades uniformes'],
          disadvantages: ['Costo de matrices', 'Limitaciones de longitud', 'Defectos internos', 'Residuos de proceso'],
          materials: ['Aleaciones de aluminio', 'Aleaciones de magnesio', 'Polímeros termoplásticos', 'Aleaciones de cobre'],
          tools: ['Matrices de extrusión', 'Contenedores', 'Prensas hidráulicas', 'Sistemas de calentamiento'],
          image: '🔀',
          simulator: null
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
          description: 'Proceso de unión permanente mediante fusión localizada de materiales, creando una continuidad metalúrgica.',
          applications: ['Estructuras metálicas', 'Tuberías industriales', 'Recipientes a presión', 'Construcción naval'],
          parameters: ['Corriente de soldadura', 'Voltaje de arco', 'Velocidad de soldeo', 'Gas de protección'],
          advantages: ['Unión permanente', 'Resistencia estructural', 'Versatilidad de aplicación', 'Automatización posible'],
          disadvantages: ['Zona afectada térmicamente', 'Tensiones residuales', 'Defectos de soldadura', 'Requiere personal calificado'],
          materials: ['Aceros al carbono', 'Aceros inoxidables', 'Aleaciones de aluminio', 'Aleaciones de níquel'],
          tools: ['Electrodos revestidos', 'Alambre MIG/MAG', 'Varillas TIG', 'Equipos de soldadura'],
          image: '⚡',
          simulator: null
        },
        remachado: {
          name: 'Remachado',
          description: 'Unión mecánica mediante elementos de fijación deformables que se expanden para crear la unión.',
          applications: ['Estructuras aeronáuticas', 'Puentes metálicos', 'Calderas industriales', 'Construcción naval'],
          parameters: ['Diámetro del remache', 'Longitud de agarre', 'Espaciamiento', 'Fuerza de remachado'],
          advantages: ['Unión confiable', 'Resistencia a vibración', 'Inspección visual', 'No requiere energía'],
          disadvantages: ['Concentración de tensiones', 'Peso adicional', 'Perforación previa', 'Acceso bilateral'],
          materials: ['Acero dulce', 'Aleaciones de aluminio', 'Acero inoxidable', 'Aleaciones de cobre'],
          tools: ['Remachadoras neumáticas', 'Remaches sólidos', 'Remaches ciegos', 'Matrices de conformado'],
          image: '🔩',
          simulator: null
        },
        pegado: {
          name: 'Adhesivos Estructurales',
          description: 'Unión mediante adhesivos de alta resistencia que crean enlaces químicos entre superficies.',
          applications: ['Industria aeroespacial', 'Sector automotriz', 'Electrónica', 'Construcción'],
          parameters: ['Tipo de adhesivo', 'Tiempo de curado', 'Presión de contacto', 'Temperatura de curado'],
          advantages: ['Distribución uniforme de tensiones', 'Peso reducido', 'Sellado hermético', 'Aislamiento eléctrico'],
          disadvantages: ['Sensibilidad ambiental', 'Tiempo de curado', 'Preparación superficial', 'Durabilidad limitada'],
          materials: ['Materiales compuestos', 'Aleaciones ligeras', 'Polímeros', 'Vidrio y cerámicas'],
          tools: ['Adhesivos epoxi', 'Adhesivos acrílicos', 'Sistemas de curado', 'Equipos de aplicación'],
          image: '🧪',
          simulator: null
        },
        brazing: {
          name: 'Soldadura Fuerte (Brazing)',
          description: 'Proceso de unión que utiliza un metal de aporte que funde a temperatura inferior a la del material base.',
          applications: ['Intercambiadores de calor', 'Herramientas de corte', 'Componentes electrónicos', 'Joyería'],
          parameters: ['Temperatura de brazing', 'Metal de aporte', 'Atmósfera protectora', 'Tiempo de calentamiento'],
          advantages: ['Unión de materiales diferentes', 'Propiedades del material base', 'Tolerancias estrechas', 'Acabado limpio'],
          disadvantages: ['Resistencia limitada', 'Requiere fundente', 'Control de temperatura', 'Costo de materiales'],
          materials: ['Aceros', 'Aceros inoxidables', 'Aleaciones de cobre', 'Carburos cementados'],
          tools: ['Aleaciones de plata', 'Aleaciones de cobre', 'Hornos de brazing', 'Fundentes'],
          image: '🔥',
          simulator: null
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
          description: 'Proceso de obtención de piezas mediante colado de metal líquido en moldes, permitiendo formas complejas.',
          applications: ['Blocks de motor', 'Válvulas industriales', 'Engranajes pesados', 'Arte decorativo'],
          parameters: ['Temperatura de colado', 'Velocidad de llenado', 'Tiempo de solidificación', 'Sistema de alimentación'],
          advantages: ['Formas complejas', 'Tamaños grandes', 'Economía para series', 'Variedad de aleaciones'],
          disadvantages: ['Tolerancias amplias', 'Porosidad', 'Tensiones residuales', 'Acabado superficial'],
          materials: ['Hierro fundido', 'Aceros fundidos', 'Aleaciones de aluminio', 'Aleaciones de cobre'],
          tools: ['Moldes de arena', 'Moldes metálicos', 'Hornos de fusión', 'Sistemas de colada'],
          image: '🔥',
          simulator: null
        },
        inyeccion: {
          name: 'Inyección de Polímeros',
          description: 'Moldeo de termoplásticos mediante inyección a presión en moldes cerrados.',
          applications: ['Carcasas electrónicas', 'Componentes automotrices', 'Envases', 'Juguetes'],
          parameters: ['Temperatura de fusión', 'Presión de inyección', 'Tiempo de ciclo', 'Velocidad de inyección'],
          advantages: ['Alta precisión', 'Ciclos rápidos', 'Acabado excelente', 'Automatización completa'],
          disadvantages: ['Costo de moldes', 'Limitaciones de espesor', 'Líneas de unión', 'Tensiones residuales'],
          materials: ['Polietileno', 'Polipropileno', 'ABS', 'Policarbonato'],
          tools: ['Moldes de inyección', 'Máquinas inyectoras', 'Sistemas de refrigeración', 'Robots manipuladores'],
          image: '💉',
          simulator: null
        },
        sinterizado: {
          name: 'Pulvimetalurgia',
          description: 'Fabricación mediante compactación y sinterizado de polvos metálicos.',
          applications: ['Engranajes automotrices', 'Filtros porosos', 'Imanes permanentes', 'Contactos eléctricos'],
          parameters: ['Presión de compactación', 'Temperatura de sinterizado', 'Atmósfera controlada', 'Tiempo de sinterizado'],
          advantages: ['Tolerancias estrechas', 'Propiedades controladas', 'Desperdicio mínimo', 'Formas complejas'],
          disadvantages: ['Propiedades limitadas', 'Tamaño restringido', 'Costo de polvos', 'Porosidad residual'],
          materials: ['Polvos de hierro', 'Polvos de cobre', 'Aleaciones especiales', 'Materiales compuestos'],
          tools: ['Prensas de compactación', 'Hornos de sinterizado', 'Matrices', 'Sistemas de atmósfera'],
          image: '⚱️',
          simulator: null
        },
        moldeo_arena: {
          name: 'Moldeo en Arena',
          description: 'Proceso de fundición que utiliza moldes de arena para crear piezas de geometría compleja.',
          applications: ['Piezas únicas', 'Prototipos', 'Series pequeñas', 'Piezas de gran tamaño'],
          parameters: ['Tipo de arena', 'Aglomerante', 'Humedad', 'Compactación'],
          advantages: ['Flexibilidad geométrica', 'Bajo costo de molde', 'Tamaños grandes', 'Cambios rápidos'],
          disadvantages: ['Acabado superficial', 'Tolerancias amplias', 'Inclusiones de arena', 'Productividad baja'],
          materials: ['Hierro gris', 'Hierro dúctil', 'Aceros al carbono', 'Bronces'],
          tools: ['Arena de sílice', 'Bentonita', 'Modelos', 'Cajas de moldeo'],
          image: '🏖️',
          simulator: null
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
          Explora los principales procesos manufactureros clasificados por tipo de operación, con información técnica detallada y simuladores interactivos.
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
                        {process.simulator && (
                          <Zap size={16} className="text-blue-500" title="Simulador disponible" />
                        )}
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

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                      ✅ Ventajas
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.advantages.map((advantage, index) => (
                        <li key={index} className="text-yellow-700 dark:text-yellow-300">• {advantage}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">
                      ⚠️ Limitaciones
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.disadvantages.map((disadvantage, index) => (
                        <li key={index} className="text-red-700 dark:text-red-300">• {disadvantage}</li>
                      ))}
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
                        <li key={index} className="text-purple-700 dark:text-purple-300">• {material}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                      🛠️ Herramientas y Equipos
                    </h4>
                    <ul className="space-y-1">
                      {selectedProcessData.tools.map((tool, index) => (
                        <li key={index} className="text-indigo-700 dark:text-indigo-300">• {tool}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {selectedProcessData.simulator && (
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <Play size={18} />
                    <span>Abrir Simulador</span>
                  </button>
                )}
                <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  <BookOpen size={18} />
                  <span>Manual Técnico</span>
                </button>
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  <Settings size={18} />
                  <span>Calculadora</span>
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
                Elige un proceso de fabricación de la lista para ver información técnica detallada, aplicaciones industriales y herramientas disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;