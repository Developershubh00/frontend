// import { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   ArrowLeft,
//   Share2,
//   RotateCcw,
//   Loader,
//   Check,
//   ArrowRight,
//   MessageCircle,
// } from "lucide-react";

// interface Result {
//   serialNo: string;
//   rollNo: string;
//   categoryApplied: string;
//   underPwbd: string | null;
//   overallRank: string;
//   percentile: string;
//   course: string;
//   phase: string;
// }

// const CATEGORY_STYLES: Record<string, string> = {
//   GEN: "bg-blue-100 text-blue-800 border-blue-300",
//   OBC: "bg-blue-50 text-blue-700 border-blue-200",
//   SC: "bg-blue-100 text-blue-800 border-blue-300",
//   ST: "bg-blue-50 text-blue-700 border-blue-200",
//   EWS: "bg-blue-100 text-blue-800 border-blue-300",
//   "OBC-NCL": "bg-blue-50 text-blue-700 border-blue-200",
// };

// const getCatStyle = (cat: string) =>
//   CATEGORY_STYLES[cat?.toUpperCase()] ??
//   "bg-blue-50 text-blue-700 border-blue-200";

// const getRankTier = (rank: number) => {
//   if (rank <= 500)
//     return {
//       label: "Outstanding",
//       color: "text-blue-800",
//       bg: "bg-blue-100",
//       border: "border-blue-400",
//     };
//   if (rank <= 2000)
//     return {
//       label: "Excellent",
//       color: "text-blue-700",
//       bg: "bg-blue-50",
//       border: "border-blue-300",
//     };
//   if (rank <= 8000)
//     return {
//       label: "Good",
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//     };
//   if (rank <= 20000)
//     return {
//       label: "Average",
//       color: "text-blue-500",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//     };
//   return {
//     label: "Qualified",
//     color: "text-blue-400",
//     bg: "bg-blue-50",
//     border: "border-blue-200",
//   };
// };

// export default function InicetResultPage() {
//   const [allData, setAllData] = useState<Result[]>([]);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [rollInput, setRollInput] = useState("");
//   const [result, setResult] = useState<Result | null>(null);
//   const [notFound, setNotFound] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [barWidth, setBarWidth] = useState(0);
//   const [copied, setCopied] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const rollFromUrl = urlParams.get("roll");
//     if (rollFromUrl) {
//       setRollInput(rollFromUrl);
//     }

//     fetch("/inicet-results.json")
//       .then((r) => (r.ok ? r.json() : Promise.reject()))
//       .then((d: Result[]) => {
//         setAllData(d);
//         setDataLoading(false);
//       })
//       .catch(() => {
//         setAllData([
//           {
//             serialNo: "1",
//             rollNo: "7700001",
//             categoryApplied: "OBC",
//             underPwbd: null,
//             overallRank: "34755",
//             percentile: "61.036",
//             course: "MD/MS",
//             phase: "Phase 1",
//           },
//           {
//             serialNo: "2",
//             rollNo: "7700002",
//             categoryApplied: "GEN",
//             underPwbd: null,
//             overallRank: "1200",
//             percentile: "98.712",
//             course: "MD/MS",
//             phase: "Phase 1",
//           },
//         ]);
//         setDataLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (result) {
//       setBarWidth(0);
//       const t = setTimeout(
//         () => setBarWidth(Math.min(100, parseFloat(result.percentile))),
//         80,
//       );
//       return () => clearTimeout(t);
//     }
//   }, [result]);

//   const handleSearch = () => {
//     const q = rollInput.trim();
//     if (!q || searching || dataLoading) return;
//     setSearching(true);
//     setHasSearched(true);
//     setResult(null);
//     setNotFound(false);

//     const newUrl = `${window.location.pathname}?roll=${q}`;
//     window.history.pushState({ path: newUrl }, "", newUrl);

//     setTimeout(() => {
//       const found = allData.find((r) => r.rollNo === q);
//       found ? setResult(found) : setNotFound(true);
//       setSearching(false);
//     }, 420);
//   };

