/**
 * BUDGET SPLITTER & EXPENSE TRACKER
 * A complete, modern, reactive budget & bill splitting application
 */

// =============================================================================
// 1. CONSTANTS, ICONS & CONFIGURATION
// =============================================================================

const DEFAULT_CATEGORIES = [
  { id: 'Food', name: 'Food & Dining', icon: '🍔', color: '#f97316' },
  { id: 'Travel', name: 'Travel & Transport', icon: '✈️', color: '#0ea5e9' },
  { id: 'Shopping', name: 'Shopping', icon: '🛍️', color: '#a855f7' },
  { id: 'Bills', name: 'Bills & Utilities', icon: '💡', color: '#eab308' },
  { id: 'Entertainment', name: 'Entertainment', icon: '🎬', color: '#f43f5e' },
  { id: 'Education', name: 'Education', icon: '🎓', color: '#6366f1' },
  { id: 'Others', name: 'Others', icon: '📦', color: '#64748b' }
];

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'USD ($)' },
  { code: 'EUR', symbol: '€', name: 'EUR (€)' },
  { code: 'GBP', symbol: '£', name: 'GBP (£)' },
  { code: 'INR', symbol: '₹', name: 'INR (₹)' },
  { code: 'CAD', symbol: 'CA$', name: 'CAD ($)' },
  { code: 'AUD', symbol: 'AU$', name: 'AUD ($)' },
  { code: 'JPY', symbol: '¥', name: 'JPY (¥)' }
];

const MEMBER_COLORS = [
  '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', 
  '#06b6d4', '#eab308', '#14b8a6', '#6366f1', '#f43f5e'
];

// SVG Icon Helpers
const Icons = {
  Dashboard: (props = {}) => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('rect', { width: 7, height: 9, x: 3, y: 3, rx: 1 }),
    React.createElement('rect', { width: 7, height: 5, x: 14, y: 3, rx: 1 }),
    React.createElement('rect', { width: 7, height: 9, x: 14, y: 12, rx: 1 }),
    React.createElement('rect', { width: 7, height: 5, x: 3, y: 16, rx: 1 })
  ),
  Wallet: (props = {}) => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1' }),
    React.createElement('path', { d: 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4' })
  ),
  Users: (props = {}) => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
    React.createElement('circle', { cx: 9, cy: 7, r: 4 }),
    React.createElement('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
    React.createElement('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
  ),
  Chart: (props = {}) => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M3 3v18h18' }),
    React.createElement('path', { d: 'm19 9-5 5-4-4-3 3' })
  ),
  Settings: (props = {}) => React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' }),
    React.createElement('circle', { cx: 12, cy: 12, r: 3 })
  ),
  Plus: (props = {}) => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M5 12h14' }),
    React.createElement('path', { d: 'M12 5v14' })
  ),
  Search: (props = {}) => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('circle', { cx: 11, cy: 11, r: 8 }),
    React.createElement('path', { d: 'm21 21-4.3-4.3' })
  ),
  Sun: (props = {}) => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('circle', { cx: 12, cy: 12, r: 4 }),
    React.createElement('path', { d: 'M12 2v2' }),
    React.createElement('path', { d: 'M12 20v2' }),
    React.createElement('path', { d: 'm4.93 4.93 1.41 1.41' }),
    React.createElement('path', { d: 'm17.66 17.66 1.41 1.41' }),
    React.createElement('path', { d: 'M2 12h2' }),
    React.createElement('path', { d: 'M20 12h2' }),
    React.createElement('path', { d: 'm6.34 17.66-1.41 1.41' }),
    React.createElement('path', { d: 'm19.07 4.93-1.41 1.41' })
  ),
  Moon: (props = {}) => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' })
  ),
  Trash: (props = {}) => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M3 6h18' }),
    React.createElement('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
    React.createElement('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' })
  ),
  Edit: (props = {}) => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' })
  ),
  Close: (props = {}) => React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M18 6 6 18' }),
    React.createElement('path', { d: 'm6 6 12 12' })
  ),
  ArrowRight: (props = {}) => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M5 12h14' }),
    React.createElement('path', { d: 'm12 5 7 7-7 7' })
  ),
  Check: (props = {}) => React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...props },
    React.createElement('path', { d: 'M20 6 9 17l-5-5' })
  )
};

// =============================================================================
// 2. REALISTIC SAMPLE DATA FOR PREVIEW
// =============================================================================

function generateDemoData() {
  const today = new Date();
  const formatD = (offsetDays) => {
    const d = new Date(today);
    d.setDate(d.getDate() - offsetDays);
    return d.toISOString().split('T')[0];
  };

  const expenses = [
    { id: 'exp-1', description: 'Weekly Grocery Run', amount: 84.50, category: 'Food', date: formatD(1), paymentMethod: 'Card', notes: 'Fresh fruits, milk, veggies & snacks' },
    { id: 'exp-2', description: 'Metro & Train Pass', amount: 45.00, category: 'Travel', date: formatD(2), paymentMethod: 'Online', notes: 'Monthly transit recharge' },
    { id: 'exp-3', description: 'Electricity & Water Bill', amount: 92.15, category: 'Bills', date: formatD(5), paymentMethod: 'Bank Transfer', notes: 'October utility bill' },
    { id: 'exp-4', description: 'Computer Science Textbooks', amount: 65.00, category: 'Education', date: formatD(8), paymentMethod: 'Card', notes: 'Algorithms and Data Structures' },
    { id: 'exp-5', description: 'Movie Night & Popcorn', amount: 28.50, category: 'Entertainment', date: formatD(10), paymentMethod: 'Card', notes: 'IMAX Tickets with friends' },
    { id: 'exp-6', description: 'Sneakers & Running Socks', amount: 110.00, category: 'Shopping', date: formatD(14), paymentMethod: 'Online', notes: 'Weekend sports shoe sale' },
    { id: 'exp-7', description: 'Coffee & Breakfast Bagel', amount: 14.25, category: 'Food', date: formatD(18), paymentMethod: 'Cash', notes: 'Campus cafe' },
    { id: 'exp-8', description: 'Cloud Storage & Spotify', amount: 17.99, category: 'Bills', date: formatD(22), paymentMethod: 'Card', notes: 'Digital subscriptions' }
  ];

  const groups = [
    {
      id: 'grp-1',
      name: 'Weekend Mountain Trip 🌲',
      description: 'Cabin rental, hiking gear, groceries, and travel costs',
      members: [
        { id: 'mem-1', name: 'You (Alex)', avatarColor: '#10b981' },
        { id: 'mem-2', name: 'Sarah', avatarColor: '#3b82f6' },
        { id: 'mem-3', name: 'Jordan', avatarColor: '#ec4899' },
        { id: 'mem-4', name: 'Liam', avatarColor: '#f97316' }
      ],
      expenses: [
        {
          id: 'grp-exp-1',
          description: 'Cabin Airbnb Booking',
          amount: 240.00,
          paidBy: 'mem-1',
          date: formatD(3),
          category: 'Travel',
          splitType: 'equal',
          participants: ['mem-1', 'mem-2', 'mem-3', 'mem-4'],
          splits: { 'mem-1': 60, 'mem-2': 60, 'mem-3': 60, 'mem-4': 60 }
        },
        {
          id: 'grp-exp-2',
          description: 'Barbecue Dinner & Groceries',
          amount: 120.00,
          paidBy: 'mem-2',
          date: formatD(2),
          category: 'Food',
          splitType: 'equal',
          participants: ['mem-1', 'mem-2', 'mem-3', 'mem-4'],
          splits: { 'mem-1': 30, 'mem-2': 30, 'mem-3': 30, 'mem-4': 30 }
        },
        {
          id: 'grp-exp-3',
          description: 'Highway Fuel & Tolls',
          amount: 60.00,
          paidBy: 'mem-3',
          date: formatD(1),
          category: 'Travel',
          splitType: 'equal',
          participants: ['mem-1', 'mem-2', 'mem-3', 'mem-4'],
          splits: { 'mem-1': 15, 'mem-2': 15, 'mem-3': 15, 'mem-4': 15 }
        }
      ],
      settlements: [
        {
          id: 'set-1',
          fromMemberId: 'mem-4',
          toMemberId: 'mem-1',
          amount: 50.00,
          date: formatD(1),
          notes: 'Partial settlement via Venmo'
        }
      ]
    },
    {
      id: 'grp-2',
      name: 'Apartment 4B Roommates 🏠',
      description: 'Shared household groceries, wifi, cleaning supplies',
      members: [
        { id: 'mem-1', name: 'You (Alex)', avatarColor: '#10b981' },
        { id: 'mem-5', name: 'Daniel', avatarColor: '#8b5cf6' },
        { id: 'mem-6', name: 'Emma', avatarColor: '#06b6d4' }
      ],
      expenses: [
        {
          id: 'grp-exp-4',
          description: 'High-Speed Fiber Internet',
          amount: 75.00,
          paidBy: 'mem-5',
          date: formatD(5),
          category: 'Bills',
          splitType: 'equal',
          participants: ['mem-1', 'mem-5', 'mem-6'],
          splits: { 'mem-1': 25, 'mem-5': 25, 'mem-6': 25 }
        },
        {
          id: 'grp-exp-5',
          description: 'Cleaning Supplies & Paper Towels',
          amount: 36.00,
          paidBy: 'mem-1',
          date: formatD(7),
          category: 'Others',
          splitType: 'equal',
          participants: ['mem-1', 'mem-5', 'mem-6'],
          splits: { 'mem-1': 12, 'mem-5': 12, 'mem-6': 12 }
        }
      ],
      settlements: []
    }
  ];

  return {
    expenses,
    groups,
    monthlyBudget: 1200,
    currency: '$',
    theme: 'light'
  };
}

// =============================================================================
// 3. CALCULATION & SPLIT ALGORITHMS
// =============================================================================

function calculateGroupBalances(group) {
  const members = group.members || [];
  const expenses = group.expenses || [];
  const settlements = group.settlements || [];

  const balances = {};
  const totalPaid = {};
  const totalOwed = {};

  members.forEach(m => {
    balances[m.id] = 0;
    totalPaid[m.id] = 0;
    totalOwed[m.id] = 0;
  });

  // 1. Process group expenses
  expenses.forEach(exp => {
    const amount = Number(exp.amount) || 0;
    const paidBy = exp.paidBy;

    if (balances[paidBy] !== undefined) {
      balances[paidBy] += amount;
      totalPaid[paidBy] += amount;
    }

    if (exp.splits && Object.keys(exp.splits).length > 0) {
      Object.entries(exp.splits).forEach(([memId, share]) => {
        const shareVal = Number(share) || 0;
        if (balances[memId] !== undefined) {
          balances[memId] -= shareVal;
          totalOwed[memId] += shareVal;
        }
      });
    } else {
      const participants = exp.participants && exp.participants.length > 0 ? exp.participants : members.map(m => m.id);
      const perPerson = participants.length > 0 ? amount / participants.length : 0;
      participants.forEach(memId => {
        if (balances[memId] !== undefined) {
          balances[memId] -= perPerson;
          totalOwed[memId] += perPerson;
        }
      });
    }
  });

  // 2. Process settlements (fromMember paid toMember)
  settlements.forEach(set => {
    const amount = Number(set.amount) || 0;
    const fromId = set.fromMemberId;
    const toId = set.toMemberId;

    if (balances[fromId] !== undefined) {
      balances[fromId] += amount;
    }
    if (balances[toId] !== undefined) {
      balances[toId] -= amount;
    }
  });

  // 3. Simplified Debt Minimization Algorithm ("Who owes whom")
  const creditors = [];
  const debtors = [];

  members.forEach(m => {
    const net = Math.round((balances[m.id] || 0) * 100) / 100;
    if (net > 0.01) {
      creditors.push({ id: m.id, name: m.name, amount: net });
    } else if (net < -0.01) {
      debtors.push({ id: m.id, name: m.name, amount: Math.abs(net) });
    }
  });

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const debts = [];
  let cIdx = 0;
  let dIdx = 0;

  while (cIdx < creditors.length && dIdx < debtors.length) {
    const creditor = creditors[cIdx];
    const debtor = debtors[dIdx];
    const payment = Math.min(creditor.amount, debtor.amount);

    if (payment > 0.01) {
      debts.push({
        fromId: debtor.id,
        fromName: debtor.name,
        toId: creditor.id,
        toName: creditor.name,
        amount: Math.round(payment * 100) / 100
      });
    }

    creditor.amount = Math.round((creditor.amount - payment) * 100) / 100;
    debtor.amount = Math.round((debtor.amount - payment) * 100) / 100;

    if (creditor.amount <= 0.01) cIdx++;
    if (debtor.amount <= 0.01) dIdx++;
  }

  return {
    balances,
    totalPaid,
    totalOwed,
    simplifiedDebts: debts
  };
}

