// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#032B56] text-white mt-16 sm:mt-20">
      {/* Newsletter and Help Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -top-12 sm:-top-16 md:-top-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Need Help Section */}
            <div className="p-4 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
              <h3 className="text-navy-900 text-lg sm:text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-3 sm:mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a href="tel:+8801767685625" className="text-navy-900 font-bold text-base sm:text-lg hover:text-blue-600 transition-colors">
                +8801767685625
              </a>
            </div>
            
            {/* Newsletter Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="text-navy-900 text-lg sm:text-xl font-bold mb-2">Newsletter</h3>
              <p className="text-gray-600 text-sm mb-3 sm:mb-4">
                Signup our newsletter to get update information, promotion and insight.
              </p>
              <form className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-3 sm:px-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md transition-colors flex items-center justify-center sm:justify-start"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 pt-0">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Gulshan Laundry</h2>
            <p className="text-gray-400 text-sm mb-4 sm:mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
          
          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> Leadership
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> Careers
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> Partner
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> News & Article
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/ticket" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm sm:text-base">
                  <span className="text-blue-500 mr-2">·</span> Ticket Support
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 mt-4 md:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h3>
            <p className="text-gray-400 text-sm mb-3 sm:mb-4">
              If you have any questions or need help, feel free to contact with our team.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="text-blue-500 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">
                  Nobadoy, Lohargate Mohammadpur<br />Dhaka
                </p>
              </div>
              <div className="flex items-center">
                <div className="text-blue-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:support@gualshanlaundry.tld" className="text-gray-400 hover:text-white transition-colors text-sm">
                  support@gualshanlaundry.tld
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-right">
            Copyright © {new Date().getFullYear()}, All rights reserved Gualshanlaundry
          </p>
        </div>
      </div>
    </footer>
  );
}
