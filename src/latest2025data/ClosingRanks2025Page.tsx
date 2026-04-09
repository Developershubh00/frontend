// import React from "react";
// import { ArrowLeft, Clock } from "lucide-react";

// interface ClosingRanks2025PageProps {
//   onBack: () => void;
// }

// /**
//  * ClosingRanks2025Page
//  *
//  * Currently shows "Coming Soon" while 2025 data is being prepared.
//  *
//  * WHEN 2025 DATA IS READY:
//  * Replace the content inside the white card below with the full
//  * ClossingRanksPage table logic, pointing to your 2025 CSV/API.
//  * Keep the header and onBack button unchanged.
//  */
// const ClosingRanks2025Page: React.FC<ClosingRanks2025PageProps> = ({
//   onBack,
// }) => {
//   return (
//     <div className="flex min-h-screen bg-gray-50 flex-col">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={onBack}
//             className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//           </button>
//           <div>
//             <h1 className="text-lg font-semibold">Closing Ranks</h1>
//             <p className="text-xs text-purple-100">2025 Session</p>
//           </div>
//         </div>
//       </div>

//       {/* Coming Soon */}
//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center max-w-md w-full">
//           <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-5">
//             <Clock className="w-10 h-10 text-purple-500" />
//           </div>
//           <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full mb-4">
//             <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
//             <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
//               Coming Soon
//             </span>
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mb-3">
//             2025 Closing Ranks Data
//           </h2>
//           <p className="text-gray-500 text-sm leading-relaxed mb-6">
//             2025 closing ranks will be available here once all counselling
//             rounds are completed and officially published by MCC.
//           </p>
//           <div className="flex justify-center gap-1.5 mb-6">
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
//                 style={{ animationDelay: `${i * 0.18}s` }}
//               />
//             ))}
//           </div>
//           <button
//             onClick={onBack}
//             className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors text-sm"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClosingRanks2025Page;

// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft, Search, Eye, EyeOff, X, Filter,
//   ChevronDown, ChevronLeft as PrevIcon, ChevronRight as NextIcon,
// } from "lucide-react";

// interface ClosingRanks2025PageProps { onBack: () => void; }

// interface RanksData {
//   "Alloted Quota": string; "Alloted Category": string; State: string;
//   College: string; Course: string; "Course Fee": number;
//   "2025 R1": string; "2025 R2": string; "2025 R3": string;
//   "2025 R4": string; "2025 R5": string;
// }

// interface ColVis {
//   "Alloted Quota": boolean; "Alloted Category": boolean; State: boolean;
//   College: boolean; Course: boolean; "Course Fee": boolean;
//   "2025 R1": boolean; "2025 R2": boolean; "2025 R3": boolean;
//   "2025 R4": boolean; "2025 R5": boolean;
// }

// /**
//  * ClosingRanks2025Page
//  * Reads from /data/closingranks2025.csv
//  * Expected CSV columns (header row required):
//  * Alloted Quota, Alloted Category, State, College, Course, Course Fee,
//  * 2025 R1, 2025 R2, 2025 R3, 2025 R4, 2025 R5
//  */

// const CustomSelect: React.FC<{
//   value: string; onChange: (v: string) => void;
//   options: string[]; allLabel: string;
// }> = ({ value, onChange, options, allLabel }) => {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div className="relative min-w-[150px]">
//       <button onClick={() => setOpen(!open)}
//         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-left flex items-center justify-between">
//         <span className="text-gray-700 truncate">{value === "all" ? allLabel : value}</span>
//         <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>
//       {open && (
//         <>
//           <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
//           <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
//             <div className="p-2 border-b">
//               <input type="text" placeholder="Search..." value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 onClick={e => e.stopPropagation()}
//                 className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none" />
//             </div>
//             <div className="overflow-y-auto max-h-48">
//               {filtered.map(opt => (
//                 <div key={opt} onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
//                   className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-50 ${value === opt ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}>
//                   {opt === "all" ? allLabel : opt}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const ClosingRanks2025Page: React.FC<ClosingRanks2025PageProps> = ({ onBack }) => {
//   const [ranksData, setRanksData] = useState<RanksData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dataError, setDataError] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selState, setSelState] = useState("all");
//   const [selQuota, setSelQuota] = useState("all");
//   const [selCategory, setSelCategory] = useState("all");
//   const [selCourse, setSelCourse] = useState("all");
//   const [page, setPage] = useState(1);
//   const [showAdv, setShowAdv] = useState(false);
//   const [showColModal, setShowColModal] = useState(false);
//   const [minFee, setMinFee] = useState("");
//   const [maxFee, setMaxFee] = useState("");
//   const [minRank, setMinRank] = useState("");
//   const [maxRank, setMaxRank] = useState("");
//   const [selRound, setSelRound] = useState<string>("all");

//   const [colVis, setColVis] = useState<ColVis>({
//     "Alloted Quota": true, "Alloted Category": true, State: true,
//     College: true, Course: true, "Course Fee": true,
//     "2025 R1": true, "2025 R2": true, "2025 R3": true,
//     "2025 R4": true, "2025 R5": true,
//   });

