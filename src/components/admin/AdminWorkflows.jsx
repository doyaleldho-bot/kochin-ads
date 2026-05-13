
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Zap, Plus, ArrowRight, Save, Trash2, Clock, Mail, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminWorkflows = () => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    trigger: 'booking_created',
    action: 'send_email',
    delay: '0'
  });

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    const { data } = await supabase.from('workflows').select('*').order('created_at', { ascending: false });
    if (data) setWorkflows(data);
  };

  const handleSave = async () => {
    if (!newWorkflow.name) return toast({ variant: 'destructive', title: 'Name required' });

    const { error } = await supabase.from('workflows').insert({
      name: newWorkflow.name,
      trigger_event: newWorkflow.trigger,
      action_type: newWorkflow.action,
      config: { delay: newWorkflow.delay },
      is_active: true
    });

    if (error) {
      toast({ variant: 'destructive', title: 'Error saving workflow' });
    } else {
      toast({ title: 'Workflow Activated', description: 'Automation rule created successfully.' });
      setShowBuilder(false);
      fetchWorkflows();
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    await supabase.from('workflows').update({ is_active: !currentStatus }).eq('id', id);
    fetchWorkflows();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" /> Automation Workflows
          </h2>
          <p className="text-sm text-slate-500">Create rules to automate repetitive tasks.</p>
        </div>
        <Button onClick={() => setShowBuilder(true)} className="bg-[#008080]">
          <Plus className="w-4 h-4 mr-2" /> Create Workflow
        </Button>
      </div>

      {/* Builder UI */}
      {showBuilder && (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-4">
          <h3 className="font-bold mb-4">New Workflow Rule</h3>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            
            {/* Trigger */}
            <div className="flex-1 w-full bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">When this happens...</label>
              <select 
                className="w-full p-2 border rounded"
                value={newWorkflow.trigger}
                onChange={e => setNewWorkflow({...newWorkflow, trigger: e.target.value})}
              >
                <option value="booking_created">New Booking Created</option>
                <option value="payment_received">Payment Received</option>
                <option value="user_signup">New User Signup</option>
                <option value="cart_abandoned">Cart Abandoned</option>
              </select>
            </div>

            <ArrowRight className="text-slate-400 hidden md:block" />

            {/* Delay/Condition */}
            <div className="flex-1 w-full bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Wait For...</label>
              <select 
                className="w-full p-2 border rounded"
                value={newWorkflow.delay}
                onChange={e => setNewWorkflow({...newWorkflow, delay: e.target.value})}
              >
                <option value="0">Immediately</option>
                <option value="1h">1 Hour</option>
                <option value="24h">24 Hours</option>
                <option value="7d">7 Days</option>
              </select>
            </div>

            <ArrowRight className="text-slate-400 hidden md:block" />

            {/* Action */}
            <div className="flex-1 w-full bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Do this...</label>
              <select 
                className="w-full p-2 border rounded"
                value={newWorkflow.action}
                onChange={e => setNewWorkflow({...newWorkflow, action: e.target.value})}
              >
                <option value="send_email">Send Email</option>
                <option value="send_sms">Send SMS</option>
                <option value="admin_alert">Notify Admin</option>
                <option value="create_task">Create Task</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input 
              className="flex-grow p-2 border rounded" 
              placeholder="Workflow Name (e.g., Welcome Email Sequence)"
              value={newWorkflow.name}
              onChange={e => setNewWorkflow({...newWorkflow, name: e.target.value})}
            />
            <Button variant="ghost" onClick={() => setShowBuilder(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">Save & Activate</Button>
          </div>
        </div>
      )}

      {/* Workflow List */}
      <div className="grid gap-4">
        {workflows.map(wf => (
          <div key={wf.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className={`p-3 rounded-full ${wf.is_active ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{wf.name}</h4>
                <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">If {wf.trigger_event}</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">Then {wf.action_type}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant={wf.is_active ? "outline" : "default"}
                onClick={() => toggleStatus(wf.id, wf.is_active)}
                className={!wf.is_active ? 'bg-slate-900 text-white' : ''}
              >
                {wf.is_active ? 'Pause' : 'Activate'}
              </Button>
              <Button size="icon" variant="ghost" className="text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkflows;
