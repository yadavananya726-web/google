import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : 'Standard'
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const activeImage =
    selectedColor.imageIndex !== undefined && product.images[selectedColor.imageIndex]
      ? product.images[selectedColor.imageIndex]
      : isHovered && product.images[1]
      ? product.images[1]
      : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedColor, selectedSize, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleCardClick = () => {
    navigateTo('product-details', product.id);
  };

  const isFavorite = isInWishlist(product.id);

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E8E2D6] hover:border-[#C8BEAE] hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image Showcase Container */}
      <div className="relative aspect-square w-full bg-[#F7F4EE] overflow-hidden">
        {/* Main Image with smooth scale */}
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wide rounded-full bg-[#24201D] text-[#FAF8F5] shadow-xs backdrop-blur-md">
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wide rounded-full bg-[#C85A3F] text-white shadow-xs">
              Save ${product.originalPrice - product.price}
            </span>
          )}
          {product.tags.includes('Eco-Friendly') && (
            <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#3B6B4A] text-white shadow-xs">
              Eco Fabric
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            isFavorite
              ? 'bg-[#FDF0EC] text-[#C85A3F] shadow-sm'
              : 'bg-white/80 text-[#70675C] hover:bg-white hover:text-[#C85A3F] opacity-80 group-hover:opacity-100'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#C85A3F] text-[#C85A3F]' : ''}`} />
        </button>

        {/* Floating Quick Action Overlay (Bottom of Image) */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            id={`quickview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#27231F] text-xs font-semibold rounded-xl shadow-md border border-[#DDD5C7] backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#70675C]" />
            <span>Quick View</span>
          </button>

          <button
            id={`quickadd-btn-${product.id}`}
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="p-2 bg-[#24201D] hover:bg-[#2E5B82] text-white rounded-xl shadow-md transition-colors flex items-center justify-center cursor-pointer"
            title="Quick Add to Bag"
          >
            {isAdding ? (
              <Check className="w-4 h-4 text-[#52B788] animate-bounce" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-[#52B788]" />
            )}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#70675C]">
            <span className="font-medium uppercase tracking-wider text-[11px] text-[#8A8174]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#D48B38] text-[#D48B38]" />
              <span className="font-semibold text-[#27231F]">{product.rating}</span>
              <span className="text-[#8A8174] text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-sm sm:text-base text-[#27231F] line-clamp-1 group-hover:text-[#2E5B82] transition-colors">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-[#70675C] line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom info: Color Swatches & Price */}
        <div className="mt-4 pt-3 border-t border-[#E8E2D6] flex items-center justify-between">
          {/* Color preview dots */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.slice(0, 4).map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col)}
                className={`w-3.5 h-3.5 rounded-full ${col.bgClass} transition-transform ${
                  selectedColor.name === col.name
                    ? 'ring-2 ring-[#2E5B82] ring-offset-1 scale-110'
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                }`}
                title={col.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[#8A8174] font-medium pl-0.5">
                +{product.colors.length - 4}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 text-right">
            {product.originalPrice && (
              <span className="text-xs text-[#8A8174] line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-base font-bold text-[#27231F] font-heading">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
