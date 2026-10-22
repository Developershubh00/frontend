import { useState } from "react";
import axios from "axios";
import {
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  AlertCircle,
  Building2,
  MapPin,
  GraduationCap,
  IndianRupee,
  BedDouble,
  Wallet,
  Clock3,
  History,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import "./NeetpgPredictor.css";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  rank: "",
  category: "GEN",
  quota: "AIQ",
  state: "",
  course: "",
  round: "",
};

const emptyFilterOptions = { states: [], courses: [] };

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

const roundOptions = [
  { value: "", label: "All rounds" },
  { value: "1", label: "Round 1" },
  { value: "2", label: "Round 2" },
  { value: "3", label: "Round 3" },
  { value: "4", label: "Round 4" },
];

const predictionLabels = {
  SAFE: "Safe",
  GOOD_CHANCE: "Good Chance",
  REACH: "Reach",
  UNLIKELY: "Unlikely",
  INSUFFICIENT_DATA: "Insufficient Data",
};

const predictionDescriptions = {
  SAFE: "Your rank is comfortably within the selected historical cutoff.",
  GOOD_CHANCE: "Your rank is within the selected historical cutoff.",
  REACH: "Your rank is slightly beyond the selected historical cutoff.",
  UNLIKELY: "Your rank is beyond the selected historical cutoff range.",
  INSUFFICIENT_DATA: "There is not enough cutoff data to estimate this option.",
};

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const number = Number(value);

  return Number.isFinite(number) ? number.toLocaleString("en-IN") : value;
};

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return value;
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

const formatCutoff = (value) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  return formatNumber(value);
};

const getPredictionClass = (prediction) => {
  switch (prediction) {
    case "SAFE":
      return "safe";
    case "GOOD_CHANCE":
      return "good";
    case "REACH":
      return "reach";
    case "UNLIKELY":
      return "unlikely";
    default:
      return "insufficient";
  }
};

// Merge new values into an existing option list (unique + sorted)
const mergeOptions = (existing, incoming) =>
  [...new Set([...existing, ...incoming.filter(Boolean)])].sort((a, b) =>
    a.localeCompare(b),
  );

