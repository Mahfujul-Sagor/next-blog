import Image from 'next/image';
import React from 'react'
import post1 from '@/public/post1.webp'
import user from '@/public/user.webp'


const PostCard = () => {
  return (
    <div className='flex flex-col gap-6 justify-center'>
      <div className='aspect-[370/280] overflow-hidden rounded-lg'>
        <Image src={post1} alt='' width={400} height={400} className='min-h-full w-full rounded-lg object-cover'/>
      </div>
      <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold'>Wellness Unveiled: Empowering Your Journey to a Balanced and Vibrant Life</h2>
        <p className="text-gray-500 text-sm sm:text-base">In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.</p>
        <div>
          <div className="flex justify-between">
            <div className='flex gap-2 items-center text-gray-500'>
              <div className="">
                <Image src={user} alt="" width={25} height={25} className="rounded-full object-cover"/>
              </div>
              <div>
                <span className="text-sm">Adrio Devid</span>
              </div>
              <div className="text-sm">|</div>
              <div>
                <span className="text-sm">Aug 24 2023</span>
              </div>
            </div>
            <div>
                <span className="rounded-full px-3 py-1 border bg-indigo-400/50">Health</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard;