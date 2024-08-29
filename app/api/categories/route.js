import prisma from "@/db/connect";
import { NextResponse } from "next/server";

// GET handler to fetch all categories
export const GET = async () => {
  try {
    // Retrieve all categories from the database
    const categories = await prisma.category.findMany();

    // Check if no categories are found
    if (!categories.length) {
      console.warn('No categories found in the database'); // Log a warning
      return NextResponse.json({ message: "No categories found!" }, { status: 404 });
    }

    // Return categories if found
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    // Log and handle any errors that occur
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
