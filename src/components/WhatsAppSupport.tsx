import React, { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

/**
 * WhatsAppSupport Component
 * Floating WhatsApp support widget for instant customer support
 * Provides direct link to WhatsApp chat with pre-filled message
 */
const WhatsAppSupport: React.FC = () => {
  // State for widget expansion
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Handle WhatsApp button click
   * Opens WhatsApp with pre-filled message
   */
  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
    const message = encodeURIComponent(
      "Hi! I need help with medical Counselling guidance."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Card */}
      {isExpanded && (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 max-w-sm mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">WhatsApp Support</h3>
                <p className="text-sm text-slate-600">We're online now!</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          <p className="text-sm text-slate-700 mb-4">
            Need instant help? Chat with our Counselling experts on WhatsApp for
            immediate assistance.
          </p>

          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Start WhatsApp Chat</span>
          </button>

          <p className="text-xs text-slate-500 mt-2 text-center">
            Available 24/7 for urgent queries
          </p>
        </div>
      )}

      {/* Floating Phone Icon */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group relative"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        <Phone className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default WhatsAppSupport;