// import React, { useState, useEffect } from "react";
// import { ArrowLeft, TrendingUp, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";
// import { closingRanksAPI } from "../services/api";

// interface ClosingRanksPageProps {
//   onBack: () => void;
// }

// interface ClosingRankData {
//   Quota: string;
//   Category: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Fee: string;
//   Stipend_Year_1: string;
//   Bond_Years: number;
//   Bond_Penalty: string;
//   Beds: number;
//   CR_2023_1: number;
//   CR_2023_2: number;
//   CR_2023_3: number;
//   CR_2023_4: number;
//   CR_2023_5: number;
//   CR_2024_1: number;
//   CR_2024_2: number;
//   CR_2024_3: number;
//   CR_2024_4: number;
//   CR_2024_5: number;
// }

// /**
//  * Enhanced Closing Ranks Page Component
//  * Features sidebar navigation and comprehensive closing ranks data
//  */
// const ClosingRanksPage: React.FC<ClosingRanksPageProps> = ({ onBack }) => {
//   const [closingRankData, setClosingRankData] = useState<ClosingRankData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedQuota, setSelectedQuota] = useState("all");

//   const counsellingOptions = [
//     "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)",
//     "Goa - PG Medical",
//     "Gujarat - PG Medical", 
//     "Haryana - PG Medical",
//     "Himachal Pradesh - PG Medical",
//     "Jammu and Kashmir - PG Medical",
//     "Jharkhand - PG Medical",
//     "Karnataka - PG Medical",
//     "Kerala - PG Medical",
//     "Madhya Pradesh - PG Medical",
//     "Maharashtra - PG Medical",
//     "Manipur-JNIMS - PG Medical",
//     "Manipur-RIMS - PG Medical",
//     "NEIGRIHMS - PG Medical",
//     "Odisha - PG Medical",
//     "Pondicherry - PG Medical",
//     "Punjab - PG Medical",
//     "Rajasthan - PG Medical",
//     "Sikkim - PG Medical",
//     "Tamil Nadu Government Quota - PG Medical",
//     "Tamil Nadu Management Quota - PG Medical",
//     "Telangana Government Quota - PG Medical",
//     "Telangana Management Quota - PG Medical",
//     "Tripura - PG Medical",
//     "Uttarakhand - PG Medical",
//     "Uttar Pradesh - PG Medical",
//     "West Bengal - PG Medical",
//   ];

//   // Generate dummy data for demonstration
//   const generateDummyData = (counselling: string, exam: "PG"): ClosingRankData[] => {
//     const dummyData: ClosingRankData[] = [];
//     const institutes = [
//       "AIIMS New Delhi", "PGIMER Chandigarh", "JIPMER Puducherry", "CMC Vellore",
//       "NIMHANS Bangalore", "SGPGIMS Lucknow", "KGMU Lucknow", "BHU Varanasi","ABVIMS Dr RML Hosp Delhi","SMS Jaipur",
//       "VMMC Delhi","BJMC Ahmedabad","Madras Med Coll Chennai", "MAMC Delhi", "Seth GS Mumbai", "Govt Med Coll Kozhikode", 
//       "NIMS Hyderabad", "GMC Chandigarh", "Sher-I-Kashmir Srinagar", 
//       "Bangalore Med Coll Bangalore", "SGPGI Lucknow", "Lokmanya Tilak Sion Mumbai", 
//       "IPGMER Kolkata", "Lady Hardinge Delhi", "Medical College Kolkata", 
//       "UCMS Delhi", "Grant Med Coll Mumbai", "Stanley Med Coll Chennai", 
//       "IMS(BHU) Varanasi", "GB Pant IPGMER Delhi",
//     ];
//     const courses =
//     exam === "PG"
//     ? [
//         "MBBS",
//         "BDS",
//         "BAMS",
//         "BHMS"
//       ]
//     : [
//         "MD General Medicine",
//         "MD Pediatrics",
//         "MD Psychiatry",
//         "MS General Surgery",
//         "MD Anesthesiology",
//         "MD Radiology",
//         "MD Pathology",
//         "MS Orthopedics",
//         "MD Dermatology",
//         "MD Forensic Medicine",
//         "MD Microbiology",
//         "MS ENT",
//         "MD Physiology",
//         "MD Biochemistry",
//         "MD Pharmacology",
//         "MD Community Medicine (SPM)",
//         "MD Radiation Oncology",
//         "MD Ophthalmology",
//         "MD Pulmonary Medicine (TBRD)",
//         "MD Emergency Medicine",
//         "MD Nuclear Medicine",
//         "MD Anatomy",
//         "MD Palliative Medicine",
//         "MD Lab Medicine",
//         "DM Geriatrics",
//         "MD Sports Medicine",
//         "MD IHBT",
//         "MS Obstetrics & Gynecology (OBG)",
//         "MD Preventive & Social Medicine (PSM)",
//         // Diplomas (can keep separate if needed)
//         "DCH",
//         "DPM (Psychiatry)",
//         "DA",
//         "DGO",
//         "DO",
//         "DMRD",
//         "DTBCD",
//         "DDVL",
//         "DCP",
//         "DCM",
//         "DORTHO"
//       ];
//     const categories = ["GEN", "OBC", "SC", "ST", "EWS"];
//     const quotas = ["All India", "State Quota", "Management"];

//     for (let i = 0; i < 21150; i++) {
//       dummyData.push({
//         Quota: quotas[Math.floor(Math.random() * quotas.length)],
//         Category: categories[Math.floor(Math.random() * categories.length)],
//         State: counselling.includes("Delhi") ? "Delhi" : counselling.includes("Maharashtra") ? "Maharashtra" : "Various",
//         Institute: institutes[Math.floor(Math.random() * institutes.length)],
//         Course: courses[Math.floor(Math.random() * courses.length)],
//         Fee: `₹${Math.floor(Math.random() * 500000) + 50000}`,
//         Stipend_Year_1: `₹${Math.floor(Math.random() * 100000) + 50000}`,
//         Bond_Years: Math.floor(Math.random() * 5),
//         Bond_Penalty: `₹${Math.floor(Math.random() * 1000000) + 500000}`,
//         Beds: Math.floor(Math.random() * 1000) + 100,
//         CR_2023_1: Math.floor(Math.random() * 50000) + 1000,
//         CR_2023_2: Math.floor(Math.random() * 50000) + 1000,
//         CR_2023_3: Math.floor(Math.random() * 50000) + 1000,
//         CR_2023_4: Math.floor(Math.random() * 50000) + 1000,
//         CR_2023_5: Math.floor(Math.random() * 50000) + 1000,
//         CR_2024_1: Math.floor(Math.random() * 50000) + 1000,
//         CR_2024_2: Math.floor(Math.random() * 50000) + 1000,
//         CR_2024_3: Math.floor(Math.random() * 50000) + 1000,
//         CR_2024_4: Math.floor(Math.random() * 50000) + 1000,
//         CR_2024_5: Math.floor(Math.random() * 50000) + 1000,
//       });
//     }
//     return dummyData;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Simulate API call with dummy data
//         const dummyData = generateDummyData(selectedCounselling, "PG");
//         setClosingRankData(dummyData);
//       } catch (error) {
//         console.error("Error fetching closing ranks data:", error);
//         setClosingRankData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedCounselling]);

