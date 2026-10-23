import React, { useState } from 'react';
import { PaymentCard, ValorantAccount } from '../types/store';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  CreditCard, 
  Copy, 
  Check, 
  ShieldCheck, 
  MessageCircle, 
  Sword, 
  Zap, 
  HelpCircle,
  Building2,
  Smartphone
} from 'lucide-react';

interface AccountDetailModalProps {
  account: ValorantAccount | null;
  onClose: () => void;
  onOpenGallery: (account: ValorantAccount) => void;
}

export const AccountDetailModal: React.FC<AccountDetailModalProps> = ({
  account,
  onClose,
  onOpenGallery,
}) => {
  if (!account) return null;

  const { paymentCards, currency, settings } = useStore();
  const [selectedPaymentCardId, setSelectedPaymentCardId] = useState<string>(
    paymentCards[0]?.id || ''
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  const selectedCard = paymentCards.find((c) => c.id === selectedPaymentCardId) || paymentCards[0];

  const handleCopy = (num: string, id: string) => {
    navigator.clipboard.writeText(num.replace(/\s+/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCompleteViaWhatsapp = () => {
    const text = encodeURIComponent(
      `السلام عليكم، أريد إتمام شراء الحساب التالي عبر متجر فالورانت العراقي:\n\n` +
      `📌 كود الحساب: ${account.id}\n` +
      `🎮 العنوان: ${account.title}\n` +
      `💰 السعر: ${account.priceIQD.toLocaleString()} دينار عراقي ($${account.priceUSD})\n` +
      `💳 طريقة الدفع المختارة: ${selectedCard?.name || 'زين كاش'}\n` +
      `👤 اسم المشتري: ${buyerName || 'لاعب فالورانت'}\n` +
      `📞 هاتف المشتري: ${buyerPhone || 'عبر الواتساب'}\n\n` +
      `أنا جاهز لتحويل المبلغ وإرسال إشعار الدفع لتسليمي بيانات الحساب والإيميل الأصلي فوراً.`
    );
    window.open(`https://wa.me/${settings.supportWhatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 shadow-[8px_8px_0_0_#000000] w-full max-w-4xl p-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-5 top-5 p-1.5 border-2 border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-900 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b-2 border-neutral-900 pb-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-900 text-[10px] font-bold uppercase">
              كود الحساب: {account.id}
            </span>
            {account.status === 'sold' ? (
              <span className="px-2.5 py-0.5 bg-red-600 border border-red-800 text-white text-[11px] font-black uppercase tracking-wider">
                SOLD · تم البيع بنجاح
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-500 text-emerald-800 text-[10px] font-bold">
                مفحوص ومضمون 100%
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-950">
            {account.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Account Summary & Photo view */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Visual Box */}
            <div className="relative border-2 border-neutral-900 bg-neutral-950 aspect-[16/10] overflow-hidden">
              <img
                src={account.images[0]}
                alt={account.title}
                className={`w-full h-full object-cover ${account.status === 'sold' ? 'grayscale-[30%] opacity-90' : ''}`}
              />

              {/* Big Red English "SOLD" Banner across image width */}
              {account.status === 'sold' && (
                <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[1px] flex items-center justify-center overflow-hidden pointer-events-none select-none">
                  <div className="w-full bg-red-600 border-y-4 border-black py-2.5 sm:py-3.5 -rotate-12 shadow-[0_0_35px_rgba(220,38,38,0.95)] flex flex-col items-center justify-center transform scale-105">
                    <span className="text-white font-black text-3xl sm:text-4xl tracking-[0.25em] uppercase drop-shadow-[2px_2px_0_#000000]">
                      SOLD
                    </span>
                    <span className="text-red-100 font-black text-[10px] sm:text-xs tracking-widest uppercase">
                      تم البيع · SOLD OUT
                    </span>
                  </div>
                </div>
              )}

              {/* Small square GIF */}
              {account.gifUrl && (
                <div className="absolute top-2 left-2 w-14 h-14 bg-black border-2 border-white overflow-hidden shadow">
                  <img src={account.gifUrl} alt="GIF" className="w-full h-full object-cover" />
                </div>
              )}
              <button
                onClick={() => {
                  onClose();
                  onOpenGallery(account);
                }}
                className="absolute bottom-2 right-2 bg-neutral-900/90 text-white border border-white text-xs font-bold px-2 py-1 hover:bg-black"
              >
                معاينة كافة الصور ({account.images.length}+ صورة)
              </button>
            </div>

            {/* Quick Specs */}
            <div className="p-3 bg-neutral-50 border-2 border-neutral-900 text-xs space-y-1.5 font-semibold">
              <div className="flex justify-between">
                <span className="text-neutral-500">الرتبة:</span>
                <span className="text-neutral-900 font-bold">{account.rank} ({account.peakRank})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">السيرفر:</span>
                <span className="text-neutral-900 font-bold">{account.serverRegion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">سكن السكين (Melee):</span>
                <span className="text-neutral-900 font-bold">{account.knifeSkin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">نقاط VP / RP:</span>
                <span className="text-neutral-900 font-bold tabular-nums">{account.vp} VP / {account.radianite} RP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">الإيميل الأصلي:</span>
                <span className="text-emerald-700 font-bold">{account.hasOge ? 'متاح مع الحساب OGE' : 'تغيير كامل للمشتري'}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-neutral-950 text-white border-2 border-black flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 block font-bold">المبلغ المطلوب:</span>
                <div className="text-2xl font-black tabular-nums text-white">
                  {currency === 'IQD'
                    ? `${account.priceIQD.toLocaleString('ar-IQ')} د.ع`
                    : `$${account.priceUSD}`}
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-bold tabular-nums">
                {currency === 'IQD' ? `$${account.priceUSD}` : `${account.priceIQD.toLocaleString()} د.ع`}
              </span>
            </div>

          </div>

          {/* Right Column: Iraqi Payment Selection & Instant Checkout */}
          <div className="lg:col-span-7 space-y-5">
            
            <div>
              <h4 className="text-sm font-black text-neutral-900 mb-2 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-neutral-900" />
                اختر طريقة الدفع العراقية المفضلة لديك:
              </h4>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {paymentCards.map((card) => {
                  const isSelected = selectedPaymentCardId === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => setSelectedPaymentCardId(card.id)}
                      className={`p-2.5 text-right border-2 transition-all ${
                        isSelected
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                          : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-neutral-900'
                      }`}
                    >
                      <div className="text-xs font-black truncate">{card.name}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {card.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Card Transfer Details Box */}
            {selectedCard && (
              <div className="p-4 bg-neutral-50 border-2 border-neutral-900 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-neutral-900">
                    بيانات التحويل الخاصة بـ {selectedCard.name}:
                  </span>
                  <span className="text-[11px] font-bold text-neutral-500">
                    {selectedCard.holderName}
                  </span>
                </div>

                <div className="p-3 bg-white border border-neutral-900 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold block uppercase">
                      رقم المحفظة / الآيبان للتحويل:
                    </span>
                    <span className="text-base font-black font-mono tracking-wider text-neutral-950 select-all">
                      {selectedCard.accountNumber}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(selectedCard.accountNumber, selectedCard.id)}
                    className={`px-3 py-1.5 text-xs font-bold border border-neutral-900 transition-colors flex items-center gap-1.5 ${
                      copiedId === selectedCard.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-900 text-white hover:bg-black'
                    }`}
                  >
                    {copiedId === selectedCard.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الرقم</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-xs text-neutral-600 font-medium leading-relaxed bg-white/70 p-2 border border-neutral-200">
                  <span className="font-bold text-neutral-900 block mb-0.5">خطوات الدفع:</span>
                  {selectedCard.instructions}
                </div>
              </div>
            )}

            {/* Buyer Contact Form for Instant Order */}
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-black text-neutral-900">
                بياناتك لإرسال معلومات الحساب إليك فوراً:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="اسمك الكريم أو يوزرك"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                />
                <input
                  type="tel"
                  placeholder="رقم الواتساب الخاص بك"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                />
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="space-y-2 pt-2">
              {account.status === 'sold' ? (
                <div className="space-y-2">
                  <div className="w-full py-3.5 px-4 bg-red-600 text-white font-black text-sm border-2 border-black text-center flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#000000]">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                    <span className="uppercase tracking-wider font-black">تم بيع هذا الحساب مسبقاً (SOLD OUT)</span>
                  </div>
                  <button
                    onClick={handleCompleteViaWhatsapp}
                    className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-black text-white font-bold text-xs border border-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>تواصل مع الإدارة لطلب حساب فالورانت مشابه</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleCompleteViaWhatsapp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm border-2 border-emerald-900 transition-colors flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#064e3b]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>إكمال الطلب وإرسال إشعار التحويل عبر واتساب</span>
                </button>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-semibold text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>تسليم فوري ومباشر خلال دقائق بعد إرسال صورة وصل التحويل</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
