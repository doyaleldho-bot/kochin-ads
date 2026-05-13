
import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const ReviewSection = ({ serviceId }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Arun K.', rating: 5, comment: 'Best agency in Kochi for digital ads!', date: '2023-12-01', helpful: 12 },
    { id: 2, user: 'Priya S.', rating: 4, comment: 'Great service, but slightly expensive.', date: '2023-11-20', helpful: 5 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user) return alert('Please login to review');
    
    // In real app, submit to Supabase
    const newReview = {
        id: Date.now(),
        user: 'You',
        rating,
        comment,
        date: new Date().toISOString().split('T')[0],
        helpful: 0
    };
    setReviews([newReview, ...reviews]);
    setComment('');
    setRating(0);
  };

  return (
    <div className="py-8 border-t border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Customer Reviews</h3>
        
        {/* Review Form */}
        <div className="bg-slate-50 p-6 rounded-xl mb-8">
            <h4 className="font-medium mb-4">Write a Review</h4>
            <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                    <Star 
                        key={s} 
                        className={`cursor-pointer w-6 h-6 ${s <= rating ? 'text-[#DAA520] fill-current' : 'text-slate-300'}`}
                        onClick={() => setRating(s)}
                    />
                ))}
            </div>
            <textarea 
                className="w-full p-3 border border-slate-200 rounded-lg mb-4 text-sm focus:ring-2 focus:ring-[#008080] outline-none"
                rows="3"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <Button onClick={handleSubmit} className="bg-[#1F2937]">Submit Review</Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
            {reviews.map(r => (
                <div key={r.id} className="border-b border-slate-100 pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-slate-800">{r.user}</div>
                        <span className="text-xs text-slate-400">{r.date}</span>
                    </div>
                    <div className="flex text-[#DAA520] mb-2">
                        {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{r.comment}</p>
                    <div className="flex gap-4 text-xs text-slate-400">
                        <button className="flex items-center gap-1 hover:text-slate-600"><ThumbsUp size={12}/> Helpful ({r.helpful})</button>
                        <button className="flex items-center gap-1 hover:text-slate-600"><ThumbsDown size={12}/> Not Helpful</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ReviewSection;
