// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (access_token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedToken = localStorage.getItem("bearerToken");
    if (storedToken) {
      try {
        const { exp } = jwtDecode(storedToken);
        return exp ? exp > Math.floor(Date.now() / 1000) : false;
      } catch (error) {
        console.error("Error decoding the token:", error);
      }
    }
    return false; // Token is expired or couldn't be decoded
  });

  const login = (access_token: string) => {
    localStorage.setItem("bearerToken", access_token);
    setIsLoggedIn(true);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("bearerToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
