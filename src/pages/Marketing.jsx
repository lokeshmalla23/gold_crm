import { useState } from 'react';
import { Plus, MessageCircle, Gift, Cake, Heart, TrendingUp, Users, Send } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { campaigns, customers, formatDate } from '../data/mockData';
import * as cls from '../styles/classes';

const TABS = [
  { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { key: 'festival', label: 'Festival Offers', icon: Gift },
  { key: 'birthday', label: 'Birthday Wishes', icon: Cake },
  { key: 'anniversary', label: 'Anniversary', icon: Heart },
  { key: 'goldRate', label: 'Gold Rate Updates', icon: TrendingUp },
  { key: 'followup', label: 'Follow-ups', icon: Users }
];

export default function Marketing() {
  const [tab, setTab] = useState('whatsapp');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', message: '', audience: 'All Customers' });

  const upcomingBirthdays = customers
    .map((c) => {
      const [y, m, d] = c.birthday.split('-');
      const now = new Date();
      const b = new Date(now.getFullYear(), Number(m) - 1, Number(d));
      const diff = Math.round((b - now) / 86400000);
      return { ...c, daysUntil: diff < -30 ? diff + 365 : diff < 0 ? diff + 365 : diff, birthdayThisYear: b };
    })
    .filter((c) => c.daysUntil >= 0 && c.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const upcomingAnniversaries = customers
    .filter((c) => c.anniversary)
    .map((c) => {
      const [y, m, d] = c.anniversary.split('-');
      const now = new Date();
      const a = new Date(now.getFullYear(), Number(m) - 1, Number(d));
      const diff = Math.round((a - now) / 86400000);
      return { ...c, daysUntil: diff < -30 ? diff + 365 : diff < 0 ? diff + 365 : diff, aThisYear: a };
    })
    .filter((c) => c.daysUntil >= 0 && c.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const list = campaigns[tab] || [];

  return (
    <div className="space-y-5">
      <div className={cls.card}>
        <div className="border-b border-gray-100 px-4 overflow-x-auto">
          <div className="flex gap-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${tab === t.key ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                  <Icon className="w-4 h-4" />{t.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">{TABS.find((t) => t.key === tab)?.label} Campaigns</h3>
              <p className={cls.mutedText}>Manage messages and outreach</p>
            </div>
            <button onClick={() => setShowModal(true)} className={`${cls.btnPrimary} flex items-center gap-2 text-sm`}><Plus className="w-4 h-4" />Create Campaign</button>
          </div>

          {tab === 'birthday' ? (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Upcoming Birthdays (next 30 days)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {upcomingBirthdays.length === 0 ? <p className={cls.bodyText}>No upcoming birthdays</p> :
                  upcomingBirthdays.map((c) => (
                    <div key={c.id} className={cls.cardSm}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 text-white font-semibold flex items-center justify-center">{c.name[0]}</div>
                        <div>
                          <div className="font-medium text-gray-900">{c.name}</div>
                          <div className={cls.mutedText}>{c.mobile}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{formatDate(c.birthday)}</span>
                        <Badge variant="yellow">{c.daysUntil === 0 ? 'Today!' : `In ${c.daysUntil} days`}</Badge>
                      </div>
                      <button className="mt-3 w-full py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1"><MessageCircle className="w-3 h-3" />Send Wishes</button>
                    </div>
                  ))}
              </div>
            </div>
          ) : tab === 'anniversary' ? (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Upcoming Anniversaries (next 30 days)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {upcomingAnniversaries.length === 0 ? <p className={cls.bodyText}>No upcoming anniversaries</p> :
                  upcomingAnniversaries.map((c) => (
                    <div key={c.id} className={cls.cardSm}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-300 to-red-500 text-white font-semibold flex items-center justify-center">{c.name[0]}</div>
                        <div>
                          <div className="font-medium text-gray-900">{c.name}</div>
                          <div className={cls.mutedText}>{c.mobile}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{formatDate(c.anniversary)}</span>
                        <Badge variant="red">{c.daysUntil === 0 ? 'Today!' : `In ${c.daysUntil} days`}</Badge>
                      </div>
                      <button className="mt-3 w-full py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1"><MessageCircle className="w-3 h-3" />Send Wishes</button>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {list.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">No campaigns yet. Click "Create Campaign" to add one.</div>
              ) : (
                list.map((c) => (
                  <div key={c.id} className="p-4 border border-gray-200 rounded-lg hover:border-amber-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-gray-900">{c.name}</div>
                      <div className={`${cls.mutedText} mt-0.5`}>{c.date} · Audience: {c.audience} {c.sent && `· Sent: ${c.sent}`} {c.opened && `· Opened: ${c.opened}`} {c.discount && `· ${c.discount}`}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={c.status === 'Running' || c.status === 'Active' ? 'green' : c.status === 'Scheduled' || c.status === 'Recurring' ? 'blue' : c.status === 'Completed' ? 'gray' : 'yellow'}>{c.status}</Badge>
                      <button className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 flex items-center gap-1"><Send className="w-3 h-3" />Send</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Campaign"
        footer={<>
          <button onClick={() => setShowModal(false)} className={cls.btnSecondary}>Cancel</button>
          <button onClick={() => setShowModal(false)} className={cls.btnPrimary}>Send Campaign</button>
        </>}
      >
        <div className="space-y-4">
          <div>
            <label className={cls.fieldLabel}>Campaign Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cls.input} />
          </div>
          <div>
            <label className={cls.fieldLabel}>Audience</label>
            <select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className={cls.input}>
              <option>All Customers</option>
              <option>VIP Only</option>
              <option>Premium & VIP</option>
              <option>Customers with Birthday this month</option>
            </select>
          </div>
          <div>
            <label className={cls.fieldLabel}>Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={cls.input} placeholder="Wishing you a sparkling day! Visit us for exclusive offers." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
