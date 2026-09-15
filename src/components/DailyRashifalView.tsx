import React, { useState } from 'react';
import { 
  Sun, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  Flame, 
  Calendar, 
  Compass, 
  Heart, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { Astrologer, UserProfile } from '../types';
import { GoogleBannerAd } from './GoogleBannerAd';

interface DailyRashifalViewProps {
  onConsultAstrologer: () => void;
  userProfile?: UserProfile;
  onOpenSubscriptions?: () => void;
}

interface RashiInfo {
  id: string;
  nameHindi: string;
  nameEng: string;
  symbol: string;
  element: string;
  ruler: string;
  prediction: string;
  luckyNumber: number;
  luckyColor: string;
  shubhMuhurat: string;
  saralUpaay: string;
}

const RASHIS: RashiInfo[] = [
  {
    id: 'mesh',
    nameHindi: 'मेष',
    nameEng: 'Aries',
    symbol: '♈',
    element: 'अग्नि (Fire)',
    ruler: 'मंगल (Mars)',
    prediction: 'आज आपका आत्मविश्वास चरम पर रहेगा। कार्यक्षेत्र में वरिष्ठों का सहयोग मिलेगा। मन में नई योजनाओं को लेकर उत्साह रहेगा। आर्थिक दृष्टि से दिन अत्यंत लाभकारी है।',
    luckyNumber: 9,
    luckyColor: 'केसरिया (Saffron/Red)',
    shubhMuhurat: 'प्रातः 09:15 AM - 11:00 AM',
    saralUpaay: 'प्रातःकाल तांबे के पात्र से भगवान सूर्य को जल अर्पित करें और "ॐ घृणि सूर्याय नमः" का 11 बार स्मरण करें।'
  },
  {
    id: 'vrishabh',
    nameHindi: 'वृषभ',
    nameEng: 'Taurus',
    symbol: '♉',
    element: 'पृथ्वी (Earth)',
    ruler: 'शुक्र (Venus)',
    prediction: 'पारिवारिक वातावरण में मिठास और सामंजस्य बना रहेगा। कला और रचनात्मक कार्यों में सफलता के योग हैं। मन शांत और एकाग्र रहेगा।',
    luckyNumber: 6,
    luckyColor: 'श्वेत / हल्का गुलाबी (White/Pink)',
    shubhMuhurat: 'दोपहर 12:30 PM - 02:00 PM',
    saralUpaay: 'घर में देसी घी का दीपक जलाएं और गौ माता को ताजी रोटी या हरा चारा खिलाएं।'
  },
  {
    id: 'mithun',
    nameHindi: 'मिथुन',
    nameEng: 'Gemini',
    symbol: '♊',
    element: 'वायु (Air)',
    ruler: 'बुध (Mercury)',
    prediction: 'संवाद और वाणी की मधुरता से बिगड़े काम बनेंगे। नए संपर्कों से व्यापारिक प्रगति होगी। विद्यार्थियों के लिए अध्ययन में सफलता के शुभ संकेत हैं।',
    luckyNumber: 5,
    luckyColor: 'हरा (Light Green)',
    shubhMuhurat: 'सायंकाल 04:00 PM - 05:30 PM',
    saralUpaay: 'तुलसी के पौधे में जल सींचें और पक्षियों को बाजरा या अनाज के दाने डालें।'
  },
  {
    id: 'kark',
    nameHindi: 'कर्क',
    nameEng: 'Cancer',
    symbol: '♋',
    element: 'जल (Water)',
    ruler: 'चंद्रमा (Moon)',
    prediction: 'माता-पिता का आशीर्वाद आपके सभी कार्यों को सिद्ध करेगा। आंतरिक शांति का अनुभव होगा। आध्यात्मिक चिंतन से मन प्रफुल्लित रहेगा।',
    luckyNumber: 2,
    luckyColor: 'मोतिया / सिल्वर (Pearl White)',
    shubhMuhurat: 'प्रातः 08:00 AM - 09:30 AM',
    saralUpaay: 'शिवलिंग पर कच्चा दूध व जल अर्पित करें और 5 मिनट शांत मन से ध्यान लगाएं।'
  },
  {
    id: 'simha',
    nameHindi: 'सिंह',
    nameEng: 'Leo',
    symbol: '♌',
    element: 'अग्नि (Fire)',
    ruler: 'सूर्य (Sun)',
    prediction: 'तेज और सम्मान में वृद्धि होगी। प्रशासनिक या निर्णय लेने वाले कार्यों में पूर्ण विजय प्राप्त होगी। आपके नेतृत्व की सर्वत्र सराहना होगी।',
    luckyNumber: 1,
    luckyColor: 'स्वर्ण / पीला (Golden Yellow)',
    shubhMuhurat: 'प्रातः 07:00 AM - 08:30 AM',
    saralUpaay: 'आदित्य हृदय स्तोत्र का पाठ करें या गायत्री मंत्र का 21 बार जप करें।'
  },
  {
    id: 'kanya',
    nameHindi: 'कन्या',
    nameEng: 'Virgo',
    symbol: '♍',
    element: 'पृथ्वी (Earth)',
    ruler: 'बुध (Mercury)',
    prediction: 'योजनाबद्ध तरीके से किया गया हर कार्य सफलता दिलाएगा। स्वास्थ्य उत्तम रहेगा। बुद्धिबल से जटिल समस्याओं का सहज समाधान प्राप्त होगा।',
    luckyNumber: 5,
    luckyColor: 'तोतिया हरा (Emerald Green)',
    shubhMuhurat: 'अपराह्न 02:15 PM - 03:45 PM',
    saralUpaay: 'मूंग की दाल का दान करें और किसी भी शुभ कार्य से पहले गणेश जी का स्मरण करें।'
  },
  {
    id: 'tula',
    nameHindi: 'तुला',
    nameEng: 'Libra',
    symbol: '♎',
    element: 'वायु (Air)',
    ruler: 'शुक्र (Venus)',
    prediction: 'जीवनसाथी के साथ प्रेम और सौहार्द बढ़ेगा। व्यापार में नए लाभदायक समझौते संभव हैं। दिन आनंदमय और संतोषप्रद बीतेगा।',
    luckyNumber: 7,
    luckyColor: 'आसमानी / क्रीम (Sky Blue/Cream)',
    shubhMuhurat: 'सायंकाल 05:00 PM - 06:30 PM',
    saralUpaay: 'सुगंधित धूप अथवा अगरबत्ती पूजा स्थल पर प्रज्वलित करें और जरूरतमंद कन्या को मीठा प्रसाद दें।'
  },
  {
    id: 'vrishchik',
    nameHindi: 'वृश्चिक',
    nameEng: 'Scorpio',
    symbol: '♏',
    element: 'जल (Water)',
    ruler: 'मंगल (Mars)',
    prediction: 'साहस और पराक्रम से विरोधी शांत रहेंगे। रुके हुए धन की प्राप्ति के प्रबल योग हैं। ध्यान और योग से ऊर्जा में अद्भुत वृद्धि होगी।',
    luckyNumber: 8,
    luckyColor: 'गहरा लाल / मैरून (Crimson Red)',
    shubhMuhurat: 'प्रातः 10:30 AM - 12:00 PM',
    saralUpaay: 'हनुमान चालीसा का श्रद्धापूर्वक पाठ करें और माथे पर चंदन का तिलक लगाएं।'
  },
  {
    id: 'dhanu',
    nameHindi: 'धनु',
    nameEng: 'Sagittarius',
    symbol: '♐',
    element: 'अग्नि (Fire)',
    ruler: 'बृहस्पति (Jupiter)',
    prediction: 'गुरुजनों और संतों की कृपा प्राप्त होगी। ज्ञान-विज्ञान और उच्च शिक्षा के क्षेत्र में विशेष उन्नति होगी। यात्राएं मंगलकारी रहेंगी।',
    luckyNumber: 3,
    luckyColor: 'पीला / केसरिया (Bright Yellow)',
    shubhMuhurat: 'प्रातः 09:00 AM - 10:30 AM',
    saralUpaay: 'केले के वृक्ष में जल अर्पित करें और मस्तक पर हल्दी या केसर का तिलक लगाएं।'
  },
  {
    id: 'makar',
    nameHindi: 'मकर',
    nameEng: 'Capricorn',
    symbol: '♑',
    element: 'पृथ्वी (Earth)',
    ruler: 'शनि (Saturn)',
    prediction: 'परिश्रम का उत्तम फल मिलेगा। दायित्वों की पूर्ति से मन प्रसन्न रहेगा। स्थायी संपत्ति या वाहन सुख में वृद्धि के संकेत हैं।',
    luckyNumber: 4,
    luckyColor: 'नीला / आसमानी (Royal Blue)',
    shubhMuhurat: 'दोपहर 01:00 PM - 02:30 PM',
    saralUpaay: 'पीपल के वृक्ष के समीप सरसों के तेल का दीपक प्रज्वलित करें और किसी वृद्ध जन की सेवा करें।'
  },
  {
    id: 'kumbh',
    nameHindi: 'कुम्भ',
    nameEng: 'Aquarius',
    symbol: '♒',
    element: 'वायु (Air)',
    ruler: 'शनि (Saturn)',
    prediction: 'सामाजिक प्रतिष्ठा में वृद्धि होगी। मित्रों का भरपूर सहयोग प्राप्त होगा। जनहित और परोपकार के कार्यों में रुचि बढ़ेगी।',
    luckyNumber: 11,
    luckyColor: 'गहरा नीला (Navy Blue)',
    shubhMuhurat: 'सायंकाल 03:30 PM - 05:00 PM',
    saralUpaay: 'काली उड़द या काले तिल का दान करें और जल में तिल डालकर स्नान करें।'
  },
  {
    id: 'meen',
    nameHindi: 'मीन',
    nameEng: 'Pisces',
    symbol: '♓',
    element: 'जल (Water)',
    ruler: 'बृहस्पति (Jupiter)',
    prediction: 'अंतःप्रेरणा बहुत तीव्र और सकारात्मक रहेगी। धार्मिक अनुष्ठानों में सहभागिता होगी। परिवार में किसी मांगलिक उत्सव की योजना बनेगी।',
    luckyNumber: 3,
    luckyColor: 'हल्दी पीला (Golden Ochre)',
    shubhMuhurat: 'प्रातः 08:30 AM - 10:00 AM',
    saralUpaay: 'विष्णु सहस्रनाम या "ॐ नमो भगवते वासुदेवाय" का 108 बार स्मरण करें।'
  }
];

export const DailyRashifalView: React.FC<DailyRashifalViewProps> = ({ 
  onConsultAstrologer,
  userProfile,
  onOpenSubscriptions,
}) => {
  const [selectedRashiId, setSelectedRashiId] = useState<string>('mesh');

  const selectedRashi = RASHIS.find((r) => r.id === selectedRashiId) || RASHIS[0];

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-5 space-y-4">
      {/* Top Auspicious Panchang Ribbon */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white p-4 sm:p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-full text-xs font-semibold text-amber-100">
              <Sun className="w-3.5 h-3.5 text-amber-200" />
              <span>आज का वैदिक पंचांग एवं राशिफल</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] mt-1.5 text-white">
              दैनिक राशिफल (Aaj Ka Rashifal)
            </h1>
            <p className="text-xs text-amber-100/90 mt-0.5">
              100% सकारात्मक मार्गदर्शन • सरल सात्विक उपाय • भयमुक्त वैदिक समाधान
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-xs px-3 py-2 rounded-xl text-xs text-amber-100 border border-white/20 shrink-0">
            <p className="font-semibold text-amber-200">☀️ आज का शुभ मुहूर्त</p>
            <p className="text-[11px] text-white/90">ब्रह्म मुहूर्त: 04:28 AM - 05:16 AM</p>
            <p className="text-[11px] text-white/90">अमृत काल: 09:12 AM - 10:48 AM</p>
          </div>
        </div>
      </div>

      {/* 12 Rashi Selection Circles/Pills (Native Mobile Astrotalk Style) */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-3 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            अपनी राशि चुनें (Select Your Rashi)
          </span>
          <span className="text-[11px] text-amber-700 font-medium">12 राशियां उपलब्ध</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {RASHIS.map((rashi) => {
            const isSelected = rashi.id === selectedRashiId;
            return (
              <button
                key={rashi.id}
                onClick={() => setSelectedRashiId(rashi.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500 to-orange-600 text-white border-orange-600 shadow-md scale-102'
                    : 'bg-amber-50/50 hover:bg-amber-100/70 border-amber-200/70 text-slate-800'
                }`}
              >
                <span className="text-2xl leading-none mb-0.5">{rashi.symbol}</span>
                <span className="text-xs font-bold">{rashi.nameHindi}</span>
                <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                  {rashi.nameEng}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Card for Selected Rashi */}
      <div className="bg-white rounded-2xl border border-amber-200/90 p-4 sm:p-6 shadow-sm space-y-4">
        {/* Rashi Header Row */}
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white text-2xl shadow-sm">
              {selectedRashi.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Cinzel',serif]">
                  {selectedRashi.nameHindi} राशि ({selectedRashi.nameEng})
                </h2>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300/60">
                  {selectedRashi.element}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                स्वामी ग्रह: <strong className="text-amber-900">{selectedRashi.ruler}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onConsultAstrologer}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ज्योतिषी से पूछें</span>
          </button>
        </div>

        {/* Prediction Section */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>आज का सकारात्मक भविष्यफल (Today's Prediction)</span>
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/40 p-3.5 rounded-xl border border-amber-100">
            {selectedRashi.prediction}
          </p>
        </div>

        {/* Lucky Matrix Chips */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-center">
            <span className="text-[10px] text-slate-500 block">शुभ अंक (Lucky No.)</span>
            <span className="text-lg font-bold text-amber-900">{selectedRashi.luckyNumber}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-center">
            <span className="text-[10px] text-slate-500 block">शुभ रंग (Color)</span>
            <span className="text-xs font-bold text-amber-900 truncate block mt-1">
              {selectedRashi.luckyColor}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-center">
            <span className="text-[10px] text-slate-500 block">शुभ समय (Muhurat)</span>
            <span className="text-[11px] font-bold text-amber-900 block mt-1">
              {selectedRashi.shubhMuhurat}
            </span>
          </div>
        </div>

        {/* Aaj Ka Saral Satvik Upaay */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-100/70 via-orange-100/50 to-rose-100/60 border border-amber-300/80 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
            <Flame className="w-4 h-4 text-orange-600" />
            <span>आज का सरल सात्विक उपाय (Positive Remedy)</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
            {selectedRashi.saralUpaay}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>सकारात्मक ऊर्जा, मानसिक शांति एवं आत्मबल में वृद्धि होगी।</span>
          </div>
        </div>

        {/* Detailed Horoscope & Extra Predictions (Unlocked for Basic, Premium, Pro, Yearly) */}
        {userProfile && userProfile.subscriptionPlan !== 'free' && userProfile.subscriptionPlan !== 'none' ? (
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 font-['Cinzel',serif] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>विस्तृत ग्रह-गोचर व अतिरिक्त भविष्यफल (Basic+ विशेषाधिकार)</span>
              </span>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                अनलॉक
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <strong className="text-amber-950 block mb-1">करियर व व्यापार गोचर:</strong>
                दशमेश की शुभ दृष्टि आपके कार्यक्षेत्र में नवीन अवसरों के द्वार खोल रही है। सहकर्मियों से सहयोग प्राप्त होगा।
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <strong className="text-amber-950 block mb-1">पारिवारिक व प्रेम जीवन:</strong>
                शुक्र के प्रभाव से दांपत्य में मधुरता एवं पारिवारिक सामंजस्य बढ़ेगा। शाम का समय सुखद रहेगा।
              </div>
            </div>
            <p className="text-[11px] text-emerald-800 font-semibold">
              ✓ विज्ञापन-मुक्त अनुभव सक्रिय (Zero automatic ads active)
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-slate-700">
                <strong>विस्तृत राशिफल व अतिरिक्त भविष्यफल</strong> केवल ₹79/माह के बेसिक प्लान में अनलॉक करें।
              </span>
            </div>
            {onOpenSubscriptions && (
              <button
                onClick={onOpenSubscriptions}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs"
              >
                ₹79 में अनलॉक करें
              </button>
            )}
          </div>
        )}

        {/* Google AdMob Banner Ad (Automatically hidden for paid subscribers) */}
        <GoogleBannerAd 
          variant="compact" 
          label="दैनिक राशिफल विशेष" 
          isPaidUser={userProfile ? userProfile.subscriptionPlan !== 'free' && userProfile.subscriptionPlan !== 'none' : undefined}
          onUpgradeClick={onOpenSubscriptions}
        />

        {/* Mobile Consult CTA */}
        <div className="pt-2">
          <button
            onClick={onConsultAstrologer}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-amber-100" />
            <span>{selectedRashi.nameHindi} राशि के विशेष ज्योतिषी से परामर्श लें →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
