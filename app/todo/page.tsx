"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  createContext,
  ReactNode,
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { handleSubmit } from "../create/actions";

interface TaskProps {
  id: number;
  title: string;
  isComplete: boolean;
}

const TodoContext = createContext<{
  tasks: TaskProps[];
  addTask: (data: TaskProps) => void;
  removeTask: (id: number) => void;
  toogleTask: (id: number) => void;
} | null>(null);

const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("Error context");

  return context;
};

function FormTodo() {
  const { addTask } = useTodoContext();

  const [state, action] = useActionState(handleSubmit, {
    title: null,
    isComplete: null,
  });

  useEffect(() => {
    if (state.title) {
      addTask(state);
    }
  }, [state, addTask]);

  return (
    <section className="flex justify-center items-center mt-5">
      <div className="flex justify-center flex-col">
        <h2 className="text-center uppercase font-bold text-sm mb-8">
          Crea tu tarea
        </h2>
        <form action={action} className="w-96 flex flex-col gap-2">
          <Input name="title" />
          {state?.errors && (
            <p className="text-red-500 text-xs">{state.errors}</p>
          )}
          <div>
            <label className="flex justify-between text-sm uppercase">
              Is complete ?
              <Switch name="isComplete" />
            </label>
          </div>

          <Button type="submit">Create</Button>
        </form>
      </div>
    </section>
  );
}

function FormProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const addTask = useCallback(
    ({ title, isComplete }: { title: string; isComplete: boolean }) => {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          title,
          isComplete,
        },
      ]);
    },
    []
  );

  const removeTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toogleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }, []);

  return (
    <TodoContext.Provider value={{ tasks, addTask, removeTask, toogleTask }}>
      {children}
    </TodoContext.Provider>
  );
}

function TodoApp() {
  const { tasks, removeTask, toogleTask } = useTodoContext();
  return (
    <div className="mt-5 px-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border w-40 rounded gap-2 flex flex-col p-2"
        >
          <div>
            <p className="text-xs">{task.title}</p>
            <Switch
              checked={task.isComplete}
              onCheckedChange={() => toogleTask(task.id)}
            />
          </div>
          <Button
            variant={"destructive"}
            size={"xs"}
            className="w-full"
            onClick={() => removeTask(task.id)}
          >
            Eliminar
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function Render() {
  return (
    <>
      <FormProvider>
        <FormTodo />
        <TodoApp />
      </FormProvider>
    </>
  );
}
