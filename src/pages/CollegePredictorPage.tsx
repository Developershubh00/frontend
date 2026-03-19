// /**
//  * CollegePredictorPage.tsx
//  * ─────────────────────────────────────────────────────────────────
//  * Full-page college predictor — left panel filters, right panel results.
//  *
//  * USAGE in your router (e.g. App.tsx):
//  *   import CollegePredictorPage from "./CollegePredictorPage";
//  *   <Route path="/predictor" element={<CollegePredictorPage />} />
//  *
//  * Then in MainContent, replace the old <CollegePredictor /> hero with
//  * a simple button/card that does:
//  *   window.location.href = "/predictor"   OR   navigate("/predictor")
//  *
//  * CSVs must be served from /public/data/ :
//  *   /public/data/allotments2025.csv
//  *   /public/data/closingranks2025.csv
//  *   /public/data/seatmatrix2025.csv
//  * ─────────────────────────────────────────────────────────────────
//  */

// import React, {
//   useState, useEffect, useCallback, useRef, CSSProperties,
// } from "react";

// // ── Types ──────────────────────────────────────────────────────────
// type Mode   = "closing" | "allotments" | "seats";
// type Chance = "Very High" | "High" | "Moderate" | "Low";

// interface CSVRow { [key: string]: string; }
// interface ClosingRankResult extends CSVRow {
//   closingRank : number | null;
//   chance      : Chance | null;
//   dataYear    : "2025" | "2024" | null;
// }
// type AnyResult = ClosingRankResult | CSVRow;

// // ── CSV helpers ───────────────────────────────────────────────────
// function parseCSV(text: string): CSVRow[] {
//   const lines = text.split(/\r?\n/).filter(Boolean);
//   if (lines.length < 2) return [];
//   const headers = splitLine(lines[0]);
//   return lines.slice(1).map(line => {
//     const vals = splitLine(line);
//     const obj: CSVRow = {};
//     headers.forEach((h, i) => { obj[h.trim()] = (vals[i] ?? "").trim(); });
//     return obj;
//   });
// }
// function splitLine(line: string): string[] {
//   const out: string[] = []; let cur = ""; let q = false;
//   for (const c of line) {
//     if (c === '"') { q = !q; }
//     else if (c === "," && !q) { out.push(cur); cur = ""; }
//     else { cur += c; }
//   }
//   out.push(cur); return out;
// }
// function parseRank(s: string): number | null {
//   if (!s || s === "-") return null;
//   const m = s.match(/^(\d+)/); return m ? +m[1] : null;
// }

// // ── Constants ─────────────────────────────────────────────────────
// const SPECIALTY_LABELS: Record<string, string> = {
//   "GENERAL MEDICINE":"General Medicine","RADIO DIAGNOSIS":"Radiology",
//   "DERMATOLOGY":"Dermatology","PAEDIATRICS":"Paediatrics","OBG":"Obs & Gynaecology",
//   "GENERAL SURGERY":"General Surgery","ORTHOPAEDICS":"Orthopaedics",
//   "ANAESTHESIOLOGY":"Anaesthesiology","PSYCHIATRY":"Psychiatry","PATHOLOGY":"Pathology",
//   "OPHTHALMOLOGY":"Ophthalmology","ENT":"ENT","MICROBIOLOGY":"Microbiology",
//   "PHARMACOLOGY":"Pharmacology","PHYSIOLOGY":"Physiology","ANATOMY":"Anatomy",
//   "BIOCHEMISTRY":"Biochemistry","FORENSIC MEDICINE":"Forensic Medicine",
//   "SPM":"Community Medicine/SPM","EMERGENCY MEDICINE":"Emergency Medicine",
//   "RADIATION ONCOLOGY":"Radiation Oncology","NUCLEAR MEDICINE":"Nuclear Medicine",
//   "TBRD":"TB & Resp. Diseases","PMR":"PMR","GERIATRICS":"Geriatrics",
//   "HOSPITAL ADMINISTRATION":"Hospital Admin","SPORTS MEDICINE":"Sports Medicine",
//   "TROPICAL MEDICINE":"Tropical Medicine","FAMILY MEDICINE":"Family Medicine",
// };

// // const CATEGORY_OPTIONS = ["GEN","OBC","EWS","SC","ST","GEN-PwD","OBC-PwD","EWS-PwD","SC-PwD","ST-PwD"];
// const CATEGORY_OPTIONS = ["GEN","OBC","EWS","SC","ST","GEN-PwD"];
// const QUOTA_OPTIONS    = ["AIQ","DNB Post MBBS","DU","IP","BHU","AMU","MNG","NRI"];

// const CHANCE_META: Record<Chance,{bg:string;border:string;text:string;dot:string;bar:string;label:string}> = {
//   "Very High":{ bg:"#f0fdf4", border:"#86efac", text:"#14532d", dot:"#16a34a", bar:"#22c55e",  label:"Very High" },
//   "High":     { bg:"#eff6ff", border:"#93c5fd", text:"#1e3a8a", dot:"#2563eb", bar:"#3b82f6",  label:"High"      },
//   "Moderate": { bg:"#fffbeb", border:"#fcd34d", text:"#78350f", dot:"#d97706", bar:"#f59e0b",  label:"Moderate"  },
//   "Low":      { bg:"#fef2f2", border:"#fca5a5", text:"#7f1d1d", dot:"#dc2626", bar:"#ef4444",  label:"Low"       },
// };

// function getChance(rank: number, cr: number | null): Chance | null {
//   if (!cr) return null;
//   const r = rank / cr;
//   if (r <= 0.70) return "Very High";
//   if (r <= 0.90) return "High";
//   if (r <= 1.00) return "Moderate";
//   if (r <= 1.15) return "Low";
//   return null;
// }

// // ─────────────────────────────────────────────────────────────────
// // Small reusable atoms
// // ─────────────────────────────────────────────────────────────────
// const Tag: React.FC<{ color?: string; bg?: string; children: React.ReactNode }> = ({
//   color = "#475569", bg = "#f1f5f9", children,
// }) => (
//   <span style={{
//     display: "inline-block", background: bg, color,
//     borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 700,
//     lineHeight: 1.6, whiteSpace: "nowrap",
//   }}>{children}</span>
// );

// const Divider: React.FC = () => (
//   <div style={{ height: 1, background: "#e2e8f0", margin: "18px 0" }} />
// );

// // Label + children field wrapper
// const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({
//   label, hint, children,
// }) => (
//   <div style={{ marginBottom: 14 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//       <label style={{ fontSize: 12, fontWeight: 700, color: "#334155", letterSpacing: .3, textTransform: "uppercase" }}>
//         {label}
//       </label>
//       {hint && <span style={{ fontSize: 11, color: "#94a3b8" }}>{hint}</span>}
//     </div>
//     {children}
//   </div>
// );

// const inputCss: CSSProperties = {
//   width: "100%", boxSizing: "border-box",
//   border: "1.5px solid #e2e8f0", borderRadius: 10,
//   padding: "10px 12px", fontSize: 14, color: "#0f172a",
//   background: "#fff", outline: "none", transition: "border-color .15s",
// };

// const selectCss: CSSProperties = { ...inputCss, appearance: "none", cursor: "pointer" };

// // ─────────────────────────────────────────────────────────────────
// // Result Cards
// // ─────────────────────────────────────────────────────────────────
// const CRCard: React.FC<{ row: ClosingRankResult; idx: number }> = ({ row, idx }) => {
//   const m = row.chance ? CHANCE_META[row.chance] : CHANCE_META.Low;
//   const pct: Record<Chance, number> = { "Very High": 92, High: 68, Moderate: 44, Low: 18 };
//   const p = row.chance ? pct[row.chance] : 10;

//   return (
//     <div style={{
//       background: "#fff", border: `1.5px solid #e2e8f0`,
//       borderLeft: `4px solid ${m.dot}`,
//       borderRadius: 12, padding: "16px 18px",
//       boxShadow: "0 1px 3px rgba(0,0,0,.06)",
//       transition: "all .18s",
//       animation: `cardIn .3s ease both`,
//       animationDelay: `${Math.min(idx * 30, 300)}ms`,
//     }}
//       onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)"; }}
//       onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <p style={{ margin: "0 0 5px", fontWeight: 800, fontSize: 14, color: "#0f172a", lineHeight: 1.35 }}>
//             {row["Institute"]}
//           </p>
//           <p style={{ margin: "0 0 8px", color: "#6366f1", fontWeight: 600, fontSize: 13 }}>
//             {SPECIALTY_LABELS[row["Course"]] || row["Course"]}
//           </p>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
//             <Tag bg="#eef2ff" color="#4338ca">{row["Quota"]}</Tag>
//             <Tag bg="#f8fafc" color="#475569">{row["Category"]}</Tag>
//             <Tag bg="#f8fafc" color="#475569">{row["State"]}</Tag>
//             {row.dataYear && (
//               <Tag
//                 bg={row.dataYear === "2025" ? "#f0fdf4" : "#fefce8"}
//                 color={row.dataYear === "2025" ? "#166534" : "#854d0e"}
//               >{row.dataYear} data</Tag>
//             )}
//           </div>
//         </div>
//         {/* Chance badge */}
//         <div style={{ textAlign: "right", flexShrink: 0 }}>
//           <div style={{
//             background: m.bg, border: `1px solid ${m.border}`,
//             borderRadius: 8, padding: "5px 12px",
//             color: m.text, fontWeight: 800, fontSize: 12, marginBottom: 4,
//           }}>{m.label}</div>
//           <div style={{ fontSize: 11, color: "#94a3b8" }}>
//             CR: <b style={{ color: "#334155" }}>{row.closingRank?.toLocaleString() ?? "—"}</b>
//           </div>
//         </div>
//       </div>

