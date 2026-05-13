
import React from 'react';
import { Helmet } from 'react-helmet';
import ProductsList from '@/components/ProductsList';
import { motion } from 'framer-motion';
import { Briefcase, Target, LineChart, Award, Rocket, CheckCircle, Calculator, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Store = () => {
  return (
    <>
      <Helmet>
        <title>Ad Services Marketplace - Kochin Ads</title>
        <meta name="description" content="Purchase premium advertising packages, social media campaigns, and billboard slots directly." />
      </Helmet>
      
      <div className="min-h-screen bg-slate-50 pt-20">
        
        {/* Marketplace Hero */}
        <div className="bg-[#1A1F2C] text-white py-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF9500] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0088CC] rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
               <h2 className="text-[#FF9500] font-bold tracking-widest uppercase text-sm mb-4">The Ad Marketplace</h2>
               <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                 Launch Your Campaign <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">In Minutes, Not Weeks</span>
               </h1>
               <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                 Browse verified ad spaces, purchase digital packages, and book expert consultations. All instant, all secure.
               </p>
               
               <div className="flex justify-center gap-4">
                 <Button size="lg" className="bg-[#FF9500] hover:bg-[#e08200] text-white rounded-full px-8">View Packages</Button>
                 <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:bg-white/10 rounded-full px-8">How it Works</Button>
               </div>
             </motion.div>
           </div>
        </div>

        {/* Features/Trust Bar */}
        <div className="bg-white border-b border-slate-200 py-8">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                       <Target className="w-6 h-6 text-[#0088CC]" />
                    </div>
                    <h3 className="font-bold text-slate-900">Precise Targeting</h3>
                    <p className="text-sm text-slate-500">Reach the exact audience you need.</p>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                       <Rocket className="w-6 h-6 text-[#FF9500]" />
                    </div>
                    <h3 className="font-bold text-slate-900">Instant Activation</h3>
                    <p className="text-sm text-slate-500">Go live within 24 hours of purchase.</p>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                       <LineChart className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-slate-900">Real-time Analytics</h3>
                    <p className="text-sm text-slate-500">Track performance as it happens.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Product Listing Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
                 <h2 className="text-3xl font-bold text-slate-900">Featured Packages</h2>
                 <p className="text-slate-500 mt-1">Select from our curated advertising solutions</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <span className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full cursor-pointer shadow-sm">All</span>
              <span className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-50 cursor-pointer">Digital</span>
              <span className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-50 cursor-pointer">Print</span>
            </div>
          </div>
          
          <ProductsList />
          
        </div>

        {/* Tools Section (Calculator & Comparison) */}
        <div className="bg-slate-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-[#0088CC]"><Calculator className="w-6 h-6" /></div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Budget Estimator</h3>
                        <p className="text-slate-500 mb-6">Not sure how much to spend? Use our AI-powered tool to estimate the budget needed to reach your goals.</p>
                        <Button variant="outline" className="w-full">Calculate Budget</Button>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                         <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600"><Zap className="w-6 h-6" /></div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Plan Comparison</h3>
                        <p className="text-slate-500 mb-6">Compare our Starter, Growth, and Enterprise plans side-by-side to find the perfect fit.</p>
                        <Button variant="outline" className="w-full">Compare Plans</Button>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Testimonials */}
        <div className="py-20 bg-white">
             <div className="max-w-7xl mx-auto px-4">
                 <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">What Our Clients Say</h2>
                 <div className="grid md:grid-cols-3 gap-8">
                     {[1,2,3].map(i => (
                         <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                             <div className="flex items-center gap-1 text-yellow-400 mb-4">
                                 {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                             </div>
                             <p className="text-slate-600 mb-4">"Absolutely transformed our business. The ROI was visible within the first two weeks."</p>
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                                 <div>
                                     <p className="font-bold text-slate-900">Client Name</p>
                                     <p className="text-xs text-slate-500">CEO, Company</p>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>

        {/* Trust Section */}
        <div className="bg-slate-900 text-white py-16">
           <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-8 opacity-90">Trusted by Kerala's Leading Brands</h2>
              <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                 <span className="text-2xl font-bold font-serif">Lulu Group</span>
                 <span className="text-2xl font-bold">Kalyan</span>
                 <span className="text-2xl font-bold italic">Manorama</span>
                 <span className="text-2xl font-bold">Asianet</span>
              </div>
           </div>
        </div>

      </div>
    </>
  );
};

export default Store;
