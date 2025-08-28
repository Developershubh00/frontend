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
  choiceLists: propChoiceLists 
}) => {
  // NEET PG 2025 Updates data
  const neetPGUpdates = [
    {
      id: 1,
      title: "Registration",
      description: "17 Apr 3:00 PM to 7 May, 2025 11:55 PM",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      title: "Resubmit exam centre choice",
      description: "13 to 17 Jun, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      title: "Application edit window",
      description: "20 to 22 Jun, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 4,
      title: "Informing exam city to candidates",
      description: "21 Jul, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 5,
      title: "Issue of admit cards",
      description: "31 Jul, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 6,
      title: "NEET PG 2025 Exam",
      description: "03 Aug, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 7,
      title: "NEET PG 2025 Results",
      description: "Results Announced - Check Now!",
      status: "announced",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      isClickable: true,
    },
    {
      id: 8,
      title: "Counselling",
      description: "Registration Open - Start Now!",
      status: "active",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      isClickable: true,
    },
  ];

  return (
    <div className="h-full w-80 bg-white/95 backdrop-blur-xl border-l border-slate-200/50 z-30 overflow-y-auto">
      <div className="p-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">NEET PG 2025</h2>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors xl:hidden"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* NEET PG Results Announcement */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Results Announced!</h3>
                <p className="text-xs text-green-100">Check your NEET PG 2025 results</p>
              </div>
            </div>
            <button 
              onClick={() => window.open('https://natboard.edu.in/natboard-data/pdf/NEETPG2025RESULT/NEET-PG%202025%20Notice%20Board%20Result%20-%2019.08.2025%20-%20DS.pdf', '_blank')}
              className="w-full mt-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-xs font-medium"
            >
              Check Results Now
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => window.open('https://forms.gle/HE2RyX5CLh7j9FzX9/', '_blank')}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-800">Start Counselling</span>
            </button>
            <button 
              onClick={() => window.location.href = '/pg-predictor'}
              className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-slate-800">Specialty Predictor</span>
            </button>
            {/* <button 
              onClick={() => window.location.href = '/allotments'}
              className="w-full flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-slate-800">View Allotments</span>
            </button> */}
            {/* <button 
              onClick={() => window.location.href = '/closing-ranks'}
              className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-800">Closing Ranks</span>
            </button> */}
          </div>
        </div>

        {/* NEET PG Timeline */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Timeline</h3>
          <div className="space-y-2">
            {neetPGUpdates.slice(0, 8).map((update) => (
              <div key={update.id} className="flex items-start space-x-2">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  update.status === "completed" ? "bg-green-500" :
                  update.status === "announced" ? "bg-green-500 animate-pulse" :
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

        {/* NEET PG Statistics */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Statistics</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-slate-600">Total Registered</span>
              <span className="text-xs font-bold text-blue-700">2,05,179</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-xs text-slate-600">Qualified</span>
              <span className="text-xs font-bold text-green-700">1,63,287</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
              <span className="text-xs text-slate-600">Total Seats</span>
              <span className="text-xs font-bold text-purple-700">51,953</span>
            </div>
          </div>
        </div>

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