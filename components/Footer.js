import Link from "next/link";
function Footer() {
  return (
    <div className='border-t w-full min-h-20 px-20 max-[500px]:px-3 py-2 flex items-center gap-2 text-blue-gray-400 max-lg:flex-col max-sm:text-xs'>
      <div className='flex-1'><p>&copy; 2024 NextBlog. All rights reserved</p> </div>
      <div className='flex-1'>
        <ul className='flex gap-4 justify-center'>
          <li className=''>
            <Link href='/privacy-policy'>Privacy</Link>
          </li>
          <li className=''>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </div>
      <div className='flex-1 text-end'>
        icons
      </div>
    </div>
  )
}

export default Footer;