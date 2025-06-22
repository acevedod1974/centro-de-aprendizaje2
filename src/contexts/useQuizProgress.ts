import { useContext } from "react";
import { QuizProgressContext } from "./QuizProgressContext";

export const useQuizProgress = () => {
  const ctx = useContext(QuizProgressContext);
  if (!ctx)
    throw new Error("useQuizProgress must be used within QuizProgressProvider");
  return ctx;
};
