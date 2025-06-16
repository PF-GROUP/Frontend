"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IUser } from "../interface/User";

// Función para leer cookies
function getCookie(name: string) {
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
    SaveUserData: (data: { user: IUser, token: string }) => void;
    ResetUserData: () => void;
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

    const SaveUserData = (data: { user: IUser, token: string }) => {
        setUser(data.user);
        setIsAuth(true);
        setToken(data.token);
        // No seteamos cookies aquí porque el backend ya lo hace
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