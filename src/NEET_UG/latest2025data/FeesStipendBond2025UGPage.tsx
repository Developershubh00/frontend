import React, { useState, useEffect } from "react";
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

interface FeesStipendBond2025UGPageProps {
  onBack: () => void;
}

interface FeesData {
  State: string;
  Institute: string;
  Course: string;
  Quota: string;
  Fee: number;
  Beds: number;
  BondYears: number;
  BondPenalty: number;
  StipendYear1: number;
}

interface ColVis {
  State: boolean;
  Institute: boolean;
  Course: boolean;
  Quota: boolean;
  Beds: boolean;
  Fee: boolean;
  StipendYear1: boolean;
  BondYears: boolean;
  BondPenalty: boolean;
}

const CustomSelect: React.FC<{
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}> = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase()),
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
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none text-black"
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
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-50 ${value === opt ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}
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

const FeesStipendBond2025UGPage: React.FC<FeesStipendBond2025UGPageProps> = ({
  onBack,
}) => {
  const [feesData, setFeesData] = useState<FeesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selState, setSelState] = useState("all");
  const [selCourse, setSelCourse] = useState("all");
  const [selQuota, setSelQuota] = useState("all");

  const [page, setPage] = useState(1);
  const [showAdv, setShowAdv] = useState(false);
  const [showColModal, setShowColModal] = useState(false);

  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");

  const [colVis, setColVis] = useState<ColVis>({
    State: true,
    Institute: true,
    Course: true,
    Quota: true,
    Beds: true,
    Fee: true,
    StipendYear1: true,
    BondYears: true,
    BondPenalty: true,
  });

  const colDefs = [
    { key: "State", label: "State" },
    { key: "Institute", label: "Institute" },
    { key: "Course", label: "Course" },
    { key: "Quota", label: "Quota" },
    { key: "Beds", label: "Hospital Beds" },
    { key: "Fee", label: "Course Fee" },
    { key: "StipendYear1", label: "Stipend Year 1" },
    { key: "BondYears", label: "Bond (Years)" },
    { key: "BondPenalty", label: "Bond Penalty" },
  ] as { key: keyof ColVis; label: string }[];

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

  // Robust CSV parser that handles quoted fields with commas (e.g., "ESI, Basaidarpur, Delhi")
  const parseCSV = (text: string): FeesData[] => {
    if (text.includes("<html") || text.includes("<!DOCTYPE"))
      throw new Error("HTML");

    const parseRow = (
      src: string,
      pos: number,
    ): { fields: string[]; next: number } => {
      const fields: string[] = [];
      let i = pos;
      while (i <= src.length) {
        if (src[i] === '"') {
          let field = "";
          i++;
          while (i < src.length) {
            if (src[i] === '"') {
              if (src[i + 1] === '"') {
                field += '"';
                i += 2;
              } else {
                i++;
                break;
              }
            } else {
              field += src[i++];
            }
          }
          fields.push(field.trim());
          if (src[i] === ",") i++;
        } else {
          let field = "";
          while (
            i < src.length &&
            src[i] !== "," &&
            src[i] !== "\r" &&
            src[i] !== "\n"
          ) {
            field += src[i++];
          }
          fields.push(field.trim());
          if (src[i] === ",") i++;
        }
        if (src[i] === "\r" && src[i + 1] === "\n") {
          i += 2;
          break;
        }
        if (src[i] === "\n") {
          i++;
          break;
        }
        if (i >= src.length) break;
      }
      return { fields, next: i };
    };

    const rows: FeesData[] = [];
    let pos = 0;
    const header = parseRow(text, pos);
    pos = header.next;

    const parseNum = (s: string) => {
      if (
        !s ||
        s.toLowerCase().includes("info") ||
        s.toLowerCase() === "n/a" ||
        s === "-"
      )
        return NaN;
      const n = parseFloat(s.replace(/[^0-9.-]/g, ""));
      return isNaN(n) ? NaN : n;
    };

    while (pos < text.length) {
      const { fields: v, next } = parseRow(text, pos);
      pos = next;
      if (v.length < 2) continue;
      if (v[0].toLowerCase() === "state") continue; // skip repeated headers

      rows.push({
        State: v[0] || "",
        Institute: v[1] || "",
        Course: v[2] || "",
        Quota: v[3] || "",
        Fee: parseNum(v[4]),
        Beds: parseNum(v[5]),
        BondYears: parseNum(v[6]),
        BondPenalty: parseNum(v[7]),
        StipendYear1: parseNum(v[8]),
      });
    }
    return rows;
  };

  useEffect(() => {
    fetch("/data/feestiphendbond2025.csv")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.text();
      })
      .then((t) => {
        setFeesData(parseCSV(t));
        setDataError(false);
      })
      .catch(() => {
        setDataError(true);
        setFeesData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const states = [
    "all",
    ...Array.from(new Set(feesData.map((d) => d.State))),
  ].sort();
  const courses = [
    "all",
    ...Array.from(new Set(feesData.map((d) => d.Course))),
  ].sort();
  const quotas = [
    "all",
    ...Array.from(new Set(feesData.map((d) => d.Quota))),
  ].sort();

  const filtered = feesData.filter((item) => {
    const s = searchTerm.toLowerCase();
    const ms =
      !s ||
      item.Institute.toLowerCase().includes(s) ||
      item.State.toLowerCase().includes(s) ||
      item.Course.toLowerCase().includes(s) ||
      item.Quota.toLowerCase().includes(s);

    const mf =
      (!minFee || item.Fee >= parseFloat(minFee)) &&
      (!maxFee || item.Fee <= parseFloat(maxFee));
    const mb =
      (!minBeds || item.Beds >= parseFloat(minBeds)) &&
      (!maxBeds || item.Beds <= parseFloat(maxBeds));

    return (
      ms &&
      mf &&
      mb &&
      (selState === "all" || item.State === selState) &&
      (selCourse === "all" || item.Course === selCourse) &&
      (selQuota === "all" || item.Quota === selQuota)
    );
  });

  const PER_PAGE = 50;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearAll = () => {
    setSearchTerm("");
    setSelState("all");
    setSelCourse("all");
    setSelQuota("all");
    setMinFee("");
    setMaxFee("");
    setMinBeds("");
    setMaxBeds("");
    setPage(1);
  };

  // Formatters
  const fmtFee = (n: number) => {
    if (isNaN(n))
      return <span className="text-gray-400 italic text-[11px]">N/A</span>;
    if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
    if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
    if (n >= 1000) return "₹" + (n / 1000).toFixed(2) + " K";
    return "₹" + n.toLocaleString("en-IN");
  };

  const fmtStipend = (n: number) => {
    if (isNaN(n))
      return <span className="text-gray-400 italic text-[11px]">N/A</span>;
    return "₹" + n.toLocaleString("en-IN");
  };

  const fmtBeds = (n: number) => {
    if (isNaN(n))
      return <span className="text-gray-400 italic text-[11px]">N/A</span>;
    return n.toLocaleString("en-IN");
  };

  const fmtBondYears = (n: number) => {
    if (isNaN(n) || n === 0)
      return <span className="text-blue-600 font-medium">No Bond</span>;
    return (
      <span className="text-red-600 font-medium">
        {n} {n === 1 ? "Year" : "Years"}
      </span>
    );
  };

  const fmtPenalty = (n: number) => {
    if (isNaN(n) || n === 0)
      return <span className="text-gray-400 italic text-[11px]">N/A</span>;
    if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
    if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
    if (n >= 1000) return "₹" + (n / 1000).toFixed(2) + " K";
    return "₹" + n.toLocaleString("en-IN");
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading 2025 Fees & Stipend Data...</p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {showColModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Show/Hide Columns</h3>
              <button onClick={() => setShowColModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={showAll}
                  className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg"
                >
                  Show All
                </button>
                <button
                  onClick={hideAll}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg"
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
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded"
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
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
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
                <h1 className="text-lg font-semibold">
                  Fees, Stipend &amp; Bond
                </h1>
                <p className="text-xs text-purple-100">NEET UG 2025 Session</p>
              </div>
            </div>
            <span className="hidden md:block text-xs text-purple-100">
              {filtered.length.toLocaleString()} Records
            </span>
          </div>
        </div>

        {dataError && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-700 text-center">
            ⚠️ 2025 data not yet available. Add{" "}
            <code>/data/feestiphendbond2025.csv</code> to enable this page.
          </div>
        )}

        {/* Course pills (Replaces Institute Type from PG) */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {courses
              .filter((t) => t !== "all")
              .map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelCourse(type);
                    setPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selCourse === type ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {type}
                </button>
              ))}
            <button
              onClick={() => {
                setSelCourse("all");
                setPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selCourse === "all" ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              All Courses
            </button>
            <button
              onClick={() => setShowColModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 ml-2 whitespace-nowrap"
            >
              <Eye className="w-4 h-4" /> Columns
            </button>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institutes, states, courses, quota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <CustomSelect
                value={selState}
                onChange={(v) => {
                  setSelState(v);
                  setPage(1);
                }}
                options={states}
                allLabel="All States"
              />
              <CustomSelect
                value={selQuota}
                onChange={(v) => {
                  setSelQuota(v);
                  setPage(1);
                }}
                options={quotas}
                allLabel="All Quotas"
              />
              <button
                onClick={() => setShowAdv(!showAdv)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200"
              >
                <Filter className="w-4 h-4" /> {showAdv ? "Hide" : "Show"}{" "}
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showAdv ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>
          {showAdv && (
            <div className="border-t pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min Fee"
                    value={minFee}
                    onChange={(e) => {
                      setMinFee(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max Fee"
                    value={maxFee}
                    onChange={(e) => {
                      setMaxFee(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min Beds"
                    value={minBeds}
                    onChange={(e) => {
                      setMinBeds(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max Beds"
                    value={maxBeds}
                    onChange={(e) => {
                      setMaxBeds(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end">
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center text-sm bg-gray-50 rounded-lg px-3 py-2 mt-3">
                <span className="font-medium text-purple-600">
                  {filtered.length.toLocaleString()}
                </span>
                <span className="ml-1 text-gray-600">filtered results</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0 z-10">
              <tr>
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
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Course
                  </th>
                )}
                {colVis.Quota && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Quota
                  </th>
                )}
                {colVis.Beds && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Beds
                  </th>
                )}
                {colVis.Fee && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Course Fee
                  </th>
                )}
                {colVis.StipendYear1 && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Stipend Y1
                  </th>
                )}
                {colVis.BondYears && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Bond
                  </th>
                )}
                {colVis.BondPenalty && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">
                    Penalty
                  </th>
                )}
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
                      ? "2025 CSV not found — add /data/feestiphendbond2025.csv to enable this page."
                      : "No data found. Try adjusting your filters."}
                  </td>
                </tr>
              ) : (
                paged.map((item, i) => (
                  <tr key={i} className="hover:bg-purple-50 transition-colors">
                    {colVis.State && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.State}
                      </td>
                    )}
                    {colVis.Institute && (
                      <td
                        className="px-2 py-2 text-left text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium max-w-[250px] truncate"
                        title={item.Institute}
                      >
                        {item.Institute}
                      </td>
                    )}
                    {colVis.Course && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] font-semibold">
                          {item.Course}
                        </span>
                      </td>
                    )}
                    {colVis.Quota && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-medium">
                          {item.Quota}
                        </span>
                      </td>
                    )}
                    {colVis.Beds && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {fmtBeds(item.Beds)}
                      </td>
                    )}
                    {colVis.Fee && (
                      <td className="px-2 py-2 text-center text-xs font-bold text-blue-700">
                        {fmtFee(item.Fee)}
                      </td>
                    )}
                    {colVis.StipendYear1 && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-green-600">
                        {fmtStipend(item.StipendYear1)}
                      </td>
                    )}
                    {colVis.BondYears && (
                      <td className="px-2 py-2 text-center text-xs">
                        {fmtBondYears(item.BondYears)}
                      </td>
                    )}
                    {colVis.BondPenalty && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-red-600">
                        {fmtPenalty(item.BondPenalty)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {filtered.length > 0 ? (page - 1) * PER_PAGE + 1 : 0} to{" "}
              {Math.min(page * PER_PAGE, filtered.length)} of{" "}
              {filtered.length.toLocaleString()}
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <PrevIcon className="w-3 h-3" />
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const n = totalPages <= 5 ? i + 1 : Math.max(1, page - 2) + i;
                  if (n > totalPages) return null;
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`px-2 py-1 text-xs rounded ${page === n ? "bg-purple-500 text-white" : "border border-gray-300 text-black hover:bg-gray-50"}`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
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

export default FeesStipendBond2025UGPage;
