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

interface QuizProgressContextType {
  userProgress: Record<string, QuizProgress>;
  setUserProgress: React.Dispatch<
    React.SetStateAction<Record<string, QuizProgress>>
  >;
}

const LOCAL_STORAGE_KEY = "quizUserProgress";

const QuizProgressContext = createContext<QuizProgressContextType | undefined>(
  undefined
);

export const useQuizProgress = () => {
  const ctx = useContext(QuizProgressContext);
  if (!ctx)
    throw new Error("useQuizProgress must be used within QuizProgressProvider");
  return ctx;
};

const getInitialUserProgress = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
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

export const QuizProgressProvider = ({ children }: { children: ReactNode }) => {
  const [userProgress, setUserProgress] = useState<
    Record<string, QuizProgress>
  >(getInitialUserProgress());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProgress));
  }, [userProgress]);

  return (
    <QuizProgressContext.Provider value={{ userProgress, setUserProgress }}>
      {children}
    </QuizProgressContext.Provider>
  );
};
