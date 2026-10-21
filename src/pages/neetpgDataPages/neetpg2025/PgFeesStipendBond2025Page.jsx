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
import "./PgFeesStipendBond2025Page.css";

/* ───────────────────────── API ───────────────────────── */

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const FEE_STIPEND_BOND_URL = `${API_BASE}/fee-stipend-bond/pg/2025`;
const FILTERS_URL = `${API_BASE}/fee-stipend-bond/pg/2025/filters`;

const ITEMS_PER_PAGE = 50;

const EMPTY_FILTER_OPTIONS = {
  states: [],
  quotas: [],
  courses: [],
  bondYears: [],
  hasUnknownBond: false,
};

/* ───────────────────────── Helpers ───────────────────────── */

const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

// Values from the API can be numbers, numeric strings (NUMERIC columns) or null.
const toNumber = (val) => {
  if (val === null || val === undefined || val === "") return null;
  const num = Number(val);
  return Number.isNaN(num) ? null : num;
};

const formatCurrency = (val) => {
  const num = toNumber(val);
  if (num === null) return "N/A";
  if (num >= 10000000) return "₹" + (num / 10000000).toFixed(2) + " Cr";
  if (num >= 100000) return "₹" + (num / 100000).toFixed(2) + " L";
  if (num >= 1000) return "₹" + (num / 1000).toFixed(2) + " K";
  return "₹" + num.toLocaleString();
};

const formatNumber = (val) => {
  const num = toNumber(val);
  return num === null ? "N/A" : num.toLocaleString();
};

/* ───────────────────────── Small components ───────────────────────── */

