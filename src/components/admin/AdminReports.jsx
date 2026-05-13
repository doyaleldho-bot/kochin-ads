
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { exportToCSV } from '@/lib/utils';
import { FileText, Download, Calendar, Mail, Users, PieChart as PieIcon, BarChart as BarIcon, Table as TableIcon, Save, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { NotificationService } from '@/api/NotificationService';

const AdminReports = ({ orders, users }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('quick'); // 'quick' or 'builder'
  const [isGenerating, setIsGenerating] = useState(false);

  // Custom Builder State
  const [reportConfig, setReportConfig] = useState({
      metric: 'Revenue',
      dimension: 'Date',
      chartType: 'Bar',
      dateRange: '30days'
  });

  const handleExportCSV = (type) => {
    let data = [];
    let filename = '';

    if (type === 'orders') {
      data = orders.map(o => ({
        OrderID: o.id,
        Date: new Date(o.created_at).toLocaleDateString(),
        Customer: o.user_id,
        Amount: o.total_amount,
        Status: o.status
      }));
      filename = 'kochin_orders_report.csv';
    } else if (type === 'users') {
      data = users.map(u => ({
        Name: u.full_name,
        Email: 'redacted',
        Role: u.role,
        Joined: new Date(u.created_at).toLocaleDateString()
      }));
      filename = 'kochin_users_report.csv';
    }

    exportToCSV(data, filename);
    toast({ title: "Export Started", description: `Downloading ${filename}...` });
  };

  const handleEmailReport = async (type) => {
    setIsGenerating(true);
    setTimeout(async () => {
        await NotificationService.logNotification({
            type: 'system',
            title: `Report Generated: ${type}`,
            message: `The ${type} report has been sent to admin@kochinads.com`,
            recipient_email: 'admin@kochinads.com'
        });
        setIsGenerating(false);
        toast({ title: "Report Sent", description: `The ${type} report has been emailed to you.` });
    }, 1500);
  };

  const saveTemplate = () => {
      toast({ title: "Template Saved", description: "Custom report configuration saved to templates." });
  }

  return (
    <div className="space-y-6">
      
      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('quick')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${activeTab === 'quick' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Quick Exports
          </button>
          <button 
            onClick={() => setActiveTab('builder')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${activeTab === 'builder' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Custom Report Builder
          </button>
      </div>

      {activeTab === 'quick' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Standard Data Exports</h3>
            <div className="flex flex-wrap gap-4">
            <div className="p-4 border border-slate-100 rounded-lg flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <FileText size={20} />
                </div>
                <div className="font-semibold">Orders Report</div>
                </div>
                <p className="text-sm text-slate-500 mb-4">Complete history of all transactions and order statuses.</p>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleExportCSV('orders')} className="w-full">
                        <Download size={14} className="mr-2" /> CSV
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEmailReport('Orders')} disabled={isGenerating} className="w-full">
                        <Mail size={14} className="mr-2" /> Email
                    </Button>
                </div>
            </div>

            <div className="p-4 border border-slate-100 rounded-lg flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                    <Users size={20} />
                </div>
                <div className="font-semibold">Users Report</div>
                </div>
                <p className="text-sm text-slate-500 mb-4">Registered users, roles, and activity summaries.</p>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleExportCSV('users')} className="w-full">
                        <Download size={14} className="mr-2" /> CSV
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEmailReport('Users')} disabled={isGenerating} className="w-full">
                        <Mail size={14} className="mr-2" /> Email
                    </Button>
                </div>
            </div>

            <div className="p-4 border border-slate-100 rounded-lg flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                    <Calendar size={20} />
                </div>
                <div className="font-semibold">Schedule Reports</div>
                </div>
                <p className="text-sm text-slate-500 mb-4">Automate weekly performance summaries.</p>
                <Button size="sm" className="w-full bg-slate-900 text-white">Configure Schedule</Button>
            </div>
            </div>
        </div>
      )}

      {activeTab === 'builder' && (
         <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm animate-in fade-in space-y-8">
             <div className="flex justify-between items-center">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800">Custom Report Builder</h3>
                    <p className="text-sm text-slate-500">Design and generate custom insights from your data.</p>
                 </div>
                 <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={saveTemplate}><Save className="w-4 h-4 mr-2" /> Save Template</Button>
                    <Button size="sm" className="bg-[#0088CC] text-white" onClick={() => handleEmailReport('Custom')}>Generate Report</Button>
                 </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-500">Metric</label>
                     <select 
                        className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        value={reportConfig.metric}
                        onChange={(e) => setReportConfig({...reportConfig, metric: e.target.value})}
                     >
                         <option>Revenue</option>
                         <option>Orders</option>
                         <option>New Users</option>
                         <option>Avg Order Value</option>
                         <option>Conversion Rate</option>
                     </select>
                 </div>
                 <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-500">Dimension</label>
                     <select 
                        className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        value={reportConfig.dimension}
                        onChange={(e) => setReportConfig({...reportConfig, dimension: e.target.value})}
                     >
                         <option>Date</option>
                         <option>District</option>
                         <option>Service Type</option>
                         <option>Device</option>
                         <option>Customer Segment</option>
                     </select>
                 </div>
                 <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-500">Date Range</label>
                     <select 
                        className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        value={reportConfig.dateRange}
                        onChange={(e) => setReportConfig({...reportConfig, dateRange: e.target.value})}
                     >
                         <option value="7days">Last 7 Days</option>
                         <option value="30days">Last 30 Days</option>
                         <option value="90days">Last Quarter</option>
                         <option value="year">Year to Date</option>
                     </select>
                 </div>
                 <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-500">Visualization</label>
                     <div className="flex bg-slate-100 p-1 rounded-md">
                         <button 
                            onClick={() => setReportConfig({...reportConfig, chartType: 'Bar'})}
                            className={`flex-1 flex items-center justify-center py-1.5 rounded text-sm ${reportConfig.chartType === 'Bar' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                         >
                             <BarIcon className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => setReportConfig({...reportConfig, chartType: 'Pie'})}
                            className={`flex-1 flex items-center justify-center py-1.5 rounded text-sm ${reportConfig.chartType === 'Pie' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                         >
                             <PieIcon className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => setReportConfig({...reportConfig, chartType: 'Table'})}
                            className={`flex-1 flex items-center justify-center py-1.5 rounded text-sm ${reportConfig.chartType === 'Table' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                         >
                             <TableIcon className="w-4 h-4" />
                         </button>
                     </div>
                 </div>
             </div>

             {/* Preview Area (Mock) */}
             <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl h-64 flex flex-col items-center justify-center text-slate-400">
                 <p className="mb-2">Preview Generation</p>
                 <p className="text-xs text-slate-400 max-w-md text-center">
                     Showing {reportConfig.metric} by {reportConfig.dimension} for {reportConfig.dateRange} as a {reportConfig.chartType} chart.
                 </p>
                 <div className="mt-4 w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                     <div className="h-full bg-slate-300 w-2/3"></div>
                 </div>
             </div>
         </div>
      )}

    </div>
  );
};

export default AdminReports;
