import React, { useState, useMemo } from 'react';
import { ConfigPanel, ComparisonConfig } from './ConfigPanel';
import { OverallMetrics } from './OverallMetrics';
import { FieldLevelResults } from './FieldLevelResults';
import { ToleranceBucketsChart } from './ToleranceBucketsChart';
import { compareTablest } from './utils/comparison';
import './styles/TableComparison.css';

interface TableComparisonDashboardProps {
  table1: Record<string, any>[];
  table2: Record<string, any>[];
  initialConfig?: Partial<ComparisonConfig>;
  onConfigChange?: (config: ComparisonConfig) => void;
}

export const TableComparisonDashboard: React.FC<TableComparisonDashboardProps> = ({
  table1,
  table2,
  initialConfig,
  onConfigChange,
}) => {
  // Get available fields from table1
  const availableFields = useMemo(() => {
    if (table1.length === 0) return [];
    return Object.keys(table1[0]);
  }, [table1]);

  // Initialize config
  const [config, setConfig] = useState<ComparisonConfig>({
    fieldsToCompare: initialConfig?.fieldsToCompare || availableFields,
    matchTolerance: initialConfig?.matchTolerance ?? 0.85,
    numericTolerance: initialConfig?.numericTolerance ?? 5,
    caseSensitive: initialConfig?.caseSensitive ?? false,
    ignoreWhitespace: initialConfig?.ignoreWhitespace ?? false,
  });

  // Compute comparison results
  const comparisonResult = useMemo(() => {
    return compareTablest(table1, table2, config);
  }, [table1, table2, config]);

  const handleConfigChange = (newConfig: ComparisonConfig) => {
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  return (
    <div className="table-comparison-dashboard">
      <div className="dashboard-header">
        <h1>Table Comparison Dashboard</h1>
        <p>Compare two tables with configurable fields and match tolerance</p>
      </div>

      <div className="dashboard-container">
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          <ConfigPanel
            config={config}
            availableFields={availableFields}
            onConfigChange={handleConfigChange}
          />
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <OverallMetrics result={comparisonResult} />
          <FieldLevelResults fieldMatches={comparisonResult.fieldMatches} />
          <ToleranceBucketsChart fieldMatches={comparisonResult.fieldMatches} />
        </main>
      </div>
    </div>
  );
};
