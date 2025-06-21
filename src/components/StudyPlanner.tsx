import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Target, Plus, CheckCircle, AlertCircle, BookOpen, Star, Trophy, Flame } from 'lucide-react';

interface StudyTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  estimatedTime: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
}

const StudyPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: '1',
      title: 'Completar Quiz de Soldadura',
      description: 'Repasar conceptos de soldadura MIG, TIG y por arco',
      dueDate: '2024-01-25',
      priority: 'high',
      completed: false,
      estimatedTime: 30,
      category: 'Evaluación',
      difficulty: 'medium',
      points: 50
    },
    {
      id: '2',
      title: 'Estudiar Procesos de Mecanizado',
      description: 'Revisar torneado, fresado y parámetros de corte',
      dueDate: '2024-01-26',
      priority: 'medium',
      completed: false,
      estimatedTime: 45,
      category: 'Teoría',
      difficulty: 'hard',
      points: 75
    },
    {
      id: '3',
      title: 'Práctica con Calculadora de Velocidad',
      description: 'Resolver 5 ejercicios diferentes con la herramienta',
      dueDate: '2024-01-24',
      priority: 'medium',
      completed: true,
      estimatedTime: 20,
      category: 'Práctica',
      difficulty: 'easy',
      points: 25
    },
    {
      id: '4',
      title: 'Leer Manual de Conformado',
      description: 'Capítulos 3-5: Forjado y estampado',
      dueDate: '2024-01-28',
      priority: 'low',
      completed: false,
      estimatedTime: 60,
      category: 'Lectura',
      difficulty: 'medium',
      points: 40
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [studyStreak, setStudyStreak] = useState<StudyStreak>({
    current: 7,
    longest: 12,
    lastStudyDate: new Date().toISOString().split('T')[0]
  });
  const [totalPoints, setTotalPoints] = useState(125);
  const [level, setLevel] = useState(3);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    estimatedTime: 30,
    category: 'Teoría',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard'
  });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed && !task.completed) {
          setTotalPoints(prev => prev + task.points);
        } else if (!updatedTask.completed && task.completed) {
          setTotalPoints(prev => prev - task.points);
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const addTask = () => {
    if (newTask.title && newTask.dueDate) {
      const points = newTask.difficulty === 'easy' ? 25 : newTask.difficulty === 'medium' ? 50 : 75;
      const task: StudyTask = {
        id: Date.now().toString(),
        ...newTask,
        completed: false,
        points
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        estimatedTime: 30,
        category: 'Teoría',
        difficulty: 'medium'
      });
      setShowAddTask(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Evaluación': return '📝';
      case 'Teoría': return '📚';
      case 'Práctica': return '🔧';
      case 'Lectura': return '📖';
      default: return '📋';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const totalEstimatedTime = upcomingTasks.reduce((sum, task) => sum + task.estimatedTime, 0);

  // Calculate level based on points
  useEffect(() => {
    const newLevel = Math.floor(totalPoints / 100) + 1;
    setLevel(newLevel);
  }, [totalPoints]);

  const pointsToNextLevel = (level * 100) - totalPoints;
  const levelProgress = ((totalPoints % 100) / 100) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📅 Planificador de Estudios Gamificado
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Organiza tu tiempo, gana puntos y alcanza tus objetivos académicos
        </p>
      </motion.div>

      {/* Gamification Stats */}
      <div className="grid md:grid-cols-5 gap-6">
        <motion.div
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Star size={32} />
            <span className="text-3xl font-bold">Nv.{level}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Nivel Actual</h3>
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
          <p className="text-sm opacity-90">{pointsToNextLevel} pts para Nv.{level + 1}</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Trophy size={32} />
            <span className="text-3xl font-bold">{totalPoints}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Puntos Totales</h3>
          <p className="text-sm opacity-90">+{tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0)} esta semana</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Flame size={32} />
            <span className="text-3xl font-bold">{studyStreak.current}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Racha Actual</h3>
          <p className="text-sm opacity-90">Máximo: {studyStreak.longest} días</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Target size={32} />
            <span className="text-3xl font-bold">{completionPercentage}%</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Progreso Semanal</h3>
          <p className="text-sm opacity-90">{completedTasks} de {totalTasks} tareas</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Clock size={32} />
            <span className="text-3xl font-bold">{Math.floor(totalEstimatedTime / 60)}h</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Tiempo Restante</h3>
          <p className="text-sm opacity-90">{totalEstimatedTime % 60}min adicionales</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Task List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              📋 Lista de Tareas
            </h2>
            <motion.button
              onClick={() => setShowAddTask(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>Nueva Tarea</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                className={`p-6 rounded-2xl border-l-4 ${getPriorityColor(task.priority)} ${
                  task.completed ? 'opacity-60' : ''
                } shadow-md hover:shadow-lg transition-all`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {task.completed && <CheckCircle size={16} />}
                  </motion.button>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-lg font-semibold ${
                        task.completed 
                          ? 'line-through text-gray-500 dark:text-gray-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {task.title}
                      </h3>
                      <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                      <span className="text-sm">{getCategoryIcon(task.category)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                        {task.difficulty}
                      </span>
                      <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 px-2 py-1 rounded-full text-xs font-bold">
                        +{task.points} pts
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{new Date(task.dueDate).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{task.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen size={16} />
                        <span>{task.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Achievement Showcase */}
          <motion.div
            className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
              🏆 Logros Recientes
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl">🔥</div>
                <div>
                  <div className="font-medium text-sm">Racha de 7 días</div>
                  <div className="text-xs text-gray-500">¡Sigue así!</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl">⚡</div>
                <div>
                  <div className="font-medium text-sm">Quiz Master</div>
                  <div className="text-xs text-gray-500">100% en soldadura</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              📊 Estadísticas Rápidas
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Tareas de alta prioridad:</span>
                <span className="font-bold text-red-500">
                  {tasks.filter(t => t.priority === 'high' && !t.completed).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Vencen hoy:</span>
                <span className="font-bold text-orange-500">
                  {tasks.filter(t => 
                    new Date(t.dueDate).toDateString() === new Date().toDateString() && !t.completed
                  ).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Puntos esta semana:</span>
                <span className="font-bold text-purple-500">
                  +{tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Tiempo total estimado:</span>
                <span className="font-bold text-blue-500">
                  {Math.floor(totalEstimatedTime / 60)}h {totalEstimatedTime % 60}m
                </span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Study Tips */}
          <motion.div
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              💡 Consejos Inteligentes
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <span>🎯</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Completa tareas difíciles primero para ganar más puntos
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span>⏰</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Mantén tu racha estudiando al menos 15 minutos diarios
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span>📚</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Alterna entre teoría y práctica para mejor retención
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span>🏆</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Alcanza el nivel {level + 1} completando {Math.ceil(pointsToNextLevel / 50)} tareas más
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Add Task Modal */}
      {showAddTask && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              ➕ Nueva Tarea de Estudio
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título de la tarea"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              
              <textarea
                placeholder="Descripción (opcional)"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 h-20"
              />
              
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Baja prioridad</option>
                  <option value="medium">Media prioridad</option>
                  <option value="high">Alta prioridad</option>
                </select>
                
                <select
                  value={newTask.difficulty}
                  onChange={(e) => setNewTask({...newTask, difficulty: e.target.value as any})}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Fácil (+25 pts)</option>
                  <option value="medium">Medio (+50 pts)</option>
                  <option value="hard">Difícil (+75 pts)</option>
                </select>
              </div>
              
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Teoría">Teoría</option>
                <option value="Práctica">Práctica</option>
                <option value="Evaluación">Evaluación</option>
                <option value="Lectura">Lectura</option>
              </select>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tiempo estimado: {newTask.estimatedTime} minutos
                </label>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={newTask.estimatedTime}
                  onChange={(e) => setNewTask({...newTask, estimatedTime: Number(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={addTask}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Agregar Tarea
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default StudyPlanner;