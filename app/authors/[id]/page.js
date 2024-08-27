import Image from 'next/image';
import React from 'react'
import noavatar from '@/public/no-avatar.png';
import PostCard from '@/components/PostCard';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import { redirect } from 'next/navigation';

const getauthor = async (id) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/authors/${id}` || `http://localhost:3000/api/authors/${id}`);

    if (!response.ok) {
      throw new Error('Could not find author');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

const SingleAuthor = async ({params}) => {

  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  }

  const {id} = params;

  const author = await getauthor(id);

  if (!author) {
    return <div className='min-h-screen'>No author found</div>;
  }

  return (
    <div>
      <div className='w-full max-w-[1170px] mx-auto flex flex-col gap-16 my-[60px]'>
        {author && (
          <div className='flex flex-col items-center gap-10 text-center'>
            {author.image ? (
              <div className='flex p-6 rounded-full border'>
                <Image src={author.image} alt='Author Image' width={100} height={100} className='rounded-full object-cover'/>
              </div>
            ) : (
              <div className='flex p-6 rounded-full border'>
                <Image src={noavatar} alt='Author Image' width={100} height={100} className='rounded-full object-cover'/>
              </div>
            )}
            <div className='w-full max-w-[770px]'>
              <h1 className='text-2xl md:text-3xl font-bold mb-6'>{author.name}</h1>
              <p className='text-gray-500'>{author.bio}</p>
            </div>
          </div>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10'>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
        </div>
      </div>
    </div>
  )
}

export default SingleAuthor;