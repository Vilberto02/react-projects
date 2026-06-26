// src/store/productStore.ts
import { create } from 'zustand';
import { ProductService, CategoryService } from '../services/firestoreService';

interface ProductState {
  products: any[];
  categories: any[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
  loadProducts: (categoryId?: string | null) => Promise<void>;
  loadCategories: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  getProductById: (productId: string) => Promise<any>;
  filterByCategory: (categoryId: string | null) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,
  selectedCategory: null,

  loadProducts: async (categoryId = null) => {
    set({ loading: true, error: null });
    try {
      const data = await ProductService.getAll(categoryId);
      set({ products: data, loading: false });
    } catch (err) {
      set({ error: 'No se pudieron cargar los productos', loading: false });
    }
  },

  loadCategories: async () => {
    try {
      const data = await CategoryService.getAll();
      set({ categories: data });
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  },

  searchProducts: async (query: string) => {
    set({ loading: true, error: null });
    try {
      const data = await ProductService.search(query);
      set({ products: data, loading: false });
    } catch (err) {
      set({ error: 'Error en la búsqueda', loading: false });
    }
  },

  getProductById: async (productId: string) => {
    try {
      return await ProductService.getById(productId);
    } catch (err) {
      console.error('Error obteniendo producto:', err);
      return null;
    }
  },

  filterByCategory: (categoryId: string | null) => {
    set({ selectedCategory: categoryId });
    get().loadProducts(categoryId);
  }
}));