//       {/* Chance bar */}
//       <div style={{ marginTop: 10, background: "#f1f5f9", borderRadius: 999, height: 4, overflow: "hidden" }}>
//         <div style={{
//           width: `${p}%`, height: "100%", background: m.bar,
//           borderRadius: 999, transition: "width .7s ease",
//         }} />
//       </div>

//       {/* Extra info */}
//       {(row["Fee"] || row["Stipend Year 1"]) && (
//         <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
//           {row["Fee"] && <MiniStat label="Fee" value={`₹${row["Fee"]}`} />}
//           {row["Stipend Year 1"] && <MiniStat label="Stipend/yr" value={`₹${row["Stipend Year 1"]}`} />}
//           {row["Bond Years"] && row["Bond Years"] !== "0" && <MiniStat label="Bond" value={`${row["Bond Years"]} yr`} />}
//           {row["Beds"] && <MiniStat label="Beds" value={row["Beds"]} />}
//         </div>
//       )}
//     </div>
//   );
// };

// const AllotCard: React.FC<{ row: CSVRow; idx: number }> = ({ row, idx }) => (
//   <div style={{
//     background: "#fff", border: "1.5px solid #e2e8f0",
//     borderLeft: "4px solid #6366f1",
//     borderRadius: 12, padding: "16px 18px",
//     boxShadow: "0 1px 3px rgba(0,0,0,.06)",
//     animation: `cardIn .3s ease both`,
//     animationDelay: `${Math.min(idx * 30, 300)}ms`,
//     transition: "all .18s",
//   }}
//     onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,.1)"; }}
//     onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,.06)"; }}
//   >
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p style={{ margin: "0 0 5px", fontWeight: 800, fontSize: 14, color: "#0f172a", lineHeight: 1.35 }}>
//           {row["Institute"]}
//         </p>
//         <p style={{ margin: "0 0 8px", color: "#6366f1", fontWeight: 600, fontSize: 13 }}>
//           {SPECIALTY_LABELS[row["Course"]] || row["Course"]}
//         </p>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
//           <Tag bg="#eef2ff" color="#4338ca">Round {row["Round"]}</Tag>
//           <Tag bg="#f8fafc" color="#475569">{row["Quota"]} · {row["Category"]}</Tag>
//           <Tag bg="#f8fafc" color="#475569">{row["State"]}</Tag>
//         </div>
//       </div>
//       <div style={{
//         background: "#f0fdf4", border: "1px solid #86efac",
//         borderRadius: 10, padding: "8px 16px", textAlign: "center", flexShrink: 0,
//       }}>
//         <div style={{ fontSize: 16, fontWeight: 900, color: "#14532d" }}>
//           #{parseInt(row["AI Rank"] || "0").toLocaleString()}
//         </div>
//         <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 700 }}>AI RANK</div>
//       </div>
//     </div>
//     {(row["Fee"] || row["Stipend Year 1"]) && (
//       <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
//         {row["Fee"] && <MiniStat label="Fee" value={`₹${row["Fee"]}`} />}
//         {row["Stipend Year 1"] && <MiniStat label="Stipend/yr" value={`₹${row["Stipend Year 1"]}`} />}
//         {row["Bond Years"] && row["Bond Years"] !== "0" && <MiniStat label="Bond" value={`${row["Bond Years"]} yr`} />}
//       </div>
//     )}
//   </div>
// );

// const SeatRow: React.FC<{ row: CSVRow; idx: number }> = ({ row, idx }) => (
//   <div style={{
//     background: "#fff", border: "1.5px solid #e2e8f0",
//     borderLeft: "4px solid #8b5cf6",
//     borderRadius: 12, padding: "14px 18px",
//     display: "flex", justifyContent: "space-between", alignItems: "center",
//     gap: 12, flexWrap: "wrap",
//     boxShadow: "0 1px 3px rgba(0,0,0,.06)",
//     animation: `cardIn .3s ease both`,
//     animationDelay: `${Math.min(idx * 30, 300)}ms`,
//   }}>
//     <div style={{ flex: 1, minWidth: 0 }}>
//       <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 14, color: "#0f172a" }}>{row["College Name"]}</p>
//       <p style={{ margin: "0 0 6px", color: "#6366f1", fontWeight: 600, fontSize: 13 }}>
//         {SPECIALTY_LABELS[row["Course Name"]] || row["Course Name"]}
//       </p>
//       <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
//         <Tag bg="#f5f3ff" color="#5b21b6">{row["State"]}</Tag>
//         <Tag bg="#f8fafc" color="#475569">{row["Management of college"]}</Tag>
//       </div>
//     </div>
//     <div style={{
//       background: "#f5f3ff", border: "1px solid #c4b5fd",
//       borderRadius: 12, padding: "10px 20px", textAlign: "center", flexShrink: 0,
//     }}>
//       <div style={{ fontSize: 22, fontWeight: 900, color: "#4c1d95" }}>{row["Seats"]}</div>
//       <div style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: .5 }}>SEATS</div>
//     </div>
//   </div>
// );

// const MiniStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
//   <div>
//     <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: .4 }}>{label}</div>
//     <div style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{value}</div>
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────
// // Summary strip
// // ─────────────────────────────────────────────────────────────────
// const SummaryStrip: React.FC<{ results: AnyResult[]; mode: Mode }> = ({ results, mode }) => {
//   if (mode !== "closing" || results.length === 0) return null;
//   const counts = (["Very High", "High", "Moderate", "Low"] as Chance[]).map(c => ({
//     c, n: results.filter(r => (r as ClosingRankResult).chance === c).length,
//   }));
//   return (
//     <div style={{
//       display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20,
//     }}>
//       {counts.map(({ c, n }) => {
//         const m = CHANCE_META[c];
//         return (
//           <div key={c} style={{
//             background: m.bg, border: `1px solid ${m.border}`,
//             borderRadius: 10, padding: "10px 12px", textAlign: "center",
//           }}>
//             <div style={{ fontSize: 22, fontWeight: 900, color: m.dot }}>{n}</div>
//             <div style={{ fontSize: 11, fontWeight: 700, color: m.text }}>{m.label}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────
// // Main page
// // ─────────────────────────────────────────────────────────────────
// const CollegePredictorPage: React.FC = () => {
//   // Data
//   const [crData,     setCrData]     = useState<CSVRow[]>([]);
//   const [allotData,  setAllotData]  = useState<CSVRow[]>([]);
//   const [seatData,   setSeatData]   = useState<CSVRow[]>([]);
//   const [loading,    setLoading]    = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   // Filters
//   const [mode,      setMode]      = useState<Mode>("closing");
//   const [rank,      setRank]      = useState("");
//   const [category,  setCategory]  = useState("GEN");
//   const [quota,     setQuota]     = useState("AIQ");
//   const [specialty, setSpecialty] = useState("ALL");
//   const [stateVal,  setStateVal]  = useState("ALL");

//   // Results
//   const [results,   setResults]   = useState<AnyResult[]>([]);
//   const [searched,  setSearched]  = useState(false);
//   const [resultFilter, setResultFilter] = useState("");
//   const [chanceFilter, setChanceFilter] = useState<Chance | "ALL">("ALL");

//   // Derived options
//   const [specialties, setSpecialties] = useState<string[]>([]);
//   const [states,      setStates]      = useState<string[]>([]);

//   const resultsRef = useRef<HTMLDivElement>(null);

//   // Load CSVs
//   const loadData = useCallback(async () => {
//     if (dataLoaded) return;
//     setLoading(true);
//     try {
//       const [cr, allot, seat] = await Promise.all([
//         fetch("/data/closingranks2025.csv").then(r => r.text()),
//         fetch("/data/allotments2025.csv").then(r => r.text()),
//         fetch("/data/seatmatrix2025.csv").then(r => r.text()),
//       ]);
//       const crR = parseCSV(cr), allotR = parseCSV(allot), seatR = parseCSV(seat);
//       setCrData(crR); setAllotData(allotR); setSeatData(seatR);
//       setSpecialties([...new Set([...crR.map(r => r["Course"]), ...allotR.map(r => r["Course"])])].filter(Boolean).sort());
//       setStates([...new Set([...crR.map(r => r["State"]), ...allotR.map(r => r["State"])])].filter(Boolean).sort());
//       setDataLoaded(true);
//     } catch (e) { console.error(e); }
//     finally    { setLoading(false); }
//   }, [dataLoaded]);

//   useEffect(() => { loadData(); }, [loadData]);

//   const seatSpecialties = [...new Set(seatData.map(r => r["Course Name"]))].filter(Boolean).sort();
//   const seatStates      = [...new Set(seatData.map(r => r["State"]))].filter(Boolean).sort();

//   function predict() {
//     const r = parseInt(rank, 10);
//     let res: AnyResult[] = [];

//     if (mode === "closing") {
//       res = crData
//         .filter(row =>
//           (quota    === "ALL" || row["Quota"]    === quota)    &&
//           (category === "ALL" || row["Category"] === category) &&
//           (specialty=== "ALL" || row["Course"]   === specialty)&&
//           (stateVal === "ALL" || row["State"]    === stateVal)
//         )
//         .map((row): ClosingRankResult => {
//           const cr25 = parseRank(row["CR 2025 1"]) ?? parseRank(row["CR 2025 2"]) ?? parseRank(row["CR 2025 3"]);
//           const cr24 = parseRank(row["CR 2024 1"]) ?? parseRank(row["CR 2024 2"]) ?? parseRank(row["CR 2024 3"]);
//           const closingRank = cr25 ?? cr24;
//           return { ...row, closingRank, chance: getChance(r, closingRank), dataYear: cr25 ? "2025" : cr24 ? "2024" : null };
//         })
//         .filter(row => row.chance !== null)
//         .sort((a, b) => {
//           const ord: Record<Chance, number> = { "Very High": 0, High: 1, Moderate: 2, Low: 3 };
//           return (ord[a.chance!] - ord[b.chance!]) || ((a.closingRank ?? 0) - (b.closingRank ?? 0));
//         });
//     }

//     if (mode === "allotments") {
//       res = allotData.filter(row => {
//         if (quota    !== "ALL" && row["Quota"]    !== quota)    return false;
//         if (category !== "ALL" && row["Category"] !== category) return false;
//         if (specialty!== "ALL" && row["Course"]   !== specialty)return false;
//         if (stateVal !== "ALL" && row["State"]    !== stateVal) return false;
//         const rr = parseInt(row["AI Rank"], 10);
//         return rr && Math.abs(rr - r) / r <= 0.3;
//       });
//     }

//     if (mode === "seats") {
//       res = seatData.filter(row =>
//         (specialty === "ALL" || row["Course Name"] === specialty) &&
//         (stateVal  === "ALL" || row["State"]       === stateVal)
//       );
//     }

//     setResults(res);
//     setSearched(true);
//     setChanceFilter("ALL");
//     setResultFilter("");
//   }

//   const displayedResults = results.filter(r => {
//     const name   = (r["Institute"] || r["College Name"] || "").toLowerCase();
//     const course = (r["Course"]    || r["Course Name"]  || "").toLowerCase();
//     const q = resultFilter.toLowerCase();
//     if (q && !name.includes(q) && !course.includes(q)) return false;
//     if (mode === "closing" && chanceFilter !== "ALL" && (r as ClosingRankResult).chance !== chanceFilter) return false;
//     return true;
//   });

//   const canPredict = !loading && (mode === "seats" || rank.trim() !== "");

//   const modeInfo = {
//     closing:    { icon: "🏥", title: "Closing Rank Predictor", desc: "See colleges you can get based on 2025 closing ranks" },
//     allotments: { icon: "📋", title: "Past Allotments",        desc: "Real 2025 allotments within ±30% of your rank" },
//     seats:      { icon: "💺", title: "Seat Matrix",            desc: "Available seats by specialty and state" },
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 40%,#faf5ff 100%)",
//       fontFamily: "'DM Sans','Nunito',system-ui,sans-serif",
//     }}>
//       <style>{`
//         @keyframes cardIn {
//           from { opacity:0; transform:translateY(12px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity:0; } to { opacity:1; }
//         }
//         input:focus, select:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,.12); }
//         ::-webkit-scrollbar { width:6px; }
//         ::-webkit-scrollbar-track { background:#f1f5f9; }
//         ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:99px; }
//         ::-webkit-scrollbar-thumb:hover { background:#94a3b8; }
//       `}</style>

//       {/* ── TOP BAR ── */}
//       <div style={{
//         background: "linear-gradient(135deg,#1e1b4b 0%,#3730a3 60%,#4f46e5 100%)",
//         padding: "0 28px",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         height: 60, position: "sticky", top: 0, zIndex: 50,
//         boxShadow: "0 4px 20px rgba(30,27,75,.3)",
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           <button
//             onClick={() => window.history.back()}
//             style={{
//               background: "rgba(255,255,255,.12)", border: "none",
//               borderRadius: 8, padding: "6px 12px", color: "#c7d2fe",
//               cursor: "pointer", fontSize: 13, fontWeight: 600,
//               display: "flex", alignItems: "center", gap: 6,
//             }}
//           >
//             ← Back
//           </button>
//           <div style={{ width: 1, height: 24, background: "rgba(255,255,255,.15)" }} />
//           <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>
//             🎯 College Predictor
//           </span>
//           <span style={{
//             background: "#10b981", color: "#fff",
//             borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 700,
//           }}>NEET PG 2025</span>
//         </div>
//         <div style={{ display: "flex", gap: 16, color: "#a5b4fc", fontSize: 13 }}>
//           <span>📊 28,000+ records</span>
//           <span>🏥 500+ colleges</span>
//           <span>💊 90+ specialties</span>
//         </div>
//       </div>

//       {/* ── MAIN LAYOUT ── */}
//       <div style={{
//         display: "flex", height: "calc(100vh - 60px)",
//         overflow: "hidden",
//       }}>

//         {/* ════════════════ LEFT PANEL ════════════════ */}
//         <div style={{
//           width: 340, minWidth: 300, flexShrink: 0,
//           background: "#fff",
//           borderRight: "1px solid #e2e8f0",
//           overflowY: "auto",
//           display: "flex", flexDirection: "column",
//         }}>
//           {/* Panel header */}
//           <div style={{
//             padding: "22px 22px 0",
//             background: "linear-gradient(135deg,#eef2ff,#f5f3ff)",
//             borderBottom: "1px solid #e2e8f0",
//             paddingBottom: 18,
//           }}>
//             <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 800, color: "#1e1b4b" }}>
//               Search Filters
//             </h2>
//             <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>
//               Refine your results below
//             </p>
//           </div>

//           <div style={{ padding: "20px 22px", flex: 1 }}>

//             {/* Mode selector */}
//             <Field label="Prediction Mode">
//               <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                 {(["closing", "allotments", "seats"] as Mode[]).map(m => (
//                   <button
//                     key={m}
//                     onClick={() => { setMode(m); setSearched(false); setResults([]); }}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 10,
//                       padding: "10px 14px", borderRadius: 10, cursor: "pointer",
//                       border: mode === m ? "2px solid #6366f1" : "2px solid #e2e8f0",
//                       background: mode === m ? "#eef2ff" : "#fafafa",
//                       color: mode === m ? "#4338ca" : "#64748b",
//                       fontWeight: mode === m ? 700 : 500, fontSize: 13,
//                       textAlign: "left", transition: "all .15s",
//                     }}
//                   >
//                     <span style={{ fontSize: 18 }}>{modeInfo[m].icon}</span>
//                     <div>
//                       <div style={{ fontWeight: 700, fontSize: 13, color: mode === m ? "#4338ca" : "#334155" }}>
//                         {modeInfo[m].title}
//                       </div>
//                       <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
//                         {modeInfo[m].desc}
//                       </div>
//                     </div>
//                     {mode === m && (
//                       <span style={{ marginLeft: "auto", color: "#6366f1", fontSize: 16 }}>✓</span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </Field>

//             <Divider />

//             {/* Rank input */}
//             {mode !== "seats" && (
//               <Field label="Your NEET PG Rank" hint="Required">
//                 <input
//                   type="number" min={1} value={rank}
//                   onChange={e => setRank(e.target.value)}
//                   placeholder="e.g. 5000"
//                   style={inputCss}
//                 />
//                 {rank && (
//                   <div style={{
//                     marginTop: 6, padding: "6px 10px",
//                     background: "#eff6ff", borderRadius: 7,
//                     fontSize: 12, color: "#1d4ed8", fontWeight: 600,
//                   }}>
//                     Rank: <b>{parseInt(rank).toLocaleString()}</b>
//                   </div>
//                 )}
//               </Field>
//             )}

//             {/* Category */}
//             {mode !== "seats" && (
//               <Field label="Category">
//                 <div style={{ position: "relative" }}>
//                   <select value={category} onChange={e => setCategory(e.target.value)} style={selectCss}>
//                     <option value="ALL">All Categories</option>
//                     {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
//                   </select>
//                   <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8", fontSize: 12 }}>▾</span>
//                 </div>
//               </Field>
//             )}

//             {/* Quota */}
//             {mode !== "seats" && (
//               <Field label="Quota">
//                 <div style={{ position: "relative" }}>
//                   <select value={quota} onChange={e => setQuota(e.target.value)} style={selectCss}>
//                     <option value="ALL">All Quotas</option>
//                     {QUOTA_OPTIONS.map(q => <option key={q} value={q}>{q}</option>)}
//                   </select>
//                   <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8", fontSize: 12 }}>▾</span>
//                 </div>
//               </Field>
//             )}

//             {/* Specialty */}
//             <Field label="Specialty / Course">
//               <div style={{ position: "relative" }}>
//                 <select value={specialty} onChange={e => setSpecialty(e.target.value)} style={selectCss}>
//                   <option value="ALL">All Specialties</option>
//                   {(mode === "seats" ? seatSpecialties : specialties).map(s => (
//                     <option key={s} value={s}>{SPECIALTY_LABELS[s] || s}</option>
//                   ))}
//                 </select>
//                 <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8", fontSize: 12 }}>▾</span>
//               </div>
//             </Field>

//             {/* State */}
//             <Field label="State / UT">
//               <div style={{ position: "relative" }}>
//                 <select value={stateVal} onChange={e => setStateVal(e.target.value)} style={selectCss}>
//                   <option value="ALL">All States</option>
//                   {(mode === "seats" ? seatStates : states).map(s => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//                 <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8", fontSize: 12 }}>▾</span>
//               </div>
//             </Field>

