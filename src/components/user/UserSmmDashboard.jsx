
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  Instagram, Facebook, Twitter, MessageCircle, TrendingUp, Users, 
  Plus, Calendar, Link as LinkIcon, AlertCircle, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const UserSmmDashboard = ({ user }) => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock Analytics Data
  const analyticsData = [
    { day: 'Mon', likes: 120, reach: 4000 },
    { day: 'Tue', likes: 145, reach: 4500 },
    { day: 'Wed', likes: 200, reach: 6000 },
    { day: 'Thu', likes: 180, reach: 5500 },
    { day: 'Fri', likes: 250, reach: 7000 },
    { day: 'Sat', likes: 300, reach: 8500 },
    { day: 'Sun', likes: 280, reach: 8000 },
  ];

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    const { data: accs } = await supabase.from('social_accounts').select('*').eq('user_id', user.id);
    const { data: camps } = await supabase.from('smm_campaigns').select('*').eq('user_id', user.id);
    
    setAccounts(accs || []);
    setCampaigns(camps || []);
    setLoading(false);
  };

  const handleConnect = async (platform) => {
    // Simulated connection
    toast({ title: "Connecting...", description: `Redirecting to ${platform} login...` });
    setTimeout(async () => {
        const { error } = await supabase.from('social_accounts').insert({
            user_id: user.id,
            platform: platform.toLowerCase(),
            account_name: `${user.email}'s ${platform}`,
            is_connected: true
        });
        if (!error) {
            toast({ title: "Connected!", description: `${platform} account linked successfully.` });
            fetchData();
        }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">SMM Dashboard</h2>
        <Button className="bg-teal-600"><Plus className="w-4 h-4 mr-2" /> New Campaign</Button>
      </div>

      {/* 1. Account Connections */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {['Instagram', 'Facebook', 'WhatsApp', 'Twitter'].map(platform => {
             const isConnected = accounts.find(a => a.platform === platform.toLowerCase());
             const icons = { Instagram, Facebook, WhatsApp: MessageCircle, Twitter };
             const Icon = icons[platform];
             
             return (
                 <div key={platform} className={`p-4 rounded-xl border flex items-center justify-between ${isConnected ? 'bg-white border-slate-200' : 'bg-slate-50 border-dashed border-slate-300'}`}>
                     <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-full ${isConnected ? 'bg-teal-50 text-teal-600' : 'bg-slate-200 text-slate-500'}`}>
                             <Icon size={20} />
                         </div>
                         <div>
                             <h4 className="font-bold text-sm text-slate-900">{platform}</h4>
                             <p className="text-xs text-slate-500">{isConnected ? 'Connected' : 'Not Linked'}</p>
                         </div>
                     </div>
                     {!isConnected && (
                         <Button size="sm" variant="ghost" onClick={() => handleConnect(platform)}><LinkIcon size={14}/></Button>
                     )}
                 </div>
             );
         })}
      </div>

      {/* 2. Analytics Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" /> Engagement Growth
            </h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="likes" stroke="#008080" strokeWidth={2} />
                        <Line type="monotone" dataKey="reach" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-xs">
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-teal-600 rounded-full"></div> Likes/Engagement</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> Reach (x10)</span>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-500 text-sm uppercase mb-2">Total Followers</h3>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-slate-900">12,450</span>
                    <span className="text-sm text-green-600 font-bold mb-1 flex items-center"><TrendingUp size={14} className="mr-1"/> +5.2%</span>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-500 text-sm uppercase mb-2">Active Campaigns</h3>
                <div className="text-4xl font-bold text-slate-900">{campaigns.length}</div>
                <div className="mt-4 space-y-2">
                    {campaigns.slice(0, 3).map(c => (
                        <div key={c.id} className="flex justify-between text-sm">
                            <span className="text-slate-600 truncate max-w-[120px]">{c.name}</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">{c.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* 3. Content Calendar Preview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-500" /> Upcoming Content</h3>
              <Button variant="outline" size="sm">View Full Calendar</Button>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((d) => {
                  const date = new Date();
                  date.setDate(date.getDate() + d);
                  return (
                      <div key={d} className="border border-slate-100 rounded-lg p-3 bg-slate-50 min-h-[120px]">
                          <div className="text-xs font-bold text-slate-500 mb-2">{date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</div>
                          {d === 1 ? (
                              <div className="bg-white p-2 rounded border border-slate-200 shadow-sm text-xs">
                                  <div className="flex items-center gap-1 mb-1 text-pink-600 font-bold"><Instagram size={10} /> Reel</div>
                                  <p className="line-clamp-2 text-slate-600">Product launch teaser video...</p>
                              </div>
                          ) : d === 3 ? (
                              <div className="bg-white p-2 rounded border border-slate-200 shadow-sm text-xs">
                                  <div className="flex items-center gap-1 mb-1 text-green-600 font-bold"><MessageCircle size={10} /> Status</div>
                                  <p className="line-clamp-2 text-slate-600">Weekend sale announcement...</p>
                              </div>
                          ) : (
                              <div className="flex items-center justify-center h-full text-slate-300">
                                  <Plus size={20} />
                              </div>
                          )}
                      </div>
                  )
              })}
          </div>
      </div>

    </div>
  );
};

export default UserSmmDashboard;
