import React from 'react'
import { FaFacebook, FaPinterest, FaTwitter } from 'react-icons/fa';

const Socialicons = ({className, iconClass}) => {
  return (
    <div className={className}>
      <FaFacebook className={`${iconClass} hover:scale-125 transition-transform duration-100`}/>
      <FaTwitter className={`${iconClass} hover:scale-125 transition-transform duration-100`}/>
      <FaPinterest className={`${iconClass} hover:scale-125 transition-transform duration-100`}/>
    </div>
  )
}

export default Socialicons;