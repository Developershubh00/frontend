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
import "./PgSeatMatrix2026Page.css";

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
  const match = String(val || "").match(/\d+/);
  const num = match ? parseInt(match[0], 10) : NaN;
  return Number.isNaN(num) || num <= 0 ? null : num;
};

const formatStipend = (val) => {
  const num = Number(String(val || "").replace(/[^0-9.]/g, ""));
  if (!num) return "—";
  return `₹${(num / 1000).toFixed(2)} K`;
};

const formatPenalty = (val) => {
  const num = Number(String(val || "").replace(/[^0-9.]/g, ""));
  if (!num) return "—";
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${num.toLocaleString("en-IN")}`;
};

const categoryBadgeClass = (category) => {
  const cat = String(category || "").toUpperCase();
  if (cat === "UR" || cat === "GEN" || cat === "OPEN")
    return "pg26-sm-badge-cat-gray";
  if (cat === "OBC") return "pg26-sm-badge-cat-yellow";
  if (cat === "SC") return "pg26-sm-badge-cat-red";
  if (cat === "ST") return "pg26-sm-badge-cat-blue";
  if (cat === "EWS") return "pg26-sm-badge-cat-green";
  return "pg26-sm-badge-cat-purple";
};

const uniqueSorted = (data, key) =>
  Array.from(new Set(data.map((item) => item[key]).filter(Boolean))).sort();

/* ───────────────────────── CSV parsing ───────────────────────── */

const splitCsvLine = (line) => {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  values.push(current.trim());
  return values;
};

const parseCSV = (text) => {
  const clean = text.replace(/^\uFEFF/, "");
  if (clean.includes("<html") || clean.includes("<!DOCTYPE"))
    throw new Error("Invalid CSV");
  const lines = clean.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error("No data");

  const header = splitCsvLine(lines[0]).map((h) =>
    h.replace(/^\uFEFF/, "").trim(),
  );

  return lines.slice(1).map((line, index) => {
    const values = splitCsvLine(line);
    const row = header.reduce((acc, key, i) => {
      acc[key] = values[i] ? values[i].trim() : "";
      return acc;
    }, {});

    const item = {
      _id: index,
      round: row.round || "",
      quota: row.quota || "",
      category: row.category || "",
      state: row.state || "",
      institute: row.institute || "",
      course: row.course || "",
      branch: row.branch || "",
      seats: row.seats || "",
      stipend_year_1: row.stipend_year_1 || "",
      bond_years: row.bond_years || "",
      bond_penalty: row.bond_penalty || "",
      beds: row.beds || "",
    };
    ALL_RANK_COLS.forEach((key) => {
      item[key] = row[key] || "";
    });

    // Pre-computed values so filtering 16k rows stays fast
    item._seatsNum = Number(item.seats) || 0;
    item._ranks2025 = RANK_2025.map((k) => toRank(item[k])).filter(
      (v) => v !== null,
    );
    item._ranks2024 = RANK_2024.map((k) => toRank(item[k])).filter(
      (v) => v !== null,
    );
    return item;
  });
};

/* ───────────────────────── Small components ───────────────────────── */

const CustomSelect = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter((opt) =>
    String(opt).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="pg26-sm-cs-wrapper">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="pg26-sm-cs-button"
      >
        <span className="pg26-sm-cs-button-label">
          {value === "all" ? allLabel : value}
        </span>
        <ChevronDown
          className={`pg26-sm-cs-chevron ${open ? "pg26-sm-cs-chevron-open" : ""}`}
        />
      </button>
      {open && (
        <>
          <div className="pg26-sm-cs-overlay" onClick={() => setOpen(false)} />
          <div className="pg26-sm-cs-dropdown">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="pg26-sm-cs-search-input"
            />
            <div className="pg26-sm-cs-options-list">
              {filtered.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setSearch("");
                    setOpen(false);
                  }}
                  className={`pg26-sm-cs-option ${value === opt ? "pg26-sm-cs-option-selected" : ""}`}
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
  if (rank === null) return <span className="pg26-sm-rank-empty">—</span>;

  const tier =
    rank <= 100
      ? "pg26-sm-rank-tier-1"
      : rank <= 500
        ? "pg26-sm-rank-tier-2"
        : rank <= 2000
          ? "pg26-sm-rank-tier-3"
          : rank <= 5000
            ? "pg26-sm-rank-tier-4"
            : "pg26-sm-rank-tier-5";

  return (
    <span className={`pg26-sm-rank-value ${tier}`}>
      {rank.toLocaleString()}
    </span>
  );
};

const renderCell = (item, key) => {
  switch (key) {
    case "round":
      return (
        <td key={key}>
          <span className="pg26-sm-badge-round">R{item.round || "—"}</span>
        </td>
      );
    case "quota":
      return (
        <td key={key}>
          <span className="pg26-sm-badge-quota">{item.quota || "—"}</span>
        </td>
      );
    case "category":
      return (
        <td key={key}>
          <span
            className={`pg26-sm-badge-category-base ${categoryBadgeClass(item.category)}`}
          >
            {item.category || "—"}
          </span>
        </td>
      );
    case "institute":
      return (
        <td key={key} className="pg26-sm-td-institute">
          {item.institute || "—"}
        </td>
      );
    case "course":
    case "branch":
    case "state":
      return <td key={key}>{item[key] || "—"}</td>;
    case "seats":
      return (
        <td key={key} className="pg26-sm-td-seats">
          {item.seats || "—"}
        </td>
      );
    case "beds":
      return (
        <td key={key} className="pg26-sm-td-muted">
          {/^\d+$/.test(item.beds) ? Number(item.beds).toLocaleString() : "—"}
        </td>
      );
    case "stipend_year_1":
      return (
        <td key={key} className="pg26-sm-td-fee">
          {formatStipend(item.stipend_year_1)}
        </td>
      );
    case "bond_years": {
      // CSV also contains "-" and "Info Not Available" – show those as "—"
      const isNumeric = /^\d+$/.test(item.bond_years);
      const yrs = Number(item.bond_years);
      return (
        <td key={key}>
          {!isNumeric ? (
            "—"
          ) : yrs > 0 ? (
            <span className="pg26-sm-badge-bond">{yrs} Yr</span>
          ) : (
            <span className="pg26-sm-badge-nobond">No Bond</span>
          )}
        </td>
      );
    }
    case "bond_penalty":
      return (
        <td key={key} className="pg26-sm-td-muted">
          {formatPenalty(item.bond_penalty)}
        </td>
      );
    default:
      // closing-rank columns
      return (
        <td
          key={key}
          className={`pg26-sm-td-rank ${key.startsWith("cr_2024") ? "pg26-sm-td-rank-24" : ""}`}
        >
          <RankCell val={item[key]} />
        </td>
      );
  }
};

/* ───────────────────────── Page ───────────────────────── */

const PER_PAGE = 50;

const PgSeatMatrix2026Page = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

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
    const visibleRanks = rankKeysForView(view);
    setColVis((prev) => {
      const next = { ...prev };
      ALL_RANK_COLS.forEach((key) => {
        next[key] = visibleRanks.includes(key);
      });
      return next;
    });
  };

  /* ── load data ── */
  useEffect(() => {
    fetch("/data/neetpg/pg_seat_matrix_2026.csv")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.text();
      })
      .then((text) => {
        setData(parseCSV(text));
        setDataError(false);
      })
      .catch(() => {
        setDataError(true);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ── filter options ── */
  const rounds = useMemo(
    () =>
      Array.from(new Set(data.map((item) => item.round).filter(Boolean))).sort(
        (a, b) => Number(a) - Number(b),
      ),
    [data],
  );
  const states = useMemo(() => ["all", ...uniqueSorted(data, "state")], [data]);
  const quotas = useMemo(() => ["all", ...uniqueSorted(data, "quota")], [data]);
  const categories = useMemo(
    () => ["all", ...uniqueSorted(data, "category")],
    [data],
  );
  const courses = useMemo(
    () => ["all", ...uniqueSorted(data, "course")],
    [data],
  );
  const branches = useMemo(
    () => ["all", ...uniqueSorted(data, "branch")],
    [data],
  );

  /* ── filtering ── */
  const filtered = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    const minSeatsVal = minSeats ? parseInt(minSeats, 10) : null;
    const minRankVal = minRank ? parseFloat(minRank) : null;
    const maxRankVal = maxRank ? parseFloat(maxRank) : null;

    return data.filter((item) => {
      if (selRound !== "all" && item.round !== selRound) return false;
      if (selState !== "all" && item.state !== selState) return false;
      if (selQuota !== "all" && item.quota !== selQuota) return false;
      if (selCategory !== "all" && item.category !== selCategory) return false;
      if (selCourse !== "all" && item.course !== selCourse) return false;
      if (selBranch !== "all" && item.branch !== selBranch) return false;
      if (minSeatsVal !== null && item._seatsNum < minSeatsVal) return false;

      if (minRankVal !== null || maxRankVal !== null) {
        const ranks =
          rankView === "2025"
            ? item._ranks2025
            : rankView === "2024"
              ? item._ranks2024
              : [...item._ranks2025, ...item._ranks2024];
        if (ranks.length === 0) return false;
        const lo = Math.min(...ranks);
        const hi = Math.max(...ranks);
        if (minRankVal !== null && hi < minRankVal) return false;
        if (maxRankVal !== null && lo > maxRankVal) return false;
      }

      if (search) {
        const haystack =
          `${item.institute} ${item.course} ${item.branch} ${item.state} ${item.quota} ${item.category}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });
  }, [
    data,
    searchTerm,
    selRound,
    selState,
    selQuota,
    selCategory,
    selCourse,
    selBranch,
    minSeats,
    minRank,
    maxRank,
    rankView,
  ]);

  const totalSeats = useMemo(
    () => filtered.reduce((sum, item) => sum + item._seatsNum, 0),
    [filtered],
  );

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    selRound,
    selState,
    selQuota,
    selCategory,
    selCourse,
    selBranch,
    minSeats,
    minRank,
    maxRank,
    rankView,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
      <div className="pg26-sm-loading-screen">
        <div className="pg26-sm-loading-box">
          <div className="pg26-sm-loading-spinner" />
          <p>Loading NEET PG seat matrix...</p>
        </div>
      </div>
    );

  return (
    <div className="pg26-sm-page-root">
      {/* ── Column modal ── */}
      {showColModal && (
        <div
          className="pg26-sm-modal-overlay"
          onClick={() => setShowColModal(false)}
        >
          <div
            className="pg26-sm-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pg26-sm-modal-header">
              <h3>Show / Hide Columns</h3>
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="pg26-sm-modal-close-btn"
              >
                <X />
              </button>
            </div>
            <div className="pg26-sm-modal-body">
              <div className="pg26-sm-modal-actions">
                <button
                  type="button"
                  onClick={showAll}
                  className="pg26-sm-btn-secondary"
                >
                  Show All
                </button>
                <button
                  type="button"
                  onClick={hideAll}
                  className="pg26-sm-btn-secondary"
                >
                  Hide All
                </button>
              </div>
              {COL_GROUPS.map((group) => (
                <div key={group.label} className="pg26-sm-col-group">
                  <p className="pg26-sm-col-group-label">{group.label}</p>
                  {group.keys.map((key) => (
                    <label key={key} className="pg26-sm-col-row">
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
            <div className="pg26-sm-modal-footer">
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="pg26-sm-btn-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pg26-sm-content-wrapper">
        {/* ── Header ── */}
        <div className="pg26-sm-app-header">
          <div className="pg26-sm-header-row">
            <div className="pg26-sm-header-left">
              <button
                type="button"
                onClick={() => navigate("/dashboard/neet-pg")}
                className="pg26-sm-back-btn"
              >
                <ArrowLeft className="pg26-sm-icon-sm" />
              </button>
              <div className="pg26-sm-header-text">
                <h1>Seat Matrix</h1>
                <p>NEET PG 2026</p>
              </div>
            </div>
            <span className="pg26-sm-records-count">
              {filtered.length.toLocaleString()} Records
            </span>
          </div>
        </div>

        {dataError && (
          <div className="pg26-sm-error-banner">
            ⚠️ Data not found. Please check that the file exists at
            /data/neetpg/pg_seat_matrix_2026.csv
          </div>
        )}

        {/* ── Round pills + rank view + columns ── */}
        <div className="pg26-sm-pills-row">
          <div className="pg26-sm-pill-group">
            <button
              type="button"
              onClick={() => setSelRound("all")}
              className={`pg26-sm-pill ${selRound === "all" ? "pg26-sm-pill-active" : "pg26-sm-pill-inactive"}`}
            >
              All Rounds
            </button>
            {rounds.map((round) => (
              <button
                type="button"
                key={round}
                onClick={() => setSelRound(round)}
                className={`pg26-sm-pill ${selRound === round ? "pg26-sm-pill-active" : "pg26-sm-pill-inactive"}`}
              >
                R{round}
              </button>
            ))}
          </div>

          <span className="pg26-sm-pill-divider" aria-hidden="true" />

          <div className="pg26-sm-pill-group">
            {RANK_VIEWS.map(({ value, label }) => (
              <button
                type="button"
                key={value}
                onClick={() => applyRankView(value)}
                className={`pg26-sm-pill ${rankView === value ? "pg26-sm-pill-active-alt" : "pg26-sm-pill-inactive-alt"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowColModal(true)}
            className="pg26-sm-pill-icon-btn"
          >
            <Eye className="pg26-sm-icon-sm" /> Columns
          </button>
        </div>

        {/* ── Search + Filters ── */}
        <div className="pg26-sm-filters-row">
          <div className="pg26-sm-search-box">
            <Search />
            <input
              type="text"
              placeholder="Search institute, course, branch, state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="pg26-sm-filter-selects">
            <CustomSelect
              value={selState}
              onChange={setSelState}
              options={states}
              allLabel="All States"
            />
            <CustomSelect
              value={selQuota}
              onChange={setSelQuota}
              options={quotas}
              allLabel="All Quotas"
            />
            <CustomSelect
              value={selCategory}
              onChange={setSelCategory}
              options={categories}
              allLabel="All Categories"
            />
            <button
              type="button"
              className="pg26-sm-toggle-filter"
              onClick={() => setShowAdv((prev) => !prev)}
            >
              <Filter className="pg26-sm-icon-fl" /> {showAdv ? "Hide" : "More"}{" "}
              Filters
              <ChevronDown
                className={showAdv ? "pg26-sm-cs-chevron-open" : ""}
              />
            </button>
          </div>
        </div>

        {showAdv && (
          <div className="pg26-sm-advanced-filters">
            <CustomSelect
              value={selCourse}
              onChange={setSelCourse}
              options={courses}
              allLabel="All Courses"
            />
            <CustomSelect
              value={selBranch}
              onChange={setSelBranch}
              options={branches}
              allLabel="All Branches"
            />
            <div className="pg26-sm-rank-inputs">
              <input
                type="number"
                min="0"
                placeholder="Min Seats"
                value={minSeats}
                onChange={(e) => setMinSeats(e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Min Rank"
                value={minRank}
                onChange={(e) => setMinRank(e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Max Rank"
                value={maxRank}
                onChange={(e) => setMaxRank(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="pg26-sm-clear-btn"
              onClick={clearAll}
            >
              Clear Filters
            </button>
            <div className="pg26-sm-filtered-count-row">
              <span className="pg26-sm-filtered-count-num">
                {filtered.length.toLocaleString()}
              </span>
              <span>&nbsp;results&nbsp;·&nbsp;</span>
              <span className="pg26-sm-filtered-count-num">
                {totalSeats.toLocaleString()}
              </span>
              <span>&nbsp;seats</span>
            </div>
          </div>
        )}

        {/* ── Table ── */}
        <div className="pg26-sm-table-wrapper">
          <table className="pg26-sm-table">
            <thead>
              <tr>
                {visibleCols.map(({ key, label }) => (
                  <th
                    key={key}
                    className={
                      isRankKey(key)
                        ? key.startsWith("cr_2024")
                          ? "pg26-sm-th-rank pg26-sm-th-rank-24"
                          : "pg26-sm-th-rank"
                        : ""
                    }
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={Math.max(1, visibleCols.length)}
                    className="pg26-sm-table-empty"
                  >
                    {dataError
                      ? "Unable to load the data. Please refresh the page and try again."
                      : "No records found for the selected filters."}
                  </td>
                </tr>
              ) : (
                paged.map((item) => (
                  <tr key={item._id}>
                    {visibleCols.map(({ key }) => renderCell(item, key))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="pg26-sm-pagination-row">
          <div className="pg26-sm-pagination-info">
            Showing {filtered.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}–
            {Math.min(page * PER_PAGE, filtered.length)} of{" "}
            {filtered.length.toLocaleString()}
          </div>
          <div className="pg26-sm-pagination-controls">
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
                      ? "pg26-sm-page-active"
                      : "pg26-sm-page-btn"
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

export default PgSeatMatrix2026Page;
