# Table Comparison Dashboard

A powerful, interactive dashboard for comparing two tables with configurable fields, match tolerance, and comprehensive analytics.

## 🎯 Features

### Configuration Panel
- **Dynamic field selection** - Choose which fields to compare
- **Match tolerance slider** (0-100%) - Control matching strictness
- **Numeric tolerance** (±0-100) - Allow variance in numeric comparisons
- **Case sensitivity toggle** - Include/exclude case in comparisons
- **Whitespace handling** - Ignore or require exact whitespace

### Overall Metrics
- Total rows comparison
- Matched vs mismatched row counts
- Overall match percentage with color-coded status
- Progress visualization
- Tolerance settings display

### Field-Level Analysis
- Individual field match percentages
- Matched vs mismatched counts per field
- Sample matches and mismatches
- Sortable by match percentage
- Expandable details view

### Match Tolerance Distribution
- Bar chart showing field distribution across buckets:
  - 🔴 **Poor** (0-20%): Red
  - 🟠 **Fair** (20-40%): Orange
  - 🟡 **Good** (40-80%): Yellow
  - 🟢 **Excellent** (80-100%): Green
- Percentage breakdown
- Interactive legend

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Opens automatically at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 📋 Sample Data

Includes 8 pre-configured employee records with:
- Perfect matches (records 1, 5)
- Slight variations (typos, numeric differences)
- Multiple field variations
- Email format variations

Expected result at default settings (85% tolerance): ~37.5% match

## 🛠 API Usage

```typescript
import { TableComparisonDashboard } from './components/TableComparison'

<TableComparisonDashboard 
  table1={data1}
  table2={data2}
  initialConfig={{
    fieldsToCompare: ['name', 'email', 'age'],
    matchTolerance: 0.95,
    numericTolerance: 5,
    caseSensitive: false,
    ignoreWhitespace: false
  }}
  onConfigChange={(config) => console.log(config)}
/>
```

## 📊 Comparison Algorithm

- **String matching**: Levenshtein distance for fuzzy matching
- **Numeric comparison**: Configurable tolerance ranges
- **Boolean comparison**: Exact match only
- **Null handling**: Both null = match, one null = mismatch

## 🎨 Design

- Modern dark theme with gradient backgrounds
- Responsive layout (desktop, tablet, mobile)
- Color-coded status indicators
- Smooth animations and transitions
- Professional typography and spacing

## 📁 Project Structure

```
src/
├── components/TableComparison/
│   ├── TableComparison.tsx        # Main component
│   ├── ConfigPanel.tsx            # Configuration UI
│   ├── OverallMetrics.tsx         # Summary metrics
│   ├── FieldLevelResults.tsx      # Field analysis
│   ├── ToleranceBucketsChart.tsx  # Distribution chart
│   ├── types.ts                   # Type definitions
│   ├── utils/comparison.ts        # Core algorithm
│   ├── styles/                    # Component styles
│   └── index.ts                   # Exports
├── App.tsx                        # Entry with sample data
├── main.tsx                       # React entry point
└── index.css                      # Global styles
```

## 🧪 Testing

See `TESTING_GUIDE.md` for detailed testing instructions including:
- 7 test scenarios
- Sample data overview
- Expected results
- Responsive testing
- Troubleshooting guide

## 🚢 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag 'dist' folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 📦 Dependencies

- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **recharts**: ^2.10.3
- **typescript**: ^5.2.2
- **vite**: ^5.0.0

## 📄 License

MIT

## 🤝 Contributing

Submit issues and pull requests for improvements!
