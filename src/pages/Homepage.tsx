// import React, { useState, useEffect, useRef } from "react"
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowRight,
//   Users,
//   BookOpen,
//   Menu,
//   X,
//   ChevronDown,
//   Star,
//   Search,
//   Award,
//   Target,
//   BarChart3,
//   Settings,
//   CheckCircle,
//   Phone,
//   Mail,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
  
// } from "lucide-react";

// function Homepage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeReview, setActiveReview] = useState<number | null>(null);
//   const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
//   const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [dashboardVisible, setDashboardVisible] = useState(false);
//   const [chaosVisible, setChaosVisible] = useState(false);
//   const [featuresVisible, setFeaturesVisible] = useState(false);
//   const [reviewsVisible, setReviewsVisible] = useState(false);

//   const heroRef = useRef<HTMLDivElement>(null);
//   const dashboardRef = useRef<HTMLDivElement>(null);
//   const chaosRef = useRef<HTMLDivElement>(null);
//   const featuresRef = useRef<HTMLDivElement>(null);
//   const reviewsRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate(); //
    
  

//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.2,
//       rootMargin: "0px 0px -100px 0px",
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.target === heroRef.current) {
//           setIsVisible(entry.isIntersecting);
//         } else if (entry.target === dashboardRef.current) {
//           setDashboardVisible(entry.isIntersecting);
//         } else if (entry.target === chaosRef.current) {
//           setChaosVisible(entry.isIntersecting);
//         } else if (entry.target === featuresRef.current) {
//           setFeaturesVisible(entry.isIntersecting);
//         } else if (entry.target === reviewsRef.current) {
//           setReviewsVisible(entry.isIntersecting);
//         }
//       });
//     }, observerOptions);

//     [heroRef, dashboardRef, chaosRef, featuresRef, reviewsRef].forEach(
//       (ref) => {
//         if (ref.current) observer.observe(ref.current);
//       }
//     );

//     return () => observer.disconnect();
//   }, []);

//   const stats = [
//     { number: "15+", label: "Years of", sublabel: "experience" },
//     { number: "150k+", label: "Students", sublabel: "Registered" },
//     { number: "2M+", label: "Candidates", sublabel: "Served" },
//     { number: "750k+", label: "Queries", sublabel: "Answered" },
//   ];

//   const chaosReasons = [
//     {
//       title: "Unpredictable Trends",
//       description:
//         "Last Year's Cutoffs Won't Save You. You need multi-year trends, current seat data, and insights on how others are choosing.",
//       image:
//         "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-red-100 to-red-200",
//     },
//     {
//       title: "The Rules Vary. A Lot.",
//       description:
//         "Every state/counselling/quota has its own rules, fees, and eligibility, and they change every round.",
//       image:
//         "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-blue-100 to-blue-200",
//     },
//     {
//       title: "Decoding Quotas & Options",
//       description:
//         "All India Quota, State Quota, Deemed, Private, MBBS or BDS? Each path affects your fees, choices and future.",
//       image:
//         "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-purple-100 to-purple-200",
//     },
//     {
//       title: "Which College? Which Seat?",
//       description:
//         "160,000+ seats. 1000+ colleges. You need to find the ones that fit your rank, budget, and goals.",
//       image:
//         "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-green-100 to-green-200",
//     },
//     {
//       title: "Myths, PDFs and WhatsApp Advice",
//       description:
//         "From Telegram tips to WhatsApp groups, everyone has unreliable opinions while official data is scattered and hard to decode.",
//       image:
//         "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-yellow-100 to-yellow-200",
//     },
//     {
//       title: "Make confident choices",
//       description:
//         "A single mistake in your choice list can set you back. You're expected to make confident decisions on the 1st try.",
//       image:
//         "https://cdn.dribbble.com/userupload/44607893/file/487dd57b87ebd1b5e137edfea43df826.jpg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-indigo-100 to-indigo-200",
//     },
//   ];

//   const features = [
//     {
//       title: "Cut-offs & Seat Matrix",
//       description:
//         "Explore cut-offs across years & rounds to predict your best possible range of colleges. Sometimes you get your best college not in the first round but in the second.",
//       color: "border-green-300 bg-green-50",
//       textColor: "text-green-800",
//       icon: <BarChart3 className="w-8 h-8 text-green-600" />,
//       highlight: "Cut-offs & Seat Matrix",
//     },
//     {
//       title: "Fee, Stipend & Bond",
//       description:
//         "From course fees, penalties to hostel costs, we've got the numbers covered. For PGs, know your stipend and service bond obligations in advance.",
//       color: "border-blue-300 bg-blue-50",
//       textColor: "text-blue-800",
//       icon: <Target className="w-8 h-8 text-blue-600" />,
//       highlight: "Fee, Stipend & Bond",
//     },
//     {
//       title: "STRATEGIES FOR ROUND 2",
//       description:
//         "Should you upgrade? Will you loose your seat? Is it worth the penalty?",
//       color: "border-purple-300 bg-purple-50",
//       textColor: "text-purple-800",
//       icon: <Award className="w-8 h-8 text-purple-600" />,
//       highlight: "STRATEGIES FOR ROUND 2",
//     },
//     {
//       title: "Webinars & Live Doubt Sessions",
//       description:
//         "Get expert strategies and answers — tailored for each counselling and round.",
//       color: "border-orange-300 bg-orange-50",
//       textColor: "text-orange-800",
//       icon: <BookOpen className="w-8 h-8 text-orange-600" />,
//       highlight: "Webinars & Video Guides",
//     },
//     {
//       title: "Rank College Predictor",
//       description: "Fine tune your choice list before facing the D day.",
//       color: "border-red-300 bg-red-50",
//       textColor: "text-red-800",
//       icon: <Settings className="w-8 h-8 text-red-600" />,
//       highlight: "Choice List builder",
//     },
//     {
//       title: "Advanced tools",
//       description: "Know every seat, every movement, who got admitted where.",
//       color: "border-teal-300 bg-teal-50",
//       textColor: "text-teal-800",
//       icon: <Search className="w-8 h-8 text-teal-600" />,
//       highlight: "Advanced tools",
//     },
//   ];

//   const reviews = [
//     {
//       name: "Dr. Priya Sharma",
//       role: "NEET UG 2023 - AIIMS Delhi",
//       specialty: "MD Paediatrics Resident",
//       location:
//         "Dr. Uttam Patil Medical College and Hospital Jalgaon, Maharashtra",
//       rating: 5,
//       review:
//         "Believers Consultancy excels at providing instant notifications about counselling schedules, seat matrix changes, and deadlines. This real-time accuracy reduces stress and keeps users ahead in the fast-paced counselling process.",
//       detailedReview:
//         "Detailed profiles of medical colleges including seat availability, fees, specialties, and cutoff trends empower users to make informed decisions. The inclusion of historical data adds immense value for strategic choices.",
//       image:
//         "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//     {
//       name: "Dr. Mandeep Singh",
//       role: "MD Gynaecology Resident",
//       specialty: "NEET PG 2023",
//       location: "Government Medical College",
//       rating: 5,
//       review:
//         "Believers Consultancy is a must have. It makes analysing previous year cut-offs easy and you will find what you are looking for within a few clicks.",
//       detailedReview:
//         "If we had known about this app 2-3 years back, would have definitely got a better seat. I am really surprised how completely contented with the data and work you have put out in the app/website.",
//       image:
//         "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//     {
//       name: "Dr. Nivetha Arun Pranaav",
//       role: "UG Microbiology",
//       specialty: "NEET UG 2023",
//       location: "Government Medical College",
//       rating: 5,
//       review:
//         "My son got admitted at K.S. Hegde Mangalore in Radio Diagnostic in the very first round.",
//       detailedReview:
//         "It is a wholesome package suggested for everyone who wants to be clear and precise in their journey of counselling. Thank You Believers Consultancy.",
//       image:
//         "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//     {
//       name: "Madhu Kamani",
//       role: "Parent",
//       specialty: "NEET Counselling Support",
//       location: "Mumbai",
//       rating: 5,
//       review: "Thank You Believers Consultancy ❤️",
//       detailedReview:
//         "The guidance and support provided throughout the counselling process was exceptional. My daughter secured her dream seat with Believers Consultancy guidance.",
//       image:
//         "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//     {
//       name: "Dr. Falit Karim",
//       role: "UG Ophthalmology",
//       specialty: "NEET UG 2023",
//       location: "Government Medical College",
//       rating: 5,
//       review:
//         "Believers Consultancy made my NEET counselling journey smooth and stress-free.",
//       detailedReview:
//         "The comprehensive data analysis and expert guidance helped me make informed decisions. Highly recommend to all NEET aspirants.",
//       image:
//         "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//   ];

//   const faqs = [
//     {
//       question:
//         "Isn't this information already available for free? Why Believers Consultancy?",
//       answer:
//         "While basic information exists scattered across various sources, Believers Consultancy consolidates everything into one comprehensive, user-friendly platform. We provide analyzed data, predictions, and personalized guidance that saves you countless hours of research. Everything is completely FREE - just login and access all features!",
//     },
//     {
//       question: "How accurate is the data provided on Believers Consultancy?",
//       answer:
//         "Our data is sourced directly from official counselling authorities and updated in real-time. We maintain 99%+ accuracy and cross-verify all information through multiple official channels.",
//     },
//     {
//       question: "Is this completely free? Are there any hidden charges?",
//       answer:
//         "Absolutely! Believers Consultancy is 100% free. Just create an account and access all features, tools, and resources without any payment or subscription required. No hidden charges, no premium plans - everything is FREE!",
//     },
//     {
//       question: "Can I get updates for both NEET UG and NEET PG counselling?",
//       answer:
//         "Yes! Our platform covers both NEET UG and NEET PG counselling processes. You'll receive updates, notifications, and guidance for whichever exam track you're following.",
//     },
//     {
//       question:
//         "How is Believers Consultancy useful if I've already started counselling?",
//       answer:
//         "Even mid-counselling, our tools help you make better choices in subsequent rounds, understand upgrade possibilities, calculate financial implications, and avoid common mistakes that could cost you your preferred seat.",
//     },
//     {
//       question: "Is there a mobile app available?",
//       answer:
//         "Currently, Believers Consultancy is optimized for web browsers on all devices. Our responsive design ensures you get the complete experience on mobile, tablet, or desktop.",
//     },
//     {
//       question: "What does Believers Consultancy access include?",
//       answer:
//         "Complete FREE access includes: Real-time cut-off data, seat matrix analysis, fee calculators, choice list builders, expert webinars, round-wise strategies, college comparisons, and 24/7 doubt resolution support.",
//     },
//   ];

//   const nextReview = () => {
//     setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
//   };

//   const prevReview = () => {
//     setCurrentReviewIndex(
//       (prev) => (prev - 1 + reviews.length) % reviews.length
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-lg">BD</span>
//               </div>
//               <span className="text-2xl font-bold text-gray-900">
//                 Believers Consultancy
//               </span>
//             </div>

//             <div className="hidden md:flex items-center space-x-8">
//               <div className="flex items-center space-x-6">
//                 <div className="relative group"></div>
//                 <div className="relative group"></div>
//                 <a
//                   href="#"
//                   className="text-gray-700 hover:text-orange-600 transition-colors"
//                 ></a>

//                 <div className="relative group"></div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Phone className="w-4 h-4" />
//                   <span>091-9211724969</span>
//                 </div>
//                 <button 
//                 onClick={() => navigate("/login")}
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
//                   Login
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2"
//             >
//               {isMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
//             <div className="px-4 py-4 space-y-3">
//               <button 
//               onClick={() => navigate("/login")}
//               className="w-full bg-orange-500 text-white px-4 py-3 rounded-full mt-4 font-semibold">
//                 Login
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         className="pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-16">
//             <h1
//               className={`text-5xl md:text-7xl font-bold text-gray-900 mb-6 transition-all duration-700 ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               }`}
//             >
//               Your Ultimate Guide to
//             </h1>
//             <div
//               className={`text-4xl md:text-6xl font-bold mb-8 transition-all duration-700 delay-100 ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               }`}
//             >
//               <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
//                 NEET UG • NEET PG
//               </span>{" "}
//               <span className="text-gray-900">Counselling</span>
//             </div>
//             <p
//               className={`text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               }`}
//             >
//               Counselling dates, colleges, courses, fees, cut-offs, and beyond.
//               Let's take the guess work out of your choice filling.
//             </p>
//             <div
//               className={`mb-8 transition-all duration-700 delay-300 ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               }`}
//             >
//               <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold text-lg mb-6">
//                 <CheckCircle className="w-5 h-5 mr-2" />
//                 <span>
//                   All resources are completely FREE - just login and access
//                   everything!
//                 </span>
//               </div>
//             </div>
//             <button
//             onClick={() => navigate("/login")}
//               className={`bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               } transition-all duration-700 delay-400`}
//             >
//               <span>Get started</span>
//               <ArrowRight className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className={`text-center transition-all duration-700 ${
//                   isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-10"
//                 }`}
//                 style={{ transitionDelay: `${100 + index * 80}ms` }}
//               >
//                 <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm text-gray-600 font-medium">
//                   {stat.label}
//                 </div>
//                 <div className="text-sm text-gray-500">{stat.sublabel}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Dashboard Preview - Overlapping & Animated */}
//       <section
//         ref={dashboardRef}
//         className="relative"
//         style={{
//           marginTop: "-60px", // Reduced overlap for smoother scroll
//           zIndex: 10,
//           marginBottom: "0px",
//         }}
//       >
//         <div className="max-w-6xl mx-auto px-4 sm:px-2 lg:px-2">
//           <div
//             className={`relative transition-all duration-500`}
//             style={{
//               transform: dashboardVisible
//                 ? "translateY(0) scale(1)"
//                 : "translateY(30vh) scale(0.1)",
//               opacity: dashboardVisible ? 1 : 0.7,
//               transition:
//                 "transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)",
//             }}
//           >
//             <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-200 relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-[50px]"></div>
//               <div className="relative p-8">
//                 <img
//                   src="https://cdn.dribbble.com/userupload/44607602/file/59e8f7cba815e15a4c7a645f26af0bdb.jpg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
//                   alt="Believers Consultancy Dashboard Preview"
//                   className="w-full h-auto rounded-[30px] shadow-lg"
//                   style={{ aspectRatio: "16/10" }}
//                   loading="eager"
//                 />
//                 <div className="absolute inset-8 bg-gradient-to-t from-black/20 to-transparent rounded-[30px] pointer-events-none"></div>
//                 <div className="absolute bottom-16 left-16 text-white">
//                   <h3 className="text-3xl font-bold mb-2">
//                     Believers Consultancy Dashboard
//                   </h3>
//                   <p className="text-xl opacity-40">
//                     Your complete NEET counselling companion
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Welcome to Counselling Chaos */}
//       <section
//         ref={chaosRef}
//         className="py-24 bg-gray-50 relative overflow-hidden"
//         style={{ marginTop: "-1vh" }} // Ensures chaos section starts right after dashboard
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div
//             className={`text-center mb-20 transition-all duration-500 ${
//               chaosVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//             }`}
//           >
//             <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//               Welcome to the Counselling Chaos.
//             </h2>
//             <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               To get the best seat, here's everything you're expected to figure
//               out on your own:
//             </p>
//           </div>

