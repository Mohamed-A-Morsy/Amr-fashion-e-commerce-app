'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { CartItem, OrderItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  getOrderItems: () => OrderItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'tshirt_store_cart';

function getProductFinalPrice(product?: Product): number {
  if (!product) return 0;

  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);

  if (!discount) return price;

  return Math.max(price - (price * discount) / 100, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsed = JSON.parse(storedCart) as CartItem[];
        setItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      setItems([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items, isHydrated]);

  const addToCart = (product: Product, size: string, color: string, quantity: number) => {
    if (quantity <= 0) return;

    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.productId === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity, product }
            : item
        );
      }

      return [
        ...prevItems,
        {
          productId: product.id,
          quantity,
          selectedSize: size,
          selectedColor: color,
          product,
        },
      ];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cart from localStorage:', error);
    }
  };

  const cartCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      const price = getProductFinalPrice(item.product);
      return total + price * item.quantity;
    }, 0);
  }, [items]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= 1000 ? 0 : 75;
  }, [items, subtotal]);

  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const getOrderItems = (): OrderItem[] => {
    return items.map((item) => {
      const unitPrice = getProductFinalPrice(item.product);

      return {
        product_id: item.productId,
        name: item.product?.name || 'Product',
        image: item.product?.images?.[0] || '',
        price: unitPrice,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor,
        line_total: unitPrice * item.quantity,
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        total,
        getOrderItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}