//             {/* Info tip */}
//             <div style={{
//               background: "#f0fdf4", border: "1px solid #bbf7d0",
//               borderRadius: 9, padding: "10px 12px", marginBottom: 16,
//               display: "flex", gap: 8,
//             }}>
//               <span style={{ fontSize: 15, flexShrink: 0 }}>💡</span>
//               <p style={{ margin: 0, color: "#166534", fontSize: 12, lineHeight: 1.5 }}>
//                 {mode === "closing"    && "Ranks compared against actual 2025 data."}
//                 {mode === "allotments" && "Real allotments made to candidates within ±30% of your rank."}
//                 {mode === "seats"      && "Total seats available from the official 2025 seat matrix."}
//               </p>
//             </div>
//           </div>

//           {/* Predict button — sticky at bottom of left panel */}
//           <div style={{ padding: "16px 22px", borderTop: "1px solid #e2e8f0", background: "#fff" }}>
//             {loading && (
//               <p style={{ textAlign: "center", color: "#6366f1", fontWeight: 700, fontSize: 13, margin: "0 0 10px" }}>
//                 ⏳ Loading data…
//               </p>
//             )}
//             <button
//               onClick={predict}
//               disabled={!canPredict}
//               style={{
//                 width: "100%", padding: "14px",
//                 background: canPredict
//                   ? "linear-gradient(135deg,#4338ca,#7c3aed)"
//                   : "#e2e8f0",
//                 color: canPredict ? "#fff" : "#94a3b8",
//                 border: "none", borderRadius: 12,
//                 fontSize: 15, fontWeight: 800, cursor: canPredict ? "pointer" : "not-allowed",
//                 boxShadow: canPredict ? "0 6px 20px rgba(99,102,241,.35)" : "none",
//                 transition: "all .2s",
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//               }}
//               onMouseEnter={e => { if (canPredict) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
//               onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
//             >
//               🔍 Predict My Colleges
//             </button>

//             {searched && (
//               <button
//                 onClick={() => { setResults([]); setSearched(false); setRank(""); setCategory("GEN"); setQuota("AIQ"); setSpecialty("ALL"); setStateVal("ALL"); }}
//                 style={{
//                   width: "100%", marginTop: 8, padding: "9px",
//                   background: "transparent", border: "1.5px solid #e2e8f0",
//                   borderRadius: 10, color: "#64748b", fontSize: 13, fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 ↺ Reset Filters
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ════════════════ RIGHT PANEL ════════════════ */}
//         <div ref={resultsRef} style={{
//           flex: 1, overflowY: "auto", padding: "24px 28px",
//           display: "flex", flexDirection: "column",
//         }}>

//           {/* Empty state — before first search */}
//           {!searched && (
//             <div style={{
//               flex: 1, display: "flex", flexDirection: "column",
//               alignItems: "center", justifyContent: "center",
//               animation: "fadeIn .4s ease",
//             }}>
//               {/* decorative graphic */}
//               <div style={{
//                 width: 120, height: 120, borderRadius: "50%",
//                 background: "linear-gradient(135deg,#eef2ff,#f5f3ff)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 52, marginBottom: 24,
//                 boxShadow: "0 8px 32px rgba(99,102,241,.15)",
//               }}>🎯</div>
//               <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 800, color: "#1e1b4b", textAlign: "center" }}>
//                 Your Results Will Appear Here
//               </h3>
//               <p style={{ margin: "0 0 32px", color: "#64748b", fontSize: 14, textAlign: "center", maxWidth: 400, lineHeight: 1.6 }}>
//                 Select your mode, enter your rank, choose filters on the left — then hit <b>Predict My Colleges</b>.
//               </p>

//               {/* Quick-start cards */}
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 560, width: "100%" }}>
//                 {[
//                   { icon: "🏥", title: "Closing Rank",  desc: "Which colleges can I get?", mode: "closing"    as Mode },
//                   { icon: "📋", title: "Allotments",    desc: "Who got what near my rank?",mode: "allotments" as Mode },
//                   { icon: "💺", title: "Seat Matrix",   desc: "How many seats available?", mode: "seats"      as Mode },
//                 ].map(c => (
//                   <div
//                     key={c.mode}
//                     onClick={() => setMode(c.mode)}
//                     style={{
//                       background: "#fff", border: mode === c.mode ? "2px solid #6366f1" : "1.5px solid #e2e8f0",
//                       borderRadius: 12, padding: "16px 14px", cursor: "pointer",
//                       textAlign: "center", transition: "all .15s",
//                       boxShadow: mode === c.mode ? "0 4px 16px rgba(99,102,241,.15)" : "0 1px 4px rgba(0,0,0,.05)",
//                     }}
//                     onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#6366f1"}
//                     onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = mode === c.mode ? "#6366f1" : "#e2e8f0"}
//                   >
//                     <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
//                     <div style={{ fontWeight: 700, fontSize: 13, color: "#1e1b4b", marginBottom: 4 }}>{c.title}</div>
//                     <div style={{ fontSize: 11, color: "#94a3b8" }}>{c.desc}</div>
//                   </div>
//                 ))}
//               </div>

//               {/* Stats row */}
//               <div style={{ display: "flex", gap: 28, marginTop: 40 }}>
//                 {[
//                   { n: "4,200+", l: "Allotment Records" },
//                   { n: "14,500+",l: "Closing Rank Entries" },
//                   { n: "500+",   l: "Colleges" },
//                   { n: "90+",    l: "Specialties" },
//                 ].map(s => (
//                   <div key={s.l} style={{ textAlign: "center" }}>
//                     <div style={{ fontSize: 20, fontWeight: 900, color: "#4338ca" }}>{s.n}</div>
//                     <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{s.l}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Results */}
//           {searched && (
//             <div style={{ animation: "fadeIn .3s ease" }}>
//               {/* Results header */}
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
//                 <div>
//                   <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "#1e1b4b" }}>
//                     {results.length > 0 ? `${results.length} colleges found` : "No colleges found"}
//                   </h2>
//                   {rank && mode !== "seats" && (
//                     <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
//                       Rank <b style={{ color: "#4338ca" }}>{parseInt(rank).toLocaleString()}</b>
//                       {" · "}<b>{category}</b>{" · "}<b>{quota}</b>
//                       {stateVal !== "ALL" && <> · <b>{stateVal}</b></>}
//                       {specialty !== "ALL" && <> · <b>{SPECIALTY_LABELS[specialty] || specialty}</b></>}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Summary strip (closing rank mode) */}
//               <SummaryStrip results={results} mode={mode} />

//               {/* Filter bar */}
//               {results.length > 0 && (
//                 <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
//                   <div style={{ position: "relative", flex: "1 1 200px" }}>
//                     <input
//                       type="text" value={resultFilter}
//                       onChange={e => setResultFilter(e.target.value)}
//                       placeholder="🔍 Filter colleges or specialties…"
//                       style={{ ...inputCss, paddingLeft: 14, fontSize: 13 }}
//                     />
//                   </div>
//                   {mode === "closing" && (
//                     <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                       {(["ALL","Very High","High","Moderate","Low"] as (Chance|"ALL")[]).map(key => {
//                         const m = key !== "ALL" ? CHANCE_META[key] : null;
//                         const active = chanceFilter === key;
//                         return (
//                           <button key={key} onClick={() => setChanceFilter(key)} style={{
//                             padding: "6px 12px", borderRadius: 8, cursor: "pointer",
//                             border: `1.5px solid ${active ? (m?.dot ?? "#6366f1") : "#e2e8f0"}`,
//                             background: active ? (m?.bg ?? "#eef2ff") : "#fff",
//                             color: active ? (m?.text ?? "#4338ca") : "#64748b",
//                             fontWeight: active ? 700 : 500, fontSize: 12,
//                             transition: "all .15s",
//                           }}>
//                             {key === "ALL" ? "All" : key}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Cards */}
//               {displayedResults.length === 0 && (
//                 <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
//                   <div style={{ fontSize: 48, marginBottom: 12 }}>🔭</div>
//                   <p style={{ fontWeight: 700, fontSize: 16, color: "#334155", margin: "0 0 6px" }}>No matches for these filters</p>
//                   <p style={{ fontSize: 13, margin: 0 }}>Try adjusting your quota, category, or clearing the specialty/state filters.</p>
//                 </div>
//               )}

//               <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                 {mode === "closing"    && displayedResults.map((r, i) => <CRCard    key={i} row={r as ClosingRankResult} idx={i} />)}
//                 {mode === "allotments" && displayedResults.map((r, i) => <AllotCard key={i} row={r as CSVRow}            idx={i} />)}
//                 {mode === "seats"      && displayedResults.map((r, i) => <SeatRow   key={i} row={r as CSVRow}            idx={i} />)}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollegePredictorPage;

