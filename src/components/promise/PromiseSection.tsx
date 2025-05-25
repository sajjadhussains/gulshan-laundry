// components/PromiseSection.tsx
import Image from 'next/image';
import React from 'react';
import './PromiseSection.css';

export default function PromiseSection() {
  return (
    <section className="w-full overflow-hidden mt-40 promise-section">
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left side - Content with background */}
        <div className="w-full md:w-1/2 relative bg-[#032B56] z-10 flex items-center justify-end py-12 md:py-0">
          {/* Background Image */}
          <div className="promise-bg-container">
            <Image
              src="/promise-bg.png"
              alt="Promise background"
              fill
              className="promise-bg-image"
              priority
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
            <div className="md:pr-8 lg:pr-12 xl:pr-16 md:ml-auto md:max-w-md lg:max-w-lg">
              <p className="text-blue-300 font-medium mb-4">Our Promise</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                24 hours to a day, clean clothes follow the same time schedule.
              </h2>
              <p className="text-blue-100/80 mb-8">
                Montes dictum faucibus rutrum morbi sagittis blandit iaculis posuere neque nunc ac tortor
              </p>
              <div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Image only */}
        <div className="w-full md:w-1/2 h-[400px] md:h-full right-image-container">
          <Image 
            src="/women.png" 
            alt="Woman with laundry baskets in a laundromat"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