//           <div className="space-y-24">
//             {chaosReasons.map((reason, index) => (
//               <div
//                 key={index}
//                 className={`flex flex-col ${
//                   index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
//                 } items-center gap-16 lg:gap-20 transition-all duration-1000 ${
//                   chaosVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-20"
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div className="flex-1 relative group">
//                   <div
//                     className={`bg-gradient-to-br ${reason.color} rounded-3xl p-8 h-80 flex items-center justify-center relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
//                     <div className="text-center relative z-10">
//                       <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
//                         <span className="text-gray-800 font-bold text-2xl">
//                           {index + 1}
//                         </span>
//                       </div>
//                       <p className="text-gray-700 font-medium text-lg">
//                         Visual representation of:
//                       </p>
//                       <p className="text-gray-900 font-bold text-xl mt-2">
//                         {reason.title}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                     {reason.title}
//                   </h3>
//                   <p className="text-lg text-gray-600 leading-relaxed">
//                     {reason.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Say Hello Section */}
//       <section
//         ref={featuresRef}
//         className="py-24 bg-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div
//             className={`text-center mb-20 transition-all duration-1000 ${
//               featuresVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//             }`}
//           >
//             <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//               Say hello 👋 to Believers Consultancy
//             </h2>
//             <p className="text-xl text-gray-600 leading-relaxed">
//               The most effective way to choose your best seat.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`${
//                   feature.color
//                 } rounded-3xl p-8 border-2 hover:scale-105 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl ${
//                   featuresVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-20"
//                 }`}
//                 style={{ transitionDelay: `${index * 100}ms` }}
//               >
//                 <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
//                   {feature.icon}
//                 </div>
//                 <h3
//                   className={`text-xl font-bold ${feature.textColor} mb-4 group-hover:scale-105 transition-transform duration-300`}
//                 >
//                   {feature.highlight}
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Have a question specific to you?
//             </h2>
//             <p className="text-xl text-gray-600 mb-8">
//               Sometimes all you want is to talk to a person
//             </p>
//             <p className="text-2xl font-bold text-gray-900 mb-8">
//               Trust us, we've seen it all; and if we haven't, we'll figure it
//               out.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
//               <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
//                 <Phone className="w-5 h-5 mr-2" />
//                 <span>Talk to an expert: +91 9211724969</span>
//               </div>
//               <div className="flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
//                 <Mail className="w-5 h-5 mr-2" />
//                 <span>Email us: connect@bdcounsels.com</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="bg-green-100 rounded-3xl p-8 text-center">
//                 <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
//                   <Phone className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-green-800 mb-4">
//                   No question is off-topic
//                 </h3>
//                 <p className="text-green-700">
//                   If it matters to you, it matters to us.
//                 </p>
//               </div>

