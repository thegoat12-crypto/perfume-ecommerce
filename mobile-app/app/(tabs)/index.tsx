import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const API_URL = 'http://127.0.0.1:8000/api/products/items/';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Erreur API Mobile:", error));
  }, []);

  const renderItem = ({ item, index }: any) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/product/${item.id}`)}
      >
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
          ) : (
            <Text style={styles.placeholderText}>{item.brand?.name}</Text>
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.brand}>{item.brand?.name}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price} €</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MANUS SCENTS</Text>
        <Text style={styles.subtitle}>Haute Parfumerie</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingTop: 50, paddingBottom: 20, alignItems: 'center', backgroundColor: '#1A1A1A' },
  title: { fontSize: 22, color: '#fff', fontWeight: 'bold', letterSpacing: 6 },
  subtitle: { fontSize: 8, color: '#D4AF37', marginTop: 5, letterSpacing: 3, textTransform: 'uppercase' },
  list: { padding: 10 },
  card: { flex: 1, margin: 8, backgroundColor: '#fff', borderRadius: 2, borderWidth: 1, borderColor: '#f0f0f0' },
  imageContainer: { aspectRatio: 0.8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  image: { width: '90%', height: '90%' },
  info: { padding: 12 },
  placeholderText: { color: '#ccc', fontSize: 10, textTransform: 'uppercase' },
  brand: { fontSize: 9, color: '#D4AF37', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  name: { fontSize: 14, fontWeight: '500', marginTop: 4, color: '#1A1A1A' },
  price: { fontSize: 13, color: '#333', marginTop: 6, fontWeight: 'bold' },
});
