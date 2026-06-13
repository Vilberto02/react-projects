import { useCallback, useState } from "react";
import { Order } from "../models/Order";
import ApiService from "../services/apiService";
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.getOrders();
      setOrders(data.map((o: any) => Order.fromJSON(o)));
    } catch (err) {
      setError("No se pudo cargar el historial");
    } finally {
      setLoading(false);
    }
  }, []);
  return { orders, loading, error, refresh: loadOrders };
}
