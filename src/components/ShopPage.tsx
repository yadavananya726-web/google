import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Search,
  X,
  ChevronDown,
  ArrowUpDown,
  Grid3X3,
  LayoutGrid,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { SortOption, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

export const ShopPage: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    navigateTo,
  } = useStore();

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(120);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'One Size'];
  const availableTags = ['Best Seller', 'New', 'Eco-Friendly', 'Limited Edition'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(120);
    setSelectedSizes([]);
    setSelectedTags([]);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    minPrice > 0 ||
    maxPrice < 120 ||
    selectedSizes.length > 0 ||
    selectedTags.length > 0 ||
    inStockOnly;

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q) ||
            product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Price range
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }

        // Size filter
        if (selectedSizes.length > 0) {
          if (!product.sizes) return false;
          const hasMatchingSize = selectedSizes.some((s) =>
            product.sizes?.some((ps) => ps.includes(s))
          );
          if (!hasMatchingSize) return false;
        }

        // Tag filter
        if (selectedTags.length > 0) {
          const hasMatchingTag = selectedTags.some((t) =>
            product.tags.includes(t as any)
          );
          if (!hasMatchingTag) return false;
        }

        // In Stock filter
        if (inStockOnly && !product.inStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'best-seller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        // 'featured'
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    minPrice,
    maxPrice,
    selectedSizes,
    selectedTags,
    inStockOnly,
    sortBy,
  ]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 border-b border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[#8A8174] mb-2">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#27231F] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#5C5449] font-medium">Shop Catalog</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-[#2E5B82] font-semibold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#27231F] font-heading">
                {selectedCategory === 'All' ? 'All Merchandise' : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C5449] mt-1">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Controls Bar: Sort, View Grid, Mobile Filter trigger */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-white border border-[#E8E2D6] rounded-xl text-xs font-semibold text-[#27231F] flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#2E5B82]" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              {/* Sort Selector */}
              <div className="relative flex items-center bg-white border border-[#E8E2D6] rounded-xl px-3 py-2 text-xs shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8A8174] mr-2" />
                <span className="text-[#8A8174] mr-1 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent font-semibold text-[#27231F] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="best-seller">Best Sellers</option>
                  <option value="newest">Newest Drops</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Desktop Grid Switcher */}
              <div className="hidden sm:flex items-center bg-white border border-[#E8E2D6] rounded-xl p-1 shadow-2xs">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    gridCols === 3 ? 'bg-[#F2ECE1] text-[#27231F] font-bold' : 'text-[#8A8174] hover:text-[#27231F]'
                  }`}
                  title="3 Columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    gridCols === 4 ? 'bg-[#F2ECE1] text-[#27231F] font-bold' : 'text-[#8A8174] hover:text-[#27231F]'
                  }`}
                  title="4 Columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="mb-6 flex items-center gap-2 flex-wrap text-xs">
            <span className="font-semibold text-[#5C5449]">Active filters:</span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-[#EAF0F6] text-[#2E5B82] font-medium px-2.5 py-1 rounded-full border border-[#C2D8EC]">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="hover:text-[#1A3854] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-[#F2ECE1] text-[#27231F] font-medium px-2.5 py-1 rounded-full border border-[#DDD5C7]">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {(minPrice > 0 || maxPrice < 120) && (
              <span className="inline-flex items-center gap-1.5 bg-[#F2ECE1] text-[#27231F] font-medium px-2.5 py-1 rounded-full border border-[#DDD5C7]">
                Price: ${minPrice} - ${maxPrice}
                <button
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(120);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedSizes.map((sz) => (
              <span
                key={sz}
                className="inline-flex items-center gap-1.5 bg-[#F2ECE1] text-[#27231F] font-medium px-2.5 py-1 rounded-full border border-[#DDD5C7]"
              >
                Size: {sz}
                <button onClick={() => toggleSize(sz)} className="hover:text-black cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {selectedTags.map((tg) => (
              <span
                key={tg}
                className="inline-flex items-center gap-1.5 bg-[#F2ECE1] text-[#27231F] font-medium px-2.5 py-1 rounded-full border border-[#DDD5C7]"
              >
                Tag: {tg}
                <button onClick={() => toggleTag(tg)} className="hover:text-black cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 bg-[#EAF2EC] text-[#3B6B4A] font-medium px-2.5 py-1 rounded-full border border-[#BEDBC3]">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="hover:text-[#23452E] cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-[#C85A3F] hover:text-[#9E3E26] font-bold ml-1 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-[#E8E2D6] shadow-2xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
              <span className="font-bold text-sm text-[#27231F] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2E5B82]" />
                <span>Filters</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#8A8174] hover:text-[#C85A3F] font-semibold cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8A8174]">
                Categories
              </label>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat === 'All'
                      ? products.length
                      : products.filter((p) => p.category === cat).length;
                  const isSelected = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#F2ECE1] text-[#27231F] font-bold border border-[#DDD5C7]'
                          : 'text-[#5C5449] hover:bg-[#FAF8F5] hover:text-[#27231F]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[11px] text-[#8A8174] font-normal">
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-3 border-t border-[#E8E2D6]">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-[#8A8174]">
                  Price Range
                </label>
                <span className="font-bold text-[#27231F]">
                  ${minPrice} — ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E8E2D6] rounded-lg appearance-none cursor-pointer accent-[#2E5B82]"
              />
              <div className="flex justify-between text-[11px] text-[#8A8174]">
                <span>$0</span>
                <span>$60</span>
                <span>$120</span>
              </div>
            </div>

            {/* Sizes Filter */}
            <div className="space-y-2.5 pt-3 border-t border-[#E8E2D6]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8A8174]">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((sz) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#24201D] text-[#FAF8F5] border-[#24201D] shadow-2xs'
                          : 'bg-white text-[#5C5449] border-[#DDD5C7] hover:border-[#8A8174]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tags / Collections Filter */}
            <div className="space-y-2 pt-3 border-t border-[#E8E2D6]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8A8174]">
                Collections & Tags
              </label>
              <div className="space-y-1.5">
                {availableTags.map((tg) => {
                  const isChecked = selectedTags.includes(tg);
                  return (
                    <label
                      key={tg}
                      className="flex items-center gap-2 text-xs font-medium text-[#5C5449] cursor-pointer select-none hover:text-[#27231F]"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTag(tg)}
                        className="rounded border-[#DDD5C7] text-[#2E5B82] focus:ring-[#2E5B82] w-4 h-4 cursor-pointer"
                      />
                      <span>{tg}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-3 border-t border-[#E8E2D6]">
              <label className="flex items-center justify-between text-xs font-semibold text-[#5C5449] cursor-pointer">
                <span>In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#DDD5C7] text-[#2E5B82] focus:ring-[#2E5B82] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            {filteredProducts.length > 0 ? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 4 ? 'lg:grid-cols-3 xl:grid-cols-3' : 'lg:grid-cols-3'
                } gap-6`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D6] space-y-4">
                <div className="w-16 h-16 bg-[#EAF0F6] text-[#2E5B82] rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#27231F] font-heading">
                  No merchandise found
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5449] max-w-md mx-auto">
                  We couldn't find any products matching your specific filter criteria. Try resetting your price or category filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  Reset Filters & View All
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end backdrop-blur-xs">
          <div className="bg-[#FAF8F5] w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D6]">
                <span className="font-bold text-base text-[#27231F]">Filter Merchandise</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#8A8174] hover:text-[#27231F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A8174] block mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-colors ${
                        selectedCategory === cat
                          ? 'bg-[#F2ECE1] border-[#24201D] text-[#27231F] font-bold'
                          : 'bg-white border-[#E8E2D6] text-[#5C5449]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#27231F] mb-2">
                  <span>Price Range</span>
                  <span>Up to ${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2E5B82]"
                />
              </div>

              {/* Mobile Sizes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#8A8174] block mb-2">
                  Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        selectedSizes.includes(sz)
                          ? 'bg-[#24201D] text-[#FAF8F5] border-[#24201D]'
                          : 'bg-white text-[#5C5449] border-[#DDD5C7]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer Actions */}
            <div className="pt-6 border-t border-[#E8E2D6] flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 bg-[#F2ECE1] hover:bg-[#EAE2D3] text-[#27231F] text-xs font-bold rounded-xl"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF8F5] text-xs font-bold rounded-xl"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
