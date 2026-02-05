// // src/data/notifications.ts

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
//     id: "4",
//     title: "Notice Dated: 12-01-2026",
//     message:
//       "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025",
//     type: "urgent",
//     date: "mon, 12 Jan 2026",
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
//     date: "Wed, 24 Dec",
//     time: "2:30 PM",
//     read: false,
//     icon: "🔔",
//   },
//   // {
//   //   id: "6",
//   //   title: "Round 2 vs State Round 2 - Timeline Based Decisions",
//   //   message: "NEET PG 2025 - Important updates regarding counselling timeline",
//   //   type: "info",
//   //   date: "Wed, 24 Dec",
//   //   time: "12:00 PM",
//   //   read: false,
//   //   link: "/schedule",
//   // },
//   // {
//   //   id: "6",
//   //   title: "FMGE December 2025",
//   //   message:
//   //     "NBEMS Extends Deficient Documents Submission Deadline Till January 7, 2026",
//   //   type: "warning",
//   //   date: "Sun, 30 Dec",
//   //   time: "10:30 AM",
//   //   read: false,
//   //   link: "/notice",
//   // },
//   // {
//   //   id: "4",
//   //   title: "NEET PG Round 2 - Info",
//   //   message: "Fresh Seat In AI R2, Joining & Reporting process explained",
//   //   type: "info",
//   //   date: "Wed, 17 Dec",
//   //   time: "3:45 PM",
//   //   read: true,
//   //   link: "/schedule"
//   // },
//   // {
//   //   id: "5",
//   //   title: "NEET PG 2025 Results Announced!",
//   //   message: "Check your scorecard and start your counselling registration. Cutoff scores updated.",
//   //   type: "success",
//   //   date: "Mon, 15 Dec",
//   //   time: "9:00 AM",
//   //   read: true,
//   //   link: "/"
//   // }
// ];

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
// src/data/notifications.ts

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "urgent";
  date: string;
  time: string;
  read: boolean;
  link?: string;
  icon?: string;
}

export const notificationsData: Notification[] = [
  {
    id: "1",
    title:
      "Medical Counselling Committee (MCC) has updated the Round 3 seat matrix for NEET PG 2025, ",
    message:
      "Including seats withdrawn and newly added before seat processing.",
    type: "urgent",
    date: "Tues, 29 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "2",
    title:
      "MCC Extends NEET PG 2025 Round-3 Counselling Choice Filling Amid New Seat Additions",
    message: "",
    type: "urgent",
    date: "Tues, 28 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "3",
    title:
      "Assam NEET PG 2025 Round 3 Counselling Revised Schedule Announced by DME Assam",
    message: "",
    type: "urgent",
    date: "Tues, 27 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "4",
    title:
      "PG Medical Counselling 2025: Choice Locking Facility to Open from Tomorrow 26 January 2026",
    message: "",
    type: "urgent",
    date: "Mon, 26 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "5",
    title:
      "NEET PG Counselling 2025 Round 3: Virtual Vacancy List for MD/MS & DNB Seats",
    message: "",
    type: "urgent",
    date: "Thu, 22 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "6",
    title:
      "NEET PG Counselling 2025: Updated Clear Vacancy List for Round 3 (MD/MS & DNB Seats)",
    message: "",
    type: "urgent",
    date: "Tues, 20 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "7",
    title: "Notice Dated: 12-01-2026",
    message:
      "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025",
    type: "urgent",
    date: "Mon, 12 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "8",
    title: "All India PG Counselling - 2025",
    message:
      "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025",
    type: "urgent",
    date: "Wed, 24 Dec 2025",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
  },
  {
    id: "9",
    title: "NEET PG 2025 Round 3 ",
    message:
      "NEET PG 2025 Round 3 Provisional Result Out | MCC Notice Download",
    type: "urgent",
    date: "Tue, 3 Feb 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
  },
  {
    id: "10",
    title: "Provisional result of Round-3 ",
    message:
      "",
    type: "urgent",
    date: "thu, 5 Feb 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
  },
  {
    id: "11",
    title: "Provisional  Counselling Seats Allotment -2025 Round 3 ",
    message:
      "",
    type: "urgent",
    date: "Thu, 5 Feb 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
  },
];

// Helper function to parse date string
const parseNotificationDate = (dateStr: string): Date => {
  // Remove day name and parse
  const cleanDate = dateStr.replace(/^[A-Za-z]+,\s*/, '');
  return new Date(cleanDate);
};

// Helper functions
export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter((n) => !n.read).length;
};

export const markAsRead = (
  notifications: Notification[],
  id: string,
): Notification[] => {
  return notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
};

export const markAllAsRead = (
  notifications: Notification[],
): Notification[] => {
  return notifications.map((n) => ({ ...n, read: true }));
};

export const getNotificationsByType = (
  notifications: Notification[],
  type: string,
): Notification[] => {
  return notifications.filter((n) => n.type === type);
};

// Get latest notifications sorted by date (newest first)
export const getLatestNotifications = (
  notifications: Notification[],
  limit?: number
): Notification[] => {
  const sorted = [...notifications].sort((a, b) => {
    const dateA = parseNotificationDate(a.date);
    const dateB = parseNotificationDate(b.date);
    return dateB.getTime() - dateA.getTime(); // Newest first
  });
  
  return limit ? sorted.slice(0, limit) : sorted;
};

// Get notifications from last N days
export const getRecentNotifications = (
  notifications: Notification[],
  days: number = 7
): Notification[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return notifications.filter((n) => {
    const notifDate = parseNotificationDate(n.date);
    return notifDate >= cutoffDate;
  }).sort((a, b) => {
    const dateA = parseNotificationDate(a.date);
    const dateB = parseNotificationDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};