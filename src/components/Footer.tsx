import React, { useState } from 'react';
import {
  Send,
  Globe,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory, applyCoupon, showNotification } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    applyCoupon('GOOGLE10');
    showNotification('Thank you for subscribing! Use code GOOGLE10 for 10% off your next order.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E2D6] text-[#5C5449] text-xs">
      {/* Top Benefits & Trust Row */}
      <div className="border-b border-[#E8E2D6] py-8 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-[#EAF0F6] text-[#4285F4] shrink-0 border border-[#C2D8EC]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1F2937] text-sm">Easy Shopping</h4>
              <p className="text-[#5C5449] mt-0.5">Explore curated merchandise with smooth navigation.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-[#EAF2EC] text-[#34A853] shrink-0 border border-[#BEDBC3]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1F2937] text-sm">Secure Checkout</h4>
              <p className="text-[#5C5449] mt-0.5">Encrypted payment via Google Pay and major cards.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-[#FAF0E4] text-[#FBBC05] shrink-0 border border-[#F4DCBE]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1F2937] text-sm">Easy Returns</h4>
              <p className="text-[#5C5449] mt-0.5">30-day hassle-free returns and exchanges.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-[#FDF2F0] text-[#EA4335] shrink-0 border border-[#F2D2CC]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1F2937] text-sm">Google Merch Collection</h4>
              <p className="text-[#5C5449] mt-0.5">Everyday lifestyle pieces inspired by Google.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Col (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#4285F4]"></span>
                <span className="w-3 h-3 rounded-full bg-[#EA4335]"></span>
                <span className="w-3 h-3 rounded-full bg-[#FBBC05]"></span>
                <span className="w-3 h-3 rounded-full bg-[#34A853]"></span>
              </div>
              <span className="font-extrabold text-base text-[#1F2937] font-heading">
                Google <span className="text-[#2E5B82]">Merch</span>
              </span>
            </div>

            <p className="text-[#5C5449] leading-relaxed max-w-sm">
              Everyday essentials, statement pieces, and accessories inspired by the world of Google. Official Merchandise Collection prototype.
            </p>

            {/* Newsletter Signup */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#1F2937] mb-2">
                Subscribe for drop alerts & updates
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-[#DDD5C7] rounded-xl text-[#1F2937] placeholder-[#8A8174] focus:outline-none focus:ring-2 focus:ring-[#2E5B82]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#1F2937] hover:bg-[#2E5B82] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>

          {/* Shop Categories (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-[#1F2937] uppercase tracking-wider text-xs font-heading">
              Shop
            </h4>
            <ul className="space-y-2 text-[#5C5449]">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('T-Shirts');
                    navigateTo('shop');
                  }}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Hoodies');
                    navigateTo('shop');
                  }}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  Hoodies
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Accessories');
                    navigateTo('shop');
                  }}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Headwear');
                    navigateTo('shop');
                  }}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  Headwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Bags');
                    navigateTo('shop');
                  }}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Drinkware');
                    navigateTo('shop');
                  }}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  Drinkware
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Shipping (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-[#1F2937] uppercase tracking-wider text-xs font-heading">
              Customer Support
            </h4>
            <ul className="space-y-2 text-[#5C5449]">
              <li>
                <button
                  onClick={() => navigateTo('shipping-returns')}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  Help & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sustainability')}
                  className="hover:text-[#2E5B82] transition-colors cursor-pointer"
                >
                  Product Care Guide
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@merch.google.com"
                  className="hover:text-[#2E5B82] transition-colors inline-block"
                >
                  Contact: support@merch.google.com
                </a>
              </li>
            </ul>
          </div>

          {/* About & Legal (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-[#1F2937] uppercase tracking-wider text-xs font-heading">
              About
            </h4>
            <p className="text-[#5C5449] leading-relaxed">
              Google Merch redesign prototype built for modern web standards, responsive design, and intuitive shopping experiences.
            </p>
            <div className="pt-2 flex items-center gap-2 flex-wrap text-[11px]">
              <button
                onClick={() => navigateTo('shipping-returns')}
                className="hover:text-[#2E5B82] underline transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <span>•</span>
              <button
                onClick={() => navigateTo('shipping-returns')}
                className="hover:text-[#2E5B82] underline transition-colors cursor-pointer"
              >
                Terms
              </button>
              <span>•</span>
              <button
                onClick={() => navigateTo('faq')}
                className="hover:text-[#2E5B82] underline transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#E8E2D6] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8A8174]">
          <p>© 2026 Google Merch. Official Merchandise Collection Prototype.</p>

          <div className="flex items-center gap-2 text-[#5C5449]">
            <Globe className="w-3.5 h-3.5 text-[#2E5B82]" />
            <span>English (US) • USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
