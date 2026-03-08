import React from "react";
import { ArrowLeft, Clock } from "lucide-react";

interface FeesStipendBond2025PageProps {
  onBack: () => void;
}

/**
 * FeesStipendBond2025Page
 *
 * Currently shows "Coming Soon" while 2025 data is being prepared.
 *
 * WHEN 2025 DATA IS READY:
 * Replace the content inside the white card below with the full
 * FeesStipendBondPage table logic, pointing to your 2025 CSV/API.
 * Keep the header and onBack button unchanged.
 */
const FeesStipendBond2025Page: React.FC<FeesStipendBond2025PageProps> = ({
  onBack,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Fees, Stipend &amp; Bond</h1>
            <p className="text-xs text-purple-100">2025 Session</p>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-5">
            <Clock className="w-10 h-10 text-purple-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            2025 Fees &amp; Stipend Data
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Updated 2025 fee structure, stipend amounts and bond details
            will appear here once officially released by MCC.
          </p>
          <div className="flex justify-center gap-1.5 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors text-sm"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeesStipendBond2025Page;


// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft, Search, Eye, EyeOff, X, Filter,
//   ChevronDown, ChevronLeft as PrevIcon, ChevronRight as NextIcon,
// } from "lucide-react";

// interface FeesStipendBond2025PageProps { onBack: () => void; }

// interface FeesData {
//   State: string; Institute: string; "Institute Type": string; Course: string;
//   Quota: string; "Hosp Beds": number; "Course Fee": number;
//   "Stipend Year 1": number; "Stipend Year 2": number; "Stipend Year 3": number;
//   Bond: string; "Bond Penalty": string;
// }

// interface ColVis {
//   State: boolean; Institute: boolean; "Institute Type": boolean; Course: boolean;
//   Quota: boolean; "Hosp Beds": boolean; "Course Fee": boolean;
//   "Stipend Year 1": boolean; "Stipend Year 2": boolean; "Stipend Year 3": boolean;
//   Bond: boolean; "Bond Penalty": boolean;
// }

// /**
//  * FeesStipendBond2025Page
//  * Reads from /data/feestiphendbond2025.csv
//  * Expected CSV columns (header row required) — same as feestiphendbond.csv:
//  * State, Institute, Institute Type, Course, Quota, Hosp Beds,
//  * Course Fee, Stipend Year 1, Stipend Year 2, Stipend Year 3, Bond, Bond Penalty
//  */

// const CustomSelect: React.FC<{
//   value: string; onChange: (v: string) => void; options: string[]; allLabel: string;
// }> = ({ value, onChange, options, allLabel }) => {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
//   return (
//     <div className="relative min-w-[150px]">
//       <button onClick={() => setOpen(!open)}
//         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-left flex items-center justify-between">
//         <span className="text-gray-700 truncate">{value==="all"?allLabel:value}</span>
//         <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open?"rotate-180":""}`} />
//       </button>
//       {open && (
//         <>
//           <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
//           <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
//             <div className="p-2 border-b">
//               <input type="text" placeholder="Search..." value={search}
//                 onChange={e => setSearch(e.target.value)} onClick={e => e.stopPropagation()}
//                 className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none" />
//             </div>
//             <div className="overflow-y-auto max-h-48">
//               {filtered.map(opt => (
//                 <div key={opt} onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
//                   className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-50 ${value===opt?"bg-purple-100 text-purple-700":"text-gray-700"}`}>
//                   {opt==="all"?allLabel:opt}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const FeesStipendBond2025Page: React.FC<FeesStipendBond2025PageProps> = ({ onBack }) => {
//   const [feesData, setFeesData] = useState<FeesData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dataError, setDataError] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selState, setSelState] = useState("all");
//   const [selInstType, setSelInstType] = useState("all");
//   const [selCourse, setSelCourse] = useState("all");
//   const [selQuota, setSelQuota] = useState("all");
//   const [page, setPage] = useState(1);
//   const [showAdv, setShowAdv] = useState(false);
//   const [showColModal, setShowColModal] = useState(false);
//   const [minFee, setMinFee] = useState("");
//   const [maxFee, setMaxFee] = useState("");
//   const [minBeds, setMinBeds] = useState("");
//   const [maxBeds, setMaxBeds] = useState("");

//   const [colVis, setColVis] = useState<ColVis>({
//     State: true, Institute: true, "Institute Type": true, Course: true, Quota: true,
//     "Hosp Beds": true, "Course Fee": true, "Stipend Year 1": true,
//     "Stipend Year 2": true, "Stipend Year 3": true, Bond: true, "Bond Penalty": true,
//   });

//   const colDefs = [
//     { key: "State", label: "State" }, { key: "Institute", label: "Institute" },
//     { key: "Institute Type", label: "Institute Type" }, { key: "Course", label: "Course" },
//     { key: "Quota", label: "Quota" }, { key: "Hosp Beds", label: "Hospital Beds" },
//     { key: "Course Fee", label: "Course Fee" }, { key: "Stipend Year 1", label: "Stipend Year 1" },
//     { key: "Stipend Year 2", label: "Stipend Year 2" }, { key: "Stipend Year 3", label: "Stipend Year 3" },
//     { key: "Bond", label: "Bond" }, { key: "Bond Penalty", label: "Bond Penalty" },
//   ] as { key: keyof ColVis; label: string }[];

//   const toggleCol = (k: keyof ColVis) => setColVis(p => ({ ...p, [k]: !p[k] }));
//   const showAll = () => setColVis(Object.keys(colVis).reduce((a,k) => ({...a,[k]:true}), {} as ColVis));
//   const hideAll = () => setColVis(Object.keys(colVis).reduce((a,k) => ({...a,[k]:k==="Institute"}), {} as ColVis));

//   const parseCSV = (text: string): FeesData[] => {
//     if (text.includes("<html")||text.includes("<!DOCTYPE")) throw new Error("HTML");
//     const lines = text.trim().split(/\r?\n/).filter(l=>l.trim());
//     if (lines.length < 2) throw new Error("No data");
//     return lines.slice(1).map(line => {
//       const vals: string[] = []; let cur=""; let inQ=false;
//       for (const ch of line) {
//         if (ch==='"') inQ=!inQ;
//         else if (ch===","&&!inQ) { vals.push(cur.trim()); cur=""; }
//         else cur+=ch;
//       }
//       vals.push(cur.trim());
//       const v = vals.map(x=>x.replace(/^"(.*)"$/, "$1").trim());
//       const num = (s: string) => { const n=parseFloat(s.replace(/[^0-9.-]/g,"")); return isNaN(n)?0:n; };
//       return {
//         State: v[0]||"", Institute: v[1]||"", "Institute Type": v[2]||"",
//         Course: v[3]||"", Quota: v[4]||"", "Hosp Beds": num(v[5]),
//         "Course Fee": num(v[6]), "Stipend Year 1": num(v[7]),
//         "Stipend Year 2": num(v[8]), "Stipend Year 3": num(v[9]),
//         Bond: v[10]||"", "Bond Penalty": v[11]||"",
//       };
//     });
//   };

//   useEffect(() => {
//     fetch("/data/feestiphendbond2025.csv")
//       .then(r => { if (!r.ok) throw new Error(); return r.text(); })
//       .then(t => { setFeesData(parseCSV(t)); setDataError(false); })
//       .catch(() => { setDataError(true); setFeesData([]); })
//       .finally(() => setLoading(false));
//   }, []);

//   const states = ["all",...Array.from(new Set(feesData.map(d=>d.State)))];
//   const instTypes = ["all",...Array.from(new Set(feesData.map(d=>d["Institute Type"])))];
//   const courses = ["all",...Array.from(new Set(feesData.map(d=>d.Course)))];
//   const quotas = ["all",...Array.from(new Set(feesData.map(d=>d.Quota)))];

//   const filtered = feesData.filter(item => {
//     const s = searchTerm.toLowerCase();
//     const ms = item.Institute.toLowerCase().includes(s)||item.State.toLowerCase().includes(s)||
//       item["Institute Type"].toLowerCase().includes(s)||item.Course.toLowerCase().includes(s)||
//       item.Quota.toLowerCase().includes(s);
//     const mf = (!minFee||item["Course Fee"]>=parseFloat(minFee))&&(!maxFee||item["Course Fee"]<=parseFloat(maxFee));
//     const mb = (!minBeds||item["Hosp Beds"]>=parseFloat(minBeds))&&(!maxBeds||item["Hosp Beds"]<=parseFloat(maxBeds));
//     return ms&&mf&&mb &&
//       (selState==="all"||item.State===selState)&&(selInstType==="all"||item["Institute Type"]===selInstType)&&
//       (selCourse==="all"||item.Course===selCourse)&&(selQuota==="all"||item.Quota===selQuota);
//   });

//   const PER_PAGE = 50;
//   const totalPages = Math.ceil(filtered.length/PER_PAGE);
//   const paged = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

//   const clearAll = () => {
//     setSearchTerm(""); setSelState("all"); setSelInstType("all"); setSelCourse("all");
//     setSelQuota("all"); setMinFee(""); setMaxFee(""); setMinBeds(""); setMaxBeds(""); setPage(1);
//   };

//   const fmt = (n: number) => {
//     if (n>=10000000) return "₹"+(n/10000000).toFixed(2)+" Cr";
//     if (n>=100000) return "₹"+(n/100000).toFixed(2)+" L";
//     if (n>=1000) return "₹"+(n/1000).toFixed(2)+" K";
//     return "₹"+n.toLocaleString();
//   };

//   if (loading) return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"/>
//         <p className="text-slate-600">Loading 2025 Fees & Stipend Data...</p>
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
//               <button onClick={() => setShowColModal(false)}><X className="w-5 h-5 text-gray-500"/></button>
//             </div>
//             <div className="p-4">
//               <div className="flex gap-2 mb-4">
//                 <button onClick={showAll} className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg">Show All</button>
//                 <button onClick={hideAll} className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg">Hide All</button>
//               </div>
//               <div className="space-y-2 max-h-64 overflow-y-auto">
//                 {colDefs.map(({ key, label }) => (
//                   <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
//                     <label className="flex items-center cursor-pointer flex-1">
//                       <input type="checkbox" checked={colVis[key]} onChange={() => toggleCol(key)} className="w-4 h-4 text-purple-600 border-gray-300 rounded"/>
//                       <span className="ml-3 text-sm text-gray-700">{label}</span>
//                     </label>
//                     {colVis[key]?<Eye className="w-4 h-4 text-green-500"/>:<EyeOff className="w-4 h-4 text-gray-400"/>}
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
//               <button onClick={onBack} className="p-1.5 hover:bg-white/20 rounded-lg"><ArrowLeft className="w-4 h-4"/></button>
//               <div>
//                 <h1 className="text-lg font-semibold">Fees, Stipend &amp; Bond</h1>
//                 <p className="text-xs text-purple-100">2025 Session</p>
//               </div>
//             </div>
//             <span className="hidden md:block text-xs text-purple-100">{filtered.length} Records</span>
//           </div>
//         </div>

//         {dataError && (
//           <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-700 text-center">
//             ⚠️ 2025 data not yet available. Add <code>/data/feestiphendbond2025.csv</code> to enable this page.
//           </div>
//         )}

//         {/* Institute Type pills */}
//         <div className="bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex items-center gap-2 overflow-x-auto">
//             {instTypes.filter(t=>t!=="all").map(type => (
//               <button key={type} onClick={() => { setSelInstType(type); setPage(1); }}
//                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selInstType===type?"bg-purple-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
//                 {type}
//               </button>
//             ))}
//             <button onClick={() => { setSelInstType("all"); setPage(1); }}
//               className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selInstType==="all"?"bg-pink-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
//               All Types
//             </button>
//             <button onClick={() => setShowColModal(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 ml-2 whitespace-nowrap">
//               <Eye className="w-4 h-4"/> Show/Hide
//             </button>
//           </div>
//         </div>

//         <div className="bg-white border-b border-gray-200 px-4 py-4 space-y-4">
//           <div className="flex flex-col md:flex-row gap-3">
//             <div className="flex-1 relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
//               <input type="text" placeholder="Search institutes, states, courses, quota..."
//                 value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"/>
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               <CustomSelect value={selState} onChange={v=>{setSelState(v);setPage(1);}} options={states} allLabel="All States"/>
//               <CustomSelect value={selCourse} onChange={v=>{setSelCourse(v);setPage(1);}} options={courses} allLabel="All Courses"/>
//               <button onClick={()=>setShowAdv(!showAdv)} className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200">
//                 <Filter className="w-4 h-4"/> {showAdv?"Hide":"Show"} Filters
//                 <ChevronDown className={`w-4 h-4 transition-transform ${showAdv?"rotate-180":""}`}/>
//               </button>
//             </div>
//           </div>
//           {showAdv && (
//             <div className="border-t pt-3">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
//                 <CustomSelect value={selQuota} onChange={v=>{setSelQuota(v);setPage(1);}} options={quotas} allLabel="All Quotas"/>
//                 <div className="flex gap-2">
//                   <input type="number" placeholder="Min Fee" value={minFee} onChange={e=>{setMinFee(e.target.value);setPage(1);}} className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"/>
//                   <input type="number" placeholder="Max Fee" value={maxFee} onChange={e=>{setMaxFee(e.target.value);setPage(1);}} className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"/>
//                 </div>
//                 <div className="flex gap-2">
//                   <input type="number" placeholder="Min Beds" value={minBeds} onChange={e=>{setMinBeds(e.target.value);setPage(1);}} className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"/>
//                   <input type="number" placeholder="Max Beds" value={maxBeds} onChange={e=>{setMaxBeds(e.target.value);setPage(1);}} className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm"/>
//                 </div>
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
//                 {colVis.State && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">State</th>}
//                 {colVis.Institute && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Institute</th>}
//                 {colVis["Institute Type"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Type</th>}
//                 {colVis.Course && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Course</th>}
//                 {colVis.Quota && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Quota</th>}
//                 {colVis["Hosp Beds"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Beds</th>}
//                 {colVis["Course Fee"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Course Fee</th>}
//                 {colVis["Stipend Year 1"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Stipend Y1</th>}
//                 {colVis["Stipend Year 2"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Stipend Y2</th>}
//                 {colVis["Stipend Year 3"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Stipend Y3</th>}
//                 {colVis.Bond && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Bond</th>}
//                 {colVis["Bond Penalty"] && <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase">Penalty</th>}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {paged.length===0 ? (
//                 <tr><td colSpan={Object.values(colVis).filter(Boolean).length} className="px-6 py-12 text-center text-gray-500">
//                   {dataError?"2025 CSV not found — add /data/feestiphendbond2025.csv to enable this page.":"No data found. Try adjusting your filters."}
//                 </td></tr>
//               ) : paged.map((item,i) => (
//                 <tr key={i} className="hover:bg-purple-50 transition-colors">
//                   {colVis.State && <td className="px-2 py-2 text-center text-xs text-gray-700">{item.State}</td>}
//                   {colVis.Institute && <td className="px-2 py-2 text-left text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">{item.Institute}</td>}
//                   {colVis["Institute Type"] && <td className="px-2 py-2 text-center text-xs"><span className={`px-2 py-1 rounded-full text-xs font-medium ${item["Institute Type"]==="Govt"?"bg-blue-100 text-blue-800":item["Institute Type"]==="Private"?"bg-green-100 text-green-800":"bg-purple-100 text-purple-800"}`}>{item["Institute Type"]}</span></td>}
//                   {colVis.Course && <td className="px-2 py-2 text-center text-xs text-gray-700">{item.Course}</td>}
//                   {colVis.Quota && <td className="px-2 py-2 text-center text-xs"><span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">{item.Quota}</span></td>}
//                   {colVis["Hosp Beds"] && <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">{item["Hosp Beds"].toLocaleString()}</td>}
//                   {colVis["Course Fee"] && <td className="px-2 py-2 text-center text-xs font-bold text-green-700">{fmt(item["Course Fee"])}</td>}
//                   {colVis["Stipend Year 1"] && <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{fmt(item["Stipend Year 1"])}</td>}
//                   {colVis["Stipend Year 2"] && <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{fmt(item["Stipend Year 2"])}</td>}
//                   {colVis["Stipend Year 3"] && <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{fmt(item["Stipend Year 3"])}</td>}
//                   {colVis.Bond && <td className="px-2 py-2 text-center text-xs"><span className={`px-2 py-1 rounded-full text-xs font-medium ${item.Bond.toLowerCase().includes("no")||item.Bond.toLowerCase()==="n/a"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{item.Bond}</span></td>}
//                   {colVis["Bond Penalty"] && <td className="px-2 py-2 text-center text-xs font-medium text-red-600">{item["Bond Penalty"]}</td>}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="bg-white border-t border-gray-200 px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="text-xs text-gray-600">
//               Showing {filtered.length>0?(page-1)*PER_PAGE+1:0} to {Math.min(page*PER_PAGE,filtered.length)} of {filtered.length}
//             </div>
//             <div className="flex items-center space-x-1">
//               <button onClick={()=>setPage(Math.max(1,page-1))} disabled={page===1} className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"><PrevIcon className="w-3 h-3"/></button>
//               <div className="flex space-x-1">
//                 {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
//                   const n=totalPages<=5?i+1:Math.max(1,page-2)+i;
//                   if(n>totalPages) return null;
//                   return <button key={n} onClick={()=>setPage(n)} className={`px-2 py-1 text-xs rounded ${page===n?"bg-purple-500 text-white":"border border-gray-300 text-black hover:bg-gray-50"}`}>{n}</button>;
//                 })}
//               </div>
//               <button onClick={()=>setPage(Math.min(totalPages,page+1))} disabled={page===totalPages||totalPages===0} className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"><NextIcon className="w-3 h-3"/></button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeesStipendBond2025Page;