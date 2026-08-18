import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    navigateTo,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8E2D6]">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2D6] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-[#C85A3F] text-[#C85A3F]" />
              <h2 className="font-bold text-base text-[#27231F] font-heading">
                Your Saved Wishlist
              </h2>
              <span className="bg-[#FDF2F0] text-[#C85A3F] border border-[#F2D2CC] text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#8A8174] hover:text-[#27231F] rounded-lg hover:bg-[#F2ECE1] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E8E2D6]">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((prod) => (
                <div key={prod.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#E8E2D6] shrink-0 cursor-pointer bg-white"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateTo('product-details', prod.id);
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            navigateTo('product-details', prod.id);
                          }}
                          className="font-bold text-xs sm:text-sm text-[#27231F] line-clamp-1 hover:text-[#2E5B82] cursor-pointer transition-colors"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="text-[#8A8174] hover:text-[#C85A3F] transition-colors p-1 cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-bold text-[#27231F] mt-1">${prod.price}</p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(prod);
                        toggleWishlist(prod.id);
                      }}
                      className="mt-2 py-1.5 px-3 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#FDF2F0] text-[#C85A3F] rounded-full flex items-center justify-center mx-auto border border-[#F2D2CC]">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#27231F]">Your wishlist is empty</h3>
                <p className="text-xs text-[#5C5449] max-w-xs mx-auto">
                  Save products you like by clicking the heart icon on any card.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 border-t border-[#E8E2D6] bg-[#F5F1E8]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add All to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
