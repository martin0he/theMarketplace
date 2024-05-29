// src/ThemeContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { themes } from "./assets/Colors";

interface ThemeContextType {
  theme: typeof themes.theme1;
  switchTheme: (themeName: keyof typeof themes) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(themes.theme1);

  const switchTheme = (themeName: keyof typeof themes) => {
    setTheme(themes[themeName]);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
