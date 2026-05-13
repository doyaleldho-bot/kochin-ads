
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Mail, Plus, Send, BarChart2, Users, FileText, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const EmailMarketing = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Campaign State
  const [newCampaign, setNewCampaign] = useState({ title: '', subject: '', content: '' });
  const [showCreator, setShowCreator] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: camps } = await supabase.from('email_campaigns').select('*').order('created_at', { ascending: false });
    const { data: temps } = await supabase.from('email_templates').select('*');
    setCampaigns(camps || []);
    setTemplates(temps || []);
    setIsLoading(false);
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('email_campaigns').insert([newCampaign]);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Success", description: "Campaign created successfully!" });
      setShowCreator(false);
      fetchData();
    }
  };

  const sendCampaign = async (id) => {
    // Simulation of sending
    toast({ title: "Sending...", description: "Email campaign is being queued." });
    setTimeout(async () => {
      await supabase.from('email_campaigns').update({ status: 'sent', sent_at: new Date() }).eq('id', id);
      toast({ title: "Sent!", description: "Campaign sent to 1,240 subscribers." });
      fetchData();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Mail className="text-[#008080]" /> Email Marketing Automation
        </h2>
        <Button onClick={() => setShowCreator(true)} className="bg-[#008080] hover:bg-[#006666]">
            <Plus className="w-4 h-4 mr-2" /> New Campaign
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {[
            { id: 'campaigns', label: 'Campaigns', icon: Send },
            { id: 'templates', label: 'Templates', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart2 },
            { id: 'subscribers', label: 'Subscribers', icon: Users },
        ].map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id 
                    ? 'border-[#008080] text-[#008080] bg-teal-50' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
                <tab.icon size={16} /> {tab.label}
            </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow">
        {isLoading ? <div className="text-center py-10">Loading...</div> : (
           <>
             {activeTab === 'campaigns' && (
                <div className="space-y-4">
                    {showCreator && (
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 animate-in slide-in-from-top-5">
                            <h3 className="font-bold mb-4">Create New Campaign</h3>
                            <div className="space-y-4">
                                <input 
                                    className="w-full p-2 border rounded" 
                                    placeholder="Internal Title (e.g., Q1 Newsletter)" 
                                    value={newCampaign.title}
                                    onChange={e => setNewCampaign({...newCampaign, title: e.target.value})}
                                />
                                <input 
                                    className="w-full p-2 border rounded" 
                                    placeholder="Email Subject Line" 
                                    value={newCampaign.subject}
                                    onChange={e => setNewCampaign({...newCampaign, subject: e.target.value})}
                                />
                                <textarea 
                                    className="w-full p-2 border rounded h-32" 
                                    placeholder="HTML Content..." 
                                    value={newCampaign.content}
                                    onChange={e => setNewCampaign({...newCampaign, content: e.target.value})}
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleCreateCampaign}>Save Draft</Button>
                                    <Button variant="ghost" onClick={() => setShowCreator(false)}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {campaigns.length === 0 ? <p className="text-slate-500">No campaigns yet.</p> : (
                        <div className="grid gap-4">
                            {campaigns.map(c => (
                                <div key={c.id} className="border border-slate-200 rounded-lg p-4 flex justify-between items-center hover:bg-slate-50">
                                    <div>
                                        <h4 className="font-bold text-slate-800">{c.title}</h4>
                                        <p className="text-sm text-slate-500">Subject: {c.subject}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {c.status.toUpperCase()}
                                            </span>
                                            {c.sent_at && <span className="text-xs text-slate-400 self-center">Sent: {new Date(c.sent_at).toLocaleDateString()}</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {c.status !== 'sent' && (
                                            <Button size="sm" onClick={() => sendCampaign(c.id)} className="bg-[#008080] hover:bg-[#006666]">
                                                Send Now
                                            </Button>
                                        )}
                                        <Button size="sm" variant="outline"><Edit size={14}/></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
             )}

             {activeTab === 'templates' && (
                 <div className="grid grid-cols-3 gap-6">
                     {templates.map(t => (
                         <div key={t.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                             <div className="h-32 bg-slate-100 rounded mb-4 flex items-center justify-center text-slate-400">Preview</div>
                             <h4 className="font-bold">{t.name}</h4>
                             <p className="text-xs text-slate-500 uppercase mt-1">{t.type}</p>
                         </div>
                     ))}
                 </div>
             )}

             {activeTab === 'analytics' && (
                 <div className="grid grid-cols-4 gap-6">
                     {[
                         { label: 'Avg Open Rate', val: '24.8%' },
                         { label: 'Avg Click Rate', val: '4.2%' },
                         { label: 'Total Sent', val: '12.5k' },
                         { label: 'Unsubscribes', val: '0.8%' },
                     ].map((stat, i) => (
                         <div key={i} className="p-6 bg-slate-50 rounded-xl text-center">
                             <h3 className="text-3xl font-bold text-[#008080]">{stat.val}</h3>
                             <p className="text-sm text-slate-500 mt-2">{stat.label}</p>
                         </div>
                     ))}
                 </div>
             )}
             
             {activeTab === 'subscribers' && (
                 <div className="text-center py-10 text-slate-500">
                     <Users size={48} className="mx-auto mb-4 opacity-20" />
                     <p>Manage your 1,240 subscribers here.</p>
                     <Button variant="outline" className="mt-4">Import CSV</Button>
                 </div>
             )}
           </>
        )}
      </div>
    </div>
  );
};

export default EmailMarketing;
