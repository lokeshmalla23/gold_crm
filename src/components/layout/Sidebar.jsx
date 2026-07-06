import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Gem, Receipt, ShoppingBag, ArrowLeftRight, PiggyBank, Truck, UserCog, BarChart3, Megaphone, Settings, ChevronsLeft, ChevronsRight, LogOut, Wrench, FileText, BookOpen, TrendingUp, ShoppingCart, Factory, BookMarked } from 'lucide-react';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/inventory', label: 'Jewellery Inventory', icon: Gem },
  { to: '/billing', label: 'Billing / POS', icon: Receipt },
  { to: '/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/repairs', label: 'Repairs', icon: Wrench },
  { to: '/quotations', label: 'Quotations', icon: FileText },
  { to: '/old-gold', label: 'Old Gold Exchange', icon: ArrowLeftRight },
  { to: '/savings', label: 'Savings Schemes', icon: PiggyBank },
  { to: '/purchase', label: 'Purchase', icon: ShoppingCart },
  { to: '/karigar', label: 'Manufacturing', icon: Factory },
  { to: '/products', label: 'Product Master', icon: BookMarked },
  { to: '/accounts', label: 'Accounts', icon: BookOpen },
  { to: '/gold-rate', label: 'Gold Rate', icon: TrendingUp },
  { to: '/suppliers', label: 'Suppliers', icon: Truck },
  { to: '/staff', label: 'Staff', icon: UserCog },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/marketing', label: 'Marketing', icon: Megaphone },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('goldcrm_auth');
    navigate('/');
  };

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100">
        <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white font-bold shadow-sm">
            GC
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-gray-900 leading-tight">Gold CRM</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Jeweller Suite</div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-700 border-l-2 border-amber-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              title={collapsed ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-2 border-t border-gray-100 space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          title={collapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          {collapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
