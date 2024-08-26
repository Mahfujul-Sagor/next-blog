"use server";

import { signOut } from "@/auth";


export const handleSignOut = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: '/auth/sign-in' });
  } catch (error) {
    throw error;
  }
};