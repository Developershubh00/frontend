// import axios from "axios";
// import { currentConfig } from "../config";

// // API Configuration
// const BASE_URL = currentConfig.apiUrl;
// const STATIC_URL = currentConfig.staticUrl;

// // Create axios instance with default configuration
// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 120000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refreshToken")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await api.post("/auth/refresh/", {
//           refresh: localStorage.getItem("refreshToken"),
//         });

//         localStorage.setItem("authToken", data.access);
//         api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
//         originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // Auth API endpoints
// export const authAPI = {
//   login: (credentials: { email: string; password: string }) =>
//     api.post("/auth/login/", credentials),

//   signup: (userData: {
//     email: string;
//     password: string;
//     name: string;
//     phone: string;
//     neetRank?: string;
//     category?: string;
//     state?: string;
//   }) => {
//     // Map frontend field names to backend field names
//     const mappedData = {
//       email: userData.email,
//       password: userData.password,
//       name: userData.name,
//       phone: userData.phone,
//       neet_rank: userData.neetRank,
//       category: userData.category,
//       state: userData.state,
//     };
//     return api.post("/auth/signup/", mappedData);
//   },

//   logout: () => api.post("/auth/logout/"),

//   refreshToken: () =>
//     api.post("/auth/token/refresh/", {
//       refresh: localStorage.getItem("refreshToken"),
//     }),

//   getProfile: () => api.get("/auth/profile/").then(response => {
//     // Map backend field names to frontend field names
//     const data = response.data;
//     return {
//       ...response,
//       data: {
//         ...data,
//         neetRank: data.neet_rank,
//       }
//     };
//   }),

//   updateProfile: (data: {
//     email?: string;
//     name?: string;
//     phone?: string;
//     neetRank?: string;
//     category?: string;
//     state?: string;
//   }) => {
//     // Map frontend field names to backend field names
//     const mappedData = {
//       email: data.email,
//       name: data.name,
//       phone: data.phone,
//       neet_rank: data.neetRank,
//       category: data.category,
//       state: data.state,
//     };
//     return api.put("/auth/profile/", mappedData);
//   },

//   // ✅ NEW: Forgot Password - Send reset email
//   forgotPassword: (email: string) =>
//     api.post("/auth/forgot-password/", { email }),

//   // ✅ NEW: Reset Password - Reset with token
//   resetPassword: (data: {
//     token: string;
//     uid: string;
//     password: string;
//     confirm_password: string;
//   }) => api.post("/auth/reset-password/", data),
// };

// // Allotments API (separate instance if needed)
// const API_BASE = "https://backend-fiwg.onrender.com/"; // update if different

// export const getAllotments = async (params: any = {}) => {
//   const response = await axios.get(`${API_BASE}/get-allotments/`, { params });
//   return response.data;
// };

// // Medical Colleges API
// export const collegesAPI = {
//   getAll: (params?: {
//     search?: string;
//     state?: string;
//     type?: string;
//     page?: number;
//   }) => api.get("/medical-colleges/", { params }),

//   getById: (id: number) => api.get(`/medical-colleges/${id}/`),

//   getNIRFRankings: (params?: {
//     search?: string;
//     type?: string;
//     page?: number;
//   }) => api.get("/nirf-rankings/", { params }),
// };

// // NEET Data API
// export const neetAPI = {
//   getResults: (params?: { year?: number; state?: string }) =>
//     api.get("/neet/results/", { params }),

//   getAllotments: (params?: {
//     search?: string;
//     state?: string;
//     type?: string;
//     page?: number;
//   }) => api.get("/neet/allotments/", { params }),

//   getClosingRanks: (params?: {
//     college?: string;
//     course?: string;
//     category?: string;
//     year?: number;
//   }) => api.get("/get-closingranks/", { params }),

//   getSeatMatrix: (params?: { state?: string; quota?: string; year?: number }) =>
//     api.get("/get-seat-matrix/", { params }),

//   getFeeStructure: (params?: {
//     college?: string;
//     state?: string;
//     type?: string;
//   }) => api.get("/get-fee-structure/", { params }),
// };

