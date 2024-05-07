import LoginForm from "@/app/ui/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
}
