import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerProfile from './pages/CustomerProfile';
import Inventory from './pages/Inventory';
import Billing from './pages/Billing';
import Orders from './pages/Orders';
import OldGoldExchange from './pages/OldGoldExchange';
import SavingsScheme from './pages/SavingsScheme';
import Suppliers from './pages/Suppliers';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Marketing from './pages/Marketing';
import Settings from './pages/Settings';
import Repairs from './pages/Repairs';
import Quotations from './pages/Quotations';
import Accounts from './pages/Accounts';
import GoldRate from './pages/GoldRate';
import Purchase from './pages/Purchase';
import Karigar from './pages/Karigar';
import ProductMaster from './pages/ProductMaster';

function RequireAuth({ children }) {
  const isAuth = typeof localStorage !== 'undefined' && localStorage.getItem('goldcrm_auth') === 'true';
  return isAuth ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerProfile />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/old-gold" element={<OldGoldExchange />} />
          <Route path="/savings" element={<SavingsScheme />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/gold-rate" element={<GoldRate />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/karigar" element={<Karigar />} />
          <Route path="/products" element={<ProductMaster />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
