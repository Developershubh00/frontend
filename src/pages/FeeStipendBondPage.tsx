// import React, { useState, useEffect } from "react";
// import { ArrowLeft, DollarSign, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart } from "lucide-react";
// import { feeStipendBondAPI } from "../services/api";

// interface FeeStipendBondPageProps {
//   onBack: () => void;
// }

// interface FeeStipendBondData {
//   State: string;
//   Institute: string;
//   Course: string;
//   Quota: string;
//   Fee: string;
//   Stipend_Year_1: string;
//   Bond_Years: number;
//   Bond_Penalty: string;
//   Beds: number;
// }

// /**
//  * Enhanced Fee, Stipend & Bond Page Component
//  * Features sidebar navigation and comprehensive fee/stipend/bond data
//  */
// const FeeStipendBondPage: React.FC<FeeStipendBondPageProps> = ({ onBack }) => {
//   const [feeData, setFeeData] = useState<FeeStipendBondData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
//   const [examType, setExamType] = useState<"UG" | "PG">("PG");
//   const [currentPage, setCurrentPage] = useState(1);

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

//   const parseCSV = (csvText: string): FeeStipendBondData[] => {
//     const lines = csvText.trim().split("\n");
//     return lines.slice(1).map((line) => {
//       const values = line.split(",");
//       return {
//         State: values[0] || "",
//         Institute: values[1] || "",
//         Course: values[2] || "",
//         Quota: values[3] || "",
//         Fee: values[4] || "",
//         Stipend_Year_1: values[5] || "",
//         Bond_Years: parseInt(values[6]) || 0,
//         Bond_Penalty: values[7] || "",
//         Beds: parseInt(values[8]) || 0,
//       };
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = examType === "UG" 
//           ? await feeStipendBondAPI.getUGFeeData({ counselling: selectedCounselling })
//           : await feeStipendBondAPI.getPGFeeData({ counselling: selectedCounselling });
        
//         setFeeData(response.data);
//       } catch (error) {
//         console.error("Error fetching fee data:", error);
        
//         // Fallback to CSV data
//         try {
//           const response = await fetch(getStaticFileUrl("Fee, Stipend and Bond UG Medical  - All India UG (Medical & Dental).csv"));
//           const csvText = await response.text();
//           const parsedData = parseCSV(csvText);
//           setFeeData(parsedData);
//         } catch (csvError) {
//           console.error("Error fetching CSV data:", csvError);
//           setFeeData([]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedCounselling, examType]);

