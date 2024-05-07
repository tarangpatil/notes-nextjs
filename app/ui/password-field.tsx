import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordField() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  return (
    <div className="relative">
      <input
        type={isVisible ? "text" : "password"}
        placeholder="Password"
        name="password"
        className="px-4 py-2 my-2 bg-slate-900 border-slate-800 border-2 text-white text-[0.85rem] md:text-[1rem]"
      />
      {isVisible ? (
        <FaEyeSlash
          className="text-black dark:text-white absolute top-1/2 -translate-y-1/2 right-4 text-xl"
          onClick={() => setIsVisible((i) => !i)}
        />
      ) : (
        <FaEye
          className="text-black dark:text-white absolute top-1/2 -translate-y-1/2 right-4 text-xl"
          onClick={() => setIsVisible((i) => !i)}
        />
      )}
    </div>
  );
}
