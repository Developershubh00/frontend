import React from 'react';
import { Bell, X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'urgent';
  date: string;
  time: string;
  read: boolean;
  link?: string;
  icon?: string;
}

interface NotificationPopupProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onViewAll: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onViewAll,
}) => {
  if (!isOpen) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'urgent':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const displayNotifications = notifications.slice(0, 5);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed top-20 right-4 lg:right-6 z-50 w-[95vw] max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Notifications</h3>
              <p className="text-blue-100 text-sm">
                {unreadNotifications.length} unread
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Actions */}
        <div className="p-3 bg-slate-50/80 border-b border-slate-200/50 flex justify-end">
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[60vh] overflow-y-auto">
          {displayNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No notifications yet</p>
              <p className="text-slate-400 text-sm mt-1">
                We'll notify you when something new arrives
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200/50">
              {displayNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-slate-50/80 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => {
                    onMarkAsRead(notification.id);
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationBgColor(notification.type)} border`}>
                      {notification.icon ? (
                        <span className="text-xl">{notification.icon}</span>
                      ) : (
                        getNotificationIcon(notification.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`font-semibold text-sm ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 ml-2" />
                        )}
                      </div>
                      <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span>{notification.date}</span>
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {displayNotifications.length > 0 && (
          <div className="p-4 bg-slate-50/80 border-t border-slate-200/50">
            <button
              onClick={onViewAll}
              className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
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