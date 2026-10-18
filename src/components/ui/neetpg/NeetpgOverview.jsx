import React, { useEffect, useRef, useState } from "react";
import { Stethoscope, ShieldCheck, Building2, MapPin } from "lucide-react";
import "./NeetpgOverview.css";

const rounds = [
  { id: "01", label: "Round 1" },
  { id: "02", label: "Round 2" },
  { id: "03", label: "Round 3" },
  { id: "04", label: "Stray Round" },
];

const roundSteps = ["Choice Filling", "Seat Allotment", "Joining"];

const admissionFactors = [
  "Rank",
  "Choice of Subject",
  "College Preference",
  "Category",
];

function NeetpgOverview() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`pg-overview-section ${visible ? "is-visible" : ""}`}
    >
      <div className="pg-overview-glow pg-overview-glow-blue" />
      <div className="pg-overview-glow pg-overview-glow-amber" />

      <div className="pg-overview-container">
        <div className="pg-overview-hero">
          <span className="pg-overview-eyebrow">Counselling Guide </span>
          <h2 className="pg-overview-heading">NEET PG Overview</h2>
          <p className="pg-overview-subdesc">
            Discover everything you need to know about NEET PG and plan your
            medical career with confidence.
          </p>
        </div>

        <div className="pg-overview-info-grid">
          <div
            className="pg-overview-info-card"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="pg-overview-info-icon">
              <Stethoscope size={22} />
            </div>
            <h3 className="pg-overview-info-title">What the exam is</h3>
            <p className="pg-overview-info-desc">
              NEET PG is the gateway for postgraduate medical courses like MD,
              MS, and PG Diploma in India. It's held annually and is essential
              for any MBBS graduate who wants to pursue a specialization in
              clinical or non-clinical fields.
            </p>
          </div>

          <div
            className="pg-overview-info-card"
            style={{ transitionDelay: "180ms" }}
          >
            <div className="pg-overview-info-icon">
              <ShieldCheck size={22} />
            </div>
            <h3 className="pg-overview-info-title">
              Who conducts it &amp; who's eligible
            </h3>
            <p className="pg-overview-info-desc">
              Conducted by the National Board of Examinations (NBE), NEET PG is
              open to candidates who have completed or are completing their MBBS
              internship within a specified date. It's a critical step in a
              doctor's journey, determining eligibility and admission to
              thousands of postgraduate seats in government and private medical
              colleges across the country.
            </p>
          </div>
        </div>

        <div className="pg-overview-divider" />

        <div className="pg-overview-process-head">
          <span className="pg-overview-eyebrow">How Counselling Works</span>
          <h3 className="pg-overview-process-title">
            Two authorities, one seat
          </h3>
        </div>

        <div className="pg-overview-authority-grid">
          <div
            className="pg-overview-authority-card is-navy"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="pg-overview-authority-icon">
              <Building2 size={20} />
            </div>
            <span className="pg-overview-authority-tag">All-India Quota</span>
            <h4 className="pg-overview-authority-title">
              Medical Counselling Committee (MCC)
            </h4>
            <p className="pg-overview-authority-desc">
              Conducts counselling for seats across all India under Government
              Institutes, Deemed and Central Institutions.
            </p>
          </div>

          <div
            className="pg-overview-authority-card is-outline"
            style={{ transitionDelay: "180ms" }}
          >
            <div className="pg-overview-authority-icon">
              <MapPin size={20} />
            </div>
            <span className="pg-overview-authority-tag">State Quota</span>
            <h4 className="pg-overview-authority-title">
              State Counselling Authorities
            </h4>
            <p className="pg-overview-authority-desc">
              Manage counselling for state quota seats within their respective
              states.
            </p>
          </div>
        </div>

        <div className="pg-overview-timeline-wrap">
          <h3 className="pg-overview-process-title">
            Four rounds to your seat
          </h3>
          <p className="pg-overview-timeline-lead">
            Every round follows the same rhythm - choice filling, seat
            allotment, then joining at the allotted institute.
          </p>

          <div className="pg-overview-steps">
            {roundSteps.map((step, i) => (
              <React.Fragment key={step}>
                <span className="pg-overview-step-chip">{step}</span>
                {i < roundSteps.length - 1 && (
                  <span className="pg-overview-step-arrow">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="pg-overview-factors">
            <span className="pg-overview-factors-label">
              Your admission depends on
            </span>
            <div className="pg-overview-factors-chips">
              {admissionFactors.map((factor) => (
                <span className="pg-overview-factor-chip" key={factor}>
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeetpgOverview;
