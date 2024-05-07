import { FaExclamationCircle } from "react-icons/fa";
import { signupState } from "@/app/lib/user-actions";

export default function ErrorText({
  state,
  field,
}: {
  state: signupState | null | void;
  field: "name" | "age" | "email" | "password";
}) {
  return (
    <>
      {state?.errors &&
        state.errors[field]?.map((i, idx) => (
          <p
            key={idx}
            className="text-red-500 text-sm w-full px-3 flex items-center"
          >
            <FaExclamationCircle className="w-4 h-4 text-red-600" />
            {i}
          </p>
        ))}
    </>
  );
}
