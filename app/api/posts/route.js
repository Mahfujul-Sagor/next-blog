import { auth } from "@/auth";
import prisma from "@/db/connect";
import { NextResponse } from "next/server";

// GET endpoint to fetch paginated posts with optional filters for category and author
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1; // Default to 1 if not provided
  const cat = searchParams.get("cat") || ""; // Default to empty string if not provided
  const authorId = searchParams.get("authorId") || undefined; // Optional filter

  const POST_PER_PAGE = 9; // Number of posts per page

  // Construct the query with optional filters
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
      ...(authorId && { userId: authorId }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  };

  try {
    // Fetch posts and count in a single transaction
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    // Format post dates for better readability
    const formattedPosts = posts.map((post) => {
      const date = new Date(post.createdAt);
      return {
        ...post,
        createdAt: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    });

    // Return the posts and count with a 200 status
    return NextResponse.json({ posts: formattedPosts, count }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching posts with pagination query", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};

// POST endpoint to create a new post
export const POST = async (req) => {
  const session = await auth(); // Authenticate the user

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json(); // Parse the request body

    // Validate required fields
    if (!body.title || !body.slug || !body.desc || !body.catSlug) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the specified category exists
    const category = await prisma.category.findUnique({
      where: { slug: body.catSlug },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Create the new post
    const post = await prisma.post.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        desc: body.desc,
        img: body.img,
        slug: body.slug,
        catSlug: body.catSlug,
        userId: session.user.id, // Associate the post with the authenticated user
      },
    });

    // Return the created post with a 201 status
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error while creating post", error);
    return NextResponse.json(
      { message: "Something went wrong while creating post" },
      { status: 500 }
    );
  }
};
