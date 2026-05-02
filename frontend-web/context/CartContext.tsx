'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<any[]>([]);

    const removeFromCart = (productId: number) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === productId);
            if (exists?.quantity === 1) {
                return prev.filter(item => item.id !== productId);
            }
            return prev.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    // 1. Charger le panier au démarrage
    useEffect(() => {
        const savedCart = localStorage.getItem('manus-scents-cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    // 2. Sauvegarder dès que le panier change
    useEffect(() => {
        localStorage.setItem('manus-scents-cart', JSON.stringify(cart));
    }, [cart]);

    // 3. CALCUL DU COMPTEUR (C'est ici que ça change !)
    // On calcule la somme de toutes les quantités
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('manus-scents-cart');
    };

    return (
        // On passe le nouveau cartCount ici
        <CartContext.Provider value={{ cart, addToCart, cartCount, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
