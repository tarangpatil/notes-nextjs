"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import prismaClient from "@/app/lib/db";
import { signIn } from "@/auth";

const signInSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Invalid name",
    })
    .min(1, "Please enter your name"),
  age: z
    .number()
    .gt(3, "To use this app you must be more than 3 years old")
    .optional(),
  email: z
    .string({
      required_error: "E-mail is required",
      invalid_type_error: "Invalid E-mail",
    })
    .email(),
  password: z.string().min(6, "Password should have atleast 6 characters"),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "E-mail is required",
      invalid_type_error: "Invalid E-mail",
    })
    .email(),
  password: z.string().min(6, "Password should have atleast 6 characters"),
});

export type signupState = {
  errors: {
    name?: string[];
    age?: string[];
    email?: string[];
    password?: string[];
  };
};
export type loginState = {
  errors: {
    email?: string[];
    password?: string[];
  };
};

export async function handleSignup(
  _prevState: any,
  formData: FormData
): Promise<signupState | void> {
  const validatedFields = signInSchema.safeParse({
    name: formData.get("name"),
    age: Number(formData.get("age")) || undefined,
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success)
    return { errors: validatedFields.error.flatten().fieldErrors };
  const userAlreadyExists =
    (await prismaClient.user.findFirst({
      where: { email: validatedFields.data.email },
    })) !== null;
  if (userAlreadyExists) {
    return { errors: { email: ["Account with this E-mail already exists"] } };
  }
  const { email, name, password, age } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prismaClient.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      age,
    },
  });
  console.log("New user created:", newUser);
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
}

export async function handleLogin(
  prevState: any,
  formData: FormData
): Promise<loginState | void> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success)
    return { errors: validatedFields.error.flatten().fieldErrors };
  const { email, password } = validatedFields.data;
  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) {
    return {
      errors: { email: ["No account found with this E-mail"] },
    };
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return { errors: { password: ["Wrong password"] } };
  }
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
}
