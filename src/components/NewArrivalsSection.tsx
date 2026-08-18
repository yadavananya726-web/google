import React from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const NewArrivalsSection: React.FC = () => {
  const { products, navigateTo, setSelectedCategory } = useStore();

  const freshDrops = products.filter((p) => p.isNewArrival || p.tags.includes('New'));

  return (
    <section className="py-14 sm:py-16 bg-[#FAF8F5] border-b border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#34A853] mb-1">
              <Zap className="w-3.5 h-3.5 fill-[#34A853] text-[#34A853]" />
              <span>Just Arrived</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] font-heading tracking-tight">
              Fresh Drops
            </h2>
            <p className="text-sm text-[#5C5449] mt-1">
              New pieces made for everyday wear.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('shop');
            }}
            className="text-xs font-bold text-[#1F2937] hover:text-[#2E5B82] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>Explore all new arrivals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freshDrops.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
