import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  BarChart3,
  FileText,
  Info,
  ShieldCheck,
} from "lucide-react";
import "./FreeResourcesSection.css";

const resources = [
  { title: "Choice Filling Guide", icon: BookOpen },
  { title: "Counselling Calendar", icon: CalendarDays },
  { title: "Previous-Year Seat Matrix", icon: BarChart3 },
  { title: "College Fee Structure", icon: Building2 },
  { title: "Bond Information", icon: ShieldCheck },
  { title: "State-wise Counselling PDFs", icon: FileText },
];

export default function FreeResourcesSection() {
  return (
    <section className="fr-section" aria-labelledby="free-resources-title">
      <div className="fr-section__container">
        <div className="fr-section__main">
          <div className="fr-section__content">
            <p className="fr-section__eyebrow">
              <span aria-hidden="true" />
              FREE RESOURCES
              <span aria-hidden="true" />
            </p>
            <h2 id="free-resources-title">
              Everything You Need Before Counselling Begins.
            </h2>
            <div className="fr-section__accent" aria-hidden="true">
              <span />
              <i />
            </div>
            <button className="fr-section__cta" type="button">
              Explore Free Resources <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="fr-library">
            <span
              className="fr-library__document fr-library__document--one"
              aria-hidden="true"
            />
            <span
              className="fr-library__document fr-library__document--two"
              aria-hidden="true"
            />
            <div className="fr-library__rows">
              {resources.map(({ title, icon: Icon }, index) => (
                <button
                  className="fr-library__row"
                  type="button"
                  key={title}
                  aria-label={title}
                >
                  <span className="fr-library__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="fr-library__icon" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <span className="fr-library__title">{title}</span>
                  <ArrowRight
                    className="fr-library__arrow"
                    size={18}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="fr-section__notice">
          <Info size={16} aria-hidden="true" />
          <p>
            Implementation note: Free tools and resources should be
            cross-checked and confirmed before website go-live.
          </p>
        </aside>
      </div>
    </section>
  );
}
