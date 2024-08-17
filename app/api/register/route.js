import { createUser } from "@/queries/User";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";


export const POST = async (req)=> {
  const {name, email, password} = await req.json();

  const hashedPassword = await hash(password, 12);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  }

  try {
    const createUserResponse = await createUser(newUser);
    return createUserResponse;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};