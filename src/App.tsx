import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Hero } from './components/Hero';
import { IconicServersHub } from './components/IconicServersHub';
import { DiscordServerProfile } from './components/DiscordServerProfile';
import { AccountCard } from './components/AccountCard';
import { GalleryModal } from './components/GalleryModal';
import { AccountDetailModal } from './components/AccountDetailModal';
import { SellAccountModal } from './components/SellAccountModal';
import { PaymentMethodsSection } from './components/PaymentMethodsSection';
import { CustomerReviewsBox } from './components/CustomerReviewsBox';
import { GuaranteeSection } from './components/GuaranteeSection';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ValorantAccount } from './types/store';
import { 
  Zap,
  Lock
} from 'lucide-react';

function StoreMain() {
  const { accounts, isAdminLoggedIn, logoutAdmin } = useStore();

  // Clean, simple filter: by server region only (no cluttered search or rank tags)
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'level'>('featured');

  // Modals state
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  
  // Gallery Modal
  const [galleryAccount, setGalleryAccount] = useState<ValorantAccount | null>(null);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  // Account Detail / Checkout Modal
  const [checkoutAccount, setCheckoutAccount] = useState<ValorantAccount | null>(null);

  // Calculate accounts count by region (available accounts)
  const accountsCountByRegion = useMemo(() => {
    const counts: Record<string, number> = { TR: 0, EU: 0, MENA: 0, NA: 0 };
    accounts.forEach((acc) => {
      if (acc.status === 'available') {
        counts[acc.serverRegion] = (counts[acc.serverRegion] || 0) + 1;
      }
    });
    return counts;
  }, [accounts]);

  // Clean, fast account filtering (shows available and sold accounts; hides pending user submissions)
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      // Only hide pending approval from public view (admin approves them)
      if (account.status === 'pending_approval') return false;

      // Region filter if user clicked a server
      if (selectedRegion !== 'all' && account.serverRegion !== selectedRegion) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Keep available accounts on top, sold accounts following
      if (a.status === 'available' && b.status === 'sold') return -1;
      if (a.status === 'sold' && b.status === 'available') return 1;

      if (sortBy === 'price_low') return a.priceIQD - b.priceIQD;
      if (sortBy === 'price_high') return b.priceIQD - a.priceIQD;
      if (sortBy === 'level') return b.level - a.level;
      return 0; // featured default
    });
  }, [accounts, selectedRegion, sortBy]);

  const handleOpenGallery = (account: ValorantAccount, initialIndex = 0) => {
    setGalleryAccount(account);
    setGalleryInitialIndex(initialIndex);
  };

  const handleOpenCheckout = (account: ValorantAccount) => {
    setCheckoutAccount(account);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col antialiased selection:bg-neutral-950 selection:text-white">
      {/* Top Announcement Bar */}
      <AnnouncementBanner />

      {/* Top Bar Header */}
      <Navbar
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section (Clean, without search or rank clutters) */}
        <Hero
          onOpenSellModal={() => setIsSellModalOpen(true)}
        />

        {/* 2. Iconic Valorant Servers Hub (إسطنبول TR، فرانكفورت EU، البحرين MENA) with Iraqi Pings */}
        <div id="servers">
          <IconicServersHub
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            accountsCountByRegion={accountsCountByRegion}
          />
        </div>

        {/* 3. Discord Server Profile Widget & Invite Link */}
        <DiscordServerProfile />

        {/* 4. Dedicated Accounts Grid Section */}
        <section id="accounts" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-neutral-900">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-neutral-100 border border-neutral-900 text-xs font-bold text-neutral-800 mb-1">
                  <span>سوق الحسابات المباشر</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-neutral-950">
                  الحسابات المتوفرة للبيع (فحص +20 صورة لكل حساب)
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-semibold mt-1">
                  كل حساب يحتوي على صندوق خاص به مع أكثر من 20 صورة تفصيلية ومربع GIF متحرك وشراء سريع بنقرة واحدة
                </p>
              </div>

              {/* Sort & Count */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-neutral-500 tabular-nums">
                  يعرض {filteredAccounts.length} من أصل {accounts.length} حساب
                </span>

                <div className="flex items-center gap-1 border border-neutral-900 px-2 py-1 bg-white text-xs font-bold">
                  <span className="text-neutral-500">ترتيب:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent font-bold text-neutral-900 focus:outline-none cursor-pointer"
                  >
                    <option value="featured">المميز أولاً</option>
                    <option value="price_low">السعر: من الأقل للأعلى</option>
                    <option value="price_high">السعر: من الأعلى للأقل</option>
                    <option value="level">مستوى الحساب</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Boxes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {filteredAccounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onOpenGallery={handleOpenGallery}
                  onOpenCheckout={handleOpenCheckout}
                  onEditAccount={() => setIsAdminPanelOpen(true)}
                />
              ))}
            </div>

            {/* Sell Account Prompt Banner below grid */}
            <div className="mt-12 p-6 bg-neutral-950 text-white border-2 border-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-[6px_6px_0_0_#000000]">
              <div className="space-y-1 text-center md:text-right">
                <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">
                  سوق اللاعبين العراقي المفتوح
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  عندك حساب فالورانت وتريد تبيعه وتستلم فلوسك مباشرة؟
                </h3>
                <p className="text-xs text-neutral-300 font-medium">
                  اعرض حسابك الآن، حدد سعرك بالدينار العراقي أو الدولار بحرية، وارفع أكثر من 20 صورة. سنفحص الحساب ونوافق عليه فوراً.
                </p>
              </div>

              <button
                onClick={() => setIsSellModalOpen(true)}
                className="px-6 py-3 bg-white text-neutral-950 font-black text-xs border-2 border-white hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0 shadow-[2px_2px_0_0_#ffffff]"
              >
                اعرض حسابك للبيع الآن (موافقة سريعة)
              </button>
            </div>

          </div>
        </section>

        {/* 5. Iraqi Payment Methods Section (Rafidain, Qi Card, Zain Cash, Asia Cell, Visa) */}
        <PaymentMethodsSection
          onOpenAddCardModal={() => setIsAdminPanelOpen(true)}
          onEditCard={() => setIsAdminPanelOpen(true)}
        />

        {/* 6. Customer Opinions & Reviews Box */}
        <CustomerReviewsBox />

        {/* 7. Security & Lifetime Warranty Section */}
        <GuaranteeSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
      />

      {/* Floating Admin Controls - ONLY VISIBLE WHEN LOGGED IN AS ADMIN */}
      {isAdminLoggedIn && (
        <div className="fixed bottom-4 left-4 z-40 flex items-center gap-1.5 p-1 bg-neutral-900 border-2 border-emerald-400 shadow-[3px_3px_0_0_#000000]">
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-black flex items-center gap-1.5 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>لوحة التحكم (الآدمن)</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="px-2 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-bold"
            title="تسجيل خروج الإدارة"
          >
            خروج
          </button>
        </div>
      )}

      {/* Modals */}
      {/* 1. Full 20+ Photos Gallery Lightbox Modal */}
      <GalleryModal
        account={galleryAccount}
        initialIndex={galleryInitialIndex}
        onClose={() => setGalleryAccount(null)}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* 2. Instant Checkout / Detail Modal */}
      <AccountDetailModal
        account={checkoutAccount}
        onClose={() => setCheckoutAccount(null)}
        onOpenGallery={(acc) => handleOpenGallery(acc, 0)}
      />

      {/* 3. Sell Account Modal (Users offer their account with custom price & >20 photos) */}
      <SellAccountModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />

      {/* 4. Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => setIsAdminPanelOpen(true)}
      />

      {/* 5. Admin Comprehensive Control Panel */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onEditAccountDetail={() => {}}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreMain />
    </StoreProvider>
  );
}
