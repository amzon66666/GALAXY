import React, { useState, useEffect } from 'react';
import { ValorantAccount } from '../types/store';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Images, 
  CreditCard, 
  ShieldCheck, 
  Sword, 
  Upload, 
  Check, 
  Trash2,
  Sparkles
} from 'lucide-react';

interface GalleryModalProps {
  account: ValorantAccount | null;
  initialIndex?: number;
  onClose: () => void;
  onOpenCheckout: (account: ValorantAccount) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  account,
  initialIndex = 0,
  onClose,
  onOpenCheckout,
}) => {
  if (!account) return null;

  const { currency, updateAccount, isAdminLoggedIn } = useStore();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [uploadNotice, setUploadNotice] = useState('');

  const photos = account.images || [];
  const totalPhotos = photos.length;

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // In RTL, ArrowRight usually goes to previous, or standard next
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalPhotos]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1));
  };

  // Add photos via file upload (supporting batch upload of 20+ images)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push(event.target.result as string);
        }
        processed++;
        if (processed === files.length) {
          const updated = [...photos, ...newPhotos];
          updateAccount(account.id, { images: updated });
          setUploadNotice(`تمت إضافة ${newPhotos.length} صورة بنجاح إلى المعرض! الإجمالي الآن: ${updated.length} صورة.`);
          setTimeout(() => setUploadNotice(''), 4000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add photo via direct URL
  const handleAddPhotoByUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    const updated = [...photos, newPhotoUrl.trim()];
    updateAccount(account.id, { images: updated });
    setNewPhotoUrl('');
    setUploadNotice(`تمت إضافة الصورة بنجاح! الإجمالي الآن: ${updated.length} صورة.`);
    setTimeout(() => setUploadNotice(''), 4000);
  };

  // Delete current photo if admin
  const handleDeleteCurrentPhoto = () => {
    if (photos.length <= 1) {
      alert('لا يمكن حذف الصورة الوحيدة المتبقية في الحساب.');
      return;
    }
    if (confirm(`هل أنت متأكد من حذف الصورة رقم ${currentIndex + 1}؟`)) {
      const updated = photos.filter((_, idx) => idx !== currentIndex);
      updateAccount(account.id, { images: updated });
      setCurrentIndex((prev) => Math.min(prev, updated.length - 1));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      
      {/* Modal Container: White with Elegant Black Edges */}
      <div className="relative w-full max-w-6xl bg-white border-2 border-neutral-900 shadow-[8px_8px_0_0_#000000] flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center border border-white font-black text-sm">
              V
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black truncate max-w-xl text-white">
                {account.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-semibold">
                <span className="text-emerald-400 font-bold">
                  صورة {currentIndex + 1} من أصل {totalPhotos} صورة تفصيلية
                </span>
                <span aria-hidden="true">·</span>
                <span>سيرفر {account.serverRegion}</span>
                <span aria-hidden="true">·</span>
                <span>رتبة {account.rank}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Add More Photos Button */}
            <button
              onClick={() => setShowAddPhotoForm(!showAddPhotoForm)}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white border border-neutral-600 flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>إضافة صور (+20)</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 bg-black hover:bg-neutral-800 border border-white text-white transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload notice */}
        {uploadNotice && (
          <div className="bg-emerald-100 border-b border-emerald-400 text-emerald-900 px-4 py-2 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              {uploadNotice}
            </span>
            <button onClick={() => setUploadNotice('')} className="text-emerald-800">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Optional Add Photos Panel */}
        {showAddPhotoForm && (
          <div className="p-4 bg-neutral-100 border-b-2 border-neutral-900 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-neutral-800" />
                إضافة صور جديدة للحساب (يمكنك رفع أكثر من 20 صورة في وقت واحد):
              </h4>
              <button
                onClick={() => setShowAddPhotoForm(false)}
                className="text-neutral-500 hover:text-black text-xs font-bold"
              >
                إغلاق
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Batch File Upload */}
              <div className="p-3 bg-white border border-neutral-900 flex flex-col justify-center">
                <label className="text-xs font-bold text-neutral-800 mb-1 block">
                  اختر ملفات من جهازك (يدعم رفع صور متعددة حتى 30+ صورة):
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-neutral-600 file:mr-2 file:py-1.5 file:px-3 file:border file:border-neutral-900 file:text-xs file:font-bold file:bg-neutral-900 file:text-white hover:file:bg-black cursor-pointer"
                />
              </div>

              {/* Direct URL Form */}
              <form onSubmit={handleAddPhotoByUrl} className="p-3 bg-white border border-neutral-900 flex flex-col justify-center">
                <label className="text-xs font-bold text-neutral-800 mb-1 block">
                  أو أضف رابط صورة مباشر (URL):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/valorant_skin.png"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-neutral-900 bg-neutral-50"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-neutral-900 text-white text-xs font-bold hover:bg-black"
                  >
                    إضافة
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Lightbox Body: Photo Stage + Sidebar */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-neutral-950">
          
          {/* Main Photo Display Stage */}
          <div className="lg:col-span-9 relative flex items-center justify-center p-4 bg-neutral-950 min-h-[360px] sm:min-h-[460px]">
            
            {/* The Active High-Res Photo Container */}
            <div className="relative max-h-[65vh] w-auto max-w-full flex items-center justify-center">
              <img
                src={photos[currentIndex]}
                alt={`صورة ${currentIndex + 1} من تفاصيل الحساب`}
                className={`max-h-[65vh] w-auto max-w-full object-contain border border-neutral-800 shadow-2xl ${account.status === 'sold' ? 'grayscale-[30%] opacity-90' : ''}`}
                referrerPolicy="no-referrer"
              />

              {/* Big Red English "SOLD" Banner across image width */}
              {account.status === 'sold' && (
                <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[1px] flex items-center justify-center overflow-hidden pointer-events-none select-none">
                  <div className="w-full bg-red-600 border-y-4 border-black py-3 sm:py-4 -rotate-12 shadow-[0_0_35px_rgba(220,38,38,0.95)] flex flex-col items-center justify-center transform scale-105">
                    <span className="text-white font-black text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] uppercase drop-shadow-[2px_2px_0_#000000]">
                      SOLD
                    </span>
                    <span className="text-red-100 font-black text-xs sm:text-sm tracking-widest uppercase">
                      تم البيع · SOLD OUT
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Square Animated GIF Badge in the corner of modal view if present */}
            {account.gifUrl && (
              <div className="absolute top-4 left-4 z-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black border-2 border-white shadow-[2px_2px_0_0_#000000] overflow-hidden relative">
                  <img
                    src={account.gifUrl}
                    alt="معاينة GIF"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-neutral-950/90 text-[8px] font-black text-center text-emerald-400 py-0.5">
                    GIF سكنات
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="السابق"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900/90 hover:bg-black text-white border-2 border-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="التالي"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900/90 hover:bg-black text-white border-2 border-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Photo Index Watermark/Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 border border-neutral-700 text-white text-xs font-bold tabular-nums">
              {currentIndex + 1} / {totalPhotos}
            </div>

            {/* Delete photo button if admin */}
            {isAdminLoggedIn && (
              <button
                onClick={handleDeleteCurrentPhoto}
                className="absolute bottom-4 right-4 px-2 py-1 bg-red-950/90 border border-red-500 text-red-400 hover:text-white text-xs font-bold flex items-center gap-1"
                title="حذف هذه الصورة من الحساب"
              >
                <Trash2 className="w-3.5 h-3.5" />
                حذف هذه الصورة
              </button>
            )}
          </div>

          {/* Right Sidebar: Account Summary & Purchase Box */}
          <div className="lg:col-span-3 bg-white border-r-2 border-neutral-900 p-4 sm:p-5 flex flex-col justify-between space-y-4 overflow-y-auto">
            <div className="space-y-4">
              
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  كود الحساب: {account.id}
                </span>
                <h3 className="text-base font-black text-neutral-950 mt-1">
                  {account.title}
                </h3>
              </div>

              {/* Price Box with black border */}
              <div className="p-3 bg-neutral-50 border-2 border-neutral-900">
                <span className="text-[10px] font-bold text-neutral-500 block">السعر الإجمالي:</span>
                <div className="text-xl sm:text-2xl font-black text-neutral-950 tabular-nums">
                  {currency === 'IQD'
                    ? `${account.priceIQD.toLocaleString('ar-IQ')} د.ع`
                    : `$${account.priceUSD}`}
                </div>
                <div className="text-xs text-neutral-500 font-semibold mt-0.5 tabular-nums">
                  {currency === 'IQD'
                    ? `ما يعادل $${account.priceUSD} دولار أمريكي`
                    : `ما يعادل ${account.priceIQD.toLocaleString()} دينار عراقي`}
                </div>
              </div>

              {/* Highlights */}
              <div className="text-xs space-y-2 border-t border-neutral-200 pt-3">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-neutral-500">الرتبة الحالية:</span>
                  <span className="text-neutral-900">{account.rank} ({account.peakRank})</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="text-neutral-500">سيرفر اللعب:</span>
                  <span className="text-neutral-900">{account.serverRegion}</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="text-neutral-500">سكن السكين (Melee):</span>
                  <span className="text-neutral-900 truncate max-w-[140px]">{account.knifeSkin}</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="text-neutral-500">مجموع السكنات:</span>
                  <span className="text-neutral-900">{account.skinsCount} سكن مفحوص</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="text-neutral-500">الإيميل والضمان:</span>
                  <span className="text-emerald-700">{account.hasOge ? 'إيميل أصلي OGE' : 'تغيير كامل متاح'}</span>
                </div>
              </div>

              {/* Iraqi Payment Methods preview */}
              <div className="p-2.5 bg-neutral-100 border border-neutral-300 text-xs">
                <div className="font-bold text-neutral-800 mb-1 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-neutral-900" />
                  طرق الدفع العراقية المقبولة:
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  زين كاش (Zain Cash) · كي كارد (Qi Card) · مصرف الرافدين · آسيا سيل رصيد وكروت · فيزا وماستر كارد.
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-2 pt-2">
              {account.status === 'sold' ? (
                <div className="w-full py-3 bg-red-600 text-white font-black text-sm border-2 border-black text-center flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#000000]">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                  <span className="uppercase tracking-wider font-black">تم البيع · SOLD OUT</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckout(account);
                  }}
                  className="w-full py-3 bg-neutral-950 text-white font-black text-sm border-2 border-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#000000]"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>شراء هذا الحساب الآن</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="w-full py-2 bg-white text-neutral-700 font-bold text-xs border border-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                العودة للمتجر
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Horizontal Thumbnail Reel for all 20+ Photos */}
        <div className="bg-neutral-900 p-3 border-t-2 border-black">
          <div className="flex items-center justify-between mb-2 text-xs font-bold text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Images className="w-3.5 h-3.5 text-emerald-400" />
              معرض الصور الكامل ({totalPhotos} صورة متوفرة):
            </span>
            <span className="text-[11px] text-neutral-400">
              انقر على أي صورة لمعاينتها بالحجم الكامل
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {photos.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 bg-black border-2 transition-all ${
                    isActive
                      ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105'
                      : 'border-neutral-700 opacity-60 hover:opacity-100 hover:border-white'
                  }`}
                >
                  <img
                    src={img}
                    alt={`مصغرة ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 bg-black/90 text-white text-[9px] font-bold px-1 tabular-nums">
                    #{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
