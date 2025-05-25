// components/heroSection/HeroSection.tsx
import HeroForm from './HeroForm';
import './HeroSection.css'; // Import the CSS file for the background image
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Laundry Services in Gulshan',
  description: 'A better you starts with clean clothes. Professional laundry services with pickup and delivery.',
};

export default function HeroSection() {
  return (
    <>
      <section className="relative w-full hero-background">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032B56] to-[rgba(7,94,188,0.00)]" style={{ zIndex: 1 }}></div>
        
        {/* Content Container */}
        <div className="container h-full flex flex-col mx-auto px-4">
          <div className="flex-1 flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
            {/* Hero Content */}
            <div className="max-w-xl space-y-4 sm:space-y-6 md:space-y-8 hero-content">
              <p className="text-sm sm:text-base md:text-lg font-medium service-title">Professional Laundry Service</p>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                A better you
                <span className="sm:hidden"> </span><br className="hidden sm:block" />
                start with clean
                <span className="sm:hidden"> </span><br className="hidden sm:block" />
                clothes
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg max-w-md subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus
                nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              
              {/* CTA Button */}
              <div>
                <a
                  href="#pickup-form"
                  className="hero-btn"
                >
                  Pickup Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Form will be positioned to overlap with the background */}
          <div className="relative z-10 pb-0 md:pb-0 lg:pb-0 mt-auto flex justify-center">
            <div className="form-width-custom">
              {/* This empty div ensures proper spacing for the form overlap */}
              <div className="h-16 sm:h-20 md:h-24 lg:h-28"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Form Container - positioned to overlap with the hero section */}
      <div className="hero-form-container relative z-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div id="pickup-form" className="form-width-custom w-full max-w-[801px]">
              <HeroForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}