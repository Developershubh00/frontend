import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import "./FinalCTA.css";

const FinalCTA: React.FC = () => {
  return (
    <section className="fcta-section">
      <div className="fcta-container">
        <div className="fcta-panel">
          {/* Decorative Elements */}
          <span className="fcta-circle fcta-circle-one"></span>
          <span className="fcta-circle fcta-circle-two"></span>

          <span className="fcta-dot fcta-dot-one"></span>
          <span className="fcta-dot fcta-dot-two"></span>
          <span className="fcta-dot fcta-dot-three"></span>

          {/* Top Accent */}
          <div className="fcta-accent">
            <span></span>
            <Sparkles size={15} strokeWidth={2} />
            <span></span>
          </div>

          {/* Main Content */}
          <div className="fcta-content">
            <h2 className="fcta-title">Your Preparation Got You Here.</h2>

            <h3 className="fcta-subtitle">
              Let the Right Guidance Take You Forward.
            </h3>

            {/* Trust Line */}
            <div className="fcta-trust">
              <span>Reliable Data.</span>
              <i></i>
              <span>Transparent Guidance.</span>
              <i></i>
              <span>Genuine Mentorship.</span>
            </div>

            {/* CTA */}
            <a
              href="#counselling"
              className="fcta-button"
              aria-label="Book Your Free Counselling"
            >
              <span>Book Your 1:1 Counselling</span>

              <span className="fcta-arrow">
                <ArrowRight size={18} strokeWidth={2.2} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
