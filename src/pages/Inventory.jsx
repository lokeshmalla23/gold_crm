import { useMemo, useState } from 'react';
import { Search, Plus, Filter, Download, LayoutGrid, List, ArrowUpDown, Star, Gem, Package, PackageX, Trash2, Edit, Lock, Unlock, CheckCircle2, Barcode } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import { StockBadge } from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { inventory as initialInventory, productMaster, GOLD_RATE, formatINR } from '../data/mockData';

const CATEGORIES = ['All', 'Rings', 'Chains', 'Bangles', 'Necklace', 'Earrings', 'Coins'];

const PREFIX_MAP = { Rings: 'GR', Chains: 'GC', Bangles: 'GB', Necklace: 'GN', Earrings: 'GE', Coins: 'CO' };
const PURITY_RATE = { '24K': 1.0909, '22K': 1, '18K': 0.8182, '14K': 0.6364 };

function nextItemCode(category, list) {
  const prefix = PREFIX_MAP[category] || 'GX';
  const nums = list
    .filter((i) => i.itemCode.startsWith(prefix + '-'))
    .map((i) => parseInt(i.itemCode.split('-')[1]))
    .filter((n) => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `${prefix}-${String(next).padStart(3, '0')}`;
}

function nextBarcode(list) {
  const nums = list
    .map((i) => parseInt(i.barcode))
    .filter((n) => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 8901234567890;
  return String(next);
}

const emptyForm = () => ({
  designId: '',
  itemCode: '',
  name: '',
  category: 'Rings',
  goldType: '22K',
  weight: '',
  purity: '916',
  stoneType: 'None',
  stoneWeight: 0,
  stoneCharges: 0,
  makingCharges: '',
  wastage: '',
  purchasePrice: '',
  sellingPrice: '',
  qty: 1,
  stockStatus: 'In Stock',
  fromDesign: false,
});

export default function Inventory() {
  const [list, setList] = useState(initialInventory);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState('table');
  const [showStats, setShowStats] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState(emptyForm());
  const [toast, setToast] = useState('');
  const [editItem, setEditItem] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = useMemo(() => {
    return list.filter((i) => {
      const matchCat = category === 'All' || i.category === category;
      const q = search.toLowerCase();
      const matchSearch = !q || i.name.toLowerCase().includes(q) || i.itemCode.toLowerCase().includes(q) || i.barcode.includes(q);
      return matchCat && matchSearch;
    });
  }, [list, search, category]);

  const stats = {
    total: list.length,
    value: list.reduce((s, i) => s + i.sellingPrice * i.qty, 0),
    inStock: list.filter((i) => i.stockStatus === 'In Stock').length,
    outOfStock: list.filter((i) => i.stockStatus === 'Out of Stock').length
  };

  const handleDesignSelect = (designId) => {
    if (!designId) {
      setForm((f) => ({ ...emptyForm(), designId: '' }));
      return;
    }
    const design = productMaster.find((d) => d.id === designId);
    if (!design) return;
    const defaultPurity = design.purity[0] || '22K';
    const purityLabel = { '22K': '916', '24K': '999', '18K': '750', '14K': '585' }[defaultPurity] || '916';
    const autoCode = nextItemCode(design.category, list);
    setForm((f) => ({
      ...f,
      designId,
      name: design.name,
      category: design.category,
      goldType: defaultPurity,
      purity: purityLabel,
      stoneType: design.stoneType || 'None',
      stoneWeight: 0,
      stoneCharges: 0,
      makingCharges: design.makingChargeDefault,
      wastage: design.wastageDefault,
      itemCode: autoCode,
      fromDesign: true,
    }));
  };

  const handleOverrideDesign = () => setForm((f) => ({ ...f, fromDesign: false }));

  const calcSellingPrice = () => {
    const w = Number(form.weight) || 0;
    const sw = Number(form.stoneWeight) || 0;
    const net = Math.max(0, w - sw);
    const wastageW = net * (Number(form.wastage) || 0) / 100;
    const billable = net + wastageW;
    const rate = Math.round(GOLD_RATE * (PURITY_RATE[form.goldType] || 1));
    const goldValue = billable * rate;
    const making = Number(form.makingCharges) || 0;
    const stone = Number(form.stoneCharges) || 0;
    return Math.round((goldValue + making + stone) * 1.03);
  };

  const handleAdd = () => {
    if (!form.name || !form.weight) { showToast('Name and weight are required'); return; }
    const barcode = nextBarcode(list);
    const itemCode = form.itemCode || nextItemCode(form.category, list);
    const suggested = calcSellingPrice();
    const newItem = {
      id: Date.now(),
      itemCode,
      barcode,
      name: form.name,
      category: form.category,
      goldType: form.goldType,
      weight: Number(form.weight),
      purity: form.purity,
      stoneType: form.stoneType || 'None',
      stoneWeight: Number(form.stoneWeight) || 0,
      stoneCharges: Number(form.stoneCharges) || 0,
      makingCharges: Number(form.makingCharges) || 0,
      wastage: Number(form.wastage) || 0,
      purchasePrice: Number(form.purchasePrice) || 0,
      sellingPrice: Number(form.sellingPrice) || suggested,
      qty: Number(form.qty) || 1,
      stockStatus: form.stockStatus,
      designId: form.designId || null,
      rating: 4.5,
      image: '#F59E0B',
    };
    setList((l) => [newItem, ...l]);
    setForm(emptyForm());
    setShowModal(false);
    showToast(`Item ${itemCode} added to inventory`);
  };

  const handleDelete = (id) => setList((l) => l.filter((i) => i.id !== id));

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const columns = [
    { key: 'select', title: '', render: (r) => (
      <input type="checkbox" checked={selected.includes(r.id)} onChange={() => setSelected((s) => s.includes(r.id) ? s.filter((x) => x !== r.id) : [...s, r.id])} className="rounded border-gray-300 text-amber-600" onClick={(e) => e.stopPropagation()} />
    ) },
    { key: 'name', title: 'Product', render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${r.image}, #FBBF24)` }}></div>
        <div>
          <div className="font-medium text-gray-900">{r.name}</div>
          <div className="text-xs text-gray-500">{r.itemCode} · {r.barcode}</div>
          {r.designId && <div className="text-[10px] text-amber-600 font-medium">Design: {r.designId}</div>}
        </div>
      </div>
    ) },
    { key: 'category', title: 'Category' },
    { key: 'goldType', title: 'Gold' },
    { key: 'weight', title: 'Weight', render: (r) => (
      <div>
        <div>{r.weight}g</div>
        {r.stoneType !== 'None' && <div className="text-xs text-purple-600">{r.stoneType} {r.stoneWeight}g</div>}
      </div>
    ) },
    { key: 'purity', title: 'Purity' },
    { key: 'sellingPrice', title: 'Price', render: (r) => <span className="font-semibold text-gray-900">{formatINR(r.sellingPrice)}</span> },
    { key: 'stockStatus', title: 'Stock', render: (r) => <StockBadge status={r.stockStatus} /> },
    { key: 'rating', title: 'Rating', render: (r) => (
      <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span className="text-xs text-gray-700">{r.rating}</span></div>
    ) },
    { key: 'actions', title: 'Actions', render: (r) => (
      <div className="flex items-center gap-2">
        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500" onClick={(e) => { e.stopPropagation(); }}><Edit className="w-3.5 h-3.5" /></button>
        <button className="p-1.5 rounded hover:bg-red-50 text-red-500" onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}><Trash2 className="w-3.5 h-3.5" /></button>
      </div>
    ) }
  ];

  const suggested = form.weight ? calcSellingPrice() : 0;
  const selectedDesign = form.designId ? productMaster.find((d) => d.id === form.designId) : null;

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />{toast}
        </div>
      )}

      {showStats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Products" value={stats.total} icon={Gem} iconBg="bg-amber-100" iconColor="text-amber-600" />
          <StatCard label="Total Value" value={formatINR(stats.value)} icon={Package} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
          <StatCard label="In Stock" value={stats.inStock} icon={Package} iconBg="bg-blue-100" iconColor="text-blue-600" />
          <StatCard label="Out of Stock" value={stats.outOfStock} icon={PackageX} iconBg="bg-red-100" iconColor="text-red-600" />
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${category === c ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product, code, barcode..." className="pl-9 pr-3 py-2 w-56 rounded-lg border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm" />
            </div>
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
              <button onClick={() => setView('table')} className={`p-1.5 rounded ${view === 'table' ? 'bg-gray-100' : ''}`}><List className="w-4 h-4" /></button>
              <button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-gray-100' : ''}`}><LayoutGrid className="w-4 h-4" /></button>
            </div>
            <button className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"><Filter className="w-4 h-4" />Filter</button>
            <button className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"><ArrowUpDown className="w-4 h-4" />Sort</button>
            <label className="flex items-center gap-2 text-sm text-gray-700 px-3">
              <input type="checkbox" checked={showStats} onChange={(e) => setShowStats(e.target.checked)} className="rounded border-gray-300 text-amber-600" />
              Stats
            </label>
            <button className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"><Download className="w-4 h-4" />Export</button>
            <button onClick={() => { setForm(emptyForm()); setShowModal(true); }} className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium text-sm flex items-center gap-2 shadow-sm hover:shadow-md"><Plus className="w-4 h-4" />Add Product</button>
          </div>
        </div>

        {view === 'table' ? (
          <DataTable columns={columns} data={filtered} pageSize={10} />
        ) : (
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                <div className="w-full h-32 rounded-lg mb-3" style={{ background: `linear-gradient(135deg, ${item.image}, #FBBF24)` }}></div>
                <div className="text-xs text-gray-500">{item.itemCode}</div>
                <div className="font-medium text-gray-900 text-sm truncate">{item.name}</div>
                {item.stoneType !== 'None' && <div className="text-xs text-purple-600 mt-0.5">{item.stoneType}</div>}
                <div className="flex items-center justify-between mt-2">
                  <div className="text-amber-600 font-bold">{formatINR(item.sellingPrice)}</div>
                  <StockBadge status={item.stockStatus} />
                </div>
                <div className="mt-2 text-xs text-gray-500">{item.weight}g · {item.goldType}</div>
                {item.designId && <div className="mt-1 text-[10px] text-amber-600 font-medium">Design: {item.designId}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-4 z-40">
          <span className="text-sm">{selected.length} selected</span>
          <button className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg">Bulk Edit</button>
          <button className="text-xs px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg">Delete</button>
          <button onClick={() => setSelected([])} className="text-xs text-gray-300 hover:text-white">Clear</button>
        </div>
      )}

      {/* ── ADD PRODUCT MODAL ── */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New Inventory Item" size="lg"
        footer={<>
          <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
          <button onClick={handleAdd} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">Add to Inventory</button>
        </>}
      >
        <div className="space-y-4">

          {/* Step 1 — Select Design from Product Master */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-amber-800 uppercase mb-2 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">1</span>
              Select Design from Product Master
            </div>
            <select
              value={form.designId}
              onChange={(e) => handleDesignSelect(e.target.value)}
              className="w-full px-3 py-2 border border-amber-300 rounded-lg text-sm outline-none focus:border-amber-500 bg-white"
            >
              <option value="">— Manual entry (no design template) —</option>
              {productMaster.filter((d) => d.status === 'Active').map((d) => (
                <option key={d.id} value={d.id}>{d.designNo} — {d.name} ({d.category}, {d.purity.join('/')})</option>
              ))}
            </select>
            {selectedDesign && (
              <div className="mt-2 flex items-center gap-3 p-2 bg-white border border-amber-200 rounded-lg text-xs text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">{selectedDesign.name}</span>
                  <span className="text-gray-500 ml-2">{selectedDesign.collection} · {selectedDesign.style} · {selectedDesign.gender}</span>
                  <br />
                  <span className="text-amber-700">Making: ₹{selectedDesign.makingChargeDefault}/g · Wastage: {selectedDesign.wastageDefault}% · Stone: {selectedDesign.stoneType}</span>
                </div>
                <button onClick={handleOverrideDesign} className="flex items-center gap-1 px-2 py-1 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50">
                  <Unlock className="w-3 h-3" />Edit
                </button>
              </div>
            )}
          </div>

          {/* Step 2 — Item Details */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-gray-400 text-white text-xs font-bold flex items-center justify-center">2</span>
              Item Details
              {form.fromDesign && <span className="ml-1 text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><Lock className="w-2.5 h-2.5" />Auto-filled from design</span>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Item Code</label>
                {form.fromDesign ? (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono font-semibold text-amber-700 flex items-center gap-1.5">
                    <Barcode className="w-3.5 h-3.5 text-gray-400" />{form.itemCode}
                    <span className="ml-auto text-[10px] text-gray-400">auto-generated</span>
                  </div>
                ) : (
                  <input value={form.itemCode} onChange={(e) => set('itemCode', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" placeholder="e.g. GR-033" />
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Product Name *</label>
                {form.fromDesign ? (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-gray-400" />{form.name}
                  </div>
                ) : (
                  <input value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" placeholder="Product name" />
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Category</label>
                {form.fromDesign ? (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-gray-400" />{form.category}
                  </div>
                ) : (
                  <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400">
                    {['Rings','Chains','Bangles','Necklace','Earrings','Coins'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Gold Type</label>
                {form.fromDesign ? (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-gray-400" />{form.goldType}
                  </div>
                ) : (
                  <select value={form.goldType} onChange={(e) => set('goldType', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400">
                    {['22K','24K','18K','14K'].map((g) => <option key={g}>{g}</option>)}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Step 3 — Weight & Stone (always editable) */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-gray-400 text-white text-xs font-bold flex items-center justify-center">3</span>
              Weight & Stone Details <span className="text-[10px] text-gray-400 normal-case font-normal">(enter actual physical measurements)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Gross Weight (g) *</label>
                <input type="number" step="0.001" value={form.weight} onChange={(e) => set('weight', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" placeholder="0.000" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Stone Type</label>
                {form.fromDesign ? (
                  <div className={`px-3 py-2 border rounded-lg text-sm flex items-center gap-1.5 ${form.stoneType !== 'None' ? 'bg-purple-50 border-purple-200 text-purple-800 font-semibold' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                    <Lock className="w-3 h-3 text-gray-400" />{form.stoneType}
                  </div>
                ) : (
                  <select value={form.stoneType} onChange={(e) => set('stoneType', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400">
                    {['None','Diamond','Ruby','Emerald','Sapphire','Pearl','Coral','CZ','Polki','Other'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Stone Weight (g)</label>
                <input type="number" step="0.001" value={form.stoneWeight} onChange={(e) => set('stoneWeight', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" placeholder="0.000" disabled={form.stoneType === 'None'} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Stone Charges (₹)</label>
                <input type="number" value={form.stoneCharges} onChange={(e) => set('stoneCharges', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" placeholder="0" disabled={form.stoneType === 'None'} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Qty</label>
                <input type="number" value={form.qty} onChange={(e) => set('qty', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Stock Status</label>
                <select value={form.stockStatus} onChange={(e) => set('stockStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400">
                  {['In Stock','Out of Stock','Restock'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Step 4 — Pricing */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-gray-400 text-white text-xs font-bold flex items-center justify-center">4</span>
              Making & Pricing
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Wastage %
                  {form.fromDesign && <span className="text-amber-600 ml-1">(from design)</span>}
                </label>
                <input type="number" step="0.1" value={form.wastage} onChange={(e) => set('wastage', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Making Charges (₹)
                  {form.fromDesign && <span className="text-amber-600 ml-1">(from design)</span>}
                </label>
                <input type="number" value={form.makingCharges} onChange={(e) => set('makingCharges', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Purchase Price (₹)</label>
                <input type="number" value={form.purchasePrice} onChange={(e) => set('purchasePrice', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" placeholder="Cost price" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Selling Price (₹)
                  {form.weight && <span className="text-emerald-600 ml-1">(suggested: {formatINR(suggested)})</span>}
                </label>
                <input type="number" value={form.sellingPrice} onChange={(e) => set('sellingPrice', e.target.value)} placeholder={String(suggested || 0)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" />
              </div>
            </div>
            {form.weight > 0 && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs grid grid-cols-4 gap-2 text-center">
                <div><div className="text-gray-500">Net Gold</div><div className="font-bold text-gray-800">{Math.max(0, (Number(form.weight) || 0) - (Number(form.stoneWeight) || 0)).toFixed(3)}g</div></div>
                <div><div className="text-gray-500">Wastage Wt</div><div className="font-bold text-orange-700">{(Math.max(0, (Number(form.weight)||0)-(Number(form.stoneWeight)||0)) * (Number(form.wastage)||0) / 100).toFixed(3)}g</div></div>
                <div><div className="text-gray-500">Gold Rate ({form.goldType})</div><div className="font-bold text-gray-800">₹{Math.round(GOLD_RATE * (PURITY_RATE[form.goldType]||1)).toLocaleString('en-IN')}/g</div></div>
                <div><div className="text-gray-500">Suggested Price</div><div className="font-bold text-amber-700">{formatINR(suggested)}</div></div>
              </div>
            )}
          </div>

          {/* Barcode preview */}
          {form.fromDesign && (
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
              <Barcode className="w-4 h-4 text-gray-400" />
              <span>Barcode will be auto-generated when item is saved</span>
              <span className="ml-auto text-amber-700 font-semibold">Item Code: {form.itemCode}</span>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
