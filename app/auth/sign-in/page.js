import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import { FaGithub } from "react-icons/fa";

const SignIn = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center px-4'>
      <div className='w-[35rem] flex flex-col gap-10 items-center border rounded-xl px-14 py-16'>
        <div className='w-full text-center'>
          <h1 className='text-5xl font-semibold mb-4'>Sign in</h1>
          <p className='text-gray-500'>Sign in to your account</p>
        </div>
        <div className='w-full flex flex-col gap-4'>
          <div className='border rounded-lg flex items-center justify-center'>
            <button className='flex gap-2 items-center justify-center  w-full h-full py-4'>
              <FcGoogle className='text-2xl'/>
              Sign in with Google
            </button>
          </div>
          <div className='border rounded-lg flex items-center justify-center'>
            <button className='flex gap-2 items-center justify-center w-full h-full py-4'>
              <FaGithub className='text-2xl'/>
              Sign in with Google
            </button>
          </div>
        </div>
        <div className='w-full flex justify-center items-center gap-1'>
          <div className='flex-1 h-[1px] bg-gray-500'></div>
          <div className='flex-1 text-gray-500 text-sm text-center'>Or sign in with email</div>
          <div className='flex-1 h-[1px] bg-gray-500'></div>
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="email" className='font-medium text-sm text-gray-700'>Email</label>
            <input type="email" id='email' placeholder='Enter your email' className='border rounded-lg px-6 py-4' />
          </div>
          <button className='w-full text-center py-4 bg-black text-white font-medium rounded-md'>Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn;