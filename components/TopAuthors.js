import Image from 'next/image';
import React from 'react'
import { LuFileEdit } from 'react-icons/lu';
import noavatar from '@/public/no-avatar.png'
import { MotionDiv } from './animation/Animate';


const TopAuthors = () => {
  return (
    <div className='w-full max-w-[1170px]'>
      <MotionDiv 
      initial={{y: -20, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 0.5}}
      className='mt-10'>
        <h1 className='text-3xl font-semibold mb-6'>Top Authors</h1>
        <hr/>
      </MotionDiv>
      <div className="authors w-full my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        <MotionDiv 
        initial={{scale: 0.8, opacity: 0}}
        whileInView={{scale: 1, opacity: 1}}
        transition={{duration: 0.5}}
        className='p-5 max-sm:p-3 flex items-center gap-8 max-sm:gap-4 rounded-3xl border border-gray-3 max-sm:flex-col'>
          <div>
            <Image src={noavatar} width={100} height={100} alt='author' className='rounded-full' />
          </div>
          <div>
            <h2 className='text-2xl font-semibold max-sm:text-sm'>Author Name</h2>
            <p className='text-gray-600 text-xs'>Author Type</p>
            <div className='flex items-center text-gray-600 max-sm:text-xs'>
              <LuFileEdit className='text-sm max-sm:text-xs' />
              <p className='ml-1 text-xs'>0 Published posts</p>
            </div>
          </div>
        </MotionDiv>
    
        <MotionDiv 
        initial={{scale: 0.8, opacity: 0}}
        whileInView={{scale: 1, opacity: 1}}
        transition={{duration: 0.5}}
        className='p-5 max-sm:p-3 flex items-center gap-8 max-sm:gap-4 rounded-3xl border border-gray-3 max-sm:flex-col'>
          <div>
            <Image src={noavatar} width={100} height={100} alt='author' className='rounded-full' />
          </div>
          <div>
            <h2 className='text-2xl font-semibold max-sm:text-sm'>Author Name</h2>
            <p className='text-gray-600 text-xs'>Author Type</p>
            <div className='flex items-center text-gray-600 max-sm:text-xs'>
              <LuFileEdit className='text-sm max-sm:text-xs' />
              <p className='ml-1 text-xs'>0 Published posts</p>
            </div>
          </div>
        </MotionDiv>
        <MotionDiv 
        initial={{scale: 0.8, opacity: 0}}
        whileInView={{scale: 1, opacity: 1}}
        transition={{duration: 0.5}}
        className='p-5 max-sm:p-3 flex items-center gap-8 max-sm:gap-4 rounded-3xl border border-gray-3 max-sm:flex-col'>
          <div>
            <Image src={noavatar} width={100} height={100} alt='author' className='rounded-full' />
          </div>
          <div>
            <h2 className='text-2xl font-semibold max-sm:text-sm'>Author Name</h2>
            <p className='text-gray-600 text-xs'>Author Type</p>
            <div className='flex items-center text-gray-600 max-sm:text-xs'>
              <LuFileEdit className='text-sm max-sm:text-xs' />
              <p className='ml-1 text-xs'>0 Published posts</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  )
}

export default TopAuthors;