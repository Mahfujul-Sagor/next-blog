import Image from 'next/image';
import React from 'react'
import noavatar from '@/public/no-avatar.png';
import Link from 'next/link';


const PostCard = ({ item }) => {
  return (
    <>
      {item && (
        <div className='flex flex-col gap-6 justify-center'>
          {item?.img && (
            <div className='aspect-[370/280] overflow-hidden rounded-lg'>
              <Link href={`/posts/${item.slug}`}>
                <Image src={item.img} alt={item.title || 'Post Image'} width={400} height={400} priority={true} className='min-h-full w-full rounded-lg object-cover' />
              </Link>
            </div>
          )}
          <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-bold'><Link href={`/posts/${item.slug}`}>{item.title || 'Untitled Post'}</Link></h2>
            <p className="text-gray-500 text-sm sm:text-base">{item.subtitle || 'No subtitle available.'}</p>
            <div>
              {item?.user && (
                <div className="flex justify-between">
                  <div className='flex gap-2 items-center text-gray-500'>
                    <div className="">
                      <Link href={`/authors/${item.user.id}`}>
                        <Image
                          src={item.user.image || noavatar}
                          alt={item.user.name || 'User Avatar'}
                          width={25}
                          height={25}
                          className="rounded-full object-cover"
                        />
                      </Link>
                    </div>
                    <div>
                      <span className="text-sm"><Link href={`/authors/${item.user.id}`}>{item.user.name || 'Unknown Author'}</Link></span>
                    </div>
                    <div className="text-sm">|</div>
                    <div>
                      <span className="text-sm">{item.createdAt}</span>
                    </div>
                  </div>
                  <div>
                    <span className="rounded-full px-3 py-1 border bg-indigo-400/50">{item.catSlug || 'Style'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;
