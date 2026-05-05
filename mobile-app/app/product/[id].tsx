import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../context/CartContext';

const API_URL = 'http://127.0.0.1:8000/api/products/items/';

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}${id}/`)
                .then(res => res.json())
                .then(data => setProduct(data))
                .catch(err => console.error(err));
        }
    }, [id]);

    if (!product) return <ActivityIndicator size="large" color="#D4AF37" style={{ flex: 1 }} />;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Bouton Retour */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backText}>← Retour</Text>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {product.image && <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />}
                </View>

                <View style={styles.content}>
                    <Text style={styles.brand}>{product.brand?.name}</Text>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>{product.price} €</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pyramide Olfactive</Text>
                        <View style={styles.notesContainer}>
                            {product.notes?.map((note: any) => (
                                <View key={note.id} style={styles.noteBadge}>
                                    <Text style={styles.noteText}>{note.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() => {
                            addToCart(product);
                            alert("Produit ajouté au panier !"); // Une petite notification pour l'utilisateur
                        }}
                    >
                        <Text style={styles.buyButtonText}>Ajouter au panier</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backButton: { padding: 20 },
    backText: { fontSize: 12, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 2 },
    imageContainer: { height: 350, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center' },
    image: { width: '80%', height: '80%' },
    content: { padding: 25 },
    brand: { color: '#D4AF37', fontWeight: 'bold', letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 10 },
    name: { fontSize: 28, color: '#1A1A1A', marginBottom: 15, fontWeight: '600' },
    price: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 30 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: '#aaa', fontWeight: 'bold', marginBottom: 15 },
    notesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    noteBadge: { paddingHorizontal: 15, paddingVertical: 8, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fafafa' },
    noteText: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: '#666' },
    description: { fontSize: 15, color: '#666', lineHeight: 24 },
    buyButton: { backgroundColor: '#D4AF37', padding: 20, alignItems: 'center', marginTop: 10, marginBottom: 40 },
    buyButtonText: { color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }
});
