// src/components/layout/Navbar.jsx
 'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="relative h-10 w-36">
                <Image
                  src="/images/logo.svg"
                  alt="Soul Distribution"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                Home
              </Link>
              <Link href="/services" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                Services
              </Link>
              <Link href="/artists" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                Artists
              </Link>
              <Link href="/releases" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                Releases
              </Link>
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                About
              </Link>
              <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                Contact
              </Link>
              <Link 
                href="/services" 
                className="px-4 py-2 rounded-md text-sm font-medium bg-orange-600 hover:bg-orange-700"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link 
              href="/artists" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Artists
            </Link>
            <Link 
              href="/releases" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Releases
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link 
              href="/services" 
              className="block px-3 py-2 rounded-md text-base font-medium bg-orange-600 hover:bg-orange-700"
              onClick={toggleMenu}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}