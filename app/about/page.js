import Image from 'next/image'
import React from 'react'
import image from '@/public/post2.webp'
import user from '@/public/user.webp'
import { LuFileEdit } from "react-icons/lu";
import TopAuthors from '@/components/TopAuthors';

function About() {

  return (
    <div className='min-h-screen flex justify-center'>
      <div className='max-w-[1170px]'>
        <div className='w-full flex justify-center items-center'>
          <div className='w-full mt-10 py-10 flex items-center gap-8 max-lg:flex-col max-w-[1170px]'>
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
        </div>
        <TopAuthors/>
      </div>
    </div>
  )
}

export default About;