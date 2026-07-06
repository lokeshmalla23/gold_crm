import { useState } from 'react';
import { Plus, Truck, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { suppliers as initial, formatINR, formatDate } from '../data/mockData';

export default function Suppliers() {
  const [list, setList] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', mobile: '', email: '', items: '' });

  const active = list.filter((s) => s.status === 'Active').length;
  const totalPurchase = list.reduce((s, r) => s + r.totalPurchase, 0);
  const totalDue = list.reduce((s, r) => s + r.balanceDue, 0);

  const handleAdd = () => {
    if (!form.name) return;
    setList((l) => [{ ...form, id: Date.now(), totalPurchase: 0, balanceDue: 0, lastOrder: '-', status: 'Active' }, ...l]);
    setForm({ name: '', contact: '', mobile: '', email: '', items: '' });
    setShowModal(false);
  };

  const columns = [
    { key: 'name', title: 'Supplier', render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">{r.name[0]}</div>
        <div>
          <div className="font-medium text-gray-900">{r.name}</div>
          <div className="text-xs text-gray-500">{r.contact}</div>
        </div>
      </div>
    ) },
    { key: 'mobile', title: 'Contact', render: (r) => (
      <div>
        <div className="text-sm">{r.mobile}</div>
        <div className="text-xs text-gray-500">{r.email}</div>
      </div>
    ) },
    { key: 'items', title: 'Items Supplied' },
    { key: 'totalPurchase', title: 'Total Purchase', render: (r) => <span className="font-semibold">{formatINR(r.totalPurchase)}</span> },
    { key: 'balanceDue', title: 'Balance Due', render: (r) => <span className={`font-semibold ${r.balanceDue > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatINR(r.balanceDue)}</span> },
    { key: 'lastOrder', title: 'Last Order', render: (r) => r.lastOrder === '-' ? '-' : formatDate(r.lastOrder) },
    { key: 'status', title: 'Status', render: (r) => <Badge variant={r.status === 'Active' ? 'green' : 'gray'}>{r.status}</Badge> }
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Suppliers" value={list.length} icon={Truck} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="Active" value={active} icon={CheckCircle} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard label="Total Purchase" value={formatINR(totalPurchase)} icon={DollarSign} iconBg="bg-amber-100" iconColor="text-amber-600" />
        <StatCard label="Balance Due" value={formatINR(totalDue)} icon={AlertCircle} iconBg="bg-red-100" iconColor="text-red-600" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Suppliers</h3>
          <button onClick={() => setShowModal(true)} className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium text-sm flex items-center gap-2"><Plus className="w-4 h-4" />Add Supplier</button>
        </div>
        <DataTable columns={columns} data={list} pageSize={10} />
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New Supplier"
        footer={<>
          <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={handleAdd} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">Save Supplier</button>
        </>}
      >
        <div className="grid grid-cols-2 gap-4">
          <F label="Supplier Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <F label="Contact Person" value={form.contact} onChange={(v) => setForm({ ...form, contact: v })} />
          <F label="Mobile" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
          <F label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <div className="col-span-2"><F label="Items Supplied" value={form.items} onChange={(v) => setForm({ ...form, items: v })} /></div>
        </div>
      </Modal>
    </div>
  );
}

function F({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none" />
    </div>
  );
}
