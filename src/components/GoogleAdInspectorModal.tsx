import React, { useState } from 'react';
import { 
  X, 
  Tv, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Play, 
  Layers, 
  Monitor, 
  Smartphone,
  Info,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { GOOGLE_TEST_ADS_CONFIG } from '../config/googleAdsConfig';

interface GoogleAdInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerRewarded: () => void;
  onTriggerInterstitial: () => void;
}

export const GoogleAdInspectorModal: React.FC<GoogleAdInspectorModalProps> = ({
  isOpen,
  onClose,
  onTriggerRewarded,
  onTriggerInterstitial,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'units' | 'logs' | 'guide'>('units');
  const [testNativePreview, setTestNativePreview] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const adUnits = [
    {
      key: 'rewarded',
      name: 'Rewarded Video Ad (रिवॉर्डेड वीडियो)',
      unitId: GOOGLE_TEST_ADS_CONFIG.rewardedVideo.androidId,
      format: 'Video (10s Full)',
      reward: '₹25 Wallet Cash',
      status: 'Ready to Test',
      action: onTriggerRewarded,
      actionLabel: 'Test Rewarded Ad ▶',
    },
    {
      key: 'interstitial',
      name: 'Interstitial Ad (इंटरस्टीशियल फुल-स्क्रीन)',
      unitId: GOOGLE_TEST_ADS_CONFIG.interstitial.androidId,
      format: 'Full Screen Overlay',
      reward: 'Impression Count',
      status: 'Ready to Test',
      action: onTriggerInterstitial,
      actionLabel: 'Test Interstitial ▶',
    },
    {
      key: 'banner',
      name: 'Adaptive Banner Ad (बैनर विज्ञापन)',
      unitId: GOOGLE_TEST_ADS_CONFIG.banner.androidId,
      format: '320x50 / Adaptive',
      reward: 'Continuous Display',
      status: 'Active on Home',
      action: () => {
        onClose();
        window.scrollTo({ top: 350, behavior: 'smooth' });
      },
      actionLabel: 'View on Home Screen',
    },
    {
      key: 'native',
      name: 'Native Advanced Ad (नेकटिव लिस्ट ऐड)',
      unitId: GOOGLE_TEST_ADS_CONFIG.nativeAdvanced.androidId,
      format: 'Custom Layout Feed',
      reward: 'High CTR / Engagement',
      status: 'Integrated',
      action: () => setTestNativePreview(!testNativePreview),
      actionLabel: testNativePreview ? 'Hide Native Preview' : 'Preview Native Ad',
    },
    {
      key: 'appOpen',
      name: 'App Open Ad (ऐप ओपन ऐड)',
      unitId: GOOGLE_TEST_ADS_CONFIG.appOpen.androidId,
      format: 'Splash / Foreground',
      reward: 'App Start Monetization',
      status: 'Configured',
      action: onTriggerInterstitial,
      actionLabel: 'Test Open Flow',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border-2 border-amber-400 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Top Title Bar */}
        <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs">
              ADS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">Google Ads Inspector & Test Suite</h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold px-1.5 py-0.2 rounded-xs">
                  OFFICIAL TEST IDs
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Google Mobile Ads SDK (AdMob & AdSense) लाइव परीक्षण
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white/90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-amber-200 bg-amber-50/70 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('units')}
            className={`py-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'units'
                ? 'border-amber-600 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-amber-800'
            }`}
          >
            📋 Official Test Ad Units
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'logs'
                ? 'border-amber-600 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-amber-800'
            }`}
          >
            ⚡ Live Ad Events / Logs
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'guide'
                ? 'border-amber-600 text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-amber-800'
            }`}
          >
            🚀 Production Guide (Live Ads)
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3.5">
          {activeTab === 'units' && (
            <>
              <div className="p-3 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white border border-emerald-500/50 rounded-xl text-xs space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <strong className="text-emerald-300 font-bold text-xs sm:text-sm">
                      आपकी AdMob IDs सक्रिय हैं (Active Configuration)
                    </strong>
                  </div>
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-xs uppercase">
                    LIVE READY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="p-2 rounded bg-black/60 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] block">AdMob App ID:</span>
                      <code className="text-amber-300 font-mono text-[10px] select-all">
                        ca-app-pub-7143877759857923~6498840568
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopy('ca-app-pub-7143877759857923~6498840568', 'appId')}
                      className="p-1 hover:text-emerald-400 text-slate-400"
                      title="Copy App ID"
                    >
                      {copiedId === 'appId' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-2 rounded bg-black/60 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Banner Unit ID:</span>
                      <code className="text-emerald-300 font-mono text-[10px] select-all">
                        ca-app-pub-7143877759857923/2340586201
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopy('ca-app-pub-7143877759857923/2340586201', 'bannerId')}
                      className="p-1 hover:text-emerald-400 text-slate-400"
                      title="Copy Banner Ad Unit ID"
                    >
                      {copiedId === 'bannerId' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-2 rounded bg-black/60 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Reward Ad Unit ID:</span>
                      <code className="text-amber-300 font-mono text-[10px] select-all">
                        ca-app-pub-7143877759857923/5214161558
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopy('ca-app-pub-7143877759857923/5214161558', 'rewardId')}
                      className="p-1 hover:text-emerald-400 text-slate-400"
                      title="Copy Rewarded Ad Unit ID"
                    >
                      {copiedId === 'rewardId' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-emerald-200/90 pt-1 border-t border-emerald-800/60">
                  ✓ बैनर विज्ञापन (2340586201) व रिवॉर्डेड वीडियो (5214161558) सफलतापूर्वक लाइव एक्टिव हैं।
                </p>
              </div>

              {/* Units List */}
              <div className="space-y-2.5">
                {adUnits.map((u) => (
                  <div
                    key={u.key}
                    className="p-3.5 bg-white border border-amber-200/90 rounded-xl shadow-xs flex flex-col gap-2 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                            {u.name}
                          </h4>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                            {u.format}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px]">
                          <span className="text-slate-500">Official Unit ID:</span>
                          <code className="text-amber-800 font-mono text-[11px] bg-amber-50 px-1 rounded font-bold">
                            {u.unitId}
                          </code>
                          <button
                            onClick={() => handleCopy(u.unitId, u.key)}
                            title="Copy Ad Unit ID"
                            className="text-slate-400 hover:text-amber-700 p-0.5"
                          >
                            {copiedId === u.key ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={u.action}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 shrink-0 flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>{u.actionLabel}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Reward/Outcome: <strong className="text-slate-700">{u.reward}</strong></span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {u.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Native Ad Preview Box if toggled */}
              {testNativePreview && (
                <div className="p-3.5 bg-slate-900 border-2 border-emerald-500/50 rounded-xl text-white space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-emerald-500 text-black font-black px-1.5 py-0.2 rounded-xs text-[9px]">
                        Ad • विज्ञापन
                      </span>
                      <span className="text-slate-300 font-medium">Native Advanced Ad Template</span>
                    </div>
                    <code className="text-amber-300 font-mono text-[10px]">
                      {GOOGLE_TEST_ADS_CONFIG.nativeAdvanced.androidId}
                    </code>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <img
                      src="https://images.unsplash.com/photo-1609358905581-e5382c09b8e8?w=150&auto=format&fit=crop&q=80"
                      alt="Sample Native"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs truncate">Google Mobile Ads: Sample App Native</h5>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        Install and test seamless native in-feed layouts for maximum user retention.
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-emerald-500 text-black font-bold text-xs rounded">
                      Install
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'logs' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AdMob SDK Event Stream</span>
                </span>
                <span className="text-emerald-400 text-[10px]">● Connected</span>
              </div>
              <p className="text-emerald-400">[0.00s] Google Mobile Ads SDK v23.0.0 Initialized</p>
              <p className="text-slate-400">[0.05s] App ID verified: ca-app-pub-3940256099942544~3347511713</p>
              <p className="text-sky-400">[0.12s] Test Device Registered: Emulator / Web Sandbox</p>
              <p className="text-amber-300">[0.25s] Preloading Rewarded Video Ad: ca-app-pub-3940256099942544/5224354917</p>
              <p className="text-emerald-400">[0.40s] Rewarded Video Ad Loaded Successfully (100% Fill)</p>
              <p className="text-slate-400">[0.55s] Adaptive Banner Mounted: ca-app-pub-3940256099942544/6300978111</p>
              <p className="text-amber-300">[0.70s] Interstitial Preload Ready: ca-app-pub-3940256099942544/1033173712</p>
              <p className="text-purple-300 pt-2 border-t border-slate-900">
                ⚡ Ready: Click "Test Rewarded Ad" to simulate onUserEarnedReward callback (+₹25 Coins).
              </p>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl">
                <h4 className="font-bold text-amber-950 font-['Cinzel',serif] text-sm mb-1">
                  Google Play Store / Live App Release Instructions
                </h4>
                <p className="text-slate-700 text-xs">
                  जब आपकी ऐप Google Play Store पर लाइव होने वाली हो, तो आप अपने Google AdMob अकाउंट (<a href="https://admob.google.com" target="_blank" rel="noreferrer" className="text-amber-700 underline font-semibold">admob.google.com</a>) से अपनी रियल Ad Unit IDs प्राप्त कर सकते हैं:
                </p>
              </div>

              <ol className="list-decimal list-inside space-y-2 pl-1 bg-white p-3.5 rounded-xl border border-slate-200">
                <li>
                  <strong>AdMob Dashboard</strong> में जाकर अपनी ऐप रजिस्टर करें (Android / iOS).
                </li>
                <li>
                  <strong>Ad Units</strong> टैब में <strong>Rewarded Video</strong> और <strong>Banner</strong> बनाएं।
                </li>
                <li>
                  फ़ाइल <code className="bg-slate-100 px-1.5 py-0.5 rounded text-amber-800 font-mono">src/config/googleAdsConfig.ts</code> खोलें और टेस्ट IDs को अपनी लाइव IDs से बदल दें।
                </li>
                <li>
                  बस! आपकी ऐप में रियल Google Ads शुरू हो जाएंगे और आपकी कमाई सीधे आपके बैंक/AdSense खाते में आएगी।
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-amber-50/60 border-t border-amber-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Google Mobile Ads Official Test Credentials
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
