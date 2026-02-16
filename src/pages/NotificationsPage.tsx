
// import React, { useState } from 'react';
// import { Bell, CheckCircle, Info, AlertTriangle, AlertCircle, Search, ArrowLeft } from 'lucide-react';
// import 'react/jsx-runtime';

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: 'info' | 'success' | 'warning' | 'urgent';
//   date: string;
//   time: string;
//   read: boolean;
//   link?: string;
//   icon?: string;
// }

// interface NotificationsPageProps {
//   notifications: Notification[];
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
//   onBack: () => void;
// }

// const NotificationsPage: React.FC<NotificationsPageProps> = ({
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onBack,
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState<string>('all');

//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case 'success':
//         return <CheckCircle className="w-6 h-6 text-green-500" />;
//       case 'warning':
//         return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
//       case 'urgent':
//         return <AlertCircle className="w-6 h-6 text-red-500" />;
//       default:
//         return <Info className="w-6 h-6 text-blue-500" />;
//     }
//   };

//   const getNotificationBgColor = (type: string) => {
//     switch (type) {
//       case 'success':
//         return 'from-green-50 to-emerald-50 border-green-200';
//       case 'warning':
//         return 'from-yellow-50 to-amber-50 border-yellow-200';
//       case 'urgent':
//         return 'from-red-50 to-rose-50 border-red-200';
//       default:
//         return 'from-blue-50 to-indigo-50 border-blue-200';
//     }
//   };

//   // Filter and search notifications
//   const filteredNotifications = notifications.filter(notification => {
//     const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          notification.message.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilter = filterType === 'all' || 
//                          (filterType === 'unread' && !notification.read) ||
//                          notification.type === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   const unreadCount = notifications.filter(n => !n.read).length;

//   const filterOptions = [
//     { id: 'all', label: 'All', count: notifications.length },
//     { id: 'unread', label: 'Unread', count: unreadCount },
//     { id: 'urgent', label: 'Urgent', count: notifications.filter(n => n.type === 'urgent').length },
//     { id: 'info', label: 'Info', count: notifications.filter(n => n.type === 'info').length },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 pt-16">
//       <div className="max-w-5xl mx-auto p-4 lg:p-8">
//         {/* Page Header */}
//         <div className="mb-6 lg:mb-8">
//           <button
//             onClick={onBack}
//             className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="font-medium">Back to Dashboard</span>
//           </button>

//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-xl">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                   <Bell className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl lg:text-3xl font-bold mb-1">
//                     Notifications
//                   </h1>
//                   <p className="text-blue-100 text-sm lg:text-base">
//                     {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={onMarkAllAsRead}
//                 className="hidden lg:block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 font-medium"
//               >
//                 Mark All as Read
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 mb-6">
//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search notifications..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Filter Tabs */}
//           <div className="flex flex-wrap gap-2">
//             {filterOptions.map((option) => (
//               <button
//                 key={option.id}
//                 onClick={() => setFilterType(option.id)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                   filterType === option.id
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
//                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                 }`}
//               >
//                 {option.label}
//                 <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
//                   {option.count}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Mobile Mark All Button */}
//           <button
//             onClick={onMarkAllAsRead}
//             className="lg:hidden w-full mt-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
//           >
//             Mark All as Read
//           </button>
//         </div>

//         {/* Notifications List */}
//         <div className="space-y-4">
//           {filteredNotifications.length === 0 ? (
//             <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 text-center shadow-lg border border-white/20">
//               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Bell className="w-10 h-10 text-slate-400" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-800 mb-2">
//                 No notifications found
//               </h3>
//               <p className="text-slate-600">
//                 {searchQuery ? 'Try adjusting your search or filters' : "You're all caught up!"}
//               </p>
//             </div>
//           ) : (
//             filteredNotifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`bg-gradient-to-r ${getNotificationBgColor(notification.type)} backdrop-blur-xl rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer ${
//                   !notification.read ? 'ring-2 ring-blue-400/50' : ''
//                 }`}
//                 onClick={() => {
//                   onMarkAsRead(notification.id);
//                   if (notification.link) {
//                     window.location.href = notification.link;
//                   }
//                 }}
//               >
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
//                     {notification.icon ? (
//                       <span className="text-2xl">{notification.icon}</span>
//                     ) : (
//                       getNotificationIcon(notification.type)
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between mb-2">
//                       <h3 className={`font-bold text-lg ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
//                         {notification.title}
//                       </h3>
//                       {!notification.read && (
//                         <div className="flex items-center space-x-2">
//                           <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
//                           <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
//                             NEW
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-slate-700 mb-3 leading-relaxed">
//                       {notification.message}
//                     </p>
//                     <div className="flex items-center space-x-4 text-sm text-slate-500">
//                       <span className="flex items-center space-x-1">
//                         <span>📅</span>
//                         <span>{notification.date}</span>
//                       </span>
//                       <span>•</span>
//                       <span className="flex items-center space-x-1">
//                         <span>🕒</span>
//                         <span>{notification.time}</span>
//                       </span>
//                       {notification.link && (
//                         <>
//                           <span>•</span>
//                           <span className="text-blue-600 font-medium hover:underline">
//                             View Details →
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;

// import React, { useState, useEffect, useRef } from "react";
// import {
//   Bell,
//   CheckCircle,
//   Info,
//   AlertTriangle,
//   AlertCircle,
//   Search,
//   ArrowLeft,
//   RefreshCw,
// } from "lucide-react";
// import {
//   Notification,
//   formatDisplayDate,
//   getRelativeTime,
//   sortByDateDesc,
//   getUnreadCount,
// } from "./notificationsData";

// interface NotificationsPageProps {
//   notifications: Notification[];
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
//   onBack: () => void;
//   onRefresh?: () => void; // called every 5 s
// }

// const REFRESH_INTERVAL_MS = 5_000;

// const NotificationsPage: React.FC<NotificationsPageProps> = ({
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onBack,
//   onRefresh,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState<string>("all");
//   const [lastRefreshed, setLastRefreshed] = useState(new Date());

//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // ── Auto-refresh every 5 seconds ──────────────────────────────────────────
//   useEffect(() => {
//     timerRef.current = setInterval(() => {
//       onRefresh?.();
//       setLastRefreshed(new Date());
//     }, REFRESH_INTERVAL_MS);

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [onRefresh]);

//   // ── Sort newest-first before filtering ───────────────────────────────────
//   const sorted = sortByDateDesc(notifications);

//   const filtered = sorted.filter((n) => {
//     const q = searchQuery.toLowerCase();
//     const matchesSearch =
//       n.title.toLowerCase().includes(q) ||
//       n.message.toLowerCase().includes(q);
//     const matchesFilter =
//       filterType === "all" ||
//       (filterType === "unread" && !n.read) ||
//       n.type === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   const unreadCount = getUnreadCount(notifications);

//   const filterOptions = [
//     { id: "all", label: "All", count: notifications.length },
//     { id: "unread", label: "Unread", count: unreadCount },
//     {
//       id: "urgent",
//       label: "Urgent",
//       count: notifications.filter((n) => n.type === "urgent").length,
//     },
//     {
//       id: "info",
//       label: "Info",
//       count: notifications.filter((n) => n.type === "info").length,
//     },
//   ];

//   // ── Icon helpers ──────────────────────────────────────────────────────────
//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case "success":
//         return <CheckCircle className="w-6 h-6 text-green-500" />;
//       case "warning":
//         return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
//       case "urgent":
//         return <AlertCircle className="w-6 h-6 text-red-500" />;
//       default:
//         return <Info className="w-6 h-6 text-blue-500" />;
//     }
//   };

//   const getTypeBg = (type: string) => {
//     switch (type) {
//       case "success":
//         return "from-green-50 to-emerald-50 border-green-200";
//       case "warning":
//         return "from-yellow-50 to-amber-50 border-yellow-200";
//       case "urgent":
//         return "from-red-50 to-rose-50 border-red-200";
//       default:
//         return "from-blue-50 to-indigo-50 border-blue-200";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 pt-16">
//       <div className="max-w-5xl mx-auto p-4 lg:p-8">

//         {/* ── Page Header ───────────────────────────────────────────────── */}
//         <div className="mb-6 lg:mb-8">
//           {/* Back button */}
//           <button
//             onClick={onBack}
//             className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors group"
//           >
//             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//             <span className="font-medium">Back to Dashboard</span>
//           </button>

//           {/* Hero banner */}
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-xl">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                   <Bell className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl lg:text-3xl font-bold mb-1">Notifications</h1>
//                   <p className="text-blue-100 text-sm lg:text-base">
//                     {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
//                   </p>
//                   <p className="text-blue-200 text-xs mt-0.5 flex items-center gap-1">
//                     <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
//                     Auto-refreshing every 5s • Last: {lastRefreshed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={onMarkAllAsRead}
//                 className="hidden lg:block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 font-medium"
//               >
//                 Mark All as Read
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── Search & Filters ──────────────────────────────────────────── */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 mb-6">
//           {/* Search */}
//           <div className="relative mb-4">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search notifications..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Filter chips */}
//           <div className="flex flex-wrap gap-2">
//             {filterOptions.map((opt) => (
//               <button
//                 key={opt.id}
//                 onClick={() => setFilterType(opt.id)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                   filterType === opt.id
//                     ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
//                     : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                 }`}
//               >
//                 {opt.label}
//                 <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
//                   {opt.count}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Mobile mark-all */}
//           <button
//             onClick={onMarkAllAsRead}
//             className="lg:hidden w-full mt-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
//           >
//             Mark All as Read
//           </button>
//         </div>

//         {/* ── Notification Cards ────────────────────────────────────────── */}
//         <div className="space-y-4">
//           {filtered.length === 0 ? (
//             <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 text-center shadow-lg border border-white/20">
//               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Bell className="w-10 h-10 text-slate-400" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-800 mb-2">
//                 No notifications found
//               </h3>
//               <p className="text-slate-600">
//                 {searchQuery
//                   ? "Try adjusting your search or filters"
//                   : "You're all caught up!"}
//               </p>
//             </div>
//           ) : (
//             filtered.map((notification) => {
//               const { date, time } = formatDisplayDate(notification.date);
//               const relative = getRelativeTime(notification.date);

//               return (
//                 <div
//                   key={notification.id}
//                   className={`bg-gradient-to-r ${getTypeBg(notification.type)} backdrop-blur-xl rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer ${
//                     !notification.read ? "ring-2 ring-blue-400/50" : ""
//                   }`}
//                   onClick={() => {
//                     onMarkAsRead(notification.id);
//                     if (notification.link) {
//                       window.location.href = notification.link;
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-4">
//                     {/* Icon */}
//                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
//                       {notification.icon ? (
//                         <span className="text-2xl">{notification.icon}</span>
//                       ) : (
//                         getTypeIcon(notification.type)
//                       )}
//                     </div>

//                     {/* Body */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between mb-2">
//                         <h3
//                           className={`font-bold text-lg ${
//                             !notification.read ? "text-slate-900" : "text-slate-700"
//                           }`}
//                         >
//                           {notification.title}
//                         </h3>
//                         {!notification.read && (
//                           <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
//                             <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
//                             <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
//                               NEW
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       {notification.message && (
//                         <p className="text-slate-700 mb-3 leading-relaxed">
//                           {notification.message}
//                         </p>
//                       )}

//                       {/* Date row */}
//                       <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
//                         <span className="font-semibold text-slate-600">{relative}</span>
//                         <span>•</span>
//                         <span className="flex items-center space-x-1">
//                           <span>📅</span>
//                           <span>{date}</span>
//                         </span>
//                         <span>•</span>
//                         <span className="flex items-center space-x-1">
//                           <span>🕒</span>
//                           <span>{time}</span>
//                         </span>
//                         {/* Raw ISO (for developers / copy-paste) */}
//                         <span className="ml-auto text-xs text-slate-400 font-mono hidden sm:block">
//                           {notification.date}
//                         </span>
//                         {notification.link && (
//                           <>
//                             <span>•</span>
//                             <span className="text-blue-600 font-medium hover:underline">
//                               View Details →
//                             </span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Footer count */}
//         {filtered.length > 0 && (
//           <p className="text-center text-slate-400 text-sm mt-6">
//             Showing {filtered.length} of {notifications.length} notification
//             {notifications.length !== 1 ? "s" : ""}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;

import React, { useState, useEffect, useRef } from "react";
import {
  Bell, CheckCircle, Info, AlertTriangle, AlertCircle,
  Search, ArrowLeft, RefreshCw,
} from "lucide-react";
import {
  Notification,
  sortByDateDesc,
  formatDisplayDate,
  getRelativeTime,
  getUnreadCount,
} from "./notificationsData";

interface NotificationsPageProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onBack: () => void;
  onRefresh?: () => void;
}

const REFRESH_MS = 5_000;

const NotificationsPage: React.FC<NotificationsPageProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onBack,
  onRefresh,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── 5-second auto-refresh ─────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      onRefresh?.();
      setLastRefreshed(new Date());
    }, REFRESH_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [onRefresh]);

  // ── Sort by date DESCENDING first, then filter/search ────────────────────
  const sorted = sortByDateDesc(notifications);

  const filtered = sorted.filter((n) => {
    const q = search.toLowerCase();
    const matchSearch = n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    const matchFilter =
      filter === "all" ||
      (filter === "unread" && !n.read) ||
      n.type === filter;
    return matchSearch && matchFilter;
  });

  const unread = getUnreadCount(notifications);

  const tabs = [
    { id: "all",    label: "All",    count: notifications.length },
    { id: "unread", label: "Unread", count: unread },
    { id: "urgent", label: "Urgent", count: notifications.filter((n) => n.type === "urgent").length },
    { id: "info",   label: "Info",   count: notifications.filter((n) => n.type === "info").length },
  ];

  const typeIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "warning": return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case "urgent":  return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const typeBg = (type: string) => {
    switch (type) {
      case "success": return "from-green-50 to-emerald-50 border-green-200";
      case "warning": return "from-yellow-50 to-amber-50 border-yellow-200";
      case "urgent":  return "from-red-50 to-rose-50 border-red-200";
      default:        return "from-blue-50 to-indigo-50 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 pt-16">
      <div className="max-w-5xl mx-auto p-4 lg:p-8">

        {/* ── Back button ───────────────────────────────────────────────── */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* ── Hero banner ───────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-xl mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Notifications</h1>
                <p className="text-blue-100 text-sm mt-0.5">
                  {unread} unread · {notifications.length} total
                </p>
                <p className="text-blue-200 text-xs mt-1 flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3" style={{ animation: "spin 3s linear infinite" }} />
                  Auto-refreshing every 5s · Last:{" "}
                  {lastRefreshed.toLocaleTimeString("en-IN", {
                    hour: "2-digit", minute: "2-digit", second: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={onMarkAllAsRead}
              className="hidden lg:block px-5 py-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition font-medium text-sm"
            >
              Mark All as Read
            </button>
          </div>
        </div>

        {/* ── Search + filter row ───────────────────────────────────────── */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-5 shadow-lg border border-white/20 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === t.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.label}
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{t.count}</span>
              </button>
            ))}
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="lg:hidden w-full mt-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl text-sm"
          >
            Mark All as Read
          </button>
        </div>

        {/* ── Cards — already sorted newest first ───────────────────────── */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white/80 rounded-2xl p-12 text-center shadow border border-white/20">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700 mb-1">No notifications found</h3>
              <p className="text-slate-500 text-sm">
                {search ? "Try adjusting your search or filters" : "You're all caught up!"}
              </p>
            </div>
          ) : (
            filtered.map((n) => {
              const { date, time } = formatDisplayDate(n.date);
              const rel = getRelativeTime(n.date);
              return (
                <div
                  key={n.id}
                  className={`bg-gradient-to-r ${typeBg(n.type)} rounded-2xl p-5 shadow border
                              hover:shadow-md transition-all duration-200 cursor-pointer
                              ${!n.read ? "ring-2 ring-blue-400/40" : ""}`}
                  onClick={() => {
                    onMarkAsRead(n.id);
                    if (n.link) window.location.href = n.link;
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      {n.icon ? <span className="text-2xl">{n.icon}</span> : typeIcon(n.type)}
                    </div>

                    {/* Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-bold text-base leading-snug ${!n.read ? "text-slate-900" : "text-slate-600"}`}>
                          {n.title}
                        </h3>
                        {!n.read && (
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                              NEW
                            </span>
                          </div>
                        )}
                      </div>

                      {n.message && (
                        <p className="text-slate-600 text-sm mb-2 leading-relaxed">{n.message}</p>
                      )}

                      {/* Date row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="font-semibold text-slate-600">{rel}</span>
                        <span>·</span>
                        <span>📅 {date}</span>
                        <span>·</span>
                        <span>🕒 {time}</span>
                        {n.link && (
                          <>
                            <span>·</span>
                            <span className="text-blue-600 font-medium">View Details →</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {filtered.length > 0 && (
          <p className="text-center text-slate-400 text-xs mt-6">
            Showing {filtered.length} of {notifications.length} notifications
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;