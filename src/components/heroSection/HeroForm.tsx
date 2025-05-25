// components/heroSection/HeroForm.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  time: string;
}

export default function HeroForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    time: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format message for WhatsApp
    const message = `
*New Pickup Request*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Time: ${formData.time}
    `.trim();
    
    // Encode the message for a WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Replace with your actual WhatsApp business phone number (with country code)
    const phoneNumber = '+8801767685625'; // Format: CountryCodePhoneNumber (no +, spaces or dashes)
    
    // Create WhatsApp API URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      time: '',
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-lg p-5 sm:p-6 rounded-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-800 mb-4 sm:mb-5">Request Pickup</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Row 1 */}
          <div className="sm:col-span-1">
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="sm:col-span-1">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="sm:col-span-1">
            <label htmlFor="phone" className="sr-only">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Row 2 */}
          <div className="sm:col-span-1 md:col-span-2">
            <label htmlFor="address" className="sr-only">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="sm:col-span-1">
            <label htmlFor="time" className="sr-only">Time Pickup</label>
            <input
              type="text"
              id="time"
              name="time"
              placeholder="Time Pickup"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="sm:col-span-2 md:col-span-3 mt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Pickup Now!
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}