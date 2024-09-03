import { NextResponse } from "next/server";

// Delete a post
export const DeletePost = async (id)=> {
  try {
    const url = `${process.env.BASE_URL || 'http://localhost:3000'}/api/delete-post/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return NextResponse.json({message: 'Could not delete post'}, {ok: false});
    }

    return NextResponse.json({message: 'Post deleted successfully'}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Failed to delete post'}, {status: 500});
  }
};