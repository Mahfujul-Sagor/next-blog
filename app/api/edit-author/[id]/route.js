// TODO: Make this compatible with the edit author page form data

export const PUT = async (req, {params}) => {
  const { id } = params; // Extract the post id from the request parameters
  // Parse the incoming JSON request body
  const data = await req.json();

  try {
    // Update the post with the new data
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        bio: data.bio,
        password: data.password,
        image: data.image,
      },
    });

    // Return the updated post
    return NextResponse.json(updatedPost);
  } catch (error) {
    // Return a 500 status if an error occurs during the update
    return NextResponse.status(500).json({ error: error.message });
  }
};