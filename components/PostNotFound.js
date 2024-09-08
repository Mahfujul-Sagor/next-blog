import React from 'react';
import { CiCamera } from "react-icons/ci";

const PostNotFound = () => {
  return (
    <div className="w-full min-h-60 mx-auto">
      <div className='flex flex-col justify-center items-center'>
        <span className='p-6 rounded-full border flex items-center'>
          <CiCamera className='text-5xl'/>
        </span>
      </div>
      <p className='text-2xl font-medium text-center mt-6'>Sorry, no posts found</p>
    </div>
  )
}

export default PostNotFound;