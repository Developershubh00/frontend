import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, ShieldCheck, Building2, MapPin } from "lucide-react";
import "./NeetugOverview.css";

const rounds = [
  { id: "01", label: "Round 1" },
  { id: "02", label: "Round 2" },
  { id: "03", label: "Round 3" },
  { id: "04", label: "Stray Round" },
];

const roundSteps = ["Choice Filling", "Seat Allotment", "Joining"];

const admissionFactors = [
  "NEET UG Rank",
  "Category",
  "College Preference",
  "Seat Availability",
];

function NeetugOverview() {
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
      className={`ug-overview-section ${visible ? "is-visible" : ""}`}
    >
      <div className="ug-overview-glow ug-overview-glow-blue" />
      <div className="ug-overview-glow ug-overview-glow-amber" />

      <div className="ug-overview-container">
        <div className="ug-overview-hero">
          <span className="ug-overview-eyebrow">Medical Admission Guide</span>

          <h2 className="ug-overview-heading">NEET UG Counselling Overview</h2>

          <p className="ug-overview-subdesc">
            Understand the complete NEET UG counselling process, admission
            authorities, seat allocation rounds, and key factors that determine
            your MBBS or BDS admission.
          </p>
        </div>

        <div className="ug-overview-info-grid">
          <div
            className="ug-overview-info-card"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="ug-overview-info-icon">
              <GraduationCap size={22} />
            </div>

            <h3 className="ug-overview-info-title">
              What is NEET UG Counselling?
            </h3>

            <p className="ug-overview-info-desc">
              NEET UG counselling is the admission process through which
              qualified candidates secure seats in MBBS, BDS, AYUSH, and other
              undergraduate medical courses across government, private, deemed,
              and central institutions in India based on their NEET UG rank.
            </p>
          </div>

          <div
            className="ug-overview-info-card"
            style={{ transitionDelay: "180ms" }}
          >
            <div className="ug-overview-info-icon">
              <ShieldCheck size={22} />
            </div>

            <h3 className="ug-overview-info-title">
              Who conducts counselling?
            </h3>

            <p className="ug-overview-info-desc">
              NEET UG counselling is conducted by the Medical Counselling
              Committee (MCC) for All India Quota, Deemed Universities, Central
              Universities, AIIMS, JIPMER, and other participating institutes,
              while individual state counselling authorities manage admissions
              for their respective state quota seats.
            </p>
          </div>
        </div>

        <div className="ug-overview-divider" />

        <div className="ug-overview-process-head">
          <span className="ug-overview-eyebrow">Counselling Authorities</span>

          <h3 className="ug-overview-process-title">
            Two counselling authorities, one admission process
          </h3>
        </div>

        <div className="ug-overview-authority-grid">
          <div
            className="ug-overview-authority-card is-navy"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="ug-overview-authority-icon">
              <Building2 size={20} />
            </div>

            <span className="ug-overview-authority-tag">All India Quota</span>

            <h4 className="ug-overview-authority-title">
              Medical Counselling Committee (MCC)
            </h4>

            <p className="ug-overview-authority-desc">
              Conducts counselling for 15% All India Quota seats, Deemed
              Universities, Central Universities, AIIMS, JIPMER, ESIC, AFMS, and
              other participating institutions across India.
            </p>
          </div>

          <div
            className="ug-overview-authority-card is-outline"
            style={{ transitionDelay: "180ms" }}
          >
            <div className="ug-overview-authority-icon">
              <MapPin size={20} />
            </div>

            <span className="ug-overview-authority-tag">State Quota</span>

            <h4 className="ug-overview-authority-title">
              State Counselling Authorities
            </h4>

            <p className="ug-overview-authority-desc">
              Each state conducts counselling for 85% state quota seats in
              government colleges along with admissions to private medical and
              dental colleges according to its own eligibility rules and
              reservation policies.
            </p>
          </div>
        </div>

        <div className="ug-overview-timeline-wrap">
          <h3 className="ug-overview-process-title">Four counselling rounds</h3>

          <p className="ug-overview-timeline-lead">
            Every counselling round follows the same process-register, fill your
            choices, receive seat allotment, and complete admission formalities
            at the allotted college.
          </p>

          <div className="ug-overview-steps">
            {roundSteps.map((step, i) => (
              <React.Fragment key={step}>
                <span className="ug-overview-step-chip">{step}</span>

                {i < roundSteps.length - 1 && (
                  <span className="ug-overview-step-arrow">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="ug-overview-factors">
            <span className="ug-overview-factors-label">
              Your admission depends on
            </span>

            <div className="ug-overview-factors-chips">
              {admissionFactors.map((factor) => (
                <span className="ug-overview-factor-chip" key={factor}>
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

export default NeetugOverview;