//   // Filter data based on search and filters
//   const filteredData = closingRankData.filter((item) => {
//     const matchesSearch = searchTerm === "" || 
//       item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesCategory = selectedCategory === "all" || item.Category === selectedCategory;
//     const matchesQuota = selectedQuota === "all" || item.Quota === selectedQuota;
    
//     return matchesSearch && matchesCategory && matchesQuota;
//   });

//   // Sort data in ascending order by CR 2024 1
//   const sortedData = [...filteredData].sort((a, b) => a.CR_2024_1 - b.CR_2024_1);

//   const itemsPerPage = 75; // Reduced for better mobile view
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

//   // Get unique values for filters
//   const categories = ["all", ...Array.from(new Set(closingRankData.map(item => item.Category)))];
//   const quotas = ["all", ...Array.from(new Set(closingRankData.map(item => item.Quota)))];

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Closing Ranks Data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile Overlay */}
//       {showSidebar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowSidebar(false)}></div>
//       )}

//       {/* Sidebar */}
//       {showSidebar && (
//         <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">NEET PG Closing Ranks</h2>
//               <button
//                 onClick={() => setShowSidebar(false)}
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search Counselling"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {counsellingOptions.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedCounselling(option)}
//                 className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
//                   selectedCounselling === option ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
//                     <span className="text-xs">📊</span>
//                   </div>
//                   <span className="text-sm text-gray-700">{option}</span>
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-gray-400" />
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//                 {/* Header */}
//         <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Closing Ranks</h1>
//                 <p className="text-xs text-green-100">2024 Session Data</p>
//               </div>
//             </div>
            
//             <button
//               onClick={() => setShowSidebar(!showSidebar)}
//               className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <Filter className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex flex-col md:flex-row gap-3">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search institutes, courses, or states..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//               />
//             </div>

//             {/* Category Filter */}
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
//             >
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category === "all" ? "All Categories" : category}
//                 </option>
//               ))}
//             </select>

//             {/* Quota Filter */}
//             <select
//               value={selectedQuota}
//               onChange={(e) => setSelectedQuota(e.target.value)}
//               className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
//             >
//               {quotas.map((quota) => (
//                 <option key={quota} value={quota}>
//                   {quota === "all" ? "All Quotas" : quota}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
//               <tr>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 1</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 2</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 3</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {paginatedData.map((item, index) => (
//                 <tr key={index} className="hover:bg-green-50 transition-colors">
//                   <td className="px-2 py-2 text-xs">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       item.Quota === "All India" ? "bg-green-100 text-green-800" :
//                       item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
//                       "bg-purple-100 text-purple-800"
//                     }`}>
//                       {item.Quota}
//                     </span>
//                   </td>
//                   <td className="px-2 py-2 text-xs">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       item.Category === "GEN" ? "bg-gray-100 text-gray-800" :
//                       item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
//                       item.Category === "SC" ? "bg-red-100 text-red-800" :
//                       item.Category === "ST" ? "bg-blue-100 text-blue-800" :
//                       "bg-green-100 text-green-800"
//                     }`}>
//                       {item.Category}
//                     </span>
//                   </td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.State}</td>
//                   <td className="px-2 py-2 text-xs text-green-600 hover:text-green-800 cursor-pointer font-medium">
//                     {item.Institute}
//                   </td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Course}</td>
//                   <td className="px-2 py-2 text-xs font-medium text-gray-900">{item.Fee}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Stipend_Year_1}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years} yrs</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Beds}</td>
//                   <td className="px-2 py-2 text-xs font-bold text-green-600">{item.CR_2024_1.toLocaleString()}</td>
//                   <td className="px-2 py-2 text-xs font-bold text-green-600">{item.CR_2024_2.toLocaleString()}</td>
//                   <td className="px-2 py-2 text-xs font-bold text-green-600">{item.CR_2024_3.toLocaleString()}</td>
//                   <td className="px-2 py-2">
//                     <button className="p-1 hover:bg-red-100 rounded transition-colors">
//                       <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="bg-white border-t border-gray-200 px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="text-xs text-gray-600">
//               Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
//             </div>
            
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="p-1.5 border Text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-3 h-3" />
//               </button>
              
//               <div className="flex space-x-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   const pageNum = i + 1;
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`px-2 py-1 text-xs rounded transition-colors ${
//                         currentPage === pageNum
//                           ? "bg-green-500 text-white"
//                           : "border Text-black border-gray-300 hover:bg-gray-50"
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
              
//               <button
//                 onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages}
//                 className="p-1.5 border Text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="w-3 h-3" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClosingRanksPage;

// import React, { useState, useEffect } from "react";
// import { ArrowLeft, TrendingUp, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";

// interface ClosingRanksPageProps {
//   onBack: () => void;
// }

// interface ClosingRankData {
//   Quota: string;
//   Category: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Fee: string;
//   Stipend_Year_1: string;
//   Bond_Years: number;
//   Bond_Penalty: string;
//   Beds: number;
//   CR_2023_1: number;
//   CR_2023_2: number;
//   CR_2023_3: number;
//   CR_2023_4: number;
//   CR_2023_5: number;
//   CR_2024_1: number;
//   CR_2024_2: number;
//   CR_2024_3: number;
//   CR_2024_4: number;
//   CR_2024_5: number;
// }

// /**
//  * Enhanced Closing Ranks Page Component
//  * Features sidebar navigation and comprehensive closing ranks data
//  */
// const ClosingRanksPage: React.FC<ClosingRanksPageProps> = ({ onBack }) => {
//   const [closingRankData, setClosingRankData] = useState<ClosingRankData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedQuota, setSelectedQuota] = useState("all");
//   const [selectedState, setSelectedState] = useState("all");
//   const [selectedCourse, setSelectedCourse] = useState("all");
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

//   const counsellingOptions = [
//     "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)",
//     "Goa - PG Medical",
//     "Gujarat - PG Medical", 
//     "Haryana - PG Medical",
//     "Himachal Pradesh - PG Medical",
//     "Jammu and Kashmir - PG Medical",
//     "Jharkhand - PG Medical",
//     "Karnataka - PG Medical",
//     "Kerala - PG Medical",
//     "Madhya Pradesh - PG Medical",
//     "Maharashtra - PG Medical",
//     "Manipur-JNIMS - PG Medical",
//     "Manipur-RIMS - PG Medical",
//     "NEIGRIHMS - PG Medical",
//     "Odisha - PG Medical",
//     "Pondicherry - PG Medical",
//     "Punjab - PG Medical",
//     "Rajasthan - PG Medical",
//     "Sikkim - PG Medical",
//     "Tamil Nadu Government Quota - PG Medical",
//     "Tamil Nadu Management Quota - PG Medical",
//     "Telangana Government Quota - PG Medical",
//     "Telangana Management Quota - PG Medical",
//     "Tripura - PG Medical",
//     "Uttarakhand - PG Medical",
//     "Uttar Pradesh - PG Medical",
//     "West Bengal - PG Medical",
//   ];

//   // API fetch function for closing ranks
//   const fetchClosingRanksFromAPI = async (params: { 
//     category?: string; 
//     quota?: string; 
//     state?: string; 
//     course?: string; 
//     page?: number 
//   }) => {
//     const queryParams = new URLSearchParams();
  
//     if (params.category && params.category !== "all") queryParams.append('category', params.category);
//     if (params.quota && params.quota !== "all") queryParams.append('quota', params.quota);
//     if (params.state && params.state !== "all") queryParams.append('state', params.state);
//     if (params.course && params.course !== "all") queryParams.append('course', params.course);
//     if (params.page) queryParams.append('page', params.page.toString());
//     queryParams.append('page_size', '75');
  
//     try {
//       console.log('Making Closing Ranks API request with params:', queryParams.toString());
//       const response = await fetch(`http://127.0.0.1:8000/get-closingranks/?${queryParams.toString()}`);
      
