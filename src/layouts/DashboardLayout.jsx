import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./DashboardLayout.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="dashboard-body">
        {/* Mobile / Tablet Toggle */}
        <button
          className={`dashboard-sidebar-toggle ${
            sidebarOpen ? "sidebar-toggle-open" : ""
          }`}
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="dashboard-sidebar-overlay" onClick={closeSidebar} />
        )}

        {/* Sidebar */}
        <aside
          className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
        >
          <h2>Dashboard</h2>

          {/* NEET PG */}
          <div className="sidebar-menu-group">
            <NavLink
              to="/dashboard/neet-pg"
              onClick={closeSidebar}
              className="sidebar-exam-link"
            >
              <Stethoscope size={20} />
              <span>NEET PG</span>
            </NavLink>

            <div className="sidebar-submenu">
              <NavLink
                to="/dashboard/neetpg-allotments-2026"
                onClick={closeSidebar}
                className="sidebar-submenu-link"
              >
                All India Allotments 2026
              </NavLink>
              <NavLink
                to="/dashboard/neetpg-allotments-2025"
                onClick={closeSidebar}
                className="sidebar-submenu-link"
              >
                All India Allotments 2025
              </NavLink>
            </div>
          </div>

          {/* NEET UG */}
          <div className="sidebar-menu-group">
            <NavLink
              to="/dashboard/neet-ug"
              onClick={closeSidebar}
              className="sidebar-exam-link"
            >
              <GraduationCap size={20} />
              <span>NEET UG</span>
            </NavLink>

            <div className="sidebar-submenu">
              <NavLink
                to="/dashboard/neetug-allotments-2025"
                onClick={closeSidebar}
                className="sidebar-submenu-link"
              >
                All India Allotments 2025
              </NavLink>
            </div>
          </div>

          {/* INI-CET */}
          <div className="sidebar-menu-group">
            <NavLink
              to="/dashboard/inicet"
              onClick={closeSidebar}
              className="sidebar-exam-link"
            >
              <BookOpen size={20} />
              <span>INI-CET</span>
            </NavLink>

            <div className="sidebar-submenu">
              <NavLink
                to="/dashboard/inicet-allotments-july-2026"
                onClick={closeSidebar}
                className="sidebar-submenu-link"
              >
                All India Allotments July 2026
              </NavLink>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardLayout;