//   const reset = () => {
//     setRollInput("");
//     setResult(null);
//     setNotFound(false);
//     setHasSearched(false);
//     setCopied(false);
//     window.history.pushState(
//       { path: window.location.pathname },
//       "",
//       window.location.pathname,
//     );
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const handleShare = () => {
//     if (!result) return;

//     const shareUrl = `${window.location.origin}${window.location.pathname}?roll=${result.rollNo}`;
//     const shareText = `My INI-CET 2026 Result - Rank: #${result.overallRank}, Percentile: ${result.percentile}%`;

//     if (navigator.share) {
//       navigator
//         .share({
//           title: "INI-CET 2026 Result",
//           text: shareText,
//           url: shareUrl,
//         })
//         .catch(() => {
//           copyToClipboard(shareUrl);
//         });
//     } else {
//       copyToClipboard(shareUrl);
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const rank = result ? parseInt(result.overallRank) || 0 : 0;
//   const pct = result ? parseFloat(result.percentile) || 0 : 0;
//   const tier = getRankTier(rank);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       {/* Header with Back Button */}
//       <div className="bg-white border-b border-blue-200 px-3 py-3 shadow-sm sticky top-0 z-50">
//         <div className="max-w-3xl mx-auto flex items-center justify-between">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span className="hidden sm:inline">Back</span>
//           </button>

//           <div className="text-center">
//             <h1 className="text-lg sm:text-xl font-bold text-blue-900">
//               INI-CET 2026 Result
//             </h1>
//             <p className="text-xs text-blue-600 hidden sm:block">
//               Check your rank and percentile
//             </p>
//           </div>

//           <div className="w-16 sm:w-20" />
//         </div>
//       </div>

//       {/* Main Content - Centered */}
//       <div className="max-w-3xl mx-auto px-3 py-4 sm:py-6">
//         {/* Search Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-4 sm:p-6 mb-4 sm:mb-6">
//           <div className="mb-4">
//             <label className="block text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">
//               Enter Roll Number
//             </label>
//             <div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 inputMode="numeric"
//                 value={rollInput}
//                 onChange={(e) =>
//                   setRollInput(e.target.value.replace(/\D/g, ""))
//                 }
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 placeholder="e.g. 7700001"
//                 maxLength={12}
//                 disabled={dataLoading}
//                 className="flex-1 border-2 border-blue-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-mono font-bold text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-blue-300 transition-all disabled:opacity-50"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={!rollInput.trim() || searching || dataLoading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base"
//               >
//                 {searching ? (
//                   <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
//                 ) : (
//                   <>
//                     <Search className="w-4 h-4 sm:w-5 sm:h-5" />
//                     <span className="hidden sm:inline">Search</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {!hasSearched && !dataLoading && (
//             <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-blue-100">
//               {[
//                 { val: "49,769", label: "Total" },
//                 { val: "46,884", label: "MD/MS" },
//                 { val: "2,885", label: "MDS" },
//               ].map((s) => (
//                 <div
//                   key={s.label}
//                   className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center"
//                 >
//                   <div className="text-sm sm:text-lg font-extrabold text-blue-700">
//                     {s.val}
//                   </div>
//                   <div className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase">
//                     {s.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Results Section */}
//         <div className="space-y-4">
//           {searching && (
//             <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8 sm:p-12 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4" />
//               <p className="text-blue-700 font-bold text-base sm:text-lg">
//                 Searching...
//               </p>
//               <p className="text-blue-500 text-sm font-mono mt-2">
//                 {rollInput}
//               </p>
//             </div>
//           )}

//           {result && !searching && (
//             <div className="space-y-3 sm:space-y-4 animate-fade-in">
//               {/* Action Bar */}
//               <div className="flex items-center justify-between gap-2">
//                 <button
//                   onClick={reset}
//                   className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-700 border-2 border-blue-300 rounded-lg sm:rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-50 transition-all"
//                 >
//                   <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden sm:inline">Search Again</span>
//                   <span className="sm:hidden">New</span>
//                 </button>

//                 <button
//                   onClick={handleShare}
//                   className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-full transition-all border-2 ${
//                     copied
//                       ? "bg-green-100 text-green-700 border-green-300"
//                       : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
//                   }`}
//                 >
//                   {copied ? (
//                     <>
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span className="hidden sm:inline">Copied!</span>
//                     </>
//                   ) : (
//                     <>
//                       <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span className="hidden sm:inline">Share</span>
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Main Result Card */}
//               <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 sm:px-6 py-4 sm:py-5 text-white">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
//                         Roll Number
//                       </p>
//                       <p className="text-white text-2xl sm:text-3xl font-extrabold font-mono">
//                         {result.rollNo}
//                       </p>
//                     </div>
//                     <span
//                       className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full border ${tier.bg} ${tier.color} ${tier.border}`}
//                     >
//                       {tier.label}
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
//                     <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-blue-500 text-white border border-blue-400">
//                       {result.course}
//                     </span>
//                     <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-white/20 text-white border border-white/30">
//                       {result.phase}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   <div
//                     className={`rounded-xl sm:rounded-2xl border-2 p-4 sm:p-5 flex items-center justify-between ${tier.bg} ${tier.border}`}
//                   >
//                     <div>
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                         Overall Rank
//                       </p>
//                       <p
//                         className={`text-3xl sm:text-5xl font-black font-mono ${tier.color}`}
//                       >
//                         #{result.overallRank}
//                       </p>
//                     </div>
//                     <div
//                       className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-3xl border-2 ${tier.border} bg-white`}
//                     >
//                       🏆
//                     </div>
//                   </div>

//                   <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 sm:p-5">
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-700 uppercase tracking-widest">
//                         Percentile
//                       </p>
//                       <p className="text-xl sm:text-3xl font-extrabold text-blue-800 font-mono">
//                         {pct.toFixed(3)}
//                       </p>
//                     </div>
//                     <div className="h-2 sm:h-3 bg-blue-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-1000"
//                         style={{ width: `${barWidth}%` }}
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     <div
//                       className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 ${getCatStyle(result.categoryApplied)}`}
//                     >
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                         Category
//                       </p>
//                       <span className="text-sm sm:text-lg font-bold">
//                         {result.categoryApplied}
//                       </span>
//                     </div>
//                     <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                         Serial No.
//                       </p>
//                       <p className="text-lg sm:text-2xl font-extrabold font-mono text-blue-800">
//                         #{result.serialNo}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Back to Dashboard CTA */}
//               <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-xl text-center border-2 border-blue-600">
//                 <h3 className="font-bold text-base sm:text-lg mb-2">
//                   Back to Dashboard
//                 </h3>
//                 <p className="text-blue-100 text-xs sm:text-sm mb-4">
//                   Return to your dashboard or login page
//                 </p>
//                 <button
//                   onClick={() => (window.location.href = "/dashboard")}
//                   className="w-full bg-white text-blue-700 font-bold py-2.5 sm:py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base group"
//                 >
//                   <span>Go to Dashboard</span>
//                   <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button
//                   onClick={() => (window.location.href = "/login")}
//                   className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base border-2 border-blue-400"
//                 >
//                   Login / Sign Up
//                 </button>
//               </div>
//             </div>
//           )}

//           {notFound && !searching && (
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6 sm:p-8 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                 <span className="text-2xl sm:text-3xl">⚠️</span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">
//                 Result Not Found
//               </h3>
//               <p className="text-blue-600 text-xs sm:text-sm mb-4">
//                 Roll number{" "}
//                 <span className="font-mono font-bold">{rollInput}</span> not
//                 found
//               </p>
//               <button
//                 onClick={reset}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   ArrowLeft,
//   Share2,
//   RotateCcw,
//   Loader,
//   Check,
//   ArrowRight,
// } from "lucide-react";

