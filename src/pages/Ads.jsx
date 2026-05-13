import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Newspaper, 
  Share2, 
  Video, 
  MapPin, 
  Radio,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Ads = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'digital',
      icon: Monitor,
      title: 'Digital Ads',
      subtitle: 'Reach your audience online',
      description: 'Comprehensive digital advertising solutions including Google Ads, display advertising, programmatic buying, and retargeting campaigns. We optimize your digital presence for maximum ROI and conversions.',
      features: [
        'Google Ads & PPC Management',
        'Display Advertising',
        'Programmatic Buying',
        'Retargeting Campaigns',
        'Search Engine Marketing',
        'Performance Analytics'
      ],
      benefits: ['High ROI', 'Precise Targeting', 'Real-time Optimization'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'print',
      icon: Newspaper,
      title: 'Print Ads',
      subtitle: 'Traditional media that works',
      description: 'Classic print advertising solutions for newspapers, magazines, brochures, and direct mail. We create compelling print materials that capture attention and drive action in the physical world.',
      features: [
        'Magazine Advertising',
        'Newspaper Campaigns',
        'Brochure Design',
        'Direct Mail Marketing',
        'Catalog Production',
        'Point-of-Sale Materials'
      ],
      benefits: ['Tangible Impact', 'Brand Credibility', 'Targeted Distribution'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'social',
      icon: Share2,
      title: 'Social Media Ads',
      subtitle: 'Engage where your audience lives',
      description: 'Strategic social media advertising across Facebook, Instagram, LinkedIn, Twitter, and TikTok. We create engaging content and campaigns that build communities and drive conversions.',
      features: [
        'Facebook & Instagram Ads',
        'LinkedIn B2B Campaigns',
        'TikTok Advertising',
        'Twitter Promoted Content',
        'Social Media Strategy',
        'Community Management'
      ],
      benefits: ['Viral Potential', 'Audience Engagement', 'Brand Awareness'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'video',
      icon: Video,
      title: 'Video Ads',
      subtitle: 'Tell your story visually',
      description: 'Professional video production and advertising for TV commercials, YouTube pre-rolls, social media videos, and streaming platforms. From concept to final edit, we bring your brand story to life.',
      features: [
        'TV Commercials',
        'YouTube Pre-roll Ads',
        'Social Media Videos',
        'Explainer Videos',
        'Product Demonstrations',
        'Brand Story Films'
      ],
      benefits: ['Emotional Connection', 'High Engagement', 'Versatile Content'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'outdoor',
      icon: MapPin,
      title: 'Outdoor Ads',
      subtitle: 'Capture attention everywhere',
      description: 'Large-format outdoor advertising including billboards, transit ads, street furniture, and experiential installations. We create impossible-to-ignore campaigns in high-traffic locations.',
      features: [
        'Billboard Advertising',
        'Transit Advertising',
        'Street Furniture Ads',
        'Digital Outdoor (DOOH)',
        'Experiential Installations',
        'Guerrilla Marketing'
      ],
      benefits: ['Mass Reach', '24/7 Visibility', 'Brand Dominance'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'radio',
      icon: Radio,
      title: 'Radio Ads',
      subtitle: 'Sound that resonates',
      description: 'Professional radio advertising production and placement. We create memorable audio spots that connect with listeners during their daily routines and drive action.',
      features: [
        'Radio Commercial Production',
        'Voice-over Casting',
        'Station Placement',
        'Podcast Advertising',
        'Audio Streaming Ads',
        'Jingle Creation'
      ],
      benefits: ['Wide Reach', 'Cost-Effective', 'Local Targeting'],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { icon: TrendingUp, value: '250%', label: 'Average ROI Increase' },
    { icon: Users, value: '10M+', label: 'People Reached Monthly' },
    { icon: Target, value: '95%', label: 'Campaign Success Rate' }
  ];

  return (
    <>
      <Helmet>
        <title>Advertising Services - Kochin Ads</title>
        <meta name="description" content="Comprehensive advertising services including digital ads, print ads, social media marketing, video production, outdoor advertising, and radio commercials. Expert solutions for your brand." />
      </Helmet>

      <div className="pt-16 min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Advertising Services
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Comprehensive advertising solutions across all media channels. From digital to traditional, 
                we create campaigns that deliver results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedService(service)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-slate-50 transition-colors"
                    >
                      View Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Service Detail Modal */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className={`h-3 bg-gradient-to-r ${selectedService.color}`} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${selectedService.color}`}>
                      <selectedService.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">
                        {selectedService.title}
                      </h2>
                      <p className="text-blue-600 font-medium">
                        {selectedService.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {selectedService.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      What's Included
                    </h3>
                    <div className="space-y-3">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Key Benefits
                    </h3>
                    <div className="space-y-4">
                      {selectedService.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className={`bg-gradient-to-r ${selectedService.color} text-white p-4 rounded-lg font-medium`}
                        >
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link to="/enquiry" className="flex-1">
                    <Button
                      size="lg"
                      className={`w-full bg-gradient-to-r ${selectedService.color} text-white hover:opacity-90`}
                    >
                      Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setSelectedService(null)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Launch Your Campaign?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Let's discuss your advertising goals and create a custom solution that delivers results.
              </p>
              <Link to="/enquiry">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg">
                  Request a Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Ads;