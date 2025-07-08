import React, { useState, useEffect } from "react";
import { Calculator, Info, RotateCcw } from "lucide-react";
import { supabase } from "../../supabaseClient";
import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CuttingMaterial {
  id: string;
  name: string;
  key: string;
  recommended_speed: number;
  color: string;
}

const VelocidadCorteCalculator: React.FC = () => {
  const [diameter, setDiameter] = useState<number>(50);
  const [cutSpeed, setCutSpeed] = useState<number>(100);
  const [rpm, setRpm] = useState<number>(0);
  const [feedRate, setFeedRate] = useState<number>(0.1);
  const [material, setMaterial] = useState<string>("");
  const [materials, setMaterials] = useState<CuttingMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation state for results
  const [copied, setCopied] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Error and warning states
  const [diameterError, setDiameterError] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("cutting_materials")
          .select("*");
        if (error || !data) throw error;
        setMaterials(data);
        if (data.length > 0) {
          setMaterial(data[0].key);
          setCutSpeed(data[0].recommended_speed);
        }
      } catch {
        setError("Error al cargar materiales desde Supabase.");
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (showCheck) {
      const timer = setTimeout(() => setShowCheck(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showCheck]);

  useEffect(() => {
    if (diameter > 0 && cutSpeed > 0) {
      const calculatedRPM = (cutSpeed * 1000) / (Math.PI * diameter);
      setRpm(Math.round(calculatedRPM));
      setShowCheck(true);
    } else {
      setRpm(0);
    }
  }, [diameter, cutSpeed]);

  useEffect(() => {
    const mat = materials.find((m) => m.key === material);
    if (mat) setCutSpeed(mat.recommended_speed);
  }, [material, materials]);

  // Add selected material to comparison if not already present
  useEffect(() => {
    if (material && !selectedMaterials.includes(material)) {
      setSelectedMaterials((prev) => [...prev, material]);
    }
    // eslint-disable-next-line
  }, [material]);

  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value <= 0) {
      setDiameterError("Valor inválido para el diámetro.");
    } else if (value > 1000) {
      setDiameterError("Valor fuera de rango permitido para el diámetro.");
    } else {
      setDiameterError(null);
      setDiameter(value);
    }
  };

  const handleCopyResults = async () => {
    const mat = materials.find((m) => m.key === material);
    const text = `Material: ${
      mat?.name
    }\nDiámetro: ${diameter} mm\nVelocidad de Corte: ${cutSpeed} m/min\nRPM: ${rpm}\nAvance: ${feedRate} mm/rev\nAvance por Minuto: ${(
      feedRate * rpm
    ).toFixed(1)} mm/min`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(null);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopyError("No se pudo copiar los resultados.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!chartRef.current) return;
    try {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape" });
      pdf.addImage(imgData, "PNG", 10, 10, 270, 80);
      pdf.save("velocidades_corte_analisis.pdf");
      setPdfError(null);
    } catch {
      setPdfError("No se pudo exportar el análisis a PDF.");
    }
  };

  const resetCalculator = () => {
    const mat = materials.find((m) => m.key === material);
    setDiameter(50);
    setCutSpeed(mat ? mat.recommended_speed : 100);
    setRpm(0);
    setFeedRate(0.1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-600 dark:text-gray-300">
          Cargando materiales de corte...
        </span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-red-600 dark:text-red-400">{error}</span>
      </div>
    );
  }
  if (materials.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-600 dark:text-gray-300">
          No hay materiales disponibles.
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center space-x-3">
            <Calculator size={28} />
            <div>
              <h2 className="text-2xl font-bold">
                Calculadora de Velocidad de Corte
              </h2>
              <p className="opacity-90">
                Optimiza tus parámetros de mecanizado
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="material-select"
                >
                  Material de la Pieza
                </label>
                <select
                  id="material-select"
                  aria-label="Seleccionar material de la pieza"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 hover:shadow-md"
                >
                  {materials.map((mat) => (
                    <option key={mat.key} value={mat.key}>
                      {mat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="diameter-input"
                >
                  Diámetro de la Pieza (mm)
                </label>
                <input
                  id="diameter-input"
                  aria-label="Diámetro de la pieza en milímetros"
                  type="number"
                  value={diameter}
                  onChange={handleDiameterChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 hover:shadow-md"
                  min="1"
                  max="1000"
                />
                {diameterError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="text-yellow-600 mt-1"
                  >
                    {diameterError}
                  </div>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="speed-input"
                >
                  Velocidad de Corte (m/min)
                </label>
                <input
                  id="speed-input"
                  aria-label="Velocidad de corte en metros por minuto"
                  type="number"
                  value={cutSpeed}
                  onChange={(e) => setCutSpeed(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 hover:shadow-md"
                  min="1"
                  max="1000"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="feedrate-input"
                >
                  Avance (mm/rev)
                </label>
                <input
                  id="feedrate-input"
                  aria-label="Avance en milímetros por revolución"
                  type="number"
                  value={feedRate}
                  onChange={(e) => setFeedRate(Number(e.target.value))}
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 hover:shadow-md"
                  min="0.01"
                  max="5"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={resetCalculator}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 transition-colors"
                  aria-label="Reiniciar calculadora"
                >
                  <RotateCcw size={18} />
                  <span>Reiniciar</span>
                </button>
                <button
                  onClick={handleCopyResults}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors relative"
                  aria-label="Copiar resultados"
                >
                  {copied ? (
                    <span className="animate-bounce text-green-400 font-bold">
                      ✓
                    </span>
                  ) : (
                    <span>Copiar Resultados</span>
                  )}
                </button>
                {copyError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="text-red-600 mt-1"
                  >
                    {copyError}
                  </div>
                )}
              </div>
            </div>
            {/* Results Panel */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl relative">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                  🎯 Resultados del Cálculo
                  <span className="ml-2 inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 font-semibold animate-fade-in">
                    {materials.find((m) => m.key === material)?.name}
                  </span>
                  {showCheck && (
                    <span className="ml-2 text-green-500 animate-ping">✓</span>
                  )}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <span className="font-medium">Velocidad del Husillo:</span>
                    <span
                      className="text-2xl font-bold text-blue-600"
                      aria-live="polite"
                    >
                      {rpm} RPM
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <span className="font-medium">Avance por Minuto:</span>
                    <span
                      className="text-xl font-bold text-green-600"
                      aria-live="polite"
                    >
                      {(feedRate * rpm).toFixed(1)} mm/min
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  📝 Fórmulas Utilizadas
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <strong>RPM = (Vc × 1000) / (π × D)</strong>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Donde: Vc = Velocidad de corte, D = Diámetro
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <strong>Vf = f × RPM</strong>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Donde: f = Avance por revolución
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Info size={20} className="text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                      Recomendaciones
                    </h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
                      <li>
                        • Ajusta la velocidad según el tipo de herramienta
                      </li>
                      <li>• Considera la rigidez del sistema máquina-pieza</li>
                      <li>• Utiliza refrigeración adecuada</li>
                      <li>• Verifica las especificaciones del fabricante</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Chart Panel */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  📊 Análisis Gráfico
                </h3>
                <div className="h-64">
                  <Line
                    data={{
                      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
                      datasets: [
                        {
                          label: "Velocidad de Corte",
                          data: [50, 60, 55, 70, 65, 80, 75],
                          borderColor: "rgb(37 99 235)",
                          backgroundColor: "rgba(37, 99, 235, 0.2)",
                          fill: true,
                          tension: 0.4,
                        },
                        {
                          label: "Avance",
                          data: [0.1, 0.15, 0.12, 0.2, 0.18, 0.25, 0.22],
                          borderColor: "rgb(22 163 74)",
                          backgroundColor: "rgba(22, 163, 74, 0.2)",
                          fill: true,
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top" as const,
                          labels: {
                            color: "#2563EB",
                            font: { family: "Inter", size: 13, weight: "bold" },
                          },
                        },
                        title: {
                          display: true,
                          text: "Tendencia de Velocidad de Corte y Avance",
                          color: "#2563EB",
                          font: { family: "Inter", size: 15, weight: "bold" },
                        },
                        tooltip: {
                          callbacks: {
                            label: (
                              ctx: import("chart.js").TooltipItem<"line">
                            ) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
                          },
                        },
                      },
                      animation: {
                        duration: 1200,
                        easing: "easeOutQuart",
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Meses",
                            color: "#64748B",
                            font: {
                              family: "Inter",
                              size: 13,
                              weight: "medium",
                            },
                          },
                          ticks: {
                            color: "#64748B",
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: "Valores",
                            color: "#64748B",
                            font: {
                              family: "Inter",
                              size: 13,
                              weight: "medium",
                            },
                          },
                          ticks: {
                            color: "#64748B",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Analytics & Chart */}
        <div
          className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          ref={chartRef}
        >
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center">
            <Calculator className="mr-2 text-blue-500" size={20} />
            Análisis Visual de Parámetros
          </h3>
          <Line
            data={{
              labels: selectedMaterials.map(
                (key) => materials.find((m) => m.key === key)?.name || key
              ),
              datasets: [
                {
                  label: "Velocidad Recomendada (m/min)",
                  data: selectedMaterials.map(
                    (key) =>
                      materials.find((m) => m.key === key)?.recommended_speed ||
                      0
                  ),
                  backgroundColor: selectedMaterials.map(
                    (key) =>
                      materials.find((m) => m.key === key)?.color || "#2563EB"
                  ),
                  borderColor: selectedMaterials.map(
                    (key) =>
                      materials.find((m) => m.key === key)?.color || "#2563EB"
                  ),
                  fill: true,
                  tension: 0.4,
                  pointRadius: 6,
                  pointHoverRadius: 10,
                  pointStyle: "rectRounded",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top" as const,
                  labels: {
                    color: "#2563EB",
                    font: { family: "Inter", size: 14, weight: "bold" },
                    boxWidth: 24,
                    boxHeight: 12,
                  },
                },
                title: {
                  display: true,
                  text: "Comparativa de Velocidades de Corte por Material (Selección)",
                  color: "#2563EB",
                  font: { family: "Inter", size: 16, weight: "bold" },
                },
                tooltip: {
                  backgroundColor: "#1e293b",
                  titleColor: "#38bdf8",
                  bodyColor: "#fbbf24",
                  borderColor: "#2563EB",
                  borderWidth: 1,
                  callbacks: {
                    label: (ctx: import("chart.js").TooltipItem<"line">) =>
                      `${ctx.dataset.label}: ${ctx.parsed.y} m/min`,
                  },
                },
              },
              animation: {
                duration: 1500,
                easing: "easeOutCubic",
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Material",
                    color: "#64748B",
                    font: { family: "Inter", size: 13, weight: "medium" },
                  },
                  ticks: {
                    color: "#64748B",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Velocidad (m/min)",
                    color: "#64748B",
                    font: { family: "Inter", size: 13, weight: "medium" },
                  },
                  min: 0,
                  max:
                    Math.max(
                      ...selectedMaterials.map(
                        (key) =>
                          materials.find((m) => m.key === key)
                            ?.recommended_speed || 0
                      )
                    ) + 50,
                  ticks: {
                    color: "#64748B",
                  },
                },
              },
            }}
            aria-label="Comparativa de velocidades de corte por material (selección)"
            role="img"
          />
          <div className="flex mt-4 space-x-2">
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition-colors"
              aria-label="Descargar análisis en PDF"
            >
              Descargar PDF
            </button>
            {pdfError && (
              <div
                role="alert"
                aria-live="assertive"
                className="text-red-600 mt-1"
              >
                {pdfError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VelocidadCorteCalculator;

/* Animations CSS */
<style>{`
  .animate-fade-in { animation: fadeIn 0.7s; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .animate-bounce-in { animation: bounceIn 0.7s; }
  @keyframes bounceIn {
    0% { transform: scale(0.95); opacity: 0.5; }
    60% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
`}</style>;
