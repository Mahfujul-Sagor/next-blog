import React from 'react'
import Image from 'next/image';
import post2 from '@/public/post2.webp';
import Socialicons from '@/components/Socialicons';
import SideMenuCat from '@/components/SideMenuCat';
import parse from 'html-react-parser';
import noavatar from '@/public/no-avatar.png';
import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import Link from 'next/link';


const getPost = async (slug)=> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/posts/${slug}` || `http://localhost:3000/api/posts/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong during fetching post");
  }
}

const SinglePost = async ({params}) => {

  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  }

  const {slug} = params;

  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='py-[70px] flex flex-col xl:flex-row justify-center gap-7'>
      <div className='post w-full xl:max-w-[770px] flex flex-col gap-12'>
        {post?.img && <div className='rounded-lg'>
          <Image src={post.img} priority={true} alt='' width={400} height={400} className='min-h-full w-full object-cover rounded-lg'/>
        </div>}
        <h1 className='text-2xl sm:text-4xl lg:text-[42px] font-bold'>{post?.title}</h1>
        {post?.user && <div className="flex flex-wrap gap-2 items-center sm:gap-4">
          <div className='text-gray-500 flex gap-2 sm:gap-4 flex-wrap items-center'>
            {post?.user?.image ? (<div className="">
              <Image src={post.user.image} alt="" width={30} height={30} className="rounded-full object-cover"/>
            </div>) : (
              <div className='flex p-6 rounded-full border'>
                <Image src={noavatar} alt='Author Image' width={100} height={100} className='rounded-full object-cover'/>
              </div>
            )}
            <div>
              <span className="text-sm sm:text-base capitalize">{post?.user?.name}</span>
            </div>
            <div className="text-sm sm:text-base">|</div>
            <div>
              <span className="text-sm sm:text-base">{post?.createdAt}</span>
            </div>
          </div>
          <div>
            <span className="capitalize rounded-full px-3 py-1 border bg-teal-400/50">{post?.catSlug}</span>
          </div>
        </div>}
        <div className='post-desc flex gap-6 flex-col'>
          {post.desc ? parse(post.desc) : 'Description is not available'}
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <span>#{post?.catSlug}</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span>Share this:</span>
            <Socialicons className='flex gap-2 items-center' iconClass='text-2xl' />
          </div>
        </div>
        {post?.user && <div className='flex flex-wrap xl:flex-nowrap gap-8 items-center'>
          {post?.user?.image && <div className='max-w-32 w-full min-h-32 flex items-center'>
            <Link href={`/authors/${post.user.id}`}>
              <Image src={post.user.image} alt='' className='rounded-full object-cover' width={120} height={120} />
            </Link>
          </div>}
          <div className='max-w-[617px] w-full flex flex-col gap-2'>
            <h2 className='font-medium text-xl xl:text-2xl capitalize'>Author: <Link href={`/authors/${post.user.id}`}>{post.user.name}</Link></h2>
            {post?.user?.bio && <p>{post.user.bio}</p>}
            <Socialicons className='flex items-center gap-4 text-2xl mt-2'/>
          </div>
        </div>}
      </div>
      <div className='flex flex-col gap-8 justify-start'>
        <div className='side-menu max-w-[370px] rounded-lg border p-4 sm:p-8 lg:p-10 flex flex-col gap-8'>
          <h2 className='capitalize text-2xl font-medium'>Recent Posts</h2>
          <div className='flex flex-col gap-8'>
            <div className='small-post flex gap-6'>
              <div className='max-w-[70px] w-full min-h-full flex items-center'>
                <Image src={post2} alt='' width={60} height={60} priority={true} className='rounded-full object-cover w-full min-h-full'/>
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Culinary Expeditions: Tasting the ...</h3>
                <div className='text-gray-500 flex gap-2 text-xs'>
                  <span>Adrio Devid</span>
                  <span>|</span>
                  <span>Aug 24 2023</span>
                </div>
              </div>
            </div>
            <div className='small-post flex gap-6'>
              <div className='max-w-[70px] w-full min-h-full flex items-center'>
                <Image src={post2} alt='' width={60} height={60} priority={true} className='rounded-full object-cover w-full min-h-full'/>
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Culinary Expeditions: Tasting the ...</h3>
                <div className='text-gray-500 flex gap-2 text-xs'>
                  <span>Adrio Devid</span>
                  <span>|</span>
                  <span>Aug 24 2023</span>
                </div>
              </div>
            </div>
            <div className='small-post flex gap-6'>
              <div className='max-w-[70px] w-full min-h-full flex items-center'>
                <Image src={post2} alt='' width={60} height={60} priority={true} className='rounded-full object-cover w-full min-h-full'/>
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-medium'>Culinary Expeditions: Tasting the ...</h3>
                <div className='text-gray-500 flex gap-2 text-xs'>
                  <span>Adrio Devid</span>
                  <span>|</span>
                  <span>Aug 24 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideMenuCat />
      </div>
    </div>
  );
}

export default SinglePost;