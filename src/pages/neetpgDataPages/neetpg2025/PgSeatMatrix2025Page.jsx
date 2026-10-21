import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Eye,
  EyeOff,
  X,
  Filter,
  ChevronDown,
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
} from "lucide-react";
import "./PgSeatMatrix2025Page.css";

/* ───────────────────────── API ───────────────────────── */

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const SEAT_MATRIX_URL = `${API_BASE}/seat-matrix/pg/2025`;
const FILTERS_URL = `${API_BASE}/seat-matrix/pg/2025/filters`;

const PER_PAGE = 50;

/* ───────────────────────── Column configuration ───────────────────────── */

const RANK_2025 = ["cr_2025_1", "cr_2025_2", "cr_2025_3", "cr_2025_4"];
const RANK_2024 = [
  "cr_2024_1",
  "cr_2024_2",
  "cr_2024_3",
  "cr_2024_4",
  "cr_2024_5",
];
const ALL_RANK_COLS = [...RANK_2025, ...RANK_2024];

const COL_DEFS = [
  { key: "round", label: "Round", group: "Basic Info" },
  { key: "quota", label: "Quota", group: "Basic Info" },
  { key: "category", label: "Category", group: "Basic Info" },
  { key: "state", label: "State", group: "Basic Info" },
  { key: "institute", label: "Institute", group: "Basic Info" },
  { key: "course", label: "Course", group: "Basic Info" },
  { key: "branch", label: "Branch", group: "Basic Info" },
  { key: "seats", label: "Seats", group: "Seat Details" },
  { key: "beds", label: "Beds", group: "Seat Details" },
  { key: "stipend_year_1", label: "Stipend (Yr 1)", group: "Stipend & Bond" },
  { key: "bond_years", label: "Bond", group: "Stipend & Bond" },
  { key: "bond_penalty", label: "Bond Penalty", group: "Stipend & Bond" },
  { key: "cr_2025_1", label: "2025 R1", group: "Closing Rank 2025" },
  { key: "cr_2025_2", label: "2025 R2", group: "Closing Rank 2025" },
  { key: "cr_2025_3", label: "2025 R3", group: "Closing Rank 2025" },
  { key: "cr_2025_4", label: "2025 R4", group: "Closing Rank 2025" },
  { key: "cr_2024_1", label: "2024 R1", group: "Closing Rank 2024" },
  { key: "cr_2024_2", label: "2024 R2", group: "Closing Rank 2024" },
  { key: "cr_2024_3", label: "2024 R3", group: "Closing Rank 2024" },
  { key: "cr_2024_4", label: "2024 R4", group: "Closing Rank 2024" },
  { key: "cr_2024_5", label: "2024 R5", group: "Closing Rank 2024" },
];

const COL_GROUPS = [
  "Basic Info",
  "Seat Details",
  "Stipend & Bond",
  "Closing Rank 2025",
  "Closing Rank 2024",
].map((label) => ({
  label,
  keys: COL_DEFS.filter((c) => c.group === label).map((c) => c.key),
}));

const DEFAULT_VISIBLE_KEYS = [
  "round",
  "quota",
  "category",
  "state",
  "institute",
  "course",
  "seats",
  "stipend_year_1",
  ...RANK_2025,
];

const DEFAULT_VIS = COL_DEFS.reduce(
  (acc, { key }) => ({ ...acc, [key]: DEFAULT_VISIBLE_KEYS.includes(key) }),
  {},
);

const RANK_VIEWS = [
  { value: "2025", label: "CR 2025" },
  { value: "2024", label: "CR 2024" },
  { value: "both", label: "Both" },
];

const rankKeysForView = (view) =>
  view === "2025" ? RANK_2025 : view === "2024" ? RANK_2024 : ALL_RANK_COLS;

const isRankKey = (key) => key.startsWith("cr_");

/* ───────────────────────── Helpers ───────────────────────── */

const toRank = (val) => {
  const match = String(val ?? "").match(/\d+/);
  const num = match ? parseInt(match[0], 10) : NaN;
  return Number.isNaN(num) || num <= 0 ? null : num;
};

const formatStipend = (val) => {
  const num = Number(String(val ?? "").replace(/[^0-9.]/g, ""));
  if (!num) return "—";
  return `₹${(num / 1000).toFixed(2)} K`;
};

const formatPenalty = (val) => {
  const num = Number(String(val ?? "").replace(/[^0-9.]/g, ""));
  if (!num) return "—";
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${num.toLocaleString("en-IN")}`;
};

const categoryBadgeClass = (category) => {
  const cat = String(category || "").toUpperCase();
  if (cat === "UR" || cat === "GEN" || cat === "OPEN")
    return "pg25-sm-badge-cat-gray";
  if (cat === "OBC") return "pg25-sm-badge-cat-yellow";
  if (cat === "SC") return "pg25-sm-badge-cat-red";
  if (cat === "ST") return "pg25-sm-badge-cat-blue";
  if (cat === "EWS") return "pg25-sm-badge-cat-green";
  return "pg25-sm-badge-cat-purple";
};

const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const EMPTY_FILTER_OPTIONS = {
  rounds: [],
  states: [],
  quotas: [],
  categories: [],
  courses: [],
  branches: [],
};

/* ───────────────────────── Small components ───────────────────────── */

const CustomSelect = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter((opt) =>
    String(opt).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="pg25-sm-cs-wrapper">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="pg25-sm-cs-button"
      >
        <span className="pg25-sm-cs-button-label">
          {value === "all" ? allLabel : value}
        </span>
        <ChevronDown
          className={`pg25-sm-cs-chevron ${open ? "pg25-sm-cs-chevron-open" : ""}`}
        />
      </button>
      {open && (
        <>
          <div className="pg25-sm-cs-overlay" onClick={() => setOpen(false)} />
          <div className="pg25-sm-cs-dropdown">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="pg25-sm-cs-search-input"
            />
            <div className="pg25-sm-cs-options-list">
              {filtered.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setSearch("");
                    setOpen(false);
                  }}
                  className={`pg25-sm-cs-option ${value === opt ? "pg25-sm-cs-option-selected" : ""}`}
                >
                  {opt === "all" ? allLabel : opt}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const RankCell = ({ val }) => {
  const rank = toRank(val);
  if (rank === null) return <span className="pg25-sm-rank-empty">—</span>;

  const tier =
    rank <= 100
      ? "pg25-sm-rank-tier-1"
      : rank <= 500
        ? "pg25-sm-rank-tier-2"
        : rank <= 2000
          ? "pg25-sm-rank-tier-3"
          : rank <= 5000
            ? "pg25-sm-rank-tier-4"
            : "pg25-sm-rank-tier-5";

  return (
    <span className={`pg25-sm-rank-value ${tier}`}>
      {rank.toLocaleString()}
    </span>
  );
};

const renderCell = (item, key) => {
  switch (key) {
    case "round":
      return (
        <td key={key}>
          <span className="pg25-sm-badge-round">R{item.round ?? "—"}</span>
        </td>
      );
    case "quota":
      return (
        <td key={key}>
          <span className="pg25-sm-badge-quota">{item.quota || "—"}</span>
        </td>
      );
    case "category":
      return (
        <td key={key}>
          <span
            className={`pg25-sm-badge-category-base ${categoryBadgeClass(item.category)}`}
          >
            {item.category || "—"}
          </span>
        </td>
      );
    case "institute":
      return (
        <td key={key} className="pg25-sm-td-institute">
          {item.institute || "—"}
        </td>
      );
    case "course":
    case "branch":
    case "state":
      return <td key={key}>{item[key] || "—"}</td>;
    case "seats":
      return (
        <td key={key} className="pg25-sm-td-seats">
          {item.seats || "—"}
        </td>
      );
    case "beds":
      return (
        <td key={key} className="pg25-sm-td-muted">
          {item.beds ? Number(item.beds).toLocaleString() : "—"}
        </td>
      );
    case "stipend_year_1":
      return (
        <td key={key} className="pg25-sm-td-fee">
          {formatStipend(item.stipend_year_1)}
        </td>
      );
    case "bond_years": {
      // null (missing / "-" / "Info Not Available" in the CSV) shows as "—"
      const hasValue =
        item.bond_years !== null && item.bond_years !== undefined;
      const yrs = Number(item.bond_years);
      return (
        <td key={key}>
          {!hasValue ? (
            "—"
          ) : yrs > 0 ? (
            <span className="pg25-sm-badge-bond">{yrs} Yr</span>
          ) : (
            <span className="pg25-sm-badge-nobond">No Bond</span>
          )}
        </td>
      );
    }
    case "bond_penalty":
      return (
        <td key={key} className="pg25-sm-td-muted">
          {formatPenalty(item.bond_penalty)}
        </td>
      );
    default:
      // closing-rank columns
      return (
        <td
          key={key}
          className={`pg25-sm-td-rank ${key.startsWith("cr_2024") ? "pg25-sm-td-rank-24" : ""}`}
        >
          <RankCell val={item[key]} />
        </td>
      );
  }
};

/* ───────────────────────── Page ───────────────────────── */

const PgSeatMatrix2025Page = () => {
  const navigate = useNavigate();

  // server data
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSeats, setTotalSeats] = useState(0);
  const [filterOptions, setFilterOptions] = useState(EMPTY_FILTER_OPTIONS);

  // request state
  const [loading, setLoading] = useState(true); // first load only
  const [fetching, setFetching] = useState(false); // every refetch
  const [dataError, setDataError] = useState(false);

  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selRound, setSelRound] = useState("all");
  const [selState, setSelState] = useState("all");
  const [selQuota, setSelQuota] = useState("all");
  const [selCategory, setSelCategory] = useState("all");
  const [selCourse, setSelCourse] = useState("all");
  const [selBranch, setSelBranch] = useState("all");
  const [minSeats, setMinSeats] = useState("");
  const [minRank, setMinRank] = useState("");
  const [maxRank, setMaxRank] = useState("");
  const [rankView, setRankView] = useState("2025");

  const [showAdv, setShowAdv] = useState(false);
  const [showColModal, setShowColModal] = useState(false);
  const [colVis, setColVis] = useState(DEFAULT_VIS);
  const [page, setPage] = useState(1);

  // typing inputs wait 400ms before hitting the API
  const debouncedSearch = useDebounce(searchTerm);
  const debouncedMinSeats = useDebounce(minSeats);
  const debouncedMinRank = useDebounce(minRank);
  const debouncedMaxRank = useDebounce(maxRank);

  // any filter change sends the user back to page 1
  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  /* ── column visibility ── */
  const toggleCol = (key) =>
    setColVis((prev) => ({ ...prev, [key]: !prev[key] }));
  const showAll = () =>
    setColVis(COL_DEFS.reduce((acc, { key }) => ({ ...acc, [key]: true }), {}));
  const hideAll = () =>
    setColVis(
      COL_DEFS.reduce(
        (acc, { key }) => ({
          ...acc,
          [key]: key === "institute" || key === "course",
        }),
        {},
      ),
    );

  const applyRankView = (view) => {
    setRankView(view);
    setPage(1);
    const visibleRanks = rankKeysForView(view);
    setColVis((prev) => {
      const next = { ...prev };
      ALL_RANK_COLS.forEach((key) => {
        next[key] = visibleRanks.includes(key);
      });
      return next;
    });
  };

  /* ── load filter dropdown values (once) ── */
  useEffect(() => {
    fetch(FILTERS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Filters fetch failed");
        return res.json();
      })
      .then((json) =>
        setFilterOptions({ ...EMPTY_FILTER_OPTIONS, ...(json.filters || {}) }),
      )
      .catch((error) => console.error("Failed to load filters:", error));
  }, []);

  /* ── build the API query ── */
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(PER_PAGE));

    if (selRound !== "all") params.set("round", selRound);
    if (selState !== "all") params.set("state", selState);
    if (selQuota !== "all") params.set("quota", selQuota);
    if (selCategory !== "all") params.set("category", selCategory);
    if (selCourse !== "all") params.set("course", selCourse);
    if (selBranch !== "all") params.set("branch", selBranch);
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    if (debouncedMinSeats) params.set("minSeats", debouncedMinSeats);
    if (debouncedMinRank) params.set("rankFrom", debouncedMinRank);
    if (debouncedMaxRank) params.set("rankTo", debouncedMaxRank);
    if (debouncedMinRank || debouncedMaxRank) params.set("rankView", rankView);

    return params.toString();
  }, [
    page,
    selRound,
    selState,
    selQuota,
    selCategory,
    selCourse,
    selBranch,
    debouncedSearch,
    debouncedMinSeats,
    debouncedMinRank,
    debouncedMaxRank,
    rankView,
  ]);

  /* ── fetch rows ── */
  useEffect(() => {
    const controller = new AbortController();
    setFetching(true);

    fetch(`${SEAT_MATRIX_URL}?${queryString}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((json) => {
        setData(json.data || []);
        setTotal(json.pagination?.total ?? 0);
        setTotalPages(Math.max(1, json.pagination?.totalPages ?? 1));
        setTotalSeats(json.totalSeats ?? 0);
        setDataError(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setDataError(true);
        setData([]);
        setTotal(0);
        setTotalPages(1);
        setTotalSeats(0);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setFetching(false);
        setLoading(false);
      });

    // cancels the previous request if filters change before it finishes
    return () => controller.abort();
  }, [queryString]);

  const rounds = filterOptions.rounds;
  const states = useMemo(
    () => ["all", ...filterOptions.states],
    [filterOptions.states],
  );
  const quotas = useMemo(
    () => ["all", ...filterOptions.quotas],
    [filterOptions.quotas],
  );
  const categories = useMemo(
    () => ["all", ...filterOptions.categories],
    [filterOptions.categories],
  );
  const courses = useMemo(
    () => ["all", ...filterOptions.courses],
    [filterOptions.courses],
  );
  const branches = useMemo(
    () => ["all", ...filterOptions.branches],
    [filterOptions.branches],
  );

  const clearAll = () => {
    setSearchTerm("");
    setSelRound("all");
    setSelState("all");
    setSelQuota("all");
    setSelCategory("all");
    setSelCourse("all");
    setSelBranch("all");
    setMinSeats("");
    setMinRank("");
    setMaxRank("");
    setRankView("2025");
    setColVis(DEFAULT_VIS);
    setPage(1);
  };

  const visibleCols = COL_DEFS.filter(({ key }) => colVis[key]);

  if (loading)
    return (
      <div className="pg25-sm-loading-screen">
        <div className="pg25-sm-loading-box">
          <div className="pg25-sm-loading-spinner" />
          <p>Loading NEET PG seat matrix...</p>
        </div>
      </div>
    );

  return (
    <div className="pg25-sm-page-root">
      {/* ── Column modal ── */}
      {showColModal && (
        <div
          className="pg25-sm-modal-overlay"
          onClick={() => setShowColModal(false)}
        >
          <div
            className="pg25-sm-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pg25-sm-modal-header">
              <h3>Show / Hide Columns</h3>
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="pg25-sm-modal-close-btn"
              >
                <X />
              </button>
            </div>
            <div className="pg25-sm-modal-body">
              <div className="pg25-sm-modal-actions">
                <button
                  type="button"
                  onClick={showAll}
                  className="pg25-sm-btn-secondary"
                >
                  Show All
                </button>
                <button
                  type="button"
                  onClick={hideAll}
                  className="pg25-sm-btn-secondary"
                >
                  Hide All
                </button>
              </div>
              {COL_GROUPS.map((group) => (
                <div key={group.label} className="pg25-sm-col-group">
                  <p className="pg25-sm-col-group-label">{group.label}</p>
                  {group.keys.map((key) => (
                    <label key={key} className="pg25-sm-col-row">
                      <input
                        type="checkbox"
                        checked={colVis[key]}
                        onChange={() => toggleCol(key)}
                      />
                      <span>
                        {COL_DEFS.find((def) => def.key === key)?.label || key}
                      </span>
                      {colVis[key] ? <Eye /> : <EyeOff />}
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <div className="pg25-sm-modal-footer">
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="pg25-sm-btn-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pg25-sm-content-wrapper">
        {/* ── Header ── */}
        <div className="pg25-sm-app-header">
          <div className="pg25-sm-header-row">
            <div className="pg25-sm-header-left">
              <button
                type="button"
                onClick={() => navigate("/dashboard/neet-pg")}
                className="pg25-sm-back-btn"
              >
                <ArrowLeft className="pg25-sm-icon-sm" />
              </button>
              <div className="pg25-sm-header-text">
                <h1>Seat Matrix</h1>
                <p>NEET PG 2025</p>
              </div>
            </div>
            <span className="pg25-sm-records-count">
              {total.toLocaleString()} Records
            </span>
          </div>
        </div>

        {dataError && (
          <div className="pg25-sm-error-banner">
            ⚠️ Unable to load seat matrix data from the server. Please check
            your connection and try again.
          </div>
        )}

        {/* ── Round pills + rank view + columns ── */}
        <div className="pg25-sm-pills-row">
          <div className="pg25-sm-pill-group">
            <button
              type="button"
              onClick={() => withReset(setSelRound)("all")}
              className={`pg25-sm-pill ${selRound === "all" ? "pg25-sm-pill-active" : "pg25-sm-pill-inactive"}`}
            >
              All Rounds
            </button>
            {rounds.map((round) => (
              <button
                type="button"
                key={round}
                onClick={() => withReset(setSelRound)(round)}
                className={`pg25-sm-pill ${selRound === round ? "pg25-sm-pill-active" : "pg25-sm-pill-inactive"}`}
              >
                R{round}
              </button>
            ))}
          </div>

          <span className="pg25-sm-pill-divider" aria-hidden="true" />

          <div className="pg25-sm-pill-group">
            {RANK_VIEWS.map(({ value, label }) => (
              <button
                type="button"
                key={value}
                onClick={() => applyRankView(value)}
                className={`pg25-sm-pill ${rankView === value ? "pg25-sm-pill-active-alt" : "pg25-sm-pill-inactive-alt"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowColModal(true)}
            className="pg25-sm-pill-icon-btn"
          >
            <Eye className="pg25-sm-icon-sm" /> Columns
          </button>
        </div>

        {/* ── Search + Filters ── */}
        <div className="pg25-sm-filters-row">
          <div className="pg25-sm-search-box">
            <Search />
            <input
              type="text"
              placeholder="Search institute, course, branch, state..."
              value={searchTerm}
              onChange={(e) => withReset(setSearchTerm)(e.target.value)}
            />
          </div>

          <div className="pg25-sm-filter-selects">
            <CustomSelect
              value={selState}
              onChange={withReset(setSelState)}
              options={states}
              allLabel="All States"
            />
            <CustomSelect
              value={selQuota}
              onChange={withReset(setSelQuota)}
              options={quotas}
              allLabel="All Quotas"
            />
            <CustomSelect
              value={selCategory}
              onChange={withReset(setSelCategory)}
              options={categories}
              allLabel="All Categories"
            />
            <button
              type="button"
              className="pg25-sm-toggle-filter"
              onClick={() => setShowAdv((prev) => !prev)}
            >
              <Filter className="pg25-sm-icon-fl" /> {showAdv ? "Hide" : "More"}{" "}
              Filters
              <ChevronDown
                className={showAdv ? "pg25-sm-cs-chevron-open" : ""}
              />
            </button>
          </div>
        </div>

        {showAdv && (
          <div className="pg25-sm-advanced-filters">
            <CustomSelect
              value={selCourse}
              onChange={withReset(setSelCourse)}
              options={courses}
              allLabel="All Courses"
            />
            <CustomSelect
              value={selBranch}
              onChange={withReset(setSelBranch)}
              options={branches}
              allLabel="All Branches"
            />
            <div className="pg25-sm-rank-inputs">
              <input
                type="number"
                min="0"
                placeholder="Min Seats"
                value={minSeats}
                onChange={(e) => withReset(setMinSeats)(e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Min Rank"
                value={minRank}
                onChange={(e) => withReset(setMinRank)(e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Max Rank"
                value={maxRank}
                onChange={(e) => withReset(setMaxRank)(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="pg25-sm-clear-btn"
              onClick={clearAll}
            >
              Clear Filters
            </button>
            <div className="pg25-sm-filtered-count-row">
              <span className="pg25-sm-filtered-count-num">
                {total.toLocaleString()}
              </span>
              <span>&nbsp;results&nbsp;·&nbsp;</span>
              <span className="pg25-sm-filtered-count-num">
                {totalSeats.toLocaleString()}
              </span>
              <span>&nbsp;seats</span>
            </div>
          </div>
        )}

        {/* ── Table ── */}
        <div
          className="pg25-sm-table-wrapper"
          style={{
            opacity: fetching ? 0.55 : 1,
            transition: "opacity 150ms ease",
          }}
        >
          <table className="pg25-sm-table">
            <thead>
              <tr>
                {visibleCols.map(({ key, label }) => (
                  <th
                    key={key}
                    className={
                      isRankKey(key)
                        ? key.startsWith("cr_2024")
                          ? "pg25-sm-th-rank pg25-sm-th-rank-24"
                          : "pg25-sm-th-rank"
                        : ""
                    }
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={Math.max(1, visibleCols.length)}
                    className="pg25-sm-table-empty"
                  >
                    {dataError
                      ? "Unable to load the data. Please refresh the page and try again."
                      : "No records found for the selected filters."}
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id}>
                    {visibleCols.map(({ key }) => renderCell(item, key))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="pg25-sm-pagination-row">
          <div className="pg25-sm-pagination-info">
            Showing {total > 0 ? (page - 1) * PER_PAGE + 1 : 0}–
            {Math.min(page * PER_PAGE, total)} of {total.toLocaleString()}
          </div>
          <div className="pg25-sm-pagination-controls">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              <PrevIcon />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const pageNum = start + idx;
              if (pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={
                    pageNum === page
                      ? "pg25-sm-page-active"
                      : "pg25-sm-page-btn"
                  }
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgSeatMatrix2025Page;