//   const colDefs = [
//     { key: "Alloted Quota", label: "Alloted Quota" },
//     { key: "Alloted Category", label: "Alloted Category" },
//     { key: "State", label: "State" },
//     { key: "College", label: "College" },
//     { key: "Course", label: "Course" },
//     { key: "Course Fee", label: "Course Fee" },
//     { key: "2025 R1", label: "2025 Round 1" },
//     { key: "2025 R2", label: "2025 Round 2" },
//     { key: "2025 R3", label: "2025 Round 3" },
//     { key: "2025 R4", label: "2025 Round 4" },
//     { key: "2025 R5", label: "2025 Round 5" },
//   ] as { key: keyof ColVis; label: string }[];

//   const toggleCol = (k: keyof ColVis) => setColVis(p => ({ ...p, [k]: !p[k] }));
//   const showAll = () => setColVis(Object.keys(colVis).reduce((a, k) => ({ ...a, [k]: true }), {} as ColVis));
//   const hideAll = () => setColVis(Object.keys(colVis).reduce((a, k) => ({ ...a, [k]: k === "College" || k === "Course" }), {} as ColVis));

//   const filterByRound = (r: string) => {
//     setSelRound(r);
//     const nv = { ...colVis };
//     ["2025 R1","2025 R2","2025 R3","2025 R4","2025 R5"].forEach(k => { nv[k as keyof ColVis] = false; });
//     if (r === "all") { ["2025 R1","2025 R2","2025 R3","2025 R4","2025 R5"].forEach(k => { nv[k as keyof ColVis] = true; }); }
//     else { nv[`2025 R${r}` as keyof ColVis] = true; }
//     setColVis(nv);
//   };

//   const parseCSV = (text: string): RanksData[] => {
//     if (text.includes("<html") || text.includes("<!DOCTYPE")) throw new Error("HTML received");
//     const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
//     if (lines.length < 2) throw new Error("No data");
//     return lines.slice(1).map(line => {
//       const vals: string[] = []; let cur = ""; let inQ = false;
//       for (const ch of line) {
//         if (ch === '"') inQ = !inQ;
//         else if (ch === "," && !inQ) { vals.push(cur.trim()); cur = ""; }
//         else cur += ch;
//       }
//       vals.push(cur.trim());
//       const v = vals.map(x => x.replace(/^"(.*)"$/, "$1").trim());
//       const num = (s: string) => { const n = parseFloat(s.replace(/[^0-9.-]/g,"")); return isNaN(n)?0:n; };
//       return {
//         "Alloted Quota": v[0]||"", "Alloted Category": v[1]||"",
//         State: v[2]||"", College: v[3]||"", Course: v[4]||"",
//         "Course Fee": num(v[5]),
//         "2025 R1": v[6]||"", "2025 R2": v[7]||"", "2025 R3": v[8]||"",
//         "2025 R4": v[9]||"", "2025 R5": v[10]||"",
//       };
//     });
//   };

//   useEffect(() => {
//     fetch("/data/closingranks2025.csv")
//       .then(r => { if (!r.ok) throw new Error(); return r.text(); })
//       .then(t => { setRanksData(parseCSV(t)); setDataError(false); })
//       .catch(() => { setDataError(true); setRanksData([]); })
//       .finally(() => setLoading(false));
//   }, []);

//   const states = ["all", ...Array.from(new Set(ranksData.map(d => d.State)))];
//   const quotas = ["all", ...Array.from(new Set(ranksData.map(d => d["Alloted Quota"])))];
//   const categories = ["all", ...Array.from(new Set(ranksData.map(d => d["Alloted Category"])))];
//   const courses = ["all", ...Array.from(new Set(ranksData.map(d => d.Course)))];

//   const filtered = ranksData.filter(item => {
//     const s = searchTerm.toLowerCase();
//     const ms = item.College.toLowerCase().includes(s) || item.State.toLowerCase().includes(s) ||
//       item.Course.toLowerCase().includes(s) || item["Alloted Quota"].toLowerCase().includes(s) ||
//       item["Alloted Category"].toLowerCase().includes(s);
//     const mf = (!minFee || item["Course Fee"] >= parseFloat(minFee)) && (!maxFee || item["Course Fee"] <= parseFloat(maxFee));
//     const allRanks = [item["2025 R1"],item["2025 R2"],item["2025 R3"],item["2025 R4"],item["2025 R5"]]
//       .map(r => { const m=r.match(/\d+/); return m?parseInt(m[0]):0; }).filter(r=>r>0);
//     const minRV = allRanks.length ? Math.min(...allRanks) : 0;
//     const maxRV = allRanks.length ? Math.max(...allRanks) : 0;
//     const mr = (!minRank || maxRV >= parseFloat(minRank)) && (!maxRank || minRV <= parseFloat(maxRank));
//     return ms && mf && mr &&
//       (selState==="all"||item.State===selState) && (selQuota==="all"||item["Alloted Quota"]===selQuota) &&
//       (selCategory==="all"||item["Alloted Category"]===selCategory) && (selCourse==="all"||item.Course===selCourse);
//   });

//   const PER_PAGE = 50;
//   const totalPages = Math.ceil(filtered.length / PER_PAGE);
//   const paged = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

//   const clearAll = () => {
//     setSearchTerm(""); setSelState("all"); setSelQuota("all"); setSelCategory("all");
//     setSelCourse("all"); setMinFee(""); setMaxFee(""); setMinRank(""); setMaxRank("");
//     setSelRound("all"); setPage(1); showAll();
//   };

