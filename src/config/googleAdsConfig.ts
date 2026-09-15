/**
 * Google AdMob / AdSense Configuration
 * 
 * User Provided Production IDs:
 * - App ID: ca-app-pub-7143877759857923~6498840568
 * - Banner Ad Unit ID: ca-app-pub-7143877759857923/2340586201
 * - Publisher ID: ca-pub-7143877759857923
 * - Ad Slot ID: 2340586201
 */

export interface GoogleAdUnitConfig {
  name: string;
  format: 'rewarded' | 'banner' | 'interstitial' | 'native' | 'app_open';
  androidId: string;
  iosId: string;
  description: string;
  active: boolean;
}

export const GOOGLE_ADS_CONFIG = {
  // User's Real Production Credentials
  production: {
    appId: 'ca-app-pub-7143877759857923~6498840568',
    publisherId: 'ca-pub-7143877759857923',
    bannerAdUnitId: 'ca-app-pub-7143877759857923/2340586201',
    bannerSlotId: '2340586201',
    rewardedAdUnitId: 'ca-app-pub-7143877759857923/5214161558',
    rewardedSlotId: '5214161558',
  },

  // Active App ID (User provided)
  appIdAndroid: 'ca-app-pub-7143877759857923~6498840568',
  appIdIos: 'ca-app-pub-7143877759857923~6498840568',
  publisherId: 'ca-pub-7143877759857923',

  // Banner Ad Unit (User provided)
  banner: {
    name: 'Google AdMob Banner Ad (बैनर विज्ञापन)',
    format: 'banner' as const,
    androidId: 'ca-app-pub-7143877759857923/2340586201',
    iosId: 'ca-app-pub-7143877759857923/2340586201',
    slotId: '2340586201',
    publisherId: 'ca-pub-7143877759857923',
    description: 'User provided adaptive banner ad displayed across high-visibility app views.',
    active: true,
  },

  // Rewarded Video Ad Unit (User provided)
  rewardedVideo: {
    name: 'Google AdMob Rewarded Video Ad (रिवॉर्डेड वीडियो)',
    format: 'rewarded' as const,
    androidId: 'ca-app-pub-7143877759857923/5214161558',
    iosId: 'ca-app-pub-7143877759857923/5214161558',
    slotId: '5214161558',
    publisherId: 'ca-pub-7143877759857923',
    description: 'Watches a video ad to earn Jyotishi Live wallet reward (₹25 coins).',
    active: true,
  },

  // Interstitial Ad Unit
  interstitial: {
    name: 'Interstitial Ad (इंटरस्टीशियल फुल-स्क्रीन)',
    format: 'interstitial' as const,
    androidId: 'ca-app-pub-3940256099942544/1033173712',
    iosId: 'ca-app-pub-3940256099942544/4411468910',
    description: 'Full-screen interstitial ad shown between view transitions.',
    active: true,
  },

  rewardedInterstitial: {
    name: 'Rewarded Interstitial Ad',
    format: 'rewarded' as const,
    androidId: 'ca-app-pub-3940256099942544/5354046379',
    iosId: 'ca-app-pub-3940256099942544/6978759866',
    description: 'Rewarded interstitial ad offering prompt before ad begins.',
    active: true,
  },

  nativeAdvanced: {
    name: 'Native Advanced Ad (नेटिव लिस्ट ऐड)',
    format: 'native' as const,
    androidId: 'ca-app-pub-3940256099942544/2247690483',
    iosId: 'ca-app-pub-3940256099942544/3986624511',
    description: 'Custom-styled native ad fitting organically into astrologer lists.',
    active: true,
  },

  appOpen: {
    name: 'App Open Ad (ऐप ओपन ऐड)',
    format: 'app_open' as const,
    androidId: 'ca-app-pub-3940256099942544/9257395921',
    iosId: 'ca-app-pub-3940256099942544/5604816542',
    description: 'Displayed on app foreground / splash launch.',
    active: true,
  },

  isTestMode: false,
  adNetwork: 'Google Mobile Ads SDK (AdMob & AdSense)',
};

// Backwards compatibility alias
export const GOOGLE_TEST_ADS_CONFIG = GOOGLE_ADS_CONFIG;

