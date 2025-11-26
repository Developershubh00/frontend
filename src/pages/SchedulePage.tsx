import React from 'react';
import { FileText, ExternalLink, Calendar } from 'lucide-react';

interface ScheduleDocument {
  id: number;
  title: string;
  year: number;
  fileName: string;
  size: string;
}

const scheduleDocuments: ScheduleDocument[] = [
  {
    id: 1,
    title: 'AIQ and State Schedule PG 2025 dated 25.11.25',
    year: 2025,
    fileName: 'AIQ_and_State_Schedule_PG_2025_dated_25.11.25.pdf',
    size: '387 KB'
  },
  {
    id: 2,
    title: 'PG Counselling 2025 Schedule dated 25.11.25',
    year: 2025,
    fileName: 'PG_Counselling_2025_Schedule_dated_25.11.25.pdf',
    size: '274 KB'
  },
  // {
  //   id: 3,
  //   title: 'Revised PG Information Bulletin 2025 dated 26.11.2025',
  //   year: 2025,
  //   fileName: 'Revised_PG_Information_Bulletin_2025_dated_26.11.2025.pdf',
  //   size: '2 MB'
  // }
];

const SchedulePage: React.FC = () => {
  const handleView = (fileName: string) => {
    window.open(`/data/${fileName}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">NEET PG 2025 Schedule</h1>
              <p className="text-blue-100 mt-2">
                Check Your Counselling Schedule & Important Documents
              </p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Schedule PG
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-300 to-orange-300">
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-800">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-800 w-32">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-800 w-48">
                    View / Download
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scheduleDocuments.map((doc, index) => (
                  <tr
                    key={doc.id}
                    className={`transition-colors duration-150 hover:bg-blue-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-700">
                          {doc.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">
                        {doc.year}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">
                          Accessible Version :
                        </span>
                        <button
                          onClick={() => handleView(doc.fileName)}
                          className="group inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <span className="underline decoration-blue-300 hover:decoration-blue-500">
                            View
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Last Updated: Nov 26, 2025
              </span>
              <span>
                Total Documents: {scheduleDocuments.length}
              </span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-base font-medium text-slate-800 mb-2">Quick Access</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              All schedule documents are accessible for viewing in a new tab
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-medium text-slate-800 mb-2">Stay Updated</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Check regularly for new announcements and schedule changes
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <ExternalLink className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-base font-medium text-slate-800 mb-2">Need Help?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Contact support if you face any issues accessing documents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">NEET PG 2025 Schedule</h1>
              <p className="text-blue-100 mt-2">
                Check Your Counselling Schedule & Important Documents
              </p>
            </div>
          </div>
        </div>

       