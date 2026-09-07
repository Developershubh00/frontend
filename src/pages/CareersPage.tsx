import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Youtube, Instagram } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG =
  "https://cdn.dribbble.com/userupload/48941729/file/2ec6872e8b94c73379c7c8f545cba446.webp";
const WHY_IMG =
  "https://cdn.dribbble.com/userupload/48941728/file/f190ca645e7e496e8f2acd70346c7a80.jpg";

const REQUIREMENTS = [
  "MS / MD through NEET PG",
  "Passion for mentoring & counselling",
  "Strong communication & interpersonal skills",
  "Full-time commitment",
];

const QUESTIONS = [
  "Do you enjoy helping students?",
  "Can you have honest conversations with them?",
  "Do you understand the confusion that comes with NEET PG counselling?",
  "Can you guide someone without imposing your own choices on them?",
];

const CareersPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const heroImgRef = useRef(null);
  const listSectionRef = useRef(null);
  const listItemsRef = useRef([]);
  const whySectionRef = useRef(null);
  const whyImgRef = useRef(null);
  const whyTextRef = useRef(null);
  const questionRefs = useRef([]);
  const ctaSectionRef = useRef(null);
  const valuesRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  listItemsRef.current = [];
  questionRefs.current = [];

  const addListItemRef = (el) => {
    if (el && !listItemsRef.current.includes(el)) listItemsRef.current.push(el);
  };
  const addQuestionRef = (el) => {
    if (el && !questionRefs.current.includes(el)) questionRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Orchestrated hero entrance — the one big load moment
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
      )
        .fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 },
          "-=0.2",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ctaBtnRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          heroImgRef.current,
          { opacity: 0, scale: 1.08, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1 },
          "-=0.85",
        );

      // subtle scroll parallax tied to the hero image only
      gsap.to(heroImgRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Requirements list — coordinated slide-in as a group
      gsap.fromTo(
        listItemsRef.current,
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: listSectionRef.current, start: "top 75%" },
        },
      );

      // 3. Why Join — split reveal
      gsap.fromTo(
        whyImgRef.current,
        { opacity: 0, x: -36, scale: 1.03 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: whySectionRef.current, start: "top 72%" },
        },
      );
      gsap.fromTo(
        whyTextRef.current,
        { opacity: 0, x: 36 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: whySectionRef.current, start: "top 72%" },
        },
      );

      // 4. Self-reflection questions — a vertical bar draws in, then the line settles
      questionRefs.current.forEach((el) => {
        const bar = el.querySelector(".q-bar");
        const text = el.querySelector(".q-text");
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 82%" } })
          .fromTo(
            bar,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.45,
              ease: "power2.out",
              transformOrigin: "top",
            },
          )
          .fromTo(
            text,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45 },
            "-=0.15",
          );
      });

      // 5. Closing CTA
      gsap.fromTo(
        ctaSectionRef.current,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ctaSectionRef.current, start: "top 82%" },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.target === heroRef.current)
            setIsVisible(entry.isIntersecting);
          else if (entry.target === valuesRef.current)
            setValuesVisible(entry.isIntersecting);
          else if (entry.target === benefitsRef.current)
            setBenefitsVisible(entry.isIntersecting);
          else if (entry.target === impactRef.current)
            setImpactVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    [heroRef, valuesRef, benefitsRef, impactRef].forEach(
      (ref: React.RefObject<HTMLElement>) => {
        if (ref.current) observer.observe(ref.current);
      },
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fc] text-[#1d204b]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <img
              src="/media/logo4.png"
              alt="Logo"
              className="h-16 w-auto object-contain cursor-pointer"
              onClick={() => navigate("/")}
            />

            <div className="hidden md:flex items-center space-x-8 ml-auto">
              <a
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
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
              <a className="text-blue-600 font-semibold cursor-pointer">
                Careers
              </a>
              <a
                onClick={() => navigate("/support")}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group cursor-pointer"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-300 to-blue-700 hover:from-blue-300 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Log-In | Sign-Up
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  Home
                </a>
                <a
                  onClick={() => {
                    navigate("/blog");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  Blog
                </a>
                <a
                  onClick={() => {
                    navigate("/announcements");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  News
                </a>
                <a className="block px-3 py-2 text-blue-600 font-semibold cursor-pointer">
                  Careers
                </a>
                <a
                  onClick={() => {
                    navigate("/support");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                >
                  Contact Us
                </a>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-300 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold"
                >
                  Log-In | Sign-Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-10 py-20 md:py-28">
          <div>
            <span
              ref={badgeRef}
              className="inline-block text-sm font-semibold tracking-wide text-[#1767be] bg-[#e8f0fb] rounded-full px-4 py-1.5 mb-6"
            >
              CoreBTR's Trusted Career Counselling Partner
            </span>

            <h1
              ref={headlineRef}
              className="text-4xl md:text-6xl font-extrabold leading-[1.08]"
            >
              <span className="block">Careers at</span>
              <span className="block text-[#1767be]">
                Believers Consultancy
              </span>
            </h1>

            <p className="mt-4 text-lg text-[#1767be] font-semibold">
              Helping Medical Aspirants Make Confident Career Decisions
            </p>

            <p
              ref={subRef}
              className="mt-6 text-lg text-[#3f3f3f] leading-relaxed max-w-md"
            >
              At Believers Consultancy, we help medical aspirants make the right
              career and counselling decisions with the right guidance at the
              right time. We are now looking for doctors who can understand
              students, answer their concerns and help them make informed
              choices about their NEET PG journey.
            </p>

            <a
              ref={ctaBtnRef}
              href="https://docs.google.com/forms/d/e/1FAIpQLScwGDPtlPsSxXMCWOLFwzr8bKzY1cTnNh2OS392SA8sAxNeew/viewform"
              className="inline-block mt-8 bg-[#feb122] text-[#1d204b] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#e5a01d] transition-colors duration-200"
            >
              APPLY NOW
            </a>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl shadow-[#1d204b1a]">
              <img
                ref={heroImgRef}
                src={HERO_IMG}
                alt="Doctor mentoring a medical aspirant"
                className="w-full h-[420px] md:h-[520px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WE'RE HIRING — requirements */}
      <section
        ref={listSectionRef}
        className="mx-auto max-w-6xl px-6 md:px-10 py-16 md:py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2">
            <p className="text-[#1767be] font-semibold mb-2 tracking-wide">
              WE'RE HIRING
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              NEET PG COUNSELLORS
            </h2>
            <p className="mt-4 text-[#3f3f3f] font-medium">
              Who We're Looking For
            </p>
          </div>

          <ul className="md:col-span-3 flex flex-col gap-4">
            {REQUIREMENTS.map((item) => (
              <li
                key={item}
                ref={addListItemRef}
                className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-sm shadow-[#1d204b0d]"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1767be] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[#1d204b] font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY JOIN */}
      <section ref={whySectionRef} className="bg-[#eef3fb]">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div
            ref={whyImgRef}
            className="overflow-hidden rounded-2xl order-2 md:order-1"
          >
            <img
              src={WHY_IMG}
              alt="Believers Consultancy counselling team"
              className="w-full h-[360px] md:h-[440px] object-cover"
            />
          </div>

          <div ref={whyTextRef} className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Why Join Believers?
            </h2>
            <p className="mt-5 text-[#3f3f3f] leading-relaxed text-lg">
              Be a part of a team that works closely with medical aspirants and
              helps them make important career decisions with more clarity and
              confidence.
            </p>
            <p className="mt-4 text-[#1767be] font-semibold text-lg">
              Your experience as a doctor can help another medical aspirant
              choose the right path.
            </p>
          </div>
        </div>
      </section>

      {/* IS THIS ROLE RIGHT FOR YOU */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">
          Is this role right for you?
        </h2>
        <p className="text-center text-[#3f3f3f] mb-12">Ask yourself:</p>

        <div className="flex flex-col gap-6">
          {QUESTIONS.map((q, i) => (
            <div
              key={q}
              ref={addQuestionRef}
              className="flex items-stretch gap-5"
            >
              <span className="q-bar w-1 rounded-full bg-[#feb122]" />
              <p className="q-text text-lg md:text-xl text-[#1d204b] font-medium py-1">
                {q}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-[#3f3f3f] mt-12 text-lg">
          If your answer is yes, you could be a great fit for Believers.
        </p>
      </section>

      {/* CTA */}
      <section id="apply" ref={ctaSectionRef} className="bg-[#1d204b]">
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Interested in Joining Believers?
          </h2>
          <p className="mt-4 text-[#c7cbe6] font-semibold tracking-wide">
            FILL OUT THE APPLICATION FORM
          </p>
          <p className="mt-2 text-[#c7cbe6]">It takes just a few minutes.</p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScwGDPtlPsSxXMCWOLFwzr8bKzY1cTnNh2OS392SA8sAxNeew/viewform"
            className="inline-block mt-8 bg-[#feb122] text-[#1d204b] font-semibold px-10 py-3.5 rounded-lg hover:bg-[#e5a01d] transition-colors duration-200"
          >
            APPLY NOW
          </a>

          <p className="mt-5 text-sm text-[#8f94bd]">
            Your details are safe with us.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="w-auto h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden mb-4">
                <img
                  src="/media/logo4.png"
                  alt="Logo"
                  className="w-auto h-16 object-contain"
                />
              </div>
              <p className="text-xs font-bold text-gray-400 mb-4">
                Designed & Managed By: Believers Destination Pvt Ltd
              </p>
              <p className="text-gray-400 mb-4">
                Your ultimate guide to medical counselling. 100% free access.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://www.youtube.com/@BelieversConsultancy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-red-600 rounded-lg p-3 transition-all hover:scale-110"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/believers.medcounselling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg p-3 transition-all hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">QUICK LINKS</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    onClick={() => navigate("/")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/blog")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Blog
                  </a>
                </li>
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
                    onClick={() => navigate("/support")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Contact Us
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
                    NEET UG
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    INICET
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    DNB PDCET
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

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2026 Believers Destination Pvt Ltd. All rights reserved.
            </p>
            <p className="text-xs mt-2">
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
    </div>
  );
};

export default CareersPage;
