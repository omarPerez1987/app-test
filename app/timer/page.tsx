"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play, TimerReset } from "lucide-react";
import { useRef, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `
    ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}
    `;
  };

  return { startTimer, pauseTimer, resetTimer, time, isRunning, formatTime };
};

export default function Render() {
  const { startTimer, pauseTimer, resetTimer, formatTime, isRunning } =
    useTimer();

  return (
    <section className="flex flex-col gap-7 justify-center items-center mt-10">
      <div className="flex gap-2">
        <Button
          className={isRunning ? "bg-green-800" : ""}
          onClick={() => startTimer()}
        >
          <Play />
        </Button>
        <Button
          className={!isRunning ? "bg-green-800" : ""}
          onClick={() => pauseTimer()}
        >
          <Pause />
        </Button>
        <Button onClick={() => resetTimer()}>
          <TimerReset />
        </Button>
      </div>

      <div>
        <p className="font-bold">{formatTime()}</p>
      </div>
    </section>
  );
}
