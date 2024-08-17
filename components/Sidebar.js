"use client"

import Link from 'next/link'
import React from 'react'


function Sidebar() {

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

  return (
    <div className='hidden border-b shadow-lg fixed top-[90px] right-0 w-[50vw] border-l min-h-screen z-9999 max-lg:flex '>
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

export default Sidebar