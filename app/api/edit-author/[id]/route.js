import prisma from "@/db/connect";
import { NextResponse } from "next/server";

export const PUT = async (req, {params}) => {
  const { id } = params; // Extract the author id from the request parameters
  // Parse the incoming JSON request body
  const data = await req.json();

  try {
    // Prepare the update data, conditionally including the password
    const updateData = {
      name: data.name,
      bio: data.bio,
      image: data.image,
      ...(data.password && { password: data.password }) // Include password only if present
    };

    // Update the post with the new data
    const updatedPost = await prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    // Return the updated post
    return NextResponse.json(updatedPost, {status: 200});
  } catch (error) {
    // Return a 500 status if an error occurs during the update
    return NextResponse.status(500).json({ error: error.message });
  }
};


// Get endpoint to fetch a author by its id
export const GET = async (request, { params }) => {
  const { id } = params; // Extract the author id from the request parameters

  try {
    // Fetch the author details
    const author = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    // If the author is not found, return a 404 response
    if (!author) {
      return NextResponse.json(
        { message: 'Author not found!' },
        { status: 404 }
      );
    }

    // Return the author with a 200 status
    return NextResponse.json(author, { status: 200 });
  } catch (error) {
    console.log("Error updating author:", error);
    return NextResponse.json(
      { message: 'Failed to update author!' },
      { status: 500 }
    );
  }
};