'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/api/products/items/${id}/`)
                .then(res => res.json())
                .then(data => setProduct(data))
                .catch(err => console.error("Erreur:", err));
        }
    }, [id]);

    if (!product) return <div className="min-h-screen flex items-center justify-center font-serif uppercase tracking-widest text-gray-400">Chargement...</div>;

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Image du produit avec animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="aspect-square relative bg-gray-50 overflow-hidden"
                    >
                        {product.image ? (
                            <Image src={product.image} alt={product.name} fill className="object-contain p-8" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-300 uppercase tracking-widest">{product.brand?.name}</div>
                        )}
                    </motion.div>

                    {/* Détails du produit */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm mb-4 font-bold">{product.brand?.name}</p>
                        <h1 className="text-5xl font-serif mb-6 leading-tight">{product.name}</h1>
                        <p className="text-2xl text-gray-800 mb-8">{product.price} €</p>

                        {/* Pyramide Olfactive */}
                        <div className="mb-10">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 font-bold">Pyramide Olfactive</p>
                            <div className="flex flex-wrap gap-3">
                                {product.notes?.map((note: any) => (
                                    <span key={note.id} className="px-5 py-2 border border-gray-100 text-[10px] uppercase tracking-widest bg-gray-50 text-gray-600">
                                        {note.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-600 mb-10 leading-relaxed">
                            <p>{product.description}</p>
                            {product.stock <= 5 && product.stock > 0 && (
                                <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold mt-2">Plus que {product.stock} exemplaires disponibles !</p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock <= 0}
                                className={`btn-gold flex-1 py-4 text-base ${product.stock <= 0 ? 'bg-gray-300 cursor-not-allowed' : ''}`}
                            >
                                {product.stock > 0 ? "Ajouter au panier" : "Rupture de stock"}
                            </button>
                            <button className="border border-gray-200 px-6 py-4 hover:bg-gray-50 transition-colors">♡</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
