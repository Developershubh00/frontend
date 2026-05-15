

import React, { useState, useEffect } from "react";
import {
  Bell,
  ChevronRight,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  getRecentAnnouncements,
  type Announcement,
} from "../data/announcements-data";

interface AnnouncementSummary {
  id: number;
  title: string;
  date: string;
  priority: "low" | "medium" | "high";
  category: string;
  link?: string;
  source?: string;
}

interface AnnouncementSidebarProps {
  onAnnouncementClick?: (id: number) => void;
}

const AnnouncementSidebar: React.FC<AnnouncementSidebarProps> = ({
  onAnnouncementClick,
}) => {
  const [announcements, setAnnouncements] = useState<AnnouncementSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentAnnouncements = async () => {
    try {
      setLoading(true);

      // Simulate API call - replace with actual API endpoint if needed
      // const response = await fetch('/api/announcements/?limit=10');
      // if (!response.ok) throw new Error('Failed to fetch announcements');
      // const data = await response.json();

      // Using centralized data source
      setTimeout(() => {
        const recentAnnouncements = getRecentAnnouncements(10);

        // Map to AnnouncementSummary format
        const summaries: AnnouncementSummary[] = recentAnnouncements.map(
          (ann) => ({
            id: ann.id,
            title: ann.title,
            date: ann.date,
            priority: ann.priority,
            category: ann.category,
            link: ann.link,
            source: ann.source,
          }),
        );

        setAnnouncements(summaries);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error fetching sidebar announcements:", err);
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
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleAnnouncementClick = (announcement: AnnouncementSummary) => {
    if (announcement.link) {
      window.open(announcement.link, "_blank", "noopener,noreferrer");
    } else if (onAnnouncementClick) {
      onAnnouncementClick(announcement.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-fit max-h-[400px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-300 to-blue-600 rounded-full p-2">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-bold text-gray-800">Recent Updates</h3>
        </div>
        {announcements.length > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {announcements.length > 9 ? "9+" : announcements.length}
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
                  <div
                    className={`w-1 h-1 rounded-full mt-1 flex-shrink-0 ${getPriorityDot(announcement.priority)}`}
                  ></div>
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
              onClick={() => (window.location.href = "/announcements")}
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
