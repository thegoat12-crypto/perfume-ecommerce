'use client'; // Indispensable pour utiliser useEffect et useState

import { useEffect, useState } from 'react';
import Header from '../components/Header'; // Chemin relatif plus sûr
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // On appelle notre API Django
    fetch('http://127.0.0.1:8000/api/products/items/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-4">La Collection Signature</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product: any) => (
            <div key={product.id} className="group cursor-pointer">
              {/* --- SECTION IMAGE MODIFIÉE ICI --- */}
              <div className="aspect-[4/5] bg-gray-100 mb-6 overflow-hidden relative">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 uppercase tracking-widest text-xs">
                    {product.brand?.name}
                  </div>
                )}
              </div>
              {/* --- FIN DE LA SECTION IMAGE --- */}

              <h3 className="text-xl font-serif mb-2">{product.name}</h3>
              <p className="text-[#D4AF37] font-bold mb-4">{product.price} €</p>
              <button className="btn-gold w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Découvrir
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
