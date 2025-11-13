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

interface SeatMatrixPageProps {
  onBack: () => void;
}

interface SeatMatrixData {
  Subject: string;
  Total: string;
  UR: string;
  OBC: string;
  SC: string;
  ST: string;
  EWS: string;
  INSTITUTE: string;
  COURSE: string;
}

interface ColumnVisibility {
  Subject: boolean;
  Total: boolean;
  UR: boolean;
  OBC: boolean;
  SC: boolean;
  ST: boolean;
  EWS: boolean;
  INSTITUTE: boolean;
  COURSE: boolean;
}

const INSTITUTES = [
  "AIIMS NEW DELHI",
  "AIIMS BHOPAL",
  "AIIMS JODHPUR",
  "AIIMS RISHIKESH",
  "AIIMS NAGPUR",
  "AIIMS BIBINAGAR",
  "AIIMS BATHINDA",
  "AIIMS DEOGHAR",
  "AIIMS MANGALAGIRI",
  "AIIMS KALYANI",
  "AIIMS BILASPUR",
  "AIIMS GORAKHPUR",
  "AIIMS GUWAHATI",
  "AIIMS RAJKOT",
  "AIIMS JAMMU",
  "AIIMS, RAIPUR",
  "AIIMS, RAEBARELI",
  "AIIMS, BHUBANESWAR",
  "JIPMER, PUDUCHERRY",
  "NIMHANS, BENGALURU",
  "PGIMER, Chandigarh",
  "SCTIMST Trivandrum",
];

