import prisma from "@/db/connect";
import { NextResponse } from "next/server"


export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();

    if (!categories.length) {
      console.warn('No categories found in the database');
      return NextResponse.json({ message: "No categories found!" }, { status: 404 });
    }
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}