import { auth } from "@/auth";
import prisma from "@/db/connect";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {message: 'Not Authenticated'},
      {status: 401}
    );
  };

  try {
    const body = await req.json();
    console.log("Request body:", body);

    // Make sure the required fields are present
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

    console.log("Created post:", post);

    return NextResponse.json(post, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {message: 'Something went wrong while creating post'},
      {status: 500}
    );
  }
};