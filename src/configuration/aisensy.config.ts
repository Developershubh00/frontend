import { AiSensyConfig } from '../types/whatsapp.types';

/**
 * AiSensy API Configuration
 * 
 * Setup Instructions:
 * 1. Get your API key from AiSensy dashboard (https://app.aisensy.com)
 * 2. Navigate to Settings > API Keys
 * 3. Copy the API key and add it to your .env file as VITE_AISENSY_API_KEY
 * 4. Optional: Add your partner ID if you have one
 */

// Validate that environment variables are set
const validateConfig = () => {
  if (!import.meta.env.VITE_AISENSY_API_KEY) {
    throw new Error(
      'VITE_AISENSY_API_KEY is not defined. Please add it to your .env file.'
    );
  }
  
  if (!import.meta.env.VITE_AISENSY_BASE_URL) {
    throw new Error(
      'VITE_AISENSY_BASE_URL is not defined. Please add it to your .env file.'
    );
  }
};

// Run validation on import
validateConfig();

// Export the configuration object
export const aiSensyConfig: AiSensyConfig = {
  apiKey: import.meta.env.VITE_AISENSY_API_KEY,
  baseUrl: import.meta.env.VITE_AISENSY_BASE_URL,
  partnerId: import.meta.env.VITE_AISENSY_PARTNER_ID || undefined,
};

// API Endpoints
export const AISENSY_ENDPOINTS = {
  SEND_MESSAGE: '/send', // Endpoint for sending messages
  SEND_TEMPLATE: '/sendTemplateMessage', // Endpoint for template messages
  SEND_OTP: '/sendOTP', // Endpoint for sending OTP
  GET_STATUS: '/getStatus', // Endpoint for checking message status
} as const;

// Default headers for API requests
export const getDefaultHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});