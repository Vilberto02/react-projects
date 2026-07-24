// src/hooks/useOrders.tsx
// ============================================
// Hook de Pedidos - Firestore Service
// Sesión 11: Gestión de órdenes con Firebase
// ============================================

import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { OrderService } from '../services/firestoreService';

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar pedidos del usuario
  const loadOrders = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await OrderService.getByUser(userId);
      setOrders(data);
    } catch (err) {
      console.error('Error cargando pedidos:', err);
      setError('No se pudieron cargar los pedidos');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Crear nuevo pedido
  const createOrder = useCallback(
    async (orderData: any) => {
      if (!userId) return null;
      setLoading(true);
      setError(null);
      try {
        const order = await OrderService.create(userId, orderData);
        await loadOrders(); // Recargar lista
        return order;
      } catch (err) {
        console.error('Error creando pedido:', err);
        setError('No se pudo crear el pedido');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [userId, loadOrders]
  );

  // Cancelar pedido
  const cancelOrder = useCallback(
    async (orderId: string) => {
      setLoading(true);
      try {
        await OrderService.cancel(orderId);
        await loadOrders();
      } catch (err) {
        console.error('Error cancelando pedido:', err);
        setError('No se pudo cancelar el pedido');
      } finally {
        setLoading(false);
      }
    },
    [loadOrders]
  );

  useFocusEffect(
    useCallback(() => {
      if (userId) loadOrders();
      else setOrders([]);
    }, [userId, loadOrders])
  );

  return {
    orders,
    loading,
    error,
    loadOrders,
    createOrder,
    cancelOrder,
  };
}
