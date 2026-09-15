import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { SPONSORED_ADS } from '../data/astrologers';

interface SponsoredAdBannerProps {
  onAdClick?: () => void;
}

export const SponsoredAdBanner: React.FC<SponsoredAdBannerProps> = ({ onAdClick }) => {
  const ad = SPONSORED_ADS[0];

  return (
    <div className="rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-100/40 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 my-4">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-amber-300 shrink-0"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
              {ad.tag}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">{ad.sponsor}</span>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-['Cinzel',serif] mt-0.5">
            {ad.title}
          </h4>
          <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
            {ad.description}
          </p>
        </div>
      </div>

      <button
        onClick={onAdClick}
        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
      >
        <span>{ad.cta}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
