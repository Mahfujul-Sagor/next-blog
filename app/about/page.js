import Image from 'next/image'
import React from 'react'
import image from '@/public/post2.webp'
import TopAuthors from '@/components/TopAuthors';
import { MotionDiv } from '@/components/animation/Animate';

function About() {

  return (
    <div className='min-h-screen flex justify-center'>
      <MotionDiv 
      initial={{scale: 0.8, opacity: 0}}
      animate={{scale: 1, opacity: 1}}
      transition={{duration: 0.5}}
      className='max-w-[1170px]'>
        <div className='w-full flex justify-center items-center'>
          <div className='w-full mt-10 py-10 flex items-center gap-8 max-lg:flex-col max-w-[1170px]'>
            <div className='flex-1'>
              <Image src={image} width={700} height={700} priority={true} alt='image' className='rounded-lg object-cover w-full'/>
            </div>
            <div className='flex flex-col flex-1'>
              <span className='text-blue-700 text-xl mb-2'>Who we are</span>
              <h1 className='text-4xl font-bold'>
              We provide high quality Articles & blogs
              </h1>
              <p className='text-gray-600 mt-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ea distinctio in quibusdam dolores officia accusamus nihil nisi, perspiciatis repellendus exercitationem ipsa voluptates officiis suscipit explicabo vero dolore provident dolor!
              </p>
              <p className='text-gray-600 mt-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ea distinctio in quibusdam dolores officia accusamus nihil nisi, perspiciatis repellendus exercitationem ipsa voluptates officiis suscipit explicabo vero dolore provident dolor!
              </p>
            </div>
          </div>
        </div>
        <TopAuthors/>
      </MotionDiv>
    </div>
  )
}

export default About;