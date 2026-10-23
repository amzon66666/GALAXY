import React from 'react';
import { useStore } from '../context/StoreContext';
import { AlertCircle, X, ShieldAlert, Sparkles } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const { settings, updateSettings } = useStore();

  if (!settings.showAnnouncement || !settings.announcementText) {
    return null;
  }

  return (
    <div className="bg-neutral-900 text-white border-b border-black text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-white text-black px-1.5 py-0.5 text-[11px] font-black uppercase tracking-wider shrink-0">
            تنبيه المتجر
          </span>
          <p className="truncate font-semibold text-neutral-200">
            {settings.announcementText}
          </p>
        </div>
        <button
          onClick={() => updateSettings({ showAnnouncement: false })}
          className="text-neutral-400 hover:text-white shrink-0 p-1"
          aria-label="إغلاق التنبيه"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
