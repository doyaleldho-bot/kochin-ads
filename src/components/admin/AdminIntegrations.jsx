
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const IntegrationCard = ({ name, icon, desc, isConnected, onConnect }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <img src={icon} alt={name} className="w-12 h-12 object-contain" />
      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isConnected ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
        {isConnected ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
        {isConnected ? 'Active' : 'Not Connected'}
      </span>
    </div>
    <h3 className="font-bold text-slate-900 mb-1">{name}</h3>
    <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{desc}</p>
    <Button 
      variant={isConnected ? "outline" : "default"} 
      className={`w-full ${isConnected ? '' : 'bg-slate-900 text-white'}`}
      onClick={onConnect}
    >
      {isConnected ? 'Configure' : 'Connect'}
    </Button>
  </div>
);

const AdminIntegrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState([]);
  
  const availableIntegrations = [
    { id: 'slack', name: 'Slack', icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png', desc: 'Send booking notifications to your team channel.' },
    { id: 'google_calendar', name: 'Google Calendar', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968499.png', desc: 'Sync bookings directly to your calendar.' },
    { id: 'salesforce', name: 'Salesforce', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968914.png', desc: 'Sync customer data and leads automatically.' },
    { id: 'zapier', name: 'Zapier', icon: 'https://cdn-icons-png.flaticon.com/512/4946/4946009.png', desc: 'Connect with 5000+ apps using webhooks.' },
    { id: 'stripe', name: 'Stripe', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968382.png', desc: 'Manage payments and payouts.' },
    { id: 'mailchimp', name: 'Mailchimp', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968502.png', desc: 'Sync subscribers for email marketing.' },
  ];

  useEffect(() => {
    // In a real app, fetch from DB. Simulating here.
    const fetchInts = async () => {
        const { data } = await supabase.from('integrations').select('*');
        if (data) setIntegrations(data);
    };
    fetchInts();
  }, []);

  const handleConnect = async (provider) => {
    // Simulate connection flow
    const isAlreadyConnected = integrations.some(i => i.provider === provider && i.is_connected);
    
    if (isAlreadyConnected) {
        toast({ title: "Configuration", description: `${provider} settings opened.` });
    } else {
        toast({ title: "Connecting...", description: `Redirecting to ${provider} auth...` });
        
        // Simulate success after delay
        setTimeout(async () => {
            const { error } = await supabase.from('integrations').upsert({
                provider, is_connected: true
            }, { onConflict: 'provider' });

            if (!error) {
                toast({ title: "Success", description: `${provider} connected successfully!` });
                // Refresh local state logic would go here
            }
        }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
           <h2 className="text-xl font-bold text-slate-800">Integration Hub</h2>
           <p className="text-sm text-slate-500">Supercharge your workflow by connecting third-party tools.</p>
        </div>
        <Button variant="outline"><RefreshCw className="w-4 h-4 mr-2"/> Refresh Status</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableIntegrations.map(integ => {
            const dbRecord = integrations.find(i => i.provider === integ.id);
            return (
                <IntegrationCard 
                    key={integ.id} 
                    {...integ} 
                    isConnected={dbRecord?.is_connected || false}
                    onConnect={() => handleConnect(integ.id)}
                />
            );
        })}
      </div>
    </div>
  );
};

export default AdminIntegrations;
