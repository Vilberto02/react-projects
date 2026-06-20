// src/hooks/useOrders.tsx
import { useCallback, useState } from "react";
import { OrderAPI } from "../services/apiService";
import { Order } from "../types/types";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar pedidos del usuario
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await OrderAPI.getAll();
      setOrders(res.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo pedido
  const createOrder = useCallback(async (orderData: any) => {
    setLoading(true);
    try {
      const res = await OrderAPI.create(orderData);
      if (res.data) {
        setOrders((prev) => [res.data as Order, ...prev]);
        return res.data;
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancelar pedido
  const cancelOrder = useCallback(async (orderId: string) => {
    try {
      const res = await OrderAPI.cancel(orderId);
      if (res.data) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? (res.data as Order) : o)));
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  return { orders, loading, error, loadOrders, createOrder, cancelOrder };
}
