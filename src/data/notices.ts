export interface NoticeDocument {
  id: number;
  title: string;
  date: string;
  externalUrl: string;
  size: string;
  isNew?: boolean;
}

// Helper function to parse date from DD.MM.YYYY format
const parseNoticeDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
};

// Helper function to check if a notice is new (within last 7 days)
const isRecentNotice = (dateStr: string): boolean => {
  const noticeDate = parseNoticeDate(dateStr);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - noticeDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
};

// Raw notice data without isNew flag
const rawNotices: Omit<NoticeDocument, 'isNew'>[] = [
  {
    id: 1,
    title:
      "Medical Counselling Committee (MCC) has updated the Round 3 seat matrix for NEET PG 2025",
    date: "29.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260128986085298.pdf",
    size: "External",
  },
  {
    id: 2,
    title:
      "Medical Counselling Committee (MCC) has updated the Round 3 seat matrix for NEET PG 2025",
    date: "29.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260128986085298.pdf",
    size: "External",
  },
  {
    id: 3,
    title:
      "MCC Extends NEET PG 2025 Round-3 Counselling Choice Filling Amid New Seat Additions",
    date: "28.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260128953677857.pdf",
    size: "External",
  },
  {
    id: 4,
    title:
      "Assam NEET PG 2025 Round 3 Counselling Revised Schedule Announced by DME Assam",
    date: "27.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601271513638155.pdf",
    size: "External",
  },
  {
    id: 5,
    title: "Notice Dated: 27-01-2026",
    date: "27.01.2026",
    externalUrl:
      "https://dme.assam.gov.in/sites/default/files/swf_utility_folder/departments/dme_lipl_in_oid_8/latest/notice_3rd_pg_counselling_2025_new.pdf",
    size: "External",
  },
  {
    id: 6,
    title:
      "NEET PG Counselling 2025 Round 3: Virtual Vacancy List for MD/MS & DNB Seats",
    date: "22.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260121211129792.pdf",
    size: "External",
  },
  {
    id: 7,
    title: "Notice Dated: 21-01-2026",
    date: "21.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260121679996647.pdf",
    size: "External",
  },
  {
    id: 8,
    title:
      "NEET PG Counselling 2025: Updated Clear Vacancy List for Round 3 (MD/MS & DNB Seats)",
    date: "20.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260120701771295.pdf",
    size: "External",
  },
  {
    id: 9,
    title: "Notice Dated: 17-01-2026",
    date: "17.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601171983313339.pdf",
    size: "External",
  },
  {
    id: 10,
    title: "Notice Dated: 14-01-2026",
    date: "14.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601141426630661.pdf",
    size: "External",
  },
  {
    id: 11,
    title: "Notice Dated: 13-01-2026",
    date: "13.01.2026",
    externalUrl:
      "https://natboard.edu.in/viewNotice.php?NBE=NlZON01lQnErVzZvRXJoM2s1dHBXZz09",
    size: "External",
  },
  {
    id: 12,
    title: "Notice Dated: 12-01-2026",
    date: "12.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601121777720733.pdf",
    size: "External",
  },
  {
    id: 13,
    title: "Notice Dated: 10-12-2025",
    date: "10.12.2025",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/12/2025121025430996.pdf",
    size: "External",
  },
  {
    id: 14,
    title: "Notice Dated: 19-11-2025",
    date: "19.11.2025",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/11/202511191286629593.pdf",
    size: "External",
  },
  {
    id: 15,
    title:
      "NEET PG 2025 Round 3 Online Counseling Schedule: Important Dates for All India Quota, Deemed, Central Universities, and AFMS",
    date: "30.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/202601301788608510.pdf",
    size: "External",
  },{
    id: 16,
    title:
      "NEET PG 2025 Revised Counseling Schedule: Round 3 Important Dates for AIQ, State Quota, and Deemed Universities",
    date: "30.01.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260130981302429.pdf",
    size: "External",
  },

  {
    id: 17,
    title:
      "NEET PG 2025 Round 3 Provisional Result Out | MCC Notice Download",
    date: "03.02.2026",
    externalUrl:
      "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/02/20260203602661925.pdf",
    size: "External",
  },
  
];

// Process notices: add isNew flag and sort by date (newest first)
export const noticeDocuments: NoticeDocument[] = rawNotices
  .map(notice => ({
    ...notice,
    isNew: isRecentNotice(notice.date),
  }))
  .sort((a, b) => {
    const dateA = parseNoticeDate(a.date);
    const dateB = parseNoticeDate(b.date);
    return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
  });