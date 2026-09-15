import React from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  Volume2, 
  Clock, 
  Sun, 
  Printer 
} from 'lucide-react';
import { FestivalPredictionPack, UserProfile } from '../types';

interface FestivalPackModalProps {
  isOpen: boolean;
  onClose: () => void;
  pack: FestivalPredictionPack | null;
  userProfile: UserProfile;
}

export const FestivalPackModal: React.FC<FestivalPackModalProps> = ({
  isOpen,
  onClose,
  pack,
  userProfile,
}) => {
  if (!isOpen || !pack) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-white/15 rounded-xl">{pack.icon}</span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-400/20 px-2 py-0.5 rounded text-amber-200">
                {pack.festival}
              </span>
              <h3 className="font-semibold text-base sm:text-lg font-['Cinzel',serif]">
                {pack.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 text-slate-800 text-xs sm:text-sm">
          {/* User Native Greeting */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div>
              यजमान: <strong>{userProfile.name}</strong> • राशि: <strong>{userProfile.rashi}</strong>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              सक्रिय पैक (Active)
            </span>
          </div>

          {/* Core Insights according to Pack */}
          {pack.id === 'fest-diwali' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-50 border border-amber-300">
                <h4 className="font-bold text-amber-950 font-['Cinzel',serif] text-sm flex items-center gap-1.5 mb-1.5">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>महालक्ष्मी पूजन व धनतेरस सर्वश्रेष्ठ शुभ मुहूर्त</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900 mt-2">
                  <div className="p-2 bg-white/80 rounded border border-amber-200">
                    <strong>प्रदोष काल मुहूर्त:</strong> सायं 06:18 से 08:14 बजे तक (स्थिर लग्न वृषभ)
                  </div>
                  <div className="p-2 bg-white/80 rounded border border-amber-200">
                    <strong>निशीथ काल (महानिशीथ):</strong> रात्रि 11:38 से 12:30 बजे तक
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-white space-y-2">
                <h5 className="font-bold text-slate-900 font-['Cinzel',serif] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-600" />
                  <span>{userProfile.rashi} राशि हेतु महालक्ष्मी कृपा उपाय</span>
                </h5>
                <ul className="space-y-1.5 text-slate-700 text-xs">
                  <li>• पूजा में 5 कौड़ियां व 1 गोमती चक्र माता लक्ष्मी के चरणों में अर्पित करें।</li>
                  <li>• तांबे के दीपक में शुद्ध देसी घी का दीपक प्रज्वलित कर ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः का 108 बार जप करें।</li>
                  <li>• पूजन उपरांत कौड़ियों को लाल वस्त्र में लपेटकर अपनी तिजोरी/गल्ले में रखें।</li>
                </ul>
              </div>
            </div>
          )}

          {pack.id === 'fest-navratri' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-100 to-pink-50 border border-rose-300">
                <h4 className="font-bold text-rose-950 font-['Cinzel',serif] text-sm flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-rose-600" />
                  <span>9 दिन नवदुर्गा साधना व नवग्रह संतुलन</span>
                </h4>
                <p className="text-xs text-rose-900">
                  नवरात्रि के 9 दिन 9 ग्रहों के दोषों को सात्विक रीति से शांत करने का सर्वोत्तम समय हैं।
                </p>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-rose-950 mt-3 font-medium">
                  <div className="p-2 bg-white/80 rounded text-center">दिन 1-3: शक्ति व ऊर्जा</div>
                  <div className="p-2 bg-white/80 rounded text-center">दिन 4-6: लक्ष्मी व समृद्धि</div>
                  <div className="p-2 bg-white/80 rounded text-center">दिन 7-9: सरस्वती व ज्ञान</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-white space-y-2">
                <h5 className="font-bold text-slate-900 font-['Cinzel',serif]">दैनिक सात्विक नियम</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  प्रतिदिन प्रातः स्नान उपरांत देवी कवच का पाठ करें। राहु व केतु के दुष्प्रभावों से रक्षा हेतु लौंग का जोड़ा कपूर के साथ प्रज्वलित कर आरती करें।
                </p>
              </div>
            </div>
          )}

          {pack.id === 'fest-shani-transit' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-100 to-slate-100 border border-purple-300">
                <h4 className="font-bold text-purple-950 font-['Cinzel',serif] text-sm flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-4 h-4 text-purple-700" />
                  <span>शनि व राहु-केतु गोचर 2026 संपूर्ण रोडमैप</span>
                </h4>
                <p className="text-xs text-purple-900 leading-relaxed">
                  शनि देव कर्म के न्यायधीश हैं। आपकी राशि पर इस गोचर का प्रभाव धैर्य व परिश्रम द्वारा उच्च पद व आर्थिक स्थिरता दिलाने वाला रहेगा। किसी भी प्रकार के भय की आवश्यकता नहीं है।
                </p>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-white space-y-2">
                <h5 className="font-bold text-slate-900 font-['Cinzel',serif]">3 सरल सात्विक नियम</h5>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li>• शनिवार को पीपल वृक्ष के समीप सरसों के तेल का दीपक प्रज्वलित करें।</li>
                  <li>• प्रतिदिन हनुमान चालीसा का 1 बार शांत मन से पाठ करें।</li>
                  <li>• जरूरतमंद व कर्मठ सहायकों का सम्मान करें और उन्हें जल व अन्न दान करें।</li>
                </ul>
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
            <span className="font-bold text-amber-900 text-xs block font-['Cinzel',serif]">
              इस पैक में शामिल मुख्य सुविधाएं:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {pack.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-amber-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            सदा कल्याण हो • सात्विक वैदिक ज्योतिष
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-xs"
          >
            पूर्ण (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
