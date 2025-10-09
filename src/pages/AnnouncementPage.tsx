// // import React, { useState, useEffect } from 'react';
// // import { Calendar, Bell, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

// // interface Announcement {
// //   id: number;
// //   title: string;
// //   content: string;
// //   date: string;
// //   priority: 'low' | 'medium' | 'high';
// //   category: string;
// //   is_active: boolean;
// //   created_at: string;
// // }

// // const AnnouncementPage: React.FC = () => {
// //   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   const fetchAnnouncements = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch('/api/announcements/');
// //       if (!response.ok) throw new Error('Failed to fetch announcements');
// //       const data = await response.json();
// //       setAnnouncements(data.results || []);
// //       setError(null);
// //     } catch (err) {
// //       setError('Failed to load announcements');
// //       console.error('Error fetching announcements:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAnnouncements();
// //   }, []);

// //   const getPriorityColor = (priority: string) => {
// //     switch (priority) {
// //       case 'high': return 'border-red-200 bg-red-50 text-red-800';
// //       case 'medium': return 'border-blue-200 bg-blue-50 text-blue-800';
// //       default: return 'border-blue-200 bg-blue-50 text-blue-800';
// //     }
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-IN', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
// //         <div className="max-w-6xl mx-auto">
// //           <div className="flex items-center justify-center h-64">
// //             <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
// //             <span className="ml-2 text-lg text-gray-600">Loading announcements...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Header */}
// //         <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
// //           <div className="bg-gradient-to-r from-blue-400 via-red-400 to-pink-400 p-8 text-white">
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center space-x-4">
// //                 <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
// //                   <Bell className="w-8 h-8" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-4xl font-bold">📢 Announcements</h1>
// //                   <p className="text-blue-100 mt-2">Stay updated with the latest information</p>
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={fetchAnnouncements}
// //                 className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full p-3"
// //               >
// //                 <RefreshCw className="w-6 h-6" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Error State */}
// //         {error && (
// //           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
// //             <AlertCircle className="w-5 h-5 text-red-500" />
// //             <p className="text-red-700">{error}</p>
// //           </div>
// //         )}

// //         {/* Announcements List */}
// //         {announcements.length === 0 && !loading ? (
// //           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
// //             <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
// //               <Bell className="w-12 h-12 text-gray-400" />
// //             </div>
// //             <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Announcements Today</h3>
// //             <p className="text-gray-500">Check back later for updates and important information.</p>
// //           </div>
// //         ) : (
// //           <div className="space-y-6">
// //             {announcements.map((announcement) => (
// //               <div
// //                 key={announcement.id}
// //                 className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
// //               >
// //                 <div className="p-6">
// //                   <div className="flex items-start justify-between mb-4">
// //                     <div className="flex items-center space-x-3">
// //                       <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
// //                         {announcement.priority.toUpperCase()}
// //                       </span>
// //                       <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
// //                         {announcement.category}
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center text-gray-500 text-sm">
// //                       <Calendar className="w-4 h-4 mr-1" />
// //                       {formatDate(announcement.date)}
// //                     </div>
// //                   </div>
                  
// //                   <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
// //                     {announcement.title}
// //                   </h2>
                  
// //                   <div className="prose prose-gray max-w-none">
// //                     <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
// //                       {announcement.content}
// //                     </p>
// //                   </div>
                  
// //                   <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
// //                     <span className="text-xs text-gray-400">
// //                       Posted on {formatDate(announcement.created_at)}
// //                     </span>
// //                     <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
// //                       <span className="text-sm font-medium">Read more</span>
// //                       <ExternalLink className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AnnouncementPage;

// import React, { useState, useEffect } from 'react';
// import { Calendar, Bell, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

// interface Announcement {
//   id: number;
//   title: string;
//   content?: string;
//   date: string;
//   priority: 'low' | 'medium' | 'high';
//   category: string;
//   is_active?: boolean;
//   created_at?: string;
//   link?: string;
//   source?: string;
// }

// const AnnouncementPage: React.FC = () => {
//   const [apiAnnouncements, setApiAnnouncements] = useState<Announcement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Hardcoded NEET PG announcements
//   const staticAnnouncements: Announcement[] = [
//     {
//       id: 1,
//       title: "NEET PG 2025:",
//       content: " Supreme Court declines to pause counselling; transparency plea listed for hearing next week",
//       date: "2025-09-06T00:00:00Z",
//       priority: 'medium',
//       category: 'NEET PG',
//       link: 'https://indianexpress.com/article/education/neet-pg-2025-final-answer-key-supreme-court-plea-response-sheets-natboard-edu-in-nbems-10218766/',
//       source: 'Indian Express',  // <-- here
//       is_active: true,
//       created_at: "2025-09-06T00:00:00Z"
//     },
//     {
//       id: 2,
//       title: "NEET PG merit list for 50% AIQ seats out; counselling schedule to follow",
//       content: "The National Board of Examinations in Medical Sciences (NBEMS) has released the merit list for 50% All India Quota (AIQ) seats for NEET PG 2025. Candidates can check their merit list status and await further counselling schedule announcements.",
//       date: "2025-09-05T16:45:00Z",
//       priority: 'medium',
//       category: 'NEET PG',
//       link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148',
//       is_active: true,
//       source: 'Jagran Josh',
//       created_at: "2025-09-05T16:45:00Z"
//     },
//     {
//       id: 3,
//       title: "Gujarat NEET PG counselling 2025 opens for registration/PIN; tie‑breaking used for 211 applicants",
//       content: "Gujarat NEET PG counselling 2025 registration has commenced. Candidates can register and obtain their PIN. Tie-breaking procedures have been implemented for 211 applicants with similar scores.",
//       date: "2025-09-05T09:45:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.medadmgujarat.org/pg/home.aspx',
//       is_active: true,
//       source: 'Medad Gujarat',
//       created_at: "2025-09-05T09:45:00Z"
//     },
//     {
//       id: 4,
//       title: "NEET PG 2025 Counselling Dates & Schedule Soon; SC to Hear 'Transparency' Plea Today",
//       content: "Supreme Court to take up NEET PG 2025 transparency case tomorrow as MCC readies 50% AIQ counselling timeline",
//       date: "2025-09-11T00:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: '',
//       is_active: true,
//       source: 'Times of India',
//       created_at: "2025-09-04T00:00:00Z"
//     },
//     {
//       id: 5,
//       title: "NEET PG 2025 scorecards are now live on the NBEMS portal; candidates may log in to view and download their scorecard/response sheet",
//       content: "NEET PG 2025 scorecards and response sheets are now available on the NBEMS portal. Candidates can log in using their credentials to view and download their scorecard and response sheet.",
//       date: "2025-08-29T00:00:00Z",
//       priority: 'medium',
//       category: 'NEET PG',
//       link: 'https://www.ndtv.com/education/neet-pg-2025-scorecard-answer-key-released-download-directly-here-9181634',
//       is_active: true,
//       source: 'NDTV',
//       created_at: "2025-08-29T00:00:00Z"
//     },
//     {
//       id: 6,
//       title: "NEET PG merit list for 50% AIQ seats released - Direct access link",
//       content: "The merit list for 50% All India Quota seats has been officially released by NBEMS. Candidates can access the merit list directly through the provided link and check their ranking status.",
//       date: "2025-09-05T00:00:00Z",
//       priority: 'medium',
//       category: 'NEET PG',
//       link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148',
//       is_active: true,
//       source: 'Jagran Josh',
//       created_at: "2025-09-05T00:00:00Z"
//     },
//     {
//       id: 7,
//       title: "NEET PG 2025:",
//       content: "Counselling dates to be announced; 50% AIQ merit list released, with answer key and cutoff updates.",
//       date: "2025-09-09T00:00:00Z",
//       priority: 'medium',
//       category: 'NEET PG',
//       link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-mcc-to-announce-50-aiq-counselling-schedule-soon-sc-hearing-awaited-check-details-here/articleshow/123765991.cms',
//       is_active: true,
//       source: 'Times Of India',
//       created_at: "2025-09-09T00:00:00Z"
//     },
//     {
//       id: 8,
//       title: "NEET PG Counselling 2025 LIVE:",
//       content: "MCC to announce AIQ schedule amid Supreme Court case.",
//       date: "2025-09-09T10:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-mcc-to-announce-50-aiq-counselling-schedule-soon-sc-hearing-awaited-check-details-here/articleshow/123765991.cms',
//       is_active: true,
//       source: 'Times Of India',
//       created_at: "2025-09-09T10:00:00Z"
//     },
//     {
//       id: 9,
//       title: "NEET PG 2025 Counselling Updates:",
//       content: "NEET PG Counselling 2025: How and where to find the counselling timetable once it’s announced",
//       date: "2025-09-11T04:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-news-live-mcc-counselling-schedule-round-1-direct-link-seat-allotment-how-to-apply-mcc-nic-in-101757478660284.html',
//       is_active: true,
//       source: 'Hindustan Times',
//       created_at: "2025-09-11T06:00:00Z"
//     },
//     {
//       id: 10,
//       title: "NBEMS:",
//       content: "NBEMS to Release NEET PG Counselling 2025 Soon, Check Expected Release Date, Updates here",
//       date: "2025-09-10T04:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.jagranjosh.com/news/nbems-to-release-neet-pg-counselling-2025-soon-check-expected-release-date-updates-here-181133',
//       is_active: true,
//       source: 'Jagran Josh',
//       created_at: "2025-09-10T06:00:00Z"
//     },
//     {
//       id: 11,
//       title: "Registration for Tamil Nadu NEET PG 2025",
//       content: "Registration for Tamil Nadu NEET PG 2025 has begun deadline to apply is September 16 on the official site.",
//       date: "2025-09-10T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://tnmedicalselection.net',
//       is_active: true,
//       source: 'TN MEDICAL',
//       created_at: "2025-09-10T08:00:00Z"
//     },
//     {
//       id: 12,
//       title: "Registration for Tamil Nadu NEET PG 2025",
//       content: "Registration for Tamil Nadu NEET PG 2025 has begun deadline to apply is September 16 on the official site.",
//       date: "2025-09-10T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://tnmedicalselection.net',
//       is_active: true,
//       source: 'TN MEDICAL',
//       created_at: "2025-09-10T08:00:00Z"
//     },
//     {
//       id: 13,
//       title: "CEE Kerala ",
//       content: "CEE Kerala begins NEET PG 2025 counselling registration for 50% state‑quota MD/MS seats.",
//       date: "2025-09-12T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms',
//       is_active: true,
//       source: 'Times Of India',
//       created_at: "2025-09-12T08:00:00Z"
//     },
//     {
//       id: 14,
//       title: "NEET PG  ",
//       content: "NEET PG Supreme Court hearing deferred by two weeks: when to expect the next date.",
//       date: "2025-09-13T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms',
//       is_active: true,
//       source: 'Times Of India',
//       created_at: "2025-09-13T08:00:00Z"
//     },
//     {
//       id: 15,
//       title: "MCC Yet to Announce NEET PG 2025 Counselling Schedule- Here's How to Check  ",
//       content: "The official NEET PG 2025 AIQ counselling schedule from MCC is still awaited. Candidates must monitor mcc.nic.in for the official PDF and dates.",
//       date: "2025-09-16T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-schedule-2025-live-update-check-and-download-mcc-nic-in-neet-counselling-schedule-pdf-direct-link-101757917204348.html',
//       is_active: true,
//       source: 'hindustan times',
//       created_at: "2025-09-16T08:00:00Z"
//     },
//     {
//       id: 16,
//       title: "Deadline Today: Tamil Nadu NEET PG 2025 Counselling Applications Close at 5 PM",
//       content: "Deadline Today: Tamil Nadu NEET PG 2025 Counselling Applications Close at 5 PMTN NEET PG 2025: Final Call for State Counselling Registration",
//       date: "2025-09-16T10:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://timesofindia.indiatimes.com/education/news/tamil-nadu-neet-pg-2025-counselling-registration-closes-at-5-pm-today-at-tnmedicalselection-net/articleshow/123913827.cms',
//       is_active: true,
//       source: 'Times Of India',
//       created_at: "2025-09-16T10:00:00Z"
//     },
//     {
//       id: 17,
//       title: "Tamil Nadu NEET PG",
//       content: "Tamil Nadu NEET PG 2025 Registration Extended to September 18",
//       date: "2025-09-17T10:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.jagranjosh.com/news/tn-neet-pg-counselling-2025-schedule-extended-check-revised-dates-here-181226',
//       is_active: true,
//       source: 'Jagran josh',
//       created_at: "2025-09-17T10:00:00Z"
//     },
//     {
//       id: 18,
//       title: "Supreme Court",
//       content: "Supreme Court to Hear NEET PG 2025 Answer Key Transparency Case Tomorrow",
//       date: "2025-09-19T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.news18.com/education-career/neet-pg-2025-sc-to-hear-petition-on-transparency-of-answer-key-tomorrow-9581587.html',
//       is_active: true,
//       source: 'News 18',
//       created_at: "2025-09-19T08:00:00Z"
//     },
//     {
//       id: 19,
//       title: "NEET PG 2025:",
//       content: "NEET PG 2025: Supreme Court to hear answer key transparency plea on September 23NEET PG Counselling 2025: SC Reschedules Hearing On Answer Key Transparency To September ",
//       date: "2025-09-20T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.news18.com/education-career/neet-pg-2025-sc-to-hear-petition-on-transparency-of-answer-key-tomorrow-9581587.html',
//       is_active: true,
//       source: 'News 18',
//       created_at: "2025-09-20T08:00:00Z"
//     },
//     {
//       id: 20,
//       title: "NEET PG 2025:",
//       content: "NEET PG 2025: Supreme Court to hear plea on score discrepancies today",
//       date: "2025-09-21T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.hindustantimes.com/cities/mumbai-news/irregular-neet-pg-scores-take-medical-students-to-sc-s-door-petition-to-be-heard-today-101758222662559.html',
//       is_active: true,
//       source: 'hindustantimes',
//       created_at: "2025-09-21T08:00:00Z"
//     },
//     {
//       id: 21,
//       title: "Supreme Court",
//       content: "NEET PG 2025: Supreme Court lists transparency plea for hearing on September 23",
//       date: "2025-09-21T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://indianexpress.com/article/education/neet-pg-2025-supreme-court-transparency-plea-rationalisation-answer-key-counselling-10258787/',
//       is_active: true,
//       source: 'indianexpress',
//       created_at: "2025-09-21T08:00:00Z"
//     },
//     {
//       id: 22,
//       title: "MCC NEET PG 2025 Schedule: Where and How to Check When Released",
//       content: "The Medical Counselling Committee (MCC) is yet to release the NEET PG 2025 counselling schedule, but candidates can find it on the official MCC website, mcc.nic.in, once it is published. The schedule will be available as a PDF under the PG Medical section, likely in the News & Eventsor Schedule tabs.",
//       date: "2025-09-22T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-mcc-neet-pg-counselling-2025-schedule-admission-process-seat-matrix-mcc-nic-in-101758440968818.html',
//       is_active: true,
//       source: 'Hindustan Times',
//       created_at: "2025-09-21T08:00:00Z"
//     },
//     {
//       id: 23,
//       title: "Supreme Court to Hear NEET PG 2025 Transparency Appeals; Counselling Schedule Expected Soon",
//       content: "The Supreme Court will hear petitions seeking greater transparency in NEET PG 2025, following claims of incomplete answer key disclosures. The Medical Counselling Committee (MCC) is expected to announce the counselling schedule soon after the court’s decision.",
//       date: "2025-09-23T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.news18.com/education-career/supreme-court-to-hear-neet-pg-2025-transparency-plea-today-counselling-schedule-soon-9590272.html',
//       is_active: true,
//       source: 'news18',
//       created_at: "2025-09-21T08:00:00Z"
//     },
//     {
//       id: 23,
//       title: "Supreme Court",
//       content: "Telangana HC Permits NEET PG Registration Under NRI Quota for OCI  ",
//       date: "2025-09-23T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://timesofindia.indiatimes.com/city/hyderabad/court-allows-oci-to-register-for-neet-pg/articleshow/124056177.cms',
//       is_active: true,
//       source: 'Times of India',
//       created_at: "2025-09-23T08:00:00Z"
//     },
//     {
//       id: 24,
//       title: "NEET PG 2025 Transparency Hearing Before Supreme Court Today",
//       content: "The Supreme Court is hearing a critical plea from NEET PG 2025 candidates who are demanding complete transparency in the scoring process. Aspirants are seeking the full disclosure of question papers and scores to ensure fairness and allow for proper verification of their results.  ",
//       date: "2025-09-23T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://indianexpress.com/article/education/supreme-court-neet-pg-2025-transparency-hearing-candidate-response-sheet-answer-key-link-fairness-raw-scores-10264206/',
//       is_active: true,
//       source: 'indianexpress',
//       created_at: "2025-09-23T08:00:00Z"
//     },
//     {
//       id: 25,
//       title: "Supreme Court Hearing Today for NEET PG 2025 Answer Key Transparency",
//       content: "The Supreme Court is set to hear a crucial plea today regarding transparency in the NEET PG 2025 answer key, as aspirants seek fair and verifiable results. A decision in this hearing could pave the way for the long-awaited MCC counselling schedule, which remains on hold.",
//       date: "2025-09-23T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.jagranjosh.com/news/net-pg-2025-supreme-court-hearing-on-answer-key-transparency-check-latest-updates-here-181301',
//       is_active: true,
//       source: 'jagranjosh',
//       created_at: "2025-09-23T08:00:00Z"
//     },
//     {
//       id: 26,
//       title: "UP NEET PG 2025: ",
//       content:" 148 Candidates Barred for Seat Blocking; DGME Releases List",
//       date: "2025-09-24T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://timesofindia.indiatimes.com/education/news/up-neet-pg-counselling-2025-148-candidates-debarred-for-seat-withdrawal-dgme-issues-list/articleshow/124071018.cms',
//       is_active: true,
//       source: 'Times of India',
//       created_at: "2025-09-24T08:00:00Z"
//     },
//      {
//       id: 27,
//       title: "Government Approves Phase 3 of Medical College Upgradation to Add 10,000+ MBBS and PG Seats ",
//       content:" The Union Cabinet has approved the third phase of the centrally sponsored medical college upgradation scheme, aiming to add over 10,000 MBBS and postgraduate medical seats across India. This initiative supports the government's plan to increase medical seats to meet rising demand from NEET aspirants.",
//       date: "2025-09-25T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://timesofindia.indiatimes.com/education/news/up-neet-pg-counselling-2025-148-candidates-debarred-for-seat-withdrawal-dgme-issues-list/articleshow/124071018.cms',
//       is_active: true,
//       source: 'Times of India',
//       created_at: "2025-09-25T08:00:00Z"
//     },
//     {
//       id: 28,
//       title: "NEET PG 2025 Counselling Start Date Expected Soon; Complete Process Guide Here: ",
//       content:"The Medical Counselling Committee (MCC) will release the NEET PG 2025 counselling schedule soon on mcc.nic.in, with registration expected to begin shortly. The online process includes registration, choice filling for up to three institutes, seat allotment, and document verification at allocated colleges.",
//       date: "2025-09-26T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.ndtv.com/education/neet-pg-2025-counselling-expected-start-date-process-details-here-9347182',
//       is_active: true,
//       source: ' NDTV',
//       created_at: "2025-09-26T08:00:00Z"
//     },
//     {
//       id: 29,
//       title: "Supreme Court Gives NBEMS Two Weeks to Respond on NEET PG 2025 Transparency Plea:   ",
//       content:"NEET PG 2025 counselling faces further delay as Supreme Court grants NBEMS two-week extension to address transparency concerns raised by medical aspirants regarding answer key disclosure methods.",
//       date: "2025-09-27T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.jagranjosh.com/news/neet-pg-2025-hearing-supreme-court-orders-board-to-submit-response-on-transparency-issues-within-two-weeks-181350',
//       is_active: true,
//       source: ' jagranjosh',
//       created_at: "2025-09-27T08:00:00Z"
//     },
//     {
//       id: 30,
//       title: "NEET PG 2025 ",
//       content:"How to Check NEET PG 2025 Counselling Schedule: Step-by-Step Guide :Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet; candidates can check updates on mcc.nic.in when announced",
//       date: "2025-09-29T08:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-supreme-court-hearing-check-mcc-neet-pg-counselling-2025-schedule-latest-update-101758951217299.html',
//       is_active: true,
//       source: ' Hindustan Times',
//       created_at: "2025-09-27T08:00:00Z"
//     },
    // {
    //   id: 31,
    //   title: "SC Notice ",
    //   content:"SC Notice to Centre and NBEMS on NEET PG Answer Key Publication Demand ",
    //   date: "2025-09-27T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.thehindu.com/news/national/supreme-court-issues-notice-on-pleas-seeking-transparency-in-neet-pg-exam-evaluation-process/article70098286.ece',
    //   is_active: true,
    //   source: '  the hindu',
    //   created_at: "2025-09-27T08:00:00Z"
    // },
    // {
    //   id: 32,
    //   title: "NEET PG 2025  ",
    //   content:"Counselling Expected to Start in October: Complete Process Guide",
    //   date: "2025-09-29T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.ndtv.com/education/neet-pg-2025-counselling-check-expected-start-date-allotment-process-details-here-9364881',
    //   is_active: true,
    //   source: '  NDTV',
    //   created_at: "2025-09-29T08:00:00Z"
    // },
    // {
    //   id: 33,
    //   title: "Karnataka HC ",
    //   content:"Karnataka HC Dismisses NEET PG 2025 Plea for Category Change After Results Declaration ",
    //   date: "2025-09-29T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: ' https://timesofindia.indiatimes.com/city/raipur/hc-dismisses-plea-challenging-change-in-category-in-neet/articleshow/123571100.cms',
    //   is_active: true,
    //   source: '  Times of India',
    //   created_at: "2025-09-29T08:00:00Z"
    // },
    // {
    //   id: 34,
    //   title: "NEET PG 2025 Counselling: ",
    //   content:" Expected Mid-October Start Date, Complete Allotment : Medical Counselling Committee expected to release NEET PG 2025 counselling schedule by mid-October 2025 on mcc.nic.in following FAIMA's communication with health ministry. ",
    //   date: "2025-10-03T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.ndtv.com/education/neet-pg-counselling-2025-check-expected-start-date-allotment-process-top-medical-colleges-9387163',
    //   is_active: true,
    //   source: ' NDTV',
    //   created_at: "2025-10-03T08:00:00Z"
    // },
    // {
    //   id: 35,
    //   title: "MCC Yet to Announce ",
    //   content:" NEET PG 2025 Counselling Schedule; Medical Aspirants Await Dates : Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet as Supreme Court seeks NBEMS response on transparency issues.",
    //   date: "2025-10-02T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.etnownews.com/exams-results/neet-pg-counselling-schedule-2025-mcc-yet-to-release-dates-sc-seeks-nbems-reply-on-transparency-plea-article-152931347',
    //   is_active: true,
    //   source: '   ET Now News',
    //   created_at: "2025-10-02T08:00:00Z"
    // },
    // {
    //   id: 36,
    //   title: "NEET PG 2025",
    //   content:"NEET PG 2025 Counselling Expected to Begin Mid-October: Complete Details",
    //   date: "2025-10-01T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.news18.com/education-career/neet-pg-2025-counselling-likely-to-start-by-mid-october-details-here-9608658.html',
    //   is_active: true,
    //   source: ' News18 ',
    //   created_at: "2025-10-01T08:00:00Z"
    // },
    //  {
    //   id: 37,
    //   title: "Karnataka NEET PG 2025 ",
    //   content:"Round 1 Registration Begins Today at cetonline.karnataka.gov.in :Karnataka Examination Authority begins NEET PG 2025 counselling round 1 registration today October 4 at 11 AM on cetonline.karnataka.gov.in portal.",
    //   date: "2025-10-04T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.jagranjosh.com/news/karnataka-neet-pg-counselling-2025-round-1-registration-at-cetonline-karnataka-gov-in-get-direct-link-here-181412',
    //   is_active: true,
    //   source: ' Jagran Josh ',
    //   created_at: "2025-10-04T08:00:00Z"
    // },
    //  {
    //   id: 38,
    //   title: "NEET PG 2025 Counselling Schedule",
    //   content:"How to Check MCC Updates at mcc.nic.in :Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet; candidates can check mcc.nic.in when dates become available.",
    //   date: "2025-10-06T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-check-mcc-allotment-process-neet-pg-counselling-2025-schedule-date-latest-news-101759639482477.html',
    //   is_active: true,
    //   source: ' Hindustan Times',
    //   created_at: "2025-10-06T08:00:00Z"
    // },
    //  {
    //   id: 39,
    //   title: "NEET PG 2025",
    //   content:" Counselling Expected to Begin by Mid-October: ",
    //   date: "2025-10-06T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.ndtv.com/education/neet-pg-2025-counelling-expected-to-start-in-third-week-of-october-details-here-9399606',
    //   is_active: true,
    //   source: ' NDTV',
    //   created_at: "2025-10-06T08:00:00Z"
    // },
    // {
    //   id: 40,
    //   title: "NEET PG 2025",
    //   content:"  Data Breach Alert: NBEMS Officials Respond to Leak Allegations ",
    //   date: "2025-10-07T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://indianexpress.com/article/education/neet-pg-2025-candidates-data-leaked-heres-what-nbe-said-10290545/',
    //   is_active: true,
    //   source: '  Indian Express',
    //   created_at: "2025-10-07T08:00:00Z"
    // },
    // {
    //   id: 41,
    //   title: "NEET PG 2025",
    //   content:" NEET PG 2025 Privacy Breach: Student Information Allegedly Sold for Rs 15,000 Online ",
    //   date: "2025-10-08T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.timesnownews.com/education/neet-pg-2025-data-leak-students-claim-personal-details-sold-online-for-rs-15000-article-152955394',
    //   is_active: true,
    //   source: ' Times Now News',
    //   created_at: "2025-10-08T08:00:00Z"
    // },
    // {
    //   id: 42,
    //   title: "NEET PG 2025",
    //   content:" NEET PG 2025 Admission Process Stalled by Regulatory Delays and Supreme Court Cases ",
    //   date: "2025-10-01T08:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://timesofindia.indiatimes.com/city/chennai/regulatory-delays-court-battles-stall-neet-pg-admission/articleshow/124398972.cms',
    //   is_active: true,
    //   source: 'Times of India',
    //   created_at: "2025-10-01T08:00:00Z"
    // },
    
//   ];

//   const fetchAnnouncements = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/announcements/');
//       if (!response.ok) throw new Error('Failed to fetch announcements');
//       const data = await response.json();
//       setApiAnnouncements(data.results || []);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load API announcements');
//       console.error('Error fetching announcements:', err);
//       // Don't show error if we have static announcements to show
//       if (staticAnnouncements.length > 0) {
//         setError(null);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   // Combine and sort announcements by date (newest first)
//   const allAnnouncements = [...staticAnnouncements, ...apiAnnouncements]
//     .filter(announcement => announcement.is_active !== false)
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'border-red-200 bg-red-50 text-red-800';
//       case 'medium': return 'border-blue-200 bg-blue-50 text-blue-800';
//       default: return 'border-gray-200 bg-gray-50 text-gray-800';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleLinkClick = (link: string) => {
//     if (link) {
//       window.open(link, '_blank', 'noopener,noreferrer');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center justify-center h-64">
//             <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
//             <span className="ml-2 text-lg text-gray-600">Loading announcements...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-400 via-red-400 to-pink-400 p-8 text-white">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
//                   <Bell className="w-8 h-8" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold">📢 Announcements</h1>
//                   <p className="text-blue-100 mt-2">Stay updated with the latest NEET PG information</p>
//                 </div>
//               </div>
//               <button
//                 onClick={fetchAnnouncements}
//                 className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full p-3"
//               >
//                 <RefreshCw className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
//             <AlertCircle className="w-5 h-5 text-red-500" />
//             <p className="text-red-700">{error}</p>
//           </div>
//         )}

//         {/* Announcements List */}
//         {allAnnouncements.length === 0 && !loading ? (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
//               <Bell className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Announcements Today</h3>
//             <p className="text-gray-500">Check back later for updates and important information.</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {allAnnouncements.map((announcement) => (
//               <div
//                 key={`${announcement.id}-${announcement.category}`}
//                 className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
//                         {announcement.priority.toUpperCase()}
//                       </span>
//                       <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//                         {announcement.category}
//                       </span>
//                     </div>
//                     <div className="flex items-center text-gray-500 text-sm">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {formatDate(announcement.date)}
//                     </div>
//                   </div>
                  
//                   <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
//                     {announcement.title}
//                   </h2>
                  
//                   <div className="prose prose-gray max-w-none">
//                     <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
//                       {announcement.content}
//                     </p>
//                   </div>
                  
//                   <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
//                     <span className="text-xs text-gray-400">
//                       Posted on {formatDate(announcement.created_at || announcement.date)}
//                     </span>
//                   <div className="flex items-center space-x-3">
//                     {announcement.source && (
//                      <span className="text-xs text-gray-500 italic">
//                       Source: {announcement.source}
//                       </span>
//                       )}
//                     {announcement.link && (
//                       <button 
//                         onClick={() => handleLinkClick(announcement.link!)}
//                         className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded-lg px-3 py-1"
//                       >
//                         <span className="text-sm font-medium">Read more</span>
//                         <ExternalLink className="w-4 h-4" />
//                       </button>
//                     )}
//                     {/* <span className="text-xs text-gray-400">
//                       Posted on {formatDate(announcement.created_at || announcement.date)}
//                     </span> */}
//                   </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Footer Stats */}
//         <div className="mt-8 bg-white rounded-lg shadow-md p-4">
//           <div className="grid grid-cols-3 gap-4 text-center">
//             <div>
//               <div className="text-2xl font-bold text-blue-600">{allAnnouncements.length}</div>
//               <div className="text-gray-600 text-sm">Total</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-red-600">
//                 {allAnnouncements.filter(a => a.priority === 'high').length}
//               </div>
//               <div className="text-gray-600 text-sm">High Priority</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-green-600">
//                 {allAnnouncements.filter(a => a.category === 'NEET PG').length}
//               </div>
//               <div className="text-gray-600 text-sm">NEET PG</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnnouncementPage;

import React, { useState, useEffect } from 'react';
import { Calendar, Bell, ExternalLink, RefreshCw, AlertCircle, X } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  content?: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  is_active?: boolean;
  created_at?: string;
  link?: string;
  source?: string;
}

const AnnouncementPage: React.FC = () => {
  const [apiAnnouncements, setApiAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const staticAnnouncements: Announcement[] = [
    {
      id: 1,
      title: "NEET PG 2025: Supreme Court declines to pause counselling",
      content: "Supreme Court declines to pause counselling; transparency plea listed for hearing next week",
      date: "2025-09-06T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-final-answer-key-supreme-court-plea-response-sheets-natboard-edu-in-nbems-10218766/',
      source: 'Indian Express',
      is_active: true,
      created_at: "2025-09-06T00:00:00Z"
    },
    {
      id: 2,
      title: "NEET PG merit list for 50% AIQ seats out",
      content: "The National Board of Examinations in Medical Sciences (NBEMS) has released the merit list for 50% All India Quota (AIQ) seats for NEET PG 2025. Candidates can check their merit list status and await further counselling schedule announcements.",
      date: "2025-09-05T16:45:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-05T16:45:00Z"
    },
    {
      id: 3,
      title: "Gujarat NEET PG counselling 2025 opens",
      content: "Gujarat NEET PG counselling 2025 registration has commenced. Candidates can register and obtain their PIN. Tie-breaking procedures have been implemented for 211 applicants with similar scores.",
      date: "2025-09-05T09:45:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.medadmgujarat.org/pg/home.aspx',
      is_active: true,
      source: 'Medad Gujarat',
      created_at: "2025-09-05T09:45:00Z"
    },
    {
      id: 4,
      title: "SC to Hear Transparency Plea Today",
      content: "Supreme Court to take up NEET PG 2025 transparency case tomorrow as MCC readies 50% AIQ counselling timeline",
      date: "2025-09-11T00:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: '',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-09-04T00:00:00Z"
    },
    {
      id: 5,
      title: "NEET PG 2025 scorecards now live",
      content: "NEET PG 2025 scorecards and response sheets are now available on the NBEMS portal. Candidates can log in using their credentials to view and download their scorecard and response sheet.",
      date: "2025-08-29T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-scorecard-answer-key-released-download-directly-here-9181634',
      is_active: true,
      source: 'NDTV',
      created_at: "2025-08-29T00:00:00Z"
    },
    {
      id: 6,
      title: "NEET PG merit list released",
      content: "The merit list for 50% All India Quota seats has been officially released by NBEMS. Candidates can access the merit list directly through the provided link and check their ranking status.",
      date: "2025-09-05T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-05T00:00:00Z"
    },
    {
      id: 7,
      title: "Counselling dates to be announced",
      content: "Counselling dates to be announced; 50% AIQ merit list released, with answer key and cutoff updates.",
      date: "2025-09-09T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-mcc-to-announce-50-aiq-counselling-schedule-soon-sc-hearing-awaited-check-details-here/articleshow/123765991.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-09T00:00:00Z"
    },
    {
      id: 8,
      title: "MCC to announce AIQ schedule",
      content: "MCC to announce AIQ schedule amid Supreme Court case.",
      date: "2025-09-09T10:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-mcc-to-announce-50-aiq-counselling-schedule-soon-sc-hearing-awaited-check-details-here/articleshow/123765991.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-09T10:00:00Z"
    },
    {
      id: 9,
      title: "How to find counselling timetable",
      content: "NEET PG Counselling 2025: How and where to find the counselling timetable once it's announced",
      date: "2025-09-11T04:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-news-live-mcc-counselling-schedule-round-1-direct-link-seat-allotment-how-to-apply-mcc-nic-in-101757478660284.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-11T06:00:00Z"
    },
    {
      id: 10,
      title: "NBEMS to Release Counselling Soon",
      content: "NBEMS to Release NEET PG Counselling 2025 Soon, Check Expected Release Date, Updates here",
      date: "2025-09-10T04:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/nbems-to-release-neet-pg-counselling-2025-soon-check-expected-release-date-updates-here-181133',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-10T06:00:00Z"
    },
    {
      id: 11,
      title: "Tamil Nadu Registration Opens",
      content: "Registration for Tamil Nadu NEET PG 2025 has begun deadline to apply is September 16 on the official site.",
      date: "2025-09-10T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://tnmedicalselection.net',
      is_active: true,
      source: 'TN MEDICAL',
      created_at: "2025-09-10T08:00:00Z"
    },
    {
      id: 12,
      title: "CEE Kerala Counselling Begins",
      content: "CEE Kerala begins NEET PG 2025 counselling registration for 50% state‑quota MD/MS seats.",
      date: "2025-09-12T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-12T08:00:00Z"
    },
    {
      id: 13,
      title: "SC hearing deferred by two weeks",
      content: "NEET PG Supreme Court hearing deferred by two weeks: when to expect the next date.",
      date: "2025-09-13T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-13T08:00:00Z"
    },
    {
      id: 14,
      title: "MCC Yet to Announce Schedule",
      content: "The official NEET PG 2025 AIQ counselling schedule from MCC is still awaited. Candidates must monitor mcc.nic.in for the official PDF and dates.",
      date: "2025-09-16T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-schedule-2025-live-update-check-and-download-mcc-nic-in-neet-counselling-schedule-pdf-direct-link-101757917204348.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-16T08:00:00Z"
    },
    {
      id: 15,
      title: "TN Applications Close Today",
      content: "Tamil Nadu NEET PG 2025 Counselling Applications Close at 5 PM. Final Call for State Counselling Registration",
      date: "2025-09-16T10:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/tamil-nadu-neet-pg-2025-counselling-registration-closes-at-5-pm-today-at-tnmedicalselection-net/articleshow/123913827.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-16T10:00:00Z"
    },
    {
      id: 16,
      title: "TN Registration Extended",
      content: "Tamil Nadu NEET PG 2025 Registration Extended to September 18",
      date: "2025-09-17T10:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/tn-neet-pg-counselling-2025-schedule-extended-check-revised-dates-here-181226',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-17T10:00:00Z"
    },
    {
      id: 17,
      title: "SC Transparency Hearing Tomorrow",
      content: "Supreme Court to Hear NEET PG 2025 Answer Key Transparency Case Tomorrow",
      date: "2025-09-19T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/neet-pg-2025-sc-to-hear-petition-on-transparency-of-answer-key-tomorrow-9581587.html',
      is_active: true,
      source: 'News 18',
      created_at: "2025-09-19T08:00:00Z"
    },
    {
      id: 18,
      title: "SC Hearing Rescheduled",
      content: "Supreme Court to hear answer key transparency plea on September 23. SC Reschedules Hearing On Answer Key Transparency",
      date: "2025-09-20T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/neet-pg-2025-sc-to-hear-petition-on-transparency-of-answer-key-tomorrow-9581587.html',
      is_active: true,
      source: 'News 18',
      created_at: "2025-09-20T08:00:00Z"
    },
    {
      id: 19,
      title: "SC to hear score discrepancies",
      content: "Supreme Court to hear plea on score discrepancies today",
      date: "2025-09-21T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/cities/mumbai-news/irregular-neet-pg-scores-take-medical-students-to-sc-s-door-petition-to-be-heard-today-101758222662559.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-21T08:00:00Z"
    },
    {
      id: 20,
      title: "Transparency Plea Listed",
      content: "Supreme Court lists transparency plea for hearing on September 23",
      date: "2025-09-21T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-supreme-court-transparency-plea-rationalisation-answer-key-counselling-10258787/',
      is_active: true,
      source: 'Indian Express',
      created_at: "2025-09-21T08:00:00Z"
    },
    {
      id: 21,
      title: "How to Check MCC Schedule",
      content: "The Medical Counselling Committee (MCC) is yet to release the NEET PG 2025 counselling schedule. Check mcc.nic.in when it is published.",
      date: "2025-09-22T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-mcc-neet-pg-counselling-2025-schedule-admission-process-seat-matrix-mcc-nic-in-101758440968818.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-21T08:00:00Z"
    },
    {
      id: 22,
      title: "Counselling Schedule Expected Soon",
      content: "The Supreme Court will hear petitions seeking greater transparency in NEET PG 2025. The MCC is expected to announce the counselling schedule soon.",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/supreme-court-to-hear-neet-pg-2025-transparency-plea-today-counselling-schedule-soon-9590272.html',
      is_active: true,
      source: 'News18',
      created_at: "2025-09-21T08:00:00Z"
    },
    {
      id: 23,
      title: "Telangana HC Permits OCI",
      content: "Telangana HC Permits NEET PG Registration Under NRI Quota for OCI",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/city/hyderabad/court-allows-oci-to-register-for-neet-pg/articleshow/124056177.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-09-23T08:00:00Z"
    },
    {
      id: 24,
      title: "Transparency Hearing Today",
      content: "The Supreme Court is hearing a critical plea from NEET PG 2025 candidates demanding complete transparency in the scoring process.",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/supreme-court-neet-pg-2025-transparency-hearing-candidate-response-sheet-answer-key-link-fairness-raw-scores-10264206/',
      is_active: true,
      source: 'Indian Express',
      created_at: "2025-09-23T08:00:00Z"
    },
    {
      id: 25,
      title: "Answer Key Hearing Set",
      content: "Supreme Court is set to hear a crucial plea today regarding transparency in the NEET PG 2025 answer key.",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/net-pg-2025-supreme-court-hearing-on-answer-key-transparency-check-latest-updates-here-181301',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-23T08:00:00Z"
    },
    {
      id: 26,
      title: "UP: 148 Candidates Barred",
      content: "148 Candidates Barred for Seat Blocking; DGME Releases List",
      date: "2025-09-24T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/up-neet-pg-counselling-2025-148-candidates-debarred-for-seat-withdrawal-dgme-issues-list/articleshow/124071018.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-09-24T08:00:00Z"
    },
    {
      id: 27,
      title: "Medical College Upgradation Approved",
      content: "Government Approves Phase 3 of Medical College Upgradation to Add 10,000+ MBBS and PG Seats",
      date: "2025-09-25T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/up-neet-pg-counselling-2025-148-candidates-debarred-for-seat-withdrawal-dgme-issues-list/articleshow/124071018.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-09-25T08:00:00Z"
    },
    {
      id: 28,
      title: "Counselling Start Date Expected",
      content: "The Medical Counselling Committee (MCC) will release the NEET PG 2025 counselling schedule soon on mcc.nic.in.",
      date: "2025-09-26T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counselling-expected-start-date-process-details-here-9347182',
      is_active: true,
      source: 'NDTV',
      created_at: "2025-09-26T08:00:00Z"
    },
    {
      id: 29,
      title: "NBEMS Gets Two Week Extension",
      content: "Supreme Court grants NBEMS two-week extension to address transparency concerns raised by medical aspirants.",
      date: "2025-09-27T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-hearing-supreme-court-orders-board-to-submit-response-on-transparency-issues-within-two-weeks-181350',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-27T08:00:00Z"
    },
    {
      id: 30,
      title: "How to Check Schedule",
      content: "Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet; candidates can check updates on mcc.nic.in",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-supreme-court-hearing-check-mcc-neet-pg-counselling-2025-schedule-latest-update-101758951217299.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-27T08:00:00Z"
    },
    {
      id: 31,
      title: "SC Notice ",
      content:"SC Notice to Centre and NBEMS on NEET PG Answer Key Publication Demand ",
      date: "2025-09-27T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.thehindu.com/news/national/supreme-court-issues-notice-on-pleas-seeking-transparency-in-neet-pg-exam-evaluation-process/article70098286.ece',
      is_active: true,
      source: '  the hindu',
      created_at: "2025-09-27T08:00:00Z"
    },
    {
      id: 32,
      title: "NEET PG 2025  ",
      content:"Counselling Expected to Start in October: Complete Process Guide",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counselling-check-expected-start-date-allotment-process-details-here-9364881',
      is_active: true,
      source: '  NDTV',
      created_at: "2025-09-29T08:00:00Z"
    },
    {
      id: 33,
      title: "Karnataka HC ",
      content:"Karnataka HC Dismisses NEET PG 2025 Plea for Category Change After Results Declaration ",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://timesofindia.indiatimes.com/city/raipur/hc-dismisses-plea-challenging-change-in-category-in-neet/articleshow/123571100.cms',
      is_active: true,
      source: '  Times of India',
      created_at: "2025-09-29T08:00:00Z"
    },
    {
      id: 34,
      title: "NEET PG 2025 Counselling: ",
      content:" Expected Mid-October Start Date, Complete Allotment : Medical Counselling Committee expected to release NEET PG 2025 counselling schedule by mid-October 2025 on mcc.nic.in following FAIMA's communication with health ministry. ",
      date: "2025-10-03T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-counselling-2025-check-expected-start-date-allotment-process-top-medical-colleges-9387163',
      is_active: true,
      source: ' NDTV',
      created_at: "2025-10-03T08:00:00Z"
    },
    {
      id: 35,
      title: "MCC Yet to Announce ",
      content:" NEET PG 2025 Counselling Schedule; Medical Aspirants Await Dates : Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet as Supreme Court seeks NBEMS response on transparency issues.",
      date: "2025-10-02T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.etnownews.com/exams-results/neet-pg-counselling-schedule-2025-mcc-yet-to-release-dates-sc-seeks-nbems-reply-on-transparency-plea-article-152931347',
      is_active: true,
      source: '   ET Now News',
      created_at: "2025-10-02T08:00:00Z"
    },
    {
      id: 36,
      title: "NEET PG 2025",
      content:"NEET PG 2025 Counselling Expected to Begin Mid-October: Complete Details",
      date: "2025-10-01T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/neet-pg-2025-counselling-likely-to-start-by-mid-october-details-here-9608658.html',
      is_active: true,
      source: ' News18 ',
      created_at: "2025-10-01T08:00:00Z"
    },
     {
      id: 37,
      title: "Karnataka NEET PG 2025 ",
      content:"Round 1 Registration Begins Today at cetonline.karnataka.gov.in :Karnataka Examination Authority begins NEET PG 2025 counselling round 1 registration today October 4 at 11 AM on cetonline.karnataka.gov.in portal.",
      date: "2025-10-04T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/karnataka-neet-pg-counselling-2025-round-1-registration-at-cetonline-karnataka-gov-in-get-direct-link-here-181412',
      is_active: true,
      source: ' Jagran Josh ',
      created_at: "2025-10-04T08:00:00Z"
    },
     {
      id: 38,
      title: "NEET PG 2025 Counselling Schedule",
      content:"How to Check MCC Updates at mcc.nic.in :Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet; candidates can check mcc.nic.in when dates become available.",
      date: "2025-10-06T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-check-mcc-allotment-process-neet-pg-counselling-2025-schedule-date-latest-news-101759639482477.html',
      is_active: true,
      source: ' Hindustan Times',
      created_at: "2025-10-06T08:00:00Z"
    },
     {
      id: 39,
      title: "NEET PG 2025",
      content:" Counselling Expected to Begin by Mid-October: ",
      date: "2025-10-06T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counelling-expected-to-start-in-third-week-of-october-details-here-9399606',
      is_active: true,
      source: ' NDTV',
      created_at: "2025-10-06T08:00:00Z"
    },
    {
      id: 40,
      title: "NEET PG 2025",
      content:"  Data Breach Alert: NBEMS Officials Respond to Leak Allegations ",
      date: "2025-10-07T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-candidates-data-leaked-heres-what-nbe-said-10290545/',
      is_active: true,
      source: '  Indian Express',
      created_at: "2025-10-07T08:00:00Z"
    },
    {
      id: 41,
      title: "NEET PG 2025",
      content:" NEET PG 2025 Privacy Breach: Student Information Allegedly Sold for Rs 15,000 Online ",
      date: "2025-10-08T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.timesnownews.com/education/neet-pg-2025-data-leak-students-claim-personal-details-sold-online-for-rs-15000-article-152955394',
      is_active: true,
      source: ' Times Now News',
      created_at: "2025-10-08T08:00:00Z"
    },
    {
      id: 42,
      title: "NEET PG 2025",
      content:" NEET PG 2025 Admission Process Stalled by Regulatory Delays and Supreme Court Cases ",
      date: "2025-10-01T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/city/chennai/regulatory-delays-court-battles-stall-neet-pg-admission/articleshow/124398972.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-10-01T08:00:00Z"
    },
    
  ];

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/announcements/');
      if (!response.ok) throw new Error('Failed to fetch announcements');
      const data = await response.json();
      setApiAnnouncements(data.results || []);
      setError(null);
    } catch (err) {
      setError('Failed to load API announcements');
      console.error('Error fetching announcements:', err);
      if (staticAnnouncements.length > 0) {
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const allAnnouncements = [...staticAnnouncements, ...apiAnnouncements]
    .filter(announcement => announcement.is_active !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLinkClick = (link: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">Loading announcements...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl mb-6 md:mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3">
                  <Bell className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold">📢 Announcements</h1>
                  <p className="text-blue-100 mt-1 text-xs md:text-base">Stay updated with NEET PG 2025</p>
                </div>
              </div>
              <button
                onClick={fetchAnnouncements}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full p-2 md:p-3"
              >
                <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Grid Layout */}
        {allAnnouncements.length === 0 && !loading ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="bg-gray-100 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">No Announcements</h3>
            <p className="text-gray-500 text-sm md:text-base">Check back later for updates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {allAnnouncements.map((announcement) => (
              <div
                key={`${announcement.id}-${announcement.category}`}
                onClick={() => setSelectedAnnouncement(announcement)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                  
                  <h2 className="text-base md:text-lg font-bold text-gray-800 mb-2 leading-tight line-clamp-2">
                    {announcement.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                    {announcement.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                      {formatDate(announcement.date)}
                    </span>
                    {announcement.source && (
                      <span className="text-xs text-blue-600 font-medium truncate max-w-[120px]">
                        {announcement.source}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Bar */}
        <div className="mt-6 md:mt-8 bg-white rounded-xl shadow-md p-4 md:p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl md:text-2xl font-bold text-blue-600">{allAnnouncements.length}</div>
              <div className="text-gray-600 text-xs md:text-sm">Total</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-red-600">
                {allAnnouncements.filter(a => a.priority === 'high').length}
              </div>
              <div className="text-gray-600 text-xs md:text-sm">High Priority</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-green-600">
                {allAnnouncements.filter(a => a.category === 'NEET PG').length}
              </div>
              <div className="text-gray-600 text-xs md:text-sm">NEET PG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 md:p-6 text-white flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border border-white/30 bg-white/20`}>
                    {selectedAnnouncement.priority.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 border border-white/30">
                    {selectedAnnouncement.category}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold leading-tight">
                  {selectedAnnouncement.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 flex-shrink-0"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6">
              <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selectedAnnouncement.date)}</span>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                  {selectedAnnouncement.content}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-3">
                {selectedAnnouncement.source && (
                  <span className="text-xs md:text-sm text-gray-500 italic">
                    Source: {selectedAnnouncement.source}
                  </span>
                )}
                {selectedAnnouncement.link && (
                  <button
                    onClick={() => handleLinkClick(selectedAnnouncement.link!)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded-lg px-4 py-2 text-sm md:text-base font-medium"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementPage;