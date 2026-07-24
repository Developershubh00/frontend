/**
 * CollegePredictorPage.tsx  — v2 (grid card layout)
 * ─────────────────────────────────────────────────────────────────
 * Route:  <Route path="/predictor" element={<CollegePredictorPage />} />
 *
 * CSVs → /public/data/
 *   closingranks2025.csv | allotments2025.csv | seatmatrix2025.csv
 * ─────────────────────────────────────────────────────────────────
 */

/**
 * CollegePredictorPage.tsx  — v3 (fixed grid cards)
 * Route: <Route path="/predictor" element={<CollegePredictorPage />} />
 * CSVs → /public/data/closingranks2025.csv | allotments2025.csv | seatmatrix2025.csv
 */

import React, { useState, useEffect, useCallback, CSSProperties } from "react";

// ── Types ─────────────────────────────────────────────────────────
type Mode = "closing" | "allotments" | "seats";
type Chance = "Very High" | "High" | "Moderate" | "Low";
type ViewMode = "grid" | "list";
interface CSVRow {
  [key: string]: string;
}
interface CRRow extends CSVRow {
  closingRank: number | null;
  chance: Chance | null;
  dataYear: "2025" | "2024" | null;
}
type AnyResult = CRRow | CSVRow;

// ── CSV parser ────────────────────────────────────────────────────
function parseCSV(text: string): CSVRow[] {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = splitL(lines[0]);
  return lines.slice(1).map((line) => {
    const v = splitL(line);
    const o: CSVRow = {};
    headers.forEach((h, i) => {
      o[h.trim()] = (v[i] ?? "").trim();
    });
    return o;
  });
}
function splitL(line: string): string[] {
  const out: string[] = [];
  let c = "";
  let q = false;
  for (const ch of line) {
    if (ch === '"') {
      q = !q;
    } else if (ch === "," && !q) {
      out.push(c);
      c = "";
    } else c += ch;
  }
  out.push(c);
  return out;
}
function parseRank(s: string): number | null {
  if (!s || s === "-") return null;
  const m = s.match(/^(\d+)/);
  return m ? +m[1] : null;
}
function getChance(rank: number, cr: number | null): Chance | null {
  if (!cr) return null;
  const r = rank / cr;
  if (r <= 0.7) return "Very High";
  if (r <= 0.9) return "High";
  if (r <= 1.0) return "Moderate";
  if (r <= 1.15) return "Low";
  return null;
}

// ── Data ──────────────────────────────────────────────────────────
const SL: Record<string, string> = {
  "GENERAL MEDICINE": "General Medicine",
  "RADIO DIAGNOSIS": "Radiology",
  DERMATOLOGY: "Dermatology",
  PAEDIATRICS: "Paediatrics",
  OBG: "Obs & Gynaecology",
  "GENERAL SURGERY": "General Surgery",
  ORTHOPAEDICS: "Orthopaedics",
  ANAESTHESIOLOGY: "Anaesthesiology",
  PSYCHIATRY: "Psychiatry",
  PATHOLOGY: "Pathology",
  OPHTHALMOLOGY: "Ophthalmology",
  ENT: "ENT",
  MICROBIOLOGY: "Microbiology",
  PHARMACOLOGY: "Pharmacology",
  PHYSIOLOGY: "Physiology",
  ANATOMY: "Anatomy",
  BIOCHEMISTRY: "Biochemistry",
  "FORENSIC MEDICINE": "Forensic Medicine",
  SPM: "Comm. Medicine",
  "EMERGENCY MEDICINE": "Emergency Medicine",
  "RADIATION ONCOLOGY": "Radiation Oncology",
  "NUCLEAR MEDICINE": "Nuclear Medicine",
  TBRD: "TB & Resp. Diseases",
  PMR: "PMR",
  GERIATRICS: "Geriatrics",
  "HOSPITAL ADMINISTRATION": "Hospital Admin",
  "SPORTS MEDICINE": "Sports Medicine",
  "TROPICAL MEDICINE": "Tropical Medicine",
  "FAMILY MEDICINE": "Family Medicine",
  DDVL: "Dermatology (DDVL)",
  DMRD: "Radiology (DMRD)",
};

const CAT = [
  "GEN",
  "OBC",
  "EWS",
  "SC",
  "ST",
  "GEN-PwD",
  "OBC-PwD",
  "EWS-PwD",
  "SC-PwD",
  "ST-PwD",
];
const QUOT = ["AIQ", "DNB Post MBBS", "DU", "IP", "BHU", "AMU", "MNG", "NRI"];

const CM: Record<
  Chance,
  {
    bg: string;
    border: string;
    text: string;
    dot: string;
    bar: string;
    light: string;
  }
> = {
  "Very High": {
    bg: "#dcfce7",
    border: "#86efac",
    text: "#14532d",
    dot: "#16a34a",
    bar: "#22c55e",
    light: "#f0fdf4",
  },
  High: {
    bg: "#dbeafe",
    border: "#93c5fd",
    text: "#1e3a8a",
    dot: "#2563eb",
    bar: "#3b82f6",
    light: "#eff6ff",
  },
  Moderate: {
    bg: "#fef9c3",
    border: "#fde047",
    text: "#713f12",
    dot: "#ca8a04",
    bar: "#eab308",
    light: "#fefce8",
  },
  Low: {
    bg: "#fee2e2",
    border: "#fca5a5",
    text: "#7f1d1d",
    dot: "#dc2626",
    bar: "#ef4444",
    light: "#fef2f2",
  },
};

// ── Shared input style ────────────────────────────────────────────
const inp: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1.5px solid #e2e8f0",
  borderRadius: 8,
  padding: "9px 12px",
  fontSize: 13,
  color: "#0f172a",
  background: "#fff",
  outline: "none",
};
const sel: CSSProperties = { ...inp, cursor: "pointer", paddingRight: 28 };

// ── Tag atom ──────────────────────────────────────────────────────
const Tag: React.FC<{
  bg?: string;
  color?: string;
  children: React.ReactNode;
}> = ({ bg = "#f1f5f9", color = "#475569", children }) => (
  <span
    style={{
      display: "inline-block",
      background: bg,
      color,
      borderRadius: 4,
      padding: "1px 6px",
      fontSize: 10,
      fontWeight: 700,
      lineHeight: "16px",
      whiteSpace: "nowrap",
      flexShrink: 0,
    }}
  >
    {children}
  </span>
);

