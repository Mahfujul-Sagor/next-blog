import { signIn } from "@/auth";
import { NextResponse } from "next/server";


export const POST = async (request) => {
  const {email, password} = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Please fill all the fields' }, { status: 400 });
  }

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: '/'
    });

    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 401 });
    }

    return NextResponse.json({ message: 'Sign in successful', redirect: '/' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Could not sign in' }, { status: 500 });
  }
};