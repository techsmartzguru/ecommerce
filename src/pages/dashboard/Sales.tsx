import { DollarSign, TrendingUp, ShoppingBag, CreditCard } from 'lucide-react';
import { sales, Sale } from '@/data/sales';
import { StatCard } from '@/components/dashboard/StatCard';

export default function Sales() {
  const totalSales = sales.reduce((acc, sale) => acc + sale.amount, 0);
  const avgOrderValue = totalSales / sales.length;

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Sales</h1>
        <p className="page-description">Track your sales performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          change="+15.3% from last week"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Average Order"
          value={`$${avgOrderValue.toFixed(2)}`}
          change="+8.2% from last week"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Transactions"
          value={sales.length.toString()}
          change="+12 from last week"
          changeType="positive"
          icon={ShoppingBag}
        />
        <StatCard
          title="Credit Card Sales"
          value={`$${sales.filter(s => s.paymentMethod === 'Credit Card').reduce((acc, s) => acc + s.amount, 0).toFixed(2)}`}
          change="Most popular method"
          changeType="neutral"
          icon={CreditCard}
        />
      </div>

      {/* Sales History Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Sales History</h3>
          <p className="text-sm text-muted-foreground mt-1">Recent completed transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Payment Method</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="table-row">
                  <td className="px-6 py-4 text-muted-foreground">{sale.date}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{sale.orderId}</td>
                  <td className="px-6 py-4 text-muted-foreground">{sale.customer}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-sm">
                      <CreditCard className="w-3.5 h-3.5" />
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-foreground">${sale.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
