import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
    const { cart, cartCount } = useCart();

    const renderItem = ({ item }: any) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} € x {item.quantity}</Text>
            </View>
        </View>
    );

    const totalAmount = cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Votre Panier</Text>
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
                </View>
            ) : (
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            )}

            {cart.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.totalText}>Total: {totalAmount.toFixed(2)} €</Text>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Passer la commande</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { paddingTop: 50, paddingBottom: 20, alignItems: 'center', backgroundColor: '#1A1A1A' },
    title: { fontSize: 22, color: '#fff', fontWeight: 'bold', letterSpacing: 6 },
    emptyCartContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyCartText: { fontSize: 18, color: '#666' },
    list: { padding: 10 },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eee',
    },
    itemImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 15,
        color: '#1A1A1A',
    },
    checkoutButton: {
        backgroundColor: '#D4AF37',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});
