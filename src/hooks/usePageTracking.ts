// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export const usePageTracking = () => {
//   const location = useLocation();

//   useEffect(() => {
//     // Track page view in Google Analytics
//     if (window.gtag) {
//       window.gtag('config', 'G-WHDNY2WK54', {
//         page_path: location.pathname + location.search,
//       });
//     }
//   }, [location]);
// };

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
 
export const usePageTracking = () => {
  const location = useLocation();
 
  useEffect(() => {
    // ── GA4 via gtag (your existing method) ──────────
    if (window.gtag) {
      window.gtag('config', 'G-WHDNY2WK54', {
        page_path: location.pathname + location.search,
      });
    }
 
    // ── GA4 via react-ga4 (backup, more reliable) ────
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
      title: document.title,
    });
 
    // ── Meta Pixel pageview ───────────────────────────
    ReactPixel.pageView();
 
  }, [location]);
};
