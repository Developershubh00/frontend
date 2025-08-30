import React, { useState } from 'react';
import {
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Calendar,
  ExternalLink,
  ChevronRight,
  Target,
  GraduationCap,
  MessageCircle,
  Send,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

import NeetComparison from "./NeetComparison";
import QuotaModal from "./QuotaModal";
import StateTabs from "./StateTabs";
import PGResultsModal from "./PGResultsModal";
import DataTable from "./DataTable";
import { dataService } from "../services/dataService";

/**
 * MainContent Component Props Interface
 * Defines the props required for the MainContent component
 */
interface MainContentProps {
  activeTab: string;
  dashboardData?: {
    neetStats: any[];
    timeline: any[];
    choiceLists: any[];
  };
}

/**
 * MainContent Component
 * Main dashboard content area displaying Counselling information,
 * statistics, timelines, and action cards
 * API Integration: Uses dashboard data from props
 */
const MainContent: React.FC<MainContentProps> = ({ activeTab, dashboardData }) => {
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [showPGResultsModal, setShowPGResultsModal] = useState(true); // Show PG results modal by default
  const [currentStateTab, setCurrentStateTab] = useState("all-india-pg"); // Default to PG
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableType, setTableType] = useState<string>("allotments");
  const [loading, setLoading] = useState(false);

  // Action buttons configuration for the hero section
  const actionButtons = [
    {
      id: "website",
      label: "Website",
      icon: FileText,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      onClick: () => {
        window.open(
          "https://mcc.nic.in/pg-medical-counselling/",
          "_blank"
        );
      },
    },
    {
      id: "quotas",
      label: "Quotas",
      icon: FileText,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      onClick: () => {
        setShowQuotaModal(true); // Show the popup modal
      },
    },
    {
      id: "registration",
      label: "Registration",
      icon: BarChart3,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      onClick: () => {
        window.open(
          "https://mcc.admissions.nic.in/applicant/Root/Home.aspx?enc=yVQCIiq12npg+pcvNJRdczPF17I15Ol0NS9nSxDhDdGLAjT1f7ob/W1d83JxT5Jc",
          "_blank"
        );
      },
    },
    {
      id: "prospectus",
      label: "Prospectus",
      icon: FileText,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      onClick: () => {
        window.open(
          "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2024/11/2024110615.pdf",
          "_blank"
        );
      },
    },
  ];

  const dataCards = [
    {
      title: "Allotments",
      subtitle: "2024",
      icon: Users,
      color: "bg-purple-500",
      navLink: "/allotments",
      onClick: () => {
        window.location.href = "/allotments";
      },
    },
    {
      title: "Closing Ranks",
      subtitle: "2024",
      icon: TrendingUp,
      color: "bg-blue-500",
      navLink: "/closing-ranks",
      onClick: () => {
        window.location.href = "/closing-ranks";
      },
    },
    {
      title: "Seat Matrix",
      subtitle: "2024",
      icon: BarChart3,
      color: "bg-indigo-500",
      navLink: "/seat-matrix",
      onClick: () => {
        window.location.href = "/seat-matrix";
      },
    },
    {
      title: "Fee, Stipend & Bond",
      subtitle: "2024",
      icon: Award,
      color: "bg-purple-600",
      navLink: "/fee-stipend-bond",
      onClick: () => {
        window.location.href = "/fee-stipend-bond";
      },
    },
  ];

  // Quick action cards for main dashboard features - PG Centric
  const quickActionCards = [
    {
      title: "NEET PG Results 2025",
      subtitle: "Results Announced - Check Now!",
      icon: Target,
      bgGradient: "from-green-400 to-emerald-600",
      textColor: "text-white",
      action: "Check Results",
      onClick: () => {
        window.open(
          "https://natboard.edu.in/natboard-data/pdf/NEETPG2025RESULT/NEET-PG%202025%20Notice%20Board%20Result%20-%2019.08.2025%20-%20DS.pdf",
          "_blank"
        );
      },
    },
    {
      title: "PG Counselling Registration",
      subtitle: "Start your counselling journey",
      icon: GraduationCap,
      bgGradient: "from-blue-400 to-indigo-600",
      textColor: "text-white",
      action: "Start Now",
      onClick: () => {
        window.open(
          "https://mcc.nic.in/pg-medical-counselling/",
          "_blank"
        );
      },
    },
    {
      title: "Specialty Predictor",
      subtitle: "Predict your specialty options",
      icon: HelpCircle,
      bgGradient: "from-purple-400 to-violet-600",
      textColor: "text-white",
      action: "Predict Now",
      onClick: () => {
        window.location.href = "/pg-predictor";
      },
    },
  ];

  // NEET statistics data for comparison display
  const neetStats = dashboardData?.neetStats || [
    { label: "Registered", value: "6,819", year: "2025" },
    { label: "Appeared", value: "6,612", year: "2025" },
    { label: "Qualified", value: "4,681", year: "2025" },
    { label: "Registered", value: "3,49,759", year: "2024" },
    { label: "Appeared", value: "3,33,333", year: "2024" },
    { label: "Qualified", value: "2,15,768", year: "2024" },
  ];

  // Timeline steps for Counselling process
  const timelineSteps = dashboardData?.timeline || [
    {
      date: "SEP 20 2025",
      title: "Round 2 Joining",
      subtitle: "Start Date",
      status: "Coming Soon",
    },
    {
      date: "SEP 27 2025",
      title: "Round 2 Joining",
      subtitle: "End Date",
      status: "Coming Soon",
    },
    {
      date: "OCT 8 2025",
      title: "Round 3 Registration",
      subtitle: "Start Date",
      status: "Coming Soon",
    },
    {
      date: "OCT 11 2025",
      title: "Round 3 Registration",
      subtitle: "End Date",
      status: "pComing Soon",
    },
  ];

  const handleStateTabChange = (tabId: string) => {
    setCurrentStateTab(tabId);
    // Fetch data based on the selected tab
    fetchData(tabId, tableType);
  };

  // Fetch data based on current tab and table type
  const fetchData = async (category: string, type: string) => {
    setLoading(true);
    try {
      let data;
      switch (type) {
        case "allotments":
          data = await dataService.getCategoryAllotments(category);
          break;
        case "closing-ranks":
          data = await dataService.getCategoryClosingRanks(category);
          break;
        case "seat-matrix":
          data = await dataService.getCategorySeatMatrix(category);
          break;
        case "fee-stipend-bond":
          data = await dataService.getCategoryFeeStipendBond(category);
          break;
        default:
          data = await dataService.getCategoryAllotments(category);
      }
      // Ensure data is always an array
      let dataArray = [];
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        dataArray = data.data;
      } else if (data && typeof data === 'object' && data.data) {
        dataArray = [data.data];
      }
      setTableData(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle table type change
  const handleTableTypeChange = (type: string) => {
    setTableType(type);
    fetchData(currentStateTab, type);
  };

  // Fetch data when component mounts
  React.useEffect(() => {
    fetchData(currentStateTab, tableType);
  }, []);

  // Get table columns based on table type
  const getTableColumns = (type: string) => {
    switch (type) {
      case "allotments":
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "specialty", label: "Specialty", sortable: true },
          { key: "category", label: "Category", sortable: true },
          { key: "quota", label: "Quota", sortable: true },
          { key: "round", label: "Round", sortable: true },
          { key: "rank", label: "Closing Rank", sortable: true },
        ];
      case "closing-ranks":
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "specialty", label: "Specialty", sortable: true },
          { key: "category", label: "Category", sortable: true },
          { key: "opening_rank", label: "Opening Rank", sortable: true },
          { key: "closing_rank", label: "Closing Rank", sortable: true },
          { key: "year", label: "Year", sortable: true },
        ];
      case "seat-matrix":
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "specialty", label: "Specialty", sortable: true },
          { key: "total_seats", label: "Total Seats", sortable: true },
          { key: "aiq_seats", label: "AIQ Seats", sortable: true },
          { key: "state_seats", label: "State Seats", sortable: true },
          { key: "management_seats", label: "Management Seats", sortable: true },
        ];
      case "fee-stipend-bond":
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "specialty", label: "Specialty", sortable: true },
          { key: "fee", label: "Fee (₹)", sortable: true },
          { key: "stipend", label: "Stipend (₹)", sortable: true },
          { key: "bond", label: "Bond Period", sortable: true },
          { key: "bond_amount", label: "Bond Amount (₹)", sortable: true },
        ];
      default:
        return [
          { key: "college", label: "College Name", sortable: true },
          { key: "specialty", label: "Specialty", sortable: true },
          { key: "category", label: "Category", sortable: true },
        ];
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
      {/* Mobile-First Hero Section */}
      <div className="bg-[#65b867] px-4 lg:px-6 py-6 lg:py-12 relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="xl:hidden text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
              <span className="text-white text-2xl">⚡</span>
            </div>
            
            <h1 className="text-xl font-bold text-white mb-2">
              NEET PG 2025 Results Announced!
            </h1>
            <p className="text-orange-100 mb-6 text-sm">Check Your Results & Start Counselling</p>

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

            {/* <div className="flex justify-center space-x-3">
              <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <Send className="w-6 h-6" />
              </button>
            </div> */}
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden xl:block text-center">
            <div className="inline-flex items-center space-x-3 mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                🎉 NEET PG 2025 Results Announced!
              </h1>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-lg">🏆</span>
              </div>
            </div>

            <p className="text-orange-100 mb-8 text-lg">
              Check Your Results & Start Your Counselling Journey Today!
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

      {/* State Tabs Section
      <div className="px-4 lg:px-6 py-4">
        <StateTabs 
          activeTab={currentStateTab} 
          onTabChange={handleStateTabChange} 
        />
      </div> */}

      <div className="px-4 lg:px-6 py-6 lg:py-8 max-w-7xl mx-auto">
        {/* Mobile-First Data Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
          {dataCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => window.location.href = card.navLink}
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

        {/* Mobile-First Quick Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {quickActionCards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${card.bgGradient} rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <card.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <ExternalLink className="w-5 h-5 opacity-70" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-2">
                {card.title}
              </h3>
              <p className="text-white/80 mb-4 text-sm lg:text-base">
                {card.subtitle}
              </p>
              <button
                className="bg-white/20 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-lg lg:rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm lg:text-base"
                onClick={card.onClick}
              >
                {card.action}
              </button>
            </div>
          ))}
        </div>

        {/* NEET PG 2025 Results Statistics - Mobile Optimized */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              🎉 NEET PG 2025 Results Announced!
            </h2>
            <p className="text-slate-600 text-sm lg:text-base">
              NEET PG 2025 results have been declared! Check your scorecard and start your counselling registration. The cutoff scores for different categories have been updated.
            </p>
          </div>

          <div className="text-center mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
              NEET PG 2025 Cutoff Scores
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-full">
                <thead>
                  <tr>
                    <th className="border-b border-slate-200 py-2 text-slate-600 text-sm lg:text-base">Category</th>
                    <th className="border-b border-slate-200 py-2 text-slate-600 text-sm lg:text-base">Qualifying Percentile</th>
                    <th className="border-b border-slate-200 py-2 text-slate-600 text-sm lg:text-base">Score Range (Out of 800)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">Unreserved (UR) / EWS</td>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">50th percentile</td>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">275–320 marks</td>
                  </tr>
                  <tr>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">SC / ST / OBC</td>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">40th percentile</td>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">245–275 marks</td>
                  </tr>
                  <tr>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">UR-PwD</td>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">45th percentile</td>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">260–290 marks</td>
                  </tr>
                  <tr>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">SC/ST/OBC-PwD</td>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">40th percentile</td>
                    <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">245–275 marks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* NEET PG 2025 Counselling Timeline */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              NEET PG 2025 Counselling Timeline
            </h2>
            <p className="text-slate-600 text-sm lg:text-base">
              Important dates and events for NEET PG 2025 counselling process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-sm text-green-600 font-medium mb-1">Registration</div>
                <div className="text-lg font-bold text-slate-800 mb-1">Started</div>
                <div className="text-sm text-slate-600">MCC Portal Open</div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-sm text-blue-600 font-medium mb-1">Round 1</div>
                <div className="text-lg font-bold text-slate-800 mb-1">Coming Soon</div>
                <div className="text-sm text-slate-600">Choice Filling</div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-sm text-purple-600 font-medium mb-1">Seat Allotment</div>
                <div className="text-lg font-bold text-slate-800 mb-1">Round 1</div>
                <div className="text-sm text-slate-600">Result Declaration</div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-sm text-orange-600 font-medium mb-1">Joining</div>
                <div className="text-lg font-bold text-slate-800 mb-1">Round 1</div>
                <div className="text-sm text-slate-600">Documentation</div>
              </div>
            </div>
          </div>
        </div>

        {/* NEET PG 2025 Important Information */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
                How to Check NEET PG 2025 Results?
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                Follow these steps to check your NEET PG 2025 results and download your scorecard.
              </p>
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {[
              "Visit the official NBE website – https://nbe.edu.in/",
              "Click on 'NEET PG 2025 Results' link",
              "Enter your NEET PG 2025 Application Number and Password",
              "Click on 'Submit' button",
              "Your NEET PG 2025 scorecard will be displayed",
              "Download and print the scorecard for counselling registration",
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="text-slate-700 text-sm lg:text-base">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEET PG 2025 Specialties Information */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
                Popular NEET PG 2025 Specialties
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                Top specialties with highest demand and career opportunities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "General Medicine", seats: "2,847", demand: "Very High", icon: "🏥" },
              { name: "Pediatrics", seats: "1,234", demand: "High", icon: "👶" },
              { name: "Obstetrics & Gynecology", seats: "1,156", demand: "High", icon: "👩‍⚕️" },
              { name: "Orthopedics", seats: "987", demand: "High", icon: "🦴" },
              { name: "Dermatology", seats: "456", demand: "Very High", icon: "🩺" },
              { name: "Psychiatry", seats: "678", demand: "Medium", icon: "🧠" },
              { name: "Radiology", seats: "789", demand: "High", icon: "📷" },
              { name: "Anesthesiology", seats: "1,023", demand: "High", icon: "💉" },
              { name: "Pathology", seats: "567", demand: "Medium", icon: "🔬" },
            ].map((specialty, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{specialty.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-800">{specialty.name}</h4>
                    <p className="text-sm text-slate-600">{specialty.seats} seats</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    specialty.demand === "Very High" ? "bg-red-100 text-red-700" :
                    specialty.demand === "High" ? "bg-orange-100 text-orange-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {specialty.demand} Demand
                  </span>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEET PG 2025 Counselling Tips */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
                NEET PG 2025 Counselling Tips
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                Essential tips to maximize your chances of getting your preferred specialty and college.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-lg">Choice Filling Strategy</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">1</div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Research thoroughly</p>
                    <p className="text-slate-600 text-xs">Check college reputation, faculty, and infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">2</div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Consider location</p>
                    <p className="text-slate-600 text-xs">Think about living expenses and family proximity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">3</div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Check fee structure</p>
                    <p className="text-slate-600 text-xs">Compare fees, stipend, and bond requirements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-lg">Important Documents</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">1</div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">NEET PG Scorecard</p>
                    <p className="text-slate-600 text-xs">Original and photocopies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">2</div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">MBBS Degree Certificate</p>
                    <p className="text-slate-600 text-xs">Provisional or final degree</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">3</div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Category Certificate</p>
                    <p className="text-slate-600 text-xs">If applicable (SC/ST/OBC/EWS)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEET PG Counselling Process */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
                NEET PG 2025 Counselling Process
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                Complete step-by-step guide for NEET PG 2025 counselling registration and process.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Registration Phase</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Register on MCC Portal</p>
                    <p className="text-slate-600 text-xs">Create account with NEET PG credentials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Pay Registration Fee</p>
                    <p className="text-slate-600 text-xs">Pay Rs. 5000 for AIQ and Rs. 2000 for Deemed Universities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Upload Documents</p>
                    <p className="text-slate-600 text-xs">Upload all required certificates and documents</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Choice Filling & Allotment</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Fill Choices</p>
                    <p className="text-slate-600 text-xs">Select colleges and specialties in order of preference</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Seat Allotment</p>
                    <p className="text-slate-600 text-xs">MCC will allot seats based on rank and choices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                    6
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm font-medium">Report to College</p>
                    <p className="text-slate-600 text-xs">Complete admission formalities at allotted college</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commented out UG content for PG focus */}
        {/* 
        <div>
          <NeetComparison />
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
            <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
                  How to Check NEET Result 2025?
                </h3>
                <p className="text-slate-600 text-sm lg:text-base">
                  Candidates have to check their NEET 2025 result and download
                  the scorecards in online mode by following the steps given
                  below.
                </p>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* NEET PG Counselling Timeline - Mobile Optimized */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 border border-white/20 mb-8 lg:mb-12">
          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-6 lg:mb-8 text-center">
            NEET PG 2025 Counselling Timeline
          </h3>

          <div className="relative">
            {/* Mobile Timeline */}
            <div className="xl:hidden space-y-6">
              {[
                {
                  date: "AUG 19 2025",
                  title: "Results Announced",
                  subtitle: "NEET PG 2025 Results",
                  status: "completed"
                },
                {
                  date: "SEP 2 2025",
                  title: "Counselling Registration",
                  subtitle: "MCC Portal Opens",
                  status: "current"
                },
                {
                  date: "SEP 5 2025",
                  title: "Choice Filling",
                  subtitle: "Round 1 Starts",
                  status: "pending"
                },
                {
                  date: "SEP 15 2025",
                  title: "Seat Allotment",
                  subtitle: "Round 1 Results",
                  status: "pending"
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full flex-shrink-0 ${
                      step.status === "completed"
                        ? "bg-green-400"
                        : step.status === "current"
                        ? "bg-blue-500 animate-pulse"
                        : "bg-slate-300"
                    }`}
                  ></div>
                  <div className="bg-slate-50 rounded-xl p-4 flex-1">
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      {step.date}
                    </div>
                    <div className="text-base font-bold text-slate-800 mb-1">
                      {step.title}
                    </div>
                    <div className="text-sm text-slate-600">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Timeline */}
            <div className="hidden xl:flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
              {[
                {
                  date: "AUG 19 2025",
                  title: "Results Announced",
                  subtitle: "NEET PG 2025 Results",
                  status: "completed"
                },
                {
                  date: "SEP 2 2025",
                  title: "Counselling Registration",
                  subtitle: "MCC Portal Opens",
                  status: "current"
                },
                {
                  date: "SEP 5 2025",
                  title: "Choice Filling",
                  subtitle: "Round 1 Starts",
                  status: "pending"
                },
                {
                  date: "SEP 15 2025",
                  title: "Seat Allotment",
                  subtitle: "Round 1 Results",
                  status: "pending"
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center flex-1"
                >
                  <div
                    className={`w-6 h-6 rounded-full mb-4 ${
                      step.status === "completed"
                        ? "bg-green-400"
                        : step.status === "current"
                        ? "bg-blue-500 animate-pulse"
                        : "bg-slate-300"
                    }`}
                  ></div>
                  <div className="bg-slate-50 rounded-xl p-4 w-full max-w-xs">
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      {step.date}
                    </div>
                    <div className="text-lg font-bold text-slate-800 mb-1">
                      {step.title}
                    </div>
                    <div className="text-sm text-slate-600">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block absolute top-3 left-0 right-0 h-0.5 bg-slate-200">
              <div className="h-full bg-green-400 w-1/4"></div>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                NEET PG 2025 Data
              </h2>
              <p className="text-slate-600 text-sm lg:text-base">
                View detailed information for {currentStateTab.replace('-', ' ').toUpperCase()}
              </p>
            </div>
            
            {/* Table Type Selector */}
            <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
              {[
                { id: "allotments", label: "Allotments", icon: "📊" },
                { id: "closing-ranks", label: "Closing Ranks", icon: "📈" },
                { id: "seat-matrix", label: "Seat Matrix", icon: "🏥" },
                { id: "fee-stipend-bond", label: "Fee & Stipend", icon: "💰" },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTableTypeChange(type.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    tableType === type.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <DataTable
            data={tableData}
            columns={getTableColumns(tableType)}
            title={`${tableType.replace('-', ' ').toUpperCase()} - ${currentStateTab.replace('-', ' ').toUpperCase()}`}
            subtitle={`Showing data for ${currentStateTab.replace('-', ' ').toUpperCase()}`}
            searchPlaceholder={`Search ${tableType.replace('-', ' ')}...`}
            loading={loading}
          />
        </div>

        {/* NEET PG Career Guidance CTA - Mobile Optimized */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center text-white shadow-2xl">
          <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">
            Ready for <span className="text-green-300">Specialty Selection?</span> Get Expert Guidance!
          </h3>
          <p className="text-green-100 mb-4 lg:mb-6 text-sm lg:text-lg">
            Choose the right specialty with our expert guidance. Get personalized advice for your NEET PG counselling journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://forms.gle/HE2RyX5CLh7j9FzX9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-400 to-indigo-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold text-base lg:text-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
            >
              Get Specialty Guidance
            </a>
            <a
              href="/pg-predictor"
              className="bg-gradient-to-r from-purple-400 to-violet-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold text-base lg:text-lg hover:from-purple-500 hover:to-violet-500 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
            >
              Try Specialty Predictor
            </a>
          </div>
        </div>
      </div>

      {/* Quota Modal */}
      <QuotaModal isOpen={showQuotaModal} onClose={() => setShowQuotaModal(false)} />
      
      {/* PG Results Modal */}
      <PGResultsModal isOpen={showPGResultsModal} onClose={() => setShowPGResultsModal(false)} />
    </div>
  );
};

export default MainContent;