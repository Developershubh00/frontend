import React, { useRef, useMemo, useEffect } from "react";
import "./BlogPage.css";
import blogData from "../../assets/data/blogData";
import {
  useParams,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import SeoSection from "./SeoSection";

const CATEGORY_TAG_CLASS = {
  "All Topics": "bp-tag-navy",
  "NEET PG": "bp-tag-blue",
  "INI-CET": "bp-tag-red",
  "NEET UG": "bp-tag-purple",
  Others: "bp-tag-amber",
};

function BlogPage() {
  const { blogId } = useParams();
  const blog = blogData.find((b) => String(b.id) === String(blogId));
  const navigate = useNavigate();
  const location = useLocation();
  const carouselRef = useRef(null);

  // Scroll to top on blog change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blogId, location.pathname]);

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!blog?.para) return "2 min read";
    const words = blog.para.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  }, [blog]);

  // Format blog content (add ids to h4s + insert inline CTA sections BEFORE matching heading)
  const formatContent = (content, seoInfo = []) => {
    if (!content) return null;
    const paragraphs = content.split("\n\n").filter((p) => p.trim());
    let headingIndex = 0;
    const elements = [];

    paragraphs.forEach((paragraph, index) => {
      const trimmed = paragraph.trim();

      // 🛡️ Skip stray JS/object-like text accidentally pasted into para
      if (!trimmed.includes("<") && /^\w+\s*:\s*[\[{]/.test(trimmed)) {
        return;
      }

      if (trimmed.startsWith("—")) {
        elements.push(
          <p
            key={`p-${index}`}
            className="bp-author-signature"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />,
        );
        return;
      }

      if (paragraph.includes("<h4>")) {
        const headingMatch = paragraph.match(/<h4>(.*?)<\/h4>/);
        const headingText = headingMatch ? headingMatch[1].trim() : "";

        // 👇 Insert vision sections BEFORE this heading
        seoInfo
          .filter((vs) => vs.beforeHeading === headingText)
          .forEach((vs, vIndex) => {
            elements.push(
              <SeoSection
                key={`vision-${index}-${vIndex}`}
                image={vs.image}
                alt={vs.alt}
                title={vs.title}
                description={vs.description}
                ctaText={vs.ctaText}
                ctaLink={vs.ctaLink}
                isExternal={vs.isExternal}
              />,
            );
          });

        const modified = paragraph.replace(
          /<h4>/g,
          () => `<h4 id="section-${headingIndex++}">`,
        );

        elements.push(
          <div
            key={`p-${index}`}
            dangerouslySetInnerHTML={{ __html: modified }}
          />,
        );

        return;
      }

      elements.push(
        <div
          key={`p-${index}`}
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />,
      );
    });

    return elements;
  };

  // Share handler
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.metaTitle,
          text: blog.metaDesc,
          url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Blog link copied to clipboard!");
    }
  };

  const getExcerpt = (htmlContent, wordLimit = 40) => {
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

  // Carousel scroll
  const handleScroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "next" ? 400 : -400,
        behavior: "smooth",
      });
    }
  };

  // Related blogs (exclude current)
  const relatedBlogs = blogData
    .filter((b) => String(b.id) !== String(blogId))
    .slice(0, 3);

  if (!blog) {
    return (
      <div className="bp-not-found">
        <Helmet>
          <title>Blog Not Found</title>
        </Helmet>
        <h2>Blog not found</h2>
        <NavLink to="/blogs" className="bp-back-btn">
          Back to Blogs
        </NavLink>
      </div>
    );
  }

  // Convert "June 10, 2025" → "2025-06-10"
  const toISODate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return isNaN(date) ? "" : date.toISOString().split("T")[0];
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://corebtr.com/blog/${blogId}`,
    },
    headline: blog.metaTitle,
    description: blog.metaDesc,
    image: {
      "@type": "ImageObject",
      url: blog.image,
      width: 1200,
      height: 630,
    },
    datePublished: `${toISODate(blog.blogDate)}T00:00:00+05:30`,
    dateModified: `${toISODate(blog.blogDate)}T00:00:00+05:30`,
    publisher: {
      "@type": "Organization",
      name: "CoreBTR",
      url: "https://corebtr.com",
      logo: {
        "@type": "ImageObject",
        url: "https://cdn.dribbble.com/userupload/47577791/file/25dd269a09491e2a44c8437764fb5473.png",
        width: 300,
        height: 60,
      },
    },
    inLanguage: "en-IN",
    keywords: blog.keywords ? blog.keywords.join(", ") : "",
    articleSection: "Medical Education",
    url: `https://corebtr.com/blog/${blogId}`,
  };

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle}</title>
        <meta name="description" content={blog.metaDesc} />
        <meta property="og:title" content={blog.metaTitle} />
        <meta property="og:description" content={blog.metaDesc} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.metaTitle} />
        <meta name="twitter:description" content={blog.metaDesc} />
        <meta name="twitter:image" content={blog.image} />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <div className="bp-wrapper">
        {/* Breadcrumb */}
        <div className="bp-breadcrumb">
          <div className="bp-inner-breadcrumb">
            <span className="bp-bc-link" onClick={() => navigate("/")}>
              Home
            </span>
            <span className="bp-bc-sep">›</span>
            <span className="bp-bc-link" onClick={() => navigate("/blogs")}>
              Blogs
            </span>
            <span className="bp-bc-sep">›</span>
            <span className="bp-bc-current">{blog.blogTitle}</span>
          </div>
        </div>

        {/* Article Hero */}
        <div className="bp-hero">
          <div className="bp-hero-wrap">
            <div className="bp-hero-img-wrap">
              <img src={blog.image} alt={blog.alt} />
            </div>
            <div className="bp-hero-text">
              <h1 className="bp-hero-title">{blog.blogTitle}</h1>
              <h2 className="bp-hero-desc">{getExcerpt(blog.para)}</h2>
              <div className="bp-hero-meta">
                <p>📅 {blog.blogDate}</p>
                <span className="bp-meta-sep"></span>
                <p>⏱ {readingTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="bp-layout">
          <article className="bp-article">
            <div className="bp-share-bar">
              <span className="bp-share-label">
                Found this useful? Share it -
              </span>
              <div className="bp-share-btns">
                <button className="bp-share-btn" onClick={handleShare}>
                  🔗 Copy Link
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="bp-article-content">
              {formatContent(blog.para, blog.seoInfo)}
            </div>

            {/* Keywords */}
            {blog.keywords && blog.keywords.length > 0 && (
              <div className="bp-keywords-section">
                <div className="bp-keywords-label">RELATED KEYWORDS</div>
                <div className="bp-keywords-row">
                  {blog.keywords.map((keyword, i) => (
                    <span key={i} className="bp-keyword-pill">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share button at bottom */}
            <button className="bp-share-bottom-btn" onClick={handleShare}>
              🔗 Share This Article
            </button>
          </article>
        </div>

        {/* Recommended / Related Section */}
        <section className="bp-related">
          <div className="bp-related-wrap">
            <div className="bp-related-header">
              <div className="bp-related-accent"></div>
              <h2 className="bp-related-title">You Might Also Like</h2>
            </div>

            <div className="bp-related-cards" ref={carouselRef}>
              {relatedBlogs.map((data) => (
                <Link
                  key={data.id}
                  to={`/blog/${data.id}`}
                  className="bp-related-card"
                >
                  <div className="bp-related-card-img">
                    <img src={data.image} alt={data.alt} />
                  </div>
                  <div className="bp-related-card-body">
                    <span
                      className={`bp-card-tag ${CATEGORY_TAG_CLASS[data.category] || "bp-tag-blue"}`}
                    >
                      {data.category || "Medicine"}
                    </span>
                    <div className="bp-related-card-title">
                      {data.blogTitle}
                    </div>
                    <div className="bp-related-card-desc">
                      {getExcerpt(data.para)}
                    </div>
                    <div className="bp-related-card-meta">
                      <span>📅 {data.blogDate}</span>
                      <span className="bp-rc-read">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <hr className="bp-related-hr" />

            <div className="bp-related-nav-btns">
              <button
                className="bp-related-nav-btn"
                onClick={() => handleScroll("prev")}
              >
                ← Previous
              </button>
              <button
                className="bp-related-nav-btn"
                onClick={() => handleScroll("next")}
              >
                Next →
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default BlogPage;
