// Frontend Configuration
export const config = {
  // Development URLs
  development: {
    apiUrl: "https://backend-dju9.onrender.com/",
    staticUrl: "https://backend-dju9.onrender.com/static/",
  },
  // Production URLs (update these with your actual URLs)
  production: {
    apiUrl: "https://backend-dju9.onrender.com/",
    staticUrl: "https://backend-dju9.onrender.com/static/",
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
};
