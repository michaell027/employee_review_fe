"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Manager } from "@/libs/interfaces/manager";

interface ManagerContextType {
  selectedManager: Manager | null;
  setSelectedManager: (manager: Manager) => void;
}

const ManagerContext = createContext<ManagerContextType | undefined>(undefined);

export function ManagerProvider({ children }: { children: ReactNode }) {
  const [selectedManager, setSelectedManagerState] = useState<Manager | null>(
    null,
  );

  useEffect(() => {
    // Initialize from localStorage on mount
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("selectedTestUser");
      if (savedUser) {
        setSelectedManagerState(JSON.parse(savedUser));
      }
    }
  }, []);

  const setSelectedManager = (manager: Manager) => {
    setSelectedManagerState(manager);
    localStorage.setItem("selectedTestUser", JSON.stringify(manager));
  };

  return (
    <ManagerContext.Provider value={{ selectedManager, setSelectedManager }}>
      {children}
    </ManagerContext.Provider>
  );
}

export function useManager() {
  const context = useContext(ManagerContext);
  if (context === undefined) {
    throw new Error("useManager must be used within a ManagerProvider");
  }
  return context;
}
