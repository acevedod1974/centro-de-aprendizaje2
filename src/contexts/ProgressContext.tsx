// This file is now obsolete after context refactor. All logic has been migrated to separate context providers.
// You can safely delete this file.

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface QuizProgress {
  completed: boolean;
  bestScore?: number;
}

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  estimatedTime: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  relatedQuizId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface ProgressContextType {
  userProgress: Record<string, QuizProgress>;
  setUserProgress: React.Dispatch<
    React.SetStateAction<Record<string, QuizProgress>>
  >;
  studyTasks: StudyTask[];
  setStudyTasks: React.Dispatch<React.SetStateAction<StudyTask[]>>;
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  unlockAchievements: (quizId: string, score: number) => void;
  activityLog: Record<string, number>; // date string (YYYY-MM-DD) -> count
  logActivity: () => void;
}

const LOCAL_STORAGE_KEY = "quizUserProgress";
const TASKS_STORAGE_KEY = "studyTasks";
const ACHIEVEMENTS_STORAGE_KEY = "achievements";
const ACTIVITY_LOG_KEY = "activityLog";

const defaultAchievements: Achievement[] = [
  {
    id: "first-quiz",
    title: "¡Primer Quiz!",
    description: "Completaste tu primer evaluación.",
    icon: "🎉",
    unlocked: false,
  },
  {
    id: "all-quizzes",
    title: "Maestro de Módulos",
    description: "Completaste todos los módulos de evaluación.",
    icon: "🏆",
    unlocked: false,
  },
  {
    id: "high-score",
    title: "Puntuación de Élite",
    description: "Obtuviste 90% o más en cualquier evaluación.",
    icon: "⭐",
    unlocked: false,
  },
  {
    id: "perfect-score",
    title: "¡Perfección!",
    description: "Obtuviste 100% en cualquier evaluación.",
    icon: "💯",
    unlocked: false,
  },
];

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
};

const getInitialUserProgress = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // intentionally empty: fallback to default if corrupted
    }
  }
  return {
    soldadura: { completed: false },
    mecanizado: { completed: false },
    conformado: { completed: false },
    fundicion: { completed: false },
    calidad: { completed: false },
    materiales: { completed: false },
    automatizacion: { completed: false },
    seguridad: { completed: false },
    mantenimiento: { completed: false },
    termodinamica: { completed: false },
    diseno: { completed: false },
    fluidos: { completed: false },
  };
};

const getInitialTasks = () => {
  const stored = localStorage.getItem(TASKS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // intentionally empty: fallback to default if corrupted
    }
  }
  return [];
};

const getInitialAchievements = () => {
  const stored = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // intentionally empty: fallback to default if corrupted
    }
  }
  return defaultAchievements;
};

const getInitialActivityLog = () => {
  const stored = localStorage.getItem(ACTIVITY_LOG_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // intentionally empty: fallback to default if corrupted
    }
  }
  return {};
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [userProgress, setUserProgress] = useState<
    Record<string, QuizProgress>
  >(getInitialUserProgress());
  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(getInitialTasks());
  const [achievements, setAchievements] = useState<Achievement[]>(
    getInitialAchievements()
  );
  const [activityLog, setActivityLog] = useState<Record<string, number>>(
    getInitialActivityLog()
  );

  const logActivity = () => {
    const today = new Date().toISOString().split("T")[0];
    setActivityLog((prev) => ({
      ...prev,
      [today]: (prev[today] || 0) + 1,
    }));
  };

  // --- Achievement Unlock Logic ---
  const unlockAchievements = (quizId: string, score: number) => {
    setAchievements((prev) => {
      let updated = [...prev];
      const now = new Date().toLocaleDateString();
      // First quiz completed
      if (
        !updated.find((a) => a.id === "first-quiz")?.unlocked &&
        Object.values(userProgress).filter((q) => q.completed).length === 0
      ) {
        updated = updated.map((a) =>
          a.id === "first-quiz" ? { ...a, unlocked: true, date: now } : a
        );
      }
      // All quizzes completed
      if (
        !updated.find((a) => a.id === "all-quizzes")?.unlocked &&
        Object.values({ ...userProgress, [quizId]: { completed: true } }).every(
          (q) => q.completed
        )
      ) {
        updated = updated.map((a) =>
          a.id === "all-quizzes" ? { ...a, unlocked: true, date: now } : a
        );
      }
      // High score (90+)
      if (
        !updated.find((a) => a.id === "high-score")?.unlocked &&
        score >= 90
      ) {
        updated = updated.map((a) =>
          a.id === "high-score" ? { ...a, unlocked: true, date: now } : a
        );
      }
      // Perfect score (100)
      if (
        !updated.find((a) => a.id === "perfect-score")?.unlocked &&
        score === 100
      ) {
        updated = updated.map((a) =>
          a.id === "perfect-score" ? { ...a, unlocked: true, date: now } : a
        );
      }
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(studyTasks));
  }, [studyTasks]);

  useEffect(() => {
    localStorage.setItem(
      ACHIEVEMENTS_STORAGE_KEY,
      JSON.stringify(achievements)
    );
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(activityLog));
  }, [activityLog]);

  return (
    <ProgressContext.Provider
      value={{
        userProgress,
        setUserProgress,
        studyTasks,
        setStudyTasks,
        achievements,
        setAchievements,
        unlockAchievements,
        activityLog,
        logActivity,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
