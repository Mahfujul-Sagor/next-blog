import prisma from "@/db/connect";
import { NextResponse } from "next/server";

export const createUser = async (user) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: user,
    });

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
};
