import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view in Google Analytics
    if (window.gtag) {
      window.gtag('config', 'G-8V35TD0JH4', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};