//               <div className="bg-blue-100 rounded-3xl p-8 text-center">
//                 <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
//                   <Users className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-blue-800 mb-4">
//                   No AI. No bots.
//                 </h3>
//                 <p className="text-blue-700">
//                   Real humans, real conversations.
//                 </p>
//               </div>

//               <div className="bg-yellow-100 rounded-3xl p-8 text-center">
//                 <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
//                   <Clock className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-yellow-800 mb-4">
//                   No limits
//                 </h3>
//                 <p className="text-yellow-700">
//                   Talk as long as you want, as often as you need.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section ref={reviewsRef} className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`text-center mb-16 transition-all duration-1000 ${
//               reviewsVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//             }`}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Don't take our word for it
//             </h2>
//             <p className="text-xl text-gray-600">
//               Ask our users what they have to say
//             </p>
//           </div>

//           <div className="relative">
//             <div className="flex items-center justify-center mb-8">
//               <button
//                 onClick={prevReview}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-4"
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={nextReview}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 <ChevronRight className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {reviews
//                 .slice(currentReviewIndex, currentReviewIndex + 3)
//                 .map((review, index) => (
//                   <div
//                     key={index}
//                     className={`relative group transition-all duration-1000 ${
//                       reviewsVisible
//                         ? "opacity-100 translate-y-0"
//                         : "opacity-0 translate-y-20"
//                     }`}
//                     style={{ transitionDelay: `${index * 100}ms` }}
//                     onMouseEnter={() =>
//                       setActiveReview(currentReviewIndex + index)
//                     }
//                     onMouseLeave={() => setActiveReview(null)}
//                   >
//                     <div
//                       className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-200 transition-all duration-500 cursor-pointer h-full ${
//                         activeReview === currentReviewIndex + index
//                           ? "scale-105 shadow-2xl"
//                           : ""
//                       }`}
//                     >
//                       <div className="flex items-center mb-6">
//                         <img
//                           src={review.image}
//                           alt={review.name}
//                           className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg"
//                         />
//                         <div>
//                           <h4 className="font-bold text-gray-900 text-lg">
//                             {review.name}
//                           </h4>
//                           <p className="text-sm text-orange-600 font-semibold">
//                             {review.specialty}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {review.location}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex mb-4">
//                         {[...Array(review.rating)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className="w-5 h-5 text-yellow-400 fill-current"
//                           />
//                         ))}
//                       </div>
//                       <p className="text-gray-700 leading-relaxed mb-4 italic">
//                         "{review.review}"
//                       </p>

//                       {review.verified && (
//                         <div className="flex items-center text-green-600 text-sm font-semibold">
//                           <CheckCircle className="w-4 h-4 mr-2" />
//                           <span>Verified Review</span>
//                         </div>
//                       )}

//                       {/* Hover overlay */}
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center transition-all duration-500 ${
//                           activeReview === currentReviewIndex + index
//                             ? "opacity-95"
//                             : "opacity-0 pointer-events-none"
//                         }`}
//                       >
//                         <div className="text-center text-white p-8">
//                           <CheckCircle className="w-16 h-16 mx-auto mb-4" />
//                           <p className="font-bold text-xl mb-2">
//                             Success Story
//                           </p>
//                           <p className="text-orange-100 leading-relaxed">
//                             "{review.detailedReview}"
//                           </p>
//                           <div className="mt-4 text-orange-200 font-semibold">
//                             Thank You Believers Consultancy ❤️
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <div className="text-center mt-12">
//               <button className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg transition-colors">
//                 <span>View all testimonials</span>
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Take Control Today */}
//       <section className="py-10 bg-gradient-to-br from-blue-500 to-indigo-100 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Take Control Today
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//             Stop guessing. Start planning with clarity and confidence.
//             Everything is FREE!
//           </p>
//           <button 
//           onClick={() => navigate("/login")}
//           className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl mb-16">
//             <span>Get started - FREE Access</span>
//             <ArrowRight className="w-6 h-6" />
//           </button>

//           {/* <div className="flex justify-center">
//             <div className="bg-white rounded-[50px] p-6 shadow-2xl max-w-md border border-gray-200">
//               <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[30px] flex items-center justify-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
//                 <div className="text-center relative z-10">
//                   <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
//                     <GraduationCap className="w-20 h-10 text-white" />
//                   </div>
//                   <p className="text-gray-700 font-bold text-lg">
//                     Mobile & Desktop Ready
//                   </p>
//                   <p className="text-gray-500 text-sm mt-2">
//                     Access anywhere, anytime
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </section>

//       {/* FAQ Section
//       <section className="py-24 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-xl text-gray-600">
//               Here are some answers to questions you might be looking for.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <button
//                   className="w-full px-8 py-6 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
//                   onClick={() =>
//                     setActiveFAQ(activeFAQ === index ? null : index)
//                   }
//                 >
//                   <span className="font-semibold text-gray-900 text-lg pr-4">
//                     {faq.question}
//                   </span>
//                   <ChevronDown
//                     className={`w-6 h-6 text-gray-500 transition-transform flex-shrink-0 ${
//                       activeFAQ === index ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 <div
//                   className={`px-8 bg-gray-50 transition-all duration-300 overflow-hidden ${
//                     activeFAQ === index
//                       ? "py-6 opacity-100"
//                       : "py-0 opacity-0 max-h-0"
//                   }`}
//                 >
//                   <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <div className="col-span-1 md:col-span-1">
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
//                   <span className="text-white font-bold text-lg">BD</span>
//                 </div>
//                 <span className="text-2xl font-bold">Believers Consultancy</span>
//               </div>
//               <p className="text-gray-400 mb-8 leading-relaxed">
//                 Powered by Believers Destination
//                 Your ultimate guide to NEET UG & NEET PG counselling. 100% free
//                 access to all resources and expert guidance.
//               </p>
//               <div className="flex space-x-4">
//                 <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors cursor-pointer">
//                   <span className="text-sm font-semibold">Download App</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">QUICK LINKS</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     Packages
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     Testimonials
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     Blog
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     News
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     Contact us
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">EXAMS</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     NEET UG
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     NEET PG
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     INICET
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     DNB PDCET
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     NEET SS
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">LEGAL</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     Package Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-white transition-colors hover:text-orange-400"
//                   >
//                     Terms & Conditions
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
//             <p>
//               &copy; 2025 Believers Destination. All rights reserved. | Empowering
//               students with free counselling guidance.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Homepage;


import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Users,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  Star,
  Search,
  Award,
  Target,
  BarChart3,
  Settings,
  CheckCircle,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import TypingCategories from "../components/TypingCategories"

function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState<number | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [chaosVisible, setChaosVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
    
  

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroRef.current) {
          setIsVisible(entry.isIntersecting);
        } else if (entry.target === dashboardRef.current) {
          setDashboardVisible(entry.isIntersecting);
        } else if (entry.target === chaosRef.current) {
          setChaosVisible(entry.isIntersecting);
        } else if (entry.target === featuresRef.current) {
          setFeaturesVisible(entry.isIntersecting);
        } else if (entry.target === reviewsRef.current) {
          setReviewsVisible(entry.isIntersecting);
        }
      });
    }, observerOptions);

    [heroRef, dashboardRef, chaosRef, featuresRef, reviewsRef].forEach(
      (ref) => {
        if (ref.current) observer.observe(ref.current);
      }
    );

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "15+", label: "Years of", sublabel: "experience" },
    { number: "150k+", label: "Students", sublabel: "Registered" },
    { number: "2M+", label: "Candidates", sublabel: "Served" },
    { number: "750k+", label: "Queries", sublabel: "Answered" },
  ];

  const chaosReasons = [
    {
      title: "Unpredictable Trends",
      description:
        "Last Year's Cutoffs Won't Save You. You need multi-year trends, current seat data, and insights on how others are choosing.",
      desktopImage:
        "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      mobileImage:
        "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      color: "from-red-100 to-red-200",
    },
    {
      title: "The Rules Vary. A Lot.",
      description:
        "Every state/counselling/quota has its own rules, fees, and eligibility, and they change every round.",
      desktopImage:
        "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      mobileImage:
        "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      color: "from-blue-100 to-blue-200",
    },
    {
      title: "Decoding Quotas & Options",
      description:
        "All India Quota, State Quota, Deemed, Private, MBBS or BDS? Each path affects your fees, choices and future.",
      desktopImage:
        "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      mobileImage:
        "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      color: "from-purple-100 to-purple-200",
    },
    {
      title: "Which College? Which Seat?",
      description:
        "160,000+ seats. 1000+ colleges. You need to find the ones that fit your rank, budget, and goals.",
      desktopImage:
        "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      mobileImage:
        "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      color: "from-green-100 to-green-200",
    },
    {
      title: "Myths, PDFs and WhatsApp Advice",
      description:
        "From Telegram tips to WhatsApp groups, everyone has unreliable opinions while official data is scattered and hard to decode.",
      desktopImage:
        "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      mobileImage:
        "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      color: "from-yellow-100 to-yellow-200",
    },
    {
      title: "Make confident choices",
      description:
        "A single mistake in your choice list can set you back. You're expected to make confident decisions on the 1st try.",
      desktopImage:
        "https://cdn.dribbble.com/userupload/44607893/file/487dd57b87ebd1b5e137edfea43df826.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      mobileImage:
        "https://cdn.dribbble.com/userupload/44607893/file/487dd57b87ebd1b5e137edfea43df826.jpg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      color: "from-indigo-100 to-indigo-200",
    },
  ];

  const features = [
    {
      title: "Cut-offs & Seat Matrix",
      description:
        "Explore cut-offs across years & rounds to predict your best possible range of colleges. Sometimes you get your best college not in the first round but in the second.",
      color: "border-green-300 bg-green-50",
      textColor: "text-green-800",
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      highlight: "Cut-offs & Seat Matrix",
    },
    {
      title: "Fee, Stipend & Bond",
      description:
        "From course fees, penalties to hostel costs, we've got the numbers covered. For PGs, know your stipend and service bond obligations in advance.",
      color: "border-blue-300 bg-blue-50",
      textColor: "text-blue-800",
      icon: <Target className="w-8 h-8 text-blue-600" />,
      highlight: "Fee, Stipend & Bond",
    },
    {
      title: "Multi Rank-Predictors ",
      description:
        "Should you upgrade? Will you loose your seat? Is it worth the penalty?",
      color: "border-purple-300 bg-purple-50",
      textColor: "text-purple-800",
      icon: <Award className="w-8 h-8 text-purple-600" />,
      highlight: "Multi Rank-Predictors",
    },
    {
      title: "Webinars & Live Doubt Sessions",
      description:
        "Get expert strategies and answers — tailored for each counselling and round.",
      color: "border-orange-300 bg-orange-50",
      textColor: "text-orange-800",
      icon: <BookOpen className="w-8 h-8 text-orange-600" />,
      highlight: "Webinars & Video Guides",
    },
    {
      title: "Rank College Predictor",
      description: "Fine tune your choice list before facing the D day.",
      color: "border-red-300 bg-red-50",
      textColor: "text-red-800",
      icon: <Settings className="w-8 h-8 text-red-600" />,
      highlight: "Choice List builder",
    },
    {
      title: "Advanced tools",
      description: "Know every seat, every movement, who got admitted where.",
      color: "border-teal-300 bg-teal-50",
      textColor: "text-teal-800",
      icon: <Search className="w-8 h-8 text-teal-600" />,
      highlight: "Advanced tools",
    },
  ];

  const reviews = [
    {
      name: "Dr. Priya ",
      role: "NEET UG 2025 - AIIMS Delhi",
      specialty: "MD Paediatrics Resident",
      location:
        "Dr. Uttam Patil Medical College and Hospital Jalgaon, Maharashtra",
      rating: 5,
      review:
        "Believers Consultancy excels at providing instant notifications about counselling schedules, seat matrix changes, and deadlines. This real-time accuracy reduces stress and keeps users ahead in the fast-paced counselling process.",
      detailedReview:
        "Detailed profiles of medical colleges including seat availability, fees, specialties, and cutoff trends empower users to make informed decisions. The inclusion of historical data adds immense value for strategic choices.",
      image:
        "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
    },
    {
      name: "Dr. Mandeep ",
      role: "MD Gynaecology Resident",
      specialty: "NEET PG 2024",
      location: "Government Medical College",
      rating: 5,
      review:
        "Believers Consultancy is a must have. It makes analysing previous year cut-offs easy and you will find what you are looking for within a few clicks.",
      detailedReview:
        "If we had known about this app 2-3 years back, would have definitely got a better seat. I am really surprised how completely contented with the data and work you have put out in the app/website.",
      image:
        "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
    },
    {
      name: "Dr. Nivetha ",
      role: "UG Microbiology",
      specialty: "NEET UG 2024",
      location: "Government Medical College",
      rating: 5,
      review:
        "My son got admitted at K.S. Hegde Mangalore in Radio Diagnostic in the very first round.",
      detailedReview:
        "It is a wholesome package suggested for everyone who wants to be clear and precise in their journey of counselling. Thank You Believers Consultancy.",
      image:
        "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
    },
    {
      name: "Madhu ",
      role: "PG Ophthalmology",
      specialty: "NEET Counselling Support",
      location: "Mumbai",
      rating: 5,
      review: "Thank You Believers Consultancy ❤️",
      detailedReview:
        "The guidance and support provided throughout the counselling process was exceptional. My daughter secured her dream seat with Believers Consultancy guidance.",
      image:
        "https://cdn.dribbble.com/userupload/44669412/file/db5d084e82ca6d9c9fa70ae37cb9cf63.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
    },
    {
      name: "Dr. Falit ",
      role: "UG Ophthalmology",
      specialty: "NEET UG 2024",
      location: "Government Medical College",
      rating: 5,
      review:
        "Believers Consultancy made my NEET counselling journey smooth and stress-free.",
      detailedReview:
        "The comprehensive data analysis and expert guidance helped me make informed decisions. Highly recommend to all NEET aspirants.",
      image:
        "https://cdn.dribbble.com/userupload/44669411/file/7a4de58473bddb2b24be4f79965fe29e.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
    },
  ];

  const faqs = [
    {
      question:
        "What is Believers Consultancy?",
      answer:
        "Believers Consultancy is a dedicated counselling service provider specializing in free guidance for NEET UG and PG aspirants. Our mission is to help medical entrance exam qualified students navigate the complex counselling process and secure admission in their preferred medical colleges across India. ",
    },
    {
      question: "Why do you provide free counselling services?",
      answer:
        "Our data is sourced directly from official counselling authorities and updated in real-time. We maintain 99%+ accuracy and cross-verify all information through multiple official channels.",
    },
    {
      question: "Is this completely free? Are there any hidden charges?",
      answer:
        "Absolutely! Believers Consultancy is 100% free. Just create an account and access all features, tools, and resources without any payment or subscription required. No hidden charges, no premium plans - everything is FREE!",
    },
    {
      question: "Who conducts NEET UG counselling?",
      answer:
        "NEET UG counselling is conducted at two levels: Central Level: Medical Counselling Committee (MCC) conducts counselling for 15% All India Quota (AIQ) seats and 100% seats in deemed/central universities.	State Level: Individual state authorities conduct counselling for 85% state quota seats",
    },

    {
      question:
        "How is Believers Consultancy useful if I've already started counselling?",
      answer:
        "Even mid-counselling, our tools help you make better choices in subsequent rounds, understand upgrade possibilities, calculate financial implications, and avoid common mistakes that could cost you your preferred seat.",
    },
    {
      question: "How many rounds of NEET UG counselling are there?",
      answer:
        "NEET UG counselling typically consists of (Round 1/Round 2/Round 3/Mop-up Round/Stray Vacancy Round (if required)) ,Each round provides opportunities for seat allotment and upgradation.",
    },
    {
      question: "Can I participate in both AIQ and State Quota counselling??",
      answer:
        "Yes, eligible candidates can participate in both AIQ and State Quota counselling simultaneously. However, you need to register separately for each counselling process.",
    },
  ];

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex(
      (prev) => (prev - 1 + reviews.length) % reviews.length
    );
  };

  
  return (

<div className="min-h-screen bg-white overflow-x-hidden">
   {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Text */}
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src="/media/logo.png"
                  alt="BD Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              {/* Heading + Tagline */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  Believers Consultancy
                </span>
                <span className="text-xs italic text-center text-gray-600">
                  Powered by Believers Destination
                </span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 ">
              <div className="flex items-center space-x-8">
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  Testimonials
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  onClick={() => navigate("/blog")}
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#news"
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  News
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#careers"
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  Careers
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
              
              <div className="flex items-left space-x-4">
                {/* <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>091-9211724969</span>
                </div> */}
                <button 
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg mr-[5px]"
                >
                  Login
                </button>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className=" p-2"
            >
              {isMenuOpen ? (
                <X className="md:hidden w-6 h-6 text-black" />
              ) : (
                <Menu className="md:hidden w-6 h-6 text-black" />
              )}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#testimonials"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all duration-300 font-medium"
                >
                  Testimonials
                </a>
                <a
                  onClick={() => navigate("/blog")}
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all duration-300 font-medium"
                >
                  Blog
                </a>
                <a
                  href="#news"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all duration-300 font-medium"
                >
                  News
                </a>
                <a
                  href="#careers"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all duration-300 font-medium"
                >
                  Careers
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all duration-300 font-medium"
                >
                  Contact Us
                </a>
                <div className="pt-2">
                  <button 
                    onClick={() => navigate("/login")}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
   

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h1
              className={`text-5xl md:text-7xl font-bold text-gray-900 mb-6 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Your Ultimate Guide to
            </h1>
            <div
  className={`text-4xl md:text-6xl font-bold mb-8 transition-all duration-700 delay-100 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  } flex justify-center items-center gap-3`}
>
  <TypingCategories />
  <span className="text-gray-900">Counselling</span>
</div>
            <p
              className={`text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Counselling dates, colleges, courses, fees, cut-offs, and beyond.
              Let's take the guess work out of your choice filling.
            </p>
            <div
              className={`mb-8 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold text-lg mb-6">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>
                  All resources are completely FREE - just login and access
                  everything!
                </span>
              </div>
            </div>
            <button
            onClick={() => navigate("/login")}
              className={`bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } transition-all duration-700 delay-400`}
            >
              <span>Get started</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${100 + index * 80}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section
        ref={dashboardRef}
        className="relative py-8"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative transition-all duration-500 ${
              dashboardVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-70 translate-y-10 scale-95"
            }`}
          >
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-200 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-[40px]"></div>
              <div className="relative p-6">
                {/* Desktop Image */}
                <img
                  src="https://cdn.dribbble.com/userupload/44656393/file/162ff7204b1ff5826ce7fd3e446c5566.png?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                  alt="Believers Consultancy Dashboard Preview"
                  className="w-full h-auto rounded-[30px] shadow-lg hidden md:block"
                  style={{ aspectRatio: "16/10" }}
                  loading="eager"
                />
                {/* Mobile Image */}
                <img
                  src="https://cdn.dribbble.com/userupload/44656684/file/cec64a8083e87908509e53b8db9b4121.png?auto=compress&cs=tinysrgb&w=600&h=1200&fit=crop"
                  alt="Believers Consultancy Dashboard Preview"
                  className="w-full h-auto rounded-[30px] shadow-lg md:hidden"
                  style={{ aspectRatio: "9/16" }}
                  loading="eager"
                />
                <div className="absolute inset-6 bg-gradient-to-t from-black/20 to-transparent rounded-[30px] pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Believers Consultancy Dashboard
                  </h3>
                  <p className="text-lg md:text-xl opacity-90">
                    Your complete NEET counselling companion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome to Counselling Chaos */}
      <section
        ref={chaosRef}
        className="py-16 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`text-center mb-16 transition-all duration-500 ${
              chaosVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to the Counselling Chaos.
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To get the best seat, here's everything you're expected to figure
              out on your own:
            </p>
          </div>

          <div className="space-y-16">
            {chaosReasons.map((reason, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:gap-16 transition-all duration-700 ${
                  chaosVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex-1 relative group">
                  <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    {/* Desktop Image */}
                    <img
                      src={reason.desktopImage}
                      alt={reason.title}
                      className="w-full h-80 object-cover hidden md:block"
                      loading="lazy"
                    />
                    {/* Mobile Image */}
                    <img
                      src={reason.mobileImage}
                      alt={reason.title}
                      className="w-full h-60 object-cover md:hidden"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} mix-blend-multiply opacity-40`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full mb-4 flex items-center justify-center shadow-lg">
                        <span className="text-gray-800 font-bold text-xl">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-white/90 font-medium text-sm">
                        Challenge #{index + 1}
                      </p>
                      <p className="text-white font-bold text-lg">
                        {reason.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Say Hello Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              featuresVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Say hello 👋 to Believers Consultancy
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              The most effective way to choose your best seat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${
                  feature.color
                } rounded-3xl p-8 border-2 hover:scale-105 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl ${
                  featuresVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-bold ${feature.textColor} mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  {feature.highlight}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Have a question specific to you?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sometimes all you want is to talk to a person
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-8">
              Trust us, we've seen it all; and if we haven't, we'll figure it
              out.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:text-green-900  hover:scale-110">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href="https://wa.me/919211724969?text=Hi%20I%20want%20to%20talk%20to%20an%20expert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green-700 "
                >
                Chat with an Expert on WhatsApp
                </a>
              </div>
              {/* <div className="flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
                <Mail className="w-5 h-5 mr-2" />
                <span>Email us: connect@believersconsultancy.com</span>
              </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-100 rounded-3xl p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  No question is off-topic
                </h3>
                <p className="text-green-700">
                  If it matters to you, it matters to us.
                </p>
              </div>

              <div className="bg-blue-100 rounded-3xl p-8 text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  No AI. No bots.
                </h3>
                <p className="text-blue-700">
                  Real humans, real conversations.
                </p>
              </div>

              <div className="bg-yellow-100 rounded-3xl p-8 text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-yellow-800 mb-4">
                  We’re Here for You
                </h3>
                <p className="text-yellow-700">
                  Available daily from 10 AM to 7 PM (Sunday Closed).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section ref={reviewsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              reviewsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Don't take our word for it
            </h2>
            <p className="text-xl text-gray-600">
              Ask our users what they have to say
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={prevReview}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-4"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={nextReview}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews
                .slice(currentReviewIndex, currentReviewIndex + 3)
                .map((review, index) => (
                  <div
                    key={index}
                    className={`relative group transition-all duration-1000 ${
                      reviewsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-20"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onMouseEnter={() =>
                      setActiveReview(currentReviewIndex + index)
                    }
                    onMouseLeave={() => setActiveReview(null)}
                  >
                    <div
                      className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-200 transition-all duration-500 cursor-pointer h-full ${
                        activeReview === currentReviewIndex + index
                          ? "scale-105 shadow-2xl"
                          : ""
                      }`}
                    >
                      <div className="flex items-center mb-6">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {review.name}
                          </h4>
                          <p className="text-sm text-orange-600 font-semibold">
                            {review.specialty}
                          </p>
                          <p className="text-xs text-gray-500 blur-sm">
                            {review.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4 italic">
                        "{review.review}"
                      </p>

                      {review.verified && (
                        <div className="flex items-center text-green-600 text-sm font-semibold">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>Verified Review</span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                          activeReview === currentReviewIndex + index
                            ? "opacity-95"
                            : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="text-center text-white p-8">
                          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                          <p className="font-bold text-xl mb-2">
                            Success Story
                          </p>
                          <p className="text-orange-100 leading-relaxed">
                            "{review.detailedReview}"
                          </p>
                          <div className="mt-4 text-orange-200 font-semibold">
                            Thank You Believers Consultancy ❤️
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="text-center mt-12">
              <button className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg transition-colors">
                <span>View all testimonials</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

     {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Here are some answers to questions you might be looking for.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full px-8 py-6 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                  onClick={() =>
                    setActiveFAQ(activeFAQ === index ? null : index)
                  }
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition-transform flex-shrink-0 ${
                      activeFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-8 bg-gray-50 transition-all duration-300 overflow-hidden ${
                    activeFAQ === index
                      ? "py-6 opacity-100"
                      : "py-0 opacity-0 max-h-0"
                  }`}
                >
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
       </section> 

      {/* Take Control Today */}
      <section className="py-16 bg-gradient-to-br from-blue-500 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Take Control Today
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop guessing. Start planning with clarity and confidence.
            Everything is FREE!
          </p>
          <button 
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl mb-8">
            <span>Get started - FREE Access</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                src="/media/logo.png"
                alt="BD Logo"
                 className="w-10 h-10 object-contain"
                />
              </div>
                <span className="text-2xl font-bold">Believers Consultancy</span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Powered by Believers Destination
                Your ultimate guide to counselling. 100% free
                access to all resources and expert guidance.
              </p>
              <div className="flex space-x-4">
                {/* <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">Download App</span>
                </div> */}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">QUICK LINKS</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">EXAMS</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    NEET PG
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    NEET UG (Coming Soon)
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    INICET (Coming Soon)
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    DNB PDCET (Coming Soon)
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    NEET SS (Coming Soon)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">LEGAL</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    onClick={() => navigate("/privacy")}
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    Privacy Policy
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    Package Policy
                  </a>
                </li> */}
                <li>
                  <a
                    onClick={() => navigate("/terms")}
                    className="hover:text-white transition-colors hover:text-orange-400"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Believers Destination. All rights reserved. | Empowering
              students with free counselling guidance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;