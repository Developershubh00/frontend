import { useState } from "react";
import axios from "axios";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Building2,
  GraduationCap,
  MapPin,
  IndianRupee,
  Stethoscope,
  BedDouble,
  ShieldCheck,
  Target,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import "./NeetpgPredictor.css";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  rank: "",
  category: "GEN",
  quota: "AIQ",
  state: "",
  course: "",
  institute: "",
};

const categoryOptions = [
  "GEN",
  "EWS",
  "OBC",
  "SC",
  "ST",
  "GEN-PwD",
  "EWS-PwD",
  "OBC-PwD",
  "SC-PwD",
  "ST-PwD",
];

const quotaOptions = ["AIQ", "State", "Deemed", "DNB"];

const getPredictionClass = (prediction) => {
  switch (prediction) {
    case "SAFE":
      return "npg-predictor-safe";

    case "GOOD_CHANCE":
      return "npg-predictor-good";

    case "REACH":
      return "npg-predictor-reach";

    default:
      return "npg-predictor-unlikely";
  }
};

const getPredictionLabel = (prediction) => {
  switch (prediction) {
    case "SAFE":
      return "Safe";

    case "GOOD_CHANCE":
      return "Good Chance";

    case "REACH":
      return "Reach";

    default:
      return "Unlikely";
  }
};

