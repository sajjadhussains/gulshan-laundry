/**
 * Environment configuration
 * 
 * This file manages environment variables across different deployment environments
 * and validates that required environment variables are present.
 */

// Define the environment type
type Environment = 'development' | 'preview' | 'production';

// Get the current environment
export const getEnvironment = (): Environment => {
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || 'development';
  
  if (env === 'production') return 'production';
  if (env === 'preview') return 'preview';
  return 'development';
};

// Environment variable configuration
interface EnvConfig {
  // Add your environment variables here
  apiUrl: string;
  // Add more environment variables as needed
}

// Environment-specific configurations
const envConfig: Record<Environment, EnvConfig> = {
  development: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
  preview: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://preview.gulshan-laundry.vercel.app/api',
  },
  production: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://gulshan-laundry.vercel.app/api',
  },
};

// Get the current environment configuration
export const env = envConfig[getEnvironment()];

// Validate required environment variables
export const validateEnv = (): boolean => {
  const requiredVars: string[] = [
    // Add required environment variables here
    // Example: 'NEXT_PUBLIC_API_KEY'
  ];

  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    if (typeof window === 'undefined') {
      console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
    return false;
  }

  return true;
};

// Export the current environment for use in components
export const currentEnv = getEnvironment();
