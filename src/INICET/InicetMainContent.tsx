// import React, { useState } from 'react';
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
//   HelpCircle,
//   CheckCircle,
// } from "lucide-react";

// /**
//  * INICET MainContent Component
//  * Main dashboard content area displaying INICET Counselling information,
//  * statistics, timelines, and action cards
//  */
// const InicetMainContent = () => {
//   const [showQuotaModal, setShowQuotaModal] = useState(false);
//   const [currentStateTab, setCurrentStateTab] = useState("all-india");
//   const [tableData, setTableData] = useState([]);
//   const [tableType, setTableType] = useState("cutoffs");
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
//         window.open("https://aiims.edu/inicet/", "_blank");
//       },
//     },
//     {
//       id: "registration",
//       label: "Registration",
//       icon: BarChart3,
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600",
//       onClick: () => {
//         window.open("https://inicet.aiims.edu/", "_blank");
//       },
//     },
//     {
//       id: "prospectus",
//       label: "Prospectus",
//       icon: FileText,
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600",
//       onClick: () => {
//         window.open("https://aiims.edu/inicet/", "_blank");
//       },
//     },
//     {
//       id: "results",
//       label: "Results",
//       icon: Award,
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600",
//       onClick: () => {
//         window.open("https://inicet.aiims.edu/", "_blank");
//       },
//     },
//   ];

//   const dataCards = [
//     {
//       title: "Allotments",
//       subtitle: "View Past Allotments",
//       icon: Users,
//       color: "bg-purple-500",
//       navLink: "#allotments",
//       onClick: () => {
//         document.getElementById('allotments-section')?.scrollIntoView({ behavior: 'smooth' });
//       },
//     },
//     {
//       title: "Cutoff Ranks",
//       subtitle: "Category-wise Cutoffs",
//       icon: TrendingUp,
//       color: "bg-blue-500",
//       navLink: "#cutoffs",
//       onClick: () => {
//         document.getElementById('cutoffs-section')?.scrollIntoView({ behavior: 'smooth' });
//       },
//     },
//     {
//       title: "Seat Matrix",
//       subtitle: "Available Seats",
//       icon: BarChart3,
//       color: "bg-indigo-500",
//       navLink: "#seat-matrix",
//       onClick: () => {
//         document.getElementById('seat-matrix-section')?.scrollIntoView({ behavior: 'smooth' });
//       },
//     },
//     {
//       title: "Fee & Stipend",
//       subtitle: "Financial Details",
//       icon: Award,
//       color: "bg-purple-600",
//       navLink: "#fees",
//       onClick: () => {
//         document.getElementById('fees-section')?.scrollIntoView({ behavior: 'smooth' });
//       },
//     },
//   ];

//   // INICET Cutoff Data
//   const inicetCutoffData = [
//     { category: "UR", jan2025: "11,342", july2024: "12,082", jan2024: "13,058", july2023: "-3,294" },
//     { category: "EWS", jan2025: "25,874", july2024: "25,488", jan2024: "23,951", july2023: "-4,967" },
//     { category: "OBC", jan2025: "15,039", july2024: "16,556", jan2024: "26,161", july2023: "-7,418" },
//     { category: "SC", jan2025: "21,661", july2024: "30,572", jan2024: "31,709", july2023: "-16,133" },
//     { category: "ST", jan2025: "30,889", july2024: "36,161", jan2024: "30,970", july2023: "-26,905" },
//   ];

//   // INICET Timeline
//   const timelineSteps = [
//     {
//       date: "JAN 2025",
//       title: "INICET Exam",
//       subtitle: "Examination Date",
//       status: "Coming Soon",
//     },
//     {
//       date: "FEB 2025",
//       title: "Result Declaration",
//       subtitle: "Results Announced",
//       status: "Coming Soon",
//     },
//     {
//       date: "MAR 2025",
//       title: "Counselling Starts",
//       subtitle: "Registration Opens",
//       status: "Coming Soon",
//     },
//     {
//       date: "APR 2025",
//       title: "Seat Allotment",
//       subtitle: "First Round",
//       status: "Coming Soon",
//     },
//   ];

//   return (
//     <div className="w-full bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
//       {/* Mobile-First Hero Section */}
//       <div className="bg-gradient-to-r from-purple-300 to-purple-700 px-4 lg:px-6 py-6 lg:py-12 relative overflow-hidden rounded-2xl">
//         <div className="absolute inset-0 bg-black/5"></div>
//         <div className="relative max-w-7xl mx-auto">
//           {/* Mobile Layout */}
//           <div className="xl:hidden text-center">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
//               <span className="text-white text-2xl">⚡</span>
//             </div>
            
