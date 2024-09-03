import { NextResponse } from "next/server";

export const UploadImage = async (formData)=> {
  const url = `${process.env.BASE_URL || 'http://localhost:3000'}/api/upload-image`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      return NextResponse.json({message: 'Uploading image failed'}, {ok: false});
    }

    const result = await response.json();

    return NextResponse.json(result, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Image upload failed'}, {status: 500});
  }
}