import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Main Pages
import DashboardPage from "./pages/DashboardPage";
import DashboardProfilePage from "./pages/DashboardProfilePage";

// NEET PG Pages
import NeetPGPage from "./pages/NeetPGPage";
import INICETPage from "./pages/INICETPage";
import Homepage from "./pages/Homepage";

// Data Pages
import AllotmentsPage from "./pages/AllotmentsPage";
import ClosingRanksPage from "./pages/ClosingRanksPage";
import SeatMatrixPage from "./pages/SeatMatrixPage";
import FeeStipendBondPage from "./pages/FeeStipendBondPage";
import StateTabs from "./components/StateTabs";

// Component Pages
import FAQPage from "./components/FAQPage";
import SupportPage from "./components/SupportPage";
import UniversitiesPage from "./components/UniversitiesPage";
import MedicalCollegesPage from "./components/MedicalCollegesPage";
import ResultrankingPage from "./components/Resultrankingpage";
import CounsellingPage from "./components/Counsellingpage";
import DebugPage from "./pages/DebugPage";

// Predictor Pages
import PGPredictorPage from "./pages/PGPredictorPage";
import PrivacyPolicy from "./pages/Privacypolicypage";
import TermsConditions from "./pages/Termsconditions";
import ChoiceLists from "./components/ChoiceLists";

/**
 * Main App Component with React Router
 * Restructured with proper authentication flow and navigation
 * All routes are properly organized with API integration comments
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
          <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardProfilePage />
              </ProtectedRoute>
            }
          />
          
          {/* <Route
          path="/statetabs"
          element={
            <ProtectedRoute>
             <StateCounsellingPage />
             </ProtectedRoute>
             }
          /> */}

          {/* NEET PG Exam Routes - API Integration: /api/neet/ */}
          <Route
            path="/neet-pg"
            element={
              <ProtectedRoute>
                <NeetPGPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inicet"
            element={
              <ProtectedRoute>
                <INICETPage />
              </ProtectedRoute>
            }
          />

          {/* Predictor Routes - API Integration: /api/predictor/ */}
          <Route
            path="/predictor/pg"
            element={
              <ProtectedRoute>
                <PGPredictorPage />
              </ProtectedRoute>
            }
          />

          {/* Data Pages Routes - API Integration: /api/neet/ */}
          <Route
            path="/allotments"
            element={
              <ProtectedRoute>
                <AllotmentsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/closing-ranks"
            element={
              <ProtectedRoute>
                <ClosingRanksPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seat-matrix"
            element={
              <ProtectedRoute>
                <SeatMatrixPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fee-stipend-bond"
            element={
              <ProtectedRoute>
                <FeeStipendBondPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          {/* Information Pages - API Integration: Various endpoints */}
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/universities"
            element={
              <ProtectedRoute>
                <UniversitiesPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical-colleges"
            element={
              <ProtectedRoute>
                <MedicalCollegesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rankings"
            element={
              <ProtectedRoute>
                <ResultrankingPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/counselling"
            element={
              <ProtectedRoute>
                <CounsellingPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          {/* Debug Route */}
          <Route path="/debug" element={<DebugPage />} />

          {/* Default Routes */}
          <Route path="/" element={<Homepage />} />     
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/choicelists" element={<ChoiceLists />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;