// interface Result {
//   rollNo: string;
//   category: string;
//   appliedUnder: string;
//   pwbd: string | null;
//   rank: string;
//   percentile: string;
//   course: string;
// }

// const CATEGORY_STYLES: Record<string, string> = {
//   GEN: "bg-blue-100 text-blue-800 border-blue-300",
//   OBC: "bg-blue-50 text-blue-700 border-blue-200",
//   SC: "bg-blue-100 text-blue-800 border-blue-300",
//   ST: "bg-blue-50 text-blue-700 border-blue-200",
//   EWS: "bg-blue-100 text-blue-800 border-blue-300",
//   "OBC-NCL": "bg-blue-50 text-blue-700 border-blue-200",
//   GENERAL: "bg-blue-50 text-blue-700 border-blue-200",
// };

// const getCatStyle = (cat: string) =>
//   CATEGORY_STYLES[cat?.toUpperCase()] ??
//   "bg-blue-50 text-blue-700 border-blue-200";

// const getRankTier = (rank: number) => {
//   if (rank <= 500)
//     return {
//       label: "Outstanding",
//       color: "text-blue-800",
//       bg: "bg-blue-100",
//       border: "border-blue-400",
//     };
//   if (rank <= 2000)
//     return {
//       label: "Excellent",
//       color: "text-blue-700",
//       bg: "bg-blue-50",
//       border: "border-blue-300",
//     };
//   if (rank <= 8000)
//     return {
//       label: "Good",
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//     };
//   if (rank <= 20000)
//     return {
//       label: "Average",
//       color: "text-blue-500",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//     };
//   return {
//     label: "Qualified",
//     color: "text-blue-400",
//     bg: "bg-blue-50",
//     border: "border-blue-200",
//   };
// };

// export default function InicetResultPage() {
//   const [allData, setAllData] = useState<Result[]>([]);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [rollInput, setRollInput] = useState("");
//   const [result, setResult] = useState<Result | null>(null);
//   const [notFound, setNotFound] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [barWidth, setBarWidth] = useState(0);
//   const [copied, setCopied] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const rollFromUrl = urlParams.get("roll");
//     if (rollFromUrl) {
//       setRollInput(rollFromUrl);
//     }

//     fetch("/inicet-results.json")
//       .then((r) => (r.ok ? r.json() : Promise.reject()))
//       .then((d: Result[]) => {
//         setAllData(d);
//         setDataLoading(false);
//       })
//       .catch(() => {
//         setAllData([
//           {
//             rollNo: "8000003",
//             category: "OBC",
//             appliedUnder: "General",
//             pwbd: null,
//             rank: "10479",
//             percentile: "88.7506502",
//             course: "MDMS",
//           },
//           {
//             rollNo: "7700002",
//             category: "GEN",
//             appliedUnder: "General",
//             pwbd: null,
//             rank: "1200",
//             percentile: "98.712",
//             course: "MDMS",
//           },
//         ]);
//         setDataLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (result) {
//       setBarWidth(0);
//       const t = setTimeout(
//         () => setBarWidth(Math.min(100, parseFloat(result.percentile))),
//         80,
//       );
//       return () => clearTimeout(t);
//     }
//   }, [result]);

//   const handleSearch = () => {
//     const q = rollInput.trim();
//     if (!q || searching || dataLoading) return;
//     setSearching(true);
//     setHasSearched(true);
//     setResult(null);
//     setNotFound(false);

//     const newUrl = `${window.location.pathname}?roll=${q}`;
//     window.history.pushState({ path: newUrl }, "", newUrl);

//     setTimeout(() => {
//       const found = allData.find((r) => r.rollNo === q);
//       found ? setResult(found) : setNotFound(true);
//       setSearching(false);
//     }, 420);
//   };

