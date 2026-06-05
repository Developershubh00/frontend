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
} from "lucide-react";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import AnnouncementSidebar from "./AnnouncementSidebar";
/**
 * Right Sidebar Component
 * Contains NEET PG 2025 Updates and Quick Actions sections
 * Always visible with static content
 */
interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  choiceLists?: any[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  isOpen,
  onToggle,
  choiceLists: propChoiceLists,
}) => {
  // NEET PG 2025 Updates data
  // const neetPGUpdates = [
  //   {
  //     id: 1,
  //     title: "Registration",
  //     description: "17 Apr 3:00 PM to 7 May, 2025 11:55 PM",
  //     status: "completed",
  //     icon: CheckCircle,
  //     color: "text-blue-600",
  //     bgColor: "bg-blue-100",
  //   },
  //   {
  //     id: 2,
  //     title: "Resubmit exam centre choice",
  //     description: "13 to 17 Jun, 2025",
  //     status: "completed",
  //     icon: CheckCircle,
  //     color: "text-blue-600",
  //     bgColor: "bg-blue-100",
  //   },
  //   {
  //     id: 3,
  //     title: "Application edit window",
  //     description: "20 to 22 Jun, 2025",
  //     status: "completed",
  //     icon: CheckCircle,
  //     color: "text-blue-600",
  //     bgColor: "bg-blue-100",
  //   },
  //   {
  //     id: 4,
  //     title: "Informing exam city to candidates",
  //     description: "21 Jul, 2025",
  //     status: "completed",
  //     icon: CheckCircle,
  //     color: "text-blue-600",
  //     bgColor: "bg-blue-100",
  //   },
  //   {
  //     id: 5,
  //     title: "Issue of admit cards",
  //     description: "31 Jul, 2025",
  //     status: "completed",
  //     icon: CheckCircle,
  //     color: "text-blue-600",
  //     bgColor: "bg-blue-100",
  //   },
  //   {
  //     id: 6,
  //     title: "NEET PG 2025 Exam",
  //     description: "03 Aug, 2025",
  //     status: "completed",
  //     icon: CheckCircle,
  //     color: "text-blue-600",
  //     bgColor: "bg-blue-100",
  //   },
  //   {
  //     id: 7,
  //     title: "NEET PG 2025 Results",
  //     description: "Results Announced - Check Now!",
  //     status: "announced",
  //     icon: CheckCircle,
  //     color: "text-blue-600",
  //     bgColor: "bg-blue-100",
  //     isClickable: true,
  //   },
  //   {
  //     id: 8,
  //     title: "Counselling",
  //     description: "Registration Open - Start Now!",
  //     status: "active",
  //     icon: Clock,
  //     color: "text-blue-600",
  //     bgColor: "bg-blue-100",
  //     isClickable: true,
  //   },
  // ];
  // const neetPGUpdates = [
  //   {
  //     id: 1,
  //     date: "September 30, 2025",
  //     event: "Registration Start",
  //     status: "completed",
  //   },
  //   {
  //     id: 2,
  //     date: "October 21, 2025 (5 PM)",
  //     event: "Last Date for Registration",
  //     status: "completed",
  //   },
  //   {
  //     id: 3,
  //     date: "October 24 to 26, 2025 (5 PM)",
  //     event: "Correction Window",
  //     status: "completed",
  //   },
  //   {
  //     id: 4,
  //     date: "November 1, 2025",
  //     event: "Admit Card Release",
  //     status: "completed",
  //   },
  //   {
  //     id: 5,
  //     date: "9th November 2025 (Sunday)",
  //     event: "Exam Date",
  //     status: "completed",
  //   },
  //   {
  //     id: 6,
  //     date: "15th November 2025",
  //     event: "Result Declaration",
  //     status: "completed",
  //   },
  //   {
  //     id: 7,
  //     date: "17th Oct '25 to 9th Dec '25",
  //     event: "1st Round of Counselling",
  //     status: "completed",
  //   },
  //   {
  //     id: 8,
  //     date: "1st Dec '25 to 7th Dec '25",
  //     event: "Last Date of Joining (Round 1)",
  //     status: "completed",
  //   },
  //   {
  //     id: 9,
  //     date: "5th Dec '25 to 29th Dec '25",
  //     event: "2nd Round of Counselling",
  //     status: "completed",
  //     // isHighlight: true,
  //   },
  //   {
  //     id: 10,
  //     date: "21st Dec '25 to 28th Dec '25",
  //     event: "Last Date of Joining (Round 2)",
  //     status: "completed",
  //   },
  //   {
  //     id: 11,
  //     date: "22nd Dec '25",
  //     event: "Commencement of New Session",
  //     status: "completed",
  //     // isHighlight: true,
  //   },
  //   {
  //     id: 12,
  //     date: "26th Dec '25 to 19th Jan '26",
  //     event: "Round 3 of Counselling",
  //     status: "completed",
  //     // isHighlight: true,
  //   },
  //   {
  //     id: 13,
  //     date: "11th Jan '26 to 17th Jan '26",
  //     event: "Last Date of Joining (Round 3)",
  //     status: "completed",
  //     // isHighlight: true,
  //   },
  //   {
  //     id: 14,
  //     date: "15th Jan '26 to 24th Jan '26",
  //     event: "Stray Vacancy Round",
  //     status: "upcoming",
  //     isHighlight: true,
  //   },
  //   {
  //     id: 15,
  //     date: "31st Jan '26",
  //     event: "Last Date of Joining (Stray Vacancy)",
  //     status: "upcoming",
  //   },
  // ];
  const neetPGUpdates = [
    {
      id: 1,
      date: "March 2026 (Expected)",
      event: "Registration / Application Form",
      status: "upcoming",
      isHighlight: true,
    },
    {
      id: 2,
      date: "Late March 2026 (Expected)",
      event: "Last Date for Registration",
      status: "upcoming",
    },
    {
      id: 3,
      date: "April 2026 (Expected)",
      event: "Correction Window",
      status: "upcoming",
    },
    {
      id: 4,
      date: "July 30, 2026 (Expected)",
      event: "Admit Card Release",
      status: "upcoming",
    },
    {
      id: 5,
      date: "August 30, 2026 (Confirmed)",
      event: "NEET PG 2026 Exam",
      status: "upcoming",
      isHighlight: true,
    },
    {
      id: 6,
      date: "September 2026 (Tentative)",
      event: "Result Declaration",
      status: "upcoming",
    },
    {
      id: 7,
      date: "September–October 2026 (Tentative)",
      event: "Round 1 Counselling",
      status: "upcoming",
    },
    {
      id: 8,
      date: "October–November 2026 (Tentative)",
      event: "Round 2 Counselling",
      status: "upcoming",
    },
    {
      id: 9,
      date: "November–December 2026 (Tentative)",
      event: "Round 3 & Stray Vacancy Round",
      status: "upcoming",
    },
  ];
  const pdfUrl =
    "https://believersconsultancy.com/data/AIQ_and_State_Schedule_PG_2025_dated_25.11.25.pdf";

  return (
    <div className="h-full w-80 bg-white/95 backdrop-blur-xl border-l border-slate-200/50 z-30 overflow-y-auto mb-6">
      <div className="p-4 pt-4">
        {/* 📢 Announcement Bar */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">
            Announcements
          </h3>
          <AnnouncementSidebar
            onAnnouncementClick={(id) =>
              console.log("Clicked announcement:", id)
            }
          />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-[5px]">
          {/* <h2 className="text-lg font-bold text-slate-800">NEET PG 2025</h2>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors xl:hidden"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button> */}
        </div>

        {/* NEET PG Results Announcement */}
        {/* <div className="mb-6 ">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white-800">NEET PG 2025</h2>
                <h3 className="font-bold text-sm">Results Announced!</h3>
                <p className="text-xs text-blue-100">Check your NEET PG 2025 results</p>
              </div>
            </div>
            <button 
              onClick={() => window.open('https://natboard.edu.in/natboard-data/pdf/NEETPG2025RESULT/NEET-PG%202025%20Notice%20Board%20Result%20-%2019.08.2025%20-%20DS.pdf', '_blank')}
              className="w-full mt-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-xs font-medium"
            >
              Check Results Now
            </button>
          </div>
        </div> */}

        {/* Quick Actions */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Quick Actions</h3> */}
        {/* <div className="space-y-2">
            <button 
              onClick={() => window.open('', '_blank')}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-800">Start Counselling</span>
            </button>
            <button 
              onClick={() => window.location.href = '/predictor/pg'}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-800">Specialty Predictor</span>
            </button> */}
        {/* <button 
              onClick={() => window.location.href = '/allotments'}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-800">View Allotments</span>
            </button> */}
        {/* <button 
              onClick={() => window.location.href = '/closing-ranks'}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-800">Closing Ranks</span>
            </button> */}
        {/* </div>
        </div> */}
        {/* NEET PG Statistics */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">
            Estimated Statistics For NEET PG 2026
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-slate-600">Exam Date</span>
              <span className="text-xs font-bold text-blue-700">
                {" "}
                August 30, 2026
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-slate-600">
                Total Seats (2025 ref.)
              </span>
              <span className="text-xs font-bold text-blue-700">51,953+</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-slate-600">Registration Opens</span>
              <span className="text-xs font-bold text-blue-700">June 2026</span>
            </div>
          </div>
        </div>

        {/* NEET PG Timeline */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Timeline</h3>
          <div className="space-y-2">
            {neetPGUpdates.slice(0, 8).map((update) => (
              <div key={update.id} className="flex items-start space-x-2">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  update.status === "completed" ? "bg-blue-500" :
                  update.status === "announced" ? "bg-blue-500 animate-pulse" :
                  update.status === "active" ? "bg-blue-500 animate-pulse" : "bg-gray-300"
                }`}></div>
                <div className="flex-1">
                  <h4 className="text-xs font-medium text-slate-800">{update.title}</h4>
                  <p className="text-xs text-slate-600">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="pt-4 border-t border-slate-200">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center">
              <span className="w-1 h-4 bg-blue-600 rounded-full mr-2"></span>
              NEET PG 2026 Session
            </h3>
            <p className="text-xs text-slate-500">Important Dates & Events</p>
          </div>
          {/* PDF Button - Small */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200 active:scale-95 whitespace-nowrap"
            title="View Official Schedule"
          >
            <span>For Full Schedule</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="space-y-3">
          {neetPGUpdates.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Timeline connector line */}
              {index !== neetPGUpdates.length - 1 && (
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

        {/* NEET PG Statistics */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Statistics</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-slate-600">Exam Date</span>
              <span className="text-xs font-bold text-blue-700">May 03, 2026</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-slate-600">Total Seats (2025 ref.)</span>
              <span className="text-xs font-bold text-blue-700">51,953+</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-slate-600">Registration Opens</span>
              <span className="text-xs font-bold text-blue-700">April 17, 2025</span>
            </div>
          </div>
        </div> */}

        {/* Important Links */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Important Links</h3>
          <div className="space-y-2">
            <a 
              href="https://nbe.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-xs font-medium text-slate-800">NBE Official Website</span>
            </a>
            <a 
              href="https://mcc.nic.in/pg-medical-counselling/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-xs font-medium text-slate-800">MCC Counselling Portal</span>
            </a>
            <a 
              href="https://natboard.edu.in/natboard-data/pdf/NEETPG2025RESULT/NEET-PG%202025%20Notice%20Board%20Result%20-%2019.08.2025%20-%20DS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span className="text-xs font-medium text-slate-800">Check Results</span>
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RightSidebar;
