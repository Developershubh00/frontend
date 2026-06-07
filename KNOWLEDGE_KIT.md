# Project Knowledge Kit - Medical College Counseling Platform

## Table of Contents

1. [Project Overview](#project-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [API Endpoints & Flows](#api-endpoints--flows)
5. [Data Models](#data-models)
6. [Features & Predictors](#features--predictors)
7. [Page Differences (NEET UG vs PG vs INICET)](#page-differences)
8. [Data Flow & Integration](#data-flow--integration)
9. [Configuration & Deployment](#configuration--deployment)

---

## Project Overview

**Purpose**: Medical college counseling platform for NEET UG, NEET PG, INICET, NEET SS, and DNB PDCET counseling processes.

**Stack**:

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Django 5.2.4 + Django REST Framework + SQLite
- **Analytics**: Google Analytics 4, Facebook Pixel
- **Integrations**: WhatsApp API (AiSensy), Google Sheets, SMTP Email

**Deployment**:

- **Frontend**: Hostinger (Primary) + Vercel (Backup)
- **Backend**: Hostinger (Primary) + Render.com (Backup)
- **Automation**: GitHub Actions for CI/CD with Vercel & Render webhooks

---

## Frontend Architecture

### Entry Points

#### `src/main.tsx`

- React application initialization
- **Analytics Integrations**:
  - Google Analytics 4 (ID: `G-WHDNY2WK54`)
  - Facebook Pixel (ID: `1191321999595048`)
- **Error Boundary** wrapper for error handling
- **UTM Tracking**: Captures URL parameters

#### `src/App.tsx`

- React Router configuration with 48 routes
- `AuthProvider` context wrapper for authentication
- Protected routes with ProtectedRoute component
- Public landing pages and auth pages
- Domain-specific pages (NEET UG/PG, INICET)

---

### Components (43 Components)

#### Navigation & Layout

| Component           | Location                           | Purpose                           |
| ------------------- | ---------------------------------- | --------------------------------- |
| Header              | components/Header.tsx              | Top navigation bar                |
| Sidebar             | components/Sidebar.tsx             | Left sidebar navigation (desktop) |
| RightSidebar        | components/RightSidebar.tsx        | Right sidebar information panel   |
| MobileBottomNav     | components/MobileBottomNav.tsx     | Bottom navigation (mobile)        |
| AnnouncementSidebar | components/AnnouncementSidebar.tsx | Announcement display panel        |
| StateTabs           | components/StateTabs.tsx           | State filter tabs (NEET PG)       |
| StateTabsPG         | components/StateTabsPG.tsx         | PG-specific state tabs            |

#### Authentication & Routing

| Component          | Purpose                                  |
| ------------------ | ---------------------------------------- |
| ProtectedRoute     | Route protection based on authentication |
| LoginPage          | User login interface                     |
| SignupPage         | User registration with UTM capture       |
| ForgotPasswordPage | Password recovery initiation             |
| ResetPasswordPage  | Password reset form                      |
| VerificationPage   | Email/OTP verification                   |

#### Data Display & Tables

| Component      | Purpose                                         |
| -------------- | ----------------------------------------------- |
| DataTable      | Reusable table component with sorting/filtering |
| SeatCards      | PG seat display cards                           |
| SeatCardsUG    | UG-specific seat display                        |
| QuotaModal     | Quota breakdown modal                           |
| QuotaUG        | UG quota display                                |
| QuotaPG        | PG quota display                                |
| PGResultsModal | PG results display modal                        |
| NeetComparison | Comparison tool for results                     |

#### Predictors & Analysis

| Component              | Purpose                            |
| ---------------------- | ---------------------------------- |
| CollegePredictor       | General college prediction tool    |
| TypingCategories       | Category/quota type selector       |
| MultiCriteriaPredictor | Advanced multi-parameter predictor |

#### Page Content Components

| Component            | Purpose                        |
| -------------------- | ------------------------------ |
| AdmittedStudentsPage | Display admitted students data |
| ClinicalDataPage     | Clinical education data        |
| ClossingRanksPage    | Closing ranks information      |
| CoursesPage          | Available courses listing      |
| InstitutesPage       | Institute directory            |
| MedicalCollegesPage  | Medical college information    |
| UniversitiesPage     | University listings            |
| ResultrankingPage    | Result rankings display        |
| CounsellingPage      | Counseling information         |

#### Forms & Messaging

| Component       | Purpose                          |
| --------------- | -------------------------------- |
| CustomSelect    | Custom dropdown/select component |
| ChoiceLists     | Choice list management interface |
| WhatsAppSender  | Send WhatsApp messages           |
| WhatsAppSupport | WhatsApp support widget          |
| AiSensyWidget   | AI-powered WhatsApp widget       |

#### SEO Components (in `components/SEO/`)

| Component    | Purpose                       |
| ------------ | ----------------------------- |
| Breadcrumb   | Breadcrumb navigation for SEO |
| BlogPostSEO  | Blog post SEO optimization    |
| CourseSchema | Course structured data        |
| FAQSchema    | FAQ structured data           |
| JsonLd       | JSON-LD schema markup         |
| SEOHead      | Meta tags and head management |

#### Utility & Support

| Component          | Purpose                             |
| ------------------ | ----------------------------------- |
| ErrorBoundary      | Error boundary for component errors |
| PlaceholderContent | Placeholder UI while loading        |
| FAQPage            | Frequently Asked Questions          |
| SupportPage        | Support & contact page              |
| NotificationPopup  | Notification display                |
| Newsletter         | Newsletter signup                   |
| SpeakerButton      | Text-to-speech button               |

---

### Pages (48 Routes) - Actually Implemented in App.tsx

#### Authentication Pages (5)

| Route              | Component          | Auth Required | Purpose                            |
| ------------------ | ------------------ | ------------- | ---------------------------------- |
| `/login`           | LoginPage          | ❌ No         | User login                         |
| `/signup`          | SignupPage         | ❌ No         | User registration with UTM capture |
| `/forgot-password` | ForgotPasswordPage | ❌ No         | Password recovery                  |
| `/reset-password`  | ResetPasswordPage  | ❌ No         | Password reset                     |
| `/Verify`          | VerificationPage   | ❌ No         | Email OTP verification             |

#### Main Dashboard & Profile (2)

| Route        | Component            | Auth Required | Purpose                 |
| ------------ | -------------------- | ------------- | ----------------------- |
| `/dashboard` | DashboardPage        | ✅ Yes        | Main user dashboard     |
| `/profile`   | DashboardProfilePage | ✅ Yes        | User profile management |

#### NEET PG Pages (Protected) (2)

| Route                | Component   | Auth Required | Purpose                       |
| -------------------- | ----------- | ------------- | ----------------------------- |
| `/neet-pg`           | NeetPGPages | ❌ No         | NEET PG public landing page   |
| `/neet-pg-dashboard` | NeetPGPage  | ✅ Yes        | NEET PG dashboard (protected) |

#### NEET UG Pages (Protected) (4)

| Route                          | Component                 | Auth Required | Purpose                       |
| ------------------------------ | ------------------------- | ------------- | ----------------------------- |
| `/neet-ug`                     | NeetUGPage                | ❌ No         | NEET UG public landing page   |
| `/neet-ug-dashboard`           | NEETUGDashboardPage       | ✅ Yes        | NEET UG dashboard (protected) |
| `/NEETUG/SEATMATRIX`           | SeatMatrixUGPage          | ✅ Yes        | UG seat matrix                |
| `/NEETUG/feessstipendbond2025` | FeesStipendBond2025UGPage | ✅ Yes        | UG fees/stipend/bond 2025     |
| `/NEETUG/closingranks2025`     | ClosingRanks2025UGPage    | ✅ Yes        | UG closing ranks 2025         |

#### INICET Pages (Protected) (6)

| Route                            | Component                   | Auth Required | Purpose                        |
| -------------------------------- | --------------------------- | ------------- | ------------------------------ |
| `/inicet`                        | InicetPage                  | ❌ No         | INICET public landing page     |
| `/inicetdashboard`               | InicetDashboardPage         | ❌ No         | INICET dashboard (public)      |
| `/InicetMainContent`             | InicetMainContent           | ✅ Yes        | INICET main content            |
| `/inicet/allotments`             | InicetAllotmentPage         | ✅ Yes        | INICET allotments              |
| `/inicet/allotments/julysession` | InicetAllotmentsSessionPage | ✅ Yes        | INICET session-wise allotments |
| `/inicet/seat-matrix`            | INICETSeatMatrixPage        | ✅ Yes        | INICET seat matrix             |
| `/inicet/tentativesheet`         | Inicet2026SeatMatrix        | ✅ Yes        | INICET 2026 tentative seats    |
| `/inicet-result`                 | InicetResultChecker         | ❌ No         | INICET result checker          |

#### NEET SS & DNB (2)

| Route        | Component    | Auth Required | Purpose                     |
| ------------ | ------------ | ------------- | --------------------------- |
| `/neet-ss`   | NeetSSPage   | ❌ No         | NEET SS public landing page |
| `/dnb-pdcet` | DnbPdcetPage | ❌ No         | DNB PDCET landing page      |

#### Data Pages (Protected) (6)

| Route               | Component           | Auth Required | Purpose                       |
| ------------------- | ------------------- | ------------- | ----------------------------- |
| `/allotments`       | AllotmentsPage      | ✅ Yes        | Allotments data               |
| `/closing-ranks`    | ClosingRanksPage    | ✅ Yes        | Closing ranks                 |
| `/seat-matrix`      | SeatMatrixPage      | ✅ Yes        | Seat matrix                   |
| `/fee-stipend-bond` | FeeStipendBondPage  | ✅ Yes        | Fees/stipend/bond             |
| `/Feesstipendbond`  | FeesStipendBondPage | ✅ Yes        | Alternate fees route          |
| `/Feesstipendbonds` | FeeStipendBondPage  | ✅ Yes        | Alternate fees route (plural) |
| `/Closingranks`     | ClossingRanksPage   | ✅ Yes        | Alternate closing ranks       |

#### 2025 Data Pages (4)

| Route                  | Component               | Auth Required | Purpose                |
| ---------------------- | ----------------------- | ------------- | ---------------------- |
| `/allotments2025`      | Allotments2025Page      | ❌ No         | 2025 allotments        |
| `/closingranks2025`    | ClosingRanks2025Page    | ❌ No         | 2025 closing ranks     |
| `/seatmatrix2025`      | SeatMatrix2025Page      | ❌ No         | 2025 seat matrix       |
| `/feesstipendbond2025` | FeesStipendBond2025Page | ❌ No         | 2025 fees/stipend/bond |

#### Predictor Pages (Protected) (4)

| Route              | Component              | Auth Required | Purpose                    |
| ------------------ | ---------------------- | ------------- | -------------------------- |
| `/predictor`       | CollegePredictorPage   | ❌ No         | Public college predictor   |
| `/predictor/pg`    | PGPredictorPage        | ✅ Yes        | PG predictor (protected)   |
| `/NEETPGPredictor` | NEETPGPredictor        | ✅ Yes        | NEET PG advanced predictor |
| `/multicriteria`   | MultiCriteriaPredictor | ✅ Yes        | Multi-criteria predictor   |

#### Information Pages (Protected) (7)

| Route                | Component            | Auth Required | Purpose                    |
| -------------------- | -------------------- | ------------- | -------------------------- |
| `/medical-colleges`  | MedicalCollegesPage  | ✅ Yes        | Medical colleges directory |
| `/rankings`          | ResultrankingPage    | ✅ Yes        | Result rankings            |
| `/counselling`       | CounsellingPage      | ✅ Yes        | Counseling information     |
| `/Clinicaldata`      | ClinicalDataPage     | ✅ Yes        | Clinical education data    |
| `/courses`           | CoursesPage          | ✅ Yes        | Courses listing            |
| `/Institutes`        | InstitutesPage       | ✅ Yes        | Institutes directory       |
| `/Admitted_Students` | AdmittedStudentsPage | ✅ Yes        | Admitted students data     |

#### Special Pages (Protected) (3)

| Route            | Component     | Auth Required | Purpose                     |
| ---------------- | ------------- | ------------- | --------------------------- |
| `/choicelists`   | ChoiceLists   | ✅ Yes        | User choice list management |
| `/faq`           | FAQPage       | ✅ Yes        | FAQ section                 |
| `/AiSensyWidget` | AiSensyWidget | ✅ Yes        | WhatsApp chat widget        |

#### Content & Utility Pages (7)

| Route             | Component        | Auth Required | Purpose                 |
| ----------------- | ---------------- | ------------- | ----------------------- |
| `/`               | Homepage         | ❌ No         | Main landing page       |
| `/blog`           | BlogList         | ❌ No         | Blog listings           |
| `/blog/:slug`     | BlogDetail       | ❌ No         | Individual blog posts   |
| `/support`        | SupportPage      | ❌ No         | Support page            |
| `/privacy`        | PrivacyPolicy    | ❌ No         | Privacy policy          |
| `/terms`          | TermsConditions  | ❌ No         | Terms & conditions      |
| `/careers`        | CareersPage      | ❌ No         | Career information      |
| `/announcements`  | AnnouncementPage | ❌ No         | Announcements           |
| `/notice`         | NoticesPage      | ❌ No         | Official notices        |
| `/schedule`       | SchedulePage     | ✅ Yes        | Counseling schedule     |
| `/debug`          | DebugPage        | ❌ No         | Debug page              |
| `/comingsoonpage` | ComingSoonPage   | ✅ Yes        | Coming soon placeholder |
| `*`               | NotFound         | ❌ No         | 404 page                |

---

### Specialized Folders

#### `src/NEET_UG/` - Undergraduate Specific Implementation

**Components**:

- `NEETUGDashboardPage.tsx` - UG dashboard layout
- `NEETUGMainContent.tsx` - Main UG content area
- `NEETUGRightSideBar.tsx` - UG right sidebar with UG-specific info
- `NEETUGSidebar.tsx` - UG left navigation
- `SeatCardsUG.tsx` - UG seat display cards

**Sub-folder: `latest2025data/`**:

- `Allotments2025UGPage.tsx` - 2025 UG allotments
- `ClosingRanks2025UGPage.tsx` - 2025 UG closing ranks
- `FeesStipendBond2025UGPage.tsx` - 2025 UG fees
- `SeatMatrixUGPage.tsx` - 2025 UG seat matrix

**Purpose**: Contains UG-specific views, data components, and year-specific implementations

---

#### `src/INICET/` - INICET Specific Implementation (9 Components)

- `InicetMainContent.tsx` - Main INICET content
- `InicetDashboardPage.tsx` - INICET dashboard
- `InicetAllotmentsPage.tsx` - INICET allotments
- `InicetAllotmentsSessionPage.tsx` - Session-based allotments
- `InicetFeeStipendPage.tsx` - INICET fees
- `INICETSeatMatrixPage.tsx` - INICET seat matrix
- `Inicet2026SeatMatrix.tsx` - 2026 specific seat matrix
- `InicetRightSideBar.tsx` - INICET info sidebar
- `InicetSidebar.tsx` - INICET navigation

**Purpose**: Contains INICET-specific implementation with session-based data handling

---

#### `src/latest2025data/` - Year-Specific Data (2025)

- `Allotments2025Page.tsx` - 2025 allotments aggregator
- `ClosingRanks2025Page.tsx` - 2025 closing ranks
- `SeatMatrix2025Page.tsx` - 2025 seat matrix
- `FeesStipendBond2025Page.tsx` - 2025 fee structure
- `YearSelectionModal.tsx` - Year selection interface

**Purpose**: Centralized 2025 data display, can be extended for other years

---

#### `src/Homepages/` - Landing Pages (5 Pages)

- `Neetugpage.tsx` - NEET UG homepage variant
- `Neetpgpage.tsx` - NEET PG homepage variant
- `Inicetpage.tsx` - INICET homepage variant
- `Neetsspage.tsx` - NEET SS homepage variant
- `Dnbpdcetpage.tsx` - DNB PDCET homepage variant

**Purpose**: Domain-specific landing pages with tailored content and CTAs

---

### Hooks (4 Custom Hooks)

#### `src/hooks/usePageTracking.tsx`

```typescript
// Returns: void
// Purpose: Google Analytics page tracking
// Tracks: Page views with route information
// Usage: Call in useEffect for GA4 event firing
```

#### `src/hooks/useWhatsApp.tsx`

```typescript
// Returns: UseWhatsAppReturn interface
// Properties:
//   - sendMessage(phone, message): Promise<SendMessageResponse>
//   - sendTemplate(phone, templateId, params): Promise
//   - sendOTP(phone): Promise
//   - getStatus(messageId): Promise<MessageStatus>
// Purpose: WhatsApp integration with AiSensy API
```

#### `src/hooks/useTextToSpeech.tsx`

```typescript
// Purpose: Text-to-speech functionality
// Methods: speak(text), stop()
// Used in: SpeakerButton component
```

#### `src/hooks/trackEvents.ts`

**Event Tracking Functions**:

- `trackSignup(userData)` - Fired on user registration
- `trackLogin(email)` - Fired on login
- `trackContactFormSubmit(formData)` - Contact form submission
- `trackWhatsAppClick(context)` - WhatsApp widget clicks
- `trackCTAClick(ctaName)` - Call-to-action clicks
- `trackBlogRead(blogId)` - Blog article reads
- `trackPredictorUsed(predictorType, inputs)` - Predictor tool usage

**Implementation**: Uses GA4 event tracking and Facebook Pixel

---

### Services (3 Core Services)

#### `src/services/api.ts` - Main API Client

```typescript
// Base URL: https://backend-fiwg.onrender.com/api/

// Authentication Endpoints
authAPI {
  login(email, password): Promise<{access, refresh, user}>
  signup(userData): Promise<{access, refresh, user}>
  logout(): Promise<{status}>
  refreshToken(refreshToken): Promise<{access}>
  getProfile(): Promise<User>
  updateProfile(userData): Promise<User>
  forgotPassword(email): Promise<{status}>
  resetPassword(token, password): Promise<{status}>
}

// College Data
collegesAPI {
  getAll(filters): Promise<College[]>
  getById(id): Promise<College>
  getNIRFRankings(): Promise<Ranking[]>
}

// NEET Results & Allotments
neetAPI {
  getResults(filters): Promise<Results>
  getAllotments(round, filters): Promise<Allotment[]>
  getClosingRanks(state, course): Promise<ClosingRank[]>
  getSeatMatrix(state, college): Promise<SeatMatrix>
  getFeeStructure(college, course): Promise<FeeStructure>
}

// User Choice Lists
choiceListsAPI {
  getUserChoiceLists(): Promise<ChoiceList[]>
  createChoiceList(name): Promise<ChoiceList>
  updateChoiceList(id, data): Promise<ChoiceList>
  deleteChoiceList(id): Promise<void>
  addToChoiceList(listId, collegeId): Promise<Choice>
  removeFromChoiceList(listId, choiceId): Promise<void>
}

// Counseling Data
counsellingAPI {
  getINICETData(session): Promise<INICETData>
  createChoiceList(name): Promise<ChoiceList>
  updateChoiceList(id, data): Promise<ChoiceList>
}

// Predictors
predictorAPI {
  predictPG(rank, category, state): Promise<Predictions>
  getRankPrediction(rank, category): Promise<RankPrediction>
}

// FAQs
faqAPI {
  getAll(category): Promise<FAQ[]>
}

// Support
supportAPI {
  createTicket(subject, message): Promise<Ticket>
  sendMessage(ticketId, message): Promise<Message>
}

// Features:
// - JWT Authentication (auto-refresh on 401)
// - Request interceptors for token attachment
// - Response error handling
// - CamelCase ↔ snake_case conversion
```

**JWT Implementation**:

- Access token attached to all requests via `Authorization: Bearer {token}`
- Automatic token refresh on 401 response
- Tokens stored in localStorage

---

#### `src/services/dataService.ts` - Data Processing Service

```typescript
// Interfaces:
interface AllotmentData {
  round: number
  institute: string
  state: string
  course: string
  category: string
  rank: number
  quota: string
}

interface ClosingRankData {
  state: string
  course: string
  quota: string
  category: string
  closingRank: number
}

interface SeatMatrixData {
  state: string
  institute: string
  course: string
  totalSeats: number
  category: string
  seats: number
}

interface FeeStipendBondData {
  institute: string
  course: string
  annualFee: number
  stipend: number
  bondYears: number
}

// Methods:
getAllotments(tabId: string, filters: any): Promise<AllotmentData[]>
getClosingRanks(filters: any): Promise<ClosingRankData[]>
getSeatMatrix(filters: any): Promise<SeatMatrixData[]>
getFeeStipendBond(filters: any): Promise<FeeStipendBondData[]>
```

**Purpose**: Centralized data fetching and transformation for complex queries

---

#### `src/services/whatsapp.service.ts` - WhatsApp Integration

```typescript
// Configuration: From src/configuration/aisensy.config.ts
// - API Key
// - Phone Number ID
// - Business Account ID
// - Webhook URL: Google Sheet webhook

class WhatsAppService {
  makeRequest<T>(endpoint: string, method: string, data?: any): Promise<T>;

  sendMessage(
    phoneNumber: string,
    message: string,
  ): Promise<SendMessageResponse>;
  // Purpose: Send text message

  sendTemplate(
    phoneNumber: string,
    templateId: string,
    params: string[],
  ): Promise<void>;
  // Purpose: Send templated message

  sendOTP(phoneNumber: string): Promise<void>;
  // Purpose: Send OTP via WhatsApp

  getMessageStatus(messageId: string): Promise<MessageStatus>;
  // Purpose: Check message delivery status
}

// Response Handling:
// - Success: {status: 'success', messageId, timestamp}
// - Failure: {status: 'error', error, code}
```

**Webhook Integration**: Receives `WebhookPayload` with message status updates

---

### Types & Interfaces

#### `src/types/whatsapp.types.ts`

```typescript
interface AiSensyConfig {
  apiKey: string;
  phoneNumberId: string;
  businessAccountId: string;
  webhookURL: string;
  apiBaseURL: string;
}

interface SendMessageRequest {
  phoneNumber: string;
  message: string;
  mediaUrl?: string;
}

interface SendMessageResponse {
  status: "success" | "error";
  messageId?: string;
  error?: string;
  timestamp: string;
}

interface SendTemplateRequest {
  phoneNumber: string;
  templateId: string;
  parameters: string[];
}

interface SendOTPRequest {
  phoneNumber: string;
  otpLength?: number;
}

interface UseWhatsAppReturn {
  sendMessage: (phone: string, msg: string) => Promise<SendMessageResponse>;
  sendTemplate: (
    phone: string,
    templateId: string,
    params: string[],
  ) => Promise<void>;
  sendOTP: (phone: string) => Promise<void>;
  getStatus: (msgId: string) => Promise<MessageStatus>;
  isLoading: boolean;
  error: string | null;
}

interface MessageStatus {
  messageId: string;
  status: "sent" | "delivered" | "read" | "failed";
  timestamp: string;
  recipientId: string;
}

interface WebhookPayload {
  event: "message_status_update" | "incoming_message";
  messageId: string;
  status: string;
  timestamp: string;
  data: Record<string, any>;
}
```

---

### Utilities

#### `src/utils/utmTracker.ts`

```typescript
function captureUTMs(): UTMParameters {
  // Extracts URL parameters:
  // - utm_source
  // - utm_medium
  // - utm_campaign
  // - utm_term
  // - utm_content
  // - gclid (Google Ads ID)
  // - referrer
  // Returns: UTMParameters object
  // Called in: App.tsx and during signup
}
```

---

### Contexts

#### `src/contexts/AuthContext.tsx`

```typescript
interface User {
  id: string;
  email: string;
  phone?: string;
  neetRank?: number;
  category?: string;
  state?: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
}

interface SignupData extends User {
  password: string;
  // UTM Fields
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  referrer?: string;
  landingUrl?: string;
  signupIp?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  signup(data: SignupData): Promise<void>;
  logout(): void;
  updateProfile(data: Partial<User>): Promise<void>;
  refreshToken(): Promise<void>;
}

// Usage:
const { user, isAuthenticated, login, signup, logout } = useAuth();

// Features:
// - localStorage persistence (token + user)
// - Auto-token refresh on route change
// - Protected route wrapper
```

---

### Configuration

#### `src/config.ts`

```typescript
const config = {
  isDev: import.meta.env.MODE === "development",
  apiUrl: isDev
    ? "http://localhost:8000/api"
    : "https://backend-fiwg.onrender.com/api",

  // Integrations
  googleSheetsWebhook:
    "https://script.google.com/macros/d/{SCRIPT_ID}/usercallback",
  gaId: "G-WHDNY2WK54",
  fbPixelId: "1191321999595048",
};
```

#### `src/configuration/aisensy.config.ts`

```typescript
export const aiSensyConfig: AiSensyConfig = {
  apiKey: process.env.REACT_APP_AISENSY_API_KEY,
  phoneNumberId: process.env.REACT_APP_AISENSY_PHONE_ID,
  businessAccountId: process.env.REACT_APP_AISENSY_BUSINESS_ID,
  webhookURL: "https://example.com/api/webhook/whatsapp",
  apiBaseURL: "https://api.aisensy.com/v1",
};
```

---

### Data Files

#### `src/data/` - Static Data

| File                    | Size   | Purpose                 |
| ----------------------- | ------ | ----------------------- |
| `announcements-data.ts` | Medium | Platform announcements  |
| `blogData.ts`           | 37KB+  | Blog posts and articles |
| `notices.ts`            | Medium | Official notices        |
| `notifications.ts`      | Medium | Notification templates  |

---

## Backend Architecture

### Technology Stack

- **Framework**: Django 5.2.4
- **API**: Django REST Framework (DRF)
- **Database**: SQLite (db.sqlite3)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Serialization**: Django REST Framework Serializers
- **Imports/Exports**: django-import-export

---

### Models (14 Core Models)

#### `backend/core/models.py`

##### 1. **CustomUser** (User Model)

```python
class CustomUser(AbstractBaseUser, PermissionsMixin):
  # Identity
  email: str (unique, primary login)
  phone: str (optional)

  # Medical Education Data
  neet_rank: int (optional)
  category: str (choices: SC, ST, OBC, General)
  state: str (optional)

  # Profile
  avatar: ImageField (optional)

  # Email Verification
  email_otp: str (optional, 6-digit OTP)
  email_verified: bool (default=False)
  email_otp_created_at: DateTime (tracks OTP expiry)

  # UTM Tracking (for analytics)
  source: str (utm_source)
  medium: str (utm_medium)
  campaign: str (utm_campaign)
  term: str (utm_term)
  content: str (utm_content)
  gclid: str (Google Ads click ID)
  referrer: str (HTTP referrer)
  landing_url: str (URL when user landed)
  signup_ip: str (IP address at signup)

  # Timestamps
  created_at: DateTime (auto_now_add)
  updated_at: DateTime (auto_now)
```

**Purpose**: Main user authentication and profile storage with comprehensive UTM tracking for marketing attribution

---

##### 2. **CollegeChoice** (User Preferences)

```python
class CollegeChoice(Model):
  user: ForeignKey(CustomUser)  # User who saved
  college_name: str
  course_name: str
  state: str
  rank: int  # User's rank cutoff
  created_at: DateTime
```

**Purpose**: User's saved college/course preferences for predictor comparisons

---

##### 3. **CollegeCutoff** (Closing Ranks Data)

```python
class CollegeCutoff(Model):
  round: int  # Counseling round (1-5)
  ai_rank: int  # All India rank
  state: str  # State quota
  institute: str  # College name
  course: str  # Course code/name
  quota: str  # Quota type (General, SC, ST, OBC, etc.)
  category: str  # Medical speciality category
  created_at: DateTime
```

**Purpose**: Historical and current closing ranks from all counseling rounds for prediction

---

##### 4. **MedicalCollege** (College Master Data)

```python
class MedicalCollege(Model):
  name: str (unique)
  state: str
  type: str  # Government, Private, NRI
  ownership: str  # Central, State, Private
  courses_offered: JSONField  # Array of course names
  total_seats: int
  ranking: int  # NIRF ranking (if available)
  established_year: int
  website_url: str
  contact_phone: str
```

**Purpose**: Central repository of medical college information

---

##### 5. **INICETAllotment** (INICET Specific)

```python
class INICETAllotment(Model):
  session: str  # Academic session (2024-25, 2025-26)
  round: int
  ai_rank: int
  state: str
  institute: str
  course: str
  quota: str
  category: str
```

**Purpose**: INICET-specific allotment data separate from NEET PG

---

##### 6. **UGSeatMatrix** (UG Counseling Seats)

```python
class UGSeatMatrix(Model):
  state: str
  institute: str
  course: str
  total_seats: int
  category_sc: int
  category_st: int
  category_obc: int
  category_general: int
  year: int  # Academic year
```

**Purpose**: Undergraduate seat availability across categories

---

##### 7. **PGFeeDetails** (Fee Structure)

```python
class PGFeeDetails(Model):
  institute: str
  course: str
  annual_fee: int  # in rupees
  stipend: int  # monthly stipend
  bond_years: int  # service bond duration
  bond_amount: int  # penalty if bond broken
```

**Purpose**: Postgraduate fee and stipend information

---

##### 8. **PrivateCollege** (Private Institutions)

```python
class PrivateCollege(Model):
  name: str
  state: str
  city: str
  ownership: str
  courses_offered: JSONField
  annual_fee: int
  contact_info: JSONField
```

**Purpose**: Dedicated model for private college information

---

##### 9. **NIRFUniversityRanking** (Rankings)

```python
class NIRFUniversityRanking(Model):
  rank: int
  university_name: str
  score: float
  city: str
  state: str
  category: str  # Overall, Medical, etc.
  year: int
```

**Purpose**: National Institutional Ranking Framework data

---

##### 10. **RankPredictionCollege** (Prediction Database)

```python
class RankPredictionCollege(Model):
  college_name: str
  state: str
  course: str
  ownership: str  # Government, Private
  is_aiims: bool
  closing_rank: int  # Previous year's closing rank
  total_seats: int
  intake_year: int
```

**Purpose**: Historical closing ranks used for ML-based rank prediction

---

##### 11. **CollegeDatabase** (Comprehensive DB)

```python
class CollegeDatabase(Model):
  college_name: str
  state: str
  city: str
  ownership: str
  is_aiims: bool
  college_type: str  # UG or PG
  course: str
  seat_type: str  # General, SC, ST, OBC
  closing_rank: int
  total_seats: int
  metadata: JSONField
```

**Purpose**: Unified database for analytics and reporting

---

##### 12. **FAQCategory** (FAQ Organization)

```python
class FAQCategory(Model):
  name: str (unique)
  slug: str
  description: str
```

**Purpose**: FAQ categorization

---

##### 13. **FAQ** (Frequently Asked Questions)

```python
class FAQ(Model):
  question: str
  answer: str
  category: ForeignKey(FAQCategory)
  order: int  # Display order
  is_active: bool
```

**Purpose**: Platform FAQs

---

##### 14. **Complex Data Models**

**Allotment** (Multi-round allotments):

```python
class Allotment(Model):
  round: int
  college_name: str
  course: str
  quota: str
  category: str
  air: int  # All India Rank
  state_rank: int
  mop_score: float  # Merit-cum-Openness percentage
  year: int
```

**ClosingRank** (Multi-year closing ranks):

```python
class ClosingRank(Model):
  state: str
  college_name: str
  course: str
  quota: str
  category: str
  # Previous years' ranks for trend analysis
  rank_2024: int
  rank_2023: int
  rank_2022: int
```

**SeatMatrix** (Detailed seat breakdown):

```python
class SeatMatrix(Model):
  state: str
  college_name: str
  course: str
  total_seats: int
  # Category-wise breakdown
  general_seats: int
  sc_seats: int
  st_seats: int
  obc_seats: int
  # Special quotas
  pwd_seats: int
  nri_seats: int
```

**FeeStipendBond** (Multi-year fee data):

```python
class FeeStipendBond(Model):
  college_name: str
  course: str
  # Fee details
  annual_fee_2024: int
  annual_fee_2023: int
  # Stipend details
  monthly_stipend: int
  bond_years: int
  bond_penalty: int
```

---

### API Views & Endpoints

#### `backend/core/views.py` - 25+ Endpoints

##### Authentication Endpoints

**POST /auth/signup/**

```python
class SignupView(APIView):
  """User registration with email verification"""

  Request: {
    email: str (unique)
    password: str (min 8 chars)
    phone: str (optional)
    category: str (optional)
    state: str (optional)
    // UTM Parameters
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: str
    utm_content: str
    gclid: str
    referrer: str
    landing_url: str
  }

  Response: {
    access: str (JWT access token)
    refresh: str (JWT refresh token)
    user: UserSerializer
    message: "Signup successful"
  }

  Side Effects:
  - CustomUser created
  - Signal fires: append to Google Sheets
  - Verification email sent with OTP
"""
```

**POST /auth/login/**

```python
class LoginAPIView(APIView):
  """User login with JWT tokens"""

  Request: {
    email: str
    password: str
  }

  Response: {
    access: str
    refresh: str
    user: UserSerializer
  }
"""
```

**GET /auth/profile/**

```python
class ProfileView(generics.RetrieveUpdateAPIView):
  """Get or update user profile"""

  GET Response: UserSerializer

  PUT Request: {
    phone: str (optional)
    neet_rank: int (optional)
    category: str (optional)
    state: str (optional)
    avatar: ImageField (optional)
  }

  Authentication: Required (JWT)
"""
```

**POST /auth/forgot-password/**

```python
"""Reset password request - sends email with token"""
Request: { email: str }
Response: { message: "Reset email sent" }
```

**POST /auth/reset-password/**

```python
"""Complete password reset"""
Request: { token: str, new_password: str }
Response: { message: "Password reset successful" }
```

**POST /auth/verify-email-otp/**

```python
"""Verify email OTP"""
Request: { email: str, otp: str }
Response: {
  email_verified: bool
  user: UserSerializer
}
"""
```

---

##### College Data Endpoints

**GET /medical-colleges/**

```python
class MedicalCollegeList(generics.ListAPIView):
  """List all medical colleges"""

  Query Parameters:
    - state: filter by state
    - ownership: Government/Private
    - type: UG/PG

  Response: [
    {
      id: int
      name: str
      state: str
      type: str
      courses_offered: [str]
      total_seats: int
      ranking: int
    }
  ]

  Pagination: 75 items per page (max 200)
"""
```

**GET /college-database/**

```python
"""Comprehensive college search"""
Query Parameters:
  - college_name
  - state
  - ownership
  - course
  - closing_rank_min
  - closing_rank_max

Response: [CollegeDatabase]
Pagination: 75 per page
"""
```

---

##### Data ViewSets (CRUD Operations)

All ViewSets support:

- `GET /endpoint/` - List with filters and pagination
- `GET /endpoint/{id}/` - Retrieve single item
- `POST /endpoint/` - Create (staff only)
- `PUT /endpoint/{id}/` - Update (staff only)
- `DELETE /endpoint/{id}/` - Delete (staff only)

**Available ViewSets**:
| ViewSet | Endpoint | Model |
|---------|----------|-------|
| CollegeCutoffViewSet | `/college-cutoffs/` | CollegeCutoff |
| INICETAllotmentViewSet | `/inicet-allotments/` | INICETAllotment |
| UGSeatMatrixViewSet | `/ug-seat-matrix/` | UGSeatMatrix |
| PGFeeDetailsViewSet | `/pg-fees/` | PGFeeDetails |
| ClosingRankViewSet | `/closing-ranks/` | ClosingRank |
| PrivateCollegeViewSet | `/private-colleges/` | PrivateCollege |
| NIRFUniversityRankingViewSet | `/nirf-rankings/` | NIRFUniversityRanking |
| FAQViewSet | `/faqs/` | FAQ |
| FAQCategoryViewSet | `/faq-categories/` | FAQCategory |
| CollegeChoiceViewSet | `/college-choices/` | CollegeChoice |

---

##### Predictor & Analysis Endpoints

**GET /rank-predictor/**

```python
class RankPredictorView(APIView):
  """Predict college/course based on rank"""

  Query Parameters:
    - rank: int (user's AIR)
    - category: str (General, SC, ST, OBC)
    - state: str (for state quota)
    - course: str (optional, filter by specialty)

  Response: {
    predictions: [
      {
        college_name: str
        course: str
        state: str
        probability: float (0-1)
        historical_closing_rank: int
        similar_years_data: [int]
      }
    ]
    accuracy: float
    based_on_years: [int]
  }

  Algorithm:
  - Uses historical closing ranks from RankPredictionCollege
  - Calculates probability based on trend analysis
  - Factors: category, quota, state, previous years' data
"""
```

**GET /health/**

```python
"""Health check endpoint"""
Response: { status: "ok", timestamp: str }
```

---

### Serializers

#### `backend/core/serializers.py`

```python
class LoginSerializer(serializers.Serializer):
  email: EmailField
  password: CharField(write_only=True)

class SignupSerializer(serializers.ModelSerializer):
  password: CharField(write_only=True, min_length=8)
  confirm_password: CharField(write_only=True)

  class Meta:
    model = CustomUser
    fields = [
      'email', 'password', 'confirm_password',
      'phone', 'category', 'state',
      'utm_source', 'utm_medium', 'utm_campaign',
      'utm_term', 'utm_content', 'gclid',
      'referrer', 'landing_url'
    ]

  def validate(self, data):
    if data['password'] != data['confirm_password']:
      raise ValidationError("Passwords do not match")
    return data

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = [
      'id', 'email', 'phone', 'neet_rank',
      'category', 'state', 'avatar',
      'email_verified', 'created_at'
    ]
    read_only_fields = ['id', 'created_at']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = '__all__'
    read_only_fields = ['id', 'created_at', 'updated_at', 'password']

class ForgotPasswordSerializer(serializers.Serializer):
  email: EmailField

class ResetPasswordSerializer(serializers.Serializer):
  token: CharField
  new_password: CharField(min_length=8)
  confirm_password: CharField(min_length=8)

# Model Serializers (for CRUD operations)
class CollegeCutoffSerializer(serializers.ModelSerializer):
  class Meta:
    model = CollegeCutoff
    fields = '__all__'

class INICETAllotmentSerializer(serializers.ModelSerializer):
  class Meta:
    model = INICETAllotment
    fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
  category_name: CharField(source='category.name', read_only=True)

  class Meta:
    model = FAQ
    fields = ['id', 'question', 'answer', 'category', 'category_name', 'order']

class FAQCategorySerializer(serializers.ModelSerializer):
  faqs: FAQSerializer(many=True, read_only=True)

  class Meta:
    model = FAQCategory
    fields = ['id', 'name', 'slug', 'description', 'faqs']
```

**Features**:

- Automatic snake_case ↔ camelCase conversion for frontend compatibility
- Write-only fields for sensitive data (passwords)
- Read-only timestamps
- Nested serializers for relationships

---

### URL Configuration

#### `backend/core/urls.py`

```python
# Router URLs (ModelViewSets)
urlpatterns = [
  path('api/', include([
    # Router auto-generates CRUD endpoints
    path('college-cutoffs/', CollegeCutoffViewSet.as_view({'get': 'list', ...})),
    path('inicet-allotments/', INICETAllotmentViewSet.as_view({'get': 'list', ...})),
    path('ug-seat-matrix/', UGSeatMatrixViewSet.as_view({'get': 'list', ...})),
    path('pg-fees/', PGFeeDetailsViewSet.as_view({'get': 'list', ...})),
    path('closing-ranks/', ClosingRankViewSet.as_view({'get': 'list', ...})),
    path('private-colleges/', PrivateCollegeViewSet.as_view({'get': 'list', ...})),
    path('nirf-rankings/', NIRFUniversityRankingViewSet.as_view({'get': 'list', ...})),
    path('faqs/', FAQViewSet.as_view({'get': 'list', ...})),
    path('faq-categories/', FAQCategoryViewSet.as_view({'get': 'list', ...})),
    path('college-choices/', CollegeChoiceViewSet.as_view({'get': 'list', ...})),

    # Custom Endpoints
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginAPIView.as_view(), name='login'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('auth/forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot-password'),
    path('auth/reset-password/', ResetPasswordAPIView.as_view(), name='reset-password'),
    path('auth/verify-email-otp/', EmailVerificationView.as_view(), name='verify-email-otp'),
    path('verify-email-otp/', verify_email_otp, name='verify_email_otp'),

    # Data Endpoints
    path('medical-colleges/', MedicalCollegeList.as_view(), name='medical-colleges'),
    path('college-database/', CollegeDatabaseList.as_view(), name='college-database'),
    path('rank-predictor/', RankPredictorView.as_view(), name='rank-predictor'),

    # Health
    path('health/', HealthCheckView.as_view(), name='health-check'),
  ]))
]
```

**Total Endpoints**: 25+

---

### Utility Files

#### `backend/core/signals.py`

```python
@receiver(post_save, sender=CustomUser)
def sync_new_signup_to_google_sheets(sender, instance, created, **kwargs):
  """
  Triggered: When new CustomUser is created

  Action:
  1. Appends user details to Google Sheet:
     - Email
     - Phone
     - Category
     - State
     - Signup IP
     - UTM Parameters (source, medium, campaign, etc.)
     - Timestamp

  Purpose: Marketing analytics - track user sources and conversions

  Configuration:
  - Google Sheets API credentials in .env
  - Sheet ID in settings
  - Webhook URL for async processing
  """
```

---

#### `backend/core/email_backend.py`

```python
class CustomEmailBackend(BaseEmailBackend):
  """
  Custom SMTP email backend

  Features:
  - SSL certificate verification bypass (for dev/test)
  - SMTP host configuration from settings
  - Port 587 (TLS) or 465 (SSL)

  Usage:
  - Sends verification emails
  - Password reset emails
  - OTP emails

  Configuration in settings.py:
  EMAIL_BACKEND = 'core.email_backend.CustomEmailBackend'
  EMAIL_HOST = 'smtp.gmail.com'
  EMAIL_PORT = 587
  EMAIL_USE_TLS = True
  EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
  EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
  """
```

---

#### `backend/core/otp_utils.py`

```python
def generate_otp(length: int = 6) -> str:
  """Generate random 6-digit OTP"""
  return ''.join([str(random.randint(0, 9)) for _ in range(length)])

def send_verification_email(user: CustomUser, otp: str) -> bool:
  """
  Send verification email with OTP

  Parameters:
  - user: CustomUser instance
  - otp: 6-digit OTP string

  Returns: True if sent successfully

  Email Template:
  Subject: "Email Verification OTP - Medical Counseling Platform"
  Body: "Your OTP is: {otp}. Valid for 10 minutes."

  Side Effects:
  - Updates user.email_otp
  - Updates user.email_otp_created_at
  - Sends via CustomEmailBackend
  """
```

---

#### `backend/core/google_sheets.py`

```python
def get_sheets_client():
  """
  Initialize Google Sheets API client

  Returns: sheets service object

  Authentication:
  - Uses service account JSON credentials
  - Credential file path from .env: GOOGLE_SHEETS_CREDS

  Scopes:
  - 'https://www.googleapis.com/auth/spreadsheets'
  - 'https://www.googleapis.com/auth/drive'
  """

def append_signup_to_sheet(user: CustomUser) -> bool:
  """
  Append user signup data to Google Sheet

  Data Appended:
  - Timestamp
  - Email
  - Phone
  - Category
  - State
  - UTM Parameters
  - Signup IP
  - Referrer
  - Landing URL

  Sheet Structure:
  | Timestamp | Email | Phone | Category | State | Source | Medium | Campaign | ... |

  Purpose: Marketing analytics spreadsheet
  Returns: True if successful
  """
```

---

#### `backend/core/pagination.py`

```python
class StandardResultsSetPagination(PageNumberPagination):
  """
  Standard pagination for all API list endpoints

  Configuration:
  - Page Size: 75 items per page (default)
  - Max Page Size: 200 items (user can request up to 200)
  - Query Parameter: ?page=1 for first page

  Example Response:
  {
    count: 1000  # Total items
    next: "https://...?page=2"
    previous: null
    results: [...]  # 75 items
  }

  Applied to all ViewSets automatically
  """
```

---

### Management Commands

#### `backend/core/management/commands/import_medical_colleges.py`

```python
class Command(BaseCommand):
  """
  Import medical college data from CSV

  Usage: python manage.py import_medical_colleges <csv_file_path>

  CSV Format Expected:
  | institute_name | state | course | category | quota | round | ai_rank |
  | AIIMS Delhi | Delhi | General Medicine | General | 100 | 1 | 50 |
  | ... | ... | ... | ... | ... | ... | ... |

  Processing:
  1. Read CSV file
  2. Parse each row
  3. Create/Update RankPredictionCollege or CollegeDatabase records
  4. Handle duplicates
  5. Output summary statistics

  Data Loaded Into:
  - RankPredictionCollege (for predictors)
  - MedicalCollege (master data)
  """
```

---

### Migrations

#### `backend/core/migrations/` - Evolution of Schema

**Migration Timeline**:

| Migration                                                          | Changes                                                 |
| ------------------------------------------------------------------ | ------------------------------------------------------- |
| 0001_initial.py                                                    | Create CustomUser, FAQ, FAQCategory, MedicalCollege     |
| 0002_customuser_avatar.py                                          | Add avatar field to CustomUser                          |
| 0003_alter_customuser_email.py                                     | Make email unique                                       |
| 0004_allotment_feestipendbond_seatmatrix_and_more.py               | Create complex data models                              |
| 0005_allotmentdata_closingranksdata_feestipendbonddata_and_more.py | Rename/restructure data models                          |
| 0006_alter_allotmentdata_bond_years.py                             | Fix bond_years field                                    |
| 0007_alter_closingranksdata_bond_years_and_more.py                 | Add bond_years to ClosingRank                           |
| 0008_customuser_email_otp_customuser_email_verified_and_more.py    | Add email verification fields (OTP, verified flag)      |
| 0009_customuser_gclid_customuser_landing_url_and_more.py           | Add UTM tracking fields (gclid, landing_url, signup_ip) |

---

### Settings Configuration

#### `backend/backend/settings.py`

```python
# Core Django Settings
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = [
  'backend-fiwg.onrender.com',
  'localhost',
  '127.0.0.1',
  os.getenv('ALLOWED_HOSTS', '').split(',')
]

# Database
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': BASE_DIR / 'db.sqlite3',
  }
}

# Installed Apps
INSTALLED_APPS = [
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',

  # Third-party
  'rest_framework',
  'rest_framework_simplejwt',
  'corsheaders',
  'drf_yasg',  # Swagger documentation
  'import_export',  # CSV import/export

  # Local
  'core.apps.CoreConfig',
]

# REST Framework Configuration
REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': (
    'rest_framework_simplejwt.authentication.JWTAuthentication',
  ),
  'DEFAULT_PERMISSION_CLASSES': (
    'rest_framework.permissions.IsAuthenticated',
  ),
  'DEFAULT_PAGINATION_CLASS': 'core.pagination.StandardResultsSetPagination',
  'PAGE_SIZE': 75,
  'DEFAULT_FILTER_BACKENDS': (
    'django_filters.rest_framework.DjangoFilterBackend',
    'rest_framework.filters.SearchFilter',
    'rest_framework.filters.OrderingFilter',
  ),
}

# JWT Configuration
SIMPLE_JWT = {
  'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
  'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
  'ROTATE_REFRESH_TOKENS': True,
  'BLACKLIST_AFTER_ROTATION': True,
  'ALGORITHM': 'HS256',
  'SIGNING_KEY': SECRET_KEY,
}

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
  'https://medical-counseling.vercel.app',
  'http://localhost:5173',
]

# Email Configuration
EMAIL_BACKEND = 'core.email_backend.CustomEmailBackend'
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')

# Google Sheets
GOOGLE_SHEETS_CREDS = os.getenv('GOOGLE_SHEETS_CREDS')
GOOGLE_SHEET_ID = os.getenv('GOOGLE_SHEET_ID')

# WhatsApp
AISENSY_API_KEY = os.getenv('AISENSY_API_KEY')
AISENSY_PHONE_ID = os.getenv('AISENSY_PHONE_ID')
```

---

## API Endpoints & Flows

### Complete Endpoint Reference

#### Authentication Flow

```
1. USER SIGNUP
   POST /api/auth/signup/
   {
     email: "user@example.com"
     password: "secure_password"
     phone: "9876543210"
     category: "General"
     state: "Delhi"
     utm_source: "google"
     utm_medium: "cpc"
     utm_campaign: "neet_pg_2025"
   }

   Response: {
     access: "eyJ0eXAiOiJKV1QiLCJhbGc..."
     refresh: "eyJ0eXAiOiJKV1QiLCJhbGc..."
     user: {
       id: 1
       email: "user@example.com"
       phone: "9876543210"
       category: "General"
       state: "Delhi"
       emailVerified: false
     }
   }

   Side Effects:
   - CustomUser created in database
   - Post-save signal triggers → Google Sheets sync
   - Verification OTP sent to email
   - Frontend stores JWT tokens in localStorage

2. VERIFY EMAIL OTP
   POST /api/auth/verify-email-otp/
   {
     email: "user@example.com"
     otp: "123456"
   }

   Response: {
     email_verified: true
     user: {...}
   }

   Side Effects:
   - CustomUser.email_verified = True
   - Clears OTP
   - Email verification complete

3. LOGIN
   POST /api/auth/login/
   {
     email: "user@example.com"
     password: "secure_password"
   }

   Response: {
     access: "new_jwt_token"
     refresh: "new_refresh_token"
     user: {...}
   }

   Frontend:
   - Stores tokens in localStorage
   - Redirects to dashboard
   - Sets Authorization header for future requests

4. TOKEN REFRESH (Auto-triggered on 401)
   GET /api/auth/token/refresh/
   {
     refresh: "refresh_token"
   }

   Response: {
     access: "new_access_token"
   }

5. PROFILE UPDATE
   PUT /api/auth/profile/
   Authorization: Bearer {access_token}
   {
     neet_rank: 5000
     category: "OBC"
     state: "Karnataka"
   }

   Response: Updated user object
```

---

#### Data Fetching Flow

```
1. GET COLLEGE PREDICTIONS (Multi-step)

   a. User enters rank on frontend

   b. Frontend calls:
      GET /api/rank-predictor/?rank=5000&category=General&state=Delhi
      Authorization: Bearer {token}

   c. Backend:
      - Queries RankPredictionCollege for historical data
      - Filters by category, state, quota
      - Analyzes trend (last 3 years)
      - Calculates probability for each college
      - Returns sorted by probability

   d. Response: {
     predictions: [
       {
         college_name: "AIIMS Delhi"
         course: "General Medicine"
         state: "Delhi"
         probability: 0.95
         historical_closing_rank: 4500
         similar_years_data: [4700, 4800, 4500]
       },
       {...}
     ]
     accuracy: 0.88
     based_on_years: [2023, 2024, 2025]
   }

   e. Frontend caches results
      Displays with college cards and ranking

2. GET CLOSING RANKS
   GET /api/closing-ranks/?state=Delhi&course=General_Medicine

   Response: [
     {
       state: "Delhi"
       college: "AIIMS"
       course: "GM"
       quota: "General"
       category: "General"
       closingRank: 4500
     },
     {...}
   ]

3. GET ALLOTMENTS (ROUND-WISE)
   GET /api/inicet-allotments/?round=1&session=2025-26

   Response: Paginated list (75 per page)
   [
     {
       round: 1
       aiRank: 500
       state: "Delhi"
       institute: "AIIMS Delhi"
       course: "DM - Cardiology"
       quota: "All India"
     },
     {...}
   ]

4. GET SEAT MATRIX
   GET /api/ug-seat-matrix/?state=Delhi

   Response: [
     {
       state: "Delhi"
       institute: "AIIMS Delhi"
       course: "MBBS"
       totalSeats: 100
       category_general: 50
       category_sc: 15
       category_st: 10
       category_obc: 25
     },
     {...}
   ]
```

---

#### User Choice Lists Flow

```
1. CREATE CHOICE LIST
   POST /api/college-choices/
   Authorization: Bearer {token}
   {
     name: "My Top 5 Colleges 2025"
   }

   Response: {
     id: 1
     user_id: 123
     name: "My Top 5 Colleges 2025"
     choices: []
     created_at: "2025-06-07T..."
   }

2. ADD TO CHOICE LIST
   POST /api/college-choices/1/add_choice/
   Authorization: Bearer {token}
   {
     college_id: 456
     rank: 1
   }

   Response: Added choice object

3. RETRIEVE CHOICE LISTS
   GET /api/college-choices/
   Authorization: Bearer {token}

   Response: [
     {
       id: 1
       name: "My Top 5 Colleges"
       choices: [
         {
           college_id: 456
           college_name: "AIIMS Delhi"
           rank: 1
         },
         {...}
       ]
     },
     {...}
   ]

4. UPDATE CHOICE LIST ORDER
   PUT /api/college-choices/1/
   {
     choices: [new_order_array]
   }

   Response: Updated choice list
```

---

## Data Models

### Comprehensive Model Diagram

```
CustomUser (14 fields)
├── Identity: email*, phone
├── Medical: neet_rank, category, state, avatar
├── Verification: email_otp, email_verified, email_otp_created_at
├── UTM Tracking: source, medium, campaign, term, content, gclid, referrer, landing_url, signup_ip
└── Timestamps: created_at, updated_at
    ↓ (One-to-Many)
    CollegeChoice (tracks user preferences)

MedicalCollege (Master Data)
├── name*, state, type, ownership
├── courses_offered (JSON), total_seats, ranking
└── Used by: College predictor, search filters

RankPredictionCollege (Prediction Database)
├── Historical closing ranks
├── college_name, state, course, ownership, is_aiims
├── closing_rank, total_seats, intake_year
└── Used for: Rank predictor algorithm

Data Models (Multi-dimensional)
├── CollegeCutoff: Round × College × State × Quota × Category
├── INICETAllotment: Session × Round × Rank × Institute × Course
├── UGSeatMatrix: State × Institute × Course × Category breakdown
├── PGFeeDetails: College × Course × Fee × Stipend × Bond
├── Allotment: Round-wise allotments (historical)
├── ClosingRank: Multi-year trend data
├── SeatMatrix: Detailed seat breakdowns
└── FeeStipendBond: Multi-year fee trends

FAQ System
├── FAQCategory (many)
│   ├── name*, slug, description
│   └── (One-to-Many)
│       FAQ (many)
│       ├── question*, answer, order
│       └── is_active

NIRF Rankings
├── NIRFUniversityRanking
├── rank, university_name, score, city, state, category, year
└── Used for: University rankings display
```

---

## Features & Predictors

### Core Features

#### 1. **Rank-Based College Predictor**

```
Algorithm:
1. Input: User's AIR, Category, State
2. Database Query: RankPredictionCollege
3. Filtering: By category, quota, state
4. Trend Analysis: Last 3 years' closing ranks
5. Probability Calculation:
   - If closing_rank ≤ user_rank: probability = HIGH (0.8-1.0)
   - If closing_rank similar to user_rank: probability = MEDIUM (0.4-0.7)
   - If closing_rank > user_rank: probability = LOW (0-0.3)
6. Ranking: Sort by probability
7. Output: Sorted list of colleges with probabilities

Accuracy Factors:
- Data freshness (current year vs previous)
- Category/quota changes year-to-year
- Special considerations (super specialty changes)
```

#### 2. **Multi-Criteria Predictor**

```
Parameters:
- User's rank
- Category (SC/ST/OBC/General)
- State quota preference
- Course preference
- Type preference (Government/Private)
- AIIMS preference

Scoring Algorithm:
score = (rank_match * 0.4) + (category_match * 0.3) + (state_match * 0.15) + (course_match * 0.15)

Filtering:
1. College must have user's course
2. College must accept user's category
3. College must have seats available
4. Historical rank must be within user's range (±10%)

Output: Top 10-20 colleges ranked by match score
```

#### 3. **Choice List Management**

```
Features:
- Create multiple choice lists for different counseling rounds
- Add/remove colleges from lists
- Reorder colleges by preference
- Compare multiple colleges side-by-side
- Export choice list (PDF/CSV)
- Share choice lists (with anonymization)

Use Case:
User creates "Round 1 Choices" → Adds top 5 AIIMS → Reorders by preference
After Round 1: Creates "Round 2 Choices" with fallback options
```

#### 4. **WhatsApp Integration**

```
Features:
- Send personalized counseling updates
- OTP via WhatsApp for faster verification
- Counseling schedule reminders
- Choice list confirmation messages
- Result notifications
- Support chat via WhatsApp

Implementation:
- AiSensy WhatsApp API
- Template-based messages (pre-approved by WhatsApp)
- Webhook for delivery status updates
- Queue system for batch messages (future)

Current Templates:
- OTP verification
- Counseling registration confirmation
- Rank verification
- Choice list submission
- Support responses
```

#### 5. **Email Notifications**

```
Types:
- Email verification (with OTP)
- Password reset (with secure token)
- Counseling updates
- New allotment round announcements
- Rank release notifications
- Seat availability alerts

Backend:
- CustomEmailBackend (SSL-configured)
- SMTP via Gmail
- HTML email templates (future)
- Queue system for batch emails (future)
```

### Advanced Features

#### 6. **UTM Tracking & Marketing Analytics**

```
Tracked Parameters:
- utm_source: Where user came from (google, facebook, direct, etc.)
- utm_medium: Type of link (cpc, organic, social, email)
- utm_campaign: Specific campaign name
- utm_term: Search keyword (for paid search)
- utm_content: Ad variant/content piece
- gclid: Google Ads click ID (for attribution)
- referrer: HTTP referrer
- landing_url: Initial page user landed on
- signup_ip: User's IP at signup time

Flow:
1. User clicks ad → Lands on landing page with UTM params in URL
2. Frontend's utmTracker.ts captures params
3. AuthContext stores in signup form
4. On signup, sent to backend in SignupSerializer
5. CustomUser model stores all fields
6. Post-save signal → Google Sheets sync
7. Marketing team analyzes in Google Sheets

Sheet Columns:
| Timestamp | Email | Phone | Source | Medium | Campaign | Term | Content | GCLID | Referrer | Landing URL | Signup IP |
```

#### 7. **Google Sheets Sync**

```
Integration:
- Google Sheets API v4
- Service account authentication
- Auto-append on new user signup
- Real-time sync via post_save signal

Synced Data:
- All CustomUser fields
- Signup timestamp (UTC)
- UTM parameters
- IP address
- Email verification status

Purpose:
- Real-time marketing analytics
- Lead tracking
- Campaign performance analysis
- Geographic distribution (via IP)
```

#### 8. **Analytics Integration**

```
Google Analytics 4:
- Property ID: G-WHDNY2WK54
- Events tracked: signup, login, page_view, contact_form, cta_click
- Custom events: predictor_used, choice_list_created, result_viewed
- Conversion tracking

Facebook Pixel:
- ID: 1191321999595048
- Events: ViewContent, AddToCart (choice_list), Purchase (signup), Lead, PageView
- Audience building: Website visitors, signups

Hotjar Integration: (if enabled)
- User session recordings
- Heatmaps
- Feedback polls
```

---

## Page Differences

### NEET UG Pages

#### Overview

The NEET UG section caters to undergraduate medical education candidates with specific UG admission data.

#### Files Structure

```
src/NEET_UG/
├── NEETUGDashboardPage.tsx
├── NEETUGMainContent.tsx
├── NEETUGRightSideBar.tsx
├── NEETUGSidebar.tsx
├── SeatCardsUG.tsx
└── latest2025data/
    ├── Allotments2025UGPage.tsx
    ├── ClosingRanks2025UGPage.tsx
    ├── FeesStipendBond2025UGPage.tsx
    └── SeatMatrixUGPage.tsx
```

#### Key Characteristics

**Data Models**:

- UG-specific closing ranks (NEET UG closing ranks only)
- UG seat matrix with UG quotas
- UG fee structure
- UG allotments (only for UG seats)

**Page Components**:

1. **NEETUGDashboardPage**
   - Entry point for UG counseling section
   - Layout: 3-column (Sidebar | Main | Right Sidebar)
   - Displays: Quick stats (total seats, closing ranks, etc.)

2. **NEETUGMainContent**
   - Central content area
   - Shows current round information
   - Navigation between different data views
   - Predictor integration

3. **SeatCardsUG**
   - Displays UG seat availability
   - Category breakdown (General, SC, ST, OBC)
   - College-wise seat information
   - Interactive filtering

4. **Allotments2025UGPage**
   - Shows 2025 UG allotment results
   - Round-wise filtering
   - Detail view for each allotment
   - Export to CSV/PDF (future)

5. **ClosingRanks2025UGPage**
   - Displays closing ranks (AIR, state rank)
   - Category-wise filtering
   - Trend chart (if multiple years)
   - Search functionality

6. **SeatMatrixUGPage**
   - Total seats in each college
   - Category-wise distribution
   - Quota breakdown

7. **FeesStipendBond2025UGPage**
   - Government college fees (usually free/minimal)
   - Hostel fees
   - Other charges
   - Comparison chart

**Sidebar Differences**:

- UG-specific states (different from PG)
- UG courses only (MBBS, BDS)
- UG-specific announcements

**Data Filters**:

- Round selection (1-6 for UG)
- State quota filter
- Category filter (General, SC, ST, OBC, EWS)
- Course type (MBBS, BDS)

---

### NEET PG Pages

#### Overview

NEET PG section handles postgraduate medical education with specialty-based counseling.

#### Key Characteristics

**Differences from UG**:

1. **Specialty-Based**
   - Super specialty courses (DM, MCh, etc.)
   - DNB specialty courses
   - Session-based (not year-based)

2. **Multiple Quotas**
   - All India Quota (AIQ)
   - State Quota
   - Central pool
   - Each with separate cutoffs

3. **Dynamic Filtering**
   - By specialty (DM Cardiology, MCh CVTS, etc.)
   - By quota type
   - By medical/dental distinction

**Data Models**:

- PG closing ranks (specialty + quota specific)
- PG allotments
- PG seat matrix
- PG fee structure (higher than UG)

**Components**:

- `PGPredictorPage.tsx` - PG-specific predictor
- `NEETPGPredictor.tsx` - Advanced PG predictor
- `StateTabsPG.tsx` - PG state tabs
- `QuotaPG.tsx` - PG quota display

**Sidebar Features**:

- PG specialty filter
- Quota selector
- Bond years filter

**State Tabs**:

- Shows PG state counseling information
- Different states → different cutoffs

**Data Specificity**:

- Cutoffs vary by specialty
- Each specialty has separate merit list
- Fees vary by specialty and college

---

### INICET Pages

#### Overview

INICET (Indian National INIT Exam) specific section for medical interns seeking PG admission through INICET counseling.

#### Files Structure

```
src/INICET/
├── InicetMainContent.tsx
├── InicetDashboardPage.tsx
├── InicetAllotmentsPage.tsx
├── InicetAllotmentsSessionPage.tsx
├── InicetFeeStipendPage.tsx
├── INICETSeatMatrixPage.tsx
├── Inicet2026SeatMatrix.tsx
├── InicetRightSideBar.tsx
└── InicetSidebar.tsx
```

#### Key Differences from NEET PG

1. **Session-Based Counseling**
   - INICET has multiple counseling sessions
   - Each session has separate allotments
   - Session selection is critical

2. **Unique Specialties**
   - INICET covers specific DM/MCh courses
   - Different from NEET PG specialties
   - Typically fewer seats than NEET PG

3. **Data Structure**
   - Session field (2024-25, 2025-26, etc.)
   - Round within session
   - Different quota system

**Components**:

1. **InicetDashboardPage**
   - Main INICET entry point
   - Layout: Sidebar | Main | Right Sidebar
   - Session selector prominent

2. **InicetAllotmentsSessionPage**
   - Lists allotments for a specific session
   - Round-wise tabs
   - Detail view for each allotment
   - Unique to INICET (PG doesn't have this)

3. **InicetFeeStipendPage**
   - INICET-specific fees
   - May differ from NEET PG fees
   - Stipend details
   - Bond information

4. **INICETSeatMatrixPage**
   - INICET-specific seats
   - Session × College × Specialty matrix
   - Category breakdown

5. **Inicet2026SeatMatrix.tsx**
   - Year-specific seat matrix
   - Can be updated annually

**Sidebar Features**:

- Session selector (dropdown)
- Specialty filter (INICET-specific)
- State filter

**Data Flow Differences**:

```
NEET UG: Year → Round → College → Seat
NEET PG: Quota → Specialty → Round → College → Seat
INICET: Session → Round → Specialty → College → Seat
```

---

### Data Differences Summary

| Aspect         | NEET UG        | NEET PG               | INICET                 |
| -------------- | -------------- | --------------------- | ---------------------- |
| **Courses**    | MBBS, BDS      | DM, MCh, DNB          | DM, MCh, DNB           |
| **Duration**   | 5.5 years      | 3-6 years             | 3-6 years              |
| **Quotas**     | State, Central | AIQ, State, Central   | Different system       |
| **Sessions**   | Annual         | Annual (by specialty) | Multiple per year      |
| **Rounds**     | Usually 6      | 4-6                   | 4-5                    |
| **Seat Count** | ~65K UG seats  | ~23K PG seats         | ~8K INICET seats       |
| **Merit List** | Single         | By specialty + quota  | By session + specialty |
| **Fees**       | Free/Low       | High                  | Medium                 |
| **Stipend**    | N/A            | Yes (varies)          | Yes (varies)           |
| **Bond**       | No             | Yes (usually)         | Yes (usually)          |

---

## Data Flow & Integration

### End-to-End User Flow

```
NEW USER JOURNEY:

1. DISCOVERY
   ├─ User searches "NEET PG counseling 2025"
   ├─ Lands on Homepage with UTM params
   │   (e.g., ?utm_source=google&utm_medium=cpc&utm_campaign=neet_pg_2025)
   ├─ Clicks "Register Now" CTA
   └─ GA4 + Facebook Pixel track page view, CTA click

2. REGISTRATION
   ├─ Frontend captures UTM params using utmTracker.ts
   ├─ User sees SignupPage
   ├─ Fills form:
   │  ├─ Email, Password
   │  ├─ Phone, Category, State (optional)
   │  └─ UTM params auto-filled (hidden)
   ├─ Clicks "Sign Up"
   └─ GA4 event: trackSignup()

3. BACKEND PROCESSING
   ├─ SignupView validates data
   ├─ Creates CustomUser record:
   │  ├─ email, password hash
   │  ├─ phone, category, state
   │  ├─ All UTM fields
   │  ├─ signup_ip (from request)
   │  ├─ email_otp (6-digit generated)
   │  └─ email_verified = False
   ├─ Post-save signal triggers:
   │  ├─ sync_new_signup_to_google_sheets()
   │  ├─ Appends row to Google Sheet with all fields
   │  └─ Marketing team sees real-time signup
   ├─ CustomEmailBackend sends email with OTP
   │  └─ "Your verification OTP: 123456"
   ├─ Returns JWT tokens (access + refresh)
   └─ Frontend stores tokens in localStorage

4. EMAIL VERIFICATION
   ├─ User checks email inbox
   ├─ Finds email with OTP
   ├─ Enters OTP on VerificationPage
   ├─ Frontend calls: POST /auth/verify-email-otp/
   ├─ Backend:
   │  ├─ Validates OTP
   │  ├─ Checks if not expired (10 min window)
   │  ├─ Updates CustomUser: email_verified = True
   │  └─ Clears email_otp
   ├─ GA4 event: trackEmailVerified()
   └─ Frontend redirects to Dashboard

5. DASHBOARD & PREDICTION
   ├─ User sees dashboard with options:
   │  ├─ NEET PG / NEET UG / INICET tabs
   │  ├─ Predictor button
   │  ├─ Choice List button
   │  └─ View Allotments button
   ├─ User enters their AIR on predictor
   │  ├─ Frontend calls: GET /rank-predictor/?rank=5000&category=General
   │  ├─ Backend queries RankPredictionCollege
   │  ├─ Returns [College, College, ...]
   │  └─ GA4 event: trackPredictorUsed(type, rank)
   ├─ Frontend displays results:
   │  ├─ College cards with probability
   │  ├─ "Add to Choice List" button on each
   │  └─ College details on click
   └─ User creates "My Top Colleges" choice list
      ├─ Frontend calls: POST /college-choices/
      ├─ Adds colleges: POST /college-choices/1/add_choice/
      └─ Choice list saved in backend

6. COUNSELING RESULTS
   ├─ After allotment released:
   │  ├─ Frontend notifies via banner
   │  ├─ WhatsAppService.sendMessage() queued
   │  └─ User clicks "View Allotments"
   ├─ Frontend filters by user's category/state
   │  └─ GET /inicet-allotments/?round=1&category=General&state=Delhi
   ├─ Backend returns paginated results
   ├─ User views results + shares on WhatsApp
   └─ GA4 event: trackResultViewed()

7. SUPPORT FLOW
   ├─ User has question
   ├─ Clicks WhatsApp support widget
   │  ├─ AiSensyWidget.tsx opens
   │  ├─ WhatsAppService.sendTemplate() called
   │  └─ User can chat via WhatsApp
   ├─ Backend logs support ticket
   ├─ Support team responds via WhatsApp
   └─ GA4 event: trackWhatsAppClick()
```

---

### Data Sync Flow

```
CSV IMPORT PROCESS:

1. Admin uploads CSV file
   └─ Format: institute_name, state, course, category, quota, round, ai_rank

2. Backend runs management command:
   python manage.py import_medical_colleges data.csv

3. Command processing:
   ├─ Reads CSV
   ├─ For each row:
   │  ├─ Checks if college exists in MedicalCollege
   │  ├─ Creates if not exists
   │  └─ Appends to RankPredictionCollege
   ├─ Validates data
   ├─ Outputs summary (1000 rows imported, 50 new colleges)
   └─ Timestamps import

4. Predictor regeneration:
   ├─ Next predictor request uses new data
   ├─ Calculates trends with updated historical data
   └─ Improved predictions

SYNC TO GOOGLE SHEETS:

1. New user signs up
   ├─ CustomUser created

2. Post-save signal fires:
   └─ sync_new_signup_to_google_sheets()

3. Google Sheets API client initialized:
   ├─ Uses service account credentials
   ├─ Scopes: sheets + drive
   └─ Authenticates

4. Data appended to Sheet:
   ├─ Row added to spreadsheet
   ├─ Columns: Timestamp, Email, Phone, Category, State, UTM fields, IP
   └─ Real-time visible to marketing team

5. Marketing analysis:
   ├─ Filter by utm_source (top sources)
   ├─ Filter by utm_campaign (campaign ROI)
   ├─ Geographic breakdown (via state)
   ├─ Conversion tracking (users → allotments)
   └─ Campaign optimization
```

---

### Data Flow Diagram

```
FRONTEND ────────────────────────────────┬─────────────────────────────── BACKEND
                                         │
API.ts (all requests via axios)          │
├─ authAPI                               │    Django REST Framework
├─ neetAPI                               │    ├─ ViewSets (CRUD)
├─ collectionsAPI                        │    ├─ APIViews (Custom)
├─ dataService                           │    └─ Serializers
└─ whatsappService                       │
        ↓                                │                          ↓
[Authorization header + JWT]             ├─→  Middleware
        ↓                                │    ├─ CORS check
[Request interceptor]                    │    ├─ JWT decode
└─ Auto-refresh on 401                   │    └─ Permission check
                                         │           ↓
User actions                             │    Views → Models
├─ Click predictor                       │    ├─ Query filtering
├─ Enter rank                            ├─→ │    ├─ Pagination (75/page)
├─ Select category                       │    │    └─ Serialization
├─ View allotments                       │    │         ↓
└─ Add to choice list                    │    Database (SQLite)
                                         │    ├─ RankPredictionCollege
GA4 / Facebook Pixel                     │    ├─ CollegeCutoff
├─ Event: trackPredictorUsed             │    ├─ INICETAllotment
├─ Event: trackResultViewed              │    ├─ CustomUser
└─ Event: trackChoiceListCreated         │    └─ [Other models]
                                         │           ↓
localStorage (JWT tokens)                │    Google Sheets (async)
├─ access_token (15 min)                 │    └─ New signups sync
└─ refresh_token (1 day)                 │       (via signals)
                                         │
WhatsApp Widget                          │
├─ User clicks "Support"                 ├─→ AiSensy WhatsApp API
├─ Message sent                          │    └─ Message delivered
└─ Webhook receives status update        │
                                         │
Email Notifications                      │
├─ OTP email                             ├─→ SMTP (Gmail)
├─ Password reset                        │    ├─ CustomEmailBackend
└─ Announcements                         │    └─ Message queued
```

---

## Configuration & Deployment

### Environment Variables

#### Frontend (`.env` / `.env.local`)

```
VITE_API_URL=https://backend-fiwg.onrender.com/api
VITE_GA_ID=G-WHDNY2WK54
VITE_FB_PIXEL_ID=1191321999595048
VITE_AISENSY_API_KEY=xxxxx
VITE_AISENSY_PHONE_ID=xxxxx
VITE_AISENSY_BUSINESS_ID=xxxxx
```

#### Backend (`backend/.env`)

```
DEBUG=False
SECRET_KEY=xxxxx (generate with Django)
ALLOWED_HOSTS=backend-fiwg.onrender.com,localhost,127.0.0.1

# Database
DATABASE_URL=sqlite:///db.sqlite3

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Google Sheets
GOOGLE_SHEETS_CREDS=base64_encoded_json_credentials
GOOGLE_SHEET_ID=xxxxx

# WhatsApp
AISENSY_API_KEY=xxxxx
AISENSY_PHONE_ID=xxxxx
AISENSY_BUSINESS_ID=xxxxx

# JWT
JWT_SECRET_KEY=xxxxx
JWT_ALGORITHM=HS256

# CORS
CORS_ALLOWED_ORIGINS=https://medical-counseling.vercel.app,http://localhost:5173
```

---

### Deployment

#### Frontend Deployment (Vercel)

**File: `vercel.json`**

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "@api_url",
    "VITE_GA_ID": "@ga_id",
    "VITE_FB_PIXEL_ID": "@fb_pixel"
  }
}
```

**Build Process**:

```bash
npm install
npm run build  # Creates dist/
# Vercel auto-deploys dist/ on git push
```

---

#### Backend Deployment (Render.com)

**File: `backend/render.yaml`**

```yaml
services:
  - type: web
    name: medical-backend
    runtime: python
    buildCommand: pip install -r requirements.txt && python manage.py migrate
    startCommand: gunicorn backend.wsgi
    envVars:
      - key: DEBUG
        value: false
      - key: ALLOWED_HOSTS
        value: backend-fiwg.onrender.com
    build:
      - python manage.py collectstatic --noinput
```

**Build Process**:

```bash
# Render.com automatically:
# 1. Installs requirements.txt
# 2. Runs migrations
# 3. Collects static files
# 4. Starts gunicorn server
```

---

### Build Scripts

#### Frontend (`package.json`)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .tsx,.ts",
    "format": "prettier --write ."
  }
}
```

#### Backend (`backend/build.sh`)

```bash
#!/bin/bash
set -e

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create cache table
python manage.py createcachetable

echo "Build completed successfully"
```

---

### Project Statistics

| Metric                  | Count      |
| ----------------------- | ---------- |
| **Frontend Components** | 43         |
| **Frontend Pages**      | 36         |
| **Backend Models**      | 14+        |
| **API Endpoints**       | 25+        |
| **Custom Hooks**        | 4          |
| **Data Services**       | 3          |
| **Migrations**          | 9          |
| **CSV Data Files**      | 20+        |
| **Blog Articles**       | 37K+ lines |

---

### Key Integrations

| Service               | Purpose                | Status    |
| --------------------- | ---------------------- | --------- |
| Google Analytics 4    | User behavior tracking | ✅ Active |
| Facebook Pixel        | Advertising pixel      | ✅ Active |
| Google Sheets API     | Signup sync            | ✅ Active |
| Gmail SMTP            | Email verification     | ✅ Active |
| AiSensy WhatsApp      | Messaging & OTP        | ✅ Active |
| Django REST Framework | API backbone           | ✅ Active |
| JWT Authentication    | Secure auth            | ✅ Active |

---

### Performance Optimizations

1. **Frontend**:
   - Vite build for faster development
   - Component lazy loading
   - Image optimization (Tailwind)
   - JWT token caching

2. **Backend**:
   - Database indexing on frequently queried fields
   - Pagination (75 items/page) for list endpoints
   - Serializer-level optimization
   - Query select_related/prefetch_related

3. **Caching**:
   - localStorage for JWT tokens
   - Frontend API response caching
   - Backend query caching (future)

---

## Summary

This knowledge kit comprehensively documents a medical college counseling platform with:

✅ **Frontend**: React + TypeScript with 43 components, 36 pages, multi-domain support (NEET UG/PG, INICET)  
✅ **Backend**: Django with 14+ models, 25+ APIs, JWT authentication, UTM tracking  
✅ **Features**: Rank-based predictors, choice list management, WhatsApp integration, Google Sheets sync  
✅ **Analytics**: GA4, Facebook Pixel, UTM parameter tracking  
✅ **Data**: 20+ CSV files, real-time sync capabilities  
✅ **Deployment**: Vercel (frontend), Render.com (backend)

For questions or updates, refer to the specific file paths and API documentation above.

---

**Last Updated**: June 7, 2026  
**Version**: 1.0  
**Maintained By**: Engineering Team
