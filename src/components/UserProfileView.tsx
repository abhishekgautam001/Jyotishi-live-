import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  ScrollText, 
  CheckCircle2, 
  ShieldCheck, 
  Bell, 
  Save,
  Crown
} from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateToKundali: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onNavigateToKundali,
}) => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const rashiList = [
    'Mesh (Aries)',
    'Vrishabh (Taurus)',
    'Mithun (Gemini)',
    'Kark (Cancer)',
    'Simha (Leo)',
    'Kanya (Virgo)',
    'Tula (Libra)',
    'Vrishchik (Scorpio)',
    'Dhanu (Sagittarius)',
    'Makar (Capricorn)',
    'Kumbh (Aquarius)',
    'Meen (Pisces)'
  ];

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header Profile Badge */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 text-white shadow-xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400/20 border-2 border-amber-300/60 flex items-center justify-center text-white text-2xl font-bold font-['Cinzel',serif] shadow-md">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif]">
                {profile.name}
              </h2>
              <span className="text-[10px] uppercase font-bold bg-amber-400/30 border border-amber-300/50 px-2 py-0.5 rounded-full">
                Yajman
              </span>
            </div>
            <p className="text-xs text-amber-100 mt-0.5">
              Rashi: {profile.rashi} • Gotra: {profile.gotra || 'Kashyap'} • {profile.pob}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-amber-200">
              <span>DOB: {profile.dob}</span>
              <span>•</span>
              <span>TOB: {profile.tob}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToKundali}
          className="px-4 py-2 rounded-xl bg-white text-rose-900 font-bold text-xs hover:bg-amber-50 shadow-sm transition-all flex items-center gap-1.5 shrink-0"
        >
          <ScrollText className="w-4 h-4 text-rose-700" />
          <span>View My Kundali</span>
        </button>
      </div>

      {/* Subscription Tier & Ad Guarantee Card */}
      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-900 font-bold">
            <Crown className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 font-['Cinzel',serif] text-sm">
                सक्रिय सदस्यता: <span className="uppercase text-amber-900">{profile.subscriptionPlan || 'FREE'}</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                profile.subscriptionPlan && profile.subscriptionPlan !== 'free' && profile.subscriptionPlan !== 'none'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {profile.subscriptionPlan && profile.subscriptionPlan !== 'free' && profile.subscriptionPlan !== 'none'
                  ? 'Ad-Free Active'
                  : 'Ad-Supported'}
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-0.5">
              {profile.subscriptionPlan && profile.subscriptionPlan !== 'free' && profile.subscriptionPlan !== 'none'
                ? '✓ 100% शून्य ऑटोमैटिक ऐड • केवल इच्छानुसार रिवॉर्ड ऐड्स देखने का विकल्प।'
                : 'फ्री प्लान में प्रायोजित विज्ञापन सक्रिय हैं। ₹79 से शुरू कर ऑटोमैटिक ऐड्स हटाएं।'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNavigateToKundali}
          className="px-3.5 py-1.5 bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold rounded-xl text-xs transition-colors shrink-0"
        >
          प्लान अपग्रेड करें →
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-amber-200">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-['Cinzel',serif]">
              Birth Chart & Profile Details
            </h3>
            <p className="text-xs text-slate-500">
              Required for accurate Kundali creation and live astrologer guidance
            </p>
          </div>

          {isSaved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Profile Saved Successfully!
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Date of Birth</label>
              <input
                type="date"
                required
                value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Time of Birth */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Time of Birth (e.g. 07:45 AM)</label>
              <input
                type="text"
                value={profile.tob}
                onChange={(e) => setProfile({ ...profile, tob: e.target.value })}
                placeholder="07:45 AM"
                className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Place of Birth */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Place of Birth (City, State)</label>
              <input
                type="text"
                value={profile.pob}
                onChange={(e) => setProfile({ ...profile, pob: e.target.value })}
                placeholder="Varanasi, UP"
                className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Moon Sign (Rashi) */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Chandra Rashi (Zodiac)</label>
              <select
                value={profile.rashi}
                onChange={(e) => setProfile({ ...profile, rashi: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {rashiList.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Gotra */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Gotra (Optional)</label>
              <input
                type="text"
                value={profile.gotra}
                onChange={(e) => setProfile({ ...profile, gotra: e.target.value })}
                placeholder="Kashyap, Vashistha, etc."
                className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-amber-200 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
