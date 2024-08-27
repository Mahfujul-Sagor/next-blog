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
      session && {
        name: "write",
        path: "/write",
      },
      session && {
        name: "profile",
        path: `/authors/${session.user.id}`,
      },
    ].filter(Boolean);

  return (
    <div className='flex flex-col items-center gap-16 bg-background border-b shadow-lg fixed top-[73px] max-[500px]:top-[100px] right-0 w-[50vw] border-l min-h-screen z-9999 lg:hidden'>
        <ul className="pages w-full mt-10 flex flex-col items-center">
            {navItems.map( (item) => (
                <li key={item.path} className='capitalize py-4 w-full text-center text-sm md:text-base'>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
        {session ? (
          <Button onClick={handleSignOutClick} disabled={isLoading}>
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