const CustomSelect = ({ value, onChange, options, placeholder, allLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    String(option).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="pg25-fsb-select-wrapper">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pg25-fsb-select-trigger"
      >
        <span className="pg25-fsb-select-value">
          {value === "all" ? allLabel : value}
        </span>
        <ChevronDown
          className={`pg25-fsb-select-chevron ${isOpen ? "pg25-fsb-select-chevron-open" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="pg25-fsb-select-overlay"
            onClick={() => setIsOpen(false)}
          />
          <div className="pg25-fsb-select-dropdown">
            <div className="pg25-fsb-select-search-wrap">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pg25-fsb-select-search-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="pg25-fsb-select-options">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`pg25-fsb-select-option ${
                    value === option ? "pg25-fsb-select-option-selected" : ""
                  }`}
                >
                  {option === "all" ? allLabel : option}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* ───────────────────────── Page ───────────────────────── */

const PgFeesStipendBond2025Page = () => {
  const navigate = useNavigate();

  // server data
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOptions, setFilterOptions] = useState(EMPTY_FILTER_OPTIONS);

  // request state
  const [loading, setLoading] = useState(true); // first load only
  const [fetching, setFetching] = useState(false); // every refetch
  const [dataError, setDataError] = useState(false);

  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  // "all" | "na" | a bond length as a string, e.g. "0", "1", "2"
  const [selectedBondYears, setSelectedBondYears] = useState("all");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState({
    State: true,
    Institute: true,
    Course: true,
    Quota: true,
    Fee: true,
    Beds: true,
    "Bond Years": true,
    "Bond Penalty": true,
    "Stipend Year 1": true,
  });

  // typing inputs wait 400ms before hitting the API
  const debouncedSearch = useDebounce(searchTerm);
  const debouncedMinFee = useDebounce(minFee);
  const debouncedMaxFee = useDebounce(maxFee);
  const debouncedMinBeds = useDebounce(minBeds);
  const debouncedMaxBeds = useDebounce(maxBeds);

  // any filter change sends the user back to page 1
  const withReset = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const columnDefinitions = [
    { key: "State", label: "State" },
    { key: "Institute", label: "Institute" },
    { key: "Course", label: "Course" },
    { key: "Quota", label: "Quota" },
    { key: "Fee", label: "Fee" },
    { key: "Beds", label: "Hospital Beds" },
    { key: "Bond Years", label: "Bond Years" },
    { key: "Bond Penalty", label: "Bond Penalty" },
    { key: "Stipend Year 1", label: "Stipend Year 1" },
  ];

  const toggleColumn = (columnKey) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const showAllColumns = () => {
    const allVisible = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setColumnVisibility(allVisible);
  };

  const hideAllColumns = () => {
    const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key] = key === "Institute";
      return acc;
    }, {});
    setColumnVisibility(allHidden);
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
    params.set("page", String(currentPage));
    params.set("limit", String(ITEMS_PER_PAGE));

    if (selectedState !== "all") params.set("state", selectedState);
    if (selectedQuota !== "all") params.set("quota", selectedQuota);
    if (selectedCourse !== "all") params.set("course", selectedCourse);
    if (selectedBondYears !== "all") params.set("bondYears", selectedBondYears);
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    if (debouncedMinFee) params.set("minFee", debouncedMinFee);
    if (debouncedMaxFee) params.set("maxFee", debouncedMaxFee);
    if (debouncedMinBeds) params.set("minBeds", debouncedMinBeds);
    if (debouncedMaxBeds) params.set("maxBeds", debouncedMaxBeds);

    return params.toString();
  }, [
    currentPage,
    selectedState,
    selectedQuota,
    selectedCourse,
    selectedBondYears,
    debouncedSearch,
    debouncedMinFee,
    debouncedMaxFee,
    debouncedMinBeds,
    debouncedMaxBeds,
  ]);

  /* ── fetch rows ── */
  useEffect(() => {
    const controller = new AbortController();
    setFetching(true);

    fetch(`${FEE_STIPEND_BOND_URL}?${queryString}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((json) => {
        setRows(json.data || []);
        setTotal(json.pagination?.total ?? 0);
        setTotalPages(Math.max(1, json.pagination?.totalPages ?? 1));
        setDataError(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("Error fetching fees data:", error);
        setDataError(true);
        setRows([]);
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
  const courses = useMemo(
    () => ["all", ...filterOptions.courses],
    [filterOptions.courses],
  );

  // pills: every bond length found in the data (+ N/A when some rows have none)
  const bondYearsOptions = useMemo(() => {
    const options = filterOptions.bondYears.map((year) => String(year));
    if (filterOptions.hasUnknownBond) options.push("na");
    return options;
  }, [filterOptions.bondYears, filterOptions.hasUnknownBond]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedState("all");
    setSelectedQuota("all");
    setSelectedCourse("all");
    setSelectedBondYears("all");
    setMinFee("");
    setMaxFee("");
    setMinBeds("");
    setMaxBeds("");
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const isBondFree = (bondYears) =>
    bondYears === null || bondYears === undefined || Number(bondYears) === 0;

  const bondYearsLabel = (bondYears) =>
    bondYears === null || bondYears === undefined ? "N/A" : `${bondYears} Yr`;

  if (loading) {
    return (
      <div className="pg25-fsb-loading">
        <div className="pg25-fsb-loading-inner">
          <div className="pg25-fsb-spinner"></div>
          <p className="pg25-fsb-loading-text">
            Loading Fees & Stipend Data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pg25-fsb-root">
      {showColumnVisibility && (
        <div className="pg25-fsb-modal-overlay">
          <div className="pg25-fsb-modal">
            <div className="pg25-fsb-modal-header">
              <h3 className="pg25-fsb-modal-title">Show/Hide Columns</h3>
              <button
                type="button"
                onClick={() => setShowColumnVisibility(false)}
                className="pg25-fsb-modal-close"
              >
                <X className="pg25-fsb-icon-md" />
              </button>
            </div>

            <div className="pg25-fsb-modal-body">
              <div className="pg25-fsb-modal-actions">
                <button
                  type="button"
                  onClick={showAllColumns}
                  className="pg25-fsb-btn-show-all"
                >
                  Show All
                </button>
                <button
                  type="button"
                  onClick={hideAllColumns}
                  className="pg25-fsb-btn-hide-all"
                >
                  Hide All
                </button>
              </div>

              <div className="pg25-fsb-column-list">
                {columnDefinitions.map(({ key, label }) => (
                  <div key={key} className="pg25-fsb-column-item">
                    <label className="pg25-fsb-column-label">
                      <input
                        type="checkbox"
                        checked={columnVisibility[key]}
                        onChange={() => toggleColumn(key)}
                        className="pg25-fsb-checkbox"
                      />
                      <span className="pg25-fsb-column-label-text">
                        {label}
                      </span>
                    </label>
                    <div className="pg25-fsb-column-icon-wrap">
                      {columnVisibility[key] ? (
                        <Eye className="pg25-fsb-icon-visible" />
                      ) : (
                        <EyeOff className="pg25-fsb-icon-hidden" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pg25-fsb-modal-footer">
              <button
                type="button"
                onClick={() => setShowColumnVisibility(false)}
                className="pg25-fsb-btn-primary"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pg25-fsb-main">
        <div className="pg25-fsb-header">
          <div className="pg25-fsb-header-row">
            <div className="pg25-fsb-header-left">
              <button
                type="button"
                onClick={() => navigate("/dashboard/neet-pg")}
                className="pg25-fsb-back-btn"
              >
                <ArrowLeft className="pg25-fsb-icon-sm" />
              </button>
              <div>
                <h1 className="pg25-fsb-title">Fees, Stipend & Bond</h1>
                <p className="pg25-fsb-subtitle">NEET PG 2025</p>
              </div>
            </div>

            <div className="pg25-fsb-records-wrap">
              <span className="pg25-fsb-records-text">
                {total.toLocaleString()} Records
              </span>
            </div>
          </div>
        </div>

        <div className="pg25-fsb-quota-bar">
          <div className="pg25-fsb-quota-row">
            {bondYearsOptions.map((year) => (
              <button
                type="button"
                key={year}
                onClick={() => withReset(setSelectedBondYears)(year)}
                className={`pg25-fsb-quota-btn ${
                  selectedBondYears === year
                    ? "pg25-fsb-quota-btn-active"
                    : "pg25-fsb-quota-btn-inactive"
                }`}
              >
                {year === "na" ? "N/A" : year}
              </button>
            ))}

            <button
              type="button"
              onClick={() => withReset(setSelectedBondYears)("all")}
              className={`pg25-fsb-quota-btn ${
                selectedBondYears === "all"
                  ? "pg25-fsb-quota-btn-all-active"
                  : "pg25-fsb-quota-btn-inactive"
              }`}
            >
              All Years Bond
            </button>

            <button
              type="button"
              onClick={() => setShowColumnVisibility(true)}
              className="pg25-fsb-showhide-btn"
            >
              <Eye className="pg25-fsb-icon-sm" />
              Columns
            </button>
          </div>
        </div>

        <div className="pg25-fsb-filters">
          <div className="pg25-fsb-filters-inner">
            <div className="pg25-fsb-filters-row">
              <div className="pg25-fsb-search-wrap">
                <Search className="pg25-fsb-search-icon" />
                <input
                  type="text"
                  placeholder="Search institutes, states, courses, quota..."
                  value={searchTerm}
                  onChange={(e) => withReset(setSearchTerm)(e.target.value)}
                  className="pg25-fsb-search-input"
                />
              </div>

              <div className="pg25-fsb-select-group">
                <CustomSelect
                  value={selectedState}
                  onChange={withReset(setSelectedState)}
                  options={states}
                  placeholder="Select State"
                  allLabel="All States"
                />

                <CustomSelect
                  value={selectedQuota}
                  onChange={withReset(setSelectedQuota)}
                  options={quotas}
                  placeholder="Select Quota"
                  allLabel="All Quotas"
                />

                <CustomSelect
                  value={selectedCourse}
                  onChange={withReset(setSelectedCourse)}
                  options={courses}
                  placeholder="Select Course"
                  allLabel="All Courses"
                />

                <button
                  type="button"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="pg25-fsb-filter-toggle-btn"
                >
                  <Filter className="pg25-fsb-icon-fl" />
                  {showAdvancedFilters ? "Hide" : "Show"} Filters
                  <ChevronDown
                    className={`pg25-fsb-chevron ${showAdvancedFilters ? "pg25-fsb-chevron-open" : ""}`}
                  />
                </button>
              </div>
            </div>

            {showAdvancedFilters && (
              <div className="pg25-fsb-advanced-filters">
                <div className="pg25-fsb-advanced-grid">
                  <div className="pg25-fsb-range-group">
                    <input
                      type="number"
                      min="0"
                      placeholder="Min Fee"
                      value={minFee}
                      onChange={(e) => withReset(setMinFee)(e.target.value)}
                      className="pg25-fsb-number-input"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Max Fee"
                      value={maxFee}
                      onChange={(e) => withReset(setMaxFee)(e.target.value)}
                      className="pg25-fsb-number-input"
                    />
                  </div>

                  <div className="pg25-fsb-range-group">
                    <input
                      type="number"
                      min="0"
                      placeholder="Min Beds"
                      value={minBeds}
                      onChange={(e) => withReset(setMinBeds)(e.target.value)}
                      className="pg25-fsb-number-input"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Max Beds"
                      value={maxBeds}
                      onChange={(e) => withReset(setMaxBeds)(e.target.value)}
                      className="pg25-fsb-number-input"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="pg25-fsb-clear-btn"
                  >
                    Clear All Filters
                  </button>
                </div>

                <div className="pg25-fsb-results-count">
                  <span className="pg25-fsb-results-count-num">
                    {total.toLocaleString()}
                  </span>
                  <span className="pg25-fsb-results-count-label">
                    filtered results
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="pg25-fsb-table-wrap"
          style={{
            opacity: fetching ? 0.55 : 1,
            transition: "opacity 150ms ease",
          }}
        >
          <table className="pg25-fsb-table">
            <thead className="pg25-fsb-thead">
              <tr>
                {columnVisibility.State && (
                  <th className="pg25-fsb-th">State</th>
                )}
                {columnVisibility.Institute && (
                  <th className="pg25-fsb-th">Institute</th>
                )}
                {columnVisibility.Course && (
                  <th className="pg25-fsb-th">Course</th>
                )}
                {columnVisibility.Quota && (
                  <th className="pg25-fsb-th">Quota</th>
                )}
                {columnVisibility.Beds && <th className="pg25-fsb-th">Beds</th>}
                {columnVisibility.Fee && <th className="pg25-fsb-th">Fee</th>}
                {columnVisibility["Stipend Year 1"] && (
                  <th className="pg25-fsb-th">Stipend Y1</th>
                )}
                {columnVisibility["Bond Years"] && (
                  <th className="pg25-fsb-th">Bond Years</th>
                )}
                {columnVisibility["Bond Penalty"] && (
                  <th className="pg25-fsb-th">Bond Penalty</th>
                )}
              </tr>
            </thead>
            <tbody className="pg25-fsb-tbody">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={Math.max(
                      1,
                      Object.values(columnVisibility).filter(Boolean).length,
                    )}
                    className="pg25-fsb-empty-td"
                  >
                    {dataError
                      ? "Unable to load the data. Please refresh the page and try again."
                      : "No data found. Try adjusting your filters."}
                  </td>
                </tr>
              ) : (
                rows.map((item) => (
                  <tr key={item.id} className="pg25-fsb-tr">
                    {columnVisibility.State && (
                      <td className="pg25-fsb-td">{item.state || "—"}</td>
                    )}
                    {columnVisibility.Institute && (
                      <td className="pg25-fsb-td-institute">
                        {item.institute || "—"}
                      </td>
                    )}
                    {columnVisibility.Course && (
                      <td className="pg25-fsb-td">{item.course || "—"}</td>
                    )}
                    {columnVisibility.Quota && (
                      <td className="pg25-fsb-td-center">
                        <span className="pg25-fsb-badge-quota">
                          {item.quota || "—"}
                        </span>
                      </td>
                    )}
                    {columnVisibility.Beds && (
                      <td className="pg25-fsb-td-beds">
                        {formatNumber(item.beds)}
                      </td>
                    )}
                    {columnVisibility.Fee && (
                      <td className="pg25-fsb-td-fee">
                        {formatCurrency(item.fee)}
                      </td>
                    )}
                    {columnVisibility["Stipend Year 1"] && (
                      <td className="pg25-fsb-td-stipend">
                        {formatCurrency(item.stipend_year_1)}
                      </td>
                    )}
                    {columnVisibility["Bond Years"] && (
                      <td className="pg25-fsb-td-center">
                        <span
                          className={`pg25-fsb-badge-bond ${
                            isBondFree(item.bond_years)
                              ? "pg25-fsb-badge-bond-free"
                              : "pg25-fsb-badge-bond-active"
                          }`}
                        >
                          {bondYearsLabel(item.bond_years)}
                        </span>
                      </td>
                    )}
                    {columnVisibility["Bond Penalty"] && (
                      <td className="pg25-fsb-td-penalty">
                        {toNumber(item.bond_penalty) > 0
                          ? formatCurrency(item.bond_penalty)
                          : "N/A"}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pg25-fsb-footer">
          <div className="pg25-fsb-footer-row">
            <div className="pg25-fsb-footer-info">
              Showing {total > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, total)} of{" "}
              {total.toLocaleString()} results
            </div>

            <div className="pg25-fsb-pagination">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pg25-fsb-page-nav-btn"
              >
                <PrevIcon className="pg25-fsb-icon-xs" />
              </button>

              <div className="pg25-fsb-page-list">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const start = Math.max(
                    1,
                    Math.min(currentPage - 2, totalPages - 4),
                  );
                  const pageNum = start + i;
                  if (pageNum > totalPages) return null;

                  return (
                    <button
                      type="button"
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`pg25-fsb-page-btn ${
                        currentPage === pageNum
                          ? "pg25-fsb-page-btn-active"
                          : "pg25-fsb-page-btn-inactive"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || total === 0}
                className="pg25-fsb-page-nav-btn"
              >
                <NextIcon className="pg25-fsb-icon-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgFeesStipendBond2025Page;
