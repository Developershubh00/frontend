// export interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "urgent";
//   date: string;
//   time: string;
//   read: boolean;
//   link?: string;
//   icon?: string;
// }

// export const notificationsData: Notification[] = [
//   {
//     id: "1",
//     title:
//       "Medical Counselling Committee (MCC) has updated the Round 3 seat matrix for NEET PG 2025, ",
//     message:
//       "Including seats withdrawn and newly added before seat processing.",
//     type: "urgent",
//     date: "Tues, 29 Jan 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "2",
//     title:
//       "MCC Extends NEET PG 2025 Round-3 Counselling Choice Filling Amid New Seat Additions",
//     message: "",
//     type: "urgent",
//     date: "Tues, 28 Jan 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "3",
//     title:
//       "Assam NEET PG 2025 Round 3 Counselling Revised Schedule Announced by DME Assam",
//     message: "",
//     type: "urgent",
//     date: "Tues, 27 Jan 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "4",
//     title:
//       "PG Medical Counselling 2025: Choice Locking Facility to Open from Tomorrow 26 January 2026",
//     message: "",
//     type: "urgent",
//     date: "Mon, 26 Jan 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "5",
//     title:
//       "NEET PG Counselling 2025 Round 3: Virtual Vacancy List for MD/MS & DNB Seats",
//     message: "",
//     type: "urgent",
//     date: "Thu, 22 Jan 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "6",
//     title:
//       "NEET PG Counselling 2025: Updated Clear Vacancy List for Round 3 (MD/MS & DNB Seats)",
//     message: "",
//     type: "urgent",
//     date: "Tues, 20 Jan 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "7",
//     title: "Notice Dated: 12-01-2026",
//     message:
//       "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025",
//     type: "urgent",
//     date: "Mon, 12 Jan 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "8",
//     title: "All India PG Counselling - 2025",
//     message:
//       "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025",
//     type: "urgent",
//     date: "Wed, 24 Dec 2025",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "9",
//     title: "NEET PG 2025 Round 3 ",
//     message:
//       "NEET PG 2025 Round 3 Provisional Result Out | MCC Notice Download",
//     type: "urgent",
//     date: "Tue, 3 Feb 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "10",
//     title: "Provisional result of Round-3 ",
//     message:
//       "",
//     type: "urgent",
//     date: "thu, 5 Feb 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "11",
//     title: "Provisional  Counselling Seats Allotment -2025 Round 3 ",
//     message:
//       "",
//     type: "urgent",
//     date: "Thu, 5 Feb 2026",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//   },
// ];

// // Helper function to parse date string
// const parseNotificationDate = (dateStr: string): Date => {
//   // Remove day name and parse
//   const cleanDate = dateStr.replace(/^[A-Za-z]+,\s*/, '');
//   return new Date(cleanDate);
// };

// // Helper functions
// export const getUnreadCount = (notifications: Notification[]): number => {
//   return notifications.filter((n) => !n.read).length;
// };

// export const markAsRead = (
//   notifications: Notification[],
//   id: string,
// ): Notification[] => {
//   return notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
// };

// export const markAllAsRead = (
//   notifications: Notification[],
// ): Notification[] => {
//   return notifications.map((n) => ({ ...n, read: true }));
// };

// export const getNotificationsByType = (
//   notifications: Notification[],
//   type: string,
// ): Notification[] => {
//   return notifications.filter((n) => n.type === type);
// };

// // Get latest notifications sorted by date (newest first)
// export const getLatestNotifications = (
//   notifications: Notification[],
//   limit?: number
// ): Notification[] => {
//   const sorted = [...notifications].sort((a, b) => {
//     const dateA = parseNotificationDate(a.date);
//     const dateB = parseNotificationDate(b.date);
//     return dateB.getTime() - dateA.getTime(); // Newest first
//   });
  
//   return limit ? sorted.slice(0, limit) : sorted;
// };

// // Get notifications from last N days
// export const getRecentNotifications = (
//   notifications: Notification[],
//   days: number = 7
// ): Notification[] => {
//   const cutoffDate = new Date();
//   cutoffDate.setDate(cutoffDate.getDate() - days);
  
