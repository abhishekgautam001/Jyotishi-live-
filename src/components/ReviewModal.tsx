import React, { useState } from 'react';
import { X, Star, Heart, CheckCircle2, MessageSquare } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologerName: string;
  consultationType: 'chat' | 'video';
  durationMinutes: number;
  amountDeducted: number;
  onSubmitReview: (rating: number, review: string, tags: string[]) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  astrologerName,
  consultationType,
  durationMinutes,
  amountDeducted,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Very Calming', 'Positive Remedies']);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const tagsList = [
    'Very Calming',
    'Positive Remedies',
    'Accurate Analysis',
    'Patient Listener',
    'Simple Satvik Upaay',
    'Uplifting Energy',
    'Career Clarity',
    'Family Peace'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitReview(rating, reviewText, selectedTags);
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border border-amber-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base font-['Cinzel',serif]">Consultation Completed</h3>
            <p className="text-xs text-amber-100">With {astrologerName}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bill Summary */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-around text-center text-xs">
          <div>
            <span className="text-slate-500">Mode</span>
            <p className="font-bold text-slate-800 uppercase">{consultationType}</p>
          </div>
          <div className="h-7 w-px bg-amber-200" />
          <div>
            <span className="text-slate-500">Duration</span>
            <p className="font-bold text-slate-800">{durationMinutes} Min{durationMinutes > 1 ? 's' : ''}</p>
          </div>
          <div className="h-7 w-px bg-amber-200" />
          <div>
            <span className="text-slate-500">Wallet Billed</span>
            <p className="font-bold text-rose-700 font-['Cinzel',serif]">₹{amountDeducted}</p>
          </div>
        </div>

        {/* Review Form */}
        <div className="p-5 overflow-y-auto space-y-4">
          {isSubmitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 animate-bounce">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900 font-['Cinzel',serif]">Thank you for your review!</h4>
              <p className="text-xs text-slate-500 mt-1">Your feedback helps fellow devotees find the right guidance.</p>
            </div>
          ) : (
            <>
              {/* Star Rating */}
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-700 mb-1.5">How was your spiritual session?</p>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-medium text-amber-800 block mt-1">
                  {rating === 5 ? 'Excellent & Divine Guidance! 🌟' : rating >= 4 ? 'Very Helpful & Positive! ✨' : 'Good Consultation'}
                </span>
              </div>

              {/* Tags */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                  What did you like the most?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {tagsList.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                          active
                            ? 'bg-amber-600 text-white border-amber-700 font-semibold shadow-2xs'
                            : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Write Your Review (Optional)
                </label>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share how the positive advice or remedies helped you..."
                  className="w-full text-xs p-2.5 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="p-4 bg-amber-50/40 border-t border-amber-200/60 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Skip
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
