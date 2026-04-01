import { useState } from 'react';
import {
  BarChart3, TrendingUp, DollarSign, Users, ArrowUp, ArrowDown,
  Activity, Eye, ShoppingBag, Clock
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Tooltip as RechartsTooltip
} from 'recharts';
import { monthlyOrdersData, revenueData } from '@/data/sales';
import {
  revenueVsExpenses, performanceData, weeklyTrafficData,
  topProductsData, hourlySalesData, categoryBreakdown
} from '@/data/reports';
import { ChartTooltip } from '@/components/dashboard/ChartTooltip';

const metrics = [
  { title: 'Total Revenue', value: '$591,234', change: '+18.7%', isPositive: true, icon: DollarSign },
  { title: 'Total Orders', value: '3,237', change: '+12.5%', isPositive: true, icon: BarChart3 },
  { title: 'Conversion Rate', value: '3.42%', change: '+0.8%', isPositive: true, icon: TrendingUp },
  { title: 'New Customers', value: '428', change: '-2.3%', isPositive: false, icon: Users },
];

type RevenueTab = 'overview' | 'comparison' | 'profit';
type TrafficTab = 'visitors' | 'pageViews';

export default function Reports() {
  const [revenueTab, setRevenueTab] = useState<RevenueTab>('overview');
  const [trafficTab, setTrafficTab] = useState<TrafficTab>('visitors');
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  const formatCurrency = (value: number, name: string) => `$${value.toLocaleString()}`;
  const formatNumber = (value: number, name: string) => value.toLocaleString();

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
        <p className="page-description">Analytics and business insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${metric.isPositive ? 'text-success' : 'text-destructive'}`}>
                  {metric.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Area Chart with Tabs */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-foreground">Revenue Analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">Revenue, expenses & profit breakdown</p>
          </div>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {([
              { key: 'overview', label: 'Overview' },
              { key: 'comparison', label: 'Revenue vs Expenses' },
              { key: 'profit', label: 'Profit' },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setRevenueTab(tab.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  revenueTab === tab.key
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {revenueTab === 'overview' ? (
              <AreaChart data={revenueVsExpenses}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
                <RechartsTooltip content={<ChartTooltip formatter={formatCurrency} />} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#revenueGrad)" />
                <Area type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={2} fill="url(#expenseGrad)" />
              </AreaChart>
            ) : revenueTab === 'comparison' ? (
              <BarChart data={revenueVsExpenses}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
                <RechartsTooltip content={<ChartTooltip formatter={formatCurrency} />} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} opacity={0.7} />
              </BarChart>
            ) : (
              <ComposedChart data={revenueVsExpenses}>
                <defs>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
                <RechartsTooltip content={<ChartTooltip formatter={formatCurrency} />} />
                <Area type="monotone" dataKey="profit" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#profitGrad)" />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders Trend with animated line */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Orders Trend</h3>
              <p className="text-sm text-muted-foreground mt-1">Monthly order volume</p>
            </div>
            <div className="flex items-center gap-2 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +24.5%
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyOrdersData}>
                <defs>
                  <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <RechartsTooltip content={<ChartTooltip formatter={formatNumber} />} />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  fill="url(#ordersGrad)"
                  dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 7, stroke: 'hsl(var(--accent))', strokeWidth: 2, fill: 'hsl(var(--card))' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Radar Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Performance Score</h3>
              <p className="text-sm text-muted-foreground mt-1">Current vs previous quarter</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Current
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
                Previous
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="metric"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="hsl(var(--border))"
                  fontSize={10}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Radar
                  name="Previous"
                  dataKey="previous"
                  stroke="hsl(var(--muted-foreground))"
                  fill="hsl(var(--muted-foreground))"
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <RechartsTooltip content={<ChartTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Grid Row 3 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Traffic with Tab */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Weekly Traffic</h3>
              <p className="text-sm text-muted-foreground mt-1">Visitor and pageview analytics</p>
            </div>
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              {([
                { key: 'visitors', label: 'Visitors', icon: Users },
                { key: 'pageViews', label: 'Page Views', icon: Eye },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setTrafficTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    trafficTab === tab.key
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrafficData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <RechartsTooltip content={<ChartTooltip formatter={formatNumber} />} />
                <Bar
                  dataKey={trafficTab}
                  fill="hsl(var(--primary))"
                  radius={[6, 6, 0, 0]}
                  animationDuration={500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Pie (interactive) */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-6">Sales by Category</h3>
          <div className="h-52 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={activePieIndex !== null ? 90 : 85}
                  paddingAngle={4}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                  onMouseLeave={() => setActivePieIndex(null)}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={activePieIndex === null || activePieIndex === index ? 1 : 0.4}
                      stroke={activePieIndex === index ? entry.color : 'transparent'}
                      strokeWidth={activePieIndex === index ? 3 : 0}
                      style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  content={<ChartTooltip formatter={(v) => `${v}%`} />}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categoryBreakdown.map((cat, index) => (
              <div
                key={cat.name}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  activePieIndex === index ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
                onMouseEnter={() => setActivePieIndex(index)}
                onMouseLeave={() => setActivePieIndex(null)}
              >
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-sm text-muted-foreground truncate">{cat.name}</span>
                <span className="text-sm font-semibold text-foreground ml-auto">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Grid Row 4 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hourly Sales Pattern */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Peak Sales Hours</h3>
              <p className="text-sm text-muted-foreground mt-1">Sales volume by time of day</p>
            </div>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlySalesData}>
                <defs>
                  <linearGradient id="hourlyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <RechartsTooltip content={<ChartTooltip formatter={(v) => `${v} orders`} />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--warning))"
                  strokeWidth={2.5}
                  fill="url(#hourlyGrad)"
                  activeDot={{ r: 6, stroke: 'hsl(var(--warning))', strokeWidth: 2, fill: 'hsl(var(--card))' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Performance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Top Products</h3>
              <p className="text-sm text-muted-foreground mt-1">Revenue and growth metrics</p>
            </div>
            <ShoppingBag className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {topProductsData.map((product, index) => {
              const maxRevenue = Math.max(...topProductsData.map((p) => p.revenue));
              const percentage = (product.revenue / maxRevenue) * 100;
              return (
                <div key={product.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground w-5">#{index + 1}</span>
                      <span className="text-sm font-medium text-foreground">{product.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">
                        ${product.revenue.toLocaleString()}
                      </span>
                      <span className={`text-xs font-medium flex items-center gap-0.5 ${
                        product.growth >= 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {product.growth >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700 ease-out group-hover:opacity-80"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{product.units} units sold</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-6">Monthly Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Revenue', value: '$82,400', subtext: 'December 2024', icon: DollarSign },
            { label: 'New Orders', value: '421', subtext: 'Best month this year', icon: ShoppingBag },
            { label: 'Avg Order Value', value: '$195.72', subtext: '+$12.30 from November', icon: Activity },
            { label: 'Return Rate', value: '2.8%', subtext: 'Below industry average', icon: TrendingUp },
            { label: 'Satisfaction', value: '4.8/5', subtext: 'Based on 234 reviews', icon: Users },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
              </div>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
