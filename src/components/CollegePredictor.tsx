/**
 * CollegePredictor.tsx  — v2
 * ─────────────────────────────────────────────────────────────────
 * Drop-in section for MainContent.tsx
 *
 * USAGE:
 *   import CollegePredictor from "./CollegePredictor";
 *   <CollegePredictor />   ← place after the trend section
 *
 * CSVs must be served from /public/data/ :
 *   /public/data/allotments2025.csv
 *   /public/data/closingranks2025.csv
 *   /public/data/seatmatrix2025.csv
 * ─────────────────────────────────────────────────────────────────
 */

import React, {
  useState, useEffect, useRef, useCallback, CSSProperties,
} from "react";

// ── Types ──────────────────────────────────────────────────────────
type Mode   = "closing" | "allotments" | "seats";
type Chance = "Very High" | "High" | "Moderate" | "Low";

interface CSVRow { [key: string]: string; }

interface ClosingRankResult extends CSVRow {
  closingRank : number | null;
  chance      : Chance | null;
  dataYear    : "2025" | "2024" | null;
}

type AnyResult = ClosingRankResult | CSVRow;

// ── CSV helpers ───────────────────────────────────────────────────
function parseCSV(text: string): CSVRow[] {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = splitLine(lines[0]);
  return lines.slice(1).map((line) => {
    const vals = splitLine(line);
    const obj: CSVRow = {};
    headers.forEach((h, i) => { obj[h.trim()] = (vals[i] ?? "").trim(); });
    return obj;
  });
}
function splitLine(line: string): string[] {
  const out: string[] = [];
  let cur = ""; let q = false;
  for (const c of line) {
    if (c === '"') { q = !q; }
    else if (c === "," && !q) { out.push(cur); cur = ""; }
    else { cur += c; }
  }
  out.push(cur);
  return out;
}
function parseRank(s: string): number | null {
  if (!s || s === "-") return null;
  const m = s.match(/^(\d+)/);
  return m ? +m[1] : null;
}

// ── Constants ─────────────────────────────────────────────────────
const SPECIALTY_LABELS: Record<string, string> = {
  "GENERAL MEDICINE":        "General Medicine",
  "RADIO DIAGNOSIS":         "Radio-Diagnosis (Radiology)",
  "DERMATOLOGY":             "Dermatology (DVDL)",
  "PAEDIATRICS":             "Paediatrics",
  "OBG":                     "Obstetrics & Gynaecology",
  "GENERAL SURGERY":         "General Surgery",
  "ORTHOPAEDICS":            "Orthopaedics",
  "ANAESTHESIOLOGY":         "Anaesthesiology",
  "PSYCHIATRY":              "Psychiatry",
  "PATHOLOGY":               "Pathology",
  "OPHTHALMOLOGY":           "Ophthalmology",
  "ENT":                     "ENT (Otolaryngology)",
  "MICROBIOLOGY":            "Microbiology",
  "PHARMACOLOGY":            "Pharmacology",
  "PHYSIOLOGY":              "Physiology",
  "ANATOMY":                 "Anatomy",
  "BIOCHEMISTRY":            "Biochemistry",
  "FORENSIC MEDICINE":       "Forensic Medicine",
  "SPM":                     "Community Medicine / SPM",
  "EMERGENCY MEDICINE":      "Emergency Medicine",
  "RADIATION ONCOLOGY":      "Radiation Oncology",
  "NUCLEAR MEDICINE":        "Nuclear Medicine",
  "TBRD":                    "TB & Respiratory Diseases",
  "PMR":                     "Phys. Medicine & Rehabilitation",
  "GERIATRICS":              "Geriatrics",
  "HOSPITAL ADMINISTRATION": "Hospital Administration",
  "SPORTS MEDICINE":         "Sports Medicine",
  "TROPICAL MEDICINE":       "Tropical Medicine",
  "FAMILY MEDICINE":         "Family Medicine",
  "IHBT":                    "Immuno-Haematology & BT",
};

