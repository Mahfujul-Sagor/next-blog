import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@/auth';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST handler to upload images to Cloudinary
export const POST = async (request) => {
  // Authenticate the user
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Parse the form data and retrieve the file
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    // Convert the file to a buffer for upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "nextblog" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Return the result with the public ID and URL of the uploaded image
    return NextResponse.json(
      {
        publicId: result.public_id,
        imageUrl: result.secure_url,
      },
      { status: 200 }
    );

  } catch (error) {
    console.log("Upload image failed", error); // Log errors
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  }
};
