import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerReview } from '../types/store';
import { 
  Star, 
  MessageSquareQuote, 
  ShieldCheck, 
  Send, 
  Plus, 
  Trash2, 
  Check, 
  X,
  MapPin,
  Clock
} from 'lucide-react';

export const CustomerReviewsBox: React.FC = () => {
  const { reviews, addReview, deleteReview, isAdminLoggedIn } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('بغداد');
  const [rating, setRating] = useState(5);
  const [accountPurchased, setAccountPurchased] = useState('حساب فالورانت معتمد');
  const [comment, setComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;

    addReview({
      customerName: customerName.trim(),
      city: city.trim(),
      rating,
      accountPurchased: accountPurchased.trim(),
      comment: comment.trim(),
    });

    setCustomerName('');
    setComment('');
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowAddModal(false);
    }, 2000);
  };

  return (
    <section id="customer-reviews" className="py-12 bg-neutral-50 border-b-2 border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Small Customer Review Box Container */}
        <div className="bg-white border-2 border-neutral-900 shadow-[6px_6px_0_0_#18181b] p-6 lg:p-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-neutral-900">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-neutral-100 border border-neutral-900 text-xs font-bold text-neutral-800">
                <MessageSquareQuote className="w-3.5 h-3.5 text-neutral-900" />
                <span>تقييمات الزبائن وتجربة الخدمة</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                آراء وتقييمات العملاء في العراق
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                تجارب حقيقية موثقة من لاعبي فالورانت الذين قاموا بالشراء والبيع عبر المتجر
              </p>
            </div>

            {/* Score pill & Add Review Button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 border border-neutral-900">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <span className="text-sm font-black text-neutral-900 tabular-nums">4.9 / 5.0</span>
                <span className="text-[11px] text-neutral-500 font-bold">(+340 تقييم)</span>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-[2px_2px_0_0_#000000]"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>أضف تقييمك للخدمة</span>
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 bg-neutral-50 border border-neutral-900 flex flex-col justify-between space-y-3 relative group"
              >
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-semibold flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {rev.date}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed font-medium line-clamp-4">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Footer details */}
                <div className="pt-2 border-t border-neutral-200">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                    <span className="truncate">{rev.customerName}</span>
                    <span className="text-[10px] text-neutral-500 font-medium flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-neutral-400" />
                      {rev.city}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1 text-[10px] text-neutral-500">
                    <span className="truncate max-w-[140px] text-neutral-600 font-semibold">
                      {rev.accountPurchased}
                    </span>
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      مشتري موثق
                    </span>
                  </div>

                  {/* Admin review delete */}
                  {isAdminLoggedIn && (
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="mt-2 w-full py-1 text-[10px] bg-red-50 text-red-600 hover:bg-red-100 border border-red-300 font-bold flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      حذف التقييم
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-neutral-900 shadow-[6px_6px_0_0_#000000] w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute left-4 top-4 p-1 text-neutral-500 hover:text-black border border-neutral-900"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-neutral-950 mb-1">
              شاركنا رأيك في خدمة متجر فالورانت
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              رأيك يهمنا ويساعد مجتمع لاعبي فالورانت في العراق على الشراء بثقة
            </p>

            {submitSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-500 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                شكراً لك! تم إضافة تقييمك ورأيك بنجاح.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    اسمك أو اسم حسابك:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: علي التميمي"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      المحافظة / المدينة:
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-2 py-2 text-xs border border-neutral-900 bg-neutral-50 font-medium"
                    >
                      <option value="بغداد">بغداد</option>
                      <option value="البصرة">البصرة</option>
                      <option value="أربيل">أربيل</option>
                      <option value="النجف الأشرف">النجف الأشرف</option>
                      <option value="كربلاء المقدسة">كربلاء المقدسة</option>
                      <option value="الموصل">الموصل</option>
                      <option value="كركوك">كركوك</option>
                      <option value="السليمانية">السليمانية</option>
                      <option value="ذي قار">ذي قار</option>
                      <option value="بابل">بابل</option>
                      <option value="ديالى">ديالى</option>
                      <option value="محافظة أخرى">محافظة أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      تقييمك للخدمة (1-5):
                    </label>
                    <div className="flex items-center gap-1 py-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    الحساب أو الخدمة المشتراة:
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: حساب كورونامي + فاندال برايم"
                    value={accountPurchased}
                    onChange={(e) => setAccountPurchased(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    رأيك وتجربتك بالتسليم وسرعة الدفع:
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="اكتب تجربتك مع سرعة التحويل عبر زين كاش أو كي كارد ونظافة الحساب..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 transition-colors shadow-[2px_2px_0_0_#000000] flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التقييم الآن</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="py-2.5 px-4 bg-white text-neutral-700 font-bold text-xs border border-neutral-900 hover:bg-neutral-100"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
