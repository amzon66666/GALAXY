import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentCard, ValorantAccount, RankType, ServerRegion } from '../types/store';
import { SAMPLE_SQUARE_GIFS, generateGalleryPhotos } from '../data/defaultData';
import { 
  X, 
  Check, 
  Trash2, 
  Edit3, 
  Plus, 
  Users, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  Sparkles,
  MessageSquareQuote,
  RotateCcw
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditAccountDetail: (account: ValorantAccount) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onEditAccountDetail,
}) => {
  if (!isOpen) return null;

  const {
    accounts,
    pendingAccounts,
    paymentCards,
    reviews,
    settings,
    currentOnlineCount,
    setOnlineCount,
    updateSettings,
    approveAccount,
    rejectAccount,
    deleteAccount,
    updateAccount,
    addAccount,
    addPaymentCard,
    updatePaymentCard,
    deletePaymentCard,
    deleteReview,
    resetToDefault,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'pending' | 'counter' | 'cards' | 'accounts' | 'settings'>('pending');

  // Live counter state
  const [onlineInput, setOnlineInput] = useState((settings.onlineCount ?? 198).toString());
  const [jitterToggle, setJitterToggle] = useState(settings.onlineCountAutoJitter ?? true);

  // Payment card modal/form state
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [cardName, setCardName] = useState('زين كاش (Zain Cash)');
  const [cardEnglishName, setCardEnglishName] = useState('Zain Cash Wallet');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('متجر فالورانت العراقي');
  const [cardBadge, setCardBadge] = useState('تحويل فوري');
  const [cardInstructions, setCardInstructions] = useState('حول المبلغ لرقم المحفظة وأرسل الإشعار عبر واتساب.');
  const [cardType, setCardType] = useState<PaymentCard['type']>('zaincash');

  // New account form state
  const [showNewAccountForm, setShowNewAccountForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriceIQD, setNewPriceIQD] = useState('190000');
  const [newPriceUSD, setNewPriceUSD] = useState('125');
  const [newRank, setNewRank] = useState<RankType>('Immortal');
  const [newRegion, setNewRegion] = useState<ServerRegion>('EU');
  const [newKnife, setNewKnife] = useState('Kuronami No Yaiba');
  const [newGif, setNewGif] = useState(SAMPLE_SQUARE_GIFS[0]);

  // General Settings state
  const [storeNameInput, setStoreNameInput] = useState(settings.storeName || 'GALAXY | متجر جالاكسي العراقي');
  const [announcementInput, setAnnouncementInput] = useState(settings.announcementText || '');
  const [whatsappInput, setWhatsappInput] = useState(settings.supportWhatsapp || '+9647801234567');
  const [discordInput, setDiscordInput] = useState(settings.supportDiscord || 'https://discord.gg/galaxy-iraq');
  const [discordServerNameInput, setDiscordServerNameInput] = useState(settings.discordServerName || 'سيرفر جالاكسي الرسمي | GALAXY VALORANT IRAQ');
  const [rateInput, setRateInput] = useState((settings.usdToIqdRate ?? 1500).toString());
  const [ownerNameInput, setOwnerNameInput] = useState(settings.ownerDisplayName || 'GALAXY Owner | أونر ومؤسس جالاكسي 👑');
  const [ownerTagInput, setOwnerTagInput] = useState(settings.ownerDiscordTag || 'Abad#0001');
  const [ownerAvatarInput, setOwnerAvatarInput] = useState(settings.ownerAvatarUrl || '/src/assets/images/discord_owner_avatar_1792782282378.jpg');
  const [ownerBannerInput, setOwnerBannerInput] = useState(settings.ownerBannerUrl || '/src/assets/images/discord_owner_banner_1792782297540.jpg');
  const [ownerBioInput, setOwnerBioInput] = useState(settings.ownerBio || 'مالك ومؤسس متجر GALAXY وسيرفر الديسكورد العراقي 🇮🇶 · متاح دائماً للوساطة الآمنة، التحقق، والتسليم الفوري.');
  const [ownerLinkInput, setOwnerLinkInput] = useState(settings.ownerDirectLink || 'https://discord.com/users/abad_owner');

  // Save Online Counter
  const handleSaveCounter = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(onlineInput, 10);
    if (!isNaN(val) && val > 0) {
      setOnlineCount(val);
      updateSettings({ onlineCountAutoJitter: jitterToggle });
      alert('تم تحديث رقم المتصلين المباشر بالسيرفر بنجاح!');
    }
  };

  // Save or Update Payment Card
  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || !cardName.trim()) {
      alert('يرجى إدخال اسم الكارت ورقمه');
      return;
    }

    if (editingCardId) {
      updatePaymentCard(editingCardId, {
        name: cardName,
        englishName: cardEnglishName,
        accountNumber: cardNumber,
        holderName: cardHolder,
        badge: cardBadge,
        instructions: cardInstructions,
        type: cardType,
      });
      alert('تم تحديث بيانات كارت الدفع بنجاح!');
    } else {
      addPaymentCard({
        name: cardName,
        englishName: cardEnglishName,
        accountNumber: cardNumber,
        holderName: cardHolder,
        badge: cardBadge,
        instructions: cardInstructions,
        type: cardType,
        accentBg: 'bg-white',
        accentText: 'text-neutral-900',
        isActive: true,
      });
      alert('تمت إضافة كارت الدفع الجديد بنجاح!');
    }

    setShowCardForm(false);
    setEditingCardId(null);
    setCardNumber('');
  };

  // Open Edit Card form
  const handleOpenEditCard = (card: PaymentCard) => {
    setEditingCardId(card.id);
    setCardName(card.name);
    setCardEnglishName(card.englishName);
    setCardNumber(card.accountNumber);
    setCardHolder(card.holderName);
    setCardBadge(card.badge);
    setCardInstructions(card.instructions);
    setCardType(card.type);
    setShowCardForm(true);
  };

  // Add new account by Admin
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addAccount({
      title: newTitle.trim(),
      description: 'حساب رسمي تم فحصه وتوثيقه بالكامل من إدارة متجر فالورانت العراقي مع ضمان عدم السحب.',
      priceIQD: parseInt(newPriceIQD, 10) || 180000,
      priceUSD: parseInt(newPriceUSD, 10) || 120,
      rank: newRank,
      peakRank: `${newRank} 2`,
      serverRegion: newRegion,
      level: 160,
      vp: 1200,
      radianite: 150,
      skinsCount: 42,
      featuredSkins: [newKnife, 'Prime Vandal', 'Reaver Phantom', 'Champions 2024'],
      knifeSkin: newKnife,
      images: generateGalleryPhotos('/src/assets/images/valorant_account_kuronami_1792779080483.jpg', newTitle),
      gifUrl: newGif,
      hasOge: true,
      status: 'available',
      sellerName: 'متجر الصقور (الإدارة)',
      sellerPhone: '07801234567',
      sellerCity: 'بغداد',
      isStoreVerified: true,
    });

    alert('تمت إضافة الحساب بنجاح إلى واجهة المتجر!');
    setShowNewAccountForm(false);
    setNewTitle('');
  };

  // Save General Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = parseInt(rateInput, 10) || 1500;
    updateSettings({
      storeName: storeNameInput,
      announcementText: announcementInput,
      supportWhatsapp: whatsappInput,
      supportDiscord: discordInput,
      discordServerName: discordServerNameInput,
      usdToIqdRate: rate,
      ownerDisplayName: ownerNameInput.trim(),
      ownerDiscordTag: ownerTagInput.trim(),
      ownerAvatarUrl: ownerAvatarInput.trim(),
      ownerBannerUrl: ownerBannerInput.trim(),
      ownerBio: ownerBioInput.trim(),
      ownerDirectLink: ownerLinkInput.trim(),
    });
    alert('تم حفظ إعدادات الموقع وبروفايل الأونر بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-neutral-900 shadow-[8px_8px_0_0_#000000] w-full max-w-5xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 bg-neutral-950 text-white border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-900 border border-emerald-400 flex items-center justify-center font-black text-emerald-400">
              AD
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                لوحة الإدارة والتحكم الشاملة بالمتجر
              </h2>
              <p className="text-xs text-neutral-400">
                تعديل الحسابات والأسعار، الموافقة على عروض المستخدمين، تعديل الرقم المباشر، وإدارة كروت الدفع
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-white bg-black hover:bg-neutral-800 text-white"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b-2 border-neutral-900 bg-neutral-100 overflow-x-auto text-xs font-black">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-3 border-l border-neutral-300 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-white text-black border-b-2 border-b-white -mb-[2px]'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <span>طلبات الموافقة على الحسابات</span>
            {pendingAccounts.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                {pendingAccounts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('counter')}
            className={`px-4 py-3 border-l border-neutral-300 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'counter'
                ? 'bg-white text-black border-b-2 border-b-white -mb-[2px]'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>تعديل رقم المتصلين بالسيرفر</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-3 border-l border-neutral-300 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cards'
                ? 'bg-white text-black border-b-2 border-b-white -mb-[2px]'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>كروت الدفع (زين كاش، كي، الرافدين)</span>
          </button>

          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-4 py-3 border-l border-neutral-300 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'accounts'
                ? 'bg-white text-black border-b-2 border-b-white -mb-[2px]'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>الحسابات الحالية المعروضة</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-white text-black border-b-2 border-b-white -mb-[2px]'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>إعدادات المتجر العامة</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          
          {/* TAB 1: PENDING USER SUBMISSIONS (Approval by Admin Only) */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <div>
                  <h3 className="text-base font-black text-neutral-950">
                    الحسابات المعروضة من الزوار (تتطلب موافقة الآدمن فقط)
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    راجع الحسابات المعروضة للبيع من قبل اللاعبين ووافق عليها لتظهر في المتجر
                  </p>
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2 py-1 border border-neutral-300">
                  المعلقة حالياً: {pendingAccounts.length}
                </span>
              </div>

              {pendingAccounts.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-neutral-300 p-6 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-neutral-800">لا توجد حسابات معلقة حالياً</h4>
                  <p className="text-xs text-neutral-500">
                    عندما يقوم أي زائر بعرض حسابه للبيع من زر "اعرض حسابك للبيع"، سيظهر طلبه هنا لتتم مراجعته والموافقة عليه قبل النشر.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="p-4 bg-neutral-50 border-2 border-neutral-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-16 bg-black border border-neutral-900 overflow-hidden shrink-0 relative">
                          <img
                            src={account.images[0]}
                            alt={account.title}
                            className="w-full h-full object-cover"
                          />
                          {account.gifUrl && (
                            <span className="absolute top-0 right-0 bg-emerald-500 text-black text-[8px] font-black px-1">
                              GIF
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-neutral-600">
                            <span className="px-1.5 py-0.5 bg-neutral-200 text-black border border-neutral-400">
                              {account.rank}
                            </span>
                            <span>سيرفر: {account.serverRegion}</span>
                            <span>·</span>
                            <span>{account.images.length} صورة مرفقة</span>
                          </div>

                          <h4 className="text-sm font-black text-neutral-950">
                            {account.title}
                          </h4>

                          <div className="text-xs text-neutral-500 flex items-center gap-3">
                            <span>البائع: <strong className="text-neutral-800">{account.sellerName}</strong> ({account.sellerCity})</span>
                            <span>هاتف: <strong className="text-neutral-800">{account.sellerPhone}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Actions */}
                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-neutral-200">
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 block font-bold">السعر المحدد:</span>
                          <span className="text-base font-black text-neutral-950 tabular-nums">
                            {account.priceIQD.toLocaleString()} د.ع (${account.priceUSD})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => approveAccount(account.id)}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs border border-emerald-900 flex items-center gap-1.5 shadow"
                          >
                            <Check className="w-4 h-4" />
                            <span>موافقة ونشر بالمتجر</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من رفض وحذف الحساب "${account.title}"؟`)) {
                                rejectAccount(account.id);
                              }
                            }}
                            className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-400 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>رفض</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE GREEN ONLINE COUNTER MODIFICATION */}
          {activeTab === 'counter' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <h3 className="text-base font-black text-neutral-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  تعديل رقم المتصلين بالسيرفر / المتواجدين بالموقع
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  يمكنك تعديل الرقم الأخضر الذي يظهر في أعلى الموقع لتحديد عدد المتصلين في السيرفر
                </p>
              </div>

              <form onSubmit={handleSaveCounter} className="p-5 bg-neutral-50 border-2 border-neutral-900 space-y-4">
                <div>
                  <label className="text-xs font-black text-neutral-900 block mb-1">
                    العدد الأساسي للمتصلين (Base Online Counter):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      required
                      value={onlineInput}
                      onChange={(e) => setOnlineInput(e.target.value)}
                      className="w-full px-3 py-2 text-base font-black text-emerald-600 border-2 border-neutral-900 bg-white tabular-nums"
                    />
                    <span className="text-xs font-bold text-neutral-600 whitespace-nowrap">
                      لاعب متصل
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                  <input
                    type="checkbox"
                    id="jitterCheck"
                    checked={jitterToggle}
                    onChange={(e) => setJitterToggle(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900"
                  />
                  <label htmlFor="jitterCheck" className="text-xs font-bold text-neutral-800 cursor-pointer">
                    تفعيل التذبذب التلقائي الواقعي (زيادة ونقصان طفيف كل بضع ثوانٍ حول الرقم المحدد)
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-neutral-950 text-white font-black text-xs border-2 border-black hover:bg-neutral-800 transition-colors shadow-[2px_2px_0_0_#000000]"
                  >
                    حفظ وتحديث الرقم الأخضر فوراً
                  </button>
                </div>
              </form>

              <div className="p-4 bg-emerald-50 border border-emerald-400 text-xs text-emerald-950 font-medium">
                <span className="font-black block mb-0.5">المعاينة الحالية في الواجهة:</span>
                <span className="text-emerald-700 font-bold">🟢 {currentOnlineCount} متصل بالسيرفر الآن</span>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT CARDS MANAGER (Rafidain, Qi Card, Zain Cash, Asia Cell, Visa) */}
          {activeTab === 'cards' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <div>
                  <h3 className="text-base font-black text-neutral-950">
                    إدارة كروت وطرق الدفع العراقية
                  </h3>
                  <p className="text-xs text-neutral-500">
                    أضف أو عدل بيانات كروت الرافدين، كي كارد، زين كاش، آسيا سيل وفيزا
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingCardId(null);
                    setCardNumber('');
                    setShowCardForm(true);
                  }}
                  className="px-3.5 py-2 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 flex items-center gap-1.5 shadow-[2px_2px_0_0_#000000]"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>إضافة كارت دفع جديد</span>
                </button>
              </div>

              {/* Add / Edit Card Form */}
              {showCardForm && (
                <form onSubmit={handleSaveCard} className="p-5 bg-neutral-50 border-2 border-neutral-900 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <h4 className="text-xs font-black text-neutral-900">
                      {editingCardId ? 'تعديل بيانات الكارت' : 'إضافة كارت دفع عراقي جديد'}:
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowCardForm(false)}
                      className="text-xs text-neutral-500 hover:text-black font-bold"
                    >
                      إلغاء
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">نوع الكارت:</label>
                      <select
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value as PaymentCard['type'])}
                        className="w-full px-2 py-2 text-xs border border-neutral-900 bg-white font-bold"
                      >
                        <option value="zaincash">زين كاش (Zain Cash)</option>
                        <option value="qicard">كي كارد (Qi Card)</option>
                        <option value="rafidain">مصرف الرافدين (Rafidain Bank)</option>
                        <option value="asiacell">آسيا سيل (Asia Cell)</option>
                        <option value="visa">فيزا / ماستر كارد (Visa)</option>
                        <option value="custom">طريقة أخرى مخصصة</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">اسم الكارت بالعربية: *</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">الاسم بالإنجليزية:</label>
                      <input
                        type="text"
                        value={cardEnglishName}
                        onChange={(e) => setCardEnglishName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">
                        رقم البطاقة / رقم المحفظة / الآيبان: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="0780xxxxxxx أو 5324 xxxx..."
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs border-2 border-neutral-900 bg-white font-black font-mono tracking-wider"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">اسم صاحب الحساب المستلم:</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">تعليمات التحويل للزبون:</label>
                    <textarea
                      rows={2}
                      value={cardInstructions}
                      onChange={(e) => setCardInstructions(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800"
                    >
                      {editingCardId ? 'حفظ التعديلات' : 'إضافة الكارت فوراً'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCardForm(false)}
                      className="px-3 py-2 bg-white text-neutral-700 font-bold text-xs border border-neutral-900"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              )}

              {/* Cards Table */}
              <div className="space-y-3">
                {paymentCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3 bg-neutral-50 border-2 border-neutral-900 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-neutral-950">{card.name}</span>
                        <span className="text-[10px] bg-neutral-200 px-1.5 py-0.5 font-bold">{card.badge}</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-neutral-800 mt-1 select-all">
                        {card.accountNumber}
                      </div>
                      <div className="text-[11px] text-neutral-500">المستلم: {card.holderName}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditCard(card)}
                        className="px-2.5 py-1.5 bg-white border border-neutral-900 text-xs font-bold text-neutral-800 hover:bg-neutral-100 flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        تعديل
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف كارت ${card.name}؟`)) {
                            deletePaymentCard(card.id);
                          }
                        }}
                        className="px-2.5 py-1.5 bg-red-50 border border-red-500 text-xs font-bold text-red-600 hover:bg-red-100 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ACTIVE STORE ACCOUNTS */}
          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <div>
                  <h3 className="text-base font-black text-neutral-950">
                    الحسابات الحالية المعروضة للبيع ({accounts.length})
                  </h3>
                  <p className="text-xs text-neutral-500">
                    يمكنك تعديل الأسعار، تغيير الصور، أو إضافة حساب رسمي جديد من قبل الإدارة
                  </p>
                </div>

                <button
                  onClick={() => setShowNewAccountForm(!showNewAccountForm)}
                  className="px-3.5 py-2 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 flex items-center gap-1.5 shadow-[2px_2px_0_0_#000000]"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>إضافة حساب رسمي جديد (+20 صورة)</span>
                </button>
              </div>

              {/* Add New Account Form */}
              {showNewAccountForm && (
                <form onSubmit={handleCreateAccount} className="p-4 bg-neutral-50 border-2 border-neutral-900 space-y-3">
                  <h4 className="text-xs font-black text-neutral-900">بيانات الحساب الجديد:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">عنوان الحساب:</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: حساب فاندال برايم + سكين شامبيونز"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-neutral-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">سكين الميلي (Knife):</label>
                      <input
                        type="text"
                        value={newKnife}
                        onChange={(e) => setNewKnife(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-neutral-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">السعر (د.ع):</label>
                      <input
                        type="number"
                        value={newPriceIQD}
                        onChange={(e) => setNewPriceIQD(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-neutral-900 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">السعر ($):</label>
                      <input
                        type="number"
                        value={newPriceUSD}
                        onChange={(e) => setNewPriceUSD(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-neutral-900 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">الرتبة:</label>
                      <select
                        value={newRank}
                        onChange={(e) => setNewRank(e.target.value as RankType)}
                        className="w-full px-2 py-1.5 text-xs border border-neutral-900 bg-white"
                      >
                        <option value="Radiant">Radiant</option>
                        <option value="Immortal">Immortal</option>
                        <option value="Ascendant">Ascendant</option>
                        <option value="Diamond">Diamond</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">السيرفر:</label>
                      <select
                        value={newRegion}
                        onChange={(e) => setNewRegion(e.target.value as ServerRegion)}
                        className="w-full px-2 py-1.5 text-xs border border-neutral-900 bg-white"
                      >
                        <option value="EU">EU (فرانكفورت)</option>
                        <option value="TR">TR (تركيا)</option>
                        <option value="MENA">MENA (الشرق الأوسط)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-950 text-white font-bold text-xs border-2 border-black"
                    >
                      إضافة الحساب مع 22 صورة تلقائياً
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewAccountForm(false)}
                      className="px-3 py-2 bg-white text-neutral-700 font-bold text-xs border border-neutral-900"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              )}

              {/* Accounts list */}
              <div className="space-y-3">
                {accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-3 bg-neutral-50 border-2 border-neutral-900 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.images[0]}
                        alt={acc.title}
                        className="w-14 h-11 object-cover border border-neutral-900"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-neutral-950">{acc.title}</span>
                          {acc.status === 'sold' ? (
                            <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5 border border-red-800">
                              SOLD · مُباع
                            </span>
                          ) : (
                            <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5">
                              متاح للبيع
                            </span>
                          )}
                          <span className="text-[10px] bg-neutral-200 px-1 font-bold">{acc.rank}</span>
                          <span className="text-[10px] text-emerald-700 font-bold">{acc.images.length} صورة</span>
                        </div>
                        <div className="text-xs text-neutral-500 font-semibold tabular-nums mt-0.5">
                          {acc.priceIQD.toLocaleString()} د.ع (${acc.priceUSD}) · سيرفر {acc.serverRegion}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Manual Sold Toggle Button */}
                      <button
                        onClick={() => {
                          const newStatus = acc.status === 'sold' ? 'available' : 'sold';
                          updateAccount(acc.id, { status: newStatus });
                        }}
                        className={`px-2.5 py-1 text-xs font-black border flex items-center gap-1 transition-all ${
                          acc.status === 'sold'
                            ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-500'
                            : 'bg-red-600 hover:bg-red-700 text-white border-black shadow-[1px_1px_0_0_#000000]'
                        }`}
                        title={acc.status === 'sold' ? 'إعادة الحساب كـ متاح' : 'تحديد الحساب كـ SOLD (مُباع)'}
                      >
                        {acc.status === 'sold' ? '↩️ تحويل إلى متاح' : '🏷️ وسم كـ SOLD (مُباع)'}
                      </button>

                      <button
                        onClick={() => {
                          const newPrice = prompt('أدخل السعر الجديد بالدينار العراقي (IQD):', acc.priceIQD.toString());
                          if (newPrice) {
                            const parsed = parseInt(newPrice, 10);
                            if (!isNaN(parsed)) {
                              updateAccount(acc.id, {
                                priceIQD: parsed,
                                priceUSD: Math.round(parsed / settings.usdToIqdRate),
                              });
                            }
                          }
                        }}
                        className="px-2.5 py-1 bg-white border border-neutral-900 text-xs font-bold text-neutral-900 hover:bg-neutral-100 flex items-center gap-1"
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        تعديل السعر
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف الحساب "${acc.title}"؟`)) {
                            deleteAccount(acc.id);
                          }
                        }}
                        className="px-2.5 py-1 bg-red-50 border border-red-500 text-xs font-bold text-red-600 hover:bg-red-100"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GENERAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <h3 className="text-base font-black text-neutral-950">
                  إعدادات المتجر العامة والتواصل
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  تعديل اسم المتجر، رسالة التنبيه في الأعلى، رقم الواتساب، وسعر صرف الدولار
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-5 bg-neutral-50 border-2 border-neutral-900 space-y-4">
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">اسم المتجر:</label>
                  <input
                    type="text"
                    value={storeNameInput}
                    onChange={(e) => setStoreNameInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">نص شريط الإعلان العلوي:</label>
                  <textarea
                    rows={2}
                    value={announcementInput}
                    onChange={(e) => setAnnouncementInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">رقم الواتساب للمبيعات:</label>
                    <input
                      type="text"
                      value={whatsappInput}
                      onChange={(e) => setWhatsappInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">سعر صرف الدولار (IQD):</label>
                    <input
                      type="number"
                      value={rateInput}
                      onChange={(e) => setRateInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-bold tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">رابط سيرفر الديسكورد (Discord URL):</label>
                    <input
                      type="url"
                      value={discordInput}
                      onChange={(e) => setDiscordInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">اسم سيرفر الديسكورد:</label>
                    <input
                      type="text"
                      value={discordServerNameInput}
                      onChange={(e) => setDiscordServerNameInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-bold"
                    />
                  </div>
                </div>

                {/* Owner Profile & Photos Customization */}
                <div className="p-3 bg-white border border-neutral-900 space-y-3 pt-3 mt-2">
                  <div className="flex items-center gap-1.5 pb-1 border-b border-neutral-200">
                    <span className="text-xs font-black text-neutral-900">بروفايل الأونر وصور الديسكورد (Owner Profile):</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">اسم الأونر المعروض:</label>
                      <input
                        type="text"
                        value={ownerNameInput}
                        onChange={(e) => setOwnerNameInput(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">يوزر / تاغ الأونر في الديسكورد:</label>
                      <input
                        type="text"
                        value={ownerTagInput}
                        onChange={(e) => setOwnerTagInput(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">رابط صورة الأفاتار (Avatar URL):</label>
                      <input
                        type="text"
                        value={ownerAvatarInput}
                        onChange={(e) => setOwnerAvatarInput(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-800 block mb-1">رابط صورة البانر العلوي (Banner URL):</label>
                      <input
                        type="text"
                        value={ownerBannerInput}
                        onChange={(e) => setOwnerBannerInput(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-800 block mb-1">نبذة / بايو الأونر (Bio):</label>
                    <textarea
                      rows={2}
                      value={ownerBioInput}
                      onChange={(e) => setOwnerBioInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800"
                  >
                    حفظ إعدادات الموقع
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('هل تريد إعادة تعيين كافة البيانات إلى الإعدادات الافتراضية؟')) {
                        resetToDefault();
                        alert('تمت استعادة البيانات الافتراضية.');
                        onClose();
                      }
                    }}
                    className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold border border-neutral-400 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    استعادة الافتراضي
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
