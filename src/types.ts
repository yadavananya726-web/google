export type ProductCategory =
  | 'T-Shirts'
  | 'Hoodies'
  | 'Accessories'
  | 'Headwear'
  | 'Bags'
  | 'Drinkware';

export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
  imageIndex?: number;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  fit?: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  description: string;
  features: string[];
  materials: string;
  sustainability: string;
  careInstructions?: string;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  inStock: boolean;
  stockCount: number;
  tags: ('Best Seller' | 'New' | 'Eco-Friendly' | 'Limited Edition' | 'Sale' | 'Featured')[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  badge?: string;
}

export interface CartItem {
  id: string; // unique item id based on product.id + color + size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  addedAt: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'best-seller';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  tags: string[];
  inStockOnly: boolean;
  searchQuery: string;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product-details'
  | 'sustainability'
  | 'shipping-returns'
  | 'faq'
  | 'lookbook';

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: 'standard' | 'express' | 'overnight';
  paymentMethod: 'gpay' | 'card' | 'shoppay';
  cardNumber?: string;
  cardExp?: string;
  cardCvc?: string;
  saveInfo: boolean;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethodName: string;
  estimatedDelivery: string;
}
