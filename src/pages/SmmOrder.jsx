
import React from 'react';
import { Helmet } from 'react-helmet';
import SmmOrderPanel from '@/components/smm/SmmOrderPanel';
import { CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const SmmOrder = () => {
  return (
    <PageTransition>
        <Helmet>
            <title>SMM Panel Order - Kochin Ads</title>
            <meta name="description" content="Instant social media growth services. Order followers, likes, and views." />
        </Helmet>
        
        <div className="pt-24 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Instant Growth Engine</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Select your platform, customize your package, and watch your social presence skyrocket instantly.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <SmmOrderPanel />
                    </div>
                    
                    {/* Features Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Why Choose Our Panel?</h3>
                            <ul className="space-y-4">
                                {[
                                    { title: 'Instant Delivery', desc: 'System starts processing within 60 seconds.' },
                                    { title: 'Refill Guarantee', desc: 'Auto-refill system ensures stability.' },
                                    { title: 'Privacy First', desc: 'No password required, ever.' },
                                    { title: '24/7 Support', desc: 'Dedicated team for SMM queries.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <CheckCircle className="w-5 h-5 text-teal-500 shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
                            <Zap className="w-8 h-8 mb-4 text-yellow-300" />
                            <h3 className="font-bold text-xl mb-2">Reseller API Access</h3>
                            <p className="text-blue-100 text-sm mb-4">
                                Connect your own panel or app to our massive SMM network.
                            </p>
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors w-full">
                                View API Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageTransition>
  );
};

export default SmmOrder;
