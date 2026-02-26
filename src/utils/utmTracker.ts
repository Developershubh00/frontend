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
 
// Call ONCE on app load — first touch wins, never overwrites
export function captureUTMs(): void {
  if (sessionStorage.getItem(SESSION_KEY)) return;
  const params = new URLSearchParams(window.location.search);
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
  const hasData = Object.values(data).some(v => v !== '');
  if (hasData) sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}
 
// Call at signup form submission time
export function getStoredUTMs(): UTMData {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as UTMData;
  } catch { }
  return {
    utm_source: '', utm_medium: '', utm_campaign: '',
    utm_term: '', utm_content: '', gclid: '',
    referrer: document.referrer || '',
    landing_url: window.location.href,
  };
}
