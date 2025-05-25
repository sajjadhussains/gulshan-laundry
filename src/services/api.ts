'use client';

import { env, currentEnv } from '../config/env';

// Types
export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  turnaround: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  packageId: string;
  status: string;
  date: string;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Mock data for packages
const mockPackages: Package[] = [
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
const mockOrders: Order[] = [
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

// API Client
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseUrl = env.apiUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    
    console.log(`API Client initialized in ${currentEnv} environment`);
  }

  // Add authorization header if token exists
  private getHeaders(additionalHeaders?: HeadersInit): HeadersInit {
    const headers: Record<string, string> = { ...this.defaultHeaders as Record<string, string> };
    
    // Get token from localStorage if we're in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return { ...headers, ...additionalHeaders };
  }

  // Generic request method
  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    headers?: HeadersInit
  ): Promise<T> {
    // In development/preview, use mock data
    if (currentEnv !== 'production' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
      return this.mockRequest<T>(method, endpoint, data);
    }
    
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(headers),
        body: data ? JSON.stringify(data) : undefined,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API ${method} request to ${endpoint} failed:`, error);
      throw error;
    }
  }
  
  // Mock request implementation for development
  private async mockRequest<T>(method: string, endpoint: string, data?: unknown): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock responses based on endpoint and method
    if (endpoint.includes('/packages')) {
      if (method === 'GET') return mockPackages as unknown as T;
      if (method === 'POST') {
        let dataObj = {};
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          dataObj = { ...data };
        }
        return {
          success: true,
          data: { id: `${Date.now()}`, ...dataObj },
          message: 'Package created successfully'
        } as unknown as T;
      }
    }
    
    if (endpoint.includes('/orders')) {
      if (method === 'GET') return mockOrders as unknown as T;
      if (method === 'POST') {
        let dataObj = {};
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          dataObj = { ...data };
        }
        return {
          success: true,
          data: { id: `${Date.now()}`, date: new Date().toISOString(), status: 'pending', ...dataObj },
          message: 'Order submitted successfully'
        } as unknown as T;
      }
    }
    
    // Default mock response
    return { success: true, data: {} } as unknown as T;
  }

  // HTTP methods
  async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, headers);
  }

  async post<T>(endpoint: string, data: unknown, headers?: HeadersInit): Promise<T> {
    return this.request<T>('POST', endpoint, data, headers);
  }

  async put<T>(endpoint: string, data: unknown, headers?: HeadersInit): Promise<T> {
    return this.request<T>('PUT', endpoint, data, headers);
  }

  async delete<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, headers);
  }
}

// Create and export API client instance
const apiClient = new ApiClient();
export default apiClient;

// Package API
export const getPackages = async (): Promise<Package[]> => {
  return apiClient.get<Package[]>('/packages');
};

export const createPackage = async (packageData: Omit<Package, 'id'>): Promise<Package> => {
  return apiClient.post<Package>('/packages', packageData);
};

export const updatePackage = async (packageId: string, packageData: Partial<Package>): Promise<Package> => {
  return apiClient.put<Package>(`/packages/${packageId}`, packageData);
};

// Order API
export const submitOrder = async (orderData: Omit<Order, 'id' | 'date' | 'status'>): Promise<ApiResponse<Order>> => {
  return apiClient.post<ApiResponse<Order>>('/orders', orderData);
};

export const getOrders = async (): Promise<Order[]> => {
  return apiClient.get<Order[]>('/orders');
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<ApiResponse<null>> => {
  return apiClient.put<ApiResponse<null>>(`/orders/${orderId}/status`, { status });
};

// Admin API
export const adminLogin = async (email: string, password: string): Promise<ApiResponse<{ token: string; user: unknown }>> => {
  // For development/preview environments, use mock implementation
  if (currentEnv !== 'production' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (email === 'admin@example.com' && password === 'password123') {
      return {
        success: true,
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin'
          }
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }
  
  return apiClient.post<ApiResponse<{ token: string; user: unknown }>>('/admin/login', { email, password });
};

export const verifyAdminToken = async (): Promise<ApiResponse<{ valid: boolean; user: unknown }>> => {
  return apiClient.get<ApiResponse<{ valid: boolean; user: unknown }>>('/admin/verify');
};