//   const fmt = (n: number) => {
//     if (n===0) return "N/A";
//     if (n>=10000000) return "₹"+(n/10000000).toFixed(2)+" Cr";
//     if (n>=100000) return "₹"+(n/100000).toFixed(2)+" L";
//     if (n>=1000) return "₹"+(n/1000).toFixed(2)+" K";
//     return "₹"+n.toLocaleString();
//   };

//   if (loading) return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//         <p className="text-slate-600">Loading 2025 Closing Ranks Data...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {showColModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="text-lg font-semibold">Show/Hide Columns</h3>
//               <button onClick={() => setShowColModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
//             </div>
//             <div className="p-4">
//               <div className="flex gap-2 mb-4">
//                 <button onClick={showAll} className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg">Show All</button>
//                 <button onClick={hideAll} className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg">Hide All</button>
//               </div>
//               <div className="space-y-2 max-h-96 overflow-y-auto">
//                 {colDefs.map(({ key, label }) => (
//                   <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
//                     <label className="flex items-center cursor-pointer flex-1">
//                       <input type="checkbox" checked={colVis[key]} onChange={() => toggleCol(key)} className="w-4 h-4 text-purple-600 border-gray-300 rounded" />
//                       <span className="ml-3 text-sm text-gray-700">{label}</span>
//                     </label>
//                     {colVis[key] ? <Eye className="w-4 h-4 text-blue-500"/> : <EyeOff className="w-4 h-4 text-gray-400"/>}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-end p-4 border-t bg-gray-50">
//               <button onClick={() => setShowColModal(false)} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg">Apply</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex-1 flex flex-col">
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button onClick={onBack} className="p-1.5 hover:bg-white/20 rounded-lg"><ArrowLeft className="w-4 h-4" /></button>
//               <div>
//                 <h1 className="text-lg font-semibold">Closing Ranks</h1>
//                 <p className="text-xs text-purple-100">2025 Session</p>
//               </div>
//             </div>
//             <span className="hidden md:block text-xs text-purple-100">{filtered.length} Records</span>
//           </div>
//         </div>

//         {dataError && (
//           <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-700 text-center">
//             ⚠️ 2025 data not yet available. Add <code>/data/closingranks2025.csv</code> to enable this page.
//           </div>
//         )}

