import { auth } from "@/auth";
import prisma from "@/db/connect";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json(
  //     {message: 'Not Authenticated'},
  //     {status: 401}
  //   );
  // };

  try {
    const body = await req.json();
    const post = await prisma.post.create(
      {
        data: {...body, userEmail: 'mahfujulsagor@gmail.com'},
      }
    );

    return NextResponse.json(post, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {message: 'Something went wrong while creating post'},
      {status: 500}
    );
  }
};