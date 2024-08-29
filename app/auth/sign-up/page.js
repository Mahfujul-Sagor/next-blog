"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import GoogleSigning from '@/components/GoogleSigning';
import GithubSigning from '@/components/GithubSigning';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import Loader from '@/components/Loader';

// Zod schema for form validation
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const SignUp = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize React Hook Form with Zod validation
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkIsAuthenticated();
      if (isAuthenticated) {
        router.push('/');
      } else {
        setLoading(false); // Stop loading when authentication check completes
      }
    };
    checkAuth();
  }, [router]);

  // Handle form submission
  const onSubmit = async (data) => {
    const { name, email, password } = data;

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
        setServerError(errorData.message);
        console.error(errorData.message);
      }
    } catch (error) {
      setServerError('Could not register');
      console.error('Could not register:', error);
    }
  };

  if (loading) {
    return <Loader />; // Show loader while checking authentication
  }

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
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='w-full'>
              <Label htmlFor="name">Name</Label>
              <Input
                type='text'
                id='name'
                {...register('name')}
                placeholder='Name'
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
            <div className='w-full'>
              <Label htmlFor="email">Email</Label>
              <Input
                type='email'
                id='email'
                {...register('email')}
                placeholder='Email'
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className='w-full'>
              <Label htmlFor="password">Password</Label>
              <Input
                type='password'
                id='password'
                {...register('password')}
                placeholder='Password'
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>
            {serverError && <p className='text-red-500'>{serverError}</p>}
            <Button type='submit' className={`${isSubmitting ? 'cursor-not-allowed' : ''}`} size='lg'>{isSubmitting ? 'Signing up...' : 'Sign up'}</Button>
          </div>
        </form>
        <p>Already have an account? <Link href='/auth/sign-in' className='text-blue-600'>Sign in</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
