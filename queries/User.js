import prisma from "@/db/connect";
import { NextResponse } from "next/server";

// Function to create a new user in the database
export const createUser = async (user) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    // If the email is already in use, return a 409 conflict response
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }

    // Create a new user in the database with the provided data
    const newUser = await prisma.user.create({
      data: user,
    });

    // Return a 201 status with the newly created user data
    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error); // Log any errors encountered during the process

    // Return a 500 status in case of an internal server error
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
};
