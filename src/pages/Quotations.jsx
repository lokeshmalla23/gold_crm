import { useMemo, useRef, useState } from 'react';
import { FileText, Plus, Search, Eye, Trash2, MessageCircle, Printer, ArrowRight, Check, Edit, ChevronDown, ChevronUp, Gem, Barcode, X, ScanLine, Lock, Unlock } from 'lucide-react';
import { quotations as initialQuotations, customers, inventory, GOLD_RATE, formatINR, formatDate } from '../data/mockData';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import * as cls from '../styles/classes';
import NumberInput from '../components/ui/NumberInput';

function StatusBadge({ status }) {
  const map = { Draft: 'gray', Sent: 'blue', Approved: 'green', Converted: 'yellow', Expired: 'red' };
  return <Badge variant={map[status] || 'gray'}>{status}</Badge>;
}

const STONE_TYPES = ['None', 'Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Coral', 'CZ', 'Polki', 'Other'];

// Map gold type from inventory to rate multiplier
const PURITY_RATE = { '24K': 1.0909, '22K': 1, '18K': 0.8182, '14K': 0.6364 };

const emptyItem = () => ({
  name: '',
  qty: 1,
  purity: '22K',
  grossWeight: 0,
  stoneWeight: 0,
  stoneType: 'None',
  stoneCharges: 0,
  wastage: 3,
  goldRate: GOLD_RATE,
  makingCharges: 0,
  fromInventory: false,
});

// Core calculation for one item
function calcItem(it) {
  const qty = Number(it.qty) || 1;
  const gross = Number(it.grossWeight) || 0;
  const stone = Number(it.stoneWeight) || 0;
  const net = Math.max(0, gross - stone);
  const wastageW = parseFloat((net * (Number(it.wastage) || 0) / 100).toFixed(3));
  const billable = parseFloat((net + wastageW).toFixed(3));
  const goldValue = parseFloat((billable * (Number(it.goldRate) || 0)).toFixed(2));
  const making = Number(it.makingCharges) || 0;
  const stoneCh = Number(it.stoneCharges) || 0;
  const itemTotal = parseFloat(((goldValue + making + stoneCh) * qty).toFixed(2));
  return { net, wastageW, billable, goldValue, itemTotal };
}

