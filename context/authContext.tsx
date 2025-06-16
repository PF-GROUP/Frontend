"use client"

import { createContext, useEffect } from "react"
import { useContext, ReactNode, useState } from "react";
import { IUser } from "../interface/User";


// function setCookie(name: string, value: string, days = 7) {
//     const expires = new Date(Date.now() + days * 864e5).toUTCString();
//     document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
// }

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
    isAuth: boolean | null;
    token?: string | null;
    // SaveUserData: (data:{ user: IUser, token: string }) => void;
    ResetUserData: () => void;
}

const AuthContext  = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<AuthContextType["user"]>();
    const [token, setToken] = useState<string | null>(null);
    const [isAuth, setIsAuth] = useState<AuthContextType["isAuth"]>(null);

    useEffect(() => {
        const storedToken = getCookie('token');
        const storedUser = getCookie('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [])

    // const SaveUserData = (data: { user: IUser, token: string }) => {
    //     setUser(data.user);
    //     setIsAuth(true);
    //     setToken(data.token);

    //     setCookie('token', data.token);
    //     setCookie('user', JSON.stringify(data.user));
    // }

    const ResetUserData = () => {
        setUser(null);
        setIsAuth(false);
        setToken(null);
        deleteCookie('token');
        deleteCookie('user');
    }

    return (
        <AuthContext.Provider value={{
            user: user || null,
            isAuth,
            // SaveUserData,
            ResetUserData,
            token,
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext error a AuthProvider");
    }

    return context;
};