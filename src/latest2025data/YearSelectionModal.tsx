import React from "react";
import { X, Sparkles, Database } from "lucide-react";

interface YearSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectYear: (year: "2025" | "2024", cardId: string) => void;
  cardId: string;
  cardTitle: string;
}

const YearSelectionModal: React.FC<YearSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectYear,
  cardId,
  cardTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-xs font-medium uppercase tracking-wide mb-0.5">
                Select Year
              </p>
              <h2 className="text-lg font-bold">{cardTitle}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="p-5 space-y-3">
          {/* 2025 NEW */}
          <button
            onClick={() => onSelectYear("2025", cardId)}
            className="w-full group bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">2025 Data</span>
                  <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Latest counselling session
                </p>
              </div>
              <span className="text-blue-400 font-bold text-lg group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </div>
          </button>

          {/* 2024 & Before */}
          <button
            onClick={() => onSelectYear("2024", cardId)}
            className="w-full group bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">2024 &amp; Before</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    Historical
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Previous years counselling data
                </p>
              </div>
              <span className="text-blue-400 font-bold text-lg group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default YearSelectionModal;