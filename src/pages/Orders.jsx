import DataTable from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import { invoices, formatINR, formatDate } from '../data/mockData';
import { ShoppingBag, CheckCircle, Clock, IndianRupee } from 'lucide-react';

export default function Orders() {
  const paid = invoices.filter((i) => i.status === 'Paid').length;
  const partial = invoices.filter((i) => i.status === 'Partial').length;
  const revenue = invoices.reduce((s, i) => s + i.totalAmount, 0);

  const columns = [
    { key: 'id', title: 'Order #', render: (r) => <span className="font-medium text-gray-900">{r.id}</span> },
    { key: 'customerName', title: 'Customer' },
    { key: 'date', title: 'Date', render: (r) => formatDate(r.date) },
    { key: 'items', title: 'Items' },
    { key: 'paymentMode', title: 'Payment' },
    { key: 'totalAmount', title: 'Total', render: (r) => <span className="font-semibold text-gray-900">{formatINR(r.totalAmount)}</span> },
    { key: 'status', title: 'Status', render: (r) => <Badge variant={r.status === 'Paid' ? 'green' : r.status === 'Partial' ? 'yellow' : 'gray'}>{r.status}</Badge> }
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={invoices.length} icon={ShoppingBag} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="Paid" value={paid} icon={CheckCircle} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard label="Partial" value={partial} icon={Clock} iconBg="bg-yellow-100" iconColor="text-yellow-600" />
        <StatCard label="Total Revenue" value={formatINR(revenue)} icon={IndianRupee} iconBg="bg-amber-100" iconColor="text-amber-600" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <DataTable columns={columns} data={invoices} pageSize={10} />
      </div>
    </div>
  );
}
