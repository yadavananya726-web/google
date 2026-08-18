import React, { useState } from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const BestSellersSection: React.FC = () => {
  const { products, navigateTo, setSelectedCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'All' | 'Apparel' | 'Accessories & Drinkware'>('All');

  // Filter for best seller products
  const bestSellers = products.filter((p) => p.isBestSeller || p.tags.includes('Best Seller'));

  const filteredItems =
    activeTab === 'All'
      ? bestSellers
      : activeTab === 'Apparel'
      ? bestSellers.filter((p) => p.category === 'T-Shirts' || p.category === 'Hoodies')
      : bestSellers.filter((p) => p.category === 'Accessories' || p.category === 'Headwear' || p.category === 'Bags' || p.category === 'Drinkware');

  return (
    <section className="py-14 sm:py-16 bg-[#F8F9FA] border-b border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EA4335] mb-1">
              <Flame className="w-4 h-4 fill-[#EA4335] text-[#EA4335]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] font-heading tracking-tight">
              Best Sellers
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Apparel', 'Accessories & Drinkware'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#1F2937] text-white shadow-xs'
                    : 'bg-white text-[#5C5449] hover:bg-[#F2ECE1] border border-[#DDD5C7]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Products Grid (3 columns on desktop / 2 on tablet / 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('shop');
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-[#F2ECE1] text-[#1F2937] font-semibold text-xs rounded-full border border-[#DDD5C7] shadow-2xs hover:border-[#BDB5A7] transition-all cursor-pointer"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1F2937]" />
          </button>
        </div>
      </div>
    </section>
  );
};
