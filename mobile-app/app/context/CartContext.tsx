import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<any[]>([]);

    // Charger le panier au démarrage (équivalent du LocalStorage sur mobile)
    useEffect(() => {
        AsyncStorage.getItem('manus-scents-cart').then((savedCart: string | null) => {
            if (savedCart) setCart(JSON.parse(savedCart));
        });
    }, []);

    // Sauvegarder dès que le panier change
    useEffect(() => {
        AsyncStorage.setItem('manus-scents-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: any) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
