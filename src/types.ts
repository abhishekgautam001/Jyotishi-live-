export type ConsultationLanguage = 'hindi' | 'hinglish';

export interface Astrologer {
  id: string;
  name: string;
  title: string; // e.g., 'Acharya', 'Dr.', 'Vidushi'
  avatar: string;
  experience: number; // in years
  skills: string[]; // e.g., ['Vedic', 'Tarot', 'Vastu', 'Kundali']
  languages: string[];
  rating: number;
  totalOrders: number;
  chatPrice: number; // ₹ per min
  videoPrice: number; // ₹ per min
  isOnline: boolean;
  statusText: string;
  bio: string;
  specialization: string;
  verified: boolean;
  featured?: boolean;
}

export type SubscriptionPlanId = 'free' | 'basic' | 'premium' | 'pro' | 'yearly' | 'none' | 'silver' | 'gold' | 'vip';

export interface UserProfile {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  rashi: string;
  gotra: string;
  phone: string;
  email: string;
  subscriptionPlan: SubscriptionPlanId;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
  category: 'recharge' | 'chat_consult' | 'video_consult' | 'ad_reward' | 'subscription' | 'report' | 'festival_pack';
}

export interface ConsultationSession {
  id: string;
  astrologerId: string;
  astrologerName: string;
  type: 'chat' | 'video';
  startedAt: string;
  durationSeconds: number;
  amountBilled: number;
  rating?: number;
  review?: string;
  notes?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'astrologer' | 'system' | 'ai';
  text: string;
  timestamp: string;
  isRemedy?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'session' | 'muhurat' | 'review' | 'wallet' | 'promo';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface SubscriptionTier {
  id: 'free' | 'basic' | 'premium' | 'pro' | 'yearly';
  name: string;
  hindiName: string;
  subtitle: string;
  price: number;
  period: string;
  whatYouGet: string; // क्या मिलेगा
  badge?: string;
  popular?: boolean;
  features: string[];
  color: string;
}

export interface AstrologyReport {
  id: string;
  title: string;
  hindiTitle: string;
  subtitle: string;
  price: number;
  category: 'kundali' | 'marriage' | 'career';
  pages: string;
  deliveryTime: string;
  description: string;
  highlights: string[];
  includedInPlans: ('premium' | 'pro' | 'yearly')[];
}

export interface FestivalPredictionPack {
  id: string;
  title: string;
  festival: string;
  price: number;
  originalPrice: number;
  badge: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface KundaliData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  gender: string;
  lagna: string;
  rashi: string;
  nakshatra: string;
  luckyNumber: number;
  luckyColor: string;
  luckyDay: string;
  luckyGemstone: string;
  favorableDeity: string;
  planets: {
    name: string;
    house: string;
    dignity: string;
    status: string;
    influence: string;
  }[];
  remedies: {
    title: string;
    desc: string;
  }[];
  aiAnalysis: string;
}
