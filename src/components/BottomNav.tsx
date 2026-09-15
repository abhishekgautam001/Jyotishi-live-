import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Sun, 
  ScrollText, 
  Wallet,
  Crown,
  User
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  walletBalance: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  walletBalance,
}) => {
  const tabs = [
    {
      id: 'astrologers',
      label: 'ज्योतिषी',
      sublabel: 'Live Astro',
      icon: Sparkles,
      badge: 'Live',
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      id: 'ai-pandit',
      label: 'वर्चुअल पंडित जी',
      sublabel: '24x7 सेवा',
      icon: Flame,
      badge: '24x7',
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      id: 'rashifal',
      label: 'राशिफल',
      sublabel: 'Horoscope',
      icon: Sun,
      badge: null,
      badgeColor: '',
    },
    {
      id: 'kundali',
      label: 'कुंडली',
      sublabel: 'Kundali',
      icon: ScrollText,
      badge: null,
      badgeColor: '',
    },
    {
      id: 'wallet',
      label: 'बटुआ',
      sublabel: `₹${walletBalance}`,
      icon: Wallet,
      badge: null,
      badgeColor: '',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/98 backdrop-blur-md border-t border-amber-200/90 shadow-lg pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md mx-auto grid grid-cols-5 h-15">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'text-amber-700 font-bold'
                  : 'text-slate-600 hover:text-amber-800'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute top-0 w-8 h-0.75 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" />
              )}

              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive
                      ? 'bg-amber-100 text-amber-900 shadow-2xs scale-105'
                      : 'text-slate-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-800' : 'text-slate-600'}`} />
                </div>

                {tab.badge && (
                  <span
                    className={`absolute -top-1 -right-2 text-[9px] font-bold px-1 rounded-full uppercase tracking-tighter ${tab.badgeColor}`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className={`text-[10.5px] mt-0.5 leading-tight ${isActive ? 'font-bold text-amber-900' : 'font-medium text-slate-600'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
