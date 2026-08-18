import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ArrowRight, Eye, Leaf } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    navigateTo,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  React.useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : 'Standard');
      setQuantity(1);
    }
  }, [quickViewProduct?.id]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentColor = selectedColor || product.colors[0];
  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product, currentColor, currentSize, quantity);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  const handleFullDetails = () => {
    setQuickViewProduct(null);
    navigateTo('product-details', product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative bg-[#FAF8F5] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E8E2D6] overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-[#F2ECE1] text-[#27231F] border border-[#E8E2D6] transition-colors shadow-2xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image & Thumbnails (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-square rounded-2xl bg-white overflow-hidden border border-[#E8E2D6]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-white ${
                      activeImageIndex === i ? 'border-[#2E5B82]' : 'border-[#E8E2D6] opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Quick Purchase (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E5B82]">
                {product.category}
              </span>
              <h2 className="text-xl font-bold text-[#27231F] font-heading mt-0.5">
                {product.name}
              </h2>

              <div className="flex items-center gap-1.5 text-xs text-[#5C5449] my-2">
                <div className="flex text-[#D48B38]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D48B38] text-[#D48B38]" />
                  ))}
                </div>
                <span className="font-bold text-[#27231F]">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#27231F] font-heading">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8A8174] line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#5C5449] mt-2 line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Color selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#27231F]">
                Color: <span className="font-normal text-[#5C5449]">{currentColor.name}</span>
              </span>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c);
                      if (c.imageIndex !== undefined) setActiveImageIndex(c.imageIndex);
                    }}
                    className={`w-6 h-6 rounded-full ${c.bgClass} border-2 transition-all cursor-pointer ${
                      currentColor.name === c.name
                        ? 'ring-2 ring-[#2E5B82] ring-offset-1 scale-110'
                        : 'border-[#DDD5C7]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            {product.sizes && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#27231F]">
                  Size: <span className="font-normal text-[#5C5449]">{currentSize}</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        currentSize === s
                          ? 'bg-[#24201D] text-[#FAF8F5] border-[#24201D]'
                          : 'bg-white text-[#27231F] border-[#DDD5C7] hover:border-[#8A8174]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className="w-full py-3 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAdded ? (
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
                onClick={handleFullDetails}
                className="w-full text-center text-xs text-[#2E5B82] hover:text-[#1A3854] font-semibold cursor-pointer"
              >
                View Full Specifications & Reviews →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
