import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "manager";
  avatar?: string;
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
    // Check if user is logged in on app start
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock users for demo
  const mockUsers: (User & { password: string })[] = [
    {
      id: "1",
      email: "admin@example.com",
      password: "admin123",
      name: "Admin User",
      role: "admin",
      avatar: "/images/user/user-01.png",
    },
    {
      id: "2",
      email: "user@example.com",
      password: "user123",
      name: "Regular User",
      role: "user",
      avatar: "/images/user/user-02.png",
    },
    {
      id: "3",
      email: "manager@example.com",
      password: "manager123",
      name: "Manager User",
      role: "manager",
      avatar: "/images/user/user-03.png",
    },
  ];

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const { password: _, ...userWithoutPassword } = user;
      const token = `mock-token-${user.id}`;

      // Save token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      setUser(userWithoutPassword);
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Mock API call - simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Validate password length
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: "user",
        avatar: "/images/user/user-01.png",
      };

      // Add to mock users array (in production, this would be saved to database)
      mockUsers.push({ ...newUser, password });

      const token = `mock-token-${newUser.id}`;

      // Save token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(newUser));

      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
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
