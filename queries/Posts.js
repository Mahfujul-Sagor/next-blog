import { createSlug } from "@/lib/CreateSlug";

// Update a post by id and form data
export const UpdatePost = async (id, data, imageUrl)=> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/edit-post/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        subtitle: data.subtitle,
        desc: data.description,
        img: imageUrl,
        catSlug: data.category || 'style',
        slug: createSlug(data.title),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update post: ${errorText}`);
    }

    const post = await response.json();

    return {
      ok: true,
      slug: post.slug,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: 500,
      message: error.message || 'Failed to update post',
    };
  }
};




// Delete a post
export const DeletePost = async (id) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/delete-post/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Could not delete post: ${errorText}`);
    }

    return {
      ok: true,
      message: 'Post deleted successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'Failed to delete post',
    };
  }
};




// Get post by id
export const GetPostById = async (id) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/edit-post/${id}`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Could not find post: ${errorText}`);
    }

    const post = await response.json();

    return {
      status: 200,
      ok: true,
      data: post,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'Failed to get post',
    };
  }
};