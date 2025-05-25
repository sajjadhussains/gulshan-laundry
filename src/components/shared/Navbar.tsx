// components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Add scroll event listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Check if current path matches the link
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name - always on left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold text-blue-900">Gulshan Laundry</span>
            </Link>
          </div>
          
          {/* Mobile: Center Button */}
          <div className="flex md:hidden justify-center">
            <Link 
              href="/quote" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Get a Quote
            </Link>
          </div>
          
          {/* Desktop navigation links - centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link 
                href="/" 
                className={`${isActive('/') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors`}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`${isActive('/about') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors`}
              >
                About Us
              </Link>
              <div className="relative group">
                <button 
                  className={`text-gray-700 hover:text-blue-600 group px-2 py-2 text-sm font-medium flex items-center transition-colors`}
                >
                  Service
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50 border border-gray-100">
                  <Link 
                    href="/service/dry-cleaning" 
                    className={`block px-4 py-2 text-sm ${isActive('/service/dry-cleaning') ? 'text-blue-600 bg-gray-50' : 'text-gray-700'} hover:bg-gray-100 transition-colors`}
                  >
                    Dry Cleaning
                  </Link>
                  <Link 
                    href="/service/wash-fold" 
                    className={`block px-4 py-2 text-sm ${isActive('/service/wash-fold') ? 'text-blue-600 bg-gray-50' : 'text-gray-700'} hover:bg-gray-100 transition-colors`}
                  >
                    Wash & Fold
                  </Link>
                  <Link 
                    href="/service/ironing" 
                    className={`block px-4 py-2 text-sm ${isActive('/service/ironing') ? 'text-blue-600 bg-gray-50' : 'text-gray-700'} hover:bg-gray-100 transition-colors`}
                  >
                    Ironing Services
                  </Link>
                </div>
              </div>
              <Link 
                href="/contact" 
                className={`${isActive('/contact') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors`}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Desktop: Quote button on right */}
          <div className="hidden md:flex items-center">
            <Link 
              href="/quote" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button - positioned on the right */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      ></div>
      <div 
        className={`md:hidden fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="px-4 pt-5 pb-6 space-y-1 flex flex-col h-full">
          <div className="flex justify-between items-center mb-5">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-blue-600 bg-gray-50' : 'text-gray-900'} hover:bg-gray-100 transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'text-blue-600 bg-gray-50' : 'text-gray-900'} hover:bg-gray-100 transition-colors`}
            >
              About Us
            </Link>
            
            {/* Services with submenu */}
            <div className="space-y-1">
              <div 
                className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <span>Services</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="pl-4 space-y-1">
                <Link 
                  href="/service/dry-cleaning" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/service/dry-cleaning') ? 'text-blue-600 bg-gray-50' : 'text-gray-900'} hover:bg-gray-100 transition-colors`}
                >
                  Dry Cleaning
                </Link>
                <Link 
                  href="/service/wash-fold" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/service/wash-fold') ? 'text-blue-600 bg-gray-50' : 'text-gray-900'} hover:bg-gray-100 transition-colors`}
                >
                  Wash & Fold
                </Link>
                <Link 
                  href="/service/ironing" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/service/ironing') ? 'text-blue-600 bg-gray-50' : 'text-gray-900'} hover:bg-gray-100 transition-colors`}
                >
                  Ironing Services
                </Link>
              </div>
            </div>
            
            <Link 
              href="/contact" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact') ? 'text-blue-600 bg-gray-50' : 'text-gray-900'} hover:bg-gray-100 transition-colors`}
            >
              Contact Us
            </Link>
          </div>
          
          <div className="pt-4 pb-2 border-t border-gray-200">
            <Link 
              href="/quote" 
              className="block w-full text-center px-3 py-2 rounded text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;