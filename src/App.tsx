import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { SEOHead } from "./components/SEO/SEOHead";
import { seoConfig } from "./components/SEO/seoConfig";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Main Pages
import DashboardPage from "./pages/DashboardPage";
import DashboardProfilePage from "./pages/DashboardProfilePage";

// NEET PG Pages
import NeetPGPage from "./pages/NeetPGPage";

import Homepage from "./pages/Homepage";

// Data Pages
import AllotmentsPage from "./pages/AllotmentsPage";
import ClosingRanksPage from "./pages/ClosingRanksPage";
import SeatMatrixPage from "./pages/SeatMatrixPage";
import FeeStipendBondPage from "./pages/FeeStipendBondPage";

// Component Pages
import FAQPage from "./components/FAQPage";
import SupportPage from "./components/SupportPage";

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

import MultiCriteriaPredictor from "./MultiCriteriaPredictor";
import CoursesPage from "./components/CoursesPage";
import ClinicalDataPage from "./components/ClinicalDataPage";
import InstitutesPage from "./components/InstitutesPage";
import AdmittedStudentsPage from "./components/AdmittedStudentsPage";
import FeesStipendBondPage from "./pages/FeesStipendBondPage";

import ClossingRanksPage from "./components/ClossingRanksPage";
import AiSensyWidget from "./components/AiSensyWidget";
import NEETPGPredictor from "./pages/NEETPGPredictor";
import InicetMainContent from "./INICET/InicetMainContent";

import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";

import { NotFound } from "./Error Pages/NotFound";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import InicetDashboardPage from "./INICET/InicetDashboardPage";
import InicetAllotmentPage from "./INICET/InicetAllotmentsPage";
import InicetAllotmentsSessionPage from "./INICET/InicetAllotmentsSessionPage";
import INICETSeatMatrixPage from "./INICET/INICETSeatMatrixPage";
import Inicet2026SeatMatrix from "./INICET/Inicet2026SeatMatrix";
import SchedulePage from "./pages/SchedulePage";
import NoticesPage from "./pages/NoticesPage";
import CareersPage from "./pages/CareersPage";

// Counselling Landing Pages (PUBLIC - no auth required)
import NeetSSPage from "./Homepages/Neetsspage";
import InicetPage from "./Homepages/Inicetpage";
import NeetPGPages from "./Homepages/Neetpgpage";
import NeetUGPage from "./Homepages/Neetugpage";
import DnbPdcetPage from "./Homepages/Dnbpdcetpage";
import Allotments2025Page from "./latest2025data/Allotments2025Page";
import ClosingRanks2025Page from "./latest2025data/ClosingRanks2025Page";
import SeatMatrix2025Page from "./latest2025data/SeatMatrix2025Page";
import FeesStipendBond2025Page from "./latest2025data/FeesStipendBond2025Page";
import CollegePredictorPage from "./pages/CollegePredictorPage";

/**
 * Main App Component with React Router
 * Restructured with proper authentication flow and navigation
 */

