import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Bell,
  User,
  Heart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
/**
 * Unified Header Component
 * Main navigation header with search, user menu, and mobile navigation
 * Integrated with React Router for navigation
 */
interface HeaderProps {
  onSearchChange: (value: string) => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  user?: any;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  onMobileMenuToggle,
  isMobileMenuOpen,
  user,
  onSectionChange,
}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // NEET PG dropdown options with navigation
  const neetOptions = [
    { id: "neet-pg", label: "NEET PG 2025", description: "Postgraduate Medical", path: "/neet-pg" },
    { id: "inicet", label: "INICET 2025", description: "Institute of National Importance", path: "/inicet" },
  ];

  // Predictor dropdown options
  const predictorOptions = [
    { id: "pg-predictor", label: "PG Predictor", description: "NEET PG Specialty Predictor", path: "/predictor/pg" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 px-4 lg:px-6 py-2 lg:py-2 sticky top-0 z-40 shadow-sm h-16">
      <div className="flex items-center justify-between h-full">
        {/* Mobile Header Layout */}
        <div className="xl:hidden flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                src="/media/logo.png"
                alt="BD Logo"
                 className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[clamp(10px,2vw,20px)] truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Believers Consultancy
                </h1>
              </div>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button> */}

            <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <User className="w-4 h-4" />
              <span className="font-medium text-sm">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </button>

            <button
              onClick={onMobileMenuToggle}
              className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Header Layout */}
        <div className="hidden xl:flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                src="/media/logo.png"
                alt="BD Logo"
                 className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[clamp(10px,2vw,20px)] truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Believers Consultancy
                </h1>
                <p className="text-xs text-[clamp(14px,2vw,24px)] truncate text-slate-500">
                  Medical Career Guidance
                </p>
              </div>
            </button>

            <div className="flex items-center space-x-6">
              {/* NEET Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("neet")}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <span>NEET</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "neet" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/50 py-2 z-50 animate-in slide-in-from-top-2">
                    {neetOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          navigate(option.path);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="font-medium text-slate-800">
                          {option.label}
                        </div>
                        <div className="text-sm text-slate-600">
                          {option.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Predictor Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("predictor")}
                  className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <span>Predictors</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "predictor" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/50 py-2 z-50 animate-in slide-in-from-top-2">
                    {predictorOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          navigate(option.path);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="font-medium text-slate-800">
                          {option.label}
                        </div>
                        <div className="text-sm text-slate-600">
                          {option.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* <button
                className="flex items-center space-x-2 px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200 font-medium"
                onClick={() => navigate("/choice-lists")}
              >
                <Heart className="w-4 h-4" />
                <span>My Choice Lists</span>
              </button> */}
            </div>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, colleges..."
                value={searchValue}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2.5 w-64 lg:w-80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/50 transition-all duration-200"
              />
            </div>

            <div className="flex items-center space-x-2">
              {/* <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button> */}

              <div className="relative">
                {/* <button
                  onClick={() => toggleDropdown("institutes")}
                  className="flex items-center space-x-1 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <span>Institutes</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "institutes" && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/50 py-2 z-50 animate-in slide-in-from-top-2">
                    <button
                      onClick={() => navigate("/universities")}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      All Institutes
                    </button>
                    <button
                      onClick={() => navigate("/rankings")}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Top Institutes
                    </button>
                    <button
                      onClick={() => navigate("/medical-colleges")}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Government
                    </button>
                  </div>
                )} */}
              </div>

              <button
                onClick={() => navigate("/faq")}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                FAQ
              </button>

              <button
                onClick={() => navigate("/support")}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Support
              </button>
            </div>

            <button className="p-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("profile")}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <User className="w-4 h-4" />
                <span className="font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "profile" && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/50 py-2 z-50 animate-in slide-in-from-top-2">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setActiveDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <div className="font-medium">My Profile</div>
                    <div className="text-xs text-slate-500">View and edit profile</div>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setActiveDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <div className="font-medium">Dashboard</div>
                    <div className="text-xs text-slate-500">Go to dashboard</div>
                  </button>
                  <hr className="my-2 border-slate-200" />
                  <button
                    onClick={() => {
                      // Handle logout
                      setActiveDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <div className="font-medium">Logout</div>
                    <div className="text-xs text-red-500">Sign out of account</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="xl:hidden mt-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses, colleges..."
            value={searchValue}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/50 transition-all duration-200"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;