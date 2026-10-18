import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MentorSection.css";

gsap.registerPlugin(ScrollTrigger);

const mentors = [
  {
    name: "Dr. Zainab Vora",
    image:
      "https://cdn.dribbble.com/userupload/47148402/file/210d605b7a0fe225a1cd8f1a658ca919.png",
  },
  {
    name: "Dr. Ravi Sharma",
    image:
      "https://cdn.dribbble.com/userupload/47148400/file/059d9e926eea42733d6020c1abea7cdd.png",
  },
  {
    name: "Dr. Apurv Mehra",
    image:
      "https://cdn.dribbble.com/userupload/47148401/file/1007fcbde4afe5e428766c261f30b946.png",
  },
];

const MentorSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const ctx = gsap.context(() => {
        // Header animation
        gsap.from(".mentor-header-left", {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mentor-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".mentor-header-right", {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mentor-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Section heading
        gsap.from(".mentor-section-heading", {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mentor-section-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Mentor cards
        gsap.from(".mentor-grid-item", {
          y: 100,
          opacity: 0,
          scale: 0.92,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mentor-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Dividers
        gsap.from(".mentor-divider", {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".mentor-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Bottom intro
        gsap.from(".mentor-bottom-intro", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mentor-bottom",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Bottom statements
        gsap.from(".mentor-statements p", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mentor-statements",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }, section);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section className="mentor-section" ref={sectionRef}>
      <div className="mentor-header">
        <div className="mentor-header-left">
          <h2 className="mentor-heading">
            Career Decisions Need <br />
            More Than Data.
          </h2>
        </div>

        <div className="mentor-header-right">
          <p className="mentor-description">
            Rank predictors, cut-offs and college
            <br />
            information can tell you what is possible.
            <br />
            But they cannot always tell you:
          </p>

          <h3 className="mentor-sub-heading">What is right for YOU.</h3>
        </div>
      </div>

      <div className="mentor-container">
        <div className="mentor-content">
          <div className="mentor-section-heading">
            <h3>Guidance &amp; Mentorship From</h3>
          </div>

          <div className="mentor-grid">
            {mentors.map((mentor, index) => (
              <div className="mentor-grid-item" key={mentor.name}>
                {index !== 0 && <div className="mentor-divider">×</div>}

                <div className="mentor-card">
                  <div className="mentor-image-wrap">
                    <div className="mentor-gradient"></div>

                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="mentor-image"
                    />
                  </div>

                  <h4>{mentor.name}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="mentor-bottom">
            <p className="mentor-bottom-intro">
              Along with our experienced career counselling team.
            </p>

            <div className="mentor-statements">
              <p>People who understand the journey.</p>
              <p>People who understand the choices.</p>
              <p>People who genuinely care about getting them right.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
