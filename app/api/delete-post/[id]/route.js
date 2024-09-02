import prisma from "@/db/connect";
import { NextResponse } from "next/server";

// Delete a post
export const DELETE = async (request, {params}) => {
  const { id } = params; // Extract the post slug from the request parameters

  try {
    // Perform the delete operation
    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    // Check if the post was deleted (this step is technically optional)
    if (!deletedPost) {
      return NextResponse.json(
        { message: 'Post not found!' },
        { status: 404 }
      );
    }

    // Return the formatted post with a 200 status
    return NextResponse.json({ message: 'Post deleted successfully' }, {status: 200});
  } catch (error) {
    console.error('Error deleting post:', error); // Log any errors during the update process
    return NextResponse.json({message: 'Error deleting post'}, {status: 500});
  }
};