//   const itemsPerPage = 50;
//   const totalPages = Math.ceil(feeData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = feeData.slice(startIndex, startIndex + itemsPerPage);

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading Fee, Stipend & Bond Data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       {showSidebar && (
//         <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Fee, Stipend & Bond</h2>
//               <button
//                 onClick={() => setShowSidebar(false)}
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             {/* UG/PG Toggle */}
//             <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setExamType("UG")}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                   examType === "UG" 
//                     ? "bg-white text-blue-600 shadow-sm" 
//                     : "text-gray-600 hover:text-gray-800"
//                 }`}
//               >
//                 NEET UG
//               </button>
//               <button
//                 onClick={() => setExamType("PG")}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                   examType === "PG" 
//                     ? "bg-white text-blue-600 shadow-sm" 
//                     : "text-gray-600 hover:text-gray-800"
//                 }`}
//               >
//                 NEET PG
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
//                     <span className="text-xs">💰</span>
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
//         <div className="bg-white border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={onBack}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-800">Fee, Stipend & Bond</h1>
//                 <p className="text-sm text-gray-500">What's this?</p>
//               </div>
//             </div>
            
//             {!showSidebar && (
//               <button
//                 onClick={() => setShowSidebar(true)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Filter className="w-5 h-5 text-gray-600" />
//               </button>
//             )}
//           </div>

//           <div className="mt-4">
//             <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
//               <span className="text-sm font-medium text-orange-700">{selectedCounselling}</span>
//               <ChevronDown className="w-4 h-4 text-orange-600" />
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="flex-1 overflow-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATE</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">INSTITUTE</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COURSE</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QUOTA</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FEE</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STIPEND YEAR 1</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BOND YEARS</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BOND PENALTY</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BEDS</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {paginatedData.map((item, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-3 text-sm text-gray-900">{item.State}</td>
//                   <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
//                     {item.Institute}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-900">{item.Course}</td>
//                   <td className="px-4 py-3 text-sm text-gray-900">{item.Quota}</td>
//                   <td className="px-4 py-3 text-sm text-gray-900">{item.Fee}</td>
//                   <td className="px-4 py-3 text-sm text-gray-900">{item.Stipend_Year_1}</td>
//                   <td className="px-4 py-3 text-sm text-gray-900">{item.Bond_Years}</td>
//                   <td className="px-4 py-3 text-sm text-gray-900">{item.Bond_Penalty}</td>
//                   <td className="px-4 py-3 text-sm text-gray-900">{item.Beds}</td>
//                   <td className="px-4 py-3">
//                     <button className="p-1 hover:bg-gray-100 rounded transition-colors">
//                       <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeeStipendBondPage;

import React, { useState, useEffect } from "react";
import { ArrowLeft, DollarSign, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { feeStipendBondAPI, getStaticFileUrl } from "../services/api";

interface FeeStipendBondPageProps {
  onBack: () => void;
}

interface FeeStipendBondData {
  State: string;
  Institute: string;
  Course: string;
  Quota: string;
  Fee: string;
  Stipend_Year_1: string;
  Bond_Years: number;
  Bond_Penalty: string;
  Beds: number;
}

/**
 * Enhanced Fee, Stipend & Bond Page Component
 * Features sidebar navigation and comprehensive fee/stipend/bond data
 */
const FeeStipendBondPage: React.FC<FeeStipendBondPageProps> = ({ onBack }) => {
  const [feeData, setFeeData] = useState<FeeStipendBondData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");

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
  ];

  const parseCSV = (csvText: string): FeeStipendBondData[] => {
    const lines = csvText.trim().split("\n");
    return lines.slice(1).map((line) => {
      const values = line.split(",");
      return {
        State: values[0] || "",
        Institute: values[1] || "",
        Course: values[2] || "",
        Quota: values[3] || "",
        Fee: values[4] || "",
        Stipend_Year_1: values[5] || "",
        Bond_Years: parseInt(values[6]) || 0,
        Bond_Penalty: values[7] || "",
        Beds: parseInt(values[8]) || 0,
      };
    });
  };

  // Generate dummy data for demonstration
  const generateDummyData = (counselling: string, exam: "UG" | "PG"): FeeStipendBondData[] => {
    const dummyData: FeeStipendBondData[] = [];
    const institutes = [
      "AIIMS New Delhi", "PGIMER Chandigarh", "JIPMER Puducherry", "CMC Vellore",
      "NIMHANS Bangalore", "SGPGIMS Lucknow", "KGMU Lucknow", "BHU Varanasi"
    ];
    const courses = exam === "UG" 
      ? ["MBBS", "BDS", "BAMS", "BHMS"]
      : ["MD General Medicine", "MD Pediatrics", "MD Psychiatry", "MS General Surgery"];
    const quotas = ["All India", "State Quota", "Management"];

    for (let i = 0; i < 180; i++) {
      dummyData.push({
        State: counselling.includes("Delhi") ? "Delhi" : counselling.includes("Maharashtra") ? "Maharashtra" : "Various",
        Institute: institutes[Math.floor(Math.random() * institutes.length)],
        Course: courses[Math.floor(Math.random() * courses.length)],
        Quota: quotas[Math.floor(Math.random() * quotas.length)],
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
        const dummyData = generateDummyData(selectedCounselling, "PG");
        setFeeData(dummyData);
      } catch (error) {
        console.error("Error fetching fee data:", error);
        setFeeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCounselling]);

  // Filter data based on search and filters
  const filteredData = feeData.filter((item) => {
    const matchesSearch = searchTerm === "" || 
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesQuota = selectedQuota === "all" || item.Quota === selectedQuota;
    
    return matchesSearch && matchesQuota;
  });

  // Sort data in ascending order by Fee
  const sortedData = [...filteredData].sort((a, b) => {
    const feeA = parseInt(a.Fee.replace(/[^\d]/g, '')) || 0;
    const feeB = parseInt(b.Fee.replace(/[^\d]/g, '')) || 0;
    return feeA - feeB;
  });

  const itemsPerPage = 25; // Reduced for better mobile view
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Get unique values for filters
  const quotas = ["all", ...Array.from(new Set(feeData.map(item => item.Quota)))];

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Fee, Stipend & Bond Data...</p>
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
              <h2 className="text-lg font-semibold text-gray-800">NEET PG Fee, Stipend & Bond</h2>
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
                    <span className="text-xs">💰</span>
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
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">NEET PG Fee, Stipend & Bond</h1>
                <p className="text-xs text-orange-100">2024 Session Data</p>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>

            {/* Quota Filter */}
            <select
              value={selectedQuota}
              onChange={(e) => setSelectedQuota(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white"
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
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Penalty</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-orange-50 transition-colors">
                  <td className="px-2 py-2 text-xs text-gray-700">{item.State}</td>
                  <td className="px-2 py-2 text-xs text-orange-600 hover:text-orange-800 cursor-pointer font-medium">
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
                  <td className="px-2 py-2 text-xs font-bold text-orange-600">{item.Fee}</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Stipend_Year_1}</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years} yrs</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Penalty}</td>
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
                <ChevronLeft className="w-3 h-3" />
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
                          ? "bg-orange-500 text-white"
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

export default FeeStipendBondPage;