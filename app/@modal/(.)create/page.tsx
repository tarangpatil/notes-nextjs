import CreateModal from "@/app/ui/create-modal";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page({}) {
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect("/login");
  }
  return (
    <div className="overflow-hidden w-screen h-screen fixed top-0">
      <CreateModal session={session} />
    </div>
  );
}
