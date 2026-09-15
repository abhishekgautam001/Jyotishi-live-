import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  CreditCard, 
  QrCode, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Lock,
  Gift,
  Tv
} from 'lucide-react';
import { WalletTransaction } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  onAddMoney: (amount: number, bonus: number) => void;
  transactions: WalletTransaction[];
  onWatchAdReward?: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
  onAddMoney,
  transactions,
  onWatchAdReward,
}) => {
  const [selectedPack, setSelectedPack] = useState<{ amount: number; bonus: number }>({ amount: 250, bonus: 35 });
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  if (!isOpen) return null;

  const rechargePacks = [
    { amount: 100, bonus: 10, label: 'Starter', popular: false },
    { amount: 250, bonus: 35, label: 'Recommended', popular: true },
    { amount: 500, bonus: 100, label: 'Best Value', popular: false },
    { amount: 1000, bonus: 250, label: 'VIP Pack', popular: false },
  ];

  const handleRecharge = () => {
    const finalAmount = customAmount ? parseInt(customAmount) || 100 : selectedPack.amount;
    const finalBonus = customAmount ? Math.floor(finalAmount * 0.1) : selectedPack.bonus;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onAddMoney(finalAmount, finalBonus);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Jyotishi Live Wallet</h3>
              <p className="text-xs text-amber-100">Secure In-App Consultation Balance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Showcase */}
        <div className="px-5 py-4 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Available Balance</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-baseline gap-1 font-['Cinzel',serif]">
              <span>₹{walletBalance}</span>
              <span className="text-xs font-normal text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline"
          >
            {showHistory ? 'Back to Recharge' : 'View Passbook'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Cinzel',serif]">Payment Successful!</h4>
              <p className="text-sm text-slate-600 mt-1">
                Your wallet has been topped up instantly. Start your consultation now!
              </p>
            </div>
          ) : isProcessing ? (
            <div className="py-14 text-center flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
              <h4 className="text-base font-semibold text-slate-800">Processing Secure Payment...</h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                256-Bit Bank Grade SSL Encryption
              </p>
            </div>
          ) : showHistory ? (
            /* Transaction History Passbook */
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-3">Transaction Passbook</h4>
              {transactions.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">No transactions yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-xl border border-amber-100 bg-white shadow-2xs flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{tx.title}</p>
                        <p className="text-slate-500 text-[11px]">{tx.description}</p>
                        <span className="text-[10px] text-slate-400">{tx.timestamp} • {tx.id}</span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-bold text-sm ${
                            tx.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {tx.type === 'credit' ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                        </span>
                        <p className="text-[10px] text-emerald-700 font-medium capitalize">
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Recharge Packs */
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Select Recharge Pack (Includes Extra Bonus)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {rechargePacks.map((pack) => {
                    const isSelected = selectedPack.amount === pack.amount && !customAmount;
                    return (
                      <div
                        key={pack.amount}
                        onClick={() => {
                          setSelectedPack(pack);
                          setCustomAmount('');
                        }}
                        className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                            : 'border-amber-200/70 hover:border-amber-300 bg-white'
                        }`}
                      >
                        {pack.popular && (
                          <span className="absolute -top-2.5 right-3 text-[10px] font-bold bg-gradient-to-r from-rose-600 to-amber-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                            {pack.label}
                          </span>
                        )}
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-bold text-slate-900 font-['Cinzel',serif]">
                            ₹{pack.amount}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            +₹{pack.bonus} Free
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Get ₹{pack.amount + pack.bonus} in wallet
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Free Coins via Google AdMob Reward Ad */}
                {onWatchAdReward && (
                  <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/50 text-white flex items-center justify-between gap-2 shadow-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Gift className="w-4 h-4 text-slate-950 animate-bounce" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-amber-200 truncate">
                            मुफ्त ₹25 वॉलेट क्रेडिट पाएं
                          </span>
                          <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-xs uppercase">
                            Google AdMob
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 truncate">
                          Ad Unit: 5214161558 • 10 सेकंड वीडियो देखें
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onWatchAdReward();
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs rounded-lg shrink-0 shadow-xs active:scale-95 transition-all flex items-center gap-1"
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>देखें ▶</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Custom Amount */}
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Or Enter Custom Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="50"
                    max="50000"
                    placeholder="Enter amount (min ₹50)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-amber-600 bg-amber-50/90 text-amber-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-amber-600" />
                    <span>Instant UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-amber-600 bg-amber-50/90 text-amber-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span>Card (Debit/Credit)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-amber-600 bg-amber-50/90 text-amber-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Payment Trust Footer */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  100% Secure & PCI-DSS Compliant. Money never expires. Instant refund if call disconnects.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {!showHistory && !isProcessing && !isSuccess && (
          <div className="p-4 bg-amber-50/40 border-t border-amber-200/60 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-500">Payable Amount</span>
              <p className="text-lg font-bold text-slate-900">
                ₹{customAmount ? customAmount : selectedPack.amount}
              </p>
            </div>
            <button
              onClick={handleRecharge}
              className="flex-1 max-w-[220px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Pay & Recharge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
