import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Info, Sparkles, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { GOOGLE_ADS_CONFIG } from '../config/googleAdsConfig';

interface GoogleBannerAdProps {
  slotId?: string;
  className?: string;
  variant?: 'standard' | 'card' | 'compact';
  onOpenInspector?: () => void;
  label?: string;
  isPaidUser?: boolean;
  onUpgradeClick?: () => void;
}

export const GoogleBannerAd: React.FC<GoogleBannerAdProps> = ({
  slotId = GOOGLE_ADS_CONFIG.banner.slotId,
  className = '',
  variant = 'compact',
  onOpenInspector,
  label,
  isPaidUser,
  onUpgradeClick,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const isPushedRef = useRef(false);

  // Check if active user has any paid subscription
  const userIsPaid = (() => {
    if (typeof isPaidUser === 'boolean') return isPaidUser;
    try {
      const saved = localStorage.getItem('jyotishi_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const plan = parsed.subscriptionPlan;
        return plan && plan !== 'free' && plan !== 'none';
      }
    } catch {}
    return false;
  })();

  useEffect(() => {
    // Attempt to push adsbygoogle safely
    if (!userIsPaid && !isPushedRef.current && typeof window !== 'undefined') {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        if (adRef.current && adRef.current.children.length === 0) {
          adsbygoogle.push({});
          isPushedRef.current = true;
          setAdLoaded(true);
        }
      } catch (e) {
        // Fallback or ad blocker active
        setAdLoaded(false);
      }
    }
  }, [userIsPaid]);

  // Completely hide automatic banner ads for paid plan subscribers!
  if (userIsPaid || isDismissed) return null;

  const publisherId = GOOGLE_ADS_CONFIG.production.publisherId;
  const fullAdUnitId = GOOGLE_ADS_CONFIG.production.bannerAdUnitId;
  const appId = GOOGLE_ADS_CONFIG.production.appId;

  if (variant === 'compact') {
    return (
      <div className={`my-3 mx-auto max-w-xl px-2 ${className}`}>
        <div className="relative overflow-hidden rounded-xl border border-amber-300/80 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white shadow-sm">
          {/* Top micro bar */}
          <div className="flex items-center justify-between px-3 py-1 bg-black/60 border-b border-amber-500/20 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-xs uppercase tracking-wider text-[8px]">
                Ad • विज्ञापन
              </span>
              <span className="text-amber-200/80 text-[10px] truncate">
                {label || 'Google AdMob Banner'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="text-amber-400 hover:text-amber-300 text-[10px] flex items-center gap-0.5"
                title="View Ad Unit ID"
              >
                <Info className="w-3 h-3" />
                <span>Ad ID</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="text-slate-400 hover:text-white p-0.5"
                title="Close Ad"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Ad Slot Container */}
          <div className="p-2.5 flex items-center justify-between gap-3 min-h-[50px]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27a7.2 7.2 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-100">
                  ज्योतिष व सात्विक पूजन सामग्री
                </p>
                <p className="text-[10px] text-amber-300/70">
                  Google AdMob Active • Unit ID: {slotId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {onUpgradeClick && (
                <button
                  type="button"
                  onClick={onUpgradeClick}
                  className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-200 text-[10px] font-semibold flex items-center gap-1 transition-colors"
                  title="Remove ads with Basic plan (₹79)"
                >
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  <span>हटाएं (₹79)</span>
                </button>
              )}
              {onOpenInspector && (
                <button
                  type="button"
                  onClick={onOpenInspector}
                  className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px]"
                >
                  Inspect
                </button>
              )}
            </div>
          </div>

          {/* AdSense ins tag for web delivery */}
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-client={publisherId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />

          {showDetails && (
            <div className="p-2.5 bg-black/95 border-t border-amber-500/30 text-[10px] space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Ad Unit ID:</span>
                <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono select-all">
                  {fullAdUnitId}
                </code>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">App ID:</span>
                <code className="bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded font-mono select-all">
                  {appId}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`my-4 mx-auto max-w-3xl px-2 ${className}`}>
      <div className="relative overflow-hidden rounded-2xl border border-amber-300/90 bg-gradient-to-r from-slate-950 via-amber-950/90 to-slate-950 text-white shadow-md">
        {/* Top Mini Bar with Google AdMob branding */}
        <div className="flex items-center justify-between px-3.5 py-1.5 bg-black/75 border-b border-amber-500/30 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-2 py-0.5 rounded-xs uppercase tracking-wider text-[9px] shadow-xs">
              SPONSORED AD • विज्ञापन
            </span>
            <span className="text-amber-200/90 font-medium hidden sm:inline text-[11px]">
              Google AdMob Banner ({label || '320x50 Adaptive'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30"
              title="Inspect User Configured Ad Unit ID"
            >
              <Info className="w-3 h-3 text-amber-400" />
              <span>Ad Unit Info</span>
            </button>

            {/* Google AdChoices blue icon symbol */}
            <div className="flex items-center gap-0.5 text-sky-400 font-bold text-[9px] bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/60" title="Google AdChoices">
              <span>Ad</span>
              <svg className="w-2.5 h-2.5 fill-sky-400" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z"/>
              </svg>
            </div>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-white ml-1 p-0.5"
              title="Hide Banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Banner Visual */}
        <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[radial-gradient(#d97706_0.5px,transparent_0.5px)] [background-size:14px_14px]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Google Colorful "G" Badge */}
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md p-1.5">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27a7.2 7.2 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <h5 className="text-xs sm:text-sm font-bold text-amber-100 tracking-tight">
                  Google AdMob Live Banner Active
                </h5>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-mono">
                  Slot: {slotId}
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80 leading-snug mt-0.5">
                प्रमाणित Google AdMob बैनर विज्ञापन • ऐप आईडी और यूनिट आईडी सक्रिय
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            {onOpenInspector && (
              <button
                type="button"
                onClick={onOpenInspector}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ad Suite</span>
              </button>
            )}
          </div>
        </div>

        {/* Official Google AdSense/AdMob ins tag */}
        <div className="w-full overflow-hidden flex justify-center bg-black/40">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '300px', minHeight: '50px' }}
            data-ad-client={publisherId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* Expandable Ad Unit ID & App ID Info */}
        {showDetails && (
          <div className="p-3.5 bg-black/95 border-t border-amber-500/30 text-[11px] space-y-2 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
              <span className="text-slate-400">Banner Ad Unit ID:</span>
              <code className="bg-slate-900 text-emerald-400 px-2 py-0.5 rounded font-mono text-[10px] select-all border border-emerald-500/30">
                {fullAdUnitId}
              </code>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
              <span className="text-slate-400">Google AdMob App ID:</span>
              <code className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded font-mono text-[10px] select-all border border-amber-500/30">
                {appId}
              </code>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
              <span className="text-slate-400">Publisher Client ID:</span>
              <code className="bg-slate-900 text-sky-400 px-2 py-0.5 rounded font-mono text-[10px] select-all border border-sky-500/30">
                {publisherId}
              </code>
            </div>
            <p className="text-[10px] text-amber-300/90 pt-1.5 border-t border-slate-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>आपकी AdMob App ID और Banner Ad Unit ID ऐप में सफलतापूर्वक कॉन्फ़िगर हो चुकी है।</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
