// import React from 'react';
// import { Bell, X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

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

// interface NotificationPopupProps {
//   notifications: Notification[];
//   isOpen: boolean;
//   onClose: () => void;
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
//   onViewAll: () => void;
// }

// const NotificationPopup: React.FC<NotificationPopupProps> = ({
//   notifications,
//   isOpen,
//   onClose,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onViewAll,
// }) => {
//   if (!isOpen) return null;

//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case 'success':
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case 'warning':
//         return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
//       case 'urgent':
//         return <AlertCircle className="w-5 h-5 text-red-500" />;
//       default:
//         return <Info className="w-5 h-5 text-blue-500" />;
//     }
//   };

//   const getNotificationBgColor = (type: string) => {
//     switch (type) {
//       case 'success':
//         return 'bg-green-50 border-green-200';
//       case 'warning':
//         return 'bg-yellow-50 border-yellow-200';
//       case 'urgent':
//         return 'bg-red-50 border-red-200';
//       default:
//         return 'bg-blue-50 border-blue-200';
//     }
//   };

//   const unreadNotifications = notifications.filter(n => !n.read);
//   const displayNotifications = notifications.slice(0, 5);

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Popup - Mobile Optimized */}
//       <div className="fixed top-16 left-2 right-2 sm:top-20 sm:left-auto sm:right-4 lg:right-6 z-50 w-auto sm:w-[95vw] sm:max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden animate-slideDown">
//         {/* Header - Mobile Optimized */}
//         <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//               <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </div>
//             <div>
//               <h3 className="text-white font-bold text-base sm:text-lg">Notifications</h3>
//               <p className="text-blue-100 text-xs sm:text-sm">
//                 {unreadNotifications.length} unread
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
//           >
//             <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//           </button>
//         </div>

//         {/* Actions - Mobile Optimized */}
//         <div className="p-2 sm:p-3 bg-slate-50/80 border-b border-slate-200/50 flex justify-between items-center">
//           <span className="text-xs sm:text-sm text-slate-600 font-medium">Latest Updates</span>
//           <button
//             onClick={onMarkAllAsRead}
//             className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
//           >
//             Mark all as read
//           </button>
//         </div>

//         {/* Notifications List - Mobile Optimized */}
//         <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
//           {displayNotifications.length === 0 ? (
//             <div className="p-6 sm:p-8 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
//                 <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
//               </div>
//               <p className="text-slate-600 font-medium text-sm sm:text-base">No notifications yet</p>
//               <p className="text-slate-400 text-xs sm:text-sm mt-1">
//                 We'll notify you when something new arrives
//               </p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-200/50">
//               {displayNotifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={`p-3 sm:p-4 hover:bg-slate-50/80 active:bg-slate-100 transition-colors cursor-pointer ${
//                     !notification.read ? 'bg-blue-50/30' : ''
//                   }`}
//                   onClick={() => {
//                     onMarkAsRead(notification.id);
//                     if (notification.link) {
//                       window.location.href = notification.link;
//                     }
//                   }}
//                 >
//                   <div className="flex items-start space-x-2 sm:space-x-3">
//                     <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationBgColor(notification.type)} border`}>
//                       {notification.icon ? (
//                         <span className="text-lg sm:text-xl">{notification.icon}</span>
//                       ) : (
//                         getNotificationIcon(notification.type)
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between mb-1">
//                         <h4 className={`font-semibold text-xs sm:text-sm leading-tight ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
//                           {notification.title}
//                         </h4>
//                         {!notification.read && (
//                           <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1 ml-2" />
//                         )}
//                       </div>
//                       <p className="text-slate-600 text-xs sm:text-sm mb-1.5 sm:mb-2 line-clamp-2 leading-snug">
//                         {notification.message}
//                       </p>
//                       <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs text-slate-400">
//                         <span>{notification.date}</span>
//                         <span>•</span>
//                         <span>{notification.time}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer - Mobile Optimized */}
//         {displayNotifications.length > 0 && (
//           <div className="p-3 sm:p-4 bg-slate-50/80 border-t border-slate-200/50">
//             <button
//               onClick={onViewAll}
//               className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-300 text-sm sm:text-base"
//             >
//               View All Notifications
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default NotificationPopup;

