import Link from 'next/link';
import React from 'react'
import { MotionDiv } from './animation/Animate';

const SideMenuCat = () => {
  return (
    <MotionDiv 
    initial={{scale: 0.8, opacity: 0}}
    whileInView={{scale: 1, opacity: 1}}
    transition={{duration: 0.5}}
    viewport={{once: true}} className='max-w-[370px] rounded-lg border p-4 sm:p-8 lg:p-10 flex flex-col gap-8'>
      <h2 className='capitalize font-mediun text-2xl'>Explore Topics</h2>
      <div className='flex flex-col gap-8'>
        <div className='flex justify-between items-center'>
          <Link href='' className='capitalize'>Health</Link>
          <div><span className='p-2 rounded-full border'>03</span></div>
        </div>
        <div className='flex justify-between items-center'>
          <Link href='' className='capitalize'>Travel</Link>
          <div><span className='p-2 rounded-full border'>03</span></div>
        </div>
        <div className='flex justify-between items-center'>
          <Link href='' className='capitalize'>Lifestyle</Link>
          <div><span className='p-2 rounded-full border'>03</span></div>
        </div>
        <div className='flex justify-between items-center'>
          <Link href='' className='capitalize'>Culture</Link>
          <div><span className='p-2 rounded-full border'>03</span></div>
        </div>
        <div className='flex justify-between items-center'>
          <Link href='' className='capitalize'>Technology</Link>
          <div><span className='p-2 rounded-full border'>03</span></div>
        </div>
      </div>
    </MotionDiv>
  )
}

export default SideMenuCat;