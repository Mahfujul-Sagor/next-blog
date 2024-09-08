import prisma from "@/db/connect";
import { hash } from "bcryptjs";
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


// Get author by id
export const GetAuthorById = async (id) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/edit-author/${id}`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Could not find author: ${errorText}`);
    }

    const author = await response.json();

    return {
      status: 200,
      ok: true,
      data: author,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'Failed to get Author',
    };
  }
};



// Update a author by id and form data
export const UpdateAuthor = async (id, data, imageUrl)=> {
  try {
    let hashedPassword;
    
    // Hash the password if it is provided
    if (data.password) {
      hashedPassword = await hash(data.password, 12);
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/edit-author/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        bio: data.bio,
        image: imageUrl,
        // Include the hashed password only if it's defined
        ...(hashedPassword && { password: hashedPassword }),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update author: ${errorText}`);
    }

    const author = await response.json();

    return {
      ok: true,
      id: author.id,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: error.message || 'Failed to update author',
    };
  }
};



// Delete a post
export const DeleteUser = async (id) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/delete-author/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Could not delete user: ${errorText}`);
    }

    return {
      ok: true,
      message: 'User deleted successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Failed to delete User',
    };
  }
};