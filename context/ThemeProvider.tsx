"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }: ReactNode) {
  const [mode, setMode] = useState("");
  function handleModeChange {
    if(mode==='dark'){
        setMode('light')
        document.documentElement.classList.add('light')
    }
    else{
        setMode('dark')
        document.documentElement.classList.add('dark')
    }
  }

  return(
    <ThemeContext.Provider value={{mode,setMode}}><div></div>{children}</ThemeContext.Provider>
  )
}
