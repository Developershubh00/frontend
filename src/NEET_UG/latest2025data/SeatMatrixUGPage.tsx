import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Eye,
  EyeOff,
  X,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin,
  BarChart2,
  GraduationCap,
} from "lucide-react";

interface SeatMatrixUGPageProps {
  onBack: () => void;
}

interface SeatMatrixUGData {
  sNo: number;
  State: string;
  Institute: string;
  Course: string;
  Seats: number; // parsed numeric value (-1 = N/A)
  SeatsRaw: string; // original string for display
  Fee: number; // parsed numeric value (-1 = N/A)
  FeeRaw: string; // formatted display string
  DegreeType: string; // "MBBS" or "BDS"
  ManagementGroup: string; // derived: "Government" | "Private"
}

interface ColVis {
  sNo: boolean;
  State: boolean;
  Institute: boolean;
  Course: boolean;
  Seats: boolean;
  Fee: boolean;
  Management: boolean;
}

// ─────────────────────────────────────────────
// HELPER: Parse Seats
// Handles: "48", "0+3(VV)", "175", "Info not available", "-", ""
// ─────────────────────────────────────────────
function parseSeats(raw: string): { num: number; display: string } {
  const trimmed = raw?.trim() ?? "";
  if (
    !trimmed ||
    trimmed === "-" ||
    trimmed.toLowerCase().includes("info not available") ||
    trimmed.toLowerCase() === "n/a"
  ) {
    return { num: -1, display: "N/A" };
  }

  // Handle "0+3(VV)" or "12+8(VV)" format
  const vvMatch = trimmed.match(/^(\d+)\s*\+\s*(\d+)\s*\(VV\)$/i);
  if (vvMatch) {
    const total = parseInt(vvMatch[1]) + parseInt(vvMatch[2]);
    return { num: total, display: trimmed };
  }

  const num = parseInt(trimmed);
  if (isNaN(num)) return { num: -1, display: trimmed };
  return { num, display: trimmed };
}

// ─────────────────────────────────────────────
// HELPER: Parse Fee
// Handles: "1350", "₹24,000*", "1770000", "Info not available", "-", ""
// ─────────────────────────────────────────────
function parseFee(raw: string): { num: number; display: string } {
  const trimmed = raw?.trim() ?? "";
  if (
    !trimmed ||
    trimmed === "-" ||
    trimmed.toLowerCase().includes("info not available") ||
    trimmed.toLowerCase() === "n/a"
  ) {
    return { num: -1, display: "N/A" };
  }

  // Remove ₹, commas, spaces, * and any non-digit characters
  const cleaned = trimmed.replace(/[₹,\s*]/g, "");
  const num = parseInt(cleaned);
  if (isNaN(num)) return { num: -1, display: trimmed };

  // Format in Indian numbering system
  return { num, display: `₹${num.toLocaleString("en-IN")}` };
}

// ─────────────────────────────────────────────
// HELPER: Degree Type
// ─────────────────────────────────────────────
function getDegreeType(course: string): string {
  const cu = course.toUpperCase().trim();
  if (cu === "MBBS") return "MBBS";
  if (cu === "BDS") return "BDS";
  return cu || "Other";
}

