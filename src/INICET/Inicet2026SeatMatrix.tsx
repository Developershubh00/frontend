import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Eye,
  EyeOff,
  X,
  Filter,
  ChevronDown,
  Building2,
  Users,
  GraduationCap,
} from "lucide-react";

interface SeatData {
  SN: string;
  Institute: string;
  Dept: string;
  Course: string;
  "Total Seats": string;
  UR: string;
  OBC: string;
  SC: string;
  ST: string;
  EWS: string;
}

interface ColumnVisibility {
  SN: boolean;
  Institute: boolean;
  Dept: boolean;
  Course: boolean;
  "Total Seats": boolean;
  UR: boolean;
  OBC: boolean;
  SC: boolean;
  ST: boolean;
  EWS: boolean;
}

const INSTITUTES = [
  "AIIMS BATHINDA",
  "AIIMS BHOPAL",
  "AIIMS BHUBANESWAR",
  "AIIMS BIBINAGAR",
  "AIIMS BILASPUR",
  "AIIMS DEOGHAR",
  "AIIMS GORAKHPUR",
  "AIIMS GUWAHATI",
  "AIIMS JAMMU",
  "AIIMS JODHPUR",
  "AIIMS KALYANI",
  "AIIMS MANGALAGIRI",
  "AIIMS NAGPUR",
  "AIIMS NEW DELHI",
  "AIIMS PATNA",
  "AIIMS RAEBARELI",
  "AIIMS RAIPUR",
  "AIIMS RAJKOT",
  "AIIMS RISHIKESH",
  "JIPMER PUDUCHERRY",
  "NIMHANS BENGALURU",
  "PGIMER CHANDIGARH",
];

