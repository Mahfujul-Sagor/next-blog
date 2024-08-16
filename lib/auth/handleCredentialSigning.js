"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


// export const Register = async (formData) => {
//   const name = formData.get('name');
//   const email = formData.get('email');
//   const password = formData.get('password');

//   if (!name || !email || !password) {
//     return NextResponse.json({ message: 'Please fill all the fields' }, { status: 400 });
//   }

//   const response = await fetch(`/api/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name,
//       email,
//       password,
//     }),
//   });

//   if (response.status === 201) {
//     redirect('/auth/sign-in');
//   } else {
//     const errorData = await response.json();
//     return NextResponse.json({ message: errorData.message }, { status: response.status });
//   }
// };


export const Login = async (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return NextResponse.json({ message: 'Please fill all the fields' }, { status: 400 });
  }

  try {
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: '/',
      email,
      password,
    });

    if (result.error) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    redirect('/');
  } catch (error) {
    return NextResponse.json({ message: 'Could not sign in' }, { status: 500 });
  }
};