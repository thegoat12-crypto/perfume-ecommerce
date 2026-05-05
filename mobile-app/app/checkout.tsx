import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useCart } from './context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function CheckoutScreen() {
    const { cart, cartCount } = useCart();
    const { token } = useAuth();
    const router = useRouter();

    const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    const confirmOrder = async () => {
        if (!token) {
            Alert.alert("Connexion requise", "Veuillez vous connecter pour commander", [
                { text: "Se connecter", onPress: () => router.push('/login') }
            ]);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cart.map((item: any) => ({ product: item.id, quantity: item.quantity })),
                    total_price: total
                })
            });

            if (response.ok) {
                Alert.alert("Succès", "Votre commande a été enregistrée !");
                // Vider le panier ici si nécessaire
                router.replace('/(tabs)');
            }
        } catch (error) {
            Alert.alert("Erreur", "Impossible de valider la commande.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>RÉCAPITULATIF</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>Articles : {cartCount}</Text>
                <Text style={styles.total}>Total : {total.toFixed(2)} €</Text>

                <View style={styles.paymentInfo}>
                    <Text style={styles.paymentTitle}>Mode de paiement</Text>
                    <Text style={styles.paymentDetail}>Carte Bancaire (Simulé)</Text>
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
                    <Text style={styles.confirmButtonText}>CONFIRMER LA COMMANDE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { padding: 40, backgroundColor: '#1A1A1A' },
    title: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 4, textAlign: 'center' },
    content: { padding: 30 },
    label: { fontSize: 16, color: '#666', marginBottom: 10 },
    total: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 40 },
    paymentInfo: { padding: 20, backgroundColor: '#f9f9f9', marginBottom: 40 },
    paymentTitle: { fontWeight: 'bold', marginBottom: 5 },
    paymentDetail: { color: '#666' },
    confirmButton: { backgroundColor: '#1A1A1A', padding: 20, alignItems: 'center' },
    confirmButtonText: { color: '#D4AF37', fontWeight: 'bold', letterSpacing: 2 }
});
