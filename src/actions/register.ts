"use server";

import { connectToDatabase } from "@/library/connection";
import User from "@/library/models/userModel";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
  const name = formData.get("name") as string | undefined;
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  if (!email || !name || !password) {
    throw new Error("Please Fill Out All The Fields");
  }

  //   Database connection
  connectToDatabase();

  const user = await User.findOne({ email });

  if (user) throw new Error("User Already Exists");

  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });
  redirect("/login");
};
