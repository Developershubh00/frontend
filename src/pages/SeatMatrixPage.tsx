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

import React, { useState, useEffect } from "react";
import { ArrowLeft, BarChart3, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";
// Import PapaParse - make sure it's installed: npm install papaparse @types/papaparse
import Papa from 'papaparse';

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
  Fee_Stipend_Year_1: string;
  Bond_Years: number;
  Bond_Penalty: string;
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
}

interface Filters {
  searchTerm: string;
  selectedState: string;
  selectedRound: string;
  selectedQuota: string;
  selectedCategory: string;
}

/**
 * Enhanced Seat Matrix Page Component with CSV Data Fetching
 */
const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
  const [allSeatMatrixData, setAllSeatMatrixData] = useState<SeatMatrixData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    selectedState: "all",
    selectedRound: "all",
    selectedQuota: "all",
    selectedCategory: "all"
  });

  // Filter options derived from data
  const [filterOptions, setFilterOptions] = useState({
    states: [] as string[],
    rounds: [] as string[],
    quotas: [] as string[],
    categories: [] as string[]
  });

  const itemsPerPage = 50;

  // CSV file location - Updated to your specific path
  const csvFilePaths = [
    '/public/data/Seat_Matric.csv',
    '/data/Seat_Matric.csv',  // Your specified path
    '/data/Seat_Matrix.csv',  // Common alternative
    '/Seat_Matric.csv',  // If placed directly in public root
  ];

  // Fetch and parse CSV data with multiple fallback paths
  useEffect(() => {
    const tryFetchCSV = async (paths: string[], index = 0): Promise<void> => {
      if (index >= paths.length) {
        setError('CSV file not found at any of the expected locations. Please check if the file exists at: /data/Seat_Matric.csv');
        setLoading(false);
        return;
      }

      const currentPath = paths[index];
      
      try {
        setLoading(true);
        setError(null);

        console.log(`Trying to fetch CSV from: ${currentPath}`);
        
        // Fetch CSV file from public folder
        const response = await fetch(currentPath, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/csv',
          },
        });
        
        if (!response.ok) {
          console.warn(`Failed to fetch from ${currentPath}: ${response.status} ${response.statusText}`);
          // Try next path
          return tryFetchCSV(paths, index + 1);
        }

        const csvText = await response.text();
        
        if (!csvText || csvText.trim().length === 0) {
          console.warn(`Empty CSV file at ${currentPath}`);
          return tryFetchCSV(paths, index + 1);
        }

        console.log(`Successfully loaded CSV from: ${currentPath}`);
        console.log(`CSV file size: ${csvText.length} characters`);

        // Parse CSV using PapaParse
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false, // Keep as strings initially for better handling
          delimiter: ',',
          transformHeader: (header: string) => {
            // Transform headers to match interface (replace spaces with underscores)
            return header.trim().replace(/\s+/g, '_').replace(/[^\w]/g, '_');
          },
          complete: (results) => {
            console.log('CSV parsing completed:', {
              data: results.data.length,
              errors: results.errors.length,
              meta: results.meta
            });

            if (results.errors.length > 0) {
              console.warn('CSV parsing warnings:', results.errors);
            }

            if (!results.data || results.data.length === 0) {
              setError('CSV file is empty or could not be parsed.');
              setLoading(false);
              return;
            }

            const processedData = results.data
              .map((row: any, rowIndex: number) => {
                try {
                  return {
                    Round: String(row.Round || row.ROUND || '').trim(),
                    Quota: String(row.Quota || row.QUOTA || '').trim(),
                    Category: String(row.Category || row.CATEGORY || '').trim(),
                    State: String(row.State || row.STATE || '').trim(),
                    Institute: String(row.Institute || row.INSTITUTE || '').trim(),
                    Course: String(row.Course || row.COURSE || '').trim(),
                    Seats: parseInt(String(row.Seats || row.SEATS || '0').replace(/[^\d]/g, '')) || 0,
                    Fee_Stipend_Year_1: String(row.Fee_Stipend_Year_1 || row['Fee Stipend Year 1'] || row['Fee_Stipend_Year_1'] || '').trim(),
                    Bond_Years: parseInt(String(row.Bond_Years || row['Bond Years'] || '0').replace(/[^\d]/g, '')) || 0,
                    Bond_Penalty: String(row.Bond_Penalty || row['Bond Penalty'] || '').trim(),
                    Beds: parseInt(String(row.Beds || row.BEDS || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2023_1: parseInt(String(row.CR_2023_1 || row['CR 2023 1'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2023_2: parseInt(String(row.CR_2023_2 || row['CR 2023 2'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2023_3: parseInt(String(row.CR_2023_3 || row['CR 2023 3'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2023_4: parseInt(String(row.CR_2023_4 || row['CR 2023 4'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2023_5: parseInt(String(row.CR_2023_5 || row['CR 2023 5'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2024_1: parseInt(String(row.CR_2024_1 || row['CR 2024 1'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2024_2: parseInt(String(row.CR_2024_2 || row['CR 2024 2'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2024_3: parseInt(String(row.CR_2024_3 || row['CR 2024 3'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2024_4: parseInt(String(row.CR_2024_4 || row['CR 2024 4'] || '0').replace(/[^\d]/g, '')) || 0,
                    CR_2024_5: parseInt(String(row.CR_2024_5 || row['CR 2024 5'] || '0').replace(/[^\d]/g, '')) || 0,
                  };
                } catch (error) {
                  console.warn(`Error processing row ${rowIndex}:`, error);
                  return null;
                }
              })
              .filter((row): row is SeatMatrixData => 
                row !== null && 
                row.Institute && 
                row.Course && 
                row.State
              );

            console.log(`Processed ${processedData.length} valid records`);

            if (processedData.length === 0) {
              setError('No valid data found in CSV file. Please check the file format.');
              setLoading(false);
              return;
            }

            setAllSeatMatrixData(processedData);
            
            // Extract unique values for filter options
            setFilterOptions({
              states: ['all', ...Array.from(new Set(processedData.map(item => item.State).filter(Boolean))).sort()],
              rounds: ['all', ...Array.from(new Set(processedData.map(item => item.Round).filter(Boolean))).sort()],
              quotas: ['all', ...Array.from(new Set(processedData.map(item => item.Quota).filter(Boolean))).sort()],
              categories: ['all', ...Array.from(new Set(processedData.map(item => item.Category).filter(Boolean))).sort()]
            });

            setLoading(false);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
            // Try next path
            tryFetchCSV(paths, index + 1);
          }
        });

      } catch (error) {
        console.error(`Error fetching CSV from ${currentPath}:`, error);
        // Try next path
        tryFetchCSV(paths, index + 1);
      }
    };

    tryFetchCSV(csvFilePaths);
  }, []);

  // Filter and paginate data
  const getFilteredData = () => {
    return allSeatMatrixData.filter((item) => {
      const matchesSearch = filters.searchTerm === "" || 
        item.Institute.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.Course.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.State.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesState = filters.selectedState === "all" || item.State === filters.selectedState;
      const matchesRound = filters.selectedRound === "all" || item.Round === filters.selectedRound;
      const matchesQuota = filters.selectedQuota === "all" || item.Quota === filters.selectedQuota;
      const matchesCategory = filters.selectedCategory === "all" || item.Category === filters.selectedCategory;
      
      return matchesSearch && matchesState && matchesRound && matchesQuota && matchesCategory;
    });
  };

  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Seat Matrix Data...</p>
          <p className="text-xs text-slate-500 mt-2">Fetching from CSV file</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <p className="text-xs text-gray-500">
            Please check if the CSV file exists at: <code className="bg-gray-100 px-2 py-1 rounded">public/data/Seat_Matric.csv</code>
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
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

      {/* Sidebar with Filters */}
      {showSidebar && (
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institutes, courses..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="text-sm text-gray-600 mb-2">
              Total Records: <span className="font-semibold text-blue-600">{allSeatMatrixData.length}</span>
            </div>
          </div>

          {/* Filter Options */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={filters.selectedState}
                onChange={(e) => updateFilter('selectedState', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                {filterOptions.states.map((state) => (
                  <option key={state} value={state}>
                    {state === "all" ? "All States" : state}
                  </option>
                ))}
              </select>
            </div>

            {/* Round Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Round</label>
              <select
                value={filters.selectedRound}
                onChange={(e) => updateFilter('selectedRound', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                {filterOptions.rounds.map((round) => (
                  <option key={round} value={round}>
                    {round === "all" ? "All Rounds" : `Round ${round}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Quota Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quota</label>
              <select
                value={filters.selectedQuota}
                onChange={(e) => updateFilter('selectedQuota', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                {filterOptions.quotas.map((quota) => (
                  <option key={quota} value={quota}>
                    {quota === "all" ? "All Quotas" : quota}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.selectedCategory}
                onChange={(e) => updateFilter('selectedCategory', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                {filterOptions.categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({
                searchTerm: "",
                selectedState: "all",
                selectedRound: "all",
                selectedQuota: "all",
                selectedCategory: "all"
              })}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Clear All Filters
            </button>
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
                  Showing {filteredData.length} of {allSeatMatrixData.length} records
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {filters.selectedState !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                State: {filters.selectedState}
                <button 
                  onClick={() => updateFilter('selectedState', 'all')}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.selectedRound !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Round: {filters.selectedRound}
                <button 
                  onClick={() => updateFilter('selectedRound', 'all')}
                  className="ml-2 hover:text-green-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.selectedQuota !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Quota: {filters.selectedQuota}
                <button 
                  onClick={() => updateFilter('selectedQuota', 'all')}
                  className="ml-2 hover:text-purple-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.selectedCategory !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Category: {filters.selectedCategory}
                <button 
                  onClick={() => updateFilter('selectedCategory', 'all')}
                  className="ml-2 hover:text-orange-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Table - Fixed width with horizontal scroll */}
        <div className="flex-1 overflow-x-auto">
          <div className="min-w-[1400px]"> {/* Minimum width to fit all columns */}
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">Round</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[100px]">State</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[200px]">Institute</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">Course</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">Quota</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[90px]">Category</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[60px]">Seats</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[100px]">Fee/Stipend</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">Bond Years</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[60px]">Beds</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">CR 2023-1</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">CR 2023-2</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">CR 2024-1</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[80px]">CR 2024-2</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-purple-50 transition-colors">
                    <td className="px-3 py-2 text-xs">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {item.Round}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-700">{item.State}</td>
                    <td className="px-3 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
                      <div className="truncate max-w-[180px]" title={item.Institute}>
                        {item.Institute}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-700">
                      <div className="truncate max-w-[130px]" title={item.Course}>
                        {item.Course}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.Quota.includes("All India") ? "bg-green-100 text-green-800" :
                        item.Quota.includes("State") ? "bg-blue-100 text-blue-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        <div className="truncate max-w-[100px]" title={item.Quota}>
                          {item.Quota}
                        </div>
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.Category === "General" ? "bg-gray-100 text-gray-800" :
                        item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
                        item.Category === "SC" ? "bg-pink-100 text-pink-800" :
                        item.Category === "ST" ? "bg-teal-100 text-teal-800" :
                        "bg-orange-100 text-orange-800"
                      }`}>
                        {item.Category}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs font-bold text-purple-600">{item.Seats}</td>
                    <td className="px-3 py-2 text-xs text-gray-700">
                      <div className="truncate max-w-[80px]" title={item.Fee_Stipend_Year_1}>
                        {item.Fee_Stipend_Year_1}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-700">{item.Bond_Years || 0}</td>
                    <td className="px-3 py-2 text-xs text-gray-700">{item.Beds || 0}</td>
                    <td className="px-3 py-2 text-xs text-gray-700">{item.CR_2023_1 || '-'}</td>
                    <td className="px-3 py-2 text-xs text-gray-700">{item.CR_2023_2 || '-'}</td>
                    <td className="px-3 py-2 text-xs text-gray-700">{item.CR_2024_1 || '-'}</td>
                    <td className="px-3 py-2 text-xs text-gray-700">{item.CR_2024_2 || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedData.length === 0 && !loading && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No results found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
              {filteredData.length !== allSeatMatrixData.length && (
                <span className="text-blue-600"> (filtered from {allSeatMatrixData.length} total)</span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else {
                    const start = Math.max(1, currentPage - 2);
                    pageNum = start + i;
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        currentPage === pageNum
                          ? "bg-purple-500 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
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
                className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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