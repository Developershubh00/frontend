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
//   Youtube,      // Add this
//   Instagram,    // Add this
// } from "lucide-react";
// import TypingCategories from "../components/TypingCategories"
// import AiSensyWidget from "../components/AiSensyWidget";
// import WhatsAppSupport from "../components/WhatsAppSupport";

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
//   const navigate = useNavigate();



//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: "0px 0px -50px 0px",
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
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-red-100 to-red-200",
//     },
//     {
//       title: "The Rules Vary. A Lot.",
//       description:
//         "Every state/counselling/quota has its own rules, fees, and eligibility, and they change every round.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-blue-100 to-blue-200",
//     },
//     {
//       title: "Decoding Quotas & Options",
//       description:
//         "All India Quota, State Quota, Deemed, Private, MBBS or BDS? Each path affects your fees, choices and future.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-purple-100 to-purple-200",
//     },
//     {
//       title: "Which College? Which Seat?",
//       description:
//         "160,000+ seats. 1000+ colleges. You need to find the ones that fit your rank, budget, and goals.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-green-100 to-green-200",
//     },
//     {
//       title: "Myths, PDFs and WhatsApp Advice",
//       description:
//         "From Telegram tips to WhatsApp groups, everyone has unreliable opinions while official data is scattered and hard to decode.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-yellow-100 to-yellow-200",
//     },
//     {
//       title: "Make confident choices",
//       description:
//         "A single mistake in your choice list can set you back. You're expected to make confident decisions on the 1st try.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607893/file/487dd57b87ebd1b5e137edfea43df826.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
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
//       title: "Multi Rank-Predictors ",
//       description:
//         "Should you upgrade? Will you loose your seat? Is it worth the penalty?",
//       color: "border-purple-300 bg-purple-50",
//       textColor: "text-purple-800",
//       icon: <Award className="w-8 h-8 text-purple-600" />,
//       highlight: "Multi Rank-Predictors",
//     },
//     {
//       title: "Webinars & Live Doubt Sessions",
//       description:
//         "Get expert strategies and answers — tailored for each counselling and round.",
//       color: "border-cyan-300 bg-cyan-50",
//       textColor: "text-cyan-800",
//       icon: <BookOpen className="w-8 h-8 text-cyan-600" />,
//       highlight: "Webinars & Video Guides",
//     },
//     // {
//     //   title: "Rank College Predictor",
//     //   description: "Fine tune your choice list before facing the D day.",
//     //   color: "border-indigo-300 bg-indigo-50",
//     //   textColor: "text-indigo-800",
//     //   icon: <Settings className="w-8 h-8 text-indigo-600" />,
//     //   highlight: "Choice List builder",
//     // },
//     {
//       title: "Advanced tools",
//       description: "Know every seat, every movement, who got admitted where.",
//       color: "border-teal-300 bg-teal-50",
//       textColor: "text-teal-800",
//       icon: <Search className="w-8 h-8 text-teal-600" />,
//       highlight: "Advanced tools",
//     },
//     {
//       title: "INICET Live Results 2026",
//       description: "Check ranks, cutoffs, seat matrix, and counselling schedule for INICET Jan 2026. Get institute-wise data.",
//       color: "border-emerald-300 bg-emerald-50",
//       textColor: "text-emerald-800",
//       icon: <Award className="w-8 h-8 text-emerald-600" />,
//       highlight: "INICET Results Live",
//     }
//   ];

//   const reviews = [
//     {
//       name: "Dr. Priya ",
//       role: "NEET UG 2026 - AIIMS Delhi",
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
//       name: "Dr. Mandeep ",
//       role: "MD Gynaecology Resident",
//       specialty: "NEET PG 2024",
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
//       name: "Dr. Nivetha ",
//       role: "UG Microbiology",
//       specialty: "NEET UG 2024",
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
//       name: "Madhu ",
//       role: "PG Ophthalmology",
//       specialty: "NEET UG 2024",
//       location: "Mumbai",
//       rating: 5,
//       review: "Thank You Believers Consultancy ❤️",
//       detailedReview:
//         "The guidance and support provided throughout the counselling process was exceptional. My daughter secured her dream seat with Believers Consultancy guidance.",
//       image:
//         "https://cdn.dribbble.com/userupload/44669412/file/db5d084e82ca6d9c9fa70ae37cb9cf63.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//     {
//       name: "Dr. Falit ",
//       role: "UG Ophthalmology",
//       specialty: "NEET UG 2024",
//       location: "Government Medical College",
//       rating: 5,
//       review:
//         "Believers Consultancy made my NEET counselling journey smooth and stress-free.",
//       detailedReview:
//         "The comprehensive data analysis and expert guidance helped me make informed decisions. Highly recommend to all NEET aspirants.",
//       image:
//         "https://cdn.dribble.com/userupload/44669411/file/7a4de58473bddb2b24be4f79965fe29e.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//   ];

//   const faqs = [
//     {
//       question:
//         "What is Believers Consultancy?",
//       answer:
//         "Believers Consultancy is a dedicated counselling service provider specializing in free guidance for NEET UG and PG aspirants. Our mission is to help medical entrance exam qualified students navigate the complex counselling process and secure admission in their preferred medical colleges across India. ",
//     },
//     {
//       question: "Why do you provide free counselling services?",
//       answer:
//         "Our data is sourced directly from official counselling authorities and updated in real-time. We maintain 99%+ accuracy and cross-verify all information through multiple official channels.",
//     },
//     {
//       question: "Is this completely free? Are there any hidden charges?",
//       answer:
//         "Absolutely! Believers Consultancy is 100% free. Just create an account and access all features, tools, and resources without any payment or subscription required. No hidden charges, no premium plans - everything is FREE!",
//     },
//     {
//       question: "Who conducts NEET UG counselling?",
//       answer:
//         "NEET UG counselling is conducted at two levels: Central Level: Medical Counselling Committee (MCC) conducts counselling for 15% All India Quota (AIQ) seats and 100% seats in deemed/central universities.	State Level: Individual state authorities conduct counselling for 85% state quota seats",
//     },

