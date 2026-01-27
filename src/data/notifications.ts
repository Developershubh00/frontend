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
    title: "Notice Dated: 27-01-2026",
    message: "",
    type: "urgent",
    date: "Tues, 27 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "2",
    title: "Notice Dated: 22-01-2026",
    message: "",
    type: "urgent",
    date: "Thu, 22 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "3",
    title: "Notice Dated: 20-01-2026",
    message: "",
    type: "urgent",
    date: "Tues, 20 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "4",
    title: "Notice Dated: 12-01-2026",
    message:
      "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025",
    type: "urgent",
    date: "mon, 12 Jan 2026",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
    link: "/notice",
  },
  {
    id: "5",
    title: "All India PG Counselling - 2025",
    message:
      "All India Round 2 - Resignation has been extended till 01:00 PM of 30th Dec 2025",
    type: "urgent",
    date: "Wed, 24 Dec",
    time: "2:30 PM",
    read: false,
    icon: "🔔",
  },
  {
    id: "6",
    title: "Round 2 vs State Round 2 - Timeline Based Decisions",
    message: "NEET PG 2025 - Important updates regarding counselling timeline",
    type: "info",
    date: "Wed, 24 Dec",
    time: "12:00 PM",
    read: false,
    link: "/schedule",
  },
  // {
  //   id: "6",
  //   title: "FMGE December 2025",
  //   message:
  //     "NBEMS Extends Deficient Documents Submission Deadline Till January 7, 2026",
  //   type: "warning",
  //   date: "Sun, 30 Dec",
  //   time: "10:30 AM",
  //   read: false,
  //   link: "/notice",
  // },
  // {
  //   id: "4",
  //   title: "NEET PG Round 2 - Info",
  //   message: "Fresh Seat In AI R2, Joining & Reporting process explained",
  //   type: "info",
  //   date: "Wed, 17 Dec",
  //   time: "3:45 PM",
  //   read: true,
  //   link: "/schedule"
  // },
  // {
  //   id: "5",
  //   title: "NEET PG 2025 Results Announced!",
  //   message: "Check your scorecard and start your counselling registration. Cutoff scores updated.",
  //   type: "success",
  //   date: "Mon, 15 Dec",
  //   time: "9:00 AM",
  //   read: true,
  //   link: "/"
  // }
];

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
