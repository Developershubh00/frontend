import { useState, useCallback } from 'react';
import { whatsAppService } from '../services/whatsapp.service';
import {
  SendMessageRequest,
  SendMessageResponse,
  SendTemplateRequest,
  SendOTPRequest,
  UseWhatsAppReturn,
} from '../types/whatsapp.types';

/**
 * Custom React Hook for WhatsApp Integration
 * Provides easy-to-use functions for sending WhatsApp messages
 * 
 * Usage Example:
 * const { sendMessage, loading, error } = useWhatsApp();
 * 
 * await sendMessage({
 *   campaignName: "test_campaign",
 *   destination: "919876543210",
 *   userName: "John"
 * });
 */
export const useWhatsApp = (): UseWhatsAppReturn => {
  // State for loading and error handling
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Send a WhatsApp message
   * Wraps the service call with loading and error states
   */
  const sendMessage = useCallback(
    async (request: SendMessageRequest): Promise<SendMessageResponse> => {
      setLoading(true);
      setError(null);

      try {
        // Validate phone number format
        const validatedPhone = whatsAppService.validatePhoneNumber(request.destination);
        
        // Send the message with validated phone
        const response = await whatsAppService.sendMessage({
          ...request,
          destination: validatedPhone,
        });

        // Check if the API returned an error
        if (!response.status) {
          throw new Error(response.error || 'Failed to send message');
        }

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Send a template-based WhatsApp message
   * Templates must be pre-approved in AiSensy dashboard
   */
  const sendTemplate = useCallback(
    async (request: SendTemplateRequest): Promise<SendMessageResponse> => {
      setLoading(true);
      setError(null);

      try {
        const validatedPhone = whatsAppService.validatePhoneNumber(request.destination);
        
        const response = await whatsAppService.sendTemplate({
          ...request,
          destination: validatedPhone,
        });

        if (!response.status) {
          throw new Error(response.error || 'Failed to send template message');
        }

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Send an OTP via WhatsApp
   * Requires OTP template setup in AiSensy
   */
  const sendOTP = useCallback(
    async (request: SendOTPRequest): Promise<SendMessageResponse> => {
      setLoading(true);
      setError(null);

      try {
        const validatedPhone = whatsAppService.validatePhoneNumber(request.destination);
        
        const response = await whatsAppService.sendOTP({
          ...request,
          destination: validatedPhone,
        });

        if (!response.status) {
          throw new Error(response.error || 'Failed to send OTP');
        }

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    sendMessage,
    sendTemplate,
    sendOTP,
    loading,
    error,
  };
};