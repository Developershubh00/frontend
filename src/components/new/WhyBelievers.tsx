import {
  BarChart3,
  BrainCircuit,
  Database,
  GraduationCap,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import "./WhyBelievers.css";

const guidancePoints = [
  { label: "Comprehensive counselling data", icon: Database },
  { label: "Previous-year closing ranks", icon: BarChart3 },
  { label: "AIQ & State counselling insights", icon: MapPinned },
  { label: "College-specific information", icon: GraduationCap },
  { label: "Personalised counselling strategies", icon: BrainCircuit },
  { label: "Transparent, student-first guidance", icon: ShieldCheck },
];

export default function WhyBelievers() {
  return (
    <section className="wb-section" aria-labelledby="why-believers-title">
      <div className="wb-container">
        <header className="wb-header">
          <p className="wb-eyebrow">
            <span className="wb-eyebrow-line" />
            WHY BELIEVERS
            <span className="wb-eyebrow-line" />
          </p>
          <h1 className="wb-title" id="why-believers-title">
            Medical Career Decisions Need More Than Data.
          </h1>
        </header>

        <div className="wb-main">
          <div className="wb-features">
            <div className="wb-section-heading">
              <span className="wb-heading-accent" aria-hidden="true" />
              <h2>Our guidance combines:</h2>
            </div>
            <div className="wb-grid">
              {guidancePoints.map(({ label, icon: Icon }, index) => (
                <article className="wb-card" key={label}>
                  <div className="wb-card-top">
                    <span className="wb-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="wb-icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                  </div>
                  <div className="wb-card-content">
                    <h3>{label}</h3>
                  </div>
                  <span className="wb-card-line" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>

          <div className="wb-image">
            <img
              src="https://cdn.dribbble.com/userupload/48925991/file/fd922d81507c1df9a304a17879eec2e7.jpg?resize=752x&vertical=center"
              alt="Medical counselling guidance"
            />
          </div>
        </div>

        <div className="wb-cta">
          <div className="wb-cta-copy">
            <p>Data can show you the options.</p>
            <h2>Guidance helps you choose.</h2>
          </div>
          <a className="wb-button" href="#contact">
            Talk to a Counsellor
          </a>
        </div>
      </div>
    </section>
  );
}
