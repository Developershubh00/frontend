import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  X,
  ChevronDown,
  Heart,
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
  Filter,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

interface AllotmentsPageProps {
  onBack: () => void;
}

interface AllotmentData {
  id: number;
  Round: number;
  ai_rank: string;
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

interface ColumnVisibility {
  Round: boolean;
  ai_rank: boolean;
  State: boolean;
  Institute: boolean;
  Course: boolean;
  Quota: boolean;
  Category: boolean;
  Fee: boolean;
  Stipend_Year_1: boolean;
  Bond_Years: boolean;
  Beds: boolean;
  actions: boolean;
}

const AllotmentsUGPage: React.FC<AllotmentsPageProps> = ({ onBack }) => {
  const [allotmentData, setAllotmentData] = useState<AllotmentData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOptions, setFilterOptions] = useState({
    rounds: [] as number[],
    categories: [] as string[],
    quotas: [] as string[],
    states: [] as string[],
    courses: [] as string[],
  });
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Client-side filters
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");
  const [selectedRound, setSelectedRound] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Column visibility state
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    Round: true,
    ai_rank: true,
    State: true,
    Institute: true,
    Course: true,
    Quota: true,
    Category: true,
    Fee: true,
    Stipend_Year_1: true,
    Bond_Years: true,
    Beds: true,
    actions: true,
  });

  const columnDefinitions = [
    { key: "Round" as keyof ColumnVisibility, label: "Round" },
    { key: "ai_rank" as keyof ColumnVisibility, label: "AI Rank" },
    { key: "State" as keyof ColumnVisibility, label: "State" },
    { key: "Institute" as keyof ColumnVisibility, label: "Institute" },
    { key: "Course" as keyof ColumnVisibility, label: "Course" },
    { key: "Quota" as keyof ColumnVisibility, label: "Quota" },
    { key: "Category" as keyof ColumnVisibility, label: "Category" },
    { key: "Fee" as keyof ColumnVisibility, label: "Fee" },
    { key: "Stipend_Year_1" as keyof ColumnVisibility, label: "Stipend" },
    { key: "Bond_Years" as keyof ColumnVisibility, label: "Bond Years" },
    { key: "Beds" as keyof ColumnVisibility, label: "Beds" },
    { key: "actions" as keyof ColumnVisibility, label: "Actions" },
  ];

  const toggleColumn = (columnKey: keyof ColumnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const showAllColumns = () => {
    const allVisible = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = true;
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allVisible);
  };

  const hideAllColumns = () => {
    const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = key === "Institute";
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  const cleanStr = (val: any) => {
    if (val === null || val === undefined) return "N/A";
    const s = String(val).trim();
    if (s === "" || s === "-" || s.toLowerCase() === "info not available")
      return "N/A";
    return s;
  };
  // Fetch current page from API with backend filters
  const fetchAllotmentsFromAPI = async () => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", currentPage.toString());
    queryParams.append("page_size", "75");
    queryParams.append("ordering", "ai_rank");

    if (selectedRound !== "all") queryParams.append("round", selectedRound);

    if (selectedCategory !== "all")
      queryParams.append("category", selectedCategory);

    if (selectedQuota !== "all") queryParams.append("quota", selectedQuota);

    if (selectedState !== "all") queryParams.append("state", selectedState);

    if (selectedCourse !== "all") queryParams.append("course", selectedCourse);

    if (debouncedSearch.trim() !== "")
      queryParams.append("search", debouncedSearch.trim());

    const response = await fetch(
      `http://127.0.0.1:8000/api/ug-allotment/?${queryParams.toString()}`,
    );

    const data = await response.json();

    const mappedResults = data.results.map((item: any) => ({
      id: item.id || 0,
      Round: Number(item.round) || 0,
      ai_rank: String(item.ai_rank ?? ""),
      State: item.state || "",
      Institute: item.institute || "",
      Course: item.course || "",
      Quota: item.quota || "",
      Category: item.category || "",
      Fee: item.fee ? `₹${item.fee}` : "N/A",
      Stipend_Year_1: item.stipend_year1 ? `₹${item.stipend_year1}` : "N/A",
      Bond_Years: item.bond_years || 0,
      Bond_Penalty: item.bond_penalty ? `₹${item.bond_penalty}` : "N/A",
      Beds: item.beds || 0,
    }));

    return {
      results: mappedResults,
      count: data.count,
    };
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(
        "https://backend-fiwg.onrender.com/api/ug-allotment/filter-options/",
      );

      const data = await response.json();

      setFilterOptions({
        rounds: data.rounds || [],
        categories: data.categories || [],
        quotas: data.quotas || [],
        states: data.states || [],
        courses: data.courses || [],
      });
    } catch (error) {
      console.error("Error loading filter options", error);
    }
  };

  // Load filter options once
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await fetchAllotmentsFromAPI();

        setAllotmentData(data.results);
        setTotalCount(data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    currentPage,
    selectedRound,
    selectedCategory,
    selectedQuota,
    selectedState,
    selectedCourse,
    debouncedSearch,
  ]);

  // Get unique values for filters from loaded data
  const rounds = ["all", ...filterOptions.rounds.map(String)];
  const categories = ["all", ...filterOptions.categories];
  const quotas = ["all", ...filterOptions.quotas];
  const states = ["all", ...filterOptions.states];
  const courses = ["all", ...filterOptions.courses];

  const paginatedData = allotmentData;
  const itemsPerPage = 75;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedQuota("all");
    setSelectedRound("all");
    setSelectedState("all");
    setSelectedCourse("all");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading NEET UG Allotment Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Column Visibility Modal */}
      {showColumnVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Show/Hide Columns
              </h3>
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
                  className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
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

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {columnDefinitions.map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <label className="flex items-center cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={columnVisibility[key]}
                        onChange={() => toggleColumn(key)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {label}
                      </span>
                    </label>
                    <div className="ml-2">
                      {columnVisibility[key] ? (
                        <Eye className="w-4 h-4 text-blue-500" />
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
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Changes
              </button>
            </div>
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
                <h1 className="text-lg font-semibold">NEET UG Allotments</h1>
                <p className="text-xs text-blue-100">
                  {totalCount.toLocaleString()} Records Found
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-blue-100">
                {totalCount.toLocaleString()} Results
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

        {/* Round Filter Pills with Show/Hide Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {rounds
              .filter((r) => r !== "all")
              .map((round) => (
                <button
                  key={round}
                  onClick={() => {
                    setSelectedRound(round);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    selectedRound === round
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Round {round}
                </button>
              ))}

            <button
              onClick={() => {
                setSelectedRound("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedRound === "all"
                  ? "bg-purple-600 text-white"
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

        {/* Enhanced Search and Filters */}
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
                  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white min-w-[120px]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedQuota}
                  onChange={(e) => {
                    setSelectedQuota(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white min-w-[120px]"
                >
                  {quotas.map((quota) => (
                    <option key={quota} value={quota}>
                      {quota === "all" ? "All Quotas" : quota}
                    </option>
                  ))}
                </select>

                {/* Advanced Filter Toggle */}
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                >
                  <Filter className="w-4 h-4" />
                  {showAdvancedFilters ? "Hide" : "Show"} Filters
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showAdvancedFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="space-y-3 border-t pt-3">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {/* State Filter */}
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state === "all" ? "All States" : state}
                      </option>
                    ))}
                  </select>

                  {/* Course Filter */}
                  <select
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course === "all" ? "All Courses" : course}
                      </option>
                    ))}
                  </select>

                  {/* Clear Filters Button */}
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear All
                  </button>

                  {/* Results Count */}
                  <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-medium text-blue-600">
                      {totalCount.toLocaleString()}
                    </span>
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
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Round
                  </th>
                )}
                {columnVisibility.ai_rank && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    AI Rank
                  </th>
                )}
                {columnVisibility.State && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    State
                  </th>
                )}
                {columnVisibility.Institute && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Institute
                  </th>
                )}
                {columnVisibility.Course && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Course
                  </th>
                )}
                {columnVisibility.Quota && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Quota
                  </th>
                )}
                {columnVisibility.Category && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                )}
                {columnVisibility.Fee && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fee
                  </th>
                )}
                {columnVisibility.Stipend_Year_1 && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Stipend
                  </th>
                )}
                {columnVisibility.Bond_Years && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Bond years
                  </th>
                )}
                {columnVisibility.Beds && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Beds
                  </th>
                )}
                {columnVisibility.actions && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      Object.values(columnVisibility).filter(Boolean).length
                    }
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No data found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    {columnVisibility.Round && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {item.Round}
                      </td>
                    )}
                    {columnVisibility.ai_rank && (
                      <td className="px-2 py-2 text-center text-xs font-bold text-blue-600">
                        {Number(
                          item.ai_rank?.replace(/,/g, "") || 0,
                        ).toLocaleString()}
                      </td>
                    )}
                    {columnVisibility.State && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.State}
                      </td>
                    )}
                    {columnVisibility.Institute && (
                      <td className="px-2 py-2 text-center text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                        {item.Institute}
                      </td>
                    )}
                    {columnVisibility.Course && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.Course}
                      </td>
                    )}
                    {columnVisibility.Quota && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span
                          className={`px-2 py-1 text-center rounded-full text-xs font-medium ${
                            item.Quota === "AIQ" || item.Quota.includes("AI")
                              ? "bg-blue-100 text-blue-800"
                              : item.Quota.includes("State")
                                ? "bg-blue-100 text-blue-800"
                                : item.Quota.includes("DEEMED")
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.Quota}
                        </span>
                      </td>
                    )}
                    {columnVisibility.Category && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span
                          className={`px-2 py-1 text-center rounded-full text-xs font-medium ${
                            item.Category === "Open" || item.Category === "GEN"
                              ? "bg-gray-100 text-gray-800"
                              : item.Category === "OBC"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.Category === "SC"
                                  ? "bg-red-100 text-red-800"
                                  : item.Category === "ST"
                                    ? "bg-blue-100 text-blue-800"
                                    : item.Category === "EWS"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.Category}
                        </span>
                      </td>
                    )}
                    {columnVisibility.Fee && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {item.Fee}
                      </td>
                    )}
                    {columnVisibility.Stipend_Year_1 && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.Stipend_Year_1}
                      </td>
                    )}
                    {columnVisibility.Bond_Years && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.Bond_Years} yrs
                      </td>
                    )}
                    {columnVisibility.Beds && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.Beds}
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
              Showing{" "}
              {totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
              to {Math.min(currentPage * itemsPerPage, totalCount)}
              of {totalCount.toLocaleString()} results
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PrevIcon className="w-3 h-3" />
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else {
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
                          ? "bg-blue-500 text-white"
                          : "border border-gray-300 text-black hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default AllotmentsUGPage;

// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Search,
//   X,
//   ChevronDown,
//   Heart,
//   ChevronLeft as PrevIcon,
//   ChevronRight as NextIcon,
//   Filter,
//   Eye,
//   EyeOff,
//   RefreshCw,
// } from "lucide-react";

// interface AllotmentsPageProps {
//   onBack: () => void;
// }

// interface AllotmentData {
//   id: number;
//   Round: number;
//   ai_rank: string;
//   State: string;
//   Institute: string;
//   Course: string;
//   Quota: string;
//   Category: string;
//   Fee: string;
//   Stipend_Year_1: string;
//   Bond_Years: number;
//   Bond_Penalty: string;
//   Beds: number;
// }

// interface ColumnVisibility {
//   Round: boolean;
//   ai_rank: boolean;
//   State: boolean;
//   Institute: boolean;
//   Course: boolean;
//   Quota: boolean;
//   Category: boolean;
//   Fee: boolean;
//   Stipend_Year_1: boolean;
//   Bond_Years: boolean;
//   Beds: boolean;
//   actions: boolean;
// }

// const cleanStr = (val: any) => {
//   if (val === null || val === undefined) return "N/A";
//   const s = String(val).trim();
//   if (s === "" || s === "-" || s.toLowerCase() === "info not available")
//     return "N/A";
//   return s;
// };

// const AllotmentsUGPage: React.FC<AllotmentsPageProps> = ({ onBack }) => {
//   const [allotmentData, setAllotmentData] = useState<AllotmentData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedQuota, setSelectedQuota] = useState("all");
//   const [selectedRound, setSelectedRound] = useState("all");
//   const [selectedState, setSelectedState] = useState("all");
//   const [selectedCourse, setSelectedCourse] = useState("all");
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

//   // Column visibility state
//   const [showColumnVisibility, setShowColumnVisibility] = useState(false);
//   const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
//     Round: true,
//     ai_rank: true,
//     State: true,
//     Institute: true,
//     Course: true,
//     Quota: true,
//     Category: true,
//     Fee: true,
//     Stipend_Year_1: true,
//     Bond_Years: true,
//     Beds: true,
//     actions: true,
//   });

//   // Filter options from API
//   const [filterOptions, setFilterOptions] = useState({
//     categories: [] as string[],
//     quotas: [] as string[],
//     states: [] as string[],
//     courses: [] as string[],
//   });

//   const columnDefinitions = [
//     { key: "Round" as keyof ColumnVisibility, label: "Round" },
//     { key: "ai_rank" as keyof ColumnVisibility, label: "AI Rank" },
//     { key: "State" as keyof ColumnVisibility, label: "State" },
//     { key: "Institute" as keyof ColumnVisibility, label: "Institute" },
//     { key: "Course" as keyof ColumnVisibility, label: "Course" },
//     { key: "Quota" as keyof ColumnVisibility, label: "Quota" },
//     { key: "Category" as keyof ColumnVisibility, label: "Category" },
//     { key: "Fee" as keyof ColumnVisibility, label: "Fee" },
//     { key: "Stipend_Year_1" as keyof ColumnVisibility, label: "Stipend" },
//     { key: "Bond_Years" as keyof ColumnVisibility, label: "Bond Years" },
//     { key: "Beds" as keyof ColumnVisibility, label: "Beds" },
//     { key: "actions" as keyof ColumnVisibility, label: "Actions" },
//   ];

//   const toggleColumn = (columnKey: keyof ColumnVisibility) => {
//     setColumnVisibility((prev) => ({
//       ...prev,
//       [columnKey]: !prev[columnKey],
//     }));
//   };

//   const showAllColumns = () => {
//     const allVisible = Object.keys(columnVisibility).reduce((acc, key) => {
//       acc[key as keyof ColumnVisibility] = true;
//       return acc;
//     }, {} as ColumnVisibility);
//     setColumnVisibility(allVisible);
//   };

//   const hideAllColumns = () => {
//     const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
//       acc[key as keyof ColumnVisibility] = key === "Institute";
//       return acc;
//     }, {} as ColumnVisibility);
//     setColumnVisibility(allHidden);
//   };

//   // Note: Adjust this base URL if your root urls.py prepends 'api/' or not
//   const BASE_URL = "http://127.0.0.1:8000/api/ug-allotment/";

//   const fetchAllotmentsFromAPI = async (params: {
//     round?: string;
//     category?: string;
//     quota?: string;
//     state?: string;
//     course?: string;
//     search?: string;
//     page?: number;
//   }) => {
//     const queryParams = new URLSearchParams();
//     if (params.round && params.round !== "all")
//       queryParams.append("round", params.round);
//     if (params.category && params.category !== "all")
//       queryParams.append("category", params.category);
//     if (params.quota && params.quota !== "all")
//       queryParams.append("quota", params.quota);
//     if (params.state && params.state !== "all")
//       queryParams.append("state", params.state);
//     if (params.course && params.course !== "all")
//       queryParams.append("course", params.course);
//     if (params.search && params.search.trim() !== "")
//       queryParams.append("search", params.search.trim());
//     if (params.page) queryParams.append("page", params.page.toString());
//     queryParams.append("page_size", "75");

//     try {
//       const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
//       if (!response.ok) {
//         console.error(`API returned status ${response.status}`);
//         return { results: [], count: 0 };
//       }
//       const data = await response.json();

//       const mappedResults = data.results.map((item: any) => ({
//         id: item.id || 0,
//         Round: parseInt(item.round) || 0,
//         ai_rank: cleanStr(item.ai_rank),
//         State: cleanStr(item.state),
//         Institute: cleanStr(item.institute),
//         Course: cleanStr(item.course),
//         Quota: cleanStr(item.quota),
//         Category: cleanStr(item.category),
//         Fee: `₹${cleanStr(item.fee) === "N/A" ? "0" : cleanStr(item.fee)}`,
//         Stipend_Year_1: `₹${cleanStr(item.stipend_year1) === "N/A" ? "0" : cleanStr(item.stipend_year1)}`,
//         Bond_Years: parseFloat(item.bond_years) || 0,
//         Bond_Penalty: `₹${cleanStr(item.bond_penalty) === "N/A" ? "0" : cleanStr(item.bond_penalty)}`,
//         Beds: parseInt(item.beds) || 0,
//       }));

//       return {
//         results: mappedResults,
//         count: data.count || 0,
//       };
//     } catch (error) {
//       console.error("Network error: ", error);
//       return { results: [], count: 0 };
//     }
//   };

//   // Fetch filter options on mount
//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}filter-options/`);
//         if (response.ok) {
//           const data = await response.json();
//           setFilterOptions({
//             categories: data.categories || [],
//             quotas: data.quotas || [],
//             states: data.states || [],
//             courses: data.courses || [],
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching filter options:", error);
//       }
//     };
//     fetchOptions();
//   }, []);

//   // Fetch data when filters or page change
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchAllotmentsFromAPI({
//           round: selectedRound !== "all" ? selectedRound : undefined,
//           category: selectedCategory !== "all" ? selectedCategory : undefined,
//           quota: selectedQuota !== "all" ? selectedQuota : undefined,
//           state: selectedState !== "all" ? selectedState : undefined,
//           course: selectedCourse !== "all" ? selectedCourse : undefined,
//           search: searchTerm,
//           page: currentPage,
//         });
//         setAllotmentData(data.results);
//         setTotalCount(data.count);
//       } catch (error) {
//         console.error("Error fetching allotment data: ", error);
//         setAllotmentData([]);
//         setTotalCount(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Debounce search to avoid excessive API calls while typing
//     const timeoutId = setTimeout(() => {
//       fetchData();
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [
//     selectedRound,
//     selectedCategory,
//     selectedQuota,
//     selectedState,
//     selectedCourse,
//     searchTerm,
//     currentPage,
//   ]);

//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setSelectedCategory("all");
//     setSelectedQuota("all");
//     setSelectedRound("all");
//     setSelectedState("all");
//     setSelectedCourse("all");
//     setCurrentPage(1);
//   };

//   const itemsPerPage = 75;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   if (loading && allotmentData.length === 0) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading NEET UG Allotment Data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile Overlay */}
//       {showSidebar && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setShowSidebar(false)}
//         ></div>
//       )}

//       {/* Column Visibility Modal */}
//       {showColumnVisibility && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Show/Hide Columns
//               </h3>
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
//                   className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
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
//               <div className="space-y-2 max-h-64 overflow-y-auto">
//                 {columnDefinitions.map(({ key, label }) => (
//                   <div
//                     key={key}
//                     className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
//                   >
//                     <label className="flex items-center cursor-pointer flex-1">
//                       <input
//                         type="checkbox"
//                         checked={columnVisibility[key]}
//                         onChange={() => toggleColumn(key)}
//                         className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                       />
//                       <span className="ml-3 text-sm text-gray-700">
//                         {label}
//                       </span>
//                     </label>
//                     <div className="ml-2">
//                       {columnVisibility[key] ? (
//                         <Eye className="w-4 h-4 text-blue-500" />
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
//                 className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Apply Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold">NEET UG Allotments</h1>
//                 <p className="text-xs text-blue-100">
//                   {loading
//                     ? "Loading..."
//                     : `${totalCount.toLocaleString()} Total Records`}
//                 </p>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center space-x-2">
//               <span className="text-xs text-blue-100">
//                 Page {currentPage} of {totalPages || 1} •{" "}
//                 {totalCount.toLocaleString()} Total Records
//               </span>
//             </div>
//             <button
//               onClick={() => setShowSidebar(!showSidebar)}
//               className="md:hidden p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <Filter className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Round Filter Pills (1 to 6) with Show/Hide Button */}
//         <div className="bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex items-center gap-2 overflow-x-auto">
//             {["1", "2", "3", "4", "5", "6"].map((round) => (
//               <button
//                 key={round}
//                 onClick={() => {
//                   setSelectedRound(round);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
//                   selectedRound === round
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Round {round}
//               </button>
//             ))}
//             <button
//               onClick={() => {
//                 setSelectedRound("all");
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
//                 selectedRound === "all"
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               All Rounds
//             </button>
//             <button
//               onClick={() => setShowColumnVisibility(true)}
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors ml-2 whitespace-nowrap"
//             >
//               <Eye className="w-4 h-4" />
//               Show/Hide
//             </button>
//           </div>
//         </div>

//         {/* Enhanced Search and Filters */}
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
//                   className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white min-w-[120px]"
//                 >
//                   <option value="all">All Categories</option>
//                   {filterOptions.categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   value={selectedQuota}
//                   onChange={(e) => {
//                     setSelectedQuota(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white min-w-[120px]"
//                 >
//                   <option value="all">All Quotas</option>
//                   {filterOptions.quotas.map((quota) => (
//                     <option key={quota} value={quota}>
//                       {quota}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Advanced Filter Toggle */}
//                 <button
//                   onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//                   className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
//                 >
//                   <Filter className="w-4 h-4" />
//                   {showAdvancedFilters ? "Hide" : "Show"} Filters
//                   <ChevronDown
//                     className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
//                   />
//                 </button>
//               </div>
//             </div>

//             {/* Advanced Filters */}
//             {showAdvancedFilters && (
//               <div className="space-y-3 border-t pt-3">
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//                   {/* State Filter */}
//                   <select
//                     value={selectedState}
//                     onChange={(e) => {
//                       setSelectedState(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//                   >
//                     <option value="all">All States</option>
//                     {filterOptions.states.map((state) => (
//                       <option key={state} value={state}>
//                         {state}
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
//                     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//                   >
//                     <option value="all">All Courses</option>
//                     {filterOptions.courses.map((course) => (
//                       <option key={course} value={course}>
//                         {course}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Clear Filters Button */}
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                     Clear All
//                   </button>

//                   {/* Results Count */}
//                   <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 col-span-2 md:col-span-1">
//                     <span className="font-medium text-blue-600">
//                       {totalCount.toLocaleString()}
//                     </span>
//                     <span className="ml-1">results</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="flex-1 overflow-auto relative">
//           {loading && allotmentData.length > 0 && (
//             <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
//               <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )}
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
//               <tr>
//                 {columnVisibility.Round && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Round
//                   </th>
//                 )}
//                 {columnVisibility.ai_rank && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     AI Rank
//                   </th>
//                 )}
//                 {columnVisibility.State && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     State
//                   </th>
//                 )}
//                 {columnVisibility.Institute && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Institute
//                   </th>
//                 )}
//                 {columnVisibility.Course && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Course
//                   </th>
//                 )}
//                 {columnVisibility.Quota && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Quota
//                   </th>
//                 )}
//                 {columnVisibility.Category && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Category
//                   </th>
//                 )}
//                 {columnVisibility.Fee && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Fee
//                   </th>
//                 )}
//                 {columnVisibility.Stipend_Year_1 && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Stipend
//                   </th>
//                 )}
//                 {columnVisibility.Bond_Years && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Bond years
//                   </th>
//                 )}
//                 {columnVisibility.Beds && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Beds
//                   </th>
//                 )}
//                 {columnVisibility.actions && (
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {allotmentData.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={
//                       Object.values(columnVisibility).filter(Boolean).length
//                     }
//                     className="px-6 py-8 text-center text-gray-500"
//                   >
//                     No data found. Try adjusting your filters.
//                   </td>
//                 </tr>
//               ) : (
//                 allotmentData.map((item, index) => (
//                   <tr
//                     key={item.id || index}
//                     className="hover:bg-blue-50 transition-colors"
//                   >
//                     {columnVisibility.Round && (
//                       <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
//                         {item.Round}
//                       </td>
//                     )}
//                     {columnVisibility.ai_rank && (
//                       <td className="px-2 py-2 text-center text-xs font-bold text-blue-600">
//                         {parseInt(
//                           String(item.ai_rank).replace(/,/g, ""),
//                         ).toLocaleString()}
//                       </td>
//                     )}
//                     {columnVisibility.State && (
//                       <td className="px-2 py-2 text-center text-xs text-gray-700">
//                         {item.State}
//                       </td>
//                     )}
//                     {columnVisibility.Institute && (
//                       <td className="px-2 py-2 text-center text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
//                         {item.Institute}
//                       </td>
//                     )}
//                     {columnVisibility.Course && (
//                       <td className="px-2 py-2 text-center text-xs text-gray-700">
//                         {item.Course}
//                       </td>
//                     )}
//                     {columnVisibility.Quota && (
//                       <td className="px-2 py-2 text-center text-xs">
//                         <span
//                           className={`px-2 py-1 text-center rounded-full text-xs font-medium ${
//                             item.Quota.includes("AI") || item.Quota === "AIQ"
//                               ? "bg-blue-100 text-blue-800"
//                               : item.Quota.includes("State")
//                                 ? "bg-blue-100 text-blue-800"
//                                 : item.Quota.includes("DEEMED")
//                                   ? "bg-purple-100 text-purple-800"
//                                   : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {item.Quota}
//                         </span>
//                       </td>
//                     )}
//                     {columnVisibility.Category && (
//                       <td className="px-2 py-2 text-center text-xs">
//                         <span
//                           className={`px-2 py-1 text-center rounded-full text-xs font-medium ${
//                             item.Category === "Open" || item.Category === "GEN"
//                               ? "bg-gray-100 text-gray-800"
//                               : item.Category === "OBC"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : item.Category === "SC"
//                                   ? "bg-red-100 text-red-800"
//                                   : item.Category === "ST"
//                                     ? "bg-blue-100 text-blue-800"
//                                     : item.Category === "EWS"
//                                       ? "bg-orange-100 text-orange-800"
//                                       : "bg-green-100 text-green-800"
//                           }`}
//                         >
//                           {item.Category}
//                         </span>
//                       </td>
//                     )}
//                     {columnVisibility.Fee && (
//                       <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
//                         {item.Fee}
//                       </td>
//                     )}
//                     {columnVisibility.Stipend_Year_1 && (
//                       <td className="px-2 py-2 text-center text-xs text-gray-700">
//                         {item.Stipend_Year_1}
//                       </td>
//                     )}
//                     {columnVisibility.Bond_Years && (
//                       <td className="px-2 py-2 text-center text-xs text-gray-700">
//                         {item.Bond_Years} yrs
//                       </td>
//                     )}
//                     {columnVisibility.Beds && (
//                       <td className="px-2 py-2 text-center text-xs text-gray-700">
//                         {item.Beds}
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
//               Showing{" "}
//               {totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
//               {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
//               {totalCount.toLocaleString()} results
//             </div>
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1 || loading}
//                 className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <PrevIcon className="w-3 h-3" />
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
//                       disabled={loading}
//                       className={`px-2 py-1 text-xs rounded transition-colors ${
//                         currentPage === pageNum
//                           ? "bg-blue-500 text-white"
//                           : "border border-gray-300 text-black hover:bg-gray-50"
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() =>
//                   setCurrentPage(Math.min(totalPages, currentPage + 1))
//                 }
//                 disabled={
//                   currentPage === totalPages || totalPages === 0 || loading
//                 }
//                 className="p-1.5 border text-black border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <NextIcon className="w-3 h-3" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllotmentsUGPage;
