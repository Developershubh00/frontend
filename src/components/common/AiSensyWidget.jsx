import { useEffect } from "react";
import "./AiSensyWidget.css";

const AiSensyWidget = ({
  widgetId = "aaa5qq",
  scriptSrc = "https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js",
}) => {
  useEffect(() => {
    const existingScript = document.getElementById("aisensy-wa-widget");

    if (!existingScript) {
      const script = document.createElement("script");

      script.type = "text/javascript";
      script.src = scriptSrc;
      script.id = "aisensy-wa-widget";
      script.setAttribute("widget-id", widgetId);

      document.body.appendChild(script);

      return () => {
        const scriptToRemove = document.getElementById("aisensy-wa-widget");

        if (scriptToRemove) {
          document.body.removeChild(scriptToRemove);
        }
      };
    }
  }, [widgetId, scriptSrc]);

  return null;
};

export default AiSensyWidget;
