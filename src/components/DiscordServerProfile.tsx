import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  OWNER_AVATAR_PRESETS, 
  OWNER_BANNER_PRESETS,
  OWNER_GIF_AVATAR_PRESETS,
  OWNER_GIF_BANNER_PRESETS
} from '../data/defaultData';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Volume2, 
  Trophy, 
  MessageSquare, 
  Edit3,
  Crown,
  Sparkles,
  Flame,
  BadgeCheck,
  Image as ImageIcon,
  Upload,
  X,
  Eye,
  Maximize2,
  Film,
  Plus,
  Trash2,
  Server,
  Settings,
  Smile
} from 'lucide-react';

export const DiscordServerProfile: React.FC = () => {
  const { settings, updateSettings, isAdminLoggedIn } = useStore();
  const [copiedServerLink, setCopiedServerLink] = useState(false);
  const [copiedOwnerTag, setCopiedOwnerTag] = useState(false);
  
  // Lightbox preview for photos
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Admin Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editorTab, setEditorTab] = useState<'photos' | 'server' | 'owner' | 'showcase'>('photos');

  // Form states - Server
  const [editServerName, setEditServerName] = useState(settings.discordServerName || 'سيرفر جالاكسي الرسمي | GALAXY VALORANT IRAQ');
  const [editServerLink, setEditServerLink] = useState(settings.supportDiscord || 'https://discord.gg/galaxy-iraq');
  const [editServerIcon, setEditServerIcon] = useState(settings.discordServerIconUrl || '');
  const [editOnlineCount, setEditOnlineCount] = useState((settings.discordOnlineMembers ?? 432).toString());
  const [editTotalMembers, setEditTotalMembers] = useState(settings.discordTotalMembers || '+1,850 عضو عراقي');
  const [editSectionTitle, setEditSectionTitle] = useState(settings.discordSectionTitle || 'سيرفر الديسكورد الرسمي وبروفايل الأونر (Owner Profile)');
  const [editSectionSubtitle, setEditSectionSubtitle] = useState(settings.discordSectionSubtitle || 'انضم لأكبر تجمع للاعبي فالورانت بالعراق أو تواصل مباشرة مع مالك السيرفر والمتجر');

  // Server Perks
  const [perk1Title, setPerk1Title] = useState(settings.discordPerk1Title || 'رومات تجميع الفرق');
  const [perk1Desc, setPerk1Desc] = useState(settings.discordPerk1Desc || 'تيمات سريعة وبطولات 5v5');
  const [perk2Title, setPerk2Title] = useState(settings.discordPerk2Title || 'بطولات أسبوعية');
  const [perk2Desc, setPerk2Desc] = useState(settings.discordPerk2Desc || 'جوائز نقاط VP وزين كاش');
  const [perk3Title, setPerk3Title] = useState(settings.discordPerk3Title || 'وساطة تجارة آمنة');
  const [perk3Desc, setPerk3Desc] = useState(settings.discordPerk3Desc || 'إشراف كامل من الأونر');

  // Form states - Owner
  const [editOwnerName, setEditOwnerName] = useState(settings.ownerDisplayName || 'GALAXY Owner | أونر ومؤسس جالاكسي 👑');
  const [editOwnerRoleTitle, setEditOwnerRoleTitle] = useState(settings.ownerRoleTitle || 'SERVER OWNER & FOUNDER');
  const [editOwnerTag, setEditOwnerTag] = useState(settings.ownerDiscordTag || 'Abad#0001');
  const [editOwnerBio, setEditOwnerBio] = useState(settings.ownerBio || 'مالك ومؤسس متجر GALAXY وسيرفر الديسكورد العراقي 🇮🇶 · متاح دائماً للوساطة الآمنة، التحقق، والتسليم الفوري.');
  const [editOwnerLink, setEditOwnerLink] = useState(settings.ownerDirectLink || 'https://discord.com/users/abad_owner');
  
  // Photos & GIFs
  const [editOwnerAvatar, setEditOwnerAvatar] = useState(settings.ownerAvatarUrl || '/src/assets/images/discord_owner_avatar_1792782282378.jpg');
  const [ownerAvatarIsGif, setOwnerAvatarIsGif] = useState(settings.ownerAvatarIsGif || false);
  const [editOwnerBanner, setEditOwnerBanner] = useState(settings.ownerBannerUrl || '/src/assets/images/discord_owner_banner_1792782297540.jpg');
  const [ownerBannerIsGif, setOwnerBannerIsGif] = useState(settings.ownerBannerIsGif || false);

  // Badges
  const [badgesList, setBadgesList] = useState<string[]>(
    settings.ownerCustomBadges && settings.ownerCustomBadges.length > 0
      ? settings.ownerCustomBadges
      : ['💎 Nitro Booster', '⚡ 24m Server Booster', '👑 Server Owner', '🛡️ وساطة آمنة 100%']
  );
  const [newBadgeText, setNewBadgeText] = useState('');

  // Showcase Photos
  const [showcasePhotos, setShowcasePhotos] = useState<string[]>(
    settings.ownerShowcasePhotos && settings.ownerShowcasePhotos.length > 0
      ? settings.ownerShowcasePhotos
      : [
          '/src/assets/images/discord_owner_avatar_1792782282378.jpg',
          '/src/assets/images/discord_owner_banner_1792782297540.jpg',
          '/src/assets/images/galaxy_valorant_hero_1792781084379.jpg',
          '/src/assets/images/valorant_account_radiant_1792779080968.jpg'
        ]
  );
  const [newShowcasePhotoUrl, setNewShowcasePhotoUrl] = useState('');

  const handleCopyServer = () => {
    navigator.clipboard.writeText(settings.supportDiscord || 'https://discord.gg/galaxy-iraq');
    setCopiedServerLink(true);
    setTimeout(() => setCopiedServerLink(false), 2500);
  };

  const handleCopyOwner = () => {
    navigator.clipboard.writeText(settings.ownerDiscordTag || 'Abad#0001');
    setCopiedOwnerTag(true);
    setTimeout(() => setCopiedOwnerTag(false), 2500);
  };

  // Upload handlers (supports GIF files as well)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'avatar' | 'banner' | 'serverIcon' | 'showcase') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isGifFile = file.type === 'image/gif' || file.name.toLowerCase().endsWith('.gif');

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (target === 'avatar') {
        setEditOwnerAvatar(result);
        if (isGifFile) setOwnerAvatarIsGif(true);
      } else if (target === 'banner') {
        setEditOwnerBanner(result);
        if (isGifFile) setOwnerBannerIsGif(true);
      } else if (target === 'serverIcon') {
        setEditServerIcon(result);
      } else if (target === 'showcase') {
        setShowcasePhotos(prev => [...prev, result]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddBadge = () => {
    if (newBadgeText.trim()) {
      setBadgesList(prev => [...prev, newBadgeText.trim()]);
      setNewBadgeText('');
    }
  };

  const handleRemoveBadge = (idx: number) => {
    setBadgesList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddShowcasePhoto = () => {
    if (newShowcasePhotoUrl.trim()) {
      setShowcasePhotos(prev => [...prev, newShowcasePhotoUrl.trim()]);
      setNewShowcasePhotoUrl('');
    }
  };

  const handleRemoveShowcasePhoto = (index: number) => {
    setShowcasePhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      supportDiscord: editServerLink.trim(),
      discordServerName: editServerName.trim(),
      discordServerIconUrl: editServerIcon.trim(),
      discordOnlineMembers: parseInt(editOnlineCount, 10) || 432,
      discordTotalMembers: editTotalMembers.trim(),
      discordSectionTitle: editSectionTitle.trim(),
      discordSectionSubtitle: editSectionSubtitle.trim(),
      discordPerk1Title: perk1Title.trim(),
      discordPerk1Desc: perk1Desc.trim(),
      discordPerk2Title: perk2Title.trim(),
      discordPerk2Desc: perk2Desc.trim(),
      discordPerk3Title: perk3Title.trim(),
      discordPerk3Desc: perk3Desc.trim(),
      ownerDiscordTag: editOwnerTag.trim(),
      ownerDisplayName: editOwnerName.trim(),
      ownerRoleTitle: editOwnerRoleTitle.trim(),
      ownerBio: editOwnerBio.trim(),
      ownerDirectLink: editOwnerLink.trim(),
      ownerAvatarUrl: editOwnerAvatar.trim(),
      ownerAvatarIsGif: ownerAvatarIsGif,
      ownerBannerUrl: editOwnerBanner.trim(),
      ownerBannerIsGif: ownerBannerIsGif,
      ownerCustomBadges: badgesList,
      ownerShowcasePhotos: showcasePhotos,
    });
    setIsEditing(false);
  };

  const currentAvatar = settings.ownerAvatarUrl || '/src/assets/images/discord_owner_avatar_1792782282378.jpg';
  const currentBanner = settings.ownerBannerUrl || '/src/assets/images/discord_owner_banner_1792782297540.jpg';
  const currentShowcase = settings.ownerShowcasePhotos && settings.ownerShowcasePhotos.length > 0 
    ? settings.ownerShowcasePhotos 
    : showcasePhotos;
  const currentBadges = settings.ownerCustomBadges && settings.ownerCustomBadges.length > 0 
    ? settings.ownerCustomBadges 
    : badgesList;

  return (
    <section id="discord-server" className="py-12 bg-neutral-50 border-b-2 border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-neutral-900">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5865F2] text-white text-xs font-black uppercase tracking-wider mb-2 border border-neutral-900 shadow-[2px_2px_0_0_#000000]">
              <div className="relative">
                {/* Discord Icon */}
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.86,53,48.83,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
                {/* Pulsing Green Dot right on Discord mark */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-neutral-950"></span>
                </span>
              </div>
              <span>DISCORD HUB · مجتمع وسيرفر فالورانت العراقي</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950">
              {settings.discordSectionTitle || 'سيرفر الديسكورد الرسمي وبروفايل الأونر (Owner Profile)'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
              {settings.discordSectionSubtitle || 'انضم لأكبر تجمع للاعبي فالورانت بالعراق أو تواصل مباشرة مع مالك السيرفر والمتجر'}
            </p>
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 bg-neutral-950 hover:bg-black text-white text-xs font-black border-2 border-neutral-900 flex items-center gap-2 shadow-[3px_3px_0_0_#10b981] transition-transform active:scale-95"
            >
              <Edit3 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>تعديل خانة الديسكورد وصور GIF الأونر</span>
            </button>
          )}
        </div>

        {/* Dual Cards Grid: Server Profile + Owner Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CARD 1: Official Discord Server Profile (6 cols) */}
          <div className="lg:col-span-6 bg-white border-2 border-neutral-900 shadow-[6px_6px_0_0_#18181b] p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            
            {/* Quick Admin Edit Trigger overlay button when hovering */}
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  setEditorTab('server');
                  setIsEditing(true);
                }}
                className="absolute top-3 left-3 z-20 px-2 py-1 bg-black text-white text-[10px] font-bold border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md"
              >
                <Edit3 className="w-3 h-3 text-emerald-400" />
                <span>تعديل السيرفر</span>
              </button>
            )}

            {/* Corner Decorative Watermark */}
            <div className="absolute -left-6 -bottom-6 text-neutral-900/5 select-none pointer-events-none font-black text-8xl">
              GALAXY
            </div>

            <div className="space-y-5 relative z-10">
              
              {/* Server Avatar + Name */}
              <div className="flex items-start sm:items-center gap-4">
                
                {/* Server Icon (Supports Custom Image / GIF or Discord SVG) with Pulsing Green Dot */}
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 bg-[#5865F2] border-2 border-neutral-950 shadow-[3px_3px_0_0_#000000] flex items-center justify-center text-white shrink-0 overflow-hidden">
                  {settings.discordServerIconUrl ? (
                    <img 
                      src={settings.discordServerIconUrl} 
                      alt="أيقونة السيرفر" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <svg className="w-10 h-10 fill-current" viewBox="0 0 127.14 96.36">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.86,53,48.83,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                    </svg>
                  )}
                  
                  {/* USER REQUEST: Pulsing Green Dot right on Discord icon */}
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4" title="سيرفر نشط أونلاين">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-neutral-950 shadow-[0_0_10px_#10b981]"></span>
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-neutral-900 text-white px-2 py-0.5 uppercase">
                      الديسكورد الرسمي
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      سيرفر موثق ومعتمد
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-neutral-950">
                    {settings.discordServerName}
                  </h3>

                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <strong className="font-black tabular-nums">{settings.discordOnlineMembers ?? 432}</strong>
                      <span>متصل الآن</span>
                    </span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-600 font-semibold">
                      {settings.discordTotalMembers || '+1,850 عضو عراقي'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Server Features / Perks (Fully Editable) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 bg-neutral-50 border border-neutral-900 text-xs font-bold text-neutral-800 space-y-1">
                  <Volume2 className="w-4 h-4 text-[#5865F2]" />
                  <div className="font-black">{settings.discordPerk1Title || 'رومات تجميع الفرق'}</div>
                  <p className="text-[11px] text-neutral-500 font-normal">{settings.discordPerk1Desc || 'تيمات سريعة وبطولات 5v5'}</p>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-900 text-xs font-bold text-neutral-800 space-y-1">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <div className="font-black">{settings.discordPerk2Title || 'بطولات أسبوعية'}</div>
                  <p className="text-[11px] text-neutral-500 font-normal">{settings.discordPerk2Desc || 'جوائز نقاط VP وزين كاش'}</p>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-900 text-xs font-bold text-neutral-800 space-y-1">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <div className="font-black">{settings.discordPerk3Title || 'وساطة تجارة آمنة'}</div>
                  <p className="text-[11px] text-neutral-500 font-normal">{settings.discordPerk3Desc || 'إشراف كامل من الأونر'}</p>
                </div>
              </div>

            </div>

            {/* Server Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t-2 border-neutral-900 relative z-10">
              <a
                href={settings.supportDiscord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black text-xs sm:text-sm border-2 border-neutral-950 shadow-[3px_3px_0_0_#000000] flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                {/* Discord Icon with Pulsing Dot in button */}
                <div className="relative">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.86,53,48.83,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                </div>
                <span>انضم إلى سيرفر الديسكورد الرسمي</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyServer}
                className={`py-3 px-4 border-2 border-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  copiedServerLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-neutral-100 text-neutral-900 shadow-[2px_2px_0_0_#18181b]'
                }`}
              >
                {copiedServerLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تم نسخ الرابط!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ رابط السيرفر</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* CARD 2: Server Owner Discord Profile (6 cols) with GIF Avatar, GIF Banner & Full Editing */}
          <div className="lg:col-span-6 bg-neutral-950 text-white border-2 border-black shadow-[6px_6px_0_0_#000000] flex flex-col justify-between overflow-hidden relative group">
            
            {/* Quick Admin Edit Trigger */}
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  setEditorTab('photos');
                  setIsEditing(true);
                }}
                className="absolute top-3 left-3 z-30 px-2.5 py-1 bg-amber-400 text-black text-[10px] font-black border border-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md"
              >
                <Film className="w-3 h-3" />
                <span>تعديل صور و GIF الأونر</span>
              </button>
            )}

            <div>
              {/* Discord Nitro Style Cover Banner (Supports GIF) */}
              <div className="relative h-28 sm:h-34 w-full bg-neutral-900 border-b-2 border-neutral-800 overflow-hidden">
                <img
                  src={currentBanner}
                  alt="بانر بروفايل الأونر"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-black/30" />
                
                {/* Top Role Badges over banner */}
                <div className="absolute top-2.5 right-3 left-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/85 backdrop-blur-sm border border-amber-400/80 text-amber-300 text-[10px] font-black">
                    <Crown className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{settings.ownerRoleTitle || 'SERVER OWNER & FOUNDER'}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* GIF Banner Badge if animated */}
                    {settings.ownerBannerIsGif && (
                      <span className="px-1.5 py-0.5 bg-purple-600 text-white text-[9px] font-black uppercase tracking-wider border border-purple-400">
                        GIF BANNER
                      </span>
                    )}
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-black/85 backdrop-blur-sm border border-emerald-500/80 text-emerald-400 text-[10px] font-bold">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>أونر موثق</span>
                    </span>
                  </div>
                </div>

                {/* Lightbox trigger for banner */}
                <button
                  type="button"
                  onClick={() => setActiveLightboxImage(currentBanner)}
                  className="absolute bottom-2 left-2 p-1.5 bg-black/70 hover:bg-black text-white/80 hover:text-white border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="تكبير البانر"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Owner Avatar + Profile Details Section */}
              <div className="px-6 pb-4 pt-0 space-y-4">
                
                {/* Avatar overlap on banner */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 -mt-10 sm:-mt-12 relative z-10">
                  
                  {/* Avatar Frame with GIF support and Pulsing Green Online Dot */}
                  <div className="flex items-end gap-3.5">
                    <div className="relative group/avatar cursor-pointer" onClick={() => setActiveLightboxImage(currentAvatar)}>
                      <div className="w-20 h-20 sm:w-22 sm:h-22 bg-neutral-900 border-3 border-amber-400 overflow-hidden shadow-2xl relative">
                        <img
                          src={currentAvatar}
                          alt="بروفايل الأونر"
                          className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* GIF Avatar Badge */}
                      {settings.ownerAvatarIsGif && (
                        <span className="absolute top-0 right-0 px-1 py-0.2 bg-purple-600 text-white text-[8px] font-black border border-black shadow-sm">
                          GIF
                        </span>
                      )}

                      {/* USER REQUEST: Pulsing Green Online Dot directly on Avatar corner */}
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4" title="أونلاين متصل بالديسكورد">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-neutral-950 shadow-[0_0_10px_#10b981]"></span>
                      </span>
                    </div>

                    <div className="space-y-0.5 pb-1">
                      <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                        {settings.ownerDisplayName || 'Abad | الأونر والمؤسس'}
                      </h4>
                      <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                        <span>{settings.ownerDiscordTag || 'Abad#0001'}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-semibold block">
                        مالك متجر GALAXY وسيرفر فالورانت العراقي
                      </span>
                    </div>
                  </div>

                  {/* USER REQUEST: Dedicated Discord Badge WITH PULSING GREEN DOT ON THE DISCORD ICON */}
                  <div className="flex items-center gap-2 self-start sm:self-end">
                    <div className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-[#5865F2] border-2 border-neutral-900 shadow-[2px_2px_0_0_#000000]">
                      {/* Discord Logo with Pulsing Green Dot right on it */}
                      <div className="relative flex items-center justify-center">
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 127.14 96.36">
                          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.86,53,48.83,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                        </svg>
                        {/* THE PULSING GREEN DOT ON DISCORD EMBLEM */}
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-90"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-neutral-950 shadow-[0_0_6px_#10b981]"></span>
                        </span>
                      </div>
                      <span className="text-[11px] font-black text-white">متصل ديسكورد</span>
                    </div>
                  </div>

                </div>

                {/* Discord Badges Row (Fully Editable by Admin) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {currentBadges.map((badge, bIdx) => (
                    <span 
                      key={bIdx} 
                      className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-300 flex items-center gap-1"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Owner Bio */}
                <div className="p-3 bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-medium">
                  "{settings.ownerBio || 'مالك ومؤسس متجر GALAXY وسيرفر الديسكورد العراقي 🇮🇶 · متاح دائماً للوساطة الآمنة، التحقق، والتسليم الفوري.'}"
                </div>

                {/* Showcase / Proof Photos Gallery for Owner */}
                {currentShowcase && currentShowcase.length > 0 && (
                  <div className="pt-2 border-t border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black text-neutral-300 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>معرض صور وتوثيقات الأونر ({currentShowcase.length} صور)</span>
                      </span>
                      <span className="text-[10px] text-neutral-500 font-semibold">اضغط لتكبير أي صورة</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {currentShowcase.map((photo, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveLightboxImage(photo)}
                          className="relative aspect-video sm:aspect-square bg-neutral-900 border border-neutral-800 hover:border-amber-400 overflow-hidden cursor-pointer group shadow-sm transition-all"
                        >
                          <img
                            src={photo}
                            alt={`صورة توثيق ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Owner Actions */}
            <div className="p-6 pt-3 space-y-2 border-t border-neutral-800">
              <a
                href={settings.ownerDirectLink || settings.supportDiscord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-white text-neutral-950 font-black text-xs hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 border-2 border-white shadow-[2px_2px_0_0_#ffffff]"
              >
                {/* Discord Icon with Pulsing Dot in Direct DM Button */}
                <div className="relative">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 127.14 96.36">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.86,53,48.83,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                </div>
                <span>تواصل مباشر مع الأونر عبر ديسكورد</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-900" />
              </a>

              <button
                onClick={handleCopyOwner}
                className={`w-full py-2 px-3 border border-neutral-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  copiedOwnerTag
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200'
                }`}
              >
                {copiedOwnerTag ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم نسخ يوزر الأونر: {settings.ownerDiscordTag}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ يوزر الأونر: {settings.ownerDiscordTag}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* COMPREHENSIVE DISCORD & OWNER EDITING MODAL (FOR ADMIN) */}
        {isEditing && isAdminLoggedIn && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-white border-2 border-neutral-900 shadow-[8px_8px_0_0_#000000] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
              
              {/* Modal Top Header */}
              <div className="p-4 bg-neutral-950 text-white border-b-2 border-black flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-[#5865F2] text-white">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      لوحة تعديل خانة الديسكورد وصور GIF الأونر بالكامل
                    </h3>
                    <p className="text-xs text-neutral-400">
                      تحكم كامل بكل التفاصيل: صور GIF، الأفاتار، البانر، السيرفر، الرتب، والمعرض
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 bg-black hover:bg-neutral-800 text-white border border-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub Tabs */}
              <div className="flex border-b-2 border-neutral-900 bg-neutral-100 overflow-x-auto text-xs font-black">
                <button
                  type="button"
                  onClick={() => setEditorTab('photos')}
                  className={`px-4 py-3 border-l border-neutral-300 flex items-center gap-2 whitespace-nowrap transition-colors ${
                    editorTab === 'photos' ? 'bg-white text-neutral-950 border-b-2 border-b-neutral-950 -mb-[2px]' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <Film className="w-4 h-4 text-purple-600" />
                  <span>صور الأونر و GIF (Avatar & Banner)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditorTab('server')}
                  className={`px-4 py-3 border-l border-neutral-300 flex items-center gap-2 whitespace-nowrap transition-colors ${
                    editorTab === 'server' ? 'bg-white text-neutral-950 border-b-2 border-b-neutral-950 -mb-[2px]' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <Server className="w-4 h-4 text-[#5865F2]" />
                  <span>بيانات وإعدادات السيرفر</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditorTab('owner')}
                  className={`px-4 py-3 border-l border-neutral-300 flex items-center gap-2 whitespace-nowrap transition-colors ${
                    editorTab === 'owner' ? 'bg-white text-neutral-950 border-b-2 border-b-neutral-950 -mb-[2px]' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>بروفايل الأونر والرتب</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditorTab('showcase')}
                  className={`px-4 py-3 flex items-center gap-2 whitespace-nowrap transition-colors ${
                    editorTab === 'showcase' ? 'bg-white text-neutral-950 border-b-2 border-b-neutral-950 -mb-[2px]' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>معرض الصور والتوثيق ({showcasePhotos.length})</span>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1">
                
                {/* TAB 1: OWNER PHOTOS & GIFS */}
                {editorTab === 'photos' && (
                  <div className="space-y-6">
                    
                    {/* Live Preview Bar */}
                    <div className="p-3 bg-neutral-900 border-2 border-neutral-950 text-white flex items-center gap-4">
                      <div className="relative w-16 h-16 border-2 border-amber-400 overflow-hidden bg-black shrink-0">
                        <img src={editOwnerAvatar} alt="معاينة" className="w-full h-full object-cover" />
                        {ownerAvatarIsGif && (
                          <span className="absolute top-0 right-0 bg-purple-600 text-[8px] font-black px-1">GIF</span>
                        )}
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-black animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-amber-400">معاينة مباشرة لشكل الأفاتار:</span>
                          <span className="text-[10px] bg-neutral-800 px-2 py-0.5 border border-neutral-700">
                            {ownerAvatarIsGif ? 'وضع GIF متحرك مفعل' : 'صورة ثابتة'}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">{editOwnerName}</p>
                      </div>
                    </div>

                    {/* SECTION: AVATAR GIF PRESETS */}
                    <div className="p-4 bg-purple-50 border-2 border-purple-900/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                          <Film className="w-4 h-4 text-purple-700" />
                          <span>اختر صورة GIF متحركة للأونر (GIF Avatars Presets):</span>
                        </label>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-200/60 px-2 py-0.5">
                          بنقرة واحدة
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {OWNER_GIF_AVATAR_PRESETS.map((preset) => (
                          <button
                            type="button"
                            key={preset.id}
                            onClick={() => {
                              setEditOwnerAvatar(preset.url);
                              setOwnerAvatarIsGif(true);
                            }}
                            className={`p-1.5 border-2 text-right transition-all flex flex-col items-center gap-1 bg-white ${
                              editOwnerAvatar === preset.url
                                ? 'border-purple-600 ring-2 ring-purple-500 shadow-md'
                                : 'border-neutral-300 hover:border-purple-400'
                            }`}
                          >
                            <div className="w-12 h-12 overflow-hidden border border-neutral-900 bg-black">
                              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[9px] font-bold text-neutral-900 text-center leading-tight line-clamp-1">
                              {preset.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SECTION: STATIC AVATAR PRESETS */}
                    <div className="p-4 bg-neutral-50 border-2 border-neutral-900/30 space-y-3">
                      <label className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-neutral-700" />
                        <span>أو اختر صورة أيقونية ثابتة للأونر:</span>
                      </label>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {OWNER_AVATAR_PRESETS.map((preset) => (
                          <button
                            type="button"
                            key={preset.id}
                            onClick={() => {
                              setEditOwnerAvatar(preset.url);
                              setOwnerAvatarIsGif(false);
                            }}
                            className={`p-1.5 border-2 text-right transition-all flex flex-col items-center gap-1 bg-white ${
                              editOwnerAvatar === preset.url
                                ? 'border-neutral-950 ring-2 ring-emerald-500 shadow-md'
                                : 'border-neutral-300 hover:border-neutral-600'
                            }`}
                          >
                            <div className="w-12 h-12 overflow-hidden border border-neutral-900 bg-black">
                              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[9px] font-bold text-neutral-900 text-center leading-tight line-clamp-1">
                              {preset.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CUSTOM AVATAR URL & FILE UPLOAD */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-neutral-900">
                          أو أدخل رابط صورة/GIF مخصص، أو ارفع ملف GIF من جهازك:
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-purple-700 font-bold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={ownerAvatarIsGif}
                            onChange={(e) => setOwnerAvatarIsGif(e.target.checked)}
                            className="rounded-none border-neutral-900 text-purple-600 focus:ring-0"
                          />
                          <span>تمييز الصورة كـ GIF متحرك</span>
                        </label>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={editOwnerAvatar}
                          onChange={(e) => {
                            setEditOwnerAvatar(e.target.value);
                            if (e.target.value.toLowerCase().includes('.gif')) {
                              setOwnerAvatarIsGif(true);
                            }
                          }}
                          placeholder="رابط صورة أو GIF مباشر (URL)..."
                          className="flex-1 px-3 py-2 text-xs border border-neutral-900 bg-white font-mono"
                        />
                        <label className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold border border-neutral-900 cursor-pointer flex items-center justify-center gap-1.5 hover:bg-black">
                          <Upload className="w-3.5 h-3.5 text-emerald-400" />
                          <span>رفع صورة أو GIF من الجهاز</span>
                          <input
                            type="file"
                            accept="image/gif,image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'avatar')}
                          />
                        </label>
                      </div>
                    </div>

                    {/* BANNER SECTION: GIF & STATIC BANNERS */}
                    <div className="p-4 bg-neutral-50 border-2 border-neutral-900 space-y-4 pt-4 border-t-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                          <Film className="w-4 h-4 text-purple-700" />
                          <span>غلاف بانر الأونر (Cover Banner) - يدعم GIF:</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-purple-700 font-bold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={ownerBannerIsGif}
                            onChange={(e) => setOwnerBannerIsGif(e.target.checked)}
                            className="rounded-none border-neutral-900 text-purple-600 focus:ring-0"
                          />
                          <span>بانر GIF متحرك</span>
                        </label>
                      </div>

                      {/* GIF Banner Presets */}
                      <div>
                        <span className="text-[11px] font-bold text-purple-900 block mb-1.5">
                          بانرات GIF متحركة جاهزة:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {OWNER_GIF_BANNER_PRESETS.map((preset) => (
                            <button
                              type="button"
                              key={preset.id}
                              onClick={() => {
                                setEditOwnerBanner(preset.url);
                                setOwnerBannerIsGif(true);
                              }}
                              className={`p-1.5 border-2 text-right transition-all flex flex-col gap-1 bg-white ${
                                editOwnerBanner === preset.url
                                  ? 'border-purple-600 ring-2 ring-purple-500 shadow-md'
                                  : 'border-neutral-300 hover:border-purple-400'
                              }`}
                            >
                              <div className="w-full h-14 overflow-hidden border border-neutral-900 bg-black">
                                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[10px] font-bold text-neutral-800 line-clamp-1">
                                {preset.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Static Banner Presets */}
                      <div>
                        <span className="text-[11px] font-bold text-neutral-700 block mb-1.5">
                          أو بانرات صور ثابتة:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {OWNER_BANNER_PRESETS.map((preset) => (
                            <button
                              type="button"
                              key={preset.id}
                              onClick={() => {
                                setEditOwnerBanner(preset.url);
                                setOwnerBannerIsGif(false);
                              }}
                              className={`p-1.5 border-2 text-right transition-all flex flex-col gap-1 bg-white ${
                                editOwnerBanner === preset.url
                                  ? 'border-neutral-950 ring-2 ring-emerald-500 shadow-md'
                                  : 'border-neutral-300 hover:border-neutral-600'
                              }`}
                            >
                              <div className="w-full h-14 overflow-hidden border border-neutral-900 bg-black">
                                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[10px] font-bold text-neutral-800 line-clamp-1">
                                {preset.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <input
                          type="text"
                          value={editOwnerBanner}
                          onChange={(e) => {
                            setEditOwnerBanner(e.target.value);
                            if (e.target.value.toLowerCase().includes('.gif')) {
                              setOwnerBannerIsGif(true);
                            }
                          }}
                          placeholder="رابط بانر مباشر (URL أو GIF)..."
                          className="flex-1 px-3 py-2 text-xs border border-neutral-900 bg-white font-mono"
                        />
                        <label className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold border border-neutral-900 cursor-pointer flex items-center justify-center gap-1.5 hover:bg-black">
                          <Upload className="w-3.5 h-3.5 text-emerald-400" />
                          <span>رفع بانر (GIF / صورة)</span>
                          <input
                            type="file"
                            accept="image/gif,image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'banner')}
                          />
                        </label>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: SERVER SETTINGS */}
                {editorTab === 'server' && (
                  <div className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">اسم سيرفر الديسكورد:</label>
                        <input
                          type="text"
                          value={editServerName}
                          onChange={(e) => setEditServerName(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">رابط دعوة السيرفر (Invite URL):</label>
                        <input
                          type="url"
                          value={editServerLink}
                          onChange={(e) => setEditServerLink(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">عدد المتصلين بالسيرفر الآن (Online Counter):</label>
                        <input
                          type="number"
                          value={editOnlineCount}
                          onChange={(e) => setEditOnlineCount(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">نص إجمالي الأعضاء:</label>
                        <input
                          type="text"
                          value={editTotalMembers}
                          onChange={(e) => setEditTotalMembers(e.target.value)}
                          placeholder="+1,850 عضو عراقي"
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                        />
                      </div>
                    </div>

                    {/* Server Icon (Custom / GIF) */}
                    <div className="space-y-2 pt-2 border-t border-neutral-200">
                      <label className="text-xs font-bold text-neutral-900 block">
                        أيقونة السيرفر (صورة أو GIF - اتركه فارغاً لاستخدام شعار الديسكورد الأصلي):
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={editServerIcon}
                          onChange={(e) => setEditServerIcon(e.target.value)}
                          placeholder="رابط أيقونة سيرفر (صورة أو GIF)..."
                          className="flex-1 px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-mono"
                        />
                        <label className="px-3 py-2 bg-neutral-900 text-white text-xs font-bold border border-neutral-900 cursor-pointer flex items-center justify-center gap-1.5 hover:bg-black">
                          <Upload className="w-3.5 h-3.5 text-emerald-400" />
                          <span>رفع أيقونة</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'serverIcon')}
                          />
                        </label>
                        {editServerIcon && (
                          <button
                            type="button"
                            onClick={() => setEditServerIcon('')}
                            className="px-3 py-2 bg-red-100 text-red-700 text-xs font-bold border border-red-300"
                          >
                            استعادة الافتراضي
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Section Titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-200">
                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">عنوان خانة الديسكورد الرئيسي:</label>
                        <input
                          type="text"
                          value={editSectionTitle}
                          onChange={(e) => setEditSectionTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">الوصف التعريفي للخانة:</label>
                        <input
                          type="text"
                          value={editSectionSubtitle}
                          onChange={(e) => setEditSectionSubtitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50"
                        />
                      </div>
                    </div>

                    {/* Server Perks / Features (1, 2, 3) */}
                    <div className="pt-2 border-t border-neutral-200 space-y-3">
                      <label className="text-xs font-black text-neutral-900 block">
                        ميزات وبنود السيرفر الثلاثة (Server Perks):
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-neutral-50 border border-neutral-900 space-y-2">
                          <span className="text-[10px] font-black uppercase text-[#5865F2] block">البند الأول:</span>
                          <input
                            type="text"
                            value={perk1Title}
                            onChange={(e) => setPerk1Title(e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-neutral-900 bg-white font-bold"
                            placeholder="العنوان"
                          />
                          <input
                            type="text"
                            value={perk1Desc}
                            onChange={(e) => setPerk1Desc(e.target.value)}
                            className="w-full px-2 py-1 text-[11px] border border-neutral-900 bg-white"
                            placeholder="الوصف"
                          />
                        </div>

                        <div className="p-3 bg-neutral-50 border border-neutral-900 space-y-2">
                          <span className="text-[10px] font-black uppercase text-amber-500 block">البند الثاني:</span>
                          <input
                            type="text"
                            value={perk2Title}
                            onChange={(e) => setPerk2Title(e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-neutral-900 bg-white font-bold"
                            placeholder="العنوان"
                          />
                          <input
                            type="text"
                            value={perk2Desc}
                            onChange={(e) => setPerk2Desc(e.target.value)}
                            className="w-full px-2 py-1 text-[11px] border border-neutral-900 bg-white"
                            placeholder="الوصف"
                          />
                        </div>

                        <div className="p-3 bg-neutral-50 border border-neutral-900 space-y-2">
                          <span className="text-[10px] font-black uppercase text-emerald-600 block">البند الثالث:</span>
                          <input
                            type="text"
                            value={perk3Title}
                            onChange={(e) => setPerk3Title(e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-neutral-900 bg-white font-bold"
                            placeholder="العنوان"
                          />
                          <input
                            type="text"
                            value={perk3Desc}
                            onChange={(e) => setPerk3Desc(e.target.value)}
                            className="w-full px-2 py-1 text-[11px] border border-neutral-900 bg-white"
                            placeholder="الوصف"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 3: OWNER PROFILE & ROLES */}
                {editorTab === 'owner' && (
                  <div className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">اسم الأونر المعروض (Display Name):</label>
                        <input
                          type="text"
                          value={editOwnerName}
                          onChange={(e) => setEditOwnerName(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">عنوان الرتبة العلوية (Role Title):</label>
                        <input
                          type="text"
                          value={editOwnerRoleTitle}
                          onChange={(e) => setEditOwnerRoleTitle(e.target.value)}
                          placeholder="SERVER OWNER & FOUNDER"
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">يوزر / تاغ الأونر (Discord Tag):</label>
                        <input
                          type="text"
                          value={editOwnerTag}
                          onChange={(e) => setEditOwnerTag(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-900 block mb-1">رابط المراسلة المباشرة (Direct DM Link):</label>
                        <input
                          type="url"
                          value={editOwnerLink}
                          onChange={(e) => setEditOwnerLink(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-900 block mb-1">نبذة / بايو وحالة الأونر (Bio):</label>
                      <textarea
                        rows={3}
                        value={editOwnerBio}
                        onChange={(e) => setEditOwnerBio(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-neutral-900 bg-neutral-50 font-medium"
                      />
                    </div>

                    {/* Custom Badges Management */}
                    <div className="p-3 bg-neutral-50 border border-neutral-900 space-y-2 pt-2">
                      <label className="text-xs font-black text-neutral-900 block">
                        شارات ورتب الأونر التفاعلية (Badges):
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {badgesList.map((badge, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-white border border-neutral-900 text-xs font-bold flex items-center gap-1.5 shadow-xs"
                          >
                            <span>{badge}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveBadge(idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={newBadgeText}
                          onChange={(e) => setNewBadgeText(e.target.value)}
                          placeholder="اكتب شارة جديدة (مثال: ⭐ Verified Trader)..."
                          className="flex-1 px-3 py-1.5 text-xs border border-neutral-900 bg-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddBadge}
                          className="px-4 py-1.5 bg-neutral-900 text-white text-xs font-bold border border-neutral-900"
                        >
                          + إضافة شارة
                        </button>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 4: SHOWCASE PHOTOS */}
                {editorTab === 'showcase' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-900">
                        معرض صور وتوثيقات الأونر في الكرت ({showcasePhotos.length} صورة مضافة):
                      </label>
                      <span className="text-[11px] text-neutral-500">تدعم صور ثابتة ومتحركة GIF</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {showcasePhotos.map((photo, idx) => (
                        <div key={idx} className="relative aspect-video border-2 border-neutral-900 overflow-hidden bg-black group">
                          <img src={photo} alt="Showcase" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveShowcasePhoto(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-none hover:bg-red-700 shadow-md"
                            title="حذف الصورة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-[9px] text-white font-mono">
                            #{idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-neutral-200">
                      <input
                        type="text"
                        value={newShowcasePhotoUrl}
                        onChange={(e) => setNewShowcasePhotoUrl(e.target.value)}
                        placeholder="أدخل رابط صورة أو GIF لإضافتها للمعرض..."
                        className="flex-1 px-3 py-2 text-xs border border-neutral-900 bg-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleAddShowcasePhoto}
                        className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold border border-neutral-900"
                      >
                        + إضافة بالرابط
                      </button>
                      <label className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold border border-neutral-900 cursor-pointer flex items-center justify-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع صورة من الجهاز</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'showcase')}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Form Action Footer */}
                <div className="pt-4 border-t-2 border-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-neutral-950 text-white font-black text-xs border-2 border-black hover:bg-neutral-800 shadow-[2px_2px_0_0_#000000] flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>حفظ كافة التعديلات فوراً</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2.5 bg-neutral-100 text-neutral-800 font-bold text-xs border border-neutral-900 hover:bg-neutral-200"
                    >
                      إلغاء
                    </button>
                  </div>

                  <span className="text-[11px] text-neutral-500 font-medium hidden sm:inline">
                    يتم حفظ التغييرات فوراً في الموقع والتخزين الدائم
                  </span>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal for Owner Photos */}
      {activeLightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-neutral-950 border-2 border-white shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-white">معاينة صورة بروفايل الأونر عالية الدقة</span>
              </div>
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="p-1 text-neutral-400 hover:text-white border border-neutral-700 bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-2 flex items-center justify-center bg-black">
              <img
                src={activeLightboxImage}
                alt="معاينة كاملة"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>{settings.ownerDisplayName || 'GALAXY Owner'}</span>
              <span className="text-emerald-400 font-mono font-bold">{settings.ownerDiscordTag || 'Abad#0001'}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
