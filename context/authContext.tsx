"use client"
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IUser } from "../interface/User";
import {jwtDecode} from "jwt-decode";
export  function getCookie(name: string) {
console.log(document.cookie)
return  Cookies.get(name) || null;
}


interface AuthContextType {
    user: IUser | null;
    isAuth: boolean;
    token?: string | null;
    SaveUserData: (data: { token: string }) => void;
    ResetUserData: () => void;
}

export const decodeUserCookie = (token: string) => {
  try {
    console.log("Decodificando JWT:", token);
    console.log("JWT Decode:", jwtDecode(token));
    return jwtDecode(token);
  } catch (e) {
    console.error("JWT inválido", e);
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = getCookie("token");
      if (storedToken) {
        try {
            setToken(storedToken);
          setUser(decodeUserCookie(storedToken) as IUser);
          setIsAuth(true);
        } catch (e) {
          console.error("Error decoding cookies:", e);
          ResetUserData();
        }
      } else {
        ResetUserData();
      }
    };


    const timer = setTimeout(checkAuth, 50);
    return () => clearTimeout(timer);
  }, []);

  const SaveUserData = (data: { token: string}) => {

    setToken(data.token || null);
    const user = decodeUserCookie(data.token || "")
    if (user) {
      setUser(user as IUser);
    } else {
      console.warn("No se pudo decodificar el usuario desde la cookie");
      setUser(null);
    }
    setIsAuth(true);
  };

  const ResetUserData = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setToken(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, token, SaveUserData, ResetUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
    }
    return context;
};