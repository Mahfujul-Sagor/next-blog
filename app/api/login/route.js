import { signIn } from "@/auth";
import { NextResponse } from "next/server";


export const POST = async (request) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

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

    // Handle redirecting in the client-side
    return NextResponse.json({ message: '', redirect: '/' });
    // the message is empty because the sign in page will show the error messages on the client side
    // so the success message in not necessary
  } catch (error) {
    return NextResponse.json({ message: 'Could not sign in' }, { status: 500 });
  }
};