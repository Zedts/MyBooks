import { useState, useEffect, useCallback } from 'react';
import { CartItem, Cart } from '../types/cart';
import { showToast } from '../utils/toast';

const CART_STORAGE_KEY = 'cartItems';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  // Update cart state and calculate totals
  const updateCartState = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setCart({
      items,
      totalItems,
      totalPrice,
    });
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const items: CartItem[] = JSON.parse(stored);
          updateCartState(items);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage
  const saveCart = (items: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      updateCartState(items);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Add item to cart
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    const currentItems = [...cart.items];
    const existingIndex = currentItems.findIndex(i => i.bookId === item.bookId);

    if (existingIndex > -1) {
      // Update quantity if item exists
      const newQuantity = currentItems[existingIndex].quantity + quantity;
      
      if (newQuantity > item.stock) {
        showToast.error(`Only ${item.stock} items available in stock`);
        return;
      }

      currentItems[existingIndex].quantity = newQuantity;
    } else {
      // Add new item
      if (quantity > item.stock) {
        showToast.error(`Only ${item.stock} items available in stock`);
        return;
      }

      currentItems.push({ ...item, quantity });
    }

    saveCart(currentItems);
    showToast.success(`${item.title} added to cart`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.items]);

  // Remove item from cart
  const removeFromCart = useCallback((bookId: number) => {
    const currentItems = cart.items.filter(item => item.bookId !== bookId);
    saveCart(currentItems);
    showToast.success('Item removed from cart');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.items]);

  // Update item quantity
  const updateQuantity = useCallback((bookId: number, quantity: number) => {
    const currentItems = [...cart.items];
    const itemIndex = currentItems.findIndex(i => i.bookId === bookId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        removeFromCart(bookId);
        return;
      }

      if (quantity > currentItems[itemIndex].stock) {
        showToast.error(`Only ${currentItems[itemIndex].stock} items available`);
        return;
      }

      currentItems[itemIndex].quantity = quantity;
      saveCart(currentItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.items, removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartState([]);
  }, []);

  // Get cart item by bookId
  const getCartItem = useCallback((bookId: number): CartItem | undefined => {
    return cart.items.find(item => item.bookId === bookId);
  }, [cart.items]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
  };
};
