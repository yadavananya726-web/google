import React, { useState } from 'react';
import { Leaf, Truck, RotateCcw, HelpCircle, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const StaticPages: React.FC = () => {
  const { activeView, navigateTo } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (activeView === 'sustainability') {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF2EC] text-[#3B6B4A] border border-[#BEDBC3] rounded-full text-xs font-bold">
              <Leaf className="w-3.5 h-3.5" />
              <span>Our Ecological Commitment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#27231F] font-heading">
              Sustainably Sourced, Consciously Crafted
            </h1>
            <p className="text-sm text-[#5C5449] max-w-xl mx-auto leading-relaxed">
              Every garment and accessory in the Google Merchandise collection is produced with respect for our planet and the craftspeople who make them.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D6] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] text-[#3B6B4A] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-[#27231F] text-base font-heading">100% Organic GOTS Cotton</h3>
              <p className="text-xs text-[#5C5449] leading-relaxed">
                We exclusively use Global Organic Textile Standard (GOTS) certified cotton grown without toxic chemical pesticides or synthetic fertilizers.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D6] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF0F6] text-[#2E5B82] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-[#27231F] text-base font-heading">Zero-Waste Water Facilities</h3>
              <p className="text-xs text-[#5C5449] leading-relaxed">
                Our dying facilities reuse 98% of treated manufacturing water using reverse osmosis filtration, preventing effluent river contamination.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D6] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FDF2F0] text-[#C85A3F] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-[#27231F] text-base font-heading">Carbon-Offset Delivery</h3>
              <p className="text-xs text-[#5C5449] leading-relaxed">
                100% of shipping emissions are offset via certified reforestation projects in collaboration with international climate partners.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-full transition-colors cursor-pointer shadow-sm"
            >
              Shop Sustainable Merch
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'shipping-returns') {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#27231F] font-heading">
              Shipping, Delivery & Returns Policy
            </h1>
            <p className="text-sm text-[#5C5449]">
              Clear, transparent policies for the Google Merchandise Community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D6] space-y-4">
              <div className="flex items-center gap-2 text-[#2E5B82] font-bold text-base font-heading">
                <Truck className="w-5 h-5" />
                <span>Shipping Guidelines</span>
              </div>
              <ul className="space-y-2 text-xs text-[#5C5449] leading-relaxed list-disc pl-5">
                <li>Free carbon-neutral shipping on all domestic orders over $50.</li>
                <li>Orders placed before 2:00 PM PST ship the same business day.</li>
                <li>Standard delivery arrives in 3–5 business days.</li>
                <li>Expedited Courier arrives in 2–3 business days ($12 flat rate).</li>
                <li>Priority Overnight arrives next day by 5:00 PM ($22 flat rate).</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D6] space-y-4">
              <div className="flex items-center gap-2 text-[#3B6B4A] font-bold text-base font-heading">
                <RotateCcw className="w-5 h-5" />
                <span>30-Day Returns Policy</span>
              </div>
              <ul className="space-y-2 text-xs text-[#5C5449] leading-relaxed list-disc pl-5">
                <li>We offer free returns within 30 days of package delivery.</li>
                <li>Items must be in original unworn, unwashed condition with tags attached.</li>
                <li>Pre-paid digital return shipping labels are generated automatically.</li>
                <li>Refunds are credited to the original payment method in 3–5 business days.</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-full transition-colors cursor-pointer shadow-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'faq') {
    const faqs = [
      {
        q: 'Are the apparel items unisex?',
        a: 'Yes, all Google Merchandise T-shirts, hoodies, and jackets are cut in a modern unisex relaxed fit. We recommend sizing up if you prefer an oversized streetwear look.',
      },
      {
        q: 'How do I care for my organic cotton hoodies and tees?',
        a: 'Machine wash on cold inside-out with mild liquid detergent. To prevent shrinkage and extend fabric lifespan, tumble dry low or hang dry.',
      },
      {
        q: 'What is the discount code for students and developers?',
        a: 'Students and developers can use code STUDENT15 at checkout for 15% off their entire order.',
      },
      {
        q: 'Is this an official Google Store?',
        a: 'This website is an academic redesign concept prototype created to showcase high-performance e-commerce UX, responsive layouts, and modern streetwear merchandise design.',
      },
      {
        q: 'How does the free carbon-neutral shipping work?',
        a: 'All orders with a subtotal of $50 or more automatically qualify for free standard carbon-neutral delivery at checkout with zero promo code required.',
      },
    ];

    return (
      <div className="bg-[#FAF8F5] min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF0F6] text-[#2E5B82] border border-[#C2D8EC] rounded-full text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#27231F] font-heading">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5449]">
              Everything you need to know about sizing, materials, shipping, and care.
            </p>
          </div>

          <div className="divide-y divide-[#E8E2D6] border-y border-[#E8E2D6]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm text-[#27231F] hover:text-[#2E5B82] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8A8174] transition-transform ${
                        isOpen ? 'rotate-180 text-[#2E5B82]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-[#5C5449] leading-relaxed pr-6 animate-in fade-in duration-150">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#E8E2D6] text-center space-y-3">
            <h3 className="font-bold text-sm text-[#27231F] font-heading">Still have questions?</h3>
            <p className="text-xs text-[#5C5449]">Our customer care team is here to assist with any questions or order queries.</p>
            <a
              href="mailto:support@merch.google.com"
              className="inline-block px-5 py-2.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
