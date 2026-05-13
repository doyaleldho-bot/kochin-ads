
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Users, DollarSign, BarChart3, Link as LinkIcon, Copy, CheckCircle, Calculator, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AffiliateProgram = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [affiliateData, setAffiliateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  
  // Commission Calculator State
  const [referrals, setReferrals] = useState(10);
  const [avgSale, setAvgSale] = useState(5000);

  useEffect(() => {
    if (!user) {
        setLoading(false);
        return;
    }
    const checkStatus = async () => {
        const { data } = await supabase.from('affiliates').select('*').eq('user_id', user.id).single();
        setAffiliateData(data);
        setLoading(false);
    };
    checkStatus();
  }, [user]);

  const handleJoin = async () => {
      setIsApplying(true);
      try {
          const code = `KA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
          const { data, error } = await supabase.from('affiliates').insert({
              user_id: user.id,
              referral_code: code,
              commission_rate: 5.0,
              status: 'active'
          }).select().single();

          if (error) throw error;
          setAffiliateData(data);
          toast({ title: "Welcome Aboard!", description: "You are now a Kochin Ads Affiliate." });
      } catch (err) {
          toast({ variant: "destructive", title: "Error", description: err.message });
      } finally {
          setIsApplying(false);
      }
  };

  const copyLink = () => {
      const link = `${window.location.origin}?ref=${affiliateData.referral_code}`;
      navigator.clipboard.writeText(link);
      toast({ title: "Copied!", description: "Affiliate link copied." });
  };

  // 1. Landing View
  if (!user || (!affiliateData && !loading)) {
      return (
        <div className="pt-20 min-h-screen bg-slate-50">
            <Helmet><title>Affiliate Program - Kochin Ads</title></Helmet>
            
            <section className="bg-[#1F2937] text-white py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 bg-[length:20px_20px]"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Partner With Us & Earn</h1>
                    <p className="text-xl text-slate-300 mb-8">Join the Kochin Ads Affiliate Program and earn 5% commission on every referral.</p>
                    {user ? (
                        <Button size="lg" onClick={handleJoin} disabled={isApplying} className="bg-[#DAA520] hover:bg-yellow-600 text-slate-900 font-bold px-8 h-12 text-lg">
                            {isApplying ? 'Creating Account...' : 'Become an Affiliate'}
                        </Button>
                    ) : (
                        <Button size="lg" className="bg-[#008080] hover:bg-[#006666] text-white px-8 h-12 text-lg" onClick={() => window.location.href='/login'}>
                            Login to Join
                        </Button>
                    )}
                </div>
            </section>

            {/* Earnings Calculator */}
            <section className="py-16 max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                        <Calculator className="text-teal-600"/> Estimate Your Earnings
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Monthly Referrals: {referrals}</label>
                                <input type="range" min="1" max="100" value={referrals} onChange={e => setReferrals(e.target.value)} className="w-full accent-teal-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Avg. Project Value: ₹{avgSale}</label>
                                <input type="range" min="1000" max="100000" step="1000" value={avgSale} onChange={e => setAvgSale(e.target.value)} className="w-full accent-teal-600" />
                            </div>
                        </div>
                        <div className="text-center bg-teal-50 p-6 rounded-xl">
                            <p className="text-sm text-slate-500 mb-2">Potential Monthly Income</p>
                            <div className="text-4xl font-bold text-teal-700">₹{(referrals * avgSale * 0.05).toLocaleString()}</div>
                            <p className="text-xs text-slate-400 mt-2">Based on 5% commission rate</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      );
  }

  if (loading) return <div>Loading...</div>;

  // 2. Dashboard View
  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
        <Helmet><title>Affiliate Dashboard - Kochin Ads</title></Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Affiliate Dashboard</h1>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Active Partner
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Total Earnings</p>
                    <h3 className="text-3xl font-bold text-slate-900">₹{affiliateData.total_earnings || 0}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Commission Rate</p>
                    <h3 className="text-3xl font-bold text-[#008080]">{affiliateData.commission_rate}%</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500 mb-1">Next Payout</p>
                    <h3 className="text-3xl font-bold text-slate-900">₹0</h3>
                    <p className="text-xs text-slate-400 mt-1">Min payout ₹1,000</p>
                </div>
            </div>

            {/* Top Affiliates Leaderboard (Simulated) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Trophy className="text-yellow-500" /> Top Performers</h3>
                <div className="space-y-3">
                    {[
                        { name: "Arun Digital", earned: "₹45,000" },
                        { name: "Kerala Influencers", earned: "₹32,500" },
                        { name: "Kochi Tech Blog", earned: "₹18,200" }
                    ].map((p, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="font-medium text-slate-700">#{i+1} {p.name}</span>
                            <span className="font-bold text-teal-700">{p.earned}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Link Generator */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-8">
                <h3 className="font-bold text-lg mb-4">Your Referral Tools</h3>
                <div className="flex gap-4 items-center">
                    <div className="flex-grow relative">
                        <input 
                            type="text" 
                            readOnly 
                            value={`${window.location.origin}?ref=${affiliateData.referral_code}`} 
                            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 font-mono text-sm"
                        />
                    </div>
                    <Button onClick={copyLink} className="bg-[#1F2937]"><Copy className="w-4 h-4 mr-2" /> Copy Link</Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AffiliateProgram;
