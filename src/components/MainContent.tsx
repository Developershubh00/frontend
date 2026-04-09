// import React, { useState } from "react";
// import {
//   FileText,
//   BarChart3,
//   TrendingUp,
//   Users,
//   Award,
//   Calendar,
//   ExternalLink,
//   ChevronRight,
//   Target,
//   GraduationCap,
//   MessageCircle,
//   Send,
//   HelpCircle,
//   CheckCircle,
// } from "lucide-react";

// import NeetComparison from "./NeetComparison";
// import QuotaModal from "./QuotaModal";
// import StateTabs from "./StateTabs";
// // import PGResultsModal from "./PGResultsModal";
// import DataTable from "./DataTable";
// import { dataService } from "../services/dataService";

// /**
//  * MainContent Component Props Interface
//  * Defines the props required for the MainContent component
//  */
// interface MainContentProps {
//   activeTab: string;
//   dashboardData?: {
//     neetStats: any[];
//     timeline: any[];
//     choiceLists: any[];
//   };
// }

// /**
//  * MainContent Component
//  * Main dashboard content area displaying Counselling information,
//  * statistics, timelines, and action cards
//  * API Integration: Uses dashboard data from props
//  */
// const MainContent: React.FC<MainContentProps> = ({
//   activeTab,
//   dashboardData,
// }) => {
//   const [showQuotaModal, setShowQuotaModal] = useState(false);
//   // const [showPGResultsModal, setShowPGResultsModal] = useState(true); // Show PG results modal by default
//   const [currentStateTab, setCurrentStateTab] = useState("all-india-pg"); // Default to PG
//   const [tableData, setTableData] = useState<any[]>([]);
//   const [tableType, setTableType] = useState<string>("allotments");
//   const [loading, setLoading] = useState(false);

//   // Action buttons configuration for the hero section
//   const actionButtons = [
//     {
//       id: "website",
//       label: "Website",
//       icon: FileText,
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600",
//       onClick: () => {
//         window.open("https://mcc.nic.in/pg-medical-counselling/", "_blank");
//       },
//     },
//     // {
//     //   id: "quotas",
//     //   label: "Quotas",
//     //   icon: FileText,
//     //   bgColor: "bg-blue-100",
//     //   textColor: "text-blue-600",
//     //   onClick: () => {
//     //     setShowQuotaModal(true); // Show the popup modal
//     //   },
//     // },
//     {
//       id: "registration",
//       label: "Registration",
//       icon: BarChart3,
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600",
//       onClick: () => {
//         window.open(
//           "https://mcc.admissions.nic.in/applicant/Root/Home.aspx?enc=yVQCIiq12npg+pcvNJRdczPF17I15Ol0NS9nSxDhDdGLAjT1f7ob/W1d83JxT5Jc",
//           "_blank",
//         );
//       },
//     },
//     {
//       id: "prospectus",
//       label: "Prospectus",
//       icon: FileText,
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600",
//       onClick: () => {
//         window.open(
//           "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2024/11/2024110615.pdf",
//           "_blank",
//         );
//       },
//     },
//     {
//       id: "prospectus",
//       label: "Notice",
//       icon: FileText,
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600",
//       onClick: () => {
//         window.location.href = "/notice";
//       },
//     },
//     {
//       id: "prospectus",
//       label: "Schedule",
//       icon: BarChart3,
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600",
//       onClick: () => {
//         window.location.href = "/schedule";
//       },
//     },
//   ];

//   const dataCards = [
//     {
//       title: "Allotments",
//       subtitle: "",
//       icon: Users,
//       color: "bg-purple-500",
//       navLink: "/allotments",
//       onClick: () => {
//         window.location.href = "/allotments";
//       },
//     },
//     {
//       title: "Closing Ranks",
//       subtitle: "",
//       icon: TrendingUp,
//       color: "bg-blue-500",
//       navLink: "/Closingranks",
//       onClick: () => {
//         window.location.href = "/";
//       },
//     },
//     {
//       title: "Seat Matrix",
//       subtitle: "",
//       icon: BarChart3,
//       color: "bg-indigo-500",
//       navLink: "/seat-matrix",
//       onClick: () => {
//         window.location.href = "/seat-matrix";
//       },
//     },
//     {
//       title: "Fee, Stipend & Bond",
//       subtitle: "",
//       icon: Award,
//       color: "bg-purple-600",
//       navLink: "/feesstipendbonds",
//       onClick: () => {
//         window.location.href = "/";
//       },
//     },
//     // {
//     //   title: "Provisional NEET-PG",
//     //   subtitle: "Provisional NEET-PG Round-1 Seats Allotments",
//     //   icon: Award,
//     //   color: "bg-purple-600",
//     //   navLink: "/data/provisionalneetpg.pdf",
//     //   onClick: () => {
//     //         const win = window.open("/data/provisionalneetpg.pdf", "Provisional NEET-PG Round-1");
//     //         if (win) win.focus();
//     //       },
//     // },
//     // {
//     //       id: "universities",
//     //       icon: GraduationCap,
//     //       label: "Provisional NEET-PG ",
//     //       hasSubmenu: false,
//     //       color: "text-cyan-600",
//     //       onClick: () => {
//     //         const win = window.open("/data/provisionalneetpg.pdf", "Provisional NEET-PG Round-1");
//     //         if (win) win.focus();
//     //       },
//     //     },
//   ];

//   // Quick action cards for main dashboard features - PG Centric
//   // const quickActionCards = [
//   //   {
//   //     title: "NEET PG Results 2025",
//   //     subtitle: "Results Announced - Check Now!",
//   //     icon: Target,
//   //     bgGradient: "from-blue-400 to-blue-600",
//   //     textColor: "text-white",
//   //     action: "Check Results",
//   //     onClick: () => {
//   //       window.open(
//   //         "https://natboard.edu.in/natboard-data/pdf/NEETPG2025RESULT/NEET-PG%202025%20Notice%20Board%20Result%20-%2019.08.2025%20-%20DS.pdf",
//   //         "_blank"
//   //       );
//   //     },
//   //   },
//   //   {
//   //     title: "PG Counselling Registration",
//   //     subtitle: "Start your counselling journey",
//   //     icon: GraduationCap,
//   //     bgGradient: "from-blue-400 to-indigo-600",
//   //     textColor: "text-white",
//   //     action: "Start Now",
//   //     onClick: () => {
//   //       window.open(
//   //         "https://mcc.nic.in/pg-medical-counselling/",
//   //         "_blank"
//   //       );
//   //     },
//   //   },
//   //   {
//   //     title: "Specialty Predictor",
//   //     subtitle: "Predict your specialty options",
//   //     icon: HelpCircle,
//   //     bgGradient: "from-purple-400 to-violet-600",
//   //     textColor: "text-white",
//   //     action: "Predict Now",
//   //     onClick: () => {
//   //       window.location.href = "/pg-predictor";
//   //     },
//   //   },
//   // ];

//   // NEET statistics data for comparison display
//   const neetStats = dashboardData?.neetStats || [
//     { label: "Registered", value: "6,819", year: "2025" },
//     { label: "Appeared", value: "6,612", year: "2025" },
//     { label: "Qualified", value: "4,681", year: "2025" },
//     { label: "Registered", value: "3,49,759", year: "2024" },
//     { label: "Appeared", value: "3,33,333", year: "2024" },
//     { label: "Qualified", value: "2,15,768", year: "2024" },
//   ];

//   // Timeline steps for Counselling process
//   const timelineSteps = dashboardData?.timeline || [
//     {
//       date: "SEP 20 2025",
//       title: "Round 2 Joining",
//       subtitle: "Start Date",
//       status: "Coming Soon",
//     },
//     {
//       date: "SEP 27 2025",
//       title: "Round 2 Joining",
//       subtitle: "End Date",
//       status: "Coming Soon",
//     },
//     {
//       date: "OCT 8 2025",
//       title: "Round 3 Registration",
//       subtitle: "Start Date",
//       status: "Coming Soon",
//     },
//     {
//       date: "OCT 11 2025",
//       title: "Round 3 Registration",
//       subtitle: "End Date",
//       status: "pComing Soon",
//     },
//   ];

//   const handleStateTabChange = (tabId: string) => {
//     setCurrentStateTab(tabId);
//     // Fetch data based on the selected tab
//     fetchData(tabId, tableType);
//   };

//   // Fetch data based on current tab and table type
//   const fetchData = async (category: string, type: string) => {
//     setLoading(true);
//     try {
//       let data;
//       switch (type) {
//         case "allotments":
//           data = await dataService.getCategoryAllotments(category);
//           break;
//         case "closing-ranks":
//           data = await dataService.getCategoryClosingRanks(category);
//           break;
//         case "seat-matrix":
//           data = await dataService.getCategorySeatMatrix(category);
//           break;
//         case "fee-stipend-bond":
//           data = await dataService.getCategoryFeeStipendBond(category);
//           break;
//         default:
//           data = await dataService.getCategoryAllotments(category);
//       }
//       // Ensure data is always an array
//       let dataArray = [];
//       if (Array.isArray(data)) {
//         dataArray = data;
//       } else if (data && typeof data === "object" && Array.isArray(data.data)) {
//         dataArray = data.data;
//       } else if (data && typeof data === "object" && data.data) {
//         dataArray = [data.data];
//       }
//       setTableData(dataArray);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setTableData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle table type change
//   const handleTableTypeChange = (type: string) => {
//     setTableType(type);
//     fetchData(currentStateTab, type);
//   };

//   // Fetch data when component mounts
//   React.useEffect(() => {
//     fetchData(currentStateTab, tableType);
//   }, []);

