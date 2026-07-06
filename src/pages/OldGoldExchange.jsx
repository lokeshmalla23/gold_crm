import { useState } from 'react';
import { Plus, ArrowLeftRight, Coins, Receipt } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { oldGoldExchanges as initial, customers, formatINR, formatDate } from '../data/mockData';
import * as cls from '../styles/classes';
import NumberInput from '../components/ui/NumberInput';

export default function OldGoldExchange() {
  const [list, setList] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [form, setForm] = useState({ customerId: '', weight: '', purity: '22K', goldRate: 6250, testingCharges: 500, deductionPercent: 3 });

  const totalWeight = list.reduce((s, r) => s + r.weight, 0);
  const totalValue = list.reduce((s, r) => s + r.exchangeValue, 0);
  const pending = list.filter((r) => r.status === 'Pending').length;

  const calcExchange = () => {
    const weight = Number(form.weight) || 0;
    const netWeight = weight * (1 - Number(form.deductionPercent) / 100);
    return Math.round(netWeight * Number(form.goldRate) - Number(form.testingCharges));
  };

  const handleAdd = () => {
    if (!form.customerId || !form.weight) return;
    const cust = customers.find((c) => c.id === Number(form.customerId));
    const newRec = {
      id: 'OG-' + Math.floor(Math.random() * 900 + 100),
      customerId: cust.id,
      customerName: cust.name,
      date: new Date().toISOString().split('T')[0],
      weight: Number(form.weight),
      purity: form.purity,
      goldRate: Number(form.goldRate),
      testingCharges: Number(form.testingCharges),
      deductionPercent: Number(form.deductionPercent),
      exchangeValue: calcExchange(),
      status: 'Completed'
    };
    setList((l) => [newRec, ...l]);
    setReceipt(newRec);
    setForm({ customerId: '', weight: '', purity: '22K', goldRate: 6250, testingCharges: 500, deductionPercent: 3 });
    setShowModal(false);
  };

  const columns = [
    { key: 'id', title: 'Receipt #' },
    { key: 'customerName', title: 'Customer', render: (r) => <span className="font-medium text-gray-900">{r.customerName}</span> },
    { key: 'date', title: 'Date', render: (r) => formatDate(r.date) },
    { key: 'weight', title: 'Weight', render: (r) => `${r.weight}g` },
    { key: 'purity', title: 'Purity' },
    { key: 'goldRate', title: 'Rate', render: (r) => `₹${r.goldRate}/g` },
    { key: 'testingCharges', title: 'Testing', render: (r) => formatINR(r.testingCharges) },
    { key: 'exchangeValue', title: 'Exchange Value', render: (r) => <span className="font-semibold text-amber-600">{formatINR(r.exchangeValue)}</span> },
    { key: 'status', title: 'Status', render: (r) => <Badge variant={r.status === 'Completed' ? 'green' : 'yellow'}>{r.status}</Badge> },
    { key: 'actions', title: '', render: (r) => <button onClick={() => setReceipt(r)} className="text-amber-600 hover:text-amber-700 text-xs font-medium">View</button> }
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Exchanges" value={list.length} icon={ArrowLeftRight} iconBg="bg-amber-100" iconColor="text-amber-600" />
        <StatCard label="Total Weight" value={`${totalWeight.toFixed(1)}g`} icon={Coins} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="Total Value" value={formatINR(totalValue)} icon={Receipt} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard label="Pending" value={pending} icon={ArrowLeftRight} iconBg="bg-yellow-100" iconColor="text-yellow-600" />
      </div>

      <div className={cls.card}>
        <div className={cls.cardHeader}>
          <h3 className="font-semibold text-gray-900">Exchange Records</h3>
          <button onClick={() => setShowModal(true)} className={`${cls.btnPrimary} text-sm flex items-center gap-2`}><Plus className="w-4 h-4" />New Exchange</button>
        </div>
        <DataTable columns={columns} data={list} pageSize={10} />
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Old Gold Exchange" size="lg"
        footer={<>
          <button onClick={() => setShowModal(false)} className={cls.btnSecondary}>Cancel</button>
          <button onClick={handleAdd} className={cls.btnPrimary}>Create Receipt</button>
        </>}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={cls.fieldLabel}>Customer *</label>
            <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} className={cls.input}>
              <option value="">Select customer</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.mobile}</option>)}
            </select>
          </div>
          <F label="Weight (g) *" type="number" value={form.weight} onChange={(v) => setForm({ ...form, weight: v })} />
          <div>
            <label className={cls.fieldLabel}>Purity</label>
            <select value={form.purity} onChange={(e) => setForm({ ...form, purity: e.target.value })} className={cls.input}>
              {['22K', '24K', '18K'].map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <F label="Gold Rate (₹/g)" type="number" value={form.goldRate} onChange={(v) => setForm({ ...form, goldRate: v })} />
          <F label="Testing Charges" type="number" value={form.testingCharges} onChange={(v) => setForm({ ...form, testingCharges: v })} />
          <F label="Deduction %" type="number" value={form.deductionPercent} onChange={(v) => setForm({ ...form, deductionPercent: v })} />
        </div>
        <div className={`mt-4 ${cls.panel.amber}`}>
          <div className="text-xs text-amber-800">Calculated Exchange Value</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{formatINR(calcExchange())}</div>
        </div>
      </Modal>

      <Modal open={!!receipt} onClose={() => setReceipt(null)} title="Exchange Receipt" size="md">
        {receipt && (
          <div>
            <div className="border-2 border-dashed border-amber-200 rounded-lg p-5">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white font-bold">GC</div>
                <div className="mt-2 font-bold text-gray-900">Golden Palace Jewellers</div>
                <div className="text-xs text-gray-500">Old Gold Exchange Receipt</div>
              </div>
              <div className="border-t border-b border-gray-200 py-3 my-3 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Receipt #</span><span className="font-medium">{receipt.id}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Date</span><span>{formatDate(receipt.date)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Customer</span><span className="font-medium">{receipt.customerName}</span></div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Weight</span><span>{receipt.weight}g</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Purity</span><span>{receipt.purity}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Gold Rate</span><span>₹{receipt.goldRate}/g</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Deduction</span><span>{receipt.deductionPercent}%</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Testing</span><span>-{formatINR(receipt.testingCharges)}</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <span className="font-semibold">Exchange Value</span>
                <span className="font-bold text-amber-600 text-xl">{formatINR(receipt.exchangeValue)}</span>
              </div>
            </div>
            <button className={`mt-4 w-full ${cls.btnPrimaryFull}`}>Print / Download</button>
          </div>
        )}
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
