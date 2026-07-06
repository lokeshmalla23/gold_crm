import { useMemo, useState } from 'react';
import { Search, Plus, Factory, Weight, TrendingDown, X, CheckCircle2, Eye, Edit3 } from 'lucide-react';
import { karigars as initialKarigars, karigarOrders as initialOrders, formatINR, formatDate } from '../data/mockData';

const STATUS_COLORS = {
  Issued: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  Received: 'bg-emerald-100 text-emerald-700',
};

export default function Karigar() {
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState(initialOrders);
  const [karigars, setKarigars] = useState(initialKarigars);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [karigarFilter, setKarigarFilter] = useState('All');
  const [showNew, setShowNew] = useState(false);
  const [showAddKarigar, setShowAddKarigar] = useState(false);
  const [receiving, setReceiving] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  const filtered = useMemo(() => orders.filter((o) =>
    (statusFilter === 'All' || o.status === statusFilter) &&
    (karigarFilter === 'All' || o.karigarName === karigarFilter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.designNo.toLowerCase().includes(search.toLowerCase()) || o.description.toLowerCase().includes(search.toLowerCase()))
  ), [orders, search, statusFilter, karigarFilter]);

  const stats = useMemo(() => ({
    active: orders.filter((o) => o.status !== 'Received').length,
    issued: orders.reduce((s, o) => s + (o.goldIssued || 0), 0),
    received: orders.reduce((s, o) => s + (o.returnedWeight || 0), 0),
    wastage: orders.reduce((s, o) => s + (o.wastage || 0), 0),
  }), [orders]);

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {toast}
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-gray-900">Manufacturing / Karigar</h2>
        <p className="text-sm text-gray-500">Manage artisan work orders — gold issued, manufacturing, and return</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex">
        {[
          { key: 'orders', label: 'Karigar Orders' },
          { key: 'list', label: 'Karigar List' },
        ].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t.key ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Active Orders" value={stats.active} icon={Factory} color="bg-blue-50 text-blue-700" />
            <StatCard label="Gold Issued" value={stats.issued.toFixed(2) + 'g'} icon={Weight} color="bg-amber-50 text-amber-700" />
            <StatCard label="Gold Received" value={stats.received.toFixed(2) + 'g'} icon={CheckCircle2} color="bg-emerald-50 text-emerald-700" />
            <StatCard label="Total Wastage" value={stats.wastage.toFixed(2) + 'g'} icon={TrendingDown} color="bg-red-50 text-red-700" />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search order, design, description..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option>All</option><option>Issued</option><option>In Progress</option><option>Received</option>
            </select>
            <select value={karigarFilter} onChange={(e) => setKarigarFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option value="All">All Karigars</option>
              {karigars.map((k) => <option key={k.id}>{k.name}</option>)}
            </select>
            <button onClick={() => setShowNew(true)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />New Order
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600">
                  <Th>Order #</Th><Th>Design</Th><Th>Description</Th><Th>Karigar</Th><Th>Category</Th><Th>Issued</Th><Th>Expected</Th><Th>Returned</Th><Th>Wastage</Th><Th>Labour</Th><Th>Issue Date</Th><Th>Status</Th><Th>Actions</Th>
                </tr></thead>
                <tbody>
                  {filtered.map((o) => {
                    const wastagePct = o.returnedWeight ? (o.wastage / o.goldIssued) * 100 : 0;
                    return (
                      <tr key={o.id} className="border-b border-gray-50 last:border-0">
                        <Td className="font-mono text-xs font-semibold">{o.id}</Td>
                        <Td className="font-mono text-xs">{o.designNo}</Td>
                        <Td className="max-w-[200px] truncate">{o.description}</Td>
                        <Td>{o.karigarName}</Td>
                        <Td>{o.category}</Td>
                        <Td>{o.goldIssued}g</Td>
                        <Td>{o.expectedFinishedWeight}g</Td>
                        <Td>{o.returnedWeight != null ? `${o.returnedWeight}g` : '—'}</Td>
                        <Td>{o.wastage != null ? <span className={wastagePct > 3 ? 'text-red-600 font-semibold' : 'text-emerald-600 font-semibold'}>{o.wastage}g ({wastagePct.toFixed(1)}%)</span> : '—'}</Td>
                        <Td>{o.totalLabour != null ? formatINR(o.totalLabour) : '—'}</Td>
                        <Td>{formatDate(o.issueDate)}</Td>
                        <Td><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[o.status]}`}>{o.status}</span></Td>
                        <Td>{o.status !== 'Received' && <button onClick={() => setReceiving(o)} className="p-1.5 rounded hover:bg-emerald-50" title="Receive"><CheckCircle2 className="w-4 h-4 text-emerald-600" /></button>}</Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'list' && (
        <>
          <div className="flex justify-end">
            <button onClick={() => setShowAddKarigar(true)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />Add Karigar
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600">
                  <Th>Name</Th><Th>Mobile</Th><Th>Specialty</Th><Th>Rate/g</Th><Th>Balance</Th><Th>Total Orders</Th><Th>Status</Th><Th>Actions</Th>
                </tr></thead>
                <tbody>
                  {karigars.map((k) => (
                    <tr key={k.id} className="border-b border-gray-50 last:border-0">
                      <Td className="font-medium">{k.name}</Td>
                      <Td>{k.mobile}</Td>
                      <Td>{k.specialty}</Td>
                      <Td>{formatINR(k.ratePerGram)}</Td>
                      <Td className={k.balance > 0 ? 'text-red-600 font-semibold' : 'text-gray-700'}>{formatINR(k.balance)}</Td>
                      <Td>{k.totalWork}</Td>
                      <Td><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${k.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{k.status}</span></Td>
                      <Td><button className="p-1.5 rounded hover:bg-gray-100"><Eye className="w-4 h-4 text-gray-600" /></button></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showNew && <NewOrderModal karigars={karigars} onClose={() => setShowNew(false)} onSave={(o) => { setOrders([o, ...orders]); setShowNew(false); showToast('Karigar order created'); }} />}
      {receiving && <ReceiveModal order={receiving} onClose={() => setReceiving(null)} onSave={(returnedWeight) => {
        const wastage = +(receiving.goldIssued - returnedWeight).toFixed(2);
        const totalLabour = Math.round(returnedWeight * receiving.labourPerGram);
        setOrders(orders.map((o) => o.id === receiving.id ? { ...o, returnedWeight, wastage, totalLabour, status: 'Received', returnDate: '2026-07-06' } : o));
        setReceiving(null); showToast('Order received & closed');
      }} />}
      {showAddKarigar && <AddKarigarModal onClose={() => setShowAddKarigar(false)} onSave={(k) => { setKarigars([...karigars, k]); setShowAddKarigar(false); showToast('Karigar added'); }} />}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 font-medium">{label}</div>
          <div className="text-lg font-bold text-gray-900 mt-1">{value}</div>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      </div>
    </div>
  );
}

const Th = ({ children }) => <th className="text-left px-4 py-3 font-semibold">{children}</th>;
const Td = ({ children, className = '' }) => <td className={`px-4 py-3 text-gray-700 ${className}`}>{children}</td>;

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) { return <div><label className="text-xs font-semibold text-gray-600 uppercase block mb-1">{label}</label>{children}</div>; }

function NewOrderModal({ karigars, onClose, onSave }) {
  const [karigarId, setKarigarId] = useState(karigars[0].id);
  const [designNo, setDesignNo] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Rings');
  const [goldIssued, setGoldIssued] = useState(0);
  const [expectedFinishedWeight, setExpected] = useState(0);
  const [purity, setPurity] = useState('22K');
  const [labourPerGram, setLabour] = useState(180);
  const [advancePaid, setAdvance] = useState(0);
  const [notes, setNotes] = useState('');

  const save = () => {
    const k = karigars.find((x) => x.id === Number(karigarId));
    onSave({
      id: 'KO-' + String(Math.floor(Math.random() * 900) + 100),
      karigarId: k.id, karigarName: k.name, designNo, description, category,
      goldIssued: Number(goldIssued), expectedFinishedWeight: Number(expectedFinishedWeight),
      returnedWeight: null, wastage: null,
      issueDate: '2026-07-06', expectedDate: '2026-07-13', returnDate: null,
      purity, labourPerGram: Number(labourPerGram), totalLabour: null,
      advancePaid: Number(advancePaid), status: 'Issued', notes,
    });
  };

  return (
    <Modal title="New Karigar Order" onClose={onClose}>
      <div className="space-y-3">
        <Field label="Karigar">
          <select value={karigarId} onChange={(e) => setKarigarId(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            {karigars.map((k) => <option key={k.id} value={k.id}>{k.name} · {k.specialty}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Design No"><input value={designNo} onChange={(e) => setDesignNo(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option>Rings</option><option>Chains</option><option>Bangles</option><option>Necklace</option><option>Earrings</option><option>Coins</option>
            </select>
          </Field>
        </div>
        <Field label="Description"><input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Gold Issued (g)"><input type="number" value={goldIssued} onChange={(e) => setGoldIssued(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Expected Finish (g)"><input type="number" value={expectedFinishedWeight} onChange={(e) => setExpected(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Purity">
            <select value={purity} onChange={(e) => setPurity(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option>22K</option><option>18K</option><option>24K</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Labour Rate/g"><input type="number" value={labourPerGram} onChange={(e) => setLabour(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Advance Paid"><input type="number" value={advancePaid} onChange={(e) => setAdvance(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        </div>
        <Field label="Notes"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="2" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={save} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">Issue Gold</button>
        </div>
      </div>
    </Modal>
  );
}

function ReceiveModal({ order, onClose, onSave }) {
  const [returnedWeight, setReturnedWeight] = useState(order.expectedFinishedWeight);
  const wastage = +(order.goldIssued - returnedWeight).toFixed(2);
  const wastagePct = ((wastage / order.goldIssued) * 100).toFixed(2);
  const totalLabour = Math.round(returnedWeight * order.labourPerGram);
  return (
    <Modal title={`Receive Order · ${order.id}`} onClose={onClose}>
      <div className="space-y-3">
        <div className="p-3 bg-amber-50 rounded-lg text-sm">
          <div className="flex justify-between"><span>Gold Issued:</span><span className="font-semibold">{order.goldIssued}g</span></div>
          <div className="flex justify-between"><span>Expected:</span><span className="font-semibold">{order.expectedFinishedWeight}g</span></div>
          <div className="flex justify-between"><span>Labour Rate:</span><span className="font-semibold">{formatINR(order.labourPerGram)}/g</span></div>
        </div>
        <Field label="Returned Weight (g)"><input type="number" step="0.01" value={returnedWeight} onChange={(e) => setReturnedWeight(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <div className="p-3 border border-gray-200 rounded-lg text-sm space-y-1">
          <div className="flex justify-between"><span>Wastage:</span><span className={wastagePct > 3 ? 'font-semibold text-red-600' : 'font-semibold text-emerald-600'}>{wastage}g ({wastagePct}%)</span></div>
          <div className="flex justify-between"><span>Total Labour:</span><span className="font-semibold text-amber-600">{formatINR(totalLabour)}</span></div>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={() => onSave(returnedWeight)} className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium">Confirm Receipt</button>
        </div>
      </div>
    </Modal>
  );
}

function AddKarigarModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const [ratePerGram, setRate] = useState(180);
  return (
    <Modal title="Add Karigar" onClose={onClose}>
      <div className="space-y-3">
        <Field label="Name"><input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <Field label="Mobile"><input value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <Field label="Specialty"><input value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <Field label="Address"><input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <Field label="Rate per gram"><input type="number" value={ratePerGram} onChange={(e) => setRate(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={() => onSave({ id: Date.now(), name, mobile, specialty, address, ratePerGram, balance: 0, status: 'Active', joinDate: '2026-07-06', totalWork: 0 })} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">Add Karigar</button>
        </div>
      </div>
    </Modal>
  );
}
