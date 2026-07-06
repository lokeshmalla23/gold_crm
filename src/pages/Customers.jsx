import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Download, Phone, Mail } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import { CustomerTypeBadge } from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { customers as initialCustomers, formatINR, formatDate, kycStatus, loyaltyPoints } from '../data/mockData';
import { Users, Star, Crown, TrendingUp } from 'lucide-react';
import * as cls from '../styles/classes';

export default function Customers() {
  const navigate = useNavigate();
  const [list, setList] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', email: '', address: '', type: 'Regular', birthday: '', anniversary: '' });

  const filtered = useMemo(() => {
    return list.filter((c) => {
      const matchTab = tab === 'All' || c.type === tab;
      const q = search.toLowerCase();
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.mobile.includes(q) || c.email.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [list, search, tab]);

  const counts = {
    All: list.length,
    Regular: list.filter((c) => c.type === 'Regular').length,
    Premium: list.filter((c) => c.type === 'Premium').length,
    VIP: list.filter((c) => c.type === 'VIP').length
  };

  const handleAdd = () => {
    if (!form.name || !form.mobile) return;
    setList((l) => [{ ...form, id: Date.now(), totalPurchases: 0, lastVisit: new Date().toISOString().split('T')[0], notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] }, ...l]);
    setForm({ name: '', mobile: '', email: '', address: '', type: 'Regular', birthday: '', anniversary: '' });
    setShowModal(false);
  };

  const columns = [
    { key: 'name', title: 'Customer', render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 to-yellow-500 text-amber-900 font-semibold flex items-center justify-center text-xs">
          {r.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <div className="font-medium text-gray-900">{r.name}</div>
          <div className={cls.mutedText}>ID: CUS-{String(r.id).padStart(4, '0')}</div>
        </div>
      </div>
    ) },
    { key: 'mobile', title: 'Contact', render: (r) => (
      <div>
        <div className={`flex items-center gap-1.5 ${cls.bodyText}`}><Phone className="w-3 h-3 text-gray-400" />{r.mobile}</div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5"><Mail className="w-3 h-3 text-gray-400" />{r.email}</div>
      </div>
    ) },
    { key: 'type', title: 'Type', render: (r) => <CustomerTypeBadge type={r.type} /> },
    { key: 'kyc', title: 'KYC', render: (r) => {
      const s = kycStatus[r.id] || 'Pending';
      return <span className={`${cls.badge} ${s === 'Verified' ? cls.badgeColor.green : cls.badgeColor.amber}`}>{s === 'Verified' ? 'Verified ✓' : 'Pending'}</span>;
    } },
    { key: 'loyalty', title: 'Loyalty', render: (r) => {
      const lp = loyaltyPoints[r.id];
      const points = lp?.points || Math.floor(r.totalPurchases / 1000);
      let tier = lp?.tier;
      if (!tier) { tier = points >= 10000 ? 'Platinum' : points >= 5000 ? 'Gold' : points >= 2000 ? 'Silver' : 'Bronze'; }
      const tierColor = { Platinum: 'bg-purple-100 text-purple-700', Gold: 'bg-amber-100 text-amber-700', Silver: 'bg-gray-200 text-gray-700', Bronze: 'bg-orange-100 text-orange-700' }[tier];
      return (
        <div>
          <div className="text-sm font-semibold text-gray-900">{points.toLocaleString('en-IN')} pts</div>
          <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold mt-0.5 ${tierColor}`}>{tier}</span>
        </div>
      );
    } },
    { key: 'totalPurchases', title: 'Total Purchases', render: (r) => <span className="font-semibold text-gray-900">{formatINR(r.totalPurchases)}</span> },
    { key: 'lastVisit', title: 'Last Visit', render: (r) => formatDate(r.lastVisit) },
    { key: 'actions', title: 'Actions', render: (r) => (
      <button onClick={(e) => { e.stopPropagation(); navigate(`/customers/${r.id}`); }} className="text-xs text-amber-600 font-medium hover:text-amber-700">
        View Profile →
      </button>
    ) }
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Customers" value={list.length} icon={Users} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="VIP Customers" value={counts.VIP} icon={Crown} iconBg="bg-amber-100" iconColor="text-amber-600" />
        <StatCard label="Premium" value={counts.Premium} icon={Star} iconBg="bg-purple-100" iconColor="text-purple-600" />
        <StatCard label="Regular" value={counts.Regular} icon={TrendingUp} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
      </div>

      <div className={cls.card}>
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
            {['All', 'Regular', 'Premium', 'VIP'].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
                {t} <span className="text-xs text-gray-400 ml-1">({counts[t]})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, mobile, email..." className={`${cls.inputIcon} w-64`} />
            </div>
            <button className={cls.btnIcon}><Filter className="w-4 h-4" />Filter</button>
            <button className={cls.btnIcon}><Download className="w-4 h-4" />Export</button>
            <button onClick={() => setShowModal(true)} className={`${cls.btnPrimary} flex items-center gap-2`}><Plus className="w-4 h-4" />Add Customer</button>
          </div>
        </div>
        <DataTable columns={columns} data={filtered} onRowClick={(r) => navigate(`/customers/${r.id}`)} pageSize={10} />
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Customer"
        footer={<>
          <button onClick={() => setShowModal(false)} className={cls.btnSecondary}>Cancel</button>
          <button onClick={handleAdd} className={cls.btnPrimary}>Save Customer</button>
        </>}
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Mobile *" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
          <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <div>
            <label className={`${cls.fieldLabel}`}>Customer Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={cls.input}>
              <option>Regular</option>
              <option>Premium</option>
              <option>VIP</option>
            </select>
          </div>
          <Field label="Birthday" type="date" value={form.birthday} onChange={(v) => setForm({ ...form, birthday: v })} />
          <Field label="Anniversary" type="date" value={form.anniversary} onChange={(v) => setForm({ ...form, anniversary: v })} />
          <div className="col-span-2">
            <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className={cls.fieldLabel}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cls.input}
      />
    </div>
  );
}
