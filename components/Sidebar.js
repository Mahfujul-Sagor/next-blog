"use client"

import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'


function Sidebar() {

    const {theme} = useTheme();

    const navItems = [
        {
            name: 'home',
            path: '/',
        },
        {
            name: 'about',
            path: '/about',
        },
        {
            name: 'privacy-policy',
            path: '/privacy-policy',
        },
    ]

    const divClass = theme === 'light' ? 'bg-white' : 'bg-[#020817]';

  return (
    <div className={`flex ${divClass} border-b shadow-lg fixed top-[74px] right-0 w-[50vw] border-l min-h-screen z-9999 lg:hidden`}>
        <ul className="pages w-full mt-10 flex flex-col items-center">
            {navItems.map( (item) => (
                <li key={item.path} className='capitalize py-4 w-full text-center'>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Sidebar;