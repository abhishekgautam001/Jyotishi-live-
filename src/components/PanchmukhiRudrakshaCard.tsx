import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ExternalLink, Flame, CheckCircle2, X, Eye, Image as ImageIcon } from 'lucide-react';
import { RUDRAKSHA_CONFIG, RudrakshaImageOption } from '../config/rudrakshaConfig';

export const PanchmukhiRudrakshaCard: React.FC = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<RudrakshaImageOption>(
    RUDRAKSHA_CONFIG.imageOptions[0]
  );
  const [showImageGallery, setShowImageGallery] = useState(false);

  const handleClick = () => {
    if (RUDRAKSHA_CONFIG.targetUrl && RUDRAKSHA_CONFIG.targetUrl.trim() !== '') {
      // Direct redirect to the user's provided link
      window.open(RUDRAKSHA_CONFIG.targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Show informational modal explaining that ads are removed and the link will be active
      setShowInfoModal(true);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-100/50 p-3.5 sm:p-4 shadow-xs relative overflow-hidden my-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5">
          {/* Left: Rudraksha Image + Details */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative shrink-0 group">
              <img
                src={selectedOption.url}
                alt={selectedOption.label}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://upload.wikimedia.org/wikipedia/commons/1/18/Rudraksha_Bead.jpg';
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-xs transition-transform duration-200 group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                सिद्ध
              </span>
              <button
                type="button"
                onClick={() => setShowImageGallery(!showImageGallery)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center text-white text-[10px] font-bold transition-opacity"
                title="छवि विकल्प बदलें"
              >
                <Eye className="w-4 h-4 mr-1" />
                <span>व्यू</span>
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-800" />
                  <span>{RUDRAKSHA_CONFIG.badge}</span>
                </span>
                <span className="text-[10px] text-amber-800/80 font-medium hidden sm:inline">
                  {RUDRAKSHA_CONFIG.subtitle}
                </span>
                <button
                  type="button"
                  onClick={() => setShowImageGallery(!showImageGallery)}
                  className="text-[10px] font-semibold text-amber-800 hover:text-amber-950 bg-amber-100/90 hover:bg-amber-200 px-2 py-0.5 rounded border border-amber-300/80 flex items-center gap-1 ml-auto sm:ml-0"
                >
                  <ImageIcon className="w-3 h-3 text-amber-700" />
                  <span>छवि विकल्प ({RUDRAKSHA_CONFIG.imageOptions.length})</span>
                </button>
              </div>

              <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-['Cinzel',serif] mt-1 truncate">
                {RUDRAKSHA_CONFIG.title}
              </h4>

              <p className="text-[11px] text-slate-600 line-clamp-1 sm:line-clamp-2 mt-0.5 leading-snug">
                {RUDRAKSHA_CONFIG.description}
              </p>

              {/* Active image label */}
              <div className="text-[10px] text-amber-800/90 font-medium mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>सक्रिय छवि: {selectedOption.label}</span>
              </div>
            </div>
          </div>

          {/* Right: Direct Link Button (No Ads!) */}
          <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
            <button
              onClick={handleClick}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>{RUDRAKSHA_CONFIG.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expandable Image Options Strip */}
        {showImageGallery && (
          <div className="mt-3 pt-3 border-t border-amber-300/80 animate-in fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-amber-950 font-['Cinzel',serif] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>प्रामाणिक रुद्राक्ष छवि विकल्प (Select Rudraksha Image View):</span>
              </span>
              <button
                type="button"
                onClick={() => setShowImageGallery(false)}
                className="text-[10px] text-slate-500 hover:text-slate-700"
              >
                बंद करें ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RUDRAKSHA_CONFIG.imageOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedOption(opt)}
                  className={`p-2 rounded-xl text-left border transition-all flex items-center gap-2 ${
                    selectedOption.id === opt.id
                      ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400/50 shadow-xs'
                      : 'bg-white/80 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  <img
                    src={opt.url}
                    alt={opt.label}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover border border-amber-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-900 truncate">
                      {opt.label}
                    </p>
                    <p className="text-[9px] text-slate-500 truncate">
                      {opt.id === selectedOption.id ? '✓ चयनित' : 'देखें'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info Modal when user clicks before the public link is added */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-2xl border border-amber-300 max-w-sm w-full p-5 shadow-2xl relative text-center">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-amber-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mx-auto mb-3 shadow-xs">
              <Flame className="w-6 h-6 text-amber-600" />
            </div>

            <h3 className="font-bold text-base text-slate-900 font-['Cinzel',serif]">
              सिद्ध पंचमुखी रुद्राक्ष
            </h3>

            <div className="my-3 p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>विज्ञापन (Ads) पूरी तरह हटा दिया गया है</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                ऐप लाइव/पब्लिक होने के बाद आप जो भी आधिकारिक लिंक देंगे (जैसे आपकी वेबसाइट, शॉप या WhatsApp लिंक), वह यहाँ सीधे जोड़ दिया जाएगा।
              </p>
            </div>

            <div className="text-left text-[11px] text-slate-600 space-y-1 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>100% असली व हरिद्वार-काशी में प्राण-प्रतिष्ठित</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>मानसिक शांति, एकाग्रता व सकारात्मक ऊर्जा</span>
              </div>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors"
            >
              ठीक है (Understood)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

