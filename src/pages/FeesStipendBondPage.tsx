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
} from "lucide-react";

interface FeesStipendBondPageProps {
  onBack: () => void;
}

interface FeesData {
  State: string;
  Institute: string;
  "Institute Type": string;
  Course: string;
  Quota: string;
  "Hosp Beds": number;
  "Course Fee": number;
  "Stipend Year 1": number;
  "Stipend Year 2": number;
  "Stipend Year 3": number;
  Bond: string;
  "Bond Penalty": string;
}

interface ColumnVisibility {
  State: boolean;
  Institute: boolean;
  "Institute Type": boolean;
  Course: boolean;
  Quota: boolean;
  "Hosp Beds": boolean;
  "Course Fee": boolean;
  "Stipend Year 1": boolean;
  "Stipend Year 2": boolean;
  "Stipend Year 3": boolean;
  Bond: boolean;
  "Bond Penalty": boolean;
}

const CustomSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  allLabel: string;
}> = ({ value, onChange, options, placeholder, allLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-w-[150px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-left flex items-center justify-between"
      >
        <span className="text-gray-700 truncate">
          {value === "all" ? allLabel : value}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="overflow-y-auto max-h-48">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                    value === option ? "bg-blue-100 text-blue-700" : "text-gray-700"
                  }`}
                >
                  {option === "all" ? allLabel : option}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FeesStipendBondPage: React.FC<FeesStipendBondPageProps> = ({ onBack }) => {
  const [feesData, setFeesData] = useState<FeesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedInstType, setSelectedInstType] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    State: true,
    Institute: true,
    "Institute Type": true,
    Course: true,
    Quota: true,
    "Hosp Beds": true,
    "Course Fee": true,
    "Stipend Year 1": true,
    "Stipend Year 2": true,
    "Stipend Year 3": true,
    Bond: true,
    "Bond Penalty": true,
  });

  const columnDefinitions = [
    { key: 'State' as keyof ColumnVisibility, label: 'State' },
    { key: 'Institute' as keyof ColumnVisibility, label: 'Institute' },
    { key: 'Institute Type' as keyof ColumnVisibility, label: 'Institute Type' },
    { key: 'Course' as keyof ColumnVisibility, label: 'Course' },
    { key: 'Quota' as keyof ColumnVisibility, label: 'Quota' },
    { key: 'Hosp Beds' as keyof ColumnVisibility, label: 'Hospital Beds' },
    { key: 'Course Fee' as keyof ColumnVisibility, label: 'Course Fee' },
    { key: 'Stipend Year 1' as keyof ColumnVisibility, label: 'Stipend Year 1' },
    { key: 'Stipend Year 2' as keyof ColumnVisibility, label: 'Stipend Year 2' },
    { key: 'Stipend Year 3' as keyof ColumnVisibility, label: 'Stipend Year 3' },
    { key: 'Bond' as keyof ColumnVisibility, label: 'Bond' },
    { key: 'Bond Penalty' as keyof ColumnVisibility, label: 'Bond Penalty' },
  ];

  const toggleColumn = (columnKey: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
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
      acc[key as keyof ColumnVisibility] = key === 'Institute';
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  const parseCSV = (csvText: string): FeesData[] => {
    if (csvText.includes('<html') || csvText.includes('<!DOCTYPE')) {
      throw new Error("Invalid CSV data - received HTML");
    }

    const lines = csvText.trim().split(/\r?\n/);
    const dataLines = lines.filter(line => line.trim().length > 0);
    
    if (dataLines.length < 2) {
      throw new Error("Invalid CSV data - insufficient rows");
    }
    
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
        const num = parseFloat(val.replace(/[^0-9.-]/g, '')) || 0;
        return isNaN(num) ? 0 : num;
      };

      return {
        State: cleanedValues[0] || "",
        Institute: cleanedValues[1] || "",
        "Institute Type": cleanedValues[2] || "",
        Course: cleanedValues[3] || "",
        Quota: cleanedValues[4] || "",
        "Hosp Beds": parseNumber(cleanedValues[5]),
        "Course Fee": parseNumber(cleanedValues[6]),
        "Stipend Year 1": parseNumber(cleanedValues[7]),
        "Stipend Year 2": parseNumber(cleanedValues[8]),
        "Stipend Year 3": parseNumber(cleanedValues[9]),
        Bond: cleanedValues[10] || "",
        "Bond Penalty": cleanedValues[11] || "",
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/feestiphendbond.csv");
        
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
        
        setFeesData(parsedData);
        
      } catch (error) {
        console.error("Error fetching fees data:", error);
        
        const fallbackData: FeesData[] = [
          {
            State: "Delhi",
            Institute: "ABVIMS & Dr. RML Hospital",
            "Institute Type": "Govt",
            Course: "MD/MS",
            Quota: "All India",
            "Hosp Beds": 1538,
            "Course Fee": 50000,
            "Stipend Year 1": 65000,
            "Stipend Year 2": 70000,
            "Stipend Year 3": 75000,
            Bond: "Yes - 2 Years",
            "Bond Penalty": "25 Lakhs",
          },
          {
            State: "Tamil Nadu",
            Institute: "Arunai Medical College",
            "Institute Type": "Private",
            Course: "MD/MS",
            Quota: "Management",
            "Hosp Beds": 513,
            "Course Fee": 2500000,
            "Stipend Year 1": 50000,
            "Stipend Year 2": 55000,
            "Stipend Year 3": 60000,
            Bond: "No",
            "Bond Penalty": "N/A",
          },
        ];
        
        setFeesData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = feesData.filter((item) => {
    const matchesSearch =
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["Institute Type"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Quota.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === "all" || item.State === selectedState;
    const matchesInstType = selectedInstType === "all" || item["Institute Type"] === selectedInstType;
    const matchesCourse = selectedCourse === "all" || item.Course === selectedCourse;
    const matchesQuota = selectedQuota === "all" || item.Quota === selectedQuota;
    
    const matchesFeeRange = 
      (!minFee || item["Course Fee"] >= parseFloat(minFee)) &&
      (!maxFee || item["Course Fee"] <= parseFloat(maxFee));
    
    const matchesBedsRange = 
      (!minBeds || item["Hosp Beds"] >= parseFloat(minBeds)) &&
      (!maxBeds || item["Hosp Beds"] <= parseFloat(maxBeds));
    
    return matchesSearch && matchesState && matchesInstType && matchesCourse && matchesQuota && matchesFeeRange && matchesBedsRange;
  });

  const itemsPerPage = 50;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const states = ["all", ...Array.from(new Set(feesData.map((item) => item.State)))];
  const instTypes = ["all", ...Array.from(new Set(feesData.map((item) => item["Institute Type"])))];
  const courses = ["all", ...Array.from(new Set(feesData.map((item) => item.Course)))];
  const quotas = ["all", ...Array.from(new Set(feesData.map((item) => item.Quota)))];

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedState("all");
    setSelectedInstType("all");
    setSelectedCourse("all");
    setSelectedQuota("all");
    setMinFee("");
    setMaxFee("");
    setMinBeds("");
    setMaxBeds("");
    setCurrentPage(1);
  };

  const formatCurrency = (num: number): string => {
    if (num >= 10000000) return '₹' + (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return '₹' + (num / 100000).toFixed(2) + ' L';
    if (num >= 1000) return '₹' + (num / 1000).toFixed(2) + ' K';
    return '₹' + num.toLocaleString();
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Fees & Stipend Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
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

      <div className="flex-1 flex flex-col">
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
                <h1 className="text-lg font-semibold">Fees, Stipend & Bond</h1>
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
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Types
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

        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search institutes, states, courses, quota..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

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
                />

                <CustomSelect
                  value={selectedCourse}
                  onChange={(value) => {
                    setSelectedCourse(value);
                    setCurrentPage(1);
                  }}
                  options={courses}
                  placeholder="Select Course"
                  allLabel="All Courses"
                />

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

            {showAdvancedFilters && (
              <div className="space-y-3 border-t pt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <CustomSelect
                    value={selectedQuota}
                    onChange={(value) => {
                      setSelectedQuota(value);
                      setCurrentPage(1);
                    }}
                    options={quotas}
                    placeholder="Select Quota"
                    allLabel="All Quotas"
                  />

                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min Fee"
                      value={minFee}
                      onChange={(e) => {
                        setMinFee(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max Fee"
                      value={maxFee}
                      onChange={(e) => {
                        setMaxFee(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min Beds"
                      value={minBeds}
                      onChange={(e) => {
                        setMinBeds(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max Beds"
                      value={maxBeds}
                      onChange={(e) => {
                        setMaxBeds(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>

                <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-medium text-blue-600">{filteredData.length}</span>
                  <span className="ml-1">filtered results</span>
                </div>
              </div>
            )}
          </div>
        </div>

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
                {columnVisibility.Course && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                )}
                {columnVisibility.Quota && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
                )}
                {columnVisibility["Hosp Beds"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Beds</th>
                )}
                {columnVisibility["Course Fee"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Course Fee</th>
                )}
                {columnVisibility["Stipend Year 1"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend Y1</th>
                )}
                {columnVisibility["Stipend Year 2"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend Y2</th>
                )}
                {columnVisibility["Stipend Year 3"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Stipend Y3</th>
                )}
                {columnVisibility.Bond && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Bond</th>
                )}
                {columnVisibility["Bond Penalty"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Penalty</th>
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
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{item.State}</td>
                    )}
                    {columnVisibility.Institute && (
                      <td className="px-2 py-2 text-left text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                        {item.Institute}
                      </td>
                    )}
                    {columnVisibility["Institute Type"] && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item["Institute Type"] === "Govt" ? "bg-blue-100 text-blue-800" :
                          item["Institute Type"] === "Private" ? "bg-blue-100 text-blue-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {item["Institute Type"]}
                        </span>
                      </td>
                    )}
                    {columnVisibility.Course && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{item.Course}</td>
                    )}
                    {columnVisibility.Quota && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          {item.Quota}
                        </span>
                      </td>
                    )}
                    {columnVisibility["Hosp Beds"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-gray-900">{formatNumber(item["Hosp Beds"])}</td>
                    )}
                    {columnVisibility["Course Fee"] && (
                      <td className="px-2 py-2 text-center text-xs font-bold text-blue-700">{formatCurrency(item["Course Fee"])}</td>
                    )}
                    {columnVisibility["Stipend Year 1"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{formatCurrency(item["Stipend Year 1"])}</td>
                    )}
                    {columnVisibility["Stipend Year 2"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{formatCurrency(item["Stipend Year 2"])}</td>
                    )}
                    {columnVisibility["Stipend Year 3"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{formatCurrency(item["Stipend Year 3"])}</td>
                    )}
                    {columnVisibility.Bond && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.Bond.toLowerCase().includes("no") || item.Bond.toLowerCase() === "n/a" 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {item.Bond}
                        </span>
                      </td>
                    )}
                    {columnVisibility["Bond Penalty"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-red-600">{item["Bond Penalty"]}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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

export default FeesStipendBondPage;