import React, { useState, useMemo } from 'react';
import '../styles/FieldLevelResults.css';

interface FieldMatch {
  fieldName: string;
  matchedCount: number;
  mismatchedCount: number;
  matchPercentage: number;
  sampleMatches: Array<{ table1: any; table2: any }>;
  sampleMismatches: Array<{ table1: any; table2: any; reason: string }>;
}

interface FieldLevelResultsProps {
  fieldMatches: FieldMatch[];
}

type SortOrder = 'asc' | 'desc' | null;

export const FieldLevelResults: React.FC<FieldLevelResultsProps> = ({ fieldMatches }) => {
  const [expandedField, setExpandedField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedFieldMatches = useMemo(() => {
    const sorted = [...fieldMatches];
    if (sortOrder === 'asc') {
      sorted.sort((a, b) => a.matchPercentage - b.matchPercentage);
    } else if (sortOrder === 'desc') {
      sorted.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }
    return sorted;
  }, [fieldMatches, sortOrder]);

  const handleSortClick = () => {
    if (sortOrder === 'desc') {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder(null);
    } else {
      setSortOrder('desc');
    }
  };

  const toggleExpand = (fieldName: string) => {
    setExpandedField(expandedField === fieldName ? null : fieldName);
  };

  return (
    <div className="field-level-results">
      <div className="field-level-header">
        <h2>Field-Level Analysis</h2>
        <div className="field-level-subtitle">Match percentage and sample data for each field</div>
      </div>

      <table className="fields-table">
        <thead>
          <tr>
            <th></th>
            <th>Field Name</th>
            <th>Matched</th>
            <th>Mismatched</th>
            <th onClick={handleSortClick} style={{ cursor: 'pointer' }}>
              Match %
              {sortOrder && <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFieldMatches.map((field) => (
            <React.Fragment key={field.fieldName}>
              <tr>
                <td style={{ width: '40px', padding: '0' }}>
                  <div className="field-row-header">
                    <button
                      className={`field-expand-btn ${expandedField === field.fieldName ? 'expanded' : ''}`}
                      onClick={() => toggleExpand(field.fieldName)}
                    >
                      ▶
                    </button>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div className="field-name">{field.fieldName}</div>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>
                    {field.matchedCount}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ color: '#ef4444', fontWeight: '600' }}>
                    {field.mismatchedCount}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div className="field-percentage">
                    <div style={{ fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>
                      {field.matchPercentage.toFixed(1)}%
                    </div>
                    <div className="percentage-bar">
                      <div
                        className="percentage-fill"
                        style={{ width: `${field.matchPercentage}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              {expandedField === field.fieldName && (
                <tr>
                  <td colSpan={5}>
                    <div className="field-details">
                      <div className="detail-section">
                        <div className="detail-title">Sample Matches ({field.sampleMatches.length})</div>
                        {field.sampleMatches.length > 0 ? (
                          <div className="sample-rows">
                            {field.sampleMatches.slice(0, 2).map((sample, idx) => (
                              <div key={idx} className="sample-row">
                                <div className="sample-row-header">Row {idx + 1}</div>
                                <div className="sample-value">
                                  <strong>Table1:</strong> {JSON.stringify(sample.table1)}
                                </div>
                                <div className="sample-value">
                                  <strong>Table2:</strong> {JSON.stringify(sample.table2)}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="no-samples">No matched samples available</div>
                        )}
                      </div>

                      <div className="detail-section">
                        <div className="detail-title">Sample Mismatches ({field.sampleMismatches.length})</div>
                        {field.sampleMismatches.length > 0 ? (
                          <div className="sample-rows">
                            {field.sampleMismatches.slice(0, 2).map((sample, idx) => (
                              <div key={idx} className="sample-row">
                                <div className="sample-row-header">Row {idx + 1}</div>
                                <div className="sample-value">
                                  <strong>Table1:</strong> {JSON.stringify(sample.table1)}
                                </div>
                                <div className="sample-value">
                                  <strong>Table2:</strong> {JSON.stringify(sample.table2)}
                                </div>
                                <div className="sample-value" style={{ color: '#f97316', marginTop: '4px' }}>
                                  <strong>Reason:</strong> {sample.reason}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="no-samples">No mismatched samples available</div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
