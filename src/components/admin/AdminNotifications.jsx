
import React, { useState, useEffect } from 'react';
import { NotificationService } from '@/api/NotificationService';
import { Bell, Check, Clock, AlertTriangle, Mail } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    
    // Subscribe to new notifications
    const subscription = supabase
      .channel('public:notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, payload => {
          setNotifications(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
        subscription.unsubscribe();
    }
  }, []);

  const fetchNotifications = async () => {
    try {
        const data = await NotificationService.getNotifications();
        if (data) setNotifications(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch(type) {
        case 'order': return <Check className="w-5 h-5 text-green-500" />;
        case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
        case 'system': return <Clock className="w-5 h-5 text-blue-500" />;
        default: return <Mail className="w-5 h-5 text-slate-500" />;
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading logs...</div>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Bell className="w-4 h-4" /> Notification Center
            </h3>
            <span className="text-xs text-slate-500">{notifications.length} Total</span>
        </div>
        <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-400">No notifications logged yet.</div>
            ) : (
                notifications.map(notif => (
                    <div key={notif.id} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 bg-slate-100 rounded-full">
                                {getIcon(notif.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-slate-800 text-sm">{notif.title}</h4>
                                    <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                                        {new Date(notif.created_at).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-xs px-2 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-500 uppercase tracking-wider">
                                        {notif.type}
                                    </span>
                                    {notif.recipient_email && (
                                        <span className="text-xs text-slate-400">To: {notif.recipient_email}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  );
};

export default AdminNotifications;
