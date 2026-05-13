
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, Target, Heart, Calendar, Briefcase, MapPin, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const team = [
    {
      name: 'Arjun Menon',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      bio: 'Visionary leader with 15+ years in Kerala\'s media landscape.'
    },
    {
      name: 'Sarah Thomas',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      bio: 'Award-winning designer passionate about visual storytelling.'
    },
    {
      name: 'Rahul Nair',
      role: 'Head of Digital',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      bio: 'Expert in SEO, PPC, and programmatic advertising strategies.'
    },
    {
      name: 'Priya Lakshmi',
      role: 'Client Relations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      bio: 'Ensuring seamless delivery and campaign success for every partner.'
    }
  ];

  const testimonials = [
    { quote: "Kochin Ads transformed our brand visibility in Tier-2 cities.", author: "CEO, Malabar Gold" },
    { quote: "Their understanding of local consumer behavior is unmatched.", author: "Marketing Head, V-Guard" },
    { quote: "Creative, timely, and data-driven. The perfect partners.", author: "Director, Kerala Tourism Dept" }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Kochin Ads Agency</title>
        <meta name="description" content="Learn about Kochin Ads, our mission, vision, and the expert team driving advertising success in Kerala." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-slate-50">
        
        {/* Hero Section */}
        <section className="bg-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0D5A7A]/5 skew-x-12 transform origin-top-right"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h4 className="text-[#FF9500] font-bold uppercase tracking-wider mb-2">Our Story</h4>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                Crafting Narratives <br/> That Define Brands.
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Founded in 2009 in the heart of Aluva, Kochin Ads has grown from a boutique creative shop to Kerala's premier full-service advertising agency. We blend local cultural insights with global marketing standards.
              </p>
              <div className="flex gap-4">
                 <Link to="/contact"><Button className="bg-[#0D5A7A] hover:bg-[#094660] h-12 px-8">Work With Us</Button></Link>
                 <Link to="/gallery"><Button variant="outline" className="h-12 px-8">View Our Work</Button></Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl font-bold mb-8">Why We Exist</h2>
                 <div className="space-y-8">
                    <div className="flex gap-4">
                       <div className="w-12 h-12 bg-[#FF9500] rounded-lg flex-shrink-0 flex items-center justify-center">
                          <Target className="w-6 h-6 text-white" />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                          <p className="text-slate-400">To empower businesses with innovative, data-driven advertising solutions that create meaningful connections with audiences across Kerala and beyond.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-12 h-12 bg-[#0D5A7A] rounded-lg flex-shrink-0 flex items-center justify-center">
                          <Heart className="w-6 h-6 text-white" />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                          <p className="text-slate-400">To be the most trusted strategic partner for brands, recognized for integrity, creativity, and measurable impact in the advertising industry.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="relative">
                 <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Team meeting" className="rounded-2xl shadow-2xl opacity-80" />
                 <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                    <p className="font-serif italic text-lg mb-2">"Great things in business are never done by one person."</p>
                    <p className="text-sm font-bold text-[#0D5A7A]">- Steve Jobs</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#0D5A7A] text-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                 <div>
                    <div className="text-4xl font-bold mb-1">15+</div>
                    <div className="text-blue-200 text-sm">Years Experience</div>
                 </div>
                 <div>
                    <div className="text-4xl font-bold mb-1">500+</div>
                    <div className="text-blue-200 text-sm">Happy Clients</div>
                 </div>
                 <div>
                    <div className="text-4xl font-bold mb-1">50+</div>
                    <div className="text-blue-200 text-sm">Awards Won</div>
                 </div>
                 <div>
                    <div className="text-4xl font-bold mb-1">14</div>
                    <div className="text-blue-200 text-sm">Districts Covered</div>
                 </div>
              </div>
           </div>
        </section>

        {/* Expertise Grid */}
        <section className="py-20 bg-slate-50">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-slate-900">Our Expertise</h2>
                 <p className="text-slate-500 mt-2">Specialized services tailored for the Kerala market.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-[#FF9500] transition-colors">
                    <Briefcase className="w-10 h-10 text-[#0D5A7A] mb-4" />
                    <h3 className="text-xl font-bold mb-3">Brand Strategy</h3>
                    <p className="text-slate-600 text-sm">Comprehensive roadmaps for market entry, positioning, and long-term growth.</p>
                 </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-[#FF9500] transition-colors">
                    <MapPin className="w-10 h-10 text-[#FF9500] mb-4" />
                    <h3 className="text-xl font-bold mb-3">Hyper-Local Ads</h3>
                    <p className="text-slate-600 text-sm">Targeting specific demographics in Tier-2 and Tier-3 cities with precision.</p>
                 </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-[#FF9500] transition-colors">
                    <Award className="w-10 h-10 text-[#0D5A7A] mb-4" />
                    <h3 className="text-xl font-bold mb-3">Creative Production</h3>
                    <p className="text-slate-600 text-sm">High-quality video ads, jingles, and print designs that resonate culturally.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-xl mb-4 relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                       <p className="text-white text-sm">{member.bio}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="text-[#FF9500] font-medium">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-slate-50">
           <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Client Success Stories</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 {testimonials.map((t, i) => (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-sm relative">
                       <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-100 rotate-180" />
                       <p className="text-slate-600 italic mb-6 relative z-10">"{t.quote}"</p>
                       <div className="font-bold text-[#0D5A7A]">{t.author}</div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

      </div>
    </>
  );
};

export default About;
