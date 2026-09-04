import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import "./FindCollegesSection.css";

const results = [
  {
    name: "Government Medical College",
    course: "MBBS",
    state: "Maharashtra",
    rank: "18,420",
  },
  {
    name: "State Medical College",
    course: "MBBS",
    state: "Karnataka",
    rank: "21,105",
  },
  {
    name: "Institute of Medical Sciences",
    course: "BDS",
    state: "Tamil Nadu",
    rank: "24,890",
  },
];

export default function FindCollegesSection() {
  const finderRef = useRef<HTMLDivElement>(null);
  const airInputRef = useRef<HTMLInputElement>(null);
  const [showResults, setShowResults] = useState(false);

  const focusFinder = () => {
    finderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => airInputRef.current?.focus(), 350);
  };

  return (
    <section
      className="college-finder-section"
      aria-labelledby="college-finder-title"
    >
      <div className="college-finder-section__container">
        <div className="college-finder-section__content">
          <p className="college-finder-section__eyebrow">
            FIND COLLEGES BASED ON YOUR RANK
          </p>
          <h2 id="college-finder-title">Find Your Realistic College Options</h2>
          <p className="college-finder-section__subheading">Search by:</p>
          <p className="college-finder-section__filters">
            AIR | Category | State | Preferred Branch | Quota
          </p>
          <p className="college-finder-section__description">
            Discover realistic college options based on your rank and
            preferences.
          </p>
          <button
            className="college-finder-section__cta"
            type="button"
            onClick={focusFinder}
          >
            Explore Colleges
          </button>
        </div>

        <div className="college-finder-app" ref={finderRef} tabIndex={-1}>
          <div className="college-finder-app__header">
            <span className="college-finder-app__mark" aria-hidden="true">
              <Building2 size={18} />
            </span>
            <strong>College Finder</strong>
            <span className="college-finder-app__status">
              <i />
              Ready
            </span>
          </div>

          {!showResults ? (
            <form
              className="college-finder-app__form"
              onSubmit={(event) => {
                event.preventDefault();
                setShowResults(true);
              }}
            >
              <div className="college-finder-app__field college-finder-app__field--full">
                <label htmlFor="college-finder-air">AIR</label>
                <input
                  ref={airInputRef}
                  id="college-finder-air"
                  name="air"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter your AIR"
                />
              </div>
              <div className="college-finder-app__field">
                <label htmlFor="college-finder-category">CATEGORY</label>
                <select
                  id="college-finder-category"
                  name="category"
                  defaultValue="Category"
                >
                  <option disabled>Category</option>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                  <option>EWS</option>
                </select>
              </div>
              <div className="college-finder-app__field">
                <label htmlFor="college-finder-state">STATE</label>
                <select
                  id="college-finder-state"
                  name="state"
                  defaultValue="State"
                >
                  <option disabled>State</option>
                  <option>All States</option>
                  <option>Delhi</option>
                  <option>Maharashtra</option>
                  <option>Uttar Pradesh</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                </select>
              </div>
              <div className="college-finder-app__field">
                <label htmlFor="college-finder-branch">PREFERRED BRANCH</label>
                <select
                  id="college-finder-branch"
                  name="branch"
                  defaultValue="Preferred Branch"
                >
                  <option disabled>Preferred Branch</option>
                  <option>MBBS</option>
                  <option>BDS</option>
                  <option>AYUSH</option>
                </select>
              </div>
              <div className="college-finder-app__field">
                <label htmlFor="college-finder-quota">QUOTA</label>
                <select
                  id="college-finder-quota"
                  name="quota"
                  defaultValue="Quota"
                >
                  <option disabled>Quota</option>
                  <option>AIQ</option>
                  <option>State Quota</option>
                </select>
              </div>
              <button className="college-finder-app__submit" type="submit">
                Find Colleges <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
          ) : (
            <div className="college-finder-app__results">
              <div className="college-finder-app__results-heading">
                <div>
                  <p>Realistic College Options</p>
                  <span>{results.length} results found</span>
                </div>
                <Sparkles size={20} aria-hidden="true" />
              </div>
              <div className="college-finder-app__result-list">
                {results.map((college) => (
                  <article
                    className="college-finder-app__result"
                    key={college.name}
                  >
                    <div
                      className="college-finder-app__result-icon"
                      aria-hidden="true"
                    >
                      <Building2 size={18} />
                    </div>
                    <div className="college-finder-app__result-copy">
                      <h3>{college.name}</h3>
                      <p>
                        {college.course} · {college.state} · Closing Rank{" "}
                        {college.rank}
                      </p>
                    </div>
                    <div className="college-finder-app__result-actions">
                      <span>
                        <CheckCircle2 size={13} />
                        Realistic
                      </span>
                      <button
                        type="button"
                        aria-label={`View details for ${college.name}`}
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <button
                className="college-finder-app__back"
                type="button"
                onClick={() => setShowResults(false)}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
