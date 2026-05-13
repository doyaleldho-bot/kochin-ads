import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Pricing = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePurchase = (planName) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Added to Cart! 🛒",
        description: `You've selected the ${planName}. Our team will contact you to finalize payment.`,
      });
    }, 1000);
  };

  const plans = [
    {
      name: 'Starter',
      price: '₹25,000',
      period: '/month',
      description: 'Perfect for small businesses starting their digital journey.',
      features: [
        'Social Media Management (2 Platforms)',
        '4 Graphic Posts/Month',
        'Basic SEO Optimization',
        'Monthly Performance Report',
        'Email Support'
      ],
      highlight: false,
      color: 'blue'
    },
    {
      name: 'Growth',
      price: '₹60,000',
      period: '/month',
      description: 'Ideal for growing brands looking for rapid expansion.',
      features: [
        'Social Media (4 Platforms)',
        '12 Graphic Posts + 2 Reels/Month',
        'Google Ads Management',
        'Advanced SEO & Content Strategy',
        'Bi-weekly Reporting',
        'Priority Support'
      ],
      highlight: true,
      color: 'orange'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Full-scale advertising solution for established organizations.',
      features: [
        'Omnichannel Strategy (All Platforms)',
        'Daily Content Production',
        'Video Production Included',
        'Influencer Campaign Management',
        'Dedicated Account Manager',
        '24/7 Support'
      ],
      highlight: false,
      color: 'teal'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing Packages - Kochin Ads</title>
        <meta name="description" content="Affordable advertising packages for businesses of all sizes. Choose from Starter, Growth, or Enterprise plans." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-slate-50">
        <section className="bg-[#0D5A7A] text-white py-20 relative">
           <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
           <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
             >
               <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h1>
               <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                 Choose the package that fits your business goals. No hidden fees, just results.
               </p>
             </motion.div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 flex flex-col ${
                    plan.highlight ? 'border-[#FF9500] scale-105 z-10' : 'border-transparent'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 left-0 bg-[#FF9500] text-white text-center py-1 text-sm font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold text-[#0D5A7A] mb-2">{plan.name}</h3>
                    <p className="text-slate-500 mb-6">{plan.description}</p>
                    <div className="flex items-baseline mb-8">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-500 ml-2">{plan.period}</span>
                    </div>
                    
                    <Button 
                      onClick={() => handlePurchase(plan.name)}
                      className={`w-full mb-8 ${
                        plan.highlight 
                        ? 'bg-[#FF9500] hover:bg-[#E08200]' 
                        : 'bg-[#0D5A7A] hover:bg-[#094660]'
                      } text-white`}
                      disabled={loading}
                    >
                       <ShoppingCart className="w-4 h-4 mr-2" />
                       {loading ? 'Processing...' : 'Select Plan'}
                    </Button>

                    <div className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`mt-1 rounded-full p-0.5 ${plan.highlight ? 'bg-orange-100' : 'bg-slate-100'}`}>
                            <Check className={`w-3 h-3 ${plan.highlight ? 'text-[#FF9500]' : 'text-slate-600'}`} />
                          </div>
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-slate-600 mb-4">Need a custom solution?</p>
              <Button variant="outline" onClick={() => window.location.href='/contact'} className="border-[#0D5A7A] text-[#0D5A7A] hover:bg-[#0D5A7A] hover:text-white">Contact Sales Team</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pricing;