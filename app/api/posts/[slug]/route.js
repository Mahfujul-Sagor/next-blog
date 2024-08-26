import { auth } from "@/auth";
import prisma from "@/db/connect";
import { NextResponse } from "next/server";


export const GET = async (request, {params}) => {

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {message: "Not Authenticated"},
      {status: 401}
    );
  }

  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        }
      },
      include: { user: true },
    });

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found!' },
        { status: 404 }
      );
    }

    const date = new Date(post.createdAt);
    const formattedPost = {
      ...post,
      createdAt: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    return NextResponse.json(formattedPost, {status: 200});
  } catch (error) {
    console.log("Error updating post:", error);
    return NextResponse.json(
      {message: 'Failed to update post!'},
      {status: 500},
    );
  }
}