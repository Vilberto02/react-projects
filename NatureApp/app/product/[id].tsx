import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import ApiService from "../../src/services/apiService";
import { Product } from "../../src/models/Product";
import { useCart } from "../../src/viewmodels/useCart";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    ApiService.getProductById(id as string)
      .then(data => setProduct(Product.fromJSON(data)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#148F77" style={{ marginTop: 50 }} />;
  }

  if (!product) {
    return <Text style={styles.error}>Producto no encontrado.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.getFormattedPrice()}</Text>
        
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <Text style={styles.sectionTitle}>Beneficios</Text>
        {product.benefits.map((b, i) => (
          <Text key={i} style={styles.bullet}>• {b}</Text>
        ))}

        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => {
            addItem(product).then(() => alert('Agregado al carrito'));
          }}
        >
          <Text style={styles.addBtnText}>Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  image: { width: '100%', height: 300 },
  content: { padding: 16 },
  category: { color: '#888', textTransform: 'uppercase', fontSize: 12, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginVertical: 8 },
  price: { fontSize: 22, color: '#148F77', fontWeight: 'bold', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#1A5276' },
  description: { fontSize: 16, color: '#666', lineHeight: 24 },
  bullet: { fontSize: 16, color: '#555', marginLeft: 8, marginTop: 4 },
  addBtn: { backgroundColor: '#148F77', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  addBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  error: { textAlign: 'center', marginTop: 50, color: '#E74C3C', fontSize: 16 }
});
