"use client";
import { handleLogin } from "@/app/lib/user-actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import ErrorText from "@/app/ui/error-text";
import PasswordField from "../ui/password-field";

export default function LoginForm() {
  const [state, dispatch] = useFormState(handleLogin, null);

  return (
    <form
      action={dispatch}
      className="min-h-screen flex flex-col items-center w-max m-auto"
    >
      <h1 className="text-green-600 font-bold text-3xl md:text-5xl my-8">
        Login - in
      </h1>
      <input
        type="email"
        name="email"
        className="px-4 py-2 my-2 bg-slate-900 border-slate-800 border-2 text-white text-[0.85rem] md:text-[1rem]"
        placeholder="E - Mail"
      />
      <ErrorText state={state} field="email" />
      <PasswordField />
      <ErrorText state={state} field="password" />
      <p className="text-white">
        New here? <Link href={"/signup"}>Click to sign up</Link>
      </p>
      <button
        className={`
      py-2 px-4 my-2 rounded
      hover:text-green-700 hover:bg-white text-white bg-green-700
      transition-all
      `}
      >
        Log in
      </button>
    </form>
  );
}
