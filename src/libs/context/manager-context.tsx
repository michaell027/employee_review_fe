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
  isLoadingManager: boolean; // Add loading state for manager
}

const ManagerContext = createContext<ManagerContextType | undefined>(undefined);

export function ManagerProvider({ children }: { children: ReactNode }) {
  const [selectedManager, setSelectedManagerState] = useState<Manager | null>(
    null,
  );
  const [isLoadingManager, setIsLoadingManager] = useState(true); // Initialize as loading

  useEffect(() => {
    // Initialize from localStorage on mount
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("selectedTestUser");
        if (savedUser) {
          setSelectedManagerState(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error loading manager from localStorage:", error);
      } finally {
        // Mark loading as complete regardless of outcome
        setIsLoadingManager(false);
      }
    } else {
      setIsLoadingManager(false);
    }
  }, []);

  const setSelectedManager = (manager: Manager) => {
    setSelectedManagerState(manager);
    localStorage.setItem("selectedTestUser", JSON.stringify(manager));
  };

  return (
    <ManagerContext.Provider
      value={{ selectedManager, setSelectedManager, isLoadingManager }}
    >
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
