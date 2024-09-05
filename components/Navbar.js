"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LuAlignRight } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import Sidebar from "./Sidebar";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GiDungeonLight } from "react-icons/gi";

function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(!open);
  };
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
    <>
      <div className="w-full flex justify-center border-b shadow sticky left-0 bg-background top-0 z-[9999]">
        <nav className="bg-background max-w-[1170px] px-8 xl:px-0 max-[500px]:px-3 w-full py-2 flex justify-evenly items-center max-lg:justify-between">
          <div className="logo flex-1">
            <Link href="/" className="font-bold text-xl sm:text-2xl">
              <GiDungeonLight className="text-3xl" />Next Blog
            </Link>
          </div>
          <ul className="pages hidden gap-8 lg:flex flex-1 justify-center">
            {navItems.map((item) => (
              <li key={item.path} className="capitalize">
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-end items-center gap-6 flex-1  ">
            <div>
              <CiSearch className="text-3xl" />
            </div>
            <div>
              <ModeToggle />
            </div>
            {session ? (
              <Button variant='destructive' onClick={handleSignOutClick} className='max-lg:hidden' disabled={isLoading}>
                {isLoading ? "Signing Out..." : "Sign Out"}
              </Button>
            ) : (
              <Button className='max-lg:hidden' onClick={() => router.push("/auth/sign-in")}>
                Sign In
              </Button>
            )}
            <div className="flex lg:hidden" onClick={handleOpen}>
            <LuAlignRight className="text-3xl" />
            </div>
          </div>
        </nav>
      </div>
      {open && <Sidebar />}
    </>
  );
}

export default Navbar;
