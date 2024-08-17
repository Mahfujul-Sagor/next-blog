import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import logo from '@/public/logo.svg';
import Link from "next/link";
 
export function FooterWithLogo() {
  return (
    <footer className="w-full px-20 py-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <Image src={logo} alt="logo"/>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Link href='/about'
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link href='/privacy-policy'
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link href='#'
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Link>
          </li>
          <li>
            <Link href='#'
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2024 NextBlog
      </Typography>
    </footer>
  );
}