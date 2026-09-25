import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Youtube, Instagram } from "lucide-react";
import LightBackground from "../components/new/LightBackground";
import WhyBelievers from "../components/new/WhyBelievers";
import DataAdvantage from "../components/new/DataAdvantage";
import FindCollegesSection from "../components/new/FindCollegesSection";
import CounsellingJourney from "../components/new/CounsellingJourney";
import FreeResourcesSection from "../components/new/FreeResourcesSection";
import CorePromise from "../components/new/CorePromise";
import FinalCTA from "../components/new/FinalCTA";

function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);

  const navigate = useNavigate();
  const counsellingDropdownRef = useRef<HTMLDivElement>(null);

  // Close counselling dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        counsellingDropdownRef.current &&
        !counsellingDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCounsellingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const counsellingDropdownItems = [
    { label: "NEET PG", path: "/neet-pg" },
    { label: "NEET UG", path: "/neet-ug" },
    { label: "INICET", path: "/inicet" },
    { label: "NEET SS", path: "/neet-ss" },
  ];

  const faqs = [
    {
      question: "What is Believers Consultancy?",
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center ">
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
                  onClick={() => navigate("/inicet-result")}
                  className="text-white bg-gradient-to-r from-blue-300 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 py-2 rounded-full transition-all duration-300 font-bold relative group cursor-pointer "
                >
                  INICET
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                </a>

                {/* Counsellings Dropdown */}
                <div className="relative" ref={counsellingDropdownRef}>
                  <button
                    onClick={() => setIsCounsellingOpen(!isCounsellingOpen)}
                    className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
                  >
                    Counsellings
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isCounsellingOpen ? "rotate-180" : ""
                      }`}
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  {isCounsellingOpen && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                      {counsellingDropdownItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            navigate(item.path);
                            setIsCounsellingOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 first:rounded-t-xl last:rounded-b-xl"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  onClick={() => navigate("/blog")}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
                >
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  onClick={() => navigate("/announcements")}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
                >
                  News
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="/careers"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
                >
                  Careers
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  onClick={() => navigate("/support")}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
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
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className=" p-2">
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
                  onClick={() => {
                    navigate("/inicet-result");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 font-bold text-center cursor-pointer shadow-lg mb-2 animate-pulse"
                >
                  🎉 INICET Results Out! Check Now
                </a>
                {/* Counsellings section in mobile */}
                <div className="px-3 py-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Counsellings
                  </p>
                  {counsellingDropdownItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

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
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
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

      <LightBackground />
      <WhyBelievers />
      <DataAdvantage />
      <FindCollegesSection />
      <CounsellingJourney />
      <FreeResourcesSection />
      <CorePromise />
      <FinalCTA />

      {/* FAQ Section */}
      {/* <section className="py-14 bg-white">
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
      </section> */}

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

              {/* Social Media Links */}
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
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/")}
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/support")}
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
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
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    NEET PG
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    NEET UG
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    INICET
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
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
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/terms")}
                    className="hover:text-white transition-colors hover:text-blue-400 cursor-pointer"
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
            <p className="text-xs mb-4">
              <span className="font-bold text-gray-300">
                Designed & Managed By:
              </span>{" "}
              <a
                href="https://believersdestination.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-400 hover:text-blue-300 underline"
              >
                Believers Destination Pvt Ltd
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
