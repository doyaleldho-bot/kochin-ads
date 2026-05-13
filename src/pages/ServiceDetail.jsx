
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, BarChart2, Users, Star, Layers, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeoHead from '@/components/SeoHead';

// Data for top 10 services
const serviceData = {
  'billboard-ads': {
    title: 'Billboard Advertising',
    subtitle: 'Dominate the Skyline',
    description: 'High-impact outdoor advertising placed in strategic high-traffic locations across Kerala. Perfect for brand awareness and large-scale campaigns.',
    features: ['Prime Locations in 14 Districts', '24/7 Visibility', 'High-Resolution Printing', 'Weather-Resistant Materials'],
    stats: { reach: '5M+ Daily', roi: '3.5x Avg', minDuration: '30 Days' },
    pricing: [
        { name: 'Standard', price: '₹25,000', desc: 'Single location, 30 days' },
        { name: 'Network', price: '₹1,00,000', desc: '5 Locations, 30 days' },
        { name: 'Dominance', price: '₹5,00,000', desc: '20 Locations, 90 days' }
    ],
    image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=1200'
  },
  'digital-display': {
    title: 'Digital Display Ads',
    subtitle: 'Targeted Reach Online',
    description: 'Programmatic display advertising across top websites and apps. Use data-driven targeting to reach your ideal customer at the right time.',
    features: ['Real-Time Bidding', 'Audience Segmentation', 'Retargeting Capabilities', 'Interactive Formats'],
    stats: { reach: '10M+ Online', roi: '4.2x Avg', minDuration: '1 Week' },
    pricing: [
        { name: 'Starter', price: '₹15,000', desc: '50k Impressions' },
        { name: 'Growth', price: '₹40,000', desc: '200k Impressions + Retargeting' },
        { name: 'Pro', price: '₹1,00,000', desc: '1M Impressions + Premium Sites' }
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200'
  },
  'social-media': {
    title: 'Social Media Marketing',
    subtitle: 'Engage & Grow',
    description: 'Comprehensive management of your Instagram, Facebook, and LinkedIn presence. From content creation to community management.',
    features: ['Content Calendar', 'Reels Production', 'Community Management', 'Monthly Analytics'],
    stats: { reach: 'Targeted', roi: '5.0x Avg', minDuration: 'Monthly' },
    pricing: [
        { name: 'Basic', price: '₹20,000/mo', desc: '12 Posts + Community Mgmt' },
        { name: 'Growth', price: '₹45,000/mo', desc: 'Daily Posts + 4 Reels + Ads Mgmt' },
        { name: 'Viral', price: '₹80,000/mo', desc: 'Influencer Collabs + Full Production' }
    ],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200'
  },
  'seo': {
    title: 'SEO Services',
    subtitle: 'Rank #1 on Google',
    description: 'Long-term organic growth strategies. We optimize your website to rank higher for relevant keywords in Kerala and beyond.',
    features: ['Technical SEO Audit', 'Keyword Research', 'Content Optimization', 'Backlink Building'],
    stats: { reach: 'Organic', roi: 'High Long-term', minDuration: '6 Months' },
    pricing: [
        { name: 'Local', price: '₹15,000/mo', desc: 'Google Maps + Local Keywords' },
        { name: 'National', price: '₹35,000/mo', desc: 'Competitive Keywords + Content' },
        { name: 'Global', price: '₹75,000/mo', desc: 'International SEO Strategy' }
    ],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200'
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceData[slug];

  if (!service) {
    return (
        <div className="min-h-screen pt-24 text-center">
            <h1 className="text-2xl font-bold">Service Not Found</h1>
            <Link to="/services" className="text-primary mt-4 inline-block">Back to Services</Link>
        </div>
    );
  }

  return (
    <>
      <SeoHead title={service.title} description={service.description} />
      <div className="pt-20 min-h-screen bg-background">
        
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden flex items-center">
            <div className="absolute inset-0 z-0">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <Link to="/services" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to All Services
                </Link>
                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{service.title}</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl">{service.subtitle}</p>
                </motion.div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold mb-6">About This Service</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
                    </section>

                    <section className="grid sm:grid-cols-2 gap-6">
                        {service.features.map((feature, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card p-6 rounded-xl border border-border shadow-sm flex gap-4 items-start"
                            >
                                <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                                <span className="font-medium">{feature}</span>
                            </motion.div>
                        ))}
                    </section>

                    <section>
                         <h2 className="text-3xl font-bold mb-8">Pricing Packages</h2>
                         <div className="grid md:grid-cols-3 gap-6">
                            {service.pricing.map((plan, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
                                >
                                    <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                                    <div className="text-2xl font-bold text-primary mb-2">{plan.price}</div>
                                    <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                                    <Button className="w-full" variant="outline">Select</Button>
                                </motion.div>
                            ))}
                         </div>
                    </section>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-card p-8 rounded-xl border border-border shadow-sm sticky top-24">
                        <h3 className="font-bold text-xl mb-6">Key Metrics</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Users className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Estimated Reach</p>
                                    <p className="font-bold text-xl">{service.stats.reach}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-lg text-green-600"><BarChart2 className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Average ROI</p>
                                    <p className="font-bold text-xl">{service.stats.roi}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-100 rounded-lg text-orange-600"><Calendar className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Min. Duration</p>
                                    <p className="font-bold text-xl">{service.stats.minDuration}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-border">
                            <Link to="/booking">
                                <Button className="w-full py-6 text-lg shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Book This Service <ArrowRight className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
