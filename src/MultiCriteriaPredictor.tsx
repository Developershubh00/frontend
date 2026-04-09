import React, { useState, useEffect } from "react";
import {
  ArrowLeft, Loader2, MapPin, Building2, IndianRupee,
  GraduationCap, ListChecks, ClipboardCheck, ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { predictorAPI } from "../services/api";

// Demo states, courses, and colleges (replace with API)
const DEMO_STATES = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Kerala"];
const DEMO_COURSES = ["MD Medicine", "MS Surgery", "MD Pediatrics", "MD Radiology", "MS Orthopedics"];
const DEMO_COLLEGES = [
  {
    id: 1,
    name: "AIIMS Delhi",
    state: "Delhi",
    type: "Government",
    annual_fee: 1510,
    closing_rank: 120,
    course: "MD Medicine",
    website: "https://www.aiims.edu",
  },
  {
    id: 2,
    name: "KMC Manipal",
    state: "Karnataka",
    type: "Private",
    annual_fee: 1800000,
    closing_rank: 5600,
    course: "MD Radiology",
    website: "https://manipal.edu/kmc-manipal",
  },
];

const MultiCriteriaPredictor: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    rank: "",
    states: [] as string[],
    collegeType: "",
    feeMin: 1000,
    feeMax: 5000000,
    courses: [] as string[],
  });

  // Save progress locally
  useEffect(() => {
    localStorage.setItem("multiCriteriaForm", JSON.stringify(formData));
  }, [formData]);

  // Restore if available
  useEffect(() => {
    const saved = localStorage.getItem("multiCriteriaForm");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      // 🔥 Replace with real API call later
      // const res = await predictorAPI.multiCriteriaPredict(formData);
      // setResults(res.data.results);
      setResults(DEMO_COLLEGES); // demo fallback
    } catch (err: any) {
      setError("Prediction failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="ml-3 text-xl font-bold text-slate-800">
          Multi-Criteria PG Predictor
        </h1>
      </div>

      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        {/* Steps */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Enter NEET PG Rank</h2>
            <input
              type="number"
              value={formData.rank}
              onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Enter your All India Rank"
            />
            <button onClick={handleNext} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl">Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Preferred States (max 3)</h2>
            <div className="grid grid-cols-2 gap-3">
              {DEMO_STATES.map((state) => (
                <button
                  key={state}
                  onClick={() => {
                    const selected = formData.states.includes(state)
                      ? formData.states.filter((s) => s !== state)
                      : [...formData.states, state].slice(0, 3);
                    setFormData({ ...formData, states: selected });
                  }}
                  className={`p-3 rounded-xl border ${
                    formData.states.includes(state)
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleBack} className="px-4 py-2 bg-slate-200 rounded-xl">Back</button>
              <button onClick={handleNext} className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">College Type</h2>
            <div className="space-y-3">
              {["Government", "Private", "Both"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, collegeType: type })}
                  className={`w-full p-3 rounded-xl border ${
                    formData.collegeType === type
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleBack} className="px-4 py-2 bg-slate-200 rounded-xl">Back</button>
              <button onClick={handleNext} className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Next</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Fee Range (INR)</h2>
            <div className="flex gap-4">
              <input
                type="number"
                value={formData.feeMin}
                onChange={(e) => setFormData({ ...formData, feeMin: +e.target.value })}
                className="w-1/2 px-3 py-2 border rounded-xl"
                placeholder="Min Fee"
              />
              <input
                type="number"
                value={formData.feeMax}
                onChange={(e) => setFormData({ ...formData, feeMax: +e.target.value })}
                className="w-1/2 px-3 py-2 border rounded-xl"
                placeholder="Max Fee"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleBack} className="px-4 py-2 bg-slate-200 rounded-xl">Back</button>
              <button onClick={handleNext} className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Next</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Preferred Courses</h2>
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {DEMO_COURSES.map((course) => (
                <button
                  key={course}
                  onClick={() => {
                    const selected = formData.courses.includes(course)
                      ? formData.courses.filter((c) => c !== course)
                      : [...formData.courses, course];
                    setFormData({ ...formData, courses: selected });
                  }}
                  className={`p-3 rounded-xl border text-sm ${
                    formData.courses.includes(course)
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleBack} className="px-4 py-2 bg-slate-200 rounded-xl">Back</button>
              <button onClick={handleNext} className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Next</button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Confirm Your Details</h2>
            <ul className="space-y-2 text-slate-700">
              <li>Rank: {formData.rank}</li>
              <li>States: {formData.states.join(", ")}</li>
              <li>College Type: {formData.collegeType}</li>
              <li>Fee Range: ₹{formData.feeMin} - ₹{formData.feeMax}</li>
              <li>Courses: {formData.courses.join(", ")}</li>
            </ul>
            <div className="flex justify-between mt-4">
              <button onClick={handleBack} className="px-4 py-2 bg-slate-200 rounded-xl">Back</button>
              <button onClick={handleFinalSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Submit</button>
            </div>
          </div>
        )}

        {/* {step === 7 && (  
          <div>
            <h2 className="text-lg font-semibold mb-4">Prediction Results</h2>
            {isLoading && <Loader2 className="w-6 h-6 animate-spin mx-auto" />}
            {error && <p className="text-red-600">{error}</p>}
            {!isLoading && results.length > 0 && (
              <div className="space-y-4">
                {results.map((college) => (
                  <div key={college.id} className="p-4 border rounded-xl hover:shadow">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{college.name}</h3>
                      <a href={college.website} target=\"_blank\" rel=\"noreferrer\" className=\"text-indigo-600 flex items-center gap-1 text-sm\">
                        Visit <ExternalLink className=\"w-4 h-4\" />
                      </a>
                    </div>
                    <p>State: {college.state}</p>
                    <p>Type: {college.type}</p>
                    <p>Fee: ₹{college.annual_fee.toLocaleString()}</p>
                    <p>Closing Rank: {college.closing_rank}</p>
                    <p>Course: {college.course}</p>
                 </div>
                ))}
             </div>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MultiCriteriaPredictor;
