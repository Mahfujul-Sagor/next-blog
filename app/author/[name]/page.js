import Image from 'next/image';
import React from 'react'
import user from '@/public/user.webp'
import PostCard from '@/components/PostCard';

const SingleAuthor = () => {
  return (
    <div>
      <div className='w-full max-w-[1170px] mx-auto flex flex-col gap-16 mt-[100px] mb-[60px]'>
        <div className='flex flex-col items-center gap-10 text-center'>
          <div className='flex p-6 rounded-full border'>
            <Image src={user} alt='' className='rounded-full object-cover'/>
          </div>
          <div className='w-full max-w-[770px]'>
            <h1 className='text-2xl md:text-3xl font-bold mb-6'>Adrio Devid</h1>
            <p className='text-gray-500'>
              Mario, a co-founder of Acme and the content management system Sanity is an accomplished Staff Engineer with a specialization in Frontend at Vercel. Before his current position, he served as a Senior Engineer at Apple.
            </p>
          </div>
        </div>
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