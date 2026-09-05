import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import "./EverythingSection.css";

const questions = [
  "Can I get MD Medicine?",
  "Can I get Radiology?",
  "Should I wait for Round 2?",
  "Should I choose DNB?",
  "Should I upgrade?",
  "Will I get a Government Seat?",
];

const EverythingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`everything-section ${
        isVisible ? "everything-section-visible" : ""
      }`}
    >
      <div className="everything-container">
        {/* =========================================
            HEADER
        ========================================= */}

        <header className="everything-header">
          <h2 className="everything-title">
            After NEET PG, the questions begin…
          </h2>
        </header>

        {/* =========================================
            QUESTIONS
        ========================================= */}

        <div className="everything-list">
          {questions.map((question, index) => (
            <div
              className="everything-row"
              key={question}
              style={
                {
                  "--row-delay": `${0.1 + index * 0.08}s`,
                } as React.CSSProperties
              }
            >
              <div className="everything-row-content">
                {/* Number */}

                <span className="everything-question-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Question */}

                <span className="everything-question">{question}</span>

                {/* Arrow */}

                <span className="everything-arrow" aria-hidden="true">
                  <ArrowRight size={19} strokeWidth={1.7} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================
            BOTTOM MESSAGE
        ========================================= */}

        <div className="everything-bottom">
          <div className="everything-bottom-text">
            <p>These are not just counselling questions.</p>

            <strong>They are career decisions.</strong>
          </div>

          <span className="everything-bottom-accent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default EverythingSection;
