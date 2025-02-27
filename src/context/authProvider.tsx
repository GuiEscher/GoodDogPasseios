import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../config/firebase"; 
import { User } from "firebase/auth";
import "./auth.css";
import Header from '../components/header';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const excludedRoutes = ["/", "/register", "/login"];
  const currentPath = window.location.pathname;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (!firebaseUser && !excludedRoutes.includes(currentPath)) {
        window.location.href = "/login"; // Redireciona para login apenas se não for uma rota permitida
      }
    });

    return () => unsubscribe();
  }, [currentPath]); 


  if (loading && !excludedRoutes.includes(currentPath)) {
    return (
      <div>
        <Header />
        <div className="walk-content">Carregando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);
