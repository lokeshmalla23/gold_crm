import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FileText, Download, Printer, TrendingUp, Package, Users, UserCog, Receipt, ShoppingCart, Wrench, Truck } from 'lucide-react';
import { monthlySales, categorySales, dailySales, invoices, staff, customers, inventory, repairs, purchaseOrders, suppliers, formatINR, formatDate, gstrData } from '../data/mockData';

const REPORTS = [
  { key: 'daily', label: 'Daily Sales', icon: TrendingUp },
  { key: 'monthly', label: 'Monthly Sales', icon: TrendingUp },
  { key: 'gst', label: 'GST Report', icon: FileText },
  { key: 'gstr1', label: 'GSTR-1 Report', icon: Receipt },
  { key: 'gstr3b', label: 'GSTR-3B Summary', icon: Receipt },
  { key: 'pnl', label: 'Profit & Loss', icon: TrendingUp },
  { key: 'stock', label: 'Stock Report', icon: Package },
  { key: 'customer', label: 'Customer Report', icon: Users },
  { key: 'staff', label: 'Staff Performance', icon: UserCog },
  { key: 'deadstock', label: 'Dead Stock', icon: Package },
  { key: 'purchase', label: 'Purchase Report', icon: ShoppingCart },
  { key: 'repair_report', label: 'Repair Report', icon: Wrench },
  { key: 'outstanding', label: 'Customer Outstanding', icon: Users },
  { key: 'supplier_ledger', label: 'Supplier Ledger', icon: Truck },
];

