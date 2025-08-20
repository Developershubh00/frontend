import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Search } from "lucide-react";

interface StateTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface TabData {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
  category: string;
}

const StateTabs: React.FC<StateTabsProps> = ({ activeTab, onTabChange }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const availableTabs: TabData[] = [
    // All India PG
    {
      id: "all-india-pg",
      label: "All India Counselling - PG Medical",
      shortLabel: "All India - PG Medical",
      icon: "🏛️",
      color: "from-blue-500 to-indigo-600",
      category: "all-india"
    },
    
    // State-wise PG Medical
    {
      id: "andhra-pg",
      label: "Andhra Pradesh - PG Medical",
      shortLabel: "Andhra Pradesh - PG",
      icon: "👨‍⚕️",
      color: "from-green-500 to-teal-600",
      category: "state-pg"
    },
    {
      id: "maharashtra-pg",
      label: "Maharashtra - PG Medical",
      shortLabel: "Maharashtra - PG",
      icon: "👨‍⚕️",
      color: "from-purple-500 to-pink-600",
      category: "state-pg"
    },
    {
      id: "karnataka-pg",
      label: "Karnataka - PG Medical",
      shortLabel: "Karnataka - PG",
      icon: "👨‍⚕️",
      color: "from-indigo-500 to-blue-600",
      category: "state-pg"
    },
    {
      id: "tamil-nadu-pg",
      label: "Tamil Nadu - PG Medical",
      shortLabel: "Tamil Nadu - PG",
      icon: "👨‍⚕️",
      color: "from-emerald-500 to-green-600",
      category: "state-pg"
    },
    {
      id: "telangana-pg",
      label: "Telangana - PG Medical",
      shortLabel: "Telangana - PG",
      icon: "👨‍⚕️",
      color: "from-violet-500 to-indigo-600",
      category: "state-pg"
    },
    {
      id: "kerala-pg",
      label: "Kerala - PG Medical",
      shortLabel: "Kerala - PG",
      icon: "👨‍⚕️",
      color: "from-cyan-500 to-blue-600",
      category: "state-pg"
    },
    {
      id: "gujarat-pg",
      label: "Gujarat - PG Medical",
      shortLabel: "Gujarat - PG",
      icon: "👨‍⚕️",
      color: "from-pink-500 to-rose-600",
      category: "state-pg"
    },
    {
      id: "haryana-pg",
      label: "Haryana - PG Medical",
      shortLabel: "Haryana - PG",
      icon: "👨‍⚕️",
      color: "from-yellow-500 to-orange-600",
      category: "state-pg"
    },
    {
      id: "punjab-pg",
      label: "Punjab - PG Medical",
      shortLabel: "Punjab - PG",
      icon: "👨‍⚕️",
      color: "from-lime-500 to-green-600",
      category: "state-pg"
    },
    {
      id: "rajasthan-pg",
      label: "Rajasthan - PG Medical",
      shortLabel: "Rajasthan - PG",
      icon: "👨‍⚕️",
      color: "from-amber-500 to-yellow-600",
      category: "state-pg"
    },
    {
      id: "madhya-pradesh-pg",
      label: "Madhya Pradesh - PG Medical",
      shortLabel: "MP - PG",
      icon: "👨‍⚕️",
      color: "from-red-500 to-pink-600",
      category: "state-pg"
    },
    {
      id: "uttar-pradesh-pg",
      label: "Uttar Pradesh - PG Medical",
      shortLabel: "UP - PG",
      icon: "👨‍⚕️",
      color: "from-orange-500 to-red-600",
      category: "state-pg"
    },
    {
      id: "bihar-pg",
      label: "Bihar - PG Medical",
      shortLabel: "Bihar - PG",
      icon: "👨‍⚕️",
      color: "from-fuchsia-500 to-purple-600",
      category: "state-pg"
    },
    {
      id: "west-bengal-pg",
      label: "West Bengal - PG Medical",
      shortLabel: "WB - PG",
      icon: "👨‍⚕️",
      color: "from-sky-500 to-blue-600",
      category: "state-pg"
    },
    {
      id: "odisha-pg",
      label: "Odisha - PG Medical",
      shortLabel: "Odisha - PG",
      icon: "👨‍⚕️",
      color: "from-teal-500 to-cyan-600",
      category: "state-pg"
    },
    {
      id: "assam-pg",
      label: "Assam - PG Medical",
      shortLabel: "Assam - PG",
      icon: "👨‍⚕️",
      color: "from-emerald-500 to-teal-600",
      category: "state-pg"
    },
    {
      id: "jharkhand-pg",
      label: "Jharkhand - PG Medical",
      shortLabel: "Jharkhand - PG",
      icon: "👨‍⚕️",
      color: "from-green-500 to-emerald-600",
      category: "state-pg"
    },
    {
      id: "chhattisgarh-pg",
      label: "Chhattisgarh - PG Medical",
      shortLabel: "CG - PG",
      icon: "👨‍⚕️",
      color: "from-lime-500 to-green-600",
      category: "state-pg"
    },
    {
      id: "himachal-pradesh-pg",
      label: "Himachal Pradesh - PG Medical",
      shortLabel: "HP - PG",
      icon: "👨‍⚕️",
      color: "from-blue-500 to-indigo-600",
      category: "state-pg"
    },
    {
      id: "uttarakhand-pg",
      label: "Uttarakhand - PG Medical",
      shortLabel: "UK - PG",
      icon: "👨‍⚕️",
      color: "from-cyan-500 to-blue-600",
      category: "state-pg"
    },
    {
      id: "goa-pg",
      label: "Goa - PG Medical",
      shortLabel: "Goa - PG",
      icon: "👨‍⚕️",
      color: "from-teal-500 to-cyan-600",
      category: "state-pg"
    },
    {
      id: "delhi-pg",
      label: "Delhi - PG Medical",
      shortLabel: "Delhi - PG",
      icon: "👨‍⚕️",
      color: "from-red-500 to-rose-600",
      category: "state-pg"
    },
    {
      id: "chandigarh-pg",
      label: "Chandigarh - PG Medical",
      shortLabel: "Chandigarh - PG",
      icon: "👨‍⚕️",
      color: "from-purple-500 to-violet-600",
      category: "state-pg"
    },
    {
      id: "jammu-kashmir-pg",
      label: "Jammu & Kashmir - PG Medical",
      shortLabel: "J&K - PG",
      icon: "👨‍⚕️",
      color: "from-blue-500 to-indigo-600",
      category: "state-pg"
    },
    {
      id: "manipur-pg",
      label: "Manipur - PG Medical",
      shortLabel: "Manipur - PG",
      icon: "👨‍⚕️",
      color: "from-pink-500 to-rose-600",
      category: "state-pg"
    },
    {
      id: "tripura-pg",
      label: "Tripura - PG Medical",
      shortLabel: "Tripura - PG",
      icon: "👨‍⚕️",
      color: "from-emerald-500 to-green-600",
      category: "state-pg"
    },
    {
      id: "sikkim-pg",
      label: "Sikkim - PG Medical",
      shortLabel: "Sikkim - PG",
      icon: "👨‍⚕️",
      color: "from-blue-500 to-indigo-600",
      category: "state-pg"
    },
    {
      id: "pondicherry-pg",
      label: "Pondicherry - PG Medical",
      shortLabel: "Pondicherry - PG",
      icon: "👨‍⚕️",
      color: "from-indigo-500 to-purple-600",
      category: "state-pg"
    },
    
    // Management Quota PG
    {
      id: "andhra-mgmt-pg",
      label: "Andhra Pradesh Management Quota - PG Medical",
      shortLabel: "Andhra Mgmt - PG",
      icon: "💰",
      color: "from-yellow-500 to-orange-600",
      category: "management"
    },
    {
      id: "karnataka-mgmt-pg",
      label: "Karnataka Management Quota - PG Medical",
      shortLabel: "Karnataka Mgmt - PG",
      icon: "💰",
      color: "from-yellow-500 to-orange-600",
      category: "management"
    },
    {
      id: "tamil-nadu-mgmt-pg",
      label: "Tamil Nadu Management Quota - PG Medical",
      shortLabel: "TN Mgmt - PG",
      icon: "💰",
      color: "from-yellow-500 to-orange-600",
      category: "management"
    },
    {
      id: "telangana-mgmt-pg",
      label: "Telangana Management Quota - PG Medical",
      shortLabel: "Telangana Mgmt - PG",
      icon: "💰",
      color: "from-yellow-500 to-orange-600",
      category: "management"
    },
    {
      id: "maharashtra-mgmt-pg",
      label: "Maharashtra Management Quota - PG Medical",
      shortLabel: "Maharashtra Mgmt - PG",
      icon: "💰",
      color: "from-yellow-500 to-orange-600",
      category: "management"
    },
    {
      id: "gujarat-mgmt-pg",
      label: "Gujarat Management Quota - PG Medical",
      shortLabel: "Gujarat Mgmt - PG",
      icon: "💰",
      color: "from-yellow-500 to-orange-600",
      category: "management"
    },
    {
      id: "kerala-mgmt-pg",
      label: "Kerala Management Quota - PG Medical",
      shortLabel: "Kerala Mgmt - PG",
      icon: "💰",
      color: "from-yellow-500 to-orange-600",
      category: "management"
    },
    
    // Special Categories PG
    {
      id: "inicet-pg",
      label: "INICET Counselling - PG Medical",
      shortLabel: "INICET - PG",
      icon: "🎓",
      color: "from-purple-500 to-violet-600",
      category: "special"
    },
    {
      id: "neet-ss-pg",
      label: "NEET SS Counselling - PG Medical",
      shortLabel: "NEET SS - PG",
      icon: "🎯",
      color: "from-red-500 to-pink-600",
      category: "special"
    },
    {
      id: "dnb-sponsored-pg",
      label: "DNB Sponsored - PG Medical",
      shortLabel: "DNB Sponsored - PG",
      icon: "📘",
      color: "from-blue-500 to-indigo-600",
      category: "special"
    },
    {
      id: "dnb-pdcet-pg",
      label: "DNB PDCET - PG Medical",
      shortLabel: "DNB PDCET - PG",
      icon: "📗",
      color: "from-emerald-500 to-green-600",
      category: "special"
    },
    {
      id: "afms-pg",
      label: "Armed Forces Medical Services - PG Medical",
      shortLabel: "AFMS - PG",
      icon: "🎖️",
      color: "from-yellow-500 to-amber-600",
      category: "special"
    },
    {
      id: "neigrihms-pg",
      label: "NEIGRIHMS - PG Medical",
      shortLabel: "NEIGRIHMS - PG",
      icon: "🏥",
      color: "from-pink-500 to-rose-600",
      category: "special"
    },
    {
      id: "open-states-pg",
      label: "Open States (Private Institute Seats) - PG Medical",
      shortLabel: "Open States - PG",
      icon: "🏫",
      color: "from-purple-500 to-pink-600",
      category: "special"
    }
  ];

  const [activeTabs, setActiveTabs] = useState<TabData[]>([
    availableTabs[0], // Start with All India PG
    availableTabs[1], // Andhra PG
    availableTabs[2], // Maharashtra PG
  ]);

  const categories = [
    { id: "all", label: "All Categories", icon: "📋" },
    { id: "all-india", label: "All India PG", icon: "🏛️" },
    { id: "state-pg", label: "State PG", icon: "👨‍⚕️" },
    { id: "management", label: "Management Quota", icon: "💰" },
    { id: "special", label: "Special Categories", icon: "⭐" }
  ];

  const filteredTabs = availableTabs.filter(tab => {
    const matchesSearch = tab.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tab.shortLabel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tab.category === selectedCategory;
    const notAlreadyActive = !activeTabs.find(activeTab => activeTab.id === tab.id);
    
    return matchesSearch && matchesCategory && notAlreadyActive;
  });

  const addTab = (tab: TabData) => {
    if (activeTabs.length < 8) { // Limit to 8 tabs
      setActiveTabs([...activeTabs, tab]);
      setShowAddModal(false);
      setSearchTerm("");
      setSelectedCategory("all");
    }
  };

  const removeTab = (tabId: string) => {
    if (activeTabs.length > 1) { // Keep at least one tab
      const newTabs = activeTabs.filter(tab => tab.id !== tabId);
      setActiveTabs(newTabs);
      if (activeTab === tabId) {
        onTabChange(newTabs[0].id);
      }
    }
  };

  return (
    <>
      <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg shadow-sm px-2 py-1.5 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-0.5 flex-1 min-w-0">
            <button className="p-1 hover:bg-slate-100 rounded-md transition-colors hidden lg:block flex-shrink-0">
              <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
            </button>

            <div className="flex items-center space-x-0.5 lg:space-x-1 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {activeTabs.map((tab) => (
                <div key={tab.id} className="relative group flex-shrink-0">
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center space-x-1 lg:space-x-1.5 px-1.5 py-1 lg:px-2 lg:py-1.5 rounded-md whitespace-nowrap transition-all duration-300 transform hover:scale-105 text-xs ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-sm`
                        : "text-slate-700 hover:bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <span className="text-xs lg:text-sm">{tab.icon}</span>
                    <span className="font-medium">
                      <span className="lg:hidden">{tab.shortLabel}</span>
                      <span className="hidden lg:inline">{tab.label}</span>
                    </span>
                  </button>
                  
                  {/* Remove button - only show on hover and if more than 1 tab */}
                  {activeTabs.length > 1 && (
                    <button
                      onClick={() => removeTab(tab.id)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button className="p-1 hover:bg-slate-100 rounded-md transition-colors hidden lg:block flex-shrink-0">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            disabled={activeTabs.length >= 8}
            className="flex items-center space-x-1 px-1.5 py-1 text-slate-600 hover:bg-slate-50 rounded-md transition-colors flex-shrink-0 ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-3 h-3" />
            <span className="hidden sm:inline text-xs font-medium">Add Tab</span>
          </button>
        </div>
      </div>

      {/* Add Tab Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-800">Add New PG Medical Tab</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="p-6 border-b border-slate-200">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search PG Medical tabs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab List */}
            <div className="p-6 overflow-y-auto max-h-96">
              {filteredTabs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500">No PG Medical tabs found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => addTab(tab)}
                      className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800 text-sm">
                          {tab.shortLabel}
                        </div>
                        <div className="text-xs text-slate-500">
                          {tab.label}
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  {activeTabs.length}/8 tabs active
                </p>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StateTabs;
