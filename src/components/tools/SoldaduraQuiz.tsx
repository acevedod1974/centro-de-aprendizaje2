import React, { useState, useEffect } from "react";
import { Award, CheckCircle, XCircle, RotateCcw, Zap } from "lucide-react";

const LOCAL_STORAGE_KEY = "quizUserProgress";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const SoldaduraQuiz: React.FC<{ onComplete?: (score: number) => void }> = ({
  onComplete,
}) => {
  const questions: Question[] = [
    {
      id: 1,
      question:
        "¿Cuál es la temperatura aproximada del arco eléctrico en soldadura por arco?",
      options: ["1,500°C", "3,000°C", "6,000°C", "10,000°C"],
      correct: 2,
      explanation:
        "El arco eléctrico en soldadura alcanza temperaturas de aproximadamente 6,000°C, lo que permite la fusión rápida de los metales base.",
    },
    {
      id: 2,
      question:
        "¿Qué gas se utiliza comúnmente como protección en soldadura MIG para acero al carbono?",
      options: ["Argón puro", "CO2 puro", "Mezcla Ar/CO2", "Helio"],
      correct: 2,
      explanation:
        "La mezcla de Argón/CO2 proporciona buena protección, estabilidad del arco y penetración adecuada para acero al carbono.",
    },
    {
      id: 3,
      question:
        "¿Cuál es la principal ventaja de la soldadura TIG sobre la soldadura por electrodo?",
      options: [
        "Mayor velocidad",
        "Menor costo",
        "Mayor precisión y calidad",
        "No requiere gas",
      ],
      correct: 2,
      explanation:
        "La soldadura TIG ofrece mayor precisión, mejor control del proceso y cordones de soldadura de mayor calidad estética.",
    },
    {
      id: 4,
      question:
        "¿Qué defecto de soldadura se caracteriza por la falta de fusión entre el metal base y el cordón?",
      options: [
        "Porosidad",
        "Falta de penetración",
        "Socavado",
        "Inclusiones de escoria",
      ],
      correct: 1,
      explanation:
        "La falta de penetración ocurre cuando no hay fusión adecuada en la raíz de la soldadura, debilitando la unión.",
    },
    {
      id: 5,
      question:
        "¿Cuál es la posición más difícil para soldar según la clasificación AWS?",
      options: [
        "Plana (1G)",
        "Horizontal (2G)",
        "Vertical (3G)",
        "Sobrecabeza (4G)",
      ],
      correct: 3,
      explanation:
        "La posición sobrecabeza (4G) es la más desafiante debido a la gravedad, requiriendo mayor habilidad del soldador.",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "¡Excelente conocimiento en soldadura! 🏆";
    if (percentage >= 60) return "Buen desempeño, sigue estudiando 📚";
    return "Necesitas repasar los conceptos básicos 📖";
  };

  useEffect(() => {
    if (quizCompleted) {
      // Save best score and completion to localStorage
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      let progress = {};
      try {
        progress = stored ? JSON.parse(stored) : {};
      } catch {
        progress = {};
      }
      const prev = progress["soldadura"] || {};
      const bestScore = prev.bestScore
        ? Math.max(prev.bestScore, score * 20)
        : score * 20;
      progress["soldadura"] = { completed: true, bestScore };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
      if (onComplete) onComplete(score * 20);
    }
    // eslint-disable-next-line
  }, [quizCompleted]);

  if (quizCompleted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Quiz Completado!
          </h2>

          <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {getScoreMessage()}
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Resumen de Respuestas:
            </h3>
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg"
                >
                  <span className="text-sm">Pregunta {index + 1}</span>
                  {answers[index] === question.correct ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 mx-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw size={20} />
            <span>Reiniciar Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap size={28} />
              <div>
                <h2 className="text-2xl font-bold">Quiz de Soldadura</h2>
                <p className="opacity-90">Evalúa tus conocimientos técnicos</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Pregunta</div>
              <div className="text-xl font-bold">
                {currentQuestion + 1}/{questions.length}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progreso</span>
              <span>
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showResult
                      ? index === questions[currentQuestion].correct
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        : index === selectedAnswer &&
                          selectedAnswer !== questions[currentQuestion].correct
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                        : "border-gray-200 dark:border-gray-600"
                      : selectedAnswer === index
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showResult &&
                        index === questions[currentQuestion].correct
                          ? "border-green-500 bg-green-500"
                          : showResult &&
                            index === selectedAnswer &&
                            selectedAnswer !==
                              questions[currentQuestion].correct
                          ? "border-red-500 bg-red-500"
                          : selectedAnswer === index
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {showResult &&
                        index === questions[currentQuestion].correct && (
                          <CheckCircle size={16} className="text-white" />
                        )}
                      {showResult &&
                        index === selectedAnswer &&
                        selectedAnswer !==
                          questions[currentQuestion].correct && (
                          <XCircle size={16} className="text-white" />
                        )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="mb-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                💡 Explicación
              </h4>
              <p className="text-blue-700 dark:text-blue-300">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Award size={20} />
              <span>
                Puntuación actual: {score}/
                {currentQuestion + (showResult ? 1 : 0)}
              </span>
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null || showResult}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion === questions.length - 1
                ? "Finalizar Quiz"
                : "Siguiente Pregunta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldaduraQuiz;
