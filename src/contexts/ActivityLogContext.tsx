import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ActivityLogContextType {
  activityLog: Record<string, number>;
  logActivity: () => void;
}

const ACTIVITY_LOG_KEY = "activityLog";

const ActivityLogContext = createContext<ActivityLogContextType | undefined>(
  undefined
);

export const useActivityLog = () => {
  const ctx = useContext(ActivityLogContext);
  if (!ctx)
    throw new Error("useActivityLog must be used within ActivityLogProvider");
  return ctx;
};

const getInitialActivityLog = () => {
  const stored = localStorage.getItem(ACTIVITY_LOG_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return {};
};

export const ActivityLogProvider = ({ children }: { children: ReactNode }) => {
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

  useEffect(() => {
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(activityLog));
  }, [activityLog]);

  return (
    <ActivityLogContext.Provider value={{ activityLog, logActivity }}>
      {children}
    </ActivityLogContext.Provider>
  );
};