function NeetpgPredictor() {
  const [form, setForm] = useState(initialForm);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedCollege, setExpandedCollege] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setResults([]);
    setSummary(null);
    setCandidate(null);
    setError("");
    setExpandedCollege(null);
  };

  const handlePredict = async (event) => {
    event.preventDefault();

    if (!form.rank) {
      setError("Please enter your NEET PG rank.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const params = {
        rank: form.rank,
        category: form.category,
        quota: form.quota,
      };

      if (form.state) {
        params.state = form.state;
      }

      if (form.course) {
        params.course = form.course;
      }

      if (form.institute) {
        params.institute = form.institute;
      }

      const response = await axios.get(`${API_URL}/predictor/neet-pg`, {
        params,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Prediction failed.");
      }

      setCandidate(response.data.candidate);
      setSummary(response.data.summary);
      setResults(response.data.results || []);
      setExpandedCollege(null);
    } catch (requestError) {
      console.error("NEET PG Predictor Error:", requestError);

      setResults([]);
      setSummary(null);
      setCandidate(null);

      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to generate prediction. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleCollege = (index) => {
    setExpandedCollege((previous) => (previous === index ? null : index));
  };

  return (
    <main className="npg-predictor-page">
      <section className="npg-predictor-hero">
        <div className="npg-predictor-container">
          <div className="npg-predictor-hero-content">
            <h1>NEET PG College Predictor</h1>

            <p>
              Enter your NEET PG rank and preferences to discover colleges where
              you have a Safe, Good Chance, or Reach possibility based on
              previous allotment data.
            </p>
          </div>
        </div>
      </section>

      <section className="npg-predictor-main">
        <div className="npg-predictor-container">
          <div className="npg-predictor-layout">
            <aside className="npg-predictor-sidebar">
              <form className="npg-predictor-form" onSubmit={handlePredict}>
                <div className="npg-form-heading">
                  <div className="npg-form-heading-icon">
                    <Target size={20} />
                  </div>

                  <div>
                    <h2>Enter your details</h2>
                    <p>Get your college predictions</p>
                  </div>
                </div>

                <div className="npg-form-group">
                  <label htmlFor="rank">
                    NEET PG Rank <span>*</span>
                  </label>

                  <div className="npg-input-wrapper">
                    <Search size={18} />

                    <input
                      id="rank"
                      name="rank"
                      type="number"
                      min="1"
                      placeholder="e.g. 12500"
                      value={form.rank}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="npg-form-row">
                  <div className="npg-form-group">
                    <label htmlFor="category">
                      Category <span>*</span>
                    </label>

                    <div className="npg-select-wrapper">
                      <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                      >
                        {categoryOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>

                      <ChevronDown size={17} />
                    </div>
                  </div>

                  <div className="npg-form-group">
                    <label htmlFor="quota">
                      Quota <span>*</span>
                    </label>

                    <div className="npg-select-wrapper">
                      <select
                        id="quota"
                        name="quota"
                        value={form.quota}
                        onChange={handleChange}
                      >
                        {quotaOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>

                      <ChevronDown size={17} />
                    </div>
                  </div>
                </div>

                <div className="npg-filter-divider">
                  <SlidersHorizontal size={16} />
                  <span>Optional filters</span>
                </div>

                <div className="npg-form-group">
                  <label htmlFor="state">State</label>

                  <div className="npg-input-wrapper">
                    <MapPin size={18} />

                    <input
                      id="state"
                      name="state"
                      type="text"
                      placeholder="e.g. Delhi"
                      value={form.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="npg-form-group">
                  <label htmlFor="course">Course</label>

                  <div className="npg-input-wrapper">
                    <Stethoscope size={18} />

                    <input
                      id="course"
                      name="course"
                      type="text"
                      placeholder="e.g. MD Medicine"
                      value={form.course}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="npg-form-group">
                  <label htmlFor="institute">Institute</label>

                  <div className="npg-input-wrapper">
                    <Building2 size={18} />

                    <input
                      id="institute"
                      name="institute"
                      type="text"
                      placeholder="Search institute"
                      value={form.institute}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {error && (
                  <div className="npg-error">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  className="npg-predict-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={19} className="npg-loading-icon" />
                      Predicting...
                    </>
                  ) : (
                    <>
                      <Target size={19} />
                      Predict Colleges
                    </>
                  )}
                </button>

                <button
                  className="npg-reset-button"
                  type="button"
                  onClick={handleReset}
                >
                  <RotateCcw size={16} />
                  Reset Filters
                </button>
              </form>
            </aside>

            <div className="npg-predictor-results">
              {!summary && !loading && (
                <div className="npg-empty-state">
                  <div className="npg-empty-icon">
                    <GraduationCap size={42} />
                  </div>

                  <h2>Find your best college options</h2>

                  <p>
                    Enter your NEET PG rank, category and quota to see colleges
                    you may be eligible for.
                  </p>

                  <div className="npg-empty-points">
                    <div>
                      <ShieldCheck size={18} />
                      <span>Safe colleges</span>
                    </div>

                    <div>
                      <Target size={18} />
                      <span>Good chance colleges</span>
                    </div>

                    <div>
                      <AlertCircle size={18} />
                      <span>Reach options</span>
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="npg-loading-state">
                  <LoaderCircle size={42} className="npg-loading-icon" />

                  <h2>Analyzing allotment data</h2>

                  <p>Finding colleges based on your rank and preferences...</p>
                </div>
              )}

              {summary && !loading && (
                <>
                  <div className="npg-candidate-bar">
                    <div>
                      <span>Your NEET PG Rank</span>
                      <strong>
                        {candidate?.rank?.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div>
                      <span>Category</span>
                      <strong>{candidate?.category}</strong>
                    </div>

                    <div>
                      <span>Quota</span>
                      <strong>{candidate?.quota}</strong>
                    </div>

                    {candidate?.state && (
                      <div>
                        <span>State</span>
                        <strong>{candidate.state}</strong>
                      </div>
                    )}
                  </div>

                  <div className="npg-summary-grid">
                    <div className="npg-summary-card npg-summary-total">
                      <div className="npg-summary-icon">
                        <GraduationCap size={20} />
                      </div>

                      <div>
                        <span>Total Matches</span>
                        <strong>{summary.total}</strong>
                      </div>
                    </div>

                    <div className="npg-summary-card npg-summary-safe">
                      <div className="npg-summary-icon">
                        <ShieldCheck size={20} />
                      </div>

                      <div>
                        <span>Safe</span>
                        <strong>{summary.safe}</strong>
                      </div>
                    </div>

                    <div className="npg-summary-card npg-summary-good">
                      <div className="npg-summary-icon">
                        <Target size={20} />
                      </div>

                      <div>
                        <span>Good Chance</span>
                        <strong>{summary.good_chance}</strong>
                      </div>
                    </div>

                    <div className="npg-summary-card npg-summary-reach">
                      <div className="npg-summary-icon">
                        <AlertCircle size={20} />
                      </div>

                      <div>
                        <span>Reach</span>
                        <strong>{summary.reach}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="npg-results-heading">
                    <div>
                      <h2>College Predictions</h2>
                      <p>{results.length} colleges matched your preferences</p>
                    </div>

                    <div className="npg-result-legend">
                      <span>
                        <i className="npg-dot npg-dot-safe" />
                        Safe
                      </span>

                      <span>
                        <i className="npg-dot npg-dot-good" />
                        Good Chance
                      </span>

                      <span>
                        <i className="npg-dot npg-dot-reach" />
                        Reach
                      </span>
                    </div>
                  </div>

                  {results.length === 0 ? (
                    <div className="npg-no-results">
                      <AlertCircle size={32} />
                      <h3>No colleges found</h3>
                      <p>
                        Try changing your category, quota or optional filters.
                      </p>
                    </div>
                  ) : (
                    <div className="npg-results-list">
                      {results.map((college, index) => {
                        const isExpanded = expandedCollege === index;

                        return (
                          <article
                            className="npg-college-card"
                            key={`${college.institute}-${college.course}-${index}`}
                          >
                            <div className="npg-college-main">
                              <div className="npg-college-number">
                                {index + 1}
                              </div>

                              <div className="npg-college-content">
                                <div className="npg-college-top">
                                  <div>
                                    <span
                                      className={`npg-prediction-badge ${getPredictionClass(
                                        college.prediction,
                                      )}`}
                                    >
                                      {college.prediction === "SAFE" && (
                                        <ShieldCheck size={14} />
                                      )}

                                      {college.prediction === "GOOD_CHANCE" && (
                                        <Target size={14} />
                                      )}

                                      {college.prediction === "REACH" && (
                                        <AlertCircle size={14} />
                                      )}

                                      {getPredictionLabel(college.prediction)}
                                    </span>

                                    <h3>{college.institute}</h3>

                                    <div className="npg-college-meta">
                                      <span>
                                        <Stethoscope size={15} />
                                        {college.course}
                                      </span>

                                      <span>
                                        <MapPin size={15} />
                                        {college.state}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="npg-score">
                                    <strong>{college.score}</strong>
                                    <span>Score</span>
                                  </div>
                                </div>

                                <div className="npg-rank-grid">
                                  <div>
                                    <span>Opening Rank</span>
                                    <strong>
                                      {Number(
                                        college.rounds?.[0]?.opening_rank || 0,
                                      ).toLocaleString("en-IN")}
                                    </strong>
                                  </div>

                                  <div>
                                    <span>Best Closing Rank</span>
                                    <strong>
                                      {Number(
                                        college.best_closing_rank || 0,
                                      ).toLocaleString("en-IN")}
                                    </strong>
                                  </div>

                                  <div>
                                    <span>Latest Closing</span>
                                    <strong>
                                      {Number(
                                        college.latest_closing_rank || 0,
                                      ).toLocaleString("en-IN")}
                                    </strong>
                                  </div>

                                  <div>
                                    <span>Latest Round</span>
                                    <strong>
                                      Round {college.latest_round}
                                    </strong>
                                  </div>
                                </div>

                                <div className="npg-college-footer">
                                  <div className="npg-info-items">
                                    <span>
                                      <IndianRupee size={15} />
                                      Fee:{" "}
                                      {college.fee
                                        ? `₹${Number(
                                            college.fee,
                                          ).toLocaleString("en-IN")}`
                                        : "N/A"}
                                    </span>

                                    <span>
                                      <BedDouble size={15} />
                                      Beds: {college.beds || "N/A"}
                                    </span>

                                    <span>
                                      Bond: {college.bond_years ?? "N/A"} yrs
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    className="npg-details-button"
                                    onClick={() => toggleCollege(index)}
                                  >
                                    {isExpanded
                                      ? "Hide details"
                                      : "View cutoff history"}

                                    {isExpanded ? (
                                      <ChevronUp size={16} />
                                    ) : (
                                      <ChevronDown size={16} />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="npg-round-history">
                                <div className="npg-round-heading">
                                  <div>
                                    <h4>Round-wise Cutoff</h4>
                                    <p>Historical allotment data</p>
                                  </div>

                                  <span>
                                    {college.rounds?.length || 0} rounds
                                  </span>
                                </div>

                                <div className="npg-round-table-wrapper">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Round</th>
                                        <th>Opening Rank</th>
                                        <th>Closing Rank</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {college.rounds?.map((round) => (
                                        <tr key={round.round}>
                                          <td>Round {round.round}</td>

                                          <td>
                                            {Number(
                                              round.opening_rank,
                                            ).toLocaleString("en-IN")}
                                          </td>

                                          <td>
                                            {Number(
                                              round.closing_rank,
                                            ).toLocaleString("en-IN")}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                <div className="npg-extra-details">
                                  <div>
                                    <span>Category</span>
                                    <strong>{college.category}</strong>
                                  </div>

                                  <div>
                                    <span>Quota</span>
                                    <strong>{college.quota}</strong>
                                  </div>

                                  <div>
                                    <span>Stipend</span>
                                    <strong>
                                      {college.stipend
                                        ? `₹${Number(
                                            college.stipend,
                                          ).toLocaleString("en-IN")}`
                                        : "N/A"}
                                    </strong>
                                  </div>

                                  <div>
                                    <span>Bond</span>
                                    <strong>
                                      {college.bond_years ?? "N/A"} years
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            )}
                          </article>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NeetpgPredictor;
