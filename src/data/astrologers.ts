import { Astrologer, SubscriptionTier, UserProfile, WalletTransaction, AppNotification, AstrologyReport, FestivalPredictionPack } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Aarav Sharma',
  gender: 'Male',
  dob: '1996-08-15',
  tob: '07:45 AM',
  pob: 'Varanasi, Uttar Pradesh',
  rashi: 'Simha (Leo)',
  gotra: 'Kashyap',
  phone: '+91 98765 43210',
  email: 'aarav.sharma@example.com',
  subscriptionPlan: 'free',
};

export const ASTROLOGERS: Astrologer[] = [
  {
    id: 'astro-1',
    name: 'Acharya Raman Shastri',
    title: 'Param Pujya Jyotishacharya',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/India_-_Varanasi_priest_-_2593.jpg/500px-India_-_Varanasi_priest_-_2593.jpg',
    experience: 19,
    skills: ['Vedic Astrology', 'Kundali Dosh Nivaran', 'Career & Business', 'Muhurat'],
    languages: ['हिन्दी (Hindi)', 'Hinglish (हिंग्लिश)', 'English', 'Sanskrit'],
    rating: 4.98,
    totalOrders: 18450,
    chatPrice: 20,
    videoPrice: 35,
    isOnline: true,
    statusText: 'Online • Available for Video & Chat',
    bio: 'Banaras Hindu University (BHU) gold medalist in Phalita Jyotish with 19+ years experience guiding thousands toward peaceful solutions.',
    specialization: 'Career Growth, Positive Dasha Solutions & Surya Upasana',
    verified: true,
    featured: true,
  },
  {
    id: 'astro-2',
    name: 'Dr. Radhika Sharma',
    title: 'Ph.D. Vedic Sciences',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    experience: 14,
    skills: ['Relationship & Marriage', 'Kundali Milan', 'Prashna Kundali', 'Gemology'],
    languages: ['हिन्दी (Hindi)', 'Hinglish (हिंग्लिश)', 'English', 'Punjabi'],
    rating: 4.95,
    totalOrders: 14200,
    chatPrice: 25,
    videoPrice: 40,
    isOnline: true,
    statusText: 'Online • Ready for Live Consult',
    bio: 'Specialist in harmonious relationship remedies, Kundali matching, and mind calming meditation techniques.',
    specialization: 'Love, Marriage Harmony & Emotional Peace',
    verified: true,
    featured: true,
  },
  {
    id: 'astro-3',
    name: 'Pandit Ji Brijesh Trivedi',
    title: 'Jyotish Ratna',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/A_portrait_of_an_Indian_Man_in_Traditional_Kurta_Pyjama.jpg/500px-A_portrait_of_an_Indian_Man_in_Traditional_Kurta_Pyjama.jpg',
    experience: 22,
    skills: ['Vastu Shastra', 'Vedic Astrology', 'Graha Shanti', 'Spiritual Guidance'],
    languages: ['हिन्दी (Hindi)', 'Hinglish (हिंग्लिश)', 'Gujarati', 'English'],
    rating: 4.99,
    totalOrders: 26800,
    chatPrice: 30,
    videoPrice: 50,
    isOnline: true,
    statusText: 'Online • High Demand',
    bio: 'Renowned expert in Vastu and positive planetary remedies. Believes in uplifting mankind through satvik living and prayers.',
    specialization: 'Vastu Positivity, Wealth Flow & Family Peace',
    verified: true,
    featured: true,
  },
  {
    id: 'astro-4',
    name: 'Vidushi Ananya Sen',
    title: 'Tarot Master & Numerologist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    experience: 9,
    skills: ['Tarot Reading', 'Numerology', 'Chakra Balancing', 'Life Coaching'],
    languages: ['हिन्दी (Hindi)', 'Hinglish (हिंग्लिश)', 'English', 'Bengali'],
    rating: 4.91,
    totalOrders: 9800,
    chatPrice: 15,
    videoPrice: 25,
    isOnline: true,
    statusText: 'Online • Instant Chat',
    bio: 'Combines sacred Angel cards, Tarot, and ancient Indian numerology to provide inspiring clarity and positive energy.',
    specialization: 'Life Choices, Intuitive Guidance & Positive Manifestation',
    verified: true,
  },
  {
    id: 'astro-5',
    name: 'Astro Suresh Kumar',
    title: 'Nadi & KP Astrologer',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=80',
    experience: 16,
    skills: ['Nadi Astrology', 'KP System', 'Finance & Stock Guidance', 'Health & Vitality'],
    languages: ['हिन्दी (Hindi)', 'Hinglish (हिंग्लिश)', 'English', 'Tamil'],
    rating: 4.88,
    totalOrders: 11300,
    chatPrice: 18,
    videoPrice: 30,
    isOnline: false,
    statusText: 'Next available at 02:00 PM',
    bio: 'Precision time-tested KP and Nadi astrology expert. Specializes in finding auspicious timing for startups and investments.',
    specialization: 'Business Timing, Financial Luck & Health Remedies',
    verified: true,
  },
  {
    id: 'astro-6',
    name: 'Dr. Meenakshi Joshi',
    title: 'Astro-Psychologist & Palmistry Expert',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    experience: 12,
    skills: ['Palmistry', 'Face Reading', 'Mind Wellness', 'Gemstone Therapy'],
    languages: ['हिन्दी (Hindi)', 'Hinglish (हिंग्लिश)', 'English', 'Marathi'],
    rating: 4.94,
    totalOrders: 8900,
    chatPrice: 22,
    videoPrice: 38,
    isOnline: true,
    statusText: 'Online • In High Demand',
    bio: 'Blends ancient Samudrika Shastra (Palmistry) with compassionate psychological listening for peaceful remedies.',
    specialization: 'Stress Relief, Life Direction & Positive Affirmations',
    verified: true,
  }
];

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    hindiName: 'फ्री (Free)',
    subtitle: 'Daily horoscope, basic kundli',
    price: 0,
    period: 'lifetime',
    whatYouGet: 'Daily horoscope, basic kundli',
    badge: 'फ्री (₹0)',
    color: 'from-slate-600 to-slate-800',
    features: [
      'दैनिक राशिफल (Daily horoscope) - दिन की शुरुआत',
      'मूल जन्म कुंडली (Basic Kundli chart)',
      '100% सात्विक व भयमुक्त सरल मार्गदर्शन',
      '📢 Free users के लिए प्रायोजित विज्ञापन (Ad-Supported)',
      'वर्चुअल पंडित जी से सामान्य प्रश्नोत्तर'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    hindiName: 'बेसिक (Basic)',
    subtitle: 'Detailed horoscope + extra predictions',
    price: 79,
    period: 'month',
    whatYouGet: 'Detailed horoscope + extra predictions',
    badge: '₹79/माह',
    color: 'from-amber-600 to-amber-700',
    features: [
      'Detailed horoscope (विस्तृत दैनिक व साप्ताहिक राशिफल)',
      'Extra predictions (ग्रह-गोचर अतिरिक्त भविष्यवाणियां)',
      '🚫 कोई ऑटोमैटिक विज्ञापन नहीं (Zero Automatic Banner/Popup Ads)',
      'दैनिक शुभ मुहूर्त व सूर्य अर्घ्य टाइमर अलर्ट',
      'इच्छा होने पर वॉलेट बोनस के लिए केवल रिवॉर्ड ऐड्स देखने की सुविधा'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    hindiName: 'प्रीमियम (Premium)',
    subtitle: 'Detailed kundli + compatibility + AI astrology',
    price: 199,
    period: 'month',
    whatYouGet: 'Detailed kundli + compatibility + AI astrology',
    badge: 'सर्वाधिक लोकप्रिय (₹199)',
    popular: true,
    color: 'from-amber-500 to-rose-600',
    features: [
      'Detailed kundli (विस्तृत 12 भाव कुंडली व ग्रह स्थिति)',
      'Compatibility (कुंडली गुण मिलान 36 गुण एवं मांगलिक परीक्षण)',
      'AI astrology (24x7 अनलिमिटेड वर्चुअल पंडित जी व सात्विक उपाय)',
      '🚫 100% नो ऑटोमैटिक ऐड्स (Zero Automatic Ads)',
      'ग्रह बल (Shadbala) व महादशा टाइमलाइन रिपोर्ट',
      'लाइव ज्योतिषी परामर्श पर 10% विशेष छूट'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    hindiName: 'प्रो (Pro)',
    subtitle: 'सभी premium features + priority features',
    price: 499,
    period: 'month',
    whatYouGet: 'सभी premium features + priority features',
    badge: 'VIP प्रायोरिटी (₹499)',
    color: 'from-purple-600 via-rose-600 to-amber-600',
    features: [
      'सभी Premium फीचर्स संपूर्ण रूप से शामिल',
      'Priority features (प्राथमिकता कतार - बिना इंतज़ार तुरंत ज्योतिषी चैट/कॉल)',
      'विस्तृत विवाह, करियर व धन रिपोर्ट (Free PDF Instant Access)',
      '₹100 का मुफ़्त परामर्श वॉलेट वाउचर हर महीने',
      '🚫 ऐप में कोई भी अनचाहा या ऑटोमैटिक ऐड नहीं',
      'पर्सनल वैदिक ज्योतिषी मार्गदर्शन व समाधान'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly',
    hindiName: 'वार्षिक (Yearly)',
    subtitle: 'Premium features पूरे साल',
    price: 1699,
    period: 'year',
    whatYouGet: 'Premium features पूरे साल',
    badge: 'सर्वश्रेष्ठ बचत (₹1,699/वर्ष)',
    color: 'from-amber-500 via-orange-500 to-emerald-700',
    features: [
      'Premium features पूरे साल (365 दिन असीमित सुविधा)',
      '40+ पृष्ठों की संपूर्ण वर्षफल एवं गोचर (Annual Transit) रिपोर्ट',
      '2 निःशुल्क लाइव वीडियो/ऑडियो परामर्श सत्र (मूल्य ₹300+)',
      '🚫 पूरे 1 वर्ष तक 100% शून्य ऑटोमैटिक विज्ञापन',
      'परिवार के 4 सदस्यों की कुंडली प्रोफाइल व मिलान',
      'समस्त त्यौहार व विशेष भविष्यफल पैक्स (Festival Packs) पूर्णतः मुफ़्त'
    ]
  }
];

export const ASTROLOGY_REPORTS: AstrologyReport[] = [
  {
    id: 'rep-kundali-deep',
    title: 'Comprehensive Mahadasha & Life Kundli Report',
    hindiTitle: 'विस्तृत जीवन व महादशा कुंडली रिपोर्ट',
    subtitle: 'Complete 25-page horoscope analysis with 10-year Dasha timeline',
    price: 149,
    category: 'kundali',
    pages: '25+ Pages',
    deliveryTime: 'Instant Digital Access',
    description: 'A deep-dive astrological assessment calculating Lagna, Navamsha (D9), planetary yogas (Raj Yoga, Gaj Kesari), and personalized satvik remedies.',
    highlights: [
      '12 Houses detailed assessment',
      'Dasha timeline for next 10 years',
      'Gemstone, Rudraksha & color remedies',
      'Zero fear: 100% uplifting Vedic insights'
    ],
    includedInPlans: ['pro', 'yearly']
  },
  {
    id: 'rep-marriage-compatibility',
    title: 'Kundli Milan & Marriage Compatibility Report',
    hindiTitle: 'कुंडली गुण मिलान एवं वैवाहिक अनुकूलता रिपोर्ट',
    subtitle: 'Ashtakoot 36 Guna Milan, Manglik assessment & emotional harmony',
    price: 199,
    category: 'marriage',
    pages: '18+ Pages',
    deliveryTime: 'Instant Digital Access',
    description: 'Scientific Ashtakoot 36-guna calculation with Nadi, Bhakoot, and Gana matching. Includes clear Vedic solutions for Manglik considerations.',
    highlights: [
      'Detailed 36 Guna breakdown (Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, Nadi)',
      'Manglik Dosha analysis with constructive remedies',
      'Mental, financial & longevity compatibility score',
      'Auspicious Vivah Muhurat recommendations'
    ],
    includedInPlans: ['premium', 'pro', 'yearly']
  },
  {
    id: 'rep-career-wealth',
    title: 'Career, Business & Wealth Forecast Report',
    hindiTitle: 'करियर, व्यापार एवं धन समृद्धि रिपोर्ट',
    subtitle: '10th House career trajectory, favorable business fields & wealth timing',
    price: 149,
    category: 'career',
    pages: '20+ Pages',
    deliveryTime: 'Instant Digital Access',
    description: 'Focuses on 2nd (Dhan), 10th (Karma), and 11th (Labh) houses to identify best investment cycles, job switch timings, and business partnerships.',
    highlights: [
      'Best career streams based on planetary dignity',
      'Favorable promotion & job change windows',
      'Financial risk mitigation satvik remedies',
      'Lakshmi-Kuber Stotra & Surya Arghya regimen'
    ],
    includedInPlans: ['pro', 'yearly']
  }
];

export const FESTIVAL_PACKS: FestivalPredictionPack[] = [
  {
    id: 'fest-diwali',
    title: 'Diwali Mahalakshmi & Dhan Kuber Wealth Pack',
    festival: 'दीपावली & धनतेरस विशेष',
    price: 99,
    originalPrice: 249,
    badge: 'सीमित ऑफर',
    description: 'Complete auspicious muhurat guide for Chopda Pujan, Lakshmi-Ganesh Sthapana, and year-long prosperity remedies tailored to your Rashi.',
    highlights: [
      'Shubh Muhurat timings for your exact city',
      'Rashi-wise Lakshmi Puja offerings & color guide',
      'Kuber Yantra & Dhan Prapti satvik mantras',
      '1 Year Financial Gochar Outlook'
    ],
    icon: '🪔'
  },
  {
    id: 'fest-navratri',
    title: 'Navratri 9 Graha Shanti & Shakti Blessings Pack',
    festival: 'नवरात्रि विशेष',
    price: 99,
    originalPrice: 199,
    badge: 'ग्रह शांति',
    description: '9 days planetary balancing ritual guide, daily Devi form remedies, and shield against negative transits.',
    highlights: [
      '9 Days daily color, bhog and mantra regimen',
      'Rahu-Ketu and Shani balance techniques',
      'Home energy purification instructions',
      'Daily morning affirmation audio guide'
    ],
    icon: '🌺'
  },
  {
    id: 'fest-shani-transit',
    title: 'Shani Sade Sati & Rahu-Ketu 2026 Transit Pack',
    festival: 'ग्रह-गोचर 2026 विशेष',
    price: 149,
    originalPrice: 399,
    badge: 'सर्वाधिक जरूरी',
    description: 'Detailed assessment of Saturn, Jupiter, and Rahu-Ketu transits for the upcoming cycle with zero-fear, pure satvik remedies.',
    highlights: [
      'Sade Sati phase check (Charan 1, 2, or 3)',
      'Career & health effects with easy remedies',
      'Hanuman Chalisa & Peepal seva rituals',
      'Quarter-by-quarter transit roadmap'
    ],
    icon: '🪐'
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TXN-9021',
    type: 'credit',
    amount: 150,
    title: 'Welcome Joining Bonus',
    description: 'Special free credit to consult with verified astrologers',
    timestamp: 'Just now',
    status: 'success',
    category: 'recharge',
  },
  {
    id: 'TXN-8842',
    type: 'credit',
    amount: 25,
    title: 'Daily Auspicious Ad Reward',
    description: 'Watched sponsored sacred temple documentary',
    timestamp: 'Today, 08:30 AM',
    status: 'success',
    category: 'ad_reward',
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: '☀️ Pratahkaal Surya Arghya Muhurat',
    message: 'Today auspicious Surya Puja time is 06:15 AM - 07:30 AM. Arpit water with copper vessel for confidence and vital energy.',
    type: 'muhurat',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 'notif-2',
    title: '🕉️ वर्चुअल पंडित जी (Virtual Pandit Ji)',
    message: 'आज के दिन, मानसिक शांति या सरल सात्विक उपायों के लिए कभी भी परामर्श लें।',
    type: 'promo',
    timestamp: '3 hours ago',
    read: false,
  },
  {
    id: 'notif-3',
    title: '⭐ Please Rate Your Last Session',
    message: 'How was your consultation with Acharya Raman Shastri? Leave a review to help fellow seekers.',
    type: 'review',
    timestamp: 'Yesterday',
    read: true,
  }
];

export const SPONSORED_ADS = [
  {
    id: 'ad-1',
    title: 'Pure Hammered Copper Surya Arghya Lota',
    sponsor: 'Sanatan Shilp',
    description: 'Traditional heavy copper kalash crafted with Gayatri Mantra engraving for daily morning Surya Puja.',
    cta: 'Explore Sacred Goods',
    tag: 'Sanatan Store',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'ad-2',
    title: 'Ganga Jal & Natural Dhoop Battis',
    sponsor: 'Haridwar Teerth Sansthan',
    description: 'Pure Haridwar Gangajal & cow dung dhoop for daily auspicious home purification and puja.',
    cta: 'Learn More',
    tag: 'Sacred Essentials',
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c09b8e8?w=300&auto=format&fit=crop&q=80'
  }
];
