'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api, { adminLogin, verifyAdminToken } from '@/services/api';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token validity
      verifyAdminToken(token)
        .then(() => {
          setIsAuthenticated(true);
          setErrorMessage('');
        })
        .catch((error) => {
          // Token is invalid or expired
          console.error('Token verification failed:', error);
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      // Use the default admin credentials from the .env file
      // This is a temporary solution for development
      if (email === 'admin@example.com' && password === 'admin123') {
        // Create a mock token for development
        const mockToken = 'dev-token-' + Date.now();
        localStorage.setItem('adminToken', mockToken);
        setIsAuthenticated(true);
        return;
      }
      
      const response = await adminLogin(email, password);
      
      // Handle the API response format
      if (response && response.token) {
        localStorage.setItem('adminToken', response.token);
        setIsAuthenticated(true);
      } else if (response && response.message) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Extract error message
      let message = 'Login failed. Please check your credentials.';
      if (error.response) {
        message = error.response.data?.message || message;
      } else if (error.message) {
        message = error.message;
      }
      
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} errorMessage={errorMessage} />
      )}
    </div>
  );
}
