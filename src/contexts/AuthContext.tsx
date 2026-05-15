

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authAPI } from "../services/api";

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  neetRank?: string;
  category?: string;
  state?: string;
  avatar?: string;
}

// ✅ ALL fields that SignupPage sends — nothing missing
interface SignupData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  neetRank?: string;      // ✅ camelCase — api.ts maps this to neet_rank for Django
  category?: string;
  state?: string;
  avatar?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  referrer?: string;
  landing_url?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initAuth = async () => {
      console.log("[Auth] Starting auth initialization...");
      try {
        const cachedUser = localStorage.getItem("user");
        if (cachedUser) {
          try {
            const userData = JSON.parse(cachedUser);
            console.log("[Auth] Using cached user data:", userData);
            setUser(userData);
          } catch (e) {
            console.error("[Auth] Error parsing cached user:", e);
            localStorage.removeItem("user");
          }
        }

        const token = localStorage.getItem("authToken");
        console.log("[Auth] Token exists:", !!token);

        if (token) {
          try {
            console.log("[Auth] Fetching profile...");
            const profile = await authAPI.getProfile();
            console.log("[Auth] Profile fetched successfully:", profile.data);
            setUser(profile.data);
            localStorage.setItem("user", JSON.stringify(profile.data));
          } catch (error) {
            console.error("[Auth] Token validation failed:", error);
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            setUser(null);
          }
        } else {
          console.log("[Auth] No token found, user needs to login");
          setUser(null);
        }
      } catch (error) {
        console.error("[Auth] Auth initialization error:", error);
        setUser(null);
      } finally {
        console.log("[Auth] Finishing auth init, setting isLoading=false");
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const { access, refresh } = response.data;

      localStorage.setItem("authToken", access);
      localStorage.setItem("refreshToken", refresh);

      const profile = await authAPI.getProfile();
      localStorage.setItem("user", JSON.stringify(profile.data));
      setUser(profile.data);
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "detail" in error.response.data
      ) {
        throw new Error(
          (error.response as { data: { detail?: string } }).data.detail ||
            "Incorrect password"
        );
      }
      throw new Error("Incorrect password. If you don’t remember it, click “Forgot Password” to reset it.");
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      if (!userData.name || !userData.phone) {
        throw new Error("Name and phone are required for signup.");
      }
      // ✅ Pass full userData to authAPI.signup — includes neetRank + all UTMs
      await authAPI.signup(userData as any);
      await login(userData.email, userData.password);
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "detail" in error.response.data
      ) {
        throw new Error(
          (error.response as { data: { detail?: string } }).data.detail ||
            "Signup failed"
        );
      }
      // Re-throw original error if it's already an Error instance (e.g. name/phone validation)
      if (error instanceof Error) throw error;
      throw new Error("Signup failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "detail" in error.response.data
      ) {
        throw new Error(
          (error.response as { data: { detail?: string } }).data.detail ||
            "Profile update failed"
        );
      }
      throw new Error("Profile update failed");
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};