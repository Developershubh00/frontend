import React, { useEffect, useRef, useState } from "react";
import { Stethoscope, ShieldCheck, Building2, MapPin } from "lucide-react";
import "./NeetssOverview.css";

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

function NeetssOverview() {
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
      className={`ss-overview-section ${visible ? "is-visible" : ""}`}
    >
      <div className="ss-overview-glow ss-overview-glow-blue" />
      <div className="ss-overview-glow ss-overview-glow-amber" />

      <div className="ss-overview-container">
        <div className="ss-overview-hero">
          <span className="ss-overview-eyebrow">Counselling Guide </span>
          <h2 className="ss-overview-heading">NEET SS Overview</h2>
          <p className="ss-overview-subdesc">
            Discover everything you need to know about NEET SS and plan your
            medical career with confidence.
          </p>
        </div>

        <div className="ss-overview-info-grid">
          <div
            className="ss-overview-info-card"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="ss-overview-info-icon">
              <Stethoscope size={22} />
            </div>
            <h3 className="ss-overview-info-title">What the exam is</h3>
            <p className="ss-overview-info-desc">
              NEET SS is the gateway for postgraduate medical courses like MD,
              MS, and PG Diploma in India. It's held annually and is essential
              for any MBBS graduate who wants to pursue a specialization in
              clinical or non-clinical fields.
            </p>
          </div>

          <div
            className="ss-overview-info-card"
            style={{ transitionDelay: "180ms" }}
          >
            <div className="ss-overview-info-icon">
              <ShieldCheck size={22} />
            </div>
            <h3 className="ss-overview-info-title">
              Who conducts it &amp; who's eligible
            </h3>
            <p className="ss-overview-info-desc">
              Conducted by the National Board of Examinations (NBE), NEET SS is
              open to candidates who have completed or are completing their MBBS
              internship within a specified date. It's a critical step in a
              doctor's journey, determining eligibility and admission to
              thousands of postgraduate seats in government and private medical
              colleges across the country.
            </p>
          </div>
        </div>

        <div className="ss-overview-divider" />

        <div className="ss-overview-process-head">
          <span className="ss-overview-eyebrow">How Counselling Works</span>
          <h3 className="ss-overview-process-title">
            Two authorities, one seat
          </h3>
        </div>

        <div className="ss-overview-authority-grid">
          <div
            className="ss-overview-authority-card is-navy"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="ss-overview-authority-icon">
              <Building2 size={20} />
            </div>
            <span className="ss-overview-authority-tag">All-India Quota</span>
            <h4 className="ss-overview-authority-title">
              Medical Counselling Committee (MCC)
            </h4>
            <p className="ss-overview-authority-desc">
              Conducts counselling for seats across all India under Government
              Institutes, Deemed and Central Institutions.
            </p>
          </div>

          <div
            className="ss-overview-authority-card is-outline"
            style={{ transitionDelay: "180ms" }}
          >
            <div className="ss-overview-authority-icon">
              <MapPin size={20} />
            </div>
            <span className="ss-overview-authority-tag">State Quota</span>
            <h4 className="ss-overview-authority-title">
              State Counselling Authorities
            </h4>
            <p className="ss-overview-authority-desc">
              Manage counselling for state quota seats within their respective
              states.
            </p>
          </div>
        </div>

        <div className="ss-overview-timeline-wrap">
          <h3 className="ss-overview-process-title">
            Four rounds to your seat
          </h3>
          <p className="ss-overview-timeline-lead">
            Every round follows the same rhythm - choice filling, seat
            allotment, then joining at the allotted institute.
          </p>

          <div className="ss-overview-steps">
            {roundSteps.map((step, i) => (
              <React.Fragment key={step}>
                <span className="ss-overview-step-chip">{step}</span>
                {i < roundSteps.length - 1 && (
                  <span className="ss-overview-step-arrow">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="ss-overview-factors">
            <span className="ss-overview-factors-label">
              Your admission depends on
            </span>
            <div className="ss-overview-factors-chips">
              {admissionFactors.map((factor) => (
                <span className="ss-overview-factor-chip" key={factor}>
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

export default NeetssOverview;
