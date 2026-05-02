'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            alert("Compte créé ! Connectez-vous maintenant.");
            router.push('/login');
        } else {
            const data = await response.json();
            alert(data.error || "Erreur lors de l'inscription");
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-md mx-auto mt-20 p-8 border border-gray-100 shadow-sm">
                <h1 className="text-3xl font-serif mb-8 text-center uppercase tracking-widest">Créer un compte</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="text" placeholder="Nom d'utilisateur" className="w-full p-3 border border-gray-200 outline-none focus:border-[#D4AF37]" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                    <input type="email" placeholder="Email" className="w-full p-3 border border-gray-200 outline-none focus:border-[#D4AF37]" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <input type="password" placeholder="Mot de passe" className="w-full p-3 border border-gray-200 outline-none focus:border-[#D4AF37]" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <button type="submit" className="btn-gold w-full py-4">S'inscrire</button>
                </form>
                <p className="mt-6 text-center text-xs text-gray-400">
                    Déjà un compte ? <Link href="/login" className="text-[#D4AF37] font-bold">Se connecter</Link>
                </p>
            </div>
        </main>
    );
}
