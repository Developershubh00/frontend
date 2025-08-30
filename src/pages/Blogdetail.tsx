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
// import { dummyPosts } from "./Blogpagewithapi"; // 🔥 reuse your posts

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
//             className="flex items-center text-gray-600 hover:text-orange-600"
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
//           className="prose lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:marker:text-orange-500"
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
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow hover:scale-105 transition"
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
