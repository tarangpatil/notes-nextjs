import prismaClient from "@/app/lib/db";
import EditModal from "@/app/ui/edit-modal";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

type Props = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
};

export default async function Page({ params }: Props) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    redirect("/login");
  }

  const note = await prismaClient.note.findUnique({
    where: {
      id: Number(params.id),
      user: {
        email: session.user.email,
      },
    },
  });

  console.log({ note: note?.id });

  if (!note) {
    return await signOut();
  }

  return (
    <div className="overflow-hidden w-screen h-screen fixed top-0 bg-transparent">
      <EditModal
        session={session}
        title={note.title}
        content={note.content}
        noteId={note.id}
      />
    </div>
  );
}
