import { useEffect, useRef, useState } from 'react';
import { Bell, Search, HelpCircle, Moon, Sun, AlertTriangle, Cake, Wrench, PiggyBank, Receipt, Heart, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { notifications as initialNotifications, customers, inventory, invoices } from '../../data/mockData';

const titles = {
  '/dashboard': 'Dashboard',
  '/customers': 'Customers',
  '/inventory': 'Jewellery Inventory',
  '/billing': 'Billing / POS',
  '/orders': 'Orders',
  '/repairs': 'Repairs',
  '/quotations': 'Quotations',
  '/old-gold': 'Old Gold Exchange',
  '/savings': 'Savings Schemes',
  '/accounts': 'Accounts',
  '/gold-rate': 'Gold Rate',
  '/suppliers': 'Suppliers',
  '/staff': 'Staff Management',
  '/reports': 'Reports',
  '/marketing': 'Marketing',
  '/settings': 'Settings'
};

const iconMap = {
  alert: AlertTriangle,
  cake: Cake,
  wrench: Wrench,
  piggy: PiggyBank,
  sale: Receipt,
  heart: Heart
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  let title = titles[location.pathname] || 'Gold CRM';
  if (location.pathname.startsWith('/customers/')) title = 'Customer Profile';

  const [showNotif, setShowNotif] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifications);
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [dark, setDark] = useState(() => typeof localStorage !== 'undefined' && localStorage.getItem('goldcrm_dark') === 'true');
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    if (typeof localStorage !== 'undefined') localStorage.setItem('goldcrm_dark', String(dark));
  }, [dark]);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));

  const searchResults = (() => {
    if (!search) return null;
    const q = search.toLowerCase();
    return {
      customers: customers.filter((c) => c.name.toLowerCase().includes(q) || c.mobile.includes(q)).slice(0, 5),
      inventory: inventory.filter((i) => i.name.toLowerCase().includes(q) || i.itemCode.toLowerCase().includes(q)).slice(0, 5),
      invoices: invoices.filter((i) => i.id.toLowerCase().includes(q) || i.customerName.toLowerCase().includes(q)).slice(0, 5)
    };
  })();

  const totalResults = searchResults ? (searchResults.customers.length + searchResults.inventory.length + searchResults.invoices.length) : 0;

  const goTo = (path) => { setShowResults(false); setSearch(''); navigate(path); };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <p className="text-xs text-gray-500">Welcome back, manage your jewellery business</p>
      </div>
      <div className="flex items-center gap-3">
        <div ref={searchRef} className="relative hidden md:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
            onFocus={() => setShowResults(true)}
            placeholder="Search customers, inventory, invoices..."
            className="pl-9 pr-4 py-2 w-80 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
          />
          {showResults && search && (
            <div className="absolute top-full mt-1 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-96 overflow-y-auto">
              {totalResults === 0 ? (
                <div className="p-4 text-sm text-gray-500 text-center">No results found</div>
              ) : (
                <>
                  {searchResults.customers.length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50">Customers ({searchResults.customers.length})</div>
                      {searchResults.customers.map((c) => (
                        <button key={c.id} onClick={() => goTo(`/customers/${c.id}`)} className="w-full px-3 py-2 hover:bg-amber-50 text-left flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">{c.name[0]}</div>
                          <div>
                            <div className="text-sm font-medium">{c.name}</div>
                            <div className="text-xs text-gray-500">{c.mobile}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchResults.inventory.length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50">Inventory ({searchResults.inventory.length})</div>
                      {searchResults.inventory.map((i) => (
                        <button key={i.id} onClick={() => goTo('/inventory')} className="w-full px-3 py-2 hover:bg-amber-50 text-left">
                          <div className="text-sm font-medium">{i.name}</div>
                          <div className="text-xs text-gray-500">{i.itemCode} · {i.weight}g {i.goldType}</div>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchResults.invoices.length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50">Invoices ({searchResults.invoices.length})</div>
                      {searchResults.invoices.map((i) => (
                        <button key={i.id} onClick={() => goTo('/billing')} className="w-full px-3 py-2 hover:bg-amber-50 text-left">
                          <div className="text-sm font-medium">{i.id} · {i.customerName}</div>
                          <div className="text-xs text-gray-500">{i.date} · {i.paymentMode}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <button onClick={() => setDark((d) => !d)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" title="Toggle dark mode">
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div ref={notifRef} className="relative">
          <button onClick={() => setShowNotif((v) => !v)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 relative">
            <Bell className="w-5 h-5" />
            {unread > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">{unread}</span>}
          </button>
          {showNotif && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-xl z-40 max-h-[500px] flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="font-semibold text-gray-900">Notifications</div>
                <div className="flex items-center gap-2">
                  <button onClick={markAllRead} className="text-xs text-amber-600 font-medium hover:text-amber-700">Mark all read</button>
                  <button onClick={() => setShowNotif(false)} className="p-1 rounded hover:bg-gray-100"><X className="w-4 h-4 text-gray-400" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {notifs.map((n) => {
                  const Icon = iconMap[n.icon] || Bell;
                  return (
                    <button key={n.id} onClick={() => { setShowNotif(false); navigate(n.link); setNotifs((all) => all.map((x) => x.id === n.id ? { ...x, read: true } : x)); }} className={`w-full px-3 py-3 flex gap-3 hover:bg-gray-50 text-left border-b border-gray-50 last:border-0 ${!n.read ? 'bg-amber-50/50 border-l-2 border-l-amber-400' : ''}`}>
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{n.title}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{n.message}</div>
                        <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>}
                    </button>
                  );
                })}
              </div>
              <div className="p-2 border-t border-gray-100 text-center">
                <button className="text-xs text-amber-600 font-medium hover:text-amber-700">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-white font-semibold flex items-center justify-center text-sm">
            SC
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-gray-900">Suresh C.</div>
            <div className="text-xs text-gray-500">Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
}
