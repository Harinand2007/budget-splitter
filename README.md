# 💰 BudgetSplit - Budget Splitter & Expense Tracker

A simple, modern, responsive, and user-friendly **Budget Splitter & Expense Tracker Web App** designed for students, individuals, and friends.

Built with **React, modern CSS, and JavaScript**. Runs 100% in the client browser with zero server dependencies, no login required, and full offline support.

---

## 🌟 Key Features

### 1. 📊 Interactive Dashboard
- **Monthly Spending Overview:** Displays total spending for the active month, user-configured monthly budget goal, remaining allowance, and group balances.
- **Budget Health Progress Bar:** Dynamic progress bar color-coded by financial health:
  - 🟢 **Safe:** Spending ≤ 80% of monthly budget
  - 🟡 **Warning:** Spending between 80% and 100%
  - 🔴 **Danger:** Spending exceeded (> 100%)
- **Recent Transactions:** Quick view of recent personal expenses with category badges, amounts, and direct link to full transaction history.
- **Quick Actions:** Instant single-click access to *Add Expense* and *Split Bills*.

### 2. 💳 Personal Expense Tracker
- **Full CRUD Capabilities:** Add, edit, and delete personal transactions.
- **Detailed Attributes:** Amount, Date, Description, Category, Payment Method (Card, Cash, UPI/Online, Bank Transfer), and optional Notes.
- **Robust Field Validation:** Ensures expense amounts are positive numbers (> 0) and required fields are populated with inline error messaging.
- **Delete Protection:** Confirmation modal to prevent accidental deletions.

### 3. 🏷️ Pre-defined & Styled Categories
Color-coded category tags with custom emoji badges:
- 🍔 **Food & Dining** (Warm Amber/Orange)
- ✈️ **Travel & Transport** (Sky Blue)
- 🛍️ **Shopping** (Purple)
- 💡 **Bills & Utilities** (Yellow)
- 🎬 **Entertainment** (Rose/Pink)
- 🎓 **Education** (Indigo)
- 📦 **Others** (Slate Gray)

### 4. 👥 Group Bill Splitter & Debt Simplification
- **Trips & Groups:** Create groups for road trips, roommates, team lunches, parties, or vacations.
- **Friends & Member Avatars:** Add friends with colored avatars and track member participation.
- **Flexible Split Methods:**
  - **Equal Split:** Divides the bill equally among all or selected group members with exact remainder-cent allocation.
  - **Custom Exact Amounts:** Enter custom amounts for each friend, with validation ensuring sum matches the total.
- **Debt Simplification Algorithm ("Who Owes Whom"):**
  - Accurately tracks member balances:
    $$\text{Balance}_i = \text{Amount Paid by } i - \text{Amount Owed by } i$$
  - Applies a greedy bipartite settlement algorithm to resolve group debts in the **minimum number of transactions possible** (e.g., eliminating circular debts).
- **1-Click "Settle Up":** Click *Settle Up* on any debt suggestion to log a settlement payment, automatically updating all member balances.
- **Settlement & Expense History:** Full audit log of group expenses and settlements.

### 5. 📈 Graphical Summaries & Reports
- **Spending by Category:** Interactive Doughnut chart showing percentages and dollar volumes per category.
- **6-Month Trend Analysis:** Monthly bar chart comparing spending trends over time.
- **Dual-Engine Visualization:** Seamlessly uses **Chart.js** when online, and automatically falls back to built-in responsive **SVG vector charts** when offline or standalone.
- **Detailed Table Breakdown:** Category-wise breakdown with transaction counts and percentage bars.

### 6. 🔍 Real-Time Search & Advanced Filters
- **Instant Search:** Search across transaction descriptions and notes in real time.
- **Category Filter:** Filter by specific categories (Food, Travel, Bills, etc.).
- **Timeframe Filter:** Filter by *All Time*, *This Month*, *Last Month*, or *This Year*.
- **Sorting Options:** Sort by Date (newest/oldest), Amount (highest/lowest), or Description (A-Z).
- **Live Counter:** Displays the number of matching items and the filtered total spending amount.

