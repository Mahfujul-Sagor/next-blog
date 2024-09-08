"use client";

import { Button } from './ui/button';
import useSWR from 'swr';
import { Skeleton } from './ui/skeleton';
import { MotionH2, MotionLi, MotionP, MotionSpan } from './animation/Animate';

// Fetch function for SWR
const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not fetch categories');
  }

  return await response.json();
};

const BrowseByCat = ({ onCategorySelect }) => {
  const url = `${process.env.BASE_URL || 'http://localhost:3000'}/api/categories`;
  const { data: categories, isLoading, error } = useSWR(url, fetcher);

  return (
    <section className='w-full flex justify-center mt-[200px] mb-[60px]'>
      <div className='max-w-[1170px] flex flex-col items-center gap-16'>
        <div className='flex flex-col gap-6 items-center justify-center'>
          <MotionH2 
            initial={{ y: -20 ,opacity: 0 }}
            whileInView={{y: 0, opacity: 1}}
            className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>
            Browse by Category
          </MotionH2>
          <MotionP 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.5}}
            className='text-center'>
            Select a category to see more related content
          </MotionP>
        </div>
        <ul className='flex flex-wrap gap-4 justify-center items-center'>
          <MotionSpan 
            initial='hidden'
            whileInView='show'
            variants={{
              hidden: {x: -10, opacity: 0 },
              show: {x: 0 , opacity: 1 },
            }}
            transition={{duration: 0.2}}
            viewport={{ once: true }}
            className='rounded-full'>
            <Button 
              variant='secondary' 
              onClick={() => onCategorySelect('')} 
              className='rounded-full border text-[1rem] capitalize'>
              All
            </Button>
          </MotionSpan>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className='flex items-center gap-4'>
                <Skeleton className='w-32 h-10 rounded-full' />
              </li>
            ))
          ) : error ? (
            <p>Error loading categories. Please try again later.</p>
          ) : categories.length > 0 ? (
            categories.map((item, index) => (
              <MotionLi 
                initial={{x: -10, opacity: 0}}
                whileInView={{x: 0, opacity: 1}}
                transition={{delay: 0.2 * index}}
                viewport={{ once: true }}
                key={item.id}>
                <Button 
                  variant='secondary' 
                  onClick={() => onCategorySelect(item.slug)} 
                  className='rounded-full border text-[1rem] capitalize'>
                  {item.title}
                </Button>
              </MotionLi>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default BrowseByCat;
