import { Note } from "@prisma/client";
import Link from "next/link";
import NoteCard from "./note-card";
import { Fragment } from "react";

export default function Cards({ notes }: { notes: Note[] }) {
  return (
    <>
      {notes &&
        notes.map((note, idx) => (
          <div key={idx}>
            <Link href={`/note/${note.id}`} className="no-underline">
              <NoteCard
                key={note.id}
                title={note.title || ""}
                content={note.content}
              />
            </Link>
          </div>
        ))}
    </>
  );
}
