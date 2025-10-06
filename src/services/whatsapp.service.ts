import { aiSensyConfig, AISENSY_ENDPOINTS, getDefaultHeaders } from '../configuration/aisensy.config';
import {
  SendMessageRequest,
  SendMessageResponse,
  SendTemplateRequest,
  SendOTPRequest,
} from '../types/whatsapp.types';

/**
 * WhatsApp Service Layer
 * Handles all API communications with AiSensy WhatsApp API
 */

class WhatsAppService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = aiSensyConfig.baseUrl;
    this.apiKey = aiSensyConfig.apiKey;
  }

  /**
   * Make API request to AiSensy
   * @param endpoint - API endpoint
   * @param data - Request payload
   * @returns Response from API
   */
  private async makeRequest<T>(
    endpoint: string,
    data: Record<string, any>
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      // Add API key to the request body
      const payload = {
        ...data,
        apiKey: this.apiKey,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(payload),
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return result as T;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * Send a WhatsApp message
   * @param request - Message details
   * @returns API response
   * 
   * Usage Example:
   * sendMessage({
   *   campaignName: "welcome_message",
   *   destination: "919876543210",
   *   userName: "John Doe",
   *   templateParams: ["John", "Welcome to our service!"]
   * })
   */
  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    return this.makeRequest<SendMessageResponse>(
      AISENSY_ENDPOINTS.SEND_MESSAGE,
      request
    );
  }

  /**
   * Send a template-based WhatsApp message
   * Template must be pre-approved in AiSensy dashboard
   * @param request - Template message details
   * @returns API response
   * 
   * Setup Instructions:
   * 1. Go to AiSensy Dashboard > Templates
   * 2. Create and get approval for your template
   * 3. Use the template name as campaignName
   * 4. Pass template variables in templateParams array
   */
  async sendTemplate(request: SendTemplateRequest): Promise<SendMessageResponse> {
    return this.makeRequest<SendMessageResponse>(
      AISENSY_ENDPOINTS.SEND_TEMPLATE,
      request
    );
  }

  /**
   * Send an OTP via WhatsApp
   * @param request - OTP details
   * @returns API response
   * 
   * Note: Requires OTP template to be set up in AiSensy
   */
  async sendOTP(request: SendOTPRequest): Promise<SendMessageResponse> {
    return this.makeRequest<SendMessageResponse>(
      AISENSY_ENDPOINTS.SEND_OTP,
      request
    );
  }

  /**
   * Validate phone number format
   * AiSensy requires format: country_code + number (e.g., "919876543210")
   * @param phoneNumber - Phone number to validate
   * @returns Formatted phone number or throws error
   */
  validatePhoneNumber(phoneNumber: string): string {
    // Remove any spaces, dashes, or special characters
    const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');
    
    // Check if it starts with + and remove it
    const withoutPlus = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
    
    // Validate that it contains only digits
    if (!/^\d+$/.test(withoutPlus)) {
      throw new Error('Phone number must contain only digits');
    }
    
    // Minimum length check (country code + number should be at least 10 digits)
    if (withoutPlus.length < 10) {
      throw new Error('Phone number is too short');
    }
    
    return withoutPlus;
  }
}

// Export a singleton instance
export const whatsAppService = new WhatsAppService();

// Also export the class for testing purposes
export default WhatsAppService;