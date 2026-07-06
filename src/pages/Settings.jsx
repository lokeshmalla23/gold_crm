import { useState } from 'react';
import { Store, Coins, Percent, UserCog, Shield, Bell, Database, Save, ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import { shopSettings, auditLog } from '../data/mockData';
import * as cls from '../styles/classes';

const SECTIONS = [
  { key: 'shop', label: 'Shop Details', icon: Store },
  { key: 'rates', label: 'Gold Rate Settings', icon: Coins },
  { key: 'gst', label: 'GST Configuration', icon: Percent },
  { key: 'users', label: 'User Management', icon: UserCog },
  { key: 'roles', label: 'Roles & Permissions', icon: Shield },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'backup', label: 'Backup & Export', icon: Database },
  { key: 'audit', label: 'Audit Log', icon: ClipboardList },
];

export default function Settings() {
  const [section, setSection] = useState('shop');
  const [settings, setSettings] = useState(shopSettings);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <aside className={`${cls.card} p-3 h-fit`}>
        <div className={`${cls.sectionLabel} px-3 py-2`}>Settings</div>
        <nav className="space-y-1">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.key} onClick={() => setSection(s.key)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${section === s.key ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon className="w-4 h-4" />{s.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="lg:col-span-3">
        <div className={cls.cardLg}>
          {saved && <div className={`mb-4 ${cls.panel.emerald} text-emerald-700 text-sm`}>Settings saved successfully</div>}

          {section === 'shop' && (
            <Section title="Shop Details" desc="Business identity and contact info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <F label="Shop Name" value={settings.shopName} onChange={(v) => setSettings({ ...settings, shopName: v })} />
                <F label="Owner Name" value={settings.ownerName} onChange={(v) => setSettings({ ...settings, ownerName: v })} />
                <F label="GSTIN" value={settings.gstin} onChange={(v) => setSettings({ ...settings, gstin: v })} />
                <F label="PAN Number" value={settings.panNumber} onChange={(v) => setSettings({ ...settings, panNumber: v })} />
                <F label="Phone" value={settings.phone} onChange={(v) => setSettings({ ...settings, phone: v })} />
                <F label="Email" value={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} />
                <div className="md:col-span-2"><F label="Address" value={settings.address} onChange={(v) => setSettings({ ...settings, address: v })} /></div>
              </div>
            </Section>
          )}

          {section === 'rates' && (
            <Section title="Gold Rate Settings" desc="Current gold and silver rates per gram">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <F label="24K Gold Rate (₹/g)" type="number" value={settings.goldRates['24K']} onChange={(v) => setSettings({ ...settings, goldRates: { ...settings.goldRates, '24K': Number(v) } })} />
                <F label="22K Gold Rate (₹/g)" type="number" value={settings.goldRates['22K']} onChange={(v) => setSettings({ ...settings, goldRates: { ...settings.goldRates, '22K': Number(v) } })} />
                <F label="18K Gold Rate (₹/g)" type="number" value={settings.goldRates['18K']} onChange={(v) => setSettings({ ...settings, goldRates: { ...settings.goldRates, '18K': Number(v) } })} />
                <F label="Silver Rate (₹/g)" type="number" value={settings.silverRate} onChange={(v) => setSettings({ ...settings, silverRate: Number(v) })} />
              </div>
              <div className={`mt-4 ${cls.panel.amber} text-amber-800 text-xs`}>
                Rates are used across billing and invoices. Update daily for accurate pricing.
              </div>
            </Section>
          )}

          {section === 'gst' && (
            <Section title="GST Configuration" desc="Tax rates applied to sales">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <F label="GST Rate (%)" type="number" value={settings.gstRate} onChange={(v) => setSettings({ ...settings, gstRate: Number(v) })} />
                <F label="Default Making Charges (%)" type="number" value={settings.makingChargeDefault} onChange={(v) => setSettings({ ...settings, makingChargeDefault: Number(v) })} />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <ToggleRow label="Show GST breakdown on invoice" defaultChecked />
                <ToggleRow label="Enable IGST for inter-state" />
                <ToggleRow label="Include HSN codes" defaultChecked />
              </div>
            </Section>
          )}

          {section === 'users' && (
            <Section title="User Management" desc="Manage users who access this CRM">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {[
                  { name: 'Suresh Chandra', email: 'demo@goldcrm.com', role: 'Owner', status: 'Active' },
                  { name: 'Rajesh Malhotra', email: 'rajesh@goldcrm.com', role: 'Manager', status: 'Active' },
                  { name: 'Anita Reddy', email: 'anita@goldcrm.com', role: 'Accountant', status: 'Active' }
                ].map((u, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.email} · {u.role}</div>
                    </div>
                    <button className="text-xs text-amber-600 hover:text-amber-700 font-medium">Manage</button>
                  </div>
                ))}
              </div>
              <button className="mt-3 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">+ Invite User</button>
            </Section>
          )}

          {section === 'roles' && (
            <Section title="Roles & Permissions" desc="Define what each role can access">
              <div className="space-y-3">
                {['Owner', 'Manager', 'Sales Executive', 'Cashier', 'Accountant'].map((r) => (
                  <div key={r} className={cls.cardSm}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{r}</div>
                      <button className="text-xs text-amber-600 font-medium">Edit</button>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['Dashboard', 'Billing', 'Inventory', 'Customers', 'Reports'].map((p) => (
                        <span key={p} className="px-2 py-1 bg-gray-100 text-gray-600 rounded">{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {section === 'notifications' && (
            <Section title="Notifications" desc="Configure system notifications">
              <div className="space-y-1">
                <ToggleRow label="Send WhatsApp on new invoice" defaultChecked />
                <ToggleRow label="Send SMS on payment received" defaultChecked />
                <ToggleRow label="Email daily sales report to owner" defaultChecked />
                <ToggleRow label="Alert on low stock items" defaultChecked />
                <ToggleRow label="Birthday reminders (1 day before)" defaultChecked />
                <ToggleRow label="Anniversary reminders (1 day before)" defaultChecked />
                <ToggleRow label="Savings scheme due date reminders" defaultChecked />
              </div>
            </Section>
          )}

          {section === 'backup' && (
            <Section title="Backup & Export" desc="Secure your business data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900">Last Backup</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-2">Today 3:00 AM</div>
                  <p className="text-xs text-gray-500 mt-1">Auto-backup runs daily</p>
                  <button className={`mt-3 ${cls.btnPrimary} text-sm`}>Backup Now</button>
                </div>
                <div className="p-5 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900">Export Data</div>
                  <p className="text-xs text-gray-500 mt-1">Download all business data</p>
                  <div className="mt-3 space-y-2">
                    <button className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-left hover:bg-gray-50">Export Customers (CSV)</button>
                    <button className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-left hover:bg-gray-50">Export Inventory (CSV)</button>
                    <button className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-left hover:bg-gray-50">Export All Data (ZIP)</button>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {section === 'audit' && (
            <AuditLogSection />
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end gap-2">
            <button className={cls.btnSecondary}>Cancel</button>
                  <button onClick={save} className={`${cls.btnPrimary} flex items-center gap-2`}><Save className="w-4 h-4" />Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuditLogSection() {
  const [moduleFilter, setModuleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const modules = ['All', ...Array.from(new Set(auditLog.map((a) => a.module)))];
  const filtered = auditLog.filter((a) => {
    const matchMod = moduleFilter === 'All' || a.module === moduleFilter;
    const matchStat = statusFilter === 'All' || a.status === statusFilter;
    const matchSearch = !search || a.user.toLowerCase().includes(search.toLowerCase()) || a.action.toLowerCase().includes(search.toLowerCase()) || a.details.toLowerCase().includes(search.toLowerCase());
    return matchMod && matchStat && matchSearch;
  });

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Audit Log</h3>
      <p className="text-xs text-gray-500 mt-0.5 mb-4">Complete history of all actions performed in the CRM</p>
      <div className="flex flex-wrap gap-3 mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search actions, users..." className={`${cls.inputSm} flex-1 min-w-[200px]`} />
        <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className={cls.inputSm}>
          {modules.map((m) => <option key={m}>{m}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={cls.inputSm}>
          <option>All</option><option>Success</option><option>Failed</option>
        </select>
      </div>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className={`${cls.tableHeader} border-b border-gray-100`}>
              <th className={`${cls.tableCell} whitespace-nowrap`}>Timestamp</th>
              <th className={cls.tableCell}>User</th>
              <th className={cls.tableCell}>Action</th>
              <th className={`${cls.tableCell} hidden md:table-cell`}>Module</th>
              <th className={`${cls.tableCell} hidden lg:table-cell`}>Details</th>
              <th className={`${cls.tableCell} hidden md:table-cell`}>IP</th>
              <th className={cls.tableCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className={`${cls.tableRow} ${log.status === 'Failed' ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                <td className={`${cls.tableCell} text-xs font-mono text-gray-500 whitespace-nowrap`}>{log.timestamp}</td>
                <td className={`${cls.tableCell} text-xs text-gray-700`}>{log.user}</td>
                <td className={`${cls.tableCell} text-xs font-medium text-gray-900`}>{log.action}</td>
                <td className={`${cls.tableCell} hidden md:table-cell`}>
                  <span className={`${cls.badge} ${cls.badgeColor.gray}`}>{log.module}</span>
                </td>
                <td className={`${cls.tableCell} text-xs text-gray-500 hidden lg:table-cell max-w-xs truncate`}>{log.details}</td>
                <td className={`${cls.tableCell} text-xs font-mono text-gray-400 hidden md:table-cell`}>{log.ip}</td>
                <td className={cls.tableCell}>
                  {log.status === 'Success'
                    ? <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium"><CheckCircle className="w-3.5 h-3.5" />Success</span>
                    : <span className="flex items-center gap-1 text-red-600 text-xs font-medium"><XCircle className="w-3.5 h-3.5" />Failed</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center text-gray-400 py-10 text-sm">No audit log entries found</div>}
      </div>
      <div className="mt-2 text-xs text-gray-400">Showing {filtered.length} of {auditLog.length} entries</div>
    </div>
  );
}

function Section({ title, desc, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 mt-0.5 mb-5">{desc}</p>
      {children}
    </div>
  );
}
function F({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className={cls.fieldLabel}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls.input} />
    </div>
  );
}
function ToggleRow({ label, defaultChecked }) {
  const [on, setOn] = useState(defaultChecked || false);
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-700">{label}</span>
      <button onClick={() => setOn(!on)} className={cls.toggleTrack(on)}>
        <span className={cls.toggleThumb(on)}></span>
      </button>
    </div>
  );
}
