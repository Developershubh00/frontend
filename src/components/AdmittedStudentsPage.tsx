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
  Calendar,
} from "lucide-react";

interface AdmittedStudentsPageProps {
  onBack: () => void;
}

interface StudentData {
  Year: number;
  State: string;
  Institute: string;
  Course: string;
  "Name of the Student": string;
  "State of the Student": string;
  "Admitted Through": string;
}

interface ColumnVisibility {
  Year: boolean;
  State: boolean;
  Institute: boolean;
  Course: boolean;
  "Name of the Student": boolean;
  "State of the Student": boolean;
  "Admitted Through": boolean;
}

const AdmittedStudentsPage: React.FC<AdmittedStudentsPageProps> = ({ onBack }) => {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedAdmittedThrough, setSelectedAdmittedThrough] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    Year: true,
    State: true,
    Institute: true,
    Course: true,
    "Name of the Student": true,
    "State of the Student": true,
    "Admitted Through": true,
  });

  // Column definitions
  const columnDefinitions = [
    { key: 'Year' as keyof ColumnVisibility, label: 'Year' },
    { key: 'State' as keyof ColumnVisibility, label: 'State' },
    { key: 'Institute' as keyof ColumnVisibility, label: 'Institute' },
    { key: 'Course' as keyof ColumnVisibility, label: 'Course' },
    { key: 'Name of the Student' as keyof ColumnVisibility, label: 'Name of the Student' },
    { key: 'State of the Student' as keyof ColumnVisibility, label: 'State of the Student' },
    { key: 'Admitted Through' as keyof ColumnVisibility, label: 'Admitted Through' },
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

  // Hide all columns (but keep Name of the Student visible)
  const hideAllColumns = () => {
    const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = key === 'Name of the Student';
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  const parseCSV = (csvText: string): StudentData[] => {
    if (csvText.includes('<html') || csvText.includes('<!DOCTYPE')) {
      throw new Error("Invalid CSV data - received HTML");
    }

    const lines = csvText.trim().split(/\r?\n/);
    const dataLines = lines.filter(line => line.trim().length > 0);
    
    if (dataLines.length < 2) {
      throw new Error("Invalid CSV data - insufficient rows");
    }

    const headers = dataLines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    return dataLines.slice(1).map((line) => {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      const cleanedValues = values.map(val => 
        val.replace(/^"(.*)"$/, '$1').trim()
      );

      const parseYear = (val: string) => {
        const year = parseInt(val) || 0;
        return isNaN(year) ? 0 : year;
      };

      return {
        Year: parseYear(cleanedValues[0]),
        State: cleanedValues[1] || "",
        Institute: cleanedValues[2] || "",
        Course: cleanedValues[3] || "",
        "Name of the Student": cleanedValues[4] || "",
        "State of the Student": cleanedValues[5] || "",
        "Admitted Through": cleanedValues[6] || "",
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/Admitted_students.csv");
        
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
        
        setStudentsData(parsedData);
        
      } catch (error) {
        console.error("Error fetching students data:", error);
        
        // Fallback data
        const fallbackData: StudentData[] = [
          {
            Year: 2024,
            State: "Delhi",
            Institute: "All India Institute of Medical Sciences, New Delhi",
            Course: "MD General Medicine",
            "Name of the Student": "Sample Student 1",
            "State of the Student": "Delhi",
            "Admitted Through": "All India Quota",
          },
          {
            Year: 2024,
            State: "Maharashtra",
            Institute: "Seth G.S. Medical College and KEM Hospital, Mumbai",
            Course: "MS General Surgery",
            "Name of the Student": "Sample Student 2",
            "State of the Student": "Maharashtra",
            "Admitted Through": "State Quota",
          },
        ];
        
        setStudentsData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = studentsData.filter((item) => {
    const matchesSearch =
      item["Name of the Student"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["State of the Student"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["Admitted Through"].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = selectedYear === "all" || item.Year.toString() === selectedYear;
    const matchesState = selectedState === "all" || item.State === selectedState;
    const matchesCourse = selectedCourse === "all" || item.Course === selectedCourse;
    const matchesAdmittedThrough = selectedAdmittedThrough === "all" || item["Admitted Through"] === selectedAdmittedThrough;
    
    return matchesSearch && matchesYear && matchesState && matchesCourse && matchesAdmittedThrough;
  });

  // Pagination
  const itemsPerPage = 75;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get unique values for filters
  const years = ["all", ...Array.from(new Set(studentsData.map((item) => item.Year.toString())))].sort((a, b) => {
    if (a === "all") return -1;
    if (b === "all") return 1;
    return parseInt(b) - parseInt(a);
  });
  const states = ["all", ...Array.from(new Set(studentsData.map((item) => item.State)))];
  const courses = ["all", ...Array.from(new Set(studentsData.map((item) => item.Course)))];
  const admittedThroughOptions = ["all", ...Array.from(new Set(studentsData.map((item) => item["Admitted Through"])))];

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedYear("all");
    setSelectedState("all");
    setSelectedCourse("all");
    setSelectedAdmittedThrough("all");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Admitted Students Data...</p>
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
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {columnDefinitions.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <label className="flex items-center cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={columnVisibility[key]}
                        onChange={() => toggleColumn(key)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                <h1 className="text-lg font-semibold">Admitted Students</h1>
                <p className="text-xs text-blue-100">NEET PG Admitted Students Data</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-blue-100">
                {filteredData.length} Students
              </span>
            </div>
          </div>
        </div>

        {/* Quick Filters with Show/Hide Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {years.filter(y => y !== "all").slice(0, 5).map((year) => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  selectedYear === year
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {year}
              </button>
            ))}

            <button
              onClick={() => {
                setSelectedYear("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                selectedYear === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Years
            </button>

            {/* Show/Hide Button */}
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
                  placeholder="Search students, institutes, courses, states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white min-w-[120px]"
                >
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state === "all" ? "All States" : state}
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
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="space-y-3 border-t pt-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

                  {/* Admitted Through Filter */}
                  <select
                    value={selectedAdmittedThrough}
                    onChange={(e) => {
                      setSelectedAdmittedThrough(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    {admittedThroughOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === "all" ? "All Admission Types" : option}
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
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-medium text-blue-600">{filteredData.length}</span>
                  <span className="ml-1">students found</span>
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
                {studentsData.length}
              </div>
              <div className="text-gray-600 text-xs">Total Students</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
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
                {Array.from(new Set(studentsData.map(s => s.Institute))).length}
              </div>
              <div className="text-gray-600 text-xs">Institutes</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {states.length - 1}
              </div>
              <div className="text-gray-600 text-xs">States</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 sticky top-0">
              <tr>
                {columnVisibility.Year && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Year</th>
                )}
                {columnVisibility.State && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                )}
                {columnVisibility.Institute && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
                )}
                {columnVisibility.Course && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                )}
                {columnVisibility["Name of the Student"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Student Name</th>
                )}
                {columnVisibility["State of the Student"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Student State</th>
                )}
                {columnVisibility["Admitted Through"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Admitted Through</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={Object.values(columnVisibility).filter(Boolean).length} className="px-6 py-8 text-center text-gray-500">
                    No data found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    {columnVisibility.Year && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700 font-medium">
                        {item.Year}
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
                    {columnVisibility["Name of the Student"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {item["Name of the Student"]}
                      </td>
                    )}
                    {columnVisibility["State of the Student"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">
                        {item["State of the Student"]}
                      </td>
                    )}
                    {columnVisibility["Admitted Through"] && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item["Admitted Through"].toLowerCase().includes("all india") 
                            ? "bg-blue-100 text-blue-800" 
                            : item["Admitted Through"].toLowerCase().includes("state")
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}>
                          {item["Admitted Through"]}
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
              Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
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
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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

export default AdmittedStudentsPage;