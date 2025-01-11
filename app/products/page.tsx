"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  CounterApp,
  CounterProvider,
  useCounterContext,
} from "../counter/page";

interface itemProps {
  id: number;
  value: string;
  counter: number;
}

const CartContext = createContext<{
  addItem: ({ value, counter }: { value: string; counter: number }) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  cart: itemProps[];
} | null>(null);

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Error en contexto");

  return context;
};

const Shop = () => {
  const { addItem } = useCartContext();
  const { counter } = useCounterContext();
  const [fruit, setFruit] = useState<string>();

  const handleFruits = (value: string) => {
    setFruit(value);
  };

  return (
    <section className="flex items-baseline gap-2">
      <Select onValueChange={handleFruits}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <CounterApp />

      <Button
        disabled={!fruit}
        onClick={() => addItem({ value: fruit!, counter })}
      >
        Añadir
      </Button>
    </section>
  );
};

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<itemProps[]>([]);

  const addItem = ({ value, counter }: { value: string; counter: number }) => {
    setCart((prev) => [
      ...prev,
      {
        id: Date.now(),
        value: value,
        counter: counter,
      },
    ]);
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider value={{ addItem, removeItem, clearCart, cart }}>
      {children}
    </CartContext.Provider>
  );
}

function CartApp() {
  const { cart, removeItem, clearCart } = useCartContext();
  return (
    <div>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-1">
          <p className="capitalize">{item.value}</p>
          <p className="font-semibold">{item.counter}</p>
          <Button variant={"ghost"} onClick={() => removeItem(item.id)}>
            X
          </Button>
        </div>
      ))}

      <Button
        className="mt-10"
        variant={"destructive"}
        onClick={() => clearCart()}
      >
        Vaciar Carrito
      </Button>
    </div>
  );
}

export default function Render() {
  return (
    <CartProvider>
      <CounterProvider>
        <section className="px-7">
          <div className="flex w-full justify-center gap-10 mt-10">
            <Shop />
          </div>
          <div className="mt-10 border rounded px-4 gap-2">
            <CartApp />
          </div>
        </section>
      </CounterProvider>
    </CartProvider>
  );
}
