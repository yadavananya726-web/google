import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Leaf,
  Ruler,
  ChevronRight,
  ChevronDown,
  Check,
  MessageSquare,
  Plus,
  Minus,
  Sparkles,
  Share2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductColor, Review } from '../types';
import { ProductCard } from './ProductCard';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSizeGuideOpen,
    setIsCheckoutOpen,
    showNotification,
  } = useStore();

  // Selected product
  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('materials');
  const [isAdding, setIsAdding] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);

  // New review form states
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [customReviews, setCustomReviews] = useState<Review[]>(product.reviews || []);

  const handleColorChange = (col: ProductColor) => {
    setSelectedColor(col);
    if (col.imageIndex !== undefined && product.images[col.imageIndex]) {
      setActiveImageIndex(col.imageIndex);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedColor, selectedSize, quantity);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Product link copied to clipboard!', 'info');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const reviewObj: Review = {
      id: `rev-custom-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim() || 'Verified Purchase',
      comment: newReviewComment.trim(),
      verified: true,
      helpfulCount: 0,
      fit: 'True to Size',
    };

    setCustomReviews((prev) => [reviewObj, ...prev]);
    setWriteReviewOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showNotification('Thank you! Your verified review has been posted.', 'success');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isFavorite = isInWishlist(product.id);

  // Bundle pair product (e.g. tote or cap or tumbler)
  const bundlePairProduct =
    products.find(
      (p) =>
        p.id !== product.id &&
        (p.id === 'google-structured-dad-cap' ||
          p.id === 'google-matte-ceramic-tumbler' ||
          p.id === 'google-organic-canvas-tote')
    ) || products[1];

  const bundleTotal = product.price + bundlePairProduct.price;
  const bundleDiscounted = Math.round(bundleTotal * 0.85); // 15% off bundle

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6 border-b border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs navigation */}
        <div className="flex items-center gap-2 text-xs text-[#8A8174] mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-[#27231F] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#C4BCAF]" />
          <button
            onClick={() => navigateTo('shop')}
            className="hover:text-[#27231F] transition-colors cursor-pointer"
          >
            Shop
          </button>
          <ChevronRight className="w-3 h-3 text-[#C4BCAF]" />
          <button
            onClick={() => navigateTo('shop')}
            className="hover:text-[#27231F] transition-colors cursor-pointer"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3 text-[#C4BCAF]" />
          <span className="text-[#27231F] font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </div>

        {/* Top Section: Gallery (Left) & Purchasing Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl bg-white border border-[#E8E2D6] overflow-hidden group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="px-3 py-1 bg-[#24201D] text-[#FAF8F5] text-xs font-bold rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
                {product.tags.includes('Eco-Friendly') && (
                  <span className="px-3 py-1 bg-[#3B6B4A] text-white text-xs font-semibold rounded-full shadow-xs flex items-center gap-1">
                    <Leaf className="w-3 h-3" />
                    <span>Organic Fabric</span>
                  </span>
                )}
              </div>

              {/* Wishlist & Share Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#27231F] border border-[#E8E2D6] shadow-md backdrop-blur-md transition-colors cursor-pointer"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-full backdrop-blur-md shadow-md border border-[#E8E2D6] transition-colors cursor-pointer ${
                    isFavorite
                      ? 'bg-[#FDF2F0] text-[#C85A3F] border-[#F2D2CC]'
                      : 'bg-white/90 text-[#27231F] hover:bg-white hover:text-[#C85A3F]'
                  }`}
                  title={isFavorite ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#C85A3F] text-[#C85A3F]' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === index
                      ? 'border-[#2E5B82] ring-2 ring-[#2E5B82]/20 shadow-xs'
                      : 'border-[#E8E2D6] hover:border-[#8A8174] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Meta & Purchase Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2E5B82]">
                  {product.category} • SKU: {product.sku}
                </span>

                {/* Reviews rating pill */}
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-[#D48B38]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D48B38] text-[#D48B38]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#27231F]">{product.rating}</span>
                  <a href="#reviews-section" className="text-[#8A8174] underline hover:text-[#27231F]">
                    ({customReviews.length} reviews)
                  </a>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#27231F] font-heading tracking-tight mt-1.5">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#5C5449] mt-1 font-medium">
                {product.subtitle}
              </p>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#27231F] font-heading">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#8A8174] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold text-[#3B6B4A] bg-[#EAF2EC] px-2.5 py-0.5 rounded-full border border-[#BEDBC3]">
                    Save ${product.originalPrice - product.price} (
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                  </span>
                )}
              </div>
            </div>

            {/* Description Brief */}
            <p className="text-xs sm:text-sm text-[#5C5449] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            <div className="space-y-2 pt-2 border-t border-[#E8E2D6]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#27231F]">
                  Colorway: <span className="font-normal text-[#5C5449]">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color)}
                      className={`group relative p-1 rounded-full border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2E5B82] scale-110 shadow-2xs'
                          : 'border-transparent hover:border-[#DDD5C7]'
                      }`}
                      title={color.name}
                    >
                      <span className={`block w-6 h-6 rounded-full ${color.bgClass}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && (
              <div className="space-y-2.5 pt-2 border-t border-[#E8E2D6]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#27231F]">
                    Size: <span className="font-normal text-[#5C5449]">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[#2E5B82] hover:text-[#1A3854] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide & Fit Tips</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#24201D] text-[#FAF8F5] border-[#24201D] shadow-2xs'
                            : 'bg-white text-[#27231F] border-[#DDD5C7] hover:border-[#8A8174]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Stock Info */}
            <div className="space-y-2 pt-2 border-t border-[#E8E2D6]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#27231F]">Quantity</span>
                <span className="text-[#3B6B4A] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock (Ships in 24 hrs)</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E8E2D6] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-lg text-[#5C5449] hover:bg-[#F2ECE1] hover:text-black transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#27231F] min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-lg text-[#5C5449] hover:bg-[#F2ECE1] hover:text-black transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-[#8A8174]">
                  Total: <strong className="text-[#27231F]">${product.price * quantity}</strong>
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                id="pdp-add-to-bag-btn"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 px-6 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAdding ? (
                  <>
                    <Check className="w-4 h-4 text-[#BEDBC3] animate-bounce" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D48B38]" />
                    <span>Add to Bag • ${product.price * quantity}</span>
                  </>
                )}
              </button>

              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-[#2E5B82] hover:bg-[#234563] text-white font-bold text-sm rounded-2xl shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#F3C068]" />
                <span>Instant Checkout (Google Pay / Card)</span>
              </button>
            </div>

            {/* Key Delivery Perks */}
            <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E8E2D6] space-y-2.5 text-xs text-[#5C5449]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#2E5B82] shrink-0" />
                <span>Free carbon-neutral delivery on orders over $50</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#3B6B4A] shrink-0" />
                <span>30-Day Hassle-Free Returns with prepaid label</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D48B38] shrink-0" />
                <span>Official Google Merchandise Guarantee</span>
              </div>
            </div>

            {/* Accordion Specs */}
            <div className="border-t border-[#E8E2D6] divide-y divide-[#E8E2D6] text-xs">
              {/* Materials & Sustainability */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'materials' ? '' : 'materials')
                  }
                  className="w-full flex items-center justify-between font-bold text-[#27231F] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Leaf className="w-3.5 h-3.5 text-[#3B6B4A]" />
                    <span>Materials & Sustainability</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A8174] transition-transform ${
                      activeAccordion === 'materials' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'materials' && (
                  <div className="mt-2 space-y-1.5 text-[#5C5449] leading-relaxed pl-5">
                    <p><strong>Fabric:</strong> {product.materials}</p>
                    <p><strong>Impact:</strong> {product.sustainability}</p>
                    {product.careInstructions && (
                      <p><strong>Care:</strong> {product.careInstructions}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Product Features */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'features' ? '' : 'features')
                  }
                  className="w-full flex items-center justify-between font-bold text-[#27231F] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#2E5B82]" />
                    <span>Engineering & Features</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A8174] transition-transform ${
                      activeAccordion === 'features' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'features' && (
                  <ul className="mt-2 space-y-1 text-[#5C5449] list-disc pl-9">
                    {product.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Shipping & Delivery */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')
                  }
                  className="w-full flex items-center justify-between font-bold text-[#27231F] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#8A8174]" />
                    <span>Shipping, Delivery & Returns</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A8174] transition-transform ${
                      activeAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="mt-2 space-y-1 text-[#5C5449] pl-5">
                    <p>Orders dispatched within 24 hours from California & EU distribution hubs.</p>
                    <p>Standard delivery (3-5 business days) is FREE on orders $50+.</p>
                    <p>30-day unworn returns accepted with original tags attached.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Pair Offer: "Frequently Paired With" */}
        <div className="my-16 p-6 sm:p-8 rounded-3xl bg-[#F5F1E8] border border-[#E8E2D6] shadow-2xs">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E5B82] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D48B38]" />
              <span>Complete The Look Bundle</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#27231F] font-heading">
              Pair with {bundlePairProduct.name} & Save 15%
            </h3>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Item 1 */}
              <div className="md:col-span-4 flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#E8E2D6]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-[#E8E2D6]"
                />
                <div>
                  <p className="text-xs font-bold text-[#27231F] line-clamp-1">{product.name}</p>
                  <p className="text-xs text-[#5C5449]">${product.price}</p>
                </div>
              </div>

              {/* Plus Sign */}
              <div className="md:col-span-1 text-center font-bold text-[#8A8174] text-lg">
                +
              </div>

              {/* Item 2 */}
              <div className="md:col-span-4 flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#E8E2D6]">
                <img
                  src={bundlePairProduct.images[0]}
                  alt={bundlePairProduct.name}
                  className="w-16 h-16 object-cover rounded-xl border border-[#E8E2D6]"
                />
                <div>
                  <p className="text-xs font-bold text-[#27231F] line-clamp-1">{bundlePairProduct.name}</p>
                  <p className="text-xs text-[#5C5449]">${bundlePairProduct.price}</p>
                </div>
              </div>

              {/* Bundle Action */}
              <div className="md:col-span-3 text-center md:text-right space-y-2">
                <div>
                  <span className="text-xs text-[#8A8174] line-through mr-2">${bundleTotal}</span>
                  <span className="text-xl font-black text-[#27231F] font-heading">${bundleDiscounted}</span>
                </div>
                <button
                  onClick={() => {
                    addToCart(product, selectedColor, selectedSize, 1);
                    addToCart(bundlePairProduct, bundlePairProduct.colors[0], undefined, 1);
                    showNotification(`Bundle added to bag with 15% savings!`, 'success');
                  }}
                  className="w-full py-2.5 px-4 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Add Both to Bag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Ratings Section */}
        <section id="reviews-section" className="my-16 pt-12 border-t border-[#E8E2D6]">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#27231F] font-heading">
                Customer Reviews
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5449] mt-1">
                Real feedback from verified purchasers in the developer and creator community.
              </p>
            </div>

            <button
              onClick={() => setWriteReviewOpen(true)}
              className="px-5 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#27231F] text-xs font-bold rounded-xl border border-[#E8E2D6] shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#2E5B82]" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Rating Breakdown Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#F5F1E8] p-6 rounded-3xl border border-[#E8E2D6] mb-8">
            <div className="md:col-span-4 text-center md:text-left flex flex-col justify-center">
              <span className="text-5xl font-extrabold text-[#27231F] font-heading">
                {product.rating}
              </span>
              <div className="flex items-center justify-center md:justify-start gap-1 text-[#D48B38] my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D48B38] text-[#D48B38]" />
                ))}
              </div>
              <p className="text-xs text-[#5C5449]">
                Based on {customReviews.length + 42} verified customer reviews
              </p>
            </div>

            <div className="md:col-span-8 space-y-1.5 justify-center flex flex-col text-xs">
              {[
                { stars: 5, pct: '88%' },
                { stars: 4, pct: '10%' },
                { stars: 3, pct: '2%' },
                { stars: 2, pct: '0%' },
                { stars: 1, pct: '0%' },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-12 text-[#5C5449] font-medium">{row.stars} Stars</span>
                  <div className="flex-1 h-2 bg-[#DDD5C7] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D48B38] rounded-full" style={{ width: row.pct }} />
                  </div>
                  <span className="w-10 text-right text-[#8A8174]">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Modal / Form */}
          {writeReviewOpen && (
            <div className="mb-8 p-6 bg-white rounded-3xl border-2 border-[#C2D8EC] shadow-lg animate-in fade-in duration-200">
              <form onSubmit={handleAddReview} className="space-y-4 max-w-xl">
                <h3 className="font-bold text-base text-[#27231F] font-heading">
                  Write a Verified Review for {product.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#27231F] block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82] bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#27231F] block mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82] bg-[#FAF8F5]"
                    >
                      <option value="5">5 Stars — Excellent</option>
                      <option value="4">4 Stars — Good</option>
                      <option value="3">3 Stars — Average</option>
                      <option value="2">2 Stars — Fair</option>
                      <option value="1">1 Star — Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#27231F] block mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Amazing quality and perfect weight"
                    className="w-full px-3 py-2 text-xs border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82] bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#27231F] block mb-1">Your Experience</label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Describe the fabric quality, comfort, fit, and aesthetic details..."
                    className="w-full px-3 py-2 text-xs border border-[#DDD5C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5B82] bg-[#FAF8F5]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#2E5B82] hover:bg-[#234563] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setWriteReviewOpen(false)}
                    className="px-4 py-2.5 bg-[#F2ECE1] hover:bg-[#EAE2D3] text-[#27231F] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {customReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white border border-[#E8E2D6] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#27231F]">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] font-semibold text-[#3B6B4A] bg-[#EAF2EC] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#BEDBC3]">
                        <Check className="w-2.5 h-2.5" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8A8174]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex text-[#D48B38]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D48B38] text-[#D48B38]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#27231F]">{rev.title}</span>
                </div>

                <p className="text-xs text-[#5C5449] leading-relaxed">{rev.comment}</p>

                {rev.fit && (
                  <div className="text-[11px] text-[#8A8174] pt-1">
                    <span>Fit feedback: <strong className="text-[#27231F] font-semibold">{rev.fit}</strong></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <section className="my-16 pt-12 border-t border-[#E8E2D6]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#27231F] font-heading">
                  You Might Also Like
                </h2>
                <p className="text-xs sm:text-sm text-[#5C5449] mt-1">
                  More essentials from the {product.category} collection.
                </p>
              </div>

              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-bold text-[#2E5B82] hover:text-[#1A3854] cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