//   // Get table columns based on table type
//   const getTableColumns = (type: string) => {
//     switch (type) {
//       case "allotments":
//         return [
//           { key: "college", label: "College Name", sortable: true },
//           { key: "specialty", label: "Specialty", sortable: true },
//           { key: "category", label: "Category", sortable: true },
//           { key: "quota", label: "Quota", sortable: true },
//           { key: "round", label: "Round", sortable: true },
//           { key: "rank", label: "Closing Rank", sortable: true },
//         ];
//       case "closing-ranks":
//         return [
//           { key: "college", label: "College Name", sortable: true },
//           { key: "specialty", label: "Specialty", sortable: true },
//           { key: "category", label: "Category", sortable: true },
//           { key: "opening_rank", label: "Opening Rank", sortable: true },
//           { key: "closing_rank", label: "Closing Rank", sortable: true },
//           { key: "year", label: "Year", sortable: true },
//         ];
//       case "seat-matrix":
//         return [
//           { key: "college", label: "College Name", sortable: true },
//           { key: "specialty", label: "Specialty", sortable: true },
//           { key: "total_seats", label: "Total Seats", sortable: true },
//           { key: "aiq_seats", label: "AIQ Seats", sortable: true },
//           { key: "state_seats", label: "State Seats", sortable: true },
//           {
//             key: "management_seats",
//             label: "Management Seats",
//             sortable: true,
//           },
//         ];
//       case "fee-stipend-bond":
//         return [
//           { key: "college", label: "College Name", sortable: true },
//           { key: "specialty", label: "Specialty", sortable: true },
//           { key: "fee", label: "Fee (₹)", sortable: true },
//           { key: "stipend", label: "Stipend (₹)", sortable: true },
//           { key: "bond", label: "Bond Period", sortable: true },
//           { key: "bond_amount", label: "Bond Amount (₹)", sortable: true },
//         ];
//       default:
//         return [
//           { key: "college", label: "College Name", sortable: true },
//           { key: "specialty", label: "Specialty", sortable: true },
//           { key: "category", label: "Category", sortable: true },
//         ];
//     }
//   };

//   return (
//     <div className="w-full bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
//       {/* Mobile-First Hero Section */}
//       <div className="bg-gradient-to-r from-blue-300 to-blue-700 px-4 lg:px-6 py-6 lg:py-12 relative overflow-hidden rounded-2xl">
//         <div className="absolute inset-0 bg-black/5"></div>
//         <div className="relative max-w-7xl mx-auto">
//           {/* Mobile Layout */}
//           <div className="xl:hidden text-center">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
//               <span className="text-white text-2xl">⚡</span>
//             </div>

//             <h1 className="text-xl font-bold text-white mb-2">
//               Check Your Results & Start Counselling
//             </h1>
//             {/* <p className="text-blue-100 mb-6 text-sm">Check Your Results & Start Counselling</p> */}

//             <div className="grid grid-cols-2 gap-3 mb-6">
//               {actionButtons.map((button) => (
//                 <button
//                   key={button.id}
//                   onClick={button.onClick}
//                   className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${button.bgColor} ${button.textColor}`}
//                 >
//                   <button.icon className="w-6 h-6" />
//                   <span className="text-sm font-medium">{button.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* <div className="flex justify-center space-x-3">
//               <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
//                 <MessageCircle className="w-6 h-6" />
//               </button>
//               <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
//                 <Send className="w-6 h-6" />
//               </button>
//             </div> */}
//           </div>

//           {/* Desktop Layout */}
//           <div className="hidden xl:block text-center">
//             <div className="inline-flex items-center space-x-3 mb-6">
//               <h1 className="text-3xl lg:text-4xl font-bold text-white  [text-shadow:_1px_1px_2px_rgba(0,0,0,0.7)]">
//                 Check Your Results & Start Your Counselling Journey Today!
//               </h1>
//               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                 <span className="text-white text-lg">🏆</span>
//               </div>
//             </div>

//             {/* <p className="text-blue-100 mb-8 text-lg">
//               Check Your Results & Start Your Counselling Journey Today!
//             </p> */}

//             <div className="flex flex-wrap items-center justify-center gap-4">
//               {actionButtons.map((button) => (
//                 <button
//                   key={button.id}
//                   onClick={button.onClick}
//                   className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${button.bgColor} ${button.textColor} font-medium`}
//                 >
//                   <button.icon className="w-5 h-5" />
//                   <span>{button.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* State Tabs Section
//       <div className="px-4 lg:px-6 py-4">
//         <StateTabs 
//           activeTab={currentStateTab} 
//           onTabChange={handleStateTabChange} 
//         />
//       </div> */}

//       <div className="px-4 lg:px-6 py-6 lg:py-8 max-w-7xl mx-auto">
//         {/* Mobile-First Data Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
//           {dataCards.map((card, index) => (
//             <div
//               key={index}
//               className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
//               onClick={() => (window.location.href = card.navLink)}
//             >
//               <div
//                 className={`w-10 h-10 lg:w-12 lg:h-12 ${card.color} rounded-xl flex items-center justify-center mb-3 lg:mb-4`}
//               >
//                 <card.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//               </div>
//               <h3 className="font-bold text-slate-800 mb-1 text-sm lg:text-base">
//                 {card.title}
//               </h3>
//               <p className="text-xs lg:text-sm text-slate-600">
//                 {card.subtitle}
//               </p>
//               <ChevronRight className="w-4 h-4 text-slate-400 mt-2" />
//             </div>
//           ))}
//         </div>

//         {/* Mobile-First Quick Action Cards */}
//         {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
//           {quickActionCards.map((card, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-r ${card.bgGradient} rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                   <card.icon className="w-6 h-6 lg:w-8 lg:h-8" />
//                 </div>
//                 <ExternalLink className="w-5 h-5 opacity-70" />
//               </div>
//               <h3 className="text-lg lg:text-xl font-bold mb-2">
//                 {card.title}
//               </h3>
//               <p className="text-white/80 mb-4 text-sm lg:text-base">
//                 {card.subtitle}
//               </p>
//               <button
//                 className="bg-white/20 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-lg lg:rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm lg:text-base"
//                 onClick={card.onClick}
//               >
//                 {card.action}
//               </button>
//             </div>
//           ))}
//         </div> */}

//         {/* Seat Availability Notice - Highlighted Section */}
//         {/* <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-xl p-6 lg:p-8 mb-8 lg:mb-12 shadow-lg">
//           <div className="flex items-start space-x-4">
//             <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
//               <FileText className="w-6 h-6 text-amber-600" />
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center space-x-2 mb-2">
//                 <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
//                   📢 IMPORTANT NOTICE
//                 </span>
//                 <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
//                   NEW UPDATE
//                 </span>
//               </div>
//               <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-3">
//                 Number of Seats Available as on 31.03.2025 in PG Medical Course (Broad/Super Speciality) in various Medical Colleges/Institution for the A.Y. 2024-25
//               </h3>
//               <p className="text-slate-600 text-sm lg:text-base mb-4">
//                 Official document detailing the complete seat matrix for PG Medical courses across all categories and institutions for Academic Year 2024-25.
//               </p>
//               <a
//                 href="/data/Seats_PG.pdf"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium text-sm lg:text-base"
//               >
//                 <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
//                 <span>Download PDF Document</span>
//                 <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
//               </a>
//             </div>
//           </div>
//         </div> */}

//         <div className="text-center mb-3 lg:mb-4">
//           <a
//             href="https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/12/202512172132273940.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 font-semibold hover:text-blue-900 underline text-sm lg:text-base transition-colors duration-200"
//           >
//             NEET-PG Counselling Seats Allotment -2025 Round 2
//           </a>
//         </div>

//         {/* Seat Availability Notice - Compact Section */}
//         <div className="text-center mb-6 lg:mb-8">
//           <a
//             href="/data/Seats_PG.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 font-weight: 900; hover:text-blue-900 underline font-medium text-sm lg:text-base transition-colors duration-200"
//           >
//             Number of Seats Available as on 31.03.2025 in PG Medical Course
//             (Broad/Super Speciality) in various Medical Colleges/Institution for
//             the A.Y. 2024-25
//           </a>
//         </div>
//         <div className="text-center mb-6 lg:mb-8">
//           <a
//             href="/data/neetpground1.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 font-weight: 900; hover:text-blue-900 underline font-medium text-sm lg:text-base transition-colors duration-200"
//           >
//             Seat Allotment 2025 (Round 1)
//           </a>
//         </div>

//         <div className="text-center mb-3 lg:mb-4">
//           <a
//             href="https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/11/20251119105316139.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 font-semibold hover:text-blue-900 underline text-sm lg:text-base transition-colors duration-200"
//           >
//             DEEMED UNIVERSITY SEATS MATRIX PG 2025 COUNSELLING
//           </a>
//         </div>

//         <div className="text-center mb-3 lg:mb-4">
//           <a
//             href="https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/10/20251028847832917.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 font-semibold hover:text-blue-900 underline text-sm lg:text-base transition-colors duration-200"
//           >
//             CENTRAL INTERNAL QUOTA SEATS MATRIX PG 2025 COUNSELLING
//           </a>
//         </div>
//         {/* Mobile-First Quick Action Cards */}
//         {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
//           {quickActionCards.map((card, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-r ${card.bgGradient} rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                   <card.icon className="w-6 h-6 lg:w-8 lg:h-8" />
//                 </div>
//                 <ExternalLink className="w-5 h-5 opacity-70" />
//               </div>
//               <h3 className="text-lg lg:text-xl font-bold mb-2">
//                 {card.title}
//               </h3>
//               <p className="text-white/80 mb-4 text-sm lg:text-base">
//                 {card.subtitle}
//               </p>
//               <button
//                 className="bg-white/20 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-lg lg:rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm lg:text-base"
//                 onClick={card.onClick}
//               >
//                 {card.action}
//               </button>
//             </div>
//           ))}
//         </div> */}
//         {/* <div className="text-center mb-6 lg:mb-8">
//           <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//             🎉 NEET PG 2025 Results Announced!
//           </h2>
//           <p className="text-slate-600 text-sm lg:text-base">
//             NEET PG 2025 results have been declared! Check your scorecard and
//             start your counselling registration. The cutoff scores for different
//             categories and rank-wise admission prospects are updated below.
//           </p>
//         </div> */}

//         {/* Trend Comparison Table - NEW */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               📊 Trend Comparison: Top 100 Ranks Branch Preferences
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Branch preferences by first 100 rank holders in All India
//               Counselling (2021-2025)
//             </p>
//           </div>

//           <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
//             <table className="w-full text-center border-collapse min-w-full">
//               <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
//                 <tr>
//                   <th className="py-4 px-4 text-left font-bold text-base lg:text-lg border-r border-slate-600">
//                     Branch/Specialty
//                   </th>
//                   <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">
//                     2025
//                   </th>
//                   <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">
//                     2024
//                   </th>
//                   <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">
//                     2022
//                   </th>
//                   <th className="py-4 px-4 font-bold text-base lg:text-lg">
//                     2021
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {[
//                   {
//                     branch: "Dermatology",
//                     emoji: "🩺",
//                     years: [4, 1, 2, 3],
//                     highlight: true,
//                   },
//                   { branch: "Radiology", emoji: "📷", years: [41, 45, 41, 36] },
//                   {
//                     branch: "Surgery",
//                     emoji: "🔪",
//                     years: [3, 2, 4, 11],
//                     highlight: true,
//                   },
//                   { branch: "Medicine", emoji: "🏥", years: [46, 46, 45, 43] },
//                   {
//                     branch: "ObGy",
//                     emoji: "👩‍⚕️",
//                     years: [3, 4, 1, 1],
//                     highlight: true,
//                   },
//                   {
//                     branch: "Pediatrics",
//                     emoji: "👶",
//                     years: [1, 2, 5, 2],
//                     highlight: true,
//                   },
//                   {
//                     branch: "Orthopedics",
//                     emoji: "🦴",
//                     years: [1, 0, 2, 2],
//                     highlight: true,
//                   },
//                 ].map((row, idx) => (
//                   <tr
//                     key={idx}
//                     className={`hover:bg-blue-50 transition-colors ${
//                       idx % 2 === 0 ? "bg-slate-50" : "bg-white"
//                     }`}
//                   >
//                     <td className="py-3 px-4 text-left font-semibold text-slate-800 border-r border-slate-200">
//                       <span className="mr-2">{row.emoji}</span>
//                       {row.branch}
//                     </td>
//                     {row.years.map((value, yearIdx) => (
//                       <td
//                         key={yearIdx}
//                         className={`py-3 px-4 font-bold border-r border-slate-200 last:border-r-0 ${
//                           row.highlight && value <= 5
//                             ? "text-blue-600 bg-blue-50"
//                             : value === 0
//                               ? "text-red-600 bg-red-50"
//                               : "text-slate-700"
//                         }`}
//                       >
//                         {value}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Insights Section */}
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
//               <div className="flex items-center space-x-2 mb-2">
//                 <span className="text-2xl">🏆</span>
//                 <h4 className="font-bold text-slate-800">Most Preferred</h4>
//               </div>
//               <p className="text-sm text-slate-600">
//                 Dermatology, Surgery, ObGy, Pediatrics & Orthopedics show
//                 highest preference among top rankers
//               </p>
//             </div>

//             <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
//               <div className="flex items-center space-x-2 mb-2">
//                 <span className="text-2xl">📈</span>
//                 <h4 className="font-bold text-slate-800">Stable Trends</h4>
//               </div>
//               <p className="text-sm text-slate-600">
//                 Medicine and Radiology maintain consistent selection numbers
//                 across all years
//               </p>
//             </div>

//             <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
//               <div className="flex items-center space-x-2 mb-2">
//                 <span className="text-2xl">💡</span>
//                 <h4 className="font-bold text-slate-800">Key Insight</h4>
//               </div>
//               <p className="text-sm text-slate-600">
//                 Higher rank holders prefer specialties with better lifestyle
//                 balance and private practice scope
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Cutoff Scores */}
//         <div className="text-center mb-6 lg:mb-8">
//           <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
//             📊 NEET PG 2025 Cutoff Scores
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="w-full text-center table-fixed border-collapse min-w-full">
//               <thead>
//                 <tr className="bg-slate-50">
//                   <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
//                     Category
//                   </th>
//                   <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
//                     Qualifying Percentile
//                   </th>
//                   <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
//                     Score Range (Out of 800)
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     Unreserved (UR) / EWS
//                   </td>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     50th percentile
//                   </td>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     275–320 marks
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     SC / ST / OBC
//                   </td>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     40th percentile
//                   </td>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     245–275 marks
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     UR-PwD
//                   </td>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     45th percentile
//                   </td>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     260–290 marks
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     SC/ST/OBC-PwD
//                   </td>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     40th percentile
//                   </td>
//                   <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                     245–275 marks
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Marks vs Rank */}
//         <div className="text-center mb-6 lg:mb-8">
//           <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
//             🏆 NEET PG 2025 Marks vs Rank Analysis
//           </h3>
//           <p className="text-slate-600 text-sm lg:text-base mb-4">
//             Here’s how your marks may correspond to your All India Rank and
//             admission prospects:
//           </p>
//           <div className="overflow-x-auto max-h-[450px] rounded-xl border border-slate-200 shadow-sm">
//             <table className="w-full text-center table-fixed border-collapse min-w-full">
//               <thead className="bg-slate-50 ">
//                 <tr>
//                   <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
//                     Score Range
//                   </th>
//                   <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
//                     All India Rank
//                   </th>
//                   <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
//                     Admission Prospects
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {[
//                   { score: "707", rank: "1", prospect: "Top AIIMS/PGI" },
//                   { score: "705", rank: "2–3", prospect: "Top AIIMS/PGI" },
//                   { score: "701", rank: "4", prospect: "Top Institutions" },
//                   { score: "695", rank: "5–6", prospect: "Premium Colleges" },
//                   {
//                     score: "690–678",
//                     rank: "12–28",
//                     prospect: "Excellent Options",
//                   },
//                   {
//                     score: "677–663",
//                     rank: "29–113",
//                     prospect: "Very Good Colleges",
//                   },
//                   { score: "638", rank: "551", prospect: "Good Government" },
//                   { score: "627", rank: "974", prospect: "Good Options" },
//                   { score: "620", rank: "1356", prospect: "Decent Choices" },
//                   { score: "600", rank: "3049", prospect: "Moderate Options" },
//                   {
//                     score: "591",
//                     rank: "4100",
//                     prospect: "Limited Government",
//                   },
//                   { score: "576", rank: "6278", prospect: "Private Options" },
//                   {
//                     score: "563",
//                     rank: "8628",
//                     prospect: "Competitive Private",
//                   },
//                   {
//                     score: "555–499",
//                     rank: "10,001–25,000",
//                     prospect: "Challenging",
//                   },
//                   {
//                     score: "499–427",
//                     rank: "25,001–50,000",
//                     prospect: "Very Challenging",
//                   },
//                   {
//                     score: "427–363",
//                     rank: "50,001–75,000",
//                     prospect: "Extremely Difficult",
//                   },
//                 ].map((row, idx) => (
//                   <tr key={idx} className="hover:bg-slate-50 transition">
//                     <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                       {row.score}
//                     </td>
//                     <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                       {row.rank}
//                     </td>
//                     <td className="border-b border-slate-200 py-2 px-3 text-slate-800">
//                       {row.prospect}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* NEET PG 2025 Counselling Timeline */}
//       <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//         <div className="text-center mb-6 lg:mb-8">
//           <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//             NEET PG 2025 Counselling Timeline
//           </h2>
//           <p className="text-slate-600 text-sm lg:text-base">
//             Important dates and events for NEET PG 2025 counselling process
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//               <Calendar className="w-8 h-8 text-white" />
//             </div>
//             <div className="bg-blue-50 rounded-xl p-4">
//               <div className="text-sm text-blue-600 font-medium mb-1">
//                 Registration
//               </div>
//               <div className="text-lg font-bold text-slate-800 mb-1">
//                 Started
//               </div>
//               <div className="text-sm text-slate-600">MCC Portal Open</div>
//             </div>
//           </div>

//           <div className="text-center">
//             <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//               <CheckCircle className="w-8 h-8 text-white" />
//             </div>
//             <div className="bg-blue-50 rounded-xl p-4">
//               <div className="text-sm text-blue-600 font-medium mb-1">
//                 Round 1
//               </div>
//               <div className="text-lg font-bold text-slate-800 mb-1">
//                 Coming Soon
//               </div>
//               <div className="text-sm text-slate-600">Choice Filling</div>
//             </div>
//           </div>

//           <div className="text-center">
//             <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//               <Award className="w-8 h-8 text-white" />
//             </div>
//             <div className="bg-purple-50 rounded-xl p-4">
//               <div className="text-sm text-purple-600 font-medium mb-1">
//                 Seat Allotment
//               </div>
//               <div className="text-lg font-bold text-slate-800 mb-1">
//                 Round 1
//               </div>
//               <div className="text-sm text-slate-600">Result Declaration</div>
//             </div>
//           </div>

//           <div className="text-center">
//             <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//               <Users className="w-8 h-8 text-white" />
//             </div>
//             <div className="bg-blue-50 rounded-xl p-4">
//               <div className="text-sm text-blue-600 font-medium mb-1">
//                 Joining
//               </div>
//               <div className="text-lg font-bold text-slate-800 mb-1">
//                 Round 1
//               </div>
//               <div className="text-sm text-slate-600">Documentation</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* NEET PG 2025 Results Statistics - Mobile Optimized */}
//       {/* <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               🎉 NEET PG 2025 Results Announced!
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               NEET PG 2025 results have been declared! Check your scorecard and start your counselling registration. The cutoff scores for different categories have been updated.
//             </p>
//           </div>

//           <div className="text-center mb-6 lg:mb-8">
//             <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
//               NEET PG 2025 Cutoff Scores
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse min-w-full">
//                 <thead>
//                   <tr>
//                     <th className="border-b border-slate-200 py-2 text-slate-600 text-sm lg:text-base">Category</th>
//                     <th className="border-b border-slate-200 py-2 text-slate-600 text-sm lg:text-base">Qualifying Percentile</th>
//                     <th className="border-b border-slate-200 py-2 text-slate-600 text-sm lg:text-base">Score Range (Out of 800)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">Unreserved (UR) / EWS</td>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">50th percentile</td>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">275–320 marks</td>
//                   </tr>
//                   <tr>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">SC / ST / OBC</td>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">40th percentile</td>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">245–275 marks</td>
//                   </tr>
//                   <tr>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">UR-PwD</td>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">45th percentile</td>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">260–290 marks</td>
//                   </tr>
//                   <tr>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">SC/ST/OBC-PwD</td>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">40th percentile</td>
//                     <td className="border-b border-slate-200 py-2 text-slate-800 text-sm lg:text-base">245–275 marks</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div> */}
//       <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//         {/* Heading */}
//         {/* <div className="text-center mb-6 lg:mb-8">
//     <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//       🎉 NEET PG 2025 Results Announced!
//     </h2>
//     <p className="text-slate-600 text-sm lg:text-base">
//       NEET PG 2025 results have been declared! Check your scorecard and start your counselling registration. 
//       The cutoff scores for different categories and rank-wise admission prospects are updated below.
//     </p>
//   </div> */}

//         {/* Cutoff Scores */}
//         {/* <div className="text-center mb-6 lg:mb-8">
//     <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
//       📊 NEET PG 2025 Cutoff Scores
//     </h3>
//     <div className="overflow-x-auto">
//       <table className="w-full text-left border-collapse min-w-full">
//         <thead>
//           <tr className="bg-slate-50">
//             <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Category</th>
//             <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Qualifying Percentile</th>
//             <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Score Range (Out of 800)</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">Unreserved (UR) / EWS</td>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">50th percentile</td>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">275–320 marks</td>
//           </tr>
//           <tr>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">SC / ST / OBC</td>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">40th percentile</td>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">245–275 marks</td>
//           </tr>
//           <tr>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">UR-PwD</td>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">45th percentile</td>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">260–290 marks</td>
//           </tr>
//           <tr>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">SC/ST/OBC-PwD</td>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">40th percentile</td>
//             <td className="border-b border-slate-200 py-2 px-3 text-slate-800">245–275 marks</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </div> */}

//         {/* Marks vs Rank */}
//         {/* <div className="text-center">
//     <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
//       🏆 NEET PG 2025 Marks vs Rank Analysis
//     </h3>
//     <p className="text-slate-600 text-sm lg:text-base mb-4">
//       Here’s how your marks may correspond to your All India Rank and admission prospects:
//     </p>
//     <div className="overflow-x-auto max-h-[450px] rounded-xl border border-slate-200 shadow-sm">
//       <table className="w-full text-left border-collapse min-w-full">
//         <thead className="bg-slate-50 sticky top-0 z-10">
//           <tr>
//             <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Score Range</th>
//             <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">All India Rank</th>
//             <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Admission Prospects</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[
//             { score: "707", rank: "1", prospect: "Top AIIMS/PGI" },
//             { score: "705", rank: "2–3", prospect: "Top AIIMS/PGI" },
//             { score: "701", rank: "4", prospect: "Top Institutions" },
//             { score: "695", rank: "5–6", prospect: "Premium Colleges" },
//             { score: "690–678", rank: "12–28", prospect: "Excellent Options" },
//             { score: "677–663", rank: "29–113", prospect: "Very Good Colleges" },
//             { score: "638", rank: "551", prospect: "Good Government" },
//             { score: "627", rank: "974", prospect: "Good Options" },
//             { score: "620", rank: "1356", prospect: "Decent Choices" },
//             { score: "600", rank: "3049", prospect: "Moderate Options" },
//             { score: "591", rank: "4100", prospect: "Limited Government" },
//             { score: "576", rank: "6278", prospect: "Private Options" },
//             { score: "563", rank: "8628", prospect: "Competitive Private" },
//             { score: "555–499", rank: "10,001–25,000", prospect: "Challenging" },
//             { score: "499–427", rank: "25,001–50,000", prospect: "Very Challenging" },
//             { score: "427–363", rank: "50,001–75,000", prospect: "Extremely Difficult" },
//           ].map((row, idx) => (
//             <tr key={idx} className="hover:bg-slate-50 transition">
//               <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{row.score}</td>
//               <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{row.rank}</td>
//               <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{row.prospect}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div> */}

//         {/* NEET PG 2025 Important Information */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
//             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
//               <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
//                 How to Check NEET PG 2025 Results?
//               </h3>
//               <p className="text-slate-600 text-sm lg:text-base">
//                 Follow these steps to check your NEET PG 2025 results and
//                 download your scorecard.
//               </p>
//             </div>
//           </div>

//           <div className="space-y-3 lg:space-y-4">
//             {[
//               "Visit the official NBE website – https://nbe.edu.in/",
//               "Click on 'NEET PG 2025 Results' link",
//               "Enter your NEET PG 2025 Application Number and Password",
//               "Click on 'Submit' button",
//               "Your NEET PG 2025 scorecard will be displayed",
//               "Download and print the scorecard for counselling registration",
//             ].map((step, index) => (
//               <div key={index} className="flex items-start space-x-3">
//                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                   {index + 1}
//                 </div>
//                 <div>
//                   <p className="text-slate-700 text-sm lg:text-base">{step}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* NEET PG 2025 Specialties Information */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
//             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
//               <Target className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
//             </div>
//             <div>
//               <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
//                 Popular NEET PG 2025 Specialties
//               </h3>
//               <p className="text-slate-600 text-sm lg:text-base">
//                 Top specialties with highest demand and career opportunities.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               {
//                 name: "General Medicine",
//                 seats: "2,847",
//                 demand: "Very High",
//                 icon: "🏥",
//               },
//               {
//                 name: "Pediatrics",
//                 seats: "1,234",
//                 demand: "High",
//                 icon: "👶",
//               },
//               {
//                 name: "Obstetrics & Gynecology",
//                 seats: "1,156",
//                 demand: "High",
//                 icon: "👩‍⚕️",
//               },
//               { name: "Orthopedics", seats: "987", demand: "High", icon: "🦴" },
//               {
//                 name: "Dermatology",
//                 seats: "456",
//                 demand: "Very High",
//                 icon: "🩺",
//               },
//               {
//                 name: "Psychiatry",
//                 seats: "678",
//                 demand: "Medium",
//                 icon: "🧠",
//               },
//               { name: "Radiology", seats: "789", demand: "High", icon: "📷" },
//               {
//                 name: "Anesthesiology",
//                 seats: "1,023",
//                 demand: "High",
//                 icon: "💉",
//               },
//               { name: "Pathology", seats: "567", demand: "Medium", icon: "🔬" },
//             ].map((specialty, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="flex items-center space-x-3 mb-3">
//                   <span className="text-2xl">{specialty.icon}</span>
//                   <div>
//                     <h4 className="font-bold text-slate-800">
//                       {specialty.name}
//                     </h4>
//                     <p className="text-sm text-slate-600">
//                       {specialty.seats} seats
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       specialty.demand === "Very High"
//                         ? "bg-red-100 text-red-700"
//                         : specialty.demand === "High"
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     {specialty.demand} Demand
//                   </span>
//                   {/* <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
//                     View Details →
//                   </button> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* NEET PG 2025 Counselling Tips */}
//         {/* <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
//             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
//               <HelpCircle className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
//                 NEET PG 2025 Counselling Tips
//               </h3>
//               <p className="text-slate-600 text-sm lg:text-base">
//                 Essential tips to maximize your chances of getting your preferred specialty and college.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <h4 className="font-bold text-slate-800 text-lg">Choice Filling Strategy</h4>
//               <div className="space-y-3">
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">1</div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">Research thoroughly</p>
//                     <p className="text-slate-600 text-xs">Check college reputation, faculty, and infrastructure</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">2</div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">Consider location</p>
//                     <p className="text-slate-600 text-xs">Think about living expenses and family proximity</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">3</div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">Check fee structure</p>
//                     <p className="text-slate-600 text-xs">Compare fees, stipend, and bond requirements</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h4 className="font-bold text-slate-800 text-lg">Important Documents</h4>
//               <div className="space-y-3">
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">1</div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">NEET PG Scorecard</p>
//                     <p className="text-slate-600 text-xs">Original and photocopies</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">2</div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">MBBS Degree Certificate</p>
//                     <p className="text-slate-600 text-xs">Provisional or final degree</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">3</div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">Category Certificate</p>
//                     <p className="text-slate-600 text-xs">If applicable (SC/ST/OBC/EWS)</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}

//         {/* NEET PG Counselling Process */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
//             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
//               <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
//                 NEET PG 2025 Counselling Process
//               </h3>
//               <p className="text-slate-600 text-sm lg:text-base">
//                 Complete step-by-step guide for NEET PG 2025 counselling
//                 registration and process.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <h4 className="font-bold text-slate-800">Registration Phase</h4>
//               <div className="space-y-3">
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                     1
//                   </div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">
//                       Register on MCC Portal
//                     </p>
//                     <p className="text-slate-600 text-xs">
//                       Create account with NEET PG credentials
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                     2
//                   </div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">
//                       Pay Registration Fee
//                     </p>
//                     <p className="text-slate-600 text-xs">
//                       Pay Rs. 5000 for AIQ and Rs. 2000 for Deemed Universities
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                     3
//                   </div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">
//                       Upload Documents
//                     </p>
//                     <p className="text-slate-600 text-xs">
//                       Upload all required certificates and documents
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h4 className="font-bold text-slate-800">
//                 Choice Filling & Allotment
//               </h4>
//               <div className="space-y-3">
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                     4
//                   </div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">
//                       Fill Choices
//                     </p>
//                     <p className="text-slate-600 text-xs">
//                       Select colleges and specialties in order of preference
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                     5
//                   </div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">
//                       Seat Allotment
//                     </p>
//                     <p className="text-slate-600 text-xs">
//                       MCC will allot seats based on rank and choices
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                     6
//                   </div>
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">
//                       Report to College
//                     </p>
//                     <p className="text-slate-600 text-xs">
//                       Complete admission formalities at allotted college
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Commented out UG content for PG focus */}
//         {/* 
//         <div>
//           <NeetComparison />
//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//             <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
//               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
//                   How to Check NEET Result 2025?
//                 </h3>
//                 <p className="text-slate-600 text-sm lg:text-base">
//                   Candidates have to check their NEET 2025 result and download
//                   the scorecards in online mode by following the steps given
//                   below.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         */}

//         {/* NEET PG Counselling Timeline - Mobile Optimized */}
//         {/* <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 border border-white/20 mb-8 lg:mb-12">
//           <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-6 lg:mb-8 text-center">
//             NEET PG 2025 Counselling Timeline
//           </h3>

//           <div className="relative"> */}
//         {/* Mobile Timeline */}
//         {/* <div className="xl:hidden space-y-6">
//               {[
//                 {
//                   date: "AUG 19 2025",
//                   title: "Results Announced",
//                   subtitle: "NEET PG 2025 Results",
//                   status: "completed"
//                 },
//                 {
//                   date: "SEP 2 2025",
//                   title: "Counselling Registration",
//                   subtitle: "MCC Portal Opens",
//                   status: "current"
//                 },
//                 {
//                   date: "SEP 5 2025",
//                   title: "Choice Filling",
//                   subtitle: "Round 1 Starts",
//                   status: "pending"
//                 },
//                 {
//                   date: "SEP 15 2025",
//                   title: "Seat Allotment",
//                   subtitle: "Round 1 Results",
//                   status: "pending"
//                 }
//               ].map((step, index) => (
//                 <div key={index} className="flex items-start space-x-4">
//                   <div
//                     className={`w-6 h-6 rounded-full flex-shrink-0 ${
//                       step.status === "completed"
//                         ? "bg-blue-400"
//                         : step.status === "current"
//                         ? "bg-blue-500 animate-pulse"
//                         : "bg-slate-300"
//                     }`}
//                   ></div>
//                   <div className="bg-slate-50 rounded-xl p-4 flex-1">
//                     <div className="text-sm text-blue-600 font-medium mb-1">
//                       {step.date}
//                     </div>
//                     <div className="text-base font-bold text-slate-800 mb-1">
//                       {step.title}
//                     </div>
//                     <div className="text-sm text-slate-600">
//                       {step.subtitle}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div> */}

//         {/* Desktop Timeline */}
//         {/* <div className="hidden xl:flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
//               {[
//                 {
//                   date: "AUG 19 2025",
//                   title: "Results Announced",
//                   subtitle: "NEET PG 2025 Results",
//                   status: "completed"
//                 },
//                 {
//                   date: "SEP 2 2025",
//                   title: "Counselling Registration",
//                   subtitle: "MCC Portal Opens",
//                   status: "current"
//                 },
//                 {
//                   date: "SEP 5 2025",
//                   title: "Choice Filling",
//                   subtitle: "Round 1 Starts",
//                   status: "pending"
//                 },
//                 {
//                   date: "SEP 15 2025",
//                   title: "Seat Allotment",
//                   subtitle: "Round 1 Results",
//                   status: "pending"
//                 }
//               ].map((step, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center text-center flex-1"
//                 >
//                   <div
//                     className={`w-6 h-6 rounded-full mb-4 ${
//                       step.status === "completed"
//                         ? "bg-blue-400"
//                         : step.status === "current"
//                         ? "bg-blue-500 animate-pulse"
//                         : "bg-slate-300"
//                     }`}
//                   ></div>
//                   <div className="bg-slate-50 rounded-xl p-4 w-full max-w-xs">
//                     <div className="text-sm text-blue-600 font-medium mb-1">
//                       {step.date}
//                     </div>
//                     <div className="text-lg font-bold text-slate-800 mb-1">
//                       {step.title}
//                     </div>
//                     <div className="text-sm text-slate-600">
//                       {step.subtitle}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="hidden md:block absolute top-3 left-0 right-0 h-0.5 bg-slate-200">
//               <div className="h-full bg-blue-400 w-1/4"></div>
//             </div>
//           </div>
//         </div> */}

//         {/* Data Table Section */}
//         {/* <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//             <div>
//               <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//                 TOP NEET PG 2025 Data
//               </h2>
//               <p className="text-slate-600 text-sm lg:text-base">
//                 View detailed information for {currentStateTab.replace('-', ' ').toUpperCase()}
//               </p>
//             </div> */}

//         {/* Table Type Selector */}
//         {/* <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
//               {[
//                 { id: "allotments", label: "Allotments", icon: "📊" },
//                 { id: "closing-ranks", label: "Closing Ranks", icon: "📈" },
//                 { id: "seat-matrix", label: "Seat Matrix", icon: "🏥" },
//                 { id: "fee-stipend-bond", label: "Fee & Stipend", icon: "💰" },
//               ].map((type) => (
//                 <button
//                   key={type.id}
//                   onClick={() => handleTableTypeChange(type.id)}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                     tableType === type.id
//                       ? "bg-blue-500 text-white shadow-lg"
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                   }`}
//                 >
//                   <span className="mr-2">{type.icon}</span>
//                   {type.label}
//                 </button>
//               ))}
//             </div>
//           </div> */}

//         {/* Data Table */}
//         {/* <DataTable
//             data={tableData}
//             columns={getTableColumns(tableType)}
//             title={`${tableType.replace('-', ' ').toUpperCase()} - ${currentStateTab.replace('-', ' ').toUpperCase()}`}
//             subtitle={`Showing data for ${currentStateTab.replace('-', ' ').toUpperCase()}`}
//             searchPlaceholder={`Search ${tableType.replace('-', ' ')}...`}
//             loading={loading}
//           />
//         </div> */}

//         {/* NEET PG Career Guidance CTA - Mobile Optimized */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center text-white shadow-2xl">
//           <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">
//             Ready for{" "}
//             <span className="text-blue-300">Specialty Selection?</span> Get
//             Expert Guidance!
//           </h3>
//           <p className="text-blue-100 mb-4 lg:mb-6 text-sm lg:text-lg">
//             Choose the right specialty with our expert guidance. Get
//             personalized advice for your NEET PG counselling journey.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               onClick={() => window.AiSensy?.open()}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-gradient-to-r from-blue-400 to-indigo-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold text-base lg:text-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
//             >
//               Get Specialty Guidance
//             </a>
//             {/* <a
//               href="/pg-predictor"
//               className="bg-gradient-to-r from-purple-400 to-violet-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold text-base lg:text-lg hover:from-purple-500 hover:to-violet-500 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
//             >
//               Try Specialty Predictor
//             </a> */}
//           </div>
//         </div>
//       </div>

//       {/* Quota Modal */}
//       <QuotaModal
//         isOpen={showQuotaModal}
//         onClose={() => setShowQuotaModal(false)}
//       />

//       {/* PG Results Modal */}
//       {/* <PGResultsModal isOpen={showPGResultsModal} onClose={() => setShowPGResultsModal(false)} /> */}
//     </div>
//   );
// };

// export default MainContent;

import React, { useEffect, useState } from "react";
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
import DataTable from "./DataTable";
import { dataService } from "../services/dataService";

// ── NEW IMPORTS (year modal + 2025 pages) ──────────────────────────────────
import YearSelectionModal from "../latest2025data/YearSelectionModal";
import Allotments2025Page from "../latest2025data/Allotments2025Page";
import ClosingRanks2025Page from "../latest2025data/ClosingRanks2025Page";
import SeatMatrix2025Page from "../latest2025data/SeatMatrix2025Page";
import FeesStipendBond2025Page from "../latest2025data/FeesStipendBond2025Page";
import SeatCards from "./SeatCards";
import CollegePredictor from "./CollegePredictor";
// ───────────────────────────────────────────────────────────────────────────

interface MainContentProps {
  activeTab: string;
  dashboardData?: {
    neetStats: any[];
    timeline: any[];
    choiceLists: any[];
  };
}

const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  dashboardData,
}) => {
  // ── existing state ──────────────────────────────────────────────────────
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [currentStateTab, setCurrentStateTab] = useState("all-india-pg");
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableType, setTableType] = useState<string>("allotments");
  const [loading, setLoading] = useState(false);

  // ── NEW STATE: year-selection popup ────────────────────────────────────
  const [yearModal, setYearModal] = useState<{
    open: boolean;
    cardId: string;
    cardTitle: string;
  }>({ open: false, cardId: "", cardTitle: "" });

  const openYearModal = (cardId: string, cardTitle: string) => {
    setYearModal({ open: true, cardId, cardTitle });
  };

  /**
   * Called when user picks a year inside the popup.
   * - "2025" → show the matching 2025 Coming Soon page inline
   * - "2024" → navigate to the existing route as before
   */
  const handleYearSelect = (year: "2025" | "2024", cardId: string) => {
    // close the modal first
    setYearModal({ open: false, cardId: "", cardTitle: "" });

    if (year === "2025") {
  if (cardId === "allotments")        window.location.href = "/allotments2025";
  if (cardId === "closing-ranks")     window.location.href = "/closingranks2025";
  if (cardId === "seat-matrix")       window.location.href = "/seatmatrix2025";
  if (cardId === "fees-stipend-bond") window.location.href = "/feesstipendbond2025";
  return;
}

    // year === "2024" → go to existing pages
    if (cardId === "allotments")         window.location.href = "/allotments";
    if (cardId === "closing-ranks")      window.location.href = "/Closingranks";
    if (cardId === "seat-matrix")        window.location.href = "/seat-matrix";
    if (cardId === "fees-stipend-bond")  window.location.href = "/feesstipendbond";
  };

  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [
  "https://cdn.dribbble.com/userupload/47072483/file/4e241bcd05ff431236aefe3ca32de0b5.png",
  // "https://cdn.dribbble.com/userupload/47072484/file/c4f9d53a79f4fe3a59f611bd51d832d0.png",
];

useEffect(() => {
  const t = setInterval(() => setBgIndex(i => (i + 1) % bgImages.length), 4500);
  return () => clearInterval(t);
}, []);
  // ───────────────────────────────────────────────────────────────────────

  const actionButtons = [
    {
      id: "website",
      label: "Website",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => {
        window.open("https://mcc.nic.in/pg-medical-counselling/", "_blank");
      },
    },
    {
      id: "registration",
      label: "Registration",
      icon: BarChart3,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
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
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => {
        window.open(
          "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2024/11/2024110615.pdf",
          "_blank"
        );
      },
    },
    {
      id: "notice",
      label: "Notice",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => {
        window.location.href = "/notice";
      },
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: BarChart3,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => {
        window.location.href = "/schedule";
      },
    },
  ];

  // ── DATA CARDS — onClick now opens year modal ───────────────────────────
  const dataCards = [
    {
      id: "allotments",
      title: "Allotments",
      subtitle: "",
      icon: Users,
      color: "bg-purple-500",
      navLink: "/allotments",
    },
    {
      id: "closing-ranks",
      title: "Closing Ranks",
      subtitle: "",
      icon: TrendingUp,
      color: "bg-blue-500",
      navLink: "/Closingranks",
    },
    {
      id: "seat-matrix",
      title: "Seat Matrix",
      subtitle: "",
      icon: BarChart3,
      color: "bg-indigo-500",
      navLink: "/seat-matrix",
    },
    {
      id: "fees-stipend-bond",
      title: "Fee, Stipend & Bond",
      subtitle: "",
      icon: Award,
      color: "bg-purple-600",
      navLink: "/feesstipendbond",
    },
  ];
  // ───────────────────────────────────────────────────────────────────────

  const neetStats = dashboardData?.neetStats || [
    { label: "Registered", value: "2,42,493", year: "2025" },
    { label: "Appeared",   value: "2,30,114", year: "2025" },
    { label: "Qualified",  value: "1,28,116", year: "2025" },
    { label: "Registered", value: "2,28,540", year: "2024" },
    { label: "Appeared",   value: "2,16,136", year: "2024" },
    { label: "Qualified",  value: "1,28,532", year: "2024" },
  ];

  const timelineSteps = dashboardData?.timeline || [
    { date: "NOV 20 2025", title: "Round 1 Seat Allotment", subtitle: "Result Declared", status: "Completed" },
    { date: "DEC 2025",    title: "Round 2 Counselling",    subtitle: "Completed",        status: "Completed" },
    { date: "FEB 5 2026",  title: "Round 3 Final Result",   subtitle: "Declared",         status: "Completed" },
    { date: "FEB 21 2026", title: "Stray Round Result",     subtitle: "Declared",        status: "Completed" },
  ];

  const handleStateTabChange = (tabId: string) => {
    setCurrentStateTab(tabId);
    fetchData(tabId, tableType);
  };

  const fetchData = async (category: string, type: string) => {
    setLoading(true);
    try {
      let data;
      switch (type) {
        case "allotments":        data = await dataService.getCategoryAllotments(category); break;
        case "closing-ranks":     data = await dataService.getCategoryClosingRanks(category); break;
        case "seat-matrix":       data = await dataService.getCategorySeatMatrix(category); break;
        case "fee-stipend-bond":  data = await dataService.getCategoryFeeStipendBond(category); break;
        default:                  data = await dataService.getCategoryAllotments(category);
      }
      let dataArray = [];
      if (Array.isArray(data)) dataArray = data;
      else if (data && typeof data === "object" && Array.isArray(data.data)) dataArray = data.data;
      else if (data && typeof data === "object" && data.data) dataArray = [data.data];
      setTableData(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTableTypeChange = (type: string) => {
    setTableType(type);
    fetchData(currentStateTab, type);
  };

  React.useEffect(() => {
    fetchData(currentStateTab, tableType);
  }, []);

  const getTableColumns = (type: string) => {
    switch (type) {
      case "allotments":
        return [
          { key: "college",   label: "College Name",   sortable: true },
          { key: "specialty", label: "Specialty",       sortable: true },
          { key: "category",  label: "Category",        sortable: true },
          { key: "quota",     label: "Quota",           sortable: true },
          { key: "round",     label: "Round",           sortable: true },
          { key: "rank",      label: "Closing Rank",    sortable: true },
        ];
      case "closing-ranks":
        return [
          { key: "college",       label: "College Name",   sortable: true },
          { key: "specialty",     label: "Specialty",      sortable: true },
          { key: "category",      label: "Category",       sortable: true },
          { key: "opening_rank",  label: "Opening Rank",   sortable: true },
          { key: "closing_rank",  label: "Closing Rank",   sortable: true },
          { key: "year",          label: "Year",           sortable: true },
        ];
      case "seat-matrix":
        return [
          { key: "college",           label: "College Name",      sortable: true },
          { key: "specialty",         label: "Specialty",          sortable: true },
          { key: "total_seats",       label: "Total Seats",        sortable: true },
          { key: "aiq_seats",         label: "AIQ Seats",          sortable: true },
          { key: "state_seats",       label: "State Seats",        sortable: true },
          { key: "management_seats",  label: "Management Seats",   sortable: true },
        ];
      case "fee-stipend-bond":
        return [
          { key: "college",     label: "College Name",    sortable: true },
          { key: "specialty",   label: "Specialty",       sortable: true },
          { key: "fee",         label: "Fee (₹)",         sortable: true },
          { key: "stipend",     label: "Stipend (₹)",     sortable: true },
          { key: "bond",        label: "Bond Period",     sortable: true },
          { key: "bond_amount", label: "Bond Amount (₹)", sortable: true },
        ];
      default:
        return [
          { key: "college",   label: "College Name", sortable: true },
          { key: "specialty", label: "Specialty",    sortable: true },
          { key: "category",  label: "Category",     sortable: true },
        ];
    }
  };

  
  // ───────────────────────────────────────────────────────────────────────

  return (
    <div className="w-full bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">

      {/* ── YEAR SELECTION MODAL — renders on top of everything ────────── */}
      <YearSelectionModal
        isOpen={yearModal.open}
        onClose={() => setYearModal({ open: false, cardId: "", cardTitle: "" })}
        onSelectYear={handleYearSelect}
        cardId={yearModal.cardId}
        cardTitle={yearModal.cardTitle}
      />
      {/* ────────────────────────────────────────────────────────────────── */}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-300 to-blue-700 px-4 lg:px-6 py-6 lg:pb-20 lg:pb-24 relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-black/5"></div>
        {/* <div className="relative overflow-hidden rounded-2xl px-4 lg:px-6 pb-24 lg:pb-32 min-h-[280px] lg:min-h-[460px] flex flex-col justify-end">
          <div className="absolute inset-0 bg-cover transition-opacity duration-[1200ms]" style={{ backgroundImage: `url(${bgImages[0]})`,backgroundPosition: "center 20%", }} /> */}
          {/* <div className="absolute inset-0 bg-cover transition-opacity duration-[1200ms]" style={{ backgroundImage: `url(${bgImages[1]})`, backgroundPosition: "center 30%", opacity: bgIndex === 1 ? 1 : 0 }} /> */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
          <div className="relative max-w-7xl mx-auto w-full">
          {/* Mobile */}
          <div className="xl:hidden text-center">
            
            <h1 className="text-xl font-bold text-white mb-4 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.7)]">
              Check Your Results &amp; Start Counselling
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

          {/* Desktop */}
          <div className="hidden xl:block text-center">
            <div className="inline-flex items-center space-x-3 mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white [text-shadow:_1px_1px_2px_rgba(0,0,0,0.7)]">
                Check Your Results &amp; Start Your Counselling Journey Today!
              </h1>
              
            </div>
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

        {/* ── DATA CARDS ─────────────────────────────────────────────────── */}
        {/*
          CHANGE from original:
          onClick now calls openYearModal(card.id, card.title)
          instead of window.location.href = card.navLink
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
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
              <p className="text-xs lg:text-sm text-slate-600">{card.subtitle}</p>
              {/* small "2025 NEW" badge to hint there's new data */}
              <div className="flex items-center gap-1 mt-2">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">
                  2024 & 2025
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
        {/* ────────────────────────────────────────────────────────────────── */}
          <SeatCards />

           <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
           {/* ── COLLEGE PREDICTOR ENTRY CARD ── */}
        <div
          className="mb-8 lg:mb-12 rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => window.location.href = "/predictor"}
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #1e40af 40%, #1447e6 70%,#51a2ff 100%)",
            
            position: "relative",
          }}
        >
          {/* grid dots */}
          <div style={{
            position:"absolute",inset:0,pointerEvents:"none",
            backgroundImage:"radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",
            backgroundSize:"28px 28px",
          }}/>
          {/* blobs */}
          <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",background:"rgba(139,92,246,.25)",filter:"blur(60px)"}}/>
          <div style={{position:"absolute",bottom:-40,left:"30%",width:160,height:160,borderRadius:"50%",background:"rgba(99,102,241,.2)",filter:"blur(50px)"}}/>
 
          <div style={{ position:"relative", padding:"32px 36px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
            {/* Left */}
            <div style={{ flex:1, minWidth:240 }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:7,
                background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)",
                border:"1px solid rgba(255,255,255,.2)",
                borderRadius:999, padding:"4px 14px", marginBottom:14,
                color:"#c7d2fe", fontSize:12, fontWeight:700,
              }}>
                NEET PG 2025 — Live Data
                <span style={{background:"#10b981",color:"#fff",borderRadius:999,padding:"1px 7px",fontSize:10,fontWeight:800}}>NEW</span>
              </div>
              <h2 style={{
                margin:"0 0 10px", fontSize:"clamp(20px,3vw,30px)", fontWeight:900,
                color:"#fff", lineHeight:1.2,
                fontFamily:"'DM Sans','Nunito',sans-serif",
                textShadow:"0 2px 12px rgba(0,0,0,.3)",
              }}>
                Predict Your <span style={{color:"#f5c506"}}>Dream College</span><br/>
                With Your NEET PG Rank
              </h2>
              <p style={{margin:"0 0 20px",color:"#c7d2fe",fontSize:14,lineHeight:1.6,maxWidth:480}}>
                Instantly see which colleges &amp; specialties you qualify for —
                based on 28,000+ real 2025 allotment &amp; closing rank records.
              </p>
              {/* stats */}
              <div style={{display:"flex",gap:22,flexWrap:"wrap"}}>
                {[["4,200+","Allotments"],["14,500+","Closing Ranks"],["500+","Colleges"],["90+","Specialties"]].map(([v,l])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontSize:18,fontWeight:900,color:"#fff"}}>{v}</div>
                    <div style={{fontSize:11,color:"#a5b4fc",fontWeight:600}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Right CTA */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
              <div
                style={{
                  // background:"linear-gradient(135deg, #60a5fa, #3b82f6)",
                  background:"white",
                  color:"#004391", border:"none", borderRadius:16,
                  padding:"12px 30px", fontSize:21, fontWeight:800,
                  boxShadow:"0 8px 28px rgba(31, 157, 241, 0.45)",
                  display:"flex", alignItems:"center", gap:10,
                  transition:"transform .2s",
                  whiteSpace:"nowrap",
                }}
                className="group-hover:scale-105"
              >
                Open Predictor
                <span style={{fontSize:20}}>→</span>
              </div>
              <span style={{color:"#ececec",fontSize:12}}>Free · Instant Results</span>
 
              {/* Mode chips */}
              <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
                {["Closing Ranks","Past Allotments","Seat Matrix"].map(l=>(
                  <span key={l} style={{
                    background:"rgba(255,255,255,.12)", color:"#c7d2fe",
                    borderRadius:999, padding:"4px 12px", fontSize:11, fontWeight:700,
                    border:"1px solid rgba(255,255,255,.15)",
                  }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Trend Comparison Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
        
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-800 to-blue-600 text-transparent bg-clip-text">
              Trend Comparison: Top 100 Ranks Branch Preferences
            </h2>
            <p className="text-slate-800 text-sm lg:text-base max-w-2xl mx-auto border border-slate-200 rounded-full p-3 shadow-sm">
              Branch preferences by first 100 rank holders in All India
              Counselling (2021-2025)
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-center border-collapse min-w-full">
              <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <tr>
                  <th className="py-4 px-4 text-left font-bold text-base lg:text-lg border-r border-slate-600">Branch/Specialty</th>
                  <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">2025</th>
                  <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">2024</th>
                  <th className="py-4 px-4 font-bold text-base lg:text-lg border-r border-slate-600">2022</th>
                  <th className="py-4 px-4 font-bold text-base lg:text-lg">2021</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {
                
                [
  { branch: "Radiology",   years: [38, 40, 39, 36] },
  { branch: "Medicine",    years: [34, 32, 35, 33] },
  { branch: "Dermatology", years: [8, 7, 6, 7],   highlight: true },
  { branch: "Pediatrics",  years: [6, 5, 5, 4],   highlight: true },
  { branch: "ObGy",        years: [5, 6, 4, 5],   highlight: true },
  { branch: "Surgery",     years: [5, 5, 6, 8] },
  { branch: "Orthopedics", emoji: "🦴", years: [4, 3, 3, 4] },
].map((row, idx) => (
                  <tr key={idx} className={`hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <td className="py-3 px-4 text-left font-semibold text-slate-800 border-r border-slate-200">
                      <span className="mr-2">{row.emoji}</span>{row.branch}
                    </td>
                    {row.years.map((value, yearIdx) => (
                      <td key={yearIdx} className={`py-3 px-4 font-bold border-r border-slate-200 last:border-r-0 ${row.highlight && value <= 5 ? "text-blue-600 bg-blue-50" : value === 0 ? "text-red-600 bg-red-50" : "text-slate-700"}`}>
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
              <div className="flex items-center space-x-2 mb-2"><span className="text-2xl"></span><h4 className="font-bold text-slate-800">Most Preferred</h4></div>
              <p className="text-sm text-slate-600">Radiology and General Medicine dominate &amp; Top 100 ranks consistently</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2"><span className="text-2xl"></span><h4 className="font-bold text-slate-800">Stable Trends</h4></div>
              <p className="text-sm text-slate-600">Radiology and Medicine remain the most stable and highest chosen branches across all years</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2"><span className="text-2xl"></span><h4 className="font-bold text-slate-800">Key Insight</h4></div>
              <p className="text-sm text-slate-600">Top rankers increasingly prefer lifestyle-friendly and high ROI branches like Radiology and Dermatology over traditionally demanding surgical fields</p>
            </div>
          </div>
        </div>

        {/* Cutoff Scores */}
        {/* <div className="text-center mb-6 lg:mb-8">
          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">📊 NEET PG 2025 Cutoff Scores</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center table-fixed border-collapse min-w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Category</th>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Qualifying Percentile</th>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Score Range (Out of 800)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Unreserved (UR) / EWS", "50th percentile", "275–320 marks"],
                  ["SC / ST / OBC",          "40th percentile", "245–275 marks"],
                  ["UR-PwD",                 "45th percentile", "260–290 marks"],
                  ["SC/ST/OBC-PwD",          "40th percentile", "245–275 marks"],
                ].map(([cat, pct, range], i) => (
                  <tr key={i}>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{cat}</td>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{pct}</td>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* Cutoff Scores */}
<div className="text-center mb-6 lg:mb-8">
  <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-800 to-blue-400 text-transparent bg-clip-text">
    NEET PG 2025 Cutoff Scores
  </h3>

  <p className="text-slate-600 text-sm mb-4 bg-blue-500 inline-block px-3 py-1 rounded-full text-white">
    Cutoffs are based on percentile and vary each year depending on exam difficulty and normalization.
  </p>

  <div className="overflow-x-auto">
    <table className="w-full text-center table-fixed border-collapse min-w-full bg-blue-100 rounded-xl shadow-sm">
      <thead>
        <tr className="bg-slate-50">
          <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
            Category
          </th>
          <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
            Qualifying Percentile
          </th>
          <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">
            Expected Score Range (2025)
          </th>
        </tr>
      </thead>

      <tbody>
        {[
          ["Unreserved (UR) / EWS", "50th percentile", "280-340 marks"],
          ["SC / ST / OBC", "40th percentile", "240-290 marks"],
          ["UR-PwD", "45th percentile", "260-310 marks"],
          ["SC/ST/OBC-PwD", "40th percentile", "240-290 marks"],
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

  {/* Insight Box */}
  <div className="mt-4 text-sm text-slate-500 italic bg-blue-50 inline-block px-3 py-2 rounded-md">
    Cutoff marks change every year. Always rely on percentile rather than marks for eligibility.
  </div>
</div>

        {/* Marks vs Rank */}
        <div className="text-center mb-6 lg:mb-8">
          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-800 to-blue-400 text-transparent bg-clip-text">
            NEET PG 2025 Marks vs Rank Analysis
          </h3>
          <p className="text-slate-600 text-sm lg:text-base mb-4 bg-blue-500 inline-block px-3 py-1 rounded-full text-white">
            Here's how your marks may correspond to your All India Rank and admission prospects:
          </p>
          <div className="overflow-x-auto max-h-[450px] rounded-xl border border-slate-200 shadow-sm bg-blue-50">
            <table className="w-full text-center table-fixed border-collapse min-w-full ">
              <thead className="bg-slate-50 ">
                <tr>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Score Range</th>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">All India Rank</th>
                  <th className="border-b border-slate-200 py-2 px-3 text-slate-600 text-sm lg:text-base">Admission Prospects</th>
                </tr>
              </thead>
              <tbody>
                {
                // [
                //   { score: "707",     rank: "1",                prospect: "Top AIIMS/PGI" },
                //   { score: "705",     rank: "2–3",              prospect: "Top AIIMS/PGI" },
                //   { score: "701",     rank: "4",                prospect: "Top Institutions" },
                //   { score: "695",     rank: "5–6",              prospect: "Premium Colleges" },
                //   { score: "690–678", rank: "12–28",            prospect: "Excellent Options" },
                //   { score: "677–663", rank: "29–113",           prospect: "Very Good Colleges" },
                //   { score: "638",     rank: "551",              prospect: "Good Government" },
                //   { score: "627",     rank: "974",              prospect: "Good Options" },
                //   { score: "620",     rank: "1356",             prospect: "Decent Choices" },
                //   { score: "600",     rank: "3049",             prospect: "Moderate Options" },
                //   { score: "591",     rank: "4100",             prospect: "Limited Government" },
                //   { score: "576",     rank: "6278",             prospect: "Private Options" },
                //   { score: "563",     rank: "8628",             prospect: "Competitive Private" },
                //   { score: "555–499", rank: "10,001–25,000",    prospect: "Challenging" },
                //   { score: "499–427", rank: "25,001–50,000",    prospect: "Very Challenging" },
                //   { score: "427–363", rank: "50,001–75,000",    prospect: "Extremely Difficult" },
                // ]
                [
                { score: "720–705", rank: "1–10",        prospect: "Top AIIMS (Delhi/Jodhpur/Bhopal), PGI Chandigarh" },
                { score: "704–690", rank: "11–50",       prospect: "Top AIIMS + Elite Govt Colleges" },
                { score: "689–670", rank: "51–200",      prospect: "Top Govt Medical Colleges (Clinical branches possible)" },
                { score: "669–650", rank: "201–500",     prospect: "Excellent Govt Colleges" },
                 { score: "649–630", rank: "501–1,200",   prospect: "Very Good Govt Colleges (Paraclinical/Some Clinical)" },
                 { score: "629–610", rank: "1,201–2,500", prospect: "Good Govt + Deemed Universities" },
               { score: "609–590", rank: "2,501–5,000", prospect: "Govt Colleges (Non-clinical) + Good Private" },
                { score: "589–570", rank: "5,001–8,000", prospect: "Private + Some Govt (Low branches)" },
  { score: "569–550", rank: "8,001–12,000", prospect: "Private Colleges (Decent options)" },
  { score: "549–520", rank: "12,001–20,000", prospect: "Private / Deemed (Clinical difficult)" },
  { score: "519–480", rank: "20,001–35,000", prospect: "Private Colleges (Management quota likely)" },
  { score: "479–430", rank: "35,001–60,000", prospect: "Limited options (Mostly Private)" },
  { score: "429–380", rank: "60,001–90,000", prospect: "Very Limited (High fees / low demand branches)" },
  { score: "379–330", rank: "90,001–1,20,000", prospect: "Extremely Difficult" },
  { score: "<330",     rank: "1,20,000+",      prospect: "Very Low Chances" },
          ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{row.score}</td>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{row.rank}</td>
                    <td className="border-b border-slate-200 py-2 px-3 text-slate-800">{row.prospect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Counselling Timeline */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">NEET PG 2025 Counselling Timeline</h2>
          <p className="text-slate-600 text-sm lg:text-base">Important dates and events for NEET PG 2025 counselling process</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Calendar,    bg: "bg-blue-800",  light: "bg-blue-50",  color: "text-blue-600",  label: "Registration",  status: "Started",     sub: "MCC Portal Open" },
            { icon: CheckCircle, bg: "bg-blue-800",   light: "bg-blue-50",   color: "text-blue-600",   label: "Round 1",       status: "Coming Soon", sub: "Choice Filling" },
            { icon: Award,       bg: "bg-blue-800", light: "bg-purple-50", color: "text-purple-600", label: "Seat Allotment",status: "Round 1",     sub: "Result Declaration" },
            { icon: Users,       bg: "bg-blue-800",   light: "bg-blue-50",   color: "text-blue-600",   label: "Joining",       status: "Round 1",     sub: "Documentation" },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className={`w-16 h-16 ${step.bg} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className={`${step.light} rounded-xl p-4`}>
                <div className={`text-sm ${step.color} font-medium mb-1`}>{step.label}</div>
                <div className="text-lg font-bold text-slate-800 mb-1">{step.status}</div>
                <div className="text-sm text-slate-600">{step.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
        {/* How to Check Results */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">How to Check NEET PG 2025 Results?</h3>
              <p className="text-slate-600 text-sm lg:text-base">Follow these steps to check your NEET PG 2025 results and download your scorecard.</p>
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
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-slate-700 text-sm lg:text-base">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Specialties */}
        {/* <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">Popular NEET PG 2025 Specialties</h3>
              <p className="text-slate-600 text-sm lg:text-base">Top specialties with highest demand and career opportunities.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "General Medicine",        seats: "2,847", demand: "Very High", icon: "🏥" },
              { name: "Pediatrics",              seats: "1,234", demand: "High",      icon: "👶" },
              { name: "Obstetrics & Gynecology", seats: "1,156", demand: "High",      icon: "👩‍⚕️" },
              { name: "Orthopedics",             seats: "987",   demand: "High",      icon: "🦴" },
              { name: "Dermatology",             seats: "456",   demand: "Very High", icon: "🩺" },
              { name: "Psychiatry",              seats: "678",   demand: "Medium",    icon: "🧠" },
              { name: "Radiology",               seats: "789",   demand: "High",      icon: "📷" },
              { name: "Anesthesiology",          seats: "1,023", demand: "High",      icon: "💉" },
              { name: "Pathology",               seats: "567",   demand: "Medium",    icon: "🔬" },
            ].map((specialty, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{specialty.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-800">{specialty.name}</h4>
                    <p className="text-sm text-slate-600">{specialty.seats} seats</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${specialty.demand === "Very High" ? "bg-red-100 text-red-700" : specialty.demand === "High" ? "bg-blue-100 text-blue-700" : "bg-blue-100 text-blue-700"}`}>
                  {specialty.demand} Demand
                </span>
              </div>
            ))}
          </div>
        </div> */}
        {/* Popular Specialties */}
<div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
  <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
      <Target className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
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
      { name: "General Medicine",        seats: "3,600+", demand: "Very High"},
      { name: "Radiology",               seats: "1,200+", demand: "Very High" },
      { name: "Dermatology",             seats: "700+",   demand: "Very High" },
      { name: "Pediatrics",              seats: "1,500+", demand: "High"     },
      { name: "Obstetrics & Gynecology", seats: "1,400+", demand: "High"      },
      { name: "Orthopedics",             seats: "1,200+", demand: "High"     },
      { name: "Anesthesiology",          seats: "2,000+", demand: "High"       },
      { name: "Psychiatry",              seats: "900+",   demand: "Rising"     },
      { name: "Pathology",               seats: "1,000+", demand: "Moderate"  },
    ].map((specialty, index) => (
      <div
        key={index}
        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-2xl">{specialty.icon}</span>
          <div>
            <h4 className="font-bold text-slate-800">{specialty.name}</h4>
            <p className="text-sm text-slate-600">{specialty.seats} seats</p>
          </div>
        </div>

        {/* Demand Badge */}
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            specialty.demand === "Very High"
              ? "bg-red-100 text-red-700"
              : specialty.demand === "High"
              ? "bg-blue-100 text-blue-700"
              : specialty.demand === "Rising"
              ? "bg-blue-100 text-blue-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {specialty.demand} Demand
        </span>

        {/* Competition Bar */}
        <div className="mt-3">
          <div className="w-full bg-slate-200 h-1 rounded-full">
            <div
              className="bg-blue-800 h-1 rounded-full transition-all duration-500"
              style={{
                width:
                  specialty.demand === "Very High"
                    ? "90%"
                    : specialty.demand === "High"
                    ? "70%"
                    : specialty.demand === "Rising"
                    ? "60%"
                    : "40%",
              }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Counselling Process */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">NEET PG 2025 Counselling Process</h3>
              <p className="text-slate-600 text-sm lg:text-base">Complete step-by-step guide for NEET PG 2025 counselling registration.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Registration Phase</h4>
              {[
                { n: 1, title: "Register on MCC Portal",  sub: "Create account with NEET PG credentials" },
                { n: 2, title: "Pay Registration Fee",    sub: "Pay Rs. 5000 for AIQ and Rs. 2000 for Deemed Universities" },
                { n: 3, title: "Upload Documents",        sub: "Upload all required certificates and documents" },
              ].map(({ n, title, sub }) => (
                <div key={n} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">{n}</div>
                  <div><p className="text-slate-700 text-sm font-medium">{title}</p><p className="text-slate-600 text-xs">{sub}</p></div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Choice Filling &amp; Allotment</h4>
              {[
                { n: 4, title: "Fill Choices",       sub: "Select colleges and specialties in order of preference" },
                { n: 5, title: "Seat Allotment",     sub: "MCC will allot seats based on rank and choices" },
                { n: 6, title: "Report to College",  sub: "Complete admission formalities at allotted college" },
              ].map(({ n, title, sub }) => (
                <div key={n} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">{n}</div>
                  <div><p className="text-slate-700 text-sm font-medium">{title}</p><p className="text-slate-600 text-xs">{sub}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center text-white shadow-2xl">
          <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">
            Ready for <span className="text-blue-300">Specialty Selection?</span> Get Expert Guidance!
          </h3>
          <p className="text-blue-100 mb-4 lg:mb-6 text-sm lg:text-lg">
            Choose the right specialty with our expert guidance.
          </p>
          <a
            onClick={() => window.AiSensy?.open()}
            className="bg-gradient-to-r from-blue-400 to-indigo-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold text-base lg:text-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block cursor-pointer"
          >
            Get Specialty Guidance
          </a>
        </div>
      </div>

      {/* Quota Modal (existing) */}
      <QuotaModal
        isOpen={showQuotaModal}
        onClose={() => setShowQuotaModal(false)}
      />
    </div>
  );
};

export default MainContent;