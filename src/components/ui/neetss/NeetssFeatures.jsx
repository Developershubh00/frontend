import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  FileText,
  DollarSign,
  MapPin,
  Search,
  Target,
  Building2,
  GraduationCap,
  Users,
  Calendar,
  BookOpen,
} from "lucide-react";
import "./NeetssFeatures.css";

const features = [
  {
    icon: <BarChart3 size={24} />,
    title: "Seat Allotments",
    description:
      "Analyze previous NEET SS seat allotments across multiple counselling rounds to understand admission patterns at participating Institutes of National Importance.",
    colorKey: "blue",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Closing Ranks",
    description:
      "Review institute-wise and specialty-wise closing ranks from previous NEET SS sessions to estimate your admission chances.",
    colorKey: "indigo",
  },
  {
    icon: <FileText size={24} />,
    title: "Seat Availability",
    description:
      "Stay updated with round-wise seat availability across AIIMS, JIPMER, PGIMER, NIMHANS, and other participating institutes.",
    colorKey: "purple",
  },
  {
    icon: <DollarSign size={24} />,
    title: "Fees & Stipend",
    description:
      "Compare tuition fees, resident stipends, bond requirements, and institutional policies before finalizing your preferences.",
    colorKey: "blue",
  },
  {
    icon: <MapPin size={24} />,
    title: "Institute Comparison",
    description:
      "Compare participating institutes based on academics, location, clinical exposure, infrastructure, and previous admission trends.",
    colorKey: "orange",
  },
  {
    icon: <Search size={24} />,
    title: "Rank Analysis",
    description:
      "Search any NEET SS rank to explore specialties and institutes that candidates secured in previous counselling rounds.",
    colorKey: "cyan",
  },
  {
    icon: <Target size={24} />,
    title: "Preference List",
    description:
      "Create, save, and optimize your NEET SS choice list with data-driven insights and personalized admission planning.",
    colorKey: "pink",
  },
  {
    icon: <Building2 size={24} />,
    title: "Institutes",
    description:
      "Explore detailed profiles of AIIMS, JIPMER, PGIMER, NIMHANS, SCTIMST, and other Institutes of National Importance.",
    colorKey: "teal",
  },
  {
    icon: <GraduationCap size={24} />,
    title: "Courses",
    description:
      "Browse MD, MS, MDS, DM, and MCh programs with seat intake, eligibility, and specialty-specific information.",
    colorKey: "yellow",
  },
  {
    icon: <Users size={24} />,
    title: "Departments",
    description:
      "Learn about individual departments, faculty strength, research opportunities, and clinical training across premier institutes.",
    colorKey: "red",
  },
  {
    icon: <Calendar size={24} />,
    title: "Counselling Schedule",
    description:
      "Track important counselling dates, registration deadlines, choice filling windows, seat allotment results, and reporting timelines.",
    colorKey: "violet",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Official Resources",
    description:
      "Access official notifications, prospectuses, counselling guidelines, seat matrices, and admission documents from participating institutes.",
    colorKey: "slate",
  },
];

function NeetssFeatures() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="ss-feature">
      <div className="ss-feature-container">
        <div className="ss-feature-grid">
          <div className="ss-feature-sticky-col">
            <div className="ss-feature-dark-card">
              <h2 className="ss-feature-dark-card-title">
                Plan,
                <br />
                Discover,
                <br />
                Achieve
              </h2>

              <p className="ss-feature-dark-card-para">
                Everything you need to navigate NEET SS counselling with
                confidence-all in one free platform.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="ss-feature-dark-card-btn"
              >
                Start Free &rarr;
              </button>
            </div>
          </div>

          <div className="ss-feature-list">
            {features.map((f, i) => (
              <div
                key={i}
                className={`ss-feature-card is-${f.colorKey} ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className={`ss-feature-card-icon is-${f.colorKey}`}>
                  {f.icon}
                </div>
                <h3 className="ss-feature-card-title">{f.title}</h3>
                <p className="ss-feature-card-desc">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeetssFeatures;