//       if (!response.ok) {
//         console.error(`Closing Ranks API returned status ${response.status}`);
//         return { results: [], count: 0 };
//       }
      
//       const data = await response.json();
//       console.log('Closing Ranks API Response:', data);
      
//       // Map the API response to match your interface
//       const mappedResults = data.results.map((item: any) => ({
//         Quota: item.quota || item.Quota || '',
//         Category: item.category || item.Category || '',
//         State: item.state || item.State || '',
//         Institute: item.institute || item.Institute || '',
//         Course: item.course || item.Course || '',
//         Fee: item.fee ? `₹${item.fee}` : item.Fee || '',
//         Stipend_Year_1: item.stipend_year1 ? `₹${item.stipend_year1}` : item.Stipend_Year_1 || '',
//         Bond_Years: parseFloat(item.bond_years || item.Bond_Years || 0),
//         Bond_Penalty: item.bond_penalty ? `₹${item.bond_penalty}` : item.Bond_Penalty || '',
//         Beds: parseInt(item.beds || item.Beds || 0),
//         CR_2023_1: parseInt(item.cr_2023_1 || item.CR_2023_1 || 0),
//         CR_2023_2: parseInt(item.cr_2023_2 || item.CR_2023_2 || 0),
//         CR_2023_3: parseInt(item.cr_2023_3 || item.CR_2023_3 || 0),
//         CR_2023_4: parseInt(item.cr_2023_4 || item.CR_2023_4 || 0),
//         CR_2023_5: parseInt(item.cr_2023_5 || item.CR_2023_5 || 0),
//         CR_2024_1: parseInt(item.cr_2024_1 || item.CR_2024_1 || 0),
//         CR_2024_2: parseInt(item.cr_2024_2 || item.CR_2024_2 || 0),
//         CR_2024_3: parseInt(item.cr_2024_3 || item.CR_2024_3 || 0),
//         CR_2024_4: parseInt(item.cr_2024_4 || item.CR_2024_4 || 0),
//         CR_2024_5: parseInt(item.cr_2024_5 || item.CR_2024_5 || 0),
//       }));
      
//       return {
//         results: mappedResults,
//         count: data.count
//       };
//     } catch (error) {
//       console.error("Closing Ranks Network error:", error);
//       return { results: [], count: 0 };
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         console.log('Fetching closing ranks data with filters:', {
//           category: selectedCategory,
//           quota: selectedQuota,
//           state: selectedState,
//           course: selectedCourse,
//           page: currentPage,
//         });

//         const data = await fetchClosingRanksFromAPI({
//           category: selectedCategory !== "all" ? selectedCategory : undefined,
//           quota: selectedQuota !== "all" ? selectedQuota : undefined,
//           state: selectedState !== "all" ? selectedState : undefined,
//           course: selectedCourse !== "all" ? selectedCourse : undefined,
//           page: currentPage,
//         });

//         console.log('Processed closing ranks data:', data);
        
//         if (data && Array.isArray(data.results) && typeof data.count === "number") {
//           setClosingRankData(data.results);
//           setTotalCount(data.count);
//         } else {
//           console.error("Unexpected closing ranks API response format:", data);
//           setClosingRankData([]);
//           setTotalCount(0);
//         }
//       } catch (error) {
//         console.error("Error fetching closing ranks data:", error);
//         setClosingRankData([]);
//         setTotalCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedCategory, selectedQuota, selectedState, selectedCourse, currentPage]);

//   // Get unique values for filters from current data
//   const categories = ["all", "GEN", "OBC", "SC", "ST", "EWS"];
//   const quotas = ["all", "AIQ", "All India", "State Quota", "Management"];
//   const states = ["all", ...Array.from(new Set(closingRankData.map(item => item.State)))];
//   const courses = ["all", ...Array.from(new Set(closingRankData.map(item => item.Course)))];

//   // Client-side filtering for search only
//   const filteredData = closingRankData.filter((item) => {
//     const matchesSearch = searchTerm === "" || 
//       item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
//     return matchesSearch;
//   });

//   // Sort data in ascending order by CR 2024 1
//   const sortedData = [...filteredData].sort((a, b) => a.CR_2024_1 - b.CR_2024_1);

//   const itemsPerPage = 75;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   // Clear all filters function
//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setSelectedCategory("all");
//     setSelectedQuota("all");
//     setSelectedState("all");
//     setSelectedCourse("all");
//     setCurrentPage(1);
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Closing Ranks Data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile Overlay */}
//       {showSidebar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowSidebar(false)}></div>
//       )}

//       {/* Sidebar */}
//       {showSidebar && (
//         <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">NEET PG Closing Ranks</h2>
//               <button
//                 onClick={() => setShowSidebar(false)}
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search Counselling"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {counsellingOptions.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedCounselling(option)}
//                 className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
//                   selectedCounselling === option ? "bg-green-50 border-l-4 border-l-green-500" : ""
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
//                     <span className="text-xs">📊</span>
//                   </div>
//                   <span className="text-sm text-gray-700">{option}</span>
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-gray-400" />
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Closing Ranks</h1>
//                 <p className="text-xs text-green-100">2024 Session Data</p>
//               </div>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-2">
//               <span className="text-xs text-green-100">
//                 Page {currentPage} of {totalPages} • {totalCount} Total Records
//               </span>
//             </div>
            
//             <button
//               onClick={() => setShowSidebar(!showSidebar)}
//               className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <Filter className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white border-b border-gray-200 px-4 py-4">
//           <div className="space-y-4">
//             {/* Primary Search Row */}
//             <div className="flex flex-col md:flex-row gap-3">
//               {/* Search */}
//               <div className="flex-1 relative">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search institutes, courses, or states..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//                 />
//               </div>

//               {/* Quick Filters */}
//               <div className="flex gap-2 flex-wrap">
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category === "all" ? "All Categories" : category}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   value={selectedQuota}
//                   onChange={(e) => {
//                     setSelectedQuota(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {quotas.map((quota) => (
//                     <option key={quota} value={quota}>
//                       {quota === "all" ? "All Quotas" : quota}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Advanced Filter Toggle */}
//                 <button
//                   onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//                   className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
//                 >
//                   <Filter className="w-4 h-4" />
//                   {showAdvancedFilters ? "Hide" : "Show"} Filters
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Advanced Filters */}
//             {showAdvancedFilters && (
//               <div className="space-y-3 border-t pt-3">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   {/* State Filter */}
//                   <select
//                     value={selectedState}
//                     onChange={(e) => {
//                       setSelectedState(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
//                   >
//                     {states.map((state) => (
//                       <option key={state} value={state}>
//                         {state === "all" ? "All States" : state}
//                       </option>
//                     ))}
//                   </select>
                  
//                   {/* Course Filter */}
//                   <select
//                     value={selectedCourse}
//                     onChange={(e) => {
//                       setSelectedCourse(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
//                   >
//                     {courses.map((course) => (
//                       <option key={course} value={course}>
//                         {course === "all" ? "All Courses" : course}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Clear Filters Button */}
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                   >
//                     Clear All Filters
//                   </button>

//                   {/* Results Count */}
//                   <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
//                     <span className="font-medium text-green-600">{sortedData.length}</span>
//                     <span className="ml-1">filtered</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
//               <tr>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 1</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 2</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 3</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {sortedData.length === 0 ? (
//                 <tr>
//                   <td colSpan={13} className="px-6 py-8 text-center text-gray-500">
//                     No data found. Try adjusting your filters.
//                   </td>
//                 </tr>
//               ) : (
//                 sortedData.map((item, index) => (
//                   <tr key={index} className="hover:bg-green-50 transition-colors">
//                     <td className="px-2 py-2 text-xs">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         item.Quota === "All India" || item.Quota === "AIQ" ? "bg-green-100 text-green-800" :
//                         item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
//                         "bg-purple-100 text-purple-800"
//                       }`}>
//                         {item.Quota}
//                       </span>
//                     </td>
//                     <td className="px-2 py-2 text-xs">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         item.Category === "GEN" ? "bg-gray-100 text-gray-800" :
//                         item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
//                         item.Category === "SC" ? "bg-red-100 text-red-800" :
//                         item.Category === "ST" ? "bg-blue-100 text-blue-800" :
//                         "bg-green-100 text-green-800"
//                       }`}>
//                         {item.Category}
//                       </span>
//                     </td>
//                     <td className="px-2 py-2 text-xs text-gray-700">{item.State}</td>
//                     <td className="px-2 py-2 text-xs text-green-600 hover:text-green-800 cursor-pointer font-medium">
//                       {item.Institute}
//                     </td>
//                     <td className="px-2 py-2 text-xs text-gray-700">{item.Course}</td>
//                     <td className="px-2 py-2 text-xs font-medium text-gray-900">{item.Fee}</td>
//                     <td className="px-2 py-2 text-xs text-gray-700">{item.Stipend_Year_1}</td>
//                     <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years} yrs</td>
//                     <td className="px-2 py-2 text-xs text-gray-700">{item.Beds}</td>
//                     <td className="px-2 py-2 text-xs font-bold text-green-600">
//                       {item.CR_2024_1 > 0 ? item.CR_2024_1.toLocaleString() : '-'}
//                     </td>
//                     <td className="px-2 py-2 text-xs font-bold text-green-600">
//                       {item.CR_2024_2 > 0 ? item.CR_2024_2.toLocaleString() : '-'}
//                     </td>
//                     <td className="px-2 py-2 text-xs font-bold text-green-600">
//                       {item.CR_2024_3 > 0 ? item.CR_2024_3.toLocaleString() : '-'}
//                     </td>
//                     <td className="px-2 py-2">
//                       <button className="p-1 hover:bg-red-100 rounded transition-colors">
//                         <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="bg-white border-t border-gray-200 px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="text-xs text-gray-600">
//               Showing {totalCount > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
//             </div>
            
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-3 h-3" />
//               </button>
              
//               <div className="flex space-x-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else {
//                     const start = Math.max(1, currentPage - 2);
//                     pageNum = start + i;
//                     if (pageNum > totalPages) return null;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`px-2 py-1 text-xs rounded transition-colors ${
//                         currentPage === pageNum
//                           ? "bg-green-500 text-white"
//                           : "border text-black border-gray-300 hover:bg-gray-50"
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
              
//               <button
//                 onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="w-3 h-3" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClosingRanksPage;

// import React, { useState, useEffect } from "react";
// import { ArrowLeft, TrendingUp, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight, Eye, EyeOff, Settings } from "lucide-react";

// interface ClosingRanksPageProps {
//   onBack: () => void;
// }

// interface ClosingRankData {
//   id?: number;
//   category_type: string;
//   Quota: string;
//   Category: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Fee: string;
//   Stipend_Year_1: string;
//   Bond_Years: number;
//   Bond_Penalty: string;
//   Beds: number;
//   CR_2023_1: number;
//   CR_2023_2: number;
//   CR_2023_3: number;
//   CR_2023_4: number;
//   CR_2023_5: number;
//   CR_2024_1: number;
//   CR_2024_2: number;
//   CR_2024_3: number;
//   CR_2024_4: number;
//   CR_2024_5: number;
// }

// interface FilterOptions {
//   categories: string[];
//   quotas: string[];
//   states: string[];
//   institutes: string[];
//   courses: string[];
//   categoryTypes: string[];
// }

// interface ColumnConfig {
//   key: keyof ClosingRankData;
//   label: string;
//   visible: boolean;
//   width?: string;
// }

// /**
//  * Enhanced Closing Ranks Page Component
//  * Features sidebar navigation and comprehensive closing ranks data
//  */
// const ClosingRanksPage: React.FC<ClosingRanksPageProps> = ({ onBack }) => {
//   const [closingRankData, setClosingRankData] = useState<ClosingRankData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedQuota, setSelectedQuota] = useState("all");
//   const [selectedState, setSelectedState] = useState("all");
//   const [selectedCourse, setSelectedCourse] = useState("all");
//   const [selectedInstitute, setSelectedInstitute] = useState("all");
//   const [selectedCategoryType, setSelectedCategoryType] = useState("all");
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
//   const [showColumnSettings, setShowColumnSettings] = useState(false);
//   const [filterOptions, setFilterOptions] = useState<FilterOptions>({
//     categories: [],
//     quotas: [],
//     states: [],
//     institutes: [],
//     courses: [],
//     categoryTypes: []
//   });

//   // Column configuration with all available columns
//   const [columns, setColumns] = useState<ColumnConfig[]>([
//     { key: 'category_type', label: 'Type', visible: true, width: '100px' },
//     { key: 'Quota', label: 'Quota', visible: true, width: '120px' },
//     { key: 'Category', label: 'Category', visible: true, width: '100px' },
//     { key: 'State', label: 'State', visible: true, width: '120px' },
//     { key: 'Institute', label: 'Institute', visible: true, width: '200px' },
//     { key: 'Course', label: 'Course', visible: true, width: '150px' },
//     { key: 'Fee', label: 'Fee', visible: true, width: '100px' },
//     { key: 'Stipend_Year_1', label: 'Stipend Y1', visible: true, width: '100px' },
//     { key: 'Bond_Years', label: 'Bond', visible: true, width: '80px' },
//     { key: 'Bond_Penalty', label: 'Bond Penalty', visible: false, width: '100px' },
//     { key: 'Beds', label: 'Beds', visible: true, width: '80px' },
//     { key: 'CR_2023_1', label: 'CR 2023 R1', visible: false, width: '100px' },
//     { key: 'CR_2023_2', label: 'CR 2023 R2', visible: false, width: '100px' },
//     { key: 'CR_2023_3', label: 'CR 2023 R3', visible: false, width: '100px' },
//     { key: 'CR_2023_4', label: 'CR 2023 R4', visible: false, width: '100px' },
//     { key: 'CR_2023_5', label: 'CR 2023 R5', visible: false, width: '100px' },
//     { key: 'CR_2024_1', label: 'CR 2024 R1', visible: true, width: '100px' },
//     { key: 'CR_2024_2', label: 'CR 2024 R2', visible: true, width: '100px' },
//     { key: 'CR_2024_3', label: 'CR 2024 R3', visible: true, width: '100px' },
//     { key: 'CR_2024_4', label: 'CR 2024 R4', visible: false, width: '100px' },
//     { key: 'CR_2024_5', label: 'CR 2024 R5', visible: false, width: '100px' },
//   ]);

