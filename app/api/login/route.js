import { signIn } from "@/auth";
import { NextResponse } from "next/server";

// POST handler for user sign-in
export const POST = async (request) => {
  // Extract email and password from the request body
  const { email, password } = await request.json();

  // Check if both email and password are provided
  if (!email || !password) {
    return NextResponse.json({ message: 'Please fill all the fields' }, { status: 400 });
  }

  try {
    // Attempt to sign in the user using credentials
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: '/'
    });

    // If there is an error, return a 401 status with the error message
    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 401 });
    }

    // Return a success message and redirect URL
    return NextResponse.json({ message: 'Sign in successful', redirect: '/' }, { status: 200 });
  } catch (error) {
    // Handle any unexpected errors
    return NextResponse.json({ message: 'Could not sign in' }, { status: 500 });
  }
};
