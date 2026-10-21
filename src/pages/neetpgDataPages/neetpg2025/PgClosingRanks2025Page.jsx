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
import "./PgClosingRanks2025Page.css";

/* ───────────────────────── API ───────────────────────── */

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const CLOSING_RANKS_URL = `${API_BASE}/closing-ranks/pg/2025`;
const FILTERS_URL = `${API_BASE}/closing-ranks/pg/2025/filters`;

const PER_PAGE = 50;

/* ───────────────────────── Column configuration ───────────────────────── */

const COL_DEFS = [
  { key: "quota", label: "Quota" },
  { key: "category", label: "Category" },
  { key: "state", label: "State" },
  { key: "institute", label: "Institute" },
  { key: "course", label: "Course" },
  { key: "fee", label: "Fee" },
  { key: "cr_2025_1", label: "Round 1" },
  { key: "cr_2025_2", label: "Round 2" },
  { key: "cr_2025_3", label: "Round 3" },
  { key: "cr_2025_4", label: "Round 4" },
];

const DEFAULT_VIS = COL_DEFS.reduce(
  (acc, { key }) => ({ ...acc, [key]: true }),
  {},
);

const ALL_RANK_COLS = ["cr_2025_1", "cr_2025_2", "cr_2025_3", "cr_2025_4"];

const COL_GROUPS = [
  {
    label: "Basic Info",
    keys: ["quota", "category", "state", "institute", "course"],
  },
  { label: "Rank Columns", keys: ALL_RANK_COLS },
  { label: "Other", keys: ["fee"] },
];

/* ───────────────────────── Helpers ───────────────────────── */

const toRank = (val) => {
  const match = String(val ?? "").match(/\d+/);
  const num = match ? parseInt(match[0], 10) : NaN;
  return Number.isNaN(num) || num <= 0 ? null : num;
};

const formatFee = (fee) => {
  const numeric = Number(String(fee ?? "").replace(/[^0-9.]/g, ""));
  if (!numeric || Number.isNaN(numeric)) return "—";
  const inThousands = numeric / 1000;
  const formatted =
    inThousands >= 100 ? inThousands.toFixed(0) : inThousands.toFixed(2);
  return `₹${formatted} K`;
};

const categoryBadgeClass = (category) => {
  if (category === "UR" || category === "GEN" || category === "Open")
    return "pg25-cr-badge-cat-gray";
  if (category === "OBC") return "pg25-cr-badge-cat-yellow";
  if (category === "SC") return "pg25-cr-badge-cat-red";
  if (category === "ST") return "pg25-cr-badge-cat-blue";
  if (category === "EWS") return "pg25-cr-badge-cat-green";
  return "pg25-cr-badge-cat-purple";
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
  states: [],
  quotas: [],
  categories: [],
  courses: [],
};

/* ───────────────────────── Small components ───────────────────────── */

