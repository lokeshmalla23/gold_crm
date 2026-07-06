import { useMemo, useState } from 'react';
import { Search, Plus, Grid3x3, List, X, Edit3, BookMarked, CheckCircle2, Package } from 'lucide-react';
import { productMaster as initialProducts, inventory, formatINR } from '../data/mockData';

const CATEGORIES = ['All', 'Rings', 'Chains', 'Bangles', 'Necklace', 'Earrings', 'Coins'];
const STYLES = ['All', 'Contemporary', 'Traditional', 'Antique', 'Classic', 'Religious', 'Bridal', 'Plain', 'Cute'];
const GENDERS = ['All', 'Ladies', 'Gents', 'Kids', 'Unisex'];

export default function ProductMaster() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [style, setStyle] = useState('All');
  const [gender, setGender] = useState('All');
  const [view, setView] = useState('grid');
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  const filtered = useMemo(() => products.filter((p) =>
    (category === 'All' || p.category === category) &&
    (style === 'All' || p.style === style) &&
    (gender === 'All' || p.gender === gender) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.designNo.toLowerCase().includes(search.toLowerCase()) || p.collection.toLowerCase().includes(search.toLowerCase()))
  ), [products, search, category, style, gender]);

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {toast}
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-gray-900">Product Master</h2>
        <p className="text-sm text-gray-500">Design catalog — master reference for all designs</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search design, name, collection..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-amber-400" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={style} onChange={(e) => setStyle(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          {STYLES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          {GENDERS.map((g) => <option key={g}>{g}</option>)}
        </select>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button onClick={() => setView('grid')} className={`px-3 py-2 ${view === 'grid' ? 'bg-amber-500 text-white' : 'text-gray-600'}`}><Grid3x3 className="w-4 h-4" /></button>
          <button onClick={() => setView('list')} className={`px-3 py-2 ${view === 'list' ? 'bg-amber-500 text-white' : 'text-gray-600'}`}><List className="w-4 h-4" /></button>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />Add Design
        </button>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => {
            const liveStock = inventory.filter((inv) => inv.designId === p.id && inv.stockStatus === 'In Stock').reduce((s, inv) => s + (inv.qty || 0), 0);
            const totalItems = inventory.filter((inv) => inv.designId === p.id).length;
            return (
            <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-300 transition-colors">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl" style={{ background: p.bgColor }}>
                {p.name[0]}
              </div>
              <div className="text-center">
                <div className="text-[10px] font-mono text-gray-500">{p.designNo}</div>
                <div className="font-semibold text-gray-900 text-sm mt-1 truncate">{p.name}</div>
                <div className="text-xs text-gray-500 truncate">{p.collection}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {p.purity.map((pu) => (
                  <span key={pu} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-medium rounded-full">{pu}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">{p.style} · {p.occasion}</div>
              <div className="mt-2 text-xs text-gray-600 text-center">Making: <b>{formatINR(p.makingChargeDefault)}/g</b> · Wastage: <b>{p.wastageDefault}%</b></div>
              {p.stoneType && p.stoneType !== 'None' && (
                <div className="mt-1 text-xs text-center text-purple-600 font-medium">{p.stoneType}</div>
              )}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-gray-400" />
                  {totalItems > 0 ? (
                    <span className={`text-xs font-semibold ${liveStock === 0 ? 'text-red-600' : liveStock < 3 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {liveStock} in stock ({totalItems} pieces)
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Not in inventory</span>
                  )}
                </div>
                <button onClick={() => setEditing(p)} className="p-1.5 rounded hover:bg-gray-100"><Edit3 className="w-3.5 h-3.5 text-gray-600" /></button>
              </div>
            </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600">
                <Th>Design</Th><Th>Name</Th><Th>Collection</Th><Th>Category</Th><Th>Style</Th><Th>Gender</Th><Th>Purity</Th><Th>Making/g</Th><Th>Stock</Th><Th>Actions</Th>
              </tr></thead>
              <tbody>
                {filtered.map((p) => {
                  const liveStock = inventory.filter((inv) => inv.designId === p.id && inv.stockStatus === 'In Stock').reduce((s, inv) => s + (inv.qty || 0), 0);
                  return (
                  <tr key={p.id} className="border-b border-gray-50 last:border-0">
                    <Td className="font-mono text-xs font-semibold">{p.designNo}</Td>
                    <Td className="font-medium">{p.name}</Td>
                    <Td>{p.collection}</Td>
                    <Td>{p.category}</Td>
                    <Td>{p.style}</Td>
                    <Td>{p.gender}</Td>
                    <Td>{p.purity.join(', ')}</Td>
                    <Td>{formatINR(p.makingChargeDefault)}/g · {p.wastageDefault}%</Td>
                    <Td><LiveStockBadge count={liveStock} /></Td>
                    <Td><button onClick={() => setEditing(p)} className="p-1.5 rounded hover:bg-gray-100"><Edit3 className="w-4 h-4 text-gray-600" /></button></Td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(editing || showAdd) && <EditModal product={editing} onClose={() => { setEditing(null); setShowAdd(false); }} onSave={(p) => {
        if (editing) setProducts(products.map((x) => x.id === editing.id ? p : x));
        else setProducts([p, ...products]);
        setEditing(null); setShowAdd(false); showToast(editing ? 'Design updated' : 'Design added');
      }} />}
    </div>
  );
}

function StockBadge({ count }) {
  const cls = count === 0 ? 'bg-red-100 text-red-700' : count < 4 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';
  const label = count === 0 ? 'Out' : count < 4 ? `Low (${count})` : `${count} in stock`;
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${cls}`}>{label}</span>;
}

function LiveStockBadge({ count }) {
  const cls = count === 0 ? 'bg-red-100 text-red-700' : count < 3 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';
  const label = count === 0 ? 'Not in stock' : `${count} in stock`;
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${cls}`}>{label}</span>;
}

const Th = ({ children }) => <th className="text-left px-4 py-3 font-semibold">{children}</th>;
const Td = ({ children, className = '' }) => <td className={`px-4 py-3 text-gray-700 ${className}`}>{children}</td>;

function Field({ label, children }) { return <div><label className="text-xs font-semibold text-gray-600 uppercase block mb-1">{label}</label>{children}</div>; }

function EditModal({ product, onClose, onSave }) {
  const isEdit = !!product;
  const [form, setForm] = useState(product || {
    id: 'DSN-' + String(Math.floor(Math.random() * 900) + 100),
    designNo: 'DSN-' + String(Math.floor(Math.random() * 900) + 100),
    name: '', collection: '', category: 'Rings', subCategory: '',
    purity: ['22K'], style: 'Contemporary', gender: 'Ladies', occasion: 'Daily',
    makingChargeDefault: 180, wastageDefault: 4, minWeight: 3, maxWeight: 15,
    stoneType: 'None', description: '', tags: [], bgColor: '#F59E0B',
    status: 'Active', stockCount: 0,
  });
  const set = (k, v) => setForm({ ...form, [k]: v });
  const togglePurity = (p) => set('purity', form.purity.includes(p) ? form.purity.filter((x) => x !== p) : [...form.purity, p]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="font-semibold text-gray-900">{isEdit ? 'Edit Design' : 'Add New Design'}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Design No"><input value={form.designNo} onChange={(e) => set('designNo', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
            <Field label="Name"><input value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          </div>
          <Field label="Collection"><input value={form.collection} onChange={(e) => set('collection', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Sub-category"><input value={form.subCategory} onChange={(e) => set('subCategory', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          </div>
          <Field label="Purity">
            <div className="flex gap-2">
              {['22K', '24K', '18K'].map((p) => (
                <label key={p} className={`px-3 py-1.5 border rounded-lg text-sm cursor-pointer ${form.purity.includes(p) ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200'}`}>
                  <input type="checkbox" checked={form.purity.includes(p)} onChange={() => togglePurity(p)} className="hidden" />
                  {p}
                </label>
              ))}
            </div>
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Style">
              <select value={form.style} onChange={(e) => set('style', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                {STYLES.filter((s) => s !== 'All').map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Gender">
              <select value={form.gender} onChange={(e) => set('gender', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                {GENDERS.filter((g) => g !== 'All').map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Occasion">
              <select value={form.occasion} onChange={(e) => set('occasion', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                {['Daily', 'Casual', 'Festival', 'Bridal', 'Wedding', 'Party', 'Religious', 'Investment'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <Field label="Min Wt"><input type="number" value={form.minWeight} onChange={(e) => set('minWeight', Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
            <Field label="Max Wt"><input type="number" value={form.maxWeight} onChange={(e) => set('maxWeight', Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
            <Field label="Making/g"><input type="number" value={form.makingChargeDefault} onChange={(e) => set('makingChargeDefault', Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
            <Field label="Wastage %"><input type="number" value={form.wastageDefault} onChange={(e) => set('wastageDefault', Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          </div>
          <Field label="Stone Type"><input value={form.stoneType} onChange={(e) => set('stoneType', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Description"><textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows="2" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Tags (comma-separated)"><input value={(form.tags || []).join(', ')} onChange={(e) => set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => set('status', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option>Active</option><option>Discontinued</option>
            </select>
          </Field>
          <div className="flex gap-2 justify-end pt-3 border-t border-gray-100">
            <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
            <button onClick={() => onSave(form)} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">{isEdit ? 'Save Changes' : 'Add Design'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
