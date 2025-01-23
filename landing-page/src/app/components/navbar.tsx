'use client'
import Link from "next/link"
import { FaEllipsisV } from 'react-icons/fa'
import { useState } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative flex items-center justify-between px-6 py-4 bg-black shadow-sm">
            <div className="flex items-center">
                <Link href="/" className="text-white hover:text-gray-300">xplorist</Link>
            </div>
            
            {/* Menu button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-300"
            >
                <FaEllipsisV className="text-2xl" />
            </button>

            {/* Navigation items */}
            <ul className={`${
                isMenuOpen ? 'flex' : 'hidden'
                } flex-col absolute top-full right-0 w-full 
                bg-black mt-2 p-4`}>
                <li><Link href="/home" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white hover:text-gray-300">Home</Link></li>
                <li><Link href="/account" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white hover:text-gray-300">Account</Link></li>
                <li><Link href="/api/auth/signout" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white hover:text-gray-300">Sign Out</Link></li>
            </ul>
        </nav>
    )
}