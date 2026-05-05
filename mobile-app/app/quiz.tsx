import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const QUESTIONS = [
    { id: 1, text: "Quelle ambiance préférez-vous ?", options: ["Fraîcheur Matinale", "Soirée Intense", "Jardin Floral", "Boisé Mystérieux"] },
    { id: 2, text: "Quelle note vous attire le plus ?", options: ["Agrumes", "Vanille", "Musc", "Rose"] },
    { id: 3, text: "Pour quelle occasion ?", options: ["Quotidien", "Rendez-vous", "Événement Spécial", "Travail"] },
];

export default function OlfactoryQuiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const router = useRouter();

    const handleAnswer = (option: string) => {
        const newAnswers = [...answers, option];
        if (step < QUESTIONS.length - 1) {
            setAnswers(newAnswers);
            setStep(step + 1);
        } else {
            // Fin du quiz : redirection vers les résultats (ou accueil filtré)
            router.push({ pathname: "/(tabs)", params: { quizResult: newAnswers.join(',') } });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${((step + 1) / QUESTIONS.length) * 100}%` }]} />
            </View>

            <View style={styles.content}>
                <Text style={styles.questionNumber}>Question {step + 1}/{QUESTIONS.length}</Text>
                <Text style={styles.questionText}>{QUESTIONS[step].text}</Text>

                <View style={styles.optionsContainer}>
                    {QUESTIONS[step].options.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1A1A1A' },
    progressContainer: { height: 2, backgroundColor: '#333', width: '100%' },
    progressBar: { height: '100%', backgroundColor: '#D4AF37' },
    content: { flex: 1, padding: 40, justifyContent: 'center' },
    questionNumber: { color: '#D4AF37', fontSize: 12, letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase' },
    questionText: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
    optionsContainer: { gap: 15 },
    optionButton: { padding: 20, borderWidth: 1, borderColor: '#333', borderRadius: 2, alignItems: 'center' },
    optionText: { color: '#fff', fontSize: 16, letterSpacing: 1 },
});
