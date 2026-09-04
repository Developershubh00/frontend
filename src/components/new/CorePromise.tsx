import React from "react";
import {
  BarChart3,
  ShieldCheck,
  UsersRound,
  UserRoundCheck,
  ArrowUpRight,
} from "lucide-react";
import "./CorePromise.css";

interface PromiseItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const promiseItems: PromiseItem[] = [
  {
    number: "01",
    title: "RELIABLE DATA",
    description: "Decisions backed by information you can trust.",
    icon: BarChart3,
  },
  {
    number: "02",
    title: "TRANSPARENT GUIDANCE",
    description: "No hidden agendas. No one-size-fits-all answers.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "GENUINE MENTORSHIP",
    description:
      "Real people. Real conversations. Guidance that considers your journey.",
    icon: UsersRound,
  },
];

const CorePromise: React.FC = () => {
  return (
    <section className="cp-section">
      <div className="cp-container">

        {/* ================= HEADER ================= */}
        <header className="cp-header">
          <div className="cp-eyebrow">
            <span className="cp-eyebrow-line"></span>
            <span>OUR CORE PROMISE</span>
            <span className="cp-eyebrow-line"></span>
          </div>

          <h2 className="cp-main-title">
            What We Stand For
          </h2>
        </header>

        {/* ================= THREE PROMISE CARDS ================= */}
        <div className="cp-grid">

          {promiseItems.map((item) => {
            const Icon = item.icon;

            return (
              <article className="cp-card" key={item.number}>

                <div className="cp-card-top">
                  <span className="cp-card-number">
                    {item.number}
                  </span>

                  <div className="cp-card-icon">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="cp-card-title">
                  {item.title}
                </h3>

                <p className="cp-card-description">
                  {item.description}
                </p>

                <span className="cp-card-accent"></span>

              </article>
            );
          })}

        </div>

        {/* ================= FEATURED COUNSELLING ================= */}
        <article className="cp-featured">

          <div className="cp-featured-left">

            <div className="cp-featured-number">
              04
            </div>

            <div className="cp-featured-icon">
              <UserRoundCheck size={30} strokeWidth={1.8} />
            </div>

            <h3 className="cp-featured-title">
             FREE PERSONALISED COUNSELLING
            </h3>

          </div>

          <div className="cp-featured-right">

            <div className="cp-statement">
              <span className="cp-statement-marker"></span>

              <strong>
                Because your rank is yours.
              </strong>
            </div>

            <div className="cp-statement">
              <span className="cp-statement-marker"></span>

              <strong>
                Your priorities are yours.
              </strong>
            </div>

            <div className="cp-statement cp-statement-final">
              <span className="cp-statement-marker"></span>

              <strong>
                And your decision should be yours.
              </strong>

              <ArrowUpRight
                className="cp-final-arrow"
                size={21}
                strokeWidth={2}
              />
            </div>

          </div>

        </article>

      </div>
    </section>
  );
};

export default CorePromise;