//   const reset = () => {
//     setRollInput("");
//     setResult(null);
//     setNotFound(false);
//     setHasSearched(false);
//     setCopied(false);
//     window.history.pushState(
//       { path: window.location.pathname },
//       "",
//       window.location.pathname,
//     );
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const handleShare = () => {
//     if (!result) return;

//     const shareUrl = `${window.location.origin}${window.location.pathname}?roll=${result.rollNo}`;
//     const shareText = `My INI-CET 2026 Result - Rank: #${result.rank}, Percentile: ${result.percentile}%`;

//     if (navigator.share) {
//       navigator
//         .share({
//           title: "INI-CET 2026 Result",
//           text: shareText,
//           url: shareUrl,
//         })
//         .catch(() => {
//           copyToClipboard(shareUrl);
//         });
//     } else {
//       copyToClipboard(shareUrl);
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const rank = result ? parseInt(result.rank) || 0 : 0;
//   const pct = result ? parseFloat(result.percentile) || 0 : 0;
//   const tier = getRankTier(rank);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       {/* Header with Back Button */}
//       <div className="bg-white border-b border-blue-200 px-3 py-3 shadow-sm sticky top-0 z-50">
//         <div className="max-w-3xl mx-auto flex items-center justify-between">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span className="hidden sm:inline">Back</span>
//           </button>

//           <div className="text-center">
//             <h1 className="text-lg sm:text-xl font-bold text-blue-900">
//               INI-CET 2026 Result
//             </h1>
//             <p className="text-xs text-blue-600 hidden sm:block">
//               Check your rank and percentile
//             </p>
//           </div>

//           <div className="w-16 sm:w-20" />
//         </div>
//       </div>

//       {/* Main Content - Centered */}
//       <div className="max-w-3xl mx-auto px-3 py-4 sm:py-6">
//         {/* Search Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-4 sm:p-6 mb-4 sm:mb-6">
//           <div className="mb-4">
//             <label className="block text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">
//               Enter Roll Number
//             </label>
//             <div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 inputMode="numeric"
//                 value={rollInput}
//                 onChange={(e) =>
//                   setRollInput(e.target.value.replace(/\D/g, ""))
//                 }
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 placeholder="e.g. 8000003"
//                 maxLength={12}
//                 disabled={dataLoading}
//                 className="flex-1 border-2 border-blue-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-mono font-bold text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-blue-300 transition-all disabled:opacity-50"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={!rollInput.trim() || searching || dataLoading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base"
//               >
//                 {searching ? (
//                   <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
//                 ) : (
//                   <>
//                     <Search className="w-4 h-4 sm:w-5 sm:h-5" />
//                     <span className="hidden sm:inline">Search</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {!hasSearched && !dataLoading && (
//             <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-blue-100">
//               {[
//                 { val: "49,769", label: "Total" },
//                 { val: "46,884", label: "MD/MS" },
//                 { val: "2,885", label: "MDS" },
//               ].map((s) => (
//                 <div
//                   key={s.label}
//                   className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center"
//                 >
//                   <div className="text-sm sm:text-lg font-extrabold text-blue-700">
//                     {s.val}
//                   </div>
//                   <div className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase">
//                     {s.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Results Section */}
//         <div className="space-y-4">
//           {searching && (
//             <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8 sm:p-12 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4" />
//               <p className="text-blue-700 font-bold text-base sm:text-lg">
//                 Searching...
//               </p>
//               <p className="text-blue-500 text-sm font-mono mt-2">
//                 {rollInput}
//               </p>
//             </div>
//           )}

//           {result && !searching && (
//             <div className="space-y-3 sm:space-y-4 animate-fade-in">
//               {/* Action Bar */}
//               <div className="flex items-center justify-between gap-2">
//                 <button
//                   onClick={reset}
//                   className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-700 border-2 border-blue-300 rounded-lg sm:rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-50 transition-all"
//                 >
//                   <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden sm:inline">Search Again</span>
//                   <span className="sm:hidden">New</span>
//                 </button>

//                 <button
//                   onClick={handleShare}
//                   className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-full transition-all border-2 ${
//                     copied
//                       ? "bg-green-100 text-green-700 border-green-300"
//                       : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
//                   }`}
//                 >
//                   {copied ? (
//                     <>
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span className="hidden sm:inline">Copied!</span>
//                     </>
//                   ) : (
//                     <>
//                       <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span className="hidden sm:inline">Share</span>
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Main Result Card */}
//               <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 sm:px-6 py-4 sm:py-5 text-white">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
//                         Roll Number
//                       </p>
//                       <p className="text-white text-2xl sm:text-3xl font-extrabold font-mono">
//                         {result.rollNo}
//                       </p>
//                     </div>
//                     <span
//                       className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full border ${tier.bg} ${tier.color} ${tier.border}`}
//                     >
//                       {tier.label}
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
//                     <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-blue-500 text-white border border-blue-400">
//                       {result.course}
//                     </span>
//                     {result.category && result.category.trim() !== "" && (
//                       <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-white/20 text-white border border-white/30">
//                         {result.category}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Body */}
//                 <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   {/* Rank Block */}
//                   <div
//                     className={`rounded-xl sm:rounded-2xl border-2 p-4 sm:p-5 flex items-center justify-between ${tier.bg} ${tier.border}`}
//                   >
//                     <div>
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                         Overall Rank
//                       </p>
//                       <p
//                         className={`text-3xl sm:text-5xl font-black font-mono ${tier.color}`}
//                       >
//                         #{result.rank}
//                       </p>
//                     </div>
//                     <div
//                       className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-3xl border-2 ${tier.border} bg-white`}
//                     >
//                       🏆
//                     </div>
//                   </div>

//                   {/* Percentile Block */}
//                   <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 sm:p-5">
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-700 uppercase tracking-widest">
//                         Percentile
//                       </p>
//                       <p className="text-xl sm:text-3xl font-extrabold text-blue-800 font-mono">
//                         {pct.toFixed(3)}
//                       </p>
//                     </div>
//                     <div className="h-2 sm:h-3 bg-blue-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-1000"
//                         style={{ width: `${barWidth}%` }}
//                       />
//                     </div>
//                   </div>

//                   {/* Info Grid */}
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     {/* Category - Show only if has data */}
//                     {result.category && result.category.trim() !== "" ? (
//                       <div
//                         className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 ${getCatStyle(result.category)}`}
//                       >
//                         <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                           Category
//                         </p>
//                         <span className="text-sm sm:text-lg font-bold">
//                           {result.category}
//                         </span>
//                       </div>
//                     ) : null}

//                     {/* Applied Under - Show only if has data */}
//                     {result.appliedUnder &&
//                     result.appliedUnder.trim() !== "" ? (
//                       <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
//                         <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                           Applied Under
//                         </p>
//                         <span className="text-sm sm:text-lg font-bold text-blue-800">
//                           {result.appliedUnder}
//                         </span>
//                       </div>
//                     ) : null}
//                   </div>

//                   {/* PWBD - Show only if has data */}
//                   {result.pwbd && result.pwbd.trim() !== "" ? (
//                     <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                         PWBD Status
//                       </p>
//                       <span className="text-sm sm:text-lg font-bold text-blue-800">
//                         {result.pwbd}
//                       </span>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Back to Dashboard CTA */}
//               <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-xl text-center border-2 border-blue-600">
//                 <h3 className="font-bold text-base sm:text-lg mb-2">
//                   Back to Dashboard
//                 </h3>
//                 <p className="text-blue-100 text-xs sm:text-sm mb-4">
//                   Return to your dashboard or login page
//                 </p>
//                 <button
//                   onClick={() => (window.location.href = "/dashboard")}
//                   className="w-full bg-white text-blue-700 font-bold py-2.5 sm:py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base group"
//                 >
//                   <span>Go to Dashboard</span>
//                   <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button
//                   onClick={() => (window.location.href = "/login")}
//                   className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base border-2 border-blue-400"
//                 >
//                   Login / Sign Up
//                 </button>
//               </div>
//             </div>
//           )}

