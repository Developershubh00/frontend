// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   BookOpen,
//   GraduationCap,
//   Clock,
//   Filter,
//   Search,
//   Award,
//   Users,
//   Building2,
// } from "lucide-react";
// import { getStaticFileUrl } from "../services/api";

// interface CoursesPageProps {
//   onBack: () => void;
// }

// interface CourseData {
//   Course: string;
//   Duration: string;
//   Clinical_Type: string;
//   Degree_Type: string;
//   Course_Type: string;
//   Total_Seats: number;
// }

// /**
//  * Courses Page Component
//  * Displays course data with filtering and search capabilities
//  * Shows course information including duration, type, and seat availability
//  */
// const CoursesPage: React.FC<CoursesPageProps> = ({ onBack }) => {
//   // State for course data
//   const [coursesData, setCoursesData] = useState<CourseData[]>([]);
//   // State for loading status
//   const [loading, setLoading] = useState(true);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   // State for search functionality
//   const [searchTerm, setSearchTerm] = useState("");
//   // State for filters
//   const [selectedDuration, setSelectedDuration] = useState("all");
//   const [selectedClinicalType, setSelectedClinicalType] = useState("all");
//   const [selectedDegreeType, setSelectedDegreeType] = useState("all");
//   const [selectedCourseType, setSelectedCourseType] = useState("all");
//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(50);

//   /**
//    * Parse CSV data into course objects
//    * @param csvText - Raw CSV text data
//    * @returns Array of course data objects
//    */
//   const parseCSV = (csvText: string): CourseData[] => {
//     const lines = csvText.trim().split("\n");
    
//     return lines.slice(1).map((line) => {
//       const values = line.split(",");
//       return {
//         Course: values[0] || "",
//         Duration: values[1] || "",
//         Clinical_Type: values[2] || "",
//         Degree_Type: values[3] || "",
//         Course_Type: values[4] || "",
//         Total_Seats: parseInt(values[5]) || 0,
//       };
//     });
//   };

//   /**
//    * Fetch course data from CSV file
//    * Loads data on component mount
//    */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoadingProgress(10);
//         const response = await fetch(getStaticFileUrl("Courses.csv"));
//         setLoadingProgress(30);
        
//         const csvText = await response.text();
//         setLoadingProgress(60);
        
//         const parsedData = parseCSV(csvText);
//         setLoadingProgress(90);
        
//         setCoursesData(parsedData);
//         setLoadingProgress(100);
//       } catch (error) {
//         console.error("Error fetching courses data:", error);
//         // Fallback data for demonstration
//         setCoursesData([
//           {
//             Course: "MD General Medicine",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 120,
//           },
//           {
//             Course: "MS General Surgery",
//             Duration: "3 Years", 
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 80,
//           },
//           {
//             Course: "DM Cardiology",
//             Duration: "3 Years",
//             Clinical_Type: "Super Specialty",
//             Degree_Type: "Super Speciality",
//             Course_Type: "Degree",
//             Total_Seats: 15,
//           },
//           {
//             Course: "DNB Pediatrics",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Diploma",
//             Total_Seats: 45,
//           },
//           {
//             Course: "MD Radiology",
//             Duration: "3 Years",
//             Clinical_Type: "Para Clinical",
//             Degree_Type: "Post Graduate", 
//             Course_Type: "Degree",
//             Total_Seats: 60,
//           },
//         ]);
//       } finally {
//         setTimeout(() => setLoading(false), 500); // Smooth transition
//       }
//     };

//     fetchData();
//   }, []);

//   // Reset pagination when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedDuration, selectedClinicalType, selectedDegreeType, selectedCourseType]);

//   /**
//    * Filter course data based on search term and filters
//    * @returns Filtered array of course data
//    */
//   const filteredData = coursesData.filter((item) => {
//     const matchesSearch =
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Degree_Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Clinical_Type.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesDuration =
//       selectedDuration === "all" || item.Duration === selectedDuration;
//     const matchesClinicalType =
//       selectedClinicalType === "all" || item.Clinical_Type === selectedClinicalType;
//     const matchesDegreeType =
//       selectedDegreeType === "all" || item.Degree_Type === selectedDegreeType;
//     const matchesCourseType =
//       selectedCourseType === "all" || item.Course_Type === selectedCourseType;
    
//     return matchesSearch && matchesDuration && matchesClinicalType && matchesDegreeType && matchesCourseType;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   // Get unique values for filters
//   const durations = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Duration))),
//   ];
//   const clinicalTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Clinical_Type))),
//   ];
//   const degreeTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Degree_Type))),
//   ];
//   const courseTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Course_Type))),
//   ];

//   /**
//    * Get clinical type badge color
//    * @param clinicalType - Clinical type string
//    * @returns CSS class string for badge color
//    */
//   const getClinicalTypeBadgeColor = (clinicalType: string) => {
//     switch (clinicalType) {
//       case "Clinical":
//         return "bg-green-100 text-green-800";
//       case "Para Clinical":
//         return "bg-blue-100 text-blue-800";
//       case "Super Specialty":
//         return "bg-purple-100 text-purple-800";
//       case "Pre Clinical":
//         return "bg-orange-100 text-orange-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   /**
//    * Get degree type badge color
//    * @param degreeType - Degree type string
//    * @returns CSS class string for badge color
//    */
//   const getDegreeTypeBadgeColor = (degreeType: string) => {
//     switch (degreeType) {
//       case "Post Graduate":
//         return "bg-blue-100 text-blue-800";
//       case "Super Speciality":
//         return "bg-purple-100 text-purple-800";
//       case "Under Graduate":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   /**
//    * Get course type badge color
//    * @param courseType - Course type string
//    * @returns CSS class string for badge color
//    */
//   const getCourseTypeBadgeColor = (courseType: string) => {
//     switch (courseType) {
//       case "Degree":
//         return "bg-indigo-100 text-indigo-800";
//       case "Diploma":
//         return "bg-amber-100 text-amber-800";
//       case "Certificate":
//         return "bg-teal-100 text-teal-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <div className="w-64 bg-slate-200 rounded-full h-2 mb-4">
//             <div 
//               className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${loadingProgress}%` }}
//             ></div>
//           </div>
//           <p className="text-slate-600">Loading Courses Data... {loadingProgress}%</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen">
//       {/* Header Section */}
//       <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={onBack}
//             className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-slate-600" />
//           </button>
//           <h1 className="text-xl font-bold text-slate-800">
//             Medical Courses Data
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-8 h-8" />
//             </div>
//             <h2 className="text-3xl font-bold mb-4">
//               Medical Courses Information
//             </h2>
//             <p className="text-emerald-100 text-lg">
//               Comprehensive data on medical courses, duration, types, and available seats
//             </p>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
//           <div className="flex flex-col gap-4">
//             {/* Search Bar */}
//             <div className="flex-1 relative">
//               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search courses, degree types, or clinical types..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
//               />
//             </div>

