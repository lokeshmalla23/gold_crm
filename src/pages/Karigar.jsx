import { useMemo, useState } from 'react';
import { Search, Plus, Factory, Weight, TrendingDown, X, CheckCircle2, Eye, Edit3 } from 'lucide-react';
import { karigars as initialKarigars, karigarOrders as initialOrders, formatINR, formatDate } from '../data/mockData';
import * as cls from '../styles/classes';
import NumberInput from '../components/ui/NumberInput';

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
        <h2 className={cls.pageTitle}>Manufacturing / Karigar</h2>
        <p className={cls.mutedText}>Manage artisan work orders — gold issued, manufacturing, and return</p>
      </div>

      <div className={`${cls.card} p-1 inline-flex`}>
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

          <div className={`${cls.cardMd} flex flex-wrap items-center gap-3`}>
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search order, design, description..." className={cls.inputIcon} />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={cls.inputSm}>
              <option>All</option><option>Issued</option><option>In Progress</option><option>Received</option>
            </select>
            <select value={karigarFilter} onChange={(e) => setKarigarFilter(e.target.value)} className={cls.inputSm}>
              <option value="All">All Karigars</option>
              {karigars.map((k) => <option key={k.id}>{k.name}</option>)}
            </select>
            <button onClick={() => setShowNew(true)} className={`${cls.btnPrimary} flex items-center gap-2`}>
              <Plus className="w-4 h-4" />New Order
            </button>
          </div>

          <div className={`${cls.card} overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className={`${cls.tableHeader} border-b border-gray-100`}>
                  <Th>Order #</Th><Th>Design</Th><Th>Description</Th><Th>Karigar</Th><Th>Category</Th><Th>Issued</Th><Th>Expected</Th><Th>Returned</Th><Th>Wastage</Th><Th>Labour</Th><Th>Issue Date</Th><Th>Status</Th><Th>Actions</Th>
                </tr></thead>
                <tbody>
                  {filtered.map((o) => {
                    const wastagePct = o.returnedWeight ? (o.wastage / o.goldIssued) * 100 : 0;
                    return (
                      <tr key={o.id} className={cls.tableRow}>
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
                        <Td><span className={`${cls.badge} ${STATUS_COLORS[o.status]}`}>{o.status}</span></Td>
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
            <button onClick={() => setShowAddKarigar(true)} className={`${cls.btnPrimary} flex items-center gap-2`}>
              <Plus className="w-4 h-4" />Add Karigar
            </button>
          </div>
          <div className={`${cls.card} overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className={`${cls.tableHeader} border-b border-gray-100`}>
                  <Th>Name</Th><Th>Mobile</Th><Th>Specialty</Th><Th>Rate/g</Th><Th>Balance</Th><Th>Total Orders</Th><Th>Status</Th><Th>Actions</Th>
                </tr></thead>
                <tbody>
                  {karigars.map((k) => (
                    <tr key={k.id} className={cls.tableRow}>
                      <Td className="font-medium">{k.name}</Td>
                      <Td>{k.mobile}</Td>
                      <Td>{k.specialty}</Td>
                      <Td>{formatINR(k.ratePerGram)}</Td>
                      <Td className={k.balance > 0 ? 'text-red-600 font-semibold' : 'text-gray-700'}>{formatINR(k.balance)}</Td>
                      <Td>{k.totalWork}</Td>
                      <Td><span className={`${cls.badge} ${k.status === 'Active' ? cls.badgeColor.green : cls.badgeColor.gray}`}>{k.status}</span></Td>
                      <Td><button className={cls.btnGhost}><Eye className="w-4 h-4 text-gray-600" /></button></Td>
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
    <div className={cls.cardMd}>
      <div className="flex items-center justify-between">
        <div>
          <div className={cls.mutedText + ' font-medium'}>{label}</div>
          <div className="text-lg font-bold text-gray-900 mt-1">{value}</div>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      </div>
    </div>
  );
}

const Th = ({ children }) => <th className="text-left px-4 py-3 font-semibold">{children}</th>;
const Td = ({ children, className = '' }) => <td className={`${cls.tableCell} text-gray-700 ${className}`}>{children}</td>;

function Modal({ title, onClose, children }) {
  return (
    <div className={cls.modalOverlay}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className={`${cls.modalHeader} sticky top-0 bg-white`}>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className={cls.btnGhost}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) { return <div><label className={cls.sectionLabel + ' block mb-1'}>{label}</label>{children}</div>; }

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
          <select value={karigarId} onChange={(e) => setKarigarId(e.target.value)} className={cls.input}>
            {karigars.map((k) => <option key={k.id} value={k.id}>{k.name} · {k.specialty}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Design No"><input value={designNo} onChange={(e) => setDesignNo(e.target.value)} className={cls.input} /></Field>
          <Field label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={cls.input}>
              <option>Rings</option><option>Chains</option><option>Bangles</option><option>Necklace</option><option>Earrings</option><option>Coins</option>
            </select>
          </Field>
        </div>
        <Field label="Description"><input value={description} onChange={(e) => setDescription(e.target.value)} className={cls.input} /></Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Gold Issued (g)"><NumberInput allowDecimal value={goldIssued} onChange={setGoldIssued} className={cls.input} /></Field>
          <Field label="Expected Finish (g)"><NumberInput allowDecimal value={expectedFinishedWeight} onChange={setExpected} className={cls.input} /></Field>
          <Field label="Purity">
            <select value={purity} onChange={(e) => setPurity(e.target.value)} className={cls.input}>
              <option>22K</option><option>18K</option><option>24K</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Labour Rate/g"><NumberInput value={labourPerGram} onChange={setLabour} className={cls.input} /></Field>
          <Field label="Advance Paid"><NumberInput value={advancePaid} onChange={setAdvance} className={cls.input} /></Field>
        </div>
        <Field label="Notes"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="2" className={cls.input} /></Field>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className={cls.btnSecondary}>Cancel</button>
          <button onClick={save} className={cls.btnPrimary}>Issue Gold</button>
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
        <div className={cls.panel.amber + ' text-sm'}>
          <div className="flex justify-between"><span>Gold Issued:</span><span className="font-semibold">{order.goldIssued}g</span></div>
          <div className="flex justify-between"><span>Expected:</span><span className="font-semibold">{order.expectedFinishedWeight}g</span></div>
          <div className="flex justify-between"><span>Labour Rate:</span><span className="font-semibold">{formatINR(order.labourPerGram)}/g</span></div>
        </div>
        <Field label="Returned Weight (g)"><NumberInput allowDecimal value={returnedWeight} onChange={(v) => setReturnedWeight(Number(v))} className={cls.input} /></Field>
        <div className={cls.panel.gray + ' text-sm space-y-1'}>
          <div className="flex justify-between"><span>Wastage:</span><span className={wastagePct > 3 ? 'font-semibold text-red-600' : 'font-semibold text-emerald-600'}>{wastage}g ({wastagePct}%)</span></div>
          <div className="flex justify-between"><span>Total Labour:</span><span className="font-semibold text-amber-600">{formatINR(totalLabour)}</span></div>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className={cls.btnSecondary}>Cancel</button>
          <button onClick={() => onSave(returnedWeight)} className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-sm transition-all">Confirm Receipt</button>
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
        <Field label="Name"><input value={name} onChange={(e) => setName(e.target.value)} className={cls.input} /></Field>
        <Field label="Mobile"><input value={mobile} onChange={(e) => setMobile(e.target.value)} className={cls.input} /></Field>
        <Field label="Specialty"><input value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={cls.input} /></Field>
        <Field label="Address"><input value={address} onChange={(e) => setAddress(e.target.value)} className={cls.input} /></Field>
        <Field label="Rate per gram"><NumberInput value={ratePerGram} onChange={(v) => setRate(Number(v))} className={cls.input} /></Field>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className={cls.btnSecondary}>Cancel</button>
          <button onClick={() => onSave({ id: Date.now(), name, mobile, specialty, address, ratePerGram, balance: 0, status: 'Active', joinDate: '2026-07-06', totalWork: 0 })} className={cls.btnPrimary}>Add Karigar</button>
        </div>
      </div>
    </Modal>
  );
}
