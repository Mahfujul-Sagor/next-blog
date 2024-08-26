import Link from 'next/link';
import React from 'react'

const SideMenuCat = () => {
  return (
    <div className='max-w-[370px] rounded-lg border p-4 sm:p-8 lg:p-10 flex flex-col gap-8'>
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
    </div>
  )
}

export default SideMenuCat;