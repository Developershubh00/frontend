import React, { useState, useEffect, useRef } from "react";
import {
  UserCheck,
  CheckCircle,
  GraduationCap,
  Info,
  Scale,
  AlertTriangle,
  FileText,
  Clock,
  Zap,
  FileCheck,
} from "lucide-react";
import "./TermsConditions.css";
import Terms from "../../assets/images/terms.svg";
import SEO from "../../seo/SEO";
import { pageSEO } from "../../seo/pageSEO";

function TermsConditions() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const seo = pageSEO["/terms"];

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
      icon: <UserCheck className="tc-icon" />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Believers Consultancy, you accept and agree to be bound by these terms",
        "These terms apply to all users of our platform and services",
        "If you disagree with any part of these terms, please do not use our services",
        "Continued use of our platform constitutes acceptance of any updated terms",
      ],
    },
    {
      num: "02",
      icon: <CheckCircle className="tc-icon" />,
      title: "Free Services",
      content: [
        "All our counselling guidance, tools, and resources are completely free to use",
        "No subscription fees, hidden charges, or premium plans are required",
        "Free access includes: cut-off analysis, college information, choice list builders, and expert guidance",
        "We reserve the right to maintain this free service model and may introduce optional paid features in the future with clear disclosure",
      ],
    },
    {
      num: "03",
      icon: <GraduationCap className="tc-icon" />,
      title: "Platform Usage",
      content: [
        "You must provide accurate information about your academic credentials and counselling details",
        "Use our platform responsibly and in accordance with applicable laws",
        "Do not attempt to access unauthorized areas or interfere with platform functionality",
        "Respect other users and maintain appropriate conduct in all interactions",
      ],
    },
    {
      num: "04",
      icon: <Info className="tc-icon" />,
      title: "Information Accuracy",
      content: [
        "We strive to provide accurate and up-to-date counselling information",
        "All data is sourced from official authorities and verified through multiple channels",
        "However, counselling processes can change rapidly, and users should verify critical information",
        "We are not liable for decisions made based solely on our guidance without official verification",
      ],
    },
    {
      num: "05",
      icon: <Scale className="tc-icon" />,
      title: "Limitation of Liability",
      content: [
        "Our services are provided 'as is' without warranties of any kind",
        "We are not responsible for counselling outcomes or admission results",
        "Users are solely responsible for their counselling choices and decisions",
        "Our liability is limited to the maximum extent permitted by law",
      ],
    },
    {
      num: "06",
      icon: <AlertTriangle className="tc-icon" />,
      title: "User Responsibilities",
      content: [
        "Verify all information independently before making counselling decisions",
        "Keep your account credentials secure and do not share with others",
        "Report any technical issues or inaccuracies you encounter",
        "Use our guidance as a supplement to, not a replacement for, official counselling procedures",
      ],
    },
    {
      num: "07",
      icon: <FileText className="tc-icon" />,
      title: "Intellectual Property",
      content: [
        "All content on our platform is owned by Believers Destination",
        "You may use our tools and information for personal counselling purposes only",
        "Reproduction, distribution, or commercial use of our content requires written permission",
        "User-generated content remains your property but grants us usage rights for platform improvement",
      ],
    },
    {
      num: "08",
      icon: <Clock className="tc-icon" />,
      title: "Modifications and Updates",
      content: [
        "We may update these terms periodically to reflect service improvements or legal requirements",
        "Significant changes will be communicated through email or platform notifications",
        "Continued use after changes constitutes acceptance of the updated terms",
        "You can always access the current version of our terms on our website",
      ],
    },
  ];

  return (
    <div>
      <SEO {...seo} />

      <div className="tc-page">
        {/* Hero */}
        <header className="tc-hero">
          <div className="tc-hero-blob tc-hero-blob--1" />
          <div className="tc-hero-blob tc-hero-blob--2" />
          <div className={`tc-hero-inner ${isVisible ? "tc-is-visible" : ""}`}>
            <div className="tc-hero-copy">
              <h1 className="tc-h1">Terms & Conditions</h1>
              <p className="tc-lead">
                Clear, fair terms that protect both you and us. Everything you
                need to know about using our platform, effective from January
                2025.
              </p>
            </div>

            <div className="tc-hero-img">
              <img src={Terms} alt="" />
            </div>
          </div>
        </header>

        {/* Trust strip */}
        <section className="tc-trust">
          <div className="tc-trust-inner">
            <div className="tc-trust-card">
              <Zap className="tc-trust-icon" />
              <h3 className="tc-trust-title">Always Free</h3>
              <p className="tc-trust-desc">
                No hidden costs or surprise charges
              </p>
            </div>
            <div className="tc-trust-card">
              <Scale className="tc-trust-icon" />
              <h3 className="tc-trust-title">Fair Terms</h3>
              <p className="tc-trust-desc">Clear and reasonable conditions</p>
            </div>
            <div className="tc-trust-card">
              <GraduationCap className="tc-trust-icon" />
              <h3 className="tc-trust-title">Student-First</h3>
              <p className="tc-trust-desc">
                Terms designed with students in mind
              </p>
            </div>
          </div>
        </section>

        {/* Main content: TOC + articles */}
        <section className="tc-content">
          <div className="tc-content-inner">
            <aside className="tc-toc">
              <span className="tc-toc-label">On this page</span>
              <nav>
                <ul className="tc-toc-list">
                  {sections.map((section, index) => (
                    <li key={section.num}>
                      <a
                        href={`#article-${section.num}`}
                        className={`tc-toc-link ${activeSection === index ? "tc-toc-link--active" : ""}`}
                      >
                        <span className="tc-toc-num">{section.num}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="tc-articles">
              {sections.map((section, index) => (
                <article
                  key={section.num}
                  id={`article-${section.num}`}
                  data-index={index}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="tc-article"
                >
                  <div className="tc-article-head">
                    <div className="tc-article-icon">{section.icon}</div>
                    <h2 className="tc-h2">{section.title}</h2>
                  </div>
                  <ul className="tc-article-list">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="tc-article-item">
                        <span className="tc-item-marker" />
                        <span className="tc-para">{item}</span>
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

export default TermsConditions;
