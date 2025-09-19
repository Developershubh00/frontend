// import React, { useState, useEffect } from "react";
// import { ArrowLeft, BarChart3, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";
// import { seatMatrixAPI } from "../services/api";

// interface SeatMatrixPageProps {
//   onBack: () => void;
// }

// interface SeatMatrixData {
//   State: string;
//   Institute: string;
//   Course: string;
//   Quota: string;
//   Total_Seats: number;
//   General: number;
//   OBC: number;
//   SC: number;
//   ST: number;
//   EWS: number;
//   PWD: number;
// }

// /**
//  * Enhanced Seat Matrix Page Component
//  * Features sidebar navigation and comprehensive seat matrix data
//  */
// const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
//   const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
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
//   ];

//   // Generate dummy data for demonstration
//   const generateDummyData = (counselling: string, exam: "UG" | "PG"): SeatMatrixData[] => {
//     const dummyData: SeatMatrixData[] = [];
//     const institutes = [
//       "AIIMS New Delhi", "PGIMER Chandigarh", "JIPMER Puducherry", "CMC Vellore",
//       "NIMHANS Bangalore", "SGPGIMS Lucknow", "KGMU Lucknow", "BHU Varanasi"
//     ];
//     const courses = exam === "UG" 
//       ? ["MBBS", "BDS", "BAMS", "BHMS"]
//       : ["MD General Medicine", "MD Pediatrics", "MD Psychiatry", "MS General Surgery"];
//     const quotas = ["All India", "State Quota", "Management"];

//     for (let i = 0; i < 120; i++) {
//       const totalSeats = Math.floor(Math.random() * 50) + 10;
//       const general = Math.floor(totalSeats * 0.5);
//       const obc = Math.floor(totalSeats * 0.27);
//       const sc = Math.floor(totalSeats * 0.15);
//       const st = Math.floor(totalSeats * 0.07);
//       const ews = Math.floor(totalSeats * 0.1);
//       const pwd = Math.floor(totalSeats * 0.05);

//       dummyData.push({
//         State: counselling.includes("Delhi") ? "Delhi" : counselling.includes("Maharashtra") ? "Maharashtra" : "Various",
//         Institute: institutes[Math.floor(Math.random() * institutes.length)],
//         Course: courses[Math.floor(Math.random() * courses.length)],
//         Quota: quotas[Math.floor(Math.random() * quotas.length)],
//         Total_Seats: totalSeats,
//         General: general,
//         OBC: obc,
//         SC: sc,
//         ST: st,
//         EWS: ews,
//         PWD: pwd,
//       });
//     }
//     return dummyData;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Simulate API call with dummy data
//         const dummyData = generateDummyData(selectedCounselling, "PG");
//         setSeatMatrixData(dummyData);
//       } catch (error) {
//         console.error("Error fetching seat matrix data:", error);
//         setSeatMatrixData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedCounselling]);

//   // Filter data based on search and filters
//   const filteredData = seatMatrixData.filter((item) => {
//     const matchesSearch = searchTerm === "" || 
//       item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesQuota = selectedQuota === "all" || item.Quota === selectedQuota;
    
//     return matchesSearch && matchesQuota;
//   });

//   // Sort data in ascending order by Total_Seats
//   const sortedData = [...filteredData].sort((a, b) => a.Total_Seats - b.Total_Seats);

//   const itemsPerPage = 25; // Reduced for better mobile view
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

//   // Get unique values for filters
//   const quotas = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Quota)))];

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Seat Matrix Data...</p>
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
//               <h2 className="text-lg font-semibold text-gray-800">NEET PG Seat Matrix</h2>
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
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
//                 <p className="text-xs text-purple-100">2024 Session Data</p>
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
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//               />
//             </div>

//             {/* Quota Filter */}
//             <select
//               value={selectedQuota}
//               onChange={(e) => setSelectedQuota(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
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
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Gen</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">OBC</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SC</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ST</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">EWS</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">PWD</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {paginatedData.map((item, index) => (
//                 <tr key={index} className="hover:bg-purple-50 transition-colors">
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.State}</td>
//                   <td className="px-2 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
//                     {item.Institute}
//                   </td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Course}</td>
//                   <td className="px-2 py-2 text-xs">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       item.Quota === "All India" ? "bg-green-100 text-green-800" :
//                       item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
//                       "bg-purple-100 text-purple-800"
//                     }`}>
//                       {item.Quota}
//                     </span>
//                   </td>
//                   <td className="px-2 py-2 text-xs font-bold text-purple-600">{item.Total_Seats}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.General}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.OBC}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.SC}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.ST}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.EWS}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.PWD}</td>
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
//                 className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
//                           ? "bg-purple-500 text-white"
//                           : "border border-gray-300 hover:bg-gray-50"
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
//                 className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

// export default SeatMatrixPage;

// import React, { useState, useEffect } from "react";
// import { ArrowLeft, BarChart3, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";
// // Import PapaParse - make sure it's installed: npm install papaparse @types/papaparse
// import Papa from 'papaparse';

// interface SeatMatrixPageProps {
//   onBack: () => void;
// }

// interface SeatMatrixData {
//   Round: string;
//   Quota: string;
//   Category: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Seats: number;
//   Fee_Stipend_Year_1: string;
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

// interface Filters {
//   searchTerm: string;
//   selectedState: string;
//   selectedRound: string;
//   selectedQuota: string;
//   selectedCategory: string;
// }

// /**
//  * Enhanced Seat Matrix Page Component with CSV Data Fetching
//  */
// const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
//   const [allSeatMatrixData, setAllSeatMatrixData] = useState<SeatMatrixData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
  
//   // Filter states
//   const [filters, setFilters] = useState<Filters>({
//     searchTerm: "",
//     selectedState: "all",
//     selectedRound: "all",
//     selectedQuota: "all",
//     selectedCategory: "all"
//   });

//   // Filter options derived from data
//   const [filterOptions, setFilterOptions] = useState({
//     states: [] as string[],
//     rounds: [] as string[],
//     quotas: [] as string[],
//     categories: [] as string[]
//   });

//   const itemsPerPage = 50;

//   // Fetch and parse CSV data
//   useEffect(() => {
//     const fetchCSVData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Correct path for Vite - files in public/ are served from root
//         const csvPath = 'public/data/Seat_Matrix.csv';
        
//         console.log(`Fetching CSV from: ${csvPath}`);
        
//         const response = await fetch(csvPath, {
//           method: 'GET',
//           headers: {
//             'Accept': 'text/csv, text/plain, */*',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. Make sure the file exists at: public/data/Seat_Matrix.csv`);
//         }

//         const csvText = await response.text();
        
//         if (!csvText || csvText.trim().length === 0) {
//           throw new Error('CSV file is empty');
//         }

//         console.log(`CSV loaded successfully. Size: ${csvText.length} characters`);
//         console.log('First 200 characters:', csvText.substring(0, 200));

//         // Parse CSV with PapaParse
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           dynamicTyping: false,
//           delimiter: ',',
//           transformHeader: (header: string) => {
//             // Clean and standardize headers
//             return header.trim()
//               .replace(/\s+/g, '_')
//               .replace(/[^\w]/g, '_')
//               .replace(/_+/g, '_')
//               .replace(/^_|_$/g, '');
//           },
//           complete: (results) => {
//             console.log('CSV parsing completed:', {
//               totalRows: results.data.length,
//               errors: results.errors.length,
//               firstRow: results.data[0]
//             });

//             if (results.errors.length > 0) {
//               console.warn('CSV parsing warnings:', results.errors);
//             }

//             if (!results.data || results.data.length === 0) {
//               setError('CSV file contains no data rows');
//               setLoading(false);
//               return;
//             }

//             // Log the actual headers from CSV to debug
//             const headers = Object.keys(results.data[0] || {});
//             console.log('Available CSV headers:', headers);

//             const processedData = results.data
//               .map((row: any, rowIndex: number) => {
//                 try {
//                   // More flexible field mapping - check multiple possible header variations
//                   const getField = (possibleNames: string[]): string => {
//                     for (const name of possibleNames) {
//                       if (row[name] !== undefined && row[name] !== null && row[name] !== '') {
//                         return String(row[name]).trim();
//                       }
//                     }
//                     return '';
//                   };

//                   const getNumericField = (possibleNames: string[]): number => {
//                     const value = getField(possibleNames);
//                     if (!value) return 0;
//                     const numericValue = parseInt(value.replace(/[^\d]/g, '')) || 0;
//                     return numericValue;
//                   };

//                   const processedRow: SeatMatrixData = {
//                     Round: getField(['Round', 'ROUND', 'round', 'Round_No']),
//                     Quota: getField(['Quota', 'QUOTA', 'quota', 'QuotaType']),
//                     Category: getField(['Category', 'CATEGORY', 'category', 'Cat']),
//                     State: getField(['State', 'STATE', 'state', 'State_Name']),
//                     Institute: getField(['Institute', 'INSTITUTE', 'institute', 'Institution', 'College', 'Institute_Name']),
//                     Course: getField(['Course', 'COURSE', 'course', 'Branch', 'Subject', 'Course_Name']),
//                     Seats: getNumericField(['Seats', 'SEATS', 'seats', 'Total_Seats', 'No_of_Seats']),
//                     Fee_Stipend_Year_1: getField(['Fee_Stipend_Year_1', 'Fee_Stipend', 'Fee', 'Stipend', 'Fee_Year_1', 'Annual_Fee']),
//                     Bond_Years: getNumericField(['Bond_Years', 'Bond', 'bond_years', 'Service_Bond']),
//                     Bond_Penalty: getField(['Bond_Penalty', 'Bond_Amount', 'Penalty', 'Bond_Fee']),
//                     Beds: getNumericField(['Beds', 'BEDS', 'beds', 'Hospital_Beds', 'No_of_Beds']),
//                     CR_2023_1: getNumericField(['CR_2023_1', 'CR_2023_Round_1', '2023_R1', 'Cutoff_2023_1', 'CR2023_1']),
//                     CR_2023_2: getNumericField(['CR_2023_2', 'CR_2023_Round_2', '2023_R2', 'Cutoff_2023_2', 'CR2023_2']),
//                     CR_2023_3: getNumericField(['CR_2023_3', 'CR_2023_Round_3', '2023_R3', 'Cutoff_2023_3', 'CR2023_3']),
//                     CR_2023_4: getNumericField(['CR_2023_4', 'CR_2023_Round_4', '2023_R4', 'Cutoff_2023_4', 'CR2023_4']),
//                     CR_2023_5: getNumericField(['CR_2023_5', 'CR_2023_Round_5', '2023_R5', 'Cutoff_2023_5', 'CR2023_5']),
//                     CR_2024_1: getNumericField(['CR_2024_1', 'CR_2024_Round_1', '2024_R1', 'Cutoff_2024_1', 'CR2024_1']),
//                     CR_2024_2: getNumericField(['CR_2024_2', 'CR_2024_Round_2', '2024_R2', 'Cutoff_2024_2', 'CR2024_2']),
//                     CR_2024_3: getNumericField(['CR_2024_3', 'CR_2024_Round_3', '2024_R3', 'Cutoff_2024_3', 'CR2024_3']),
//                     CR_2024_4: getNumericField(['CR_2024_4', 'CR_2024_Round_4', '2024_R4', 'Cutoff_2024_4', 'CR2024_4']),
//                     CR_2024_5: getNumericField(['CR_2024_5', 'CR_2024_Round_5', '2024_R5', 'Cutoff_2024_5', 'CR2024_5']),
//                   };

//                   // Validate required fields - be more lenient with validation
//                   if (!processedRow.Institute && !processedRow.Course && !processedRow.State) {
//                     return null;
//                   }

//                   return processedRow;
//                 } catch (error) {
//                   console.warn(`Error processing row ${rowIndex}:`, error, row);
//                   return null;
//                 }
//               })
//               .filter((row): row is SeatMatrixData => row !== null);

//             console.log(`Successfully processed ${processedData.length} valid records`);

//             if (processedData.length === 0) {
//               setError('No valid data found in CSV file. Please check the file format and column headers.');
//               setLoading(false);
//               return;
//             }

//             // Show sample of processed data for debugging
//             console.log('Sample processed data:', processedData.slice(0, 3));

//             setAllSeatMatrixData(processedData);
            
//             // Extract unique values for filter options
//             const extractUniqueValues = (field: keyof SeatMatrixData): string[] => {
//               return Array.from(new Set(
//                 processedData
//                   .map(item => item[field])
//                   .filter(value => value && String(value).trim() !== '')
//                   .map(value => String(value))
//               )).sort();
//             };

//             setFilterOptions({
//               states: ['all', ...extractUniqueValues('State')],
//               rounds: ['all', ...extractUniqueValues('Round')],
//               quotas: ['all', ...extractUniqueValues('Quota')],
//               categories: ['all', ...extractUniqueValues('Category')]
//             });

//             setLoading(false);
//           },
//           error: (error) => {
//             console.error('CSV parsing error:', error);
//             setError(`Failed to parse CSV file: ${error.message}`);
//             setLoading(false);
//           }
//         });

//       } catch (error) {
//         console.error('Error fetching CSV:', error);
//         setError(error instanceof Error ? error.message : 'Failed to load CSV file');
//         setLoading(false);
//       }
//     };

//     fetchCSVData();
//   }, []);

//   // Filter and paginate data
//   const getFilteredData = (): SeatMatrixData[] => {
//     return allSeatMatrixData.filter((item) => {
//       const matchesSearch = filters.searchTerm === "" || 
//         (item.Institute && item.Institute.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
//         (item.Course && item.Course.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
//         (item.State && item.State.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
//       const matchesState = filters.selectedState === "all" || item.State === filters.selectedState;
//       const matchesRound = filters.selectedRound === "all" || item.Round === filters.selectedRound;
//       const matchesQuota = filters.selectedQuota === "all" || item.Quota === filters.selectedQuota;
//       const matchesCategory = filters.selectedCategory === "all" || item.Category === filters.selectedCategory;
      
//       return matchesSearch && matchesState && matchesRound && matchesQuota && matchesCategory;
//     });
//   };

//   const filteredData = getFilteredData();
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   // Reset page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filters]);

//   const updateFilter = (key: keyof Filters, value: string): void => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Seat Matrix Data...</p>
//           <p className="text-xs text-slate-500 mt-2">Fetching from CSV file</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-8 h-8 text-red-500" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Data</h3>
//           <p className="text-sm text-red-600 mb-4">{error}</p>
//           <p className="text-xs text-gray-500">
//             Please check if the CSV file exists at: <code className="bg-gray-100 px-2 py-1 rounded">public/data/Seat_Matrix.csv</code>
//           </p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Retry
//           </button>
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

//       {/* Sidebar with Filters */}
//       {showSidebar && (
//         <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
//               <button
//                 onClick={() => setShowSidebar(false)}
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             {/* Search */}
//             <div className="relative mb-4">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search institutes, courses..."
//                 value={filters.searchTerm}
//                 onChange={(e) => updateFilter('searchTerm', e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               />
//             </div>

//             <div className="text-sm text-gray-600 mb-2">
//               Total Records: <span className="font-semibold text-blue-600">{allSeatMatrixData.length}</span>
//             </div>
//           </div>

//           {/* Filter Options */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {/* State Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//               <select
//                 value={filters.selectedState}
//                 onChange={(e) => updateFilter('selectedState', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//               >
//                 {filterOptions.states.map((state) => (
//                   <option key={state} value={state}>
//                     {state === "all" ? "All States" : state}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Round Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Round</label>
//               <select
//                 value={filters.selectedRound}
//                 onChange={(e) => updateFilter('selectedRound', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//               >
//                 {filterOptions.rounds.map((round) => (
//                   <option key={round} value={round}>
//                     {round === "all" ? "All Rounds" : `Round ${round}`}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Quota Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Quota</label>
//               <select
//                 value={filters.selectedQuota}
//                 onChange={(e) => updateFilter('selectedQuota', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//               >
//                 {filterOptions.quotas.map((quota) => (
//                   <option key={quota} value={quota}>
//                     {quota === "all" ? "All Quotas" : quota}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Category Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//               <select
//                 value={filters.selectedCategory}
//                 onChange={(e) => updateFilter('selectedCategory', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//               >
//                 {filterOptions.categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category === "all" ? "All Categories" : category}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Clear Filters */}
//             <button
//               onClick={() => setFilters({
//                 searchTerm: "",
//                 selectedState: "all",
//                 selectedRound: "all",
//                 selectedQuota: "all",
//                 selectedCategory: "all"
//               })}
//               className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
//                 <p className="text-xs text-purple-100">
//                   Showing {filteredData.length} of {allSeatMatrixData.length} records
//                 </p>
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

//         {/* Quick Filter Pills */}
//         <div className="bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex flex-wrap gap-2">
//             {filters.selectedState !== "all" && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                 State: {filters.selectedState}
//                 <button 
//                   onClick={() => updateFilter('selectedState', 'all')}
//                   className="ml-2 hover:text-blue-600"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </span>
//             )}
//             {filters.selectedRound !== "all" && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                 Round: {filters.selectedRound}
//                 <button 
//                   onClick={() => updateFilter('selectedRound', 'all')}
//                   className="ml-2 hover:text-green-600"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </span>
//             )}
//             {filters.selectedQuota !== "all" && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                 Quota: {filters.selectedQuota}
//                 <button 
//                   onClick={() => updateFilter('selectedQuota', 'all')}
//                   className="ml-2 hover:text-purple-600"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </span>
//             )}
//             {filters.selectedCategory !== "all" && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                 Category: {filters.selectedCategory}
//                 <button 
//                   onClick={() => updateFilter('selectedCategory', 'all')}
//                   className="ml-2 hover:text-blue-600"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Table - Fixed width with horizontal scroll */}
//         <div className="flex-1 overflow-x-auto">
//           <div className="min-w-[1400px]"> {/* Minimum width to fit all columns */}
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
//                 <tr>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">Round</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[100px]">State</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[200px]">Institute</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">Course</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">Quota</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[90px]">Category</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[60px]">Seats</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[100px]">Fee/Stipend</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">Bond Years</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[60px]">Beds</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">CR 2023-1</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">CR 2023-2</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">CR 2024-1</th>
//                   <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">CR 2024-2</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {paginatedData.map((item, index) => (
//                   <tr key={`${item.Institute}-${item.Course}-${index}`} className="hover:bg-purple-50 transition-colors">
//                     <td className="px-3 py-2 text-xs">
//                       <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                         {item.Round || '-'}
//                       </span>
//                     </td>
//                     <td className="px-3 py-2 text-xs text-gray-700">{item.State || '-'}</td>
//                     <td className="px-3 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
//                       <div className="truncate max-w-[180px]" title={item.Institute}>
//                         {item.Institute || '-'}
//                       </div>
//                     </td>
//                     <td className="px-3 py-2 text-xs text-gray-700">
//                       <div className="truncate max-w-[130px]" title={item.Course}>
//                         {item.Course || '-'}
//                       </div>
//                     </td>
//                     <td className="px-3 py-2 text-xs">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         (item.Quota || '').toLowerCase().includes("all india") ? "bg-green-100 text-green-800" :
//                         (item.Quota || '').toLowerCase().includes("state") ? "bg-blue-100 text-blue-800" :
//                         "bg-purple-100 text-purple-800"
//                       }`}>
//                         <div className="truncate max-w-[100px]" title={item.Quota}>
//                           {item.Quota || '-'}
//                         </div>
//                       </span>
//                     </td>
//                     <td className="px-3 py-2 text-xs">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         (item.Category || '').toLowerCase() === "general" ? "bg-gray-100 text-gray-800" :
//                         (item.Category || '').toLowerCase() === "obc" ? "bg-yellow-100 text-yellow-800" :
//                         (item.Category || '').toLowerCase() === "sc" ? "bg-pink-100 text-pink-800" :
//                         (item.Category || '').toLowerCase() === "st" ? "bg-teal-100 text-teal-800" :
//                         "bg-blue-100 text-blue-800"
//                       }`}>
//                         {item.Category || '-'}
//                       </span>
//                     </td>
//                     <td className="px-3 py-2 text-xs font-bold text-purple-600">{item.Seats || 0}</td>
//                     <td className="px-3 py-2 text-xs text-gray-700">
//                       <div className="truncate max-w-[80px]" title={item.Fee_Stipend_Year_1}>
//                         {item.Fee_Stipend_Year_1 || '-'}
//                       </div>
//                     </td>
//                     <td className="px-3 py-2 text-xs text-gray-700">{item.Bond_Years || 0}</td>
//                     <td className="px-3 py-2 text-xs text-gray-700">{item.Beds || 0}</td>
//                     <td className="px-3 py-2 text-xs text-gray-700">{item.CR_2023_1 || '-'}</td>
//                     <td className="px-3 py-2 text-xs text-gray-700">{item.CR_2023_2 || '-'}</td>
//                     <td className="px-3 py-2 text-xs text-gray-700">{item.CR_2024_1 || '-'}</td>
//                     <td className="px-3 py-2 text-xs text-gray-700">{item.CR_2024_2 || '-'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {paginatedData.length === 0 && !loading && (
//             <div className="text-center py-12">
//               <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-600">No results found</h3>
//               <p className="text-gray-500">Try adjusting your filters or search terms</p>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="bg-white border-t border-gray-200 px-4 py-3">
//             <div className="flex items-center justify-between">
//               <div className="text-xs text-gray-600">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
//                 {filteredData.length !== allSeatMatrixData.length && (
//                   <span className="text-blue-600"> (filtered from {allSeatMatrixData.length} total)</span>
//                 )}
//               </div>
              
//               <div className="flex items-center space-x-1">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="w-3 h-3" />
//                 </button>
                
//                 <div className="flex space-x-1">
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else {
//                       const start = Math.max(1, currentPage - 2);
//                       pageNum = start + i;
//                       if (pageNum > totalPages) pageNum = totalPages - (4 - i);
//                     }
                    
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`px-2 py-1 text-xs rounded transition-colors ${
//                           currentPage === pageNum
//                             ? "bg-purple-500 text-white"
//                             : "border border-gray-300 hover:bg-gray-50"
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>
                
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronRight className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SeatMatrixPage;






// LIVE CODE DUMMY PREVIOUS CHANGE AIT 19-09-2025

// import React, { useState, useEffect } from "react";
// import { ArrowLeft, BarChart3, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";
// import { seatMatrixAPI } from "../services/api";

// interface SeatMatrixPageProps {
//   onBack: () => void;
// }

// interface SeatMatrixData {
//   Round: string;
//   Quota: string;
//   Category: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Seats: number;
//   Fee_Stipend_Year_1: number;
//   Bond_Years: number;
//   Bond_Penalty: number;
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
//  * Enhanced Seat Matrix Page Component
//  * Features sidebar navigation and comprehensive seat matrix data
//  */
// const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
//   const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedQuota, setSelectedQuota] = useState("all");
//   const [selectedCategory, setSelectedCategory] = useState("all");

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
//   const generateDummyData = (counselling: string, exam: "PG"): SeatMatrixData[] => {
//     const dummyData: SeatMatrixData[] = [];
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
//     const courses = exam === "PG" 
//       ? [
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
//     const quotas = ["All India", "State Quota", "Management", "NRI", "Deemed"];
//     const categories = ["General", "OBC", "SC", "ST", "EWS", "PWD"];
//     const rounds = ["Round 1", "Round 2", "Round 3", "Mop Up", "Stray Vacancy"];
//     const states = [
//       "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh", 
//       "West Bengal", "Gujarat", "Rajasthan", "Madhya Pradesh", "Punjab"
//     ];

//     for (let i = 0; i < 47147; i++) {
//       const seats = Math.floor(Math.random() * (250 - 50 + 1)) + 50;
//       const feeStipend = Math.floor(Math.random() * 500000) + 50000;
//       const bondYears = Math.floor(Math.random() * 5) + 1;
//       const bondPenalty = Math.floor(Math.random() * 2000000) + 500000;
//       const beds = Math.floor(Math.random() * 500) + 100;
    
    
//       dummyData.push({
//         Round: rounds[Math.floor(Math.random() * rounds.length)],
//         Quota: quotas[Math.floor(Math.random() * quotas.length)],
//         Category: categories[Math.floor(Math.random() * categories.length)],
//         State: states[Math.floor(Math.random() * states.length)],
//         Institute: institutes[Math.floor(Math.random() * institutes.length)],
//         Course: courses[Math.floor(Math.random() * courses.length)],
//         Seats: seats,
//         Fee_Stipend_Year_1: feeStipend,
//         Bond_Years: bondYears,
//         Bond_Penalty: bondPenalty,
//         Beds: beds,
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
//         setSeatMatrixData(dummyData);
//       } catch (error) {
//         console.error("Error fetching seat matrix data:", error);
//         setSeatMatrixData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedCounselling]);

//   // Filter data based on search and filters
//   const filteredData = seatMatrixData.filter((item) => {
//     const matchesSearch = searchTerm === "" || 
//       item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesQuota = selectedQuota === "all" || item.Quota === selectedQuota;
//     const matchesCategory = selectedCategory === "all" || item.Category === selectedCategory;
    
//     return matchesSearch && matchesQuota && matchesCategory;
//   });

//   // Sort data in ascending order by Seats
//   // const sortedData = [...filteredData].sort((a, b) => a.Seats - b.Seats);
//   const sortedData = filteredData;

//   const itemsPerPage = 70;
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

//   // Get unique values for filters
//   const quotas = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Quota)))];
//   const categories = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Category)))];

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Seat Matrix Data...</p>
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
//               <h2 className="text-lg font-semibold text-gray-800">NEET PG Seat Matrix</h2>
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
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
//                 <p className="text-xs text-purple-100">2024 Session Data</p>
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
//         <div className="bg-white border-b text-black border-gray-200 px-4 py-3">
//           <div className="flex flex-col md:flex-row gap-3">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-black" />
//               <input
//                 type="text"
//                 placeholder="Search institutes, courses, or states..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//               />
//             </div>

//             {/* Quota Filter */}
//             <select
//               value={selectedQuota}
//               onChange={(e) => setSelectedQuota(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-black"
//             >
//               {quotas.map((quota) => (
//                 <option key={quota} value={quota}>
//                   {quota === "all" ? "All Quotas" : quota}
//                 </option>
//               ))}
//             </select>

//             {/* Category Filter */}
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-black"
//             >
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category === "all" ? "All Categories" : category}
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
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Round</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Seats</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee/Stipend Year 1</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Years</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Penalty</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-1</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-2</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-3</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-4</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-5</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-1</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-2</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-3</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-4</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-5</th>
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {paginatedData.map((item, index) => (
//                 <tr key={index} className="hover:bg-purple-50 transition-colors">
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Round}</td>
//                   <td className="px-2 py-2 text-xs">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       item.Quota === "All India" ? "bg-green-100 text-green-800" :
//                       item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
//                       item.Quota === "Management" ? "bg-purple-100 text-purple-800" :
//                       item.Quota === "NRI" ? "bg-blue-100 text-blue-800" :
//                       "bg-gray-100 text-gray-800"
//                     }`}>
//                       {item.Quota}
//                     </span>
//                   </td>
//                   <td className="px-2 py-2 text-xs">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       item.Category === "General" ? "bg-blue-100 text-blue-800" :
//                       item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
//                       item.Category === "SC" ? "bg-red-100 text-red-800" :
//                       item.Category === "ST" ? "bg-green-100 text-green-800" :
//                       item.Category === "EWS" ? "bg-indigo-100 text-indigo-800" :
//                       "bg-pink-100 text-pink-800"
//                     }`}>
//                       {item.Category}
//                     </span>
//                   </td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.State}</td>
//                   <td className="px-2 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
//                     {item.Institute}
//                   </td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Course}</td>
//                   <td className="px-2 py-2 text-xs font-bold text-purple-600">{item.Seats}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">₹{item.Fee_Stipend_Year_1.toLocaleString()}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">₹{item.Bond_Penalty.toLocaleString()}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.Beds}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_1}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_2}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_3}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_4}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_5}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_1}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_2}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_3}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_4}</td>
//                   <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_5}</td>
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
//         <div className="bg-white border-t border-gray-200 px-4 py-3 text-black">
//           <div className="flex items-center justify-between">
//             <div className="text-xs text-gray-600 text-black">
//               Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
//             </div>
            
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
//                           ? "bg-purple-500 text-white"
//                           : "border border-gray-300 hover:bg-gray-50"
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
//                 className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

