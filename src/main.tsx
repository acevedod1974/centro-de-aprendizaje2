import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QuizProgressProvider } from "./contexts/QuizProgressContext";
import { TasksProvider } from "./contexts/TasksContext";
import { AchievementsProvider } from "./contexts/AchievementsContext";
import { ActivityLogProvider } from "./contexts/ActivityLogContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QuizProgressProvider>
        <TasksProvider>
          <AchievementsProvider>
            <ActivityLogProvider>
              <App />
            </ActivityLogProvider>
          </AchievementsProvider>
        </TasksProvider>
      </QuizProgressProvider>
    </BrowserRouter>
  </StrictMode>
);