// ── Field label wrapper ───────────────────────────────────────────
const FL: React.FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, hint, children }) => (
  <div style={{ marginBottom: 11 }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#64748b",
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      {hint && <span style={{ fontSize: 10, color: "#94a3b8" }}>{hint}</span>}
    </div>
    {children}
  </div>
);

// ── Stat cell ─────────────────────────────────────────────────────
const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div
      style={{
        fontSize: 9,
        color: "#94a3b8",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.4,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>
      {value}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────
// CARD COMPONENTS  (no -webkit-line-clamp, no WebkitBoxOrient)
// ─────────────────────────────────────────────────────────────────

// Closing Rank card
const CRCard: React.FC<{ row: CRRow; idx: number; listView: boolean }> = ({
  row,
  idx,
  listView,
}) => {
  const m = row.chance ? CM[row.chance] : CM.Low;
  const pctMap: Record<Chance, number> = {
    "Very High": 90,
    High: 65,
    Moderate: 42,
    Low: 18,
  };
  const pct = row.chance ? pctMap[row.chance] : 8;
  const name = row["Institute"] || "—";
  const course = SL[row["Course"]] || row["Course"] || "—";

  return (
    <div
      style={{
        background: "#ffffff",
        border: `1.5px solid #e2e8f0`,
        borderTop: `3px solid ${m.dot}`,
        borderRadius: 12,
        padding: "13px 13px 11px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "transform .18s, box-shadow .18s",
        animation: `cIn .22s ease both`,
        animationDelay: `${Math.min(idx * 15, 200)}ms`,
        display: listView ? "flex" : "block",
        gap: listView ? 16 : 0,
        alignItems: listView ? "center" : "unset",
        cursor: "default",
        minHeight: listView ? "auto" : 170,
      }}
      onMouseEnter={(e) => {
        const d = e.currentTarget as HTMLDivElement;
        d.style.transform = "translateY(-2px)";
        d.style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        const d = e.currentTarget as HTMLDivElement;
        d.style.transform = "translateY(0)";
        d.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
      }}
    >
      {/* Top row: name + chance badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 3,
          flex: listView ? 1 : "unset",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: 13,
              color: "#0f172a",
              lineHeight: 1.35,
              marginBottom: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </div>
          <div
            style={{
              color: "#6366f1",
              fontWeight: 700,
              fontSize: 12,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: 7,
            }}
          >
            {course}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            <Tag bg="#eef2ff" color="#4338ca">
              {row["Quota"]}
            </Tag>
            <Tag bg="#f1f5f9" color="#475569">
              {row["Category"]}
            </Tag>
            {row["State"] && (
              <Tag bg="#f8fafc" color="#64748b">
                {row["State"]}
              </Tag>
            )}
            {row.dataYear && (
              <Tag
                bg={row.dataYear === "2025" ? "#dcfce7" : "#fef9c3"}
                color={row.dataYear === "2025" ? "#166534" : "#713f12"}
              >
                {row.dataYear}
              </Tag>
            )}
          </div>
        </div>
        {/* Chance pill */}
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <div
            style={{
              background: m.bg,
              border: `1px solid ${m.border}`,
              borderRadius: 7,
              padding: "3px 10px",
              color: m.text,
              fontWeight: 800,
              fontSize: 11,
              marginBottom: 3,
              whiteSpace: "nowrap",
            }}
          >
            {row.chance}
          </div>
          <div style={{ fontSize: 10, color: "#94a3b8", whiteSpace: "nowrap" }}>
            CR:{" "}
            <b style={{ color: "#334155" }}>
              {row.closingRank?.toLocaleString() ?? "—"}
            </b>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {!listView && (
        <div
          style={{
            background: "#f1f5f9",
            borderRadius: 99,
            height: 4,
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: m.bar,
              borderRadius: 99,
            }}
          />
        </div>
      )}

      {/* Stats row */}
      {!listView && (
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            borderTop: "1px solid #f1f5f9",
            paddingTop: 8,
          }}
        >
          {row["Fee"] && <Stat label="Fee" value={`₹${row["Fee"]}`} />}
          {row["Stipend Year 1"] && (
            <Stat label="Stipend" value={`₹${row["Stipend Year 1"]}`} />
          )}
          {row["Bond Years"] && row["Bond Years"] !== "0" && (
            <Stat label="Bond" value={`${row["Bond Years"]}yr`} />
          )}
          {row["Beds"] && <Stat label="Beds" value={row["Beds"]} />}
        </div>
      )}
    </div>
  );
};

// Allotment card
const AllotCard: React.FC<{ row: CSVRow; idx: number; listView: boolean }> = ({
  row,
  idx,
  listView,
}) => (
  <div
    style={{
      background: "#fff",
      border: "1.5px solid #e2e8f0",
      borderTop: "3px solid #6366f1",
      borderRadius: 12,
      padding: "13px 13px 11px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      transition: "transform .18s, box-shadow .18s",
      animation: `cIn .22s ease both`,
      animationDelay: `${Math.min(idx * 15, 200)}ms`,
      display: "block",
      minHeight: listView ? "auto" : 160,
    }}
    onMouseEnter={(e) => {
      const d = e.currentTarget as HTMLDivElement;
      d.style.transform = "translateY(-2px)";
      d.style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)";
    }}
    onMouseLeave={(e) => {
      const d = e.currentTarget as HTMLDivElement;
      d.style.transform = "translateY(0)";
      d.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 8,
        marginBottom: 3,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 13,
            color: "#0f172a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: 2,
          }}
        >
          {row["Institute"] || "—"}
        </div>
        <div
          style={{
            color: "#6366f1",
            fontWeight: 700,
            fontSize: 12,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: 7,
          }}
        >
          {SL[row["Course"]] || row["Course"] || "—"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Tag bg="#eef2ff" color="#4338ca">
            Rnd {row["Round"]}
          </Tag>
          <Tag bg="#f1f5f9" color="#475569">
            {row["Quota"]}
          </Tag>
          <Tag bg="#f1f5f9" color="#475569">
            {row["Category"]}
          </Tag>
          {row["State"] && (
            <Tag bg="#f8fafc" color="#64748b">
              {row["State"]}
            </Tag>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0, textAlign: "center" }}>
        <div
          style={{
            background: "#dcfce7",
            border: "1px solid #86efac",
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: "#14532d",
              lineHeight: 1,
            }}
          >
            #{parseInt(row["AI Rank"] || "0").toLocaleString()}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#16a34a",
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            RANK
          </div>
        </div>
      </div>
    </div>
    {!listView && (
      <div
        style={{
          display: "flex",
          gap: 12,
          borderTop: "1px solid #f1f5f9",
          paddingTop: 8,
          marginTop: 8,
        }}
      >
        {row["Fee"] && <Stat label="Fee" value={`₹${row["Fee"]}`} />}
        {row["Stipend Year 1"] && (
          <Stat label="Stipend" value={`₹${row["Stipend Year 1"]}`} />
        )}
        {row["Bond Years"] && row["Bond Years"] !== "0" && (
          <Stat label="Bond" value={`${row["Bond Years"]}yr`} />
        )}
      </div>
    )}
  </div>
);

// Seat card
const SeatCard: React.FC<{ row: CSVRow; idx: number }> = ({ row, idx }) => (
  <div
    style={{
      background: "#fff",
      border: "1.5px solid #e2e8f0",
      borderTop: "3px solid #8b5cf6",
      borderRadius: 12,
      padding: "13px 13px 11px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      transition: "transform .18s, box-shadow .18s",
      animation: `cIn .22s ease both`,
      animationDelay: `${Math.min(idx * 15, 200)}ms`,
    }}
    onMouseEnter={(e) => {
      const d = e.currentTarget as HTMLDivElement;
      d.style.transform = "translateY(-2px)";
      d.style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)";
    }}
    onMouseLeave={(e) => {
      const d = e.currentTarget as HTMLDivElement;
      d.style.transform = "translateY(0)";
      d.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 13,
            color: "#0f172a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: 2,
          }}
        >
          {row["College Name"] || "—"}
        </div>
        <div
          style={{
            color: "#7c3aed",
            fontWeight: 700,
            fontSize: 12,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: 8,
          }}
        >
          {SL[row["Course Name"]] || row["Course Name"] || "—"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Tag bg="#f5f3ff" color="#5b21b6">
            {row["State"]}
          </Tag>
          <Tag bg="#f1f5f9" color="#475569">
            {row["Management of college"]}
          </Tag>
        </div>
      </div>
      <div style={{ flexShrink: 0, textAlign: "center" }}>
        <div
          style={{
            background: "#f5f3ff",
            border: "1px solid #c4b5fd",
            borderRadius: 8,
            padding: "6px 14px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#4c1d95",
              lineHeight: 1,
            }}
          >
            {row["Seats"]}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#7c3aed",
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            SEATS
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Summary strip
const Strip: React.FC<{ results: AnyResult[]; mode: Mode }> = ({
  results,
  mode,
}) => {
  if (mode !== "closing" || !results.length) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 8,
        marginBottom: 14,
      }}
    >
      {(["Very High", "High", "Moderate", "Low"] as Chance[]).map((c) => {
        const m = CM[c];
        const n = results.filter((r) => (r as CRRow).chance === c).length;
        return (
          <div
            key={c}
            style={{
              background: m.light,
              border: `1px solid ${m.border}`,
              borderRadius: 10,
              padding: "10px 8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: m.dot,
                lineHeight: 1,
              }}
            >
              {n}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: m.text,
                marginTop: 2,
              }}
            >
              {c}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
const CollegePredictorPage: React.FC = () => {
  const [crData, setCrData] = useState<CSVRow[]>([]);
  const [allotData, setAllotData] = useState<CSVRow[]>([]);
  const [seatData, setSeatData] = useState<CSVRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataError, setDataError] = useState(false);

  const [mode, setMode] = useState<Mode>("closing");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("GEN");
  const [quota, setQuota] = useState("AIQ");
  const [specialty, setSpecialty] = useState("ALL");
  const [stateVal, setStateVal] = useState("ALL");

  const [results, setResults] = useState<AnyResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [qFilter, setQFilter] = useState("");
  const [cFilter, setCFilter] = useState<Chance | "ALL">("ALL");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [specialties, setSpecialties] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const loadData = useCallback(async () => {
    if (dataLoaded) return;
    setLoading(true);
    try {
      const [cr, al, se] = await Promise.all([
        fetch("/data/neetPgData/neetpg_2025_closing_rank.csv").then((r) =>
          r.text(),
        ),
        fetch("/data/allotments2025.csv").then((r) => r.text()),
        fetch("/data/seatmatrix2025.csv").then((r) => r.text()),
      ]);
      const crR = parseCSV(cr),
        alR = parseCSV(al),
        seR = parseCSV(se);
      setCrData(crR);
      setAllotData(alR);
      setSeatData(seR);
      setSpecialties(
        [
          ...new Set([
            ...crR.map((r) => r["Course"]),
            ...alR.map((r) => r["Course"]),
          ]),
        ]
          .filter(Boolean)
          .sort(),
      );
      setStates(
        [
          ...new Set([
            ...crR.map((r) => r["State"]),
            ...alR.map((r) => r["State"]),
          ]),
        ]
          .filter(Boolean)
          .sort(),
      );
      setDataLoaded(true);
    } catch {
      setDataError(true);
    } finally {
      setLoading(false);
    }
  }, [dataLoaded]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const seatSp = [...new Set(seatData.map((r) => r["Course Name"]))]
    .filter(Boolean)
    .sort();
  const seatSt = [...new Set(seatData.map((r) => r["State"]))]
    .filter(Boolean)
    .sort();

  function predict() {
    const r = parseInt(rank, 10);
    setSearching(true);
    setTimeout(() => {
      let res: AnyResult[] = [];

      if (mode === "closing") {
        res = crData
          .filter(
            (row) =>
              (quota === "ALL" || row["Quota"] === quota) &&
              (category === "ALL" || row["Category"] === category) &&
              (specialty === "ALL" || row["Course"] === specialty) &&
              (stateVal === "ALL" || row["State"] === stateVal),
          )
          .map((row): CRRow => {
            const c25 =
              parseRank(row["CR 2025 1"]) ??
              parseRank(row["CR 2025 2"]) ??
              parseRank(row["CR 2025 3"]);
            const c24 =
              parseRank(row["CR 2024 1"]) ??
              parseRank(row["CR 2024 2"]) ??
              parseRank(row["CR 2024 3"]);
            const closingRank = c25 ?? c24;
            return {
              ...row,
              closingRank,
              chance: getChance(r, closingRank),
              dataYear: c25 ? "2025" : c24 ? "2024" : null,
            };
          })
          .filter((row) => row.chance !== null)
          .sort((a, b) => {
            const o: Record<Chance, number> = {
              "Very High": 0,
              High: 1,
              Moderate: 2,
              Low: 3,
            };
            return (
              o[a.chance!] - o[b.chance!] ||
              (a.closingRank ?? 0) - (b.closingRank ?? 0)
            );
          });
      }

      if (mode === "allotments") {
        res = allotData.filter((row) => {
          if (quota !== "ALL" && row["Quota"] !== quota) return false;
          if (category !== "ALL" && row["Category"] !== category) return false;
          if (specialty !== "ALL" && row["Course"] !== specialty) return false;
          if (stateVal !== "ALL" && row["State"] !== stateVal) return false;
          const rr = parseInt(row["AI Rank"], 10);
          return rr && Math.abs(rr - r) / r <= 0.3;
        });
      }

      if (mode === "seats") {
        res = seatData.filter(
          (row) =>
            (specialty === "ALL" || row["Course Name"] === specialty) &&
            (stateVal === "ALL" || row["State"] === stateVal),
        );
      }

      setResults(res);
      setSearched(true);
      setCFilter("ALL");
      setQFilter("");
      setSearching(false);
    }, 80);
  }

  const shown = results.filter((r) => {
    const n = (r["Institute"] || r["College Name"] || "").toLowerCase();
    const c = (r["Course"] || r["Course Name"] || "").toLowerCase();
    const q = qFilter.toLowerCase();
    if (q && !n.includes(q) && !c.includes(q)) return false;
    if (
      mode === "closing" &&
      cFilter !== "ALL" &&
      (r as CRRow).chance !== cFilter
    )
      return false;
    return true;
  });

  const canPredict = !loading && (mode === "seats" || rank.trim() !== "");
  const listView = viewMode === "list";

  // ─────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f0f4ff",
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <style>{`
        @keyframes cIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        input:focus, select:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; outline: none; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 11px; }
        .card-list { display: flex; flex-direction: column; gap: 8px; }
      `}</style>

      {/* ── TOP BAR ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #3730a3 55%, #4f46e5 100%)",
          height: 54,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 12,
          flexShrink: 0,
          boxShadow: "0 2px 16px rgba(30,27,75,0.4)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            background: "rgba(255,255,255,0.13)",
            border: "none",
            borderRadius: 7,
            padding: "5px 13px",
            color: "#c7d2fe",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 5,
            flexShrink: 0,
          }}
        >
          ← Back
        </button>
        <div
          style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }}
        />
        <span style={{ fontSize: 16 }}>🎯</span>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>
          College Predictor
        </span>
        <span
          style={{
            background: "#10b981",
            color: "#fff",
            borderRadius: 5,
            padding: "1px 8px",
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          NEET PG 2025
        </span>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 20,
            color: "#a5b4fc",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {[
            ["28K+", "Records"],
            ["500+", "Colleges"],
            ["90+", "Specialties"],
          ].map(([v, l]) => (
            <span key={l}>
              <b style={{ color: "#fff" }}>{v}</b> {l}
            </span>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div
        style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}
      >
        {/* ══ LEFT PANEL ══ */}
        <div
          style={{
            width: 288,
            minWidth: 260,
            flexShrink: 0,
            background: "#fff",
            borderRight: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px 12px",
              background: "linear-gradient(135deg, #eef2ff, #f5f3ff)",
              borderBottom: "1px solid #e2e8f0",
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: "#1e1b4b" }}>
              🔍 Search Filters
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
              Set your criteria and predict
            </div>
          </div>

          <div style={{ padding: "14px 15px 0", flex: 1 }}>
            {/* Mode */}
            <FL label="Mode">
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[
                  {
                    id: "closing" as Mode,
                    icon: "🏥",
                    title: "Closing Ranks",
                    sub: "Which colleges can I get?",
                  },
                  {
                    id: "allotments" as Mode,
                    icon: "📋",
                    title: "Past Allotments",
                    sub: "Who got what near my rank?",
                  },
                  {
                    id: "seats" as Mode,
                    icon: "💺",
                    title: "Seat Matrix",
                    sub: "Available seats by specialty",
                  },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMode(m.id);
                      setSearched(false);
                      setResults([]);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "8px 11px",
                      borderRadius: 8,
                      cursor: "pointer",
                      textAlign: "left",
                      border:
                        mode === m.id
                          ? "2px solid #6366f1"
                          : "2px solid #e2e8f0",
                      background: mode === m.id ? "#eef2ff" : "#fafafa",
                      transition: "all .15s",
                    }}
                  >
                    <span style={{ fontSize: 15, flexShrink: 0 }}>
                      {m.icon}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 12,
                          color: mode === m.id ? "#4338ca" : "#334155",
                        }}
                      >
                        {m.title}
                      </div>
                      <div
                        style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}
                      >
                        {m.sub}
                      </div>
                    </div>
                    {mode === m.id && (
                      <span
                        style={{
                          color: "#6366f1",
                          fontSize: 13,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </FL>

            <div
              style={{ height: 1, background: "#f1f5f9", margin: "12px 0" }}
            />

            {mode !== "seats" && (
              <FL label="Your NEET PG Rank" hint="Required">
                <input
                  type="number"
                  min={1}
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="e.g. 5000"
                  style={inp}
                />
                {rank && (
                  <div
                    style={{
                      marginTop: 4,
                      padding: "3px 10px",
                      background: "#eff6ff",
                      borderRadius: 6,
                      fontSize: 11,
                      color: "#2563eb",
                      fontWeight: 700,
                    }}
                  >
                    Rank: <b>{parseInt(rank).toLocaleString()}</b>
                  </div>
                )}
              </FL>
            )}

            {mode !== "seats" && (
              <FL label="Category">
                <div style={{ position: "relative" }}>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={sel}
                  >
                    <option value="ALL">All Categories</option>
                    {CAT.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#94a3b8",
                      fontSize: 10,
                    }}
                  >
                    ▾
                  </span>
                </div>
              </FL>
            )}

            {mode !== "seats" && (
              <FL label="Quota">
                <div style={{ position: "relative" }}>
                  <select
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    style={sel}
                  >
                    <option value="ALL">All Quotas</option>
                    {QUOT.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#94a3b8",
                      fontSize: 10,
                    }}
                  >
                    ▾
                  </span>
                </div>
              </FL>
            )}

            <FL label="Specialty">
              <div style={{ position: "relative" }}>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  style={sel}
                >
                  <option value="ALL">All Specialties</option>
                  {(mode === "seats" ? seatSp : specialties).map((s) => (
                    <option key={s} value={s}>
                      {SL[s] || s}
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#94a3b8",
                    fontSize: 10,
                  }}
                >
                  ▾
                </span>
              </div>
            </FL>

            <FL label="State / UT">
              <div style={{ position: "relative" }}>
                <select
                  value={stateVal}
                  onChange={(e) => setStateVal(e.target.value)}
                  style={sel}
                >
                  <option value="ALL">All States</option>
                  {(mode === "seats" ? seatSt : states).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#94a3b8",
                    fontSize: 10,
                  }}
                >
                  ▾
                </span>
              </div>
            </FL>

            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 8,
                padding: "8px 10px",
                marginBottom: 6,
                display: "flex",
                gap: 7,
              }}
            >
              <span style={{ fontSize: 13, flexShrink: 0 }}>💡</span>
              <p
                style={{
                  margin: 0,
                  color: "#166534",
                  fontSize: 11,
                  lineHeight: 1.5,
                }}
              >
                {mode === "closing" &&
                  "2025 round data used; falls back to 2024 if unavailable."}
                {mode === "allotments" &&
                  "Shows allotments within ±30% of your rank."}
                {mode === "seats" && "Official 2025 seat matrix data."}
              </p>
            </div>
          </div>

          {/* Sticky bottom */}
          <div
            style={{
              padding: "12px 15px",
              borderTop: "1px solid #e2e8f0",
              background: "#fff",
              flexShrink: 0,
            }}
          >
            {dataError && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fca5a5",
                  borderRadius: 7,
                  padding: "7px 10px",
                  marginBottom: 8,
                  fontSize: 11,
                  color: "#991b1b",
                  fontWeight: 600,
                }}
              >
                ⚠️ CSV files not found. Check /public/data/
              </div>
            )}
            <button
              onClick={predict}
              disabled={!canPredict || searching}
              style={{
                width: "100%",
                padding: "12px",
                background: canPredict
                  ? "linear-gradient(135deg, #4338ca, #7c3aed)"
                  : "#e2e8f0",
                color: canPredict ? "#fff" : "#94a3b8",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 800,
                cursor: canPredict ? "pointer" : "not-allowed",
                boxShadow: canPredict
                  ? "0 4px 14px rgba(99,102,241,0.35)"
                  : "none",
                transition: "all .2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
              }}
            >
              {searching
                ? "⏳ Searching…"
                : loading
                  ? "⏳ Loading…"
                  : "🔍 Predict My Colleges"}
            </button>
            {searched && (
              <button
                onClick={() => {
                  setResults([]);
                  setSearched(false);
                  setRank("");
                  setCategory("GEN");
                  setQuota("AIQ");
                  setSpecialty("ALL");
                  setStateVal("ALL");
                }}
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "7px",
                  background: "transparent",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 8,
                  color: "#64748b",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ↺ Reset
              </button>
            )}
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Empty state */}
          {!searched && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px 24px",
                animation: "fadeUp .4s ease",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #eef2ff, #f5f3ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  marginBottom: 18,
                  boxShadow: "0 8px 30px rgba(99,102,241,0.15)",
                }}
              >
                🎯
              </div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#1e1b4b",
                  textAlign: "center",
                }}
              >
                Results Appear Here
              </h3>
              <p
                style={{
                  margin: "0 0 24px",
                  color: "#64748b",
                  fontSize: 13,
                  textAlign: "center",
                  maxWidth: 340,
                  lineHeight: 1.6,
                }}
              >
                Choose a mode, set your filters on the left, then click{" "}
                <b>Predict My Colleges</b>.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 10,
                  maxWidth: 440,
                  width: "100%",
                }}
              >
                {[
                  {
                    icon: "🏥",
                    title: "Closing Ranks",
                    desc: "See which colleges you qualify for",
                    m: "closing" as Mode,
                  },
                  {
                    icon: "📋",
                    title: "Allotments",
                    desc: "Real allotments near your rank",
                    m: "allotments" as Mode,
                  },
                  {
                    icon: "💺",
                    title: "Seat Matrix",
                    desc: "Available seats by specialty",
                    m: "seats" as Mode,
                  },
                ].map((c) => (
                  <div
                    key={c.m}
                    onClick={() => setMode(c.m)}
                    style={{
                      background: "#fff",
                      border:
                        mode === c.m
                          ? "2px solid #6366f1"
                          : "1.5px solid #e2e8f0",
                      borderRadius: 11,
                      padding: "13px 10px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all .15s",
                      boxShadow:
                        mode === c.m
                          ? "0 4px 14px rgba(99,102,241,0.15)"
                          : "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 5 }}>
                      {c.icon}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#1e1b4b",
                        marginBottom: 3,
                      }}
                    >
                      {c.title}
                    </div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 22,
                  marginTop: 32,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {[
                  ["4,200+", "Allotments"],
                  ["14,500+", "Closing Ranks"],
                  ["500+", "Colleges"],
                  ["90+", "Specialties"],
                ].map(([v, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 900,
                        color: "#4338ca",
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#94a3b8",
                        fontWeight: 600,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {searched && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                padding: "16px 18px 0",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  flexWrap: "wrap",
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 18, fontWeight: 800, color: "#1e1b4b" }}
                  >
                    {results.length > 0
                      ? `${results.length} colleges found`
                      : "No colleges found"}
                    {shown.length !== results.length && (
                      <span
                        style={{
                          fontSize: 13,
                          color: "#94a3b8",
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        · showing {shown.length}
                      </span>
                    )}
                  </div>
                  {rank && mode !== "seats" && (
                    <div
                      style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}
                    >
                      Rank{" "}
                      <b style={{ color: "#4338ca" }}>
                        {parseInt(rank).toLocaleString()}
                      </b>
                      {" · "}
                      <b>{category}</b>
                      {" · "}
                      <b>{quota}</b>
                      {stateVal !== "ALL" && (
                        <>
                          {" "}
                          · <b>{stateVal}</b>
                        </>
                      )}
                      {specialty !== "ALL" && (
                        <>
                          {" "}
                          · <b>{SL[specialty] || specialty}</b>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {/* View toggle */}
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <span
                    style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}
                  >
                    View:
                  </span>
                  {(["grid", "list"] as ViewMode[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setViewMode(v)}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 6,
                        cursor: "pointer",
                        border:
                          viewMode === v
                            ? "2px solid #6366f1"
                            : "1.5px solid #e2e8f0",
                        background: viewMode === v ? "#eef2ff" : "#fff",
                        color: viewMode === v ? "#4338ca" : "#64748b",
                        fontWeight: 700,
                        fontSize: 11,
                        transition: "all .15s",
                      }}
                    >
                      {v === "grid" ? "⊞ Grid" : "☰ List"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary strip */}
              <Strip results={results} mode={mode} />

              {/* Filter bar */}
              {results.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: 7,
                    marginBottom: 12,
                    flexWrap: "wrap",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <input
                    type="text"
                    value={qFilter}
                    onChange={(e) => setQFilter(e.target.value)}
                    placeholder="🔍 Filter by college or specialty…"
                    style={{
                      ...inp,
                      flex: "1 1 180px",
                      fontSize: 12,
                      padding: "7px 12px",
                    }}
                  />
                  {mode === "closing" && (
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {(
                        ["ALL", "Very High", "High", "Moderate", "Low"] as (
                          | Chance
                          | "ALL"
                        )[]
                      ).map((key) => {
                        const cm = key !== "ALL" ? CM[key as Chance] : null;
                        const active = cFilter === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setCFilter(key)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              cursor: "pointer",
                              border: `1.5px solid ${active ? (cm?.dot ?? "#6366f1") : "#e2e8f0"}`,
                              background: active
                                ? (cm?.light ?? "#eef2ff")
                                : "#fff",
                              color: active
                                ? (cm?.text ?? "#4338ca")
                                : "#64748b",
                              fontWeight: active ? 700 : 500,
                              fontSize: 11,
                              transition: "all .15s",
                            }}
                          >
                            {key === "ALL" ? "All" : key}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Empty filter */}
              {shown.length === 0 && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    padding: "40px 0",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🔭</div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#334155",
                      marginBottom: 4,
                    }}
                  >
                    No matches
                  </div>
                  <div style={{ fontSize: 12 }}>
                    Try adjusting filters or clearing the search box.
                  </div>
                </div>
              )}

              {/* THE GRID */}
              <div
                className={viewMode === "grid" ? "card-grid" : "card-list"}
                style={{
                  overflowY: "auto",
                  flex: 1,
                  paddingBottom: 20,
                  alignContent: "start",
                }}
              >
                {mode === "closing" &&
                  shown.map((r, i) => (
                    <CRCard
                      key={i}
                      row={r as CRRow}
                      idx={i}
                      listView={listView}
                    />
                  ))}
                {mode === "allotments" &&
                  shown.map((r, i) => (
                    <AllotCard
                      key={i}
                      row={r as CSVRow}
                      idx={i}
                      listView={listView}
                    />
                  ))}
                {mode === "seats" &&
                  shown.map((r, i) => (
                    <SeatCard key={i} row={r as CSVRow} idx={i} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegePredictorPage;
