// app/(tabs)/home.tsx
// ============================================
// Pantalla de Inicio - Lista de Productos
// Sesión 11: Home con Firebase Firestore
// ============================================

import { useRouter } from "expo-router";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import CategoryChips from "../../src/components/CategoryChips";
import ProductCard from "../../src/components/ProductCard";
import { useAuthStore } from "../../src/store/authStore";
import { useCartStore } from "../../src/store/cartStore";
import { useProductStore } from "../../src/store/productStore";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  
  const {
    products,
    categories,
    loading,
    error,
    selectedCategory,
    loadProducts,
    loadCategories,
    filterByCategory,
  } = useProductStore();

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [loadProducts, loadCategories]);

  const handleProductPress = (product: any) => {
    router.push(`/product/${product.id || product._id}` as any);
  };

  const handleAddToCart = async (product: any) => {
    if (!user) {
      router.push("/auth/login" as any);
      return;
    }
    await addItem(user.id || user._id || '', product);
  };

  return (
    <View style={styles.container}>
      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onSelect={filterByCategory}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id || item._id}
        renderItem={({ item }) => {
          const cat = (categories || []).find((c: any) => c.id === item.category);
          return (
            <ProductCard
              product={item}
              categoryName={cat?.name}
              onPress={handleProductPress}
              onAddToCart={handleAddToCart}
            />
          );
        }}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => loadProducts(selectedCategory)}
            colors={["#2d6a4f"]}
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No hay productos disponibles</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  list: { padding: 16 },
  error: {
    color: "#e63946",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#fdecea",
    marginHorizontal: 16,
    borderRadius: 8,
  },
  empty: { alignItems: "center", marginTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: "#888" },
});
