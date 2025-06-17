"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IUser } from "../interface/User";


export function getCookie(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '');
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

interface AuthContextType {
    user: IUser | null;
    isAuth: boolean;
    token?: string | null;
    SaveUserData: (data: { token: string }) => void;
    ResetUserData: () => void;
}

export const decodeUserCookie = (cookieValue: string) => {
  try {
    const decoded = decodeURIComponent(cookieValue);
    
    const jsonString = decoded.startsWith('j:') ? decoded.slice(2) : decoded;
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("No se pudo decodificar la cookie:", e);
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const storedToken = getCookie('token');
        const storedUser = getCookie('user');
        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuth(true);
            } catch {
                setUser(null);
                setIsAuth(false);
            }
        } else {
            setUser(null);
            setIsAuth(false);
        }
    }, []);

    const SaveUserData = (data: { token: string }) => {
        setIsAuth(true);
        setToken(data.token);
    };

    const ResetUserData = () => {
        setUser(null);
        setIsAuth(false);
        setToken(null);
        deleteCookie('token');
        deleteCookie('user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            SaveUserData,
            ResetUserData,
            token,
        }}>
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