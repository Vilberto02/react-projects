// src/services/apiService.ts
// Módulo centralizado de comunicación con el backend
import { Order, User, Product, Category, Cart, CartItem, ApiResponse } from '../types/types';

const BASE_URL = "http://192.168.18.95:9090/api";

let authToken: string | null = null;
export const setToken = (token: string) => {
  authToken = token;
};

export const clearToken = () => {
  authToken = null;
};

// ── Función genérica de solicitud HTTP ──
const request = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...options.headers,
  };
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    } as any); // cast to any because options.body is stringified manually but RequestInit expects BodyInit
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error HTTP ${response.status}`);
    }
    return data;
  } catch (error: any) {
    if (error.name === "TypeError") {
      throw new Error("Error de conexión con el servidor");
    }
    throw error;
  }
};

// ── Módulo de Productos ──
export const ProductAPI = {
  getAll: (params: any = {}) => {
    const query = new URLSearchParams(params).toString();
    return request<ApiResponse<Product[]>>(`/products?${query}`);
  },
  getById: (id: string) => request<ApiResponse<Product>>(`/products/${id}`),
  search: (term: string) => request<ApiResponse<Product[]>>(`/products?search=${term}`),
};

// ── Módulo de Categorías ──
export const CategoryAPI = {
  getAll: () => request<ApiResponse<Category[]>>("/categories"),
};

// ── Módulo de Autenticación ──
export const AuthAPI = {
  login: (email: string, password: string) =>
    request<ApiResponse<{ user: User, token: string }>>("/users/login", {
      method: "POST",
      body: { email, password } as any,
    }),
  register: (userData: any) =>
    request<ApiResponse<{ user: User, token: string }>>("/users/register", {
      method: "POST",
      body: userData,
    }),
  getProfile: () => request<ApiResponse<User>>("/users/profile"),
  updateProfile: (data: any) =>
    request<ApiResponse<User>>("/users/profile", {
      method: "PUT",
      body: data,
    }),
};

// ── Módulo de Carrito ──
export const CartAPI = {
  get: () => request<ApiResponse<Cart>>("/cart"),
  addItem: (item: any) => request<ApiResponse<Cart>>("/cart/add", { method: "POST", body: item }),
  updateQuantity: (productId: string, quantity: number) =>
    request<ApiResponse<Cart>>(`/cart/${productId}`, {
      method: "PUT",
      body: { quantity } as any,
    }),
  removeItem: (productId: string) =>
    request<ApiResponse<Cart>>(`/cart/${productId}`, { method: "DELETE" }),
  clear: () => request<ApiResponse<Cart>>("/cart", { method: "DELETE" }),
};

// ── Módulo de Pedidos ──
export const OrderAPI = {
  create: (orderData: any) =>
    request<ApiResponse<Order>>("/orders", { method: "POST", body: orderData }),
  getAll: () => request<ApiResponse<Order[]>>("/orders"),
  getById: (id: string) => request<ApiResponse<Order>>(`/orders/${id}`),
  cancel: (id: string) => request<ApiResponse<Order>>(`/orders/${id}/cancel`, { method: "PUT" }),
};
