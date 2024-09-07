"use client";

import { Button } from './ui/button';
import useSWR from 'swr';
import { Skeleton } from './ui/skeleton';

// Fetch function for SWR
const fetcher = async (url) => {
  const cachedCategories = localStorage.getItem('categories');
  
  if (cachedCategories) {
    // If categories are cached, return them
    return JSON.parse(cachedCategories);
  } else {
    // Fetch categories from the API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Cache the fetched categories
    localStorage.setItem('categories', JSON.stringify(data));
    return data;
  }
};

const BrowseByCat = ({ onCategorySelect }) => {
  const url =`${process.env.BASE_URL || 'http://localhost:3000'}/api/categories`;

  const {data: categories, isLoading} = useSWR(url, fetcher);

  return (
    <section className='w-full flex justify-center mt-[100px] mb-[60px]'>
      <div className='max-w-[1170px] flex flex-col items-center gap-16'>
        <div className='flex flex-col gap-6 items-center justify-center'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>Browse by Category</h2>
          <p className='text-center'>Select a category to see more related content</p>
        </div>
        <ul className='flex flex-wrap gap-4 justify-center items-center'>
          <Button variant='secondary' onClick={() => onCategorySelect('')} className='rounded-full border text-[1rem] capitalize'>All</Button>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className='flex items-center gap-4'>
                <Skeleton className='w-32 h-10 rounded-full' />
              </li>))
            ) : (
              categories.length > 0 ? (
                categories.map((item) => (
                <li key={item.id}>
                  <Button variant='secondary' onClick={() => onCategorySelect(item.slug)} className='rounded-full border text-[1rem] capitalize'>
                    {item.title}
                  </Button>
                </li>))
              ) : (
              <p>No categories available</p>)
          )}
        </ul>
      </div>
    </section>
  );
}

export default BrowseByCat;
