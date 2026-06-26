// src/store/orderStore.ts
import { create } from 'zustand';
import { OrderService } from '../services/firestoreService';

interface OrderState {
  orders: any[];
  loading: boolean;
  error: string | null;
  loadOrders: (userId: string) => Promise<void>;
  createOrder: (userId: string, orderData: any) => Promise<any>;
  cancelOrder: (userId: string, orderId: string) => Promise<void>;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  loadOrders: async (userId: string) => {
    if (!userId) return;
    set({ loading: true, error: null });
    try {
      const data = await OrderService.getByUser(userId);
      set({ orders: data, loading: false });
    } catch (err) {
      set({ error: 'No se pudieron cargar los pedidos', loading: false });
    }
  },

  createOrder: async (userId: string, orderData: any) => {
    if (!userId) return null;
    set({ loading: true, error: null });
    try {
      const order = await OrderService.create(userId, orderData);
      await get().loadOrders(userId);
      return order;
    } catch (err) {
      set({ error: 'No se pudo crear el pedido', loading: false });
      return null;
    }
  },

  cancelOrder: async (userId: string, orderId: string) => {
    if (!userId) return;
    set({ loading: true, error: null });
    try {
      await OrderService.cancel(orderId);
      await get().loadOrders(userId);
    } catch (err) {
      set({ error: 'No se pudo cancelar el pedido', loading: false });
    }
  },
  
  clearOrders: () => set({ orders: [], error: null, loading: false })
}));
