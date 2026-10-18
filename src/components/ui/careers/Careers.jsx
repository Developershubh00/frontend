import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Careers.css";

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

const Careers = () => {
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
  const valuesRef = useRef(null);
  const benefitsRef = useRef(null);
  const impactRef = useRef(null);

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
      (entries) => {
        entries.forEach((entry) => {
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

    [heroRef, valuesRef, benefitsRef, impactRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="careers-page">
      {/* HERO */}
      <section ref={heroRef} className="careers-hero-section">
        <div className="careers-hero-container">
          <div>
            <span ref={badgeRef} className="careers-hero-badge">
              CoreBTR's Trusted Career Counselling Partner
            </span>

            <h1 ref={headlineRef} className="careers-hero-heading">
              <span className="careers-hero-heading-line">Careers at</span>
              <span className="careers-hero-heading-line careers-hero-heading-accent">
                Believers Consultancy
              </span>
            </h1>

            <p className="careers-hero-subheading">
              Helping Medical Aspirants Make Confident Career Decisions
            </p>

            <p ref={subRef} className="careers-hero-description">
              At Believers Consultancy, we help medical aspirants make the right
              career and counselling decisions with the right guidance at the
              right time. We are now looking for doctors who can understand
              students, answer their concerns and help them make informed
              choices about their NEET PG journey.
            </p>

            <a
              ref={ctaBtnRef}
              href="https://docs.google.com/forms/d/e/1FAIpQLScwGDPtlPsSxXMCWOLFwzr8bKzY1cTnNh2OS392SA8sAxNeew/viewform"
              className="careers-hero-cta"
            >
              APPLY NOW
            </a>
          </div>

          <div className="careers-hero-image-col">
            <div className="careers-hero-image-wrapper">
              <img
                ref={heroImgRef}
                src={HERO_IMG}
                alt="Doctor mentoring a medical aspirant"
                className="careers-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WE'RE HIRING — requirements */}
      <section ref={listSectionRef} className="careers-requirements-section">
        <div className="careers-requirements-grid">
          <div className="careers-requirements-intro">
            <p className="careers-requirements-label">WE'RE HIRING</p>
            <h2 className="careers-requirements-heading">
              NEET PG COUNSELLORS
            </h2>
            <p className="careers-requirements-subtext">
              Who We're Looking For
            </p>
          </div>

          <ul className="careers-requirements-list">
            {REQUIREMENTS.map((item) => (
              <li
                key={item}
                ref={addListItemRef}
                className="careers-requirement-item"
              >
                <span className="careers-requirement-icon">
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
                <span className="careers-requirement-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY JOIN */}
      <section ref={whySectionRef} className="careers-why-section">
        <div className="careers-why-container">
          <div ref={whyImgRef} className="careers-why-image-wrapper">
            <img
              src={WHY_IMG}
              alt="Believers Consultancy counselling team"
              className="careers-why-image"
            />
          </div>

          <div ref={whyTextRef} className="careers-why-content">
            <h2 className="careers-why-heading">Why Join Believers?</h2>
            <p className="careers-why-description">
              Be a part of a team that works closely with medical aspirants and
              helps them make important career decisions with more clarity and
              confidence.
            </p>
            <p className="careers-why-highlight">
              Your experience as a doctor can help another medical aspirant
              choose the right path.
            </p>
          </div>
        </div>
      </section>

      {/* IS THIS ROLE RIGHT FOR YOU */}
      <section className="careers-reflect-section">
        <h2 className="careers-reflect-heading">Is this role right for you?</h2>
        <p className="careers-reflect-subtext">Ask yourself:</p>

        <div className="careers-questions-list">
          {QUESTIONS.map((q) => (
            <div key={q} ref={addQuestionRef} className="careers-question-item">
              <span className="careers-q-bar"></span>
              <p className="careers-q-text">{q}</p>
            </div>
          ))}
        </div>

        <p className="careers-reflect-footer">
          If your answer is yes, you could be a great fit for Believers.
        </p>
      </section>

      {/* CTA */}
      <section id="apply" ref={ctaSectionRef} className="careers-cta-section">
        <div className="careers-cta-container">
          <h2 className="careers-cta-heading">
            Interested in Joining Believers?
          </h2>
          <p className="careers-cta-label">FILL OUT THE APPLICATION FORM</p>
          <p className="careers-cta-subtext">It takes just a few minutes.</p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScwGDPtlPsSxXMCWOLFwzr8bKzY1cTnNh2OS392SA8sAxNeew/viewform"
            className="careers-cta-button"
          >
            APPLY NOW
          </a>

          <p className="careers-cta-footnote">Your details are safe with us.</p>
        </div>
      </section>
    </div>
  );
};

export default Careers;
