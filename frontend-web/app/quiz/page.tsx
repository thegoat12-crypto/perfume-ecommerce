'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const questions = [
    {
        id: 1,
        question: "Quel univers vous attire le plus ?",
        options: [
            { label: "Fraîcheur & Nature", value: "Floral" },
            { label: "Force & Caractère", value: "Boisé" },
            { label: "Mystère & Orient", value: "Oriental" }
        ]
    },
    {
        id: 2,
        question: "Pour quelle occasion cherchez-vous ce parfum ?",
        options: [
            { label: "Quotidien & Travail", value: "light" },
            { label: "Soirée & Événement", value: "intense" }
        ]
    }
];

export default function QuizPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Fin du quiz : on va chercher les recommandations
            fetch(`http://127.0.0.1:8000/api/products/items/`)
                .then(res => res.json())
                .then(products => {
                    // Logique de recommandation simple basée sur la catégorie
                    const filtered = products.filter((p: any) => p.category?.name === newAnswers[0]);
                    setRecommendations(filtered);
                    setStep(questions.length); // Étape de résultat
                });
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-20">
                <AnimatePresence mode="wait">
                    {step < questions.length ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs mb-4">Question {step + 1}/{questions.length}</p>
                            <h2 className="text-4xl font-serif mb-12">{questions[step].question}</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {questions[step].options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="border border-gray-200 py-6 hover:border-[#D4AF37] hover:bg-gray-50 transition-all uppercase tracking-widest text-sm"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center"
                        >
                            <h2 className="text-4xl font-serif mb-4">Votre Signature Olfactive</h2>
                            <p className="text-gray-400 uppercase tracking-widest text-xs mb-12">Basé sur vos préférences</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {recommendations.length > 0 ? recommendations.map((product) => (
                                    <Link href={`/product/${product.id}`} key={product.id} className="group">
                                        <div className="aspect-[4/5] bg-gray-50 relative mb-4">
                                            {product.image && <Image src={product.image} alt={product.name} fill className="object-contain p-4" />}
                                        </div>
                                        <h3 className="font-serif text-xl">{product.name}</h3>
                                        <p className="text-[#D4AF37] font-bold">{product.price} €</p>
                                    </Link>
                                )) : (
                                    <p className="col-span-2 text-gray-400">Nous n'avons pas trouvé de correspondance exacte, mais découvrez notre collection complète.</p>
                                )}
                            </div>

                            <button onClick={() => { setStep(0); setAnswers([]); }} className="mt-12 text-xs uppercase tracking-widest border-b border-black pb-1">Recommencer le quiz</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
