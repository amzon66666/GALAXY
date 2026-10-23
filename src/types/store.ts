export type RankType = 
  | 'Iron' 
  | 'Bronze' 
  | 'Silver' 
  | 'Gold' 
  | 'Platinum' 
  | 'Diamond' 
  | 'Ascendant' 
  | 'Immortal' 
  | 'Radiant';

export type ServerRegion = 'EU' | 'TR' | 'MENA' | 'NA';

export interface ValorantAccount {
  id: string;
  title: string;
  description: string;
  priceIQD: number;
  priceUSD: number;
  rank: RankType;
  peakRank: string;
  serverRegion: ServerRegion;
  level: number;
  vp: number;
  radianite: number;
  skinsCount: number;
  featuredSkins: string[];
  knifeSkin: string;
  images: string[]; // Can hold >20 images
  gifUrl?: string; // Small square animated GIF
  hasOge: boolean; // Original Email included
  status: 'available' | 'pending_approval' | 'sold';
  sellerName: string;
  sellerPhone: string;
  sellerCity?: string;
  isStoreVerified: boolean;
  createdAt: string;
}

export type PaymentMethodType = 'rafidain' | 'qicard' | 'zaincash' | 'asiacell' | 'visa' | 'custom';

export interface PaymentCard {
  id: string;
  type: PaymentMethodType;
  name: string;
  englishName: string;
  accountNumber: string;
  holderName: string;
  badge: string;
  instructions: string;
  accentBg: string;
  accentText: string;
  isActive: boolean;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  city: string;
  rating: number; // 1 to 5
  comment: string;
  accountPurchased: string;
  date: string;
  verified: boolean;
  isApproved: boolean;
}

export interface SiteSettings {
  storeName: string;
  tagline: string;
  onlineCount: number;
  onlineCountAutoJitter: boolean;
  usdToIqdRate: number;
  supportPhone: string;
  supportWhatsapp: string;
  supportTelegram: string;
  supportDiscord: string;
  discordServerName: string;
  discordServerIconUrl?: string;
  discordOnlineMembers: number;
  discordTotalMembers?: string;
  discordSectionTitle?: string;
  discordSectionSubtitle?: string;
  discordPerk1Title?: string;
  discordPerk1Desc?: string;
  discordPerk2Title?: string;
  discordPerk2Desc?: string;
  discordPerk3Title?: string;
  discordPerk3Desc?: string;
  ownerDiscordTag: string;
  ownerDisplayName: string;
  ownerRoleTitle?: string;
  ownerAvatarUrl: string;
  ownerAvatarIsGif?: boolean;
  ownerBannerUrl?: string;
  ownerBannerIsGif?: boolean;
  ownerCustomBadges?: string[];
  ownerShowcasePhotos?: string[];
  ownerBio: string;
  ownerDirectLink: string;
  announcementText: string;
  showAnnouncement: boolean;
  heroImageUrl?: string;
  heroImageTitle?: string;
  heroImageSubtitle?: string;
}

