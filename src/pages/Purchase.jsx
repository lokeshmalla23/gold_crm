import { useMemo, useState } from 'react';
import { Search, Plus, ShoppingCart, Package, Truck, IndianRupee, CheckCircle2, X, Eye, Wallet, ArrowLeft } from 'lucide-react';
import { purchaseOrders as initialPOs, goodsReceiptNotes, purchaseReturns as initialReturns, suppliers, formatINR, formatDate } from '../data/mockData';

const STATUS_COLORS = {
  Draft: 'bg-gray-100 text-gray-700',
  Ordered: 'bg-blue-100 text-blue-700',
  Received: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-red-100 text-red-700',
};
const PAY_COLORS = {
  Pending: 'bg-red-100 text-red-700',
  Partial: 'bg-amber-100 text-amber-700',
  Paid: 'bg-emerald-100 text-emerald-700',
};
const QC_COLORS = {
  Passed: 'bg-emerald-100 text-emerald-700',
  Partial: 'bg-amber-100 text-amber-700',
  Failed: 'bg-red-100 text-red-700',
};

export default function Purchase() {
  const [tab, setTab] = useState('po');
  const [pos, setPOs] = useState(initialPOs);
  const [returns, setReturns] = useState(initialReturns);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [supplierFilter, setSupplierFilter] = useState('All');
  const [showNewPO, setShowNewPO] = useState(false);
  const [showNewReturn, setShowNewReturn] = useState(false);
  const [payingPO, setPayingPO] = useState(null);
  const [viewingPO, setViewingPO] = useState(null);
  const [viewingGRN, setViewingGRN] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filteredPOs = useMemo(() => pos.filter((p) =>
    (statusFilter === 'All' || p.status === statusFilter) &&
    (supplierFilter === 'All' || p.supplierName === supplierFilter) &&
    (p.id.toLowerCase().includes(search.toLowerCase()) || p.supplierName.toLowerCase().includes(search.toLowerCase()))
  ), [pos, search, statusFilter, supplierFilter]);

  const stats = useMemo(() => ({
    totalPOs: pos.length,
    pendingValue: pos.filter((p) => p.status !== 'Received').reduce((s, p) => s + p.total, 0),
    receivedThisMonth: pos.filter((p) => p.status === 'Received' && p.date.startsWith('2026-07')).length,
    pendingPayments: pos.reduce((s, p) => s + p.balance, 0),
  }), [pos]);

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {toast}
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-gray-900">Purchase Management</h2>
        <p className="text-sm text-gray-500">Manage purchase orders, goods receipts, and returns</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex">
        {[
          { key: 'po', label: 'Purchase Orders' },
          { key: 'grn', label: 'Goods Receipt (GRN)' },
          { key: 'return', label: 'Purchase Returns' },
        ].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t.key ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'po' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total POs" value={stats.totalPOs} icon={ShoppingCart} color="bg-blue-50 text-blue-700" />
            <StatCard label="Pending Value" value={formatINR(stats.pendingValue)} icon={Package} color="bg-amber-50 text-amber-700" />
            <StatCard label="Received (This Month)" value={stats.receivedThisMonth} icon={CheckCircle2} color="bg-emerald-50 text-emerald-700" />
            <StatCard label="Pending Payments" value={formatINR(stats.pendingPayments)} icon={IndianRupee} color="bg-red-50 text-red-700" />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search PO # or supplier..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option>All</option><option>Draft</option><option>Ordered</option><option>Received</option><option>Cancelled</option>
            </select>
            <select value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option value="All">All Suppliers</option>
              {[...new Set(pos.map((p) => p.supplierName))].map((s) => <option key={s}>{s}</option>)}
            </select>
            <button onClick={() => setShowNewPO(true)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />New PO
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600">
                  <Th>PO #</Th><Th>Date</Th><Th>Supplier</Th><Th>Items</Th><Th>Total</Th><Th>Paid</Th><Th>Balance</Th><Th>Status</Th><Th>Payment</Th><Th>Actions</Th>
                </tr></thead>
                <tbody>
                  {filteredPOs.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0">
                      <Td className="font-mono text-xs font-semibold">{p.id}</Td>
                      <Td>{formatDate(p.date)}</Td>
                      <Td>{p.supplierName}</Td>
                      <Td>{p.items.length}</Td>
                      <Td className="font-semibold">{formatINR(p.total)}</Td>
                      <Td className="text-emerald-600">{formatINR(p.paidAmount)}</Td>
                      <Td className="text-red-600">{formatINR(p.balance)}</Td>
                      <Td><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[p.status]}`}>{p.status}</span></Td>
                      <Td><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PAY_COLORS[p.paymentStatus]}`}>{p.paymentStatus}</span></Td>
                      <Td>
                        <div className="flex gap-1">
                          <button onClick={() => setViewingPO(p)} className="p-1.5 rounded hover:bg-gray-100" title="View"><Eye className="w-4 h-4 text-gray-600" /></button>
                          {p.balance > 0 && <button onClick={() => setPayingPO(p)} className="p-1.5 rounded hover:bg-emerald-50" title="Record Payment"><Wallet className="w-4 h-4 text-emerald-600" /></button>}
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'grn' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600">
                <Th>GRN #</Th><Th>PO Ref</Th><Th>Date</Th><Th>Received By</Th><Th>Items</Th><Th>Total Weight</Th><Th>Quality Check</Th><Th>Actions</Th>
              </tr></thead>
              <tbody>
                {goodsReceiptNotes.map((g) => (
                  <tr key={g.id} className="border-b border-gray-50 last:border-0">
                    <Td className="font-mono text-xs font-semibold">{g.id}</Td>
                    <Td className="font-mono text-xs">{g.poId}</Td>
                    <Td>{formatDate(g.date)}</Td>
                    <Td>{g.receivedBy}</Td>
                    <Td>{g.items.length}</Td>
                    <Td>{g.totalWeight}g</Td>
                    <Td><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${QC_COLORS[g.qualityCheck]}`}>{g.qualityCheck}</span></Td>
                    <Td><button onClick={() => setViewingGRN(g)} className="p-1.5 rounded hover:bg-gray-100"><Eye className="w-4 h-4 text-gray-600" /></button></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'return' && (
        <>
          <div className="flex justify-end">
            <button onClick={() => setShowNewReturn(true)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />New Return
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600">
                  <Th>Return #</Th><Th>PO Ref</Th><Th>Date</Th><Th>Supplier</Th><Th>Item</Th><Th>Qty</Th><Th>Weight</Th><Th>Reason</Th><Th>Credit</Th><Th>Status</Th>
                </tr></thead>
                <tbody>
                  {returns.map((r) => (
                    <tr key={r.id} className="border-b border-gray-50 last:border-0">
                      <Td className="font-mono text-xs font-semibold">{r.id}</Td>
                      <Td className="font-mono text-xs">{r.poId}</Td>
                      <Td>{formatDate(r.date)}</Td>
                      <Td>{r.supplierName}</Td>
                      <Td>{r.item}</Td>
                      <Td>{r.qty}</Td>
                      <Td>{r.weight}g</Td>
                      <Td className="text-xs text-gray-600 max-w-xs">{r.reason}</Td>
                      <Td className="font-semibold text-amber-600">{formatINR(r.creditAmount)}</Td>
                      <Td><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status === 'Credited' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showNewPO && <NewPOModal onClose={() => setShowNewPO(false)} onSave={(po) => { setPOs([po, ...pos]); setShowNewPO(false); showToast('Purchase Order created'); }} />}
      {showNewReturn && <NewReturnModal onClose={() => setShowNewReturn(false)} onSave={(r) => { setReturns([r, ...returns]); setShowNewReturn(false); showToast('Return recorded'); }} />}
      {payingPO && <PaymentModal po={payingPO} onClose={() => setPayingPO(null)} onSave={(amt) => {
        setPOs(pos.map((p) => p.id === payingPO.id ? { ...p, paidAmount: p.paidAmount + amt, balance: Math.max(0, p.balance - amt), paymentStatus: (p.balance - amt) <= 0 ? 'Paid' : 'Partial' } : p));
        setPayingPO(null); showToast('Payment recorded');
      }} />}
      {viewingPO && <ViewPOModal po={viewingPO} onClose={() => setViewingPO(null)} />}
      {viewingGRN && <ViewGRNModal grn={viewingGRN} onClose={() => setViewingGRN(null)} />}
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

function ModalShell({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-xl shadow-xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function NewPOModal({ onClose, onSave }) {
  const [supplierId, setSupplierId] = useState(suppliers[0].id);
  const [date, setDate] = useState('2026-07-06');
  const [expectedDate, setExpectedDate] = useState('2026-07-13');
  const [items, setItems] = useState([{ name: '', qty: 1, weight: 0, rate: 6250, amount: 0 }]);
  const [notes, setNotes] = useState('');

  const updateItem = (i, field, val) => {
    const next = [...items];
    next[i][field] = field === 'name' ? val : Number(val) || 0;
    next[i].amount = next[i].weight * next[i].rate;
    setItems(next);
  };
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const gst = Math.round(subtotal * 0.03);
  const total = subtotal + gst;

  const save = () => {
    const supplier = suppliers.find((s) => s.id === Number(supplierId));
    onSave({
      id: 'PO-' + String(Math.floor(Math.random() * 900) + 100),
      supplierId: supplier.id, supplierName: supplier.name, date, expectedDate,
      items, subtotal, gst, total,
      status: 'Draft', paymentStatus: 'Pending', paidAmount: 0, balance: total, notes,
    });
  };

  return (
    <ModalShell title="New Purchase Order" onClose={onClose} wide>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Supplier">
            <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Date"><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Expected Date"><input type="date" value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-600 uppercase">Items</label>
            <button onClick={() => setItems([...items, { name: '', qty: 1, weight: 0, rate: 6250, amount: 0 }])} className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-700 font-medium">+ Add Item</button>
          </div>
          <div className="space-y-2">
            {items.map((it, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <input value={it.name} onChange={(e) => updateItem(i, 'name', e.target.value)} placeholder="Item name" className="col-span-4 px-2 py-1.5 border border-gray-200 rounded text-sm" />
                <input type="number" value={it.qty} onChange={(e) => updateItem(i, 'qty', e.target.value)} placeholder="Qty" className="col-span-1 px-2 py-1.5 border border-gray-200 rounded text-sm" />
                <input type="number" value={it.weight} onChange={(e) => updateItem(i, 'weight', e.target.value)} placeholder="Wt (g)" className="col-span-2 px-2 py-1.5 border border-gray-200 rounded text-sm" />
                <input type="number" value={it.rate} onChange={(e) => updateItem(i, 'rate', e.target.value)} placeholder="Rate" className="col-span-2 px-2 py-1.5 border border-gray-200 rounded text-sm" />
                <div className="col-span-2 text-right text-sm font-semibold text-amber-600">{formatINR(it.amount)}</div>
                <button onClick={() => setItems(items.filter((_, x) => x !== i))} className="col-span-1 text-red-500"><X className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 space-y-1 text-sm">
          <Row label="Subtotal" value={formatINR(subtotal)} />
          <Row label="GST (3%)" value={formatINR(gst)} />
          <Row label="Total" value={formatINR(total)} bold />
        </div>

        <Field label="Notes"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" rows="2" /></Field>

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={save} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">Save PO</button>
        </div>
      </div>
    </ModalShell>
  );
}

function PaymentModal({ po, onClose, onSave }) {
  const [amount, setAmount] = useState(po.balance);
  const [mode, setMode] = useState('Bank Transfer');
  return (
    <ModalShell title={`Record Payment · ${po.id}`} onClose={onClose}>
      <div className="space-y-3">
        <div className="p-3 bg-amber-50 rounded-lg text-sm">
          <div className="flex justify-between"><span>Total:</span><span className="font-semibold">{formatINR(po.total)}</span></div>
          <div className="flex justify-between"><span>Paid:</span><span className="font-semibold text-emerald-600">{formatINR(po.paidAmount)}</span></div>
          <div className="flex justify-between"><span>Balance:</span><span className="font-semibold text-red-600">{formatINR(po.balance)}</span></div>
        </div>
        <Field label="Amount"><input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <Field label="Payment Mode">
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option>Bank Transfer</option><option>Cheque</option><option>Cash</option><option>UPI</option>
          </select>
        </Field>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={() => onSave(amount)} className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium">Record Payment</button>
        </div>
      </div>
    </ModalShell>
  );
}

function ViewPOModal({ po, onClose }) {
  return (
    <ModalShell title={`Purchase Order · ${po.id}`} onClose={onClose} wide>
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div><div className="text-xs text-gray-500">Supplier</div><div className="font-medium">{po.supplierName}</div></div>
        <div><div className="text-xs text-gray-500">Date</div><div>{formatDate(po.date)}</div></div>
        <div><div className="text-xs text-gray-500">Expected</div><div>{formatDate(po.expectedDate)}</div></div>
        <div><div className="text-xs text-gray-500">Status</div><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[po.status]}`}>{po.status}</span></div>
      </div>
      <table className="w-full text-sm border border-gray-100 rounded overflow-hidden">
        <thead className="bg-gray-50 text-xs uppercase text-gray-600"><tr><Th>Item</Th><Th>Qty</Th><Th>Weight</Th><Th>Rate</Th><Th>Amount</Th></tr></thead>
        <tbody>
          {po.items.map((it, i) => (
            <tr key={i} className="border-t border-gray-100"><Td>{it.name}</Td><Td>{it.qty}</Td><Td>{it.weight}g</Td><Td>{formatINR(it.rate)}</Td><Td className="font-semibold">{formatINR(it.amount)}</Td></tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 space-y-1 text-sm">
        <Row label="Subtotal" value={formatINR(po.subtotal)} />
        <Row label="GST" value={formatINR(po.gst)} />
        <Row label="Total" value={formatINR(po.total)} bold />
        <Row label="Paid" value={formatINR(po.paidAmount)} />
        <Row label="Balance" value={formatINR(po.balance)} bold />
      </div>
      {po.notes && <div className="mt-3 text-xs text-gray-600"><b>Notes:</b> {po.notes}</div>}
    </ModalShell>
  );
}

function ViewGRNModal({ grn, onClose }) {
  return (
    <ModalShell title={`Goods Receipt · ${grn.id}`} onClose={onClose} wide>
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div><div className="text-xs text-gray-500">PO Ref</div><div className="font-mono">{grn.poId}</div></div>
        <div><div className="text-xs text-gray-500">Date</div><div>{formatDate(grn.date)}</div></div>
        <div><div className="text-xs text-gray-500">Received By</div><div>{grn.receivedBy}</div></div>
        <div><div className="text-xs text-gray-500">Quality</div><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${QC_COLORS[grn.qualityCheck]}`}>{grn.qualityCheck}</span></div>
      </div>
      <table className="w-full text-sm border border-gray-100 rounded overflow-hidden">
        <thead className="bg-gray-50 text-xs uppercase text-gray-600"><tr><Th>Item</Th><Th>Ordered</Th><Th>Received</Th><Th>Weight</Th><Th>Condition</Th></tr></thead>
        <tbody>
          {grn.items.map((it, i) => (
            <tr key={i} className="border-t border-gray-100"><Td>{it.name}</Td><Td>{it.orderedQty}</Td><Td>{it.receivedQty}</Td><Td>{it.weight}g</Td><Td>{it.condition}</Td></tr>
          ))}
        </tbody>
      </table>
      {grn.remarks && <div className="mt-3 text-xs text-gray-600"><b>Remarks:</b> {grn.remarks}</div>}
    </ModalShell>
  );
}

function NewReturnModal({ onClose, onSave }) {
  const [poId, setPoId] = useState('');
  const [supplierName, setSupplierName] = useState(suppliers[0].name);
  const [item, setItem] = useState('');
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState(0);
  const [reason, setReason] = useState('');
  const [creditAmount, setCreditAmount] = useState(0);
  return (
    <ModalShell title="New Purchase Return" onClose={onClose}>
      <div className="space-y-3">
        <Field label="PO Reference"><input value={poId} onChange={(e) => setPoId(e.target.value)} placeholder="PO-001" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <Field label="Supplier">
          <select value={supplierName} onChange={(e) => setSupplierName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            {suppliers.map((s) => <option key={s.id}>{s.name}</option>)}
          </select>
        </Field>
        <Field label="Item"><input value={item} onChange={(e) => setItem(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Qty"><input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Weight (g)"><input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        </div>
        <Field label="Credit Amount"><input type="number" value={creditAmount} onChange={(e) => setCreditAmount(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <Field label="Reason"><textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={() => onSave({ id: 'PR-' + String(Math.floor(Math.random() * 900) + 100), poId, date: '2026-07-06', supplierName, item, qty, weight, reason, creditAmount, status: 'Pending' })} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">Save Return</button>
        </div>
      </div>
    </ModalShell>
  );
}

function Field({ label, children }) { return <div><label className="text-xs font-semibold text-gray-600 uppercase block mb-1">{label}</label>{children}</div>; }
function Row({ label, value, bold }) { return <div className="flex justify-between"><span className={bold ? 'font-semibold text-gray-900' : 'text-gray-600'}>{label}</span><span className={bold ? 'font-bold text-amber-600' : 'text-gray-900'}>{value}</span></div>; }
