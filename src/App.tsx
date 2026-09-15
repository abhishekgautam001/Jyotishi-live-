import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AstrologerCatalog } from './components/AstrologerCatalog';
import { AIPanditJi } from './components/AIPanditJi';
import { DailyRashifalView } from './components/DailyRashifalView';
import { KundaliView } from './components/KundaliView';
import { SubscriptionsView } from './components/SubscriptionsView';
import { WalletView } from './components/WalletView';
import { UserProfileView } from './components/UserProfileView';
import { AstrologerDashboard } from './components/AstrologerDashboard';
import { BottomNav } from './components/BottomNav';
import { WalletModal } from './components/WalletModal';
import { AdRewardModal } from './components/AdRewardModal';
import { GoogleInterstitialAdModal } from './components/GoogleInterstitialAdModal';
import { GoogleAdInspectorModal } from './components/GoogleAdInspectorModal';
import { ChatConsultationModal } from './components/ChatConsultationModal';
import { VideoConsultationModal } from './components/VideoConsultationModal';
import { ReviewModal } from './components/ReviewModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { 
  INITIAL_USER_PROFILE, 
  ASTROLOGERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_NOTIFICATIONS 
} from './data/astrologers';
import { 
  Astrologer, 
  SubscriptionTier, 
  UserProfile, 
  WalletTransaction, 
  AppNotification,
  AstrologyReport,
  FestivalPredictionPack
} from './types';

