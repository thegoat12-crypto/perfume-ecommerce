import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        AsyncStorage.getItem('userToken').then(t => setToken(t));
    }, []);

    const login = async (credentials: any) => {
        // Appel API Django /api/token/
        const res = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await res.json();
        if (data.access) {
            await AsyncStorage.setItem('userToken', data.access);
            setToken(data.access);
            return true;
        }
        return false;
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
