"use client";
import { useEffect, useRef } from "react";
import { createNote } from "@/app/lib/note-actions";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  session: Session;
};
export default function CreateModal({ session }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  if (!session || !session.user?.email) {
    redirect("/login");
  }
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);
  function handleClose() {
    dialogRef.current?.close();
    router.back();
  }
  return (
    <dialog
      ref={dialogRef}
      className="backdrop:blur-sm w-[90vw] h-[90vh] bg-slate-800 border-black border rounded-lg absolute"
    >
      <form
        className=" flex flex-col items-start h-full p-8"
        action={createNote}
      >
        <input type="hidden" name="email" value={session.user.email} />
        <input
          className="no-outline w-full px-4 py-2 my-2 bg-slate-900 rounded text-white outline-green-300"
          placeholder="Title"
          type="text"
          name="title"
        />
        <textarea
          className="no-outline w-full px-4 py-2 my-2 h-3/4 bg-slate-900 rounded text-white outline-green-300"
          placeholder="Content"
          name="content"
        ></textarea>
        <div className="flex justify-end w-full px-8 py-2">
          <button
            onClick={handleClose}
            className="text-white bg-gray-600 py-2 px-2 rounded no-underline mx-1 w-32 text-center"
          >
            Cancel
          </button>
          <input
            type="submit"
            value={"Create Note"}
            className="text-white bg-green-600 py-2 px-2 rounded mx-1 w-32 text-center cursor-pointer"
          />
        </div>
      </form>
    </dialog>
  );
}