export default function Quotations() {
  const [list, setList] = useState(initialQuotations);
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [viewQuote, setViewQuote] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState('');
  const [errors, setErrors] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [barcodeInputs, setBarcodeInputs] = useState({});   // { itemIdx: string }
  const [barcodeErrors, setBarcodeErrors] = useState({});   // { itemIdx: string }
  const barcodeRefs = useRef({});

  const emptyForm = { customerId: '', validity: 14, items: [emptyItem()], discount: 0, notes: '' };
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return list.filter((r) => !q || r.customerName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
  }, [list, search]);

  const stats = {
    total: list.length,
    pending: list.filter((q) => ['Sent', 'Draft', 'Approved'].includes(q.status)).reduce((s, q) => s + q.total, 0),
    converted: list.filter((q) => q.status === 'Converted').length,
    expired: list.filter((q) => q.status === 'Expired').length,
  };

  const updateItem = (idx, field, val) => {
    setForm((f) => ({
      ...f,
      items: f.items.map((it, i) => i === idx ? { ...it, [field]: field === 'name' || field === 'stoneType' || field === 'purity' ? val : val } : it),
    }));
  };

  const addItemRow = () => setForm((f) => ({ ...f, items: [...f.items, emptyItem()] }));
  const removeItemRow = (idx) => setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
  const toggleExpand = (idx) => setExpandedItems((e) => ({ ...e, [idx]: !e[idx] }));
  const overrideItem = (idx) => setForm((f) => ({ ...f, items: f.items.map((it, i) => i === idx ? { ...it, fromInventory: false } : it) }));

  const handleBarcodeSearch = (idx) => {
    const code = (barcodeInputs[idx] || '').trim();
    if (!code) return;
    const found = inventory.find(
      (inv) => inv.barcode === code || inv.itemCode.toLowerCase() === code.toLowerCase()
    );
    if (!found) {
      setBarcodeErrors((e) => ({ ...e, [idx]: `No item found for "${code}"` }));
      return;
    }
    setBarcodeErrors((e) => ({ ...e, [idx]: '' }));
    setBarcodeInputs((b) => ({ ...b, [idx]: '' }));
    const rate = Math.round(GOLD_RATE * (PURITY_RATE[found.goldType] || 1));
    setForm((f) => ({
      ...f,
      items: f.items.map((it, i) =>
        i !== idx ? it : {
          ...it,
          name: found.name,
          purity: found.goldType || '22K',
          grossWeight: found.weight,
          stoneWeight: found.stoneWeight || 0,
          stoneType: found.stoneType || 'None',
          stoneCharges: found.stoneCharges || 0,
          wastage: found.wastage || 3,
          goldRate: rate,
          makingCharges: found.makingCharges || 0,
          fromInventory: true,
        }
      ),
    }));
    setExpandedItems((e) => ({ ...e, [idx]: true }));
  };

  // Summary totals
  const formTotals = useMemo(() => {
    const items = form.items.map((it) => ({ ...it, ...calcItem(it) }));
    const subtotal = items.reduce((s, it) => s + it.itemTotal, 0);
    const totalGoldValue = items.reduce((s, it) => s + it.goldValue * (Number(it.qty) || 1), 0);
    const totalMaking = items.reduce((s, it) => s + it.makingCharges * (Number(it.qty) || 1), 0);
    const totalStone = items.reduce((s, it) => s + it.stoneCharges * (Number(it.qty) || 1), 0);
    const totalWastageW = items.reduce((s, it) => s + it.wastageW * (Number(it.qty) || 1), 0);
    const discount = Number(form.discount) || 0;
    const gst = Math.round((subtotal - discount) * 0.03);
    const grand = subtotal - discount + gst;
    return { items, subtotal, totalGoldValue, totalMaking, totalStone, totalWastageW, discount, gst, grand };
  }, [form]);

  const newId = 'QT-' + String(list.length + 1).padStart(3, '0');

  const handleSubmit = () => {
    const errs = {};
    if (!form.customerId) errs.customerId = true;
    if (!form.items.length || form.items.some((it) => !it.name || !it.grossWeight)) errs.items = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const customer = customers.find((c) => c.id === Number(form.customerId));
    const today = new Date();
    const valid = new Date(today.getTime() + form.validity * 86400000);

    const newQuote = {
      id: newId,
      customerId: customer.id,
      customerName: customer.name,
      mobile: customer.mobile,
      date: today.toISOString().split('T')[0],
      validUntil: valid.toISOString().split('T')[0],
      items: formTotals.items.map((it) => ({
        name: it.name,
        qty: Number(it.qty) || 1,
        purity: it.purity,
        grossWeight: Number(it.grossWeight),
        stoneWeight: Number(it.stoneWeight),
        stoneType: it.stoneType,
        stoneCharges: Number(it.stoneCharges),
        wastage: Number(it.wastage),
        goldRate: Number(it.goldRate),
        makingCharges: Number(it.makingCharges),
        net: it.net,
        wastageW: it.wastageW,
        billable: it.billable,
        goldValue: it.goldValue,
        total: it.itemTotal,
      })),
      subtotal: formTotals.subtotal,
      discount: formTotals.discount,
      gst: formTotals.gst,
      total: formTotals.grand,
      status: 'Draft',
      notes: form.notes,
    };
    setList((l) => [newQuote, ...l]);
    setForm(emptyForm);
    setExpandedItems({});
    setErrors({});
    setShowNew(false);
    showToast('Quotation created successfully');
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const convertToInvoice = (id) => {
    setList((l) => l.map((q) => q.id === id ? { ...q, status: 'Converted' } : q));
    setViewQuote(null);
    showToast('Converted to invoice successfully!');
  };

  const handleDelete = () => {
    setList((l) => l.filter((q) => q.id !== confirmDelete));
    setConfirmDelete(null);
    showToast('Quotation deleted');
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in">
          <Check className="w-5 h-5" />{toast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Quotes" value={stats.total} icon={FileText} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <StatCard label="Pending Value" value={formatINR(stats.pending)} icon={FileText} iconBg="bg-amber-100" iconColor="text-amber-600" />
        <StatCard label="Converted" value={stats.converted} icon={Check} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <StatCard label="Expired" value={stats.expired} icon={FileText} iconBg="bg-red-100" iconColor="text-red-600" />
      </div>

      {/* Table */}
      <div className={cls.card}>
        <div className={`${cls.cardHeader} flex-col md:flex-row gap-3`}>
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search quotations..." className={cls.inputIcon} />
          </div>
          <button onClick={() => { setShowNew(true); setForm(emptyForm); setExpandedItems({}); }} className={`${cls.btnPrimary} flex items-center gap-2`}>
            <Plus className="w-4 h-4" />New Quotation
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={cls.tableHeader}>
                <th className="text-left px-4 py-3">Quote #</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Valid Until</th>
                <th className="text-right px-4 py-3">Items</th>
                <th className="text-right px-4 py-3">Total Weight</th>
                <th className="text-right px-4 py-3">Total</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-10 text-gray-400">No quotations found</td></tr>
              ) : filtered.map((q) => {
                const totalGross = q.items.reduce((s, it) => s + (it.grossWeight || 0) * (it.qty || 1), 0);
                return (
                  <tr key={q.id} className={cls.tableRow}>
                    <td className={`${cls.tableCell} font-semibold text-amber-700`}>{q.id}</td>
                    <td className={cls.tableCell}>
                      <div className="font-medium text-gray-900">{q.customerName}</div>
                      <div className={cls.mutedText}>{q.mobile}</div>
                    </td>
                    <td className={`${cls.tableCell} text-gray-600`}>{formatDate(q.date)}</td>
                    <td className={`${cls.tableCell} text-gray-600`}>{formatDate(q.validUntil)}</td>
                    <td className={`${cls.tableCell} text-right`}>{q.items.length}</td>
                    <td className={`${cls.tableCell} text-right font-medium`}>{totalGross.toFixed(2)}g</td>
                    <td className={`${cls.tableCell} text-right font-semibold text-gray-900`}>{formatINR(q.total)}</td>
                    <td className={cls.tableCell}><StatusBadge status={q.status} /></td>
                    <td className={cls.tableCell}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewQuote(q)} title="View" className="p-1.5 rounded hover:bg-amber-50 text-amber-600"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => setConfirmDelete(q.id)} title="Delete" className={cls.btnDangerGhost}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── NEW QUOTATION MODAL ── */}
      <Modal open={showNew} onClose={() => { setShowNew(false); setErrors({}); }} title="New Quotation" size="xl"
        footer={<>
          <button onClick={() => { setShowNew(false); setErrors({}); }} className={cls.btnSecondary}>Cancel</button>
          <button onClick={handleSubmit} className={cls.btnPrimary}>Create Quotation</button>
        </>}>
        <div className="space-y-5">
          {/* Header */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={cls.fieldLabel}>Customer *</label>
              <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border text-sm outline-none focus:border-amber-400 ${errors.customerId ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                <option value="">Select customer...</option>
                {customers.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.mobile}</option>)}
              </select>
              {errors.customerId && <p className="text-xs text-red-500 mt-1">Customer is required</p>}
            </div>
            <div>
              <label className={cls.fieldLabel}>Validity (days)</label>
              <NumberInput value={form.validity} onChange={(v) => setForm({ ...form, validity: Number(v) })}
                className={cls.input} />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-800">
                Items
                {errors.items && <span className="text-red-500 ml-2 font-normal text-xs">All fields required</span>}
              </span>
              <button onClick={addItemRow} className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />Add Item
              </button>
            </div>

            <div className="space-y-3">
              {form.items.map((it, i) => {
                const calc = calcItem(it);
                const expanded = expandedItems[i];
                return (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Item header row */}
                    <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      {it.fromInventory ? (
                        <div className="flex-1 px-3 py-1.5 border border-emerald-300 bg-emerald-50 rounded-lg text-sm font-medium text-gray-800 flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          {it.name}
                          <span className="ml-auto text-[11px] bg-emerald-100 text-emerald-700 border border-emerald-300 px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">From Inventory ✓</span>
                        </div>
                      ) : (
                        <input value={it.name} onChange={(e) => updateItem(i, 'name', e.target.value)}
                          placeholder="Item name (e.g. Bridal Necklace 22K)" className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" />
                      )}
                      {it.fromInventory ? (
                        <span className="px-2 py-1.5 bg-emerald-50 border border-emerald-300 rounded-lg text-sm text-emerald-700 font-semibold w-24 text-center">{it.purity}</span>
                      ) : (
                        <select value={it.purity} onChange={(e) => updateItem(i, 'purity', e.target.value)}
                          className={`${cls.inputSm} w-24`}>
                          <option>22K</option><option>24K</option><option>18K</option><option>14K</option>
                        </select>
                      )}
                      <NumberInput value={it.qty} onChange={(v) => updateItem(i, 'qty', v)}
                        className={`${cls.inputSm} w-16 text-center`} title="Qty" />
                      <span className="text-sm font-semibold text-amber-700 w-28 text-right">{formatINR(calc.itemTotal)}</span>
                      {it.fromInventory && (
                        <button onClick={() => overrideItem(i)} title="Edit / Override fetched values" className="p-1 rounded hover:bg-orange-50 text-orange-400" >
                          <Unlock className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => toggleExpand(i)} className={cls.btnGhost}>
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {form.items.length > 1 && (
                        <button onClick={() => removeItemRow(i)} className={cls.btnDangerGhost}><Trash2 className="w-4 h-4" /></button>
                      )}
                    </div>

                    {/* Barcode lookup row */}
                    <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex items-center gap-2">
                      <ScanLine className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-xs font-medium text-blue-700 whitespace-nowrap">Scan / Enter Barcode:</span>
                      <input
                        ref={(el) => { barcodeRefs.current[i] = el; }}
                        value={barcodeInputs[i] || ''}
                        onChange={(e) => {
                          setBarcodeInputs((b) => ({ ...b, [i]: e.target.value }));
                          setBarcodeErrors((er) => ({ ...er, [i]: '' }));
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleBarcodeSearch(i)}
                        placeholder="Type barcode or item code and press Enter (e.g. GR-001 or 8901234567890)"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-blue-200 text-sm outline-none focus:border-blue-400 bg-white"
                      />
                      <button
                        onClick={() => handleBarcodeSearch(i)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <Barcode className="w-3.5 h-3.5" />Fetch
                      </button>
                      {barcodeErrors[i] && (
                        <span className="text-xs text-red-500 flex items-center gap-1 whitespace-nowrap">
                          <X className="w-3 h-3" />{barcodeErrors[i]}
                        </span>
                      )}
                    </div>

                    {/* Expanded detail fields */}
                    <div className={`px-4 pb-4 pt-3 ${expanded ? '' : 'hidden'}`}>
                      {it.fromInventory && (
                        <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700">
                          <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>All fields are auto-filled from inventory. Only <b>Qty</b> is editable.</span>
                          <button onClick={() => overrideItem(i)} className="ml-auto flex items-center gap-1 px-2 py-1 bg-white border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 font-medium">
                            <Unlock className="w-3 h-3" />Edit / Override
                          </button>
                        </div>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                        {/* Weight Details */}
                        <div className="md:col-span-4">
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>Weight Details
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Gross Weight (g) *</label>
                              {it.fromInventory ? (
                                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                  <Lock className="w-3 h-3 text-gray-400" />{it.grossWeight} g
                                </div>
                              ) : (
                                <NumberInput allowDecimal value={it.grossWeight} onChange={(v) => updateItem(i, 'grossWeight', v)}
                                  className={cls.input} />
                              )}
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Stone Weight (g)</label>
                              {it.fromInventory ? (
                                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                  <Lock className="w-3 h-3 text-gray-400" />{it.stoneWeight} g
                                </div>
                              ) : (
                                <NumberInput allowDecimal value={it.stoneWeight} onChange={(v) => updateItem(i, 'stoneWeight', v)}
                                  className={cls.input} />
                              )}
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Net Gold Weight (g)</label>
                              <div className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm font-semibold text-amber-800">
                                {calc.net.toFixed(3)} g
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Billable Weight (g)</label>
                              <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-semibold text-blue-800">
                                {calc.billable.toFixed(3)} g
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stone Details */}
                        <div className="md:col-span-4">
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>Stone Details
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Stone Type</label>
                              {it.fromInventory ? (
                                <div className={`px-3 py-2 border rounded-lg text-sm font-semibold flex items-center gap-1.5 ${it.stoneType !== 'None' ? 'bg-purple-50 border-purple-200 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                                  <Lock className="w-3 h-3 text-gray-400" />{it.stoneType}
                                </div>
                              ) : (
                                <select value={it.stoneType} onChange={(e) => updateItem(i, 'stoneType', e.target.value)}
                                  className={cls.input}>
                                  {STONE_TYPES.map((s) => <option key={s}>{s}</option>)}
                                </select>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Stone Charges (₹)</label>
                              {it.fromInventory ? (
                                <div className={`px-3 py-2 border rounded-lg text-sm font-semibold flex items-center gap-1.5 ${it.stoneCharges > 0 ? 'bg-purple-50 border-purple-200 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                                  <Lock className="w-3 h-3 text-gray-400" />{formatINR(it.stoneCharges || 0)}
                                </div>
                              ) : (
                                <NumberInput value={it.stoneCharges} onChange={(v) => updateItem(i, 'stoneCharges', v)}
                                  className={cls.input}
                                  placeholder="0" disabled={it.stoneType === 'None'} />
                              )}
                            </div>
                            <div className="flex items-end">
                              <div className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-sm w-full">
                                <span className="text-xs text-purple-600">Stone Value</span>
                                <div className="font-semibold text-purple-800">{formatINR(it.stoneCharges || 0)}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Wastage & Making */}
                        <div className="md:col-span-4">
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>Wastage & Making Charges
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Wastage %</label>
                              {it.fromInventory ? (
                                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                  <Lock className="w-3 h-3 text-gray-400" />{it.wastage}%
                                </div>
                              ) : (
                                <NumberInput allowDecimal value={it.wastage} onChange={(v) => updateItem(i, 'wastage', v)}
                                  className={cls.input} />
                              )}
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Wastage Weight (g)</label>
                              <div className="px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg text-sm font-semibold text-orange-800">
                                {calc.wastageW.toFixed(3)} g
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Gold Rate (₹/g)</label>
                              {it.fromInventory ? (
                                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                  <Lock className="w-3 h-3 text-gray-400" />₹{(it.goldRate || 0).toLocaleString('en-IN')}
                                </div>
                              ) : (
                                <NumberInput value={it.goldRate} onChange={(v) => updateItem(i, 'goldRate', v)}
                                  className={cls.input} />
                              )}
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Making Charges (₹)</label>
                              {it.fromInventory ? (
                                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                  <Lock className="w-3 h-3 text-gray-400" />{formatINR(it.makingCharges || 0)}
                                </div>
                              ) : (
                                <NumberInput value={it.makingCharges} onChange={(v) => updateItem(i, 'makingCharges', v)}
                                  className={cls.input} />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Per-item calculation summary */}
                        <div className="md:col-span-4">
                          <div className={`${cls.panel.amber} grid grid-cols-2 md:grid-cols-5 gap-3 text-xs`}>
                            <div className="text-center">
                              <div className="text-gray-500">Gold Value</div>
                              <div className="font-bold text-gray-800 text-sm mt-0.5">{formatINR(calc.goldValue)}</div>
                              <div className="text-gray-400">{calc.billable.toFixed(3)}g × ₹{it.goldRate}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-gray-500">Making</div>
                              <div className="font-bold text-gray-800 text-sm mt-0.5">{formatINR(it.makingCharges || 0)}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-gray-500">Stone</div>
                              <div className="font-bold text-purple-700 text-sm mt-0.5">{formatINR(it.stoneCharges || 0)}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-gray-500">Qty</div>
                              <div className="font-bold text-gray-800 text-sm mt-0.5">× {it.qty || 1}</div>
                            </div>
                            <div className="text-center bg-amber-200 rounded-lg p-2">
                              <div className="text-amber-700 font-semibold">Item Total</div>
                              <div className="font-bold text-amber-900 text-base mt-0.5">{formatINR(calc.itemTotal)}</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Collapsed quick-view */}
                    {!expanded && (
                      <div className="px-4 pb-3 grid grid-cols-3 md:grid-cols-6 gap-2 text-xs text-gray-500">
                        <span>Gross: <b className="text-gray-700">{it.grossWeight || 0}g</b></span>
                        <span>Net: <b className="text-gray-700">{calc.net.toFixed(3)}g</b></span>
                        <span>Wastage: <b className="text-gray-700">{it.wastage || 0}%</b></span>
                        <span>Billable: <b className="text-amber-700">{calc.billable.toFixed(3)}g</b></span>
                        <span>Making: <b className="text-gray-700">{formatINR(it.makingCharges || 0)}</b></span>
                        <span>Stone: <b className="text-purple-700">{it.stoneType !== 'None' ? it.stoneType : '—'}</b></span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grand Total Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={cls.fieldLabel}>Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={4}
                className={`${cls.input} resize-none`} placeholder="Special notes or terms..." />
            </div>
            <div className={`${cls.panel.amber} space-y-2 text-sm`}>
              <div className="text-xs font-semibold text-amber-800 uppercase mb-3">Summary</div>
              <div className="flex justify-between text-gray-600">
                <span>Total Gold Value</span>
                <span className="font-medium">{formatINR(formTotals.totalGoldValue)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Making Charges</span>
                <span className="font-medium">{formatINR(formTotals.totalMaking)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Stone Charges</span>
                <span className="font-medium text-purple-700">{formatINR(formTotals.totalStone)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Wastage Weight</span>
                <span className="font-medium">{formTotals.totalWastageW.toFixed(3)} g</span>
              </div>
              <div className="border-t border-amber-300 pt-2 flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{formatINR(formTotals.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-red-600">
                <span>Discount (₹)</span>
                <NumberInput value={form.discount} onChange={(v) => setForm({ ...form, discount: Number(v) || 0 })}
                  className="w-24 px-2 py-1 border border-gray-200 rounded text-right text-sm text-gray-800 outline-none focus:border-amber-400" />
              </div>
              <div className="flex justify-between text-blue-700">
                <span>GST @ 3%</span>
                <span className="font-medium">{formatINR(formTotals.gst)}</span>
              </div>
              <div className="border-t border-amber-400 pt-2 flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span className="text-amber-700">{formatINR(formTotals.grand)}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ── VIEW QUOTE MODAL ── */}
      <Modal open={!!viewQuote} onClose={() => setViewQuote(null)} title={viewQuote ? `Quotation — ${viewQuote.id}` : ''} size="xl"
        footer={viewQuote && <>
          <button onClick={() => setViewQuote(null)} className={cls.btnSecondary}>Close</button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-1.5"><MessageCircle className="w-4 h-4" />WhatsApp</button>
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium flex items-center gap-1.5"><Printer className="w-4 h-4" />Print</button>
          {viewQuote.status !== 'Converted' && (
            <button onClick={() => convertToInvoice(viewQuote.id)} className={`${cls.btnPrimary} flex items-center gap-1.5`}>
              <ArrowRight className="w-4 h-4" />Convert to Invoice
            </button>
          )}
        </>}>
        {viewQuote && (
          <div className="space-y-5 text-sm">
            {/* Shop header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-4">
              <div>
                <div className="text-xl font-bold text-amber-600">Golden Palace Jewellers</div>
                <div className={`${cls.mutedText} mt-0.5`}>12 Zaveri Bazaar, Mumbai · GSTIN: 27AABCU9603R1ZM · Ph: 9876500000</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 tracking-tight">QUOTATION</div>
                <div className="text-amber-600 font-semibold">{viewQuote.id}</div>
                <div className="mt-1"><StatusBadge status={viewQuote.status} /></div>
              </div>
            </div>

            {/* Customer & dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className={cls.cardSm}>
                <div className={`${cls.mutedText} uppercase mb-1`}>Quote For</div>
                <div className="font-semibold text-gray-900">{viewQuote.customerName}</div>
                <div className="text-gray-600 text-xs mt-0.5">{viewQuote.mobile}</div>
              </div>
              <div className={`${cls.cardSm} text-right`}>
                <div className={cls.mutedText}>Quote Date: <b className="text-gray-800">{formatDate(viewQuote.date)}</b></div>
                <div className={`${cls.mutedText} mt-1`}>Valid Until: <b className="text-gray-800">{formatDate(viewQuote.validUntil)}</b></div>
              </div>
            </div>

            {/* Items — detailed breakdown */}
            <div className="space-y-3">
              <div className={cls.sectionLabel}>Item Breakdown</div>
              {viewQuote.items.map((it, i) => {
                const hasStone = it.stoneType && it.stoneType !== 'None';
                const net = it.net ?? (it.grossWeight - it.stoneWeight);
                const wastageW = it.wastageW ?? (net * (it.wastage || 0) / 100);
                const billable = it.billable ?? (net + wastageW);
                const goldValue = it.goldValue ?? (billable * it.goldRate);
                return (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-amber-50 px-4 py-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                        <span className="font-semibold text-gray-900">{it.name}</span>
                        <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs rounded font-medium">{it.purity || '22K'}</span>
                        {it.qty > 1 && <span className={cls.mutedText}>× {it.qty}</span>}
                      </div>
                      <span className="font-bold text-amber-700">{formatINR(it.total)}</span>
                    </div>
                    <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-xs">
                      {/* Weight column */}
                      <div className="space-y-1.5">
                        <div className="font-semibold text-gray-500 uppercase text-[10px] mb-1">Weight Details</div>
                        <div className="flex justify-between"><span className="text-gray-500">Gross Weight</span><b>{it.grossWeight || 0} g</b></div>
                        <div className="flex justify-between"><span className="text-gray-500">Stone Weight</span><b>{it.stoneWeight || 0} g</b></div>
                        <div className="flex justify-between border-t border-gray-100 pt-1"><span className="text-gray-500">Net Gold Wt.</span><b className="text-amber-700">{net.toFixed(3)} g</b></div>
                      </div>
                      {/* Wastage column */}
                      <div className="space-y-1.5">
                        <div className="font-semibold text-gray-500 uppercase text-[10px] mb-1">Wastage</div>
                        <div className="flex justify-between"><span className="text-gray-500">Wastage %</span><b>{it.wastage || 0}%</b></div>
                        <div className="flex justify-between"><span className="text-gray-500">Wastage Wt.</span><b>{wastageW.toFixed(3)} g</b></div>
                        <div className="flex justify-between border-t border-gray-100 pt-1"><span className="text-gray-500">Billable Wt.</span><b className="text-blue-700">{billable.toFixed(3)} g</b></div>
                      </div>
                      {/* Pricing column */}
                      <div className="space-y-1.5">
                        <div className="font-semibold text-gray-500 uppercase text-[10px] mb-1">Pricing</div>
                        <div className="flex justify-between"><span className="text-gray-500">Gold Rate</span><b>₹{(it.goldRate || 0).toLocaleString('en-IN')}/g</b></div>
                        <div className="flex justify-between"><span className="text-gray-500">Gold Value</span><b>{formatINR(goldValue)}</b></div>
                        <div className="flex justify-between border-t border-gray-100 pt-1"><span className="text-gray-500">Making</span><b>{formatINR(it.makingCharges || 0)}</b></div>
                      </div>
                      {/* Stone column */}
                      <div className="space-y-1.5">
                        <div className="font-semibold text-gray-500 uppercase text-[10px] mb-1 flex items-center gap-1"><Gem className="w-3 h-3" />Stone Details</div>
                        <div className="flex justify-between"><span className="text-gray-500">Stone Type</span><b>{it.stoneType || 'None'}</b></div>
                        <div className="flex justify-between"><span className="text-gray-500">Stone Charges</span><b className={hasStone ? 'text-purple-700' : 'text-gray-400'}>{formatINR(it.stoneCharges || 0)}</b></div>
                        <div className="flex justify-between border-t border-gray-100 pt-1"><span className="text-gray-500">Item Total</span><b className="text-amber-700">{formatINR(it.total)}</b></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals + Terms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className={`${cls.sectionLabel} mb-2`}>Terms & Conditions</div>
                <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                  <li>Prices valid until date mentioned above.</li>
                  <li>50% advance required to confirm order.</li>
                  <li>Delivery within 15–20 working days.</li>
                  <li>Gold rates subject to change on final billing.</li>
                  <li>Making charges non-refundable once work starts.</li>
                </ul>
                {viewQuote.notes && (
                  <div className={`mt-3 p-3 ${cls.panel.amber} text-xs text-amber-800`}>
                    <b>Note:</b> {viewQuote.notes}
                  </div>
                )}
              </div>
              <div className={`${cls.cardSm} space-y-2`}>
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">{formatINR(viewQuote.subtotal)}</span></div>
                <div className="flex justify-between text-red-500"><span>Discount</span><span>− {formatINR(viewQuote.discount)}</span></div>
                <div className="flex justify-between text-blue-600">
                  <span>GST @ 3%</span>
                  <div className="text-right">
                    <div>{formatINR(viewQuote.gst)}</div>
                    <div className="text-[10px] text-gray-400">CGST: {formatINR(Math.round(viewQuote.gst / 2))} + SGST: {formatINR(Math.round(viewQuote.gst / 2))}</div>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-base">
                  <span>Grand Total</span>
                  <span className="text-amber-600 text-lg">{formatINR(viewQuote.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete Quotation" size="sm"
        footer={<>
          <button onClick={() => setConfirmDelete(null)} className={cls.btnSecondary}>Cancel</button>
          <button onClick={handleDelete} className={cls.btnDanger}>Delete</button>
        </>}>
        <p className={cls.bodyText}>Are you sure you want to delete quotation <b>{confirmDelete}</b>? This cannot be undone.</p>
      </Modal>
    </div>
  );
}
