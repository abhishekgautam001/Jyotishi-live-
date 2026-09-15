import React, { useState, useEffect } from 'react';
import { 
  X, 
  Tv, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Gift, 
  Info,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { GOOGLE_ADS_CONFIG } from '../config/googleAdsConfig';

interface AdRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardClaimed: (amount: number) => void;
}

export const AdRewardModal: React.FC<AdRewardModalProps> = ({
  isOpen,
  onClose,
  onRewardClaimed,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showIdInfo, setShowIdInfo] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const rewardedConfig = GOOGLE_ADS_CONFIG.rewardedVideo;

  useEffect(() => {
    let timer: any;
    if (isPlaying && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isPlaying) {
      setIsCompleted(true);
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, secondsRemaining]);

  if (!isOpen) return null;

  const startAd = () => {
    setIsPlaying(true);
    setSecondsRemaining(10);
    setIsCompleted(false);
  };

  const claimReward = () => {
    onRewardClaimed(25);
    onClose();
    // Reset state for next time
    setIsCompleted(false);
    setSecondsRemaining(10);
  };

  const copyAdUnitId = () => {
    navigator.clipboard.writeText(rewardedConfig.androidId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border-2 border-amber-400/90 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header with Google AdMob branding */}
        <div className="p-3.5 bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-white flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider text-[9px] shadow-xs">
              REWARD AD • विज्ञापन
            </span>
            <div>
              <h3 className="font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                <span>Google AdMob • Rewarded Video</span>
              </h3>
              <p className="text-[10px] text-amber-200/80">
                Ad Unit: <code className="text-emerald-300 font-mono">5214161558</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowIdInfo(!showIdInfo)}
              className="p-1 rounded-md text-amber-300 hover:text-amber-200 hover:bg-white/10"
              title="Inspect Real AdMob Unit ID"
            >
              <Info className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 text-white/90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expandable Ad Unit ID Info */}
        {showIdInfo && (
          <div className="bg-slate-900 text-white p-3 text-xs border-b border-amber-500/30 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Rewarded Ad Unit ID:</span>
              <div className="flex items-center gap-1">
                <code className="text-emerald-400 font-mono text-[10px] select-all bg-black/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {rewardedConfig.androidId}
                </code>
                <button
                  type="button"
                  onClick={copyAdUnitId}
                  className="p-1 hover:text-emerald-400 text-slate-400"
                  title="Copy ID"
                >
                  {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Google AdMob App ID:</span>
              <code className="text-amber-300 font-mono text-[10px] select-all">
                {GOOGLE_ADS_CONFIG.appIdAndroid}
              </code>
            </div>
            <p className="text-[10px] text-amber-200/90 pt-1 border-t border-slate-800">
              ✓ आपका लाइव AdMob Rewarded Video Unit ID कॉन्फ़िगर हो चुका है। वीडियो समाप्त होने पर यूज़र को ₹25 वॉलेट क्रेडिट मिलता है।
            </p>
          </div>
        )}

        {/* Ad Video Simulator Container */}
        <div className="p-4">
          <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 shadow-inner flex flex-col items-center justify-center text-white border border-slate-800">
            {/* Background Simulated Google Video Image */}
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&auto=format&fit=crop&q=80"
              alt="Google Mobile Ads Video"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isPlaying ? 'opacity-70 scale-105 transition-transform duration-[10000ms]' : 'opacity-35'
              }`}
            />

            {/* Top Bar during Ad with official Google AdMob overlay */}
            {isPlaying && (
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 text-[11px] bg-black/80 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Google AdMob • Rewarded Ad
                </span>
                <span className="font-bold text-white bg-amber-600 px-2 py-0.5 rounded-full text-[10px]">
                  Reward in: {secondsRemaining}s
                </span>
              </div>
            )}

            {/* Video Controls overlay */}
            <div className="relative z-10 flex flex-col items-center p-4 text-center">
              {!isPlaying && !isCompleted && (
                <>
                  <button
                    onClick={startAd}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all mb-3 active:scale-95 border-2 border-white/20"
                  >
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </button>
                  <p className="text-sm font-bold text-white">Google Rewarded Video Ad चलाएं</p>
                  <p className="text-xs text-amber-300 mt-0.5">
                    10s वीडियो देखकर ₹25 वॉलेट क्रेडिट प्राप्त करें
                  </p>
                </>
              )}

              {isPlaying && (
                <div className="space-y-2 mt-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/30 border-2 border-amber-400 flex items-center justify-center text-xl font-bold font-['Cinzel',serif] text-white shadow-lg mx-auto">
                    {secondsRemaining}
                  </div>
                  <p className="text-xs text-amber-200 font-medium">
                    Google Mobile Ads SDK • Rewarded Video Active
                  </p>
                  <div className="w-48 h-1.5 bg-slate-700 rounded-full mx-auto overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
                      style={{ width: `${((10 - secondsRemaining) / 10) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {isCompleted && (
                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-2 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white font-['Cinzel',serif]">
                    Google Ad Completed!
                  </h4>
                  <p className="text-xs text-emerald-300 mt-0.5">
                    Event: <code className="bg-black/40 px-1 rounded text-[10px]">onUserEarnedReward()</code> triggered.
                  </p>
                </div>
              )}
            </div>

            {/* Sound toggle & Google AdChoices info */}
            {isPlaying && (
              <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5">
                <span className="text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-sky-400 font-bold">
                  Google AdChoices
                </span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Ad Unit Info Bar */}
          <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs">
            <div className="min-w-0 flex-1 pr-2">
              <span className="font-semibold text-slate-800 block truncate">
                Google AdMob Rewarded Video Unit
              </span>
              <span className="text-slate-600 text-[11px] font-mono truncate block">
                ID: {rewardedConfig.androidId}
              </span>
            </div>
            <button
              type="button"
              onClick={copyAdUnitId}
              className="text-[10px] font-bold text-amber-900 bg-amber-200/90 border border-amber-400 px-2 py-1 rounded shrink-0 flex items-center gap-1 hover:bg-amber-300"
            >
              {copiedId ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3 text-amber-800" />}
              <span>{copiedId ? 'कॉपी हुआ' : 'कॉपी ID'}</span>
            </button>
          </div>
        </div>

        {/* Claim Footer */}
        <div className="p-3.5 bg-amber-50/70 border-t border-amber-200/80 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-700">
            रिवॉर्ड: <strong className="text-emerald-700 font-bold">+₹25 वॉलेट क्रेडिट</strong>
          </span>

          {isCompleted ? (
            <button
              onClick={claimReward}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 animate-pulse"
            >
              <Sparkles className="w-4 h-4" />
              <span>₹25 वॉलेट में क्लेम करें</span>
            </button>
          ) : (
            <button
              disabled={isPlaying}
              onClick={startAd}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isPlaying ? `ऐड चल रहा है (${secondsRemaining}s)...` : 'Google Rewarded Ad देखें'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
