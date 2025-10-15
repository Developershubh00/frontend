// InicetFeeStipendPage.tsx
// ============================================
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import MobileBottomNav from "../components/MobileBottomNav";
import AiSensyWidget from "../components/AiSensyWidget";
import { Award, ArrowLeft } from "lucide-react";

const InicetFeeStipendPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("fee-stipend");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 overflow-hidden">
      <div className="h-16 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/50 z-40 fixed top-0 left-0 right-0">
        <Header
          onSearchChange={() => {}}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          user={user}
          onSectionChange={setActiveSection}
        />
      </div>

      <div className="flex h-full w-full pt-16">
        <div className="hidden lg:block w-64 h-full bg-white/95 backdrop-blur-xl border-r border-slate-200/50 z-30">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} isCollapsed={false} onToggleCollapse={() => {}} />
        </div>

        <div className="flex-1 h-full overflow-y-auto" style={{ width: 'calc(100vw - 256px - 320px)', minWidth: '320px' }}>
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            <button onClick={() => navigate("/inicet")} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to INICET Dashboard</span>
            </button>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">INICET Fee & Stipend</h1>
                  <p className="text-slate-600">Financial details for INICET institutes</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-slate-700">Fee and stipend data will be displayed here. Connect to your data source to populate this page.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:block w-80 h-full bg-white/95 backdrop-blur-xl border-l border-slate-200/50 z-30">
          <RightSidebar isOpen={true} onToggle={() => {}} choiceLists={[]} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} className="relative z-10" isCollapsed={false} onToggleCollapse={() => {}} />
        </div>
      )}

      <MobileBottomNav activeSection={activeSection} onSectionChange={setActiveSection} />
      <AiSensyWidget widgetId="aaa5qq" />
    </div>
  );
};

export default InicetFeeStipendPage;