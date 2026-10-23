import { CustomerReview, PaymentCard, SiteSettings, ValorantAccount, ServerRegion } from '../types/store';

// Helper to generate a gallery of 22 realistic photo views for an account
export function generateGalleryPhotos(baseImage: string, accountName: string): string[] {
  const photos: string[] = [baseImage];
  // Curated Valorant screenshot perspectives
  const categories = [
    'سكن الفاندال الرئيسي والتطويرات',
    'سكين المشاجرة Melee Inspect',
    'سكن الفانتوم والباقات المميزة',
    'واجهة الحساب الرئيسية والرتبة الحالية',
    'سجل المباريات الأخير والانتصارات (Match History)',
    'باقة كولكشن السكنات كاملة (Collection View)',
    'سكنات المسدسات والجوست والشريف',
    'سكن الأوبريتور والقناصات النادرة',
    'مستوى الباتل باس والبطاقات الحصرية',
    'تعليقات الأسلحة (Gunbuddies) النادرة',
    'بخاخات وكروت اللاعب الحصرية (Player Cards)',
    'رصيد نقاط الفالورانت VP ونقاط الراديانيت RP',
    'عقود العملاء المكتملة (Agents Contracts)',
    'تأثير الإنهاء Finisher Animation',
    'سكن السبيكتر والأسلحة الرشاشة',
    'سكن الجادج والشوت جن',
    'تفاصيل الإيميل الأصلي وتاريخ إنشاء الحساب',
    'سيرفر الحساب وخيارات تغيير الاسم المجانية',
    'شاشة اللوبي وتشكيلة السكنات النشطة',
    'أعلى رتبة سابقة Peak Rank في المواسم الماضية',
    'سكن المارشال والأسلحة الجانبية',
    'صورة تأكيد الضمان ونظافة الحساب من أي تحذيرات'
  ];

  for (let i = 1; i < 22; i++) {
    const title = categories[i] || `صورة تفصيلية ${i + 1}`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="g${i}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#09090b" />
          <stop offset="50%" stop-color="#18181b" />
          <stop offset="100%" stop-color="#000000" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill="url(#g${i})" />
      <rect width="800" height="600" fill="url(#grid)" />
      
      <!-- Framing borders -->
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#ffffff" stroke-opacity="0.15" stroke-width="2" />
      <rect x="30" y="30" width="740" height="540" fill="none" stroke="#22c55e" stroke-opacity="0.25" stroke-width="1" />
      
      <!-- Top banner -->
      <path d="M 40 40 L 280 40 L 300 65 L 40 65 Z" fill="#000000" stroke="#ffffff" stroke-width="1.5" />
      <text x="55" y="58" fill="#22c55e" font-family="sans-serif" font-size="12" font-weight="900">VALORANT IRAQ // SCREEN #${i + 1}</text>
      
      <!-- Main Content Visual -->
      <circle cx="400" cy="270" r="95" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2" />
      <polygon points="400,200 455,295 345,295" fill="rgba(34,197,94,0.18)" stroke="#22c55e" stroke-width="2.5" />
      
      <!-- Labels in Arabic -->
      <text x="400" y="380" fill="#ffffff" font-family="sans-serif" font-size="22" font-weight="900" text-anchor="middle" direction="rtl">${title}</text>
      <text x="400" y="415" fill="#a1a1aa" font-family="sans-serif" font-size="15" text-anchor="middle">${accountName} · معاينة موثقة</text>
      
      <!-- Bottom bar -->
      <line x1="40" y1="520" x2="760" y2="520" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
      <text x="50" y="545" fill="#71717a" font-family="sans-serif" font-size="12" font-weight="bold">PHOTO ${i + 1} / 22 · HIGH DEFINITION ASSET</text>
      <text x="750" y="545" fill="#22c55e" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="end">IRAQI VALORANT STORE</text>
    </svg>`;
    photos.push(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
  }
  return photos;
}

// Small Square animated GIF representations
export const SAMPLE_SQUARE_GIFS = [
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1bHNyN2p6OHZ1MmpubXNuY253dzR3eDJueHl1ZG03OHVlMG03ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lpw1K9z63x801S69yT/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjhzYzl0YnpvaDFjNDB3dnl5bzN0aWVhNDZyeXQzd3d2ZHNqNm5wMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q80416yN32r9UfU00m/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2RyaWNudGttbzN1cWlycjhkcGQ1dWtkdWZob3Q3YmdzZ2Zva2JlaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kFgzrTt798d2w/giphy.gif'
];

export interface IconicServerInfo {
  id: ServerRegion;
  name: string;
  country: string;
  flag: string;
  pingIraq: string;
  pingColor: string;
  quality: string;
  highlight: string;
}

export const ICONIC_SERVERS: IconicServerInfo[] = [
  {
    id: 'TR',
    name: 'سيرفر إسطنبول (تركيا)',
    country: 'Turkey TR',
    flag: '🇹🇷',
    pingIraq: '28ms - 36ms',
    pingColor: 'text-emerald-600',
    quality: 'أسرع بنج واستجابة في العراق',
    highlight: 'المفضل لدى 80% من لاعبي العراق وخالي تماماً من اللاغ'
  },
  {
    id: 'EU',
    name: 'سيرفر فرانكفورت (ألمانيا)',
    country: 'Frankfurt EU',
    flag: '🇩🇪',
    pingIraq: '45ms - 52ms',
    pingColor: 'text-emerald-700',
    quality: 'سيرفر بطولات المحترفين والرتب العليا',
    highlight: 'رانكات تنافسية قوية جداً وسكنات أوروبية حصرية'
  },
  {
    id: 'MENA',
    name: 'سيرفر البحرين / دبي',
    country: 'Middle East MENA',
    flag: '🇧🇭',
    pingIraq: '20ms - 28ms',
    pingColor: 'text-emerald-600',
    quality: 'أقل بنج إقليمي + صوت عربي',
    highlight: 'تواصل صوتي عربي مباشر مع اللاعبين بدون فوارق لغوية'
  },
  {
    id: 'NA',
    name: 'سيرفر أمريكا الشمالية',
    country: 'North America',
    flag: '🇺🇸',
    pingIraq: '105ms - 120ms',
    pingColor: 'text-amber-600',
    quality: 'سيرفر الستريمرز والبطولات العالمية',
    highlight: 'حسابات حصرية من VCT ومجتمع بطولات أمريكا'
  }
];

export const INITIAL_ACCOUNTS: ValorantAccount[] = [
  {
    id: 'val-galaxy-flagship',
    title: 'حساب GALAXY الملكي | فانتوم النيبولا الكونية + خنجر المجرة وسكنات أسطورية',
    description: 'الحساب الرئيسي لمتجر GALAXY! باقة سيليستيال الكونية الكاملة مع فانتوم مجرة النجوم وخنجر النيبولا، بالإضافة إلى فاندال برايم، ريفر، وكارامبيت الأبطال. الإيميل الأصلي OGE متاح والتسليم فوري مع ضمان مدى الحياة.',
    priceIQD: 245000,
    priceUSD: 165,
    rank: 'Radiant',
    peakRank: 'Radiant #95',
    serverRegion: 'TR',
    level: 215,
    vp: 3100,
    radianite: 380,
    skinsCount: 58,
    featuredSkins: ['Celestial Galaxy Phantom', 'Nebula Dagger', 'Prime Vandal', 'Champions Karambit', 'Araxys Vandal', 'Reaver Sheriff'],
    knifeSkin: 'Nebula Galaxy Dagger',
    images: generateGalleryPhotos('/src/assets/images/galaxy_valorant_hero_1792781084379.jpg', 'حساب GALAXY الملكي الكوني'),
    gifUrl: SAMPLE_SQUARE_GIFS[1],
    hasOge: true,
    status: 'available',
    sellerName: 'متجر GALAXY (الإدارة)',
    sellerPhone: '07801234567',
    sellerCity: 'بغداد - المنصور',
    isStoreVerified: true,
    createdAt: '2026-10-23'
  },
  {
    id: 'val-iq-prime',
    title: 'فاندال برايم الذهبي الأيقوني الأصلي + راديانت سكين',
    description: 'السكن الأشهر في تاريخ فالورانت بلا منازع! باقة Prime الأصلية كاملة مع إعادة التلقيم الذئبية الشهيرة وتأثير الهيد شوت الليزري، مع سكين الكارامبيت ورتبة إيمورتال 3 جاهز لرفع التقييم. ضمان عراقي دائم وإيميل أول OGE.',
    priceIQD: 185000,
    priceUSD: 125,
    rank: 'Immortal',
    peakRank: 'Immortal 3 (335 RR)',
    serverRegion: 'TR',
    level: 195,
    vp: 2150,
    radianite: 260,
    skinsCount: 52,
    featuredSkins: ['Prime Vandal (الأيقوني)', 'Prime Karambit', 'Prime 2.0 Phantom', 'Reaver Vandal', 'Glitchpop Dagger', 'Sovereign Ghost'],
    knifeSkin: 'Prime 2.0 Karambit Gold',
    images: generateGalleryPhotos('/src/assets/images/valorant_prime_vandal_iconic_1792780253141.jpg', 'باقة برايم فاندال الذهبية الأيقونية'),
    gifUrl: SAMPLE_SQUARE_GIFS[0],
    hasOge: true,
    status: 'available',
    sellerName: 'متجر فالورانت العراقي (الإدارة)',
    sellerPhone: '07801234567',
    sellerCity: 'بغداد - المنصور',
    isStoreVerified: true,
    createdAt: '2026-10-23'
  },
  {
    id: 'val-iq-champions',
    title: 'باقة شامبيونز الذهبية المحدودة Champions 2024 + كارامبيت الأبطال',
    description: 'الحساب الأندر والأكثر فخامة! يحتوي على سكن الشامبيونز الذهبي الذي لن يعود لمتجر اللعبة للأبد مع هالة الأبطال عند تصدر القائمة، مع كارامبيت الشامبيونز المتوهج ولقب الراديانت. بنج منخفض جداً في تركيا (32ms).',
    priceIQD: 340000,
    priceUSD: 230,
    rank: 'Radiant',
    peakRank: 'Radiant #180 (Top 500)',
    serverRegion: 'TR',
    level: 265,
    vp: 3400,
    radianite: 410,
    skinsCount: 72,
    featuredSkins: ['Champions 2024 Vandal (نادر للأبد)', 'Champions 2024 Karambit', 'Champions 2023 Kunai', 'Kuronami Vandal', 'Araxys Operator', 'Prelude to Chaos Vandal'],
    knifeSkin: 'Champions 2024 Gold Karambit',
    images: generateGalleryPhotos('/src/assets/images/valorant_champions_gold_vandal_1792780252981.jpg', 'باقة شامبيونز الأبطال الذهبية'),
    gifUrl: SAMPLE_SQUARE_GIFS[1],
    hasOge: true,
    status: 'available',
    sellerName: 'كرار البصراوي (بائع عراقي موثق)',
    sellerPhone: '07709876543',
    sellerCity: 'البصرة - الجزائر',
    isStoreVerified: true,
    createdAt: '2026-10-22'
  },
  {
    id: 'val-iq-elderflame',
    title: 'فاندال التنين المشتعل Elderflame Dragon + كولكشن ناري كامل',
    description: 'سكن التنين الحي الشهير الأيقوني مع تنفس اللهب والزئير عند القتل وإعادة تلقيم التنين الحقيقي! يشمل خنجر اللهب وفانتوم الأوني وشريف الميج بونك. حساب سيرفر فرانكفورت نظيف 100%.',
    priceIQD: 165000,
    priceUSD: 110,
    rank: 'Ascendant',
    peakRank: 'Ascendant 3',
    serverRegion: 'EU',
    level: 142,
    vp: 1100,
    radianite: 190,
    skinsCount: 38,
    featuredSkins: ['Elderflame Dragon Vandal (التنين)', 'Elderflame Dagger', 'Oni Phantom', 'Ion Vandal', 'Reaver Sheriff', 'Singularity Phantom'],
    knifeSkin: 'Elderflame Dragon Flame Dagger',
    images: generateGalleryPhotos('/src/assets/images/valorant_elderflame_dragon_1792780252980.jpg', 'سكن التنين المشتعل الأسطوري'),
    gifUrl: SAMPLE_SQUARE_GIFS[2],
    hasOge: true,
    status: 'available',
    sellerName: 'أحمد السامرائي',
    sellerPhone: '07504567890',
    sellerCity: 'أربيل - عنكاوا',
    isStoreVerified: true,
    createdAt: '2026-10-21'
  },
  {
    id: 'val-iq-kuronami',
    title: 'حساب كورونامي نينجا الملكي + ريفر فانتوم القوطي',
    description: 'الحساب الأكثر طلباً في السوق العراقي! سلاسل وخنجري النينجا Kuronami No Yaiba مع فينيشر المطر والعاصفة، بالإضافة إلى باقة ريفر الفخمة وسيرفر الشرق الأوسط البحرين ببنج 24ms فقط.',
    priceIQD: 210000,
    priceUSD: 140,
    rank: 'Immortal',
    peakRank: 'Immortal 2 (190 RR)',
    serverRegion: 'MENA',
    level: 175,
    vp: 1800,
    radianite: 230,
    skinsCount: 46,
    featuredSkins: ['Kuronami No Yaiba (النينجا المزدوج)', 'Kuronami Vandal', 'Reaver Phantom', 'Prime Vandal', 'Arcane Sheriff', 'Xenohunter Knife'],
    knifeSkin: 'Kuronami No Yaiba (نصل النينجا المزدوج)',
    images: generateGalleryPhotos('/src/assets/images/valorant_account_kuronami_1792779080483.jpg', 'حساب كورونامي نينجا الملكي'),
    gifUrl: SAMPLE_SQUARE_GIFS[0],
    hasOge: true,
    status: 'available',
    sellerName: 'متجر الصقور (الإدارة)',
    sellerPhone: '07801234567',
    sellerCity: 'بغداد - الكرادة',
    isStoreVerified: true,
    createdAt: '2026-10-20'
  },
  {
    id: 'val-iq-reaver',
    title: 'حساب ريفير القوطي البنفسجي + أركين شريف الأصلي النادر',
    description: 'باقة الريفر الكاملة مع جرس الموت المرعب عند طلقة الرأس، سكين ريفر كارامبيت، وفانتوم الأركين الحصري من مسلسل Arcane. مناسب جداً للمنافسات مع ضمان استرجاع كامل مدى الحياة.',
    priceIQD: 155000,
    priceUSD: 105,
    rank: 'Diamond',
    peakRank: 'Ascendant 2',
    serverRegion: 'EU',
    level: 128,
    vp: 950,
    radianite: 170,
    skinsCount: 34,
    featuredSkins: ['Reaver Vandal (ريفر)', 'Reaver Karambit', 'Reaver Phantom', 'Arcane Sheriff', 'Gaia Vandal', 'Magepunk Ghost'],
    knifeSkin: 'Reaver Karambit Dark',
    images: generateGalleryPhotos('/src/assets/images/valorant_account_reaver_1792779081367.jpg', 'حساب ريفر القوطي البنفسجي'),
    gifUrl: SAMPLE_SQUARE_GIFS[2],
    hasOge: true,
    status: 'available',
    sellerName: 'سيف الكرخي',
    sellerPhone: '07809988776',
    sellerCity: 'النجف الأشرف',
    isStoreVerified: true,
    createdAt: '2026-10-19'
  },
  {
    id: 'val-iq-radiant-top',
    title: 'حساب راديانت توب 500 سيرفر تركي + سكين كارامبيت الذهب',
    description: 'حساب تنافسي من أعلى رتبة في اللعبة (Radiant) بسيرفر تركيا مع بنج منخفض جداً في العراق. سكنات نيو فرونتير وأيون وأراكسيس، تسليم فوري وتغيير كامل لكافة المعلومات.',
    priceIQD: 320000,
    priceUSD: 215,
    rank: 'Radiant',
    peakRank: 'Radiant #145',
    serverRegion: 'TR',
    level: 250,
    vp: 2500,
    radianite: 320,
    skinsCount: 60,
    featuredSkins: ['Champions Karambit', 'Araxys Vandal', 'Ion Phantom', 'Neo Frontier Operator', 'Sovereign Ghost', 'Glitchpop Axe'],
    knifeSkin: 'Champions Karambit Gold',
    images: generateGalleryPhotos('/src/assets/images/valorant_account_radiant_1792779080968.jpg', 'حساب راديانت توب 500 تركي'),
    gifUrl: SAMPLE_SQUARE_GIFS[1],
    hasOge: true,
    status: 'available',
    sellerName: 'إدارة المتجر',
    sellerPhone: '07801234567',
    sellerCity: 'بغداد',
    isStoreVerified: true,
    createdAt: '2026-10-18'
  }
];

export const INITIAL_PAYMENT_CARDS: PaymentCard[] = [
  {
    id: 'pay-zaincash',
    type: 'zaincash',
    name: 'زين كاش (Zain Cash)',
    englishName: 'Zain Cash Wallet',
    accountNumber: '0780 945 2211',
    holderName: 'متجر فالورانت العراقي / محمد علي',
    badge: 'الأسرع والأكثر استخداماً بالعراق',
    instructions: 'افتح تطبيق زين كاش واضغط على "تحويل أموال"، أدخل رقم المحفظة أعلاه، ثم أرسل إشعار التحويل أو لقطة الشاشة إلى واتساب الإدارة مع رمز الحساب لتسليمك فوراً.',
    accentBg: 'bg-white',
    accentText: 'text-neutral-900',
    isActive: true
  },
  {
    id: 'pay-qicard',
    type: 'qicard',
    name: 'كي كارد (Qi Card / ماستر كارد)',
    englishName: 'Qi Services / Master',
    accountNumber: '5324 8810 9942 6731',
    holderName: 'المتجر العراقي - حساب Qi المعتمد',
    badge: 'دفع مباشر عبر تطبيق خدماتي / Qi',
    instructions: 'يمكنك التحويل من بطاقة كي كارد إلى بطاقة كي كارد عبر تطبيق خدماتي مصرف الرافدين/كي، أدخل رقم البطاقة المذكور وسيتم التحقق خلال دقائق.',
    accentBg: 'bg-white',
    accentText: 'text-neutral-900',
    isActive: true
  },
  {
    id: 'pay-rafidain',
    type: 'rafidain',
    name: 'مصرف الرافدين (Rafidain Bank)',
    englishName: 'Rafidain Bank IBAN',
    accountNumber: 'IQ45 BIRA 0012 3456 7890 12',
    holderName: 'حساب تجاري معتمد - مصرف الرافدين الفرع الرئيسي',
    badge: 'حساب مصرفي معتمد ورسمي',
    instructions: 'التحويل المصرفي المباشر أو الإيداع عبر فروع مصرف الرافدين في كافة المحافظات العراقية. يرجى إرفاق وصل الإيداع.',
    accentBg: 'bg-white',
    accentText: 'text-neutral-900',
    isActive: true
  },
  {
    id: 'pay-asiacell',
    type: 'asiacell',
    name: 'آسيا سيل (Asia Cell كروت وتحويل رصيد)',
    englishName: 'Asia Cell Iraq Balance / Cards',
    accountNumber: '0770 123 9988',
    holderName: 'إدارة المبيعات - آسيا سيل العراق',
    badge: 'تحويل رصيد مباشر أو كروت شحن',
    instructions: 'نقبل تحويل الرصيد المباشر لرقم آسيا سيل الموضح أعلاه، أو إرسال أرقام كروت شحن آسيا سيل (فئة 10$، 25$، 50$ وما يعادلها) عبر الواتساب لتأكيد الشراء فوراً.',
    accentBg: 'bg-white',
    accentText: 'text-neutral-900',
    isActive: true
  },
  {
    id: 'pay-visa',
    type: 'visa',
    name: 'فيزا وماستر كارد (Visa & MasterCard)',
    englishName: 'Visa / MasterCard International & Local',
    accountNumber: '4282 9100 4432 8910',
    holderName: 'Iraqi Esports Store Co.',
    badge: 'الدفع الإلكتروني عبر البطاقات الدولية والمحلية',
    instructions: 'دفع آمن وسريع عبر أي بطاقة دفع فيزا أو ماستر كارد صادرة من البنوك العراقية (مصرف بغداد، التي بي آي TBI، البنك الأهلي العراقي، مصرف التنمية) أو دولياً.',
    accentBg: 'bg-white',
    accentText: 'text-neutral-900',
    isActive: true
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    customerName: 'حيدر الزيدي',
    city: 'بغداد - المنصور',
    rating: 5,
    comment: 'عاشت إيدكم والله! أسرع تسليم شفته بالعراق. حولت المبلغ عن طريق زين كاش وخلال دقيقتين استلمت يوزر وباسورد الحساب مع الإيميل الأصلي وتم تغيير كل البيانات بسهولة. الحساب فيه سكنات أكثر مما توقعت.',
    accountPurchased: 'حساب برايم فاندال الذهبي الأيقوني',
    date: 'منذ يومين',
    verified: true,
    isApproved: true
  },
  {
    id: 'rev-02',
    customerName: 'مروان البصراوي',
    city: 'البصرة - الطويسة',
    rating: 5,
    comment: 'تعامل راقي جداً وأمان 100%. كنت خايف من مسألة سحب الحساب بعد الشراء لكن المتجر وفرلي ضمان كامل وإيميل OGE أصلي. دفعت بكي كارد والتسليم كان فوري. شكراً جزيلاً لأخونا الآدمن.',
    accountPurchased: 'حساب شامبيونز الذهبي راديانت',
    date: 'منذ 4 أيام',
    verified: true,
    isApproved: true
  },
  {
    id: 'rev-03',
    customerName: 'ديار سوران',
    city: 'أربيل - بختياري',
    rating: 5,
    comment: 'سيرفس توب! عرضت حسابي القديم للبيع ووافق عليه الآدمن خلال ساعتين وانباع بنفس اليوم واستلمت الفلوس على محفظتي بدون أي تأخير. منصة مضمونة وفخر لكل اللاعبين بالعراق.',
    accountPurchased: 'خدمة بيع وعرض حساب موثق',
    date: 'منذ أسبوع',
    verified: true,
    isApproved: true
  },
  {
    id: 'rev-04',
    customerName: 'سيف الكرخي',
    city: 'النجف الأشرف',
    rating: 5,
    comment: 'اشتريت حساب ريفر فانتوم ودفعت عن طريق كروت آسيا سيل، التجاوب على الواتساب كان سريع جداً واستلمت الحساب مباشرة. أنصح أي شخص يلعب فالورانت يتعامل وياهم وهو مغمض.',
    accountPurchased: 'حساب ريفر القوطي البنفسجي',
    date: 'منذ أسبوع',
    verified: true,
    isApproved: true
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  storeName: 'GALAXY | متجر جالاكسي العراقي',
  tagline: 'المتجر العراقي الأول المعتمد لبيع وشراء حسابات فالورانت الفخمة مع ضمان الحماية وطرق الدفع المحلية',
  onlineCount: 198,
  onlineCountAutoJitter: true,
  usdToIqdRate: 1500,
  supportPhone: '07801234567',
  supportWhatsapp: '+9647801234567',
  supportTelegram: 'GalaxyValorantStore',
  supportDiscord: 'https://discord.gg/galaxy-iraq',
  discordServerName: 'سيرفر جالاكسي الرسمي | GALAXY VALORANT IRAQ',
  discordServerIconUrl: '',
  discordOnlineMembers: 432,
  discordTotalMembers: '+1,850 عضو عراقي',
  discordSectionTitle: 'سيرفر الديسكورد الرسمي وبروفايل الأونر (Owner Profile)',
  discordSectionSubtitle: 'انضم لأكبر تجمع للاعبي فالورانت بالعراق أو تواصل مباشرة مع مالك السيرفر والمتجر',
  discordPerk1Title: 'رومات تجميع الفرق',
  discordPerk1Desc: 'تيمات سريعة وبطولات 5v5',
  discordPerk2Title: 'بطولات أسبوعية',
  discordPerk2Desc: 'جوائز نقاط VP وزين كاش',
  discordPerk3Title: 'وساطة تجارة آمنة',
  discordPerk3Desc: 'إشراف كامل من الأونر',
  ownerDiscordTag: 'Abad#0001',
  ownerDisplayName: 'GALAXY Owner | أونر ومؤسس جالاكسي 👑',
  ownerRoleTitle: 'SERVER OWNER & FOUNDER',
  ownerAvatarUrl: '/src/assets/images/discord_owner_avatar_1792782282378.jpg',
  ownerAvatarIsGif: false,
  ownerBannerUrl: '/src/assets/images/discord_owner_banner_1792782297540.jpg',
  ownerBannerIsGif: false,
  ownerCustomBadges: ['💎 Nitro Booster', '⚡ 24m Server Booster', '👑 Server Owner', '🛡️ وساطة آمنة 100%'],
  ownerShowcasePhotos: [
    '/src/assets/images/discord_owner_avatar_1792782282378.jpg',
    '/src/assets/images/discord_owner_banner_1792782297540.jpg',
    '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg',
    '/src/assets/images/valorant_account_radiant_1792779080968.jpg'
  ],
  ownerBio: 'مالك ومؤسس متجر GALAXY وسيرفر الديسكورد العراقي 🇮🇶 · متاح دائماً للوساطة الآمنة، التحقق، والتسليم الفوري.',
  ownerDirectLink: 'https://discord.com/users/abad_owner',
  announcementText: '✨ متجر GALAXY العراقي: دفع فوري عبر زين كاش، كي كارد، ومصرف الرافدين مع ضمان عدم السحب مدى الحياة لكافة الحسابات!',
  showAnnouncement: true,
  heroImageUrl: '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg',
  heroImageTitle: 'GALAXY CELESTIAL PROTOCOL',
  heroImageSubtitle: 'باقة النيبولا والأسلحة الملكية'
};

export const SITE_HERO_PRESETS = [
  { id: 'galaxy_hero', name: 'جالاكسي كوني فاخر (الافتراضي)', url: '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg', title: 'GALAXY CELESTIAL PROTOCOL', subtitle: 'باقة النيبولا والأسلحة الملكية' },
  { id: 'champions_gold', name: 'شامبيونز الذهب الخالص', url: '/src/assets/images/valorant_champions_gold_vandal_1792780252981.jpg', title: 'CHAMPIONS 2024 GOLD', subtitle: 'أسلحة الأبطال الذهبية الحصرية' },
  { id: 'prime_vandal', name: 'فاندال برايم الأيقوني', url: '/src/assets/images/valorant_prime_vandal_iconic_1792780253141.jpg', title: 'PRIME LUXURY VANDAL', subtitle: 'الكلاسيكي الأكثر شهرة في تاريخ اللعبة' },
  { id: 'elderflame_dragon', name: 'التنين الحي المشتعل', url: '/src/assets/images/valorant_elderflame_dragon_1792780252980.jpg', title: 'ELDERFLAME DRAGON', subtitle: 'سكن التنين المشتعل والزئير الناري' },
  { id: 'kuronami_ninja', name: 'كورونامي نينجا الفاخر', url: '/src/assets/images/valorant_account_kuronami_1792779080483.jpg', title: 'KURONAMI NO YAIBA', subtitle: 'نصل النينجا المزدوج وفينيشر المطر' },
  { id: 'reaver_void', name: 'ريفر القوطي البنفسجي', url: '/src/assets/images/valorant_account_reaver_1792779081367.jpg', title: 'REAVER SOUL COLLECTOR', subtitle: 'باقة الريفر وصوت جرس الموت' },
  { id: 'radiant_apex', name: 'راديانت توب 500 كراون', url: '/src/assets/images/valorant_account_radiant_1792779080968.jpg', title: 'RADIANT APEX TOP 500', subtitle: 'حسابات القمة الملكية المضمونة' },
  { id: 'gif_galaxy_stars', name: 'GIF مجرة الفضاء السحيق المتحركة', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9mb3E4cG5ncm9wM3JqMngycXp4dzR3NmMxOHc1c2k2ZnR0eHB3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKtnuHOHHUjR38Y/giphy.gif', title: 'COSMIC GALAXY MOTION', subtitle: 'مجرة متحركة بالكامل بتقنية GIF' },
  { id: 'gif_neon_cyber', name: 'GIF سايبر ليزر نيون متحرك', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjhzYzl0YnpvaDFjNDB3dnl5bzN0aWVhNDZyeXQzd3d2ZHNqNm5wMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q80416yN32r9UfU00m/giphy.gif', title: 'CYBER NEON MATRIX', subtitle: 'موجات نيون سايبر بتقنية GIF' },
];

export const DISCORD_SERVER_GIF_PRESETS = [
  { id: 'srv_gif_galaxy', name: 'GIF مجرة جالاكسي نيون متحركة', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9mb3E4cG5ncm9wM3JqMngycXp4dzR3NmMxOHc1c2k2ZnR0eHB3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKtnuHOHHUjR38Y/giphy.gif' },
  { id: 'srv_gif_val_pulse', name: 'GIF راديانت نيون متوهج', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1bHNyN2p6OHZ1MmpubXNuY253dzR3eDJueHl1ZG03OHVlMG03ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lpw1K9z63x801S69yT/giphy.gif' },
  { id: 'srv_gif_crown', name: 'GIF تاج ذهبي مشتعل', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2RyaWNudGttbzN1cWlycjhkcGQ1dWtkdWZob3Q3YmdzZ2Zva2JlaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kFgzrTt798d2w/giphy.gif' },
  { id: 'srv_gif_cyber', name: 'GIF سايبر ماتريكس ليزري', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9rMHVpZjhpMm1vaGoxeWhkZjF6OTdyM3ZmdG11Zmd4bW41cXFhMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwk53BfZDEy8W8E/giphy.gif' },
  { id: 'srv_gif_flame', name: 'GIF طاقة فالورانت المظلمة', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHIyb214bHpnN2V2d2J1dTRkNXQ5MWhrNmQzNzRleWRpZ2JqZ3p6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif' },
  { id: 'srv_gif_nitro', name: 'GIF موجات نيون ملونة', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjhzYzl0YnpvaDFjNDB3dnl5bzN0aWVhNDZyeXQzd3d2ZHNqNm5wMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q80416yN32r9UfU00m/giphy.gif' }
];

export const OWNER_AVATAR_PRESETS = [
  { id: 'royal_crown', name: 'أونر ملكي تاج ذهبي (الافتراضي)', url: '/src/assets/images/discord_owner_avatar_1792782282378.jpg' },
  { id: 'galaxy_hero', name: 'جالاكسي كوني فاخر', url: '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg' },
  { id: 'radiant_apex', name: 'راديانت قمة التصنيف', url: '/src/assets/images/valorant_account_radiant_1792779080968.jpg' },
  { id: 'kuronami_ninja', name: 'كورونامي نينجا الظلال', url: '/src/assets/images/valorant_account_kuronami_1792779080483.jpg' },
  { id: 'champions_gold', name: 'شامبيونز فاندال ذهبي', url: '/src/assets/images/valorant_champions_gold_vandal_1792780252981.jpg' },
  { id: 'reaver_void', name: 'ريفر الفويد البنفسجي', url: '/src/assets/images/valorant_account_reaver_1792779081367.jpg' },
];

export const OWNER_GIF_AVATAR_PRESETS = [
  { id: 'gif_radiant_pulse', name: 'GIF راديانت نيون متحرك', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1bHNyN2p6OHZ1MmpubXNuY253dzR3eDJueHl1ZG03OHVlMG03ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lpw1K9z63x801S69yT/giphy.gif' },
  { id: 'gif_crown_sparks', name: 'GIF تاج ذهبي مشتعل', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2RyaWNudGttbzN1cWlycjhkcGQ1dWtkdWZob3Q3YmdzZ2Zva2JlaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kFgzrTt798d2w/giphy.gif' },
  { id: 'gif_cyber_galaxy', name: 'GIF نبض المجرة الكونية', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjhzYzl0YnpvaDFjNDB3dnl5bzN0aWVhNDZyeXQzd3d2ZHNqNm5wMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q80416yN32r9UfU00m/giphy.gif' },
  { id: 'gif_matrix_glitch', name: 'GIF جليتش ماتريكس نيون', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9rMHVpZjhpMm1vaGoxeWhkZjF6OTdyM3ZmdG11Zmd4bW41cXFhMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwk53BfZDEy8W8E/giphy.gif' },
  { id: 'gif_dark_energy', name: 'GIF طاقة مظلمة فالورانت', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHIyb214bHpnN2V2d2J1dTRkNXQ5MWhrNmQzNzRleWRpZ2JqZ3p6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif' },
  { id: 'gif_stars_motion', name: 'GIF نجوم ومجرة متحركة', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9mb3E4cG5ncm9wM3JqMngycXp4dzR3NmMxOHc1c2k2ZnR0eHB3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKtnuHOHHUjR38Y/giphy.gif' }
];

export const OWNER_BANNER_PRESETS = [
  { id: 'banner_galaxy_vip', name: 'بانر جالاكسي VIP الملكي الذهبي', url: '/src/assets/images/discord_owner_banner_1792782297540.jpg' },
  { id: 'banner_celestial', name: 'بانر سماء النجوم والمجرة', url: '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg' },
  { id: 'banner_prime_gold', name: 'بانر فاندال برايم الذهبي', url: '/src/assets/images/valorant_prime_vandal_iconic_1792780253141.jpg' },
];

export const OWNER_GIF_BANNER_PRESETS = [
  { id: 'banner_gif_galaxy', name: 'GIF بانر مجرة الفضاء السحيق متحرك', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9mb3E4cG5ncm9wM3JqMngycXp4dzR3NmMxOHc1c2k2ZnR0eHB3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKtnuHOHHUjR38Y/giphy.gif' },
  { id: 'banner_gif_neon_waves', name: 'GIF بانر موجات نيون ليزرية', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjhzYzl0YnpvaDFjNDB3dnl5bzN0aWVhNDZyeXQzd3d2ZHNqNm5wMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q80416yN32r9UfU00m/giphy.gif' },
  { id: 'banner_gif_cyber_grid', name: 'GIF بانر شبكة سايبر غولد', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9rMHVpZjhpMm1vaGoxeWhkZjF6OTdyM3ZmdG11Zmd4bW41cXFhMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwk53BfZDEy8W8E/giphy.gif' }
];


