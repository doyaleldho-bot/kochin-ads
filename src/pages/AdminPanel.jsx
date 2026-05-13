
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Navigate } from 'react-router-dom';
import { 
  Users, ShoppingBag, ShieldAlert, 
  BarChart3, Settings, Menu, X, Bell, Search, LogOut, FileText, Image, Upload, MessageSquare, Mail, Activity,
  Zap, Link as LinkIcon, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Import modular components
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminReports from '@/components/admin/AdminReports';
import AdminNotifications from '@/components/admin/AdminNotifications';
import AdminChat from '@/components/admin/AdminChat';
import EmailMarketing from '@/components/admin/EmailMarketing';
import AdminUserManagement from '@/components/admin/AdminUserManagement';
import AdminActivityLogs from '@/components/admin/AdminActivityLogs';
import AdminWorkflows from '@/components/admin/AdminWorkflows';
import AdminIntegrations from '@/components/admin/AdminIntegrations';
import AdminSmmManager from '@/components/admin/AdminSmmManager'; // NEW

const OrdersTable = () => {
    // Basic orders table
    const orders = [
        { id: 'ORD-001', customer: 'John Doe', amount: '₹25,000', status: 'Completed', date: '2023-12-25' },
        { id: 'ORD-002', customer: 'Sarah Smith', amount: '₹12,500', status: 'Processing', date: '2023-12-24' },
        { id: 'ORD-003', customer: 'Tech Corp', amount: '₹1,50,000', status: 'Pending', date: '2023-12-23' },
    ];
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Recent Orders</h3>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500">
                    <tr>
                        <th className="p-4 font-medium">Order ID</th>
                        <th className="p-4 font-medium">Customer</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Amount</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50">
                            <td className="p-4 font-medium">{order.id}</td>
                            <td className="p-4">{order.customer}</td>
                            <td className="p-4 text-slate-500">{order.date}</td>
                            <td className="p-4 font-medium">{order.amount}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                    order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-4">
                                <Button variant="ghost" size="sm" className="text-blue-600">View</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const GalleryUpload = () => {
    const { toast } = useToast();
    const handleUpload = (e) => {
        e.preventDefault();
        toast({ title: "Upload Successful", description: "Image added to the gallery." });
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Image className="w-5 h-5"/> Gallery Management</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 font-medium">Drag & Drop images here or click to browse</p>
                <p className="text-xs text-slate-400 mt-2">Supports JPG, PNG, WEBP (Max 5MB)</p>
                <Button className="mt-6" onClick={handleUpload}>Select Files</Button>
            </div>
        </div>
    );
};

// Main Admin Panel Component
const AdminPanel = () => {
  const { user, profile, signOut, loading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ usersCount: 0, ordersCount: 0 });
  
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const { count: usersCount, data: usersData } = await supabase.from('profiles').select('*', { count: 'exact' });
        const { count: ordersCount, data: ordersData } = await supabase.from('orders').select('*', { count: 'exact' });
        
        setStats({ usersCount, ordersCount });
        if(ordersData) setAllOrders(ordersData);
        if(usersData) setAllUsers(usersData);
    };
    if (isAdmin) fetchData();
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'smm', label: 'SMM Manager', icon: Globe }, // NEW
    { id: 'users', label: 'User Management', icon: Users }, 
    { id: 'orders', label: 'Orders & Bookings', icon: ShoppingBag },
    { id: 'chat', label: 'Support Chat', icon: MessageSquare },
    { id: 'email', label: 'Email Campaigns', icon: Mail },
    { id: 'workflows', label: 'Automation', icon: Zap }, 
    { id: 'integrations', label: 'Integrations', icon: LinkIcon }, 
    { id: 'reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'logs', label: 'Activity Logs', icon: Activity }, 
    { id: 'gallery', label: 'Media Gallery', icon: Image },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Portal - Kochin Ads</title>
      </Helmet>
      
      <div className="min-h-screen bg-slate-100 flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Sidebar */}
        <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#1A1F2C] text-white z-50 transform transition-transform duration-300 md:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="p-6 border-b border-slate-700/50 flex items-center gap-3">
             <img src="https://horizons-cdn.hostinger.com/7ec1cf53-4f51-44ad-ac86-4813f22a6038/468da3ae0bed8e53719c3ab97e40c208.jpg" alt="Logo" className="w-10 h-10 rounded" />
             <div className="flex-1">
                <h1 className="text-xl font-bold tracking-wider">KOCHIN<span className="text-blue-500">ADS</span></h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Super Admin</p>
             </div>
             <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400"><X /></button>
           </div>
           
           <div className="p-4 space-y-1">
             {menuItems.map(item => (
                 <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                        activeTab === item.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                 >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                 </button>
             ))}
           </div>

           <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-700/50 bg-[#1A1F2C]">
             <Button onClick={signOut} variant="destructive" className="w-full justify-start hover:bg-red-600/90">
               <LogOut className="w-4 h-4 mr-3" /> Sign Out
             </Button>
           </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow w-full md:w-auto overflow-y-auto h-screen">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-8 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-600"><Menu /></button>
                    <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
                </div>
            </header>

            <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'overview' && <AdminDashboard stats={stats} />}
                {activeTab === 'smm' && <AdminSmmManager />}
                {activeTab === 'users' && <AdminUserManagement />}
                {activeTab === 'orders' && <OrdersTable />}
                {activeTab === 'chat' && <AdminChat />}
                {activeTab === 'email' && <EmailMarketing />}
                {activeTab === 'workflows' && <AdminWorkflows />}
                {activeTab === 'integrations' && <AdminIntegrations />}
                {activeTab === 'reports' && <AdminReports orders={allOrders} users={allUsers} />}
                {activeTab === 'notifications' && <AdminNotifications />}
                {activeTab === 'logs' && <AdminActivityLogs />}
                {activeTab === 'gallery' && <GalleryUpload />}
                
                {activeTab === 'settings' && (
                     <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-3xl">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">System Settings</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                <div>
                                    <h4 className="font-medium">Maintenance Mode</h4>
                                    <p className="text-sm text-slate-500">Temporarily disable access for users</p>
                                </div>
                                <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div></div>
                            </div>
                            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                <div>
                                    <h4 className="font-medium">Two-Factor Authentication</h4>
                                    <p className="text-sm text-slate-500">Enforce 2FA for all admin accounts</p>
                                </div>
                                <Button variant="outline" size="sm">Configure</Button>
                            </div>
                             <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Backup & Restore</h4>
                                    <p className="text-sm text-slate-500">Last backup: 2 hours ago</p>
                                </div>
                                <Button size="sm">Create Backup Now</Button>
                            </div>
                        </div>
                     </div>
                )}
            </div>
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
