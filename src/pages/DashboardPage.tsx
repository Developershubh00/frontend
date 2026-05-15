

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import RightSidebar from "../components/RightSidebar";
import MobileBottomNav from "../components/MobileBottomNav";
import AIAssistant from "../components/AIAssistant";
// import WhatsAppSupport from "../components/WhatsAppSupport";
// import StateTabs from "../components/StateTabs";
import { neetAPI, counsellingAPI } from "../services/api";
import WhatsAppSupport from "../components/WhatsAppSupport";
import AiSensyWidget from "../components/AiSensyWidget";
import { 
  notificationsData, 
  getUnreadCount, 
  markAsRead, 
  markAllAsRead 
} from "../data/notifications";
import type { Notification } from "../data/notifications";
import NotificationPopup from "../components/NotificationPopup";
import NotificationsPage from "./NotificationsPage";

/**
 * Enhanced Dashboard Page Component for NEET PG Platform
 * Main dashboard with sidebar navigation, right sidebar, and content area
 * API Integration: Multiple endpoints for dashboard data
 */
const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const [searchValue, setSearchValue] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [activeStateTab, setActiveStateTab] = useState("all-india");

 // Notification states
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [showNotificationsPage, setShowNotificationsPage] = useState(false);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(true);


  const [dashboardData, setDashboardData] = useState({
    neetStats: [],
    timeline: [],
    choiceLists: [],
  });

  /**
   * Fetch dashboard data on component mount
   * API Integration: GET /api/neet/results/, /api/counselling/timeline/, /api/counselling/choice-lists/
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [neetResults, timeline, choiceLists] = await Promise.all([
          neetAPI.getResults(),
          counsellingAPI.getTimeline(),
          counsellingAPI.getChoiceLists(),
        ]);

        setDashboardData({
          neetStats: neetResults.data,
          timeline: timeline.data,
          choiceLists: choiceLists.data,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Show notification popup on EVERY page load/reload
  useEffect(() => {
    // Check if there are unread notifications
    const hasUnread = notifications.some(n => !n.read);
    
    if (hasUnread && notifications.length > 0) {
      // Auto-open notification popup after 1.5 seconds on every load
      const timer = setTimeout(() => {
        setIsNotificationPopupOpen(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this runs on every mount/reload

  // Notification handlers
  const handleNotificationClick = () => {
    setIsNotificationPopupOpen(!isNotificationPopupOpen);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(markAsRead(notifications, id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(markAllAsRead(notifications));
  };

  const handleViewAllNotifications = () => {
    setIsNotificationPopupOpen(false);
    setShowNotificationsPage(true);
  };

  const handleBackToDashboard = () => {
    setShowNotificationsPage(false);
  };


  const handleSearchChange = (value: string) => setSearchValue(value);
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  const handleStateSelect = (state: string) => {
    // Handle state selection for data filtering
    console.log("Selected state:", state);
  };

   // If showing notifications page, render it instead
  if (showNotificationsPage) {
    return (
      <NotificationsPage
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="h-screen-dynamic w-screen-dynamic bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="h-16 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/50 z-40 fixed top-0 left-0 right-0">
        <Header
          onSearchChange={handleSearchChange}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          user={user}
          onSectionChange={handleSectionChange}
          unreadCount={getUnreadCount(notifications)}
          onNotificationClick={handleNotificationClick}
        />
      </div>

      {/* Notification Popup */}
      <NotificationPopup
        notifications={notifications}
        isOpen={isNotificationPopupOpen}
        onClose={() => setIsNotificationPopupOpen(false)}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onViewAll={handleViewAllNotifications}
      />

      {/* Main Layout Container */}
      <div className="flex h-full w-full pt-16">
        {/* Left Sidebar - Fixed width */}
        <div className="hidden lg:block w-64 h-full bg-white/95 backdrop-blur-xl border-r border-slate-200/50 z-30">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            isCollapsed={false}
            onToggleCollapse={() => {}}
          />
        </div>

        {/* Main Content Area - Dynamic width */}
        <div 
          className="flex-1 h-full overflow-y-auto"
          style={{
            width: 'calc(100vw - 256px - 320px)',
            minWidth: '320px'
          }}
        >
          {/* State Tabs
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
            <StateTabs 
              activeTab={activeStateTab} 
              onTabChange={setActiveStateTab}
            />
          </div>
           */}
          {/* Main Content */}
          <div className="p-4 lg:p-6">
            <MainContent 
              activeTab={activeStateTab} 
              dashboardData={dashboardData}
            />
          </div>
        </div>

        {/* Right Sidebar - Fixed width */}
        <div className="hidden xl:block w-80 h-full bg-white/95 backdrop-blur-xl border-l border-slate-200/50 z-30">
          <RightSidebar
            isOpen={true}
            onToggle={() => {}}
            choiceLists={dashboardData.choiceLists}
          />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            className="relative z-10 transform transition-transform duration-300 ease-in-out"
            isCollapsed={false}
            onToggleCollapse={() => {}}
          />
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* AI Assistant Widget */}
      {/* <AIAssistant /> */}

      {/* WhatsApp Support Widget */}
      {/* <WhatsAppSupport/> */}
      <AiSensyWidget widgetId="aaa5qq" />
    </div>
  );
};

export default DashboardPage;