import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
};

export type CartItemInput = Omit<CartItem, 'quantity'> & { quantity?: number };

type CartContextValue = {
  cart: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  subtotal: number;
  addToCart: (item: CartItemInput) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  /**
   * Backward-compatible alias used by existing components.
   * Prefer `totalItems` for new code.
   */
  cartCount: number;
  /**
   * Backward-compatible alias used by existing components.
   * Prefer `addToCart` for new code.
   */
  addItem: (item: CartItemInput) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((item: CartItemInput) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === item.id);
      if (existing) {
        return prev.map((line) => {
          if (line.id !== item.id) return line;
          return { ...line, quantity: line.quantity + (item.quantity ?? 1) };
        });
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
          quantity: item.quantity ?? 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, amount: number) => {
    setCart((prev) =>
      prev.flatMap((line) => {
        if (line.id !== id) return [line];
        const nextQuantity = line.quantity + amount;
        return nextQuantity > 0 ? [{ ...line, quantity: nextQuantity }] : [];
      }),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleCart = useCallback(() => setIsCartOpen((open) => !open), []);

  const totalItems = useMemo(
    () => cart.reduce((total, line) => total + line.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      isCartOpen,
      totalItems,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setIsCartOpen,
      toggleCart,
      // Backward compatibility for existing components.
      cartCount: totalItems,
      addItem: addToCart,
    }),
    [
      cart,
      isCartOpen,
      totalItems,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
    ],
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
