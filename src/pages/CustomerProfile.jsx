import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, MessageCircle, Receipt, Bell, Cake, ShoppingBag, Wrench, PiggyBank, ArrowLeftRight, Package, Bookmark, Heart, MessageSquare } from 'lucide-react';
import { customers, invoices, repairs, approvals, reservations, formatINR, formatDate, kycStatus, loyaltyPoints } from '../data/mockData';
import { CustomerTypeBadge } from '../components/ui/Badge';

const TABS = ['Personal Details', 'Purchase History', 'Payments', 'Savings Plans', 'Wishlist', 'Notes', 'Loyalty & KYC', 'Timeline'];

export default function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Personal Details');
  const customer = customers.find((c) => c.id === Number(id));

  if (!customer) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Customer not found</p>
        <button onClick={() => navigate('/customers')} className="mt-4 text-amber-600 font-medium">← Back to Customers</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button onClick={() => navigate('/customers')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to Customers
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-500 text-white font-bold text-2xl flex items-center justify-center">
            {customer.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
              <CustomerTypeBadge type={customer.type} />
            </div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-400" />{customer.mobile}</div>
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-400" />{customer.email}</div>
              <div className="flex items-center gap-2"><Cake className="w-3.5 h-3.5 text-gray-400" />{formatDate(customer.birthday)}</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gray-400" />{customer.address}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm font-medium flex items-center gap-1.5"><MessageCircle className="w-4 h-4" />WhatsApp</button>
            <button className="px-3 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-sm font-medium flex items-center gap-1.5"><Receipt className="w-4 h-4" />Create Invoice</button>
            <button className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium flex items-center gap-1.5"><Bell className="w-4 h-4" />Add Reminder</button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
          <Stat label="Total Purchases" value={formatINR(customer.totalPurchases)} />
          <Stat label="Total Orders" value={customer.purchaseHistory?.length || 0} />
          <Stat label="Last Visit" value={formatDate(customer.lastVisit)} />
          <Stat label="Loyalty Points" value={Math.floor(customer.totalPurchases / 1000).toLocaleString('en-IN')} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-100 px-4 overflow-x-auto">
          <div className="flex gap-1">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${tab === t ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5">
          {tab === 'Personal Details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailRow label="Full Name" value={customer.name} />
              <DetailRow label="Mobile" value={customer.mobile} />
              <DetailRow label="Email" value={customer.email} />
              <DetailRow label="Birthday" value={formatDate(customer.birthday)} />
              <DetailRow label="Anniversary" value={formatDate(customer.anniversary)} />
              <DetailRow label="Type" value={customer.type} />
              <div className="md:col-span-2"><DetailRow label="Address" value={customer.address} /></div>
            </div>
          )}
          {tab === 'Purchase History' && (
            <SimpleTable headers={['Invoice #', 'Date', 'Items', 'Amount']} rows={(customer.purchaseHistory || []).map((p) => [p.id, formatDate(p.date), p.items, formatINR(p.amount)])} />
          )}
          {tab === 'Payments' && (
            <SimpleTable headers={['Date', 'Amount', 'Mode']} rows={(customer.payments || []).map((p) => [formatDate(p.date), formatINR(p.amount), p.mode])} />
          )}
          {tab === 'Savings Plans' && (
            <SimpleTable headers={['Plan', 'Amount Paid', 'Months']} rows={(customer.savingsPlans || []).map((p) => [p.plan, formatINR(p.paid), p.months])} />
          )}
          {tab === 'Wishlist' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(customer.wishlist || []).length === 0 ? <p className="text-sm text-gray-500">No wishlist items</p> :
                customer.wishlist.map((w, i) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-200 hover:border-amber-200">
                    <div className="w-full h-24 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-200 mb-3"></div>
                    <div className="font-medium text-gray-900 text-sm">{w.name}</div>
                    <div className="text-amber-600 font-semibold mt-1">{formatINR(w.price)}</div>
                  </div>
                ))}
            </div>
          )}
          {tab === 'Timeline' && <TimelineTab customer={customer} />}
          {tab === 'Loyalty & KYC' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Loyalty Points</div>
                <div className="text-2xl font-bold text-amber-600">{Math.floor(customer.totalPurchases / 1000).toLocaleString('en-IN')}</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">KYC Status</div>
                <div className="text-lg font-bold text-emerald-600">Verified</div>
              </div>
            </div>
          )}
          {tab === 'Notes' && (
            <div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{customer.notes || 'No notes yet'}</p>
              <textarea placeholder="Add a note..." className="mt-4 w-full h-28 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"></textarea>
              <button className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">Save Note</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}
function DetailRow({ label, value }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm text-gray-900 font-medium mt-1">{value}</div>
    </div>
  );
}
function TimelineTab({ customer }) {
  const events = [];
  invoices.filter((i) => i.customerName === customer.name || i.customerId === customer.id).forEach((i) => {
    events.push({ date: i.date, icon: ShoppingBag, color: 'bg-amber-100 text-amber-700', title: `Purchase · ${i.id}`, description: `${i.items} items · ${i.paymentMode}`, amount: i.totalAmount });
  });
  (customer.purchaseHistory || []).forEach((p) => {
    if (!events.find((e) => e.title.includes(p.id))) {
      events.push({ date: p.date, icon: ShoppingBag, color: 'bg-amber-100 text-amber-700', title: `Purchase · ${p.id}`, description: `${p.items} items`, amount: p.amount });
    }
  });
  repairs.filter((r) => r.customerId === customer.id).forEach((r) => {
    events.push({ date: r.receivedDate, icon: Wrench, color: 'bg-blue-100 text-blue-700', title: `Repair · ${r.id}`, description: r.itemDesc, amount: r.finalCost || r.estimatedCost });
  });
  (customer.savingsPlans || []).forEach((s, idx) => {
    events.push({ date: '2026-01-15', icon: PiggyBank, color: 'bg-emerald-100 text-emerald-700', title: `Savings Plan · ${s.plan}`, description: `${s.months} months paid`, amount: s.paid });
  });
  approvals.filter((a) => a.customerId === customer.id).forEach((a) => {
    events.push({ date: a.issueDate, icon: Package, color: 'bg-purple-100 text-purple-700', title: `Approval Given · ${a.id}`, description: `${a.items.length} items · ${a.status}`, amount: a.totalValue });
  });
  reservations.filter((r) => r.customerId === customer.id).forEach((r) => {
    events.push({ date: r.reservedDate, icon: Bookmark, color: 'bg-cyan-100 text-cyan-700', title: `Reservation · ${r.id}`, description: `${r.itemName} · ${r.status}`, amount: r.itemValue });
  });
  if (customer.birthday) events.push({ date: customer.birthday, icon: Heart, color: 'bg-pink-100 text-pink-700', title: 'Birthday', description: `${customer.name}'s birthday on record` });
  if (customer.notes) events.push({ date: customer.lastVisit || '2026-01-01', icon: MessageSquare, color: 'bg-gray-100 text-gray-700', title: 'Note', description: customer.notes });

  events.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  if (events.length === 0) return <p className="text-sm text-gray-500 text-center py-6">No timeline events yet</p>;

  return (
    <div className="space-y-4">
      {events.map((e, i) => {
        const Icon = e.icon;
        return (
          <div key={i} className="flex gap-4">
            <div className="text-xs text-gray-500 w-24 pt-2 flex-shrink-0">{formatDate(e.date)}</div>
            <div className="relative flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${e.color}`}><Icon className="w-5 h-5" /></div>
              {i < events.length - 1 && <div className="absolute left-1/2 top-10 w-px h-full bg-gray-200 -translate-x-1/2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="font-medium text-gray-900 text-sm">{e.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{e.description}</div>
              {e.amount != null && <div className="text-sm font-semibold text-amber-600 mt-1">{formatINR(e.amount)}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SimpleTable({ headers, rows }) {
  if (!rows.length) return <p className="text-sm text-gray-500 py-6 text-center">No records</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {headers.map((h) => <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              {r.map((c, j) => <td key={j} className="py-3 px-3 text-gray-700">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
