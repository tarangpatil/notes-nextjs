"use server";
import { redirect } from "next/navigation";
import prismaClient from "./db";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";

const containsOnlyWhitespace = (str: string) => {
  const whitespaceRegex = /^\s*$/;
  return whitespaceRegex.test(str);
};

export async function createNote(formData: FormData) {
  if (containsOnlyWhitespace(formData.get("content") as string)) {
    redirect("/");
  }
  const user = await prismaClient.user.findUnique({
    where: { email: formData.get("email") as string },
  });
  if (!user) {
    await signOut({ redirectTo: "/login" });
    return;
  }
  const note = await prismaClient.note.create({
    data: {
      title: formData.get("title") as string,
      content: (formData.get("content") as string).trim(),
      userId: user.id,
    },
    include: { user: true },
  });
  redirect("/");
}

export async function updateNote(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const noteId = Number(formData.get("noteId"));
  // const email = formData.get("email") as string;

  const newNote = await prismaClient.note.update({
    data: { content, title },
    where: { id: noteId },
  });
  console.log(newNote);
}
