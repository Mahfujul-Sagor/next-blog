import GithubSignIn from '@/components/GithubSignIn';
import GoogleSignIn from '@/components/GoogleSignIn';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import { redirect } from 'next/navigation';
import React from 'react';

const SignIn = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/");
  } else {
    return (
      <div className='w-full min-h-screen flex justify-center items-center px-4'>
        <div className='w-[35rem] flex flex-col gap-10 items-center border rounded-xl px-14 py-16 shadow-xl'>
          <div className='w-full text-center'>
            <h1 className='text-5xl font-semibold mb-4'>Sign in</h1>
            <p className='text-gray-500'>Sign in to your account</p>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <GoogleSignIn/>
            <GithubSignIn/>
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
            <button className='w-full border border-stone-50 text-center py-4 bg-black hover:bg-black/90 text-white font-medium rounded-md'>Sign in</button>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn;