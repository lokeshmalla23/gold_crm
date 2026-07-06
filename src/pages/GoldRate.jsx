import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Bell, RefreshCw, Check, Plus, Trash2 } from 'lucide-react';
import { goldRateHistory, shopSettings, formatINR, formatDate } from '../data/mockData';
import * as cls from '../styles/classes';
import NumberInput from '../components/ui/NumberInput';

export default function GoldRate() {
  const latest = goldRateHistory[goldRateHistory.length - 1];
  const prev = goldRateHistory[goldRateHistory.length - 2];

  const [rate22K, setRate22K] = useState(shopSettings.goldRates['22K']);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString('en-IN'));
  const [toast, setToast] = useState('');
  const [show22, setShow22] = useState(true);
  const [show24, setShow24] = useState(true);
  const [show18, setShow18] = useState(true);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'High', target: 6500, purity: '22K', active: true },
    { id: 2, type: 'Low', target: 6000, purity: '22K', active: true },
    { id: 3, type: 'High', target: 7000, purity: '24K', active: false }
  ]);
  const [newAlert, setNewAlert] = useState({ type: 'High', target: '', purity: '22K' });
  const [mcxKey, setMcxKey] = useState(0);

  const auto24 = Math.round(rate22K * 1.0909);
  const auto18 = Math.round(rate22K * 0.8182);

  const change22 = latest.rate22K - prev.rate22K;
  const change24 = latest.rate24K - prev.rate24K;
  const change18 = latest.rate18K - prev.rate18K;

  const updateRates = () => {
    setLastUpdated(new Date().toLocaleString('en-IN'));
    setToast('Gold rate updated successfully');
    setTimeout(() => setToast(''), 3000);
  };

  const addAlert = () => {
    if (!newAlert.target) return;
    setAlerts((a) => [...a, { id: Date.now(), ...newAlert, target: Number(newAlert.target), active: true }]);
    setNewAlert({ type: 'High', target: '', purity: '22K' });
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-5 h-5" />{toast}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RateCard label="22K Gold" rate={latest.rate22K} change={change22} color="from-amber-400 to-yellow-500" />
        <RateCard label="24K Gold" rate={latest.rate24K} change={change24} color="from-yellow-500 to-amber-600" />
        <RateCard label="18K Gold" rate={latest.rate18K} change={change18} color="from-amber-300 to-yellow-400" />
      </div>

      <div className={cls.cardMd}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Gold Rate History — Last 30 Days</h3>
            <p className={cls.mutedText}>Track price movements across purities</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={show22} onChange={(e) => setShow22(e.target.checked)} /> 22K</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={show24} onChange={(e) => setShow24(e.target.checked)} /> 24K</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={show18} onChange={(e) => setShow18(e.target.checked)} /> 18K</label>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={goldRateHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickFormatter={(d) => d.slice(5)} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip formatter={(v) => formatINR(v)} />
            <Legend />
            {show22 && <Line type="monotone" dataKey="rate22K" name="22K" stroke="#F59E0B" strokeWidth={2} dot={false} />}
            {show24 && <Line type="monotone" dataKey="rate24K" name="24K" stroke="#D97706" strokeWidth={2} dot={false} />}
            {show18 && <Line type="monotone" dataKey="rate18K" name="18K" stroke="#FBBF24" strokeWidth={2} dot={false} />}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={cls.cardMd}>
          <h3 className="font-semibold text-gray-900 mb-1">Manual Rate Update</h3>
          <p className={`${cls.mutedText} mb-4`}>Update 22K — 24K and 18K auto-calculated</p>
          <div className="space-y-3">
            <div>
              <label className={cls.fieldLabel}>22K Gold Rate (₹/gram) *</label>
              <NumberInput value={rate22K} onChange={(v) => setRate22K(Number(v) || 0)} className={`mt-1 ${cls.input}`} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={cls.fieldLabel}>24K (auto)</label>
                <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium">{formatINR(auto24)}</div>
              </div>
              <div>
                <label className={cls.fieldLabel}>18K (auto)</label>
                <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium">{formatINR(auto18)}</div>
              </div>
            </div>
            <div className={cls.mutedText}>Last updated: {lastUpdated}</div>
            <button onClick={updateRates} className={cls.btnPrimaryFull}>Update Rates</button>
          </div>
        </div>

        <div className={cls.cardMd}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">MCX Live Rates</h3>
            <button onClick={() => setMcxKey((k) => k + 1)} className={cls.btnGhost}><RefreshCw className="w-4 h-4" /></button>
          </div>
          <p className={`${cls.mutedText} mb-4`}>Reference spot rates from MCX exchange</p>
          <div key={mcxKey} className="space-y-3">
            <div className={`${cls.panel.amber} p-4`}>
              <div className="text-xs text-amber-700 uppercase">MCX Spot Gold (24K)</div>
              <div className="text-2xl font-bold text-amber-700 mt-1">₹ 68,450 <span className="text-sm font-normal">per 10g</span></div>
              <div className="text-xs text-gray-500 mt-1">Last synced: 2 min ago</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">MCX Silver</div>
                <div className="font-semibold">₹ 82,340/kg</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">USD/INR</div>
                <div className="font-semibold">₹ 83.42</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cls.cardMd}>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-gray-900">Rate Alerts</h3>
        </div>
        <div className="flex gap-2 mb-4 flex-wrap">
          <select value={newAlert.type} onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })} className={cls.inputSm}>
            <option>High</option>
            <option>Low</option>
          </select>
          <select value={newAlert.purity} onChange={(e) => setNewAlert({ ...newAlert, purity: e.target.value })} className={cls.inputSm}>
            <option>22K</option><option>24K</option><option>18K</option>
          </select>
          <NumberInput placeholder="Target rate ₹" value={newAlert.target} onChange={(v) => setNewAlert({ ...newAlert, target: v })} className={cls.inputSm} />
          <button onClick={addAlert} className={`${cls.btnPrimary} text-sm flex items-center gap-1.5`}><Plus className="w-4 h-4" />Add Alert</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className={cls.tableHeader}>
              <th className="text-left px-3 py-2">Type</th>
              <th className="text-left px-3 py-2">Purity</th>
              <th className="text-left px-3 py-2">Target</th>
              <th className="text-left px-3 py-2">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className={cls.tableRow}>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 ${a.type === 'High' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {a.type === 'High' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {a.type}
                  </span>
                </td>
                <td className="px-3 py-2">{a.purity}</td>
                <td className="px-3 py-2 font-medium">{formatINR(a.target)}</td>
                <td className="px-3 py-2">
                  <span className={`${cls.badge} ${a.active ? cls.badgeColor.green : cls.badgeColor.gray}`}>{a.active ? 'Active' : 'Inactive'}</span>
                </td>
                <td className="px-3 py-2">
                  <button onClick={() => setAlerts((al) => al.filter((x) => x.id !== a.id))} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RateCard({ label, rate, change, color }) {
  const positive = change >= 0;
  return (
    <div className={`bg-gradient-to-br ${color} text-white rounded-xl p-5 shadow-sm`}>
      <div className="text-sm opacity-90 font-medium">{label}</div>
      <div className="text-3xl font-bold mt-2">₹ {rate.toLocaleString('en-IN')}<span className="text-sm ml-1 opacity-80">/g</span></div>
      <div className="mt-2 flex items-center gap-1 text-sm">
        {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="font-semibold">{positive ? '+' : ''}{change}</span>
        <span className="opacity-80">vs yesterday</span>
      </div>
    </div>
  );
}
