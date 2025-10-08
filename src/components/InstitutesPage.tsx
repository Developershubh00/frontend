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
  Building2,
  GraduationCap,
  Bed,
  Calendar,
} from "lucide-react";
import CustomSelect from "./CustomSelect";

interface InstitutesPageProps {
  onBack: () => void;
}

interface InstituteData {
  State: string;
  Institute: string;
  "Institute Type": string;
  University: string;
  "Year of Establishment": number;
  "Total PG Seats": number;
  "Total Hospital Beds": number;
}

interface ColumnVisibility {
  State: boolean;
  Institute: boolean;
  "Institute Type": boolean;
  University: boolean;
  "Year of Establishment": boolean;
  "Total PG Seats": boolean;
  "Total Hospital Beds": boolean;
}

const InstitutesPage: React.FC<InstitutesPageProps> = ({ onBack }) => {
  const [institutesData, setInstitutesData] = useState<InstituteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedInstType, setSelectedInstType] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  // Advanced filters
  const [yearRange, setYearRange] = useState<[number, number]>([1900, 2025]);
  const [seatsRange, setSeatsRange] = useState<[number, number]>([0, 500]);
  const [bedsRange, setBedsRange] = useState<[number, number]>([0, 5000]);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    State: true,
    Institute: true,
    "Institute Type": true,
    University: true,
    "Year of Establishment": true,
    "Total PG Seats": true,
    "Total Hospital Beds": true,
  });

  // Column definitions
  const columnDefinitions = [
    { key: 'State' as keyof ColumnVisibility, label: 'State' },
    { key: 'Institute' as keyof ColumnVisibility, label: 'Institute' },
    { key: 'Institute Type' as keyof ColumnVisibility, label: 'Institute Type' },
    { key: 'University' as keyof ColumnVisibility, label: 'University' },
    { key: 'Year of Establishment' as keyof ColumnVisibility, label: 'Year of Establishment' },
    { key: 'Total PG Seats' as keyof ColumnVisibility, label: 'Total PG Seats' },
    { key: 'Total Hospital Beds' as keyof ColumnVisibility, label: 'Total Hospital Beds' },
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

  // Hide all columns (but keep Institute visible)
  const hideAllColumns = () => {
    const allHidden = Object.keys(columnVisibility).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = key === 'Institute';
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  const parseCSV = (csvText: string): InstituteData[] => {
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

      const parseNumber = (val: string) => {
        const num = parseInt(val) || 0;
        return isNaN(num) ? 0 : num;
      };

      return {
        State: cleanedValues[0] || "",
        Institute: cleanedValues[1] || "",
        "Institute Type": cleanedValues[2] || "",
        University: cleanedValues[3] || "",
        "Year of Establishment": parseNumber(cleanedValues[4]),
        "Total PG Seats": parseNumber(cleanedValues[5]),
        "Total Hospital Beds": parseNumber(cleanedValues[6]),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/Insituites_data.csv");
        
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
        
        setInstitutesData(parsedData);
        
        // Update range filters based on actual data
        const years = parsedData.map(d => d["Year of Establishment"]).filter(y => y > 0);
        const seats = parsedData.map(d => d["Total PG Seats"]);
        const beds = parsedData.map(d => d["Total Hospital Beds"]);
        
        if (years.length > 0) {
          setYearRange([Math.min(...years), Math.max(...years)]);
        }
        if (seats.length > 0) {
          setSeatsRange([0, Math.max(...seats)]);
        }
        if (beds.length > 0) {
          setBedsRange([0, Math.max(...beds)]);
        }
        
      } catch (error) {
        console.error("Error fetching institutes data:", error);
        
        // Fallback data
        const fallbackData: InstituteData[] = [
          {
            State: "Delhi",
            Institute: "All India Institute of Medical Sciences, New Delhi",
            "Institute Type": "Government",
            University: "AIIMS",
            "Year of Establishment": 1956,
            "Total PG Seats": 350,
            "Total Hospital Beds": 2478,
          },
          {
            State: "Chandigarh",
            Institute: "Post Graduate Institute of Medical Education and Research, Chandigarh",
            "Institute Type": "Government",
            University: "PGIMER",
            "Year of Establishment": 1962,
            "Total PG Seats": 280,
            "Total Hospital Beds": 1800,
          },
        ];
        
        setInstitutesData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = institutesData.filter((item) => {
    const matchesSearch =
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["Institute Type"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.University.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === "all" || item.State === selectedState;
    const matchesInstType = selectedInstType === "all" || item["Institute Type"] === selectedInstType;
    const matchesUniversity = selectedUniversity === "all" || item.University === selectedUniversity;
    
    // Advanced filters
    const matchesYear = item["Year of Establishment"] >= yearRange[0] && item["Year of Establishment"] <= yearRange[1];
    const matchesSeats = item["Total PG Seats"] >= seatsRange[0] && item["Total PG Seats"] <= seatsRange[1];
    const matchesBeds = item["Total Hospital Beds"] >= bedsRange[0] && item["Total Hospital Beds"] <= bedsRange[1];
    
    return matchesSearch && matchesState && matchesInstType && matchesUniversity && 
           matchesYear && matchesSeats && matchesBeds;
  });

  // Pagination
  const itemsPerPage = 75;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get unique values for filters
  const states = ["all", ...Array.from(new Set(institutesData.map((item) => item.State)))];
  const instTypes = ["all", ...Array.from(new Set(institutesData.map((item) => item["Institute Type"])))];
  const universities = ["all", ...Array.from(new Set(institutesData.map((item) => item.University)))];

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedState("all");
    setSelectedInstType("all");
    setSelectedUniversity("all");
    setCurrentPage(1);
    
    // Reset advanced filters
    const years = institutesData.map(d => d["Year of Establishment"]).filter(y => y > 0);
    const seats = institutesData.map(d => d["Total PG Seats"]);
    const beds = institutesData.map(d => d["Total Hospital Beds"]);
    
    if (years.length > 0) {
      setYearRange([Math.min(...years), Math.max(...years)]);
    }
    if (seats.length > 0) {
      setSeatsRange([0, Math.max(...seats)]);
    }
    if (beds.length > 0) {
      setBedsRange([0, Math.max(...beds)]);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Institutes Data...</p>
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
                <h1 className="text-lg font-semibold">Institutes Data</h1>
                <p className="text-xs text-blue-100">NEET PG Medical Institutes</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-blue-100">
                {filteredData.length} Institutes
              </span>
            </div>
          </div>
        </div>

        {/* Quick Filters with Show/Hide Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {instTypes.filter(t => t !== "all").map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedInstType(type);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  selectedInstType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}

            <button
              onClick={() => {
                setSelectedInstType("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                selectedInstType === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Types
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
  placeholder="Search institutes, states, universities..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800 text-sm"
/>
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                {/* <select
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
                </select> */}
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
                  {/* University Filter */}
                  {/* <select
                    value={selectedUniversity}
                    onChange={(e) => {
                      setSelectedUniversity(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    {universities.map((uni) => (
                      <option key={uni} value={uni}>
                        {uni === "all" ? "All Universities" : uni}
                      </option>
                    ))}
                  </select> */}
                  <CustomSelect
  value={selectedUniversity}
  onChange={(value) => {
    setSelectedUniversity(value);
    setCurrentPage(1);
  }}
  options={universities}
  placeholder="Select University"
  allLabel="All Universities"
  menuPlacement="auto"
/>

                  {/* Year Range */}
                  <div className="flex items-center gap-2">
  <input
    type="number"
    min="1900"
    max="2025"
    value={yearRange[0]}
    onChange={(e) => setYearRange([parseInt(e.target.value) || 1900, yearRange[1]])}
    placeholder="Year From"
    className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800 text-sm"
  />
  <input
    type="number"
    min={yearRange[0]}
    max="2025"
    value={yearRange[1]}
    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value) || 2025])}
    placeholder="Year To"
    className="w-1/2 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800 text-sm"
  />
</div>

                  {/* Clear Filters Button */}
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>

                {/* Seats and Beds Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      PG Seats Range ({seatsRange[0]} - {seatsRange[1]})
                    </label>
                    <div className="flex gap-2">
  <input
    type="number"
    min="0"
    value={seatsRange[0]}
    onChange={(e) => setSeatsRange([parseInt(e.target.value) || 0, seatsRange[1]])}
    placeholder="Min"
    className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800 text-xs"
  />
  <input
    type="number"
    min={seatsRange[0]}
    value={seatsRange[1]}
    onChange={(e) => setSeatsRange([seatsRange[0], parseInt(e.target.value) || 0])}
    placeholder="Max"
    className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800 text-xs"
  />
</div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Hospital Beds Range ({bedsRange[0]} - {bedsRange[1]})
                    </label>
                    <div className="flex gap-2">
  <input
    type="number"
    min="0"
    value={bedsRange[0]}
    onChange={(e) => setBedsRange([parseInt(e.target.value) || 0, bedsRange[1]])}
    placeholder="Min"
    className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800 text-xs"
  />
  <input
    type="number"
    min={bedsRange[0]}
    value={bedsRange[1]}
    onChange={(e) => setBedsRange([bedsRange[0], parseInt(e.target.value) || 0])}
    placeholder="Max"
    className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800 text-xs"
  />
</div>
                  </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-medium text-blue-600">{filteredData.length}</span>
                  <span className="ml-1">institutes found</span>
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
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {institutesData.length}
              </div>
              <div className="text-gray-600 text-xs">Total Institutes</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {formatNumber(institutesData.reduce((sum, item) => sum + item["Total PG Seats"], 0))}
              </div>
              <div className="text-gray-600 text-xs">Total PG Seats</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Bed className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-bold text-gray-800">
                {formatNumber(institutesData.reduce((sum, item) => sum + item["Total Hospital Beds"], 0))}
              </div>
              <div className="text-gray-600 text-xs">Total Beds</div>
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
                {columnVisibility.State && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                )}
                {columnVisibility.Institute && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
                )}
                {columnVisibility["Institute Type"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                )}
                {columnVisibility.University && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">University</th>
                )}
                {columnVisibility["Year of Establishment"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Est. Year</th>
                )}
                {columnVisibility["Total PG Seats"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">PG Seats</th>
                )}
                {columnVisibility["Total Hospital Beds"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Hospital Beds</th>
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
                    {columnVisibility["Institute Type"] && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item["Institute Type"].toLowerCase().includes("government") || item["Institute Type"].toLowerCase().includes("govt") 
                            ? "bg-blue-100 text-blue-800" 
                            : item["Institute Type"].toLowerCase().includes("private")
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}>
                          {item["Institute Type"]}
                        </span>
                      </td>
                    )}
                    {columnVisibility.University && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{item.University}</td>
                    )}
                    {columnVisibility["Year of Establishment"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {item["Year of Establishment"]}
                      </td>
                    )}
                    {columnVisibility["Total PG Seats"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {formatNumber(item["Total PG Seats"])}
                      </td>
                    )}
                    {columnVisibility["Total Hospital Beds"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">
                        {formatNumber(item["Total Hospital Beds"])}
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

export default InstitutesPage;