'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            router.push('/');
        } else {
            alert("Identifiants incorrects");
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-md mx-auto mt-20 p-8 border border-gray-100 shadow-sm">
                <h1 className="text-3xl font-serif mb-8 text-center uppercase tracking-widest">Connexion</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Nom d'utilisateur</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-200 outline-none focus:border-[#D4AF37]"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Mot de passe</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-200 outline-none focus:border-[#D4AF37]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-gold w-full py-4">Se connecter</button>
                </form>
            </div>
        </main>
    );
}
