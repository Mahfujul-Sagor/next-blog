import { auth } from "@/auth";
import prisma from "@/db/connect";
import { NextResponse } from "next/server";


export const GET = async (request, {params}) => {

  const session = await auth();

  if (!session) {
    console.log("No session found. User not authenticated.");
    return NextResponse.json(
      {message: "Not Authenticated"},
      {status: 401}
    );
  }

  const {id} = params;

  try {
    console.log("Fetching author with ID:", id);
    const author = await prisma.user.findUnique({
      where: {
        id: id,
      }
    });

    if (!author) {
      return NextResponse.json(
        { message: 'Author not found!' },
        { status: 404 }
      );
    };

    return NextResponse.json(author, { status: 200});
  } catch (error) {
    console.error("Server error fetching author:", error);
    return NextResponse.json(
      { message: 'Server error fetching author' },
      { status: 500}
    );
  }
};