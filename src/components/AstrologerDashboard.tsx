import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  Phone, 
  PhoneIncoming, 
  Star, 
  TrendingUp, 
  UserCheck, 
  Video, 
  XCircle,
  Settings,
  ArrowUpRight,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { Astrologer } from '../types';

interface AstrologerDashboardProps {
  currentAstrologer: Astrologer;
  onAcceptIncomingCall: (clientName: string, type: 'chat' | 'video') => void;
}

export const AstrologerDashboard: React.FC<AstrologerDashboardProps> = ({
  currentAstrologer,
  onAcceptIncomingCall,
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [chatPrice, setChatPrice] = useState(currentAstrologer.chatPrice);
  const [videoPrice, setVideoPrice] = useState(currentAstrologer.videoPrice);
  const [hasIncomingRequest, setHasIncomingRequest] = useState(true);
  const [earnings, setEarnings] = useState(4850);
  const [withdrawnSuccess, setWithdrawnSuccess] = useState(false);

  const incomingRequest = {
    clientName: 'Pooja Verma',
    city: 'Jaipur, Rajasthan',
    type: 'video' as const,
    topic: 'Career Direction & Surya Upasana',
    rate: videoPrice,
    waitTime: '30s ago',
  };

  const handleWithdraw = () => {
    setWithdrawnSuccess(true);
    setTimeout(() => {
      setEarnings(0);
      setWithdrawnSuccess(false);
    }, 2000);
  };

  const recentConsultations = [
    {
      id: 'REQ-109',
      client: 'Vikas Malhotra',
      mode: 'Video Call',
      duration: '18 Mins',
      earned: '₹630',
      rating: 5,
      review: 'Acharya ji ki baatein sunkar man ko bohot shanti mili. Surya jal dene ka niyam aaj se shuru kiya.',
      time: '1 hour ago',
    },
    {
      id: 'REQ-108',
      client: 'Neha Sundaram',
      mode: 'Chat Consultation',
      duration: '12 Mins',
      earned: '₹240',
      rating: 5,
      review: 'Aasan upaay bataye aur bilkul daraya nahi. Bohot sakaratmak margdarshan mila.',
      time: '3 hours ago',
    },
    {
      id: 'REQ-107',
      client: 'Karan Sharma',
      mode: 'Video Call',
      duration: '25 Mins',
      earned: '₹875',
      rating: 5,
      review: 'Very peaceful session. Gayatri mantra aur dhyan ki vidhi achhe se samjhayi.',
      time: 'Yesterday',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Astrologer Top Header */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentAstrologer.avatar}
              alt={currentAstrologer.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
              }`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-amber-100">
                {currentAstrologer.name}
              </h2>
              <span className="text-[10px] uppercase font-bold bg-amber-500/20 border border-amber-300/40 text-amber-200 px-2 py-0.5 rounded-full">
                Verified Astrologer
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-0.5">
              {currentAstrologer.title} • {currentAstrologer.experience}+ Yrs Exp • 4.98 ★ (18,450+ Consultations)
            </p>
          </div>
        </div>

        {/* Live Availability Toggle */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xs border border-amber-400/30 p-2 rounded-2xl">
          <span className="text-xs font-semibold text-amber-200 pl-2">
            Status: {isOnline ? 'Online & Available' : 'Offline / In Pooja'}
          </span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isOnline
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Live Incoming Consultation Alert */}
      {hasIncomingRequest && isOnline && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-white text-rose-700 flex items-center justify-center animate-bounce shadow-lg shrink-0">
              <PhoneIncoming className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[10px] font-bold uppercase bg-black/30 px-2 py-0.5 rounded-full">
                  Incoming Live {incomingRequest.type === 'video' ? 'Video Call' : 'Chat'}
                </span>
                <span className="text-xs text-amber-100 font-mono">{incomingRequest.waitTime}</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg font-['Cinzel',serif] mt-0.5">
                {incomingRequest.clientName} ({incomingRequest.city})
              </h3>
              <p className="text-xs text-amber-100">
                Topic: {incomingRequest.topic} • Rate: ₹{incomingRequest.rate}/min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setHasIncomingRequest(false)}
              className="px-4 py-2.5 rounded-xl bg-black/30 hover:bg-black/40 text-white text-xs font-semibold"
            >
              Decline
            </button>
            <button
              onClick={() => {
                setHasIncomingRequest(false);
                onAcceptIncomingCall(incomingRequest.clientName, incomingRequest.type);
              }}
              className="px-6 py-2.5 rounded-xl bg-white text-rose-900 hover:bg-amber-50 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-rose-600" />
              <span>Accept & Start Call</span>
            </button>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Today's Total Earnings</span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-['Cinzel',serif]">
            ₹{earnings}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +24% vs yesterday
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Consultation Minutes</span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-['Cinzel',serif]">
            182 Mins
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">8 Successful Sessions</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Yajman Rating</span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-['Cinzel',serif] flex items-center gap-1.5">
            <span>4.98</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-500 inline" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">100% Positive Feedback</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Available Payout</span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-1 font-['Cinzel',serif]">
              ₹{earnings}
            </div>
          </div>
          <button
            onClick={handleWithdraw}
            disabled={earnings === 0 || withdrawnSuccess}
            className="w-full py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-semibold text-xs transition-colors shadow-2xs mt-2"
          >
            {withdrawnSuccess ? 'Transferred to Bank! ✓' : 'Withdraw to Bank'}
          </button>
        </div>
      </div>

      {/* Fee Settings Card */}
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl p-5 shadow-xs">
        <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4 text-amber-600" />
          <span>Consultation Fee Preferences (Per Minute)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-600 font-medium block mb-1">
              Live Chat Fee (₹/min)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={chatPrice}
                onChange={(e) => setChatPrice(parseInt(e.target.value) || 20)}
                className="w-32 px-3 py-2 rounded-xl border border-amber-200 bg-white font-bold text-sm"
              />
              <span className="text-slate-500">Standard market rate: ₹15 - ₹35</span>
            </div>
          </div>

          <div>
            <label className="text-slate-600 font-medium block mb-1">
              Live Video Call Fee (₹/min)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={videoPrice}
                onChange={(e) => setVideoPrice(parseInt(e.target.value) || 35)}
                className="w-32 px-3 py-2 rounded-xl border border-amber-200 bg-white font-bold text-sm"
              />
              <span className="text-slate-500">Standard market rate: ₹30 - ₹60</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Consultations and Reviews */}
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl p-5 shadow-xs">
        <h3 className="font-bold text-sm text-slate-900 mb-3">
          Recent Consultations & Yajman Reviews
        </h3>

        <div className="space-y-3">
          {recentConsultations.map((c) => (
            <div
              key={c.id}
              className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{c.client}</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                    {c.mode} • {c.duration}
                  </span>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-slate-600 mt-1 italic">"{c.review}"</p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0">
                <span className="font-bold text-emerald-700 text-sm font-['Cinzel',serif]">
                  +{c.earned}
                </span>
                <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
                  {[...Array(c.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
