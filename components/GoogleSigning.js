"use client";

import React from 'react'
import {FcGoogle} from 'react-icons/fc';
import { handleGoogleSignIn } from '@/lib/auth/handleGoogleSignIn';

const GoogleSigning = ({text}) => {
  return (
    <div className='border rounded-lg flex items-center justify-center outline-none'>
      <button onClick={()=> handleGoogleSignIn()} className='flex gap-2 items-center justify-center w-full h-full py-4 rounded-lg'>
        <FcGoogle className='text-2xl'/>
        <span className=''>Sign {text} with Google</span>
      </button>
    </div>
  )
}

export default GoogleSigning;