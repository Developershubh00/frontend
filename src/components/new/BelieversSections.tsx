import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BelieversSections.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   Small inline icons (kept local so the component is self
   contained — no external icon package required)
--------------------------------------------------------- */

const ArrowIcon = () => (
  <svg
    className="icon-arrow"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconShield = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M13 3l8 3v6c0 6-3.6 9.4-8 11-4.4-1.6-8-5-8-11V6l8-3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 13l2.3 2.3L17 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconLayers = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M13 3l10 5.5L13 14 3 8.5 13 3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M3 13.5L13 19l10-5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 18.5L13 24l10-5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconHandshake = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 11l4.5-4.5a2 2 0 012.8 0l1.2 1.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M23 11l-4.5-4.5a2 2 0 00-2.8 0L9.5 12.7a1.6 1.6 0 002.2 2.3l2.6-2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14.5l1.6 1.6a1.6 1.6 0 002.3-2.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 11v6.5M23 11v6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconPerson = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="13" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4.5 22c1.4-4.6 5-7 8.5-7s7.1 2.4 8.5 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------------------------------------------------------
   Content data
--------------------------------------------------------- */

const processSteps = [
  {
    num: "01",
    tag: "UNDERSTAND",
    title: "Your Rank & Realistic Options",
    desc: "Previous-year closing ranks, cut-offs and realistic possibilities.",
  },
  {
    num: "02",
    tag: "EVALUATE",
    title: "Colleges & Branches",
    desc: "Compare what each option actually means for your career.",
  },
  {
    num: "03",
    tag: "PLAN",
    title: "Your Counselling Strategy",
    desc: "AIQ, State counselling, quotas, upgrades and preference planning.",
  },
  {
    num: "04",
    tag: "DECIDE",
    title: "With Confidence",
    desc: "Move forward with clarity — not confusion or guesswork.",
  },
];

const whyList = [
  "Comprehensive counselling data",
  "Previous-year closing ranks",
  "AIQ & State counselling insights",
  "College-specific information",
  "Personalised counselling strategies",
  "Transparent, student-first guidance",
];

const dataList = [
  "Previous-year closing ranks",
  "Round-wise seat movement",
  "AIQ & State counselling trends",
  "Seat matrix",
  "College preferences",
  "Fee structures",
  "Bond & service obligations",
  "Stipend information",
];

const searchFilters = ["AIR", "Category", "State", "Preferred Branch", "Quota"];

const journeySteps = [
  "Exam",
  "Result",
  "Rank Analysis",
  "College Prediction",
  "Choice Filling",
  "Round 1",
  "Upgrade",
  "Round 2",
  "Mop-up",
  "Admission",
];

const resourcesList = [
  "Choice Filling Guide",
  "Counselling Calendar",
  "Previous-Year Seat Matrix",
  "College Fee Structure",
  "Bond Information",
  "State-wise Counselling PDFs",
];

const promiseItems = [
  {
    icon: <IconShield />,
    title: "RELIABLE DATA",
    desc: "Decisions backed by information you can trust.",
  },
  {
    icon: <IconLayers />,
    title: "TRANSPARENT GUIDANCE",
    desc: "No hidden agendas. No one-size-fits-all answers.",
  },
  {
    icon: <IconHandshake />,
    title: "GENUINE MENTORSHIP",
    desc: "Real people. Real conversations. Guidance that considers your journey.",
  },
  {
    icon: <IconPerson />,
    title: "1:1 PERSONALISED COUNSELLING",
    desc: "Because your rank is yours.\nYour priorities are yours.\nAnd your decision should be yours.",
  },
];

/* ---------------------------------------------------------
   Component
--------------------------------------------------------- */

const BelieversSections: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const root = self.selector!;

      // Generic reveal: heading / paragraph blocks fade & rise into place
      root(".reveal").forEach((el) => {
        gsap.fromTo(
          el as Element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 82%",
            },
          },
        );
      });

      // Staggered groups (lists, step cards, resource items, promise cards)
      root(".reveal-group").forEach((group) => {
        const items = (group as Element).querySelectorAll(".reveal-item");
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: group as Element,
              start: "top 80%",
            },
          },
        );
      });

      // The connecting line behind the 01–04 process steps draws in as
      // the section scrolls through view — a single orchestrated moment
      // tied to the "rank to decision" journey metaphor.
      root(".process-line-fill").forEach((line) => {
        gsap.fromTo(
          line as Element,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: (line as Element).closest(".process-track"),
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );
      });

      // Journey chain: nodes light up in sequence as the section enters
      root(".journey-track").forEach((track) => {
        const nodes = (track as Element).querySelectorAll(".journey-node");
        gsap.fromTo(
          nodes,
          { autoAlpha: 0.25, scale: 0.85 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: "power1.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: track as Element,
              start: "top 78%",
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="believers" ref={rootRef}>
      {/* ---- Process ---- */}
      <section className="b-section process-section">
        <h2 className="b-heading reveal">From Rank to the Right Decision.</h2>

        <div className="process-track">
          <span className="process-line" />
          <span className="process-line-fill" />
          <div className="process-grid reveal-group">
            {processSteps.map((step) => (
              <div className="process-step reveal-item" key={step.num}>
                <span className="process-num">{step.num}</span>
                <span className="process-tag">{step.tag}</span>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Why Believers ---- */}
      <section className="b-section why-section">
        <div className="why-grid">
          <div className="why-copy">
            <h2 className="b-heading reveal">
              Medical Career Decisions Need More Than Data.
            </h2>
            <p className="b-subheading reveal">Our guidance combines:</p>

            <ul className="b-list reveal-group">
              {whyList.map((item) => (
                <li className="b-list-item reveal-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="why-statement reveal">
            <p className="b-para">Data can show you the options.</p>
            <p className="b-para b-para--strong">Guidance helps you choose.</p>
            <button className="b-cta" type="button">
              Talk to a Counsellor
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {/* ---- Data Advantage ---- */}
      <section className="b-section data-section">
        <h2 className="b-heading reveal">Reliable Data. Better Decisions.</h2>
        <p className="b-para reveal">
          Every recommendation is supported by data, analysis and experience.
        </p>
        <p className="b-subheading reveal">We analyse:</p>

        <ul className="b-list b-list--two-col reveal-group">
          {dataList.map((item) => (
            <li className="b-list-item reveal-item" key={item}>
              {item}
            </li>
          ))}
        </ul>

        <div className="data-statement reveal">
          <p className="b-para">Data tells you where you can get a seat.</p>
          <p className="b-para">Expertise helps you choose the right one.</p>
          <p className="b-para b-para--strong">
            At Believers, we bring both together.
          </p>
        </div>

        <button className="b-cta reveal" type="button">
          Explore Counselling Insights
          <ArrowIcon />
        </button>
      </section>

      {/* ---- Find Colleges ---- */}
      <section className="b-section find-section">
        <div className="find-panel reveal">
          <h2 className="b-heading">Find Your Realistic College Options</h2>
          <p className="b-subheading">Search by:</p>

          <div className="filter-row">
            {searchFilters.map((filter, i) => (
              <React.Fragment key={filter}>
                <span className="filter-chip">{filter}</span>
                {i < searchFilters.length - 1 && (
                  <span className="filter-divider" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="b-para">
            Discover realistic college options based on your rank and
            preferences.
          </p>

          <button className="b-cta" type="button">
            Explore Colleges
            <ArrowIcon />
          </button>
        </div>
      </section>

      {/* ---- Counselling Journey ---- */}
      <section className="b-section journey-section">
        <h2 className="b-heading reveal">
          You Don&rsquo;t Have to Figure It Out Alone.
        </h2>

        <div className="journey-track">
          {journeySteps.map((step, i) => (
            <React.Fragment key={step}>
              <span className="journey-node">{step}</span>
              {i < journeySteps.length - 1 && (
                <span className="journey-arrow" aria-hidden="true">
                  <ArrowIcon />
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="b-para reveal">
          Believers is here to help you understand, evaluate and decide.
        </p>
      </section>

      {/* ---- Free Resources ---- */}
      <section className="b-section resources-section">
        <h2 className="b-heading reveal">
          Everything You Need Before Counselling Begins.
        </h2>

        <ul className="b-list b-list--two-col reveal-group">
          {resourcesList.map((item) => (
            <li className="b-list-item reveal-item" key={item}>
              {item}
            </li>
          ))}
        </ul>

        <button className="b-cta reveal" type="button">
          Explore Free Resources
          <ArrowIcon />
        </button>

        <p className="b-note reveal">
          Implementation note: Free tools and resources should be cross-checked
          and confirmed before website go-live.
        </p>
      </section>

      {/* ---- Core Promise ---- */}
      <section className="b-section promise-section">
        <h2 className="b-heading reveal">What We Stand For</h2>

        <div className="promise-grid reveal-group">
          {promiseItems.map((item) => (
            <div className="promise-card reveal-item" key={item.title}>
              <span className="promise-icon">{item.icon}</span>
              <h3 className="promise-title">{item.title}</h3>
              <p className="promise-desc">
                {item.desc.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < item.desc.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="b-section final-section">
        <h2 className="b-heading reveal">Your Preparation Got You Here.</h2>
        <p className="b-subheading reveal">
          Let the Right Guidance Take You Forward.
        </p>
        <p className="b-para reveal">
          Reliable Data. Transparent Guidance. Genuine Mentorship.
        </p>

        <button className="b-cta" type="button">
          Book Your Free Counselling
          <ArrowIcon />
        </button>
      </section>
    </div>
  );
};

export default BelieversSections;
