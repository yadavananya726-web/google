import React from 'react';
import { ArrowRight, ShoppingBag, Eye, ShieldCheck, Sparkles, RefreshCw, CreditCard } from 'lucide-react';
import { HERO_PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { navigateTo, addToCart, setQuickViewProduct, setSelectedCategory } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#E8E2D6]">
      {/* Subtle Background Glow Accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#4285F4]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 right-1/4 w-96 h-96 bg-[#34A853]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Eyebrow Pill */}
        <div className="flex justify-center md:justify-start mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDD5C7] shadow-2xs text-xs font-semibold text-[#27231F]">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
              <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            </div>
            <span className="text-[#5C5449]">Official Merchandise Collection</span>
            <span className="text-[#DDD5C7]">|</span>
            <span className="text-[#2E5B82] font-bold">New 2026 Drop</span>
          </div>
        </div>

        {/* Hero Top Grid: Headline + Copy + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8 text-center md:text-left space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1F2937] font-heading leading-[1.12]">
              Made for the{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-[#2E5B82]">
                  Google Generation.
                </span>
                <span className="absolute bottom-1.5 left-0 w-full h-3 bg-[#FBBC05]/30 -z-1 rounded-sm" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5C5449] max-w-2xl font-normal leading-relaxed mx-auto md:mx-0">
              Shop everyday essentials, statement pieces and accessories inspired by the world of Google.
            </p>
          </div>

          {/* CTAs */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-end justify-center md:justify-start lg:justify-end gap-3">
            <button
              id="hero-shop-bestsellers-btn"
              onClick={() => {
                setSelectedCategory('All');
                navigateTo('shop');
              }}
              className="px-6 py-3.5 bg-[#1F2937] hover:bg-[#2E5B82] text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Shop Best Sellers</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-explore-new-arrivals-btn"
              onClick={() => {
                setSelectedCategory('All');
                navigateTo('shop');
              }}
              className="px-6 py-3.5 bg-white hover:bg-[#F2ECE1] text-[#1F2937] font-semibold text-sm rounded-full border border-[#DDD5C7] shadow-2xs hover:border-[#BDB5A7] transition-all flex items-center justify-center cursor-pointer"
            >
              Explore New Arrivals
            </button>
          </div>
        </div>

        {/* 3-4 Showcase Merchandise Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HERO_PRODUCTS.map((product, index) => {
            const accentColors = ['border-t-[#4285F4]', 'border-t-[#EA4335]', 'border-t-[#FBBC05]', 'border-t-[#34A853]'];
            const accentTopClass = accentColors[index % accentColors.length];

            return (
              <div
                key={product.id}
                id={`hero-card-${product.id}`}
                className={`group relative bg-white rounded-2xl border border-[#E8E2D6] ${accentTopClass} border-t-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                {/* Product Image Container */}
                <div className="relative aspect-square w-full bg-[#F8F9FA] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2.5 py-1 bg-[#1F2937]/90 backdrop-blur-xs text-white text-[11px] font-bold rounded-full shadow-2xs">
                      {product.badge || 'Essential'}
                    </span>
                  </div>

                  {/* Quick Action Overlay Buttons */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="p-2.5 bg-white/95 hover:bg-white text-[#1F2937] rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="Quick view"
                      aria-label={`Quick view ${product.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2.5 bg-[#1F2937] hover:bg-[#2E5B82] text-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="Quick add to bag"
                      aria-label={`Add ${product.name} to bag`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#70675C]">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => navigateTo('product-details', product.id)}
                      className="text-sm sm:text-base font-bold text-[#1F2937] group-hover:text-[#2E5B82] transition-colors cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-[#F2ECE1]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-[#1F2937]">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#8A8174] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => navigateTo('product-details', product.id)}
                      className="text-xs font-semibold text-[#2E5B82] hover:text-[#1F2937] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits & Trust Strip below Hero */}
        <div className="mt-10 pt-6 border-t border-[#E8E2D6] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/70 border border-[#E8E2D6]/70 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1F2937]">Easy Shopping</p>
              <p className="text-[11px] text-[#5C5449]">Curated Google-inspired merchandise & fast navigation</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/70 border border-[#E8E2D6]/70 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#34A853]/10 text-[#34A853] flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1F2937]">Secure Checkout</p>
              <p className="text-[11px] text-[#5C5449]">Protected payments with Google Pay & all major cards</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/70 border border-[#E8E2D6]/70 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1F2937]">Easy Returns</p>
              <p className="text-[11px] text-[#5C5449]">Hassle-free 30-day returns and item exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
