import { useState } from 'react';
import { Plus, Users, UserCheck, UserX, Shield } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { staff as initial, attendance, formatINR, formatDate } from '../data/mockData';
import * as cls from '../styles/classes';
import NumberInput from '../components/ui/NumberInput';

const TABS = ['Staff List', 'Attendance', 'Roles & Permissions'];

const ROLES = [
  { role: 'Manager', permissions: ['All Access', 'Reports', 'Staff Management'], count: 1 },
  { role: 'Sales Executive', permissions: ['Billing', 'Customers', 'Inventory View'], count: 4 },
  { role: 'Cashier', permissions: ['Billing', 'Payments'], count: 1 },
  { role: 'Goldsmith', permissions: ['Inventory', 'Orders'], count: 1 },
  { role: 'Accountant', permissions: ['Reports', 'Payments', 'GST'], count: 1 },
  { role: 'Assistant', permissions: ['Customers View', 'Inventory View'], count: 1 },
  { role: 'Security', permissions: ['Attendance'], count: 1 }
];

export default function Staff() {
  const [list, setList] = useState(initial);
  const [tab, setTab] = useState('Staff List');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', role: 'Sales Executive', mobile: '', email: '', joinDate: '', salary: '' });

  const active = list.filter((s) => s.status === 'Active').length;
  const onLeave = list.filter((s) => s.status === 'On Leave').length;

  const handleAdd = () => {
    if (!form.name) return;
    setList((l) => [{ ...form, id: Date.now(), salary: Number(form.salary) || 0, status: 'Active', image: '#F59E0B' }, ...l]);
    setForm({ name: '', role: 'Sales Executive', mobile: '', email: '', joinDate: '', salary: '' });
    setShowModal(false);
  };

  const staffColumns = [
    { key: 'name', title: 'Employee', render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: `linear-gradient(135deg, ${r.image}, #FBBF24)` }}>
          {r.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <div className="font-medium text-gray-900">{r.name}</div>
          <div className="text-xs text-gray-500">{r.email}</div>
        </div>
      </div>
    ) },
    { key: 'role', title: 'Role', render: (r) => <Badge variant="blue">{r.role}</Badge> },
    { key: 'mobile', title: 'Mobile' },
    { key: 'joinDate', title: 'Join Date', render: (r) => formatDate(r.joinDate) },
    { key: 'salary', title: 'Salary', render: (r) => formatINR(r.salary) },
    { key: 'status', title: 'Status', render: (r) => <Badge variant={r.status === 'Active' ? 'green' : 'yellow'}>{r.status}</Badge> }
  ];

  const attColumns = [
    { key: 'name', title: 'Employee', render: (r) => <span className="font-medium text-gray-900">{r.name}</span> },
    { key: 'present', title: 'Present', render: (r) => <Badge variant="green">{r.present}</Badge> },
    { key: 'absent', title: 'Absent', render: (r) => <Badge variant="red">{r.absent}</Badge> },
    { key: 'halfDay', title: 'Half-day', render: (r) => <Badge variant="yellow">{r.halfDay}</Badge> },
    { key: 'leaves', title: 'Leaves', render: (r) => <Badge variant="blue">{r.leaves}</Badge> },
    { key: 'percent', title: 'Attendance %', render: (r) => {
      const pct = Math.round((r.present / (r.present + r.absent + r.halfDay + r.leaves)) * 100);
      return (
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 bg-gray-100 rounded-full"><div className={`h-full rounded-full ${pct >= 90 ? 'bg-emerald-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div></div>
          <span className="text-xs font-medium">{pct}%</span>
        </div>
      );
    } }
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Staff" value={list.length} icon={Users} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="Active" value={active} icon={UserCheck} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard label="On Leave" value={onLeave} icon={UserX} iconBg="bg-yellow-100" iconColor="text-yellow-600" />
        <StatCard label="Roles" value={ROLES.length} icon={Shield} iconBg="bg-purple-100" iconColor="text-purple-600" />
      </div>

      <div className={cls.card}>
        <div className={cls.cardHeader}>
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>{t}</button>
            ))}
          </div>
          {tab === 'Staff List' && (
            <button onClick={() => setShowModal(true)} className={`${cls.btnPrimary} text-sm flex items-center gap-2`}><Plus className="w-4 h-4" />Add Employee</button>
          )}
        </div>

        {tab === 'Staff List' && <DataTable columns={staffColumns} data={list} pageSize={10} />}
        {tab === 'Attendance' && <DataTable columns={attColumns} data={attendance} rowKey="staffId" pageSize={10} />}
        {tab === 'Roles & Permissions' && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((r) => (
              <div key={r.role} className={cls.cardSm}>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-gray-900">{r.role}</div>
                  <Badge variant="blue">{r.count}</Badge>
                </div>
                <div className="space-y-1.5">
                  {r.permissions.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                      {p}
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full py-1.5 text-xs text-amber-600 hover:bg-amber-50 rounded font-medium">Edit Permissions</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New Employee"
        footer={<>
          <button onClick={() => setShowModal(false)} className={cls.btnSecondary}>Cancel</button>
          <button onClick={handleAdd} className={cls.btnPrimary}>Save Employee</button>
        </>}
      >
        <div className="grid grid-cols-2 gap-4">
          <F label="Full Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <div>
            <label className={cls.fieldLabel}>Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={cls.input}>
              {ROLES.map((r) => <option key={r.role}>{r.role}</option>)}
            </select>
          </div>
          <F label="Mobile" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
          <F label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <F label="Join Date" type="date" value={form.joinDate} onChange={(v) => setForm({ ...form, joinDate: v })} />
          <F label="Salary" type="number" value={form.salary} onChange={(v) => setForm({ ...form, salary: v })} />
        </div>
      </Modal>
    </div>
  );
}

function F({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className={cls.fieldLabel}>{label}</label>
      {type === 'number' ? (
        <NumberInput value={value} onChange={onChange} className={cls.input} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls.input} />
      )}
    </div>
  );
}