/**
 * CollegePredictorPage.tsx  — v2 (grid card layout)
 * ─────────────────────────────────────────────────────────────────
 * Route:  <Route path="/predictor" element={<CollegePredictorPage />} />
 *
 * CSVs → /public/data/
 *   closingranks2025.csv | allotments2025.csv | seatmatrix2025.csv
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useCallback, CSSProperties } from "react";

// ── Types ─────────────────────────────────────────────────────────
type Mode   = "closing" | "allotments" | "seats";
type Chance = "Very High" | "High" | "Moderate" | "Low";
interface CSVRow { [key: string]: string; }
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
  return lines.slice(1).map(line => {
    const v = splitL(line); const o: CSVRow = {};
    headers.forEach((h, i) => { o[h.trim()] = (v[i] ?? "").trim(); });
    return o;
  });
}
function splitL(line: string): string[] {
  const out: string[] = []; let c = ""; let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === ',' && !q) { out.push(c); c = ""; }
    else c += ch;
  }
  out.push(c); return out;
}
function parseRank(s: string): number | null {
  if (!s || s === "-") return null;
  const m = s.match(/^(\d+)/); return m ? +m[1] : null;
}

// ── Chance logic ──────────────────────────────────────────────────
function getChance(rank: number, cr: number | null): Chance | null {
  if (!cr) return null;
  const r = rank / cr;
  if (r <= 0.70) return "Very High";
  if (r <= 0.90) return "High";
  if (r <= 1.00) return "Moderate";
  if (r <= 1.15) return "Low";
  return null;
}

// ── Constants ─────────────────────────────────────────────────────
const SL: Record<string, string> = {
  "GENERAL MEDICINE":"General Medicine","RADIO DIAGNOSIS":"Radiology",
  "DERMATOLOGY":"Dermatology","PAEDIATRICS":"Paediatrics","OBG":"Obs & Gynaecology",
  "GENERAL SURGERY":"General Surgery","ORTHOPAEDICS":"Orthopaedics",
  "ANAESTHESIOLOGY":"Anaesthesiology","PSYCHIATRY":"Psychiatry","PATHOLOGY":"Pathology",
  "OPHTHALMOLOGY":"Ophthalmology","ENT":"ENT","MICROBIOLOGY":"Microbiology",
  "PHARMACOLOGY":"Pharmacology","PHYSIOLOGY":"Physiology","ANATOMY":"Anatomy",
  "BIOCHEMISTRY":"Biochemistry","FORENSIC MEDICINE":"Forensic Medicine",
  "SPM":"Comm. Medicine/SPM","EMERGENCY MEDICINE":"Emergency Medicine",
  "RADIATION ONCOLOGY":"Radiation Oncology","NUCLEAR MEDICINE":"Nuclear Medicine",
  "TBRD":"TB & Resp. Diseases","PMR":"PMR","GERIATRICS":"Geriatrics",
  "HOSPITAL ADMINISTRATION":"Hospital Admin","SPORTS MEDICINE":"Sports Medicine",
  "TROPICAL MEDICINE":"Tropical Medicine","FAMILY MEDICINE":"Family Medicine",
  "DDVL":"Dermatology (DDVL)","DMRD":"Radiology (DMRD)",
};

const CAT  = ["GEN","OBC","EWS","SC","ST","GEN-PwD","OBC-PwD","EWS-PwD","SC-PwD","ST-PwD"];
const QUOT = ["AIQ","DNB Post MBBS","DU","IP","BHU","AMU","MNG","NRI"];

const CM: Record<Chance,{bg:string;border:string;text:string;dot:string;bar:string}> = {
  "Very High":{ bg:"#f0fdf4", border:"#4ade80", text:"#14532d", dot:"#16a34a", bar:"#22c55e" },
  "High":     { bg:"#eff6ff", border:"#60a5fa", text:"#1e3a8a", dot:"#2563eb", bar:"#3b82f6" },
  "Moderate": { bg:"#fffbeb", border:"#fbbf24", text:"#78350f", dot:"#d97706", bar:"#f59e0b" },
  "Low":      { bg:"#fef2f2", border:"#f87171", text:"#7f1d1d", dot:"#dc2626", bar:"#ef4444" },
};

// ── Shared CSS ────────────────────────────────────────────────────
const inp: CSSProperties = {
  width:"100%", boxSizing:"border-box",
  border:"1.5px solid #e2e8f0", borderRadius:9,
  padding:"9px 12px", fontSize:13, color:"#0f172a",
  background:"#fff", outline:"none", transition:"border-color .15s",
};
const sel: CSSProperties = { ...inp, appearance:"none", cursor:"pointer", paddingRight:28 };

// ── Atoms ─────────────────────────────────────────────────────────
const Tag: React.FC<{bg?:string;color?:string;children:React.ReactNode}> = ({
  bg="#f1f5f9", color="#475569", children,
}) => (
  <span style={{
    display:"inline-block", background:bg, color,
    borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:700,
    lineHeight:1.7, whiteSpace:"nowrap",
  }}>{children}</span>
);

const FL: React.FC<{label:string;hint?:string;children:React.ReactNode}> = ({label,hint,children}) => (
  <div style={{marginBottom:12}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
      <label style={{fontSize:11,fontWeight:700,color:"#64748b",letterSpacing:.4,textTransform:"uppercase"}}>{label}</label>
      {hint && <span style={{fontSize:10,color:"#94a3b8"}}>{hint}</span>}
    </div>
    {children}
  </div>
);

const Divider = () => <div style={{height:1,background:"#f1f5f9",margin:"14px 0"}}/>;

// ── Compact grid card — Closing Rank ─────────────────────────────
const CRCard: React.FC<{row:CRRow;idx:number}> = ({row,idx}) => {
  const m = row.chance ? CM[row.chance] : CM.Low;
  const pct: Record<Chance,number> = {"Very High":92,High:68,Moderate:44,Low:18};
  const p = row.chance ? pct[row.chance] : 8;
  const name = row["Institute"] || "";
  const course = SL[row["Course"]] || row["Course"] || "";

  return (
    <div style={{
      background:"#fff",
      border:`1.5px solid ${m.border}`,
      borderTop:`3px solid ${m.dot}`,
      borderRadius:12,
      padding:"14px 14px 12px",
      boxShadow:"0 2px 8px rgba(0,0,0,.05)",
      display:"flex", flexDirection:"column", gap:0,
      transition:"all .18s",
      animation:`cIn .25s ease both`,
      animationDelay:`${Math.min(idx*20,240)}ms`,
      cursor:"default",
      position:"relative",
      overflow:"hidden",
    }}
      onMouseEnter={e=>{const d=e.currentTarget as HTMLDivElement;d.style.transform="translateY(-3px)";d.style.boxShadow=`0 8px 24px rgba(0,0,0,.1)`;}}
      onMouseLeave={e=>{const d=e.currentTarget as HTMLDivElement;d.style.transform="translateY(0)";d.style.boxShadow="0 2px 8px rgba(0,0,0,.05)";}}
    >
      {/* Chance badge top-right */}
      <div style={{
        position:"absolute",top:10,right:10,
        background:m.bg, border:`1px solid ${m.border}`,
        borderRadius:6, padding:"2px 8px",
        color:m.text, fontWeight:800, fontSize:10,
      }}>{row.chance}</div>

      {/* College name */}
      <p style={{
        margin:"0 0 2px", fontWeight:800, fontSize:13, color:"#0f172a",
        lineHeight:1.3, paddingRight:72,
        display:"-webkit-box", WebkitLineClamp:2,
        WebkitBoxOrient:"vertical", overflow:"hidden",
      }}>{name}</p>

      {/* Specialty */}
      <p style={{
        margin:"0 0 8px", color:"#6366f1", fontWeight:700, fontSize:12,
        display:"-webkit-box", WebkitLineClamp:1,
        WebkitBoxOrient:"vertical", overflow:"hidden",
      }}>{course}</p>

      {/* Tags */}
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
        <Tag bg="#eef2ff" color="#4338ca">{row["Quota"]}</Tag>
        <Tag bg="#f8fafc" color="#475569">{row["Category"]}</Tag>
        {row.dataYear && (
          <Tag bg={row.dataYear==="2025"?"#f0fdf4":"#fefce8"} color={row.dataYear==="2025"?"#166534":"#854d0e"}>
            {row.dataYear}
          </Tag>
        )}
      </div>

      {/* CR + bar */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <span style={{fontSize:10,color:"#94a3b8",fontWeight:600,whiteSpace:"nowrap"}}>
          CR: <b style={{color:"#334155"}}>{row.closingRank?.toLocaleString()??'—'}</b>
        </span>
        <div style={{flex:1,background:"#f1f5f9",borderRadius:999,height:4,overflow:"hidden"}}>
          <div style={{width:`${p}%`,height:"100%",background:m.bar,borderRadius:999}}/>
        </div>
      </div>

      {/* Mini stats row */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",borderTop:"1px solid #f1f5f9",paddingTop:8,marginTop:2}}>
        {row["Fee"] && (
          <div>
            <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,textTransform:"uppercase"}}>Fee</div>
            <div style={{fontSize:11,fontWeight:700,color:"#334155"}}>₹{row["Fee"]}</div>
          </div>
        )}
        {row["Stipend Year 1"] && (
          <div>
            <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,textTransform:"uppercase"}}>Stipend</div>
            <div style={{fontSize:11,fontWeight:700,color:"#334155"}}>₹{row["Stipend Year 1"]}</div>
          </div>
        )}
        {row["Bond Years"] && row["Bond Years"]!=="0" && (
          <div>
            <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,textTransform:"uppercase"}}>Bond</div>
            <div style={{fontSize:11,fontWeight:700,color:"#334155"}}>{row["Bond Years"]}yr</div>
          </div>
        )}
        {row["Beds"] && (
          <div>
            <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,textTransform:"uppercase"}}>Beds</div>
            <div style={{fontSize:11,fontWeight:700,color:"#334155"}}>{row["Beds"]}</div>
          </div>
        )}
        {/* state pushed to end */}
        <div style={{marginLeft:"auto"}}>
          <div style={{fontSize:10,color:"#94a3b8",fontWeight:600,textAlign:"right"}}>{row["State"]}</div>
        </div>
      </div>
    </div>
  );
};