export default function App() {
  // Local storage state initialization
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('jyotishi_wallet');
    return saved ? JSON.parse(saved) : 175;
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('jyotishi_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('jyotishi_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('jyotishi_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<string>('astrologers');
  const [isAstrologerMode, setIsAstrologerMode] = useState<boolean>(false);
  const [hasBrowserPush, setHasBrowserPush] = useState<boolean>(false);

  // Modals state
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isInterstitialOpen, setIsInterstitialOpen] = useState(false);
  const [isAdInspectorOpen, setIsAdInspectorOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [panditPrompt, setPanditPrompt] = useState<string | undefined>();

  // Active Consultations
  const [activeChatAstro, setActiveChatAstro] = useState<Astrologer | null>(null);
  const [activeVideoAstro, setActiveVideoAstro] = useState<Astrologer | null>(null);
  const [reviewData, setReviewData] = useState<{
    isOpen: boolean;
    astroName: string;
    type: 'chat' | 'video';
    duration: number;
    amount: number;
  }>({
    isOpen: false,
    astroName: '',
    type: 'chat',
    duration: 0,
    amount: 0,
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('jyotishi_wallet', JSON.stringify(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('jyotishi_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('jyotishi_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('jyotishi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Wallet Add Money
  const handleAddMoney = (amount: number, bonus: number) => {
    const totalCredit = amount + bonus;
    setWalletBalance((prev) => prev + totalCredit);

    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'credit',
      amount: totalCredit,
      title: `Wallet Recharge (₹${amount} + ₹${bonus} Bonus)`,
      description: 'Payment verified via secure UPI/Card Gateway',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      category: 'recharge',
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Send notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: '💰 Wallet Recharged Successfully',
      message: `₹${totalCredit} added to your Jyotishi Live wallet. You are ready to consult with our revered astrologers.`,
      type: 'wallet',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Wallet Deduct Money
  const handleDeductMoney = (amount: number, description: string): boolean => {
    if (walletBalance < amount) {
      setIsWalletModalOpen(true);
      return false;
    }

    setWalletBalance((prev) => prev - amount);

    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'debit',
      amount,
      title: 'Consultation Fee Deduction',
      description,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      category: 'chat_consult',
    };

    setTransactions((prev) => [newTx, ...prev]);
    return true;
  };

  // Reward Ad Claimed
  const handleRewardClaimed = (amount: number) => {
    setWalletBalance((prev) => prev + amount);

    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'credit',
      amount,
      title: 'Sponsored Ad Reward Bonus',
      description: 'Watched sponsored temple darshan video ad',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      category: 'ad_reward',
    };

    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: '🎁 Ad Reward Claimed',
      message: `₹${amount} bonus credit added to your wallet!`,
      type: 'wallet',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Subscribe to Subscription Tier (Free, Basic, Premium, Pro, Yearly)
  const handleSubscribeTier = (tier: SubscriptionTier) => {
    if (tier.id === 'free') {
      setUserProfile((prev) => ({ ...prev, subscriptionPlan: 'free' }));
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        title: `Free Plan Selected`,
        message: `You are on the Free Plan with daily horoscope & basic kundli. Sponsored ads are enabled.`,
        type: 'promo',
        timestamp: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
      return;
    }

    if (walletBalance < tier.price) {
      setIsWalletModalOpen(true);
      return;
    }

    setWalletBalance((prev) => prev - tier.price);
    setUserProfile((prev) => ({ ...prev, subscriptionPlan: tier.id }));

    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'debit',
      amount: tier.price,
      title: `Subscribed: ${tier.name} Plan`,
      description: `${tier.whatYouGet} • 100% No Automatic Ads Guarantee active!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      category: 'subscription',
    };

    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `👑 Welcome to ${tier.name} Plan!`,
      message: `Your membership is active! Zero automatic ads across the app. Only voluntary reward ads are accessible upon your click.`,
      type: 'promo',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Buy Detailed Astrology Report
  const handleBuyReport = (report: AstrologyReport) => {
    setWalletBalance((prev) => prev - report.price);
    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'debit',
      amount: report.price,
      title: `Report: ${report.hindiTitle}`,
      description: `Complete digital Astrological Report unlocked (${report.pages})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      category: 'report',
    };
    setTransactions((prev) => [newTx, ...prev]);
    setNotifications((prev) => [{
      id: `notif-${Date.now()}`,
      title: `📄 Report Ready: ${report.hindiTitle}`,
      message: `Your verified Vedic astrological report has been generated. View or print anytime!`,
      type: 'system',
      timestamp: 'Just now',
      read: false,
    }, ...prev]);
  };

  // Buy Festival Prediction Pack
  const handleBuyFestivalPack = (pack: FestivalPredictionPack) => {
    setWalletBalance((prev) => prev - pack.price);
    const newTx: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'debit',
      amount: pack.price,
      title: `Pack: ${pack.title}`,
      description: `Festival & Special Prediction Pack unlocked (${pack.festival})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
      category: 'subscription',
    };
    setTransactions((prev) => [newTx, ...prev]);
    setNotifications((prev) => [{
      id: `notif-${Date.now()}`,
      title: `📅 ${pack.festival} Pack Unlocked`,
      message: `Special predictions, shubh muhurat and satvik remedies are now active in your account!`,
      type: 'promo',
      timestamp: 'Just now',
      read: false,
    }, ...prev]);
  };

  // Session Completion & Review Trigger
  const handleCompleteChatSession = (durationMinutes: number, amountBilled: number) => {
    if (!activeChatAstro) return;
    const astroName = activeChatAstro.name;
    setActiveChatAstro(null);
    setReviewData({
      isOpen: true,
      astroName,
      type: 'chat',
      duration: durationMinutes,
      amount: amountBilled,
    });
  };

  const handleCompleteVideoSession = (durationMinutes: number, amountBilled: number) => {
    if (!activeVideoAstro) return;
    const astroName = activeVideoAstro.name;
    setActiveVideoAstro(null);
    setReviewData({
      isOpen: true,
      astroName,
      type: 'video',
      duration: durationMinutes,
      amount: amountBilled,
    });
  };

  const handleReviewSubmit = (rating: number, review: string, tags: string[]) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: '⭐ Review Submitted',
      message: `Thank you for rating ${reviewData.astroName} (${rating} Stars). Your blessing review is live.`,
      type: 'review',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Browser Push Permission
  const handleRequestBrowserPush = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          setHasBrowserPush(true);
          new Notification('Jyotishi Live Push Active', {
            body: 'You will receive auspicious Brahma Muhurat and live consultation reminders.',
          });
        }
      });
    } else {
      setHasBrowserPush(true);
    }
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col selection:bg-amber-200 selection:text-amber-900">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        walletBalance={walletBalance}
        openWalletModal={() => setIsWalletModalOpen(true)}
        openAdModal={() => setIsAdModalOpen(true)}
        openAdInspector={() => setIsAdInspectorOpen(true)}
        openNotifications={() => setIsNotifDrawerOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
        isAstrologerMode={isAstrologerMode}
        setIsAstrologerMode={setIsAstrologerMode}
        activeConsultation={
          activeChatAstro
            ? { type: 'chat', astrologerName: activeChatAstro.name }
            : activeVideoAstro
            ? { type: 'video', astrologerName: activeVideoAstro.name }
            : null
        }
        resumeActiveConsultation={() => {
          // Modals are already open or will re-focus
        }}
      />

      {/* Main App Content Body */}
      <main className="flex-1 pb-20 sm:pb-24">
        {isAstrologerMode ? (
          <AstrologerDashboard
            currentAstrologer={ASTROLOGERS[0]}
            onAcceptIncomingCall={(clientName, type) => {
              if (type === 'video') {
                setActiveVideoAstro(ASTROLOGERS[0]);
              } else {
                setActiveChatAstro(ASTROLOGERS[0]);
              }
            }}
          />
        ) : (
          <>
            {activeTab === 'astrologers' && (
              <AstrologerCatalog
                onStartChat={(astro) => setActiveChatAstro(astro)}
                onStartVideo={(astro) => setActiveVideoAstro(astro)}
                openAdModal={() => setIsAdModalOpen(true)}
                openAdInspector={() => setIsAdInspectorOpen(true)}
                openWalletModal={() => setIsWalletModalOpen(true)}
                walletBalance={walletBalance}
                onSelectTab={(tab) => setActiveTab(tab)}
                onAskPanditPrompt={(prompt) => {
                  setPanditPrompt(prompt);
                  setActiveTab('ai-pandit');
                }}
              />
            )}

            {activeTab === 'ai-pandit' && (
              <AIPanditJi 
                userProfile={userProfile} 
                initialPrompt={panditPrompt}
                onClearInitialPrompt={() => setPanditPrompt(undefined)}
              />
            )}

            {activeTab === 'rashifal' && (
              <DailyRashifalView 
                onConsultAstrologer={() => setActiveTab('astrologers')} 
                userProfile={userProfile}
                onOpenSubscriptions={() => setActiveTab('subscriptions')}
              />
            )}

            {activeTab === 'kundali' && (
              <KundaliView
                userProfile={userProfile}
                onOpenSubscriptions={() => setActiveTab('subscriptions')}
              />
            )}

            {activeTab === 'subscriptions' && (
              <SubscriptionsView
                userProfile={userProfile}
                walletBalance={walletBalance}
                onSubscribe={handleSubscribeTier}
                openWalletModal={() => setIsWalletModalOpen(true)}
                onBuyReport={handleBuyReport}
                onBuyFestivalPack={handleBuyFestivalPack}
                onNavigateTab={(tab) => setActiveTab(tab as any)}
                openAdModal={() => setIsAdModalOpen(true)}
              />
            )}

            {activeTab === 'wallet' && (
              <WalletView
                walletBalance={walletBalance}
                transactions={transactions}
                openWalletModal={() => setIsWalletModalOpen(true)}
                openAdModal={() => setIsAdModalOpen(true)}
                openAdInspector={() => setIsAdInspectorOpen(true)}
              />
            )}

            {activeTab === 'profile' && (
              <UserProfileView
                userProfile={userProfile}
                onUpdateProfile={(updated) => setUserProfile(updated)}
                onNavigateToKundali={() => setActiveTab('kundali')}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Astrotalk Native Mobile Pattern) */}
      {!isAstrologerMode && (
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          walletBalance={walletBalance}
        />
      )}

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200/90 py-8 px-4 border-t border-amber-800/60 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-['Cinzel',serif] font-bold text-base text-amber-100">
              Jyotishi Live
            </span>
            <p className="text-amber-300/70 text-[11px] mt-0.5">
              India's Trusted Vedic Astrology Platform • Live Chat, Video Calls & Virtual Pandit Ji
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[11px] text-amber-300/80">
            <span>☀️ 100% Satvik Positive Remedies</span>
            <span>•</span>
            <span>🛡️ Zero Fear Guarantee</span>
            <span>•</span>
            <span>🔒 256-Bit Encrypted Consultations</span>
          </div>

          <div className="text-[10px] text-amber-400/60">
            © {new Date().getFullYear()} Jyotishi Live. All rights reserved. Sada Kalyan Ho.
          </div>
        </div>
      </footer>

      {/* In-App Wallet Recharge Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        walletBalance={walletBalance}
        onAddMoney={handleAddMoney}
        transactions={transactions}
        onWatchAdReward={() => setIsAdModalOpen(true)}
      />

      {/* Ad Reward Video Modal */}
      <AdRewardModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        onRewardClaimed={handleRewardClaimed}
      />

      {/* Google AdMob Interstitial Test Modal */}
      <GoogleInterstitialAdModal
        isOpen={isInterstitialOpen}
        onClose={() => setIsInterstitialOpen(false)}
        isPaidUser={userProfile.subscriptionPlan !== 'free' && userProfile.subscriptionPlan !== 'none'}
      />

      {/* Google Ads Inspector & Test Suite Modal */}
      <GoogleAdInspectorModal
        isOpen={isAdInspectorOpen}
        onClose={() => setIsAdInspectorOpen(false)}
        onTriggerRewarded={() => {
          setIsAdInspectorOpen(false);
          setIsAdModalOpen(true);
        }}
        onTriggerInterstitial={() => {
          setIsAdInspectorOpen(false);
          setIsInterstitialOpen(true);
        }}
      />

      {/* Live Chat Consultation Modal */}
      {activeChatAstro && (
        <ChatConsultationModal
          isOpen={!!activeChatAstro}
          onClose={() => setActiveChatAstro(null)}
          astrologer={activeChatAstro}
          userProfile={userProfile}
          walletBalance={walletBalance}
          onDeductMoney={handleDeductMoney}
          onCompleteSession={handleCompleteChatSession}
          openWalletModal={() => setIsWalletModalOpen(true)}
        />
      )}

      {/* Live Video Consultation Modal */}
      {activeVideoAstro && (
        <VideoConsultationModal
          isOpen={!!activeVideoAstro}
          onClose={() => setActiveVideoAstro(null)}
          astrologer={activeVideoAstro}
          userProfile={userProfile}
          walletBalance={walletBalance}
          onDeductMoney={handleDeductMoney}
          onCompleteSession={handleCompleteVideoSession}
          openWalletModal={() => setIsWalletModalOpen(true)}
        />
      )}

      {/* Post-Consultation Review Modal */}
      <ReviewModal
        isOpen={reviewData.isOpen}
        onClose={() => setReviewData((prev) => ({ ...prev, isOpen: false }))}
        astrologerName={reviewData.astroName}
        consultationType={reviewData.type}
        durationMinutes={reviewData.duration}
        amountDeducted={reviewData.amount}
        onSubmitReview={handleReviewSubmit}
      />

      {/* Notification Center & Push Reminders Drawer */}
      <NotificationDrawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        notifications={notifications}
        onMarkAllRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onRequestBrowserPush={handleRequestBrowserPush}
        hasBrowserPushEnabled={hasBrowserPush}
      />
    </div>
  );
}
