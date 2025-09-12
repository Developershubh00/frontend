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
      title: "CEE Kerala begins NEET PG 2025 counselling registration for 50% state‑quota MD/MS seats.",
      date: "Sep 12,2025",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Times of india',
      link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms'
    },
     {
      id: 2,
      title: "NEET PG Counselling 2025: How and where to find the counselling timetable once it’s announced.",
      date: "Sep 11,2025",
      priority: 'medium',
      category: 'NEET PG',
      source: 'hindustan Times',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-news-live-mcc-counselling-schedule-round-1-direct-link-seat-allotment-how-to-apply-mcc-nic-in-101757478660284.html'
    },
    {
      id: 3,
      title: "NEET PG 2025 counselling dates coming soon; Supreme Court hears ‘transparency’ plea today.",
      date: "Sep 11,2025",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Times OF India',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-supreme-court-to-hear-transparency-plea-tomorrow-mcc-counselling-schedule-for-50-aiq-seats-expected-soon/articleshow/123821856.cms'
    },
     {
      id: 4,
      title: "Supreme Court to take up NEET PG 2025 transparency case tomorrow as MCC readies 50% AIQ counselling timeline.",
      date: "Sep 10,2025",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Times of India',
      link: 'https://www.news18.com/education-career/supreme-court-to-hear-neet-pg-2025-exam-transparency-pleas-on-sept-12-9563884.html'
    },
    {
      id: 5,
      title: "Registration for Tamil Nadu NEET PG 2025 has begun; deadline to apply is September 16 on the official site.",
      date: "Sep 10,2025",
      priority: 'medium',
      category: 'NEET PG',
      source: 'TN Medical',
      link: 'https://tnmedicalselection.net'
    },
    {
      id: 6,
      title: "NBEMS to Release NEET PG Counselling 2025 Soon, Check Expected Release Date, Updates here",
      date: "Sep 10,2025",
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
      id: 7,
      title: "NEET PG 2025: Counselling dates to be announced; 50% AIQ merit list released, with answer key and cutoff updates.",
      date: "Sep 9,2025",
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
      id: 8,
      title: "NEET PG 2025: Supreme Court declines to pause counselling; transparency plea listed for hearing next week.",
      date: "Sep 6, 2025",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Indian Express',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-final-answer-key-supreme-court-plea-response-sheets-natboard-edu-in-nbems-10218766/'
    },
    {
      id: 9,
      title: "NEET PG merit list for 50% AIQ seats out; counselling schedule to follow",
      date: "Sep 5, 2025",
      priority: 'medium',
      category: 'NEET PG',
      source: 'Jagran Josh',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148'
    },
    {
      id: 10,
      title: "Gujarat NEET PG counselling 2025 opens for registration/PIN; tie‑breaking used for 211 applicants.",
      date: "Sep 5, 2025",
      priority: 'high',
      category: 'NEET PG',
      source: 'Medad Gujarat',
      link: ' https://www.medadmgujarat.org/pg/home.aspx'
    },
    {
      id: 11,
      title: "NEET PG 2025 Counselling Dates & Schedule Soon; SC to Hear 'Transparency' Plea Today",
      date: "Sep 4, 2025",
      priority: 'high',
      category: 'NEET PG',
      source: 'Times Of India',
      link: ''
    },
    {
      id: 12,
      title: "NEET PG 2025 scorecards are now live on the NBEMS portal; candidates may log in to view and download their scorecard/response sheet.",
      date: "Aug 29,2025",
      priority: 'medium',
      category: 'NEET PG',
      source: 'NDTV',
      link: 'https://www.ndtv.com/education/neet-pg-2025-scorecard-answer-key-released-download-directly-here-9181634'
    },
    // {
    //   id: 9
    //   title: "NEET PG 2025 Counselling Updates: Supreme Court to review transparency petition on Sept 12; MCC Round 1 schedule awaited",
    //   date: "Sep 10,2025",
    //   priority: 'medium',
    //   category: 'NEET PG',
    //   link: 'https://news.careers360.com/neet-pg-2025-counselling-live-mcc-nic-in-nbems-registration-choice-filling-aiq-seat-allotment-cutoff-supreme-court-hearing-updates'
    // },
    // {
    //   id: 2,
    //   title: "NEET PG Counselling 2025 LIVE: MCC to announce AIQ schedule amid Supreme Court case",
    //   date: "Sep 9,2025",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://news.careers360.com/neet-pg-2025-counselling-live-mcc-nic-in-nbems-registration-choice-filling-aiq-seat-allotment-cutoff-supreme-court-hearing-updates'
    // },
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
        setAnnouncements(mockAnnouncements);
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