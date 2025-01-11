"use client";

import { Button } from "@/components/ui/button";
import { createContext, useContext, useState } from "react";

interface CounterContextType {
  addNumber: () => void;
  restNumber: () => void;
  counter: number;
}

const CounterContext = createContext<CounterContextType | null>(null);

export const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("No existe un provider en el contexto");
  }
  return context;
};

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [counter, setCounter] = useState(1);

  const addNumber = () => {
    setCounter((prev) => prev + 1);
  };

  const restNumber = () => {
    setCounter((prev) => prev - 1);
  };

  return (
    <CounterContext.Provider value={{ addNumber, restNumber, counter }}>
      {children}
    </CounterContext.Provider>
  );
};

export function CounterApp() {
  const { addNumber, restNumber, counter } = useCounterContext();

  return (
    <section className="flex gap-2 justify-center mt-4">
      <Button onClick={() => addNumber()}>+</Button>
      <Button onClick={() => restNumber()}>-</Button>

      <div className="flex w-full justify-center gap-2">
        <Button variant={"ghost"} className="size-9">
          {counter}
        </Button>
      </div>
    </section>
  );
}

export default function Root() {
  return (
    <section className="flex justify-center">
      <CounterProvider>
        <CounterApp />
      </CounterProvider>
    </section>
  );
}
