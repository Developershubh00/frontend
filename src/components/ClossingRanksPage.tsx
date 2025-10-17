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

interface ClossingRanksPageProps {
  onBack: () => void;
}

interface RanksData {
  "Alloted Quota": string;
  "Alloted Category": string;
  State: string;
  College: string;
  Course: string;
  "Course Fee": number;
  "2024 R1": string;  // Change from number to string
  "2024 R2": string;  // Change from number to string
  "2024 R3": string;  // Change from number to string
  "2024 R4": string;  // Change from number to string
  "2024 R5": string;  // Change from number to string
  "2023 R1": string;  // Change from number to string
  "2023 R2": string;  // Change from number to string
  "2023 R3": string;  // Change from number to string
  "2023 R4": string;  // Change from number to string
  "2022 R1": string;  // Change from number to string
  "2022 R2": string;  // Change from number to string
  "2022 R3": string;  // Change from number to string
  "2022 R4": string;  // Change from number to string
}

interface ColumnVisibility {
  "Alloted Quota": boolean;
  "Alloted Category": boolean;
  State: boolean;
  College: boolean;
  Course: boolean;
  "Course Fee": boolean;
  "2024 R1": boolean;
  "2024 R2": boolean;
  "2024 R3": boolean;
  "2024 R4": boolean;
  "2024 R5": boolean;
  "2023 R1": boolean;
  "2023 R2": boolean;
  "2023 R3": boolean;
  "2023 R4": boolean;
  "2022 R1": boolean;
  "2022 R2": boolean;
  "2022 R3": boolean;
  "2022 R4": boolean;
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
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white text-left flex items-center justify-between"
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
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-50 ${
                    value === option ? "bg-purple-100 text-purple-700" : "text-gray-700"
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

const ClossingRanksPage: React.FC<ClossingRanksPageProps> = ({ onBack }) => {
  const [ranksData, setRanksData] = useState<RanksData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minRank, setMinRank] = useState("");
  const [maxRank, setMaxRank] = useState("");

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    "Alloted Quota": true,
    "Alloted Category": true,
    State: true,
    College: true,
    Course: true,
    "Course Fee": true,
    "2024 R1": true,
    "2024 R2": true,
    "2024 R3": true,
    "2024 R4": true,
    "2024 R5": true,
    "2023 R1": true,
    "2023 R2": true,
    "2023 R3": true,
    "2023 R4": true,
    "2022 R1": true,
    "2022 R2": true,
    "2022 R3": true,
    "2022 R4": true,
  });

  const columnDefinitions = [
    { key: 'Alloted Quota' as keyof ColumnVisibility, label: 'Alloted Quota' },
    { key: 'Alloted Category' as keyof ColumnVisibility, label: 'Alloted Category' },
    { key: 'State' as keyof ColumnVisibility, label: 'State' },
    { key: 'College' as keyof ColumnVisibility, label: 'College' },
    { key: 'Course' as keyof ColumnVisibility, label: 'Course' },
    { key: 'Course Fee' as keyof ColumnVisibility, label: 'Course Fee' },
    { key: '2024 R1' as keyof ColumnVisibility, label: '2024 Round 1' },
    { key: '2024 R2' as keyof ColumnVisibility, label: '2024 Round 2' },
    { key: '2024 R3' as keyof ColumnVisibility, label: '2024 Round 3' },
    { key: '2024 R4' as keyof ColumnVisibility, label: '2024 Round 4' },
    { key: '2024 R5' as keyof ColumnVisibility, label: '2024 Round 5' },
    { key: '2023 R1' as keyof ColumnVisibility, label: '2023 Round 1' },
    { key: '2023 R2' as keyof ColumnVisibility, label: '2023 Round 2' },
    { key: '2023 R3' as keyof ColumnVisibility, label: '2023 Round 3' },
    { key: '2023 R4' as keyof ColumnVisibility, label: '2023 Round 4' },
    { key: '2022 R1' as keyof ColumnVisibility, label: '2022 Round 1' },
    { key: '2022 R2' as keyof ColumnVisibility, label: '2022 Round 2' },
    { key: '2022 R3' as keyof ColumnVisibility, label: '2022 Round 3' },
    { key: '2022 R4' as keyof ColumnVisibility, label: '2022 Round 4' },
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
      acc[key as keyof ColumnVisibility] = key === 'College' || key === 'Course';
      return acc;
    }, {} as ColumnVisibility);
    setColumnVisibility(allHidden);
  };

  const parseCSV = (csvText: string): RanksData[] => {
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
        if (!val || val === 'N/A' || val === '-' || val === '') return 0;
        const num = parseFloat(val.replace(/[^0-9.-]/g, '')) || 0;
        return isNaN(num) ? 0 : num;
      };

      return {
        "Alloted Quota": cleanedValues[0] || "",
        "Alloted Category": cleanedValues[1] || "",
        State: cleanedValues[2] || "",
        College: cleanedValues[3] || "",
        Course: cleanedValues[4] || "",
        "Course Fee": parseNumber(cleanedValues[5]),
        "2024 R1": (cleanedValues[6]),
        "2024 R2": (cleanedValues[7]),
        "2024 R3": (cleanedValues[8]),
        "2024 R4": (cleanedValues[9]),
        "2024 R5": (cleanedValues[10]),
        "2023 R1": (cleanedValues[11]),
        "2023 R2": (cleanedValues[12]),
        "2023 R3": (cleanedValues[13]),
        "2023 R4": (cleanedValues[14]),
        "2022 R1": (cleanedValues[15]),
        "2022 R2": (cleanedValues[16]),
        "2022 R3": (cleanedValues[17]),
        "2022 R4": (cleanedValues[18]),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/closingranks2.csv");
        
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
        
        setRanksData(parsedData);
        
      } catch (error) {
        console.error("Error fetching closing ranks data:", error);
        
        const fallbackData: RanksData[] = [
          {
  "Alloted Quota": "All India",
  "Alloted Category": "General",
  State: "Delhi",
  College: "ABVIMS & Dr. RML Hospital",
  Course: "MD - Anaesthesiology",
  "Course Fee": 50000,
  "2024 R1": "1234 (1)",
  "2024 R2": "1456 (2)",
  "2024 R3": "1567 (3)",
  "2024 R4": "1678 (4)",
  "2024 R5": "1789 (5)",
  "2023 R1": "1345 (1)",
  "2023 R2": "1567 (2)",
  "2023 R3": "1678 (3)",
  "2023 R4": "1789 (4)",
  "2022 R1": "1456 (1)",
  "2022 R2": "1678 (2)",
  "2022 R3": "1789 (3)",
  "2022 R4": "1890 (4)",
}
        ];
        
        setRanksData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = ranksData.filter((item) => {
    const matchesSearch =
      item.College.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["Alloted Quota"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["Alloted Category"].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === "all" || item.State === selectedState;
    const matchesQuota = selectedQuota === "all" || item["Alloted Quota"] === selectedQuota;
    const matchesCategory = selectedCategory === "all" || item["Alloted Category"] === selectedCategory;
    const matchesCourse = selectedCourse === "all" || item.Course === selectedCourse;
    
    const matchesFeeRange = 
      (!minFee || item["Course Fee"] >= parseFloat(minFee)) &&
      (!maxFee || item["Course Fee"] <= parseFloat(maxFee));
    
    const allRanks = [
    item["2024 R1"], item["2024 R2"], item["2024 R3"], item["2024 R4"], item["2024 R5"],
    item["2023 R1"], item["2023 R2"], item["2023 R3"], item["2023 R4"],
    item["2022 R1"], item["2022 R2"], item["2022 R3"], item["2022 R4"]
    ].map(r => {
  const match = r.match(/\d+/);  // Extract number from string like "103 (4)"
  return match ? parseInt(match[0]) : 0;
    }).filter(r => r > 0);

    const minRankValue = allRanks.length > 0 ? Math.min(...allRanks) : 0;
    const maxRankValue = allRanks.length > 0 ? Math.max(...allRanks) : 0;

  const matchesRankRange = 
    (!minRank || maxRankValue >= parseFloat(minRank)) &&
    (!maxRank || minRankValue <= parseFloat(maxRank));
    
    return matchesSearch && matchesState && matchesQuota && matchesCategory && matchesCourse && matchesFeeRange && matchesRankRange;
  });

  const itemsPerPage = 50;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const states = ["all", ...Array.from(new Set(ranksData.map((item) => item.State)))];
  const quotas = ["all", ...Array.from(new Set(ranksData.map((item) => item["Alloted Quota"])))];
  const categories = ["all", ...Array.from(new Set(ranksData.map((item) => item["Alloted Category"])))];
  const courses = ["all", ...Array.from(new Set(ranksData.map((item) => item.Course)))];

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedState("all");
    setSelectedQuota("all");
    setSelectedCategory("all");
    setSelectedCourse("all");
    setMinFee("");
    setMaxFee("");
    setMinRank("");
    setMaxRank("");
    setCurrentPage(1);
  };

  const formatCurrency = (num: number): string => {
    if (num === 0) return 'N/A';
    if (num >= 10000000) return '₹' + (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return '₹' + (num / 100000).toFixed(2) + ' L';
    if (num >= 1000) return '₹' + (num / 1000).toFixed(2) + ' K';
    return '₹' + num.toLocaleString();
  };

  const formatRank = (value: string): string => {
  if (!value || value === '-' || value === '') return '-';
  return value;  // Return as-is to preserve brackets
};

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Closing Ranks Data...</p>
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
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {columnDefinitions.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <label className="flex items-center cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={columnVisibility[key]}
                        onChange={() => toggleColumn(key)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
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
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
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
                <h1 className="text-lg font-semibold">Closing Ranks</h1>
                
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs text-purple-100">
                {filteredData.length} Records
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.filter(c => c !== "all").slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}

            <button
              onClick={() => {
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Categories
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
                  placeholder="Search colleges, states, courses, quota, category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
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
                  value={selectedQuota}
                  onChange={(value) => {
                    setSelectedQuota(value);
                    setCurrentPage(1);
                  }}
                  options={quotas}
                  placeholder="Select Quota"
                  allLabel="All Quotas"
                />

                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200"
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
                    value={selectedCourse}
                    onChange={(value) => {
                      setSelectedCourse(value);
                      setCurrentPage(1);
                    }}
                    options={courses}
                    placeholder="Select Course"
                    allLabel="All Courses"
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
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max Fee"
                      value={maxFee}
                      onChange={(e) => {
                        setMaxFee(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min Rank"
                      value={minRank}
                      onChange={(e) => {
                        setMinRank(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max Rank"
                      value={maxRank}
                      onChange={(e) => {
                        setMaxRank(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
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
                  <span className="font-medium text-purple-600">{filteredData.length}</span>
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
                {columnVisibility["Alloted Quota"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Quota</th>
                )}
                {columnVisibility["Alloted Category"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                )}
                {columnVisibility.State && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">State</th>
                )}
                {columnVisibility.College && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">College</th>
                )}
                {columnVisibility.Course && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                )}
                {columnVisibility["Course Fee"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Fee</th>
                )}
                {columnVisibility["2024 R1"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">2024 R1</th>
                )}
                {columnVisibility["2024 R2"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">2024 R2</th>
                )}
                {columnVisibility["2024 R3"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">2024 R3</th>
                )}
                {columnVisibility["2024 R4"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">2024 R4</th>
                )}
                {columnVisibility["2024 R5"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">2024 R5</th>
                )}
                {columnVisibility["2023 R1"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-green-700 uppercase tracking-wider">2023 R1</th>
                )}
                {columnVisibility["2023 R2"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-green-700 uppercase tracking-wider">2023 R2</th>
                )}
                {columnVisibility["2023 R3"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-green-700 uppercase tracking-wider">2023 R3</th>
                )}
                {columnVisibility["2023 R4"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-green-700 uppercase tracking-wider">2023 R4</th>
                )}
                {columnVisibility["2022 R1"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-purple-700 uppercase tracking-wider">2022 R1</th>
                )}
                {columnVisibility["2022 R2"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-purple-700 uppercase tracking-wider">2022 R2</th>
                )}
                {columnVisibility["2022 R3"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-purple-700 uppercase tracking-wider">2022 R3</th>
                )}
                {columnVisibility["2022 R4"] && (
                  <th className="px-2 py-2 text-center text-xs font-semibold text-purple-700 uppercase tracking-wider">2022 R4</th>
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
                  <tr key={index} className="hover:bg-purple-50 transition-colors">
                    {columnVisibility["Alloted Quota"] && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          {item["Alloted Quota"]}
                        </span>
                      </td>
                    )}
                    {columnVisibility["Alloted Category"] && (
                      <td className="px-2 py-2 text-center text-xs">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          {item["Alloted Category"]}
                        </span>
                      </td>
                    )}
                    {columnVisibility.State && (
                      <td className="px-2 py-2 text-center text-xs text-gray-700">{item.State}</td>
                    )}
                    {columnVisibility.College && (
                      <td className="px-2 py-2 text-left text-xs text-purple-600 hover:text-purple-800 cursor-pointer font-medium">
                        {item.College}
                      </td>
                    )}
                    {columnVisibility.Course && (
                      <td className="px-2 py-2 text-left text-xs text-gray-700">{item.Course}</td>
                    )}
                    {columnVisibility["Course Fee"] && (
                      <td className="px-2 py-2 text-center text-xs font-bold text-green-700">{formatCurrency(item["Course Fee"])}</td>
                    )}
                    {columnVisibility["2024 R1"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{formatRank(item["2024 R1"])}</td>
                    )}
                    {columnVisibility["2024 R2"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{formatRank(item["2024 R2"])}</td>
                    )}
                    {columnVisibility["2024 R3"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{formatRank(item["2024 R3"])}</td>
                    )}
                    {columnVisibility["2024 R4"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{formatRank(item["2024 R4"])}</td>
                    )}
                    {columnVisibility["2024 R5"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-blue-600">{formatRank(item["2024 R5"])}</td>
                    )}
                    {columnVisibility["2023 R1"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-green-600">{formatRank(item["2023 R1"])}</td>
                    )}
                    {columnVisibility["2023 R2"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-green-600">{formatRank(item["2023 R2"])}</td>
                    )}
                    {columnVisibility["2023 R3"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-green-600">{formatRank(item["2023 R3"])}</td>
                    )}
                    {columnVisibility["2023 R4"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-green-600">{formatRank(item["2023 R4"])}</td>
                    )}
                    {columnVisibility["2022 R1"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-purple-600">{formatRank(item["2022 R1"])}</td>
                    )}
                    {columnVisibility["2022 R2"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-purple-600">{formatRank(item["2022 R2"])}</td>
                    )}
                    {columnVisibility["2022 R3"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-purple-600">{formatRank(item["2022 R3"])}</td>
                    )}
                    {columnVisibility["2022 R4"] && (
                      <td className="px-2 py-2 text-center text-xs font-medium text-purple-600">{formatRank(item["2022 R4"])}</td>
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

export default ClossingRanksPage;