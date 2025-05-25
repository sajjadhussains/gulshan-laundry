// components/CorporateDeals.tsx
import React from 'react';
import Image from 'next/image';

export default function CorporateDeals() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">Corporate Solutions</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight mb-4">
                Corporate Deals for Businesses
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                We provide specialized laundry services for businesses of all sizes. Get custom solutions tailored to your company's needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-navy-900 mb-2">Bulk Pricing</h3>
                  <p className="text-sm sm:text-base text-gray-600">Special rates for large volume orders</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-navy-900 mb-2">Priority Service</h3>
                  <p className="text-sm sm:text-base text-gray-600">Fast turnaround for business clients</p>
                </div>
              </div>
            </div>

            <button className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Contact Sales
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Right side - Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full order-first lg:order-last">
            <div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/corporate.png"
                alt="Corporate laundry services"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
