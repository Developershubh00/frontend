// import React, { useState } from "react";
// import {
//   Home,
//   GraduationCap,
//   Award,
//   User,
//   HelpCircle,
//   Menu,
// } from "lucide-react";

// interface MobileBottomNavProps {
//   activeSection: string;
//   onSectionChange: (section: string) => void;
// }

// /**
//  * Mobile Bottom Navigation Component
//  * UPDATED: Navigation items now match desktop sidebar
//  * Improved responsiveness and visual design
//  */
// const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
//   activeSection,
//   onSectionChange,
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Updated navigation items to match desktop sidebar
//   const navItems = [
//     { id: "home", icon: Home, label: "Dashboard" },
//     { id: "universities", icon: GraduationCap, label: "Universities" },
//     { id: "results", icon: Award, label: "Rankings" },
//     { id: "faq", icon: HelpCircle, label: "FAQ" },
//     { id: "profile", icon: User, label: "Profile" },
//   ];

//   // Additional menu items for the drawer
//   const menuItems = [
//     {
//       id: "Counselling",
//       label: "Counselling",
//       description: "NEET Counselling Process",
//     },
//     { id: "support", label: "Support", description: "Get Help & Assistance" },
//     {
//       id: "universities",
//       label: "Universities",
//       description: "Medical Colleges",
//     },
//     {
//       id: "results",
//       label: "Results & Rankings",
//       description: "NIRF Rankings",
//     },
//   ];

//   return (
//     <>
//       {/* Fixed Bottom Navbar */}
//       <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/50 px-2 py-2 z-40 shadow-lg pointer-events-auto">
//         <div className="flex items-center justify-around">
//           {navItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => onSectionChange(item.id)}
//               className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-200 ${
//                 activeSection === item.id
//                   ? "text-blue-600 bg-blue-50 shadow-sm scale-105"
//                   : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
//               }`}
//             >
//               <item.icon className="w-5 h-5 mb-1" />
//               <span className="text-xs font-medium">{item.label}</span>
//             </button>
//           ))}
//           {/* Menu Button */}
//           <button
//             onClick={() => setMenuOpen(true)}
//             className="flex flex-col items-center justify-center w-14 h-12 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200"
//             aria-label="Open menu"
//           >
//             <Menu className="w-5 h-5 mb-1" />
//             <span className="text-xs font-medium">More</span>
//           </button>
//         </div>
//       </div>

//       {/* Right Side Drawer */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 z-50 flex justify-end lg:hidden"
//           onClick={() => setMenuOpen(false)}
//         >
//           {/* Backdrop */}
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

//           {/* Drawer Content */}
//           <div
//             className="relative bg-white/95 backdrop-blur-xl w-80 h-full shadow-2xl border-l border-slate-200/50"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Drawer Header */}
//             <div className="p-6 border-b border-slate-200/50">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-lg font-bold text-slate-800">
//                     Navigation
//                   </h3>
//                   <p className="text-sm text-slate-600">Explore more options</p>
//                 </div>
//                 <button
//                   className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   <span className="text-slate-500 text-xl">×</span>
//                 </button>
//               </div>
//             </div>

//             {/* Menu Items */}
//             <div className="p-4 space-y-2">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     onSectionChange(item.id);
//                     setMenuOpen(false);
//                   }}
//                   className={`w-full text-left p-4 rounded-xl transition-all duration-200 hover:bg-slate-50 ${
//                     activeSection === item.id
//                       ? "bg-blue-50 border border-blue-200"
//                       : "border border-transparent"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4
//                         className={`font-semibold ${
//                           activeSection === item.id
//                             ? "text-blue-700"
//                             : "text-slate-800"
//                         }`}
//                       >
//                         {item.label}
//                       </h4>
//                       <p className="text-sm text-slate-600 mt-1">
//                         {item.description}
//                       </p>
//                     </div>
//                     <div
//                       className={`w-2 h-2 rounded-full ${
//                         activeSection === item.id
//                           ? "bg-blue-500"
//                           : "bg-slate-300"
//                       }`}
//                     />
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {/* Footer */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
//               <div className="text-center">
//                 <h4 className="font-semibold text-slate-800 mb-2">
//                   Need Help?
//                 </h4>
//                 <button
//                   onClick={() => {
//                     onSectionChange("support");
//                     setMenuOpen(false);
//                   }}
//                   className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
//                 >
//                   Contact Support
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileBottomNav;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  GraduationCap,
  Award,
  User,
  HelpCircle,
  Menu,
  UserCheck,
  X,
} from "lucide-react";

interface MobileBottomNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

/**
 * Mobile Bottom Navigation Component
 * UPDATED: Navigation items now match desktop sidebar with working navigation
 */
const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Updated navigation items to match desktop sidebar with navigation paths
  const navItems = [
    { 
      id: "home", 
      icon: Home, 
      label: "Dashboard",
      path: "/dashboard"
    },
    { 
      id: "universities", 
      icon: GraduationCap, 
      label: "Universities",
      path: "/universities"
    },
    { 
      id: "results", 
      icon: Award, 
      label: "Rankings",
      path: "/rankings"
    },
    { 
      id: "faq", 
      icon: HelpCircle, 
      label: "FAQ",
      path: "/faq"
    },
    { 
      id: "profile", 
      icon: User, 
      label: "Profile",
      path: "/profile"
    },
  ];

  // Additional menu items for the drawer with navigation paths
  const menuItems = [
    {
      id: "counselling",
      label: "Counselling",
      description: "NEET Counselling Process",
      path: "/counselling"
    },
    { 
      id: "support", 
      label: "Support", 
      description: "Get Help & Assistance",
      path: "/support"
    },
    {
      id: "medical-colleges",
      label: "Medical Colleges",
      description: "Medical Colleges Information",
      path: "/medical-colleges"
    },
    {
      id: "allotments",
      label: "Allotments",
      description: "Seat Allotment Results",
      path: "/allotments"
    },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    onSectionChange(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleMenuNavigation = (item: typeof menuItems) => {
    onSectionChange(item.id);
    if (item.path) {
      navigate(item.path);
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40 lg:hidden">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-blue-600 bg-blue-50 shadow-sm scale-105"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
                aria-label={item.label}
              >
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center w-14 h-12 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Right Side Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          {/* Drawer Content */}
          <div
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                  <p className="text-sm text-gray-600">Explore more options</p>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMenuNavigation(item)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 hover:bg-slate-50 ${
                        activeSection === item.id
                          ? "bg-blue-50 border border-blue-200"
                          : "border border-transparent"
                      }`}
                    >
                      <div className="font-medium text-gray-900 mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600 mb-3 text-center">
                  Need Help?
                </p>
                <button
                  onClick={() => handleMenuNavigation({
                    id: "support",
                    label: "Support",
                    description: "Contact Support",
                    path: "/support"
                  })}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom padding to prevent content from being hidden behind the nav */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default MobileBottomNav;
