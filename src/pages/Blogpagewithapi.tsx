

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
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

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: {
    name: string;
    slug: string;
    color: string;
  };
  tags: string[];
  published_date: string;
  read_time: number;
  views: number;
  likes: number;
  comments_count: number;
  is_featured: boolean;
  meta_description: string;
}

const BlogPageWithAPI: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);

  // Dummy data - replace with API call
  const dummyPosts: BlogPost[] = [
    {
      id: 1,
      title: "NEET PG 2025: Complete Guide to Counselling Process and Important Dates",
      slug: "neet-pg-2025-counselling-guide",
      excerpt: "Everything you need to know about NEET PG 2025 counselling including registration dates, document verification, choice filling, and seat allotment process.",
      content: `
        <p>The NEET PG 2025 counselling is one of the most crucial phases for medical graduates seeking admission to postgraduate courses. With thousands of seats across various specialties, understanding the complete process is essential for making informed decisions.</p>
        
        <h2>Important Dates for NEET PG 2025</h2>
        <ul>
          <li><strong>Registration:</strong> Expected to start in March 2025</li>
          <li><strong>Choice Filling:</strong> April 2025</li>
          <li><strong>Seat Allotment Round 1:</strong> May 2025</li>
          <li><strong>Seat Allotment Round 2:</strong> June 2025</li>
        </ul>
        
        <h2>Counselling Process Step by Step</h2>
        <p>The NEET PG counselling process involves several critical steps that every candidate must follow carefully...</p>
        
        <h3>1. Registration Process</h3>
        <p>Candidates need to register on the official MCC website with valid credentials and upload required documents.</p>
        
        <h3>2. Document Verification</h3>
        <p>All uploaded documents will be verified online. Ensure all documents are clear and meet the specified requirements.</p>
        
        <h3>3. Choice Filling and Locking</h3>
        <p>This is the most crucial step where candidates select their preferred colleges and courses in order of preference.</p>
      `,
      featured_image: "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      author: {
        name: "Dr. Priya ",
        avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        bio: "Medical Education Consultant with 10+ years of experience in NEET counselling guidance."
      },
      category: {
        name: "NEET PG",
        slug: "neet-pg",
        color: "bg-blue-100 text-blue-800"
      },
      tags: ["NEET PG", "Counselling", "Medical Admission", "2025"],
      published_date: "2024-12-15",
      read_time: 8,
      views: 15420,
      likes: 234,
      comments_count: 45,
      is_featured: true,
      meta_description: "Complete guide to NEET PG 2025 counselling process with important dates, registration steps, and expert tips."
    },
    {
      id: 2,
      title: "Understanding Medical College Fee Structure: Government vs Private vs Deemed",
      slug: "medical-college-fee-structure-guide",
      excerpt: "A comprehensive breakdown of fee structures across different types of medical colleges to help you make informed financial decisions.",
      content: `
        <p>One of the most significant factors in choosing a medical college is understanding the fee structure. The cost can vary dramatically between government, private, and deemed universities.</p>
        
        <h2>Government Medical Colleges</h2>
        <p>Government colleges offer the most affordable medical education with fees ranging from ₹20,000 to ₹1,00,000 per year...</p>
        
        <h2>Private Medical Colleges</h2>
        <p>Private colleges have higher fees but often provide better infrastructure and facilities...</p>
      `,
      featured_image: "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      author: {
        name: "Dr. Rajesh ",
        avatar: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        bio: "Financial advisor specializing in medical education planning."
      },
      category: {
        name: "Finance",
        slug: "finance",
        color: "bg-blue-100 text-blue-800"
      },
      tags: ["Fees", "Medical College", "Finance", "Planning"],
      published_date: "2024-12-10",
      read_time: 6,
      views: 8340,
      likes: 156,
      comments_count: 23,
      is_featured: false,
      meta_description: "Understanding medical college fees across government, private, and deemed universities."
    },
    {
      id: 3,
      title: "State Quota vs All India Quota: Which Path Should You Choose?",
      slug: "state-quota-vs-all-india-quota",
      excerpt: "Learn the differences between state quota and AIQ seats, eligibility criteria, and which option gives you better chances of admission.",
      content: `
        <p>Understanding the difference between State Quota and All India Quota (AIQ) is crucial for NEET candidates. Each has its own advantages and eligibility criteria.</p>
        
        <h2>All India Quota (AIQ)</h2>
        <p>15% of seats in government medical colleges are reserved under AIQ, open to candidates from all states...</p>
        
        <h2>State Quota</h2>
        <p>85% of seats are reserved for state domicile candidates...</p>
      `,
      featured_image: "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      author: {
        name: "Dr. Meera Patel",
        avatar: "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        bio: "Counselling expert with extensive knowledge of admission processes."
      },
      category: {
        name: "Counselling",
        slug: "counselling",
        color: "bg-purple-100 text-purple-800"
      },
      tags: ["State Quota", "AIQ", "NEET", "Admission"],
      published_date: "2024-12-08",
      read_time: 5,
      views: 12560,
      likes: 189,
      comments_count: 34,
      is_featured: false,
      meta_description: "Complete comparison between State Quota and All India Quota for NEET admissions."
    },
    {
      id: 4,
      title: "Top 50 Government Medical Colleges in India: Cutoff Trends and Analysis",
      slug: "top-government-medical-colleges-cutoff-analysis",
      excerpt: "Detailed analysis of cutoff trends for India's top government medical colleges with year-over-year comparison and predictions.",
      content: `
        <p>Securing admission to a top government medical college is every NEET aspirant's dream. Here's a comprehensive analysis of the top 50 government medical colleges and their cutoff trends.</p>
        
        <h2>AIIMS Colleges</h2>
        <p>AIIMS Delhi continues to be the most sought-after medical college with the highest cutoffs...</p>
      `,
      featured_image: "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      author: {
        name: "Dr. Amit Singh",
        avatar: "https://cdn.dribbble.com/userupload/44669411/file/7a4de58473bddb2b24be4f79965fe29e.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        bio: "Data analyst specializing in medical admission trends and statistics."
      },
      category: {
        name: "Analysis",
        slug: "analysis",
        color: "bg-blue-100 text-blue-800"
      },
      tags: ["Government Colleges", "Cutoff", "Analysis", "Rankings"],
      published_date: "2024-12-05",
      read_time: 10,
      views: 22340,
      likes: 312,
      comments_count: 67,
      is_featured: false,
      meta_description: "Comprehensive analysis of India's top 50 government medical colleges with cutoff trends."
    }
  ];

  // Simulate API call
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(dummyPosts);
      setFeaturedPost(dummyPosts.find(post => post.is_featured) || dummyPosts[0]);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const categories = [
    { name: 'All', slug: 'all', color: 'bg-gray-100 text-gray-800' },
    { name: 'NEET PG', slug: 'neet-pg', color: 'bg-blue-100 text-blue-800' },
    { name: 'NEET UG', slug: 'neet-ug', color: 'bg-red-100 text-red-800' },
    { name: 'Counselling', slug: 'counselling', color: 'bg-purple-100 text-purple-800' },
    { name: 'Finance', slug: 'finance', color: 'bg-blue-100 text-blue-800' },
    { name: 'Analysis', slug: 'analysis', color: 'bg-blue-100 text-blue-800' }
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
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-4xl font-bold text-gray-900 mb-4">
              Believers Consultancy's
              <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent"> Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
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
                    <button className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200 inline-flex items-center">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
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
              {/* Search */}
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
              
              {/* Categories */}
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
            {filteredPosts.filter(post => !post.is_featured).map((post) => (
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
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
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
                    
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments_count}
                      </div>
                    </div>
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

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex items-center justify-center mt-12">
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex space-x-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPageWithAPI;