// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Users,
//   Building2,
//   MapPin,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Award,
//   Calendar,
// } from "lucide-react";

// interface AllotmentsPageProps {
//   onBack: () => void;
// }

// interface AllotmentData {
//   Institute_Name: string;
//   Institute_Type: string;
//   Course: string;
//   Quota: string;
//   Category: string;
//   Opening_Rank: number;
//   Closing_Rank: number;
//   Year: number;
//   Round: number;
//   State: string;
// }

// /**
//  * NEW COMMIT: Allotments Page Component
//  * Displays NEET UG allotment data with search and filter functionality
//  * CSV file: Neet_UG_Allotment_data_all-open_seats.csv
//  */
// const AllotmentsPage: React.FC<AllotmentsPageProps> = ({ onBack }) => {
//   const [allotmentData, setAllotmentData] = useState<AllotmentData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedState, setSelectedState] = useState("all");
//   const [selectedType, setSelectedType] = useState("all");

//   /**
//    * Parse CSV data into allotment objects
//    */
//   const parseCSV = (csvText: string): AllotmentData[] => {
//     const lines = csvText.trim().split("\n");
//     const headers = lines[0].split(",");

//     return lines.slice(1).map((line) => {
//       const values = line.split(",");
//       return {
//         Institute_Name: values[0] || "",
//         Institute_Type: values[1] || "",
//         Course: values[2] || "",
//         Quota: values[3] || "",
//         Category: values[4] || "",
//         Opening_Rank: parseInt(values[5]) || 0,
//         Closing_Rank: parseInt(values[6]) || 0,
//         Year: parseInt(values[7]) || 2024,
//         Round: parseInt(values[8]) || 1,
//         State: values[9] || "",
//       };
//     });
//   };

//   /**
//    * Fetch allotment data from CSV file
//    */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(getStaticFileUrl("Neet_UG_Allotment_data_all-open_seats.csv"));
//         const csvText = await response.text();
//         const parsedData = parseCSV(csvText);
//         setAllotmentData(parsedData);
//       } catch (error) {
//         console.error("Error fetching allotment data:", error);
//         // Fallback data for demonstration
//         setAllotmentData([
//           {
//             Institute_Name: "All India Institute of Medical Sciences, New Delhi",
//             Institute_Type: "Government",
//             Course: "MBBS",
//             Quota: "All India",
//             Category: "General",
//             Opening_Rank: 1,
//             Closing_Rank: 100,
//             Year: 2024,
//             Round: 1,
//             State: "Delhi",
//           },
//           {
//             Institute_Name: "Christian Medical College, Vellore",
//             Institute_Type: "Private",
//             Course: "MBBS",
//             Quota: "All India",
//             Category: "General",
//             Opening_Rank: 101,
//             Closing_Rank: 500,
//             Year: 2024,
//             Round: 1,
//             State: "Tamil Nadu",
//           },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   /**
//    * Filter allotment data based on search and filters
//    */
//   const filteredData = allotmentData.filter((item) => {
//     const matchesSearch =
//       item.Institute_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.State.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesState = selectedState === "all" || item.State === selectedState;
//     const matchesType = selectedType === "all" || item.Institute_Type === selectedType;
//     return matchesSearch && matchesState && matchesType;
//   });

//   // Get unique values for filters
//   const states = ["all", ...Array.from(new Set(allotmentData.map((item) => item.State)))];
//   const types = ["all", ...Array.from(new Set(allotmentData.map((item) => item.Institute_Type)))];

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Allotment Data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen">
//       {/* Header Section */}
//       <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={onBack}
//             className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-slate-600" />
//           </button>
//           <h1 className="text-xl font-bold text-slate-800">NEET UG Allotments</h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-8 h-8" />
//             </div>
//             <h2 className="text-3xl font-bold mb-4">NEET UG Seat Allotments</h2>
//             <p className="text-blue-100 text-lg">
//               Complete allotment data for medical colleges across India
//             </p>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search Bar */}
//             <div className="flex-1 relative">
//               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search institutes, courses, or states..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
//               />
//             </div>

//             {/* Filters */}
//             <div className="flex gap-4">
//               <select
//                 value={selectedState}
//                 onChange={(e) => setSelectedState(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {states.map((state) => (
//                   <option key={state} value={state}>
//                     {state === "all" ? "All States" : state}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {types.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Types" : type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {allotmentData.length}
//             </div>
//             <div className="text-slate-600 text-sm">Total Allotments</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Building2 className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {new Set(allotmentData.map((item) => item.Institute_Name)).size}
//             </div>
//             <div className="text-slate-600 text-sm">Institutes</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <MapPin className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {new Set(allotmentData.map((item) => item.State)).size}
//             </div>
//             <div className="text-slate-600 text-sm">States</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Award className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {allotmentData.filter((item) => item.Institute_Type === "Government").length}
//             </div>
//             <div className="text-slate-600 text-sm">Government Colleges</div>
//           </div>
//         </div>

//         {/* Allotment Data Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-slate-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold text-slate-800">Allotment Data</h3>
//               <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
//                 <Download className="w-4 h-4" />
//                 <span>Export Data</span>
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold">Institute</th>
//                   <th className="px-6 py-4 text-left font-semibold">Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Course</th>
//                   <th className="px-6 py-4 text-left font-semibold">State</th>
//                   <th className="px-6 py-4 text-left font-semibold">Opening Rank</th>
//                   <th className="px-6 py-4 text-left font-semibold">Closing Rank</th>
//                   <th className="px-6 py-4 text-left font-semibold">Category</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item, index) => (
//                   <tr
//                     key={index}
//                     className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
//                       index % 2 === 0 ? "bg-white/50" : "bg-slate-50/50"
//                     }`}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-slate-800 text-sm">
//                         {item.Institute_Name}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           item.Institute_Type === "Government"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-purple-100 text-purple-800"
//                         }`}
//                       >
//                         {item.Institute_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-slate-700">{item.Course}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-slate-700">{item.State}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="font-bold text-green-600">
//                         {item.Opening_Rank.toLocaleString()}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="font-bold text-red-600">
//                         {item.Closing_Rank.toLocaleString()}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//                         {item.Category}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* No Results Message */}
//         {filteredData.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-8 h-8 text-slate-500" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-800 mb-2">No data found</h3>
//             <p className="text-slate-600">Try adjusting your search terms or filters</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllotmentsPage;

import React, { useState, useEffect } from "react";
import { ArrowLeft, Users, Search, X, ChevronDown, Heart, ChevronLeft as PrevIcon, ChevronRight as NextIcon, Filter } from "lucide-react";
import { getStaticFileUrl } from "../services/api";

interface AllotmentsPageProps {
  onBack: () => void;
}

interface AllotmentData {
  Round: number;
  State_Rank: number;
  State: string;
  Institute: string;
  Course: string;
  Quota: string;
  Category: string;
  Fee: string;
  Stipend_Year_1: string;
  Bond_Years: number;
  Bond_Penalty: string;
  Beds: number;
}

/**
 * Enhanced Allotments Page Component
 * Features sidebar navigation and comprehensive allotment data
 * Focused on NEET PG Medical counselling
 */
const AllotmentsPage: React.FC<AllotmentsPageProps> = ({ onBack }) => {
  const [allotmentData, setAllotmentData] = useState<AllotmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCounselling, setSelectedCounselling] = useState("All India Counselling - PG Medical");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");

  // NEET PG Counselling categories
  const counsellingOptions = [
    "All India Counselling - PG Medical",
    "Armed Forces Medical Services - AFMS (through MCC) - PG Medical",
    "Open States (Private Institute seats available for all candidates)",
    "Andhra Pradesh Government Quota - PG Medical",
    "Andhra Pradesh Management Quota - PG Medical",
    "Assam - PG Medical",
    "Bihar - PG Medical",
    "Chandigarh - PG Medical",
    "Chhattisgarh - PG Medical",
    "Delhi - PG Medical",
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

  // Generate dummy data for demonstration
  const generateDummyData = (counselling: string): AllotmentData[] => {
    const dummyData: AllotmentData[] = [];
    const institutes = [
      "AIIMS New Delhi", "PGIMER Chandigarh", "JIPMER Puducherry", "CMC Vellore",
      "NIMHANS Bangalore", "SGPGIMS Lucknow", "KGMU Lucknow", "BHU Varanasi"
    ];
    const courses = [
      "MD General Medicine", "MD Pediatrics", "MD Psychiatry", "MS General Surgery",
      "MD Anesthesiology", "MD Radiology", "MD Pathology", "MS Orthopedics"
    ];
    const categories = ["GEN", "OBC", "SC", "ST", "EWS"];
    const quotas = ["All India", "State Quota", "Management"];

    for (let i = 0; i < 100; i++) {
      dummyData.push({
        Round: Math.floor(Math.random() * 3) + 1,
        State_Rank: Math.floor(Math.random() * 50000) + 1000,
        State: counselling.includes("Delhi") ? "Delhi" : counselling.includes("Maharashtra") ? "Maharashtra" : "Various",
        Institute: institutes[Math.floor(Math.random() * institutes.length)],
        Course: courses[Math.floor(Math.random() * courses.length)],
        Quota: quotas[Math.floor(Math.random() * quotas.length)],
        Category: categories[Math.floor(Math.random() * categories.length)],
        Fee: `₹${Math.floor(Math.random() * 500000) + 50000}`,
        Stipend_Year_1: `₹${Math.floor(Math.random() * 100000) + 50000}`,
        Bond_Years: Math.floor(Math.random() * 5),
        Bond_Penalty: `₹${Math.floor(Math.random() * 1000000) + 500000}`,
        Beds: Math.floor(Math.random() * 1000) + 100,
      });
    }
    return dummyData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with dummy data
        const dummyData = generateDummyData(selectedCounselling);
        setAllotmentData(dummyData);
      } catch (error) {
        console.error("Error fetching allotment data:", error);
        setAllotmentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCounselling]);

  // Filter data based on search and filters
  const filteredData = allotmentData.filter((item) => {
    const matchesSearch = searchTerm === "" || 
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.Category === selectedCategory;
    const matchesQuota = selectedQuota === "all" || item.Quota === selectedQuota;
    
    return matchesSearch && matchesCategory && matchesQuota;
  });

  // Sort data in ascending order
  const sortedData = [...filteredData].sort((a, b) => a.State_Rank - b.State_Rank);

  const itemsPerPage = 25; // Reduced for better mobile view
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Get unique values for filters
  const categories = ["all", ...Array.from(new Set(allotmentData.map(item => item.Category)))];
  const quotas = ["all", ...Array.from(new Set(allotmentData.map(item => item.Quota)))];

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading NEET PG Allotment Data...</p>
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

      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 md:relative md:z-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">NEET PG Allotments</h2>
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
                    <span className="text-xs">🏥</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">NEET PG Allotments</h1>
                <p className="text-xs text-blue-100">2024 Session Data</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-blue-100">
                {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} Records
              </span>
            </div>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search institutes, courses, or states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* Quota Filter */}
            <select
              value={selectedQuota}
              onChange={(e) => setSelectedQuota(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              {quotas.map((quota) => (
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
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Round</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rank</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-2 py-2 text-xs font-medium text-gray-900">{item.Round}</td>
                  <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.State_Rank.toLocaleString()}</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.State}</td>
                  <td className="px-2 py-2 text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                    {item.Institute}
                  </td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Course}</td>
                  <td className="px-2 py-2 text-xs">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.Quota === "All India" ? "bg-green-100 text-green-800" :
                      item.Quota === "State Quota" ? "bg-blue-100 text-blue-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {item.Quota}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-xs">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.Category === "GEN" ? "bg-gray-100 text-gray-800" :
                      item.Category === "OBC" ? "bg-yellow-100 text-yellow-800" :
                      item.Category === "SC" ? "bg-red-100 text-red-800" :
                      item.Category === "ST" ? "bg-orange-100 text-orange-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {item.Category}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-xs font-medium text-gray-900">{item.Fee}</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Stipend_Year_1}</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years} yrs</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Beds}</td>
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PrevIcon className="w-3 h-3" />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-500 text-white"
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
                <NextIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllotmentsPage;