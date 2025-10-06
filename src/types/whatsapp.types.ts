/**
 * AiSensy WhatsApp API Type Definitions
 * These types define the structure of requests and responses for the AiSensy API
 */

// Base configuration for AiSensy API
export interface AiSensyConfig {
  apiKey: string;
  baseUrl: string;
  partnerId?: string;
}

// Request payload for sending a message
export interface SendMessageRequest {
  campaignName: string; // Unique identifier for the campaign
  destination: string; // Phone number with country code (e.g., "919876543210")
  userName: string; // Name of the recipient
  templateParams?: string[]; // Array of parameters for template variables
  media?: {
    url: string; // URL of media file (image/video/document)
    filename?: string; // Optional filename for documents
  };
  source?: string; // Optional source identifier
  tags?: string[]; // Optional tags for categorization
}

// Response from sending a message
export interface SendMessageResponse {
  status: boolean;
  message: string;
  data?: {
    messageId: string;
    destination: string;
  };
  error?: string;
}

// Request payload for sending a template message
export interface SendTemplateRequest {
  campaignName: string;
  destination: string;
  userName: string;
  templateParams: string[];
  media?: {
    url: string;
    filename?: string;
  };
}

// Request payload for sending OTP
export interface SendOTPRequest {
  campaignName: string;
  destination: string;
  userName: string;
  otp: string;
}

// Hook return type
export interface UseWhatsAppReturn {
  sendMessage: (request: SendMessageRequest) => Promise<SendMessageResponse>;
  sendTemplate: (request: SendTemplateRequest) => Promise<SendMessageResponse>;
  sendOTP: (request: SendOTPRequest) => Promise<SendMessageResponse>;
  loading: boolean;
  error: string | null;
}

// Message status types
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

// Webhook payload structure (for receiving status updates)
export interface WebhookPayload {
  eventType: string;
  messageId: string;
  destination: string;
  status: MessageStatus;
  timestamp: string;
  error?: string;
}