import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const breadcrumbs = items || generateBreadcrumbs(location.pathname);

  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://believersconsultancy.com${item.path}`
    }))
  };

  React.useEffect(() => {
    // Add structured data to head
    let scriptTag = document.querySelector('script[data-schema="breadcrumb"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      scriptTag?.remove();
    };
  }, [breadcrumbs]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
      <Link 
        to="/" 
        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-900" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.path} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Helper function to auto-generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

  const pathMap: Record<string, string> = {
    'neet-pg': 'NEET PG',
    'inicet': 'INICET',
    'predictor': 'Predictor',
    'pg': 'PG',
    'medical-colleges': 'Medical Colleges',
    'allotments': 'Allotments',
    'closing-ranks': 'Closing Ranks',
    'seat-matrix': 'Seat Matrix',
    'fee-stipend-bond': 'Fee & Stipend',
    'blog': 'Blog',
    'faq': 'FAQ',
    'support': 'Support',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
  };

  let currentPath = '';
  paths.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      path: currentPath,
    });
  });

  return breadcrumbs;
}