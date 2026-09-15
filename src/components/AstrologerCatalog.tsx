import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Video, 
  Star, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  Clock, 
  Heart, 
  Globe, 
  Tv,
  Bot,
  ScrollText,
  Sun,
  Flame,
  Phone,
  Gift,
  CheckCircle2
} from 'lucide-react';
import { ASTROLOGERS } from '../data/astrologers';
import { Astrologer } from '../types';
import { PanchmukhiRudrakshaCard } from './PanchmukhiRudrakshaCard';
import { GoogleBannerAd } from './GoogleBannerAd';

interface AstrologerCatalogProps {
  onStartChat: (astrologer: Astrologer) => void;
  onStartVideo: (astrologer: Astrologer) => void;
  openAdModal: () => void;
  openAdInspector?: () => void;
  openWalletModal: () => void;
  walletBalance: number;
  onSelectTab?: (tab: string) => void;
  onAskPanditPrompt?: (prompt: string) => void;
}

export const AstrologerCatalog: React.FC<AstrologerCatalogProps> = ({
  onStartChat,
  onStartVideo,
  openAdModal,
  openAdInspector,
  openWalletModal,
  walletBalance,
  onSelectTab,
  onAskPanditPrompt,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'priceLow'>('rating');
  const [showScrollAd, setShowScrollAd] = useState(false);

  // Show compact ad only after user scrolls or spends time on the catalog
  useEffect(() => {
    const timer = setTimeout(() => setShowScrollAd(true), 15000);
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollAd(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skillsFilter = [
    { key: 'All', label: 'सभी (All)' },
    { key: 'Relationship', label: '❤️ प्रेम व विवाह' },
    { key: 'Career', label: '💼 करियर व नौकरी' },
    { key: 'Kundali', label: '📜 कुंडली दोष' },
    { key: 'Vedic', label: '🕉️ वैदिक ज्योतिष' },
    { key: 'Vastu', label: '🏡 वास्तु शास्त्र' },
    { key: 'Tarot', label: '🃏 टैरो रीडिंग' },
  ];

  // Quick Action Circles (Astrotalk Stories Style)
  const quickStories = [
    {
      id: 'ai-pandit',
      label: 'वर्चुअल पंडित जी',
      tag: '24x7',
      icon: Flame,
      color: 'from-amber-500 to-rose-600',
      action: () => onSelectTab && onSelectTab('ai-pandit'),
    },
    {
      id: 'rashifal',
      label: 'दैनिक राशिफल',
      tag: 'आज का',
      icon: Sun,
      color: 'from-amber-400 to-orange-500',
      action: () => onSelectTab && onSelectTab('rashifal'),
    },
    {
      id: 'kundali',
      label: 'जन्म कुंडली',
      tag: 'वैदिक',
      icon: ScrollText,
      color: 'from-orange-500 to-amber-600',
      action: () => onSelectTab && onSelectTab('kundali'),
    },
    {
      id: 'milan',
      label: 'विवाह मिलान',
      tag: 'गुण मिलान',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      action: () => onSelectTab && onSelectTab('kundali'),
    },
    {
      id: 'ad-reward',
      label: 'फ्री ₹25 (Ad)',
      tag: 'Google Ad',
      icon: Gift,
      color: 'from-emerald-500 to-teal-600',
      action: openAdModal,
    },
    {
      id: 'ad-inspector',
      label: 'Google Ads',
      tag: 'Test Suite',
      icon: Tv,
      color: 'from-slate-800 to-slate-950',
      action: () => openAdInspector && openAdInspector(),
    },
  ];

  // Filter & Sort Logic
  const filteredAstrologers = ASTROLOGERS.filter((astro) => {
    const matchesSkill =
      selectedSkill === 'All' ||
      astro.skills.some((s) => s.toLowerCase().includes(selectedSkill.toLowerCase())) ||
      astro.specialization.toLowerCase().includes(selectedSkill.toLowerCase());
    const matchesSearch =
      astro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      astro.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      astro.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSkill && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experience - a.experience;
    if (sortBy === 'priceLow') return a.chatPrice - b.chatPrice;
    return 0;
  });

  const handleInitiateChat = (astro: Astrologer) => {
    if (walletBalance < astro.chatPrice) {
      openWalletModal();
    } else {
      onStartChat(astro);
    }
  };

  const handleInitiateVideo = (astro: Astrologer) => {
    if (walletBalance < astro.videoPrice) {
      openWalletModal();
    } else {
      onStartVideo(astro);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-5 space-y-4">
      {/* 1. Quick Circular Action Bar (Astrotalk / Guruji Mobile App Stories) */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-3 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>शुभ सेवाएं (Quick Vedic Services)</span>
          </span>
          <span className="text-[10px] text-slate-500">स्वाइप करें →</span>
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto scrollbar-none py-1 px-1">
          {quickStories.map((story) => {
            const Icon = story.icon;
            return (
              <button
                key={story.id}
                onClick={story.action}
                className="flex flex-col items-center shrink-0 group focus:outline-none"
              >
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 group-hover:scale-105 transition-transform shadow-xs">
                  <div className={`w-13 h-13 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center text-white border-2 border-white`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {story.tag && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-600 text-white shadow-2xs whitespace-nowrap">
                      {story.tag}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-slate-800 mt-1.5 tracking-tight group-hover:text-amber-800">
                  {story.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Welcoming Auspicious Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white p-4 sm:p-5 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-1.5 max-w-lg">
          <div className="inline-flex items-center gap-1.5 bg-black/15 border border-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-amber-100">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>500+ सत्यापित वैदिक ज्योतिषाचार्य</span>
          </div>

          <h1 className="font-['Cinzel',serif] text-lg sm:text-2xl font-bold text-white leading-snug">
            लाइव ज्योतिषी से सीधे बात या चैट करें
          </h1>

          <p className="text-xs text-amber-100/95 leading-relaxed">
            प्रेम, विवाह, करियर एवं कुंडली दोष का 100% सकारात्मक सात्विक समाधान। हमारे ज्योतिषी आपको कभी भयभीत नहीं करेंगे, केवल सरल उपाय बताएंगे।
          </p>

          <div className="pt-1 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-md text-white font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              भयमुक्त ज्योतिष
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-md text-white font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              गोपनीय 1-on-1 परामर्श
            </span>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 pointer-events-none blur-xl" />
      </div>

      {/* Authentic Panchmukhi Rudraksha Section (Direct link ready, No Ads) */}
      <PanchmukhiRudrakshaCard />

      {/* 🕉️ वर्चुअल पंडित जी - विशेष हिन्दी संवाद कक्ष (Highlighted Hindi Interaction Hub) */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400/90 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 text-white p-4 sm:p-5 shadow-lg">
        {/* Subtle celestial backdrop blur */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/30 border border-amber-300/60 flex items-center justify-center text-amber-100 shadow-inner shrink-0">
                <Flame className="w-6 h-6 text-amber-200 fill-amber-300/40" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-base sm:text-lg text-amber-100 tracking-tight">
                    वर्चुअल पंडित जी (Virtual Pandit Ji)
                  </h3>
                  <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    100% निःशुल्क • 24x7
                  </span>
                </div>
                <p className="text-xs text-amber-100/90 font-medium">
                  सकारात्मक मार्गदर्शन • भयमुक्त वैदिक परामर्श • 100% सात्विक उपाय
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('ai-pandit')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-amber-50 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto border border-amber-200"
            >
              <MessageSquare className="w-4 h-4 text-orange-600" />
              <span>पंडित जी से बात करें ▶</span>
            </button>
          </div>

          {/* Quick One-Click Hindi Prompts */}
          <div className="pt-1.5 border-t border-white/15">
            <p className="text-[11px] text-amber-200 font-semibold mb-1.5">
              तुरंत पूछें (किसी भी प्रश्न पर टैप करें):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                '☀️ सुबह सूर्य को तांबे के लोटे से जल देने के लाभ व सही विधि?',
                '🧘 मन शांत व एकाग्र करने के सात्विक दैनिक नियम?',
                '💼 नौकरी व आत्मविश्वास वृद्धि के सरल सात्विक उपाय?',
                '🕊️ पक्षी व गौ सेवा से ग्रह दोष कैसे शांत होते हैं?',
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    if (onAskPanditPrompt) {
                      onAskPanditPrompt(q);
                    } else if (onSelectTab) {
                      onSelectTab('ai-pandit');
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-white text-[11px] font-medium transition-all text-left truncate max-w-full"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & Quick Filters (Simple & Mobile Friendly) */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ज्योतिषी का नाम, विशेषज्ञता या भाषा खोजें..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-2xs"
            />
          </div>

          {/* Simple Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-2.5 py-2 rounded-xl border border-amber-200 bg-white text-slate-700 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 shrink-0 shadow-2xs"
          >
            <option value="rating">★ रेटिंग (Rating)</option>
            <option value="experience">अनुभव (Experience)</option>
            <option value="priceLow">कम शुल्क (Price: Low)</option>
          </select>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-xs">
          {skillsFilter.map((skill) => (
            <button
              key={skill.key}
              onClick={() => setSelectedSkill(skill.key)}
              className={`px-3 py-1.5 rounded-full border transition-all shrink-0 font-medium ${
                selectedSkill === skill.key
                  ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                  : 'bg-white border-amber-200 text-slate-700 hover:bg-amber-50'
              }`}
            >
              {skill.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Astrologers Feed (Native Astrotalk Mobile Card Layout) */}
      <div className="space-y-3">
        {filteredAstrologers.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-amber-200 p-6">
            <p className="text-sm text-slate-600 font-medium">कोई ज्योतिषी नहीं मिला।</p>
            <button
              onClick={() => {
                setSelectedSkill('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-amber-700 font-bold underline"
            >
              सभी ज्योतिषी देखें
            </button>
          </div>
        ) : (
          filteredAstrologers.map((astro) => (
            <div
              key={astro.id}
              className="rounded-2xl bg-white border border-amber-200/90 p-3.5 sm:p-4 shadow-xs hover:border-amber-400 transition-all"
            >
              {/* Top Row: Avatar + Info + Rating */}
              <div className="flex items-start gap-3">
                {/* Avatar with Online indicator */}
                <div className="relative shrink-0">
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border border-amber-300 shadow-2xs"
                  />
                  {astro.isOnline ? (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
                    </span>
                  ) : (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-400 border-2 border-white" />
                  )}
                </div>

                {/* Astrologer Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate font-['Cinzel',serif]">
                        {astro.name}
                      </h3>
                      {astro.verified && (
                        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" title="सत्यापित ज्योतिषी" />
                      )}
                    </div>

                    {/* Star Rating Badge */}
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-md font-bold text-[11px] shrink-0">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-600" />
                      <span>{astro.rating}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-800 font-semibold truncate mt-0.5">
                    {astro.title} • {astro.specialization}
                  </p>

                  <p className="text-[11px] text-slate-600 mt-0.5 truncate">
                    अनुभव: <strong className="text-slate-800">{astro.experience} वर्ष</strong> • {astro.languages.join(', ')}
                  </p>

                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {astro.totalOrders.toLocaleString()}+ सफल परामर्श
                  </p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-amber-100/80">
                {astro.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bottom CTAs: Chat & Call Buttons (Astrotalk Native Touch Targets) */}
              <div className="mt-3 pt-2.5 border-t border-amber-100 flex items-center gap-2">
                {/* Chat Button */}
                <button
                  onClick={() => handleInitiateChat(astro)}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                  <span>चैट ₹{astro.chatPrice}/मि.</span>
                </button>

                {/* Video / Call Button */}
                <button
                  onClick={() => handleInitiateVideo(astro)}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>कॉल ₹{astro.videoPrice}/मि.</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom AdMob Banner Ad (Only 1 compact ad, displayed after scrolling or staying) */}
      {showScrollAd && (
        <div className="pt-2">
          <GoogleBannerAd variant="compact" label="ज्योतिषी परामर्श विशेष" onOpenInspector={openAdInspector} />
        </div>
      )}
    </div>
  );
};
