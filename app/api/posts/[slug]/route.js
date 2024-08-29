import prisma from "@/db/connect";
import { NextResponse } from "next/server";

// GET endpoint to fetch a post by its slug and increment its view count
export const GET = async (request, { params }) => {
  const { slug } = params; // Extract the post slug from the request parameters

  try {
    // Update the post by incrementing the view count and fetch the post details along with the associated user
    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
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

    // Format the post's creation date for better readability
    const date = new Date(post.createdAt);
    const formattedPost = {
      ...post,
      createdAt: date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    // Return the formatted post with a 200 status
    return NextResponse.json(formattedPost, { status: 200 });
  } catch (error) {
    console.log("Error updating post:", error); // Log any errors during the update process

    // Return a 500 status in case of a server error
    return NextResponse.json(
      { message: 'Failed to update post!' },
      { status: 500 }
    );
  }
};
