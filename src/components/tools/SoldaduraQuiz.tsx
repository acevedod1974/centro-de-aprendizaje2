import React, { useState, useEffect } from "react";
import { safeSetItem, safeGetItem } from "../../utils/safeStorage";
import { Award, CheckCircle, XCircle, RotateCcw, Zap } from "lucide-react";
import { supabase } from "../../supabaseClient";

const LOCAL_STORAGE_KEY = "quizUserProgress";

interface Quiz {
  id: string;
  title: string;
  description: string;
}

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_option: number;
  explanation: string;
  level: string; // Added level field
}

const LEVELS = ["Básico", "Intermedio", "Avanzado"];

const SoldaduraQuiz: React.FC<{ onComplete?: (score: number) => void }> = ({
  onComplete,
}) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVELS[0]);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch quiz metadata
        const { data: quizData, error: quizError } = await supabase
          .from("quizzes")
          .select("id, title, description")
          .eq("title", "Quiz de Soldadura")
          .single();
        if (quizError || !quizData) {
          setError("No se pudo cargar el quiz de soldadura.");
          console.error("Supabase quiz fetch error:", quizError);
          setLoading(false);
          return;
        }
        setQuiz(quizData);
        // Fetch questions for this quiz and selected level
        const { data: questionsData, error: questionsError } = await supabase
          .from("quiz_questions")
          .select(
            "id, question_text, options, correct_option, explanation, level"
          )
          .eq("quiz_id", quizData.id)
          .eq("level", selectedLevel)
          .order("created_at", { ascending: true });
        if (questionsError || !questionsData) {
          setError("No se pudieron cargar las preguntas del quiz.");
          console.error("Supabase questions fetch error:", questionsError);
          setLoading(false);
          return;
        }
        // Parse options from JSON if needed
        const parsedQuestions = questionsData.map(
          (q): Question => ({
            ...q,
            options: Array.isArray(q.options)
              ? q.options
              : JSON.parse(q.options as string),
          })
        );
        setQuestions(parsedQuestions);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnswers([]);
        setQuizCompleted(false);
        console.log("Supabase connectivity: Quiz and questions loaded.");
      } catch (err) {
        setError("Error de conexión con Supabase.");
        console.error("Supabase connectivity error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [selectedLevel]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    if (selectedAnswer === questions[currentQuestion].correct_option) {
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
      const stored = safeGetItem(LOCAL_STORAGE_KEY);
      let progress = {};
      try {
        progress = stored ? JSON.parse(stored) : {};
      } catch {
        progress = {};
      }
      const prev = progress[quiz?.id || "soldadura"] || {};
      const bestScore = prev.bestScore
        ? Math.max(prev.bestScore, score * 20)
        : score * 20;
      progress[quiz?.id || "soldadura"] = { completed: true, bestScore };
      safeSetItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
      if (onComplete) onComplete(score * 20);
    }
    // eslint-disable-next-line
  }, [quizCompleted]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-600 dark:text-gray-300">
          Cargando quiz...
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
  if (!quiz || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="mb-4">
          <label htmlFor="level-select" className="mr-2 font-semibold">
            Nivel:
          </label>
          <select
            id="level-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <span className="text-lg text-gray-600 dark:text-gray-300">
          No hay preguntas disponibles para este nivel.
        </span>
      </div>
    );
  }

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
                  {answers[index] === question.correct_option ? (
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
    <div className="max-w-lg w-full mx-auto p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <div className="flex justify-end mb-4">
        <label htmlFor="level-select" className="mr-2 font-semibold">
          Nivel:
        </label>
        <select
          id="level-select"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap size={28} />
            <div>
              <h2 className="text-2xl font-bold">{quiz.title}</h2>
              <p className="opacity-90">{quiz.description}</p>
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
            {questions[currentQuestion].question_text}
          </h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showResult
                    ? index === questions[currentQuestion].correct_option
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                      : index === selectedAnswer &&
                        selectedAnswer !==
                          questions[currentQuestion].correct_option
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
                      index === questions[currentQuestion].correct_option
                        ? "border-green-500 bg-green-500"
                        : showResult &&
                          index === selectedAnswer &&
                          selectedAnswer !==
                            questions[currentQuestion].correct_option
                        ? "border-red-500 bg-red-500"
                        : selectedAnswer === index
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {showResult &&
                      index === questions[currentQuestion].correct_option && (
                        <CheckCircle size={16} className="text-white" />
                      )}
                    {showResult &&
                      index === selectedAnswer &&
                      selectedAnswer !==
                        questions[currentQuestion].correct_option && (
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
  );
};

export default SoldaduraQuiz;
