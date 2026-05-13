
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Users, Award, TrendingUp, Target, Zap, 
  MapPin, Star, Sparkles, CheckCircle, ChevronDown, 
  BarChart, Globe, Shield, Smartphone, Play, Pause, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeoHead from '@/components/SeoHead';

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Live Stats Counter Logic (Simulated)
  const [stats, setStats] = useState({ campaigns: 124, reach: 5000000, clients: 450 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        campaigns: prev.campaigns + (Math.random() > 0.9 ? 1 : 0),
        reach: prev.reach + Math.floor(Math.random() * 50),
        clients: prev.clients
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeCampaigns = [
    { client: "Lulu Mall", type: "Digital", status: "Live Now", view: "12k views/hr" },
    { client: "Wonderla", type: "Billboard", status: "Trending", view: "Kochi, TVM" },
    { client: "Kalyan Silks", type: "Social", status: "Viral", view: "50k Likes" },
  ];

  const partners = [
    "Google Partner", "Meta Business", "Times of India", "Manorama", "Asianet News", "Spotify Ads"
  ];

  return (
    <>
      <SeoHead title="Home" description="Kochin Ads - The future of advertising in Kerala." />

      <div className="overflow-hidden">
        
        {/* 1. Video Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
           {/* Animated Background imitating Video */}
           <motion.div 
             className="absolute inset-0 z-0 opacity-40"
             animate={{ 
               background: [
                 "radial-gradient(circle at 50% 50%, #0D5A7A 0%, #000 70%)",
                 "radial-gradient(circle at 60% 40%, #008080 0%, #000 70%)",
                 "radial-gradient(circle at 40% 60%, #0D5A7A 0%, #000 70%)"
               ]
             }}
             transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
           />
           
           {/* Floating Elements Parallax */}
           <motion.div style={{ y: y1 }} className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl z-0" />
           <motion.div style={{ y: y2 }} className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl z-0" />

           <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.8 }}
             >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-sm font-medium mb-6">
                   <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                   </span>
                   Accepting New Campaigns for 2026
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
                  AMPLIFY <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">YOUR IMPACT</span>
                </h1>
                
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Kerala's most advanced advertising network. We blend data intelligence with creative brilliance to deliver measurable growth.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/services">
                    <Button size="lg" className="h-14 px-8 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-lg shadow-lg shadow-teal-500/25">
                      Explore Services <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10 text-lg backdrop-blur-sm">
                      Free Consultation
                    </Button>
                  </Link>
                </div>
             </motion.div>

             {/* Live Stats Bar */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="mt-20 grid grid-cols-3 gap-4 md:gap-12 max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
             >
                <div>
                   <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stats.campaigns}</div>
                   <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">Active Campaigns</div>
                </div>
                <div>
                   <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-1">{(stats.reach / 1000000).toFixed(1)}M+</div>
                   <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">Daily Impressions</div>
                </div>
                <div>
                   <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stats.clients}</div>
                   <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">Happy Clients</div>
                </div>
             </motion.div>
           </div>
        </section>

        {/* 2. Live Campaigns Ticker */}
        <section className="bg-slate-900 border-t border-white/10 py-4 overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
                {[...activeCampaigns, ...activeCampaigns, ...activeCampaigns].map((camp, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-400 px-4">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="font-bold text-white">{camp.client}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-white/10">{camp.type}</span>
                        <span className="text-xs text-teal-400">{camp.status}: {camp.view}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* 3. Success Metrics & Features */}
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Results That Speak Louder Than Words</h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            We don't just promise visibility; we deliver engagement. Our proprietary analytics engine ensures every rupee spent contributes to your bottom line.
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                { title: "Hyper-Local Targeting", desc: "Pinpoint accuracy down to 1km radius in 14 districts." },
                                { title: "Real-Time Optimization", desc: "AI-driven adjustments to maximize ROAS daily." },
                                { title: "Cross-Platform Sync", desc: "Unified messaging across billboard, social, and TV." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ x: 10 }}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all cursor-default"
                                >
                                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                                        <p className="text-slate-500 text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl transform rotate-3 opacity-20"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
                            alt="Analytics Dashboard" 
                            className="relative rounded-3xl shadow-2xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                        />
                        
                        {/* Floating Stats Card */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden md:block"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <TrendingUp className="text-green-500" />
                                <span className="font-bold text-slate-900">+127% Growth</span>
                            </div>
                            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-3/4"></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Client Average (Q3 2024)</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. Partner Showcase */}
        <section className="py-16 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by Industry Leaders</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((p, i) => (
                        <div key={i} className="text-xl font-bold font-serif text-slate-800 flex items-center gap-2">
                            <Shield className="w-6 h-6" /> {p}
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 5. Resource Library Teaser */}
        <section className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Resources & Insights</h2>
                        <p className="text-slate-400">Latest trends from our marketing lab.</p>
                    </div>
                    <Button variant="link" className="text-teal-400">View All Resources</Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { type: "Report", title: "State of Digital Marketing in Kerala 2025", icon: BarChart },
                        { type: "Guide", title: "Ultimate Guide to Festival Advertising", icon: Globe },
                        { type: "Case Study", title: "How AI is changing Billboard Ads", icon: Zap }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-teal-500/50 transition-colors group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-slate-700 rounded-lg group-hover:bg-teal-500/20 group-hover:text-teal-400 transition-colors">
                                    <item.icon size={24} />
                                </div>
                                <span className="text-xs font-bold bg-slate-900 px-3 py-1 rounded-full border border-slate-700">{item.type}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 group-hover:text-teal-400 transition-colors">{item.title}</h3>
                            <div className="flex items-center text-sm text-slate-400 gap-2 mt-auto">
                                Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

      </div>
    </>
  );
};

export default Home;
