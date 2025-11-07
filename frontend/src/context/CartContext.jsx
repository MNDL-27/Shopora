import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load cart from localStorage or backend
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Load from localStorage for guest users
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(localCart);
    }
  }, [isAuthenticated]);

  // Save cart to localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const { data } = await axios.get('/cart');
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      if (isAuthenticated) {
        const { data } = await axios.post('/cart', {
          productId: product._id,
          quantity,
        });
        setCartItems(data.items);
        toast.success(`${product.name} added to cart!`);
      } else {
        // Guest cart logic
        const existingItem = cartItems.find(item => item.product._id === product._id);
        
        if (existingItem) {
          setCartItems(cartItems.map(item =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ));
        } else {
          setCartItems([...cartItems, { product, quantity }]);
        }
        toast.success(`${product.name} added to cart!`);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        return removeFromCart(productId);
      }

      if (isAuthenticated) {
        const { data } = await axios.put(`/cart/${productId}`, { quantity });
        setCartItems(data.items);
      } else {
        setCartItems(cartItems.map(item =>
          item.product._id === productId ? { ...item, quantity } : item
        ));
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      toast.error(message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (isAuthenticated) {
        const { data } = await axios.delete(`/cart/${productId}`);
        setCartItems(data.items);
        toast.success('Item removed from cart');
      } else {
        setCartItems(cartItems.filter(item => item.product._id !== productId));
        toast.success('Item removed from cart');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item';
      toast.error(message);
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await axios.delete('/cart');
      }
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
