import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ScrollText, 
  Video, 
  MessageSquare, 
  ArrowRight,
  Gift,
  Tv,
  Wallet,
  Calendar,
  FileText,
  Phone,
  Lock,
  CheckCircle2,
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';
import { SUBSCRIPTION_TIERS, ASTROLOGY_REPORTS, FESTIVAL_PACKS } from '../data/astrologers';
import { SubscriptionTier, UserProfile, AstrologyReport, FestivalPredictionPack } from '../types';
import { ReportViewerModal } from './ReportViewerModal';
import { FestivalPackModal } from './FestivalPackModal';

interface SubscriptionsViewProps {
  userProfile: UserProfile;
  walletBalance: number;
  onSubscribe: (tier: SubscriptionTier) => void;
  openWalletModal: () => void;
  onBuyReport?: (report: AstrologyReport) => void;
  onBuyFestivalPack?: (pack: FestivalPredictionPack) => void;
  onNavigateTab?: (tab: string) => void;
  openAdModal?: () => void;
}

export const SubscriptionsView: React.FC<SubscriptionsViewProps> = ({
  userProfile,
  walletBalance,
  onSubscribe,
  openWalletModal,
  onBuyReport,
  onBuyFestivalPack,
  onNavigateTab,
  openAdModal,
}) => {
  const [activeTab, setActiveTab] = useState<'plans' | 'reports' | 'festivals' | 'monetization'>('plans');
  const [selectedReport, setSelectedReport] = useState<AstrologyReport | null>(null);
  const [selectedPack, setSelectedPack] = useState<FestivalPredictionPack | null>(null);
  const [unlockedReports, setUnlockedReports] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jyotishi_unlocked_reports');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [unlockedPacks, setUnlockedPacks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jyotishi_unlocked_packs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const isPaidUser = userProfile.subscriptionPlan && userProfile.subscriptionPlan !== 'free' && userProfile.subscriptionPlan !== 'none';

  const handleReportAction = (rep: AstrologyReport) => {
    const isIncludedInPlan = rep.includedInPlans.includes(userProfile.subscriptionPlan as any);
    const isAlreadyUnlocked = unlockedReports.includes(rep.id);

    if (isIncludedInPlan || isAlreadyUnlocked) {
      setSelectedReport(rep);
      return;
    }

    if (walletBalance < rep.price) {
      openWalletModal();
      return;
    }

    if (onBuyReport) {
      onBuyReport(rep);
    }
    const next = [...unlockedReports, rep.id];
    setUnlockedReports(next);
    localStorage.setItem('jyotishi_unlocked_reports', JSON.stringify(next));
    setSelectedReport(rep);
  };

  const handleFestivalPackAction = (pack: FestivalPredictionPack) => {
    const isYearlyUser = userProfile.subscriptionPlan === 'yearly';
    const isAlreadyUnlocked = unlockedPacks.includes(pack.id);

    if (isYearlyUser || isAlreadyUnlocked) {
      setSelectedPack(pack);
      return;
    }

    if (walletBalance < pack.price) {
      openWalletModal();
      return;
    }

    if (onBuyFestivalPack) {
      onBuyFestivalPack(pack);
    }
    const next = [...unlockedPacks, pack.id];
    setUnlockedPacks(next);
    localStorage.setItem('jyotishi_unlocked_packs', JSON.stringify(next));
    setSelectedPack(pack);
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Spiritual Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold">
          <Crown className="w-3.5 h-3.5 text-amber-600" />
          <span>ज्योतिषी LIVE • सदस्यता व वैदिक सेवाएं</span>
        </div>
        <h1 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-slate-900">
          वैदिक योजनाएं एवं सात्विक सेवाएं
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          अपनी सुविधानुसार प्लान चुनें। किसी भी पेड प्लान में <strong>कोई भी ऑटोमैटिक विज्ञापन नहीं</strong> दिखेगा।
        </p>

        {/* Current Active Plan Badge & Ad Status Banner */}
        <div className="pt-2">
          {isPaidUser ? (
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 inline-flex flex-col sm:flex-row items-center gap-2 shadow-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <Crown className="w-4 h-4 text-emerald-600" />
                <span>सक्रिय प्लान: {userProfile.subscriptionPlan.toUpperCase()} सदस्य</span>
              </div>
              <span className="hidden sm:inline text-emerald-400">•</span>
              <span className="flex items-center gap-1 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% शून्य ऑटोमैटिक ऐड (Ad-Free Active) • केवल स्वैच्छिक रिवॉर्ड ऐड्स उपलब्ध</span>
              </span>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 inline-flex flex-col sm:flex-row items-center gap-2">
              <span className="font-bold">सक्रिय प्लान: FREE (मुफ़्त)</span>
              <span className="hidden sm:inline text-amber-400">•</span>
              <span className="text-amber-800">
                📢 प्रायोजित विज्ञापन समर्थित • ₹79 से शुरू कर संपूर्ण ऐप में ऑटोमैटिक ऐड्स हटाएं
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 border-b border-amber-200/80 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'plans'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-100/70'
          }`}
        >
          <Crown className="w-3.5 h-3.5" />
          <span>सदस्यता प्लान (Plans)</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'reports'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-100/70'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>📄 विस्तृत रिपोर्ट्स (Reports)</span>
        </button>

        <button
          onClick={() => setActiveTab('festivals')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'festivals'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-100/70'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>📅 त्यौहार व विशेष पैक्स</span>
        </button>

        <button
          onClick={() => setActiveTab('monetization')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'monetization'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-amber-100/70'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>💼 सभी सेवाएं व कमाई इकोसिस्टम</span>
        </button>
      </div>

      {/* TAB 1: SUBSCRIPTION PLANS */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* Quick-Glance Official Comparison Table (Matching User's Prompt Format) */}
          <div className="bg-[#FFFDF9] border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs overflow-hidden">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-100">
              <h3 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm sm:text-base flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>प्लान तुलना तालिका (Plan Comparison)</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                वॉलेट बैलेंस: <strong className="text-slate-900 font-['Cinzel',serif]">₹{walletBalance}</strong>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-amber-100/70 text-amber-950 font-bold border-b border-amber-200">
                    <th className="p-2.5 sm:p-3">Plan</th>
                    <th className="p-2.5 sm:p-3">Price</th>
                    <th className="p-2.5 sm:p-3">क्या मिलेगा (Key Features)</th>
                    <th className="p-2.5 sm:p-3 text-right">कार्रवाई (Action)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-slate-800">
                  {SUBSCRIPTION_TIERS.map((tier) => {
                    const isCurrent = userProfile.subscriptionPlan === tier.id;
                    return (
                      <tr 
                        key={tier.id} 
                        className={`hover:bg-amber-50/60 transition-colors ${
                          tier.popular ? 'bg-amber-50/40 font-medium' : ''
                        }`}
                      >
                        <td className="p-2.5 sm:p-3">
                          <div className="flex items-center gap-1.5">
                            <strong className="font-['Cinzel',serif] text-sm text-slate-900">{tier.name}</strong>
                            {tier.popular && (
                              <span className="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 block">{tier.badge}</span>
                        </td>
                        <td className="p-2.5 sm:p-3 whitespace-nowrap">
                          <span className="font-bold text-slate-900 font-['Cinzel',serif] text-sm">
                            ₹{tier.price}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {tier.period === 'lifetime' ? '' : `/${tier.period}`}
                          </span>
                        </td>
                        <td className="p-2.5 sm:p-3">
                          <span className="text-slate-800 font-medium leading-relaxed">{tier.whatYouGet}</span>
                          {tier.id !== 'free' && (
                            <span className="block text-[10px] text-emerald-700 font-semibold mt-0.5">
                              ✓ 100% नो ऑटोमैटिक ऐड्स
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 sm:p-3 text-right whitespace-nowrap">
                          {isCurrent ? (
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[11px] border border-emerald-300">
                              वर्तमान प्लान
                            </span>
                          ) : tier.id === 'free' ? (
                            <button
                              onClick={() => onSubscribe(tier)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-[11px] border border-slate-300"
                            >
                              फ्री चुनें
                            </button>
                          ) : (
                            <button
                              onClick={() => onSubscribe(tier)}
                              className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all shadow-2xs active:scale-95 ${
                                tier.popular
                                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white hover:from-amber-700 hover:to-rose-700'
                                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                              }`}
                            >
                              सब्स्क्राइब करें
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Pricing Cards Grid (5 Tiers) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
            {SUBSCRIPTION_TIERS.map((tier) => {
              const isCurrent = userProfile.subscriptionPlan === tier.id;
              return (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl p-4 bg-[#FFFDF9] border-2 transition-all flex flex-col justify-between ${
                    tier.popular
                      ? 'border-amber-500 shadow-lg scale-[1.02] bg-gradient-to-b from-amber-50/70 to-white ring-2 ring-amber-400/30'
                      : isCurrent
                      ? 'border-emerald-500 shadow-md bg-emerald-50/20'
                      : 'border-amber-200 shadow-xs hover:border-amber-300'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-600 to-rose-600 text-white px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-['Cinzel',serif] font-bold text-base text-slate-900">
                        {tier.name}
                      </h3>
                      <span className="text-[9px] uppercase font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                        {tier.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3 line-clamp-2">{tier.subtitle}</p>

                    {/* Price Display */}
                    <div className="flex items-baseline gap-1 mb-4 pb-3 border-b border-amber-200/70 font-['Cinzel',serif]">
                      <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                        ₹{tier.price}
                      </span>
                      <span className="text-[11px] text-slate-500 font-sans font-medium">
                        {tier.period === 'lifetime' ? '' : `/${tier.period}`}
                      </span>
                    </div>

                    {/* Key What You Get Pill */}
                    <div className="mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-950">
                      <span className="font-bold block text-[10px] uppercase text-amber-800 mb-0.5">क्या मिलेगा:</span>
                      <span>{tier.whatYouGet}</span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-1.5 text-[11px] text-slate-700 mb-4">
                      {tier.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    {isCurrent ? (
                      <button
                        disabled
                        className="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 cursor-default"
                      >
                        ✓ सक्रिय प्लान
                      </button>
                    ) : tier.id === 'free' ? (
                      <button
                        onClick={() => onSubscribe(tier)}
                        className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors"
                      >
                        फ्री चुनें
                      </button>
                    ) : (
                      <button
                        onClick={() => onSubscribe(tier)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-1 ${
                          tier.popular
                            ? 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                        }`}
                      >
                        <span>₹{tier.price} में लें</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                    <span className="text-[9px] text-slate-400 text-center block mt-1">
                      {tier.id === 'free' ? 'कोई शुल्क नहीं' : `वॉलेट से कटेगा (बैलेंस: ₹${walletBalance})`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ad Policy Card: Clear & Strict Assurance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-300 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm sm:text-base flex items-center gap-2">
                  <span>नो ऑटोमैटिक ऐड्स नीति (100% Ad-Free Subscription Rule)</span>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.2 rounded-full uppercase">
                    गारंटी
                  </span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong>पेड सब्सक्राइबर्स (Basic, Premium, Pro, Yearly)</strong>: संपूर्ण ऐप में कोई भी स्वतः (automatic) बैनर या पॉपअप विज्ञापन नहीं दिखाया जाएगा।
                  <br />
                  • <strong>रिवॉर्ड ऐड्स (Reward Ads)</strong>: केवल और केवल वही विज्ञापन दिखेंगे जिन्हें आप वॉलेट में अतिरिक्त फ्री कॉइन्स पाने हेतु खुद <strong>'Watch Ad'</strong> पर क्लिक करेंगे।
                  <br />
                  • <strong>फ्री यूज़र्स (Free Users)</strong>: सात्विक सेवाओं के अनुरक्षण हेतु गैर-बाधित प्रायोजित ऐड्स दिखाए जाते हैं।
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={openWalletModal}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Wallet className="w-3.5 h-3.5 text-amber-600" />
                <span>रिचार्ज वॉलेट (+बोनस)</span>
              </button>

              {openAdModal && (
                <button
                  onClick={openAdModal}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>रिवॉर्ड ऐड देखें (+₹25)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DETAILED REPORTS (Kundli, Marriage, Career) */}
      {activeTab === 'reports' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm sm:text-base">
                📄 विस्तृत कुंडली, विवाह एवं करियर रिपोर्ट्स
              </h3>
              <p className="text-slate-600 text-xs">
                विस्तृत 20-25 पृष्ठों की हस्तनिर्मित डिजिटल रिपोर्ट, जो प्रो व वार्षिक प्लान में निःशुल्क सम्मिलित हैं।
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] text-slate-500">उपलब्ध वॉलेट बैलेंस:</span>
              <div className="font-bold text-base text-slate-900 font-['Cinzel',serif]">₹{walletBalance}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ASTROLOGY_REPORTS.map((rep) => {
              const isIncludedInPlan = rep.includedInPlans.includes(userProfile.subscriptionPlan as any);
              const isUnlocked = unlockedReports.includes(rep.id) || isIncludedInPlan;

              return (
                <div
                  key={rep.id}
                  className="rounded-2xl border border-amber-200 bg-[#FFFDF9] p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {rep.pages} • {rep.deliveryTime}
                      </span>
                      {isUnlocked && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>अनलॉक है</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-base mb-1">
                      {rep.hindiTitle}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">{rep.subtitle}</p>

                    <div className="flex items-baseline gap-1 mb-4 pb-3 border-b border-amber-100 font-['Cinzel',serif]">
                      <span className="text-2xl font-bold text-slate-900">
                        {isIncludedInPlan ? 'मुफ़्त (Free)' : `₹${rep.price}`}
                      </span>
                      {!isIncludedInPlan && (
                        <span className="text-[11px] text-slate-400 font-sans">
                          (एकमुश्त डिजिटल रिपोर्ट)
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {rep.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-700 mb-5">
                      {rep.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleReportAction(rep)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                        isUnlocked
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white active:scale-95'
                      }`}
                    >
                      <ScrollText className="w-3.5 h-3.5" />
                      <span>{isUnlocked ? 'रिपोर्ट देखें / प्रिंट करें' : `₹${rep.price} में अभी ऑर्डर करें`}</span>
                    </button>
                    <span className="text-[10px] text-slate-400 text-center block mt-1.5">
                      {isIncludedInPlan ? 'आपके वर्तमान प्लान में निःशुल्क' : `वॉलेट से कटेगा (बैलेंस: ₹${walletBalance})`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: FESTIVAL & SPECIAL PREDICTION PACKS */}
      {activeTab === 'festivals' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm sm:text-base">
                📅 त्यौहार व ग्रह-गोचर विशेष भविष्यफल पैक्स
              </h3>
              <p className="text-slate-600 text-xs">
                दीपावली, नवरात्रि और 2026 शनि गोचर के लिए प्रमाणित सात्विक पूजा विधि व व्यक्तिगत भविष्यफल।
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] text-slate-500">उपलब्ध वॉलेट बैलेंस:</span>
              <div className="font-bold text-base text-slate-900 font-['Cinzel',serif]">₹{walletBalance}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FESTIVAL_PACKS.map((pack) => {
              const isYearlyUser = userProfile.subscriptionPlan === 'yearly';
              const isUnlocked = unlockedPacks.includes(pack.id) || isYearlyUser;

              return (
                <div
                  key={pack.id}
                  className="rounded-2xl border border-amber-200 bg-[#FFFDF9] p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl p-1.5 bg-amber-100 rounded-xl">{pack.icon}</span>
                        <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                          {pack.festival}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                        {pack.badge}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-base mb-1">
                      {pack.title}
                    </h4>

                    <div className="flex items-baseline gap-2 mb-3 pb-3 border-b border-amber-100 font-['Cinzel',serif]">
                      <span className="text-2xl font-bold text-slate-900">
                        {isYearlyUser ? 'मुफ़्त (Free)' : `₹${pack.price}`}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{pack.originalPrice}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {pack.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-700 mb-5">
                      {pack.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleFestivalPackAction(pack)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                        isUnlocked
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white active:scale-95'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isUnlocked ? 'पैक विवरण व उपाय देखें' : `₹${pack.price} में अनलॉक करें`}</span>
                    </button>
                    <span className="text-[10px] text-slate-400 text-center block mt-1.5">
                      {isYearlyUser ? 'वार्षिक प्लान में पूर्णतः मुफ़्त' : `वॉलेट से कटेगा (बैलेंस: ₹${walletBalance})`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: COMPLETE MONETIZATION & SERVICES ECOSYSTEM */}
      {activeTab === 'monetization' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
            <h3 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm sm:text-base">
              💼 ज्योतिषी LIVE • सम्पूर्ण कमाई व सेवाएं (Earning & Services Ecosystem)
            </h3>
            <p className="text-slate-600">
              ऐप में यूज़र्स की सुविधा व प्लेटफॉर्म की आय के लिए 6 मुख्य स्तंभ संचालित हैं:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Paid Astrology Chat */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm mb-1">
                  💬 Paid Astrology Chat
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  सत्यापित ज्योतिषाचार्यों से 1-ऑन-1 लाइव चैट परामर्श। प्रति मिनट दर (₹18-₹25/मिनट) से ऑटोमैटिक वॉलेट कटौती।
                </p>
              </div>
              <button
                onClick={() => onNavigateTab && onNavigateTab('astrologers')}
                className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition-colors"
              >
                ज्योतिषी चैट देखें →
              </button>
            </div>

            {/* 2. Paid Consultation */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm mb-1">
                  📞 Paid Consultation (Call/Video)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  सीधे ऑडियो व वीडियो कॉल पर फेस-टू-फेस परामर्श। उच्च संतुष्टि दर व वास्तविक समय कुंडली विश्लेषण।
                </p>
              </div>
              <button
                onClick={() => onNavigateTab && onNavigateTab('astrologers')}
                className="w-full py-2 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs rounded-xl transition-colors"
              >
                वीडियो कॉल बुक करें →
              </button>
            </div>

            {/* 3. Detailed Reports */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800 mb-3">
                  <ScrollText className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm mb-1">
                  📄 Detailed Kundli/Marriage/Career Reports
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  20-25 पेज की विस्तृत हस्तनिर्मित व एआई समर्थित पीडीएफ रिपोर्ट्स (₹149 - ₹199) एकमुश्त बिक्री।
                </p>
              </div>
              <button
                onClick={() => setActiveTab('reports')}
                className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs rounded-xl transition-colors"
              >
                रिपोर्ट्स कैटलॉग देखें →
              </button>
            </div>

            {/* 4. Wallet / Credits Recharge */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-3">
                  <Wallet className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm mb-1">
                  🪙 Wallet / Credits Recharge
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  UPI, कार्ड व नेटबैंकिंग द्वारा ₹50 से ₹1,000 तक के त्वरित रिचार्ज पैक्स आकर्षक बोनस क्रेडिट्स के साथ।
                </p>
              </div>
              <button
                onClick={openWalletModal}
                className="w-full py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl transition-colors"
              >
                वॉलेट रिचार्ज करें →
              </button>
            </div>

            {/* 5. Festival / Special Prediction Packs */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-800 mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm mb-1">
                  📅 Festival / Special Prediction Packs
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  दीपावली, नवरात्रि व 2026 शनि गोचर हेतु विशेष ₹99-₹149 के मौसमी पैक्स जो तुरंत भारी राजस्व उत्पन्न करते हैं।
                </p>
              </div>
              <button
                onClick={() => setActiveTab('festivals')}
                className="w-full py-2 bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-xs rounded-xl transition-colors"
              >
                त्यौहार पैक्स देखें →
              </button>
            </div>

            {/* 6. Free Users Advertisements */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 mb-3">
                  <Tv className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 font-['Cinzel',serif] text-sm mb-1">
                  📢 Free Users Advertisements
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  मुफ़्त यूज़र्स के लिए Google AdMob बैनर विज्ञापन एवं ₹25 कॉइन्स के लिए यूज़र द्वारा क्लिक किए जाने वाले रिवॉर्ड ऐड्स।
                </p>
              </div>
              {openAdModal ? (
                <button
                  onClick={openAdModal}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl transition-colors"
                >
                  रिवॉर्ड ऐड टेस्ट करें →
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Trust Guarantee Box */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <h4 className="font-bold text-slate-900 font-['Cinzel',serif]">
              सनातन सात्विक शुद्धता व भयमुक्त प्रतिज्ञा
            </h4>
            <p className="text-slate-600 text-[11px]">
              हमारे सभी परामर्श, रिपोर्ट्स और उपाय अंधविश्वास और भय से 100% मुक्त हैं। हम केवल आत्मबल और सकारात्मक सात्विक समाधान का प्रसार करते हैं।
            </p>
          </div>
        </div>

        <button
          onClick={openWalletModal}
          className="px-4 py-2 bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-semibold rounded-xl text-xs shrink-0 transition-colors shadow-2xs"
        >
          वॉलेट बैलेंस रिचार्ज करें
        </button>
      </div>

      {/* Modal Viewers for Reports & Festival Packs */}
      <ReportViewerModal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
        userProfile={userProfile}
      />

      <FestivalPackModal
        isOpen={!!selectedPack}
        onClose={() => setSelectedPack(null)}
        pack={selectedPack}
        userProfile={userProfile}
      />
    </div>
  );
};
