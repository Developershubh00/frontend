
                    
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
    stipend: true,
    bond_years: true,
    bond_penalty: true,
    beds: true,
    cr_2023_1: true,
    cr_2023_2: true,
    cr_2023_3: true,
    cr_2023_4: true,
    cr_2023_5: true,
    cr_2024_1: true,
    cr_2024_2: true,
    cr_2024_3: true,
    cr_2024_4: true,
    cr_2024_5: true,
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
      const response = await fetch(`https://backend-fiwg.onrender.com/get-closingranks/?${queryParams.toString()}`);
      
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
      const response = await fetch(`https://backend-fiwg.onrender.com/get-closingranks/?category_type=${categoryType}&page_size=1000`);
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
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-3">
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
                <p className="text-xs text-blue-100">2024 Session Data</p>
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
                      ? "bg-blue-500 text-white"
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
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
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
              className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
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
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  {columnVisibility.quota && (
                    <td className="px-2 py-2 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.quota === "All India" ? "bg-blue-100 text-blue-800" :
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
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {item.category}
                      </span>
                    </td>
                  )}
                  {columnVisibility.state && <td className="px-2 py-2 text-xs text-gray-700">{item.state}</td>}
                  {columnVisibility.institute && <td className="px-2 py-2 text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">{item.institute}</td>}
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
                  {columnVisibility.cr_2024_1 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2024_1 || '-'}</td>}
                  {columnVisibility.cr_2024_2 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2024_2 || '-'}</td>}
                  {columnVisibility.cr_2024_3 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2024_3 || '-'}</td>}
                  {columnVisibility.cr_2024_4 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2024_4 || '-'}</td>}
                  {columnVisibility.cr_2024_5 && <td className="px-2 py-2 text-xs font-bold text-blue-600">{item.cr_2024_5 || '-'}</td>}
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
                          ? "bg-blue-500 text-white"
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