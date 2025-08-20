import React from 'react';
import { X, ExternalLink, CheckCircle, Calendar, Award, TrendingUp } from 'lucide-react';

interface PGResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PGResultsModal: React.FC<PGResultsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCheckResults = () => {
    window.open('https://natboard.edu.in/natboard-data/pdf/NEETPG2025RESULT/NEET-PG%202025%20Notice%20Board%20Result%20-%2019.08.2025%20-%20DS.pdf', '_blank');
    onClose();
  };

  const handleStartCounselling = () => {
    window.open('https://mcc.nic.in/pg-medical-counselling/', '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">🎉 NEET PG 2025 Results Announced!</h2>
              <p className="text-green-100">Your results are now available. Check your score and start your counselling journey!</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">2,05,179</div>
                  <div className="text-sm text-blue-600">Total Registered</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">1,63,287</div>
                  <div className="text-sm text-green-600">Qualified</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">51,953</div>
                  <div className="text-sm text-purple-600">Total Seats</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleCheckResults}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3"
            >
              <ExternalLink className="w-6 h-6" />
              <span>Check Your NEET PG Results</span>
            </button>

            <button
              onClick={handleStartCounselling}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3"
            >
              <Calendar className="w-6 h-6" />
              <span>Start Counselling Registration</span>
            </button>
          </div>

          {/* Important Information */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h3 className="font-bold text-yellow-800 mb-2">⚠️ Important Information</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Results are available on the official NBE website</li>
              <li>• Counselling registration will start soon</li>
              <li>• Keep your documents ready for counselling</li>
              <li>• Check your category-wise cutoff marks</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="mt-6">
            <h3 className="font-bold text-slate-800 mb-3">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="https://mcc.nic.in/pg-medical-counselling/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4 text-slate-600" />
                <span>MCC Counselling Portal</span>
              </a>
              <a
                href="https://nbe.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4 text-slate-600" />
                <span>NBE Official Website</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Need help? Contact our support team
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGResultsModal;
