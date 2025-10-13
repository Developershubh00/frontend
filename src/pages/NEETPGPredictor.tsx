import React, { useState } from "react";
import { ArrowLeft, Target, Search, Calculator, TrendingUp, Stethoscope, MapPin, BookOpen, IndianRupee, ArrowRight, X, Filter, Award, Building2, DollarSign, Users, GraduationCap, FileSpreadsheet, BarChart3, PieChart } from "lucide-react";

// Types
interface College {
  institute_name: string;
  state: string;
  specialization: string;
  category: string;
  closing_rank: number;
  opening_rank: number;
  seats: number;
  fees: number;
  bond_years: number;
  bond_amount: number;
  type: "Government" | "Private" | "Deemed";
  quota: string;
  university: string;
  location: string;
  website: string;
}

interface PredictorMode {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const NEETPGPredictor = () => {
  // Mode Selection
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form Data for different modes
  const [formData, setFormData] = useState({
    // Mode 1: Basic Rank Predictor
    rank: "",
    category: "",
    
    // Mode 2: State-wise Predictor
    preferredStates: [] as string[],
    domicileState: "",
    
    // Mode 3: Specialization-based
    specialization: "",
    
    // Mode 4: Budget-based
    maxFees: "5000000",
    minFees: "0",
    bondAcceptable: "yes",
    maxBondYears: "5",
    
    // Mode 5: College Type
    collegeType: "all",
    quota: "all",
    
    // Mode 6: Custom Multi-criteria
    topN: "50",
  });

  // Predictor Modes
  const predictorModes: PredictorMode[] = [
    {
      id: "basic",
      title: "Basic Rank Predictor",
      description: "Get colleges based on your NEET PG rank and category",
      icon: Calculator,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "state",
      title: "State-wise Predictor",
      description: "Find colleges in your preferred states with domicile benefits",
      icon: MapPin,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "specialization",
      title: "Specialization Finder",
      description: "Search for specific medical specializations",
      icon: Stethoscope,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "budget",
      title: "Budget-based Search",
      description: "Filter colleges by fees, bond amount, and affordability",
      icon: DollarSign,
      color: "from-orange-500 to-orange-600"
    },
    {
      id: "college-type",
      title: "College Type Filter",
      description: "Government, Private, or Deemed universities with quota options",
      icon: Building2,
      color: "from-pink-500 to-rose-600"
    },
    {
      id: "top-rankers",
      title: "Top Rankers Analysis",
      description: "See where top 50 or custom top-N rankers got admission",
      icon: Award,
      color: "from-yellow-500 to-amber-600"
    }
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry"
  ];

  const categories = ["General", "OBC", "SC", "ST", "EWS"];
  
  const specializations = [
    "General Medicine", "General Surgery", "Pediatrics", "Obstetrics & Gynecology",
    "Orthopedics", "Anesthesiology", "Radiology", "Pathology", "Dermatology",
    "Psychiatry", "ENT", "Ophthalmology", "Emergency Medicine", "Cardiology",
    "Neurology", "Gastroenterology", "Pulmonology", "Nephrology", "Community Medicine",
    "Forensic Medicine", "Pharmacology", "Microbiology", "Biochemistry"
  ];

  const collegeTypes = ["All", "Government", "Private", "Deemed"];
  const quotas = ["All", "All India", "State", "Management", "NRI"];

  // Demo Data (Replace with CSV loaded data)
  const demoColleges: College[] = [
    {
      institute_name: "AIIMS Delhi",
      state: "Delhi",
      specialization: "General Medicine",
      category: "General",
      closing_rank: 50,
      opening_rank: 1,
      seats: 24,
      fees: 10000,
      bond_years: 0,
      bond_amount: 0,
      type: "Government",
      quota: "All India",
      university: "AIIMS",
      location: "New Delhi",
      website: "https://aiims.edu"
    },
    {
      institute_name: "PGIMER Chandigarh",
      state: "Chandigarh",
      specialization: "Anesthesiology",
      category: "General",
      closing_rank: 120,
      opening_rank: 51,
      seats: 18,
      fees: 15000,
      bond_years: 0,
      bond_amount: 0,
      type: "Government",
      quota: "All India",
      university: "PGIMER",
      location: "Chandigarh",
      website: "https://pgimer.edu.in"
    },
    {
      institute_name: "Christian Medical College, Vellore",
      state: "Tamil Nadu",
      specialization: "Cardiology",
      category: "General",
      closing_rank: 450,
      opening_rank: 200,
      seats: 12,
      fees: 250000,
      bond_years: 2,
      bond_amount: 1000000,
      type: "Private",
      quota: "Management",
      university: "CMC Vellore",
      location: "Vellore",
      website: "https://cmcvellore.ac.in"
    },
    {
      institute_name: "Kasturba Medical College, Manipal",
      state: "Karnataka",
      specialization: "Orthopedics",
      category: "General",
      closing_rank: 800,
      opening_rank: 451,
      seats: 18,
      fees: 480000,
      bond_years: 3,
      bond_amount: 2000000,
      type: "Deemed",
      quota: "Management",
      university: "MAHE",
      location: "Manipal",
      website: "https://manipal.edu"
    },
    {
      institute_name: "Grant Medical College, Mumbai",
      state: "Maharashtra",
      specialization: "Pediatrics",
      category: "General",
      closing_rank: 1100,
      opening_rank: 801,
      seats: 16,
      fees: 20000,
      bond_years: 1,
      bond_amount: 500000,
      type: "Government",
      quota: "State",
      university: "MUHS",
      location: "Mumbai",
      website: "https://grantmedical.edu"
    }
  ];

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectMode = (modeId: string) => {
    setSelectedMode(modeId);
    setIsModalOpen(true);
    setCurrentStep(0);
    setResults([]);
  };

  const nextStep = () => {
    const totalSteps = getTotalSteps();
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const getTotalSteps = () => {
    switch (selectedMode) {
      case "basic": return 3;
      case "state": return 4;
      case "specialization": return 4;
      case "budget": return 5;
      case "college-type": return 4;
      case "top-rankers": return 3;
      default: return 1;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call with filtering logic
    setTimeout(() => {
      let filtered = [...demoColleges];
      
      // Apply filters based on mode
      if (selectedMode === "basic" && formData.rank) {
        const rank = parseInt(formData.rank);
        filtered = filtered.filter(c => c.closing_rank >= rank);
      }
      
      if (selectedMode === "state" && formData.preferredStates.length > 0) {
        filtered = filtered.filter(c => formData.preferredStates.includes(c.state));
      }
      
      if (selectedMode === "specialization" && formData.specialization) {
        filtered = filtered.filter(c => c.specialization === formData.specialization);
      }
      
      if (selectedMode === "budget") {
        const maxFees = parseInt(formData.maxFees);
        filtered = filtered.filter(c => c.fees <= maxFees);
      }
      
      if (selectedMode === "college-type" && formData.collegeType !== "all") {
        filtered = filtered.filter(c => c.type.toLowerCase() === formData.collegeType.toLowerCase());
      }
      
      if (selectedMode === "top-rankers") {
        filtered = filtered.filter(c => c.closing_rank <= parseInt(formData.topN || "50"));
      }
      
      setResults(filtered);
      setIsModalOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const renderStepContent = () => {
    if (!selectedMode) return null;

    const mode = predictorModes.find(m => m.id === selectedMode);
    
    switch (selectedMode) {
      case "basic":
        if (currentStep === 0) {
          return (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
              <p className="text-slate-600">{mode?.description}</p>
            </div>
          );
        } else if (currentStep === 1) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your NEET PG Rank</h3>
              <input
                type="number"
                value={formData.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 500"
              />
            </div>
          );
        } else if (currentStep === 2) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Select Your Category</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={formData.category === cat}
                      onChange={() => handleChange("category", cat)}
                      className="accent-blue-500"
                    />
                    <span className="text-slate-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }
        break;

      case "state":
        if (currentStep === 0) {
          return (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
              <p className="text-slate-600">{mode?.description}</p>
            </div>
          );
        } else if (currentStep === 1) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your Rank</h3>
              <input
                type="number"
                value={formData.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g., 500"
              />
            </div>
          );
        } else if (currentStep === 2) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Your Domicile State</h3>
              <select
                value={formData.domicileState}
                onChange={(e) => handleChange("domicileState", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          );
        } else if (currentStep === 3) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Preferred States (Select up to 5)</h3>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {states.map((state) => (
                  <label key={state} className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 p-2 rounded-lg">
                    <input 
                      type="checkbox"
                      checked={formData.preferredStates.includes(state)}
                      onChange={(e) => {
                        if (e.target.checked && formData.preferredStates.length < 5) {
                          handleChange("preferredStates", [...formData.preferredStates, state]);
                        } else {
                          handleChange("preferredStates", formData.preferredStates.filter((s) => s !== state));
                        }
                      }}
                      className="accent-green-500"
                    />
                    <span className="text-sm text-slate-700">{state}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {formData.preferredStates.length}/5 states selected
              </p>
            </div>
          );
        }
        break;

      case "specialization":
        if (currentStep === 0) {
          return (
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
              <p className="text-slate-600">{mode?.description}</p>
            </div>
          );
        } else if (currentStep === 1) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your Rank</h3>
              <input
                type="number"
                value={formData.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="e.g., 500"
              />
            </div>
          );
        } else if (currentStep === 2) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Select Category</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={formData.category === cat}
                      onChange={() => handleChange("category", cat)}
                      className="accent-purple-500"
                    />
                    <span className="text-slate-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        } else if (currentStep === 3) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Choose Specialization</h3>
              <select
                value={formData.specialization}
                onChange={(e) => handleChange("specialization", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">Select Specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          );
        }
        break;

      case "budget":
        if (currentStep === 0) {
          return (
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
              <p className="text-slate-600">{mode?.description}</p>
            </div>
          );
        } else if (currentStep === 1) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your Rank</h3>
              <input
                type="number"
                value={formData.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="e.g., 500"
              />
            </div>
          );
        } else if (currentStep === 2) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Maximum Annual Fees (₹)</h3>
              <input
                type="number"
                value={formData.maxFees}
                onChange={(e) => handleChange("maxFees", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="e.g., 500000"
              />
              <p className="text-sm text-slate-500 mt-2">₹{parseInt(formData.maxFees || "0").toLocaleString()}/year</p>
            </div>
          );
        } else if (currentStep === 3) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Bond Preference</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Accept Bond?</label>
                  <div className="space-y-2">
                    {["Yes", "No", "Only if unavoidable"].map((opt) => (
                      <label key={opt} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
                        <input
                          type="radio"
                          name="bondAcceptable"
                          value={opt.toLowerCase()}
                          checked={formData.bondAcceptable === opt.toLowerCase()}
                          onChange={() => handleChange("bondAcceptable", opt.toLowerCase())}
                          className="accent-orange-500"
                        />
                        <span className="text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (currentStep === 4) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Maximum Bond Duration (Years)</h3>
              <input
                type="number"
                value={formData.maxBondYears}
                onChange={(e) => handleChange("maxBondYears", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="e.g., 5"
              />
            </div>
          );
        }
        break;

      case "college-type":
        if (currentStep === 0) {
          return (
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
              <p className="text-slate-600">{mode?.description}</p>
            </div>
          );
        } else if (currentStep === 1) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your Rank</h3>
              <input
                type="number"
                value={formData.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="e.g., 500"
              />
            </div>
          );
        } else if (currentStep === 2) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">College Type</h3>
              <div className="space-y-3">
                {collegeTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
                    <input
                      type="radio"
                      name="collegeType"
                      value={type.toLowerCase()}
                      checked={formData.collegeType === type.toLowerCase()}
                      onChange={() => handleChange("collegeType", type.toLowerCase())}
                      className="accent-pink-500"
                    />
                    <span className="text-slate-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        } else if (currentStep === 3) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quota Preference</h3>
              <div className="space-y-3">
                {quotas.map((q) => (
                  <label key={q} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
                    <input
                      type="radio"
                      name="quota"
                      value={q.toLowerCase()}
                      checked={formData.quota === q.toLowerCase()}
                      onChange={() => handleChange("quota", q.toLowerCase())}
                      className="accent-pink-500"
                    />
                    <span className="text-slate-700">{q}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }
        break;

      case "top-rankers":
        if (currentStep === 0) {
          return (
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
              <p className="text-slate-600">{mode?.description}</p>
            </div>
          );
        } else if (currentStep === 1) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Analyze Top N Rankers</h3>
              <input
                type="number"
                value={formData.topN}
                onChange={(e) => handleChange("topN", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="e.g., 50"
              />
              <p className="text-sm text-slate-500 mt-2">See where top {formData.topN} rankers got admitted</p>
            </div>
          );
        } else if (currentStep === 2) {
          return (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Filter by Category (Optional)</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={formData.category === ""}
                    onChange={() => handleChange("category", "")}
                    className="accent-yellow-500"
                  />
                  <span className="text-slate-700">All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={formData.category === cat}
                      onChange={() => handleChange("category", cat)}
                      className="accent-yellow-500"
                    />
                    <span className="text-slate-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }
        break;
    }
  };

  // Statistics
  const getStatistics = () => {
    if (results.length === 0) return null;

    const govtColleges = results.filter(c => c.type === "Government").length;
    const privateColleges = results.filter(c => c.type === "Private").length;
    const deemedColleges = results.filter(c => c.type === "Deemed").length;
    
    const avgFees = results.reduce((sum, c) => sum + c.fees, 0) / results.length;
    const withBond = results.filter(c => c.bond_years > 0).length;
    
    const stateDistribution = results.reduce((acc, c) => {
      acc[c.state] = (acc[c.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { govtColleges, privateColleges, deemedColleges, avgFees, withBond, stateDistribution };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">NEET PG College Predictor 2025</h1>
          <p className="text-slate-600 text-sm mt-1">Choose your prediction mode and find your perfect college</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Advanced NEET PG College Predictor</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            6 Different prediction modes to help you find the perfect postgraduate medical college
          </p>
        </div>

        {/* Predictor Modes Grid */}
        {!results.length && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Choose Your Prediction Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictorModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <div
                    key={mode.id}
                    onClick={() => selectMode(mode.id)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-indigo-200"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r ${mode.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">{mode.title}</h4>
                    <p className="text-slate-600 text-sm">{mode.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Statistics Dashboard */}
        {results.length > 0 && stats && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              <span>Results Overview</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Total Colleges</span>
                  <Target className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-slate-800">{results.length}</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Government</span>
                  <Building2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-green-600">{stats.govtColleges}</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Private</span>
                  <Building2 className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-orange-600">{stats.privateColleges}</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Avg. Fees</span>
                  <IndianRupee className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-600">₹{(stats.avgFees / 100000).toFixed(1)}L</p>
              </div>
            </div>

            {/* State Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>State-wise Distribution</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(stats.stateDistribution).map(([state, count]) => (
                  <div key={state} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-600">{state}</p>
                    <p className="text-xl font-bold text-slate-800">{count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bond Statistics */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-lg font-bold text-slate-800 mb-4">Bond Information</h4>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600 mb-1">Colleges with Bond</p>
                  <p className="text-2xl font-bold text-red-700">{stats.withBond}</p>
                </div>
                <div className="flex-1 bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-1">No Bond Required</p>
                  <p className="text-2xl font-bold text-green-700">{results.length - stats.withBond}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Table */}
        {results.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
                <span>College Results ({results.length})</span>
              </h3>
              <button
                onClick={() => selectMode(selectedMode!)}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center space-x-1"
              >
                <Filter className="w-4 h-4" />
                <span>Refine Search</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">College</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Specialization</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">State</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Rank Range</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Seats</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Fees</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Bond</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((college, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{college.institute_name}</p>
                          <p className="text-xs text-slate-500">{college.location}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-700">{college.specialization}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center space-x-1 text-sm text-slate-700">
                          <MapPin className="w-3 h-3" />
                          <span>{college.state}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          college.type === "Government" ? "bg-green-100 text-green-700" :
                          college.type === "Private" ? "bg-orange-100 text-orange-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {college.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <div className="text-slate-700">
                          <p className="font-semibold">{college.opening_rank} - {college.closing_rank}</p>
                          <p className="text-xs text-slate-500">{college.quota}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-slate-700">{college.seats}</td>
                      <td className="py-4 px-4">
                        <p className="text-sm font-semibold text-slate-800">₹{(college.fees / 100000).toFixed(2)}L</p>
                        <p className="text-xs text-slate-500">per year</p>
                      </td>
                      <td className="py-4 px-4">
                        {college.bond_years > 0 ? (
                          <div className="text-sm">
                            <p className="text-red-600 font-semibold">{college.bond_years} years</p>
                            <p className="text-xs text-slate-500">₹{(college.bond_amount / 100000).toFixed(1)}L</p>
                          </div>
                        ) : (
                          <span className="text-green-600 text-sm font-medium">No Bond</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <a
                          href={college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium inline-flex items-center space-x-1"
                        >
                          <span>Visit</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results.length && !isModalOpen && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Start Your Search</h3>
            <p className="text-slate-600 mb-6">Select a prediction mode above to find colleges matching your criteria</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setCurrentStep(0);
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Step {currentStep + 1} of {getTotalSteps()}</span>
                <span>{Math.round(((currentStep + 1) / getTotalSteps()) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / getTotalSteps()) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              {currentStep > 0 ? (
                <button
                  onClick={prevStep}
                  className="px-5 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep === getTotalSteps() - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-medium flex items-center space-x-2 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Results</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NEETPGPredictor;