'use client'; // N'oubliez pas d'ajouter ceci en haut !

import { ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Importez le hook
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';


export default function Header() {
    const { cartCount } = useCart(); // Récupérez le compteur ici
    const { user, logout } = useAuth();

    return (
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex-1 flex items-center gap-8">
                    <Search className="w-5 h-5 cursor-pointer hover:text-[#D4AF37]" />
                </div>

                <Link href="/">
                    <h1 className="text-3xl font-serif tracking-[0.2em] uppercase cursor-pointer">Manus Scents</h1>
                </Link>

                {user ? (
                    <div className="flex-1 flex items-center justify-end gap-6">
                        <Link href="/cart">
                            <div className="relative cursor-pointer group">
                                <ShoppingBag className="w-5 h-5 group-hover:text-[#D4AF37]" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">Connecté</span>
                            <button onClick={logout} className="text-[10px] uppercase tracking-widest font-bold hover:text-[#D4AF37]">Déconnexion</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-end gap-6">
                        <User className="w-5 h-5 cursor-pointer hover:text-[#D4AF37]" />
                        <Link href="/cart">
                            <div className="relative cursor-pointer group">
                                <ShoppingBag className="w-5 h-5 group-hover:text-[#D4AF37]" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
