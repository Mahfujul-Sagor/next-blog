import React from 'react';
import Image from "next/image";
import image from '@/public/post3.webp'
import noavatar from '@/public/no-avatar.png'
import {MotionDiv} from './animation/Animate.js';

const Featured = () => {
  return (
    <section className="featured w-full flex flex-col gap-10 justify-center items-center py-16 mt-[30px] md:mt-[50px]">
        <MotionDiv 
        initial={{x: -20, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{duration: 0.5}}
        className="w-full flex justify-center items-center max-w-[1170px]">
          <div className="flex border w-full flex-col gap-8 rounded-xl p-4 shadow lg:flex-row lg:items-center lg:gap-11 lg:p-2.5">
            <div className="rounded-lg aspect-[536/320] w-full h-full">
              <Image src={image} alt="image" className="rounded-lg object-cover min-h-full w-full" width={600} height={600}/>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <div>
                <span className="rounded-full px-3 py-1 border bg-indigo-400/50">Health</span>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold xl:text-3xl">Wellness Unveiled: Empowering Your Journey to a Balanced and Vibrant Life</h2>
                <p className="text-gray-500 text-sm sm:text-base">In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.</p>
              </div>
              <div className="text-gray-500 flex gap-4">
                <div className="">
                  <Image src={noavatar} alt="" width={30} height={30} className="rounded-full object-cover"/>
                </div>
                <div>
                  <span className="text-sm sm:text-base">Ryna Kenter</span>
                </div>
                <div className="text-sm sm:text-base">|</div>
                <div>
                  <span className="text-sm sm:text-base">Aug 24 2023</span>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
        <div className="w-full flex flex-col gap-8 justify-center items-center xl:flex-row">
          {/* 1 */}
          <MotionDiv 
          initial={{y: -20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 0.5}}
          className="flex w-full border flex-col gap-8 rounded-xl p-2.5 shadow md:flex-row md:items-center xl:max-w-[570px] lg:gap-6">
            <div className="rounded-lg aspect-[536/320] w-full h-full xl:aspect-[238/180]">
              <Image src={image} alt="" className="rounded-lg object-cover min-h-full w-full" width={300} height={300}/>
            </div>
            <div className="flex flex-col gap-4 py-2">
              <div>
                <span className="rounded-full px-3 py-1 border bg-blue-400/50">Health</span>
              </div>
              <div className="">
                <h2 className="text-xl font-bold lg:text-xl">Begin here to obtain a brief summary encompassing all the essential</h2>
              </div>
              <div className="text-gray-500 flex gap-4">
                <div className="">
                  <Image src={noavatar} alt="" width={25} height={25} className="rounded-full object-cover"/>
                </div>
                <div>
                  <span className="text-sm sm:text-base">Adrio Devid</span>
                </div>
                <div className="text-sm sm:text-base">|</div>
                <div>
                  <span className="text-sm sm:text-base">Aug 24 2023</span>
                </div>
              </div>
            </div>
          </MotionDiv>
          {/* 2 */}
          <MotionDiv 
          initial={{y: -20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 0.5}}
          className="flex w-full border flex-col gap-8 rounded-xl p-2.5 shadow md:flex-row md:items-center xl:max-w-[570px] lg:gap-6">
            <div className="rounded-lg aspect-[536/320] w-full h-full xl:aspect-[238/180]">
              <Image src={image} alt="" className="rounded-lg object-cover min-h-full w-full" width={300} height={300}/>
            </div>
            <div className="flex flex-col gap-4 py-2">
              <div>
                <span className="rounded-full px-3 py-1 border bg-blue-400/50">Lifestyle</span>
              </div>
              <div className="">
                <h2 className="text-xl font-bold lg:text-xl">Begin here to obtain a brief summary encompassing all the essential</h2>
              </div>
              <div className="text-gray-500 flex gap-4">
                <div className="">
                  <Image src={noavatar} alt="" width={25} height={25} className="rounded-full object-cover"/>
                </div>
                <div>
                  <span className="text-sm sm:text-base">Adrio Devid</span>
                </div>
                <div className="text-sm sm:text-base">|</div>
                <div>
                  <span className="text-sm sm:text-base">Aug 24 2023</span>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
  )
}

export default Featured;