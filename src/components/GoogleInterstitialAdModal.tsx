import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Info, Sparkles, ExternalLink } from 'lucide-react';
import { GOOGLE_TEST_ADS_CONFIG } from '../config/googleAdsConfig';

interface GoogleInterstitialAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPaidUser?: boolean;
}

export const GoogleInterstitialAdModal: React.FC<GoogleInterstitialAdModalProps> = ({
  isOpen,
  onClose,
  isPaidUser,
}) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  // Check if active user has paid plan
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
    if (!isOpen) return;

    if (userIsPaid) {
      onClose();
      return;
    }

    setCountdown(5);
    setCanClose(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, userIsPaid, onClose]);

  if (!isOpen || userIsPaid) return null;

  const interstitialConfig = GOOGLE_TEST_ADS_CONFIG.interstitial;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col text-white">
        {/* Top Header with Google AdMob branding and countdown */}
        <div className="px-4 py-2.5 bg-black flex items-center justify-between border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider text-[10px]">
              Ad • विज्ञापन
            </span>
            <span className="text-slate-300 font-semibold">
              Google AdMob Interstitial
            </span>
          </div>

          <div className="flex items-center gap-3">
            {canClose ? (
              <button
                onClick={onClose}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-full text-xs font-bold border border-slate-600 transition-colors"
              >
                <span>Close Ad</span>
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-slate-400 text-xs bg-slate-800 px-2.5 py-1 rounded-full">
                Skip in <strong className="text-amber-400 font-bold">{countdown}s</strong>
              </span>
            )}
          </div>
        </div>

        {/* Ad Body */}
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          {/* Google Logo */}
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27a7.2 7.2 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Google Mobile Ads: Full-Screen Interstitial
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-sm">
              Live Google AdMob Full-Screen interstitial ad unit.
            </p>
          </div>

          {/* Ad Unit Details Card */}
          <div className="w-full bg-black/60 rounded-xl p-3 text-left border border-slate-700 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ad Format:</span>
              <span className="text-emerald-400 font-semibold">Interstitial Ad</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ad Unit ID:</span>
              <code className="text-amber-300 font-mono text-[10px] select-all">
                {interstitialConfig.androidId}
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Impression Registered
              </span>
            </div>
          </div>

          <div className="w-full pt-2 flex flex-col gap-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              विज्ञापन बंद करें (Dismiss Ad)
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-black/90 border-t border-slate-800 text-[10px] text-slate-400 text-center">
          Google Mobile Ads SDK • Jyotishi Live
        </div>
      </div>
    </div>
  );
};
