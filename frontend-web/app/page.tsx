'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Charger les produits
    fetch('http://127.0.0.1:8000/api/products/items/')
      .then(res => res.json())
      .then(data => setProducts(data));

    // Charger les catégories
    fetch('http://127.0.0.1:8000/api/products/categories/')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Filtrer les produits localement pour plus de rapidité
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p: any) => p.category?.name === selectedCategory);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Barre de Filtres */}
        <div className="flex justify-center gap-8 mb-16 overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`uppercase tracking-[0.2em] text-xs pb-2 transition-all ${selectedCategory === 'All' ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]' : 'text-gray-400'}`}
          >
            Tous les Parfums
          </button>
          {categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`uppercase tracking-[0.2em] text-xs pb-2 transition-all ${selectedCategory === cat.name ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]' : 'text-gray-400'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grille de Produits Animée */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <AnimatePresence>
            {filteredProducts.map((product: any) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={product.id}
                className="group cursor-pointer"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-[4/5] bg-gray-100 mb-6 overflow-hidden relative">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 uppercase tracking-widest text-xs">
                        {product.brand?.name}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                  <p className="text-[#D4AF37] font-bold mb-4">{product.price} €</p>
                  <button className="btn-gold w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Découvrir
                  </button>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
