import { useContext } from "react";
import { AchievementsContext } from "./AchievementsContext";

export const useAchievements = () => {
  const ctx = useContext(AchievementsContext);
  if (!ctx)
    throw new Error("useAchievements must be used within AchievementsProvider");
  return ctx;
};
