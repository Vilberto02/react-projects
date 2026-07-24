// src/hooks/useCart.tsx
// ============================================
// Hook de Carrito - Firestore Subcollection
// Sesión 11: Carrito por usuario con Firebase
// ============================================

import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { CartService } from '../services/firestoreService';

export function useCart(userId?: string) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Total calculado
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Cargar carrito del usuario desde Firestore
  const loadCart = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await CartService.get(userId);
      setItems(data.items);
    } catch (err) {
      console.error('Error cargando carrito:', err);
      setError('No se pudo cargar el carrito');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Agregar producto al carrito
  const addItem = useCallback(
    async (product: any) => {
      if (!userId) return;
      try {
        await CartService.addItem(userId, product);
        await loadCart(); // Recargar desde Firestore
      } catch (err) {
        console.error('Error agregando al carrito:', err);
        setError('No se pudo agregar el producto');
      }
    },
    [userId, loadCart]
  );

  // Actualizar cantidad
  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (!userId) return;
      try {
        if (quantity <= 0) {
          await CartService.removeItem(userId, itemId);
        } else {
          await CartService.updateQuantity(userId, itemId, quantity);
        }
        await loadCart();
      } catch (err) {
        console.error('Error actualizando cantidad:', err);
      }
    },
    [userId, loadCart]
  );

  // Eliminar item del carrito
  const removeItem = useCallback(
    async (itemId: string) => {
      if (!userId) return;
      try {
        await CartService.removeItem(userId, itemId);
        await loadCart();
      } catch (err) {
        console.error('Error eliminando item:', err);
      }
    },
    [userId, loadCart]
  );

  // Vaciar carrito completo
  const clearCart = useCallback(async () => {
    if (!userId) return;
    try {
      await CartService.clear(userId);
      setItems([]);
    } catch (err) {
      console.error('Error vaciando carrito:', err);
    }
  }, [userId]);

  // Cargar carrito cuando cambia el userId o recupera el foco
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        loadCart();
      } else {
        setItems([]);
      }
    }, [userId, loadCart])
  );

  return {
    items,
    total,
    itemCount,
    loading,
    error,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    loadCart,
  };
}
