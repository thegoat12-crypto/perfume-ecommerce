import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
            {/* Image de fond avec overlay sombre pour le texte */}
            <div className="absolute inset-0 z-0 opacity-60">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A1A]"></div>
                {/* On peut mettre une image ici plus tard, pour l'instant un fond texturé noir */}
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#D4AF37] uppercase tracking-[0.5em] text-sm mb-6"
                >
                    L'Essence de l'Élégance
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight"
                >
                    Découvrez Votre
                    Signature Olfactive
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <button className="btn-gold px-10 py-4 text-base">
                        Explorer la Collection
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
