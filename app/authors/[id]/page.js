import Image from 'next/image';
import React from 'react';
import noavatar from '@/public/no-avatar.png'; // Placeholder image for authors without a profile picture
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated'; // Function to verify if the user is authenticated
import { redirect } from 'next/navigation'; // Redirect function from Next.js
import PostCardList from '@/components/PostCardList'; // Component to display a list of posts

// Function to fetch author details based on ID
const getauthor = async (id) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/authors/${id}` || `http://localhost:3000/api/authors/${id}`);

    if (!response.ok) {
      throw new Error('Could not find author');
    }

    const data = await response.json();
    return data; // Return the fetched author data
  } catch (error) {
    console.error('Error fetching author:', error); // Log error if fetching fails
    return null; // Return null if there's an error
  }
}

// Main component to display a single author's page
const SingleAuthor = async ({ params, searchParams }) => {

  const isAuthenticated = await checkIsAuthenticated(); // Check if user is authenticated

  if (!isAuthenticated) {
    redirect('/auth/sign-in'); // Redirect to sign-in if not authenticated
  }

  const { id } = params; // Get author ID from URL parameters
  const page = parseInt(searchParams.page) || 1; // Get current page number from URL or default to 1

  const author = await getauthor(id); // Fetch author details

  if (!author) {
    return <div className='min-h-screen text-center'>No author found</div>; // Show message if no author is found
  }

  return (
    <div className='min-h-screen'>
      <div className='w-full max-w-[1170px] mx-auto flex flex-col gap-10 my-[60px]'>
        {author && (
          <div className='flex flex-col items-center gap-10 text-center'>
            {author.image ? (
              <div className='flex p-6 rounded-full border'>
                <Image src={author.image} alt='Author Image' width={100} height={100} priority={true}  className='rounded-full object-cover'/>
              </div>
            ) : (
              <div className='flex p-6 rounded-full border'>
                <Image src={noavatar} alt='Author Image' width={100} height={100} priority={true} className='rounded-full object-cover'/>
              </div>
            )}
            <div className='w-full max-w-[770px]'>
              <h1 className='text-2xl md:text-3xl font-bold mb-6'>{author.name}</h1>
              <p className='text-gray-500'>{author.bio}</p>
            </div>
          </div>
        )}
        <hr />
        <PostCardList page={page} authorId={id} /> {/* Display list of posts by the author */}
      </div>
    </div>
  );
}

export default SingleAuthor;
