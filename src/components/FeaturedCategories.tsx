import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import googleStripeHoodieImg from '../assets/images/google_stripe_hoodie_1787070604507.jpg';
import youtubeGreySweatshirtImg from '../assets/images/youtube_grey_sweatshirt_1787071571013.jpg';
import googleRainbowPinImg from '../assets/images/google_rainbow_pin_1787071703705.jpg';
import googleTimbuk2BackpackImg from '../assets/images/google_timbuk2_backpack_1787071839243.jpg';
import googleWhiteBottleImg from '../assets/images/google_white_bottle_1787071988765.jpg';

interface CategoryItem {
  name: ProductCategory;
  title: string;
  tagline: string;
  image: string;
  accentBorder: string;
}

const CATEGORY_DATA: CategoryItem[] = [
  {
    name: 'T-Shirts',
    title: 'T-Shirts',
    tagline: 'Classic & Minimalist Tops',
    image: youtubeGreySweatshirtImg,
    accentBorder: 'group-hover:border-[#4285F4]',
  },
  {
    name: 'Hoodies',
    title: 'Hoodies',
    tagline: 'Pullover Fleece & Layers',
    image: googleStripeHoodieImg,
    accentBorder: 'group-hover:border-[#EA4335]',
  },
  {
    name: 'Accessories',
    title: 'Accessories',
    tagline: 'Enamel Pins, Socks & Gifts',
    image: googleRainbowPinImg,
    accentBorder: 'group-hover:border-[#FBBC05]',
  },
  {
    name: 'Headwear',
    title: 'Headwear',
    tagline: 'Everyday Caps & Beanies',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    accentBorder: 'group-hover:border-[#34A853]',
  },
  {
    name: 'Bags',
    title: 'Bags',
    tagline: 'Timbuk2 Packs & Daily Commuters',
    image: googleTimbuk2BackpackImg,
    accentBorder: 'group-hover:border-[#4285F4]',
  },
  {
    name: 'Drinkware',
    title: 'Drinkware',
    tagline: 'Insulated Bottles & Tumblers',
    image: googleWhiteBottleImg,
    accentBorder: 'group-hover:border-[#EA4335]',
  },
];

export const FeaturedCategories: React.FC = () => {
  const { setSelectedCategory, setSearchQuery, navigateTo } = useStore();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery('');
    navigateTo('shop');
  };

  return (
    <section className="py-14 sm:py-16 bg-[#FAF8F5] border-b border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E5B82] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
              <span>Browse Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] font-heading tracking-tight">
              Shop by Category
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('shop');
            }}
            className="text-xs font-bold text-[#1F2937] hover:text-[#2E5B82] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORY_DATA.map((cat) => (
            <button
              key={cat.name}
              id={`cat-card-${cat.name}`}
              onClick={() => handleCategorySelect(cat.name)}
              className={`group relative flex flex-col rounded-2xl bg-white border border-[#E8E2D6] p-3.5 hover:shadow-lg ${cat.accentBorder} transition-all duration-200 text-left overflow-hidden cursor-pointer`}
            >
              {/* Image Thumbnail */}
              <div className="relative aspect-square w-full rounded-xl bg-[#F8F9FA] overflow-hidden mb-3 border border-[#EAE4D9]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Title & Tagline */}
              <h3 className="font-bold text-sm text-[#1F2937] group-hover:text-[#2E5B82] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#70675C] truncate mt-0.5">
                {cat.tagline}
              </p>

              <div className="mt-2.5 pt-2 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] font-semibold text-[#8A8174] group-hover:text-[#2E5B82]">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
