import axios from "axios";
import { currentConfig } from "../config";

// API Configuration
const BASE_URL = currentConfig.apiUrl;
const STATIC_URL = currentConfig.staticUrl;

// Create axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
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

// Auth API endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post("/auth/login/", credentials),

  signup: (userData: {
    email: string;
    password: string;
    name: string;
    phone: string;
    neetRank?: string;
    category?: string;
    state?: string;
  }) => {
    // Map frontend field names to backend field names
    const mappedData = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      phone: userData.phone,
      neet_rank: userData.neetRank,
      category: userData.category,
      state: userData.state,
    };
    return api.post("/auth/signup/", mappedData);
  },

  logout: () => api.post("/auth/logout/"),

  refreshToken: () =>
    api.post("/auth/token/refresh/", {
      refresh: localStorage.getItem("refreshToken"),
    }),

  getProfile: () => api.get("/auth/profile/").then(response => {
    // Map backend field names to frontend field names
    const data = response.data;
    return {
      ...response,
      data: {
        ...data,
        neetRank: data.neet_rank,
      }
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
    // Map frontend field names to backend field names
    const mappedData = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      neet_rank: data.neetRank,
      category: data.category,
      state: data.state,
    };
    return api.put("/auth/profile/", mappedData);
  },
};

// Medical Colleges API
export const collegesAPI = {
  getAll: (params?: {
    search?: string;
    state?: string;
    type?: string;
    page?: number;
  }) => api.get("/medical-colleges/", { params }),

  getById: (id: number) => api.get(`/medical-colleges/${id}/`),

  getNIRFRankings: (params?: {
    search?: string;
    type?: string;
    page?: number;
  }) => api.get("/nirf-rankings/", { params }),
};

// NEET Data API
export const neetAPI = {
  getResults: (params?: { year?: number; state?: string }) =>
    api.get("/neet/results/", { params }),

  getAllotments: (params?: {
    search?: string;
    state?: string;
    type?: string;
    page?: number;
  }) => api.get("/neet/allotments/", { params }),

  getClosingRanks: (params?: {
    college?: string;
    course?: string;
    category?: string;
    year?: number;
  }) => api.get("/neet/closing-ranks/", { params }),

  getSeatMatrix: (params?: { state?: string; quota?: string; year?: number }) =>
    api.get("/neet/seat-matrix/", { params }),

  getFeeStructure: (params?: {
    college?: string;
    state?: string;
    type?: string;
  }) => api.get("/neet/fee-structure/", { params }),
};

// Allotments APIs
export const allotmentsAPI = {
  getUGAllotments: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/allotments/ug/?${params}`);
  },
  
  getPGAllotments: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/allotments/pg/?${params}`);
  },
};

// Closing Ranks APIs
export const closingRanksAPI = {
  getUGClosingRanks: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/closing-ranks/ug/?${params}`);
  },
  
  getPGClosingRanks: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/closing-ranks/pg/?${params}`);
  },
};

// Seat Matrix APIs
export const seatMatrixAPI = {
  getUGSeatMatrix: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/seat-matrix/ug/?${params}`);
  },
  
  getPGSeatMatrix: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/seat-matrix/pg/?${params}`);
  },
};

// Fee, Stipend & Bond APIs
export const feeStipendBondAPI = {
  getUGFeeData: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/fee-stipend-bond/ug/?${params}`);
  },
  
  getPGFeeData: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/fee-stipend-bond/pg/?${params}`);
  },
};

// // Colleges APIs
// export const collegesAPI = {
//   getAllColleges: (filters: any = {}) => {
//     const params = new URLSearchParams(filters);
//     return api.get(`/colleges/?${params}`);
//   },
  
//   getCollegeDetails: (id: string) =>
//     api.get(`/colleges/${id}/`),
  
//   searchColleges: (searchParams: any) => {
//     const params = new URLSearchParams(searchParams);
//     return api.get(`/colleges/search/?${params}`);
//   },
// };

// Choice Lists APIs
export const choiceListsAPI = {
  getUserChoiceLists: () =>
    api.get('/choice-lists/'),
  
  createChoiceList: (listData: any) =>
    api.post('/choice-lists/', listData),
  
  updateChoiceList: (id: string, listData: any) =>
    api.put(`/choice-lists/${id}/`, listData),
  
  deleteChoiceList: (id: string) =>
    api.delete(`/choice-lists/${id}/`),
  
  addToChoiceList: (listId: string, collegeId: string) =>
    api.post(`/choice-lists/${listId}/colleges/`, { collegeId }),
  
  removeFromChoiceList: (listId: string, collegeId: string) =>
    api.delete(`/choice-lists/${listId}/colleges/${collegeId}/`),
};



// Counselling API
export const counsellingAPI = {
  getINICETData: (params?: {
    search?: string;
    round?: number;
    category?: string;
    page?: number;
  }) => api.get("/counselling/inicet/", { params }),

  getTimeline: () => api.get("/counselling/timeline/"),

  getChoiceLists: () => api.get("/counselling/choice-lists/"),

  createChoiceList: (data: { name: string; colleges: number[] }) =>
    api.post("/counselling/choice-lists/", data),

  updateChoiceList: (
    id: number,
    data: { name?: string; colleges?: number[] }
  ) => api.put(`/counselling/choice-lists/${id}/`, data),

  deleteChoiceList: (id: number) =>
    api.delete(`/counselling/choice-lists/${id}/`),
};

// Predictor API
export const predictorAPI = {
  predictUG: (data: {
    rank: number;
    category: string;
    state: string;
    quota: string;
  }) => api.post("/predictor/ug/", data),

  predictPG: (data: {
    rank: number;
    category: string;
    specialization: string;
  }) => api.post("/predictor/pg/", data),

  getRankPrediction: (data: {
    score: number;
    category: string;
    year: number;
  }) => api.post("/predictor/rank/", data),
};

// FAQ API
export const faqAPI = {
  getAll: (params?: { search?: string; category?: string }) =>
    api.get("/faq/", { params }),

  getById: (id: number) => api.get(`/faq/${id}/`),
};

// Support API
export const supportAPI = {
  createTicket: (data: {
    subject: string;
    message: string;
    priority: string;
  }) => api.post("/support/tickets/", data),

  getTickets: () => api.get("/support/tickets/"),

  sendMessage: (data: { message: string; type: string }) =>
    api.post("/support/messages/", data),
};

// Static file helper
export const getStaticFileUrl = (filename: string) => {
  return `${STATIC_URL}data/${filename}`;
};

export default api;
