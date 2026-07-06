import { useMemo, useState } from 'react';
import { Search, Plus, ClipboardCheck, IndianRupee, AlertTriangle, CheckCircle2, X, Eye, MessageCircle, Printer, CalendarClock } from 'lucide-react';
import { approvals as initialApprovals, customers, inventory, formatINR, formatDate } from '../data/mockData';
import * as cls from '../styles/classes';

const STATUS_COLORS = {
  Active: 'bg-blue-100 text-blue-700',
  Overdue: 'bg-red-100 text-red-700',
  Returned: 'bg-gray-100 text-gray-700',
  Converted: 'bg-emerald-100 text-emerald-700',
  'Partially Returned': 'bg-amber-100 text-amber-700',
};

export default function Approval() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  const filtered = useMemo(() => approvals.filter((a) =>
    (statusFilter === 'All' || a.status === statusFilter) &&
    (a.id.toLowerCase().includes(search.toLowerCase()) || a.customerName.toLowerCase().includes(search.toLowerCase()))
  ), [approvals, search, statusFilter]);

  const stats = useMemo(() => ({
    active: approvals.filter((a) => a.status === 'Active' || a.status === 'Partially Returned').length,
    totalValue: approvals.filter((a) => a.status === 'Active' || a.status === 'Overdue').reduce((s, a) => s + a.totalValue, 0),
    overdue: approvals.filter((a) => a.status === 'Overdue').length,
    converted: approvals.filter((a) => a.status === 'Converted').length,
  }), [approvals]);

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {toast}
        </div>
      )}

      <div>
        <h2 className={cls.pageTitle}>Approval / Home Trial</h2>
        <p className={cls.mutedText}>Track jewellery given to customers for home approval</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Active Approvals" value={stats.active} icon={ClipboardCheck} color="bg-blue-50 text-blue-700" />
        <StatCard label="Total Value Out" value={formatINR(stats.totalValue)} icon={IndianRupee} color="bg-amber-50 text-amber-700" />
        <StatCard label="Overdue" value={stats.overdue} icon={AlertTriangle} color="bg-red-50 text-red-700" />
        <StatCard label="Converted to Sales" value={stats.converted} icon={CheckCircle2} color="bg-emerald-50 text-emerald-700" />
      </div>

      <div className={`${cls.cardSm} flex flex-wrap items-center gap-3`}>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search slip # or customer..." className={cls.inputIcon} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={cls.inputSm}>
          <option>All</option><option>Active</option><option>Overdue</option><option>Returned</option><option>Converted</option><option>Partially Returned</option>
        </select>
        <button onClick={() => setShowNew(true)} className={`${cls.btnPrimary} flex items-center gap-2`}>
          <Plus className="w-4 h-4" />New Approval
        </button>
      </div>

      <div className={`${cls.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className={`${cls.tableHeader} border-b border-gray-100`}>
              <Th>Slip #</Th><Th>Customer</Th><Th>Items</Th><Th>Total Value</Th><Th>Deposit</Th><Th>Issue Date</Th><Th>Due Date</Th><Th>Status</Th><Th>Actions</Th>
            </tr></thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className={`${cls.tableRow} ${a.status === 'Overdue' ? 'bg-red-50/40' : ''}`}>
                  <Td className="font-mono text-xs font-semibold">{a.id}</Td>
                  <Td><div className="font-medium">{a.customerName}</div><div className={cls.mutedText}>{a.mobile}</div></Td>
                  <Td>{a.items.length} item(s)</Td>
                  <Td className="font-semibold">{formatINR(a.totalValue)}</Td>
                  <Td>{formatINR(a.deposit)}</Td>
                  <Td>{formatDate(a.issueDate)}</Td>
                  <Td>{formatDate(a.dueDate)}</Td>
                  <Td>
                    <span className={`${cls.badge} ${STATUS_COLORS[a.status]}`}>
                      {a.status === 'Overdue' && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse" />}
                      {a.status}
                    </span>
                  </Td>
                  <Td><button onClick={() => setViewing(a)} className={cls.btnGhost}><Eye className="w-4 h-4 text-gray-600" /></button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNew && <NewApprovalModal onClose={() => setShowNew(false)} onSave={(a) => { setApprovals([a, ...approvals]); setShowNew(false); showToast('Approval slip created'); }} />}
      {viewing && <ApprovalDetailModal approval={viewing} onClose={() => setViewing(null)} onAction={(action) => {
        if (action === 'return') setApprovals(approvals.map((x) => x.id === viewing.id ? { ...x, status: 'Returned', returnDate: '2026-07-06' } : x));
        if (action === 'convert') setApprovals(approvals.map((x) => x.id === viewing.id ? { ...x, status: 'Converted', returnDate: '2026-07-06' } : x));
        if (action === 'extend') setApprovals(approvals.map((x) => x.id === viewing.id ? { ...x, dueDate: '2026-07-13' } : x));
        setViewing(null); showToast('Action completed');
      }} />}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className={cls.cardSm}>
      <div className="flex items-center justify-between">
        <div>
          <div className={cls.mutedText}>{label}</div>
          <div className="text-lg font-bold text-gray-900 mt-1">{value}</div>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      </div>
    </div>
  );
}

const Th = ({ children }) => <th className="text-left px-4 py-3 font-semibold">{children}</th>;
const Td = ({ children, className = '' }) => <td className={`${cls.tableCell} text-gray-700 ${className}`}>{children}</td>;

function Modal({ title, onClose, children, wide }) {
  return (
    <div className={cls.modalOverlay}>
      <div className={`bg-white rounded-xl shadow-xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
        <div className={`${cls.modalHeader} sticky top-0 bg-white`}>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className={cls.btnGhost}><X className="w-5 h-5" /></button>
        </div>
        <div className={cls.modalBody}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) { return <div><label className={`${cls.sectionLabel} block mb-1`}>{label}</label>{children}</div>; }

