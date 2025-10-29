import React from 'react';
import { JsonLd } from './JsonLd';

interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  url?: string;
}

export const CourseSchema: React.FC<CourseSchemaProps> = ({
  name,
  description,
  provider = 'Believers Consultancy',
  url = 'https://believersconsultancy.com'
}) => {
  const courseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": url
    }
  };

  return <JsonLd data={courseStructuredData} id="course-schema" />;
};