function NeetpgPredictor() {
  const [form, setForm] = useState(initialForm);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [pagination, setPagination] = useState(null);

  // The query that produced the results currently on screen.
  // Result filters and pagination always build on this, so editing the
  // sidebar without clicking Predict never changes the displayed results.
  const [appliedQuery, setAppliedQuery] = useState(null);

  // State / course options. These are collected from UNFILTERED predictions
  // only, so selecting a state or course never shrinks the dropdown lists.
  const [filterOptions, setFilterOptions] = useState(emptyFilterOptions);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedRounds, setExpandedRounds] = useState({});
  const [page, setPage] = useState(1);

  const pageSize = 20;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const runPrediction = async (
    query,
    requestedPage = 1,
    { resetOptions = false } = {},
  ) => {
    setLoading(true);
    setError("");
    setHasSearched(true);
    setPage(requestedPage);

    try {
      const params = {
        rank: query.rank,
        category: query.category,
        quota: query.quota,
        page: requestedPage,
        limit: pageSize,
      };

      if (query.state) {
        params.state = query.state;
      }

      if (query.course) {
        params.course = query.course;
      }

      if (query.round) {
        params.round = query.round;
      }

      const response = await axios.get(`${API_URL}/predictor/neet-pg`, {
        params,
      });

      const data = response.data;

      if (!data?.success) {
        throw new Error(data?.message || "Unable to generate predictions.");
      }

      const nextResults = data.results || [];

      setResults(nextResults);
      setSummary(data.summary || null);
      setCandidate(data.candidate || null);
      setPagination(data.pagination || null);
      setAppliedQuery(query);
      setExpandedRounds({});

      // Only learn filter options from unfiltered responses, so the lists
      // stay complete after a state / course is selected.
      if (!query.state && !query.course) {
        setFilterOptions((previous) => ({
          states: mergeOptions(
            resetOptions ? [] : previous.states,
            nextResults.map((item) => item.state),
          ),
          courses: mergeOptions(
            resetOptions ? [] : previous.courses,
            nextResults.map((item) => item.course),
          ),
        }));
      }
    } catch (requestError) {
      setResults([]);
      setSummary(null);
      setCandidate(null);
      setPagination(null);

      // A failed fresh prediction has no valid result set to filter
      if (resetOptions) {
        setAppliedQuery(null);
        setFilterOptions(emptyFilterOptions);
      }

      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Failed to fetch predictions. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Sidebar "Predict Colleges": a fresh prediction, result filters start clean
  const handlePredict = (event) => {
    if (event) event.preventDefault();

    const rank = Number(form.rank);

    if (!form.rank || !Number.isSafeInteger(rank) || rank <= 0) {
      setError("Please enter a valid positive NEET PG rank.");
      return;
    }

    if (!form.category || !form.quota) {
      setError("Please select your category and quota.");
      return;
    }

    setForm((previous) => ({
      ...previous,
      state: "",
      course: "",
      round: "",
    }));

    runPrediction(
      {
        rank,
        category: form.category,
        quota: form.quota,
        state: "",
        course: "",
        round: "",
      },
      1,
      { resetOptions: true },
    );
  };

  // Result filters: State / Course / Round on top of the current prediction
  const handleApplyFilters = () => {
    if (!appliedQuery) return;

    runPrediction(
      {
        ...appliedQuery,
        state: form.state,
        course: form.course,
        round: form.round,
      },
      1,
    );
  };

  const handleClearFilters = () => {
    setForm((previous) => ({
      ...previous,
      state: "",
      course: "",
      round: "",
    }));

    if (appliedQuery) {
      runPrediction({ ...appliedQuery, state: "", course: "", round: "" }, 1);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setResults([]);
    setSummary(null);
    setCandidate(null);
    setPagination(null);
    setAppliedQuery(null);
    setFilterOptions(emptyFilterOptions);
    setError("");
    setHasSearched(false);
    setExpandedRounds({});
    setPage(1);
  };

  const toggleRounds = (index) => {
    setExpandedRounds((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  const changePage = (nextPage) => {
    if (
      !pagination ||
      !appliedQuery ||
      nextPage < 1 ||
      nextPage > pagination.total_pages ||
      loading
    ) {
      return;
    }

    runPrediction(appliedQuery, nextPage);
  };

  const resultStart =
    pagination?.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0;

  const resultEnd = pagination
    ? Math.min(pagination.page * pagination.limit, pagination.total)
    : 0;

  const hasActiveFilters = Boolean(form.state || form.course || form.round);

  return (
    <div className="npg-predictor">
      <div className="npg-predictor-header">
        <div>
          <span className="npg-predictor-eyebrow">NEET PG 2025</span>

          <h1>NEET PG College Predictor</h1>

          <p>
            Explore colleges using historical allotment ranks, round-wise
            cutoffs, and available college details.
          </p>
        </div>
      </div>

      <div className="npg-predictor-layout">
        <aside className="npg-predictor-sidebar">
          <div className="npg-predictor-filter-heading">
            <SlidersHorizontal size={19} />

            <div>
              <h2>Predictor Filters</h2>
              <p>Enter your details to explore colleges.</p>
            </div>
          </div>

          <form className="npg-predictor-form" onSubmit={handlePredict}>
            <div className="npg-predictor-field">
              <label htmlFor="rank">NEET PG Rank *</label>

              <input
                id="rank"
                name="rank"
                type="number"
                min="1"
                step="1"
                placeholder="Enter your rank"
                value={form.rank}
                onChange={handleChange}
                required
              />
            </div>

            <div className="npg-predictor-field">
              <label htmlFor="category">Category *</label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="npg-predictor-field">
              <label htmlFor="quota">Quota *</label>

              <select
                id="quota"
                name="quota"
                value={form.quota}
                onChange={handleChange}
                required
              >
                {quotaOptions.map((quota) => (
                  <option key={quota} value={quota}>
                    {quota}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="npg-predictor-submit"
              disabled={loading}
            >
              <Search size={18} />

              {loading ? "Predicting..." : "Predict Colleges"}
            </button>

            <button
              type="button"
              className="npg-predictor-reset"
              onClick={handleReset}
              disabled={loading}
            >
              <RotateCcw size={16} />
              Reset Predictor
            </button>
          </form>
        </aside>

        <main className="npg-predictor-results">
          {error && (
            <div className="npg-predictor-error" role="alert">
              <AlertCircle size={19} />
              <span>{error}</span>
            </div>
          )}

          {candidate && (
            <div className="npg-predictor-candidate">
              <div>
                <span>Your Rank</span>
                <strong>{formatNumber(candidate.rank)}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{candidate.category}</strong>
              </div>

              <div>
                <span>Quota</span>
                <strong>{candidate.quota}</strong>
              </div>

              {candidate.round && (
                <div>
                  <span>Selected Round</span>
                  <strong>Round {candidate.round}</strong>
                </div>
              )}
            </div>
          )}

          {summary && (
            <div className="npg-predictor-summary">
              <div className="npg-summary-card">
                <Building2 size={20} />
                <span>Total Options</span>
                <strong>{formatNumber(summary.total)}</strong>
              </div>

              <div className="npg-summary-card safe">
                <CheckCircle2 size={20} />
                <span>Safe</span>
                <strong>{formatNumber(summary.safe)}</strong>
              </div>

              <div className="npg-summary-card good">
                <CheckCircle2 size={20} />
                <span>Good Chance</span>
                <strong>{formatNumber(summary.good_chance)}</strong>
              </div>

              <div className="npg-summary-card reach">
                <AlertTriangle size={20} />
                <span>Reach</span>
                <strong>{formatNumber(summary.reach)}</strong>
              </div>

              <div className="npg-summary-card unlikely">
                <XCircle size={20} />
                <span>Unlikely</span>
                <strong>{formatNumber(summary.unlikely)}</strong>
              </div>
            </div>
          )}

          {/* Result filters: only visible once a prediction has been made */}
          {appliedQuery && (
            <section
              className="npg-results-filters"
              aria-labelledby="npg-results-filters-title"
            >
              <div className="npg-results-filters-heading">
                <div>
                  <h2 id="npg-results-filters-title">
                    Filter Predicted Colleges
                  </h2>
                  <p>
                    Narrow your results by state, course, or counselling round.
                  </p>
                </div>
                <SlidersHorizontal size={20} aria-hidden="true" />
              </div>

              <div className="npg-results-filters-grid">
                <div className="npg-predictor-field">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  >
                    <option value="">All States</option>
                    {filterOptions.states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="npg-predictor-field">
                  <label htmlFor="course">Course / Specialty</label>
                  <select
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                  >
                    <option value="">All Courses</option>
                    {filterOptions.courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="npg-predictor-field">
                  <label htmlFor="round">Counselling Round</label>
                  <select
                    id="round"
                    name="round"
                    value={form.round}
                    onChange={handleChange}
                  >
                    {roundOptions.map((option) => (
                      <option key={option.value || "all"} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="npg-results-filter-actions">
                <button
                  type="button"
                  className="npg-predictor-submit"
                  onClick={handleApplyFilters}
                  disabled={loading}
                >
                  <Search size={17} /> Apply Filters
                </button>
                <button
                  type="button"
                  className="npg-predictor-reset"
                  onClick={handleClearFilters}
                  disabled={loading || !hasActiveFilters}
                >
                  <RotateCcw size={16} /> Clear Result Filters
                </button>
              </div>
            </section>
          )}

          {loading && (
            <div className="npg-predictor-loading">
              <div className="npg-predictor-spinner" />
              <p>Analyzing historical allotment data...</p>
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && !error && (
            <div className="npg-predictor-empty">
              <Search size={32} />
              <h3>No colleges found</h3>
              <p>
                Try changing your rank, category, quota, or the result filters
                above.
              </p>
            </div>
          )}

          {!loading && !hasSearched && (
            <div className="npg-predictor-empty">
              <GraduationCap size={36} />
              <h3>Find colleges for your rank</h3>
              <p>
                Enter your rank, choose your category and quota, and click
                Predict Colleges. State, course and round filters will appear
                with your results.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <div className="npg-predictor-results-heading">
                <div>
                  <h2>Predicted Colleges</h2>

                  <p>
                    Showing {formatNumber(resultStart)}–
                    {formatNumber(resultEnd)} of{" "}
                    {formatNumber(pagination?.total)} options
                  </p>
                </div>
              </div>

              <div className="npg-predictor-disclaimer">
                <AlertCircle size={17} />
                <span>
                  Historical estimates only. Prediction labels are heuristic,
                  not admission guarantees or calibrated probabilities.
                </span>
              </div>

              <div className="npg-predictor-college-list">
                {results.map((college, index) => {
                  const expanded = Boolean(expandedRounds[index]);

                  return (
                    <article
                      className="npg-predictor-college-card"
                      key={[
                        college.institute,
                        college.course,
                        college.state,
                        college.quota,
                        index,
                      ].join("-")}
                    >
                      <div className="npg-college-main">
                        <div className="npg-college-title">
                          <div className="npg-college-icon">
                            <Building2 size={22} />
                          </div>

                          <div className="npg-college-title-text">
                            <h3>{college.institute}</h3>

                            <div className="npg-college-meta">
                              <span>
                                <GraduationCap size={14} />
                                {college.course || "Course unavailable"}
                              </span>

                              <span>
                                <MapPin size={14} />
                                {college.state || "State unavailable"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`npg-prediction-badge ${getPredictionClass(
                            college.prediction,
                          )}`}
                          title={predictionDescriptions[college.prediction]}
                        >
                          {predictionLabels[college.prediction] ||
                            college.prediction}
                        </div>
                      </div>

                      <div className="npg-rank-grid">
                        <div className="npg-rank-item">
                          <span>Opening Rank</span>
                          <strong>{formatCutoff(college.opening_rank)}</strong>
                        </div>

                        <div className="npg-rank-item">
                          <span>Overall Closing Rank</span>
                          <strong>
                            {formatCutoff(college.best_closing_rank)}
                          </strong>
                        </div>

                        <div className="npg-rank-item">
                          <span>Latest Closing Rank</span>
                          <strong>
                            {formatCutoff(college.latest_closing_rank)}
                          </strong>
                        </div>

                        <div className="npg-rank-item">
                          <span>Prediction Cutoff</span>
                          <strong>
                            {formatCutoff(college.prediction_closing_rank)}
                          </strong>
                        </div>
                      </div>

                      <div className="npg-college-details">
                        <div>
                          <IndianRupee size={16} />
                          <span>Fee</span>
                          <strong>{formatCurrency(college.fee)}</strong>
                        </div>

                        <div>
                          <Wallet size={16} />
                          <span>Year 1 Stipend</span>
                          <strong>{formatCurrency(college.stipend)}</strong>
                        </div>

                        <div>
                          <BedDouble size={16} />
                          <span>Beds</span>
                          <strong>{formatNumber(college.beds)}</strong>
                        </div>

                        <div>
                          <Building2 size={16} />
                          <span>Seats</span>
                          <strong>{formatNumber(college.seats)}</strong>
                        </div>

                        <div>
                          <Clock3 size={16} />
                          <span>Bond Years</span>
                          <strong>{college.bond_years ?? "N/A"}</strong>
                        </div>

                        <div>
                          <IndianRupee size={16} />
                          <span>Bond Penalty</span>
                          <strong>
                            {formatCurrency(college.bond_penalty)}
                          </strong>
                        </div>
                      </div>

                      <div className="npg-college-bottom">
                        <div className="npg-college-round-info">
                          <History size={16} />

                          <span>
                            Latest available round:{" "}
                            {college.latest_round
                              ? `Round ${college.latest_round}`
                              : "N/A"}
                          </span>

                          {college.score !== null &&
                            college.score !== undefined && (
                              <span>Heuristic score: {college.score}/100</span>
                            )}
                        </div>

                        <button
                          type="button"
                          className="npg-round-toggle"
                          onClick={() => toggleRounds(index)}
                          aria-expanded={expanded}
                        >
                          {expanded ? "Hide" : "View"} Round History
                          {expanded ? (
                            <ChevronUp size={17} />
                          ) : (
                            <ChevronDown size={17} />
                          )}
                        </button>
                      </div>

                      {expanded && (
                        <div className="npg-round-history">
                          <h4>Round-wise Allotment History</h4>

                          {college.rounds?.length ? (
                            <div className="npg-round-table-wrap">
                              <table className="npg-round-table">
                                <thead>
                                  <tr>
                                    <th>Round</th>
                                    <th>Opening Rank</th>
                                    <th>Closing Rank</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {college.rounds.map((roundItem) => (
                                    <tr key={roundItem.round}>
                                      <td>
                                        Round {roundItem.round}
                                        {Number(college.prediction_round) ===
                                          Number(roundItem.round) && (
                                          <span className="npg-round-selected">
                                            Prediction round
                                          </span>
                                        )}
                                      </td>

                                      <td>
                                        {formatCutoff(roundItem.opening_rank)}
                                      </td>

                                      <td>
                                        {formatCutoff(roundItem.closing_rank)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p>No round-wise history available.</p>
                          )}

                          <h4>Historical Closing Ranks</h4>

                          <div className="npg-historical-cutoffs">
                            {[
                              ["2024 Round 1", "cr_2024_1"],
                              ["2024 Round 2", "cr_2024_2"],
                              ["2024 Round 3", "cr_2024_3"],
                              ["2024 Round 4", "cr_2024_4"],
                              ["2024 Round 5", "cr_2024_5"],
                              ["2025 Round 1", "cr_2025_1"],
                              ["2025 Round 2", "cr_2025_2"],
                              ["2025 Round 3", "cr_2025_3"],
                              ["2025 Round 4", "cr_2025_4"],
                            ].map(([label, key]) => (
                              <div
                                className="npg-historical-cutoff-item"
                                key={key}
                              >
                                <span>{label}</span>
                                <strong>
                                  {formatCutoff(
                                    college.historical_cutoffs?.[key],
                                  )}
                                </strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {pagination && pagination.total_pages > 1 && (
                <div className="npg-predictor-pagination">
                  <button
                    type="button"
                    onClick={() => changePage(page - 1)}
                    disabled={page <= 1 || loading}
                  >
                    Previous
                  </button>

                  <span>
                    Page {pagination.page} of {pagination.total_pages}
                  </span>

                  <button
                    type="button"
                    onClick={() => changePage(page + 1)}
                    disabled={page >= pagination.total_pages || loading}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default NeetpgPredictor;
