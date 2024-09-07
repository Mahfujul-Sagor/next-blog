import prisma from "@/db/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url); // Correct way to handle query params
  const query = searchParams.get("query");

  try {
    // Search for posts where the title or user's name contains the query (case-insensitive)
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            user: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        user: true, // Include the associated user data
      },
    });

    // Return an empty array if no posts are found
    if (!posts.length) {
      return NextResponse.json({ message: "No posts found", posts: [] }, { status: 200 });
    }

    // Return the found posts
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Search query failed:", error); // Log the error
    return NextResponse.json({ message: 'Failed to query search' }, { status: 500 });
  }
};
