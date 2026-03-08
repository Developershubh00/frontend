import React from "react";
import { ArrowLeft, Clock } from "lucide-react";

interface Allotments2025PageProps {
  onBack: () => void;
}

/**
 * Allotments2025Page
 *
 * Currently shows "Coming Soon" while 2025 data is being prepared.
 *
 * WHEN 2025 DATA IS READY:
 * Replace the content inside the white card below with the full
 * AllotmentsPage table logic, pointing to your 2025 API endpoint.
 * Keep the header and onBack button unchanged.
 */
const Allotments2025Page: React.FC<Allotments2025PageProps> = ({ onBack }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">NEET PG Allotments</h1>
            <p className="text-xs text-blue-100">2025 Session</p>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-5">
            <Clock className="w-10 h-10 text-blue-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            2025 Allotment Data
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            We're preparing the latest 2025 NEET PG seat allotment data.
            It will appear here as soon as it's officially published by MCC.
          </p>
          <div className="flex justify-center gap-1.5 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Allotments2025Page;