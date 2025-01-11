"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleSubmit } from "./actions";
import { useActionState } from "react";

export default function Create() {
  const [state, action] = useActionState(handleSubmit, {
    title: null,
  });

  return (
    <section className="flex justify-center items-center min-h-[100vh]">
      <div className="flex justify-center flex-col">
        <h2 className="text-center uppercase font-bold text-sm mb-8">
          Crea tu tarea
        </h2>
        <form action={action} className="w-96 flex flex-col gap-2">
          <Input name="title" />
          {state?.errors && (
            <p className="text-red-500 text-xs">{state.errors}</p>
          )}

          <Button className="mt-8" type="submit">
            Create
          </Button>
        </form>
      </div>
    </section>
  );
}