// ─────────────────────────────────────────────
// HELPER: Classify Management (derived since CSV has no such column)
// Uses institute name keywords + fee threshold as fallback
// ─────────────────────────────────────────────
function classifyManagement(institute: string, fee: number): string {
  const name = institute.toLowerCase();

  const govtKeywords = [
    "aiims",
    "jipmer",
    "esic",
    "ruhs",
    "govt",
    "government",
    "gmc,",
    "gmc ",
    "mamc",
    "vmmc",
    "ucms",
    "abvims",
    "ndmc",
    "igmc",
    "igims",
    "scb,",
    "mkcg",
    "vimsar",
    "bhu",
    "amu",
    "kgmu",
    "rml",
    "neigrihms",
    "rims,",
    "sgpgi",
    "dr rml",
    "patna med",
    "madras med",
    "medical college",
    "med coll,",
    "seth gs",
    "bjmc,",
    "grant med",
    "topiwala",
    "coimbatore med",
    "stanley med",
    "kilkauk",
    "thanjavur",
    "tirunelveli",
    "pt.",
    "pts.",
    "lalbahshastri",
    "rpg,",
    "doon med",
    "soban singh",
    "vcsg",
    "hbt & rn",
    "lokkmanya",
    "s.n. med",
    "mln med",
    "mlb med",
    "llrm",
    "brd med",
    "gsv med",
    "gsVM",
    "jnm (amu)",
    "faculty of dental",
    "dr za dental",
    "shaik-ul-hind",
    "rajendra ims",
    "manipal tata",
    "ann magadh",
    "darbhanga,",
    "sri krishna,",
    "nalanda med",
    "vardhman ims",
    "jawaharlal nehru,",
    "jannayak karpoori",
  ];

  for (const kw of govtKeywords) {
    if (name.includes(kw)) return "Government";
  }

  // Fee-based fallback
  if (fee > 0 && fee < 200000) return "Government";
  return "Private";
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const SeatMatrixUGPage: React.FC<SeatMatrixUGPageProps> = ({ onBack }) => {
  const [seatData, setSeatData] = useState<SeatMatrixUGData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selState, setSelState] = useState("all");
  const [selCourse, setSelCourse] = useState("all"); // MBBS / BDS
  const [selManagement, setSelManagement] = useState("all");
  const [selInstitute, setSelInstitute] = useState("all");
  const [minSeats, setMinSeats] = useState("");
  const [maxSeats, setMaxSeats] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [showAdv, setShowAdv] = useState(false);
  const [showColModal, setShowColModal] = useState(false);
  const [page, setPage] = useState(1);
  const [feeCategory, setFeeCategory] = useState("all"); // quick filter

  const [colVis, setColVis] = useState<ColVis>({
    sNo: false,
    State: true,
    Institute: true,
    Course: true,
    Seats: true,
    Fee: true,
    Management: true,
  });

  const colDefs = [
    { key: "sNo" as keyof ColVis, label: "S.No" },
    { key: "State" as keyof ColVis, label: "State" },
    { key: "Management" as keyof ColVis, label: "Type" },
    { key: "Institute" as keyof ColVis, label: "Institute Name" },
    { key: "Course" as keyof ColVis, label: "Course" },
    { key: "Seats" as keyof ColVis, label: "Seats" },
    { key: "Fee" as keyof ColVis, label: "Fee (Annual)" },
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

  // ─────────────────────────────────────────
  // CSV PARSER (RFC 4180 compliant)
  // ─────────────────────────────────────────
  const parseCSV = (text: string): SeatMatrixUGData[] => {
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

    const rows: SeatMatrixUGData[] = [];
    let pos = 0;
    let sNoCounter = 1;

    // Skip header row
    const header = parseRow(text, pos);
    pos = header.next;

    while (pos < text.length) {
      const { fields: v, next } = parseRow(text, pos);
      pos = next;

      if (v.length < 3) continue;

      const state = (v[0] || "").trim();
      const institute = (v[1] || "").trim();
      const course = (v[2] || "").trim();
      const seatsRaw = (v[3] || "").trim();
      const feeRaw = (v[4] || "").trim();

      // Skip repeated header rows, empty rows, and TOTAL rows
      if (
        state.toLowerCase() === "state" &&
        institute.toLowerCase() === "institute"
      )
        continue;
      if (!institute || institute.toUpperCase() === "TOTAL") continue;
      if (!course) continue;

      const seats = parseSeats(seatsRaw);
      const fee = parseFee(feeRaw);
      const degreeType = getDegreeType(course);
      const mgmt = classifyManagement(institute, fee.num);

      rows.push({
        sNo: sNoCounter++,
        State: state,
        Institute: institute,
        Course: course,
        Seats: seats.num,
        SeatsRaw: seats.display,
        Fee: fee.num,
        FeeRaw: fee.display,
        DegreeType: degreeType,
        ManagementGroup: mgmt,
      });
    }
    return rows;
  };

  // ─────────────────────────────────────────
  // FETCH CSV
  // ─────────────────────────────────────────
  useEffect(() => {
    fetch("/data/seatmatrixUG.csv")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.text();
      })
      .then((t) => {
        setSeatData(parseCSV(t));
        setDataError(false);
      })
      .catch(() => {
        setDataError(true);
        setSeatData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ─────────────────────────────────────────
  // DERIVED FILTER OPTIONS
  // ─────────────────────────────────────────
  const states = [
    ...new Set(seatData.map((d) => d.State).filter(Boolean)),
  ].sort();
  const courses = [
    ...new Set(seatData.map((d) => d.DegreeType).filter(Boolean)),
  ].sort();
  const managements = ["Government", "Private"];
  const institutes = [
    ...new Set(seatData.map((d) => d.Institute).filter(Boolean)),
  ].sort();

  // ─────────────────────────────────────────
  // FILTER LOGIC
  // ─────────────────────────────────────────
  const filtered = seatData.filter((item) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !s ||
      item.Institute.toLowerCase().includes(s) ||
      item.Course.toLowerCase().includes(s) ||
      item.State.toLowerCase().includes(s);
    if (!matchesSearch) return false;

    if (selState !== "all" && item.State !== selState) return false;
    if (selCourse !== "all" && item.DegreeType !== selCourse) return false;
    if (selManagement !== "all" && item.ManagementGroup !== selManagement)
      return false;
    if (selInstitute !== "all" && item.Institute !== selInstitute) return false;

    // Fee category quick filter
    if (feeCategory === "govt" && item.ManagementGroup !== "Government")
      return false;
    if (feeCategory === "private" && item.ManagementGroup === "Government")
      return false;
    if (feeCategory === "highfee" && (item.Fee < 0 || item.Fee < 1000000))
      return false;

    // Seats range
    if (minSeats && (item.Seats < 0 || item.Seats < parseInt(minSeats)))
      return false;
    if (maxSeats && item.Seats >= 0 && item.Seats > parseInt(maxSeats))
      return false;

    // Fee range
    if (minFee && (item.Fee < 0 || item.Fee < parseInt(minFee))) return false;
    if (maxFee && item.Fee >= 0 && item.Fee > parseInt(maxFee)) return false;

    return true;
  });

  const PER_PAGE = 70;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearAll = () => {
    setSearchTerm("");
    setSelState("all");
    setSelCourse("all");
    setSelManagement("all");
    setSelInstitute("all");
    setMinSeats("");
    setMaxSeats("");
    setMinFee("");
    setMaxFee("");
    setFeeCategory("all");
    setPage(1);
  };

  // ─────────────────────────────────────────
  // STATS
  // ─────────────────────────────────────────
  const totalSeats = filtered.reduce(
    (s, r) => s + (r.Seats > 0 ? r.Seats : 0),
    0,
  );
  const mbbsCount = filtered.filter((r) => r.DegreeType === "MBBS").length;
  const bdsCount = filtered.filter((r) => r.DegreeType === "BDS").length;
  const govtCount = filtered.filter(
    (r) => r.ManagementGroup === "Government",
  ).length;
  const pvtCount = filtered.filter(
    (r) => r.ManagementGroup === "Private",
  ).length;

  // ─────────────────────────────────────────
  // BADGE COLORS
  // ─────────────────────────────────────────
  const mgmtColor = (m: string) => {
    if (m === "Government") return "bg-emerald-100 text-emerald-800";
    return "bg-orange-100 text-orange-800";
  };

  const degreeColor = (d: string) => {
    if (d === "MBBS") return "bg-blue-100 text-blue-800";
    if (d === "BDS") return "bg-teal-100 text-teal-800";
    return "bg-gray-100 text-gray-600";
  };

  const feeColor = (fee: number) => {
    if (fee < 0) return "text-gray-400 italic";
    if (fee < 100000) return "text-emerald-600 font-semibold";
    if (fee < 500000) return "text-blue-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  // ─────────────────────────────────────────
  // CUSTOM SELECT COMPONENT
  // ─────────────────────────────────────────
  const CustomSelect = ({ value, onChange, options, allLabel, icon }: any) => (
    <div className="relative">
      {icon && (
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <select
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setPage(1);
        }}
        className={`${icon ? "pl-8" : "pl-3"} pr-8 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white appearance-none min-w-[150px] w-full`}
      >
        <option value="all">{allLabel}</option>
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  // ─────────────────────────────────────────
  // LOADING STATE
  // ─────────────────────────────────────────
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading NEET UG Seat Matrix...</p>
        </div>
      </div>
    );

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Column Visibility Modal */}
      {showColModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                Show / Hide Columns
              </h3>
              <button
                onClick={() => setShowColModal(false)}
                className="p-1 hover:bg-gray-200 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={showAll}
                  className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg font-medium"
                >
                  Show All
                </button>
                <button
                  onClick={hideAll}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg font-medium"
                >
                  Hide All
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {colDefs.map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <label className="flex items-center cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={colVis[key]}
                        onChange={() => toggleCol(key)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700 font-medium">
                        {label}
                      </span>
                    </label>
                    {colVis[key] ? (
                      <Eye className="w-4 h-4 text-blue-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowColModal(false)}
                className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-bold">NEET UG Seat Matrix 2025</h1>
                <p className="text-xs text-blue-100">
                  MBBS & BDS · {filtered.length.toLocaleString()} Records
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs text-blue-100">
              <span>🪑 {totalSeats.toLocaleString()} Seats</span>
              <span>🎓 {mbbsCount} MBBS</span>
              <span>🦷 {bdsCount} BDS</span>
              <span>🏛️ {govtCount} Govt</span>
            </div>
          </div>
        </div>

        {dataError && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-700 text-center">
            ⚠️ Data file not found. Add <code>/data/seatmatrixUG.csv</code> to
            enable this page.
          </div>
        )}

        {/* Course-type quick filters + Fee category */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {/* Course filter */}
            {["all", "MBBS", "BDS"].map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelCourse(d);
                  setPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selCourse === d ? "bg-blue-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {d === "all" ? "All Courses" : d}
              </button>
            ))}

            <span className="text-gray-300">|</span>

            {/* Fee category filter */}
            {[
              { key: "all", label: "All Types" },
              { key: "govt", label: "🏛️ Government" },
              { key: "private", label: "🏢 Private" },
              { key: "highfee", label: "💰 High Fee (>10L)" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setFeeCategory(f.key);
                  setPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${feeCategory === f.key ? "bg-indigo-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {f.label}
              </button>
            ))}

            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setShowColModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 whitespace-nowrap"
              >
                <Eye className="w-4 h-4" /> Columns
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institute, course or state…"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <CustomSelect
                value={selState}
                onChange={setSelState}
                options={states}
                allLabel="All States"
                icon={<MapPin className="w-3.5 h-3.5" />}
              />
              <CustomSelect
                value={selManagement}
                onChange={setSelManagement}
                options={managements}
                allLabel="All Types"
                icon={<Building2 className="w-3.5 h-3.5" />}
              />
              <button
                onClick={() => setShowAdv(!showAdv)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border transition-colors ${showAdv ? "bg-blue-50 text-blue-700 border-blue-300" : "text-gray-600 border-gray-300 hover:bg-gray-50"}`}
              >
                <Filter className="w-4 h-4" /> More Filters
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${showAdv ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdv && (
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Advanced Filters
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Specific Institute */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Specific Institute
                  </label>
                  <CustomSelect
                    value={selInstitute}
                    onChange={setSelInstitute}
                    options={institutes.slice(0, 100)}
                    allLabel="All Institutes"
                  />
                </div>
                {/* Min Seats */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Min Seats
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    value={minSeats}
                    onChange={(e) => {
                      setMinSeats(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white"
                  />
                </div>
                {/* Max Seats */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Max Seats
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 200"
                    value={maxSeats}
                    onChange={(e) => {
                      setMaxSeats(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white"
                  />
                </div>
                {/* Min Fee */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Min Fee (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    value={minFee}
                    onChange={(e) => {
                      setMinFee(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Max Fee */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block font-medium">
                    Max Fee (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 500000"
                    value={maxFee}
                    onChange={(e) => {
                      setMaxFee(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  <span className="font-semibold text-blue-600">
                    {filtered.length.toLocaleString()}
                  </span>
                  <span className="text-gray-500">results</span>
                  <span className="text-gray-400">·</span>
                  <span className="font-semibold text-emerald-600">
                    {totalSeats.toLocaleString()}
                  </span>
                  <span className="text-gray-500">total seats</span>
                </div>
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex gap-4 overflow-x-auto text-xs text-blue-700">
          <span>
            📊 <b>{filtered.length.toLocaleString()}</b> entries
          </span>
          <span>
            🪑 <b>{totalSeats.toLocaleString()}</b> seats
          </span>
          <span>
            🎓 MBBS: <b>{mbbsCount}</b>
          </span>
          <span>
            🦷 BDS: <b>{bdsCount}</b>
          </span>
          <span>
            🏛️ Govt: <b>{govtCount}</b>
          </span>
          <span>
            🏢 Private: <b>{pvtCount}</b>
          </span>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b-2 border-gray-300 sticky top-0 z-10">
              <tr>
                {colVis.sNo && (
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    #
                  </th>
                )}
                {colVis.State && (
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    State
                  </th>
                )}
                {colVis.Management && (
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Type
                  </th>
                )}
                {colVis.Institute && (
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Institute Name
                  </th>
                )}
                {colVis.Course && (
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Course
                  </th>
                )}
                {colVis.Seats && (
                  <th className="px-3 py-2.5 text-xs font-bold text-blue-600 uppercase tracking-wide">
                    Seats
                  </th>
                )}
                {colVis.Fee && (
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Fee (Annual)
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={Object.values(colVis).filter(Boolean).length}
                    className="px-6 py-16 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <BarChart2 className="w-10 h-10 text-gray-300" />
                      <p className="font-medium">No results found</p>
                      <p className="text-xs">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paged.map((item, i) => {
                  return (
                    <tr key={i} className="hover:bg-blue-50 transition-colors">
                      {colVis.sNo && (
                        <td className="px-3 py-2 text-xs text-gray-400">
                          {(page - 1) * PER_PAGE + i + 1}
                        </td>
                      )}
                      {colVis.State && (
                        <td className="px-3 py-2 text-xs text-gray-700 whitespace-nowrap">
                          {item.State || "N/A"}
                        </td>
                      )}
                      {colVis.Management && (
                        <td className="px-3 py-2 text-xs">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${mgmtColor(item.ManagementGroup)}`}
                          >
                            {item.ManagementGroup}
                          </span>
                        </td>
                      )}
                      {colVis.Institute && (
                        <td className="px-3 py-2 text-xs text-blue-700 font-medium max-w-[280px]">
                          <span className="line-clamp-2">{item.Institute}</span>
                        </td>
                      )}
                      {colVis.Course && (
                        <td className="px-3 py-2 text-xs">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${degreeColor(item.DegreeType)}`}
                          >
                            {item.DegreeType}
                          </span>
                        </td>
                      )}
                      {colVis.Seats && (
                        <td className="px-3 py-2 text-xs">
                          {item.Seats < 0 ? (
                            <span className="text-gray-400 italic text-[11px]">
                              N/A
                            </span>
                          ) : item.Seats === 0 ? (
                            <span className="text-gray-400">0</span>
                          ) : (
                            <span
                              className={`font-bold text-sm ${item.Seats >= 50 ? "text-blue-600" : item.Seats >= 10 ? "text-blue-600" : "text-orange-500"}`}
                            >
                              {item.SeatsRaw}
                            </span>
                          )}
                        </td>
                      )}
                      {colVis.Fee && (
                        <td className="px-3 py-2 text-xs">
                          {item.Fee < 0 ? (
                            <span className="text-gray-400 italic text-[11px]">
                              N/A
                            </span>
                          ) : (
                            <span className={feeColor(item.Fee)}>
                              {item.FeeRaw}
                            </span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filtered.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}–
                {Math.min(page * PER_PAGE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {filtered.length.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-1.5 border text-gray-700 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const n =
                    totalPages <= 5
                      ? i + 1
                      : Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                  if (n > totalPages) return null;
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-medium ${page === n ? "bg-blue-600 text-white shadow" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="p-1.5 border text-gray-700 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMatrixUGPage;