//             <h1 className="text-xl font-bold text-white mb-2">
//               INICET 2025 - AIIMS PG Entrance
//             </h1>
//             <p className="text-purple-100 mb-6 text-sm">Complete Guide for AIIMS PG Admissions</p>

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
//           </div>
          
//           {/* Desktop Layout */}
//           <div className="hidden xl:block text-center">
//             <div className="inline-flex items-center space-x-3 mb-6">
//               <h1 className="text-3xl lg:text-4xl font-bold text-white">
//                 🏥 INICET 2025 - AIIMS PG Entrance Exam
//               </h1>
//               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                 <span className="text-white text-lg">🎓</span>
//               </div>
//             </div>

//             <p className="text-purple-100 mb-8 text-lg">
//               Complete Guide for AIIMS PG Admissions - Cutoffs, Counselling & More!
//             </p>

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

//       <div className="px-4 lg:px-6 py-6 lg:py-8 max-w-7xl mx-auto">
//         {/* Mobile-First Data Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
//           {dataCards.map((card, index) => (
//             <div
//               key={index}
//               className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
//               onClick={card.onClick}
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

//         {/* What is INICET? */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               📚 What is INICET?
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               INICET (Institute of National Importance Combined Entrance Test) is a national-level entrance examination conducted for admission to various postgraduate medical courses (MD/MS/DM/M.Ch/MDS) at AIIMS and other Institutes of National Importance.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-slate-800 mb-4">🎯 Exam Highlights</h3>
//               <div className="space-y-3">
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">Conducting Body</p>
//                     <p className="text-slate-600 text-xs">AIIMS New Delhi</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">Exam Mode</p>
//                     <p className="text-slate-600 text-xs">Computer-Based Test (CBT)</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">Frequency</p>
//                     <p className="text-slate-600 text-xs">Twice a Year (January & July)</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="text-slate-700 text-sm font-medium">Duration</p>
//                     <p className="text-slate-600 text-xs">3 Hours (180 Minutes)</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-slate-800 mb-4">🏥 Participating Institutes</h3>
//               <div className="space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <p className="text-slate-700 text-sm">AIIMS New Delhi</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <p className="text-slate-700 text-sm">JIPMER Puducherry</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <p className="text-slate-700 text-sm">PGIMER Chandigarh</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <p className="text-slate-700 text-sm">NIMHANS Bangalore</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <p className="text-slate-700 text-sm">SCTIMST Trivandrum</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <p className="text-slate-700 text-sm">All other AIIMS Institutes</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* INICET Cutoff Data Table */}
//         <div id="cutoffs-section" className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               📊 INICET Category-wise Cutoff Ranks
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Historical cutoff data for different categories across multiple sessions
//             </p>
//           </div>

//           <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
//             <table className="w-full text-left border-collapse min-w-full">
//               <thead className="bg-slate-50">
//                 <tr>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">Category</th>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">Jan 2025 MD/MS</th>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">July 2024 MD/MS</th>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">Jan 2024 MD/MS</th>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">July 2023 MD/MS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {inicetCutoffData.map((row, idx) => (
//                   <tr key={idx} className="hover:bg-slate-50 transition">
//                     <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-semibold">{row.category}</td>
//                     <td className="border-b border-slate-200 py-3 px-4 text-slate-800">{row.jan2025}</td>
//                     <td className="border-b border-slate-200 py-3 px-4 text-slate-800">{row.july2024}</td>
//                     <td className="border-b border-slate-200 py-3 px-4 text-slate-800">{row.jan2024}</td>
//                     <td className="border-b border-slate-200 py-3 px-4 text-slate-800">{row.july2023}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-6 bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
//             <p className="text-sm text-slate-700">
//               <strong>Note:</strong> Cutoff ranks vary based on difficulty level, number of candidates, and seat availability. These are closing ranks for the last candidate admitted in each category.
//             </p>
//           </div>
//         </div>

//         {/* INICET Counselling Timeline */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               INICET 2025 Timeline
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Important dates for INICET 2025 examination and counselling
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {timelineSteps.map((step, index) => (
//               <div key={index} className="text-center">
//                 <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//                   <Calendar className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="bg-purple-50 rounded-xl p-4">
//                   <div className="text-sm text-purple-600 font-medium mb-1">{step.date}</div>
//                   <div className="text-lg font-bold text-slate-800 mb-1">{step.title}</div>
//                   <div className="text-sm text-slate-600">{step.subtitle}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Exam Pattern */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               📝 INICET Exam Pattern
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Comprehensive exam structure and marking scheme
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 text-center">
//               <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <FileText className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-800 mb-2">200 Questions</h3>
//               <p className="text-slate-600 text-sm">Total MCQs in the exam</p>
//             </div>

//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center">
//               <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <Award className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-800 mb-2">+4 / -1 Marks</h3>
//               <p className="text-slate-600 text-sm">Marking scheme per question</p>
//             </div>

//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center">
//               <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <Calendar className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-800 mb-2">180 Minutes</h3>
//               <p className="text-slate-600 text-sm">Total exam duration</p>
//             </div>
//           </div>

//           <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-slate-50">
//                 <tr>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm font-bold">Subject</th>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm font-bold">Number of Questions</th>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm font-bold">Marks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="hover:bg-slate-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">Pre-clinical & Para-clinical</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">40</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">160</td>
//                 </tr>
//                 <tr className="hover:bg-slate-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">Clinical Subjects</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">160</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">640</td>
//                 </tr>
//                 <tr className="hover:bg-slate-50 bg-blue-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-bold">Total</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-bold">200</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-bold">800</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Popular Specialties */}
//         <div id="seat-matrix-section" className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               🏆 Popular INICET Specialties
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Most sought-after postgraduate medical specialties
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               { name: "Cardiology (DM)", demand: "Very High", icon: "❤️", rank: "Rank 1-50" },
//               { name: "Neurology (DM)", demand: "Very High", icon: "🧠", rank: "Rank 1-100" },
//               { name: "General Medicine (MD)", demand: "High", icon: "🏥", rank: "Rank 1-500" },
//               { name: "Orthopedics (MS)", demand: "High", icon: "🦴", rank: "Rank 1-800" },
//               { name: "Radiology (MD)", demand: "Very High", icon: "📷", rank: "Rank 1-300" },
//               { name: "Anesthesiology (MD)", demand: "High", icon: "💉", rank: "Rank 1-1000" },
//               { name: "Pediatrics (MD)", demand: "High", icon: "👶", rank: "Rank 1-600" },
//               { name: "Dermatology (MD)", demand: "Very High", icon: "🩺", rank: "Rank 1-200" },
//               { name: "Psychiatry (MD)", demand: "Medium", icon: "🧘", rank: "Rank 1-1500" },
//             ].map((specialty, index) => (
//               <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <span className="text-3xl">{specialty.icon}</span>
//                   <div>
//                     <h4 className="font-bold text-slate-800 text-sm">{specialty.name}</h4>
//                     <p className="text-xs text-slate-600">{specialty.rank}</p>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     specialty.demand === "Very High" ? "bg-red-100 text-red-700" :
//                     specialty.demand === "High" ? "bg-blue-100 text-blue-700" :
//                     "bg-green-100 text-green-700"
//                   }`}>
//                     {specialty.demand} Demand
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Counselling Process */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               🎯 INICET Counselling Process
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Step-by-step guide for INICET counselling and seat allotment
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <h4 className="font-bold text-slate-800 text-lg">Registration & Documentation</h4>
//               <div className="space-y-3">
//                 {[
//                   { step: "1", title: "Online Registration", desc: "Register on AIIMS portal with credentials" },
//                   { step: "2", title: "Document Upload", desc: "Upload required certificates and documents" },
//                   { step: "3", title: "Fee Payment", desc: "Pay counselling fee online" },
//                 ].map((item) => (
//                   <div key={item.step} className="flex items-start space-x-3">
//                     <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                       {item.step}
//                     </div>
//                     <div>
//                       <p className="text-slate-700 text-sm font-medium">{item.title}</p>
//                       <p className="text-slate-600 text-xs">{item.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h4 className="font-bold text-slate-800 text-lg">Choice Filling & Allotment</h4>
//               <div className="space-y-3">
//                 {[
//                   { step: "4", title: "Choice Filling", desc: "Select institutes and specialties in order" },
//                   { step: "5", title: "Choice Locking", desc: "Lock your choices before deadline" },
//                   { step: "6", title: "Seat Allotment", desc: "Result based on rank and choices" },
//                 ].map((item) => (
//                   <div key={item.step} className="flex items-start space-x-3">
//                     <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
//                       {item.step}
//                     </div>
//                     <div>
//                       <p className="text-slate-700 text-sm font-medium">{item.title}</p>
//                       <p className="text-slate-600 text-xs">{item.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Eligibility Criteria */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
//             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
//               <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
//             </div>
//             <div>
//               <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
//                 Eligibility Criteria for INICET
//               </h3>
//               <p className="text-slate-600 text-sm lg:text-base">
//                 Check if you meet the requirements for INICET 2025
//               </p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             {[
//               { title: "Educational Qualification", desc: "MBBS degree or equivalent qualification from MCI/NMC recognized institution" },
//               { title: "Internship Completion", desc: "Completed compulsory rotating internship by the time of admission" },
//               { title: "Registration", desc: "Must be registered with State Medical Council or MCI/NMC" },
//               { title: "Age Limit", desc: "No upper age limit for MD/MS courses" },
//               { title: "Nationality", desc: "Indian nationals, OCI cardholders, and foreign nationals eligible" },
//             ].map((criteria, index) => (
//               <div key={index} className="flex items-start space-x-3 bg-green-50 rounded-xl p-4">
//                 <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-slate-700 font-medium text-sm lg:text-base">{criteria.title}</p>
//                   <p className="text-slate-600 text-xs lg:text-sm mt-1">{criteria.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Important Documents */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
//             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
//               <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">
//                 Important Documents for INICET Counselling
//               </h3>
//               <p className="text-slate-600 text-sm lg:text-base">
//                 Keep these documents ready for the counselling process
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               "INICET Admit Card",
//               "INICET Scorecard/Result",
//               "MBBS Degree Certificate (Provisional/Final)",
//               "MBBS Marksheets (All years)",
//               "Internship Completion Certificate",
//               "MCI/NMC Registration Certificate",
//               "Category Certificate (if applicable)",
//               "PwD Certificate (if applicable)",
//               "Aadhar Card",
//               "Passport size photographs",
//               "ID Proof (Passport/Driving License)",
//               "Domicile Certificate (if required)",
//             ].map((doc, index) => (
//               <div key={index} className="flex items-center space-x-3 bg-blue-50 rounded-lg p-3">
//                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
//                   {index + 1}
//                 </div>
//                 <p className="text-slate-700 text-sm">{doc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Key Differences: INICET vs NEET PG */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               ⚖️ INICET vs NEET PG
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Understanding the key differences between both exams
//             </p>
//           </div>

//           <div className="overflow-x-auto rounded-xl border border-slate-200">
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-slate-50">
//                 <tr>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm font-bold">Parameter</th>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm font-bold">INICET</th>
//                   <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm font-bold">NEET PG</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="hover:bg-slate-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-medium">Conducting Body</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">AIIMS New Delhi</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">NBE (National Board)</td>
//                 </tr>
//                 <tr className="hover:bg-slate-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-medium">Frequency</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">Twice a year</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">Once a year</td>
//                 </tr>
//                 <tr className="hover:bg-slate-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-medium">Number of Questions</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">200 MCQs</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">200 MCQs</td>
//                 </tr>
//                 <tr className="hover:bg-slate-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-medium">Duration</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">3 hours (180 minutes)</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">3.5 hours (210 minutes)</td>
//                 </tr>
//                 <tr className="hover:bg-slate-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-medium">Participating Institutes</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">AIIMS, JIPMER, PGIMER, etc.</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">All Govt & Private colleges</td>
//                 </tr>
//                 <tr className="hover:bg-slate-50">
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-medium">Negative Marking</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">Yes (-1 mark)</td>
//                   <td className="border-b border-slate-200 py-3 px-4 text-slate-800">No negative marking</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Preparation Tips */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               💡 INICET Preparation Tips
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Expert strategies to crack INICET with top ranks
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               { icon: "📚", title: "Focus on Clinical Subjects", desc: "80% weightage to clinical subjects - prioritize them" },
//               { icon: "⏰", title: "Time Management", desc: "Practice with timed mock tests regularly" },
//               { icon: "📝", title: "Solve Previous Papers", desc: "Analyze past year questions and patterns" },
//               { icon: "🎯", title: "Target High-Yield Topics", desc: "Focus on frequently asked topics and concepts" },
//               { icon: "📖", title: "Standard Textbooks", desc: "Stick to standard reference books for each subject" },
//               { icon: "🔄", title: "Regular Revision", desc: "Create revision notes and revise multiple times" },
//             ].map((tip, index) => (
//               <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
//                 <div className="text-4xl mb-4">{tip.icon}</div>
//                 <h4 className="font-bold text-slate-800 mb-2">{tip.title}</h4>
//                 <p className="text-slate-600 text-sm">{tip.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Fee Structure */}
//         <div id="fees-section" className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
//           <div className="text-center mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
//               💰 INICET Fee Structure
//             </h2>
//             <p className="text-slate-600 text-sm lg:text-base">
//               Application and counselling fees for INICET 2025
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-slate-800 mb-4">Application Fee</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-700">General/OBC/EWS</span>
//                   <span className="text-slate-800 font-bold">₹ 3,500</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-700">SC/ST/PwD</span>
//                   <span className="text-slate-800 font-bold">₹ 2,500</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-700">Foreign Nationals</span>
//                   <span className="text-slate-800 font-bold">$ 250</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-slate-800 mb-4">Counselling Fee</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-700">Registration (All)</span>
//                   <span className="text-slate-800 font-bold">₹ 5,000</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-700">Security Deposit</span>
//                   <span className="text-slate-800 font-bold">₹ 50,000</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-700">Refundable after joining</span>
//                   <span className="text-green-600 font-bold text-sm">✓ Yes</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center text-white shadow-2xl">
//           <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">
//             Ready to <span className="text-purple-200">Crack INICET?</span> Get Expert Guidance!
//           </h3>
//           <p className="text-purple-100 mb-4 lg:mb-6 text-sm lg:text-lg">
//             Join thousands of successful INICET aspirants with personalized mentorship and proven strategies.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="https://forms.gle/HE2RyX5CLh7j9FzX9"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-gradient-to-r from-green-400 to-emerald-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold text-base lg:text-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
//             >
//               Get Expert Mentorship
//             </a>
//             <a
//               href="#cutoffs-section"
//               onClick={(e) => {
//                 e.preventDefault();
//                 document.getElementById('cutoffs-section')?.scrollIntoView({ behavior: 'smooth' });
//               }}
//               className="bg-gradient-to-r from-blue-400 to-cyan-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold text-base lg:text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
//             >
//               Check Cutoff Ranks
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Quota Modal (reusing from NEET PG if needed) */}
//       {showQuotaModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-slate-800">INICET Quota Information</h3>
//               <button
//                 onClick={() => setShowQuotaModal(false)}
//                 className="text-slate-400 hover:text-slate-600"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="space-y-4">
//               <p className="text-slate-600">
//                 INICET follows the All India Quota (AIQ) system for seat distribution across participating institutes.
//               </p>
//               <div className="bg-blue-50 rounded-lg p-4">
//                 <h4 className="font-bold text-slate-800 mb-2">Reservation Policy</h4>
//                 <ul className="space-y-2 text-sm text-slate-700">
//                   <li>• SC: 15%</li>
//                   <li>• ST: 7.5%</li>
//                   <li>• OBC (Non-Creamy Layer): 27%</li>
//                   <li>• EWS: 10%</li>
//                   <li>• PwD: 5% (horizontal reservation)</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InicetMainContent;
                
// InicetMainContent.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Calendar,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

/**
 * INICET Main Content Component
 * Displays INICET information, cutoffs, and data cards
 */
const InicetMainContent: React.FC = () => {
  const navigate = useNavigate();
  const [showQuotaModal, setShowQuotaModal] = useState(false);

  // Action buttons configuration
  const actionButtons = [
    {
      id: "website",
      label: "Website",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => window.open("https://aiims.edu/inicet/", "_blank"),
    },
    {
      id: "registration",
      label: "Registration",
      icon: BarChart3,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => window.open("https://inicet.aiims.edu/", "_blank"),
    },
    {
      id: "prospectus",
      label: "Prospectus",
      icon: FileText,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => window.open("https://aiims.edu/inicet/", "_blank"),
    },
    {
      id: "results",
      label: "Results",
      icon: Award,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      onClick: () => window.open("https://inicet.aiims.edu/", "_blank"),
    },
  ];

  // Data cards with navigation to dedicated pages
  const dataCards = [
    {
      title: "Allotments",
      subtitle: "View Past Allotments",
      icon: Users,
      color: "bg-purple-500",
      onClick: () => navigate("/inicet/allotments"),
    },
    {
      title: "Allotments PG Jul-2025",
      subtitle: "Session-wise Allotments",
      icon: TrendingUp,
      color: "bg-blue-500",
      onClick: () => navigate("/inicet/closing-ranks"),
    },
    // {
    //   title: "Seat Matrix",
    //   subtitle: "Available Seats",
    //   icon: BarChart3,
    //   color: "bg-indigo-500",
    //   onClick: () => navigate("/inicet/seat-matrix"),
    // },
    // {
    //   title: "Fee & Stipend",
    //   subtitle: "Financial Details",
    //   icon: Award,
    //   color: "bg-purple-600",
    //   onClick: () => navigate("/inicet/fee-stipend"),
    // },
  ];

  // INICET Cutoff Data
  const inicetCutoffData = [
    { category: "UR", jan2025: "11,342", july2024: "12,082", jan2024: "13,058", july2023: "-3,294" },
    { category: "EWS", jan2025: "25,874", july2024: "25,488", jan2024: "23,951", july2023: "-4,967" },
    { category: "OBC", jan2025: "15,039", july2024: "16,556", jan2024: "26,161", july2023: "-7,418" },
    { category: "SC", jan2025: "21,661", july2024: "30,572", jan2024: "31,709", july2023: "-16,133" },
    { category: "ST", jan2025: "30,889", july2024: "36,161", jan2024: "30,970", july2023: "-26,905" },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
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
            <p className="text-purple-100 mb-6 text-sm">Complete Guide for AIIMS PG Admissions</p>

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
              Complete Guide for AIIMS PG Admissions - Cutoffs, Counselling & More!
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

      <div className="px-4 lg:px-6 py-6 lg:py-8 max-w-7xl mx-auto">
        {/* Data Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
          {dataCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={card.onClick}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${card.color} rounded-xl flex items-center justify-center mb-3 lg:mb-4`}>
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

        {/* What is INICET */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              📚 What is INICET?
            </h2>
            <p className="text-slate-600 text-sm lg:text-base">
              INICET (Institute of National Importance Combined Entrance Test) is a national-level entrance examination conducted for admission to various postgraduate medical courses (MD/MS/DM/M.Ch/MDS) at AIIMS and other Institutes of National Importance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">🎯 Exam Highlights</h3>
              <div className="space-y-3">
                {[
                  { title: "Conducting Body", desc: "AIIMS New Delhi" },
                  { title: "Exam Mode", desc: "Computer-Based Test (CBT)" },
                  { title: "Frequency", desc: "Twice a Year (January & July)" },
                  { title: "Duration", desc: "3 Hours (180 Minutes)" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-700 text-sm font-medium">{item.title}</p>
                      <p className="text-slate-600 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">🏥 Participating Institutes</h3>
              <div className="space-y-2">
                {["AIIMS New Delhi", "JIPMER Puducherry", "PGIMER Chandigarh", "NIMHANS Bangalore", "SCTIMST Trivandrum", "All other AIIMS Institutes"].map((institute, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <p className="text-slate-700 text-sm">{institute}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INICET Cutoff Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              📊 INICET Category-wise Cutoff Ranks
            </h2>
            <p className="text-slate-600 text-sm lg:text-base">
              Historical cutoff data for different categories across multiple sessions
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">Category</th>
                  <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">Jan 2025 MD/MS</th>
                  <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">July 2024 MD/MS</th>
                  <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">Jan 2024 MD/MS</th>
                  <th className="border-b border-slate-200 py-3 px-4 text-slate-600 text-sm lg:text-base font-bold">July 2023 MD/MS</th>
                </tr>
              </thead>
              <tbody>
                {inicetCutoffData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="border-b border-slate-200 py-3 px-4 text-slate-800 font-semibold">{row.category}</td>
                    <td className="border-b border-slate-200 py-3 px-4 text-slate-800">{row.jan2025}</td>
                    <td className="border-b border-slate-200 py-3 px-4 text-slate-800">{row.july2024}</td>
                    <td className="border-b border-slate-200 py-3 px-4 text-slate-800">{row.jan2024}</td>
                    <td className="border-b border-slate-200 py-3 px-4 text-slate-800">{row.july2023}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
            <p className="text-sm text-slate-700">
              <strong>Note:</strong> Cutoff ranks vary based on difficulty level, number of candidates, and seat availability.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center text-white shadow-2xl">
          <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">
            Ready to <span className="text-purple-200">Crack INICET?</span> Get Expert Guidance!
          </h3>
          <p className="text-purple-100 mb-4 lg:mb-6 text-sm lg:text-lg">
            Join thousands of successful INICET aspirants with personalized mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://forms.gle/HE2RyX5CLh7j9FzX9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-emerald-400 px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-white font-bold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
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