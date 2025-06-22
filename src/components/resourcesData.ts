// Resource type definition for maintainability
export interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  size?: string;
  pages?: number;
  items?: number;
  duration?: string;
  updated: string;
  downloadUrl?: string;
  viewUrl?: string;
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "Manual Técnico de Procesos de Fabricación",
    description:
      "Guía completa con especificaciones técnicas, parámetros y mejores prácticas",
    type: "pdf",
    category: "manual",
    size: "15.2 MB",
    pages: 324,
    updated: "2024-01-15",
    downloadUrl: "https://example.com/manual-tecnico.pdf",
    viewUrl: "https://example.com/manual-tecnico.pdf",
  },
  {
    id: 2,
    title: "Galería de Procesos de Mecanizado",
    description:
      "Imágenes técnicas detalladas de operaciones de torneado, fresado y taladrado",
    type: "gallery",
    category: "images",
    items: 45,
    updated: "2024-01-20",
    viewUrl: "https://example.com/galeria-mecanizado",
  },
  {
    id: 3,
    title: "Procesos de Soldadura Industrial",
    description: "Documentación especializada en soldadura MIG, TIG y por arco",
    type: "pdf",
    category: "soldadura",
    size: "8.7 MB",
    pages: 156,
    updated: "2024-01-18",
    downloadUrl: "https://example.com/soldadura.pdf",
    viewUrl: "https://example.com/soldadura.pdf",
  },
  {
    id: 4,
    title: "Videos Demostrativos de Forjado",
    description:
      "Serie de videos educativos sobre técnicas de forjado libre y en matriz",
    type: "video",
    category: "forjado",
    duration: "2h 15min",
    updated: "2024-01-22",
    viewUrl: "https://youtube.com/forjado-demo",
  },
  {
    id: 5,
    title: "Tablas de Velocidades de Corte",
    description:
      "Referencias rápidas para diferentes materiales y herramientas",
    type: "pdf",
    category: "referencias",
    size: "2.1 MB",
    pages: 28,
    updated: "2024-01-10",
    downloadUrl: "https://example.com/velocidades-corte.pdf",
    viewUrl: "https://example.com/velocidades-corte.pdf",
  },
  {
    id: 6,
    title: "Procesos de Conformado de Metales",
    description:
      "Imágenes y diagramas de procesos de laminado, estampado y trefilado",
    type: "gallery",
    category: "images",
    items: 32,
    updated: "2024-01-25",
    viewUrl: "https://example.com/conformado-metales",
  },
  {
    id: 7,
    title: "Video: Introducción al Torneado",
    description:
      "Video educativo sobre los fundamentos del torneado industrial",
    type: "video",
    category: "images",
    duration: "18min",
    updated: "2024-02-01",
    viewUrl: "https://youtube.com/torneado-intro",
  },
  {
    id: 8,
    title: "Manual de Seguridad en Talleres",
    description:
      "Normas y recomendaciones para la seguridad en talleres de manufactura",
    type: "pdf",
    category: "manual",
    size: "4.5 MB",
    pages: 80,
    updated: "2024-02-10",
    downloadUrl: "https://example.com/manual-seguridad.pdf",
    viewUrl: "https://example.com/manual-seguridad.pdf",
  },
  {
    id: 9,
    title: "Galería: Equipos de Medición",
    description: "Imágenes de micrómetros, calibradores y otros instrumentos",
    type: "gallery",
    category: "images",
    items: 20,
    updated: "2024-02-15",
    viewUrl: "https://example.com/galeria-medicion",
  },
];

export const categories = [
  { id: "all", name: "Todos los Recursos", icon: "📚" },
  { id: "manual", name: "Manuales Técnicos", icon: "📖" },
  { id: "images", name: "Galerías de Imágenes", icon: "🖼️" },
  { id: "soldadura", name: "Soldadura", icon: "⚡" },
  { id: "forjado", name: "Forjado", icon: "🔨" },
  { id: "referencias", name: "Referencias", icon: "📋" },
];
