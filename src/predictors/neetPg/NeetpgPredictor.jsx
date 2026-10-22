import { useState } from "react";
import axios from "axios";
import {
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
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

const quotaOptions = [
  "AIQ",
  "DNB Post MBBS",
  "MNG",
  "NBE Diploma",
  "NRI",
  "DU",
  "IP",
  "AFMS",
  "AMU",
  "BHU",
  "JM",
  "MM",
  "AFMS-DNB",
];
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

const formatRank = (value) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const number = Number(value);

  return Number.isFinite(number) ? number.toLocaleString("en-IN") : "N/A";
};

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const number = Number(value);

  return Number.isFinite(number) ? `₹${number.toLocaleString("en-IN")}` : "N/A";
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

    if (error) {
      setError("");
    }
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

    const rank = Number(form.rank);

    if (!form.rank || !Number.isSafeInteger(rank) || rank <= 0) {
      setError("Please enter a valid NEET PG rank.");
      return;
    }

    if (!form.category || !form.quota) {
      setError("Please select your category and quota.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary(null);
    setResults([]);
    setCandidate(null);

    try {
      const params = {
        rank,
        category: form.category,
        quota: form.quota,
      };

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
      {/* Hero */}
      <section className="npg-predictor-hero">
        <div className="npg-predictor-container">
          <div className="npg-predictor-hero-content">
            <span className="npg-hero-eyebrow">
              NEET PG COUNSELLING · 2025 DATA
            </span>

            <h1>NEET PG College Predictor</h1>

            <p>
              Discover college options based on your NEET PG rank, category, and
              quota using historical 2025 allotment data.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="npg-predictor-main">
        <div className="npg-predictor-container">
          <div className="npg-predictor-layout">
            {/* Left filter panel */}
            <aside className="npg-predictor-sidebar">
              <form className="npg-predictor-form" onSubmit={handlePredict}>
                <div className="npg-form-heading">
                  <div className="npg-form-heading-icon">
                    <Target size={20} />
                  </div>

                  <div>
                    <h2>Predict Your College</h2>
                    <p>Enter your counselling preferences</p>
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
                      step="1"
                      inputMode="numeric"
                      placeholder="Enter your rank"
                      value={form.rank}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

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
                      required
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
                      required
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

                {error && (
                  <div className="npg-error" role="alert">
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
                  disabled={loading}
                >
                  <RotateCcw size={16} />
                  Reset Filters
                </button>

                <div className="npg-form-note">
                  <ShieldCheck size={16} />

                  <span>
                    Predictions are based on historical allotment data and are
                    not a guarantee of admission.
                  </span>
                </div>
              </form>
            </aside>

            {/* Right results panel */}
            <div className="npg-predictor-results">
              {!summary && !loading && (
                <div className="npg-empty-state">
                  <div className="npg-empty-icon">
                    <GraduationCap size={42} />
                  </div>

                  <h2>Find Your Best College Options</h2>

                  <p>
                    Enter your NEET PG rank, category, and quota to explore
                    matching colleges based on 2025 data.
                  </p>

                  <div className="npg-empty-points">
                    <div>
                      <ShieldCheck size={18} />
                      <span>Safe options</span>
                    </div>

                    <div>
                      <Target size={18} />
                      <span>Good chance options</span>
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

                  <h2>Analyzing Allotment Data</h2>

                  <p>Finding colleges based on your rank and preferences...</p>
                </div>
              )}

              {summary && !loading && (
                <>
                  {/* Candidate details */}
                  <div className="npg-candidate-bar">
                    <div>
                      <span>Your NEET PG Rank</span>
                      <strong>{formatRank(candidate?.rank)}</strong>
                    </div>

                    <div>
                      <span>Category</span>
                      <strong>{candidate?.category || "N/A"}</strong>
                    </div>

                    <div>
                      <span>Quota</span>
                      <strong>{candidate?.quota || "N/A"}</strong>
                    </div>
                  </div>

                  {/* Summary cards */}
                  <div className="npg-summary-grid">
                    <div className="npg-summary-card npg-summary-total">
                      <div className="npg-summary-icon">
                        <GraduationCap size={20} />
                      </div>

                      <div>
                        <span>Total Matches</span>
                        <strong>{summary.total ?? 0}</strong>
                      </div>
                    </div>

                    <div className="npg-summary-card npg-summary-safe">
                      <div className="npg-summary-icon">
                        <ShieldCheck size={20} />
                      </div>

                      <div>
                        <span>Safe</span>
                        <strong>{summary.safe ?? 0}</strong>
                      </div>
                    </div>

                    <div className="npg-summary-card npg-summary-good">
                      <div className="npg-summary-icon">
                        <Target size={20} />
                      </div>

                      <div>
                        <span>Good Chance</span>
                        <strong>{summary.good_chance ?? 0}</strong>
                      </div>
                    </div>

                    <div className="npg-summary-card npg-summary-reach">
                      <div className="npg-summary-icon">
                        <AlertCircle size={20} />
                      </div>

                      <div>
                        <span>Reach</span>
                        <strong>{summary.reach ?? 0}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Results heading */}
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
                      <h3>No Colleges Found</h3>

                      <p>
                        No matching colleges were found for these preferences.
                        Try another category or quota.
                      </p>
                    </div>
                  ) : (
                    <div className="npg-results-list">
                      {results.map((college, index) => {
                        const isExpanded = expandedCollege === index;

                        return (
                          <article
                            className="npg-college-card"
                            key={[
                              college.institute,
                              college.course,
                              college.state,
                              college.quota,
                              college.category,
                              index,
                            ].join("-")}
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

                                  <div
                                    className="npg-score"
                                    title="Prediction score, not an admission probability"
                                  >
                                    <strong>{college.score ?? "N/A"}</strong>
                                    <span>Score</span>
                                  </div>
                                </div>

                                {/* Rank details */}
                                <div className="npg-rank-grid">
                                  <div>
                                    <span>Opening Rank</span>
                                    <strong>
                                      {formatRank(
                                        college.rounds?.[0]?.opening_rank,
                                      )}
                                    </strong>
                                  </div>

                                  <div>
                                    <span>Best Closing Rank</span>
                                    <strong>
                                      {formatRank(college.best_closing_rank)}
                                    </strong>
                                  </div>

                                  <div>
                                    <span>Latest Closing</span>
                                    <strong>
                                      {formatRank(college.latest_closing_rank)}
                                    </strong>
                                  </div>

                                  <div>
                                    <span>Latest Round</span>
                                    <strong>
                                      {college.latest_round != null
                                        ? `Round ${college.latest_round}`
                                        : "N/A"}
                                    </strong>
                                  </div>
                                </div>

                                {/* Fees and cutoff history */}
                                <div className="npg-college-footer">
                                  <div className="npg-info-items">
                                    <span>
                                      <IndianRupee size={15} />
                                      Fee: {formatCurrency(college.fee)}
                                    </span>

                                    <span>
                                      <BedDouble size={15} />
                                      Beds: {college.beds ?? "N/A"}
                                    </span>

                                    <span>
                                      Bond: {college.bond_years ?? "N/A"} yrs
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    className="npg-details-button"
                                    aria-expanded={isExpanded}
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

                            {/* Expandable details */}
                            {isExpanded && (
                              <div className="npg-round-history">
                                <div className="npg-round-heading">
                                  <div>
                                    <h4>Round-wise Cutoff</h4>
                                    <p>
                                      Historical NEET PG 2025 allotment data
                                    </p>
                                  </div>

                                  <span>
                                    {college.rounds?.length || 0} rounds
                                  </span>
                                </div>

                                {college.rounds?.length ? (
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
                                        {college.rounds.map((round) => (
                                          <tr key={round.round}>
                                            <td>Round {round.round}</td>
                                            <td>
                                              {formatRank(round.opening_rank)}
                                            </td>
                                            <td>
                                              {formatRank(round.closing_rank)}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <p className="npg-history-empty">
                                    No round-wise cutoff history is available.
                                  </p>
                                )}

                                <div className="npg-extra-details">
                                  <div>
                                    <span>Category</span>
                                    <strong>{college.category || "N/A"}</strong>
                                  </div>

                                  <div>
                                    <span>Quota</span>
                                    <strong>{college.quota || "N/A"}</strong>
                                  </div>

                                  <div>
                                    <span>Stipend</span>
                                    <strong>
                                      {formatCurrency(college.stipend)}
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

                  <p className="npg-disclaimer">
                    Predictions are estimates based on available NEET PG 2025
                    allotment data. Actual cutoffs and admission outcomes may
                    differ by counselling round and seat availability.
                  </p>
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