// ── Compact grid card — Allotments ───────────────────────────────
const AllotCard: React.FC<{row:CSVRow;idx:number}> = ({row,idx}) => (
  <div style={{
    background:"#fff", border:"1.5px solid #c7d2fe",
    borderTop:"3px solid #6366f1",
    borderRadius:12, padding:"14px 14px 12px",
    boxShadow:"0 2px 8px rgba(0,0,0,.05)",
    display:"flex", flexDirection:"column",
    transition:"all .18s",
    animation:`cIn .25s ease both`,
    animationDelay:`${Math.min(idx*20,240)}ms`,
    position:"relative",
  }}
    onMouseEnter={e=>{const d=e.currentTarget as HTMLDivElement;d.style.transform="translateY(-3px)";d.style.boxShadow="0 8px 24px rgba(0,0,0,.1)";}}
    onMouseLeave={e=>{const d=e.currentTarget as HTMLDivElement;d.style.transform="translateY(0)";d.style.boxShadow="0 2px 8px rgba(0,0,0,.05)";}}
  >
    {/* Rank badge */}
    <div style={{
      position:"absolute",top:10,right:10,
      background:"#f0fdf4",border:"1px solid #86efac",
      borderRadius:7,padding:"3px 9px",textAlign:"center",
    }}>
      <div style={{fontSize:12,fontWeight:900,color:"#14532d",lineHeight:1}}>
        #{parseInt(row["AI Rank"]||"0").toLocaleString()}
      </div>
      <div style={{fontSize:9,color:"#16a34a",fontWeight:700,letterSpacing:.3}}>RANK</div>
    </div>

    <p style={{
      margin:"0 0 2px",fontWeight:800,fontSize:13,color:"#0f172a",
      lineHeight:1.3,paddingRight:68,
      display:"-webkit-box",WebkitLineClamp:2,
      WebkitBoxOrient:"vertical",overflow:"hidden",
    }}>{row["Institute"]}</p>

    <p style={{
      margin:"0 0 8px",color:"#6366f1",fontWeight:700,fontSize:12,
      display:"-webkit-box",WebkitLineClamp:1,
      WebkitBoxOrient:"vertical",overflow:"hidden",
    }}>{SL[row["Course"]]||row["Course"]}</p>

    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
      <Tag bg="#eef2ff" color="#4338ca">Rnd {row["Round"]}</Tag>
      <Tag bg="#f8fafc" color="#475569">{row["Quota"]}</Tag>
      <Tag bg="#f8fafc" color="#475569">{row["Category"]}</Tag>
    </div>

    <div style={{display:"flex",gap:12,flexWrap:"wrap",borderTop:"1px solid #f1f5f9",paddingTop:8,marginTop:"auto"}}>
      {row["Fee"] && (
        <div>
          <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,textTransform:"uppercase"}}>Fee</div>
          <div style={{fontSize:11,fontWeight:700,color:"#334155"}}>₹{row["Fee"]}</div>
        </div>
      )}
      {row["Stipend Year 1"] && (
        <div>
          <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,textTransform:"uppercase"}}>Stipend</div>
          <div style={{fontSize:11,fontWeight:700,color:"#334155"}}>₹{row["Stipend Year 1"]}</div>
        </div>
      )}
      <div style={{marginLeft:"auto"}}>
        <div style={{fontSize:10,color:"#94a3b8",textAlign:"right"}}>{row["State"]}</div>
      </div>
    </div>
  </div>
);

// ── Compact grid card — Seat Matrix ──────────────────────────────
const SeatCard: React.FC<{row:CSVRow;idx:number}> = ({row,idx}) => (
  <div style={{
    background:"#fff", border:"1.5px solid #ddd6fe",
    borderTop:"3px solid #8b5cf6",
    borderRadius:12, padding:"14px 14px 12px",
    boxShadow:"0 2px 8px rgba(0,0,0,.05)",
    display:"flex", flexDirection:"column",
    transition:"all .18s",
    animation:`cIn .25s ease both`,
    animationDelay:`${Math.min(idx*20,240)}ms`,
    position:"relative",
  }}
    onMouseEnter={e=>{const d=e.currentTarget as HTMLDivElement;d.style.transform="translateY(-3px)";d.style.boxShadow="0 8px 24px rgba(0,0,0,.1)";}}
    onMouseLeave={e=>{const d=e.currentTarget as HTMLDivElement;d.style.transform="translateY(0)";d.style.boxShadow="0 2px 8px rgba(0,0,0,.05)";}}
  >
    {/* Seats badge */}
    <div style={{
      position:"absolute",top:10,right:10,
      background:"#f5f3ff",border:"1px solid #c4b5fd",
      borderRadius:7,padding:"4px 10px",textAlign:"center",
    }}>
      <div style={{fontSize:16,fontWeight:900,color:"#4c1d95",lineHeight:1}}>{row["Seats"]}</div>
      <div style={{fontSize:9,color:"#7c3aed",fontWeight:700,letterSpacing:.3}}>SEATS</div>
    </div>

    <p style={{
      margin:"0 0 2px",fontWeight:800,fontSize:13,color:"#0f172a",
      lineHeight:1.3,paddingRight:64,
      display:"-webkit-box",WebkitLineClamp:2,
      WebkitBoxOrient:"vertical",overflow:"hidden",
    }}>{row["College Name"]}</p>

    <p style={{
      margin:"0 0 10px",color:"#7c3aed",fontWeight:700,fontSize:12,
      display:"-webkit-box",WebkitLineClamp:1,
      WebkitBoxOrient:"vertical",overflow:"hidden",
    }}>{SL[row["Course Name"]]||row["Course Name"]}</p>

    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:"auto"}}>
      <Tag bg="#f5f3ff" color="#5b21b6">{row["State"]}</Tag>
      <Tag bg="#f8fafc" color="#475569">{row["Management of college"]}</Tag>
    </div>
  </div>
);

// ── Summary strip (closing mode) ──────────────────────────────────
const Strip: React.FC<{results:AnyResult[];mode:Mode}> = ({results,mode}) => {
  if (mode !== "closing" || !results.length) return null;
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
      {(["Very High","High","Moderate","Low"] as Chance[]).map(c=>{
        const m = CM[c];
        const n = results.filter(r=>(r as CRRow).chance===c).length;
        return (
          <div key={c} style={{
            background:m.bg,border:`1px solid ${m.border}`,
            borderRadius:10,padding:"10px 8px",textAlign:"center",
          }}>
            <div style={{fontSize:20,fontWeight:900,color:m.dot}}>{n}</div>
            <div style={{fontSize:11,fontWeight:700,color:m.text}}>{c}</div>
          </div>
        );
      })}
    </div>
  );
};