const CATEGORY_OPTIONS = ["GEN","OBC","EWS","SC","ST","GEN-PwD","OBC-PwD","EWS-PwD","SC-PwD","ST-PwD"];
const QUOTA_OPTIONS    = ["AIQ","DNB Post MBBS","DU","IP","BHU","AMU","MNG","NRI"];

const CHANCE_COLORS: Record<Chance, { bg:string; text:string; bar:string; badge:string }> = {
  "Very High": { bg:"#d1fae5", text:"#065f46", bar:"#10b981", badge:"🟢" },
  "High":      { bg:"#dbeafe", text:"#1e40af", bar:"#3b82f6", badge:"🔵" },
  "Moderate":  { bg:"#fef3c7", text:"#92400e", bar:"#f59e0b", badge:"🟡" },
  "Low":       { bg:"#fee2e2", text:"#991b1b", bar:"#ef4444", badge:"🔴" },
};

function getChance(rank: number, cr: number | null): Chance | null {
  if (!cr) return null;
  const r = rank / cr;
  if (r <= 0.70) return "Very High";
  if (r <= 0.90) return "High";
  if (r <= 1.00) return "Moderate";
  if (r <= 1.15) return "Low";
  return null;
}

// ── Shared input style ────────────────────────────────────────────
const IS: CSSProperties = {
  border:"2px solid #e5e7eb", borderRadius:10, padding:"11px 14px",
  fontSize:14, color:"#111827", outline:"none", width:"100%",
  boxSizing:"border-box", background:"#f9fafb", transition:"border-color .15s",
};

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

const FormField: React.FC<{ label:string; required?:boolean; children:React.ReactNode }> =
  ({ label, required, children }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:13, fontWeight:700, color:"#374151", letterSpacing:.2 }}>
        {label}{required && <span style={{ color:"#ef4444" }}> *</span>}
      </label>
      {children}
    </div>
  );

const Detail: React.FC<{ label:string; value:string }> = ({ label, value }) => (
  <div>
    <div style={{ fontSize:10, color:"#9ca3af", fontWeight:700, textTransform:"uppercase", letterSpacing:.5 }}>{label}</div>
    <div style={{ fontWeight:700, fontSize:13, color:"#374151" }}>{value}</div>
  </div>
);

const Pill: React.FC<{ bg:string; color:string; children:React.ReactNode }> = ({ bg, color, children }) => (
  <span style={{ background:bg, color, borderRadius:6, padding:"2px 9px", fontSize:11, fontWeight:700, display:"inline-block" }}>
    {children}
  </span>
);

// ── Closing-rank result card ──────────────────────────────────────
const CRCard: React.FC<{ row: ClosingRankResult }> = ({ row }) => {
  const c = row.chance ? CHANCE_COLORS[row.chance] : CHANCE_COLORS.Low;
  const bar: Record<Chance,string> = { "Very High":"92%", "High":"68%", "Moderate":"42%", "Low":"18%" };
  return (
    <div
      style={{
        background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:14,
        padding:"16px 18px", boxShadow:"0 1px 4px rgba(0,0,0,.06)", transition:"box-shadow .15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,.13)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.06)")}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:6 }}>
            <Pill bg="#eef2ff" color="#4338ca">{row["Quota"]} · {row["Category"]}</Pill>
            <Pill bg="#f3f4f6" color="#374151">{row["State"]}</Pill>
            {row.dataYear && (
              <Pill
                bg={row.dataYear==="2025"?"#d1fae5":"#fef3c7"}
                color={row.dataYear==="2025"?"#065f46":"#92400e"}
              >{row.dataYear} data</Pill>
            )}
          </div>
          <p style={{ margin:"0 0 3px", fontWeight:800, fontSize:15, color:"#111827", lineHeight:1.3 }}>
            {row["Institute"]}
          </p>
          <p style={{ margin:0, color:"#6366f1", fontWeight:600, fontSize:13 }}>
            {SPECIALTY_LABELS[row["Course"]] || row["Course"]}
          </p>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <span style={{ background:c.bg, color:c.text, borderRadius:8, padding:"5px 13px", fontSize:12, fontWeight:800 }}>
            {c.badge} {row.chance} Chance
          </span>
          <p style={{ margin:"6px 0 0", fontSize:12, color:"#9ca3af" }}>
            Closing Rank: <b style={{ color:"#111827" }}>{row.closingRank?.toLocaleString() ?? "—"}</b>
          </p>
        </div>
      </div>
      <div style={{ marginTop:10, background:"#f3f4f6", borderRadius:999, height:5, overflow:"hidden" }}>
        <div style={{ width: row.chance ? bar[row.chance] : "5%", height:"100%", background:c.bar, borderRadius:999, transition:"width .6s" }} />
      </div>
      {(row["Fee"] || row["Stipend Year 1"] || row["Beds"]) && (
        <div style={{ display:"flex", gap:20, marginTop:12, flexWrap:"wrap" }}>
          {row["Fee"]            && <Detail label="Fee"     value={`₹${row["Fee"]}`} />}
          {row["Stipend Year 1"] && <Detail label="Stipend" value={`₹${row["Stipend Year 1"]}/yr`} />}
          {row["Bond Years"] && row["Bond Years"]!=="0" && <Detail label="Bond" value={`${row["Bond Years"]} yr`} />}
          {row["Beds"]           && <Detail label="Beds"    value={row["Beds"]} />}
        </div>
      )}
    </div>
  );
};

