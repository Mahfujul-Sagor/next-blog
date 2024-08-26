"use server";

import { auth } from "@/auth";

export const checkIsAuthenticated = async () => {
  const session = await auth();

  if (session && session.user) {
    const currentDate = new Date();
    const expiryDate = new Date(session.expires);

    if (expiryDate > currentDate) {
      return true;
    }
  }

  return false;
};