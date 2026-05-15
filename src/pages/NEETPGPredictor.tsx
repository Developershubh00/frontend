


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
      color: 'from-blue-600 to-blue-700',
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
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Real-time College Predictions</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Advanced Filtering Options</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
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
                          <span className="text-2xl font-bold text-blue-600">{stats.total - bondColleges}</span>
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
                                  <MapPin size={14} className="text-blue-600" />
                                  <span className="text-sm text-gray-700">{row.state}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  row.instituteType.toLowerCase().includes('government') 
                                    ? 'bg-blue-100 text-blue-700' 
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
                                    <p className="text-xs text-blue-600 mt-1">Stipend: {row.stipendY1}</p>
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
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
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
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-700 transition shadow-lg"
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
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Real-time College Predictions</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Advanced Filtering Options</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
                <div className={`px-4 py-2 rounded-full ${dataLoaded ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
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
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
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

              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users size={24} className="text-blue-600" />
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