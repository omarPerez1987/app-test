"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { CircleChevronLeft, House } from "lucide-react";
import { useState, createContext, ReactNode, useContext } from "react";

// Contexto
const ThemeContext = createContext<{
  theme: string;
  toogleTheme: () => void;
} | null>(null);

// Hook personalizado
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("No existe contexto");
  return context;
};

// Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>("light");

  function toogleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Componente Nav
export default function Nav() {
  const router = useRouter();
  const { theme, toogleTheme } = useThemeContext();

  return (
    <div
      className={`bg-gray-700 ${theme} flex items-center justify-between px-6`}
    >
      <div>
        <Button
          variant={"ghost"}
          className="font-bold"
          onClick={() => router.push("/")}
        >
          <House color="white" />
        </Button>

        <Button
          variant={"ghost"}
          className="font-bold"
          onClick={() => router.back()}
        >
          <CircleChevronLeft color="white" />
        </Button>
      </div>
      <Switch onClick={toogleTheme} />
    </div>
  );
}
