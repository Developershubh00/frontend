import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;

  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Believers Consultancy | Medical PG Counselling Platform",

  description = "Believers Consultancy helps students with NEET PG counselling, INICET guidance, medical admissions, counselling analytics, and expert career support.",

  keywords = "Medical PG Counselling, NEET PG Counselling, INICET Counselling",

  canonical = window.location.href,

  ogImage = "https://believersconsultancy.com/og-image.png",

  noindex = false,

  type = "website",

  author = "Believers Consultancy",

  publishedTime,

  modifiedTime,
}) => {
  useEffect(() => {
    document.title = title;

    const updateMetaTag = (
      attribute: "name" | "property",
      value: string,
      content: string
    ) => {
      if (!content) return;

      let element = document.querySelector(
        `meta[${attribute}="${value}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Standard SEO
    updateMetaTag("name", "description", description);
    updateMetaTag("name", "keywords", keywords);
    updateMetaTag(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow"
    );

    updateMetaTag("name", "author", author);

    // Open Graph
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:image", ogImage);
    updateMetaTag("property", "og:url", canonical);
    updateMetaTag("property", "og:type", type);

    // Article Tags
    if (publishedTime) {
      updateMetaTag(
        "property",
        "article:published_time",
        publishedTime
      );
    }

    if (modifiedTime) {
      updateMetaTag(
        "property",
        "article:modified_time",
        modifiedTime
      );
    }

    // Twitter
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", ogImage);

    // Canonical
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute("href", canonical);
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    noindex,
    type,
    author,
    publishedTime,
    modifiedTime,
  ]);

  return null;
};