import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SITE_HERO_PRESETS } from '../data/defaultData';
import { 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  ArrowDownCircle, 
  CheckCircle2,
  Images,
  ExternalLink,
  Camera,
  Upload,
  Sparkles,
  X,
  Check,
  RotateCcw
} from 'lucide-react';

interface HeroProps {
  onOpenSellModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSellModal }) => {
  const { currentOnlineCount, settings, updateSettings, isAdminLoggedIn } = useStore();
  const [isEditingImage, setIsEditingImage] = useState(false);

  // Form states for hero image customization
  const currentHeroImg = settings.heroImageUrl || '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg';
  const currentHeroTitle = settings.heroImageTitle || 'GALAXY CELESTIAL PROTOCOL';
  const currentHeroSubtitle = settings.heroImageSubtitle || 'باقة النيبولا والأسلحة الملكية';

  const [editImageUrl, setEditImageUrl] = useState(currentHeroImg);
  const [editImageTitle, setEditImageTitle] = useState(currentHeroTitle);
  const [editImageSubtitle, setEditImageSubtitle] = useState(currentHeroSubtitle);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState('');

  // Handle local image / GIF file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setEditImageUrl(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveHeroImage = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      heroImageUrl: editImageUrl.trim(),
      heroImageTitle: editImageTitle.trim(),
      heroImageSubtitle: editImageSubtitle.trim(),
    });
    setSaveSuccessNotice('تم حفظ وتحديث صورة وبيانات الموقع بنجاح!');
    setTimeout(() => {
      setSaveSuccessNotice('');
      setIsEditingImage(false);
    }, 1200);
  };

  const handleResetDefault = () => {
    setEditImageUrl('/src/assets/images/galaxy_valorant_hero_1792781084379.jpg');
    setEditImageTitle('GALAXY CELESTIAL PROTOCOL');
    setEditImageSubtitle('باقة النيبولا والأسلحة الملكية');
  };

  return (
    <section className="bg-white border-b-2 border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 border border-neutral-900 text-xs font-bold text-neutral-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>متجر GALAXY العراقي المعتمد 🇮🇶</span>
              <span className="text-neutral-400">·</span>
              <span className="text-emerald-700 font-black">{currentOnlineCount} متصل الآن</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight leading-tight [text-wrap:balance]">
              GALAXY · سوق حسابات فالورانت الفخمة في العراق
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-medium">
              أهلاً بكم في متجر GALAXY العراقي. تصفح الحسابات النادرة الملكية مع فحص أكثر من 20 صورة لكل حساب، ومربع GIF متحرك، وتسليم فوري بدقائق عبر زين كاش، كي كارد، الرافدين، وآسيا سيل.
            </p>

            {/* Quick 3 guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-neutral-50 border border-neutral-900 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">ضمان 100% مدى الحياة</h4>
                  <p className="text-[11px] text-neutral-500">مع الإيميل الأصلي OGE</p>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-900 flex items-start gap-2.5">
                <CreditCard className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">دفع عراقي معتمد</h4>
                  <p className="text-[11px] text-neutral-500">زين كاش، كي، الرافدين</p>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-900 flex items-start gap-2.5">
                <Images className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">+20 صورة تفصيلية</h4>
                  <p className="text-[11px] text-neutral-500">مع مربع GIF متحرك</p>
                </div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#accounts"
                className="px-6 py-3 bg-neutral-950 text-white font-bold text-sm border-2 border-black hover:bg-neutral-800 transition-colors shadow-[3px_3px_0_0_#000000] flex items-center gap-2"
              >
                <span>تصفح الحسابات فوراً</span>
                <ArrowDownCircle className="w-4 h-4" />
              </a>

              <a
                href="#discord-server"
                className="px-5 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm border-2 border-neutral-950 transition-colors shadow-[3px_3px_0_0_#18181b] flex items-center gap-2"
              >
                <span>سيرفر الديسكورد الرسمي</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenSellModal}
                className="px-5 py-3 bg-white text-neutral-900 font-bold text-sm border-2 border-neutral-900 hover:bg-neutral-100 transition-colors shadow-[3px_3px_0_0_#18181b] flex items-center gap-2"
              >
                <span>اعرض حسابك للبيع</span>
                <Zap className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative border-2 border-neutral-950 bg-white p-2 shadow-[6px_6px_0_0_#0a0a0a] group">
              
              {/* Admin Quick Edit Button on the image */}
              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    setEditImageUrl(settings.heroImageUrl || '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg');
                    setEditImageTitle(settings.heroImageTitle || 'GALAXY CELESTIAL PROTOCOL');
                    setEditImageSubtitle(settings.heroImageSubtitle || 'باقة النيبولا والأسلحة الملكية');
                    setIsEditingImage(true);
                  }}
                  className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-neutral-950/95 hover:bg-black text-white text-xs font-black border-2 border-white flex items-center gap-1.5 shadow-[2px_2px_0_0_#000000] transition-transform hover:scale-105"
                  title="تعديل صورة وبانر الموقع الرئيسي"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تعديل صورة الموقع</span>
                </button>
              )}

              <div className="relative overflow-hidden bg-neutral-950 aspect-[4/3]">
                <img
                  src={currentHeroImg}
                  alt={currentHeroTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient and Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase block">
                        {currentHeroTitle}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {currentHeroSubtitle}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-white text-black text-xs font-black shadow">
                      تسليم فوري
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 px-1 flex items-center justify-between text-xs text-neutral-600 font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  حسابات مفحوصة ومضمونة
                </span>
                <span className="tabular-nums">سيرفرات TR / EU / MENA</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Hero Image Editor Modal (Accessible to Admin) */}
      {isEditingImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border-2 border-neutral-900 shadow-[8px_8px_0_0_#000000] w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 bg-neutral-950 text-white border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">
                  تعديل صورة الموقع الرئيسية (Hero Banner & GIF)
                </h3>
              </div>
              <button
                onClick={() => setIsEditingImage(false)}
                className="p-1 border border-white hover:bg-neutral-800 text-white"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveHeroImage} className="p-5 flex-1 overflow-y-auto space-y-5">
              
              {/* Success notice */}
              {saveSuccessNotice && (
                <div className="p-3 bg-emerald-100 border-2 border-emerald-600 text-emerald-950 text-xs font-black flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>{saveSuccessNotice}</span>
                </div>
              )}

              {/* Live Preview Box */}
              <div>
                <label className="text-xs font-black text-neutral-900 block mb-1.5">
                  معاينة مباشرة لشكل الصورة في واجهة الموقع:
                </label>
                <div className="relative border-2 border-neutral-900 bg-black aspect-[16/9] overflow-hidden max-h-56">
                  <img
                    src={editImageUrl}
                    alt="معاينة صورة الموقع"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase">
                      {editImageTitle || 'GALAXY CELESTIAL PROTOCOL'}
                    </span>
                    <h4 className="text-sm font-bold">
                      {editImageSubtitle || 'باقة النيبولا والأسلحة الملكية'}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Upload image / GIF or enter URL */}
              <div className="p-4 bg-neutral-50 border-2 border-neutral-900 space-y-3">
                <span className="text-xs font-black text-neutral-900 block">
                  طرق تعيين الصورة (رابط مباشر أو رفع ملف أو صورة GIF متحركة):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  {/* File Upload (Supports GIF / JPG / PNG) */}
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      رفع صورة أو GIF من جهازك:
                    </label>
                    <label className="flex items-center justify-center gap-2 px-3 py-2 bg-white border-2 border-dashed border-neutral-900 cursor-pointer hover:bg-neutral-100 text-xs font-black text-neutral-900 transition-colors">
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span>اختر ملف من جهازك (JPG/PNG/GIF)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Direct URL Input */}
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      أو ضع رابط صورة / GIF مباشر (URL):
                    </label>
                    <input
                      type="text"
                      value={editImageUrl}
                      onChange={(e) => setEditImageUrl(e.target.value)}
                      placeholder="https://... أو /src/assets/images/..."
                      className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 1-Click Preset Gallery Cards */}
              <div>
                <label className="text-xs font-black text-neutral-900 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>أو اختر من التشكيلات والباقات الجاهزة بنقرة واحدة (مع خيارات GIF متحركة):</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1 border border-neutral-200">
                  {SITE_HERO_PRESETS.map((preset) => {
                    const isSelected = editImageUrl === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setEditImageUrl(preset.url);
                          setEditImageTitle(preset.title);
                          setEditImageSubtitle(preset.subtitle);
                        }}
                        className={`text-right border-2 p-1.5 transition-all flex flex-col gap-1 relative ${
                          isSelected
                            ? 'border-neutral-950 bg-neutral-950 text-white shadow'
                            : 'border-neutral-300 bg-neutral-50 hover:border-neutral-900 text-neutral-800'
                        }`}
                      >
                        <div className="relative aspect-[16/10] bg-black overflow-hidden">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                          {preset.url.endsWith('.gif') && (
                            <span className="absolute top-1 right-1 bg-emerald-500 text-black text-[8px] font-black px-1 uppercase">
                              GIF
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-black truncate">{preset.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text customizer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">
                    النص العلوي الصغير (Title Badge):
                  </label>
                  <input
                    type="text"
                    value={editImageTitle}
                    onChange={(e) => setEditImageTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">
                    العنوان المكتوب على الصورة (Subtitle):
                  </label>
                  <input
                    type="text"
                    value={editImageSubtitle}
                    onChange={(e) => setEditImageSubtitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-900 bg-white font-bold"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-neutral-950 text-white font-black text-xs border-2 border-black hover:bg-neutral-800 transition-colors shadow-[2px_2px_0_0_#000000]"
                  >
                    حفظ وتحديث صورة الموقع فوراً
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingImage(false)}
                    className="px-3 py-2.5 bg-white text-neutral-700 font-bold text-xs border border-neutral-900"
                  >
                    إلغاء
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-bold border border-neutral-400 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة الافتراضي</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
