import Image from 'next/image';
import React from 'react';
import noavatar from '@/public/no-avatar.png'; // Placeholder image for users without a profile picture
import Link from 'next/link';
import PostCardSkeleton from './Skeletons/PostCardSkeleton'; // Skeleton component for loading state

const PostCard = ({ item }) => {
  if (!item) {
    return <PostCardSkeleton />; // Show skeleton loading state if item data isn't available
  }

  return (
    <div className='flex flex-col gap-6 h-[556px] justify-center rounded-lg'>
      {item.img && (
        <div className='aspect-[370/280] overflow-hidden rounded-lg'>
          <Link href={`/posts/${item.slug}`}>
            <Image
              src={item.img}
              alt={item.title || 'Post Image'}
              width={400}
              height={400}
              priority={true}
              className='min-h-full w-full rounded-lg object-cover'
            />
          </Link>
        </div>
      )}
      <div className='flex flex-col gap-6 flex-grow'>
        <h2 className='text-xl font-bold line-clamp-3'>
          <Link href={`/posts/${item.slug}`}>{item.title || 'Untitled Post'}</Link> {/* Fallback if title is missing */}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base line-clamp-3">
          {item.subtitle || 'No subtitle available.'} {/* Fallback if subtitle is missing */}
        </p>
        <div className='mt-auto'>
          {item.user && (
            <div className="flex justify-between flex-wrap gap-3 items-center">
              <div className='flex gap-2 items-center text-gray-500'>
                <div>
                  <Link href={`/authors/${item.user.id}`}>
                    <Image
                      src={item.user.image || noavatar}
                      alt={item.user.name || 'User Avatar'} // Fallback if user name is missing
                      width={25}
                      height={25}
                      className="rounded-full object-cover"
                    />
                  </Link>
                </div>
                <div className='flex gap-2 items-center'>
                  <span className="text-sm">
                    <Link href={`/authors/${item.user.id}`}>{item.user.name || 'Unknown Author'}</Link>
                  </span>
                  <span className="text-sm">|</span>
                  <span className="text-sm">{item.createdAt}</span> {/* Displays post creation date */}
                </div>
              </div>
              <div>
                <span className="rounded-full px-3 capitalize py-1 border bg-indigo-400/50">
                  {item.catSlug || 'Style'} {/* Fallback if category slug is missing */}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
