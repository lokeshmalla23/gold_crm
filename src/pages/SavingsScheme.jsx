import { useState } from 'react';
import { Plus, PiggyBank, TrendingUp, Calendar, Award } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { savingsSchemes as initial, customers, formatINR, formatDate } from '../data/mockData';

export default function SavingsScheme() {
  const [list, setList] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customerId: '', planAmount: 10000, duration: 12, plan: 'Gold Monthly ₹10K' });

  const active = list.filter((s) => s.status === 'Active').length;
  const collected = list.reduce((s, r) => s + r.totalPaid, 0);
  const dueMonth = list.filter((s) => s.status === 'Active').length;
  const maturityMonth = list.filter((s) => s.maturity && s.maturity.startsWith('2026-07')).length;

  const handleAdd = () => {
    if (!form.customerId) return;
    const cust = customers.find((c) => c.id === Number(form.customerId));
    const bonus = Math.round(Number(form.planAmount) * 0.5);
    setList((l) => [{
      id: 'SC-' + Math.floor(Math.random() * 900 + 100),
      customerId: cust.id, customerName: cust.name,
      plan: form.plan, planAmount: Number(form.planAmount), duration: Number(form.duration),
      paidMonths: 0, totalPaid: 0, remaining: Number(form.planAmount) * Number(form.duration),
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      maturity: new Date(Date.now() + Number(form.duration) * 30 * 86400000).toISOString().split('T')[0],
      bonus, status: 'Active'
    }, ...l]);
    setShowModal(false);
  };

  const columns = [
    { key: 'id', title: 'Scheme #' },
    { key: 'customerName', title: 'Customer', render: (r) => <span className="font-medium text-gray-900">{r.customerName}</span> },
    { key: 'plan', title: 'Plan' },
    { key: 'planAmount', title: 'Amount/mo', render: (r) => formatINR(r.planAmount) },
    { key: 'duration', title: 'Duration', render: (r) => `${r.duration} mo` },
    { key: 'paidMonths', title: 'Paid', render: (r) => (
      <div>
        <div className="text-sm font-medium">{r.paidMonths}/{r.duration}</div>
        <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${(r.paidMonths / r.duration) * 100}%` }}></div></div>
      </div>
    ) },
    { key: 'totalPaid', title: 'Total Paid', render: (r) => <span className="font-semibold">{formatINR(r.totalPaid)}</span> },
    { key: 'dueDate', title: 'Next Due', render: (r) => r.dueDate === '-' ? '-' : formatDate(r.dueDate) },
    { key: 'maturity', title: 'Maturity', render: (r) => formatDate(r.maturity) },
    { key: 'bonus', title: 'Bonus', render: (r) => <span className="text-emerald-600 font-medium">{formatINR(r.bonus)}</span> },
    { key: 'status', title: 'Status', render: (r) => <Badge variant={r.status === 'Active' ? 'blue' : r.status === 'Matured' ? 'green' : 'gray'}>{r.status}</Badge> }
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Schemes" value={active} icon={PiggyBank} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="Total Collected" value={formatINR(collected)} icon={TrendingUp} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard label="Due This Month" value={dueMonth} icon={Calendar} iconBg="bg-yellow-100" iconColor="text-yellow-600" />
        <StatCard label="Maturing" value={maturityMonth} icon={Award} iconBg="bg-amber-100" iconColor="text-amber-600" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Savings Schemes</h3>
          <button onClick={() => setShowModal(true)} className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium text-sm flex items-center gap-2"><Plus className="w-4 h-4" />New Scheme</button>
        </div>
        <DataTable columns={columns} data={list} pageSize={10} />
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Savings Scheme"
        footer={<>
          <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={handleAdd} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">Create Scheme</button>
        </>}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer *</label>
            <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <option value="">Select customer</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Plan Name</label>
            <input value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Monthly Amount</label>
            <input type="number" value={form.planAmount} onChange={(e) => setForm({ ...form, planAmount: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Duration (months)</label>
            <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
