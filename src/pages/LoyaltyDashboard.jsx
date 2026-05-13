
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Award, TrendingUp, Crown, Clock, CheckCircle, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const LoyaltyDashboard = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [pointsData, setPointsData] = useState({ balance: 0, lifetime: 0, tier: 'Bronze' });
  const [history, setHistory] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Rewards Catalog
  const rewards = [
    { id: 1, title: '₹500 Off Next Order', cost: 500, type: 'discount' },
    { id: 2, title: 'Free Social Media Audit', cost: 1000, type: 'service' },
    { id: 3, title: '10% Off Billboard Ad', cost: 2000, type: 'discount' },
    { id: 4, title: 'Exclusive Merchandise', cost: 3000, type: 'merch' },
  ];

  // Tier Benefits
  const tiers = {
    Bronze: { min: 0, benefits: ['Earn 1pt per ₹100', 'Birthday Bonus'] },
    Silver: { min: 2000, benefits: ['Earn 1.5pts per ₹100', 'Priority Support', 'Quarterly Offers'] },
    Gold: { min: 5000, benefits: ['Earn 2pts per ₹100', 'Dedicated Account Manager', 'Free Audits'] },
    Platinum: { min: 10000, benefits: ['Earn 3pts per ₹100', 'VIP Events', 'All Fees Waived'] },
  };

  // Mock Leaderboard
  const leaderboard = [
    { name: "Sarah M.", points: 12500 },
    { name: "John D.", points: 9800 },
    { name: "TechCorp", points: 8200 },
    { name: "You", points: pointsData.lifetime || 0 }
  ].sort((a,b) => b.points - a.points);

  useEffect(() => {
    if (!user) return;

    const fetchLoyaltyData = async () => {
      try {
        const { data: profile } = await supabase.from('loyalty_profiles').select('*').eq('user_id', user.id).single();

        if (profile) {
          setPointsData({ balance: profile.points_balance, lifetime: profile.lifetime_points, tier: profile.tier });
          const { data: txs } = await supabase.from('loyalty_transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
          setHistory(txs || []);
        } else {
            // Init Logic (Simplified)
            setPointsData({ balance: 50, lifetime: 50, tier: 'Bronze' });
            setHistory([{ id: 'init', type: 'bonus', points: 50, description: 'Welcome Bonus', created_at: new Date().toISOString() }]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchLoyaltyData();
  }, [user]);

  const handleRedeem = async (reward) => {
      if (pointsData.balance < reward.cost) {
          toast({ variant: "destructive", title: "Insufficient Points" });
          return;
      }
      setPointsData(prev => ({ ...prev, balance: prev.balance - reward.cost }));
      toast({ title: "Reward Redeemed! 🎉", description: `${reward.title} coupon sent to email.` });
  };

  if (loading || isLoadingData) return <div className="min-h-screen pt-20 flex justify-center items-center">Loading Rewards...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const nextTier = Object.entries(tiers).find(([, val]) => val.min > pointsData.lifetime);
  const nextTierName = nextTier ? nextTier[0] : 'Max Level';
  const progress = nextTier ? ((pointsData.lifetime - (tiers[pointsData.tier]?.min || 0)) / (nextTier[1].min - (tiers[pointsData.tier]?.min || 0))) * 100 : 100;

  return (
    <>
      <Helmet><title>Loyalty Rewards - Kochin Ads</title></Helmet>
      <div className="pt-24 pb-12 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header / Summary */}
            <div className="bg-[#008080] rounded-2xl p-8 text-white shadow-xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="flex items-center gap-2 text-[#DAA520] font-bold mb-2 uppercase tracking-wider text-sm">
                            <Crown className="w-4 h-4" /> {pointsData.tier} Member
                        </div>
                        <h1 className="text-4xl font-bold mb-2">{pointsData.balance.toLocaleString()} Points</h1>
                        <div className="w-full bg-black/20 rounded-full h-3 mb-2">
                            <div className="bg-[#DAA520] h-3 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-xs text-blue-200">Next Tier: {nextTierName}</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Rewards Catalog */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Gift className="text-[#008080]" /> Redeem Rewards
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {rewards.map(reward => (
                            <motion.div key={reward.id} whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">{reward.title}</h3>
                                    <p className="text-slate-500 text-sm mb-4">Valid for 90 days.</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="font-bold text-[#008080]">{reward.cost} pts</span>
                                    <Button size="sm" onClick={() => handleRedeem(reward)} disabled={pointsData.balance < reward.cost}>Redeem</Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Leaderboard & History */}
                <div className="space-y-8">
                    {/* Leaderboard */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Trophy className="text-yellow-500 w-5 h-5"/> Top Members</h3>
                        <div className="space-y-4">
                            {leaderboard.map((member, i) => (
                                <div key={i} className={`flex items-center justify-between ${member.name === 'You' ? 'bg-teal-50 p-2 rounded border border-teal-100' : ''}`}>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-400 w-4">{i+1}</span>
                                        <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center"><User className="w-3 h-3"/></div>
                                        <span className="text-sm font-medium">{member.name}</span>
                                    </div>
                                    <span className="font-bold text-teal-600 text-sm">{member.points.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default LoyaltyDashboard;
