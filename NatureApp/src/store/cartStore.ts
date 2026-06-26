// src/store/cartStore.ts
import { create } from 'zustand';
import { CartService } from '../services/firestoreService';

interface CartState {
  items: any[];
  total: number;
  itemCount: number;
  loading: boolean;
  error: string | null;
  loadCart: (userId: string) => Promise<void>;
  addItem: (userId: string, product: any) => Promise<void>;
  updateQuantity: (userId: string, itemId: string, quantity: number) => Promise<void>;
  removeItem: (userId: string, itemId: string) => Promise<void>;
  clearCart: (userId: string) => Promise<void>;
  clearCartLocal: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null,

  loadCart: async (userId: string) => {
    if (!userId) return;
    set({ loading: true, error: null });
    try {
      const data = await CartService.get(userId);
      const total = data.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
      const itemCount = data.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
      
      set({ items: data.items, total, itemCount, loading: false });
    } catch (err) {
      set({ error: 'No se pudo cargar el carrito', loading: false });
    }
  },

  addItem: async (userId: string, product: any) => {
    if (!userId) return;
    try {
      await CartService.addItem(userId, product);
      await get().loadCart(userId);
    } catch (err) {
      set({ error: 'No se pudo agregar el producto' });
    }
  },

  updateQuantity: async (userId: string, itemId: string, quantity: number) => {
    if (!userId) return;
    try {
      if (quantity <= 0) {
        await CartService.removeItem(userId, itemId);
      } else {
        await CartService.updateQuantity(userId, itemId, quantity);
      }
      await get().loadCart(userId);
    } catch (err) {
      set({ error: 'Error al actualizar cantidad' });
    }
  },

  removeItem: async (userId: string, itemId: string) => {
    if (!userId) return;
    try {
      await CartService.removeItem(userId, itemId);
      await get().loadCart(userId);
    } catch (err) {
      set({ error: 'Error al eliminar item' });
    }
  },

  clearCart: async (userId: string) => {
    if (!userId) return;
    try {
      await CartService.clear(userId);
      set({ items: [], total: 0, itemCount: 0 });
    } catch (err) {
      set({ error: 'Error al vaciar carrito' });
    }
  },
  
  clearCartLocal: () => {
    set({ items: [], total: 0, itemCount: 0 });
  }
}));
