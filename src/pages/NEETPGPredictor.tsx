// import React, { useState } from "react";
// import { ArrowLeft, Target, Search, Calculator, TrendingUp, Stethoscope, MapPin, BookOpen, IndianRupee, ArrowRight, X, Filter, Award, Building2, DollarSign, Users, GraduationCap, FileSpreadsheet, BarChart3, PieChart } from "lucide-react";

// // Types
// interface College {
//   institute_name: string;
//   state: string;
//   specialization: string;
//   category: string;
//   closing_rank: number;
//   opening_rank: number;
//   seats: number;
//   fees: number;
//   bond_years: number;
//   bond_amount: number;
//   type: "Government" | "Private" | "Deemed";
//   quota: string;
//   university: string;
//   location: string;
//   website: string;
// }

// interface PredictorMode {
//   id: string;
//   title: string;
//   description: string;
//   icon: any;
//   color: string;
// }

// const NEETPGPredictor = () => {
//   // Mode Selection
//   const [selectedMode, setSelectedMode] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [results, setResults] = useState<College[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Form Data for different modes
//   const [formData, setFormData] = useState({
//     // Mode 1: Basic Rank Predictor
//     rank: "",
//     category: "",
    
//     // Mode 2: State-wise Predictor
//     preferredStates: [] as string[],
//     domicileState: "",
    
//     // Mode 3: Specialization-based
//     specialization: "",
    
//     // Mode 4: Budget-based
//     maxFees: "5000000",
//     minFees: "0",
//     bondAcceptable: "yes",
//     maxBondYears: "5",
    
//     // Mode 5: College Type
//     collegeType: "all",
//     quota: "all",
    
//     // Mode 6: Custom Multi-criteria
//     topN: "50",
//   });

//   // Predictor Modes
//   const predictorModes: PredictorMode[] = [
//     {
//       id: "basic",
//       title: "Basic Rank Predictor",
//       description: "Get colleges based on your NEET PG rank and category",
//       icon: Calculator,
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       id: "state",
//       title: "State-wise Predictor",
//       description: "Find colleges in your preferred states with domicile benefits",
//       icon: MapPin,
//       color: "from-green-500 to-emerald-600"
//     },
//     {
//       id: "specialization",
//       title: "Specialization Finder",
//       description: "Search for specific medical specializations",
//       icon: Stethoscope,
//       color: "from-purple-500 to-purple-600"
//     },
//     {
//       id: "budget",
//       title: "Budget-based Search",
//       description: "Filter colleges by fees, bond amount, and affordability",
//       icon: DollarSign,
//       color: "from-orange-500 to-orange-600"
//     },
//     {
//       id: "college-type",
//       title: "College Type Filter",
//       description: "Government, Private, or Deemed universities with quota options",
//       icon: Building2,
//       color: "from-pink-500 to-rose-600"
//     },
//     {
//       id: "top-rankers",
//       title: "Top Rankers Analysis",
//       description: "See where top 50 or custom top-N rankers got admission",
//       icon: Award,
//       color: "from-yellow-500 to-amber-600"
//     }
//   ];

//   const states = [
//     "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
//     "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
//     "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
//     "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//     "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry"
//   ];

//   const categories = ["General", "OBC", "SC", "ST", "EWS"];
  
//   const specializations = [
//     "General Medicine", "General Surgery", "Pediatrics", "Obstetrics & Gynecology",
//     "Orthopedics", "Anesthesiology", "Radiology", "Pathology", "Dermatology",
//     "Psychiatry", "ENT", "Ophthalmology", "Emergency Medicine", "Cardiology",
//     "Neurology", "Gastroenterology", "Pulmonology", "Nephrology", "Community Medicine",
//     "Forensic Medicine", "Pharmacology", "Microbiology", "Biochemistry"
//   ];

//   const collegeTypes = ["All", "Government", "Private", "Deemed"];
//   const quotas = ["All", "All India", "State", "Management", "NRI"];

//   // Demo Data (Replace with CSV loaded data)
//   const demoColleges: College[] = [
//     {
//       institute_name: "AIIMS Delhi",
//       state: "Delhi",
//       specialization: "General Medicine",
//       category: "General",
//       closing_rank: 50,
//       opening_rank: 1,
//       seats: 24,
//       fees: 10000,
//       bond_years: 0,
//       bond_amount: 0,
//       type: "Government",
//       quota: "All India",
//       university: "AIIMS",
//       location: "New Delhi",
//       website: "https://aiims.edu"
//     },
//     {
//       institute_name: "PGIMER Chandigarh",
//       state: "Chandigarh",
//       specialization: "Anesthesiology",
//       category: "General",
//       closing_rank: 120,
//       opening_rank: 51,
//       seats: 18,
//       fees: 15000,
//       bond_years: 0,
//       bond_amount: 0,
//       type: "Government",
//       quota: "All India",
//       university: "PGIMER",
//       location: "Chandigarh",
//       website: "https://pgimer.edu.in"
//     },
//     {
//       institute_name: "Christian Medical College, Vellore",
//       state: "Tamil Nadu",
//       specialization: "Cardiology",
//       category: "General",
//       closing_rank: 450,
//       opening_rank: 200,
//       seats: 12,
//       fees: 250000,
//       bond_years: 2,
//       bond_amount: 1000000,
//       type: "Private",
//       quota: "Management",
//       university: "CMC Vellore",
//       location: "Vellore",
//       website: "https://cmcvellore.ac.in"
//     },
//     {
//       institute_name: "Kasturba Medical College, Manipal",
//       state: "Karnataka",
//       specialization: "Orthopedics",
//       category: "General",
//       closing_rank: 800,
//       opening_rank: 451,
//       seats: 18,
//       fees: 480000,
//       bond_years: 3,
//       bond_amount: 2000000,
//       type: "Deemed",
//       quota: "Management",
//       university: "MAHE",
//       location: "Manipal",
//       website: "https://manipal.edu"
//     },
//     {
//       institute_name: "Grant Medical College, Mumbai",
//       state: "Maharashtra",
//       specialization: "Pediatrics",
//       category: "General",
//       closing_rank: 1100,
//       opening_rank: 801,
//       seats: 16,
//       fees: 20000,
//       bond_years: 1,
//       bond_amount: 500000,
//       type: "Government",
//       quota: "State",
//       university: "MUHS",
//       location: "Mumbai",
//       website: "https://grantmedical.edu"
//     }
//   ];

//   const handleChange = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const selectMode = (modeId: string) => {
//     setSelectedMode(modeId);
//     setIsModalOpen(true);
//     setCurrentStep(0);
//     setResults([]);
//   };

//   const nextStep = () => {
//     const totalSteps = getTotalSteps();
//     if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 0) setCurrentStep(currentStep - 1);
//   };

//   const getTotalSteps = () => {
//     switch (selectedMode) {
//       case "basic": return 3;
//       case "state": return 4;
//       case "specialization": return 4;
//       case "budget": return 5;
//       case "college-type": return 4;
//       case "top-rankers": return 3;
//       default: return 1;
//     }
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
    
//     // Simulate API call with filtering logic
//     setTimeout(() => {
//       let filtered = [...demoColleges];
      
//       // Apply filters based on mode
//       if (selectedMode === "basic" && formData.rank) {
//         const rank = parseInt(formData.rank);
//         filtered = filtered.filter(c => c.closing_rank >= rank);
//       }
      
//       if (selectedMode === "state" && formData.preferredStates.length > 0) {
//         filtered = filtered.filter(c => formData.preferredStates.includes(c.state));
//       }
      
//       if (selectedMode === "specialization" && formData.specialization) {
//         filtered = filtered.filter(c => c.specialization === formData.specialization);
//       }
      
//       if (selectedMode === "budget") {
//         const maxFees = parseInt(formData.maxFees);
//         filtered = filtered.filter(c => c.fees <= maxFees);
//       }
      
//       if (selectedMode === "college-type" && formData.collegeType !== "all") {
//         filtered = filtered.filter(c => c.type.toLowerCase() === formData.collegeType.toLowerCase());
//       }
      
//       if (selectedMode === "top-rankers") {
//         filtered = filtered.filter(c => c.closing_rank <= parseInt(formData.topN || "50"));
//       }
      
//       setResults(filtered);
//       setIsModalOpen(false);
//       setIsLoading(false);
//     }, 1000);
//   };

//   const renderStepContent = () => {
//     if (!selectedMode) return null;

//     const mode = predictorModes.find(m => m.id === selectedMode);
    
//     switch (selectedMode) {
//       case "basic":
//         if (currentStep === 0) {
//           return (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Calculator className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
//               <p className="text-slate-600">{mode?.description}</p>
//             </div>
//           );
//         } else if (currentStep === 1) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your NEET PG Rank</h3>
//               <input
//                 type="number"
//                 value={formData.rank}
//                 onChange={(e) => handleChange("rank", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholder="e.g., 500"
//               />
//             </div>
//           );
//         } else if (currentStep === 2) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Select Your Category</h3>
//               <div className="space-y-3">
//                 {categories.map((cat) => (
//                   <label key={cat} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
//                     <input
//                       type="radio"
//                       name="category"
//                       value={cat}
//                       checked={formData.category === cat}
//                       onChange={() => handleChange("category", cat)}
//                       className="accent-blue-500"
//                     />
//                     <span className="text-slate-700">{cat}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           );
//         }
//         break;

//       case "state":
//         if (currentStep === 0) {
//           return (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <MapPin className="w-8 h-8 text-green-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
//               <p className="text-slate-600">{mode?.description}</p>
//             </div>
//           );
//         } else if (currentStep === 1) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your Rank</h3>
//               <input
//                 type="number"
//                 value={formData.rank}
//                 onChange={(e) => handleChange("rank", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
//                 placeholder="e.g., 500"
//               />
//             </div>
//           );
//         } else if (currentStep === 2) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Your Domicile State</h3>
//               <select
//                 value={formData.domicileState}
//                 onChange={(e) => handleChange("domicileState", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
//               >
//                 <option value="">Select State</option>
//                 {states.map((state) => (
//                   <option key={state} value={state}>{state}</option>
//                 ))}
//               </select>
//             </div>
//           );
//         } else if (currentStep === 3) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Preferred States (Select up to 5)</h3>
//               <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
//                 {states.map((state) => (
//                   <label key={state} className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 p-2 rounded-lg">
//                     <input 
//                       type="checkbox"
//                       checked={formData.preferredStates.includes(state)}
//                       onChange={(e) => {
//                         if (e.target.checked && formData.preferredStates.length < 5) {
//                           handleChange("preferredStates", [...formData.preferredStates, state]);
//                         } else {
//                           handleChange("preferredStates", formData.preferredStates.filter((s) => s !== state));
//                         }
//                       }}
//                       className="accent-green-500"
//                     />
//                     <span className="text-sm text-slate-700">{state}</span>
//                   </label>
//                 ))}
//               </div>
//               <p className="text-xs text-slate-500 mt-2">
//                 {formData.preferredStates.length}/5 states selected
//               </p>
//             </div>
//           );
//         }
//         break;

//       case "specialization":
//         if (currentStep === 0) {
//           return (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Stethoscope className="w-8 h-8 text-purple-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
//               <p className="text-slate-600">{mode?.description}</p>
//             </div>
//           );
//         } else if (currentStep === 1) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your Rank</h3>
//               <input
//                 type="number"
//                 value={formData.rank}
//                 onChange={(e) => handleChange("rank", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
//                 placeholder="e.g., 500"
//               />
//             </div>
//           );
//         } else if (currentStep === 2) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Select Category</h3>
//               <div className="space-y-3">
//                 {categories.map((cat) => (
//                   <label key={cat} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
//                     <input
//                       type="radio"
//                       name="category"
//                       value={cat}
//                       checked={formData.category === cat}
//                       onChange={() => handleChange("category", cat)}
//                       className="accent-purple-500"
//                     />
//                     <span className="text-slate-700">{cat}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           );
//         } else if (currentStep === 3) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Choose Specialization</h3>
//               <select
//                 value={formData.specialization}
//                 onChange={(e) => handleChange("specialization", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
//               >
//                 <option value="">Select Specialization</option>
//                 {specializations.map((spec) => (
//                   <option key={spec} value={spec}>{spec}</option>
//                 ))}
//               </select>
//             </div>
//           );
//         }
//         break;

//       case "budget":
//         if (currentStep === 0) {
//           return (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <DollarSign className="w-8 h-8 text-orange-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
//               <p className="text-slate-600">{mode?.description}</p>
//             </div>
//           );
//         } else if (currentStep === 1) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your Rank</h3>
//               <input
//                 type="number"
//                 value={formData.rank}
//                 onChange={(e) => handleChange("rank", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 placeholder="e.g., 500"
//               />
//             </div>
//           );
//         } else if (currentStep === 2) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Maximum Annual Fees (₹)</h3>
//               <input
//                 type="number"
//                 value={formData.maxFees}
//                 onChange={(e) => handleChange("maxFees", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 placeholder="e.g., 500000"
//               />
//               <p className="text-sm text-slate-500 mt-2">₹{parseInt(formData.maxFees || "0").toLocaleString()}/year</p>
//             </div>
//           );
//         } else if (currentStep === 3) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Bond Preference</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-slate-700 mb-2 block">Accept Bond?</label>
//                   <div className="space-y-2">
//                     {["Yes", "No", "Only if unavoidable"].map((opt) => (
//                       <label key={opt} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
//                         <input
//                           type="radio"
//                           name="bondAcceptable"
//                           value={opt.toLowerCase()}
//                           checked={formData.bondAcceptable === opt.toLowerCase()}
//                           onChange={() => handleChange("bondAcceptable", opt.toLowerCase())}
//                           className="accent-orange-500"
//                         />
//                         <span className="text-slate-700">{opt}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         } else if (currentStep === 4) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Maximum Bond Duration (Years)</h3>
//               <input
//                 type="number"
//                 value={formData.maxBondYears}
//                 onChange={(e) => handleChange("maxBondYears", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 placeholder="e.g., 5"
//               />
//             </div>
//           );
//         }
//         break;

//       case "college-type":
//         if (currentStep === 0) {
//           return (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Building2 className="w-8 h-8 text-pink-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
//               <p className="text-slate-600">{mode?.description}</p>
//             </div>
//           );
//         } else if (currentStep === 1) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Enter Your Rank</h3>
//               <input
//                 type="number"
//                 value={formData.rank}
//                 onChange={(e) => handleChange("rank", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
//                 placeholder="e.g., 500"
//               />
//             </div>
//           );
//         } else if (currentStep === 2) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">College Type</h3>
//               <div className="space-y-3">
//                 {collegeTypes.map((type) => (
//                   <label key={type} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
//                     <input
//                       type="radio"
//                       name="collegeType"
//                       value={type.toLowerCase()}
//                       checked={formData.collegeType === type.toLowerCase()}
//                       onChange={() => handleChange("collegeType", type.toLowerCase())}
//                       className="accent-pink-500"
//                     />
//                     <span className="text-slate-700">{type}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           );
//         } else if (currentStep === 3) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Quota Preference</h3>
//               <div className="space-y-3">
//                 {quotas.map((q) => (
//                   <label key={q} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
//                     <input
//                       type="radio"
//                       name="quota"
//                       value={q.toLowerCase()}
//                       checked={formData.quota === q.toLowerCase()}
//                       onChange={() => handleChange("quota", q.toLowerCase())}
//                       className="accent-pink-500"
//                     />
//                     <span className="text-slate-700">{q}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           );
//         }
//         break;

//       case "top-rankers":
//         if (currentStep === 0) {
//           return (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Award className="w-8 h-8 text-yellow-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-2">{mode?.title}</h3>
//               <p className="text-slate-600">{mode?.description}</p>
//             </div>
//           );
//         } else if (currentStep === 1) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Analyze Top N Rankers</h3>
//               <input
//                 type="number"
//                 value={formData.topN}
//                 onChange={(e) => handleChange("topN", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//                 placeholder="e.g., 50"
//               />
//               <p className="text-sm text-slate-500 mt-2">See where top {formData.topN} rankers got admitted</p>
//             </div>
//           );
//         } else if (currentStep === 2) {
//           return (
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 mb-4">Filter by Category (Optional)</h3>
//               <div className="space-y-3">
//                 <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
//                   <input
//                     type="radio"
//                     name="category"
//                     value=""
//                     checked={formData.category === ""}
//                     onChange={() => handleChange("category", "")}
//                     className="accent-yellow-500"
//                   />
//                   <span className="text-slate-700">All Categories</span>
//                 </label>
//                 {categories.map((cat) => (
//                   <label key={cat} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
//                     <input
//                       type="radio"
//                       name="category"
//                       value={cat}
//                       checked={formData.category === cat}
//                       onChange={() => handleChange("category", cat)}
//                       className="accent-yellow-500"
//                     />
//                     <span className="text-slate-700">{cat}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           );
//         }
//         break;
//     }
//   };

//   // Statistics
//   const getStatistics = () => {
//     if (results.length === 0) return null;

//     const govtColleges = results.filter(c => c.type === "Government").length;
//     const privateColleges = results.filter(c => c.type === "Private").length;
//     const deemedColleges = results.filter(c => c.type === "Deemed").length;
    
//     const avgFees = results.reduce((sum, c) => sum + c.fees, 0) / results.length;
//     const withBond = results.filter(c => c.bond_years > 0).length;
    
//     const stateDistribution = results.reduce((acc, c) => {
//       acc[c.state] = (acc[c.state] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     return { govtColleges, privateColleges, deemedColleges, avgFees, withBond, stateDistribution };
//   };

//   const stats = getStatistics();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold text-slate-800">NEET PG College Predictor 2025</h1>
//           <p className="text-slate-600 text-sm mt-1">Choose your prediction mode and find your perfect college</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl text-center">
//           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//             <GraduationCap className="w-8 h-8" />
//           </div>
//           <h2 className="text-3xl font-bold mb-4">Advanced NEET PG College Predictor</h2>
//           <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
//             6 Different prediction modes to help you find the perfect postgraduate medical college
//           </p>
//         </div>

//         {/* Predictor Modes Grid */}
//         {!results.length && (
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-slate-800 mb-6">Choose Your Prediction Mode</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {predictorModes.map((mode) => {
//                 const Icon = mode.icon;
//                 return (
//                   <div
//                     key={mode.id}
//                     onClick={() => selectMode(mode.id)}
//                     className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-indigo-200"
//                   >
//                     <div className={`w-14 h-14 bg-gradient-to-r ${mode.color} rounded-xl flex items-center justify-center mb-4`}>
//                       <Icon className="w-7 h-7 text-white" />
//                     </div>
//                     <h4 className="text-lg font-bold text-slate-800 mb-2">{mode.title}</h4>
//                     <p className="text-slate-600 text-sm">{mode.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Statistics Dashboard */}
//         {results.length > 0 && stats && (
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
//               <BarChart3 className="w-6 h-6 text-indigo-600" />
//               <span>Results Overview</span>
//             </h3>
            
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               <div className="bg-white rounded-xl p-4 shadow-md">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-slate-600 text-sm">Total Colleges</span>
//                   <Target className="w-5 h-5 text-blue-500" />
//                 </div>
//                 <p className="text-3xl font-bold text-slate-800">{results.length}</p>
//               </div>
              
//               <div className="bg-white rounded-xl p-4 shadow-md">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-slate-600 text-sm">Government</span>
//                   <Building2 className="w-5 h-5 text-green-500" />
//                 </div>
//                 <p className="text-3xl font-bold text-green-600">{stats.govtColleges}</p>
//               </div>
              
//               <div className="bg-white rounded-xl p-4 shadow-md">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-slate-600 text-sm">Private</span>
//                   <Building2 className="w-5 h-5 text-orange-500" />
//                 </div>
//                 <p className="text-3xl font-bold text-orange-600">{stats.privateColleges}</p>
//               </div>
              
//               <div className="bg-white rounded-xl p-4 shadow-md">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-slate-600 text-sm">Avg. Fees</span>
//                   <IndianRupee className="w-5 h-5 text-purple-500" />
//                 </div>
//                 <p className="text-2xl font-bold text-purple-600">₹{(stats.avgFees / 100000).toFixed(1)}L</p>
//               </div>
//             </div>

//             {/* State Distribution */}
//             <div className="bg-white rounded-xl p-6 shadow-md mb-6">
//               <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
//                 <MapPin className="w-5 h-5 text-indigo-600" />
//                 <span>State-wise Distribution</span>
//               </h4>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {Object.entries(stats.stateDistribution).map(([state, count]) => (
//                   <div key={state} className="bg-slate-50 rounded-lg p-3">
//                     <p className="text-xs text-slate-600">{state}</p>
//                     <p className="text-xl font-bold text-slate-800">{count}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Bond Statistics */}
//             <div className="bg-white rounded-xl p-6 shadow-md">
//               <h4 className="text-lg font-bold text-slate-800 mb-4">Bond Information</h4>
//               <div className="flex items-center space-x-4">
//                 <div className="flex-1 bg-red-50 rounded-lg p-4">
//                   <p className="text-sm text-red-600 mb-1">Colleges with Bond</p>
//                   <p className="text-2xl font-bold text-red-700">{stats.withBond}</p>
//                 </div>
//                 <div className="flex-1 bg-green-50 rounded-lg p-4">
//                   <p className="text-sm text-green-600 mb-1">No Bond Required</p>
//                   <p className="text-2xl font-bold text-green-700">{results.length - stats.withBond}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Results Table */}
//         {results.length > 0 && (
//           <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
//                 <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
//                 <span>College Results ({results.length})</span>
//               </h3>
//               <button
//                 onClick={() => selectMode(selectedMode!)}
//                 className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center space-x-1"
//               >
//                 <Filter className="w-4 h-4" />
//                 <span>Refine Search</span>
//               </button>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b-2 border-slate-200">
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">College</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Specialization</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">State</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Type</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Rank Range</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Seats</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Fees</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Bond</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {results.map((college, idx) => (
//                     <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
//                       <td className="py-4 px-4">
//                         <div>
//                           <p className="font-semibold text-slate-800 text-sm">{college.institute_name}</p>
//                           <p className="text-xs text-slate-500">{college.location}</p>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 text-sm text-slate-700">{college.specialization}</td>
//                       <td className="py-4 px-4">
//                         <span className="inline-flex items-center space-x-1 text-sm text-slate-700">
//                           <MapPin className="w-3 h-3" />
//                           <span>{college.state}</span>
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           college.type === "Government" ? "bg-green-100 text-green-700" :
//                           college.type === "Private" ? "bg-orange-100 text-orange-700" :
//                           "bg-blue-100 text-blue-700"
//                         }`}>
//                           {college.type}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4 text-sm">
//                         <div className="text-slate-700">
//                           <p className="font-semibold">{college.opening_rank} - {college.closing_rank}</p>
//                           <p className="text-xs text-slate-500">{college.quota}</p>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 text-sm font-semibold text-slate-700">{college.seats}</td>
//                       <td className="py-4 px-4">
//                         <p className="text-sm font-semibold text-slate-800">₹{(college.fees / 100000).toFixed(2)}L</p>
//                         <p className="text-xs text-slate-500">per year</p>
//                       </td>
//                       <td className="py-4 px-4">
//                         {college.bond_years > 0 ? (
//                           <div className="text-sm">
//                             <p className="text-red-600 font-semibold">{college.bond_years} years</p>
//                             <p className="text-xs text-slate-500">₹{(college.bond_amount / 100000).toFixed(1)}L</p>
//                           </div>
//                         ) : (
//                           <span className="text-green-600 text-sm font-medium">No Bond</span>
//                         )}
//                       </td>
//                       <td className="py-4 px-4">
//                         <a
//                           href={college.website}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-indigo-600 hover:text-indigo-700 text-sm font-medium inline-flex items-center space-x-1"
//                         >
//                           <span>Visit</span>
//                           <ArrowRight className="w-3 h-3" />
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!results.length && !isModalOpen && (
//           <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
//             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-10 h-10 text-slate-400" />
//             </div>
//             <h3 className="text-2xl font-bold text-slate-800 mb-2">Start Your Search</h3>
//             <p className="text-slate-600 mb-6">Select a prediction mode above to find colleges matching your criteria</p>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => {
//                 setIsModalOpen(false);
//                 setCurrentStep(0);
//               }}
//               className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             {/* Progress */}
//             <div className="mb-6">
//               <div className="flex justify-between text-sm text-slate-500 mb-2">
//                 <span>Step {currentStep + 1} of {getTotalSteps()}</span>
//                 <span>{Math.round(((currentStep + 1) / getTotalSteps()) * 100)}% Complete</span>
//               </div>
//               <div className="w-full bg-slate-200 rounded-full h-2">
//                 <div
//                   className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${((currentStep + 1) / getTotalSteps()) * 100}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Step Content */}
//             <div className="mb-8">
//               {renderStepContent()}
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between">
//               {currentStep > 0 ? (
//                 <button
//                   onClick={prevStep}
//                   className="px-5 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
//                 >
//                   Back
//                 </button>
//               ) : (
//                 <div></div>
//               )}

//               {currentStep === getTotalSteps() - 1 ? (
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isLoading}
//                   className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-medium flex items-center space-x-2 transition-colors"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       <span>Analyzing...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Get Results</span>
//                       <ArrowRight className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>
//               ) : (
//                 <button
//                   onClick={nextStep}
//                   className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
//                 >
//                   Next
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NEETPGPredictor;

// Working code by csv files 


// import React, { useState, useEffect } from 'react';
// import { Search, TrendingUp, DollarSign, Users, Building2, Award, ArrowLeft, ArrowRight, Home, MapPin, Calendar, Bed, IndianRupee, FileText } from 'lucide-react';

// const NEETPGPredictor = () => {
//   const [activeMode, setActiveMode] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [resultsData, setResultsData] = useState(null);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showComingSoon, setShowComingSoon] = useState(true); // Add this new state
  
//   // CSV Data States
//   const [closingRanks, setClosingRanks] = useState([]);
//   const [feeData, setFeeData] = useState([]);
//   const [instituteData, setInstituteData] = useState([]);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   // Form States
//   const [rankInput, setRankInput] = useState('');
//   const [category, setCategory] = useState('OPEN');
//   const [quota, setQuota] = useState('All India');
//   const [selectedStates, setSelectedStates] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [maxFee, setMaxFee] = useState('');
//   const [maxBondYears, setMaxBondYears] = useState('');
//   const [bondAcceptable, setBondAcceptable] = useState('any');
//   const [instituteType, setInstituteType] = useState('');
//   const [topN, setTopN] = useState('50');

//   // Load CSV Data on mount
//   useEffect(() => {
//     loadAllCSVs();
//   }, []);

//   const loadAllCSVs = async () => {
//     try {
//       await Promise.all([
//         loadCSV('public/data/closingranks2.csv', setClosingRanks),
//         loadCSV('public/data/feestiphendbond.csv', setFeeData),
//         loadCSV('public/data/Insituites_data.csv', setInstituteData)
//       ]);
//       setDataLoaded(true);
//       console.log('✅ All CSV data loaded successfully');
//     } catch (error) {
//       console.error('❌ Error loading CSV files:', error);
//     }
//   };

//   const loadCSV = async (filename, setter) => {
//     try {
//       const data = await window.fs.readFile(filename, { encoding: 'utf8' });
//       const Papa = await import('https://cdn.jsdelivr.net/npm/papaparse@5.4.1/+esm');
//       const parsed = Papa.default.parse(data, { 
//         header: true, 
//         skipEmptyLines: true,
//         dynamicTyping: true 
//       });
      
//       const cleanedData = parsed.data.map(row => {
//         const cleanRow = {};
//         Object.keys(row).forEach(key => {
//           cleanRow[key.trim()] = row[key];
//         });
//         return cleanRow;
//       });
      
//       setter(cleanedData);
//       console.log(`📁 ${filename}: ${cleanedData.length} rows loaded`);
//     } catch (error) {
//       console.error(`❌ Error loading ${filename}:`, error);
//     }
//   };

//   const modes = [
//     {
//       id: 'basic',
//       name: 'Basic Rank Predictor',
//       icon: TrendingUp,
//       description: 'Find colleges based on your rank and category',
//       color: 'from-blue-500 to-blue-600',
//       steps: 3
//     },
//     {
//       id: 'state',
//       name: 'State-wise Predictor',
//       icon: MapPin,
//       description: 'Get colleges in your preferred states with domicile priority',
//       color: 'from-green-500 to-green-600',
//       steps: 3
//     },
//     {
//       id: 'specialization',
//       name: 'Specialization Finder',
//       icon: Search,
//       description: 'Search for specific medical specializations',
//       color: 'from-purple-500 to-purple-600',
//       steps: 3
//     },
//     {
//       id: 'budget',
//       name: 'Budget-based Search',
//       icon: DollarSign,
//       description: 'Filter by fees, bond years, and penalties',
//       color: 'from-yellow-500 to-yellow-600',
//       steps: 4
//     },
//     {
//       id: 'type',
//       name: 'College Type Filter',
//       icon: Building2,
//       description: 'Filter by Government, Private, or Deemed institutions',
//       color: 'from-red-500 to-red-600',
//       steps: 3
//     },
//     {
//       id: 'toprankers',
//       name: 'Top Rankers Analysis',
//       icon: Award,
//       description: 'View colleges with lowest closing ranks',
//       color: 'from-indigo-500 to-indigo-600',
//       steps: 2
//     }
//   ];

//   const combineData = (rankRow) => {
//     const feeInfo = feeData.find(f => 
//       f.Institute && rankRow.College && 
//       f.Institute.toLowerCase().includes(rankRow.College.toLowerCase().substring(0, 15))
//     );
    
//     const instInfo = instituteData.find(i => 
//       i.Institute && rankRow.College && 
//       i.Institute.toLowerCase().includes(rankRow.College.toLowerCase().substring(0, 15))
//     );

//     const getClosingRank = () => {
//       return rankRow['2024 R5'] || rankRow['2024 R4'] || rankRow['2024 R3'] || rankRow['2024 R2'] || 'N/A';
//     };

//     const getOpeningRank = () => {
//       return rankRow['2024 R1'] || rankRow['2024 R2'] || 'N/A';
//     };

//     const parseBondYears = (bondText) => {
//       if (!bondText) return 0;
//       const match = String(bondText).match(/(\d+)/);
//       return match ? parseInt(match[1]) : 0;
//     };

//     const parseFee = (feeText) => {
//       if (!feeText) return 0;
//       return parseFloat(String(feeText).replace(/,/g, ''));
//     };

//     return {
//       college: rankRow.College,
//       course: rankRow.Course,
//       state: rankRow.State,
//       quota: rankRow['Alloted Quota'],
//       category: rankRow['Alloted Category'],
//       openingRank: getOpeningRank(),
//       closingRank: getClosingRank(),
//       fee: feeInfo?.['Course Fee'] || rankRow['Course Fee'] || 'N/A',
//       feeNumeric: parseFee(feeInfo?.['Course Fee'] || rankRow['Course Fee']),
//       stipendY1: feeInfo?.['Stipend Year 1'] || 'N/A',
//       stipendY2: feeInfo?.['Stipend Year 2'] || 'N/A',
//       stipendY3: feeInfo?.['Stipend Year 3'] || 'N/A',
//       bond: feeInfo?.Bond || 'N/A',
//       bondYears: parseBondYears(feeInfo?.Bond),
//       bondPenalty: feeInfo?.['Bond Penalty'] || 'N/A',
//       instituteType: instInfo?.['Institute Type'] || 'N/A',
//       beds: instInfo?.['Total Hospital Beds'] || feeInfo?.['Hosp Beds'] || 'N/A',
//       established: instInfo?.['Year of Establishment'] || 'N/A',
//       pgSeats: instInfo?.['Total PG Seats'] || 'N/A'
//     };
//   };

//   const handleSubmit = () => {
//     console.log('=== PREDICTOR SUBMISSION ===');
//     console.log('Mode:', activeMode?.name);
//     console.log('Step:', currentStep);
//     console.log('Form Data:', { rankInput, category, quota, selectedStates, selectedCourse, maxFee, maxBondYears, bondAcceptable, instituteType, topN });
    
//     let filtered = [];
//     const rank = parseInt(rankInput);

//     switch(activeMode?.id) {
//       case 'basic':
//         filtered = closingRanks
//           .filter(row => {
//             const closing = parseInt(row['2024 R5']) || parseInt(row['2024 R4']) || parseInt(row['2024 R3']);
//             const opening = parseInt(row['2024 R1']) || parseInt(row['2024 R2']) || closing;
//             return category === row['Alloted Category'] && 
//                    rank >= opening && rank <= closing;
//           })
//           .map(combineData);
//         break;

//       case 'state':
//         filtered = closingRanks
//           .filter(row => {
//             const closing = parseInt(row['2024 R5']) || parseInt(row['2024 R4']);
//             const opening = parseInt(row['2024 R1']) || parseInt(row['2024 R2']) || closing;
//             return rank >= opening && rank <= closing &&
//                    category === row['Alloted Category'] &&
//                    (selectedStates.length === 0 || selectedStates.includes(row.State));
//           })
//           .map(combineData)
//           .sort((a, b) => {
//             const aDomicile = selectedStates[0] === a.state ? 0 : 1;
//             const bDomicile = selectedStates[0] === b.state ? 0 : 1;
//             return aDomicile - bDomicile;
//           });
//         break;

//       case 'specialization':
//         filtered = closingRanks
//           .filter(row => {
//             const closing = parseInt(row['2024 R5']) || parseInt(row['2024 R4']);
//             const opening = parseInt(row['2024 R1']) || parseInt(row['2024 R2']) || closing;
//             return rank >= opening && rank <= closing &&
//                    category === row['Alloted Category'] &&
//                    (!selectedCourse || row.Course.toLowerCase().includes(selectedCourse.toLowerCase()));
//           })
//           .map(combineData);
//         break;

//       case 'budget':
//         filtered = closingRanks
//           .map(combineData)
//           .filter(row => {
//             const feeMatch = !maxFee || row.feeNumeric <= parseFloat(maxFee);
//             const bondMatch = !maxBondYears || row.bondYears <= parseInt(maxBondYears);
//             const bondPref = bondAcceptable === 'any' || 
//                             (bondAcceptable === 'no' && row.bondYears === 0) ||
//                             (bondAcceptable === 'yes' && row.bondYears > 0);
//             return feeMatch && bondMatch && bondPref;
//           })
//           .sort((a, b) => a.feeNumeric - b.feeNumeric);
//         break;

//       case 'type':
//         filtered = closingRanks
//           .map(combineData)
//           .filter(row => {
//             const typeMatch = !instituteType || row.instituteType.toLowerCase().includes(instituteType.toLowerCase());
//             const quotaMatch = !quota || row.quota === quota;
//             const categoryMatch = category === row.category;
//             return typeMatch && quotaMatch && categoryMatch;
//           });
//         break;

//       case 'toprankers':
//         filtered = closingRanks
//           .filter(row => category === row['Alloted Category'])
//           .map(combineData)
//           .filter(row => row.closingRank !== 'N/A')
//           .sort((a, b) => parseInt(a.closingRank) - parseInt(b.closingRank))
//           .slice(0, parseInt(topN));
//         break;
//     }

//     console.log('✅ Results Generated:', filtered.length, 'colleges');
//     setResultsData(filtered);
//     setShowResults(true);
//   };

//   const handleBack = () => {
//     setShowResults(false);
//     setResultsData(null);
//     setActiveMode(null);
//     setCurrentStep(1);
//     setRankInput('');
//     setSelectedStates([]);
//     setSelectedCourse('');
//     setMaxFee('');
//     setMaxBondYears('');
//     setInstituteType('');
//     setTopN('50');
//   };

//   const renderFormStep = () => {
//     if (!activeMode) return null;

//     const commonFields = (
//       <>
//         {activeMode.id !== 'budget' && activeMode.id !== 'toprankers' && currentStep === 1 && (
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Your NEET PG Rank</label>
//             <input
//               type="number"
//               value={rankInput}
//               onChange={(e) => setRankInput(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="Enter your rank"
//             />
//           </div>
//         )}

//         {activeMode.id !== 'budget' && currentStep === 2 && (
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
//             >
//               <option>OPEN</option>
//               <option>OBC</option>
//               <option>SC</option>
//               <option>ST</option>
//               <option>EWS</option>
//             </select>
//           </div>
//         )}
//       </>
//     );

//     switch(activeMode.id) {
//       case 'basic':
//         return (
//           <>
//             {commonFields}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Quota Preference</label>
//                 <select
//                   value={quota}
//                   onChange={(e) => setQuota(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>All India</option>
//                   <option>State</option>
//                   <option>DNB</option>
//                   <option>Management</option>
//                 </select>
//               </div>
//             )}
//           </>
//         );

//       case 'state':
//         return (
//           <>
//             {commonFields}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred States (comma separated)</label>
//                 <input
//                   type="text"
//                   value={selectedStates.join(', ')}
//                   onChange={(e) => setSelectedStates(e.target.value.split(',').map(s => s.trim()))}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., Delhi, Maharashtra, Karnataka"
//                 />
//                 <p className="text-xs text-gray-500 mt-2">First state will be prioritized (domicile)</p>
//               </div>
//             )}
//           </>
//         );

//       case 'specialization':
//         return (
//           <>
//             {commonFields}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
//                 <input
//                   type="text"
//                   value={selectedCourse}
//                   onChange={(e) => setSelectedCourse(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., Medicine, Surgery, Pediatrics"
//                 />
//               </div>
//             )}
//           </>
//         );

//       case 'budget':
//         return (
//           <>
//             {currentStep === 1 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Course Fee (₹)</label>
//                 <input
//                   type="number"
//                   value={maxFee}
//                   onChange={(e) => setMaxFee(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., 500000"
//                 />
//               </div>
//             )}
//             {currentStep === 2 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Bond Years</label>
//                 <input
//                   type="number"
//                   value={maxBondYears}
//                   onChange={(e) => setMaxBondYears(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., 2"
//                 />
//               </div>
//             )}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Bond Preference</label>
//                 <select
//                   value={bondAcceptable}
//                   onChange={(e) => setBondAcceptable(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="any">Any (With or Without Bond)</option>
//                   <option value="no">No Bond Only</option>
//                   <option value="yes">With Bond Only</option>
//                 </select>
//               </div>
//             )}
//             {currentStep === 4 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>OPEN</option>
//                   <option>OBC</option>
//                   <option>SC</option>
//                   <option>ST</option>
//                   <option>EWS</option>
//                 </select>
//               </div>
//             )}
//           </>
//         );

//       case 'type':
//         return (
//           <>
//             {currentStep === 1 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Institute Type</label>
//                 <select
//                   value={instituteType}
//                   onChange={(e) => setInstituteType(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Types</option>
//                   <option value="Government">Government</option>
//                   <option value="Private">Private</option>
//                   <option value="Deemed">Deemed University</option>
//                 </select>
//               </div>
//             )}
//             {currentStep === 2 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Quota</label>
//                 <select
//                   value={quota}
//                   onChange={(e) => setQuota(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Quotas</option>
//                   <option>All India</option>
//                   <option>State</option>
//                   <option>Management</option>
//                 </select>
//               </div>
//             )}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>OPEN</option>
//                   <option>OBC</option>
//                   <option>SC</option>
//                   <option>ST</option>
//                   <option>EWS</option>
//                 </select>
//               </div>
//             )}
//           </>
//         );

//       case 'toprankers':
//         return (
//           <>
//             {currentStep === 1 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Top Colleges</label>
//                 <input
//                   type="number"
//                   value={topN}
//                   onChange={(e) => setTopN(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., 50"
//                 />
//               </div>
//             )}
//             {currentStep === 2 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option>OPEN</option>
//                   <option>OBC</option>
//                   <option>SC</option>
//                   <option>ST</option>
//                   <option>EWS</option>
//                 </select>
//               </div>
//             )}
//           </>
//         );
//     }
//   };

//   if (showResults && resultsData) {
//     const stats = {
//       total: resultsData.length,
//       govt: resultsData.filter(r => r.instituteType.toLowerCase().includes('government')).length,
//       private: resultsData.filter(r => r.instituteType.toLowerCase().includes('private')).length,
//       avgFee: resultsData.filter(r => r.feeNumeric > 0).reduce((sum, r) => sum + r.feeNumeric, 0) / resultsData.filter(r => r.feeNumeric > 0).length || 0
//     };

//     const stateDistribution = {};
//     resultsData.forEach(r => {
//       stateDistribution[r.state] = (stateDistribution[r.state] || 0) + 1;
//     });

//     const bondColleges = resultsData.filter(r => r.bondYears > 0).length;

//     return (
//     <>
//     {/* Coming Soon Overlay */}
//     {showComingSoon && (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
//         <div className="relative bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-4 text-center transform animate-pulse">
//           {/* Close button (optional) */}
//           <button
//             onClick={() => setShowComingSoon(false)}
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
//             title="Preview Mode"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           {/* Icon */}
//           <div className="inline-block p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
//             <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>

//           {/* Heading */}
//           <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             Coming Soon!
//           </h2>

//           {/* Description */}
//           <p className="text-xl text-gray-600 mb-6">
//             We're working hard to bring you the most accurate NEET PG College Predictor
//           </p>

//           <div className="space-y-3 mb-8">
//             <div className="flex items-center justify-center gap-3 text-gray-700">
//               <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <span>Real-time College Predictions</span>
//             </div>
//             <div className="flex items-center justify-center gap-3 text-gray-700">
//               <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <span>Advanced Filtering Options</span>
//             </div>
//             <div className="flex items-center justify-center gap-3 text-gray-700">
//               <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <span>Comprehensive Analytics</span>
//             </div>
//           </div>

//           {/* Launch Date */}
//           <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg">
//             Launching Soon
//           </div>

//           {/* Preview hint */}
//           <p className="text-sm text-gray-400 mt-6">
//             Click the × button above to preview the interface
//           </p>
//         </div>
//       </div>
//     )}

//     {/* Original content with blur effect */}
//     <div className={showComingSoon ? "blur-sm pointer-events-none" : ""}>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        
//       {/* <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6"> */}
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-white mb-2">{activeMode?.name} Results</h1>
//                   <p className="text-blue-100">Comprehensive analysis of your college options</p>
//                 </div>
//                 <button
//                   onClick={handleBack}
//                   className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
//                 >
//                   <Home size={20} />
//                   Back to Modes
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Total Colleges</p>
//                       <p className="text-3xl font-bold">{stats.total}</p>
//                     </div>
//                     <Building2 size={32} className="opacity-80" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Government</p>
//                       <p className="text-3xl font-bold">{stats.govt}</p>
//                     </div>
//                     <Award size={32} className="opacity-80" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Private</p>
//                       <p className="text-3xl font-bold">{stats.private}</p>
//                     </div>
//                     <Building2 size={32} className="opacity-80" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Avg. Fee</p>
//                       <p className="text-2xl font-bold">₹{(stats.avgFee / 100000).toFixed(1)}L</p>
//                     </div>
//                     <IndianRupee size={32} className="opacity-80" />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-purple-100">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                     <MapPin size={20} className="text-purple-600" />
//                     State-wise Distribution
//                   </h3>
//                   <div className="space-y-2 max-h-48 overflow-y-auto">
//                     {Object.entries(stateDistribution).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([state, count]) => (
//                       <div key={state} className="flex items-center justify-between">
//                         <span className="text-sm text-gray-700">{state}</span>
//                         <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">{count}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-red-100">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                     <FileText size={20} className="text-red-600" />
//                     Bond Information
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-700">Colleges with Bond</span>
//                       <span className="text-2xl font-bold text-red-600">{bondColleges}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-700">Without Bond</span>
//                       <span className="text-2xl font-bold text-green-600">{stats.total - bondColleges}</span>
//                     </div>
//                     <div className="pt-3 border-t border-red-200">
//                       <p className="text-xs text-gray-500">
//                         {((bondColleges / stats.total) * 100).toFixed(1)}% of colleges have service bonds
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
//                 <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//                   <h3 className="text-lg font-bold text-gray-800">College Results</h3>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">College</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Course</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">State</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Rank Range</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Fee</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Bond</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Beds</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {resultsData.slice(0, 100).map((row, idx) => (
//                         <tr key={idx} className="hover:bg-blue-50 transition">
//                           <td className="px-4 py-3">
//                             <div className="flex items-start gap-2">
//                               <Building2 size={16} className="text-blue-600 mt-1 flex-shrink-0" />
//                               <div>
//                                 <p className="text-sm font-semibold text-gray-800">{row.college}</p>
//                                 <p className="text-xs text-gray-500">{row.quota}</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             <span className="text-sm text-gray-700">{row.course}</span>
//                           </td>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center gap-1">
//                               <MapPin size={14} className="text-green-600" />
//                               <span className="text-sm text-gray-700">{row.state}</span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                               row.instituteType.toLowerCase().includes('government') 
//                                 ? 'bg-green-100 text-green-700' 
//                                 : row.instituteType.toLowerCase().includes('private')
//                                 ? 'bg-purple-100 text-purple-700'
//                                 : 'bg-blue-100 text-blue-700'
//                             }`}>
//                               {row.instituteType}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3">
//                             <div className="text-xs">
//                               <span className="text-gray-500">Opening: </span>
//                               <span className="font-semibold text-gray-700">{row.openingRank}</span>
//                               <br />
//                               <span className="text-gray-500">Closing: </span>
//                               <span className="font-semibold text-gray-700">{row.closingRank}</span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             <div>
//                               <div className="flex items-center gap-1">
//                                 <IndianRupee size={14} className="text-yellow-600" />
//                                 <span className="text-sm font-semibold text-gray-800">{row.fee}</span>
//                               </div>
//                               {row.stipendY1 !== 'N/A' && (
//                                 <p className="text-xs text-green-600 mt-1">Stipend: {row.stipendY1}</p>
//                               )}
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             {row.bondYears > 0 ? (
//                               <div>
//                                 <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
//                                   {row.bondYears}Y
//                                 </span>
//                                 {row.bondPenalty !== 'N/A' && (
//                                   <p className="text-xs text-gray-500 mt-1">{row.bondPenalty}</p>
//                                 )}
//                               </div>
//                             ) : (
//                               <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                                 No Bond
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center gap-1">
//                               <Bed size={14} className="text-indigo-600" />
//                               <span className="text-sm text-gray-700">{row.beds}</span>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {resultsData.length === 0 && (
//                 <div className="text-center py-16">
//                   <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
//                     <Search size={48} className="text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-700 mb-2">No Results Found</h3>
//                   <p className="text-gray-500">Try adjusting your search criteria</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (activeMode) {
//     const Icon = activeMode.icon;
//     const totalSteps = activeMode.steps;
//     const progress = (currentStep / totalSteps) * 100;

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//         <div className="max-w-3xl mx-auto">
//           <button
//             onClick={() => {
//               setActiveMode(null);
//               setCurrentStep(1);
//             }}
//             className="mb-6 flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition"
//           >
//             <ArrowLeft size={20} />
//             <span className="font-semibold">Back to Modes</span>
//           </button>

//           <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//             <div className={`bg-gradient-to-r ${activeMode.color} p-8 text-white`}>
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
//                   <Icon size={40} />
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold">{activeMode.name}</h2>
//                   <p className="text-white text-opacity-90 mt-1">{activeMode.description}</p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
//                   <span>{Math.round(progress)}% Complete</span>
//                 </div>
//                 <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
//                   <div 
//                     className="h-full bg-white rounded-full transition-all duration-500"
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="p-8">
//               <div className="space-y-6">
//                 {renderFormStep()}
//               </div>

//               <div className="flex gap-4 mt-8">
//                 {currentStep > 1 && (
//                   <button
//                     onClick={() => setCurrentStep(currentStep - 1)}
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
//                   >
//                     <ArrowLeft size={20} />
//                     Previous
//                   </button>
//                 )}
                
//                 {currentStep < totalSteps ? (
//                   <button
//                     onClick={() => setCurrentStep(currentStep + 1)}
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
//                   >
//                     Next
//                     <ArrowRight size={20} />
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleSubmit}
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
//                   >
//                     <Search size={20} />
//                     Find Colleges
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             NEET PG College Predictor
//           </h1>
//           <p className="text-xl text-gray-600">Intelligent prediction system with 6 specialized modes</p>
          
//           <div className="flex items-center justify-center gap-4 mt-6">
//             <div className={`px-4 py-2 rounded-full ${dataLoaded ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//               <span className="font-semibold">{dataLoaded ? '✓ Data Loaded' : '⏳ Loading Data...'}</span>
//             </div>
//             <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
//               <span className="font-semibold">{closingRanks.length + feeData.length + instituteData.length} Records</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {modes.map((mode) => {
//             const Icon = mode.icon;
            
//             return (
//               <div
//                 key={mode.id}
//                 onClick={() => dataLoaded && setActiveMode(mode)}
//                 className={`group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${!dataLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 <div className={`bg-gradient-to-r ${mode.color} p-6 relative overflow-hidden`}>
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
//                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                  
//                   <div className="relative z-10">
//                     <div className="inline-block p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm mb-4">
//                       <Icon size={36} className="text-white" />
//                     </div>
//                     <h3 className="text-xl font-bold text-white mb-2">{mode.name}</h3>
//                     <p className="text-white text-opacity-90 text-sm leading-relaxed">{mode.description}</p>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                       ✓ Fully Working
//                     </span>
//                     <span className="text-sm text-gray-500">{mode.steps} Steps</span>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Ready to use</span>
//                     <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
//                       <span>Start</span>
//                       <ArrowRight size={18} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <TrendingUp size={24} className="text-blue-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">Smart Algorithms</h3>
//             </div>
//             <p className="text-gray-600 text-sm">Advanced filtering with fuzzy matching and multi-criteria analysis</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-green-100 rounded-lg">
//                 <Users size={24} className="text-green-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">Comprehensive Data</h3>
//             </div>
//             <p className="text-gray-600 text-sm">Closing ranks, fees, stipends, bonds, and institutional details</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <Award size={24} className="text-purple-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">Accurate Results</h3>
//             </div>
//             <p className="text-gray-600 text-sm">Real 2024 data with historical trends and detailed analytics</p>
//           </div>
//         </div>

//         <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white">
//           <h2 className="text-2xl font-bold mb-4">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-xl font-bold">1</span>
//               </div>
//               <p className="text-sm">Choose a predictor mode</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-xl font-bold">2</span>
//               </div>
//               <p className="text-sm">Fill step-by-step form</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-xl font-bold">3</span>
//               </div>
//               <p className="text-sm">Get instant predictions</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-xl font-bold">4</span>
//               </div>
//               <p className="text-sm">Analyze detailed results</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   </>
//   );
// };

// export default NEETPGPredictor;

// import React, { useState, useEffect } from 'react';
// import { Search, TrendingUp, DollarSign, Users, Building2, Award, ArrowLeft, ArrowRight, Home, MapPin, Calendar, Bed, IndianRupee, FileText } from 'lucide-react';

// const NEETPGPredictor = () => {
//   const [activeMode, setActiveMode] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [resultsData, setResultsData] = useState(null);
//   const [currentStep, setCurrentStep] = useState(1);
  
//   // CSV Data States
//   const [closingRanks, setClosingRanks] = useState([]);
//   const [feeData, setFeeData] = useState([]);
//   const [instituteData, setInstituteData] = useState([]);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   // Form States
//   const [rankInput, setRankInput] = useState('');
//   const [category, setCategory] = useState('OPEN');
//   const [quota, setQuota] = useState('All India');
//   const [selectedStates, setSelectedStates] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [maxFee, setMaxFee] = useState('');
//   const [maxBondYears, setMaxBondYears] = useState('');
//   const [bondAcceptable, setBondAcceptable] = useState('any');
//   const [instituteType, setInstituteType] = useState('');
//   const [topN, setTopN] = useState('50');

//   // Load CSV Data on mount
//   useEffect(() => {
//     loadAllCSVs();
//   }, []);

//   const loadAllCSVs = async () => {
//     try {
//       console.log('🔄 Starting CSV data load...');
//       await Promise.all([
//         loadCSV('public/data/closingranks2.csv', setClosingRanks),
//         loadCSV('public/data/feestiphendbond.csv', setFeeData),
//         loadCSV('public/data/Insituites_data.csv', setInstituteData)
//       ]);
//       setDataLoaded(true);
//       console.log('✅ All CSV data loaded successfully');
//       console.log('📊 Total Records:', {
//         closingRanks: closingRanks.length,
//         feeData: feeData.length,
//         instituteData: instituteData.length
//       });
//     } catch (error) {
//       console.error('❌ Error loading CSV files:', error);
//       console.error('Make sure files exist at: public/data/');
//     }
//   };

//   const loadCSV = async (filename, setter) => {
//     try {
//       console.log(`📂 Loading ${filename}...`);
//       const data = await window.fs.readFile(filename, { encoding: 'utf8' });
//       const Papa = await import('https://cdn.jsdelivr.net/npm/papaparse@5.4.1/+esm');
//       const parsed = Papa.default.parse(data, { 
//         header: true, 
//         skipEmptyLines: true,
//         dynamicTyping: true 
//       });
      
//       const cleanedData = parsed.data.map(row => {
//         const cleanRow = {};
//         Object.keys(row).forEach(key => {
//           cleanRow[key.trim()] = row[key];
//         });
//         return cleanRow;
//       });
      
//       setter(cleanedData);
//       console.log(`✅ ${filename}: ${cleanedData.length} rows loaded`);
//       console.log(`📋 First row sample:`, cleanedData[0]);
//       return cleanedData;
//     } catch (error) {
//       console.error(`❌ Error loading ${filename}:`, error);
//       console.error(`File path used: ${filename}`);
//       throw error;
//     }
//   };

//   const modes = [
//     {
//       id: 'basic',
//       name: 'Basic Rank Predictor',
//       icon: TrendingUp,
//       description: 'Find colleges based on your rank and category',
//       color: 'from-blue-500 to-blue-600',
//       steps: 3
//     },
//     {
//       id: 'state',
//       name: 'State-wise Predictor',
//       icon: MapPin,
//       description: 'Get colleges in your preferred states with domicile priority',
//       color: 'from-green-500 to-green-600',
//       steps: 3
//     },
//     {
//       id: 'specialization',
//       name: 'Specialization Finder',
//       icon: Search,
//       description: 'Search for specific medical specializations',
//       color: 'from-purple-500 to-purple-600',
//       steps: 3
//     },
//     {
//       id: 'budget',
//       name: 'Budget-based Search',
//       icon: DollarSign,
//       description: 'Filter by fees, bond years, and penalties',
//       color: 'from-yellow-500 to-yellow-600',
//       steps: 4
//     },
//     {
//       id: 'type',
//       name: 'College Type Filter',
//       icon: Building2,
//       description: 'Filter by Government, Private, or Deemed institutions',
//       color: 'from-red-500 to-red-600',
//       steps: 3
//     },
//     {
//       id: 'toprankers',
//       name: 'Top Rankers Analysis',
//       icon: Award,
//       description: 'View colleges with lowest closing ranks',
//       color: 'from-indigo-500 to-indigo-600',
//       steps: 2
//     }
//   ];

//   const combineData = (rankRow) => {
//     const feeInfo = feeData.find(f => 
//       f.Institute && rankRow.College && 
//       f.Institute.toLowerCase().includes(rankRow.College.toLowerCase().substring(0, 15))
//     );
    
//     const instInfo = instituteData.find(i => 
//       i.Institute && rankRow.College && 
//       i.Institute.toLowerCase().includes(rankRow.College.toLowerCase().substring(0, 15))
//     );

//     const getClosingRank = () => {
//       return rankRow['2024 R5'] || rankRow['2024 R4'] || rankRow['2024 R3'] || rankRow['2024 R2'] || 'N/A';
//     };

//     const getOpeningRank = () => {
//       return rankRow['2024 R1'] || rankRow['2024 R2'] || 'N/A';
//     };

//     const parseBondYears = (bondText) => {
//       if (!bondText) return 0;
//       const match = String(bondText).match(/(\d+)/);
//       return match ? parseInt(match[1]) : 0;
//     };

//     const parseFee = (feeText) => {
//       if (!feeText) return 0;
//       return parseFloat(String(feeText).replace(/,/g, ''));
//     };

//     return {
//       college: rankRow.College,
//       course: rankRow.Course,
//       state: rankRow.State,
//       quota: rankRow['Alloted Quota'],
//       category: rankRow['Alloted Category'],
//       openingRank: getOpeningRank(),
//       closingRank: getClosingRank(),
//       fee: feeInfo?.['Course Fee'] || rankRow['Course Fee'] || 'N/A',
//       feeNumeric: parseFee(feeInfo?.['Course Fee'] || rankRow['Course Fee']),
//       stipendY1: feeInfo?.['Stipend Year 1'] || 'N/A',
//       stipendY2: feeInfo?.['Stipend Year 2'] || 'N/A',
//       stipendY3: feeInfo?.['Stipend Year 3'] || 'N/A',
//       bond: feeInfo?.Bond || 'N/A',
//       bondYears: parseBondYears(feeInfo?.Bond),
//       bondPenalty: feeInfo?.['Bond Penalty'] || 'N/A',
//       instituteType: instInfo?.['Institute Type'] || 'N/A',
//       beds: instInfo?.['Total Hospital Beds'] || feeInfo?.['Hosp Beds'] || 'N/A',
//       established: instInfo?.['Year of Establishment'] || 'N/A',
//       pgSeats: instInfo?.['Total PG Seats'] || 'N/A'
//     };
//   };

//   const handleSubmit = () => {
//     console.log('=== PREDICTOR SUBMISSION ===');
//     console.log('Mode:', activeMode?.name);
//     console.log('Step:', currentStep);
//     console.log('Form Data:', { rankInput, category, quota, selectedStates, selectedCourse, maxFee, maxBondYears, bondAcceptable, instituteType, topN });
    
//     let filtered = [];
//     const rank = parseInt(rankInput);

//     switch(activeMode?.id) {
//       case 'basic':
//         filtered = closingRanks
//           .filter(row => {
//             const closing = parseInt(row['2024 R5']) || parseInt(row['2024 R4']) || parseInt(row['2024 R3']);
//             const opening = parseInt(row['2024 R1']) || parseInt(row['2024 R2']) || closing;
//             return category === row['Alloted Category'] && 
//                    rank >= opening && rank <= closing;
//           })
//           .map(combineData);
//         break;

//       case 'state':
//         filtered = closingRanks
//           .filter(row => {
//             const closing = parseInt(row['2024 R5']) || parseInt(row['2024 R4']);
//             const opening = parseInt(row['2024 R1']) || parseInt(row['2024 R2']) || closing;
//             return rank >= opening && rank <= closing &&
//                    category === row['Alloted Category'] &&
//                    (selectedStates.length === 0 || selectedStates.includes(row.State));
//           })
//           .map(combineData)
//           .sort((a, b) => {
//             const aDomicile = selectedStates[0] === a.state ? 0 : 1;
//             const bDomicile = selectedStates[0] === b.state ? 0 : 1;
//             return aDomicile - bDomicile;
//           });
//         break;

//       case 'specialization':
//         filtered = closingRanks
//           .filter(row => {
//             const closing = parseInt(row['2024 R5']) || parseInt(row['2024 R4']);
//             const opening = parseInt(row['2024 R1']) || parseInt(row['2024 R2']) || closing;
//             return rank >= opening && rank <= closing &&
//                    category === row['Alloted Category'] &&
//                    (!selectedCourse || row.Course.toLowerCase().includes(selectedCourse.toLowerCase()));
//           })
//           .map(combineData);
//         break;

//       case 'budget':
//         filtered = closingRanks
//           .map(combineData)
//           .filter(row => {
//             const feeMatch = !maxFee || row.feeNumeric <= parseFloat(maxFee);
//             const bondMatch = !maxBondYears || row.bondYears <= parseInt(maxBondYears);
//             const bondPref = bondAcceptable === 'any' || 
//                             (bondAcceptable === 'no' && row.bondYears === 0) ||
//                             (bondAcceptable === 'yes' && row.bondYears > 0);
//             return feeMatch && bondMatch && bondPref;
//           })
//           .sort((a, b) => a.feeNumeric - b.feeNumeric);
//         break;

//       case 'type':
//         filtered = closingRanks
//           .map(combineData)
//           .filter(row => {
//             const typeMatch = !instituteType || row.instituteType.toLowerCase().includes(instituteType.toLowerCase());
//             const quotaMatch = !quota || row.quota === quota;
//             const categoryMatch = category === row.category;
//             return typeMatch && quotaMatch && categoryMatch;
//           });
//         break;

//       case 'toprankers':
//         filtered = closingRanks
//           .filter(row => category === row['Alloted Category'])
//           .map(combineData)
//           .filter(row => row.closingRank !== 'N/A')
//           .sort((a, b) => parseInt(a.closingRank) - parseInt(b.closingRank))
//           .slice(0, parseInt(topN));
//         break;
//     }

//     console.log('✅ Results Generated:', filtered.length, 'colleges');
//     setResultsData(filtered);
//     setShowResults(true);
//   };

//   const handleBack = () => {
//     setShowResults(false);
//     setResultsData(null);
//     setActiveMode(null);
//     setCurrentStep(1);
//     setRankInput('');
//     setSelectedStates([]);
//     setSelectedCourse('');
//     setMaxFee('');
//     setMaxBondYears('');
//     setInstituteType('');
//     setTopN('50');
//   };

//   const renderFormStep = () => {
//     if (!activeMode) return null;

//     const commonFields = (
//       <>
//         {activeMode.id !== 'budget' && activeMode.id !== 'toprankers' && currentStep === 1 && (
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Your NEET PG Rank</label>
//             <input
//               type="number"
//               value={rankInput}
//               onChange={(e) => setRankInput(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="Enter your rank"
//             />
//           </div>
//         )}

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                     <select
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 transition bg-white text-gray-800 font-medium appearance-none cursor-pointer"
//                       style={{
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                         backgroundPosition: 'right 0.5rem center',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundSize: '1.5em 1.5em',
//                         paddingRight: '2.5rem'
//                       }}
//                     >
//                       <option value="OPEN">OPEN</option>
//                       <option value="OBC">OBC</option>
//                       <option value="SC">SC</option>
//                       <option value="ST">ST</option>
//                       <option value="EWS">EWS</option>
//                     </select>
//                   </div>
//       </>
//     );

//     switch(activeMode.id) {
//       case 'basic':
//         return (
//           <>
//             {commonFields}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Quota Preference</label>
//                 <select
//                   value={quota}
//                   onChange={(e) => setQuota(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundPosition: 'right 0.5rem center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '1.5em 1.5em',
//                     paddingRight: '2.5rem'
//                   }}
//                 >
//                   <option value="All India">All India</option>
//                   <option value="State">State</option>
//                   <option value="DNB">DNB</option>
//                   <option value="Management">Management</option>
//                 </select>
//               </div>
//             )}
//           </>
//         );

//       case 'state':
//         return (
//           <>
//             {commonFields}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred States (comma separated)</label>
//                 <input
//                   type="text"
//                   value={selectedStates.join(', ')}
//                   onChange={(e) => setSelectedStates(e.target.value.split(',').map(s => s.trim()))}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., Delhi, Maharashtra, Karnataka"
//                 />
//                 <p className="text-xs text-gray-500 mt-2">First state will be prioritized (domicile)</p>
//               </div>
//             )}
//           </>
//         );

//       case 'specialization':
//         return (
//           <>
//             {commonFields}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
//                 <input
//                   type="text"
//                   value={selectedCourse}
//                   onChange={(e) => setSelectedCourse(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., Medicine, Surgery, Pediatrics"
//                 />
//               </div>
//             )}
//           </>
//         );

//       case 'budget':
//         return (
//           <>
//             {currentStep === 1 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Course Fee (₹)</label>
//                 <input
//                   type="number"
//                   value={maxFee}
//                   onChange={(e) => setMaxFee(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., 500000"
//                 />
//               </div>
//             )}
//             {currentStep === 2 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Bond Years</label>
//                 <input
//                   type="number"
//                   value={maxBondYears}
//                   onChange={(e) => setMaxBondYears(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., 2"
//                 />
//               </div>
//             )}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Bond Preference</label>
//                 <select
//                   value={bondAcceptable}
//                   onChange={(e) => setBondAcceptable(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundPosition: 'right 0.5rem center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '1.5em 1.5em',
//                     paddingRight: '2.5rem'
//                   }}
//                 >
//                   <option value="any">Any (With or Without Bond)</option>
//                   <option value="no">No Bond Only</option>
//                   <option value="yes">With Bond Only</option>
//                 </select>
//               </div>
//             )}
//             {currentStep === 4 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundPosition: 'right 0.5rem center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '1.5em 1.5em',
//                     paddingRight: '2.5rem'
//                   }}
//                 >
//                   <option value="OPEN">OPEN</option>
//                   <option value="OBC">OBC</option>
//                   <option value="SC">SC</option>
//                   <option value="ST">ST</option>
//                   <option value="EWS">EWS</option>
//                 </select>
//               </div>
//             )}
//           </>
//         );

//       case 'type':
//         return (
//           <>
//             {currentStep === 1 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Institute Type</label>
//                 <select
//                   value={instituteType}
//                   onChange={(e) => setInstituteType(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundPosition: 'right 0.5rem center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '1.5em 1.5em',
//                     paddingRight: '2.5rem'
//                   }}
//                 >
//                   <option value="">All Types</option>
//                   <option value="Government">Government</option>
//                   <option value="Private">Private</option>
//                   <option value="Deemed">Deemed University</option>
//                 </select>
//               </div>
//             )}
//             {currentStep === 2 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Quota</label>
//                 <select
//                   value={quota}
//                   onChange={(e) => setQuota(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundPosition: 'right 0.5rem center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '1.5em 1.5em',
//                     paddingRight: '2.5rem'
//                   }}
//                 >
//                   <option value="">All Quotas</option>
//                   <option value="All India">All India</option>
//                   <option value="State">State</option>
//                   <option value="Management">Management</option>
//                 </select>
//               </div>
//             )}
//             {currentStep === 3 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundPosition: 'right 0.5rem center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '1.5em 1.5em',
//                     paddingRight: '2.5rem'
//                   }}
//                 >
//                   <option value="OPEN">OPEN</option>
//                   <option value="OBC">OBC</option>
//                   <option value="SC">SC</option>
//                   <option value="ST">ST</option>
//                   <option value="EWS">EWS</option>
//                 </select>
//               </div>
//             )}
//           </>
//         );

//       case 'toprankers':
//         return (
//           <>
//             {currentStep === 1 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Top Colleges</label>
//                 <input
//                   type="number"
//                   value={topN}
//                   onChange={(e) => setTopN(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., 50"
//                 />
//               </div>
//             )}
//             {currentStep === 2 && (
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundPosition: 'right 0.5rem center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '1.5em 1.5em',
//                     paddingRight: '2.5rem'
//                   }}
//                 >
//                   <option value="OPEN">OPEN</option>
//                   <option value="OBC">OBC</option>
//                   <option value="SC">SC</option>
//                   <option value="ST">ST</option>
//                   <option value="EWS">EWS</option>
//                 </select>
//               </div>
//             )}
//           </>
//         );
//     }
//   };

//   if (showResults && resultsData) {
//     const stats = {
//       total: resultsData.length,
//       govt: resultsData.filter(r => r.instituteType.toLowerCase().includes('government')).length,
//       private: resultsData.filter(r => r.instituteType.toLowerCase().includes('private')).length,
//       avgFee: resultsData.filter(r => r.feeNumeric > 0).reduce((sum, r) => sum + r.feeNumeric, 0) / resultsData.filter(r => r.feeNumeric > 0).length || 0
//     };

//     const stateDistribution = {};
//     resultsData.forEach(r => {
//       stateDistribution[r.state] = (stateDistribution[r.state] || 0) + 1;
//     });

//     const bondColleges = resultsData.filter(r => r.bondYears > 0).length;

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-white mb-2">{activeMode?.name} Results</h1>
//                   <p className="text-blue-100">Comprehensive analysis of your college options</p>
//                 </div>
//                 <button
//                   onClick={handleBack}
//                   className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
//                 >
//                   <Home size={20} />
//                   Back to Modes
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Total Colleges</p>
//                       <p className="text-3xl font-bold">{stats.total}</p>
//                     </div>
//                     <Building2 size={32} className="opacity-80" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Government</p>
//                       <p className="text-3xl font-bold">{stats.govt}</p>
//                     </div>
//                     <Award size={32} className="opacity-80" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Private</p>
//                       <p className="text-3xl font-bold">{stats.private}</p>
//                     </div>
//                     <Building2 size={32} className="opacity-80" />
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Avg. Fee</p>
//                       <p className="text-2xl font-bold">₹{(stats.avgFee / 100000).toFixed(1)}L</p>
//                     </div>
//                     <IndianRupee size={32} className="opacity-80" />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-purple-100">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                     <MapPin size={20} className="text-purple-600" />
//                     State-wise Distribution
//                   </h3>
//                   <div className="space-y-2 max-h-48 overflow-y-auto">
//                     {Object.entries(stateDistribution).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([state, count]) => (
//                       <div key={state} className="flex items-center justify-between">
//                         <span className="text-sm text-gray-700">{state}</span>
//                         <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">{count}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-red-100">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                     <FileText size={20} className="text-red-600" />
//                     Bond Information
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-700">Colleges with Bond</span>
//                       <span className="text-2xl font-bold text-red-600">{bondColleges}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-700">Without Bond</span>
//                       <span className="text-2xl font-bold text-green-600">{stats.total - bondColleges}</span>
//                     </div>
//                     <div className="pt-3 border-t border-red-200">
//                       <p className="text-xs text-gray-500">
//                         {((bondColleges / stats.total) * 100).toFixed(1)}% of colleges have service bonds
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
//                 <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//                   <h3 className="text-lg font-bold text-gray-800">College Results</h3>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">College</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Course</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">State</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Rank Range</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Fee</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Bond</th>
//                         <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Beds</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {resultsData.slice(0, 100).map((row, idx) => (
//                         <tr key={idx} className="hover:bg-blue-50 transition">
//                           <td className="px-4 py-3">
//                             <div className="flex items-start gap-2">
//                               <Building2 size={16} className="text-blue-600 mt-1 flex-shrink-0" />
//                               <div>
//                                 <p className="text-sm font-semibold text-gray-800">{row.college}</p>
//                                 <p className="text-xs text-gray-500">{row.quota}</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             <span className="text-sm text-gray-700">{row.course}</span>
//                           </td>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center gap-1">
//                               <MapPin size={14} className="text-green-600" />
//                               <span className="text-sm text-gray-700">{row.state}</span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                               row.instituteType.toLowerCase().includes('government') 
//                                 ? 'bg-green-100 text-green-700' 
//                                 : row.instituteType.toLowerCase().includes('private')
//                                 ? 'bg-purple-100 text-purple-700'
//                                 : 'bg-blue-100 text-blue-700'
//                             }`}>
//                               {row.instituteType}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3">
//                             <div className="text-xs">
//                               <span className="text-gray-500">Opening: </span>
//                               <span className="font-semibold text-gray-700">{row.openingRank}</span>
//                               <br />
//                               <span className="text-gray-500">Closing: </span>
//                               <span className="font-semibold text-gray-700">{row.closingRank}</span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             <div>
//                               <div className="flex items-center gap-1">
//                                 <IndianRupee size={14} className="text-yellow-600" />
//                                 <span className="text-sm font-semibold text-gray-800">{row.fee}</span>
//                               </div>
//                               {row.stipendY1 !== 'N/A' && (
//                                 <p className="text-xs text-green-600 mt-1">Stipend: {row.stipendY1}</p>
//                               )}
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             {row.bondYears > 0 ? (
//                               <div>
//                                 <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
//                                   {row.bondYears}Y
//                                 </span>
//                                 {row.bondPenalty !== 'N/A' && (
//                                   <p className="text-xs text-gray-500 mt-1">{row.bondPenalty}</p>
//                                 )}
//                               </div>
//                             ) : (
//                               <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                                 No Bond
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center gap-1">
//                               <Bed size={14} className="text-indigo-600" />
//                               <span className="text-sm text-gray-700">{row.beds}</span>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {resultsData.length === 0 && (
//                 <div className="text-center py-16">
//                   <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
//                     <Search size={48} className="text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-700 mb-2">No Results Found</h3>
//                   <p className="text-gray-500">Try adjusting your search criteria</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (activeMode) {
//     const Icon = activeMode.icon;
//     const totalSteps = activeMode.steps;
//     const progress = (currentStep / totalSteps) * 100;

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//         <div className="max-w-3xl mx-auto">
//           <button
//             onClick={() => {
//               setActiveMode(null);
//               setCurrentStep(1);
//             }}
//             className="mb-6 flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition"
//           >
//             <ArrowLeft size={20} />
//             <span className="font-semibold">Back to Modes</span>
//           </button>

//           <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//             <div className={`bg-gradient-to-r ${activeMode.color} p-8 text-white`}>
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
//                   <Icon size={40} />
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold">{activeMode.name}</h2>
//                   <p className="text-white text-opacity-90 mt-1">{activeMode.description}</p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
//                   <span>{Math.round(progress)}% Complete</span>
//                 </div>
//                 <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
//                   <div 
//                     className="h-full bg-white rounded-full transition-all duration-500"
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="p-8">
//               <div className="space-y-6">
//                 {renderFormStep()}
//               </div>

//               <div className="flex gap-4 mt-8">
//                 {currentStep > 1 && (
//                   <button
//                     onClick={() => setCurrentStep(currentStep - 1)}
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
//                   >
//                     <ArrowLeft size={20} />
//                     Previous
//                   </button>
//                 )}
                
//                 {currentStep < totalSteps ? (
//                   <button
//                     onClick={() => setCurrentStep(currentStep + 1)}
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
//                   >
//                     Next
//                     <ArrowRight size={20} />
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleSubmit}
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
//                   >
//                     <Search size={20} />
//                     Find Colleges
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             NEET PG College Predictor
//           </h1>
//           <p className="text-xl text-gray-600">Intelligent prediction system with 6 specialized modes</p>
          
//           <div className="flex items-center justify-center gap-4 mt-6">
//             <div className={`px-4 py-2 rounded-full ${dataLoaded ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//               <span className="font-semibold">{dataLoaded ? '✓ Data Loaded' : '⏳ Loading Data...'}</span>
//             </div>
//             <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
//               <span className="font-semibold">
//                 {dataLoaded 
//                   ? `${closingRanks.length + feeData.length + instituteData.length} Records` 
//                   : 'Initializing...'}
//               </span>
//             </div>
//             {dataLoaded && (
//               <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
//                 <span className="font-semibold text-sm">
//                   CR: {closingRanks.length} | Fee: {feeData.length} | Inst: {instituteData.length}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {modes.map((mode) => {
//             const Icon = mode.icon;
            
//             return (
//               <div
//                 key={mode.id}
//                 onClick={() => dataLoaded && setActiveMode(mode)}
//                 className={`group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${!dataLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 <div className={`bg-gradient-to-r ${mode.color} p-6 relative overflow-hidden`}>
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
//                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                  
//                   <div className="relative z-10">
//                     <div className="inline-block p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm mb-4">
//                       <Icon size={36} className="text-white" />
//                     </div>
//                     <h3 className="text-xl font-bold text-white mb-2">{mode.name}</h3>
//                     <p className="text-white text-opacity-90 text-sm leading-relaxed">{mode.description}</p>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                       ✓ Fully Working
//                     </span>
//                     <span className="text-sm text-gray-500">{mode.steps} Steps</span>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">Ready to use</span>
//                     <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
//                       <span>Start</span>
//                       <ArrowRight size={18} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <TrendingUp size={24} className="text-blue-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">Smart Algorithms</h3>
//             </div>
//             <p className="text-gray-600 text-sm">Advanced filtering with fuzzy matching and multi-criteria analysis</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-green-100 rounded-lg">
//                 <Users size={24} className="text-green-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">Comprehensive Data</h3>
//             </div>
//             <p className="text-gray-600 text-sm">Closing ranks, fees, stipends, bonds, and institutional details</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <Award size={24} className="text-purple-600" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800">Accurate Results</h3>
//             </div>
//             <p className="text-gray-600 text-sm">Real 2024 data with historical trends and detailed analytics</p>
//           </div>
//         </div>

//         <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white">
//           <h2 className="text-2xl font-bold mb-4">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-xl font-bold">1</span>
//               </div>
//               <p className="text-sm">Choose a predictor mode</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-xl font-bold">2</span>
//               </div>
//               <p className="text-sm">Fill step-by-step form</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-xl font-bold">3</span>
//               </div>
//               <p className="text-sm">Get instant predictions</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-xl font-bold">4</span>
//               </div>
//               <p className="text-sm">Analyze detailed results</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NEETPGPredictor;


import React, { useState } from 'react';
import { 
  Home, 
  Building2, 
  Award, 
  IndianRupee, 
  MapPin, 
  FileText, 
  Bed, 
  Search, 
  ArrowLeft, 
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Filter,
  Lightbulb,
  Zap,
  GraduationCap
} from 'lucide-react';

// Type definitions
interface Mode {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  steps: number;
}

interface CollegeResult {
  college: string;
  course: string;
  state: string;
  instituteType: string;
  openingRank: number | string;
  closingRank: number | string;
  fee: string;
  stipendY1: string;
  bondYears: number;
  bondPenalty: string;
  beds: number | string;
  quota: string;
}

interface Stats {
  total: number;
  govt: number;
  private: number;
  avgFee: number;
}

interface FormData {
  rank?: number;
  category?: string;
  state?: string;
  course?: string;
  instituteType?: string;
  [key: string]: string | number | undefined;
}

const NEETPGPredictor: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showComingSoon, setShowComingSoon] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({});
  const [resultsData, setResultsData] = useState<CollegeResult[]>([]);
  const [dataLoaded] = useState<boolean>(true);

  // Mock data arrays (would be loaded from actual data sources)
  const closingRanks: any[] = [];
  const feeData: any[] = [];
  const instituteData: any[] = [];

  // Predictor modes
  const modes: Mode[] = [
    {
      id: 'rank',
      name: 'Rank-Based Predictor',
      description: 'Find colleges based on your NEET PG rank and category',
      icon: Target,
      color: 'from-blue-600 to-blue-700',
      steps: 4
    },
    {
      id: 'college',
      name: 'College Finder',
      description: 'Search for specific colleges and their cutoff ranks',
      icon: Building2,
      color: 'from-green-600 to-green-700',
      steps: 3
    },
    {
      id: 'course',
      name: 'Course-Specific Search',
      description: 'Explore colleges offering your desired specialization',
      icon: GraduationCap,
      color: 'from-purple-600 to-purple-700',
      steps: 4
    },
    {
      id: 'advanced',
      name: 'Advanced Filter',
      description: 'Apply multiple filters for precise college matching',
      icon: Filter,
      color: 'from-orange-600 to-orange-700',
      steps: 5
    },
    {
      id: 'smart',
      name: 'Smart Recommendations',
      description: 'AI-powered suggestions based on your preferences',
      icon: Lightbulb,
      color: 'from-pink-600 to-pink-700',
      steps: 4
    },
    {
      id: 'compare',
      name: 'College Comparison',
      description: 'Compare multiple colleges side-by-side',
      icon: Zap,
      color: 'from-indigo-600 to-indigo-700',
      steps: 3
    }
  ];

  // Stats calculation
  const stats: Stats = {
    total: resultsData.length,
    govt: resultsData.filter(r => r.instituteType.toLowerCase().includes('government')).length,
    private: resultsData.filter(r => r.instituteType.toLowerCase().includes('private')).length,
    avgFee: resultsData.length > 0 
      ? resultsData.reduce((sum, r) => {
          const fee = parseFloat(r.fee.replace(/[₹,L]/g, ''));
          return sum + (isNaN(fee) ? 0 : fee * 100000);
        }, 0) / resultsData.length 
      : 0
  };

  // State distribution
  const stateDistribution: Record<string, number> = resultsData.reduce((acc, r) => {
    acc[r.state] = (acc[r.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bondColleges = resultsData.filter(r => r.bondYears > 0).length;

  const handleBack = (): void => {
    setShowResults(false);
    setActiveMode(null);
    setCurrentStep(1);
  };

  const handleSubmit = (): void => {
    // Mock data for demonstration
    const mockResults: CollegeResult[] = [
      {
        college: "AIIMS Delhi",
        course: "MD General Medicine",
        state: "Delhi",
        instituteType: "Government",
        openingRank: 1,
        closingRank: 50,
        fee: "₹5,000",
        stipendY1: "₹80,000/month",
        bondYears: 0,
        bondPenalty: "N/A",
        beds: 2000,
        quota: "All India Quota"
      },
      {
        college: "PGIMER Chandigarh",
        course: "MD Radiology",
        state: "Chandigarh",
        instituteType: "Government",
        openingRank: 51,
        closingRank: 150,
        fee: "₹7,500",
        stipendY1: "₹75,000/month",
        bondYears: 0,
        bondPenalty: "N/A",
        beds: 1800,
        quota: "All India Quota"
      }
    ];
    
    setResultsData(mockResults);
    setShowResults(true);
  };

  const renderFormStep = (): React.ReactNode => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Step {currentStep} Content
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
            placeholder={`Enter details for step ${currentStep}`}
          />
        </div>
      </div>
    );
  };

  if (showResults) {
    return (
      <>
        {/* Coming Soon Overlay */}
        {showComingSoon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
            <div className="relative bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-4 text-center transform animate-pulse">
              {/* Close button */}
              <button
                onClick={() => setShowComingSoon(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                title="Preview Mode"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon */}
              <div className="inline-block p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Heading */}
              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Coming Soon!
              </h2>

              {/* Description */}
              <p className="text-xl text-gray-600 mb-6">
                We're working hard to bring you the most accurate NEET PG College Predictor
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Real-time College Predictions</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Advanced Filtering Options</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Comprehensive Analytics</span>
                </div>
              </div>

              {/* Launch Date */}
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg">
                Launching Soon
              </div>

              {/* Preview hint */}
              <p className="text-sm text-gray-400 mt-6">
                Click the × button above to preview the interface
              </p>
            </div>
          </div>
        )}

        {/* Original content with blur effect */}
        <div className={showComingSoon ? "blur-sm pointer-events-none" : ""}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{activeMode?.name} Results</h1>
                      <p className="text-blue-100">Comprehensive analysis of your college options</p>
                    </div>
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
                    >
                      <Home size={20} />
                      Back to Modes
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Total Colleges</p>
                          <p className="text-3xl font-bold">{stats.total}</p>
                        </div>
                        <Building2 size={32} className="opacity-80" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Government</p>
                          <p className="text-3xl font-bold">{stats.govt}</p>
                        </div>
                        <Award size={32} className="opacity-80" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Private</p>
                          <p className="text-3xl font-bold">{stats.private}</p>
                        </div>
                        <Building2 size={32} className="opacity-80" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Avg. Fee</p>
                          <p className="text-2xl font-bold">₹{(stats.avgFee / 100000).toFixed(1)}L</p>
                        </div>
                        <IndianRupee size={32} className="opacity-80" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-purple-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-purple-600" />
                        State-wise Distribution
                      </h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {Object.entries(stateDistribution).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([state, count]) => (
                          <div key={state} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{state}</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-red-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-red-600" />
                        Bond Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Colleges with Bond</span>
                          <span className="text-2xl font-bold text-red-600">{bondColleges}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Without Bond</span>
                          <span className="text-2xl font-bold text-green-600">{stats.total - bondColleges}</span>
                        </div>
                        <div className="pt-3 border-t border-red-200">
                          <p className="text-xs text-gray-500">
                            {stats.total > 0 ? ((bondColleges / stats.total) * 100).toFixed(1) : 0}% of colleges have service bonds
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800">College Results</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">College</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Course</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">State</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Rank Range</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Fee</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Bond</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Beds</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {resultsData.slice(0, 100).map((row, idx) => (
                            <tr key={idx} className="hover:bg-blue-50 transition">
                              <td className="px-4 py-3">
                                <div className="flex items-start gap-2">
                                  <Building2 size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-semibold text-gray-800">{row.college}</p>
                                    <p className="text-xs text-gray-500">{row.quota}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-sm text-gray-700">{row.course}</span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} className="text-green-600" />
                                  <span className="text-sm text-gray-700">{row.state}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  row.instituteType.toLowerCase().includes('government') 
                                    ? 'bg-green-100 text-green-700' 
                                    : row.instituteType.toLowerCase().includes('private')
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {row.instituteType}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-xs">
                                  <span className="text-gray-500">Opening: </span>
                                  <span className="font-semibold text-gray-700">{row.openingRank}</span>
                                  <br />
                                  <span className="text-gray-500">Closing: </span>
                                  <span className="font-semibold text-gray-700">{row.closingRank}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div>
                                  <div className="flex items-center gap-1">
                                    <IndianRupee size={14} className="text-yellow-600" />
                                    <span className="text-sm font-semibold text-gray-800">{row.fee}</span>
                                  </div>
                                  {row.stipendY1 !== 'N/A' && (
                                    <p className="text-xs text-green-600 mt-1">Stipend: {row.stipendY1}</p>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                {row.bondYears > 0 ? (
                                  <div>
                                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                      {row.bondYears}Y
                                    </span>
                                    {row.bondPenalty !== 'N/A' && (
                                      <p className="text-xs text-gray-500 mt-1">{row.bondPenalty}</p>
                                    )}
                                  </div>
                                ) : (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                    No Bond
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  <Bed size={14} className="text-indigo-600" />
                                  <span className="text-sm text-gray-700">{row.beds}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {resultsData.length === 0 && (
                    <div className="text-center py-16">
                      <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                        <Search size={48} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-700 mb-2">No Results Found</h3>
                      <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (activeMode) {
    const Icon = activeMode.icon;
    const totalSteps = activeMode.steps;
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => {
              setActiveMode(null);
              setCurrentStep(1);
            }}
            className="mb-6 flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Modes</span>
          </button>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${activeMode.color} p-8 text-white`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <Icon size={40} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{activeMode.name}</h2>
                  <p className="text-white text-opacity-90 mt-1">{activeMode.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {renderFormStep()}
              </div>

              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >
                    <ArrowLeft size={20} />
                    Previous
                  </button>
                )}
                
                {currentStep < totalSteps ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
                  >
                    Next
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
                  >
                    <Search size={20} />
                    Find Colleges
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing page with mode selection
  return (
    <>
      {/* Coming Soon Overlay for Landing Page */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
          <div className="relative bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-4 text-center transform animate-pulse">
            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              title="Preview Mode"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="inline-block p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Coming Soon!
            </h2>

            <p className="text-xl text-gray-600 mb-6">
              We're working hard to bring you the most accurate NEET PG College Predictor
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Real-time College Predictions</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Advanced Filtering Options</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Comprehensive Analytics</span>
              </div>
            </div>

            <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg">
              Launching Soon
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Click the × button above to preview the interface
            </p>
          </div>
        </div>
      )}

      {/* Landing Page Content */}
      <div className={showComingSoon ? "blur-sm pointer-events-none" : ""}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                NEET PG College Predictor
              </h1>
              <p className="text-xl text-gray-600">Intelligent prediction system with 6 specialized modes</p>
              
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className={`px-4 py-2 rounded-full ${dataLoaded ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  <span className="font-semibold">{dataLoaded ? '✓ Data Loaded' : '⏳ Loading Data...'}</span>
                </div>
                <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                  <span className="font-semibold">{closingRanks.length + feeData.length + instituteData.length} Records</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {modes.map((mode) => {
                const Icon = mode.icon;
                
                return (
                  <div
                    key={mode.id}
                    onClick={() => dataLoaded && setActiveMode(mode)}
                    className={`group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${!dataLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`bg-gradient-to-r ${mode.color} p-6 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                      
                      <div className="relative z-10">
                        <div className="inline-block p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm mb-4">
                          <Icon size={36} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{mode.name}</h3>
                        <p className="text-white text-opacity-90 text-sm leading-relaxed">{mode.description}</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✓ Fully Working
                        </span>
                        <span className="text-sm text-gray-500">{mode.steps} Steps</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Ready to use</span>
                        <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                          <span>Start</span>
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Smart Algorithms</h3>
                </div>
                <p className="text-gray-600 text-sm">Advanced filtering with fuzzy matching and multi-criteria analysis</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Comprehensive Data</h3>
                </div>
                <p className="text-gray-600 text-sm">Closing ranks, fees, stipends, bonds, and institutional details</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Award size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Accurate Results</h3>
                </div>
                <p className="text-gray-600 text-sm">Real 2024 data with historical trends and detailed analytics</p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <p className="text-sm">Choose a predictor mode</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <p className="text-sm">Fill step-by-step form</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <p className="text-sm">Get instant predictions</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <p className="text-sm">Analyze detailed results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NEETPGPredictor;