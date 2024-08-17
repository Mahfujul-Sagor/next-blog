"use client"

import Image from 'next/image'
import React from 'react'
import image from '@/public/post2.webp'
import user from '@/public/user.webp'
import { LuFileEdit } from "react-icons/lu";

function About() {

  return (
    <div className='min-h-screen'>
      <div className='w-full mt-10 py-10 flex items-center gap-8 max-lg:flex-col'>
        <div className='flex-1'>
          <Image src={image} alt='image' className='rounded-lg'/>
        </div>
        <div className='flex flex-col flex-1'>
          <span className='text-blue-700 text-xl mb-2'>Who we are</span>
          <h1 className='text-4xl font-bold'>
          We provide high quality Articles & blogs
          </h1>
          <p className='text-gray-600 mt-2 pr-8'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ea distinctio in quibusdam dolores officia accusamus nihil nisi, perspiciatis repellendus exercitationem ipsa voluptates officiis suscipit explicabo vero dolore provident dolor!
          </p>
          <p className='text-gray-600 mt-2 pr-8'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ea distinctio in quibusdam dolores officia accusamus nihil nisi, perspiciatis repellendus exercitationem ipsa voluptates officiis suscipit explicabo vero dolore provident dolor!
          </p>
        </div>
      </div>
      <div>
        <div className='mt-10'>
          <h1 className='text-3xl font-semibold mb-6'>Top Authors</h1>
          <hr/>
        </div>

        <div className="authors my-16 flex flex-wrap items-center justify-center gap-8">
          <div className='bg-stone-100 p-5 max-sm:p-3 flex items-center gap-8 max-sm:gap-4 rounded-xl border border-gray-3 w-[25rem] max-sm:flex-col '>
            <div>
              <Image src={user} width={100} height={100} alt='author' className='rounded-full' />
            </div>
            <div>
              <h2 className='text-2xl font-semibold max-sm:text-sm'>Author Name</h2>
              <p className='text-gray-600 text-xs'>Author Type</p>
              <div className='flex items-center text-gray-600 max-sm:text-xs'>
                <LuFileEdit className='text-sm max-sm:text-xs' />
                <p className='ml-1 text-xs'>0 Published posts</p>
              </div>
            </div>
          </div>
          
          <div className='bg-stone-100 p-5 max-sm:p-3 flex items-center gap-8 max-sm:gap-4 rounded-xl border border-gray-3 w-[25rem] max-sm:flex-col '>
            <div>
              <Image src={user} width={100} height={100} alt='author' className='rounded-full' />
            </div>
            <div>
              <h2 className='text-2xl font-semibold max-sm:text-sm'>Author Name</h2>
              <p className='text-gray-600 text-xs'>Author Type</p>
              <div className='flex items-center text-gray-600 max-sm:text-xs'>
                <LuFileEdit className='text-sm max-sm:text-xs' />
                <p className='ml-1 text-xs'>0 Published posts</p>
              </div>
            </div>
          </div>

          <div className='bg-stone-100 p-5 max-sm:p-3 flex items-center gap-8 max-sm:gap-4 rounded-xl border border-gray-3 w-[25rem] max-sm:flex-col '>
            <div>
              <Image src={user} width={100} height={100} alt='author' className='rounded-full' />
            </div>
            <div>
              <h2 className='text-2xl font-semibold max-sm:text-sm'>Author Name</h2>
              <p className='text-gray-600 text-xs'>Author Type</p>
              <div className='flex items-center text-gray-600 max-sm:text-xs'>
                <LuFileEdit className='text-sm max-sm:text-xs' />
                <p className='ml-1 text-xs'>0 Published posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About