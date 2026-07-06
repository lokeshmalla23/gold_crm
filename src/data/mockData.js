// Mock data for Gold Shop CRM

export const GOLD_RATE = 6250; // ₹ per gram (22K)

export const formatINR = (n) => {
  if (n === null || n === undefined || isNaN(n)) return '₹0';
  return '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

export const formatDate = (d) => {
  if (!d) return '-';
  const date = new Date(d);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const customers = [
  { id: 1, name: 'Aarav Sharma', mobile: '9876543210', email: 'aarav@example.com', address: '12 MG Road, Mumbai', birthday: '1988-03-15', anniversary: '2015-11-20', totalPurchases: 850000, lastVisit: '2026-06-14', type: 'VIP', notes: 'Prefers 22K gold. Interested in diamond rings.', purchaseHistory: [ { id: 'INV-1001', date: '2026-06-14', amount: 245000, items: 2 }, { id: 'INV-0954', date: '2026-03-02', amount: 180000, items: 1 }, { id: 'INV-0801', date: '2025-11-20', amount: 425000, items: 3 } ], payments: [ { date: '2026-06-14', amount: 245000, mode: 'UPI' }, { date: '2026-03-02', amount: 180000, mode: 'Card' } ], wishlist: [{ name: 'Diamond Necklace', price: 350000 }, { name: 'Solitaire Ring', price: 180000 }], savingsPlans: [{ plan: 'Gold Monthly ₹10K', paid: 60000, months: 6 }] },
  { id: 2, name: 'Priya Patel', mobile: '9823456712', email: 'priya.patel@example.com', address: '45 Lake View, Ahmedabad', birthday: '1992-07-08', anniversary: '2018-01-14', totalPurchases: 320000, lastVisit: '2026-05-22', type: 'Premium', notes: 'Bridal customer.', purchaseHistory: [ { id: 'INV-0987', date: '2026-05-22', amount: 145000, items: 2 }, { id: 'INV-0800', date: '2025-10-12', amount: 175000, items: 4 } ], payments: [ { date: '2026-05-22', amount: 145000, mode: 'Cash' } ], wishlist: [{ name: 'Kada Set', price: 240000 }], savingsPlans: [] },
  { id: 3, name: 'Rahul Verma', mobile: '9812345670', email: 'rahul.v@example.com', address: '78 Sector 22, Chandigarh', birthday: '1985-11-30', anniversary: '2012-05-25', totalPurchases: 1250000, lastVisit: '2026-06-30', type: 'VIP', notes: 'Long-time customer since 2015.', purchaseHistory: [ { id: 'INV-1010', date: '2026-06-30', amount: 425000, items: 3 } ], payments: [ { date: '2026-06-30', amount: 425000, mode: 'Card' } ], wishlist: [], savingsPlans: [{ plan: 'Gold Quarterly ₹50K', paid: 200000, months: 4 }] },
  { id: 4, name: 'Sneha Reddy', mobile: '9845123670', email: 'sneha.r@example.com', address: '23 Jubilee Hills, Hyderabad', birthday: '1990-04-12', anniversary: '2017-12-11', totalPurchases: 190000, lastVisit: '2026-04-18', type: 'Regular', notes: '', purchaseHistory: [ { id: 'INV-0925', date: '2026-04-18', amount: 62000, items: 1 } ], payments: [{ date: '2026-04-18', amount: 62000, mode: 'UPI' }], wishlist: [{ name: 'Gold Chain 18g', price: 118000 }], savingsPlans: [] },
  { id: 5, name: 'Vikram Singh', mobile: '9887654321', email: 'vikram@example.com', address: '9 Civil Lines, Jaipur', birthday: '1978-09-05', anniversary: '2005-02-14', totalPurchases: 2100000, lastVisit: '2026-06-28', type: 'VIP', notes: 'Bulk buyer, corporate gifting.', purchaseHistory: [ { id: 'INV-1008', date: '2026-06-28', amount: 650000, items: 5 } ], payments: [{ date: '2026-06-28', amount: 650000, mode: 'Cheque' }], wishlist: [], savingsPlans: [] },
  { id: 6, name: 'Ananya Iyer', mobile: '9865432109', email: 'ananya.i@example.com', address: '56 Anna Nagar, Chennai', birthday: '1994-07-06', anniversary: '2020-06-15', totalPurchases: 410000, lastVisit: '2026-06-01', type: 'Premium', notes: 'Anniversary this month.', purchaseHistory: [ { id: 'INV-0994', date: '2026-06-01', amount: 165000, items: 2 } ], payments: [{ date: '2026-06-01', amount: 165000, mode: 'UPI' }], wishlist: [{ name: 'Diamond Studs', price: 85000 }], savingsPlans: [{ plan: 'Bridal ₹25K', paid: 150000, months: 6 }] },
  { id: 7, name: 'Karan Mehta', mobile: '9812345988', email: 'karan.m@example.com', address: '34 Bandra West, Mumbai', birthday: '1987-02-19', anniversary: '2014-11-30', totalPurchases: 550000, lastVisit: '2026-05-10', type: 'Premium', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 8, name: 'Divya Nair', mobile: '9800123456', email: 'divya.n@example.com', address: '11 MG Road, Kochi', birthday: '1991-07-06', anniversary: '2018-09-22', totalPurchases: 145000, lastVisit: '2026-03-14', type: 'Regular', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 9, name: 'Rohit Kapoor', mobile: '9976543210', email: 'rohit.k@example.com', address: '78 Rajouri Garden, Delhi', birthday: '1983-12-25', anniversary: '2010-01-15', totalPurchases: 970000, lastVisit: '2026-06-20', type: 'VIP', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 10, name: 'Meera Joshi', mobile: '9845098765', email: 'meera.j@example.com', address: '5 Koregaon Park, Pune', birthday: '1995-08-11', anniversary: '2021-04-08', totalPurchases: 220000, lastVisit: '2026-05-30', type: 'Regular', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 11, name: 'Sanjay Gupta', mobile: '9871122334', email: 'sanjay.g@example.com', address: '90 CP, Delhi', birthday: '1975-06-06', anniversary: '2001-12-05', totalPurchases: 3200000, lastVisit: '2026-06-25', type: 'VIP', notes: 'Diamond enthusiast.', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 12, name: 'Nisha Bhat', mobile: '9767123456', email: 'nisha.b@example.com', address: '3 Indiranagar, Bengaluru', birthday: '1993-01-29', anniversary: '2019-07-14', totalPurchases: 385000, lastVisit: '2026-06-18', type: 'Premium', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 13, name: 'Arjun Menon', mobile: '9800987612', email: 'arjun.m@example.com', address: '22 Marine Drive, Kochi', birthday: '1989-10-17', anniversary: '2016-08-20', totalPurchases: 265000, lastVisit: '2026-04-25', type: 'Regular', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 14, name: 'Pooja Desai', mobile: '9834561278', email: 'pooja.d@example.com', address: '15 Satellite, Ahmedabad', birthday: '1990-05-19', anniversary: '2018-10-30', totalPurchases: 495000, lastVisit: '2026-06-12', type: 'Premium', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 15, name: 'Manish Tiwari', mobile: '9787654321', email: 'manish.t@example.com', address: '67 Hazratganj, Lucknow', birthday: '1980-03-22', anniversary: '2007-11-11', totalPurchases: 720000, lastVisit: '2026-05-15', type: 'VIP', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 16, name: 'Kavya Rao', mobile: '9812309871', email: 'kavya.r@example.com', address: '4 HSR Layout, Bengaluru', birthday: '1996-09-10', anniversary: '2022-02-14', totalPurchases: 130000, lastVisit: '2026-05-05', type: 'Regular', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 17, name: 'Aditya Malhotra', mobile: '9789871234', email: 'aditya.m@example.com', address: '19 GK-1, Delhi', birthday: '1986-11-11', anniversary: '2013-06-06', totalPurchases: 890000, lastVisit: '2026-06-08', type: 'VIP', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 18, name: 'Riya Chatterjee', mobile: '9867123409', email: 'riya.c@example.com', address: '32 Park Street, Kolkata', birthday: '1992-04-18', anniversary: '2019-12-02', totalPurchases: 310000, lastVisit: '2026-05-25', type: 'Premium', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 19, name: 'Suresh Kumar', mobile: '9754321098', email: 'suresh.k@example.com', address: '8 T Nagar, Chennai', birthday: '1970-07-04', anniversary: '1995-05-15', totalPurchases: 1450000, lastVisit: '2026-06-22', type: 'VIP', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 20, name: 'Isha Kulkarni', mobile: '9812098763', email: 'isha.k@example.com', address: '11 Kothrud, Pune', birthday: '1994-12-01', anniversary: '2021-09-18', totalPurchases: 175000, lastVisit: '2026-04-30', type: 'Regular', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 21, name: 'Deepak Choudhary', mobile: '9812323456', email: 'deepak.c@example.com', address: '90 Model Town, Ludhiana', birthday: '1984-08-29', anniversary: '2011-10-10', totalPurchases: 620000, lastVisit: '2026-06-05', type: 'Premium', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] },
  { id: 22, name: 'Anjali Trivedi', mobile: '9834567823', email: 'anjali.t@example.com', address: '5 Gulmohar Park, Delhi', birthday: '1997-06-25', anniversary: '2023-01-20', totalPurchases: 95000, lastVisit: '2026-03-20', type: 'Regular', notes: '', purchaseHistory: [], payments: [], wishlist: [], savingsPlans: [] }
];

const categories = ['Rings', 'Chains', 'Bangles', 'Necklace', 'Earrings', 'Coins'];
const purities = ['22K', '24K', '18K'];
const stockStatuses = ['In Stock', 'Out of Stock', 'Restock'];

export const inventory = [
  { id: 1,  itemCode: 'GR-001', barcode: '8901234567890', name: 'Classic Gold Ring',      category: 'Rings',    goldType: '22K', weight: 8.5,  purity: '916', makingCharges: 6500,  wastage: 4, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 48000,  sellingPrice: 62000,  stockStatus: 'In Stock',     qty: 12, rating: 4.5, image: '#F59E0B' },
  { id: 2,  itemCode: 'GC-002', barcode: '8901234567891', name: 'Rope Chain 20g',         category: 'Chains',   goldType: '22K', weight: 20,   purity: '916', makingCharges: 12000, wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 115000, sellingPrice: 138000, stockStatus: 'In Stock',     qty: 8,  rating: 4.7, image: '#D97706' },
  { id: 3,  itemCode: 'GB-003', barcode: '8901234567892', name: 'Bridal Bangle Set',      category: 'Bangles',  goldType: '22K', weight: 45,   purity: '916', makingCharges: 32000, wastage: 6, stoneType: 'Polki',   stoneWeight: 1.5, stoneCharges: 8000,  purchasePrice: 265000, sellingPrice: 320000, stockStatus: 'In Stock',     qty: 3,  rating: 4.9, image: '#FBBF24' },
  { id: 4,  itemCode: 'GN-004', barcode: '8901234567893', name: 'Antique Necklace',       category: 'Necklace', goldType: '22K', weight: 35,   purity: '916', makingCharges: 28000, wastage: 6, stoneType: 'Ruby',    stoneWeight: 2.0, stoneCharges: 8500,  purchasePrice: 210000, sellingPrice: 258000, stockStatus: 'Restock',      qty: 1,  rating: 4.6, image: '#F97316' },
  { id: 5,  itemCode: 'GE-005', barcode: '8901234567894', name: 'Diamond Studs',          category: 'Earrings', goldType: '18K', weight: 3.2,  purity: '750', makingCharges: 8500,  wastage: 3, stoneType: 'Diamond', stoneWeight: 0.8, stoneCharges: 18000, purchasePrice: 72000,  sellingPrice: 88000,  stockStatus: 'In Stock',     qty: 15, rating: 4.4, image: '#F59E0B' },
  { id: 6,  itemCode: 'CO-006', barcode: '8901234567895', name: 'Gold Coin 10g',          category: 'Coins',    goldType: '24K', weight: 10,   purity: '999', makingCharges: 500,   wastage: 0, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 68000,  sellingPrice: 72000,  stockStatus: 'In Stock',     qty: 25, rating: 5.0, image: '#EAB308' },
  { id: 7,  itemCode: 'GR-007', barcode: '8901234567896', name: 'Diamond Solitaire Ring', category: 'Rings',    goldType: '18K', weight: 5.5,  purity: '750', makingCharges: 12000, wastage: 3, stoneType: 'Diamond', stoneWeight: 0.5, stoneCharges: 85000, purchasePrice: 145000, sellingPrice: 180000, stockStatus: 'In Stock',     qty: 5,  rating: 4.8, image: '#D97706' },
  { id: 8,  itemCode: 'GC-008', barcode: '8901234567897', name: 'Kada Bracelet',          category: 'Bangles',  goldType: '22K', weight: 28,   purity: '916', makingCharges: 18000, wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 160000, sellingPrice: 195000, stockStatus: 'In Stock',     qty: 4,  rating: 4.7, image: '#FBBF24' },
  { id: 9,  itemCode: 'GE-009', barcode: '8901234567898', name: 'Jhumka Earrings',        category: 'Earrings', goldType: '22K', weight: 12,   purity: '916', makingCharges: 8500,  wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 68000,  sellingPrice: 84000,  stockStatus: 'In Stock',     qty: 9,  rating: 4.5, image: '#F97316' },
  { id: 10, itemCode: 'GN-010', barcode: '8901234567899', name: 'Temple Necklace Set',    category: 'Necklace', goldType: '22K', weight: 68,   purity: '916', makingCharges: 45000, wastage: 7, stoneType: 'Emerald', stoneWeight: 2.5, stoneCharges: 14000, purchasePrice: 410000, sellingPrice: 495000, stockStatus: 'Out of Stock', qty: 0,  rating: 4.9, image: '#D97706' },
  { id: 11, itemCode: 'GR-011', barcode: '8901234567900', name: 'Kids Ring',              category: 'Rings',    goldType: '22K', weight: 2.5,  purity: '916', makingCharges: 2200,  wastage: 4, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 14500,  sellingPrice: 18500,  stockStatus: 'In Stock',     qty: 20, rating: 4.2, image: '#F59E0B' },
  { id: 12, itemCode: 'GC-012', barcode: '8901234567901', name: 'Fancy Chain 12g',        category: 'Chains',   goldType: '22K', weight: 12,   purity: '916', makingCharges: 7500,  wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 70000,  sellingPrice: 85000,  stockStatus: 'In Stock',     qty: 11, rating: 4.4, image: '#EAB308' },
  { id: 13, itemCode: 'GB-013', barcode: '8901234567902', name: 'Daily Wear Bangles',     category: 'Bangles',  goldType: '22K', weight: 18,   purity: '916', makingCharges: 11500, wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 105000, sellingPrice: 128000, stockStatus: 'In Stock',     qty: 7,  rating: 4.5, image: '#FBBF24' },
  { id: 14, itemCode: 'GN-014', barcode: '8901234567903', name: 'Mangalsutra',            category: 'Necklace', goldType: '22K', weight: 22,   purity: '916', makingCharges: 14500, wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 128000, sellingPrice: 156000, stockStatus: 'In Stock',     qty: 6,  rating: 4.7, image: '#F97316' },
  { id: 15, itemCode: 'GE-015', barcode: '8901234567904', name: 'Chandbali Earrings',     category: 'Earrings', goldType: '22K', weight: 18,   purity: '916', makingCharges: 13000, wastage: 6, stoneType: 'Emerald', stoneWeight: 1.8, stoneCharges: 9000,  purchasePrice: 108000, sellingPrice: 132000, stockStatus: 'In Stock',     qty: 3,  rating: 4.8, image: '#F59E0B' },
  { id: 16, itemCode: 'CO-016', barcode: '8901234567905', name: 'Gold Coin 5g',           category: 'Coins',    goldType: '24K', weight: 5,    purity: '999', makingCharges: 300,   wastage: 0, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 34000,  sellingPrice: 36500,  stockStatus: 'In Stock',     qty: 40, rating: 5.0, image: '#EAB308' },
  { id: 17, itemCode: 'GR-017', barcode: '8901234567906', name: 'Engagement Ring',        category: 'Rings',    goldType: '18K', weight: 4.5,  purity: '750', makingCharges: 15000, wastage: 3, stoneType: 'Diamond', stoneWeight: 0.3, stoneCharges: 28000, purchasePrice: 110000, sellingPrice: 138000, stockStatus: 'In Stock',     qty: 6,  rating: 4.9, image: '#D97706' },
  { id: 18, itemCode: 'GC-018', barcode: '8901234567907', name: 'Kids Chain',             category: 'Chains',   goldType: '22K', weight: 6,    purity: '916', makingCharges: 3800,  wastage: 4, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 35000,  sellingPrice: 42000,  stockStatus: 'In Stock',     qty: 14, rating: 4.3, image: '#FBBF24' },
  { id: 19, itemCode: 'GB-019', barcode: '8901234567908', name: 'Wedding Bangle Pair',    category: 'Bangles',  goldType: '22K', weight: 32,   purity: '916', makingCharges: 22000, wastage: 6, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 185000, sellingPrice: 225000, stockStatus: 'Restock',      qty: 2,  rating: 4.6, image: '#F97316' },
  { id: 20, itemCode: 'GN-020', barcode: '8901234567909', name: 'Choker Necklace',        category: 'Necklace', goldType: '22K', weight: 42,   purity: '916', makingCharges: 30000, wastage: 6, stoneType: 'Emerald', stoneWeight: 1.0, stoneCharges: 6000,  purchasePrice: 250000, sellingPrice: 305000, stockStatus: 'In Stock',     qty: 4,  rating: 4.7, image: '#D97706' },
  { id: 21, itemCode: 'GE-021', barcode: '8901234567910', name: 'Daily Stud Set',         category: 'Earrings', goldType: '22K', weight: 4,    purity: '916', makingCharges: 3200,  wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 23000,  sellingPrice: 28500,  stockStatus: 'In Stock',     qty: 18, rating: 4.4, image: '#F59E0B' },
  { id: 22, itemCode: 'CO-022', barcode: '8901234567911', name: 'Gold Bar 20g',           category: 'Coins',    goldType: '24K', weight: 20,   purity: '999', makingCharges: 800,   wastage: 0, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 137000, sellingPrice: 144000, stockStatus: 'In Stock',     qty: 8,  rating: 5.0, image: '#EAB308' },
  { id: 23, itemCode: 'GR-023', barcode: '8901234567912', name: 'Cocktail Ring',          category: 'Rings',    goldType: '18K', weight: 6.5,  purity: '750', makingCharges: 14000, wastage: 3, stoneType: 'Diamond', stoneWeight: 0.8, stoneCharges: 22000, purchasePrice: 118000, sellingPrice: 145000, stockStatus: 'In Stock',     qty: 4,  rating: 4.6, image: '#F97316' },
  { id: 24, itemCode: 'GC-024', barcode: '8901234567913', name: 'Byzantine Chain',        category: 'Chains',   goldType: '22K', weight: 25,   purity: '916', makingCharges: 15500, wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 145000, sellingPrice: 175000, stockStatus: 'In Stock',     qty: 5,  rating: 4.7, image: '#FBBF24' },
  { id: 25, itemCode: 'GB-025', barcode: '8901234567914', name: 'Pearl Bangles',          category: 'Bangles',  goldType: '22K', weight: 26,   purity: '916', makingCharges: 17000, wastage: 5, stoneType: 'Pearl',   stoneWeight: 3.5, stoneCharges: 15000, purchasePrice: 150000, sellingPrice: 182000, stockStatus: 'In Stock',     qty: 3,  rating: 4.5, image: '#F59E0B' },
  { id: 26, itemCode: 'GN-026', barcode: '8901234567915', name: 'Long Haram',             category: 'Necklace', goldType: '22K', weight: 85,   purity: '916', makingCharges: 58000, wastage: 7, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 520000, sellingPrice: 625000, stockStatus: 'In Stock',     qty: 2,  rating: 4.9, image: '#D97706' },
  { id: 27, itemCode: 'GE-027', barcode: '8901234567916', name: 'Ruby Earrings',          category: 'Earrings', goldType: '22K', weight: 8,    purity: '916', makingCharges: 6800,  wastage: 5, stoneType: 'Ruby',    stoneWeight: 1.2, stoneCharges: 12000, purchasePrice: 55000,  sellingPrice: 68000,  stockStatus: 'In Stock',     qty: 6,  rating: 4.6, image: '#EF4444' },
  { id: 28, itemCode: 'CO-028', barcode: '8901234567917', name: 'Lakshmi Coin 8g',        category: 'Coins',    goldType: '22K', weight: 8,    purity: '916', makingCharges: 400,   wastage: 0, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 48000,  sellingPrice: 51500,  stockStatus: 'In Stock',     qty: 15, rating: 5.0, image: '#EAB308' },
  { id: 29, itemCode: 'GR-029', barcode: '8901234567918', name: 'Signet Ring',            category: 'Rings',    goldType: '22K', weight: 10,   purity: '916', makingCharges: 7500,  wastage: 5, stoneType: 'None',    stoneWeight: 0,   stoneCharges: 0,     purchasePrice: 60000,  sellingPrice: 74000,  stockStatus: 'In Stock',     qty: 7,  rating: 4.4, image: '#FBBF24' },
  { id: 30, itemCode: 'GC-030', barcode: '8901234567919', name: 'Chain with Pendant',     category: 'Chains',   goldType: '22K', weight: 14,   purity: '916', makingCharges: 9500,  wastage: 5, stoneType: 'CZ',      stoneWeight: 0.3, stoneCharges: 2500,  purchasePrice: 82000,  sellingPrice: 100000, stockStatus: 'In Stock',     qty: 8,  rating: 4.5, image: '#F97316' },
  { id: 31, itemCode: 'GN-031', barcode: '8901234567920', name: 'Antique Choker',         category: 'Necklace', goldType: '22K', weight: 55,   purity: '916', makingCharges: 38000, wastage: 7, stoneType: 'Ruby',    stoneWeight: 2.5, stoneCharges: 12000, purchasePrice: 330000, sellingPrice: 400000, stockStatus: 'Out of Stock', qty: 0,  rating: 4.8, image: '#D97706' },
  { id: 32, itemCode: 'GE-032', barcode: '8901234567921', name: 'Diamond Hoops',          category: 'Earrings', goldType: '18K', weight: 4.5,  purity: '750', makingCharges: 9500,  wastage: 3, stoneType: 'Diamond', stoneWeight: 0.6, stoneCharges: 20000, purchasePrice: 85000,  sellingPrice: 105000, stockStatus: 'In Stock',     qty: 5,  rating: 4.7, image: '#F59E0B' },
];

export const invoices = [
  { id: 'INV-1010', customerId: 3, customerName: 'Rahul Verma', date: '2026-06-30', items: 3, goldRate: 6250, subtotal: 380000, gst: 11400, makingCharges: 25000, discount: 5000, totalAmount: 425000, paymentMode: 'Card', status: 'Paid' },
  { id: 'INV-1009', customerId: 5, customerName: 'Vikram Singh', date: '2026-06-28', items: 5, goldRate: 6250, subtotal: 580000, gst: 17400, makingCharges: 45000, discount: 8000, totalAmount: 650000, paymentMode: 'Cheque', status: 'Paid' },
  { id: 'INV-1008', customerId: 11, customerName: 'Sanjay Gupta', date: '2026-06-25', items: 4, goldRate: 6240, subtotal: 480000, gst: 14400, makingCharges: 35000, discount: 5000, totalAmount: 530000, paymentMode: 'UPI', status: 'Paid' },
  { id: 'INV-1007', customerId: 9, customerName: 'Rohit Kapoor', date: '2026-06-20', items: 2, goldRate: 6240, subtotal: 210000, gst: 6300, makingCharges: 18000, discount: 3000, totalAmount: 235000, paymentMode: 'Card', status: 'Paid' },
  { id: 'INV-1006', customerId: 12, customerName: 'Nisha Bhat', date: '2026-06-18', items: 2, goldRate: 6240, subtotal: 155000, gst: 4650, makingCharges: 14000, discount: 2000, totalAmount: 172000, paymentMode: 'UPI', status: 'Paid' },
  { id: 'INV-1005', customerId: 1, customerName: 'Aarav Sharma', date: '2026-06-14', items: 2, goldRate: 6230, subtotal: 220000, gst: 6600, makingCharges: 20000, discount: 3000, totalAmount: 245000, paymentMode: 'UPI', status: 'Paid' },
  { id: 'INV-1004', customerId: 14, customerName: 'Pooja Desai', date: '2026-06-12', items: 3, goldRate: 6230, subtotal: 175000, gst: 5250, makingCharges: 15000, discount: 2000, totalAmount: 195000, paymentMode: 'Card', status: 'Paid' },
  { id: 'INV-1003', customerId: 17, customerName: 'Aditya Malhotra', date: '2026-06-08', items: 3, goldRate: 6230, subtotal: 265000, gst: 7950, makingCharges: 22000, discount: 4000, totalAmount: 292000, paymentMode: 'Card', status: 'Paid' },
  { id: 'INV-1002', customerId: 21, customerName: 'Deepak Choudhary', date: '2026-06-05', items: 2, goldRate: 6220, subtotal: 175000, gst: 5250, makingCharges: 14000, discount: 2000, totalAmount: 192000, paymentMode: 'UPI', status: 'Paid' },
  { id: 'INV-1001', customerId: 6, customerName: 'Ananya Iyer', date: '2026-06-01', items: 2, goldRate: 6220, subtotal: 148000, gst: 4440, makingCharges: 13000, discount: 2000, totalAmount: 163000, paymentMode: 'UPI', status: 'Paid' },
  { id: 'INV-1000', customerId: 10, customerName: 'Meera Joshi', date: '2026-05-30', items: 1, goldRate: 6200, subtotal: 68000, gst: 2040, makingCharges: 5500, discount: 1000, totalAmount: 74500, paymentMode: 'Cash', status: 'Paid' },
  { id: 'INV-0999', customerId: 18, customerName: 'Riya Chatterjee', date: '2026-05-25', items: 2, goldRate: 6200, subtotal: 128000, gst: 3840, makingCharges: 11000, discount: 1500, totalAmount: 141000, paymentMode: 'Card', status: 'Paid' },
  { id: 'INV-0998', customerId: 2, customerName: 'Priya Patel', date: '2026-05-22', items: 2, goldRate: 6200, subtotal: 132000, gst: 3960, makingCharges: 11500, discount: 2000, totalAmount: 145000, paymentMode: 'Cash', status: 'Paid' },
  { id: 'INV-0997', customerId: 15, customerName: 'Manish Tiwari', date: '2026-05-15', items: 3, goldRate: 6190, subtotal: 195000, gst: 5850, makingCharges: 17000, discount: 2500, totalAmount: 215000, paymentMode: 'UPI', status: 'Partial' },
  { id: 'INV-0996', customerId: 7, customerName: 'Karan Mehta', date: '2026-05-10', items: 2, goldRate: 6180, subtotal: 148000, gst: 4440, makingCharges: 13000, discount: 2000, totalAmount: 163000, paymentMode: 'Card', status: 'Paid' },
  { id: 'INV-0995', customerId: 16, customerName: 'Kavya Rao', date: '2026-05-05', items: 1, goldRate: 6180, subtotal: 55000, gst: 1650, makingCharges: 4500, discount: 500, totalAmount: 60650, paymentMode: 'UPI', status: 'Paid' }
];

export const oldGoldExchanges = [
  { id: 'OG-101', customerId: 1, customerName: 'Aarav Sharma', date: '2026-06-14', weight: 12.5, purity: '22K', goldRate: 6230, testingCharges: 500, deductionPercent: 3, exchangeValue: 75486, status: 'Completed' },
  { id: 'OG-102', customerId: 5, customerName: 'Vikram Singh', date: '2026-06-08', weight: 22, purity: '22K', goldRate: 6230, testingCharges: 500, deductionPercent: 2, exchangeValue: 134184, status: 'Completed' },
  { id: 'OG-103', customerId: 3, customerName: 'Rahul Verma', date: '2026-05-30', weight: 8, purity: '18K', goldRate: 5100, testingCharges: 300, deductionPercent: 4, exchangeValue: 38868, status: 'Completed' },
  { id: 'OG-104', customerId: 11, customerName: 'Sanjay Gupta', date: '2026-05-22', weight: 35, purity: '22K', goldRate: 6200, testingCharges: 500, deductionPercent: 2, exchangeValue: 212380, status: 'Completed' },
  { id: 'OG-105', customerId: 9, customerName: 'Rohit Kapoor', date: '2026-05-10', weight: 15, purity: '22K', goldRate: 6180, testingCharges: 400, deductionPercent: 3, exchangeValue: 89469, status: 'Completed' },
  { id: 'OG-106', customerId: 14, customerName: 'Pooja Desai', date: '2026-04-28', weight: 6.5, purity: '22K', goldRate: 6150, testingCharges: 300, deductionPercent: 3, exchangeValue: 38470, status: 'Completed' },
  { id: 'OG-107', customerId: 17, customerName: 'Aditya Malhotra', date: '2026-04-15', weight: 18, purity: '22K', goldRate: 6120, testingCharges: 400, deductionPercent: 2, exchangeValue: 107553, status: 'Completed' },
  { id: 'OG-108', customerId: 6, customerName: 'Ananya Iyer', date: '2026-04-01', weight: 5, purity: '22K', goldRate: 6100, testingCharges: 300, deductionPercent: 3, exchangeValue: 29285, status: 'Completed' },
  { id: 'OG-109', customerId: 15, customerName: 'Manish Tiwari', date: '2026-03-20', weight: 28, purity: '22K', goldRate: 6080, testingCharges: 500, deductionPercent: 2, exchangeValue: 166835, status: 'Completed' },
  { id: 'OG-110', customerId: 19, customerName: 'Suresh Kumar', date: '2026-03-12', weight: 42, purity: '22K', goldRate: 6050, testingCharges: 600, deductionPercent: 2, exchangeValue: 248358, status: 'Completed' },
  { id: 'OG-111', customerId: 2, customerName: 'Priya Patel', date: '2026-06-25', weight: 4, purity: '18K', goldRate: 5100, testingCharges: 300, deductionPercent: 4, exchangeValue: 19284, status: 'Pending' }
];

export const savingsSchemes = [
  { id: 'SC-101', customerId: 1, customerName: 'Aarav Sharma', plan: 'Gold Monthly ₹10K', planAmount: 10000, duration: 12, paidMonths: 6, totalPaid: 60000, remaining: 60000, dueDate: '2026-07-15', maturity: '2026-12-15', bonus: 5000, status: 'Active' },
  { id: 'SC-102', customerId: 3, customerName: 'Rahul Verma', plan: 'Gold Quarterly ₹50K', planAmount: 50000, duration: 8, paidMonths: 4, totalPaid: 200000, remaining: 200000, dueDate: '2026-08-01', maturity: '2027-03-01', bonus: 15000, status: 'Active' },
  { id: 'SC-103', customerId: 6, customerName: 'Ananya Iyer', plan: 'Bridal ₹25K', planAmount: 25000, duration: 12, paidMonths: 6, totalPaid: 150000, remaining: 150000, dueDate: '2026-07-10', maturity: '2026-12-10', bonus: 12500, status: 'Active' },
  { id: 'SC-104', customerId: 14, customerName: 'Pooja Desai', plan: 'Gold Monthly ₹15K', planAmount: 15000, duration: 12, paidMonths: 11, totalPaid: 165000, remaining: 15000, dueDate: '2026-07-05', maturity: '2026-08-05', bonus: 7500, status: 'Active' },
  { id: 'SC-105', customerId: 11, customerName: 'Sanjay Gupta', plan: 'Gold Monthly ₹25K', planAmount: 25000, duration: 12, paidMonths: 12, totalPaid: 300000, remaining: 0, dueDate: '-', maturity: '2026-07-01', bonus: 15000, status: 'Matured' },
  { id: 'SC-106', customerId: 17, customerName: 'Aditya Malhotra', plan: 'Gold Monthly ₹20K', planAmount: 20000, duration: 10, paidMonths: 3, totalPaid: 60000, remaining: 140000, dueDate: '2026-07-20', maturity: '2027-02-20', bonus: 10000, status: 'Active' },
  { id: 'SC-107', customerId: 2, customerName: 'Priya Patel', plan: 'Gold Monthly ₹5K', planAmount: 5000, duration: 12, paidMonths: 2, totalPaid: 10000, remaining: 50000, dueDate: '2026-07-12', maturity: '2027-05-12', bonus: 2500, status: 'Active' },
  { id: 'SC-108', customerId: 15, customerName: 'Manish Tiwari', plan: 'Gold Monthly ₹30K', planAmount: 30000, duration: 12, paidMonths: 9, totalPaid: 270000, remaining: 90000, dueDate: '2026-07-25', maturity: '2026-10-25', bonus: 15000, status: 'Active' },
  { id: 'SC-109', customerId: 19, customerName: 'Suresh Kumar', plan: 'Gold Monthly ₹50K', planAmount: 50000, duration: 12, paidMonths: 12, totalPaid: 600000, remaining: 0, dueDate: '-', maturity: '2026-07-05', bonus: 30000, status: 'Matured' },
  { id: 'SC-110', customerId: 8, customerName: 'Divya Nair', plan: 'Gold Monthly ₹8K', planAmount: 8000, duration: 12, paidMonths: 1, totalPaid: 8000, remaining: 88000, dueDate: '2026-07-18', maturity: '2027-06-18', bonus: 4000, status: 'Active' }
];

export const suppliers = [
  { id: 1, name: 'Kundan Gold House', contact: 'Rakesh Kundan', mobile: '9876500001', email: 'rakesh@kundangold.com', items: 'Bangles, Chains', totalPurchase: 4500000, balanceDue: 250000, lastOrder: '2026-06-20', status: 'Active' },
  { id: 2, name: 'Malabar Wholesale', contact: 'Sunil M.', mobile: '9876500002', email: 'sunil@malabar.com', items: 'Necklace, Rings', totalPurchase: 6800000, balanceDue: 0, lastOrder: '2026-06-15', status: 'Active' },
  { id: 3, name: 'Rajesh Jewellers', contact: 'Rajesh Kumar', mobile: '9876500003', email: 'rajesh@rjw.com', items: 'Earrings, Studs', totalPurchase: 2100000, balanceDue: 120000, lastOrder: '2026-05-30', status: 'Active' },
  { id: 4, name: 'Golden Craft Co', contact: 'Amit Shah', mobile: '9876500004', email: 'amit@goldencraft.com', items: 'Coins, Bars', totalPurchase: 3450000, balanceDue: 45000, lastOrder: '2026-06-10', status: 'Active' },
  { id: 5, name: 'Diamond World Ltd', contact: 'Rohit Sanghvi', mobile: '9876500005', email: 'rohit@dwl.com', items: 'Diamond Rings', totalPurchase: 8900000, balanceDue: 380000, lastOrder: '2026-06-25', status: 'Active' },
  { id: 6, name: 'Chennai Silks Gold', contact: 'Sekar', mobile: '9876500006', email: 'sekar@csg.com', items: 'Temple jewellery', totalPurchase: 5200000, balanceDue: 0, lastOrder: '2026-04-18', status: 'Inactive' },
  { id: 7, name: 'PC Jeweller Distribution', contact: 'Prakash', mobile: '9876500007', email: 'prakash@pcj.com', items: 'Bridal Sets', totalPurchase: 7100000, balanceDue: 210000, lastOrder: '2026-06-22', status: 'Active' },
  { id: 8, name: 'Kalyan Gold Depot', contact: 'Suresh Nair', mobile: '9876500008', email: 'suresh@kalyan.com', items: 'Chains, Bracelets', totalPurchase: 3900000, balanceDue: 90000, lastOrder: '2026-06-05', status: 'Active' }
];

export const staff = [
  { id: 1, name: 'Rajesh Malhotra', role: 'Manager', mobile: '9812345601', email: 'rajesh@goldcrm.com', joinDate: '2020-03-15', salary: 55000, status: 'Active', image: '#F59E0B' },
  { id: 2, name: 'Priyanka Sharma', role: 'Sales Executive', mobile: '9812345602', email: 'priyanka@goldcrm.com', joinDate: '2021-07-10', salary: 32000, status: 'Active', image: '#D97706' },
  { id: 3, name: 'Amit Kumar', role: 'Cashier', mobile: '9812345603', email: 'amit@goldcrm.com', joinDate: '2022-01-05', salary: 28000, status: 'Active', image: '#FBBF24' },
  { id: 4, name: 'Sneha Iyer', role: 'Sales Executive', mobile: '9812345604', email: 'sneha@goldcrm.com', joinDate: '2022-09-20', salary: 30000, status: 'Active', image: '#F97316' },
  { id: 5, name: 'Ravi Patel', role: 'Goldsmith', mobile: '9812345605', email: 'ravi@goldcrm.com', joinDate: '2019-06-11', salary: 45000, status: 'Active', image: '#EAB308' },
  { id: 6, name: 'Divya Singh', role: 'Sales Executive', mobile: '9812345606', email: 'divya@goldcrm.com', joinDate: '2023-02-14', salary: 28000, status: 'Active', image: '#EF4444' },
  { id: 7, name: 'Karan Verma', role: 'Assistant', mobile: '9812345607', email: 'karan@goldcrm.com', joinDate: '2023-08-01', salary: 22000, status: 'Active', image: '#F59E0B' },
  { id: 8, name: 'Anita Reddy', role: 'Accountant', mobile: '9812345608', email: 'anita@goldcrm.com', joinDate: '2021-11-05', salary: 40000, status: 'Active', image: '#D97706' },
  { id: 9, name: 'Vikash Joshi', role: 'Security', mobile: '9812345609', email: 'vikash@goldcrm.com', joinDate: '2020-12-15', salary: 20000, status: 'Active', image: '#FBBF24' },
  { id: 10, name: 'Neha Bhatt', role: 'Sales Executive', mobile: '9812345610', email: 'neha@goldcrm.com', joinDate: '2024-04-01', salary: 26000, status: 'On Leave', image: '#F97316' }
];

export const attendance = [
  { staffId: 1, name: 'Rajesh Malhotra', present: 24, absent: 1, halfDay: 2, leaves: 3 },
  { staffId: 2, name: 'Priyanka Sharma', present: 26, absent: 0, halfDay: 1, leaves: 3 },
  { staffId: 3, name: 'Amit Kumar', present: 23, absent: 2, halfDay: 1, leaves: 4 },
  { staffId: 4, name: 'Sneha Iyer', present: 25, absent: 1, halfDay: 0, leaves: 4 },
  { staffId: 5, name: 'Ravi Patel', present: 27, absent: 0, halfDay: 1, leaves: 2 },
  { staffId: 6, name: 'Divya Singh', present: 22, absent: 3, halfDay: 2, leaves: 3 },
  { staffId: 7, name: 'Karan Verma', present: 26, absent: 0, halfDay: 2, leaves: 2 },
  { staffId: 8, name: 'Anita Reddy', present: 25, absent: 1, halfDay: 1, leaves: 3 },
  { staffId: 9, name: 'Vikash Joshi', present: 28, absent: 0, halfDay: 0, leaves: 2 },
  { staffId: 10, name: 'Neha Bhatt', present: 12, absent: 15, halfDay: 0, leaves: 3 }
];

export const monthlySales = [
  { month: 'Jan', sales: 4200000, profit: 620000 },
  { month: 'Feb', sales: 3800000, profit: 570000 },
  { month: 'Mar', sales: 5100000, profit: 780000 },
  { month: 'Apr', sales: 4600000, profit: 690000 },
  { month: 'May', sales: 6200000, profit: 940000 },
  { month: 'Jun', sales: 7100000, profit: 1080000 },
  { month: 'Jul', sales: 5800000, profit: 870000 },
  { month: 'Aug', sales: 4900000, profit: 730000 },
  { month: 'Sep', sales: 6400000, profit: 970000 },
  { month: 'Oct', sales: 8200000, profit: 1240000 },
  { month: 'Nov', sales: 9500000, profit: 1420000 },
  { month: 'Dec', sales: 10800000, profit: 1650000 }
];

export const categorySales = [
  { name: 'Rings', value: 28, color: '#F59E0B' },
  { name: 'Chains', value: 22, color: '#D97706' },
  { name: 'Bangles', value: 18, color: '#FBBF24' },
  { name: 'Necklace', value: 15, color: '#F97316' },
  { name: 'Earrings', value: 12, color: '#EAB308' },
  { name: 'Coins', value: 5, color: '#EF4444' }
];

export const dailySales = [
  { day: 'Mon', sales: 420000 },
  { day: 'Tue', sales: 380000 },
  { day: 'Wed', sales: 510000 },
  { day: 'Thu', sales: 460000 },
  { day: 'Fri', sales: 620000 },
  { day: 'Sat', sales: 780000 },
  { day: 'Sun', sales: 850000 }
];

export const topSellingItems = [
  { name: 'Classic Gold Ring', category: 'Rings', sold: 42, revenue: 2604000 },
  { name: 'Rope Chain 20g', category: 'Chains', sold: 28, revenue: 3864000 },
  { name: 'Diamond Studs', category: 'Earrings', sold: 35, revenue: 3080000 },
  { name: 'Gold Coin 10g', category: 'Coins', sold: 68, revenue: 4896000 },
  { name: 'Bridal Bangle Set', category: 'Bangles', sold: 12, revenue: 3840000 }
];

export const campaigns = {
  whatsapp: [
    { id: 1, name: 'Diwali Blast', audience: 1250, sent: 1250, opened: 823, status: 'Completed', date: '2025-10-28' },
    { id: 2, name: 'Summer Collection', audience: 890, sent: 890, opened: 612, status: 'Completed', date: '2026-04-15' },
    { id: 3, name: 'Monsoon Discount', audience: 640, sent: 320, opened: 145, status: 'Running', date: '2026-06-25' }
  ],
  festival: [
    { id: 1, name: 'Akshaya Tritiya 2026', discount: '10% off Making Charges', audience: 2100, status: 'Scheduled', date: '2026-05-10' },
    { id: 2, name: 'Diwali Bonanza', discount: 'Buy 1 Get 1 Coin', audience: 3200, status: 'Draft', date: '2026-10-20' }
  ],
  birthday: [],
  anniversary: [],
  goldRate: [
    { id: 1, name: 'Daily Gold Rate WhatsApp', audience: 5400, status: 'Recurring', date: 'Daily 9 AM' }
  ],
  followup: [
    { id: 1, name: '30-day Post Purchase', audience: 340, status: 'Active', date: 'Auto' },
    { id: 2, name: 'Abandoned Wishlist', audience: 128, status: 'Active', date: 'Auto' }
  ]
};

export const shopSettings = {
  shopName: 'Golden Palace Jewellers',
  ownerName: 'Mr. Suresh Chandra',
  gstin: '27AABCU9603R1ZM',
  panNumber: 'AABCU9603R',
  address: '12 Zaveri Bazaar, Mumbai, Maharashtra 400002',
  phone: '022-22345678',
  email: 'contact@goldenpalace.in',
  goldRates: { '24K': 6820, '22K': 6250, '18K': 5100 },
  silverRate: 82,
  gstRate: 3,
  makingChargeDefault: 12
};

// REPAIRS mock data — 20 records
export const repairs = [
  { id: 'JC-001', customerId: 1, customerName: 'Aarav Sharma', mobile: '9876543210',
    itemDesc: 'Gold Ring - size adjustment', category: 'Rings', weight: '8.5g',
    issue: 'Size too small, needs resizing from 16 to 18',
    receivedDate: '2026-06-28', estimatedDate: '2026-07-02', completedDate: null,
    technicianId: 3, technicianName: 'Ravi Kumar',
    estimatedCost: 850, advancePaid: 500, finalCost: null,
    status: 'In Progress', priority: 'Normal', notes: 'Handle with care - antique piece',
    images: [], barcode: 'JC001REP' },
  { id: 'JC-002', customerId: 3, customerName: 'Rahul Verma', mobile: '9812345670',
    itemDesc: 'Necklace - clasp broken',  category: 'Necklace', weight: '35g',
    issue: 'Box clasp broken, needs replacement',
    receivedDate: '2026-07-01', estimatedDate: '2026-07-03', completedDate: null,
    technicianId: 4, technicianName: 'Sunil Das',
    estimatedCost: 400, advancePaid: 200, finalCost: null,
    status: 'Received', priority: 'Urgent', notes: '',
    images: [], barcode: 'JC002REP' },
  { id: 'JC-003', customerId: 6, customerName: 'Ananya Iyer', mobile: '9865432109',
    itemDesc: 'Bangle Set - polishing',  category: 'Bangles', weight: '42g',
    issue: 'Needs rhodium plating and polishing',
    receivedDate: '2026-06-25', estimatedDate: '2026-06-29', completedDate: '2026-06-28',
    technicianId: 3, technicianName: 'Ravi Kumar',
    estimatedCost: 1200, advancePaid: 600, finalCost: 1100,
    status: 'Ready for Pickup', priority: 'Normal', notes: 'Customer notified via WhatsApp',
    images: [], barcode: 'JC003REP' },
  { id: 'JC-004', customerId: 9, customerName: 'Rohit Kapoor', mobile: '9976543210',
    itemDesc: 'Chain - broken link repair', category: 'Chains', weight: '18g',
    issue: '3 links broken in middle section',
    receivedDate: '2026-06-20', estimatedDate: '2026-06-23', completedDate: '2026-06-22',
    technicianId: 5, technicianName: 'Mohan Lal',
    estimatedCost: 600, advancePaid: 300, finalCost: 550,
    status: 'Delivered', priority: 'Normal', notes: '',
    images: [], barcode: 'JC004REP' },
  { id: 'JC-005', customerId: 11, customerName: 'Sanjay Gupta', mobile: '9871122334',
    itemDesc: 'Diamond Ring - stone loose', category: 'Rings', weight: '5.5g',
    issue: 'Centre diamond loose in prong setting',
    receivedDate: '2026-07-03', estimatedDate: '2026-07-06', completedDate: null,
    technicianId: 4, technicianName: 'Sunil Das',
    estimatedCost: 2500, advancePaid: 1000, finalCost: null,
    status: 'In Progress', priority: 'Urgent', notes: 'VIP customer - priority handling',
    images: [], barcode: 'JC005REP' },
  { id: 'JC-006', customerId: 2, customerName: 'Priya Patel', mobile: '9823456712',
    itemDesc: 'Earrings - hook replacement', category: 'Earrings', weight: '6g',
    issue: 'Fish hook broken on one earring',
    receivedDate: '2026-07-05', estimatedDate: '2026-07-07', completedDate: null,
    technicianId: 3, technicianName: 'Ravi Kumar',
    estimatedCost: 350, advancePaid: 0, finalCost: null,
    status: 'Received', priority: 'Normal', notes: '',
    images: [], barcode: 'JC006REP' },
  { id: 'JC-007', customerId: 5, customerName: 'Vikram Singh', mobile: '9887654321',
    itemDesc: 'Bracelet - lengthening', category: 'Bangles', weight: '22g',
    issue: 'Add 2 links to increase length',
    receivedDate: '2026-06-15', estimatedDate: '2026-06-18', completedDate: '2026-06-17',
    technicianId: 5, technicianName: 'Mohan Lal',
    estimatedCost: 950, advancePaid: 500, finalCost: 900,
    status: 'Delivered', priority: 'Normal', notes: '',
    images: [], barcode: 'JC007REP' },
  { id: 'JC-008', customerId: 14, customerName: 'Pooja Desai', mobile: '9834561278',
    itemDesc: 'Pendant - bail repair', category: 'Necklace', weight: '4g',
    issue: 'Bail detached from pendant',
    receivedDate: '2026-07-04', estimatedDate: '2026-07-06', completedDate: null,
    technicianId: 3, technicianName: 'Ravi Kumar',
    estimatedCost: 300, advancePaid: 150, finalCost: null,
    status: 'In Progress', priority: 'Normal', notes: '',
    images: [], barcode: 'JC008REP' },
  { id: 'JC-009', customerId: 17, customerName: 'Aditya Malhotra', mobile: '9789871234',
    itemDesc: 'Ring - engraving', category: 'Rings', weight: '7g',
    issue: 'Custom engraving required inside band',
    receivedDate: '2026-07-02', estimatedDate: '2026-07-05', completedDate: null,
    technicianId: 4, technicianName: 'Sunil Das',
    estimatedCost: 700, advancePaid: 350, finalCost: null,
    status: 'In Progress', priority: 'Normal', notes: 'Text: "Forever Yours - 2026"',
    images: [], barcode: 'JC009REP' },
  { id: 'JC-010', customerId: 19, customerName: 'Suresh Kumar', mobile: '9754321098',
    itemDesc: 'Necklace set - full restoration', category: 'Necklace', weight: '65g',
    issue: 'Old antique necklace - full cleaning, repair and polishing',
    receivedDate: '2026-06-10', estimatedDate: '2026-06-20', completedDate: '2026-06-19',
    technicianId: 5, technicianName: 'Mohan Lal',
    estimatedCost: 5500, advancePaid: 3000, finalCost: 5200,
    status: 'Delivered', priority: 'Urgent', notes: 'Heirloom piece',
    images: [], barcode: 'JC010REP' },
  { id: 'JC-011', customerId: 4, customerName: 'Sneha Reddy', mobile: '9845123670',
    itemDesc: 'Gold Chain - extension', category: 'Chains', weight: '15g',
    issue: 'Add 5cm extension piece',
    receivedDate: '2026-07-06', estimatedDate: '2026-07-09', completedDate: null,
    technicianId: 3, technicianName: 'Ravi Kumar',
    estimatedCost: 1800, advancePaid: 900, finalCost: null,
    status: 'Received', priority: 'Normal', notes: '',
    images: [], barcode: 'JC011REP' },
  { id: 'JC-012', customerId: 7, customerName: 'Karan Mehta', mobile: '9812345988',
    itemDesc: 'Cufflinks - polishing', category: 'Rings', weight: '12g',
    issue: 'Deep scratches, needs buffing and re-polishing',
    receivedDate: '2026-06-30', estimatedDate: '2026-07-03', completedDate: '2026-07-02',
    technicianId: 5, technicianName: 'Mohan Lal',
    estimatedCost: 1500, advancePaid: 750, finalCost: 1400,
    status: 'Ready for Pickup', priority: 'Normal', notes: 'Customer called - will pick up on July 8',
    images: [], barcode: 'JC012REP' },
  { id: 'JC-013', customerId: 12, customerName: 'Nisha Bhat', mobile: '9767123456', itemDesc: 'Earrings - stone setting', category: 'Earrings', weight: '4g', issue: 'Two stones missing from chandelier earring', receivedDate: '2026-07-01', estimatedDate: '2026-07-05', completedDate: null, technicianId: 4, technicianName: 'Sunil Das', estimatedCost: 1800, advancePaid: 900, finalCost: null, status: 'In Progress', priority: 'Normal', notes: '', images: [], barcode: 'JC013REP' },
  { id: 'JC-014', customerId: 15, customerName: 'Manish Tiwari', mobile: '9787654321', itemDesc: 'Bangle - dent repair', category: 'Bangles', weight: '30g', issue: 'Dent on outer surface, needs reshaping', receivedDate: '2026-06-28', estimatedDate: '2026-07-01', completedDate: '2026-06-30', technicianId: 3, technicianName: 'Ravi Kumar', estimatedCost: 2000, advancePaid: 1000, finalCost: 1900, status: 'Delivered', priority: 'Normal', notes: '', images: [], barcode: 'JC014REP' },
  { id: 'JC-015', customerId: 18, customerName: 'Riya Chatterjee', mobile: '9867123409', itemDesc: 'Mangalsutra - extension', category: 'Necklace', weight: '8g', issue: 'Add 2 inch extension to mangalsutra', receivedDate: '2026-07-03', estimatedDate: '2026-07-06', completedDate: null, technicianId: 4, technicianName: 'Sunil Das', estimatedCost: 600, advancePaid: 300, finalCost: null, status: 'In Progress', priority: 'Normal', notes: '', images: [], barcode: 'JC015REP' },
  { id: 'JC-016', customerId: 10, customerName: 'Meera Joshi', mobile: '9845098765', itemDesc: 'Ring - rhodium plating', category: 'Rings', weight: '3g', issue: 'White gold ring needs fresh rhodium plating', receivedDate: '2026-07-05', estimatedDate: '2026-07-08', completedDate: null, technicianId: 3, technicianName: 'Ravi Kumar', estimatedCost: 1200, advancePaid: 600, finalCost: null, status: 'Received', priority: 'Normal', notes: '', images: [], barcode: 'JC016REP' },
  { id: 'JC-017', customerId: 21, customerName: 'Deepak Choudhary', mobile: '9812323456', itemDesc: 'Chain - broken clasp + kink', category: 'Chains', weight: '22g', issue: 'Lobster clasp broken + kink near clasp', receivedDate: '2026-06-22', estimatedDate: '2026-06-26', completedDate: '2026-06-25', technicianId: 5, technicianName: 'Mohan Lal', estimatedCost: 750, advancePaid: 400, finalCost: 700, status: 'Delivered', priority: 'Normal', notes: '', images: [], barcode: 'JC017REP' },
  { id: 'JC-018', customerId: 13, customerName: 'Arjun Menon', mobile: '9800987612', itemDesc: 'Earrings - back stud replacement', category: 'Earrings', weight: '5g', issue: 'Push-back studs worn, needs butterfly back replacement', receivedDate: '2026-07-06', estimatedDate: '2026-07-07', completedDate: null, technicianId: 3, technicianName: 'Ravi Kumar', estimatedCost: 200, advancePaid: 0, finalCost: null, status: 'Received', priority: 'Normal', notes: '', images: [], barcode: 'JC018REP' },
  { id: 'JC-019', customerId: 16, customerName: 'Kavya Rao', mobile: '9812309871', itemDesc: 'Pendant chain swap', category: 'Chains', weight: '10g', issue: 'Customer wants to swap pendant to new chain', receivedDate: '2026-07-04', estimatedDate: '2026-07-06', completedDate: null, technicianId: 4, technicianName: 'Sunil Das', estimatedCost: 350, advancePaid: 200, finalCost: null, status: 'In Progress', priority: 'Normal', notes: '', images: [], barcode: 'JC019REP' },
  { id: 'JC-020', customerId: 8, customerName: 'Divya Nair', mobile: '9800123456', itemDesc: 'Bangle set - full makeover', category: 'Bangles', weight: '55g', issue: 'Full gold wash, antique finish application', receivedDate: '2026-06-18', estimatedDate: '2026-06-25', completedDate: '2026-06-24', technicianId: 5, technicianName: 'Mohan Lal', estimatedCost: 3500, advancePaid: 2000, finalCost: 3200, status: 'Delivered', priority: 'Normal', notes: '', images: [], barcode: 'JC020REP' },
];

// QUOTATIONS mock data — 15 records
// ─── QUOTATION FIELD REFERENCE ────────────────────────────────────────────────
// grossWeight  : total weight including stone (grams)
// stoneWeight  : weight of stone/diamond only (grams)
// net          : grossWeight - stoneWeight  (gold only)
// wastage      : wastage percentage (e.g. 4 = 4%)
// wastageW     : net * wastage / 100  (grams lost in making)
// billable     : net + wastageW  (weight charged to customer)
// goldRate     : ₹ per gram for the purity
// goldValue    : billable * goldRate
// makingCharges: flat making charge for this item (₹)
// stoneCharges : value of stones separately charged (₹)
// total        : (goldValue + makingCharges + stoneCharges) * qty
// subtotal     : sum of all item totals
// gst          : (subtotal - discount) * 3%
// total quote  : subtotal - discount + gst
// ──────────────────────────────────────────────────────────────────────────────
export const quotations = [
  {
    id: 'QT-001', customerId: 1, customerName: 'Aarav Sharma', mobile: '9876543210',
    date: '2026-07-01', validUntil: '2026-07-15', status: 'Sent', notes: 'Anniversary special quote',
    items: [
      {
        name: 'Diamond Necklace Set', purity: '18K', qty: 1,
        grossWeight: 48.5, stoneWeight: 8.0, stoneType: 'Diamond', stoneCharges: 65000,
        net: 40.5, wastage: 4, wastageW: 1.620, billable: 42.120,
        goldRate: 5110, goldValue: 215233, makingCharges: 38000, total: 318233,
      },
      {
        name: 'Matching Diamond Earrings', purity: '18K', qty: 1,
        grossWeight: 9.5, stoneWeight: 2.0, stoneType: 'Diamond', stoneCharges: 20000,
        net: 7.5, wastage: 3, wastageW: 0.225, billable: 7.725,
        goldRate: 5110, goldValue: 39475, makingCharges: 10000, total: 69475,
      },
    ],
    subtotal: 387708, discount: 7708, gst: 11400, total: 391400,
  },
  {
    id: 'QT-002', customerId: 5, customerName: 'Vikram Singh', mobile: '9887654321',
    date: '2026-06-28', validUntil: '2026-07-12', status: 'Converted', notes: 'Corporate gifting order',
    items: [
      {
        name: 'Gold Coin 24K 10g', purity: '24K', qty: 10,
        grossWeight: 10, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 10, wastage: 0, wastageW: 0, billable: 10,
        goldRate: 6820, goldValue: 68200, makingCharges: 500, total: 687000,
      },
    ],
    subtotal: 687000, discount: 20010, gst: 20010, total: 686990,
  },
  {
    id: 'QT-003', customerId: 3, customerName: 'Rahul Verma', mobile: '9812345670',
    date: '2026-07-03', validUntil: '2026-07-17', status: 'Draft', notes: 'Bridal season inquiry',
    items: [
      {
        name: 'Bridal Necklace Set 22K', purity: '22K', qty: 1,
        grossWeight: 82.0, stoneWeight: 2.5, stoneType: 'Ruby', stoneCharges: 15000,
        net: 79.5, wastage: 6, wastageW: 4.770, billable: 84.270,
        goldRate: 6250, goldValue: 526688, makingCharges: 65000, total: 606688,
      },
    ],
    subtotal: 606688, discount: 10000, gst: 17901, total: 614589,
  },
  {
    id: 'QT-004', customerId: 11, customerName: 'Sanjay Gupta', mobile: '9871122334',
    date: '2026-06-30', validUntil: '2026-07-14', status: 'Sent', notes: 'Diamond investment piece',
    items: [
      {
        name: 'Diamond Solitaire Ring 1ct 18K', purity: '18K', qty: 1,
        grossWeight: 5.8, stoneWeight: 0.5, stoneType: 'Diamond', stoneCharges: 85000,
        net: 5.3, wastage: 3, wastageW: 0.159, billable: 5.459,
        goldRate: 5110, goldValue: 27895, makingCharges: 18000, total: 130895,
      },
    ],
    subtotal: 130895, discount: 0, gst: 3927, total: 134822,
  },
  {
    id: 'QT-005', customerId: 6, customerName: 'Ananya Iyer', mobile: '9865432109',
    date: '2026-07-04', validUntil: '2026-07-18', status: 'Approved', notes: 'Anniversary gift from husband',
    items: [
      {
        name: 'Gold Bangle Set 22K', purity: '22K', qty: 1,
        grossWeight: 52.0, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 52.0, wastage: 5, wastageW: 2.600, billable: 54.600,
        goldRate: 6250, goldValue: 341250, makingCharges: 38000, total: 379250,
      },
    ],
    subtotal: 379250, discount: 4250, gst: 11250, total: 386250,
  },
  {
    id: 'QT-006', customerId: 9, customerName: 'Rohit Kapoor', mobile: '9976543210',
    date: '2026-06-25', validUntil: '2026-07-09', status: 'Expired', notes: 'Quote expired — customer did not respond',
    items: [
      {
        name: 'Temple Necklace Custom 22K', purity: '22K', qty: 1,
        grossWeight: 72.0, stoneWeight: 1.5, stoneType: 'Emerald', stoneCharges: 12000,
        net: 70.5, wastage: 6, wastageW: 4.230, billable: 74.730,
        goldRate: 6250, goldValue: 467063, makingCharges: 55000, total: 534063,
      },
    ],
    subtotal: 534063, discount: 14063, gst: 15600, total: 535600,
  },
  {
    id: 'QT-007', customerId: 14, customerName: 'Pooja Desai', mobile: '9834561278',
    date: '2026-07-05', validUntil: '2026-07-19', status: 'Draft', notes: 'Pendant with matching chain',
    items: [
      {
        name: 'Diamond Pendant 18K', purity: '18K', qty: 1,
        grossWeight: 4.2, stoneWeight: 0.8, stoneType: 'Diamond', stoneCharges: 35000,
        net: 3.4, wastage: 3, wastageW: 0.102, billable: 3.502,
        goldRate: 5110, goldValue: 17895, makingCharges: 12000, total: 64895,
      },
      {
        name: 'Gold Chain 18g 22K', purity: '22K', qty: 1,
        grossWeight: 18.5, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 18.5, wastage: 4, wastageW: 0.740, billable: 19.240,
        goldRate: 6250, goldValue: 120250, makingCharges: 12000, total: 132250,
      },
    ],
    subtotal: 197145, discount: 3000, gst: 5824, total: 199969,
  },
  {
    id: 'QT-008', customerId: 15, customerName: 'Manish Tiwari', mobile: '9787654321',
    date: '2026-06-22', validUntil: '2026-07-06', status: 'Converted', notes: 'Investment purchase — 2 bars',
    items: [
      {
        name: 'Gold Bar 100g 24K', purity: '24K', qty: 2,
        grossWeight: 100, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 100, wastage: 0, wastageW: 0, billable: 100,
        goldRate: 6820, goldValue: 682000, makingCharges: 1000, total: 1366000,
      },
    ],
    subtotal: 1366000, discount: 50000, gst: 39480, total: 1355480,
  },
  {
    id: 'QT-009', customerId: 17, customerName: 'Aditya Malhotra', mobile: '9789871234',
    date: '2026-07-02', validUntil: '2026-07-16', status: 'Sent', notes: 'Engagement rings for couple',
    items: [
      {
        name: 'Couple Ring Set 18K', purity: '18K', qty: 2,
        grossWeight: 5.5, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 5.5, wastage: 3, wastageW: 0.165, billable: 5.665,
        goldRate: 5110, goldValue: 28948, makingCharges: 9000, total: 75896,
      },
    ],
    subtotal: 75896, discount: 1896, gst: 2220, total: 76220,
  },
  {
    id: 'QT-010', customerId: 2, customerName: 'Priya Patel', mobile: '9823456712',
    date: '2026-07-06', validUntil: '2026-07-20', status: 'Draft', notes: 'Full bridal set — wedding in October 2026',
    items: [
      {
        name: 'Bridal Necklace 22K', purity: '22K', qty: 1,
        grossWeight: 85.0, stoneWeight: 3.0, stoneType: 'Ruby', stoneCharges: 22000,
        net: 82.0, wastage: 6, wastageW: 4.920, billable: 86.920,
        goldRate: 6250, goldValue: 543250, makingCharges: 70000, total: 635250,
      },
      {
        name: 'Bridal Bangle Set 22K', purity: '22K', qty: 1,
        grossWeight: 48.0, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 48.0, wastage: 5, wastageW: 2.400, billable: 50.400,
        goldRate: 6250, goldValue: 315000, makingCharges: 35000, total: 350000,
      },
      {
        name: 'Bridal Earrings 22K', purity: '22K', qty: 1,
        grossWeight: 14.0, stoneWeight: 1.0, stoneType: 'Ruby', stoneCharges: 8000,
        net: 13.0, wastage: 4, wastageW: 0.520, billable: 13.520,
        goldRate: 6250, goldValue: 84500, makingCharges: 14000, total: 106500,
      },
    ],
    subtotal: 1091750, discount: 25000, gst: 32003, total: 1098753,
  },
  {
    id: 'QT-011', customerId: 19, customerName: 'Suresh Kumar', mobile: '9754321098',
    date: '2026-06-18', validUntil: '2026-07-02', status: 'Expired', notes: 'Office-wear daily jewellery set',
    items: [
      {
        name: 'Ladies Gold Necklace 22K', purity: '22K', qty: 1,
        grossWeight: 18.0, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 18.0, wastage: 4, wastageW: 0.720, billable: 18.720,
        goldRate: 6250, goldValue: 117000, makingCharges: 14000, total: 131000,
      },
      {
        name: 'Gold Stud Earrings 22K', purity: '22K', qty: 1,
        grossWeight: 8.0, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 8.0, wastage: 4, wastageW: 0.320, billable: 8.320,
        goldRate: 6250, goldValue: 52000, makingCharges: 7000, total: 59000,
      },
    ],
    subtotal: 190000, discount: 5000, gst: 5550, total: 190550,
  },
  {
    id: 'QT-012', customerId: 7, customerName: 'Karan Mehta', mobile: '9812345988',
    date: '2026-07-04', validUntil: '2026-07-18', status: 'Sent', notes: 'Heavy kada-style bracelet for daily wear',
    items: [
      {
        name: "Men's Kada Bracelet 22K", purity: '22K', qty: 1,
        grossWeight: 32.0, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 32.0, wastage: 4, wastageW: 1.280, billable: 33.280,
        goldRate: 6250, goldValue: 208000, makingCharges: 20000, total: 228000,
      },
    ],
    subtotal: 228000, discount: 5000, gst: 6690, total: 229690,
  },
  {
    id: 'QT-013', customerId: 21, customerName: 'Deepak Choudhary', mobile: '9812323456',
    date: '2026-07-01', validUntil: '2026-07-15', status: 'Approved', notes: 'Bulk gifting order — 3 identical chains',
    items: [
      {
        name: 'Rope Chain 22K 26g', purity: '22K', qty: 3,
        grossWeight: 26.0, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 26.0, wastage: 4, wastageW: 1.040, billable: 27.040,
        goldRate: 6250, goldValue: 169000, makingCharges: 9000, total: 534000,
      },
    ],
    subtotal: 534000, discount: 10000, gst: 15720, total: 539720,
  },
  {
    id: 'QT-014', customerId: 4, customerName: 'Sneha Reddy', mobile: '9845123670',
    date: '2026-07-05', validUntil: '2026-07-19', status: 'Draft', notes: 'Simple lightweight necklace for daily use',
    items: [
      {
        name: 'Simple Gold Necklace 22K', purity: '22K', qty: 1,
        grossWeight: 21.0, stoneWeight: 0, stoneType: 'None', stoneCharges: 0,
        net: 21.0, wastage: 4, wastageW: 0.840, billable: 21.840,
        goldRate: 6250, goldValue: 136500, makingCharges: 14000, total: 150500,
      },
    ],
    subtotal: 150500, discount: 2000, gst: 4455, total: 152955,
  },
  {
    id: 'QT-015', customerId: 12, customerName: 'Nisha Bhat', mobile: '9767123456',
    date: '2026-06-29', validUntil: '2026-07-13', status: 'Sent', notes: 'Party wear diamond earrings',
    items: [
      {
        name: 'Diamond Drop Earrings 18K (pair)', purity: '18K', qty: 1,
        grossWeight: 5.2, stoneWeight: 0.9, stoneType: 'Diamond', stoneCharges: 42000,
        net: 4.3, wastage: 3, wastageW: 0.129, billable: 4.429,
        goldRate: 5110, goldValue: 22632, makingCharges: 12000, total: 76632,
      },
    ],
    subtotal: 76632, discount: 632, gst: 2280, total: 78280,
  },
];

// ACCOUNTS / LEDGER mock data
export const dayBook = [
  { id: 'DB-001', date: '2026-07-06', type: 'Sale', description: 'Invoice INV-1022 - Aarav Sharma', refNo: 'INV-1022', debit: 0, credit: 245000, balance: 245000, paymentMode: 'UPI', category: 'Sales' },
  { id: 'DB-002', date: '2026-07-06', type: 'Sale', description: 'Invoice INV-1023 - Vikram Singh', refNo: 'INV-1023', debit: 0, credit: 650000, balance: 895000, paymentMode: 'Card', category: 'Sales' },
  { id: 'DB-003', date: '2026-07-06', type: 'Expense', description: 'Gold Purchase - Malabar Jewels', refNo: 'PO-0045', debit: 485000, credit: 0, balance: 410000, paymentMode: 'Cheque', category: 'Purchase' },
  { id: 'DB-004', date: '2026-07-06', type: 'Repair', description: 'Repair Advance JC-018', refNo: 'JC-018', debit: 0, credit: 0, balance: 410000, paymentMode: 'Cash', category: 'Repair' },
  { id: 'DB-005', date: '2026-07-05', type: 'Sale', description: 'Invoice INV-1020 - Sanjay Gupta', refNo: 'INV-1020', debit: 0, credit: 425000, balance: 835000, paymentMode: 'Cheque', category: 'Sales' },
  { id: 'DB-006', date: '2026-07-05', type: 'Sale', description: 'Invoice INV-1021 - Pooja Desai', refNo: 'INV-1021', debit: 0, credit: 88000, balance: 923000, paymentMode: 'UPI', category: 'Sales' },
  { id: 'DB-007', date: '2026-07-05', type: 'Expense', description: 'Staff Salary - July advance', refNo: 'SAL-07-2026', debit: 45000, credit: 0, balance: 878000, paymentMode: 'Bank Transfer', category: 'Salary' },
  { id: 'DB-008', date: '2026-07-04', type: 'Sale', description: 'Invoice INV-1019 - Rahul Verma', refNo: 'INV-1019', debit: 0, credit: 180000, balance: 1058000, paymentMode: 'Cash', category: 'Sales' },
  { id: 'DB-009', date: '2026-07-04', type: 'Exchange', description: 'Old Gold Purchase - Meera Joshi', refNo: 'OG-0034', debit: 52000, credit: 0, balance: 1006000, paymentMode: 'Cash', category: 'Old Gold' },
  { id: 'DB-010', date: '2026-07-03', type: 'Sale', description: 'Invoice INV-1018 - Ananya Iyer', refNo: 'INV-1018', debit: 0, credit: 365000, balance: 1371000, paymentMode: 'Card', category: 'Sales' },
  { id: 'DB-011', date: '2026-07-03', type: 'Expense', description: 'Store Electricity Bill', refNo: 'UTIL-2026-07', debit: 8500, credit: 0, balance: 1362500, paymentMode: 'Online', category: 'Utility' },
  { id: 'DB-012', date: '2026-07-02', type: 'Sale', description: 'Invoice INV-1017 - Aditya Malhotra', refNo: 'INV-1017', debit: 0, credit: 141500, balance: 1504000, paymentMode: 'UPI', category: 'Sales' },
  { id: 'DB-013', date: '2026-07-02', type: 'Sale', description: 'Invoice INV-1016 - Rohit Kapoor', refNo: 'INV-1016', debit: 0, credit: 212000, balance: 1716000, paymentMode: 'Cash', category: 'Sales' },
  { id: 'DB-014', date: '2026-07-01', type: 'Expense', description: 'Gold Purchase - Shri Jewels Supplier', refNo: 'PO-0044', debit: 320000, credit: 0, balance: 1396000, paymentMode: 'Cheque', category: 'Purchase' },
  { id: 'DB-015', date: '2026-07-01', type: 'Sale', description: 'Invoice INV-1015 - Karan Mehta', refNo: 'INV-1015', debit: 0, credit: 213000, balance: 1609000, paymentMode: 'Card', category: 'Sales' },
  { id: 'DB-016', date: '2026-06-30', type: 'Sale', description: 'Invoice INV-1014 - Suresh Kumar', refNo: 'INV-1014', debit: 0, credit: 495000, balance: 2104000, paymentMode: 'Card', category: 'Sales' },
  { id: 'DB-017', date: '2026-06-30', type: 'Expense', description: 'Packaging & Display materials', refNo: 'EXP-0231', debit: 12000, credit: 0, balance: 2092000, paymentMode: 'Cash', category: 'Operations' },
  { id: 'DB-018', date: '2026-06-29', type: 'Sale', description: 'Invoice INV-1013 - Nisha Bhat', refNo: 'INV-1013', debit: 0, credit: 127200, balance: 2219200, paymentMode: 'UPI', category: 'Sales' },
  { id: 'DB-019', date: '2026-06-28', type: 'Sale', description: 'Invoice INV-1012 - Manish Tiwari', refNo: 'INV-1012', debit: 0, credit: 850000, balance: 3069200, paymentMode: 'Cheque', category: 'Sales' },
  { id: 'DB-020', date: '2026-06-28', type: 'Exchange', description: 'Old Gold Purchase - Deepak Choudhary', refNo: 'OG-0033', debit: 78000, credit: 0, balance: 2991200, paymentMode: 'Cash', category: 'Old Gold' },
];

// AUDIT LOG — 25 entries
export const auditLog = [
  { id: 1, timestamp: '2026-07-06 10:32:15', user: 'Priya Sharma (Admin)', action: 'Created Invoice', module: 'Billing', details: 'INV-1023 for Vikram Singh - ₹6,50,000', ip: '192.168.1.101', status: 'Success' },
  { id: 2, timestamp: '2026-07-06 10:15:44', user: 'Rajan Kumar (Manager)', action: 'Updated Inventory', module: 'Inventory', details: 'Updated stock qty for GC-002 Rope Chain from 8 to 6', ip: '192.168.1.103', status: 'Success' },
  { id: 3, timestamp: '2026-07-06 09:58:22', user: 'Sneha Iyer (Sales)', action: 'Added Customer', module: 'Customers', details: 'New customer: Arjun Menon (9800987612)', ip: '192.168.1.105', status: 'Success' },
  { id: 4, timestamp: '2026-07-06 09:45:00', user: 'Priya Sharma (Admin)', action: 'Login', module: 'Auth', details: 'Successful login from Chrome/Windows', ip: '192.168.1.101', status: 'Success' },
  { id: 5, timestamp: '2026-07-06 09:30:11', user: 'Unknown', action: 'Failed Login', module: 'Auth', details: 'Invalid password for demo@goldcrm.com - 2 attempts', ip: '192.168.1.115', status: 'Failed' },
  { id: 6, timestamp: '2026-07-05 18:25:33', user: 'Rajan Kumar (Manager)', action: 'Created Job Card', module: 'Repairs', details: 'JC-016 for Meera Joshi - Ring rhodium plating', ip: '192.168.1.103', status: 'Success' },
  { id: 7, timestamp: '2026-07-05 17:45:20', user: 'Priya Sharma (Admin)', action: 'Updated Gold Rate', module: 'Settings', details: 'Gold rate updated: ₹6,200 → ₹6,250 per gram (22K)', ip: '192.168.1.101', status: 'Success' },
  { id: 8, timestamp: '2026-07-05 16:30:00', user: 'Sneha Iyer (Sales)', action: 'Created Invoice', module: 'Billing', details: 'INV-1021 for Pooja Desai - ₹88,000', ip: '192.168.1.105', status: 'Success' },
  { id: 9, timestamp: '2026-07-05 15:15:45', user: 'Rajan Kumar (Manager)', action: 'Added Product', module: 'Inventory', details: 'New item: GR-033 Ladies Diamond Ring 22K 6g', ip: '192.168.1.103', status: 'Success' },
  { id: 10, timestamp: '2026-07-05 14:00:30', user: 'Priya Sharma (Admin)', action: 'Created Quotation', module: 'Quotations', details: 'QT-010 for Priya Patel - Full Bridal Set ₹8,63,250', ip: '192.168.1.101', status: 'Success' },
  { id: 11, timestamp: '2026-07-05 13:45:22', user: 'Sneha Iyer (Sales)', action: 'Updated Customer', module: 'Customers', details: 'Added loyalty points 450pts to Aarav Sharma', ip: '192.168.1.105', status: 'Success' },
  { id: 12, timestamp: '2026-07-04 17:30:00', user: 'Priya Sharma (Admin)', action: 'Deleted Quotation', module: 'Quotations', details: 'QT-011 - Expired quote deleted', ip: '192.168.1.101', status: 'Success' },
  { id: 13, timestamp: '2026-07-04 16:20:15', user: 'Rajan Kumar (Manager)', action: 'Scheme Payment', module: 'Savings', details: 'Monthly payment recorded for Ananya Iyer - ₹25,000', ip: '192.168.1.103', status: 'Success' },
  { id: 14, timestamp: '2026-07-04 15:00:00', user: 'Sneha Iyer (Sales)', action: 'Old Gold Exchange', module: 'Old Gold', details: 'OG-035: Meera Joshi - 18g 22K gold exchanged ₹1,05,750', ip: '192.168.1.105', status: 'Success' },
  { id: 15, timestamp: '2026-07-03 18:00:00', user: 'Priya Sharma (Admin)', action: 'Exported Report', module: 'Reports', details: 'Monthly Sales Report June 2026 exported as PDF', ip: '192.168.1.101', status: 'Success' },
  { id: 16, timestamp: '2026-07-03 12:30:00', user: 'Rajan Kumar (Manager)', action: 'Updated Job Card', module: 'Repairs', details: 'JC-008 status: Received → In Progress', ip: '192.168.1.103', status: 'Success' },
  { id: 17, timestamp: '2026-07-02 17:45:00', user: 'Sneha Iyer (Sales)', action: 'Created Invoice', module: 'Billing', details: 'INV-1017 for Aditya Malhotra - ₹1,41,500', ip: '192.168.1.105', status: 'Success' },
  { id: 18, timestamp: '2026-07-02 11:20:00', user: 'Priya Sharma (Admin)', action: 'Added Staff', module: 'Staff', details: 'New employee: Rahul Mishra - Sales Executive', ip: '192.168.1.101', status: 'Success' },
  { id: 19, timestamp: '2026-07-01 16:30:00', user: 'Rajan Kumar (Manager)', action: 'Supplier Payment', module: 'Suppliers', details: 'Payment ₹3,20,000 to Shri Jewels - Cheque no. 112233', ip: '192.168.1.103', status: 'Success' },
  { id: 20, timestamp: '2026-07-01 10:00:00', user: 'Priya Sharma (Admin)', action: 'Backup Created', module: 'Settings', details: 'Full database backup exported to Google Drive', ip: '192.168.1.101', status: 'Success' },
  { id: 21, timestamp: '2026-06-30 18:45:00', user: 'Sneha Iyer (Sales)', action: 'Campaign Sent', module: 'Marketing', details: 'WhatsApp campaign "June Offers" sent to 248 customers', ip: '192.168.1.105', status: 'Success' },
  { id: 22, timestamp: '2026-06-30 15:00:00', user: 'Priya Sharma (Admin)', action: 'Permission Changed', module: 'Settings', details: 'Sneha Iyer role: Sales → Senior Sales', ip: '192.168.1.101', status: 'Success' },
  { id: 23, timestamp: '2026-06-29 14:30:00', user: 'Rajan Kumar (Manager)', action: 'Stock Audit', module: 'Inventory', details: 'Physical stock count completed - 2 discrepancies found', ip: '192.168.1.103', status: 'Success' },
  { id: 24, timestamp: '2026-06-28 11:00:00', user: 'Unknown', action: 'Failed Login', module: 'Auth', details: 'Account locked after 5 failed attempts - rajan@goldcrm.com', ip: '192.168.1.200', status: 'Failed' },
  { id: 25, timestamp: '2026-06-27 17:00:00', user: 'Priya Sharma (Admin)', action: 'GST Filing', module: 'Reports', details: 'GSTR-1 for May 2026 generated and downloaded', ip: '192.168.1.101', status: 'Success' },
];

// GOLD RATE HISTORY (last 30 days)
export const goldRateHistory = [
  { date: '2026-06-07', rate22K: 6050, rate24K: 6600, rate18K: 4950 },
  { date: '2026-06-08', rate22K: 6080, rate24K: 6630, rate18K: 4970 },
  { date: '2026-06-09', rate22K: 6100, rate24K: 6650, rate18K: 4990 },
  { date: '2026-06-10', rate22K: 6090, rate24K: 6640, rate18K: 4980 },
  { date: '2026-06-11', rate22K: 6120, rate24K: 6680, rate18K: 5010 },
  { date: '2026-06-12', rate22K: 6150, rate24K: 6710, rate18K: 5030 },
  { date: '2026-06-13', rate22K: 6140, rate24K: 6700, rate18K: 5020 },
  { date: '2026-06-14', rate22K: 6180, rate24K: 6740, rate18K: 5050 },
  { date: '2026-06-15', rate22K: 6200, rate24K: 6760, rate18K: 5060 },
  { date: '2026-06-16', rate22K: 6210, rate24K: 6770, rate18K: 5070 },
  { date: '2026-06-17', rate22K: 6190, rate24K: 6750, rate18K: 5055 },
  { date: '2026-06-18', rate22K: 6220, rate24K: 6790, rate18K: 5080 },
  { date: '2026-06-19', rate22K: 6230, rate24K: 6800, rate18K: 5090 },
  { date: '2026-06-20', rate22K: 6215, rate24K: 6785, rate18K: 5075 },
  { date: '2026-06-21', rate22K: 6240, rate24K: 6810, rate18K: 5100 },
  { date: '2026-06-22', rate22K: 6250, rate24K: 6820, rate18K: 5110 },
  { date: '2026-06-23', rate22K: 6260, rate24K: 6830, rate18K: 5120 },
  { date: '2026-06-24', rate22K: 6245, rate24K: 6815, rate18K: 5105 },
  { date: '2026-06-25', rate22K: 6270, rate24K: 6845, rate18K: 5130 },
  { date: '2026-06-26', rate22K: 6280, rate24K: 6855, rate18K: 5140 },
  { date: '2026-06-27', rate22K: 6265, rate24K: 6840, rate18K: 5125 },
  { date: '2026-06-28', rate22K: 6290, rate24K: 6870, rate18K: 5155 },
  { date: '2026-06-29', rate22K: 6300, rate24K: 6880, rate18K: 5165 },
  { date: '2026-06-30', rate22K: 6285, rate24K: 6865, rate18K: 5150 },
  { date: '2026-07-01', rate22K: 6310, rate24K: 6890, rate18K: 5175 },
  { date: '2026-07-02', rate22K: 6320, rate24K: 6900, rate18K: 5185 },
  { date: '2026-07-03', rate22K: 6305, rate24K: 6885, rate18K: 5170 },
  { date: '2026-07-04', rate22K: 6330, rate24K: 6910, rate18K: 5195 },
  { date: '2026-07-05', rate22K: 6340, rate24K: 6920, rate18K: 5205 },
  { date: '2026-07-06', rate22K: 6250, rate24K: 6820, rate18K: 5110 },
];

// NOTIFICATIONS
export const notifications = [
  { id: 1, type: 'alert', icon: 'alert', title: 'Low Stock Alert', message: 'Temple Necklace Set (GN-010) is Out of Stock', time: '10 min ago', read: false, link: '/inventory' },
  { id: 2, type: 'birthday', icon: 'cake', title: 'Birthday Today', message: "Divya Nair's birthday today - send wishes!", time: '1 hr ago', read: false, link: '/customers' },
  { id: 3, type: 'repair', icon: 'wrench', title: 'Repair Ready', message: 'JC-003 (Ananya Iyer) - Bangle polishing is ready for pickup', time: '2 hrs ago', read: false, link: '/repairs' },
  { id: 4, type: 'scheme', icon: 'piggy', title: 'Scheme Due', message: '3 savings scheme payments due this week', time: '3 hrs ago', read: true, link: '/savings' },
  { id: 5, type: 'alert', icon: 'alert', title: 'Low Stock Alert', message: 'Antique Necklace (GN-004) - only 1 piece left (Restock)', time: '5 hrs ago', read: true, link: '/inventory' },
  { id: 6, type: 'sale', icon: 'sale', title: 'Large Sale', message: 'Invoice INV-1023 ₹6,50,000 by Vikram Singh', time: '6 hrs ago', read: true, link: '/billing' },
  { id: 7, type: 'repair', icon: 'wrench', title: 'Repair Overdue', message: 'JC-002 (Rahul Verma) - Necklace clasp is overdue by 3 days', time: '1 day ago', read: true, link: '/repairs' },
  { id: 8, type: 'scheme', icon: 'piggy', title: 'Scheme Matured', message: "Aarav Sharma's Gold Monthly scheme matures next month", time: '1 day ago', read: true, link: '/savings' },
  { id: 9, type: 'anniversary', icon: 'heart', title: 'Anniversary Tomorrow', message: "Ananya Iyer's anniversary is tomorrow - send offer!", time: '2 days ago', read: true, link: '/marketing' },
  { id: 10, type: 'alert', icon: 'alert', title: 'GST Filing Due', message: 'GSTR-1 filing for June 2026 is due in 5 days', time: '2 days ago', read: true, link: '/reports' },
];

// LOYALTY POINTS
export const loyaltyPoints = {
  1: { points: 8500, tier: 'Gold', lastEarned: '2026-06-14', history: [{ date: '2026-06-14', earned: 2450, desc: 'Purchase INV-1001' }, { date: '2026-03-02', earned: 1800, desc: 'Purchase INV-0954' }, { date: '2025-11-20', earned: 4250, desc: 'Purchase INV-0801' }] },
  2: { points: 3200, tier: 'Silver', lastEarned: '2026-05-22', history: [{ date: '2026-05-22', earned: 1450, desc: 'Purchase INV-0987' }, { date: '2025-10-12', earned: 1750, desc: 'Purchase INV-0800' }] },
  3: { points: 12500, tier: 'Platinum', lastEarned: '2026-06-30', history: [{ date: '2026-06-30', earned: 4250, desc: 'Purchase INV-1010' }] },
  5: { points: 21000, tier: 'Platinum', lastEarned: '2026-06-28', history: [{ date: '2026-06-28', earned: 6500, desc: 'Purchase INV-1008' }] },
  9: { points: 9700, tier: 'Gold', lastEarned: '2026-06-20', history: [] },
  11: { points: 32000, tier: 'Platinum', lastEarned: '2026-06-25', history: [] },
};

// KYC status by customer id
export const kycStatus = {
  1: 'Verified', 2: 'Verified', 3: 'Verified', 4: 'Pending', 5: 'Verified',
  6: 'Verified', 7: 'Pending', 8: 'Pending', 9: 'Verified', 10: 'Pending',
  11: 'Verified', 12: 'Verified', 13: 'Pending', 14: 'Verified', 15: 'Verified',
  16: 'Pending', 17: 'Verified', 18: 'Pending', 19: 'Verified', 20: 'Pending',
  21: 'Verified', 22: 'Pending'
};

// GST REPORT DATA
export const gstrData = {
  gstr1: [
    { invoiceNo: 'INV-1023', date: '2026-07-06', customer: 'Vikram Singh', gstin: '27AAFCS1726F1ZA', taxableValue: 618095, cgst: 15952, sgst: 15952, total: 650000, type: 'B2B' },
    { invoiceNo: 'INV-1022', date: '2026-07-06', customer: 'Aarav Sharma', gstin: null, taxableValue: 232143, cgst: 6429, sgst: 6429, total: 245000, type: 'B2C' },
    { invoiceNo: 'INV-1021', date: '2026-07-05', customer: 'Pooja Desai', gstin: null, taxableValue: 83333, cgst: 2333, sgst: 2333, total: 88000, type: 'B2C' },
    { invoiceNo: 'INV-1020', date: '2026-07-05', customer: 'Sanjay Gupta', gstin: '07AAECS1726F1ZB', taxableValue: 403095, cgst: 10952, sgst: 10952, total: 425000, type: 'B2B' },
    { invoiceNo: 'INV-1019', date: '2026-07-04', customer: 'Rahul Verma', gstin: null, taxableValue: 170952, cgst: 4524, sgst: 4524, total: 180000, type: 'B2C' },
    { invoiceNo: 'INV-1018', date: '2026-07-03', customer: 'Ananya Iyer', gstin: null, taxableValue: 346667, cgst: 9167, sgst: 9167, total: 365000, type: 'B2C' },
    { invoiceNo: 'INV-1017', date: '2026-07-02', customer: 'Aditya Malhotra', gstin: null, taxableValue: 134286, cgst: 3607, sgst: 3607, total: 141500, type: 'B2C' },
    { invoiceNo: 'INV-1016', date: '2026-07-02', customer: 'Rohit Kapoor', gstin: null, taxableValue: 201143, cgst: 5429, sgst: 5429, total: 212000, type: 'B2C' },
    { invoiceNo: 'INV-1015', date: '2026-07-01', customer: 'Karan Mehta', gstin: null, taxableValue: 202143, cgst: 5429, sgst: 5429, total: 213000, type: 'B2C' },
    { invoiceNo: 'INV-1014', date: '2026-06-30', customer: 'Suresh Kumar', gstin: '33AAFSS1726F1ZC', taxableValue: 469524, cgst: 12738, sgst: 12738, total: 495000, type: 'B2B' },
  ],
  summary: { totalB2B: 1769190, totalB2C: 2444786, totalCGST: 86060, totalSGST: 86060, totalGST: 172120, period: 'July 2026 (1-6)' }
};

// =========================================================================
// PURCHASE MANAGEMENT
// =========================================================================
export const purchaseOrders = [
  { id: 'PO-001', supplierId: 1, supplierName: 'Malabar Jewels Pvt Ltd', date: '2026-07-01', expectedDate: '2026-07-05', items: [{ name: 'Gold Rope Chains 22K', qty: 5, weight: 100, rate: 6100, amount: 610000 }, { name: 'Gold Bangles 22K', qty: 3, weight: 120, rate: 6100, amount: 732000 }], subtotal: 1342000, gst: 40260, total: 1382260, status: 'Received', paymentStatus: 'Partial', paidAmount: 900000, balance: 482260, notes: 'Bulk order for festival stock' },
  { id: 'PO-002', supplierId: 2, supplierName: 'Shri Jewels Mumbai', date: '2026-07-03', expectedDate: '2026-07-08', items: [{ name: 'Diamond Solitaire Rings 18K', qty: 4, weight: 22, rate: 5800, amount: 127600 }, { name: 'Diamond Earrings 18K', qty: 6, weight: 18, rate: 5800, amount: 104400 }], subtotal: 232000, gst: 6960, total: 238960, status: 'Ordered', paymentStatus: 'Pending', paidAmount: 0, balance: 238960, notes: '' },
  { id: 'PO-003', supplierId: 3, supplierName: 'Rajkot Gold Traders', date: '2026-06-25', expectedDate: '2026-06-28', items: [{ name: 'Gold Coins 24K 10g', qty: 20, weight: 200, rate: 6800, amount: 1360000 }, { name: 'Gold Bars 24K 50g', qty: 5, weight: 250, rate: 6750, amount: 1687500 }], subtotal: 3047500, gst: 91425, total: 3138925, status: 'Received', paymentStatus: 'Paid', paidAmount: 3138925, balance: 0, notes: 'Investment gold stock' },
  { id: 'PO-004', supplierId: 1, supplierName: 'Malabar Jewels Pvt Ltd', date: '2026-06-20', expectedDate: '2026-06-24', items: [{ name: 'Antique Necklace Sets 22K', qty: 2, weight: 140, rate: 6050, amount: 847000 }, { name: 'Temple Jewellery Set 22K', qty: 1, weight: 68, rate: 6050, amount: 411400 }], subtotal: 1258400, gst: 37752, total: 1296152, status: 'Received', paymentStatus: 'Paid', paidAmount: 1296152, balance: 0, notes: '' },
  { id: 'PO-005', supplierId: 4, supplierName: 'Chennai Diamond House', date: '2026-07-05', expectedDate: '2026-07-12', items: [{ name: 'Diamond Pendants 18K', qty: 8, weight: 32, rate: 5900, amount: 188800 }, { name: 'Diamond Bangles 18K', qty: 3, weight: 45, rate: 5900, amount: 265500 }], subtotal: 454300, gst: 13629, total: 467929, status: 'Ordered', paymentStatus: 'Pending', paidAmount: 100000, balance: 367929, notes: 'Urgent diamond restocking' },
  { id: 'PO-006', supplierId: 2, supplierName: 'Shri Jewels Mumbai', date: '2026-06-15', expectedDate: '2026-06-18', items: [{ name: 'Ladies Gold Rings 22K', qty: 15, weight: 90, rate: 6000, amount: 540000 }], subtotal: 540000, gst: 16200, total: 556200, status: 'Received', paymentStatus: 'Paid', paidAmount: 556200, balance: 0, notes: '' },
  { id: 'PO-007', supplierId: 5, supplierName: 'Hyderabad Pearl & Gold', date: '2026-07-06', expectedDate: '2026-07-15', items: [{ name: 'Pearl Necklace 22K Setting', qty: 5, weight: 50, rate: 6250, amount: 312500 }, { name: 'Pearl Earrings 22K', qty: 10, weight: 20, rate: 6250, amount: 125000 }], subtotal: 437500, gst: 13125, total: 450625, status: 'Draft', paymentStatus: 'Pending', paidAmount: 0, balance: 450625, notes: 'New vendor trial order' },
  { id: 'PO-008', supplierId: 3, supplierName: 'Rajkot Gold Traders', date: '2026-06-10', expectedDate: '2026-06-13', items: [{ name: 'Gold Chains 22K 15g each', qty: 20, weight: 300, rate: 5980, amount: 1794000 }], subtotal: 1794000, gst: 53820, total: 1847820, status: 'Received', paymentStatus: 'Partial', paidAmount: 1200000, balance: 647820, notes: '' },
];

export const goodsReceiptNotes = [
  { id: 'GRN-001', poId: 'PO-001', date: '2026-07-05', receivedBy: 'Rajan Kumar', items: [{ name: 'Gold Rope Chains 22K', orderedQty: 5, receivedQty: 5, weight: 100, condition: 'Good' }, { name: 'Gold Bangles 22K', orderedQty: 3, receivedQty: 3, weight: 120, condition: 'Good' }], totalWeight: 220, remarks: 'All items received in good condition', qualityCheck: 'Passed' },
  { id: 'GRN-002', poId: 'PO-003', date: '2026-06-28', receivedBy: 'Priya Sharma', items: [{ name: 'Gold Coins 24K 10g', orderedQty: 20, receivedQty: 20, weight: 200, condition: 'Good' }, { name: 'Gold Bars 24K 50g', orderedQty: 5, receivedQty: 5, weight: 250, condition: 'Good' }], totalWeight: 450, remarks: 'Verified with hallmark certificates', qualityCheck: 'Passed' },
  { id: 'GRN-003', poId: 'PO-004', date: '2026-06-24', receivedBy: 'Rajan Kumar', items: [{ name: 'Antique Necklace Sets 22K', orderedQty: 2, receivedQty: 2, weight: 140, condition: 'Good' }, { name: 'Temple Jewellery Set 22K', orderedQty: 1, receivedQty: 1, weight: 68, condition: 'Good' }], totalWeight: 208, remarks: '', qualityCheck: 'Passed' },
  { id: 'GRN-004', poId: 'PO-006', date: '2026-06-18', receivedBy: 'Sneha Iyer', items: [{ name: 'Ladies Gold Rings 22K', orderedQty: 15, receivedQty: 14, weight: 84, condition: 'Good' }], totalWeight: 84, remarks: '1 piece damaged during transit — returned to supplier', qualityCheck: 'Partial' },
];

export const purchaseReturns = [
  { id: 'PR-001', poId: 'PO-006', grnId: 'GRN-004', date: '2026-06-19', supplierName: 'Shri Jewels Mumbai', item: 'Ladies Gold Ring 22K', qty: 1, weight: 6, reason: 'Damaged during transit — bent shank', creditAmount: 37800, status: 'Credited' },
  { id: 'PR-002', poId: 'PO-001', date: '2026-07-06', supplierName: 'Malabar Jewels Pvt Ltd', item: 'Gold Bangle 22K - size defect', qty: 1, weight: 40, reason: 'Wrong size delivered, does not match order specification', creditAmount: 244000, status: 'Pending' },
];

// =========================================================================
// MANUFACTURING / KARIGAR
// =========================================================================
export const karigars = [
  { id: 1, name: 'Ramesh Soni', mobile: '9876501111', specialty: 'Gold Rings & Bangles', address: 'Zaveri Bazaar, Mumbai', ratePerGram: 180, balance: 12500, status: 'Active', joinDate: '2020-01-15', totalWork: 145 },
  { id: 2, name: 'Suresh Gupta', mobile: '9876502222', specialty: 'Necklace & Sets', address: 'Jaipur, Rajasthan', ratePerGram: 220, balance: 8700, status: 'Active', joinDate: '2019-06-20', totalWork: 203 },
  { id: 3, name: 'Prabhudas Mehta', mobile: '9876503333', specialty: 'Diamond Setting', address: 'Surat, Gujarat', ratePerGram: 350, balance: 22000, status: 'Active', joinDate: '2021-03-10', totalWork: 98 },
  { id: 4, name: 'Vijay Thakur', mobile: '9876504444', specialty: 'Chains & Bracelets', address: 'Ahmedabad, Gujarat', ratePerGram: 150, balance: 4200, status: 'Active', joinDate: '2022-09-01', totalWork: 67 },
  { id: 5, name: 'Ajay Patel', mobile: '9876505555', specialty: 'Antique & Temple Jewellery', address: 'Thrissur, Kerala', ratePerGram: 280, balance: 15600, status: 'Active', joinDate: '2020-11-25', totalWork: 112 },
];

export const karigarOrders = [
  { id: 'KO-001', karigarId: 1, karigarName: 'Ramesh Soni', designNo: 'DSN-045', description: 'Ladies Finger Ring 22K - Floral Design', category: 'Rings', goldIssued: 8.5, expectedFinishedWeight: 8.0, returnedWeight: null, wastage: null, issueDate: '2026-07-01', expectedDate: '2026-07-07', returnDate: null, purity: '22K', labourPerGram: 180, totalLabour: null, advancePaid: 800, status: 'Issued', notes: 'Refer design image DSN-045' },
  { id: 'KO-002', karigarId: 2, karigarName: 'Suresh Gupta', designNo: 'DSN-078', description: 'Bridal Necklace Set 22K - Peacock Design', category: 'Necklace', goldIssued: 75, expectedFinishedWeight: 72, returnedWeight: 72.2, wastage: 2.8, issueDate: '2026-06-20', expectedDate: '2026-06-30', returnDate: '2026-06-29', purity: '22K', labourPerGram: 220, totalLabour: 15884, advancePaid: 8000, status: 'Received', notes: 'Quality check passed' },
  { id: 'KO-003', karigarId: 3, karigarName: 'Prabhudas Mehta', designNo: 'DSN-112', description: 'Diamond Solitaire Ring 18K - 0.5ct', category: 'Rings', goldIssued: 5.5, expectedFinishedWeight: 5.2, returnedWeight: null, wastage: null, issueDate: '2026-07-03', expectedDate: '2026-07-10', returnDate: null, purity: '18K', labourPerGram: 350, totalLabour: null, advancePaid: 1500, status: 'In Progress', notes: 'Stone provided separately' },
  { id: 'KO-004', karigarId: 1, karigarName: 'Ramesh Soni', designNo: 'DSN-033', description: 'Kada Bracelet 22K - Plain Polish', category: 'Bangles', goldIssued: 28, expectedFinishedWeight: 27.2, returnedWeight: 27.5, wastage: 0.5, issueDate: '2026-06-25', expectedDate: '2026-06-30', returnDate: '2026-06-30', purity: '22K', labourPerGram: 180, totalLabour: 4950, advancePaid: 2500, status: 'Received', notes: '' },
  { id: 'KO-005', karigarId: 5, karigarName: 'Ajay Patel', designNo: 'DSN-201', description: 'Temple Pendant Set 22K - Lakshmi Design', category: 'Necklace', goldIssued: 45, expectedFinishedWeight: 43, returnedWeight: null, wastage: null, issueDate: '2026-07-04', expectedDate: '2026-07-15', returnDate: null, purity: '22K', labourPerGram: 280, totalLabour: null, advancePaid: 5000, status: 'Issued', notes: 'Customer-specified design from reference image' },
  { id: 'KO-006', karigarId: 4, karigarName: 'Vijay Thakur', designNo: 'DSN-067', description: 'Rope Chain 22K 20g', category: 'Chains', goldIssued: 21, expectedFinishedWeight: 20, returnedWeight: 20.1, wastage: 0.9, issueDate: '2026-06-28', expectedDate: '2026-07-02', returnDate: '2026-07-01', purity: '22K', labourPerGram: 150, totalLabour: 3015, advancePaid: 1500, status: 'Received', notes: '' },
  { id: 'KO-007', karigarId: 2, karigarName: 'Suresh Gupta', designNo: 'DSN-089', description: 'Antique Necklace 22K - South Indian Style', category: 'Necklace', goldIssued: 38, expectedFinishedWeight: 36, returnedWeight: null, wastage: null, issueDate: '2026-07-05', expectedDate: '2026-07-18', returnDate: null, purity: '22K', labourPerGram: 220, totalLabour: null, advancePaid: 3000, status: 'Issued', notes: 'Customer order - urgent' },
  { id: 'KO-008', karigarId: 3, karigarName: 'Prabhudas Mehta', designNo: 'DSN-156', description: 'Diamond Earrings 18K - Drop Design', category: 'Earrings', goldIssued: 8, expectedFinishedWeight: 7.5, returnedWeight: 7.6, wastage: 0.4, issueDate: '2026-06-22', expectedDate: '2026-06-28', returnDate: '2026-06-27', purity: '18K', labourPerGram: 350, totalLabour: 2660, advancePaid: 1200, status: 'Received', notes: '' },
  { id: 'KO-009', karigarId: 1, karigarName: 'Ramesh Soni', designNo: 'DSN-019', description: 'Kids Gold Bracelet 22K', category: 'Bangles', goldIssued: 5, expectedFinishedWeight: 4.8, returnedWeight: null, wastage: null, issueDate: '2026-07-06', expectedDate: '2026-07-10', returnDate: null, purity: '22K', labourPerGram: 180, totalLabour: null, advancePaid: 400, status: 'Issued', notes: '' },
  { id: 'KO-010', karigarId: 5, karigarName: 'Ajay Patel', designNo: 'DSN-144', description: 'Antique Jhumka Earrings 22K', category: 'Earrings', goldIssued: 14, expectedFinishedWeight: 13.2, returnedWeight: 13.4, wastage: 0.6, issueDate: '2026-06-18', expectedDate: '2026-06-25', returnDate: '2026-06-24', purity: '22K', labourPerGram: 280, totalLabour: 3752, advancePaid: 2000, status: 'Received', notes: 'Customer very happy with quality' },
  { id: 'KO-011', karigarId: 4, karigarName: 'Vijay Thakur', designNo: 'DSN-072', description: 'Box Chain 22K 18g', category: 'Chains', goldIssued: 19, expectedFinishedWeight: 18, returnedWeight: null, wastage: null, issueDate: '2026-07-02', expectedDate: '2026-07-08', returnDate: null, purity: '22K', labourPerGram: 150, totalLabour: null, advancePaid: 1200, status: 'In Progress', notes: '' },
  { id: 'KO-012', karigarId: 2, karigarName: 'Suresh Gupta', designNo: 'DSN-099', description: 'Choker Necklace 22K - Kundan Work', category: 'Necklace', goldIssued: 55, expectedFinishedWeight: 52, returnedWeight: 52.5, wastage: 2.5, issueDate: '2026-06-10', expectedDate: '2026-06-22', returnDate: '2026-06-21', purity: '22K', labourPerGram: 220, totalLabour: 11550, advancePaid: 6000, status: 'Received', notes: '' },
];

// =========================================================================
// APPROVAL / HOME TRIAL
// =========================================================================
export const approvals = [
  { id: 'APR-001', customerId: 1, customerName: 'Aarav Sharma', mobile: '9876543210', itemIds: [7, 3], items: [{ name: 'Diamond Solitaire Ring', itemCode: 'GR-007', weight: 5.5, value: 180000 }, { name: 'Bridal Bangle Set', itemCode: 'GB-003', weight: 45, value: 320000 }], totalValue: 500000, deposit: 50000, issueDate: '2026-07-05', dueDate: '2026-07-08', returnDate: null, staffName: 'Priya Sharma', status: 'Active', notes: 'Customer wants to show to family', approvalSlip: 'APR-001-SLIP' },
  { id: 'APR-002', customerId: 6, customerName: 'Ananya Iyer', mobile: '9865432109', itemIds: [3], items: [{ name: 'Bridal Bangle Set', itemCode: 'GB-003', weight: 45, value: 320000 }], totalValue: 320000, deposit: 30000, issueDate: '2026-07-04', dueDate: '2026-07-07', returnDate: '2026-07-06', staffName: 'Sneha Iyer', status: 'Partially Returned', notes: 'Wants to purchase — negotiating price', approvalSlip: 'APR-002-SLIP' },
  { id: 'APR-003', customerId: 11, customerName: 'Sanjay Gupta', mobile: '9871122334', itemIds: [7, 5], items: [{ name: 'Diamond Solitaire Ring', itemCode: 'GR-007', weight: 5.5, value: 180000 }, { name: 'Diamond Studs', itemCode: 'GE-005', weight: 3.2, value: 88000 }], totalValue: 268000, deposit: 25000, issueDate: '2026-07-03', dueDate: '2026-07-06', returnDate: null, staffName: 'Priya Sharma', status: 'Overdue', notes: 'VIP customer — follow up urgently', approvalSlip: 'APR-003-SLIP' },
  { id: 'APR-004', customerId: 3, customerName: 'Rahul Verma', mobile: '9812345670', itemIds: [10], items: [{ name: 'Temple Necklace Set', itemCode: 'GN-010', weight: 68, value: 495000 }], totalValue: 495000, deposit: 50000, issueDate: '2026-06-28', dueDate: '2026-07-01', returnDate: '2026-07-01', staffName: 'Rajan Kumar', status: 'Converted', notes: 'Converted to sale — INV-1019 raised', approvalSlip: 'APR-004-SLIP' },
  { id: 'APR-005', customerId: 14, customerName: 'Pooja Desai', mobile: '9834561278', itemIds: [4, 9], items: [{ name: 'Antique Necklace', itemCode: 'GN-004', weight: 35, value: 258000 }, { name: 'Jhumka Earrings', itemCode: 'GE-009', weight: 12, value: 84000 }], totalValue: 342000, deposit: 35000, issueDate: '2026-07-01', dueDate: '2026-07-05', returnDate: '2026-07-05', staffName: 'Sneha Iyer', status: 'Returned', notes: 'Customer did not purchase', approvalSlip: 'APR-005-SLIP' },
  { id: 'APR-006', customerId: 5, customerName: 'Vikram Singh', mobile: '9887654321', itemIds: [6, 2], items: [{ name: 'Gold Coin 10g x5', itemCode: 'CO-006', weight: 50, value: 360000 }, { name: 'Rope Chain 20g', itemCode: 'GC-002', weight: 20, value: 138000 }], totalValue: 498000, deposit: 50000, issueDate: '2026-07-06', dueDate: '2026-07-10', returnDate: null, staffName: 'Priya Sharma', status: 'Active', notes: 'Corporate gifting evaluation', approvalSlip: 'APR-006-SLIP' },
  { id: 'APR-007', customerId: 17, customerName: 'Aditya Malhotra', mobile: '9789871234', itemIds: [7], items: [{ name: 'Diamond Solitaire Ring', itemCode: 'GR-007', weight: 5.5, value: 180000 }], totalValue: 180000, deposit: 20000, issueDate: '2026-06-30', dueDate: '2026-07-03', returnDate: '2026-07-02', staffName: 'Sneha Iyer', status: 'Converted', notes: 'Converted — INV-1017', approvalSlip: 'APR-007-SLIP' },
  { id: 'APR-008', customerId: 9, customerName: 'Rohit Kapoor', mobile: '9976543210', itemIds: [1, 11], items: [{ name: 'Classic Gold Ring', itemCode: 'GR-001', weight: 8.5, value: 62000 }, { name: 'Kids Ring', itemCode: 'GR-011', weight: 2.5, value: 18500 }], totalValue: 80500, deposit: 8000, issueDate: '2026-07-05', dueDate: '2026-07-09', returnDate: null, staffName: 'Rajan Kumar', status: 'Active', notes: 'For daughter', approvalSlip: 'APR-008-SLIP' },
];

// =========================================================================
// RESERVATIONS / ADVANCE BOOKINGS
// =========================================================================
export const reservations = [
  { id: 'RES-001', customerId: 2, customerName: 'Priya Patel', mobile: '9823456712', itemId: 3, itemName: 'Bridal Bangle Set 22K', itemCode: 'GB-003', itemValue: 320000, advancePaid: 80000, balance: 240000, reservedDate: '2026-07-01', expiryDate: '2026-08-01', convertedDate: null, staffName: 'Priya Sharma', status: 'Active', notes: 'Bridal purchase — wedding October 2026' },
  { id: 'RES-002', customerId: 6, customerName: 'Ananya Iyer', mobile: '9865432109', itemId: 10, itemName: 'Temple Necklace Set 22K', itemCode: 'GN-010', itemValue: 495000, advancePaid: 100000, balance: 395000, reservedDate: '2026-06-25', expiryDate: '2026-07-25', convertedDate: null, staffName: 'Sneha Iyer', status: 'Active', notes: 'Anniversary gift from husband' },
  { id: 'RES-003', customerId: 11, customerName: 'Sanjay Gupta', mobile: '9871122334', itemId: 7, itemName: 'Diamond Solitaire Ring 18K', itemCode: 'GR-007', itemValue: 180000, advancePaid: 50000, balance: 130000, reservedDate: '2026-06-20', expiryDate: '2026-07-20', convertedDate: '2026-07-05', staffName: 'Priya Sharma', status: 'Converted', notes: 'Converted to INV-1020' },
  { id: 'RES-004', customerId: 15, customerName: 'Manish Tiwari', mobile: '9787654321', itemId: 1, itemName: 'Classic Gold Ring 22K', itemCode: 'GR-001', itemValue: 62000, advancePaid: 15000, balance: 47000, reservedDate: '2026-06-10', expiryDate: '2026-07-10', convertedDate: null, staffName: 'Rajan Kumar', status: 'Expired', notes: 'Customer did not respond' },
  { id: 'RES-005', customerId: 3, customerName: 'Rahul Verma', mobile: '9812345670', itemId: 4, itemName: 'Antique Necklace 22K', itemCode: 'GN-004', itemValue: 258000, advancePaid: 60000, balance: 198000, reservedDate: '2026-07-04', expiryDate: '2026-08-04', convertedDate: null, staffName: 'Priya Sharma', status: 'Active', notes: 'Wife birthday in August' },
  { id: 'RES-006', customerId: 5, customerName: 'Vikram Singh', mobile: '9887654321', itemId: 6, itemName: 'Gold Coin 10g x10', itemCode: 'CO-006', itemValue: 720000, advancePaid: 200000, balance: 520000, reservedDate: '2026-07-03', expiryDate: '2026-08-03', convertedDate: null, staffName: 'Priya Sharma', status: 'Active', notes: 'Corporate Diwali gifts advance booking' },
  { id: 'RES-007', customerId: 19, customerName: 'Suresh Kumar', mobile: '9754321098', itemId: 2, itemName: 'Rope Chain 20g 22K', itemCode: 'GC-002', itemValue: 138000, advancePaid: 30000, balance: 108000, reservedDate: '2026-05-15', expiryDate: '2026-06-15', convertedDate: null, staffName: 'Sneha Iyer', status: 'Expired', notes: '' },
  { id: 'RES-008', customerId: 7, customerName: 'Karan Mehta', mobile: '9812345988', itemId: 8, itemName: 'Kada Bracelet 22K', itemCode: 'GC-008', itemValue: 195000, advancePaid: 50000, balance: 145000, reservedDate: '2026-07-06', expiryDate: '2026-08-06', convertedDate: null, staffName: 'Rajan Kumar', status: 'Active', notes: 'Birthday gift for wife' },
  { id: 'RES-009', customerId: 12, customerName: 'Nisha Bhat', mobile: '9767123456', itemId: 5, itemName: 'Diamond Studs 18K', itemCode: 'GE-005', itemValue: 88000, advancePaid: 20000, balance: 68000, reservedDate: '2026-06-28', expiryDate: '2026-07-28', convertedDate: null, staffName: 'Sneha Iyer', status: 'Active', notes: '' },
  { id: 'RES-010', customerId: 4, customerName: 'Sneha Reddy', mobile: '9845123670', itemId: 9, itemName: 'Jhumka Earrings 22K', itemCode: 'GE-009', itemValue: 84000, advancePaid: 20000, balance: 64000, reservedDate: '2026-07-05', expiryDate: '2026-08-05', convertedDate: null, staffName: 'Priya Sharma', status: 'Active', notes: '' },
];

// =========================================================================
// PRODUCT MASTER (DESIGN CATALOG)
// =========================================================================
export const productMaster = [
  { id: 'DSN-001', designNo: 'DSN-001', name: 'Classic Solitaire Ring', collection: 'Everyday Elegance', category: 'Rings', subCategory: 'Finger Rings', purity: ['18K', '22K'], style: 'Contemporary', gender: 'Ladies', occasion: 'Casual', makingChargeDefault: 180, wastageDefault: 3, minWeight: 3, maxWeight: 8, stoneType: 'Diamond', description: 'Simple elegant solitaire ring suitable for daily wear', tags: ['bestseller', 'daily-wear'], bgColor: '#F59E0B', status: 'Active', stockCount: 8 },
  { id: 'DSN-002', designNo: 'DSN-002', name: 'Bridal Choker Set', collection: 'Bridal Collection 2026', category: 'Necklace', subCategory: 'Choker', purity: ['22K'], style: 'Traditional', gender: 'Ladies', occasion: 'Bridal', makingChargeDefault: 280, wastageDefault: 6, minWeight: 40, maxWeight: 80, stoneType: 'Ruby & Emerald', description: 'Exquisite bridal choker with intricate filigree work', tags: ['bridal', 'premium'], bgColor: '#D97706', status: 'Active', stockCount: 2 },
  { id: 'DSN-003', designNo: 'DSN-003', name: 'Gold Bar 24K', collection: 'Investment Gold', category: 'Coins', subCategory: 'Gold Bars', purity: ['24K'], style: 'Plain', gender: 'Unisex', occasion: 'Investment', makingChargeDefault: 20, wastageDefault: 0, minWeight: 10, maxWeight: 100, stoneType: 'None', description: 'Pure 24K gold bar with BIS hallmark certification', tags: ['investment', '24k', 'bestseller'], bgColor: '#EAB308', status: 'Active', stockCount: 25 },
  { id: 'DSN-004', designNo: 'DSN-004', name: 'Temple Jhumka Earrings', collection: 'South Indian Heritage', category: 'Earrings', subCategory: 'Jhumka', purity: ['22K'], style: 'Antique', gender: 'Ladies', occasion: 'Festival', makingChargeDefault: 250, wastageDefault: 5, minWeight: 8, maxWeight: 18, stoneType: 'Emerald', description: 'Traditional South Indian jhumka with temple motifs', tags: ['antique', 'temple', 'south-indian'], bgColor: '#F97316', status: 'Active', stockCount: 6 },
  { id: 'DSN-005', designNo: 'DSN-005', name: 'Diamond Tennis Bracelet', collection: 'Diamond Luxe', category: 'Bangles', subCategory: 'Bracelet', purity: ['18K'], style: 'Contemporary', gender: 'Ladies', occasion: 'Party', makingChargeDefault: 380, wastageDefault: 3, minWeight: 10, maxWeight: 20, stoneType: 'Diamond', description: 'Sparkling tennis bracelet with VVS diamonds', tags: ['diamond', 'luxury', 'party-wear'], bgColor: '#8B5CF6', status: 'Active', stockCount: 3 },
  { id: 'DSN-006', designNo: 'DSN-006', name: 'Mens Signet Ring', collection: 'For Him', category: 'Rings', subCategory: 'Gents Ring', purity: ['22K', '18K'], style: 'Classic', gender: 'Gents', occasion: 'Daily', makingChargeDefault: 160, wastageDefault: 4, minWeight: 8, maxWeight: 15, stoneType: 'None', description: 'Bold signet ring for men — can be customised with initials', tags: ['mens', 'classic'], bgColor: '#374151', status: 'Active', stockCount: 10 },
  { id: 'DSN-007', designNo: 'DSN-007', name: 'Antique Gold Necklace', collection: 'Heritage Crafts', category: 'Necklace', subCategory: 'Long Necklace', purity: ['22K'], style: 'Antique', gender: 'Ladies', occasion: 'Wedding', makingChargeDefault: 300, wastageDefault: 7, minWeight: 30, maxWeight: 70, stoneType: 'Rubies', description: 'Handcrafted antique-finish necklace inspired by Mughal era', tags: ['antique', 'heritage', 'wedding'], bgColor: '#B45309', status: 'Active', stockCount: 4 },
  { id: 'DSN-008', designNo: 'DSN-008', name: 'Rope Chain', collection: 'Classic Chains', category: 'Chains', subCategory: 'Rope Chain', purity: ['22K', '18K'], style: 'Classic', gender: 'Unisex', occasion: 'Daily', makingChargeDefault: 120, wastageDefault: 4, minWeight: 10, maxWeight: 30, stoneType: 'None', description: 'Classic rope chain available in multiple lengths and weights', tags: ['bestseller', 'daily-wear', 'unisex'], bgColor: '#D97706', status: 'Active', stockCount: 15 },
  { id: 'DSN-009', designNo: 'DSN-009', name: 'Peacock Bangle Set', collection: 'Nature Inspired', category: 'Bangles', subCategory: 'Bangle Set', purity: ['22K'], style: 'Traditional', gender: 'Ladies', occasion: 'Festival', makingChargeDefault: 240, wastageDefault: 5, minWeight: 40, maxWeight: 80, stoneType: 'Enamel', description: 'Beautiful peacock-motif bangle set with meenakari enamel work', tags: ['peacock', 'festival', 'traditional'], bgColor: '#059669', status: 'Active', stockCount: 5 },
  { id: 'DSN-010', designNo: 'DSN-010', name: 'Kids Butterfly Earrings', collection: 'Little Princess', category: 'Earrings', subCategory: 'Studs', purity: ['22K'], style: 'Cute', gender: 'Kids', occasion: 'Daily', makingChargeDefault: 140, wastageDefault: 3, minWeight: 1, maxWeight: 4, stoneType: 'CZ', description: 'Adorable butterfly-shaped stud earrings for kids', tags: ['kids', 'cute'], bgColor: '#EC4899', status: 'Active', stockCount: 20 },
  { id: 'DSN-011', designNo: 'DSN-011', name: 'Lakshmi Pendant', collection: 'Divine Collection', category: 'Necklace', subCategory: 'Pendant', purity: ['22K', '24K'], style: 'Religious', gender: 'Ladies', occasion: 'Religious', makingChargeDefault: 200, wastageDefault: 4, minWeight: 5, maxWeight: 15, stoneType: 'None', description: 'Goddess Lakshmi pendant — auspicious design with fine detailing', tags: ['religious', 'divine', 'pendant'], bgColor: '#F59E0B', status: 'Active', stockCount: 12 },
  { id: 'DSN-012', designNo: 'DSN-012', name: 'Bridal Maang Tikka', collection: 'Bridal Collection 2026', category: 'Necklace', subCategory: 'Maang Tikka', purity: ['22K'], style: 'Bridal', gender: 'Ladies', occasion: 'Bridal', makingChargeDefault: 320, wastageDefault: 6, minWeight: 8, maxWeight: 20, stoneType: 'Polki', description: 'Grand maang tikka with polki diamonds for bridal look', tags: ['bridal', 'maangtikka', 'polki'], bgColor: '#C2410C', status: 'Active', stockCount: 3 },
];

// =========================================================================
// HELD BILLS
// =========================================================================
export const heldBills = [
  { id: 'HOLD-001', customerId: 1, customerName: 'Aarav Sharma', items: [{ id: 7, name: 'Diamond Solitaire Ring', qty: 1, price: 180000 }], subtotal: 180000, discount: 5000, gst: 5250, total: 180250, heldAt: '2026-07-06 11:30', heldBy: 'Priya Sharma', note: 'Customer stepped out for lunch — resume at 2pm' },
  { id: 'HOLD-002', customerId: 5, customerName: 'Vikram Singh', items: [{ id: 6, name: 'Gold Coin 10g', qty: 5, price: 72000 }, { id: 2, name: 'Rope Chain', qty: 1, price: 138000 }], subtotal: 498000, discount: 15000, gst: 14490, total: 497490, heldAt: '2026-07-06 14:15', heldBy: 'Sneha Iyer', note: 'Waiting for price approval from owner' },
  { id: 'HOLD-003', customerId: 11, customerName: 'Sanjay Gupta', items: [{ id: 3, name: 'Bridal Bangle Set', qty: 1, price: 320000 }], subtotal: 320000, discount: 10000, gst: 9300, total: 319300, heldAt: '2026-07-05 16:45', heldBy: 'Priya Sharma', note: 'Customer will return with wife tomorrow' },
];

