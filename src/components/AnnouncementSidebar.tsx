// import React, { useState, useEffect } from 'react';
// import { Bell, ChevronRight, Calendar, Clock, ExternalLink } from 'lucide-react';

// interface AnnouncementSummary {
//   id: number;
//   title: string;
//   date: string;
//   priority: 'low' | 'medium' | 'high';
//   category: string;
//   link?: string;
// }

// interface AnnouncementSidebarProps {
//   onAnnouncementClick?: (id: number) => void;
// }

// const AnnouncementSidebar: React.FC<AnnouncementSidebarProps> = ({ onAnnouncementClick }) => {
//   const [announcements, setAnnouncements] = useState<AnnouncementSummary[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Mock data with your NEET PG announcement
//   const mockAnnouncements: AnnouncementSummary[] = [
//     {
//       id: 1,
//       title: "NEET PG 2025 Counselling Dates & Schedule Soon; SC to Hear 'Transparency' Plea Today",
//       date: "2025-09-04T00:00:00Z",
//       priority: 'high',
//       category: 'NEET PG',
//       link: 'https://www.example.com/neet-pg-2025-counselling'
//     },
//     // {
//     //   id: 2,
//     //   title: "Medical Entrance Exam Updates",
//     //   date: "2025-09-03T08:30:00Z",
//     //   priority: 'medium',
//     //   category: 'Updates',
//     //   link: 'https://www.example.com/medical-entrance'
//     // },
//     // {
//     //   id: 3,
//     //   title: "Important Guidelines for Students",
//     //   date: "2025-09-02T14:20:00Z",
//     //   priority: 'low',
//     //   category: 'Guidelines'
//     // },
//     // {
//     //   id: 4,
//     //   title: "New Course Registration Open",
//     //   date: "2025-09-01T10:15:00Z",
//     //   priority: 'medium',
//     //   category: 'Registration'
//     // },
//     // {
//     //   id: 5,
//     //   title: "Scholarship Application Deadline",
//     //   date: "2025-08-31T16:45:00Z",
//     //   priority: 'high',
//     //   category: 'Scholarship'
//     // }
//   ];

//   const fetchRecentAnnouncements = async () => {
//     try {
//       setLoading(true);
//       // Simulate API call - replace with actual API endpoint
//       // const response = await fetch('/api/announcements/?limit=10');
//       // if (!response.ok) throw new Error('Failed to fetch announcements');
//       // const data = await response.json();
      
//       // Using mock data for now
//       setTimeout(() => {
//         setAnnouncements(mockAnnouncements);
//         setLoading(false);
//       }, 1000);
      
//     } catch (err) {
//       console.error('Error fetching sidebar announcements:', err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecentAnnouncements();
    
//     // Refresh every 5 minutes
//     const interval = setInterval(fetchRecentAnnouncements, 5 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const getPriorityDot = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'bg-red-500';
//       case 'medium': return 'bg-yellow-500';
//       default: return 'bg-green-500';
//     }
//   };

//   const formatRelativeTime = (dateString: string) => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${diffInHours}h ago`;
//     if (diffInHours < 48) return 'Yesterday';
//     return `${Math.floor(diffInHours / 24)}d ago`;
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const handleAnnouncementClick = (announcement: AnnouncementSummary) => {
//     if (announcement.link) {
//       window.open(announcement.link, '_blank', 'noopener,noreferrer');
//     } else if (onAnnouncementClick) {
//       onAnnouncementClick(announcement.id);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6 h-fit max-h-[600px] flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-3">
//           <div className="bg-gradient-to-r from-blue-400 to-pink-400 rounded-full p-2">
//             <Bell className="w-5 h-5 text-white" />
//           </div>
//           <h3 className="text-lg font-bold text-gray-800">Recent Updates</h3>
//         </div>
//         {announcements.length > 0 && (
//           <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//             {announcements.length > 9 ? '9+' : announcements.length}
//           </span>
//         )}
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <div className="space-y-4 flex-1">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="animate-pulse">
//               <div className="h-4 bg-gray-200 rounded mb-2"></div>
//               <div className="h-3 bg-gray-100 rounded w-3/4"></div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* No Announcements */}
//       {!loading && announcements.length === 0 && (
//         <div className="text-center py-8 flex-1">
//           <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//             <Bell className="w-8 h-8 text-gray-400" />
//           </div>
//           <p className="text-gray-500 text-sm">No announcements today</p>
//         </div>
//       )}
      
//       {/* Announcements List with Scroll */}
//       {!loading && announcements.length > 0 && (
//         <>
//           <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             {announcements.map((announcement) => (
//               <div
//                 key={announcement.id}
//                 onClick={() => handleAnnouncementClick(announcement)}
//                 className="group cursor-pointer border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
//               >
//                 <div className="flex items-start space-x-3">
//                   <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getPriorityDot(announcement.priority)}`}></div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between mb-2">
//                       <h4 className="font-semibold text-gray-800 text-sm leading-5 group-hover:text-blue-800 transition-colors">
//                         {announcement.title}
//                       </h4>
//                       {announcement.link && (
//                         <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors ml-2 flex-shrink-0" />
//                       )}
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                         {announcement.category}
//                       </span>
//                       <div className="flex flex-col items-end text-xs text-gray-400">
//                         <div className="flex items-center">
//                           <Clock className="w-3 h-3 mr-1" />
//                           {formatRelativeTime(announcement.date)}
//                         </div>
//                         <div className="text-xs text-gray-300 mt-1">
//                           {formatDate(announcement.date)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* View All Link */}
//           <div className="pt-4 border-t border-gray-100 mt-4">
//             <button
//               onClick={() => window.location.href = '/announcements'}
//               className="w-full text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center space-x-2 py-2 hover:bg-blue-50 rounded-lg transition-all duration-200"
//             >
//               <span>View All Announcements</span>
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AnnouncementSidebar;

import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, Calendar, Clock, ExternalLink } from 'lucide-react';

interface AnnouncementSummary {
  id: number;
  title: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  link?: string;
  source?: string;
}

interface AnnouncementSidebarProps {
  onAnnouncementClick?: (id: number) => void;
}

const AnnouncementSidebar: React.FC<AnnouncementSidebarProps> = ({ onAnnouncementClick }) => {
  const [announcements, setAnnouncements] = useState<AnnouncementSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data with your NEET PG announcement
  const mockAnnouncements: AnnouncementSummary[] = [
    {
      id: 1,
      title: "NEET PG Supreme Court hearing deferred by two weeks: when to expect the next date",
      date: "2025-09-13T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms',
    },
    {
      id: 2,
      title: "CEE Kerala begins NEET PG 2025 counselling registration for 50% state‑quota MD/MS seats.",
      date: "2025-09-12T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Times of india',
      link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms'
    },
     {
      id: 3,
      title: "NEET PG Counselling 2025: How and where to find the counselling timetable once it’s announced.",
      date: "2025-09-11T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'hindustan Times',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-news-live-mcc-counselling-schedule-round-1-direct-link-seat-allotment-how-to-apply-mcc-nic-in-101757478660284.html'
    },
    {
      id: 4,
      title: "NEET PG 2025 counselling dates coming soon; Supreme Court hears ‘transparency’ plea today.",
      date: "2025-09-11T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Times OF India',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-supreme-court-to-hear-transparency-plea-tomorrow-mcc-counselling-schedule-for-50-aiq-seats-expected-soon/articleshow/123821856.cms'
    },
     {
      id: 5,
      title: "Supreme Court to take up NEET PG 2025 transparency case tomorrow as MCC readies 50% AIQ counselling timeline.",
      date: "2025-09-10T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Times of India',
      link: 'https://www.news18.com/education-career/supreme-court-to-hear-neet-pg-2025-exam-transparency-pleas-on-sept-12-9563884.html'
    },
    {
      id: 6,
      title: "Registration for Tamil Nadu NEET PG 2025 has begun; deadline to apply is September 16 on the official site.",
      date: "2025-09-10T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'TN Medical',
      link: 'https://tnmedicalselection.net'
    },
    {
      id: 7,
      title: "NBEMS to Release NEET PG Counselling 2025 Soon, Check Expected Release Date, Updates here",
      date: "2025-09-10T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Jagran Josh',
      link: 'https://www.jagranjosh.com/news/nbems-to-release-neet-pg-counselling-2025-soon-check-expected-release-date-updates-here-181133'
    },
    // {
    //   id: 3,
    //   title: "NEET PG 2025 Counselling Updates: Supreme Court to review transparency petition on Sept 12; MCC Round 1 schedule awaited",
    //   date: "Sep 10,2025",
    //   priority: 'medium',
    //   category: 'NEET PG',
    //   source: 'Times Of India',
    //   link: 'https://news.careers360.com/neet-pg-2025-counselling-live-mcc-nic-in-nbems-registration-choice-filling-aiq-seat-allotment-cutoff-supreme-court-hearing-updates'
    // },
    {
      id: 8,
      title: "NEET PG 2025: Counselling dates to be announced; 50% AIQ merit list released, with answer key and cutoff updates.",
      date: "2025-09-06T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Times Of India',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-mcc-to-announce-50-aiq-counselling-schedule-soon-sc-hearing-awaited-check-details-here/articleshow/123765991.cms'
    },
    // {
    //   id: 5,
    //   title: "NEET PG Counselling 2025 LIVE: MCC to announce AIQ schedule amid Supreme Court case",
    //   date: "Sep 9,2025",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   source: 'Times Of India',
    //   link: 'https://news.careers360.com/neet-pg-2025-counselling-live-mcc-nic-in-nbems-registration-choice-filling-aiq-seat-allotment-cutoff-supreme-court-hearing-updates'
    // },
    {
      id: 9,
      title: "NEET PG 2025: Supreme Court declines to pause counselling; transparency plea listed for hearing next week.",
      date: "2025-09-06T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Indian Express',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-final-answer-key-supreme-court-plea-response-sheets-natboard-edu-in-nbems-10218766/'
    },
    {
      id: 10,
      title: "NEET PG merit list for 50% AIQ seats out; counselling schedule to follow",
      date: "2025-09-05T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Jagran Josh',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148'
    },
    {
      id: 11,
      title: "Gujarat NEET PG counselling 2025 opens for registration/PIN; tie‑breaking used for 211 applicants.",
      date: "2025-09-05T10:30:00Z",
      priority: 'high',
      category: 'NEET PG',
      source: 'Medad Gujarat',
      link: ' https://www.medadmgujarat.org/pg/home.aspx'
    },
    {
      id: 12,
      title: "NEET PG 2025 Counselling Dates & Schedule Soon; SC to Hear 'Transparency' Plea Today",
      date: "2025-09-04T10:30:00Z",
      priority: 'high',
      category: 'NEET PG',
      source: 'Times Of India',
      link: ''
    },
    {
      id: 13,
      title: "NEET PG 2025 scorecards are now live on the NBEMS portal; candidates may log in to view and download their scorecard/response sheet.",
      date: "2025-08-19T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'NDTV',
      link: 'https://www.ndtv.com/education/neet-pg-2025-scorecard-answer-key-released-download-directly-here-9181634'
    },
    {
      id: 14,
      title: "MCC Yet to Announce NEET PG 2025 Counselling Schedule- Here's How to Check The official NEET PG 2025 AIQ counselling schedule from MCC is still awaited. Candidates must monitor mcc.nic.in for the official PDF and dates.",
      date: "2025-09-16T10:30:00Z",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Hindustan Times',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-schedule-2025-live-update-check-and-download-mcc-nic-in-neet-counselling-schedule-pdf-direct-link-101757917204348.html'
    },
    {
      id: 15,
      title: "Deadline Today: Tamil Nadu NEET PG 2025 Counselling Applications Close at 5 PMTN NEET PG 2025: Final Call for State Counselling Registration",
      date: "2025-09-16T12:30:00Z",
      priority: 'high',
      category: 'NEET PG',
      source: 'Hindustan Times',
      link: 'https://timesofindia.indiatimes.com/education/news/tamil-nadu-neet-pg-2025-counselling-registration-closes-at-5-pm-today-at-tnmedicalselection-net/articleshow/123913827.cms'
    },
    {
      id: 16,
      title: "Tamil Nadu NEET PG 2025 Registration Extended to September 18",
      date: "2025-09-17T12:30:00Z",
      priority: 'high',
      category: 'NEET PG',
      source: 'jagranjosh',
      link: 'https://www.jagranjosh.com/news/tn-neet-pg-counselling-2025-schedule-extended-check-revised-dates-here-181226'
    },
    {
      id: 17,
      title: "Supreme Court to Hear NEET PG 2025 Answer Key Transparency Case Tomorrow",
      date: "2025-09-19T12:30:00Z",
      priority: 'high',
      category: 'NEET PG',
      source: 'news18',
      link: 'https://www.news18.com/education-career/neet-pg-2025-sc-to-hear-petition-on-transparency-of-answer-key-tomorrow-9581587.html'
    },
    {
      id: 18,
      title: "NEET PG 2025: Supreme Court to hear answer key transparency plea on September 23NEET PG Counselling 2025: SC Reschedules Hearing On Answer Key Transparency To September ",
      date: "2025-09-20T12:30:00Z",
      priority: 'high',
      category: 'NEET PG',
      source: 'zeenews',
      link: 'https://zeenews.india.com/education/neet-pg-counselling-2025-sc-reschedules-hearing-on-answer-key-transparency-to-september-23-2962272.html'
    },
    {
      id: 19,
      title: "NEET PG 2025: Supreme Court to hear plea on score discrepancies today",
      date: "2025-09-21T12:30:00Z",
      priority: 'high',
      category: 'NEET PG',
      source: 'hindustantimes',
      link: 'https://www.hindustantimes.com/cities/mumbai-news/irregular-neet-pg-scores-take-medical-students-to-sc-s-door-petition-to-be-heard-today-101758222662559.html'
    },
    {
      id: 20,
      title: "NEET PG 2025: Supreme Court lists transparency plea for hearing on September 23",
      date: "2025-09-21T12:30:00Z",
      priority: 'high',
      category: 'NEET PG',
      source: 'indianexpress',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-supreme-court-transparency-plea-rationalisation-answer-key-counselling-10258787/'
    },
    {
      id: 22,
      title: "MCC NEET PG 2025 Schedule: Where and How to Check When Released The Medical Counselling Committee (MCC) is yet to release the NEET PG 2025 counselling schedule, but candidates can find it on the official MCC website, mcc.nic.in, once it is published. The schedule will be available as a PDF under the PG Medical section, likely in the News & Eventsor Schedule tabs.",
      date: "2025-09-22T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-mcc-neet-pg-counselling-2025-schedule-admission-process-seat-matrix-mcc-nic-in-101758440968818.html',
      source: 'Hindustan Times',
  
    },
    {
      id: 23,
      title: "Supreme Court to Hear NEET PG 2025 Transparency Appeals; Counselling Schedule Expected SoonThe Supreme Court will hear petitions seeking greater transparency in NEET PG 2025, following claims of incomplete answer key disclosures. The Medical Counselling Committee (MCC) is expected to announce the counselling schedule soon after the court’s decision.",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/supreme-court-to-hear-neet-pg-2025-transparency-plea-today-counselling-schedule-soon-9590272.html',
      source: 'news18',
      
    },
    {
      id: 23,
      title: "Supreme Court Telangana HC Permits NEET PG Registration Under NRI Quota for OCI  ",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/city/hyderabad/court-allows-oci-to-register-for-neet-pg/articleshow/124056177.cms',
      
      source: 'Times of India',
      
    },
    {
      id: 24,
      title: "NEET PG 2025 Transparency Hearing Before Supreme Court Today The Supreme Court is hearing a critical plea from NEET PG 2025 candidates who are demanding complete transparency in the scoring process. Aspirants are seeking the full disclosure of question papers and scores to ensure fairness and allow for proper verification of their results.  ",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/supreme-court-neet-pg-2025-transparency-hearing-candidate-response-sheet-answer-key-link-fairness-raw-scores-10264206/',
      
      source: 'indianexpress',
      
    },
    {
      id: 25,
      title: "Supreme Court Hearing Today for NEET PG 2025 Answer Key Transparency The Supreme Court is set to hear a crucial plea today regarding transparency in the NEET PG 2025 answer key, as aspirants seek fair and verifiable results. A decision in this hearing could pave the way for the long-awaited MCC counselling schedule, which remains on hold.",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/net-pg-2025-supreme-court-hearing-on-answer-key-transparency-check-latest-updates-here-181301',
      
      source: 'jagranjosh',
      
    },
    {
      id: 26,
      title: "UP NEET PG 2025: 148 Candidates Barred for Seat Blocking; DGME Releases List",
      date: "2025-09-24T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/city/hyderabad/court-allows-oci-to-register-for-neet-pg/articleshow/124056177.cms',
      source: 'Times of India',
      
    },
    {
      id: 27,
      title: "Government Approves Phase 3 of Medical College Upgradation to Add 10,000+ MBBS and PG Seats ",
      date: "2025-09-25T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/up-neet-pg-counselling-2025-148-candidates-debarred-for-seat-withdrawal-dgme-issues-list/articleshow/124071018.cms',
      source: 'Times of India',
      },
    {
      id: 28,
      title: "NEET PG 2025 Counselling Start Date Expected Soon; Complete Process Guide Here: ",
      date: "2025-09-26T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counselling-expected-start-date-process-details-here-9347182',
      source: ' NDTV',
    },
    {
      id: 29,
      title: "Supreme Court Gives NBEMS Two Weeks to Respond on NEET PG 2025 Transparency Plea:   ",
      date: "2025-09-27T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-hearing-supreme-court-orders-board-to-submit-response-on-transparency-issues-within-two-weeks-181350',
      source: ' jagranjosh',
    },
    {
      id: 30,
      title: "How to Check NEET PG 2025 Counselling Schedule: Step-by-Step Guide :Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet; candidates can check updates on mcc.nic.in when announced",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-supreme-court-hearing-check-mcc-neet-pg-counselling-2025-schedule-latest-update-101758951217299.html',
      source: ' Hindustan Times',
    },
    {
      id: 31,
      title: "SC Notice ",
      date: "2025-09-27T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://economictimes.indiatimes.com/news/india/neet-pg-2025-sc-issues-notice-on-petitions-seeking-publication-of-answer-keys/articleshow/124165012.cms',
      source: '  The Economic Times',
    },
    {
      id: 32,
      title: "NEET PG 2025 Counselling Expected to Start in October: Complete Process Guide",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counselling-check-expected-start-date-allotment-process-details-here-9364881',
      source: '  NDTV',
     },
    {
      id: 33,
      title: "Karnataka HC Karnataka HC Dismisses NEET PG 2025 Plea for Category Change After Results Declaration ",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://timesofindia.indiatimes.com/city/raipur/hc-dismisses-plea-challenging-change-in-category-in-neet/articleshow/123571100.cms',
      source: '  Times of India',
    },
    {
      id: 34,
      title: "NEET PG 2025 Counselling: Expected Mid-October Start Date, Complete Allotment : Medical Counselling Committee expected to release NEET PG 2025 counselling schedule by mid-October 2025 on mcc.nic.in following FAIMA's communication with health ministry. ",
      date: "2025-10-03T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-counselling-2025-check-expected-start-date-allotment-process-top-medical-colleges-9387163',
      source: ' NDTV',
    },
    {
      id: 35,
      title: "MCC Yet to Announce  NEET PG 2025 Counselling Schedule; Medical Aspirants Await Dates : Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet as Supreme Court seeks NBEMS response on transparency issues.",
      date: "2025-10-02T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.etnownews.com/exams-results/neet-pg-counselling-schedule-2025-mcc-yet-to-release-dates-sc-seeks-nbems-reply-on-transparency-plea-article-152931347',
      source: '   ET Now News',
    },
    {
      id: 36,
      title: "NEET PG 2025 NEET PG 2025 Counselling Expected to Begin Mid-October: Complete Details",
      date: "2025-10-01T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/neet-pg-2025-counselling-likely-to-start-by-mid-october-details-here-9608658.html',
     source: ' News18 ',
    },
    {
      id: 37,
      title: "Karnataka NEET PG 2025 Round 1 Registration Begins Today at cetonline.karnataka.gov.in :Karnataka Examination Authority begins NEET PG 2025 counselling round 1 registration today October 4 at 11 AM on cetonline.karnataka.gov.in portal.",
      date: "2025-10-04T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/karnataka-neet-pg-counselling-2025-round-1-registration-at-cetonline-karnataka-gov-in-get-direct-link-here-181412',
      source: ' Jagran Josh ',
    },
     {
      id: 38,
      title: "NEET PG 2025 Counselling Schedule How to Check MCC Updates at mcc.nic.in :Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet; candidates can check mcc.nic.in when dates become available.",
      date: "2025-10-06T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-check-mcc-allotment-process-neet-pg-counselling-2025-schedule-date-latest-news-101759639482477.html',
      source: ' Hindustan Times',
    },
     {
      id: 39,
      title: "NEET PG 2025 Counselling Expected to Begin by Mid-October: ",
      date: "2025-10-01T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counelling-expected-to-start-in-third-week-of-october-details-here-9399606',
      source: ' NDTV',
    },
    {
      id: 40,
      title: "NEET PG 2025 Privacy Breach: Student Information Allegedly Sold for Rs 15,000 Online ",
      date: "2025-10-08T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.timesnownews.com/education/neet-pg-2025-data-leak-students-claim-personal-details-sold-online-for-rs-15000-article-152955394',
      source: ' Times Now News',
      },
      {
      id: 41,
      title: "NEET PG 2025 Admission Process Stalled by Regulatory Delays and Supreme Court Cases ",
      date: "2025-10-01T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/city/chennai/regulatory-delays-court-battles-stall-neet-pg-admission/articleshow/124398972.cms',
      source: 'Times of India',
     },
      {
      id: 42,
      title: " NBEMS Disqualifies 22 NEET PG Candidates for Exam Malpractice Over Five Years ",
      date: "2025-10-09T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-result-cancelled-22-aspirants-disqualified-by-nbems-for-malpractice-in-exams-from-2021-2025/articleshow/124442605.cms ',
      source: 'Times of India',
      },
      {
      id: 43,
      title: " NEET PG 2025 Counselling Start Date: Expected Timeline and Complete Process Guide ",
      date: "2025-10-11T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/when-will-neet-pg-counselling-2025-begin-check-expected-dates-and-details-for-eligible-candidates/articleshow/124413386.cms ',
     source: 'Times of India',
     },
    {
      id: 44,
      title: "NBEMS Disqualifies 33 Medical Candidates: NEET PG and FMGE Results Cancelled for Malpractice",
      date: "2025-10-11T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.timesnownews.com/education/33-medical-aspirants-dreams-shattered-nbems-neet-pg-result-2025-cancellation-fmge-results-scrapped-between-2021-and-2025-unfair-means-use-article-152981611 ',
      source: 'Times Now News',
     },
     {
      id: 45,
      title: " NBEMS Cancels NEET PG Results of 22 Candidates Over Examination Malpractice Allegations",
      date: "2025-10-12T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-result-cancelled-nbems-annuls-results-of-22-candidates-for-malpractice-10298319/ ',
      source: 'Indian Express',
     },
     {
      id: 47,
      title: "NEET PG Counselling 2025: MCC Schedule Expected Soon – Registration Process and Key Dates",
      date: "2025-10-13T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/mcc-neet-pg-counselling-2025-expected-to-release-soon-check-details-here/articleshow/124527012.cms',
      source: 'Times of India',
    },

  ];

  const fetchRecentAnnouncements = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API endpoint
      // const response = await fetch('/api/announcements/?limit=10');
      // if (!response.ok) throw new Error('Failed to fetch announcements');
      // const data = await response.json();
      
      // Using mock data for now
      setTimeout(() => {
        // Sort before setting state (newest first)
      const sorted = [...mockAnnouncements].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

        setAnnouncements(sorted);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error fetching sidebar announcements:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentAnnouncements();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchRecentAnnouncements, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleAnnouncementClick = (announcement: AnnouncementSummary) => {
    if (announcement.link) {
      window.open(announcement.link, '_blank', 'noopener,noreferrer');
    } else if (onAnnouncementClick) {
      onAnnouncementClick(announcement.id);
    }
  };

  

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-fit max-h-[400px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-400 to-pink-400 rounded-full p-2">
            <Bell className="w-2 h-2 text-white" />
          </div>
          <h3 className="text-sm font-bold text-gray-800">Recent Updates</h3>
        </div>
        {announcements.length > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {announcements.length > 9 ? '9+' : announcements.length}
          </span>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4 flex-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      )}

      {/* No Announcements */}
      {!loading && announcements.length === 0 && (
        <div className="text-center py-8 flex-1">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-xs">No announcements today</p>
        </div>
      )}
      
      {/* Announcements List with Scroll */}
      {!loading && announcements.length > 0 && (
        <>
          <div className="space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                onClick={() => handleAnnouncementClick(announcement)}
                className="group cursor-pointer border border-gray-100 rounded-xl p-2 text-xs hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
              >
                <div className="flex items-start space-x-2">
                  <div className={`w-1 h-1 rounded-full mt-1 flex-shrink-0 ${getPriorityDot(announcement.priority)}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-gray-800 text-[10px] leading-5 group-hover:text-blue-800 transition-colors">
                        {announcement.title}
                      </h4>
                      {announcement.link && (
                        <ExternalLink className="w-1 h-1 text-gray-400 group-hover:text-blue-600 transition-colors ml-1 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 bg-gray-100 px-1 py-1 rounded-full">
                        {announcement.category}
                      </span>
                      <div className="flex flex-col items-end text-[10px] text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-1 h-1 mr-1 text-[10px]" />
                          {formatRelativeTime(announcement.date)}
                        </div>
                        <div className="text-[10px] text-gray-300 mt-1">
                          {formatDate(announcement.date)}
                        </div>
                        <div className="flex items-center space-x-3">
                          {announcement.source && (
                          <span className="text-[10px] text-gray-500 italic">
                           Source: {announcement.source}
                          </span>
                          )}
                      </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-2 h-2 text-[10px] text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Link */}
          <div className="pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={() => window.location.href = '/announcements'}
              className="w-full text-blue-600 hover:text-blue-800 font-medium text-[10px] flex items-center justify-center space-x-2 py-2 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <span>View All Announcements</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AnnouncementSidebar;