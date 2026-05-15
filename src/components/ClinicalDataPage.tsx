

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
  MapPin,
  Stethoscope,
  Bed,
} from "lucide-react";
import CustomSelect from '../components/CustomSelect';

interface ClinicalDataPageProps {
  onBack: () => void;
}

interface ClinicalData {
  Institute: string;
  State: string;
  "Inst. Type": string;
  "Dept.": string;
  OPD: number;
  IPD: number;
  Beds: number;
  "Bed Occ.": number;
  Histopath: number;
  Cytopath: number;
  Hematology: number;
  "Clin. Path.": number;
  Biochem: number;
  "C&S": number;
  Serology: number;
  "X-Rays": number;
  USG: number;
  CT: number;
  MRI: number;
  "Major OT": number;
  "Minor OT": number;
  "Emerg. OT": number;
}

interface ColumnVisibility {
  Institute: boolean;
  State: boolean;
  "Inst. Type": boolean;
  "Dept.": boolean;
  OPD: boolean;
  IPD: boolean;
  Beds: boolean;
  "Bed Occ.": boolean;
  Histopath: boolean;
  Cytopath: boolean;
  Hematology: boolean;
  "Clin. Path.": boolean;
  Biochem: boolean;
  "C&S": boolean;
  Serology: boolean;
  "X-Rays": boolean;
  USG: boolean;
  CT: boolean;
  MRI: boolean;
  "Major OT": boolean;
  "Minor OT": boolean;
  "Emerg. OT": boolean;
}

const ClinicalDataPage: React.FC<ClinicalDataPageProps> = ({ onBack }) => {
  const [clinicalData, setClinicalData] = useState<ClinicalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedInstType, setSelectedInstType] = useState("all");
  const [selectedDept, setSelectedDept] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    Institute: true,
    State: true,
    "Inst. Type": true,
    "Dept.": true,
    OPD: true,
    IPD: true,
    Beds: true,
    "Bed Occ.": true,
    Histopath: true,
    Cytopath: true,
    Hematology: true,
    "Clin. Path.": true,
    Biochem: true,
    "C&S": true,
    Serology: true,
    "X-Rays": true,
    USG: true,
    CT: true,
    MRI: true,
    "Major OT": true,
    "Minor OT": true,
    "Emerg. OT": true,
  });

  // Column definitions
  const columnDefinitions = [
    { key: 'Institute' as keyof ColumnVisibility, label: 'Institute' },
    { key: 'State' as keyof ColumnVisibility, label: 'State' },
    { key: 'Inst. Type' as keyof ColumnVisibility, label: 'Inst. Type' },
    { key: 'Dept.' as keyof ColumnVisibility, label: 'Department' },
    { key: 'OPD' as keyof ColumnVisibility, label: 'OPD' },
    { key: 'IPD' as keyof ColumnVisibility, label: 'IPD' },
    { key: 'Beds' as keyof ColumnVisibility, label: 'Beds' },
    { key: 'Bed Occ.' as keyof ColumnVisibility, label: 'Bed Occ.' },
    { key: 'Histopath' as keyof ColumnVisibility, label: 'Histopath' },
    { key: 'Cytopath' as keyof ColumnVisibility, label: 'Cytopath' },
    { key: 'Hematology' as keyof ColumnVisibility, label: 'Hematology' },
    { key: 'Clin. Path.' as keyof ColumnVisibility, label: 'Clin. Path.' },
    { key: 'Biochem' as keyof ColumnVisibility, label: 'Biochem' },
    { key: 'C&S' as keyof ColumnVisibility, label: 'C&S' },
    { key: 'Serology' as keyof ColumnVisibility, label: 'Serology' },
    { key: 'X-Rays' as keyof ColumnVisibility, label: 'X-Rays' },
    { key: 'USG' as keyof ColumnVisibility, label: 'USG' },
    { key: 'CT' as keyof ColumnVisibility, label: 'CT' },
    { key: 'MRI' as keyof ColumnVisibility, label: 'MRI' },
    { key: 'Major OT' as keyof ColumnVisibility, label: 'Major OT' },
    { key: 'Minor OT' as keyof ColumnVisibility, label: 'Minor OT' },
    { key: 'Emerg. OT' as keyof ColumnVisibility, label: 'Emerg. OT' },
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

  const parseCSV = (csvText: string): ClinicalData[] => {
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
        Institute: cleanedValues[0] || "",
        State: cleanedValues[1] || "",
        "Inst. Type": cleanedValues[2] || "",
        "Dept.": cleanedValues[3] || "",
        OPD: parseNumber(cleanedValues[4]),
        IPD: parseNumber(cleanedValues[5]),
        Beds: parseNumber(cleanedValues[6]),
        "Bed Occ.": parseNumber(cleanedValues[7]),
        Histopath: parseNumber(cleanedValues[8]),
        Cytopath: parseNumber(cleanedValues[9]),
        Hematology: parseNumber(cleanedValues[10]),
        "Clin. Path.": parseNumber(cleanedValues[11]),
        Biochem: parseNumber(cleanedValues[12]),
        "C&S": parseNumber(cleanedValues[13]),
        Serology: parseNumber(cleanedValues[14]),
        "X-Rays": parseNumber(cleanedValues[15]),
        USG: parseNumber(cleanedValues[16]),
        CT: parseNumber(cleanedValues[17]),
        MRI: parseNumber(cleanedValues[18]),
        "Major OT": parseNumber(cleanedValues[19]),
        "Minor OT": parseNumber(cleanedValues[20]),
        "Emerg. OT": parseNumber(cleanedValues[21]),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/clinicaldata.csv");
        
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
        
        setClinicalData(parsedData);
        
      } catch (error) {
        console.error("Error fetching clinical data:", error);
        
        // Fallback data
        const fallbackData: ClinicalData[] = [
          {
            Institute: "ABVIMS (Formerly PGIMER) & Dr. RML Hospital, New Delhi",
            State: "Delhi",
            "Inst. Type": "Govt",
            "Dept.": "MBBS OVERALL",
            OPD: 146068,
            IPD: 7299,
            Beds: 1538,
            "Bed Occ.": 0,
            Histopath: 54336,
            Cytopath: 1590,
            Hematology: 544697,
            "Clin. Path.": 0,
            Biochem: 1261188,
            "C&S": 0,
            Serology: 0,
            "X-Rays": 13009,
            USG: 6404,
            CT: 3520,
            MRI: 413,
            "Major OT": 0,
            "Minor OT": 0,
            "Emerg. OT": 0,
          },
          {
            Institute: "Arunai Medical College, Thiruvannamalai",
            State: "Tamil Nadu",
            "Inst. Type": "Private",
            "Dept.": "MBBS OVERALL",
            OPD: 24519,
            IPD: 1838,
            Beds: 513,
            "Bed Occ.": 73,
            Histopath: 227,
            Cytopath: 93,
            Hematology: 14889,
            "Clin. Path.": 5034,
            Biochem: 29999,
            "C&S": 1273,
            Serology: 350,
            "X-Rays": 2939,
            USG: 993,
            CT: 271,
            MRI: 62,
            "Major OT": 0,
            "Minor OT": 0,
            "Emerg. OT": 0,
          },
        ];
        
        setClinicalData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = clinicalData.filter((item) => {
    const matchesSearch =
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["Inst. Type"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["Dept."].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === "all" || item.State === selectedState;
    const matchesInstType = selectedInstType === "all" || item["Inst. Type"] === selectedInstType;
    const matchesDept = selectedDept === "all" || item["Dept."] === selectedDept;
    
    return matchesSearch && matchesState && matchesInstType && matchesDept;
  });

  // Pagination
  const itemsPerPage = 75;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get unique values for filters
  const states = ["all", ...Array.from(new Set(clinicalData.map((item) => item.State)))];
  const instTypes = ["all", ...Array.from(new Set(clinicalData.map((item) => item["Inst. Type"])))];
  const departments = ["all", ...Array.from(new Set(clinicalData.map((item) => item["Dept."])))];

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedState("all");
    setSelectedInstType("all");
    setSelectedDept("all");
    setCurrentPage(1);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Clinical Data...</p>
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">Clinical Data</h1>
                <p className="text-xs text-blue-100">NEET PG Medical Institutes</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-blue-100">
                {filteredData.length} Records
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
                  ? "bg-blue-600 text-white"
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
                  placeholder="Search institutes, states, departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                onChange={setSelectedState}
                options={states}
                placeholder="Select State"
                allLabel="All States"
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Department Filter */}
                  {/* <select
                    value={selectedDept}
                    onChange={(e) => {
                      setSelectedDept(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept === "all" ? "All Departments" : dept}
                      </option>
                    ))}
                  </select> */}
                  <CustomSelect
                    value={selectedDept}
                    onChange={(value) => {
                    setSelectedDept(value);
                    setCurrentPage(1);
                        }}
                    options={departments}
                    placeholder="Select Department"
                    allLabel="All Departments"
                    />

                  {/* Clear Filters Button */}
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>

                  {/* Results Count */}
                  <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-medium text-blue-600">{filteredData.length}</span>
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
                {columnVisibility.Institute && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Institute</th>
                )}
                {columnVisibility.State && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                )}
                {columnVisibility["Inst. Type"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                )}
                {columnVisibility["Dept."] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Department</th>
                )}
                {columnVisibility.OPD && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">OPD</th>
                )}
                {columnVisibility.IPD && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">IPD</th>
                )}
                {columnVisibility.Beds && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
                )}
                {columnVisibility["Bed Occ."] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Bed Occ.</th>
                )}
                {columnVisibility.Histopath && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Histopath</th>
                )}
                {columnVisibility.Cytopath && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Cytopath</th>
                )}
                {columnVisibility.Hematology && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Hematology</th>
                )}
                {columnVisibility["Clin. Path."] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Clin. Path.</th>
                )}
                {columnVisibility.Biochem && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Biochem</th>
                )}
                {columnVisibility["C&S"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">C&S</th>
                )}
                {columnVisibility.Serology && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Serology</th>
                )}
                {columnVisibility["X-Rays"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">X-Rays</th>
                )}
                {columnVisibility.USG && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">USG</th>
                )}
                {columnVisibility.CT && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">CT</th>
                )}
                {columnVisibility.MRI && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">MRI</th>
                )}
                {columnVisibility["Major OT"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Major OT</th>
                )}
                {columnVisibility["Minor OT"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Minor OT</th>
                )}
                {columnVisibility["Emerg. OT"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Emerg. OT</th>
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
                    {columnVisibility.Institute && (
                      <td className="px-2 py-2 text-center text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                        {item.Institute}
                      </td>
                    )}
                    {columnVisibility.State && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{item.State}</td>
                    )}
                    {columnVisibility["Inst. Type"] && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item["Inst. Type"] === "Govt" ? "bg-blue-100 text-blue-800" :
                          item["Inst. Type"] === "Private" ? "bg-blue-100 text-blue-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {item["Inst. Type"]}
                        </span>
                      </td>
                    )}
                    {columnVisibility["Dept."] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{item["Dept."]}</td>
                    )}
                    {columnVisibility.OPD && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">{formatNumber(item.OPD)}</td>
                    )}
                    {columnVisibility.IPD && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">{formatNumber(item.IPD)}</td>
                    )}
                    {columnVisibility.Beds && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">{item.Beds.toLocaleString()}</td>
                    )}
                    {columnVisibility["Bed Occ."] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">{item["Bed Occ."]}%</td>
                    )}
                    {columnVisibility.Histopath && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item.Histopath)}</td>
                    )}
                    {columnVisibility.Cytopath && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item.Cytopath)}</td>
                    )}
                    {columnVisibility.Hematology && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item.Hematology)}</td>
                    )}
                    {columnVisibility["Clin. Path."] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item["Clin. Path."])}</td>
                    )}
                    {columnVisibility.Biochem && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item.Biochem)}</td>
                    )}
                    {columnVisibility["C&S"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item["C&S"])}</td>
                    )}
                    {columnVisibility.Serology && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item.Serology)}</td>
                    )}
                    {columnVisibility["X-Rays"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item["X-Rays"])}</td>
                    )}
                    {columnVisibility.USG && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item.USG)}</td>
                    )}
                    {columnVisibility.CT && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item.CT)}</td>
                    )}
                    {columnVisibility.MRI && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item.MRI)}</td>
                    )}
                    {columnVisibility["Major OT"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item["Major OT"])}</td>
                    )}
                    {columnVisibility["Minor OT"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item["Minor OT"])}</td>
                    )}
                    {columnVisibility["Emerg. OT"] && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{formatNumber(item["Emerg. OT"])}</td>
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

export default ClinicalDataPage;