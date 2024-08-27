"use client";
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { fetchCategories } from '@/queries/Categories';

const BrowseByCat = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Categories fetching failed:', error);
      }
    };

    getCategories();
  }, []);

  return (
    <section className='w-full flex justify-center mt-[100px] mb-[60px]'>
      <div className='max-w-[1170px] flex flex-col items-center gap-16'>
        <div className='flex flex-col gap-6 items-center justify-center'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>Browse by Category</h2>
          <p className='text-center'>Select a category to see more related content</p>
        </div>
        <ul className='flex flex-wrap gap-4 justify-center'>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((item) => (
              <li key={item.id}>
                <Button variant='secondary' className='rounded-full border text-[1rem] capitalize'>
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
  )
}

export default BrowseByCat;