// // Choice Lists APIs
// export const choiceListsAPI = {
//   getUserChoiceLists: () =>
//     api.get('/choice-lists/'),
  
//   createChoiceList: (listData: any) =>
//     api.post('/choice-lists/', listData),
  
//   updateChoiceList: (id: string, listData: any) =>
//     api.put(`/choice-lists/${id}/`, listData),
  
//   deleteChoiceList: (id: string) =>
//     api.delete(`/choice-lists/${id}/`),
  
//   addToChoiceList: (listId: string, collegeId: string) =>
//     api.post(`/choice-lists/${listId}/colleges/`, { collegeId }),
  
//   removeFromChoiceList: (listId: string, collegeId: string) =>
//     api.delete(`/choice-lists/${listId}/colleges/${collegeId}/`),
// };

// // Counselling API
// export const counsellingAPI = {
//   getINICETData: (params?: {
//     search?: string;
//     round?: number;
//     category?: string;
//     page?: number;
//   }) => api.get("/counselling/inicet/", { params }),

//   getTimeline: () => api.get("/counselling/timeline/"),

//   getChoiceLists: () => api.get("/counselling/choice-lists/"),

//   createChoiceList: (data: { name: string; colleges: number[] }) =>
//     api.post("/counselling/choice-lists/", data),

//   updateChoiceList: (
//     id: number,
//     data: { name?: string; colleges?: number[] }
//   ) => api.put(`/counselling/choice-lists/${id}/`, data),

//   deleteChoiceList: (id: number) =>
//     api.delete(`/counselling/choice-lists/${id}/`),
// };

// // Predictor API
// export const predictorAPI = {
//   predictPG: (data: {
//     rank: number;
//     category: string;
//     specialization: string;
//   }) => api.post("/predictor/pg/", data),

//   getRankPrediction: (data: {
//     score: number;
//     category: string;
//     year: number;
//   }) => api.post("/predictor/rank/", data),
// };

// // FAQ API
// export const faqAPI = {
//   getAll: (params?: { search?: string; category?: string }) =>
//     api.get("/faq/", { params }),

//   getById: (id: number) => api.get(`/faq/${id}/`),
// };

// // Support API
// export const supportAPI = {
//   createTicket: (data: {
//     subject: string;
//     message: string;
//     priority: string;
//   }) => api.post("/support/tickets/", data),

//   getTickets: () => api.get("/support/tickets/"),

//   sendMessage: (data: { message: string; type: string }) =>
//     api.post("/support/messages/", data),
// };

// // Static file helper
// export const getStaticFileUrl = (filename: string) => {
//   return `${STATIC_URL}data/${filename}`;
// };

// export default api;

// import axios from "axios";
// import { currentConfig } from "../config";

// // API Configuration
// const BASE_URL = currentConfig.apiUrl;
// const STATIC_URL = currentConfig.staticUrl;

// // Create axios instance with default configuration
// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 120000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refreshToken")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await api.post("/auth/refresh/", {
//           refresh: localStorage.getItem("refreshToken"),
//         });

//         localStorage.setItem("authToken", data.access);
//         api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
//         originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // Auth API endpoints
// export const authAPI = {
//   login: (credentials: { email: string; password: string }) =>
//     api.post("/auth/login/", credentials),

//   // ── CHANGE 1: type now includes UTM fields ──────────────────────────────
//   signup: (userData: {
//     email: string;
//     password: string;
//     name: string;         // kept as required — AuthContext validates this
//     phone: string;        // kept as required — AuthContext validates this
//     neetRank?: string;
//     category?: string;
//     state?: string;
//     utm_source?: string;
//     utm_medium?: string;
//     utm_campaign?: string;
//     utm_term?: string;
//     utm_content?: string;
//     gclid?: string;
//     referrer?: string;
//     landing_url?: string;
//   }) => {
//     // ── CHANGE 2: mappedData now includes all UTM fields ─────────────────
//     const mappedData = {
//       email:        userData.email,
//       password:     userData.password,
//       name:         userData.name,
//       phone:        userData.phone,
//       neet_rank:    userData.neetRank,   // camelCase → snake_case for Django
//       category:     userData.category,
//       state:        userData.state,
//       utm_source:   userData.utm_source,
//       utm_medium:   userData.utm_medium,
//       utm_campaign: userData.utm_campaign,
//       utm_term:     userData.utm_term,
//       utm_content:  userData.utm_content,
//       gclid:        userData.gclid,
//       referrer:     userData.referrer,
//       landing_url:  userData.landing_url,
//     };
//     return api.post("/auth/signup/", mappedData);
//   },
//   // ────────────────────────────────────────────────────────────────────────

