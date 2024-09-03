import prisma from "@/db/connect";
import { NextResponse } from "next/server";

// PUT endpoint to update a post with its id
export const PUT = async (request, { params }) => {
  const { id } = params; // Extract the post id from the request parameters
  // Parse the incoming JSON request body
  const data = await request.json();

  try {
    // Update the post with the new data
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        desc: data.desc,
        img: data.img,
        catSlug: data.catSlug,
        slug: data.slug,
      },
      include: { user: true },
    });

    // Return the formatted post with a 200 status
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log("Error updating post:", error);
    return NextResponse.json(
      { message: 'Failed to update post!' },
      { status: 500 }
    );
  }
};




// Get endpoint to fetch a post by its id
export const GET = async (request, { params }) => {
  const { id } = params; // Extract the post id from the request parameters

  try {
    // Fetch the post details along with the associated user
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: { user: true },
    });

    // If the post is not found, return a 404 response
    if (!post) {
      return NextResponse.json(
        { message: 'Post not found!' },
        { status: 404 }
      );
    }

    // Return the post with a 200 status
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("Error updating post:", error);
    return NextResponse.json(
      { message: 'Failed to update post!' },
      { status: 500 }
    );
  }
};