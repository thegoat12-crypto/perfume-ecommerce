'use client';
import { useState } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    return (
        <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                {/* Menu Mobile Button (Visible uniquement sur mobile) */}
                <div className="flex-1 md:hidden">
                    <Menu className="w-6 h-6 cursor-pointer" onClick={() => setIsMenuOpen(true)} />
                </div>

                {/* Search (Masqué sur mobile pour laisser de la place) */}
                <div className="hidden md:flex flex-1 items-center gap-8">
                    <Search className="w-5 h-5 cursor-pointer hover:text-[#D4AF37]" />
                </div>


                <Link href="/">
                    <h1 className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase cursor-pointer">Manus Scents</h1>
                </Link>

                <nav className="hidden md:flex gap-8 ml-12">
                    <Link href="/quiz" className="text-[10px] uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">
                        Diagnostic Olfactif
                    </Link>
                </nav>

                <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
                    {/* Auth Section (Masquée sur mobile, sera dans le menu burger) */}
                    <div className="hidden md:block">
                        {user ? (
                            <button onClick={logout} className="text-[10px] uppercase tracking-widest font-bold hover:text-[#D4AF37]">Déconnexion</button>
                        ) : (
                            <Link href="/login"><User className="w-5 h-5 hover:text-[#D4AF37]" /></Link>
                        )}
                    </div>

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
            </div>

            {/* Overlay Menu Mobile */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
                    >
                        <div className="flex justify-end mb-12">
                            <X className="w-8 h-8 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
                        </div>

                        <nav className="flex flex-col gap-8 text-2xl font-serif uppercase tracking-widest">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                            <Link href="/cart" onClick={() => setIsMenuOpen(false)}>Mon Panier ({cartCount})</Link>
                            {user ? (
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left uppercase text-[#D4AF37]">Déconnexion</button>
                            ) : (
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                            )}
                        </nav>

                        <div className="mt-auto border-t border-gray-100 pt-8 text-[10px] uppercase tracking-[0.3em] text-gray-400">
                            Manus Scents — Haute Parfumerie
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
