import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Info,
  Play,
  BookOpen,
  Settings,
  Zap,
} from "lucide-react";

const ProcessSection: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "remocion"
  );
  const [selectedProcess, setSelectedProcess] = useState<string | null>(
    "torneado"
  );

  const processCategories = {
    remocion: {
      title: "Procesos de Remoción de Material",
      icon: "🔧",
      color: "bg-red-500",
      processes: {
        torneado: {
          name: "Torneado",
          description:
            "Proceso de mecanizado que utiliza una herramienta de corte para remover material de una pieza en rotación, creando superficies cilíndricas, cónicas y planas.",
          applications: [
            "Ejes de transmisión",
            "Cilindros hidráulicos",
            "Conos de precisión",
            "Roscas métricas y especiales",
          ],
          parameters: [
            "Velocidad de corte (Vc)",
            "Avance por revolución (f)",
            "Profundidad de pasada (ap)",
            "Ángulo de ataque",
          ],
          advantages: [
            "Alta precisión dimensional (±0.01mm)",
            "Excelente acabado superficial (Ra 0.8-3.2μm)",
            "Versatilidad en geometrías",
            "Productividad elevada",
          ],
          disadvantages: [
            "Limitado a piezas de revolución",
            "Requiere sujeción rígida",
            "Desgaste de herramientas",
          ],
          materials: [
            "Aceros al carbono",
            "Aceros inoxidables",
            "Aleaciones de aluminio",
            "Latón y bronce",
          ],
          tools: [
            "Plaquitas de carburo",
            "Herramientas de acero rápido",
            "Cerámicas",
            "Diamante PCD",
          ],
          image: "🔄",
          simulator: "mecanizado-simulator",
        },
        fresado: {
          name: "Fresado",
          description:
            "Proceso de mecanizado con herramienta rotativa multifilosa que remueve material mediante movimientos de avance, permitiendo crear formas complejas.",
          applications: [
            "Superficies planas y perfiladas",
            "Ranuras y chaveteros",
            "Engranajes",
            "Moldes y matrices",
          ],
          parameters: [
            "Velocidad de husillo (n)",
            "Avance por diente (fz)",
            "Profundidad axial (ap)",
            "Profundidad radial (ae)",
          ],
          advantages: [
            "Formas geométricas complejas",
            "Alta productividad",
            "Precisión dimensional excelente",
            "Acabados diversos",
          ],
          disadvantages: [
            "Mayor complejidad de sujeción",
            "Vibraciones en voladizo",
            "Costo de herramientas",
          ],
          materials: [
            "Aceros templados",
            "Aleaciones ligeras",
            "Materiales compuestos",
            "Polímeros técnicos",
          ],
          tools: [
            "Fresas de carburo",
            "Fresas de acero rápido",
            "Fresas de diamante",
            "Fresas cerámicas",
          ],
          image: "⚙️",
          simulator: "mecanizado-simulator",
        },
        taladrado: {
          name: "Taladrado",
          description:
            "Proceso para crear agujeros cilíndricos mediante una herramienta rotativa con movimiento de avance axial.",
          applications: [
            "Agujeros pasantes y ciegos",
            "Avellanados y escariados",
            "Roscado interior",
            "Perforaciones de precisión",
          ],
          parameters: [
            "Velocidad de corte",
            "Avance por revolución",
            "Refrigeración",
            "Ángulo de punta",
          ],
          advantages: [
            "Simplicidad operativa",
            "Rapidez de ejecución",
            "Precisión en diámetros",
            "Bajo costo",
          ],
          disadvantages: [
            "Limitado a geometrías circulares",
            "Evacuación de viruta",
            "Desgaste en punta",
          ],
          materials: [
            "Aceros de construcción",
            "Fundiciones",
            "Aleaciones no ferrosas",
            "Materiales compuestos",
          ],
          tools: [
            "Brocas helicoidales",
            "Brocas de centrar",
            "Escariadores",
            "Machos de roscar",
          ],
          image: "🕳️",
          simulator: null,
        },
        rectificado: {
          name: "Rectificado",
          description:
            "Proceso de acabado que utiliza granos abrasivos para obtener tolerancias muy estrechas y acabados superficiales excepcionales.",
          applications: [
            "Superficies de precisión",
            "Rodamientos",
            "Herramientas de corte",
            "Calibres y patrones",
          ],
          parameters: [
            "Velocidad de muela",
            "Avance de mesa",
            "Profundidad de pasada",
            "Refrigeración",
          ],
          advantages: [
            "Tolerancias muy estrechas (±0.002mm)",
            "Acabado superficial superior (Ra 0.1-0.8μm)",
            "Materiales duros",
            "Corrección geométrica",
          ],
          disadvantages: [
            "Baja velocidad de remoción",
            "Costo elevado",
            "Requiere balanceado",
            "Desgaste de muela",
          ],
          materials: [
            "Aceros templados",
            "Carburos cementados",
            "Cerámicas técnicas",
            "Materiales endurecidos",
          ],
          tools: [
            "Muelas de óxido de aluminio",
            "Muelas de carburo de silicio",
            "Muelas de diamante",
            "Muelas CBN",
          ],
          image: "💎",
          simulator: null,
        },
      },
    },
    conformado: {
      title: "Procesos de Conformado",
      icon: "🔨",
      color: "bg-blue-500",
      processes: {
        forjado: {
          name: "Forjado",
          description:
            "Proceso de deformación plástica que mejora las propiedades mecánicas del material mediante aplicación de fuerzas compresivas.",
          applications: [
            "Bielas de motor",
            "Cigüeñales",
            "Herramientas manuales",
            "Componentes aeroespaciales",
          ],
          parameters: [
            "Temperatura de forja",
            "Fuerza aplicada",
            "Velocidad de deformación",
            "Reducción por pasada",
          ],
          advantages: [
            "Resistencia mecánica superior",
            "Fibra metálica continua",
            "Propiedades isotrópicas",
            "Eliminación de porosidad",
          ],
          disadvantages: [
            "Requiere altas temperaturas",
            "Equipos de gran potencia",
            "Limitaciones geométricas",
            "Oxidación superficial",
          ],
          materials: [
            "Aceros al carbono",
            "Aceros aleados",
            "Aleaciones de aluminio",
            "Superaleaciones",
          ],
          tools: [
            "Matrices cerradas",
            "Estampas",
            "Yunques",
            "Prensas hidráulicas",
          ],
          image: "🔨",
          simulator: "forjado-simulator",
        },
        estampado: {
          name: "Estampado",
          description:
            "Proceso de conformado de láminas metálicas mediante matriz y punzón para obtener formas tridimensionales.",
          applications: [
            "Carrocerías automotrices",
            "Envases metálicos",
            "Componentes electrónicos",
            "Utensilios domésticos",
          ],
          parameters: [
            "Fuerza de prensado",
            "Velocidad de conformado",
            "Lubricación",
            "Radio de curvatura",
          ],
          advantages: [
            "Alta productividad",
            "Precisión dimensional",
            "Acabado superficial",
            "Automatización",
          ],
          disadvantages: [
            "Costo de herramental",
            "Limitaciones de espesor",
            "Retorno elástico",
            "Defectos superficiales",
          ],
          materials: [
            "Aceros de bajo carbono",
            "Aleaciones de aluminio",
            "Latón",
            "Aceros inoxidables",
          ],
          tools: [
            "Matrices progresivas",
            "Punzones",
            "Prensas mecánicas",
            "Sistemas de alimentación",
          ],
          image: "📋",
          simulator: null,
        },
        laminado: {
          name: "Laminado",
          description:
            "Reducción de espesor mediante compresión entre rodillos, proceso fundamental en la industria siderúrgica.",
          applications: [
            "Láminas y chapas",
            "Perfiles estructurales",
            "Barras y varillas",
            "Alambre",
          ],
          parameters: [
            "Reducción por pasada",
            "Temperatura de laminado",
            "Velocidad de laminado",
            "Tensión de bobinado",
          ],
          advantages: [
            "Producción continua",
            "Control dimensional",
            "Propiedades mejoradas",
            "Economía de escala",
          ],
          disadvantages: [
            "Inversión inicial alta",
            "Limitaciones geométricas",
            "Defectos superficiales",
            "Tensiones residuales",
          ],
          materials: [
            "Aceros al carbono",
            "Aceros inoxidables",
            "Aleaciones de aluminio",
            "Cobre y aleaciones",
          ],
          tools: [
            "Rodillos de trabajo",
            "Rodillos de apoyo",
            "Guías laterales",
            "Sistemas de refrigeración",
          ],
          image: "📏",
          simulator: null,
        },
        extrusión: {
          name: "Extrusión",
          description:
            "Proceso de conformado que fuerza el material a través de una matriz para obtener perfiles de sección constante.",
          applications: [
            "Perfiles arquitectónicos",
            "Tubos y conductos",
            "Barras de sección especial",
            "Componentes automotrices",
          ],
          parameters: [
            "Presión de extrusión",
            "Temperatura del tocho",
            "Velocidad de extrusión",
            "Relación de extrusión",
          ],
          advantages: [
            "Perfiles complejos",
            "Tolerancias estrechas",
            "Acabado superficial",
            "Propiedades uniformes",
          ],
          disadvantages: [
            "Costo de matrices",
            "Limitaciones de longitud",
            "Defectos internos",
            "Residuos de proceso",
          ],
          materials: [
            "Aleaciones de aluminio",
            "Aleaciones de magnesio",
            "Polímeros termoplásticos",
            "Aleaciones de cobre",
          ],
          tools: [
            "Matrices de extrusión",
            "Contenedores",
            "Prensas hidráulicas",
            "Sistemas de calentamiento",
          ],
          image: "🔀",
          simulator: null,
        },
      },
    },
    union: {
      title: "Procesos de Unión",
      icon: "🔗",
      color: "bg-green-500",
      processes: {
        soldadura: {
          name: "Soldadura",
          description:
            "Proceso de unión permanente mediante fusión localizada de materiales, creando una continuidad metalúrgica.",
          applications: [
            "Estructuras metálicas",
            "Tuberías industriales",
            "Recipientes a presión",
            "Construcción naval",
          ],
          parameters: [
            "Corriente de soldadura",
            "Voltaje de arco",
            "Velocidad de soldeo",
            "Gas de protección",
          ],
          advantages: [
            "Unión permanente",
            "Resistencia estructural",
            "Versatilidad de aplicación",
            "Automatización posible",
          ],
          disadvantages: [
            "Zona afectada térmicamente",
            "Tensiones residuales",
            "Defectos de soldadura",
            "Requiere personal calificado",
          ],
          materials: [
            "Aceros al carbono",
            "Aceros inoxidables",
            "Aleaciones de aluminio",
            "Aleaciones de níquel",
          ],
          tools: [
            "Electrodos revestidos",
            "Alambre MIG/MAG",
            "Varillas TIG",
            "Equipos de soldadura",
          ],
          image: "⚡",
          simulator: null,
        },
        remachado: {
          name: "Remachado",
          description:
            "Unión mecánica mediante elementos de fijación deformables que se expanden para crear la unión.",
          applications: [
            "Estructuras aeronáuticas",
            "Puentes metálicos",
            "Calderas industriales",
            "Construcción naval",
          ],
          parameters: [
            "Diámetro del remache",
            "Longitud de agarre",
            "Espaciamiento",
            "Fuerza de remachado",
          ],
          advantages: [
            "Unión confiable",
            "Resistencia a vibración",
            "Inspección visual",
            "No requiere energía",
          ],
          disadvantages: [
            "Concentración de tensiones",
            "Peso adicional",
            "Perforación previa",
            "Acceso bilateral",
          ],
          materials: [
            "Acero dulce",
            "Aleaciones de aluminio",
            "Acero inoxidable",
            "Aleaciones de cobre",
          ],
          tools: [
            "Remachadoras neumáticas",
            "Remaches sólidos",
            "Remaches ciegos",
            "Matrices de conformado",
          ],
          image: "🔩",
          simulator: null,
        },
        pegado: {
          name: "Adhesivos Estructurales",
          description:
            "Unión mediante adhesivos de alta resistencia que crean enlaces químicos entre superficies.",
          applications: [
            "Industria aeroespacial",
            "Sector automotriz",
            "Electrónica",
            "Construcción",
          ],
          parameters: [
            "Tipo de adhesivo",
            "Tiempo de curado",
            "Presión de contacto",
            "Temperatura de curado",
          ],
          advantages: [
            "Distribución uniforme de tensiones",
            "Peso reducido",
            "Sellado hermético",
            "Aislamiento eléctrico",
          ],
          disadvantages: [
            "Sensibilidad ambiental",
            "Tiempo de curado",
            "Preparación superficial",
            "Durabilidad limitada",
          ],
          materials: [
            "Materiales compuestos",
            "Aleaciones ligeras",
            "Polímeros",
            "Vidrio y cerámicas",
          ],
          tools: [
            "Adhesivos epoxi",
            "Adhesivos acrílicos",
            "Sistemas de curado",
            "Equipos de aplicación",
          ],
          image: "🧪",
          simulator: null,
        },
        brazing: {
          name: "Soldadura Fuerte (Brazing)",
          description:
            "Proceso de unión que utiliza un metal de aporte que funde a temperatura inferior a la del material base.",
          applications: [
            "Intercambiadores de calor",
            "Herramientas de corte",
            "Componentes electrónicos",
            "Joyería",
          ],
          parameters: [
            "Temperatura de brazing",
            "Metal de aporte",
            "Atmósfera protectora",
            "Tiempo de calentamiento",
          ],
          advantages: [
            "Unión de materiales diferentes",
            "Propiedades del material base",
            "Tolerancias estrechas",
            "Acabado limpio",
          ],
          disadvantages: [
            "Resistencia limitada",
            "Requiere fundente",
            "Control de temperatura",
            "Costo de materiales",
          ],
          materials: [
            "Aceros",
            "Aceros inoxidables",
            "Aleaciones de cobre",
            "Carburos cementados",
          ],
          tools: [
            "Aleaciones de plata",
            "Aleaciones de cobre",
            "Hornos de brazing",
            "Fundentes",
          ],
          image: "🔥",
          simulator: null,
        },
      },
    },
    moldeo: {
      title: "Procesos de Moldeo",
      icon: "🏺",
      color: "bg-purple-500",
      processes: {
        fundicion: {
          name: "Fundición",
          description:
            "Proceso de obtención de piezas mediante colado de metal líquido en moldes, permitiendo formas complejas.",
          applications: [
            "Blocks de motor",
            "Válvulas industriales",
            "Engranajes pesados",
            "Arte decorativo",
          ],
          parameters: [
            "Temperatura de colado",
            "Velocidad de llenado",
            "Tiempo de solidificación",
            "Sistema de alimentación",
          ],
          advantages: [
            "Formas complejas",
            "Tamaños grandes",
            "Economía para series",
            "Variedad de aleaciones",
          ],
          disadvantages: [
            "Tolerancias amplias",
            "Porosidad",
            "Tensiones residuales",
            "Acabado superficial",
          ],
          materials: [
            "Hierro fundido",
            "Aceros fundidos",
            "Aleaciones de aluminio",
            "Aleaciones de cobre",
          ],
          tools: [
            "Moldes de arena",
            "Moldes metálicos",
            "Hornos de fusión",
            "Sistemas de colada",
          ],
          image: "🔥",
          simulator: null,
        },
        inyeccion: {
          name: "Inyección de Polímeros",
          description:
            "Moldeo de termoplásticos mediante inyección a presión en moldes cerrados.",
          applications: [
            "Carcasas electrónicas",
            "Componentes automotrices",
            "Envases",
            "Juguetes",
          ],
          parameters: [
            "Temperatura de fusión",
            "Presión de inyección",
            "Tiempo de ciclo",
            "Velocidad de inyección",
          ],
          advantages: [
            "Alta precisión",
            "Ciclos rápidos",
            "Acabado excelente",
            "Automatización completa",
          ],
          disadvantages: [
            "Costo de moldes",
            "Limitaciones de espesor",
            "Líneas de unión",
            "Tensiones residuales",
          ],
          materials: ["Polietileno", "Polipropileno", "ABS", "Policarbonato"],
          tools: [
            "Moldes de inyección",
            "Máquinas inyectoras",
            "Sistemas de refrigeración",
            "Robots manipuladores",
          ],
          image: "💉",
          simulator: null,
        },
        sinterizado: {
          name: "Pulvimetalurgia",
          description:
            "Fabricación mediante compactación y sinterizado de polvos metálicos.",
          applications: [
            "Engranajes automotrices",
            "Filtros porosos",
            "Imanes permanentes",
            "Contactos eléctricos",
          ],
          parameters: [
            "Presión de compactación",
            "Temperatura de sinterizado",
            "Atmósfera controlada",
            "Tiempo de sinterizado",
          ],
          advantages: [
            "Tolerancias estrechas",
            "Propiedades controladas",
            "Desperdicio mínimo",
            "Formas complejas",
          ],
          disadvantages: [
            "Propiedades limitadas",
            "Tamaño restringido",
            "Costo de polvos",
            "Porosidad residual",
          ],
          materials: [
            "Polvos de hierro",
            "Polvos de cobre",
            "Aleaciones especiales",
            "Materiales compuestos",
          ],
          tools: [
            "Prensas de compactación",
            "Hornos de sinterizado",
            "Matrices",
            "Sistemas de atmósfera",
          ],
          image: "⚱️",
          simulator: null,
        },
        moldeo_arena: {
          name: "Moldeo en Arena",
          description:
            "Proceso de fundición que utiliza moldes de arena para crear piezas de geometría compleja.",
          applications: [
            "Piezas únicas",
            "Prototipos",
            "Series pequeñas",
            "Piezas de gran tamaño",
          ],
          parameters: [
            "Tipo de arena",
            "Aglomerante",
            "Humedad",
            "Compactación",
          ],
          advantages: [
            "Flexibilidad geométrica",
            "Bajo costo de molde",
            "Tamaños grandes",
            "Cambios rápidos",
          ],
          disadvantages: [
            "Acabado superficial",
            "Tolerancias amplias",
            "Inclusiones de arena",
            "Productividad baja",
          ],
          materials: [
            "Hierro gris",
            "Hierro dúctil",
            "Aceros al carbono",
            "Bronces",
          ],
          tools: ["Arena de sílice", "Bentonita", "Modelos", "Cajas de moldeo"],
          image: "🏖️",
          simulator: null,
        },
      },
    },
  };

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

  // Define a type for process objects
  interface ProcessData {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          📚 Procesos de Fabricación Industrial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explora los principales procesos manufactureros clasificados por tipo
          de operación, con información técnica detallada y simuladores
          interactivos.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Categories Panel */}
        <div className="space-y-4">
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

        {/* Process Detail Panel */}
        <div className="lg:col-span-2">
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
                {selectedProcessData.simulator && (
                  <a
                    href={`/tools/${selectedProcessData.simulator}`}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:z-10 shadow-sm hover:shadow-lg active:scale-[0.98]"
                    aria-label="Abrir simulador"
                    tabIndex={0}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play size={18} />
                    <span>Abrir Simulador</span>
                  </a>
                )}
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
                <a
                  href={`/tools/${selectedProcess}-calculator`}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:z-10 shadow-sm hover:shadow-lg active:scale-[0.98]"
                  aria-label="Abrir calculadora"
                  tabIndex={0}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Settings size={18} />
                  <span>Calculadora</span>
                </a>
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
