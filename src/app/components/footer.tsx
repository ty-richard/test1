"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to bottom
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      setShowFooter(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`h-[50px] bg-white w-full flex flex-col items-center justify-center transition-transform duration-300 fixed bottom-0 ${showFooter ? 'translate-y-0' : 'translate-y-full'}`}>
      <span className="text-xl font-bold">XPLORIST</span>
      
      <nav>
        <ul className="flex flex-col items-center space-y-1">
          <li><Link href="/about" className="hover:text-gray-600">ABOUT US</Link></li>
          <li><Link href="/feedback" className="hover:text-gray-600">FEEDBACK</Link></li>
          <li><Link href="/contact" className="hover:text-gray-600">CONTACT US</Link></li>
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