//   logout: () => api.post("/auth/logout/"),

//   refreshToken: () =>
//     api.post("/auth/token/refresh/", {
//       refresh: localStorage.getItem("refreshToken"),
//     }),

//   getProfile: () => api.get("/auth/profile/").then(response => {
//     const data = response.data;
//     return {
//       ...response,
//       data: {
//         ...data,
//         neetRank: data.neet_rank,
//       }
//     };
//   }),

//   updateProfile: (data: {
//     email?: string;
//     name?: string;
//     phone?: string;
//     neetRank?: string;
//     category?: string;
//     state?: string;
//   }) => {
//     const mappedData = {
//       email:     data.email,
//       name:      data.name,
//       phone:     data.phone,
//       neet_rank: data.neetRank,
//       category:  data.category,
//       state:     data.state,
//     };
//     return api.put("/auth/profile/", mappedData);
//   },

//   forgotPassword: (email: string) =>
//     api.post("/auth/forgot-password/", { email }),

//   resetPassword: (data: {
//     token: string;
//     uid: string;
//     password: string;
//     confirm_password: string;
//   }) => api.post("/auth/reset-password/", data),
// };

// // Allotments API
// const API_BASE = "https://backend-fiwg.onrender.com/";

// export const getAllotments = async (params: any = {}) => {
//   const response = await axios.get(`${API_BASE}/get-allotments/`, { params });
//   return response.data;
// };

// // Medical Colleges API
// export const collegesAPI = {
//   getAll: (params?: {
//     search?: string;
//     state?: string;
//     type?: string;
//     page?: number;
//   }) => api.get("/medical-colleges/", { params }),

//   getById: (id: number) => api.get(`/medical-colleges/${id}/`),

//   getNIRFRankings: (params?: {
//     search?: string;
//     type?: string;
//     page?: number;
//   }) => api.get("/nirf-rankings/", { params }),
// };

// // NEET Data API
// export const neetAPI = {
//   getResults: (params?: { year?: number; state?: string }) =>
//     api.get("/neet/results/", { params }),

//   getAllotments: (params?: {
//     search?: string;
//     state?: string;
//     type?: string;
//     page?: number;
//   }) => api.get("/neet/allotments/", { params }),

//   getClosingRanks: (params?: {
//     college?: string;
//     course?: string;
//     category?: string;
//     year?: number;
//   }) => api.get("/get-closingranks/", { params }),

//   getSeatMatrix: (params?: { state?: string; quota?: string; year?: number }) =>
//     api.get("/get-seat-matrix/", { params }),

//   getFeeStructure: (params?: {
//     college?: string;
//     state?: string;
//     type?: string;
//   }) => api.get("/get-fee-structure/", { params }),
// };

// // Choice Lists APIs
// export const choiceListsAPI = {
//   getUserChoiceLists: () => api.get('/choice-lists/'),
//   createChoiceList: (listData: any) => api.post('/choice-lists/', listData),
//   updateChoiceList: (id: string, listData: any) => api.put(`/choice-lists/${id}/`, listData),
//   deleteChoiceList: (id: string) => api.delete(`/choice-lists/${id}/`),
//   addToChoiceList: (listId: string, collegeId: string) =>
//     api.post(`/choice-lists/${listId}/colleges/`, { collegeId }),
//   removeFromChoiceList: (listId: string, collegeId: string) =>
//     api.delete(`/choice-lists/${listId}/colleges/${collegeId}/`),
// };

// // Counselling API
// export const counsellingAPI = {
//   getINICETData: (params?: {
//     search?: string;
//     round?: number;
//     category?: string;
//     page?: number;
//   }) => api.get("/counselling/inicet/", { params }),

//   getTimeline: () => api.get("/counselling/timeline/"),
//   getChoiceLists: () => api.get("/counselling/choice-lists/"),

//   createChoiceList: (data: { name: string; colleges: number[] }) =>
//     api.post("/counselling/choice-lists/", data),

//   updateChoiceList: (id: number, data: { name?: string; colleges?: number[] }) =>
//     api.put(`/counselling/choice-lists/${id}/`, data),

//   deleteChoiceList: (id: number) =>
//     api.delete(`/counselling/choice-lists/${id}/`),
// };

// // Predictor API
// export const predictorAPI = {
//   predictPG: (data: {
//     rank: number;
//     category: string;
//     specialization: string;
//   }) => api.post("/predictor/pg/", data),

//   getRankPrediction: (data: {
//     score: number;
//     category: string;
//     year: number;
//   }) => api.post("/predictor/rank/", data),
// };

// // FAQ API
// export const faqAPI = {
//   getAll: (params?: { search?: string; category?: string }) =>
//     api.get("/faq/", { params }),
//   getById: (id: number) => api.get(`/faq/${id}/`),
// };

// // Support API
// export const supportAPI = {
//   createTicket: (data: {
//     subject: string;
//     message: string;
//     priority: string;
//   }) => api.post("/support/tickets/", data),

//   getTickets: () => api.get("/support/tickets/"),

//   sendMessage: (data: { message: string; type: string }) =>
//     api.post("/support/messages/", data),
// };

// // Static file helper
// export const getStaticFileUrl = (filename: string) => {
//   return `${STATIC_URL}data/${filename}`;
// };

// export default api;

import axios from "axios";
import { currentConfig } from "../config";

const BASE_URL = currentConfig.apiUrl;
const STATIC_URL = currentConfig.staticUrl;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — auto refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/auth/refresh/", {
          refresh: localStorage.getItem("refreshToken"),
        });
        localStorage.setItem("authToken", data.access);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────
// Auth API
// ─────────────────────────────────────────────────────────────
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post("/auth/login/", credentials),

  signup: (userData: {
    email: string;
    password: string;
    name: string;
    phone: string;
    neetRank?: string;      // ✅ accepts camelCase from AuthContext/SignupPage
    category?: string;
    state?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    gclid?: string;
    referrer?: string;
    landing_url?: string;
  }) => {
    // ✅ Maps camelCase → snake_case for Django serializer
    const mappedData = {
      email:        userData.email,
      password:     userData.password,
      name:         userData.name,
      phone:        userData.phone,
      neet_rank:    userData.neetRank ?? '',   // ← THE KEY MAPPING
      category:     userData.category ?? '',
      state:        userData.state ?? '',
      utm_source:   userData.utm_source ?? '',
      utm_medium:   userData.utm_medium ?? '',
      utm_campaign: userData.utm_campaign ?? '',
      utm_term:     userData.utm_term ?? '',
      utm_content:  userData.utm_content ?? '',
      gclid:        userData.gclid ?? '',
      referrer:     userData.referrer ?? '',
      landing_url:  userData.landing_url ?? '',
    };

    // 🔍 Debug log — remove after confirming data flows correctly
    console.log("[API] Signup payload to Django:", mappedData);

    return api.post("/auth/signup/", mappedData);
  },

  logout: () => api.post("/auth/logout/"),

  refreshToken: () =>
    api.post("/auth/token/refresh/", {
      refresh: localStorage.getItem("refreshToken"),
    }),

  getProfile: () =>
    api.get("/auth/profile/").then((response) => {
      const data = response.data;
      return {
        ...response,
        data: {
          ...data,
          neetRank: data.neet_rank,   // map back for frontend display
        },
      };
    }),

  updateProfile: (data: {
    email?: string;
    name?: string;
    phone?: string;
    neetRank?: string;
    category?: string;
    state?: string;
  }) => {
    const mappedData = {
      email:     data.email,
      name:      data.name,
      phone:     data.phone,
      neet_rank: data.neetRank,
      category:  data.category,
      state:     data.state,
    };
    return api.put("/auth/profile/", mappedData);
  },

  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password/", { email }),

  resetPassword: (data: {
    token: string;
    uid: string;
    password: string;
    confirm_password: string;
  }) => api.post("/auth/reset-password/", data),
};

