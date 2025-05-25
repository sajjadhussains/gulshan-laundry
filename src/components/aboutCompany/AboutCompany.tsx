// components/about/AboutCompany.tsx
import Image from 'next/image';
import React from 'react';

export default function AboutCompany() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 items-center">
          {/* Left side - Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
            <div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/women-clothes.png"
                alt="Professional laundry service"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6 sm:space-y-8 max-w-xl mx-auto lg:mx-0">
            <div>
              <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">About Company</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
                Excellent quality is worth the price tag.
              </h2>
            </div>

            <p className="text-gray-600 text-sm sm:text-base">
              Arcu eget malesuada imperdiet ornare pretium fringilla elit nullam. Orci elementum nec netus placerat convallis cursus class diam arcu tincidunt sed. Dolor tristique parturient consequat suscipit malesuada viverra proin commodo.
            </p>

            {/* The Idea Box */}
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-navy-900 mb-2">The Idea</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Eget nullam augue accumsan ridiculus sit ac ornare sociosqu molestie nibh massa lorem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
