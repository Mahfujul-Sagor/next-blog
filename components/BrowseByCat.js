"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Button } from './ui/button';
import { fetchCategories } from '@/queries/Categories';

const BrowseByCat = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Function to get categories from cache or API
    const getCategories = async () => {
      // Try to retrieve categories from localStorage
      const cachedCategories = localStorage.getItem('categories');

      if (cachedCategories) {
        // If categories are cached, use them
        setCategories(JSON.parse(cachedCategories));
      } else {
        try {
          // Fetch categories from the API
          const fetchedCategories = await fetchCategories();
          // Update state and cache the fetched categories
          setCategories(fetchedCategories);
          localStorage.setItem('categories', JSON.stringify(fetchedCategories));
        } catch (error) {
          console.error('Categories fetching failed:', error);
        }
      }
    };

    getCategories();
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);

  return (
    <section className='w-full flex justify-center mt-[100px] mb-[60px]'>
      <div className='max-w-[1170px] flex flex-col items-center gap-16'>
        <div className='flex flex-col gap-6 items-center justify-center'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>Browse by Category</h2>
          <p className='text-center'>Select a category to see more related content</p>
        </div>
        <ul className='flex flex-wrap gap-4 justify-center'>
          <Button variant='secondary' onClick={() => onCategorySelect('')} className='rounded-full border text-[1rem] capitalize'>All</Button>
          {Array.isArray(memoizedCategories) && memoizedCategories.length > 0 ? (
            memoizedCategories.map((item) => (
              <li key={item.id}>
                <Button variant='secondary' onClick={() => onCategorySelect(item.slug)} className='rounded-full border text-[1rem] capitalize'>
                  {item.title}
                </Button>
              </li>
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
