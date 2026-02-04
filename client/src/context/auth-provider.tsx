import { useState, useEffect } from "react";
import { apiFetch } from "../api/api-config";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { User } from "../types/type";
import AuthContext from "./auth-context";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await apiFetch("/auth/profile");
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error verifying session", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
      console.error("Error logging out", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        setUser,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
