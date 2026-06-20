// src/hooks/useCart.tsx
import { useCallback, useEffect, useState } from "react";
import { Alert, ToastAndroid, Platform } from "react-native";
import { CartAPI } from "../services/apiService";
import { CartItem, Product } from "../types/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar carrito desde el servidor
  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CartAPI.get();
      if (res.data) {
        setItems(res.data.items || []);
        setTotal(res.data.total || 0);
        setCount(res.data.count || 0);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Agregar producto al carrito
  const addItem = useCallback(
    async (product: Product) => {
      try {
        await CartAPI.addItem({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
        await loadCart(); // Recargar para sincronizar
        if (Platform.OS === "android") {
          ToastAndroid.show(`${product.name} fue añadido a tu carrito`, ToastAndroid.SHORT);
        } else {
          Alert.alert("Agregado al carrito", `${product.name} fue añadido a tu carrito`);
        }
      } catch (err: any) {
        if (err.message.includes("Token") || err.message.includes("401")) {
          Alert.alert("Inicia sesión", "Debes iniciar sesión para agregar productos al carrito.");
        } else {
          setError(err.message);
        }
        throw err;
      }
    },
    [loadCart],
  );

  // Actualizar cantidad
  const updateQuantity = useCallback(
    async (productId: string, qty: number) => {
      try {
        await CartAPI.updateQuantity(productId, qty);
        await loadCart();
      } catch (err: any) {
        setError(err.message);
      }
    },
    [loadCart],
  );

  // Eliminar producto
  const removeItem = useCallback(
    async (productId: string) => {
      try {
        await CartAPI.removeItem(productId);
        await loadCart();
      } catch (err: any) {
        setError(err.message);
      }
    },
    [loadCart],
  );

  // Vaciar carrito
  const clearCart = useCallback(async () => {
    try {
      await CartAPI.clear();
      setItems([]);
      setTotal(0);
      setCount(0);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  return {
    items,
    total,
    count,
    loading,
    error,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    loadCart,
  };
}
