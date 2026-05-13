
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Calendar, Clock, MapPin, Briefcase, User, Users, DollarSign, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const Booking = () => {
  const { user, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const searchParams = new URLSearchParams(location.search);
  const initialService = searchParams.get('service') || '';

  const [loading, setLoading] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [formData, setFormData] = useState({
    service_name: initialService,
    district: '',
    date: '',
    time: '',
    customer_name: profile?.full_name || '',
    customer_email: user?.email || '',
    customer_phone: profile?.phone || '',
    duration: '1',
    addons: []
  });

  const districts = ['Thiruvananthapuram', 'Kollam', 'Alappuzha', 'Ernakulam', 'Thrissur', 'Kozhikode', 'Kannur'];
  const services = ['Digital Ads', 'Billboard Ads', 'Social Media', 'SEO Services', 'Video Production', 'Drone Ads', 'Metaverse Ads'];
  
  const basePrices = {
    'Digital Ads': 15000,
    'Billboard Ads': 25000,
    'Social Media': 10000,
    'SEO Services': 12000,
    'Video Production': 30000,
    'Drone Ads': 100000,
    'Metaverse Ads': 50000
  };

  const availableAddons = [
    { id: 'express', name: 'Express Delivery (24h)', price: 5000 },
    { id: 'creative', name: 'Premium Creative Design', price: 8000 },
    { id: 'report', name: 'Advanced Analytics Report', price: 3000 }
  ];

  // Real-time Cost Calculation
  useEffect(() => {
    let cost = basePrices[formData.service_name] || 0;
    // Multiplier for duration (simplified logic)
    if (formData.service_name.includes('Billboard') || formData.service_name.includes('Social')) {
        cost = cost * parseInt(formData.duration);
    }
    
    // Add-ons
    formData.addons.forEach(addonId => {
        const addon = availableAddons.find(a => a.id === addonId);
        if (addon) cost += addon.price;
    });

    setEstimatedCost(cost);
  }, [formData.service_name, formData.duration, formData.addons]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const toggleAddon = (id) => {
    const currentAddons = [...formData.addons];
    if (currentAddons.includes(id)) {
        setFormData({ ...formData, addons: currentAddons.filter(a => a !== id) });
    } else {
        setFormData({ ...formData, addons: [...currentAddons, id] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        if (!user) {
            toast({ title: "Login Required", description: "Please login to book a service.", variant: "destructive" });
            navigate('/login', { state: { from: '/booking' } });
            return;
        }

        const { data, error } = await supabase.from('bookings').insert({
            user_id: user.id,
            service_id: formData.service_name.toLowerCase().replace(/\s+/g, '-'),
            service_name: formData.service_name,
            district: formData.district,
            booking_date: formData.date,
            booking_time: formData.time,
            customer_name: formData.customer_name,
            customer_email: formData.customer_email,
            customer_phone: formData.customer_phone,
            total_amount: estimatedCost,
            status: 'pending'
        }).select().single();

        if (error) throw error;
        navigate(`/booking-confirmation/${data.id}`);

    } catch (err) {
        toast({ title: "Booking Failed", description: err.message, variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>{t('book_now')} - Kochin Ads</title></Helmet>
      
      <div className="pt-24 pb-12 min-h-screen bg-slate-50">
         <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            
            <div className="md:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('book_now')}</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Service & District */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Select Service</label>
                                <select name="service_name" value={formData.service_name} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
                                    <option value="">Choose...</option>
                                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                                <select name="district" value={formData.district} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
                                    <option value="">Choose...</option>
                                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                            <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                        </div>

                        {/* Add-ons Section */}
                        <div className="border rounded-xl p-4 bg-slate-50">
                            <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><PlusCircle size={16}/> Enhancements</h3>
                            <div className="space-y-2">
                                {availableAddons.map(addon => (
                                    <div key={addon.id} onClick={() => toggleAddon(addon.id)} className={`flex justify-between p-3 rounded-lg border cursor-pointer transition-colors ${formData.addons.includes(addon.id) ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-200'}`}>
                                        <span className="text-sm font-medium">{addon.name}</span>
                                        <span className="text-sm text-slate-500">+ ₹{addon.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" name="customer_name" placeholder="Name" value={formData.customer_name} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                            <input type="tel" name="customer_phone" placeholder="Phone" value={formData.customer_phone} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                        </div>

                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-lg h-12" disabled={loading}>
                            {loading ? 'Processing...' : 'Proceed to Payment'}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Sidebar Estimator */}
            <div className="md:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg border border-teal-100 p-6 sticky top-24">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-teal-600"/> Estimated Cost
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Base Service</span>
                            <span>₹{basePrices[formData.service_name] || 0}</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Duration Multiplier</span>
                            <span>x {formData.duration}</span>
                        </div>
                        {formData.addons.length > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Add-ons ({formData.addons.length})</span>
                                <span>+ ₹{estimatedCost - (basePrices[formData.service_name] || 0)}</span>
                            </div>
                        )}
                        <div className="h-px bg-slate-100 my-2"></div>
                        <div className="flex justify-between font-bold text-xl text-teal-700">
                            <span>Total</span>
                            <span>₹{estimatedCost.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div className="text-xs text-slate-400 text-center bg-slate-50 p-2 rounded">
                        Final price may vary based on specific requirements discussed during consultation.
                    </div>
                </div>
            </div>

         </div>
      </div>
    </>
  );
};

export default Booking;
