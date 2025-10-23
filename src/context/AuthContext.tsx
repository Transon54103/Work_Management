import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: number | string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiration: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Safe version that doesn't throw error
export const useAuthSafe = () => {
  const context = useContext(AuthContext);
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { getStoredAuthData, isTokenExpired, clearAuthData } =
          await import("../utils/tokenUtils");

        const { token, expiration, user } = getStoredAuthData();

        if (token && expiration && user) {
          // Check if token is expired
          if (isTokenExpired(expiration)) {
            // Token expired, clear data
            clearAuthData();
            setUser(null);
          } else {
            // Token still valid, restore user
            setUser(user);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Mock users for demo
  // const mockUsers: (User & { password: string })[] = [
  //   {
  //     id: "1",
  //     email: "admin@example.com",
  //     password: "admin123",
  //     name: "Admin User",
  //     role: "admin",
  //     avatar: "/images/user/user-01.png",
  //   },
  //   {
  //     id: "2",
  //     email: "user@example.com",
  //     password: "user123",
  //     name: "Regular User",
  //     role: "user",
  //     avatar: "/images/user/user-02.png",
  //   },
  //   {
  //     id: "3",
  //     email: "manager@example.com",
  //     password: "manager123",
  //     name: "Manager User",
  //     role: "manager",
  //     avatar: "/images/user/user-03.png",
  //   },
  // ];

  const login = async (email: string, password: string) => {
    try {
      const { authService } = await import("../services/authService");

      const response = await authService.login({ email, password });
      const loginData: LoginResponse = response.data;

      // Save tokens
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("refreshToken", loginData.refreshToken);
      localStorage.setItem("tokenExpiration", loginData.expiration);

      // Create user object
      const user: User = {
        id: loginData.user.id.toString(),
        name: loginData.user.name,
        email: loginData.user.email,
        role: loginData.user.role,
        avatar: "/images/user/user-01.png", // Default avatar
        createdAt: loginData.user.createdAt,
        updatedAt: loginData.user.updatedAt,
      };

      // Save user data
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error: any) {
      // Handle API errors
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Login failed. Please try again.");
      }
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Import authService dynamically to avoid circular dependency
      const { authService } = await import("../services/authService");

      // Call real API - only register user, don't store anything
      await authService.register({ name, email, password });

      // Registration successful - just return without storing any data
      // User will need to login separately to access the application
    } catch (error: any) {
      // Handle API errors
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    }
  };

  const logout = async () => {
    try {
      const { clearAuthData } = await import("../utils/tokenUtils");
      clearAuthData();
      setUser(null);
    } catch (error) {
      // Fallback if import fails
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
