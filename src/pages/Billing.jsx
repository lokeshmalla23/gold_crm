import { useMemo, useState } from 'react';
import {
  Search, Plus, Minus, Trash2, User, Receipt, CreditCard, Banknote, Smartphone,
  Wallet, Check, Barcode, Split, Calculator, Pause, Play, RotateCcw, X, FileText,
  Tag, ShoppingBag, Layers, ChevronRight, AlertCircle, Hash,
} from 'lucide-react';
import { customers, inventory, invoices, heldBills as initialHeldBills, GOLD_RATE, formatINR, formatDate } from '../data/mockData';
import {
  card, cardSm, cardActive,
  input, inputIcon, inputSm, inputRight,
  btnPrimary, btnPrimaryFull, btnSecondary, btnDanger, btnGhost, btnIcon, btnDangerGhost,
  paymentBtn, emiMonthBtn,
  sectionLabel, mutedText,
  modalOverlay, modalBox, modalHeader, modalBody,
  tableHeader, tableRow, tableCell, tableFooter,
  panel,
  iconBox, iconColor,
  avatar,
  toggleTrack, toggleThumb,
  statusBadge,
} from '../styles/classes';

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
    [customerSearch],
  );
  const filteredProducts = useMemo(
    () => inventory.filter((p) => p.stockStatus !== 'Out of Stock' && (p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.itemCode.toLowerCase().includes(productSearch.toLowerCase()))).slice(0, 8),
    [productSearch],
  );

  const addToCart = (product) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === product.id);
      if (existing) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...product, qty: 1 }];
    });
    setProductSearch('');
  };
  const updateQty = (id, delta) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const subtotal    = cart.reduce((s, i) => s + i.sellingPrice * i.qty, 0);
  const totalMaking = cart.reduce((s, i) => s + i.makingCharges * i.qty, 0);
  const totalWeight = cart.reduce((s, i) => s + (i.weight || 0) * i.qty, 0);
  const goldValue   = Math.round(totalWeight * goldRate);
  const gst         = Math.round(subtotal * 0.03);
  const total       = subtotal + gst - discount;
  const totalQty    = cart.reduce((s, i) => s + i.qty, 0);

  const splitTotal = Number(splitAmt1) + Number(splitAmt2);
  const splitValid = paymentMode !== 'Split' || splitTotal === total;

  const emiFee      = Math.round(total * 0.015);
  const emiPerMonth = Math.round((total + emiFee) / emiMonths);

  const handleBarcodeScan = () => {
    const match = inventory.find((p) => p.barcode === barcodeInput.trim() || p.itemCode === barcodeInput.trim());
    if (match) { addToCart(match); setBarcodeInput(''); setScanError(''); setShowScan(false); }
    else setScanError('No matching item found');
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
    if (!customer || cart.length === 0 || !splitValid) return;
    const invId = 'INV-' + Math.floor(Math.random() * 9000 + 1000);
    setInvoiceCreated({ id: invId, customer: customer.name, items: cart.length, total, mode: paymentMode });
    setCart([]); setCustomer(null); setDiscount(0);
    setTimeout(() => setInvoiceCreated(null), 5000);
  };

  const billingStep = !customer ? 1 : cart.length === 0 ? 2 : 3;

  return (
    <div className="flex flex-col gap-0 h-[calc(100vh-8rem)]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in">
          <Check className="w-5 h-5" /> {toast}
        </div>
      )}

      {/* Invoice success card */}
      {invoiceCreated && (
        <div className={`fixed top-6 right-6 z-50 ${cardSm} border-emerald-200 shadow-2xl w-80 animate-slide-in`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`${iconBox.md} ${iconColor.emerald}`}><Check className="w-5 h-5" /></div>
            <div>
              <div className="font-semibold text-gray-900">Invoice Generated!</div>
              <div className={mutedText}>{invoiceCreated.id}</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Customer</span><span className="font-medium">{invoiceCreated.customer}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Items</span><span className="font-medium">{invoiceCreated.items}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-semibold text-amber-600">{formatINR(invoiceCreated.total)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Payment</span><span className="font-medium">{invoiceCreated.mode}</span></div>
          </div>
        </div>
      )}

      {/* Flow steps bar */}
      <div className={`flex items-center gap-0 mb-4 ${cardSm}`}>
        <FlowStep step={1} label="Select Customer" active={billingStep === 1} done={billingStep > 1} />
        <ChevronRight className="w-4 h-4 text-gray-300 mx-2 flex-shrink-0" />
        <FlowStep step={2} label="Add Products" active={billingStep === 2} done={billingStep > 2} />
        <ChevronRight className="w-4 h-4 text-gray-300 mx-2 flex-shrink-0" />
        <FlowStep step={3} label="Review & Pay" active={billingStep === 3} done={false} />
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setShowHeld(true)} className={btnIcon}>
            <FileText className="w-4 h-4" />
            Held Bills
            <span className="ml-0.5 bg-amber-100 text-amber-700 text-xs px-1.5 py-0.5 rounded-full font-semibold">{heldBills.length}</span>
          </button>
          <button onClick={() => setShowReturn(true)} className={btnIcon}>
            <RotateCcw className="w-4 h-4" />Returns
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 min-h-0 overflow-hidden">
        {/* ── Left column ── */}
        <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-1">

          {/* 1 — Customer */}
          <div className={`${card} border-2 transition-colors p-4 ${billingStep === 1 ? cardActive : ''}`}>
            <div className="flex items-center gap-2 mb-3">
              <StepBadge n={1} done={billingStep > 1} active={billingStep === 1} />
              <span className={sectionLabel}>Customer</span>
            </div>
            {customer ? (
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className={`${avatar.lg} bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-sm`}>{customer.name[0]}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{customer.name}</div>
                    <div className={`${mutedText} flex items-center gap-2 mt-0.5`}>
                      <span>{customer.mobile}</span>
                      {customer.loyaltyTier && <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-medium">{customer.loyaltyTier}</span>}
                    </div>
                  </div>
                </div>
                <button onClick={() => setCustomer(null)} className="text-xs px-2.5 py-1 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 font-medium transition-colors">Change</button>
              </div>
            ) : (
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={customerSearch} onChange={(e) => { setCustomerSearch(e.target.value); setShowCustomerList(true); }} onFocus={() => setShowCustomerList(true)} placeholder="Search customer by name or mobile..." className={inputIcon} />
                {showCustomerList && customerSearch && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-56 overflow-y-auto">
                    {filteredCustomers.map((c) => (
                      <button key={c.id} onClick={() => { setCustomer(c); setShowCustomerList(false); setCustomerSearch(''); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-amber-50 text-left first:rounded-t-xl last:rounded-b-xl transition-colors">
                        <div className={`${avatar.sm} bg-amber-100 text-amber-700`}>{c.name[0]}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{c.name}</div>
                          <div className={mutedText}>{c.mobile}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2 — Add Products */}
          <div className={`${card} border-2 transition-colors p-4 ${billingStep === 2 ? cardActive : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <StepBadge n={2} done={billingStep > 2} active={billingStep === 2} />
                <span className={sectionLabel}>Add Products</span>
              </div>
              <button onClick={() => { setShowScan((v) => !v); setScanError(''); }} className={`${btnIcon} text-amber-700 border-amber-200 bg-amber-50 hover:bg-amber-100`}>
                <Barcode className="w-3.5 h-3.5" />Scan Barcode
              </button>
            </div>

            {showScan && (
              <div className={`${panel.amber} mb-3`}>
                <div className="flex items-center gap-2">
                  <input value={barcodeInput} onChange={(e) => setBarcodeInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleBarcodeScan()} autoFocus placeholder="Type or scan barcode (e.g. GR-001)" className={`${input} border-amber-300`} />
                  <button onClick={handleBarcodeScan} className={btnPrimary}>Add</button>
                </div>
                {scanError && <div className="flex items-center gap-1 text-xs text-red-600 mt-1.5"><AlertCircle className="w-3.5 h-3.5" />{scanError}</div>}
              </div>
            )}

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={productSearch} onChange={(e) => setProductSearch(e.target.value)} placeholder="Search product by name or item code..." className={inputIcon} />
            </div>

            {productSearch && (
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 max-h-52 overflow-y-auto">
                {filteredProducts.map((p) => (
                  <button key={p.id} onClick={() => addToCart(p)} className={`${card} p-2.5 hover:border-amber-400 hover:bg-amber-50 text-left transition-all`}>
                    <div className={`${mutedText} font-mono`}>{p.itemCode}</div>
                    <div className="text-sm font-medium text-gray-900 truncate mt-0.5">{p.name}</div>
                    <div className={`${mutedText} mt-0.5`}>{p.weight}g · {p.goldType}</div>
                    <div className="text-amber-600 font-bold text-sm mt-1.5">{formatINR(p.sellingPrice)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3 — Cart */}
          <div className={`${card} border-2 flex flex-col min-h-0`}>
            <div className={cardHeader}>
              <div className="flex items-center gap-2">
                <StepBadge n={3} done={false} active={cart.length > 0} />
                <h3 className={sectionLabel}>Cart</h3>
                {cart.length > 0 && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-semibold">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>}
              </div>
              {cart.length > 0 && <button onClick={() => setCart([])} className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">Clear all</button>}
            </div>

            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 text-gray-400">
                  <ShoppingBag className="w-10 h-10 mb-2 opacity-30" />
                  <div className="text-sm font-medium">Cart is empty</div>
                  <div className={mutedText}>Search and add products above</div>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className={tableHeader}>
                      <th className="text-left px-4 py-2.5">Item</th>
                      <th className="text-right px-3 py-2.5 hidden md:table-cell">Making</th>
                      <th className="text-center px-3 py-2.5">Qty</th>
                      <th className="text-right px-3 py-2.5">Unit Price</th>
                      <th className="text-right px-3 py-2.5">Total</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((i) => (
                      <tr key={i.id} className={tableRow}>
                        <td className={tableCell}>
                          <div className="font-semibold text-gray-900">{i.name}</div>
                          <div className={`${mutedText} flex items-center gap-1.5 mt-0.5`}>
                            <Hash className="w-3 h-3" />{i.itemCode}
                            <span className="text-gray-300">·</span>{i.weight}g
                            <span className="text-gray-300">·</span><span className="bg-amber-100 text-amber-700 px-1 rounded text-xs">{i.goldType}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right hidden md:table-cell">
                          <span className={mutedText}>{formatINR(i.makingCharges * i.qty)}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => updateQty(i.id, -1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"><Minus className="w-3 h-3" /></button>
                            <span className="w-8 text-center font-semibold text-gray-900">{i.qty}</span>
                            <button onClick={() => updateQty(i.id, 1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right text-gray-600">{formatINR(i.sellingPrice)}</td>
                        <td className="px-3 py-3 text-right font-bold text-gray-900">{formatINR(i.sellingPrice * i.qty)}</td>
                        <td className="px-3 py-3">
                          <button onClick={() => removeItem(i.id)} className={btnDangerGhost}><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {cart.length > 0 && (
                    <tfoot>
                      <tr className={tableFooter}>
                        <td colSpan={2} className="px-4 py-2.5 text-xs text-gray-500 hidden md:table-cell">Total Weight: <span className="font-semibold text-gray-700">{totalWeight.toFixed(2)}g</span></td>
                        <td className="px-3 py-2.5 text-xs text-gray-500 text-center font-semibold">{totalQty}</td>
                        <td className="hidden md:table-cell" />
                        <td className="px-3 py-2.5 text-right font-bold text-gray-900">{formatINR(subtotal)}</td>
                        <td />
                      </tr>
                    </tfoot>
                  )}
                </table>
              )}
            </div>
          </div>
        </div>

        {/* ── Right column — Bill Summary ── */}
        <div className={`${card} border-2 flex flex-col overflow-y-auto`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-yellow-50">
            <div className="flex items-center gap-2">
              <div className={`${iconBox.md} bg-amber-500 shadow-sm`}><Receipt className="w-4 h-4 text-white" /></div>
              <div>
                <h3 className="font-bold text-gray-900">Bill Summary</h3>
                <p className={mutedText}>Invoice preview</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-4">
            {/* Gold Rate */}
            <div className={panel.amber}>
              <label className="text-xs font-semibold text-amber-800 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <Layers className="w-3.5 h-3.5" />Gold Rate (22K)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-amber-700">₹</span>
                <input type="number" value={goldRate} onChange={(e) => setGoldRate(Number(e.target.value))} className={`${input} flex-1 border-amber-300 font-semibold text-amber-900`} />
                <span className="text-xs text-amber-600 font-medium whitespace-nowrap">/ gram</span>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className={`${panel.gray} rounded-none border-0 border-b border-gray-200 py-2 px-3`}>
                <span className={`${sectionLabel} flex items-center gap-1.5`}><Tag className="w-3.5 h-3.5" />Charge Breakdown</span>
              </div>
              <div className="p-3 space-y-0">
                {/* Per-item summary */}
                {cart.length > 0 && (
                  <div className="mb-3 space-y-1.5">
                    {cart.map((i) => (
                      <div key={i.id} className="flex items-start justify-between text-xs py-1 border-b border-gray-50 last:border-0">
                        <div className="flex-1 pr-2">
                          <div className="font-medium text-gray-800 truncate">{i.name}</div>
                          <div className={mutedText}>{i.qty} × {formatINR(i.sellingPrice)}</div>
                        </div>
                        <span className="font-semibold text-gray-700 whitespace-nowrap">{formatINR(i.sellingPrice * i.qty)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {cart.length === 0 && <div className="text-center py-6 text-gray-300 text-xs">No items added yet</div>}

                <div className="space-y-2 pt-2 border-t border-dashed border-gray-200">
                  <SummaryRow label="Gold Value" sublabel={`${totalWeight.toFixed(2)}g × ₹${goldRate}/g`} value={formatINR(goldValue)} />
                  <SummaryRow label="Making Charges" sublabel={`${cart.length} item${cart.length !== 1 ? 's' : ''}`} value={formatINR(totalMaking)} muted />
                  <SummaryRow label="Subtotal" value={formatINR(subtotal)} bold />
                </div>

                <div className="space-y-2 pt-3 border-t border-dashed border-gray-200 mt-3">
                  <SummaryRow label="GST" sublabel="3% on subtotal" value={formatINR(gst)} />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-600">Discount</span>
                      {discount > 0 && <div className="text-xs text-emerald-600 font-medium">Applied</div>}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={mutedText}>₹</span>
                      <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} className={`w-24 ${inputRight}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-amber-100 text-xs font-semibold uppercase tracking-wider">Grand Total</div>
                    {cart.length > 0 && <div className="text-amber-200 text-xs mt-0.5">{totalQty} item{totalQty !== 1 ? 's' : ''} · {totalWeight.toFixed(2)}g gold</div>}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-white">{formatINR(total)}</div>
                    {discount > 0 && <div className="text-xs text-amber-200 mt-0.5">Saved {formatINR(discount)}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Sale Toggle */}
            <div className="border border-gray-200 rounded-xl p-3">
              <label className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCreditSale(!creditSale)}>
                <div className={toggleTrack(creditSale)}><div className={toggleThumb(creditSale)} /></div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-amber-600" />Credit Sale</div>
                  <div className={mutedText}>Add to customer outstanding</div>
                </div>
              </label>
              {creditSale && (
                <div className={`${panel.amber} mt-3`}>
                  <div className="text-xs text-amber-700 font-semibold uppercase mb-1">Outstanding Amount</div>
                  <div className="text-xl font-bold text-amber-600">{formatINR(total)}</div>
                  <div className="text-xs text-amber-600 mt-0.5">Will be added to {customer?.name || 'customer'}&apos;s dues</div>
                </div>
              )}
            </div>

            {/* Payment Mode */}
            {!creditSale && (
              <div>
                <label className={`${sectionLabel} mb-2 block`}>Payment Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ mode: 'Cash', icon: Banknote }, { mode: 'UPI', icon: Smartphone }, { mode: 'Card', icon: CreditCard }, { mode: 'Split', icon: Split }].map(({ mode, icon: Icon }) => (
                    <button key={mode} onClick={() => setPaymentMode(mode)} className={paymentMode === mode ? paymentBtn.active : paymentBtn.inactive}>
                      <Icon className="w-4 h-4" />{mode}
                    </button>
                  ))}
                </div>

                {paymentMode === 'Split' && (
                  <div className={`${panel.amber} mt-3 space-y-2`}>
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">Split Payment</div>
                    <div className="flex gap-2">
                      <select value={splitMode1} onChange={(e) => setSplitMode1(e.target.value)} className={`${inputSm} flex-1`}><option>Cash</option><option>UPI</option><option>Card</option></select>
                      <input type="number" value={splitAmt1} onChange={(e) => setSplitAmt1(Number(e.target.value) || 0)} placeholder="Amount" className={`${inputSm} w-28 text-right`} />
                    </div>
                    <div className="flex gap-2">
                      <select value={splitMode2} onChange={(e) => setSplitMode2(e.target.value)} className={`${inputSm} flex-1`}><option>UPI</option><option>Cash</option><option>Card</option></select>
                      <input type="number" value={splitAmt2} onChange={(e) => setSplitAmt2(Number(e.target.value) || 0)} placeholder="Amount" className={`${inputSm} w-28 text-right`} />
                    </div>
                    <div className={`text-xs font-semibold flex items-center gap-1 ${splitValid ? 'text-emerald-700' : 'text-red-600'}`}>
                      {splitValid ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      {splitValid ? `Split total matches ${formatINR(total)}` : `Split total ${formatINR(splitTotal)} ≠ ${formatINR(total)}`}
                    </div>
                  </div>
                )}

                {/* EMI Toggle */}
                <div className="mt-3 border border-gray-200 rounded-xl p-3">
                  <label className="flex items-center gap-2.5 cursor-pointer" onClick={() => setEmiEnabled(!emiEnabled)}>
                    <div className={toggleTrack(emiEnabled)}><div className={toggleThumb(emiEnabled)} /></div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5 text-amber-600" />Pay via EMI</div>
                      <div className={mutedText}>1.5% processing fee</div>
                    </div>
                  </label>
                  {emiEnabled && (
                    <div className="mt-3 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        {[3, 6, 12].map((m) => (
                          <button key={m} onClick={() => setEmiMonths(m)} className={emiMonths === m ? emiMonthBtn.active : emiMonthBtn.inactive}>{m} mo</button>
                        ))}
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between"><span>Processing fee (1.5%)</span><span className="font-semibold">{formatINR(emiFee)}</span></div>
                        <div className="flex justify-between"><span>Total payable</span><span className="font-semibold">{formatINR(total + emiFee)}</span></div>
                      </div>
                      <div className="p-2.5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg text-center">
                        <div className="text-xs text-amber-600 font-semibold">Monthly EMI</div>
                        <div className="text-lg font-extrabold text-amber-700">{formatINR(emiPerMonth)}<span className="text-xs font-normal"> / month × {emiMonths}</span></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 mt-auto pt-2">
              <button onClick={generateInvoice} disabled={!customer || cart.length === 0 || (!creditSale && !splitValid)} className={btnPrimaryFull}>
                {creditSale ? 'Save Credit Sale' : 'Generate Invoice'}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={holdBill} disabled={!customer || cart.length === 0} className={`${btnSecondary} flex items-center justify-center gap-1.5`}>
                  <Pause className="w-4 h-4" />Hold Bill
                </button>
                <button className={btnSecondary}>Save Draft</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showHeld && <HeldBillsModal bills={heldBills} onClose={() => setShowHeld(false)} onResume={resumeHeld} onDelete={(id) => setHeldBills(heldBills.filter((x) => x.id !== id))} />}
      {showReturn && <ReturnBillModal onClose={() => setShowReturn(false)} onProcess={() => { setShowReturn(false); showToast('Return processed successfully'); }} />}
    </div>
  );
}

function StepBadge({ n, done, active }) {
  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${done ? 'bg-emerald-500 text-white' : active ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
      {done ? <Check className="w-3.5 h-3.5" /> : n}
    </div>
  );
}

function FlowStep({ step, label, active, done }) {
  return (
    <div className={`flex items-center gap-2 transition-opacity ${!active && !done ? 'opacity-40' : ''}`}>
      <StepBadge n={step} done={done} active={active} />
      <span className={`text-sm font-medium whitespace-nowrap ${active ? 'text-amber-700' : done ? 'text-emerald-700' : 'text-gray-500'}`}>{label}</span>
    </div>
  );
}

function SummaryRow({ label, sublabel, value, muted, bold }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <span className={bold ? 'text-sm font-bold text-gray-800' : muted ? 'text-xs text-gray-500' : 'text-sm text-gray-600'}>{label}</span>
        {sublabel && <div className={mutedText}>{sublabel}</div>}
      </div>
      <span className={bold ? 'text-sm font-bold text-gray-900' : muted ? 'text-xs text-gray-500' : 'text-sm text-gray-700 font-medium'}>{value}</span>
    </div>
  );
}

function HeldBillsModal({ bills, onClose, onResume, onDelete }) {
  return (
    <div className={modalOverlay}>
      <div className={`${modalBox} max-w-2xl`}>
        <div className={modalHeader}>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Held Bills</h3>
            <p className={mutedText}>{bills.length} bill{bills.length !== 1 ? 's' : ''} on hold</p>
          </div>
          <button onClick={onClose} className={btnGhost}><X className="w-5 h-5" /></button>
        </div>
        <div className={modalBody}>
          {bills.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <div className="text-sm font-medium">No held bills</div>
            </div>
          ) : bills.map((h) => (
            <div key={h.id} className={`${card} border-2 p-4 flex items-center justify-between hover:border-amber-200 transition-colors`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{h.id}</span>
                  <span className="text-sm font-semibold text-gray-900">{h.customerName}</span>
                </div>
                <div className={`${mutedText} flex items-center gap-2`}>
                  <span>{h.items.length} items</span>
                  <span className="text-gray-300">·</span>
                  <span className="font-semibold text-gray-700">{formatINR(h.total)}</span>
                  <span className="text-gray-300">·</span>
                  <span>Held: {h.heldAt}</span>
                </div>
                {h.note && <div className="text-xs text-amber-700 mt-1 bg-amber-50 px-2 py-0.5 rounded">Note: {h.note}</div>}
              </div>
              <div className="flex gap-2 ml-3">
                <button onClick={() => onResume(h)} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
                  <Play className="w-3 h-3" />Resume
                </button>
                <button onClick={() => onDelete(h.id)} className={btnDangerGhost}><Trash2 className="w-4 h-4" /></button>
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
      const simulatedItems = Array.from({ length: inv.items }).map((_, idx) => ({ id: idx, name: `Item ${idx + 1}`, price: Math.round(inv.subtotal / inv.items) }));
      setFound({ ...inv, itemsList: simulatedItems });
    } else {
      setFound({ error: true });
    }
  };
  const refund = Object.keys(selectedItems).filter((k) => selectedItems[k]).reduce((s, k) => s + (found?.itemsList?.find((it) => it.id === Number(k))?.price || 0), 0);
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <div className={modalOverlay}>
      <div className={`${modalBox} max-w-lg`}>
        <div className={modalHeader}>
          <div>
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><RotateCcw className="w-5 h-5 text-red-500" />Return Bill</h3>
            <p className={mutedText}>Process item returns &amp; refunds</p>
          </div>
          <button onClick={onClose} className={btnGhost}><X className="w-5 h-5" /></button>
        </div>
        <div className={modalBody}>
          <div>
            <label className={`${sectionLabel} mb-2`}>Original Invoice #</label>
            <div className="flex gap-2">
              <input value={invNo} onChange={(e) => setInvNo(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && lookup()} placeholder="e.g. INV-1010" className={input} />
              <button onClick={lookup} className={btnPrimary}>Lookup</button>
            </div>
          </div>

          {found?.error && (
            <div className={`${panel.red} flex items-center gap-2 text-red-700 text-sm`}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />Invoice not found. Try INV-1010, INV-1005 etc.
            </div>
          )}

          {found && !found.error && (
            <>
              <div className={panel.emerald}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-emerald-800">{found.id}</span>
                  <span className="text-sm text-gray-700">· {found.customerName}</span>
                </div>
                <div className={mutedText}>Date: {formatDate(found.date)} · Total: <span className="font-semibold">{formatINR(found.totalAmount)}</span> · <span className={statusBadge(found.status)}>{found.status}</span></div>
              </div>
              <div>
                <label className={`${sectionLabel} mb-2 block`}>Select Items to Return</label>
                <div className="space-y-2">
                  {found.itemsList.map((it) => (
                    <label key={it.id} className={`${card} border-2 p-3 flex items-center gap-3 cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all`}>
                      <input type="checkbox" checked={!!selectedItems[it.id]} onChange={(e) => setSelectedItems({ ...selectedItems, [it.id]: e.target.checked })} className="w-4 h-4 accent-amber-500" />
                      <span className="flex-1 text-sm font-medium text-gray-800">{it.name}</span>
                      <span className="font-bold text-sm text-gray-900">{formatINR(it.price)}</span>
                    </label>
                  ))}
                </div>
                <div className={`${panel.amber} mt-4 flex justify-between items-center`}>
                  <div>
                    <div className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Refund Amount</div>
                    <div className={mutedText}>{selectedCount} item{selectedCount !== 1 ? 's' : ''} selected</div>
                  </div>
                  <span className="text-2xl font-extrabold text-amber-700">{formatINR(refund)}</span>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={onClose} className={btnSecondary}>Cancel</button>
                <button onClick={onProcess} disabled={refund === 0} className={`${btnDanger} flex items-center gap-2`}>
                  <RotateCcw className="w-4 h-4" />Process Return
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
