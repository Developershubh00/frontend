// export interface UTMData {
//   utm_source: string;
//   utm_medium: string;
//   utm_campaign: string;
//   utm_term: string;
//   utm_content: string;
//   gclid: string;
//   referrer: string;
//   landing_url: string;
// }
 
// const SESSION_KEY = 'blc_utm_data';
 
// // Call ONCE on app load — first touch wins, never overwrites
// export function captureUTMs(): void {
//   if (sessionStorage.getItem(SESSION_KEY)) return;
//   const params = new URLSearchParams(window.location.search);
//   const data: UTMData = {
//     utm_source:   params.get('utm_source')   || '',
//     utm_medium:   params.get('utm_medium')   || '',
//     utm_campaign: params.get('utm_campaign') || '',
//     utm_term:     params.get('utm_term')     || '',
//     utm_content:  params.get('utm_content')  || '',
//     gclid:        params.get('gclid') || params.get('gbraid') || '',
//     referrer:     document.referrer || '',
//     landing_url:  window.location.href,
//   };
//   const hasData = Object.values(data).some(v => v !== '');
//   if (hasData) sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
// }
 
// // Call at signup form submission time
// export function getStoredUTMs(): UTMData {
//   try {
//     const raw = sessionStorage.getItem(SESSION_KEY);
//     if (raw) return JSON.parse(raw) as UTMData;
//   } catch { }
//   return {
//     utm_source: '', utm_medium: '', utm_campaign: '',
//     utm_term: '', utm_content: '', gclid: '',
//     referrer: document.referrer || '',
//     landing_url: window.location.href,
//   };
// }
export interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  referrer: string;
  landing_url: string;
}

const SESSION_KEY = 'blc_utm_data';

/**
 * Called ONCE on app load (main.tsx).
 *
 * Strategy:
 *  - If the current URL has real UTM/gclid params, ALWAYS capture and overwrite.
 *    (Ad click should always take priority over a prior organic visit.)
 *  - If no UTM params, only store if nothing is saved yet (first touch).
 *  - Saves to both sessionStorage (primary) and localStorage (cross-reload backup).
 */
export function captureUTMs(): void {
  const params = new URLSearchParams(window.location.search);

  const hasPaidParams =
    params.has('utm_source') ||
    params.has('utm_medium') ||
    params.has('gclid') ||
    params.has('gbraid');

  const alreadyCaptured = sessionStorage.getItem(SESSION_KEY);

  // Always overwrite when paid/UTM params are present in the URL.
  // Only skip if we already have data AND this is a clean URL (e.g. user navigated internally).
  if (!hasPaidParams && alreadyCaptured) return;

  const data: UTMData = {
    utm_source:   params.get('utm_source')   || '',
    utm_medium:   params.get('utm_medium')   || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term:     params.get('utm_term')     || '',
    utm_content:  params.get('utm_content')  || '',
    gclid:        params.get('gclid') || params.get('gbraid') || '',
    referrer:     document.referrer || '',
    landing_url:  window.location.href,
  };

  // Only save if there's at least one meaningful tracking signal
  const hasTrackingSignal =
    hasPaidParams ||
    !!document.referrer;

  if (hasTrackingSignal) {
    const serialised = JSON.stringify(data);
    sessionStorage.setItem(SESSION_KEY, serialised);
    // localStorage backup: survives page refresh and new tabs from the same origin
    try { localStorage.setItem(SESSION_KEY, serialised); } catch { /* quota */ }
  }
}

/**
 * Call at signup form submission time.
 * Reads from sessionStorage first; falls back to localStorage if the user
 * opened the signup page in a fresh tab (sessionStorage would be empty).
 */
export function getStoredUTMs(): UTMData {
  const EMPTY: UTMData = {
    utm_source: '', utm_medium: '', utm_campaign: '',
    utm_term:   '', utm_content: '', gclid: '',
    referrer:   document.referrer || '',
    landing_url: window.location.href,
  };

  try {
    const fromSession = sessionStorage.getItem(SESSION_KEY);
    if (fromSession) return JSON.parse(fromSession) as UTMData;

    // Fallback: localStorage (covers "open in new tab" scenario)
    const fromLocal = localStorage.getItem(SESSION_KEY);
    if (fromLocal) return JSON.parse(fromLocal) as UTMData;
  } catch { /* parse error */ }

  return EMPTY;
}