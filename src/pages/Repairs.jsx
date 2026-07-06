import { useMemo, useState } from 'react';
import { Wrench, Search, Plus, Eye, Trash2, Edit, MessageCircle, Printer, ClipboardCheck, Clock, PackageCheck, CheckCircle2 } from 'lucide-react';
import { repairs as initialRepairs, customers, formatINR, formatDate } from '../data/mockData';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import * as cls from '../styles/classes';
import NumberInput from '../components/ui/NumberInput';

const TECHNICIANS = [
  { id: 3, name: 'Ravi Kumar' },
  { id: 4, name: 'Sunil Das' },
  { id: 5, name: 'Mohan Lal' }
];

const STATUS_ORDER = ['Received', 'In Progress', 'Ready for Pickup', 'Delivered'];

function StatusBadge({ status, onClick }) {
  const map = {
    'Received': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-amber-100 text-amber-800',
    'Ready for Pickup': 'bg-emerald-100 text-emerald-700',
    'Delivered': 'bg-gray-100 text-gray-600'
  };
  return (
    <button onClick={onClick} className={`${cls.badge} gap-1.5 py-1 ${map[status] || map.Received}`}>
      {status === 'Ready for Pickup' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
      {status}
    </button>
  );
}

export default function Repairs() {
  const [list, setList] = useState(initialRepairs);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [techFilter, setTechFilter] = useState('All');
  const [showNew, setShowNew] = useState(false);
  const [viewJob, setViewJob] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [errors, setErrors] = useState({});

  const emptyForm = {
    customerId: '', itemDesc: '', category: 'Rings', weight: '', issue: '',
    receivedDate: new Date().toISOString().split('T')[0], estimatedDate: '',
    technicianId: 3, estimatedCost: '', advancePaid: 0, priority: 'Normal', notes: ''
  };
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    return list.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.customerName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchTech = techFilter === 'All' || r.technicianName === techFilter;
      return matchSearch && matchStatus && matchTech;
    });
  }, [list, search, statusFilter, techFilter]);

  const stats = {
    active: list.filter((r) => r.status !== 'Delivered').length,
    ready: list.filter((r) => r.status === 'Ready for Pickup').length,
    inProgress: list.filter((r) => r.status === 'In Progress').length,
    completed: list.filter((r) => r.status === 'Delivered').length
  };

  const advanceStatus = (id) => {
    setList((l) => l.map((r) => {
      if (r.id !== id) return r;
      const idx = STATUS_ORDER.indexOf(r.status);
      if (idx < STATUS_ORDER.length - 1) {
        const next = STATUS_ORDER[idx + 1];
        return { ...r, status: next, completedDate: next === 'Delivered' ? new Date().toISOString().split('T')[0] : r.completedDate };
      }
      return r;
    }));
  };

  const newBarcode = 'JC' + String(list.length + 1).padStart(3, '0') + 'REP';
  const newId = 'JC-' + String(list.length + 1).padStart(3, '0');

  const handleSubmit = () => {
    const errs = {};
    if (!form.customerId) errs.customerId = true;
    if (!form.itemDesc) errs.itemDesc = true;
    if (!form.issue) errs.issue = true;
    if (!form.estimatedDate) errs.estimatedDate = true;
    if (!form.estimatedCost) errs.estimatedCost = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const customer = customers.find((c) => c.id === Number(form.customerId));
    const tech = TECHNICIANS.find((t) => t.id === Number(form.technicianId));
    const newJob = {
      id: newId,
      customerId: customer.id,
      customerName: customer.name,
      mobile: customer.mobile,
      itemDesc: form.itemDesc,
      category: form.category,
      weight: form.weight,
      issue: form.issue,
      receivedDate: form.receivedDate,
      estimatedDate: form.estimatedDate,
      completedDate: null,
      technicianId: tech.id,
      technicianName: tech.name,
      estimatedCost: Number(form.estimatedCost),
      advancePaid: Number(form.advancePaid) || 0,
      finalCost: null,
      status: 'Received',
      priority: form.priority,
      notes: form.notes,
      images: [],
      barcode: newBarcode
    };
    setList((l) => [newJob, ...l]);
    setForm(emptyForm);
    setErrors({});
    setShowNew(false);
  };

  const handleDelete = () => {
    setList((l) => l.filter((r) => r.id !== confirmDelete));
    setConfirmDelete(null);
  };

  const fieldClass = (name) => `w-full px-3 py-2 rounded-lg border text-sm focus:ring-2 outline-none ${errors[name] ? 'border-red-400 ring-red-100' : 'border-gray-200 focus:border-amber-400 focus:ring-amber-100'}`;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Jobs" value={stats.active} icon={Wrench} iconBg="bg-amber-100" iconColor="text-amber-600" />
        <StatCard label="Ready for Pickup" value={stats.ready} icon={PackageCheck} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard label="In Progress" value={stats.inProgress} icon={Clock} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} iconBg="bg-gray-100" iconColor="text-gray-600" />
      </div>

      <div className={cls.card}>
        <div className={`${cls.cardHeader} flex-col md:flex-row gap-3`}>
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by customer or job ID..." className={cls.inputIcon} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={cls.inputSm}>
              <option>All</option>
              <option>Received</option>
              <option>In Progress</option>
              <option>Ready for Pickup</option>
              <option>Delivered</option>
            </select>
            <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)} className={cls.inputSm}>
              <option>All</option>
              {TECHNICIANS.map((t) => <option key={t.id}>{t.name}</option>)}
            </select>
            <button onClick={() => setShowNew(true)} className={`${cls.btnPrimary} flex items-center gap-2`}>
              <Plus className="w-4 h-4" />New Job Card
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`${cls.tableHeader} border-b border-gray-100`}>
                <th className="text-left px-4 py-3">Job ID</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Item</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Received</th>
                <th className="text-left px-4 py-3">Est. Delivery</th>
                <th className="text-left px-4 py-3">Technician</th>
                <th className="text-right px-4 py-3">Est. Cost</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={10} className="text-center py-8 text-gray-400">No repair jobs found</td></tr>
              ) : filtered.map((r) => (
                <tr key={r.id} className={cls.tableRow}>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.customerName}</div>
                    <div className={cls.mutedText}>{r.mobile}</div>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{r.itemDesc}</td>
                  <td className={cls.tableCell + ' text-gray-600'}>{r.category}</td>
                  <td className={cls.tableCell + ' text-gray-600'}>{formatDate(r.receivedDate)}</td>
                  <td className={cls.tableCell + ' text-gray-600'}>{formatDate(r.estimatedDate)}</td>
                  <td className={cls.tableCell + ' text-gray-600'}>{r.technicianName}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatINR(r.estimatedCost)}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} onClick={() => advanceStatus(r.id)} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setViewJob(r)} className="p-1.5 rounded hover:bg-amber-50 text-amber-600" title="View"><Eye className="w-4 h-4" /></button>
                      {r.status !== 'Ready for Pickup' && r.status !== 'Delivered' && (
                        <button onClick={() => setList((l) => l.map((x) => x.id === r.id ? { ...x, status: 'Ready for Pickup' } : x))} className="p-1.5 rounded hover:bg-emerald-50 text-emerald-600" title="Mark Ready"><PackageCheck className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => setConfirmDelete(r.id)} className={cls.btnDangerGhost} title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showNew} onClose={() => { setShowNew(false); setErrors({}); }} title="New Job Card" size="lg"
        footer={<>
          <button onClick={() => { setShowNew(false); setErrors({}); }} className={cls.btnSecondary}>Cancel</button>
          <button onClick={handleSubmit} className={cls.btnPrimary}>Create Job Card</button>
        </>}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={cls.fieldLabel}>Customer *</label>
            <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} className={fieldClass('customerId')}>
              <option value="">Select customer...</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name} - {c.mobile}</option>)}
            </select>
          </div>
          <div>
            <label className={cls.fieldLabel}>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={fieldClass('category')}>
              {['Rings', 'Chains', 'Bangles', 'Necklace', 'Earrings', 'Other'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className={cls.fieldLabel}>Item Description *</label>
            <input value={form.itemDesc} onChange={(e) => setForm({ ...form, itemDesc: e.target.value })} className={fieldClass('itemDesc')} />
          </div>
          <div>
            <label className={cls.fieldLabel}>Weight</label>
            <input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="e.g. 8.5g" className={fieldClass('weight')} />
          </div>
          <div>
            <label className={cls.fieldLabel}>Priority</label>
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={fieldClass('priority')}>
              <option>Normal</option>
              <option>Urgent</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className={cls.fieldLabel}>Issue Description *</label>
            <textarea value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} rows={3} className={fieldClass('issue')} />
          </div>
          <div>
            <label className={cls.fieldLabel}>Received Date</label>
            <input type="date" value={form.receivedDate} onChange={(e) => setForm({ ...form, receivedDate: e.target.value })} className={fieldClass('receivedDate')} />
          </div>
          <div>
            <label className={cls.fieldLabel}>Est. Delivery Date *</label>
            <input type="date" value={form.estimatedDate} onChange={(e) => setForm({ ...form, estimatedDate: e.target.value })} className={fieldClass('estimatedDate')} />
          </div>
          <div>
            <label className={cls.fieldLabel}>Assign Technician</label>
            <select value={form.technicianId} onChange={(e) => setForm({ ...form, technicianId: e.target.value })} className={fieldClass('technicianId')}>
              {TECHNICIANS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className={cls.fieldLabel}>Estimated Cost (₹) *</label>
            <NumberInput value={form.estimatedCost} onChange={(v) => setForm({ ...form, estimatedCost: v })} className={fieldClass('estimatedCost')} />
          </div>
          <div>
            <label className={cls.fieldLabel}>Advance Paid (₹)</label>
            <NumberInput value={form.advancePaid} onChange={(v) => setForm({ ...form, advancePaid: v })} className={fieldClass('advancePaid')} />
          </div>
          <div>
            <label className={cls.fieldLabel}>Job Card Barcode</label>
            <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-mono">{newBarcode}</div>
          </div>
          <div className="col-span-2">
            <label className={cls.fieldLabel}>Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className={fieldClass('notes')} />
          </div>
        </div>
      </Modal>

      <Modal open={!!viewJob} onClose={() => setViewJob(null)} title={viewJob ? `Job Card ${viewJob.id}` : ''} size="lg"
        footer={viewJob && <>
          <button onClick={() => setViewJob(null)} className={cls.btnSecondary}>Close</button>
          <button onClick={() => { advanceStatus(viewJob.id); setViewJob(null); }} className={cls.btnPrimary}>Update Status</button>
        </>}>
        {viewJob && (
          <div className="space-y-5">
            <div className="p-4 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-gray-900">{viewJob.customerName}</div>
                  <div className="text-sm text-gray-600">{viewJob.mobile}</div>
                </div>
                <div className="text-right">
                  <div className={cls.mutedText}>Barcode</div>
                  <div className="font-mono text-sm">{viewJob.barcode}</div>
                </div>
              </div>
            </div>

            <div>
              <div className={cls.sectionLabel + ' mb-2'}>Status Timeline</div>
              <div className="flex items-center gap-2">
                {STATUS_ORDER.map((s, i) => {
                  const done = STATUS_ORDER.indexOf(viewJob.status) >= i;
                  return (
                    <div key={s} className="flex-1 flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{i + 1}</div>
                      <div className="text-xs flex-1">{s}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Item" value={viewJob.itemDesc} />
              <Info label="Category" value={viewJob.category} />
              <Info label="Weight" value={viewJob.weight} />
              <Info label="Priority" value={viewJob.priority} />
              <Info label="Received Date" value={formatDate(viewJob.receivedDate)} />
              <Info label="Est. Delivery" value={formatDate(viewJob.estimatedDate)} />
              <Info label="Technician" value={viewJob.technicianName} />
              <Info label="Completed On" value={viewJob.completedDate ? formatDate(viewJob.completedDate) : '-'} />
              <div className="col-span-2"><Info label="Issue" value={viewJob.issue} /></div>
              {viewJob.notes && <div className="col-span-2"><Info label="Notes" value={viewJob.notes} /></div>}
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className={cls.sectionLabel + ' mb-2'}>Cost Breakdown</div>
              <div className="grid grid-cols-2 gap-3">
                <Info label="Estimated Cost" value={formatINR(viewJob.estimatedCost)} />
                <Info label="Final Cost" value={viewJob.finalCost ? formatINR(viewJob.finalCost) : '-'} />
                <Info label="Advance Paid" value={formatINR(viewJob.advancePaid)} />
                <Info label="Balance Due" value={formatINR((viewJob.finalCost || viewJob.estimatedCost) - viewJob.advancePaid)} />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center gap-1.5"><MessageCircle className="w-4 h-4" />WhatsApp Customer</button>
              <button className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium flex items-center gap-1.5"><Printer className="w-4 h-4" />Print Job Card</button>
              <button className="px-3 py-2 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium flex items-center gap-1.5"><Edit className="w-4 h-4" />Edit</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete Job Card" size="sm"
        footer={<>
          <button onClick={() => setConfirmDelete(null)} className={cls.btnSecondary}>Cancel</button>
          <button onClick={handleDelete} className={cls.btnDanger}>Delete</button>
        </>}>
        <p className={cls.bodyText}>Are you sure you want to delete job card <b>{confirmDelete}</b>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className={cls.panel.gray}>
      <div className={cls.mutedText}>{label}</div>
      <div className="text-sm text-gray-900 font-medium mt-0.5">{value}</div>
    </div>
  );
}
