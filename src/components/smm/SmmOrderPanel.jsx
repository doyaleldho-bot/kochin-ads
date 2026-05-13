
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Instagram, Facebook, Twitter, Youtube, Linkedin, MessageCircle, Send, Video,
  Zap, Shield, Clock, Info, CheckCircle, Search, Filter, Globe, Music, 
  ShoppingCart, Star, AtSign, ArrowUpRight, BadgeCheck, HelpCircle, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { services, platforms, calculatePrice } from '@/data/smmCatalog';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

const icons = {
  Instagram, Facebook, Twitter, Youtube, Linkedin, MessageCircle, Send, Video, Music, Globe, AtSign
};

const SmmOrderPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // UI State
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
      link: '',
      quantity: 1000
  });

  // Advanced Filters
  const [filters, setFilters] = useState({
      category: 'All',
      speed: 'All',
      quality: 'All',
      refill: 'All',
      minPrice: 0,
      maxPrice: 10000
  });

  const [sortBy, setSortBy] = useState('popularity'); // popularity, price_low, price_high
  const [activeView, setActiveView] = useState('services'); // services, bundles, faq

  // Reset selection on platform change
  useEffect(() => {
      setSelectedService(null);
      setFilters(prev => ({ ...prev, category: 'All' }));
  }, [selectedPlatform]);

  // Derived Data
  const filteredServices = useMemo(() => {
      let result = services.filter(service => {
          const matchesPlatform = service.platform === selectedPlatform;
          const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              service.id.toString().includes(searchQuery);
          const matchesCategory = filters.category === 'All' || service.category === filters.category;
          const matchesQuality = filters.quality === 'All' || service.quality === filters.quality;
          const matchesSpeed = filters.speed === 'All' || service.speed === filters.speed;
          const matchesRefill = filters.refill === 'All' || service.refill === filters.refill;
          const matchesPrice = service.rate >= filters.minPrice && service.rate <= filters.maxPrice;
          
          return matchesPlatform && matchesSearch && matchesCategory && matchesQuality && matchesSpeed && matchesRefill && matchesPrice;
      });

      // Sorting
      if (sortBy === 'price_low') result.sort((a, b) => a.rate - b.rate);
      else if (sortBy === 'price_high') result.sort((a, b) => b.rate - a.rate);
      else if (sortBy === 'popularity') result.sort((a, b) => b.reviews - a.reviews);

      return result;
  }, [selectedPlatform, searchQuery, filters, sortBy]);

  const categories = useMemo(() => {
      const cats = new Set(services.filter(s => s.platform === selectedPlatform).map(s => s.category));
      return ['All', ...Array.from(cats)];
  }, [selectedPlatform]);

  const totalPrice = useMemo(() => {
      if (!selectedService) return 0;
      return calculatePrice(selectedService.id, orderDetails.quantity);
  }, [selectedService, orderDetails.quantity]);

  const handleOrder = async () => {
    if (!user) {
        toast({ variant: 'destructive', title: 'Login Required', description: 'Please login to place an order.' });
        return;
    }
    if (!selectedService) {
        toast({ variant: 'destructive', title: 'Select Service', description: 'Please choose a service first.' });
        return;
    }
    if (!orderDetails.link) {
        toast({ variant: 'destructive', title: 'Missing Link', description: 'Please provide a valid URL.' });
        return;
    }
    if (orderDetails.quantity < selectedService.min || orderDetails.quantity > selectedService.max) {
        toast({ variant: 'destructive', title: 'Invalid Quantity', description: `Quantity must be between ${selectedService.min} and ${selectedService.max}` });
        return;
    }

    try {
        const { error } = await supabase.from('smm_orders').insert({
            user_id: user.id,
            service_id: selectedService.id,
            link: orderDetails.link,
            quantity: orderDetails.quantity,
            cost: totalPrice,
            status: 'pending',
            start_count: 0
        });

        if (error) throw error;

        toast({ 
            title: "Order Placed Successfully! 🚀", 
            description: `Order #${Date.now().toString().slice(-6)} for ${selectedService.name} initiated.` 
        });
        
    } catch (err) {
        toast({ variant: 'destructive', title: 'Order Failed', description: err.message });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col xl:flex-row h-[900px]">
      
      {/* LEFT SIDE: Service Browser */}
      <div className="xl:w-2/3 border-r border-slate-100 flex flex-col h-full">
          {/* 1. Header & Tabs */}
          <div className="bg-white p-4 border-b border-slate-200">
             <div className="flex justify-between items-center mb-4">
                 <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-teal-600" /> Service Catalog
                 </h2>
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                    {['services', 'bundles', 'faq'].map(view => (
                        <button
                           key={view}
                           onClick={() => setActiveView(view)}
                           className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${activeView === view ? 'bg-white shadow text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {view}
                        </button>
                    ))}
                 </div>
             </div>

             {/* Platform Scroller */}
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {platforms.map(p => {
                      const Icon = icons[p.icon] || Globe;
                      const isActive = selectedPlatform === p.id;
                      return (
                          <button
                              key={p.id}
                              onClick={() => setSelectedPlatform(p.id)}
                              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                  isActive 
                                  ? 'bg-slate-900 text-white shadow-md transform scale-105' 
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                              }`}
                          >
                              <Icon size={16} style={{ color: isActive ? '#fff' : p.color }} /> {p.name}
                          </button>
                      )
                  })}
              </div>
          </div>

          {activeView === 'services' && (
              <>
                {/* 2. Advanced Filters Toolbar */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div className="relative col-span-2">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search by ID or name..." 
                                className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select 
                            className="w-full p-2 bg-white border rounded-lg text-sm outline-none cursor-pointer"
                            value={filters.category}
                            onChange={e => setFilters({...filters, category: e.target.value})}
                        >
                            {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                        </select>
                        <select 
                            className="w-full p-2 bg-white border rounded-lg text-sm outline-none cursor-pointer"
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                        >
                            <option value="popularity">🔥 Popularity</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                        </select>
                    </div>
                    
                    {/* Collapsible Filters */}
                    <div className="flex flex-wrap gap-2">
                        <select className="px-3 py-1.5 bg-white border rounded-md text-xs text-slate-600 outline-none" onChange={e => setFilters({...filters, quality: e.target.value})}>
                            <option value="All">Quality: All</option>
                            <option value="Budget">Budget</option>
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                            <option value="Ultra Premium">Ultra Premium</option>
                        </select>
                        <select className="px-3 py-1.5 bg-white border rounded-md text-xs text-slate-600 outline-none" onChange={e => setFilters({...filters, speed: e.target.value})}>
                            <option value="All">Speed: All</option>
                            <option value="Normal">Normal</option>
                            <option value="Fast">Fast</option>
                            <option value="Instant">Instant</option>
                        </select>
                        <select className="px-3 py-1.5 bg-white border rounded-md text-xs text-slate-600 outline-none" onChange={e => setFilters({...filters, refill: e.target.value})}>
                            <option value="All">Refill: All</option>
                            <option value="No Refill">No Refill</option>
                            <option value="30 Days">30 Days</option>
                            <option value="Lifetime">Lifetime</option>
                        </select>
                    </div>
                </div>

                {/* 3. Service List Table */}
                <div className="flex-grow overflow-y-auto bg-slate-50">
                    {filteredServices.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <Search className="w-12 h-12 mb-2 opacity-20" />
                            <p>No services found matching filters.</p>
                            <Button variant="link" onClick={() => setFilters({category: 'All', speed: 'All', quality: 'All', refill: 'All', minPrice: 0, maxPrice: 10000})}>
                                Reset Filters
                            </Button>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-100 sticky top-0 z-10 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 border-b">ID & Service</th>
                                    <th className="p-4 border-b text-center hidden md:table-cell">Quality</th>
                                    <th className="p-4 border-b text-center hidden sm:table-cell">Stats</th>
                                    <th className="p-4 border-b text-right">Rate / 1k</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredServices.map(service => (
                                    <tr 
                                        key={service.id}
                                        onClick={() => setSelectedService(service)}
                                        className={`cursor-pointer transition-colors hover:bg-teal-50/50 group ${
                                            selectedService?.id === service.id ? 'bg-teal-50 ring-1 ring-inset ring-teal-500' : 'bg-white'
                                        }`}
                                    >
                                        <td className="p-4">
                                            <div className="flex gap-3">
                                                <div className="font-mono text-xs text-slate-400 mt-1">{service.id}</div>
                                                <div>
                                                    <div className="font-medium text-slate-900 text-sm group-hover:text-teal-700">{service.name}</div>
                                                    <div className="flex gap-2 mt-1">
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded border bg-slate-50 text-slate-500">
                                                            Min: {service.min}
                                                        </span>
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded border bg-slate-50 text-slate-500">
                                                            Refill: {service.refill}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center hidden md:table-cell">
                                            <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                                                service.quality.includes('Premium') ? 'bg-purple-100 text-purple-700' :
                                                service.quality === 'Budget' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {service.quality}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center hidden sm:table-cell">
                                             <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
                                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                <span>{service.rating}</span>
                                                <span className="text-slate-400">({service.reviews})</span>
                                             </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="font-bold text-slate-800">₹{service.rate}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
              </>
          )}

          {activeView === 'bundles' && (
              <div className="p-8 text-center text-slate-500 h-full flex flex-col items-center justify-center">
                  <Package className="w-16 h-16 mb-4 text-slate-300" />
                  <h3 className="text-lg font-bold text-slate-800">Exclusive Bundles</h3>
                  <p className="max-w-md mx-auto mt-2">Get up to 30% off when you buy followers, likes, and comments together. Contact support to enable bundle access.</p>
                  <Button className="mt-6" variant="outline">Contact Support</Button>
              </div>
          )}

           {activeView === 'faq' && (
              <div className="p-8 h-full overflow-y-auto bg-slate-50">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold text-sm mb-2">What does "No Refill" mean?</h4>
                          <p className="text-xs text-slate-600">If followers drop after purchase, we will not refill them. These are usually cheaper services.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold text-sm mb-2">Are "Real" followers actually real people?</h4>
                          <p className="text-xs text-slate-600">Yes, services marked as "Real" or "Organic" come from real active users via ad networks, though they may not engage unless your content is good.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-bold text-sm mb-2">How fast is "Instant"?</h4>
                          <p className="text-xs text-slate-600">Instant services typically start within 0-5 minutes of placing the order.</p>
                      </div>
                  </div>
              </div>
          )}
      </div>

      {/* RIGHT SIDE: Detailed Order Form */}
      <div className="xl:w-1/3 bg-white flex flex-col h-full border-l border-slate-100 shadow-xl z-20">
          <div className="p-6 bg-slate-900 text-white shadow-md">
              <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="text-teal-400" /> Place Order
              </h2>
              <p className="text-xs text-slate-400 mt-1">Review details and confirm purchase</p>
          </div>

          <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
              {!selectedService ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                         <Search size={32} className="text-slate-300" />
                      </div>
                      <p className="max-w-[200px]">Select a service from the catalog to view details and order.</p>
                  </div>
              ) : (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      
                      {/* Selected Service Card */}
                      <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
                          <h3 className="font-bold text-slate-900 text-sm mb-2 pr-4 relative z-10">{selectedService.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-3 relative z-10">
                              <span className="text-[10px] bg-white px-2 py-0.5 rounded border text-teal-700 font-medium">ID: {selectedService.id}</span>
                              <span className="text-[10px] bg-white px-2 py-0.5 rounded border text-slate-600">{selectedService.category}</span>
                          </div>
                          <div className="flex items-end gap-1 relative z-10">
                               <span className="text-2xl font-bold text-slate-900">₹{selectedService.rate}</span>
                               <span className="text-xs text-slate-500 mb-1">/ 1000 units</span>
                          </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block mb-1">Min / Max</span>
                              <span className="font-bold text-slate-700">{selectedService.min} - {selectedService.max}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block mb-1">Start Time</span>
                              <span className="font-bold text-slate-700">{selectedService.delivery}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block mb-1">Refill</span>
                              <span className={`font-bold ${selectedService.refill === 'No Refill' ? 'text-orange-600' : 'text-green-600'}`}>
                                  {selectedService.refill}
                              </span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block mb-1">Quality</span>
                              <span className="font-bold text-slate-700">{selectedService.quality}</span>
                          </div>
                      </div>

                      {/* Description */}
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                          <h4 className="text-xs font-bold text-blue-800 uppercase mb-2 flex items-center gap-1">
                              <Info className="w-3 h-3" /> Service Description
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                              {selectedService.description}
                          </p>
                          {selectedService.geo !== 'Global' && (
                              <div className="mt-2 pt-2 border-t border-blue-100 text-xs text-blue-700 flex items-center gap-1">
                                  <Globe className="w-3 h-3" /> Target Geo: <span className="font-bold">{selectedService.geo}</span>
                              </div>
                          )}
                      </div>

                      {/* Inputs */}
                      <div className="space-y-4 pt-2">
                          <div>
                              <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Link</label>
                              <input 
                                  type="url" 
                                  placeholder="https://..."
                                  className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none shadow-sm"
                                  value={orderDetails.link}
                                  onChange={e => setOrderDetails({...orderDetails, link: e.target.value})}
                              />
                          </div>
                          <div>
                              <div className="flex justify-between mb-1.5">
                                  <label className="text-xs font-bold text-slate-500 uppercase">Quantity</label>
                                  <span className="text-xs text-teal-600 font-medium">
                                      {orderDetails.quantity >= 10000 ? '🔥 Bulk Discount Applied' : ''}
                                  </span>
                              </div>
                              <input 
                                  type="number" 
                                  className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none shadow-sm"
                                  value={orderDetails.quantity}
                                  onChange={e => setOrderDetails({...orderDetails, quantity: parseInt(e.target.value) || 0})}
                              />
                              <div className="mt-2">
                                  <Slider 
                                    defaultValue={[1000]} 
                                    max={selectedService.max} 
                                    min={selectedService.min} 
                                    step={100}
                                    value={[orderDetails.quantity]}
                                    onValueChange={(val) => setOrderDetails({...orderDetails, quantity: val[0]})}
                                    className="py-2"
                                  />
                              </div>
                          </div>
                      </div>

                      {/* Total Bar */}
                      <div className="bg-slate-900 text-white p-5 rounded-xl shadow-lg mt-auto">
                          <div className="flex justify-between items-center mb-4">
                              <div>
                                  <span className="text-xs text-slate-400 block">Total Cost</span>
                                  <span className="text-2xl font-bold text-teal-400">₹{totalPrice.toLocaleString()}</span>
                              </div>
                              <div className="text-right">
                                  <span className="text-xs text-slate-400 block">Est. Delivery</span>
                                  <span className="text-sm font-medium">{selectedService.speed}</span>
                              </div>
                          </div>

                          <Button 
                            onClick={handleOrder} 
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white h-12 text-md font-bold shadow-lg shadow-teal-500/20"
                          >
                              Submit Order
                          </Button>
                      </div>
                      
                      <div className="flex justify-center gap-4 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1"><Shield size={10} /> Secure Payment</span>
                          <span className="flex items-center gap-1"><Zap size={10} /> Instant Start</span>
                          <span className="flex items-center gap-1"><HelpCircle size={10} /> 24/7 Support</span>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default SmmOrderPanel;
