"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <section className="flex gap-2 justify-center items-center min-h-[923px]">
      <Button onClick={() => router.push("/create")}>Create Task</Button>
      <Button onClick={() => router.push("/notification")}>
        Notification Task
      </Button>
      <Button onClick={() => router.push("/counter")}>Counter Task</Button>
      <Button onClick={() => router.push("/login")}>Login Task</Button>
      <Button onClick={() => router.push("/products")}>Add Products</Button>
      <Button onClick={() => router.push("/timer")}>Control timer</Button>
      <Button onClick={() => router.push("/todo")}>Todo</Button>
    </section>
  );
}
