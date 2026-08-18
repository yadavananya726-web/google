import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const Header: React.FC = () => {
  const {
    activeView,
    navigateTo,
    cartItemCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setSelectedCategory,
    products,
    setSearchQuery,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const searchResults = localSearch.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.category.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(localSearch.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setSelectedCategory('All');
      navigateTo('shop');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Shop', view: 'shop' as const, category: 'All' },
    { label: 'T-Shirts', view: 'shop' as const, category: 'T-Shirts' },
    { label: 'Hoodies', view: 'shop' as const, category: 'Hoodies' },
    { label: 'Accessories', view: 'shop' as const, category: 'Accessories' },
    { label: 'New Arrivals', view: 'shop' as const, tag: 'New' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md transition-all duration-200 border-b border-[#E8E2D6]">
      {/* Top Announcement Bar */}
      <div className="bg-[#24201D] text-[#EDE7DF] text-xs font-medium py-2 px-4 border-b border-[#36302B]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-[#CFC6B8]">
            <span className="flex items-center gap-1.5 text-[#EDE7DF]">
              <Truck className="w-3.5 h-3.5 text-[#52B788]" />
              <span>Free carbon-neutral shipping over $50</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#7CA1CC]" />
              <span>30-Day Hassle-Free Returns</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#CFC6B8] text-xs">
            <span className="hidden sm:inline text-[#E8B87A] font-medium">
              Use code <strong className="font-bold underline text-[#F7D8A8]">GOOGLE10</strong> for 10% off
            </span>
            <button
              onClick={() => navigateTo('sustainability')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sustainability
            </button>
            <button
              onClick={() => navigateTo('faq')}
              className="hidden sm:inline hover:text-white transition-colors cursor-pointer"
            >
              Help & FAQ
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all ${
          isScrolled ? 'py-3' : 'py-3.5'
        } flex items-center justify-between gap-4`}
      >
        {/* Left: Mobile Menu & Brand Logo */}
        <div className="flex items-center gap-3 md:gap-8">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#4A433A] hover:text-[#27231F] rounded-xl hover:bg-[#F0EAE0] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              navigateTo('home');
            }}
            className="group flex items-center gap-2.5 text-left cursor-pointer focus:outline-none"
            aria-label="Go to Google Merchandise Home"
          >
            {/* Google 4-Color Mark in Harmonized Natural Tones */}
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-[#4285F4] transition-transform group-hover:scale-110"></span>
              <span className="w-3 h-3 rounded-full bg-[#EA4335] transition-transform group-hover:scale-110"></span>
              <span className="w-3 h-3 rounded-full bg-[#FBBC05] transition-transform group-hover:scale-110"></span>
              <span className="w-3 h-3 rounded-full bg-[#34A853] transition-transform group-hover:scale-110"></span>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#27231F] font-heading">
                Google <span className="text-[#2E5B82]">Merch</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#70675C] -mt-1 hidden sm:inline">
                Official Merchandise Collection
              </span>
            </div>
          </button>
        </div>

        {/* Middle: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive =
              (link.label === 'Home' && activeView === 'home') ||
              (link.label === 'Shop' && activeView === 'shop');

            return (
              <button
                key={link.label}
                onClick={() => {
                  if (link.category) {
                    setSelectedCategory(link.category);
                    setSearchQuery('');
                  }
                  navigateTo(link.view);
                }}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#27231F] bg-[#EFE8DC] font-semibold shadow-2xs'
                    : 'text-[#5C5449] hover:text-[#27231F] hover:bg-[#F2ECE1]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Wishlist, Bag) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Search Trigger */}
          <button
            id="header-search-btn"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-[#5C5449] hover:text-[#27231F] rounded-full hover:bg-[#F0EAE0] transition-colors flex items-center gap-2 cursor-pointer"
            aria-label="Search merchandise"
          >
            <Search className="w-5 h-5" />
            <span className="hidden xl:inline text-xs font-normal text-[#8A8174] pr-1">Search store...</span>
          </button>

          {/* Wishlist Button */}
          <button
            id="header-wishlist-btn"
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-[#5C5449] hover:text-[#27231F] rounded-full hover:bg-[#F0EAE0] transition-colors cursor-pointer"
            aria-label="View saved wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C85A3F] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            id="header-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] pl-3.5 pr-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
            aria-label={`Cart with ${cartItemCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#52B788]" />
            <span>Bag</span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[11px] font-bold min-w-[20px] text-center">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Live Search Bar */}
      {isSearchOpen && (
        <div className="border-b border-[#E8E2D6] bg-[#FAF8F5] px-4 py-4 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#8A8174]" />
              <input
                ref={searchInputRef}
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search tees, hoodies, caps, totes, ceramic mugs..."
                className="w-full pl-12 pr-24 py-3 bg-[#F4EFE6] border border-[#DDD5C7] rounded-2xl text-sm text-[#27231F] placeholder-[#8A8174] focus:outline-none focus:ring-2 focus:ring-[#2E5B82] focus:bg-white transition-all shadow-inner"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch('')}
                  className="absolute right-14 text-xs text-[#8A8174] hover:text-[#27231F]"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 px-3.5 py-1.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Quick Autocomplete Suggestions */}
            {localSearch.trim() && (
              <div className="mt-3 bg-white rounded-xl border border-[#E8E2D6] p-2 divide-y divide-[#F0EAE0]">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigateTo('product-details', item.id);
                        setIsSearchOpen(false);
                        setLocalSearch('');
                      }}
                      className="w-full flex items-center justify-between p-2 hover:bg-[#FAF8F5] rounded-lg text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-md border border-[#E8E2D6]"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#27231F]">{item.name}</p>
                          <p className="text-xs text-[#70675C]">{item.category} • ${item.price}</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#2E5B82] font-medium flex items-center gap-1">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-[#8A8174] p-3 text-center">
                    No products matched "{localSearch}". Press Enter to view full catalog.
                  </p>
                )}
              </div>
            )}

            {/* Trending tags */}
            <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs text-[#70675C]">
              <span className="font-semibold text-[#27231F]">Popular:</span>
              {['Hoodie', 'Ceramic Tumbler', 'Dad Cap', 'Canvas Tote', 'Organic Cotton'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setLocalSearch(tag);
                    setSearchQuery(tag);
                    setSelectedCategory('All');
                    navigateTo('shop');
                    setIsSearchOpen(false);
                  }}
                  className="px-2.5 py-1 bg-[#EFE8DC] hover:bg-[#E4DBCB] text-[#4A433A] rounded-full transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[108px] bg-black/40 z-50 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] w-4/5 max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200 border-r border-[#E8E2D6]">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D6]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A8174]">Navigation</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#8A8174] hover:text-[#27231F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      if (link.category) setSelectedCategory(link.category);
                      navigateTo(link.view);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between py-3 px-3 rounded-xl text-left text-base font-semibold text-[#27231F] hover:bg-[#F2ECE1] hover:text-[#2E5B82] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#8A8174]" />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E8E2D6]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8A8174] mb-3">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        navigateTo('shop');
                        setIsMobileMenuOpen(false);
                      }}
                      className="p-2.5 bg-[#F2ECE1] hover:bg-[#EAE2D3] hover:text-[#27231F] rounded-xl text-xs font-semibold text-[#4A433A] text-left transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E2D6] space-y-3 text-xs text-[#70675C]">
              <div className="flex items-center gap-2 text-[#27231F] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#2E5B82]" />
                <span>100% Authentic Google Merchandise</span>
              </div>
              <p>© Google Merchandise Store Redesign. Academic Prototype.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
