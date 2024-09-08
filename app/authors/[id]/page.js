"use client";
import Image from 'next/image';
import React from 'react';
import noavatar from '@/public/no-avatar.png'; // Placeholder image for authors without a profile picture
import PostCardList from '@/components/PostCardList'; // Component to display a list of posts
import AuthorMenu from '@/components/AuthorMenu';
import { MotionDiv, MotionH1, MotionP } from '@/components/animation/Animate';
import { Skeleton } from '@/components/ui/skeleton';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

// Function to fetch author details based on ID
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Could not find author');
  return response.json();
};

// Main component to display a single author's page
const SingleAuthor = ({ params, searchParams }) => {
  const {data: session} = useSession();

  const { id } = params; // Get author ID from URL parameters
  const page = parseInt(searchParams.page) || 1; // Get current page number from URL or default to 1

  const url = `${process.env.BASE_URL || 'http://localhost:3000'}/api/authors/${id}`
  // Using SWR to fetch author data
  const { data: author, error, isLoading } = useSWR(url, fetcher);

  if (error) {
    return <div className='min-h-screen flex justify-center items-center'>No author found</div>; // Show message if no author is found
  }

  return (
    <div className='min-h-screen'>
      <div className='w-full max-w-[1170px] mx-auto flex flex-col gap-10 my-[60px]'>
        {/* Skeleton loader while author data is loading */}
        {isLoading ? (
          <div className='flex flex-col items-center gap-10 text-center'>
            <div className='relative flex p-6 rounded-full border'>
              <Skeleton className='w-[100px] h-[100px] rounded-full' />
            </div>
            <div className='w-full max-w-[770px]'>
              <Skeleton className='h-8 w-[60%] mb-6' />
              <Skeleton className='h-6 w-[80%]' />
            </div>
          </div>
        ) : (
          author && (
            <div className='flex flex-col items-center gap-10 text-center'>
              <MotionDiv 
                initial={{scale: 0.8, opacity: 0}}
                whileInView={{scale: 1, opacity: 1}}
                transition={{duration: 0.2}}
                className='relative flex p-6 rounded-full border'>
                <Image src={author.image || noavatar} alt='Author Image' width={100} height={100} priority={true} className='rounded-full object-cover'/>
                {author.id === session?.user?.id && <div className="absolute top-0 -right-2">
                  <AuthorMenu id={author.id} />
                </div>}
              </MotionDiv>
              <div className='w-full max-w-[770px]'>
                <MotionH1 
                  initial={{y: -20, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  transition={{duration: 0.2}}
                  className='text-2xl md:text-3xl font-bold mb-6'>{author.name}</MotionH1>
                {author.bio && <MotionP 
                  initial={{y: -20, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  transition={{duration: 0.2}}
                  className='text-gray-500 capitalize'>{author.bio}.</MotionP>}
              </div>
            </div>
          )
        )}
        <hr />
        <PostCardList page={page} authorId={id} />
      </div>
    </div>
  );
}

export default SingleAuthor;