// import React, { useEffect, useRef } from "react";
// import { Bell, X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
// import {
//   Notification,
//   formatDisplayDate,
//   getRelativeTime,
//   sortByDateDesc,
// } from "./notificationsData";

// interface NotificationPopupProps {
//   notifications: Notification[];
//   isOpen: boolean;
//   onClose: () => void;
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
//   onViewAll: () => void;
//   onRefresh?: () => void; // called every 5 s so parent can re-fetch / update state
// }

// const REFRESH_INTERVAL_MS = 5_000;

// const NotificationPopup: React.FC<NotificationPopupProps> = ({
//   notifications,
//   isOpen,
//   onClose,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onViewAll,
//   onRefresh,
// }) => {
//   // ── Auto-refresh every 5 seconds ──────────────────────────────────────────
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     if (!isOpen) return;

//     timerRef.current = setInterval(() => {
//       onRefresh?.();
//     }, REFRESH_INTERVAL_MS);

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isOpen, onRefresh]);

//   if (!isOpen) return null;

//   // ── Sort newest-first, show top 5 ─────────────────────────────────────────
//   const sorted = sortByDateDesc(notifications);
//   const displayNotifications = sorted.slice(0, 5);
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   // ── Icon helpers ──────────────────────────────────────────────────────────
//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case "success":
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case "warning":
//         return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
//       case "urgent":
//         return <AlertCircle className="w-5 h-5 text-red-500" />;
//       default:
//         return <Info className="w-5 h-5 text-blue-500" />;
//     }
//   };

//   const getTypeBg = (type: string) => {
//     switch (type) {
//       case "success":
//         return "bg-green-50 border-green-200";
//       case "warning":
//         return "bg-yellow-50 border-yellow-200";
//       case "urgent":
//         return "bg-red-50 border-red-200";
//       default:
//         return "bg-blue-50 border-blue-200";
//     }
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Popup */}
//       <div className="fixed top-16 left-2 right-2 sm:top-20 sm:left-auto sm:right-4 lg:right-6 z-50 w-auto sm:w-[95vw] sm:max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden animate-slideDown">

//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//               <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </div>
//             <div>
//               <h3 className="text-white font-bold text-base sm:text-lg">Notifications</h3>
//               <p className="text-blue-100 text-xs sm:text-sm">
//                 {unreadCount} unread • auto-refreshing
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
//           >
//             <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//           </button>
//         </div>

//         {/* Sub-header */}
//         <div className="p-2 sm:p-3 bg-slate-50/80 border-b border-slate-200/50 flex justify-between items-center">
//           <span className="text-xs sm:text-sm text-slate-600 font-medium">Latest Updates</span>
//           <button
//             onClick={onMarkAllAsRead}
//             className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
//           >
//             Mark all as read
//           </button>
//         </div>

//         {/* List */}
//         <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
//           {displayNotifications.length === 0 ? (
//             <div className="p-6 sm:p-8 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
//                 <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
//               </div>
//               <p className="text-slate-600 font-medium text-sm sm:text-base">
//                 No notifications yet
//               </p>
//               <p className="text-slate-400 text-xs sm:text-sm mt-1">
//                 We'll notify you when something new arrives
//               </p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-200/50">
//               {displayNotifications.map((notification) => {
//                 const { date, time } = formatDisplayDate(notification.date);
//                 const relative = getRelativeTime(notification.date);

//                 return (
//                   <div
//                     key={notification.id}
//                     className={`p-3 sm:p-4 hover:bg-slate-50/80 active:bg-slate-100 transition-colors cursor-pointer ${
//                       !notification.read ? "bg-blue-50/30" : ""
//                     }`}
//                     onClick={() => {
//                       onMarkAsRead(notification.id);
//                       if (notification.link) {
//                         window.location.href = notification.link;
//                       }
//                     }}
//                   >
//                     <div className="flex items-start space-x-2 sm:space-x-3">
//                       {/* Icon */}
//                       <div
//                         className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeBg(
//                           notification.type
//                         )} border`}
//                       >
//                         {notification.icon ? (
//                           <span className="text-lg sm:text-xl">{notification.icon}</span>
//                         ) : (
//                           getTypeIcon(notification.type)
//                         )}
//                       </div>