//           {notFound && !searching && (
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6 sm:p-8 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                 <span className="text-2xl sm:text-3xl">⚠️</span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">
//                 Result Not Found
//               </h3>
//               <p className="text-blue-600 text-xs sm:text-sm mb-4">
//                 Roll number{" "}
//                 <span className="font-mono font-bold">{rollInput}</span> not
//                 found
//               </p>
//               <button
//                 onClick={reset}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   ArrowLeft,
//   Share2,
//   RotateCcw,
//   Loader,
//   Check,
//   ArrowRight,
// } from "lucide-react";

// interface Result {
//   rollNo: string;
//   category: string;
//   appliedUnder: string;
//   pwbd: string | null;
//   rank: string;
//   percentile: string;
//   course: string;
// }

// const CATEGORY_STYLES: Record<string, string> = {
//   GEN: "bg-blue-100 text-blue-800 border-blue-300",
//   UR: "bg-blue-100 text-blue-800 border-blue-300",
//   OBC: "bg-blue-50 text-blue-700 border-blue-200",
//   SC: "bg-blue-100 text-blue-800 border-blue-300",
//   ST: "bg-blue-50 text-blue-700 border-blue-200",
//   EWS: "bg-blue-100 text-blue-800 border-blue-300",
//   "OBC-NCL": "bg-blue-50 text-blue-700 border-blue-200",
//   GENERAL: "bg-blue-50 text-blue-700 border-blue-200",
// };

// const getCatStyle = (cat: string) =>
//   CATEGORY_STYLES[cat?.toUpperCase()] ??
//   "bg-blue-50 text-blue-700 border-blue-200";

// const getRankTier = (rank: number) => {
//   if (rank <= 500)
//     return {
//       label: "Outstanding",
//       color: "text-blue-800",
//       bg: "bg-blue-100",
//       border: "border-blue-400",
//     };
//   if (rank <= 2000)
//     return {
//       label: "Excellent",
//       color: "text-blue-700",
//       bg: "bg-blue-50",
//       border: "border-blue-300",
//     };
//   if (rank <= 8000)
//     return {
//       label: "Good",
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//     };
//   if (rank <= 20000)
//     return {
//       label: "Average",
//       color: "text-blue-500",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//     };
//   return {
//     label: "Qualified",
//     color: "text-blue-400",
//     bg: "bg-blue-50",
//     border: "border-blue-200",
//   };
// };

// export default function InicetResultPage() {
//   const [allData, setAllData] = useState<Result[]>([]);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [rollInput, setRollInput] = useState("");
//   const [result, setResult] = useState<Result | null>(null);
//   const [notFound, setNotFound] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [barWidth, setBarWidth] = useState(0);
//   const [copied, setCopied] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const rollFromUrl = urlParams.get("roll");
//     if (rollFromUrl) {
//       setRollInput(rollFromUrl);
//     }

//     fetch("/inicet-results.json")
//       .then((r) => (r.ok ? r.json() : Promise.reject()))
//       .then((d: Result[]) => {
//         setAllData(d);
//         setDataLoading(false);
//       })
//       .catch(() => {
//         // Demo fallback data - includes the actual roll number
//         setAllData([
//           {
//             rollNo: "8106426",
//             category: "UR",
//             appliedUnder: "General",
//             pwbd: null,
//             rank: "286",
//             percentile: "95.2925353",
//             course: "MDS",
//           },
//           {
//             rollNo: "8000003",
//             category: "OBC",
//             appliedUnder: "General",
//             pwbd: null,
//             rank: "10479",
//             percentile: "88.7506502",
//             course: "MDMS",
//           },
//           {
//             rollNo: "7700002",
//             category: "GEN",
//             appliedUnder: "General",
//             pwbd: null,
//             rank: "1200",
//             percentile: "98.712",
//             course: "MDMS",
//           },
//         ]);
//         setDataLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (result) {
//       setBarWidth(0);
//       const t = setTimeout(
//         () => setBarWidth(Math.min(100, parseFloat(result.percentile))),
//         80,
//       );
//       return () => clearTimeout(t);
//     }
//   }, [result]);

//   const handleSearch = () => {
//     const q = rollInput.trim();
//     if (!q || searching || dataLoading) return;
//     setSearching(true);
//     setHasSearched(true);
//     setResult(null);
//     setNotFound(false);

//     const newUrl = `${window.location.pathname}?roll=${q}`;
//     window.history.pushState({ path: newUrl }, "", newUrl);

//     setTimeout(() => {
//       const found = allData.find((r) => r.rollNo === q);
//       found ? setResult(found) : setNotFound(true);
//       setSearching(false);
//     }, 420);
//   };

