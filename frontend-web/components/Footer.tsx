import { Globe } from 'lucide-react';
import Link from 'next/link';

const Instagram = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const Twitter = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] text-white py-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Colonne 1 : La Marque */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-serif tracking-[0.2em] uppercase">Manus Scents</h3>
                    <p className="text-gray-400 text-xs leading-relaxed uppercase tracking-widest">
                        L'excellence de la haute parfumerie,
                        conçue pour ceux qui cherchent
                        l'exceptionnel.
                    </p>
                </div>

                {/* Colonne 2 : Boutique */}
                <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37]">Boutique</h4>
                    <ul className="text-gray-400 text-xs space-y-3 uppercase tracking-widest">
                        <li><Link href="/" className="hover:text-white transition-colors">Tous les parfums</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Nouveautés</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Collections</Link></li>
                    </ul>
                </div>

                {/* Colonne 3 : Aide */}
                <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37]">Aide</h4>
                    <ul className="text-gray-400 text-xs space-y-3 uppercase tracking-widest">
                        <li><Link href="/" className="hover:text-white transition-colors">Livraison</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Retours</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Colonne 4 : Réseaux Sociaux */}
                <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37]">Suivez-nous</h4>
                    <div className="flex gap-6">
                        <Instagram className="w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-colors" />
                        <Twitter className="w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-colors" />
                        <Globe className="w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-colors" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-gray-800 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em]">
                    © 2026 Manus Scents — Tous droits réservés
                </p>
            </div>
        </footer>
    );
}
