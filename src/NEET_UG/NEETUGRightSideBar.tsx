import React from "react";
import { Calendar, Circle, CheckCircle2, ExternalLink } from "lucide-react";
import AnnouncementSidebar from "../components/AnnouncementSidebar";

/**
 * Right Sidebar Component
 * Contains Announcements and NEETUG Timeline
 */
interface NEETUGRightSideBarProps {
  isOpen: boolean;
  onToggle: () => void;
  choiceLists?: any[];
}

const NEETUGRightSideBar: React.FC<NEETUGRightSideBarProps> = ({
  isOpen,
  onToggle,
  choiceLists: propChoiceLists,
}) => {
  // NEETUG Timeline (Updated with actual NEET UG 2025 dates and 2026 Re-Exam)
  const NEETUGTimeline = [
    {
      id: 1,
      date: "February 7, 2025",
      event: "Registration Start",
      status: "completed",
    },
    {
      id: 2,
      date: "March 7, 2025",
      event: "Last Date for Registration",
      status: "completed",
    },
    {
      id: 3,
      date: "April 30, 2025",
      event: "Admit Card Release",
      status: "completed",
    },
    {
      id: 4,
      date: "May 4, 2025 (Sunday)",
      event: "NEET UG 2025 Exam",
      status: "completed",
    },
    {
      id: 5,
      date: "June 21, 2026 (Sunday)",
      event: "RE-NEET UG 2026 Exam",
      status: "completed",
    },
  ];

  // Actual official MCC NEET UG Counselling Schedule PDF URL
  const pdfUrl =
    "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/09/202509011715873107.pdf";

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

        {/* NEETUG Timeline Section */}
        <div className="pt-4 border-t border-slate-200">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center">
              <span className="w-1 h-4 bg-blue-600 rounded-full mr-2"></span>
              NEET UG Timeline
            </h3>
            <p className="text-xs text-slate-500">Important Dates & Events</p>
          </div>

          {/* PDF Button - Small */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200 active:scale-95 whitespace-nowrap mb-4"
            title="View Official MCC Schedule"
          >
            <span>View Full Counselling Schedule</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {[...NEETUGTimeline].reverse().map((item, index) => (
            <div key={item.id} className="relative">
              {/* Timeline connector line */}
              {index !== NEETUGTimeline.length - 1 && (
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
                Check the official NTA (
                <span className="font-medium">neet.nta.nic.in</span>) and MCC (
                <span className="font-medium">mcc.nic.in</span>) websites for
                the latest notifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NEETUGRightSideBar;