const AllotCard: React.FC<{ row: CSVRow }> = ({ row }) => (
  <div style={{
    background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:14,
    padding:"14px 18px", boxShadow:"0 1px 4px rgba(0,0,0,.06)",
  }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:6 }}>
          <Pill bg="#eef2ff" color="#4338ca">Round {row["Round"]}</Pill>
          <Pill bg="#f3f4f6" color="#374151">{row["Quota"]} · {row["Category"]}</Pill>
          <Pill bg="#f3f4f6" color="#374151">{row["State"]}</Pill>
        </div>
        <p style={{ margin:"0 0 3px", fontWeight:800, fontSize:15, color:"#111827" }}>{row["Institute"]}</p>
        <p style={{ margin:0, color:"#6366f1", fontWeight:600, fontSize:13 }}>
          {SPECIALTY_LABELS[row["Course"]] || row["Course"]}
        </p>
      </div>
      <div style={{ background:"#d1fae5", color:"#065f46", borderRadius:10, padding:"8px 16px", fontWeight:800, fontSize:15, textAlign:"center", flexShrink:0 }}>
        #{parseInt(row["AI Rank"]).toLocaleString()}
      </div>
    </div>
    {(row["Fee"] || row["Stipend Year 1"]) && (
      <div style={{ display:"flex", gap:20, marginTop:12 }}>
        {row["Fee"]            && <Detail label="Fee"     value={`₹${row["Fee"]}`} />}
        {row["Stipend Year 1"] && <Detail label="Stipend" value={`₹${row["Stipend Year 1"]}/yr`} />}
        {row["Bond Years"] && row["Bond Years"]!=="0" && <Detail label="Bond" value={`${row["Bond Years"]} yr`} />}
      </div>
    )}
  </div>
);

const SeatCardItem: React.FC<{ row: CSVRow }> = ({ row }) => (
  <div style={{
    background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:14,
    padding:"14px 18px", boxShadow:"0 1px 4px rgba(0,0,0,.06)",
    display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12,
  }}>
    <div>
      <p style={{ margin:"0 0 3px", fontWeight:800, fontSize:15, color:"#111827" }}>{row["College Name"]}</p>
      <p style={{ margin:"0 0 4px", color:"#6366f1", fontWeight:600, fontSize:13 }}>
        {SPECIALTY_LABELS[row["Course Name"]] || row["Course Name"]}
      </p>
      <Pill bg="#f3f4f6" color="#374151">{row["State"]} · {row["Management of college"]}</Pill>
    </div>
    <div style={{ background:"#eef2ff", color:"#4338ca", borderRadius:12, padding:"10px 22px", textAlign:"center" }}>
      <div style={{ fontSize:24, fontWeight:900 }}>{row["Seats"]}</div>
      <div style={{ fontSize:11, fontWeight:700, color:"#6366f1" }}>Seats</div>
    </div>
  </div>
);

// ── Results panel ─────────────────────────────────────────────────
interface ResultsProps {
  results  : AnyResult[];
  mode     : Mode;
  rank     : string;
  category : string;
  quota    : string;
  onReset  : () => void;
}

const Results: React.FC<ResultsProps> = ({ results, mode, rank, category, quota, onReset }) => {
  const [filter, setFilter] = useState("");
  const [cf,     setCf]     = useState<Chance | "ALL">("ALL");

  const displayed = results.filter(r => {
    const name   = (r["Institute"] || r["College Name"] || "").toLowerCase();
    const course = (r["Course"]    || r["Course Name"]  || "").toLowerCase();
    const q = filter.toLowerCase();
    if (q && !name.includes(q) && !course.includes(q)) return false;
    if (mode === "closing" && cf !== "ALL" && (r as ClosingRankResult).chance !== cf) return false;
    return true;
  });

  const summary = mode === "closing"
    ? (["Very High","High","Moderate","Low"] as Chance[]).reduce(
        (acc, ch) => ({ ...acc, [ch]: results.filter(r => (r as ClosingRankResult).chance === ch).length }),
        {} as Record<Chance, number>
      )
    : null;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", minHeight:0 }}>
      {/* top bar */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:10, flexShrink:0 }}>
        <div>
          <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:"#111827" }}>
            {results.length > 0 ? `${results.length} results found` : "No results found"}
          </h3>
          {rank && (
            <p style={{ margin:"3px 0 0", fontSize:13, color:"#6b7280" }}>
              Rank <b style={{ color:"#111827" }}>{parseInt(rank).toLocaleString()}</b>
              {" · "}<b>{category}</b>{" · "}<b>{quota}</b>
            </p>
          )}
        </div>
        <button onClick={onReset} style={{
          background:"#eef2ff", border:"none", borderRadius:10,
          padding:"9px 20px", color:"#4338ca", fontWeight:700, cursor:"pointer", fontSize:13,
        }}>← Modify Search</button>
      </div>

      {/* chance pills */}
      {summary && results.length > 0 && (
        <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap", flexShrink:0 }}>
          {([
            ["ALL",       "All",          "#6b7280","#f3f4f6"],
            ["Very High", "🟢 Very High", "#059669","#d1fae5"],
            ["High",      "🔵 High",      "#2563eb","#dbeafe"],
            ["Moderate",  "🟡 Moderate",  "#d97706","#fef3c7"],
            ["Low",       "🔴 Low",       "#dc2626","#fee2e2"],
          ] as [string,string,string,string][]).map(([key,label,color,bg]) => (
            <button key={key} onClick={() => setCf(key as Chance|"ALL")} style={{
              background: cf===key ? bg : "#f9fafb",
              border:`2px solid ${cf===key ? color : "#e5e7eb"}`,
              borderRadius:999, padding:"5px 14px", cursor:"pointer",
              color: cf===key ? color : "#6b7280",
              fontWeight:700, fontSize:12, transition:"all .15s",
            }}>
              {label}{key!=="ALL" && summary ? ` (${summary[key as Chance]??0})` : ""}
            </button>
          ))}
        </div>
      )}

      {/* search filter */}
      <input
        type="text" value={filter} onChange={e=>setFilter(e.target.value)}
        placeholder="🔍 Filter by college or specialty…"
        style={{ ...IS, marginBottom:14, background:"#fff", flexShrink:0 }}
      />

      {/* empty state */}
      {displayed.length === 0 && (
        <div style={{ textAlign:"center", padding:"36px 0", color:"#9ca3af", flexShrink:0 }}>
          <div style={{ fontSize:44, marginBottom:10 }}>🔭</div>
          <p style={{ fontWeight:700, fontSize:15, color:"#374151", margin:"0 0 4px" }}>No colleges match your criteria</p>
          <p style={{ fontSize:13, margin:0 }}>Try a different quota, category, or widen your specialty / state selection.</p>
        </div>
      )}

      {/* scrollable card list */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, overflowY:"auto", flex:1, paddingRight:4 }}>
        {mode==="closing"    && displayed.map((r,i)=><CRCard       key={i} row={r as ClosingRankResult} />)}
        {mode==="allotments" && displayed.map((r,i)=><AllotCard    key={i} row={r as CSVRow} />)}
        {mode==="seats"      && displayed.map((r,i)=><SeatCardItem key={i} row={r as CSVRow} />)}
      </div>
    </div>
  );
};

