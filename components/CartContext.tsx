"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (handle: string, size: string) => void;
  updateQuantity: (handle: string, size: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback((product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.handle === product.handle && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.handle === product.handle && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((handle: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.handle === handle && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (handle: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(handle, size);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.handle === handle && i.size === size
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.priceAmount * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        open,
        close,
        toggle,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
