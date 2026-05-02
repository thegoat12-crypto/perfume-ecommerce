'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('manus-scents-token');
        if (token) {
            // Ici, on pourrait appeler une API /api/user/me/ pour récupérer les infos du profil
            setUser({ loggedIn: true });
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('manus-scents-token', data.access);
            setUser({ loggedIn: true });
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('manus-scents-token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
