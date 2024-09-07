"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { useSearchParams } from 'next/navigation';

const SearchInput = ({onSearch}) => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(search ? search.get('query') : '');
  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the input field when the component is mounted
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSearchHandler = async (e) => {
    e.preventDefault();
    onSearch(searchQuery || '');
  };

  return (
    <form onSubmit={onSearchHandler} className='sticky top-0 z-[9999]'>
      <Input 
        ref={inputRef}
        value={searchQuery || ""}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search' 
        className='h-12' 
      />
    </form>
  );
};

export default SearchInput;