//   const reset = () => {
//     setRollInput("");
//     setResult(null);
//     setNotFound(false);
//     setHasSearched(false);
//     setCopied(false);
//     window.history.pushState(
//       { path: window.location.pathname },
//       "",
//       window.location.pathname,
//     );
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const handleShare = () => {
//     if (!result) return;

//     const shareUrl = `${window.location.origin}${window.location.pathname}?roll=${result.rollNo}`;
//     const shareText = `My INI-CET 2026 Result - Rank: #${result.rank}, Percentile: ${result.percentile}%`;

//     if (navigator.share) {
//       navigator
//         .share({
//           title: "INI-CET 2026 Result",
//           text: shareText,
//           url: shareUrl,
//         })
//         .catch(() => {
//           copyToClipboard(shareUrl);
//         });
//     } else {
//       copyToClipboard(shareUrl);
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const rank = result ? parseInt(result.rank) || 0 : 0;
//   const pct = result ? parseFloat(result.percentile) || 0 : 0;
//   const tier = getRankTier(rank);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       {/* Header with Back Button */}
//       <div className="bg-white border-b border-blue-200 px-3 py-3 shadow-sm sticky top-0 z-50">
//         <div className="max-w-3xl mx-auto flex items-center justify-between">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span className="hidden sm:inline">Back</span>
//           </button>

//           <div className="text-center">
//             <h1 className="text-lg sm:text-xl font-bold text-blue-900">
//               INI-CET 2026 Result
//             </h1>
//             <p className="text-xs text-blue-600 hidden sm:block">
//               Check your rank and percentile
//             </p>
//           </div>

//           <div className="w-16 sm:w-20" />
//         </div>
//       </div>

//       {/* Main Content - Centered */}
//       <div className="max-w-3xl mx-auto px-3 py-4 sm:py-6">
//         {/* Search Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-4 sm:p-6 mb-4 sm:mb-6">
//           <div className="mb-4">
//             <label className="block text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">
//               Enter Roll Number
//             </label>
//             <div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 inputMode="numeric"
//                 value={rollInput}
//                 onChange={(e) =>
//                   setRollInput(e.target.value.replace(/\D/g, ""))
//                 }
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 placeholder="e.g. 8106426"
//                 maxLength={12}
//                 disabled={dataLoading}
//                 className="flex-1 border-2 border-blue-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-mono font-bold text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-blue-300 transition-all disabled:opacity-50"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={!rollInput.trim() || searching || dataLoading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base"
//               >
//                 {searching ? (
//                   <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
//                 ) : (
//                   <>
//                     <Search className="w-4 h-4 sm:w-5 sm:h-5" />
//                     <span className="hidden sm:inline">Search</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {!hasSearched && !dataLoading && (
//             <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-blue-100">
//               {[
//                 { val: "49,769", label: "Total" },
//                 { val: "46,884", label: "MD/MS" },
//                 { val: "2,885", label: "MDS" },
//               ].map((s) => (
//                 <div
//                   key={s.label}
//                   className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center"
//                 >
//                   <div className="text-sm sm:text-lg font-extrabold text-blue-700">
//                     {s.val}
//                   </div>
//                   <div className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase">
//                     {s.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Results Section */}
//         <div className="space-y-4">
//           {searching && (
//             <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8 sm:p-12 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4" />
//               <p className="text-blue-700 font-bold text-base sm:text-lg">
//                 Searching...
//               </p>
//               <p className="text-blue-500 text-sm font-mono mt-2">
//                 {rollInput}
//               </p>
//             </div>
//           )}

//           {result && !searching && (
//             <div className="space-y-3 sm:space-y-4 animate-fade-in">
//               {/* Action Bar */}
//               <div className="flex items-center justify-between gap-2">
//                 <button
//                   onClick={reset}
//                   className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-700 border-2 border-blue-300 rounded-lg sm:rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-50 transition-all"
//                 >
//                   <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden sm:inline">Search Again</span>
//                   <span className="sm:hidden">New</span>
//                 </button>

//                 <button
//                   onClick={handleShare}
//                   className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-full transition-all border-2 ${
//                     copied
//                       ? "bg-green-100 text-green-700 border-green-300"
//                       : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
//                   }`}
//                 >
//                   {copied ? (
//                     <>
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span className="hidden sm:inline">Copied!</span>
//                     </>
//                   ) : (
//                     <>
//                       <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span className="hidden sm:inline">Share</span>
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Main Result Card */}
//               <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 sm:px-6 py-4 sm:py-5 text-white">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
//                         Roll Number
//                       </p>
//                       <p className="text-white text-2xl sm:text-3xl font-extrabold font-mono">
//                         {result.rollNo}
//                       </p>
//                     </div>
//                     <span
//                       className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full border ${tier.bg} ${tier.color} ${tier.border}`}
//                     >
//                       {tier.label}
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
//                     <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-blue-500 text-white border border-blue-400">
//                       {result.course}
//                     </span>
//                     {result.category && result.category.trim() !== "" && (
//                       <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-white/20 text-white border border-white/30">
//                         {result.category}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Body */}
//                 <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//                   {/* Rank Block */}
//                   <div
//                     className={`rounded-xl sm:rounded-2xl border-2 p-4 sm:p-5 flex items-center justify-between ${tier.bg} ${tier.border}`}
//                   >
//                     <div>
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                         Overall Rank
//                       </p>
//                       <p
//                         className={`text-3xl sm:text-5xl font-black font-mono ${tier.color}`}
//                       >
//                         #{result.rank}
//                       </p>
//                     </div>
//                     <div
//                       className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-3xl border-2 ${tier.border} bg-white`}
//                     >
//                       🏆
//                     </div>
//                   </div>

//                   {/* Percentile Block */}
//                   <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 sm:p-5">
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-700 uppercase tracking-widest">
//                         Percentile
//                       </p>
//                       <p className="text-xl sm:text-3xl font-extrabold text-blue-800 font-mono">
//                         {pct.toFixed(3)}
//                       </p>
//                     </div>
//                     <div className="h-2 sm:h-3 bg-blue-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-1000"
//                         style={{ width: `${barWidth}%` }}
//                       />
//                     </div>
//                   </div>

//                   {/* Info Grid */}
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     {/* Category - Show only if has data */}
//                     {result.category && result.category.trim() !== "" ? (
//                       <div
//                         className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 ${getCatStyle(result.category)}`}
//                       >
//                         <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                           Category
//                         </p>
//                         <span className="text-sm sm:text-lg font-bold">
//                           {result.category}
//                         </span>
//                       </div>
//                     ) : null}

//                     {/* Applied Under - Show only if has data */}
//                     {result.appliedUnder &&
//                     result.appliedUnder.trim() !== "" ? (
//                       <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
//                         <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                           Applied Under
//                         </p>
//                         <span className="text-sm sm:text-lg font-bold text-blue-800">
//                           {result.appliedUnder}
//                         </span>
//                       </div>
//                     ) : null}
//                   </div>