// ── View toggle ───────────────────────────────────────────────────
type ViewMode = "grid" | "list";

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
const CollegePredictorPage: React.FC = () => {
  const [crData,      setCrData]      = useState<CSVRow[]>([]);
  const [allotData,   setAllotData]   = useState<CSVRow[]>([]);
  const [seatData,    setSeatData]    = useState<CSVRow[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [dataLoaded,  setDataLoaded]  = useState(false);
  const [dataError,   setDataError]   = useState(false);

  const [mode,        setMode]        = useState<Mode>("closing");
  const [rank,        setRank]        = useState("");
  const [category,    setCategory]    = useState("GEN");
  const [quota,       setQuota]       = useState("AIQ");
  const [specialty,   setSpecialty]   = useState("ALL");
  const [stateVal,    setStateVal]    = useState("ALL");

  const [results,     setResults]     = useState<AnyResult[]>([]);
  const [searched,    setSearched]    = useState(false);
  const [searching,   setSearching]   = useState(false);
  const [qFilter,     setQFilter]     = useState("");
  const [cFilter,     setCFilter]     = useState<Chance|"ALL">("ALL");
  const [viewMode,    setViewMode]    = useState<ViewMode>("grid");

  const [specialties, setSpecialties] = useState<string[]>([]);
  const [states,      setStates]      = useState<string[]>([]);

  const loadData = useCallback(async () => {
    if (dataLoaded) return;
    setLoading(true);
    try {
      const [cr, al, se] = await Promise.all([
        fetch("/data/closingranks2025.csv").then(r=>r.text()),
        fetch("/data/allotments2025.csv").then(r=>r.text()),
        fetch("/data/seatmatrix2025.csv").then(r=>r.text()),
      ]);
      const crR = parseCSV(cr), alR = parseCSV(al), seR = parseCSV(se);
      setCrData(crR); setAllotData(alR); setSeatData(seR);
      setSpecialties([...new Set([...crR.map(r=>r["Course"]),...alR.map(r=>r["Course"])])].filter(Boolean).sort());
      setStates([...new Set([...crR.map(r=>r["State"]),...alR.map(r=>r["State"])])].filter(Boolean).sort());
      setDataLoaded(true);
    } catch(e) { setDataError(true); }
    finally { setLoading(false); }
  }, [dataLoaded]);

  useEffect(() => { loadData(); }, [loadData]);

  const seatSp  = [...new Set(seatData.map(r=>r["Course Name"]))].filter(Boolean).sort();
  const seatSt  = [...new Set(seatData.map(r=>r["State"]))].filter(Boolean).sort();

  function predict() {
    const r = parseInt(rank, 10);
    setSearching(true);
    setTimeout(() => {   // tiny delay for UX feedback
      let res: AnyResult[] = [];
      if (mode === "closing") {
        res = crData
          .filter(row =>
            (quota    ==="ALL"||row["Quota"]   ===quota)   &&
            (category ==="ALL"||row["Category"]===category)&&
            (specialty==="ALL"||row["Course"]  ===specialty)&&
            (stateVal ==="ALL"||row["State"]   ===stateVal)
          )
          .map((row): CRRow => {
            const c25 = parseRank(row["CR 2025 1"])??parseRank(row["CR 2025 2"])??parseRank(row["CR 2025 3"]);
            const c24 = parseRank(row["CR 2024 1"])??parseRank(row["CR 2024 2"])??parseRank(row["CR 2024 3"]);
            const closingRank = c25??c24;
            return {...row, closingRank, chance:getChance(r,closingRank), dataYear:c25?"2025":c24?"2024":null};
          })
          .filter(row=>row.chance!==null)
          .sort((a,b)=>{
            const o:Record<Chance,number>={"Very High":0,High:1,Moderate:2,Low:3};
            return (o[a.chance!]-o[b.chance!])||((a.closingRank??0)-(b.closingRank??0));
          });
      }
      if (mode === "allotments") {
        res = allotData.filter(row=>{
          if(quota    !=="ALL"&&row["Quota"]   !==quota)   return false;
          if(category !=="ALL"&&row["Category"]!==category)return false;
          if(specialty!=="ALL"&&row["Course"]  !==specialty)return false;
          if(stateVal !=="ALL"&&row["State"]   !==stateVal)return false;
          const rr=parseInt(row["AI Rank"],10);
          return rr&&Math.abs(rr-r)/r<=0.3;
        });
      }
      if (mode === "seats") {
        res = seatData.filter(row=>
          (specialty==="ALL"||row["Course Name"]===specialty)&&
          (stateVal ==="ALL"||row["State"]      ===stateVal)
        );
      }
      setResults(res); setSearched(true); setCFilter("ALL"); setQFilter("");
      setSearching(false);
    }, 120);
  }

  const shown = results.filter(r => {
    const n = (r["Institute"]||r["College Name"]||"").toLowerCase();
    const c = (r["Course"]   ||r["Course Name"] ||"").toLowerCase();
    const q = qFilter.toLowerCase();
    if (q && !n.includes(q) && !c.includes(q)) return false;
    if (mode==="closing"&&cFilter!=="ALL"&&(r as CRRow).chance!==cFilter) return false;
    return true;
  });

  const canPredict = !loading && (mode==="seats"||rank.trim()!=="");

  // ── RENDER ────────────────────────────────────────────────────
  return (
    <div style={{
      display:"flex", flexDirection:"column", height:"100vh",
      background:"#f8faff",
      fontFamily:"'DM Sans','Nunito',system-ui,sans-serif",
    }}>
      <style>{`
        @keyframes cIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        input:focus,select:focus{border-color:#6366f1!important;box-shadow:0 0 0 3px rgba(99,102,241,.12);}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:99px}
        .grid-view{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
        .list-view{display:flex;flex-direction:column;gap:8px}
        @media(max-width:900px){
          .main-layout{flex-direction:column!important}
          .left-panel{width:100%!important;height:auto!important;min-width:unset!important}
          .right-panel{height:auto!important}
        }
      `}</style>

      {/* ── TOPBAR ───────────────────────────────────────────────── */}
      <div style={{
        background:"linear-gradient(135deg,#1e1b4b,#3730a3 55%,#4f46e5)",
        height:56, display:"flex", alignItems:"center",
        padding:"0 20px", gap:14, flexShrink:0,
        boxShadow:"0 2px 16px rgba(30,27,75,.35)",
        position:"sticky", top:0, zIndex:100,
      }}>
        <button onClick={()=>window.history.back()} style={{
          background:"rgba(255,255,255,.12)", border:"none", borderRadius:8,
          padding:"6px 14px", color:"#c7d2fe", cursor:"pointer",
          fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:5,
          flexShrink:0,
        }}>← Back</button>

        <div style={{width:1,height:22,background:"rgba(255,255,255,.15)"}}/>

        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:18}}>🎯</span>
          <span style={{color:"#fff",fontWeight:800,fontSize:15}}>College Predictor</span>
          <span style={{
            background:"#10b981",color:"#fff",
            borderRadius:5,padding:"1px 8px",fontSize:10,fontWeight:800,
          }}>NEET PG 2025</span>
        </div>

        <div style={{marginLeft:"auto",display:"flex",gap:20,color:"#a5b4fc",fontSize:12,fontWeight:600}}>
          {[["28K+","Records"],["500+","Colleges"],["90+","Specialties"]].map(([v,l])=>(
            <span key={l}><b style={{color:"#fff"}}>{v}</b> {l}</span>
          ))}
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <div className="main-layout" style={{display:"flex",flex:1,overflow:"hidden",minHeight:0}}>

        {/* ══ LEFT PANEL ══════════════════════════════════════════ */}
        <div className="left-panel" style={{
          width:300, minWidth:280, flexShrink:0,
          background:"#fff",
          borderRight:"1px solid #e2e8f0",
          display:"flex", flexDirection:"column",
          overflowY:"auto",
        }}>
          {/* Panel header */}
          <div style={{
            padding:"16px 18px 14px",
            background:"linear-gradient(135deg,#eef2ff,#f5f3ff)",
            borderBottom:"1px solid #e2e8f0",
            flexShrink:0,
          }}>
            <div style={{fontSize:14,fontWeight:800,color:"#1e1b4b",marginBottom:2}}>🔍 Search Filters</div>
            <div style={{fontSize:11,color:"#64748b"}}>Set your criteria and predict</div>
          </div>

          <div style={{padding:"16px 16px 0",flex:1}}>

            {/* Mode tabs */}
            <FL label="Mode">
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {([
                  {id:"closing"   ,icon:"🏥",title:"Closing Ranks",   sub:"Which colleges can I get?"},
                  {id:"allotments",icon:"📋",title:"Past Allotments", sub:"Who got what near my rank?"},
                  {id:"seats"     ,icon:"💺",title:"Seat Matrix",     sub:"Available seats by specialty"},
                ] as {id:Mode;icon:string;title:string;sub:string}[]).map(m=>(
                  <button key={m.id} onClick={()=>{setMode(m.id);setSearched(false);setResults([]);}} style={{
                    display:"flex",alignItems:"center",gap:10,
                    padding:"9px 12px",borderRadius:9,cursor:"pointer",textAlign:"left",
                    border:mode===m.id?"2px solid #6366f1":"2px solid #e2e8f0",
                    background:mode===m.id?"#eef2ff":"#fafafa",
                    transition:"all .15s",
                  }}>
                    <span style={{fontSize:16,flexShrink:0}}>{m.icon}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:12,color:mode===m.id?"#4338ca":"#334155"}}>{m.title}</div>
                      <div style={{fontSize:10,color:"#94a3b8",marginTop:1}}>{m.sub}</div>
                    </div>
                    {mode===m.id&&<span style={{color:"#6366f1",fontSize:14,flexShrink:0}}>✓</span>}
                  </button>
                ))}
              </div>
            </FL>

            <Divider/>

            {mode!=="seats"&&(
              <FL label="Your NEET PG Rank" hint="Required">
                <input
                  type="number" min={1} value={rank}
                  onChange={e=>setRank(e.target.value)}
                  placeholder="e.g. 5000"
                  style={inp}
                  onFocus={e=>e.currentTarget.style.borderColor="#6366f1"}
                  onBlur={e=>e.currentTarget.style.borderColor="#e2e8f0"}
                />
                {rank&&(
                  <div style={{
                    marginTop:5,padding:"4px 10px",
                    background:"#eff6ff",borderRadius:6,
                    fontSize:11,color:"#1d4ed8",fontWeight:700,
                  }}>Rank: <b>{parseInt(rank).toLocaleString()}</b></div>
                )}
              </FL>
            )}

            {mode!=="seats"&&(
              <FL label="Category">
                <div style={{position:"relative"}}>
                  <select value={category} onChange={e=>setCategory(e.target.value)} style={sel}>
                    <option value="ALL">All Categories</option>
                    {CAT.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                  <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#94a3b8",fontSize:11}}>▾</span>
                </div>
              </FL>
            )}

            {mode!=="seats"&&(
              <FL label="Quota">
                <div style={{position:"relative"}}>
                  <select value={quota} onChange={e=>setQuota(e.target.value)} style={sel}>
                    <option value="ALL">All Quotas</option>
                    {QUOT.map(q=><option key={q} value={q}>{q}</option>)}
                  </select>
                  <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#94a3b8",fontSize:11}}>▾</span>
                </div>
              </FL>
            )}

            <FL label="Specialty">
              <div style={{position:"relative"}}>
                <select value={specialty} onChange={e=>setSpecialty(e.target.value)} style={sel}>
                  <option value="ALL">All Specialties</option>
                  {(mode==="seats"?seatSp:specialties).map(s=>(
                    <option key={s} value={s}>{SL[s]||s}</option>
                  ))}
                </select>
                <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#94a3b8",fontSize:11}}>▾</span>
              </div>
            </FL>

            <FL label="State / UT">
              <div style={{position:"relative"}}>
                <select value={stateVal} onChange={e=>setStateVal(e.target.value)} style={sel}>
                  <option value="ALL">All States</option>
                  {(mode==="seats"?seatSt:states).map(s=>(
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#94a3b8",fontSize:11}}>▾</span>
              </div>
            </FL>

            {/* tip */}
            <div style={{
              background:"#f0fdf4",border:"1px solid #bbf7d0",
              borderRadius:8,padding:"9px 11px",marginBottom:4,
              display:"flex",gap:7,
            }}>
              <span style={{fontSize:14,flexShrink:0}}>💡</span>
              <p style={{margin:0,color:"#166534",fontSize:11,lineHeight:1.5}}>
                {mode==="closing"&&"Uses 2025 round data, falls back to 2024 if unavailable."}
                {mode==="allotments"&&"Shows real allotments ±30% of your rank."}
                {mode==="seats"&&"From the official 2025 seat matrix."}
              </p>
            </div>
          </div>

          {/* Sticky bottom buttons */}
          <div style={{
            padding:"12px 16px",
            borderTop:"1px solid #e2e8f0",
            background:"#fff",
            flexShrink:0,
          }}>
            {dataError&&(
              <div style={{
                background:"#fef2f2",border:"1px solid #fca5a5",
                borderRadius:8,padding:"8px 10px",marginBottom:10,
                fontSize:11,color:"#991b1b",fontWeight:600,
              }}>⚠️ Could not load CSV files. Check /public/data/ path.</div>
            )}
            <button
              onClick={predict}
              disabled={!canPredict||searching}
              style={{
                width:"100%",padding:"13px",
                background:canPredict?"linear-gradient(135deg,#4338ca,#7c3aed)":"#e2e8f0",
                color:canPredict?"#fff":"#94a3b8",
                border:"none",borderRadius:11,
                fontSize:14,fontWeight:800,
                cursor:canPredict?"pointer":"not-allowed",
                boxShadow:canPredict?"0 4px 16px rgba(99,102,241,.35)":"none",
                transition:"all .2s",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              }}
              onMouseEnter={e=>{if(canPredict)(e.currentTarget as HTMLButtonElement).style.transform="translateY(-1px)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform="translateY(0)";}}
            >
              {searching?"⏳ Searching…":loading?"⏳ Loading data…":"🔍 Predict My Colleges"}
            </button>
            {searched&&(
              <button onClick={()=>{
                setResults([]);setSearched(false);setRank("");
                setCategory("GEN");setQuota("AIQ");setSpecialty("ALL");setStateVal("ALL");
              }} style={{
                width:"100%",marginTop:7,padding:"8px",
                background:"transparent",border:"1.5px solid #e2e8f0",
                borderRadius:9,color:"#64748b",fontSize:12,fontWeight:600,cursor:"pointer",
              }}>↺ Reset</button>
            )}
          </div>
        </div>

        {/* ══ RIGHT PANEL ═════════════════════════════════════════ */}
        <div className="right-panel" style={{
          flex:1,overflowY:"auto",
          display:"flex",flexDirection:"column",
          minWidth:0,
        }}>

          {/* ── Empty state ── */}
          {!searched&&(
            <div style={{
              flex:1,display:"flex",flexDirection:"column",
              alignItems:"center",justifyContent:"center",
              padding:"40px 24px",
              animation:"fadeUp .4s ease",
            }}>
              <div style={{
                width:100,height:100,borderRadius:"50%",
                background:"linear-gradient(135deg,#eef2ff,#f5f3ff)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:44,marginBottom:20,
                boxShadow:"0 8px 30px rgba(99,102,241,.15)",
              }}>🎯</div>
              <h3 style={{margin:"0 0 8px",fontSize:20,fontWeight:800,color:"#1e1b4b",textAlign:"center"}}>
                Results Appear Here
              </h3>
              <p style={{margin:"0 0 28px",color:"#64748b",fontSize:13,textAlign:"center",maxWidth:360,lineHeight:1.6}}>
                Choose a mode, set your filters on the left, and click <b>Predict My Colleges</b>.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:480,width:"100%"}}>
                {([
                  {icon:"🏥",title:"Closing Ranks",desc:"Colleges you can get",m:"closing"as Mode},
                  {icon:"📋",title:"Allotments",   desc:"Who got what near you",m:"allotments"as Mode},
                  {icon:"💺",title:"Seat Matrix",  desc:"Seats by specialty",m:"seats"as Mode},
                ]).map(c=>(
                  <div key={c.m} onClick={()=>setMode(c.m)} style={{
                    background:"#fff",border:mode===c.m?"2px solid #6366f1":"1.5px solid #e2e8f0",
                    borderRadius:12,padding:"14px 10px",cursor:"pointer",textAlign:"center",
                    transition:"all .15s",
                    boxShadow:mode===c.m?"0 4px 16px rgba(99,102,241,.15)":"0 1px 4px rgba(0,0,0,.05)",
                  }}>
                    <div style={{fontSize:24,marginBottom:6}}>{c.icon}</div>
                    <div style={{fontWeight:700,fontSize:12,color:"#1e1b4b",marginBottom:3}}>{c.title}</div>
                    <div style={{fontSize:10,color:"#94a3b8"}}>{c.desc}</div>
                  </div>
                ))}
              </div>

              {/* data stats */}
              <div style={{display:"flex",gap:24,marginTop:36,flexWrap:"wrap",justifyContent:"center"}}>
                {[["4,200+","Allotments"],["14,500+","Closing Ranks"],["500+","Colleges"],["90+","Specialties"]].map(([v,l])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontSize:18,fontWeight:900,color:"#4338ca"}}>{v}</div>
                    <div style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Results ── */}
          {searched&&(
            <div style={{flex:1,display:"flex",flexDirection:"column",padding:"18px 20px",minHeight:0}}>

              {/* Results header */}
              <div style={{
                display:"flex",justifyContent:"space-between",
                alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:10,flexShrink:0,
              }}>
                <div>
                  <h2 style={{margin:"0 0 2px",fontSize:18,fontWeight:800,color:"#1e1b4b"}}>
                    {results.length>0?`${results.length} colleges found`:"No colleges found"}
                    {shown.length!==results.length&&` (showing ${shown.length})`}
                  </h2>
                  {rank&&mode!=="seats"&&(
                    <p style={{margin:0,fontSize:12,color:"#64748b"}}>
                      Rank <b style={{color:"#4338ca"}}>{parseInt(rank).toLocaleString()}</b>
                      {" · "}<b>{category}</b>{" · "}<b>{quota}</b>
                      {stateVal!=="ALL"&&<> · <b>{stateVal}</b></>}
                      {specialty!=="ALL"&&<> · <b>{SL[specialty]||specialty}</b></>}
                    </p>
                  )}
                </div>

                {/* View toggle */}
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontSize:11,color:"#94a3b8",fontWeight:600}}>View:</span>
                  {(["grid","list"] as ViewMode[]).map(v=>(
                    <button key={v} onClick={()=>setViewMode(v)} style={{
                      padding:"5px 12px",borderRadius:7,cursor:"pointer",
                      border:viewMode===v?"2px solid #6366f1":"1.5px solid #e2e8f0",
                      background:viewMode===v?"#eef2ff":"#fff",
                      color:viewMode===v?"#4338ca":"#64748b",
                      fontWeight:700,fontSize:11,transition:"all .15s",
                    }}>{v==="grid"?"⊞ Grid":"☰ List"}</button>
                  ))}
                </div>
              </div>

              {/* Summary strip */}
              <Strip results={results} mode={mode}/>

              {/* Filter bar */}
              {results.length>0&&(
                <div style={{
                  display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",
                  alignItems:"center",flexShrink:0,
                }}>
                  <input
                    type="text" value={qFilter}
                    onChange={e=>setQFilter(e.target.value)}
                    placeholder="🔍 Filter by college or specialty…"
                    style={{...inp,flex:"1 1 200px",fontSize:12,padding:"8px 12px"}}
                  />
                  {mode==="closing"&&(
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {(["ALL","Very High","High","Moderate","Low"] as (Chance|"ALL")[]).map(key=>{
                        const m = key!=="ALL"?CM[key as Chance]:null;
                        const active = cFilter===key;
                        return (
                          <button key={key} onClick={()=>setCFilter(key)} style={{
                            padding:"5px 11px",borderRadius:7,cursor:"pointer",
                            border:`1.5px solid ${active?(m?.dot??"#6366f1"):"#e2e8f0"}`,
                            background:active?(m?.bg??"#eef2ff"):"#fff",
                            color:active?(m?.text??"#4338ca"):"#64748b",
                            fontWeight:active?700:500,fontSize:11,transition:"all .15s",
                          }}>{key==="ALL"?"All":key}</button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Empty filter state */}
              {shown.length===0&&(
                <div style={{textAlign:"center",padding:"50px 0",color:"#94a3b8",flex:1}}>
                  <div style={{fontSize:40,marginBottom:10}}>🔭</div>
                  <p style={{fontWeight:700,fontSize:15,color:"#334155",margin:"0 0 6px"}}>No matches</p>
                  <p style={{fontSize:12,margin:0}}>Try adjusting filters or clearing the search box.</p>
                </div>
              )}

              {/* CARD GRID */}
              <div
                className={viewMode==="grid"?"grid-view":"list-view"}
                style={{flex:1,overflowY:"auto",paddingBottom:20}}
              >
                {mode==="closing"   &&shown.map((r,i)=><CRCard    key={i} row={r as CRRow}   idx={i}/>)}
                {mode==="allotments"&&shown.map((r,i)=><AllotCard key={i} row={r as CSVRow}  idx={i}/>)}
                {mode==="seats"     &&shown.map((r,i)=><SeatCard  key={i} row={r as CSVRow}  idx={i}/>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegePredictorPage;