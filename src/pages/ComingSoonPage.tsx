import React from "react";
import {
  ArrowLeft,
  Rocket,
  LayoutDashboard,
  Sparkles,
  Bell,
  Clock,
} from "lucide-react";

interface ComingSoonPageProps {
  onBackToDashboard: () => void;
  featureName?: string; // Optional: Customize what is coming soon (e.g., "Deemed Universities")
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  onBackToDashboard,
  featureName = "this section",
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ── Consistent Header ── */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-3 shadow-md z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToDashboard}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">Coming Soon</h1>
              <p className="text-xs text-blue-100">Data under preparation</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            <span>Updating...</span>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        <div className="relative z-10 text-center max-w-md mx-auto w-full">
          {/* Animated Icon Container */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* Pulsing rings */}
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 bg-blue-400 rounded-full animate-ping opacity-20 animation-delay-500"></div>

            {/* Main Icon Circle */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 border-4 border-white">
              <Rocket className="w-14 h-14 text-white transform -rotate-45" />
            </div>

            {/* Floating Sparkle */}
            {/* <div className="absolute -top-2 -right-2 bg-amber-400 p-2 rounded-full shadow-lg animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
            </div> */}
          </div>

          {/* Text Content */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide">
            <Bell className="w-3 h-3" />
            Work in Progress
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 leading-tight">
            Data for {featureName} <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
              is Coming Soon!
            </span>
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed text-sm sm:text-base px-2">
            We are currently compiling, verifying, and organizing the latest
            counseling data for this section. Our team is working hard to bring
            you the most accurate and up-to-date insights.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {/* Primary CTA: Go to Dashboard */}
            <button
              onClick={onBackToDashboard}
              className="w-full sm:w-auto group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Go to NEET-UG Dashboard
            </button>

            {/* Secondary CTA (Optional Notify Me) */}
            <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-full border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Notify Me
            </button>
          </div>

          {/* Footer Note */}
          <p className="mt-8 text-xs text-gray-400">
            Check back soon or head to the dashboard to explore available 2025
            UG closing ranks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
