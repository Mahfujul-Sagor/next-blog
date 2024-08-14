"use client";

import React from 'react';
import { handleGithubSignIn } from '@/lib/auth/handleGithubSignIn';
import { FaGithub } from "react-icons/fa";


const GithubSignIn = () => {
  return (
    <div className='border rounded-lg flex items-center justify-center'>
      <button onClick={()=> handleGithubSignIn()} className='flex gap-2 items-center justify-center w-full h-full py-4 bg-white hover:bg-stone-50 rounded-lg'>
        <FaGithub className='text-2xl'/>
        Sign in with Google
      </button>
    </div>
  )
}

export default GithubSignIn;