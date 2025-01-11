import sleep from "@/lib/sleep";
import { ActionResult } from "next/dist/server/app-render/types";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(3, "minimo 3 caracteres"),
});

export async function handleSubmit(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      title: formData.get("title"),
      isComplete: formData.get("isComplete"),
    };

    formSchema.parse(data);
    await sleep(2000);
    return data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { errors: error.errors[0].message };
    } else {
      console.log("Error inesperado:", error);
    }
  }
}