//             {/* Filters Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <select
//                 value={selectedDuration}
//                 onChange={(e) => setSelectedDuration(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {durations.map((duration) => (
//                   <option key={duration} value={duration}>
//                     {duration === "all" ? "All Durations" : duration}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedClinicalType}
//                 onChange={(e) => setSelectedClinicalType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {clinicalTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Clinical Types" : type}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedDegreeType}
//                 onChange={(e) => setSelectedDegreeType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {degreeTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Degree Types" : type}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedCourseType}
//                 onChange={(e) => setSelectedCourseType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {courseTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Course Types" : type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {coursesData.length}
//             </div>
//             <div className="text-slate-600 text-sm">Total Courses</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Clock className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {durations.length - 1}
//             </div>
//             <div className="text-slate-600 text-sm">Duration Types</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <GraduationCap className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {degreeTypes.length - 1}
//             </div>
//             <div className="text-slate-600 text-sm">Degree Types</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {coursesData.reduce((sum, course) => sum + course.Total_Seats, 0)}
//             </div>
//             <div className="text-slate-600 text-sm">Total Seats</div>
//           </div>
//         </div>

//         {/* Courses Data Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-slate-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold text-slate-800">
//                 Courses Information
//               </h3>
//               <div className="text-sm text-slate-600">
//                 Showing {filteredData.length} of {coursesData.length} courses
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold">Course</th>
//                   <th className="px-6 py-4 text-left font-semibold">Duration</th>
//                   <th className="px-6 py-4 text-left font-semibold">Clinical Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Degree Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Course Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Total Seats</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedData.map((item, index) => (
//                   <tr
//                     key={index}
//                     className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
//                       index % 2 === 0 ? "bg-white/50" : "bg-slate-50/50"
//                     }`}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="font-bold text-slate-800 text-sm">
//                         {item.Course}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <Clock className="w-4 h-4 text-slate-400 mr-2" />
//                         <span className="text-slate-700 text-sm">{item.Duration}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getClinicalTypeBadgeColor(
//                           item.Clinical_Type
//                         )}`}
//                       >
//                         {item.Clinical_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getDegreeTypeBadgeColor(
//                           item.Degree_Type
//                         )}`}
//                       >
//                         {item.Degree_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getCourseTypeBadgeColor(
//                           item.Course_Type
//                         )}`}
//                       >
//                         {item.Course_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <Users className="w-4 h-4 text-slate-400 mr-2" />
//                         <span className="font-bold text-slate-800">
//                           {item.Total_Seats.toLocaleString()}
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between mt-6 px-6 py-4 bg-slate-50 rounded-lg">
//               <div className="text-sm text-slate-600">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-3 py-2 text-sm font-medium text-slate-700">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* No Results Message */}
//         {filteredData.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-8 h-8 text-slate-500" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-800 mb-2">
//               No courses found
//             </h3>
//             <p className="text-slate-600">
//               Try adjusting your search terms or filters
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;

// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   BookOpen,
//   GraduationCap,
//   Clock,
//   Filter,
//   Search,
//   Award,
//   Users,
//   Building2,
// } from "lucide-react";
// import { getStaticFileUrl } from "../services/api";

// interface CoursesPageProps {
//   onBack: () => void;
// }

// interface CourseData {
//   Course: string;
//   Duration: string;
//   Clinical_Type: string;
//   Degree_Type: string;
//   Course_Type: string;
//   Total_Seats: number;
// }

// /**
//  * Courses Page Component
//  * Displays course data with filtering and search capabilities
//  * Shows course information including duration, type, and seat availability
//  */
// const CoursesPage: React.FC<CoursesPageProps> = ({ onBack }) => {
//   // State for course data
//   const [coursesData, setCoursesData] = useState<CourseData[]>([]);
//   // State for loading status
//   const [loading, setLoading] = useState(true);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   // State for search functionality
//   const [searchTerm, setSearchTerm] = useState("");
//   // State for filters
//   const [selectedDuration, setSelectedDuration] = useState("all");
//   const [selectedClinicalType, setSelectedClinicalType] = useState("all");
//   const [selectedDegreeType, setSelectedDegreeType] = useState("all");
//   const [selectedCourseType, setSelectedCourseType] = useState("all");
//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(50);

//   /**
//    * Parse CSV data into course objects
//    * @param csvText - Raw CSV text data
//    * @returns Array of course data objects
//    */
//   const parseCSV = (csvText: string): CourseData[] => {
//     const lines = csvText.trim().split("\n");
    
//     return lines.slice(1).map((line) => {
//       const values = line.split(",");
//       return {
//         Course: values[0] || "",
//         Duration: values[1] || "",
//         Clinical_Type: values[2] || "",
//         Degree_Type: values[3] || "",
//         Course_Type: values[4] || "",
//         Total_Seats: parseInt(values[5]) || 0,
//       };
//     });
//   };

//   /**
//    * Fetch course data from CSV file
//    * Loads data on component mount
//    */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoadingProgress(10);
        
//         // Try multiple approaches to fetch the CSV
//         let response;
//         let csvText = "";
        
//         // Approach 1: Try with getStaticFileUrl (if available)
//         try {
//           response = await fetch(getStaticFileUrl("Courses.csv"));
//           if (response.ok) {
//             csvText = await response.text();
//             setLoadingProgress(60);
//           }
//         } catch (err) {
//           console.warn("getStaticFileUrl approach failed:", err);
//         }
        
//         // Approach 2: Try direct fetch from public folder
//         if (!csvText) {
//           try {
//             setLoadingProgress(20);
//             response = await fetch("/Courses.csv");
//             if (response.ok) {
//               csvText = await response.text();
//               setLoadingProgress(60);
//             }
//           } catch (err) {
//             console.warn("Direct fetch from /courses.csv failed:", err);
//           }
//         }
        
//         // Approach 3: Try from assets or data folder
//         if (!csvText) {
//           try {
//             setLoadingProgress(30);
//             response = await fetch("/data/Courses.csv");
//             if (response.ok) {
//               csvText = await response.text();
//               setLoadingProgress(60);
//             }
//           } catch (err) {
//             console.warn("Fetch from /data/Courses.csv failed:", err);
//           }
//         }
        
//         // If we successfully got CSV data, parse it
//         if (csvText && csvText.trim().length > 0) {
//           setLoadingProgress(80);
//           const parsedData = parseCSV(csvText);
//           setLoadingProgress(100);
//           setCoursesData(parsedData);
//           console.log("Successfully loaded", parsedData.length, "Courses from CSV");
//         } else {
//           throw new Error("No CSV data found");
//         }
        
//       } catch (error) {
//         console.error("Error fetching courses data:", error);
//         console.log("Using fallback demo data");
        
//         // Enhanced fallback data for better demonstration
//         setCoursesData([
//           {
//             Course: "MD General Medicine",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 120,
//           },
//           {
//             Course: "MS General Surgery",
//             Duration: "3 Years", 
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 80,
//           },
//           {
//             Course: "DM Cardiology",
//             Duration: "3 Years",
//             Clinical_Type: "Super Specialty",
//             Degree_Type: "Super Speciality",
//             Course_Type: "Degree",
//             Total_Seats: 15,
//           },
//           {
//             Course: "DNB Pediatrics",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Diploma",
//             Total_Seats: 45,
//           },
//           {
//             Course: "MD Radiology",
//             Duration: "3 Years",
//             Clinical_Type: "Para Clinical",
//             Degree_Type: "Post Graduate", 
//             Course_Type: "Degree",
//             Total_Seats: 60,
//           },
//           {
//             Course: "MS Orthopedics",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 55,
//           },
//           {
//             Course: "MD Anesthesiology",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 70,
//           },
//           {
//             Course: "DM Gastroenterology",
//             Duration: "3 Years",
//             Clinical_Type: "Super Specialty",
//             Degree_Type: "Super Speciality",
//             Course_Type: "Degree",
//             Total_Seats: 12,
//           },
//           {
//             Course: "DNB General Surgery",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Diploma",
//             Total_Seats: 35,
//           },
//           {
//             Course: "MD Pathology",
//             Duration: "3 Years",
//             Clinical_Type: "Para Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 40,
//           },
//           {
//             Course: "MS ENT",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 30,
//           },
//           {
//             Course: "MD Dermatology",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 25,
//           },
//           {
//             Course: "DM Neurology",
//             Duration: "3 Years",
//             Clinical_Type: "Super Specialty",
//             Degree_Type: "Super Speciality",
//             Course_Type: "Degree",
//             Total_Seats: 18,
//           },
//           {
//             Course: "MD Microbiology",
//             Duration: "3 Years",
//             Clinical_Type: "Para Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 35,
//           },
//           {
//             Course: "MS Ophthalmology",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 28,
//           },
//         ]);
//         setLoadingProgress(100);
//       } finally {
//         setTimeout(() => setLoading(false), 500); // Smooth transition
//       }
//     };

//     fetchData();
//   }, []);

//   // Reset pagination when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedDuration, selectedClinicalType, selectedDegreeType, selectedCourseType]);

//   /**
//    * Filter course data based on search term and filters
//    * @returns Filtered array of course data
//    */
//   const filteredData = coursesData.filter((item) => {
//     const matchesSearch =
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Degree_Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Clinical_Type.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesDuration =
//       selectedDuration === "all" || item.Duration === selectedDuration;
//     const matchesClinicalType =
//       selectedClinicalType === "all" || item.Clinical_Type === selectedClinicalType;
//     const matchesDegreeType =
//       selectedDegreeType === "all" || item.Degree_Type === selectedDegreeType;
//     const matchesCourseType =
//       selectedCourseType === "all" || item.Course_Type === selectedCourseType;
    
//     return matchesSearch && matchesDuration && matchesClinicalType && matchesDegreeType && matchesCourseType;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   // Get unique values for filters
//   const durations = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Duration))),
//   ];
//   const clinicalTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Clinical_Type))),
//   ];
//   const degreeTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Degree_Type))),
//   ];
//   const courseTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Course_Type))),
//   ];

//   /**
//    * Get clinical type badge color
//    * @param clinicalType - Clinical type string
//    * @returns CSS class string for badge color
//    */
//   const getClinicalTypeBadgeColor = (clinicalType: string) => {
//     switch (clinicalType) {
//       case "Clinical":
//         return "bg-green-100 text-green-800";
//       case "Para Clinical":
//         return "bg-blue-100 text-blue-800";
//       case "Super Specialty":
//         return "bg-purple-100 text-purple-800";
//       case "Pre Clinical":
//         return "bg-orange-100 text-orange-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   /**
//    * Get degree type badge color
//    * @param degreeType - Degree type string
//    * @returns CSS class string for badge color
//    */
//   const getDegreeTypeBadgeColor = (degreeType: string) => {
//     switch (degreeType) {
//       case "Post Graduate":
//         return "bg-blue-100 text-blue-800";
//       case "Super Speciality":
//         return "bg-purple-100 text-purple-800";
//       case "Under Graduate":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   /**
//    * Get course type badge color
//    * @param courseType - Course type string
//    * @returns CSS class string for badge color
//    */
//   const getCourseTypeBadgeColor = (courseType: string) => {
//     switch (courseType) {
//       case "Degree":
//         return "bg-indigo-100 text-indigo-800";
//       case "Diploma":
//         return "bg-amber-100 text-amber-800";
//       case "Certificate":
//         return "bg-teal-100 text-teal-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <div className="w-64 bg-slate-200 rounded-full h-2 mb-4">
//             <div 
//               className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${loadingProgress}%` }}
//             ></div>
//           </div>
//           <p className="text-slate-600">Loading Courses Data... {loadingProgress}%</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen">
//       {/* Header Section */}
//       <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={onBack}
//             className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-slate-600" />
//           </button>
//           <h1 className="text-xl font-bold text-slate-800">
//             Medical Courses Data
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-8 h-8" />
//             </div>
//             <h2 className="text-3xl font-bold mb-4">
//               Medical Courses Information
//             </h2>
//             <p className="text-emerald-100 text-lg">
//               Comprehensive data on medical courses, duration, types, and available seats
//             </p>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
//           <div className="flex flex-col gap-4">
//             {/* Search Bar */}
//             <div className="flex-1 relative">
//               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search courses, degree types, or clinical types..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
//               />
//             </div>

//             {/* Filters Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <select
//                 value={selectedDuration}
//                 onChange={(e) => setSelectedDuration(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {durations.map((duration) => (
//                   <option key={duration} value={duration}>
//                     {duration === "all" ? "All Durations" : duration}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedClinicalType}
//                 onChange={(e) => setSelectedClinicalType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {clinicalTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Clinical Types" : type}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedDegreeType}
//                 onChange={(e) => setSelectedDegreeType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {degreeTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Degree Types" : type}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedCourseType}
//                 onChange={(e) => setSelectedCourseType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {courseTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Course Types" : type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {coursesData.length}
//             </div>
//             <div className="text-slate-600 text-sm">Total Courses</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Clock className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {durations.length - 1}
//             </div>
//             <div className="text-slate-600 text-sm">Duration Types</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <GraduationCap className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {degreeTypes.length - 1}
//             </div>
//             <div className="text-slate-600 text-sm">Degree Types</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {coursesData.reduce((sum, course) => sum + course.Total_Seats, 0)}
//             </div>
//             <div className="text-slate-600 text-sm">Total Seats</div>
//           </div>
//         </div>

//         {/* Courses Data Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-slate-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold text-slate-800">
//                 Courses Information
//               </h3>
//               <div className="text-sm text-slate-600">
//                 Showing {filteredData.length} of {coursesData.length} courses
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold">Course</th>
//                   <th className="px-6 py-4 text-left font-semibold">Duration</th>
//                   <th className="px-6 py-4 text-left font-semibold">Clinical Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Degree Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Course Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Total Seats</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedData.map((item, index) => (
//                   <tr
//                     key={index}
//                     className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
//                       index % 2 === 0 ? "bg-white/50" : "bg-slate-50/50"
//                     }`}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="font-bold text-slate-800 text-sm">
//                         {item.Course}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <Clock className="w-4 h-4 text-slate-400 mr-2" />
//                         <span className="text-slate-700 text-sm">{item.Duration}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getClinicalTypeBadgeColor(
//                           item.Clinical_Type
//                         )}`}
//                       >
//                         {item.Clinical_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getDegreeTypeBadgeColor(
//                           item.Degree_Type
//                         )}`}
//                       >
//                         {item.Degree_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getCourseTypeBadgeColor(
//                           item.Course_Type
//                         )}`}
//                       >
//                         {item.Course_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <Users className="w-4 h-4 text-slate-400 mr-2" />
//                         <span className="font-bold text-slate-800">
//                           {item.Total_Seats.toLocaleString()}
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between mt-6 px-6 py-4 bg-slate-50 rounded-lg">
//               <div className="text-sm text-slate-600">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-3 py-2 text-sm font-medium text-slate-700">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* No Results Message */}
//         {filteredData.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-8 h-8 text-slate-500" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-800 mb-2">
//               No courses found
//             </h3>
//             <p className="text-slate-600">
//               Try adjusting your search terms or filters
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;

// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   BookOpen,
//   GraduationCap,
//   Clock,
//   Filter,
//   Search,
//   Award,
//   Users,
//   Building2,
// } from "lucide-react";
// import { getStaticFileUrl } from "../services/api";

// interface CoursesPageProps {
//   onBack: () => void;
// }

// interface CourseData {
//   Course: string;
//   Duration: string;
//   Clinical_Type: string;
//   Degree_Type: string;
//   Course_Type: string;
//   Total_Seats: number;
// }

// /**
//  * Courses Page Component
//  * Displays course data with filtering and search capabilities
//  * Shows course information including duration, type, and seat availability
//  */
// const CoursesPage: React.FC<CoursesPageProps> = ({ onBack }) => {
//   // State for course data
//   const [coursesData, setCoursesData] = useState<CourseData[]>([]);
//   // State for loading status
//   const [loading, setLoading] = useState(true);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   // State for search functionality
//   const [searchTerm, setSearchTerm] = useState("");
//   // State for filters
//   const [selectedDuration, setSelectedDuration] = useState("all");
//   const [selectedClinicalType, setSelectedClinicalType] = useState("all");
//   const [selectedDegreeType, setSelectedDegreeType] = useState("all");
//   const [selectedCourseType, setSelectedCourseType] = useState("all");
//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(50);

//   /**
//    * Parse CSV data into course objects
//    * @param csvText - Raw CSV text data
//    * @returns Array of course data objects
//    */
//   const parseCSV = (csvText: string): CourseData[] => {
//     // Check if the content is actually HTML (error page)
//     if (csvText.includes('<html') || csvText.includes('<!DOCTYPE')) {
//       console.error("Received HTML instead of CSV data");
//       throw new Error("Invalid CSV data - received HTML");
//     }

//     const lines = csvText.trim().split(/\r?\n/);
    
//     // Skip empty lines and ensure we have data
//     const dataLines = lines.filter(line => line.trim().length > 0);
    
//     if (dataLines.length < 2) {
//       console.error("CSV file appears to be empty or has no data rows");
//       throw new Error("Invalid CSV data - insufficient rows");
//     }

//     console.log("CSV Headers:", dataLines[0]);
//     console.log("First data row:", dataLines[1]);
    
//     return dataLines.slice(1).map((line, index) => {
//       // Handle CSV with quoted values and commas within quotes
//       const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
      
//       // Clean up quoted values
//       const cleanedValues = values.map(val => 
//         val.replace(/^"(.*)"$/, '$1').trim()
//       );

//       if (cleanedValues.length < 6) {
//         console.warn(`Row ${index + 2} has insufficient columns:`, cleanedValues);
//       }

//       return {
//         Course: cleanedValues[0] || "",
//         Duration: cleanedValues[1] || "",
//         Clinical_Type: cleanedValues[2] || "",
//         Degree_Type: cleanedValues[3] || "",
//         Course_Type: cleanedValues[4] || "",
//         Total_Seats: parseInt(cleanedValues[5]) || 0,
//       };
//     });
//   };

//   /**
//    * Fetch course data from CSV file
//    * Loads data on component mount
//    */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoadingProgress(20);
//         console.log("Attempting to fetch courses data...");
        
//         // Since CSV is in Public/data/Courses.csv, try this path
//         const response = await fetch("/data/Courses.csv");
//         setLoadingProgress(40);
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const csvText = await response.text();
//         setLoadingProgress(60);
        
//         console.log("CSV content preview:", csvText.substring(0, 200));
        
//         if (!csvText || csvText.trim().length === 0) {
//           throw new Error("Empty CSV file");
//         }
        
//         const parsedData = parseCSV(csvText);
//         setLoadingProgress(90);
        
//         if (parsedData.length === 0) {
//           throw new Error("No valid data parsed from CSV");
//         }
        
//         setCoursesData(parsedData);
//         setLoadingProgress(100);
//         console.log("Successfully loaded", parsedData.length, "courses from CSV");
        
//       } catch (error) {
//         console.error("Error fetching courses data:", error);
//         console.log("Loading fallback demo data...");
        
//         // Enhanced fallback data
//         const fallbackData: CourseData[] = [
//           {
//             Course: "MD General Medicine",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 120,
//           },
//           {
//             Course: "MS General Surgery",
//             Duration: "3 Years", 
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 80,
//           },
//           {
//             Course: "DM Cardiology",
//             Duration: "3 Years",
//             Clinical_Type: "Super Specialty",
//             Degree_Type: "Super Speciality",
//             Course_Type: "Degree",
//             Total_Seats: 15,
//           },
//           {
//             Course: "DNB Pediatrics",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Diploma",
//             Total_Seats: 45,
//           },
//           {
//             Course: "MD Radiology",
//             Duration: "3 Years",
//             Clinical_Type: "Para Clinical",
//             Degree_Type: "Post Graduate", 
//             Course_Type: "Degree",
//             Total_Seats: 60,
//           },
//           {
//             Course: "MS Orthopedics",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 55,
//           },
//           {
//             Course: "MD Anesthesiology",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 70,
//           },
//           {
//             Course: "DM Gastroenterology",
//             Duration: "3 Years",
//             Clinical_Type: "Super Specialty",
//             Degree_Type: "Super Speciality",
//             Course_Type: "Degree",
//             Total_Seats: 12,
//           },
//           {
//             Course: "DNB General Surgery",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Diploma",
//             Total_Seats: 35,
//           },
//           {
//             Course: "MD Pathology",
//             Duration: "3 Years",
//             Clinical_Type: "Para Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 40,
//           },
//           {
//             Course: "MS ENT",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 30,
//           },
//           {
//             Course: "MD Dermatology",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 25,
//           },
//           {
//             Course: "DM Neurology",
//             Duration: "3 Years",
//             Clinical_Type: "Super Specialty",
//             Degree_Type: "Super Speciality",
//             Course_Type: "Degree",
//             Total_Seats: 18,
//           },
//           {
//             Course: "MD Microbiology",
//             Duration: "3 Years",
//             Clinical_Type: "Para Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 35,
//           },
//           {
//             Course: "MS Ophthalmology",
//             Duration: "3 Years",
//             Clinical_Type: "Clinical",
//             Degree_Type: "Post Graduate",
//             Course_Type: "Degree",
//             Total_Seats: 28,
//           },
//         ];
        
//         setCoursesData(fallbackData);
//         setLoadingProgress(100);
//       } finally {
//         setTimeout(() => setLoading(false), 500);
//       }
//     };

//     fetchData();
//   }, []);

//   // Reset pagination when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedDuration, selectedClinicalType, selectedDegreeType, selectedCourseType]);

//   /**
//    * Filter course data based on search term and filters
//    * @returns Filtered array of course data
//    */
//   const filteredData = coursesData.filter((item) => {
//     const matchesSearch =
//       item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Degree_Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.Clinical_Type.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesDuration =
//       selectedDuration === "all" || item.Duration === selectedDuration;
//     const matchesClinicalType =
//       selectedClinicalType === "all" || item.Clinical_Type === selectedClinicalType;
//     const matchesDegreeType =
//       selectedDegreeType === "all" || item.Degree_Type === selectedDegreeType;
//     const matchesCourseType =
//       selectedCourseType === "all" || item.Course_Type === selectedCourseType;
    
//     return matchesSearch && matchesDuration && matchesClinicalType && matchesDegreeType && matchesCourseType;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   // Get unique values for filters
//   const durations = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Duration))),
//   ];
//   const clinicalTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Clinical_Type))),
//   ];
//   const degreeTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Degree_Type))),
//   ];
//   const courseTypes = [
//     "all",
//     ...Array.from(new Set(coursesData.map((item) => item.Course_Type))),
//   ];

//   /**
//    * Get clinical type badge color
//    * @param clinicalType - Clinical type string
//    * @returns CSS class string for badge color
//    */
//   const getClinicalTypeBadgeColor = (clinicalType: string) => {
//     switch (clinicalType) {
//       case "Clinical":
//         return "bg-green-100 text-green-800";
//       case "Para Clinical":
//         return "bg-blue-100 text-blue-800";
//       case "Super Specialty":
//         return "bg-purple-100 text-purple-800";
//       case "Pre Clinical":
//         return "bg-orange-100 text-orange-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   /**
//    * Get degree type badge color
//    * @param degreeType - Degree type string
//    * @returns CSS class string for badge color
//    */
//   const getDegreeTypeBadgeColor = (degreeType: string) => {
//     switch (degreeType) {
//       case "Post Graduate":
//         return "bg-blue-100 text-blue-800";
//       case "Super Speciality":
//         return "bg-purple-100 text-purple-800";
//       case "Under Graduate":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   /**
//    * Get course type badge color
//    * @param courseType - Course type string
//    * @returns CSS class string for badge color
//    */
//   const getCourseTypeBadgeColor = (courseType: string) => {
//     switch (courseType) {
//       case "Degree":
//         return "bg-indigo-100 text-indigo-800";
//       case "Diploma":
//         return "bg-amber-100 text-amber-800";
//       case "Certificate":
//         return "bg-teal-100 text-teal-800";
//       default:
//         return "bg-slate-100 text-slate-800";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <div className="w-64 bg-slate-200 rounded-full h-2 mb-4">
//             <div 
//               className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${loadingProgress}%` }}
//             ></div>
//           </div>
//           <p className="text-slate-600">Loading Courses Data... {loadingProgress}%</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen">
//       {/* Header Section */}
//       <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={onBack}
//             className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-slate-600" />
//           </button>
//           <h1 className="text-xl font-bold text-slate-800">
//             Medical Courses Data
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-8 h-8" />
//             </div>
//             <h2 className="text-3xl font-bold mb-4">
//               Medical Courses Information
//             </h2>
//             <p className="text-emerald-100 text-lg">
//               Comprehensive data on medical courses, duration, types, and available seats
//             </p>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
//           <div className="flex flex-col gap-4">
//             {/* Search Bar */}
//             <div className="flex-1 relative">
//               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search courses, degree types, or clinical types..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
//               />
//             </div>

//             {/* Filters Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <select
//                 value={selectedDuration}
//                 onChange={(e) => setSelectedDuration(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {durations.map((duration) => (
//                   <option key={duration} value={duration}>
//                     {duration === "all" ? "All Durations" : duration}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedClinicalType}
//                 onChange={(e) => setSelectedClinicalType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {clinicalTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Clinical Types" : type}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedDegreeType}
//                 onChange={(e) => setSelectedDegreeType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {degreeTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Degree Types" : type}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedCourseType}
//                 onChange={(e) => setSelectedCourseType(e.target.value)}
//                 className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
//               >
//                 {courseTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type === "all" ? "All Course Types" : type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {coursesData.length}
//             </div>
//             <div className="text-slate-600 text-sm">Total Courses</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Clock className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {durations.length - 1}
//             </div>
//             <div className="text-slate-600 text-sm">Duration Types</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <GraduationCap className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {degreeTypes.length - 1}
//             </div>
//             <div className="text-slate-600 text-sm">Degree Types</div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
//             <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-2xl font-bold text-slate-800 mb-2">
//               {coursesData.reduce((sum, course) => sum + course.Total_Seats, 0)}
//             </div>
//             <div className="text-slate-600 text-sm">Total Seats</div>
//           </div>
//         </div>

//         {/* Courses Data Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-slate-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold text-slate-800">
//                 Courses Information
//               </h3>
//               <div className="text-sm text-slate-600">
//                 Showing {filteredData.length} of {coursesData.length} courses
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold">Course</th>
//                   <th className="px-6 py-4 text-left font-semibold">Duration</th>
//                   <th className="px-6 py-4 text-left font-semibold">Clinical Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Degree Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Course Type</th>
//                   <th className="px-6 py-4 text-left font-semibold">Total Seats</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedData.map((item, index) => (
//                   <tr
//                     key={index}
//                     className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
//                       index % 2 === 0 ? "bg-white/50" : "bg-slate-50/50"
//                     }`}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="font-bold text-slate-800 text-sm">
//                         {item.Course}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <Clock className="w-4 h-4 text-slate-400 mr-2" />
//                         <span className="text-slate-700 text-sm">{item.Duration}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getClinicalTypeBadgeColor(
//                           item.Clinical_Type
//                         )}`}
//                       >
//                         {item.Clinical_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getDegreeTypeBadgeColor(
//                           item.Degree_Type
//                         )}`}
//                       >
//                         {item.Degree_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getCourseTypeBadgeColor(
//                           item.Course_Type
//                         )}`}
//                       >
//                         {item.Course_Type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <Users className="w-4 h-4 text-slate-400 mr-2" />
//                         <span className="font-bold text-slate-800">
//                           {item.Total_Seats.toLocaleString()}
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between mt-6 px-6 py-4 bg-slate-50 rounded-lg">
//               <div className="text-sm text-slate-600">
//                 Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-3 py-2 text-sm font-medium text-slate-700">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* No Results Message */}
//         {filteredData.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-8 h-8 text-slate-500" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-800 mb-2">
//               No courses found
//             </h3>
//             <p className="text-slate-600">
//               Try adjusting your search terms or filters
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Clock,
  Filter,
  Search,
  Award,
  Users,
  Building2,
} from "lucide-react";
import { getStaticFileUrl } from "../services/api";

