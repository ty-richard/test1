"use client"

import Link from 'next/link';
import { inter } from '@/app/fonts';
import Image from "next/image"

const Footer = () => {
  return (
    <footer className={`
      w-full 
      bg-[#726c79]
      text-white
      ${inter.className}
      p-5
      flex flex-col items-center justify-center 
    `}>
      <Image 
        src="/static/logos/TheXplorist_Logo_Snow.svg"
        alt="xplorist logo"
        width={120}
        height={40}
        priority
      />
      <nav>
        <ul className="flex flex-col items-center space-y-1">
          <li>
            <Link href="/aboutus" className="hover:text-light-600">
              ABOUT US
            </Link>
          </li>
          <li>
            <Link href="/feedback" className="hover:text-light-600">
              FEEDBACK
            </Link>
          </li>
          <li>
            <Link href="/contactus" className="hover:text-light-600">
              CONTACT US
            </Link>
          </li>
        </ul>
      </nav>

      <div className="text-sm mt-2">
        <span>© 2024 The Xplorist - All Rights Reserved</span>
        <span className="mx-1">•</span>
        <Link href="/terms" className="hover:underline">Terms</Link>
        <span className="mx-1">•</span>
        <Link href="/privacy" className="hover:underline">Privacy</Link>
        <span className="mx-1">•</span>
        <Link href="/cookies" className="hover:underline">Cookies</Link>
      </div>
    </footer>
  );
};

export default Footer;
