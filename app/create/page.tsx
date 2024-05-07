// import Link from "next/link";
// import { createNote } from "@/app/lib/note-actions";
// import { auth } from "@/auth";
import { redirect } from "next/navigation";

// export const metadata = {
//   title: "Create a note",
// };

export default async function Page() {
  redirect("/");
  // const session = await auth();
  // if (!session || !session.user?.email) {
  //   redirect("/login");
  // }
  // return (
  //   <div className="h-screen">
  //     <form
  //       className=" flex flex-col items-start h-full p-8"
  //       action={createNote}
  //     >
  //       <input type="hidden" name="email" value={session.user.email} />
  //       <input
  //         className="no-outline w-full px-4 py-2 my-2 bg-slate-900 rounded text-white outline-green-300"
  //         placeholder="Title"
  //         type="text"
  //         name="title"
  //       />
  //       <textarea
  //         className="no-outline w-full px-4 py-2 my-2 h-3/4 bg-slate-900 rounded text-white outline-green-300"
  //         placeholder="Content"
  //         name="content"
  //       ></textarea>
  //       <div className="flex justify-end w-full px-8 py-2">
  //         <Link
  //           href={"/"}
  //           className="text-white bg-gray-600 py-2 px-2 rounded no-underline mx-1 w-32 text-center"
  //         >
  //           Cancel
  //         </Link>
  //         <input
  //           type="submit"
  //           value={"Create Note"}
  //           className="text-white bg-green-600 py-2 px-2 rounded mx-1 w-32 text-center cursor-pointer"
  //           // disabled
  //         />
  //       </div>
  //     </form>
  //   </div>
  // );
}
