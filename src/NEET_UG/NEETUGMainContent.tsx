import React, { useEffect, useState } from "react";
import {
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Calendar,
  ChevronRight,
  Target,
  CheckCircle,
  BookOpen,
  Building2,
  MapPin,
  GraduationCap,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

// ── IMPORTS for modals & components ──────────────────────────────────
import YearSelectionModal from "./latest2025data/YearSelectionModalUG";
import SeatCards from "./SeatCardsUG";
// ───────────────────────────────────────────────────────────────────

interface NEETUGMainContentProps {
  activeTab?: string;
  dashboardData?: {
    neetStats: any[];
    timeline: any[];
    choiceLists: any[];
  };
}

const NEETUGMainContent: React.FC<NEETUGMainContentProps> = ({
  activeTab,
  dashboardData,
}) => {
  // ── STATE MANAGEMENT ──────────────────────────────────────────────
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [currentStateTab, setCurrentStateTab] = useState("all-india-ug");
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableType, setTableType] = useState<string>("allotments");
  const [loading, setLoading] = useState(false);
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  // ── YEAR SELECTION MODAL STATE ────────────────────────────────────
  const [yearModal, setYearModal] = useState<{
    open: boolean;
    cardId: string;
    cardTitle: string;
  }>({ open: false, cardId: "", cardTitle: "" });

  const openYearModal = (cardId: string, cardTitle: string) => {
    setYearModal({ open: true, cardId, cardTitle });
  };

  const handleYearSelect = (year: "2025" | "2024", cardId: string) => {
    setYearModal({ open: false, cardId: "", cardTitle: "" });

    if (year === "2025") {
      if (cardId === "allotments") window.location.href = "/comingsoonpage"; ///NEETUG/allotments2025
      if (cardId === "closing-ranks")
        window.location.href = "/NEETUG/closingranks2025";
      if (cardId === "seat-matrix") window.location.href = "/NEETUG/SEATMATRIX";
      if (cardId === "fees-stipend-bond")
        window.location.href = "/NEETUG/feessstipendbond2025";
      return;
    }

    // 2024 routes
    if (cardId === "allotments") window.location.href = "/comingsoonpage"; //"/NEETUG/allotments
    if (cardId === "closing-ranks") window.location.href = "/comingsoonpage"; //"/NEETUG/closingranks
    if (cardId === "seat-matrix") window.location.href = "/comingsoonpage"; ///NEETUG/seat-matrix
    if (cardId === "fees-stipend-bond")
      window.location.href = "/comingsoonpage"; ///NEETUG/feesstipendbond
  };

  // Background rotation effect
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [
    "https://cdn.dribbble.com/userupload/47072483/file/4e241bcd05ff431236aefe3ca32de0b5.png",
  ];

  useEffect(() => {
    const t = setInterval(
      () => setBgIndex((i) => (i + 1) % bgImages.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            if (id) {
              setVisibleSections((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    document.querySelectorAll("[data-section-id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── ACTION BUTTONS (NEET UG Specific) ─────────────────────────────
  const actionButtons = [
    {
      id: "website",
      label: "NTA Website",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => window.open("https://neet.nta.nic.in/", "_blank"),
    },
    {
      id: "registration",
      label: "Application",
      icon: BarChart3,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => window.open("https://neet.ntaonline.in/", "_blank"),
    },
    {
      id: "prospectus",
      label: "Information Bulletin",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () =>
        window.open(
          "https://neet.nta.nic.in/Download/Info_Bulletin_2025.pdf",
          "_blank",
        ),
    },
    {
      id: "schedule",
      label: "Exam Schedule",
      icon: Calendar,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => (window.location.href = "/NEETUG/schedule"),
    },
  ];

  // ── DATA CARDS (Opens Year Modal) ─────────────────────────────────
  const dataCards = [
    {
      id: "allotments",
      title: "College Allotments",
      subtitle: "Round-wise Results",
      icon: Users,
      color: "bg-blue-500",
      navLink: "/NEETUG/allotments",
    },
    {
      id: "closing-ranks",
      title: "Closing Ranks",
      subtitle: "Category-wise Analysis",
      icon: TrendingUp,
      color: "bg-indigo-500",
      navLink: "/NEETUG/closingranks",
    },
    {
      id: "seat-matrix",
      title: "Seat Matrix",
      subtitle: "AIQ & State Quota",
      icon: BarChart3,
      color: "bg-blue-600",
      navLink: "/NEETUG/SEATMATRIX",
    },
    {
      id: "fees-stipend-bond",
      title: "Fees & Bonds",
      subtitle: "College-wise Details",
      icon: Award,
      color: "bg-indigo-600",
      navLink: "/NEETUG/feesstipendbond",
    },
  ];

  // ── MOCK DATA ─────────────────────────────────────────────────────
  const neetStats = dashboardData?.neetStats || [
    { label: "Registered", value: "24.1 Lakhs", year: "2025" },
    { label: "Appeared", value: "22.8 Lakhs", year: "2025" },
    { label: "Qualified", value: "13.2 Lakhs", year: "2025" },
    { label: "Registered", value: "23.4 Lakhs", year: "2024" },
    { label: "Appeared", value: "21.9 Lakhs", year: "2024" },
    { label: "Qualified", value: "12.9 Lakhs", year: "2024" },
  ];

  const timelineSteps = dashboardData?.timeline || [
    {
      date: "MAY 04, 2025",
      title: "NEET UG Exam Date",
      subtitle: "Pen & Paper Mode",
      status: "Completed",
    },
    {
      date: "JUN 14, 2025",
      title: "Result Declaration",
      subtitle: "Scorecards Released",
      status: "Completed",
    },
    {
      date: "JUL 2025",
      title: "Counselling Registration",
      subtitle: "MCC Portal Open",
      status: "Active",
    },
    {
      date: "AUG 2025",
      title: "Round 1 Allotment",
      subtitle: "Seat Allocation",
      status: "Upcoming",
    },
  ];

  // ── TABLE COLUMN CONFIG ───────────────────────────────────────────
  const getTableColumns = (type: string) => {
    switch (type) {
      case "allotments":
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "course", label: "Course (MBBS/BDS)", sortable: true },
          { key: "category", label: "Category", sortable: true },
          { key: "quota", label: "Quota (AIQ/State)", sortable: true },
          { key: "round", label: "Round", sortable: true },
          { key: "rank", label: "Closing Rank", sortable: true },
        ];
      case "closing-ranks":
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "course", label: "Course", sortable: true },
          { key: "category", label: "Category", sortable: true },
          { key: "opening_rank", label: "Opening Rank", sortable: true },
          { key: "closing_rank", label: "Closing Rank", sortable: true },
          { key: "year", label: "Year", sortable: true },
        ];
      case "seat-matrix":
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "course", label: "Course", sortable: true },
          { key: "total_seats", label: "Total Seats", sortable: true },
          { key: "aiq_seats", label: "15% AIQ Seats", sortable: true },
          { key: "state_seats", label: "85% State Seats", sortable: true },
          { key: "nri_seats", label: "NRI Seats", sortable: true },
        ];
      case "fee-stipend-bond":
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "course", label: "Course", sortable: true },
          { key: "fee", label: "Annual Fee (₹)", sortable: true },
          { key: "hostel_fee", label: "Hostel Fee (₹)", sortable: true },
          { key: "bond", label: "Bond Period", sortable: true },
          { key: "bond_amount", label: "Bond Amount (₹)", sortable: true },
        ];
      default:
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "course", label: "Course", sortable: true },
          { key: "category", label: "Category", sortable: true },
        ];
    }
  };

  // Fade-in animation classes
  const getFadeClass = (sectionId: string, delay: number = 0) => {
    const isVisible = visibleSections[sectionId];
    return `transition-all duration-700 ease-out ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* ── YEAR SELECTION MODAL ───────────────────────────────────── */}
      <YearSelectionModal
        isOpen={yearModal.open}
        onClose={() => setYearModal({ open: false, cardId: "", cardTitle: "" })}
        onSelectYear={handleYearSelect}
        cardId={yearModal.cardId}
        cardTitle={yearModal.cardTitle}
      />
      {/* ───────────────────────────────────────────────────────────── */}

      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <div
        data-section-id="hero"
        className={`bg-gradient-to-r from-blue-300 to-blue-700 px-4 lg:px-6 py-6 lg:pb-24 relative overflow-hidden rounded-2xl ${getFadeClass("hero")}`}
      >
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />

        <div className="relative max-w-7xl mx-auto w-full">
          {/* Mobile Layout */}
          <div className="xl:hidden text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white mb-4 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.7)]">
              NEET UG 2025 - Your Path to MBBS/BDS
            </h1>
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
              <h1 className="text-3xl lg:text-4xl font-bold text-white [text-shadow:_1px_1px_2px_rgba(0,0,0,0.7)]">
                NEET UG 2025 - Counselling, Cutoffs, Seat Matrix & More!
              </h1>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-blue-100 mb-8 text-lg">
              Complete Guide for MBBS/BDS Admissions - Cutoffs, Counselling,
              College Predictor & More!
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

      <div className="relative z-10 -mt-16 px-4 lg:px-6 py-6 lg:py-4 max-w-7xl mx-auto">
        {/* ── DATA CARDS WITH YEAR MODAL ───────────────────────────── */}
        <div
          data-section-id="datacards"
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12 ${getFadeClass("datacards", 100)}`}
        >
          {dataCards.map((card) => (
            <div
              key={card.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => openYearModal(card.id, card.title)}
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
              <div className="flex items-center gap-1 mt-2">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">
                  2024 & 2025
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
        {/* ─────────────────────────────────────────────────────────── */}

        {/* ── SEAT CARDS COMPONENT ─────────────────────────────────── */}
        <div
          data-section-id="seatcards"
          className={getFadeClass("seatcards", 200)}
        >
          <SeatCards />
        </div>
        {/* ── ENHANCED: HOW TO CHECK RESULTS + COUNSELLING GUIDE ──── */}
        {/* Left-Right Layout on Desktop, Stacked on Mobile with Fade Animations */}
        <div
          data-section-id="guide"
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12 ${getFadeClass("guide", 800)}`}
        >
          {/* HOW TO CHECK RESULTS - LEFT CARD */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden group">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 lg:px-8 lg:py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-white">
                    How to Check NEET UG 2025 Results
                  </h3>
                  <p className="text-blue-100 text-xs lg:text-sm">
                    Step-by-step guide from NTA
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
              <div className="space-y-4 lg:space-y-5">
                {[
                  {
                    step: 1,
                    title: "Visit NTA Portal",
                    desc: "Go to https://neet.nta.nic.in/",
                  },
                  {
                    step: 2,
                    title: "Click Result Link",
                    desc: "Select 'NEET UG 2025 Result'",
                  },
                  {
                    step: 3,
                    title: "Enter Credentials",
                    desc: "Application No, Password & Security Pin",
                  },
                  {
                    step: 4,
                    title: "View & Download",
                    desc: "Submit to see result, download scorecard",
                  },
                  {
                    step: 5,
                    title: "Save for Counselling",
                    desc: "Note your AIR & Percentile",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 hover:bg-blue-100/50 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base shadow-md">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 font-semibold text-sm lg:text-base">
                        {item.title}
                      </p>
                      <p className="text-slate-600 text-xs lg:text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>

              {/* Quick Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="https://neet.nta.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open NTA Portal
                </a>
              </div>
            </div>
          </div>

          {/* COUNSELLING GUIDE - RIGHT CARD */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden group">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 lg:px-8 lg:py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-white">
                    NEET UG 2026 Counselling Guide
                  </h3>
                  <p className="text-indigo-100 text-xs lg:text-sm">
                    AIQ & State Quota process explained
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
              {/* Tabs for AIQ / State */}
              <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
                <button className="flex-1 py-2 px-4 text-sm font-medium rounded-lg bg-white text-blue-700 shadow-sm">
                  15% AIQ (MCC)
                </button>
                <button className="flex-1 py-2 px-4 text-sm font-medium rounded-lg text-slate-600 hover:bg-white/50 transition-colors">
                  85% State Quota
                </button>
              </div>

              {/* Process Steps */}
              <div className="space-y-4">
                {[
                  {
                    icon: Users,
                    title: "Register on MCC",
                    desc: "Use NEET credentials at mcc.nic.in",
                    color: "blue",
                  },
                  {
                    icon: Award,
                    title: "Pay Security Deposit",
                    desc: "₹10,000 for Govt / ₹2L for Deemed",
                    color: "indigo",
                  },
                  {
                    icon: Target,
                    title: "Fill & Lock Choices",
                    desc: "Select colleges in preference order",
                    color: "purple",
                  },
                  {
                    icon: CheckCircle,
                    title: "Seat Allotment",
                    desc: "Based on rank, choices & availability",
                    color: "blue",
                  },
                  {
                    icon: Building2,
                    title: "Report to College",
                    desc: "Complete admission formalities",
                    color: "indigo",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-100 hover:border-blue-200 transition-all duration-300"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-${step.color}-100`}
                    >
                      <step.icon className={`w-5 h-5 text-${step.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 font-semibold text-sm lg:text-base">
                        {step.title}
                      </p>
                      <p className="text-slate-600 text-xs lg:text-sm mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 text-${step.color}-400 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1`}
                    />
                  </div>
                ))}
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Pro Tip:</span> Start
                    counselling registration immediately after result
                    declaration. Early registration ensures better choice
                    availability in Round 1.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ─────────────────────────────────────────────────────────── */}

        {/* ── COLLEGE PREDICTOR ENTRY CARD (NEET UG) ───────────────── */}
        <div
          data-section-id="predictor"
          className={`bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20 ${getFadeClass("predictor", 300)}`}
        >
          <div
            className="mb-8 lg:mb-12 rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => (window.location.href = "/NEETUG/predictor")}
            style={{
              background:
                "linear-gradient(135deg, #2563eb 0%, #2563eb 40%, #3b82f6 70%, #60a5fa 100%)",
              position: "relative",
            }}
          >
            {/* Grid Pattern */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage:
                  "radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Decorative Blobs */}
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(59,130,246,.25)",
                filter: "blur(60px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: "30%",
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(96,165,250,.2)",
                filter: "blur(50px)",
              }}
            />

            <div
              style={{
                position: "relative",
                padding: "32px 36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              {/* Left Content */}
              <div style={{ flex: 1, minWidth: 240 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: "rgba(255,255,255,.12)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,.2)",
                    borderRadius: 999,
                    padding: "4px 14px",
                    marginBottom: 14,
                    color: "#dbeafe",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  NEET UG 2025 — Live Data
                  <span
                    style={{
                      background: "#3b82f6",
                      color: "#fff",
                      borderRadius: 999,
                      padding: "1px 7px",
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  >
                    NEW
                  </span>
                </div>
                <h2
                  style={{
                    margin: "0 0 10px",
                    fontSize: "clamp(20px,3vw,30px)",
                    fontWeight: 900,
                    color: "#fff",
                    lineHeight: 1.2,
                    fontFamily: "'DM Sans','Nunito',sans-serif",
                    textShadow: "0 2px 12px rgba(0,0,0,.3)",
                  }}
                >
                  Predict Your{" "}
                  <span style={{ color: "#fbbf24" }}>
                    Dream Medical College
                  </span>
                  <br />
                  With Your NEET UG Score
                </h2>
                <p
                  style={{
                    margin: "0 0 20px",
                    color: "#dbeafe",
                    fontSize: 14,
                    lineHeight: 1.6,
                    maxWidth: 480,
                  }}
                >
                  Instantly see which MBBS/BDS colleges you qualify for — based
                  on 50,000+ real 2025 allotment & closing rank records across
                  AIQ & State Quotas.
                </p>
                {/* Stats */}
                <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
                  {[
                    ["8,500+", "Allotments"],
                    ["28,000+", "Closing Ranks"],
                    ["700+", "Colleges"],
                    ["MBBS/BDS", "Courses"],
                  ].map(([v, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div
                        style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}
                      >
                        {v}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#bfdbfe",
                          fontWeight: 600,
                        }}
                      >
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right CTA */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    background: "white",
                    color: "#1e40af",
                    border: "none",
                    borderRadius: 16,
                    padding: "12px 30px",
                    fontSize: 21,
                    fontWeight: 800,
                    boxShadow: "0 8px 28px rgba(59, 130, 246, 0.45)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transition: "transform .2s",
                    whiteSpace: "nowrap",
                  }}
                  className="group-hover:scale-105"
                >
                  Open Predictor
                  <ArrowRight className="w-5 h-5" />
                </div>
                <span style={{ color: "#eff6ff", fontSize: 12 }}>
                  Free · Instant Results
                </span>

                {/* Mode Chips */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {["AIQ Ranks", "State Quota", "Private Colleges"].map((l) => (
                    <span
                      key={l}
                      style={{
                        background: "rgba(255,255,255,.12)",
                        color: "#dbeafe",
                        borderRadius: 999,
                        padding: "4px 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        border: "1px solid rgba(255,255,255,.15)",
                      }}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TREND COMPARISON: TOP RANKERS COURSE PREFERENCES ────── */}
        <div
          data-section-id="trends"
          className={`bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20 ${getFadeClass("trends", 400)}`}
        >
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-700 to-indigo-600 text-transparent bg-clip-text">
              Trend: Top 100 Ranks - Course Preferences (2021-2025)
            </h2>
            <p className="text-slate-600 text-sm lg:text-base max-w-2xl mx-auto border border-slate-200 rounded-full p-3 shadow-sm">
              Course choices by first 100 rank holders in All India Quota
              Counselling
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-center border-collapse min-w-full">
              <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <tr>
                  <th className="py-4 px-4 text-left font-bold text-base lg:text-lg border-r border-slate-600">
                    Course
                  </th>
                  <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">
                    2025
                  </th>
                  <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">
                    2024
                  </th>
                  <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">
                    2023
                  </th>
                  <th className="py-4 px-4 font-bold text-base lg:text-lg">
                    2022
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  { course: "MBBS (Govt)", years: [92, 94, 91, 89] },
                  {
                    course: "MBBS (Private)",
                    years: [5, 4, 6, 7],
                    highlight: true,
                  },
                  {
                    course: "BDS (Govt)",
                    years: [2, 1, 2, 3],
                    highlight: true,
                  },
                  { course: "AYUSH Courses", years: [1, 1, 1, 1] },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
                  >
                    <td className="py-3 px-4 text-left font-semibold text-slate-800 border-r border-slate-200">
                      {row.course}
                    </td>
                    {row.years.map((value, yearIdx) => (
                      <td
                        key={yearIdx}
                        className={`py-3 px-4 font-bold border-r border-slate-200 last:border-r-0 ${row.highlight && value <= 5 ? "text-blue-600 bg-blue-50" : value === 0 ? "text-red-600 bg-red-50" : "text-slate-700"}`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <h4 className="font-bold text-slate-800 mb-2">MBBS Dominance</h4>
              <p className="text-sm text-slate-600">
                92%+ of top 100 rankers choose Government MBBS - the most
                preferred course
              </p>
            </div>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4">
              <h4 className="font-bold text-slate-800 mb-2">Stable Trends</h4>
              <p className="text-sm text-slate-600">
                MBBS preference remains consistently above 90% among top rankers
                across all years
              </p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
              <h4 className="font-bold text-slate-800 mb-2">Key Insight</h4>
              <p className="text-sm text-slate-600">
                Top rankers prioritize Government MBBS due to low fees, quality
                education & better PG prospects
              </p>
            </div>
          </div>
        </div>

        {/* ── CUTOFF SCORES TABLE ─────────────────────────────────── */}
        <div
          data-section-id="cutoff"
          className={`text-center mb-6 lg:mb-8 ${getFadeClass("cutoff", 500)}`}
        >
          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-700 to-indigo-500 text-transparent bg-clip-text">
            NEET UG 2025 Qualifying Cutoff
          </h3>
          <p className="text-slate-600 text-sm mb-4 bg-blue-500 inline-block px-3 py-1 rounded-full text-white">
            Cutoffs based on percentile - varies by exam difficulty &
            normalization
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-center table-fixed border-collapse min-w-full bg-blue-50 rounded-xl shadow-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
                    Category
                  </th>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
                    Percentile
                  </th>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
                    Expected Score (720)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["General / EWS", "50th percentile", "164-180 marks"],
                  ["OBC / SC / ST", "40th percentile", "129-164 marks"],
                  ["General-PwD", "45th percentile", "146-164 marks"],
                  ["OBC/SC/ST-PwD", "40th percentile", "129-146 marks"],
                ].map(([cat, pct, range], i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
                      {cat}
                    </td>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
                      {pct}
                    </td>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
                      {range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-slate-500 italic bg-blue-50 inline-block px-3 py-2 rounded-md">
            Qualifying cutoff ≠ Admission cutoff. College cutoffs are much
            higher based on competition.
          </div>
        </div>

        {/* ── MARKS VS RANK ANALYSIS ───────────────────────────────── */}
        <div
          data-section-id="marksrank"
          className={`text-center mb-6 lg:mb-8 ${getFadeClass("marksrank", 600)}`}
        >
          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-700 to-indigo-500 text-transparent bg-clip-text">
            NEET UG 2025: Marks vs Rank vs College Prospects
          </h3>
          <p className="text-slate-600 text-sm lg:text-base mb-4 bg-blue-500 inline-block px-3 py-1 rounded-full text-white">
            Estimated All India Rank & admission chances based on your score
          </p>
          <div className="overflow-x-auto max-h-[450px] rounded-xl border border-slate-200 shadow-sm bg-blue-50">
            <table className="w-full text-center table-fixed border-collapse min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
                    Score Range
                  </th>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
                    Est. AIR
                  </th>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
                    Admission Prospects
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    score: "705-720",
                    rank: "1-50",
                    prospect: "Top AIIMS, MAMC, UCMS, KGMU",
                  },
                  {
                    score: "690-704",
                    rank: "51-200",
                    prospect: "Top Govt Colleges (Clinical branches)",
                  },
                  {
                    score: "670-689",
                    rank: "201-600",
                    prospect: "Excellent Govt Medical Colleges",
                  },
                  {
                    score: "650-669",
                    rank: "601-1,500",
                    prospect: "Very Good Govt Colleges",
                  },
                  {
                    score: "630-649",
                    rank: "1,501-3,500",
                    prospect: "Good Govt + Top Private",
                  },
                  {
                    score: "610-629",
                    rank: "3,501-7,000",
                    prospect: "Govt (Paraclinical) + Good Private",
                  },
                  {
                    score: "590-609",
                    rank: "7,001-12,000",
                    prospect: "Private Colleges (Clinical possible)",
                  },
                  {
                    score: "560-589",
                    rank: "12,001-25,000",
                    prospect: "Private / Deemed Universities",
                  },
                  {
                    score: "520-559",
                    rank: "25,001-50,000",
                    prospect: "Private (Management quota likely)",
                  },
                  {
                    score: "450-519",
                    rank: "50,001-1,00,000",
                    prospect: "Limited Private Options",
                  },
                  {
                    score: "350-449",
                    rank: "1,00,001-3,00,000",
                    prospect: "BDS / AYUSH / Very Limited MBBS",
                  },
                  {
                    score: "<350",
                    rank: "3,00,000+",
                    prospect: "Qualifying only - Reattempt advised",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
                      {row.score}
                    </td>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
                      {row.rank}
                    </td>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
                      {row.prospect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── COUNSELLING TIMELINE ────────────────────────────────── */}
        <div
          data-section-id="timeline"
          className={`bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20 ${getFadeClass("timeline", 700)}`}
        >
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              NEET UG 2025 Counselling Timeline
            </h2>
            <p className="text-slate-600 text-sm lg:text-base">
              Important dates for MCC All India Quota & State Counselling
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                bg: "bg-blue-600",
                light: "bg-blue-50",
                color: "text-blue-600",
                label: "Registration",
                status: "Active",
                sub: "MCC Portal Open",
              },
              {
                icon: FileText,
                bg: "bg-blue-600",
                light: "bg-blue-50",
                color: "text-blue-600",
                label: "Choice Filling",
                status: "Upcoming",
                sub: "Select Colleges",
              },
              {
                icon: Award,
                bg: "bg-indigo-600",
                light: "bg-indigo-50",
                color: "text-indigo-600",
                label: "Round 1 Result",
                status: "Coming Soon",
                sub: "Seat Allotment",
              },
              {
                icon: Building2,
                bg: "bg-purple-600",
                light: "bg-purple-50",
                color: "text-purple-600",
                label: "Reporting",
                status: "Post-Allotment",
                sub: "Document Verification",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div
                  className={`w-16 h-16 ${step.bg} rounded-full mx-auto mb-4 flex items-center justify-center transition-transform duration-300 hover:scale-110`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div
                  className={`${step.light} rounded-xl p-4 transition-shadow duration-300 hover:shadow-md`}
                >
                  <div className={`text-sm ${step.color} font-medium mb-1`}>
                    {step.label}
                  </div>
                  <div className="text-lg font-bold text-slate-800 mb-1">
                    {step.status}
                  </div>
                  <div className="text-sm text-slate-600">{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── POPULAR COURSES SECTION ─────────────────────────────── */}
        <div
          data-section-id="courses"
          className={`bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20 ${getFadeClass("courses", 900)}`}
        >
          <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
                Popular NEET UG 2025 Courses
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                Top courses with seat availability & demand analysis
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "MBBS",
                seats: "1,09,000+",
                demand: "Very High",
              },
              { name: "BDS", seats: "27,000+", demand: "High" },
              { name: "BAMS", seats: "30,000+", demand: "Rising" },
              {
                name: "BHMS",
                seats: "12,000+",
                demand: "Moderate",
              },
              { name: "BUMS", seats: "2,500+", demand: "Moderate" },
              { name: "BSMS", seats: "600+", demand: "Niche" },
              {
                name: "BVSc & AH",
                seats: "3,200+",
                demand: "Specialized",
              },
              {
                name: "B.Sc Nursing",
                seats: "25,000+",
                demand: "High",
              },
              {
                name: "AYUSH Integrated",
                seats: "5,000+",
                demand: "Emerging",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{course.name}</h4>
                    <p className="text-sm text-slate-600">
                      {course.seats} seats
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.demand === "Very High"
                      ? "bg-red-100 text-red-700"
                      : course.demand === "High"
                        ? "bg-blue-100 text-blue-700"
                        : course.demand === "Rising"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {course.demand} Demand
                </span>
                {/* Competition Bar */}
                <div className="mt-3">
                  <div className="w-full bg-slate-200 h-1 rounded-full">
                    <div
                      className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                      style={{
                        width:
                          course.demand === "Very High"
                            ? "95%"
                            : course.demand === "High"
                              ? "75%"
                              : course.demand === "Rising"
                                ? "55%"
                                : "35%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA SECTION ─────────────────────────────────────────── */}
        <div
          data-section-id="cta"
          className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center text-white shadow-2xl ${getFadeClass("cta", 1000)}`}
        >
          <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">
            Ready to{" "}
            <span className="text-blue-200">Secure Your MBBS Seat?</span> Get
            Expert Guidance!
          </h3>
          <p className="text-blue-100 mb-4 lg:mb-6 text-sm lg:text-lg">
            Personalized counselling, college prediction & strategy from NEET UG
            toppers & mentors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              onClick={() => window.AiSensy?.open?.()}
              className="bg-white text-blue-700 px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-bold text-base lg:text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block cursor-pointer"
            >
              Get Free Counselling
            </a>
            <a
              href="/NEETUG/predictor"
              className="bg-blue-700/30 border border-white/30 px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-bold text-base lg:text-lg hover:bg-blue-700/50 transition-all duration-300 inline-block flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4" />
              Try College Predictor
            </a>
          </div>
        </div>
      </div>

      {/* ── QUOTA MODAL (Existing Component) ──────────────────────── */}
      {/* <QuotaModal isOpen={showQuotaModal} onClose={() => setShowQuotaModal(false)} /> */}
    </div>
  );
};

export default NEETUGMainContent;
