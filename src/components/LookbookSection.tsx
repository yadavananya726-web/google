import React from 'react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { LOOKBOOK_ITEMS, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const LookbookSection: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="py-16 bg-[#F5F1E8] border-b border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E5B82]">
            <Sparkles className="w-3.5 h-3.5 text-[#D48B38]" />
            <span>Curated Looks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27231F] font-heading tracking-tight">
            Styled with Google
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5449]">
            Versatile, modern everyday fits crafted for campus, studio, hackathons, and coffee runs.
          </p>
        </div>

        {/* Lookbook 3-card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOOKBOOK_ITEMS.map((look) => {
            const lookProducts = PRODUCTS.filter((p) => look.products.includes(p.id));

            return (
              <div
                key={look.id}
                className="group relative rounded-3xl bg-white border border-[#E8E2D6] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Lookbook Cover Photo */}
                <div className="relative aspect-4/5 w-full bg-[#F7F4EE] overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      {look.tags.join(' + ')}
                    </span>
                    <h3 className="text-lg font-bold font-heading mt-1.5">{look.title}</h3>
                    <p className="text-xs text-[#FAF8F5]/90">{look.subtitle}</p>
                  </div>
                </div>

                {/* Tagged Items List */}
                <div className="p-4 bg-white flex-1 flex flex-col justify-between space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8174]">
                    Featured in this look:
                  </span>

                  <div className="space-y-2">
                    {lookProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => navigateTo('product-details', p.id)}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-[#F7F4EE] hover:bg-[#EAE4D9] transition-colors text-left group/item cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-8 h-8 rounded-lg object-cover border border-[#E8E2D6]"
                          />
                          <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-[#27231F] truncate group-hover/item:text-[#2E5B82]">
                              {p.name}
                            </p>
                            <p className="text-[10px] text-[#70675C]">${p.price}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8A8174] group-hover/item:text-[#2E5B82] group-hover/item:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