### 7. 💾 Local Persistence & Data Portability
- **Automatic Browser Storage:** All expenses, groups, budgets, and settings are saved automatically in `localStorage`. Data persists across page reloads and browser sessions.
- **Sample Demo Data:** Pre-populated with realistic personal expenses and a multi-friend trip group for immediate preview.
- **1-Click Reset / Clear:** Easily load demo data or wipe all data from Settings.
- **JSON Backup Export & Import:** Export your data as a clean JSON file and restore it on any device.

### 8. 🌙 Dark Mode & Responsive Design
- **Theme Switcher:** Single-click toggle between crisp Light Mode and sleek Dark Mode.
- **Responsive Layout:**
  - **Desktop / Laptop:** Full horizontal navigation and multi-column grid dashboard.
  - **Tablet:** Adaptive 2-column cards.
  - **Mobile:** Mobile bottom navigation bar for quick one-handed navigation, touch-optimized button targets.

### 9. 📴 Offline Support & PWA Ready
- **Zero Backend Required:** 100% client-side execution.
- **Service Worker (`sw.js`):** Caches app assets for offline availability.
- **Web App Manifest (`manifest.json`):** Allows "Add to Home Screen" on mobile devices and desktops.
- **Self-Contained Fallback Engine (`react-fallback.js`):** Built-in micro-React reactive engine ensures the app boots even if CDN networks are unreachable.

---

## 📂 Project Structure

```text
budget-splitter-app/
│
├── index.html            # Main HTML application entry point
├── styles.css            # Modular design system (light/dark theme, responsive styles)
├── app.js                # Core React application, calculations, views, and modals
├── react-fallback.js     # Standalone offline micro-React reactive engine
├── sw.js                 # Service Worker for offline caching & PWA
├── manifest.json         # Web App Manifest for mobile installation
├── test-suite.html       # Automated in-browser test runner & verification suite
└── README.md             # Project documentation & user guide
```

---

## 🚀 How to Run the App

### Option 1: Direct Double-Click (Simplest)
1. Navigate to the project folder:
   `c:\Users\saran\Desktop\budget splitter app`
2. Double-click **`index.html`** or drag it into any web browser (**Google Chrome, Microsoft Edge, Brave, Firefox, Safari**).
3. The app will launch immediately with full functionality!

### Option 2: Local Web Server (VS Code Live Server or Python)
If you have a local server installed:
```bash
# Using Python 3 (if installed):
python -m http.server 8000

# Or open folder in VS Code and click "Go Live" with the Live Server extension.
```
Then visit `http://localhost:8000` in your browser.

---

## 🧪 Automated Verification Suite

To verify the calculations, debt algorithms, and storage mechanics:
1. Double click **`test-suite.html`** in your browser.
2. The automated test runner executes and validates:
   - Schema integrity of generated demo data
   - Equal split calculations and remainder-cent conservation
   - Simplified debt bipartite matching algorithm
   - Settlement recording and balance reduction
   - Currency formatting precision
   - Category configurations
   - LocalStorage roundtrip persistence
3. You will see green checkmarks for all passed tests.

---

## 📐 Debt Minimization Algorithm Explained

When a group incurs multiple expenses with different payers:
1. **Net Balance Calculation:**
   For each member $i$, the algorithm computes:
   $$\text{Net}_i = \sum \text{Paid By } i - \sum \text{Owed By } i$$
   The sum of all member balances is always zero: $\sum \text{Net}_i = 0$.
2. **Classification:**
   - Members with $\text{Net} > 0$ are **Creditors** (they should receive money).
   - Members with $\text{Net} < 0$ are **Debtors** (they owe money).
3. **Greedy Matching:**
   - Pair the largest debtor with the largest creditor.
   - Settle $\min(|\text{Debtor}|, \text{Creditor})$.
   - Update both amounts. Repeat until all balances reach 0.
   - This produces the minimal number of peer-to-peer payments required.

---

## 🔒 Privacy & Security

- **100% Private:** No user data leaves your browser.
- **No Third-Party Tracking:** No tracking cookies, ads, or telemetry.
- **Offline Capable:** Works without an internet connection once loaded.
