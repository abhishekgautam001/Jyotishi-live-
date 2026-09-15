import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Sun, 
  Heart, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Check, 
  Copy,
  Flame,
  Feather,
  Mic,
  MicOff,
  Languages
} from 'lucide-react';
import { UserProfile, ConsultationLanguage } from '../types';
import { GoogleBannerAd } from './GoogleBannerAd';

interface AIPanditJiProps {
  userProfile: UserProfile;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'pandit';
  text: string;
  time: string;
}

export const AIPanditJi: React.FC<AIPanditJiProps> = ({ 
  userProfile, 
  initialPrompt,
  onClearInitialPrompt 
}) => {
  const [languageMode, setLanguageMode] = useState<ConsultationLanguage>('hindi');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const getInitialGreeting = (lang: ConsultationLanguage) => {
    if (lang === 'hindi') {
      return `सदा कल्याण हो ${userProfile.name}! मैं "ज्योतिषी Live" का वर्चुअल पंडित जी (Virtual Pandit Ji) हूँ। 

मेरा संकल्प आपको ईश्वरीय आशीर्वाद, सकारात्मक ऊर्जा और आत्मबल प्रदान करना है। यहाँ किसी भी ग्रह, गोचर या दशा से भयभीत होने की आवश्यकता नहीं है; हर चुनौती का समाधान सात्विक साधना, सकारात्मक विचार और सरल उपायों से संभव है।

आप मुझसे सूर्य अर्घ्य, दैनिक दिनचर्या, ध्यान, या जीवन के किसी भी विषय पर सरल और सात्विक वैदिक उपाय पूछ सकते हैं। 🕉️✨`;
    } else {
      return `Sada Kalyan Ho ${userProfile.name}! Main "Jyotishi Live" ka Virtual Pandit Ji hoon.

Mera sankalp aapko Ishwariya aashirwaad, sakaratmak urja (pure positivity) aur aatmavishwas pradan karna hai. Yahan kisi bhi grah ya dasha se ghabrane ki bilkul zaroorat nahi hai. Har samasya ka samadhan satvik sadhana aur saral upaayon se sambhav hai.

Aap mujhse Surya arghya, dhyan, daily routine, ya career aur parivar ke saral Vedic upaay pooch sakte hain. 🕉️✨`;
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-msg-1',
      sender: 'pandit',
      text: getInitialGreeting('hindi'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPromptsHindi = [
    '☀️ सुबह सूर्य को तांबे के लोटे से जल देने की सही विधि व लाभ?',
    '🧘 मन को शांत और एकाग्र करने के सात्विक नियम?',
    '💼 कार्यक्षेत्र और आत्मविश्वास वृद्धि के सरल उपाय?',
    '🌿 तुलसी पूजन और गायत्री मंत्र का सात्विक प्रभाव?',
    '🕊️ पक्षियों को दाना व पशु सेवा से ग्रह अनुकूल कैसे होते हैं?',
  ];

  const quickPromptsHinglish = [
    '☀️ Subah Surya ko tambe ke lote se jal dene ki sahi vidhi?',
    '🧘 Man ko shant aur focused karne ke satvik niyam?',
    '💼 Career aur confidence badhane ke aasan upaay?',
    '🌿 Tulsi poojan aur Gayatri Mantra ka satvik prabhav?',
    '🕊️ Pakshiyon ko daana aur pashu seva ke labh?',
  ];

  const currentPrompts = languageMode === 'hindi' ? quickPromptsHindi : quickPromptsHinglish;

  // Selected native Hindi voice for natural Vedic speech
  const [hindiVoice, setHindiVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        const found = voices.find(
          (v) =>
            v.lang === 'hi-IN' ||
            v.lang.startsWith('hi') ||
            v.name.toLowerCase().includes('hindi') ||
            v.name.toLowerCase().includes('kalpana') ||
            v.name.toLowerCase().includes('hemant')
        );
        if (found) setHindiVoice(found);
      }
    };
    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Handle incoming initial prompt from catalog cards
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSend(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Update greeting when language changes if only initial message exists
  const handleLanguageChange = (newLang: ConsultationLanguage) => {
    setLanguageMode(newLang);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
    if (messages.length === 1 && messages[0].sender === 'pandit') {
      setMessages([
        {
          id: 'init-msg-1',
          sender: 'pandit',
          text: getInitialGreeting(newLang),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleVoiceRead = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean emojis & formatting for smooth speech synthesis
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}🕉️✨•*#]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    utterance.rate = 0.92; // Calm, respectful Vedic pace
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Mic dictation
  const toggleSpeechRecognition = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Aapke browser me voice recognition uplabdh nahi hai. Kripya Chrome browser use karein.');
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

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-pandit/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4).map(m => ({ sender: m.sender, text: m.text })),
          userProfile,
          languageMode,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || (languageMode === 'hindi' 
        ? 'हरि ॐ! ईश्वर पर अटूट विश्वास रखें, आपका प्रश्न अति शुभ फलदायी होगा। प्रातःकाल सूर्य नमस्कार और ध्यान अवश्य करें।'
        : 'Hari Om! Ishwar par vishwas rakhein, aapka prashna ati shubh hoga. Subah Surya arghya aur dhyan karein.');
      
      const replyMsgId = `pandit-${Date.now()}`;
      const panditReply: Message = {
        id: replyMsgId,
        sender: 'pandit',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, panditReply]);

      if (autoSpeak) {
        handleVoiceRead(replyText, replyMsgId);
      }
    } catch (err) {
      const fallbackText = languageMode === 'hindi' 
        ? `शुभ आशीर्वाद! आपके ग्रह-नक्षत्र आपको अपार धैर्य और आत्मबल का वरदान दे रहे हैं। 

✨ आपके लिए ३ सरल सात्विक उपाय:
१. प्रातःकाल सूर्यदेव को तांबे के पात्र से जल अर्पित करें और "ॐ घृणि सूर्याय नमः" का स्मरण करें।
२. प्रतिदिन 10 मिनट शांत बैठकर ध्यान लगाएं, इससे आत्मबल जागेगा।
३. बेजुबान पक्षियों को दाना और गाय को हरी घास या रोटी दें।

आपका जीवन सदा मंगलमय रहेगा। ॐ शान्ति! 🕉️`
        : `Subh aashirwaad! Aapke grah-nakshatra aapko saahas aur vivek ka aashirwaad de rahe hain.

✨ Aapke liye 3 saral satvik upaay:
1. Subah Suryadev ko tambe ke lote se jal dein aur Surya Gayatri ka dhyan karein.
2. Pratidin 10 minute shanti se dhyan (meditation) karein.
3. Bejubaan pakshiyon ko daana aur gau mata ko roti dein.

Vijayee Bhava! Ishwar aapke sath hain. 🕉️`;

      const replyMsgId = `pandit-${Date.now()}`;
      const fallbackReply: Message = {
        id: replyMsgId,
        sender: 'pandit',
        text: fallbackText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);

      if (autoSpeak) {
        handleVoiceRead(fallbackText, replyMsgId);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Divine Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white p-4 sm:p-6 shadow-xl relative overflow-hidden mb-4">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/25 border-2 border-amber-300/40 flex items-center justify-center text-amber-200 shadow-inner shrink-0">
              <Flame className="w-8 h-8 text-amber-100 fill-amber-200/40" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold tracking-tight text-amber-100">
                  वर्चुअल पंडित जी (Virtual Pandit Ji)
                </h2>
                <span className="text-[10px] font-bold bg-amber-400/30 border border-amber-300 px-2.5 py-0.5 rounded-full text-white">
                  24x7 सात्विक मार्गदर्शन
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 mt-0.5 max-w-xl">
                सदा सकारात्मक मार्गदर्शन • भयमुक्त वैदिक परामर्श • सरल व सात्विक उपाय (सूर्य अर्घ्य, ध्यान, जप)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs border border-amber-300/30 px-3 py-1.5 rounded-xl text-xs text-amber-200">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>100% भयमुक्त व सात्विक</span>
          </div>
        </div>
      </div>

      {/* Language & Voice Controls Bar */}
      <div className="bg-amber-100/80 border border-amber-200 rounded-xl p-2.5 mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Language selector: Hindi vs Hinglish */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-950 flex items-center gap-1 text-[11px]">
            <Languages className="w-3.5 h-3.5 text-amber-700" />
            भाषा:
          </span>
          <div className="inline-flex rounded-lg bg-white p-0.5 border border-amber-300 shadow-2xs">
            <button
              type="button"
              onClick={() => handleLanguageChange('hindi')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                languageMode === 'hindi'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-amber-900'
              }`}
            >
              🇮🇳 हिन्दी (Hindi)
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('hinglish')}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                languageMode === 'hinglish'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-amber-900'
              }`}
            >
              🔤 Hinglish
            </button>
          </div>
        </div>

        {/* Auto-Speak Audio Voice Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setAutoSpeak(!autoSpeak);
              if (autoSpeak && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                setSpeakingMsgId(null);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
              autoSpeak
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
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

      {/* Main Chat Container */}
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m, idx) => {
            const isMe = m.sender === 'user';
            const isSpeakingThis = speakingMsgId === m.id;

            return (
              <div
                key={m.id || idx}
                className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${
                  isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {!isMe && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <Flame className="w-5 h-5 text-amber-200 fill-amber-300/40" />
                  </div>
                )}
                <div>
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isMe
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white border border-amber-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Actions under responses */}
                  {!isMe && (
                    <div className="flex items-center gap-3 mt-1.5 ml-1 text-[11px] text-slate-400">
                      <span>{m.time}</span>
                      <button
                        onClick={() => handleCopy(m.text, idx)}
                        className="hover:text-amber-800 flex items-center gap-1 transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedIndex === idx ? 'कॉपी हुआ' : 'उपाय कॉपी करें'}</span>
                      </button>

                      <button
                        onClick={() => handleVoiceRead(m.text, m.id)}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-medium transition-colors ${
                          isSpeakingThis
                            ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse ring-2 ring-rose-200'
                            : 'bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                            <span>रोकें (Stop)</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                            <span>ऑडियो (Audio)</span>
                          </>
                        )}
                      </button>

                      {isSpeakingThis && (
                        <div className="flex items-center gap-1 text-[11px] text-rose-600 font-semibold animate-pulse">
                          <span className="w-1 h-3 bg-rose-500 rounded-full animate-bounce" />
                          <span className="w-1 h-4 bg-rose-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                          <span className="w-1 h-2.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                        </div>
                      )}
                    </div>
                  )}

                  {isMe && (
                    <span className="text-[10px] text-slate-400 block text-right mt-1">
                      {m.time}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3 mr-auto text-xs text-amber-900 bg-amber-50 p-3 rounded-2xl border border-amber-200/80 animate-pulse">
              <Flame className="w-4 h-4 text-orange-600 animate-spin" />
              <span>
                {languageMode === 'hindi'
                  ? 'पंडित जी आपके प्रश्न का विचार कर आशीर्वाद एवं सरल उपाय दे रहे हैं...'
                  : 'Pandit Ji aapke prashna par vichar karke aashirwaad aur aasan upaay taiyar kar rahe hain...'}
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-2.5 bg-amber-50/70 border-t border-amber-200/70 overflow-x-auto scrollbar-none flex items-center gap-1.5 whitespace-nowrap text-xs">
          {currentPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-full bg-white border border-amber-200 text-slate-700 hover:border-amber-400 hover:bg-amber-100/60 transition-all shrink-0 font-medium text-[11px]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice Mic dictation button */}
        <div className="p-3.5 bg-white border-t border-amber-200 flex items-center gap-2">
          {/* Voice Microphone button */}
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
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                isListening
                  ? 'बोलिए, हम सुन रहे हैं...'
                  : languageMode === 'hindi'
                  ? 'पंडित जी से अपना प्रश्न पूछें या माइक दबाकर बोलें...'
                  : 'Pandit Ji se apna prashna poochhein ya mic daba kar bolen...'
              }
              className={`w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border bg-[#FFFDF9] focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                isListening ? 'border-rose-400 bg-rose-50/30' : 'border-amber-200'
              }`}
            />
            {isListening && (
              <span className="absolute right-3 top-2.5 text-[10px] text-rose-600 font-bold flex items-center gap-1 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                हिन्दी में बोलिए, सुन रहे हैं...
              </span>
            )}
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || loading}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-40 flex items-center gap-1.5 shrink-0"
          >
            <span>{languageMode === 'hindi' ? 'पूछें' : 'Send'}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Google AdMob In-Chat Banner */}
      <GoogleBannerAd variant="compact" label="वर्चुअल पंडित जी प्रायोजित विज्ञापन" />
    </div>
  );
};
