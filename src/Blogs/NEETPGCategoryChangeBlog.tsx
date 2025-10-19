
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
  FileText,
  AlertCircle,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";

const NEETPGCategoryChangeBlog = () => {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  const blogPost = {
    id: 2,
    title: "NEET PG 2025: Can You Change Your Category in All India Counselling?",
    excerpt:
      "Understanding category changes in MCC counseling - what's possible, what's not, and how it affects your NEET PG admission chances.",
    author: {
      name: "Believers Consultancy Team",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      bio: "Expert medical education consultants specializing in NEET counseling guidance.",
    },
    category: {
      name: "NEET PG",
      slug: "neet-pg",
      color: "bg-blue-100 text-blue-800",
    },
    tags: ["NEET PG 2025", "Category Change", "MCC Counselling", "Reservation"],
    published_date: "2024-12-20",
    read_time: 5,
    views: 3421,
    likes: 156,
    comments_count: 34,
    featured_image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
  };

  const tableOfContents = [
    { id: "intro", title: "Where Does Your Category Come From?", level: 2 },
    { id: "why-matters", title: "Why Does It Matter?", level: 2 },
    { id: "common-questions", title: "Common Questions Students Ask", level: 2 },
    { id: "gen-to-reserved", title: "General to Reserved Category", level: 3 },
    { id: "reserved-to-gen", title: "Reserved to General Category", level: 3 },
    { id: "pwd-status", title: "PWD Status Changes", level: 3 },
    { id: "state-counselling", title: "State Counselling Rules", level: 3 },
    { id: "certificates", title: "Certificate Requirements", level: 2 },
    { id: "recommendations", title: "Key Recommendations", level: 2 },
    { id: "faqs", title: "Frequently Asked Questions", level: 2 },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `${blogPost.title} - ${blogPost.excerpt}`;

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
                {/* Introduction */}
                <p className="text-gray-700 leading-relaxed mb-6">
                  This happens with almost every NEET PG candidate; the same doubt keeps popping up: <strong>"Can I change my category during counseling?"</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Unfortunately, many students face various problems, including realising late that they belong to the OBC-NCL category and not the General category, and some discover that their state and central lists don't match.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  This blog is part of our FAQ series for NEET PG 2025, where we'll discuss the topic of category change in All India Counselling (MCC counseling) simply and practically.
                </p>

                {/* Where Does Category Come From */}
                <section id="intro" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    First Things: Where Does Your Category Come From?
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Firstly, when you applied for NEET PG 2025 on the official NBE portal, you would have selected:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    <li><strong>Category:</strong> General, OBC-NCL, SC, ST, or EWS</li>
                    <li><strong>PwD status:</strong> Yes or No</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-800 font-semibold mb-2">Important Note:</p>
                        <p className="text-yellow-800">
                          If the admit card displays only 'GEN', rely on the category/PwD details captured in the NBEMS application—those are the details sent to the counselling portal.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Once you confirm your overall data, it will be locked in your application form and will be shared directly with MCC for All India Counselling. So, your counselling identity is basically carried forward from your NBE application.
                  </p>
                </section>

                {/* Why It Matters */}
                <section id="why-matters" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Why Does It Matter So Much in All India Counselling?
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Okay, so now, here's the tricky part. Please note that MCC doesn't give you an option like: <em>"I only want to compete for General seats even though I applied as OBC."</em>
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you fill in choices, say XYZ Pediatrics, MCC will automatically check:
                  </p>
                  <div className="bg-blue-50 rounded-lg p-6 mb-4">
                    <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                      <li>Are General seats available or not, as per your rank?</li>
                      <li>If yes, you can be allotted by one.</li>
                      <li>But if no OBC seat is available at your rank, you will be allotted a seat in the General category.</li>
                    </ol>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-red-800">
                        <strong>Critical:</strong> If you don't have an OBC certificate, the institute won't give you admission, and you'll have to wait for the next round. That's why this category issue becomes such a make-or-break factor in MCC counselling.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Common Questions */}
                <section id="common-questions" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Common Questions Students Ask
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Let's go one by one, because the rules are different depending on what you want to change.
                  </p>

                  {/* Q1: General to Reserved */}
                  <div id="gen-to-reserved" className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                      <XCircle className="w-6 h-6 mr-2" />
                      Q1: I applied as General. Can I change to OBC/SC/ST/EWS?
                    </h3>
                    <div className="bg-red-100 rounded-lg p-4 mb-3">
                      <p className="text-red-900 font-bold text-lg">
                        From General → OBC/SC/ST/EWS: NOT POSSIBLE
                      </p>
                    </div>
                    <p className="text-red-800 leading-relaxed mb-3">
                      This is the most frequently asked question by candidates, but unfortunately, it's not possible through the regular MCC registration process.
                    </p>
                    <p className="text-red-800 leading-relaxed">
                      Even if you made a genuine mistake or if you suddenly realised that you're eligible for a reservation, MCC does not provide this option.
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <h4 className="font-semibold text-red-900 mb-2">PWD STATUS?</h4>
                      <p className="text-red-800 mb-2">
                        <strong>From PWD No → PWD Yes: NOT POSSIBLE</strong>
                      </p>
                      <p className="text-red-800">
                        You need to know that if you applied as PWD No, you cannot change to PWD Yes during MCC counselling, even if you became disabled between the examination and counselling dates.
                      </p>
                    </div>
                  </div>

                  {/* Q2: Reserved to General */}
                  <div id="reserved-to-gen" className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      Q2: I applied as OBC/SC/ST/EWS. Can I change to General?
                    </h3>
                    <div className="bg-green-100 rounded-lg p-4 mb-3">
                      <p className="text-green-900 font-bold text-lg">
                        Yes, this is possible! ✓
                      </p>
                    </div>
                    <p className="text-green-800 leading-relaxed">
                      Okay, so when you register for MCC counseling, you will be able to see your current category displayed, which says OBC-NCL. Then MCC will give you an option to convert to General if you don't want to benefit from a reservation.
                    </p>
                  </div>

                  {/* Q3: PWD Changes */}
                  <div id="pwd-status" className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">
                      Q3: PWD STATUS Changes
                    </h3>
                    <div className="bg-green-100 rounded-lg p-4 mb-3">
                      <p className="text-green-900 font-bold">
                        PWD Yes → PWD No: POSSIBLE ✓
                      </p>
                    </div>
                    <p className="text-blue-800 leading-relaxed mb-3">
                      If you have applied as PWD Yes but cannot obtain the required disability certificate or don't meet PWD criteria, you can change from PWD Yes to PWD No during registration.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                      <p className="text-yellow-800">
                        <strong>Note:</strong> This is a reminder, PWD status can only be changed from Yes to No, not the other way.
                      </p>
                    </div>
                  </div>

                  {/* Q4: State Counselling */}
                  <div id="state-counselling" className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-purple-800 mb-3">
                      Q4: Does This Apply to State Counselling Too?
                    </h3>
                    <p className="text-purple-900 font-bold mb-3">
                      No, state counselling is a different ball game.
                    </p>
                    <p className="text-purple-800 leading-relaxed mb-4">
                      Every state has its own reservation categories, rules, and registration process. For example:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-purple-800 space-y-2">
                      <li>You may have applied as a General in NBE, but in your state, you can still apply under OBC if you are eligible.</li>
                      <li>States don't blindly copy your NBE category data. They take fresh information when you register for state counseling.</li>
                    </ul>
                    <div className="bg-purple-100 rounded-lg p-4">
                      <p className="text-purple-900">
                        <strong>Special Note:</strong> The only special case reported so far is Bihar, which has stricter rules for PWD changes.
                      </p>
                      <p className="text-purple-900 mt-2">
                        So relax, your NBE category doesn't bind you in state quota counselling.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Certificate Requirements */}
                <section id="certificates" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Certificate Requirements
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    You know the reservation system for NEET PG 2025 assigns seats as follows: 27% is for OBC, 15% is for SC, 7.5% is for ST, 10% is for EWS, and 5% horizontal reservation for PWD. Each category includes its specific certificates:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                      <h4 className="font-bold text-orange-800 mb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        OBC (27%)
                      </h4>
                      <p className="text-orange-700 text-sm">
                        Non-Creamy Layer certificate along with the family income, which is below ₹8 lakh annually.
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                      <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        SC/ST (15% + 7.5%)
                      </h4>
                      <p className="text-blue-700 text-sm">
                        Includes valid caste certificates from qualified authorities.
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        EWS (10%)
                      </h4>
                      <p className="text-green-700 text-sm">
                        Income certificate showing the family income below ₹8 lakh annually.
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                      <h4 className="font-bold text-purple-800 mb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        PWD (5% Horizontal)
                      </h4>
                      <p className="text-purple-700 text-sm">
                        Disability certificate from the well-designed medical board.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        General
                      </h4>
                      <p className="text-gray-700 text-sm">
                        No certificate required.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Key Recommendations */}
                <section id="recommendations" className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Key Recommendations
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Best Practices
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Please double-check your category section while registering for the exam. That could be the safest way.</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>If you're OBC or EWS, then make sure that all your certificates are valid as per the central list. Don't just wait until counselling to discover issues.</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>However, if you are unable to produce a reservation certificate, then you should always opt to switch to General in MCC registration instead of risking cancellation.</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>This is especially for those who have genuine, uncommon cases (like disability after exams); you should be prepared that you may need legal help to claim your rights.</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>You know what is the most important thing? You should keep your eye on MCC notifications for NEET PG 2025 for updates, because rules sometimes change year to year.</span>
                      </li>
                    </ul>
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
                        Q1. Can a General-category applicant switch to OBC/SC/ST/EWS during All India Counselling?
                      </h3>
                      <p className="text-gray-700">
                        No. Changing from General to a reserved category is not permitted in All India (MCC) counselling; reservation changes of this kind are disallowed during registration.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Q2. Can OBC/SC/ST/EWS applicants switch to General in MCC registration?
                      </h3>
                      <p className="text-gray-700">
                        Yes. Candidates registered under a reserved category may opt to participate as General during MCC registration if they choose to forgo reservation benefits.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Q3. Can PwD status be changed during counselling?
                      </h3>
                      <p className="text-gray-700">
                        PwD Yes to PwD No is allowed if the candidate cannot meet certification requirements; PwD No to PwD Yes is not permitted in MCC and typically requires legal recourse to consider exceptions.
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Q4. Do these change rules also apply to state counselling?
                      </h3>
                      <p className="text-gray-700">
                        Not necessarily. State counselling runs under separate rules and fresh registration; many states allow category selection per state norms, independent of the exam application data (with some state-specific exceptions).
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
                      Have a question beyond these FAQs? Submit the Google Form and our team will respond during 9 AM–7 PM support hours.
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
                          Aarav Kumar
                        </h5>
                        <span className="text-sm text-gray-500">
                          3 hours ago
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        This cleared all my doubts about category changes! I was worried I made a mistake during registration but now I understand the rules better.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                          <Heart className="w-4 h-4 mr-1" />
                          Like (8)
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
                          Sneha Reddy
                        </h5>
                        <span className="text-sm text-gray-500">
                          1 day ago
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Thank you for explaining state counselling vs MCC differences. I didn't know I could still apply under OBC in my state even though I applied as General in NBE!
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                          <Heart className="w-4 h-4 mr-1" />
                          Like (15)
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
                          Dr. Vikram Joshi
                        </h5>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Very comprehensive guide! As someone who went through this process, I wish I had this information earlier. The certificate requirements section is especially helpful.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                          <Heart className="w-4 h-4 mr-1" />
                          Like (22)
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
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=80&h=60&fit=crop"
                      alt="Related article"
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        NRI Category Seats in NEET PG 2025
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">5 min read</p>
                    </div>
                  </div>

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
                      <p className="text-xs text-gray-500 mt-1">7 min read</p>
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
                        Understanding Certificate Requirements
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">4 min read</p>
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
                    Category Guidelines
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

export default NEETPGCategoryChangeBlog;