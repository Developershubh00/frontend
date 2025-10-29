import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Believers Consultancy - NEET PG Counselling & Medical College Admissions',
  description = 'Your trusted partner for NEET PG Counselling, INICET, medical college admissions, and career guidance.',
  keywords = 'NEET PG counselling, INICET counselling, medical college admissions, NEET PG predictor',
  canonical = 'https://believersconsultancy.com/',
  ogImage = 'https://cdn.dribbble.com/userupload/45206464/file/c3151a13076f702ddb0d22c8361a63bd.png',
  noindex = false,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  structuredData,
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
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', 'Believers Consultancy');
    
    // Article specific tags
    if (type === 'article') {
      if (author) updateMetaTag('property', 'article:author', author);
      if (publishedTime) updateMetaTag('property', 'article:published_time', publishedTime);
      if (modifiedTime) updateMetaTag('property', 'article:modified_time', modifiedTime);
    }
    
    // Twitter
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);
    updateMetaTag('name', 'twitter:site', '@believersconsult');

    // Update canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Add structured data if provided
    if (structuredData) {
      let scriptTag = document.querySelector('script[data-schema="page"]') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('data-schema', 'page');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, keywords, canonical, ogImage, noindex, type, author, publishedTime, modifiedTime, structuredData]);

  return null;
};