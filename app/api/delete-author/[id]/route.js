import prisma from "@/db/connect";
import { NextResponse } from "next/server";

// Delete a user from the database
export const DELETE = async (request, {params}) => {
  const { id } = params; // Extract the user if from the request parameters

  try {
    // Perform the delete operation
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    // Return 200 status
    return NextResponse.json({ message: 'User deleted successfully' }, {status: 200});
  } catch (error) {
    console.error('Error deleting user:', error); // Log any errors during the update process
      // Handle the specific case where the user doesn't exist
    if (error.code === 'P2025') { // Prisma error code for "Record not found"
      return NextResponse.json(
        { message: 'User not found!' },
        { status: 404 }
      );
    }  
    return NextResponse.json({message: 'Error deleting user'}, {status: 500});
  }
};