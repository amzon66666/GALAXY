import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  PlusCircle, 
  Lock, 
  LogOut, 
  DollarSign, 
  Edit3, 
  Check, 
  Menu, 
  X,
  CreditCard,
  MessageSquareQuote
} from 'lucide-react';

interface NavbarProps {
  onOpenSellModal: () => void;
  onOpenAdminLogin: () => void;
  onOpenAdminPanel: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSellModal,
  onOpenAdminLogin,
  onOpenAdminPanel,
}) => {
  const { 
    currentOnlineCount, 
    setOnlineCount, 
    isAdminLoggedIn, 
    logoutAdmin, 
    currency, 
    setCurrency, 
    settings,
    pendingAccounts
  } = useStore();

  const [isEditingCounter, setIsEditingCounter] = useState(false);
  const [newCounterVal, setNewCounterVal] = useState(currentOnlineCount.toString());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSaveCounter = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(newCounterVal, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setOnlineCount(parsed);
    }
    setIsEditingCounter(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b-2 border-neutral-900 shadow-[0_2px_0_0_#18181b]">
        {/* Top 3-zone contract bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element Brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-neutral-950 text-white flex items-center justify-center font-black text-xl border-2 border-black group-hover:bg-neutral-800 transition-colors shadow-[2px_2px_0_0_#000000]">
                <span className="text-white tracking-tighter">G</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tighter text-neutral-950 uppercase">
                    GALAXY
                  </span>
                  <span className="text-[10px] bg-neutral-950 text-emerald-400 px-1 py-0.2 font-black border border-black">
                    IQ 🇮🇶
                  </span>
                </div>
                <span className="text-[10px] font-bold text-neutral-500 tracking-wider whitespace-nowrap">
                  متجر جالاكسي لحسابات فالورانت
                </span>
              </div>
            </a>

            {/* Live Green Online Counter */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-neutral-50 border border-neutral-900 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              
              {isEditingCounter && isAdminLoggedIn ? (
                <form onSubmit={handleSaveCounter} className="flex items-center gap-1">
                  <input
                    type="number"
                    value={newCounterVal}
                    onChange={(e) => setNewCounterVal(e.target.value)}
                    className="w-16 px-1 py-0.5 text-xs border border-neutral-900 text-emerald-600 font-bold tabular-nums bg-white"
                    autoFocus
                  />
                  <button type="submit" className="p-0.5 bg-neutral-900 text-white hover:bg-black">
                    <Check className="w-3 h-3" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="text-emerald-600 tabular-nums font-black text-sm">
                    {currentOnlineCount.toLocaleString('ar-IQ')}
                  </span>
                  <span className="text-neutral-700 font-medium">متصل بالسيرفر</span>
                  {isAdminLoggedIn && (
                    <button 
                      onClick={() => {
                        setNewCounterVal(currentOnlineCount.toString());
                        setIsEditingCounter(true);
                      }} 
                      title="تعديل الرقم المباشر (للإدارة)"
                      className="text-neutral-400 hover:text-neutral-900 mr-1"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-neutral-700">
            <a href="#servers" className="hover:text-black transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              سيرفرات العراق (بنج 28ms)
            </a>
            <a href="#accounts" className="hover:text-black transition-colors whitespace-nowrap shrink-0">
              الحسابات المعروضة
            </a>
            <a href="#discord-server" className="hover:text-black transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-[#5865F2] font-black">
              سيرفر الديسكورد
            </a>
            <a href="#payment-methods" className="hover:text-black transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-neutral-500" />
              طرق الدفع العراقية
            </a>
            <a href="#customer-reviews" className="hover:text-black transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
              <MessageSquareQuote className="w-4 h-4 text-neutral-500" />
              آراء الزبائن
            </a>
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency selector */}
            <div className="flex items-center border border-neutral-900 bg-white p-0.5 text-xs font-bold">
              <button
                onClick={() => setCurrency('IQD')}
                className={`px-2.5 py-1 transition-colors ${
                  currency === 'IQD'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:text-black'
                }`}
              >
                د.ع IQD
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 transition-colors ${
                  currency === 'USD'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:text-black'
                }`}
              >
                $ USD
              </button>
            </div>

            {/* Sell Account CTA */}
            <button
              onClick={onOpenSellModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border-2 border-neutral-900 transition-colors whitespace-nowrap shrink-0 shadow-[2px_2px_0_0_#18181b]"
            >
              <PlusCircle className="w-4 h-4 text-neutral-900" />
              <span>اعرض حسابك للبيع</span>
            </button>

            {/* Admin control button - ONLY displayed when logged in as admin */}
            {isAdminLoggedIn && (
              <div className="flex items-center gap-1">
                <button
                  onClick={onOpenAdminPanel}
                  className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-black border-2 border-black transition-colors whitespace-nowrap shrink-0 shadow-[2px_2px_0_0_#18181b]"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>لوحة الإدارة</span>
                  {pendingAccounts.length > 0 && (
                    <span className="w-5 h-5 bg-red-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                      {pendingAccounts.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={logoutAdmin}
                  title="تسجيل خروج الإدارة"
                  className="p-2 border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-700"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border border-neutral-900 bg-white"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-neutral-900 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <span className="text-xs text-neutral-500 font-bold">المتصلون الآن بالسيرفر:</span>
              <span className="text-sm font-black text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {currentOnlineCount} لاعب
              </span>
            </div>
            <a
              href="#accounts"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-neutral-800 hover:text-black"
            >
              الحسابات المعروضة للبيع
            </a>
            <a
              href="#payment-methods"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-neutral-800 hover:text-black"
            >
              طرق الدفع العراقية (زين كاش، كي كارد، الرافدين)
            </a>
            <a
              href="#customer-reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-neutral-800 hover:text-black"
            >
              آراء وتقييمات الزبائن
            </a>
            <a
              href="#guarantee"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-neutral-800 hover:text-black"
            >
              ضمان عدم السحب مدى الحياة
            </a>
          </div>
        )}
      </header>

      {/* Persistent Admin Quick Bar if logged in */}
      {isAdminLoggedIn && (
        <div className="bg-neutral-900 text-white text-xs px-4 py-2 border-b border-black flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>أنت مسجل كـ مدير الموقع (Admin Mode)</span>
            <span className="text-neutral-400">· يمكنك تعديل أي حساب، السعر، رقم المتصلين، وإضافة كروت الدفع</span>
          </div>
          <div className="flex items-center gap-2">
            {pendingAccounts.length > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded font-black">
                {pendingAccounts.length} حسابات بانتظار موافقتك!
              </span>
            )}
            <button
              onClick={onOpenAdminPanel}
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-3 py-1 font-black transition-colors"
            >
              فتح لوحة التحكم الشاملة
            </button>
          </div>
        </div>
      )}
    </>
  );
};
