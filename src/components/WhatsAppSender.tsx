import { useState, FormEvent } from 'react';
import { useWhatsApp } from '../hooks/useWhatsApp';

/**
 * Example WhatsApp Sender Component
 * Demonstrates how to use the useWhatsApp hook
 * 
 * This is a working example that you can customize based on your needs
 */
export const WhatsAppSender = () => {
  // Use the WhatsApp hook
  const { sendMessage, loading, error } = useWhatsApp();

  // Form state
  const [formData, setFormData] = useState({
    campaignName: '',
    phoneNumber: '',
    userName: '',
    message: '',
  });

  // Success message state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Handle form input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    try {
      // Send the message using the hook
      const response = await sendMessage({
        campaignName: formData.campaignName,
        destination: formData.phoneNumber,
        userName: formData.userName,
        templateParams: [formData.userName, formData.message],
      });

      // Show success message
      setSuccessMessage(`Message sent successfully! Message ID: ${response.data?.messageId}`);
      
      // Reset form
      setFormData({
        campaignName: '',
        phoneNumber: '',
        userName: '',
        message: '',
      });
    } catch (err) {
      // Error is already handled by the hook
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Send WhatsApp Message</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Campaign Name Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="campaignName" style={{ display: 'block', marginBottom: '5px' }}>
            Campaign Name:
          </label>
          <input
            type="text"
            id="campaignName"
            name="campaignName"
            value={formData.campaignName}
            onChange={handleChange}
            required
            placeholder="e.g., welcome_message"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <small style={{ color: '#666' }}>
            Must match a template created in AiSensy dashboard
          </small>
        </div>

        {/* Phone Number Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '5px' }}>
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="919876543210"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <small style={{ color: '#666' }}>
            Include country code (e.g., 91 for India)
          </small>
        </div>

        {/* User Name Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="userName" style={{ display: 'block', marginBottom: '5px' }}>
            User Name:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            placeholder="John Doe"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Message Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message here..."
            rows={4}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#25D366',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            color: '#c00',
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#efe',
            border: '1px solid #cfc',
            borderRadius: '4px',
            color: '#060',
          }}
        >
          <strong>Success:</strong> {successMessage}
        </div>
      )}
    </div>
  );
};