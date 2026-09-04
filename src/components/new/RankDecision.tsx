import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RankDecision.css";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  num: string;
  tag: string;
  title: string;
  desc: string;
}

const processSteps: ProcessStep[] = [
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

const RankDecision: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".rank-heading",
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".rank-heading",
            start: "top 82%",
          },
        },
      );

      // Step animation
      gsap.fromTo(
        ".rank-step",
        {
          autoAlpha: 0,
          y: 25,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".rank-track",
            start: "top 80%",
          },
        },
      );

      // Connecting line animation
      gsap.fromTo(
        ".rank-line-fill",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".rank-track",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="rank-decision" ref={sectionRef}>
      <div className="rank-container">
        <h2 className="rank-heading">What Believers Helps You Do</h2>
        <h3 className="rank-sub-heading">From Rank to the Right Decision.</h3>

        <div className="rank-track">
          <span className="rank-line" />
          <span className="rank-line-fill" />

          <div className="rank-grid">
            {processSteps.map((step) => (
              <div className="rank-step" key={step.num}>
                <span className="rank-number">{step.num}</span>

                <span className="rank-tag">{step.tag}</span>

                <h3 className="rank-title">{step.title}</h3>

                <p className="rank-description">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankDecision;
