

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
      case "success": return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "urgent":  return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const typeBg = (type: string) => {
    switch (type) {
      case "success": return "bg-blue-50 border-blue-200";
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
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-4 flex items-center justify-between">
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
            <div className="p-8 text-center ">
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
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold
                         rounded-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all text-sm"
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