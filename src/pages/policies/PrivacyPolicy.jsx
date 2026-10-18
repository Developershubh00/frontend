import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Lock,
  Eye,
  Users,
  Database,
  Cookie,
  CheckCircle,
} from "lucide-react";
import "./PrivacyPolicy.css";
import PP from "../../assets/images/pp.svg";
import SEO from "../../seo/SEO";
import { pageSEO } from "../../seo/pageSEO";

function PrivacyPolicy() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const seo = pageSEO["/privacy"];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setActiveSection(idx);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      num: "01",
      icon: <Database className="pp-icon" />,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and educational details when you register",
        "Usage Data: How you interact with our platform, pages visited, and features used",
        "Device Information: Browser type, operating system, and IP address for security purposes",
        "Academic Data: NEET scores, preferences, and counselling choices to provide personalized guidance",
      ],
    },
    {
      num: "02",
      icon: <Eye className="pp-icon" />,
      title: "How We Use Your Information",
      content: [
        "Provide personalized counselling guidance and college recommendations",
        "Send important updates about counselling schedules, deadlines, and opportunities",
        "Improve our platform features and user experience",
        "Ensure platform security and prevent fraudulent activities",
        "Respond to your queries and provide customer support",
      ],
    },
    {
      num: "03",
      icon: <Shield className="pp-icon" />,
      title: "Data Protection",
      content: [
        "We use industry-standard encryption to protect your personal data",
        "Access to your information is restricted to authorized personnel only",
        "Regular security audits and updates to maintain data integrity",
        "We do not sell, rent, or share your personal information with third parties",
        "Your academic and counselling data is kept strictly confidential",
      ],
    },
    {
      num: "04",
      icon: <Cookie className="pp-icon" />,
      title: "Cookies and Tracking",
      content: [
        "We use cookies to enhance your browsing experience and remember your preferences",
        "Analytics cookies help us understand user behavior and improve our services",
        "You can disable cookies in your browser settings, though some features may be limited",
        "No personal information is stored in cookies without your consent",
      ],
    },
    {
      num: "05",
      icon: <Users className="pp-icon" />,
      title: "Sharing Information",
      content: [
        "We do not share your personal information with external parties for marketing",
        "Anonymous, aggregated data may be used for research and platform improvement",
        "We may disclose information if required by law or to protect our legal rights",
        "Your consent will be obtained before sharing data with educational institutions",
      ],
    },
    {
      num: "06",
      icon: <Lock className="pp-icon" />,
      title: "Your Rights",
      content: [
        "Access: Request a copy of the personal information we hold about you",
        "Correction: Ask us to correct any inaccurate or incomplete information",
        "Deletion: Request deletion of your personal data (subject to legal requirements)",
        "Portability: Request your data in a portable format",
        "Withdrawal: Withdraw consent for data processing at any time",
      ],
    },
  ];

  return (
    <div>
      <SEO {...seo} />

      <div className="pp-page">
        {/* Hero */}
        <header className="pp-hero">
          <div className="pp-hero-blob pp-hero-blob--1" />
          <div className="pp-hero-blob pp-hero-blob--2" />

          <div className={`pp-hero-inner ${isVisible ? "pp-is-visible" : ""}`}>
            <div className="pp-hero-copy">
              <h1 className="pp-h1">Privacy Policy</h1>

              <p className="pp-lead">
                This document explains, in plain terms, what information we
                collect from students preparing for NEET counselling, how we use
                it, and the rights you hold over it.
              </p>
            </div>

            <div className="pp-hero-img">
              <img src={PP} alt="Privacy Policy" />
            </div>
          </div>
        </header>

        {/* Trust Strip */}
        <section className="pp-trust">
          <div className="pp-trust-inner">
            <div className="pp-trust-card">
              <CheckCircle className="pp-trust-icon" />
              <h3 className="pp-trust-title">100% Free</h3>
              <p className="pp-trust-desc">
                No hidden charges or premium plans
              </p>
            </div>

            <div className="pp-trust-card">
              <Lock className="pp-trust-icon" />
              <h3 className="pp-trust-title">Secure</h3>
              <p className="pp-trust-desc">
                Your data is encrypted and protected
              </p>
            </div>

            <div className="pp-trust-card">
              <Users className="pp-trust-icon" />
              <h3 className="pp-trust-title">Confidential</h3>
              <p className="pp-trust-desc">Never shared without your consent</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pp-content">
          <div className="pp-content-inner">
            <aside className="pp-toc">
              <span className="pp-toc-label">On this page</span>

              <nav>
                <ul className="pp-toc-list">
                  {sections.map((section, index) => (
                    <li key={section.num}>
                      <a
                        href={`#article-${section.num}`}
                        className={`pp-toc-link ${
                          activeSection === index ? "pp-toc-link--active" : ""
                        }`}
                      >
                        <span className="pp-toc-num">{section.num}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="pp-articles">
              {sections.map((section, index) => (
                <article
                  key={section.num}
                  id={`article-${section.num}`}
                  data-index={index}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="pp-article"
                >
                  <div className="pp-article-head">
                    <div className="pp-article-icon">{section.icon}</div>

                    <h2 className="pp-h2">{section.title}</h2>
                  </div>

                  <ul className="pp-article-list">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="pp-article-item">
                        <span className="pp-item-marker" />
                        <span className="pp-para">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
