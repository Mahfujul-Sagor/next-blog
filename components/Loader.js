import React from 'react'
import { Spinner } from "@material-tailwind/react";

const Loader = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'><Spinner color="indigo" className='h-12 w-12' /></div>
  )
}

export default Loader;