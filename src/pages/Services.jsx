

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Monitor, MapPin, Share2, Video, Radio, Newspaper, 
  Megaphone, Search, PenTool, Camera, Truck, Mail,
  Tv, Music, Star, CheckCircle, ArrowRight, X, Mic, Presentation, 
  Eye, Zap, Smartphone, Box, Layers, Globe, Cpu, Hexagon, Filter,
  Target, Rocket, Anchor, Brush, Bluetooth, Wifi, CloudLightning,
  ShoppingCart, BarChart3, Fingerprint, Image, MessageCircle, Users, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeoHead from '@/components/SeoHead';

// --- CUSTOM SERVICE ICONS COMPONENT ---
const ServiceIcon = ({ icon: Icon, color = "text-teal-600", bg = "bg-teal-50" }) => (
  <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center ${color} mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
    <Icon size={32} strokeWidth={1.5} />
  </div>
);

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const handleBookNow = (serviceName) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  // --- COMPREHENSIVE SERVICE LIST (40+) ---
  const allServices = [
    { id: 'digital', icon: Monitor, title: 'Digital Ads', category: 'Digital', desc: 'PPC, Display, and Programmatic advertising.', price: '₹15,000+' },
    { id: 'outdoor', icon: MapPin, title: 'Billboard Ads', category: 'Outdoor', desc: 'High-visibility hoardings across Kerala.', price: '₹25,000+' },
    { id: 'social', icon: Share2, title: 'Social Media', category: 'Digital', desc: 'Meta, LinkedIn, and Instagram campaigns.', price: '₹10,000+' },
    { id: 'seo', icon: Search, title: 'SEO Services', category: 'Digital', desc: 'Rank #1 on Google Search results.', price: '₹12,000+' },
    { id: 'video', icon: Video, title: 'Video Production', category: 'Creative', desc: 'TVC, Corporate films, and Reels.', price: '₹30,000+' },
    { id: 'photo', icon: Camera, title: 'Photography', category: 'Creative', desc: 'Product shoots and corporate headshots.', price: '₹8,000+' },
    { id: 'event', icon: Megaphone, title: 'Event Sponsor', category: 'Events', desc: 'Partner with local events and festivals.', price: 'Custom' },
    { id: 'radio', icon: Radio, title: 'Radio Ads', category: 'Traditional', desc: 'Jingles and spots on FM stations.', price: '₹5,000+' },
    { id: 'tv', icon: Tv, title: 'TV Commercials', category: 'Traditional', desc: 'Prime time slots on major channels.', price: '₹50,000+' },
    { id: 'influencer', icon: Star, title: 'Influencer Mkt', category: 'Digital', desc: 'Collaborate with top Kerala creators.', price: '₹20,000+' },
    { id: 'podcast', icon: Mic, title: 'Podcast Ads', category: 'Audio', desc: 'Sponsorships on top Malayalam podcasts.', price: '₹5,000+' },
    { id: 'webinar', icon: Presentation, title: 'Webinar Sponsor', category: 'Events', desc: 'Host or sponsor industry webinars.', price: '₹15,000+' },
    { id: 'guerrilla', icon: Zap, title: 'Guerrilla Mkt', category: 'Outdoor', desc: 'Unconventional, high-impact street activations.', price: 'Custom' },
    { id: 'ambient', icon: Eye, title: 'Ambient Ads', category: 'Outdoor', desc: 'Creative placements in everyday environments.', price: '₹20,000+' },
    { id: 'native', icon: Newspaper, title: 'Native Ads', category: 'Digital', desc: 'Sponsored articles in top news portals.', price: '₹8,000+' },
    { id: 'programmatic', icon: Cpu, title: 'Programmatic', category: 'Digital', desc: 'AI-driven automated ad buying.', price: '₹25,000+' },
    { id: 'retargeting', icon: Target, title: 'Retargeting', category: 'Digital', desc: 'Re-engage visitors who left your site.', price: '₹10,000+' },
    { id: 'display', icon: Image, title: 'Display Ads', category: 'Digital', desc: 'Banner ads on high-traffic websites.', price: '₹10,000+' },
    { id: 'videoads', icon: Video, title: 'Video Ads', category: 'Digital', desc: 'YouTube and OTT pre-roll ads.', price: '₹15,000+' },
    { id: 'interactive', icon: Smartphone, title: 'Interactive Ads', category: 'Digital', desc: 'Playable ads and quizzes.', price: '₹18,000+' },
    { id: 'sponsored', icon: PenTool, title: 'Sponsored Content', category: 'Content', desc: 'Branded storytelling on premium blogs.', price: '₹12,000+' },
    { id: 'brand', icon: Anchor, title: 'Brand Partners', category: 'Strategy', desc: 'Strategic alliances with complementary brands.', price: 'Custom' },
    { id: 'comarketing', icon: Users, title: 'Co-marketing', category: 'Strategy', desc: 'Joint campaigns for shared growth.', price: 'Custom' },
    { id: 'experiential', icon: Sparkles, title: 'Experiential', category: 'Events', desc: 'Immersive brand activations.', price: '₹50,000+' },
    { id: 'ar', icon: Box, title: 'AR Ads', category: 'Tech', desc: 'Augmented Reality filters and ads.', price: '₹40,000+' },
    { id: 'vr', icon: Hexagon, title: 'VR Experiences', category: 'Tech', desc: 'Immersive Virtual Reality brand tours.', price: '₹80,000+' },
    { id: 'drone', icon: Rocket, title: 'Drone Ads', category: 'Tech', desc: 'Aerial light shows and banner towing.', price: '₹1,00,000+' },
    { id: 'projection', icon: Layers, title: 'Projection Map', category: 'Tech', desc: '3D visuals on building facades.', price: 'Custom' },
    { id: 'streetart', icon: Brush, title: 'Street Art', category: 'Outdoor', desc: 'Artistic branding on city walls.', price: '₹50,000+' },
    { id: 'neon', icon: CloudLightning, title: 'Neon Signs', category: 'Outdoor', desc: 'Custom neon signage for businesses.', price: '₹15,000+' },
    { id: 'led', icon: Monitor, title: 'LED Billboards', category: 'Outdoor', desc: 'Digital outdoor screens in prime spots.', price: '₹45,000+' },
    { id: 'hologram', icon: Hexagon, title: 'Holographic', category: 'Tech', desc: 'Futuristic 3D product displays.', price: '₹60,000+' },
    { id: 'smartcity', icon: Wifi, title: 'Smart City Ads', category: 'Tech', desc: 'WiFi login pages and kiosk ads.', price: '₹10,000+' },
    { id: 'blockchain', icon: Fingerprint, title: 'Blockchain Ads', category: 'Tech', desc: 'NFT drops and Web3 marketing.', price: 'Custom' },
    { id: 'metaverse', icon: Globe, title: 'Metaverse Ads', category: 'Tech', desc: 'Virtual billboards in Decentraland.', price: 'Custom' },
    { id: 'print', icon: Newspaper, title: 'Print Media', category: 'Traditional', desc: 'Newspaper and Magazine advertisements.', price: '₹8,000+' },
    { id: 'transit', icon: Truck, title: 'Transit Ads', category: 'Outdoor', desc: 'Bus, Auto, and Train branding.', price: '₹15,000+' },
    { id: 'content', icon: PenTool, title: 'Content Mkt', category: 'Content', desc: 'Blogs, whitepapers, and PR articles.', price: '₹5,000+' },
    { id: 'email', icon: Mail, title: 'Email Mkt', category: 'Digital', desc: 'Direct newsletters and drip campaigns.', price: '₹4,000+' },
    { id: 'audio', icon: Music, title: 'Audio Branding', category: 'Audio', desc: 'Sonic logos and brand anthems.', price: '₹15,000+' },
    { id: 'sms', icon: MessageCircle, title: 'SMS Marketing', category: 'Digital', desc: 'Direct promotional text messages.', price: '₹2,000+' },
  ];

  const categories = ['All', 'Digital', 'Outdoor', 'Creative', 'Tech', 'Traditional', 'Events', 'Strategy'];

  const filteredServices = filter === 'All' ? allServices : allServices.filter(s => s.category === filter);

  return (
    <>
      <SeoHead 
        title="All Services" 
        description="Explore our comprehensive list of 40+ advertising services ranging from digital marketing to metaverse advertising." 
      />

      <div className="pt-20 min-h-screen bg-slate-50">
        <div className="bg-[#1A1F2C] text-white py-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 bg-[length:20px_20px]"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">40+ Ways to Grow Your Brand</h1>
                <p className="text-slate-300 max-w-2xl mx-auto">From traditional billboards to futuristic metaverse ads, we cover every inch of the advertising spectrum.</p>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm overflow-x-auto">
            <div className="max-w-7xl mx-auto px-4 flex gap-2 py-4 no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                            filter === cat 
                            ? 'bg-teal-600 text-white shadow-md' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredServices.map((service, idx) => (
                    <motion.div 
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-teal-500/50 hover:shadow-lg transition-all cursor-pointer group"
                        onClick={() => setSelectedService(service)}
                    >
                        <ServiceIcon icon={service.icon} />
                        
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors">{service.title}</h3>
                             <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">{service.category}</span>
                        </div>
                        
                        <p className="text-slate-500 text-sm mb-6 flex-grow">{service.desc}</p>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                             <div>
                                 <p className="text-xs text-slate-400">Starting at</p>
                                 <p className="font-bold text-teal-700">{service.price}</p>
                             </div>
                             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                 <ArrowRight size={14} />
                             </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Comparison Matrix Section */}
        <section className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Service Comparison Matrix</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-bold text-slate-700">Feature</th>
                                <th className="p-4 font-bold text-slate-700">Digital Ads</th>
                                <th className="p-4 font-bold text-slate-700">Billboards</th>
                                <th className="p-4 font-bold text-slate-700">TV Commercials</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { f: "Reach", d: "Global/Targeted", b: "Local/Mass", t: "Regional/Mass" },
                                { f: "Cost", d: "Flexible", b: "Fixed", t: "High" },
                                { f: "Tracking", d: "Real-time Exact", b: "Estimated", t: "TRP Ratings" },
                                { f: "Engagement", d: "Interactive", b: "Passive", t: "Passive" },
                                { f: "Conversion", d: "Immediate", b: "Brand Awareness", t: "Brand Recall" }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-4 font-medium text-slate-900">{row.f}</td>
                                    <td className="p-4 text-slate-600">{row.d}</td>
                                    <td className="p-4 text-slate-600">{row.b}</td>
                                    <td className="p-4 text-slate-600">{row.t}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* Quick Quote / Service Modal */}
        <AnimatePresence>
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl"
                    >
                        <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X /></button>
                        
                        <div className="flex items-center gap-4 mb-6">
                             <ServiceIcon icon={selectedService.icon} />
                             <div>
                                 <h2 className="text-2xl font-bold text-slate-900">{selectedService.title}</h2>
                                 <p className="text-teal-600 font-medium">{selectedService.price}</p>
                             </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2 text-sm">Description</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{selectedService.desc} Includes strategy consultation, creative asset generation, campaign execution, and performance reporting.</p>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1" onClick={() => setSelectedService(null)}>Close</Button>
                                <Button className="flex-1 bg-teal-600 hover:bg-teal-700" onClick={() => handleBookNow(selectedService.title)}>
                                    Get Quick Quote
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default Services;
