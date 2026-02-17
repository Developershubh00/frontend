import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
 
// ── SIGNUP ─────────────────────────────────────────────
// Call this in SignupPage after successful signup
export const trackSignup = () => {
  ReactGA.event({ category: 'Auth', action: 'Signup Completed' });
  ReactPixel.track('CompleteRegistration', {});
};
 
// ── LOGIN ──────────────────────────────────────────────
// Call this in LoginPage after successful login
export const trackLogin = () => {
  ReactGA.event({ category: 'Auth', action: 'Login Success' });
  ReactPixel.trackCustom('Login');
};
 
// ── CONTACT FORM ───────────────────────────────────────
// Call this when contact form submits successfully
export const trackContactFormSubmit = () => {
  ReactGA.event({ category: 'Lead', action: 'Contact Form Submitted' });
  ReactPixel.track('Lead', { content_name: 'contact_form' });
};
 
// ── WHATSAPP CLICK ─────────────────────────────────────
// Call this on any WhatsApp button onClick
export const trackWhatsAppClick = () => {
  ReactGA.event({ category: 'Lead', action: 'WhatsApp Clicked' });
  ReactPixel.track('Contact', { content_name: 'WhatsApp' });
};
 
// ── CTA BUTTON ─────────────────────────────────────────
// Call this on any important CTA button click
export const trackCTAClick = (ctaName: string) => {
  ReactGA.event({ category: 'Engagement', action: 'CTA Clicked', label: ctaName });
  ReactPixel.trackCustom('CTAClick', { cta_name: ctaName });
};
 
// ── BLOG READ ──────────────────────────────────────────
// Call this when a blog article is opened
export const trackBlogRead = (blogTitle: string) => {
  ReactGA.event({ category: 'Content', action: 'Blog Read', label: blogTitle });
  ReactPixel.trackCustom('BlogRead', { blog_title: blogTitle });
};
 
// ── PREDICTOR USED ─────────────────────────────────────
// Call this when user runs a rank prediction
export const trackPredictorUsed = () => {
  ReactGA.event({ category: 'Tool', action: 'Predictor Used' });
  ReactPixel.trackCustom('PredictorUsed');
};
