import { useContext } from "react";
import { AuthTestContext } from "./AuthTestContextContext";

export const useAuthTest = () => {
  const ctx = useContext(AuthTestContext);
  if (!ctx) throw new Error("useAuthTest must be used within AuthTestProvider");
  return ctx;
};
