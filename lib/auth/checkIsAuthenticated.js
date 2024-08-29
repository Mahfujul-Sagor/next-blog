"use server";

import { auth } from "@/auth";

// Function to check if the user is authenticated and session is valid
export const checkIsAuthenticated = async () => {
  // Retrieve the session using the auth function
  const session = await auth();

  // Check if session exists and has a valid user
  if (session && session.user) {
    const currentDate = new Date();
    const expiryDate = new Date(session.expires);

    // Check if the session has not expired
    if (expiryDate > currentDate) {
      return true; // User is authenticated
    }
  }
  return false; // User is not authenticated or session is expired
};
