import { useMemo, useState } from 'react';
import { Search, Plus, Bookmark, IndianRupee, CalendarClock, AlertTriangle, X, Eye, Printer, CheckCircle2 } from 'lucide-react';
import { reservations as initialReservations, customers, inventory, formatINR, formatDate } from '../data/mockData';
import * as cls from '../styles/classes';

const STATUS_BADGE = {
  Active: cls.badgeColor.blue,
  Converted: cls.badgeColor.green,
  Expired: cls.badgeColor.gray,
  Cancelled: cls.badgeColor.red,
};

export default function Reservation() {
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  const filtered = useMemo(() => reservations.filter((r) =>
    (statusFilter === 'All' || r.status === statusFilter) &&
    (r.id.toLowerCase().includes(search.toLowerCase()) || r.customerName.toLowerCase().includes(search.toLowerCase()))
  ), [reservations, search, statusFilter]);

  const stats = useMemo(() => ({
    active: reservations.filter((r) => r.status === 'Active').length,
    totalAdvance: reservations.reduce((s, r) => s + r.advancePaid, 0),
    dueForConversion: reservations.filter((r) => r.status === 'Active' && new Date(r.expiryDate) <= new Date('2026-07-20')).length,
    expired: reservations.filter((r) => r.status === 'Expired').length,
  }), [reservations]);

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {toast}
        </div>
      )}

      <div>
        <h2 className={cls.pageTitle}>Reservations / Advance Bookings</h2>
        <p className={cls.mutedText}>Items reserved with advance payments</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Active Reservations" value={stats.active} icon={Bookmark} color="bg-blue-50 text-blue-700" />
        <StatCard label="Advance Collected" value={formatINR(stats.totalAdvance)} icon={IndianRupee} color="bg-emerald-50 text-emerald-700" />
        <StatCard label="Due for Conversion" value={stats.dueForConversion} icon={CalendarClock} color="bg-amber-50 text-amber-700" />
        <StatCard label="Expired" value={stats.expired} icon={AlertTriangle} color="bg-red-50 text-red-700" />
      </div>

      <div className={`${cls.cardMd} flex flex-wrap items-center gap-3`}>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reservation or customer..." className={cls.inputIcon} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={cls.inputSm}>
          <option>All</option><option>Active</option><option>Converted</option><option>Expired</option><option>Cancelled</option>
        </select>
        <button onClick={() => setShowNew(true)} className={`${cls.btnPrimary} text-sm flex items-center gap-2`}>
          <Plus className="w-4 h-4" />New Reservation
        </button>
      </div>

      <div className={`${cls.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className={`${cls.tableHeader} border-b border-gray-100`}>
              <Th>Res #</Th><Th>Customer</Th><Th>Item</Th><Th>Value</Th><Th>Advance</Th><Th>Balance</Th><Th>Reserved</Th><Th>Expiry</Th><Th>Status</Th><Th>Actions</Th>
            </tr></thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className={cls.tableRow}>
                  <Td className="font-mono text-xs font-semibold">{r.id}</Td>
                  <Td><div className="font-medium">{r.customerName}</div><div className="text-xs text-gray-500">{r.mobile}</div></Td>
                  <Td><div>{r.itemName}</div><div className="text-xs text-gray-500 font-mono">{r.itemCode}</div></Td>
                  <Td className="font-semibold">{formatINR(r.itemValue)}</Td>
                  <Td className="text-emerald-600">{formatINR(r.advancePaid)}</Td>
                  <Td className="text-red-600">{formatINR(r.balance)}</Td>
                  <Td>{formatDate(r.reservedDate)}</Td>
                  <Td>{formatDate(r.expiryDate)}</Td>
                  <Td><span className={`${cls.badge} ${STATUS_BADGE[r.status]}`}>{r.status}</span></Td>
                  <Td><button onClick={() => setViewing(r)} className={cls.btnGhost}><Eye className="w-4 h-4 text-gray-600" /></button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNew && <NewReservationModal onClose={() => setShowNew(false)} onSave={(r) => { setReservations([r, ...reservations]); setShowNew(false); showToast('Reservation created'); }} />}
      {viewing && <DetailModal reservation={viewing} onClose={() => setViewing(null)} onAction={(a) => {
        if (a === 'convert') setReservations(reservations.map((x) => x.id === viewing.id ? { ...x, status: 'Converted', convertedDate: '2026-07-06' } : x));
        if (a === 'cancel') setReservations(reservations.map((x) => x.id === viewing.id ? { ...x, status: 'Cancelled' } : x));
        if (a === 'extend') setReservations(reservations.map((x) => x.id === viewing.id ? { ...x, expiryDate: '2026-09-06' } : x));
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
          <div className="text-xs text-gray-500 font-medium">{label}</div>
          <div className="text-lg font-bold text-gray-900 mt-1">{value}</div>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
      </div>
    </div>
  );
}

const Th = ({ children }) => <th className={`${cls.tableCell} font-semibold`}>{children}</th>;
const Td = ({ children, className = '' }) => <td className={`${cls.tableCell} text-gray-700 ${className}`}>{children}</td>;

function Modal({ title, onClose, children }) {
  return (
    <div className={cls.modalOverlay}>
      <div className={`${cls.modalBox} max-w-lg`}>
        <div className={`${cls.modalHeader} sticky top-0 bg-white`}>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className={cls.btnGhost}><X className="w-5 h-5" /></button>
        </div>
        <div className={cls.modalBody}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) { return <div><label className={cls.sectionLabel}>{label}</label>{children}</div>; }

function NewReservationModal({ onClose, onSave }) {
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [itemId, setItemId] = useState(inventory[0].id);
  const [advancePaid, setAdvance] = useState(0);
  const [expiryDate, setExpiry] = useState('2026-08-06');
  const [notes, setNotes] = useState('');

  const selectedItem = inventory.find((i) => i.id === Number(itemId));
  const balance = (selectedItem?.sellingPrice || 0) - Number(advancePaid);

  const save = () => {
    const c = customers.find((x) => x.id === Number(customerId));
    onSave({
      id: 'RES-' + String(Math.floor(Math.random() * 900) + 100),
      customerId: c.id, customerName: c.name, mobile: c.mobile,
      itemId: selectedItem.id, itemName: selectedItem.name, itemCode: selectedItem.itemCode,
      itemValue: selectedItem.sellingPrice, advancePaid: Number(advancePaid), balance,
      reservedDate: '2026-07-06', expiryDate, convertedDate: null,
      staffName: 'Priya Sharma', status: 'Active', notes,
    });
  };

  return (
    <Modal title="New Reservation" onClose={onClose}>
      <div className="space-y-3">
        <Field label="Customer">
          <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className={cls.input}>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.mobile}</option>)}
          </select>
        </Field>
        <Field label="Item">
          <select value={itemId} onChange={(e) => setItemId(e.target.value)} className={cls.input}>
            {inventory.map((i) => <option key={i.id} value={i.id}>{i.name} ({i.itemCode}) · {formatINR(i.sellingPrice)}</option>)}
          </select>
        </Field>
        <div className={cls.panel.amber}>
          <div className="flex justify-between"><span>Item Value:</span><span className="font-semibold">{formatINR(selectedItem?.sellingPrice || 0)}</span></div>
          <div className="flex justify-between"><span>Advance:</span><span className="font-semibold text-emerald-600">{formatINR(Number(advancePaid))}</span></div>
          <div className="flex justify-between"><span>Balance:</span><span className="font-semibold text-red-600">{formatINR(balance)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Advance Amount"><input type="number" value={advancePaid} onChange={(e) => setAdvance(e.target.value)} className={cls.input} /></Field>
          <Field label="Expiry Date"><input type="date" value={expiryDate} onChange={(e) => setExpiry(e.target.value)} className={cls.input} /></Field>
        </div>
        <Field label="Notes"><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="2" className={cls.input} /></Field>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className={cls.btnSecondary}>Cancel</button>
          <button onClick={save} className={cls.btnPrimary}>Create Reservation</button>
        </div>
      </div>
    </Modal>
  );
}

function DetailModal({ reservation, onClose, onAction }) {
  return (
    <Modal title={`Reservation · ${reservation.id}`} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><div className="text-xs text-gray-500">Customer</div><div className="font-medium">{reservation.customerName}</div><div className="text-xs text-gray-500">{reservation.mobile}</div></div>
          <div><div className={cls.mutedText}>Status</div><span className={`${cls.badge} ${STATUS_BADGE[reservation.status]}`}>{reservation.status}</span></div>
          <div className="col-span-2"><div className="text-xs text-gray-500">Item</div><div className="font-medium">{reservation.itemName} <span className="text-xs text-gray-500">({reservation.itemCode})</span></div></div>
          <div><div className="text-xs text-gray-500">Reserved</div><div>{formatDate(reservation.reservedDate)}</div></div>
          <div><div className="text-xs text-gray-500">Expiry</div><div>{formatDate(reservation.expiryDate)}</div></div>
        </div>

        <div className="p-3 bg-amber-50 rounded-lg text-sm space-y-1">
          <div className="flex justify-between"><span>Item Value:</span><span className="font-semibold">{formatINR(reservation.itemValue)}</span></div>
          <div className="flex justify-between"><span>Advance Paid:</span><span className="font-semibold text-emerald-600">{formatINR(reservation.advancePaid)}</span></div>
          <div className="flex justify-between border-t border-amber-200 pt-1"><span>Balance Due:</span><span className="font-bold text-red-600">{formatINR(reservation.balance)}</span></div>
        </div>

        {reservation.notes && <div className="text-xs text-gray-600"><b>Notes:</b> {reservation.notes}</div>}

        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          <button onClick={() => onAction('convert')} className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium">Convert to Invoice</button>
          <button onClick={() => onAction('extend')} className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium flex items-center gap-1"><CalendarClock className="w-4 h-4" />Extend Expiry</button>
          <button onClick={() => onAction('cancel')} className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium">Cancel</button>
          <button className={`${cls.btnSecondary} flex items-center gap-1`}><Printer className="w-4 h-4" />Print Receipt</button>
        </div>
      </div>
    </Modal>
  );
}
