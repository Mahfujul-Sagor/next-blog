"use client";

import GithubSigning from '@/components/GithubSigning';
import GoogleSigning from '@/components/GoogleSigning';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
  
    if (!name || !email || !password) {
      console.error('Please fill all the fields');
      return;
    }
  
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 201) {
        router.push('/auth/sign-in');
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Could not register:', error);
    }
  };
  return (
    <div className='w-full min-h-screen flex justify-center items-center px-4'>
        <div className='w-[35rem] flex flex-col gap-10 items-center border rounded-xl px-14 py-16 shadow-xl max-sm:px-10 max-sm:py-12 max-sm:w-[30rem]'>
          <div className='w-full text-center'>
            <h1 className='text-5xl font-semibold mb-4'>Sign up</h1>
            <p className='text-gray-500'>Sign up for your account</p>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <GoogleSigning text='up'/>
            <GithubSigning text='up'/>
          </div>
          <div className='w-full flex justify-center items-center gap-1'>
            <div className='flex-1 h-[1px] bg-gray-500'></div>
            <div className='flex-1 text-gray-500 text-sm text-center'>Or with credentials</div>
            <div className='flex-1 h-[1px] bg-gray-500'></div>
          </div>
          <form onSubmit={handleSubmit} className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="name" className='font-medium text-sm text-gray-700'>Name</label>
                <input type="text" id='name' name='name' placeholder='Enter your name' className='border rounded-lg px-6 py-4' />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="email" className='font-medium text-sm text-gray-700'>Email</label>
                <input type="email" id='email' name='email' placeholder='Enter your email' className='border rounded-lg px-6 py-4' />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="password" className='font-medium text-sm text-gray-700'>Password</label>
                <input type="password" id='password' name='password' placeholder='Enter your password' className='border rounded-lg px-6 py-4' />
              </div>
              <button type='submit' className='w-full border border-stone-50 text-center py-4 bg-black hover:bg-black/90 text-white font-medium rounded-md'>Sign up</button>
            </div>
          </form>
          <p>Already have an account? <Link href='/auth/sign-in' className='text-blue-600'>Sign in</Link></p>
        </div>
      </div>
  )
}

export default SignUp;