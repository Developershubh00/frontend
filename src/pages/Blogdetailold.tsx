// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Calendar,
//   Clock,
//   Eye,
//   Heart,
//   MessageCircle,
//   Share2,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Link2 as LinkIcon,
//   ChevronLeft,
//   Tag,
// } from "lucide-react";

// interface BlogPost {
//   id: number;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   featured_image: string;
//   author: {
//     name: string;
//     avatar: string;
//     bio: string;
//   };
//   category: {
//     name: string;
//     slug: string;
//     color: string;
//   };
//   tags: string[];
//   published_date: string;
//   read_time: number;
//   views: number;
//   likes: number;
//   comments_count: number;
//   meta_description: string;
// }

// // 👇 Dummy posts same as your BlogPage
// import  dummyPosts  from "./Blogpagewithapi"; // 🔥 reuse your posts

// const BlogDetail: React.FC = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [shareMenuOpen, setShareMenuOpen] = useState(false);

//   useEffect(() => {
//     // simulate fetching by slug
//     const found = dummyPosts.find((p) => p.slug === slug);
//     setPost(found || null);
//   }, [slug]);

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         <p>Post not found.</p>
//       </div>
//     );
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const handleShare = (platform: string) => {
//     const url = `${window.location.origin}/blog/${post.slug}`;
//     const title = post.title;
//     let shareUrl = "";

//     switch (platform) {
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//           url
//         )}`;
//         break;
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//           url
//         )}&text=${encodeURIComponent(title)}`;
//         break;
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//           url
//         )}`;
//         break;
//       case "copy":
//         navigator.clipboard.writeText(url);
//         alert("Link copied!");
//         return;
//     }

//     if (shareUrl) {
//       window.open(shareUrl, "_blank", "width=600,height=400");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-4 py-6 flex items-center">
//           <Link
//             to="/blog"
//             className="flex items-center text-gray-600 hover:text-blue-600"
//           >
//             <ChevronLeft className="w-5 h-5 mr-1" /> Back to Blog
//           </Link>
//         </div>
//       </header>

//       <main className="max-w-5xl mx-auto px-4 py-12">
//         {/* Banner */}
//         <div className="rounded-3xl overflow-hidden shadow-xl mb-8">
//           <img
//             src={post.featured_image}
//             alt={post.title}
//             className="w-full h-96 object-cover"
//           />
//         </div>

//         {/* Meta Info */}
//         <div className="flex flex-wrap gap-4 items-center mb-6">
//           <span
//             className={`px-3 py-1 rounded-full text-sm font-medium ${post.category.color}`}
//           >
//             {post.category.name}
//           </span>
//           <div className="flex items-center text-gray-500 text-sm">
//             <Calendar className="w-4 h-4 mr-1" />
//             {formatDate(post.published_date)}
//           </div>
//           <div className="flex items-center text-gray-500 text-sm">
//             <Clock className="w-4 h-4 mr-1" />
//             {post.read_time} min read
//           </div>
//           <div className="flex items-center text-gray-500 text-sm">
//             <Eye className="w-4 h-4 mr-1" />
//             {post.views.toLocaleString()}
//           </div>
//         </div>

//         {/* Title */}
//         <h1 className="text-4xl font-bold text-gray-900 mb-6">
//           {post.title}
//         </h1>

//         {/* Author */}
//         <div className="flex items-center mb-10">
//           <img
//             src={post.author.avatar}
//             alt={post.author.name}
//             className="w-12 h-12 rounded-full mr-3"
//           />
//           <div>
//             <p className="font-semibold text-gray-900">{post.author.name}</p>
//             <p className="text-sm text-gray-500">{post.author.bio}</p>
//           </div>
//         </div>

//         {/* Content */}
//         <article
//           className="prose lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:marker:text-blue-500"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />

//         {/* Tags */}
//         <div className="mt-10 flex flex-wrap gap-2">
//           {post.tags.map((tag, idx) => (
//             <span
//               key={idx}
//               className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
//             >
//               <Tag className="w-3 h-3 mr-1" />
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Footer actions */}
//         <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
//           <div className="flex items-center gap-6 text-gray-600">
//             <div className="flex items-center cursor-pointer hover:text-red-500">
//               <Heart className="w-5 h-5 mr-1" /> {post.likes}
//             </div>
//             <div className="flex items-center">
//               <MessageCircle className="w-5 h-5 mr-1" /> {post.comments_count}
//             </div>
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => setShareMenuOpen(!shareMenuOpen)}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-full shadow hover:scale-105 transition"
//             >
//               <Share2 className="w-4 h-4" /> Share
//             </button>