function formatMoney(amount, currency = '$') {
  const num = Number(amount) || 0;
  return `${currency}${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// =============================================================================
// 4. STORAGE & INITIALIZATION
// =============================================================================

function loadInitialState() {
  const savedData = localStorage.getItem('budget_splitter_state_v1');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      return parsed;
    } catch (e) {
      console.error('Failed to parse localStorage data:', e);
    }
  }
  const demo = generateDemoData();
  saveStateToStorage(demo);
  return demo;
}

function saveStateToStorage(state) {
  try {
    localStorage.setItem('budget_splitter_state_v1', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

// =============================================================================
// 5. TOAST NOTIFICATIONS COMPONENT
// =============================================================================

function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return React.createElement('div', { className: 'toast-container' },
    toasts.map(toast => React.createElement('div', { key: toast.id, className: `toast ${toast.type || 'info'}` },
      React.createElement('div', { className: 'toast-content' },
        toast.type === 'success' && React.createElement(Icons.Check, { style: { color: 'var(--primary)' } }),
        toast.message
      ),
      React.createElement('button', {
        className: 'btn-icon',
        style: { width: 24, height: 24, border: 'none', background: 'transparent' },
        onClick: () => onDismiss(toast.id)
      }, React.createElement(Icons.Close, { width: 14, height: 14 }))
    ))
  );
}

// =============================================================================
// 6. DUAL-ENGINE CHARTS (CHART.JS CANVAS WITH SVG FALLBACK)
// =============================================================================

function CategoryDonutChart({ data, currency }) {
  const total = data.reduce((acc, curr) => acc + curr.amount, 0);
  const canvasRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  // Attempt Chart.js canvas rendering if available
  React.useEffect(() => {
    if (window.Chart && canvasRef.current && total > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const ctx = canvasRef.current.getContext('2d');
      
      chartInstanceRef.current = new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map(d => `${d.icon} ${d.name}`),
          datasets: [{
            data: data.map(d => d.amount),
            backgroundColor: data.map(d => d.color),
            borderWidth: 2,
            borderColor: isDark ? '#151e32' : '#ffffff',
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const val = context.raw || 0;
                  const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                  return ` ${formatMoney(val, currency)} (${pct}%)`;
                }
              }
            }
          },
          cutout: '70%'
        }
      });

      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }
      };
    }
  }, [data, currency, total]);

  if (total === 0 || data.length === 0) {
    return React.createElement('div', { className: 'empty-state', style: { padding: '24px 16px' } },
      React.createElement('p', { className: 'empty-desc' }, 'No category spending recorded yet.')
    );
  }

  // Fallback SVG calculation
  let cumulativePercent = 0;
  const radius = 15.9155;
  const circumference = 100;
  const hasChartJs = typeof window !== 'undefined' && Boolean(window.Chart);

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' } },
    React.createElement('div', { className: 'chart-wrapper', style: { height: 220 } },
      hasChartJs
        ? React.createElement('canvas', { ref: canvasRef })
        : React.createElement('svg', { viewBox: '0 0 42 42', className: 'svg-donut-chart' },
            React.createElement('circle', {
              cx: 21,
              cy: 21,
              r: radius,
              fill: 'transparent',
              stroke: 'var(--bg-subtle)',
              strokeWidth: 6
            }),
            data.map(item => {
              const percent = (item.amount / total) * 100;
              const strokeDash = `${percent} ${circumference - percent}`;
              const strokeOffset = 100 - cumulativePercent + 25;
              cumulativePercent += percent;

              return React.createElement('circle', {
                key: item.category,
                cx: 21,
                cy: 21,
                r: radius,
                fill: 'transparent',
                stroke: item.color,
                strokeWidth: 6.5,
                strokeDasharray: strokeDash,
                strokeDashoffset: strokeOffset,
                className: 'donut-slice'
              }, React.createElement('title', null, `${item.name}: ${formatMoney(item.amount, currency)} (${Math.round(percent)}%)`));
            })
          ),
      React.createElement('div', {
        style: {
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }
      },
        React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 } }, 'TOTAL'),
        React.createElement('span', { style: { fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' } }, formatMoney(total, currency))
      )
    ),
    React.createElement('div', { className: 'chart-legend', style: { width: '100%' } },
      data.map(item => {
        const percent = Math.round((item.amount / total) * 100);
        return React.createElement('div', { key: item.category, className: 'legend-item' },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
            React.createElement('span', { className: 'legend-color-dot', style: { backgroundColor: item.color } }),
            React.createElement('span', { style: { fontWeight: 500 } }, `${item.icon} ${item.name}`)
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('span', { style: { fontWeight: 700 } }, formatMoney(item.amount, currency)),
            React.createElement('span', { style: { fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: 32, textAlign: 'right' } }, `${percent}%`)
          )
        );
      })
    )
  );
}

function MonthlyBarChart({ monthlyData, currency }) {
  const maxSpend = Math.max(...monthlyData.map(m => m.amount), 1);
  const canvasRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (window.Chart && canvasRef.current && monthlyData.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const ctx = canvasRef.current.getContext('2d');

      chartInstanceRef.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthlyData.map(m => m.label),
          datasets: [{
            label: 'Monthly Spend',
            data: monthlyData.map(m => m.amount),
            backgroundColor: monthlyData.map(m => m.isCurrentMonth ? '#10b981' : (isDark ? '#334155' : '#cbd5e1')),
            borderRadius: 6,
            hoverBackgroundColor: '#059669'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${formatMoney(ctx.raw, currency)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: isDark ? '#94a3b8' : '#64748b' }
            },
            y: {
              grid: { color: isDark ? '#1e293b' : '#f1f5f9' },
              ticks: {
                color: isDark ? '#94a3b8' : '#64748b',
                callback: (val) => `${currency}${val}`
              }
            }
          }
        }
      });

      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }
      };
    }
  }, [monthlyData, currency]);

  const hasChartJs = typeof window !== 'undefined' && Boolean(window.Chart);

  return React.createElement('div', { style: { width: '100%', padding: '10px 0' } },
    hasChartJs
      ? React.createElement('div', { style: { height: 200, width: '100%' } },
          React.createElement('canvas', { ref: canvasRef })
        )
      : React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 12,
            height: 180,
            paddingBottom: 24,
            borderBottom: '1px solid var(--border-color)',
            position: 'relative'
          }
        },
          monthlyData.map(m => {
            const heightPercent = Math.max((m.amount / maxSpend) * 100, 6);
            return React.createElement('div', {
              key: m.label,
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                height: '100%',
                justifyContent: 'flex-end'
              }
            },
              React.createElement('div', {
                style: {
                  width: '100%',
                  maxWidth: 36,
                  height: `${heightPercent}%`,
                  background: m.isCurrentMonth ? 'linear-gradient(180deg, var(--primary), var(--primary-hover))' : 'var(--bg-subtle)',
                  border: m.isCurrentMonth ? '1px solid var(--primary-border)' : '1px solid var(--border-color)',
                  borderRadius: '6px 6px 0 0',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  cursor: 'pointer'
                },
                title: `${m.label}: ${formatMoney(m.amount, currency)}`
              }),
              React.createElement('span', {
                style: {
                  fontSize: '0.75rem',
                  fontWeight: m.isCurrentMonth ? 700 : 500,
                  color: m.isCurrentMonth ? 'var(--primary)' : 'var(--text-muted)',
                  marginTop: 8,
                  position: 'absolute',
                  bottom: 2
                }
              }, m.label)
            );
          })
        ),
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }
    },
      React.createElement('span', null, 'Monthly Overview (Last 6 Months)'),
      React.createElement('span', null, `Highest: ${formatMoney(maxSpend, currency)}`)
    )
  );
}

// =============================================================================
// 7. MODALS
// =============================================================================

function ExpenseModal({ isOpen, onClose, onSave, editingExpense, currency }) {
  if (!isOpen) return null;

  const [description, setDescription] = React.useState(editingExpense ? editingExpense.description : '');
  const [amount, setAmount] = React.useState(editingExpense ? editingExpense.amount : '');
  const [category, setCategory] = React.useState(editingExpense ? editingExpense.category : 'Food');
  const [date, setDate] = React.useState(editingExpense ? editingExpense.date : new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = React.useState(editingExpense ? editingExpense.paymentMethod || 'Card' : 'Card');
  const [notes, setNotes] = React.useState(editingExpense ? editingExpense.notes || '' : '');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please provide a description');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }
    if (!date) {
      setError('Please select a valid date');
      return;
    }

    onSave({
      id: editingExpense ? editingExpense.id : 'exp-' + Date.now(),
      description: description.trim(),
      amount: parsedAmount,
      category,
      date,
      paymentMethod,
      notes: notes.trim()
    });
  };

  return React.createElement('div', { className: 'modal-backdrop', onClick: onClose },
    React.createElement('div', { className: 'modal-content', onClick: e => e.stopPropagation() },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', { className: 'card-title' }, editingExpense ? 'Edit Expense' : 'Add New Expense'),
        React.createElement('button', { className: 'btn-icon', onClick: onClose }, React.createElement(Icons.Close, null))
      ),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { className: 'modal-body' },
          error && React.createElement('div', { className: 'form-error', style: { padding: '8px 12px', background: 'var(--danger-light)', borderRadius: 8 } }, error),
          
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Description *'),
            React.createElement('input', {
              className: 'form-input',
              type: 'text',
              placeholder: 'e.g. Campus Lunch, Electricity Bill, Book',
              value: description,
              onChange: e => { setDescription(e.target.value); setError(''); },
              autoFocus: true
            })
          ),

          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, `Amount (${currency}) *`),
              React.createElement('input', {
                className: 'form-input',
                type: 'number',
                step: '0.01',
                placeholder: '0.00',
                value: amount,
                onChange: e => { setAmount(e.target.value); setError(''); }
              })
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, 'Date *'),
              React.createElement('input', {
                className: 'form-input',
                type: 'date',
                value: date,
                onChange: e => setDate(e.target.value)
              })
            )
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Category *'),
            React.createElement('div', { className: 'category-picker-grid' },
              DEFAULT_CATEGORIES.map(cat => React.createElement('button', {
                type: 'button',
                key: cat.id,
                className: `category-chip ${category === cat.id ? 'selected' : ''}`,
                onClick: () => setCategory(cat.id)
              },
                React.createElement('span', { style: { fontSize: '1.2rem' } }, cat.icon),
                React.createElement('span', null, cat.id)
              ))
            )
          ),

          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, 'Payment Method'),
              React.createElement('select', {
                className: 'form-select',
                value: paymentMethod,
                onChange: e => setPaymentMethod(e.target.value)
              },
                React.createElement('option', { value: 'Card' }, 'Credit/Debit Card'),
                React.createElement('option', { value: 'Cash' }, 'Cash'),
                React.createElement('option', { value: 'Online' }, 'UPI / Online'),
                React.createElement('option', { value: 'Bank Transfer' }, 'Bank Transfer'),
                React.createElement('option', { value: 'Other' }, 'Other')
              )
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, 'Notes (optional)'),
              React.createElement('input', {
                className: 'form-input',
                type: 'text',
                placeholder: 'Additional details...',
                value: notes,
                onChange: e => setNotes(e.target.value)
              })
            )
          )
        ),
        React.createElement('div', { className: 'modal-footer' },
          React.createElement('button', { type: 'button', className: 'btn btn-secondary', onClick: onClose }, 'Cancel'),
          React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, editingExpense ? 'Update Expense' : 'Save Expense')
        )
      )
    )
  );
}

function GroupModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [members, setMembers] = React.useState([
    { id: 'mem-1', name: 'You (Alex)', avatarColor: MEMBER_COLORS[0] },
    { id: 'mem-2', name: 'Friend 1', avatarColor: MEMBER_COLORS[1] }
  ]);
  const [newMemberName, setNewMemberName] = React.useState('');
  const [error, setError] = React.useState('');

  const addMember = () => {
    if (!newMemberName.trim()) return;
    const color = MEMBER_COLORS[members.length % MEMBER_COLORS.length];
    setMembers([...members, {
      id: 'mem-' + Date.now(),
      name: newMemberName.trim(),
      avatarColor: color
    }]);
    setNewMemberName('');
  };

  const removeMember = (id) => {
    if (members.length <= 2) {
      setError('A group must have at least 2 members to split bills');
      return;
    }
    setMembers(members.filter(m => m.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a group or trip name');
      return;
    }
    if (members.length < 2) {
      setError('Please add at least 2 members to the group');
      return;
    }

    onSave({
      id: 'grp-' + Date.now(),
      name: name.trim(),
      description: description.trim(),
      members,
      expenses: [],
      settlements: []
    });
  };

  return React.createElement('div', { className: 'modal-backdrop', onClick: onClose },
    React.createElement('div', { className: 'modal-content', onClick: e => e.stopPropagation() },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', { className: 'card-title' }, 'Create Trip or Group'),
        React.createElement('button', { className: 'btn-icon', onClick: onClose }, React.createElement(Icons.Close, null))
      ),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { className: 'modal-body' },
          error && React.createElement('div', { className: 'form-error', style: { padding: '8px 12px', background: 'var(--danger-light)', borderRadius: 8 } }, error),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Group / Trip Name *'),
            React.createElement('input', {
              className: 'form-input',
              type: 'text',
              placeholder: 'e.g. Goa Trip 🏖️, Roommates, Dinner Party',
              value: name,
              onChange: e => { setName(e.target.value); setError(''); },
              autoFocus: true
            })
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Description (optional)'),
            React.createElement('input', {
              className: 'form-input',
              type: 'text',
              placeholder: 'Short note about this group...',
              value: description,
              onChange: e => setDescription(e.target.value)
            })
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Group Members (Friends)'),
            React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 8 } },
              React.createElement('input', {
                className: 'form-input',
                type: 'text',
                placeholder: 'Friend name (e.g. Sarah, Bob)',
                value: newMemberName,
                onChange: e => setNewMemberName(e.target.value),
                onKeyDown: e => { if (e.key === 'Enter') { e.preventDefault(); addMember(); } }
              }),
              React.createElement('button', { type: 'button', className: 'btn btn-secondary', onClick: addMember }, 'Add')
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 150, overflowY: 'auto' } },
              members.map(m => React.createElement('div', {
                key: m.id,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 8
                }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('div', { className: 'avatar', style: { backgroundColor: m.avatarColor, width: 26, height: 26, fontSize: '0.75rem' } }, m.name.charAt(0)),
                  React.createElement('span', { style: { fontSize: '0.9rem', fontWeight: 500 } }, m.name)
                ),
                React.createElement('button', {
                  type: 'button',
                  className: 'action-btn delete',
                  onClick: () => removeMember(m.id),
                  title: 'Remove member'
                }, React.createElement(Icons.Close, { width: 14, height: 14 }))
              ))
            )
          )
        ),
        React.createElement('div', { className: 'modal-footer' },
          React.createElement('button', { type: 'button', className: 'btn btn-secondary', onClick: onClose }, 'Cancel'),
          React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Create Group')
        )
      )
    )
  );
}

function GroupExpenseModal({ isOpen, onClose, group, onSave, currency }) {
  if (!isOpen || !group) return null;

  const members = group.members || [];
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('Food');
  const [paidBy, setPaidBy] = React.useState(members[0]?.id || '');
  const [splitType, setSplitType] = React.useState('equal');
  const [participants, setParticipants] = React.useState(members.map(m => m.id));
  const [customSplits, setCustomSplits] = React.useState({});
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = React.useState('');

  const toggleParticipant = (memberId) => {
    if (participants.includes(memberId)) {
      if (participants.length <= 1) {
        setError('At least one person must be involved in the bill');
        return;
      }
      setParticipants(participants.filter(id => id !== memberId));
    } else {
      setParticipants([...participants, memberId]);
    }
  };

  const handleCustomSplitChange = (memberId, val) => {
    setCustomSplits({
      ...customSplits,
      [memberId]: val
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please provide an expense title');
      return;
    }
    const totalAmount = parseFloat(amount);
    if (isNaN(totalAmount) || totalAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (participants.length === 0) {
      setError('Please select at least one person to split with');
      return;
    }

    let calculatedSplits = {};
    if (splitType === 'equal') {
      const perPerson = Math.round((totalAmount / participants.length) * 100) / 100;
      let sum = 0;
      participants.forEach((id, index) => {
        if (index === participants.length - 1) {
          calculatedSplits[id] = Math.round((totalAmount - sum) * 100) / 100;
        } else {
          calculatedSplits[id] = perPerson;
          sum += perPerson;
        }
      });
    } else {
      let sum = 0;
      participants.forEach(id => {
        const val = parseFloat(customSplits[id]) || 0;
        calculatedSplits[id] = val;
        sum += val;
      });
      if (Math.abs(sum - totalAmount) > 0.05) {
        setError(`Custom amounts must equal total (${formatMoney(totalAmount, currency)}). Current sum: ${formatMoney(sum, currency)}`);
        return;
      }
    }

    onSave({
      id: 'grp-exp-' + Date.now(),
      description: description.trim(),
      amount: totalAmount,
      paidBy,
      category,
      date,
      splitType,
      participants,
      splits: calculatedSplits
    });
  };

  return React.createElement('div', { className: 'modal-backdrop', onClick: onClose },
    React.createElement('div', { className: 'modal-content', onClick: e => e.stopPropagation() },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', { className: 'card-title' }, `Add Group Expense - ${group.name}`),
        React.createElement('button', { className: 'btn-icon', onClick: onClose }, React.createElement(Icons.Close, null))
      ),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { className: 'modal-body' },
          error && React.createElement('div', { className: 'form-error', style: { padding: '8px 12px', background: 'var(--danger-light)', borderRadius: 8 } }, error),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Expense Title *'),
            React.createElement('input', {
              className: 'form-input',
              type: 'text',
              placeholder: 'e.g. Dinner at Olive Garden, Hotel booking',
              value: description,
              onChange: e => { setDescription(e.target.value); setError(''); },
              autoFocus: true
            })
          ),

          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, `Total Amount (${currency}) *`),
              React.createElement('input', {
                className: 'form-input',
                type: 'number',
                step: '0.01',
                placeholder: '0.00',
                value: amount,
                onChange: e => { setAmount(e.target.value); setError(''); }
              })
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, 'Who Paid? *'),
              React.createElement('select', {
                className: 'form-select',
                value: paidBy,
                onChange: e => setPaidBy(e.target.value)
              },
                members.map(m => React.createElement('option', { key: m.id, value: m.id }, m.name))
              )
            )
          ),

          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, 'Category'),
              React.createElement('select', {
                className: 'form-select',
                value: category,
                onChange: e => setCategory(e.target.value)
              },
                DEFAULT_CATEGORIES.map(cat => React.createElement('option', { key: cat.id, value: cat.id }, `${cat.icon} ${cat.name}`))
              )
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, 'Date'),
              React.createElement('input', {
                className: 'form-input',
                type: 'date',
                value: date,
                onChange: e => setDate(e.target.value)
              })
            )
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Split Method'),
            React.createElement('div', { style: { display: 'flex', gap: 8 } },
              React.createElement('button', {
                type: 'button',
                className: `btn btn-sm ${splitType === 'equal' ? 'btn-primary' : 'btn-secondary'}`,
                onClick: () => setSplitType('equal')
              }, 'Split Equally'),
              React.createElement('button', {
                type: 'button',
                className: `btn btn-sm ${splitType === 'exact' ? 'btn-primary' : 'btn-secondary'}`,
                onClick: () => setSplitType('exact')
              }, 'Custom Exact Amounts')
            )
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Members Involved'),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
              members.map(m => {
                const isChecked = participants.includes(m.id);
                const equalShare = amount && participants.length > 0 ? (parseFloat(amount) / participants.length).toFixed(2) : '0.00';

                return React.createElement('div', {
                  key: m.id,
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 8,
                    backgroundColor: isChecked ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    border: '1px solid',
                    borderColor: isChecked ? 'var(--primary-border)' : 'var(--border-color)'
                  }
                },
                  React.createElement('label', { style: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flex: 1 } },
                    React.createElement('input', {
                      type: 'checkbox',
                      checked: isChecked,
                      onChange: () => toggleParticipant(m.id)
                    }),
                    React.createElement('span', { style: { fontWeight: 600 } }, m.name)
                  ),
                  isChecked && (
                    splitType === 'equal'
                      ? React.createElement('span', { style: { fontSize: '0.85rem', color: 'var(--text-muted)' } }, `${currency}${equalShare}`)
                      : React.createElement('input', {
                          type: 'number',
                          step: '0.01',
                          placeholder: '0.00',
                          style: { width: 90, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)' },
                          value: customSplits[m.id] || '',
                          onChange: e => handleCustomSplitChange(m.id, e.target.value)
                        })
                  )
                );
              })
            )
          )
        ),
        React.createElement('div', { className: 'modal-footer' },
          React.createElement('button', { type: 'button', className: 'btn btn-secondary', onClick: onClose }, 'Cancel'),
          React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Save Group Expense')
        )
      )
    )
  );
}

function SettleUpModal({ isOpen, onClose, group, debt, onSave, currency }) {
  if (!isOpen || !group || !debt) return null;

  const [amount, setAmount] = React.useState(debt.amount.toString());
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = React.useState('Settled via Cash / Online transfer');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid settlement amount');
      return;
    }

    onSave({
      id: 'set-' + Date.now(),
      fromMemberId: debt.fromId,
      toMemberId: debt.toId,
      amount: parsedAmount,
      date,
      notes: notes.trim()
    });
  };

  return React.createElement('div', { className: 'modal-backdrop', onClick: onClose },
    React.createElement('div', { className: 'modal-content', onClick: e => e.stopPropagation() },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', { className: 'card-title' }, 'Record Settlement Payment'),
        React.createElement('button', { className: 'btn-icon', onClick: onClose }, React.createElement(Icons.Close, null))
      ),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { className: 'modal-body' },
          error && React.createElement('div', { className: 'form-error', style: { padding: '8px 12px', background: 'var(--danger-light)', borderRadius: 8 } }, error),

          React.createElement('div', {
            style: {
              padding: 16,
              borderRadius: 12,
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' } }, 'Payer'),
              React.createElement('div', { style: { fontWeight: 700 } }, debt.fromName)
            ),
            React.createElement(Icons.ArrowRight, { style: { color: 'var(--primary)' } }),
            React.createElement('div', { style: { textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' } }, 'Recipient'),
              React.createElement('div', { style: { fontWeight: 700 } }, debt.toName)
            )
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, `Settlement Amount (${currency}) *`),
            React.createElement('input', {
              className: 'form-input',
              type: 'number',
              step: '0.01',
              value: amount,
              onChange: e => setAmount(e.target.value)
            })
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Settlement Date'),
            React.createElement('input', {
              className: 'form-input',
              type: 'date',
              value: date,
              onChange: e => setDate(e.target.value)
            })
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, 'Notes'),
            React.createElement('input', {
              className: 'form-input',
              type: 'text',
              value: notes,
              onChange: e => setNotes(e.target.value)
            })
          )
        ),
        React.createElement('div', { className: 'modal-footer' },
          React.createElement('button', { type: 'button', className: 'btn btn-secondary', onClick: onClose }, 'Cancel'),
          React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Confirm Settlement')
        )
      )
    )
  );
}

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return React.createElement('div', { className: 'modal-backdrop', onClick: onCancel },
    React.createElement('div', { className: 'modal-content', style: { maxWidth: 400 }, onClick: e => e.stopPropagation() },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', { className: 'card-title' }, title),
        React.createElement('button', { className: 'btn-icon', onClick: onCancel }, React.createElement(Icons.Close, null))
      ),
      React.createElement('div', { className: 'modal-body' },
        React.createElement('p', { style: { color: 'var(--text-muted)' } }, message)
      ),
      React.createElement('div', { className: 'modal-footer' },
        React.createElement('button', { type: 'button', className: 'btn btn-secondary', onClick: onCancel }, 'Cancel'),
        React.createElement('button', { type: 'button', className: 'btn btn-danger', onClick: onConfirm }, 'Confirm Delete')
      )
    )
  );
}

// =============================================================================
// 8. VIEWS
// =============================================================================

// --- A. DASHBOARD VIEW ---
function DashboardView({ expenses, groups, monthlyBudget, currency, onAddExpenseClick, onSplitBillClick, setActiveTab }) {
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  const thisMonthExpenses = expenses.filter(e => e.date && e.date.startsWith(currentMonthStr));
  const totalMonthlySpend = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = monthlyBudget - totalMonthlySpend;
  const budgetPercent = Math.min(Math.round((totalMonthlySpend / monthlyBudget) * 100), 100);

  let budgetStatus = 'safe';
  if (budgetPercent >= 100) budgetStatus = 'danger';
  else if (budgetPercent >= 80) budgetStatus = 'warning';

  let youAreOwed = 0;
  let youOwe = 0;
  groups.forEach(g => {
    const balances = calculateGroupBalances(g);
    const userMember = g.members && g.members.find(m => m.name.toLowerCase().includes('you') || m.id === 'mem-1');
    if (userMember && balances.balances[userMember.id] !== undefined) {
      const net = balances.balances[userMember.id];
      if (net > 0.01) youAreOwed += net;
      if (net < -0.01) youOwe += Math.abs(net);
    }
  });

  const categoryTotals = {};
  DEFAULT_CATEGORIES.forEach(c => categoryTotals[c.id] = 0);
  thisMonthExpenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const chartData = DEFAULT_CATEGORIES
    .map(c => ({
      category: c.id,
      name: c.name,
      amount: categoryTotals[c.id] || 0,
      color: c.color,
      icon: c.icon
    }))
    .filter(c => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const topCategory = chartData[0];

  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return React.createElement('div', null,
    React.createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 24
      }
    },
      React.createElement('div', null,
        React.createElement('h1', { style: { fontSize: '1.75rem', fontWeight: 800 } }, 'Financial Dashboard'),
        React.createElement('p', { style: { color: 'var(--text-muted)', fontSize: '0.95rem' } },
          `Overview for ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        React.createElement('button', { className: 'btn btn-primary', onClick: onAddExpenseClick },
          React.createElement(Icons.Plus, null),
          'Add Expense'
        ),
        React.createElement('button', { className: 'btn btn-secondary', onClick: onSplitBillClick },
          React.createElement(Icons.Users, null),
          'Split Bills'
        )
      )
    ),

    React.createElement('div', { className: 'stats-grid' },
      React.createElement('div', { className: 'stat-card', style: { '--stat-accent': '#10b981', '--stat-light': 'rgba(16, 185, 129, 0.15)' } },
        React.createElement('div', { className: 'stat-top' },
          React.createElement('span', { className: 'stat-label' }, 'This Month Spend'),
          React.createElement('div', { className: 'stat-icon' }, React.createElement(Icons.Wallet, null))
        ),
        React.createElement('div', { className: 'stat-value' }, formatMoney(totalMonthlySpend, currency)),
        React.createElement('div', { className: 'stat-meta' }, `${thisMonthExpenses.length} transactions this month`)
      ),

      React.createElement('div', { className: 'stat-card', style: { '--stat-accent': '#3b82f6', '--stat-light': 'rgba(59, 130, 246, 0.15)' } },
        React.createElement('div', { className: 'stat-top' },
          React.createElement('span', { className: 'stat-label' }, 'Monthly Budget'),
          React.createElement('div', { className: 'stat-icon' }, React.createElement(Icons.Dashboard, null))
        ),
        React.createElement('div', { className: 'stat-value' }, formatMoney(monthlyBudget, currency)),
        React.createElement('div', { className: 'stat-meta' }, `${budgetPercent}% allocated`)
      ),

      React.createElement('div', { className: 'stat-card', style: { '--stat-accent': remainingBudget >= 0 ? '#10b981' : '#ef4444', '--stat-light': remainingBudget >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' } },
        React.createElement('div', { className: 'stat-top' },
          React.createElement('span', { className: 'stat-label' }, 'Remaining Balance'),
          React.createElement('div', { className: 'stat-icon' }, React.createElement(Icons.Chart, null))
        ),
        React.createElement('div', { className: 'stat-value', style: { color: remainingBudget < 0 ? 'var(--danger)' : undefined } },
          formatMoney(remainingBudget, currency)
        ),
        React.createElement('div', { className: 'stat-meta' },
          remainingBudget >= 0 ? 'Within budget limit' : 'Over budget threshold'
        )
      ),

      React.createElement('div', { className: 'stat-card', style: { '--stat-accent': '#8b5cf6', '--stat-light': 'rgba(139, 92, 246, 0.15)' } },
        React.createElement('div', { className: 'stat-top' },
          React.createElement('span', { className: 'stat-label' }, 'Group Balances'),
          React.createElement('div', { className: 'stat-icon' }, React.createElement(Icons.Users, null))
        ),
        React.createElement('div', { className: 'stat-value' }, formatMoney(youAreOwed, currency)),
        React.createElement('div', { className: 'stat-meta', style: { color: youOwe > 0 ? 'var(--danger)' : 'var(--text-muted)' } },
          youOwe > 0 ? `You owe ${formatMoney(youOwe, currency)}` : 'You owe nothing'
        )
      )
    ),

    React.createElement('div', { className: 'budget-progress-card' },
      React.createElement('div', { className: 'progress-header' },
        React.createElement('div', null,
          React.createElement('span', { style: { fontWeight: 700, fontSize: '1rem' } }, 'Monthly Budget Status'),
          React.createElement('span', { style: { marginLeft: 8, fontSize: '0.85rem', color: 'var(--text-muted)' } },
            `(${formatMoney(totalMonthlySpend, currency)} of ${formatMoney(monthlyBudget, currency)})`
          )
        ),
        React.createElement('span', {
          style: {
            fontWeight: 700,
            fontSize: '0.95rem',
            color: budgetStatus === 'danger' ? 'var(--danger)' : (budgetStatus === 'warning' ? 'var(--warning)' : 'var(--primary)')
          }
        }, `${budgetPercent}% used`)
      ),
      React.createElement('div', { className: 'progress-track' },
        React.createElement('div', { className: `progress-fill ${budgetStatus}`, style: { width: `${budgetPercent}%` } })
      ),
      React.createElement('div', { className: 'progress-footer' },
        React.createElement('span', null, `${formatMoney(Math.max(remainingBudget, 0), currency)} remaining for this month`),
        React.createElement('span', null, `${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()} days left`)
      )
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 } },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-header' },
          React.createElement('div', null,
            React.createElement('h3', { className: 'card-title' }, 'Monthly Spending Breakdown'),
            React.createElement('p', { className: 'card-subtitle' }, topCategory ? `Top category: ${topCategory.name}` : 'Spending by category')
          ),
          React.createElement('button', { className: 'btn btn-ghost btn-sm', onClick: () => setActiveTab('reports') }, 'View Reports')
        ),
        React.createElement(CategoryDonutChart, { data: chartData, currency })
      ),

      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-header' },
          React.createElement('div', null,
            React.createElement('h3', { className: 'card-title' }, 'Recent Transactions'),
            React.createElement('p', { className: 'card-subtitle' }, 'Latest personal expenses')
          ),
          React.createElement('button', { className: 'btn btn-ghost btn-sm', onClick: () => setActiveTab('expenses') }, 'View All')
        ),
        recentTransactions.length === 0
          ? React.createElement('div', { className: 'empty-state', style: { padding: '32px 16px' } },
              React.createElement('p', { className: 'empty-desc' }, 'No transactions recorded yet.'),
              React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: onAddExpenseClick }, 'Add First Expense')
            )
          : React.createElement('div', { className: 'transactions-list' },
              recentTransactions.map(exp => {
                const catObj = DEFAULT_CATEGORIES.find(c => c.id === exp.category) || DEFAULT_CATEGORIES[6];
                return React.createElement('div', { key: exp.id, className: 'transaction-item' },
                  React.createElement('div', { className: 'transaction-left' },
                    React.createElement('div', { className: `category-icon-badge cat-${exp.category}` }, catObj.icon),
                    React.createElement('div', { className: 'transaction-info' },
                      React.createElement('span', { className: 'transaction-desc' }, exp.description),
                      React.createElement('div', { className: 'transaction-meta' },
                        React.createElement('span', null, exp.date),
                        React.createElement('span', null, '•'),
                        React.createElement('span', null, exp.paymentMethod || 'Card')
                      )
                    )
                  ),
                  React.createElement('div', { className: 'transaction-right' },
                    React.createElement('span', { className: 'transaction-amount' }, formatMoney(exp.amount, currency))
                  )
                );
              })
            )
      )
    )
  );
}

