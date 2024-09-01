import React from 'react';

const SinglePostSkeleton = () => {
  return (
    <div className='py-[70px] flex flex-col xl:flex-row justify-center gap-7'>
      {/* Post Content Skeleton */}
      <div className='post w-full xl:max-w-[770px] flex flex-col gap-12'>
        {/* Image Skeleton */}
        <div className='rounded-lg bg-gray-200 h-[400px] w-full' />
        {/* Title Skeleton */}
        <div className='bg-gray-200 h-8 w-3/4 mt-4 rounded-md' />
        {/* Author Info Skeleton */}
        <div className='flex flex-wrap gap-2 items-center sm:gap-4 bg-gray-200 h-12 w-full mt-4 rounded-md'>
          <div className='flex p-6 rounded-full border bg-gray-200 h-[100px] w-[100px]' /> {/* Author Image */}
          <div className='flex flex-col gap-2'>
            <div className='bg-gray-200 h-4 w-3/4 rounded-md' /> {/* Author Name */}
            <div className='bg-gray-200 h-4 w-1/2 rounded-md' /> {/* Post Date */}
          </div>
        </div>
        {/* Post Description Skeleton */}
        <div className='post-desc flex gap-6 flex-col'>
          <div className='bg-gray-200 h-6 w-full mb-2 rounded-md' />
          <div className='bg-gray-200 h-6 w-full mb-2 rounded-md' />
          <div className='bg-gray-200 h-6 w-full mb-2 rounded-md' />
        </div>
        {/* Author Bio Skeleton */}
        <div className='flex flex-wrap xl:flex-nowrap gap-8 items-center mt-4'>
          <div className='max-w-32 w-full min-h-32 flex items-center'>
            <div className='bg-gray-200 rounded-full object-cover h-[120px] w-[120px]' /> {/* Author Bio Image */}
          </div>
          <div className='max-w-[617px] w-full flex flex-col gap-2'>
            <div className='bg-gray-200 h-6 w-3/4 rounded-md' /> {/* Author Name Skeleton */}
            <div className='bg-gray-200 h-4 w-full rounded-md' /> {/* Author Bio Skeleton */}
          </div>
        </div>
      </div>
      {/* Side Menu Skeleton */}
      <div className='flex flex-col gap-8 justify-start'>
        <div className='side-menu max-w-[370px] rounded-lg border p-4 sm:p-8 lg:p-10 flex flex-col gap-8'>
          <h2 className='capitalize text-2xl font-medium bg-gray-200 h-8 w-3/4 rounded-md'>Recent Posts</h2> {/* Recent Posts Title */}
          <div className='flex flex-col gap-8 mt-4'>
            {Array(3).fill().map((_, index) => (
              <div key={index} className='small-post flex gap-6'>
                <div className='max-w-[70px] w-full min-h-full flex items-center'>
                  <div className='bg-gray-200 rounded-full object-cover w-[60px] h-[60px]' /> {/* Recent Post Image */}
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='bg-gray-200 h-4 w-3/4 rounded-md' /> {/* Recent Post Title */}
                  <div className='text-gray-500 flex gap-2 text-xs'>
                    <div className='bg-gray-200 h-4 w-1/4 rounded-md' /> {/* Author Name */}
                    <div className='bg-gray-200 h-4 w-1/4 rounded-md' /> {/* Date */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='bg-gray-200 h-8 w-3/4 rounded-md mt-4'> {/* Categories Title Skeleton */}
          <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-gray-200 h-4 w-full rounded-md' /> {/* Category Skeleton */}
            <div className='bg-gray-200 h-4 w-full rounded-md' /> {/* Category Skeleton */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostSkeleton;
