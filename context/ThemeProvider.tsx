"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
interface IThemeContext {
  mode: string;
  setMode: (mode: string) => void;
}
const ThemeContext = createContext<IThemeContext | undefined>(undefined);
export function ThemeProvder({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");
  const handleThemeChange = () => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within the theme provider");
  }
  return context;
}
