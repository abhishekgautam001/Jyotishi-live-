import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  PhoneOff, 
  Sparkles, 
  User, 
  Clock, 
  Wallet, 
  ShieldCheck, 
  AlertCircle,
  ScrollText,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Languages
} from 'lucide-react';
import { Astrologer, ChatMessage, UserProfile, ConsultationLanguage } from '../types';

interface ChatConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologer: Astrologer;
  userProfile: UserProfile;
  walletBalance: number;
  onDeductMoney: (amount: number, description: string) => boolean;
  onCompleteSession: (durationMinutes: number, amountBilled: number) => void;
  openWalletModal: () => void;
}

export const ChatConsultationModal: React.FC<ChatConsultationModalProps> = ({
  isOpen,
  onClose,
  astrologer,
  userProfile,
  walletBalance,
  onDeductMoney,
  onCompleteSession,
  openWalletModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [totalBilled, setTotalBilled] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(false);
  
  // Language & Voice State
  const [languageMode, setLanguageMode] = useState<ConsultationLanguage>('hindi');
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session
  useEffect(() => {
    if (isOpen) {
      setDurationSeconds(0);
      setTotalBilled(0);
      setLowBalanceAlert(false);

      const welcomeMsg: ChatMessage = {
        id: 'msg-init-1',
        sender: 'system',
        text: languageMode === 'hindi' 
          ? `परामर्श सत्र प्रारंभ • ज्योतिषी: ${astrologer.name} • दर: ₹${astrologer.chatPrice}/मिनट • भाषा: हिन्दी`
          : `Consultation started with ${astrologer.name}. Rate: ₹${astrologer.chatPrice}/min. Language: Hinglish.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const astrologerGreeting: ChatMessage = {
        id: 'msg-init-2',
        sender: 'astrologer',
        text: languageMode === 'hindi'
          ? `प्रणाम ${userProfile.name}! मैं ${astrologer.name}। आपकी जन्म कुंडली व ग्रह स्थिति का अध्ययन कर आपकी सेवा में उपस्थित हूँ। कृपया अपना प्रश्न पूछें। सभी समाधान पूर्णतः सकारात्मक, भयमुक्त व सात्विक होंगे। सदा मंगल हो! 🕉️`
          : `Pranaam ${userProfile.name}! Main ${astrologer.name}. Aapki kundali aur grah sthiti ka dhyan karte hue main aapki seva me upastith hoon. Kripya apna prashna batayein. Sabhi samadhan sakaratmak aur saral honge. Sada Mangal Ho! 🕉️`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([welcomeMsg, astrologerGreeting]);
    }
  }, [isOpen, astrologer.id]);

  // Per-second timer & per-minute billing
  useEffect(() => {
    let timer: any;
    if (isOpen) {
      timer = setInterval(() => {
        setDurationSeconds((prev) => {
          const next = prev + 1;
          // Every full 60 seconds, deduct 1 minute charge
          if (next % 60 === 0) {
            const success = onDeductMoney(
              astrologer.chatPrice,
              `Live Chat Consultation (1 min) with ${astrologer.name}`
            );
            if (success) {
              setTotalBilled((b) => b + astrologer.chatPrice);
            } else {
              setLowBalanceAlert(true);
            }
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, astrologer.chatPrice, onDeductMoney]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Stop speech when modal closes
  useEffect(() => {
    if (!isOpen) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  }, [isOpen]);

  // Speech synthesis helper
  const speakText = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean emojis & symbols for natural phonetic playback
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}🕉️✨]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = languageMode === 'hindi' ? 'hi-IN' : 'hi-IN';
    utterance.rate = 0.93; // Calm, respectful pace
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Voice speech-to-text dictation
  const toggleSpeechRecognition = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Aapke browser me speech recognition uplabdh nahi hai. Kripya Chrome ya Edge use karein.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = languageMode === 'hindi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Astrologer response simulation with positive uplifting Vedic remedies
    setIsTyping(true);
    setTimeout(async () => {
      try {
        const res = await fetch('/api/consultation/astrologer-reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            astrologerName: astrologer.name,
            userMessage: text,
            languageMode,
          }),
        });
        const data = await res.json();
        const replyText = data.reply || (languageMode === 'hindi' 
          ? 'हरि ॐ! ईश्वर पर विश्वास रखें, आपका प्रश्न अत्यंत शुभ फल देगा। प्रातःकाल सूर्य नमस्कार और ध्यान करें।'
          : 'Hari Om! Ishwar me vishwas rakhein, aapka prashna bahut shubh parinaam dega. Subah Surya namaskar aur dhyan lagayein.');
        
        const newMsgId = `msg-${Date.now() + 1}`;
        const replyMsg: ChatMessage = {
          id: newMsgId,
          sender: 'astrologer',
          text: replyText,
          timestamp: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, replyMsg]);

        // Auto-speak if enabled
        if (autoSpeak) {
          speakText(replyText, newMsgId);
        }
      } catch (err) {
        const fallbackText = languageMode === 'hindi'
          ? `आपकी कुंडली में सूर्य और बृहस्पति की अनुकूल दृष्टि है। चिंता त्याग कर प्रातःकाल तांबे के पात्र से सूर्यदेव को अर्घ्य दें और १० मिनट ध्यान करें। सदा मंगल होगा! ✨`
          : `Aapki kundali me Surya aur Guru ki drishti tejasvi hai. Chinta chhod kar subah tambe ke patra se Surya ko jal arpit karein aur 10 minute dhyan karein. Sab mangal hoga! ✨`;
        
        const newMsgId = `msg-${Date.now() + 1}`;
        const fallbackMsg: ChatMessage = {
          id: newMsgId,
          sender: 'astrologer',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        if (autoSpeak) {
          speakText(fallbackText, newMsgId);
        }
      } finally {
        setIsTyping(false);
      }
    }, 1200);
  };

  const shareKundaliDetails = () => {
    const text = languageMode === 'hindi'
      ? `📜 मेरी जन्म कुंडली विवरण:
नाम: ${userProfile.name}
जन्म तिथि: ${userProfile.dob}
जन्म समय: ${userProfile.tob}
जन्म स्थान: ${userProfile.pob}
राशि: ${userProfile.rashi}
गोत्र: ${userProfile.gotra || 'कश्यप'}`
      : `📜 Meri Janam Kundali Vivaran:
Naam: ${userProfile.name}
Janam Tithi: ${userProfile.dob}
Janam Samay: ${userProfile.tob}
Janam Sthan: ${userProfile.pob}
Rashi: ${userProfile.rashi}
Gotra: ${userProfile.gotra || 'Kashyap'}`;
    handleSendMessage(text);
  };

  const handleEndSession = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const finalMinutes = Math.max(1, Math.ceil(durationSeconds / 60));
    // If not billed yet (less than 1 minute), charge first minute
    const finalAmount = totalBilled === 0 ? astrologer.chatPrice : totalBilled;
    if (totalBilled === 0) {
      onDeductMoney(astrologer.chatPrice, `Live Chat Consultation (1 min) with ${astrologer.name}`);
    }
    onCompleteSession(finalMinutes, finalAmount);
  };

  const quickQuestionsHindi = [
    'कार्यक्षेत्र व नौकरी में उन्नति के उपाय?',
    'मन में शांति व आत्मबल के लिए?',
    'सूर्य अर्घ्य की सरल विधि बताइए?',
    'विवाह व परिवार में सुख-शांति?'
  ];

  const quickQuestionsHinglish = [
    'Career & Naukri me vikas ke upaay?',
    'Man me shanti aur aatmavishwas ke liye?',
    'Surya arghya ki saral vidhi batayein?',
    'Vivah aur parivar me shubh samay?'
  ];

  const currentQuickQuestions = languageMode === 'hindi' ? quickQuestionsHindi : quickQuestionsHinglish;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border border-amber-200 rounded-2xl w-full max-w-2xl h-[92vh] max-h-[760px] overflow-hidden shadow-2xl flex flex-col">
        {/* Header with live timer & billing */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative">
              <img
                src={astrologer.avatar}
                alt={astrologer.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-amber-300"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-sm sm:text-base leading-tight">
                  {astrologer.name}
                </h3>
                <span className="text-[10px] bg-amber-500/30 border border-amber-300/40 px-1.5 py-0.2 rounded text-amber-100 hidden sm:inline">
                  {astrologer.title}
                </span>
              </div>
              <p className="text-[11px] text-amber-200">
                ₹{astrologer.chatPrice}/min • 19+ Yrs Exp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live timer */}
            <div className="bg-black/30 border border-amber-300/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs text-amber-100 font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{formatTimer(durationSeconds)}</span>
            </div>

            {/* End session button */}
            <button
              onClick={handleEndSession}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs transition-colors active:scale-95"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">End Chat</span>
            </button>
          </div>
        </div>

        {/* Sub-Header: Language Option (Hindi / Hinglish) & Voice Auto-Speak Toggle */}
        <div className="bg-amber-100/70 border-b border-amber-200/80 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Language Selection: Hindi vs Hinglish */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-amber-700" />
              बोलने की भाषा:
            </span>
            <div className="inline-flex rounded-lg bg-white/90 p-0.5 border border-amber-300/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setLanguageMode('hindi')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  languageMode === 'hindi'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                🇮🇳 शुद्ध हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('hinglish')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  languageMode === 'hinglish'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                🔤 Hinglish (हिंग्लिश)
              </button>
            </div>
          </div>

          {/* Auto-Speak Audio Voice Toggle */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setAutoSpeak(!autoSpeak);
                if (autoSpeak && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setSpeakingMsgId(null);
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                autoSpeak
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-amber-300 hover:bg-amber-50'
              }`}
            >
              {autoSpeak ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>ऑडियो (Auto ON)</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span>ऑडियो (Auto OFF)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Low balance banner */}
        {lowBalanceAlert && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center justify-between text-xs text-rose-800">
            <span className="flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              Wallet balance is low. Please recharge to continue the session uninterrupted.
            </span>
            <button
              onClick={openWalletModal}
              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded text-[11px] shrink-0 ml-2"
            >
              Recharge Now
            </button>
          </div>
        )}

        {/* Chat Messages Window */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-[#FFFDF9]/60">
          {messages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="text-center my-2">
                  <span className="text-[11px] font-medium text-slate-500 bg-amber-100/70 border border-amber-200 px-3 py-1 rounded-full">
                    {msg.text}
                  </span>
                </div>
              );
            }

            const isMe = msg.sender === 'user';
            const isSpeakingThis = speakingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-2 max-w-[88%] sm:max-w-[80%] ${
                  isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {!isMe && (
                  <img
                    src={astrologer.avatar}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-amber-300 mt-1 shrink-0"
                  />
                )}
                <div>
                  <div
                    className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isMe
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white border border-amber-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Astrologer Voice Speak Out Button */}
                  {!isMe && (
                    <div className="flex items-center gap-2 mt-1 ml-1 text-[11px] text-slate-500">
                      <span>{msg.timestamp}</span>
                      <button
                        type="button"
                        onClick={() => speakText(msg.text, msg.id)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold transition-colors ${
                          isSpeakingThis
                            ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                            : 'bg-amber-50/80 text-amber-800 border-amber-200 hover:bg-amber-100'
                        }`}
                        title={isSpeakingThis ? 'आवाज रोकें' : 'ऑडियो सुनें'}
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-600" />
                            <span>रोकें (Stop)</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-amber-700" />
                            <span>ऑडियो (Audio)</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {isMe && (
                    <span className="text-[10px] text-slate-400 mt-0.5 block text-right">
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic bg-amber-50/70 p-2 rounded-xl border border-amber-200/60 w-fit">
              <img
                src={astrologer.avatar}
                alt=""
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover border border-amber-300"
              />
              <span className="flex items-center gap-1 font-medium text-amber-900">
                {astrologer.name} {languageMode === 'hindi' ? 'सकारात्मक उपाय लिख रहे हैं' : 'is typing remedies'}
                <span className="animate-pulse">...</span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick action bar */}
        <div className="px-3 py-1.5 bg-amber-50/70 border-t border-amber-200/60 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs whitespace-nowrap">
          <button
            onClick={shareKundaliDetails}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-600 text-white font-semibold text-[11px] shadow-2xs hover:bg-amber-700 transition-colors shrink-0"
          >
            <ScrollText className="w-3 h-3" />
            <span>{languageMode === 'hindi' ? 'मेरी जन्म कुंडली भेजें' : 'Share My Birth Kundali'}</span>
          </button>

          {currentQuickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-full bg-white border border-amber-200 text-slate-700 hover:bg-amber-100 text-[11px] transition-colors shrink-0 font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice Mic button (बोलकर पूछें) */}
        <div className="p-3 bg-white border-t border-amber-200/70 flex items-center gap-2">
          {/* Microphone Dictation Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-600 text-white border-rose-700 animate-pulse ring-2 ring-rose-400'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
            }`}
            title={isListening ? 'माइक बंद करें' : 'माइक (Voice Input)'}
          >
            {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-amber-700" />}
          </button>

          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                isListening 
                  ? 'बोलिए, हम सुन रहे हैं...' 
                  : languageMode === 'hindi'
                  ? `आचार्य जी से हिन्दी में पूछें या माइक दबाकर बोलें...`
                  : `Ask ${astrologer.name} in Hinglish or tap mic to speak...`
              }
              className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#FFFDF9] focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isListening ? 'border-rose-400 bg-rose-50/30' : 'border-amber-200'
              }`}
            />
            {isListening && (
              <span className="absolute right-3 top-2.5 text-[10px] text-rose-600 font-bold animate-pulse">
                Listening...
              </span>
            )}
          </div>

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white disabled:opacity-40 transition-all shadow-xs active:scale-95 flex items-center gap-1 shrink-0"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
