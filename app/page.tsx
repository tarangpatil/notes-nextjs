import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/app/lib/db";
import Cards from "./ui/cards";
import Link from "next/link";

export const metadata = {
  title: "Notes | Home",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/login");
  }
  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const notes = await prismaClient.note.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-green-600 font-bold text-3xl py-4 px-6">
          Hello, {session?.user?.name}
        </h1>
        <form
          action={async (formData: FormData) => {
            "use server";
            await signOut();
          }}
        >
          <button className="bg-green-600 w-max py-2 my-2 px-3 mx-3 rounded">
            Sign-out
          </button>
        </form>
      </header>
      <main>
        <Link
          href={"/create"}
          className="no-underline text-white px-4 py-3 mx-8 bg-green-600 w-fit inline-block rounded"
        >
          Create note
        </Link>
        <div
          className={
            "notes py-6 px-1 box-border grid " +
            "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" +
            " "
          }
        >
          <Cards notes={notes} />
        </div>
      </main>
    </>
  );
}
