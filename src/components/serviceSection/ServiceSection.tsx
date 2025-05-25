// components/ServiceSection.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  prices: PriceItem[];
}

interface PriceItem {
  item: string;
  price: string;
  priceValue: number;
  unit: string;
}

interface CartItem extends PriceItem {
  quantity: number;
  serviceId: string;
  serviceTitle: string;
}

export default function ServiceSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showPriceList, setShowPriceList] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const services: Service[] = [
    {
      id: 'washing',
      title: "Washing",
      description: "Venenatis tempor morbi class taciti porttitor habitant aliquam venenatis auctor a ultricies justo",
      icon: "/icons/washing-machine.svg",
      prices: [
        { item: "Regular Clothes", price: "৳50/kg", priceValue: 50, unit: "kg" },
        { item: "Delicate Clothes", price: "৳70/kg", priceValue: 70, unit: "kg" },
        { item: "Bedsheets", price: "৳60/piece", priceValue: 60, unit: "piece" },
        { item: "Curtains", price: "৳80/piece", priceValue: 80, unit: "piece" },
        { item: "Towels", price: "৳40/piece", priceValue: 40, unit: "piece" }
      ]
    },
    {
      id: 'folding',
      title: "Folding",
      description: "Venenatis tempor morbi class taciti porttitor habitant aliquam venenatis auctor a ultricies justo",
      icon: "/icons/folding.svg",
      prices: [
        { item: "Regular Clothes", price: "৳20/kg", priceValue: 20, unit: "kg" },
        { item: "Bedsheets", price: "৳30/piece", priceValue: 30, unit: "piece" },
        { item: "Curtains", price: "৳40/piece", priceValue: 40, unit: "piece" },
        { item: "Towels", price: "৳15/piece", priceValue: 15, unit: "piece" }
      ]
    },
    {
      id: 'ironing',
      title: "Ironing Clothes",
      description: "Venenatis tempor morbi class taciti porttitor habitant aliquam venenatis auctor a ultricies justo",
      icon: "/icons/iron.svg",
      prices: [
        { item: "Shirts", price: "৳30/piece", priceValue: 30, unit: "piece" },
        { item: "Pants", price: "৳35/piece", priceValue: 35, unit: "piece" },
        { item: "T-shirts", price: "৳25/piece", priceValue: 25, unit: "piece" },
        { item: "Dresses", price: "৳45/piece", priceValue: 45, unit: "piece" },
        { item: "Suits", price: "৳100/piece", priceValue: 100, unit: "piece" }
      ]
    },
    {
      id: 'dry-cleaning',
      title: "Dry Cleaning",
      description: "Venenatis tempor morbi class taciti porttitor habitant aliquam venenatis auctor a ultricies justo",
      icon: "/icons/dry-cleaning.svg",
      prices: [
        { item: "Suits", price: "৳300/piece", priceValue: 300, unit: "piece" },
        { item: "Dresses", price: "৳250/piece", priceValue: 250, unit: "piece" },
        { item: "Jackets", price: "৳200/piece", priceValue: 200, unit: "piece" },
        { item: "Coats", price: "৳350/piece", priceValue: 350, unit: "piece" },
        { item: "Silk Items", price: "৳200/piece", priceValue: 200, unit: "piece" }
      ]
    },
    {
      id: 'instant-service',
      title: "Instant Service",
      description: "Venenatis tempor morbi class taciti porttitor habitant aliquam venenatis auctor a ultricies justo",
      icon: "/icons/clock.svg",
      prices: [
        { item: "Washing (Express)", price: "৳80/kg", priceValue: 80, unit: "kg" },
        { item: "Dry Cleaning (Express)", price: "৳400/piece", priceValue: 400, unit: "piece" },
        { item: "Ironing (Express)", price: "৳50/piece", priceValue: 50, unit: "piece" },
        { item: "Full Service (Express)", price: "৳500/load", priceValue: 500, unit: "load" }
      ]
    },
    {
      id: 'self-service',
      title: "Self Service",
      description: "Venenatis tempor morbi class taciti porttitor habitant aliquam venenatis auctor a ultricies justo",
      icon: "/icons/self-service.svg",
      prices: [
        { item: "Washing Machine Use", price: "৳200/hour", priceValue: 200, unit: "hour" },
        { item: "Dryer Use", price: "৳150/hour", priceValue: 150, unit: "hour" },
        { item: "Detergent", price: "৳50/load", priceValue: 50, unit: "load" },
        { item: "Fabric Softener", price: "৳30/load", priceValue: 30, unit: "load" }
      ]
    }
  ];

  const openPriceList = (service: Service) => {
    setSelectedService(service);
    
    // Initialize cart items for this service if they don't exist
    const initialCartItems = service.prices.map(price => ({
      ...price,
      quantity: 0,
      serviceId: service.id,
      serviceTitle: service.title
    }));
    
    // Filter out any existing items for this service and add the new ones
    const existingItems = cartItems.filter(item => item.serviceId !== service.id);
    const serviceItems = cartItems.filter(item => item.serviceId === service.id);
    
    if (serviceItems.length > 0) {
      // Service items already exist in cart, use those
      setCartItems([...existingItems, ...serviceItems]);
    } else {
      // No items for this service in cart yet, add the initial ones
      setCartItems([...existingItems, ...initialCartItems]);
    }
    
    setShowPriceList(true);
  };

  const closePriceList = () => {
    setShowPriceList(false);
  };

  const incrementQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    if (selectedService) {
      const serviceItemIndex = updatedCartItems.findIndex(
        item => item.serviceId === selectedService.id && item.item === selectedService.prices[index].item
      );
      if (serviceItemIndex !== -1) {
        updatedCartItems[serviceItemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      }
    }
  };

  const decrementQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    if (selectedService) {
      const serviceItemIndex = updatedCartItems.findIndex(
        item => item.serviceId === selectedService.id && item.item === selectedService.prices[index].item
      );
      if (serviceItemIndex !== -1 && updatedCartItems[serviceItemIndex].quantity > 0) {
        updatedCartItems[serviceItemIndex].quantity -= 1;
        setCartItems(updatedCartItems);
      }
    }
  };

  const getItemQuantity = (index: number): number => {
    if (selectedService) {
      const item = cartItems.find(
        item => item.serviceId === selectedService.id && item.item === selectedService.prices[index].item
      );
      return item ? item.quantity : 0;
    }
    return 0;
  };

  const calculateTotal = (): number => {
    if (!selectedService) return 0;
    
    return cartItems
      .filter(item => item.serviceId === selectedService.id)
      .reduce((total, item) => total + (item.priceValue * item.quantity), 0);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image 
          src="/laundry-bg.jpg" 
          alt="Laundry Background" 
          fill 
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-12">
          <p className="text-blue-600 font-medium mb-2">About Service</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
            Clean, fast, and free pickup.
          </h2>
          <p className="text-gray-600 max-w-2xl mb-8">
            Vestibulum neque ultrices ut porttitor egestas risus integer mi euismod sodales amet. Condui natoque dis rutrum eros ultrices facilisi sodales poste nestellit scelerisque ligula.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300">
            Discover Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={32} 
                    height={32} 
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center text-navy-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {service.description}
              </p>
              <div className="text-center">
                <button 
                  onClick={() => openPriceList(service)}
                  className="inline-block text-blue-600 hover:text-blue-800 font-medium transition duration-300 border-b border-blue-600 pb-1"
                >
                  See Price List
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price List Modal */}
      {showPriceList && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto overflow-hidden">
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedService.title} Price List</h3>
              <button 
                onClick={closePriceList}
                className="text-white hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedService.prices.map((price, index) => {
                      const quantity = getItemQuantity(index);
                      const total = price.priceValue * quantity;
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {price.item}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {price.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button 
                                onClick={() => decrementQuantity(index)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                              >
                                -
                              </button>
                              <span className="mx-3 w-8 text-center">{quantity}</span>
                              <button 
                                onClick={() => incrementQuantity(index)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none text-blue-600"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {quantity > 0 ? `৳${total}` : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                        Total Amount:
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-blue-600">
                        ৳{calculateTotal()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button 
                  onClick={closePriceList}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition duration-300"
                >
                  Close
                </button>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                  disabled={calculateTotal() === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Pickup Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-navy-900 mb-6">Request Pickup</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input 
              type="tel" 
              placeholder="Phone" 
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="text" 
              placeholder="Time Pickup" 
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="Address" 
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 w-full">
              Pickup Now !
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
