import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Believers Consultancy - NEET PG Counselling & Medical College Admissions',
  description = 'Your trusted partner for NEET PG Counselling, INICET, medical college admissions, and career guidance.',
  keywords = 'NEET PG counselling, INICET counselling, medical college admissions, NEET PG predictor',
  canonical = 'https://believersconsultancy.com/',
  ogImage = 'https://cdn.dribbble.com/userupload/45206464/file/c3151a13076f702ddb0d22c8361a63bd.png',
  noindex = false,
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:url', canonical);
    
    // Twitter
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // Update canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

  }, [title, description, keywords, canonical, ogImage, noindex]);

  return null;
};