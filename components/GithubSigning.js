"use client";

import React from 'react';
import { handleGithubSignIn } from '@/lib/auth/handleGithubSignIn';
import { FaGithub } from "react-icons/fa";


const GithubSigning = ({text}) => {
  return (
    <div className='border rounded-lg flex items-center justify-center'>
      <button onClick={()=> handleGithubSignIn()} className='flex gap-2 items-center justify-center w-full h-full py-4 rounded-lg'>
        <FaGithub className='text-2xl'/>
        <span className=''>Sign {text} with Github</span>
      </button>
    </div>
  )
}

export default GithubSigning;