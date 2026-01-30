import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  X,
  ChevronDown,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";

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

const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
  const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
  const [loading, setLoading] = useState(true);
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
  const [selectedInstituteType, setSelectedInstituteType] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [availableFilters, setAvailableFilters] = useState({
    quotas: ["all"],
    categories: ["all"],
    states: ["all"],
    institutes: ["all"],
    courses: ["all"],
  });

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
    { key: "Round" as keyof ColumnVisibility, label: "Round" },
    { key: "Quota" as keyof ColumnVisibility, label: "Quota" },
    { key: "Category" as keyof ColumnVisibility, label: "Category" },
    { key: "State" as keyof ColumnVisibility, label: "State" },
    { key: "Institute" as keyof ColumnVisibility, label: "Institute" },
    { key: "Course" as keyof ColumnVisibility, label: "Course" },
    { key: "Seats" as keyof ColumnVisibility, label: "Seats" },
    {
      key: "Fee_Stipend_Year_1" as keyof ColumnVisibility,
      label: "Fee/Stipend Year 1",
    },
    { key: "Bond_Years" as keyof ColumnVisibility, label: "Bond Years" },
    { key: "Bond_Penalty" as keyof ColumnVisibility, label: "Bond Penalty" },
    { key: "Beds" as keyof ColumnVisibility, label: "Beds" },
    { key: "CR_2023_1" as keyof ColumnVisibility, label: "CR 2023-1" },
    { key: "CR_2023_2" as keyof ColumnVisibility, label: "CR 2023-2" },
    { key: "CR_2023_3" as keyof ColumnVisibility, label: "CR 2023-3" },
    { key: "CR_2023_4" as keyof ColumnVisibility, label: "CR 2023-4" },
    { key: "CR_2023_5" as keyof ColumnVisibility, label: "CR 2023-5" },
    { key: "CR_2024_1" as keyof ColumnVisibility, label: "CR 2024-1" },
    { key: "CR_2024_2" as keyof ColumnVisibility, label: "CR 2024-2" },
    { key: "CR_2024_3" as keyof ColumnVisibility, label: "CR 2024-3" },
    { key: "CR_2024_4" as keyof ColumnVisibility, label: "CR 2024-4" },
    { key: "CR_2024_5" as keyof ColumnVisibility, label: "CR 2024-5" },
    { key: "actions" as keyof ColumnVisibility, label: "Actions" },
  ];

  // Custom Select Component
  const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder,
    allLabel,
  }: any) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[140px]"
    >
      <option value="all">{allLabel}</option>
      {options
        .filter((opt: string) => opt !== "all")
        .map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
  //   const CustomSelect = ({ value, onChange, options, placeholder, allLabel }: any) => (
  //   <select
  //     value={value}
  //     onChange={(e) => onChange(e.target.value)}
  //     className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white min-w-[140px]"
  //   >
  //     <option value="all">{allLabel}</option>
  //     {options
  //       .filter((opt: string) => opt !== "all")
  //       .map((option: string) => (
  //         <option key={option} value={option}>
  //           {option}
  //         </option>
  //       ))
  //     }
  //   </select>
  // );

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

  // Hide all columns (but keep at least one visible)
  const hideAllColumns = () => {
    const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = key === "Institute";
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };
  const fetchAllFilterOptions = async () => {
    try {
      // Fetch without any filters to get all unique values
      const response = await fetch(
        `https://backend-fiwg.onrender.com/get-seatmatrix/?page=1&page_size=50000`,
      );

      if (!response.ok) {
        console.error(`API returned status ${response.status}`);
        return;
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        console.warn("No results returned from API");
        return;
      }

      // Extract unique values for each filter - ensure "all" is always first
      const uniqueQuotas = Array.from(
        new Set(
          data.results
            .map((item: any) => item.quota)
            .filter(
              (q: string) => q && q !== "No Info Available" && q.trim() !== "",
            ),
        ),
      ).sort();

      const uniqueCategories = Array.from(
        new Set(
          data.results
            .map((item: any) => item.category)
            .filter(
              (c: string) => c && c !== "No Info Available" && c.trim() !== "",
            ),
        ),
      ).sort();

      const uniqueStates = Array.from(
        new Set(
          data.results
            .map((item: any) => item.state)
            .filter(
              (s: string) => s && s !== "No Info Available" && s.trim() !== "",
            ),
        ),
      ).sort();

      const uniqueInstitutes = Array.from(
        new Set(
          data.results
            .map((item: any) => item.institute)
            .filter(
              (i: string) => i && i !== "No Info Available" && i.trim() !== "",
            ),
        ),
      ).sort();

      const uniqueCourses = Array.from(
        new Set(
          data.results
            .map((item: any) => item.course)
            .filter(
              (c: string) => c && c !== "No Info Available" && c.trim() !== "",
            ),
        ),
      ).sort();

      console.log("Fetched filter options:", {
        quotas: uniqueQuotas.length,
        categories: uniqueCategories.length,
        states: uniqueStates.length,
        institutes: uniqueInstitutes.length,
        courses: uniqueCourses.length,
      });

      setAvailableFilters({
        quotas: ["all", ...uniqueQuotas],
        categories: ["all", ...uniqueCategories],
        states: ["all", ...uniqueStates],
        institutes: ["all", ...uniqueInstitutes],
        courses: ["all", ...uniqueCourses],
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
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
    page?: number;
  }) => {
    const queryParams = new URLSearchParams();

    // Handle Round Filter: Transform "Round X" to "X" for the API
    if (params.round && params.round !== "all") {
      const roundNumber = params.round.replace("Round ", "");
      queryParams.append("round", roundNumber);
    }

    if (params.category && params.category !== "all")
      queryParams.append("category", params.category);
    if (params.quota && params.quota !== "all")
      queryParams.append("quota", params.quota);
    if (params.state && params.state !== "all")
      queryParams.append("state", params.state);
    if (params.institute && params.institute !== "all")
      queryParams.append("institute", params.institute);
    if (params.course && params.course !== "all")
      queryParams.append("course", params.course);
    if (params.institute_type && params.institute_type !== "all")
      queryParams.append("institute_type", params.institute_type);
    if (params.page) queryParams.append("page", params.page.toString());
    queryParams.append("page_size", "70");

    try {
      const response = await fetch(
        `https://backend-fiwg.onrender.com/get-seatmatrix/?${queryParams.toString()}`,
      );

      if (!response.ok) {
        console.error(`API returned status ${response.status}`);
        return { results: [], count: 0 };
      }

      const data = await response.json();

      const mappedResults = data.results.map((item: any) => ({
        Round: item.round || "No Info Available",
        Quota: item.quota || "No Info Available",
        Category: item.category || "No Info Available",
        State: item.state || "No Info Available",
        Institute: item.institute || "No Info Available",
        Course: item.course || "No Info Available",
        Seats: item.seats ? parseInt(item.seats) : 0,
        Fee_Stipend_Year_1: item.fee_stipend_year_1
          ? parseFloat(item.fee_stipend_year_1)
          : 0,
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
        count: data.count,
      };
    } catch (error) {
      console.error("Network error:", error);
      return { results: [], count: 0 };
    }
  };
  useEffect(() => {
    console.log("Available Filters Updated:", availableFilters);
  }, [availableFilters]);

  // ADD THIS NEW useEffect HERE:
  useEffect(() => {
    fetchAllFilterOptions();
  }, []);

  // Fetch data with API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchSeatMatrixFromAPI({
          round: selectedRound !== "all" ? selectedRound : undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          quota: selectedQuota !== "all" ? selectedQuota : undefined,
          state: selectedState !== "all" ? selectedState : undefined,
          institute:
            selectedInstitute !== "all" ? selectedInstitute : undefined,
          course: selectedCourse !== "all" ? selectedCourse : undefined,
          institute_type:
            selectedInstituteType !== "all" ? selectedInstituteType : undefined,
          page: currentPage,
        });

        if (
          data &&
          Array.isArray(data.results) &&
          typeof data.count === "number"
        ) {
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
  ]);
  // Use pre-fetched filter options instead of deriving from current data
  const quotas = availableFilters.quotas;
  const categories = availableFilters.categories;
  const rounds = ["all", "Round 1", "Round 2", "Round 3", "Round 4", "Round 5"];
  const states = availableFilters.states;
  const institutes = availableFilters.institutes;
  const courses = availableFilters.courses;
  const instituteTypes = ["all", "Government", "Private"];

  // Get unique values for filters from current data
  // const quotas = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Quota).filter(q => q !== "No Info Available")))];
  // const categories = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Category).filter(c => c !== "No Info Available")))];
  // const rounds = ["all", "Round 1", "Round 2", "Round 3", "Round 4", "Round 5"];
  // const states = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.State).filter(s => s !== "No Info Available")))];
  // const institutes = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Institute).filter(i => i !== "No Info Available")))];
  // const courses = ["all", ...Array.from(new Set(seatMatrixData.map(item => item.Course).filter(c => c !== "No Info Available")))];
  // const instituteTypes = ["all", "Government", "Private"];
  // const quotas = availableFilters.quotas;
  // const categories = availableFilters.categories;
  // const rounds = ["all", "Round 1", "Round 2", "Round 3", "Round 4", "Round 5"];
  // const states = availableFilters.states;
  // const institutes = availableFilters.institutes;
  // const courses = availableFilters.courses;
  // const instituteTypes = ["all", "Government", "Private"];

  // Client-side filtering for search term only
  const filteredData = seatMatrixData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Column Visibility Modal */}
      {showColumnVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
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

              <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
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
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {label}
                      </span>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading...</p>
            </div>
          </div>
        )}

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
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-purple-100">
                {filteredData.length} Records
              </span>
            </div>
          </div>
        </div>

        {/* Round Filter Pills with Show/Hide Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"].map(
              (round) => (
                <button
                  key={round}
                  onClick={() => {
                    setSelectedRound(round);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                    selectedRound === round
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {round}
                </button>
              ),
            )}

            <button
              onClick={() => {
                setSelectedRound("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                selectedRound === "all"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Rounds
            </button>

            <button
              onClick={() => setShowColumnVisibility(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors ml-2 whitespace-nowrap"
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
                <CustomSelect
                  value={selectedState}
                  onChange={(value: string) => {
                    setSelectedState(value);
                    setCurrentPage(1);
                  }}
                  options={states}
                  placeholder="Select State"
                  allLabel="All States"
                />

                <CustomSelect
                  value={selectedQuota}
                  onChange={(value: string) => {
                    setSelectedQuota(value);
                    setCurrentPage(1);
                  }}
                  options={quotas}
                  placeholder="Select Quota"
                  allLabel="All Quotas"
                />

                {/* Advanced Filter Toggle */}
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200"
                >
                  <Filter className="w-4 h-4" />
                  {showAdvancedFilters ? "Hide" : "Show"} Filters
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="space-y-3 border-t pt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <CustomSelect
                    value={selectedCategory}
                    onChange={(value: string) => {
                      setSelectedCategory(value);
                      setCurrentPage(1);
                    }}
                    options={categories}
                    placeholder="Select Category"
                    allLabel="All Categories"
                  />

                  <CustomSelect
                    value={selectedCourse}
                    onChange={(value: string) => {
                      setSelectedCourse(value);
                      setCurrentPage(1);
                    }}
                    options={courses}
                    placeholder="Select Course"
                    allLabel="All Courses"
                  />

                  <CustomSelect
                    value={selectedInstitute}
                    onChange={(value: string) => {
                      setSelectedInstitute(value);
                      setCurrentPage(1);
                    }}
                    options={institutes.slice(0, 50)}
                    placeholder="Select Institute"
                    allLabel="All Institutes"
                  />

                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>

                <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-medium text-purple-600">
                    {filteredData.length}
                  </span>
                  <span className="ml-1">filtered results</span>
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
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Round
                  </th>
                )}
                {columnVisibility.Quota && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Quota
                  </th>
                )}
                {columnVisibility.Category && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                )}
                {columnVisibility.State && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    State
                  </th>
                )}
                {columnVisibility.Institute && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Institute
                  </th>
                )}
                {columnVisibility.Course && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Course
                  </th>
                )}
                {columnVisibility.Seats && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Seats
                  </th>
                )}
                {columnVisibility.Fee_Stipend_Year_1 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fee/Stipend Year 1
                  </th>
                )}
                {columnVisibility.Bond_Years && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Bond Years
                  </th>
                )}
                {columnVisibility.Bond_Penalty && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Bond Penalty
                  </th>
                )}
                {columnVisibility.Beds && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Beds
                  </th>
                )}
                {columnVisibility.CR_2023_1 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2023-1
                  </th>
                )}
                {columnVisibility.CR_2023_2 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2023-2
                  </th>
                )}
                {columnVisibility.CR_2023_3 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2023-3
                  </th>
                )}
                {columnVisibility.CR_2023_4 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2023-4
                  </th>
                )}
                {columnVisibility.CR_2023_5 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2023-5
                  </th>
                )}
                {columnVisibility.CR_2024_1 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2024-1
                  </th>
                )}
                {columnVisibility.CR_2024_2 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2024-2
                  </th>
                )}
                {columnVisibility.CR_2024_3 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2024-3
                  </th>
                )}
                {columnVisibility.CR_2024_4 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2024-4
                  </th>
                )}
                {columnVisibility.CR_2024_5 && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    CR 2024-5
                  </th>
                )}
                {columnVisibility.actions && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.length === 0 ? (
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
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-purple-50 transition-colors"
                  >
                    {columnVisibility.Round && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {displayValue(item.Round)}
                      </td>
                    )}
                    {columnVisibility.Quota && (
                      <td className="px-2 py-2 text-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.Quota === "All India"
                              ? "bg-green-100 text-green-800"
                              : item.Quota === "State Quota"
                                ? "bg-blue-100 text-blue-800"
                                : item.Quota === "Management"
                                  ? "bg-purple-100 text-purple-800"
                                  : item.Quota === "NRI"
                                    ? "bg-blue-100 text-blue-800"
                                    : item.Quota === "No Info Available"
                                      ? "bg-gray-100 text-gray-600"
                                      : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {displayValue(item.Quota)}
                        </span>
                      </td>
                    )}
                    {columnVisibility.Category && (
                      <td className="px-2 py-2 text-xs">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.Category === "General"
                              ? "bg-blue-100 text-blue-800"
                              : item.Category === "OBC"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.Category === "SC"
                                  ? "bg-red-100 text-red-800"
                                  : item.Category === "ST"
                                    ? "bg-green-100 text-green-800"
                                    : item.Category === "EWS"
                                      ? "bg-indigo-100 text-indigo-800"
                                      : item.Category === "No Info Available"
                                        ? "bg-gray-100 text-gray-600"
                                        : "bg-pink-100 text-pink-800"
                          }`}
                        >
                          {displayValue(item.Category)}
                        </span>
                      </td>
                    )}
                    {columnVisibility.State && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {displayValue(item.State)}
                      </td>
                    )}
                    {columnVisibility.Institute && (
                      <td className="px-2 py-2 text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
                        {displayValue(item.Institute)}
                      </td>
                    )}
                    {columnVisibility.Course && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {displayValue(item.Course)}
                      </td>
                    )}
                    {columnVisibility.Seats && (
                      <td className="px-2 py-2 text-xs font-bold text-purple-600">
                        {item.Seats === 0 ? "No Info Available" : item.Seats}
                      </td>
                    )}
                    {columnVisibility.Fee_Stipend_Year_1 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.Fee_Stipend_Year_1 === 0
                          ? "No Info Available"
                          : `₹${item.Fee_Stipend_Year_1.toLocaleString()}`}
                      </td>
                    )}
                    {columnVisibility.Bond_Years && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.Bond_Years === 0
                          ? "No Info Available"
                          : item.Bond_Years}
                      </td>
                    )}
                    {columnVisibility.Bond_Penalty && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.Bond_Penalty === 0
                          ? "No Info Available"
                          : `₹${item.Bond_Penalty.toLocaleString()}`}
                      </td>
                    )}
                    {columnVisibility.Beds && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.Beds === 0 ? "No Info Available" : item.Beds}
                      </td>
                    )}
                    {columnVisibility.CR_2023_1 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_1 === 0
                          ? "No Info Available"
                          : item.CR_2023_1}
                      </td>
                    )}
                    {columnVisibility.CR_2023_2 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_2 === 0
                          ? "No Info Available"
                          : item.CR_2023_2}
                      </td>
                    )}
                    {columnVisibility.CR_2023_3 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_3 === 0
                          ? "No Info Available"
                          : item.CR_2023_3}
                      </td>
                    )}
                    {columnVisibility.CR_2023_4 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_4 === 0
                          ? "No Info Available"
                          : item.CR_2023_4}
                      </td>
                    )}
                    {columnVisibility.CR_2023_5 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2023_5 === 0
                          ? "No Info Available"
                          : item.CR_2023_5}
                      </td>
                    )}
                    {columnVisibility.CR_2024_1 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_1 === 0
                          ? "No Info Available"
                          : item.CR_2024_1}
                      </td>
                    )}
                    {columnVisibility.CR_2024_2 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_2 === 0
                          ? "No Info Available"
                          : item.CR_2024_2}
                      </td>
                    )}
                    {columnVisibility.CR_2024_3 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_3 === 0
                          ? "No Info Available"
                          : item.CR_2024_3}
                      </td>
                    )}
                    {columnVisibility.CR_2024_4 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_4 === 0
                          ? "No Info Available"
                          : item.CR_2024_4}
                      </td>
                    )}
                    {columnVisibility.CR_2024_5 && (
                      <td className="px-2 py-2 text-xs text-gray-700">
                        {item.CR_2024_5 === 0
                          ? "No Info Available"
                          : item.CR_2024_5}
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
              {totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{" "}
              results
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
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
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
