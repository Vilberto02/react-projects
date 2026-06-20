// src/hooks/useProducts.tsx
import { useCallback, useEffect, useState } from "react";
import { CategoryAPI, ProductAPI } from "../services/apiService";
import { Product, Category } from "../types/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Carga inicial de productos y categorías (paralelo)
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodRes, catRes] = await Promise.all([
        ProductAPI.getAll({ page: 1, limit: 20 }),
        CategoryAPI.getAll(),
      ]);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
      if (prodRes.pagination) {
        setHasMore(prodRes.pagination.page < prodRes.pagination.pages);
      }
      setPage(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Filtrar por categoría
  const filterByCategory = useCallback(async (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      const params = categoryId
        ? { category: categoryId, page: 1 }
        : { page: 1 };
      const res = await ProductAPI.getAll(params);
      setProducts(res.data || []);
      if (res.pagination) {
        setHasMore(res.pagination.page < res.pagination.pages);
      }
      setPage(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar productos
  const searchProducts = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        loadInitialData();
        return;
      }
      setLoading(true);
      try {
        const res = await ProductAPI.search(term);
        setProducts(res.data || []);
        setHasMore(false);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [loadInitialData],
  );

  // Cargar más productos (paginación)
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    try {
      const params: any = { page: nextPage, limit: 20 };
      if (selectedCategory) params.category = selectedCategory;
      const res = await ProductAPI.getAll(params);
      setProducts((prev) => [...prev, ...(res.data || [])]);
      if (res.pagination) {
        setHasMore(res.pagination.page < res.pagination.pages);
      }
      setPage(nextPage);
    } catch (err: any) {
      setError(err.message);
    }
  }, [hasMore, loading, page, selectedCategory]);

  // Pull-to-refresh
  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  }, [loadInitialData]);

  return {
    products,
    categories,
    selectedCategory,
    loading,
    refreshing,
    error,
    hasMore,
    filterByCategory,
    searchProducts,
    loadMore,
    refresh,
  };
}
