import React from "react";
import "./SeoSection.css";

const SeoSection = ({
  image,
  alt,
  title,
  description,
  ctaText = "Explore Now",
  ctaLink = "#",
  isExternal = false,
}) => {
  return (
    <div className="seo-section-container">
      <div className="seo-section-wrapper">
        <div className="seo-section-image">
          <img src={image} alt={alt || title} loading="lazy" />
        </div>

        <div className="seo-section-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className="seo-section-cta">
          {isExternal ? (
            <a href={ctaLink} className="seo-explore-btn">
              {ctaText}
            </a>
          ) : (
            <a href={ctaLink} className="seo-explore-btn">
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeoSection;
