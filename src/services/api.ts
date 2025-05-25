'use client';

// Mock data for packages
const mockPackages = [
  {
    id: '1',
    name: 'Basic Laundry',
    description: 'Regular wash and fold service',
    price: 15.99,
    turnaround: '24 hours',
    image: '/images/packages/basic-laundry.jpg'
  },
  {
    id: '2',
    name: 'Premium Dry Cleaning',
    description: 'Professional dry cleaning for delicate items',
    price: 29.99,
    turnaround: '48 hours',
    image: '/images/packages/premium-dry-cleaning.jpg'
  },
  {
    id: '3',
    name: 'Express Service',
    description: 'Same-day laundry service',
    price: 24.99,
    turnaround: '8 hours',
    image: '/images/packages/express-service.jpg'
  }
];

// Mock data for orders
const mockOrders = [
  {
    id: '1001',
    customerName: 'John Doe',
    packageId: '1',
    status: 'completed',
    date: '2025-05-20T10:30:00Z',
    total: 15.99
  },
  {
    id: '1002',
    customerName: 'Jane Smith',
    packageId: '2',
    status: 'processing',
    date: '2025-05-25T14:45:00Z',
    total: 29.99
  }
];

// Package API (mock implementations)
export const getPackages = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPackages;
};

export const createPackage = async (packageData: any) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newPackage = {
    id: `${Date.now()}`,
    ...packageData
  };
  return newPackage;
};

export const updatePackage = async (packageId: string, packageData: any) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    id: packageId,
    ...packageData
  };
};

// Order API (mock implementations)
export const submitOrder = async (orderData: any) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  const newOrder = {
    id: `${Date.now()}`,
    date: new Date().toISOString(),
    status: 'pending',
    ...orderData
  };
  return {
    success: true,
    message: 'Order submitted successfully',
    order: newOrder
  };
};

export const getOrders = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockOrders;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    success: true,
    message: `Order ${orderId} status updated to ${status}`
  };
};

// Admin API (mock implementations)
export const adminLogin = async (email: string, password: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  // Simple validation for demo purposes
  if (email === 'admin@example.com' && password === 'password123') {
    return {
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      }
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const verifyAdminToken = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Always return valid for demo purposes
  return {
    valid: true,
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    }
  };
};

// No need for axios instance anymore
export default {
  get: async () => ({}),
  post: async () => ({}),
  put: async () => ({}),
  delete: async () => ({})
};
