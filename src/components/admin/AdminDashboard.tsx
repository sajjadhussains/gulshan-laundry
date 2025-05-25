'use client';

import React, { useState, useEffect } from 'react';
import { getOrders, getChatMessages, getPackages, updateOrderStatus, sendChatMessage, updatePackage, createPackage } from '@/services/api';
import io from 'socket.io-client';

// Define interfaces for data types
interface Order {
  _id: string;
  name: string;
  phone: string;
  address: string;
  pickupDate: string;
  preferredTime: string;
  packageId: string;
  packageName: string;
  specialInstructions?: string;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  wantsWhatsAppUpdates: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

// Create placeholder components for imports that might be missing
const OrdersList: React.FC<{
  orders: Order[];
  onStatusUpdate: (orderId: string, status: string) => void;
  onRefresh: () => void;
}> = ({ orders, onStatusUpdate, onRefresh }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Orders</h2>
    {orders.length === 0 ? (
      <p className="text-gray-500">No orders found</p>
    ) : (
      <ul className="divide-y divide-gray-200">
        {orders.map(order => (
          <li key={order._id} className="py-4">
            <p><strong>Customer:</strong> {order.name}</p>
            <p><strong>Package:</strong> {order.packageName}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <select 
              value={order.status}
              onChange={(e) => onStatusUpdate(order._id, e.target.value)}
              className="mt-2 border rounded p-1"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const ChatMessages: React.FC<{
  messages: Message[];
  onReply: (customerId: string, message: string) => void;
  onRefresh: () => void;
}> = ({ messages, onReply, onRefresh }) => {
  const socket = io();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      onRefresh();
    });
  }, [socket, onRefresh]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Chat Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200">
            {messages.map(message => (
              <li key={message._id} className="py-4">
                <p><strong>From:</strong> {message.sender === 'admin' ? 'Admin' : 'Customer'}</p>
                <p className="my-2">{message.content}</p>
                <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PackageManager: React.FC<{
  packages: Package[];
  onUpdate: (packageId: string, packageData: Partial<Package>) => void;
  onCreate: (packageData: Omit<Package, '_id'>) => void;
  onRefresh: () => void;
}> = ({ packages, onUpdate, onCreate, onRefresh }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Packages</h2>
    {packages.length === 0 ? (
      <p className="text-gray-500">No packages found</p>
    ) : (
      <ul className="divide-y divide-gray-200">
        {packages.map(pkg => (
          <li key={pkg._id} className="py-4">
            <p><strong>Name:</strong> {pkg.name}</p>
            <p><strong>Price:</strong> ${pkg.price}</p>
            <p><strong>Description:</strong> {pkg.description}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Fetch data based on active tab to avoid unnecessary requests
      if (activeTab === 'orders' || activeTab === '') {
        const response = await getOrders();
        
        // Handle the API response format
        let ordersData = [];
        if (response && response.data) {
          ordersData = response.data;
        } else if (Array.isArray(response)) {
          ordersData = response;
        }
        
        setOrders(ordersData);
      }
      
      if (activeTab === 'chat' || activeTab === '') {
        const response = await getChatMessages();
        
        // Handle the API response format
        let messagesData = [];
        if (response && response.data) {
          messagesData = response.data;
        } else if (Array.isArray(response)) {
          messagesData = response;
        }
        
        setMessages(messagesData);
      }
      
      if (activeTab === 'packages' || activeTab === '') {
        const response = await getPackages();
        
        // Handle the API response format
        let packagesData = [];
        if (response && response.data) {
          packagesData = response.data;
        } else if (Array.isArray(response)) {
          packagesData = response;
        }
        
        setPackages(packagesData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      // Refresh orders after update
      const response = await getOrders();
      let updatedOrders = [];
      if (response && response.data) {
        updatedOrders = response.data;
      } else if (Array.isArray(response)) {
        updatedOrders = response;
      }
      setOrders(updatedOrders);
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
    }
  };

  const handleSendChatReply = async (customerId: string, content: string) => {
    try {
      // Create message data
      const messageData = {
        sender: 'admin',
        recipient: customerId,
        content,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      // Send message via API
      await sendChatMessage(messageData);
      
      // No need to refresh messages as Socket.IO will handle real-time updates
    } catch (err) {
      console.error('Error sending chat reply:', err);
      setError('Failed to send reply. Please try again.');
    }
  };

  const handlePackageUpdate = async (packageId: string, packageData: Partial<Package>) => {
    try {
      await updatePackage(packageId, packageData);
      // Refresh packages after update
      const response = await getPackages();
      let updatedPackages = [];
      if (response && response.data) {
        updatedPackages = response.data;
      } else if (Array.isArray(response)) {
        updatedPackages = response;
      }
      setPackages(updatedPackages);
    } catch (err) {
      console.error('Error updating package:', err);
      setError('Failed to update package. Please try again.');
    }
  };

  const handlePackageCreate = async (packageData: Omit<Package, '_id'>) => {
    try {
      await createPackage(packageData);
      // Refresh packages after creation
      const response = await getPackages();
      let updatedPackages = [];
      if (response && response.data) {
        updatedPackages = response.data;
      } else if (Array.isArray(response)) {
        updatedPackages = response;
      }
      setPackages(updatedPackages);
    } catch (err) {
      console.error('Error creating package:', err);
      setError('Failed to create package. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Gulshan Laundry Admin</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              className={`${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('chat')}
            >
              Chat Messages
            </button>
            <button
              className={`${
                activeTab === 'packages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('packages')}
            >
              Packages
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button 
              onClick={fetchData}
              className="ml-4 text-sm underline"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {activeTab === 'orders' && (
              <OrdersList 
                orders={orders} 
                onStatusUpdate={handleOrderStatusUpdate} 
                onRefresh={fetchData} 
              />
            )}
            
            {activeTab === 'chat' && (
              <ChatMessages 
                messages={messages} 
                onReply={handleSendChatReply} 
                onRefresh={fetchData} 
              />
            )}
            
            {activeTab === 'packages' && (
              <PackageManager 
                packages={packages} 
                onUpdate={handlePackageUpdate} 
                onCreate={handlePackageCreate} 
                onRefresh={fetchData} 
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
