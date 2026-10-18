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
import "./UgAllotments2025Page.css";
import api from "../../../api/axios";

const COL_DEFS = [
  { key: "Round", label: "Round" },
  { key: "AI Rank", label: "AI Rank" },
  { key: "State", label: "State" },
  { key: "Institute", label: "Institute" },
  { key: "Course", label: "Course" },
  { key: "Quota", label: "Quota" },
  { key: "Category", label: "Category" },
  { key: "Fee", label: "Fee" },
  { key: "Stipend", label: "Stipend" },
  { key: "Bond Yrs", label: "Bond Yrs" },
  { key: "Beds", label: "Beds" },
];

const DEFAULT_VIS = {
  Round: true,
  "AI Rank": true,
  State: true,
  Institute: true,
  Course: true,
  Quota: true,
  Category: true,
  Fee: true,
  Stipend: true,
  "Bond Yrs": true,
  Beds: true,
};

const CustomSelect = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter((opt) =>
    String(opt).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="ug25-al-cs-wrapper">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="ug25-al-cs-button"
      >
        <span className="ug25-al-cs-button-label">
          {value === "all" ? allLabel : value}
        </span>

        <ChevronDown
          className={`ug25-al-cs-chevron ${
            open ? "ug25-al-cs-chevron-open" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <div className="ug25-al-cs-overlay" onClick={() => setOpen(false)} />

          <div className="ug25-al-cs-dropdown">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="ug25-al-cs-search-input"
            />

            <div className="ug25-al-cs-options-list">
              {filtered.map((opt) => (
                <button
                  type="button"
                  key={String(opt)}
                  onClick={() => {
                    onChange(opt);
                    setSearch("");
                    setOpen(false);
                  }}
                  className={`ug25-al-cs-option ${
                    value === opt ? "ug25-al-cs-option-selected" : ""
                  }`}
                >
                  {opt === "all" ? allLabel : opt}
                </button>
              ))}

              {filtered.length === 0 && (
                <div className="ug25-al-cs-option">No options found</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const RankCell = ({ val }) => {
  if (val === null || val === undefined || val === "-" || val === "") {
    return <span className="ug25-al-rank-empty">—</span>;
  }

  const rank = Number(val);

  if (Number.isNaN(rank)) {
    return <span className="ug25-al-rank-empty">—</span>;
  }

  const tier =
    rank <= 100
      ? "ug25-al-rank-tier-1"
      : rank <= 500
        ? "ug25-al-rank-tier-2"
        : rank <= 2000
          ? "ug25-al-rank-tier-3"
          : rank <= 5000
            ? "ug25-al-rank-tier-4"
            : "ug25-al-rank-tier-5";

  return (
    <span className={`ug25-al-rank-value ${tier}`}>
      {rank.toLocaleString("en-IN")}
    </span>
  );
};

const formatCurrency = (val) => {
  if (val === null || val === undefined || val === "" || val === "-") {
    return "—";
  }

  const numeric = Number(val);

  if (Number.isNaN(numeric)) {
    return val;
  }

  return `₹${numeric.toLocaleString("en-IN")}`;
};

const formatBondYrs = (val) => {
  if (val === null || val === undefined || val === "" || val === "-") {
    return "—";
  }

  const numeric = Number(val);

  if (Number.isNaN(numeric)) {
    return val;
  }

  return `${numeric} yrs`;
};

const categoryBadgeClass = (category) => {
  if (category === "UR" || category === "GEN" || category === "Open") {
    return "ug25-al-badge-cat-gray";
  }

  if (category === "OBC") {
    return "ug25-al-badge-cat-yellow";
  }

  if (category === "SC") {
    return "ug25-al-badge-cat-red";
  }

  if (category === "ST") {
    return "ug25-al-badge-cat-blue";
  }

  if (category === "EWS") {
    return "ug25-al-badge-cat-green";
  }

  return "ug25-al-badge-cat-purple";
};

const UgAllotments2025Page = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  /*
   * ==========================================
   * FILTER OPTIONS (from the dedicated /filters API,
   * covers the full dataset — not just the current page)
   * ==========================================
   */

  const [filterOptions, setFilterOptions] = useState({
    rounds: [],
    states: [],
    quotas: [],
    categories: [],
    courses: [],
  });

  const PER_PAGE = 50;

  const toggleCol = (key) =>
    setColVis((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  const showAll = () =>
    setColVis(
      COL_DEFS.reduce(
        (acc, { key }) => ({
          ...acc,
          [key]: true,
        }),
        {},
      ),
    );

  const hideAll = () =>
    setColVis(
      COL_DEFS.reduce(
        (acc, { key }) => ({
          ...acc,
          [key]: key === "Institute" || key === "Course",
        }),
        {},
      ),
    );

  /* =========================== FETCH FILTER OPTIONS (ONCE, ON MOUNT) ============================= */

  useEffect(() => {
    const controller = new AbortController();

    const fetchFilters = async () => {
      try {
        const response = await api.get("/allotments/ug/2025/filters", {
          signal: controller.signal,
        });

        const result = response.data;

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch filters");
        }

        setFilterOptions({
          rounds: result.filters?.rounds || [],
          states: result.filters?.states || [],
          quotas: result.filters?.quotas || [],
          categories: result.filters?.categories || [],
          courses: result.filters?.courses || [],
        });
      } catch (error) {
        if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
          return;
        }

        console.error("UG 2025 Filters API Error:", error);
      }
    };

    fetchFilters();

    return () => controller.abort();
  }, []);

  /* ==================== FETCH DATA FROM POSTGRESQL API =============================== */

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllotments = async () => {
      try {
        setLoading(true);
        setDataError(false);
        setErrorMessage("");

        const params = new URLSearchParams();

        params.set("page", page);
        params.set("limit", PER_PAGE);

        if (selRound !== "all") {
          params.set("round", selRound);
        }

        if (selState !== "all") {
          params.set("state", selState);
        }

        if (selQuota !== "all") {
          params.set("quota", selQuota);
        }

        if (selCategory !== "all") {
          params.set("category", selCategory);
        }

        if (selCourse !== "all") {
          params.set("course", selCourse);
        }

        if (minRank !== "") {
          params.set("rankFrom", minRank);
        }

        if (maxRank !== "") {
          params.set("rankTo", maxRank);
        }

        if (searchTerm.trim()) {
          params.set("search", searchTerm.trim());
        }

        const response = await api.get(
          `/allotments/ug/2025?${params.toString()}`,
          {
            signal: controller.signal,
          },
        );

        const result = response.data;

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch allotments");
        }

        /*
         * Convert PostgreSQL API fields
         * into the fields used by your existing UI.
         */

        const formattedData = (result.data || []).map((item) => ({
          id: item.id,

          Round: item.round ?? "",
          "AI Rank": item.ai_rank ?? "",

          State: item.state ?? "",
          Institute: item.institute ?? "",
          Course: item.course ?? "",
          Quota: item.quota ?? "",
          Category: item.category ?? "",

          Fee: item.fee ?? "",
          Stipend: item.stipend ?? "",

          "Bond Yrs": item.bond_years ?? "",
          Beds: item.beds ?? "",
        }));

        setData(formattedData);

        setPagination(
          result.pagination || {
            page,
            limit: PER_PAGE,
            total: formattedData.length,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        );

        setDataError(false);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("UG 2025 API Error:", error);

        setData([]);
        setDataError(true);
        setErrorMessage(error.message || "Unable to load data");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAllotments();

    return () => controller.abort();
  }, [
    page,
    searchTerm,
    selRound,
    selState,
    selQuota,
    selCategory,
    selCourse,
    minRank,
    maxRank,
  ]);

  /*
   * ==========================================
   * FILTER OPTIONS
   * ==========================================
   *
   * Primary source: the dedicated /filters API (filterOptions),
   * which covers the full dataset. As a safety net — in case that
   * endpoint returns empty/partial data — we merge in whatever
   * values are present on the currently loaded page of `data`, so
   * the dropdowns and round pills never end up empty.
   */

  const dataRounds = useMemo(
    () =>
      data
        .map((item) => item.Round)
        .filter((v) => v !== null && v !== undefined && v !== ""),
    [data],
  );

  const dataStates = useMemo(
    () => data.map((item) => item.State).filter(Boolean),
    [data],
  );

  const dataQuotas = useMemo(
    () => data.map((item) => item.Quota).filter(Boolean),
    [data],
  );

  const dataCategories = useMemo(
    () => data.map((item) => item.Category).filter(Boolean),
    [data],
  );

  const dataCourses = useMemo(
    () => data.map((item) => item.Course).filter(Boolean),
    [data],
  );

  const rounds = useMemo(() => {
    return Array.from(new Set([...filterOptions.rounds, ...dataRounds])).sort(
      (a, b) => Number(a) - Number(b),
    );
  }, [filterOptions.rounds, dataRounds]);

  const states = useMemo(
    () => [
      "all",
      ...Array.from(new Set([...filterOptions.states, ...dataStates])).sort(),
    ],
    [filterOptions.states, dataStates],
  );

  const quotas = useMemo(
    () => [
      "all",
      ...Array.from(new Set([...filterOptions.quotas, ...dataQuotas])).sort(),
    ],
    [filterOptions.quotas, dataQuotas],
  );

  const categories = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set([...filterOptions.categories, ...dataCategories]),
      ).sort(),
    ],
    [filterOptions.categories, dataCategories],
  );

  const courses = useMemo(
    () => [
      "all",
      ...Array.from(new Set([...filterOptions.courses, ...dataCourses])).sort(),
    ],
    [filterOptions.courses, dataCourses],
  );

  /*
   * ==========================================
   * PAGE RESET WHEN FILTER CHANGES
   * ==========================================
   */

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    selRound,
    selState,
    selQuota,
    selCategory,
    selCourse,
    minRank,
    maxRank,
  ]);

  /*
   * ==========================================
   * SERVER PAGINATION
   * ==========================================
   */

  const totalRecords = pagination.total || 0;

  const totalPages = Math.max(1, pagination.totalPages || 1);

  const paged = data;

  /*
   * ==========================================
   * CLEAR FILTERS
   * ==========================================
   */

  const clearAll = () => {
    setSearchTerm("");

    setSelRound("all");
    setSelState("all");
    setSelQuota("all");
    setSelCategory("all");
    setSelCourse("all");

    setMinRank("");
    setMaxRank("");

    setColVis(DEFAULT_VIS);

    setPage(1);
  };

  const visibleCols = COL_DEFS.filter(({ key }) => colVis[key]);

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (loading && data.length === 0) {
    return (
      <div className="ug25-al-loading-screen">
        <div className="ug25-al-loading-box">
          <div className="ug25-al-loading-spinner" />
          <p>Loading NEET UG allotments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ug25-al-page-root">
      {showColModal && (
        <div className="ug25-al-modal-overlay">
          <div className="ug25-al-modal-box">
            <div className="ug25-al-modal-header">
              <h3>Show / Hide Columns</h3>

              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="ug25-al-modal-close-btn"
              >
                <X />
              </button>
            </div>

            <div className="ug25-al-modal-body">
              <div className="ug25-al-modal-actions">
                <button
                  type="button"
                  onClick={showAll}
                  className="ug25-al-btn-secondary"
                >
                  Show All
                </button>

                <button
                  type="button"
                  onClick={hideAll}
                  className="ug25-al-btn-secondary"
                >
                  Hide All
                </button>
              </div>

              {[
                {
                  label: "Basic Info",
                  keys: ["Round", "State", "Institute", "Course"],
                },
                {
                  label: "Rank & Category",
                  keys: ["AI Rank", "Quota", "Category"],
                },
                {
                  label: "Fee & Stipend",
                  keys: ["Fee", "Stipend"],
                },
                {
                  label: "Other",
                  keys: ["Bond Yrs", "Beds"],
                },
              ].map((group) => (
                <div key={group.label} className="ug25-al-col-group">
                  <p className="ug25-al-col-group-label">{group.label}</p>

                  {group.keys.map((key) => (
                    <label key={key} className="ug25-al-col-row">
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

            <div className="ug25-al-modal-footer">
              <button
                type="button"
                onClick={() => setShowColModal(false)}
                className="ug25-al-btn-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ug25-al-content-wrapper">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="ug25-al-app-header">
          <div className="ug25-al-header-row">
            <div className="ug25-al-header-left">
              <button
                type="button"
                onClick={() => navigate("/dashboard/neet-ug")}
                className="ug25-al-back-btn"
              >
                <ArrowLeft className="ug25-al-icon-sm" />
              </button>

              <div className="ug25-al-header-text">
                <h1>Allotments</h1>
                <p>NEET UG 2025</p>
              </div>
            </div>

            <span className="ug25-al-records-count">
              {totalRecords.toLocaleString("en-IN")} Records
            </span>
          </div>
        </div>

        {/* ==========================================
            ERROR
        ========================================== */}

        {dataError && (
          <div className="ug25-al-error-banner">
            ⚠️ Unable to load allotment data.
            {errorMessage && (
              <span style={{ marginLeft: "8px" }}>{errorMessage}</span>
            )}
          </div>
        )}

        {/* ==========================================
            ROUND PILLS + COLUMNS
        ========================================== */}

        <div className="ug25-al-pills-row">
          {rounds.map((round) => (
            <button
              type="button"
              key={round}
              onClick={() => {
                setSelRound(round);
                setPage(1);
              }}
              className={`ug25-al-pill ${
                selRound === round
                  ? "ug25-al-pill-active"
                  : "ug25-al-pill-inactive"
              }`}
            >
              {`R${round}`}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setSelRound("all");
              setPage(1);
            }}
            className={`ug25-al-pill ${
              selRound === "all"
                ? "ug25-al-pill-active"
                : "ug25-al-pill-inactive"
            }`}
          >
            All Rounds
          </button>

          <button
            type="button"
            onClick={() => setShowColModal(true)}
            className="ug25-al-pill-icon-btn"
          >
            <Eye className="ug25-al-icon-sm" />
            Columns
          </button>
        </div>

        {/* ==========================================
            MAIN FILTERS
        ========================================== */}

        <div className="ug25-al-filters-row">
          <div className="ug25-al-search-box">
            <Search />

            <input
              type="text"
              placeholder="Search institute, course, state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="ug25-al-filter-selects">
            <CustomSelect
              value={selState}
              onChange={(value) => {
                setSelState(value);
                setPage(1);
              }}
              options={states}
              allLabel="All States"
            />

            <CustomSelect
              value={selQuota}
              onChange={(value) => {
                setSelQuota(value);
                setPage(1);
              }}
              options={quotas}
              allLabel="All Quotas"
            />

            <CustomSelect
              value={selCategory}
              onChange={(value) => {
                setSelCategory(value);
                setPage(1);
              }}
              options={categories}
              allLabel="All Categories"
            />

            <button
              type="button"
              className="ug25-al-toggle-filter"
              onClick={() => setShowAdv((prev) => !prev)}
            >
              <Filter className="ug25-al-icon-fl" />
              {showAdv ? "Hide" : "More"} Filters
              <ChevronDown
                className={showAdv ? "ug25-al-cs-chevron-open" : ""}
              />
            </button>
          </div>
        </div>

        {/* ==========================================
            ADVANCED FILTERS
        ========================================== */}

        {showAdv && (
          <div className="ug25-al-advanced-filters">
            <CustomSelect
              value={selCourse}
              onChange={(value) => {
                setSelCourse(value);
                setPage(1);
              }}
              options={courses}
              allLabel="All Courses"
            />

            <div className="ug25-al-rank-inputs">
              <input
                type="number"
                placeholder="Min AI Rank"
                value={minRank}
                onChange={(e) => {
                  setMinRank(e.target.value);
                  setPage(1);
                }}
              />

              <input
                type="number"
                placeholder="Max AI Rank"
                value={maxRank}
                onChange={(e) => {
                  setMaxRank(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <button
              type="button"
              className="ug25-al-clear-btn"
              onClick={clearAll}
            >
              Clear Filters
            </button>

            <div className="ug25-al-filtered-count-row">
              <span className="ug25-al-filtered-count-num">
                {totalRecords.toLocaleString("en-IN")}
              </span>

              <span>&nbsp;filtered results</span>
            </div>
          </div>
        )}

        {/* ==========================================
            TABLE
        ========================================== */}

        <div className="ug25-al-table-wrapper">
          <table className="ug25-al-table">
            <thead>
              <tr>
                {visibleCols.map(({ key, label }) => (
                  <th
                    key={key}
                    className={key === "AI Rank" ? "ug25-al-th-rank" : ""}
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
                    colSpan={visibleCols.length}
                    className="ug25-al-table-empty"
                  >
                    {dataError
                      ? "Unable to load the data. Please refresh the page and try again."
                      : "No records found for the selected filters."}
                  </td>
                </tr>
              ) : (
                paged.map((item, index) => (
                  <tr
                    key={
                      item.id || `${item.Institute}-${item["AI Rank"]}-${index}`
                    }
                  >
                    {colVis.Round && <td>{item.Round || "—"}</td>}

                    {colVis["AI Rank"] && (
                      <td className="ug25-al-td-rank">
                        <RankCell val={item["AI Rank"]} />
                      </td>
                    )}

                    {colVis.State && <td>{item.State || "—"}</td>}

                    {colVis.Institute && (
                      <td className="ug25-al-td-institute">
                        {item.Institute || "—"}
                      </td>
                    )}

                    {colVis.Course && <td>{item.Course || "—"}</td>}

                    {colVis.Quota && (
                      <td>
                        <span className="ug25-al-badge-quota">
                          {item.Quota || "—"}
                        </span>
                      </td>
                    )}

                    {colVis.Category && (
                      <td>
                        <span
                          className={`ug25-al-badge-category-base ${categoryBadgeClass(
                            item.Category,
                          )}`}
                        >
                          {item.Category || "—"}
                        </span>
                      </td>
                    )}

                    {colVis.Fee && (
                      <td className="ug25-al-td-fee">
                        {formatCurrency(item.Fee)}
                      </td>
                    )}

                    {colVis.Stipend && (
                      <td className="ug25-al-td-stipend">
                        {formatCurrency(item.Stipend)}
                      </td>
                    )}

                    {colVis["Bond Yrs"] && (
                      <td className="ug25-al-td-muted">
                        {formatBondYrs(item["Bond Yrs"])}
                      </td>
                    )}

                    {colVis.Beds && (
                      <td className="ug25-al-td-muted">{item.Beds || "—"}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ==========================================
            PAGINATION
        ========================================== */}

        <div className="ug25-al-pagination-row">
          <div className="ug25-al-pagination-info">
            Showing {totalRecords > 0 ? (page - 1) * PER_PAGE + 1 : 0}–
            {Math.min(page * PER_PAGE, totalRecords)} of{" "}
            {totalRecords.toLocaleString("en-IN")}
          </div>

          <div className="ug25-al-pagination-controls">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1 || loading || !pagination.hasPreviousPage}
            >
              <PrevIcon />
            </button>

            {Array.from(
              {
                length: Math.min(5, totalPages),
              },
              (_, idx) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4));

                const pageNum = start + idx;

                if (pageNum > totalPages) {
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setPage(pageNum)}
                    disabled={loading}
                    className={
                      pageNum === page
                        ? "ug25-al-page-active"
                        : "ug25-al-page-btn"
                    }
                  >
                    {pageNum}
                  </button>
                );
              },
            )}

            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={
                page === totalPages || loading || !pagination.hasNextPage
              }
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UgAllotments2025Page;
