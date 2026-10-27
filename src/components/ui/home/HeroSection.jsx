import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./HeroSection.css";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-content h1", {
          opacity: 0,
          y: 60,
          duration: 1,
        })
        .from(
          ".hero-content h2",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=0.55",
        )
        .from(
          ".hero-content p",
          {
            opacity: 0,
            y: 35,
            duration: 0.9,
          },
          "-=0.45",
        )
        .from(
          ".hero-content p b",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.45",
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.35",
        )
        .from(
          ".hero-result",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.35",
        )
        .from(
          ".hero-college",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.35",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-content">
        <h1>
          CoreBTR’s Trusted
          <br />
          Career Counselling Partner
        </h1>

        <h2>
          Your NEET PG Exam Is Over
          <br />
          Now Every Choice Matters
        </h2>

        <p>
          Your rank doesn't decide your future.
          <br />
          Your counselling decisions do.
          <br />
          <br />
          Helping medical aspirants make confident career decisions through:
          <br />
          <b>Genuine Mentorship | Transparent Guidance | Reliable Data</b>
        </p>

        <div className="hero-actions">
          <a href="/predictor/neet-pg" className="primary-btn">
            Predict My College
          </a>

          <a href="https://wa.me/919211724969" className="secondary-btn">
            Share Your Query With Us
          </a>
        </div>

        <div className="hero-result">
          <NavLink
            className="hero-result-text"
            to="https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/10/202610241746468472.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            NEET-PG Counselling Seats Allotment -2026 Round- 1
            <span className="hero-new-badge">NEW</span>
          </NavLink>
        </div>

        <div className="hero-college">
          <a
            href="https://drive.google.com/file/d/14DO7qTmqdRy7FSiuTVNsHswbc9WahxYq/view"
            target="_blank"
          >
            DNB/MS Orthopedic Colleges List
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