export default function Reports() {
  const [active, setActive] = useState('monthly');
  const [from, setFrom] = useState('2026-01-01');
  const [to, setTo] = useState('2026-12-31');
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id);

  const deadstockItems = inventory.filter((i) => i.qty > 0).map((i) => ({ ...i, daysSince: 90 + (i.id * 7) % 60 })).filter((i) => i.daysSince >= 90);
  const outstandingCustomers = customers.filter((c) => c.totalPurchases > 300000).map((c) => {
    const paid = Math.round(c.totalPurchases * 0.85);
    return { ...c, paid, outstanding: c.totalPurchases - paid };
  }).filter((c) => c.outstanding > 0);
  const supplierPOs = purchaseOrders.filter((p) => p.supplierId === Number(supplierId));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <aside className="bg-white rounded-xl border border-gray-200 p-3 h-fit">
        <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Report Types</div>
        <nav className="space-y-1">
          {REPORTS.map((r) => {
            const Icon = r.icon;
            return (
              <button key={r.key} onClick={() => setActive(r.key)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${active === r.key ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon className="w-4 h-4" />{r.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-gray-900">{REPORTS.find((r) => r.key === active)?.label}</h3>
            <p className="text-xs text-gray-500">Detailed insights and analytics</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            <span className="text-gray-400">to</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            <button className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm"><Download className="w-4 h-4" />PDF</button>
            <button className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm"><Download className="w-4 h-4" />Excel</button>
            <button className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm"><Printer className="w-4 h-4" />Print</button>
          </div>
        </div>

        {active === 'daily' && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-semibold mb-4">Daily Sales — Last 7 Days</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v/1000}K`} />
                <Tooltip formatter={(v) => formatINR(v)} />
                <Line type="monotone" dataKey="sales" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {active === 'monthly' && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="font-semibold mb-4">Monthly Sales vs Profit</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v/100000}L`} />
                  <Tooltip formatter={(v) => formatINR(v)} />
                  <Legend />
                  <Bar dataKey="sales" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100"><Th>Month</Th><Th>Sales</Th><Th>Profit</Th><Th>Margin</Th></tr></thead>
                <tbody>
                  {monthlySales.map((m) => (
                    <tr key={m.month} className="border-b border-gray-50 last:border-0">
                      <Td>{m.month}</Td>
                      <Td>{formatINR(m.sales)}</Td>
                      <Td className="text-emerald-600 font-semibold">{formatINR(m.profit)}</Td>
                      <Td>{((m.profit / m.sales) * 100).toFixed(1)}%</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === 'gst' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h4 className="font-semibold">GST Collection Report</h4>
              <p className="text-xs text-gray-500 mt-1">GST @ 3% on gold sales</p>
            </div>
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-100"><Th>Invoice</Th><Th>Date</Th><Th>Customer</Th><Th>Taxable</Th><Th>GST</Th><Th>Total</Th></tr></thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-b border-gray-50 last:border-0">
                    <Td>{i.id}</Td>
                    <Td>{formatDate(i.date)}</Td>
                    <Td>{i.customerName}</Td>
                    <Td>{formatINR(i.subtotal)}</Td>
                    <Td className="text-amber-600 font-semibold">{formatINR(i.gst)}</Td>
                    <Td>{formatINR(i.totalAmount)}</Td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold"><Td colSpan={4}>Total GST Collected</Td><Td className="text-amber-600">{formatINR(invoices.reduce((s, i) => s + i.gst, 0))}</Td><Td>{formatINR(invoices.reduce((s, i) => s + i.totalAmount, 0))}</Td></tr>
              </tfoot>
            </table>
          </div>
        )}

        {active === 'gstr1' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Invoices', value: gstrData.gstr1.length, color: 'bg-blue-50 text-blue-700' },
                { label: 'B2B Invoices', value: gstrData.gstr1.filter(i => i.type === 'B2B').length, color: 'bg-purple-50 text-purple-700' },
                { label: 'B2C Invoices', value: gstrData.gstr1.filter(i => i.type === 'B2C').length, color: 'bg-amber-50 text-amber-700' },
                { label: 'Total GST', value: formatINR(gstrData.summary.totalGST), color: 'bg-emerald-50 text-emerald-700' },
              ].map((c, i) => (
                <div key={i} className={`rounded-xl p-4 ${c.color}`}>
                  <div className="text-xs font-medium opacity-70">{c.label}</div>
                  <div className="text-xl font-bold mt-1">{c.value}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">GSTR-1 — Outward Supplies</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Period: {gstrData.summary.period}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Ready to File</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 border-b border-gray-100">
                    <Th>Invoice No</Th><Th>Date</Th><Th>Customer</Th><Th>GSTIN</Th><Th>Type</Th><Th>Taxable Value</Th><Th>CGST</Th><Th>SGST</Th><Th>Total</Th>
                  </tr></thead>
                  <tbody>
                    {gstrData.gstr1.map((r) => (
                      <tr key={r.invoiceNo} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                        <Td><span className="font-mono text-xs">{r.invoiceNo}</span></Td>
                        <Td>{formatDate(r.date)}</Td>
                        <Td>{r.customer}</Td>
                        <Td><span className="font-mono text-xs text-gray-500">{r.gstin || '—'}</span></Td>
                        <Td><span className={`px-2 py-0.5 text-xs rounded-full font-medium ${r.type === 'B2B' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>{r.type}</span></Td>
                        <Td>{formatINR(r.taxableValue)}</Td>
                        <Td className="text-blue-600">{formatINR(r.cgst)}</Td>
                        <Td className="text-blue-600">{formatINR(r.sgst)}</Td>
                        <Td className="font-semibold">{formatINR(r.total)}</Td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold text-gray-900">
                      <Td colSpan={5}>Total</Td>
                      <Td>{formatINR(gstrData.gstr1.reduce((s, r) => s + r.taxableValue, 0))}</Td>
                      <Td className="text-blue-600">{formatINR(gstrData.gstr1.reduce((s, r) => s + r.cgst, 0))}</Td>
                      <Td className="text-blue-600">{formatINR(gstrData.gstr1.reduce((s, r) => s + r.sgst, 0))}</Td>
                      <Td>{formatINR(gstrData.gstr1.reduce((s, r) => s + r.total, 0))}</Td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        )}

        {active === 'gstr3b' && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="font-semibold text-lg">GSTR-3B Summary</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Period: {gstrData.summary.period}</p>
                </div>
                <span className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Pending Filing</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border border-gray-200 rounded-xl p-4">
                  <h5 className="text-xs font-semibold text-gray-500 uppercase mb-3">3.1 — Outward Taxable Supplies</h5>
                  <div className="space-y-2">
                    {[
                      { label: 'B2B Supplies', value: gstrData.summary.totalB2B },
                      { label: 'B2C Supplies', value: gstrData.summary.totalB2C },
                      { label: 'Total Taxable Value', value: gstrData.summary.totalB2B + gstrData.summary.totalB2C },
                    ].map((row, i) => (
                      <div key={i} className={`flex justify-between py-2 ${i === 2 ? 'border-t border-gray-200 font-semibold' : 'border-b border-gray-50'}`}>
                        <span className="text-sm text-gray-600">{row.label}</span>
                        <span className="text-sm font-medium">{formatINR(row.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <h5 className="text-xs font-semibold text-gray-500 uppercase mb-3">4 — Eligible ITC</h5>
                  <div className="space-y-2">
                    {[
                      { label: 'ITC on Capital Goods', value: 45000 },
                      { label: 'ITC on Inputs', value: 128500 },
                      { label: 'Total ITC Available', value: 173500 },
                    ].map((row, i) => (
                      <div key={i} className={`flex justify-between py-2 ${i === 2 ? 'border-t border-gray-200 font-semibold' : 'border-b border-gray-50'}`}>
                        <span className="text-sm text-gray-600">{row.label}</span>
                        <span className="text-sm font-medium">{formatINR(row.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 border border-amber-200 bg-amber-50 rounded-xl p-4">
                  <h5 className="text-xs font-semibold text-amber-800 uppercase mb-3">5 — Net Tax Liability</h5>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'CGST Payable', value: gstrData.summary.totalCGST },
                      { label: 'SGST Payable', value: gstrData.summary.totalSGST },
                      { label: 'Total Tax Payable', value: gstrData.summary.totalGST },
                    ].map((item, i) => (
                      <div key={i} className={`text-center p-3 rounded-lg ${i === 2 ? 'bg-amber-200' : 'bg-white'}`}>
                        <div className="text-xs text-amber-700 font-medium">{item.label}</div>
                        <div className="text-xl font-bold text-amber-900 mt-1">{formatINR(item.value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold">File GSTR-3B</button>
                <button className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-medium flex items-center gap-2"><Download className="w-4 h-4" />Download JSON</button>
                <button className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-medium flex items-center gap-2"><Printer className="w-4 h-4" />Print Summary</button>
              </div>
            </div>
          </>
        )}

        {active === 'pnl' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PLCard label="Total Revenue" value={formatINR(monthlySales.reduce((s, m) => s + m.sales, 0))} color="blue" />
            <PLCard label="Cost of Goods" value={formatINR(monthlySales.reduce((s, m) => s + (m.sales - m.profit), 0))} color="red" />
            <PLCard label="Net Profit" value={formatINR(monthlySales.reduce((s, m) => s + m.profit, 0))} color="green" />
            <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="font-semibold mb-4">Profit Trend</h4>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v/100000}L`} />
                  <Tooltip formatter={(v) => formatINR(v)} />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {active === 'stock' && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-semibold mb-4">Stock Distribution by Category</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categorySales} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {categorySales.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {active === 'customer' && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-semibold mb-4">Top Customers by Purchase Value</h4>
            <div className="space-y-2">
              {invoices.slice(0, 8).map((inv, i) => (
                <div key={inv.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">{i + 1}</div>
                  <div className="flex-1">{inv.customerName}</div>
                  <div className="font-semibold text-gray-900">{formatINR(inv.totalAmount)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'deadstock' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Dead Stock — No Sales in 90+ Days</h4>
                <p className="text-xs text-gray-500 mt-0.5">{deadstockItems.length} items · Total Value: <span className="font-semibold text-red-600">{formatINR(deadstockItems.reduce((s, i) => s + i.sellingPrice * i.qty, 0))}</span></p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100"><Th>Code</Th><Th>Name</Th><Th>Category</Th><Th>Qty</Th><Th>Weight</Th><Th>Value</Th><Th>Days Since Last Sale</Th></tr></thead>
                <tbody>
                  {deadstockItems.map((i) => (
                    <tr key={i.id} className="border-b border-gray-50 last:border-0">
                      <Td className="font-mono text-xs">{i.itemCode}</Td>
                      <Td>{i.name}</Td>
                      <Td>{i.category}</Td>
                      <Td>{i.qty}</Td>
                      <Td>{i.weight}g</Td>
                      <Td className="font-semibold">{formatINR(i.sellingPrice * i.qty)}</Td>
                      <Td className="text-red-600 font-semibold">{i.daysSince} days</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === 'purchase' && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <PLCard label="Total Purchased" value={formatINR(purchaseOrders.reduce((s, p) => s + p.total, 0))} color="blue" />
              <PLCard label="Total Paid" value={formatINR(purchaseOrders.reduce((s, p) => s + p.paidAmount, 0))} color="green" />
              <PLCard label="Outstanding" value={formatINR(purchaseOrders.reduce((s, p) => s + p.balance, 0))} color="red" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100"><Th>PO #</Th><Th>Date</Th><Th>Supplier</Th><Th>Items</Th><Th>Total</Th><Th>Paid</Th><Th>Balance</Th><Th>Status</Th></tr></thead>
                <tbody>
                  {purchaseOrders.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0">
                      <Td className="font-mono text-xs">{p.id}</Td>
                      <Td>{formatDate(p.date)}</Td>
                      <Td>{p.supplierName}</Td>
                      <Td>{p.items.length}</Td>
                      <Td className="font-semibold">{formatINR(p.total)}</Td>
                      <Td className="text-emerald-600">{formatINR(p.paidAmount)}</Td>
                      <Td className="text-red-600">{formatINR(p.balance)}</Td>
                      <Td>{p.status}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === 'repair_report' && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <PLCard label="Total Repair Revenue" value={formatINR(repairs.reduce((s, r) => s + (r.finalCost || 0), 0))} color="blue" />
              <PLCard label="Avg Repair Cost" value={formatINR(Math.round(repairs.filter((r) => r.finalCost).reduce((s, r) => s + r.finalCost, 0) / Math.max(1, repairs.filter((r) => r.finalCost).length)))} color="green" />
              <PLCard label="Pending Collections" value={formatINR(repairs.filter((r) => r.status !== 'Delivered').reduce((s, r) => s + (r.estimatedCost - r.advancePaid), 0))} color="red" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100"><Th>Job #</Th><Th>Customer</Th><Th>Category</Th><Th>Received</Th><Th>Est. Cost</Th><Th>Final Cost</Th><Th>Status</Th></tr></thead>
                <tbody>
                  {repairs.map((r) => (
                    <tr key={r.id} className="border-b border-gray-50 last:border-0">
                      <Td className="font-mono text-xs">{r.id}</Td>
                      <Td>{r.customerName}</Td>
                      <Td>{r.category}</Td>
                      <Td>{formatDate(r.receivedDate)}</Td>
                      <Td>{formatINR(r.estimatedCost)}</Td>
                      <Td className="text-emerald-600 font-semibold">{r.finalCost ? formatINR(r.finalCost) : '—'}</Td>
                      <Td>{r.status}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === 'outstanding' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold">Customer Outstanding</h4>
              <p className="text-xs text-gray-500 mt-0.5">{outstandingCustomers.length} customers with pending balances</p>
            </div>
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-100"><Th>Customer</Th><Th>Total Purchases</Th><Th>Total Paid</Th><Th>Outstanding</Th></tr></thead>
              <tbody>
                {outstandingCustomers.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 last:border-0">
                    <Td className="font-medium">{c.name}</Td>
                    <Td>{formatINR(c.totalPurchases)}</Td>
                    <Td className="text-emerald-600">{formatINR(c.paid)}</Td>
                    <Td className="text-red-600 font-semibold">{formatINR(c.outstanding)}</Td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold"><Td colSpan="3">Total Outstanding</Td><Td className="text-red-600">{formatINR(outstandingCustomers.reduce((s, c) => s + c.outstanding, 0))}</Td></tr>
              </tfoot>
            </table>
          </div>
        )}

        {active === 'supplier_ledger' && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">Select Supplier</label>
              <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h4 className="font-semibold">Ledger — {suppliers.find((s) => s.id === Number(supplierId))?.name}</h4>
                <div className="text-sm">Balance: <span className="font-bold text-red-600">{formatINR(supplierPOs.reduce((s, p) => s + p.balance, 0))}</span></div>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100"><Th>Date</Th><Th>PO #</Th><Th>Debit (PO Total)</Th><Th>Credit (Paid)</Th><Th>Balance</Th><Th>Status</Th></tr></thead>
                <tbody>
                  {(() => {
                    let running = 0;
                    return supplierPOs.map((p) => {
                      running += p.total - p.paidAmount;
                      return (
                        <tr key={p.id} className="border-b border-gray-50 last:border-0">
                          <Td>{formatDate(p.date)}</Td>
                          <Td className="font-mono text-xs">{p.id}</Td>
                          <Td className="text-red-600">{formatINR(p.total)}</Td>
                          <Td className="text-emerald-600">{formatINR(p.paidAmount)}</Td>
                          <Td className="font-semibold">{formatINR(running)}</Td>
                          <Td>{p.paymentStatus}</Td>
                        </tr>
                      );
                    });
                  })()}
                  {supplierPOs.length === 0 && <tr><Td colSpan="6" className="text-center text-gray-500 py-6">No purchase orders for this supplier</Td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {active === 'staff' && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h4 className="font-semibold mb-4">Staff Performance</h4>
            <div className="space-y-3">
              {staff.slice(0, 6).map((s, i) => {
                const sales = (i + 1) * 350000;
                return (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full text-white font-semibold flex items-center justify-center" style={{ background: s.image }}>{s.name[0]}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.role}</div>
                    </div>
                    <div className="w-40 h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (sales/2100000)*100)}%` }}></div></div>
                    <div className="w-32 text-right font-semibold text-gray-900">{formatINR(sales)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Th = ({ children }) => <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">{children}</th>;
const Td = ({ children, className = '', colSpan }) => <td className={`px-4 py-3 text-gray-700 ${className}`} colSpan={colSpan}>{children}</td>;

function PLCard({ label, value, color }) {
  const colors = { blue: 'from-blue-500 to-blue-600', red: 'from-red-500 to-red-600', green: 'from-emerald-500 to-emerald-600' };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white rounded-xl p-5`}>
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}
