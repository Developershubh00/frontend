import { useEffect } from 'react';

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
  id?: string;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data, id = 'custom-jsonld' }) => {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('id', scriptId);
      document.head.appendChild(scriptTag);
    }
    
    scriptTag.textContent = JSON.stringify(data);

    return () => {
      scriptTag?.remove();
    };
  }, [data, id]);

  return null;
};