//     {
//       question:
//         "How is Believers Consultancy useful if I've already started counselling?",
//       answer:
//         "Even mid-counselling, our tools help you make better choices in subsequent rounds, understand upgrade possibilities, calculate financial implications, and avoid common mistakes that could cost you your preferred seat.",
//     },
//     {
//       question: "How many rounds of NEET UG counselling are there?",
//       answer:
//         "NEET UG counselling typically consists of (Round 1/Round 2/Round 3/Mop-up Round/Stray Vacancy Round (if required)) ,Each round provides opportunities for seat allotment and upgradation.",
//     },
//     {
//       question: "Can I participate in both AIQ and State Quota counselling??",
//       answer:
//         "Yes, eligible candidates can participate in both AIQ and State Quota counselling simultaneously. However, you need to register separately for each counselling process.",
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
//             {/* Logo + Text */}
//             <div className="flex items-center ">
//               {/* Logo */}
//               {/* <div className="w-52 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"> */}
//               <div className="flex items-center">
//                 <img
//                   src="/media/logo4.png"
//                   alt="BD Logo"
//                   className="h-16 w-auto object-contain"
//                 />
//               </div>
//               {/* Heading + Tagline */}
//               {/* <div className="flex flex-col">
//                 <span className="text-2xl font-bold text-gray-900">
//                   Believers Consultancy
//                 </span>
//                 <span className="text-xs italic text-center text-gray-600">
//                   Powered by Believers Destination
//                 </span>
//               </div> */}
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8 ml-auto">
//               <div className="flex items-center space-x-8">
//                 <a
//                   onClick={() => navigate("/inicetdashboard")}
//                   className="text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-full transition-all duration-300 font-bold relative group cursor-pointer "
//                 >
//                   🎉 INICET Results Out!
//                   <span className="absolute -top-1 -right-1 flex h-3 w-3">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//                   </span>
//                 </a>
//                 {/* <a
//                   href="#testimonials"
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
//                 >
//                   Testimonials
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a> */}
//                 <a
//                   onClick={() => navigate("/blog")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
//                 >
//                   Blog
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   onClick={() => navigate("/announcements")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
//                 >
//                   News
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   href="#careers"
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
//                 >
//                   Careers
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   onClick={() => navigate("/support")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
//                 >
//                   Contact Us
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//               </div>

//               <div className="flex items-left space-x-4">
//                 {/* <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Phone className="w-4 h-4" />
//                   <span>091-9211724969</span>
//                 </div> */}
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg mr-[5px]"
//                 >
//                   Log-In | Sign-Up
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className=" p-2"
//             >
//               {isMenuOpen ? (
//                 <X className="md:hidden w-6 h-6 text-black" />
//               ) : (
//                 <Menu className="md:hidden w-6 h-6 text-black" />
//               )}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
//               <div className="px-2 pt-2 pb-3 space-y-1">

//                 <a
//                   onClick={() => {
//                     navigate("/inicetdashboard");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-3 text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-300 font-bold text-center cursor-pointer shadow-lg mb-2 animate-pulse"
//                 >
//                   🎉 INICET Results Out! Check Now
//                 </a>

//                 <a
//                   onClick={() => {
//                     navigate("/blog");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Blog
//                 </a>
//                 <a
//                   onClick={() => {
//                     navigate("/announcements");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   News
//                 </a>
//                 <a
//                   onClick={() => {
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Careers
//                 </a>
//                 <a
//                   onClick={() => {
//                     navigate("/support");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Contact Us
//                 </a>
//                 <div className="pt-2">
//                   <button
//                     onClick={() => {
//                       navigate("/login");
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
//                   >
//                     Log-In | Sign-Up
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>


//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         // className="pt-24 pb-5 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
//         className="pt-24 mr-2 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-cyan-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-12">
//             <h1
//               className={`text-5xl md:text-7xl font-bold text-gray-900 mb-6 transition-all duration-700 ${isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//                 }`}
//             >
//               Your Ultimate Guide to
//             </h1>
//             <div
//               className={`text-4xl md:text-6xl font-bold mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//                 } flex justify-center items-center gap-3`}
//             >
//               <TypingCategories />
//               <span className="text-gray-900">Counselling</span>
//             </div>
//             <p
//               className={`text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//                 }`}
//             >
//               Counselling dates, colleges, courses, fees, cut-offs, and beyond.
//               Let's take the guess work out of your choice filling.
//             </p>
//             <div
//               className={`mb-8 transition-all duration-700 delay-300 ${isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//                 }`}
//             >
//               <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold text-lg mb-6">
//                 <CheckCircle className="w-5 h-5 mr-2" />
//                 <span>
//                   All resources are completely FREE - just login and access
//                   everything!
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-6">
//               <button
//                 onClick={() => navigate("/signup")}
//                 className={`w-full sm:w-auto bg-gradient-to-r from-blue-300 to-indigo-600 hover:from-blue-300 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl ${isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-10"
//                   } transition-all duration-700 delay-400`}
//               >
//                 <span>Get started</span>
//                 <ArrowRight className="w-6 h-6" />
//               </button>

//               <button
//                 onClick={() => navigate("/inicetdashboard")}
//                 className={`w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse relative ${isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-10"
//                   } transition-all duration-700 delay-400`}
//               >
//                 <Award className="w-6 h-6" />
//                 <span>INICET Results - Check Now!</span>
//                 <span className="absolute -top-1 -right-1 flex h-4 w-4">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
//                 </span>
//               </button>
//             </div>
//             </div>

//             {/* <button
//             onClick={() => navigate("/signup")}
//               className={`bg-gradient-to-r from-blue-300 to-indigo-600 hover:from-blue-300 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               } transition-all duration-700 delay-400`}
//             >
//               <span>Get started</span>
//               <ArrowRight className="w-6 h-6" />
//             </button>
//             <button
//     onClick={() => navigate("/inicetdashboard")}
//     className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse relative"
//   >
//     <Award className="w-6 h-6" />
//     <span>INICET Results - Check Now!</span>
//     <span className="absolute -top-1 -right-1 flex h-4 w-4">
//       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
//       <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
//     </span>
//   </button>
//           </div> */}

//             {/* Stats */}
//             {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
//           </div> */}
//           </div>
//       </section>

//       {/* Dashboard Preview */}
//       <section
//         ref={dashboardRef}
//         className="relative py-8"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`relative transition-all duration-500 ${dashboardVisible
//                 ? "opacity-100 translate-y-0 scale-100"
//                 : "opacity-70 translate-y-10 scale-95"
//               }`}
//           >
//             <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-200 relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-[40px]"></div>
//               <div className="relative p-6">
//                 {/* Desktop Image */}
//                 <img
//                   src="https://cdn.dribbble.com/userupload/44858014/file/56d53c676b68c4180cdc94fbeba54656.png?auto=compress&cs=tinysrgb&w=1424&h=600&fit=crop"
//                   alt="Believers Consultancy Dashboard Preview"
//                   className="w-full h-auto rounded-[30px] shadow-lg hidden md:block"
//                   style={{ aspectRatio: "16/10" }}
//                   loading="eager"
//                 />
//                 {/* Mobile Image */}
//                 <img
//                   src="https://cdn.dribbble.com/userupload/44656684/file/cec64a8083e87908509e53b8db9b4121.png?auto=compress&cs=tinysrgb&w=600&h=1200&fit=crop"
//                   alt="Believers Consultancy Dashboard Preview"
//                   className="w-full h-auto rounded-[30px] shadow-lg md:hidden"
//                   style={{ aspectRatio: "9/16" }}
//                   loading="eager"
//                 />
//                 <div className="absolute inset-6 bg-gradient-to-t from-black/20 to-transparent rounded-[30px] pointer-events-none"></div>
//                 <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
//                   <h3 className="text-2xl md:text-3xl font-bold mb-2">
//                     Believers Consultancy Dashboard
//                   </h3>
//                   <p className="text-lg md:text-xl opacity-90">
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
//         className="py-16 bg-gray-50 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div
//             className={`text-center mb-16 transition-all duration-500 ${chaosVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//               }`}
//           >
//             <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//               Welcome to the Counselling Chaos.
//             </h2>
//             <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               To get the best seat, here's everything you're expected to figure
//               out on your own:
//             </p>
//           </div>

//           <div className="space-y-16">
//             {chaosReasons.map((reason, index) => (
//               <div
//                 key={index}
//                 className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
//                   } items-center gap-8 lg:gap-16 transition-all duration-700 ${chaosVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-20"
//                   }`}
//                 style={{ transitionDelay: `${index * 150}ms` }}
//               >
//                 <div className="flex-1 relative group">
//                   <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
//                     {/* Desktop Image */}
//                     <img
//                       src={reason.desktopImage}
//                       alt={reason.title}
//                       className="w-full h-80 object-cover hidden md:block"
//                       loading="lazy"
//                     />
//                     {/* Mobile Image */}
//                     <img
//                       src={reason.mobileImage}
//                       alt={reason.title}
//                       className="w-full h-60 object-cover md:hidden"
//                       loading="lazy"
//                     />
//                     <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} mix-blend-multiply opacity-40`}></div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                     <div className="absolute bottom-6 left-6 right-6 text-white">
//                       <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full mb-4 flex items-center justify-center shadow-lg">
//                         <span className="text-gray-800 font-bold text-xl">
//                           {index + 1}
//                         </span>
//                       </div>
//                       <p className="text-white/90 font-medium text-sm">
//                         Challenge #{index + 1}
//                       </p>
//                       <p className="text-white font-bold text-lg">
//                         {reason.title}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
//         className="py-10 bg-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div
//             className={`text-center mb-16 transition-all duration-1000 ${featuresVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//               }`}
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
//                 className={`${feature.color
//                   } rounded-3xl p-8 border-2 hover:scale-105 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl ${featuresVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-20"
//                   }`}
//                 style={{ transitionDelay: `${index * 50}ms` }}
//               >
//                 <div className="mb-6 transform group-hover:scale-110 transition-transform duration-200">
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
//       <section className="py-10 bg-gray-50">
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
//               <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:text-green-900  hover:scale-110">
//                 <Phone className="w-5 h-5 mr-2" />
//                 <a
//                   href="https://wa.me/919211724969?text=Hi%20I%20want%20to%20talk%20to%20an%20expert"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="font-semibold text-green-700 "
//                 >
//                   Chat with an Expert on WhatsApp
//                 </a>
//               </div>
//               {/* <div className="flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold">
//                 <Mail className="w-5 h-5 mr-2" />
//                 <span>Email us: connect@believersconsultancy.com</span>
//               </div> */}
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
//                 <p className="text-blue-300">
//                   Real humans, real conversations.
//                 </p>
//               </div>

//               <div className="bg-yellow-100 rounded-3xl p-8 text-center">
//                 <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
//                   <Clock className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-yellow-800 mb-4">
//                   We're Here for You
//                 </h3>
//                 <p className="text-yellow-700">
//                   Available daily from 10 AM to 7 PM (Sunday Closed).
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section ref={reviewsRef} className="py-14 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`text-center mb-16 transition-all duration-1000 ${reviewsVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//               }`}
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
//                 <ChevronLeft className="w-6 h-6 text-black" />
//               </button>
//               <button
//                 onClick={nextReview}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 <ChevronRight className="w-6 h-6 text-black" />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {reviews
//                 .slice(currentReviewIndex, currentReviewIndex + 3)
//                 .map((review, index) => (
//                   <div
//                     key={index}
//                     className={`relative group transition-all duration-1000 ${reviewsVisible
//                         ? "opacity-100 translate-y-0"
//                         : "opacity-0 translate-y-20"
//                       }`}
//                     style={{ transitionDelay: `${index * 100}ms` }}
//                     onMouseEnter={() =>
//                       setActiveReview(currentReviewIndex + index)
//                     }
//                     onMouseLeave={() => setActiveReview(null)}
//                   >
//                     <div
//                       className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-200 transition-all duration-500 cursor-pointer h-full ${activeReview === currentReviewIndex + index
//                           ? "scale-105 shadow-2xl"
//                           : ""
//                         }`}
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
//                           <p className="text-sm text-blue-600 font-semibold">
//                             {review.specialty}
//                           </p>
//                           <p className="text-xs text-gray-500 blur-sm">
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
//                         className={`absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center transition-all duration-500 ${activeReview === currentReviewIndex + index
//                             ? "opacity-95"
//                             : "opacity-0 pointer-events-none"
//                           }`}
//                       >
//                         <div className="text-center text-white p-8">
//                           <CheckCircle className="w-16 h-16 mx-auto mb-4" />
//                           <p className="font-bold text-xl mb-2">
//                             Success Story
//                           </p>
//                           <p className="text-blue-100 leading-relaxed">
//                             "{review.detailedReview}"
//                           </p>
//                           <div className="mt-4 text-blue-200 font-semibold">
//                             Thank You Believers Consultancy ❤️
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <div className="text-center mt-12">
//               <button className="inline-flex items-center text-blue-300 hover:text-blue-700 font-semibold text-lg transition-colors">
//                 <span>View all testimonials</span>
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-14 bg-white">
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
//                     className={`w-6 h-6 text-gray-500 transition-transform flex-shrink-0 ${activeFAQ === index ? "rotate-180" : ""
//                       }`}
//                   />
//                 </button>
//                 <div
//                   className={`px-8 bg-gray-50 transition-all duration-300 overflow-hidden ${activeFAQ === index
//                       ? "py-6 opacity-100"
//                       : "py-0 opacity-0 max-h-0"
//                     }`}
//                 >
//                   <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Take Control Today */}
//       <section className="py-12 bg-gradient-to-br from-blue-500 to-indigo-100 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Take Control Today
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//             Stop guessing. Start planning with clarity and confidence.
//             Everything is FREE!
//           </p>
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-gradient-to-r from-blue-300 to-indigo-600 hover:from-blue-300 hover:to-indigo-800 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl mb-8">
//             <span>Get started - FREE Access</span>
//             <ArrowRight className="w-6 h-6" />
//           </button>

//           {/* WhatsApp Support Widget */}
//           <AiSensyWidget widgetId="aaa5qq" />

//         </div>
//       </section>

//       {/* Footer */}
//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="col-span-1 md:col-span-1">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-auto h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
//                   <img
//                     src="/media/logo4.png"
//                     alt="BD Logo"
//                     className="w-auto h-16 object-contain"
//                   />
//                 </div>
//               </div>
//               {/* 👇 NEW LINE: Small, Bold Attribution */}
//   <p className="text-xs font-bold text-gray-400 mb-4">
//     Designed & Managed By: Believers Destination Pvt Ltd
//   </p>
//               <p className="text-gray-400 mb-4 leading-relaxed">
//                 Your ultimate guide to counselling. 100% free
//                 access to all resources and expert guidance.
//               </p>

//               {/* Social Media Links */}
//               <div className="mb-4">
//                 <h4 className="font-semibold text-white mb-3">Follow Us</h4>
//                 <div className="flex space-x-3">
//                   <a
//                     href="https://www.youtube.com/@BelieversConsultancy"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-800 hover:bg-red-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group"
//                     aria-label="Visit our YouTube channel"
//                   >
//                     <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
//                   </a>
//                   <a
//                     href="https://www.instagram.com/believers.medcounselling"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group"
//                     aria-label="Visit our Instagram page"
//                   >
//                     <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">QUICK LINKS</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     onClick={() => navigate("/announcements")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     News
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/support")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
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
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     NEET PG
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     NEET UG (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     INICET (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     DNB PDCET (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     NEET SS (Coming Soon)
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">LEGAL</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     onClick={() => navigate("/privacy")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/terms")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     Terms & Conditions
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
//             <p>
//               &copy; 2026 Believers Destination Pvt Ltd. All rights reserved. | Empowering
//               students with free counselling guidance.
//             </p>
//              <p className="text-xs font-bold text-gray-400 mb-4">
//               Designed & Managed By: Believers Destination Pvt Ltd
//             </p>
//           </div> */}
//           <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
//   <p>
//     &copy; 2026 Believers Destination Pvt Ltd. All rights reserved. | Empowering
//     students with free counselling guidance.
//   </p>
//   <p className="text-xs mb-4">
//     <span className="font-bold text-gray-300">Designed & Managed By:</span>{' '}
//     <a 
//       href="https://www.believersdestination.com" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="font-semibold text-blue-400 hover:text-blue-300 underline"
//     >
//       Believers Destination Pvt Ltd
//     </a>
//   </p>
// </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Homepage;



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
//   Youtube,
//   Instagram,
//   Sparkles,
// } from "lucide-react";

// function Homepage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeReview, setActiveReview] = useState(null);
//   const [activeFAQ, setActiveFAQ] = useState(null);
//   const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [dashboardVisible, setDashboardVisible] = useState(false);
//   const [chaosVisible, setChaosVisible] = useState(false);
//   const [featuresVisible, setFeaturesVisible] = useState(false);
//   const [reviewsVisible, setReviewsVisible] = useState(false);

//   const heroRef = useRef(null);
//   const dashboardRef = useRef(null);
//   const chaosRef = useRef(null);
//   const featuresRef = useRef(null);
//   const reviewsRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: "0px 0px -50px 0px",
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
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-red-100 to-red-200",
//     },
//     {
//       title: "The Rules Vary. A Lot.",
//       description:
//         "Every state/counselling/quota has its own rules, fees, and eligibility, and they change every round.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-blue-100 to-blue-200",
//     },
//     {
//       title: "Decoding Quotas & Options",
//       description:
//         "All India Quota, State Quota, Deemed, Private, MBBS or BDS? Each path affects your fees, choices and future.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-purple-100 to-purple-200",
//     },
//     {
//       title: "Which College? Which Seat?",
//       description:
//         "160,000+ seats. 1000+ colleges. You need to find the ones that fit your rank, budget, and goals.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-green-100 to-green-200",
//     },
//     {
//       title: "Myths, PDFs and WhatsApp Advice",
//       description:
//         "From Telegram tips to WhatsApp groups, everyone has unreliable opinions while official data is scattered and hard to decode.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-yellow-100 to-yellow-200",
//     },
//     {
//       title: "Make confident choices",
//       description:
//         "A single mistake in your choice list can set you back. You're expected to make confident decisions on the 1st try.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607893/file/487dd57b87ebd1b5e137edfea43df826.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
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
//       title: "Multi Rank-Predictors ",
//       description:
//         "Should you upgrade? Will you loose your seat? Is it worth the penalty?",
//       color: "border-purple-300 bg-purple-50",
//       textColor: "text-purple-800",
//       icon: <Award className="w-8 h-8 text-purple-600" />,
//       highlight: "Multi Rank-Predictors",
//     },
//     {
//       title: "Webinars & Live Doubt Sessions",
//       description:
//         "Get expert strategies and answers — tailored for each counselling and round.",
//       color: "border-cyan-300 bg-cyan-50",
//       textColor: "text-cyan-800",
//       icon: <BookOpen className="w-8 h-8 text-cyan-600" />,
//       highlight: "Webinars & Video Guides",
//     },
//     {
//       title: "Advanced tools",
//       description: "Know every seat, every movement, who got admitted where.",
//       color: "border-teal-300 bg-teal-50",
//       textColor: "text-teal-800",
//       icon: <Search className="w-8 h-8 text-teal-600" />,
//       highlight: "Advanced tools",
//     },
//     {
//       title: "INICET Live Results 2026",
//       description: "Check ranks, cutoffs, seat matrix, and counselling schedule for INICET Jan 2026. Get institute-wise data.",
//       color: "border-emerald-300 bg-emerald-50",
//       textColor: "text-emerald-800",
//       icon: <Award className="w-8 h-8 text-emerald-600" />,
//       highlight: "INICET Results Live",
//     }
//   ];

//   const reviews = [
//     {
//       name: "Dr. Priya ",
//       role: "NEET UG 2026 - AIIMS Delhi",
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
//       name: "Dr. Mandeep ",
//       role: "MD Gynaecology Resident",
//       specialty: "NEET PG 2024",
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
//       name: "Dr. Nivetha ",
//       role: "UG Microbiology",
//       specialty: "NEET UG 2024",
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
//       name: "Madhu ",
//       role: "PG Ophthalmology",
//       specialty: "NEET UG 2024",
//       location: "Mumbai",
//       rating: 5,
//       review: "Thank You Believers Consultancy ❤️",
//       detailedReview:
//         "The guidance and support provided throughout the counselling process was exceptional. My daughter secured her dream seat with Believers Consultancy guidance.",
//       image:
//         "https://cdn.dribbble.com/userupload/44669412/file/db5d084e82ca6d9c9fa70ae37cb9cf63.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//     {
//       name: "Dr. Falit ",
//       role: "UG Ophthalmology",
//       specialty: "NEET UG 2024",
//       location: "Government Medical College",
//       rating: 5,
//       review:
//         "Believers Consultancy made my NEET counselling journey smooth and stress-free.",
//       detailedReview:
//         "The comprehensive data analysis and expert guidance helped me make informed decisions. Highly recommend to all NEET aspirants.",
//       image:
//         "https://cdn.dribble.com/userupload/44669411/file/7a4de58473bddb2b24be4f79965fe29e.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//   ];

//   const faqs = [
//     {
//       question:
//         "What is Believers Consultancy?",
//       answer:
//         "Believers Consultancy is a dedicated counselling service provider specializing in free guidance for NEET UG and PG aspirants. Our mission is to help medical entrance exam qualified students navigate the complex counselling process and secure admission in their preferred medical colleges across India. ",
//     },
//     {
//       question: "Why do you provide free counselling services?",
//       answer:
//         "Our data is sourced directly from official counselling authorities and updated in real-time. We maintain 99%+ accuracy and cross-verify all information through multiple official channels.",
//     },
//     {
//       question: "Is this completely free? Are there any hidden charges?",
//       answer:
//         "Absolutely! Believers Consultancy is 100% free. Just create an account and access all features, tools, and resources without any payment or subscription required. No hidden charges, no premium plans - everything is FREE!",
//     },
//     {
//       question: "Who conducts NEET UG counselling?",
//       answer:
//         "NEET UG counselling is conducted at two levels: Central Level: Medical Counselling Committee (MCC) conducts counselling for 15% All India Quota (AIQ) seats and 100% seats in deemed/central universities. State Level: Individual state authorities conduct counselling for 85% state quota seats",
//     },
//     {
//       question:
//         "How is Believers Consultancy useful if I've already started counselling?",
//       answer:
//         "Even mid-counselling, our tools help you make better choices in subsequent rounds, understand upgrade possibilities, calculate financial implications, and avoid common mistakes that could cost you your preferred seat.",
//     },
//     {
//       question: "How many rounds of NEET UG counselling are there?",
//       answer:
//         "NEET UG counselling typically consists of (Round 1/Round 2/Round 3/Mop-up Round/Stray Vacancy Round (if required)), Each round provides opportunities for seat allotment and upgradation.",
//     },
//     {
//       question: "Can I participate in both AIQ and State Quota counselling?",
//       answer:
//         "Yes, eligible candidates can participate in both AIQ and State Quota counselling simultaneously. However, you need to register separately for each counselling process.",
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

//   // Christmas ornament component
//   const ChristmasOrnament = ({ delay = 0, left = "10%" }) => (
//     <div 
//       className="absolute animate-swing"
//       style={{
//         left,
//         top: '-20px',
//         animationDelay: `${delay}s`,
//         animationDuration: '3s'
//       }}
//     >
//       <div className="w-3 h-8 bg-gradient-to-b from-amber-600 to-transparent opacity-60"></div>
//       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg border-2 border-amber-200"></div>
//     </div>
//   );

//   const Snowflake = ({ delay = 0, left = "10%", duration = 10 }) => (
//     <div
//       className="absolute animate-fall opacity-70"
//       style={{
//         left,
//         top: '-20px',
//         animationDelay: `${delay}s`,
//         animationDuration: `${duration}s`
//       }}
//     >
//       <Star className="w-4 h-4 text-blue-200 fill-blue-100" />
//     </div>
//   );

//   const ChristmasTree = ({ className = "" }) => (
//     <div className={`relative ${className}`}>
//       <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-green-600 mx-auto"></div>
//       <div className="w-0 h-0 border-l-[35px] border-r-[35px] border-b-[60px] border-l-transparent border-r-transparent border-b-green-700 mx-auto -mt-8"></div>
//       <div className="w-3 h-8 bg-amber-800 mx-auto"></div>
//       <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 absolute -top-2 left-1/2 transform -translate-x-1/2 animate-twinkle" />
//     </div>
//   );

//   const GiftBox = ({ className = "" }) => (
//     <div className={`relative ${className} animate-float`}>
//       <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-lg"></div>
//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-gradient-to-b from-amber-300 to-amber-500"></div>
//       <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-2 bg-gradient-to-r from-amber-300 to-amber-500"></div>
//       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 border-2 border-amber-400 rounded-full bg-amber-200"></div>
//     </div>
//   );

//   const ChristmasLights = () => (
//     <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden opacity-60">
//       <div className="christmas-lights h-full"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       <style>{`
//         @keyframes swing {
//           0%, 100% { transform: rotate(-5deg); }
//           50% { transform: rotate(5deg); }
//         }
//         @keyframes fall {
//           0% { transform: translateY(0) rotate(0deg); opacity: 0; }
//           10% { opacity: 0.7; }
//           90% { opacity: 0.7; }
//           100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
//         }
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
//           50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6); }
//         }
//         @keyframes slideIn {
//           from { transform: translateX(-100%); }
//           to { transform: translateX(100%); }
//         }
//         .animate-swing {
//           animation: swing 3s ease-in-out infinite;
//         }
//         .animate-fall {
//           animation: fall linear infinite;
//         }
//         .animate-twinkle {
//           animation: twinkle 2s ease-in-out infinite;
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-glow {
//           animation: glow 2s ease-in-out infinite;
//         }
//         .christmas-lights {
//           background: linear-gradient(90deg, 
//             transparent 0%, 
//             rgba(255, 0, 0, 0.8) 10%, 
//             transparent 20%,
//             rgba(0, 255, 0, 0.8) 30%,
//             transparent 40%,
//             rgba(255, 215, 0, 0.8) 50%,
//             transparent 60%,
//             rgba(0, 0, 255, 0.8) 70%,
//             transparent 80%,
//             rgba(255, 0, 0, 0.8) 90%,
//             transparent 100%
//           );
//           animation: slideIn 3s linear infinite;
//         }
//       `}</style>

//       {/* Navigation */}
//       <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
//         {/* Christmas Lights at top of navbar */}
//         <ChristmasLights />
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <div className="flex items-center">
//                 <img
//                   src="/media/logo4.png"
//                   alt="BD Logo"
//                   className="h-16 w-auto object-contain"
//                 />
//               </div>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8 ml-auto">
//               <div className="flex items-center space-x-8">
//                 <a
//                   onClick={() => navigate("/inicetdashboard")}
//                   className="text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-full transition-all duration-300 font-bold relative group cursor-pointer"
//                 >
//                   🎉 INICET Results Out!
//                   <span className="absolute -top-1 -right-1 flex h-3 w-3">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//                   </span>
//                 </a>
//                 <a
//                   onClick={() => navigate("/blog")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
//                 >
//                   Blog
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   onClick={() => navigate("/announcements")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
//                 >
//                   News
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   href="#careers"
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
//                 >
//                   Careers
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   onClick={() => navigate("/support")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
//                 >
//                   Contact Us
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//               </div>

//               <div className="flex items-left space-x-4">
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg mr-[5px]"
//                 >
//                   Log-In | Sign-Up
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2"
//             >
//               {isMenuOpen ? (
//                 <X className="md:hidden w-6 h-6 text-black" />
//               ) : (
//                 <Menu className="md:hidden w-6 h-6 text-black" />
//               )}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
//               <div className="px-2 pt-2 pb-3 space-y-1">
//                 <a
//                   onClick={() => {
//                     navigate("/inicetdashboard");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-3 text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-300 font-bold text-center cursor-pointer shadow-lg mb-2 animate-pulse"
//                 >
//                   🎉 INICET Results Out! Check Now
//                 </a>
//                 <a
//                   onClick={() => {
//                     navigate("/blog");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Blog
//                 </a>
//                 <a
//                   onClick={() => {
//                     navigate("/announcements");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   News
//                 </a>
//                 <a
//                   onClick={() => {
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Careers
//                 </a>
//                 <a
//                   onClick={() => {
//                     navigate("/support");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Contact Us
//                 </a>
//                 <div className="pt-2">
//                   <button
//                     onClick={() => {
//                       navigate("/login");
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
//                   >
//                     Log-In | Sign-Up
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section - WITH CHRISTMAS ELEMENTS */}
//       <section
//         ref={heroRef}
//         className="pt-24 mr-2 bg-gradient-to-b from-red-50/30 via-white to-green-50/20 relative overflow-hidden"
//       >
//         {/* Elegant Christmas Decorations */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {/* Snowflakes */}
//           {[...Array(20)].map((_, i) => (
//             <Snowflake 
//               key={i} 
//               delay={i * 0.8} 
//               left={`${Math.random() * 100}%`}
//               duration={8 + Math.random() * 4}
//             />
//           ))}
          
//           {/* Ornaments at top */}
//           <div className="hidden md:block">
//             <ChristmasOrnament delay={0} left="15%" />
//             <ChristmasOrnament delay={0.5} left="35%" />
//             <ChristmasOrnament delay={1} left="55%" />
//             <ChristmasOrnament delay={1.5} left="75%" />
//             <ChristmasOrnament delay={2} left="85%" />
//           </div>

//           {/* Subtle sparkles */}
//           <div className="absolute top-20 right-20 animate-pulse">
//             <Sparkles className="w-8 h-8 text-amber-400 opacity-60" />
//           </div>
//           <div className="absolute top-40 left-20 animate-pulse" style={{ animationDelay: '1s' }}>
//             <Sparkles className="w-6 h-6 text-red-400 opacity-50" />
//           </div>
//           <div className="absolute bottom-40 right-40 animate-pulse" style={{ animationDelay: '2s' }}>
//             <Sparkles className="w-7 h-7 text-green-400 opacity-50" />
//           </div>
          
//           {/* Decorative Christmas trees in corners */}
//           <div className="hidden lg:block">
//             <ChristmasTree className="absolute top-10 left-10 opacity-30" />
//             <ChristmasTree className="absolute top-10 right-10 opacity-30" />
//           </div>
          
//           {/* Floating gift boxes */}
//           <GiftBox className="absolute top-32 left-1/4 opacity-20" />
//           <GiftBox className="absolute bottom-32 right-1/4 opacity-20" style={{ animationDelay: '1s' }} />
          
//           {/* Twinkling stars */}
//           {[...Array(8)].map((_, i) => (
//             <Star 
//               key={i}
//               className="absolute w-4 h-4 text-yellow-300 fill-yellow-200 opacity-40 animate-twinkle"
//               style={{
//                 left: `${10 + Math.random() * 80}%`,
//                 top: `${10 + Math.random() * 80}%`,
//                 animationDelay: `${i * 0.3}s`
//               }}
//             />
//           ))}
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-12">
//             {/* Christmas Greeting Banner */}
//             <div className={`mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
//               <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/10 via-green-500/10 to-red-500/10 border-2 border-red-200 px-8 py-3 rounded-full backdrop-blur-sm">
//                 <span className="text-2xl animate-bounce">🎄</span>
//                 <span className="text-lg font-semibold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
//                   Season's Greetings from Believers Consultancy
//                 </span>
//                 <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
//               </div>
//             </div>

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
//                 isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//               } flex justify-center items-center gap-3`}
//             >
//               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">NEET</span>
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
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-6">
//               <button
//                 onClick={() => navigate("/signup")}
//                 className={`w-full sm:w-auto bg-gradient-to-r from-blue-300 to-indigo-600 hover:from-blue-300 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl ${
//                   isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-10"
//                 } transition-all duration-700 delay-400`}
//               >
//                 <span>Get started</span>
//                 <ArrowRight className="w-6 h-6" />
//               </button>

//               <button
//                 onClick={() => navigate("/inicetdashboard")}
//                 className={`w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse relative ${
//                   isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-10"
//                 } transition-all duration-700 delay-400`}
//               >
//                 <Award className="w-6 h-6" />
//                 <span>INICET Results - Check Now!</span>
//                 <span className="absolute -top-1 -right-1 flex h-4 w-4">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Dashboard Preview */}
//       <section
//         ref={dashboardRef}
//         className="relative py-8 overflow-hidden"
//       >
//         {/* Christmas decorations for this section */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {/* Corner decorations */}
//           <div className="absolute top-4 left-4 opacity-20">
//             <GiftBox />
//           </div>
//           <div className="absolute top-4 right-4 opacity-20">
//             <ChristmasTree />
//           </div>
          
//           {/* Subtle snowflakes */}
//           {[...Array(6)].map((_, i) => (
//             <Snowflake 
//               key={i} 
//               delay={i * 1.5} 
//               left={`${Math.random() * 100}%`}
//               duration={15 + Math.random() * 5}
//             />
//           ))}
//         </div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`relative transition-all duration-500 ${
//               dashboardVisible
//                 ? "opacity-100 translate-y-0 scale-100"
//                 : "opacity-70 translate-y-10 scale-95"
//             }`}
//           >
//             <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-200 relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-[40px]"></div>
//               <div className="relative p-6">
//                 <img
//                   src="https://cdn.dribbble.com/userupload/44858014/file/56d53c676b68c4180cdc94fbeba54656.png?auto=compress&cs=tinysrgb&w=1424&h=600&fit=crop"
//                   alt="Believers Consultancy Dashboard Preview"
//                   className="w-full h-auto rounded-[30px] shadow-lg hidden md:block"
//                   style={{ aspectRatio: "16/10" }}
//                   loading="eager"
//                 />
//                 <img
//                   src="https://cdn.dribbble.com/userupload/44656684/file/cec64a8083e87908509e53b8db9b4121.png?auto=compress&cs=tinysrgb&w=600&h=1200&fit=crop"
//                   alt="Believers Consultancy Dashboard Preview"
//                   className="w-full h-auto rounded-[30px] shadow-lg md:hidden"
//                   style={{ aspectRatio: "9/16" }}
//                   loading="eager"
//                 />
//                 <div className="absolute inset-6 bg-gradient-to-t from-black/20 to-transparent rounded-[30px] pointer-events-none"></div>
//                 <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
//                   <h3 className="text-2xl md:text-3xl font-bold mb-2">
//                     Believers Consultancy Dashboard
//                   </h3>
//                   <p className="text-lg md:text-xl opacity-90">
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
//         className="py-16 bg-gray-50 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div
//             className={`text-center mb-16 transition-all duration-500 ${
//               chaosVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//             }`}
//           >
//             <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//               Welcome to the Counselling Chaos.
//             </h2>
//             <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               To get the best seat, here's everything you're expected to figure
//               out on your own:
//             </p>
//           </div>

//           <div className="space-y-16">
//             {chaosReasons.map((reason, index) => (
//               <div
//                 key={index}
//                 className={`flex flex-col ${
//                   index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
//                 } items-center gap-8 lg:gap-16 transition-all duration-700 ${
//                   chaosVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-20"
//                 }`}
//                 style={{ transitionDelay: `${index * 150}ms` }}
//               >
//                 <div className="flex-1 relative group">
//                   <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
//                     <img
//                       src={reason.desktopImage}
//                       alt={reason.title}
//                       className="w-full h-80 object-cover hidden md:block"
//                       loading="lazy"
//                     />
//                     <img
//                       src={reason.mobileImage}
//                       alt={reason.title}
//                       className="w-full h-60 object-cover md:hidden"
//                       loading="lazy"
//                     />
//                     <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} mix-blend-multiply opacity-40`}></div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                     <div className="absolute bottom-6 left-6 right-6 text-white">
//                       <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full mb-4 flex items-center justify-center shadow-lg">
//                         <span className="text-gray-800 font-bold text-xl">
//                           {index + 1}
//                         </span>
//                       </div>
//                       <p className="text-white/90 font-medium text-sm">
//                         Challenge #{index + 1}
//                       </p>
//                       <p className="text-white font-bold text-lg">
//                         {reason.title}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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

//       {/* Say Hello Section - WITH CHRISTMAS ELEMENTS */}
//       <section
//         ref={featuresRef}
//         className="py-10 bg-gradient-to-b from-white via-red-50/20 to-green-50/20 relative overflow-hidden"
//       >
//         {/* Christmas decorative elements */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {/* Subtle snowflakes */}
//           {[...Array(8)].map((_, i) => (
//             <Snowflake 
//               key={i} 
//               delay={i * 1.2} 
//               left={`${Math.random() * 100}%`}
//               duration={10 + Math.random() * 5}
//             />
//           ))}
          
//           {/* Corner sparkles */}
//           <div className="absolute top-10 left-10 animate-pulse">
//             <Star className="w-6 h-6 text-amber-300 fill-amber-200 opacity-40" />
//           </div>
//           <div className="absolute top-10 right-10 animate-pulse" style={{ animationDelay: '1s' }}>
//             <Star className="w-6 h-6 text-red-300 fill-red-200 opacity-40" />
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div
//             className={`text-center mb-16 transition-all duration-1000 ${
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
//                 className={`${feature.color} rounded-3xl p-8 border-2 hover:scale-105 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl relative overflow-hidden ${
//                   featuresVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-20"
//                 }`}
//                 style={{ transitionDelay: `${index * 50}ms` }}
//               >
//                 {/* Christmas ribbon accent */}
//                 <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
//                   <div className="absolute top-4 -right-8 w-24 h-8 bg-gradient-to-r from-red-500 to-red-600 transform rotate-45 shadow-lg"></div>
//                   <div className="absolute top-4 -right-8 w-24 h-8 bg-gradient-to-r from-green-500 to-green-600 transform rotate-45 shadow-lg" style={{ marginTop: '4px' }}></div>
//                 </div>
                
//                 <div className="mb-6 transform group-hover:scale-110 transition-transform duration-200 relative">
//                   {feature.icon}
//                   <Sparkles className="w-4 h-4 text-amber-400 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
//       <section className="py-10 bg-gray-50 relative overflow-hidden">
//         {/* Christmas elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           {/* Decorative elements */}
//           <div className="absolute top-10 left-10 opacity-10">
//             <ChristmasTree />
//           </div>
//           <div className="absolute bottom-10 right-10 opacity-10">
//             <ChristmasTree />
//           </div>
          
//           {/* Floating gifts */}
//           <GiftBox className="absolute top-1/4 right-20 opacity-10" />
//           <GiftBox className="absolute bottom-1/4 left-20 opacity-10" style={{ animationDelay: '1.5s' }} />
          
//           {/* Twinkling stars */}
//           {[...Array(6)].map((_, i) => (
//             <Star 
//               key={i}
//               className="absolute w-3 h-3 text-amber-300 fill-amber-200 opacity-20 animate-twinkle"
//               style={{
//                 left: `${15 + Math.random() * 70}%`,
//                 top: `${15 + Math.random() * 70}%`,
//                 animationDelay: `${i * 0.4}s`
//               }}
//             />
//           ))}
//         </div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
//               <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:text-green-900 hover:scale-110">
//                 <Phone className="w-5 h-5 mr-2" />
//                 <a
//                   href="https://wa.me/919211724969?text=Hi%20I%20want%20to%20talk%20to%20an%20expert"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="font-semibold text-green-700"
//                 >
//                   Chat with an Expert on WhatsApp
//                 </a>
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
//                   We're Here for You
//                 </h3>
//                 <p className="text-yellow-700">
//                   Available daily from 10 AM to 7 PM (Sunday Closed).
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section ref={reviewsRef} className="py-14 bg-white relative overflow-hidden">
//         {/* Festive background elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           {/* Snowflakes */}
//           {[...Array(10)].map((_, i) => (
//             <Snowflake 
//               key={i} 
//               delay={i * 1.3} 
//               left={`${Math.random() * 100}%`}
//               duration={18 + Math.random() * 5}
//             />
//           ))}
          
//           {/* Decorative ornaments */}
//           <div className="hidden md:block">
//             <div className="absolute top-10 left-1/4">
//               <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 opacity-20 animate-swing"></div>
//             </div>
//             <div className="absolute top-20 right-1/4">
//               <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-20 animate-swing" style={{ animationDelay: '0.5s' }}></div>
//             </div>
//           </div>
          
//           {/* Stars */}
//           {[...Array(5)].map((_, i) => (
//             <Star 
//               key={i}
//               className="absolute w-4 h-4 text-yellow-300 fill-yellow-200 opacity-30 animate-twinkle"
//               style={{
//                 left: `${20 + Math.random() * 60}%`,
//                 top: `${20 + Math.random() * 60}%`,
//                 animationDelay: `${i * 0.5}s`
//               }}
//             />
//           ))}
//         </div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
//                 <ChevronLeft className="w-6 h-6 text-black" />
//               </button>
//               <button
//                 onClick={nextReview}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 <ChevronRight className="w-6 h-6 text-black" />
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
//                           <p className="text-sm text-blue-600 font-semibold">
//                             {review.specialty}
//                           </p>
//                           <p className="text-xs text-gray-500 blur-sm">
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

//                       <div
//                         className={`absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center transition-all duration-500 ${
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
//                           <p className="text-blue-100 leading-relaxed">
//                             "{review.detailedReview}"
//                           </p>
//                           <div className="mt-4 text-blue-200 font-semibold">
//                             Thank You Believers Consultancy ❤️
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <div className="text-center mt-12">
//               <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors">
//                 <span>View all testimonials</span>
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-14 bg-white relative overflow-hidden">
//         {/* Christmas decorations */}
//         <div className="absolute inset-0 pointer-events-none">
//           {/* Corner trees */}
//           <div className="absolute top-10 left-10 opacity-15 hidden lg:block">
//             <ChristmasTree />
//           </div>
//           <div className="absolute bottom-10 right-10 opacity-15 hidden lg:block">
//             <ChristmasTree />
//           </div>
          
//           {/* Gift boxes */}
//           <GiftBox className="absolute top-1/3 right-10 opacity-10" />
//           <GiftBox className="absolute bottom-1/3 left-10 opacity-10" style={{ animationDelay: '1s' }} />
          
//           {/* Snowflakes */}
//           {[...Array(8)].map((_, i) => (
//             <Snowflake 
//               key={i} 
//               delay={i * 1.8} 
//               left={`${Math.random() * 100}%`}
//               duration={20 + Math.random() * 5}
//             />
//           ))}
//         </div>
        
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
//       </section>

//       {/* Take Control Today - WITH CHRISTMAS ELEMENTS */}
//       <section className="py-12 bg-gradient-to-br from-red-500/10 via-white to-green-500/10 relative overflow-hidden">
//         {/* Festive background elements */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {/* Golden sparkles */}
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`
//               }}
//             >
//               <Star className="w-3 h-3 text-amber-400 fill-amber-300 opacity-60" />
//             </div>
//           ))}
          
//           {/* Falling snowflakes */}
//           {[...Array(10)].map((_, i) => (
//             <Snowflake 
//               key={i} 
//               delay={i * 0.9} 
//               left={`${Math.random() * 100}%`}
//               duration={12 + Math.random() * 4}
//             />
//           ))}
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           {/* Holiday Gift Badge */}
//           <div className="mb-6 inline-flex items-center gap-3 bg-gradient-to-r from-red-100 via-white to-green-100 border-2 border-amber-300 px-8 py-3 rounded-full backdrop-blur-sm shadow-lg">
//             <span className="text-2xl">🎁</span>
//             <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
//               Our Holiday Gift to You: 100% Free Access!
//             </span>
//             <span className="text-2xl">🎁</span>
//           </div>

//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Take Control Today
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//             Stop guessing. Start planning with clarity and confidence.
//             Everything is FREE!
//           </p>
          
//           <button
//             onClick={() => navigate("/login")}
//             className="relative bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl mb-8 group overflow-hidden"
//           >
//             {/* Shimmer effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            
//             <Sparkles className="w-6 h-6 relative z-10" />
//             <span className="relative z-10">Get started - FREE Access</span>
//             <ArrowRight className="w-6 h-6 relative z-10" />
//           </button>

//           {/* Festive message */}
//           <p className="text-sm text-gray-500 italic">
//             ✨ Wishing you success in your medical journey this holiday season! ✨
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
//         {/* Christmas footer decorations */}
//         <div className="absolute inset-0 pointer-events-none opacity-20">
//           {/* Snowflakes */}
//           {[...Array(15)].map((_, i) => (
//             <Snowflake 
//               key={i} 
//               delay={i * 0.9} 
//               left={`${Math.random() * 100}%`}
//               duration={15 + Math.random() * 5}
//             />
//           ))}
          
//           {/* Decorative elements */}
//           <div className="absolute top-10 left-10">
//             <Star className="w-8 h-8 text-yellow-400 fill-yellow-300 animate-twinkle" />
//           </div>
//           <div className="absolute top-10 right-10">
//             <Star className="w-8 h-8 text-yellow-400 fill-yellow-300 animate-twinkle" style={{ animationDelay: '0.5s' }} />
//           </div>
//           <div className="absolute bottom-10 left-1/4">
//             <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
//           </div>
//           <div className="absolute bottom-10 right-1/4">
//             <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" style={{ animationDelay: '1s' }} />
//           </div>
//         </div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="col-span-1 md:col-span-1">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-auto h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
//                   <img
//                     src="/media/logo4.png"
//                     alt="BD Logo"
//                     className="w-auto h-16 object-contain"
//                   />
//                 </div>
//               </div>
//               <p className="text-xs font-bold text-gray-400 mb-4">
//                 Designed & Managed By: Believers Destination Pvt Ltd
//               </p>
//               <p className="text-gray-400 mb-4 leading-relaxed">
//                 Your ultimate guide to counselling. 100% free
//                 access to all resources and expert guidance.
//               </p>

//               <div className="mb-4">
//                 <h4 className="font-semibold text-white mb-3">Follow Us</h4>
//                 <div className="flex space-x-3">
//                   <a
//                     href="https://www.youtube.com/@BelieversConsultancy"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-800 hover:bg-red-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group"
//                     aria-label="Visit our YouTube channel"
//                   >
//                     <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
//                   </a>
//                   <a
//                     href="https://www.instagram.com/believers.medcounselling"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group"
//                     aria-label="Visit our Instagram page"
//                   >
//                     <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">QUICK LINKS</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     onClick={() => navigate("/announcements")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     News
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/support")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
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
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     NEET PG
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     NEET UG (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     INICET (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     DNB PDCET (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     NEET SS (Coming Soon)
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">LEGAL</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     onClick={() => navigate("/privacy")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/terms")}
//                     className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
//                   >
//                     Terms & Conditions
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
//             <p>
//               &copy; 2026 Believers Destination Pvt Ltd. All rights reserved. | Empowering
//               students with free counselling guidance.
//             </p>
//             <p className="text-xs mb-4 mt-2">
//               <span className="font-bold text-gray-300">Designed & Managed By:</span>{' '}
//               <a 
//                 href="https://www.believersdestination.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="font-semibold text-blue-400 hover:text-blue-300 underline"
//               >
//                 Believers Destination Pvt Ltd
//               </a>
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Homepage;

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
//   CheckCircle,
//   Phone,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Youtube,
//   Instagram,
//   Sparkles,
// } from "lucide-react";

// // New Year Confetti Component
// const NewYearConfetti = () => {
//   const colors = ['#FFD700', '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181'];
  
//   return (
//     <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
//       {[...Array(30)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute animate-fall"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `-${Math.random() * 20}%`,
//             animationDelay: `${Math.random() * 5}s`,
//             animationDuration: `${5 + Math.random() * 10}s`,
//           }}
//         >
//           <div
//             className="w-2 h-2 rounded-full"
//             style={{
//               backgroundColor: colors[Math.floor(Math.random() * colors.length)],
//               transform: `rotate(${Math.random() * 360}deg)`,
//             }}
//           />
//         </div>
//       ))}
//       <style jsx>{`
//         @keyframes fall {
//           to {
//             transform: translateY(100vh) rotate(360deg);
//             opacity: 0;
//           }
//         }
//         .animate-fall {
//           animation: fall linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// // New Year Badge Component
// const NewYearBadge = () => (
//   <div className="fixed top-20 right-4 z-40 animate-bounce">
//     <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm">
//       <Sparkles className="w-4 h-4 animate-spin" />
//       <span>Happy New Year 2026! 🎉</span>
//     </div>
//   </div>
// );

// function Homepage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeReview, setActiveReview] = useState(null);
//   const [activeFAQ, setActiveFAQ] = useState(null);
//   const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(true);

//   const heroRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => entries.forEach((entry) => setIsVisible(entry.isIntersecting)),
//       { threshold: 0.1 }
//     );
//     if (heroRef.current) observer.observe(heroRef.current);
    
//     // Hide confetti after 10 seconds
//     const timer = setTimeout(() => setShowConfetti(false), 10000);
    
//     return () => {
//       observer.disconnect();
//       clearTimeout(timer);
//     };
//   }, []);

//   const stats = [
//     { number: "15+", label: "Years of Experience" },
//     { number: "150k+", label: "Students Registered" },
//     { number: "2M+", label: "Candidates Served" },
//     { number: "750k+", label: "Queries Answered" },
//   ];

//   const features = [
//     {
//       title: "Cut-offs & Seat Matrix",
//       description: "Explore cut-offs across years & rounds to predict your best possible range of colleges.",
//       color: "border-green-300 bg-green-50",
//       textColor: "text-green-800",
//       icon: <BarChart3 className="w-8 h-8 text-green-600" />,
//     },
//     {
//       title: "Fee, Stipend & Bond",
//       description: "From course fees to hostel costs, we've got the numbers covered.",
//       color: "border-blue-300 bg-blue-50",
//       textColor: "text-blue-800",
//       icon: <Target className="w-8 h-8 text-blue-600" />,
//     },
//     {
//       title: "Multi Rank-Predictors",
//       description: "Should you upgrade? Will you lose your seat? Is it worth the penalty?",
//       color: "border-purple-300 bg-purple-50",
//       textColor: "text-purple-800",
//       icon: <Award className="w-8 h-8 text-purple-600" />,
//     },
//     {
//       title: "Webinars & Live Sessions",
//       description: "Get expert strategies and answers — tailored for each counselling round.",
//       color: "border-cyan-300 bg-cyan-50",
//       textColor: "text-cyan-800",
//       icon: <BookOpen className="w-8 h-8 text-cyan-600" />,
//     },
//     {
//       title: "Advanced Tools",
//       description: "Know every seat, every movement, who got admitted where.",
//       color: "border-teal-300 bg-teal-50",
//       textColor: "text-teal-800",
//       icon: <Search className="w-8 h-8 text-teal-600" />,
//     },
//     {
//       title: "INICET Live Results 2026",
//       description: "Check ranks, cutoffs, seat matrix, and counselling schedule for INICET Jan 2026.",
//       color: "border-emerald-300 bg-emerald-50",
//       textColor: "text-emerald-800",
//       icon: <Award className="w-8 h-8 text-emerald-600" />,
//     }
//   ];

//   const reviews = [
//     {
//       name: "Dr. Priya",
//       specialty: "MD Paediatrics Resident",
//       rating: 5,
//       review: "Believers Consultancy excels at providing instant notifications about counselling schedules and deadlines.",
//       image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150",
//     },
//     {
//       name: "Dr. Mandeep",
//       specialty: "MD Gynaecology Resident",
//       rating: 5,
//       review: "Makes analysing previous year cut-offs easy. You'll find what you need within a few clicks.",
//       image: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=150",
//     },
//     {
//       name: "Dr. Nivetha",
//       specialty: "UG Microbiology",
//       rating: 5,
//       review: "My son got admitted at K.S. Hegde Mangalore in Radio Diagnostic in the very first round.",
//       image: "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=150",
//     },
//   ];

//   const faqs = [
//     {
//       question: "What is Believers Consultancy?",
//       answer: "A dedicated counselling service provider specializing in free guidance for NEET UG and PG aspirants.",
//     },
//     {
//       question: "Is this completely free?",
//       answer: "Absolutely! 100% free. Just create an account and access all features without any payment.",
//     },
//     {
//       question: "How many rounds of NEET UG counselling are there?",
//       answer: "Typically consists of Round 1, Round 2, Round 3, Mop-up Round, and Stray Vacancy Round if required.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {showConfetti && <NewYearConfetti />}
//       <NewYearBadge />

//       {/* Navigation */}
//       <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <img src="/media/logo4.png" alt="Logo" className="h-16 w-auto object-contain" />
//             </div>

//             <div className="hidden md:flex items-center space-x-8">
//               <button
//                 onClick={() => navigate("/inicetdashboard")}
//                 className="text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-full font-bold relative"
//               >
//                 🎉 INICET Results Out!
//               </button>
//               {["Blog", "News", "Careers", "Contact Us"].map((item) => (
//                 <a
//                   key={item}
//                   onClick={() => navigate(`/${item.toLowerCase().replace(" ", "")}`)}
//                   className="text-gray-700 hover:text-blue-600 transition-all font-medium cursor-pointer"
//                 >
//                   {item}
//                 </a>
//               ))}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold"
//               >
//                 Log-In | Sign-Up
//               </button>
//             </div>

//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>

//           {isMenuOpen && (
//             <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
//               <div className="px-2 pt-2 pb-3 space-y-1">
//                 {["Blog", "News", "Careers", "Contact Us"].map((item) => (
//                   <a
//                     key={item}
//                     onClick={() => {
//                       navigate(`/${item.toLowerCase().replace(" ", "")}`);
//                       setIsMenuOpen(false);
//                     }}
//                     className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md cursor-pointer"
//                   >
//                     {item}
//                   </a>
//                 ))}
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="w-full bg-gradient-to-r from-blue-300 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold"
//                 >
//                   Log-In | Sign-Up
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section with New Year Theme */}
//       <section ref={heroRef} className="pt-24 pb-5 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-pink-200/20 to-purple-200/20"></div>
        
//         {/* Floating sparkles */}
//         <div className="absolute top-20 left-10 animate-pulse">
//           <Sparkles className="w-8 h-8 text-yellow-400" />
//         </div>
//         <div className="absolute top-40 right-20 animate-bounce">
//           <Sparkles className="w-6 h-6 text-pink-400" />
//         </div>
//         <div className="absolute bottom-40 left-1/4 animate-pulse">
//           <Sparkles className="w-10 h-10 text-purple-400" />
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-12">
//             <div className="inline-block mb-6 px-8 py-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full text-white font-bold text-lg animate-pulse shadow-2xl">
//               🎊 Welcome 2026 - New Year, New Opportunities! 🎊
//             </div>
            
//             <h1 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
//               Your Ultimate Guide to
//             </h1>
            
//             <div className={`text-4xl md:text-6xl font-bold mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
//               <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">NEET Counselling</span>
//             </div>

//             <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
//               Counselling dates, colleges, courses, fees, cut-offs, and beyond. Start 2026 with confidence! 🎯
//             </p>

//             <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold text-lg mb-6">
//               <CheckCircle className="w-5 h-5 mr-2" />
//               All resources are completely FREE!
//             </div>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="w-full sm:w-auto bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl"
//               >
//                 <Sparkles className="w-6 h-6" />
//                 <span>Start Your Journey 2026</span>
//                 <ArrowRight className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           {/* Stats with New Year glow */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-gradient-to-r from-yellow-400 to-pink-400"
//               >
//                 <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-gradient-to-b from-white to-purple-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
//               Say hello 👋 to Believers Consultancy
//             </h2>
//             <p className="text-xl text-gray-600">Make 2026 your year of success!</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`${feature.color} rounded-3xl p-8 border-2 hover:scale-105 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl`}
//               >
//                 <div className="mb-6">{feature.icon}</div>
//                 <h3 className={`text-xl font-bold ${feature.textColor} mb-4`}>{feature.title}</h3>
//                 <p className="text-gray-700">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories 2024</h2>
//             <p className="text-xl text-gray-600">Join them in making 2026 even better!</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {reviews.map((review, index) => (
//               <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all">
//                 <div className="flex items-center mb-6">
//                   <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full mr-4" />
//                   <div>
//                     <h4 className="font-bold text-gray-900">{review.name}</h4>
//                     <p className="text-sm text-blue-600">{review.specialty}</p>
//                   </div>
//                 </div>
//                 <div className="flex mb-4">
//                   {[...Array(review.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 italic">"{review.review}"</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="border-2 border-purple-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//                 <button
//                   className="w-full px-8 py-6 text-left bg-white hover:bg-purple-50 transition-colors flex justify-between items-center"
//                   onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
//                 >
//                   <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
//                   <ChevronDown className={`w-6 h-6 transition-transform ${activeFAQ === index ? "rotate-180" : ""}`} />
//                 </button>
//                 <div className={`px-8 bg-purple-50 transition-all duration-300 ${activeFAQ === index ? "py-6" : "py-0 max-h-0 overflow-hidden"}`}>
//                   <p className="text-gray-700">{faq.answer}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 relative overflow-hidden">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
//           <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Start 2026 Right!</h2>
//           <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
//             Don't let counselling confusion hold you back. Everything is FREE!
//           </p>
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-white text-purple-600 hover:bg-yellow-100 px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl"
//           >
//             <span>Get Started FREE</span>
//             <ArrowRight className="w-6 h-6" />
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <img src="/media/logo4.png" alt="Logo" className="h-16 mb-4" />
//               <p className="text-gray-400 mb-4">Your ultimate guide to counselling. 100% free.</p>
//               <div className="flex space-x-3">
//                 <a href="https://www.youtube.com/@BelieversConsultancy" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-red-600 rounded-lg p-3 transition-all">
//                   <Youtube className="w-5 h-5" />
//                 </a>
//                 <a href="https://www.instagram.com/believers.medcounselling" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-pink-600 rounded-lg p-3 transition-all">
//                   <Instagram className="w-5 h-5" />
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-gray-400">
//                 {["News", "Careers", "Contact Us"].map((item) => (
//                   <li key={item}>
//                     <a onClick={() => navigate(`/${item.toLowerCase().replace(" ", "")}`)} className="hover:text-white cursor-pointer">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-4">Exams</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a className="hover:text-white cursor-pointer">NEET PG</a></li>
//                 <li><a className="hover:text-white cursor-pointer">NEET UG (Coming Soon)</a></li>
//                 <li><a className="hover:text-white cursor-pointer">INICET</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-4">Legal</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a onClick={() => navigate("/privacy")} className="hover:text-white cursor-pointer">Privacy Policy</a></li>
//                 <li><a onClick={() => navigate("/terms")} className="hover:text-white cursor-pointer">Terms & Conditions</a></li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2026 Believers Destination Pvt Ltd. Happy New Year! 🎉</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Homepage;

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
//   Youtube,
//   Instagram,
//   Sparkles,
// } from "lucide-react";

// // Snowflake Component
// const Snowflake = ({ delay, duration, left }) => (
//   <div
//     className="absolute text-white opacity-70 pointer-events-none animate-fall"
//     style={{
//       left: `${left}%`,
//       animationDelay: `${delay}s`,
//       animationDuration: `${duration}s`,
//       fontSize: `${Math.random() * 10 + 10}px`,
//     }}
//   >
//     ❄
//   </div>
// );

// // Firework Component
// const Firework = ({ x, y, color }) => (
//   <div
//     className="absolute pointer-events-none"
//     style={{ left: `${x}%`, top: `${y}%` }}
//   >
//     {[...Array(8)].map((_, i) => (
//       <div
//         key={i}
//         className="absolute w-1 h-1 rounded-full animate-firework"
//         style={{
//           background: color,
//           transform: `rotate(${i * 45}deg)`,
//           animationDelay: `${Math.random() * 0.5}s`,
//         }}
//       />
//     ))}
//   </div>
// );

// // Typing Categories Component
// const TypingCategories = () => {
//   const categories = ["NEET PG", "NEET UG", "INICET", "DNB PDCET", "NEET SS"];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [displayText, setDisplayText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentWord = categories[currentIndex];
//     const timeout = setTimeout(
//       () => {
//         if (!isDeleting) {
//           if (displayText.length < currentWord.length) {
//             setDisplayText(currentWord.slice(0, displayText.length + 1));
//           } else {
//             setTimeout(() => setIsDeleting(true), 1500);
//           }
//         } else {
//           if (displayText.length > 0) {
//             setDisplayText(displayText.slice(0, -1));
//           } else {
//             setIsDeleting(false);
//             setCurrentIndex((prev) => (prev + 1) % categories.length);
//           }
//         }
//       },
//       isDeleting ? 50 : 150
//     );
//     return () => clearTimeout(timeout);
//   }, [displayText, isDeleting, currentIndex]);

//   return (
//     <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//       {displayText}
//       <span className="animate-pulse">|</span>
//     </span>
//   );
// };

// function Homepage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeReview, setActiveReview] = useState(null);
//   const [activeFAQ, setActiveFAQ] = useState(null);
//   const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [dashboardVisible, setDashboardVisible] = useState(false);
//   const [chaosVisible, setChaosVisible] = useState(false);
//   const [featuresVisible, setFeaturesVisible] = useState(false);
//   const [reviewsVisible, setReviewsVisible] = useState(false);
//   const [fireworks, setFireworks] = useState([]);
//   const [showNewYearBanner, setShowNewYearBanner] = useState(true);

//   const heroRef = useRef(null);
//   const dashboardRef = useRef(null);
//   const chaosRef = useRef(null);
//   const featuresRef = useRef(null);
//   const reviewsRef = useRef(null);
//   const navigate = useNavigate();

//   // Generate snowflakes
//   const snowflakes = [...Array(50)].map((_, i) => ({
//     id: i,
//     delay: Math.random() * 20,
//     duration: Math.random() * 3 + 20,
//     left: Math.random() * 100,
//   }));

//   // Trigger fireworks periodically
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newFirework = {
//         id: Date.now(),
//         x: Math.random() * 100,
//         y: Math.random() * 30,
//         color: `hsl(${Math.random() * 360}, 100%, 50%)`,
//       };
//       setFireworks((prev) => [...prev, newFirework]);
//       setTimeout(() => {
//         setFireworks((prev) => prev.filter((f) => f.id !== newFirework.id));
//       }, 1000);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: "0px 0px -50px 0px",
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
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607895/file/327f24d24f6b108c5f7b38e04073b0eb.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-red-100 to-red-200",
//     },
//     {
//       title: "The Rules Vary. A Lot.",
//       description:
//         "Every state/counselling/quota has its own rules, fees, and eligibility, and they change every round.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607901/file/912abc91dec5f2e032594032bc4477b0.png?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-blue-100 to-blue-200",
//     },
//     {
//       title: "Decoding Quotas & Options",
//       description:
//         "All India Quota, State Quota, Deemed, Private, MBBS or BDS? Each path affects your fees, choices and future.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607896/file/45b1ee4774ed8b506cca29f3ecc6c648.jpg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-purple-100 to-purple-200",
//     },
//     {
//       title: "Which College? Which Seat?",
//       description:
//         "160,000+ seats. 1000+ colleges. You need to find the ones that fit your rank, budget, and goals.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607898/file/08a4bec8bff2268a7bcfa4c9c73cc279.webp?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-green-100 to-green-200",
//     },
//     {
//       title: "Myths, PDFs and WhatsApp Advice",
//       description:
//         "From Telegram tips to WhatsApp groups, everyone has unreliable opinions while official data is scattered and hard to decode.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
//         "https://cdn.dribbble.com/userupload/44607902/file/3bd5ff1cc6334594981fb3b082a79125.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//       color: "from-yellow-100 to-yellow-200",
//     },
//     {
//       title: "Make confident choices",
//       description:
//         "A single mistake in your choice list can set you back. You're expected to make confident decisions on the 1st try.",
//       desktopImage:
//         "https://cdn.dribbble.com/userupload/44607893/file/487dd57b87ebd1b5e137edfea43df826.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//       mobileImage:
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
//       title: "Multi Rank-Predictors ",
//       description:
//         "Should you upgrade? Will you loose your seat? Is it worth the penalty?",
//       color: "border-purple-300 bg-purple-50",
//       textColor: "text-purple-800",
//       icon: <Award className="w-8 h-8 text-purple-600" />,
//       highlight: "Multi Rank-Predictors",
//     },
//     {
//       title: "Webinars & Live Doubt Sessions",
//       description:
//         "Get expert strategies and answers — tailored for each counselling and round.",
//       color: "border-cyan-300 bg-cyan-50",
//       textColor: "text-cyan-800",
//       icon: <BookOpen className="w-8 h-8 text-cyan-600" />,
//       highlight: "Webinars & Video Guides",
//     },
//     {
//       title: "Advanced tools",
//       description: "Know every seat, every movement, who got admitted where.",
//       color: "border-teal-300 bg-teal-50",
//       textColor: "text-teal-800",
//       icon: <Search className="w-8 h-8 text-teal-600" />,
//       highlight: "Advanced tools",
//     },
//     {
//       title: "INICET Live Results 2026",
//       description: "Check ranks, cutoffs, seat matrix, and counselling schedule for INICET Jan 2026. Get institute-wise data.",
//       color: "border-emerald-300 bg-emerald-50",
//       textColor: "text-emerald-800",
//       icon: <Award className="w-8 h-8 text-emerald-600" />,
//       highlight: "INICET Results Live",
//     }
//   ];

//   const reviews = [
//     {
//       name: "Dr. Priya ",
//       role: "NEET UG 2026 - AIIMS Delhi",
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
//       name: "Dr. Mandeep ",
//       role: "MD Gynaecology Resident",
//       specialty: "NEET PG 2024",
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
//       name: "Dr. Nivetha ",
//       role: "UG Microbiology",
//       specialty: "NEET UG 2024",
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
//       name: "Madhu ",
//       role: "PG Ophthalmology",
//       specialty: "NEET UG 2024",
//       location: "Mumbai",
//       rating: 5,
//       review: "Thank You Believers Consultancy ❤️",
//       detailedReview:
//         "The guidance and support provided throughout the counselling process was exceptional. My daughter secured her dream seat with Believers Consultancy guidance.",
//       image:
//         "https://cdn.dribbble.com/userupload/44669412/file/db5d084e82ca6d9c9fa70ae37cb9cf63.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//     {
//       name: "Dr. Falit ",
//       role: "UG Ophthalmology",
//       specialty: "NEET UG 2024",
//       location: "Government Medical College",
//       rating: 5,
//       review:
//         "Believers Consultancy made my NEET counselling journey smooth and stress-free.",
//       detailedReview:
//         "The comprehensive data analysis and expert guidance helped me make informed decisions. Highly recommend to all NEET aspirants.",
//       image:
//         "https://cdn.dribble.com/userupload/44669411/file/7a4de58473bddb2b24be4f79965fe29e.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
//       verified: true,
//     },
//   ];

//   const faqs = [
//     {
//       question: "What is Believers Consultancy?",
//       answer:
//         "Believers Consultancy is a dedicated counselling service provider specializing in free guidance for NEET UG and PG aspirants. Our mission is to help medical entrance exam qualified students navigate the complex counselling process and secure admission in their preferred medical colleges across India.",
//     },
//     {
//       question: "Why do you provide free counselling services?",
//       answer:
//         "Our data is sourced directly from official counselling authorities and updated in real-time. We maintain 99%+ accuracy and cross-verify all information through multiple official channels.",
//     },
//     {
//       question: "Is this completely free? Are there any hidden charges?",
//       answer:
//         "Absolutely! Believers Consultancy is 100% free. Just create an account and access all features, tools, and resources without any payment or subscription required. No hidden charges, no premium plans - everything is FREE!",
//     },
//     {
//       question: "Who conducts NEET UG counselling?",
//       answer:
//         "NEET UG counselling is conducted at two levels: Central Level: Medical Counselling Committee (MCC) conducts counselling for 15% All India Quota (AIQ) seats and 100% seats in deemed/central universities. State Level: Individual state authorities conduct counselling for 85% state quota seats",
//     },
//     {
//       question:
//         "How is Believers Consultancy useful if I've already started counselling?",
//       answer:
//         "Even mid-counselling, our tools help you make better choices in subsequent rounds, understand upgrade possibilities, calculate financial implications, and avoid common mistakes that could cost you your preferred seat.",
//     },
//     {
//       question: "How many rounds of NEET UG counselling are there?",
//       answer:
//         "NEET UG counselling typically consists of (Round 1/Round 2/Round 3/Mop-up Round/Stray Vacancy Round (if required)), Each round provides opportunities for seat allotment and upgradation.",
//     },
//     {
//       question: "Can I participate in both AIQ and State Quota counselling?",
//       answer:
//         "Yes, eligible candidates can participate in both AIQ and State Quota counselling simultaneously. However, you need to register separately for each counselling process.",
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
//     <div className="min-h-screen bg-white overflow-x-hidden relative">
//       {/* Snowflakes */}
//       <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
//         {snowflakes.map((flake) => (
//           <Snowflake key={flake.id} {...flake} />
//         ))}
//       </div>

//       {/* Fireworks */}
//       <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
//         {fireworks.map((firework) => (
//           <Firework key={firework.id} {...firework} />
//         ))}
//       </div>

//       {/* New Year Banner */}
//       {showNewYearBanner && (
//         <div className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-3 px-4 shadow-lg animate-pulse">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Sparkles className="w-6 h-6 animate-spin" />
//               <span className="font-bold text-lg">
//                 🎉 Happy New Year 2026! Start Your Medical Journey With Us 🎊
//               </span>
//               <Sparkles className="w-6 h-6 animate-spin" />
//             </div>
//             <button
//               onClick={() => setShowNewYearBanner(false)}
//               className="text-white hover:text-gray-200"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Navigation */}
//       <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <div className="flex items-center">
//                 <img
//                   src="/media/logo4.png"
//                   alt="BD Logo"
//                   className="h-16 w-auto object-contain"
//                 />
//               </div>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8 ml-auto">
//               <div className="flex items-center space-x-8">
//                 <a
//                   onClick={() => navigate("/inicetdashboard")}
//                   className="text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-full transition-all duration-300 font-bold relative group cursor-pointer"
//                 >
//                   🎉 INICET Results Out!
//                   <span className="absolute -top-1 -right-1 flex h-3 w-3">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//                   </span>
//                 </a>
//                 <a
//                   onClick={() => navigate("/blog")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
//                 >
//                   Blog
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   onClick={() => navigate("/announcements")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
//                 >
//                   News
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   href="#careers"
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
//                 >
//                   Careers
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//                 <a
//                   onClick={() => navigate("/support")}
//                   className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
//                 >
//                   Contact Us
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//               </div>

//               <div className="flex items-left space-x-4">
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg mr-[5px]"
//                 >
//                   Log-In | Sign-Up
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2"
//             >
//               {isMenuOpen ? (
//                 <X className="w-6 h-6 text-black" />
//               ) : (
//                 <Menu className="w-6 h-6 text-black" />
//               )}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
//               <div className="px-2 pt-2 pb-3 space-y-1">
//                 <a
//                   onClick={() => {
//                     navigate("/inicetdashboard");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-3 text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-300 font-bold text-center cursor-pointer shadow-lg mb-2 animate-pulse"
//                 >
//                   🎉 INICET Results Out! Check Now
//                 </a>
//                 <a
//                   onClick={() => {
//                     navigate("/blog");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Blog
//                 </a>
//                 <a
//                   onClick={() => {
//                     navigate("/announcements");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   News
//                 </a>
//                 <a
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Careers
//                 </a>
//                 <a
//                   onClick={() => {
//                     navigate("/support");
//                     setIsMenuOpen(false);
//                   }}
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
//                 >
//                   Contact Us
//                 </a>
//                 <div className="pt-2">
//                   <button
//                     onClick={() => {
//                       navigate("/login");
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
//                   >
//                     Log-In | Sign-Up
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         className="pt-24 mr-2 bg-gradient-to-b from-blue-50 via-purple-50 to-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-12">
//             {/* New Year Special Badge */}
//             <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-3 rounded-full font-bold text-lg mb-6 animate-bounce">
//               <Sparkles className="w-5 h-5 mr-2" />
//               <span>New Year Special 2026 - All Services FREE!</span>
//               <Sparkles className="w-5 h-5 ml-2" />
//             </div>

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
//                 isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//               } flex justify-center items-center gap-3`}
//             >
//               <TypingCategories />
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
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-6">
//               <button
//                 onClick={() => navigate("/signup")}
//                 className={`w-full sm:w-auto bg-gradient-to-r from-blue-300 to-indigo-600 hover:from-blue-300 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl ${
//                   isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-10"
//                 } transition-all duration-700 delay-400`}
//               >
//                 <span>Get started</span>
//                 <ArrowRight className="w-6 h-6" />
//               </button>

//               <button
//                 onClick={() => navigate("/inicetdashboard")}
//                 className={`w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse relative ${
//                   isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-10"
//                 } transition-all duration-700 delay-400`}
//               >
//                 <Award className="w-6 h-6" />
//                 <span>INICET Results - Check Now!</span>
//                 <span className="absolute -top-1 -right-1 flex h-4 w-4">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Dashboard Preview */}
//       <section ref={dashboardRef} className="relative py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`relative transition-all duration-500 ${
//               dashboardVisible
//                 ? "opacity-100 translate-y-0 scale-100"
//                 : "opacity-70 translate-y-10 scale-95"
//             }`}
//           >
//             <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border-4 border-purple-200 relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-[40px]"></div>
//               <div className="relative p-6">
//                 <img
//                   src="https://cdn.dribbble.com/userupload/44858014/file/56d53c676b68c4180cdc94fbeba54656.png?auto=compress&cs=tinysrgb&w=1424&h=600&fit=crop"
//                   alt="Believers Consultancy Dashboard Preview"
//                   className="w-full h-auto rounded-[30px] shadow-lg hidden md:block"
//                   style={{ aspectRatio: "16/10" }}
//                   loading="eager"
//                 />
//                 <img
//                   src="https://cdn.dribbble.com/userupload/44656684/file/cec64a8083e87908509e53b8db9b4121.png?auto=compress&cs=tinysrgb&w=600&h=1200&fit=crop"
//                   alt="Believers Consultancy Dashboard Preview"
//                   className="w-full h-auto rounded-[30px] shadow-lg md:hidden"
//                   style={{ aspectRatio: "9/16" }}
//                   loading="eager"
//                 />
//                 <div className="absolute inset-6 bg-gradient-to-t from-black/20 to-transparent rounded-[30px] pointer-events-none"></div>
//                 <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
//                   <h3 className="text-2xl md:text-3xl font-bold mb-2">
//                     Believers Consultancy Dashboard
//                   </h3>
//                   <p className="text-lg md:text-xl opacity-90">
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
//         className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div
//             className={`text-center mb-16 transition-all duration-500 ${
//               chaosVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//             }`}
//           >
//             <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//               Welcome to the Counselling Chaos.
//             </h2>
//             <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               To get the best seat, here's everything you're expected to figure
//               out on your own:
//             </p>
//           </div>

//           <div className="space-y-16">
//             {chaosReasons.map((reason, index) => (
//               <div
//                 key={index}
//                 className={`flex flex-col ${
//                   index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
//                 } items-center gap-8 lg:gap-16 transition-all duration-700 ${
//                   chaosVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-20"
//                 }`}
//                 style={{ transitionDelay: `${index * 150}ms` }}
//               >
//                 <div className="flex-1 relative group">
//                   <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-purple-300">
//                     <img
//                       src={reason.desktopImage}
//                       alt={reason.title}
//                       className="w-full h-80 object-cover hidden md:block"
//                       loading="lazy"
//                     />
//                     <img
//                       src={reason.mobileImage}
//                       alt={reason.title}
//                       className="w-full h-60 object-cover md:hidden"
//                       loading="lazy"
//                     />
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-br ${reason.color} mix-blend-multiply opacity-40`}
//                     ></div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                     <div className="absolute bottom-6 left-6 right-6 text-white">
//                       <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full mb-4 flex items-center justify-center shadow-lg">
//                         <span className="text-gray-800 font-bold text-xl">
//                           {index + 1}
//                         </span>
//                       </div>
//                       <p className="text-white/90 font-medium text-sm">
//                         Challenge #{index + 1}
//                       </p>
//                       <p className="text-white font-bold text-lg">
//                         {reason.title}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
//         className="py-10 bg-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-pink-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div
//             className={`text-center mb-16 transition-all duration-1000 ${
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
//                 className={`${feature.color} rounded-3xl p-8 border-2 hover:scale-105 hover:border-purple-400 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl ${
//                   featuresVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-20"
//                 }`}
//                 style={{ transitionDelay: `${index * 50}ms` }}
//               >
//                 <div className="mb-6 transform group-hover:scale-110 transition-transform duration-200">
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
//       <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
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
//               <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:text-green-900 hover:scale-110">
//                 <Phone className="w-5 h-5 mr-2" />
//                 <a
//                   href="https://wa.me/919211724969?text=Hi%20I%20want%20to%20talk%20to%20an%20expert"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="font-semibold text-green-700"
//                 >
//                   Chat with an Expert on WhatsApp
//                 </a>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="bg-green-100 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-green-300">
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

//               <div className="bg-blue-100 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-blue-300">
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

//               <div className="bg-yellow-100 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-yellow-300">
//                 <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
//                   <Clock className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-yellow-800 mb-4">
//                   We're Here for You
//                 </h3>
//                 <p className="text-yellow-700">
//                   Available daily from 10 AM to 7 PM (Sunday Closed).
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section ref={reviewsRef} className="py-14 bg-white">
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
//                 className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors mr-4"
//               >
//                 <ChevronLeft className="w-6 h-6 text-purple-600" />
//               </button>
//               <button
//                 onClick={nextReview}
//                 className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
//               >
//                 <ChevronRight className="w-6 h-6 text-purple-600" />
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
//                       className={`bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:border-purple-300 transition-all duration-500 cursor-pointer h-full ${
//                         activeReview === currentReviewIndex + index
//                           ? "scale-105 shadow-2xl"
//                           : ""
//                       }`}
//                     >
//                       <div className="flex items-center mb-6">
//                         <img
//                           src={review.image}
//                           alt={review.name}
//                           className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg border-2 border-purple-200"
//                         />
//                         <div>
//                           <h4 className="font-bold text-gray-900 text-lg">
//                             {review.name}
//                           </h4>
//                           <p className="text-sm text-blue-600 font-semibold">
//                             {review.specialty}
//                           </p>
//                           <p className="text-xs text-gray-500 blur-sm">
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

//                       <div
//                         className={`absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center transition-all duration-500 ${
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
//                           <p className="text-purple-100 leading-relaxed">
//                             "{review.detailedReview}"
//                           </p>
//                           <div className="mt-4 text-purple-200 font-semibold">
//                             Thank You Believers Consultancy ❤️
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             <div className="text-center mt-12">
//               <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg transition-colors">
//                 <span>View all testimonials</span>
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-14 bg-gradient-to-b from-white to-gray-50">
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
//                 className="border-2 border-gray-200 hover:border-purple-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
//               >
//                 <button
//                   className="w-full px-8 py-6 text-left bg-white hover:bg-purple-50 transition-colors flex justify-between items-center"
//                   onClick={() =>
//                     setActiveFAQ(activeFAQ === index ? null : index)
//                   }
//                 >
//                   <span className="font-semibold text-gray-900 text-lg pr-4">
//                     {faq.question}
//                   </span>
//                   <ChevronDown
//                     className={`w-6 h-6 text-purple-600 transition-transform flex-shrink-0 ${
//                       activeFAQ === index ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 <div
//                   className={`px-8 bg-purple-50 transition-all duration-300 overflow-hidden ${
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
//       </section>

//       {/* Take Control Today */}
//       <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-pink-50/30"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-600 animate-pulse" />
//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Take Control Today
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//             Stop guessing. Start planning with clarity and confidence.
//             Everything is FREE!
//           </p>
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl mb-8"
//           >
//             <span>Get started - FREE Access</span>
//             <ArrowRight className="w-6 h-6" />
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="col-span-1 md:col-span-1">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-auto h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
//                   <img
//                     src="/media/logo4.png"
//                     alt="BD Logo"
//                     className="w-auto h-16 object-contain"
//                   />
//                 </div>
//               </div>
//               <p className="text-xs font-bold text-gray-400 mb-4">
//                 Designed & Managed By: Believers Destination Pvt Ltd
//               </p>
//               <p className="text-gray-400 mb-4 leading-relaxed">
//                 Your ultimate guide to counselling. 100% free access to all
//                 resources and expert guidance.
//               </p>

//               <div className="mb-4">
//                 <h4 className="font-semibold text-white mb-3">Follow Us</h4>
//                 <div className="flex space-x-3">
//                   <a
//                     href="https://www.youtube.com/@BelieversConsultancy"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-800 hover:bg-red-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group"
//                     aria-label="Visit our YouTube channel"
//                   >
//                     <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
//                   </a>
//                   <a
//                     href="https://www.instagram.com/believers.medcounselling"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group"
//                     aria-label="Visit our Instagram page"
//                   >
//                     <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">QUICK LINKS</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     onClick={() => navigate("/announcements")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     News
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/support")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
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
//                     onClick={() => navigate("/login")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     NEET PG
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     NEET UG (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     INICET (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     DNB PDCET (Coming Soon)
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/login")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     NEET SS (Coming Soon)
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-bold text-xl mb-6">LEGAL</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <a
//                     onClick={() => navigate("/privacy")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     onClick={() => navigate("/terms")}
//                     className="hover:text-purple-400 transition-colors cursor-pointer"
//                   >
//                     Terms & Conditions
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
//             <p>
//               &copy; 2026 Believers Destination Pvt Ltd. All rights reserved. |
//               Empowering students with free counselling guidance.
//             </p>
//             <p className="text-xs mb-4 mt-2">
//               <span className="font-bold text-gray-300">
//                 Designed & Managed By:
//               </span>{" "}
//               <a
//                 href="https://www.believersdestination.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="font-semibold text-purple-400 hover:text-purple-300 underline"
//               >
//                 Believers Destination Pvt Ltd
//               </a>
//             </p>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes fall {
//           0% {
//             top: -10%;
//             opacity: 1;
//           }
//           100% {
//             top: 100%;
//             opacity: 0.3;
//           }
//         }
        
//         @keyframes firework {
//           0% {
//             transform: translate(0, 0);
//             opacity: 1;
//           }
//           100% {
//             transform: translate(var(--x, 100px), var(--y, 100px));
//             opacity: 0;
//           }
//         }

//         .animate-fall {
//           animation: fall linear infinite;
//         }

//         .animate-firework {
//           animation: firework 1s ease-out forwards;
//           --x: calc(cos(var(--angle, 0deg)) * 100px);
//           --y: calc(sin(var(--angle, 0deg)) * 100px);
//         }
//       `}</style>
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
  Youtube,
  Instagram,
  Sparkles,
} from "lucide-react";

// Snowflake Component - Smooth with no flicker
const Snowflake = ({ delay, duration, left, size, opacity }) => (
  <div
    className="absolute pointer-events-none snowflake-fall"
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      fontSize: `${size}px`,
      opacity: opacity,
      color: 'rgba(255, 255, 255, 0.6)',
      textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
      filter: 'blur(0.5px)',
    }}
  >
    ❄
  </div>
);

// Firework Component
const Firework = ({ x, y, color }) => (
  <div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full animate-firework"
        style={{
          background: color,
          transform: `rotate(${i * 45}deg)`,
          animationDelay: `${Math.random() * 0.5}s`,
        }}
      />
    ))}
  </div>
);

// Typing Categories Component
const TypingCategories = () => {
  const categories = ["NEET PG", "NEET UG", "INICET", "DNB PDCET", "NEET SS"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = categories[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % categories.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [chaosVisible, setChaosVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [showNewYearBanner, setShowNewYearBanner] = useState(true);
  const [bannerVisible, setBannerVisible] = useState(true); // For fade animation

  const heroRef = useRef(null);
  const dashboardRef = useRef(null);
  const chaosRef = useRef(null);
  const featuresRef = useRef(null);
  const reviewsRef = useRef(null);
  const navigate = useNavigate();

  // Generate snowflakes with varied properties - smoother distribution
const snowflakes = [...Array(25)].map((_, i) => ({
  id: i,
  delay: (i * 1.2) % 20, // Staggered delays to prevent clustering
  duration: Math.random() * 8 + 18, // 18-26 seconds (slower & smoother)
  left: (i * 4.3) % 100, // Better horizontal distribution
  size: Math.random() * 6 + 8, // 8-14px (slightly smaller)
  opacity: Math.random() * 0.3 + 0.4, // 0.4-0.7 opacity range
}));

  // Auto-hide New Year banner after 5 seconds
  useEffect(() => {
    if (showNewYearBanner) {
      const fadeTimer = setTimeout(() => {
        setBannerVisible(false); // Start fade out
      }, 4000); // Start fading at 4 seconds

      const hideTimer = setTimeout(() => {
        setShowNewYearBanner(false); // Remove from DOM
      }, 5000); // Remove at 5 seconds

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [showNewYearBanner]);

  // Trigger fireworks periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newFirework = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 30,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      };
      setFireworks((prev) => [...prev, newFirework]);
      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== newFirework.id));
      }, 1000);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
      color: "border-cyan-300 bg-cyan-50",
      textColor: "text-cyan-800",
      icon: <BookOpen className="w-8 h-8 text-cyan-600" />,
      highlight: "Webinars & Video Guides",
    },
    {
      title: "Advanced tools",
      description: "Know every seat, every movement, who got admitted where.",
      color: "border-teal-300 bg-teal-50",
      textColor: "text-teal-800",
      icon: <Search className="w-8 h-8 text-teal-600" />,
      highlight: "Advanced tools",
    },
    {
      title: "INICET Live Results 2026",
      description: "Check ranks, cutoffs, seat matrix, and counselling schedule for INICET Jan 2026. Get institute-wise data.",
      color: "border-emerald-300 bg-emerald-50",
      textColor: "text-emerald-800",
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      highlight: "INICET Results Live",
    }
  ];

  const reviews = [
    {
      name: "Dr. Priya ",
      role: "NEET UG 2026 - AIIMS Delhi",
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
      specialty: "NEET UG 2024",
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
        "https://cdn.dribble.com/userupload/44669411/file/7a4de58473bddb2b24be4f79965fe29e.png?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      verified: true,
    },
  ];

  const faqs = [
    {
      question: "What is Believers Consultancy?",
      answer:
        "Believers Consultancy is a dedicated counselling service provider specializing in free guidance for NEET UG and PG aspirants. Our mission is to help medical entrance exam qualified students navigate the complex counselling process and secure admission in their preferred medical colleges across India.",
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
        "NEET UG counselling is conducted at two levels: Central Level: Medical Counselling Committee (MCC) conducts counselling for 15% All India Quota (AIQ) seats and 100% seats in deemed/central universities. State Level: Individual state authorities conduct counselling for 85% state quota seats",
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
        "NEET UG counselling typically consists of (Round 1/Round 2/Round 3/Mop-up Round/Stray Vacancy Round (if required)), Each round provides opportunities for seat allotment and upgradation.",
    },
    {
      question: "Can I participate in both AIQ and State Quota counselling?",
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

  // Handle manual close of banner
  const closeBanner = () => {
    setBannerVisible(false);
    setTimeout(() => setShowNewYearBanner(false), 500); // Wait for fade animation
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Snowflakes - Fixed with proper animation */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {snowflakes.map((flake) => (
          <Snowflake key={flake.id} {...flake} />
        ))}
      </div>

      {/* Fireworks */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {fireworks.map((firework) => (
          <Firework key={firework.id} {...firework} />
        ))}
      </div>

      {/* New Year Banner - Fixed: Centered and auto-dismiss */}
      {showNewYearBanner && (
        <div 
          className={`fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-3 px-4 shadow-lg transition-all duration-500 ${
            bannerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center relative">
            <div className="flex items-center justify-center space-x-3">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 animate-spin flex-shrink-0" />
              <span className="font-bold text-sm md:text-lg text-center">
                🎉 Happy New Year 2026! Start Your Medical Journey With Us 🎊
              </span>
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 animate-spin flex-shrink-0" />
            </div>
            <button
              onClick={closeBanner}
              className="absolute right-0 text-white hover:text-gray-200 p-1 transition-colors"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  src="/media/logo4.png"
                  alt="BD Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 ml-auto">
              <div className="flex items-center space-x-8">
                <a
                  onClick={() => navigate("/inicetdashboard")}
                  className="text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-full transition-all duration-300 font-bold relative group cursor-pointer"
                >
                  🎉 INICET Results Out!
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </a>
                <a
                  onClick={() => navigate("/blog")}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
                >
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  onClick={() => navigate("/announcements")}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
                >
                  News
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#careers"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
                >
                  Careers
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  onClick={() => navigate("/support")}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
                >
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>

              <div className="flex items-left space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg mr-[5px]"
                >
                  Log-In | Sign-Up
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  onClick={() => {
                    navigate("/inicetdashboard");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-3 text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-300 font-bold text-center cursor-pointer shadow-lg mb-2 animate-pulse"
                >
                  🎉 INICET Results Out! Check Now
                </a>
                <a
                  onClick={() => {
                    navigate("/blog");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
                >
                  Blog
                </a>
                <a
                  onClick={() => {
                    navigate("/announcements");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
                >
                  News
                </a>
                <a
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
                >
                  Careers
                </a>
                <a
                  onClick={() => {
                    navigate("/support");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 font-medium cursor-pointer"
                >
                  Contact Us
                </a>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
                  >
                    Log-In | Sign-Up
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
        className="pt-24 mr-2 bg-gradient-to-b from-blue-50 via-purple-50 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            {/* New Year Special Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-3 rounded-full font-bold text-lg mb-6 animate-bounce">
              <Sparkles className="w-5 h-5 mr-2" />
              <span>New Year Special 2026 - All Services FREE!</span>
              <Sparkles className="w-5 h-5 ml-2" />
            </div>

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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-6">
              <button
                onClick={() => navigate("/signup")}
                className={`w-full sm:w-auto bg-gradient-to-r from-blue-300 to-indigo-600 hover:from-blue-300 hover:to-indigo-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } transition-all duration-700 delay-400`}
              >
                <span>Get started</span>
                <ArrowRight className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigate("/inicetdashboard")}
                className={`w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse relative ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } transition-all duration-700 delay-400`}
              >
                <Award className="w-6 h-6" />
                <span>INICET Results - Check Now!</span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section ref={dashboardRef} className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative transition-all duration-500 ${
              dashboardVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-70 translate-y-10 scale-95"
            }`}
          >
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border-4 border-purple-200 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-[40px]"></div>
              <div className="relative p-6">
                <img
                  src="https://cdn.dribbble.com/userupload/44858014/file/56d53c676b68c4180cdc94fbeba54656.png?auto=compress&cs=tinysrgb&w=1424&h=600&fit=crop"
                  alt="Believers Consultancy Dashboard Preview"
                  className="w-full h-auto rounded-[30px] shadow-lg hidden md:block"
                  style={{ aspectRatio: "16/10" }}
                  loading="eager"
                />
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
        className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
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
                  <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-purple-300">
                    <img
                      src={reason.desktopImage}
                      alt={reason.title}
                      className="w-full h-80 object-cover hidden md:block"
                      loading="lazy"
                    />
                    <img
                      src={reason.mobileImage}
                      alt={reason.title}
                      className="w-full h-60 object-cover md:hidden"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${reason.color} mix-blend-multiply opacity-40`}
                    ></div>
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
        className="py-10 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-pink-50/30"></div>
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
                className={`${feature.color} rounded-3xl p-8 border-2 hover:scale-105 hover:border-purple-400 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl ${
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
      <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
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
              <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:text-green-900 hover:scale-110">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href="https://wa.me/919211724969?text=Hi%20I%20want%20to%20talk%20to%20an%20expert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green-700"
                >
                  Chat with an Expert on WhatsApp
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-green-100 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-green-300">
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

              <div className="bg-blue-100 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-blue-300">
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

              <div className="bg-yellow-100 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-yellow-300">
                <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-yellow-800 mb-4">
                  We're Here for You
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
      <section ref={reviewsRef} className="py-14 bg-white">
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
                className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors mr-4"
              >
                <ChevronLeft className="w-6 h-6 text-purple-600" />
              </button>
              <button
                onClick={nextReview}
                className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-purple-600" />
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
                      className={`bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:border-purple-300 transition-all duration-500 cursor-pointer h-full ${
                        activeReview === currentReviewIndex + index
                          ? "scale-105 shadow-2xl"
                          : ""
                      }`}
                    >
                      <div className="flex items-center mb-6">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg border-2 border-purple-200"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {review.name}
                          </h4>
                          <p className="text-sm text-blue-600 font-semibold">
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

                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center transition-all duration-500 ${
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
                          <p className="text-purple-100 leading-relaxed">
                            "{review.detailedReview}"
                          </p>
                          <div className="mt-4 text-purple-200 font-semibold">
                            Thank You Believers Consultancy ❤️
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="text-center mt-12">
              <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg transition-colors">
                <span>View all testimonials</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 bg-gradient-to-b from-white to-gray-50">
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
                className="border-2 border-gray-200 hover:border-purple-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  className="w-full px-8 py-6 text-left bg-white hover:bg-purple-50 transition-colors flex justify-between items-center"
                  onClick={() =>
                    setActiveFAQ(activeFAQ === index ? null : index)
                  }
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-purple-600 transition-transform flex-shrink-0 ${
                      activeFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-8 bg-purple-50 transition-all duration-300 overflow-hidden ${
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
      <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-pink-50/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-600 animate-pulse" />
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Take Control Today
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop guessing. Start planning with clarity and confidence.
            Everything is FREE!
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full text-xl font-bold inline-flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl mb-8"
          >
            <span>Get started - FREE Access</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-auto h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                  <img
                    src="/media/logo4.png"
                    alt="BD Logo"
                    className="w-auto h-16 object-contain"
                  />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 mb-4">
                Designed & Managed By: Believers Destination Pvt Ltd
              </p>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Your ultimate guide to counselling. 100% free access to all
                resources and expert guidance.
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-white mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  <a
                    href="https://www.youtube.com/@BelieversConsultancy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-red-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group"
                    aria-label="Visit our YouTube channel"
                  >
                    <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/believers.medcounselling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group"
                    aria-label="Visit our Instagram page"
                  >
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">QUICK LINKS</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    onClick={() => navigate("/announcements")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/support")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
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
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    NEET PG
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    NEET UG (Coming Soon)
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    INICET (Coming Soon)
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    DNB PDCET (Coming Soon)
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
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
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/terms")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>
              &copy; 2026 Believers Destination Pvt Ltd. All rights reserved. |
              Empowering students with free counselling guidance.
            </p>
            <p className="text-xs mb-4 mt-2">
              <span className="font-bold text-gray-300">
                Designed & Managed By:
              </span>{" "}
              <a
                href="https://www.believersdestination.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-purple-400 hover:text-purple-300 underline"
              >
                Believers Destination Pvt Ltd
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed CSS Styles */}
<style jsx>{`
  /* Snowflake Animation - Ultra smooth, no flicker */
  @keyframes snowfall {
    0% {
      transform: translateY(-20px) translateX(0) rotate(0deg);
      opacity: 0;
    }
    5% {
      opacity: var(--snow-opacity, 0.5);
    }
    50% {
      transform: translateY(50vh) translateX(15px) rotate(180deg);
      opacity: var(--snow-opacity, 0.5);
    }
    95% {
      opacity: var(--snow-opacity, 0.5);
    }
    100% {
      transform: translateY(105vh) translateX(-10px) rotate(360deg);
      opacity: 0;
    }
  }
  
  .snowflake-fall {
    animation: snowfall ease-in-out infinite;
    will-change: transform;
    top: 0;
  }
        
        /* Firework Animation */
        @keyframes firework {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x, 50px), var(--y, 50px)) scale(0);
            opacity: 0;
          }
        }

        .animate-firework {
          animation: firework 1s ease-out forwards;
        }
        
        .animate-firework:nth-child(1) { --x: 0px; --y: -60px; }
        .animate-firework:nth-child(2) { --x: 42px; --y: -42px; }
        .animate-firework:nth-child(3) { --x: 60px; --y: 0px; }
        .animate-firework:nth-child(4) { --x: 42px; --y: 42px; }
        .animate-firework:nth-child(5) { --x: 0px; --y: 60px; }
        .animate-firework:nth-child(6) { --x: -42px; --y: 42px; }
        .animate-firework:nth-child(7) { --x: -60px; --y: 0px; }
        .animate-firework:nth-child(8) { --x: -42px; --y: -42px; }
      `}</style>
    </div>
  );
}

export default Homepage;