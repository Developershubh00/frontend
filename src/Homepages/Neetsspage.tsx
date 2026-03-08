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
  { label: "NEET UG", path: "/neet-ug" },
  { label: "INICET", path: "/inicet" },
  { label: "NEET SS", path: "/neet-ss", active: true },
  { label: "DNB PDCET", path: "/dnb-pdcet" },
  { label: "NEET MDS", path: "/neet-mds" },
];

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Closing Ranks",
    description: "Explore multi-year cut-off ranks for every round, super-speciality, and institute, filtered by category, quota, and more.",
    color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Seat Matrix",
    description: "Access real-time seat availability for each round across institutes, quotas, and super-speciality categories.",
    color: "text-red-600", bg: "bg-red-50", border: "border-red-200"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "My Choice List",
    description: "Build, save, and refine multiple choice lists for NEET SS counselling with live data and smart filters.",
    color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Institutes",
    description: "Get verified information on institutes offering super-speciality programmes, including AIIMS, PGI, and private colleges.",
    color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200"
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Courses",
    description: "Explore all available MCh and DM super-speciality courses with duration, recognition, and clinical details.",
    color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200"
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Fee & Bond Data",
    description: "Compare tuition fees, bond obligations, and stipend details categorised by institute, course and quota.",
    color: "text-lime-600", bg: "bg-lime-50", border: "border-lime-200"
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Counsellings",
    description: "Understand all quota-wise NEET SS counselling timelines, key events and official announcements.",
    color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Resources",
    description: "Explore the official sources behind our data, from MCC notifications to verified government documents.",
    color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200"
  },
];

const overviewItems = [
  {
    emoji: "🎓",
    title: "A brief explanation of the exam",
    content: "NEET SS (Super Speciality) is the national entrance examination for admission to DM (Doctorate of Medicine) and MCh (Master of Chirurgiae) super-speciality medical programmes in India. It's the final step for doctors who have completed their MD/MS and want to pursue the highest level of clinical specialisation."
  },
  {
    emoji: "💡",
    title: "Who conducts it, who is eligible, and its significance",
    content: "Conducted by the National Board of Examinations (NBE). Eligible candidates must have completed or be appearing in their final year of MD/MS/DNB programmes. NEET SS determines access to the most elite and specialised medical training in the country — DM Cardiology, MCh Neurosurgery, DM Gastroenterology, and many more."
  },
  {
    emoji: "📚",
    title: "Overview of how counselling is done",
    content: [
      "MCC (Medical Counselling Committee) conducts counselling for seats across Government, Deemed, and Central Institutions.",
      "State counselling authorities manage counselling for state quota super-speciality seats.",
      "The process includes choice filling, seat allotment, and joining. Counselling typically has Round 1, Round 2, and a Stray Vacancy Round. Your admission depends on your rank, choice of super-speciality, college preference, and category.",
    ]
  }
];

const specialities = [
  { name: "DM Cardiology", icon: "❤️", demand: "Very High" },
  { name: "MCh Neurosurgery", icon: "🧠", demand: "High" },
  { name: "DM Gastroenterology", icon: "🏥", demand: "High" },
  { name: "DM Nephrology", icon: "💊", demand: "High" },
  { name: "MCh Plastic Surgery", icon: "⚕️", demand: "Medium" },
  { name: "DM Oncology", icon: "🔬", demand: "High" },
];

const faqs = [
  {
    question: "What is NEET SS and who should take it?",
    answer: "NEET SS is the super-speciality entrance exam for DM and MCh programmes. Any doctor who has completed or is completing their MD/MS/DNB and wants to pursue a super-speciality (like Cardiology, Neurosurgery, etc.) must appear in NEET SS."
  },
  {
    question: "How is NEET SS counselling conducted?",
    answer: "MCC conducts centralised counselling for AIQ and Deemed/Central institution seats. State authorities handle state quota seats. The process mirrors NEET PG counselling with choice filling, seat allotment, and joining rounds."
  },
  {
    question: "How competitive is NEET SS compared to NEET PG?",
    answer: "NEET SS is extremely competitive — the number of seats is far fewer than NEET PG, and only those who've already cracked MD/MS are eligible. Seats in top super-specialities like DM Cardiology at premier institutes are among the most coveted in Indian medicine."
  },
  {
    question: "Can I participate in both AIQ and State NEET SS counselling?",
    answer: "Yes, eligible candidates can register for both the All India Quota through MCC and their respective state-level counselling simultaneously, subject to eligibility criteria."
  },
  {
    question: "Is Believers Consultancy free for NEET SS data?",
    answer: "Yes! All NEET SS data including cut-offs, seat matrices, institute profiles, and choice list tools are completely free. Just create an account and access everything without any payment."
  },
];

