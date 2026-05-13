
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Megaphone, MapPin, Coffee, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const News = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Travel Guide', 'Company News', 'Food & Culture', 'Awards'];

  const posts = [
    {
      id: 1,
      title: "The Ultimate Houseboat Guide: Alleppey vs. Kumarakom",
      excerpt: "Planning a backwater cruise? We break down the differences between the bustling canals of Alleppey and the serene luxury of Kumarakom to help you decide.",
      date: "December 15, 2025",
      author: "Lakshmi Nair",
      category: "Travel Guide",
      icon: MapPin,
      image: "https://images.unsplash.com/photo-1593693396885-5a5a0c3d6802?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Top 10 Hidden Gems in Wayanad for Nature Lovers",
      excerpt: "Beyond the Edakkal Caves. Discover secret waterfalls, misty trekking trails, and eco-friendly stays that put you right in the heart of nature.",
      date: "December 10, 2025",
      author: "Arjun K.",
      category: "Travel Guide",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1517234390509-3224b7875953?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Kochin Ads Wins 'Best Creative Agency 2024'",
      excerpt: "We are thrilled to announce that Kochin Ads has been recognized as the leading creative agency in South India for our tourism campaigns.",
      date: "November 24, 2025",
      author: "Admin",
      category: "Awards",
      icon: Megaphone,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "A Foodie's Trail Through Kozhikode: What to Eat",
      excerpt: "From the famous Halwa to the spicy Biryani, take a culinary journey through the food capital of Kerala. Warning: Content may cause hunger.",
      date: "November 20, 2025",
      author: "Sanjay Menon",
      category: "Food & Culture",
      icon: Coffee,
      image: "https://images.unsplash.com/photo-1610136896280-97434c44917a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      title: "Cultural Heritage of Fort Kochi: A Walking Tour",
      excerpt: "Explore the colonial history, Chinese fishing nets, and the vibrant art cafes that make Fort Kochi a melting pot of cultures.",
      date: "November 15, 2025",
      author: "Sarah John",
      category: "Travel Guide",
      icon: MapPin,
      image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      title: "Expanding Our Horizons: New Office in Trivandrum",
      excerpt: "To better serve our growing client base in the capital, we have opened a new state-of-the-art facility near Technopark.",
      date: "November 10, 2025",
      author: "David Kumar",
      category: "Company News",
      icon: Megaphone,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const filteredPosts = filter === 'All' ? posts : posts.filter(post => post.category === filter);

  return (
    <>
      <Helmet>
        <title>Travel Blog & News - Kochin Ads</title>
        <meta name="description" content="Latest travel guides, Kerala tourism tips, and company updates from Kochin Ads." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-slate-50">
        <section className="bg-[#0D5A7A] text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl mb-6 backdrop-blur-sm">
                <Megaphone className="w-8 h-8 text-[#FF9500]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore & Update</h1>
              <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                Discover the beauty of Kerala through our travel stories and stay updated with our agency news.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 border-b border-slate-200 bg-white sticky top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-wrap justify-center gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      filter === cat 
                        ? 'bg-[#FF9500] text-white shadow-md transform scale-105' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute top-4 left-4 bg-[#FF9500] text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1">
                      <post.icon className="w-3 h-3" />
                      {post.category}
                    </div>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 uppercase tracking-wide font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <span className="text-slate-300">|</span>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#0D5A7A] mb-3 group-hover:text-[#FF9500] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Button variant="link" className="p-0 text-[#0D5A7A] hover:text-[#FF9500] font-bold w-fit mt-auto">
                      Read Full Story <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                <p className="text-xl">No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default News;
