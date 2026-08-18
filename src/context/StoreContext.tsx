import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ProductColor, PageView, OrderConfirmation, CheckoutFormData } from '../types';
import { PRODUCTS, PROMO_CODES } from '../data/products';

interface NotificationData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
  actionLabel?: string;
  onAction?: () => void;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeGuideOpen: boolean;
  setSizeGuideOpen: (open: boolean) => void;
  activeView: PageView;
  selectedProductId: string | null;
  navigateTo: (view: PageView, productId?: string) => void;
  addToCart: (product: Product, color?: ProductColor, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: { code: string; discountPercent: number; description: string } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  notifications: NotificationData[];
  showNotification: (message: string, type?: 'success' | 'info' | 'error', actionLabel?: string, onAction?: () => void) => void;
  removeNotification: (id: string) => void;
  lastOrder: OrderConfirmation | null;
  placeOrder: (formData: CheckoutFormData) => OrderConfirmation;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
  cartItemCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'google_merch_cart_v1';
const WISHLIST_STORAGE_KEY = 'google_merch_wishlist_v1';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeView, setActiveView] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    description: string;
  } | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);

  // Sync with Local Storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wishlist]);

  // Notifications
  const showNotification = (
    message: string,
    type: 'success' | 'info' | 'error' = 'success',
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    const newNotif: NotificationData = { id, message, type, actionLabel, onAction };
    setNotifications((prev) => [...prev, newNotif]);

    setTimeout(() => {
      removeNotification(id);
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const navigateTo = (view: PageView, productId?: string) => {
    setActiveView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (
    product: Product,
    color?: ProductColor,
    size?: string,
    quantity: number = 1
  ) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || (product.sizes ? product.sizes[0] : 'Standard');
    const cartItemId = `${product.id}-${chosenColor.name}-${chosenSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem: CartItem = {
        id: cartItemId,
        product,
        selectedColor: chosenColor,
        selectedSize: chosenSize,
        quantity,
        addedAt: Date.now(),
      };
      return [...prev, newItem];
    });

    showNotification(
      `Added "${product.name}" (${chosenSize}, ${chosenColor.name}) to your bag.`,
      'success',
      'View Bag',
      () => setIsCartOpen(true)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      showNotification(`Removed "${item.product.name}" from your bag.`, 'info');
    }
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification(
          prod ? `Removed "${prod.name}" from wishlist.` : 'Removed from wishlist.',
          'info'
        );
        return prev.filter((id) => id !== productId);
      } else {
        showNotification(
          prod ? `Added "${prod.name}" to wishlist.` : 'Saved to wishlist.',
          'success',
          'View Wishlist',
          () => setIsWishlistOpen(true)
        );
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    const promo = PROMO_CODES[upper];
    if (promo) {
      setAppliedCoupon({
        code: upper,
        discountPercent: promo.discountPercent,
        description: promo.description,
      });
      showNotification(
        `Code ${upper} applied! Saved ${promo.discountPercent}% on your order.`,
        'success'
      );
      return { success: true, message: `Applied ${promo.discountPercent}% discount.` };
    }
    showNotification(`Coupon code "${code}" is invalid or expired.`, 'error');
    return { success: false, message: 'Invalid coupon code. Try GOOGLE10 or WELCOME20' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showNotification('Promo code removed.', 'info');
  };

  // Calculated Cart values
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartDiscount = appliedCoupon
    ? (cartSubtotal * appliedCoupon.discountPercent) / 100
    : 0;
  // Free shipping on $50+
  const cartShipping = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 5.0;
  const cartTax = Number(((cartSubtotal - cartDiscount) * 0.0825).toFixed(2));
  const cartTotal = Math.max(
    0,
    Number((cartSubtotal - cartDiscount + (cartSubtotal > 0 ? cartShipping : 0) + cartTax).toFixed(2))
  );

  // Place order
  const placeOrder = (formData: CheckoutFormData): OrderConfirmation => {
    const confirmation: OrderConfirmation = {
      orderId: `GGL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      tax: cartTax,
      total: cartTotal,
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: `${formData.address}${formData.apartment ? ` Apt ${formData.apartment}` : ''}`,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      shippingMethodName:
        formData.shippingMethod === 'overnight'
          ? 'Priority Overnight (1 Business Day)'
          : formData.shippingMethod === 'express'
          ? 'Expedited Courier (2-3 Business Days)'
          : 'Standard Carbon-Neutral Delivery (3-5 Business Days)',
      estimatedDelivery:
        formData.shippingMethod === 'overnight'
          ? 'Tomorrow by 5 PM'
          : formData.shippingMethod === 'express'
          ? 'Within 2-3 Business Days'
          : 'Within 4-6 Business Days',
    };

    setLastOrder(confirmation);
    clearCart();
    setAppliedCoupon(null);
    return confirmation;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideOpen,
        setSizeGuideOpen,
        activeView,
        selectedProductId,
        navigateTo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        notifications,
        showNotification,
        removeNotification,
        lastOrder,
        placeOrder,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