//   return notifications.filter((n) => {
//     const notifDate = parseNotificationDate(n.date);
//     return notifDate >= cutoffDate;
//   }).sort((a, b) => {
//     const dateA = parseNotificationDate(a.date);
//     const dateB = parseNotificationDate(b.date);
//     return dateB.getTime() - dateA.getTime();
//   });
// };

// export interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "urgent";
//   date: string; // ISO 8601 format: 2026-02-14T08:00:00Z
//   read: boolean;
//   link?: string;
//   icon?: string;
// }

// export const notificationsData: Notification[] = [
//   {
//     id: "10",
//     title: "Provisional Result of Round-3",
//     message: "Provisional result of Round-3 is now available for download.",
//     type: "urgent",
//     date: "2026-02-05T14:30:00Z",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "11",
//     title: "Provisional Counselling Seats Allotment - 2025 Round 3",
//     message: "Seat allotment for Round 3 counselling has been provisionally announced.",
//     type: "urgent",
//     date: "2026-02-05T10:00:00Z",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "9",
//     title: "NEET PG 2025 Round 3",
//     message: "NEET PG 2025 Round 3 Provisional Result Out | MCC Notice Download",
//     type: "urgent",
//     date: "2026-02-03T14:30:00Z",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "1",
//     title: "MCC Updated Round 3 Seat Matrix for NEET PG 2025",
//     message:
//       "Medical Counselling Committee (MCC) has updated the Round 3 seat matrix for NEET PG 2025, including seats withdrawn and newly added before seat processing.",
//     type: "urgent",
//     date: "2026-01-29T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "2",
//     title: "MCC Extends NEET PG 2025 Round-3 Counselling Choice Filling Amid New Seat Additions",
//     message:
//       "Choice filling window extended for Round-3 counselling due to new seat additions.",
//     type: "urgent",
//     date: "2026-01-28T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "3",
//     title: "Assam NEET PG 2025 Round 3 Counselling Revised Schedule Announced by DME Assam",
//     message: "DME Assam has released a revised schedule for Round 3 counselling.",
//     type: "urgent",
//     date: "2026-01-27T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "4",
//     title: "PG Medical Counselling 2025: Choice Locking Facility to Open from 26 January 2026",
//     message: "Choice locking facility will be available from tomorrow, 26 January 2026.",
//     type: "urgent",
//     date: "2026-01-26T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "5",
//     title: "NEET PG Counselling 2025 Round 3: Virtual Vacancy List for MD/MS & DNB Seats",
//     message: "Virtual vacancy list for MD/MS and DNB seats has been released for Round 3.",
//     type: "urgent",
//     date: "2026-01-22T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "6",
//     title: "NEET PG Counselling 2025: Updated Clear Vacancy List for Round 3 (MD/MS & DNB Seats)",
//     message: "Updated clear vacancy list for Round 3 MD/MS and DNB seats is now available.",
//     type: "urgent",
//     date: "2026-01-20T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "7",
//     title: "Notice Dated: 12-01-2026",
//     message:
//       "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025.",
//     type: "urgent",
//     date: "2026-01-12T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "8",
//     title: "All India PG Counselling - 2025",
//     message:
//       "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025.",
//     type: "urgent",
//     date: "2025-12-24T14:30:00Z",
//     read: false,
//     icon: "🔔",
//   },
// ];

// // ── Helpers ────────────────────────────────────────────────────────────────────

// /** Sort notifications newest-first (in-place safe copy) */
// export const sortByDateDesc = (notifications: Notification[]): Notification[] =>
//   [...notifications].sort(
//     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//   );

// /** Format ISO date string to human-readable display, e.g. "Tue, 5 Feb 2026 • 2:30 PM" */
// export const formatDisplayDate = (isoDate: string): { date: string; time: string } => {
//   const d = new Date(isoDate);
//   const date = d.toLocaleDateString("en-IN", {
//     weekday: "short",
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     timeZone: "Asia/Kolkata",
//   });
//   const time = d.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone: "Asia/Kolkata",
//   });
//   return { date, time };
// };

