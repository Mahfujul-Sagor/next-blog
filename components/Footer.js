import Link from "next/link";
import Socialicons from "./Socialicons";
function Footer() {
  return (
    <div className="w-full flex justify-center border-t">
      <div className='max-w-[1170px] w-full min-h-20 px-8 xl:px-0 max-[500px]:px-3 py-2 flex items-center gap-2 text-blue-gray-400 max-lg:flex-col max-sm:text-xs'>
        <div className='flex-1'><p>&copy; 2024 NextBlog. All rights reserved</p> </div>
        <div className='flex-1'>
          <ul className='flex gap-4 justify-center items-center'>
            <li className=''>
              <Link href='/privacy-policy'>Privacy</Link>
            </li>
            <li className=''>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
        <div className='flex-1 flex justify-end items-center'>
          <Socialicons className='text-2xl flex items-center gap-4'/>
        </div>
      </div>
    </div>
  )
}

export default Footer;