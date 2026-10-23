import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentCard } from '../types/store';
import { 
  CreditCard, 
  Copy, 
  Check, 
  Plus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Smartphone, 
  Building2, 
  ExternalLink,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

interface PaymentMethodsSectionProps {
  onOpenAddCardModal: () => void;
  onEditCard: (card: PaymentCard) => void;
}

export const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({
  onOpenAddCardModal,
  onEditCard,
}) => {
  const { paymentCards, deletePaymentCard, isAdminLoggedIn, settings } = useStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (card: PaymentCard) => {
    navigator.clipboard.writeText(card.accountNumber.replace(/\s+/g, ''));
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'rafidain':
        return <Building2 className="w-5 h-5 text-neutral-900" />;
      case 'zaincash':
      case 'asiacell':
        return <Smartphone className="w-5 h-5 text-neutral-900" />;
      default:
        return <CreditCard className="w-5 h-5 text-neutral-900" />;
    }
  };

  return (
    <section id="payment-methods" className="py-14 bg-white border-b-2 border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b-2 border-neutral-900">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-neutral-100 border border-neutral-900 text-xs font-bold text-neutral-800 mb-2">
              <span>طرق الدفع العراقية المعتمدة 🇮🇶</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              كروت وطرق الدفع (الرافدين، كي كارد، زين كاش، آسيا سيل، فيزا)
            </h2>
            <p className="text-sm text-neutral-600 font-medium mt-1">
              ادفع بطريقتك المفضلة داخل العراق بدون أي عمولات إضافية مع تسليم فوري لحسابك
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAddCardModal}
                className="px-4 py-2 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-[2px_2px_0_0_#000000]"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>إضافة كارت دفع جديد (للآدمن)</span>
              </button>
            )}

            <a
              href={`https://wa.me/${settings.supportWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-neutral-900 font-bold text-xs border-2 border-neutral-900 hover:bg-neutral-100 transition-colors flex items-center gap-2 shadow-[2px_2px_0_0_#18181b]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>مساعدة الدفع عبر واتساب</span>
            </a>
          </div>
        </div>

        {/* Payment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentCards.map((card) => {
            const isCopied = copiedId === card.id;

            return (
              <div
                key={card.id}
                className="bg-white border-2 border-neutral-900 shadow-[5px_5px_0_0_#18181b] p-5 flex flex-col justify-between space-y-4 relative group"
              >
                {/* Card Top Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-neutral-100 border border-neutral-900 flex items-center justify-center">
                      {getCardIcon(card.type)}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-neutral-950 leading-tight">
                        {card.name}
                      </h3>
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                        {card.englishName}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-[10px] font-bold text-neutral-700">
                    {card.badge}
                  </span>
                </div>

                {/* Card Number / Wallet Display Box */}
                <div className="p-3 bg-neutral-50 border-2 border-neutral-900 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">
                      رقم الحساب / المحفظة:
                    </span>
                    {isCopied && (
                      <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        تم النسخ!
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base sm:text-lg font-black tracking-wider text-neutral-950 font-mono select-all">
                      {card.accountNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(card)}
                      className={`p-1.5 border border-neutral-900 transition-colors ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-neutral-200 text-neutral-900'
                      }`}
                      title="نسخ الرقم"
                      aria-label="نسخ الرقم"
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="text-[11px] font-semibold text-neutral-600 pt-1 border-t border-neutral-200">
                    اسم المستلم: <span className="font-bold text-neutral-900">{card.holderName}</span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-xs text-neutral-600 leading-relaxed font-medium bg-neutral-50/50 p-2.5 border border-neutral-200">
                  <span className="font-bold text-neutral-800 block mb-0.5">طريقة التحويل:</span>
                  {card.instructions}
                </div>

                {/* Actions & Admin controls */}
                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                  <button
                    onClick={() => handleCopy(card)}
                    className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ للتحويل الفوري</span>
                  </button>

                  {isAdminLoggedIn && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onEditCard(card)}
                        className="p-1 border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-800"
                        title="تعديل هذا الكارت"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف كارت ${card.name}؟`)) {
                            deletePaymentCard(card.id);
                          }
                        }}
                        className="p-1 border border-red-500 bg-red-50 hover:bg-red-100 text-red-600"
                        title="حذف هذا الكارت"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Payment Guarantee Notice */}
        <div className="mt-10 p-5 bg-neutral-50 border-2 border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-neutral-900">
                كيف يتم استلام الحساب بعد تحويل المبلغ؟
              </h4>
              <p className="text-xs text-neutral-600 mt-1 font-medium leading-relaxed">
                بعد إتمام التحويل عن طريق زين كاش، كي كارد، الرافدين أو آسيا سيل، أرسل صورة الإشعار أو وصل التحويل إلى واتساب الإدارة مع رمز الحساب. يتم تسليمك بيانات الحساب (User, Password, Email, Backup Codes) خلال 3 إلى 5 دقائق مباشرة!
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${settings.supportWhatsapp}?text=${encodeURIComponent('السلام عليكم، حولت المبلغ وأريد تأكيد استلام الحساب')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 whitespace-nowrap shrink-0 shadow-[2px_2px_0_0_#000000]"
          >
            إرسال إشعار التحويل (واتساب)
          </a>
        </div>

      </div>
    </section>
  );
};
