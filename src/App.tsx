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
// import UniversitiesPage from "./components/UniversitiesPage";
import MedicalCollegesPage from "./components/MedicalCollegesPage";
import ResultrankingPage from "./components/Resultrankingpage";
import CounsellingPage from "./components/Counsellingpage";
import DebugPage from "./pages/DebugPage";

// Predictor Pages
import PGPredictorPage from "./pages/PGPredictorPage";
import PrivacyPolicy from "./pages/Privacypolicypage";
import TermsConditions from "./pages/Termsconditions";
import ChoiceLists from "./components/ChoiceLists";
import AnnouncementPage from "./pages/AnnouncementPage";
import VerificationPage from "./pages/VerificationPage";
// import BlogPageWithAPI from "./pages/Blogpagewithapi";
// import BlogDetail from "./pages/Blogdetail";
import MultiCriteriaPredictor from "./MultiCriteriaPredictor";
import CoursesPage from "./components/CoursesPage";
import ClinicalDataPage from "./components/ClinicalDataPage";
import InstitutesPage from "./components/InstitutesPage";
import AdmittedStudentsPage from "./components/AdmittedStudentsPage";
import FeesStipendBondPage from "./pages/FeesStipendBondPage";
import { WhatsAppSender } from "./components/WhatsAppSender";
import ClossingRanksPage from "./components/ClossingRanksPage";
import AiSensyWidget from "./components/AiSensyWidget";
import NEETPGPredictor from "./pages/NEETPGPredictor";
import InicetMainContent from "./INICET/InicetMainContent";
import InicetAllotmentsPage from "./INICET/InicetAllotmentsPage";
import InicetClosingRanksPage from "./INICET/InicetClosingRanksPage";
import InicetSeatMatrixPage from "./INICET/InicetSeatMatrixPage";
import InicetFeeStipendPage from "./INICET/InicetFeeStipendPage";
import WhatsAppSupport from "./components/WhatsAppSupport";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
// import NEETPGCategoryChangeBlog from "./Blogs/NEETPGCategoryChangeBlog";

import { NotFound } from "./Error Pages/NotFound";

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
            path="/Aisensy"
            element={
              <ProtectedRoute>
                <WhatsAppSender />
              </ProtectedRoute>
            }
          /> */}
          
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
          {/* <Route
            path="/inicet"
            element={
              <ProtectedRoute>
                <INICETPage />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/inicet"
            element={
              <ProtectedRoute>
                <InicetMainContent />
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
              
                <SupportPage onBack={() => window.history.back()} />
              
            }
          />
          <Route
            path="/AiSensyWidget"
            element={
              <ProtectedRoute>
                <AiSensyWidget widgetId="aaa5qq" />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/AiSensyWidget"
            element={
              
                <WhatsAppSupport />
              
            }
          /> */}
          {/* <Route
            path="/universities"
            element={
              <ProtectedRoute>
                <UniversitiesPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          /> */}
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
          {/* 404 Route - MUST BE LAST */}
          <Route path="*" element={<NotFound />} />    
          
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/choicelists" element={<ChoiceLists />} />
          <Route path="/announcements" element={<AnnouncementPage />} />
          <Route path="/Verify" element={<VerificationPage />} />
          {/* <Route path="/blog" element={<BlogPageWithAPI />} />
          <Route path="/blogdetail" element={<BlogDetail />} /> */}
          <Route path="/multicriteria" element={<MultiCriteriaPredictor />} />
          <Route path="/Clinicaldata" element={<ClinicalDataPage onBack={() => window.history.back()}  />} />
          <Route path="/courses" element={<CoursesPage onBack={() => window.history.back()} />} />
          <Route path="/Institutes" element={<InstitutesPage onBack={() => window.history.back()} />} />
          <Route path="/Admitted_Students" element={<AdmittedStudentsPage onBack={() => window.history.back()} />} />
          <Route path="/Feesstipendbonds" element={<FeesStipendBondPage onBack={() => window.history.back()} />} />
          <Route path="/Closingranks" element={<ClossingRanksPage onBack={() => window.history.back()} />} />
          <Route path="/NEETPGPredictor" element={<NEETPGPredictor onBack={() => window.history.back()} />} />
          <Route path="/InicetMainContent" element={<InicetMainContent onBack={() => window.history.back()} />} />
          <Route path="/inicet/allotments" element={<InicetAllotmentsPage />} />
          <Route path="/inicet/closing-ranks" element={<InicetClosingRanksPage />} />
          <Route path="/inicet/seat-matrix" element={<InicetSeatMatrixPage />} />
          <Route path="/inicet/fee-stipend" element={<InicetFeeStipendPage />} /> 
          
           {/* Blog Routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          
          {/* <Route path="/blog1" element={<NEETPGCategoryChangeBlog />} />   */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;