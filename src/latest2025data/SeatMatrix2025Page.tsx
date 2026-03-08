import React from "react";
import { ArrowLeft, Clock } from "lucide-react";

interface SeatMatrix2025PageProps {
  onBack: () => void;
}

/**
 * SeatMatrix2025Page
 *
 * Currently shows "Coming Soon" while 2025 data is being prepared.
 *
 * WHEN 2025 DATA IS READY:
 * Replace the content inside the white card below with the full
 * SeatMatrixPage table logic, pointing to your 2025 API endpoint.
 * Keep the header and onBack button unchanged.
 */
const SeatMatrix2025Page: React.FC<SeatMatrix2025PageProps> = ({ onBack }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
            <p className="text-xs text-indigo-100">2025 Session</p>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-5">
            <Clock className="w-10 h-10 text-indigo-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            2025 Seat Matrix Data
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            The 2025 seat matrix data will be published here as soon as
            it's officially released by MCC.
          </p>
          <div className="flex justify-center gap-1.5 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-sm"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatMatrix2025Page;



// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft, Search, Eye, EyeOff, X, Filter,
//   ChevronDown, ChevronLeft, ChevronRight, Heart,
// } from "lucide-react";

// interface SeatMatrix2025PageProps { onBack: () => void; }

// interface SeatMatrixData {
//   Round: string; Quota: string; Category: string; State: string;
//   Institute: string; Course: string; Seats: number;
//   Fee_Stipend_Year_1: number; Bond_Years: number; Bond_Penalty: number;
//   Beds: number; Institute_Type: string;
//   CR_2025_1: number; CR_2025_2: number; CR_2025_3: number;
//   CR_2025_4: number; CR_2025_5: number;
// }

// interface ColVis {
//   Round: boolean; Quota: boolean; Category: boolean; State: boolean;
//   Institute: boolean; Course: boolean; Seats: boolean;
//   Fee_Stipend_Year_1: boolean; Bond_Years: boolean; Bond_Penalty: boolean;
//   Beds: boolean; CR_2025_1: boolean; CR_2025_2: boolean;
//   CR_2025_3: boolean; CR_2025_4: boolean; CR_2025_5: boolean; actions: boolean;
// }

// /**
//  * SeatMatrix2025Page
//  * Reads from /data/seatmatrix2025.csv
//  * Expected CSV columns (header row required):
//  * Round, Quota, Category, State, Institute, Course, Seats,
//  * Fee_Stipend_Year_1, Bond_Years, Bond_Penalty, Beds, Institute_Type,
//  * CR_2025_1, CR_2025_2, CR_2025_3, CR_2025_4, CR_2025_5
//  */

// const SeatMatrix2025Page: React.FC<SeatMatrix2025PageProps> = ({ onBack }) => {
//   const [seatData, setSeatData] = useState<SeatMatrixData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dataError, setDataError] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selQuota, setSelQuota] = useState("all");
//   const [selCategory, setSelCategory] = useState("all");
//   const [selRound, setSelRound] = useState("all");
//   const [selState, setSelState] = useState("all");
//   const [selInstitute, setSelInstitute] = useState("all");
//   const [selCourse, setSelCourse] = useState("all");
//   const [selInstType, setSelInstType] = useState("all");
//   const [showAdv, setShowAdv] = useState(false);
//   const [showColModal, setShowColModal] = useState(false);
//   const [page, setPage] = useState(1);

//   const [colVis, setColVis] = useState<ColVis>({
//     Round: true, Quota: true, Category: true, State: true, Institute: true,
//     Course: true, Seats: true, Fee_Stipend_Year_1: true, Bond_Years: true,
//     Bond_Penalty: true, Beds: true, CR_2025_1: true, CR_2025_2: true,
//     CR_2025_3: true, CR_2025_4: true, CR_2025_5: true, actions: true,
//   });

//   const colDefs = [
//     { key: "Round", label: "Round" }, { key: "Quota", label: "Quota" },
//     { key: "Category", label: "Category" }, { key: "State", label: "State" },
//     { key: "Institute", label: "Institute" }, { key: "Course", label: "Course" },
//     { key: "Seats", label: "Seats" }, { key: "Fee_Stipend_Year_1", label: "Fee/Stipend Yr1" },
//     { key: "Bond_Years", label: "Bond Years" }, { key: "Bond_Penalty", label: "Bond Penalty" },
//     { key: "Beds", label: "Beds" }, { key: "CR_2025_1", label: "CR 2025-1" },
//     { key: "CR_2025_2", label: "CR 2025-2" }, { key: "CR_2025_3", label: "CR 2025-3" },
//     { key: "CR_2025_4", label: "CR 2025-4" }, { key: "CR_2025_5", label: "CR 2025-5" },
//     { key: "actions", label: "Actions" },
//   ] as { key: keyof ColVis; label: string }[];

//   const toggleCol = (k: keyof ColVis) => setColVis(p => ({ ...p, [k]: !p[k] }));
//   const showAll = () => setColVis(Object.keys(colVis).reduce((a,k) => ({...a,[k]:true}), {} as ColVis));
//   const hideAll = () => setColVis(Object.keys(colVis).reduce((a,k) => ({...a,[k]:k==="Institute"}), {} as ColVis));

//   const CustomSelect = ({ value, onChange, options, allLabel }: any) => (
//     <select value={value} onChange={e => onChange(e.target.value)}
//       className="px-3 py-2 border text-black border-gray-300 rounded-lg text-sm bg-white min-w-[140px]">
//       <option value="all">{allLabel}</option>
//       {options.filter((o: string) => o !== "all").map((o: string) => <option key={o} value={o}>{o}</option>)}
//     </select>
//   );

//   const parseCSV = (text: string): SeatMatrixData[] => {
//     if (text.includes("<html") || text.includes("<!DOCTYPE")) throw new Error("HTML");
//     const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
//     if (lines.length < 2) throw new Error("No data");
//     return lines.slice(1).map(line => {
//       const vals: string[] = []; let cur = ""; let inQ = false;
//       for (const ch of line) {
//         if (ch==='"') inQ=!inQ;
//         else if (ch===","&&!inQ) { vals.push(cur.trim()); cur=""; }
//         else cur+=ch;
//       }
//       vals.push(cur.trim());
//       const v = vals.map(x => x.replace(/^"(.*)"$/, "$1").trim());
//       const num = (s: string) => { const n=parseFloat(s.replace(/[^0-9.-]/g,"")); return isNaN(n)?0:n; };
//       return {
//         Round: v[0]||"", Quota: v[1]||"", Category: v[2]||"",
//         State: v[3]||"", Institute: v[4]||"", Course: v[5]||"",
//         Seats: parseInt(v[6])||0, Fee_Stipend_Year_1: num(v[7]),
//         Bond_Years: parseInt(v[8])||0, Bond_Penalty: num(v[9]),
//         Beds: parseInt(v[10])||0, Institute_Type: v[11]||"",
//         CR_2025_1: parseInt(v[12])||0, CR_2025_2: parseInt(v[13])||0,
//         CR_2025_3: parseInt(v[14])||0, CR_2025_4: parseInt(v[15])||0,
//         CR_2025_5: parseInt(v[16])||0,
//       };
//     });
//   };

//   useEffect(() => {
//     fetch("/data/seatmatrix2025.csv")
//       .then(r => { if (!r.ok) throw new Error(); return r.text(); })
//       .then(t => { setSeatData(parseCSV(t)); setDataError(false); })
//       .catch(() => { setDataError(true); setSeatData([]); })
//       .finally(() => setLoading(false));
//   }, []);

//   const rounds = ["all","Round 1","Round 2","Round 3","Round 4","Round 5"];
//   const quotas = ["all",...Array.from(new Set(seatData.map(d=>d.Quota).filter(Boolean))).sort()];
//   const categories = ["all",...Array.from(new Set(seatData.map(d=>d.Category).filter(Boolean))).sort()];
//   const states = ["all",...Array.from(new Set(seatData.map(d=>d.State).filter(Boolean))).sort()];
//   const courses = ["all",...Array.from(new Set(seatData.map(d=>d.Course).filter(Boolean))).sort()];
//   const institutes = ["all",...Array.from(new Set(seatData.map(d=>d.Institute).filter(Boolean))).sort()];
//   const instTypes = ["all","Government","Private"];

//   const filtered = seatData.filter(item => {
//     const s = searchTerm.toLowerCase();
//     const ms = !s || item.Institute.toLowerCase().includes(s) || item.Course.toLowerCase().includes(s) || item.State.toLowerCase().includes(s);
//     return ms &&
//       (selQuota==="all"||item.Quota===selQuota) && (selCategory==="all"||item.Category===selCategory) &&
//       (selRound==="all"||item.Round===selRound.replace("Round ","")) &&
//       (selState==="all"||item.State===selState) && (selInstitute==="all"||item.Institute===selInstitute) &&
//       (selCourse==="all"||item.Course===selCourse) && (selInstType==="all"||item.Institute_Type===selInstType);
//   });

//   const PER_PAGE = 70;
//   const totalPages = Math.ceil(filtered.length / PER_PAGE);
//   const paged = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

//   const clearAll = () => {
//     setSearchTerm(""); setSelQuota("all"); setSelCategory("all"); setSelRound("all");
//     setSelState("all"); setSelInstitute("all"); setSelCourse("all"); setSelInstType("all"); setPage(1);
//   };

//   const disp = (v: any) => (v===null||v===undefined||v===0||v==="")?"N/A":v;

//   if (loading) return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//         <p className="text-slate-600">Loading 2025 Seat Matrix Data...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {showColModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="text-lg font-semibold">Show/Hide Columns</h3>
//               <button onClick={() => setShowColModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
//             </div>
//             <div className="p-4">
//               <div className="flex gap-2 mb-4">
//                 <button onClick={showAll} className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg">Show All</button>
//                 <button onClick={hideAll} className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg">Hide All</button>
//               </div>
//               <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
//                 {colDefs.map(({ key, label }) => (
//                   <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
//                     <label className="flex items-center cursor-pointer flex-1">
//                       <input type="checkbox" checked={colVis[key]} onChange={() => toggleCol(key)} className="w-4 h-4 text-purple-600 border-gray-300 rounded" />
//                       <span className="ml-3 text-sm text-gray-700">{label}</span>
//                     </label>
//                     {colVis[key] ? <Eye className="w-4 h-4 text-green-500"/> : <EyeOff className="w-4 h-4 text-gray-400"/>}
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
//         {loading && <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center"><div className="bg-white rounded-lg p-6 shadow-xl"><div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"/><p className="text-slate-600">Loading...</p></div></div>}

//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button onClick={onBack} className="p-1.5 hover:bg-white/20 rounded-lg"><ArrowLeft className="w-4 h-4" /></button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
//                 <p className="text-xs text-purple-100">2025 Session</p>
//               </div>
//             </div>
//             <span className="hidden md:block text-xs text-purple-100">{filtered.length} Records</span>
//           </div>
//         </div>

//         {dataError && (
//           <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-700 text-center">
//             ⚠️ 2025 data not yet available. Add <code>/data/seatmatrix2025.csv</code> to enable this page.
//           </div>
//         )}

//         <div className="bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex items-center gap-2 overflow-x-auto">
//             {["Round 1","Round 2","Round 3","Round 4","Round 5"].map(r => (
//               <button key={r} onClick={() => { setSelRound(r); setPage(1); }}
//                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selRound===r?"bg-purple-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
//                 {r}
//               </button>
//             ))}
//             <button onClick={() => { setSelRound("all"); setPage(1); }}
//               className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selRound==="all"?"bg-pink-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
//               All Rounds
//             </button>
//             <button onClick={() => setShowColModal(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 ml-2 whitespace-nowrap">
//               <Eye className="w-4 h-4" /> Show/Hide
//             </button>
//           </div>
//         </div>

//         <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
//           <div className="flex flex-col md:flex-row gap-3">
//             <div className="flex-1 relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input type="text" placeholder="Search institutes, courses, or states..." value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               <CustomSelect value={selState} onChange={(v: string) => { setSelState(v); setPage(1); }} options={states} allLabel="All States" />
//               <CustomSelect value={selQuota} onChange={(v: string) => { setSelQuota(v); setPage(1); }} options={quotas} allLabel="All Quotas" />
//               <button onClick={() => setShowAdv(!showAdv)} className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200">
//                 <Filter className="w-4 h-4" /> {showAdv?"Hide":"Show"} Filters
//                 <ChevronDown className={`w-4 h-4 transition-transform ${showAdv?"rotate-180":""}`} />
//               </button>
//             </div>
//           </div>
//           {showAdv && (
//             <div className="border-t pt-3">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
//                 <CustomSelect value={selCategory} onChange={(v: string) => { setSelCategory(v); setPage(1); }} options={categories} allLabel="All Categories" />
//                 <CustomSelect value={selCourse} onChange={(v: string) => { setSelCourse(v); setPage(1); }} options={courses} allLabel="All Courses" />
//                 <CustomSelect value={selInstitute} onChange={(v: string) => { setSelInstitute(v); setPage(1); }} options={institutes.slice(0,50)} allLabel="All Institutes" />
//                 <button onClick={clearAll} className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">Clear All Filters</button>
//               </div>
//               <div className="flex items-center justify-center text-sm bg-gray-50 rounded-lg px-3 py-2 mt-3">
//                 <span className="font-medium text-purple-600">{filtered.length}</span><span className="ml-1 text-gray-600">filtered results</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
//               <tr>
//                 {colVis.Round && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Round</th>}
//                 {colVis.Quota && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Quota</th>}
//                 {colVis.Category && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>}
//                 {colVis.State && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">State</th>}
//                 {colVis.Institute && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Institute</th>}
//                 {colVis.Course && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Course</th>}
//                 {colVis.Seats && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Seats</th>}
//                 {colVis.Fee_Stipend_Year_1 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Fee/Stip Y1</th>}
//                 {colVis.Bond_Years && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Bond Yrs</th>}
//                 {colVis.Bond_Penalty && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Bond Penalty</th>}
//                 {colVis.Beds && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Beds</th>}
//                 {colVis.CR_2025_1 && <th className="px-2 py-2 text-left text-xs font-semibold text-emerald-700 uppercase">CR 2025-1</th>}
//                 {colVis.CR_2025_2 && <th className="px-2 py-2 text-left text-xs font-semibold text-emerald-700 uppercase">CR 2025-2</th>}
//                 {colVis.CR_2025_3 && <th className="px-2 py-2 text-left text-xs font-semibold text-emerald-700 uppercase">CR 2025-3</th>}
//                 {colVis.CR_2025_4 && <th className="px-2 py-2 text-left text-xs font-semibold text-emerald-700 uppercase">CR 2025-4</th>}
//                 {colVis.CR_2025_5 && <th className="px-2 py-2 text-left text-xs font-semibold text-emerald-700 uppercase">CR 2025-5</th>}
//                 {colVis.actions && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {paged.length === 0 ? (
//                 <tr><td colSpan={Object.values(colVis).filter(Boolean).length} className="px-6 py-12 text-center text-gray-500">
//                   {dataError ? "2025 CSV not found — add /data/seatmatrix2025.csv to enable this page." : "No data found. Try adjusting your filters."}
//                 </td></tr>
//               ) : paged.map((item, i) => (
//                 <tr key={i} className="hover:bg-purple-50 transition-colors">
//                   {colVis.Round && <td className="px-2 py-2 text-xs text-gray-700">{disp(item.Round)}</td>}
//                   {colVis.Quota && <td className="px-2 py-2 text-xs"><span className={`px-2 py-1 rounded-full text-xs font-medium ${item.Quota==="All India"?"bg-green-100 text-green-800":item.Quota==="State Quota"?"bg-blue-100 text-blue-800":item.Quota==="Management"?"bg-purple-100 text-purple-800":"bg-gray-100 text-gray-800"}`}>{disp(item.Quota)}</span></td>}
//                   {colVis.Category && <td className="px-2 py-2 text-xs"><span className={`px-2 py-1 rounded-full text-xs font-medium ${item.Category==="General"?"bg-blue-100 text-blue-800":item.Category==="OBC"?"bg-yellow-100 text-yellow-800":item.Category==="SC"?"bg-red-100 text-red-800":item.Category==="ST"?"bg-green-100 text-green-800":item.Category==="EWS"?"bg-indigo-100 text-indigo-800":"bg-pink-100 text-pink-800"}`}>{disp(item.Category)}</span></td>}
//                   {colVis.State && <td className="px-2 py-2 text-xs text-gray-700">{disp(item.State)}</td>}
//                   {colVis.Institute && <td className="px-2 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">{disp(item.Institute)}</td>}
//                   {colVis.Course && <td className="px-2 py-2 text-xs text-gray-700">{disp(item.Course)}</td>}
//                   {colVis.Seats && <td className="px-2 py-2 text-xs font-bold text-purple-600">{item.Seats===0?"N/A":item.Seats}</td>}
//                   {colVis.Fee_Stipend_Year_1 && <td className="px-2 py-2 text-xs text-gray-700">{item.Fee_Stipend_Year_1===0?"N/A":`₹${item.Fee_Stipend_Year_1.toLocaleString()}`}</td>}
//                   {colVis.Bond_Years && <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years===0?"N/A":item.Bond_Years}</td>}
//                   {colVis.Bond_Penalty && <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Penalty===0?"N/A":`₹${item.Bond_Penalty.toLocaleString()}`}</td>}
//                   {colVis.Beds && <td className="px-2 py-2 text-xs text-gray-700">{item.Beds===0?"N/A":item.Beds}</td>}
//                   {colVis.CR_2025_1 && <td className="px-2 py-2 text-xs text-emerald-700 font-medium">{item.CR_2025_1===0?"N/A":item.CR_2025_1}</td>}
//                   {colVis.CR_2025_2 && <td className="px-2 py-2 text-xs text-emerald-700 font-medium">{item.CR_2025_2===0?"N/A":item.CR_2025_2}</td>}
//                   {colVis.CR_2025_3 && <td className="px-2 py-2 text-xs text-emerald-700 font-medium">{item.CR_2025_3===0?"N/A":item.CR_2025_3}</td>}
//                   {colVis.CR_2025_4 && <td className="px-2 py-2 text-xs text-emerald-700 font-medium">{item.CR_2025_4===0?"N/A":item.CR_2025_4}</td>}
//                   {colVis.CR_2025_5 && <td className="px-2 py-2 text-xs text-emerald-700 font-medium">{item.CR_2025_5===0?"N/A":item.CR_2025_5}</td>}
//                   {colVis.actions && <td className="px-2 py-2"><button className="p-1 hover:bg-red-100 rounded"><Heart className="w-3 h-3 text-gray-400 hover:text-red-500" /></button></td>}
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
//               <button onClick={()=>setPage(Math.max(1,page-1))} disabled={page===1} className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-3 h-3"/></button>
//               <div className="flex space-x-1">
//                 {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
//                   const n=totalPages<=5?i+1:Math.max(1,page-2)+i;
//                   if(n>totalPages) return null;
//                   return <button key={n} onClick={()=>setPage(n)} className={`px-2 py-1 text-xs rounded ${page===n?"bg-purple-500 text-white":"border border-gray-300 text-black hover:bg-gray-50"}`}>{n}</button>;
//                 })}
//               </div>
//               <button onClick={()=>setPage(Math.min(totalPages,page+1))} disabled={page===totalPages||totalPages===0} className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"><ChevronRight className="w-3 h-3"/></button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatMatrix2025Page;