function NewApprovalModal({ onClose, onSave }) {
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deposit, setDeposit] = useState(0);
  const [dueDate, setDueDate] = useState('2026-07-09');
  const [staffName, setStaffName] = useState('Priya Sharma');
  const [notes, setNotes] = useState('');
  const [itemSearch, setItemSearch] = useState('');

  const filteredItems = inventory.filter((i) => i.name.toLowerCase().includes(itemSearch.toLowerCase()) || i.itemCode.toLowerCase().includes(itemSearch.toLowerCase())).slice(0, 6);
  const selectedItems = inventory.filter((i) => selectedIds.includes(i.id));
  const totalValue = selectedItems.reduce((s, i) => s + i.sellingPrice, 0);

  const save = () => {
    const c = customers.find((x) => x.id === Number(customerId));
    onSave({
      id: 'APR-' + String(Math.floor(Math.random() * 900) + 100),
      customerId: c.id, customerName: c.name, mobile: c.mobile,
      itemIds: selectedIds,
      items: selectedItems.map((i) => ({ name: i.name, itemCode: i.itemCode, weight: i.weight, value: i.sellingPrice })),
      totalValue, deposit: Number(deposit),
      issueDate: '2026-07-06', dueDate, returnDate: null,
      staffName, status: 'Active', notes,
      approvalSlip: 'APR-SLIP-' + Date.now(),
    });
  };

  return (
    <Modal title="New Approval Slip" onClose={onClose} wide>
      <div className="space-y-3">
        <Field label="Customer">
          <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className={cls.input}>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.mobile}</option>)}
          </select>
        </Field>

        <Field label="Add Items">
          <input value={itemSearch} onChange={(e) => setItemSearch(e.target.value)} placeholder="Search items..." className={cls.input} />
          {itemSearch && (
            <div className="mt-2 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {filteredItems.map((i) => (
                <button key={i.id} onClick={() => { setSelectedIds(selectedIds.includes(i.id) ? selectedIds.filter((x) => x !== i.id) : [...selectedIds, i.id]); }} className={`text-left p-2 border rounded-lg ${selectedIds.includes(i.id) ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                  <div className={cls.mutedText}>{i.itemCode}</div>
                  <div className="text-sm font-medium">{i.name}</div>
                  <div className="text-xs text-amber-600 font-semibold">{formatINR(i.sellingPrice)}</div>
                </button>
              ))}
            </div>
          )}
        </Field>

        {selectedItems.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-600 mb-2">Selected Items ({selectedItems.length})</div>
            {selectedItems.map((i) => (
              <div key={i.id} className="flex justify-between items-center py-1 text-sm">
                <span>{i.name} <span className={cls.mutedText}>({i.itemCode})</span></span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{formatINR(i.sellingPrice)}</span>
                  <button onClick={() => setSelectedIds(selectedIds.filter((x) => x !== i.id))} className="text-red-500"><X className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-semibold text-amber-600">
              <span>Total Value</span><span>{formatINR(totalValue)}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Field label="Deposit"><input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} className={cls.input} /></Field>
          <Field label="Due Date"><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={cls.input} /></Field>
        </div>
        <Field label="Staff"><input value={staffName} onChange={(e) => setStaffName(e.target.value)} className={cls.input} /></Field>
        <Field label="Notes"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="2" className={cls.input} /></Field>

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className={cls.btnSecondary}>Cancel</button>
          <button onClick={save} disabled={selectedIds.length === 0} className={cls.btnPrimary}>Create Approval</button>
        </div>
      </div>
    </Modal>
  );
}

function ApprovalDetailModal({ approval, onClose, onAction }) {
  return (
    <Modal title={`Approval Slip · ${approval.id}`} onClose={onClose} wide>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><div className={cls.mutedText}>Customer</div><div className="font-medium">{approval.customerName}</div><div className={cls.mutedText}>{approval.mobile}</div></div>
          <div><div className={cls.mutedText}>Status</div><span className={`${cls.badge} ${STATUS_COLORS[approval.status]}`}>{approval.status}</span></div>
          <div><div className={cls.mutedText}>Issue Date</div><div>{formatDate(approval.issueDate)}</div></div>
          <div><div className={cls.mutedText}>Due Date</div><div>{formatDate(approval.dueDate)}</div></div>
          <div><div className={cls.mutedText}>Deposit</div><div className="font-semibold">{formatINR(approval.deposit)}</div></div>
          <div><div className={cls.mutedText}>Staff</div><div>{approval.staffName}</div></div>
        </div>

        <table className="w-full text-sm border border-gray-100 rounded overflow-hidden">
          <thead className={`${cls.tableHeader} text-xs uppercase text-gray-600`}><tr><Th>Item</Th><Th>Code</Th><Th>Weight</Th><Th>Value</Th></tr></thead>
          <tbody>
            {approval.items.map((it, i) => (
              <tr key={i} className={cls.tableRow}><Td>{it.name}</Td><Td className="font-mono text-xs">{it.itemCode}</Td><Td>{it.weight}g</Td><Td className="font-semibold">{formatINR(it.value)}</Td></tr>
            ))}
            <tr className="bg-amber-50 border-t border-gray-100"><Td colSpan="3" className="font-semibold text-right">Total</Td><Td className="font-bold text-amber-600">{formatINR(approval.totalValue)}</Td></tr>
          </tbody>
        </table>

        {approval.notes && <div className={cls.mutedText}><b>Notes:</b> {approval.notes}</div>}

        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          <button onClick={() => onAction('return')} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">Mark All Returned</button>
          <button onClick={() => onAction('convert')} className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium">Convert to Invoice</button>
          <button onClick={() => onAction('extend')} className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium flex items-center gap-1"><CalendarClock className="w-4 h-4" />Extend Due Date</button>
          <button className={`${cls.btnSecondary} flex items-center gap-1`}><Printer className="w-4 h-4" />Print Slip</button>
          <button className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium flex items-center gap-1"><MessageCircle className="w-4 h-4" />WhatsApp</button>
        </div>
      </div>
    </Modal>
  );
}
