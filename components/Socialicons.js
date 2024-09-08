import React from 'react'
import { FaFacebook, FaPinterest, FaTwitter } from 'react-icons/fa';
import { MotionSpan } from './animation/Animate';

const Socialicons = ({className, iconClass}) => {

  const socials = [
    {
      icon: <FaFacebook className={`${iconClass} hover:scale-125 transition-transform duration-100`}/>
    },
    {
      icon: <FaTwitter className={`${iconClass} hover:scale-125 transition-transform duration-100`}/>
    },
    {
      icon: <FaPinterest className={`${iconClass} hover:scale-125 transition-transform duration-100`}/>
    },
  ];

  return (
    <div className={className}>
      {socials.map((item, index)=> (
        <MotionSpan 
        initial={{scale: 0.8, opacity: 0}}
        whileInView={{scale: 1, opacity: 1}}
        transition={{delay: 0.2 * index}}
        key={index}>
          {item.icon}
        </MotionSpan>
      ))}
    </div>
  )
}

export default Socialicons;