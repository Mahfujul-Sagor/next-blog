"use client";

import useSWR from 'swr';
import Image from 'next/image';
import user from '@/public/no-avatar.png';
import { Skeleton } from './ui/skeleton';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';

const fetchPosts = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const Search = ({mount}) => {
  const search = useSearchParams();
  const searchInputRef = useRef();
  const [error, setError] = useState(null);
  const searchQuery = search ? search.get('query') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const router = useRouter();

  const url = `${process.env.BASE_URL || 'http://localhost:3000'}/api/search?query=${encodedSearchQuery}`;

  const { data, isLoading, error: swrError } = useSWR(searchQuery ? url : null, fetchPosts, {revalidateOnFocus: false});

  const posts = data || [];

  useEffect(() => {
    if (swrError) {
      setError(swrError.message);
    }
  }, [swrError]);

  useEffect(() => {
    if (!mount) {
      // Introduce a short delay before clearing the search and updating the URL
      setTimeout(() => {
        // Clear input field
        if (searchInputRef.current) {
          searchInputRef.current.value = '';
        }
        // Remove query parameter from URL using replace to avoid adding to history
        const urlWithoutQuery = window.location.pathname;
        router.replace(urlWithoutQuery); // Replace the URL without query params
      }, 100); // Delay by 100ms to ensure smooth transition
    }
  }, [mount, router]);

  const onSearchHandler = async (e) => {
    e.preventDefault();
    const searchInput = searchInputRef.current.value; // Get input value from ref
    if (searchInput) {
      router.push(`?query=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div onClick={(e)=> e.stopPropagation()} className='relative border rounded-lg h-[90vh] max-w-[700px] w-full bg-background text-foreground overflow-hidden overflow-y-scroll shadow'>
      <div>
        <div className='mb-10'>
          <form onSubmit={onSearchHandler} className='sticky top-0 z-[9999]'>
            <Input
              ref={searchInputRef}
              placeholder='Search' 
              className='' 
            />
          </form>
        </div>
        {error && (
          <p className='w-full text-center text-red-500'>{error}</p>
        )}
        <hr />
        <div>
          <div className='mt-8 px-2 w-full'>
            {isLoading ? (
              // Skeleton Loading State
              Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className='w-full px-2 pt-1 mb-4 flex items-center gap-6'>
                  <Skeleton className='w-20 h-20 rounded-lg' />
                  <div className='flex flex-col justify-center gap-2 w-full'>
                    <Skeleton className='h-6 w-3/4' />
                    <Skeleton className='h-4 w-1/2' />
                  </div>
                </div>
              ))
            ) : (
              // Data Loaded State
              posts?.length > 0 ? (
                posts.map(post => (
                  <div key={post.id} onClick={() => router.push(`/posts/${post.slug}`)} className='w-full px-2 pt-1 mb-4 flex items-center gap-6'>
                    <div>
                      <Image src={post.img || user} alt='post image' width={80} height={80} className='rounded-lg object-cover min-h-full w-full hidden sm:flex' priority={true} />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                      <h2 className='sm:line-clamp-1 line-clamp-2 text-sm md:text-xl font-bold'>{post.title}</h2>
                      {post.user && (
                        <div className='flex items-center gap-2'>
                          <div>
                            <Image src={post.user.image || user} alt='user image' width={20} height={20} priority={true} className='rounded-full object-cover'/>
                          </div>
                          <p className='text-xs md:text-sm text-gray-400 capitalize'>{post.user.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className='w-full text-center'>No result found</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search;