function AppContent() {
  const location = useLocation();

  const currentSEO = seoConfig[location.pathname] || {};

  return (
    <>
      <SEOHead
        {...currentSEO}
        canonical={`https://believersconsultancy.com${location.pathname}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
        <Routes>
          {/* ─────────────────────────────────────────────────
    PUBLIC ROUTES — No authentication required
───────────────────────────────────────────────── */}
          {/* Homepage */}
          <Route path="/" element={<Homepage />} />
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/Verify" element={<VerificationPage />} />
          {/* Counselling Landing Pages — PUBLIC, no login needed */}
          <Route path="/neet-pg" element={<NeetPGPages />} />
          <Route path="/neet-ug" element={<NeetUGPage />} />
          <Route path="/inicet" element={<InicetPage />} />
          <Route path="/neet-ss" element={<NeetSSPage />} />
          <Route path="/dnb-pdcet" element={<DnbPdcetPage />} />
          {/* Blog */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          {/* Support & Legal */}
          <Route
            path="/support"
            element={<SupportPage onBack={() => window.history.back()} />}
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/announcements" element={<AnnouncementPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/notice" element={<NoticesPage />} />
          {/* INICET Dashboard — public */}
          <Route path="/inicetdashboard" element={<InicetDashboardPage />} />
          {/* Debug */}
          <Route path="/debug" element={<DebugPage />} />
          {/* ─────────────────────────────────────────────────
    PROTECTED ROUTES — Login required
───────────────────────────────────────────────── */}
          {/* Dashboard & Profile */}
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
          {/* Data Pages */}
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
          <Route
            path="/allotments2025"
            element={
              <Allotments2025Page onBack={() => window.history.back()} />
            }
          />
          <Route
            path="/closingranks2025"
            element={
              <ClosingRanks2025Page onBack={() => window.history.back()} />
            }
          />
          <Route
            path="/seatmatrix2025"
            element={
              <SeatMatrix2025Page onBack={() => window.history.back()} />
            }
          />
          <Route
            path="/feesstipendbond2025"
            element={
              <FeesStipendBond2025Page onBack={() => window.history.back()} />
            }
          />
          {/* Predictor */}
          <Route
            path="/predictor/pg"
            element={
              <ProtectedRoute>
                <PGPredictorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/NEETPGPredictor"
            element={
              <ProtectedRoute>
                <NEETPGPredictor onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/multicriteria"
            element={
              <ProtectedRoute>
                <MultiCriteriaPredictor />
              </ProtectedRoute>
            }
          />
          <Route path="/predictor" element={<CollegePredictorPage />} />
          {/* Info Pages */}
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQPage onBack={() => window.history.back()} />
              </ProtectedRoute>
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
          <Route
            path="/choicelists"
            element={
              <ProtectedRoute>
                <ChoiceLists />
              </ProtectedRoute>
            }
          />
          {/* Clinical / Course / Institute Data */}
          <Route
            path="/Clinicaldata"
            element={
              <ProtectedRoute>
                <ClinicalDataPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Institutes"
            element={
              <ProtectedRoute>
                <InstitutesPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admitted_Students"
            element={
              <ProtectedRoute>
                <AdmittedStudentsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Feesstipendbond"
            element={
              <ProtectedRoute>
                <FeesStipendBondPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Closingranks"
            element={
              <ProtectedRoute>
                <ClossingRanksPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Feesstipendbonds"
            element={
              <ProtectedRoute>
                <FeesStipendBondPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          {/* INICET Internal Pages */}
          <Route
            path="/InicetMainContent"
            element={
              <ProtectedRoute>
                <InicetMainContent onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inicet/allotments"
            element={
              <ProtectedRoute>
                <InicetAllotmentPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inicet/allotments/julysession"
            element={
              <ProtectedRoute>
                <InicetAllotmentsSessionPage
                  onBack={() => window.history.back()}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inicet/seat-matrix"
            element={
              <ProtectedRoute>
                <INICETSeatMatrixPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inicet/tentativesheet"
            element={
              <ProtectedRoute>
                <Inicet2026SeatMatrix onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <SchedulePage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          {/* Old NeetPGPage (protected) — kept for backward compat if used internally */}
          <Route
            path="/neet-pg-dashboard"
            element={
              <ProtectedRoute>
                <NeetPGPage />
              </ProtectedRoute>
            }
          />
          {/* ─────────────────────────────────────────────────
    404 — MUST be last
───────────────────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
//           <Routes>
//             {/* ─────────────────────────────────────────────────
//                 PUBLIC ROUTES — No authentication required
//             ───────────────────────────────────────────────── */}
//             {/* Homepage */}
//             <Route path="/" element={<Homepage />} />
//             {/* Auth */}
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />
//             <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//             <Route path="/reset-password" element={<ResetPasswordPage />} />
//             <Route path="/Verify" element={<VerificationPage />} />
//             {/* Counselling Landing Pages — PUBLIC, no login needed */}
//             <Route path="/neet-pg" element={<NeetPGPages />} />
//             <Route path="/neet-ug" element={<NeetUGPage />} />
//             <Route path="/inicet" element={<InicetPage />} />
//             <Route path="/neet-ss" element={<NeetSSPage />} />
//             <Route path="/dnb-pdcet" element={<DnbPdcetPage />} />
//             {/* Blog */}
//             <Route path="/blog" element={<BlogList />} />
//             <Route path="/blog/:slug" element={<BlogDetail />} />
//             {/* Support & Legal */}
//             <Route
//               path="/support"
//               element={<SupportPage onBack={() => window.history.back()} />}
//             />
//             <Route path="/privacy" element={<PrivacyPolicy />} />
//             <Route path="/terms" element={<TermsConditions />} />
//             <Route path="/announcements" element={<AnnouncementPage />} />
//             <Route path="/careers" element={<CareersPage />} />
//             <Route path="/notice" element={<NoticesPage />} />
//             {/* INICET Dashboard — public */}
//             <Route path="/inicetdashboard" element={<InicetDashboardPage />} />
//             {/* Debug */}
//             <Route path="/debug" element={<DebugPage />} />
//             {/* ─────────────────────────────────────────────────
//                 PROTECTED ROUTES — Login required
//             ───────────────────────────────────────────────── */}
//             {/* Dashboard & Profile */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <DashboardPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <DashboardProfilePage />
//                 </ProtectedRoute>
//               }
//             />
//             {/* Data Pages */}
//             <Route
//               path="/allotments"
//               element={
//                 <ProtectedRoute>
//                   <AllotmentsPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/closing-ranks"
//               element={
//                 <ProtectedRoute>
//                   <ClosingRanksPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/seat-matrix"
//               element={
//                 <ProtectedRoute>
//                   <SeatMatrixPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/fee-stipend-bond"
//               element={
//                 <ProtectedRoute>
//                   <FeeStipendBondPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/allotments2025"
//               element={
//                 <Allotments2025Page onBack={() => window.history.back()} />
//               }
//             />
//             <Route
//               path="/closingranks2025"
//               element={
//                 <ClosingRanks2025Page onBack={() => window.history.back()} />
//               }
//             />
//             <Route
//               path="/seatmatrix2025"
//               element={
//                 <SeatMatrix2025Page onBack={() => window.history.back()} />
//               }
//             />
//             <Route
//               path="/feesstipendbond2025"
//               element={
//                 <FeesStipendBond2025Page onBack={() => window.history.back()} />
//               }
//             />
//             {/* Predictor */}
//             <Route
//               path="/predictor/pg"
//               element={
//                 <ProtectedRoute>
//                   <PGPredictorPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/NEETPGPredictor"
//               element={
//                 <ProtectedRoute>
//                   <NEETPGPredictor onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/multicriteria"
//               element={
//                 <ProtectedRoute>
//                   <MultiCriteriaPredictor />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/predictor" element={<CollegePredictorPage />} />
//             {/* Info Pages */}
//             <Route
//               path="/faq"
//               element={
//                 <ProtectedRoute>
//                   <FAQPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/AiSensyWidget"
//               element={
//                 <ProtectedRoute>
//                   <AiSensyWidget widgetId="aaa5qq" />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/medical-colleges"
//               element={
//                 <ProtectedRoute>
//                   <MedicalCollegesPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/rankings"
//               element={
//                 <ProtectedRoute>
//                   <ResultrankingPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/counselling"
//               element={
//                 <ProtectedRoute>
//                   <CounsellingPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/choicelists"
//               element={
//                 <ProtectedRoute>
//                   <ChoiceLists />
//                 </ProtectedRoute>
//               }
//             />
//             {/* Clinical / Course / Institute Data */}
//             <Route
//               path="/Clinicaldata"
//               element={
//                 <ProtectedRoute>
//                   <ClinicalDataPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/courses"
//               element={
//                 <ProtectedRoute>
//                   <CoursesPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/Institutes"
//               element={
//                 <ProtectedRoute>
//                   <InstitutesPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/Admitted_Students"
//               element={
//                 <ProtectedRoute>
//                   <AdmittedStudentsPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/Feesstipendbond"
//               element={
//                 <ProtectedRoute>
//                   <FeesStipendBondPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/Closingranks"
//               element={
//                 <ProtectedRoute>
//                   <ClossingRanksPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             //{" "}
//             <Route
//               path="/Feesstipendbonds"
//               element={
//                 <ProtectedRoute>
//                   <FeesStipendBondPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             {/* INICET Internal Pages */}
//             <Route
//               path="/InicetMainContent"
//               element={
//                 <ProtectedRoute>
//                   <InicetMainContent onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/inicet/allotments"
//               element={
//                 <ProtectedRoute>
//                   <InicetAllotmentPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/inicet/allotments/julysession"
//               element={
//                 <ProtectedRoute>
//                   <InicetAllotmentsSessionPage
//                     onBack={() => window.history.back()}
//                   />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/inicet/seat-matrix"
//               element={
//                 <ProtectedRoute>
//                   <INICETSeatMatrixPage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/inicet/tentativesheet"
//               element={
//                 <ProtectedRoute>
//                   <Inicet2026SeatMatrix onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/schedule"
//               element={
//                 <ProtectedRoute>
//                   <SchedulePage onBack={() => window.history.back()} />
//                 </ProtectedRoute>
//               }
//             />
//             {/* Old NeetPGPage (protected) — kept for backward compat if used internally */}
//             <Route
//               path="/neet-pg-dashboard"
//               element={
//                 <ProtectedRoute>
//                   <NeetPGPage />
//                 </ProtectedRoute>
//               }
//             />
//             {/* ─────────────────────────────────────────────────
//                 404 — MUST be last
//             ───────────────────────────────────────────────── */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }
