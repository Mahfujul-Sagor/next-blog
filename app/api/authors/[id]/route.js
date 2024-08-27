import prisma from "@/db/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {

  const { id } = params;

  try {
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
    }

    return NextResponse.json(author, { status: 200 });
  } catch (error) {
    console.error("Server error fetching author:", error);
    return NextResponse.json(
      { message: 'Server error fetching author' },
      { status: 500 }
    );
  }
};
