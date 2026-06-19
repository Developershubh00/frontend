import React, { useState, useEffect, useMemo } from "react";
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

interface InicetClosingRanks2026PageProps {
  onBack: () => void;
}

interface RanksData {
  Quota: string;
  Category: string;
  State: string;
  Institute: string;
  Course: string;
  Fee: string;
  "Stipend Year 1": string;
  "Bond Years": string;
  "Bond Penalty": string;
  Beds: string;
  "CR JAN 2026 0": string;
  "CR JAN 2026 1": string;
  "CR JAN 2026 2": string;
  "CR JAN 2026 3": string;
  "CR JUL 2026 0": string;
  "CR JUL 2026 1": string;
  "CR JUL 2026 2": string;
  "CR JUL 2026 3": string;
}

type ColKey =
  | "Quota"
  | "Category"
  | "State"
  | "Institute"
  | "Course"
  | "Fee"
  | "Stipend Year 1"
  | "Bond Years"
  | "Bond Penalty"
  | "Beds"
  | "CR JAN 2026 0"
  | "CR JAN 2026 1"
  | "CR JAN 2026 2"
  | "CR JAN 2026 3"
  | "CR JUL 2026 0"
  | "CR JUL 2026 1"
  | "CR JUL 2026 2"
  | "CR JUL 2026 3";

type ColVis = Record<ColKey, boolean>;

const COL_DEFS: { key: ColKey; label: string }[] = [
  { key: "Quota", label: "Quota" },
  { key: "Category", label: "Category" },
  { key: "State", label: "State" },
  { key: "Institute", label: "Institute" },
  { key: "Course", label: "Course" },
  { key: "Fee", label: "Fee" },
  { key: "Stipend Year 1", label: "Stipend Y1" },
  { key: "Bond Years", label: "Bond Yrs" },
  { key: "Bond Penalty", label: "Bond Penalty" },
  { key: "Beds", label: "Beds" },
  { key: "CR JAN 2026 0", label: "JAN R0" },
  { key: "CR JAN 2026 1", label: "JAN R1" },
  { key: "CR JAN 2026 2", label: "JAN R2" },
  { key: "CR JAN 2026 3", label: "JAN R3" },
  { key: "CR JUL 2026 0", label: "JUL R0" },
  { key: "CR JUL 2026 1", label: "JUL R1" },
  { key: "CR JUL 2026 2", label: "JUL R2" },
  { key: "CR JUL 2026 3", label: "JUL R3" },
];

const DEFAULT_VIS: ColVis = {
  Quota: true,
  Category: true,
  State: true,
  Institute: true,
  Course: true,
  Fee: false,
  "Stipend Year 1": false,
  "Bond Years": false,
  "Bond Penalty": false,
  Beds: false,
  "CR JAN 2026 0": true,
  "CR JAN 2026 1": true,
  "CR JAN 2026 2": true,
  "CR JAN 2026 3": true,
  "CR JUL 2026 0": true,
  "CR JUL 2026 1": true,
  "CR JUL 2026 2": true,
  "CR JUL 2026 3": true,
};

const JAN_RANK_COLS: ColKey[] = [
  "CR JAN 2026 0",
  "CR JAN 2026 1",
  "CR JAN 2026 2",
  "CR JAN 2026 3",
];
const JUL_RANK_COLS: ColKey[] = [
  "CR JUL 2026 0",
  "CR JUL 2026 1",
  "CR JUL 2026 2",
  "CR JUL 2026 3",
];
const ALL_RANK_COLS: ColKey[] = [...JAN_RANK_COLS, ...JUL_RANK_COLS];