// /** Relative time label, e.g. "2 hours ago", "3 days ago" */
// export const getRelativeTime = (isoDate: string): string => {
//   const diff = Date.now() - new Date(isoDate).getTime();
//   const minutes = Math.floor(diff / 60_000);
//   if (minutes < 1) return "Just now";
//   if (minutes < 60) return `${minutes}m ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours}h ago`;
//   const days = Math.floor(hours / 24);
//   if (days < 30) return `${days}d ago`;
//   const months = Math.floor(days / 30);
//   return `${months}mo ago`;
// };

// export const getUnreadCount = (notifications: Notification[]): number =>
//   notifications.filter((n) => !n.read).length;

// export const markAsRead = (
//   notifications: Notification[],
//   id: string
// ): Notification[] =>
//   notifications.map((n) => (n.id === id ? { ...n, read: true } : n));

// export const markAllAsRead = (notifications: Notification[]): Notification[] =>
//   notifications.map((n) => ({ ...n, read: true }));

// export const getNotificationsByType = (
//   notifications: Notification[],
//   type: string
// ): Notification[] => notifications.filter((n) => n.type === type);

// /** Latest N notifications sorted newest-first */
// export const getLatestNotifications = (
//   notifications: Notification[],
//   limit?: number
// ): Notification[] => {
//   const sorted = sortByDateDesc(notifications);
//   return limit ? sorted.slice(0, limit) : sorted;
// };

// export interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "urgent";
//   date: string; // ISO 8601: "2026-02-05T14:30:00Z"
//   read: boolean;
//   link?: string;
//   icon?: string;
// }

// // ─── Raw data (order here does NOT matter — always sort before using) ─────────
// export const notificationsData: Notification[] = [
//   {
//     id: "a",
//     title: "Provisional Result of Round-3",
//     message: "Provisional result of Round-3 is now available for download.",
//     type: "urgent",
//     date: "2026-02-05T14:30:00Z",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "b",
//     title: "Provisional Counselling Seats Allotment - 2025 Round 3",
//     message: "Seat allotment for Round 3 counselling has been provisionally announced.",
//     type: "urgent",
//     date: "2026-02-05T10:00:00Z",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "c",
//     title: "NEET PG 2025 Round 3 Provisional Result Out | MCC Notice Download",
//     message: "NEET PG 2025 Round 3 Provisional Result is out. Download the MCC notice.",
//     type: "urgent",
//     date: "2026-02-03T14:30:00Z",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "d",
//     title: "MCC Updated Round 3 Seat Matrix for NEET PG 2025",
//     message:
//       "Medical Counselling Committee (MCC) has updated the Round 3 seat matrix, including seats withdrawn and newly added before seat processing.",
//     type: "urgent",
//     date: "2026-01-29T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "e",
//     title: "MCC Extends NEET PG 2025 Round-3 Counselling Choice Filling Amid New Seat Additions",
//     message: "Choice filling window extended for Round-3 counselling due to new seat additions.",
//     type: "urgent",
//     date: "2026-01-28T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "f",
//     title: "Assam NEET PG 2025 Round 3 Counselling Revised Schedule Announced by DME Assam",
//     message: "DME Assam has released a revised schedule for Round 3 counselling.",
//     type: "urgent",
//     date: "2026-01-27T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "g",
//     title: "PG Medical Counselling 2025: Choice Locking Facility to Open from 26 January 2026",
//     message: "Choice locking facility will be available from tomorrow, 26 January 2026.",
//     type: "urgent",
//     date: "2026-01-26T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "h",
//     title: "NEET PG Counselling 2025 Round 3: Virtual Vacancy List for MD/MS & DNB Seats",
//     message: "Virtual vacancy list for MD/MS and DNB seats has been released for Round 3.",
//     type: "urgent",
//     date: "2026-01-22T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "i",
//     title: "NEET PG Counselling 2025: Updated Clear Vacancy List for Round 3 (MD/MS & DNB Seats)",
//     message: "Updated clear vacancy list for Round 3 MD/MS and DNB seats is now available.",
//     type: "urgent",
//     date: "2026-01-20T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "j",
//     title: "Notice Dated 12-01-2026",
//     message: "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025.",
//     type: "urgent",
//     date: "2026-01-12T14:30:00Z",
//     read: false,
//     icon: "🔔",
//     link: "/notice",
//   },
//   {
//     id: "k",
//     title: "All India PG Counselling - 2025",
//     message: "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025.",
//     type: "urgent",
//     date: "2025-12-24T14:30:00Z",
//     read: false,
//     icon: "🔔",
//   },
//   {
//     id: "",
//     title: "All India PG Counselling - 2025",
//     message: "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025.",
//     type: "urgent",
//     date: "2025-12-24T14:30:00Z",
//     read: false,
//     icon: "🔔",
//   },

