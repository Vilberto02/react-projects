import React from "react";
import { useFocusEffect } from "expo-router";
import { Product } from "../../src/models/Product";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CategoryChip from "../../src/components/CategoryChip";
import ProductCard from "../../src/components/ProductCard";
import { useCart } from "../../src/viewmodels/useCart";
import { useProducts } from "../../src/viewmodels/useProducts";
const CATEGORIES = [
  "todos",
  "superfoods",
  "aceites",
  "capsulas",
  "infusiones",
  "miel",
];
export default function HomeScreen() {
  // Obtener datos del ViewModel (NO del servicio)
  const {
    products,
    loading,
    error,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    search,
    refresh,
  } = useProducts();
  const { addItem, refresh: refreshCart } = useCart();

  useFocusEffect(
    React.useCallback(() => {
      refresh();
      refreshCart();
    }, [refresh, refreshCart])
  );
  const handleAddToCart = async (product: Product) => {
    try {
      await addItem(product);
      alert(`${product.name} agregado al carrito`);
    } catch (e: any) {
      alert(e.message);
    }
  };
  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar productos naturales..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => search(searchQuery)}
      />
      {/* Chips de categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={category === cat}
            onPress={() => setCategory(cat)}
          />
        ))}
      </ScrollView>
      {/* Lista de productos */}
      {loading ? (
        <ActivityIndicator size="large" color="#148F77" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onAddToCart={() => handleAddToCart(item)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 12 },
  searchBar: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  categories: { marginBottom: 10, maxHeight: 44 },
  error: { color: "#E74C3C", textAlign: "center", marginTop: 40, fontSize: 16 },
});
