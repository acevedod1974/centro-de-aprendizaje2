import React, { useState, useEffect } from "react";
import { Calculator, Info, RotateCcw } from "lucide-react";
import { supabase } from "../../supabaseClient";

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
    if (diameter > 0 && cutSpeed > 0) {
      const calculatedRPM = (cutSpeed * 1000) / (Math.PI * diameter);
      setRpm(Math.round(calculatedRPM));
    } else {
      setRpm(0);
    }
  }, [diameter, cutSpeed]);

  useEffect(() => {
    const mat = materials.find((m) => m.key === material);
    if (mat) setCutSpeed(mat.recommended_speed);
  }, [material, materials]);

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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Material de la Pieza
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  {materials.map((mat) => (
                    <option key={mat.key} value={mat.key}>
                      {mat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Diámetro de la Pieza (mm)
                </label>
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Velocidad de Corte (m/min)
                </label>
                <input
                  type="number"
                  value={cutSpeed}
                  onChange={(e) => setCutSpeed(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avance (mm/rev)
                </label>
                <input
                  type="number"
                  value={feedRate}
                  onChange={(e) => setFeedRate(Number(e.target.value))}
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  min="0.01"
                  max="5"
                />
              </div>

              <button
                onClick={resetCalculator}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCcw size={18} />
                <span>Reiniciar</span>
              </button>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                  🎯 Resultados del Cálculo
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <span className="font-medium">Velocidad del Husillo:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {rpm} RPM
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <span className="font-medium">Avance por Minuto:</span>
                    <span className="text-xl font-bold text-green-600">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VelocidadCorteCalculator;
