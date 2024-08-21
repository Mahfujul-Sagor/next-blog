import React from 'react'
import post1 from '@/public/post1.webp'
import post2 from '@/public/post2.webp'
import Image from 'next/image';
import user from '@/public/user.webp'
import { FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";


const SinglePost = () => {
  return (
    <div className='py-[70px] flex flex-col xl:flex-row justify-center gap-7'>
      <div className='post w-full xl:max-w-[770px] flex flex-col gap-12'>
        <div className='rounded-lg'>
          <Image src={post1} priority={true} alt='' width={400} height={400} className='min-h-full w-full object-cover rounded-lg'/>
        </div>
        <h1 className='text-2xl sm:text-4xl lg:text-[42px] font-bold'>Traveller Visiting Ice Cave With Amazing eye catching view with nature</h1>
        <div className="flex flex-wrap gap-2 items-center sm:gap-4">
          <div className='text-gray-500 flex gap-2 sm:gap-4 flex-wrap items-center'>
            <div className="">
              <Image src={user} alt="" width={30} height={30} className="rounded-full object-cover"/>
            </div>
            <div>
              <span className="text-sm sm:text-base">Adrio Devid</span>
            </div>
            <div className="text-sm sm:text-base">|</div>
            <div>
              <span className="text-sm sm:text-base">Aug 24 2023</span>
            </div>
            <div className="text-sm sm:text-base">|</div>
            <div>
              <span className="text-sm sm:text-base">12 min read</span>
            </div>
          </div>
          <div>
            <span className="rounded-full px-3 py-1 border bg-teal-400/50">Travel</span>
          </div>
        </div>
        <div className='desc flex flex-col gap-6'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisiloremcing Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia quod sed, nihil beatae provident tempora hic amet. Ut, voluptate et! elit. Harum modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, ullam. ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, officiis! modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae id a asperiores minus aperiam quas eaque. Cum veniam eum ut, delectus unde impedit deleniti beatae ab laborum optio vitae et. Harum modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
          <p>Lorem, ipsum dolor sitbold amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eius? Sint commodi quos reiciendis rem non? Facere perspiciatis ex possimus a nisi iste necessitatibus nostrum quasi molestias asperiores, tempora consequatur! Harum modi veniam saepe unde accusamus minima aspernatur ducimus tempora nulla, placeat totam quibusdam deserunt eius omnis, voluptas delectus. Labore, sequi! Vel.</p>
          <h3 className='text-xl font-bold md:text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nobis!</h3>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <span>#travel</span>
            <span>#text</span>
            <span>#blog</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span>Share this:</span>
            <FaFacebook className='text-2xl'/>
            <FaTwitter className='text-2xl'/>
            <FaPinterest className='text-2xl'/>
          </div>
        </div>
        <div className='flex flex-wrap xl:flex-nowrap gap-8 items-center'>
          <div className='max-w-32 w-full min-h-32 flex items-center'>
            <Image src={user} alt='' className='rounded-full object-cover' width={120} height={120} />
          </div>
          <div className='max-w-[617px] w-full flex flex-col gap-2'>
            <h2 className='font-medium text-xl xl:text-2xl'>Author: Adrio Devid</h2>
            <p>Mario, a co-founder of Acme and the content management system Sanity is an accomplished Staff Engineer with a specialization in Frontend at Vercel. Before his current position, he served as a Senior Engineer at Apple.</p>
            <div className='flex items-center gap-4 text-2xl mt-2'>
              <FaFacebook />
              <FaTwitter />
              <FaPinterest />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-10 justify-start'>
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
        <div className='max-w-[370px] rounded-lg border p-4 sm:p-8 lg:p-10 flex flex-col gap-8'>
          <h2 className='capitalize font-mediun text-2xl'>Explore Topics</h2>
          <div className='flex flex-col gap-8'>
            <div className='flex justify-between items-center'>
              <span className='capitalize'>Health</span>
              <div><span className='p-2 rounded-full border'>03</span></div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='capitalize'>Travel</span>
              <div><span className='p-2 rounded-full border'>03</span></div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='capitalize'>Lifestyle</span>
              <div><span className='p-2 rounded-full border'>03</span></div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='capitalize'>Culture</span>
              <div><span className='p-2 rounded-full border'>03</span></div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='capitalize'>Technology</span>
              <div><span className='p-2 rounded-full border'>03</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;