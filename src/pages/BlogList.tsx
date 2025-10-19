import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2 as LinkIcon, 
  ChevronLeft,
  ChevronRight,
  Search,
  Tag,
  Eye,
  Heart,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogData';
import Newsletter from '../components/Newsletter';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPosts(blogPosts);
      setFeaturedPost(blogPosts[0]); // First post as featured
      setLoading(false);
    };

    loadPosts();
  }, []);

  const categories = [
    { name: 'All', slug: 'all', color: 'bg-gray-100 text-gray-800' },
    { name: 'NEET PG', slug: 'neet-pg', color: 'bg-blue-100 text-blue-800' },
    { name: 'NEET UG', slug: 'neet-ug', color: 'bg-red-100 text-red-800' },
    { name: 'Counselling', slug: 'counselling', color: 'bg-purple-100 text-purple-800' },
    { name: 'Finance', slug: 'finance', color: 'bg-green-100 text-green-800' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = (platform: string, post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    const title = post.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Believers Consultancy's
        <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent"> Blog</span>
      </h1>
      <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
        Expert insights, latest updates, and comprehensive guides for your medical education journey
      </p>
    </div>
  </div>
</header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={featuredPost.featured_image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured Post
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${featuredPost.category.color}`}>
                      {featuredPost.category.name}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(featuredPost.published_date)}
                    </div>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                    </h2>
                  <p className="text-gray-600 text-base mb-6 leading-relaxed">
                     {featuredPost.excerpt}
                    </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{featuredPost.author.name}</p>
                        <p className="text-sm text-gray-500">{featuredPost.read_time} min read</p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200 inline-flex items-center"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        

        {/* Search and Filters */}
        <section className="mb-12">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.slug
                        ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white scale-105'
                        : `${category.color} hover:scale-105`
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="relative">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.category.color}`}>
                      {post.category.name}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <button
                        onClick={() => setShareMenuOpen(shareMenuOpen === post.id ? null : post.id)}
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-gray-700" />
                      </button>
                      
                      {shareMenuOpen === post.id && (
                        <div className="absolute top-10 right-0 bg-white rounded-lg shadow-xl p-2 z-10 min-w-[140px]">
                          <button
                            onClick={() => handleShare('facebook', post)}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare('twitter', post)}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare('linkedin', post)}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                            LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare('copy', post)}
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
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.published_date)}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.read_time} min read
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </span>
                    </div>
                    
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </section>

         {/* ADD NEWSLETTER HERE
        <Newsletter /> */}
      </div>
    </div>
  );
};

export default BlogList;