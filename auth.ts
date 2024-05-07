import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismaClient from "@/app/lib/db";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: {},
        email: {},
        password: {},
      },
      async authorize(credentials, request) {
        const user = await prismaClient.user.findFirst({
          where: { email: credentials.email as string },
        });
        if (!user) {
          throw new Error("User not found");
        }
        if (
          !(await bcrypt.compare(
            credentials.password as string,
            user?.password
          ))
        ) {
          throw new Error("Wrong password");
        }
        return user as any;
      },
    }),
  ],
  callbacks: {},
});
