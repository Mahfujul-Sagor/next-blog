"use client";

import useSWR from 'swr';
import Image from 'next/image';
import user from '@/public/no-avatar.png';
import { Skeleton } from './ui/skeleton';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import debounce from 'lodash.debounce';
import nopost from '@/public/no-post.jpg';
import { MotionDiv } from './animation/Animate';


// Function to fetch posts based on the search query
const fetchPosts = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const Search = ({ mount, onClose }) => {
  const searchInputRef = useRef();
  const [query, setQuery] = useState(''); // Manages search query
  const [error, setError] = useState(null); // Manages error state
  const router = useRouter();

  // Construct the search query URL
  const encodedSearchQuery = encodeURI(query || '');
  const url = `${process.env.BASE_URL || 'http://localhost:3000'}/api/search?query=${encodedSearchQuery}`;

  // Use SWR to fetch data based on the query
  const { data, isLoading, error: swrError } = useSWR(query ? url : null, fetchPosts, { revalidateOnFocus: false });

  const posts = data || [];

  // Handle and display any errors from SWR
  useEffect(() => {
    if (swrError) {
      setError('Something went wrong. Please try again.');
    }
  }, [swrError]);

  // Auto-focus the search input on mount and handle closing the modal
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!mount) {
      const timeoutId = setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.value = ''; // Clear the input on close
        }
        onClose(); // Close the modal
      }, 200);
      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }
  }, [mount, onClose]);

  // Debounce search input to limit API calls
  const debouncedSearch = debounce((searchQuery) => setQuery(searchQuery), 300);

  // Handle form submission and trigger the debounced search
  const onSearchHandler = (e) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current.value;
    debouncedSearch(searchQuery);
  };

  return (
    <MotionDiv 
    initial={{scale: 0.5, opacity: 0}}
    animate={{scale: 1, opacity: 1}}
    transition={{duration: 0.5}}
    onClick={(e) => e.stopPropagation()} className='relative border rounded-lg h-[90vh] max-w-[700px] w-full bg-background text-foreground overflow-hidden overflow-y-scroll shadow'>
      <div>
        <div className='mb-8'>
          {/* Search form */}
          <form onSubmit={onSearchHandler} className='sticky top-0 z-[9999]'>
            <Input ref={searchInputRef} placeholder='Search' className='' />
          </form>
        </div>

        {/* Error message */}
        {error && (
          <p className='w-full text-center text-red-500 mb-2'>{error}</p>
        )}
        <hr />

        <div>
          <div className='mt-8 px-2 w-full'>
            {/* Display a skeleton loader while the data is loading */}
            {isLoading ? (
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
              // Render posts if available, otherwise show "No results"
              posts?.length > 0 ? (
                posts.map((post, index) => (
                  <MotionDiv 
                  initial={{y: -10, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  transition={{delay: 0.2 * index}}
                  viewport={{once: true}}
                  key={post.id} onClick={() => router.push(`/posts/${post.slug}`)} className='w-full px-2 pt-1 mb-4 flex items-center gap-6'>
                    <div>
                      <Image src={post.img || nopost} alt='post image' width={80} height={80} className='rounded-lg object-cover min-h-full w-full hidden sm:flex' priority={true} />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                      <h2 className='sm:line-clamp-1 line-clamp-2 text-sm md:text-xl font-bold'>{post.title}</h2>
                      {/* Display post author if available */}
                      {post.user && (
                        <div className='flex items-center gap-2'>
                          <div>
                            <Image src={post.user.image || user} alt='user image' width={20} height={20} priority={true} className='rounded-full object-cover'/>
                          </div>
                          <p className='text-xs md:text-sm text-gray-400 capitalize'>{post.user.name}</p>
                        </div>
                      )}
                    </div>
                  </MotionDiv>
                ))
              ) : (
                <p className='w-full text-center'>No result found</p>
              )
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Search;
