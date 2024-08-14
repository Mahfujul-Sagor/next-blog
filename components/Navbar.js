import React from 'react'
import Link from 'next/link'

function Navbar() {

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
            name: 'author',
            path: '/author',
        },
        {
            name: 'privacy-policy',
            path: '/privacy-policy',
        },
    ]

  return (
    <nav className='sticky top-0 z-9999 w-full py-7 px-8 flex justify-evenly items-center shadow-sm'>
        <div className="logo">Logo</div>
        <ul className="pages flex gap-8 text-gray-500 ">
            {navItems.map( (item) => (
                    <li key={item.path} className='hover:text-black capitalize'>
                        <Link href={item.path}>
                            {item.name}
                        </Link>
                    </li>
            ))}
        </ul>
        <button className='bg-gray-900 text-white py-2 px-3 rounded-lg'>Sign In</button>
    </nav>
  )
}

export default Navbar