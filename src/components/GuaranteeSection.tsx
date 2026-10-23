import React from 'react';
import { ShieldCheck, Lock, RefreshCw, Clock, CheckCircle } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
  return (
    <section id="guarantee" className="py-14 bg-white border-b-2 border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 border border-neutral-900 text-xs font-black text-neutral-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>نظام الحماية والضمان العراقي الأول 🇮🇶</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            ضمان عدم السحب مدى الحياة وتسليم رسمي موثق
          </h2>
          <p className="text-sm text-neutral-600 font-medium">
            كل حساب معروض في متجرنا يخضع لفحص أمني دقيق من قبل فريق الإدارة قبل عرضه للبيع
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 bg-neutral-50 border-2 border-neutral-900 shadow-[4px_4px_0_0_#18181b] space-y-2">
            <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center font-bold">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-black text-neutral-950">إيميل أصلي OGE</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              يتم تسليمك بيانات الإيميل الأول المنشأ به الحساب (Original Email) لتكون المالك الحصري والقانوني له للأبد.
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border-2 border-neutral-900 shadow-[4px_4px_0_0_#18181b] space-y-2">
            <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-black text-neutral-950">ضمان عدم السحب</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              في حال حدوث أي خلل في بيانات الحساب بعد الشراء، نتحمل المسؤولية الكاملة بتعويضك بحساب مماثل أو إرجاع المبلغ.
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border-2 border-neutral-900 shadow-[4px_4px_0_0_#18181b] space-y-2">
            <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-black text-neutral-950">تسليم فوري بدقائق</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              بمجرد تحويل المبلغ عبر زين كاش، كي كارد، الرافدين أو آسيا سيل، تستلم تفاصيل تسجيل الدخول خلال 3 إلى 5 دقائق.
            </p>
          </div>

          <div className="p-5 bg-neutral-50 border-2 border-neutral-900 shadow-[4px_4px_0_0_#18181b] space-y-2">
            <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center font-bold">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-black text-neutral-950">موافقة وفحص الإدارة</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              لا يمكن لأي طرف خارجي عرض حسابه إلا بعد موافقة وتدقيق إدارة المتجر على الصور والملكية لمنع أي احتيال.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
