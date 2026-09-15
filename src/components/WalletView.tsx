import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles, 
  CreditCard, 
  Tv, 
  ShieldCheck, 
  Clock,
  Filter
} from 'lucide-react';
import { WalletTransaction } from '../types';

interface WalletViewProps {
  walletBalance: number;
  transactions: WalletTransaction[];
  openWalletModal: () => void;
  openAdModal: () => void;
  openAdInspector?: () => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  walletBalance,
  transactions,
  openWalletModal,
  openAdModal,
  openAdInspector,
}) => {
  const [filter, setFilter] = useState<'all' | 'recharge' | 'consult' | 'ad_reward'>('all');

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'recharge') return t.category === 'recharge';
    if (filter === 'consult') return t.category === 'chat_consult' || t.category === 'video_consult';
    if (filter === 'ad_reward') return t.category === 'ad_reward';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Balance Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider bg-amber-400/20 border border-amber-300/40 px-3 py-0.5 rounded-full text-amber-200">
              Jyotishi Live Sacred Wallet
            </span>
          </div>
          <span className="text-xs text-amber-100 block mt-2">Available Consultation Balance</span>
          <div className="text-4xl sm:text-5xl font-bold font-['Cinzel',serif] mt-1 text-white">
            ₹{walletBalance}
          </div>
          <p className="text-xs text-amber-200/90 mt-1">
            Valid for live chat, video consultation, and personalized Kundali services.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={openWalletModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-rose-950 font-bold text-sm shadow-md hover:bg-amber-50 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <CreditCard className="w-4 h-4 text-rose-700" />
            <span>+ Add Money</span>
          </button>

          <button
            onClick={openAdModal}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500/30 hover:bg-amber-500/40 border border-amber-300 text-amber-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Tv className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Watch Google Ad (+₹25)</span>
          </button>

          {openAdInspector && (
            <button
              onClick={openAdInspector}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-black/40 hover:bg-black/60 border border-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              title="Inspect official Google AdMob IDs & formats"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Google AdMob Suite</span>
            </button>
          )}
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-amber-200">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-['Cinzel',serif]">
              Passbook & Transaction History
            </h3>
            <p className="text-xs text-slate-500">
              Complete itemized ledger of consultations, recharges & ad bonuses
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full border transition-all ${
                filter === 'all'
                  ? 'bg-amber-600 text-white border-amber-700 font-semibold'
                  : 'bg-white border-amber-200 text-slate-600 hover:bg-amber-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('recharge')}
              className={`px-3 py-1 rounded-full border transition-all ${
                filter === 'recharge'
                  ? 'bg-amber-600 text-white border-amber-700 font-semibold'
                  : 'bg-white border-amber-200 text-slate-600 hover:bg-amber-50'
              }`}
            >
              Recharges
            </button>
            <button
              onClick={() => setFilter('consult')}
              className={`px-3 py-1 rounded-full border transition-all ${
                filter === 'consult'
                  ? 'bg-amber-600 text-white border-amber-700 font-semibold'
                  : 'bg-white border-amber-200 text-slate-600 hover:bg-amber-50'
              }`}
            >
              Consultations
            </button>
            <button
              onClick={() => setFilter('ad_reward')}
              className={`px-3 py-1 rounded-full border transition-all ${
                filter === 'ad_reward'
                  ? 'bg-amber-600 text-white border-amber-700 font-semibold'
                  : 'bg-white border-amber-200 text-slate-600 hover:bg-amber-50'
              }`}
            >
              Ad Rewards
            </button>
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No transactions found in this category.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTransactions.map((tx) => {
              const isCredit = tx.type === 'credit';
              return (
                <div
                  key={tx.id}
                  className="p-3.5 rounded-xl border border-amber-100 bg-white hover:border-amber-300 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isCredit ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {isCredit ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{tx.title}</h4>
                      <p className="text-[11px] text-slate-500">{tx.description}</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {tx.timestamp} • Txn ID: {tx.id}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`font-bold text-sm sm:text-base font-['Cinzel',serif] ${
                        isCredit ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCredit ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                    </span>
                    <span className="text-[10px] block text-emerald-700 font-semibold capitalize">
                      {tx.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
