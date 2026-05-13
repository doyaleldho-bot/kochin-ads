
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  TrendingUp, Users, ShoppingBag, Activity, DollarSign, 
  Globe, Smartphone, Clock, ThumbsUp, Filter, MousePointer, Map 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLORS = ['#0088CC', '#FF9500', '#8B5CF6', '#10B981', '#F43F5E', '#3B82F6'];

const WidgetCard = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
        {title}
      </h3>
    </div>
    <div className="flex-grow min-h-[200px]">
      {children}
    </div>
  </div>
);

const AdminDashboard = ({ stats }) => {
  // --- MOCK DATA FOR ADVANCED ANALYTICS ---
  
  const funnelData = [
    { name: 'Impressions', value: 12000, drop: '0%' },
    { name: 'Sessions', value: 8500, drop: '29%' },
    { name: 'Product View', value: 4200, drop: '50%' },
    { name: 'Add to Cart', value: 1800, drop: '57%' },
    { name: 'Checkout', value: 950, drop: '47%' },
    { name: 'Purchase', value: 820, drop: '14%' },
  ];

  const cohortData = [
    { name: 'W1', retention: 100 },
    { name: 'W2', retention: 75 },
    { name: 'W3', retention: 60 },
    { name: 'W4', retention: 45 },
    { name: 'W5', retention: 40 },
    { name: 'W6', retention: 35 },
  ];

  const segmentationData = [
    { x: 10, y: 30, z: 200, name: 'New' },
    { x: 30, y: 200, z: 500, name: 'Loyal' },
    { x: 45, y: 100, z: 400, name: 'At Risk' },
    { x: 50, y: 400, z: 1000, name: 'VIP' },
    { x: 70, y: 150, z: 300, name: 'Dormant' },
  ];

  const attributionData = [
    { name: 'Direct', value: 30 },
    { name: 'Organic Search', value: 25 },
    { name: 'Social Ads', value: 20 },
    { name: 'Referral', value: 15 },
    { name: 'Email', value: 10 },
  ];

  const predictiveData = [
    { month: 'Jan', actual: 4000, predicted: 4000 },
    { month: 'Feb', actual: 3000, predicted: 4200 },
    { month: 'Mar', actual: 2000, predicted: 4400 },
    { month: 'Apr', actual: 2780, predicted: 4600 },
    { month: 'May', actual: 1890, predicted: 4800 },
    { month: 'Jun', actual: 2390, predicted: 5000 },
    { month: 'Jul', actual: null, predicted: 5200 }, // Future
    { month: 'Aug', actual: null, predicted: 5400 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Analytics Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800">Advanced Analytics Dashboard</h2>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-slate-600"><Filter className="w-4 h-4 mr-2"/> Filters</Button>
            <Button variant="outline" size="sm" className="text-slate-600"><Clock className="w-4 h-4 mr-2"/> Last 30 Days</Button>
        </div>
      </div>

      {/* 2. Key Metrics Cards (Standard) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Predicted Revenue (Q3)</p>
                <h3 className="text-2xl font-bold text-slate-900">₹15.2L</h3>
                <span className="text-xs text-blue-600 font-medium">AI Forecast</span>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-slate-900">3.8%</h3>
                <span className="text-xs text-green-600 font-medium">+0.4% vs last week</span>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Customer LTV</p>
                <h3 className="text-2xl font-bold text-slate-900">₹8,450</h3>
                <span className="text-xs text-purple-600 font-medium">Avg Lifetime Value</span>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">Avg Session</p>
                <h3 className="text-2xl font-bold text-slate-900">4m 12s</h3>
                <span className="text-xs text-orange-600 font-medium">Heatmap Verified</span>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-orange-600" />
            </div>
        </div>
      </div>

      {/* 3. Advanced Charts Row 1: Funnel & Cohort */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetCard title="Conversion Funnel Analysis" icon={Filter}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#0088CC" radius={[0, 4, 4, 0]}>
                        {funnelData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-between text-xs text-slate-500 px-4">
                <span>Top of Funnel</span>
                <span>Purchase Complete</span>
            </div>
        </WidgetCard>

        <WidgetCard title="User Retention Cohorts" icon={Users}>
             <div className="h-[300px] flex items-end justify-between gap-2 px-4 pb-4">
                {cohortData.map((d, i) => (
                    <div key={i} className="flex flex-col items-center w-full group">
                         <div className="text-xs font-bold text-slate-600 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{d.retention}%</div>
                         <div 
                            className="w-full bg-blue-100 rounded-t-md relative overflow-hidden" 
                            style={{ height: '200px' }}
                        >
                            <div 
                                className="absolute bottom-0 w-full bg-[#0088CC] transition-all duration-1000"
                                style={{ height: `${d.retention}%`, opacity: 1 - (i * 0.15) }}
                            ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-500 mt-2">{d.name}</span>
                    </div>
                ))}
             </div>
             <p className="text-center text-xs text-slate-500 mt-2">Weekly Retention Rate (Weeks since signup)</p>
        </WidgetCard>
      </div>

      {/* 4. Advanced Charts Row 2: Segmentation & Predictive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WidgetCard title="Customer Segmentation" icon={Users} className="lg:col-span-2">
             <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="Order Frequency" unit="" />
                    <YAxis type="number" dataKey="y" name="Avg Order Value" unit="₹" />
                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="LTV" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Customer Segments" data={segmentationData} fill="#8884d8">
                        {segmentationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Scatter>
                </ScatterChart>
             </ResponsiveContainer>
             <p className="text-xs text-slate-400 text-center">X: Order Freq | Y: Avg Order Value | Size: LTV</p>
          </WidgetCard>

          <WidgetCard title="Predictive Revenue" icon={TrendingUp}>
             <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={predictiveData}>
                    <defs>
                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="actual" stroke="#0088CC" fill="transparent" strokeWidth={2} name="Actual" />
                    <Area type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeDasharray="5 5" fill="url(#colorPredicted)" strokeWidth={2} name="AI Predicted" />
                </AreaChart>
             </ResponsiveContainer>
             <div className="flex justify-center gap-4 text-xs mt-2">
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#0088CC] rounded-full"></div> Actual</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div> AI Forecast</span>
             </div>
          </WidgetCard>
      </div>

       {/* 5. Attribution & Journey */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <WidgetCard title="Marketing Attribution" icon={Globe}>
              <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                      <Pie
                          data={attributionData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                      >
                          {attributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="middle" align="right" layout="vertical" />
                  </PieChart>
              </ResponsiveContainer>
           </WidgetCard>
           
           <WidgetCard title="A/B Testing Results (Checkout Page)" icon={Activity}>
              <div className="space-y-4 pt-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-slate-700">Variant A (Original)</span>
                          <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">Control</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Conv. Rate: 2.1%</span>
                          <span className="text-slate-500">Revenue: ₹4.2L</span>
                      </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 relative overflow-hidden">
                       <div className="absolute right-0 top-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg">WINNER</div>
                      <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-green-800">Variant B (Simplified)</span>
                          <span className="text-xs bg-green-200 px-2 py-1 rounded text-green-700">Test</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-green-700 font-bold">Conv. Rate: 3.5%</span>
                          <span className="text-green-700">Revenue: ₹6.8L</span>
                      </div>
                  </div>
              </div>
           </WidgetCard>
       </div>

    </div>
  );
};

export default AdminDashboard;
