import React, { useState, useEffect } from 'react';
import { 
  ScrollText, 
  Sparkles, 
  Sun, 
  Moon, 
  Compass, 
  Heart, 
  ShieldCheck, 
  Download, 
  Printer, 
  RefreshCw,
  Crown,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Flame
} from 'lucide-react';
import { KundaliData, UserProfile } from '../types';
import { GoogleBannerAd } from './GoogleBannerAd';

interface KundaliViewProps {
  userProfile: UserProfile;
  onOpenSubscriptions: () => void;
}

export const KundaliView: React.FC<KundaliViewProps> = ({
  userProfile,
  onOpenSubscriptions,
}) => {
  const [kundali, setKundali] = useState<KundaliData | null>(null);
  const [loading, setLoading] = useState(false);
  const [formName, setFormName] = useState(userProfile.name);
  const [formDob, setFormDob] = useState(userProfile.dob);
  const [formTob, setFormTob] = useState(userProfile.tob);
  const [formPob, setFormPob] = useState(userProfile.pob);
  const [formGender, setFormGender] = useState(userProfile.gender);
  const [formRashi, setFormRashi] = useState(userProfile.rashi);
  const [activeTab, setActiveTab] = useState<'chart' | 'planets' | 'remedies' | 'analysis'>('chart');

  const fetchKundali = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/kundali/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          dob: formDob,
          tob: formTob,
          pob: formPob,
          gender: formGender,
          rashi: formRashi,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setKundali(data);
      }
    } catch {
      // Gracefully handled
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKundali();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400/20 border border-amber-300/40 px-2.5 py-0.5 rounded-full text-amber-200">
            Vedic Horoscope & Planetary Alignment
          </span>
          <h1 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold mt-1 text-white">
            Personalized Kundali & Satvik Dosha Nivaran
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-xl">
            100% positive interpretation based on Parashara Vedic principles. No frightening predictions; only uplifting remedies for growth and inner peace.
          </p>
        </div>

        <button
          onClick={onOpenSubscriptions}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-amber-950 font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 shrink-0 transition-all active:scale-95"
        >
          <Crown className="w-4 h-4 text-amber-900" />
          <span>Unlock 40-Page Kundali PDF</span>
        </button>
      </div>

      {/* Input Edit Bar */}
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl p-4 shadow-xs">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Birth Details for Kundali Generation</span>
          <button
            onClick={fetchKundali}
            disabled={loading}
            className="text-amber-800 hover:text-amber-950 flex items-center gap-1 text-xs font-semibold capitalize"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Regenerate Chart</span>
          </button>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Name</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Date of Birth</label>
            <input
              type="date"
              value={formDob}
              onChange={(e) => setFormDob(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Birth Time</label>
            <input
              type="text"
              value={formTob}
              onChange={(e) => setFormTob(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Birth Place</label>
            <input
              type="text"
              value={formPob}
              onChange={(e) => setFormPob(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Gender</label>
            <select
              value={formGender}
              onChange={(e) => setFormGender(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white focus:ring-1 focus:ring-amber-500"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-500 font-medium block mb-1">Zodiac (Rashi)</label>
            <input
              type="text"
              value={formRashi}
              onChange={(e) => setFormRashi(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Main Kundali Content Display */}
      {loading || !kundali ? (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-700 font-['Cinzel',serif]">
            Generating Vedic Lagna Chart & Calculating Auspicious Planetary Alignments...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Favorable Quick Traits Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block">Lagna (Ascendant)</span>
              <span className="text-xs sm:text-sm font-bold text-amber-900 font-['Cinzel',serif]">
                {kundali.lagna}
              </span>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block">Chandra Rashi</span>
              <span className="text-xs sm:text-sm font-bold text-amber-900 font-['Cinzel',serif]">
                {kundali.rashi}
              </span>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block">Nakshatra</span>
              <span className="text-xs sm:text-sm font-bold text-amber-900 font-['Cinzel',serif]">
                {kundali.nakshatra}
              </span>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block">Lucky Number</span>
              <span className="text-xs sm:text-sm font-bold text-amber-900 font-['Cinzel',serif]">
                {kundali.luckyNumber}
              </span>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block">Lucky Color</span>
              <span className="text-xs sm:text-sm font-bold text-amber-900 truncate block">
                {kundali.luckyColor.split(' ')[0]}
              </span>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block">Favorable Deity</span>
              <span className="text-xs sm:text-sm font-bold text-amber-900 truncate block">
                Shiva & Surya
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-amber-200 text-xs sm:text-sm font-semibold gap-2 sm:gap-6 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('chart')}
              className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'chart'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ScrollText className="w-4 h-4" />
              <span>North Indian Lagna Chart</span>
            </button>

            <button
              onClick={() => setActiveTab('planets')}
              className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'planets'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>9 Graha Status & Dignity</span>
            </button>

            <button
              onClick={() => setActiveTab('remedies')}
              className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'remedies'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Satvik Upaay (Daily Remedies)</span>
            </button>

            <button
              onClick={() => setActiveTab('analysis')}
              className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'analysis'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Positive Life Guidance</span>
            </button>
          </div>

          {/* Tab 1: North Indian Kundali Geometric Chart */}
          {activeTab === 'chart' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Sacred North Indian Vedic Diamond Kundali Canvas */}
              <div className="bg-[#FFFDF9] border-2 border-amber-400/90 rounded-2xl p-4 sm:p-6 shadow-md flex items-center justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-amber-50/50 border-2 border-amber-600 shadow-inner">
                  {/* Outer diagonal crosses */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    {/* Diagonals */}
                    <line x1="0" y1="0" x2="100" y2="100" stroke="#b45309" strokeWidth="1.5" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke="#b45309" strokeWidth="1.5" />
                    {/* Inner Diamond */}
                    <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="#b45309" strokeWidth="1.5" />
                  </svg>

                  {/* House labels & planets */}
                  {/* House 1 (Top Center diamond) */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-xs font-bold text-amber-900">
                    <span className="text-[10px] text-amber-700 block">1 (Lagna)</span>
                    <span className="text-rose-700">Surya</span>
                  </div>

                  {/* House 2 (Top Left) */}
                  <div className="absolute top-2 left-6 text-center text-[10px] font-semibold text-slate-700">
                    <span>2</span>
                  </div>

                  {/* House 3 (Left Top triangle) */}
                  <div className="absolute top-16 left-3 text-center text-[10px] font-semibold text-slate-700">
                    <span>3: Rahu</span>
                  </div>

                  {/* House 4 (Left center diamond) */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-6 text-center text-xs font-bold text-amber-900">
                    <span className="text-[10px] text-amber-700 block">4 (Sukha)</span>
                    <span className="text-emerald-700">Chandra</span>
                  </div>

                  {/* House 5 (Left bottom triangle) */}
                  <div className="absolute bottom-16 left-3 text-center text-[10px] font-semibold text-slate-700">
                    <span>5: Budh</span>
                  </div>

                  {/* House 6 (Bottom Left) */}
                  <div className="absolute bottom-2 left-6 text-center text-[10px] font-semibold text-slate-700">
                    <span>6: Shani</span>
                  </div>

                  {/* House 7 (Bottom Center diamond) */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs font-bold text-amber-900">
                    <span className="text-[10px] text-amber-700 block">7 (Kalatra)</span>
                    <span className="text-purple-700">Guru</span>
                  </div>

                  {/* House 8 (Bottom Right) */}
                  <div className="absolute bottom-2 right-6 text-center text-[10px] font-semibold text-slate-700">
                    <span>8</span>
                  </div>

                  {/* House 9 (Right bottom triangle) */}
                  <div className="absolute bottom-16 right-3 text-center text-[10px] font-semibold text-slate-700">
                    <span>9: Ketu</span>
                  </div>

                  {/* House 10 (Right center diamond) */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-6 text-center text-xs font-bold text-amber-900">
                    <span className="text-[10px] text-amber-700 block">10 (Karma)</span>
                    <span className="text-rose-700">Mangal</span>
                  </div>

                  {/* House 11 (Right top triangle) */}
                  <div className="absolute top-16 right-3 text-center text-[10px] font-semibold text-slate-700">
                    <span>11: Shukra</span>
                  </div>

                  {/* House 12 (Top Right) */}
                  <div className="absolute top-2 right-6 text-center text-[10px] font-semibold text-slate-700">
                    <span>12</span>
                  </div>
                </div>
              </div>

              {/* Chart Insights */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Auspicious Yog: Budhaditya & Gajakesari Yog</span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    Aapki kundali me Surya aur Budh ka prabhav prathiba aur vicharon me tejasvi spashat-ta lata hai. Guru ki shubh drishti man ko shanti aur parivar me aashirwaad pradan karti hai.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl">
                  <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                    <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Lagna Bal: Surya (Sun) in 1st House</span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    Surya Dev aapke aatmabal aur pratishtha ke swami hain. Pratahkaal Surya arghya dene se aapka aatmavishwas koti guna badhta hai.
                  </p>
                </div>

                <div className="p-4 bg-rose-50/80 border border-rose-200/80 rounded-2xl">
                  <div className="flex items-center gap-2 text-rose-900 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Zero Fear Promise (Shanti & Protection)</span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    Jyotishi Live me kisi bhi dosh se daraya nahi jata. Shani ya Rahu koi vinashak nahi balki hume dhairya aur satkarma ki or le jane wale margdarshak hain.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Planetary Positions Table */}
          {activeTab === 'planets' && (
            <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-amber-100/70 text-amber-950 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Graha (Planet)</th>
                      <th className="p-3">House (Bhava)</th>
                      <th className="p-3">Dignity</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Positive Influence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    {kundali.planets.map((p, i) => (
                      <tr key={i} className="hover:bg-amber-50/50 transition-colors">
                        <td className="p-3 font-semibold text-slate-800">{p.name}</td>
                        <td className="p-3 text-slate-600">{p.house}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-medium">
                            {p.dignity}
                          </span>
                        </td>
                        <td className="p-3 text-emerald-700 font-medium">{p.status}</td>
                        <td className="p-3 text-slate-600">{p.influence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Satvik Daily Remedies */}
          {activeTab === 'remedies' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {kundali.remedies.map((rem, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/60 to-white shadow-xs flex gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 font-['Cinzel',serif]">{rem.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rem.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Virtual Pandit Ji Analysis & Vedic Life Guidance */}
          {activeTab === 'analysis' && (
            <div className="p-5 sm:p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold font-['Cinzel',serif]">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>वर्चुअल पंडित जी का व्यक्तिगत वैदिक मार्गदर्शन (Virtual Pandit Ji Vedic Reading)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {kundali.aiAnalysis}
              </p>

              <div className="pt-4 border-t border-amber-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 italic">
                  Guided by ancient Parashara Jyotish • 100% Satvik
                </span>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950 underline"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Chart</span>
                </button>
              </div>
            </div>
          )}

          {/* Google AdMob Banner Ad (Compact & Clean) */}
          <GoogleBannerAd variant="compact" label="कुंडली व वैदिक उपाय" />
        </div>
      )}
    </div>
  );
};