// ];

// // ─── SORT: newest date first — use this EVERYWHERE before displaying ──────────
// export const sortByDateDesc = (list: Notification[]): Notification[] =>
//   [...list].sort(
//     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//   );

// // ─── Format ISO date → human-readable { date, time } strings ─────────────────
// export const formatDisplayDate = (
//   isoDate: string
// ): { date: string; time: string } => {
//   const d = new Date(isoDate);
//   return {
//     date: d.toLocaleDateString("en-IN", {
//       weekday: "short",
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       timeZone: "Asia/Kolkata",
//     }),
//     time: d.toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//       timeZone: "Asia/Kolkata",
//     }),
//   };
// };

// // ─── Relative label: "3d ago", "2h ago", etc. ────────────────────────────────
// export const getRelativeTime = (isoDate: string): string => {
//   const ms = Date.now() - new Date(isoDate).getTime();
//   const mins = Math.floor(ms / 60_000);
//   if (mins < 1) return "Just now";
//   if (mins < 60) return `${mins}m ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs}h ago`;
//   const days = Math.floor(hrs / 24);
//   if (days < 30) return `${days}d ago`;
//   return `${Math.floor(days / 30)}mo ago`;
// };

// // ─── Standard helpers ─────────────────────────────────────────────────────────
// export const getUnreadCount = (list: Notification[]): number =>
//   list.filter((n) => !n.read).length;

// export const markAsRead = (list: Notification[], id: string): Notification[] =>
//   list.map((n) => (n.id === id ? { ...n, read: true } : n));

// export const markAllAsRead = (list: Notification[]): Notification[] =>
//   list.map((n) => ({ ...n, read: true }));

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "urgent";
  date: string; // DD.MM.YYYY — same format as noticeDocuments
  time: string; // e.g. "2:30 PM"
  read: boolean;
  link?: string;
  icon?: string;
  isNew?: boolean; // auto-computed: true if within last 7 days
}

// ─── Helper: parse "DD.MM.YYYY" → Date (mirrors noticeDocuments) ─────────────
const parseNotificationDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day);
};

// ─── Helper: true if date is within the last 7 days ──────────────────────────
const isRecentNotification = (dateStr: string): boolean => {
  const notifDate = parseNotificationDate(dateStr);
  const diffMs = new Date().getTime() - notifDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
};

