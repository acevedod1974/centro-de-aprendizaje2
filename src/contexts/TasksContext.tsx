import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
};

const getInitialTasks = () => {
  const stored = localStorage.getItem(TASKS_STORAGE_KEY);
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
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(studyTasks));
  }, [studyTasks]);

  return (
    <TasksContext.Provider value={{ studyTasks, setStudyTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
