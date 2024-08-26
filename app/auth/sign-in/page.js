"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import GithubSigning from '@/components/GithubSigning';
import GoogleSigning from '@/components/GoogleSigning';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Zod schema for validation
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // React Hook Form with Zod resolver
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  // Protecting route
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkIsAuthenticated();
      if (isAuthenticated) {
        router.push('/');
      } else {
        setLoading(false); // Stop loading when check is done
      }
    };
    checkAuth();
  }, [router]);

  // Handle the form submission
  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.redirect) {
        window.location.reload();
        router.push(result.redirect);
      } else {
        setError(result.message || 'An unexpected error occurred');
      }
    } catch (error) {
      setError('Failed to sign in. Please try again.');
    }
  };

  if (loading) {
    return <Loader />;
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
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='w-full'>
              <Label htmlFor="email">Email</Label>
              <Input
                type='email'
                id='email'
                {...register('email')}
                placeholder='email'
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
                placeholder='password'
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <Button type='submit' className={`${isSubmitting ? 'cursor-not-allowed' : ''}`} size='lg'>{isSubmitting ? 'Signing in...' : 'Sign in'}</Button>
          </div>
        </form>
        <p>Don&apos;t have an account? <Link href='/auth/sign-up' className='text-blue-600'>Sign up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
