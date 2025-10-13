import { useEffect } from 'react';

interface AiSensyWidgetProps {
  widgetId: string;
  scriptSrc?: string;
}

const AiSensyWidget: React.FC<AiSensyWidgetProps> = ({ 
  widgetId, 
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

      // Cleanup function
      return () => {
        const scriptToRemove = document.getElementById('aisensy-wa-widget');
        if (scriptToRemove) {
          document.body.removeChild(scriptToRemove);
        }
      };
    }
  }, [widgetId, scriptSrc]);

  return null; // This component doesn't render anything visible
};

export default AiSensyWidget;

// Example usage in your App.tsx:
// import AiSensyWidget from './AiSensyWidget';
// 
// function App() {
//   return (
//     <div>
//       <AiSensyWidget widgetId="aaa56b" />
//       {/* Your other components */}
//     </div>
//   );
// }