import React from "react";
import {
  FileText,
  ExternalLink,
  Calendar,
  ArrowLeft,
  Bell,
} from "lucide-react";

interface NoticeDocument {
  id: number;
  title: string;
  date: string;
  externalUrl: string;
  size: string;
  isNew?: boolean;
}

const noticeDocuments: NoticeDocument[] = [
  // {
  //   id: 1,
  //   title: "Notice Dated: 27-01-2026",
  //   date: "27.01.2026",
  //   externalUrl:
  //     "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601271513638155.pdf",
  //   size: "External",
  //   isNew: true,
  // },
  {
    id: 2,
    title: "Notice Dated: 27-01-2026",
    date: "27.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601271513638155.pdf",
    size: "External",
    isNew: true,
  },
  {
    id: 3,
    title: "Notice Dated: 27-01-2026",
    date: "27.01.2026",
    externalUrl:
      "https://dme.assam.gov.in/sites/default/files/swf_utility_folder/departments/dme_lipl_in_oid_8/latest/notice_3rd_pg_counselling_2025_new.pdf",
    size: "External",
    isNew: true,
  },
  {
    id: 4,
    title: "Notice Dated: 22-01-2026",
    date: "22.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260121211129792.pdf",
    size: "External",
    isNew: false,
  },
  {
    id: 5,
    title: "Notice Dated: 21-01-2026",
    date: "21.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260121679996647.pdf",
    size: "External",
    isNew: false,
  },
  {
    id: 6,
    title: "Notice Dated: 20-01-2026",
    date: "20.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260120701771295.pdf",
    size: "External",
    isNew: false,
  },
  {
    id: 7,
    title: "Notice Dated: 17-01-2026",
    date: "17.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601171983313339.pdf",
    size: "External",
    isNew: false,
  },

  {
    id: 8,
    title: "Notice Dated: 14-01-2026",
    date: "14.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601141426630661.pdf",
    size: "External",
    isNew: false,
  },
  {
    id: 9,
    title: "Notice Dated: 13-01-2026",
    date: "13.01.2026",
    externalUrl:
      "https://natboard.edu.in/viewNotice.php?NBE=NlZON01lQnErVzZvRXJoM2s1dHBXZz09",
    size: "External",
    isNew: false,
  },
  {
    id: 10,
    title: "Notice Dated: 12-01-2026",
    date: "12.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601121777720733.pdf",
    size: "External",
    isNew: false,
  },
  {
    id: 11,
    title: "Notice Dated: 10-12-2025",
    date: "10.12.2025",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/12/2025121025430996.pdf",
    size: "External",
    isNew: false,
  },
  {
    id: 12,
    title: "Notice Dated: 19-11-2025",
    date: "19.11.2025",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/11/202511191286629593.pdf",
    size: "External",
    isNew: false,
  },
];

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Page that displays all the notices for NEET PG 2025 Counselling
 * @returns {JSX.Element} A JSX element representing the notices page
 */
/*******  1e0ebdc5-83c0-4045-9cf1-d15b7196cc0e  *******/
const NoticesPage: React.FC = () => {
  const handleView = (doc: NoticeDocument) => {
    window.open(doc.externalUrl, "_blank");
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
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">NEET PG 2025 Notices</h1>
              <p className="text-blue-100 mt-2">
                Important Notices & Announcements for Counselling
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
              Official Notices
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-800 w-48">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {noticeDocuments.map((doc, index) => (
                  <tr
                    key={doc.id}
                    className={`transition-colors duration-150 hover:bg-blue-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-lg">
                          <Bell className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <span className="text-sm text-slate-700">
                            {doc.title}
                          </span>
                          {doc.isNew && (
                            <span className="ml-2 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded font-medium animate-pulse">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">
                        {doc.date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">
                          Official Notice :
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
          {/* <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Last Updated: Dec 10, 2025
              </span>
              <span>Total Notices: {noticeDocuments.length}</span>
            </div>
          </div> */}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-medium text-slate-800 mb-2">
              Stay Updated
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Keep checking Our Blogs for All the Latest Updates with Full View.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-base font-medium text-slate-800 mb-2">
              Important Notice
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Read all notices carefully before proceeding with counselling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;
