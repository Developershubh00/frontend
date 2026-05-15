

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Bell,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from "lucide-react";
import {
  ANNOUNCEMENTS,
  getTodaysAnnouncements,
  type Announcement,
} from "../data/announcements-data";

interface GroupedAnnouncements {
  [year: string]: {
    [month: string]: Announcement[];
  };
}

const AnnouncementPage: React.FC = () => {
  const [apiAnnouncements, setApiAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/announcements/");
      if (!response.ok) throw new Error("Failed to fetch announcements");
      const data = await response.json();
      setApiAnnouncements(data.results || []);
      setError(null);
    } catch (err) {
      setError("Failed to load API announcements");
      console.error("Error fetching announcements:", err);
      // Still set error to null if we have static announcements
      if (ANNOUNCEMENTS.length > 0) {
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Group announcements by year and month
  const groupByYearMonth = (announcements: Announcement[]) => {
    const grouped: GroupedAnnouncements = {};

    announcements.forEach((announcement) => {
      const date = new Date(announcement.date);
      const year = date.getFullYear().toString();
      const month = date.toLocaleDateString("en-US", { month: "long" });

      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][month]) grouped[year][month] = [];
      grouped[year][month].push(announcement);
    });

    return grouped;
  };

  // Combine static and API announcements
  const allAnnouncements = [...ANNOUNCEMENTS, ...apiAnnouncements]
    .filter((announcement) => announcement.is_active !== false)
    .filter((announcement) =>
      searchTerm
        ? announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          announcement.content?.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    )
    .filter((announcement) =>
      filterPriority ? announcement.priority === filterPriority : true,
    )
    .filter((announcement) =>
      filterCategory ? announcement.category === filterCategory : true,
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get today's announcements using helper function
  const todaysAnnouncements = getTodaysAnnouncements();

  const groupedAnnouncements = groupByYearMonth(allAnnouncements);
  const years = Object.keys(groupedAnnouncements).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  // Auto-expand latest year and month
  useEffect(() => {
    if (years.length > 0) {
      const latestYear = years[0];
      const months = Object.keys(groupedAnnouncements[latestYear]);
      if (months.length > 0) {
        setExpandedYears(new Set([latestYear]));
      }
    }
  }, [allAnnouncements.length]);

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleMonth = (year: string, month: string) => {
    const key = `${year}-${month}`;
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedMonths(newExpanded);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-400 bg-gray-50";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300";
      case "medium":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLinkClick = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">
              Loading announcements...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Bell className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">📢 Announcements</h1>
                  <p className="text-blue-100 mt-1">
                    Stay updated with NBE 2026
                  </p>
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

          {/* Search Bar & Filters */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-black border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl text-black border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl text-black border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="NEET PG">NEET PG</option>
                  <option value="FMGE">FMGE</option>
                  <option value="NEET UG">NEET UG</option>
                  <option value="MCC">MCC</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Today's Announcements */}
        {todaysAnnouncements.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-500 px-6 py-4 text-white">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 animate-pulse" />
                <h2 className="text-xl font-bold">Today's Announcements</h2>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {todaysAnnouncements.length}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {todaysAnnouncements.map((announcement) => (
                <div
                  key={`today-${announcement.id}`}
                  onClick={() => setSelectedAnnouncement(announcement)}
                  className={`border-l-4 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${getPriorityColor(
                    announcement.priority,
                  )}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(
                        announcement.priority,
                      )}`}
                    >
                      {announcement.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(announcement.date).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-2 text-base">
                    {announcement.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {announcement.content}
                  </p>

                  <div className="flex items-center justify-between">
                    {announcement.source && (
                      <span className="text-xs text-blue-600 font-medium">
                        {announcement.source}
                      </span>
                    )}
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                      <span>View Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accordion Layout */}
        <div className="space-y-4">
          {years.map((year) => {
            const isYearExpanded = expandedYears.has(year);
            const months = Object.keys(groupedAnnouncements[year]);
            const yearCount = months.reduce(
              (acc, month) => acc + groupedAnnouncements[year][month].length,
              0,
            );

            return (
              <div
                key={year}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Year Header */}
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6" />
                    <span className="text-xl font-bold">Year - {year}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {yearCount} announcements
                    </span>
                  </div>
                  {isYearExpanded ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>

                {/* Months */}
                {isYearExpanded && (
                  <div className="border-t border-gray-200">
                    {months.map((month) => {
                      const monthKey = `${year}-${month}`;
                      const isMonthExpanded = expandedMonths.has(monthKey);
                      const announcements = groupedAnnouncements[year][month];

                      return (
                        <div
                          key={monthKey}
                          className="border-b border-gray-100 last:border-b-0"
                        >
                          {/* Month Header */}
                          <button
                            onClick={() => toggleMonth(year, month)}
                            className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-all"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <span className="text-lg font-semibold text-gray-800">
                                {month} {year}
                              </span>
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                {announcements.length}
                              </span>
                            </div>
                            {isMonthExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600" />
                            )}
                          </button>

                          {/* Announcements List */}
                          {isMonthExpanded && (
                            <div className="px-6 py-4 space-y-3">
                              {announcements.map((announcement) => (
                                <div
                                  key={announcement.id}
                                  onClick={() =>
                                    setSelectedAnnouncement(announcement)
                                  }
                                  className={`border-l-4 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${getPriorityColor(
                                    announcement.priority,
                                  )}`}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(
                                        announcement.priority,
                                      )}`}
                                    >
                                      {announcement.priority.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatDate(announcement.date)}
                                    </span>
                                  </div>

                                  <h3 className="font-bold text-gray-800 mb-2 text-base">
                                    {announcement.title}
                                  </h3>

                                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {announcement.content}
                                  </p>

                                  <div className="flex items-center justify-between">
                                    {announcement.source && (
                                      <span className="text-xs text-blue-600 font-medium">
                                        {announcement.source}
                                      </span>
                                    )}
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                                      <span>View Details</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {allAnnouncements.length}
              </div>
              <div className="text-gray-600 text-sm">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {allAnnouncements.filter((a) => a.priority === "high").length}
              </div>
              <div className="text-gray-600 text-sm">High Priority</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {
                  allAnnouncements.filter((a) => a.category === "NEET PG")
                    .length
                }
              </div>
              <div className="text-gray-600 text-sm">NEET PG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-white/30 bg-white/20">
                    {selectedAnnouncement.priority.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 border border-white/30">
                    {selectedAnnouncement.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight">
                  {selectedAnnouncement.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selectedAnnouncement.date)}</span>
              </div>

              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedAnnouncement.content}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                {selectedAnnouncement.source && (
                  <span className="text-sm text-gray-500 italic">
                    Source: {selectedAnnouncement.source}
                  </span>
                )}
                {selectedAnnouncement.link && (
                  <button
                    onClick={() => handleLinkClick(selectedAnnouncement.link!)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded-lg px-4 py-2 font-medium"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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

export default AnnouncementPage;
