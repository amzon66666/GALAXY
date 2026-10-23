import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, Send, ShieldCheck, CreditCard, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdminLogin: () => void;
  onOpenSellModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminLogin, onOpenSellModal }) => {
  const { settings, paymentCards, isAdminLoggedIn } = useStore();

  return (
    <footer className="bg-white border-t-2 border-neutral-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-neutral-950 text-white flex items-center justify-center font-black text-lg border-2 border-black shadow-[2px_2px_0_0_#000000]">
                <span>G</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-neutral-950 tracking-tighter uppercase">
                  GALAXY
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  | متجر جالاكسي العراقي
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-medium max-w-sm">
              متجر GALAXY العراقي الأول المتخصص في بيع وشراء حسابات لعبة فالورانت الفخمة، مع توفير أكثر من 20 صورة لكل حساب، ومربع GIF متحرك، ودعم كامل لكافة وسائل الدفع العراقية المعتمدة (زين كاش، كي كارد، الرافدين، آسيا سيل).
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={`https://wa.me/${settings.supportWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-neutral-950 text-white text-xs font-bold border border-black hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-[2px_2px_0_0_#000000]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>واتساب المبيعات</span>
              </a>

              <a
                href={settings.supportDiscord}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#5865F2] text-white text-xs font-bold border border-neutral-900 hover:bg-[#4752C4] transition-colors flex items-center gap-1.5 shadow-[2px_2px_0_0_#000000]"
              >
                <span>سيرفر الديسكورد</span>
              </a>

              <a
                href={`https://t.me/${settings.supportTelegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-white text-neutral-900 text-xs font-bold border border-neutral-900 hover:bg-neutral-100 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-sky-600" />
                <span>تليجرام</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-neutral-900 tracking-wider">
              أقسام المتجر
            </h4>
            <ul className="text-xs space-y-2 font-bold text-neutral-600">
              <li>
                <a href="#accounts" className="hover:text-black transition-colors">
                  الحسابات المتوفرة للبيع
                </a>
              </li>
              <li>
                <button onClick={onOpenSellModal} className="hover:text-black transition-colors text-right">
                  عرض حسابك للبيع (طلب موافقة)
                </button>
              </li>
              <li>
                <a href="#payment-methods" className="hover:text-black transition-colors">
                  كروت وطرق الدفع العراقية
                </a>
              </li>
              <li>
                <a href="#customer-reviews" className="hover:text-black transition-colors">
                  آراء وتقييمات العملاء
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-black transition-colors">
                  شروط الضمان والإيميل الأصلي
                </a>
              </li>
            </ul>
          </div>

          {/* Iraqi Payment Cards supported */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase text-neutral-900 tracking-wider">
              طرق الدفع المدعومة في العراق
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-neutral-800">
              <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-900">
                زين كاش (Zain Cash)
              </span>
              <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-900">
                كي كارد (Qi Card)
              </span>
              <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-900">
                مصرف الرافدين
              </span>
              <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-900">
                آسيا سيل رصيد
              </span>
              <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-900">
                فيزا وماستر كارد
              </span>
            </div>

            <p className="text-[11px] text-neutral-500 font-medium pt-1">
              يتم تحويل المبالغ مباشرة بدون وسطاء أو عمولات بنكية مبالغ بها.
            </p>
          </div>

        </div>

        {/* Bottom copyright and admin access */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-neutral-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} متجر GALAXY العراقي · منصة بيع وشراء موثقة ومحمية
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              منصة آمنة 100%
            </span>

            <button
              onClick={onOpenAdminLogin}
              className="hover:text-black text-[11px] flex items-center gap-1 text-neutral-400 hover:underline"
            >
              <Lock className="w-3 h-3" />
              <span>دخول الإدارة (Admin Login)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
