import { useMemo, useState } from 'react';
import { Search, Plus, Minus, Trash2, User, Receipt, CreditCard, Banknote, Smartphone, Wallet, Check, Barcode, Split, Calculator, Pause, Play, RotateCcw, X, FileText } from 'lucide-react';
import { customers, inventory, invoices, heldBills as initialHeldBills, GOLD_RATE, formatINR, formatDate } from '../data/mockData';

export default function Billing() {
  const [customer, setCustomer] = useState(null);
  const [showCustomerList, setShowCustomerList] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [goldRate, setGoldRate] = useState(GOLD_RATE);
  const [discount, setDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [invoiceCreated, setInvoiceCreated] = useState(null);
  const [showScan, setShowScan] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scanError, setScanError] = useState('');
  const [splitMode1, setSplitMode1] = useState('Cash');
  const [splitAmt1, setSplitAmt1] = useState(0);
  const [splitMode2, setSplitMode2] = useState('UPI');
  const [splitAmt2, setSplitAmt2] = useState(0);
  const [emiEnabled, setEmiEnabled] = useState(false);
  const [emiMonths, setEmiMonths] = useState(3);
  const [heldBills, setHeldBills] = useState(initialHeldBills);
  const [showHeld, setShowHeld] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [creditSale, setCreditSale] = useState(false);
  const [toast, setToast] = useState('');
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  const filteredCustomers = useMemo(
    () => customers.filter((c) => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.mobile.includes(customerSearch)).slice(0, 6),
    [customerSearch]
  );
  const filteredProducts = useMemo(
    () => inventory.filter((p) => p.stockStatus !== 'Out of Stock' && (p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.itemCode.toLowerCase().includes(productSearch.toLowerCase()))).slice(0, 8),
    [productSearch]
  );

  const addToCart = (product) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === product.id);
      if (existing) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...product, qty: 1 }];
    });
    setProductSearch('');
  };
  const updateQty = (id, delta) => {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  };
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.sellingPrice * i.qty, 0);
  const totalMaking = cart.reduce((s, i) => s + i.makingCharges * i.qty, 0);
  const gst = Math.round(subtotal * 0.03);
  const total = subtotal + gst - discount;

  const splitTotal = Number(splitAmt1) + Number(splitAmt2);
  const splitValid = paymentMode !== 'Split' || splitTotal === total;

  const emiFee = Math.round(total * 0.015);
  const emiPerMonth = Math.round((total + emiFee) / emiMonths);

  const handleBarcodeScan = () => {
    const match = inventory.find((p) => p.barcode === barcodeInput.trim() || p.itemCode === barcodeInput.trim());
    if (match) {
      addToCart(match);
      setBarcodeInput('');
      setScanError('');
      setShowScan(false);
    } else {
      setScanError('No matching item found');
    }
  };

  const holdBill = () => {
    if (!customer || cart.length === 0) return;
    const hold = {
      id: 'HOLD-' + Math.floor(Math.random() * 900 + 100),
      customerId: customer.id, customerName: customer.name,
      items: cart.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.sellingPrice })),
      subtotal, discount, gst, total,
      heldAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      heldBy: 'Priya Sharma', note: '',
    };
    setHeldBills([hold, ...heldBills]);
    setCart([]); setCustomer(null); setDiscount(0);
    showToast('Bill held successfully');
  };
  const resumeHeld = (h) => {
    const c = customers.find((x) => x.id === h.customerId);
    if (c) setCustomer(c);
    const resumed = h.items.map((it) => {
      const inv = inventory.find((x) => x.id === it.id) || { sellingPrice: it.price, makingCharges: 0, weight: 0, goldType: '22K', itemCode: '', name: it.name, id: it.id };
      return { ...inv, qty: it.qty };
    });
    setCart(resumed);
    setDiscount(h.discount || 0);
    setHeldBills(heldBills.filter((x) => x.id !== h.id));
    setShowHeld(false);
    showToast('Held bill resumed');
  };

  const generateInvoice = () => {
    if (!customer || cart.length === 0) return;
    if (!splitValid) return;
    setInvoiceCreated({
      id: 'INV-' + Math.floor(Math.random() * 9000 + 1000),
      customer: customer.name,
      items: cart.length,
      total,
      mode: paymentMode
    });
    setCart([]);
    setCustomer(null);
    setDiscount(0);
    setTimeout(() => setInvoiceCreated(null), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[calc(100vh-8rem)]">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-5 h-5" /> {toast}
        </div>
      )}
      {invoiceCreated && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in">
          <Check className="w-5 h-5" />
          <div>
            <div className="font-semibold">Invoice {invoiceCreated.id} Created</div>
            <div className="text-xs opacity-90">{formatINR(invoiceCreated.total)} · {invoiceCreated.mode}</div>
          </div>
        </div>
      )}

      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <label className="text-xs font-semibold text-gray-600 uppercase">Customer</label>
          {customer ? (
            <div className="mt-2 flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold">{customer.name[0]}</div>
                <div>
                  <div className="font-medium text-gray-900">{customer.name}</div>
                  <div className="text-xs text-gray-500">{customer.mobile}</div>
                </div>
              </div>
              <button onClick={() => setCustomer(null)} className="text-sm text-red-600 hover:text-red-700">Change</button>
            </div>
          ) : (
            <div className="relative mt-2">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={customerSearch}
                onChange={(e) => { setCustomerSearch(e.target.value); setShowCustomerList(true); }}
                onFocus={() => setShowCustomerList(true)}
                placeholder="Search customer by name or mobile..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
              />
              {showCustomerList && customerSearch && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-56 overflow-y-auto">
                  {filteredCustomers.map((c) => (
                    <button key={c.id} onClick={() => { setCustomer(c); setShowCustomerList(false); setCustomerSearch(''); }} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-amber-50 text-left">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">{c.name[0]}</div>
                      <div>
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.mobile}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-600 uppercase">Add Products</label>
            <button onClick={() => { setShowScan((v) => !v); setScanError(''); }} className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-700 font-medium flex items-center gap-1"><Barcode className="w-3.5 h-3.5" />Scan Barcode</button>
          </div>
          {showScan && (
            <div className="mb-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2">
                <input value={barcodeInput} onChange={(e) => setBarcodeInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleBarcodeScan()} autoFocus placeholder="Type or scan barcode (e.g. 8901234567890 or GR-001)" className="flex-1 px-3 py-1.5 rounded border border-amber-300 text-sm outline-none" />
                <button onClick={handleBarcodeScan} className="px-3 py-1.5 bg-amber-500 text-white rounded text-sm font-medium">Add</button>
              </div>
              {scanError && <div className="text-xs text-red-600 mt-1">{scanError}</div>}
            </div>
          )}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Search product by name or code..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
            />
          </div>
          {productSearch && (
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto">
              {filteredProducts.map((p) => (
                <button key={p.id} onClick={() => addToCart(p)} className="p-2 border border-gray-200 rounded-lg hover:border-amber-400 hover:bg-amber-50 text-left">
                  <div className="text-xs text-gray-500">{p.itemCode}</div>
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-amber-600 font-semibold text-sm mt-1">{formatINR(p.sellingPrice)}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 flex-1 min-h-0 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Cart ({cart.length})</h3>
            {cart.length > 0 && <button onClick={() => setCart([])} className="text-xs text-red-600">Clear all</button>}
          </div>
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">Cart is empty. Search and add products above.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase text-gray-600">
                    <th className="text-left px-4 py-2">Item</th>
                    <th className="text-center px-3 py-2">Qty</th>
                    <th className="text-right px-3 py-2">Price</th>
                    <th className="text-right px-3 py-2">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((i) => (
                    <tr key={i.id} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{i.name}</div>
                        <div className="text-xs text-gray-500">{i.itemCode} · {i.weight}g {i.goldType}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => updateQty(i.id, -1)} className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                          <span className="w-8 text-center font-medium">{i.qty}</span>
                          <button onClick={() => updateQty(i.id, 1)} className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">{formatINR(i.sellingPrice)}</td>
                      <td className="px-3 py-3 text-right font-semibold">{formatINR(i.sellingPrice * i.qty)}</td>
                      <td className="px-3 py-3">
                        <button onClick={() => removeItem(i.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2"><Receipt className="w-5 h-5 text-amber-600" />Bill Summary</h3>
          <div className="flex gap-1">
            <button onClick={() => setShowHeld(true)} className="p-1.5 rounded hover:bg-gray-100" title="Held Bills"><FileText className="w-4 h-4 text-gray-600" /></button>
            <button onClick={() => setShowReturn(true)} className="p-1.5 rounded hover:bg-gray-100" title="Return Bill"><RotateCcw className="w-4 h-4 text-gray-600" /></button>
          </div>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-gray-500">Held: {heldBills.length}</span>
        </div>

        <div className="mb-4">
          <label className="text-xs font-medium text-gray-700">Gold Rate (₹ per gram, 22K)</label>
          <input type="number" value={goldRate} onChange={(e) => setGoldRate(Number(e.target.value))} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none" />
        </div>

        <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
          <Row label="Subtotal" value={formatINR(subtotal)} />
          <Row label="Making Charges" value={formatINR(totalMaking)} muted />
          <Row label="GST (3%)" value={formatINR(gst)} />
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Discount</span>
            <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} className="w-24 px-2 py-1 border border-gray-200 rounded text-sm text-right" />
          </div>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="font-semibold text-gray-900">Grand Total</span>
            <span className="text-xl font-bold text-amber-600">{formatINR(total)}</span>
          </div>
        </div>

        <div className="mt-4 p-3 border border-gray-200 rounded-lg">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input type="checkbox" checked={creditSale} onChange={(e) => setCreditSale(e.target.checked)} />
            <Wallet className="w-4 h-4 text-amber-600" />Credit Sale (Customer Outstanding)
          </label>
        </div>

        {!creditSale && <div className="mt-5">
          <label className="text-xs font-medium text-gray-700 mb-2 block">Payment Mode</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { mode: 'Cash', icon: Banknote },
              { mode: 'UPI', icon: Smartphone },
              { mode: 'Card', icon: CreditCard },
              { mode: 'Split', icon: Split }
            ].map(({ mode, icon: Icon }) => (
              <button key={mode} onClick={() => setPaymentMode(mode)} className={`p-2.5 rounded-lg border text-sm font-medium flex items-center gap-2 justify-center ${paymentMode === mode ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-700'}`}>
                <Icon className="w-4 h-4" />{mode}
              </button>
            ))}
          </div>

          {paymentMode === 'Split' && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
              <div className="text-xs font-semibold text-amber-800 uppercase">Split Payment</div>
              <div className="flex gap-2">
                <select value={splitMode1} onChange={(e) => setSplitMode1(e.target.value)} className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-sm">
                  <option>Cash</option><option>UPI</option><option>Card</option>
                </select>
                <input type="number" value={splitAmt1} onChange={(e) => setSplitAmt1(Number(e.target.value) || 0)} placeholder="Amount" className="w-28 px-2 py-1.5 border border-gray-200 rounded text-sm text-right" />
              </div>
              <div className="flex gap-2">
                <select value={splitMode2} onChange={(e) => setSplitMode2(e.target.value)} className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-sm">
                  <option>UPI</option><option>Cash</option><option>Card</option>
                </select>
                <input type="number" value={splitAmt2} onChange={(e) => setSplitAmt2(Number(e.target.value) || 0)} placeholder="Amount" className="w-28 px-2 py-1.5 border border-gray-200 rounded text-sm text-right" />
              </div>
              <div className={`text-xs font-medium ${splitValid ? 'text-emerald-700' : 'text-red-600'}`}>
                {splitValid ? `✓ Split total matches ${formatINR(total)}` : `Split total ${formatINR(splitTotal)} ≠ ${formatINR(total)}`}
              </div>
            </div>
          )}

          <div className="mt-3 p-3 border border-gray-200 rounded-lg">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" checked={emiEnabled} onChange={(e) => setEmiEnabled(e.target.checked)} />
              <Calculator className="w-4 h-4 text-amber-600" />Pay via EMI
            </label>
            {emiEnabled && (
              <div className="mt-2 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {[3, 6, 12].map((m) => (
                    <button key={m} onClick={() => setEmiMonths(m)} className={`py-1.5 rounded text-xs font-medium border ${emiMonths === m ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200'}`}>{m} months</button>
                  ))}
                </div>
                <div className="text-xs text-gray-600">Processing fee (1.5%): <b>{formatINR(emiFee)}</b></div>
                <div className="p-2 bg-amber-50 rounded text-sm font-semibold text-amber-700">EMI: {formatINR(emiPerMonth)} / month × {emiMonths}</div>
              </div>
            )}
          </div>
        </div>}

        {creditSale && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-xs font-semibold text-amber-800 uppercase mb-2">Customer Outstanding</div>
            <div className="text-2xl font-bold text-amber-700">{formatINR(total)}</div>
            <div className="text-xs text-amber-700 mt-1">Will be added to customer's dues</div>
          </div>
        )}

        <button onClick={generateInvoice} disabled={!customer || cart.length === 0 || (!creditSale && !splitValid)} className="mt-5 w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold rounded-lg shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
          {creditSale ? 'Save Credit Sale' : 'Generate Invoice'}
        </button>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button onClick={holdBill} disabled={!customer || cart.length === 0} className="py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center gap-1"><Pause className="w-4 h-4" />Hold Bill</button>
          <button className="py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Save Draft</button>
        </div>
      </div>

      {showHeld && <HeldBillsModal bills={heldBills} onClose={() => setShowHeld(false)} onResume={resumeHeld} onDelete={(id) => setHeldBills(heldBills.filter((x) => x.id !== id))} />}
      {showReturn && <ReturnBillModal onClose={() => setShowReturn(false)} onProcess={() => { setShowReturn(false); showToast('Return processed'); }} />}
    </div>
  );
}

function HeldBillsModal({ bills, onClose, onResume, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold">Held Bills ({bills.length})</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-2">
          {bills.length === 0 ? <div className="text-sm text-gray-500 text-center py-6">No held bills</div> :
            bills.map((h) => (
              <div key={h.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold">{h.id}</span>
                    <span className="text-sm font-medium">{h.customerName}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{h.items.length} items · {formatINR(h.total)} · Held: {h.heldAt}</div>
                  {h.note && <div className="text-xs text-amber-700 mt-1">Note: {h.note}</div>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => onResume(h)} className="px-3 py-1.5 bg-emerald-500 text-white rounded text-xs font-medium flex items-center gap-1"><Play className="w-3 h-3" />Resume</button>
                  <button onClick={() => onDelete(h.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function ReturnBillModal({ onClose, onProcess }) {
  const [invNo, setInvNo] = useState('');
  const [found, setFound] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  const lookup = () => {
    const inv = invoices.find((i) => i.id.toLowerCase() === invNo.trim().toLowerCase());
    if (inv) {
      const simulatedItems = Array.from({ length: inv.items }).map((_, idx) => ({
        id: idx, name: `Item ${idx + 1}`, price: Math.round(inv.subtotal / inv.items),
      }));
      setFound({ ...inv, itemsList: simulatedItems });
    } else {
      setFound({ error: true });
    }
  };
  const refund = Object.keys(selectedItems).filter((k) => selectedItems[k]).reduce((s, k) => s + (found?.itemsList?.find((it) => it.id === Number(k))?.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold">Return Bill</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase block mb-1">Original Invoice #</label>
            <div className="flex gap-2">
              <input value={invNo} onChange={(e) => setInvNo(e.target.value)} placeholder="INV-1010" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              <button onClick={lookup} className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium">Lookup</button>
            </div>
          </div>

          {found?.error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">Invoice not found. Try INV-1010, INV-1005 etc.</div>}

          {found && !found.error && (
            <>
              <div className="p-3 bg-emerald-50 rounded-lg text-sm">
                <div><b>{found.id}</b> · {found.customerName}</div>
                <div className="text-xs text-gray-600">Date: {formatDate(found.date)} · Total: {formatINR(found.totalAmount)}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Select items to return</label>
                <div className="mt-2 space-y-1">
                  {found.itemsList.map((it) => (
                    <label key={it.id} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer">
                      <input type="checkbox" checked={!!selectedItems[it.id]} onChange={(e) => setSelectedItems({ ...selectedItems, [it.id]: e.target.checked })} />
                      <span className="flex-1 text-sm">{it.name}</span>
                      <span className="font-semibold text-sm">{formatINR(it.price)}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-amber-50 rounded-lg flex justify-between font-semibold">
                  <span>Refund Amount</span><span className="text-amber-700">{formatINR(refund)}</span>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
                <button onClick={onProcess} disabled={refund === 0} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium disabled:opacity-40">Process Return</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? 'text-gray-500 text-xs' : 'text-gray-600'}>{label}</span>
      <span className={muted ? 'text-gray-500 text-xs' : 'text-gray-900 font-medium'}>{value}</span>
    </div>
  );
}
