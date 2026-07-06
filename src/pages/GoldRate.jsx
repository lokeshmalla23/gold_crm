import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Bell, RefreshCw, Check, Plus, Trash2 } from 'lucide-react';
import { goldRateHistory, shopSettings, formatINR, formatDate } from '../data/mockData';

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

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Gold Rate History — Last 30 Days</h3>
            <p className="text-xs text-gray-500">Track price movements across purities</p>
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
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-1">Manual Rate Update</h3>
          <p className="text-xs text-gray-500 mb-4">Update 22K — 24K and 18K auto-calculated</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700">22K Gold Rate (₹/gram) *</label>
              <input type="number" value={rate22K} onChange={(e) => setRate22K(Number(e.target.value) || 0)} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700">24K (auto)</label>
                <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium">{formatINR(auto24)}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">18K (auto)</label>
                <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium">{formatINR(auto18)}</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Last updated: {lastUpdated}</div>
            <button onClick={updateRates} className="w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-medium text-sm">Update Rates</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">MCX Live Rates</h3>
            <button onClick={() => setMcxKey((k) => k + 1)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><RefreshCw className="w-4 h-4" /></button>
          </div>
          <p className="text-xs text-gray-500 mb-4">Reference spot rates from MCX exchange</p>
          <div key={mcxKey} className="space-y-3">
            <div className="p-4 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
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

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-gray-900">Rate Alerts</h3>
        </div>
        <div className="flex gap-2 mb-4 flex-wrap">
          <select value={newAlert.type} onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option>High</option>
            <option>Low</option>
          </select>
          <select value={newAlert.purity} onChange={(e) => setNewAlert({ ...newAlert, purity: e.target.value })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option>22K</option><option>24K</option><option>18K</option>
          </select>
          <input type="number" placeholder="Target rate ₹" value={newAlert.target} onChange={(e) => setNewAlert({ ...newAlert, target: e.target.value })} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          <button onClick={addAlert} className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" />Add Alert</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-600">
              <th className="text-left px-3 py-2">Type</th>
              <th className="text-left px-3 py-2">Purity</th>
              <th className="text-left px-3 py-2">Target</th>
              <th className="text-left px-3 py-2">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className="border-b border-gray-50 last:border-0">
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 ${a.type === 'High' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {a.type === 'High' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {a.type}
                  </span>
                </td>
                <td className="px-3 py-2">{a.purity}</td>
                <td className="px-3 py-2 font-medium">{formatINR(a.target)}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${a.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{a.active ? 'Active' : 'Inactive'}</span>
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
