"use client";

import React from 'react';
import useSWR from 'swr';
import PostCard from './PostCard';
import PostCardSkeleton from './Skeletons/PostCardSkeleton'; // Import your skeleton component
import PaginationComponent from './PaginationComponent';

// Function to fetch posts data with pagination, category, and author filters
const fetcher = async (url) => {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Could not fetch data');
  }
  return response.json();
};

const PostCardList = ({ page, cat, authorId }) => {
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  const url = `${baseURL}/api/posts?page=${page}&cat=${cat || ""}&authorId=${authorId || ""}`;

  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: false, // Prevent revalidation on focus
    dedupingInterval: 120000, // Deduplicate requests for 2 minutes
    revalidateOnMount: true, // Ensure refetch on mount if cache is expired
    fallbackData: { posts: [], count: 0 } // Initial data
  });

  if (error) return <p>Error fetching posts: {error.message}</p>;

  const { posts = [], count = 0 } = data;

  const POST_PER_PAGE = 9; // Define posts per page

  const hasPrev = POST_PER_PAGE * (page - 1) > 0; // Determine if previous page exists
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count; // Determine if next page exists

  // Create an array of length 9 for skeleton loaders
  const skeletonArray = Array.from({ length: POST_PER_PAGE });

  return (
    <div className='flex flex-col gap-16 items-center mt-16'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10'>
        {posts.length > 0 ? (
          posts.map((item) => (
            <PostCard key={item.id} item={item} />
          ))
        ) : (
          // Map skeletonArray to display multiple skeleton loaders
          skeletonArray.map((_, index) => (
            <PostCardSkeleton key={index} />
          ))
        )}
      </div>
      <PaginationComponent page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default PostCardList;
