
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Upload, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: "Enquiry Submitted Successfully! 🎉", description: "We'll get back to you within 24 hours." });
  };

  return (
    <>
      <Helmet><title>Contact Us - Kochin Ads</title></Helmet>
      <div className="pt-20 min-h-screen bg-slate-50">
        
        {/* Hero */}
        <section className="bg-[#0D5A7A] text-white py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-white/90">We're here to help you grow.</p>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <h2 className="text-2xl font-bold text-[#0D5A7A] mb-6">Send Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-slate-300" required />
                    <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-300" required />
                    <textarea rows="5" placeholder="Project Details..." className="w-full px-4 py-3 rounded-lg border border-slate-300" required></textarea>
                    
                    {/* File Upload UI */}
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">Click to upload brand assets or RFP (PDF, JPG)</p>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-[#FF9500] hover:bg-[#E08200] text-white">
                        Submit Enquiry <Send className="ml-2 w-5 h-5" />
                    </Button>
                </form>
            </div>

            {/* Info & Map */}
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-teal-600"/> Office Hours</h3>
                    <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex justify-between"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></div>
                        <div className="flex justify-between"><span>Saturday</span><span>10:00 AM - 2:00 PM</span></div>
                        <div className="flex justify-between text-red-500"><span>Sunday</span><span>Closed</span></div>
                    </div>
                </div>

                <div className="h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <iframe title="Map" width="100%" height="100%" src="https://www.openstreetmap.org/export/embed.html?bbox=76.3200,10.0500,76.3800,10.1500&layer=mapnik&marker=10.1000,76.3500" />
                </div>
            </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
