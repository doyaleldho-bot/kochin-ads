
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Globe, CheckCircle, XCircle, Plus, Layout, Settings, 
  MessageSquare, Users, DollarSign, Image as ImageIcon
} from 'lucide-react';

const AdminSmmManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingAds, setPendingAds] = useState([]);
  const [packages, setPackages] = useState([]);
  
  // Create Ad Form State
  const [adForm, setAdForm] = useState({ platform: 'instagram', content: '', budget: '', target: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Mocking pending ads fetch
    const { data: ads } = await supabase.from('smm_posts').select('*').eq('status', 'pending');
    // Mocking packages fetch
    const { data: pkgs } = await supabase.from('smm_packages').select('*');
    
    setPendingAds(ads || []);
    setPackages(pkgs || []);
  };

  const handlePostAd = (e) => {
      e.preventDefault();
      toast({ title: "Ad Scheduled", description: "The ad has been queued for posting." });
      setAdForm({ platform: 'instagram', content: '', budget: '', target: '' });
  };

  const handleApprove = async (id, approved) => {
      // Logic to update status
      toast({ 
          title: approved ? "Ad Approved" : "Ad Rejected", 
          variant: approved ? "default" : "destructive" 
      });
      setPendingAds(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
       {/* Header */}
       <div className="p-6 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center">
           <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
               <Globe className="text-blue-600" /> SMM Master Control
           </h2>
           <div className="flex gap-2">
               <Button size="sm" variant="outline" onClick={() => setActiveTab('settings')}><Settings className="w-4 h-4 mr-2"/> Settings</Button>
               <Button size="sm" className="bg-blue-600" onClick={() => setActiveTab('create')}><Plus className="w-4 h-4 mr-2"/> Create Ad</Button>
           </div>
       </div>

       {/* Tabs */}
       <div className="flex border-b border-slate-200">
           {['overview', 'create', 'approvals', 'packages'].map(tab => (
               <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-4 text-sm font-medium capitalize border-b-2 transition-colors ${
                       activeTab === tab ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-slate-500 hover:text-slate-700'
                   }`}
               >
                   {tab}
               </button>
           ))}
       </div>

       <div className="p-6 flex-grow">
           {activeTab === 'overview' && (
               <div className="space-y-6">
                   <div className="grid grid-cols-4 gap-4">
                       <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                           <div className="text-sm text-slate-500 mb-1">Active Ads</div>
                           <div className="text-2xl font-bold">142</div>
                       </div>
                       <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                           <div className="text-sm text-slate-500 mb-1">Total Reach</div>
                           <div className="text-2xl font-bold text-purple-600">2.4M</div>
                       </div>
                       <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                           <div className="text-sm text-slate-500 mb-1">Pending Approval</div>
                           <div className="text-2xl font-bold text-orange-600">{pendingAds.length + 12}</div>
                       </div>
                       <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                           <div className="text-sm text-slate-500 mb-1">Revenue (Mo)</div>
                           <div className="text-2xl font-bold text-green-600">₹8.5L</div>
                       </div>
                   </div>
                   
                   <div className="h-64 bg-slate-50 rounded-xl border border-slate-200 p-4">
                       <h3 className="font-bold text-sm text-slate-500 mb-4">Platform Performance (Clicks)</h3>
                       <ResponsiveContainer width="100%" height="90%">
                           <BarChart data={[
                               { name: 'Instagram', val: 4000 },
                               { name: 'Facebook', val: 3000 },
                               { name: 'WhatsApp', val: 2000 },
                               { name: 'YouTube', val: 2780 },
                               { name: 'Twitter', val: 1890 },
                           ]}>
                               <XAxis dataKey="name" />
                               <YAxis />
                               <Tooltip />
                               <Bar dataKey="val" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                           </BarChart>
                       </ResponsiveContainer>
                   </div>
               </div>
           )}

           {activeTab === 'create' && (
               <div className="max-w-2xl mx-auto">
                   <h3 className="text-lg font-bold mb-6">Post New Ad / Update</h3>
                   <form onSubmit={handlePostAd} className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium mb-1">Platform</label>
                               <select className="w-full p-2 border rounded" value={adForm.platform} onChange={e => setAdForm({...adForm, platform: e.target.value})}>
                                   <option value="instagram">Instagram</option>
                                   <option value="facebook">Facebook</option>
                                   <option value="whatsapp">WhatsApp</option>
                                   <option value="telegram">Telegram</option>
                               </select>
                           </div>
                           <div>
                               <label className="block text-sm font-medium mb-1">Ad Type</label>
                               <select className="w-full p-2 border rounded">
                                   <option>Image Post</option>
                                   <option>Video Reel</option>
                                   <option>Story</option>
                                   <option>Status Update</option>
                               </select>
                           </div>
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1">Target Audience (Geo/Interest)</label>
                           <input className="w-full p-2 border rounded" placeholder="e.g. Kochi, Ages 18-35, Foodies" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium mb-1">Caption / Content</label>
                           <textarea className="w-full p-2 border rounded h-32" placeholder="Write your ad copy here..." />
                       </div>
                       <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                           <ImageIcon className="mx-auto text-slate-400 mb-2" />
                           <p className="text-sm text-slate-500">Upload Creative Asset</p>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="block text-sm font-medium mb-1">Budget (₹)</label>
                               <input type="number" className="w-full p-2 border rounded" placeholder="5000" />
                           </div>
                           <div>
                               <label className="block text-sm font-medium mb-1">Schedule Date</label>
                               <input type="date" className="w-full p-2 border rounded" />
                           </div>
                       </div>
                       <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Schedule Ad Post</Button>
                   </form>
               </div>
           )}

           {activeTab === 'approvals' && (
               <div className="space-y-4">
                   <h3 className="font-bold text-slate-800">Pending Ad Approvals</h3>
                   {/* Simulated List since DB is empty initially */}
                   {[1, 2, 3].map(i => (
                       <div key={i} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                           <div className="w-24 h-24 bg-slate-200 rounded-lg flex-shrink-0"></div>
                           <div className="flex-1">
                               <div className="flex justify-between items-start">
                                   <h4 className="font-bold text-slate-900">Summer Sale Promo #{i}</h4>
                                   <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Instagram</span>
                               </div>
                               <p className="text-sm text-slate-600 mt-1 line-clamp-2">Get 50% off on all items this summer! Visit our store in Lulu Mall...</p>
                               <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                                   <span>User: John Doe</span>
                                   <span>Budget: ₹2,000</span>
                               </div>
                           </div>
                           <div className="flex flex-col gap-2">
                               <Button size="sm" className="bg-green-600" onClick={() => handleApprove(i, true)}><CheckCircle size={16}/></Button>
                               <Button size="sm" variant="destructive" onClick={() => handleApprove(i, false)}><XCircle size={16}/></Button>
                           </div>
                       </div>
                   ))}
               </div>
           )}

           {activeTab === 'packages' && (
               <div>
                   <div className="flex justify-between mb-4">
                       <h3 className="font-bold">Manage SMM Packages</h3>
                       <Button size="sm" variant="outline"><Plus size={14} className="mr-2"/> New Package</Button>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                       {['Starter', 'Professional', 'Enterprise'].map(pkg => (
                           <div key={pkg} className="p-4 border rounded-xl">
                               <h4 className="font-bold">{pkg}</h4>
                               <div className="text-2xl font-bold text-blue-600 my-2">₹XX,XXX</div>
                               <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                                   <li>Feature 1</li>
                                   <li>Feature 2</li>
                                   <li>Feature 3</li>
                               </ul>
                               <Button size="sm" variant="outline" className="w-full mt-4">Edit</Button>
                           </div>
                       ))}
                   </div>
               </div>
           )}
       </div>
    </div>
  );
};

export default AdminSmmManager;
