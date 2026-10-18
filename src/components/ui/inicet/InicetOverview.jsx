import React, { useEffect, useRef, useState } from "react";
import { Stethoscope, ShieldCheck, Building2, MapPin } from "lucide-react";
import "./InicetOverview.css";

const rounds = [
  { id: "01", label: "Round 1" },
  { id: "02", label: "Round 2" },
  { id: "03", label: "Open Round" },
  { id: "04", label: "Spot Round" },
];

const roundSteps = ["Choice Filling", "Seat Allotment", "Reporting"];

const admissionFactors = [
  "INI-CET Rank",
  "Reservation Category",
  "Institute Preferences",
  "Seat Availability",
];

function InicetOverview() {
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
      className={`inicet-overview-section ${visible ? "is-visible" : ""}`}
    >
      <div className="inicet-overview-glow inicet-overview-glow-blue" />
      <div className="inicet-overview-glow inicet-overview-glow-amber" />

      <div className="inicet-overview-container">
        <div className="inicet-overview-hero">
          <span className="inicet-overview-eyebrow">Admission Guide</span>

          <h2 className="inicet-overview-heading">INI-CET Overview</h2>

          <p className="inicet-overview-subdesc">
            Get a clear understanding of the INI-CET admission process,
            counselling workflow, and seat allocation across India's premier
            Institutes of National Importance so you can make informed academic
            and career decisions.
          </p>
        </div>

        <div className="inicet-overview-info-grid">
          <div
            className="inicet-overview-info-card"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="inicet-overview-info-icon">
              <Stethoscope size={22} />
            </div>

            <h3 className="inicet-overview-info-title">About INI-CET</h3>

            <p className="inicet-overview-info-desc">
              INI-CET is the national entrance examination for admission to
              postgraduate medical programmes including MD, MS, MCh (6 Years),
              DM (6 Years), and MDS offered by India's leading Institutes of
              National Importance such as AIIMS, JIPMER, PGIMER, NIMHANS, and
              other participating institutions.
            </p>
          </div>

          <div
            className="inicet-overview-info-card"
            style={{ transitionDelay: "180ms" }}
          >
            <div className="inicet-overview-info-icon">
              <ShieldCheck size={22} />
            </div>

            <h3 className="inicet-overview-info-title">
              Conducting Authority & Eligibility
            </h3>

            <p className="inicet-overview-info-desc">
              AIIMS, New Delhi conducts INI-CET on behalf of all participating
              Institutes of National Importance. Candidates who satisfy the
              prescribed eligibility criteria and have completed their MBBS or
              equivalent qualification can participate in the examination and
              centralized counselling process.
            </p>
          </div>
        </div>

        <div className="inicet-overview-divider" />

        <div className="inicet-overview-process-head">
          <span className="inicet-overview-eyebrow">Counselling Process</span>

          <h3 className="inicet-overview-process-title">
            One centralized counselling for all participating institutes
          </h3>
        </div>

        <div className="inicet-overview-authority-grid">
          <div
            className="inicet-overview-authority-card is-navy"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="inicet-overview-authority-icon">
              <Building2 size={20} />
            </div>

            <span className="inicet-overview-authority-tag">
              Centralized Counselling
            </span>

            <h4 className="inicet-overview-authority-title">
              AIIMS, New Delhi
            </h4>

            <p className="inicet-overview-authority-desc">
              AIIMS oversees the complete online counselling process, conducts
              seat allocation, and publishes allotment results for every
              participating Institute of National Importance through a unified
              counselling system.
            </p>
          </div>

          <div
            className="inicet-overview-authority-card is-outline"
            style={{ transitionDelay: "180ms" }}
          >
            <div className="inicet-overview-authority-icon">
              <MapPin size={20} />
            </div>

            <span className="inicet-overview-authority-tag">
              Participating Institutes
            </span>

            <h4 className="inicet-overview-authority-title">
              AIIMS, JIPMER, PGIMER, NIMHANS & Others
            </h4>

            <p className="inicet-overview-authority-desc">
              Admissions are offered across India's premier Institutes of
              National Importance based on your INI-CET rank, reservation
              category, seat availability, and the preferences submitted during
              counselling.
            </p>
          </div>
        </div>

        <div className="inicet-overview-timeline-wrap">
          <h3 className="inicet-overview-process-title">
            Journey through the counselling rounds
          </h3>

          <p className="inicet-overview-timeline-lead">
            Every counselling round follows a transparent process-from filling
            your choices to seat allotment and final reporting at your allotted
            institute.
          </p>

          <div className="inicet-overview-steps">
            {roundSteps.map((step, i) => (
              <React.Fragment key={step}>
                <span className="inicet-overview-step-chip">{step}</span>

                {i < roundSteps.length - 1 && (
                  <span className="inicet-overview-step-arrow">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="inicet-overview-factors">
            <span className="inicet-overview-factors-label">
              Seat allotment is based on
            </span>

            <div className="inicet-overview-factors-chips">
              {admissionFactors.map((factor) => (
                <span className="inicet-overview-factor-chip" key={factor}>
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

export default InicetOverview;
