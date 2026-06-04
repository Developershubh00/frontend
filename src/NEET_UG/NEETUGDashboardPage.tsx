import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Sidebar from "./NEETUGSidebar";
import NEETUGMainContent from "../NEET_UG/NEETUGMainContent";
import RightSidebar from "./NEETUGRightSideBar";
import MobileBottomNav from "../components/MobileBottomNav";
import AiSensyWidget from "../components/AiSensyWidget";
import { neetAPI, counsellingAPI } from "../services/api";

/**
 * NEETUG Dashboard Page Component
 * Main dashboard for NEETUG (AIIMS PG) with sidebar navigation and content area
 * Layout matches NEET dashboard but displays NEETUG-specific content
 */
const NEETUGDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("NEETUG");
  const [searchValue, setSearchValue] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    NEETUGStats: [],
    timeline: [],
    choiceLists: [],
  });

  /**
   * Fetch NEETUG dashboard data on component mount
   * Note: Adjust API endpoints based on your actual NEETUG API structure
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with actual NEETUG API endpoints when available
        const [timeline, choiceLists] = await Promise.all([
          counsellingAPI.getTimeline(),
          counsellingAPI.getChoiceLists(),
        ]);

        setDashboardData({
          NEETUGStats: [], // Add NEETUG-specific stats API when available
          timeline: timeline.data,
          choiceLists: choiceLists.data,
        });
      } catch (error) {
        console.error("Failed to fetch NEETUG dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSearchChange = (value: string) => setSearchValue(value);
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);

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
        />
      </div>

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
            width: "calc(100vw - 256px - 320px)",
            minWidth: "320px",
          }}
        >
          {/* NEETUG Main Content */}
          <div className="p-4 lg:p-6">
            <NEETUGMainContent />
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

      {/* AiSensy Widget */}
      <AiSensyWidget widgetId="aaa5qq" />
    </div>
  );
};

export default NEETUGDashboardPage;
