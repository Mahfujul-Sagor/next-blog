import { createUser } from "@/queries/User";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

// POST handler for user registration
export const POST = async (req) => {
  // Extracting name, email, and password from the request body
  const { name, email, password } = await req.json();

  // Hashing the user's password with bcrypt before storing it in the database
  const hashedPassword = await hash(password, 12);

  // Constructing the new user object with the hashed password
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  try {
    // Attempt to create the new user using the createUser function
    const createUserResponse = await createUser(newUser);
    
    // Return the response from createUser, which could be a success or conflict
    return createUserResponse;
  } catch (error) {
    // If an error occurs during user creation, return a 500 status with the error message
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
