import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Sparkles,
  Tag,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    cartItemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    setIsCheckoutOpen,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCodeInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8E2D6]">
          {/* Top Header */}
          <div className="p-5 border-b border-[#E8E2D6] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2E5B82]" />
              <h2 className="font-bold text-base text-[#27231F] font-heading">
                Your Shopping Bag
              </h2>
              <span className="bg-[#EFE8DC] text-[#5C5449] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#8A8174] hover:text-[#27231F] rounded-lg hover:bg-[#F2ECE1] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#EAF0F6] border-b border-[#C2D8EC]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-[#1A3854]">
                <Truck className="w-3.5 h-3.5 text-[#2E5B82]" />
                {amountToFreeShipping > 0
                  ? `Add $${amountToFreeShipping.toFixed(2)} more for FREE Carbon-Neutral Delivery`
                  : 'You unlocked FREE Carbon-Neutral Delivery!'}
              </span>
              <span className="text-[#2E5B82] font-bold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#C2D8EC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E5B82] rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E8E2D6]">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#E8E2D6] shrink-0 bg-white cursor-pointer"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product-details', item.product.id);
                    }}
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('product-details', item.product.id);
                          }}
                          className="font-bold text-xs sm:text-sm text-[#27231F] line-clamp-1 hover:text-[#2E5B82] cursor-pointer transition-colors"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8A8174] hover:text-[#C85A3F] transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#5C5449] mt-0.5">
                        {item.selectedSize} • {item.selectedColor.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-[#DDD5C7] rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#5C5449] hover:text-[#27231F] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#27231F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#5C5449] hover:text-[#27231F] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-[#27231F] font-heading">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#EFE8DC] text-[#8A8174] rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#27231F]">Your bag is empty</h3>
                <p className="text-xs text-[#5C5449] max-w-xs mx-auto">
                  Discover our new organic tees, chromatic hoodies, and sustainable accessories.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Bottom Summary & Actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8E2D6] bg-[#F5F1E8] space-y-4">
              {/* Promo code input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#EAF2EC] border border-[#BEDBC3] rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-[#3B6B4A] font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#3B6B4A] hover:text-[#C85A3F] font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. GOOGLE10)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#DDD5C7] rounded-xl uppercase font-mono text-[#27231F] focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-[#C85A3F] mt-1">{couponError}</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C5449]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#27231F]">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#3B6B4A] font-medium">
                    <span>Discount</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#27231F]">
                    {cartShipping === 0 ? (
                      <strong className="text-[#3B6B4A] font-bold">FREE</strong>
                    ) : (
                      `$${cartShipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-[#27231F]">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#27231F] pt-2 border-t border-[#DDD5C7]">
                  <span>Estimated Total</span>
                  <span className="text-base font-heading">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8A8174]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B6B4A]" />
                <span>Simulated Secure 256-Bit SSL Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
