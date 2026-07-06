import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { IndianRupee, Package, Users, Gem, Plus, Receipt, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import { monthlySales, categorySales, topSellingItems, invoices, formatINR, formatDate, inventory, customers } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const totalStockValue = inventory.reduce((s, i) => s + i.sellingPrice * i.qty, 0);
  const totalItems = inventory.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's Sales" value={formatINR(850000)} change={12} icon={IndianRupee} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard label="Gold Stock Value" value={formatINR(totalStockValue)} change={5} icon={Gem} iconBg="bg-amber-100" iconColor="text-amber-600" />
        <StatCard label="Available Items" value={totalItems.toLocaleString('en-IN')} change={-2} icon={Package} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="Total Customers" value={customers.length.toLocaleString('en-IN')} change={3} icon={Users} iconBg="bg-purple-100" iconColor="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Monthly Sales</h3>
              <p className="text-xs text-gray-500">Sales performance over the year</p>
            </div>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v / 100000}L`} />
              <Tooltip formatter={(v) => formatINR(v)} contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Bar dataKey="sales" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-1">Gold Categories</h3>
          <p className="text-xs text-gray-500 mb-4">Sales share by category</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={categorySales} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {categorySales.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categorySales.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }}></span>
                <span className="text-gray-600">{c.name}</span>
                <span className="text-gray-400 ml-auto">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onClick={() => navigate('/customers')} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"><UserPlus className="w-5 h-5" /></div>
            <div className="text-left">
              <div className="font-medium text-gray-900 text-sm">Add Customer</div>
              <div className="text-xs text-gray-500">Register new customer</div>
            </div>
          </button>
          <button onClick={() => navigate('/billing')} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center"><Receipt className="w-5 h-5" /></div>
            <div className="text-left">
              <div className="font-medium text-gray-900 text-sm">Create Bill</div>
              <div className="text-xs text-gray-500">Generate new invoice</div>
            </div>
          </button>
          <button onClick={() => navigate('/inventory')} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><Plus className="w-5 h-5" /></div>
            <div className="text-left">
              <div className="font-medium text-gray-900 text-sm">Add Jewellery</div>
              <div className="text-xs text-gray-500">New inventory item</div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Top Selling Items</h3>
            <Badge variant="gold">This Month</Badge>
          </div>
          <div className="space-y-2">
            {topSellingItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-xs font-bold text-amber-900">#{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.category} · {item.sold} sold</div>
                </div>
                <div className="text-sm font-semibold text-gray-900">{formatINR(item.revenue)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
            <button onClick={() => navigate('/billing')} className="text-xs text-amber-600 font-medium hover:text-amber-700">View all</button>
          </div>
          <div className="space-y-2">
            {invoices.slice(0, 5).map((inv) => (
              <div key={inv.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold">
                  {inv.customerName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{inv.customerName}</div>
                  <div className="text-xs text-gray-500">{inv.id} · {formatDate(inv.date)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{formatINR(inv.totalAmount)}</div>
                  <div className="text-xs text-gray-500">{inv.paymentMode}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