//   const counsellingOptions = [
//     "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)",
//     "Goa - PG Medical",
//     "Gujarat - PG Medical", 
//     "Haryana - PG Medical",
//     "Himachal Pradesh - PG Medical",
//     "Jammu and Kashmir - PG Medical",
//     "Jharkhand - PG Medical",
//     "Karnataka - PG Medical",
//     "Kerala - PG Medical",
//     "Madhya Pradesh - PG Medical",
//     "Maharashtra - PG Medical",
//     "Manipur-JNIMS - PG Medical",
//     "Manipur-RIMS - PG Medical",
//     "NEIGRIHMS - PG Medical",
//     "Odisha - PG Medical",
//     "Pondicherry - PG Medical",
//     "Punjab - PG Medical",
//     "Rajasthan - PG Medical",
//     "Sikkim - PG Medical",
//     "Tamil Nadu Government Quota - PG Medical",
//     "Tamil Nadu Management Quota - PG Medical",
//     "Telangana Government Quota - PG Medical",
//     "Telangana Management Quota - PG Medical",
//     "Tripura - PG Medical",
//     "Uttarakhand - PG Medical",
//     "Uttar Pradesh - PG Medical",
//     "West Bengal - PG Medical",
//   ];

//   // Fetch filter options from API
//   const fetchFilterOptions = async () => {
//     try {
//       // Fetch distinct values for filters
//       const response = await fetch(`http://127.0.0.1:8000/get-closingranks/?page_size=1000`);
      
//       if (!response.ok) {
//         console.error(`Filter Options API returned status ${response.status}`);
//         return;
//       }
      
//       const data = await response.json();
      
//       if (data && Array.isArray(data.results)) {
//         const allData = data.results;
        
//         // Extract unique values for each filter
//         const categories = ["all", ...Array.from(new Set(allData.map((item: any) => item.category || item.Category).filter(Boolean)))];
//         const quotas = ["all", ...Array.from(new Set(allData.map((item: any) => item.quota || item.Quota).filter(Boolean)))];
//         const states = ["all", ...Array.from(new Set(allData.map((item: any) => item.state || item.State).filter(Boolean)))];
//         const institutes = ["all", ...Array.from(new Set(allData.map((item: any) => item.institute || item.Institute).filter(Boolean)))];
//         const courses = ["all", ...Array.from(new Set(allData.map((item: any) => item.course || item.Course).filter(Boolean)))];
//         const categoryTypes = ["all", ...Array.from(new Set(allData.map((item: any) => item.category_type).filter(Boolean)))];
        
//         setFilterOptions({
//           categories,
//           quotas,
//           states,
//           institutes,
//           courses,
//           categoryTypes
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching filter options:", error);
//     }
//   };

//   // API fetch function for closing ranks
//   const fetchClosingRanksFromAPI = async (params: { 
//     category?: string; 
//     quota?: string; 
//     state?: string; 
//     course?: string; 
//     institute?: string;
//     category_type?: string;
//     page?: number;
//     search?: string;
//   }) => {
//     const queryParams = new URLSearchParams();
  
//     if (params.category && params.category !== "all") queryParams.append('category', params.category);
//     if (params.quota && params.quota !== "all") queryParams.append('quota', params.quota);
//     if (params.state && params.state !== "all") queryParams.append('state', params.state);
//     if (params.course && params.course !== "all") queryParams.append('course', params.course);
//     if (params.institute && params.institute !== "all") queryParams.append('institute', params.institute);
//     if (params.category_type && params.category_type !== "all") queryParams.append('category_type', params.category_type);
//     if (params.search) queryParams.append('search', params.search);
//     if (params.page) queryParams.append('page', params.page.toString());
//     queryParams.append('page_size', '75');
  
//     try {
//       console.log('Making Closing Ranks API request with params:', queryParams.toString());
//       const response = await fetch(`http://127.0.0.1:8000/get-closingranks/?${queryParams.toString()}`);
      
//       if (!response.ok) {
//         console.error(`Closing Ranks API returned status ${response.status}`);
//         return { results: [], count: 0 };
//       }
      
//       const data = await response.json();
//       console.log('Closing Ranks API Response:', data);
      
//       // Map the API response to match your interface
//       const mappedResults = data.results.map((item: any) => ({
//         id: item.id,
//         category_type: item.category_type || '',
//         Quota: item.quota || item.Quota || '',
//         Category: item.category || item.Category || '',
//         State: item.state || item.State || '',
//         Institute: item.institute || item.Institute || '',
//         Course: item.course || item.Course || '',
//         Fee: item.fee ? `₹${item.fee}` : item.Fee || '',
//         Stipend_Year_1: item.stipend_year1 ? `₹${item.stipend_year1}` : item.Stipend_Year_1 || '',
//         Bond_Years: parseFloat(item.bond_years || item.Bond_Years || 0),
//         Bond_Penalty: item.bond_penalty ? `₹${item.bond_penalty}` : item.Bond_Penalty || '',
//         Beds: parseInt(item.beds || item.Beds || 0),
//         CR_2023_1: parseInt(item.cr_2023_1 || item.CR_2023_1 || 0),
//         CR_2023_2: parseInt(item.cr_2023_2 || item.CR_2023_2 || 0),
//         CR_2023_3: parseInt(item.cr_2023_3 || item.CR_2023_3 || 0),
//         CR_2023_4: parseInt(item.cr_2023_4 || item.CR_2023_4 || 0),
//         CR_2023_5: parseInt(item.cr_2023_5 || item.CR_2023_5 || 0),
//         CR_2024_1: parseInt(item.cr_2024_1 || item.CR_2024_1 || 0),
//         CR_2024_2: parseInt(item.cr_2024_2 || item.CR_2024_2 || 0),
//         CR_2024_3: parseInt(item.cr_2024_3 || item.CR_2024_3 || 0),
//         CR_2024_4: parseInt(item.cr_2024_4 || item.CR_2024_4 || 0),
//         CR_2024_5: parseInt(item.cr_2024_5 || item.CR_2024_5 || 0),
//       }));
      
//       return {
//         results: mappedResults,
//         count: data.count
//       };
//     } catch (error) {
//       console.error("Closing Ranks Network error:", error);
//       return { results: [], count: 0 };
//     }
//   };

//   useEffect(() => {
//     fetchFilterOptions();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         console.log('Fetching closing ranks data with filters:', {
//           category: selectedCategory,
//           quota: selectedQuota,
//           state: selectedState,
//           course: selectedCourse,
//           institute: selectedInstitute,
//           category_type: selectedCategoryType,
//           page: currentPage,
//           search: searchTerm,
//         });

//         const data = await fetchClosingRanksFromAPI({
//           category: selectedCategory !== "all" ? selectedCategory : undefined,
//           quota: selectedQuota !== "all" ? selectedQuota : undefined,
//           state: selectedState !== "all" ? selectedState : undefined,
//           course: selectedCourse !== "all" ? selectedCourse : undefined,
//           institute: selectedInstitute !== "all" ? selectedInstitute : undefined,
//           category_type: selectedCategoryType !== "all" ? selectedCategoryType : undefined,
//           page: currentPage,
//           search: searchTerm || undefined,
//         });

//         console.log('Processed closing ranks data:', data);
        
//         if (data && Array.isArray(data.results) && typeof data.count === "number") {
//           setClosingRankData(data.results);
//           setTotalCount(data.count);
//         } else {
//           console.error("Unexpected closing ranks API response format:", data);
//           setClosingRankData([]);
//           setTotalCount(0);
//         }
//       } catch (error) {
//         console.error("Error fetching closing ranks data:", error);
//         setClosingRankData([]);
//         setTotalCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedCategory, selectedQuota, selectedState, selectedCourse, selectedInstitute, selectedCategoryType, currentPage, searchTerm]);

//   // Sort data in ascending order by CR 2024 1
//   const sortedData = [...closingRankData].sort((a, b) => a.CR_2024_1 - b.CR_2024_1);

//   const itemsPerPage = 75;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   // Clear all filters function
//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setSelectedCategory("all");
//     setSelectedQuota("all");
//     setSelectedState("all");
//     setSelectedCourse("all");
//     setSelectedInstitute("all");
//     setSelectedCategoryType("all");
//     setCurrentPage(1);
//   };

//   // Toggle column visibility
//   const toggleColumnVisibility = (key: keyof ClosingRankData) => {
//     setColumns(prevColumns =>
//       prevColumns.map(col =>
//         col.key === key ? { ...col, visible: !col.visible } : col
//       )
//     );
//   };

//   // Show/Hide all columns
//   const toggleAllColumns = (visible: boolean) => {
//     setColumns(prevColumns =>
//       prevColumns.map(col => ({ ...col, visible }))
//     );
//   };

//   // Get visible columns
//   const visibleColumns = columns.filter(col => col.visible);

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Closing Ranks Data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile Overlay */}
//       {showSidebar && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowSidebar(false)}></div>
//       )}

//       {/* Sidebar */}
//       {showSidebar && (
//         <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">NEET PG Closing Ranks</h2>
//               <button
//                 onClick={() => setShowSidebar(false)}
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search Counselling"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {counsellingOptions.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedCounselling(option)}
//                 className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
//                   selectedCounselling === option ? "bg-green-50 border-l-4 border-l-green-500" : ""
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
//                     <span className="text-xs">📊</span>
//                   </div>
//                   <span className="text-sm text-gray-700">{option}</span>
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-gray-400" />
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Closing Ranks</h1>
//                 <p className="text-xs text-green-100">2024 Session Data</p>
//               </div>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-2">
//               <span className="text-xs text-green-100">
//                 Page {currentPage} of {totalPages} • {totalCount} Total Records
//               </span>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setShowColumnSettings(!showColumnSettings)}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <Settings className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setShowSidebar(!showSidebar)}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <Filter className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Column Settings Panel */}
//         {showColumnSettings && (
//           <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-sm font-medium text-blue-800">Column Visibility</h3>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => toggleAllColumns(true)}
//                   className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                 >
//                   Show All
//                 </button>
//                 <button
//                   onClick={() => toggleAllColumns(false)}
//                   className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                 >
//                   Hide All
//                 </button>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
//               {columns.map((col) => (
//                 <label key={col.key} className="flex items-center space-x-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={col.visible}
//                     onChange={() => toggleColumnVisibility(col.key)}
//                     className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className={col.visible ? "text-blue-800" : "text-blue-400"}>
//                     {col.label}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Search and Filters */}
//         <div className="bg-white border-b border-gray-200 px-4 py-4">
//           <div className="space-y-4">
//             {/* Primary Search Row */}
//             <div className="flex flex-col md:flex-row gap-3">
//               {/* Search */}
//               <div className="flex-1 relative">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search institutes, courses, or states..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//                 />
//               </div>

//               {/* Quick Filters */}
//               <div className="flex gap-2 flex-wrap">
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {filterOptions.categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category === "all" ? "All Categories" : category}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   value={selectedQuota}
//                   onChange={(e) => {
//                     setSelectedQuota(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {filterOptions.quotas.map((quota) => (
//                     <option key={quota} value={quota}>
//                       {quota === "all" ? "All Quotas" : quota}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Advanced Filter Toggle */}
//                 <button
//                   onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//                   className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
//                 >
//                   <Filter className="w-4 h-4" />
//                   {showAdvancedFilters ? "Hide" : "Show"} Filters
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Advanced Filters */}
//             {showAdvancedFilters && (
//               <div className="space-y-3 border-t pt-3">
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//                   {/* Category Type Filter */}
//                   <select
//                     value={selectedCategoryType}
//                     onChange={(e) => {
//                       setSelectedCategoryType(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
//                   >
//                     {filterOptions.categoryTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type === "all" ? "All Types" : type}
//                       </option>
//                     ))}
//                   </select>

//                   {/* State Filter */}
//                   <select
//                     value={selectedState}
//                     onChange={(e) => {
//                       setSelectedState(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
//                   >
//                     {filterOptions.states.map((state) => (
//                       <option key={state} value={state}>
//                         {state === "all" ? "All States" : state}
//                       </option>
//                     ))}
//                   </select>
                  
//                   {/* Course Filter */}
//                   <select
//                     value={selectedCourse}
//                     onChange={(e) => {
//                       setSelectedCourse(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
//                   >
//                     {filterOptions.courses.map((course) => (
//                       <option key={course} value={course}>
//                         {course === "all" ? "All Courses" : course}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Institute Filter */}
//                   <select
//                     value={selectedInstitute}
//                     onChange={(e) => {
//                       setSelectedInstitute(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
//                   >
//                     {filterOptions.institutes.slice(0, 50).map((institute) => (
//                       <option key={institute} value={institute}>
//                         {institute === "all" ? "All Institutes" : institute}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Clear Filters Button */}
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
//                   <span className="font-medium text-green-600">{totalCount}</span>
//                   <span className="ml-1">total results</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
//               <tr>
//                 {visibleColumns.map((col) => (
//                   <th 
//                     key={col.key}
//                     className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
//                     style={{ minWidth: col.width }}
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-12">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {sortedData.length === 0 ? (
//                 <tr>
//                   <td colSpan={visibleColumns.length + 1} className="px-6 py-8 text-center text-gray-500">
//                     No data found. Try adjusting your filters.
//                   </td>
//                 </tr>
//               ) : (
//                 sortedData.map((item, index) => (
//                   <tr key={item.id || index} className="hover:bg-green-50 transition-colors">
//                     {visibleColumns.map((col) => (
//                       <td key={col.key} className="px-2 py-2 text-xs">
//                         {col.key === 'Quota' ? (
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             item.Quota === "All India" || item.Quota === "AIQ" ? "bg-green-100 text-green-800" :
//                             item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
//                             "bg-purple-100 text-purple-800"
//                           }`}>
//                             {item[col.key]}
//                           </span>
//                         ) : col.key === 'Category' ? (
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             item.Category === "GEN" ? "bg-gray-100 text-gray-800" :
//                             item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
//                             item.Category === "SC" ? "bg-red-100 text-red-800" :
//                             item.Category === "ST" ? "bg-blue-100 text-blue-800" :
//                             "bg-green-100 text-green-800"
//                           }`}>
//                             {item[col.key]}
//                           </span>
//                         ) : col.key === 'category_type' ? (
//                           <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                             {item[col.key]}
//                           </span>
//                         ) : col.key === 'Institute' ? (
//                           <span className="text-green-600 hover:text-green-800 cursor-pointer font-medium">
//                             {item[col.key]}
//                           </span>
//                         ) : col.key === 'Bond_Years' ? (
//                           <span className="text-gray-700">
//                             {item[col.key]} yrs
//                           </span>
//                         ) : col.key.startsWith('CR_') ? (
//                           <span className="font-bold text-green-600">
//                             {item[col.key] > 0 ? item[col.key].toLocaleString() : '-'}
//                           </span>
//                         ) : col.key === 'Fee' || col.key === 'Stipend_Year_1' || col.key === 'Bond_Penalty' ? (
//                           <span className="font-medium text-gray-900">
//                             {item[col.key]}
//                           </span>
//                         ) : (
//                           <span className="text-gray-700">
//                             {typeof item[col.key] === 'number' ? item[col.key].toLocaleString() : item[col.key]}
//                           </span>
//                         )}
//                       </td>
//                     ))}
//                     <td className="px-2 py-2">
//                       <button className="p-1 hover:bg-red-100 rounded transition-colors">
//                         <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="bg-white border-t border-gray-200 px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="text-xs text-gray-600">
//               Showing {totalCount > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
//             </div>
            
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-3 h-3" />
//               </button>
              
//               <div className="flex space-x-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else {
//                     const start = Math.max(1, currentPage - 2);
//                     pageNum = start + i;
//                     if (pageNum > totalPages) return null;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`px-2 py-1 text-xs rounded transition-colors ${
//                         currentPage === pageNum
//                           ? "bg-green-500 text-white"
//                           : "border text-black border-gray-300 hover:bg-gray-50"
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
              
//               <button
//                 onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="w-3 h-3" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClosingRanksPage;
                    
import React, { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight, Eye, EyeOff, Settings } from "lucide-react";

interface ClosingRanksPageProps {
  onBack: () => void;
}

interface ClosingRankData {
  category_type: string;
  quota: string;
  category: string;
  state: string;
  institute: string;
  course: string;
  fee: string;
  stipend_year1: string;
  bond_years: number | null;
  bond_penalty: string;
  beds: number;
  cr_2023_1: number;
  cr_2023_2: number;
  cr_2023_3: number;
  cr_2023_4: number;
  cr_2023_5: number;
  cr_2024_1: number;
  cr_2024_2: number;
  cr_2024_3: number;
  cr_2024_4: number;
  cr_2024_5: number;
}

interface ColumnVisibility {
  quota: boolean;
  category: boolean;
  state: boolean;
  institute: boolean;
  course: boolean;
  fee: boolean;
  stipend: boolean;
  bond_years: boolean;
  bond_penalty: boolean;
  beds: boolean;
  cr_2023_1: boolean;
  cr_2023_2: boolean;
  cr_2023_3: boolean;
  cr_2023_4: boolean;
  cr_2023_5: boolean;
  cr_2024_1: boolean;
  cr_2024_2: boolean;
  cr_2024_3: boolean;
  cr_2024_4: boolean;
  cr_2024_5: boolean;
}

const ClosingRanksPage: React.FC<ClosingRanksPageProps> = ({ onBack }) => {
  const [closingRankData, setClosingRankData] = useState<ClosingRankData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");
  const [selectedRound, setSelectedRound] = useState("all");
  
  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    quota: true,
    category: true,
    state: true,
    institute: true,
    course: true,
    fee: true,
    stipend: false,
    bond_years: false,
    bond_penalty: false,
    beds: false,
    cr_2023_1: false,
    cr_2023_2: false,
    cr_2023_3: false,
    cr_2023_4: false,
    cr_2023_5: false,
    cr_2024_1: true,
    cr_2024_2: true,
    cr_2024_3: true,
    cr_2024_4: false,
    cr_2024_5: false,
  });

  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    categories: ["all"],
    quotas: ["all"],
    states: ["all"],
    institutes: ["all"],
    courses: ["all"]
  });

  const counsellingOptions = [
    "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)",
    "Goa - PG Medical",
    "Gujarat - PG Medical", 
    "Haryana - PG Medical",
    "Himachal Pradesh - PG Medical",
    "Jammu and Kashmir - PG Medical",
    "Jharkhand - PG Medical",
    "Karnataka - PG Medical",
    "Kerala - PG Medical",
    "Madhya Pradesh - PG Medical",
    "Maharashtra - PG Medical",
    "Manipur-JNIMS - PG Medical",
    "Manipur-RIMS - PG Medical",
    "NEIGRIHMS - PG Medical",
    "Odisha - PG Medical",
    "Pondicherry - PG Medical",
    "Punjab - PG Medical",
    "Rajasthan - PG Medical",
    "Sikkim - PG Medical",
    "Tamil Nadu Government Quota - PG Medical",
    "Tamil Nadu Management Quota - PG Medical",
    "Telangana Government Quota - PG Medical",
    "Telangana Management Quota - PG Medical",
    "Tripura - PG Medical",
    "Uttarakhand - PG Medical",
    "Uttar Pradesh - PG Medical",
    "West Bengal - PG Medical",
  ];

  const rounds = ["all", "1", "2", "3", "4", "5"];

  // API fetch function
  const fetchClosingRanksFromAPI = async (params: { 
    category_type?: string; 
    category?: string; 
    quota?: string; 
    search?: string;
    page?: number 
  }) => {
    const queryParams = new URLSearchParams();
  
    if (params.category_type) queryParams.append('category_type', params.category_type);
    if (params.category && params.category !== "all") queryParams.append('category', params.category);
    if (params.quota && params.quota !== "all") queryParams.append('quota', params.quota);
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page.toString());
    queryParams.append('page_size', '75');
  
    try {
      console.log('Making API request with params:', queryParams.toString());
      const response = await fetch(`https://backend-dju9.onrender.com/get-closing-ranks/?${queryParams.toString()}`);
      
      if (!response.ok) {
        console.error(`API returned status ${response.status}`);
        return { results: [], count: 0 };
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      return {
        results: data.results || [],
        count: data.count || 0
      };
    } catch (error) {
      console.error("Network error:", error);
      return { results: [], count: 0 };
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async (categoryType: string) => {
    try {
      const response = await fetch(`https://backend-dju9.onrender.com/get-closing-ranks/?category_type=${categoryType}&page_size=1000`);
      if (response.ok) {
        const data = await response.json();
        const results = data.results || [];
        
        const categories = ["all", ...Array.from(new Set(results.map((item: any) => item.category).filter(Boolean)))];
        const quotas = ["all", ...Array.from(new Set(results.map((item: any) => item.quota).filter(Boolean)))];
        const states = ["all", ...Array.from(new Set(results.map((item: any) => item.state).filter(Boolean)))];
        const institutes = ["all", ...Array.from(new Set(results.map((item: any) => item.institute).filter(Boolean)))];
        const courses = ["all", ...Array.from(new Set(results.map((item: any) => item.course).filter(Boolean)))];
        
        setFilterOptions({ categories, quotas, states, institutes, courses });
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  // Reset filters when counselling changes
  useEffect(() => {
    setSelectedCategory("all");
    setSelectedQuota("all");
    setSearchTerm("");
    setCurrentPage(1);
    fetchFilterOptions(selectedCounselling);
  }, [selectedCounselling]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchClosingRanksFromAPI({
          category_type: selectedCounselling,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          quota: selectedQuota !== "all" ? selectedQuota : undefined,
          search: searchTerm || undefined,
          page: currentPage,
        });
        
        if (data && Array.isArray(data.results) && typeof data.count === "number") {
          setClosingRankData(data.results);
          setTotalCount(data.count);
        } else {
          console.error("Unexpected API response format:", data);
          setClosingRankData([]);
          setTotalCount(0);
        }
      } catch (error) {
        console.error("Error fetching closing ranks data:", error);
        setClosingRankData([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedCounselling, selectedCategory, selectedQuota, searchTerm, currentPage]);

  const itemsPerPage = 75;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Toggle column visibility
  const toggleColumnVisibility = (column: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  // Get filtered data based on selected round
  const getFilteredDataByRound = () => {
    if (selectedRound === "all") {
      return closingRankData;
    }
    
    // Filter based on which round column has valid data
    return closingRankData.filter(item => {
      const roundColumn = `cr_2024_${selectedRound}` as keyof ClosingRankData;
      const value = item[roundColumn];
      return value && value !== 0;
    });
  };

  const filteredData = getFilteredDataByRound();

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Closing Ranks Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowSidebar(false)}></div>
      )}

      {/* Column Settings Modal */}
      {showColumnSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Show/Hide Columns</h3>
                <button
                  onClick={() => setShowColumnSettings(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {Object.entries(columnVisibility).map(([key, visible]) => (
                <label key={key} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={() => toggleColumnVisibility(key as keyof ColumnVisibility)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">NEET PG Closing Ranks</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Counselling"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {counsellingOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedCounselling(option)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  selectedCounselling === option ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs">📊</span>
                  </div>
                  <span className="text-sm text-gray-700">{option}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">NEET PG Closing Ranks</h1>
                <p className="text-xs text-green-100">2024 Session Data</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowColumnSettings(true)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Round Selection Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Rounds:</span>
            <div className="flex space-x-1">
              {rounds.map((round) => (
                <button
                  key={round}
                  onClick={() => setSelectedRound(round)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    selectedRound === round
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {round === "all" ? "All" : `Round ${round}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institutes, courses, or states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
            >
              {filterOptions.categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            <select
              value={selectedQuota}
              onChange={(e) => setSelectedQuota(e.target.value)}
              className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
            >
              {filterOptions.quotas.map((quota) => (
                <option key={quota} value={quota}>
                  {quota === "all" ? "All Quotas" : quota}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
              <tr>
                {columnVisibility.quota && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>}
                {columnVisibility.category && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>}
                {columnVisibility.state && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>}
                {columnVisibility.institute && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>}
                {columnVisibility.course && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>}
                {columnVisibility.fee && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee</th>}
                {columnVisibility.stipend && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend</th>}
                {columnVisibility.bond_years && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond</th>}
                {columnVisibility.bond_penalty && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Penalty</th>}
                {columnVisibility.beds && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>}
                {columnVisibility.cr_2023_1 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023 1</th>}
                {columnVisibility.cr_2023_2 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023 2</th>}
                {columnVisibility.cr_2023_3 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023 3</th>}
                {columnVisibility.cr_2023_4 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023 4</th>}
                {columnVisibility.cr_2023_5 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023 5</th>}
                {columnVisibility.cr_2024_1 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 1</th>}
                {columnVisibility.cr_2024_2 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 2</th>}
                {columnVisibility.cr_2024_3 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 3</th>}
                {columnVisibility.cr_2024_4 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 4</th>}
                {columnVisibility.cr_2024_5 && <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 5</th>}
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-green-50 transition-colors">
                  {columnVisibility.quota && (
                    <td className="px-2 py-2 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.quota === "All India" ? "bg-green-100 text-green-800" :
                        item.quota === "State Quota" ? "bg-blue-100 text-blue-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {item.quota}
                      </span>
                    </td>
                  )}
                  {columnVisibility.category && (
                    <td className="px-2 py-2 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.category === "GEN" ? "bg-gray-100 text-gray-800" :
                        item.category === "OBC" ? "bg-yellow-100 text-yellow-800" :
                        item.category === "SC" ? "bg-red-100 text-red-800" :
                        item.category === "ST" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {item.category}
                      </span>
                    </td>
                  )}
                  {columnVisibility.state && <td className="px-2 py-2 text-xs text-gray-700">{item.state}</td>}
                  {columnVisibility.institute && <td className="px-2 py-2 text-xs text-green-600 hover:text-green-800 cursor-pointer font-medium">{item.institute}</td>}
                  {columnVisibility.course && <td className="px-2 py-2 text-xs text-gray-700">{item.course}</td>}
                  {columnVisibility.fee && <td className="px-2 py-2 text-xs font-medium text-gray-900">{item.fee}</td>}
                  {columnVisibility.stipend && <td className="px-2 py-2 text-xs text-gray-700">{item.stipend_year1}</td>}
                  {columnVisibility.bond_years && <td className="px-2 py-2 text-xs text-gray-700">{item.bond_years || 0} yrs</td>}
                  {columnVisibility.bond_penalty && <td className="px-2 py-2 text-xs text-gray-700">{item.bond_penalty}</td>}
                  {columnVisibility.beds && <td className="px-2 py-2 text-xs text-gray-700">{item.beds}</td>}
                  {columnVisibility.cr_2023_1 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2023_1 || '-'}</td>}
                  {columnVisibility.cr_2023_2 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2023_2 || '-'}</td>}
                  {columnVisibility.cr_2023_3 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2023_3 || '-'}</td>}
                  {columnVisibility.cr_2023_4 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2023_4 || '-'}</td>}
                  {columnVisibility.cr_2023_5 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2023_5 || '-'}</td>}
                  {columnVisibility.cr_2024_1 && <td className="px-2 py-2 text-xs font-bold text-green-600">{item.cr_2024_1 || '-'}</td>}
                  {columnVisibility.cr_2024_2 && <td className="px-2 py-2 text-xs font-bold text-green-600">{item.cr_2024_2 || '-'}</td>}
                  {columnVisibility.cr_2024_3 && <td className="px-2 py-2 text-xs font-bold text-green-600">{item.cr_2024_3 || '-'}</td>}
                  {columnVisibility.cr_2024_4 && <td className="px-2 py-2 text-xs font-bold text-green-600">{item.cr_2024_4 || '-'}</td>}
                  {columnVisibility.cr_2024_5 && <td className="px-2 py-2 text-xs font-bold text-green-600">{item.cr_2024_5 || '-'}</td>}
                  <td className="px-2 py-2">
                    <button className="p-1 hover:bg-red-100 rounded transition-colors">
                      <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, currentPage - 2) + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        currentPage === pageNum
                          ? "bg-green-500 text-white"
                          : "border text-black border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosingRanksPage;