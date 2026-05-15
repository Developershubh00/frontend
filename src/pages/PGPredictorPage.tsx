
import React, { useState } from "react";
import { ArrowLeft, Target, Search, Calculator, TrendingUp, Stethoscope, MapPin, BookOpen, IndianRupee, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { predictorAPI } from "../services/api";

// Types
interface College {
  id: number;
  institute_name: string;
  specialization: string;
  location: string;
  closing_rank: number;
  seats: number;
  fees: string;
  type: "Government" | "Private";
  website: string;
  admission_chance: "High" | "Medium" | "Low";
}

const PGPredictorPage: React.FC = () => {
  const navigate = useNavigate();

  // Step control
  const [currentStep, setCurrentStep] = useState<number>(0);
  const totalSteps = 7;

  // Form Data (will be sent to API at the end)
  const [formData, setFormData] = useState({
    rank: "",
    preferredStates: [] as string[],
    collegeType: "", // "government", "private", "both"
    minFees: "1000",
    maxFees: "5000000",
    specialization: "",
  });

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(true); // Always open on load
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<College[]>([]);

  // Demo colleges (will be replaced by API response)
  const demoColleges: College[] = [
    {
      id: 1,
      institute_name: "AIIMS Delhi",
      specialization: "General Medicine",
      location: "Delhi",
      closing_rank: 50,
      seats: 24,
      fees: "₹10,000/year",
      type: "Government",
      website: "https://aiims.edu",
      admission_chance: "High",
    },
    {
      id: 2,
      institute_name: "JIPMER Puducherry",
      specialization: "Pediatrics",
      location: "Puducherry",
      closing_rank: 120,
      seats: 16,
      fees: "₹15,000/year",
      type: "Government",
      website: "https://jipmer.edu",
      admission_chance: "High",
    },
    {
      id: 3,
      institute_name: "Christian Medical College, Vellore",
      specialization: "Anesthesiology",
      location: "Tamil Nadu",
      closing_rank: 450,
      seats: 20,
      fees: "₹2.5 Lakh/year",
      type: "Private",
      website: "https://cmcvellore.ac.in",
      admission_chance: "Medium",
    },
    {
      id: 4,
      institute_name: "Kasturba Medical College, Manipal",
      specialization: "Orthopedics",
      location: "Karnataka",
      closing_rank: 800,
      seats: 18,
      fees: "₹4.8 Lakh/year",
      type: "Private",
      website: "https://manipal.edu",
      admission_chance: "Medium",
    },
    {
      id: 5,
      institute_name: "Grant Medical College",
      specialization: "Obstetrics & Gynecology",
      location: "Maharashtra",
      closing_rank: 1100,
      seats: 14,
      fees: "₹20,000/year",
      type: "Government",
      website: "https://grantmedical.edu",
      admission_chance: "Low",
    },
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry"
  ];

  const specializations = [
    "General Medicine", "General Surgery", "Pediatrics", "Obstetrics & Gynecology",
    "Orthopedics", "Anesthesiology", "Radiology", "Pathology", "Dermatology",
    "Psychiatry", "ENT", "Ophthalmology", "Emergency Medicine", "Cardiology",
    "Neurology", "Gastroenterology", "Pulmonology", "Nephrology"
  ];

  // Handle input changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step Navigation
  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Final submission
  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Simulate API call (replace with real API later)
      // const response = await predictorAPI.predictPGMulti({
      //   rank: parseInt(formData.rank),
      //   states: formData.preferredStates,
      //   college_type: formData.collegeType,
      //   min_fees: formData.minFees,
      //   max_fees: formData.maxFees,
      //   specialization: formData.specialization,
      // });
      // setResults(response.data.colleges);

      // For now, use demo data filtered by rank
      const userRank = parseInt(formData.rank);
      const filtered = demoColleges.filter(
        (college) =>
          college.closing_rank >= userRank &&
          (formData.specialization === "" || college.specialization === formData.specialization) &&
          (formData.preferredStates.length === 0 || formData.preferredStates.includes(college.location)) &&
          college.type.toLowerCase().includes(formData.collegeType)
      );
      setResults(filtered);

      setIsModalOpen(false); // Close modal after submission
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch results");
    } finally {
      setIsLoading(false);
    }
  };

  // Modal Steps Content
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Welcome to Multi-Criteria Predictor</h3>
            <p className="text-slate-600">We'll guide you through 7 steps to find the best PG colleges for your rank and preferences.</p>
          </div>
        );

      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your NEET PG Rank</h3>
            <input
              type="number"
              value={formData.rank}
              onChange={(e) => handleChange("rank", e.target.value)}
              className="w-full px-4 py-3 border text-black border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 500"
              required
            />
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Preferred States (Select up to 3)</h3>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {states.map((state) => (
                <label key={state} className="flex items-center text-black space-x-2 cursor-pointer hover:bg-slate-100 p-2 rounded-lg">
                  <input 
                    type="checkbox"
                    checked={formData.preferredStates.includes(state)}
                    onChange={(e) => {
                      if (e.target.checked && formData.preferredStates.length < 3) {
                        handleChange("preferredStates", [...formData.preferredStates, state]);
                      } else {
                        handleChange(
                          "preferredStates",
                          formData.preferredStates.filter((s) => s !== state)
                        );
                      }
                    }}
                    className="text-black accent-blue-500"
                  />
                  <span className="text-sm text-black">{state}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-black text-slate-500 mt-2">
              {formData.preferredStates.length}/3 states selected
            </p>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">College Type</h3>
            <div className="space-y-3">
              {["Government", "Private", "Both"].map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="collegeType"
                    value={type.toLowerCase()}
                    checked={formData.collegeType === type.toLowerCase()}
                    onChange={() => handleChange("collegeType", type.toLowerCase())}
                    className="text-black accent-blue-500"
                  />
                  <span className="text-sm text-black">{type}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Fee Range (Per Year)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Minimum Fees</label>
                <input
                  type="number"
                  value={formData.minFees}
                  onChange={(e) => handleChange("minFees", e.target.value)}
                  className="w-full px-4 py-3 border text-black border-slate-200 rounded-xl mt-1"
                  placeholder="Min (₹1,000)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Maximum Fees</label>
                <input
                  type="number"
                  value={formData.maxFees}
                  onChange={(e) => handleChange("maxFees", e.target.value)}
                  className="w-full px-4 py-3 border text-black border-slate-200 rounded-xl mt-1"
                  placeholder="Max (₹50 Lakh)"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Preferred Specialization</h3>
            <select
              value={formData.specialization}
              onChange={(e) => handleChange("specialization", e.target.value)}
              className="w-full px-4 py-3 border text-black border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        );

      case 6:
        return (
          <div>
            <h3 className="text-2xl font-bold text-black text-slate-800 mb-4">Review Your Preferences</h3>
            <div className="bg-slate-50 text-black p-4 rounded-xl space-y-3 text-sm">
              <p><strong>Rank:</strong> {formData.rank || "Not set"}</p>
              <p><strong>States:</strong> {formData.preferredStates.length ? formData.preferredStates.join(", ") : "All"}</p>
              <p><strong>College Type:</strong> {formData.collegeType || "Not selected"}</p>
              <p><strong>Fee Range:</strong> ₹{parseInt(formData.minFees).toLocaleString()} – ₹{parseInt(formData.maxFees).toLocaleString()}/year</p>
              <p><strong>Specialization:</strong> {formData.specialization || "Any"}</p>
            </div>
            <p className="text-slate-600 text-black mt-4">Ready to see your college matches?</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">NEET PG Multi-Criteria Predictor</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 text-white mb-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Advanced PG College Predictor</h2>
          <p className="text-blue-100 text-lg">
            Find the best postgraduate medical colleges based on your rank, preferences, and budget
          </p>
        </div>

        {/* Results Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Your College Matches</h3>
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((college) => (
                <div
                  key={college.id}
                  className="p-5 border border-slate-200 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{college.institute_name}</h4>
                      <p className="text-slate-600">{college.specialization} • {college.type}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        college.admission_chance === "High"
                          ? "bg-blue-100 text-blue-800"
                          : college.admission_chance === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {college.admission_chance} Chance
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{college.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="w-4 h-4" />
                      <span>{college.fees}</span>
                    </div>
                    <div>
                      <span>Closing Rank: <strong>{college.closing_rank}</strong></span>
                    </div>
                    <div>
                      <span>Seats: <strong>{college.seats}</strong></span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:underline text-sm font-medium"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Visit Website</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No Matches Found
              </h3>
              <p className="text-slate-600 mb-4">
                Start the predictor to find colleges that match your criteria.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium"
              >
                Start Predictor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Multi-Step Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Step {currentStep + 1} of {totalSteps}</span>
                <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step Content */}
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 ? (
                <button
                  onClick={prevStep}
                  className="px-5 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep === totalSteps - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-medium flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
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
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium"
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

export default PGPredictorPage;