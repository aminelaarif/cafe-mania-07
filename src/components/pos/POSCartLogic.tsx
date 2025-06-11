
import { useState, useCallback } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const usePOSCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = useCallback((item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    setTotal(total + item.price);
  }, [cart, total]);

  const removeFromCart = useCallback((itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (!item) return;

    if (item.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    } else {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCart(updatedCart);
    }
    
    setTotal(total - item.price);
  }, [cart, total]);

  const clearCart = useCallback(() => {
    setCart([]);
    setTotal(0);
  }, []);

  return {
    cart,
    total,
    addToCart,
    removeFromCart,
    clearCart
  };
};