// export default SeatMatrixPage;

// import React, { useState, useEffect } from "react";
// import { ArrowLeft, BarChart3, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";

// interface SeatMatrixPageProps {
//   onBack: () => void;
// }

// interface SeatMatrixData {
//   Round: string;
//   Quota: string;
//   Category: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Seats: number;
//   Fee_Stipend_Year_1: number;
//   Bond_Years: number;
//   Bond_Penalty: number;
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
//  * Enhanced Seat Matrix Page Component
//  * Features sidebar navigation and comprehensive seat matrix data
//  */
// const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
//   const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedQuota, setSelectedQuota] = useState("all");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedState, setSelectedState] = useState("all");
//   const [selectedRound, setSelectedRound] = useState("all");
//   const [selectedInstituteType, setSelectedInstituteType] = useState("all");
//   const [showColumnToggle, setShowColumnToggle] = useState(false);
  
//   // Column visibility state
//   const [columnVisibility, setColumnVisibility] = useState({
//     Round: true,
//     Quota: true,
//     Category: true,
//     State: true,
//     Institute: true,
//     Course: true,
//     Seats: true,
//     Fee_Stipend_Year_1: true,
//     Bond_Years: true,
//     Bond_Penalty: true,
//     Beds: true,
//     CR_2023_1: true,
//     CR_2023_2: true,
//     CR_2023_3: true,
//     CR_2023_4: true,
//     CR_2023_5: true,
//     CR_2024_1: true,
//     CR_2024_2: true,
//     CR_2024_3: true,
//     CR_2024_4: true,
//     CR_2024_5: true,
//   });

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

//   // Extract state name from counselling option
//   const getStateFromCounselling = (counsellingOption: string): string | null => {
//     const mappings: { [key: string]: string } = {
//       "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)": "Delhi",
//       "Goa - PG Medical": "Goa",
//       "Gujarat - PG Medical": "Gujarat",
//       "Haryana - PG Medical": "Haryana",
//       "Himachal Pradesh - PG Medical": "Himachal Pradesh",
//       "Jammu and Kashmir - PG Medical": "Jammu and Kashmir",
//       "Jharkhand - PG Medical": "Jharkhand",
//       "Karnataka - PG Medical": "Karnataka",
//       "Kerala - PG Medical": "Kerala",
//       "Madhya Pradesh - PG Medical": "Madhya Pradesh",
//       "Maharashtra - PG Medical": "Maharashtra",
//       "Manipur-JNIMS - PG Medical": "Manipur",
//       "Manipur-RIMS - PG Medical": "Manipur",
//       "NEIGRIHMS - PG Medical": "Delhi",
//       "Odisha - PG Medical": "Odisha",
//       "Pondicherry - PG Medical": "Pondicherry",
//       "Punjab - PG Medical": "Punjab",
//       "Rajasthan - PG Medical": "Rajasthan",
//       "Sikkim - PG Medical": "Sikkim",
//       "Tamil Nadu Government Quota - PG Medical": "Tamil Nadu",
//       "Tamil Nadu Management Quota - PG Medical": "Tamil Nadu",
//       "Telangana Government Quota - PG Medical": "Telangana",
//       "Telangana Management Quota - PG Medical": "Telangana",
//       "Tripura - PG Medical": "Tripura",
//       "Uttarakhand - PG Medical": "Uttarakhand",
//       "Uttar Pradesh - PG Medical": "Uttar Pradesh",
//       "West Bengal - PG Medical": "West Bengal"
//     };
    
//     return mappings[counsellingOption] || null;
//   };

//   // Determine institute type (Government/Private)
//   const getInstituteType = (instituteName: string): string => {
//     if (!instituteName) return 'Private';
    
//     const govKeywords = [
//       'government', 'govt', 'medical college', 'aiims', 'pgimer', 'jipmer', 
//       'state', 'national', 'central', 'university', 'kgmu', 'bhu', 'sgpgi',
//       'nims', 'sms', 'vmmc', 'mamc', 'ucms', 'ipgmer', 'lady hardinge',
//       'stanley', 'grant', 'gb pant', 'seth gs', 'gmch', 'gmc'
//     ];
    
//     const name = instituteName.toLowerCase();
//     const isGovt = govKeywords.some(keyword => name.includes(keyword));
//     return isGovt ? 'Government' : 'Private';
//   };

//   // Fetch data from API
//   const fetchSeatMatrixData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('https://backend-dju9.onrender.com/get-seatmatrix/');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       // Ensure the data is an array
//       if (Array.isArray(data)) {
//         setSeatMatrixData(data);
//       } else if (data && Array.isArray(data.data)) {
//         // If the API returns data wrapped in an object
//         setSeatMatrixData(data.data);
//       } else {
//         console.error('Unexpected data format:', data);
//         setSeatMatrixData([]);
//       }
//     } catch (error) {
//       console.error("Error fetching seat matrix data:", error);
//       setError(error instanceof Error ? error.message : 'Failed to fetch data');
//       setSeatMatrixData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSeatMatrixData();
//   }, []);

//   // Filter data based on search and filters
//   const filteredData = seatMatrixData.filter((item) => {
//     // First filter by counselling selection (state-based filtering)
//     const counsellingState = getStateFromCounselling(selectedCounselling);
//     const matchesCounselling = counsellingState === null || 
//       item.State?.toLowerCase() === counsellingState.toLowerCase() ||
//       item.State?.toLowerCase().includes(counsellingState.toLowerCase());

//     // Institute type filtering
//     const instituteType = getInstituteType(item.Institute || '');
//     const matchesInstituteType = selectedInstituteType === "all" || 
//       selectedInstituteType === "both" ||
//       instituteType === selectedInstituteType;

//     const matchesSearch = searchTerm === "" || 
//       item.Institute?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.State?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesQuota = selectedQuota === "all" || item.Quota === selectedQuota;
//     const matchesCategory = selectedCategory === "all" || item.Category === selectedCategory;
//     const matchesStateFilter = selectedState === "all" || item.State === selectedState;
//     const matchesRound = selectedRound === "all" || item.Round === selectedRound;
    
//     return matchesCounselling && matchesInstituteType && matchesSearch && matchesQuota && matchesCategory && matchesStateFilter && matchesRound;
//   });

//   const sortedData = filteredData;

//   const itemsPerPage = 50;
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

//   // Get unique values for filters from the actual data
//   const quotas = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Quota).filter(Boolean)))];
//   const categories = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Category).filter(Boolean)))];
//   const states = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.State).filter(Boolean)))];
//   const rounds = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Round).filter(Boolean)))];

//   // Reset filters when counselling changes
//   useEffect(() => {
//     setCurrentPage(1);
//     setSearchTerm("");
//     setSelectedQuota("all");
//     setSelectedCategory("all");
//     setSelectedState("all");
//     setSelectedRound("all");
//     setSelectedInstituteType("all");
//   }, [selectedCounselling]);

//   // Reset pagination when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedQuota, selectedCategory, selectedState, selectedRound, selectedInstituteType]);

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Seat Matrix Data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-8 h-8 text-red-500" />
//           </div>
//           <p className="text-red-600 mb-4">Error loading data: {error}</p>
//           <button 
//             onClick={fetchSeatMatrixData}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const visibleColumnsCount = Object.values(columnVisibility).filter(Boolean).length;

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
//               <h2 className="text-lg font-semibold text-gray-800">NEET PG Seat Matrix</h2>
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
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
//                 <p className="text-xs text-purple-100">
//                   {getStateFromCounselling(selectedCounselling) 
//                     ? `${getStateFromCounselling(selectedCounselling)} - 2024 Session Data` 
//                     : "All India - 2024 Session Data"} - {seatMatrixData.length} total records
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setShowColumnToggle(true)}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//                 title="View/Hide Columns"
//               >
//                 <BarChart3 className="w-4 h-4" />
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

//         {/* Search and Filters */}
//         <div className="bg-white border-b text-black border-gray-200 px-4 py-3">
//           <div className="flex flex-col md:flex-row gap-3 mb-3">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search institutes, courses, or states..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row gap-3">
//             {/* Round Filter */}
//             <select
//               value={selectedRound}
//               onChange={(e) => setSelectedRound(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-black"
//             >
//               {rounds.map((round) => (
//                 <option key={round} value={round}>
//                   {round === "all" ? "All Rounds" : round}
//                 </option>
//               ))}
//             </select>

//             {/* Institute Type Filter */}
//             <select
//               value={selectedInstituteType}
//               onChange={(e) => setSelectedInstituteType(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-black"
//             >
//               <option value="all">All Types</option>
//               <option value="Government">Government</option>
//               <option value="Private">Private</option>
//               <option value="both">Both</option>
//             </select>

//             {/* Quota Filter */}
//             <select
//               value={selectedQuota}
//               onChange={(e) => setSelectedQuota(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-black"
//             >
//               {quotas.map((quota) => (
//                 <option key={quota} value={quota}>
//                   {quota === "all" ? "All Quotas" : quota}
//                 </option>
//               ))}
//             </select>

//             {/* Category Filter */}
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-black"
//             >
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category === "all" ? "All Categories" : category}
//                 </option>
//               ))}
//             </select>

//             {/* State Filter */}
//             <select
//               value={selectedState}
//               onChange={(e) => setSelectedState(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-black"
//             >
//               {states.map((state) => (
//                 <option key={state} value={state}>
//                   {state === "all" ? "All States" : state}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Results Summary */}
//         <div className="bg-gray-100 px-4 py-2">
//           <p className="text-sm text-gray-600">
//             Showing {filteredData.length} results for {selectedCounselling}
//             {searchTerm && ` matching "${searchTerm}"`}
//           </p>
//         </div>

//         {/* Table */}
//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
//               <tr>
//                 {columnVisibility.Round && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Round</th>
//                 )}
//                 {columnVisibility.Quota && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
//                 )}
//                 {columnVisibility.Category && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
//                 )}
//                 {columnVisibility.State && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
//                 )}
//                 {columnVisibility.Institute && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
//                 )}
//                 {columnVisibility.Course && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
//                 )}
//                 {columnVisibility.Seats && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Seats</th>
//                 )}
//                 {columnVisibility.Fee_Stipend_Year_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee/Stipend Year 1</th>
//                 )}
//                 {columnVisibility.Bond_Years && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Years</th>
//                 )}
//                 {columnVisibility.Bond_Penalty && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Penalty</th>
//                 )}
//                 {columnVisibility.Beds && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
//                 )}
//                 {columnVisibility.CR_2023_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-1</th>
//                 )}
//                 {columnVisibility.CR_2023_2 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-2</th>
//                 )}
//                 {columnVisibility.CR_2023_3 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-3</th>
//                 )}
//                 {columnVisibility.CR_2023_4 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-4</th>
//                 )}
//                 {columnVisibility.CR_2023_5 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-5</th>
//                 )}
//                 {columnVisibility.CR_2024_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-1</th>
//                 )}
//                 {columnVisibility.CR_2024_2 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-2</th>
//                 )}
//                 {columnVisibility.CR_2024_3 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-3</th>
//                 )}
//                 {columnVisibility.CR_2024_4 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-4</th>
//                 )}
//                 {columnVisibility.CR_2024_5 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-5</th>
//                 )}
//                 <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {paginatedData.length === 0 ? (
//                 <tr>
//                   <td colSpan={visibleColumnsCount + 1} className="px-4 py-8 text-center text-gray-500">
//                     No data found matching your criteria
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedData.map((item, index) => (
//                   <tr key={index} className="hover:bg-purple-50 transition-colors">
//                     {columnVisibility.Round && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.Round || 'N/A'}</td>
//                     )}
//                     {columnVisibility.Quota && (
//                       <td className="px-2 py-2 text-xs">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           item.Quota === "All India" ? "bg-green-100 text-green-800" :
//                           item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
//                           item.Quota === "Management" ? "bg-purple-100 text-purple-800" :
//                           item.Quota === "NRI" ? "bg-blue-100 text-blue-800" :
//                           "bg-gray-100 text-gray-800"
//                         }`}>
//                           {item.Quota || 'N/A'}
//                         </span>
//                       </td>
//                     )}
//                     {columnVisibility.Category && (
//                       <td className="px-2 py-2 text-xs">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           item.Category === "General" ? "bg-blue-100 text-blue-800" :
//                           item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
//                           item.Category === "SC" ? "bg-red-100 text-red-800" :
//                           item.Category === "ST" ? "bg-green-100 text-green-800" :
//                           item.Category === "EWS" ? "bg-indigo-100 text-indigo-800" :
//                           "bg-pink-100 text-pink-800"
//                         }`}>
//                           {item.Category || 'N/A'}
//                         </span>
//                       </td>
//                     )}
//                     {columnVisibility.State && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.State || 'N/A'}</td>
//                     )}
//                     {columnVisibility.Institute && (
//                       <td className="px-2 py-2 text-xs">
//                         <div className="flex flex-col space-y-1">
//                           <span className="text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
//                             {item.Institute || 'N/A'}
//                           </span>
//                           <span className={`px-1 py-0.5 rounded text-xs font-medium self-start ${
//                             getInstituteType(item.Institute || '') === 'Government' 
//                               ? "bg-green-100 text-green-700" 
//                               : "bg-orange-100 text-orange-700"
//                           }`}>
//                             {getInstituteType(item.Institute || '')}
//                           </span>
//                         </div>
//                       </td>
//                     )}
//                     {columnVisibility.Course && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.Course || 'N/A'}</td>
//                     )}
//                     {columnVisibility.Seats && (
//                       <td className="px-2 py-2 text-xs font-bold text-purple-600">{item.Seats || 0}</td>
//                     )}
//                     {columnVisibility.Fee_Stipend_Year_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.Fee_Stipend_Year_1 ? `₹${item.Fee_Stipend_Year_1.toLocaleString()}` : 'N/A'}
//                       </td>
//                     )}
//                     {columnVisibility.Bond_Years && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years || 'N/A'}</td>
//                     )}
//                     {columnVisibility.Bond_Penalty && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.Bond_Penalty ? `₹${item.Bond_Penalty.toLocaleString()}` : 'N/A'}
//                       </td>
//                     )}
//                     {columnVisibility.Beds && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.Beds || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2023_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_1 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2023_2 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_2 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2023_3 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_3 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2023_4 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_4 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2023_5 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_5 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2024_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_1 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2024_2 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_2 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2024_3 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_3 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2024_4 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_4 || 'N/A'}</td>
//                     )}
//                     {columnVisibility.CR_2024_5 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_5 || 'N/A'}</td>
//                     )}
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
//         {totalPages > 1 && (
//           <div className="bg-white border-t border-gray-200 px-4 py-3 text-black">
//             <div className="flex items-center justify-between">
//               <div className="text-xs text-gray-600">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
//               </div>
              
//               <div className="flex items-center space-x-1">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="w-3 h-3" />
//                 </button>
                
//                 <div className="flex space-x-1">
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = currentPage - 2 + i;
//                     }
                    
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`px-2 py-1 text-xs rounded transition-colors ${
//                           currentPage === pageNum
//                             ? "bg-purple-500 text-white"
//                             : "border border-gray-300 hover:bg-gray-50"
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>
                
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronRight className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Column Visibility Toggle Modal */}
//       {showColumnToggle && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowColumnToggle(false)}></div>
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 w-96 max-h-[80vh] overflow-hidden">
//             <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 flex items-center justify-between">
//               <h3 className="text-lg font-semibold">View/Hide Columns</h3>
//               <button
//                 onClick={() => setShowColumnToggle(false)}
//                 className="p-1 hover:bg-white/20 rounded"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="p-4 max-h-96 overflow-y-auto">
//               <div className="space-y-3">
//                 {Object.entries(columnVisibility).map(([column, isVisible]) => (
//                   <div key={column} className="flex items-center justify-between py-2">
//                     <span className="text-sm text-gray-700 font-medium">
//                       {column.replace(/_/g, ' ').replace(/CR (\d+)-(\d+)/, 'CR $1-$2')}
//                     </span>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={isVisible}
//                         onChange={(e) => setColumnVisibility(prev => ({
//                           ...prev,
//                           [column]: e.target.checked
//                         }))}
//                         className="sr-only peer"
//                       />
//                       <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
//               <button
//                 onClick={() => {
//                   // Show all columns
//                   const allVisible = Object.keys(columnVisibility).reduce((acc, key) => ({
//                     ...acc,
//                     [key]: true
//                   }), {});
//                   setColumnVisibility(allVisible);
//                 }}
//                 className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
//               >
//                 Show All
//               </button>
//               <button
//                 onClick={() => {
//                   // Hide all except essential columns
//                   const essentialColumns = {
//                     ...Object.keys(columnVisibility).reduce((acc, key) => ({
//                       ...acc,
//                       [key]: false
//                     }), {}),
//                     Institute: true,
//                     Course: true,
//                     Seats: true,
//                     State: true,
//                     Category: true
//                   };
//                   setColumnVisibility(essentialColumns);
//                 }}
//                 className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
//               >
//                 Essential Only
//               </button>
//               <button
//                 onClick={() => setShowColumnToggle(false)}
//                 className="px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SeatMatrixPage;

// import React, { useState, useEffect } from "react";
// import { ArrowLeft, BarChart3, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

// interface SeatMatrixPageProps {
//   onBack: () => void;
// }

// interface SeatMatrixData {
//   Round: string;
//   Quota: string;
//   Category: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Seats: number;
//   Fee_Stipend_Year_1: number;
//   Bond_Years: number;
//   Bond_Penalty: number;
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

// interface ColumnVisibility {
//   Round: boolean;
//   Quota: boolean;
//   Category: boolean;
//   State: boolean;
//   Institute: boolean;
//   Course: boolean;
//   Seats: boolean;
//   Fee_Stipend_Year_1: boolean;
//   Bond_Years: boolean;
//   Bond_Penalty: boolean;
//   Beds: boolean;
//   CR_2023_1: boolean;
//   CR_2023_2: boolean;
//   CR_2023_3: boolean;
//   CR_2023_4: boolean;
//   CR_2023_5: boolean;
//   CR_2024_1: boolean;
//   CR_2024_2: boolean;
//   CR_2024_3: boolean;
//   CR_2024_4: boolean;
//   CR_2024_5: boolean;
//   actions: boolean;
// }

// /**
//  * Enhanced Seat Matrix Page Component
//  * Features sidebar navigation and comprehensive seat matrix data
//  */
// const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
//   const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
  
//   // Search and filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedQuota, setSelectedQuota] = useState("all");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedRound, setSelectedRound] = useState("all");
//   const [selectedState, setSelectedState] = useState("all");
//   const [selectedInstitute, setSelectedInstitute] = useState("all");
//   const [selectedCourse, setSelectedCourse] = useState("all");
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

//   // Column visibility state
//   const [showColumnVisibility, setShowColumnVisibility] = useState(false);
//   const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
//     Round: true,
//     Quota: true,
//     Category: true,
//     State: true,
//     Institute: true,
//     Course: true,
//     Seats: true,
//     Fee_Stipend_Year_1: true,
//     Bond_Years: true,
//     Bond_Penalty: true,
//     Beds: true,
//     CR_2023_1: true,
//     CR_2023_2: true,
//     CR_2023_3: true,
//     CR_2023_4: true,
//     CR_2023_5: true,
//     CR_2024_1: true,
//     CR_2024_2: true,
//     CR_2024_3: true,
//     CR_2024_4: true,
//     CR_2024_5: true,
//     actions: true,
//   });

//   // Column definitions for easier management
//   const columnDefinitions = [
//     { key: 'Round' as keyof ColumnVisibility, label: 'Round' },
//     { key: 'Quota' as keyof ColumnVisibility, label: 'Quota' },
//     { key: 'Category' as keyof ColumnVisibility, label: 'Category' },
//     { key: 'State' as keyof ColumnVisibility, label: 'State' },
//     { key: 'Institute' as keyof ColumnVisibility, label: 'Institute' },
//     { key: 'Course' as keyof ColumnVisibility, label: 'Course' },
//     { key: 'Seats' as keyof ColumnVisibility, label: 'Seats' },
//     { key: 'Fee_Stipend_Year_1' as keyof ColumnVisibility, label: 'Fee/Stipend Year 1' },
//     { key: 'Bond_Years' as keyof ColumnVisibility, label: 'Bond Years' },
//     { key: 'Bond_Penalty' as keyof ColumnVisibility, label: 'Bond Penalty' },
//     { key: 'Beds' as keyof ColumnVisibility, label: 'Beds' },
//     { key: 'CR_2023_1' as keyof ColumnVisibility, label: 'CR 2023-1' },
//     { key: 'CR_2023_2' as keyof ColumnVisibility, label: 'CR 2023-2' },
//     { key: 'CR_2023_3' as keyof ColumnVisibility, label: 'CR 2023-3' },
//     { key: 'CR_2023_4' as keyof ColumnVisibility, label: 'CR 2023-4' },
//     { key: 'CR_2023_5' as keyof ColumnVisibility, label: 'CR 2023-5' },
//     { key: 'CR_2024_1' as keyof ColumnVisibility, label: 'CR 2024-1' },
//     { key: 'CR_2024_2' as keyof ColumnVisibility, label: 'CR 2024-2' },
//     { key: 'CR_2024_3' as keyof ColumnVisibility, label: 'CR 2024-3' },
//     { key: 'CR_2024_4' as keyof ColumnVisibility, label: 'CR 2024-4' },
//     { key: 'CR_2024_5' as keyof ColumnVisibility, label: 'CR 2024-5' },
//     { key: 'actions' as keyof ColumnVisibility, label: 'Actions' },
//   ];

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

//   // Toggle column visibility
//   const toggleColumn = (columnKey: keyof ColumnVisibility) => {
//     setColumnVisibility(prev => ({
//       ...prev,
//       [columnKey]: !prev[columnKey]
//     }));
//   };

//   // Show all columns
//   const showAllColumns = () => {
//     const allVisible = Object.keys(columnVisibility).reduce((acc, key) => {
//       acc[key as keyof ColumnVisibility] = true;
//       return acc;
//     }, {} as ColumnVisibility);
//     setColumnVisibility(allVisible);
//   };

//   // Hide all columns (but keep at least one visible)
//   const hideAllColumns = () => {
//     const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
//       acc[key as keyof ColumnVisibility] = key === 'Institute'; // Keep Institute visible
//       return acc;
//     }, {} as ColumnVisibility);
//     setColumnVisibility(allHidden);
//   };

//   // API fetch function
//   const fetchSeatMatrixFromAPI = async (params: { 
//     round?: string; 
//     category?: string; 
//     quota?: string; 
//     state?: string; 
//     institute?: string; 
//     course?: string; 
//     page?: number 
//   }) => {
//     const queryParams = new URLSearchParams();
  
//     if (params.round && params.round !== "all") queryParams.append('round', params.round);
//     if (params.category && params.category !== "all") queryParams.append('category', params.category);
//     if (params.quota && params.quota !== "all") queryParams.append('quota', params.quota);
//     if (params.state && params.state !== "all") queryParams.append('state', params.state);
//     if (params.institute && params.institute !== "all") queryParams.append('institute', params.institute);
//     if (params.course && params.course !== "all") queryParams.append('course', params.course);
//     if (params.page) queryParams.append('page', params.page.toString());
//     queryParams.append('page_size', '70');  // Fixed page size
  
//     try {
//       console.log('Making API request with params:', queryParams.toString());
//       const response = await fetch(`https://backend-dju9.onrender.com/get-seatmatrix/?${queryParams.toString()}`);
      
//       if (!response.ok) {
//         console.error(`API returned status ${response.status}`);
//         return { results: [], count: 0 };
//       }
      
//       const data = await response.json();
//       console.log('API Response:', data);
      
//       // Map the API response to match the interface
//       const mappedResults = data.results.map((item: any) => ({
//         Round: item.round,
//         Quota: item.quota,
//         Category: item.category,
//         State: item.state,
//         Institute: item.institute,
//         Course: item.course,
//         Seats: parseInt(item.seats),
//         Fee_Stipend_Year_1: parseFloat(item.fee_stipend_year_1),
//         Bond_Years: parseInt(item.bond_years),
//         Bond_Penalty: parseFloat(item.bond_penalty),
//         Beds: parseInt(item.beds),
//         CR_2023_1: parseInt(item.cr_2023_1) || 0,
//         CR_2023_2: parseInt(item.cr_2023_2) || 0,
//         CR_2023_3: parseInt(item.cr_2023_3) || 0,
//         CR_2023_4: parseInt(item.cr_2023_4) || 0,
//         CR_2023_5: parseInt(item.cr_2023_5) || 0,
//         CR_2024_1: parseInt(item.cr_2024_1) || 0,
//         CR_2024_2: parseInt(item.cr_2024_2) || 0,
//         CR_2024_3: parseInt(item.cr_2024_3) || 0,
//         CR_2024_4: parseInt(item.cr_2024_4) || 0,
//         CR_2024_5: parseInt(item.cr_2024_5) || 0,
//       }));
      
//       return {
//         results: mappedResults,
//         count: data.count
//       };
//     } catch (error) {
//       console.error("Network error:", error);
//       return { results: [], count: 0 };
//     }
//   };

//   // Fetch data with API
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         console.log('Fetching data with filters:', {
//           round: selectedRound,
//           category: selectedCategory,
//           quota: selectedQuota,
//           state: selectedState,
//           institute: selectedInstitute,
//           course: selectedCourse,
//           page: currentPage,
//         });

//         const data = await fetchSeatMatrixFromAPI({
//           round: selectedRound !== "all" ? selectedRound : undefined,
//           category: selectedCategory !== "all" ? selectedCategory : undefined,
//           quota: selectedQuota !== "all" ? selectedQuota : undefined,
//           state: selectedState !== "all" ? selectedState : undefined,
//           institute: selectedInstitute !== "all" ? selectedInstitute : undefined,
//           course: selectedCourse !== "all" ? selectedCourse : undefined,
//           page: currentPage,
//         });
  
//         console.log('Processed data:', data);
        
//         if (data && Array.isArray(data.results) && typeof data.count === "number") {
//           setSeatMatrixData(data.results);
//           setTotalCount(data.count);
//         } else {
//           console.error("Unexpected API response format:", data);
//           setSeatMatrixData([]);
//           setTotalCount(0);
//         }
//       } catch (error) {
//         console.error("Error fetching seat matrix data:", error);
//         setSeatMatrixData([]);
//         setTotalCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [
//     selectedRound,
//     selectedCategory,
//     selectedQuota,
//     selectedState,
//     selectedInstitute,
//     selectedCourse,
//     currentPage,
//     selectedCounselling
//   ]);

//   // Get unique values for filters from current data
//   const quotas = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Quota)))];
//   const categories = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Category)))];
//   const rounds = ["all", "Round 1", "Round 2", "Round 3", "Round 4", "Round 5"];
//   const states = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.State)))];
//   const institutes = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Institute)))];
//   const courses = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Course)))];

//   // Client-side filtering for search term only
//   const filteredData = seatMatrixData.filter((item) => {
//     const matchesSearch = searchTerm === "" || 
//       item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
//     return matchesSearch;
//   });

//   const itemsPerPage = 70;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   // Clear all filters function
//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setSelectedCategory("all");
//     setSelectedQuota("all");
//     setSelectedRound("all");
//     setSelectedState("all");
//     setSelectedInstitute("all");
//     setSelectedCourse("all");
//     setCurrentPage(1);
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Seat Matrix Data...</p>
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

//       {/* Column Visibility Modal */}
//       {showColumnVisibility && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="text-lg font-semibold text-gray-900">Show/Hide Columns</h3>
//               <button
//                 onClick={() => setShowColumnVisibility(false)}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="p-4">
//               <div className="flex gap-2 mb-4">
//                 <button
//                   onClick={showAllColumns}
//                   className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
//                 >
//                   Show All
//                 </button>
//                 <button
//                   onClick={hideAllColumns}
//                   className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
//                 >
//                   Hide All
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
//                 {columnDefinitions.map(({ key, label }) => (
//                   <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
//                     <label className="flex items-center cursor-pointer flex-1">
//                       <input
//                         type="checkbox"
//                         checked={columnVisibility[key]}
//                         onChange={() => toggleColumn(key)}
//                         className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
//                       />
//                       <span className="ml-3 text-sm text-gray-700">{label}</span>
//                     </label>
//                     <div className="ml-2">
//                       {columnVisibility[key] ? (
//                         <Eye className="w-4 h-4 text-green-500" />
//                       ) : (
//                         <EyeOff className="w-4 h-4 text-gray-400" />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
//               <button
//                 onClick={() => setShowColumnVisibility(false)}
//                 className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//               >
//                 Apply Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Sidebar */}
//       {showSidebar && (
//         <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">NEET PG Seat Matrix</h2>
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
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {counsellingOptions.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedCounselling(option)}
//                 className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
//                   selectedCounselling === option ? "bg-purple-50 border-l-4 border-l-purple-500" : ""
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
//                     <BarChart3 className="w-3 h-3 text-gray-600" />
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
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
//                 <p className="text-xs text-purple-100">2024 Session Data</p>
//               </div>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-2">
//               <span className="text-xs text-purple-100">
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

//         {/* Round Filter Pills with Show/Hide Button */}
//         <div className="bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex items-center gap-2 overflow-x-auto">
//             {["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"].map((round) => (
//               <button
//                 key={round}
//                 onClick={() => {
//                   setSelectedRound(round);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
//                   selectedRound === round
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {round}
//               </button>
//             ))}

//             <button
//               onClick={() => {
//                 setSelectedRound("all");
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
//                 selectedRound === "all"
//                   ? "bg-pink-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               All Rounds
//             </button>

//             {/* Show/Hide Button */}
//             <button
//               onClick={() => setShowColumnVisibility(true)}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors ml-2"
//             >
//               <Eye className="w-4 h-4" />
//               Show/Hide
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
//                   className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                 />
//               </div>

//               {/* Quick Filters */}
//               <div className="flex gap-2 flex-wrap">
//                 <select
//                   value={selectedQuota}
//                   onChange={(e) => {
//                     setSelectedQuota(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {quotas.map((quota) => (
//                     <option key={quota} value={quota}>
//                       {quota === "all" ? "All Quotas" : quota}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category === "all" ? "All Categories" : category}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Advanced Filter Toggle */}
//                 <button
//                   onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//                   className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200"
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
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
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
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
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
//                     <span className="font-medium text-purple-600">{filteredData.length}</span>
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
//                 {columnVisibility.Round && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Round</th>
//                 )}
//                 {columnVisibility.Quota && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
//                 )}
//                 {columnVisibility.Category && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
//                 )}
//                 {columnVisibility.State && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
//                 )}
//                 {columnVisibility.Institute && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
//                 )}
//                 {columnVisibility.Course && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
//                 )}
//                 {columnVisibility.Seats && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Seats</th>
//                 )}
//                 {columnVisibility.Fee_Stipend_Year_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee/Stipend Year 1</th>
//                 )}
//                 {columnVisibility.Bond_Years && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Years</th>
//                 )}
//                 {columnVisibility.Bond_Penalty && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Penalty</th>
//                 )}
//                 {columnVisibility.Beds && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
//                 )}
//                 {columnVisibility.CR_2023_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-1</th>
//                 )}
//                 {columnVisibility.CR_2023_2 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-2</th>
//                 )}
//                 {columnVisibility.CR_2023_3 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-3</th>
//                 )}
//                 {columnVisibility.CR_2023_4 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-4</th>
//                 )}
//                 {columnVisibility.CR_2023_5 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-5</th>
//                 )}
//                 {columnVisibility.CR_2024_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-1</th>
//                 )}
//                 {columnVisibility.CR_2024_2 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-2</th>
//                 )}
//                 {columnVisibility.CR_2024_3 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-3</th>
//                 )}
//                 {columnVisibility.CR_2024_4 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-4</th>
//                 )}
//                 {columnVisibility.CR_2024_5 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-5</th>
//                 )}
//                 {columnVisibility.actions && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {filteredData.length === 0 ? (
//                 <tr>
//                   <td colSpan={Object.values(columnVisibility).filter(Boolean).length} className="px-6 py-8 text-center text-gray-500">
//                     No data found. Try adjusting your filters.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredData.map((item, index) => (
//                   <tr key={index} className="hover:bg-purple-50 transition-colors">
//                     {columnVisibility.Round && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.Round}</td>
//                     )}
//                     {columnVisibility.Quota && (
//                       <td className="px-2 py-2 text-xs">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           item.Quota === "All India" ? "bg-green-100 text-green-800" :
//                           item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
//                           item.Quota === "Management" ? "bg-purple-100 text-purple-800" :
//                           item.Quota === "NRI" ? "bg-blue-100 text-blue-800" :
//                           "bg-gray-100 text-gray-800"
//                         }`}>
//                           {item.Quota}
//                         </span>
//                       </td>
//                     )}
//                     {columnVisibility.Category && (
//                       <td className="px-2 py-2 text-xs">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           item.Category === "General" ? "bg-blue-100 text-blue-800" :
//                           item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
//                           item.Category === "SC" ? "bg-red-100 text-red-800" :
//                           item.Category === "ST" ? "bg-green-100 text-green-800" :
//                           item.Category === "EWS" ? "bg-indigo-100 text-indigo-800" :
//                           "bg-pink-100 text-pink-800"
//                         }`}>
//                           {item.Category}
//                         </span>
//                       </td>
//                     )}
//                     {columnVisibility.State && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.State}</td>
//                     )}
//                     {columnVisibility.Institute && (
//                       <td className="px-2 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
//                         {item.Institute}
//                       </td>
//                     )}
//                     {columnVisibility.Course && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.Course}</td>
//                     )}
//                     {columnVisibility.Seats && (
//                       <td className="px-2 py-2 text-xs font-bold text-purple-600">{item.Seats}</td>
//                     )}
//                     {columnVisibility.Fee_Stipend_Year_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">₹{item.Fee_Stipend_Year_1.toLocaleString()}</td>
//                     )}
//                     {columnVisibility.Bond_Years && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years}</td>
//                     )}
//                     {columnVisibility.Bond_Penalty && (
//                       <td className="px-2 py-2 text-xs text-gray-700">₹{item.Bond_Penalty.toLocaleString()}</td>
//                     )}
//                     {columnVisibility.Beds && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.Beds}</td>
//                     )}
//                     {columnVisibility.CR_2023_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_1}</td>
//                     )}
//                     {columnVisibility.CR_2023_2 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_2}</td>
//                     )}
//                     {columnVisibility.CR_2023_3 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_3}</td>
//                     )}
//                     {columnVisibility.CR_2023_4 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_4}</td>
//                     )}
//                     {columnVisibility.CR_2023_5 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2023_5}</td>
//                     )}
//                     {columnVisibility.CR_2024_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_1}</td>
//                     )}
//                     {columnVisibility.CR_2024_2 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_2}</td>
//                     )}
//                     {columnVisibility.CR_2024_3 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_3}</td>
//                     )}
//                     {columnVisibility.CR_2024_4 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_4}</td>
//                     )}
//                     {columnVisibility.CR_2024_5 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{item.CR_2024_5}</td>
//                     )}
//                     {columnVisibility.actions && (
//                       <td className="px-2 py-2">
//                         <button className="p-1 hover:bg-red-100 rounded transition-colors">
//                           <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
//                         </button>
//                       </td>
//                     )}
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
//                     // Show current page in the middle
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
//                           ? "bg-purple-500 text-white"
//                           : "border border-gray-300 text-black hover:bg-gray-50"
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

// export default SeatMatrixPage;

// WORKING BUT ROUNDS IS NOT WORING ALS IT IS THE COMPONNET OF WITH INFO NOT AVAILABLE TESTING DATA 

// import React, { useState, useEffect } from "react";
// import { ArrowLeft, BarChart3, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

// interface SeatMatrixPageProps {
//   onBack: () => void;
// }

// interface SeatMatrixData {
//   Round: string;
//   Quota: string;
//   Category: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Seats: number;
//   Fee_Stipend_Year_1: number;
//   Bond_Years: number;
//   Bond_Penalty: number;
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
//   Institute_Type?: string;
// }

// interface ColumnVisibility {
//   Round: boolean;
//   Quota: boolean;
//   Category: boolean;
//   State: boolean;
//   Institute: boolean;
//   Course: boolean;
//   Seats: boolean;
//   Fee_Stipend_Year_1: boolean;
//   Bond_Years: boolean;
//   Bond_Penalty: boolean;
//   Beds: boolean;
//   CR_2023_1: boolean;
//   CR_2023_2: boolean;
//   CR_2023_3: boolean;
//   CR_2023_4: boolean;
//   CR_2023_5: boolean;
//   CR_2024_1: boolean;
//   CR_2024_2: boolean;
//   CR_2024_3: boolean;
//   CR_2024_4: boolean;
//   CR_2024_5: boolean;
//   actions: boolean;
// }

// /**
//  * Enhanced Seat Matrix Page Component
//  * Features sidebar navigation and comprehensive seat matrix data
//  */
// const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
//   const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
  
//   // Search and filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedQuota, setSelectedQuota] = useState("all");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedRound, setSelectedRound] = useState("all");
//   const [selectedState, setSelectedState] = useState("all");
//   const [selectedInstitute, setSelectedInstitute] = useState("all");
//   const [selectedCourse, setSelectedCourse] = useState("all");
//   const [selectedInstituteType, setSelectedInstituteType] = useState("all"); // New filter
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

//   // Column visibility state
//   const [showColumnVisibility, setShowColumnVisibility] = useState(false);
//   const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
//     Round: true,
//     Quota: true,
//     Category: true,
//     State: true,
//     Institute: true,
//     Course: true,
//     Seats: true,
//     Fee_Stipend_Year_1: true,
//     Bond_Years: true,
//     Bond_Penalty: true,
//     Beds: true,
//     CR_2023_1: true,
//     CR_2023_2: true,
//     CR_2023_3: true,
//     CR_2023_4: true,
//     CR_2023_5: true,
//     CR_2024_1: true,
//     CR_2024_2: true,
//     CR_2024_3: true,
//     CR_2024_4: true,
//     CR_2024_5: true,
//     actions: true,
//   });

//   // Column definitions for easier management
//   const columnDefinitions = [
//     { key: 'Round' as keyof ColumnVisibility, label: 'Round' },
//     { key: 'Quota' as keyof ColumnVisibility, label: 'Quota' },
//     { key: 'Category' as keyof ColumnVisibility, label: 'Category' },
//     { key: 'State' as keyof ColumnVisibility, label: 'State' },
//     { key: 'Institute' as keyof ColumnVisibility, label: 'Institute' },
//     { key: 'Course' as keyof ColumnVisibility, label: 'Course' },
//     { key: 'Seats' as keyof ColumnVisibility, label: 'Seats' },
//     { key: 'Fee_Stipend_Year_1' as keyof ColumnVisibility, label: 'Fee/Stipend Year 1' },
//     { key: 'Bond_Years' as keyof ColumnVisibility, label: 'Bond Years' },
//     { key: 'Bond_Penalty' as keyof ColumnVisibility, label: 'Bond Penalty' },
//     { key: 'Beds' as keyof ColumnVisibility, label: 'Beds' },
//     { key: 'CR_2023_1' as keyof ColumnVisibility, label: 'CR 2023-1' },
//     { key: 'CR_2023_2' as keyof ColumnVisibility, label: 'CR 2023-2' },
//     { key: 'CR_2023_3' as keyof ColumnVisibility, label: 'CR 2023-3' },
//     { key: 'CR_2023_4' as keyof ColumnVisibility, label: 'CR 2023-4' },
//     { key: 'CR_2023_5' as keyof ColumnVisibility, label: 'CR 2023-5' },
//     { key: 'CR_2024_1' as keyof ColumnVisibility, label: 'CR 2024-1' },
//     { key: 'CR_2024_2' as keyof ColumnVisibility, label: 'CR 2024-2' },
//     { key: 'CR_2024_3' as keyof ColumnVisibility, label: 'CR 2024-3' },
//     { key: 'CR_2024_4' as keyof ColumnVisibility, label: 'CR 2024-4' },
//     { key: 'CR_2024_5' as keyof ColumnVisibility, label: 'CR 2024-5' },
//     { key: 'actions' as keyof ColumnVisibility, label: 'Actions' },
//   ];

//   const counsellingOptions = [
//     { name: "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)", state: "Delhi" },
//     { name: "Goa - PG Medical", state: "Goa" },
//     { name: "Gujarat - PG Medical", state: "Gujarat" }, 
//     { name: "Haryana - PG Medical", state: "Haryana" },
//     { name: "Himachal Pradesh - PG Medical", state: "Himachal Pradesh" },
//     { name: "Jammu and Kashmir - PG Medical", state: "Jammu and Kashmir" },
//     { name: "Jharkhand - PG Medical", state: "Jharkhand" },
//     { name: "Karnataka - PG Medical", state: "Karnataka" },
//     { name: "Kerala - PG Medical", state: "Kerala" },
//     { name: "Madhya Pradesh - PG Medical", state: "Madhya Pradesh" },
//     { name: "Maharashtra - PG Medical", state: "Maharashtra" },
//     { name: "Manipur-JNIMS - PG Medical", state: "Manipur" },
//     { name: "Manipur-RIMS - PG Medical", state: "Manipur" },
//     { name: "NEIGRIHMS - PG Medical", state: "Delhi" },
//     { name: "Odisha - PG Medical", state: "Odisha" },
//     { name: "Pondicherry - PG Medical", state: "Pondicherry" },
//     { name: "Punjab - PG Medical", state: "Punjab" },
//     { name: "Rajasthan - PG Medical", state: "Rajasthan" },
//     { name: "Sikkim - PG Medical", state: "Sikkim" },
//     { name: "Tamil Nadu Government Quota - PG Medical", state: "Tamil Nadu" },
//     { name: "Tamil Nadu Management Quota - PG Medical", state: "Tamil Nadu" },
//     { name: "Telangana Government Quota - PG Medical", state: "Telangana" },
//     { name: "Telangana Management Quota - PG Medical", state: "Telangana" },
//     { name: "Tripura - PG Medical", state: "Tripura" },
//     { name: "Uttarakhand - PG Medical", state: "Uttarakhand" },
//     { name: "Uttar Pradesh - PG Medical", state: "Uttar Pradesh" },
//     { name: "West Bengal - PG Medical", state: "West Bengal" },
//   ];

//   // Toggle column visibility
//   const toggleColumn = (columnKey: keyof ColumnVisibility) => {
//     setColumnVisibility(prev => ({
//       ...prev,
//       [columnKey]: !prev[columnKey]
//     }));
//   };

//   // Show all columns
//   const showAllColumns = () => {
//     const allVisible = Object.keys(columnVisibility).reduce((acc, key) => {
//       acc[key as keyof ColumnVisibility] = true;
//       return acc;
//     }, {} as ColumnVisibility);
//     setColumnVisibility(allVisible);
//   };

//   // Hide all columns (but keep at least one visible)
//   const hideAllColumns = () => {
//     const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
//       acc[key as keyof ColumnVisibility] = key === 'Institute'; // Keep Institute visible
//       return acc;
//     }, {} as ColumnVisibility);
//     setColumnVisibility(allHidden);
//   };

//   // Get state based on counselling selection
//   const getStateFromCounselling = (counsellingName: string) => {
//     const counselling = counsellingOptions.find(opt => opt.name === counsellingName);
//     return counselling ? counselling.state : null;
//   };

//   // API fetch function
//   const fetchSeatMatrixFromAPI = async (params: { 
//     round?: string; 
//     category?: string; 
//     quota?: string; 
//     state?: string; 
//     institute?: string; 
//     course?: string; 
//     institute_type?: string;
//     page?: number 
//   }) => {
//     const queryParams = new URLSearchParams();
    
//     // Add state based on counselling selection
//     const counsellingState = getStateFromCounselling(selectedCounselling);
//     if (counsellingState) {
//       queryParams.append('state', counsellingState);
//     }
  
//     if (params.round && params.round !== "all") queryParams.append('round', params.round);
//     if (params.category && params.category !== "all") queryParams.append('category', params.category);
//     if (params.quota && params.quota !== "all") queryParams.append('quota', params.quota);
//     if (params.state && params.state !== "all" && !counsellingState) queryParams.append('state', params.state);
//     if (params.institute && params.institute !== "all") queryParams.append('institute', params.institute);
//     if (params.course && params.course !== "all") queryParams.append('course', params.course);
//     if (params.institute_type && params.institute_type !== "all") queryParams.append('institute_type', params.institute_type);
//     if (params.page) queryParams.append('page', params.page.toString());
//     queryParams.append('page_size', '70');  // Fixed page size
  
//     try {
//       console.log('Making API request with params:', queryParams.toString());
//       const response = await fetch(`https://backend-dju9.onrender.com/get-seatmatrix/?${queryParams.toString()}`);
      
//       if (!response.ok) {
//         console.error(`API returned status ${response.status}`);
//         return { results: [], count: 0 };
//       }
      
//       const data = await response.json();
//       console.log('API Response:', data);
      
//       // Map the API response to match the interface with "No Info Available" fallbacks
//       const mappedResults = data.results.map((item: any) => ({
//         Round: item.round || "No Info Available",
//         Quota: item.quota || "No Info Available",
//         Category: item.category || "No Info Available",
//         State: item.state || "No Info Available",
//         Institute: item.institute || "No Info Available",
//         Course: item.course || "No Info Available",
//         Seats: item.seats ? parseInt(item.seats) : 0,
//         Fee_Stipend_Year_1: item.fee_stipend_year_1 ? parseFloat(item.fee_stipend_year_1) : 0,
//         Bond_Years: item.bond_years ? parseInt(item.bond_years) : 0,
//         Bond_Penalty: item.bond_penalty ? parseFloat(item.bond_penalty) : 0,
//         Beds: item.beds ? parseInt(item.beds) : 0,
//         CR_2023_1: item.cr_2023_1 ? parseInt(item.cr_2023_1) : 0,
//         CR_2023_2: item.cr_2023_2 ? parseInt(item.cr_2023_2) : 0,
//         CR_2023_3: item.cr_2023_3 ? parseInt(item.cr_2023_3) : 0,
//         CR_2023_4: item.cr_2023_4 ? parseInt(item.cr_2023_4) : 0,
//         CR_2023_5: item.cr_2023_5 ? parseInt(item.cr_2023_5) : 0,
//         CR_2024_1: item.cr_2024_1 ? parseInt(item.cr_2024_1) : 0,
//         CR_2024_2: item.cr_2024_2 ? parseInt(item.cr_2024_2) : 0,
//         CR_2024_3: item.cr_2024_3 ? parseInt(item.cr_2024_3) : 0,
//         CR_2024_4: item.cr_2024_4 ? parseInt(item.cr_2024_4) : 0,
//         CR_2024_5: item.cr_2024_5 ? parseInt(item.cr_2024_5) : 0,
//         Institute_Type: item.institute_type || "No Info Available",
//       }));
      
//       return {
//         results: mappedResults,
//         count: data.count
//       };
//     } catch (error) {
//       console.error("Network error:", error);
//       return { results: [], count: 0 };
//     }
//   };

//   // Fetch data with API
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         console.log('Fetching data with filters:', {
//           round: selectedRound,
//           category: selectedCategory,
//           quota: selectedQuota,
//           state: selectedState,
//           institute: selectedInstitute,
//           course: selectedCourse,
//           institute_type: selectedInstituteType,
//           page: currentPage,
//           counselling: selectedCounselling
//         });

//         const data = await fetchSeatMatrixFromAPI({
//           round: selectedRound !== "all" ? selectedRound : undefined,
//           category: selectedCategory !== "all" ? selectedCategory : undefined,
//           quota: selectedQuota !== "all" ? selectedQuota : undefined,
//           state: selectedState !== "all" ? selectedState : undefined,
//           institute: selectedInstitute !== "all" ? selectedInstitute : undefined,
//           course: selectedCourse !== "all" ? selectedCourse : undefined,
//           institute_type: selectedInstituteType !== "all" ? selectedInstituteType : undefined,
//           page: currentPage,
//         });
  
//         console.log('Processed data:', data);
        
//         if (data && Array.isArray(data.results) && typeof data.count === "number") {
//           setSeatMatrixData(data.results);
//           setTotalCount(data.count);
//         } else {
//           console.error("Unexpected API response format:", data);
//           setSeatMatrixData([]);
//           setTotalCount(0);
//         }
//       } catch (error) {
//         console.error("Error fetching seat matrix data:", error);
//         setSeatMatrixData([]);
//         setTotalCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [
//     selectedRound,
//     selectedCategory,
//     selectedQuota,
//     selectedState,
//     selectedInstitute,
//     selectedCourse,
//     selectedInstituteType,
//     currentPage,
//     selectedCounselling
//   ]);

//   // Get unique values for filters from current data
//   const quotas = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Quota).filter(q => q !== "No Info Available")))];
//   const categories = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Category).filter(c => c !== "No Info Available")))];
//   const rounds = ["all", "Round 1", "Round 2", "Round 3", "Round 4", "Round 5"];
//   const states = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.State).filter(s => s !== "No Info Available")))];
//   const institutes = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Institute).filter(i => i !== "No Info Available")))];
//   const courses = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Course).filter(c => c !== "No Info Available")))];
//   const instituteTypes = ["all", "Government", "Private"];

//   // Client-side filtering for search term only
//   const filteredData = seatMatrixData.filter((item) => {
//     const matchesSearch = searchTerm === "" || 
//       item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
//     return matchesSearch;
//   });

//   const itemsPerPage = 70;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   // Clear all filters function
//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setSelectedCategory("all");
//     setSelectedQuota("all");
//     setSelectedRound("all");
//     setSelectedState("all");
//     setSelectedInstitute("all");
//     setSelectedCourse("all");
//     setSelectedInstituteType("all");
//     setCurrentPage(1);
//   };

//   // Helper function to display data with fallback
//   const displayValue = (value: any, fallback: string = "No Info Available") => {
//     if (value === null || value === undefined || value === "" || value === 0) {
//       return fallback;
//     }
//     return value;
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Seat Matrix Data...</p>
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

//       {/* Column Visibility Modal */}
//       {showColumnVisibility && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="text-lg font-semibold text-gray-900">Show/Hide Columns</h3>
//               <button
//                 onClick={() => setShowColumnVisibility(false)}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="p-4">
//               <div className="flex gap-2 mb-4">
//                 <button
//                   onClick={showAllColumns}
//                   className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
//                 >
//                   Show All
//                 </button>
//                 <button
//                   onClick={hideAllColumns}
//                   className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
//                 >
//                   Hide All
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
//                 {columnDefinitions.map(({ key, label }) => (
//                   <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
//                     <label className="flex items-center cursor-pointer flex-1">
//                       <input
//                         type="checkbox"
//                         checked={columnVisibility[key]}
//                         onChange={() => toggleColumn(key)}
//                         className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
//                       />
//                       <span className="ml-3 text-sm text-gray-700">{label}</span>
//                     </label>
//                     <div className="ml-2">
//                       {columnVisibility[key] ? (
//                         <Eye className="w-4 h-4 text-green-500" />
//                       ) : (
//                         <EyeOff className="w-4 h-4 text-gray-400" />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
//               <button
//                 onClick={() => setShowColumnVisibility(false)}
//                 className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//               >
//                 Apply Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Sidebar */}
//       {showSidebar && (
//         <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">NEET PG Seat Matrix</h2>
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
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {counsellingOptions.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setSelectedCounselling(option.name);
//                   setCurrentPage(1); // Reset to first page when changing counselling
//                 }}
//                 className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
//                   selectedCounselling === option.name ? "bg-purple-50 border-l-4 border-l-purple-500" : ""
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
//                     <BarChart3 className="w-3 h-3 text-gray-600" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm text-gray-700">{option.name}</span>
//                     <span className="text-xs text-gray-500">{option.state}</span>
//                   </div>
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
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
//                 <p className="text-xs text-purple-100">
//                   {getStateFromCounselling(selectedCounselling)} - 2024 Session Data
//                 </p>
//               </div>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-2">
//               <span className="text-xs text-purple-100">
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

//         {/* Round Filter Pills with Show/Hide Button */}
//          <div className="bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex items-center gap-2 overflow-x-auto">
//             {["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"].map((round) => (
//               <button
//                 key={round}
//                 onClick={() => {
//                   setSelectedRound(round);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
//                   selectedRound === round
//                     ? "bg-purple-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {round}
//               </button>
//             ))}

//             <button
//               onClick={() => {
//                 setSelectedRound("all");
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
//                 selectedRound === "all"
//                   ? "bg-pink-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               All Rounds
//             </button>

//             {/* Show/Hide Button */}
//             <button
//               onClick={() => setShowColumnVisibility(true)}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors ml-2"
//             >
//               <Eye className="w-4 h-4" />
//               Show/Hide
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
//                   className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                 />
//               </div>

//               {/* Quick Filters */}
//               <div className="flex gap-2 flex-wrap">
//                 <select
//                   value={selectedQuota}
//                   onChange={(e) => {
//                     setSelectedQuota(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {quotas.map((quota) => (
//                     <option key={quota} value={quota}>
//                       {quota === "all" ? "All Quotas" : quota}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category === "all" ? "All Categories" : category}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Institute Type Filter */}
//                 <select
//                   value={selectedInstituteType}
//                   onChange={(e) => {
//                     setSelectedInstituteType(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[120px]"
//                 >
//                   {instituteTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type === "all" ? "Government + Private" : type}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Advanced Filter Toggle */}
//                 <button
//                   onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//                   className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200"
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
//                   {/* Course Filter */}
//                   <select
//                     value={selectedCourse}
//                     onChange={(e) => {
//                       setSelectedCourse(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
//                   >
//                     {courses.map((course) => (
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
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
//                   >
//                     {institutes.slice(0, 50).map((institute) => (
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

//                   {/* Results Count */}
//                   <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
//                     <span className="font-medium text-purple-600">{filteredData.length}</span>
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
//                 {columnVisibility.Round && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Round</th>
//                 )}
//                 {columnVisibility.Quota && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
//                 )}
//                 {columnVisibility.Category && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
//                 )}
//                 {columnVisibility.State && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
//                 )}
//                 {columnVisibility.Institute && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
//                 )}
//                 {columnVisibility.Course && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
//                 )}
//                 {columnVisibility.Seats && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Seats</th>
//                 )}
//                 {columnVisibility.Fee_Stipend_Year_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee/Stipend Year 1</th>
//                 )}
//                 {columnVisibility.Bond_Years && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Years</th>
//                 )}
//                 {columnVisibility.Bond_Penalty && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Penalty</th>
//                 )}
//                 {columnVisibility.Beds && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
//                 )}
//                 {columnVisibility.CR_2023_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-1</th>
//                 )}
//                 {columnVisibility.CR_2023_2 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-2</th>
//                 )}
//                 {columnVisibility.CR_2023_3 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-3</th>
//                 )}
//                 {columnVisibility.CR_2023_4 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-4</th>
//                 )}
//                 {columnVisibility.CR_2023_5 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-5</th>
//                 )}
//                 {columnVisibility.CR_2024_1 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-1</th>
//                 )}
//                 {columnVisibility.CR_2024_2 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-2</th>
//                 )}
//                 {columnVisibility.CR_2024_3 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-3</th>
//                 )}
//                 {columnVisibility.CR_2024_4 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-4</th>
//                 )}
//                 {columnVisibility.CR_2024_5 && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-5</th>
//                 )}
//                 {columnVisibility.actions && (
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {filteredData.length === 0 ? (
//                 <tr>
//                   <td colSpan={Object.values(columnVisibility).filter(Boolean).length} className="px-6 py-8 text-center text-gray-500">
//                     No data found. Try adjusting your filters.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredData.map((item, index) => (
//                   <tr key={index} className="hover:bg-purple-50 transition-colors">
//                     {columnVisibility.Round && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{displayValue(item.Round)}</td>
//                     )}
//                     {columnVisibility.Quota && (
//                       <td className="px-2 py-2 text-xs">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           item.Quota === "All India" ? "bg-green-100 text-green-800" :
//                           item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
//                           item.Quota === "Management" ? "bg-purple-100 text-purple-800" :
//                           item.Quota === "NRI" ? "bg-blue-100 text-blue-800" :
//                           item.Quota === "No Info Available" ? "bg-gray-100 text-gray-600" :
//                           "bg-gray-100 text-gray-800"
//                         }`}>
//                           {displayValue(item.Quota)}
//                         </span>
//                       </td>
//                     )}
//                     {columnVisibility.Category && (
//                       <td className="px-2 py-2 text-xs">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           item.Category === "General" ? "bg-blue-100 text-blue-800" :
//                           item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
//                           item.Category === "SC" ? "bg-red-100 text-red-800" :
//                           item.Category === "ST" ? "bg-green-100 text-green-800" :
//                           item.Category === "EWS" ? "bg-indigo-100 text-indigo-800" :
//                           item.Category === "No Info Available" ? "bg-gray-100 text-gray-600" :
//                           "bg-pink-100 text-pink-800"
//                         }`}>
//                           {displayValue(item.Category)}
//                         </span>
//                       </td>
//                     )}
//                     {columnVisibility.State && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{displayValue(item.State)}</td>
//                     )}
//                     {columnVisibility.Institute && (
//                       <td className="px-2 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
//                         {displayValue(item.Institute)}
//                       </td>
//                     )}
//                     {columnVisibility.Course && (
//                       <td className="px-2 py-2 text-xs text-gray-700">{displayValue(item.Course)}</td>
//                     )}
//                     {columnVisibility.Seats && (
//                       <td className="px-2 py-2 text-xs font-bold text-purple-600">
//                         {item.Seats === 0 ? "No Info Available" : item.Seats}
//                       </td>
//                     )}
//                     {columnVisibility.Fee_Stipend_Year_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.Fee_Stipend_Year_1 === 0 ? "No Info Available" : `₹${item.Fee_Stipend_Year_1.toLocaleString()}`}
//                       </td>
//                     )}
//                     {columnVisibility.Bond_Years && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.Bond_Years === 0 ? "No Info Available" : item.Bond_Years}
//                       </td>
//                     )}
//                     {columnVisibility.Bond_Penalty && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.Bond_Penalty === 0 ? "No Info Available" : `₹${item.Bond_Penalty.toLocaleString()}`}
//                       </td>
//                     )}
//                     {columnVisibility.Beds && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.Beds === 0 ? "No Info Available" : item.Beds}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2023_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2023_1 === 0 ? "No Info Available" : item.CR_2023_1}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2023_2 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2023_2 === 0 ? "No Info Available" : item.CR_2023_2}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2023_3 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2023_3 === 0 ? "No Info Available" : item.CR_2023_3}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2023_4 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2023_4 === 0 ? "No Info Available" : item.CR_2023_4}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2023_5 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2023_5 === 0 ? "No Info Available" : item.CR_2023_5}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2024_1 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2024_1 === 0 ? "No Info Available" : item.CR_2024_1}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2024_2 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2024_2 === 0 ? "No Info Available" : item.CR_2024_2}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2024_3 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2024_3 === 0 ? "No Info Available" : item.CR_2024_3}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2024_4 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2024_4 === 0 ? "No Info Available" : item.CR_2024_4}
//                       </td>
//                     )}
//                     {columnVisibility.CR_2024_5 && (
//                       <td className="px-2 py-2 text-xs text-gray-700">
//                         {item.CR_2024_5 === 0 ? "No Info Available" : item.CR_2024_5}
//                       </td>
//                     )}
//                     {columnVisibility.actions && (
//                       <td className="px-2 py-2">
//                         <button className="p-1 hover:bg-red-100 rounded transition-colors">
//                           <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
//                         </button>
//                       </td>
//                     )}
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
//                     // Show current page in the middle
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
//                           ? "bg-purple-500 text-white"
//                           : "border border-gray-300 text-black hover:bg-gray-50"
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

// export default SeatMatrixPage;

import React, { useState, useEffect } from "react";
import { ArrowLeft, BarChart3, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

interface SeatMatrixPageProps {
  onBack: () => void;
}

interface SeatMatrixData {
  Round: string;
  Quota: string;
  Category: string;
  State: string;
  Institute: string;
  Course: string;
  Seats: number;
  Fee_Stipend_Year_1: number;
  Bond_Years: number;
  Bond_Penalty: number;
  Beds: number;
  CR_2023_1: number;
  CR_2023_2: number;
  CR_2023_3: number;
  CR_2023_4: number;
  CR_2023_5: number;
  CR_2024_1: number;
  CR_2024_2: number;
  CR_2024_3: number;
  CR_2024_4: number;
  CR_2024_5: number;
  Institute_Type?: string;
}

interface ColumnVisibility {
  Round: boolean;
  Quota: boolean;
  Category: boolean;
  State: boolean;
  Institute: boolean;
  Course: boolean;
  Seats: boolean;
  Fee_Stipend_Year_1: boolean;
  Bond_Years: boolean;
  Bond_Penalty: boolean;
  Beds: boolean;
  CR_2023_1: boolean;
  CR_2023_2: boolean;
  CR_2023_3: boolean;
  CR_2023_4: boolean;
  CR_2023_5: boolean;
  CR_2024_1: boolean;
  CR_2024_2: boolean;
  CR_2024_3: boolean;
  CR_2024_4: boolean;
  CR_2024_5: boolean;
  actions: boolean;
}

/**
 * Enhanced Seat Matrix Page Component
 * Features sidebar navigation and comprehensive seat matrix data
 */
const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
  const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuota, setSelectedQuota] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRound, setSelectedRound] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedInstitute, setSelectedInstitute] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedInstituteType, setSelectedInstituteType] = useState("all"); // New filter
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Column visibility state
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    Round: true,
    Quota: true,
    Category: true,
    State: true,
    Institute: true,
    Course: true,
    Seats: true,
    Fee_Stipend_Year_1: true,
    Bond_Years: true,
    Bond_Penalty: true,
    Beds: true,
    CR_2023_1: true,
    CR_2023_2: true,
    CR_2023_3: true,
    CR_2023_4: true,
    CR_2023_5: true,
    CR_2024_1: true,
    CR_2024_2: true,
    CR_2024_3: true,
    CR_2024_4: true,
    CR_2024_5: true,
    actions: true,
  });

  // Column definitions for easier management
  const columnDefinitions = [
    { key: 'Round' as keyof ColumnVisibility, label: 'Round' },
    { key: 'Quota' as keyof ColumnVisibility, label: 'Quota' },
    { key: 'Category' as keyof ColumnVisibility, label: 'Category' },
    { key: 'State' as keyof ColumnVisibility, label: 'State' },
    { key: 'Institute' as keyof ColumnVisibility, label: 'Institute' },
    { key: 'Course' as keyof ColumnVisibility, label: 'Course' },
    { key: 'Seats' as keyof ColumnVisibility, label: 'Seats' },
    { key: 'Fee_Stipend_Year_1' as keyof ColumnVisibility, label: 'Fee/Stipend Year 1' },
    { key: 'Bond_Years' as keyof ColumnVisibility, label: 'Bond Years' },
    { key: 'Bond_Penalty' as keyof ColumnVisibility, label: 'Bond Penalty' },
    { key: 'Beds' as keyof ColumnVisibility, label: 'Beds' },
    { key: 'CR_2023_1' as keyof ColumnVisibility, label: 'CR 2023-1' },
    { key: 'CR_2023_2' as keyof ColumnVisibility, label: 'CR 2023-2' },
    { key: 'CR_2023_3' as keyof ColumnVisibility, label: 'CR 2023-3' },
    { key: 'CR_2023_4' as keyof ColumnVisibility, label: 'CR 2023-4' },
    { key: 'CR_2023_5' as keyof ColumnVisibility, label: 'CR 2023-5' },
    { key: 'CR_2024_1' as keyof ColumnVisibility, label: 'CR 2024-1' },
    { key: 'CR_2024_2' as keyof ColumnVisibility, label: 'CR 2024-2' },
    { key: 'CR_2024_3' as keyof ColumnVisibility, label: 'CR 2024-3' },
    { key: 'CR_2024_4' as keyof ColumnVisibility, label: 'CR 2024-4' },
    { key: 'CR_2024_5' as keyof ColumnVisibility, label: 'CR 2024-5' },
    { key: 'actions' as keyof ColumnVisibility, label: 'Actions' },
  ];

  const counsellingOptions = [
    { name: "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)", state: "Delhi" },
    { name: "Goa - PG Medical", state: "Goa" },
    { name: "Gujarat - PG Medical", state: "Gujarat" }, 
    { name: "Haryana - PG Medical", state: "Haryana" },
    { name: "Himachal Pradesh - PG Medical", state: "Himachal Pradesh" },
    { name: "Jammu and Kashmir - PG Medical", state: "Jammu and Kashmir" },
    { name: "Jharkhand - PG Medical", state: "Jharkhand" },
    { name: "Karnataka - PG Medical", state: "Karnataka" },
    { name: "Kerala - PG Medical", state: "Kerala" },
    { name: "Madhya Pradesh - PG Medical", state: "Madhya Pradesh" },
    { name: "Maharashtra - PG Medical", state: "Maharashtra" },
    { name: "Manipur-JNIMS - PG Medical", state: "Manipur" },
    { name: "Manipur-RIMS - PG Medical", state: "Manipur" },
    { name: "NEIGRIHMS - PG Medical", state: "Delhi" },
    { name: "Odisha - PG Medical", state: "Odisha" },
    { name: "Pondicherry - PG Medical", state: "Pondicherry" },
    { name: "Punjab - PG Medical", state: "Punjab" },
    { name: "Rajasthan - PG Medical", state: "Rajasthan" },
    { name: "Sikkim - PG Medical", state: "Sikkim" },
    { name: "Tamil Nadu Government Quota - PG Medical", state: "Tamil Nadu" },
    { name: "Tamil Nadu Management Quota - PG Medical", state: "Tamil Nadu" },
    { name: "Telangana Government Quota - PG Medical", state: "Telangana" },
    { name: "Telangana Management Quota - PG Medical", state: "Telangana" },
    { name: "Tripura - PG Medical", state: "Tripura" },
    { name: "Uttarakhand - PG Medical", state: "Uttarakhand" },
    { name: "Uttar Pradesh - PG Medical", state: "Uttar Pradesh" },
    { name: "West Bengal - PG Medical", state: "West Bengal" },
  ];

  // Toggle column visibility
  const toggleColumn = (columnKey: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  // Show all columns
  const showAllColumns = () => {
    const allVisible = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = true;
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allVisible);
  };

  // Hide all columns (but keep at least one visible)
  const hideAllColumns = () => {
    const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = key === 'Institute'; // Keep Institute visible
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  // Get state based on counselling selection
  const getStateFromCounselling = (counsellingName: string) => {
    const counselling = counsellingOptions.find(opt => opt.name === counsellingName);
    return counselling ? counselling.state : null;
  };

  // API fetch function
  const fetchSeatMatrixFromAPI = async (params: { 
    round?: string; 
    category?: string; 
    quota?: string; 
    state?: string; 
    institute?: string; 
    course?: string; 
    institute_type?: string;
    page?: number 
  }) => {
    const queryParams = new URLSearchParams();
    
    // Add state based on counselling selection
    const counsellingState = getStateFromCounselling(selectedCounselling);
    if (counsellingState) {
      queryParams.append('state', counsellingState);
    }
  
    if (params.round && params.round !== "all") queryParams.append('round', params.round);
    if (params.category && params.category !== "all") queryParams.append('category', params.category);
    if (params.quota && params.quota !== "all") queryParams.append('quota', params.quota);
    if (params.state && params.state !== "all" && !counsellingState) queryParams.append('state', params.state);
    if (params.institute && params.institute !== "all") queryParams.append('institute', params.institute);
    if (params.course && params.course !== "all") queryParams.append('course', params.course);
    if (params.institute_type && params.institute_type !== "all") queryParams.append('institute_type', params.institute_type);
    if (params.page) queryParams.append('page', params.page.toString());
    queryParams.append('page_size', '70');  // Fixed page size
  
    try {
      console.log('Making API request with params:', queryParams.toString());
      const response = await fetch(`https://backend-dju9.onrender.com/get-seatmatrix/?${queryParams.toString()}`);
      
      if (!response.ok) {
        console.error(`API returned status ${response.status}`);
        return { results: [], count: 0 };
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Map the API response to match the interface with "No Info Available" fallbacks
      const mappedResults = data.results.map((item: any) => ({
        Round: item.round || "No Info Available",
        Quota: item.quota || "No Info Available",
        Category: item.category || "No Info Available",
        State: item.state || "No Info Available",
        Institute: item.institute || "No Info Available",
        Course: item.course || "No Info Available",
        Seats: item.seats ? parseInt(item.seats) : 0,
        Fee_Stipend_Year_1: item.fee_stipend_year_1 ? parseFloat(item.fee_stipend_year_1) : 0,
        Bond_Years: item.bond_years ? parseInt(item.bond_years) : 0,
        Bond_Penalty: item.bond_penalty ? parseFloat(item.bond_penalty) : 0,
        Beds: item.beds ? parseInt(item.beds) : 0,
        CR_2023_1: item.cr_2023_1 ? parseInt(item.cr_2023_1) : 0,
        CR_2023_2: item.cr_2023_2 ? parseInt(item.cr_2023_2) : 0,
        CR_2023_3: item.cr_2023_3 ? parseInt(item.cr_2023_3) : 0,
        CR_2023_4: item.cr_2023_4 ? parseInt(item.cr_2023_4) : 0,
        CR_2023_5: item.cr_2023_5 ? parseInt(item.cr_2023_5) : 0,
        CR_2024_1: item.cr_2024_1 ? parseInt(item.cr_2024_1) : 0,
        CR_2024_2: item.cr_2024_2 ? parseInt(item.cr_2024_2) : 0,
        CR_2024_3: item.cr_2024_3 ? parseInt(item.cr_2024_3) : 0,
        CR_2024_4: item.cr_2024_4 ? parseInt(item.cr_2024_4) : 0,
        CR_2024_5: item.cr_2024_5 ? parseInt(item.cr_2024_5) : 0,
        Institute_Type: item.institute_type || "No Info Available",
      }));
      
      return {
        results: mappedResults,
        count: data.count
      };
    } catch (error) {
      console.error("Network error:", error);
      return { results: [], count: 0 };
    }
  };

  // Fetch data with API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('Fetching data with filters:', {
          round: selectedRound,
          category: selectedCategory,
          quota: selectedQuota,
          state: selectedState,
          institute: selectedInstitute,
          course: selectedCourse,
          institute_type: selectedInstituteType,
          page: currentPage,
          counselling: selectedCounselling
        });

        const data = await fetchSeatMatrixFromAPI({
          round: selectedRound !== "all" ? selectedRound : undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          quota: selectedQuota !== "all" ? selectedQuota : undefined,
          state: selectedState !== "all" ? selectedState : undefined,
          institute: selectedInstitute !== "all" ? selectedInstitute : undefined,
          course: selectedCourse !== "all" ? selectedCourse : undefined,
          institute_type: selectedInstituteType !== "all" ? selectedInstituteType : undefined,
          page: currentPage,
        });
  
        console.log('Processed data:', data);
        
        if (data && Array.isArray(data.results) && typeof data.count === "number") {
          setSeatMatrixData(data.results);
          setTotalCount(data.count);
        } else {
          console.error("Unexpected API response format:", data);
          setSeatMatrixData([]);
          setTotalCount(0);
        }
      } catch (error) {
        console.error("Error fetching seat matrix data:", error);
        setSeatMatrixData([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [
    selectedRound,
    selectedCategory,
    selectedQuota,
    selectedState,
    selectedInstitute,
    selectedCourse,
    selectedInstituteType,
    currentPage,
    selectedCounselling
  ]);

  // Get unique values for filters from current data
  const quotas = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Quota).filter(q => q !== "No Info Available")))];
  const categories = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Category).filter(c => c !== "No Info Available")))];
  const rounds = ["all", "Round 1", "Round 2", "Round 3", "Round 4", "Round 5"];
  const states = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.State).filter(s => s !== "No Info Available")))];
  const institutes = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Institute).filter(i => i !== "No Info Available")))];
  const courses = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Course).filter(c => c !== "No Info Available")))];
  const instituteTypes = ["all", "Government", "Private"];

  // Client-side filtering for search term only
  const filteredData = seatMatrixData.filter((item) => {
    const matchesSearch = searchTerm === "" || 
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const itemsPerPage = 70;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Clear all filters function
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedQuota("all");
    setSelectedRound("all");
    setSelectedState("all");
    setSelectedInstitute("all");
    setSelectedCourse("all");
    setSelectedInstituteType("all");
    setCurrentPage(1);
  };

  // Helper function to display data with fallback
  const displayValue = (value: any, fallback: string = "No Info Available") => {
    if (value === null || value === undefined || value === "" || value === 0) {
      return fallback;
    }
    return value;
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Seat Matrix Data...</p>
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

      {/* Column Visibility Modal */}
      {showColumnVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Show/Hide Columns</h3>
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={showAllColumns}
                  className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Show All
                </button>
                <button
                  onClick={hideAllColumns}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Hide All
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {columnDefinitions.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <label className="flex items-center cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={columnVisibility[key]}
                        onChange={() => toggleColumn(key)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{label}</span>
                    </label>
                    <div className="ml-2">
                      {columnVisibility[key] ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">NEET PG Seat Matrix</h2>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {counsellingOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCounselling(option.name);
                  setCurrentPage(1); // Reset to first page when changing counselling
                }}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  selectedCounselling === option.name ? "bg-purple-50 border-l-4 border-l-purple-500" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-700">{option.name}</span>
                    <span className="text-xs text-gray-500">{option.state}</span>
                  </div>
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">NEET PG Seat Matrix</h1>
                <p className="text-xs text-purple-100">
                  {getStateFromCounselling(selectedCounselling)} - 2024 Session Data
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-purple-100">
                Page {currentPage} of {totalPages} • {totalCount} Total Records
              </span>
            </div>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Round Filter Pills with Show/Hide Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"].map((round) => (
              <button
                key={round}
                onClick={() => {
                  setSelectedRound(round);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedRound === round
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {round}
              </button>
            ))}

            <button
              onClick={() => {
                setSelectedRound("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedRound === "all"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Rounds
            </button>

            {/* Show/Hide Button */}
            <button
              onClick={() => setShowColumnVisibility(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors ml-2"
            >
              <Eye className="w-4 h-4" />
              Show/Hide
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="space-y-4">
            {/* Primary Search Row */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search institutes, courses, or states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <select
                  value={selectedQuota}
                  onChange={(e) => {
                    setSelectedQuota(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[120px]"
                >
                  {quotas.map((quota) => (
                    <option key={quota} value={quota}>
                      {quota === "all" ? "All Quotas" : quota}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[120px]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>

                {/* Institute Type Filter */}
                <select
                  value={selectedInstituteType}
                  onChange={(e) => {
                    setSelectedInstituteType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[120px]"
                >
                  {instituteTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "all" ? "Government + Private" : type}
                    </option>
                  ))}
                </select>

                {/* Advanced Filter Toggle */}
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200"
                >
                  <Filter className="w-4 h-4" />
                  {showAdvancedFilters ? "Hide" : "Show"} Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="space-y-3 border-t pt-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Course Filter */}
                  <select
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                  >
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course === "all" ? "All Courses" : course}
                      </option>
                    ))}
                  </select>

                  {/* Institute Filter */}
                  <select
                    value={selectedInstitute}
                    onChange={(e) => {
                      setSelectedInstitute(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                  >
                    {institutes.slice(0, 50).map((institute) => (
                      <option key={institute} value={institute}>
                        {institute === "all" ? "All Institutes" : institute}
                      </option>
                    ))}
                  </select>

                  {/* Clear Filters Button */}
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>

                  {/* Results Count */}
                  <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-medium text-purple-600">{filteredData.length}</span>
                    <span className="ml-1">filtered</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
              <tr>
                {columnVisibility.Round && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Round</th>
                )}
                {columnVisibility.Quota && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
                )}
                {columnVisibility.Category && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                )}
                {columnVisibility.State && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                )}
                {columnVisibility.Institute && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
                )}
                {columnVisibility.Course && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                )}
                {columnVisibility.Seats && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Seats</th>
                )}
                {columnVisibility.Fee_Stipend_Year_1 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee/Stipend Year 1</th>
                )}
                {columnVisibility.Bond_Years && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Years</th>
                )}
                {columnVisibility.Bond_Penalty && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond Penalty</th>
                )}
                {columnVisibility.Beds && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
                )}
                {columnVisibility.CR_2023_1 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-1</th>
                )}
                {columnVisibility.CR_2023_2 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-2</th>
                )}
                {columnVisibility.CR_2023_3 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-3</th>
                )}
                {columnVisibility.CR_2023_4 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-4</th>
                )}
                {columnVisibility.CR_2023_5 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2023-5</th>
                )}
                {columnVisibility.CR_2024_1 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-1</th>
                )}
                {columnVisibility.CR_2024_2 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-2</th>
                )}
                {columnVisibility.CR_2024_3 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-3</th>
                )}
                {columnVisibility.CR_2024_4 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-4</th>
                )}
                {columnVisibility.CR_2024_5 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024-5</th>
                )}
                {columnVisibility.actions && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={Object.values(columnVisibility).filter(Boolean).length} className="px-6 py-8 text-center text-gray-500">
                    No data found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-purple-50 transition-colors">
                    {columnVisibility.Round && (
                      <td className="px-2 py-2 text-xs text-gray-700">{displayValue(item.Round)}</td>
                    )}
                    {columnVisibility.Quota && (
                      <td className="px-2 py-2 text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.Quota === "All India" ? "bg-green-100 text-green-800" :
                          item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
                          item.Quota === "Management" ? "bg-purple-100 text-purple-800" :
                          item.Quota === "NRI" ? "bg-blue-100 text-blue-800" :
                          item.Quota === "No Info Available" ? "bg-gray-100 text-gray-600" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {displayValue(item.Quota)}
                        </span>
                      </td>
                    )}
                    {columnVisibility.Category && (
                      <td className="px-2 py-2 text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.Category === "General" ? "bg-blue-100 text-blue-800" :
                          item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
                          item.Category === "SC" ? "bg-red-100 text-red-800" :
                          item.Category === "ST" ? "bg-green-100 text-green-800" :
                          item.Category === "EWS" ? "bg-indigo-100 text-indigo-800" :
                          item.Category === "No Info Available" ? "bg-gray-100 text-gray-600" :
                          "bg-pink-100 text-pink-800"
                        }`}>
                          {displayValue(item.Category)}
                        </span>
                      </td>
                    )}
                    {columnVisibility.State && (
                      <td className="px-2 py-2 text-xs text-gray-700">{displayValue(item.State)}</td>
                    )}
                    {columnVisibility.Institute && (
                      <td className="px-2 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
                        {displayValue(item.Institute)}
                      </td>
                    )}
                    {columnVisibility.Course && (
                      <td className="px-2 py-2 text-xs text-gray-700">{displayValue(item.Course)}</td>
                    )}
                    {columnVisibility.Seats && (
                      <td className="px-2 py-2 text-xs font-bold text-purple-600">
                        {item.Seats === 0 ? "No Info Available" : item.Seats}
                      </td>
                    )}
                    {columnVisibility.Fee_Stipend_Year_1 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.Fee_Stipend_Year_1 === 0 ? "No Info Available" : `₹${item.Fee_Stipend_Year_1.toLocaleString()}`}
                      </td>
                    )}
                    {columnVisibility.Bond_Years && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.Bond_Years === 0 ? "No Info Available" : item.Bond_Years}
                      </td>
                    )}
                    {columnVisibility.Bond_Penalty && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.Bond_Penalty === 0 ? "No Info Available" : `₹${item.Bond_Penalty.toLocaleString()}`}
                      </td>
                    )}
                    {columnVisibility.Beds && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.Beds === 0 ? "No Info Available" : item.Beds}
                      </td>
                    )}
                    {columnVisibility.CR_2023_1 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_1 === 0 ? "No Info Available" : item.CR_2023_1}
                      </td>
                    )}
                    {columnVisibility.CR_2023_2 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_2 === 0 ? "No Info Available" : item.CR_2023_2}
                      </td>
                    )}
                    {columnVisibility.CR_2023_3 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_3 === 0 ? "No Info Available" : item.CR_2023_3}
                      </td>
                    )}
                    {columnVisibility.CR_2023_4 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_4 === 0 ? "No Info Available" : item.CR_2023_4}
                      </td>
                    )}
                    {columnVisibility.CR_2023_5 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_5 === 0 ? "No Info Available" : item.CR_2023_5}
                      </td>
                    )}
                    {columnVisibility.CR_2024_1 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_1 === 0 ? "No Info Available" : item.CR_2024_1}
                      </td>
                    )}
                    {columnVisibility.CR_2024_2 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_2 === 0 ? "No Info Available" : item.CR_2024_2}
                      </td>
                    )}
                    {columnVisibility.CR_2024_3 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_3 === 0 ? "No Info Available" : item.CR_2024_3}
                      </td>
                    )}
                    {columnVisibility.CR_2024_4 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_4 === 0 ? "No Info Available" : item.CR_2024_4}
                      </td>
                    )}
                    {columnVisibility.CR_2024_5 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_5 === 0 ? "No Info Available" : item.CR_2024_5}
                      </td>
                    )}
                    {columnVisibility.actions && (
                      <td className="px-2 py-2">
                        <button className="p-1 hover:bg-red-100 rounded transition-colors">
                          <Heart className="w-3 h-3 text-gray-400 hover:text-red-500" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {totalCount > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
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
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else {
                    // Show current page in the middle
                    const start = Math.max(1, currentPage - 2);
                    pageNum = start + i;
                    if (pageNum > totalPages) return null;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        currentPage === pageNum
                          ? "bg-purple-500 text-white"
                          : "border border-gray-300 text-black hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
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

export default SeatMatrixPage;