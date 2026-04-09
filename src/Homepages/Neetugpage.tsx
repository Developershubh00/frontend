import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Users, BookOpen, Menu, X, ChevronDown, Star,
  Search, Award, Target, BarChart3, CheckCircle, Phone,
  Clock, Youtube, Instagram, TrendingUp, FileText,
  Building2, GraduationCap, Stethoscope, MapPin, DollarSign, Calendar
} from "lucide-react";

const counsellingDropdownItems = [
  { label: "NEET PG", path: "/neet-pg" },
  { label: "NEET UG", path: "/neet-ug", active: true },
  { label: "INICET", path: "/inicet" },
  { label: "NEET SS", path: "/neet-ss" },
  { label: "DNB PDCET", path: "/dnb-pdcet" },
];

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Allotments",
    description: "Track multi-year official allotments across rounds, states, and quotas — AIQ, State Quota, Deemed — all in one structured view.",
    color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Closing Ranks",
    description: "Explore multi-year cut-off ranks for every round, course and college, filtered by category, quota, and state.",
    color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Seat Matrix",
    description: "Access real-time seat availability for each round across colleges, quotas, and categories — MBBS, BDS, AYUSH and more.",
    color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200"
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Fee & Bond Data",
    description: "Compare tuition fees, hostel costs, and bond obligations across Government, Deemed, and Private colleges.",
    color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Allotment Mapping",
    description: "Track how candidates near your rank are moving across states and rounds, and spot better opportunities instantly.",
    color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200"
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Rank Scan",
    description: "Zoom into any rank and see what options candidates actually landed. A quick snapshot from all allotments across states.",
    color: "text-fuchsia-600", bg: "bg-fuchsia-50", border: "border-fuchsia-200"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "My Choice List",
    description: "Build, save, and refine multiple choice lists for AIQ and State counselling with live data and smart filters.",
    color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Institutes",
    description: "Get verified information on 1000+ medical colleges, from beds and facilities to NIRF rankings and clinical information.",
    color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200"
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Courses",
    description: "Explore MBBS, BDS, AYUSH, and other UG courses with full details on duration, recognition, and eligibility.",
    color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Universities",
    description: "Browse all medical universities with their profiles, affiliations, state quota rules, and participating colleges.",
    color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200"
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Counsellings",
    description: "Understand all quota-wise counselling timelines, AIQ vs State schedules, key events and official announcements.",
    color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Resources",
    description: "Explore official sources behind our data — from MCC notifications to state counselling authority documents.",
    color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200"
  },
];

const overviewItems = [
  {
    emoji: "🎓",
    title: "A brief explanation of the exam",
    content: "NEET UG (National Eligibility cum Entrance Test — Undergraduate) is the single entrance exam for admission to MBBS, BDS, AYUSH, and other undergraduate medical courses across India. It is held once a year and is the first step for any student aspiring to become a doctor."
  },
  {
    emoji: "💡",
    title: "Who conducts it, who is eligible, and its significance",
    content: "The exam is conducted by the National Testing Agency (NTA). Students who have completed or are appearing for Class 12 with Physics, Chemistry, Biology (or Biotechnology), and English are eligible. NEET UG is the only entrance test for medical UG seats in India — including AIIMS, JIPMER, and state-run colleges — making it one of the most significant exams for medical aspirants."
  },
  {
    emoji: "📚",
    title: "Overview of how counselling is done",
    content: [
      "MCC (Medical Counselling Committee) conducts counselling for seats across all India under Government, Deemed and Central Institutions including AIIMS, JIPMER, etc.",
      "State authorities conduct counselling for state quota seats within their respective states.",
      "The process includes choice filling, seat allotment, and Joining at the allotted Institute. Counselling has Round 1, Round 2, Round 3 and Stray Round. Your final seat depends on your rank, category, preferences, and timely choices."
    ]
  }
];

const faqs = [
  {
    question: "What is NEET UG counselling?",
    answer: "NEET UG counselling is the seat allotment process after NEET UG results. It determines which college and course (MBBS/BDS/AYUSH) you get based on your rank, category, and choice preferences. It's conducted at both national level (MCC for AIQ and Deemed/Central) and state level."
  },
  {
    question: "What is the difference between AIQ and State Quota?",
    answer: "All India Quota (AIQ) covers 15% of Government college seats and 100% of Deemed/Central university seats — conducted by MCC. State Quota covers the remaining 85% of Government college seats and is conducted by individual state counselling authorities. You can participate in both simultaneously."
  },
  {
    question: "How many rounds does NEET UG counselling have?",
    answer: "MCC conducts Round 1, Round 2, Round 3, and a Stray Vacancy Round for AIQ seats. State counselling has its own rounds (varies by state — typically 2–4 rounds plus a mop-up round). Believers Consultancy tracks all rounds in real time."
  },
  {
    question: "Can I participate in both AIQ and State Quota counselling simultaneously?",
    answer: "Yes. Eligible candidates can register for both MCC (AIQ) and their respective state counselling at the same time. You need to register and pay the registration fee separately for each."
  },
  {
    question: "Is Believers Consultancy free for NEET UG data?",
    answer: "Yes! All NEET UG data — cut-offs, seat matrices, allotments, college profiles, fee data, and choice list tools — are completely free. Just create an account and access everything without any payment."
  },
];

export default function NeetUGPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [overviewVisible, setOverviewVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroRef.current && entry.isIntersecting) setHeroVisible(true);
          if (entry.target === featuresRef.current && entry.isIntersecting) setFeaturesVisible(true);
          if (entry.target === overviewRef.current && entry.isIntersecting) setOverviewVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    [heroRef, featuresRef, overviewRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCounsellingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
              <img src="/media/logo4.png" alt="BD Logo" className="h-16 w-auto object-contain" />
            </div>
            <div className="hidden md:flex items-center space-x-8 ml-auto">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsCounsellingOpen(!isCounsellingOpen)}
                  className="flex items-center gap-1.5 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
                >
                  Counsellings
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCounsellingOpen ? "rotate-180" : ""}`} />
                </button>
                {isCounsellingOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                    {counsellingDropdownItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => { navigate(item.path); setIsCounsellingOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-violet-50 hover:text-violet-600 ${item.active ? "text-violet-600 bg-violet-50" : "text-gray-700"}`}
                      >
                        {item.label}
                        {item.active && <span className="ml-2 text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">Current</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a onClick={() => navigate("/blog")} className="text-gray-700 hover:text-violet-600 transition-colors font-medium cursor-pointer">Blog</a>
              <a onClick={() => navigate("/announcements")} className="text-gray-700 hover:text-violet-600 transition-colors font-medium cursor-pointer">News</a>
              <a onClick={() => navigate("/support")} className="text-gray-700 hover:text-violet-600 transition-colors font-medium cursor-pointer">Contact Us</a>
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Log-In | Sign-Up
              </button>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 pb-3">
              <div className="px-2 pt-2 space-y-1">
                <div className="px-3 py-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Counsellings</p>
                  {counsellingDropdownItems.map(item => (
                    <button key={item.label} onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.active ? "text-violet-600 bg-violet-50" : "text-gray-700 hover:bg-gray-50"}`}>
                      {item.label}
                    </button>
                  ))}
                </div>
                <a onClick={() => { navigate("/blog"); setIsMenuOpen(false); }} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium cursor-pointer">Blog</a>
                <a onClick={() => { navigate("/announcements"); setIsMenuOpen(false); }} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium cursor-pointer">News</a>
                <a onClick={() => { navigate("/support"); setIsMenuOpen(false); }} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium cursor-pointer">Contact Us</a>
                <div className="pt-2">
                  <button onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                    className="w-full bg-gradient-to-r from-blue-300 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg">
                    Log-In | Sign-Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="pt-24 pb-12 bg-gradient-to-br from-violet-50 via-purple-50/40 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-violet-100/60 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Users className="w-4 h-4" />
                5k+ Students Enrolled
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">NEET UG</span>{" "}
                rank has potential. Let's unlock the right college for it.
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Find the right medical seat based on your rank. The NEET UG counselling process can feel overwhelming — but it doesn't have to be. Believers Consultancy brings structure, clarity, and precision to your MBBS/BDS seat selection. Get access to real-time cut-offs, seat availability, and expert insights, all in one place. Completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-2xl">
                  <span>Get started — FREE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600 font-medium">100% Free. No subscription. No hidden charges.</span>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">NEET UG 2026</p>
                      <p className="text-sm text-gray-500">Counselling Data</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "AIQ Round 1 Cut-offs", status: "Available", color: "violet" },
                      { label: "State Quota Allotments", status: "Updated", color: "purple" },
                      { label: "Deemed University Seats", status: "Complete", color: "indigo" },
                      { label: "AIIMS & JIPMER Data", status: "Live", color: "blue" },
                      { label: "Fee & Bond Details", status: "Free", color: "pink" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                        <span className="text-gray-700 font-medium text-sm">{item.label}</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-${item.color}-100 text-${item.color}-700`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-white fill-white" />)}
                  </div>
                  <p className="text-white text-xs font-bold">Rated 4.9</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-3xl p-8 text-white sticky top-24">
                <h2 className="text-4xl font-bold mb-4 leading-tight">Explore,<br />Choose,<br />Succeed</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Everything you need to navigate NEET UG counselling — AIQ, State Quota, Deemed, AIIMS, JIPMER — all free.</p>
                <button onClick={() => navigate("/signup")} className="mt-6 w-full bg-white text-gray-900 font-bold py-3 rounded-2xl hover:bg-gray-100 transition-colors">
                  Start Free →
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i}
                  className={`${f.bg} ${f.border} border rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:scale-[1.02] ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 40}ms` }}>
                  <div className={`${f.color} mb-3`}>{f.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section ref={overviewRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${overviewVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">NEET UG 2026 Overview</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about NEET UG 2026 and how it impacts your medical career.</p>
          </div>
          <div className="space-y-10 max-w-5xl mx-auto">
            {overviewItems.map((item, i) => (
              <div key={i}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-700 ${overviewVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">{item.title}</h3>
                </div>
                <div>
                  {Array.isArray(item.content) ? (
                    <ul className="space-y-2">
                      {item.content.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about NEET UG counselling.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button className="w-full px-8 py-6 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                  onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}>
                  <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${activeFAQ === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`px-8 bg-gray-50 transition-all duration-300 overflow-hidden ${activeFAQ === i ? "py-5 opacity-100" : "max-h-0 opacity-0 py-0"}`}>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-violet-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Your NEET UG Journey</h2>
          <p className="text-violet-100 text-xl mb-8">Everything is FREE. No subscriptions. No catch.</p>
          <button onClick={() => navigate("/signup")}
            className="bg-white text-violet-600 hover:bg-violet-50 px-10 py-4 rounded-full text-xl font-bold inline-flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-2xl">
            <span>Get Free Access</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="w-auto h-16 bg-white rounded-2xl inline-flex items-center justify-center shadow-lg overflow-hidden mb-4 px-2">
                <img src="/media/logo4.png" alt="BD Logo" className="w-auto h-14 object-contain" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Your ultimate guide to counselling. 100% free access to all resources and expert guidance.</p>
              <div className="flex space-x-3">
                <a href="https://www.youtube.com/@BelieversConsultancy" target="_blank" rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-red-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group">
                  <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href="https://www.instagram.com/believers.medcounselling" target="_blank" rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-pink-600 rounded-lg p-3 transition-all duration-300 hover:scale-110 group">
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {["News", "Careers", "Contact us"].map(l => (<li key={l}><a className="hover:text-blue-400 transition-colors cursor-pointer">{l}</a></li>))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">EXAMS</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {[
                  { label: "NEET PG", path: "/neet-pg" },
                  { label: "NEET UG", path: "/neet-ug" },
                  { label: "INICET", path: "/inicet" },
                  { label: "DNB PDCET", path: "/dnb-pdcet" },
                  { label: "NEET SS", path: "/neet-ss" },
                ].map(l => (
                  <li key={l.label}><a onClick={() => navigate(l.path)} className="hover:text-blue-400 transition-colors cursor-pointer">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">LEGAL</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a onClick={() => navigate("/privacy")} className="hover:text-blue-400 transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a onClick={() => navigate("/terms")} className="hover:text-blue-400 transition-colors cursor-pointer">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Believers Destination Pvt Ltd. All rights reserved. | Empowering students with free counselling guidance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}