// --- B. PERSONAL EXPENSES VIEW ---
function ExpensesView({ expenses, currency, onAddClick, onEditClick, onDeleteClick }) {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [dateFilter, setDateFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('date-desc');

  const filteredExpenses = expenses.filter(exp => {
    const q = search.toLowerCase();
    const matchSearch = exp.description.toLowerCase().includes(q) || (exp.notes && exp.notes.toLowerCase().includes(q));
    if (!matchSearch) return false;

    if (selectedCategory !== 'All' && exp.category !== selectedCategory) return false;

    if (dateFilter !== 'all') {
      const expDate = new Date(exp.date);
      const now = new Date();
      if (dateFilter === 'this-month') {
        if (expDate.getMonth() !== now.getMonth() || expDate.getFullYear() !== now.getFullYear()) return false;
      } else if (dateFilter === 'last-month') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        if (expDate.getMonth() !== lastMonth.getMonth() || expDate.getFullYear() !== lastMonth.getFullYear()) return false;
      } else if (dateFilter === 'this-year') {
        if (expDate.getFullYear() !== now.getFullYear()) return false;
      }
    }
    return true;
  });

  filteredExpenses.sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount-desc') return b.amount - a.amount;
    if (sortBy === 'amount-asc') return a.amount - b.amount;
    if (sortBy === 'title-asc') return a.description.localeCompare(b.description);
    return 0;
  });

  const filteredTotal = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return React.createElement('div', null,
    React.createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 20
      }
    },
      React.createElement('div', null,
        React.createElement('h1', { style: { fontSize: '1.75rem', fontWeight: 800 } }, 'Personal Expenses'),
        React.createElement('p', { style: { color: 'var(--text-muted)', fontSize: '0.95rem' } },
          `Showing ${filteredExpenses.length} of ${expenses.length} expenses • Total: ${formatMoney(filteredTotal, currency)}`
        )
      ),
      React.createElement('button', { className: 'btn btn-primary', onClick: onAddClick },
        React.createElement(Icons.Plus, null),
        'Add Expense'
      )
    ),

    React.createElement('div', { className: 'filter-bar' },
      React.createElement('div', { className: 'search-input-wrap' },
        React.createElement(Icons.Search, null),
        React.createElement('input', {
          className: 'search-input',
          type: 'text',
          placeholder: 'Search transactions by description or notes...',
          value: search,
          onChange: e => setSearch(e.target.value)
        })
      ),
      React.createElement('div', { className: 'filter-controls' },
        React.createElement('select', {
          className: 'filter-select',
          value: selectedCategory,
          onChange: e => setSelectedCategory(e.target.value)
        },
          React.createElement('option', { value: 'All' }, 'All Categories'),
          DEFAULT_CATEGORIES.map(c => React.createElement('option', { key: c.id, value: c.id }, `${c.icon} ${c.name}`))
        ),
        React.createElement('select', {
          className: 'filter-select',
          value: dateFilter,
          onChange: e => setDateFilter(e.target.value)
        },
          React.createElement('option', { value: 'all' }, 'All Time'),
          React.createElement('option', { value: 'this-month' }, 'This Month'),
          React.createElement('option', { value: 'last-month' }, 'Last Month'),
          React.createElement('option', { value: 'this-year' }, 'This Year')
        ),
        React.createElement('select', {
          className: 'filter-select',
          value: sortBy,
          onChange: e => setSortBy(e.target.value)
        },
          React.createElement('option', { value: 'date-desc' }, 'Date (Newest)'),
          React.createElement('option', { value: 'date-asc' }, 'Date (Oldest)'),
          React.createElement('option', { value: 'amount-desc' }, 'Amount (Highest)'),
          React.createElement('option', { value: 'amount-asc' }, 'Amount (Lowest)')
        )
      )
    ),

    filteredExpenses.length === 0
      ? React.createElement('div', { className: 'empty-state' },
          React.createElement('div', { className: 'empty-icon' }, React.createElement(Icons.Wallet, { width: 32, height: 32 })),
          React.createElement('h3', { className: 'empty-title' }, 'No Expenses Found'),
          React.createElement('p', { className: 'empty-desc' },
            search || selectedCategory !== 'All' || dateFilter !== 'all'
              ? 'Try adjusting your search query or filters to find what you are looking for.'
              : 'Start tracking your spending by adding your first personal expense!'
          ),
          React.createElement('button', { className: 'btn btn-primary', onClick: onAddClick },
            React.createElement(Icons.Plus, null),
            'Add New Expense'
          )
        )
      : React.createElement('div', { className: 'transactions-list' },
          filteredExpenses.map(exp => {
            const catObj = DEFAULT_CATEGORIES.find(c => c.id === exp.category) || DEFAULT_CATEGORIES[6];

            return React.createElement('div', { key: exp.id, className: 'transaction-item' },
              React.createElement('div', { className: 'transaction-left' },
                React.createElement('div', { className: `category-icon-badge cat-${exp.category}` }, catObj.icon),
                React.createElement('div', { className: 'transaction-info' },
                  React.createElement('span', { className: 'transaction-desc' }, exp.description),
                  React.createElement('div', { className: 'transaction-meta' },
                    React.createElement('span', { className: `category-tag cat-${exp.category}` }, catObj.name),
                    React.createElement('span', null, exp.date),
                    React.createElement('span', null, '•'),
                    React.createElement('span', null, exp.paymentMethod || 'Card'),
                    exp.notes && React.createElement('span', { style: { fontStyle: 'italic', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' } }, `("${exp.notes}")`)
                  )
                )
              ),
              React.createElement('div', { className: 'transaction-right' },
                React.createElement('span', { className: 'transaction-amount' }, formatMoney(exp.amount, currency)),
                React.createElement('div', { className: 'transaction-actions' },
                  React.createElement('button', {
                    className: 'action-btn',
                    title: 'Edit expense',
                    onClick: () => onEditClick(exp)
                  }, React.createElement(Icons.Edit, null)),
                  React.createElement('button', {
                    className: 'action-btn delete',
                    title: 'Delete expense',
                    onClick: () => onDeleteClick(exp)
                  }, React.createElement(Icons.Trash, null))
                )
              )
            );
          })
        )
  );
}

// --- C. BUDGET SPLITTER VIEW ---
function SplitBillsView({
  groups,
  currency,
  onCreateGroupClick,
  onAddGroupExpenseClick,
  onSettleClick,
  onDeleteGroupClick,
  onDeleteGroupExpenseClick,
  onAddMemberToGroup
}) {
  const [selectedGroupId, setSelectedGroupId] = React.useState(groups[0]?.id || null);
  const [groupTab, setGroupTab] = React.useState('debts');
  const [newMemberName, setNewMemberName] = React.useState('');

  const activeGroup = groups.find(g => g.id === selectedGroupId) || groups[0];

  if (!activeGroup) {
    return React.createElement('div', { className: 'empty-state' },
      React.createElement('div', { className: 'empty-icon' }, React.createElement(Icons.Users, { width: 32, height: 32 })),
      React.createElement('h3', { className: 'empty-title' }, 'No Split Groups Created'),
      React.createElement('p', { className: 'empty-desc' }, 'Create a trip, event, or shared apartment group to start splitting bills easily with friends.'),
      React.createElement('button', { className: 'btn btn-primary', onClick: onCreateGroupClick },
        React.createElement(Icons.Plus, null),
        'Create New Group'
      )
    );
  }

  const { balances, simplifiedDebts } = calculateGroupBalances(activeGroup);
  const totalGroupSpend = (activeGroup.expenses || []).reduce((sum, e) => sum + e.amount, 0);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMemberName.trim()) {
      onAddMemberToGroup(activeGroup.id, newMemberName.trim());
      setNewMemberName('');
    }
  };

  return React.createElement('div', null,
    React.createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 20
      }
    },
      React.createElement('div', null,
        React.createElement('h1', { style: { fontSize: '1.75rem', fontWeight: 800 } }, 'Budget Splitter'),
        React.createElement('p', { style: { color: 'var(--text-muted)', fontSize: '0.95rem' } },
          'Split group costs, record who paid, and simplify who owes whom'
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10 } },
        React.createElement('button', { className: 'btn btn-primary', onClick: () => onAddGroupExpenseClick(activeGroup) },
          React.createElement(Icons.Plus, null),
          'Add Group Expense'
        ),
        React.createElement('button', { className: 'btn btn-secondary', onClick: onCreateGroupClick },
          React.createElement(Icons.Users, null),
          'New Group'
        )
      )
    ),

    React.createElement('div', { className: 'groups-grid' },
      groups.map(g => {
        const isSelected = g.id === activeGroup.id;
        const total = (g.expenses || []).reduce((sum, e) => sum + e.amount, 0);

        return React.createElement('div', {
          key: g.id,
          className: 'group-card',
          style: {
            borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
            boxShadow: isSelected ? '0 0 0 2px var(--primary)' : undefined
          },
          onClick: () => setSelectedGroupId(g.id)
        },
          React.createElement('div', { className: 'group-card-header' },
            React.createElement('div', null,
              React.createElement('h4', { style: { fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' } }, g.name),
              g.description && React.createElement('p', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 } }, g.description)
            ),
            isSelected && React.createElement('span', { className: 'group-badge', style: { backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' } }, 'ACTIVE')
          ),

          React.createElement('div', { className: 'group-members-avatars' },
            (g.members || []).slice(0, 5).map(m => React.createElement('div', {
              key: m.id,
              className: 'avatar',
              style: { backgroundColor: m.avatarColor }
            }, m.name.charAt(0))),
            (g.members || []).length > 5 && React.createElement('div', { className: 'avatar avatar-more' }, `+${g.members.length - 5}`)
          ),

          React.createElement('div', { className: 'group-stats' },
            React.createElement('span', { style: { color: 'var(--text-muted)' } }, `${(g.expenses || []).length} expenses`),
            React.createElement('span', { style: { fontWeight: 700 } }, formatMoney(total, currency))
          )
        );
      })
    ),

    React.createElement('div', { className: 'card', style: { marginTop: 10 } },
      React.createElement('div', { className: 'card-header', style: { borderBottom: '1px solid var(--border-color)', paddingBottom: 16 } },
        React.createElement('div', null,
          React.createElement('h2', { style: { fontSize: '1.3rem', fontWeight: 800 } }, activeGroup.name),
          React.createElement('p', { style: { color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 } },
            `${activeGroup.members.length} members • Total spent: ${formatMoney(totalGroupSpend, currency)}`
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement('button', {
            className: 'btn btn-secondary btn-sm',
            onClick: () => onAddGroupExpenseClick(activeGroup)
          },
            React.createElement(Icons.Plus, null),
            'Add Expense'
          ),
          React.createElement('button', {
            className: 'action-btn delete',
            title: 'Delete this group',
            onClick: () => onDeleteGroupClick(activeGroup)
          }, React.createElement(Icons.Trash, null))
        )
      ),

      React.createElement('div', { style: { display: 'flex', gap: 8, margin: '16px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: 10 } },
        React.createElement('button', {
          className: `btn btn-sm ${groupTab === 'debts' ? 'btn-primary' : 'btn-ghost'}`,
          onClick: () => setGroupTab('debts')
        }, 'Who Owes Whom & Settle Up'),
        React.createElement('button', {
          className: `btn btn-sm ${groupTab === 'expenses' ? 'btn-primary' : 'btn-ghost'}`,
          onClick: () => setGroupTab('expenses')
        }, `Expenses (${(activeGroup.expenses || []).length})`),
        React.createElement('button', {
          className: `btn btn-sm ${groupTab === 'members' ? 'btn-primary' : 'btn-ghost'}`,
          onClick: () => setGroupTab('members')
        }, `Members (${activeGroup.members.length})`)
      ),

      // Tab 1: Who Owes Whom & Settle Up
      groupTab === 'debts' && React.createElement('div', null,
        React.createElement('div', { style: { marginBottom: 24 } },
          React.createElement('h4', { style: { fontSize: '0.95rem', fontWeight: 700, marginBottom: 10 } }, 'Member Net Balances'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 } },
            activeGroup.members.map(m => {
              const net = balances[m.id] || 0;
              const isSettled = Math.abs(net) < 0.01;
              const isCreditor = net > 0.01;

              return React.createElement('div', {
                key: m.id,
                style: {
                  padding: '12px 16px',
                  borderRadius: 10,
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }
              },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                  React.createElement('div', { className: 'avatar', style: { backgroundColor: m.avatarColor, width: 32, height: 32 } }, m.name.charAt(0)),
                  React.createElement('div', null,
                    React.createElement('div', { style: { fontWeight: 600, fontSize: '0.9rem' } }, m.name),
                    React.createElement('div', { style: { fontSize: '0.75rem', color: 'var(--text-muted)' } },
                      isSettled ? 'All settled' : (isCreditor ? 'gets back' : 'owes')
                    )
                  )
                ),
                React.createElement('div', {
                  style: {
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: isSettled ? 'var(--text-muted)' : (isCreditor ? 'var(--primary)' : 'var(--danger)')
                  }
                },
                  isSettled ? `${currency}0.00` : (isCreditor ? `+${formatMoney(net, currency)}` : `-${formatMoney(Math.abs(net), currency)}`)
                )
              );
            })
          )
        ),

        React.createElement('div', null,
          React.createElement('h4', { style: { fontSize: '0.95rem', fontWeight: 700, marginBottom: 10 } }, 'Simplified Settle Up Suggestions'),
          simplifiedDebts.length === 0
            ? React.createElement('div', { className: 'empty-state', style: { padding: '24px 16px' } },
                React.createElement('p', { style: { fontWeight: 600, color: 'var(--primary)' } }, '🎉 Everyone is completely settled up!'),
                React.createElement('p', { className: 'empty-desc', style: { marginTop: 4 } }, 'There are currently no outstanding debts in this group.')
              )
            : React.createElement('div', null,
                simplifiedDebts.map((debt, idx) => React.createElement('div', { key: idx, className: 'settlement-card' },
                  React.createElement('div', { className: 'debt-flow' },
                    React.createElement('span', { style: { color: 'var(--danger)', fontWeight: 700 } }, debt.fromName),
                    React.createElement(Icons.ArrowRight, { style: { color: 'var(--text-muted)' } }),
                    React.createElement('span', { style: { color: 'var(--primary)', fontWeight: 700 } }, debt.toName)
                  ),
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
                    React.createElement('span', { className: 'debt-amount' }, formatMoney(debt.amount, currency)),
                    React.createElement('button', {
                      className: 'btn btn-primary btn-sm',
                      onClick: () => onSettleClick(activeGroup, debt)
                    }, 'Settle Up')
                  )
                ))
              )
        ),

        (activeGroup.settlements && activeGroup.settlements.length > 0) && React.createElement('div', { style: { marginTop: 24 } },
          React.createElement('h4', { style: { fontSize: '0.95rem', fontWeight: 700, marginBottom: 10 } }, 'Past Settlements History'),
          React.createElement('div', { className: 'transactions-list' },
            activeGroup.settlements.map(set => {
              const fromMem = activeGroup.members.find(m => m.id === set.fromMemberId);
              const toMem = activeGroup.members.find(m => m.id === set.toMemberId);

              return React.createElement('div', { key: set.id, className: 'transaction-item', style: { background: 'var(--bg-subtle)' } },
                React.createElement('div', { className: 'transaction-left' },
                  React.createElement(Icons.Check, { style: { color: 'var(--primary)' } }),
                  React.createElement('div', { className: 'transaction-info' },
                    React.createElement('span', { style: { fontWeight: 600 } }, `${fromMem?.name || 'Member'} paid ${toMem?.name || 'Member'}`),
                    React.createElement('div', { className: 'transaction-meta' },
                      React.createElement('span', null, set.date),
                      set.notes && React.createElement('span', null, `• ${set.notes}`)
                    )
                  )
                ),
                React.createElement('span', { style: { fontWeight: 700, color: 'var(--primary)' } }, formatMoney(set.amount, currency))
              );
            })
          )
        )
      ),

      // Tab 2: Group Expenses List
      groupTab === 'expenses' && React.createElement('div', null,
        (activeGroup.expenses || []).length === 0
          ? React.createElement('div', { className: 'empty-state', style: { padding: '32px 16px' } },
              React.createElement('p', { className: 'empty-desc' }, 'No group expenses added yet.'),
              React.createElement('button', { className: 'btn btn-primary btn-sm', onClick: () => onAddGroupExpenseClick(activeGroup) }, 'Add Group Expense')
            )
          : React.createElement('div', { className: 'transactions-list' },
              activeGroup.expenses.map(exp => {
                const payer = activeGroup.members.find(m => m.id === exp.paidBy);
                const catObj = DEFAULT_CATEGORIES.find(c => c.id === exp.category) || DEFAULT_CATEGORIES[6];

                return React.createElement('div', { key: exp.id, className: 'transaction-item' },
                  React.createElement('div', { className: 'transaction-left' },
                    React.createElement('div', { className: `category-icon-badge cat-${exp.category}` }, catObj.icon),
                    React.createElement('div', { className: 'transaction-info' },
                      React.createElement('span', { className: 'transaction-desc' }, exp.description),
                      React.createElement('div', { className: 'transaction-meta' },
                        React.createElement('span', { style: { fontWeight: 600, color: 'var(--primary)' } }, `Paid by ${payer?.name || 'Unknown'}`),
                        React.createElement('span', null, '•'),
                        React.createElement('span', null, exp.date),
                        React.createElement('span', null, '•'),
                        React.createElement('span', null, exp.splitType === 'equal' ? 'Split equally' : 'Custom split')
                      )
                    )
                  ),
                  React.createElement('div', { className: 'transaction-right' },
                    React.createElement('span', { className: 'transaction-amount' }, formatMoney(exp.amount, currency)),
                    React.createElement('button', {
                      className: 'action-btn delete',
                      title: 'Delete group expense',
                      onClick: () => onDeleteGroupExpenseClick(activeGroup, exp)
                    }, React.createElement(Icons.Trash, null))
                  )
                );
              })
            )
      ),

      // Tab 3: Group Members List
      groupTab === 'members' && React.createElement('div', null,
        React.createElement('form', { onSubmit: handleAddMember, style: { display: 'flex', gap: 8, marginBottom: 16 } },
          React.createElement('input', {
            className: 'form-input',
            type: 'text',
            placeholder: 'Add new friend to this group...',
            value: newMemberName,
            onChange: e => setNewMemberName(e.target.value)
          }),
          React.createElement('button', { type: 'submit', className: 'btn btn-primary' },
            React.createElement(Icons.Plus, null),
            'Add Member'
          )
        ),

        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          activeGroup.members.map(m => React.createElement('div', {
            key: m.id,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 10
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('div', { className: 'avatar', style: { backgroundColor: m.avatarColor, width: 36, height: 36 } }, m.name.charAt(0)),
              React.createElement('div', null,
                React.createElement('div', { style: { fontWeight: 700 } }, m.name),
                React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' } }, 'Group Member')
              )
            ),
            React.createElement('span', {
              style: {
                fontSize: '0.8rem',
                fontWeight: 600,
                color: (balances[m.id] || 0) >= 0 ? 'var(--primary)' : 'var(--danger)'
              }
            },
              (balances[m.id] || 0) >= 0 ? `Gets back ${formatMoney(balances[m.id] || 0, currency)}` : `Owes ${formatMoney(Math.abs(balances[m.id] || 0), currency)}`
            )
          ))
        )
      )
    )
  );
}