//         {/* Category pills + Round filter + Show/Hide */}
//         <div className="bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex items-center gap-2 overflow-x-auto">
//             {categories.filter(c => c !== "all").slice(0,6).map(cat => (
//               <button key={cat} onClick={() => { setSelCategory(cat); setPage(1); }}
//                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selCategory===cat?"bg-purple-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
//                 {cat}
//               </button>
//             ))}
//             <button onClick={() => { setSelCategory("all"); setPage(1); }}
//               className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selCategory==="all"?"bg-pink-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
//               All Categories
//             </button>
//             <button onClick={() => setShowColModal(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 ml-2 whitespace-nowrap">
//               <Eye className="w-4 h-4" /> Show/Hide
//             </button>
//             <div className="flex items-center gap-2 ml-2 border-l pl-2">
//               {["1","2","3","4","5"].map(r => (
//                 <button key={r} onClick={() => filterByRound(r)}
//                   className={`px-3 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selRound===r?"bg-blue-600 text-white":"bg-blue-100 text-blue-700 hover:bg-blue-200"}`}>
//                   R{r}
//                 </button>
//               ))}
//               <button onClick={() => filterByRound("all")}
//                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selRound==="all"?"bg-gray-700 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
//                 All
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
//           <div className="flex flex-col md:flex-row gap-3">
//             <div className="flex-1 relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input type="text" placeholder="Search colleges, states, courses..." value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               <CustomSelect value={selState} onChange={v => { setSelState(v); setPage(1); }} options={states} allLabel="All States" />
//               <CustomSelect value={selQuota} onChange={v => { setSelQuota(v); setPage(1); }} options={quotas} allLabel="All Quotas" />
//               <button onClick={() => setShowAdv(!showAdv)} className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200">
//                 <Filter className="w-4 h-4" /> {showAdv?"Hide":"Show"} Filters
//                 <ChevronDown className={`w-4 h-4 transition-transform ${showAdv?"rotate-180":""}`} />
//               </button>
//             </div>
//           </div>
//           {showAdv && (
//             <div className="border-t pt-3">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
//                 <CustomSelect value={selCourse} onChange={v => { setSelCourse(v); setPage(1); }} options={courses} allLabel="All Courses" />
//                 <div className="flex gap-2">
//                   <input type="number" placeholder="Min Fee" value={minFee} onChange={e => { setMinFee(e.target.value); setPage(1); }} className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm" />
//                   <input type="number" placeholder="Max Fee" value={maxFee} onChange={e => { setMaxFee(e.target.value); setPage(1); }} className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm" />
//                 </div>
//                 <div className="flex gap-2">
//                   <input type="number" placeholder="Min Rank" value={minRank} onChange={e => { setMinRank(e.target.value); setPage(1); }} className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm" />
//                   <input type="number" placeholder="Max Rank" value={maxRank} onChange={e => { setMaxRank(e.target.value); setPage(1); }} className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm" />
//                 </div>
//                 <button onClick={clearAll} className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">Clear All Filters</button>
//               </div>
//               <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mt-3">
//                 <span className="font-medium text-purple-600">{filtered.length}</span><span className="ml-1">filtered results</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
//               <tr>
//                 {colVis["Alloted Quota"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Quota</th>}
//                 {colVis["Alloted Category"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Category</th>}
//                 {colVis.State && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">State</th>}
//                 {colVis.College && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">College</th>}
//                 {colVis.Course && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Course</th>}
//                 {colVis["Course Fee"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Fee</th>}
//                 {colVis["2025 R1"] && <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase">2025 R1</th>}
//                 {colVis["2025 R2"] && <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase">2025 R2</th>}
//                 {colVis["2025 R3"] && <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase">2025 R3</th>}
//                 {colVis["2025 R4"] && <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase">2025 R4</th>}
//                 {colVis["2025 R5"] && <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase">2025 R5</th>}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {paged.length === 0 ? (
//                 <tr><td colSpan={Object.values(colVis).filter(Boolean).length} className="px-6 py-12 text-center text-gray-500">
//                   {dataError ? "2025 CSV not found — add /data/closingranks2025.csv to enable this page." : "No data found. Try adjusting your filters."}
//                 </td></tr>
//               ) : paged.map((item, i) => (
//                 <tr key={i} className="hover:bg-purple-50 transition-colors">
//                   {colVis["Alloted Quota"] && <td className="px-2 py-2 text-center text-xs"><span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">{item["Alloted Quota"]}</span></td>}
//                   {colVis["Alloted Category"] && <td className="px-2 py-2 text-center text-xs"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">{item["Alloted Category"]}</span></td>}
//                   {colVis.State && <td className="px-2 py-2 text-center text-xs text-gray-700">{item.State}</td>}
//                   {colVis.College && <td className="px-2 py-2 text-left text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">{item.College}</td>}
//                   {colVis.Course && <td className="px-2 py-2 text-left text-xs text-gray-700">{item.Course}</td>}
//                   {colVis["Course Fee"] && <td className="px-2 py-2 text-center text-xs font-bold text-blue-700">{fmt(item["Course Fee"])}</td>}
//                   {colVis["2025 R1"] && <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{item["2025 R1"]||"-"}</td>}
//                   {colVis["2025 R2"] && <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{item["2025 R2"]||"-"}</td>}
//                   {colVis["2025 R3"] && <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{item["2025 R3"]||"-"}</td>}
//                   {colVis["2025 R4"] && <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{item["2025 R4"]||"-"}</td>}
//                   {colVis["2025 R5"] && <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{item["2025 R5"]||"-"}</td>}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="bg-white border-t border-gray-200 px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="text-xs text-gray-600">
//               Showing {filtered.length>0?(page-1)*PER_PAGE+1:0} to {Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}
//             </div>
//             <div className="flex items-center space-x-1">
//               <button onClick={() => setPage(Math.max(1,page-1))} disabled={page===1} className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"><PrevIcon className="w-3 h-3"/></button>
//               <div className="flex space-x-1">
//                 {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
//                   const n = totalPages<=5?i+1:Math.max(1,page-2)+i;
//                   if(n>totalPages) return null;
//                   return <button key={n} onClick={()=>setPage(n)} className={`px-2 py-1 text-xs rounded ${page===n?"bg-purple-500 text-white":"border border-gray-300 text-black hover:bg-gray-50"}`}>{n}</button>;
//                 })}
//               </div>
//               <button onClick={() => setPage(Math.min(totalPages,page+1))} disabled={page===totalPages||totalPages===0} className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"><NextIcon className="w-3 h-3"/></button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClosingRanks2025Page;

import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft, Search, Eye, EyeOff, X, Filter,
  ChevronDown, ChevronLeft as PrevIcon, ChevronRight as NextIcon,
} from "lucide-react";

interface ClosingRanks2025PageProps { onBack: () => void; }

interface RanksData {
  Quota: string;
  Category: string;
  State: string;
  Institute: string;
  Course: string;
  Fee: number;
  Stipend_Year_1: number;
  Bond_Years: number;
  Bond_Penalty: number;
  Beds: number;
  "CR 2023 1": string; "CR 2023 2": string; "CR 2023 3": string; "CR 2023 4": string; "CR 2023 5": string;
  "CR 2024 1": string; "CR 2024 2": string; "CR 2024 3": string; "CR 2024 4": string; "CR 2024 5": string;
  "CR 2025 1": string; "CR 2025 2": string; "CR 2025 3": string; "CR 2025 4": string;
}

type ColKey =
  | "Quota" | "Category" | "State" | "Institute" | "Course"
  | "Fee" | "Stipend_Year_1" | "Bond_Years" | "Bond_Penalty" | "Beds"
  | "CR 2023 1" | "CR 2023 2" | "CR 2023 3" | "CR 2023 4" | "CR 2023 5"
  | "CR 2024 1" | "CR 2024 2" | "CR 2024 3" | "CR 2024 4" | "CR 2024 5"
  | "CR 2025 1" | "CR 2025 2" | "CR 2025 3" | "CR 2025 4";

type ColVis = Record<ColKey, boolean>;

