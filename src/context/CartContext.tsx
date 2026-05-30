import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CatalogProduct } from '../components/ProductCard.tsx';

export type CartLineItem = {
  product: CatalogProduct;
  quantity: number;
};

type CartContextValue = {
  items: CartLineItem[];
  cartCount: number;
  addItem: (product: CatalogProduct) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);

  const addItem = useCallback((product: CatalogProduct) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.product.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((line) => line.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = useMemo(
    () => items.reduce((total, line) => total + line.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, cartCount, addItem, removeItem, clearCart }),
    [items, cartCount, addItem, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