// ── Hero banner ───────────────────────────────────────────────────
const Hero: React.FC<{ onOpen:()=>void }> = ({ onOpen }) => (
  <div style={{
    background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4338ca 70%,#6366f1 100%)",
    borderRadius:24, position:"relative", overflow:"hidden",
  }}>
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {([
        {w:320,h:320,top:-80,   left:-80,   c:"rgba(99,102,241,.3)",  d:"0s"},
        {w:240,h:240,top:"50%", right:-60,  c:"rgba(139,92,246,.25)", d:"2s"},
        {w:180,h:180,bottom:-40,left:"40%", c:"rgba(167,139,250,.2)", d:"4s"},
      ] as any[]).map((b,i)=>(
        <div key={i} style={{
          position:"absolute", width:b.w, height:b.h,
          top:b.top, left:b.left, right:b.right, bottom:b.bottom,
          background:b.c, borderRadius:"50%", filter:"blur(60px)",
          animation:"_blob 6s ease-in-out infinite", animationDelay:b.d,
        }}/>
      ))}
    </div>
    <div style={{
      position:"absolute",inset:0,pointerEvents:"none",
      backgroundImage:"radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)",
      backgroundSize:"32px 32px",
    }}/>
    <div style={{ position:"relative", padding:"40px 32px 48px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
      <div style={{
        display:"inline-flex", alignItems:"center", gap:8,
        background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)",
        border:"1px solid rgba(255,255,255,.2)",
        borderRadius:999, padding:"6px 16px", marginBottom:24,
        color:"#c7d2fe", fontSize:13, fontWeight:600,
      }}>
        <span style={{ fontSize:16 }}>🎯</span> NEET PG 2025 — Live Data
        <span style={{ background:"#10b981", color:"#fff", borderRadius:999, padding:"2px 8px", fontSize:11 }}>NEW</span>
      </div>
      <h2 style={{
        fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:"#fff",
        lineHeight:1.15, marginBottom:16, maxWidth:700,
        fontFamily:"'Sora','DM Sans',sans-serif",
        textShadow:"0 2px 20px rgba(0,0,0,.3)",
      }}>
        Predict Your <span style={{ color:"#a5b4fc" }}>Dream College</span><br/>
        With Your NEET PG Rank
      </h2>
      <p style={{ color:"#c7d2fe", fontSize:16, maxWidth:560, marginBottom:32, lineHeight:1.6 }}>
        Instantly discover which colleges &amp; specialties you can get — based on 2025 actual
        allotment &amp; closing rank data from 28,000+ records.
      </p>
      <div style={{ display:"flex", gap:28, marginBottom:36, flexWrap:"wrap", justifyContent:"center" }}>
        {[
          { label:"Allotment Records",    value:"4,200+"  },
          { label:"Closing Rank Entries", value:"14,500+" },
          { label:"Colleges Covered",     value:"500+"    },
          { label:"Specialties",          value:"90+"     },
        ].map(s=>(
          <div key={s.label} style={{ textAlign:"center" }}>
            <div style={{ fontSize:22, fontWeight:800, color:"#fff" }}>{s.value}</div>
            <div style={{ fontSize:12, color:"#a5b4fc" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <button
        onClick={onOpen}
        style={{
          background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff",
          border:"none", borderRadius:16, padding:"16px 52px",
          fontSize:18, fontWeight:800, cursor:"pointer",
          boxShadow:"0 8px 32px rgba(239,68,68,.4)",
          display:"flex", alignItems:"center", gap:10, transition:"transform .2s",
        }}
        onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)"}}
        onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}
      >
        <span>🔍</span> Predict My College Now
      </button>
      <p style={{ color:"#818cf8", fontSize:12, marginTop:12 }}>Free · No login required · Instant results</p>
    </div>
    <style>{`@keyframes _blob{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}`}</style>
  </div>
);

// ─────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────
const CollegePredictor: React.FC = () => {
  const [open,        setOpen]        = useState(false);
  const [step,        setStep]        = useState<1|2>(1);
  const [rank,        setRank]        = useState("");
  const [category,    setCategory]    = useState("GEN");
  const [quota,       setQuota]       = useState("AIQ");
  const [specialty,   setSpecialty]   = useState("ALL");
  const [stateVal,    setStateVal]    = useState("ALL");
  const [mode,        setMode]        = useState<Mode>("closing");
  const [crData,      setCrData]      = useState<CSVRow[]>([]);
  const [allotData,   setAllotData]   = useState<CSVRow[]>([]);
  const [seatData,    setSeatData]    = useState<CSVRow[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [dataLoaded,  setDataLoaded]  = useState(false);
  const [results,     setResults]     = useState<AnyResult[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [states,      setStates]      = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // load CSVs once on first open
  const loadData = useCallback(async () => {
    if (dataLoaded) return;
    setLoading(true);
    try {
      const [cr, allot, seat] = await Promise.all([
        fetch("/data/closingranks2025.csv").then(r=>r.text()),
        fetch("/data/allotments2025.csv").then(r=>r.text()),
        fetch("/data/seatmatrix2025.csv").then(r=>r.text()),
      ]);
      const crR = parseCSV(cr); const allotR = parseCSV(allot); const seatR = parseCSV(seat);
      setCrData(crR); setAllotData(allotR); setSeatData(seatR);
      setSpecialties([...new Set([...crR.map(r=>r["Course"]),...allotR.map(r=>r["Course"])])].filter(Boolean).sort());
      setStates([...new Set([...crR.map(r=>r["State"]),...allotR.map(r=>r["State"])])].filter(Boolean).sort());
      setDataLoaded(true);
    } catch(e) { console.error("CSV load failed",e); }
    finally    { setLoading(false); }
  }, [dataLoaded]);

  useEffect(() => { if (open) loadData(); }, [open, loadData]);

  useEffect(()=>{
    const h = (e:MouseEvent) => { if (modalRef.current && !modalRef.current.contains(e.target as Node)) setOpen(false); };
    if (open) document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[open]);

  useEffect(()=>{
    const h = (e:KeyboardEvent) => { if (e.key==="Escape") setOpen(false); };
    if (open) document.addEventListener("keydown",h);
    return ()=>document.removeEventListener("keydown",h);
  },[open]);

  function predict() {
    const r = parseInt(rank, 10);
    let res: AnyResult[] = [];

    if (mode === "closing") {
      res = crData
        .filter(row =>
          (quota    ==="ALL" || row["Quota"]   ===quota)    &&
          (category ==="ALL" || row["Category"]===category) &&
          (specialty==="ALL" || row["Course"]  ===specialty)&&
          (stateVal ==="ALL" || row["State"]   ===stateVal)
        )
        .map((row): ClosingRankResult => {
          const cr25 = parseRank(row["CR 2025 1"]) ?? parseRank(row["CR 2025 2"]) ?? parseRank(row["CR 2025 3"]);
          const cr24 = parseRank(row["CR 2024 1"]) ?? parseRank(row["CR 2024 2"]) ?? parseRank(row["CR 2024 3"]);
          const closingRank = cr25 ?? cr24;
          return { ...row, closingRank, chance: getChance(r, closingRank), dataYear: cr25?"2025":cr24?"2024":null };
        })
        .filter(row => row.chance !== null)
        .sort((a,b) => {
          const ord: Record<Chance,number> = { "Very High":0, High:1, Moderate:2, Low:3 };
          return (ord[a.chance!] - ord[b.chance!]) || ((a.closingRank??0)-(b.closingRank??0));
        })
        .slice(0, 80);
    }

    if (mode === "allotments") {
      res = allotData.filter(row => {
        if (quota    !=="ALL" && row["Quota"]   !==quota)    return false;
        if (category !=="ALL" && row["Category"]!==category) return false;
        if (specialty!=="ALL" && row["Course"]  !==specialty)return false;
        if (stateVal !=="ALL" && row["State"]   !==stateVal) return false;
        const rr = parseInt(row["AI Rank"],10);
        return rr && Math.abs(rr-r)/r <= 0.3;
      }).slice(0, 80);
    }

    if (mode === "seats") {
      res = seatData.filter(row =>
        (specialty==="ALL" || row["Course Name"]===specialty) &&
        (stateVal ==="ALL" || row["State"]      ===stateVal)
      ).slice(0, 100);
    }

    setResults(res);
    setStep(2);
  }

  const seatSpecialties = [...new Set(seatData.map(r=>r["Course Name"]))].filter(Boolean).sort();
  const seatStates      = [...new Set(seatData.map(r=>r["State"]))].filter(Boolean).sort();
  // ── FIX: button is enabled as soon as rank has any non-empty value ──
  const canPredict = !loading && (mode === "seats" || rank.trim() !== "");

  return (
    <>
      <Hero onOpen={() => setOpen(true)} />

      {open && (
        <div style={{
          position:"fixed", inset:0, zIndex:9999,
          background:"rgba(15,15,40,.72)", backdropFilter:"blur(8px)",
          display:"flex", alignItems:"flex-start", justifyContent:"center",
          padding:"16px 12px", overflowY:"auto",
        }}>
          <div
            ref={modalRef}
            style={{
              background:"#fff", borderRadius:24, width:"100%", maxWidth:960,
              boxShadow:"0 32px 90px rgba(0,0,0,.35)",
              display:"flex", flexDirection:"column",
              /* tall enough to see results without shrinking */
              maxHeight:"calc(100vh - 32px)", overflow:"hidden",
            }}
          >
            {/* header */}
            <div style={{
              background:"linear-gradient(135deg,#1e1b4b 0%,#4338ca 100%)",
              padding:"22px 28px", display:"flex", alignItems:"center", justifyContent:"space-between",
              flexShrink:0,
            }}>
              <div>
                <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0 }}>
                  🎯 College Predictor — NEET PG 2025
                </h2>
                <p style={{ color:"#a5b4fc", fontSize:13, margin:"4px 0 0" }}>
                  Real data · 28,000+ records · Instant results
                </p>
              </div>
              <button onClick={()=>setOpen(false)} style={{
                background:"rgba(255,255,255,.15)", border:"none", borderRadius:12,
                width:40, height:40, cursor:"pointer", color:"#fff",
                fontSize:22, display:"flex", alignItems:"center", justifyContent:"center",
              }}>×</button>
            </div>

            {/* body — scrolls if step 2 overflows */}
            <div style={{
              padding:"28px 28px 32px",
              flex:1,
              display:"flex", flexDirection:"column",
              overflowY: step===2 ? "hidden" : "auto",
            }}>
              {step === 1 && (
                <>
                  {/* mode tabs */}
                  <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
                    {([
                      {id:"closing",    label:"🏥 Closing Rank Predictor"},
                      {id:"allotments", label:"📋 Past Allotments"},
                      {id:"seats",      label:"💺 Seat Matrix"},
                    ] as {id:Mode;label:string}[]).map(m=>(
                      <button key={m.id} onClick={()=>setMode(m.id)} style={{
                        padding:"11px 20px", borderRadius:12, cursor:"pointer",
                        border: mode===m.id ? "2px solid #4338ca" : "2px solid #e5e7eb",
                        background: mode===m.id ? "#eef2ff" : "#f9fafb",
                        color: mode===m.id ? "#4338ca" : "#6b7280",
                        fontWeight:700, fontSize:13, flex:"1 1 160px", textAlign:"center",
                      }}>{m.label}</button>
                    ))}
                  </div>

                  {/* filters */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:16, marginBottom:22 }}>
                    {mode !== "seats" && (
                      <FormField label="Your NEET PG Rank" required>
                        <input
                          type="number" min={1} value={rank}
                          onChange={e => setRank(e.target.value)}
                          placeholder="e.g. 5000" style={IS}
                          onFocus={e  => { e.currentTarget.style.borderColor="#6366f1"; }}
                          onBlur={e   => { e.currentTarget.style.borderColor="#e5e7eb"; }}
                        />
                      </FormField>
                    )}
                    {mode !== "seats" && (
                      <FormField label="Category">
                        <select value={category} onChange={e=>setCategory(e.target.value)} style={IS}>
                          <option value="ALL">All Categories</option>
                          {CATEGORY_OPTIONS.map(c=><option key={c} value={c}>{c}</option>)}
                        </select>
                      </FormField>
                    )}
                    {mode !== "seats" && (
                      <FormField label="Quota">
                        <select value={quota} onChange={e=>setQuota(e.target.value)} style={IS}>
                          <option value="ALL">All Quotas</option>
                          {QUOTA_OPTIONS.map(q=><option key={q} value={q}>{q}</option>)}
                        </select>
                      </FormField>
                    )}
                    <FormField label="Specialty / Course">
                      <select value={specialty} onChange={e=>setSpecialty(e.target.value)} style={IS}>
                        <option value="ALL">All Specialties</option>
                        {(mode==="seats" ? seatSpecialties : specialties).map(s=>(
                          <option key={s} value={s}>{SPECIALTY_LABELS[s]||s}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="State / UT">
                      <select value={stateVal} onChange={e=>setStateVal(e.target.value)} style={IS}>
                        <option value="ALL">All States</option>
                        {(mode==="seats" ? seatStates : states).map(s=>(
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  {/* info */}
                  <div style={{
                    background:"#f0fdf4", border:"1px solid #bbf7d0",
                    borderRadius:12, padding:"12px 16px", marginBottom:22,
                    display:"flex", alignItems:"flex-start", gap:10,
                  }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>💡</span>
                    <p style={{ color:"#166534", fontSize:13, margin:0, lineHeight:1.55 }}>
                      {mode==="closing"    && "We compare your rank against actual 2025 closing ranks (rounds 1–3). Falls back to 2024 when 2025 data is unavailable."}
                      {mode==="allotments" && "Shows real allotments made to candidates within ±30% of your rank across all 2025 rounds."}
                      {mode==="seats"      && "Browse total seats available by specialty and state from the official 2025 seat matrix."}
                    </p>
                  </div>

                  {loading && (
                    <p style={{ textAlign:"center", color:"#6366f1", fontWeight:700, fontSize:14, margin:"0 0 16px" }}>
                      ⏳ Loading 28,000+ records…
                    </p>
                  )}

                  {/* ── predict button — active as soon as rank is typed ── */}
                  <button
                    onClick={predict}
                    disabled={!canPredict}
                    style={{
                      width:"100%",
                      background: canPredict
                        ? "linear-gradient(135deg,#4338ca,#7c3aed)"
                        : "#e5e7eb",
                      color: canPredict ? "#fff" : "#9ca3af",
                      border:"none", borderRadius:14, padding:"17px",
                      fontSize:17, fontWeight:800,
                      cursor: canPredict ? "pointer" : "not-allowed",
                      boxShadow: canPredict ? "0 6px 24px rgba(99,102,241,.35)" : "none",
                      transition:"all .2s", letterSpacing:.3,
                    }}
                    onMouseEnter={e=>{ if(canPredict) e.currentTarget.style.transform="translateY(-2px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; }}
                  >
                    {loading ? "⏳ Loading data…" : "🔍 Predict My Colleges"}
                  </button>
                </>
              )}

              {step === 2 && (
                <Results
                  results={results} mode={mode} rank={rank}
                  category={category} quota={quota}
                  onReset={() => { setStep(1); setResults([]); }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollegePredictor;