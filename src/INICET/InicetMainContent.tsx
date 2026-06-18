// InicetMainContent.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Calendar,
  ChevronRight,
  CheckCircle,
  X,
} from "lucide-react";

/**
 * INICET Main Content Component
 * Displays INICET information, cutoffs, and data cards
 */
const InicetMainContent: React.FC = () => {
  const navigate = useNavigate();
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [activeModal, setActiveModal] = useState<"allotments" | "closing" | null>(null);

  // Action buttons configuration
  const actionButtons = [
    {
      id: "website",
      label: "Website",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => window.open("https://www.aiimsexams.ac.in/", "_blank"),
    },
    {
      id: "prospectus",
      label: "Prospectus",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => window.open("https://docs.aiimsexams.ac.in/sites/2_PROSPECTUS%20PART-A%20INI-CET%20JULY%202025%20SESSION.pdf", "_blank"),
    },
    {
      id: "prospectus",
      label: "Schedule",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => {
        window.open(
          "https://cdn.dribbble.com/userupload/45962642/file/361c5dc5aed7756227cc324a5ffb9396.jpeg?resize=752x&vertical=center",
          "_blank"
        );
      },
    },
  ];

  // Session options for Allotments
  const allotmentSessions = [
    {
      label: "January 2025 Allotments Data",
      color: "bg-purple-500",
      onClick: () => { navigate("/inicet/allotments"); setActiveModal(null); },
    },
    {
      label: "July 2025 Allotments Data",
      color: "bg-blue-500",
      onClick: () => { navigate("/inicet/allotments/julysession"); setActiveModal(null); },
    },
    {
      label: "January 2026 Allotments Data",
      color: "bg-indigo-500",
      onClick: () => { navigate("/inicet/allotments/january-2026-session"); setActiveModal(null); },
    },
    {
      label: "July 2026 Allotments Data",
      color: "bg-purple-600",
      onClick: () => { navigate("/inicet/allotments/july-2026-session"); setActiveModal(null); },
    },
  ];

  // Session options for Closing Rank
  const closingRankSessions = [
    {
      label: "Closing Ranks 2025 Data",
      color: "bg-purple-500",
      // onClick: () => { navigate("/inicet/allotments"); setActiveModal(null); },
       onClick: () => { navigate("#"); setActiveModal(null); },
    },
    {
      label: "Closing Ranks 2026 Data",
      color: "bg-blue-500",
      // onClick: () => { navigate("/inicet/allotments/julysession"); setActiveModal(null); },
      onClick: () => { navigate("#"); setActiveModal(null); },
    },
  ];

  // Data cards — now just 2
  const dataCards = [
    {
      title: "INICET Allotments",
      subtitle: "View session-wise allotment data",
      icon: BarChart3,
      color: "bg-purple-500",
      onClick: () => setActiveModal("allotments"),
    },
    {
      title: "INICET Closing Rank",
      subtitle: "View session-wise closing rank data",
      icon: TrendingUp,
      color: "bg-blue-500",
      onClick: () => setActiveModal("closing"),
    },
  ];

  // INICET Cutoff Data
  const inicetCutoffData = [
    {
      category: "UR",
      jan2025: "11,342",
      july2024: "12,082",
      jan2024: "13,058",
      july2023: "-3,294",
    },
    {
      category: "EWS",
      jan2025: "25,874",
      july2024: "25,488",
      jan2024: "23,951",
      july2023: "-4,967",
    },
    {
      category: "OBC",
      jan2025: "15,039",
      july2024: "16,556",
      jan2024: "26,161",
      july2023: "-7,418",
    },
    {
      category: "SC",
      jan2025: "21,661",
      july2024: "30,572",
      jan2024: "31,709",
      july2023: "-16,133",
    },
    {
      category: "ST",
      jan2025: "30,889",
      july2024: "36,161",
      jan2024: "30,970",
      july2023: "-26,905",
    },
  ];

  const activeSessions = activeModal === "allotments" ? allotmentSessions : closingRankSessions;
  const activeModalTitle = activeModal === "allotments" ? "INICET Allotments" : "INICET Closing Rank";

  return (
    <div className="w-full bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">

      {/* Session Picker Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-800 mb-1">{activeModalTitle}</h3>
            <p className="text-sm text-slate-500 mb-5">Select a session to view data</p>

            <div className="space-y-3">
              {activeSessions.map((session, idx) => (
                <button
                  key={idx}
                  onClick={session.onClick}
                  className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${session.color}`} />
                    <span className="text-sm font-medium text-slate-700">{session.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-300 to-purple-700 px-4 lg:px-6 py-6 lg:py-12 relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="xl:hidden text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
              <span className="text-white text-2xl">⚡</span>
            </div>

            <h1 className="text-xl font-bold text-white mb-2">
              INICET 2025 - AIIMS PG Entrance
            </h1>
            <p className="text-purple-100 mb-6 text-sm">
              Complete Guide for AIIMS PG Admissions
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {actionButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={button.onClick}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${button.bgColor} ${button.textColor}`}
                >
                  <button.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{button.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:block text-center">
            <div className="inline-flex items-center space-x-3 mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                🏥 INICET 2025 - AIIMS PG Entrance Exam
              </h1>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-lg">🎓</span>
              </div>
            </div>

            <p className="text-purple-100 mb-8 text-lg">
              Complete Guide for AIIMS PG Admissions - Cutoffs, Counselling &
              More!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {actionButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={button.onClick}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${button.bgColor} ${button.textColor} font-medium`}
                >
                  <button.icon className="w-5 h-5" />
                  <span>{button.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 py-6 lg:py-8 max-w-7xl mx-auto ">
        {/* Data Cards — 2 cards centered */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-6 mb-8 lg:mb-12 justify-center">
          {dataCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer w-full sm:w-64"
              onClick={card.onClick}
            >
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 ${card.color} rounded-xl flex items-center justify-center mb-3 lg:mb-4`}
              >
                <card.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1 text-sm lg:text-base">
                {card.title}
              </h3>
              <p className="text-xs lg:text-sm text-slate-600">
                {card.subtitle}
              </p>
              <ChevronRight className="w-4 h-4 text-slate-400 mt-2" />
            </div>
          ))}
        </div>

        <div className="text-center mb-3 lg:mb-4">
          <a
            href="https://static.collegedekho.com/media/uploads/2025/11/24/1763125732925-114509804.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:text-blue-900 underline text-sm lg:text-base transition-colors duration-200"
          >
            Final Seat Position for admission to PG courses of INIs for INI-CET January 2026 session.
          </a>
        </div>

        {/* What is INICET */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              📚 What is INICET?
            </h2>
            <p className="text-slate-600 text-sm lg:text-base">
              INICET (Institute of National Importance Combined Entrance Test)
              is a national-level entrance examination conducted for admission
              to various postgraduate medical courses (MD/MS/DM/M.Ch/MDS) at
              AIIMS and other Institutes of National Importance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                🎯 Exam Highlights
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Conducting Body", desc: "AIIMS New Delhi" },
                  { title: "Exam Mode", desc: "Computer-Based Test (CBT)" },
                  { title: "Frequency", desc: "Twice a Year (January & July)" },
                  { title: "Duration", desc: "3 Hours (180 Minutes)" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-700 text-sm font-medium">
                        {item.title}
                      </p>
                      <p className="text-slate-600 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                🏥 Participating Institutes
              </h3>
              <div className="space-y-2">
                {[
                  "AIIMS New Delhi",
                  "JIPMER Puducherry",
                  "PGIMER Chandigarh",
                  "NIMHANS Bangalore",
                  "SCTIMST Trivandrum",
                  "All other AIIMS Institutes",
                ].map((institute, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <p className="text-slate-700 text-sm">{institute}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INICET Process Map - Google Material Design Style */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              🗺️ INI-CET: Process Map
            </h2>
            <p className="text-slate-600 text-sm lg:text-base">
              Complete step-by-step journey from application to seat allocation
            </p>
          </div>

          {/* Mobile Layout - Vertical Stack */}
          <div className="lg:hidden space-y-4">
            {/* Phase 1: Application */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 flex items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mr-3">
                  <span className="text-white font-bold text-sm">I</span>
                </div>
                <h3 className="text-lg font-bold text-white">Application</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-slate-50 border-l-4 border-indigo-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Registration & Basic Candidate Information
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-indigo-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800 mb-1">
                    Generation of Exam Unique Code (EUC)
                  </p>
                  <p className="text-xs text-slate-600">
                    for applying for January 2024 Session
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-indigo-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800 mb-1">
                    Completion of Application
                  </p>
                  <p className="text-xs text-slate-600">
                    (Application for January 2024 Session)
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow Between Phases */}
            <div className="flex justify-center py-2">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full p-2 shadow-lg">
                <ChevronRight className="w-6 h-6 text-white transform rotate-90" />
              </div>
            </div>

            {/* Phase 2: Examination */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-3 flex items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mr-3">
                  <span className="text-white font-bold text-sm">II</span>
                </div>
                <h3 className="text-lg font-bold text-white">Examination</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Admit Card
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Computer Based Test
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Declaration of Results
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Invitation of choices & order of preference
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow Between Phases */}
            <div className="flex justify-center py-2">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full p-2 shadow-lg">
                <ChevronRight className="w-6 h-6 text-white transform rotate-90" />
              </div>
            </div>

            {/* Phase 3: Seat Allocation */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-teal-600 px-4 py-3 flex items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mr-3">
                  <span className="text-white font-bold text-sm">III</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Seat Allocation
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Mock Round ≫ 1<sup>st</sup> Round
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    2<sup>nd</sup> Round
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Additional Rounds (if needed)
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Open Round (if needed)
                  </p>
                </div>
                <div className="flex justify-center py-1">
                  <ChevronRight className="w-6 h-6 text-slate-400 transform rotate-90" />
                </div>
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded p-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Spot Round (if needed)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Horizontal Flow */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-6">
              {/* Phase 1: Application */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-4 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-1.5 mr-3">
                      <span className="text-white font-bold">I</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Application
                    </h3>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="bg-slate-50 border-l-4 border-indigo-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        Registration & Basic Candidate Information
                      </p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-6 h-6 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="bg-slate-50 border-l-4 border-indigo-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800 mb-1">
                        Generation of Exam Unique Code (EUC)
                      </p>
                      <p className="text-xs text-slate-600">
                        for applying for January 2024 Session
                      </p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-6 h-6 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="bg-slate-50 border-l-4 border-indigo-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800 mb-1">
                        Completion of Application
                      </p>
                      <p className="text-xs text-slate-600">
                        (Application for January 2024 Session)
                      </p>
                    </div>
                  </div>
                </div>
                {/* Right Arrow */}
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full p-2.5 shadow-lg">
                    <ChevronRight className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Phase 2: Examination */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-5 py-4 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-1.5 mr-3">
                      <span className="text-white font-bold">II</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Examination
                    </h3>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        Admit Card
                      </p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-6 h-6 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        Declaration of Results
                      </p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-6 h-6 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        Invitation of choices & order of preference
                      </p>
                    </div>
                  </div>
                </div>
                {/* Right Arrow */}
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full p-2.5 shadow-lg">
                    <ChevronRight className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Phase 3: Seat Allocation */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-600 px-5 py-4 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-1.5 mr-3">
                      <span className="text-white font-bold">III</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Seat Allocation
                    </h3>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        Mock Round ≫ 1<sup>st</sup> Round
                      </p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-6 h-6 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        2<sup>nd</sup> Round
                      </p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-6 h-6 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        Additional Rounds (if needed)
                      </p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-6 h-6 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        Open Round (if needed)
                      </p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-6 h-6 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <p className="text-sm font-semibold text-slate-800">
                        Spot Round (if needed)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INICET 2024 AIIMS Institute-wise Cutoff */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              🏥 INI-CET AIIMS Institute-wise Cut Off
            </h2>
            <p className="text-slate-600 text-sm lg:text-base">
              Opening and Closing Ranks for AIIMS Institutes
            </p>
          </div>

          {/* Mobile View - Card Layout */}
          <div className="lg:hidden space-y-4">
            {[
              { name: "AIIMS New Delhi", opening: "109", closing: "2212" },
              { name: "AIIMS Bathinda", opening: "119", closing: "2058" },
              { name: "AIIMS Bhopal", opening: "840", closing: "1351" },
              { name: "AIIMS Bhubaneswar", opening: "202", closing: "1104" },
              { name: "AIIMS Bibinagar", opening: "1164", closing: "1164" },
              { name: "AIIMS Bilaspur", opening: "515", closing: "1445" },
              { name: "AIIMS Deoghar", opening: "1107", closing: "1508" },
              { name: "AIIMS Gorakhpur", opening: "1071", closing: "2133" },
              { name: "AIIMS Guwahati", opening: "566", closing: "1487" },
              { name: "AIIMS Jodhpur", opening: "26", closing: "1029" },
              { name: "AIIMS Kalyani", opening: "209", closing: "1178" },
              { name: "AIIMS Mangalagiri", opening: "347", closing: "1863" },
              { name: "AIIMS Nagpur", opening: "542", closing: "1279" },
              { name: "AIIMS Patna", opening: "206", closing: "871" },
              { name: "AIIMS Raebareli", opening: "256", closing: "1255" },
              { name: "AIIMS Raipur", opening: "74", closing: "1170" },
              { name: "AIIMS Rajkot", opening: "101", closing: "1080" },
              { name: "AIIMS Rishikesh", opening: "105", closing: "1200" },
            ].map((institute, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3">
                  <h3 className="text-white font-bold text-base">{institute.name}</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-600 mb-2 font-medium">Opening Rank</p>
                      <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-base font-bold">
                        {institute.opening}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-600 mb-2 font-medium">Closing Rank</p>
                      <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-base font-bold">
                        {institute.closing}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table Layout */}
          <div className="hidden lg:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse min-w-full">
              <thead className="bg-gradient-to-r from-purple-500 to-indigo-600">
                <tr>
                  <th className="border-b border-white/20 py-4 px-4 text-white text-base font-bold">
                    AIIMS Institute Names
                  </th>
                  <th className="border-b border-white/20 py-4 px-4 text-white text-base font-bold text-center">
                    Opening Rank
                  </th>
                  <th className="border-b border-white/20 py-4 px-4 text-white text-base font-bold text-center">
                    Closing Rank
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "AIIMS New Delhi", opening: "109", closing: "2212" },
                  { name: "AIIMS Bathinda", opening: "119", closing: "2058" },
                  { name: "AIIMS Bhopal", opening: "840", closing: "1351" },
                  { name: "AIIMS Bhubaneswar", opening: "202", closing: "1104" },
                  { name: "AIIMS Bibinagar", opening: "1164", closing: "1164" },
                  { name: "AIIMS Bilaspur", opening: "515", closing: "1445" },
                  { name: "AIIMS Deoghar", opening: "1107", closing: "1508" },
                  { name: "AIIMS Gorakhpur", opening: "1071", closing: "2133" },
                  { name: "AIIMS Guwahati", opening: "566", closing: "1487" },
                  { name: "AIIMS Jodhpur", opening: "26", closing: "1029" },
                  { name: "AIIMS Kalyani", opening: "209", closing: "1178" },
                  { name: "AIIMS Mangalagiri", opening: "347", closing: "1863" },
                  { name: "AIIMS Nagpur", opening: "542", closing: "1279" },
                  { name: "AIIMS Patna", opening: "206", closing: "871" },
                  { name: "AIIMS Raebareli", opening: "256", closing: "1255" },
                  { name: "AIIMS Raipur", opening: "74", closing: "1170" },
                  { name: "AIIMS Rajkot", opening: "101", closing: "1080" },
                  { name: "AIIMS Rishikesh", opening: "105", closing: "1200" },
                ].map((institute, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-purple-50 transition ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-semibold">
                      {institute.name}
                    </td>
                    <td className="border-b border-slate-200 py-3 px-4 text-slate-800 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {institute.opening}
                      </span>
                    </td>
                    <td className="border-b border-slate-200 py-3 px-4 text-slate-800 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {institute.closing}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border-l-4 border-purple-500">
            <p className="text-sm text-slate-700">
              <strong>💡 Note:</strong> These cutoff ranks may vary year to year based on exam difficulty, number of candidates, and seat availability. Opening rank indicates the best rank that got admission, while closing rank shows the last rank that secured a seat.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center text-white shadow-2xl">
          <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">
            Ready to <span className="text-purple-200">Crack INICET?</span> Get
            Expert Guidance!
          </h3>
          <p className="text-purple-100 mb-4 lg:mb-6 text-sm lg:text-lg">
            Join thousands of successful INICET aspirants with personalized
            mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-400 to-blue-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold hover:from-blue-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Get Expert Mentorship
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicetMainContent;