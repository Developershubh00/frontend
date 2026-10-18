import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./BlogHome.css";
import blogData from "../../assets/data/blogData";
import { pageSEO } from "../../seo/pageSEO";
import SEO from "../../seo/SEO";

const BLOGS_PER_LOAD = 9;

const CATEGORIES = [
  { label: "All Topics", colorClass: "tab-all" },
  { label: "NEET PG", colorClass: "tab-neetpg" },
  { label: "INI-CET", colorClass: "tab-inicet" },
  { label: "NEET UG", colorClass: "tab-neetug" },
  { label: "Others", colorClass: "tab-others" },
];

const CATEGORY_TAG_CLASS = {
  "All Topics": "bh-tag-all",
  "NEET PG": "bh-tag-neetpg",
  "INI-CET": "bh-tag-inicet",
  "NEET UG": "bh-tag-neetug",
  Others: "bh-tag-others",
};

const BlogHome = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(BLOGS_PER_LOAD);
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const seo = pageSEO["/blog"];

  const latestBlog = blogData[0];

  const filteredBlogs = blogData.filter((blog) => {
    const matchCategory =
      activeCategory === "All Topics" ||
      (blog.category && blog.category === activeCategory);

    const matchSearch =
      !searchQuery ||
      blog.metaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.metaDesc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlogs.length;

  const handleLoadMore = () => setVisibleCount((prev) => prev + BLOGS_PER_LOAD);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(BLOGS_PER_LOAD);
  };

  const getExcerpt = (htmlContent, wordLimit = 25) => {
    if (!htmlContent) return "";
    const plainText = htmlContent
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = plainText.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : plainText;
  };

  return (
    <>
      <SEO {...seo} />

      <div className="bh-wrapper">
        {/* Latest Blog Hero */}
        {latestBlog && (
          <div className="bh-hero">
            <div className="bh-hero-blob bh-hero-blob-1"></div>
            <div className="bh-hero-blob bh-hero-blob-2"></div>

            <div className="bh-hero-inner">
              <div className="bh-hero-img">
                <img src={latestBlog.image} alt={latestBlog.alt} />
              </div>
              <div className="bh-hero-content">
                <span className="bh-hero-label">Latest Article</span>
                <h1 className="bh-hero-title">{latestBlog.blogTitle}</h1>
                <p className="bh-hero-excerpt">
                  {getExcerpt(latestBlog.para, 35)}
                </p>
                <div className="bh-hero-meta">
                  <span>📅 {latestBlog.blogDate}</span>
                </div>
                <NavLink className="bh-hero-cta" to={`/blog/${latestBlog.id}`}>
                  Read Full Article →
                </NavLink>
              </div>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="bh-breadcrumb">
          <span className="bh-bc-link" onClick={() => navigate("/")}>
            Home
          </span>
          <span className="bh-bc-sep">›</span>
          <span className="bh-bc-current">Blogs</span>
        </div>

        {/* Filter Bar */}
        <div className="bh-filter-bar">
          <div className="bh-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className={`bh-filter-tab ${cat.colorClass}${activeCategory === cat.label ? " active" : ""}`}
                onClick={() => handleCategoryChange(cat.label)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <main className="bh-main">
          {/* All Blogs Grid */}
          <div className="bh-section-header">
            <div className="bh-section-label">
              <div className="bh-section-accent"></div>
              <h2 className="bh-section-title">Recent Blogs</h2>
              <span className="bh-section-count">
                {filteredBlogs.length} total
              </span>
            </div>
          </div>

          {visibleBlogs.length === 0 ? (
            <div className="bh-no-results">
              <p>No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <section className="bh-blogs-grid">
              {visibleBlogs.map((blog) => (
                <NavLink
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="bh-blog-card"
                >
                  <div className="bh-blog-card-img">
                    <img src={blog.image} alt={blog.alt} />
                  </div>
                  <div className="bh-card-body">
                    <span
                      className={`bh-card-tag ${CATEGORY_TAG_CLASS[blog.category] || "bh-tag-blue"}`}
                    >
                      {blog.category || "Medicine"}
                    </span>
                    <h3 className="bh-blog-card-title">{blog.blogTitle}</h3>
                    <p className="bh-blog-card-excerpt">
                      {getExcerpt(blog.para)}
                    </p>
                    <div className="bh-card-footer">
                      <div className="bh-card-meta">
                        <span>📅 {blog.blogDate}</span>
                      </div>
                      <span className="bh-card-read-more">Read More →</span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </section>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="bh-load-more-wrap">
              <button className="bh-load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </main>

        {/* Newsletter Strip */}
        {/* <div className="bh-newsletter-strip">
          <div className="bh-newsletter-text">
            <h3>Plan Your Medical Counselling with Confidence</h3>
            <p>
              Access real counselling data, closing ranks, seat trends, and
              expert guidance to make smarter college choices.
            </p>
          </div>

          <NavLink className="bh-newsletter-btn" target="_blank" to="/login">
            Start Free Counselling →
          </NavLink>
        </div> */}
      </div>
    </>
  );
};

export default BlogHome;
