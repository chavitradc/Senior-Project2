"use client"
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};
