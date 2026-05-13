
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Navigate, Link } from 'react-router-dom';
import { 
  User, Package, Calendar, Settings, CreditCard, 
  LogOut, LayoutDashboard, Globe, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import UserSmmDashboard from '@/components/user/UserSmmDashboard';
import SmmResellerPanel from '@/components/smm/SmmResellerPanel'; // NEW

const Dashboard = () => {
  const { user, profile, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
        fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'smm', label: 'Social Media', icon: Globe },
    { id: 'reseller', label: 'Reseller API', icon: Zap }, // NEW
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'settings', label: 'Profile Settings', icon: Settings },
  ];

  return (
    <>
      <Helmet><title>Dashboard - Kochin Ads</title></Helmet>
      <div className="pt-20 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl">
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-800">{profile?.full_name || 'User'}</h2>
                            <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                    activeTab === tab.id 
                                    ? 'bg-teal-50 text-teal-700' 
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                        <div className="h-px bg-slate-100 my-2"></div>
                        <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3">
                {activeTab === 'overview' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="bg-[#1A1F2C] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.full_name?.split(' ')[0]}!</h1>
                                <p className="text-slate-300 mb-6">You have 2 active campaigns and 1 pending order.</p>
                                <div className="flex gap-4">
                                    <Button className="bg-teal-500 hover:bg-teal-600 border-none">Create Campaign</Button>
                                    <Button variant="outline" className="text-slate-900 border-white bg-white hover:bg-slate-100">View Analytics</Button>
                                </div>
                            </div>
                            <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4">Quick Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-lg">
                                        <div className="text-2xl font-bold text-slate-900">{orders.length}</div>
                                        <div className="text-xs text-slate-500">Total Orders</div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-lg">
                                        <div className="text-2xl font-bold text-teal-600">0</div>
                                        <div className="text-xs text-slate-500">Reward Points</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'smm' && (
                    <div className="animate-in fade-in">
                        <UserSmmDashboard user={user} />
                    </div>
                )}

                {activeTab === 'reseller' && (
                    <div className="animate-in fade-in">
                        <SmmResellerPanel />
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Order History</h3>
                        </div>
                        {orders.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">No orders found.</div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="p-4">Order ID</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Amount</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td className="p-4 font-medium">{order.id.slice(0,8)}...</td>
                                            <td className="p-4 text-slate-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="p-4">₹{order.total_amount}</td>
                                            <td className="p-4"><span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">{order.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
