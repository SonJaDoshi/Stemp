# Table Comparison Dashboard - Testing Guide

## 🚀 Quick Local Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

The dashboard will automatically open in your default browser at `http://localhost:5173` with live reload enabled.

## 🎯 Testing the Dashboard

### Initial Load
You should see:
- **Left Sidebar**: Field selection, match tolerance slider (85%), numeric tolerance (5)
- **Main Content**: Overall metrics, field analysis, and distribution chart
- **Sample Data**: 8 employee records with variations

### Test Case 1: Field Selection
1. Click "Clear All" - all fields unselected, no data displays
2. Click "Select All" - all fields selected, data reappears
3. Manually toggle fields - updates in real-time

### Test Case 2: Match Tolerance
1. Move "Match Tolerance" slider to 100% (rightmost) - stricter matching
2. Notice "Matched Rows" decreases
3. Move to 50% (leftmost) - more fuzzy matching
4. Notice "Matched Rows" increases

### Test Case 3: Numeric Tolerance
1. Move "Numeric Tolerance" slider to 0 - exact numeric match only
2. Notice age/salary mismatches appear
3. Move to 50 - very loose numeric comparison
4. Notice mismatches resolve

### Test Case 4: Case Sensitivity
1. Check "Case Sensitive" box
2. Observe field-level results change (if data has case variations)
3. Uncheck to ignore case

### Test Case 5: Whitespace Handling
1. Check "Ignore Whitespace" box
2. Values like "John Doe" and " John  Doe" match as identical
3. Uncheck to require exact whitespace

### Test Case 6: View Field Details
1. Click on any field row to expand
2. See "Sample Matches" and "Sample Mismatches"
3. Verify values shown match the sample data
4. Click again to collapse

### Test Case 7: Distribution Chart
1. Adjust Match Tolerance
2. Watch the chart bars update
3. Verify buckets (Poor/Fair/Good/Excellent) update dynamically

## 🔍 Sample Data Overview

The dashboard includes 8 employees with intentional variations:

| Row | Name Variation | Email Variation | Age/Salary Diff | Status |
|-----|---|---|---|---|
| 1 | None | None | None | ✅ Perfect Match |
| 2 | None | None | Salary +100 | 🟡 Slight diff |
| 3 | Eve→Eva | .com→.org | None | 🟠 Multiple diffs |
| 4 | Bob Jonson | None | Age +1 | 🟠 Typo + diff |
| 5 | None | None | None | ✅ Perfect Match |
| 6 | None | None | Salary +50 | 🟡 Slight diff |
| 7 | None | diana@mail.com | None | 🟠 Email domain |
| 8 | None | e.lee@example.com | None | 🟡 Email format |

## 📊 Expected Results

### Default Settings (85% tolerance, ±5 numeric)
- **Overall Match**: ~37.5% (3/8 rows)
- **Matched Rows**: 3 (rows 1, 5 with perfect matches)
- **Mismatched Rows**: 5

### Looser Settings (50% tolerance, ±50 numeric)
- **Overall Match**: 100% (all rows exceed 50% similarity)
- **Matched Rows**: 8
- **Distribution**: All rows in "Excellent" bucket

## 🔧 Customizing Test Data

Edit `src/App.tsx` to modify `sampleTable1` and `sampleTable2`:

```typescript
const sampleTable1 = [
  { id: 1, name: 'Your Data', ... },
  // Add your test rows
];
```

The component will dynamically detect fields from the data.

## 📱 Testing Responsive Design

1. Open browser DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test at different breakpoints:
   - Desktop (1920px) - Sidebar left, content right
   - Tablet (768px) - Sidebar above, content below
   - Mobile (375px) - Stacked layout

## 🔧 Production Build Testing

```bash
npm run build
npm run preview
```

This opens the production build at `http://localhost:4173` for testing optimized version.

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 5174
```

### Data not displaying?
- Check browser console (F12 → Console)
- Verify `sampleTable1` and `sampleTable2` have matching rows
- Ensure fields exist in both tables

### Charts not rendering?
- Check that Recharts is installed: `npm ls recharts`
- Verify no TypeScript errors in console

### Styling broken?
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server: `Ctrl+C` then `npm run dev`

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag 'dist' folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Push 'dist' to gh-pages branch
```

## 📚 API Reference

### TableComparisonDashboard Props

```typescript
interface TableComparisonProps {
  table1: Record<string, any>[];        // First table data
  table2: Record<string, any>[];        // Second table data
  initialConfig?: Partial<ComparisonConfig>;  // Initial settings
  onConfigChange?: (config: ComparisonConfig) => void;  // Config change callback
}
```

### ComparisonConfig

```typescript
interface ComparisonConfig {
  fieldsToCompare: string[];      // Fields to compare
  matchTolerance: number;         // 0-1 (0=fuzzy, 1=exact)
  numericTolerance: number;       // Allowed variance
  caseSensitive: boolean;         // Case sensitivity
  ignoreWhitespace: boolean;      // Whitespace handling
}
```

## ✅ Checklist

- [ ] Dev server starts on port 5173
- [ ] Browser auto-opens dashboard
- [ ] Sample data displays (8 rows)
- [ ] Field selection works
- [ ] Tolerance sliders work
- [ ] Checkboxes toggle correctly
- [ ] Field details expand/collapse
- [ ] Chart updates dynamically
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Production build works

You're all set! Enjoy testing the dashboard! 🎉
