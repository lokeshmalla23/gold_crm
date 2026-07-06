# Gold CRM — Complete System Documentation
### Golden Palace Jewellers · Frontend Edition

---

## TABLE OF CONTENTS

1. [System Overview](#1-system-overview)
2. [Complete Module Chain Flow](#2-complete-module-chain-flow)
3. [Module 01 — Dashboard](#3-module-01--dashboard)
4. [Module 02 — Customers](#4-module-02--customers)
5. [Module 03 — Jewellery Inventory](#5-module-03--jewellery-inventory)
6. [Module 04 — Product Master](#6-module-04--product-master)
7. [Module 05 — Billing / POS](#7-module-05--billing--pos)
8. [Module 06 — Orders](#8-module-06--orders)
9. [Module 07 — Quotations](#9-module-07--quotations)
10. [Module 08 — Repairs](#10-module-08--repairs)
11. [Module 09 — Old Gold Exchange](#11-module-09--old-gold-exchange)
12. [Module 10 — Savings Schemes](#12-module-10--savings-schemes)
13. [Module 11 — Purchase](#13-module-11--purchase)
14. [Module 12 — Manufacturing (Karigar)](#14-module-12--manufacturing-karigar)
15. [Module 13 — Accounts](#15-module-13--accounts)
16. [Module 14 — Gold Rate](#16-module-14--gold-rate)
17. [Module 15 — Suppliers](#17-module-15--suppliers)
18. [Module 16 — Staff](#18-module-16--staff)
19. [Module 17 — Reports](#19-module-17--reports)
20. [Module 18 — Marketing](#20-module-18--marketing)
21. [Module 19 — Settings](#21-module-19--settings)
22. [Gold Price Calculation Formula](#22-gold-price-calculation-formula)
23. [Cross-Module Data Connections](#23-cross-module-data-connections)

---

## 1. SYSTEM OVERVIEW

**Gold CRM** is a complete jewellery shop management platform built for Indian gold and jewellery retailers. It handles every operation of a jewellery business — from the moment gold enters the shop (Purchase) to the moment jewellery is sold to a customer (Billing), and everything in between (manufacturing, repairs, exchanges, savings schemes, accounting, and compliance).

### Technology Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Data**: Mock data (frontend-only, no backend)

### Key Business Numbers
- Base Gold Rate: ₹6,250 per gram (22K)
- GST on Jewellery: 3% (1.5% CGST + 1.5% SGST)
- Purity Multipliers: 24K = 1.0909 × rate, 22K = 1.0 × rate, 18K = 0.8182 × rate, 14K = 0.6364 × rate

---

## 2. COMPLETE MODULE CHAIN FLOW

This is how every module connects to every other module in a real business operation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        GOLD ENTERS THE SHOP                                 │
│                                                                             │
│   SUPPLIERS ──→ PURCHASE (PO → GRN) ──→ INVENTORY (stock increases)        │
│                                                                             │
│                        GOLD IS MANUFACTURED                                 │
│                                                                             │
│   INVENTORY ──→ KARIGAR (gold issued) ──→ KARIGAR (finished item back)      │
│             ──→ INVENTORY (new item with barcode)                           │
│                                                                             │
│                      ITEM GETS A DESIGN TEMPLATE                            │
│                                                                             │
│   PRODUCT MASTER ──→ INVENTORY (template selected while adding item)        │
│                  ──→ barcode auto-generated ──→ physical tag printed        │
│                                                                             │
│                        CUSTOMER WALKS IN                                    │
│                                                                             │
│   CUSTOMERS (profile looked up) ──→ QUOTATION (price quoted)               │
│                                  ──→ BILLING (invoice raised)               │
│                                  ──→ REPAIRS (job card created)             │
│                                  ──→ OLD GOLD EXCHANGE (old gold accepted)  │
│                                  ──→ SAVINGS SCHEME (plan enrolled)         │
│                                                                             │
│                        MONEY FLOWS THROUGH                                  │
│                                                                             │
│   BILLING ──→ ACCOUNTS (day book entry, customer ledger)                   │
│   REPAIRS ──→ ACCOUNTS (job cost entry)                                    │
│   PURCHASE ──→ ACCOUNTS (supplier payable entry)                           │
│   KARIGAR ──→ ACCOUNTS (labour cost entry)                                 │
│   OLD GOLD ──→ ACCOUNTS (exchange credit entry)                            │
│                                                                             │
│                       MANAGEMENT LOOKS AT DATA                              │
│                                                                             │
│   ALL MODULES ──→ REPORTS (sales, GST, stock, P&L, GSTR-1, GSTR-3B)       │
│   ALL MODULES ──→ DASHBOARD (live KPIs and charts)                         │
│   CUSTOMERS ──→ MARKETING (birthday wishes, campaigns, WhatsApp)           │
│                                                                             │
│                       CONFIGURATION & COMPLIANCE                            │
│                                                                             │
│   GOLD RATE ──→ affects Billing, Quotations, Old Gold, Purchase, Karigar   │
│   SETTINGS ──→ controls shop config, GST, users, audit log for all modules │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. MODULE 01 — DASHBOARD

### What is it?
The Dashboard is the **command centre** of the CRM. It is the first screen a staff member or owner sees after login. It presents a real-time summary of the entire business in one place — no need to open individual modules.

### Why is it useful?
- Owner can check today's sales, pending orders, and gold rate at a glance
- Manager can monitor inventory value and low-stock alerts without going into each module
- Identifies business trends — which category is selling more, which month was best

### How it works

**Stats Cards (top row):**
- Total Revenue — sum of all paid invoices
- Total Customers — count from customers module
- Inventory Value — selling price × qty for all in-stock items
- Today's Sales — invoices from today's date

**Charts:**
- Monthly Sales Trend — 12-month bar chart (gold value vs total revenue)
- Category-wise Sales — pie chart showing Rings / Chains / Bangles / Necklace / Earrings split
- Top Selling Items — horizontal bar chart of best performing products

**Live Tables:**
- Recent Invoices — last 5 transactions with customer, amount, status
- Low Stock Alert — items with qty < 3 flagged in red

**Connections to other modules:**
- Reads from: Inventory, Customers, Invoices (Billing), Repairs, Gold Rate
- Clicking items navigates to: Billing, Customers, Inventory

---

## 4. MODULE 02 — CUSTOMERS

### What is it?
The Customer module is the **master record of every person who has ever visited or bought from the shop**. It stores contact details, purchase history, loyalty tier, KYC documents, wishlist, savings plan, and more.

### Why is it useful?
- Staff can instantly pull up a customer's profile when they walk in — no need to ask for details repeatedly
- Owner can identify VIP customers for special treatment
- Marketing module uses this data to send birthday wishes and campaign messages
- Billing module pulls customer details from here when creating invoices

### How it works

**Customer List:**
- Tabs: All / Regular / Premium / VIP (filtered by customer type)
- Search: by name, mobile number, or email
- Each row shows: name, mobile, city, total purchases, last visit, loyalty tier

**Customer Profile (click any customer):**
- Personal Info: name, mobile, email, address, birthday, anniversary
- KYC Status: Aadhaar / PAN / Photo verification badges
- Loyalty Points: tier (Silver / Gold / Platinum) + total points earned
- Purchase History: list of all invoices with date, amount, items
- Payment History: all payment modes used
- Wishlist: items the customer has expressed interest in
- Active Savings Plans: which gold saving scheme they are enrolled in

**Add New Customer:**
- Name, mobile, email, address, birthday, anniversary, customer type
- Auto-assigned customer ID

**Connections to other modules:**
- Referenced in: Billing (select customer for invoice), Repairs (assign job card), Quotations (quote for), Old Gold Exchange (who brought the gold), Savings Scheme (who enrolled), Marketing (send message to)
- Feeds data to: Reports (customer outstanding, top buyers), Accounts (customer ledger)

---

## 5. MODULE 03 — JEWELLERY INVENTORY

### What is it?
The Inventory module is the **physical stock register** of the shop. Every piece of jewellery that is physically present in the shop — with its unique barcode, weight, purity, stone details, and price — lives here.

### Why is it useful?
- Staff can scan a barcode and instantly know what a piece is, how much it weighs, and what it costs
- Billing and Quotation modules pull item details from Inventory when a barcode is scanned
- Stock status (In Stock / Out of Stock / Restock) tells staff what is available to sell
- Owner can see total inventory value at any time

### How it works

**Item Structure (each inventory entry has):**
- Item Code (e.g., GR-001), Barcode (13-digit), Name
- Category, Gold Type (22K/24K/18K), Weight (g), Purity (916/999/750)
- Stone Type, Stone Weight (g), Stone Charges (₹)
- Making Charges (₹), Wastage %, Purchase Price, Selling Price
- Qty, Stock Status, Rating

**Add New Item — 4-step guided form:**

Step 1 — Select from Product Master:
- Dropdown lists all active designs from Product Master
- Selecting a design auto-fills: Name, Category, Gold Type, Making Charge rate, Wastage %, Stone Type
- Item Code is auto-generated (e.g., if last Ring was GR-032, new one gets GR-033)
- OR: manual entry without a design template

Step 2 — Item Details:
- When design is selected, Name/Category/Gold Type are locked (shown with lock icon)
- Staff cannot change these — they come from the design template
- Unlock button available if override is needed

Step 3 — Weight & Stone Details (always editable):
- Gross Weight: actual physical weight of the piece
- Stone Type, Stone Weight, Stone Charges: actual stone in this specific piece
- Qty, Stock Status

Step 4 — Making & Pricing:
- Wastage % and Making Charges are pre-filled from design, editable
- Purchase Price: what the shop paid for it
- Selling Price: suggested automatically using the gold formula; staff can override
- Live price preview: Net Gold / Wastage Weight / Gold Rate / Suggested Price

**Barcode Auto-Generation:**
```
Category Prefix Map:
  Rings     → GR-XXX
  Chains    → GC-XXX
  Bangles   → GB-XXX
  Necklace  → GN-XXX
  Earrings  → GE-XXX
  Coins     → CO-XXX

New item scans existing list → finds highest number for prefix → increments by 1
```

**Connections to other modules:**
- Gets templates from: Product Master
- Feeds into: Billing (barcode scan), Quotations (barcode scan), Reports (stock report, dead stock)
- Increases when: Purchase GRN completed, Karigar returns finished items
- Decreases when: Billing invoice is created

---

## 6. MODULE 04 — PRODUCT MASTER

### What is it?
The Product Master is the **design catalogue** — it stores all the jewellery designs the shop carries, as templates. It is NOT the physical stock. It is the blueprint that physical inventory items are created from.

### Why is it useful?
- Ensures consistency — every piece of "Classic Solitaire Ring" in inventory gets the same name, making charge rate, and wastage % automatically
- When a new batch arrives, staff picks the design from Product Master and only enters the actual weight and stone details — saving time and avoiding errors
- Management can see how many physical pieces of each design are currently in stock (live count from inventory)

### Difference: Product Master vs Inventory

| Product Master | Inventory |
|---|---|
| "Classic Solitaire Ring" — 1 template record | 5 actual pieces of Classic Solitaire Ring, each with different weight |
| No barcode | Each piece has its own barcode |
| Has design attributes (style, occasion, collection) | Has physical attributes (actual weight, actual stone) |
| Never sold | Gets sold, returned, melted |

### How it works

**Design record contains:**
- Design No (e.g., DSN-001), Name, Collection name
- Category, Sub-category, Style (Contemporary / Traditional / Antique / Bridal etc.)
- Gender (Ladies / Gents / Kids / Unisex), Occasion
- Purity options (can support multiple: 22K and 18K both)
- Making Charge Default (₹ per gram), Wastage Default (%)
- Weight Range (min–max grams), Stone Type
- Tags, Status (Active / Discontinued)

**Live Stock Count:**
- Each design card shows "X in stock (Y pieces)" pulled live from Inventory
- Green = well stocked, Amber = low stock, Red = out of stock
- This count is real — it reads from actual inventory items that have this design's ID

**Connections to other modules:**
- Feeds into: Inventory (template selection when adding items)
- Live count from: Inventory (items with matching designId)

---

## 7. MODULE 05 — BILLING / POS

### What is it?
Billing (Point of Sale) is the **cash counter** — where an actual sale happens. When a customer decides to buy, staff raises an invoice here. It handles item scanning, price calculation, discounts, multiple payment modes, EMI, and held bills.

### Why is it useful?
- Full POS experience — scan barcode → item auto-fills → price calculated instantly
- Supports split payments (e.g., ₹50,000 by card + ₹20,000 by UPI)
- Held bills — if a customer wants to think and come back, the bill can be held and resumed later
- GST auto-calculated at 3% on every invoice
- Returns processing — if customer returns an item, create a return invoice

### How it works

**Invoice Creation Flow:**
```
1. Select Customer (from Customers module, or walk-in)
2. Add Items:
   - Scan barcode → item auto-fills from Inventory
   - OR search product name
   - OR select manually
3. Apply Discount (₹ or %)
4. System calculates:
   - Gold Value = Billable Weight × Gold Rate
   - Item Total = (Gold Value + Making + Stone) × Qty
   - Subtotal = sum of all items
   - GST = (Subtotal − Discount) × 3%
   - Grand Total = Subtotal − Discount + GST
5. Select Payment Mode:
   - Cash / UPI / Card / Cheque
   - Split Payment (mix of above)
   - Credit (pay later)
   - EMI (terms: 3/6/12 months)
6. Print Invoice / WhatsApp Invoice
```

**Held Bills:**
- "Hold" a bill mid-transaction
- Customer comes back → resume held bill
- Stored locally with timestamp and customer name

**Returns:**
- Open an existing invoice → initiate return
- Specify items being returned
- System creates a credit entry in Accounts

**Connections to other modules:**
- Reads from: Customers (select customer), Inventory (barcode lookup), Gold Rate (current rate)
- Writes to: Orders (invoice created), Accounts (day book entry, customer ledger)
- Referenced in: Reports (daily sales, GSTR-1), Dashboard (today's revenue)

---

## 8. MODULE 06 — ORDERS

### What is it?
Orders is the **invoice register** — a read-only log of every transaction that has happened in Billing. It shows the status of each order (Paid / Partial / Pending / Returned).

### Why is it useful?
- Manager can see all orders without going into the POS screen
- Filter by payment status to find outstanding dues
- Search any invoice by customer name or invoice ID
- See total revenue, paid count, and pending amounts at a glance

### How it works

**Stats shown:**
- Total Orders, Total Revenue, Paid, Partial / Pending

**Order list shows:**
- Invoice ID, Customer Name, Date, Items count, Gold Rate at time of sale, Subtotal, GST, Making Charges, Discount, Total Amount, Payment Mode, Status

**Status types:**
- Paid — full payment received
- Partial — some amount paid, balance due
- Pending — no payment received yet
- Returned — item returned

**Connections to other modules:**
- All data comes from: Billing (invoices)
- Feeds into: Reports (sales reports, GSTR), Accounts (customer outstanding), Dashboard (recent transactions)

---

## 9. MODULE 07 — QUOTATIONS

### What is it?
Quotations is the **price estimation module** — before a customer confirms a purchase, staff creates a detailed quote showing the exact price breakdown. The quote can be converted to an invoice with one click.

### Why is it useful?
- Customer can take the quote home, compare prices, and come back
- Protects the shop — price is formally documented so there is no dispute later
- Quote has a validity period (e.g., 14 days) — after that it expires automatically
- Multiple items can be quoted together (e.g., a complete bridal set)
- Can be sent via WhatsApp or printed

### How it works

**Barcode Scan (auto-fill mode):**
```
Staff scans barcode in the quotation item row
→ System finds item in Inventory
→ Auto-fills ALL fields:
   - Item Name, Purity, Gross Weight
   - Stone Type, Stone Weight, Stone Charges
   - Wastage %, Gold Rate, Making Charges
→ All fields are LOCKED (green "From Inventory ✓" badge)
→ Only Qty remains editable
→ "Edit / Override" button available if adjustment needed
```

**Manual Entry mode (no barcode):**
- All fields are open for entry
- 4 sections: Weight Details, Stone Details, Wastage & Making, Per-item Summary
- Calculated fields (Net Gold, Billable Weight, Gold Value) are read-only displays

**Per-item calculation:**
```
Net Gold Weight   = Gross Weight − Stone Weight
Wastage Weight    = Net × (Wastage% / 100)
Billable Weight   = Net + Wastage Weight
Gold Value        = Billable × Gold Rate (adjusted for purity)
Item Total        = (Gold Value + Making Charges + Stone Charges) × Qty
```

**Summary:**
- Gold Value total, Making Charges total, Stone Charges total
- Subtotal → Discount → GST @ 3% → Grand Total

**Quote statuses:**
- Draft, Sent, Approved, Converted (to invoice), Expired

**Connections to other modules:**
- Reads from: Inventory (barcode lookup), Customers (select customer), Gold Rate (current rate)
- Converts to: Billing / Orders (when "Convert to Invoice" clicked)
- Referenced in: Reports (quotation conversion rate)

---

## 10. MODULE 08 — REPAIRS

### What is it?
The Repairs module is the **job card system** for repair and modification work. When a customer brings a broken chain, wants a ring resized, or needs a stone replaced, a job card is created here to track it from intake to delivery.

### Why is it useful?
- Nothing gets lost — every repair has a unique job ID and is tracked at every stage
- Customer can be called when their item is ready
- Staff knows who is working on which job and what the deadline is
- Costs are tracked (estimated vs actual) so repairs are profitable

### How it works

**Job Card contains:**
- Job ID (auto-generated), Customer (linked from Customers)
- Item: what was brought (e.g., "Gold Necklace"), category, weight
- Issue: what needs to be done (e.g., "Clasp broken, stone missing")
- Technician assigned, Priority (Normal / Urgent / High)
- Dates: Received date, Estimated completion date, Actual completion date
- Costs: Estimated cost, Final cost, Advance paid
- Notes, Barcode (for the repair tag), Status

**Status Flow:**
```
Received → In Progress → Ready → Delivered
```

**Dashboard-style stats:**
- Total jobs, In Progress, Ready to collect, Delivered this month

**Search and Filter:**
- Filter by status, technician, date range
- Search by customer name, job ID, item description

**Connections to other modules:**
- Reads from: Customers (customer lookup)
- Writes to: Accounts (repair charges billed)
- Referenced in: Reports (Repair Report — jobs done, revenue from repairs)
- Technician list used in: Staff module

---

## 11. MODULE 09 — OLD GOLD EXCHANGE

### What is it?
The Old Gold Exchange module handles **gold exchange transactions** — when a customer brings old gold jewellery to exchange for new jewellery or cash value. This is one of the most common transactions in a jewellery shop.

### Why is it useful?
- Standardises the exchange valuation process — purity testing, weight measurement, deductions are all documented
- Customer gets a receipt with full breakdown — no disputes
- Shop gets inbound gold that can be melted and reused
- Every exchange entry flows into Accounts for reconciliation

### How it works

**Exchange Transaction Flow:**
```
Customer brings old gold
→ Staff weighs it → enters Gross Weight
→ Selects Purity (24K / 22K / 18K / 14K)
→ System fetches current Gold Rate for that purity
→ Enters Testing Charges (touchstone or fire assay cost)
→ Enters Deduction % (for impurities, wear, etc.)
→ System calculates:
   Exchange Value = (Weight × Gold Rate) − Testing Charges − (Value × Deduction%)
→ This value can be:
   - Credited toward new purchase (most common)
   - Paid out as cash
→ Receipt generated with full breakdown
```

**Exchange record shows:**
- Receipt ID, Customer, Date
- Item description (e.g., "Old Necklace, broken")
- Weight, Purity, Gold Rate applied
- Testing charges, Deduction %
- Final Exchange Value, Status (Pending / Completed)

**Connections to other modules:**
- Reads from: Customers (select customer), Gold Rate (current rate for that purity)
- Writes to: Accounts (credit entry for the exchange value)
- Gold received feeds into: Inventory (after melting and remaking) via Purchase

---

## 12. MODULE 10 — SAVINGS SCHEMES

### What is it?
Gold Savings Schemes are **instalment plans** that allow customers to save a fixed amount every month and receive gold jewellery at the end of the term — often with a bonus month added by the shop. This drives customer loyalty and recurring revenue.

### Why is it useful?
- Guarantees repeat visits — customer comes every month to pay their instalment
- When scheme matures, customer almost certainly buys from the same shop
- Builds a large base of committed buyers for festive season launches
- Monthly instalments provide steady cash flow to the shop

### How it works

**Plan Types (examples):**
- Gold Monthly ₹5,000 — pay ₹5K/month for 12 months = ₹60K + 1 bonus month free = ₹65K gold
- Gold Monthly ₹10,000 — pay ₹10K/month for 11 months = ₹1.1L + 1 month free = ₹1.2L gold
- Bridal Gold ₹25,000 — pay ₹25K/month for 11 months → receive gold worth ₹3L on maturity

**Scheme Record contains:**
- Scheme ID, Customer (linked), Plan Name
- Monthly Amount, Duration (months), Bonus months
- Paid Months count, Total Paid so far
- Remaining Amount, Next Due Date
- Maturity Date, Maturity Value (with bonus)
- Status: Active / Completed / Defaulted

**Connections to other modules:**
- Reads from: Customers (enrolment), Accounts (payment tracking)
- Each monthly payment: flows into Accounts (receipt entry)
- On maturity: customer visits → Billing module → purchases gold worth the maturity value
- Referenced in: Reports (active schemes, upcoming maturities)

---

## 13. MODULE 11 — PURCHASE

### What is it?
The Purchase module tracks all **inbound gold and goods** — whenever the shop buys gold bullion, finished jewellery, or raw materials from a supplier. It manages the complete purchase cycle from order to receipt to payment.

### Why is it useful?
- Every gram of gold that enters the shop is documented — essential for GST compliance and gold audit
- Prevents duplicate payments to suppliers
- GRN (Goods Receipt Note) confirms what was physically received vs what was ordered
- Outstanding supplier payments are tracked automatically

### How it works

**Three-tab system:**

**Tab 1 — Purchase Orders (PO):**
```
Shop decides to buy gold
→ Create Purchase Order:
   Supplier name, date, items list, quantity, rate, total amount
→ PO status: Draft → Sent → Received
→ Outstanding balance tracked
```

**Tab 2 — Goods Receipt Notes (GRN):**
```
Physical gold arrives at shop
→ Create GRN against a PO:
   Actual weight received, quality check result (Pass/Fail)
   Any shortages or quality issues noted
→ GRN triggers: Inventory stock increases
→ GRN triggers: Supplier payable entry in Accounts
```

**Tab 3 — Purchase Returns:**
```
If gold is defective or wrong specification
→ Create Purchase Return:
   Reason, items returned, credit amount
→ Status: Pending → Approved → Credited
→ Supplier payable reduced by credit amount
```

**Connections to other modules:**
- Reads from: Suppliers (select supplier), Gold Rate (purchase rate)
- GRN completion writes to: Inventory (stock increases)
- Writes to: Accounts (supplier payable, purchase entry in day book)
- Referenced in: Reports (Purchase Report, Supplier Ledger), GSTR-3B (input tax credit)

---

## 14. MODULE 12 — MANUFACTURING (KARIGAR)

### What is it?
The Karigar (Manufacturing) module manages **gold given to goldsmiths** for making jewellery. When the shop gets a custom order or needs to manufacture a design, raw gold is issued to a karigar (goldsmith) who returns finished jewellery after some days.

### Why is it useful?
- Gold is valuable — every gram issued must be accounted for
- Tracks wastage: if 20g was issued but only 18.5g came back, 1.5g wastage is documented
- Outstanding karigar balances prevent disputes over payment
- Manufacturing timeline is tracked — no piece gets forgotten

### How it works

**Two-tab system:**

**Tab 1 — Orders:**
```
New Karigar Order flow:
1. Select Karigar (goldsmith) from karigar list
2. Enter Design description / reference
3. Enter Gold Issued (weight in grams, purity)
4. Set Expected Finish Date
5. Enter Labour Charges agreed

When finished item returns:
→ Enter Returned Weight
→ System calculates Wastage = Issued − Returned
→ Status changes to Completed
→ Labour cost flows to Accounts
→ Finished item added to Inventory
```

**Tab 2 — Karigars:**
- Karigar Name, Specialty (Chains / Rings / Bridal / Stone Setting)
- Rate per gram, Total Work Done, Outstanding Balance
- Contact details, Status (Active / Inactive)

**Order statuses:**
```
Issued → In Progress → Completed → Payment Done
```

**Connections to other modules:**
- Gold issued from: Inventory (raw gold qty decreases)
- Finished items added to: Inventory (new item with barcode)
- Labour cost flows to: Accounts (expense entry)
- Referenced in: Reports (manufacturing report, karigar-wise productivity)

---

## 15. MODULE 13 — ACCOUNTS

### What is it?
The Accounts module is the **financial ledger** of the shop. Every money movement — sale, purchase, expense, karigar payment, old gold credit — creates an entry here. It gives the owner a complete picture of the shop's finances.

### Why is it useful?
- Owner can see exactly how much cash is in the shop at any time
- All customer dues are listed — who owes how much
- Day Book shows every single transaction in chronological order
- No entry is missed — all modules automatically contribute to Accounts

### How it works

**Three-tab system:**

**Tab 1 — Day Book:**
```
All transactions in one chronological list
Each entry has:
  - Date, Reference (invoice/repair/PO number)
  - Description (what the transaction was)
  - Type (Sale / Purchase / Repair / Expense / Exchange / Savings)
  - Debit amount, Credit amount, Running Balance

Examples:
  INV-1010 | Rahul Verma - Gold Necklace | Sale | Credit ₹4,25,000
  PO-2024-008 | TT Gold Suppliers | Purchase | Debit ₹3,42,500
  REP-0012 | Chain repair - Priya Patel | Repair | Credit ₹1,200
```

**Tab 2 — Cash Book:**
```
Daily summary of cash in / cash out
Shows:
  - Opening Balance for the day
  - Total cash received (sales + repairs + advances)
  - Total cash paid (purchases + expenses + karigar)
  - Closing Balance
```

**Tab 3 — Customer Ledger:**
```
Select any customer → see all their transactions
Each invoice, payment, advance, return listed
Running balance shows how much they owe
```

**Connections to other modules:**
- Receives entries from: Billing (every sale), Repairs (job charges), Purchase (supplier payable), Karigar (labour cost), Old Gold Exchange (exchange value), Savings Scheme (monthly payments)
- Feeds into: Reports (P&L, Customer Outstanding, Supplier Ledger)

---

## 16. MODULE 14 — GOLD RATE

### What is it?
The Gold Rate module is the **rate management centre**. Gold prices change every day based on MCX (Multi Commodity Exchange) rates. This module displays the current rate, its 30-day history, and lets the owner update the rate whenever needed.

### Why is it useful?
- A wrong gold rate entered in billing can cost the shop thousands of rupees on a single transaction
- Owner can set rate alerts — get notified if gold goes above ₹7,000/g (good time to sell) or below ₹5,800/g (good time to buy)
- Historical chart helps understand price trends for purchasing decisions

### How it works

**Rate Display:**
```
Current Rates (auto-calculated from 22K base):
  24K = Base × 1.0909  → e.g., ₹6,250 × 1.0909 = ₹6,818/g
  22K = Base × 1.0     → ₹6,250/g  (this is the input rate)
  18K = Base × 0.8182  → ₹5,114/g
  14K = Base × 0.6364  → ₹3,977/g
  Silver = separate rate → ₹85/g
```

**Rate History Chart:**
- 30-day line chart showing 22K rate movement
- Identifies peaks and troughs

**Update Rate:**
- Owner enters new 22K rate → all purity rates recalculate automatically
- All new invoices, quotations, and exchange calculations immediately use the new rate

**Rate Alerts:**
- Set a target price and direction (High / Low)
- Alert triggers when price crosses the threshold
- Useful for knowing when to buy gold from suppliers

**Connections to other modules:**
- Rate used by: Billing (item pricing), Quotations (price calculation), Old Gold Exchange (exchange value), Purchase (gold cost), Karigar (gold value tracking)
- Settings module can update the base rate from the shop configuration section

---

## 17. MODULE 15 — SUPPLIERS

### What is it?
The Suppliers module is the **vendor master** — a directory of all companies and individuals the shop buys from. Gold bullion suppliers, finished jewellery vendors, stone dealers, packaging companies.

### Why is it useful?
- Centralised contact book for all vendors
- Outstanding balance tracked per supplier — prevents overpayment
- Purchase module references this list when creating POs
- Supplier Ledger in Reports shows transaction history per vendor

### How it works

**Supplier record contains:**
- Supplier ID, Name, Contact Person
- Mobile, Email, Address, GSTIN
- Items Supplied (e.g., "Gold Bullion, 22K Jewellery")
- Total Purchase Value (lifetime), Outstanding Balance, Last Order Date
- Status: Active / Inactive

**Stats cards:**
- Total Suppliers, Active Suppliers, Total Outstanding Dues, Top Supplier

**Connections to other modules:**
- Referenced in: Purchase (select supplier when creating PO)
- Outstanding balance updated by: Purchase (new PO increases balance, payment decreases it)
- Referenced in: Reports (Supplier Ledger report)
- Referenced in: Accounts (payables)

---

## 18. MODULE 16 — STAFF

### What is it?
The Staff module manages **all employees** of the jewellery shop — their profiles, roles, attendance, salary, and system permissions.

### Why is it useful?
- Each staff member has a defined role that controls what they can see and do in the CRM
- Attendance tracking for salary calculation
- Owner knows exactly who did what — linked to Audit Log in Settings

### How it works

**Three-tab system:**

**Tab 1 — Staff List:**
- Employee info: name, role, mobile, email, join date, salary, status
- Roles: Owner / Manager / Billing Staff / Repair Technician / Purchase Manager / Accountant / Marketing

**Tab 2 — Attendance:**
```
For each employee:
  - Present days, Absent days, Half days
  - Leaves used, Total working days
  - Attendance percentage
```

**Tab 3 — Roles & Permissions:**
```
Each role has specific access:
  Owner          → Full access to everything
  Manager        → All modules except Settings/Payroll
  Billing Staff  → Billing, Customers, Inventory (read), Quotations
  Repair Tech    → Repairs module only
  Purchase Mgr   → Purchase, Suppliers, Inventory
  Accountant     → Accounts, Reports only
  Marketing      → Marketing, Customers (read)
```

**Connections to other modules:**
- Technician names used in: Repairs (assign technician)
- Salary is an expense in: Accounts (monthly salary payment entry)
- Activity tracked in: Settings → Audit Log (who created/deleted what)

---

## 19. MODULE 17 — REPORTS

### What is it?
The Reports module is the **business intelligence centre** — it aggregates data from all modules and presents it in structured reports for management review, financial analysis, and GST compliance filing.

### Why is it useful?
- Owner can review business performance without manually calculating anything
- GST reports (GSTR-1, GSTR-3B) are ready to file directly — saves accountant time
- Dead stock report identifies items that haven't sold in 90+ days
- Repair report shows repair revenue — often overlooked profit centre
- Staff performance report helps with HR decisions

### How it works

**14 Report Types:**

| Report | What it shows |
|---|---|
| Daily Sales Report | Every invoice of the selected date, category-wise totals |
| Monthly Sales Report | Month-over-month comparison, gold vs making vs stone breakup |
| GST Report | GST collected, CGST/SGST split, by invoice |
| GSTR-1 | B2B invoices, B2C summary, HSN-wise summary for filing |
| GSTR-3B | Tax liability summary, ITC available, net tax payable |
| P&L Statement | Revenue vs Cost of Goods vs Expenses vs Net Profit |
| Stock Report | Current inventory value, category-wise, low stock alerts |
| Customer Report | Customer-wise purchase summary, top buyers |
| Dead Stock Report | Items unsold for 90+ days with holding cost estimate |
| Purchase Report | Supplier-wise purchase summary, pending GRNs |
| Repair Report | Repair jobs by status, revenue from repairs |
| Customer Outstanding | Who owes how much, overdue invoices |
| Supplier Ledger | Supplier-wise transaction history, balance due |
| Staff Performance | Sales by staff member, targets vs achieved |

**Filters available on all reports:**
- Date range (from / to), Category, Customer, Supplier, Staff member

**Export:** PDF and Excel export on all reports

**Connections to other modules:**
- Reads from: ALL modules (Billing, Inventory, Customers, Repairs, Purchase, Karigar, Old Gold Exchange, Staff, Accounts)
- This is a read-only module — it never creates or modifies data

---

## 20. MODULE 18 — MARKETING

### What is it?
The Marketing module handles **customer communication and campaigns** — sending WhatsApp messages, birthday wishes, festival offers, gold rate updates, and follow-ups to customers based on their profile data.

### Why is it useful?
- A birthday wish with a special offer brings the customer back to the shop
- Gold rate update messages keep the shop top-of-mind when rates are attractive
- Festival campaigns drive bulk traffic during Dhanteras, Akshaya Tritiya, etc.
- Automated follow-ups recover abandoned quotations

### How it works

**Campaign types:**
- Birthday Wishes — auto-detects customers with upcoming birthdays from Customers module
- Anniversary Wishes — same, for anniversaries
- Festival Offers — Dhanteras, Akshaya Tritiya, Diwali seasonal campaigns
- Gold Rate Update — "Today's gold rate is ₹6,250/g — great time to buy!"
- Follow-up — "Your quotation QT-012 is valid until 15 July. Would you like to confirm?"
- Savings Scheme Due — "Your ₹10,000 instalment is due on 7th July"

**Campaign record:**
- Name, Message template, Target audience (All / VIP / Premium / Regular / Birthday / Anniversary)
- Scheduled date/time, Status (Running / Scheduled / Completed)
- Stats: Sent count, Opened count, Conversion (linked purchases)

**Upcoming Milestones panel:**
- Lists customers with birthdays in the next 7 days
- Lists customers with anniversaries in the next 7 days
- One-click WhatsApp message to each

**Connections to other modules:**
- Reads from: Customers (contact details, birthday, anniversary, type)
- References: Quotations (for follow-up campaigns), Gold Rate (for rate update messages), Savings Scheme (for due reminders)

---

## 21. MODULE 19 — SETTINGS

### What is it?
The Settings module is the **central configuration panel** for the entire CRM. It controls shop identity, GST configuration, user accounts, role permissions, notifications, data backup, and the complete audit trail.

### Why is it useful?
- One place to update the shop's GSTIN, PAN, address — reflected everywhere including invoices
- Owner can create/deactivate staff login accounts
- Audit log shows every action taken — who created, edited, or deleted what and when
- Backup ensures business data is never lost

### How it works

**8 configuration sections:**

**1. Shop Details:**
- Shop name, Owner name, GSTIN, PAN, Address
- Phone, Email, Logo
- Used on: every invoice, quotation, and report header

**2. Gold Rates:**
- Current 24K / 22K / 18K / Silver rates
- Updating here updates the Gold Rate module and all calculations

**3. GST Configuration:**
- GSTIN, State code
- HSN codes for jewellery (7113 for gold, 7114 for silver)
- GST slab (fixed at 3% for jewellery)

**4. User Management:**
- Create, edit, deactivate staff login accounts
- Assign roles (Owner / Manager / Billing Staff etc.)

**5. Roles & Permissions:**
- Fine-grained control over which role can access which module

**6. Notifications:**
- Toggle on/off: Birthday alerts, Anniversary alerts, Low stock alerts, Gold rate alerts, Payment reminders

**7. Backup & Export:**
- Export all data as JSON or CSV
- Backup status and last backup timestamp

**8. Audit Log:**
- Complete trail of every action across all modules
- Filter by: Module, Action type (Created / Updated / Deleted), Date, User
- Color coded: green (created), blue (updated), red (deleted)
- Cannot be deleted or edited — permanent record

**Connections to other modules:**
- Shop details used by: every invoice and quotation header
- Gold rate config used by: Gold Rate module, Billing, Quotations
- User accounts control: login access to the entire CRM
- Audit log receives entries from: all modules

---

## 22. GOLD PRICE CALCULATION FORMULA

This formula is used consistently across Billing, Quotations, and Inventory.

```
Step 1: Net Gold Weight
  Net = Gross Weight − Stone Weight

Step 2: Wastage Weight
  Wastage Weight = Net × (Wastage% / 100)

Step 3: Billable Weight
  Billable = Net + Wastage Weight

Step 4: Purity-adjusted Gold Rate
  24K Rate = Base Rate × 1.0909
  22K Rate = Base Rate × 1.0000
  18K Rate = Base Rate × 0.8182
  14K Rate = Base Rate × 0.6364

Step 5: Gold Value
  Gold Value = Billable Weight × Purity-adjusted Rate

Step 6: Item Total (per piece)
  Item Total = (Gold Value + Making Charges + Stone Charges) × Qty

Step 7: Invoice Total
  Subtotal   = Sum of all Item Totals
  Discount   = as entered by staff
  GST        = (Subtotal − Discount) × 3%
  Grand Total = Subtotal − Discount + GST

EXAMPLE:
  Item: Antique Necklace 22K
  Gross Weight  = 35g
  Stone (Ruby)  = 2g
  Net           = 35 − 2 = 33g
  Wastage 6%    = 33 × 0.06 = 1.98g
  Billable      = 33 + 1.98 = 34.98g
  Gold Rate 22K = ₹6,250/g
  Gold Value    = 34.98 × 6,250 = ₹2,18,625
  Making        = ₹28,000
  Stone         = ₹8,500
  Item Total    = ₹2,18,625 + ₹28,000 + ₹8,500 = ₹2,55,125
  GST @ 3%      = ₹7,654
  Grand Total   = ₹2,62,779
```

---

## 23. CROSS-MODULE DATA CONNECTIONS

### How gold moves through the system:
```
Supplier → Purchase (PO) → GRN → Inventory (raw gold / finished pieces)
                                      ↓
                              Karigar (manufacturing)
                                      ↓
                              Inventory (finished jewellery with barcode)
                                      ↓
                         Billing (sold) / Quotation (quoted)
                                      ↓
                              Orders (invoice record)
                                      ↓
                              Accounts (financial entry)
                                      ↓
                              Reports (GST, P&L, Sales)
```

### How customer data moves:
```
Customer (registered) → Billing (buy), Repairs (repair job),
                        Old Gold (exchange), Savings (enrol),
                        Quotations (get price), Marketing (receive messages)
                              ↓
                        Accounts (customer ledger, outstanding)
                              ↓
                        Reports (customer report, outstanding report)
```

### What the gold rate affects:
```
Gold Rate module (base rate set here)
        ↓
  Billing    → all item prices in current invoice
  Quotations → all item totals in current quote
  Old Gold   → exchange value calculation
  Purchase   → gold purchase cost
  Karigar    → gold value of issued gold
  Inventory  → suggested selling price on new items
  Dashboard  → current gold rate display
  Reports    → rate at time of sale captured in each invoice
```

### Compliance data flow for GST:
```
Every Billing invoice → has HSN code, GST amount, customer GSTIN (if B2B)
        ↓
GSTR-1 Report  → B2B list + B2C summary + HSN-wise summary
GSTR-3B Report → total tax liability + ITC from purchases − net payable
        ↓
Filed with GST portal by 11th of every month
```

---

*Documentation generated for Gold CRM — Golden Palace Jewellers*
*Version: 1.0 | Modules: 19 | Last updated: July 2026*
