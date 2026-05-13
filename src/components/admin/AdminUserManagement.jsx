
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Search, Shield, User, MoreVertical, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');
    if (data) setUsers(data);
    setLoading(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    // In a real app, this would be a secure Edge Function call
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    
    if (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to update role" });
    } else {
        toast({ title: "Role Updated", description: `User role changed to ${newRole}` });
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> User Management
            </h3>
            <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                    <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">Company</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Joined</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {loading ? (
                        <tr><td colSpan="5" className="p-8 text-center text-slate-500">Loading...</td></tr>
                    ) : filteredUsers.length === 0 ? (
                         <tr><td colSpan="5" className="p-8 text-center text-slate-500">No users found</td></tr>
                    ) : (
                        filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                            {user.full_name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <div className="text-slate-900">{user.full_name}</div>
                                            <div className="text-xs text-slate-500">ID: {user.id.slice(0, 6)}...</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">{user.company_name || '-'}</td>
                                <td className="p-4">
                                    <select 
                                        value={user.role || 'user'}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs font-medium cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </td>
                                <td className="p-4 text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4 text-slate-500" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default AdminUserManagement;
