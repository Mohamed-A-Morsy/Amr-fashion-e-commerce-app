// Language type
export type Language = 'en' | 'ar';

// Product types
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
  fullDescription: string;
  price: number;
  discount?: number;
  category: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  rating: number;
  reviews: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Category type
export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

// Cart types
export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  product?: Product;
}

// Order types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  shippingAddress: ShippingAddress;
  notes?: string;
}

// Customer types
export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  orders: Order[];
  addresses: ShippingAddress[];
  wishlist: string[];
  createdAt: Date;
}

// User type (for auth)

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
}

// Analytics types
export interface AnalyticsMetrics {
  totalOrders: number;
  totalSales: number;
  totalCustomers: number;
  averageOrderValue: number;
  bestSellingProduct: string;
  ordersThisMonth: number;
  salesThisMonth: number;
  newCustomersThisMonth: number;
}
