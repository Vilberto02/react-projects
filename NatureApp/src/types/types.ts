export interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: string;
  fiber?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category | string; // Populate object or ID string
  image: string;
  stock: number;
  isActive: boolean;
  tags: string[];
  nutritionalInfo?: NutritionalInfo;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street?: string;
    city?: string;
    zipCode?: string;
  };
  role: 'customer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  _id?: string;
  product: string | Product; // Populate object or ID string
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  _id: string;
  user: string | User;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total?: number;
  count?: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: Pagination;
}
