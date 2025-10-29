import React from 'react';
import { SEOHead } from './SEOHead';
import { JsonLd } from './JsonLd';

interface BlogPostSEOProps {
  title: string;
  description: string;
  slug: string;
  author?: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  keywords?: string;
  category?: string;
}

export const BlogPostSEO: React.FC<BlogPostSEOProps> = ({
  title,
  description,
  slug,
  author = 'Believers Consultancy',
  publishedDate,
  modifiedDate,
  image = 'https://cdn.dribbble.com/userupload/45206464/file/c3151a13076f702ddb0d22c8361a63bd.png',
//   image logo link 
  keywords,
  category,
}) => {
  const canonical = `https://believersconsultancy.com/blog/${slug}`;

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://believersconsultancy.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Believers Consultancy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.dribbble.com/userupload/45206464/file/c3151a13076f702ddb0d22c8361a63bd.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    },
    ...(category && { "articleSection": category })
  };

  return (
    <>
      <SEOHead
        title={`${title} | Believers Consultancy Blog`}
        description={description}
        keywords={keywords}
        canonical={canonical}
        ogImage={image}
        type="article"
        author={author}
        publishedTime={publishedDate}
        modifiedTime={modifiedDate}
      />
      <JsonLd data={articleStructuredData} id={`blog-${slug}`} />
    </>
  );
};