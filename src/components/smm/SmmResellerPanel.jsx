
import React, { useState } from 'react';
import { Copy, RefreshCw, Key, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const SmmResellerPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('ka_live_.........................');
  const [showKey, setShowKey] = useState(false);

  const generateNewKey = () => {
    // In real app, call API to rotate key
    const newKey = `ka_live_${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast({ title: "New Key Generated", description: "Previous key has been invalidated." });
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({ title: "Copied!", description: "API Key copied to clipboard." });
  };

  return (
    <div className="space-y-6">
       <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-lg">
           <div className="flex justify-between items-start">
               <div>
                   <h2 className="text-2xl font-bold mb-2">Reseller Dashboard</h2>
                   <p className="text-slate-300">Manage your API integration and bulk orders.</p>
               </div>
               <div className="text-right">
                   <div className="text-sm text-slate-400">Wallet Balance</div>
                   <div className="text-3xl font-bold text-green-400">₹12,450.00</div>
                   <Button variant="link" className="text-white p-0 h-auto text-xs mt-1">Add Funds +</Button>
               </div>
           </div>
       </div>

       <div className="grid md:grid-cols-2 gap-6">
           {/* API Key Management */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <Key className="w-5 h-5 text-blue-500" /> API Credentials
               </h3>
               <div className="space-y-4">
                   <div>
                       <label className="text-xs font-bold text-slate-500 uppercase">API Key</label>
                       <div className="flex gap-2 mt-1">
                           <input 
                             type={showKey ? "text" : "password"} 
                             value={apiKey} 
                             readOnly 
                             className="flex-grow p-2 bg-slate-50 border border-slate-200 rounded font-mono text-sm"
                           />
                           <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)}>
                               <span className="text-xs">{showKey ? 'Hide' : 'Show'}</span>
                           </Button>
                           <Button variant="outline" size="icon" onClick={copyKey}>
                               <Copy className="w-4 h-4" />
                           </Button>
                       </div>
                   </div>
                   <div className="pt-4 flex justify-between items-center">
                       <span className="text-xs text-slate-500">Last used: 2 mins ago</span>
                       <Button variant="destructive" size="sm" onClick={generateNewKey}>
                           <RefreshCw className="w-3 h-3 mr-2" /> Rotate Key
                       </Button>
                   </div>
               </div>
           </div>

           {/* Quick Stats */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-800 mb-4">API Usage Stats</h3>
               <div className="space-y-4">
                   <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                       <span className="text-sm text-slate-600">Orders (24h)</span>
                       <span className="font-bold text-slate-900">142</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                       <span className="text-sm text-slate-600">Error Rate</span>
                       <span className="font-bold text-green-600">0.02%</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                       <span className="text-sm text-slate-600">Spend (30d)</span>
                       <span className="font-bold text-slate-900">₹45,200</span>
                   </div>
               </div>
               <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href='/api-docs'}>
                   View API Documentation
               </Button>
           </div>
       </div>
    </div>
  );
};

export default SmmResellerPanel;
