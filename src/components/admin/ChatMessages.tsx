'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaHeadset, FaPaperPlane, FaRobot } from 'react-icons/fa';
import socketService from '@/services/socketService';

interface ChatMessage {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isBot?: boolean;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  onSendReply: (customerId: string, content: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, onSendReply }) => {
  const [replyText, setReplyText] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);
  
  // Initialize socket connection for admin
  useEffect(() => {
    // Connect to socket as admin
    const socket = socketService.connect(undefined, true);
    
    // Listen for new messages
    const unsubscribe = socketService.onNewMessage((message: ChatMessage) => {
      setLocalMessages(prevMessages => {
        // Check if message already exists
        const exists = prevMessages.some(m => m._id === message._id);
        if (exists) return prevMessages;
        
        return [...prevMessages, message];
      });
    });
    
    return () => {
      // Clean up socket connection
      if (unsubscribe) unsubscribe();
      socketService.disconnect();
    };
  }, []);
  
  // Update local messages when props messages change
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);
  
  // Group messages by customer
  const groupMessagesByCustomer = () => {
    const customerGroups: { [key: string]: ChatMessage[] } = {};
    
    localMessages.forEach(message => {
      let customerId;
      
      if (message.sender !== 'admin' && message.sender !== 'bot') {
        customerId = message.sender;
      } else if (message.recipient !== 'admin') {
        customerId = message.recipient;
      }
      
      if (customerId && customerId !== 'customer') {
        if (!customerGroups[customerId]) {
          customerGroups[customerId] = [];
        }
        customerGroups[customerId].push(message);
      }
    });
    
    // Sort messages within each customer group by timestamp
    Object.keys(customerGroups).forEach(customerId => {
      customerGroups[customerId].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
    
    return customerGroups;
  };
  
  const handleSendReply = () => {
    if (replyText.trim() && selectedCustomer) {
      // Create message object
      const messageData = {
        sender: 'admin',
        recipient: selectedCustomer,
        content: replyText.trim(),
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      // Add message to local state immediately for UI responsiveness
      setLocalMessages(prev => [...prev, messageData as ChatMessage]);
      
      // Send via socket
      socketService.sendMessage(messageData);
      
      // Clear input field
      setReplyText('');
    }
  };
  
  const customerGroups = groupMessagesByCustomer();
  const customerIds = Object.keys(customerGroups);
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Chat Messages</h2>
      
      {customerIds.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No chat messages yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer list */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3 border-b">
              <h3 className="font-bold">Customers</h3>
            </div>
            <div className="overflow-y-auto max-h-96">
              {customerIds.map(customerId => (
                <div 
                  key={customerId}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedCustomer === customerId ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedCustomer(customerId)}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <FaUser className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Customer {customerId.substring(0, 8)}</p>
                      <p className="text-xs text-gray-500">
                        {customerGroups[customerId].length} messages
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="md:col-span-2 border rounded-lg flex flex-col h-96">
            {selectedCustomer ? (
              <>
                <div className="bg-gray-100 p-3 border-b">
                  <h3 className="font-bold">
                    Conversation with Customer {selectedCustomer.substring(0, 8)}
                  </h3>
                </div>
                
                <div className="flex-grow overflow-y-auto p-4 space-y-3">
                  {customerGroups[selectedCustomer].map((message, index) => {
                    const isFromCustomer = message.sender === selectedCustomer;
                    const isFromBot = message.isBot || message.sender === 'bot';
                    const isFromAdmin = message.sender === 'admin';
                    
                    return (
                      <div 
                        key={message._id || index}
                        className={`flex ${isFromCustomer || isFromBot ? 'justify-start' : 'justify-end'}`}
                      >
                        {(isFromCustomer || isFromBot) && (
                          <div className="mr-2 mt-1">
                            {isFromCustomer ? (
                              <div className="bg-blue-100 rounded-full p-1">
                                <FaUser className="text-blue-500 text-sm" />
                              </div>
                            ) : (
                              <div className="bg-green-100 rounded-full p-1">
                                <FaRobot className="text-green-500 text-sm" />
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div 
                          className={`rounded-lg px-4 py-2 max-w-[70%] ${
                            isFromCustomer 
                              ? 'bg-gray-200 text-gray-800' 
                              : isFromBot
                                ? 'bg-green-100 text-gray-800'
                                : 'bg-blue-500 text-white'
                          }`}
                        >
                          {isFromBot && (
                            <div className="text-xs font-bold mb-1 text-green-700">Bot</div>
                          )}
                          {isFromAdmin && (
                            <div className="text-xs font-bold mb-1 text-blue-200">Admin</div>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <div className="text-xs opacity-70 text-right mt-1">
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                        
                        {isFromAdmin && (
                          <div className="ml-2 mt-1">
                            <div className="bg-blue-100 rounded-full p-1">
                              <FaHeadset className="text-blue-500 text-sm" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="p-3 border-t">
                  <div className="flex">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                    />
                    <button
                      onClick={handleSendReply}
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a customer to view conversation
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
