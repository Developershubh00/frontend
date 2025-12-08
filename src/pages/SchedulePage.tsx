import React from 'react';
import { FileText, ExternalLink, Calendar, ArrowLeft, Link } from 'lucide-react';

interface ScheduleDocument {
  id: number;
  title: string;
  year: number;
  fileName?: string; // Optional now
  externalUrl?: string; // New field for external links
  size: string;
  isExternal: boolean; // Flag to identify external links
}

const scheduleDocuments: ScheduleDocument[] = [
  {
    id: 1,
    title: 'AIQ and State Schedule PG 2025 dated 25.11.25',
    year: 2025,
    fileName: 'AIQ_and_State_Schedule_PG_2025_dated_25.11.25.pdf',
    size: '387 KB',
    isExternal: false
  },
  {
    id: 2,
    title: 'PG Counselling 2025 Schedule dated 25.11.25',
    year: 2025,
    fileName: 'PG_Counselling_2025_Schedule_dated_25.11.25.pdf',
    size: '274 KB',
    isExternal: false
  },
  {
    id: 3,
    title: 'NEWLY ADDED SEATS ROUND 2 (MD MS AND DNB) – PG COUNSELLING 2025',
    year: 2025,
    externalUrl: 'https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/12/20251206729694661.pdf', // Replace with your actual URL
    size: 'External',
    isExternal: true
  },
  {
    id: 4,
    title: 'CLEAR VACANCY ROUND 2 (MD MS AND DNB) – PG COUNSELLING 2025',
    year: 2025,
    externalUrl: 'https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/12/20251206128647095.pdf', // Replace with your actual URL
    size: 'External',
    isExternal: true
  },
  {
    id: 5,
    title: 'VIRTUAL VACANCY ROUND 2 (MD MS AND DNB) – PG COUNSELLING 2025',
    year: 2025,
    externalUrl: 'https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/12/20251206767130184.pdf', // Replace with your actual URL
    size: 'External',
    isExternal: true
  }
];

const SchedulePage: React.FC = () => {
  const handleView = (doc: ScheduleDocument) => {
    if (doc.isExternal && doc.externalUrl) {
      window.open(doc.externalUrl, '_blank');
    } else if (doc.fileName) {
      window.open(`/data/${doc.fileName}`, '_blank');
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-slate-50 text-slate-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

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
                    View 
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
                        <div className={`bg-gradient-to-br ${
                          doc.isExternal 
                            ? 'from-purple-100 to-pink-100' 
                            : 'from-blue-100 to-indigo-100'
                        } p-2 rounded-lg`}>
                          {doc.isExternal ? (
                            <Link className="w-4 h-4 text-purple-600" />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-slate-700">
                            {doc.title}
                          </span>
                          {doc.isExternal && (
                            // <span className="ml-2 text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                            //   External Link
                            // </span>
                          )}
                        </div>
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
                          {doc.isExternal ? 'External Link :' : 'Accessible Version :'}
                        </span>
                        <button
                          onClick={() => handleView(doc)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-medium text-slate-800 mb-2">Stay Updated</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Keep checking Our Blogs for All the Latest Updates with Full View.
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