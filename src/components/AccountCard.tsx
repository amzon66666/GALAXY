import React, { useState } from 'react';
import { ValorantAccount } from '../types/store';
import { useStore } from '../context/StoreContext';
import { 
  ChevronRight, 
  ChevronLeft, 
  Images, 
  ShieldCheck, 
  Sword, 
  CreditCard, 
  MessageCircle, 
  Edit3, 
  Trash2, 
  Check, 
  Sparkles,
  ExternalLink,
  Flame
} from 'lucide-react';

interface AccountCardProps {
  account: ValorantAccount;
  onOpenGallery: (account: ValorantAccount, initialIndex?: number) => void;
  onOpenCheckout: (account: ValorantAccount) => void;
  onEditAccount?: (account: ValorantAccount) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  onOpenGallery,
  onOpenCheckout,
  onEditAccount,
}) => {
  const { currency, settings, isAdminLoggedIn, deleteAccount, updateAccount } = useStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isQuickEditingPrice, setIsQuickEditingPrice] = useState(false);
  const [newPriceIQD, setNewPriceIQD] = useState(account.priceIQD.toString());
  const [newPriceUSD, setNewPriceUSD] = useState(account.priceUSD.toString());

  const totalPhotos = account.images ? account.images.length : 0;
  const currentPhoto = account.images?.[activeImageIndex] || account.images?.[0] || '';

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0));
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    const iqd = parseInt(newPriceIQD, 10);
    const usd = parseInt(newPriceUSD, 10);
    if (!isNaN(iqd) && !isNaN(usd)) {
      updateAccount(account.id, {
        priceIQD: iqd,
        priceUSD: usd,
      });
    }
    setIsQuickEditingPrice(false);
  };

  // WhatsApp click handler
  const handleWhatsappInquiry = () => {
    const text = encodeURIComponent(
      `السلام عليكم، أريد شراء الحساب المعروض في متجر فالورانت العراقي:\n\nكود الحساب: ${account.id}\nالعنوان: ${account.title}\nالسعر: ${account.priceIQD.toLocaleString()} دينار عراقي ($${account.priceUSD})\nالرتبة: ${account.rank} (${account.serverRegion})\n\nأرجو إرسال تفاصيل الدفع (زين كاش / كي كارد / رافدين / آسيا سيل) لإكمال الطلب.`
    );
    window.open(`https://wa.me/${settings.supportWhatsapp}?text=${text}`, '_blank');
  };

  // Rank styling badge
  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Radiant':
        return 'text-amber-600 bg-amber-50 border-amber-400';
      case 'Immortal':
        return 'text-rose-600 bg-rose-50 border-rose-400';
      case 'Ascendant':
        return 'text-emerald-700 bg-emerald-50 border-emerald-400';
      case 'Diamond':
        return 'text-purple-600 bg-purple-50 border-purple-300';
      default:
        return 'text-neutral-700 bg-neutral-100 border-neutral-300';
    }
  };

  return (
    <article className="bg-white border-2 border-neutral-900 shadow-[5px_5px_0_0_#18181b] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0_0_#000000] relative">
      
      {/* Top Banner inside card if Store Verified */}
      {account.isStoreVerified && (
        <div className="bg-neutral-900 text-white text-[11px] font-bold px-3 py-1 flex items-center justify-between border-b border-black">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            حساب معتمد مع فحص شامل وضمان عدم السحب OGE
          </span>
          <span className="text-neutral-400 text-[10px] uppercase">
            ID: {account.id}
          </span>
        </div>
      )}

        {/* Main Visual Frame with Multi-Photo Carousel & Small Square GIF */}
      <div className="relative bg-neutral-950 aspect-[16/10] overflow-hidden group select-none">
        
        {/* Active Image */}
        <img
          src={currentPhoto}
          alt={account.title}
          className={`w-full h-full object-cover cursor-pointer transition-transform ${account.status === 'sold' ? 'grayscale-[25%] opacity-90' : ''}`}
          onClick={() => onOpenGallery(account, activeImageIndex)}
          referrerPolicy="no-referrer"
        />

        {/* Big Red English "SOLD" Banner across the entire width of the image */}
        {account.status === 'sold' && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[1px] flex items-center justify-center overflow-hidden pointer-events-none select-none">
            <div className="w-full bg-red-600 border-y-4 border-black py-2.5 sm:py-3.5 -rotate-12 shadow-[0_0_35px_rgba(220,38,38,0.95)] flex flex-col items-center justify-center transform scale-105">
              <span className="text-white font-black text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] uppercase drop-shadow-[2px_2px_0_#000000]">
                SOLD
              </span>
              <span className="text-red-100 font-black text-[10px] sm:text-xs tracking-widest uppercase">
                تم البيع · SOLD OUT
              </span>
            </div>
          </div>
        )}

        {/* Small Square Animated GIF Box (User requested: "Add gif A small small square") */}
        {account.gifUrl && (
          <div 
            className="absolute top-2.5 left-2.5 z-20 group/gif"
            title="مربع GIF متحرك لمعاينة سكنات وفينيشر الحساب"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black border-2 border-white shadow-[2px_2px_0_0_#000000] overflow-hidden relative cursor-pointer hover:scale-105 transition-transform"
                 onClick={() => onOpenGallery(account, activeImageIndex)}>
              <img
                src={account.gifUrl}
                alt="GIF معاينة متحركة"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-neutral-950/90 text-[8px] font-black text-center text-emerald-400 py-0.5 tracking-wider uppercase">
                GIF
              </span>
            </div>
          </div>
        )}

        {/* Photo Counter Badge (Highlighting >20 photos!) */}
        <button
          onClick={() => onOpenGallery(account, activeImageIndex)}
          className="absolute top-2.5 right-2.5 z-20 bg-neutral-900/90 hover:bg-black text-white text-[11px] font-bold px-2.5 py-1 border border-white flex items-center gap-1.5 backdrop-blur-xs transition-colors"
        >
          <Images className="w-3.5 h-3.5 text-emerald-400" />
          <span>{activeImageIndex + 1} / {totalPhotos}</span>
          <span className="hidden sm:inline text-neutral-300">صورة</span>
        </button>

        {/* Carousel Next & Previous Controls */}
        {totalPhotos > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="الصورة السابقة"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-neutral-900/80 hover:bg-black text-white border border-white flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="الصورة التالية"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-neutral-900/80 hover:bg-black text-white border border-white flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Filmstrip Overlay Indicator */}
        <div 
          onClick={() => onOpenGallery(account, activeImageIndex)}
          className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 flex items-center justify-between text-white cursor-pointer"
        >
          <span className="text-xs font-bold text-neutral-200 truncate">
            {account.knifeSkin || 'سكن الميلي المفتوح'}
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 underline underline-offset-2 shrink-0">
            اضغط لتكبير {totalPhotos}+ صورة
          </span>
        </div>
      </div>

      {/* Account Info Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Unboxed Metadata Header (anti-slop clean typography) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-neutral-600 mb-2">
            {account.status === 'sold' ? (
              <span className="px-2 py-0.5 border border-red-700 bg-red-600 text-white text-xs font-black tracking-wide">
                SOLD · مُباع
              </span>
            ) : (
              <span className="px-2 py-0.5 border border-emerald-600 bg-emerald-50 text-emerald-800 text-xs font-bold">
                متاح للبيع
              </span>
            )}
            <span className={`px-2 py-0.5 border text-xs font-black ${getRankColor(account.rank)}`}>
              {account.rank}
            </span>
            <span aria-hidden="true">·</span>
            <span>سيرفر: {account.serverRegion}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">مستوى {account.level}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700">{account.skinsCount} سكن</span>
          </div>

          {/* Account Title */}
          <h3 
            onClick={() => onOpenGallery(account, 0)}
            className="text-base sm:text-lg font-black text-neutral-950 hover:text-neutral-700 cursor-pointer leading-snug tracking-tight mb-2"
          >
            {account.title}
          </h3>

          {/* Featured skins list */}
          <div className="text-xs text-neutral-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-neutral-800">
              <Sword className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
              <span className="truncate">السكين: {account.knifeSkin}</span>
            </div>
            <p className="text-[12px] text-neutral-500 line-clamp-2 leading-relaxed">
              {account.featuredSkins.join(' · ')}
            </p>
          </div>
        </div>

        {/* Guarantee & Seller Info */}
        <div className="pt-3 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${account.status === 'sold' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            <span className="font-semibold">{account.hasOge ? 'إيميل أصلي OGE متاح' : 'معلومات قابلة للتغيير'}</span>
          </div>
          <span className="text-neutral-500 font-medium">{account.sellerCity || 'العراق'}</span>
        </div>

        {/* Pricing & Admin Price Editor */}
        <div className="p-3 bg-neutral-50 border-2 border-neutral-900">
          {isQuickEditingPrice && isAdminLoggedIn ? (
            <form onSubmit={handleSavePrice} className="space-y-2">
              <div className="text-xs font-bold text-neutral-800">تعديل سريع للسعر مباشرة:</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-neutral-500 font-bold block">بالدينار العراقي (IQD):</label>
                  <input
                    type="number"
                    value={newPriceIQD}
                    onChange={(e) => setNewPriceIQD(e.target.value)}
                    className="w-full p-1 text-xs border border-neutral-900 bg-white font-bold"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-500 font-bold block">بالدولار ($ USD):</label>
                  <input
                    type="number"
                    value={newPriceUSD}
                    onChange={(e) => setNewPriceUSD(e.target.value)}
                    className="w-full p-1 text-xs border border-neutral-900 bg-white font-bold"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="px-3 py-1 bg-neutral-900 text-white text-xs font-black hover:bg-black"
                >
                  حفظ السعر فوراً
                </button>
                <button
                  type="button"
                  onClick={() => setIsQuickEditingPrice(false)}
                  className="px-2 py-1 bg-neutral-200 text-neutral-700 text-xs font-bold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-bold text-neutral-500 block">
                  {account.status === 'sold' ? 'السعر الذي تم البيع به:' : 'السعر المطلوب:'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-xl sm:text-2xl font-black tabular-nums ${account.status === 'sold' ? 'text-neutral-500 line-through' : 'text-neutral-950'}`}>
                    {currency === 'IQD'
                      ? `${account.priceIQD.toLocaleString('ar-IQ')} د.ع`
                      : `$${account.priceUSD}`}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500 tabular-nums">
                    {currency === 'IQD'
                      ? `($${account.priceUSD})`
                      : `(${account.priceIQD.toLocaleString()} د.ع)`}
                  </span>
                </div>
              </div>

              {/* Admin price quick toggle button */}
              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    setNewPriceIQD(account.priceIQD.toString());
                    setNewPriceUSD(account.priceUSD.toString());
                    setIsQuickEditingPrice(true);
                  }}
                  className="text-xs text-neutral-800 hover:text-black font-black flex items-center gap-1 border-2 border-neutral-900 px-2 py-1 bg-amber-300 shadow-[1px_1px_0_0_#000000]"
                  title="تعديل السعر بسهولة"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل السعر</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons - Super easy and prominent */}
        <div className="space-y-2 pt-1">
          {account.status === 'sold' ? (
            /* SOLD state banner button */
            <div className="space-y-1.5">
              <div className="w-full py-3 px-4 bg-red-600 text-white font-black text-xs sm:text-sm text-center border-2 border-black flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#000000]">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                <span className="tracking-wider uppercase font-black">تم البيع · SOLD OUT</span>
              </div>
              <button
                onClick={handleWhatsappInquiry}
                className="w-full py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs border border-neutral-900 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>هل تريد حساباً مشابهاً لهذا الحساب؟ راسلنا على واتساب</span>
              </button>
            </div>
          ) : (
            /* 1-Click Instant WhatsApp Buy Button */
            <button
              onClick={handleWhatsappInquiry}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border-2 border-emerald-950 shadow-[3px_3px_0_0_#064e3b]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>شراء سريع بنقرة واحدة عبر واتساب (تسليم فوري)</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {/* Instant Purchase & Iraqi Payment Methods Details */}
            <button
              onClick={() => onOpenCheckout(account)}
              className="w-full py-2.5 px-3 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#000000]"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>{account.status === 'sold' ? 'طرق الدفع العراقية' : 'كروت الدفع العراقية'}</span>
            </button>

            {/* View Full 20+ Photos Gallery */}
            <button
              onClick={() => onOpenGallery(account, 0)}
              className="w-full py-2.5 px-3 bg-white text-neutral-900 font-bold text-xs border-2 border-neutral-900 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#18181b]"
            >
              <Images className="w-3.5 h-3.5 text-neutral-900" />
              <span>معاينة {totalPhotos}+ صورة</span>
            </button>
          </div>
        </div>

        {/* Admin Controls bar inside card */}
        {isAdminLoggedIn && (
          <div className="pt-2 border-t-2 border-neutral-900 bg-amber-50 -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-3 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-neutral-800">
            <span className="text-[11px] text-neutral-600 font-black">تحكم الإدارة السريع:</span>
            
            <div className="flex items-center gap-2 flex-wrap">
              {/* Quick 1-Click Sold Toggle Button */}
              <button
                onClick={() => {
                  const newStatus = account.status === 'sold' ? 'available' : 'sold';
                  updateAccount(account.id, { status: newStatus });
                }}
                className={`px-2.5 py-1 text-xs font-black border-2 flex items-center gap-1.5 transition-all shadow-[2px_2px_0_0_#000000] ${
                  account.status === 'sold'
                    ? 'bg-emerald-400 hover:bg-emerald-300 text-black border-black'
                    : 'bg-red-600 hover:bg-red-700 text-white border-black'
                }`}
                title={account.status === 'sold' ? 'إلغاء البيع وإعادة الحساب كمتاح' : 'تحديد هذا الحساب كمُباع فوراً وإظهار ختم SOLD الأحمر'}
              >
                {account.status === 'sold' ? (
                  <>
                    <span>↩️</span>
                    <span>إلغاء البيع (إعادة كـ متاح)</span>
                  </>
                ) : (
                  <>
                    <span>🏷️</span>
                    <span>تحديد كـ SOLD (مُباع)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onEditAccount && onEditAccount(account)}
                className="px-2 py-1 bg-white hover:bg-neutral-100 border border-neutral-900 text-neutral-900 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                تعديل
              </button>
              <button
                onClick={() => {
                  if (confirm(`هل أنت متأكد من حذف الحساب "${account.title}"؟`)) {
                    deleteAccount(account.id);
                  }
                }}
                className="px-2 py-1 bg-red-100 hover:bg-red-200 border border-red-500 text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                حذف
              </button>
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
