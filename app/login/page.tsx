"use client";

import { Button } from "@/components/ui/button";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("No existe el provider para usar la autentificacion");

  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthApp = () => {
  const { login, logout, isAuthenticated } = useAuthContext();

  return (
    <section className="flex justify-center mt-20">
      {isAuthenticated ? (
        <div>
          <h3>Bienvenido</h3>
          <Button onClick={() => logout()}>Cerrar Sesión</Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => login()}>Iniciar Sesión</Button>
        </div>
      )}
    </section>
  );
};

export default function Render() {
  return (
    <AuthProvider>
      <AuthApp />
    </AuthProvider>
  );
}
