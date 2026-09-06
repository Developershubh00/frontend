import React, { useState, useEffect, useMemo } from "react";
import { ENV } from "../config";
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
  Heart,
} from "lucide-react";

interface AllotmentsPage2025Props {
  onBack: () => void;
}

interface AllotmentData {
  Round: number;
  ai_rank: string;
  State: string;
  Institute: string;
  Course: string;
  Quota: string;
  Category: string;
  Fee: string;
  Stipend_Year_1: string;
  Bond_Years: number;
  Bond_Penalty: string;
  Beds: number;
}

interface ColVis {
  Round: boolean;
  ai_rank: boolean;
  State: boolean;
  Institute: boolean;
  Course: boolean;
  Quota: boolean;
  Category: boolean;
  Fee: boolean;
  Stipend_Year_1: boolean;
  Bond_Years: boolean;
  Beds: boolean;
  actions: boolean;
}

const AllotmentsPage2025: React.FC<AllotmentsPage2025Props> = ({ onBack }) => {
  const [data, setData] = useState<AllotmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selCategory, setSelCategory] = useState("all");
  const [selQuota, setSelQuota] = useState("all");
  const [selRound, setSelRound] = useState("all");
  const [selState, setSelState] = useState("all");
  const [selCourse, setSelCourse] = useState("all");
  const [selFeeRange, setSelFeeRange] = useState("all");
  const [showAdv, setShowAdv] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const PER_PAGE = 75;

  // Column visibility
  const [showColModal, setShowColModal] = useState(false);
  const [colVis, setColVis] = useState<ColVis>({
    Round: true,
    ai_rank: true,
    State: true,
    Institute: true,
    Course: true,
    Quota: true,
    Category: true,
    Fee: true,
    Stipend_Year_1: true,
    Bond_Years: true,
    Beds: true,
    actions: true,
  });

  const colDefs: { key: keyof ColVis; label: string }[] = [
    { key: "Round", label: "Round" },
    { key: "ai_rank", label: "AI Rank" },
    { key: "State", label: "State" },
    { key: "Institute", label: "Institute" },
    { key: "Course", label: "Course" },
    { key: "Quota", label: "Quota" },
    { key: "Category", label: "Category" },
    { key: "Fee", label: "Fee" },
    { key: "Stipend_Year_1", label: "Stipend" },
    { key: "Bond_Years", label: "Bond Yrs" },
    { key: "Beds", label: "Beds" },
    { key: "actions", label: "Actions" },
  ];

  const toggleCol = (k: keyof ColVis) =>
    setColVis((p) => ({ ...p, [k]: !p[k] }));
  const showAll = () =>
    setColVis(
      Object.keys(colVis).reduce((a, k) => ({ ...a, [k]: true }), {} as ColVis),
    );
  const hideAll = () =>
    setColVis(
      Object.keys(colVis).reduce(
        (a, k) => ({ ...a, [k]: k === "Institute" }),
        {} as ColVis,
      ),
    );

  // ─── Fetch PG allotment data from backend API ────────────────────────────
  useEffect(() => {
    const apiBaseUrl = ENV.VITE_API_URL.replace(/\/$/, "");
    const isLocalhost =
      typeof window !== "undefined" &&
      ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
    const apiUrl = apiBaseUrl.endsWith("/api")
      ? `${apiBaseUrl}/neet-pg-allotments/`
      : `${apiBaseUrl}/api/neet-pg-allotments/`;
    const fallbackUrl = "http://127.0.0.1:8000/api/neet-pg-allotments/";

    const fetchData = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return response.json();
    };

    const parsePayload = (payload: unknown) => {
      const rows = Array.isArray(payload)
        ? payload
        : ((payload as any)?.results ?? []);
      return (rows as Record<string, unknown>[]).map((item) => ({
        Round: Number(item.Round ?? item.round ?? 0),
        ai_rank: String(item.ai_rank ?? item.aiRank ?? "0"),
        State: String(item.State ?? item.state ?? ""),
        Institute: String(item.Institute ?? item.institute ?? ""),
        Course: String(item.Course ?? item.course ?? ""),
        Quota: String(item.Quota ?? item.quota ?? ""),
        Category: String(item.Category ?? item.category ?? ""),
        Fee: String(item.Fee ?? item.fee ?? "₹0"),
        Stipend_Year_1: String(
          item.Stipend_Year_1 ?? item.stipend_year1 ?? "₹0",
        ),
        Bond_Years: Number(item.Bond_Years ?? item.bond_years ?? 0),
        Bond_Penalty: String(item.Bond_Penalty ?? item.bond_penalty ?? "₹0"),
        Beds: Number(item.Beds ?? item.beds ?? 0),
      }));
    };

    const loadAllotments = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const payload = await fetchData(apiUrl);
        const parsed = parsePayload(payload);
        setData(parsed);
        setDataError(false);
      } catch (primaryError: any) {
        console.error("Primary NEET PG fetch failed:", primaryError);
        if (isLocalhost && apiUrl !== fallbackUrl) {
          try {
            const payload = await fetchData(fallbackUrl);
            const parsed = parsePayload(payload);
            setData(parsed);
            setDataError(false);
            return;
          } catch (fallbackError: any) {
            console.error("Fallback NEET PG fetch failed:", fallbackError);
            setApiError(String(fallbackError.message ?? fallbackError));
          }
        } else {
          setApiError(String(primaryError.message ?? primaryError));
        }
        setDataError(true);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllotments();
  }, []);

  // ─── Derived filter options (from full dataset) ─────────────────────────────
  const states = useMemo(
    () => [
      "all",
      ...Array.from(new Set(data.map((d) => d.State).filter(Boolean))).sort(),
    ],
    [data],
  );
  const courses = useMemo(
    () => [
      "all",
      ...Array.from(new Set(data.map((d) => d.Course).filter(Boolean))).sort(),
    ],
    [data],
  );

  const categories = ["all", "GEN", "OBC", "SC", "ST", "EWS"];
  const quotas = useMemo(
    () => [
      "all",
      ...Array.from(new Set(data.map((d) => d.Quota).filter(Boolean))).sort(),
    ],
    [data],
  );
  const feeRanges = [
    "all",
    "Under ₹1L",
    "₹1L - ₹2L",
    "₹2L - ₹5L",
    "₹5L - ₹10L",
    "Above ₹10L",
  ];

  // ─── Filtering + sorting (recomputes whenever any filter or data changes) ───
  const filtered = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();

    return data
      .filter((item) => {
        // Round filter - compare as numbers to avoid "1" vs 1 mismatch
        if (selRound !== "all" && item.Round !== parseInt(selRound))
          return false;

        // Category filter
        if (selCategory !== "all" && item.Category !== selCategory)
          return false;

        // Quota filter
        if (selQuota !== "all" && item.Quota !== selQuota) return false;

        // State filter
        if (selState !== "all" && item.State !== selState) return false;

        // Course filter
        if (selCourse !== "all" && item.Course !== selCourse) return false;

        // Fee range filter
        if (selFeeRange !== "all") {
          const fv = parseInt(item.Fee.replace(/[₹,]/g, "")) || 0;
          // const fv = parseInt(item.Fee.replace(/[₹?,\s]/g, "")) || 0;
          if (selFeeRange === "Under ₹1L" && fv >= 100000) return false;
          if (selFeeRange === "₹1L - ₹2L" && (fv < 100000 || fv > 200000))
            return false;
          if (selFeeRange === "₹2L - ₹5L" && (fv < 200000 || fv > 500000))
            return false;
          if (selFeeRange === "₹5L - ₹10L" && (fv < 500000 || fv > 1000000))
            return false;
          if (selFeeRange === "Above ₹10L" && fv <= 1000000) return false;
        }

        // Search filter (last, most expensive)
        if (s) {
          const haystack =
            `${item.Institute} ${item.Course} ${item.State}`.toLowerCase();
          if (!haystack.includes(s)) return false;
        }

        return true;
      })
      .sort(
        (a, b) =>
          parseInt(a.ai_rank.replace(/,/g, "")) -
          parseInt(b.ai_rank.replace(/,/g, "")),
      );
  }, [
    data,
    selRound,
    selCategory,
    selQuota,
    selState,
    selCourse,
    selFeeRange,
    searchTerm,
  ]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [
    selRound,
    selCategory,
    selQuota,
    selState,
    selCourse,
    selFeeRange,
    searchTerm,
  ]);

  // ─── Pagination slice ───────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ─── Clear all filters ──────────────────────────────────────────────────────
  const clearAll = () => {
    setSearchTerm("");
    setSelCategory("all");
    setSelQuota("all");
    setSelRound("all");
    setSelState("all");
    setSelCourse("all");
    setSelFeeRange("all");
  };

  // ─── Loading state ──────────────────────────────────────────────────────────
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading 2025 Allotment Data...</p>
        </div>
      </div>
    );

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Column Visibility Modal ── */}
      {showColModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Show/Hide Columns
              </h3>
              <button onClick={() => setShowColModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={showAll}
                  className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  Show All
                </button>
                <button
                  onClick={hideAll}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Hide All
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {colDefs.map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <label className="flex items-center cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={colVis[key]}
                        onChange={() => toggleCol(key)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {label}
                      </span>
                    </label>
                    {colVis[key] ? (
                      <Eye className="w-4 h-4 text-blue-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowColModal(false)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">NEET PG Allotments</h1>
                <p className="text-xs text-blue-100">2025 Session</p>
              </div>
            </div>
            <span className="hidden md:block text-xs text-blue-100">
              {filtered.length} Records
            </span>
          </div>
        </div>

        {/* ── Error banner ── */}
        {dataError && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-700 text-center">
            ⚠️ Unable to load NEET PG allotment data.
            {apiError ? (
              <span> {apiError}</span>
            ) : (
              <span>⚠️ Data not found. Check the data Place.</span>
            )}
          </div>
        )}

        {/* ── Round pills + Show/Hide ── */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {["1", "2", "3", "4", "5"].map((r) => (
              <button
                key={r}
                onClick={() => setSelRound(r)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  selRound === r
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Round {r}
              </button>
            ))}
            <button
              onClick={() => setSelRound("all")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                selRound === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Rounds
            </button>
            <button
              onClick={() => setShowColModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 ml-2 whitespace-nowrap"
            >
              <Eye className="w-4 h-4" /> Show/Hide
            </button>
          </div>
        </div>

        {/* ── Search + Filters ── */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institutes, courses, or states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Quick filters */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={selCategory}
                onChange={(e) => setSelCategory(e.target.value)}
                className="px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white min-w-[130px]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "all" ? "All Categories" : c}
                  </option>
                ))}
              </select>
              <select
                value={selQuota}
                onChange={(e) => setSelQuota(e.target.value)}
                className="px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white min-w-[120px]"
              >
                {quotas.map((q) => (
                  <option key={q} value={q}>
                    {q === "all" ? "All Quotas" : q}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowAdv(!showAdv)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
              >
                <Filter className="w-4 h-4" />
                {showAdv ? "Hide" : "Show"} Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showAdv ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Advanced filters */}
          {showAdv && (
            <div className="border-t pt-3">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <select
                  value={selState}
                  onChange={(e) => setSelState(e.target.value)}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white"
                >
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s === "all" ? "All States" : s}
                    </option>
                  ))}
                </select>
                <select
                  value={selFeeRange}
                  onChange={(e) => setSelFeeRange(e.target.value)}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white"
                >
                  {feeRanges.map((r) => (
                    <option key={r} value={r}>
                      {r === "all" ? "All Fees" : r}
                    </option>
                  ))}
                </select>
                <select
                  value={selCourse}
                  onChange={(e) => setSelCourse(e.target.value)}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white"
                >
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c === "all" ? "All Courses" : c}
                    </option>
                  ))}
                </select>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm"
                >
                  Clear All
                </button>
                <div className="flex items-center justify-center text-sm bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-medium text-blue-600">
                    {filtered.length}
                  </span>
                  <span className="ml-1 text-gray-600">filtered</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Table ── */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
              <tr>
                {colVis.Round && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Round
                  </th>
                )}
                {colVis.ai_rank && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    AI Rank
                  </th>
                )}
                {colVis.State && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    State
                  </th>
                )}
                {colVis.Institute && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                    Institute
                  </th>
                )}
                {colVis.Course && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">
                    Course
                  </th>
                )}
                {colVis.Quota && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Quota
                  </th>
                )}
                {colVis.Category && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Category
                  </th>
                )}
                {colVis.Fee && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Fee
                  </th>
                )}
                {colVis.Stipend_Year_1 && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Stipend
                  </th>
                )}
                {colVis.Bond_Years && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Bond Yrs
                  </th>
                )}
                {colVis.Beds && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Beds
                  </th>
                )}
                {colVis.actions && <th className="px-2 py-2" />}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={Object.values(colVis).filter(Boolean).length}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {dataError
                      ? "Unable to load the data. Please refresh the page and try again."
                      : "No records found for the selected filters."}
                  </td>
                </tr>
              ) : (
                paged.map((item, i) => (
                  <tr key={i} className="hover:bg-blue-50 transition-colors">
                    {colVis.Round && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {item.Round}
                      </td>
                    )}
                    {colVis.ai_rank && (
                      <td className="px-2 py-2 text-center text-xs font-bold text-blue-600">
                        {parseInt(
                          item.ai_rank.replace(/,/g, ""),
                        ).toLocaleString()}
                      </td>
                    )}
                    {colVis.State && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.State}
                      </td>
                    )}
                    {colVis.Institute && (
                      <td className="px-2 py-2 text-left text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                        {item.Institute}
                      </td>
                    )}
                    {colVis.Course && (
                      <td className="px-2 py-2 text-left text-xs text-gray-700">
                        {item.Course}
                      </td>
                    )}
                    {colVis.Quota && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.Quota === "AIQ"
                              ? "bg-blue-100 text-blue-800"
                              : item.Quota === "State Quota"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.Quota}
                        </span>
                      </td>
                    )}
                    {colVis.Category && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.Category === "GEN"
                              ? "bg-gray-100 text-gray-800"
                              : item.Category === "OBC"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.Category === "SC"
                                  ? "bg-red-100 text-red-800"
                                  : item.Category === "ST"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.Category}
                        </span>
                      </td>
                    )}
                    {colVis.Fee && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {item.Fee}
                      </td>
                    )}
                    {colVis.Stipend_Year_1 && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.Stipend_Year_1}
                      </td>
                    )}
                    {colVis.Bond_Years && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.Bond_Years} yrs
                      </td>
                    )}
                    {colVis.Beds && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.Beds}
                      </td>
                    )}
                    {colVis.actions && (
                      <td className="px-2 py-2">
                        <button className="p-1 hover:bg-red-100 rounded transition-colors">
                          <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {filtered.length > 0 ? (page - 1) * PER_PAGE + 1 : 0} to{" "}
              {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <PrevIcon className="w-3 h-3" />
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                  const n = start + i;
                  if (n > totalPages) return null;
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        page === n
                          ? "bg-blue-500 text-white"
                          : "border border-gray-300 text-black hover:bg-gray-50"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <NextIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllotmentsPage2025;
