"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';


function Sidebar() {

    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    const handleSignOutClick = async () => {
      setIsLoading(true);
      try {
        await signOut({ redirect: true, callbackUrl: '/auth/sign-in' });
      } catch (error) {
        console.error("Error during sign-out:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleLinkClick = () => {
        setOpen(false);
    }
  
    useEffect(() => {
      setIsLoading(false);
    }, [session]);

    const navItems = [
      {
        name: "home",
        path: "/",
      },
      {
        name: "about",
        path: "/about",
      },
      {
        name: "write",
        path: "/write",
      },
      session && {
        name: "profile",
        path: `/authors/${session.user.id}`,
      },
    ].filter(Boolean);

  return (
    <div className='flex flex-col items-center gap-16 bg-background/80 backdrop-blur-md border-b shadow-lg fixed top-[79px] right-0 w-[70vw] border-l min-h-screen z-[999] lg:hidden'>
        <ul className="pages w-full font-medium mt-10 flex flex-col items-center">
            {navItems.map( (item) => (
                <li key={item.path} className='capitalize py-4 w-full text-center text-base md:text-xl'>
                    <Link href={item.path} onClick={handleLinkClick}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
        {session ? (
          <Button variant='destructive' onClick={handleSignOutClick} disabled={isLoading}>
            {isLoading ? "Signing Out..." : "Sign Out"}
          </Button>
        ) : (
          <Button onClick={() => router.push("/auth/sign-in")}>
            Sign In
          </Button>
        )}
    </div>
  )
}

export default Sidebar;