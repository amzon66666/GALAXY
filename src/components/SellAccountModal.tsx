import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RankType, ServerRegion, ValorantAccount } from '../types/store';
import { SAMPLE_SQUARE_GIFS, generateGalleryPhotos } from '../data/defaultData';
import { 
  X, 
  Upload, 
  Images, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  DollarSign, 
  Sparkles,
  ShieldCheck,
  Flame,
  Film
} from 'lucide-react';

interface SellAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellAccountModal: React.FC<SellAccountModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { submitUserAccount, settings } = useStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceIQD, setPriceIQD] = useState('');
  const [priceUSD, setPriceUSD] = useState('');
  const [rank, setRank] = useState<RankType>('Immortal');
  const [peakRank, setPeakRank] = useState('Immortal 2');
  const [serverRegion, setServerRegion] = useState<ServerRegion>('EU');
  const [level, setLevel] = useState('140');
  const [vp, setVp] = useState('850');
  const [radianite, setRadianite] = useState('160');
  const [skinsCount, setSkinsCount] = useState('35');
  const [knifeSkin, setKnifeSkin] = useState('');
  const [featuredSkinsText, setFeaturedSkinsText] = useState('');
  const [hasOge, setHasOge] = useState(true);
  
  // Square GIF
  const [gifUrl, setGifUrl] = useState(SAMPLE_SQUARE_GIFS[0]);
  
  // Photos (can be >20 photos!)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [photoUrlInput, setPhotoUrlInput] = useState('');

  // Seller info
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerCity, setSellerCity] = useState('بغداد');

  const [submitted, setSubmitted] = useState(false);

  // Auto-sync IQD and USD price
  const handlePriceIQDChange = (val: string) => {
    setPriceIQD(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setPriceUSD(Math.round(num / settings.usdToIqdRate).toString());
    }
  };

  const handlePriceUSDChange = (val: string) => {
    setPriceUSD(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setPriceIQD(Math.round(num * settings.usdToIqdRate).toString());
    }
  };

  // Handle batch file upload (can select >20 files)
  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: string[] = [];
    let count = 0;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push(event.target.result as string);
        }
        count++;
        if (count === files.length) {
          setUploadedPhotos((prev) => [...prev, ...newPhotos]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddPhotoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrlInput.trim()) return;
    setUploadedPhotos((prev) => [...prev, photoUrlInput.trim()]);
    setPhotoUrlInput('');
  };

  // Preset quick fill of 22 photo screens if user wants to test quickly
  const handleLoadSamplePhotos = () => {
    const samples = generateGalleryPhotos('/src/assets/images/valorant_account_kuronami_1792779080483.jpg', title || 'حساب فالورانت عراقي');
    setUploadedPhotos(samples);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !priceIQD.trim() || !sellerName.trim() || !sellerPhone.trim()) {
      alert('يرجى ملء كافة الحقول الأساسية وتحديد السعر وبيانات التواصل.');
      return;
    }

    const skinsList = featuredSkinsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Ensure at least sample photos exist if user didn't attach any
    const finalPhotos = uploadedPhotos.length > 0 
      ? uploadedPhotos 
      : generateGalleryPhotos('/src/assets/images/valorant_hero_showcase_1792779080474.jpg', title);

    submitUserAccount({
      title: title.trim(),
      description: description.trim() || 'حساب مميز معروض للبيع من قبل لاعب عراقي موثق.',
      priceIQD: parseInt(priceIQD, 10) || 150000,
      priceUSD: parseInt(priceUSD, 10) || 100,
      rank,
      peakRank: peakRank.trim() || rank,
      serverRegion,
      level: parseInt(level, 10) || 100,
      vp: parseInt(vp, 10) || 0,
      radianite: parseInt(radianite, 10) || 0,
      skinsCount: parseInt(skinsCount, 10) || skinsList.length || 20,
      featuredSkins: skinsList.length > 0 ? skinsList : ['Vandal Prime', 'Reaver Phantom', 'Knife Skin'],
      knifeSkin: knifeSkin.trim() || 'سكين المشاجرة الافتراضي',
      images: finalPhotos,
      gifUrl: gifUrl.trim() || SAMPLE_SQUARE_GIFS[0],
      hasOge,
      sellerName: sellerName.trim(),
      sellerPhone: sellerPhone.trim(),
      sellerCity,
      isStoreVerified: false,
    });

    setSubmitted(true);
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

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-600 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-black text-neutral-950">
              تم إرسال حسابك للمراجعة بنجاح!
            </h3>
            
            <div className="max-w-lg mx-auto p-4 bg-neutral-50 border-2 border-neutral-900 text-xs text-neutral-700 leading-relaxed font-medium space-y-2">
              <p className="font-bold text-neutral-900">
                🔒 الحساب الآن في قائمة "بانتظار موافقة الإدارة (Pending Approval)"
              </p>
              <p>
                بناءً على سياسة المتجر لحماية مجتمع اللاعبين في العراق من الاحتيال، سيقوم الآدمن بفحص صور الحساب، التأكد من سكنات السلاح والإيميل، ثم الموافقة ونشر الحساب في واجهة المتجر العامة.
              </p>
              <p className="text-emerald-700 font-bold">
                سيتم التواصل معك على واتساب ({sellerPhone}) بمجرد تأكيد النشر أو وجود أي استفسار.
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 shadow-[2px_2px_0_0_#000000]"
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="border-b-2 border-neutral-900 pb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-neutral-100 border border-neutral-900 text-xs font-bold text-neutral-800 mb-2">
                <span>سوق اللاعبين العراقي 🇮🇶</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-950">
                اعرض حساب فالورانت للبيع وحدد سعرك بحرية
              </h2>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                يمكن لأي لاعب عراقي عرض حسابه، إضافة أكثر من 20 صورة تفصيلية، وإرفاق مربع GIF متحرك. الحساب يُنشر بموافقة الإدارة.
              </p>
            </div>

            {/* Admin Approval Notice Banner */}
            <div className="p-3 bg-amber-50 border-2 border-amber-600 text-amber-950 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-black block">ملاحظة هامة (موافقة الآدمن فقط):</span>
                <span>الحساب الذي تعرضه لن يظهر مباشرة في الصفحة العامة حتى تتم مراجعته والموافقة عليه من قبل مدير الموقع لضمان سلامة التعاملات.</span>
              </div>
            </div>

            {/* Form Step 1: Account Basic Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-neutral-900 pb-1 border-b border-neutral-200">
                1. معلومات الحساب والرتبة
              </h4>

              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1">
                  عنوان الحساب المعروض: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: حساب فاندال برايم + سكين كورونامي ورتبة إيمورتال 2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border-2 border-neutral-900 bg-neutral-50 font-bold focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">الرتبة الحالية:</label>
                  <select
                    value={rank}
                    onChange={(e) => setRank(e.target.value as RankType)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                  >
                    <option value="Radiant">Radiant (راديانت)</option>
                    <option value="Immortal">Immortal (إيمورتال)</option>
                    <option value="Ascendant">Ascendant (أسيندنت)</option>
                    <option value="Diamond">Diamond (دايموند)</option>
                    <option value="Platinum">Platinum (بلاتينيوم)</option>
                    <option value="Gold">Gold (جولد)</option>
                    <option value="Silver">Silver (سيلفر)</option>
                    <option value="Bronze">Bronze (برونز)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">أعلى رتبة (Peak Rank):</label>
                  <input
                    type="text"
                    placeholder="مثال: Immortal 3"
                    value={peakRank}
                    onChange={(e) => setPeakRank(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">سيرفر الحساب:</label>
                  <select
                    value={serverRegion}
                    onChange={(e) => setServerRegion(e.target.value as ServerRegion)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                  >
                    <option value="EU">أوروبا (EU / فرانكفورت)</option>
                    <option value="TR">تركيا (TR - بنج عراقي منخفض)</option>
                    <option value="MENA">الشرق الأوسط (MENA / البحرين)</option>
                    <option value="NA">أمريكا الشمالية (NA)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">مستوى الحساب (Level):</label>
                  <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">
                    سكين السلاح المشاجرة (Melee / Knife):
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: Kuronami No Yaiba أو Champions Karambit"
                    value={knifeSkin}
                    onChange={(e) => setKnifeSkin(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">
                    أبرز السكنات (افصل بينها بفاصلة ,):
                  </label>
                  <input
                    type="text"
                    placeholder="Prime Vandal, Reaver Phantom, Araxys..."
                    value={featuredSkinsText}
                    onChange={(e) => setFeaturedSkinsText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1">
                  وصف تفصيلي للحساب (حالة الباتل باس، الشخصيات المفتوحة):
                </label>
                <textarea
                  rows={2}
                  placeholder="اكتب هنا أي تفاصيل إضافية عن السكنات والباقات..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                />
              </div>

              <div className="flex items-center gap-2 p-2 bg-neutral-50 border border-neutral-200">
                <input
                  type="checkbox"
                  id="hasOge"
                  checked={hasOge}
                  onChange={(e) => setHasOge(e.target.checked)}
                  className="w-4 h-4 accent-neutral-900"
                />
                <label htmlFor="hasOge" className="text-xs font-bold text-neutral-800 cursor-pointer">
                  يتوفر الإيميل الأصلي للحساب (Original Email - OGE) مع إمكانية التغيير الكامل للمشتري
                </label>
              </div>
            </div>

            {/* Form Step 2: Custom Price (حرية تحديد السعر) */}
            <div className="space-y-3 pt-3 border-t-2 border-neutral-900">
              <h4 className="text-sm font-black text-neutral-900 pb-1 border-b border-neutral-200">
                2. تحديد السعر المطلوب بحرية (د.ع ودولار)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-neutral-50 border-2 border-neutral-900">
                  <label className="text-xs font-black text-neutral-900 block mb-1">
                    السعر المطلوب بالدينار العراقي (IQD): *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="مثال: 180000"
                    value={priceIQD}
                    onChange={(e) => handlePriceIQDChange(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-900 bg-white font-black tabular-nums"
                  />
                  <span className="text-[10px] text-neutral-500 font-bold mt-1 block">
                    يتم تحويله تلقائياً بسعر الصرف الحالي
                  </span>
                </div>

                <div className="p-3 bg-neutral-50 border-2 border-neutral-900">
                  <label className="text-xs font-black text-neutral-900 block mb-1">
                    السعر المقابل بالدولار الأمريكي ($ USD): *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="مثال: 120"
                    value={priceUSD}
                    onChange={(e) => handlePriceUSDChange(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-900 bg-white font-black tabular-nums"
                  />
                  <span className="text-[10px] text-neutral-500 font-bold mt-1 block">
                    1 دولار = {settings.usdToIqdRate.toLocaleString()} دينار عراقي
                  </span>
                </div>
              </div>
            </div>

            {/* Form Step 3: Photos (Support for >20 photos!) & Small Square GIF */}
            <div className="space-y-4 pt-3 border-t-2 border-neutral-900">
              <div className="flex items-center justify-between pb-1 border-b border-neutral-200">
                <h4 className="text-sm font-black text-neutral-900">
                  3. صور الحساب (إمكانية إضافة أكثر من 20 صورة) ومربع GIF
                </h4>
                <span className="text-xs font-bold text-emerald-700">
                  تم إرفاق: {uploadedPhotos.length} صورة
                </span>
              </div>

              {/* Square GIF Badge Input */}
              <div className="p-3 bg-neutral-50 border-2 border-neutral-900 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-neutral-900" />
                    رابط مربع GIF المتحرك (Square GIF Badge):
                  </label>
                  <span className="text-[11px] text-neutral-500">يظهر كمربع صغير متحرك في زاوية الحساب</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-black border-2 border-neutral-900 shrink-0 overflow-hidden relative">
                    {gifUrl ? (
                      <img src={gifUrl} alt="GIF" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-white">GIF</div>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="رابط GIF مباشر (https://...gif)"
                    value={gifUrl}
                    onChange={(e) => setGifUrl(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-neutral-900 bg-white font-mono"
                  />
                </div>

                {/* Quick Sample GIFs picker */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-neutral-500 font-bold">اختر نموذج جاهز:</span>
                  {SAMPLE_SQUARE_GIFS.map((sample, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setGifUrl(sample)}
                      className="px-2 py-0.5 bg-white border border-neutral-900 text-[10px] font-bold hover:bg-neutral-100"
                    >
                      GIF #{i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Photo Upload Area (Supporting >20 photos) */}
              <div className="p-4 bg-neutral-50 border-2 border-dashed border-neutral-900 text-center space-y-3">
                <Images className="w-8 h-8 text-neutral-700 mx-auto" />
                <div>
                  <h5 className="text-xs font-black text-neutral-900">
                    ارفع صور حسابك (يمكنك اختيار أكثر من 20 صورة معاً)
                  </h5>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    سكنات الفاندال، المشاجرة، سجل المباريات، رصيد النقاط، وشاشة الرتبة
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-neutral-950 text-white font-bold text-xs border-2 border-black hover:bg-neutral-800 transition-colors shadow-[2px_2px_0_0_#000000] inline-flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>تحديد ملفات متعددة (+20 صورة)</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleFiles}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleLoadSamplePhotos}
                    className="px-4 py-2 bg-white text-neutral-900 font-bold text-xs border-2 border-neutral-900 hover:bg-neutral-100 transition-colors"
                  >
                    إرفاق 22 صورة نموذجية تلقائياً للتحقق
                  </button>
                </div>

                {/* Or add by single URL */}
                <div className="max-w-md mx-auto flex gap-2 pt-2">
                  <input
                    type="url"
                    placeholder="أو أضف رابط صورة مباشر (URL)..."
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-neutral-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoUrl}
                    className="px-3 py-1 bg-neutral-900 text-white text-xs font-bold hover:bg-black"
                  >
                    إضافة
                  </button>
                </div>
              </div>

              {/* Uploaded Photos Thumbnails Preview Grid */}
              {uploadedPhotos.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>الصور المرفوعة ({uploadedPhotos.length} صورة):</span>
                    <button
                      type="button"
                      onClick={() => setUploadedPhotos([])}
                      className="text-red-600 hover:underline text-[11px]"
                    >
                      مسح كافة الصور
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 bg-neutral-100 border border-neutral-300">
                    {uploadedPhotos.map((img, idx) => (
                      <div key={idx} className="relative aspect-square border border-neutral-900 bg-black group">
                        <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 right-0 bg-black/90 text-white text-[9px] px-1 font-bold">
                          #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== idx))}
                          className="absolute top-0 left-0 bg-red-600 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Step 4: Seller Info */}
            <div className="space-y-3 pt-3 border-t-2 border-neutral-900">
              <h4 className="text-sm font-black text-neutral-900 pb-1 border-b border-neutral-200">
                4. بيانات البائع العراقي للتواصل وتحويل الأموال
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">اسمك الثلاثي: *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سيف الكرخي"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">رقم الواتساب / الهاتف العراقي: *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0780xxxxxxx أو 0770xxxxxxx"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">المحافظة / المدينة:</label>
                  <select
                    value={sellerCity}
                    onChange={(e) => setSellerCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                  >
                    <option value="بغداد">بغداد</option>
                    <option value="البصرة">البصرة</option>
                    <option value="أربيل">أربيل</option>
                    <option value="النجف الأشرف">النجف الأشرف</option>
                    <option value="كربلاء المقدسة">كربلاء المقدسة</option>
                    <option value="الموصل">الموصل</option>
                    <option value="كركوك">كركوك</option>
                    <option value="بابل">بابل</option>
                    <option value="ذي قار">ذي قار</option>
                    <option value="السليمانية">السليمانية</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t-2 border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-neutral-500 font-semibold">
                🔒 الحساب سيخضع لموافقة الإدارة قبل الظهور للعامة.
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-8 py-3 bg-neutral-950 text-white font-black text-sm border-2 border-black hover:bg-neutral-800 transition-colors shadow-[3px_3px_0_0_#000000] flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>إرسال الحساب لموافقة الإدارة</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 bg-white text-neutral-700 font-bold text-xs border-2 border-neutral-900 hover:bg-neutral-100"
                >
                  إلغاء
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