// ─── Raw data — order here does NOT matter, sorting is applied at export ──────
const rawNotifications: Omit<Notification, "isNew">[] = [
  {
    id: 1,
    title: "MCC Updated Round 3 Seat Matrix for NEET PG 2025",
    message:
      "Medical Counselling Committee (MCC) has updated the Round 3 seat matrix for NEET PG 2025, including seats withdrawn and newly added before seat processing.",
    type: "urgent",
    date: "29.01.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 2,
    title: "MCC Extends NEET PG 2025 Round-3 Counselling Choice Filling Amid New Seat Additions",
    message: "Choice filling window extended for Round-3 counselling due to new seat additions.",
    type: "urgent",
    date: "28.01.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 3,
    title: "Assam NEET PG 2025 Round 3 Counselling Revised Schedule Announced by DME Assam",
    message: "DME Assam has released a revised schedule for Round 3 counselling.",
    type: "urgent",
    date: "27.01.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 4,
    title: "PG Medical Counselling 2025: Choice Locking Facility to Open from 26 January 2026",
    message: "Choice locking facility will be available from tomorrow, 26 January 2026.",
    type: "urgent",
    date: "26.01.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 5,
    title: "NEET PG Counselling 2025 Round 3: Virtual Vacancy List for MD/MS & DNB Seats",
    message: "Virtual vacancy list for MD/MS and DNB seats has been released for Round 3.",
    type: "urgent",
    date: "22.01.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 6,
    title: "NEET PG Counselling 2025: Updated Clear Vacancy List for Round 3 (MD/MS & DNB Seats)",
    message: "Updated clear vacancy list for Round 3 MD/MS and DNB seats is now available.",
    type: "urgent",
    date: "20.01.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 7,
    title: "Notice Dated: 12-01-2026",
    message: "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025.",
    type: "urgent",
    date: "12.01.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 8,
    title: "All India PG Counselling - 2025",
    message: "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025.",
    type: "urgent",
    date: "24.12.2025",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 9,
    title: "NEET PG 2025 Round 3 Provisional Result Out | MCC Notice Download",
    message: "NEET PG 2025 Round 3 Provisional Result is out. Download the MCC notice.",
    type: "urgent",
    date: "03.02.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 10,
    title: "Provisional Result of Round-3",
    message: "Provisional result of Round-3 is now available for download.",
    type: "urgent",
    date: "05.02.2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 11,
    title: "Provisional Counselling Seats Allotment - 2025 Round 3",
    message: "Seat allotment for Round 3 counselling has been provisionally announced.",
    type: "urgent",
    date: "05.02.2026",
    time: "10:00 AM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 12,
    title: "MCC Urges NEET PG 2025 Round 3 Candidates: ",
    message: "Download Allotment Letters & Report by Feb 6 Noon for Admission.",
    type: "urgent",
    date: "06.02.2026",
    time: "10:00 AM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: 13,
    title: "Indian to NRI for Stray Vacancy Round of PG Counselling 2025-26",
    message: "Seat allotment for Round 3 counselling has been provisionally announced.",
    type: "urgent",
    date: "14.02.2026",
    time: "10:00 AM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  // {
  //   id: 14,
  //   title: "Provisional Counselling Seats Allotment - 2025 Round 3",
  //   message: "Seat allotment for Round 3 counselling has been provisionally announced.",
  //   type: "urgent",
  //   date: "05.02.2026",
  //   time: "10:00 AM",
  //   read: false,
  //   icon: "🔔",
  // },
  // {
  //   id: 15,
  //   title: "Provisional Counselling Seats Allotment - 2025 Round 3",
  //   message: "Seat allotment for Round 3 counselling has been provisionally announced.",
  //   type: "urgent",
  //   date: "05.02.2026",
  //   time: "10:00 AM",
  //   read: false,
  //   icon: "🔔",
  // },
  

];

// ─── Processed export: isNew auto-added + sorted newest first ─────────────────
// Mirrors the exact pattern used in noticeDocuments
export const notificationsData: Notification[] = rawNotifications
  .map((n) => ({
    ...n,
    isNew: isRecentNotification(n.date),
  }))
  .sort((a, b) => {
    const dateA = parseNotificationDate(a.date);
    const dateB = parseNotificationDate(b.date);
    return dateB.getTime() - dateA.getTime(); // Descending — newest first
  });

// ─── Format "DD.MM.YYYY" → display strings ────────────────────────────────────
export const formatDisplayDate = (dateStr: string): string => {
  const d = parseNotificationDate(dateStr);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ─── Relative label: "3d ago", "2h ago", etc. ────────────────────────────────
export const getRelativeTime = (dateStr: string): string => {
  const ms = new Date().getTime() - parseNotificationDate(dateStr).getTime();
  const mins = Math.floor(ms / 60_000);
  if (mins < 60) return mins <= 0 ? "Just now" : `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
};

// ─── Standard helpers ─────────────────────────────────────────────────────────
export const getUnreadCount = (list: Notification[]): number =>
  list.filter((n) => !n.read).length;

export const markAsRead = (list: Notification[], id: number): Notification[] =>
  list.map((n) => (n.id === id ? { ...n, read: true } : n));

export const markAllAsRead = (list: Notification[]): Notification[] =>
  list.map((n) => ({ ...n, read: true }));

export const getNotificationsByType = (
  list: Notification[],
  type: string
): Notification[] => list.filter((n) => n.type === type);