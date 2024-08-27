import { auth } from "@/auth";
import prisma from "@/db/connect";
import { NextResponse } from "next/server";


export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) ?? 1;
  const cat = searchParams.get("cat") ?? undefined;

  const POST_PER_PAGE = 9;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && {catSlug: cat}),
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
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({where: query.where}),
    ]);

    return NextResponse.json({posts, count}, {status: 200});
  } catch (error) {
    console.error('Error while fetching post with pagination query', error);
    return NextResponse.json(
      { message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
};



// create a new post
export const POST = async (req) => {

  const session = await auth();

  if (!session) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }

  try {
    const body = await req.json();

    if (!body.title || !body.slug || !body.desc || !body.catSlug) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { slug: body.catSlug },
    });

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        desc: body.desc,
        img: body.img,
        slug: body.slug,
        catSlug: body.catSlug,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json(post, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {message: 'Something went wrong while creating post'},
      {status: 500}
    );
  }
};