// Frontend Configuration
export const config = {
  // Development URLs
  development: {
    apiUrl: "http://127.0.0.1:8000/",
    staticUrl: "http://127.0.0.1:8000/static/",
  },
  // Production URLs (update these with your actual URLs)
  production: {
    apiUrl: "http://127.0.0.1:8000/",
    staticUrl: "http://127.0.0.1:8000/static/",
    // apiUrl: "https://backend-dju9.onrender.com/",
    // staticUrl: "https://backend-dju9.onrender.com/static/",
  },
};

// Get current environment
const isDevelopment = import.meta.env.DEV;

// Export current configuration
export const currentConfig = isDevelopment ? config.development : config.production;

// Environment variables for deployment
export const ENV = {
  VITE_API_URL: import.meta.env.VITE_API_URL || currentConfig.apiUrl,
  VITE_STATIC_URL: import.meta.env.VITE_STATIC_URL || currentConfig.staticUrl,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || "Believers Consultancy",
  VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
 
  // ✅ FIXED line:
  VITE_SHEET_WEBAPP_URL:
    import.meta.env.VITE_SHEET_WEBAPP_URL ||
    "https://script.google.com/macros/s/AKfycby4iB5llY-Z9UkL2avoWqLJqoPvVVBkub_USBkdQorm4DsF1XXRv4Yq4ztd-E55811j/exec"
  // VITE_AISENSY_API_KEY=your_actual_api_key_here
  // VITE_AISENSY_BASE_URL=https://backend.aisensy.com/campaign/t1/api/v2
  // VITE_AISENSY_PARTNER_ID=your_partner_id_if_you_have_one
};
