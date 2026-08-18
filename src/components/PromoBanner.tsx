import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromoBanner: React.FC = () => {
  const { navigateTo, applyCoupon, setSelectedCategory } = useStore();
  const [copied, setCopied] = useState(false);

  const promoCode = 'GOOGLE10';

  const handleCopy = () => {
    navigator.clipboard?.writeText(promoCode);
    applyCoupon(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-[#E8E2D6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#FAF8F5] border border-[#E8E2D6] p-8 sm:p-12 overflow-hidden shadow-sm">
          {/* Top 4-Color Google Strip */}
          <div className="absolute top-0 inset-x-0 h-1.5 flex">
            <div className="flex-1 bg-[#4285F4]" />
            <div className="flex-1 bg-[#EA4335]" />
            <div className="flex-1 bg-[#FBBC05]" />
            <div className="flex-1 bg-[#34A853]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DDD5C7] text-xs font-semibold text-[#1F2937] shadow-2xs">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                  <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                  <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                  <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                </div>
                <span className="text-[#70675C]">Official Google Merch</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#1F2937] tracking-tight">
                Your everyday essentials, upgraded.
              </h2>

              <p className="text-sm sm:text-base text-[#5C5449] max-w-2xl leading-relaxed">
                Discover new colours, classic designs and fresh merchandise.
              </p>

              {/* Action Buttons and Coupon */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  id="promo-explore-collection-btn"
                  onClick={() => {
                    setSelectedCategory('All');
                    navigateTo('shop');
                  }}
                  className="px-7 py-3.5 bg-[#1F2937] hover:bg-[#2E5B82] text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-2 bg-white border border-[#DDD5C7] px-4 py-2.5 rounded-full shadow-2xs">
                  <span className="text-xs text-[#70675C]">Use code:</span>
                  <span className="font-mono text-xs font-bold text-[#1F2937] tracking-wider">
                    {promoCode}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-[#F2ECE1] rounded-full text-[#70675C] hover:text-[#1F2937] transition-colors cursor-pointer ml-1"
                    title="Copy code & apply"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#34A853]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Graphic / Accent Pill Badges */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D6] shadow-2xs flex flex-col justify-between">
                <span className="w-3 h-3 rounded-full bg-[#4285F4] mb-3" />
                <div>
                  <p className="text-xs font-bold text-[#1F2937]">Google Blue</p>
                  <p className="text-[11px] text-[#70675C]">Signature styling</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D6] shadow-2xs flex flex-col justify-between">
                <span className="w-3 h-3 rounded-full bg-[#EA4335] mb-3" />
                <div>
                  <p className="text-xs font-bold text-[#1F2937]">Google Red</p>
                  <p className="text-[11px] text-[#70675C]">Dynamic accents</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D6] shadow-2xs flex flex-col justify-between">
                <span className="w-3 h-3 rounded-full bg-[#FBBC05] mb-3" />
                <div>
                  <p className="text-xs font-bold text-[#1F2937]">Google Yellow</p>
                  <p className="text-[11px] text-[#70675C]">Vibrant touches</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D6] shadow-2xs flex flex-col justify-between">
                <span className="w-3 h-3 rounded-full bg-[#34A853] mb-3" />
                <div>
                  <p className="text-xs font-bold text-[#1F2937]">Google Green</p>
                  <p className="text-[11px] text-[#70675C]">Everyday comfort</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
