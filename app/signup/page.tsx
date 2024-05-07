"use client";
import { useFormState } from "react-dom";
import { handleSignup } from "../lib/user-actions";
import Link from "next/link";
import ErrorText from "../ui/error-text";
import PasswordField from "../ui/password-field";

export default function Page() {
  const [state, dispatch] = useFormState(handleSignup, null);
  console.log(state);
  return (
    <div>
      <form
        className="min-h-screen flex flex-col items-center  w-min m-auto"
        action={dispatch}
      >
        <h1 className="text-green-600 font-bold text-3xl md:text-5xl my-8">
          Sign - up
        </h1>
        <input
          type="text"
          name="name"
          className="px-4 py-2 my-2 bg-slate-900 border-slate-800 border-2 text-white text-[0.85rem] md:text-[1rem]"
          placeholder="Name"
        />
        <ErrorText state={state} field="name" />
        <input
          type="number"
          name="age"
          className="px-4 py-2 my-2 bg-slate-900 border-slate-800 border-2 text-white text-[0.85rem] md:text-[1rem]"
          placeholder="Age"
        />
        <ErrorText state={state} field="age" />
        <input
          type="email"
          name="email"
          className="px-4 py-2 my-2 bg-slate-900 border-slate-800 border-2 text-white text-[0.85rem] md:text-[1rem]"
          placeholder="E - Mail"
        />
        <ErrorText state={state} field="email" />
        {/* <input
          type="password"
          name="password"
          className="px-4 py-2 my-2 bg-slate-900 border-slate-800 border-2 text-white text-[0.85rem] md:text-[1rem]"
          placeholder="Password"
        /> */}
        <PasswordField />
        <ErrorText state={state} field="password" />
        <p className="text-center text-white">
          Already have an account? <br></br>{" "}
          <Link href={"/login"}>Click to log in</Link>
        </p>
        <button
          className={`
          py-2 px-4 my-2 rounded
          hover:text-green-700 hover:bg-white text-white bg-green-700
          transition-all
          `}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
