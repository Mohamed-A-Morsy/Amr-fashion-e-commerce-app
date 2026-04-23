export type Language = 'en' | 'ar';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  discount?: number;
  category: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  status?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  product?: Product;
}

export interface OrderItem {
  product_id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  line_total: number;
}

export interface CustomerInfo {
  customer_id?: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface CreateOrderPayload {
  customer_id?: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItem[];
  payment_method: string;
}

export interface Order {
  order_id: string;
  customer_id?: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  payment_method: string;
  order_status: string;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}