import React, { createContext, useState, useEffect, ReactNode } from "react";
import { safeGetItem, safeSetItem } from "../utils/safeStorage";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

interface AchievementsContextType {
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  unlockAchievements: (
    quizId: string,
    score: number,
    userProgress: Record<string, { completed: boolean }>
  ) => void;
}

const ACHIEVEMENTS_STORAGE_KEY = "achievements";

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

const AchievementsContext = createContext<AchievementsContextType | undefined>(
  undefined
);

const getInitialAchievements = () => {
  const stored = safeGetItem(ACHIEVEMENTS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback to default if corrupted
      return defaultAchievements;
    }
  }
  return defaultAchievements;
};

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(
    getInitialAchievements()
  );

  const unlockAchievements = (
    quizId: string,
    score: number,
    userProgress: Record<string, { completed: boolean }>
  ) => {
    setAchievements((prev) => {
      let updated = [...prev];
      const now = new Date().toLocaleDateString();
      if (
        !updated.find((a) => a.id === "first-quiz")?.unlocked &&
        Object.values(userProgress).filter((q) => q.completed).length === 0
      ) {
        updated = updated.map((a) =>
          a.id === "first-quiz" ? { ...a, unlocked: true, date: now } : a
        );
      }
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
      if (
        !updated.find((a) => a.id === "high-score")?.unlocked &&
        score >= 90
      ) {
        updated = updated.map((a) =>
          a.id === "high-score" ? { ...a, unlocked: true, date: now } : a
        );
      }
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
    safeSetItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
  }, [achievements]);

  return (
    <AchievementsContext.Provider
      value={{ achievements, setAchievements, unlockAchievements }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};

export { AchievementsContext };