//             {shareMenuOpen && (
//               <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl p-2 z-10 min-w-[140px]">
//                 <button
//                   onClick={() => handleShare("facebook")}
//                   className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded"
//                 >
//                   <Facebook className="w-4 h-4 mr-2 text-blue-600" /> Facebook
//                 </button>
//                 <button
//                   onClick={() => handleShare("twitter")}
//                   className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded"
//                 >
//                   <Twitter className="w-4 h-4 mr-2 text-blue-400" /> Twitter
//                 </button>
//                 <button
//                   onClick={() => handleShare("linkedin")}
//                   className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded"
//                 >
//                   <Linkedin className="w-4 h-4 mr-2 text-blue-700" /> LinkedIn
//                 </button>
//                 <button
//                   onClick={() => handleShare("copy")}
//                   className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded"
//                 >
//                   <LinkIcon className="w-4 h-4 mr-2 text-gray-600" /> Copy Link
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BlogDetail;


import React, { useState } from "react";
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
  User,
  FileText,
  AlertCircle,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const BlogDetailPage = () => {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  // Blog post data
  const blogPost = {
    id: 1,
    title:
      "NRI Category Seats in NEET PG 2025: Understanding the New MEA Guidelines",
    excerpt:
      "The NRI quota has always been the most important gateway for candidates aiming to secure a postgraduate medical seat in India. However, recent MEA notifications have created significant changes.",
    content: `
      <p>The NRI (Non-Resident Indian) quota has always been the most important gateway for all the candidates who are aiming to secure a postgraduate medical seat in India. However, with the recent Ministry of External Affairs (MEA) notifications, the process of acquiring an NRI certificate from Indian embassies abroad has seen remarkable changes. These changes have created some confusion for many NEET PG 2025 aspirants.</p>
      
      <p>This blog explains the updated details, eligibility, and other documentation challenges so that candidates can be clear about how these rules impact All India Counselling and State Counselling.</p>
    `,
    author: {
      name: "Believers Team",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      bio: "Expert medical education consultants with over 10 years of experience in NEET counseling and admissions.",
    },
    category: {
      name: "NEET PG",
      slug: "neet-pg",
      color: "bg-blue-100 text-blue-800",
    },
    tags: ["NEET PG 2025", "NRI Quota", "MEA Guidelines", "Medical Admissions"],
    published_date: "2024-12-15",
    read_time: 5,
    views: 2847,
    likes: 127,
    comments_count: 23,
    featured_image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop",
  };

  const tableOfContents = [
    { id: "why-change", title: "Why This Change Matters", level: 2 },
    { id: "eligibility", title: "Who Is Eligible for NRI Seats?", level: 2 },
    { id: "direct-nri", title: "Direct NRI Candidates", level: 3 },
    { id: "children-nri", title: "Children of NRI Parents", level: 3 },
    { id: "sponsored", title: "Sponsored Candidates", level: 3 },
    { id: "mea-guidelines", title: "MEA Guidelines: What Changed?", level: 2 },
    {
      id: "impact-counselling",
      title: "Impact on NEET PG 2025 Counselling",
      level: 2,
    },
    { id: "documentation", title: "Documentation Requirements", level: 2 },
    { id: "challenges", title: "The Challenge for PG Aspirants", level: 2 },
    { id: "practical-implications", title: "Practical Implications", level: 2 },
    { id: "faqs", title: "Frequently Asked Questions", level: 2 },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShare = (platform, post) => {
    const url = window.location.href;
    const text = `${post.title} - ${post.excerpt}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Back to Blog</span>
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">
                Believers Consultancy's
                <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                  {" "}
                  Blog
                </span>
              </h1>
            </div>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {tocOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Mobile */}
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
                  src={blogPost.featured_image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${blogPost.category.color}`}
                    >
                      {blogPost.category.name}
                    </span>
                    <div className="flex items-center text-white text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(blogPost.published_date)}
                    </div>
                    <div className="flex items-center text-white text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {blogPost.read_time} min read
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {blogPost.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {blogPost.excerpt}
                </p>

                {/* Author and Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center">
                    <img
                      src={blogPost.author.avatar}
                      alt={blogPost.author.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {blogPost.author.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {blogPost.author.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {blogPost.views.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {blogPost.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {blogPost.comments_count}
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
                            onClick={() => handleShare("facebook", blogPost)}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare("twitter", blogPost)}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare("linkedin", blogPost)}
                            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                            LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare("copy", blogPost)}
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
                {/* Why This Change Matters */}
                <section id="why-change" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Why This Change Matters
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Commonly, NRI eligibility and documentation varied across
                    states and institutions. While many states depend on an
                    embassy-issued NRI certificate, there is no systematic
                    format. To make the process smooth, the MEA has issued fresh
                    guidelines in 2024 (first for NEET UG) and now it has been
                    extended for NEET PG 2025, which regulates who can be issued
                    an NRI certificate for their educational purposes.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-yellow-800">
                        As a result, many PG aspirants are struggling to secure
                        the valid embassy certificates, especially for those who
                        depend upon their relatives for NRI sponsorship.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Eligibility Section */}
                <section id="eligibility" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Who Is Eligible for NRI Seats?
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Eligibility for NRI quota seats is not uniform. It depends
                    on whether you are applying through All India Counselling
                    (MCC) or State Counselling.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Direct NRI */}
                    <div
                      id="direct-nri"
                      className="bg-green-50 border border-green-200 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-semibold text-green-800 mb-3">
                        Direct NRI Candidates
                      </h3>
                      <ul className="space-y-2 text-green-700">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          If you are an NRI yourself, you are eligible.
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          Proof: Residence abroad for more than 180 days and an
                          embassy-issued NRI certificate.
                        </li>
                      </ul>
                    </div>

                    {/* Children of NRI */}
                    <div
                      id="children-nri"
                      className="bg-blue-50 border border-blue-200 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Children of NRI Parents
                      </h3>
                      <ul className="space-y-2 text-blue-700">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          If either parent is an NRI, you qualify for the NRI
                          quota in most states.
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          An embassy certificate of the parent is required.
                        </li>
                      </ul>
                    </div>

                    {/* Sponsored Candidates */}
                    <div
                      id="sponsored"
                      className="bg-red-50 border border-red-200 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-semibold text-red-800 mb-3">
                        Sponsored Candidates
                      </h3>
                      <p className="text-red-700 text-sm mb-2 font-medium">
                        ⚠️ The Complicated Part
                      </p>
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          Previously allowed sponsorship by relatives
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          Now restricted to minor wards only
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          Adult candidates (22+) are effectively blocked
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* MEA Guidelines */}
                <section id="mea-guidelines" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    MEA Guidelines: What Changed?
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The new MEA notification has been circulated to all the
                    Indian embassies and commissions abroad, specifying:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      ✅ Eligibility for NRI Certificate (Educational Purposes):
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• NRI candidates themselves</li>
                      <li>• Children of NRIs</li>
                      <li>• Wards only if minors under genuine guardianship</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-semibold text-red-800 mb-3">
                      ❌ Exclusions:
                    </h4>
                    <p className="text-red-700">
                      Adult wards or relatives (e.g., cousins, uncles, aunts)
                      cannot be issued sponsorship-based NRI certificates. This
                      is why many PG aspirants are being denied certificates at
                      embassies, especially in the US and UAE.
                    </p>
                  </div>
                </section>

                {/* Impact on Counselling */}
                <section id="impact-counselling" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Impact on NEET PG 2025 Counselling
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        1. All India Counselling (Deemed Universities)
                      </h3>
                      <ul className="space-y-2 text-blue-700">
                        <li>
                          • Only deemed universities have NRI seats under MCC
                        </li>
                        <li>
                          • 15% of deemed university seats are reserved for NRIs
                        </li>
                        <li>
                          • Till 2024, sponsorship by first-degree relatives was
                          valid
                        </li>
                        <li>
                          • From 2025, only NRIs themselves or children of NRIs
                          will likely be recognized under Priority 1
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3">
                        2. State Counselling
                      </h3>
                      <ul className="space-y-2 text-purple-700">
                        <li>
                          • Many states reserve 15% of private medical seats
                          under NRI quota
                        </li>
                        <li>
                          • Some states give priority to their own NRI
                          candidates first
                        </li>
                        <li>
                          • If embassy certificates cannot be issued to adult
                          wards, sponsorship eligibility may collapse
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Priority System Introduced
                    </h4>
                    <p className="text-gray-700 mb-3">
                      Recent MCC notifications show a priority allotment system:
                    </p>
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                        <strong className="text-green-700">Priority 1:</strong>{" "}
                        NRI candidates and children of NRIs
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-500">
                        <strong className="text-yellow-700">Priority 2:</strong>{" "}
                        First- or second-degree relatives sponsoring wards
                        (practically blocked due to "minor only" rule)
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">
                      This means direct NRI candidates and children of NRIs will
                      have a clear advantage, while relatives-based sponsorship
                      faces uncertainty.
                    </p>
                  </div>
                </section>

                {/* Documentation */}
                <section id="documentation" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Documentation Requirements
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you are applying under the NRI category, keep these
                    documents ready:
                  </p>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-3" />
                        <span>
                          Embassy-issued NRI Certificate (valid for only 1 year)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-3" />
                        <span>
                          Passport & Visa copies (of NRI candidate/parent)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-3" />
                        <span>
                          Relationship proof (Birth certificate, family tree
                          affidavit)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-3" />
                        <span>
                          Affidavit (for financial sponsorship, if applicable)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-3" />
                        <span>NEET PG Scorecard</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-3" />
                        <span>Self-declaration by the candidate</span>
                      </li>
                    </ul>

                    <div className="bg-red-100 rounded-lg p-4 mt-4">
                      <p className="text-red-800 font-medium">
                        📌 Note: Old NRI certificates issued last year are not
                        valid for NEET PG 2025.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Challenges */}
                <section id="challenges" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    The Challenge for PG Aspirants
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-semibold text-green-800 mb-2">
                        ✅ For UG Candidates
                      </h4>
                      <p className="text-green-700">
                        Relatives can still sponsor undergraduate (UG)
                        candidates who are minors.
                      </p>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-semibold text-red-800 mb-2">
                        ❌ For PG Candidates
                      </h4>
                      <p className="text-red-700">
                        Postgraduate (PG) candidates (adults) cannot obtain
                        sponsorship certificates from embassies if they are not
                        children of an NRI.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
                    <p className="text-yellow-800">
                      <strong>Key Issue:</strong> Many embassies are now
                      outright refusing to issue sponsorship-based NRI
                      certificates for PG candidates. This creates significant
                      problems for candidates who depend on uncles, aunts, or
                      grandparents for eligibility.
                    </p>
                  </div>
                </section>

                {/* Practical Implications */}
                <section id="practical-implications" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Practical Implications for Candidates
                  </h2>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      For Current NEET PG Aspirants
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Candidates planning for NEET PG 2025 must reassess their
                      options:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
                        If you are an NRI yourself or child of an NRI, the
                        process is still straightforward, but documentation
                        requirements are more stringent
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
                        Sponsorship by extended family (uncle, aunt,
                        grandmother) is no longer possible for adult candidates
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
                        OCI/PIO status holders may benefit from reduced
                        competition due to fewer eligible sponsored candidates
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-800 mb-3">
                      💰 Financial Considerations
                    </h3>
                    <ul className="space-y-2 text-orange-700">
                      <li>
                        • NRI quota seats cost 3-5 times higher than general
                        seats
                      </li>
                      <li>
                        • With concentrated demand among eligible candidates,
                        remaining NRI seats may become even more expensive
                      </li>
                      <li>
                        • Limited eligibility may lead to increased competition
                        and higher fees
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Final Word */}
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Final Word</h2>
                    <p className="leading-relaxed mb-4">
                      NRI eligibility for NEET PG 2025 has been restricted by
                      the new MEA guidelines. This has simplified the process
                      for direct NRIs and their children, but created challenges
                      for candidates dependent on extended family sponsorship.
                    </p>
                    <p className="leading-relaxed mb-4">
                      If you are a candidate, please confirm your eligibility
                      and required documents thoroughly before counselling
                      starts.
                    </p>
                    <p className="leading-relaxed font-semibold">
                      The path remains open for genuine NRI candidates, but the
                      biggest challenge for sponsored candidates this year will
                      be obtaining embassy certificates.
                    </p>
                  </div>
                </section>

                {/* FAQs */}
                <section id="faqs" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Q1. Who can get an educational NRI certificate from an
                        Indian Mission/Post?
                      </h3>
                      <p className="text-gray-700">
                        Issued only to NRIs, their children, or minors under
                        guardianship. Adult-ward sponsorships aren't allowed.
                        Valid for one year.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Q2. Will MCC PG follow UG's NRI priority system?
                      </h3>
                      <p className="text-gray-700">
                        Likely similar, but wait for the latest MCC PG notice
                        before assuming allotment priority.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Q3. Can extended relatives sponsor a PG candidate for an
                        NRI certificate?
                      </h3>
                      <p className="text-gray-700">
                        No. "Ward" means a minor; adult candidates cannot use
                        extended-relative sponsorship. Use parent NRI proof or
                        apply under NRI/OCI/PIO rules.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Q4. What documents are needed for NRI admission?
                      </h3>
                      <p className="text-gray-700">
                        Valid NRI certificate, NRI parent/candidate passport &
                        visa, relationship proof, NEET PG scorecard, and state
                        forms. Originals verified at reporting.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contact Form Section */}
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Submit queries to Believers Consultancy
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Have a question beyond these FAQs? Submit the Google Form
                      and our team will respond during 9 AM–7 PM support hours.
                    </p>
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
                </section>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-600 mr-2">
                  Tags:
                </span>
                {blogPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comments ({blogPost.comments_count})
              </h3>

              {/* Comment Form */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Leave a Comment
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    rows="4"
                    placeholder="Write your comment here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                  <button className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200">
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Sample Comments */}
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                      alt="Commenter"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-semibold text-gray-900">
                          Rahul Sharma
                        </h5>
                        <span className="text-sm text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        This is very helpful information! I was confused about
                        the new NRI guidelines. Thank you for clarifying the
                        documentation requirements.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                          <Heart className="w-4 h-4 mr-1" />
                          Like (5)
                        </button>
                        <button className="text-sm text-gray-500 hover:text-blue-600">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
                      alt="Commenter"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-semibold text-gray-900">
                          Priya Patel
                        </h5>
                        <span className="text-sm text-gray-500">
                          5 hours ago
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        My uncle is an NRI but I'm 24 years old. Based on this
                        article, I won't be eligible for sponsorship. This is
                        quite disappointing but good to know beforehand.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                          <Heart className="w-4 h-4 mr-1" />
                          Like (12)
                        </button>
                        <button className="text-sm text-gray-500 hover:text-blue-600">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                      alt="Commenter"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-semibold text-gray-900">
                          Dr. Arjun Singh
                        </h5>
                        <span className="text-sm text-gray-500">1 day ago</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Excellent breakdown of the new MEA guidelines. As
                        someone who went through NRI counseling last year, I can
                        confirm that the process has become much more stringent
                        this year.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                          <Heart className="w-4 h-4 mr-1" />
                          Like (18)
                        </button>
                        <button className="text-sm text-gray-500 hover:text-blue-600">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar - Table of Contents (Desktop) */}
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

              {/* Related Articles */}
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=60&fit=crop"
                      alt="Related article"
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        NEET PG 2025: Complete Counselling Guide
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">3 min read</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=60&fit=crop"
                      alt="Related article"
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        Understanding OCI vs PIO Status for Medical Admissions
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">4 min read</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1584432743501-7d5c27a39189?w=80&h=60&fit=crop"
                      alt="Related article"
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        State Quota vs All India Quota: Which is Better?
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">6 min read</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest NEET Guidelines
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest updates on NEET counselling, admission guidelines,
            and expert insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Believers Consultancy</h3>
              <p className="text-gray-400 mb-4">
                Expert medical education consultancy providing comprehensive
                guidance for NEET counselling, admissions, and career planning.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    NEET PG Counselling
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    NRI Admissions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    State Quota
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@believerscons.com</p>
                <p>📱 +91 98765 43210</p>
                <p>⏰ 9 AM - 7 PM (Mon-Sat)</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Believers Consultancy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetailPage;