interface CoursesPageProps {
  onBack: () => void;
}

interface CourseData {
  Course: string;
  Duration: string;
  Clinical_Type: string;
  Degree_Type: string;
  Course_Type: string;
  Total_Seats: number;
}

/**
 * Courses Page Component
 * Displays course data with filtering and search capabilities
 * Shows course information including duration, type, and seat availability
 */
const CoursesPage: React.FC<CoursesPageProps> = ({ onBack }) => {
  // State for course data
  const [coursesData, setCoursesData] = useState<CourseData[]>([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  // State for filters
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedClinicalType, setSelectedClinicalType] = useState("all");
  const [selectedDegreeType, setSelectedDegreeType] = useState("all");
  const [selectedCourseType, setSelectedCourseType] = useState("all");
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  /**
   * Parse CSV data into course objects
   * @param csvText - Raw CSV text data
   * @returns Array of course data objects
   */
  const parseCSV = (csvText: string): CourseData[] => {
    // Check if the content is actually HTML (error page)
    if (csvText.includes('<html') || csvText.includes('<!DOCTYPE')) {
      console.error("Received HTML instead of CSV data");
      throw new Error("Invalid CSV data - received HTML");
    }

    const lines = csvText.trim().split(/\r?\n/);
    
    // Skip empty lines and ensure we have data
    const dataLines = lines.filter(line => line.trim().length > 0);
    
    if (dataLines.length < 2) {
      console.error("CSV file appears to be empty or has no data rows");
      throw new Error("Invalid CSV data - insufficient rows");
    }

    const headers = dataLines[0].split(',').map(h => h.trim());
    console.log("CSV Headers:", headers);
    console.log("First data row:", dataLines[1]);
    
    return dataLines.slice(1).map((line, index) => {
      // Handle CSV with quoted values and commas within quotes
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim()); // Add the last value
      
      // Clean up quoted values
      const cleanedValues = values.map(val => 
        val.replace(/^"(.*)"$/, '$1').trim()
      );

      if (cleanedValues.length < 6) {
        console.warn(`Row ${index + 2} has insufficient columns:`, cleanedValues);
      }

      return {
        Course: cleanedValues[0] || "",
        Duration: cleanedValues[1] || "",
        Clinical_Type: cleanedValues[2] || "",
        Degree_Type: cleanedValues[3] || "",
        Course_Type: cleanedValues[4] || "",
        Total_Seats: parseInt(cleanedValues[5]) || 0,
      };
    });
  };

  /**
   * Fetch course data from CSV file
   * Loads data on component mount
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingProgress(20);
        console.log("Attempting to fetch courses data...");
        
        // Since CSV is in Public/data/Courses.csv, try this path
        const response = await fetch("/data/Courses.csv");
        setLoadingProgress(40);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        setLoadingProgress(60);
        
        console.log("CSV content preview:", csvText.substring(0, 200));
        
        if (!csvText || csvText.trim().length === 0) {
          throw new Error("Empty CSV file");
        }
        
        const parsedData = parseCSV(csvText);
        setLoadingProgress(90);
        
        if (parsedData.length === 0) {
          throw new Error("No valid data parsed from CSV");
        }
        
        setCoursesData(parsedData);
        setLoadingProgress(100);
        console.log("Successfully loaded", parsedData.length, "courses from CSV");
        
      } catch (error) {
        console.error("Error fetching courses data:", error);
        console.log("Loading fallback demo data...");
        
        // Enhanced fallback data matching your CSV structure
        const fallbackData: CourseData[] = [
          {
            Course: "Diploma in RADIO DIAGNOSIS - DMRD (NBEMS)",
            Duration: "2 Years",
            Clinical_Type: "Clinical",
            Degree_Type: "DMRD (NBEMS)",
            Course_Type: "Diploma (NBEMS)",
            Total_Seats: 322,
          },
          {
            Course: "Diploma in MICROBIOLOGY",
            Duration: "2 Years",
            Clinical_Type: "Para Clinical",
            Degree_Type: "Diploma",
            Course_Type: "Diploma",
            Total_Seats: 0,
          },
          {
            Course: "Diploma in OPHTHALMOLOGY - DO (NBEMS)",
            Duration: "2 Years",
            Clinical_Type: "Clinical",
            Degree_Type: "DO (NBEMS)",
            Course_Type: "Diploma (NBEMS)",
            Total_Seats: 339,
          },
          {
            Course: "DNB DERMATOLOGY",
            Duration: "3 Years",
            Clinical_Type: "Clinical",
            Degree_Type: "DNB",
            Course_Type: "Degree",
            Total_Seats: 34,
          },
          {
            Course: "Diploma in PULMONARY MEDICINE",
            Duration: "2 Years",
            Clinical_Type: "Clinical",
            Degree_Type: "Diploma",
            Course_Type: "Diploma",
            Total_Seats: 5,
          },
          {
            Course: "Diploma in HEALTH ADMINISTRATION",
            Duration: "2 Years",
            Clinical_Type: "Non Clinical",
            Degree_Type: "Diploma",
            Course_Type: "Diploma",
            Total_Seats: 6,
          },
          {
            Course: "DNB ENT",
            Duration: "3 Years",
            Clinical_Type: "Clinical",
            Degree_Type: "DNB",
            Course_Type: "Degree",
            Total_Seats: 95,
          },
          {
            Course: "MD General Medicine",
            Duration: "3 Years",
            Clinical_Type: "Clinical",
            Degree_Type: "MD",
            Course_Type: "Degree",
            Total_Seats: 120,
          },
          {
            Course: "MS General Surgery",
            Duration: "3 Years", 
            Clinical_Type: "Clinical",
            Degree_Type: "MS",
            Course_Type: "Degree",
            Total_Seats: 80,
          },
          {
            Course: "DM Cardiology",
            Duration: "3 Years",
            Clinical_Type: "Super Specialty",
            Degree_Type: "DM",
            Course_Type: "Degree",
            Total_Seats: 15,
          },
        ];
        
        setCoursesData(fallbackData);
        setLoadingProgress(100);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDuration, selectedClinicalType, selectedDegreeType, selectedCourseType]);

  /**
   * Filter course data based on search term and filters
   * @returns Filtered array of course data
   */
  const filteredData = coursesData.filter((item) => {
    const matchesSearch =
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Degree_Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Clinical_Type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDuration =
      selectedDuration === "all" || item.Duration === selectedDuration;
    const matchesClinicalType =
      selectedClinicalType === "all" || item.Clinical_Type === selectedClinicalType;
    const matchesDegreeType =
      selectedDegreeType === "all" || item.Degree_Type === selectedDegreeType;
    const matchesCourseType =
      selectedCourseType === "all" || item.Course_Type === selectedCourseType;
    
    return matchesSearch && matchesDuration && matchesClinicalType && matchesDegreeType && matchesCourseType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get unique values for filters
  const durations = [
    "all",
    ...Array.from(new Set(coursesData.map((item) => item.Duration))),
  ];
  const clinicalTypes = [
    "all",
    ...Array.from(new Set(coursesData.map((item) => item.Clinical_Type))),
  ];
  const degreeTypes = [
    "all",
    ...Array.from(new Set(coursesData.map((item) => item.Degree_Type))),
  ];
  const courseTypes = [
    "all",
    ...Array.from(new Set(coursesData.map((item) => item.Course_Type))),
  ];

  /**
   * Get clinical type badge color
   * @param clinicalType - Clinical type string
   * @returns CSS class string for badge color
   */
  const getClinicalTypeBadgeColor = (clinicalType: string) => {
    switch (clinicalType) {
      case "Clinical":
        return "bg-green-100 text-green-800";
      case "Para Clinical":
        return "bg-blue-100 text-blue-800";
      case "Super Specialty":
        return "bg-purple-100 text-purple-800";
      case "Pre Clinical":
        return "bg-orange-100 text-orange-800";
      case "Non Clinical":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  /**
   * Get degree type badge color
   * @param degreeType - Degree type string
   * @returns CSS class string for badge color
   */
  const getDegreeTypeBadgeColor = (degreeType: string) => {
    switch (degreeType) {
      case "MD":
        return "bg-blue-100 text-blue-800";
      case "MS":
        return "bg-indigo-100 text-indigo-800";
      case "DM":
        return "bg-purple-100 text-purple-800";
      case "DNB":
        return "bg-emerald-100 text-emerald-800";
      case "Diploma":
        return "bg-amber-100 text-amber-800";
      case "DMRD (NBEMS)":
        return "bg-teal-100 text-teal-800";
      case "DO (NBEMS)":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  /**
   * Get course type badge color
   * @param courseType - Course type string
   * @returns CSS class string for badge color
   */
  const getCourseTypeBadgeColor = (courseType: string) => {
    switch (courseType) {
      case "Degree":
        return "bg-indigo-100 text-indigo-800";
      case "Diploma":
        return "bg-amber-100 text-amber-800";
      case "Diploma (NBEMS)":
        return "bg-orange-100 text-orange-800";
      case "Certificate":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="w-64 bg-slate-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-slate-600">Loading Courses Data... {loadingProgress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">
            Medical Courses Data
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Medical Courses Information
            </h2>
            <p className="text-emerald-100 text-lg">
              Comprehensive data on medical courses, duration, types, and available seats
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, degree types, or clinical types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration === "all" ? "All Durations" : duration}
                  </option>
                ))}
              </select>

              <select
                value={selectedClinicalType}
                onChange={(e) => setSelectedClinicalType(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
              >
                {clinicalTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Clinical Types" : type}
                  </option>
                ))}
              </select>

              <select
                value={selectedDegreeType}
                onChange={(e) => setSelectedDegreeType(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
              >
                {degreeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Degree Types" : type}
                  </option>
                ))}
              </select>

              <select
                value={selectedCourseType}
                onChange={(e) => setSelectedCourseType(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-slate-800"
              >
                {courseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Course Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">
              {coursesData.length}
            </div>
            <div className="text-slate-600 text-sm">Total Courses</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">
              {durations.length - 1}
            </div>
            <div className="text-slate-600 text-sm">Duration Types</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">
              {degreeTypes.length - 1}
            </div>
            <div className="text-slate-600 text-sm">Degree Types</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">
              {coursesData.reduce((sum, course) => sum + course.Total_Seats, 0)}
            </div>
            <div className="text-slate-600 text-sm">Total Seats</div>
          </div>
        </div>

        {/* Courses Data Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">
                Courses Information
              </h3>
              <div className="text-sm text-slate-600">
                Showing {filteredData.length} of {coursesData.length} courses
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Course</th>
                  <th className="px-6 py-4 text-left font-semibold">Duration</th>
                  <th className="px-6 py-4 text-left font-semibold">Clinical Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Degree Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Course Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Total Seats</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                      index % 2 === 0 ? "bg-white/50" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 text-sm max-w-xs">
                        {item.Course}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-slate-700 text-sm">{item.Duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getClinicalTypeBadgeColor(
                          item.Clinical_Type
                        )}`}
                      >
                        {item.Clinical_Type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getDegreeTypeBadgeColor(
                          item.Degree_Type
                        )}`}
                      >
                        {item.Degree_Type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCourseTypeBadgeColor(
                          item.Course_Type
                        )}`}
                      >
                        {item.Course_Type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="font-bold text-slate-800">
                          {item.Total_Seats.toLocaleString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 px-6 py-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm font-medium text-slate-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* No Results Message */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No courses found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;