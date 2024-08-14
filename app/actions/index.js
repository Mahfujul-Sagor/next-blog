"use server";

import { signIn, signOut } from "@/auth";


export const handleGoogleSignIn = async () => {
  try {
    await signIn("google", {redirectTo: "/"});
  } catch (error) {
    throw error;
  }
};

export const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
};