// ─────────────────────────────────────────────────────────────
// Other APIs (unchanged)
// ─────────────────────────────────────────────────────────────
const API_BASE = "https://backend-fiwg.onrender.com/";

export const getAllotments = async (params: any = {}) => {
  const response = await axios.get(`${API_BASE}/get-allotments/`, { params });
  return response.data;
};

export const collegesAPI = {
  getAll: (params?: { search?: string; state?: string; type?: string; page?: number }) =>
    api.get("/medical-colleges/", { params }),
  getById: (id: number) => api.get(`/medical-colleges/${id}/`),
  getNIRFRankings: (params?: { search?: string; type?: string; page?: number }) =>
    api.get("/nirf-rankings/", { params }),
};

export const neetAPI = {
  getResults: (params?: { year?: number; state?: string }) =>
    api.get("/neet/results/", { params }),
  getAllotments: (params?: { search?: string; state?: string; type?: string; page?: number }) =>
    api.get("/neet/allotments/", { params }),
  getClosingRanks: (params?: { college?: string; course?: string; category?: string; year?: number }) =>
    api.get("/get-closingranks/", { params }),
  getSeatMatrix: (params?: { state?: string; quota?: string; year?: number }) =>
    api.get("/get-seat-matrix/", { params }),
  getFeeStructure: (params?: { college?: string; state?: string; type?: string }) =>
    api.get("/get-fee-structure/", { params }),
};

export const choiceListsAPI = {
  getUserChoiceLists: () => api.get('/choice-lists/'),
  createChoiceList: (listData: any) => api.post('/choice-lists/', listData),
  updateChoiceList: (id: string, listData: any) => api.put(`/choice-lists/${id}/`, listData),
  deleteChoiceList: (id: string) => api.delete(`/choice-lists/${id}/`),
  addToChoiceList: (listId: string, collegeId: string) =>
    api.post(`/choice-lists/${listId}/colleges/`, { collegeId }),
  removeFromChoiceList: (listId: string, collegeId: string) =>
    api.delete(`/choice-lists/${listId}/colleges/${collegeId}/`),
};

export const counsellingAPI = {
  getINICETData: (params?: { search?: string; round?: number; category?: string; page?: number }) =>
    api.get("/counselling/inicet/", { params }),
  getTimeline: () => api.get("/counselling/timeline/"),
  getChoiceLists: () => api.get("/counselling/choice-lists/"),
  createChoiceList: (data: { name: string; colleges: number[] }) =>
    api.post("/counselling/choice-lists/", data),
  updateChoiceList: (id: number, data: { name?: string; colleges?: number[] }) =>
    api.put(`/counselling/choice-lists/${id}/`, data),
  deleteChoiceList: (id: number) => api.delete(`/counselling/choice-lists/${id}/`),
};

export const predictorAPI = {
  predictPG: (data: { rank: number; category: string; specialization: string }) =>
    api.post("/predictor/pg/", data),
  getRankPrediction: (data: { score: number; category: string; year: number }) =>
    api.post("/predictor/rank/", data),
};

export const faqAPI = {
  getAll: (params?: { search?: string; category?: string }) => api.get("/faq/", { params }),
  getById: (id: number) => api.get(`/faq/${id}/`),
};

export const supportAPI = {
  createTicket: (data: { subject: string; message: string; priority: string }) =>
    api.post("/support/tickets/", data),
  getTickets: () => api.get("/support/tickets/"),
  sendMessage: (data: { message: string; type: string }) =>
    api.post("/support/messages/", data),
};

export const getStaticFileUrl = (filename: string) => `${STATIC_URL}data/${filename}`;

export default api;