// import React from 'react';
// import { X, ExternalLink, CheckCircle, Calendar, Award, TrendingUp } from 'lucide-react';

// interface PGResultsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const PGResultsModal: React.FC<PGResultsModalProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   const handleCheckResults = () => {
//     window.open('https://natboard.edu.in/natboard-data/pdf/NEETPG2025RESULT/NEET-PG%202025%20Notice%20Board%20Result%20-%2019.08.2025%20-%20DS.pdf', '_blank');
//     onClose();
//   };

//   const handleStartCounselling = () => {
//     window.open('https://mcc.nic.in/pg-medical-counselling/', '_blank');
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
//         {/* Header */}
//         <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
          
//           <div className="flex items-center space-x-4">
//             <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//               <Award className="w-8 h-8" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold mb-2">🎉 NEET PG 2025 Results Announced!</h2>
//               <p className="text-green-100">Your results are now available. Check your score and start your counselling journey!</p>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Quick Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
//                   <TrendingUp className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-blue-700">2,05,179</div>
//                   <div className="text-sm text-blue-600">Total Registered</div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
//                   <CheckCircle className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-green-700">1,63,287</div>
//                   <div className="text-sm text-green-600">Qualified</div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
//                   <Calendar className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-purple-700">51,953</div>
//                   <div className="text-sm text-purple-600">Total Seats</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="space-y-4">
//             <button
//               onClick={handleCheckResults}
//               className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3"
//             >
//               <ExternalLink className="w-6 h-6" />
//               <span>Check Your NEET PG Results</span>
//             </button>

//             <button
//               onClick={handleStartCounselling}
//               className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3"
//             >
//               <Calendar className="w-6 h-6" />
//               <span>Start Counselling Registration</span>
//             </button>
//           </div>

//           {/* Important Information */}
//           <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
//             <h3 className="font-bold text-yellow-800 mb-2">⚠️ Important Information</h3>
//             <ul className="text-sm text-yellow-700 space-y-1">
//               <li>• Results are available on the official NBE website</li>
//               <li>• Counselling registration will start soon</li>
//               <li>• Keep your documents ready for counselling</li>
//               <li>• Check your category-wise cutoff marks</li>
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div className="mt-6">
//             <h3 className="font-bold text-slate-800 mb-3">Quick Links</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <a
//                 href="https://mcc.nic.in/pg-medical-counselling/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-sm"
//               >
//                 <ExternalLink className="w-4 h-4 text-slate-600" />
//                 <span>MCC Counselling Portal</span>
//               </a>
//               <a
//                 href="https://nbe.edu.in/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-sm"
//               >
//                 <ExternalLink className="w-4 h-4 text-slate-600" />
//                 <span>NBE Official Website</span>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-slate-600">
//               Need help? Contact our support team
//             </p>
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PGResultsModal;

import React from 'react';
import { X, ExternalLink, CheckCircle, Calendar, Award, TrendingUp } from 'lucide-react';

interface PGResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PGResultsModal: React.FC<PGResultsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCheckResults = () => {
    window.open('https://examinationservices.nic.in/resultservices/Neet2025/Login', '_blank');
    onClose();
  };

  const handleStartCounselling = () => {
    window.open('https://mcc.nic.in/pg-medical-counselling/', '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header - More compact on mobile */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 sm:p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
                🎉 NEET PG 2025 Results Announced!
              </h2>
              <p className="text-xs sm:text-sm opacity-90">
                Your results are now available. Check your score and start your counselling journey!
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Quick Stats - Responsive grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">2,05,179</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Registered</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-green-600">1,63,287</div>
              <div className="text-xs sm:text-sm text-gray-600">Qualified</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">51,953</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Seats</div>
            </div>
          </div>

          {/* Action Buttons - Stack on mobile */}
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={handleCheckResults}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Check Your NEET PG Results
            </button>
            
            <button
              onClick={handleStartCounselling}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <Award className="w-4 h-4 mr-2" />
              Start Counselling Registration
            </button>
          </div>

          {/* Important Information - More compact */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
            <h3 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">
              ⚠️ Important Information
            </h3>
            <ul className="text-xs sm:text-sm text-yellow-700 space-y-1">
              <li>• Results are available on the official NBE website</li>
              <li>• Counselling registration will start soon</li>
              <li>• Keep your documents ready for counselling</li>
              <li>• Check your category-wise cutoff marks</li>
            </ul>
          </div>

          {/* Quick Links - Always visible on mobile */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
              Quick Links
            </h3>
            <div className="space-y-2">
              <a
                href="https://mcc.nic.in/pg-medical-counselling/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-xs sm:text-sm"
              >
                <span className="text-blue-600 font-medium">MCC Counselling Portal</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              </a>
              
              <a
                href="https://natboard.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-xs sm:text-sm"
              >
                <span className="text-blue-600 font-medium">NBE Official Website</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-b-xl text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Need help? Contact our support team
          </p>
          <button
            onClick={onClose}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGResultsModal;
