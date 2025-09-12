// import React, { useState, useEffect } from 'react';
// import { Calendar, Bell, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

// interface Announcement {
//   id: number;
//   title: string;
//   content: string;
//   date: string;
//   priority: 'low' | 'medium' | 'high';
//   category: string;
//   is_active: boolean;
//   created_at: string;
// }

// const AnnouncementPage: React.FC = () => {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchAnnouncements = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/announcements/');
//       if (!response.ok) throw new Error('Failed to fetch announcements');
//       const data = await response.json();
//       setAnnouncements(data.results || []);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load announcements');
//       console.error('Error fetching announcements:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'border-red-200 bg-red-50 text-red-800';
//       case 'medium': return 'border-blue-200 bg-blue-50 text-blue-800';
//       default: return 'border-blue-200 bg-blue-50 text-blue-800';
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
//                   <p className="text-blue-100 mt-2">Stay updated with the latest information</p>
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
//         {announcements.length === 0 && !loading ? (
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
//               <Bell className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Announcements Today</h3>
//             <p className="text-gray-500">Check back later for updates and important information.</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {announcements.map((announcement) => (
//               <div
//                 key={announcement.id}
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
//                       Posted on {formatDate(announcement.created_at)}
//                     </span>
//                     <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
//                       <span className="text-sm font-medium">Read more</span>
//                       <ExternalLink className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnnouncementPage;

import React, { useState, useEffect } from 'react';
import { Calendar, Bell, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

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

  // Hardcoded NEET PG announcements
  const staticAnnouncements: Announcement[] = [
    {
      id: 1,
      title: "NEET PG 2025:",
      content: " Supreme Court declines to pause counselling; transparency plea listed for hearing next week",
      date: "2025-09-06T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-final-answer-key-supreme-court-plea-response-sheets-natboard-edu-in-nbems-10218766/',
      source: 'Indian Express',  // <-- here
      is_active: true,
      created_at: "2025-09-06T00:00:00Z"
    },
    {
      id: 2,
      title: "NEET PG merit list for 50% AIQ seats out; counselling schedule to follow",
      content: "The National Board of Examinations in Medical Sciences (NBEMS) has released the merit list for 50% All India Quota (AIQ) seats for NEET PG 2025. Candidates can check their merit list status and await further counselling schedule announcements.",
      date: "2025-09-05T16:45:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-05T16:45:00Z"
    },
    // {
    //   id: 3,
    //   title: "Gujarat NEET PG counselling 2025 opens for registration/PIN; tie‑breaking used for 211 applicants",
    //   content: "Gujarat NEET PG counselling 2025 registration has commenced. Candidates can register and obtain their PIN. Tie-breaking procedures have been implemented for 211 applicants with similar scores.",
    //   date: "2025-09-05T09:45:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://www.medadmgujarat.org/pg/home.aspx',
    //   is_active: true,
    //   created_at: "2025-09-05T09:45:00Z"
    // },
    // {
    //   id: 4,
    //   title: "NEET PG 2025 Counselling Dates & Schedule Soon; SC to Hear 'Transparency' Plea Today",
    //   content: "NEET PG 2025 counselling dates and schedule are expected to be announced soon. The Supreme Court is scheduled to hear a transparency plea related to the counselling process today.",
    //   date: "2025-09-04T00:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: '',
    //   is_active: true,
    //   created_at: "2025-09-04T00:00:00Z"
    // },
    {
      id: 5,
      title: "NEET PG 2025 scorecards are now live on the NBEMS portal; candidates may log in to view and download their scorecard/response sheet",
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
      title: "NEET PG merit list for 50% AIQ seats released - Direct access link",
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
      title: "NEET PG 2025:",
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
      title: "NEET PG Counselling 2025 LIVE:",
      content: "MCC to announce AIQ schedule amid Supreme Court case.",
      date: "2025-09-09T10:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-mcc-to-announce-50-aiq-counselling-schedule-soon-sc-hearing-awaited-check-details-here/articleshow/123765991.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-09T10:00:00Z"
    },
    // {
    //   id: 9,
    //   title: "NEET PG 2025 Counselling Updates:",
    //   content: "Supreme Court to review transparency petition on Sept 12; MCC Round 1 schedule awaited.",
    //   date: "2025-09-10T04:00:00Z",
    //   priority: 'high',
    //   category: 'NEET PG',
    //   link: 'https://news.careers360.com/neet-pg-2025-counselling-live-mcc-nic-in-nbems-registration-choice-filling-aiq-seat-allotment-cutoff-supreme-court-hearing-updates',
    //   is_active: true,
    //   created_at: "2025-09-10T06:00:00Z"
    // },
    {
      id: 10,
      title: "NBEMS:",
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
      title: "Registration for Tamil Nadu NEET PG 2025",
      content: "Registration for Tamil Nadu NEET PG 2025 has begun deadline to apply is September 16 on the official site.",
      date: "2025-09-10T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://tnmedicalselection.net',
      is_active: true,
      source: 'TN MEDICAL',
      created_at: "2025-09-10T08:00:00Z"
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
      // Don't show error if we have static announcements to show
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

  // Combine and sort announcements by date (newest first)
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLinkClick = (link: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">Loading announcements...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 via-red-400 to-pink-400 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Bell className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">📢 Announcements</h1>
                  <p className="text-blue-100 mt-2">Stay updated with the latest NEET PG information</p>
                </div>
              </div>
              <button
                onClick={fetchAnnouncements}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full p-3"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Announcements List */}
        {allAnnouncements.length === 0 && !loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Announcements Today</h3>
            <p className="text-gray-500">Check back later for updates and important information.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {allAnnouncements.map((announcement) => (
              <div
                key={`${announcement.id}-${announcement.category}`}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {announcement.category}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(announcement.date)}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                    {announcement.title}
                  </h2>
                  
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {announcement.content}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Posted on {formatDate(announcement.created_at || announcement.date)}
                    </span>
                  <div className="flex items-center space-x-3">
                    {announcement.source && (
                     <span className="text-xs text-gray-500 italic">
                      Source: {announcement.source}
                      </span>
                      )}
                    {announcement.link && (
                      <button 
                        onClick={() => handleLinkClick(announcement.link!)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded-lg px-3 py-1"
                      >
                        <span className="text-sm font-medium">Read more</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                    {/* <span className="text-xs text-gray-400">
                      Posted on {formatDate(announcement.created_at || announcement.date)}
                    </span> */}
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{allAnnouncements.length}</div>
              <div className="text-gray-600 text-sm">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {allAnnouncements.filter(a => a.priority === 'high').length}
              </div>
              <div className="text-gray-600 text-sm">High Priority</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {allAnnouncements.filter(a => a.category === 'NEET PG').length}
              </div>
              <div className="text-gray-600 text-sm">NEET PG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;