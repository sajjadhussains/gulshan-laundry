import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private customerId: string | null = null;
  private isAdmin: boolean = false;

  // Initialize socket connection
  connect(customerId?: string, isAdmin: boolean = false) {
    if (this.socket) {
      return this.socket;
    }

    // Connect to the socket server
    this.socket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
    });

    this.customerId = customerId || null;
    this.isAdmin = isAdmin;

    // Setup event listeners
    this.setupEventListeners();

    return this.socket;
  }

  // Setup socket event listeners
  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
      
      // Join appropriate room based on user type
      if (this.isAdmin) {
        this.socket.emit('adminJoin');
      } else if (this.customerId) {
        this.socket.emit('join', this.customerId);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  // Send a message
  sendMessage(message: any) {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    if (this.isAdmin) {
      this.socket.emit('adminReply', message);
    } else {
      this.socket.emit('sendMessage', message);
    }
  }

  // Subscribe to new messages
  onNewMessage(callback: (message: any) => void) {
    if (!this.socket) {
      console.error('Socket not connected');
      return () => {}; 
    }

    this.socket.on('newMessage', callback);
    return () => {
      if (this.socket) {
        this.socket.off('newMessage', callback);
      }
    };
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;