const COL_DEFS: { key: ColKey; label: string }[] = [
  { key: "Quota",          label: "Quota" },
  { key: "Category",       label: "Category" },
  { key: "State",          label: "State" },
  { key: "Institute",      label: "Institute" },
  { key: "Course",         label: "Course" },
  { key: "Fee",            label: "Fee" },
  { key: "Stipend_Year_1", label: "Stipend Y1" },
  { key: "Bond_Years",     label: "Bond Yrs" },
  { key: "Bond_Penalty",   label: "Bond Penalty" },
  { key: "Beds",           label: "Beds" },
  { key: "CR 2023 1",      label: "2023 R1" },
  { key: "CR 2023 2",      label: "2023 R2" },
  { key: "CR 2023 3",      label: "2023 R3" },
  { key: "CR 2023 4",      label: "2023 R4" },
  { key: "CR 2023 5",      label: "2023 R5" },
  { key: "CR 2024 1",      label: "2024 R1" },
  { key: "CR 2024 2",      label: "2024 R2" },
  { key: "CR 2024 3",      label: "2024 R3" },
  { key: "CR 2024 4",      label: "2024 R4" },
  { key: "CR 2024 5",      label: "2024 R5" },
  { key: "CR 2025 1",      label: "2025 R1" },
  { key: "CR 2025 2",      label: "2025 R2" },
  { key: "CR 2025 3",      label: "2025 R3" },
  { key: "CR 2025 4",      label: "2025 R4" },
];

const DEFAULT_VIS: ColVis = {
  Quota: true, Category: true, State: true, Institute: true, Course: true,
  Fee: true, Stipend_Year_1: false, Bond_Years: false, Bond_Penalty: false, Beds: false,
  "CR 2023 1": false, "CR 2023 2": false, "CR 2023 3": false, "CR 2023 4": false, "CR 2023 5": false,
  "CR 2024 1": false, "CR 2024 2": false, "CR 2024 3": false, "CR 2024 4": false, "CR 2024 5": false,
  "CR 2025 1": true,  "CR 2025 2": true,  "CR 2025 3": true,  "CR 2025 4": true,
};

// ── Custom searchable select ───────────────────────────────────────────────
const CustomSelect: React.FC<{
  value: string; onChange: (v: string) => void;
  options: string[]; allLabel: string;
}> = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="relative min-w-[150px]">
      <button onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-left flex items-center justify-between">
        <span className="text-gray-700 truncate">{value === "all" ? allLabel : value}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b">
              <input type="text" placeholder="Search..." value={search}
                onChange={e => setSearch(e.target.value)}
                onClick={e => e.stopPropagation()}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none" />
            </div>
            <div className="overflow-y-auto max-h-48">
              {filtered.map(opt => (
                <div key={opt} onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-50 ${value === opt ? "bg-purple-100 text-purple-700" : "text-gray-700"}`}>
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
  if (!val || val === "-") return <span className="text-gray-300">—</span>;
  const rank = parseInt(val.replace(/[^0-9]/g, ""));
  const color =
    rank <= 500   ? "text-blue-600 font-bold" :
    rank <= 2000  ? "text-blue-600 font-semibold" :
    rank <= 5000  ? "text-amber-600" :
    "text-gray-500";
  return <span className={`text-xs ${color}`}>{val}</span>;
};

// ── Main component ─────────────────────────────────────────────────────────
const ClosingRanks2025Page: React.FC<ClosingRanks2025PageProps> = ({ onBack }) => {
  const [data, setData]         = useState<RanksData[]>([]);
  const [loading, setLoading]   = useState(true);
  const [dataError, setDataError] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selState,    setSelState]    = useState("all");
  const [selQuota,    setSelQuota]    = useState("all");
  const [selCategory, setSelCategory] = useState("all");
  const [selCourse,   setSelCourse]   = useState("all");
  const [minFee,  setMinFee]  = useState("");
  const [maxFee,  setMaxFee]  = useState("");
  const [minRank, setMinRank] = useState("");
  const [maxRank, setMaxRank] = useState("");
  const [selYear,  setSelYear]  = useState<"all"|"2023"|"2024"|"2025">("all");
  const [selRound, setSelRound] = useState<"all"|"1"|"2"|"3"|"4"|"5">("all");

  // UI state
  const [page,         setPage]         = useState(1);
  const [showAdv,      setShowAdv]      = useState(false);
  const [showColModal, setShowColModal] = useState(false);
  const [colVis,       setColVis]       = useState<ColVis>(DEFAULT_VIS);

  const PER_PAGE = 50;

  const toggleCol = (k: ColKey) => setColVis(p => ({ ...p, [k]: !p[k] }));
  const showAll   = () => setColVis(COL_DEFS.reduce((a, { key }) => ({ ...a, [key]: true }), {} as ColVis));
  const hideAll   = () => setColVis(COL_DEFS.reduce((a, { key }) => ({ ...a, [key]: key === "Institute" || key === "Course" }), {} as ColVis));

  // Year/round pill → update column visibility
  const applyYearRound = (year: "all"|"2023"|"2024"|"2025", round: "all"|"1"|"2"|"3"|"4"|"5") => {
    setSelYear(year);
    setSelRound(round);
    const nv = { ...colVis };
    const allRankCols: ColKey[] = [
      "CR 2023 1","CR 2023 2","CR 2023 3","CR 2023 4","CR 2023 5",
      "CR 2024 1","CR 2024 2","CR 2024 3","CR 2024 4","CR 2024 5",
      "CR 2025 1","CR 2025 2","CR 2025 3","CR 2025 4",
    ];
    allRankCols.forEach(k => { nv[k] = false; });

    if (year === "all" && round === "all") {
      // Show only latest year by default to avoid too many columns
      (["CR 2025 1","CR 2025 2","CR 2025 3","CR 2025 4"] as ColKey[]).forEach(k => { nv[k] = true; });
    } else {
      const years: ("2023"|"2024"|"2025")[] = year === "all" ? ["2023","2024","2025"] : [year];
      const maxRounds: Record<string, number> = { "2023": 5, "2024": 5, "2025": 4 };
      years.forEach(y => {
        const rounds = round === "all"
          ? Array.from({ length: maxRounds[y] }, (_, i) => String(i + 1))
          : [round].filter(r => parseInt(r) <= maxRounds[y]);
        rounds.forEach(r => {
          const k = `CR ${y} ${r}` as ColKey;
          if (k in nv) nv[k] = true;
        });
      });
    }
    setColVis(nv);
  };

  // ── CSV parser ─────────────────────────────────────────────────────────
  const parseCSV = (text: string): RanksData[] => {
    if (text.includes("<html") || text.includes("<!DOCTYPE")) throw new Error("HTML");
    const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) throw new Error("No data");

    return lines.slice(1).map(line => {
      const vals: string[] = []; let cur = ""; let inQ = false;
      for (const ch of line) {
        if (ch === '"') inQ = !inQ;
        else if (ch === "," && !inQ) { vals.push(cur.trim()); cur = ""; }
        else cur += ch;
      }
      vals.push(cur.trim());
      const v = vals.map(x => x.replace(/^"(.*)"$/, "$1").trim());
      const num = (s: string) => { const n = parseFloat(s.replace(/[^0-9.-]/g, "")); return isNaN(n) ? 0 : n; };

      return {
        Quota:          v[0]  || "",
        Category:       v[1]  || "",
        State:          v[2]  || "",
        Institute:      v[3]  || "",
        Course:         v[4]  || "",
        Fee:            num(v[5]),
        Stipend_Year_1: num(v[6]),
        Bond_Years:     num(v[7]),
        Bond_Penalty:   num(v[8]),
        Beds:           parseInt(v[9]) || 0,
        "CR 2023 1":    v[10] || "",
        "CR 2023 2":    v[11] || "",
        "CR 2023 3":    v[12] || "",
        "CR 2023 4":    v[13] || "",
        "CR 2023 5":    v[14] || "",
        "CR 2024 1":    v[15] || "",
        "CR 2024 2":    v[16] || "",
        "CR 2024 3":    v[17] || "",
        "CR 2024 4":    v[18] || "",
        "CR 2024 5":    v[19] || "",
        "CR 2025 1":    v[20] || "",
        "CR 2025 2":    v[21] || "",
        "CR 2025 3":    v[22] || "",
        "CR 2025 4":    v[23] || "",
      };
    });
  };

  useEffect(() => {
    fetch("/data/closingranks2025.csv")
      .then(r => { if (!r.ok) throw new Error(); return r.text(); })
      .then(t => { setData(parseCSV(t)); setDataError(false); })
      .catch(() => { setDataError(true); setData([]); })
      .finally(() => setLoading(false));
  }, []);

  // ── Derived filter options ─────────────────────────────────────────────
  const states     = useMemo(() => ["all", ...Array.from(new Set(data.map(d => d.State).filter(Boolean))).sort()], [data]);
  const quotas     = useMemo(() => ["all", ...Array.from(new Set(data.map(d => d.Quota).filter(Boolean))).sort()], [data]);
  const categories = useMemo(() => ["all", ...Array.from(new Set(data.map(d => d.Category).filter(Boolean))).sort()], [data]);
  const courses    = useMemo(() => ["all", ...Array.from(new Set(data.map(d => d.Course).filter(Boolean))).sort()], [data]);

  // ── Filtering ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();
    return data.filter(item => {
      if (selQuota    !== "all" && item.Quota    !== selQuota)    return false;
      if (selCategory !== "all" && item.Category !== selCategory) return false;
      if (selState    !== "all" && item.State    !== selState)    return false;
      if (selCourse   !== "all" && item.Course   !== selCourse)   return false;
      if (minFee && item.Fee < parseFloat(minFee)) return false;
      if (maxFee && item.Fee > parseFloat(maxFee)) return false;

      if (minRank || maxRank) {
        const rankCols: ColKey[] = [
          "CR 2023 1","CR 2023 2","CR 2023 3","CR 2023 4","CR 2023 5",
          "CR 2024 1","CR 2024 2","CR 2024 3","CR 2024 4","CR 2024 5",
          "CR 2025 1","CR 2025 2","CR 2025 3","CR 2025 4",
        ];
        const ranks = rankCols
          .map(k => { const m = item[k].match(/\d+/); return m ? parseInt(m[0]) : null; })
          .filter((r): r is number => r !== null && r > 0);
        if (ranks.length === 0) return false;
        const minR = Math.min(...ranks);
        const maxR = Math.max(...ranks);
        if (minRank && maxR < parseFloat(minRank)) return false;
        if (maxRank && minR > parseFloat(maxRank)) return false;
      }

      if (s) {
        const hay = `${item.Institute} ${item.Course} ${item.State} ${item.Quota} ${item.Category}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [data, selQuota, selCategory, selState, selCourse, minFee, maxFee, minRank, maxRank, searchTerm]);

  useEffect(() => { setPage(1); }, [selQuota, selCategory, selState, selCourse, minFee, maxFee, minRank, maxRank, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearAll = () => {
    setSearchTerm(""); setSelState("all"); setSelQuota("all"); setSelCategory("all");
    setSelCourse("all"); setMinFee(""); setMaxFee(""); setMinRank(""); setMaxRank("");
    setSelYear("all"); setSelRound("all"); setPage(1);
    setColVis(DEFAULT_VIS);
  };

  const fmt = (n: number) => {
    if (n === 0) return "N/A";
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
    if (n >= 1000)     return `₹${(n / 1000).toFixed(2)} K`;
    return `₹${n.toLocaleString()}`;
  };

  const visibleCols = COL_DEFS.filter(({ key }) => colVis[key]);

  // ── Year/round selector config ─────────────────────────────────────────
  const years = ["2023", "2024", "2025"] as const;
  const roundsFor = (y: string) => y === "2025" ? ["1","2","3","4"] : ["1","2","3","4","5"];

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Loading Closing Ranks Data...</p>
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
              <h3 className="text-lg font-semibold">Show/Hide Columns</h3>
              <button onClick={() => setShowColModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button onClick={showAll} className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">Show All</button>
                <button onClick={hideAll} className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Hide All</button>
              </div>
              {/* Group columns visually */}
              {[
                { label: "Basic Info", keys: ["Quota","Category","State","Institute","Course","Fee","Stipend_Year_1","Bond_Years","Bond_Penalty","Beds"] as ColKey[] },
                { label: "2023 Closing Ranks", keys: ["CR 2023 1","CR 2023 2","CR 2023 3","CR 2023 4","CR 2023 5"] as ColKey[] },
                { label: "2024 Closing Ranks", keys: ["CR 2024 1","CR 2024 2","CR 2024 3","CR 2024 4","CR 2024 5"] as ColKey[] },
                { label: "2025 Closing Ranks", keys: ["CR 2025 1","CR 2025 2","CR 2025 3","CR 2025 4"] as ColKey[] },
              ].map(group => (
                <div key={group.label} className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1 px-2">{group.label}</p>
                  {group.keys.map(key => {
                    const def = COL_DEFS.find(d => d.key === key)!;
                    return (
                      <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                        <label className="flex items-center cursor-pointer flex-1">
                          <input type="checkbox" checked={colVis[key]} onChange={() => toggleCol(key)} className="w-4 h-4 text-purple-600 border-gray-300 rounded" />
                          <span className="ml-3 text-sm text-gray-700">{def.label}</span>
                        </label>
                        {colVis[key] ? <Eye className="w-4 h-4 text-blue-500" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-end p-4 border-t bg-gray-50">
              <button onClick={() => setShowColModal(false)} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">Apply</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={onBack} className="p-1.5 hover:bg-white/20 rounded-lg"><ArrowLeft className="w-4 h-4" /></button>
              <div>
                <h1 className="text-lg font-semibold">Closing Ranks</h1>
                <p className="text-xs text-purple-100">2023 · 2024 · 2025 Session</p>
              </div>
            </div>
            <span className="hidden md:block text-xs text-purple-100">{filtered.length.toLocaleString()} Records</span>
          </div>
        </div>

        {dataError && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-700 text-center">
            ⚠️ Data not yet available. Add <code>/data/closingranks2025.csv</code> to enable this page.
          </div>
        )}

        {/* ── Year + Round pills ── */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto flex-wrap">

            {/* Year pills */}
            <div className="flex items-center gap-1 border-r pr-3 mr-1">
              <span className="text-xs text-gray-400 mr-1 whitespace-nowrap">Year:</span>
              {years.map(y => (
                <button key={y} onClick={() => applyYearRound(y, selRound)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    selYear === y ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>{y}</button>
              ))}
              <button onClick={() => applyYearRound("all", selRound)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selYear === "all" ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>All</button>
            </div>

            {/* Round pills */}
            <div className="flex items-center gap-1 border-r pr-3 mr-1">
              <span className="text-xs text-gray-400 mr-1 whitespace-nowrap">Round:</span>
              {["1","2","3","4","5"].map(r => (
                <button key={r} onClick={() => applyYearRound(selYear, r as "1"|"2"|"3"|"4"|"5")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    selRound === r ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}>R{r}</button>
              ))}
              <button onClick={() => applyYearRound(selYear, "all")}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selRound === "all" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>All</button>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1">
              {categories.filter(c => c !== "all" && !c.includes("PwD")).map(cat => (
                <button key={cat} onClick={() => { setSelCategory(cat); setPage(1); }}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    selCategory === cat ? "bg-amber-500 text-white" : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  }`}>{cat}</button>
              ))}
              <button onClick={() => { setSelCategory("all"); setPage(1); }}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selCategory === "all" ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>All Cat</button>
            </div>

            <button onClick={() => setShowColModal(true)}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 ml-auto whitespace-nowrap">
              <Eye className="w-4 h-4" /> Columns
            </button>
          </div>
        </div>

        {/* ── Search + Filters ── */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search institutes, courses, states..."
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <CustomSelect value={selState}  onChange={v => { setSelState(v);  setPage(1); }} options={states}  allLabel="All States" />
              <CustomSelect value={selQuota}  onChange={v => { setSelQuota(v);  setPage(1); }} options={quotas}  allLabel="All Quotas" />
              <button onClick={() => setShowAdv(!showAdv)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200">
                <Filter className="w-4 h-4" /> {showAdv ? "Hide" : "More"} Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdv ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {showAdv && (
            <div className="border-t pt-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <CustomSelect value={selCourse} onChange={v => { setSelCourse(v); setPage(1); }} options={courses} allLabel="All Courses" />
                <div className="flex gap-2">
                  <input type="number" placeholder="Min Fee ₹" value={minFee}
                    onChange={e => { setMinFee(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm" />
                  <input type="number" placeholder="Max Fee ₹" value={maxFee}
                    onChange={e => { setMaxFee(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm" />
                </div>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min Rank" value={minRank}
                    onChange={e => { setMinRank(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm" />
                  <input type="number" placeholder="Max Rank" value={maxRank}
                    onChange={e => { setMaxRank(e.target.value); setPage(1); }}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm" />
                </div>
                <button onClick={clearAll}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">
                  Clear All Filters
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mt-3">
                <span className="font-medium text-purple-600">{filtered.length.toLocaleString()}</span>
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
                  const is2023 = key.startsWith("CR 2023");
                  const is2024 = key.startsWith("CR 2024");
                  const is2025 = key.startsWith("CR 2025");
                  return (
                    <th key={key} className={`px-2 py-2 text-center text-xs font-semibold uppercase whitespace-nowrap ${
                      is2023 ? "text-orange-700" : is2024 ? "text-blue-700" : is2025 ? "text-blue-700" : "text-gray-700"
                    }`}>{label}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={visibleCols.length} className="px-6 py-12 text-center text-gray-500">
                    {dataError ? "CSV not found — add /data/closingranks2025.csv to enable." : "No data found. Try adjusting your filters."}
                  </td>
                </tr>
              ) : paged.map((item, i) => (
                <tr key={i} className="hover:bg-purple-50 transition-colors">
                  {colVis.Quota        && <td className="px-2 py-2 text-center text-xs"><span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">{item.Quota}</span></td>}
                  {colVis.Category     && <td className="px-2 py-2 text-center text-xs"><span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.Category === "GEN" ? "bg-gray-100 text-gray-800" :
                    item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
                    item.Category === "SC"  ? "bg-red-100 text-red-800" :
                    item.Category === "ST"  ? "bg-blue-100 text-blue-800" :
                    item.Category === "EWS" ? "bg-blue-100 text-blue-800" :
                    "bg-purple-100 text-purple-800"
                  }`}>{item.Category}</span></td>}
                  {colVis.State        && <td className="px-2 py-2 text-center text-xs text-gray-700 whitespace-nowrap">{item.State}</td>}
                  {colVis.Institute    && <td className="px-2 py-2 text-left text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium min-w-[180px]">{item.Institute}</td>}
                  {colVis.Course       && <td className="px-2 py-2 text-left text-xs text-gray-700 whitespace-nowrap">{item.Course}</td>}
                  {colVis.Fee          && <td className="px-2 py-2 text-center text-xs font-bold text-blue-700 whitespace-nowrap">{fmt(item.Fee)}</td>}
                  {colVis.Stipend_Year_1 && <td className="px-2 py-2 text-center text-xs text-gray-700 whitespace-nowrap">{fmt(item.Stipend_Year_1)}</td>}
                  {colVis.Bond_Years   && <td className="px-2 py-2 text-center text-xs text-gray-700">{item.Bond_Years > 0 ? `${item.Bond_Years} yr` : "—"}</td>}
                  {colVis.Bond_Penalty && <td className="px-2 py-2 text-center text-xs text-gray-700 whitespace-nowrap">{fmt(item.Bond_Penalty)}</td>}
                  {colVis.Beds         && <td className="px-2 py-2 text-center text-xs text-gray-700">{item.Beds > 0 ? item.Beds : "—"}</td>}
                  {colVis["CR 2023 1"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2023 1"]} /></td>}
                  {colVis["CR 2023 2"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2023 2"]} /></td>}
                  {colVis["CR 2023 3"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2023 3"]} /></td>}
                  {colVis["CR 2023 4"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2023 4"]} /></td>}
                  {colVis["CR 2023 5"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2023 5"]} /></td>}
                  {colVis["CR 2024 1"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2024 1"]} /></td>}
                  {colVis["CR 2024 2"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2024 2"]} /></td>}
                  {colVis["CR 2024 3"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2024 3"]} /></td>}
                  {colVis["CR 2024 4"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2024 4"]} /></td>}
                  {colVis["CR 2024 5"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2024 5"]} /></td>}
                  {colVis["CR 2025 1"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2025 1"]} /></td>}
                  {colVis["CR 2025 2"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2025 2"]} /></td>}
                  {colVis["CR 2025 3"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2025 3"]} /></td>}
                  {colVis["CR 2025 4"] && <td className="px-2 py-2 text-center"><RankCell val={item["CR 2025 4"]} /></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {filtered.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length.toLocaleString()}
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                <PrevIcon className="w-3 h-3" />
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                  const n = start + i;
                  if (n > totalPages) return null;
                  return (
                    <button key={n} onClick={() => setPage(n)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        page === n ? "bg-purple-500 text-white" : "border border-gray-300 text-black hover:bg-gray-50"
                      }`}>{n}</button>
                  );
                })}
              </div>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                <NextIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClosingRanks2025Page;