export default function NeetSSPage() {
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
                <button onClick={() => setIsCounsellingOpen(!isCounsellingOpen)}
                  className="flex items-center gap-1.5 text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                  Counsellings
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCounsellingOpen ? "rotate-180" : ""}`} />
                </button>
                {isCounsellingOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                    {counsellingDropdownItems.map((item) => (
                      <button key={item.label}
                        onClick={() => { navigate(item.path); setIsCounsellingOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-600 ${item.active ? "text-orange-600 bg-orange-50" : "text-gray-700"}`}>
                        {item.label}
                        {item.active && <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Current</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a onClick={() => navigate("/blog")} className="text-gray-700 hover:text-orange-600 transition-colors font-medium cursor-pointer">Blog</a>
              <a onClick={() => navigate("/announcements")} className="text-gray-700 hover:text-orange-600 transition-colors font-medium cursor-pointer">News</a>
              <a onClick={() => navigate("/support")} className="text-gray-700 hover:text-orange-600 transition-colors font-medium cursor-pointer">Contact Us</a>
              <button onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
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
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.active ? "text-orange-600 bg-orange-50" : "text-gray-700 hover:bg-gray-50"}`}>
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
      <section ref={heroRef} className="pt-24 pb-12 bg-gradient-to-br from-orange-50 via-amber-50/40 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/60 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Users className="w-4 h-4" />
                Super-Speciality Guidance
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Navigate{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">NEET SS</span>{" "}
                Counselling with Precision
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Super-speciality admissions are the most competitive in Indian medicine. Believers Consultancy gives you real data on DM/MCh seat availability, cut-offs, fee structures, and bond obligations across all institutes — completely free, so you can make the best decision for your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-full text-lg font-bold inline-flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-2xl">
                  <span>Get started — FREE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600 font-medium">100% Free. No subscription. No hidden charges.</span>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">NEET SS 2026</p>
                      <p className="text-sm text-gray-500">Counselling Data</p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Popular Super-specialities</p>
                  <div className="space-y-2.5">
                    {specialities.map((s, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <span>{s.icon}</span>
                          <span className="text-gray-700 font-medium text-sm">{s.name}</span>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          s.demand === "Very High" ? "bg-red-100 text-red-700" :
                          s.demand === "High" ? "bg-orange-100 text-orange-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>{s.demand}</span>
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
                <p className="text-gray-400 text-sm leading-relaxed">Everything you need to navigate NEET SS counselling for DM and MCh super-speciality programmes.</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">NEET SS 2026 Overview</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about NEET SS 2026 and how it impacts your medical career.</p>
          </div>
          <div className="space-y-10 max-w-5xl mx-auto">
            {overviewItems.map((item, i) => (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-700 ${overviewVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
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
            <p className="text-gray-600 text-lg">Everything you need to know about NEET SS counselling.</p>
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
      <section className="py-16 bg-gradient-to-br from-orange-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Your NEET SS Journey</h2>
          <p className="text-orange-100 text-xl mb-8">Everything is FREE. No subscriptions. No catch.</p>
          <button onClick={() => navigate("/signup")}
            className="bg-white text-orange-600 hover:bg-orange-50 px-10 py-4 rounded-full text-xl font-bold inline-flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-2xl">
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
                {["NEET PG", "NEET UG", "INICET", "DNB PDCET", "NEET SS", "NEET MDS"].map(l => (<li key={l}><a className="hover:text-blue-400 transition-colors cursor-pointer">{l}</a></li>))}
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