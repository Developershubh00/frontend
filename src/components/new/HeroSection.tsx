import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./HeroSection.css";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

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
          ".hero-content h3",
          {
            opacity: 0,
            y: 35,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-content h4",
          {
            opacity: 0,
            y: 35,
            duration: 0.8,
          },
          "-=0.45",
        )
        .from(
          ".hero-content p",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.45",
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.4",
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
          <a href="#predict-college" className="primary-btn">
            Predict My College
          </a>

          <a href="#free-counselling" className="secondary-btn">
            Book 1:1 Counselling
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
