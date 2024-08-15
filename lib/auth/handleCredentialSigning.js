"use server";

import { signIn } from "@/auth";
import prisma from "@/db/connect";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";


export const Register = async (formData) => {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  if (!name || !email || !password) {
    throw new Error('Please fill all the fields');
  }
  // existing user
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    throw new Error('Email already in use');
  }
  // hashing password
  const hashedPassword = await hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error(`Could not create user ${error}`);
  }
  redirect('/auth/sign-in');
};


export const Login = async (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    throw new Error('Please fill all the fields');
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: '/',
      email: email,
      password: password,
    });
  } catch (error) {
    throw new Error('Could not sign in', error);
  }
  redirect('/');
};