//                   {/* PWBD - Show only if has data */}
//                   {result.pwbd && result.pwbd.trim() !== "" ? (
//                     <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
//                       <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
//                         PWBD Status
//                       </p>
//                       <span className="text-sm sm:text-lg font-bold text-blue-800">
//                         {result.pwbd}
//                       </span>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Back to Dashboard CTA */}
//               <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-xl text-center border-2 border-blue-600">
//                 <h3 className="font-bold text-base sm:text-lg mb-2">
//                   Back to Dashboard
//                 </h3>
//                 <p className="text-blue-100 text-xs sm:text-sm mb-4">
//                   Return to your dashboard or login page
//                 </p>
//                 <button
//                   onClick={() => (window.location.href = "/dashboard")}
//                   className="w-full bg-white text-blue-700 font-bold py-2.5 sm:py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base group"
//                 >
//                   <span>Go to Dashboard</span>
//                   <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button
//                   onClick={() => (window.location.href = "/login")}
//                   className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base border-2 border-blue-400"
//                 >
//                   Login / Sign Up
//                 </button>
//               </div>
//             </div>
//           )}

//           {notFound && !searching && (
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6 sm:p-8 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                 <span className="text-2xl sm:text-3xl">⚠️</span>
//               </div>
//               <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">
//                 Result Not Found
//               </h3>
//               <p className="text-blue-600 text-xs sm:text-sm mb-4">
//                 Roll number{" "}
//                 <span className="font-mono font-bold">{rollInput}</span> not
//                 found
//               </p>
//               <button
//                 onClick={reset}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useRef } from "react";
import {
  Search,
  ArrowLeft,
  Share2,
  RotateCcw,
  Loader,
  Check,
  ArrowRight,
} from "lucide-react";

interface Result {
  rollNo: string;
  category: string;
  appliedUnder: string;
  pwbd: string | null;
  rank: string;
  percentile: string;
  course: string;
}

const CATEGORY_STYLES: Record<string, string> = {
  GEN: "bg-blue-100 text-blue-800 border-blue-300",
  UR: "bg-blue-100 text-blue-800 border-blue-300",
  OBC: "bg-blue-50 text-blue-700 border-blue-200",
  SC: "bg-blue-100 text-blue-800 border-blue-300",
  ST: "bg-blue-50 text-blue-700 border-blue-200",
  EWS: "bg-blue-100 text-blue-800 border-blue-300",
  "OBC-NCL": "bg-blue-50 text-blue-700 border-blue-200",
  GENERAL: "bg-blue-50 text-blue-700 border-blue-200",
};

const getCatStyle = (cat: string) =>
  CATEGORY_STYLES[cat?.toUpperCase()] ??
  "bg-blue-50 text-blue-700 border-blue-200";

const getRankTier = (rank: number) => {
  if (rank <= 500)
    return {
      label: "Outstanding",
      color: "text-blue-800",
      bg: "bg-blue-100",
      border: "border-blue-400",
    };
  if (rank <= 2000)
    return {
      label: "Excellent",
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-300",
    };
  if (rank <= 8000)
    return {
      label: "Good",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    };
  if (rank <= 20000)
    return {
      label: "Average",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
    };
  return {
    label: "Qualified",
    color: "text-blue-400",
    bg: "bg-blue-50",
    border: "border-blue-200",
  };
};

export default function InicetResultPage() {
  const [allData, setAllData] = useState<Result[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [rollInput, setRollInput] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Demo data with the actual roll number
  const demoData: Result[] = [
    {
      rollNo: "8106426",
      category: "UR",
      appliedUnder: "General",
      pwbd: null,
      rank: "286",
      percentile: "95.2925353",
      course: "MDS",
    },
    {
      rollNo: "8000003",
      category: "OBC",
      appliedUnder: "General",
      pwbd: null,
      rank: "10479",
      percentile: "88.7506502",
      course: "MDMS",
    },
    {
      rollNo: "7700002",
      category: "GEN",
      appliedUnder: "General",
      pwbd: null,
      rank: "1200",
      percentile: "98.712",
      course: "MDMS",
    },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rollFromUrl = urlParams.get("roll");
    if (rollFromUrl) {
      setRollInput(rollFromUrl);
    }

    // Load data with better error handling
    const loadData = async () => {
      try {
        const response = await fetch("/inicet-results.json");
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        const data: Result[] = await response.json();
        console.log("Loaded data from JSON:", data.length, "records");
        setAllData(data);
        setDataLoading(false);
      } catch (error) {
        console.log("Using demo data:", demoData);
        setAllData(demoData);
        setDataLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (result) {
      setBarWidth(0);
      const t = setTimeout(
        () => setBarWidth(Math.min(100, parseFloat(result.percentile))),
        80,
      );
      return () => clearTimeout(t);
    }
  }, [result]);

  const handleSearch = () => {
    const q = rollInput.trim();
    if (!q || searching || dataLoading) return;

    console.log("Searching for roll number:", q);
    console.log("Total records in database:", allData.length);

    setSearching(true);
    setHasSearched(true);
    setResult(null);
    setNotFound(false);

    const newUrl = `${window.location.pathname}?roll=${q}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    setTimeout(() => {
      // More flexible search - try both string and loose comparison
      const found = allData.find((r) => {
        const rollNoStr = String(r.rollNo).trim();
        const searchStr = q.trim();
        return rollNoStr === searchStr;
      });

      console.log("Search result:", found ? "Found" : "Not found");

      if (found) {
        setResult(found);
      } else {
        setNotFound(true);
        // Show available roll numbers for debugging
        console.log(
          "Available roll numbers:",
          allData.map((r) => r.rollNo),
        );
      }
      setSearching(false);
    }, 420);
  };

  const reset = () => {
    setRollInput("");
    setResult(null);
    setNotFound(false);
    setHasSearched(false);
    setCopied(false);
    window.history.pushState(
      { path: window.location.pathname },
      "",
      window.location.pathname,
    );
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleShare = () => {
    if (!result) return;

    const shareUrl = `${window.location.origin}${window.location.pathname}?roll=${result.rollNo}`;
    const shareText = `My INI-CET 2026 Result - Rank: #${result.rank}, Percentile: ${result.percentile}%`;

    if (navigator.share) {
      navigator
        .share({
          title: "INI-CET 2026 Result",
          text: shareText,
          url: shareUrl,
        })
        .catch(() => {
          copyToClipboard(shareUrl);
        });
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const rank = result ? parseInt(result.rank) || 0 : 0;
  const pct = result ? parseFloat(result.percentile) || 0 : 0;
  const tier = getRankTier(rank);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-blue-200 px-3 py-3 shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-bold text-blue-900">
              INI-CET 2026 Result
            </h1>
            <p className="text-xs text-blue-600 hidden sm:block">
              Check your rank and percentile
            </p>
          </div>

          <div className="w-16 sm:w-20" />
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="max-w-3xl mx-auto px-3 py-4 sm:py-6">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="mb-4">
            <label className="block text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">
              Enter Roll Number
            </label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={rollInput}
                onChange={(e) =>
                  setRollInput(e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="e.g. 8106426"
                maxLength={12}
                disabled={dataLoading}
                className="flex-1 border-2 border-blue-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-mono font-bold text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-blue-300 transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSearch}
                disabled={!rollInput.trim() || searching || dataLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base"
              >
                {searching ? (
                  <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Search</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {!hasSearched && !dataLoading && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-blue-100">
              {[
                { val: "49,769", label: "Total" },
                { val: "46,884", label: "MD/MS" },
                { val: "2,885", label: "MDS" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center"
                >
                  <div className="text-sm sm:text-lg font-extrabold text-blue-700">
                    {s.val}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {searching && (
            <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8 sm:p-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-blue-700 font-bold text-base sm:text-lg">
                Searching...
              </p>
              <p className="text-blue-500 text-sm font-mono mt-2">
                {rollInput}
              </p>
            </div>
          )}

          {result && !searching && (
            <div className="space-y-3 sm:space-y-4 animate-fade-in">
              {/* Action Bar */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-700 border-2 border-blue-300 rounded-lg sm:rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-50 transition-all"
                >
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Search Again</span>
                  <span className="sm:hidden">New</span>
                </button>

                <button
                  onClick={handleShare}
                  className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-full transition-all border-2 ${
                    copied
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>
              </div>

              {/* Main Result Card */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 sm:px-6 py-4 sm:py-5 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
                        Roll Number
                      </p>
                      <p className="text-white text-2xl sm:text-3xl font-extrabold font-mono">
                        {result.rollNo}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full border ${tier.bg} ${tier.color} ${tier.border}`}
                    >
                      {tier.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-blue-500 text-white border border-blue-400">
                      {result.course}
                    </span>
                    {result.category && result.category.trim() !== "" && (
                      <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-white/20 text-white border border-white/30">
                        {result.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Rank Block */}
                  <div
                    className={`rounded-xl sm:rounded-2xl border-2 p-4 sm:p-5 flex items-center justify-between ${tier.bg} ${tier.border}`}
                  >
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                        Overall Rank
                      </p>
                      <p
                        className={`text-3xl sm:text-5xl font-black font-mono ${tier.color}`}
                      >
                        #{result.rank}
                      </p>
                    </div>
                    <div
                      className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-3xl border-2 ${tier.border} bg-white`}
                    >
                      🏆
                    </div>
                  </div>

                  {/* Percentile Block */}
                  <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] sm:text-xs font-bold text-blue-700 uppercase tracking-widest">
                        Percentile
                      </p>
                      <p className="text-xl sm:text-3xl font-extrabold text-blue-800 font-mono">
                        {pct.toFixed(3)}
                      </p>
                    </div>
                    <div className="h-2 sm:h-3 bg-blue-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-1000"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {/* Category */}
                    {result.category && result.category.trim() !== "" ? (
                      <div
                        className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 ${getCatStyle(result.category)}`}
                      >
                        <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                          Category
                        </p>
                        <span className="text-sm sm:text-lg font-bold">
                          {result.category}
                        </span>
                      </div>
                    ) : null}

                    {/* Applied Under */}
                    {result.appliedUnder &&
                    result.appliedUnder.trim() !== "" ? (
                      <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
                        <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                          Applied Under
                        </p>
                        <span className="text-sm sm:text-lg font-bold text-blue-800">
                          {result.appliedUnder}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* PWBD */}
                  {result.pwbd && result.pwbd.trim() !== "" ? (
                    <div className="rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                        PWBD Status
                      </p>
                      <span className="text-sm sm:text-lg font-bold text-blue-800">
                        {result.pwbd}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Back to Dashboard CTA */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-xl text-center border-2 border-blue-600">
                <h3 className="font-bold text-base sm:text-lg mb-2">
                  Back to Dashboard
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm mb-4">
                  Return to your dashboard or login page
                </p>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="w-full bg-white text-blue-700 font-bold py-2.5 sm:py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base group"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base border-2 border-blue-400"
                >
                  Login / Sign Up
                </button>
              </div>
            </div>
          )}

          {notFound && !searching && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">⚠️</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">
                Result Not Found
              </h3>
              <p className="text-blue-600 text-xs sm:text-sm mb-4">
                Roll number{" "}
                <span className="font-mono font-bold text-red-600">
                  {rollInput}
                </span>{" "}
                not found in database
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-left text-xs">
                <p className="font-semibold mb-1">
                  Available test roll numbers:
                </p>
                <ul className="space-y-1 text-gray-700">
                  {allData.slice(0, 5).map((r) => (
                    <li key={r.rollNo}>
                      • {r.rollNo} - {r.course}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={reset}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
