import React from 'react';
import { ICONIC_SERVERS, IconicServerInfo } from '../data/defaultData';
import { ServerRegion } from '../types/store';
import { Server, Activity, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface IconicServersHubProps {
  selectedRegion: string;
  onSelectRegion: (regionId: string) => void;
  accountsCountByRegion: Record<string, number>;
}

export const IconicServersHub: React.FC<IconicServersHubProps> = ({
  selectedRegion,
  onSelectRegion,
  accountsCountByRegion,
}) => {
  return (
    <section className="py-8 bg-neutral-50 border-b-2 border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-neutral-900 text-xs font-black text-neutral-900">
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              <span>سيرفرات فالورانت الأيقونية الأكثر طلباً في العراق 🇮🇶</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-950">
              اختر السيرفر المناسب لموقعك وسرعة النت عندك بنقرة واحدة
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectRegion('all')}
              className={`px-3 py-1.5 text-xs font-black border-2 transition-all ${
                selectedRegion === 'all'
                  ? 'bg-neutral-950 text-white border-black shadow-[2px_2px_0_0_#000000]'
                  : 'bg-white text-neutral-800 border-neutral-900 hover:bg-neutral-100'
              }`}
            >
              عرض كافة السيرفرات
            </button>
          </div>
        </div>

        {/* 4 Iconic Server Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ICONIC_SERVERS.map((server) => {
            const isSelected = selectedRegion === server.id;
            const count = accountsCountByRegion[server.id] || 0;

            return (
              <div
                key={server.id}
                onClick={() => onSelectRegion(isSelected ? 'all' : server.id)}
                className={`p-4 bg-white border-2 cursor-pointer transition-all select-none relative group ${
                  isSelected
                    ? 'border-neutral-950 shadow-[5px_5px_0_0_#000000] ring-2 ring-emerald-500/60 -translate-y-1'
                    : 'border-neutral-900 shadow-[3px_3px_0_0_#18181b] hover:shadow-[5px_5px_0_0_#000000] hover:-translate-y-0.5'
                }`}
              >
                {/* Top Badge: Country Flag & Ping */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{server.flag}</span>
                    <div>
                      <span className="text-xs font-black text-neutral-950 block">
                        {server.id}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-bold uppercase">
                        {server.country}
                      </span>
                    </div>
                  </div>

                  <div className="text-left bg-neutral-50 px-2 py-1 border border-neutral-900">
                    <span className="text-[9px] text-neutral-500 font-bold block uppercase">بنج العراق:</span>
                    <span className={`text-xs font-black tabular-nums font-mono flex items-center gap-1 ${server.pingColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {server.pingIraq}
                    </span>
                  </div>
                </div>

                {/* Server Name & Highlights */}
                <h3 className="text-sm font-black text-neutral-950 mb-1">
                  {server.name}
                </h3>
                <p className="text-xs text-neutral-600 font-medium leading-snug line-clamp-2">
                  {server.highlight}
                </p>

                {/* Bottom Row */}
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-700 tabular-nums">
                    {count} {count === 1 ? 'حساب متوفر' : 'حسابات متوفرة'}
                  </span>

                  <span className={`flex items-center gap-1 text-[11px] ${
                    isSelected ? 'text-black font-black underline' : 'text-neutral-500 group-hover:text-black'
                  }`}>
                    {isSelected ? 'محدد حالياً' : 'تصفح الآن'}
                    <ArrowRight className="w-3 h-3 rotate-180" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
