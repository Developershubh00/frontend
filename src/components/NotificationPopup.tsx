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

import React, { useState, useEffect } from "react";
import { X, Bell, ExternalLink, CheckCircle, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { notificationsData, getLatestNotifications, Notification } from "../data/notifications";

interface NotificationPopupProps {
  onClose: () => void;
  onViewAllPage: () => void; // Navigate to full notifications page
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  onClose,
  onViewAllPage,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Fetch latest 5 notifications from notifications.ts
  const latest5Notifications = getLatestNotifications(notificationsData, 5);
  const unreadCount = notificationsData.filter((n) => !n.read).length;

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  const handleViewAllClick = () => {
    handleClose();
    // Navigate to full notifications page
    setTimeout(() => {
      onViewAllPage();
    }, 300);
  };

  const getNotificationIcon = (type: string, icon?: string) => {
    if (icon) {
      return <span className="text-2xl">{icon}</span>;
    }
    
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'urgent':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getNotificationBgColor = (type: string, read: boolean) => {
    if (read) {
      return 'from-slate-50 to-slate-100 border-slate-200';
    }
    
    switch (type) {
      case 'success':
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'warning':
        return 'from-yellow-50 to-amber-50 border-yellow-200';
      case 'urgent':
        return 'from-red-50 to-rose-50 border-red-200';
      default:
        return 'from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Notification Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-96 md:w-[32rem] bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 shadow-2xl pointer-events-auto transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Notifications
                </h2>
                <p className="text-xs text-blue-100">
                  Latest 5 updates • {unreadCount} unread
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close notifications"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Notifications List - Latest 5 */}
        <div className="overflow-y-auto h-[calc(100%-10rem)] p-4 space-y-3">
          {latest5Notifications.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 text-center shadow-lg border border-white/20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                No notifications
              </h3>
              <p className="text-slate-600">
                You're all caught up!
              </p>
            </div>
          ) : (
            latest5Notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`bg-gradient-to-r ${getNotificationBgColor(notification.type, notification.read)} backdrop-blur-xl rounded-xl p-4 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in ${
                  !notification.read ? 'ring-2 ring-blue-400/50' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    {getNotificationIcon(notification.type, notification.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`font-bold text-sm leading-tight ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                            NEW
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {notification.message && (
                      <p className="text-xs text-slate-700 mb-3 leading-relaxed line-clamp-2">
                        {notification.message}
                      </p>
                    )}

                    <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{notification.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span>🕒</span>
                        <span>{notification.time}</span>
                      </span>
                      {notification.link && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                            View
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - View All Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl p-4 border-t border-slate-200 shadow-lg">
          <button
            onClick={handleViewAllClick}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>View All Notifications ({notificationsData.length})</span>
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NotificationPopup;