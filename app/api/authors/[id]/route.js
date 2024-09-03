// GET endpoint to fetch author details by ID using Prisma

import prisma from "@/db/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;  // Extract author ID from request parameters

  try {
    // Fetch the author by unique ID
    const author = await prisma.user.findUnique({
      where: {
        id: id,
      }
    });

    // If author not found, return 404 status
    if (!author) {
      return NextResponse.json(
        { message: 'Author not found!' },
        { status: 404 }
      );
    }

    // Return the author data with a 200 status
    return NextResponse.json(author, { status: 200 });
  } catch (error) {
    console.error("Server error fetching author:", error);  // Log server error

    // Return a 500 status in case of server error
    return NextResponse.json(
      { message: 'Server error fetching author' },
      { status: 500 }
    );
  }
};

// POST endpoint to create a new author using Prisma