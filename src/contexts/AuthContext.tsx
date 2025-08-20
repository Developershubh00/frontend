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

interface SignupData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  neetRank?: string;
  category?: string;
  state?: string;
  avatar?: string;
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
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          try {
            // Add timeout to prevent hanging
            const profilePromise = authAPI.getProfile();
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Request timeout')), 5000)
            );
            
            const profile = await Promise.race([profilePromise, timeoutPromise]);
            setUser(profile.data);
            localStorage.setItem("user", JSON.stringify(profile.data));
          } catch (error) {
            console.error("Token validation failed:", error);
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
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
            "Login failed"
        );
      }
      throw new Error("Login failed");
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      // Ensure required fields are present as strings
      if (!userData.name || !userData.phone) {
        throw new Error("Name and phone are required for signup.");
      }
      await authAPI.signup({
        ...userData,
        name: userData.name,
        phone: userData.phone,
      });
      await login(userData.email, userData.password); // auto-login after signup
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
