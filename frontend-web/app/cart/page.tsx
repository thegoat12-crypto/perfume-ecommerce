'use client';

import Header from '../../components/Header';      // On remonte de 2 niveaux (../../)
import { useCart } from '../../context/CartContext'; // On remonte de 2 niveaux (../../)
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();

    const [customer, setCustomer] = useState({ name: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        if (!customer.name || !customer.email) {
            alert("Veuillez remplir votre nom et email.");
            return;
        }

        setIsSubmitting(true);

        const orderData = {
            customer_name: customer.name,
            customer_email: customer.email,
            total_price: total,
            items: cart.map((item: any) => ({
                product: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/orders/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                clearCart(); // On vide le panier après l'achat
                alert("Merci pour votre commande !");
                router.push('/'); // Retour à l'accueil
            }
        } catch (error) {
            console.error("Erreur lors de la commande:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calcul du total
    const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-white">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                    <h2 className="text-3xl font-serif mb-8 text-gray-400 uppercase tracking-widest">Votre panier est vide</h2>
                    <Link href="/">
                        <button className="btn-gold px-12 py-4">Explorer la collection</button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-serif mb-12 text-center uppercase tracking-[0.2em]">Votre Panier</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Liste des articles */}
                    <div className="lg:col-span-2 space-y-8">
                        {cart.map((item: any) => (
                            <motion.div
                                layout
                                key={item.id}
                                className="flex gap-6 pb-8 border-b border-gray-100 items-center"
                            >
                                <div className="w-24 h-32 relative bg-gray-50">
                                    {item.image && <Image src={item.image} alt={item.name} fill className="object-contain p-2" />}
                                </div>

                                <div className="flex-1">
                                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1">{item.brand?.name}</p>
                                    <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">{item.price} €</p>
                                </div>

                                <div className="flex items-center gap-4 border border-gray-200 px-3 py-1">
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-black"><Minus size={14} /></button>
                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => addToCart(item)} className="text-gray-400 hover:text-black"><Plus size={14} /></button>
                                </div>

                                <div className="text-right min-w-[80px]">
                                    <p className="font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Résumé de la commande */}
                    <div className="bg-gray-50 p-8 h-fit sticky top-32">
                        <h2 className="text-xl font-serif mb-6 uppercase tracking-widest">Résumé</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Sous-total</span>
                                <span>{total.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Livraison</span>
                                <span className="text-green-600 uppercase text-[10px] font-bold tracking-widest">Offerte</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{total.toFixed(2)} €</span>
                            </div>
                        </div>
                        <div className="space-y-4 mb-8">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400">Informations de livraison</h3>
                            <input
                                type="text"
                                placeholder="Votre Nom"
                                className="w-full p-3 border border-gray-200 text-sm focus:border-[#D4AF37] outline-none"
                                value={customer.name}
                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Votre Email"
                                className="w-full p-3 border border-gray-200 text-sm focus:border-[#D4AF37] outline-none"
                                value={customer.email}
                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                            />
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isSubmitting}
                            className="btn-gold w-full py-4 text-sm disabled:bg-gray-300"
                        >
                            {isSubmitting ? "Traitement..." : "Confirmer la commande"}
                        </button>
                        <p className="text-[10px] text-center text-gray-400 mt-6 uppercase tracking-widest">Paiement sécurisé par SSL</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
