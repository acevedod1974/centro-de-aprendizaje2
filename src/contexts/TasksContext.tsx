import React, { createContext, useState, useEffect, ReactNode } from "react";
import { safeGetItem, safeSetItem } from "../utils/safeStorage";

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

interface TasksContextType {
  studyTasks: StudyTask[];
  setStudyTasks: React.Dispatch<React.SetStateAction<StudyTask[]>>;
}

const TASKS_STORAGE_KEY = "studyTasks";

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const getInitialTasks = () => {
  const stored = safeGetItem(TASKS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback to default if corrupted
    }
  }
  return [];
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(getInitialTasks());

  useEffect(() => {
    safeSetItem(TASKS_STORAGE_KEY, JSON.stringify(studyTasks));
  }, [studyTasks]);

  return (
    <TasksContext.Provider value={{ studyTasks, setStudyTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext };
