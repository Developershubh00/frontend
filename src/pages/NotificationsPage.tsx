
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

import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  Search,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import {
  Notification,
  formatDisplayDate,
  getRelativeTime,
  sortByDateDesc,
  getUnreadCount,
} from "./notificationsData";

interface NotificationsPageProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onBack: () => void;
  onRefresh?: () => void; // called every 5 s
}

const REFRESH_INTERVAL_MS = 5_000;

const NotificationsPage: React.FC<NotificationsPageProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onBack,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Auto-refresh every 5 seconds ──────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      onRefresh?.();
      setLastRefreshed(new Date());
    }, REFRESH_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onRefresh]);

  // ── Sort newest-first before filtering ───────────────────────────────────
  const sorted = sortByDateDesc(notifications);

  const filtered = sorted.filter((n) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      n.title.toLowerCase().includes(q) ||
      n.message.toLowerCase().includes(q);
    const matchesFilter =
      filterType === "all" ||
      (filterType === "unread" && !n.read) ||
      n.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = getUnreadCount(notifications);

  const filterOptions = [
    { id: "all", label: "All", count: notifications.length },
    { id: "unread", label: "Unread", count: unreadCount },
    {
      id: "urgent",
      label: "Urgent",
      count: notifications.filter((n) => n.type === "urgent").length,
    },
    {
      id: "info",
      label: "Info",
      count: notifications.filter((n) => n.type === "info").length,
    },
  ];

  // ── Icon helpers ──────────────────────────────────────────────────────────
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case "urgent":
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case "success":
        return "from-green-50 to-emerald-50 border-green-200";
      case "warning":
        return "from-yellow-50 to-amber-50 border-yellow-200";
      case "urgent":
        return "from-red-50 to-rose-50 border-red-200";
      default:
        return "from-blue-50 to-indigo-50 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 pt-16">
      <div className="max-w-5xl mx-auto p-4 lg:p-8">

        {/* ── Page Header ───────────────────────────────────────────────── */}
        <div className="mb-6 lg:mb-8">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          {/* Hero banner */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-1">Notifications</h1>
                  <p className="text-blue-100 text-sm lg:text-base">
                    {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                  </p>
                  <p className="text-blue-200 text-xs mt-0.5 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
                    Auto-refreshing every 5s • Last: {lastRefreshed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </div>
              </div>
              <button
                onClick={onMarkAllAsRead}
                className="hidden lg:block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 font-medium"
              >
                Mark All as Read
              </button>
            </div>
          </div>
        </div>

        {/* ── Search & Filters ──────────────────────────────────────────── */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 mb-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilterType(opt.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filterType === opt.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {opt.label}
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {opt.count}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile mark-all */}
          <button
            onClick={onMarkAllAsRead}
            className="lg:hidden w-full mt-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          >
            Mark All as Read
          </button>
        </div>

        {/* ── Notification Cards ────────────────────────────────────────── */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 text-center shadow-lg border border-white/20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                No notifications found
              </h3>
              <p className="text-slate-600">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "You're all caught up!"}
              </p>
            </div>
          ) : (
            filtered.map((notification) => {
              const { date, time } = formatDisplayDate(notification.date);
              const relative = getRelativeTime(notification.date);

              return (
                <div
                  key={notification.id}
                  className={`bg-gradient-to-r ${getTypeBg(notification.type)} backdrop-blur-xl rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    !notification.read ? "ring-2 ring-blue-400/50" : ""
                  }`}
                  onClick={() => {
                    onMarkAsRead(notification.id);
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      {notification.icon ? (
                        <span className="text-2xl">{notification.icon}</span>
                      ) : (
                        getTypeIcon(notification.type)
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3
                          className={`font-bold text-lg ${
                            !notification.read ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                              NEW
                            </span>
                          </div>
                        )}
                      </div>

                      {notification.message && (
                        <p className="text-slate-700 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                      )}

                      {/* Date row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                        <span className="font-semibold text-slate-600">{relative}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span>📅</span>
                          <span>{date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span>🕒</span>
                          <span>{time}</span>
                        </span>
                        {/* Raw ISO (for developers / copy-paste) */}
                        <span className="ml-auto text-xs text-slate-400 font-mono hidden sm:block">
                          {notification.date}
                        </span>
                        {notification.link && (
                          <>
                            <span>•</span>
                            <span className="text-blue-600 font-medium hover:underline">
                              View Details →
                            </span>
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

        {/* Footer count */}
        {filtered.length > 0 && (
          <p className="text-center text-slate-400 text-sm mt-6">
            Showing {filtered.length} of {notifications.length} notification
            {notifications.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;