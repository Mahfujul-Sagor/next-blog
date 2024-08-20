"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { IoMenuOutline } from "react-icons/io5";
import Sidebar from './Sidebar';
import Image from 'next/image';
import logo from '@/public/logo.svg'
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';

function Navbar() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

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
    <>
        <div className='w-full flex justify-center border-b'>
            <nav className='sticky max-w-[1170px] backdrop-blur-2xl px-8 xl:px-0 max-[500px]:px-3 top-0 z-9999 w-full py-4 max-[500px]:py-0 flex justify-evenly items-center shadow max-lg:justify-between'>
                <div className="logo flex-1">
                    <Link href='/'>
                        <Image src={logo} alt='logo' priority={true} quality={100} className='max-[500px]:h-[100px] max-[500px]:w-[100px]'/>
                    </Link>
                </div>
                <ul className="pages hidden gap-8 lg:flex flex-1 justify-center">
                    {navItems.map( (item) => (
                        <li key={item.path} className='capitalize'>
                            <Link href={item.path}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='flex justify-end items-center gap-6 flex-1  '>
                    <div><ModeToggle/></div>
                    <Button>Sign In</Button>
                    <div className='flex lg:hidden' onClick={handleOpen}>
                        <IoMenuOutline className='text-3xl'/>
                    </div>
                </div>
            </nav>
        </div>
        {open && (
            <Sidebar/>
        )}
    </>
  )
}

export default Navbar