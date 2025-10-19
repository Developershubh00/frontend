import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  AlertCircle,
  Tag as TagIcon
} from "lucide-react";
import { getBlogBySlug, getRelatedBlogs, BlogPost, Section } from "../data/blogData";
import Newsletter from "../components/Newsletter";

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedBlogs(slug));
        
        // Simulate view count increment
        const viewKey = `blog_view_${slug}`;
        const hasViewed = sessionStorage.getItem(viewKey);
        
        if (!hasViewed) {
          const baseViews = Math.floor(Math.random() * 5000) + 1000;
          setViews(baseViews);
          sessionStorage.setItem(viewKey, 'true');
        } else {
          setViews(Math.floor(Math.random() * 5000) + 1000);
        }
        
        // Set initial likes
        setLikes(Math.floor(Math.random() * 300) + 50);
        
        // Scroll to top
        window.scrollTo(0, 0);
      } else {
        navigate('/blog');
      }
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Loading...</p>
      </div>
    );
  }

  // Generate TOC from sections
  const tableOfContents = post.sections
    .filter(section => section.type === 'heading')
    .map(section => ({
      id: section.id,
      title: section.title || '',
      level: section.level || 2
    }));

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate read time from content
  const calculateReadTime = () => {
    const wordsPerMinute = 200;
    const totalWords = post.sections.reduce((acc, section) => {
      const text = section.content || section.title || '';
      return acc + text.split(' ').length;
    }, 0);
    return Math.ceil(totalWords / wordsPerMinute);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${post.title} - ${post.excerpt}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
    }
    setShareMenuOpen(false);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'heading':
  const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
  const headingClass = section.level === 2 
    ? "text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8"
    : section.level === 3
    ? "text-lg md:text-xl font-semibold text-gray-900 mb-3 mt-6"
    : "text-base md:text-lg font-semibold text-gray-900 mb-2 mt-4";
  
  return (
    <HeadingTag id={section.id} className={headingClass}>
      {section.title}
    </HeadingTag>
  );

      case 'paragraph':
  return (
    <div className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line">
      {section.content}
    </div>
  );

      case 'list':
        return (
          <ul className="space-y-2 mb-6 ml-4">
            {section.items?.map((item, idx) => (
              <li key={idx} className="text-gray-700 leading-relaxed flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );

      case 'info-box':
        const boxColors = {
          warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
          info: 'bg-blue-50 border-blue-400 text-blue-800',
          success: 'bg-green-50 border-green-400 text-green-800',
          error: 'bg-red-50 border-red-400 text-red-800'
        };
        const iconColors = {
          warning: 'text-yellow-400',
          info: 'text-blue-400',
          success: 'text-green-400',
          error: 'text-red-400'
        };
        
        return (
          <div className={`${boxColors[section.boxType || 'info']} border-l-4 p-4 rounded-r-lg mb-6`}>
            <div className="flex">
              <AlertCircle className={`w-5 h-5 ${iconColors[section.boxType || 'info']} mr-2 flex-shrink-0 mt-0.5`} />
              <p className="whitespace-pre-line">{section.content}</p>
            </div>
          </div>
        );

      case 'cards':
        const cardColors = {
          green: { bg: 'bg-green-50', border: 'border-green-200', title: 'text-green-800', text: 'text-green-700' },
          blue: { bg: 'bg-blue-50', border: 'border-blue-200', title: 'text-blue-800', text: 'text-blue-700' },
          red: { bg: 'bg-red-50', border: 'border-red-200', title: 'text-red-800', text: 'text-red-700' },
          purple: { bg: 'bg-purple-50', border: 'border-purple-200', title: 'text-purple-800', text: 'text-purple-700' }
        };

        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {section.cards?.map((card) => {
              const colors = cardColors[card.color as keyof typeof cardColors] || cardColors.blue;
              return (
                <div key={card.id} id={card.id} className={`${colors.bg} border ${colors.border} rounded-xl p-6`}>
                  <h3 className={`text-lg font-semibold ${colors.title} mb-3`}>
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item, idx) => (
                      <li key={idx} className={`flex items-start ${colors.text}`}>
                        <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6 mb-8">
            {section.faqs?.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        );

      case 'contact-form':
        return (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {section.title}
            </h3>
            <p className="text-gray-700 mb-4">{section.content}</p>
            <a
              href="https://docs.google.com/forms/d/1uE2R_rzlOv-3LA-L3VJtFDDQx-kLQ496dPZVYrcKdkE/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200"
            >
              Submit Query Form
              <ChevronRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
    <div className="flex items-center justify-between">
      <Link
        to="/blog"
        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Back to Blog</span>
      </Link>
      <div className="text-center">
        <h1 className="text-base md:text-lg font-bold text-gray-900">
          Believers Consultancy's
          <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
            {" "}Blog
          </span>
        </h1>
      </div>
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        {tocOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>
    </div>
  </div>
</header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile TOC */}
          {tocOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setTocOpen(false)}
            >
              <div
                className="bg-white w-80 h-full overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Table of Contents
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <li key={index}>
                        <a
                          href={`#${item.id}`}
                          className={`block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ${
                            item.level === 3 ? "ml-4" : ""
                          }`}
                          onClick={() => setTocOpen(false)}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Hero Section */}
            <article className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
              <div className="relative h-64 sm:h-80 lg:h-96">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${post.category.color}`}
                    >
                      {post.category.name}
                    </span>
                    <div className="flex items-center text-white text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.published_date)}
                    </div>
                    <div className="flex items-center text-white text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {calculateReadTime()} min read
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
  {post.title}
</h1>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
  {post.excerpt}
</p>

                {/* Author and Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {post.author.name}
                      </p>
                      <p className="text-sm text-gray-500">{post.author.bio}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {views.toLocaleString()}
                      </div>
                      <button
                        onClick={handleLike}
                        className={`flex items-center ${hasLiked ? 'text-red-500' : 'hover:text-red-500'} transition-colors`}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${hasLiked ? 'fill-current' : ''}`} />
                        {likes}
                      </button>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {Math.floor(Math.random() * 50) + 10}
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setShareMenuOpen(!shareMenuOpen)}
                        className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-blue-600" />
                      </button>

                      {shareMenuOpen && (
                        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl p-2 z-10 min-w-[140px]">
                          <button
                            onClick={() => handleShare("facebook")}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare("twitter")}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare("linkedin")}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                            LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare("copy")}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <LinkIcon className="w-4 h-4 mr-2 text-gray-600" />
                            Copy Link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Blog Content */}
            <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                {post.sections.map((section) => (
                  <div key={section.id}>
                    {renderSection(section)}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 mt-8">
                <span className="text-sm font-medium text-gray-600 mr-2">
                  Tags:
                </span>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ADD NEWSLETTER HERE
            <Newsletter /> */}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8 mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
  Related Articles
</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                        <img
                          src={relatedPost.featured_image}
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${relatedPost.category.color} mb-2`}>
                            {relatedPost.category.name}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
  {relatedPost.title}
</h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {relatedPost.read_time} min read
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog Button */}
            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to All Blogs
              </Link>
            </div>
          </main>

          {/* Sidebar - Desktop TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Table of Contents
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <li key={index}>
                        <a
                          href={`#${item.id}`}
                          className={`block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ${
                            item.level === 3 ? "ml-4" : ""
                          }`}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Related Articles Sidebar */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="flex items-start space-x-3 group"
                      >
                        <img
                          src={relatedPost.featured_image}
                          alt={relatedPost.title}
                          className="w-16 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {relatedPost.read_time} min read
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;