import React, { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { closingRanksAPI } from "../services/api";

interface ClosingRanksPageProps {
  onBack: () => void;
}

interface ClosingRankData {
  Quota: string;
  Category: string;
  State: string;
  Institute: string;
  Course: string;
  Fee: string;
  Stipend_Year_1: string;
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

/**
 * Enhanced Closing Ranks Page Component
 * Features sidebar navigation and comprehensive closing ranks data
 */
const ClosingRanksPage: React.FC<ClosingRanksPageProps> = ({ onBack }) => {
  const [closingRankData, setClosingRankData] = useState<ClosingRankData[]>([]);
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

  // Generate dummy data for demonstration
  const generateDummyData = (counselling: string, exam: "UG" | "PG"): ClosingRankData[] => {
    const dummyData: ClosingRankData[] = [];
    const institutes = [
      "AIIMS New Delhi", "PGIMER Chandigarh", "JIPMER Puducherry", "CMC Vellore",
      "NIMHANS Bangalore", "SGPGIMS Lucknow", "KGMU Lucknow", "BHU Varanasi"
    ];
    const courses = exam === "UG" 
      ? ["MBBS", "BDS", "BAMS", "BHMS"]
      : ["MD General Medicine", "MD Pediatrics", "MD Psychiatry", "MS General Surgery"];
    const categories = ["GEN", "OBC", "SC", "ST", "EWS"];
    const quotas = ["All India", "State Quota", "Management"];

    for (let i = 0; i < 150; i++) {
      dummyData.push({
        Quota: quotas[Math.floor(Math.random() * quotas.length)],
        Category: categories[Math.floor(Math.random() * categories.length)],
        State: counselling.includes("Delhi") ? "Delhi" : counselling.includes("Maharashtra") ? "Maharashtra" : "Various",
        Institute: institutes[Math.floor(Math.random() * institutes.length)],
        Course: courses[Math.floor(Math.random() * courses.length)],
        Fee: `₹${Math.floor(Math.random() * 500000) + 50000}`,
        Stipend_Year_1: `₹${Math.floor(Math.random() * 100000) + 50000}`,
        Bond_Years: Math.floor(Math.random() * 5),
        Bond_Penalty: `₹${Math.floor(Math.random() * 1000000) + 500000}`,
        Beds: Math.floor(Math.random() * 1000) + 100,
        CR_2023_1: Math.floor(Math.random() * 50000) + 1000,
        CR_2023_2: Math.floor(Math.random() * 50000) + 1000,
        CR_2023_3: Math.floor(Math.random() * 50000) + 1000,
        CR_2023_4: Math.floor(Math.random() * 50000) + 1000,
        CR_2023_5: Math.floor(Math.random() * 50000) + 1000,
        CR_2024_1: Math.floor(Math.random() * 50000) + 1000,
        CR_2024_2: Math.floor(Math.random() * 50000) + 1000,
        CR_2024_3: Math.floor(Math.random() * 50000) + 1000,
        CR_2024_4: Math.floor(Math.random() * 50000) + 1000,
        CR_2024_5: Math.floor(Math.random() * 50000) + 1000,
      });
    }
    return dummyData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with dummy data
        const dummyData = generateDummyData(selectedCounselling, "PG");
        setClosingRankData(dummyData);
      } catch (error) {
        console.error("Error fetching closing ranks data:", error);
        setClosingRankData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCounselling]);

  // Filter data based on search and filters
  const filteredData = closingRankData.filter((item) => {
    const matchesSearch = searchTerm === "" || 
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.Category === selectedCategory;
    const matchesQuota = selectedQuota === "all" || item.Quota === selectedQuota;
    
    return matchesSearch && matchesCategory && matchesQuota;
  });

  // Sort data in ascending order by CR 2024 1
  const sortedData = [...filteredData].sort((a, b) => a.CR_2024_1 - b.CR_2024_1);

  const itemsPerPage = 25; // Reduced for better mobile view
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Get unique values for filters
  const categories = ["all", ...Array.from(new Set(closingRankData.map(item => item.Category)))];
  const quotas = ["all", ...Array.from(new Set(closingRankData.map(item => item.Quota)))];

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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
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
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 1</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 2</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CR 2024 3</th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-green-50 transition-colors">
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
                  <td className="px-2 py-2 text-xs text-gray-700">{item.State}</td>
                  <td className="px-2 py-2 text-xs text-green-600 hover:text-green-800 cursor-pointer font-medium">
                    {item.Institute}
                  </td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Course}</td>
                  <td className="px-2 py-2 text-xs font-medium text-gray-900">{item.Fee}</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Stipend_Year_1}</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Bond_Years} yrs</td>
                  <td className="px-2 py-2 text-xs text-gray-700">{item.Beds}</td>
                  <td className="px-2 py-2 text-xs font-bold text-green-600">{item.CR_2024_1.toLocaleString()}</td>
                  <td className="px-2 py-2 text-xs font-bold text-green-600">{item.CR_2024_2.toLocaleString()}</td>
                  <td className="px-2 py-2 text-xs font-bold text-green-600">{item.CR_2024_3.toLocaleString()}</td>
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
                          ? "bg-green-500 text-white"
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

export default ClosingRanksPage;