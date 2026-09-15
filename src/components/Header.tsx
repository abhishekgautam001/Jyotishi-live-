import React from 'react';
import { 
  Sparkles, 
  Wallet, 
  Bell, 
  User, 
  ShieldCheck, 
  Tv, 
  Briefcase, 
  Crown, 
  Bot,
  Flame,
  Sun,
  ScrollText,
  Gift
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  walletBalance: number;
  openWalletModal: () => void;
  openAdModal: () => void;
  openAdInspector?: () => void;
  openNotifications: () => void;
  unreadNotifsCount: number;
  isAstrologerMode: boolean;
  setIsAstrologerMode: (val: boolean) => void;
  activeConsultation: { type: 'chat' | 'video'; astrologerName: string } | null;
  resumeActiveConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  walletBalance,
  openWalletModal,
  openAdModal,
  openAdInspector,
  openNotifications,
  unreadNotifsCount,
  isAstrologerMode,
  setIsAstrologerMode,
  activeConsultation,
  resumeActiveConsultation,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Active Session Notification Strip */}
      {activeConsultation && (
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white text-xs px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium truncate">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
            </span>
            <span className="truncate">
              लाइव {activeConsultation.type === 'video' ? 'वीडियो कॉल' : 'चैट'}: <strong>{activeConsultation.astrologerName}</strong>
            </span>
          </div>
          <button
            onClick={resumeActiveConsultation}
            className="px-2.5 py-0.5 bg-white text-rose-900 rounded-full font-bold text-[11px] hover:bg-amber-50 shadow-xs shrink-0"
          >
            वापस जुड़ें →
          </button>
        </div>
      )}

      {/* Main Top Header Bar (Native Mobile Feel) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & Spiritual Title */}
        <div 
          onClick={() => {
            setIsAstrologerMode(false);
            setActiveTab('astrologers');
          }}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-amber-100 fill-amber-200/30" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Cinzel',serif] font-bold text-base sm:text-xl tracking-tight bg-gradient-to-r from-amber-900 via-rose-900 to-amber-800 bg-clip-text text-transparent">
                ज्योतिषी LIVE
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                100% सात्विक
              </span>
            </div>
            <p className="text-[10px] text-amber-800/80 -mt-0.5 hidden sm:block">
              भयमुक्त वैदिक ज्योतिष • लाइव चैट व कॉल • वर्चुअल पंडित जी
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Google Ads Test Suite Trigger */}
          {openAdInspector && (
            <button
              onClick={openAdInspector}
              title="Google AdMob Suite (Rewarded, Banner, Interstitial)"
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 text-[10px] font-bold shadow-xs transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="hidden sm:inline">Google</span> Ads
            </button>
          )}

          {/* Watch Ad Free Coins Button */}
          <button
            onClick={openAdModal}
            title="Watch short Google Ad to earn ₹25 free wallet cash"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold transition-colors"
          >
            <Gift className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
            <span className="hidden xs:inline">फ्री ₹25</span>
            <span className="xs:hidden">₹25</span>
          </button>

          {/* Wallet Balance Pill */}
          <button
            onClick={openWalletModal}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
          >
            <Wallet className="w-3.5 h-3.5 text-amber-100" />
            <span>₹{walletBalance}</span>
            <span className="text-[10px] bg-white/25 px-1 rounded-full text-white font-normal hidden sm:inline">
              + रिचार्ज
            </span>
          </button>

          {/* Mode Switcher: User vs Jyotishi Portal */}
          <button
            onClick={() => setIsAstrologerMode(!isAstrologerMode)}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isAstrologerMode
                ? 'bg-rose-900 text-amber-200 border-rose-800 shadow-xs'
                : 'bg-white hover:bg-amber-50 text-slate-700 border-amber-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">
              {isAstrologerMode ? 'ज्योतिषी पोर्टल' : 'ज्योतिषी लॉगिन'}
            </span>
            <span className="sm:hidden">{isAstrologerMode ? 'पंडित जी मोड' : 'पंडित जी'}</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={openNotifications}
            className="relative p-1.5 sm:p-2 rounded-full hover:bg-amber-100/70 text-slate-700 transition-colors"
            aria-label="सूचनाएं"
          >
            <Bell className="w-4.5 h-4.5 text-slate-700" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Quick Nav Bar (Hidden on mobile screens, BottomNav handles mobile) */}
      {!isAstrologerMode && (
        <div className="hidden md:block bg-amber-50/50 border-t border-amber-200/50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 h-10 text-xs font-medium">
            <button
              onClick={() => setActiveTab('astrologers')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'astrologers'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>लाइव ज्योतिषी (Live Astrologers)</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-pandit')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'ai-pandit'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>वर्चुअल पंडित जी (24x7)</span>
            </button>

            <button
              onClick={() => setActiveTab('rashifal')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'rashifal'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>आज का राशिफल (Daily Horoscope)</span>
            </button>

            <button
              onClick={() => setActiveTab('kundali')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'kundali'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>जन्म कुंडली (Kundali)</span>
            </button>

            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'subscriptions'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>प्रीमियम प्लान</span>
            </button>

            <button
              onClick={() => setActiveTab('wallet')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'wallet'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>बटुआ (Wallet)</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>मेरी प्रोफाइल</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