//                       {/* Body */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between mb-1">
//                           <h4
//                             className={`font-semibold text-xs sm:text-sm leading-tight ${
//                               !notification.read ? "text-slate-900" : "text-slate-700"
//                             }`}
//                           >
//                             {notification.title}
//                           </h4>
//                           {!notification.read && (
//                             <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1 ml-2" />
//                           )}
//                         </div>

//                         {notification.message && (
//                           <p className="text-slate-600 text-xs sm:text-sm mb-1.5 sm:mb-2 line-clamp-2 leading-snug">
//                             {notification.message}
//                           </p>
//                         )}

//                         {/* Date row: relative + absolute */}
//                         <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mt-1">
//                           <span className="font-medium text-slate-500">{relative}</span>
//                           <span>
//                             {date} • {time}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {displayNotifications.length > 0 && (
//           <div className="p-3 sm:p-4 bg-slate-50/80 border-t border-slate-200/50">
//             <button
//               onClick={onViewAll}
//               className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-300 text-sm sm:text-base"
//             >
//               View All Notifications
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default NotificationPopup;
// import React, { useEffect, useRef } from "react";
// import { Bell, X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
// import {
//   Notification,
//   sortByDateDesc,
//   formatDisplayDate,
//   getRelativeTime,
// } from "../data/notifications";

// interface NotificationPopupProps {
//   notifications: Notification[];
//   isOpen: boolean;
//   onClose: () => void;
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
//   onViewAll: () => void;
//   onRefresh?: () => void;
// }

// const REFRESH_MS = 5_000;

// const NotificationPopup: React.FC<NotificationPopupProps> = ({
//   notifications,
//   isOpen,
//   onClose,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onViewAll,
//   onRefresh,
// }) => {
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // ── 5-second auto-refresh ─────────────────────────────────────────────────
//   useEffect(() => {
//     if (!isOpen) return;
//     timerRef.current = setInterval(() => onRefresh?.(), REFRESH_MS);
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isOpen, onRefresh]);

//   if (!isOpen) return null;

//   // ── Sort by date descending FIRST, then slice top 5 ──────────────────────
//   const sorted = sortByDateDesc(notifications);
//   const top5 = sorted.slice(0, 5);
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const typeIcon = (type: string) => {
//     switch (type) {
//       case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
//       case "urgent":  return <AlertCircle className="w-5 h-5 text-red-500" />;
//       default:        return <Info className="w-5 h-5 text-blue-500" />;
//     }
//   };

//   const typeBg = (type: string) => {
//     switch (type) {
//       case "success": return "bg-green-50 border-green-200";
//       case "warning": return "bg-yellow-50 border-yellow-200";
//       case "urgent":  return "bg-red-50 border-red-200";
//       default:        return "bg-blue-50 border-blue-200";
//     }
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

//       {/* Panel */}
//       <div className="fixed top-16 left-2 right-2 sm:top-20 sm:left-auto sm:right-4 lg:right-6 z-50
//                       w-auto sm:w-[95vw] sm:max-w-md
//                       bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl
//                       border border-slate-200/50 overflow-hidden animate-slideDown">

//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 flex items-center justify-between">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center">
//               <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </div>
//             <div>
//               <h3 className="text-white font-bold text-base sm:text-lg">Notifications</h3>
//               <p className="text-blue-100 text-xs">{unreadCount} unread</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
//           >
//             <X className="w-4 h-4 text-white" />
//           </button>
//         </div>

//         {/* Sub-header */}
//         <div className="px-3 py-2 bg-slate-50/80 border-b border-slate-200/50 flex justify-between items-center">
//           <span className="text-xs text-slate-600 font-medium">Latest Updates</span>
//           <button onClick={onMarkAllAsRead} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
//             Mark all as read
//           </button>
//         </div>

//         {/* List — sorted newest first */}
//         <div className="max-h-[55vh] overflow-y-auto">
//           {top5.length === 0 ? (
//             <div className="p-8 text-center">
//               <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
//               <p className="text-slate-500 text-sm">No notifications yet</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-100">
//               {top5.map((n) => {
//                 const { date, time } = formatDisplayDate(n.date);
//                 const rel = getRelativeTime(n.date);
//                 return (
//                   <div
//                     key={n.id}
//                     className={`p-3 sm:p-4 hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? "bg-blue-50/40" : ""}`}
//                     onClick={() => {
//                       onMarkAsRead(n.id);
//                       if (n.link) window.location.href = n.link;
//                     }}
//                   >
//                     <div className="flex items-start gap-2 sm:gap-3">
//                       {/* Icon */}
//                       <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${typeBg(n.type)}`}>
//                         {n.icon ? <span className="text-lg">{n.icon}</span> : typeIcon(n.type)}
//                       </div>

//                       {/* Body */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between gap-1 mb-0.5">
//                           <h4 className={`text-xs sm:text-sm font-semibold leading-snug ${!n.read ? "text-slate-900" : "text-slate-600"}`}>
//                             {n.title}
//                           </h4>
//                           {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />}
//                         </div>
//                         {n.message && (
//                           <p className="text-slate-500 text-xs line-clamp-2 mb-1">{n.message}</p>
//                         )}
//                         {/* Date: relative + absolute */}
//                         <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mt-1">
//                           <span className="font-medium text-slate-500">{rel}</span>
//                           <span>{date} · {time}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {top5.length > 0 && (
//           <div className="p-3 bg-slate-50/80 border-t border-slate-200/50">
//             <button
//               onClick={onViewAll}
//               className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl
//                          hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all text-sm"
//             >
//               View All Notifications
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default NotificationPopup;

import React, { useEffect, useRef } from "react";
import { Bell, X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import {
  Notification,
  formatDisplayDate,
  getRelativeTime,
} from "../data/notifications";

interface NotificationPopupProps {
  notifications: Notification[]; // already sorted newest-first from notificationsData export
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onViewAll: () => void;
  onRefresh?: () => void;
}

const REFRESH_MS = 5_000;

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onViewAll,
  onRefresh,
}) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── 5-second auto-refresh ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    timerRef.current = setInterval(() => onRefresh?.(), REFRESH_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isOpen, onRefresh]);

  if (!isOpen) return null;

  // notifications prop is already sorted newest-first (processed at export time)
  const top5 = notifications.slice(0, 5);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const typeIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "urgent":  return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const typeBg = (type: string) => {
    switch (type) {
      case "success": return "bg-green-50 border-green-200";
      case "warning": return "bg-yellow-50 border-yellow-200";
      case "urgent":  return "bg-red-50 border-red-200";
      default:        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-16 left-2 right-2 sm:top-20 sm:left-auto sm:right-4 lg:right-6 z-50
                      w-auto sm:w-[95vw] sm:max-w-md
                      bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl
                      border border-slate-200/50 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">Notifications</h3>
              <p className="text-blue-100 text-xs">{unreadCount} unread</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Sub-header */}
        <div className="px-3 py-2 bg-slate-50/80 border-b border-slate-200/50 flex justify-between items-center">
          <span className="text-xs text-slate-600 font-medium">Latest Updates</span>
          <button
            onClick={onMarkAllAsRead}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Mark all as read
          </button>
        </div>

        {/* List */}
        <div className="max-h-[55vh] overflow-y-auto">
          {top5.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {top5.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 sm:p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                    !n.read ? "bg-blue-50/40" : ""
                  }`}
                  onClick={() => {
                    onMarkAsRead(n.id);
                    if (n.link) window.location.href = n.link;
                  }}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${typeBg(n.type)}`}>
                      {n.icon ? <span className="text-lg">{n.icon}</span> : typeIcon(n.type)}
                    </div>

                    {/* Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <h4 className={`text-xs sm:text-sm font-semibold leading-snug ${!n.read ? "text-slate-900" : "text-slate-600"}`}>
                          {n.title}
                        </h4>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {/* isNew badge — mirrors noticeDocuments pattern */}
                          {n.isNew && (
                            <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                          {!n.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                      </div>

                      {n.message && (
                        <p className="text-slate-500 text-xs line-clamp-2 mb-1">{n.message}</p>
                      )}

                      {/* Date: relative + formatted */}
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mt-1">
                        <span className="font-medium text-slate-500">{getRelativeTime(n.date)}</span>
                        <span>{formatDisplayDate(n.date)} · {n.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {top5.length > 0 && (
          <div className="p-3 bg-slate-50/80 border-t border-slate-200/50">
            <button
              onClick={onViewAll}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold
                         rounded-xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all text-sm"
            >
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPopup;