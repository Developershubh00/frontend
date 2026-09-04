import React from "react";
import {
  FileText,
  ClipboardCheck,
  BarChart3,
  Building2,
  ListChecks,
  CircleDot,
  TrendingUp,
  RefreshCw,
  GraduationCap,
  ArrowDown,
} from "lucide-react";
import "./CounsellingJourney.css";

interface JourneyItem {
  title: string;
  icon: React.ElementType;
  highlight?: boolean;
}

const journeyItems: JourneyItem[] = [
  {
    title: "Exam",
    icon: FileText,
  },
  {
    title: "Result",
    icon: ClipboardCheck,
  },
  {
    title: "Rank Analysis",
    icon: BarChart3,
    highlight: true,
  },
  {
    title: "College Prediction",
    icon: Building2,
    highlight: true,
  },
  {
    title: "Choice Filling",
    icon: ListChecks,
    highlight: true,
  },
  {
    title: "Round 1",
    icon: CircleDot,
  },
  {
    title: "Upgrade",
    icon: TrendingUp,
    highlight: true,
  },
  {
    title: "Round 2",
    icon: CircleDot,
  },
  {
    title: "Mop-up",
    icon: RefreshCw,
  },
  {
    title: "Admission",
    icon: GraduationCap,
    highlight: true,
  },
];

const CounsellingJourney: React.FC = () => {
  return (
    <section className="cj-section">
      <div className="cj-container">

        {/* Header */}
        <div className="cj-header">
          <div className="cj-eyebrow">
            <span className="cj-eyebrow-line"></span>
            <span>08. THE COUNSELLING JOURNEY</span>
            <span className="cj-eyebrow-line"></span>
          </div>

          <h2 className="cj-title">
            You Don't Have to Figure It Out Alone.
          </h2>
        </div>

        {/* Desktop / Tablet Journey */}
        <div className="cj-desktop-journey">
          <div className="cj-journey-row">

            {journeyItems.slice(0, 5).map((item, index) => {
              const Icon = item.icon;

              return (
                <React.Fragment key={item.title}>
                  <div
                    className={`cj-stage ${
                      item.highlight ? "cj-stage-highlight" : ""
                    }`}
                  >
                    <div className="cj-stage-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="cj-icon">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <div className="cj-stage-title">
                      {item.title}
                    </div>
                  </div>

                  {index < 4 && (
                    <div className="cj-connector">
                      <span></span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}

          </div>

          {/* Turning Connector */}
          <div className="cj-turn">
            <div className="cj-turn-line"></div>
            <div className="cj-turn-arrow">
              <ArrowDown size={17} />
            </div>
          </div>

          <div className="cj-journey-row cj-second-row">

            {journeyItems.slice(5).map((item, index) => {
              const Icon = item.icon;
              const actualIndex = index + 5;

              return (
                <React.Fragment key={item.title}>
                  <div
                    className={`cj-stage ${
                      item.highlight ? "cj-stage-highlight" : ""
                    }`}
                  >
                    <div className="cj-stage-number">
                      {String(actualIndex + 1).padStart(2, "0")}
                    </div>

                    <div className="cj-icon">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <div className="cj-stage-title">
                      {item.title}
                    </div>
                  </div>

                  {index < 4 && (
                    <div className="cj-connector">
                      <span></span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}

          </div>
        </div>

        {/* Mobile Journey */}
        <div className="cj-mobile-journey">
          {journeyItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                className={`cj-mobile-stage ${
                  item.highlight ? "cj-mobile-highlight" : ""
                }`}
                key={item.title}
              >
                <div className="cj-mobile-line-wrap">

                  <div className="cj-mobile-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="cj-mobile-icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  {index < journeyItems.length - 1 && (
                    <div className="cj-mobile-line"></div>
                  )}

                </div>

                <div className="cj-mobile-content">
                  <span>{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="cj-message">
          <span className="cj-message-dot"></span>

          <p>
            <strong>Believers</strong> is here to help you understand,
            evaluate and decide.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CounsellingJourney;