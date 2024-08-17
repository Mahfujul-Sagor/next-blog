"use client";

import GithubSigning from '@/components/GithubSigning';
import GoogleSigning from '@/components/GoogleSigning';
import Loader from '@/components/Loader';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input,Button } from "@material-tailwind/react";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // protecting route
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkIsAuthenticated();
      if (isAuthenticated) {
        router.push('/');
      }else {
        setLoading(false); // Stop loading when check is done
      }
    };
    checkAuth();
  }, [router]);

  // handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.redirect) {
        router.push(result.redirect);
      } else {
        setError(result.message || 'An unexpected error occurred');
      }
    } catch (error) {
      setError('Failed to sign in. Please try again.');
    }
  };

  if (loading) {
    return <Loader/>; // Display loading message or spinner
  }
  return (
      <div className='w-full min-h-screen flex justify-center items-center px-4'>
        <div className='w-[35rem] flex flex-col gap-10 items-center border rounded-xl px-14 py-16 shadow-xl max-sm:px-10 max-sm:py-12 max-sm:w-[30rem]'>
          <div className='w-full text-center'>
            <h1 className='text-5xl font-semibold mb-4'>Sign in</h1>
            <p className='text-gray-500'>Sign in to your account</p>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <GoogleSigning text='in'/>
            <GithubSigning text='in'/>
          </div>
          <div className='w-full flex justify-center items-center gap-1'>
            <div className='flex-1 h-[1px] bg-gray-500'></div>
            <div className='flex-1 text-gray-500 text-sm text-center'>Or with credentials</div>
            <div className='flex-1 h-[1px] bg-gray-500'></div>
          </div>
          <form 
          onSubmit={handleSubmit}
          className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
              <div className='w-full'>
                <Input label="Email" type='email' name='email' size='lg' />
              </div>
              <div className='w-full'>
                <Input label="Password" type='password' name='password' size='lg' />
              </div>
              {error && <p className='text-red-500'>{error}</p>}
              <Button type='submit' fullWidth size='lg'>Sign in</Button>
            </div>
          </form>
          <p>Don&apos;t have an account? <Link href='/auth/sign-up' className='text-blue-600'>Sign up</Link></p>
        </div>
      </div>
    )
}

export default SignIn;