// ── Custom searchable select ───────────────────────────────────────────────
const CustomSelect: React.FC<{
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}> = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="relative min-w-[150px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-left flex items-center justify-between"
      >
        <span className="text-gray-700 truncate">
          {value === "all" ? allLabel : value}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div className="overflow-y-auto max-h-48">
              {filtered.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-50 ${
                    value === opt
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700"
                  }`}
                >
                  {opt === "all" ? allLabel : opt}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ── Rank cell styling ──────────────────────────────────────────────────────
const RankCell: React.FC<{ val: string }> = ({ val }) => {
  if (!val || val === "-" || val === "") return <span className="text-gray-300">—</span>;
  const rank = parseInt(val.replace(/[^0-9]/g, ""));
  if (isNaN(rank)) return <span className="text-gray-300">—</span>;
  const color =
    rank <= 100
      ? "text-emerald-600 font-bold"
      : rank <= 500
      ? "text-blue-700 font-bold"
      : rank <= 2000
      ? "text-blue-600 font-semibold"
      : rank <= 5000
      ? "text-amber-600"
      : "text-gray-500";
  return <span className={`text-xs ${color}`}>{val}</span>;
};

// ── Main component ─────────────────────────────────────────────────────────
const InicetClosingRanks2026Page: React.FC<InicetClosingRanks2026PageProps> = ({
  onBack,
}) => {
  const [data, setData] = useState<RanksData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selState, setSelState] = useState("all");
  const [selQuota, setSelQuota] = useState("all");
  const [selCategory, setSelCategory] = useState("all");
  const [selCourse, setSelCourse] = useState("all");
  const [minRank, setMinRank] = useState("");
  const [maxRank, setMaxRank] = useState("");

  // Session & round filter
  type SessionType = "all" | "JAN" | "JUL";
  type RoundType = "all" | "0" | "1" | "2" | "3";
  const [selSession, setSelSession] = useState<SessionType>("all");
  const [selRound, setSelRound] = useState<RoundType>("all");

  // UI state
  const [page, setPage] = useState(1);
  const [showAdv, setShowAdv] = useState(false);
  const [showColModal, setShowColModal] = useState(false);
  const [colVis, setColVis] = useState<ColVis>(DEFAULT_VIS);

  const PER_PAGE = 50;

  const toggleCol = (k: ColKey) => setColVis((p) => ({ ...p, [k]: !p[k] }));
  const showAll = () =>
    setColVis(
      COL_DEFS.reduce((a, { key }) => ({ ...a, [key]: true }), {} as ColVis)
    );
  const hideAll = () =>
    setColVis(
      COL_DEFS.reduce(
        (a, { key }) => ({
          ...a,
          [key]: key === "Institute" || key === "Course",
        }),
        {} as ColVis
      )
    );

  // Apply session + round → update column visibility
  const applySessionRound = (session: SessionType, round: RoundType) => {
    setSelSession(session);
    setSelRound(round);
    const nv = { ...colVis };

    ALL_RANK_COLS.forEach((k) => { nv[k] = false; });

    const sessCols =
      session === "JAN"
        ? JAN_RANK_COLS
        : session === "JUL"
        ? JUL_RANK_COLS
        : ALL_RANK_COLS;

    if (round === "all") {
      sessCols.forEach((k) => { nv[k] = true; });
    } else {
      sessCols.forEach((k) => {
        if (k.endsWith(` ${round}`)) nv[k] = true;
      });
    }
    setColVis(nv);
  };

  // ── CSV parser ─────────────────────────────────────────────────────────
  const parseCSV = (text: string): RanksData[] => {
    const clean = text.replace(/^\uFEFF/, "");
    if (clean.includes("<html") || clean.includes("<!DOCTYPE"))
      throw new Error("HTML");
    const lines = clean
      .trim()
      .split(/\r?\n/)
      .filter((l) => l.trim());
    if (lines.length < 2) throw new Error("No data");

    const parseRow = (line: string): string[] => {
      const vals: string[] = [];
      let cur = "";
      let inQ = false;
      for (const ch of line) {
        if (ch === '"') inQ = !inQ;
        else if (ch === "," && !inQ) {
          vals.push(cur.trim().replace(/^"(.*)"$/, "$1").trim());
          cur = "";
        } else cur += ch;
      }
      vals.push(cur.trim().replace(/^"(.*)"$/, "$1").trim());
      return vals;
    };

    return lines.slice(1).map((line) => {
      const v = parseRow(line);
      const g = (i: number) => (v[i] !== undefined && v[i] !== "" && v[i] !== "-" ? v[i] : "");

      return {
        Quota: v[0] || "",
        Category: v[1] || "",
        State: v[2] || "",
        Institute: v[3] || "",
        Course: v[4] || "",
        Fee: g(5),
        "Stipend Year 1": g(6),
        "Bond Years": g(7),
        "Bond Penalty": g(8),
        Beds: g(9),
        "CR JAN 2026 0": g(10),
        "CR JAN 2026 1": g(11),
        "CR JAN 2026 2": g(12),
        "CR JAN 2026 3": g(13),
        "CR JUL 2026 0": g(14),
        "CR JUL 2026 1": g(15),
        "CR JUL 2026 2": g(16),
        "CR JUL 2026 3": g(17),
      };
    });
  };

  useEffect(() => {
    fetch("/data/inicetData/inicet_closing_ranks_2026.csv")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.text();
      })
      .then((t) => {
        setData(parseCSV(t));
        setDataError(false);
      })
      .catch(() => {
        setDataError(true);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Derived filter options ─────────────────────────────────────────────
  const states = useMemo(
    () => ["all", ...Array.from(new Set(data.map((d) => d.State).filter(Boolean))).sort()],
    [data]
  );
  const quotas = useMemo(
    () => ["all", ...Array.from(new Set(data.map((d) => d.Quota).filter(Boolean))).sort()],
    [data]
  );
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(data.map((d) => d.Category).filter(Boolean))).sort()],
    [data]
  );
  const courses = useMemo(
    () => ["all", ...Array.from(new Set(data.map((d) => d.Course).filter(Boolean))).sort()],
    [data]
  );

  // ── Rank filter helper ─────────────────────────────────────────────────
  const getRelevantRanks = (item: RanksData): number[] => {
    const activeCols = ALL_RANK_COLS.filter((k) => colVis[k]);
    return activeCols
      .map((k) => {
        const m = item[k].match(/\d+/);
        return m ? parseInt(m[0]) : null;
      })
      .filter((r): r is number => r !== null && r > 0);
  };

  // ── Filtering ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();
    return data.filter((item) => {
      if (selQuota !== "all" && item.Quota !== selQuota) return false;
      if (selCategory !== "all" && item.Category !== selCategory) return false;
      if (selState !== "all" && item.State !== selState) return false;
      if (selCourse !== "all" && item.Course !== selCourse) return false;

      if (minRank || maxRank) {
        const ranks = getRelevantRanks(item);
        if (ranks.length === 0) return false;
        const minR = Math.min(...ranks);
        const maxR = Math.max(...ranks);
        if (minRank && maxR < parseFloat(minRank)) return false;
        if (maxRank && minR > parseFloat(maxRank)) return false;
      }

      if (s) {
        const hay =
          `${item.Institute} ${item.Course} ${item.State} ${item.Quota} ${item.Category}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [data, selQuota, selCategory, selState, selCourse, minRank, maxRank, searchTerm, colVis]);

  useEffect(() => {
    setPage(1);
  }, [selQuota, selCategory, selState, selCourse, minRank, maxRank, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearAll = () => {
    setSearchTerm("");
    setSelState("all");
    setSelQuota("all");
    setSelCategory("all");
    setSelCourse("all");
    setMinRank("");
    setMaxRank("");
    setSelSession("all");
    setSelRound("all");
    setPage(1);
    setColVis(DEFAULT_VIS);
  };

  const visibleCols = COL_DEFS.filter(({ key }) => colVis[key]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading INICET Closing Ranks...</p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Column visibility modal ── */}
      {showColModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Show / Hide Columns</h3>
              <button onClick={() => setShowColModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
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
              {[
                {
                  label: "Basic Info",
                  keys: ["Quota", "Category", "State", "Institute", "Course"] as ColKey[],
                },
                {
                  label: "Financial / Institution Details",
                  keys: ["Fee", "Stipend Year 1", "Bond Years", "Bond Penalty", "Beds"] as ColKey[],
                },
                {
                  label: "JAN 2026 Closing Ranks",
                  keys: ["CR JAN 2026 0", "CR JAN 2026 1", "CR JAN 2026 2", "CR JAN 2026 3"] as ColKey[],
                },
                {
                  label: "JUL 2026 Closing Ranks",
                  keys: ["CR JUL 2026 0", "CR JUL 2026 1", "CR JUL 2026 2", "CR JUL 2026 3"] as ColKey[],
                },
              ].map((group) => (
                <div key={group.label} className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1 px-2">
                    {group.label}
                  </p>
                  {group.keys.map((key) => {
                    const def = COL_DEFS.find((d) => d.key === key)!;
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <label className="flex items-center cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={colVis[key]}
                            onChange={() => toggleCol(key)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700">{def.label}</span>
                        </label>
                        {colVis[key] ? (
                          <Eye className="w-4 h-4 text-blue-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-end p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowColModal(false)}
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/20 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">INICET Closing Ranks</h1>
                <p className="text-xs text-purple-100">JAN & JUL 2026 Sessions</p>
              </div>
            </div>
            <span className="hidden md:block text-xs text-purple-100">
              {filtered.length.toLocaleString()} Records
            </span>
          </div>
        </div>

        {dataError && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-700 text-center">
            ⚠️ Data not found. Add{" "}
            <code>/data/inicetData/inicet_closing_ranks_2026.csv</code> to enable this page.
          </div>
        )}

        {/* ── Session + Round pills ── */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">

            {/* Session pills */}
            <div className="flex items-center gap-1 border-r pr-3 mr-1">
              <span className="text-xs text-gray-400 mr-1 whitespace-nowrap">Session:</span>
              {(["JAN", "JUL"] as SessionType[]).map((sess) => (
                <button
                  key={sess}
                  onClick={() => applySessionRound(sess, selRound)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    selSession === sess
                      ? "bg-purple-600 text-white"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }`}
                >
                  {sess}
                </button>
              ))}
              <button
                onClick={() => applySessionRound("all", selRound)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selSession === "all"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Both
              </button>
            </div>

            {/* Round pills */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 mr-1 whitespace-nowrap">Round:</span>
              {(["0", "1", "2", "3"] as RoundType[]).map((r) => (
                <button
                  key={r}
                  onClick={() => applySessionRound(selSession, r)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    selRound === r
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  R{r}
                </button>
              ))}
              <button
                onClick={() => applySessionRound(selSession, "all")}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selRound === "all"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
            </div>

            <button
              onClick={() => setShowColModal(true)}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 ml-auto whitespace-nowrap"
            >
              <Eye className="w-4 h-4" /> Columns
            </button>
          </div>
        </div>

        {/* ── Search + Filters ── */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institutes, courses, states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <CustomSelect
                value={selState}
                onChange={(v) => { setSelState(v); setPage(1); }}
                options={states}
                allLabel="All States"
              />
              <CustomSelect
                value={selCategory}
                onChange={(v) => { setSelCategory(v); setPage(1); }}
                options={categories}
                allLabel="All Categories"
              />
              <CustomSelect
                value={selQuota}
                onChange={(v) => { setSelQuota(v); setPage(1); }}
                options={quotas}
                allLabel="All Quotas"
              />
              <button
                onClick={() => setShowAdv(!showAdv)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200"
              >
                <Filter className="w-4 h-4" /> {showAdv ? "Hide" : "More"} Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showAdv ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {showAdv && (
            <div className="border-t pt-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <CustomSelect
                  value={selCourse}
                  onChange={(v) => { setSelCourse(v); setPage(1); }}
                  options={courses}
                  allLabel="All Courses"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min Rank"
                    value={minRank}
                    onChange={(e) => { setMinRank(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max Rank"
                    value={maxRank}
                    onChange={(e) => { setMaxRank(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm"
                >
                  Clear All Filters
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mt-3">
                <span className="font-medium text-purple-600">
                  {filtered.length.toLocaleString()}
                </span>
                <span className="ml-1">filtered results</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Table ── */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
              <tr>
                {visibleCols.map(({ key, label }) => {
                  const isJan = key.startsWith("CR JAN");
                  const isJul = key.startsWith("CR JUL");
                  return (
                    <th
                      key={key}
                      className={`px-2 py-2 text-center text-xs font-semibold uppercase whitespace-nowrap ${
                        isJan
                          ? "text-indigo-700 bg-indigo-50"
                          : isJul
                          ? "text-teal-700 bg-teal-50"
                          : "text-gray-700"
                      }`}
                    >
                      {label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleCols.length}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {dataError
                      ? "CSV not found — add /data/inicetData/inicet_closing_ranks_2026.csv to enable."
                      : "No data found. Try adjusting your filters."}
                  </td>
                </tr>
              ) : (
                paged.map((item, i) => (
                  <tr key={i} className="hover:bg-purple-50 transition-colors">
                    {colVis.Quota && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          {item.Quota}
                        </span>
                      </td>
                    )}
                    {colVis.Category && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.Category === "UR" || item.Category === "GEN" || item.Category === "Open"
                              ? "bg-gray-100 text-gray-800"
                              : item.Category === "OBC"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.Category === "SC"
                              ? "bg-red-100 text-red-800"
                              : item.Category === "ST"
                              ? "bg-blue-100 text-blue-800"
                              : item.Category === "EWS"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.Category}
                        </span>
                      </td>
                    )}
                    {colVis.State && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700 whitespace-nowrap">
                        {item.State}
                      </td>
                    )}
                    {colVis.Institute && (
                      <td className="px-2 py-2 text-left text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium min-w-[180px]">
                        {item.Institute}
                      </td>
                    )}
                    {colVis.Course && (
                      <td className="px-2 py-2 text-left text-xs text-gray-700 whitespace-nowrap">
                        {item.Course}
                      </td>
                    )}
                    {colVis.Fee && (
                      <td className="px-2 py-2 text-center text-xs text-blue-700 whitespace-nowrap">
                        {item.Fee || "—"}
                      </td>
                    )}
                    {colVis["Stipend Year 1"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-600">
                        {item["Stipend Year 1"] || "—"}
                      </td>
                    )}
                    {colVis["Bond Years"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-600">
                        {item["Bond Years"] || "—"}
                      </td>
                    )}
                    {colVis["Bond Penalty"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-600">
                        {item["Bond Penalty"] || "—"}
                      </td>
                    )}
                    {colVis.Beds && (
                      <td className="px-2 py-2 text-center text-xs text-gray-600">
                        {item.Beds || "—"}
                      </td>
                    )}
                    {colVis["CR JAN 2026 0"] && (
                      <td className="px-2 py-2 text-center bg-indigo-50/40">
                        <RankCell val={item["CR JAN 2026 0"]} />
                      </td>
                    )}
                    {colVis["CR JAN 2026 1"] && (
                      <td className="px-2 py-2 text-center bg-indigo-50/40">
                        <RankCell val={item["CR JAN 2026 1"]} />
                      </td>
                    )}
                    {colVis["CR JAN 2026 2"] && (
                      <td className="px-2 py-2 text-center bg-indigo-50/40">
                        <RankCell val={item["CR JAN 2026 2"]} />
                      </td>
                    )}
                    {colVis["CR JAN 2026 3"] && (
                      <td className="px-2 py-2 text-center bg-indigo-50/40">
                        <RankCell val={item["CR JAN 2026 3"]} />
                      </td>
                    )}
                    {colVis["CR JUL 2026 0"] && (
                      <td className="px-2 py-2 text-center bg-teal-50/40">
                        <RankCell val={item["CR JUL 2026 0"]} />
                      </td>
                    )}
                    {colVis["CR JUL 2026 1"] && (
                      <td className="px-2 py-2 text-center bg-teal-50/40">
                        <RankCell val={item["CR JUL 2026 1"]} />
                      </td>
                    )}
                    {colVis["CR JUL 2026 2"] && (
                      <td className="px-2 py-2 text-center bg-teal-50/40">
                        <RankCell val={item["CR JUL 2026 2"]} />
                      </td>
                    )}
                    {colVis["CR JUL 2026 3"] && (
                      <td className="px-2 py-2 text-center bg-teal-50/40">
                        <RankCell val={item["CR JUL 2026 3"]} />
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
              Showing {filtered.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}–
              {Math.min(page * PER_PAGE, filtered.length)} of{" "}
              {filtered.length.toLocaleString()}
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
                          ? "bg-purple-500 text-white"
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
                disabled={page === totalPages || totalPages === 0}
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

export default InicetClosingRanks2026Page;