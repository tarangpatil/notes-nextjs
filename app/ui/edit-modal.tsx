"use client";
import { updateNote } from "../lib/note-actions";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  session: Session | null;
  title: string | null | undefined;
  content: string;
  noteId: bigint;
};

export default function EditModal({ session, title, content, noteId }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleClose() {
    dialogRef.current?.close();
    location.reload();
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:blur-sm w-[90vw] h-[90vh] bg-slate-800 border-black border rounded-lg absolute"
    >
      <form
        ref={formRef}
        className=" flex flex-col items-start h-full p-8"
        action={updateNote}
      >
        <input type="hidden" name="noteId" value={noteId.toString()} />
        <input type="hidden" name="email" value={session.user.email} />
        <input
          className="no-outline w-full px-4 py-2 my-2 bg-slate-900 rounded text-white outline-green-300"
          placeholder="Title"
          defaultValue={title || ""}
          onChange={() => {
            formRef.current?.requestSubmit();
          }}
          type="text"
          name="title"
        />
        <textarea
          className="no-outline w-full px-4 py-2 my-2 h-3/4 bg-slate-900 rounded text-white outline-green-300"
          placeholder="Content"
          name="content"
          defaultValue={content}
          onChange={() => {
            formRef.current?.requestSubmit();
          }}
        ></textarea>
        <div className="flex justify-end w-full px-8 py-2">
          <button
            onClick={handleClose}
            className="text-white bg-gray-600 py-2 px-2 rounded no-underline mx-1 w-32 text-center"
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
}