const Inicet2026SeatMatrix: React.FC = () => {
  const [selectedInstitute, setSelectedInstitute] = useState<string | null>(null);
  const [seatData, setSeatData] = useState<SeatData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    SN: true,
    Institute: false,
    Dept: true,
    Course: true,
    "Total Seats": true,
    UR: true,
    OBC: true,
    SC: true,
    ST: true,
    EWS: true,
  });

  const columnDefinitions = [
    { key: "SN" as keyof ColumnVisibility, label: "S.No" },
    { key: "Institute" as keyof ColumnVisibility, label: "Institute" },
    { key: "Dept" as keyof ColumnVisibility, label: "Department" },
    { key: "Course" as keyof ColumnVisibility, label: "Course" },
    { key: "Total Seats" as keyof ColumnVisibility, label: "Total Seats" },
    { key: "UR" as keyof ColumnVisibility, label: "UR" },
    { key: "OBC" as keyof ColumnVisibility, label: "OBC" },
    { key: "SC" as keyof ColumnVisibility, label: "SC" },
    { key: "ST" as keyof ColumnVisibility, label: "ST" },
    { key: "EWS" as keyof ColumnVisibility, label: "EWS" },
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
      acc[key as keyof ColumnVisibility] = key === "Course";
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  useEffect(() => {
    if (selectedInstitute) {
      fetchInstituteData(selectedInstitute);
    }
  }, [selectedInstitute]);

  const fetchInstituteData = async (institute: string) => {
    setLoading(true);
    try {
      const response = await fetch("/data/INICET_tentative.csv");
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      
      const filteredData = parsedData.filter(
        (item) => item.Institute === institute
      );
      
      setSeatData(filteredData);
    } catch (error) {
      console.error("Error fetching seat data:", error);
      // Fallback sample data
      setSeatData([
        {
          SN: "1",
          Institute: institute,
          Dept: "Anesthesiology",
          Course: "MD",
          "Total Seats": "12",
          UR: "6",
          OBC: "3",
          SC: "1",
          ST: "1",
          EWS: "1",
        },
        {
          SN: "2",
          Institute: institute,
          Dept: "Anatomy",
          Course: "MD",
          "Total Seats": "5",
          UR: "2",
          OBC: "2",
          SC: "0",
          ST: "0",
          EWS: "1",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (csvText: string): SeatData[] => {
    const lines = csvText.trim().split(/\r?\n/);
    const dataLines = lines.filter((line) => line.trim().length > 0);
    
    if (dataLines.length < 2) return [];

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
        SN: cleanedValues[0] || "",
        Institute: cleanedValues[1] || "",
        Dept: cleanedValues[2] || "",
        Course: cleanedValues[3] || "",
        "Total Seats": cleanedValues[4] || "",
        UR: cleanedValues[5] || "",
        OBC: cleanedValues[6] || "",
        SC: cleanedValues[7] || "",
        ST: cleanedValues[8] || "",
        EWS: cleanedValues[9] || "",
      };
    });
  };

  const filteredData = seatData.filter((item) => {
    const matchesSearch =
      item.Dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === "all" || item.Dept === selectedDept;
    const matchesCourse = selectedCourse === "all" || item.Course === selectedCourse;

    return matchesSearch && matchesDept && matchesCourse;
  });

  // Calculate totals
  const calculateTotal = (field: keyof SeatData) => {
    return filteredData.reduce((sum, item) => {
      const value = parseInt(item[field] as string) || 0;
      return sum + value;
    }, 0);
  };

  const departments = [
    "all",
    ...Array.from(new Set(seatData.map((item) => item.Dept))),
  ].sort();

  const courses = [
    "all",
    ...Array.from(new Set(seatData.map((item) => item.Course))),
  ].sort();

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDept("all");
    setSelectedCourse("all");
  };

  if (!selectedInstitute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">INICET Seat Matrix 2026</h1>
            <p className="text-blue-100">Tentative Seat Distribution - Select Institute to View Details</p>
          </div>
        </div>

        {/* Institute Selection */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Select Institute</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {INSTITUTES.map((institute) => (
                <button
                  key={institute}
                  onClick={() => setSelectedInstitute(institute)}
                  className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 hover:border-blue-400 rounded-lg p-4 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-blue-700 transition-colors">
                        {institute}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{INSTITUTES.length}</p>
                  <p className="text-sm text-gray-600">Total Institutes</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">MD/MS</p>
                  <p className="text-sm text-gray-600">Course Types</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">2026</p>
                  <p className="text-sm text-gray-600">Tentative Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Column Visibility Modal */}
      {showColumnVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Show/Hide Columns</h3>
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={showAllColumns}
                  className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  Show All
                </button>
                <button
                  onClick={hideAllColumns}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
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
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">{label}</span>
                    </label>
                    {columnVisibility[key] ? (
                      <Eye className="w-4 h-4 text-blue-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowColumnVisibility(false)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedInstitute(null)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">{selectedInstitute}</h1>
              <p className="text-sm text-blue-100">INICET Seat Matrix 2026 (Tentative)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search departments or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowColumnVisibility(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 whitespace-nowrap"
              >
                <Eye className="w-4 h-4" />
                Show/Hide
              </button>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showAdvancedFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="space-y-3 border-t pt-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Departments</option>
                  {departments.filter(d => d !== "all").map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Courses</option>
                  {courses.filter(c => c !== "all").map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm"
                >
                  Clear Filters
                </button>
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                Showing <span className="font-medium text-blue-600">{filteredData.length}</span> entries
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading seat data...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
              <tr>
                {columnVisibility.SN && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">S.No</th>
                )}
                {columnVisibility.Institute && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Institute</th>
                )}
                {columnVisibility.Dept && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                )}
                {columnVisibility.Course && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Course</th>
                )}
                {columnVisibility["Total Seats"] && (
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Total</th>
                )}
                {columnVisibility.UR && (
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">UR</th>
                )}
                {columnVisibility.OBC && (
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">OBC</th>
                )}
                {columnVisibility.SC && (
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">SC</th>
                )}
                {columnVisibility.ST && (
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">ST</th>
                )}
                {columnVisibility.EWS && (
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">EWS</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  {columnVisibility.SN && (
                    <td className="px-4 py-3 text-sm text-gray-700">{item.SN}</td>
                  )}
                  {columnVisibility.Institute && (
                    <td className="px-4 py-3 text-sm text-gray-700">{item.Institute}</td>
                  )}
                  {columnVisibility.Dept && (
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">{item.Dept}</td>
                  )}
                  {columnVisibility.Course && (
                    <td className="px-4 py-3 text-sm text-blue-600 font-medium">{item.Course}</td>
                  )}
                  {columnVisibility["Total Seats"] && (
                    <td className="px-4 py-3 text-sm text-center font-bold text-purple-600">{item["Total Seats"]}</td>
                  )}
                  {columnVisibility.UR && (
                    <td className="px-4 py-3 text-sm text-center text-gray-700">{item.UR}</td>
                  )}
                  {columnVisibility.OBC && (
                    <td className="px-4 py-3 text-sm text-center text-gray-700">{item.OBC}</td>
                  )}
                  {columnVisibility.SC && (
                    <td className="px-4 py-3 text-sm text-center text-gray-700">{item.SC}</td>
                  )}
                  {columnVisibility.ST && (
                    <td className="px-4 py-3 text-sm text-center text-gray-700">{item.ST}</td>
                  )}
                  {columnVisibility.EWS && (
                    <td className="px-4 py-3 text-sm text-center text-gray-700">{item.EWS}</td>
                  )}
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gradient-to-r from-blue-100 to-purple-100 font-bold">
                {columnVisibility.SN && (
                  <td className="px-4 py-3 text-sm text-gray-800"></td>
                )}
                {columnVisibility.Institute && (
                  <td className="px-4 py-3 text-sm text-gray-800"></td>
                )}
                {columnVisibility.Dept && (
                  <td className="px-4 py-3 text-sm text-gray-800"></td>
                )}
                {columnVisibility.Course && (
                  <td className="px-4 py-3 text-sm text-gray-800">TOTAL</td>
                )}
                {columnVisibility["Total Seats"] && (
                  <td className="px-4 py-3 text-sm text-center text-purple-700">{calculateTotal("Total Seats")}</td>
                )}
                {columnVisibility.UR && (
                  <td className="px-4 py-3 text-sm text-center text-gray-800">{calculateTotal("UR")}</td>
                )}
                {columnVisibility.OBC && (
                  <td className="px-4 py-3 text-sm text-center text-gray-800">{calculateTotal("OBC")}</td>
                )}
                {columnVisibility.SC && (
                  <td className="px-4 py-3 text-sm text-center text-gray-800">{calculateTotal("SC")}</td>
                )}
                {columnVisibility.ST && (
                  <td className="px-4 py-3 text-sm text-center text-gray-800">{calculateTotal("ST")}</td>
                )}
                {columnVisibility.EWS && (
                  <td className="px-4 py-3 text-sm text-center text-gray-800">{calculateTotal("EWS")}</td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Inicet2026SeatMatrix;