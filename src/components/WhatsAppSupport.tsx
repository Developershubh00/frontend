import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "../hooks/trackEvents";


/**
 * WhatsAppSupport Component
 * Compact floating WhatsApp button with connection popup
 */
const WhatsAppSupport: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  /**
   * Handle WhatsApp button click
   * Shows connecting popup then redirects to WhatsApp
   */
  const handleWhatsAppClick = () => {

     // ✅ Track click first
    trackWhatsAppClick(); 
    setShowPopup(true);
    
    // Redirect to WhatsApp after brief delay
    setTimeout(() => {
      const phoneNumber = "917428581913"; // Replace with actual WhatsApp number
      const message = encodeURIComponent(
        "Hi! I need help with medical Counselling guidance."
      );
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
      
      // Hide popup after redirect
      setTimeout(() => setShowPopup(false), 1000);
    }, 800);
  };

  return (
    <>
      {/* Connecting Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 ">
                <img
                 src="/media/whatsapp.png"
                  alt="WhatsApp"
                className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                Connecting...
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                Redirecting you to our executive on WhatsApp
              </p>
              <div className="flex space-x-2 mt-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-blue-200 hover:blue-200 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-40 group"
        aria-label="Contact us on WhatsApp"
      >
        
        <img
                 src="/media/whatsapp.png"
                  alt="WhatsApp"
                className="w-14 h-14 sm:w-12 sm:h-12 text-white group-hover:rotate-12 transition-transform duration-300"
                />
        {/* Pulse rings */}
        
      </button>
    </>
  );
};

export default WhatsAppSupport;