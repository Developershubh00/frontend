

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Eye,
  EyeOff,
  X,
  Filter,
  ChevronDown,
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
  Users,
  GraduationCap,
  Building2,
  Award,
} from "lucide-react";
import CustomSelect from "../components/CustomSelect";

interface InicetAllotmentPageProps {
  onBack: () => void;
}

interface AllotmentData {
  Round: string;
  "AI Rank": string;
  State: string;
  Institute: string;
  Course: string;
  Quota: string;
  Category: string;
}

interface ColumnVisibility {
  Round: boolean;
  "AI Rank": boolean;
  State: boolean;
  Institute: boolean;
  Course: boolean;
  Quota: boolean;
  Category: boolean;
}

const InicetAllotmentPage: React.FC<InicetAllotmentPageProps> = ({
  onBack,
}) => {
  const [allotmentData, setAllotmentData] = useState<AllotmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRound, setSelectedRound] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    Round: true,
    "AI Rank": true,
    State: true,
    Institute: true,
    Course: true,
    Quota: true,
    Category: true,
  });

  // Column definitions
  const columnDefinitions = [
    { key: "Round" as keyof ColumnVisibility, label: "Round" },
    { key: "AI Rank" as keyof ColumnVisibility, label: "AI Rank" },
    { key: "State" as keyof ColumnVisibility, label: "State" },
    { key: "Institute" as keyof ColumnVisibility, label: "Institute" },
    { key: "Course" as keyof ColumnVisibility, label: "Course" },
    { key: "Quota" as keyof ColumnVisibility, label: "Quota" },
    { key: "Category" as keyof ColumnVisibility, label: "Category" },
  ];

  // Toggle column visibility
  const toggleColumn = (columnKey: keyof ColumnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
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

  // Hide all columns (but keep Institute visible)
  const hideAllColumns = () => {
    const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = key === "Institute";
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  const parseCSV = (csvText: string): AllotmentData[] => {
    if (csvText.includes("<html") || csvText.includes("<!DOCTYPE")) {
      throw new Error("Invalid CSV data - received HTML");
    }

    const lines = csvText.trim().split(/\r?\n/);
    const dataLines = lines.filter((line) => line.trim().length > 0);

    if (dataLines.length < 2) {
      throw new Error("Invalid CSV data - insufficient rows");
    }

    const headers = dataLines[0]
      .split(",")
      .map((h) => h.trim().replace(/"/g, ""));

    return dataLines.slice(1).map((line) => {
      const values: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const cleanedValues = values.map((val) =>
        val.replace(/^"(.*)"$/, "$1").trim()
      );

      return {
        Round: cleanedValues[0] || "",
        "AI Rank": cleanedValues[1] || "",
        State: cleanedValues[2] || "",
        Institute: cleanedValues[3] || "",
        Course: cleanedValues[4] || "",
        Quota: cleanedValues[5] || "",
        Category: cleanedValues[6] || "",
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/INICET_allotments.csv");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();

        if (!csvText || csvText.trim().length === 0) {
          throw new Error("Empty CSV file");
        }

        const parsedData = parseCSV(csvText);

        if (parsedData.length === 0) {
          throw new Error("No valid data parsed from CSV");
        }

        const cleanedData = parsedData.filter(item => 
          item.Round !== "Round" && item.Round !== "ROUND"
        );

        setAllotmentData(cleanedData);
      } catch (error) {
        console.error("Error fetching INICET allotment data:", error);

        // Fallback data
        const fallbackData: AllotmentData[] = [
          {
            Round: "Round 1",
            "AI Rank": "100",
            State: "Delhi",
            Institute: "All India Institute of Medical Sciences, New Delhi",
            Course: "MD General Medicine",
            Quota: "All India Quota",
            Category: "General",
          },
          {
            Round: "Round 1",
            "AI Rank": "250",
            State: "Maharashtra",
            Institute: "Seth G.S. Medical College and KEM Hospital, Mumbai",
            Course: "MS General Surgery",
            Quota: "All India Quota",
            Category: "OBC",
          },
        ];

        setAllotmentData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = allotmentData.filter((item) => {
    const matchesSearch =
      item.Round.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["AI Rank"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Quota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRound =
      selectedRound === "all" || item.Round === selectedRound;
    const matchesState =
      selectedState === "all" || item.State === selectedState;
    const matchesCourse =
      selectedCourse === "all" || item.Course === selectedCourse;
    const matchesQuota =
      selectedQuota === "all" || item.Quota === selectedQuota;
    const matchesCategory =
      selectedCategory === "all" || item.Category === selectedCategory;

    return (
      matchesSearch &&
      matchesRound &&
      matchesState &&
      matchesCourse &&
      matchesQuota &&
      matchesCategory
    );
  });

  // Pagination
  const itemsPerPage = 75;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get unique values for filters
  const rounds = [
    "all",
    ...Array.from(new Set(allotmentData.map((item) => item.Round))),
  ].sort();
  const states = [
    "all",
    ...Array.from(new Set(allotmentData.map((item) => item.State))),
  ].sort();
  const courses = [
    "all",
    ...Array.from(new Set(allotmentData.map((item) => item.Course))),
  ].sort();
  const quotas = [
    "all",
    ...Array.from(new Set(allotmentData.map((item) => item.Quota))),
  ].sort();
  const categories = [
    "all",
    ...Array.from(new Set(allotmentData.map((item) => item.Category))),
  ].sort();

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedRound("all");
    setSelectedState("all");
    setSelectedCourse("all");
    setSelectedQuota("all");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading INICET Allotment Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
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
                <h1 className="text-lg font-semibold">INICET Allotments</h1>
                <p className="text-xs text-blue-100">
                  Institute of National Importance Combined Entrance Test
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-blue-100">
                {filteredData.length} Allotments
              </span>
            </div>
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
                  placeholder="Search allotments, institutes, courses, states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <CustomSelect
                  value={selectedState}
                  onChange={(value) => {
                    setSelectedState(value);
                    setCurrentPage(1);
                  }}
                  options={states}
                  placeholder="Select State"
                  allLabel="All States"
                  menuPlacement="auto"
                  className="min-w-[120px]"
                />

                <button
                  onClick={() => setShowColumnVisibility(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors whitespace-nowrap"
                >
                  <Eye className="w-4 h-4" />
                  Show/Hide
                </button>

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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* Round Filter */}
                  <CustomSelect
                    value={selectedRound}
                    onChange={(value) => {
                      setSelectedRound(value);
                      setCurrentPage(1);
                    }}
                    options={rounds}
                    placeholder="Select Round"
                    allLabel="All Rounds"
                    menuPlacement="auto"
                  />

                  {/* Course Filter */}
                  <CustomSelect
                    value={selectedCourse}
                    onChange={(value) => {
                      setSelectedCourse(value);
                      setCurrentPage(1);
                    }}
                    options={courses}
                    placeholder="Select Course"
                    allLabel="All Courses"
                    menuPlacement="auto"
                  />

                  {/* Quota Filter */}
                  <CustomSelect
                    value={selectedQuota}
                    onChange={(value) => {
                      setSelectedQuota(value);
                      setCurrentPage(1);
                    }}
                    options={quotas}
                    placeholder="Select Quota"
                    allLabel="All Quotas"
                    menuPlacement="auto"
                  />

                  {/* Category Filter */}
                  <CustomSelect
                    value={selectedCategory}
                    onChange={(value) => {
                      setSelectedCategory(value);
                      setCurrentPage(1);
                    }}
                    options={categories}
                    placeholder="Select Category"
                    allLabel="All Categories"
                    menuPlacement="auto"
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* Clear Filters Button */}
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>

                  {/* Results Count */}
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-medium text-blue-600">
                      {filteredData.length}
                    </span>
                    <span className="ml-1">allotments found</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {allotmentData.length}
              </div>
              <div className="text-gray-600 text-xs">Total Allotments</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {courses.length - 1}
              </div>
              <div className="text-gray-600 text-xs">Courses</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {
                  Array.from(new Set(allotmentData.map((s) => s.Institute)))
                    .length
                }
              </div>
              <div className="text-gray-600 text-xs">Institutes</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {states.length - 1}
              </div>
              <div className="text-gray-600 text-xs">States</div>
            </div>
          </div>
        </div>

        {/* Table */}
        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
         <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
              <tr>
                {columnVisibility.Round && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Round
                  </th>
                )}
                {columnVisibility["AI Rank"] && (
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
                    key={index}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    {columnVisibility.Round && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700 font-medium">
                        {item.Round}
                      </td>
                    )}
                    {columnVisibility["AI Rank"] && (
                      <td className="px-2 py-2 text-center text-xs text-purple-600 font-semibold">
                        {item["AI Rank"]}
                      </td>
                    )}
                    {columnVisibility.State && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700 font-medium">
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
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.Quota.toLowerCase().includes("all india")
                              ? "bg-blue-100 text-blue-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.Quota}
                        </span>
                      </td>
                    )}
                    {columnVisibility.Category && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.Category.toLowerCase() === "general"
                              ? "bg-gray-100 text-gray-800"
                              : item.Category.toLowerCase() === "obc"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.Category.toLowerCase() === "sc"
                              ? "bg-blue-100 text-blue-800"
                              : item.Category.toLowerCase() === "st"
                              ? "bg-red-100 text-red-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.Category}
                        </span>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} results
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

export default InicetAllotmentPage;

