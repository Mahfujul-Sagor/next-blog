"use client";

import GithubSigning from '@/components/GithubSigning';
import GoogleSigning from '@/components/GoogleSigning';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
  
    if (!name || !email || !password) {
      setError('Please fill all the fields');
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
        setError(errorData.message);
        console.error(errorData.message);
      }
    } catch (error) {
      setError('Could not register');
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
              <div className='w-full'>
                <Label htmlFor="name">Name</Label>
                <Input type='text' id='name' name='name' placeholder='name' />
              </div>
              <div className='w-full'>
                <Label htmlFor="email">Email</Label>
                <Input type='email' id='email' name='email' placeholder='email' />
              </div>
              <div className='w-full'>
                <Label htmlFor="password">Password</Label>
                <Input type='password' id='password' name='password' placeholder='password' className='py-2' />
              </div>
              {error && <p className='text-red-500'>{error}</p>}
              <Button type='submit' size='lg'>Sign up</Button>
            </div>
          </form>
          <p>Already have an account? <Link href='/auth/sign-in' className='text-blue-600'>Sign in</Link></p>
        </div>
      </div>
  )
}

export default SignUp;