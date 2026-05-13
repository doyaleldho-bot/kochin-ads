
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://horizons-cdn.hostinger.com/7ec1cf53-4f51-44ad-ac86-4813f22a6038/468da3ae0bed8e53719c3ab97e40c208.jpg" 
                alt="Kochin Ads Logo" 
                className="h-12 w-auto rounded border border-white/10"
              />
              <span className="text-xl font-bold tracking-wider">KOCHIN<span className="text-[#008080]">ADS</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full-service advertising agency delivering creative excellence since 2009. We elevate your brand with modern solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg text-[#DAA520]">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-slate-400 hover:text-white transition-colors text-sm">Home</Link>
              <Link to="/about" className="block text-slate-400 hover:text-white transition-colors text-sm">About Us</Link>
              <Link to="/services" className="block text-slate-400 hover:text-white transition-colors text-sm">Services</Link>
              <Link to="/booking" className="block text-slate-400 hover:text-white transition-colors text-sm">Book a Service</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg text-[#DAA520]">Services</h3>
            <div className="space-y-2">
              <Link to="/services" className="block text-slate-400 hover:text-white transition-colors text-sm">Digital Marketing</Link>
              <Link to="/services" className="block text-slate-400 hover:text-white transition-colors text-sm">Outdoor Advertising</Link>
              <Link to="/services" className="block text-slate-400 hover:text-white transition-colors text-sm">Video Production</Link>
              <Link to="/services" className="block text-slate-400 hover:text-white transition-colors text-sm">SEO Services</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg text-[#DAA520]">Contact Info</h3>
            <div className="space-y-2 text-slate-400 text-sm">
              <p>Aluva, Kochi, 683110</p>
              <p>Kerala, India</p>
              <p className="hover:text-white transition-colors cursor-pointer">support@kochinads.com</p>
              <p className="hover:text-white transition-colors cursor-pointer">+91 73566 04666</p>
            </div>
            <Link to="/contact">
              <Button variant="outline" size="sm" className="mt-4 border-[#DAA520] text-[#DAA520] hover:bg-[#DAA520] hover:text-white w-full">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Kochin Ads. All rights reserved.</p>
          <div className="flex gap-4">
             <Link to="/sitemap.xml" className="hover:text-white">Sitemap</Link>
             <Link to="/privacy" className="hover:text-white">Privacy</Link>
             <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
