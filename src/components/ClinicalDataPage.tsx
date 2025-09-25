import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Activity,
  Building2,
  Filter,
  Search,
  Eye,
  EyeOff,
  Settings,
  MapPin,
  Stethoscope,
  Bed,
  Users,
  ChevronDown,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";

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

const ClinicalDataPage: React.FC<ClinicalDataPageProps> = ({ onBack }) => {
  const [clinicalData, setClinicalData] = useState<ClinicalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedInstType, setSelectedInstType] = useState("all");
  const [selectedDept, setSelectedDept] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showColumnToggle, setShowColumnToggle] = useState(false);

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
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

  const parseCSV = (csvText: string): ClinicalData[] => {
    if (csvText.includes('<html') || csvText.includes('<!DOCTYPE')) {
      console.error("Received HTML instead of CSV data");
      throw new Error("Invalid CSV data - received HTML");
    }

    const lines = csvText.trim().split(/\r?\n/);
    const dataLines = lines.filter(line => line.trim().length > 0);
    
    if (dataLines.length < 2) {
      console.error("CSV file appears to be empty or has no data rows");
      throw new Error("Invalid CSV data - insufficient rows");
    }

    const headers = dataLines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    console.log("CSV Headers:", headers);
    
    return dataLines.slice(1).map((line, index) => {
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
        setLoadingProgress(20);
        console.log("Attempting to fetch clinical data...");
        
        const response = await fetch("/data/clinicaldata.csv");
        setLoadingProgress(40);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        setLoadingProgress(60);
        
        console.log("CSV content preview:", csvText.substring(0, 200));
        
        if (!csvText || csvText.trim().length === 0) {
          throw new Error("Empty CSV file");
        }
        
        const parsedData = parseCSV(csvText);
        setLoadingProgress(90);
        
        if (parsedData.length === 0) {
          throw new Error("No valid data parsed from CSV");
        }
        
        setClinicalData(parsedData);
        setLoadingProgress(100);
        console.log("Successfully loaded", parsedData.length, "clinical records from CSV");
        
      } catch (error) {
        console.error("Error fetching clinical data:", error);
        console.log("Loading fallback demo data...");
        
        // Enhanced fallback data
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
            Institute: "ABVIMS (Formerly PGIMER) & Dr. RML Hospital, New Delhi",
            State: "Delhi",
            "Inst. Type": "Govt",
            "Dept.": "MD ANAESTHESIOLOGY",
            OPD: 0,
            IPD: 0,
            Beds: 0,
            "Bed Occ.": 0,
            Histopath: 0,
            Cytopath: 0,
            Hematology: 0,
            "Clin. Path.": 0,
            Biochem: 0,
            "C&S": 0,
            Serology: 0,
            "X-Rays": 0,
            USG: 0,
            CT: 0,
            MRI: 1414,
            "Major OT": 4419,
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
          {
            Institute: "Arunai Medical College, Thiruvannamalai",
            State: "Tamil Nadu",
            "Inst. Type": "Private",
            "Dept.": "MD DERMATOLOGY",
            OPD: 1131,
            IPD: 47,
            Beds: 10,
            "Bed Occ.": 67,
            Histopath: 0,
            Cytopath: 0,
            Hematology: 596,
            "Clin. Path.": 201,
            Biochem: 1200,
            "C&S": 104,
            Serology: 64,
            "X-Rays": 3,
            USG: 0,
            CT: 0,
            MRI: 0,
            "Major OT": 0,
            "Minor OT": 0,
            "Emerg. OT": 0,
          },
          {
            Institute: "Arunai Medical College, Thiruvannamalai",
            State: "Tamil Nadu",
            "Inst. Type": "Private",
            "Dept.": "MD GENERAL MEDICINE",
            OPD: 6197,
            IPD: 563,
            Beds: 132,
            "Bed Occ.": 71,
            Histopath: 0,
            Cytopath: 0,
            Hematology: 4467,
            "Clin. Path.": 1510,
            Biochem: 8216,
            "C&S": 447,
            Serology: 480,
            "X-Rays": 888,
            USG: 338,
            CT: 92,
            MRI: 7,
            "Major OT": 0,
            "Minor OT": 0,
            "Emerg. OT": 0,
          },
        ];
        
        setClinicalData(fallbackData);
        setLoadingProgress(100);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedState, selectedInstType, selectedDept]);

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

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get unique values for filters
  const states = ["all", ...Array.from(new Set(clinicalData.map((item) => item.State)))];
  const instTypes = ["all", ...Array.from(new Set(clinicalData.map((item) => item["Inst. Type"])))];
  const departments = ["all", ...Array.from(new Set(clinicalData.map((item) => item["Dept."])))];

  const toggleColumn = (columnKey: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const getInstTypeBadgeColor = (instType: string) => {
    switch (instType) {
      case "Govt":
        return "bg-blue-100 text-blue-800";
      case "Private":
        return "bg-green-100 text-green-800";
      case "Deemed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="w-64 bg-slate-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-slate-600">Loading Clinical Data... {loadingProgress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Clinical Data</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowColumnToggle(!showColumnToggle)}
              className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Show/Hide Columns</span>
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Filters */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out`}>
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-lg font-bold text-slate-800">Filters</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="hidden lg:flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800">Filters</h2>
            </div>

            {/* Search Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search institutes, states, departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800"
                />
              </div>
            </div>

            {/* State Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-800"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state === "all" ? "All States" : state}
                  </option>
                ))}
              </select>
            </div>

            {/* Institute Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Institute Type
              </label>
              <select
                value={selectedInstType}
                onChange={(e) => setSelectedInstType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-800"
              >
                {instTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-800"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Column Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowColumnToggle(!showColumnToggle)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Show/Hide Columns</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white mb-8 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Clinical Data Analytics</h2>
              <p className="text-indigo-100 text-lg">
                Comprehensive clinical data across medical institutions
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-2">
                {Array.from(new Set(clinicalData.map(item => item.Institute))).length}
              </div>
              <div className="text-slate-600 text-sm">Total Institutes</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-2">
                {states.length - 1}
              </div>
              <div className="text-slate-600 text-sm">States</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-2">
                {departments.length - 1}
              </div>
              <div className="text-slate-600 text-sm">Departments</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bed className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-2">
                {clinicalData.reduce((sum, item) => sum + item.Beds, 0).toLocaleString()}
              </div>
              <div className="text-slate-600 text-sm">Total Beds</div>
            </div>
          </div>

          {/* Column Toggle Panel */}
          {showColumnToggle && (
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg mb-8 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Show/Hide Columns</h3>
                <button
                  onClick={() => setShowColumnToggle(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Object.entries(visibleColumns).map(([key, visible]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={() => toggleColumn(key as keyof typeof visibleColumns)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 truncate">{key}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Clinical Data Table */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">
                  Clinical Data Records
                </h3>
                <div className="text-sm text-slate-600">
                  Showing {filteredData.length} of {clinicalData.length} records
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
                  <tr>
                    {visibleColumns.Institute && (
                      <th className="px-4 py-4 text-left font-semibold min-w-80">Institute</th>
                    )}
                    {visibleColumns.State && (
                      <th className="px-4 py-4 text-left font-semibold min-w-32">State</th>
                    )}
                    {visibleColumns["Inst. Type"] && (
                      <th className="px-4 py-4 text-left font-semibold min-w-28">Inst. Type</th>
                    )}
                    {visibleColumns["Dept."] && (
                      <th className="px-4 py-4 text-left font-semibold min-w-48">Dept.</th>
                    )}
                    {visibleColumns.OPD && (
                      <th className="px-4 py-4 text-right font-semibold min-w-20">OPD</th>
                    )}
                    {visibleColumns.IPD && (
                      <th className="px-4 py-4 text-right font-semibold min-w-20">IPD</th>
                    )}
                    {visibleColumns.Beds && (
                      <th className="px-4 py-4 text-right font-semibold min-w-20">Beds</th>
                    )}
                    {visibleColumns["Bed Occ."] && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Bed Occ.</th>
                    )}
                    {visibleColumns.Histopath && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Histopath</th>
                    )}
                    {visibleColumns.Cytopath && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Cytopath</th>
                    )}
                    {visibleColumns.Hematology && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Hematology</th>
                    )}
                    {visibleColumns["Clin. Path."] && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Clin. Path.</th>
                    )}
                    {visibleColumns.Biochem && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Biochem</th>
                    )}
                    {visibleColumns["C&S"] && (
                      <th className="px-4 py-4 text-right font-semibold min-w-20">C&S</th>
                    )}
                    {visibleColumns.Serology && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Serology</th>
                    )}
                    {visibleColumns["X-Rays"] && (
                      <th className="px-4 py-4 text-right font-semibold min-w-20">X-Rays</th>
                    )}
                    {visibleColumns.USG && (
                      <th className="px-4 py-4 text-right font-semibold min-w-20">USG</th>
                    )}
                    {visibleColumns.CT && (
                      <th className="px-4 py-4 text-right font-semibold min-w-16">CT</th>
                    )}
                    {visibleColumns.MRI && (
                      <th className="px-4 py-4 text-right font-semibold min-w-16">MRI</th>
                    )}
                    {visibleColumns["Major OT"] && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Major OT</th>
                    )}
                    {visibleColumns["Minor OT"] && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Minor OT</th>
                    )}
                    {visibleColumns["Emerg. OT"] && (
                      <th className="px-4 py-4 text-right font-semibold min-w-24">Emerg. OT</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? "bg-white/50" : "bg-slate-50/50"
                      }`}
                    >
                      {visibleColumns.Institute && (
                        <td className="px-4 py-4">
                          <div className="font-medium text-slate-800 text-sm max-w-80 truncate" title={item.Institute}>
                            {item.Institute}
                          </div>
                        </td>
                      )}
                      {visibleColumns.State && (
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                            <span className="text-slate-700 text-sm">{item.State}</span>
                          </div>
                        </td>
                      )}
                      {visibleColumns["Inst. Type"] && (
                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getInstTypeBadgeColor(
                              item["Inst. Type"]
                            )}`}
                          >
                            {item["Inst. Type"]}
                          </span>
                        </td>
                      )}
                      {visibleColumns["Dept."] && (
                        <td className="px-4 py-4">
                          <div className="text-slate-700 text-sm max-w-48 truncate" title={item["Dept."]}>
                            {item["Dept."]}
                          </div>
                        </td>
                      )}
                      {visibleColumns.OPD && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.OPD.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.IPD && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.IPD.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.Beds && (
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end">
                            <Bed className="w-4 h-4 text-slate-400 mr-1" />
                            <span className="font-medium text-slate-800 text-sm">
                              {item.Beds.toLocaleString()}
                            </span>
                          </div>
                        </td>
                      )}
                      {visibleColumns["Bed Occ."] && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item["Bed Occ."].toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.Histopath && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.Histopath.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.Cytopath && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.Cytopath.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.Hematology && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.Hematology.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns["Clin. Path."] && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item["Clin. Path."].toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.Biochem && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.Biochem.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns["C&S"] && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item["C&S"].toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.Serology && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.Serology.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns["X-Rays"] && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item["X-Rays"].toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.USG && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.USG.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.CT && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.CT.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns.MRI && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item.MRI.toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns["Major OT"] && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item["Major OT"].toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns["Minor OT"] && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item["Minor OT"].toLocaleString()}
                          </span>
                        </td>
                      )}
                      {visibleColumns["Emerg. OT"] && (
                        <td className="px-4 py-4 text-right">
                          <span className="font-medium text-slate-800 text-sm">
                            {item["Emerg. OT"].toLocaleString()}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 px-6 py-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-2 text-sm font-medium text-slate-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* No Results Message */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No clinical data found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ClinicalDataPage;