// --- D. REPORTS VIEW ---
function ReportsView({ expenses, currency }) {
  const [period, setPeriod] = React.useState('all');

  const now = new Date();
  const filtered = expenses.filter(exp => {
    if (period === 'all') return true;
    const expDate = new Date(exp.date);
    if (period === 'this-month') {
      return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
    }
    if (period === 'last-month') {
      const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return expDate.getMonth() === lm.getMonth() && expDate.getFullYear() === lm.getFullYear();
    }
    if (period === 'this-year') {
      return expDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const totalSpent = filtered.reduce((sum, e) => sum + e.amount, 0);

  const catMap = {};
  DEFAULT_CATEGORIES.forEach(c => catMap[c.id] = 0);
  filtered.forEach(e => {
    catMap[e.category] = (catMap[e.category] || 0) + e.amount;
  });

  const categoryData = DEFAULT_CATEGORIES
    .map(c => ({
      category: c.id,
      name: c.name,
      amount: catMap[c.id] || 0,
      color: c.color,
      icon: c.icon
    }))
    .filter(c => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = d.toISOString().slice(0, 7);
    const label = d.toLocaleString('default', { month: 'short' });
    const amount = expenses
      .filter(e => e.date && e.date.startsWith(monthKey))
      .reduce((sum, e) => sum + e.amount, 0);

    monthlyData.push({
      label,
      amount,
      isCurrentMonth: i === 0
    });
  }

  const highestExpense = filtered.length > 0 ? [...filtered].sort((a, b) => b.amount - a.amount)[0] : null;
  const avgExpense = filtered.length > 0 ? totalSpent / filtered.length : 0;

  return React.createElement('div', null,
    React.createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 20
      }
    },
      React.createElement('div', null,
        React.createElement('h1', { style: { fontSize: '1.75rem', fontWeight: 800 } }, 'Spending Reports & Visualizations'),
        React.createElement('p', { style: { color: 'var(--text-muted)', fontSize: '0.95rem' } },
          `Graphical analysis of your spending patterns and category distributions`
        )
      ),
      React.createElement('select', {
        className: 'filter-select',
        value: period,
        onChange: e => setPeriod(e.target.value)
      },
        React.createElement('option', { value: 'all' }, 'All Time'),
        React.createElement('option', { value: 'this-month' }, 'This Month'),
        React.createElement('option', { value: 'last-month' }, 'Last Month'),
        React.createElement('option', { value: 'this-year' }, 'This Year')
      )
    ),

    React.createElement('div', { className: 'stats-grid', style: { gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: 20 } },
      React.createElement('div', { className: 'card', style: { padding: 16 } },
        React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' } }, 'Period Total'),
        React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginTop: 4 } }, formatMoney(totalSpent, currency)),
        React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 } }, `${filtered.length} transactions`)
      ),
      React.createElement('div', { className: 'card', style: { padding: 16 } },
        React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' } }, 'Average Transaction'),
        React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, marginTop: 4 } }, formatMoney(avgExpense, currency)),
        React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 } }, 'Per recorded expense')
      ),
      React.createElement('div', { className: 'card', style: { padding: 16 } },
        React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' } }, 'Highest Single Expense'),
        React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)', marginTop: 4 } },
          highestExpense ? formatMoney(highestExpense.amount, currency) : formatMoney(0, currency)
        ),
        React.createElement('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } },
          highestExpense ? highestExpense.description : 'None'
        )
      )
    ),

    React.createElement('div', { className: 'charts-grid' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-header' },
          React.createElement('h3', { className: 'card-title' }, 'Spending by Category'),
          React.createElement('span', { style: { fontSize: '0.85rem', color: 'var(--text-muted)' } }, `${categoryData.length} active categories`)
        ),
        React.createElement(CategoryDonutChart, { data: categoryData, currency })
      ),

      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-header' },
          React.createElement('h3', { className: 'card-title' }, '6-Month Spending Trend'),
          React.createElement('span', { style: { fontSize: '0.85rem', color: 'var(--text-muted)' } }, 'Monthly volume')
        ),
        React.createElement(MonthlyBarChart, { monthlyData, currency })
      )
    ),

    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card-header' },
        React.createElement('h3', { className: 'card-title' }, 'Detailed Category Breakdown')
      ),
      categoryData.length === 0
        ? React.createElement('p', { className: 'empty-desc', style: { textAlign: 'center', padding: 20 } }, 'No category data available for this period.')
        : React.createElement('div', { style: { overflowX: 'auto' } },
            React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' } },
              React.createElement('thead', null,
                React.createElement('tr', { style: { borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' } },
                  React.createElement('th', { style: { padding: '10px 12px' } }, 'Category'),
                  React.createElement('th', { style: { padding: '10px 12px' } }, 'Transactions'),
                  React.createElement('th', { style: { padding: '10px 12px' } }, 'Percentage'),
                  React.createElement('th', { style: { padding: '10px 12px', textAlign: 'right' } }, 'Total Spent')
                )
              ),
              React.createElement('tbody', null,
                categoryData.map(cat => {
                  const catTransactions = filtered.filter(e => e.category === cat.category);
                  const percentage = totalSpent > 0 ? Math.round((cat.amount / totalSpent) * 100) : 0;

                  return React.createElement('tr', { key: cat.category, style: { borderBottom: '1px solid var(--border-color)' } },
                    React.createElement('td', { style: { padding: '12px', display: 'flex', alignItems: 'center', gap: 10 } },
                      React.createElement('span', { style: { fontSize: '1.2rem' } }, cat.icon),
                      React.createElement('span', { style: { fontWeight: 600 } }, cat.name)
                    ),
                    React.createElement('td', { style: { padding: '12px' } }, `${catTransactions.length} expenses`),
                    React.createElement('td', { style: { padding: '12px' } },
                      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                        React.createElement('div', { style: { width: 60, height: 6, background: 'var(--bg-subtle)', borderRadius: 3, overflow: 'hidden' } },
                          React.createElement('div', { style: { width: `${percentage}%`, height: '100%', background: cat.color } })
                        ),
                        React.createElement('span', { style: { fontWeight: 600 } }, `${percentage}%`)
                      )
                    ),
                    React.createElement('td', { style: { padding: '12px', textAlign: 'right', fontWeight: 700 } }, formatMoney(cat.amount, currency))
                  );
                })
              )
            )
          )
    )
  );
}

// --- E. SETTINGS VIEW ---
function SettingsView({
  monthlyBudget,
  setMonthlyBudget,
  currency,
  setCurrency,
  theme,
  setTheme,
  onResetDemoData,
  onClearAllData,
  onExportData,
  onImportData
}) {
  const [budgetInput, setBudgetInput] = React.useState(monthlyBudget.toString());
  const [saveMsg, setSaveMsg] = React.useState('');
  const fileInputRef = React.useRef(null);

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val >= 0) {
      setMonthlyBudget(val);
      setSaveMsg('Monthly budget updated!');
      setTimeout(() => setSaveMsg(''), 2500);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          onImportData(parsed);
        } catch (err) {
          alert('Invalid backup file. Please select a valid JSON backup.');
        }
      };
      reader.readAsText(file);
    }
  };

  return React.createElement('div', null,
    React.createElement('div', { style: { marginBottom: 24 } },
      React.createElement('h1', { style: { fontSize: '1.75rem', fontWeight: 800 } }, 'App Settings & Preferences'),
      React.createElement('p', { style: { color: 'var(--text-muted)', fontSize: '0.95rem' } },
        'Manage your currency, budget goals, theme, backup, and local data'
      )
    ),

    React.createElement('div', { className: 'settings-section' },
      React.createElement('h3', { className: 'settings-section-title' }, React.createElement(Icons.Wallet, null), 'Financial Settings'),

      React.createElement('div', { className: 'settings-row' },
        React.createElement('div', { className: 'settings-info' },
          React.createElement('h4', null, 'Monthly Budget Goal'),
          React.createElement('p', null, 'Target limit used for monthly spending progress calculation')
        ),
        React.createElement('form', { onSubmit: handleSaveBudget, style: { display: 'flex', alignItems: 'center', gap: 8 } },
          React.createElement('input', {
            className: 'form-input',
            type: 'number',
            step: '10',
            style: { width: 120 },
            value: budgetInput,
            onChange: e => setBudgetInput(e.target.value)
          }),
          React.createElement('button', { type: 'submit', className: 'btn btn-primary btn-sm' }, 'Save')
        )
      ),
      saveMsg && React.createElement('div', { style: { fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginTop: 4 } }, saveMsg),

      React.createElement('div', { className: 'settings-row' },
        React.createElement('div', { className: 'settings-info' },
          React.createElement('h4', null, 'Display Currency'),
          React.createElement('p', null, 'Symbol shown across all metrics, graphs, and debts')
        ),
        React.createElement('select', {
          className: 'filter-select',
          value: currency,
          onChange: e => setCurrency(e.target.value)
        },
          CURRENCIES.map(c => React.createElement('option', { key: c.code, value: c.symbol }, `${c.name}`))
        )
      )
    ),

    React.createElement('div', { className: 'settings-section' },
      React.createElement('h3', { className: 'settings-section-title' }, React.createElement(Icons.Sun, null), 'Appearance'),
      React.createElement('div', { className: 'settings-row' },
        React.createElement('div', { className: 'settings-info' },
          React.createElement('h4', null, 'Theme Mode'),
          React.createElement('p', null, 'Switch between clean light theme and sleek dark mode')
        ),
        React.createElement('button', {
          className: 'btn btn-secondary',
          onClick: () => setTheme(theme === 'light' ? 'dark' : 'light')
        },
          theme === 'light' ? React.createElement(Icons.Moon, null) : React.createElement(Icons.Sun, null),
          theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'
        )
      )
    ),

    React.createElement('div', { className: 'settings-section' },
      React.createElement('h3', { className: 'settings-section-title' }, React.createElement(Icons.Dashboard, null), 'Data Backup & Storage'),

      React.createElement('div', { className: 'settings-row' },
        React.createElement('div', { className: 'settings-info' },
          React.createElement('h4', null, 'Export Data Backup'),
          React.createElement('p', null, 'Download all your personal expenses, groups, and settlements as a JSON file')
        ),
        React.createElement('button', { className: 'btn btn-secondary', onClick: onExportData }, 'Download JSON')
      ),

      React.createElement('div', { className: 'settings-row' },
        React.createElement('div', { className: 'settings-info' },
          React.createElement('h4', null, 'Import Data Backup'),
          React.createElement('p', null, 'Restore previously exported JSON backup data')
        ),
        React.createElement('div', null,
          React.createElement('input', {
            type: 'file',
            ref: fileInputRef,
            style: { display: 'none' },
            accept: '.json',
            onChange: handleFileChange
          }),
          React.createElement('button', { className: 'btn btn-secondary', onClick: () => fileInputRef.current && fileInputRef.current.click() }, 'Select File')
        )
      ),

      React.createElement('div', { className: 'settings-row' },
        React.createElement('div', { className: 'settings-info' },
          React.createElement('h4', null, 'Restore Sample Demo Data'),
          React.createElement('p', null, 'Populate realistic sample expenses and trip groups for testing')
        ),
        React.createElement('button', { className: 'btn btn-secondary', onClick: onResetDemoData }, 'Load Demo Data')
      ),

      React.createElement('div', { className: 'settings-row' },
        React.createElement('div', { className: 'settings-info' },
          React.createElement('h4', { style: { color: 'var(--danger)' } }, 'Clear All Data'),
          React.createElement('p', null, 'Permanently wipe all locally stored expenses and groups')
        ),
        React.createElement('button', { className: 'btn btn-danger btn-sm', onClick: onClearAllData }, 'Clear All')
      )
    ),

    React.createElement('div', { className: 'settings-section' },
      React.createElement('h3', { className: 'settings-section-title' }, 'About BudgetSplit'),
      React.createElement('p', { style: { fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 8 } },
        'Budget Splitter & Expense Tracker is a 100% private, offline-first client application. All your sensitive financial calculations, expenses, and friend settlements are processed and stored locally in your browser with zero server dependencies.'
      ),
      React.createElement('div', { style: { display: 'flex', gap: 12, fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 } },
        React.createElement('span', null, '✓ Offline Ready'),
        React.createElement('span', null, '✓ Local Storage Persistent'),
        React.createElement('span', null, '✓ Zero External Login Required')
      )
    )
  );
}

// =============================================================================
// 9. ROOT APPLICATION COMPONENT
// =============================================================================

function App() {
  const [state, setState] = React.useState(loadInitialState);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [toasts, setToasts] = React.useState([]);

  // Modals state
  const [isExpenseModalOpen, setIsExpenseModalOpen] = React.useState(false);
  const [editingExpense, setEditingExpense] = React.useState(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = React.useState(false);
  const [isGroupExpenseModalOpen, setIsGroupExpenseModalOpen] = React.useState(false);
  const [activeGroupForExpense, setActiveGroupForExpense] = React.useState(null);
  const [isSettleModalOpen, setIsSettleModalOpen] = React.useState(false);
  const [settleDebtInfo, setSettleDebtInfo] = React.useState(null);
  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', message: '', onConfirm: null });

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme || 'light');
    saveStateToStorage(state);
  }, [state]);

  // Keyboard navigation: Escape key closes active modal
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsExpenseModalOpen(false);
        setIsGroupModalOpen(false);
        setIsGroupExpenseModalOpen(false);
        setIsSettleModalOpen(false);
        setConfirmDialog({ isOpen: false });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Personal Expense Operations
  const handleSaveExpense = (expense) => {
    if (editingExpense) {
      setState(prev => ({
        ...prev,
        expenses: prev.expenses.map(e => e.id === expense.id ? expense : e)
      }));
      addToast('Expense updated successfully!');
    } else {
      setState(prev => ({
        ...prev,
        expenses: [expense, ...prev.expenses]
      }));
      addToast('New expense added successfully!');
    }
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (expense) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Expense',
      message: `Are you sure you want to delete "${expense.description}" (${formatMoney(expense.amount, state.currency)})?`,
      onConfirm: () => {
        setState(prev => ({
          ...prev,
          expenses: prev.expenses.filter(e => e.id !== expense.id)
        }));
        setConfirmDialog({ isOpen: false });
        addToast('Expense deleted', 'info');
      }
    });
  };

  // Group Operations
  const handleSaveGroup = (group) => {
    setState(prev => ({
      ...prev,
      groups: [group, ...prev.groups]
    }));
    setIsGroupModalOpen(false);
    addToast(`Group "${group.name}" created!`);
  };

  const handleDeleteGroup = (group) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Group',
      message: `Are you sure you want to delete the group "${group.name}" and all its recorded expenses?`,
      onConfirm: () => {
        setState(prev => ({
          ...prev,
          groups: prev.groups.filter(g => g.id !== group.id)
        }));
        setConfirmDialog({ isOpen: false });
        addToast(`Group "${group.name}" removed`, 'info');
      }
    });
  };

  const handleSaveGroupExpense = (expense) => {
    setState(prev => ({
      ...prev,
      groups: prev.groups.map(g => {
        if (g.id === activeGroupForExpense.id) {
          return {
            ...g,
            expenses: [expense, ...(g.expenses || [])]
          };
        }
        return g;
      })
    }));
    setIsGroupExpenseModalOpen(false);
    setActiveGroupForExpense(null);
    addToast('Group expense recorded and split calculated!');
  };

  const handleDeleteGroupExpense = (group, expense) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Group Expense',
      message: `Are you sure you want to delete "${expense.description}" (${formatMoney(expense.amount, state.currency)})? Group balances will be automatically recalculated.`,
      onConfirm: () => {
        setState(prev => ({
          ...prev,
          groups: prev.groups.map(g => {
            if (g.id === group.id) {
              return {
                ...g,
                expenses: (g.expenses || []).filter(e => e.id !== expense.id)
              };
            }
            return g;
          })
        }));
        setConfirmDialog({ isOpen: false });
        addToast('Group expense removed', 'info');
      }
    });
  };

  const handleAddMemberToGroup = (groupId, memberName) => {
    setState(prev => ({
      ...prev,
      groups: prev.groups.map(g => {
        if (g.id === groupId) {
          const color = MEMBER_COLORS[g.members.length % MEMBER_COLORS.length];
          return {
            ...g,
            members: [
              ...g.members,
              { id: 'mem-' + Date.now(), name: memberName, avatarColor: color }
            ]
          };
        }
        return g;
      })
    }));
    addToast(`Added "${memberName}" to group!`);
  };

  const handleSaveSettlement = (settlement) => {
    setState(prev => ({
      ...prev,
      groups: prev.groups.map(g => {
        if (g.id === settleDebtInfo.group.id) {
          return {
            ...g,
            settlements: [settlement, ...(g.settlements || [])]
          };
        }
        return g;
      })
    }));
    setIsSettleModalOpen(false);
    setSettleDebtInfo(null);
    addToast('Settlement recorded! Balances updated.');
  };

  // Backup & Reset Actions
  const handleResetDemoData = () => {
    const demo = generateDemoData();
    demo.theme = state.theme;
    setState(demo);
    addToast('Demo sample data loaded!');
  };

  const handleClearAllData = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Wipe All Data',
      message: 'Are you sure you want to delete all personal expenses and group bills? This action cannot be undone.',
      onConfirm: () => {
        const fresh = {
          expenses: [],
          groups: [],
          monthlyBudget: 1000,
          currency: state.currency || '$',
          theme: state.theme || 'light'
        };
        setState(fresh);
        setConfirmDialog({ isOpen: false });
        addToast('All data cleared successfully.', 'info');
      }
    });
  };

  const handleExportData = () => {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `budget_splitter_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Backup JSON exported!');
  };

  const handleImportData = (importedState) => {
    if (importedState && Array.isArray(importedState.expenses) && Array.isArray(importedState.groups)) {
      setState(importedState);
      addToast('Backup data successfully restored!');
    } else {
      addToast('Invalid backup file structure.', 'error');
    }
  };

  return React.createElement('div', { className: 'app-wrapper' },
    // Navbar
    React.createElement('nav', { className: 'navbar' },
      React.createElement('div', { className: 'navbar-inner' },
        React.createElement('div', { className: 'brand', onClick: () => setActiveTab('dashboard'), style: { cursor: 'pointer' } },
          React.createElement('div', { className: 'brand-icon' }, React.createElement(Icons.Wallet, { width: 22, height: 22 })),
          React.createElement('span', null, 'BudgetSplit'),
          React.createElement('span', { className: 'brand-tag' }, 'Pro')
        ),

        // Desktop Nav Links
        React.createElement('div', { className: 'nav-links' },
          React.createElement('button', {
            className: `nav-item ${activeTab === 'dashboard' ? 'active' : ''}`,
            onClick: () => setActiveTab('dashboard')
          }, React.createElement(Icons.Dashboard, null), 'Dashboard'),

          React.createElement('button', {
            className: `nav-item ${activeTab === 'expenses' ? 'active' : ''}`,
            onClick: () => setActiveTab('expenses')
          }, React.createElement(Icons.Wallet, null), 'Expenses'),

          React.createElement('button', {
            className: `nav-item ${activeTab === 'split' ? 'active' : ''}`,
            onClick: () => setActiveTab('split')
          }, React.createElement(Icons.Users, null), 'Split Bills'),

          React.createElement('button', {
            className: `nav-item ${activeTab === 'reports' ? 'active' : ''}`,
            onClick: () => setActiveTab('reports')
          }, React.createElement(Icons.Chart, null), 'Reports'),

          React.createElement('button', {
            className: `nav-item ${activeTab === 'settings' ? 'active' : ''}`,
            onClick: () => setActiveTab('settings')
          }, React.createElement(Icons.Settings, null), 'Settings')
        ),

        // Header Actions (Quick Add, Theme Toggle)
        React.createElement('div', { className: 'nav-actions' },
          React.createElement('button', {
            className: 'btn btn-primary btn-sm',
            onClick: () => { setEditingExpense(null); setIsExpenseModalOpen(true); }
          },
            React.createElement(Icons.Plus, null),
            React.createElement('span', { className: 'hide-mobile' }, 'New Expense')
          ),
          React.createElement('button', {
            className: 'theme-toggle',
            title: `Switch to ${state.theme === 'light' ? 'Dark' : 'Light'} Mode`,
            onClick: () => setState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }))
          },
            state.theme === 'light' ? React.createElement(Icons.Moon, null) : React.createElement(Icons.Sun, null)
          )
        )
      )
    ),

    // Main Content Views
    React.createElement('main', { className: 'main-container' },
      activeTab === 'dashboard' && React.createElement(DashboardView, {
        expenses: state.expenses,
        groups: state.groups,
        monthlyBudget: state.monthlyBudget,
        currency: state.currency,
        onAddExpenseClick: () => { setEditingExpense(null); setIsExpenseModalOpen(true); },
        onSplitBillClick: () => setActiveTab('split'),
        setActiveTab
      }),

      activeTab === 'expenses' && React.createElement(ExpensesView, {
        expenses: state.expenses,
        currency: state.currency,
        onAddClick: () => { setEditingExpense(null); setIsExpenseModalOpen(true); },
        onEditClick: (exp) => { setEditingExpense(exp); setIsExpenseModalOpen(true); },
        onDeleteClick: handleDeleteExpense
      }),

      activeTab === 'split' && React.createElement(SplitBillsView, {
        groups: state.groups,
        currency: state.currency,
        onCreateGroupClick: () => setIsGroupModalOpen(true),
        onAddGroupExpenseClick: (group) => { setActiveGroupForExpense(group); setIsGroupExpenseModalOpen(true); },
        onSettleClick: (group, debt) => { setSettleDebtInfo({ group, ...debt }); setIsSettleModalOpen(true); },
        onDeleteGroupClick: handleDeleteGroup,
        onDeleteGroupExpenseClick: handleDeleteGroupExpense,
        onAddMemberToGroup: handleAddMemberToGroup
      }),

      activeTab === 'reports' && React.createElement(ReportsView, {
        expenses: state.expenses,
        currency: state.currency
      }),

      activeTab === 'settings' && React.createElement(SettingsView, {
        monthlyBudget: state.monthlyBudget,
        setMonthlyBudget: (val) => setState(prev => ({ ...prev, monthlyBudget: val })),
        currency: state.currency,
        setCurrency: (val) => setState(prev => ({ ...prev, currency: val })),
        theme: state.theme,
        setTheme: (val) => setState(prev => ({ ...prev, theme: val })),
        onResetDemoData: handleResetDemoData,
        onClearAllData: handleClearAllData,
        onExportData: handleExportData,
        onImportData: handleImportData
      })
    ),

    // Mobile Bottom Navigation Bar
    React.createElement('div', { className: 'mobile-nav' },
      React.createElement('button', {
        className: `mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`,
        onClick: () => setActiveTab('dashboard')
      }, React.createElement(Icons.Dashboard, null), React.createElement('span', null, 'Home')),

      React.createElement('button', {
        className: `mobile-nav-item ${activeTab === 'expenses' ? 'active' : ''}`,
        onClick: () => setActiveTab('expenses')
      }, React.createElement(Icons.Wallet, null), React.createElement('span', null, 'Expenses')),

      React.createElement('button', {
        className: `mobile-nav-item ${activeTab === 'split' ? 'active' : ''}`,
        onClick: () => setActiveTab('split')
      }, React.createElement(Icons.Users, null), React.createElement('span', null, 'Split')),

      React.createElement('button', {
        className: `mobile-nav-item ${activeTab === 'reports' ? 'active' : ''}`,
        onClick: () => setActiveTab('reports')
      }, React.createElement(Icons.Chart, null), React.createElement('span', null, 'Reports')),

      React.createElement('button', {
        className: `mobile-nav-item ${activeTab === 'settings' ? 'active' : ''}`,
        onClick: () => setActiveTab('settings')
      }, React.createElement(Icons.Settings, null), React.createElement('span', null, 'Settings'))
    ),

    // Toast Notifications
    React.createElement(ToastContainer, { toasts, onDismiss: removeToast }),

    // Personal Expense Modal
    React.createElement(ExpenseModal, {
      isOpen: isExpenseModalOpen,
      onClose: () => { setIsExpenseModalOpen(false); setEditingExpense(null); },
      onSave: handleSaveExpense,
      editingExpense,
      currency: state.currency
    }),

    // Group Modal
    React.createElement(GroupModal, {
      isOpen: isGroupModalOpen,
      onClose: () => setIsGroupModalOpen(false),
      onSave: handleSaveGroup
    }),

    // Group Expense Modal
    React.createElement(GroupExpenseModal, {
      isOpen: isGroupExpenseModalOpen,
      onClose: () => { setIsGroupExpenseModalOpen(false); setActiveGroupForExpense(null); },
      group: activeGroupForExpense,
      onSave: handleSaveGroupExpense,
      currency: state.currency
    }),

    // Settle Up Modal
    React.createElement(SettleUpModal, {
      isOpen: isSettleModalOpen,
      onClose: () => { setIsSettleModalOpen(false); setSettleDebtInfo(null); },
      group: settleDebtInfo?.group,
      debt: settleDebtInfo,
      onSave: handleSaveSettlement,
      currency: state.currency
    }),

    // Confirmation Dialog
    React.createElement(ConfirmDialog, {
      isOpen: confirmDialog.isOpen,
      title: confirmDialog.title,
      message: confirmDialog.message,
      onConfirm: confirmDialog.onConfirm,
      onCancel: () => setConfirmDialog({ isOpen: false })
    })
  );
}

// Render Root
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
    if (window.ReactDOM && window.ReactDOM.createRoot) {
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(App));
    } else if (window.ReactDOM && window.ReactDOM.render) {
      ReactDOM.render(React.createElement(App), container);
    }
  }
});
