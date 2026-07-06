import { useMemo, useState } from 'react';
import { BookOpen, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { dayBook, customers, invoices, formatINR, formatDate } from '../data/mockData';
import Badge from '../components/ui/Badge';

const TABS = ['Day Book', 'Cash Book', 'Customer Ledger'];

function TypeBadge({ type }) {
  const map = { Sale: 'green', Expense: 'red', Exchange: 'blue', Repair: 'purple' };
  return <Badge variant={map[type] || 'gray'}>{type}</Badge>;
}

export default function Accounts() {
  const [tab, setTab] = useState('Day Book');
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [expandedDay, setExpandedDay] = useState(null);
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');

  const filteredDayBook = useMemo(() => {
    const q = search.toLowerCase();
    return dayBook.filter((d) => !q || d.description.toLowerCase().includes(q) || d.refNo.toLowerCase().includes(q));
  }, [search]);

  const totalCredits = filteredDayBook.reduce((s, d) => s + d.credit, 0);
  const totalDebits = filteredDayBook.reduce((s, d) => s + d.debit, 0);
  const netBalance = totalCredits - totalDebits;

  // Group by date for cash book
  const grouped = useMemo(() => {
    const map = {};
    dayBook.forEach((d) => {
      if (!map[d.date]) map[d.date] = { date: d.date, sales: 0, expenses: 0, entries: [] };
      map[d.date].sales += d.credit;
      map[d.date].expenses += d.debit;
      map[d.date].entries.push(d);
    });
    let running = 0;
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date)).map((g) => {
      const opening = running;
      running += g.sales - g.expenses;
      return { ...g, opening, closing: running };
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  // Customer ledger
  const customerLedger = useMemo(() => {
    const cust = customers.find((c) => c.id === Number(customerId));
    if (!cust) return { customer: null, entries: [], outstanding: 0 };
    const custInvoices = invoices.filter((inv) => inv.customerId === Number(customerId));
    let bal = 0;
    const entries = custInvoices.map((inv) => {
      const debit = inv.totalAmount;
      const credit = inv.status === 'Paid' ? inv.totalAmount : (inv.status === 'Partial' ? inv.totalAmount * 0.6 : 0);
      bal += debit - credit;
      return {
        date: inv.date, ref: inv.id,
        desc: `Invoice - ${inv.items} items · ${inv.paymentMode}`,
        debit, credit, balance: bal
      };
    });
    return { customer: cust, entries, outstanding: bal };
  }, [customerId]);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-100 px-4 flex gap-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 ${tab === t ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>{t}</button>
          ))}
        </div>

        {tab === 'Day Book' && (
          <div>
            <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between border-b border-gray-100">
              <div className="flex gap-2 flex-wrap items-center">
                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
                  <option>All</option><option>Today</option><option>This Week</option><option>This Month</option><option>Custom</option>
                </select>
                {dateFilter === 'Custom' && (
                  <>
                    <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="px-2 py-2 rounded-lg border border-gray-200 text-sm" />
                    <span className="text-gray-400">to</span>
                    <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="px-2 py-2 rounded-lg border border-gray-200 text-sm" />
                  </>
                )}
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." className="pl-9 pr-3 py-2 w-64 rounded-lg border border-gray-200 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-yellow-50">
              <SumCard label="Total Credits" value={formatINR(totalCredits)} color="text-emerald-600" />
              <SumCard label="Total Debits" value={formatINR(totalDebits)} color="text-red-600" />
              <SumCard label="Net Balance" value={formatINR(netBalance)} color="text-amber-600" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600">
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="text-left px-4 py-3">Ref No</th>
                    <th className="text-left px-4 py-3">Description</th>
                    <th className="text-left px-4 py-3">Type</th>
                    <th className="text-right px-4 py-3">Debit</th>
                    <th className="text-right px-4 py-3">Credit</th>
                    <th className="text-right px-4 py-3">Balance</th>
                    <th className="text-left px-4 py-3">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDayBook.map((d) => (
                    <tr key={d.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600">{formatDate(d.date)}</td>
                      <td className="px-4 py-3 font-medium">{d.refNo}</td>
                      <td className="px-4 py-3">{d.description}</td>
                      <td className="px-4 py-3"><TypeBadge type={d.type} /></td>
                      <td className="px-4 py-3 text-right text-red-600">{d.debit > 0 ? formatINR(d.debit) : '-'}</td>
                      <td className="px-4 py-3 text-right text-emerald-600">{d.credit > 0 ? formatINR(d.credit) : '-'}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatINR(d.balance)}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{d.paymentMode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'Cash Book' && (
          <div className="p-4">
            <div className="space-y-2">
              {grouped.map((g) => (
                <div key={g.date} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedDay(expandedDay === g.date ? null : g.date)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      {expandedDay === g.date ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                      <div className="font-semibold">{formatDate(g.date)}</div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div><span className="text-gray-500">Opening:</span> <b>{formatINR(g.opening)}</b></div>
                      <div className="text-emerald-600"><span className="text-gray-500">Sales:</span> <b>{formatINR(g.sales)}</b></div>
                      <div className="text-red-600"><span className="text-gray-500">Expenses:</span> <b>{formatINR(g.expenses)}</b></div>
                      <div><span className="text-gray-500">Closing:</span> <b className="text-amber-600">{formatINR(g.closing)}</b></div>
                    </div>
                  </button>
                  {expandedDay === g.date && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-xs uppercase text-gray-600">
                            <th className="text-left px-4 py-2">Ref</th>
                            <th className="text-left px-4 py-2">Description</th>
                            <th className="text-right px-4 py-2">Debit</th>
                            <th className="text-right px-4 py-2">Credit</th>
                            <th className="text-left px-4 py-2">Mode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {g.entries.map((e) => (
                            <tr key={e.id} className="border-t border-gray-200">
                              <td className="px-4 py-2 font-medium">{e.refNo}</td>
                              <td className="px-4 py-2">{e.description}</td>
                              <td className="px-4 py-2 text-right text-red-600">{e.debit > 0 ? formatINR(e.debit) : '-'}</td>
                              <td className="px-4 py-2 text-right text-emerald-600">{e.credit > 0 ? formatINR(e.credit) : '-'}</td>
                              <td className="px-4 py-2 text-xs text-gray-600">{e.paymentMode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Customer Ledger' && (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium">Select Customer:</label>
              <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
                {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {customerLedger.customer && (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Customer</div>
                    <div className="font-bold text-gray-900">{customerLedger.customer.name}</div>
                    <div className="text-xs text-gray-600">{customerLedger.customer.mobile}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Total Purchases</div>
                    <div className="text-xl font-bold text-emerald-600">{formatINR(customerLedger.customer.totalPurchases)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Outstanding Balance</div>
                    <div className={`text-xl font-bold ${customerLedger.outstanding > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatINR(customerLedger.outstanding)}</div>
                  </div>
                </div>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600">
                      <th className="text-left px-4 py-3">Date</th>
                      <th className="text-left px-4 py-3">Ref</th>
                      <th className="text-left px-4 py-3">Description</th>
                      <th className="text-right px-4 py-3">Debit</th>
                      <th className="text-right px-4 py-3">Credit</th>
                      <th className="text-right px-4 py-3">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerLedger.entries.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-8 text-gray-400">No transactions</td></tr>
                    ) : customerLedger.entries.map((e, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="px-4 py-3 text-gray-600">{formatDate(e.date)}</td>
                        <td className="px-4 py-3 font-medium">{e.ref}</td>
                        <td className="px-4 py-3">{e.desc}</td>
                        <td className="px-4 py-3 text-right text-red-600">{formatINR(e.debit)}</td>
                        <td className="px-4 py-3 text-right text-emerald-600">{formatINR(e.credit)}</td>
                        <td className="px-4 py-3 text-right font-semibold">{formatINR(e.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SumCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-lg font-bold mt-1 ${color}`}>{value}</div>
    </div>
  );
}
