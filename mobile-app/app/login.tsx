import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        const success = await login({ username: email, password }); // Django DRF utilise souvent 'username' par défaut
        if (success) {
            router.replace('/(tabs)');
        } else {
            Alert.alert("Erreur", "Identifiants incorrects");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>CONNEXION</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#666"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>SE CONNECTER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.linkText}>Pas encore de compte ? S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1A1A1A' },
    content: { flex: 1, padding: 40, justifyContent: 'center' },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold', letterSpacing: 4, marginBottom: 40, textAlign: 'center' },
    input: { backgroundColor: '#222', color: '#fff', padding: 15, marginBottom: 20, borderRadius: 2, borderWidth: 1, borderColor: '#333' },
    button: { backgroundColor: '#D4AF37', padding: 18, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontWeight: 'bold', letterSpacing: 2 },
    linkText: { color: '#D4AF37', marginTop: 20, textAlign: 'center', fontSize: 12 }
});
