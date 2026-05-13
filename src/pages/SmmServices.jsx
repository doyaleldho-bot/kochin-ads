
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Facebook, Instagram, Twitter, Youtube, Linkedin, MessageCircle, Send,
  TrendingUp, Users, Target, BarChart, CheckCircle, Zap, Globe, Smartphone,
  DollarSign, PieChart, Shield, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { calculatePrice } from '@/data/smmCatalog';

const PlatformCard = ({ icon: Icon, name, color, features }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br ${color}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{name} Marketing</h3>
    <ul className="space-y-2">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
          {f}
        </li>
      ))}
    </ul>
  </motion.div>
);

const PricingCard = ({ title, price, features, recommended = false }) => (
  <div className={`relative p-8 rounded-2xl border ${recommended ? 'border-teal-500 bg-teal-50/50' : 'border-slate-200 bg-white'} shadow-sm`}>
    {recommended && (
      <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
        POPULAR
      </div>
    )}
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <div className="flex items-end gap-1 mb-6">
      <span className="text-3xl font-bold text-slate-900">{price}</span>
      <span className="text-sm text-slate-500 mb-1">/month</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
          <CheckCircle className="w-4 h-4 text-teal-600" />
          {f}
        </li>
      ))}
    </ul>
    <Link to="/contact">
        <Button className={`w-full ${recommended ? 'bg-teal-600 hover:bg-teal-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
        Get Started
        </Button>
    </Link>
  </div>
);

const SmmServices = () => {
  const [calculatorBudget, setCalculatorBudget] = useState(10000);
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');

  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'from-purple-500 to-pink-500', features: ['Story & Reel Ads', 'Influencer Collabs', 'Organic Growth', 'Shop Integration'] },
    { name: 'WhatsApp', icon: MessageCircle, color: 'from-green-500 to-emerald-600', features: ['Broadcast Lists', 'Status Ads', 'Business API', 'Auto-replies'] },
    { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700', features: ['Local District Ads', 'Marketplace Listing', 'Community Groups', 'Lead Gen Forms'] },
    { name: 'Telegram', icon: Send, color: 'from-sky-400 to-blue-500', features: ['Channel Growth', 'Bot Development', 'Sponsored Messages', 'Group Management'] },
    { name: 'YouTube', icon: Youtube, color: 'from-red-600 to-red-700', features: ['Video SEO', 'Pre-roll Ads', 'Channel Management', 'Content Strategy'] },
    { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800', features: ['B2B Lead Gen', 'Company Page', 'Sponsored Content', 'InMail Campaigns'] },
  ];

  const packages = [
    {
      title: 'Starter',
      price: '₹15,000',
      features: ['2 Social Platforms', '8 Posts/Month', 'Basic Community Mgmt', 'Monthly Report']
    },
    {
      title: 'Professional',
      price: '₹35,000',
      recommended: true,
      features: ['4 Social Platforms', '15 Posts/Month', 'Reels & Stories', 'Ad Campaign Setup', 'Bi-weekly Report']
    },
    {
      title: 'Enterprise',
      price: '₹75,000',
      features: ['All Platforms', 'Daily Posting', 'Video Production', 'Influencer Marketing', '24/7 Support', 'Weekly Report']
    }
  ];

  // Helper for estimation
  const estimateReach = (budget) => Math.floor(budget / 0.5); // Roughly 0.5 INR per impression blended

  return (
    <>
      <Helmet>
        <title>SMM Services - Social Media Marketing Kerala</title>
        <meta name="description" content="Expert social media marketing for WhatsApp, Instagram, Facebook, and more. Boost your brand with organic growth and local ads." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-slate-50">
        
        {/* Hero Section */}
        <section className="bg-[#1A1F2C] text-white py-20 relative overflow-hidden">
           <div className="absolute inset-0 bg-grid-white/5 bg-[length:20px_20px]"></div>
           <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
             <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
               <h1 className="text-4xl md:text-6xl font-bold mb-6">Dominate Social Media <br/><span className="text-teal-400">In Kerala & Beyond</span></h1>
               <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                 From WhatsApp Status Ads to Viral Instagram Reels. We manage your entire digital social presence with data-driven strategies.
               </p>
               <div className="flex justify-center gap-4">
                 <Link to="/smm-order">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg h-12 px-8">
                         <Search className="w-5 h-5 mr-2" /> Browse 200+ Services
                    </Button>
                 </Link>
                 <Button size="lg" variant="outline" className="text-slate-900 border-white hover:bg-white/10 text-lg h-12 px-8 bg-white">Free Audit</Button>
               </div>
             </motion.div>
           </div>
        </section>

        {/* Platforms Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Multi-Platform Mastery</h2>
            <p className="text-slate-600">We create tailored strategies for every major social network.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((p, i) => <PlatformCard key={i} {...p} />)}
          </div>
        </section>

        {/* Pricing & Calculator */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Transparent Packages</h2>
              <p className="text-slate-600">Choose a plan that fits your growth stage.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {packages.map((pkg, i) => <PricingCard key={i} {...pkg} />)}
            </div>

            {/* Calculator */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">Ad Spend Estimator</h3>
                   <p className="text-slate-600 mb-8">Estimate your potential reach based on monthly budget.</p>
                   
                   <div className="space-y-6">
                      <div>
                        <label className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                          Monthly Budget: ₹{calculatorBudget.toLocaleString()}
                        </label>
                        <input 
                          type="range" 
                          min="5000" 
                          max="500000" 
                          step="5000" 
                          value={calculatorBudget} 
                          onChange={(e) => setCalculatorBudget(Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        />
                      </div>
                      
                      <div>
                         <label className="text-sm font-bold text-slate-700 mb-2 block">Platform Focus</label>
                         <div className="flex gap-2 flex-wrap">
                           {['Instagram', 'Facebook', 'WhatsApp', 'YouTube'].map(p => (
                             <button
                               key={p}
                               onClick={() => setSelectedPlatform(p.toLowerCase())}
                               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                 selectedPlatform === p.toLowerCase() 
                                 ? 'bg-slate-900 text-white' 
                                 : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                               }`}
                             >
                               {p}
                             </button>
                           ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-8">
                   <h4 className="text-lg font-medium text-slate-300 mb-6">Estimated Results</h4>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-3xl font-bold text-teal-400 mb-1">
                          {estimateReach(calculatorBudget).toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-400">Est. Impressions</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-purple-400 mb-1">
                          {(calculatorBudget / 45).toFixed(0)}
                        </div>
                        <div className="text-sm text-slate-400">Est. Clicks/Leads</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-400 mb-1">
                          {(calculatorBudget * 0.08).toFixed(0)}
                        </div>
                        <div className="text-sm text-slate-400">Est. Engagement</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {(calculatorBudget / 100).toFixed(0)}
                        </div>
                        <div className="text-sm text-slate-400">New Followers</div>
                      </div>
                   </div>
                   <p className="text-xs text-slate-500 mt-6">*Estimates vary by industry and competition.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default SmmServices;
