import React, { useState } from "react";
import {
  Star,
  TrendingUp,
  X,
  Calendar,
  Clock,
  CheckCircle,
  Award,
  Users,
  Target,
  Circle,
  CheckCircle2,
} from "lucide-react";
import { ExternalLink } from "lucide-react";
import AnnouncementSidebar from "../components/AnnouncementSidebar";

/**
 * Right Sidebar Component
 * Contains Announcements and INI CET 2026 Timeline
 */
interface InicetRightSideBarProps {
  isOpen: boolean;
  onToggle: () => void;
  choiceLists?: any[];
}

const InicetRightSideBar: React.FC<InicetRightSideBarProps> = ({
  isOpen,
  onToggle,
  choiceLists: propChoiceLists,
}) => {
  // INI CET 2026 January Session Timeline
  const inicetTimeline = [
    {
      id: 1,
      date: "September 30, 2025",
      event: "Registration Start",
      status: "completed",
    },
    {
      id: 2,
      date: "October 21, 2025 (5 PM)",
      event: "Last Date for Registration",
      status: "completed",
    },
    {
      id: 3,
      date: "October 24 to 26, 2025 (5 PM)",
      event: "Correction Window",
      status: "completed",
    },
    {
      id: 4,
      date: "November 1, 2025",
      event: "Admit Card Release",
      status: "completed",
    },
    {
      id: 5,
      date: "9th November 2025 (Sunday)",
      event: "Exam Date",
      status: "completed",
    },
    {
      id: 6,
      date: "15th November 2025",
      event: "Result Declaration",
      status: "completed",
    },
    {
      id: 7,
      date: "November–December 2025",
      event: "Counselling & Seat Allotment",
      status: "upcoming",
      isHighlight: true,
    },
  ];
  const pdfUrl = "https://example.com/neet-pg-counselling-schedule.pdf"; // Replace with actual PDF URL

  return (
    <div className="h-full w-80 bg-white/95 backdrop-blur-xl border-l border-slate-200/50 z-30 overflow-y-auto">
      <div className="p-4 pt-4 space-y-6">
        {/* 📢 Announcement Section */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center">
            <span className="w-1 h-4 bg-purple-600 rounded-full mr-2"></span>
            Announcements
          </h3>
          <AnnouncementSidebar
            onAnnouncementClick={(id) =>
              console.log("Clicked announcement:", id)
            }
          />
        </div>

        {/* INI CET 2026 Timeline Section */}
        <div className="pt-4 border-t border-slate-200">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center">
              <span className="w-1 h-4 bg-blue-600 rounded-full mr-2"></span>
              INI CET 2026 January Session
            </h3>
            <p className="text-xs text-slate-500">Important Dates & Events</p>
          </div>
          {/* PDF Button - Small */}
          {/* <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200 active:scale-95 whitespace-nowrap"
          title="View Official Schedule"
        >
          <span>For Full Schedule</span>
          <ExternalLink className="w-3 h-3" />
        </a> */}
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {/* {inicetTimeline.map((item, index)  */}
          {[...inicetTimeline].reverse().map((item, index) => (
            <div key={item.id} className="relative">
              {/* Timeline connector line */}
              {index !== inicetTimeline.length - 1 && (
                <div className="absolute left-[7px] top-6 w-0.5 h-8 bg-slate-200"></div>
              )}

              <div
                className={`flex items-start space-x-3 ${
                  item.isHighlight
                    ? "bg-blue-50 border border-blue-200 rounded-lg p-2 -ml-2"
                    : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 mt-0.5">
                  {item.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  ) : item.isHighlight ? (
                    <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-semibold ${
                      item.status === "completed"
                        ? "text-slate-600"
                        : item.isHighlight
                        ? "text-blue-900"
                        : "text-slate-800"
                    }`}
                  >
                    {item.event}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      item.status === "completed"
                        ? "text-slate-400"
                        : item.isHighlight
                        ? "text-blue-700"
                        : "text-slate-500"
                    }`}
                  >
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Card */}
        <div className="mt-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
          <div className="flex items-start space-x-2">
            <Calendar className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-800">
                Stay Updated
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Check official INI CET website for the latest updates and
                notifications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NEET PG Results Card (Optional - can be removed if not needed) */}
    </div>
  );
};

export default InicetRightSideBar;