const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
  const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    Subject: true,
    Total: true,
    UR: true,
    OBC: true,
    SC: true,
    ST: true,
    EWS: true,
    INSTITUTE: true,
    COURSE: true,
  });

  const columnDefinitions = [
    { key: "Subject" as keyof ColumnVisibility, label: "Subject" },
    { key: "Total" as keyof ColumnVisibility, label: "Total" },
    { key: "UR" as keyof ColumnVisibility, label: "UR" },
    { key: "OBC" as keyof ColumnVisibility, label: "OBC" },
    { key: "SC" as keyof ColumnVisibility, label: "SC" },
    { key: "ST" as keyof ColumnVisibility, label: "ST" },
    { key: "EWS" as keyof ColumnVisibility, label: "EWS" },
    { key: "INSTITUTE" as keyof ColumnVisibility, label: "Institute" },
    { key: "COURSE" as keyof ColumnVisibility, label: "Course" },
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
      acc[key as keyof ColumnVisibility] = key === "INSTITUTE" || key === "Subject";
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  const parseCSV = (csvText: string): SeatMatrixData[] => {
    if (csvText.includes("<html") || csvText.includes("<!DOCTYPE")) {
      throw new Error("Invalid CSV data - received HTML");
    }

    const lines = csvText.trim().split(/\r?\n/);
    const dataLines = lines.filter((line) => line.trim().length > 0);

    if (dataLines.length < 2) {
      throw new Error("Invalid CSV data - insufficient rows");
    }

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
        Subject: cleanedValues[0] || "",
        Total: cleanedValues[1] || "",
        UR: cleanedValues[2] || "",
        OBC: cleanedValues[3] || "",
        SC: cleanedValues[4] || "",
        ST: cleanedValues[5] || "",
        EWS: cleanedValues[6] || "",
        INSTITUTE: cleanedValues[7] || "",
        COURSE: cleanedValues[8] || "",
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/Seat_matrixINICET.csv");

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

        setSeatMatrixData(parsedData);
      } catch (error) {
        console.error("Error fetching INICET seat matrix data:", error);

        // Fallback data
        const fallbackData: SeatMatrixData[] = [
          {
            Subject: "Anatomy",
            Total: "10",
            UR: "5",
            OBC: "2",
            SC: "1",
            ST: "1",
            EWS: "1",
            INSTITUTE: "AIIMS NEW DELHI",
            COURSE: "MD",
          },
          {
            Subject: "General Medicine",
            Total: "15",
            UR: "7",
            OBC: "4",
            SC: "2",
            ST: "1",
            EWS: "1",
            INSTITUTE: "AIIMS BHOPAL",
            COURSE: "MD",
          },
        ];

        setSeatMatrixData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = seatMatrixData.filter((item) => {
    const matchesSearch =
      item.Subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.INSTITUTE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.COURSE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Total.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesInstitute =
      !selectedInstitute || item.INSTITUTE === selectedInstitute;
    const matchesCourse =
      selectedCourse === "all" || item.COURSE === selectedCourse;
    const matchesSubject =
      selectedSubject === "all" || item.Subject === selectedSubject;

    return matchesSearch && matchesInstitute && matchesCourse && matchesSubject;
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
  const courses = [
    "all",
    ...Array.from(new Set(seatMatrixData.map((item) => item.COURSE))),
  ].sort();
  const subjects = [
    "all",
    ...Array.from(new Set(seatMatrixData.map((item) => item.Subject))),
  ].sort();

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedInstitute("");
    setSelectedCourse("all");
    setSelectedSubject("all");
    setCurrentPage(1);
  };

  // Calculate total seats
  const totalSeats = filteredData.reduce(
    (sum, item) => sum + (parseInt(item.Total) || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading INICET Seat Matrix Data...</p>
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
                <h1 className="text-lg font-semibold">INICET Seat Matrix</h1>
                <p className="text-xs text-blue-100">
                  Institute Wise Seat Distribution
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-blue-100">
                {filteredData.length} Entries
              </span>
            </div>
          </div>
        </div>

        {/* Institute Buttons - Fixed Section */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Select Institute
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {INSTITUTES.map((institute) => {
              const instituteCount = seatMatrixData.filter(
                (item) => item.INSTITUTE === institute
              ).length;
              return (
                <button
                  key={institute}
                  onClick={() => {
                    setSelectedInstitute(
                      selectedInstitute === institute ? "" : institute
                    );
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    selectedInstitute === institute
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <div className="truncate">{institute}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">
                    {instituteCount} entries
                  </div>
                </button>
              );
            })}
          </div>
          {selectedInstitute && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-gray-600">Selected:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {selectedInstitute}
              </span>
              <button
                onClick={() => setSelectedInstitute("")}
                className="text-xs text-red-600 hover:text-red-700 underline"
              >
                Clear
              </button>
            </div>
          )}
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
                  placeholder="Search subjects, institutes, courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setShowColumnVisibility(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors whitespace-nowrap"
                >
                  <Eye className="w-4 h-4" />
                  Show/Hide
                </button>

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Course Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Course
                    </label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => {
                        setSelectedCourse(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
                    >
                      <option value="all">All Courses</option>
                      {courses
                        .filter((c) => c !== "all")
                        .map((course) => (
                          <option key={course} value={course}>
                            {course}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Subject Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
                    >
                      <option value="all">All Subjects</option>
                      {subjects
                        .filter((s) => s !== "all")
                        .map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>

                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-medium text-blue-600">
                      {filteredData.length}
                    </span>
                    <span className="ml-1">entries found</span>
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
                {totalSeats}
              </div>
              <div className="text-gray-600 text-xs">Total Seats</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {subjects.length - 1}
              </div>
              <div className="text-gray-600 text-xs">Subjects</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {INSTITUTES.length}
              </div>
              <div className="text-gray-600 text-xs">Institutes</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {courses.length - 1}
              </div>
              <div className="text-gray-600 text-xs">Courses</div>
            </div>
          </div>
        </div>

        {/* Table - Scrollable */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
              <tr>
                {columnVisibility.Subject && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Subject
                  </th>
                )}
                {columnVisibility.Total && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                )}
                {columnVisibility.UR && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    UR
                  </th>
                )}
                {columnVisibility.OBC && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    OBC
                  </th>
                )}
                {columnVisibility.SC && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    SC
                  </th>
                )}
                {columnVisibility.ST && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ST
                  </th>
                )}
                {columnVisibility.EWS && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    EWS
                  </th>
                )}
                {columnVisibility.INSTITUTE && (
                  <th className="px-2 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Institute
                  </th>
                )}
                {columnVisibility.COURSE && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Course
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
                    No data found. Try adjusting your filters or selecting an institute.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    {columnVisibility.Subject && (
                      <td className="px-2 py-2 text-left text-xs text-gray-700 font-medium">
                        {item.Subject}
                      </td>
                    )}
                    {columnVisibility.Total && (
                      <td className="px-2 py-2 text-center text-xs text-blue-600 font-bold">
                        {item.Total}
                      </td>
                    )}
                    {columnVisibility.UR && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.UR}
                      </td>
                    )}
                    {columnVisibility.OBC && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.OBC}
                      </td>
                    )}
                    {columnVisibility.SC && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.SC}
                      </td>
                    )}
                    {columnVisibility.ST && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.ST}
                      </td>
                    )}
                    {columnVisibility.EWS && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item.EWS}
                      </td>
                    )}
                    {columnVisibility.INSTITUTE && (
                      <td className="px-2 py-2 text-left text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                        {item.INSTITUTE}
                      </td>
                    )}
                    {columnVisibility.COURSE && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {item.COURSE}
                        </span>
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

export default SeatMatrixPage;