const CustomSelect = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter((opt) =>
    String(opt).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="pg25-cr-cs-wrapper">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="pg25-cr-cs-button"
      >
        <span className="pg25-cr-cs-button-label">
          {value === "all" ? allLabel : value}
        </span>
        <ChevronDown
          className={`pg25-cr-cs-chevron ${open ? "pg25-cr-cs-chevron-open" : ""}`}
        />
      </button>
      {open && (
        <>
          <div className="pg25-cr-cs-overlay" onClick={() => setOpen(false)} />
          <div className="pg25-cr-cs-dropdown">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="pg25-cr-cs-search-input"
            />
            <div className="pg25-cr-cs-options-list">
              {filtered.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setSearch("");
                    setOpen(false);
                  }}
                  className={`pg25-cr-cs-option ${value === opt ? "pg25-cr-cs-option-selected" : ""}`}
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
  if (rank === null) return <span className="pg25-cr-rank-empty">—</span>;

  const tier =
    rank <= 100
      ? "pg25-cr-rank-tier-1"
      : rank <= 500
        ? "pg25-cr-rank-tier-2"
        : rank <= 2000
          ? "pg25-cr-rank-tier-3"
          : rank <= 5000
            ? "pg25-cr-rank-tier-4"
            : "pg25-cr-rank-tier-5";

  return (
    <span className={`pg25-cr-rank-value ${tier}`}>
      {rank.toLocaleString()}
    </span>
  );
};

/* ───────────────────────── Page ───────────────────────── */

const PgClosingRanks2025Page = () => {
  const navigate = useNavigate();

  // server data
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOptions, setFilterOptions] = useState(EMPTY_FILTER_OPTIONS);

  // request state
  const [loading, setLoading] = useState(true); // first load only
  const [fetching, setFetching] = useState(false); // every refetch
  const [dataError, setDataError] = useState(false);

  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selState, setSelState] = useState("all");
  const [selQuota, setSelQuota] = useState("all");
  const [selCategory, setSelCategory] = useState("all");
  const [selCourse, setSelCourse] = useState("all");
  const [selRound, setSelRound] = useState("all");
  const [minRank, setMinRank] = useState("");
  const [maxRank, setMaxRank] = useState("");

  const [showAdv, setShowAdv] = useState(false);
  const [showColModal, setShowColModal] = useState(false);
  const [colVis, setColVis] = useState(DEFAULT_VIS);
  const [page, setPage] = useState(1);

  // typing inputs wait 400ms before hitting the API
  const debouncedSearch = useDebounce(searchTerm);
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

  const applyRound = (round) => {
    setSelRound(round);
    setPage(1);
    setColVis((prev) => {
      const next = { ...prev };
      ALL_RANK_COLS.forEach((key) => {
        next[key] = round === "all" ? true : key === `cr_2025_${round}`;
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

    if (selState !== "all") params.set("state", selState);
    if (selQuota !== "all") params.set("quota", selQuota);
    if (selCategory !== "all") params.set("category", selCategory);
    if (selCourse !== "all") params.set("course", selCourse);
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    if (debouncedMinRank) params.set("rankFrom", debouncedMinRank);
    if (debouncedMaxRank) params.set("rankTo", debouncedMaxRank);

    // the selected round only narrows which rank column the min/max rank
    // filter looks at; it doesn't hide rows on its own
    if ((debouncedMinRank || debouncedMaxRank) && selRound !== "all") {
      params.set("round", selRound);
    }

    return params.toString();
  }, [
    page,
    selState,
    selQuota,
    selCategory,
    selCourse,
    selRound,
    debouncedSearch,
    debouncedMinRank,
    debouncedMaxRank,
  ]);

  /* ── fetch rows ── */
  useEffect(() => {
    const controller = new AbortController();
    setFetching(true);

    fetch(`${CLOSING_RANKS_URL}?${queryString}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((json) => {
        setData(json.data || []);
        setTotal(json.pagination?.total ?? 0);
        setTotalPages(Math.max(1, json.pagination?.totalPages ?? 1));
        setDataError(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setDataError(true);
        setData([]);
        setTotal(0);
        setTotalPages(1);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setFetching(false);
        setLoading(false);
      });

    // cancels the previous request if filters change before it finishes
    return () => controller.abort();
  }, [queryString]);

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

  const clearAll = () => {
    setSearchTerm("");
    setSelState("all");
    setSelQuota("all");
    setSelCategory("all");
    setSelCourse("all");
    setSelRound("all");
    setMinRank("");
    setMaxRank("");
    setColVis(DEFAULT_VIS);
    setPage(1);
  };

  const visibleCols = COL_DEFS.filter(({ key }) => colVis[key]);

  if (loading)
    return (
      <div className="pg25-cr-loading-screen">
        <div className="pg25-cr-loading-box">
          <div className="pg25-cr-loading-spinner" />
          <p>Loading NEET PG closing ranks...</p>
        </div>
      </div>
    );

  return (
    <div className="pg25-cr-page-root">
      {showColModal && (
        <div className="pg25-cr-modal-overlay">
          <div className="pg25-cr-modal-box">
            <div className="pg25-cr-modal-header">
              <h3>Show / Hide Columns</h3>
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="pg25-cr-modal-close-btn"
              >
                <X />
              </button>
            </div>
            <div className="pg25-cr-modal-body">
              <div className="pg25-cr-modal-actions">
                <button
                  type="button"
                  onClick={showAll}
                  className="pg25-cr-btn-secondary"
                >
                  Show All
                </button>
                <button
                  type="button"
                  onClick={hideAll}
                  className="pg25-cr-btn-secondary"
                >
                  Hide All
                </button>
              </div>
              {COL_GROUPS.map((group) => (
                <div key={group.label} className="pg25-cr-col-group">
                  <p className="pg25-cr-col-group-label">{group.label}</p>
                  {group.keys.map((key) => (
                    <label key={key} className="pg25-cr-col-row">
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
            <div className="pg25-cr-modal-footer">
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="pg25-cr-btn-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pg25-cr-content-wrapper">
        {/* ── Header ── */}
        <div className="pg25-cr-app-header">
          <div className="pg25-cr-header-row">
            <div className="pg25-cr-header-left">
              <button
                type="button"
                onClick={() => navigate("/dashboard/neet-pg")}
                className="pg25-cr-back-btn"
              >
                <ArrowLeft className="pg25-cr-icon-sm" />
              </button>
              <div className="pg25-cr-header-text">
                <h1>Closing Ranks</h1>
                <p>NEET PG 2025</p>
              </div>
            </div>
            <span className="pg25-cr-records-count">
              {total.toLocaleString()} Records
            </span>
          </div>
        </div>

        {dataError && (
          <div className="pg25-cr-error-banner">
            ⚠️ Unable to load closing ranks from the server. Please check your
            connection and try again.
          </div>
        )}

        {/* ── Round pills ── */}
        <div className="pg25-cr-pills-row">
          {["1", "2", "3", "4", "all"].map((round) => (
            <button
              type="button"
              key={round}
              onClick={() => applyRound(round)}
              className={`pg25-cr-pill ${selRound === round ? "pg25-cr-pill-active" : "pg25-cr-pill-inactive"}`}
            >
              {round === "all" ? "All Rounds" : `R${round}`}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowColModal(true)}
            className="pg25-cr-pill-icon-btn"
          >
            <Eye className="pg25-cr-icon-sm" /> Columns
          </button>
        </div>

        {/* ── Search + Filters ── */}
        <div className="pg25-cr-filters-row">
          <div className="pg25-cr-search-box">
            <Search />
            <input
              type="text"
              placeholder="Search institute, course, state..."
              value={searchTerm}
              onChange={(e) => withReset(setSearchTerm)(e.target.value)}
            />
          </div>

          <div className="pg25-cr-filter-selects">
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
              className="pg25-cr-toggle-filter"
              onClick={() => setShowAdv((prev) => !prev)}
            >
              <Filter className="pg25-cr-icon-fl" /> {showAdv ? "Hide" : "More"}{" "}
              Filters
              <ChevronDown
                className={showAdv ? "pg25-cr-cs-chevron-open" : ""}
              />
            </button>
          </div>
        </div>

        {showAdv && (
          <div className="pg25-cr-advanced-filters">
            <CustomSelect
              value={selCourse}
              onChange={withReset(setSelCourse)}
              options={courses}
              allLabel="All Courses"
            />
            <div className="pg25-cr-rank-inputs">
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
              className="pg25-cr-clear-btn"
              onClick={clearAll}
            >
              Clear Filters
            </button>
            <div className="pg25-cr-filtered-count-row">
              <span className="pg25-cr-filtered-count-num">
                {total.toLocaleString()}
              </span>
              <span>&nbsp;filtered results</span>
            </div>
          </div>
        )}

        {/* ── Table ── */}
        <div
          className="pg25-cr-table-wrapper"
          style={{
            opacity: fetching ? 0.55 : 1,
            transition: "opacity 150ms ease",
          }}
        >
          <table className="pg25-cr-table">
            <thead>
              <tr>
                {visibleCols.map(({ key, label }) => (
                  <th
                    key={key}
                    className={
                      key.startsWith("cr_2025") ? "pg25-cr-th-rank" : ""
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
                    className="pg25-cr-table-empty"
                  >
                    {dataError
                      ? "Unable to load the data. Please refresh the page and try again."
                      : "No records found for the selected filters."}
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id}>
                    {colVis.quota && (
                      <td>
                        <span className="pg25-cr-badge-quota">
                          {item.quota || "—"}
                        </span>
                      </td>
                    )}
                    {colVis.category && (
                      <td>
                        <span
                          className={`pg25-cr-badge-category-base ${categoryBadgeClass(item.category)}`}
                        >
                          {item.category || "—"}
                        </span>
                      </td>
                    )}
                    {colVis.state && <td>{item.state || "—"}</td>}
                    {colVis.institute && (
                      <td className="pg25-cr-td-institute">
                        {item.institute || "—"}
                      </td>
                    )}
                    {colVis.course && <td>{item.course || "—"}</td>}
                    {colVis.fee && (
                      <td className="pg25-cr-td-fee">{formatFee(item.fee)}</td>
                    )}
                    {ALL_RANK_COLS.map(
                      (key) =>
                        colVis[key] && (
                          <td key={key} className="pg25-cr-td-rank">
                            <RankCell val={item[key]} />
                          </td>
                        ),
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="pg25-cr-pagination-row">
          <div className="pg25-cr-pagination-info">
            Showing {total > 0 ? (page - 1) * PER_PAGE + 1 : 0}–
            {Math.min(page * PER_PAGE, total)} of {total.toLocaleString()}
          </div>
          <div className="pg25-cr-pagination-controls">
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
                      ? "pg25-cr-page-active"
                      : "pg25-cr-page-btn"
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

export default PgClosingRanks2025Page;
