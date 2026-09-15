import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Volume2, 
  VolumeX,
  AlertCircle,
  X,
  Send,
  Languages
} from 'lucide-react';
import { Astrologer, UserProfile, ConsultationLanguage } from '../types';

interface VideoConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologer: Astrologer;
  userProfile: UserProfile;
  walletBalance: number;
  onDeductMoney: (amount: number, description: string) => boolean;
  onCompleteSession: (durationMinutes: number, amountBilled: number) => void;
  openWalletModal: () => void;
}

export const VideoConsultationModal: React.FC<VideoConsultationModalProps> = ({
  isOpen,
  onClose,
  astrologer,
  userProfile,
  walletBalance,
  onDeductMoney,
  onCompleteSession,
  openWalletModal,
}) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [totalBilled, setTotalBilled] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [languageMode, setLanguageMode] = useState<ConsultationLanguage>('hindi');
  const [isSpeakingLive, setIsSpeakingLive] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const userVideoRef = useRef<HTMLVideoElement>(null);

  // Stop speech when modal closes
  useEffect(() => {
    if (!isOpen && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingLive(false);
    }
  }, [isOpen]);

  // Setup user camera
  useEffect(() => {
    if (isOpen && !isVideoOff) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setCameraStream(stream);
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
          }
          setCameraError(false);
        })
        .catch(() => {
          setCameraError(true);
        });
    }

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, isVideoOff]);

  // Handle call timer & per-minute wallet deduction
  useEffect(() => {
    let timer: any;
    if (isOpen) {
      setDurationSeconds(0);
      setTotalBilled(0);
      setChatMessages([
        {
          sender: astrologer.name,
          text: languageMode === 'hindi'
            ? `नमस्कार ${userProfile.name}! मैं ${astrologer.name}। वीडियो परामर्श प्रारंभ हो चुका है। आप अपना प्रश्न शांति से पूछ सकते हैं। सभी उपाय सात्विक व सकारात्मक होंगे। 🕉️`
            : `Namaskar ${userProfile.name}! Main ${astrologer.name}. Video call shuru ho chuki hai. Aap apna prashna shanti se pooch sakte hain. Sabhi upaay sakaratmak honge. 🕉️`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      timer = setInterval(() => {
        setDurationSeconds((prev) => {
          const next = prev + 1;
          // Every 60 seconds, deduct 1 minute video consultation rate
          if (next % 60 === 0) {
            const success = onDeductMoney(
              astrologer.videoPrice,
              `Live Video Consultation (1 min) with ${astrologer.name}`
            );
            if (success) {
              setTotalBilled((b) => b + astrologer.videoPrice);
            }
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, astrologer.videoPrice, onDeductMoney, languageMode]);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingLive(false);
    }
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    const finalMinutes = Math.max(1, Math.ceil(durationSeconds / 60));
    const finalAmount = totalBilled === 0 ? astrologer.videoPrice : totalBilled;
    if (totalBilled === 0) {
      onDeductMoney(astrologer.videoPrice, `Live Video Consultation (1 min) with ${astrologer.name}`);
    }
    onCompleteSession(finalMinutes, finalAmount);
  };

  const playAstrologerLiveVoice = (customSpeech?: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingLive) {
      window.speechSynthesis.cancel();
      setIsSpeakingLive(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = customSpeech || (languageMode === 'hindi'
      ? `सदा कल्याण हो ${userProfile.name}! आपकी जन्म पत्रिका में सूर्य और बृहस्पति दोनों अत्यंत शुभ और सामर्थ्यवान स्थिति में हैं। आपको किसी भी ग्रह दोष से डरने की रत्ती भर भी आवश्यकता नहीं है। बस प्रातःकाल तांबे के पात्र से सूर्य भगवान को जल का अर्घ्य दें और 10 मिनट शांतिपूर्वक ध्यान लगाएं। आपका सारा संकट दूर होगा और यश की प्राप्ति होगी।`
      : `Sada Kalyan Ho ${userProfile.name}! Aapki janam patrika me Surya aur Guru dono bahut hi balwan aur sakaratmak hain. Kisi bhi dasha se chinta mat kijiye. Pratidin subah Suryadev ko tambe ke lote se arghya dein aur 10 minute dhyan karein. Aapka har sankalp safal hoga.`);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.93;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeakingLive(false);
    utterance.onerror = () => setIsSpeakingLive(false);

    setIsSpeakingLive(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendInCallMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = {
      sender: userProfile.name,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      const replyText = languageMode === 'hindi'
        ? `जी बिल्कुल। आपकी कुंडली में सूर्य का स्थान तेजस्वी है। प्रातःकाल सूर्य जल अर्घ्य और १० मिनट का ध्यान ही आपके सभी संकल्पों को सिद्ध करेगा।`
        : `Ji bilkul. Aapki kundali me Surya ka sthan tejasvi hai. Pratahkaal Surya jal arghya aur 10 minute ka dhyan hi aapke sabhi sankalpon ko shiddh karega.`;

      setChatMessages((prev) => [
        ...prev,
        {
          sender: astrologer.name,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      if (isSpeakingLive) {
        playAstrologerLiveVoice(replyText);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[820px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-amber-500/30">
        {/* Top Header Floating Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 text-white pointer-events-auto">
          {/* Astrologer Info */}
          <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-amber-400/30 px-3.5 py-1.5 rounded-full shadow-lg">
            <div className="relative">
              <img
                src={astrologer.avatar}
                alt={astrologer.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-amber-300"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-black animate-pulse" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">{astrologer.name}</p>
              <span className="text-[10px] text-amber-200 block -mt-0.5">
                Vedic Video Session • ₹{astrologer.videoPrice}/min
              </span>
            </div>
          </div>

          {/* Controls: Language Selector (Hindi / Hinglish) & Timer */}
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-full bg-black/70 backdrop-blur-md p-0.5 border border-amber-400/40 text-[10px] shadow-lg">
              <button
                type="button"
                onClick={() => setLanguageMode('hindi')}
                className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                  languageMode === 'hindi'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-amber-100 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('hinglish')}
                className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                  languageMode === 'hinglish'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-amber-100 hover:text-white'
                }`}
              >
                Hinglish
              </button>
            </div>

            {/* Timer & Live Badge */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-mono text-amber-100">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{formatTimer(durationSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Video Stage Container */}
        <div className="relative flex-1 bg-slate-900 overflow-hidden flex items-center justify-center">
          {/* Astrologer Stream (Primary Feed) */}
          <div className="relative w-full h-full">
            <img
              src={astrologer.avatar}
              alt={astrologer.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85 scale-105 filter brightness-95"
            />
            {/* Ambient Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

            {/* Speaking Wave & Live Voice Button */}
            <div className="absolute bottom-28 left-4 sm:left-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => playAstrologerLiveVoice()}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-white text-xs backdrop-blur-md border shadow-lg transition-all active:scale-95 ${
                  isSpeakingLive
                    ? 'bg-amber-600/90 border-amber-300 ring-2 ring-amber-400'
                    : 'bg-black/70 border-amber-400/50 hover:bg-black/90'
                }`}
                title="ऑडियो चालू करें"
              >
                {isSpeakingLive ? (
                  <>
                    <VolumeX className="w-4 h-4 text-amber-200" />
                    <span className="font-semibold text-amber-100">आवाज रोकें (Stop Voice)</span>
                    <div className="flex items-center gap-0.5 ml-1">
                      <span className="w-1 h-3 bg-amber-300 rounded-full animate-pulse" />
                      <span className="w-1 h-4 bg-amber-200 rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-amber-300 rounded-full animate-pulse delay-150" />
                    </div>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span className="font-semibold text-amber-200">
                      {languageMode === 'hindi' ? 'पंडित जी की वाणी सुनें' : 'Listen Pandit Ji Voice'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* User Preview (Picture-in-Picture) */}
          <div className="absolute top-20 right-4 sm:right-6 w-28 sm:w-40 aspect-3/4 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-slate-800 z-20">
            {!isVideoOff && !cameraError ? (
              <video
                ref={userVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-900 to-slate-900 text-white p-2 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold mb-1">
                  {userProfile.name.charAt(0)}
                </div>
                <span className="text-[11px] font-medium">{userProfile.name}</span>
                <span className="text-[9px] text-amber-200/70">
                  {isVideoOff ? 'Camera Off' : 'Preview'}
                </span>
              </div>
            )}
            <div className="absolute bottom-1.5 left-2 text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-white">
              You
            </div>
          </div>

          {/* In-Call Quick Chat Drawer Overlay */}
          {isChatOpen && (
            <div className="absolute inset-y-0 right-0 w-full sm:w-80 bg-[#FFFDF9]/95 backdrop-blur-md border-l border-amber-300/80 z-30 flex flex-col animate-in slide-in-from-right duration-200">
              <div className="p-3.5 bg-gradient-to-r from-amber-700 to-orange-700 text-white flex items-center justify-between">
                <span className="font-semibold text-xs flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  {languageMode === 'hindi' ? 'लाइव परामर्श चैट' : 'In-Call Consultation Chat'}
                </span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 rounded hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {chatMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl ${
                      m.sender === userProfile.name
                        ? 'bg-amber-600 text-white ml-auto max-w-[85%]'
                        : 'bg-white border border-amber-200 text-slate-800 mr-auto max-w-[85%]'
                    }`}
                  >
                    <span className="font-bold text-[10px] block opacity-80 mb-0.5">
                      {m.sender}
                    </span>
                    <p>{m.text}</p>
                    <span className="text-[9px] opacity-70 block text-right mt-0.5">{m.time}</span>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-white border-t border-amber-200 flex items-center gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendInCallMessage()}
                  placeholder={languageMode === 'hindi' ? 'पंडित जी से सन्देश पूछें...' : 'Type message to Pandit Ji...'}
                  className="flex-1 text-xs px-2.5 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  onClick={handleSendInCallMessage}
                  className="p-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Floating Control Bar */}
        <div className="p-4 bg-slate-950/90 border-t border-white/10 flex items-center justify-between gap-3 z-20">
          {/* Audio toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`p-3 rounded-full transition-all ${
                isMicMuted
                  ? 'bg-rose-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
            >
              {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Video toggle */}
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full transition-all ${
                isVideoOff
                  ? 'bg-rose-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isVideoOff ? 'Start Camera' : 'Stop Camera'}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
            </button>

            {/* Chat drawer toggle */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all relative"
              title="Open Chat"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
            </button>
          </div>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-bold text-sm shadow-xl flex items-center gap-2 transition-all active:scale-95"
          >
            <PhoneOff className="w-5 h-5" />
            <span>End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
