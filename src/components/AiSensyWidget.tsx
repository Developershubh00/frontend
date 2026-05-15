

import { useEffect } from 'react';

interface AiSensyWidgetProps {
  widgetId?: string;
  scriptSrc?: string;
}

const AiSensyWidget: React.FC<AiSensyWidgetProps> = ({ 
  widgetId = 'aaa5qq', 
  scriptSrc = 'https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js' 
}) => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.getElementById('aisensy-wa-widget');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptSrc;
      script.id = 'aisensy-wa-widget';
      script.setAttribute('widget-id', widgetId);
      
      document.body.appendChild(script);

      // Add custom styles to fix positioning on mobile
      const style = document.createElement('style');
      style.id = 'aisensy-custom-styles';
      style.innerHTML = `
        /* Fix WhatsApp widget positioning on mobile */
        #aisensy-magnetic-standalone,
        .aisensy-wa-chat-container,
        .wa-chat-box-content-container {
          z-index: 9999 !important;
        }
        
        /* Desktop - keep it in normal position */
        @media (min-width: 768px) {
          #aisensy-magnetic-standalone {
            bottom: 20px !important;
            right: 20px !important;
          }
        }
        
        /* Mobile - position above bottom navbar */
        @media (max-width: 767px) {
          #aisensy-magnetic-standalone {
            bottom: 80px !important; /* Adjust this value based on your navbar height */
            right: 15px !important;
          }
        }
        
        /* Extra small screens */
        @media (max-width: 480px) {
          #aisensy-magnetic-standalone {
            bottom: 75px !important;
            right: 10px !important;
          }
        }
      `;
      document.head.appendChild(style);

      // Cleanup function
      return () => {
        const scriptToRemove = document.getElementById('aisensy-wa-widget');
        const styleToRemove = document.getElementById('aisensy-custom-styles');
        
        if (scriptToRemove) {
          document.body.removeChild(scriptToRemove);
        }
        if (styleToRemove) {
          document.head.removeChild(styleToRemove);
        }
      };
    }
  }, [widgetId, scriptSrc]);

  return null;
};

export default AiSensyWidget;