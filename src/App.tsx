import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { BestSellersSection } from './components/BestSellersSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { PromoBanner } from './components/PromoBanner';
import { LookbookSection } from './components/LookbookSection';
import { ShopPage } from './components/ShopPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { StaticPages } from './components/StaticPages';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastNotification } from './components/ToastNotification';

const StoreContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#27231F]">
      {/* Navigation Header */}
      <Header />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection />
            <FeaturedCategories />
            <BestSellersSection />
            <PromoBanner />
            <NewArrivalsSection />
            <LookbookSection />
          </>
        )}

        {activeView === 'shop' && <ShopPage />}

        {activeView === 'product-details' && <ProductDetailsPage />}

        {(activeView === 'sustainability' ||
          activeView === 'shipping-returns' ||
          activeView === 'faq') && <StaticPages />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <CheckoutModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
